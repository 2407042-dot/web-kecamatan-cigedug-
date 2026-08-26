const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clean up existing if needed, or just append
  await prisma.dataset.deleteMany();

  const datasets = [
    {
      title: "Kependudukan Kecamatan Cigedug",
      description: "Data master jumlah penduduk berdasarkan desa dan jenis kelamin di Kecamatan Cigedug.",
      category: "Kependudukan",
      fileCsv: "/datasets/Jumlah Penduduk Per Desa di Kecamatan Cigedug.csv",
      sizeCsv: "3.8 KB",
      filePdf: "/datasets/Info - Jumlah Penduduk Per Desa di Kecamatan Cigedug.pdf",
      sizePdf: "5.3 KB"
    },
    {
      title: "Data Sekolah Formal & Lembaga Non-Formal",
      description: "Daftar sekolah formal dari jenjang PAUD hingga SMA, serta data pesantren dan PKBM di Cigedug.",
      category: "Pendidikan",
      fileCsv: "/datasets/data sekolahsemsntara.csv",
      sizeCsv: "3.7 KB",
      filePdf: "/datasets/dataset pesantren sementara.xlsx",
      sizePdf: "10.5 KB" // We will put the XLSX in the PDF slot for now, or just use it as "File 2"
    },
    {
      title: "Rekap Data UMKM & Posyandu",
      description: "Data ribuan pelaku UMKM dan daftar 63 Posyandu beserta kader penggeraknya.",
      category: "Ekonomi & Kesehatan",
      fileCsv: "/datasets/REKAP_DATA_UMKM.xlsx",
      sizeCsv: "531 KB",
      filePdf: "/datasets/data posyandu dan kader .pdf",
      sizePdf: "353 KB"
    }
  ];

  for (const ds of datasets) {
    await prisma.dataset.create({
      data: ds
    });
    console.log(`Added dataset: ${ds.title}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
