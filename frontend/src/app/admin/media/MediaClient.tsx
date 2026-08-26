"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type HeroItem = { id: string; label: string; url: string };
type MediaConfig = { home_videos: string[]; page_heroes: HeroItem[] };

export default function MediaClient() {
  const [config, setConfig] = useState<MediaConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "foto">("video");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/media-settings");
      const data = await res.json();
      setConfig(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (newConfig: MediaConfig) => {
    try {
      await fetch("/api/media-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      setConfig(newConfig);
    } catch (e) {
      console.error(e);
      alert("Gagal menyimpan konfigurasi.");
    }
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload gagal");
    const data = await res.json();
    return data.url;
  };

  const handleAddVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !config) return;
    setUploading(true);
    try {
      const url = await uploadFile(e.target.files[0]);
      const newConfig = { ...config, home_videos: [...config.home_videos, url] };
      await saveConfig(newConfig);
    } catch (error) {
      alert("Gagal mengupload video.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVideo = async (index: number) => {
    if (!config) return;
    if (!confirm("Hapus video ini dari beranda?")) return;
    const newVideos = [...config.home_videos];
    newVideos.splice(index, 1);
    const newConfig = { ...config, home_videos: newVideos };
    await saveConfig(newConfig);
  };

  const handleUpdateHero = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !config) return;
    setUploading(true);
    try {
      const url = await uploadFile(e.target.files[0]);
      const newHeroes = config.page_heroes.map(h => h.id === id ? { ...h, url } : h);
      const newConfig = { ...config, page_heroes: newHeroes };
      await saveConfig(newConfig);
    } catch (error) {
      alert("Gagal mengupload foto.");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-400 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="text-slate-400 text-sm">Memuat pengaturan media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Kelola Media Halaman</h1>
        <p className="text-slate-400 text-sm mt-1">
          Atur video carousel di Beranda dan foto hero untuk masing-masing halaman.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("video")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === "video" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined text-base">movie</span>
          Video Beranda
        </button>
        <button
          onClick={() => setActiveTab("foto")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === "foto" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined text-base">image</span>
          Foto Hero Desa
        </button>
      </div>

      {/* Loading Overlay for Upload */}
      {uploading && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-2xl border border-white/10 text-center">
            <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-white font-bold text-sm">Sedang mengupload...</p>
            <p className="text-slate-400 text-xs mt-1">Mohon tunggu sebentar.</p>
          </div>
        </div>
      )}

      {/* VIDEO TAB */}
      {activeTab === "video" && (
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3">
            <span className="material-symbols-outlined text-blue-400 text-lg shrink-0">info</span>
            <p className="text-slate-300 text-sm leading-relaxed">
              Video akan diputar bergiliran (carousel) di latar belakang halaman Beranda. Disarankan resolusi HD (720p/1080p) format MP4 agar tidak terlalu berat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.home_videos.map((vid, idx) => (
              <div key={idx} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden group">
                <div className="aspect-video bg-black relative">
                  <video src={vid} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={() => handleDeleteVideo(idx)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    title="Hapus Video"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-mono truncate max-w-[80%]">
                    {vid.split('/').pop()}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add New Video Card */}
            <div className="aspect-video bg-slate-800/50 hover:bg-slate-800 border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors relative cursor-pointer group">
              <input type="file" accept="video/mp4,video/webm" onChange={handleAddVideo} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-12 h-12 bg-slate-700 group-hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors shadow-lg">
                <span className="material-symbols-outlined text-white text-xl">add</span>
              </div>
              <p className="text-slate-400 group-hover:text-blue-400 font-bold text-sm">Tambah Video Beranda</p>
            </div>
          </div>
        </div>
      )}

      {/* FOTO TAB */}
      {activeTab === "foto" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.page_heroes.map((hero) => (
            <div key={hero.id} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-sm">{hero.label}</h3>
                  <p className="text-slate-500 text-xs mt-0.5">ID: {hero.id}</p>
                </div>
                <div className="relative overflow-hidden">
                  <input type="file" accept="image/*" onChange={(e) => handleUpdateHero(hero.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <button className="bg-slate-800 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">upload</span>
                    Ganti Foto
                  </button>
                </div>
              </div>
              <div className="relative aspect-[21/9] bg-slate-950">
                <Image src={hero.url} alt={hero.label} fill unoptimized className="object-cover opacity-80" />
              </div>
              <div className="p-3 bg-slate-950/50 border-t border-white/5">
                <p className="text-[10px] text-slate-500 font-mono truncate">{hero.url}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
