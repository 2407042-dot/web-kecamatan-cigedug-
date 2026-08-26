import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data UMKM - Kecamatan Cigedug",
  description: "Rekap data pelaku UMKM Kecamatan Cigedug dari Kementerian Koperasi dan UKM.",
};

export const dynamic = "force-dynamic";

// Data UMKM diolah dari REKAP DATA UMKM BPUM (PEN) TA 2026
const umkmStats = {
  total: 1108,
  lakiLaki: 606,
  perempuan: 490,
  perDesa: [
    { desa: "Sindangsari", jumlah: 416, color: "bg-violet-500" },
    { desa: "Barusuda", jumlah: 276, color: "bg-blue-500" },
    { desa: "Cigedug", jumlah: 151, color: "bg-emerald-500" },
    { desa: "Cintanagara", jumlah: 154, color: "bg-amber-500" },
    { desa: "Sukahurip", jumlah: 83, color: "bg-rose-500" },
  ],
  topBidang: [
    { bidang: "Perdagangan / Dagang", jumlah: 190 },
    { bidang: "Warung (Umum & Sembako)", jumlah: 123 },
    { bidang: "Kuliner & Makanan Ringan", jumlah: 95 },
    { bidang: "Pedagang Sayuran", jumlah: 27 },
    { bidang: "Pedagang Seblak / Cilor", jumlah: 59 },
    { bidang: "Kelontong / Grosir", jumlah: 24 },
    { bidang: "Pertanian & Agribisnis", jumlah: 40 },
    { bidang: "Lainnya", jumlah: 150 },
  ],
};

export default function UmkmPage() {
  const maxDesa = Math.max(...umkmStats.perDesa.map((d) => d.jumlah));

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero */}
      <section className="relative pt-24 pb-24 overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10">
          <Link href="/data" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kembali ke Portal Data
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-white/20">
            <span className="material-symbols-outlined text-sm">storefront</span>
            UMKM · Kecamatan Cigedug
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Data UMKM</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Rekap data pelaku Usaha Mikro Kecil dan Menengah (UMKM) se-Kecamatan Cigedug berdasarkan data dari
            Kementerian Koperasi dan UKM Republik Indonesia Tahun 2026.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {[
            { label: "Total Pelaku UMKM", value: umkmStats.total.toLocaleString("id-ID"), icon: "groups", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { label: "Pelaku Laki-Laki", value: umkmStats.lakiLaki.toLocaleString("id-ID"), icon: "man", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: "Pelaku Perempuan", value: umkmStats.perempuan.toLocaleString("id-ID"), icon: "woman", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-surface-container-low rounded-2xl p-6 border border-outline-variant/40 shadow-sm text-center">
              <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <span className={`material-symbols-outlined text-3xl ${s.color}`}>{s.icon}</span>
              </div>
              <p className="text-3xl font-extrabold text-on-surface">{s.value}</p>
              <p className="text-on-surface-variant text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Distribusi per Desa */}
          <div className="bg-white dark:bg-surface-container-low rounded-3xl p-8 border border-outline-variant/40 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">location_on</span>
              Distribusi per Desa
            </h2>
            <div className="space-y-4">
              {umkmStats.perDesa.map((d) => (
                <div key={d.desa}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-on-surface">Desa {d.desa}</span>
                    <span className="font-bold text-on-surface-variant">{d.jumlah}</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full ${d.color} transition-all duration-700`}
                      style={{ width: `${(d.jumlah / maxDesa) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Bidang Usaha */}
          <div className="bg-white dark:bg-surface-container-low rounded-3xl p-8 border border-outline-variant/40 shadow-sm">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">category</span>
              Bidang Usaha Terbanyak
            </h2>
            <div className="space-y-3">
              {umkmStats.topBidang.map((b, i) => (
                <div key={b.bidang} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-on-surface">{b.bidang}</span>
                    <span className="text-sm font-bold text-on-surface-variant">{b.jumlah}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sumber Data */}
        <div className="mt-10 p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3">
          <span className="material-symbols-outlined text-emerald-600 mt-0.5">info</span>
          <div className="text-sm text-emerald-800 dark:text-emerald-300">
            <p className="font-bold mb-1">Sumber Data</p>
            <p>Data UMKM BPUM (PEN) Kecamatan Cigedug Tahun Anggaran 2026. Data diolah dari file rekap Kementerian Koperasi dan UKM Republik Indonesia. Nama Camat: Ma&apos;mun Gunawan, S.Ag., A.Kp.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
