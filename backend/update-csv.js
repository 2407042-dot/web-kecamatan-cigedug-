const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');
let csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse lines
let lines = csvContent.split('\n');
const header = lines[0];

const newLines = lines.map((line, index) => {
  if (index === 0 || !line.trim()) return line;
  
  let parts = line.split(',');
  const namaFasilitas = parts[1];
  const desa = parts[2];
  
  // Create search URL
  const searchQuery = encodeURIComponent(`${namaFasilitas} Desa ${desa} Kecamatan Cigedug Garut`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  
  // Set maps link
  parts[4] = mapsLink;
  
  // Set known coordinates
  if (namaFasilitas === 'SMPN 1 Cigedug') {
    parts[5] = '-7.3261'; // Lat
    parts[6] = '107.8138'; // Lng
    parts[8] = 'Telah Diverifikasi';
  }
  if (namaFasilitas === 'Puskesmas Sukahurip') {
    parts[8] = 'Telah Diverifikasi';
  }
  if (namaFasilitas === 'Ponpes Ma\'aruful Hidayah') {
    parts[8] = 'Telah Diverifikasi';
  }
  
  return parts.join(',');
});

fs.writeFileSync(csvPath, newLines.join('\n'));
console.log('CSV updated with Google Maps links!');
