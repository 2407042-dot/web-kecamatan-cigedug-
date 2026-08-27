"use client";

import { useState, useEffect } from "react";

type Pengaduan = {
  id: string;
  judul: string;
  pesan: string;
  status: string;
  createdAt: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}/api/pengaduan`;

export default function PengaduanClient() {
  const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>([]);

  const fetchPengaduan = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPengaduanList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPengaduan();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}/read`, { method: "PUT" });
      if (res.ok) fetchPengaduan();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus aspirasi ini secara permanen?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchPengaduan();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">record_voice_over</span>
          Daftar Aspirasi Anonim
        </h2>
        <button
          onClick={fetchPengaduan}
          className="text-primary hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">refresh</span> Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {pengaduanList.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
            Belum ada aspirasi yang masuk.
          </div>
        ) : pengaduanList.map((item) => (
          <div 
            key={item.id} 
            className={`p-5 rounded-xl border transition-all ${
              item.status === 'Belum Dibaca' 
                ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                : 'bg-white border-slate-200 opacity-75'
            }`}
          >
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {item.status === 'Belum Dibaca' && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full">Baru</span>
                  )}
                  <span className="text-xs font-semibold text-slate-500">
                    {new Date(item.createdAt).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{item.judul}</h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.status === 'Belum Dibaca' && (
                  <button 
                    onClick={() => handleMarkAsRead(item.id)}
                    className="text-xs bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    Tandai Dibaca
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 font-bold px-3 py-1.5 rounded-lg"
                >
                  Hapus
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200/60 text-slate-700 text-sm whitespace-pre-wrap">
              {item.pesan}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
