const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');
let csvContent = fs.readFileSync(csvPath, 'utf8');

const newRowsData = [
  { kat: 'Pendidikan', nama: 'SMP IT Daarul Amiin', desa: 'Barusuda', alamat: 'Kp. Barusuda RT 03/RW 06', ket: 'Jenjang SMP Swasta' },
  { kat: 'Pendidikan', nama: 'SMP IT Al-Inayah', desa: 'Barusuda', alamat: 'Kp. Bukatanah RT 003/RW 001', ket: 'Jenjang SMP Swasta' },
  { kat: 'Pendidikan', nama: 'MTs Babussalam', desa: 'Barusuda', alamat: '', ket: 'Madrasah Tsanawiyah' },
  { kat: 'Pendidikan', nama: 'MAS Nurul Falah', desa: 'Barusuda', alamat: 'Kp. Olan RT 01/RW 05', ket: 'Madrasah Aliyah Swasta' },
  { kat: 'Kesehatan', nama: 'Posyandu Olan & Pasir Tengah', desa: 'Barusuda', alamat: 'Kp. Olan & Pasir Tengah', ket: 'Posyandu Aktif' },
  { kat: 'Ibadah', nama: 'Masjid Daarul Aamiin', desa: 'Barusuda', alamat: 'Kp. Barusuda RT 003/RW 003', ket: 'Dekat Ponpes' },
  { kat: 'Pesantren', nama: 'Ponpes Miftahul Hidayah', desa: 'Barusuda', alamat: 'Kp. Sayuran RT 01/RW 09', ket: 'Berdiri sejak 1901' },
  { kat: 'Pesantren', nama: 'Rumah Tahfidz Ash-Shaff', desa: 'Barusuda', alamat: '', ket: 'Lembaga Hafalan Qur\'an' },
  { kat: 'Adat & Budaya', nama: 'Seni Calung Sinar Sawargi', desa: 'Barusuda', alamat: '', ket: 'Grup Kesenian Calung' },
  { kat: 'Adat & Budaya', nama: 'Seni Calung Gentra Sawargi', desa: 'Barusuda', alamat: '', ket: 'Grup Kesenian Calung' },
  { kat: 'Adat & Budaya', nama: 'Paguron Mekar Panglipur', desa: 'Barusuda', alamat: '', ket: 'Pencak Silat' },
  { kat: 'UMKM', nama: 'Produksi Eco-Enzyme (Kelompok Tani)', desa: 'Barusuda', alamat: '', ket: 'Inovasi Limbah Organik' }
];

let lines = csvContent.split('\n');

newRowsData.forEach(row => {
  const searchQuery = encodeURIComponent(`${row.nama} Desa ${row.desa} Kecamatan Cigedug Garut`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  
  const newLine = `${row.kat},${row.nama},${row.desa},${row.alamat},${mapsLink},,,${row.ket},Belum Survei`;
  lines.push(newLine);
});

fs.writeFileSync(csvPath, lines.join('\n'));
console.log('Barusuda data appended successfully!');
