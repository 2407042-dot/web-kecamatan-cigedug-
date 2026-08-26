const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultAparaturList = [
  // Pimpinan
  {
    nama: "Ma'mun Gunawan, S.Ag. A.Kp",
    jabatan: "Camat",
    nip: "197409252009032001",
    golongan: "III/d",
    unit: "Pimpinan",
    icon: "manage_accounts",
  },
  {
    nama: "Kanda, SE",
    jabatan: "Sekretaris Kecamatan",
    nip: "197502032007011007",
    golongan: "III/c",
    unit: "Pimpinan",
    icon: "person_4",
  },
  // Sekretariat
  {
    nama: "Ahmad Rualudin, S.IP",
    jabatan: "Kasubbag Keuangan & BMD",
    nip: "198034282045010",
    golongan: "III/b",
    unit: "Sekretariat",
    icon: "manage_history",
  },
  {
    nama: "Siti Jaenab, S.IP. M.SI",
    jabatan: "Kasubbag Perencanaan & Evaluasi",
    nip: "196807030201",
    golongan: "III/c",
    unit: "Sekretariat",
    icon: "manage_history",
  },
  {
    nama: "Inak Supandi",
    jabatan: "Bendahara",
    unit: "Sekretariat",
    icon: "payments",
  },
  {
    nama: "Wahyu Gurnama, S.IP",
    jabatan: "Pengelola BMD",
    unit: "Sekretariat",
    icon: "inventory_2",
  },
  {
    nama: "Fitriana, SE",
    jabatan: "Penata Layanan Operasional",
    unit: "Sekretariat",
    icon: "settings",
  },
  {
    nama: "Suriya Farida, S.T",
    jabatan: "Penata Kelola Sistim Informasi",
    unit: "Sekretariat",
    icon: "computer",
  },
  // Kasi Pemerintahan
  {
    nama: "Iim Ibrahim, S.IP",
    jabatan: "Kasi Pemerintahan",
    nip: "196934292045011",
    golongan: "III/b",
    unit: "Kasi Pemerintahan",
    icon: "account_balance",
  },
  {
    nama: "Arif Hidayat Soleh",
    jabatan: "Pengadministrasian Pemerintahan",
    unit: "Kasi Pemerintahan",
    icon: "description",
  },
  // Kasi Pelayanan
  {
    nama: "Aay, SE",
    jabatan: "Kasi Pelayanan",
    nip: "197007282014112002",
    golongan: "III/b",
    unit: "Kasi Pelayanan",
    icon: "support_agent",
  },
  {
    nama: "Mulyana, S.IP",
    jabatan: "Operator SIAK",
    unit: "Kasi Pelayanan",
    icon: "computer",
  },
  {
    nama: "Jajang Iwan",
    jabatan: "Operator SIAK",
    unit: "Kasi Pelayanan",
    icon: "computer",
  },
  // Kasi PMD
  {
    nama: "Nolis Hertika, S.IP",
    jabatan: "Kasi Pemb. Masyarakat Desa",
    nip: "197909312020",
    golongan: "III/b",
    unit: "Kasi Pemb. Masyarakat Desa",
    icon: "groups",
  },
  // Kasi Kesejahteraan
  {
    nama: "Heri Pernama, S.SOS",
    jabatan: "Kasi Kesejahteraan Masyarakat",
    nip: "197503021997011",
    golongan: "III/b",
    unit: "Kasi Kesejahteraan Masyarakat",
    icon: "favorite",
  },
  // Kasi Trantibum
  {
    nama: "Tajpudin",
    jabatan: "Kasi Trantibum",
    nip: "197202272994012",
    golongan: "III/b",
    unit: "Kasi Trantibum",
    icon: "shield",
  },
  {
    nama: "Nendang Kurnia, S.IP",
    jabatan: "Satpol PP",
    unit: "Kasi Trantibum",
    icon: "local_police",
  },
];

const defaultGaleri = [
  {
    title: 'Semarak Upacara Peringatan Hari Kemerdekaan RI Tingkat Kecamatan Cigedug',
    category: 'Kegiatan',
    img: '/images/galeri/keg-1.jpg',
    aspectRatio: 'aspect-[4/3]',
    description: 'Upacara kemerdekaan berlangsung khidmat diikuti seluruh elemen masyarakat.'
  },
  {
    title: 'Rapat Koordinasi dan Sinergitas Aparatur Pemerintahan se-Kecamatan',
    category: 'Pemerintahan',
    img: '/images/galeri/keg-2.jpg',
    aspectRatio: 'aspect-[3/4]',
    description: 'Evaluasi kinerja dan rencana kerja bulan depan.'
  },
  {
    title: 'Giat Sosialisasi Program Pemberdayaan dan Kesejahteraan Masyarakat',
    category: 'Pemberdayaan',
    img: '/images/galeri/keg-3.jpg',
    aspectRatio: 'aspect-square',
    description: 'Pembinaan UMKM dan pemberdayaan perempuan.'
  },
  {
    title: 'Pelayanan Publik Prima dan Tanggap Keluhan Warga Desa',
    category: 'Pelayanan',
    img: '/images/galeri/keg-4.jpg',
    aspectRatio: 'aspect-video',
    description: 'Layanan administrasi kependudukan keliling.'
  },
  {
    title: 'Evaluasi Kinerja dan Musyawarah Perencanaan Pembangunan (Musrenbang)',
    category: 'Pemerintahan',
    img: '/images/galeri/keg-5.jpg',
    aspectRatio: 'aspect-[3/4]',
    description: 'Musrenbang tingkat kecamatan tahun 2026.'
  },
  {
    title: 'Kunjungan Lapangan dan Pembinaan Langsung oleh Camat Cigedug',
    category: 'Kegiatan',
    img: '/images/galeri/keg-6.jpg',
    aspectRatio: 'aspect-square',
    description: 'Tinjauan langsung ke lapangan terkait pembangunan infrastruktur.'
  },
];

async function main() {
  const aparaturCount = await prisma.aparatur.count();
  if (aparaturCount === 0) {
    for (const item of defaultAparaturList) {
      await prisma.aparatur.create({ data: item });
    }
    console.log("Seeded Aparatur");
  }

  const galeriCount = await prisma.galeri.count();
  if (galeriCount === 0) {
    for (const item of defaultGaleri) {
      await prisma.galeri.create({ data: item });
    }
    console.log("Seeded Galeri");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
