const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');
let csvContent = fs.readFileSync(csvPath, 'utf8');

const newRowsData = [
  // --- DESA CIGEDUG ---
  { kat: 'Pendidikan', nama: 'SDN 3 Cigedug', desa: 'Cigedug', alamat: 'Desa Cigedug', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'SD IT Hidayatul Mubtadiin', desa: 'Cigedug', alamat: 'Kp. Barukai Kaler', ket: 'Sekolah Dasar IT' },
  { kat: 'Pendidikan', nama: 'SD IT Miftahul Huda', desa: 'Cigedug', alamat: 'Kp. Cibelendung', ket: 'Sekolah Dasar IT' },
  { kat: 'Pendidikan', nama: 'KB Baetul Mu\'minin', desa: 'Cigedug', alamat: 'Situ Gede', ket: 'PAUD/Kelompok Bermain' },
  
  // --- DESA CINTANAGARA ---
  { kat: 'Pendidikan', nama: 'SDN 2 Cintanagara', desa: 'Cintanagara', alamat: 'Kp. Siderang', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'MI Al-Muttaqin 82', desa: 'Cintanagara', alamat: 'Kp. Siderang Legok', ket: 'Madrasah Ibtidaiyah' },
  { kat: 'Pendidikan', nama: 'SMPN 2 Cigedug', desa: 'Cintanagara', alamat: 'Jl. Cicayur RT 01/RW 01', ket: 'Sekolah Menengah Pertama Negeri' },
  { kat: 'Pendidikan', nama: 'KB Cinta Harapan', desa: 'Cintanagara', alamat: 'Situ Kiruh', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pesantren', nama: 'PPS Miftahul Huda', desa: 'Cintanagara', alamat: 'Kp. Cibelendung', ket: 'Pondok Pesantren' },
  { kat: 'Ibadah', nama: 'Masjid Al-Husna', desa: 'Cintanagara', alamat: 'Kp. Sukaresmi 1', ket: 'Pusat Keagamaan' },
  { kat: 'Ibadah', nama: 'Masjid Umar bin Khattab', desa: 'Cintanagara', alamat: 'Desa Cintanagara', ket: 'Pusat Ibadah' },
  { kat: 'Ibadah', nama: 'Masjid Nurul Millah', desa: 'Cintanagara', alamat: 'Kp. Sukaresmi 2', ket: 'Pusat Ibadah' },
  { kat: 'Ibadah', nama: 'Masjid Al Barokah', desa: 'Cintanagara', alamat: 'Kp. Jolok Lebak', ket: 'Pusat Ibadah' },
  { kat: 'UMKM', nama: 'Petani Kentang Cintanagara', desa: 'Cintanagara', alamat: 'Desa Cintanagara', ket: 'Kelompok Tani' },
  { kat: 'UMKM', nama: 'Budidaya Jamur Tiram', desa: 'Cintanagara', alamat: 'Desa Cintanagara', ket: 'Budidaya Warga' },

  // --- DESA SINDANGSARI ---
  { kat: 'Pendidikan', nama: 'SDN 2 Sindangsari', desa: 'Sindangsari', alamat: 'Desa Sindangsari', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'SDN 3 Sindangsari', desa: 'Sindangsari', alamat: 'Kp. Tegal Biuk', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'PKBM Al-Ikhlas', desa: 'Sindangsari', alamat: 'Desa Sindangsari', ket: 'Pusat Kegiatan Belajar Masyarakat' },
  { kat: 'Ibadah', nama: 'Masjid Sengklek', desa: 'Sindangsari', alamat: 'Kp. Sengklek', ket: 'Pusat Ibadah' },

  // --- DESA SUKAHURIP ---
  { kat: 'Pendidikan', nama: 'SDN 2 Sukahurip', desa: 'Sukahurip', alamat: 'Kp. Cirata', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'SMA Tunas Karya', desa: 'Sukahurip', alamat: 'Kp. Cirata RT 01/04', ket: 'Sekolah Menengah Atas Swasta' },
  { kat: 'Pendidikan', nama: 'LKP Arham', desa: 'Sukahurip', alamat: 'Kp. Cihuru RT 01/04', ket: 'Lembaga Kursus/Pelatihan' },
  { kat: 'Pendidikan', nama: 'KB Attaubah', desa: 'Sukahurip', alamat: 'Kp. Baranangsiang', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pendidikan', nama: 'KB Baetur Rohman', desa: 'Sukahurip', alamat: 'Kp. Cigedug Kaler', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pendidikan', nama: 'KB Nurul Ihsan', desa: 'Sukahurip', alamat: 'Kp. Cihuru', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pendidikan', nama: 'TK Miftahul Ulum', desa: 'Sukahurip', alamat: 'Kp. Cigedug Tengah', ket: 'Taman Kanak-Kanak' },
  { kat: 'Ibadah', nama: 'Masjid Al-Hikmah', desa: 'Sukahurip', alamat: 'Kp. Cigedug Tengah', ket: 'Pusat Ibadah' },
  { kat: 'UMKM', nama: 'Produksi Kopi Cihuru', desa: 'Sukahurip', alamat: 'Kp. Cihuru', ket: 'Pengolahan Kopi Lokal' }
];

let lines = csvContent.split('\n');

newRowsData.forEach(row => {
  const searchQuery = encodeURIComponent(`${row.nama} Desa ${row.desa} Kecamatan Cigedug Garut`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  
  const newLine = `${row.kat},${row.nama},${row.desa},${row.alamat},${mapsLink},,,${row.ket},Belum Survei`;
  lines.push(newLine);
});

fs.writeFileSync(csvPath, lines.join('\n'));
console.log('All remaining villages data appended successfully!');
