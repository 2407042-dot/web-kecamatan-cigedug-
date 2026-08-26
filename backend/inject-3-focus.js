const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');
let csvContent = fs.readFileSync(csvPath, 'utf8');

// The massive list of schools, pesantrens, and UMKM across the 5 villages
const focusData = [
  // --- SMA / SMK / MA ---
  { kat: 'Pendidikan', nama: 'SMA IT Al-Muawanah', desa: 'Cigedug', alamat: 'Kp. Cigedug Tonggoh', ket: 'SMA Swasta' },
  { kat: 'Pendidikan', nama: 'SMA IT Daarul Amiin', desa: 'Barusuda', alamat: 'Kp. Barusuda', ket: 'SMA Swasta' },
  { kat: 'Pendidikan', nama: 'SMA Plus Ma\'ruful Hidayah', desa: 'Cigedug', alamat: 'Kp. Barukai', ket: 'SMA Swasta' },
  { kat: 'Pendidikan', nama: 'SMA Tunas Karya', desa: 'Sukahurip', alamat: 'Kp. Cirata', ket: 'SMA Swasta' },
  { kat: 'Pendidikan', nama: 'SMAS IT Al Kafi', desa: 'Cigedug', alamat: 'Cigedug', ket: 'SMA Swasta' },

  // --- SMP / MTs ---
  { kat: 'Pendidikan', nama: 'MTSS Al Kafi', desa: 'Cigedug', alamat: 'Kp. Negla', ket: 'Madrasah Tsanawiyah' },
  { kat: 'Pendidikan', nama: 'MTSS Daaruttaqwa', desa: 'Cigedug', alamat: 'Kp. Situgede', ket: 'Madrasah Tsanawiyah' },
  { kat: 'Pendidikan', nama: 'MTSS Manbaul Huda', desa: 'Cigedug', alamat: 'Kp. Areng', ket: 'Madrasah Tsanawiyah' },
  
  // --- SD / MI ---
  { kat: 'Pendidikan', nama: 'MIS Al-Hikmah', desa: 'Cintanagara', alamat: 'Kp. Situkiruh', ket: 'Madrasah Ibtidaiyah' },
  { kat: 'Pendidikan', nama: 'MIS Nurul Islam', desa: 'Sukahurip', alamat: 'Kp. Cihuru', ket: 'Madrasah Ibtidaiyah' },

  // --- PESANTREN TAMBAHAN ---
  { kat: 'Pesantren', nama: 'Ponpes Fathun Nahwi', desa: 'Cigedug', alamat: 'Kp. Situgede RT 03 RW 08', ket: 'Kajian Kitab Kuning' },
  { kat: 'Pesantren', nama: 'Ponpes Anshorul Huda', desa: 'Cigedug', alamat: 'Desa Cigedug', ket: 'Dipimpin KH Darda Al Ghifary' },

  // --- UMKM BARU ---
  { kat: 'UMKM', nama: 'Kelompok Tani Sebartani (Mitra Indofood)', desa: 'Cigedug', alamat: 'Cigedug', ket: 'Pertanian kentang atlantik' },
  { kat: 'UMKM', nama: 'Kerajinan Makanan Olahan (Dinas KUKM)', desa: 'Cigedug', alamat: 'Kecamatan Cigedug', ket: 'Industri makanan rumahan' }
];

let lines = csvContent.split('\n').filter(line => line.trim() !== '');

focusData.forEach(row => {
  // Cek agar tidak duplikat dengan data sebelumnya
  if (!csvContent.includes(row.nama)) {
    const searchQuery = encodeURIComponent(`${row.nama} Desa ${row.desa} Kecamatan Cigedug Garut`);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    
    const newLine = `${row.kat},${row.nama},${row.desa},${row.alamat},${mapsLink},,,${row.ket},Belum Survei`;
    lines.push(newLine);
  }
});

fs.writeFileSync(csvPath, lines.join('\n'));
console.log('Focus data (Sekolah, PPS, UMKM) injected successfully!');
