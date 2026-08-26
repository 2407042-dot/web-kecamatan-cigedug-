"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";



const pendidikanData = [
  {
    desa: "Barusuda",
    items: [
      { nama: "KB Al-Ikhlas", jenjang: "PAUD", lokasi: "Desa Barusuda" },
      { nama: "KOBER Ihsan Mubarok", jenjang: "PAUD", lokasi: "Kp. Sayuran RT 01/09" },
      { nama: "SDN 1 Barusuda", jenjang: "SD", lokasi: "Kp. Sayuran RT 02/09" },
      { nama: "SDN 2 Barusuda", jenjang: "SD", lokasi: "Kp. Cibitung" },
      { nama: "SD IT Al Ikhlas", jenjang: "SD", lokasi: "Kp. Barusuda RT 001/006" },
      { nama: "MIS Babussalam", jenjang: "MI", lokasi: "Jl. Cigedug No.1170" },
      { nama: "MIS Nurul Falah", jenjang: "MI", lokasi: "Kp. Olan" },
      { nama: "SMP IT Al-Inayah", jenjang: "SMP", lokasi: "Kp. Bukatanah RT 003/001" },
      { nama: "SMP IT Daarul Amiin", jenjang: "SMP", lokasi: "Kp. Barusuda RT 03/06" },
      { nama: "MTs Babussalam", jenjang: "MTs", lokasi: "Jl. Cigedug No 1770 Kp. Sayuran" },
      { nama: "MTs SA Nurul Falah", jenjang: "MTs", lokasi: "Kp. Olan RT 01/05" },
      { nama: "SMA IT Daarul Amiin", jenjang: "SMA", lokasi: "Kp. Barusuda" },
      { nama: "MAS Nurul Falah", jenjang: "MA", lokasi: "Kp. Olan RT 01/05" },
      { nama: "Ponpes Miftahul Hidayah", jenjang: "Pesantren", lokasi: "Kp. Sayuran RT 01/09" },
      { nama: "Ponpes Daarul Amiin", jenjang: "Pesantren", lokasi: "Kp. Barusuda" },
      { nama: "PKBM ASSIKKIN", jenjang: "PKBM/LKP", lokasi: "Kp. Barusuda RT 01 RW 06" },
    ],
  },
  {
    desa: "Cigedug",
    items: [
      { nama: "SDN 1 Cigedug", jenjang: "SD", lokasi: "Kp. Cigedug Tonggoh" },
      { nama: "SDN 2 Cigedug", jenjang: "SD", lokasi: "Kp. Cigedug Tonggoh" },
      { nama: "SDN 3 Cigedug", jenjang: "SD", lokasi: "Kp. Cigedug Tonggoh" },
      { nama: "SDN 4 Cigedug", jenjang: "SD", lokasi: "Kp. Barukai" },
      { nama: "SDN 5 Cigedug", jenjang: "SD", lokasi: "Kp. Ciredey" },
      { nama: "SD IT Hidayatul Mubtadiin", jenjang: "SD", lokasi: "Kp. Barukai Kaler" },
      { nama: "MIS Manbaul Huda", jenjang: "MI", lokasi: "Kp. Areng" },
      { nama: "SMP IT Al-Muawanah", jenjang: "SMP", lokasi: "Kp. Cigedug Tonggoh" },
      { nama: "SMP IT Hidayatul Mubtadiin", jenjang: "SMP", lokasi: "Kp. Barukai Kaler" },
      { nama: "SMPS IT Assalam", jenjang: "SMP", lokasi: "Kp. Kebonsatu" },
      { nama: "SMPS IT Manbaul Huda", jenjang: "SMP", lokasi: "Kp. Areng" },
      { nama: "SMPS Maarif 1 Maruful Hidayah", jenjang: "SMP", lokasi: "Kp. Barukai" },
      { nama: "MTs Daaruttaqwa", jenjang: "MTs", lokasi: "Kp. Situgede" },
      { nama: "MTs Manbaul Huda", jenjang: "MTs", lokasi: "Kp. Areng" },
      { nama: "MA Hidayatul Mubtadiin", jenjang: "MA", lokasi: "Kp. Barukai Kaler" },
      { nama: "MA NU Fathun Nahwi", jenjang: "MA", lokasi: "Kp. Situgede RT-03 RW-08" },
      { nama: "SMA IT Al-Muawanah", jenjang: "SMA", lokasi: "Kp. Cigedug Tonggoh" },
      { nama: "SMA Plus Ma'ruful Hidayah", jenjang: "SMA", lokasi: "Jl. Raya Cigedug Kp. Barukai" },
      { nama: "SMAS IT Al Kafi", jenjang: "SMA", lokasi: "Desa Cigedug" },
      { nama: "SMKS Manbaul Huda", jenjang: "SMA", lokasi: "Kp. Areng RT 02 RW 03" },
      { nama: "Ponpes Ma'aruful Hidayah", jenjang: "Pesantren", lokasi: "Desa Cigedug" },
      { nama: "PPS Anshorul Huda", jenjang: "Pesantren", lokasi: "Kp. Babakan Rt. 05 Rw. 06" },
      { nama: "LKP Althafurrohman", jenjang: "PKBM/LKP", lokasi: "Kp. Cigedug Tonggoh RT 03 RW 09" },
      { nama: "PKBM Cahaya Islam", jenjang: "PKBM/LKP", lokasi: "Kp. Cigedug Tonggoh RT 003 RW 009" },
    ],
  },
  {
    desa: "Cintanagara",
    items: [
      { nama: "SDN 1 Cintanagara", jenjang: "SD", lokasi: "Kp. Situwangi" },
      { nama: "SDN 2 Cintanagara", jenjang: "SD", lokasi: "Kp. Siderang" },
      { nama: "SDN 3 Cintanagara", jenjang: "SD", lokasi: "Kp. Pabrik" },
      { nama: "SD IT Miftahul Huda", jenjang: "SD", lokasi: "Kp. Cibelendung" },
      { nama: "MIS Al-Hikmah", jenjang: "MI", lokasi: "Kp. Situkiruh" },
      { nama: "MIS Al-Muttaqin 82", jenjang: "MI", lokasi: "Kp. Siderang Legok" },
      { nama: "SMPN 2 Cigedug", jenjang: "SMP", lokasi: "Jl. Cicayur" },
      { nama: "PPS Miftahul Huda", jenjang: "Pesantren", lokasi: "Kp Cibelendung Rt 01 Rw 09" },
    ],
  },
  {
    desa: "Sindangsari",
    items: [
      { nama: "SDN 1 Sindangsari", jenjang: "SD", lokasi: "Kp. Sindangsari" },
      { nama: "SDN 2 Sindangsari", jenjang: "SD", lokasi: "Kp. Babakan Cipondok" },
      { nama: "SDN 3 Sindangsari", jenjang: "SD", lokasi: "Kp. Tegal Biuk" },
      { nama: "SDN 4 Sindangsari", jenjang: "SD", lokasi: "Kp. Gentong" },
      { nama: "SMP Plus Darul Arham", jenjang: "SMP", lokasi: "Kp. Babakan Cipondok" },
      { nama: "MTs Al Kafi", jenjang: "MTs", lokasi: "Kp. Negla" },
      { nama: "Ponpes Al-Ittihad", jenjang: "Pesantren", lokasi: "Desa Sindangsari" },
      { nama: "Ponpes Al Hikmah", jenjang: "Pesantren", lokasi: "Desa Sindangsari" },
      { nama: "PKBM Al-Ikhlas", jenjang: "PKBM/LKP", lokasi: "Jl. Cigedug Kp. Negla RT. 01 RW. 04" },
    ],
  },
  {
    desa: "Sukahurip",
    items: [
      { nama: "KB Attaubah", jenjang: "PAUD", lokasi: "Kp. Baranangsiang" },
      { nama: "KB Baetur Rohman", jenjang: "PAUD", lokasi: "Kp. Cigedug Kaler" },
      { nama: "KB Nurul Ihsan", jenjang: "PAUD", lokasi: "Kp. Cihuru" },
      { nama: "TK Miftahul Ulum", jenjang: "PAUD", lokasi: "Kp. Cigedug Tengah" },
      { nama: "SDN 1 Sukahurip", jenjang: "SD", lokasi: "Kp. Cihuru" },
      { nama: "SDN 2 Sukahurip", jenjang: "SD", lokasi: "Kp. Cirata" },
      { nama: "MIS Nurul Islam", jenjang: "MI", lokasi: "Kp. Cihuru" },
      { nama: "SMPN 1 Cigedug", jenjang: "SMP", lokasi: "Jl. Cigedug No. 125" },
      { nama: "MTs Miftahul Ulum Cigedug", jenjang: "MTs", lokasi: "Kp. Cigedug Tengah" },
      { nama: "SMA Tunas Karya Garut", jenjang: "SMA", lokasi: "Kp. Cirata" },
      { nama: "PPS Nurul Ihsan", jenjang: "Pesantren", lokasi: "Kp. Cihuru" },
      { nama: "Ponpes Man Baul Huda", jenjang: "Pesantren", lokasi: "Kp. Cigedug Tengah" },
      { nama: "Ponpes Nurul Barokah", jenjang: "Pesantren", lokasi: "Kp. Cigedug" },
      { nama: "Pondok Pesantren PP Al Hidayah", jenjang: "Pesantren", lokasi: "Jl Sudirman Koropeak Kaler" },
      { nama: "LKP Arham", jenjang: "PKBM/LKP", lokasi: "Kp. Cihuru Rt.01 Rw.04" },
      { nama: "PKBM Tunas Nusantara", jenjang: "PKBM/LKP", lokasi: "Kp. Cilongkrang RT 03 RW 10" },
    ],
  },
];

const jenjangColors: Record<string, string> = {
  "PAUD": "bg-pink-100 text-pink-700",
  "SD": "bg-blue-100 text-blue-700",
  "MI": "bg-cyan-100 text-cyan-700",
  "SMP": "bg-emerald-100 text-emerald-700",
  "MTs": "bg-teal-100 text-teal-700",
  "SMA": "bg-violet-100 text-violet-700",
  "MA": "bg-purple-100 text-purple-700",
  "Pesantren": "bg-amber-100 text-amber-700",
  "PKBM/LKP": "bg-orange-100 text-orange-700",
};

export default function PendidikanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeJenjang, setActiveJenjang] = useState("Semua");

  const totalItems = pendidikanData.reduce((sum, d) => sum + d.items.length, 0);

  // Filter logika
  const filteredData = useMemo(() => {
    return pendidikanData.map(desaData => {
      const filteredItems = desaData.items.filter(item => {
        const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
        const matchJenjang = activeJenjang === "Semua" || item.jenjang === activeJenjang;
        return matchSearch && matchJenjang;
      });
      return { ...desaData, items: filteredItems };
    }).filter(desaData => desaData.items.length > 0);
  }, [searchQuery, activeJenjang]);

  const allJenjangs = ["Semua", ...Array.from(new Set(pendidikanData.flatMap(d => d.items.map(i => i.jenjang))))];

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 md:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/data" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kembali ke Portal Data
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">Data Pendidikan</h1>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                Direktori lengkap {totalItems} lembaga pendidikan di seluruh wilayah Kecamatan Cigedug.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[140px]">
              <span className="material-symbols-outlined text-3xl mb-1">school</span>
              <span className="text-3xl font-black">{totalItems}</span>
              <span className="text-white/70 text-xs font-medium uppercase tracking-wider mt-1">Total Lembaga</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Filter & Search Section --- */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 -mt-8 relative z-20">
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-outline-variant/30 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Cari nama sekolah atau lokasi..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {allJenjangs.map(j => (
              <button 
                key={j}
                onClick={() => setActiveJenjang(j)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeJenjang === j 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:bg-outline-variant/20"
                }`}
              >
                {j}
              </button>
            ))}
          </div>
          
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-10">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
            <h3 className="text-xl font-bold text-on-surface">Pencarian Tidak Ditemukan</h3>
            <p className="text-on-surface-variant mt-2">Tidak ada lembaga pendidikan yang sesuai dengan filter Anda.</p>
            <button onClick={() => {setSearchQuery(""); setActiveJenjang("Semua");}} className="mt-4 text-blue-600 font-bold hover:underline">Reset Filter</button>
          </div>
        ) : (
          filteredData.map((d) => (
            <div key={d.desa} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-3xl">location_on</span>
                  Desa {d.desa}
                </h2>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {d.items.length} Lembaga
                </span>
              </div>
              <div className="overflow-x-auto rounded-3xl border border-outline-variant/30 bg-white dark:bg-surface-container-low shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-lowest border-b border-outline-variant/30">
                    <tr className="text-sm text-on-surface-variant font-bold uppercase tracking-wider">
                      <th className="p-5 w-16 text-center">No</th>
                      <th className="p-5">Nama Lembaga</th>
                      <th className="p-5">Jenjang</th>
                      <th className="p-5">Lokasi / Alamat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {d.items.map((item, i) => (
                      <tr key={item.nama} className="hover:bg-blue-50/50 dark:hover:bg-surface-container-high/30 transition-colors group">
                        <td className="p-5 text-sm text-on-surface-variant text-center font-mono">{i + 1}</td>
                        <td className="p-5 font-bold text-on-surface group-hover:text-blue-600 transition-colors">{item.nama}</td>
                        <td className="p-5">
                          <span className={`text-xs font-black px-3 py-1.5 rounded-xl border border-transparent ${jenjangColors[item.jenjang] || "bg-slate-100 text-slate-600"}`}>
                            {item.jenjang}
                          </span>
                        </td>
                        <td className="p-5 text-sm text-on-surface-variant flex items-center gap-2">
                          <span className="material-symbols-outlined text-outline-variant text-[16px]">map</span>
                          {item.lokasi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
