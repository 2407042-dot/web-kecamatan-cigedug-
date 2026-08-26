"use client";

import { useState, useEffect } from "react";

type SiteContent = {
  key: string;
  label: string;
  page: string;
  value: string;
};

export default function KontenPage() {
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editKey, setEditKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/konten")
      .then((r) => r.json())
      .then((data) => {
        setItems(data);
        if (data.length > 0) setActiveTab(data[0].page);
      })
      .finally(() => setLoading(false));
  }, []);

  const pages = [...new Set(items.map((i) => i.page))];

  const filtered = items
    .filter((i) => i.page === activeTab)
    .filter((i) =>
      search === "" ||
      i.label.toLowerCase().includes(search.toLowerCase()) ||
      i.value.toLowerCase().includes(search.toLowerCase())
    );

  const startEdit = (item: SiteContent) => {
    setEditKey(item.key);
    setEditValue(item.value);
  };

  const cancelEdit = () => {
    setEditKey(null);
    setEditValue("");
  };

  const saveEdit = async (item: SiteContent) => {
    setSaving(true);
    try {
      const res = await fetch("/api/konten", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.key, value: editValue }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.key === item.key ? { ...i, value: editValue } : i))
        );
        setSavedKey(item.key);
        setTimeout(() => setSavedKey(null), 2500);
        setEditKey(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const pageIcons: Record<string, string> = {
    Home: "home",
    Profil: "account_circle",
    Pelayanan: "support_agent",
    Inovasi: "lightbulb",
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Kelola Konten Halaman</h1>
          <p className="text-slate-400 text-sm mt-1">
            Edit teks yang tampil di halaman publik website. Perubahan langsung tersimpan.
          </p>
        </div>
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-base">search</span>
          <input
            type="text"
            placeholder="Cari konten..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-800 border border-white/10 text-white placeholder:text-slate-500 text-sm rounded-xl pl-9 pr-4 py-2.5 w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3">
        <span className="material-symbols-outlined text-blue-400 text-lg shrink-0 mt-0.5">tips_and_updates</span>
        <p className="text-slate-300 text-xs leading-relaxed">
          Semua perubahan disimpan secara langsung di dalam proyek. Fitur ini <strong className="text-white">tidak memerlukan server backend</strong> — cukup jalankan website biasa saja.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <svg className="animate-spin h-8 w-8 text-blue-400 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-slate-400 text-sm">Memuat konten...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Page Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => { setActiveTab(page); setSearch(""); cancelEdit(); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
                  ${activeTab === page
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-white/5"
                  }`}
              >
                <span className="material-symbols-outlined text-base">
                  {pageIcons[page] || "article"}
                </span>
                {page}
              </button>
            ))}
          </div>

          {/* Content Count Badge */}
          <p className="text-slate-500 text-xs">
            {filtered.length} konten tersedia di halaman <span className="text-slate-300 font-semibold">{activeTab}</span>
          </p>

          {/* Content Cards */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <span className="material-symbols-outlined text-4xl block mb-2">search_off</span>
                Tidak ada konten yang cocok dengan pencarian.
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.key}
                  className={`bg-slate-900 border rounded-2xl p-5 transition-all duration-150
                    ${editKey === item.key ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : "border-white/5 hover:border-white/10"}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-white font-semibold text-sm">{item.label}</p>
                      <p className="text-slate-600 text-[11px] mt-0.5 font-mono">{item.key}</p>
                    </div>

                    {savedKey === item.key ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full shrink-0">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Tersimpan!
                      </span>
                    ) : editKey !== item.key ? (
                      <button
                        onClick={() => startEdit(item)}
                        className="flex items-center gap-1.5 text-blue-400 hover:text-white text-xs font-semibold bg-blue-400/10 hover:bg-blue-600 border border-blue-400/20 hover:border-blue-600 px-3 py-1.5 rounded-full transition-all shrink-0"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit
                      </button>
                    ) : null}
                  </div>

                  {editKey === item.key ? (
                    <div className="space-y-3">
                      {item.value.length > 80 ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          rows={5}
                          className="w-full bg-slate-800 border border-blue-500/50 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                          autoFocus
                        />
                      ) : (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-full bg-slate-800 border border-blue-500/50 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(item)}
                          disabled={saving}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-blue-500/20"
                        >
                          <span className="material-symbols-outlined text-sm">save</span>
                          {saving ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-slate-400 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all hover:bg-slate-700"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/50 rounded-xl px-4 py-3 border border-white/5">
                      {item.value}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
