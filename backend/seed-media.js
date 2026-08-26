const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Mulai seeding data...');

  // === AGENDA ===
  console.log('📅 Seeding Agenda...');
  await prisma.agenda.deleteMany(); // bersihkan dulu
  await prisma.agenda.createMany({
    data: [
      {
        title: 'Musyawarah Rencana Pembangunan (Musrenbang) Kecamatan',
        date: '20 Agustus 2026',
        time: '08:00 - 15:00 WIB',
        location: 'Aula Kantor Kecamatan Cigedug',
        type: 'Pemerintahan',
        status: 'upcoming',
        description: 'Pembahasan usulan pembangunan desa tahun anggaran 2027 bersama seluruh perangkat desa dan BPD.',
      },
      {
        title: 'Festival Seni Budaya Lereng Cikuray',
        date: '25 Agustus 2026',
        time: '09:00 - Selesai',
        location: 'Alun-alun Desa Cigedug',
        type: 'Budaya',
        status: 'upcoming',
        description: 'Penampilan kesenian tradisional dari 5 desa se-Kecamatan Cigedug sekaligus pameran produk lokal.',
      },
      {
        title: 'Vaksinasi Massal dan Pengobatan Gratis',
        date: '28 Agustus 2026',
        time: '08:00 - 12:00 WIB',
        location: 'Puskesmas Cigedug',
        type: 'Kesehatan',
        status: 'upcoming',
        description: 'Layanan kesehatan gratis bagi lansia dan balita bekerja sama dengan Dinas Kesehatan Kabupaten Garut.',
      },
      {
        title: 'Kerja Bakti Bersih Lingkungan (Jumat Bersih)',
        date: '14 Agustus 2026',
        time: '07:00 - 10:00 WIB',
        location: 'Sepanjang Jalan Utama Kecamatan',
        type: 'Lingkungan',
        status: 'past',
        description: 'Kegiatan rutin gotong royong membersihkan selokan dan jalan raya di seluruh desa.',
      },
    ],
  });
  console.log('✅ Agenda selesai (4 data)');

  // === PENGUMUMAN ===
  console.log('📢 Seeding Pengumuman...');
  await prisma.pengumuman.deleteMany();
  await prisma.pengumuman.createMany({
    data: [
      {
        title: 'Pemberitahuan Jadwal Pelayanan Pembuatan e-KTP Keliling',
        date: '15 Agustus 2026',
        category: 'Pelayanan Publik',
        snippet: 'Dalam rangka percepatan perekaman e-KTP, Kecamatan Cigedug akan melaksanakan pelayanan keliling ke 5 desa mulai minggu depan. Warga diimbau menyiapkan dokumen pendukung.',
        isPinned: true,
        fileUrl: null,
        fileSize: null,
      },
      {
        title: 'Edaran Kewaspadaan Musim Hujan dan Potensi Longsor',
        date: '10 Agustus 2026',
        category: 'Imbauan',
        snippet: 'Mengingat tingginya curah hujan di kawasan Gunung Cikuray, warga diimbau untuk selalu waspada terhadap potensi bencana longsor, terutama di area kemiringan curam.',
        isPinned: true,
        fileUrl: null,
        fileSize: null,
      },
      {
        title: 'Hasil Seleksi Administrasi Pegawai Non-ASN Kecamatan Cigedug',
        date: '02 Agustus 2026',
        category: 'Kepegawaian',
        snippet: 'Berikut dilampirkan daftar nama-nama peserta yang lolos seleksi administrasi tahap I untuk posisi tenaga kontrak di lingkungan Kantor Kecamatan Cigedug.',
        isPinned: false,
        fileUrl: null,
        fileSize: null,
      },
      {
        title: 'Sosialisasi Program Bantuan Modal UMKM Naik Kelas 2026',
        date: '28 Juli 2026',
        category: 'Ekonomi',
        snippet: 'Program bantuan modal untuk UMKM kembali dibuka. Pendaftaran melalui kantor desa masing-masing paling lambat akhir Agustus 2026.',
        isPinned: false,
        fileUrl: null,
        fileSize: null,
      },
    ],
  });
  console.log('✅ Pengumuman selesai (4 data)');

  // === PENGHARGAAN ===
  console.log('🏆 Seeding Penghargaan...');
  await prisma.penghargaan.deleteMany();
  await prisma.penghargaan.createMany({
    data: [
      {
        title: 'Kecamatan Terbaik 1 Tingkat Kabupaten Garut',
        year: '2025',
        category: 'Pelayanan Publik',
        description: 'Penghargaan atas inovasi SIMPANCIG dan dedikasi luar biasa dalam memberikan pelayanan administrasi yang cepat, transparan, dan akuntabel kepada masyarakat.',
        imageUrl: null,
        color: 'from-amber-400 to-orange-500',
      },
      {
        title: 'Juara Umum Festival Budaya Garut',
        year: '2025',
        category: 'Seni & Budaya',
        description: 'Keberhasilan kontingen kesenian Kecamatan Cigedug dalam mempertahankan dan mempromosikan kebudayaan lokal pada ajang tahunan tingkat kabupaten.',
        imageUrl: null,
        color: 'from-blue-400 to-indigo-500',
      },
      {
        title: 'Desa Mandiri Inspiratif (Desa Cigedug)',
        year: '2024',
        category: 'Pemberdayaan Desa',
        description: 'Penganugerahan dari Kementerian Desa PDTT atas keberhasilan Desa Cigedug dalam mengelola BUMDes dan menciptakan kemandirian ekonomi desa.',
        imageUrl: null,
        color: 'from-green-400 to-emerald-600',
      },
      {
        title: 'Penghargaan Sinergitas Penanggulangan Stunting',
        year: '2024',
        category: 'Kesehatan',
        description: 'Apresiasi dari Dinas Kesehatan Kabupaten atas penurunan angka stunting secara signifikan melalui program Posyandu Terpadu di 5 desa.',
        imageUrl: null,
        color: 'from-rose-400 to-red-500',
      },
    ],
  });
  console.log('✅ Penghargaan selesai (4 data)');

  console.log('\n🎉 Seeding selesai! Semua data berhasil dimasukkan.');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
