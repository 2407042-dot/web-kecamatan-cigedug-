import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Satu Data - Kecamatan Cigedug",
  description: "Akses data terbuka Kecamatan Cigedug: UMKM, Pendidikan, Kesehatan, Fasilitas Umum, dan Infografis.",
};

const dataCategories = [
  {
    href: "/data/umkm",
    icon: "storefront",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50 dark:bg-emerald-900/20",
    textColor: "text-emerald-700 dark:text-emerald-400",
    label: "UMKM",
    title: "Data UMKM",
    description: "Rekap pelaku usaha mikro, kecil, dan menengah se-Kecamatan Cigedug dari berbagai bidang usaha.",
    stats: "±1.108 pelaku usaha",
    statIcon: "people",
  },
  {
    href: "/data/pendidikan",
    icon: "school",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-400",
    label: "Pendidikan",
    title: "Data Pendidikan",
    description: "Direktori sekolah, madrasah, PAUD/TK, pondok pesantren, dan PPS se-Kecamatan Cigedug.",
    stats: "PAUD · SD/MI · SMP/MTs · SMA",
    statIcon: "auto_stories",
  },
  {
    href: "/data/kesehatan",
    icon: "local_hospital",
    color: "from-rose-500 to-red-600",
    bgLight: "bg-rose-50 dark:bg-rose-900/20",
    textColor: "text-rose-700 dark:text-rose-400",
    label: "Kesehatan",
    title: "Data Kesehatan",
    description: "Daftar Puskesmas, Puskesdes, Posyandu, dan fasilitas kesehatan di setiap desa.",
    stats: "Puskesmas · Posyandu · Puskesdes",
    statIcon: "favorite",
  },
  {
    href: "/data/fasilitas-umum",
    icon: "location_city",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50 dark:bg-amber-900/20",
    textColor: "text-amber-700 dark:text-amber-400",
    label: "Fasilitas Umum",
    title: "Fasilitas Umum",
    description: "Lapangan olahraga, GOR, masjid, sarana ibadah, dan infrastruktur publik desa.",
    stats: "Lapangan · GOR · Masjid · Wisata",
    statIcon: "park",
  },
  {
    href: "/data/infografis",
    icon: "bar_chart",
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50 dark:bg-violet-900/20",
    textColor: "text-violet-700 dark:text-violet-400",
    label: "Infografis",
    title: "Infografis & Statistik",
    description: "Visualisasi data kependudukan, demografi, dan statistik pembangunan Kecamatan Cigedug.",
    stats: "Grafik interaktif & dashboard",
    statIcon: "query_stats",
  },
  {
    href: "/data/dataset",
    icon: "folder_open",
    color: "from-slate-500 to-gray-700",
    bgLight: "bg-slate-50 dark:bg-slate-900/20",
    textColor: "text-slate-700 dark:text-slate-400",
    label: "Dataset",
    title: "Unduh Dataset",
    description: "Katalog file dataset terbuka (CSV, XLSX, PDF) untuk keperluan riset, akademik, dan transparansi publik.",
    stats: "Format: CSV · XLSX · PDF",
    statIcon: "download",
  },
];

const quickStats = [
  { icon: "storefront", value: "1.108+", label: "Pelaku UMKM", color: "text-emerald-600" },
  { icon: "school", value: "20+", label: "Lembaga Pendidikan", color: "text-blue-600" },
  { icon: "local_hospital", value: "6+", label: "Fasilitas Kesehatan", color: "text-rose-600" },
  { icon: "mosque", value: "Puluhan", label: "Masjid & Pesantren", color: "text-amber-600" },
  { icon: "groups", value: "5", label: "Desa / Kelurahan", color: "text-violet-600" },
];

export default function DataHubPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-24 overflow-hidden bg-primary text-white">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase mb-6 border border-white/20">
            <span className="material-symbols-outlined text-sm">database</span>
            Portal Satu Data Cigedug
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Open Data<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-blue-200">
              Kecamatan Cigedug
            </span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Akses, telusuri, dan unduh data terbuka seputar UMKM, pendidikan, kesehatan, dan fasilitas umum
            di 5 desa se-Kecamatan Cigedug untuk transparansi, riset, dan pembangunan.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {quickStats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <span className={`material-symbols-outlined text-2xl mb-1 block text-white`}>{stat.icon}</span>
                <p className="text-xl font-extrabold text-white leading-tight">{stat.value}</p>
                <p className="text-white/70 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Kategori Data ── */}
      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-sm text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider font-bold">
            <span className="material-symbols-outlined text-sm">grid_view</span>
            Kategori Data
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Pilih Kategori Data</h2>
          <p className="text-on-surface-variant mt-3 max-w-xl mx-auto">
            Data dikelompokkan per bidang untuk memudahkan pencarian dan akses informasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative bg-white dark:bg-surface-container-low border border-outline-variant/40 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Gradient top bar */}
              <div className={`h-1.5 bg-gradient-to-r ${cat.color} w-full`} />

              <div className="p-7 flex flex-col flex-1">
                {/* Icon + Label */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 ${cat.bgLight} rounded-2xl flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-3xl ${cat.textColor}`}>{cat.icon}</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${cat.bgLight} ${cat.textColor} uppercase tracking-wider`}>
                    {cat.label}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {cat.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                  {cat.description}
                </p>

                {/* Stats & Arrow */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/30">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                    <span className={`material-symbols-outlined text-sm ${cat.textColor}`}>{cat.statIcon}</span>
                    {cat.stats}
                  </div>
                  <span className={`material-symbols-outlined text-xl ${cat.textColor} group-hover:translate-x-1 transition-transform`}>
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-surface-container border-t border-outline-variant/30 py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <span className="material-symbols-outlined text-5xl text-primary mb-4 block">dataset</span>
          <h3 className="text-2xl font-bold text-on-surface mb-3">Punya Kebutuhan Data Spesifik?</h3>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            Hubungi kami jika memerlukan data statistik khusus untuk keperluan akademik, riset, atau perencanaan pembangunan.
          </p>
          <Link
            href="/pelayanan/pengaduan"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">contact_support</span>
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
