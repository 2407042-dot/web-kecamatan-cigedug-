const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');
let csvContent = fs.readFileSync(csvPath, 'utf8');

const newRowsData = [
  { kat: 'Pendidikan', nama: 'KB Al-Ikhlas', desa: 'Barusuda', alamat: '', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pendidikan', nama: 'KB Al-Muta\'alimin', desa: 'Barusuda', alamat: 'Kp. Cibitung RT 04 RW 04', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pendidikan', nama: 'KOBER Ihsan Mubarok', desa: 'Barusuda', alamat: 'Kp. Sayuran RT 01 RW 09', ket: 'PAUD/Kelompok Bermain' },
  { kat: 'Pendidikan', nama: 'SDN 1 Barusuda', desa: 'Barusuda', alamat: 'Kp. Sayuran RT 02 RW 09', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'SDN 2 Barusuda', desa: 'Barusuda', alamat: 'Kp. Cibitung', ket: 'Sekolah Dasar Negeri' },
  { kat: 'Pendidikan', nama: 'MIS Babussalam', desa: 'Barusuda', alamat: 'Kp. Sayuran', ket: 'Madrasah Ibtidaiyah Swasta' },
  { kat: 'Pendidikan', nama: 'MIS Nurul Falah', desa: 'Barusuda', alamat: 'Kp. Olan', ket: 'Madrasah Ibtidaiyah Swasta' },
  { kat: 'Pendidikan', nama: 'MIS Al-Muttaqin', desa: 'Barusuda', alamat: '', ket: 'Madrasah Ibtidaiyah Swasta' },
  { kat: 'Pendidikan', nama: 'MIS Manbaul Huda', desa: 'Barusuda', alamat: '', ket: 'Madrasah Ibtidaiyah Swasta' }
];

let lines = csvContent.split('\n');
// Hapus dulu baris lama yang SDN 1 Barusuda biar gak duplikat, karena tadi udah ada tapi kosong alamatnya
lines = lines.filter(line => !line.includes('SDN 1 Barusuda'));

newRowsData.forEach(row => {
  const searchQuery = encodeURIComponent(`${row.nama} Desa ${row.desa} Kecamatan Cigedug Garut`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  
  const newLine = `${row.kat},${row.nama},${row.desa},${row.alamat},${mapsLink},,,${row.ket},Belum Survei`;
  lines.push(newLine);
});

fs.writeFileSync(csvPath, lines.join('\n'));
console.log('Barusuda TK/SD data appended successfully!');
