"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";



// Data dari: REKAP DATA POSYANDU 2014 + Data Posyandu & Kader 2014
const posyanduPerDesa = [
  {
    desa: "Barusuda",
    jumlahPosyandu: 12,
    jumlahKader: 60,
    posyandu: [
      { nama: "Tanjung Renteng", kampung: "Kp. Tanjung Renteng RW. 01", ketua: "Piah" },
      { nama: "Ciroyom", kampung: "Kp. Ciroyom RW. 02", ketua: "Yanti" },
      { nama: "Cisurian", kampung: "Kp. Cisurian RW. 03", ketua: "Naneu" },
      { nama: "Cibitung", kampung: "Kp. Cibitung RW. 04", ketua: "Cucu Ratna" },
      { nama: "Olan", kampung: "Kp. Olan RW. 05", ketua: "Eti" },
      { nama: "Barusuda Wetan", kampung: "Kp. Barusuda RW. 06", ketua: "Atisah" },
      { nama: "Areng Kolot", kampung: "Kp. Areng Kolot RW. 07", ketua: "Ai Popi" },
      { nama: "Barusuda Kulon", kampung: "Kp. Barusuda RW. 08", ketua: "Empip" },
      { nama: "Sayuran", kampung: "Kp. Sayuran RW. 09", ketua: "St. N Siti" },
      { nama: "Pasir Hurip", kampung: "Kp. Pasir Hurip RW. 10", ketua: "Ayi" },
      { nama: "Cikuray", kampung: "Kp. Cikuray RW. 11", ketua: "Ai H" },
      { nama: "Pasir Tengah", kampung: "Kp. Pasir Tengah RW. 12", ketua: "Mimin" },
    ],
    faskes: [{ nama: "Puskesdes Barusuda", jenis: "Puskesdes", alamat: "Lingkungan Kantor Desa Barusuda" }],
  },
  {
    desa: "Cigedug",
    jumlahPosyandu: 13,
    jumlahKader: 63,
    posyandu: [
      { nama: "Kebon Satu", kampung: "Kp. Kebon Satu RT/RW 01/01", ketua: "Jujh" },
      { nama: "Ciderey", kampung: "Kp. Ciderey RT/RW 02/03", ketua: "Ela Nurlaela" },
      { nama: "Areng I", kampung: "Kp. Areng RT/RW 05/03", ketua: "Ihat Solihat" },
      { nama: "Areng II", kampung: "Kp. Areng RT/RW 02/03", ketua: "Emma" },
      { nama: "Barukai", kampung: "Kp. Barukai RT/RW 03/04", ketua: "Tatih Mintarsih" },
      { nama: "Sukarame", kampung: "Kp. Sukarame RT/RW 02/05", ketua: "Supiati" },
      { nama: "Babakan I", kampung: "Kp. Babakan RT/RW 04/06", ketua: "Yoyoh" },
      { nama: "Desa Kolot", kampung: "Kp. Desa Kolot RT/RW 06/07", ketua: "Naing. N" },
      { nama: "Situ Gede", kampung: "Kp. Situ Gede RT/RW 01/08", ketua: "Santi. M" },
      { nama: "Cigedug Tonggoh", kampung: "Kp. Cigedug Tonggoh RT/RW 03/09", ketua: "Aneu Haryani" },
      { nama: "Babakan II", kampung: "Kp. Babakan RT/RW 01/10", ketua: "Atin" },
      { nama: "Sindangwargi", kampung: "Kp. Sindangwargi RT/RW 02/11", ketua: "Lala Latipah" },
      { nama: "Cicurug", kampung: "Kp. Cicurug RT/RW 01/12", ketua: "Mimin" },
    ],
    faskes: [{ nama: "Puskesdes Cigedug", jenis: "Puskesdes", alamat: "Sekitar Balai Desa Cigedug" }],
  },
  {
    desa: "Sukahurip",
    jumlahPosyandu: 11,
    jumlahKader: 55,
    posyandu: [
      { nama: "Silih Raksa (Sukahurip)", kampung: "Kp. Sukahurip RW. 01", ketua: "Ade Kokom" },
      { nama: "Anggrek", kampung: "Kp. Cigedug RW. 02", ketua: "Nurhasanah" },
      { nama: "Aster I", kampung: "Kp. Cihuru RW. 03", ketua: "Tuti Suryati" },
      { nama: "Aster II", kampung: "Kp. Cihuru RW. 04", ketua: "Imey Melianingsih" },
      { nama: "Mawar", kampung: "Kp. Cigedug Tengah RW. 05", ketua: "Isah" },
      { nama: "Ros", kampung: "Kp. Cigedug Lebak RW. 06", ketua: "Lia Yulianti" },
      { nama: "Dahlia", kampung: "Kp. Cigedug Kaler RW. 07", ketua: "Endut Nurjanah" },
      { nama: "Sedap Malam", kampung: "Kp. Cigedug Kaler RW. 08", ketua: "Kiki" },
      { nama: "Cempaka", kampung: "Kp. Cirata RW. 09", ketua: "Ipih" },
      { nama: "Kaya Bhakti", kampung: "Kp. Cilongkrang RW. 10", ketua: "Ihah" },
      { nama: "Melati", kampung: "Kp. Baranangsiang RW. 11", ketua: "Nanih" },
    ],
    faskes: [{ nama: "Puskesmas Induk Sukahurip", jenis: "Puskesmas", alamat: "Jl. Raya Cigedug No. 333" }],
  },
  {
    desa: "Sindangsari",
    jumlahPosyandu: 11,
    jumlahKader: 55,
    posyandu: [
      { nama: "Cibuntu", kampung: "Kp. Cibuntu", ketua: "Atim Patimah" },
      { nama: "Negla", kampung: "Kp. Negla", ketua: "Ai Komariah" },
      { nama: "Kandang Sapi", kampung: "Kp. Kandang Sapi", ketua: "Nurhasanah" },
      { nama: "Cipondok", kampung: "Kp. Cipondok", ketua: "Esih Kuraesin" },
      { nama: "Babakan Cipondok", kampung: "Kp. Babakan Cipondok", ketua: "Sopiah" },
      { nama: "Baryear Lebak", kampung: "Kp. Baryear Lebak", ketua: "Uum" },
      { nama: "Sengklek", kampung: "Kp. Sengklek", ketua: "Saidah" },
      { nama: "Gentong", kampung: "Kp. Gentong", ketua: "Imas Nuraeni" },
      { nama: "Baruear Tonggoh", kampung: "Kp. Baruear Tonggoh", ketua: "Iim Masriah" },
      { nama: "Cipondok Tonggoh", kampung: "Kp. Cipondok Tonggoh", ketua: "Khodijah" },
      { nama: "Neglasari", kampung: "Kp. Neglasari", ketua: "Teti" },
    ],
    faskes: [{ nama: "Puskesdes Sindangsari", jenis: "Puskesdes", alamat: "Desa Sindangsari" }],
  },
  {
    desa: "Cintanagara",
    jumlahPosyandu: 16,
    jumlahKader: 79,
    posyandu: [
      { nama: "Cicayur", kampung: "Kp. Cicayur", ketua: "Heni" },
      { nama: "Babakan Cilegong", kampung: "Kp. Babakan Cilegong", ketua: "Euis Juariah" },
      { nama: "Nagara Cinta", kampung: "Kp. Nagara Cinta", ketua: "Ai Alit" },
      { nama: "Siderang Legok", kampung: "Kp. Siderang Legok", ketua: "Engkim" },
      { nama: "Pabrik", kampung: "Kp. Pabrik", ketua: "Dede Nurjanah" },
      { nama: "Sukaresmi", kampung: "Kp. Sukaresmi", ketua: "Ai Rosita" },
      { nama: "Lio", kampung: "Kp. Lio", ketua: "Lalah" },
      { nama: "Jolok", kampung: "Kp. Jolok", ketua: "Cicih Tajidin" },
      { nama: "Cibelendung", kampung: "Kp. Cibelendung", ketua: "Eti Sumiati" },
      { nama: "Situkiruh", kampung: "Kp. Situkiruh", ketua: "Abdulrohman" },
      { nama: "Siderang Datar", kampung: "Kp. Siderang Datar", ketua: "Ai Rosita" },
      { nama: "Pabrik Lebak", kampung: "Kp. Pabrik Lebak", ketua: "Lilis" },
      { nama: "Situ Wangi", kampung: "Kp. Situ Wangi", ketua: "Helmi Rismayanti" },
      { nama: "Cigirang", kampung: "Kp. Cigirang", ketua: "Yoy" },
      { nama: "Sukamulya", kampung: "Kp. Sukamulya", ketua: "Ika" },
      { nama: "Siderang Pasir", kampung: "Kp. Siderang Pasir", ketua: "Imas" },
    ],
    faskes: [{ nama: "Puskesdes Cintanagara", jenis: "Puskesdes", alamat: "Desa Cintanagara" }],
  },
];

const jenisColors: Record<string, string> = {
  "Puskesmas": "bg-red-100 text-red-700",
  "Puskesdes": "bg-rose-100 text-rose-700",
  "Posyandu": "bg-pink-100 text-pink-700",
};

const desaColors: Record<string, string> = {
  "Cintanagara": "bg-violet-100 text-violet-700",
  "Cigedug": "bg-blue-100 text-blue-700",
  "Barusuda": "bg-emerald-100 text-emerald-700",
  "Sindangsari": "bg-amber-100 text-amber-700",
  "Sukahurip": "bg-rose-100 text-rose-700",
};

export default function KesehatanPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalPosyandu = posyanduPerDesa.reduce((s, d) => s + d.jumlahPosyandu, 0);
  const totalKader = posyanduPerDesa.reduce((s, d) => s + d.jumlahKader, 0);
  const maxPosyandu = Math.max(...posyanduPerDesa.map(d => d.jumlahPosyandu));

  // Filter logika
  const filteredData = useMemo(() => {
    return posyanduPerDesa.map(desaData => {
      const filteredPosyandu = desaData.posyandu.filter(item => {
        return item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
               item.kampung.toLowerCase().includes(searchQuery.toLowerCase()) ||
               item.ketua.toLowerCase().includes(searchQuery.toLowerCase());
      });
      const filteredFaskes = desaData.faskes.filter(item => {
        return item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
               item.alamat.toLowerCase().includes(searchQuery.toLowerCase());
      });
      return { ...desaData, posyandu: filteredPosyandu, faskes: filteredFaskes };
    }).filter(desaData => desaData.posyandu.length > 0 || desaData.faskes.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-rose-600 to-red-700 text-white px-6 md:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link href="/data" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kembali ke Portal Data
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">Data Kesehatan</h1>
              <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                Data fasilitas kesehatan meliputi Puskesmas, Puskesdes, dan seluruh Posyandu di 5 desa Kecamatan Cigedug.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-2xl font-black">{totalPosyandu}</span>
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">favorite</span> Posyandu</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-2xl font-black">{totalKader}</span>
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">people</span> Kader</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Filter & Search Section --- */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 -mt-8 relative z-20">
        <div className="bg-white dark:bg-surface-container-low rounded-3xl p-6 shadow-xl shadow-rose-900/5 border border-outline-variant/30 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2 lg:w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              type="text" 
              placeholder="Cari posyandu, alamat, ketua..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border border-outline-variant/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-xl border border-rose-100 dark:border-rose-800/50">
               <span className="material-symbols-outlined text-rose-600 text-[20px]">local_hospital</span>
               <span className="text-sm font-bold text-rose-800 dark:text-rose-300">1 Puskesmas</span>
            </div>
            <div className="flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 px-4 py-2 rounded-xl border border-pink-100 dark:border-pink-800/50">
               <span className="material-symbols-outlined text-pink-600 text-[20px]">medical_services</span>
               <span className="text-sm font-bold text-pink-800 dark:text-pink-300">4 Puskesdes</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-12">
        {searchQuery === "" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-600">bar_chart</span>
              Distribusi Posyandu per Desa
            </h2>
            <div className="bg-white dark:bg-surface-container-low rounded-2xl p-6 border border-outline-variant/40 shadow-sm space-y-4">
              {posyanduPerDesa
                .sort((a, b) => b.jumlahPosyandu - a.jumlahPosyandu)
                .map(d => (
                  <div key={d.desa}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-on-surface">Desa {d.desa}</span>
                      <span className="text-on-surface-variant font-bold">
                        {d.jumlahPosyandu} posyandu · {d.jumlahKader} kader
                      </span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-700"
                        style={{ width: `${(d.jumlahPosyandu / maxPosyandu) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
            <h3 className="text-xl font-bold text-on-surface">Pencarian Tidak Ditemukan</h3>
            <p className="text-on-surface-variant mt-2">Tidak ada fasilitas atau posyandu yang sesuai dengan pencarian Anda.</p>
            <button onClick={() => setSearchQuery("")} className="mt-4 text-rose-600 font-bold hover:underline">Reset Pencarian</button>
          </div>
        ) : (
          filteredData.map(d => (
            <div key={d.desa} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-600 text-3xl">location_on</span>
                  Desa {d.desa}
                </h2>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${desaColors[d.desa] || "bg-slate-100 text-slate-600"}`}>
                  {d.posyandu.length} Posyandu
                </span>
              </div>

              {/* Puskesmas/Puskesdes */}
              {d.faskes.map(f => (
                <div key={f.nama} className="mb-4 flex items-center gap-4 p-5 bg-gradient-to-r from-rose-50 to-white dark:from-rose-900/10 dark:to-surface-container-low border border-rose-200/60 dark:border-rose-800/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-rose-600 text-2xl">local_hospital</span>
                  </div>
                  <div>
                    <p className="font-extrabold text-rose-900 dark:text-rose-300 text-lg">{f.nama}</p>
                    <p className="text-sm font-medium text-rose-600/80 dark:text-rose-400/80 flex items-center gap-1.5 mt-0.5">
                      <span className="bg-rose-200/50 dark:bg-rose-800/50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">{f.jenis}</span>
                      {f.alamat}
                    </p>
                  </div>
                </div>
              ))}

              {/* Tabel Posyandu */}
              {d.posyandu.length > 0 && (
                <div className="overflow-x-auto rounded-3xl border border-outline-variant/30 bg-white dark:bg-surface-container-low shadow-sm mt-4">
                  <table className="w-full text-left">
                    <thead className="bg-surface-container-lowest border-b border-outline-variant/30">
                      <tr className="text-sm text-on-surface-variant font-bold uppercase tracking-wider">
                        <th className="p-5 w-16 text-center">No</th>
                        <th className="p-5">Nama Posyandu</th>
                        <th className="p-5">Lokasi / Kampung</th>
                        <th className="p-5">Ketua</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {d.posyandu.map((p, i) => (
                        <tr key={p.nama} className="hover:bg-rose-50/50 dark:hover:bg-surface-container-high/30 transition-colors group">
                          <td className="p-5 text-sm text-on-surface-variant text-center font-mono">{i + 1}</td>
                          <td className="p-5 font-bold text-on-surface group-hover:text-rose-600 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-pink-400 text-[18px] group-hover:scale-110 transition-transform">favorite</span>
                              {p.nama}
                            </div>
                          </td>
                          <td className="p-5 text-sm text-on-surface-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-outline-variant text-[16px]">map</span>
                            {p.kampung}
                          </td>
                          <td className="p-5 text-sm font-medium text-on-surface-variant">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-[10px] text-on-surface font-black uppercase">
                                {p.ketua.charAt(0)}
                              </span>
                              {p.ketua}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        )}

        {/* Sumber */}
        <div className="p-5 bg-rose-50 dark:bg-rose-900/20 rounded-2xl border border-rose-200 dark:border-rose-800/50 flex items-start gap-3">
          <span className="material-symbols-outlined text-rose-600 mt-0.5 shrink-0">info</span>
          <div className="text-sm text-rose-800 dark:text-rose-300">
            <p className="font-bold mb-1">Sumber Data</p>
            <p>Rekap Data Posyandu Tahun 2014 & Data Posyandu dan Kader Tahun 2014, Kecamatan Cigedug, Kabupaten Garut.
            Total: 5 Desa, <strong>63 Posyandu</strong>, <strong>312 Kader</strong> aktif. Data dapat diperbarui melalui Admin.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
