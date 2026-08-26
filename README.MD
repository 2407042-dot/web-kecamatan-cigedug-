# Web Portal Resmi Kecamatan Cigedug

Selamat datang di repositori resmi **Portal Web Kecamatan Cigedug, Kabupaten Garut**. Portal ini dibangun untuk menyediakan akses informasi publik yang transparan, pelayanan digital yang cepat, serta menjadi wadah aspirasi masyarakat secara interaktif dan *real-time*.

## 🚀 Fitur Utama

- **Sistem Pelayanan Terpadu & Aspirasi**: Masyarakat dapat mengirimkan keluhan/aspirasi secara anonim dengan batasan jumlah laporan (Anti-Spam) serta sensor kata-kata kasar (*Profanity Filter*) otomatis.
- **Dashboard Admin Dinamis**: Panel *backend* untuk mengelola seluruh aspek portal seperti Berita, Pengumuman, Agenda, Galeri Foto, Inovasi, Produk UMKM, hingga Foto Latar Belakang tanpa perlu menyentuh kode.
- **Visualisasi Data & Infografis**: Integrasi data kependudukan dan fasilitas umum menggunakan *Recharts* yang interaktif.
- **Profil Desa Terintegrasi**: Halaman khusus untuk 5 Desa (Cigedug, Barusuda, Cintanagara, Sindangsari, Sukahurip) yang terintegrasi secara otomatis dengan portal Kecamatan.
- **Keamanan & Autentikasi**: Sistem login untuk Administrator serta fitur pengaturan sandi internal.

## 🛠 Teknologi yang Digunakan

Proyek ini mengadopsi arsitektur *Monorepo* yang terbagi atas Frontend dan Backend:

### **Frontend**
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Library:** Recharts (Data Visualization), Lucide/Material Symbols (Icons)
- **Language:** TypeScript

### **Backend**
- **Framework:** Express.js (Node.js)
- **Database ORM:** Prisma
- **Database:** SQLite (Untuk kemudahan *deployment* awal)
- **File Upload:** Multer (Penyimpanan lokal di folder `/uploads`)

## 📁 Struktur Direktori

```text
📦 web-desa
 ┣ 📂 backend          # API Server (Express + Prisma + SQLite)
 ┣ 📂 frontend         # Web Interface (Next.js 14)
 ┣ 📂 data set         # Kumpulan data mentah (CSV) untuk infografis
 ┣ 📜 server.bat       # Script automasi untuk menjalankan aplikasi di Windows
 ┗ 📜 README.md        # Dokumentasi Proyek
```

## ⚙️ Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan sistem Anda telah terinstal:
- **Node.js** (Versi 18 atau lebih baru)
- **NPM** atau **Yarn**

## 🚦 Panduan Menjalankan Aplikasi (Local Development)

### Menggunakan Script Otomatis (Windows)
Cara termudah menjalankan aplikasi di lingkungan Windows adalah menggunakan berkas *batch* yang sudah disediakan. Cukup klik dua kali (atau jalankan di terminal):
```bash
server.bat
```
Script ini akan otomatis meng-install *dependencies* yang kurang, melakukan migrasi *database*, dan menyalakan *server backend* serta *frontend* secara bersamaan.

### Menjalankan Secara Manual

Jika Anda menggunakan OS lain (Linux/Mac) atau ingin menjalankannya secara terpisah, ikuti langkah berikut:

**1. Konfigurasi Backend**
```bash
cd backend
npm install
# Set database schema
npx prisma db push
# Jalankan server API
npm start
```
*Backend akan berjalan di `http://localhost:5000`*

**2. Konfigurasi Frontend**
Buka terminal baru:
```bash
cd frontend
npm install
# Jalankan development server
npm run dev
```
*Frontend akan berjalan di `http://localhost:3000`*

## 🔐 Akses Admin (Default)

Untuk mengelola website, buka `http://localhost:3000/admin/login` menggunakan kredensial standar berikut (Sistem akan membuatkan otomatis jika database kosong):

- **Username:** `admin`
- **Password:** `password123`

> **Penting:** Segera ganti kata sandi ini melalui menu "Pengaturan Admin" setelah Anda berhasil masuk ke dalam *dashboard*.

## ⚖️ Lisensi

Dikembangkan secara khusus untuk keperluan operasional **Kecamatan Cigedug, Kabupaten Garut**. Seluruh aset foto dan data kependudukan merupakan hak milik Pemerintah Kecamatan Cigedug.
