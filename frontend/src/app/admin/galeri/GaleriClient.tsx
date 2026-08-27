"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Galeri = {
  id: string;
  title: string;
  category: string;
  img: string;
  aspectRatio: string;
  description?: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}/api/galeri`;

export default function GaleriClient() {
  const [galeriList, setGaleriList] = useState<Galeri[]>([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    category: "Kegiatan",
    aspectRatio: "aspect-square",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchGaleri = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setGaleriList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing && !file) return alert("Pilih foto terlebih dahulu!");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("aspectRatio", form.aspectRatio);
    formData.append("description", form.description);
    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEditing) {
        await fetch(`${API_URL}/${form.id}`, { method: "PUT", body: formData });
      } else {
        await fetch(API_URL, { method: "POST", body: formData });
      }
      setForm({ id: "", title: "", category: "Kegiatan", aspectRatio: "aspect-square", description: "" });
      setFile(null);
      setShowForm(false);
      setIsEditing(false);
      fetchGaleri();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus foto dari galeri?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchGaleri();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Galeri) => {
    setForm({
      id: item.id,
      title: item.title,
      category: item.category,
      aspectRatio: item.aspectRatio,
      description: item.description || "",
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manajemen Galeri Foto</h2>
        <button onClick={() => { setShowForm(!showForm); setIsEditing(false); setForm({ id: "", title: "", category: "Kegiatan", aspectRatio: "aspect-square", description: "" }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {showForm ? "Batal Tambah" : "+ Tambah Foto"}
        </button>
      </div>
      
      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Foto</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: Kegiatan 17 Agustus" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white">
              <option value="Kegiatan">Kegiatan</option>
              <option value="Pemerintahan">Pemerintahan</option>
              <option value="Pelayanan">Pelayanan</option>
              <option value="Pemberdayaan">Pemberdayaan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi (Maks. 150 Karakter)</label>
            <textarea maxLength={150} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white h-20 resize-none" placeholder="Deskripsi singkat kegiatan..."></textarea>
            <p className="text-xs text-slate-500 text-right mt-1">{form.description.length}/150</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Rasio Gambar</label>
            <select required value={form.aspectRatio} onChange={e => setForm({...form, aspectRatio: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white">
              <option value="aspect-square">Kotak (1:1)</option>
              <option value="aspect-[4/3]">Lanskap (4:3)</option>
              <option value="aspect-[3/4]">Potret (3:4)</option>
              <option value="aspect-video">Video (16:9)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Foto {isEditing && "(Opsional, isi jika ingin mengubah foto)"}</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full px-4 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white" />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm font-medium hover:bg-blue-700 transition-colors">
              {isEditing ? "Simpan Perubahan" : "Upload ke Galeri"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galeriList.map((item) => (
          <div key={item.id} className="border border-outline-variant/40 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className={`relative w-full aspect-video bg-surface-container`}>
              <Image src={item.img.startsWith('/uploads') ? `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}${item.img}` : item.img} alt={item.title} fill className="object-cover" unoptimized />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <span className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{item.category}</span>
              <h3 className="font-bold text-on-surface mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-on-surface-variant mb-4">{item.description}</p>
              )}
              <div className="mt-auto flex justify-end gap-2">
                <button onClick={() => handleEdit(item)} className="text-primary text-sm hover:bg-primary/10 px-3 py-1.5 rounded-lg font-medium">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-error text-sm hover:bg-error/10 px-3 py-1.5 rounded-lg font-medium">Hapus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
