"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Penghargaan = {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  imageUrl?: string | null;
  color: string;
};

const emptyForm = {
  id: "",
  title: "",
  year: "",
  category: "Pelayanan Publik",
  description: "",
  color: "from-amber-400 to-orange-500",
};

const COLOR_OPTIONS = [
  { label: "Emas (Amber)", value: "from-amber-400 to-orange-500" },
  { label: "Biru (Indigo)", value: "from-blue-400 to-indigo-500" },
  { label: "Hijau (Emerald)", value: "from-green-400 to-emerald-600" },
  { label: "Merah (Rose)", value: "from-rose-400 to-red-500" },
  { label: "Ungu (Violet)", value: "from-violet-400 to-purple-600" },
];

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}/api/penghargaan`;

export default function PenghargaanClient() {
  const [list, setList] = useState<Penghargaan[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("year", form.year);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("color", form.color);
    if (image) formData.append("image", image);

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;
    try {
      await fetch(url, { method, body: formData });
      setForm(emptyForm);
      setImage(null);
      setShowForm(false);
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Penghargaan) => {
    setForm({
      id: item.id, title: item.title, year: item.year,
      category: item.category, description: item.description,
      color: item.color,
    });
    setImage(null);
    setIsEditing(true);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus penghargaan ini?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manajemen Penghargaan</h2>
        <button
          onClick={() => { setShowForm(!showForm); setIsEditing(false); setForm(emptyForm); setImage(null); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Batal" : "+ Tambah Penghargaan"}
        </button>
      </div>

      {showForm && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200"
        >
          <h3 className="md:col-span-2 font-semibold text-slate-700 text-base">
            {isEditing ? "✏️ Edit Penghargaan" : "➕ Tambah Penghargaan Baru"}
          </h3>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Penghargaan *</label>
            <input
              required type="text" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
              placeholder="Contoh: Kecamatan Terbaik 1 Tingkat Kabupaten Garut"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tahun *</label>
            <input
              required type="text" value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
              placeholder="Contoh: 2025"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori *</label>
            <select
              required value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
            >
              <option>Pelayanan Publik</option>
              <option>Kesehatan</option>
              <option>Pemberdayaan Desa</option>
              <option>Seni & Budaya</option>
              <option>Lingkungan</option>
              <option>Inovasi</option>
              <option>Lainnya</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi *</label>
            <textarea
              required value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white h-20 resize-none"
              placeholder="Isi deskripsi penghargaan..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Foto Penghargaan {isEditing && "(Opsional - biarkan kosong jika tidak ingin mengganti)"}
            </label>
            <input
              type="file" accept="image/*"
              onChange={e => setImage(e.target.files?.[0] || null)}
              className="w-full px-4 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Warna Latar Kartu</label>
            <select
              value={form.color}
              onChange={e => setForm({ ...form, color: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
            >
              {COLOR_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {isEditing ? "Simpan Perubahan" : "Simpan Penghargaan"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {list.length === 0 && (
          <div className="col-span-3 py-12 text-center text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-2 block">emoji_events</span>
            Belum ada data penghargaan. Klik &quot;+ Tambah Penghargaan&quot;.
          </div>
        )}
        {list.map((item) => (
          <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <div className="aspect-video relative bg-slate-100">
              {item.imageUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${item.imageUrl}`}
                  alt={item.title}
                  fill className="object-cover" unoptimized
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30 flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-4xl text-slate-500">emoji_events</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-xs font-bold text-slate-700">
                {item.year}
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs font-bold text-amber-600 block mb-1">{item.category}</span>
              <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2">{item.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mb-3">{item.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="text-blue-600 text-xs hover:bg-blue-50 px-3 py-1 rounded-lg font-medium">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 text-xs hover:bg-red-50 px-3 py-1 rounded-lg font-medium">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
