# 🎓 Polhas CareerBridge

Platform lengkap untuk mahasiswa Politeknik Hasnur: Skill roadmap interaktif, portfolio scorecard, dan lowongan magang di Hasnur Group & mitra.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-production-success)

---

## ✨ Fitur Utama

### 🌳 8 Skill Roadmap Interaktif
Visualisasi skill tree seperti game untuk 8 career paths:
- 💻 **Web Developer** - Full Stack Development
- 🎨 **UI/UX Designer** - Design & Prototyping
- 📊 **Data Analyst** - Data Analysis & Visualization
- 📱 **Digital Marketing** - SEO, Ads & Social Media
- 🚗 **Automotive Engineering** - Teknik Otomotif
- 🌾 **Agriculture & Plantation** - Budidaya Perkebunan
- 💰 **Accounting & Finance** - Akuntansi & Keuangan
- 💼 **Business & Marketing** - Bisnis & Pemasaran

**Fitur Roadmap:**
- Klik tombol career path untuk melihat skill tree
- Centang checkbox untuk menandai skill yang sudah dikuasai
- Progress tersimpan otomatis di browser
- Klik "Mulai Belajar" untuk detail skill & resources

### ✅ Portfolio Scorecard
Evaluasi kesiapan portfolio dan CV dengan sistem scoring interaktif.

**Kriteria Penilaian:**
- Foto profil professional (+10)
- Summary/About yang menarik (+15)
- Pengalaman/Project min 2 (+25)
- Daftar skills yang relevan (+20)
- Link portfolio/GitHub (+15)
- Kontak yang jelas (+15)

**Total Score: 100**

### 💼 47 Lowongan Magang & Kerja

**Distribusi per Program Studi:**
- D3 Teknik Otomotif: 6 lowongan
- D3 Teknik Informatika: 6 lowongan
- D3 Budidaya Tanaman Perkebunan: 6 lowongan
- D4 Teknologi Rekayasa Multimedia: 7 lowongan
- D4 Akuntansi Bisnis Digital: 6 lowongan
- D4 Bisnis Digital: 8 lowongan
- D4 Manajemen Pemasaran Internasional: 8 lowongan

**Perusahaan:**
- 25 perusahaan Hasnur Group
- 6 perusahaan mitra Polhas

**Fitur Lowongan:**
- Filter by program studi
- Filter by tipe (PKL/Kerja)
- Search by keyword
- Simpan lowongan favorit
- Lihat detail lengkap
- Skill matching untuk lowongan tertentu

---

## 🚀 Cara Menjalankan

### Prasyarat
- **VS Code** dengan extension **Live Server**
- Browser modern (Chrome/Firefox/Edge)

### Langkah-langkah

1. **Clone atau download repository**
   ```bash
   git clone <repository-url>
   cd polhas-career-bridge
   ```

2. **Buka dengan VS Code**
   ```bash
   code .
   ```

3. **Jalankan dengan Live Server**
   - Klik kanan file `index.html`
   - Pilih **"Open with Live Server"**
   - Website akan terbuka di `http://127.0.0.1:5500`

4. **Selesai!** Website siap digunakan 🎉

---

## 🐛 Troubleshooting

### Website Menampilkan Versi Lama?

Jika website menampilkan versi lama (hanya 4 tombol roadmap, bukan 8):

**Solusi 1: Clear Browser Cache**
1. Tekan `Ctrl + Shift + Delete`
2. Pilih **"All time"** atau **"Sepanjang waktu"**
3. Centang **"Cached images and files"**
4. Klik **"Clear data"**
5. Tutup browser sepenuhnya
6. Buka lagi dan akses website

**Solusi 2: Hard Refresh**
1. Buka website
2. Tekan `Ctrl + Shift + R` (atau `Ctrl + F5`)

**Solusi 3: Gunakan Incognito Mode**
1. Tekan `Ctrl + Shift + N` (Chrome/Edge) atau `Ctrl + Shift + P` (Firefox)
2. Buka `http://127.0.0.1:5500`

**Solusi 4: Gunakan Browser Lain**
- Coba Chrome, Firefox, atau Edge
- Browser yang belum pernah buka website ini tidak punya cache

### JavaScript Tidak Jalan?

Pastikan:
- ✅ Menggunakan **Live Server** (bukan double-click index.html)
- ✅ Browser support ES6 modules
- ✅ Tidak ada error di Console (F12)

---

## 📁 Struktur Project

```
polhas-career-bridge/
├── assets/
│   └── img/                    # Gambar logo perusahaan
│       ├── logo-website/       # Logo website
│       ├── mitra-hasnur/       # Logo Hasnur Group (3 files)
│       ├── mitra-polhas/       # Logo mitra Polhas (6 files)
│       └── supported/          # Logo pendukung (4 files)
├── css/
│   └── style.css              # Styling BWA clean white
├── js/
│   ├── data.js                # Data lowongan & roadmaps
│   └── main.js                # Logic aplikasi
├── .gitignore                 # Git ignore file
├── index.html                 # Halaman utama
└── README.md                  # Dokumentasi ini
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Struktur semantic
- **Tailwind CSS** (via CDN) - Utility-first CSS framework
- **Vanilla JavaScript** (ES6 Modules) - No framework, pure JS

### Libraries
- **SweetAlert2** - Beautiful modals & alerts
- **Toastify** - Toast notifications
- **Plus Jakarta Sans** - Font (BWA style)

### Storage
- **LocalStorage** - Menyimpan progress skill & lowongan favorit

### Development
- **VS Code** - Code editor
- **Live Server** - Development server

---

## 📊 Data

### Lowongan (47 total)
Data lowongan tersimpan di `js/data.js` dalam array `jobs`:

```javascript
{
    id: Number,              // Unique ID
    company: String,         // Nama perusahaan
    companyId: Number,       // Reference ke companies
    logo: String,            // Path logo
    role: String,            // Posisi
    type: String,            // "PKL" atau "Kerja"
    prodi: Array<String>,    // Program studi (bisa multiple)
    description: String,     // Deskripsi lowongan
    requirements: Array,     // Persyaratan
    requiredSkills: Array,   // Skill yang dibutuhkan (optional)
    location: String,        // Lokasi
    posted: String          // Tanggal posting
}
```

### Skill Roadmaps (8 total)
Data roadmap tersimpan di `js/data.js` dalam object `skillRoadmaps`:

```javascript
{
    "role-key": {
        title: String,           // Judul roadmap
        description: String,     // Deskripsi
        levels: [                // 4 levels per roadmap
            {
                level: Number,   // 1-4
                title: String,   // Judul level
                skills: [        // Skills per level
                    {
                        name: String,
                        description: String,
                        resources: Array<String>,
                        completed: Boolean
                    }
                ]
            }
        ]
    }
}
```

### Perusahaan (25 total)
Data perusahaan Hasnur Group tersimpan di `js/data.js` dalam array `companies`.

### Program Studi (7 total)
Data program studi tersimpan di `js/data.js` dalam array `programStudi`.

---

## 🎨 Design System

### Colors (BWA Clean White Style)
- **Primary:** `#2563eb` (Blue 600)
- **Secondary:** `#8b5cf6` (Purple 600)
- **Success:** `#10b981` (Green 500)
- **Background:** `#ffffff` (White)
- **Gray:** `#f9fafb` (Gray 50)

### Typography
- **Font Family:** Plus Jakarta Sans
- **Weights:** 300, 400, 500, 600, 700, 800

### Spacing
- **Container:** `max-width: 1280px`
- **Padding:** `px-6` (24px)
- **Gap:** `gap-6` (24px)

### Border Radius
- **Small:** `rounded-lg` (8px)
- **Medium:** `rounded-xl` (12px)
- **Large:** `rounded-2xl` (16px)

---

## 🎯 Fitur Interaktif

### 1. Skill Roadmap
- Klik tombol career path → Tampil skill tree
- Centang checkbox → Tandai skill selesai
- Progress tersimpan di LocalStorage
- Klik "Mulai Belajar" → Detail skill

### 2. Portfolio Scorecard
- Centang checklist → Hitung skor otomatis
- Progress bar animasi
- Rekomendasi berdasarkan skor
- Skor tersimpan otomatis

### 3. Lowongan
- Search real-time
- Filter by prodi & tipe
- Klik "Lihat Detail" → Modal detail
- Simpan lowongan favorit
- Skill matching (jika ada requiredSkills)

### 4. Job Detail Modal
- Info lengkap lowongan
- Persyaratan detail
- Skill yang dibutuhkan (jika ada)
- Link ke roadmap terkait
- Tombol "Lamar Sekarang"

---

## 💾 LocalStorage

Data yang disimpan di browser:

### savedJobs
Array ID lowongan yang disimpan user:
```javascript
["1", "5", "12"]
```

### completedSkills
Object skill yang sudah diselesaikan:
```javascript
{
    "web-dev-1-HTML": true,
    "web-dev-1-CSS": true,
    "ui-ux-1-Figma Basics": true
}
```

**Note:** Data akan hilang jika clear browser data atau ganti browser.

---

## 🚀 Deployment

### Hosting Options
- **GitHub Pages** - Free, mudah setup
- **Netlify** - Free, auto deploy from Git
- **Vercel** - Free, fast deployment
- **Firebase Hosting** - Free tier available

### Pre-deployment Checklist
- [ ] Test di multiple browsers
- [ ] Test responsive design
- [ ] Optimize images
- [ ] Update meta tags (title, description, OG tags)
- [ ] Test all features
- [ ] No console errors

### Deploy ke GitHub Pages

1. Push ke GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch `main`
4. Folder: `/ (root)`
5. Save
6. Website akan live di `https://username.github.io/repo-name`

---

## 🤝 Contributing

Ingin berkontribusi? Silakan:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

Project ini dibuat untuk **Politeknik Hasnur** dan didukung oleh:
- PT Spektrum Inovasi Teknologi (Spinotek)
- HIMA Teknik Informatika
- Shift Digital Indonesia

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

## 📞 Contact

- **Website:** [polhas.ac.id](https://polhas.ac.id)
- **Email:** info@polhas.ac.id
- **Location:** Banjarmasin, Kalimantan Selatan

---

## 📈 Version History

### v1.0.0 (2026-02-12)
- ✅ 8 Interactive skill roadmaps
- ✅ Portfolio scorecard
- ✅ 47 job listings
- ✅ Search & filter system
- ✅ LocalStorage integration
- ✅ Responsive design
- ✅ BWA clean white style

---

**Made with ❤️ by Politeknik Hasnur**

**Version:** 1.0.0  
**Last Updated:** February 12, 2026  
**Status:** Production Ready ✅
