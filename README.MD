# 🌐 Portal Web Resmi Kecamatan Cigedug

[![Deploy Status](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com)
[![Backend Status](https://img.shields.io/badge/Backend-Vercel-black?logo=vercel)](https://web-kecamatan-cigedug-backend-five.vercel.app)
[![Database](https://img.shields.io/badge/Database-Supabase-green?logo=supabase)](https://supabase.com)

Portal digital resmi **Kecamatan Cigedug, Kabupaten Garut, Jawa Barat**. Dibangun untuk menyediakan akses informasi publik yang transparan, pelayanan digital yang cepat, serta menjadi wadah aspirasi masyarakat secara interaktif.

---

## 🚀 Fitur Utama

- **Dashboard Admin Dinamis** — Panel pengelolaan konten (Berita, Pengumuman, Agenda, Galeri, Inovasi, Produk UMKM) tanpa perlu coding.
- **Visualisasi Data & Infografis** — Data kependudukan dan fasilitas umum yang interaktif menggunakan Recharts.
- **Profil 5 Desa** — Halaman khusus Desa Cigedug, Barusuda, Cintanagara, Sindangsari, dan Sukahurip.
- **Sistem Aspirasi & Pengaduan** — Warga bisa mengirim aspirasi dengan *rate-limiting* dan filter kata kasar otomatis.
- **Keamanan Admin** — Login dengan sesi terenkripsi dan proteksi CSRF.
- **Open Data** — Katalog dataset publik yang bisa diunduh.

---

## 🛠 Teknologi

| Bagian | Teknologi |
|--------|-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Express.js (Node.js), Prisma ORM |
| **Database** | PostgreSQL via Supabase |
| **File Storage** | Supabase Storage |
| **Deployment** | Vercel (Frontend & Backend) |

---

## 📁 Struktur Direktori

```
📦 web-kecamatan-cigedug
 ┣ 📂 backend          # API Server (Express + Prisma + Supabase)
 ┣ 📂 frontend         # Web Interface (Next.js 14)
 ┣ 📂 data set         # Dataset publik (CSV/PDF)
 ┣ 📜 server.bat       # Script untuk menjalankan lokal (Windows)
 ┗ 📜 README.md        # Dokumentasi ini
```

---

## 🌍 Deployment (Produksi)

Aplikasi ini sudah ter-deploy penuh secara online:

- **Frontend:** Tersedia di Vercel (branch `main`, folder `frontend`)
- **Backend API:** `https://web-kecamatan-cigedug-backend-five.vercel.app`
- **Database:** PostgreSQL di Supabase (region Asia-Pacific)

---

## ⚙️ Menjalankan di Lokal (Development)

### Prasyarat
- Node.js versi 18 atau lebih baru
- NPM

### 1. Clone Repository
```bash
git clone https://github.com/2407042-dot/web-kecamatan-cigedug-.git
cd web-kecamatan-cigedug-
```

### 2. Setup Backend
```bash
cd backend
npm install
# Buat file .env dan isi variabel DATABASE_URL, DIRECT_URL, SUPABASE_URL, SUPABASE_KEY
npx prisma generate
npm start
```
Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend
Buka terminal baru:
```bash
cd frontend
npm install
# Buat file .env.local dan isi NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```
Frontend akan berjalan di `http://localhost:3000`

### 4. Cara Cepat (Windows)
Jalankan script otomatis:
```bash
server.bat
```

---

## 🔐 Akses Admin

Buka `[URL Website]/admin/login`

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | *(hubungi administrator)* |

> **Catatan:** Password dikelola melalui menu **Pengaturan Admin** di dalam dashboard.

---

## 📋 Panduan untuk Hosting Berbayar (cPanel / VPS)

Jika kecamatan ingin memindahkan ke hosting berbayar:

1. **Upload folder `backend`** ke server Node.js / VPS.
2. **Upload folder `frontend`** (setelah build: `npm run build`) ke server.
3. Set **Environment Variables** di server sesuai file `.env` contoh.
4. Jalankan backend dengan `npm start` (gunakan PM2 untuk produksi).
5. Arahkan domain ke frontend (port 3000) via Nginx/Apache reverse proxy.

---

## ⚖️ Lisensi

Dikembangkan khusus untuk **Kecamatan Cigedug, Kabupaten Garut, Jawa Barat**.  
Seluruh aset foto, data kependudukan, dan konten merupakan hak milik Pemerintah Kecamatan Cigedug.

---

*Dibuat dengan ❤️ oleh Tim KKN Kelompok 14 — 2025/2026*