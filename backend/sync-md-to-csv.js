const fs = require('fs');
const path = require('path');

const dataSetDir = path.join(__dirname, '../data set');
const csvPath = path.join(__dirname, '../frontend/public/Data_Pemetaan_KKN_Cigedug.csv');

// Hanya proses file pemetaan desa (abaikan Perencanaan_Pemetaan_Fasum.md)
const files = fs.readdirSync(dataSetDir).filter(f => f.startsWith('Pemetaan_') && f.endsWith('.md'));

let csvLines = ['Kategori,Nama Fasilitas,Desa,Alamat,Google Maps Link,Latitude,Longitude,Keterangan Tambahan,Status KKN'];

files.forEach(file => {
  const desaName = file.replace('Pemetaan_', '').replace('.md', '');
  const content = fs.readFileSync(path.join(dataSetDir, file), 'utf8');
  
  let currentKategori = 'Lainnya';
  const lines = content.split('\n');
  
  for (let line of lines) {
    // Deteksi Kategori dari Header Markdown
    if (line.startsWith('## ')) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('pendidikan') || lowerLine.includes('sekolah')) currentKategori = 'Pendidikan';
      else if (lowerLine.includes('pesantren') || lowerLine.includes('ibadah')) currentKategori = 'Pesantren';
      else if (lowerLine.includes('kesehatan')) currentKategori = 'Kesehatan';
      else if (lowerLine.includes('wisata') && !lowerLine.includes('seni')) currentKategori = 'Wisata Alam';
      else if (lowerLine.includes('seni') || lowerLine.includes('budaya')) currentKategori = 'Adat & Budaya';
      else if (lowerLine.includes('umkm') || lowerLine.includes('ekonomi') || lowerLine.includes('infrastruktur')) currentKategori = 'UMKM';
      else currentKategori = 'Lainnya';
    } 
    // Parse baris tabel Markdown
    else if (line.startsWith('|') && line.includes('**')) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 4) {
        // parts[0] is empty before the first '|'
        const rawNama = parts[1].replace(/\*\*/g, '').trim();
        const lokasi = parts[2];
        const ket = parts[3];
        
        // Hapus header tabel dari parsing
        if (rawNama !== 'Nama Satuan Pendidikan' && rawNama !== 'Nama Sarana / Yayasan' && rawNama !== 'Nama Sarana / Pesantren' && !rawNama.includes('Nama Fasilitas') && !rawNama.includes('Nama Paguyuban') && !rawNama.includes('Nama Usaha')) {
          
          // Escape quotes inside fields if any
          const cleanNama = rawNama.replace(/"/g, '""');
          const cleanLokasi = lokasi.replace(/"/g, '""');
          const cleanKet = ket.replace(/"/g, '""');
          
          // User tidak mewajibkan integrasi Maps (dibuat kosong / '#' saja)
          const csvRow = `${currentKategori},"${cleanNama}","${desaName}","${cleanLokasi}","#",,,"${cleanKet}",Belum Survei`;
          csvLines.push(csvRow);
        }
      }
    }
  }
});

fs.writeFileSync(csvPath, csvLines.join('\n'));
console.log('Sinkronisasi MD ke CSV berhasil! Total baris data:', csvLines.length - 1);
