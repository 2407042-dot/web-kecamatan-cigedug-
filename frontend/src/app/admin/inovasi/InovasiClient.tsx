"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Inovasi = {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
  imageUrl?: string;
};

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/inovasi`;

export default function InovasiClient() {
  const [inovasiList, setInovasiList] = useState<Inovasi[]>([]);
  const [form, setForm] = useState({ id: "", title: "", date: "", description: "", content: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchInovasi = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setInovasiList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInovasi();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("description", form.description);
    formData.append("content", form.content);
    if (file) {
      formData.append("image", file);
    }

    try {
      let res;
      if (isEditing) {
        res = await fetch(`${API_URL}/${form.id}`, { method: "PUT", body: formData });
      } else {
        res = await fetch(API_URL, { method: "POST", body: formData });
      }

      if (res.ok) {
        setForm({ id: "", title: "", date: "", description: "", content: "" });
        setFile(null);
        setShowForm(false);
        setIsEditing(false);
        fetchInovasi();
        alert("Berhasil menyimpan data inovasi.");
      } else {
        alert("Gagal menyimpan data.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Inovasi) => {
    setForm({
      id: item.id,
      title: item.title,
      date: item.date,
      description: item.description,
      content: item.content,
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus program inovasi ini?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) fetchInovasi();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">lightbulb</span>
          Daftar Inovasi
        </h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false);
            setForm({ id: "", title: "", date: "", description: "", content: "" });
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-fixed transition-colors flex items-center gap-1"
        >
          {showForm ? "Batal" : <><span className="material-symbols-outlined text-sm">add</span> Tambah Program</>}
        </button>
      </div>

      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Program</label>
              <input required type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: Digitalisasi Layanan" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal</label>
              <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Singkat (Snippet)</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white h-20 resize-none" placeholder="Ringkasan program..."></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Konten / Detail Program</label>
              <textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white h-40 resize-none" placeholder="Penjelasan detail tentang inovasi..."></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Foto / Poster {isEditing && "(Opsional)"}</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full px-4 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-200">
            <button type="submit" disabled={loading} className="bg-primary text-white px-6 py-2 rounded-lg shadow-sm font-medium hover:bg-primary-fixed transition-colors disabled:opacity-50">
              {loading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Program"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-xs font-bold">
            <tr>
              <th className="px-4 py-3 w-16">Foto</th>
              <th className="px-4 py-3">Nama Program</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inovasiList.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-6 text-slate-500">Belum ada program inovasi.</td></tr>
            ) : inovasiList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg overflow-hidden relative border border-slate-300 flex items-center justify-center">
                    {item.imageUrl ? (
                      <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${item.imageUrl}`} alt={item.title} fill className="object-cover" unoptimized />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">image</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                </td>
                <td className="px-4 py-3 font-medium text-slate-600 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-md text-xs font-bold mr-2">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 px-2 py-1 rounded-md text-xs font-bold">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
