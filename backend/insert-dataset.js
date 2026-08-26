const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.dataset.create({
    data: {
      title: "Data Pemetaan KKN & Potensi Desa (Template)",
      description: "Dataset format CSV (Excel) yang berisi daftar fasilitas umum, sekolah, pesantren, wisata, UMKM, dan kebudayaan di Kecamatan Cigedug. Dilengkapi dengan kolom kosong untuk Titik Koordinat (Lat/Long) dan Link Google Maps, sangat cocok digunakan oleh mahasiswa KKN untuk survei pemetaan lapangan.",
      format: "CSV",
      size: "2 KB",
      filename: "/Data_Pemetaan_KKN_Cigedug.csv",
      category: "Data Infrastruktur & Potensi",
    }
  });
  console.log("Dataset berhasil ditambahkan!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
