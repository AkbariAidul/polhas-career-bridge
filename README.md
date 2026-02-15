# 🎓 Polhas CareerBridge

Platform lengkap untuk mahasiswa Politeknik Hasnur: Skill roadmap interaktif, portfolio scorecard, job recommendation, gamification, dan 47 lowongan magang.

![Version](https://img.shields.io/badge/version-1.6.0-blue)
![Status](https://img.shields.io/badge/status-full--multipage-success)

---

## 🌐 Full Multi-Page Structure

### Main Pages:
- **index.html** - Landing page dengan hero, features overview & CTA
- **roadmap.html** - Halaman khusus Skill Roadmap (8 career paths)
- **portfolio.html** - Halaman khusus Portfolio Check & Scorecard
- **jobs.html** - Halaman khusus Job Listings (47 lowongan)
- **dashboard.html** - Gamification progress & achievements
- **saved-jobs.html** - Saved jobs collection
- **about.html** - Tentang platform & cara kerja

### Navigation Flow:
- Landing (index.html) → Separate pages for each feature
- Each feature has its own dedicated page
- Consistent navbar across all pages
- No more single-page scrolling - true multi-page experience!

---

## ✨ Fitur Utama (Hackathon Ready!)

### 🔐 Authentication System
- Register & Login dengan LocalStorage
- User profile management
- Auto-generated avatar
- Session management

### 🎮 Gamification System
- 12 Achievements dengan points & level
- Auto tracking semua aktivitas
- Progress dashboard
- Achievement notifications

### 🤖 Smart Job Recommendation
- Rekomendasi berdasarkan skill & prodi
- Skill match percentage
- Personalized untuk setiap user
- Real-time updates

### 💼 Saved Jobs Page
- Halaman khusus lowongan tersimpan
- Quick access ke job favorit
- Easy unsave functionality

### 🌳 8 Skill Roadmap Interaktif
- Web Developer, UI/UX, Data Analyst, Digital Marketing
- Automotive, Agriculture, Accounting, Business
- 4 levels per roadmap
- Progress tracking dengan checkbox

### ✅ Portfolio Scorecard
- 6 kriteria penilaian (total 100 poin)
- Real-time score calculation
- Progress bar & recommendations

### 💼 47 Lowongan Magang & Kerja
- Search & filter (prodi, tipe)
- Job detail modal
- Skill matching
- Save/apply functionality

---

## 🚀 Cara Menjalankan

1. Install **Live Server** extension di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Website buka di `http://127.0.0.1:5500`

**Navigation Flow:**
- Start at landing page (`index.html`)
- Click feature cards → Goes to dedicated pages (roadmap.html, portfolio.html, jobs.html)
- Each feature has its own page - no scrolling between sections
- Access Dashboard, Saved Jobs, About from navbar
- All navigation is consistent across pages

---

## 🎯 Fitur Pemenang Hackathon

### 1. Smart Recommendation
- Algoritma scoring berdasarkan prodi (40%), skill match (40%), job type (10%), recency (10%)
- Personalized untuk setiap user
- Real-time update saat complete skill

### 2. Gamification
- 12 achievements unlock otomatis
- Points & level system
- Stats tracking lengkap
- Dashboard visual

### 3. Complete User Journey
- Register → Login → Complete Skills → Get Recommendations → Apply Jobs
- Seamless experience dari belajar sampai apply

### 4. Data-Driven
- 47 real job listings
- 8 comprehensive roadmaps
- 25 companies
- 7 study programs

---

## 📁 Struktur Project

```
polhas-career-bridge/
├── assets/img/              # Logos (24 files)
├── css/style.css           # Enhanced styles
├── js/
│   ├── auth.js            # Authentication
│   ├── ui.js              # UI utilities
│   ├── gamification.js    # Gamification
│   ├── recommendation.js  # Job recommendation
│   ├── data.js            # Data
│   └── main.js            # Main controller
├── index.html             # Landing page
├── roadmap.html           # Skill Roadmap page
├── portfolio.html         # Portfolio Check page
├── jobs.html              # Job Listings page
├── dashboard.html         # Gamification dashboard
├── saved-jobs.html        # Saved jobs page
├── about.html             # About page
├── app.html               # Legacy (single-page version)
└── README.md              # This file
```

---

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript (ES6 Modules)
- LocalStorage
- SweetAlert2
- Toastify

**No framework, no backend, no database!**

---

## 💾 LocalStorage Data

```javascript
{
    users: [],              // All registered users
    currentUser: {},        // Current logged in user
    savedJobs: [],          // Saved job IDs
    completedSkills: {},    // Completed skills
    userProgress: {}        // Gamification progress
}
```

---

## 🎨 Design

- BWA Clean White Minimalist Style
- Responsive (mobile, tablet, desktop)
- Smooth animations
- Accessible UI

---

## 📊 Statistics

- 47 Job Listings
- 25 Companies (Hasnur Group + Partners)
- 8 Career Roadmaps
- 7 Study Programs
- 12 Achievements
- 100+ Skills

---

## 🏆 Hackathon Highlights

### Innovation
- ✅ Smart recommendation algorithm
- ✅ Gamification system
- ✅ Skill-based job matching
- ✅ Complete user journey

### Technical Excellence
- ✅ Modular architecture
- ✅ Clean code structure
- ✅ ES6 modules
- ✅ No framework dependency

### User Experience
- ✅ Intuitive interface
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Fast performance

### Completeness
- ✅ Authentication
- ✅ Data management
- ✅ Progress tracking
- ✅ Recommendations

---

## 👥 Credits

**Developed by:**
- Politeknik Hasnur
- PT Spektrum Inovasi Teknologi (Spinotek)
- HIMA Teknik Informatika
- Shift Digital Indonesia

**Supported by:**
- Hasnur Group
- Yayasan Hasnur Centre

---

## 📈 Version History

### v1.6.0 (2026-02-12) - FULL MULTI-PAGE ✅
- ✨ Complete separation: each feature has its own page
- ✨ roadmap.html - Dedicated Skill Roadmap page
- ✨ portfolio.html - Dedicated Portfolio Check page
- ✨ jobs.html - Dedicated Job Listings page
- 🔗 True multi-page experience (no single-page scrolling)
- 🎨 Consistent navbar and navigation across all pages
- 📝 Updated all links and navigation flows

### v1.5.0 - Multi-Page Structure
### v1.4.0 - Smart Recommendations
### v1.3.0 - Authentication System
### v1.2.0 - Gamification System
### v1.1.0 - Enhanced UI/UX
### v1.0.0 - Initial Release

---

**Made with ❤️ for SPINOTEK Vibecoding Hackathon Vol. 02**

**Version:** 1.6.0  
**Last Updated:** February 12, 2026  
**Status:** Full Multi-Page Complete 🌐
