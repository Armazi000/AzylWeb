# Vercel Hosting Guide for Schronisko AZYL Website

This guide covers deploying both the React frontend and Node.js/Express backend on Vercel using serverless functions.

## Why Vercel?

✅ **Free tier** with generous limits  
✅ **Automatic deployments** from Git push  
✅ **Global CDN** for fast content delivery  
✅ **Serverless functions** for backend  
✅ **Free SSL/HTTPS** included  
✅ **Environment variables** management  
✅ **Instant rollbacks** and previews  

---

## Prerequisites

1. GitHub account with your repository
2. Vercel account (free) at https://vercel.com
3. Your domain (optional - free `.vercel.app` domain included)
4. Git installed locally

---

## Part 1: Prepare Your Project Structure

### Current Structure (needs update):
```
Azyl Strona/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── shelter.db
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

### Convert to Vercel Structure:

You have two options:

**Option A: Monorepo (recommended)**
- Keep structure as-is
- Use Vercel monorepo support

**Option B: Separate repos**
- Frontend deployed separately
- Backend deployed separately

We'll use **Option A (Monorepo)** - simpler setup.

---

## Part 2: Convert Backend to Vercel Serverless Functions

Vercel converts `/api` directory files into serverless functions automatically.

### Step 1: Create API Structure

Create this directory in your project root:

```
Azyl Strona/
├── api/
│   ├── shelter-info.js
│   ├── dogs.js
│   ├── articles.js
│   ├── db.js (database config)
│   └── .env.local
├── backend/
│   ├── server.js (keep for local development)
│   └── package.json
├── frontend/
├── vercel.json (new)
└── package.json (new root level)
```

### Step 2: Convert Backend Routes to Serverless Functions

Create `/api/db.js` - shared database setup:

```javascript
// /api/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = null;

const getDatabase = () => {
  if (!db) {
    const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'backend', 'shelter.db');
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) console.error('Database error:', err);
      else console.log('Connected to database');
    });
  }
  return db;
};

module.exports = { getDatabase };
```

Create `/api/dogs.js` - Dogs endpoints:

```javascript
// /api/dogs.js
import { getDatabase } from './db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const db = getDatabase();
    db.all('SELECT * FROM dogs ORDER BY createdAt DESC', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    });
  } else if (req.method === 'POST') {
    const { name, breed, age, gender, description, photo } = req.body;
    const id = require('uuid').v4();
    const now = new Date().toISOString();
    
    const db = getDatabase();
    db.run(
      `INSERT INTO dogs (id, name, breed, age, gender, description, status, photo, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, breed, age, gender, description, 'available', photo, now, now],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id, name, breed, age, gender, description, status: 'available', photo, createdAt: now });
      }
    );
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

Create `/api/articles.js` - Blog endpoints:

```javascript
// /api/articles.js
import { getDatabase } from './db.js';
import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const db = getDatabase();
    db.all('SELECT * FROM articles ORDER BY createdAt DESC', (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    });
  } else if (req.method === 'POST') {
    const { title, content, category } = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const db = getDatabase();
    db.run(
      `INSERT INTO articles (id, title, content, category, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, content, category, now, now],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ id, title, content, category, createdAt: now, updatedAt: now });
      }
    );
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

Create `/api/shelter-info.js`:

```javascript
// /api/shelter-info.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.json({
    name: "Schronisko AZYL",
    description: "Schronisko dla zwierząt AZYL - Stowarzyszenie przyjaciół zwierząt",
    address: "ul. Brzegowa 151, 58-200 Dzierżoniów",
    phone: "+48 74 83 11 800",
    email: "kontakt@schroniskoazyl.eu",
    hours: {
      weekday: "10:00 - 15:45",
      saturday: "10:00 - 14:45",
      sunday: "Closed"
    },
    bankAccount: "59 9527 0007 0033 6457 2000 0001",
    krs: "0000062210"
  });
}
```

### Step 3: Update package.json dependencies

Add to root `package.json`:

```json
{
  "name": "schronisko-azyl",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "sqlite3": "^5.1.6",
    "uuid": "^9.0.0"
  }
}
```

---

## Part 3: Create vercel.json Configuration

Create `/vercel.json` in project root:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/build",
  "env": {
    "REACT_APP_API_URL": "@api_url"
  },
  "monorepoRoot": ".",
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" }
  ]
}
```

---

## Part 4: Update Frontend Environment

Create `/frontend/.env.production`:

```env
REACT_APP_API_URL=https://yourdomain.com/api
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=your_secure_password
```

Update Frontend API calls to work with `/api/` endpoints:

In `frontend/src/pages/DogsForAdoption.js`:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Simply change from /api/dogs to /api/dogs
// Vercel automatically routes /api/* to serverless functions
```

---

## Part 5: Push to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

2. **Create GitHub repository** at https://github.com/new

---

## Part 6: Deploy on Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Paste your GitHub repo URL
5. Click "Import" → "Continue"
6. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: ./
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
7. Add environment variables:
   - `FACEBOOK_ALBUM_ID` = your_album_id
   - `FACEBOOK_ACCESS_TOKEN` = your_token
   - `DB_PATH` = ./backend/shelter.db
8. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow interactive prompts
# - Confirm project settings
# - Add environment variables
```

---

## Part 7: Configure Environment Variables

### In Vercel Dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   FACEBOOK_ALBUM_ID = your_album_id
   FACEBOOK_ACCESS_TOKEN = your_long_lived_token
   ```
3. Select environments: "Production", "Preview", "Development"
4. Click "Save"

---

## Part 8: Connect Custom Domain

### In Vercel Dashboard:

1. Go to **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., schroniskoazyl.pl)
4. Vercel generates DNS records
5. In your domain registrar, update DNS records to point to Vercel
6. Wait 24-48 hours for DNS propagation
7. SSL certificate auto-generates

---

## Part 9: Database Persistence

**⚠️ Important**: SQLite on Vercel serverless functions is problematic because:
- Filesystem is read-only except `/tmp`
- Each function invocation is isolated
- No persistent storage between requests

### Solution 1: Use Vercel KV (Recommended for Small Projects)

```bash
vercel env pull
```

Add to Node modules with Vercel KV integration.

### Solution 2: Migrate to Cloud Database

Better option: Use a managed database service:

**Supabase (PostgreSQL)**
- Free tier: 500MB storage
- PostgreSQL-based (easy migration from SQLite)
- Setup: https://supabase.com

**MongoDB Atlas**
- Free tier: 512MB storage
- NoSQL (requires schema changes)

**PlanetScale (MySQL)**
- Free tier: Good limits
- MySQL-based (easy migration)

### Setup PostgreSQL with Supabase:

1. Create account at https://supabase.com
2. Create new project
3. Get connection string
4. Update backend to use PostgreSQL:

```bash
npm install pg
```

Create `/api/db.js`:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = { pool };
```

Update API endpoints to use PostgreSQL instead of SQLite.

---

## Part 10: Facebook Album Integration

### Deploy with Facebook API:

1. In Vercel dashboard, add env vars:
   ```
   FACEBOOK_ALBUM_ID = your_album_id
   FACEBOOK_ACCESS_TOKEN = your_token
   ```

2. Create `/api/facebook-sync.js`:

```javascript
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const fbAlbumId = process.env.FACEBOOK_ALBUM_ID;
  const fbAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!fbAlbumId || !fbAccessToken) {
    return res.status(400).json({ error: 'Facebook credentials not configured' });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${fbAlbumId}/photos?fields=id,name,description,picture&access_token=${fbAccessToken}`
    );
    const data = await response.json();
    
    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const dogs = data.data.map((photo, index) => ({
      id: photo.id,
      name: photo.name || `Dog ${index + 1}`,
      breed: 'Mixed',
      description: photo.description || '',
      photo: photo.picture,
      status: 'available'
    }));

    res.json(dogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

---

## Part 11: Automatic Deployments

Vercel automatically deploys when you push to main:

```bash
# Make changes locally
git add .
git commit -m "Update homepage"
git push origin main

# Vercel automatically deploys within 1-2 minutes
# View at: https://vercel.com/dashboard
```

### Preview Deployments

Every PR gets a preview URL:
```
https://your-repo-pr-123.vercel.app
```

---

## Part 12: Monitoring & Logs

### View Deployment Logs:

1. Vercel Dashboard → Deployments
2. Click on deployment
3. View build logs and function logs

### View Function Logs:

```bash
vercel logs --follow
```

### Monitor Performance:

Vercel Dashboard → Analytics shows:
- Request count
- Response times
- Error rates

---

## Part 13: Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Build command configured: `cd frontend && npm run build`
- [ ] Output directory: `frontend/build`
- [ ] Environment variables added:
  - [ ] `FACEBOOK_ALBUM_ID`
  - [ ] `FACEBOOK_ACCESS_TOKEN`
- [ ] Custom domain configured (if using)
- [ ] SSL certificate verified
- [ ] Database solution selected (SQLite/Supabase/MongoDB)
- [ ] Frontend `.env.production` updated
- [ ] API endpoints tested
- [ ] Admin login works
- [ ] Dogs from Facebook load
- [ ] Articles CRUD works

---

## Quick Comparison: Vercel vs EasyPanel

| Feature | Vercel | EasyPanel |
|---------|--------|-----------|
| **Cost** | Free tier generous | Paid hosting |
| **Setup** | Click & deploy | Manual config |
| **Scaling** | Automatic | Manual |
| **Database** | Need external | Included |
| **CI/CD** | Built-in Git | Manual uploads |
| **SSL** | Free auto | Included |
| **Speed** | Global CDN | Single server |

---

## Troubleshooting

### Functions return 404

```javascript
// Ensure CORS headers in each function:
res.setHeader('Access-Control-Allow-Origin', '*');
```

### Database connection fails

- Verify `DATABASE_URL` env var is set
- Check connection string format
- Restart deployment: `vercel --prod`

### React Router links broken

- Vercel automatically handles this with `public/_redirects`
- Already works out of the box!

### Out of memory

- Vercel functions have 512MB limit (free tier)
- For larger data, migrate to cloud database

### Stuck on "Building..."

```bash
# Cancel and redeploy
vercel --prod --force
```

---

## Quick Start (TL;DR)

```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com/dashboard
# 3. Import GitHub repository
# 4. Set build command: cd frontend && npm run build
# 5. Add env vars (FACEBOOK_ALBUM_ID, FACEBOOK_ACCESS_TOKEN)
# 6. Click Deploy
# 7. Add custom domain (optional)
# 8. Done! 🎉
```

---

## Next Steps

1. **Start with Vercel free tier** - test deployment
2. **Use SQLite temporarily** - get app running
3. **Migrate to cloud DB** - when you scale
4. **Add custom domain** - when ready
5. **Monitor analytics** - track usage

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **CLI Reference**: `vercel help`
- **Supabase (DB)**: https://supabase.com/docs

