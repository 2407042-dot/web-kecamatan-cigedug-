const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');
let csvContent = fs.readFileSync(csvPath, 'utf8');

const focusData = [
  // --- WISATA ALAM / GUNUNG ---
  { kat: 'Wisata Alam', nama: 'Jalur Pendakian Gunung Cikuray via Cintanagara', desa: 'Cintanagara', alamat: 'Desa Cintanagara', ket: 'Basecamp Pendakian Cikuray (2.821 mdpl)' },
  { kat: 'Wisata Alam', nama: 'Jalur Pendakian Tapak Gerot', desa: 'Sukahurip', alamat: 'Sukahurip', ket: 'Pintu Masuk Alternatif Gunung Cikuray' },
  { kat: 'Wisata Alam', nama: 'Wisata Alam Cadas Gantung', desa: 'Sindangsari', alamat: 'Desa Sindangsari', ket: 'Destinasi Tebing Alam Pedesaan' },

  // --- SENI & BUDAYA ---
  { kat: 'Adat & Budaya', nama: 'Festival Nyaneut', desa: 'Cigedug', alamat: 'Kecamatan Cigedug', ket: 'Tradisi minum teh & pagelaran seni Sunda (Jaipong/Calung)' },
  { kat: 'Adat & Budaya', nama: 'Grup Calung Sinar Sawargi', desa: 'Barusuda', alamat: 'Desa Barusuda', ket: 'Pelestari Musik Tradisional' },
  { kat: 'Adat & Budaya', nama: 'Grup Calung Gentra Sawargi', desa: 'Barusuda', alamat: 'Desa Barusuda', ket: 'Pelestari Musik Tradisional' },
  { kat: 'Adat & Budaya', nama: 'Paguron Mekar Panglipur', desa: 'Barusuda', alamat: 'Desa Barusuda', ket: 'Kesenian Pencak Silat' },
  { kat: 'Adat & Budaya', nama: 'Seni Qasidah/Marawis', desa: 'Sukahurip', alamat: 'Sukahurip', ket: 'Kesenian Religi Islami' }
];

let lines = csvContent.split('\n').filter(line => line.trim() !== '');

focusData.forEach(row => {
  if (!csvContent.includes(row.nama)) {
    const searchQuery = encodeURIComponent(`${row.nama} Desa ${row.desa} Kecamatan Cigedug Garut`);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    
    const newLine = `${row.kat},${row.nama},${row.desa},${row.alamat},${mapsLink},,,${row.ket},Belum Survei`;
    lines.push(newLine);
  }
});

fs.writeFileSync(csvPath, lines.join('\n'));
console.log('Wisata & Budaya data injected successfully!');
