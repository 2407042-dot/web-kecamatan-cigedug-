"use client";

import React, { useState, useMemo } from "react";

type MappedItem = {
  kategori: string;
  nama: string;
  desa: string;
  alamat: string;
  link: string;
  lat: string;
  lng: string;
  ket: string;
};

// Helper function to get badge color based on category
const getCategoryColor = (category: string) => {
  if (category.toLowerCase().includes("pendidikan")) return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
  if (category.toLowerCase().includes("pesantren") || category.toLowerCase().includes("ibadah")) return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
  if (category.toLowerCase().includes("umkm") || category.toLowerCase().includes("ekonomi")) return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
  if (category.toLowerCase().includes("wisata") || category.toLowerCase().includes("budaya")) return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400";
  if (category.toLowerCase().includes("kesehatan")) return "bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400";
  return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300";
};

export default function DataFilter({ data }: { data: MappedItem[] }) {
  const [filterDesa, setFilterDesa] = useState("Semua Desa");
  const [filterKategori, setFilterKategori] = useState("Semua Kategori");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique filter options
  const desaOptions = ["Semua Desa", ...Array.from(new Set(data.map(d => d.desa).filter(Boolean)))].sort();
  const kategoriOptions = ["Semua Kategori", "Pendidikan", "Pesantren", "UMKM", "Wisata Alam", "Adat & Budaya"];

  // Filter logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchDesa = filterDesa === "Semua Desa" || item.desa === filterDesa;
      
      let matchKategori = true;
      if (filterKategori !== "Semua Kategori") {
        if (filterKategori === "Pendidikan") matchKategori = item.kategori.toLowerCase().includes("pendidikan");
        else if (filterKategori === "Pesantren") matchKategori = item.kategori.toLowerCase().includes("pesantren");
        else if (filterKategori === "UMKM") matchKategori = item.kategori.toLowerCase().includes("umkm");
        else if (filterKategori === "Wisata Alam") matchKategori = item.kategori.toLowerCase().includes("wisata");
        else if (filterKategori === "Adat & Budaya") matchKategori = item.kategori.toLowerCase().includes("budaya");
      }

      const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.ket.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDesa && matchKategori && matchSearch;
    });
  }, [data, filterDesa, filterKategori, searchQuery]);

  return (
    <div>
      {/* ── Filter Controls ── */}
      <div className="bg-white dark:bg-surface-container-low p-5 rounded-2xl border border-outline-variant/40 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
          <select 
            value={filterDesa} 
            onChange={(e) => setFilterDesa(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48 text-label-md cursor-pointer"
          >
            {desaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          
          <select 
            value={filterKategori} 
            onChange={(e) => setFilterKategori(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48 text-label-md cursor-pointer"
          >
            {kategoriOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="w-full md:w-80 relative">
          <input 
            type="text" 
            placeholder="Cari nama atau keterangan..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container border border-outline-variant/50 rounded-full pl-11 pr-4 py-2.5 text-body-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-end">
        <div className="text-label-md font-bold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30">
          Total: {filteredData.length} Data
        </div>
      </div>

      {/* ── Data Table ── */}
      <div className="bg-white dark:bg-surface-container-low border border-outline-variant/40 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-body-md text-on-surface">
            <thead className="bg-surface-container-lowest border-b border-outline-variant/40 text-label-sm uppercase tracking-wider text-on-surface-variant">
              <tr>
                <th className="px-6 py-4 font-bold">Kategori</th>
                <th className="px-6 py-4 font-bold">Nama Fasilitas/Potensi</th>
                <th className="px-6 py-4 font-bold">Desa</th>
                <th className="px-6 py-4 font-bold">Lokasi/Kampung</th>
                <th className="px-6 py-4 font-bold">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-label-sm font-bold border ${getCategoryColor(item.kategori)}`}>
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface">{item.nama}</td>
                    <td className="px-6 py-4 font-medium">{item.desa}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{item.alamat !== '-' ? item.alamat : ''}</td>
                    <td className="px-6 py-4 text-body-sm text-on-surface-variant/80 max-w-xs truncate" title={item.ket}>
                      {item.ket}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">search_off</span>
                    <p className="text-title-md font-bold text-on-surface">Data tidak ditemukan</p>
                    <p className="text-body-md text-on-surface-variant mt-1">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
