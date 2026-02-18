const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;

// Security configuration
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'schronisko2024';

// Session store (in production, use Redis or similar)
const sessionStore = new Map();

// Middleware: Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Middleware: CORS with strict options
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'shelter.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS dogs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      breed TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      weight REAL,
      color TEXT,
      description TEXT,
      status TEXT DEFAULT 'available',
      dateArrived TEXT,
      photo TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating dogs table:', err);
    else console.log('Dogs table ready');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      createdAt TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating messages table:', err);
    else console.log('Messages table ready');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updatedAt TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating settings table:', err);
    else console.log('Settings table ready');
  });
}

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7);
  const session = sessionStore.get(token);

  if (!session || Date.now() - session.timestamp > 24 * 60 * 60 * 1000) {
    // Session expired (24 hours)
    sessionStore.delete(token);
    return res.status(401).json({ error: 'Session expired' });
  }

  req.adminSession = session;
  next();
};

// Routes

// ===== ADMIN AUTH ENDPOINTS =====

// Admin Login - Returns Bearer Token
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation - in production use bcrypt
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate secure token
  const token = crypto.randomBytes(32).toString('hex');
  sessionStore.set(token, {
    username,
    timestamp: Date.now()
  });

  res.json({ token });
});

// Admin Status - Protected endpoint
app.get('/api/admin/status', authMiddleware, (req, res) => {
  // Count dogs
  db.get('SELECT COUNT(*) as count FROM dogs', (err1, dogsCount) => {
    // Count unread messages
    db.get('SELECT COUNT(*) as count FROM messages WHERE status = ?', ['unread'], (err2, messagesCount) => {
      // Get facebook settings
      db.get('SELECT value FROM settings WHERE key = ?', ['facebook_album_id'], (err3, albumId) => {
        res.json({
          facebook_configured: !!(albumId?.value || process.env.FACEBOOK_ALBUM_ID),
          total_dogs: dogsCount?.count || 0,
          unread_messages: messagesCount?.count || 0,
          timestamp: new Date().toISOString()
        });
      });
    });
  });
});

// Get Facebook Settings - Protected endpoint
app.get('/api/admin/settings/facebook', authMiddleware, (req, res) => {
  db.all('SELECT key, value FROM settings WHERE key LIKE ?', ['facebook_%'], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const settings = {};
    rows?.forEach(row => {
      settings[row.key] = row.value || '';
    });
    res.json({
      facebook_album_id: settings.facebook_album_id || '',
      facebook_access_token: settings.facebook_access_token || ''
    });
  });
});

// Update Facebook Settings - Protected endpoint
app.put('/api/admin/settings/facebook', authMiddleware, (req, res) => {
  const { facebook_album_id, facebook_access_token } = req.body;
  const now = new Date().toISOString();

  if (!facebook_album_id || !facebook_access_token) {
    return res.status(400).json({ error: 'Both facebook_album_id and facebook_access_token are required' });
  }

  // Update album ID
  db.run(
    'INSERT OR REPLACE INTO settings (key, value, updatedAt) VALUES (?, ?, ?)',
    ['facebook_album_id', facebook_album_id, now],
    (err1) => {
      if (err1) {
        return res.status(500).json({ error: err1.message });
      }

      // Update access token
      db.run(
        'INSERT OR REPLACE INTO settings (key, value, updatedAt) VALUES (?, ?, ?)',
        ['facebook_access_token', facebook_access_token, now],
        (err2) => {
          if (err2) {
            return res.status(500).json({ error: err2.message });
          }
          res.json({ success: true, message: 'Facebook settings updated successfully' });
        }
      );
    }
  );
});

// ===== DOGS ENDPOINTS =====

// Get all dogs
app.get('/api/dogs', (req, res) => {
  db.all('SELECT * FROM dogs ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Get single dog
app.get('/api/dogs/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM dogs WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Dog not found' });
    } else {
      res.json(row);
    }
  });
});

// Create dog
app.post('/api/dogs', (req, res) => {
  const { name, breed, age, gender, weight, color, description, status, photo } = req.body;
  const id = uuidv4();
  const now = new Date().toISOString();

  db.run(
    `INSERT INTO dogs (id, name, breed, age, gender, weight, color, description, status, dateArrived, photo, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, name, breed, age, gender, weight, color, description, status, now, photo, now, now],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, name, breed, age, gender, weight, color, description, status, dateArrived: now, photo, createdAt: now, updatedAt: now });
      }
    }
  );
});

// Update dog
app.put('/api/dogs/:id', (req, res) => {
  const { id } = req.params;
  const { name, breed, age, gender, weight, color, description, status, photo } = req.body;
  const now = new Date().toISOString();

  db.run(
    `UPDATE dogs SET name = ?, breed = ?, age = ?, gender = ?, weight = ?, color = ?, description = ?, status = ?, photo = ?, updatedAt = ?
     WHERE id = ?`,
    [name, breed, age, gender, weight, color, description, status, photo, now, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Dog not found' });
      } else {
        res.json({ id, name, breed, age, gender, weight, color, description, status, photo, updatedAt: now });
      }
    }
  );
});

// Delete dog
app.delete('/api/dogs/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM dogs WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Dog not found' });
    } else {
      res.json({ message: 'Dog deleted successfully' });
    }
  });
});

// Get dogs by status
app.get('/api/dogs/status/:status', (req, res) => {
  const { status } = req.params;
  db.all('SELECT * FROM dogs WHERE status = ? ORDER BY createdAt DESC', [status], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// ===== STATS ENDPOINT =====

app.get('/api/stats', (req, res) => {
  db.all('SELECT status, COUNT(*) as count FROM dogs GROUP BY status', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const stats = {
        total: 0,
        available: 0,
        adopted: 0,
        pending: 0
      };
      rows.forEach(row => {
        stats.total += row.count;
        if (row.status === 'available') stats.available = row.count;
        else if (row.status === 'adopted') stats.adopted = row.count;
        else if (row.status === 'pending') stats.pending = row.count;
      });
      res.json(stats);
    }
  });
});

// ===== FACEBOOK INTEGRATION ENDPOINT =====

// Fetch dogs from Facebook album
app.get('/api/dogs/facebook/sync', async (req, res) => {
  try {
    // Get credentials from database settings first, then fall back to env vars
    db.get('SELECT value FROM settings WHERE key = ?', ['facebook_album_id'], (err1, albumRow) => {
      db.get('SELECT value FROM settings WHERE key = ?', ['facebook_access_token'], (err2, tokenRow) => {
        const fbAlbumId = albumRow?.value || process.env.FACEBOOK_ALBUM_ID;
        const fbAccessToken = tokenRow?.value || process.env.FACEBOOK_ACCESS_TOKEN;

        if (!fbAlbumId || !fbAccessToken) {
          return res.status(400).json({ 
            error: 'Facebook credentials not configured. Please configure them in the admin panel.' 
          });
        }

        const fbUrl = `https://graph.facebook.com/v18.0/${fbAlbumId}/photos?fields=id,name,description,picture&access_token=${fbAccessToken}`;
        
        const https = require('https');
        https.get(fbUrl, (response) => {
          let data = '';
          response.on('data', (chunk) => { data += chunk; });
          response.on('end', () => {
            try {
              const fbData = JSON.parse(data);
              if (fbData.error) {
                return res.status(400).json({ error: fbData.error.message });
              }

              // Transform Facebook photos to dogs format
              const dogs = fbData.data.map((photo, index) => ({
                id: photo.id || `fb-${index}`,
                name: photo.name || `Dog ${index + 1}`,
                breed: 'Mixed',
                description: photo.description || '',
                photo: photo.picture || null,
                status: 'available',
                facebookPhotoId: photo.id,
                facebookSource: true
              }));

              res.json(dogs);
            } catch (e) {
              res.status(500).json({ error: 'Error parsing Facebook data' });
            }
          });
        }).on('error', (err) => {
          res.status(500).json({ error: 'Error fetching from Facebook: ' + err.message });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== MESSAGES ENDPOINTS =====

// Submit contact form
app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const id = uuidv4();
  const now = new Date().toISOString();

  db.run(
    'INSERT INTO messages (id, name, email, subject, message, status, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, email, subject, message, 'unread', now],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, success: true, message: 'Wiadomość została wysłana!' });
      }
    }
  );
});

// Get all messages (for admin)
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// ===== CONTACT & INFO ENDPOINT =====

app.get('/api/shelter-info', (req, res) => {
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
    krs: "0000062210",
    history: "Founded in 1992, the Azyl Association for Animal Friends was created to provide shelter for abandoned animals. In February 1996, the shelter was officially established.",
    capacity: 250
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
