# EasyPanel Hosting Guide for Schronisko AZYL Website

This guide covers deploying both the React frontend and Node.js/Express backend on EasyPanel.

## Prerequisites

- EasyPanel account with hosting
- Domain name (e.g., schroniskoazyl.pl)
- Git installed locally
- FTP/SFTP access details from EasyPanel
- SSH access enabled on your hosting account

## Architecture Overview

```
Frontend (React)     → Built static files → served via web server
Backend (Node.js)    → Express API        → runs on specific port
Database (SQLite)    → shelter.db         → stored on server
```

---

## Part 1: Backend Deployment (Node.js/Express)

### Step 1: Prepare Backend for Production

1. Open `backend/.env` and ensure it has:
```env
PORT=5000
NODE_ENV=production
FACEBOOK_ALBUM_ID=your_album_id
FACEBOOK_ACCESS_TOKEN=your_token
```

2. Ensure `backend/package.json` has:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Step 2: Upload Backend Files via FTP

1. Connect to EasyPanel FTP server using FileZilla or similar
2. Create directory structure:
   ```
   public_html/
   ├── api/
   │   ├── server.js
   │   ├── package.json
   │   ├── package-lock.json
   │   ├── shelter.db
   │   └── node_modules/ (will be installed on server)
   ```

3. Upload these files to `/api/`:
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `.env` (set proper permissions: 600)

### Step 3: Install Dependencies on Server

1. Access EasyPanel > Terminal/SSH
2. Navigate to your backend directory:
   ```bash
   cd /home/yourusername/public_html/api
   ```

3. Install dependencies:
   ```bash
   npm install --production
   ```

4. Test if server starts:
   ```bash
   npm start
   ```
   - It should show: "Server running on http://localhost:5000"
   - Press Ctrl+C to stop

### Step 4: Set Up Process Manager (PM2)

EasyPanel supports PM2 for keeping Node apps running.

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Create `ecosystem.config.js` in `/api/`:
   ```javascript
   module.exports = {
     apps: [{
       name: 'schronisko-api',
       script: './server.js',
       instances: 1,
       exec_mode: 'cluster',
       env: {
         NODE_ENV: 'production',
         PORT: 5000
       },
       error_file: './logs/err.log',
       out_file: './logs/out.log',
       log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
     }]
   };
   ```

3. Create logs directory:
   ```bash
   mkdir logs
   chmod 755 logs
   ```

4. Start with PM2:
   ```bash
   pm2 start ecosystem.config.js
   pm2 startup
   pm2 save
   ```

### Step 5: Configure Apache Proxy (EasyPanel)

EasyPanel uses Apache. Configure it to proxy API requests to Node.js backend.

1. In EasyPanel, go to **Domains** and add/edit your domain
2. Create/edit `.htaccess` in `/public_html/api/`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /api/
     
     # Proxy to Node backend
     RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]
   </IfModule>
   ```

3. Enable required Apache modules (via EasyPanel):
   - `mod_proxy`
   - `mod_proxy_http`
   - `mod_rewrite`

**Alternative (Subdomain):**
If your host supports it, create API on subdomain `api.yourdomain.com`:

In EasyPanel > Subdomains, create `api.yourdomain.com` pointing to `/api/` directory, then add `.htaccess` above.

---

## Part 2: Frontend Deployment (React)

### Step 1: Build React App

On your local machine:

```bash
cd frontend
npm run build
```

This creates `frontend/build/` directory with optimized static files.

### Step 2: Upload Frontend Files

1. Connect via FTP
2. Upload everything from `frontend/build/` to `/public_html/`:
   - `index.html`
   - `static/` folder
   - `favicon.ico`
   - Public assets (logo.svg, hero-animals.jpg, etc.)

### Step 3: Configure Frontend Environment

1. Create `.env.production` in frontend root:
   ```env
   REACT_APP_API_URL=https://yourdomain.com/api
   REACT_APP_ADMIN_USERNAME=admin
   REACT_APP_ADMIN_PASSWORD=your_secure_password
   ```

2. Add to `.htaccess` in `/public_html/`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     
     # Route all requests through index.html for React Router
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^ index.html [QSA,L]
   </IfModule>
   ```

### Step 4: Set Proper Permissions

```bash
chmod 755 /home/yourusername/public_html
chmod 644 /home/yourusername/public_html/*.html
chmod 755 /home/yourusername/public_html/static
```

---

## Part 3: Database Setup

### SQLite (Current Setup)

Your SQLite database (`shelter.db`) is already file-based:

1. Ensure `backend/shelter.db` is uploaded
2. Set permissions:
   ```bash
   chmod 666 /home/yourusername/public_html/api/shelter.db
   chmod 755 /home/yourusername/public_html/api
   ```

3. **Backup regularly** - download shelter.db weekly via FTP

### Migrate to MySQL (Optional - Better for Production)

If EasyPanel supports MySQL:

1. Create MySQL database via EasyPanel panel
2. Update `backend/server.js` to use MySQL instead of SQLite
3. Run migrations

---

## Part 4: SSL/HTTPS Setup

1. In EasyPanel > SSL Certificates
2. Click "Issue Free SSL" (usually Let's Encrypt)
3. Select your domain
4. Wait for certificate to be issued
5. Force HTTPS in `.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

## Part 5: Environment Variables & Secrets

### Setting API Keys Securely

1. **Via .env file** (already done):
   - Upload `.env` to `/api/` directory
   - Set permissions: `chmod 600 /api/.env`
   - Keep out of version control

2. **Via EasyPanel Environment Variables**:
   - Some hosts allow setting env vars through panel
   - Check EasyPanel documentation

### Facebook Integration

1. Generate fresh access tokens before deployment
2. Store in `.env`:
   ```env
   FACEBOOK_ALBUM_ID=your_album_id
   FACEBOOK_ACCESS_TOKEN=your_long_lived_token
   ```

3. **Keep token private** - set `.env` to 600 permissions
4. Regenerate token every 60 days

---

## Part 6: Domain Configuration

### Update DNS Settings

In your domain registrar (not EasyPanel), update DNS records:

```
Type    Name                  Value
A       yourdomain.com        your.easypanel.ip.address
CNAME   www                   yourdomain.com
CNAME   api                   yourdomain.com (if using subdomain)
MX      yourdomain.com        mail records (if needed)
```

### In EasyPanel

1. Go to **Domains**
2. Add your domain
3. Point to `/public_html/` for frontend
4. If using subdomains, create `api` subdomain → `/public_html/api/`

---

## Part 7: Testing & Verification

### Test Backend API

```bash
curl https://yourdomain.com/api/shelter-info
```

Should return JSON with shelter information.

### Test Frontend

Visit `https://yourdomain.com` in browser - should load React app

### Check Console Logs

```bash
# SSH into server
ssh youruser@yourdomain.com

# View PM2 logs
pm2 logs schronisko-api

# Or check error logs
tail -f /home/yourusername/public_html/api/logs/err.log
```

---

## Part 8: Continuous Deployment (Optional)

### Automated Updates with Git

1. Initialize git repo on server:
   ```bash
   cd /home/yourusername/public_html/api
   git init
   git remote add origin https://github.com/yourusername/your-repo.git
   ```

2. Create `deploy.sh`:
   ```bash
   #!/bin/bash
   cd /home/yourusername/public_html/api
   git pull origin main
   npm install --production
   pm2 restart schronisko-api
   ```

3. Make executable:
   ```bash
   chmod +x deploy.sh
   ```

4. Set up webhook in GitHub to trigger `deploy.sh` on push

---

## Part 9: Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Backup database: Download `shelter.db` via FTP
- Check PM2 status: `pm2 status`

**Monthly:**
- Review error logs
- Update Node.js packages: `npm update`
- Check disk space in EasyPanel

**Quarterly:**
- Renew Facebook access token
- Update React build if dependencies have updates

### Useful PM2 Commands

```bash
# View all running apps
pm2 list

# View real-time logs
pm2 logs schronisko-api

# Restart app
pm2 restart schronisko-api

# Stop app
pm2 stop schronisko-api

# View app info
pm2 info schronisko-api
```

---

## Part 10: Troubleshooting

### API Returns 404

1. Check `.htaccess` proxy rules
2. Verify Node app is running: `pm2 status`
3. Check logs: `pm2 logs schronisko-api`

### React Router Links Don't Work

1. Verify `.htaccess` rewrite rules are enabled
2. Check `mod_rewrite` is installed: `apache2ctl -M | grep rewrite`

### Database Lock Error

1. SQLite can have lock issues with multiple requests
2. Solution: Migrate to MySQL or increase timeout in `server.js`:
   ```javascript
   db.configure("busyTimeout", 5000);
   ```

### Out of Memory

1. Check Node memory: `pm2 info schronisko-api`
2. Increase PM2 memory limit in `ecosystem.config.js`:
   ```javascript
   max_memory_restart: '300M'
   ```

### CORS Errors

1. Update `backend/server.js`:
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com',
     credentials: true
   }));
   ```

2. Restart backend: `pm2 restart schronisko-api`

---

## Deployment Checklist

- [ ] Backend files uploaded to `/api/`
- [ ] `npm install --production` run on server
- [ ] PM2 installed and configured
- [ ] PM2 ecosystem config created
- [ ] Apache proxy configured (.htaccess)
- [ ] Frontend built with `npm run build`
- [ ] Frontend files uploaded to `/public_html/`
- [ ] React Router .htaccess configured
- [ ] .env files uploaded and permissions set (600)
- [ ] SSL certificate installed
- [ ] HTTPS redirect configured
- [ ] Domain DNS updated
- [ ] Tested /api/shelter-info endpoint
- [ ] Tested React app loads
- [ ] Admin login works
- [ ] Facebook album loads dogs
- [ ] Database backed up

---

## Quick Start Summary

```bash
# 1. Local build
cd frontend && npm run build

# 2. Upload via FTP:
# - /public_html/ ← frontend/build/* 
# - /public_html/api/ ← backend files

# 3. SSH into server and run:
cd /home/yourusername/public_html/api
npm install --production
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save

# 4. Configure .htaccess files
# 5. Update DNS
# 6. Enable SSL
# 7. Test: https://yourdomain.com
```

---

## Support Resources

- **EasyPanel Docs**: Check your host's documentation
- **PM2 Docs**: https://pm2.keymetrics.io/docs
- **React Build Guide**: https://create-react-app.dev/docs/deployment/
- **Express Deployment**: https://expressjs.com/en/advanced/best-practice-performance.html

