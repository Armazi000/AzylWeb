/**
 * Cloudflare Pages Function — Facebook Album → Dogs API
 * 
 * Environment variables (set in Cloudflare Dashboard → Settings → Environment Variables):
 *   FACEBOOK_ALBUM_ID     — The Facebook album ID to fetch photos from
 *   FACEBOOK_ACCESS_TOKEN  — A long-lived Facebook Page Access Token
 * 
 * Endpoint: GET /api/dogs
 * 
 * Returns an array of dog objects parsed from Facebook album photos.
 * Each photo's caption/name is parsed to extract dog details.
 * Results are cached for 10 minutes to avoid hitting Facebook rate limits.
 */

// In-memory cache (persists across warm invocations on the same isolate)
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function onRequestGet(context) {
  const { env } = context;

  const albumId = env.FACEBOOK_ALBUM_ID;
  const accessToken = env.FACEBOOK_ACCESS_TOKEN;

  // CORS headers (same-origin on Cloudflare Pages, but useful for local dev)
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=600', // browser cache 10 min
  };

  if (!albumId || !accessToken) {
    return new Response(JSON.stringify({
      error: 'Facebook credentials not configured. Set FACEBOOK_ALBUM_ID and FACEBOOK_ACCESS_TOKEN in Cloudflare environment variables.'
    }), { status: 500, headers });
  }

  // Return cached data if still fresh
  const now = Date.now();
  if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
    return new Response(JSON.stringify(cache.data), { status: 200, headers });
  }

  try {
    // Fetch all photos from the album (paginate up to 100)
    const fbUrl = `https://graph.facebook.com/v25.0/${albumId}/photos?fields=id,name,images,created_time&limit=100&access_token=${accessToken}`;

    const fbResponse = await fetch(fbUrl);
    const fbData = await fbResponse.json();

    if (fbData.error) {
      return new Response(JSON.stringify({
        error: `Facebook API error: ${fbData.error.message}`
      }), { status: 502, headers });
    }

    if (!fbData.data || !Array.isArray(fbData.data)) {
      return new Response(JSON.stringify([]), { status: 200, headers });
    }

    // Transform Facebook photos into dog objects
    const dogs = fbData.data.map((photo) => {
      const parsed = parseCaption(photo.name || '');

      // Pick the largest image available
      const bestImage = photo.images && photo.images.length > 0
        ? photo.images.reduce((best, img) => img.width > best.width ? img : best, photo.images[0])
        : null;

      return {
        id: photo.id,
        name: parsed.name || `Podopieczny`,
        breed: parsed.breed || '',
        age: parsed.age || null,
        gender: parsed.gender || null,
        weight: parsed.weight || null,
        color: parsed.color || '',
        description: parsed.description || '',
        status: parsed.status || 'available',
        photo: bestImage ? bestImage.source : null,
        createdAt: photo.created_time || null,
      };
    });

    // Update cache
    cache = { data: dogs, timestamp: now };

    return new Response(JSON.stringify(dogs), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({
      error: `Failed to fetch from Facebook: ${err.message}`
    }), { status: 502, headers });
  }
}

/**
 * Parse a photo caption/name into structured dog data.
 * 
 * Supports formats like:
 *   "Burek"
 *   "Burek - Mieszaniec, 3 lata, samiec"
 *   "Luna | Owczarek | samica | 2 lata"
 *   "Reksio\nRasa: Labrador\nWiek: 5 lat\nPłeć: samiec"
 * 
 * Falls back gracefully — if only a name is given, that's fine.
 */
function parseCaption(caption) {
  if (!caption || !caption.trim()) {
    return {};
  }

  const text = caption.trim();
  const result = {};

  // Try key:value format first (e.g. "Imię: Burek\nRasa: Lab\nWiek: 3")
  const keyValuePattern = /(?:imi[eę]|name)\s*:\s*(.+)/i;
  const breedPattern = /(?:rasa|breed)\s*:\s*(.+)/i;
  const agePattern = /(?:wiek|age)\s*:\s*(\d+)/i;
  const genderPattern = /(?:p[lł]e[cć]|gender)\s*:\s*(.+)/i;
  const weightPattern = /(?:waga|weight)\s*:\s*(\d+(?:[.,]\d+)?)/i;
  const colorPattern = /(?:kolor|color|umaszczenie)\s*:\s*(.+)/i;
  const statusPattern = /(?:status)\s*:\s*(.+)/i;

  const nameMatch = text.match(keyValuePattern);
  const breedMatch = text.match(breedPattern);
  const ageMatch = text.match(agePattern);
  const genderMatch = text.match(genderPattern);
  const weightMatch = text.match(weightPattern);
  const colorMatch = text.match(colorPattern);
  const statusMatch = text.match(statusPattern);

  if (nameMatch || breedMatch || ageMatch) {
    // Key-value format detected
    result.name = nameMatch ? nameMatch[1].trim() : '';
    result.breed = breedMatch ? breedMatch[1].trim() : '';
    result.age = ageMatch ? parseInt(ageMatch[1]) : null;
    result.color = colorMatch ? colorMatch[1].trim() : '';
    result.weight = weightMatch ? parseFloat(weightMatch[1].replace(',', '.')) : null;

    if (genderMatch) {
      const g = genderMatch[1].trim().toLowerCase();
      result.gender = (g.includes('sami') && g.includes('c')) || g === 'male' || g.includes('pies') ? 'Male' : 'Female';
    }

    if (statusMatch) {
      const s = statusMatch[1].trim().toLowerCase();
      if (s.includes('adopt')) result.status = 'adopted';
      else if (s.includes('trak') || s.includes('pend')) result.status = 'pending';
      else result.status = 'available';
    }

    // Remaining text as description
    const descLines = text.split('\n').filter(line => {
      return !line.match(/(?:imi[eę]|name|rasa|breed|wiek|age|p[lł]e[cć]|gender|waga|weight|kolor|color|umaszczenie|status)\s*:/i);
    });
    result.description = descLines.join(' ').trim();

    return result;
  }

  // Try delimiter format: "Name - Breed, age, gender" or "Name | Breed | gender"
  const delimMatch = text.match(/^([^|\-\n]+)[|\-](.+)/);
  if (delimMatch) {
    result.name = delimMatch[1].trim();
    const rest = delimMatch[2];

    // Look for age
    const restAge = rest.match(/(\d+)\s*(?:lat|rok|year|lata|r\.)/i);
    if (restAge) result.age = parseInt(restAge[1]);

    // Look for gender
    if (/samiec|pies|male/i.test(rest)) result.gender = 'Male';
    else if (/samica|suczka|suka|female/i.test(rest)) result.gender = 'Female';

    // The first segment after the delimiter is likely the breed
    const parts = rest.split(/[,|]/).map(s => s.trim()).filter(Boolean);
    if (parts.length > 0) {
      // The first part that isn't age or gender is the breed
      for (const part of parts) {
        if (!/^\d+\s*(?:lat|rok|year|lata|r\.)/i.test(part) && !/samiec|samica|pies|suczka|suka|male|female/i.test(part)) {
          result.breed = part;
          break;
        }
      }
    }

    return result;
  }

  // Simple format: just a name (first line)
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  result.name = lines[0];
  if (lines.length > 1) {
    result.description = lines.slice(1).join(' ');
  }

  return result;
}
