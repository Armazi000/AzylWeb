const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      category TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating articles table:', err);
    else console.log('Articles table ready');
  });
}

// Routes

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

// ===== ARTICLES ENDPOINTS =====

// Get all articles
app.get('/api/articles', (req, res) => {
  db.all('SELECT * FROM articles ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows || []);
    }
  });
});

// Get single article
app.get('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Article not found' });
    } else {
      res.json(row);
    }
  });
});

// Create article
app.post('/api/articles', (req, res) => {
  const { title, content, category } = req.body;
  const id = uuidv4();
  const now = new Date().toISOString();

  db.run(
    `INSERT INTO articles (id, title, content, category, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, title, content, category, now, now],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, title, content, category, createdAt: now, updatedAt: now });
      }
    }
  );
});

// ===== FACEBOOK INTEGRATION ENDPOINT =====

// Fetch dogs from Facebook album
app.get('/api/dogs/facebook/sync', async (req, res) => {
  try {
    const fbAlbumId = process.env.FACEBOOK_ALBUM_ID;
    const fbAccessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!fbAlbumId || !fbAccessToken) {
      return res.status(400).json({ 
        error: 'Facebook credentials not configured. Set FACEBOOK_ALBUM_ID and FACEBOOK_ACCESS_TOKEN in .env' 
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
