import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fasilitas Umum - Kecamatan Cigedug",
};

const fasumData = [
  {
    kategori: "Lapangan & Olahraga",
    icon: "sports_soccer",
    color: "bg-green-100 text-green-700",
    items: [
      { nama: "Lapangan Alun-Alun Cigedug", desa: "Cigedug", keterangan: "Pusat olahraga dan upacara tingkat kecamatan" },
      { nama: "GOR Desa Sindangsari", desa: "Sindangsari", keterangan: "Gedung olahraga untuk turnamen dan kegiatan warga" },
    ],
  },
  {
    kategori: "Wisata Alam",
    icon: "landscape",
    color: "bg-teal-100 text-teal-700",
    items: [
      { nama: "Wisata Cadas Gantung", desa: "Sindangsari", keterangan: "Potensi wisata tebing, butuh pemetaan jalur akses" },
      { nama: "Jalur Pendakian Tapak Gerot", desa: "Sukahurip", keterangan: "Pintu masuk Gunung Cikuray" },
    ],
  },
  {
    kategori: "Infrastruktur Desa",
    icon: "construction",
    color: "bg-orange-100 text-orange-700",
    items: [
      { nama: "Jalan Usaha Tani Cintanagara", desa: "Cintanagara", keterangan: "Infrastruktur pendukung distribusi sayuran dan kentang" },
    ],
  },
  {
    kategori: "Sarana Ibadah",
    icon: "mosque",
    color: "bg-amber-100 text-amber-700",
    items: [
      { nama: "Masjid Jami Nurul Falah", desa: "Cigedug", keterangan: "DKM Utama desa, Kp. Ciredey" },
      { nama: "Masjid Al-Husna", desa: "Cintanagara", keterangan: "Kp. Sukaresmi 1 – sering digunakan untuk baksos" },
      { nama: "Masjid Umar bin Khattab", desa: "Cintanagara", keterangan: "Masjid monumental desa" },
      { nama: "Masjid Sengklek", desa: "Sindangsari", keterangan: "Kp. Sengklek" },
      { nama: "Masjid Al-Hikmah", desa: "Sukahurip", keterangan: "Kp. Cigedug Tengah" },
      { nama: "Masjid Al-Falah", desa: "Sukahurip", keterangan: "Kp. Sukahurip" },
    ],
  },
];

export default function FasilitasUmumPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/data" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kembali ke Portal Data
          </Link>
          <h1 className="text-4xl font-extrabold mb-3">Fasilitas Umum</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Direktori fasilitas publik meliputi lapangan olahraga, GOR, wisata alam, infrastruktur desa, dan sarana ibadah di Kecamatan Cigedug.
          </p>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14 space-y-10">
        {fasumData.map((kat) => (
          <div key={kat.kategori}>
            <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className={`material-symbols-outlined p-1.5 rounded-xl ${kat.color}`}>{kat.icon}</span>
              {kat.kategori}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-outline-variant/40 bg-white dark:bg-surface-container-low shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-outline-variant/30">
                  <tr className="text-sm text-on-surface-variant font-semibold">
                    <th className="p-4">Nama Fasilitas</th>
                    <th className="p-4">Desa</th>
                    <th className="p-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {kat.items.map((item) => (
                    <tr key={item.nama} className="border-b border-outline-variant/20 hover:bg-slate-50/50">
                      <td className="p-4 font-medium text-on-surface">{item.nama}</td>
                      <td className="p-4"><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">{item.desa}</span></td>
                      <td className="p-4 text-sm text-on-surface-variant">{item.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
          <span className="material-symbols-outlined text-amber-600 mt-0.5">info</span>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Data fasilitas umum masih dalam tahap pemetaan. Beberapa titik koordinat belum terpetakan secara lengkap. Data akan diperbarui sesuai hasil survei lapangan terbaru.
          </p>
        </div>
      </section>
    </div>
  );
}
