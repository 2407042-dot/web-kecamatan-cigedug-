# Portal Web Kecamatan Cigedug — Frontend

Aplikasi web publik dan panel admin untuk **Kecamatan Cigedug, Kabupaten Garut**.

## Teknologi
- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS
- **Visualisasi:** Recharts

## Menjalankan di Lokal

```bash
npm install
# Buat file .env.local dengan variabel NEXT_PUBLIC_API_URL
npm run dev
```

## Environment Variables

Buat file `.env.local` di folder ini:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Cigedug@2026!
SESSION_SECRET=ganti_dengan_string_random_panjang
```

## Deployment
Deploy ke Vercel dengan root directory diset ke folder `frontend`.
