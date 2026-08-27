import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Aparatur Kecamatan Cigedug",
  description:
    "Daftar aparatur dan pegawai Kecamatan Cigedug, Kabupaten Garut beserta jabatan dan informasi kontak.",
};

const subNavLinks = [
  { href: "/profil", label: "Selayang Pandang", icon: "info", active: false },
  { href: "/profil/visi-misi", label: "Visi & Misi", icon: "star", active: false },
  { href: "/profil/sejarah", label: "Sejarah", icon: "history_edu", active: false },
  { href: "/profil/struktur-organisasi", label: "Struktur Organisasi", icon: "account_tree", active: false },
  { href: "/profil/aparatur", label: "Aparatur", icon: "badge", active: true },
];

type Aparatur = {
  nama: string;
  jabatan: string;
  nip?: string;
  golongan?: string;
  unit: string;
  icon?: string;
  imageUrl?: string;
};

const defaultAparaturList: Aparatur[] = [
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

const unitColors: Record<string, { bg: string; text: string; badge: string }> = {
  "Pimpinan":                      { bg: "bg-primary", text: "text-on-primary", badge: "bg-primary/10 text-primary" },
  "Sekretariat":                    { bg: "bg-secondary", text: "text-on-secondary", badge: "bg-secondary/10 text-secondary" },
  "Kasi Pemerintahan":              { bg: "bg-blue-600", text: "text-white", badge: "bg-blue-50 text-blue-700" },
  "Kasi Pelayanan":                 { bg: "bg-teal-600", text: "text-white", badge: "bg-teal-50 text-teal-700" },
  "Kasi Pemb. Masyarakat Desa":     { bg: "bg-green-600", text: "text-white", badge: "bg-green-50 text-green-700" },
  "Kasi Kesejahteraan Masyarakat":  { bg: "bg-rose-600", text: "text-white", badge: "bg-rose-50 text-rose-700" },
  "Kasi Trantibum":                 { bg: "bg-amber-600", text: "text-white", badge: "bg-amber-50 text-amber-700" },
};

export const dynamic = 'force-dynamic';

export default async function AparaturPage() {
  let aparaturList = defaultAparaturList;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}/api/aparatur`, { cache: "no-store" });
    const data = await res.json();
    if (data && data.length > 0) aparaturList = data;
  } catch (error) {}

  const unitGroups = Array.from(new Set(aparaturList.map((a) => a.unit)));

  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/aparatur-1.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-container/80 to-secondary/80" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-16 pt-32">
          <nav className="flex items-center gap-2 text-white/60 text-label-md mb-6">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <a href="/profil" className="hover:text-white transition-colors">Selayang Pandang</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Aparatur</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">badge</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">Sumber Daya Manusia</span>
          </div>
          <h1 className="text-display-lg text-white mb-4 max-w-2xl">
            Aparatur Kecamatan<br />
            <span className="text-primary-fixed-dim">Cigedug</span>
          </h1>
          <p className="text-body-lg text-white/75 max-w-xl leading-relaxed">
            Daftar pegawai dan aparatur pemerintahan yang bertugas melayani masyarakat
            di Kecamatan Cigedug, Kabupaten Garut.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined icon-filled text-2xl text-primary-fixed-dim">groups</span>
              <div>
                <p className="text-display-lg text-white font-bold leading-none">{aparaturList.length}</p>
                <p className="text-label-md text-white/70">Total Aparatur</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined icon-filled text-2xl text-primary-fixed-dim">account_tree</span>
              <div>
                <p className="text-display-lg text-white font-bold leading-none">{unitGroups.length}</p>
                <p className="text-label-md text-white/70">Unit Kerja</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Nav */}
      <div className="bg-white border-b border-outline-variant sticky top-16 z-40 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <nav className="flex overflow-x-auto gap-1 py-2">
            {subNavLinks.map(({ href, label, icon, active }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-label-md whitespace-nowrap transition-all duration-150 ${
                  active
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                <span className="material-symbols-outlined icon-filled text-sm">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Aparatur per unit */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-16">

          {unitGroups.map((unit) => {
            const members = aparaturList.filter((a) => a.unit === unit);
            const col = unitColors[unit] ?? { bg: "bg-surface-container-high", text: "text-on-surface", badge: "bg-surface-container text-on-surface" };
            return (
              <div key={unit}>
                {/* Unit header */}
                <div className={`flex items-center gap-3 mb-6`}>
                  <div className={`${col.bg} rounded-xl w-10 h-10 flex items-center justify-center shadow-md shrink-0`}>
                    <span className={`material-symbols-outlined icon-filled text-xl ${col.text}`}>
                      {unit === "Pimpinan" ? "star" : unit === "Sekretariat" ? "edit_note" : "person"}
                    </span>
                  </div>
                  <h2 className="text-headline-md text-on-surface">{unit}</h2>
                  <span className={`text-caption font-semibold px-3 py-1 rounded-full ${col.badge}`}>
                    {members.length} Orang
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {members.map(({ nama, jabatan, nip, golongan, icon, imageUrl }) => (
                    <div
                      key={`${nama}-${jabatan}`}
                      className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
                    >
                      {/* Color bar */}
                      <div className={`${col.bg} h-1.5 w-full`} />
                      <div className="p-5">
                        {/* Avatar */}
                        <div className={`w-14 h-14 ${col.bg} rounded-2xl flex items-center justify-center mb-4 shadow-md overflow-hidden relative`}>
                          {imageUrl ? (
                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}${imageUrl}`} alt={nama} fill className="object-cover" unoptimized />
                          ) : (
                            <span className={`material-symbols-outlined icon-filled text-2xl ${col.text}`}>
                              {icon ?? "person"}
                            </span>
                          )}
                        </div>
                        {/* Info */}
                        <span className={`text-caption font-semibold px-2 py-0.5 rounded-full ${col.badge} mb-2 inline-block`}>
                          {jabatan}
                        </span>
                        <h3 className="text-headline-md text-on-surface mb-1">{nama}</h3>
                        {nip && (
                          <p className="text-caption text-on-surface-variant">NIP. {nip}</p>
                        )}
                        {golongan && (
                          <p className="text-caption text-on-surface-variant">Gol. {golongan}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Butuh Pelayanan?</h2>
            <p className="text-body-lg text-white/70 max-w-lg">
              Aparatur kecamatan siap melayani Anda. Kunjungi kantor kecamatan atau akses layanan online kami.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/pelayanan"
              className="bg-white text-primary text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2"
            >
              <span>Layanan Online</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link
              href="/pengaduan"
              className="border-2 border-white/50 hover:border-white text-white text-label-md px-6 py-3 rounded-full transition-colors duration-200"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
