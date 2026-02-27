# 🐾 Azyl – Dog Shelter Website  

> Full-stack web application built to support a local dog shelter and improve adoption visibility.

🌍 **Live Demo**  
https://azyl-web-vbk3j.ondigitalocean.app/

---

## 🌎 Language

🇬🇧 English (this file)  
🇵🇱 Polish version available in `README.pl.md`

---

## 📌 Overview

Azyl is a modern full-stack website created for a dog shelter to:

- 🐶 Present dogs available for adoption  
- 📖 Share shelter information  
- 📞 Provide contact details  
- 💛 Increase adoption visibility  
- 🌐 Strengthen online presence  

The goal was to build something clean, modern, and easy to maintain.

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- HTML5
- CSS3
- Tailwind CSS

### Backend
- Next.js API Routes
- SQLite (`.db` database)

### Deployment
- DigitalOcean

---

## 🏗 Architecture

- Server-side rendering with Next.js  
- API routes handling backend logic  
- Local SQLite database for data storage  
- Component-based UI structure  
- Tailwind for responsive design  

---

## 📂 Project Structure

```
.
├── public/            # Static assets
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Pages & API routes
│   ├── styles/        # Global styles
│   └── lib/           # Database & utilities
├── database.db        # SQLite database
├── .env.local         # Environment variables (ignored)
└── README.md
```

---

## ⚙️ Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Armazi000/AzylWeb.git
cd REPO_NAME
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```
DATABASE_PATH=./database.db
```

⚠️ Never commit `.env.local` to version control.

---

## 🚀 Production Build

```bash
npm run build
npm start
```

---

## 📈 Future Improvements

- SEO optimization

---

## 👨‍💻 Author

Created by **Armazi**  
IT Student | Music Producer/Composer | Game Composer | Developer  

---

## ❤️ Purpose

This project was created to help a local dog shelter increase adoption opportunities and improve its digital presence.

If you’re interested in supporting the shelter — visit the live website.
