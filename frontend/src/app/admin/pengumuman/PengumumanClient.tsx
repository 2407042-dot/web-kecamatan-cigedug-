"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Pengumuman = {
  id: string;
  title: string;
  date: string;
  category: string;
  snippet: string;
  isPinned: boolean;
  fileUrl?: string;
  fileSize?: string;
};

const API_URL = "http://localhost:5000/api/pengumuman";

export default function PengumumanClient() {
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    date: "",
    category: "Pelayanan Publik",
    snippet: "",
    isPinned: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchPengumuman = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPengumumanList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPengumuman();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("date", form.date);
    formData.append("category", form.category);
    formData.append("snippet", form.snippet);
    formData.append("isPinned", form.isPinned ? "true" : "false");
    if (file) formData.append("file", file);

    try {
      if (isEditing) {
        await fetch(`${API_URL}/${form.id}`, { method: "PUT", body: formData });
      } else {
        await fetch(API_URL, { method: "POST", body: formData });
      }
      setForm({ id: "", title: "", date: "", category: "Pelayanan Publik", snippet: "", isPinned: false });
      setFile(null);
      setShowForm(false);
      setIsEditing(false);
      fetchPengumuman();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Pengumuman) => {
    setForm({
      id: item.id,
      title: item.title,
      date: item.date,
      category: item.category,
      snippet: item.snippet,
      isPinned: item.isPinned,
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchPengumuman();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manajemen Pengumuman</h2>
        <button onClick={() => { setShowForm(!showForm); setIsEditing(false); setForm({ id: "", title: "", date: "", category: "Pelayanan Publik", snippet: "", isPinned: false }); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {showForm ? "Batal Tambah" : "+ Tambah Pengumuman"}
        </button>
      </div>

      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Pengumuman</label>
            <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: Jadwal Pelayanan e-KTP" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
            <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white">
              <option value="Pelayanan Publik">Pelayanan Publik</option>
              <option value="Imbauan">Imbauan</option>
              <option value="Kepegawaian">Kepegawaian</option>
              <option value="Ekonomi">Ekonomi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal</label>
            <input required type="text" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: 15 Agustus 2026" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Lampiran File (PDF/Doc) {isEditing && "(Opsional)"}</label>
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full px-4 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Ringkasan (Snippet)</label>
            <textarea required value={form.snippet} onChange={e => setForm({...form, snippet: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white h-24 resize-none" placeholder="Isi ringkasan pengumuman..."></textarea>
          </div>
          <div className="md:col-span-2 flex items-center">
            <input type="checkbox" id="isPinned" checked={form.isPinned} onChange={e => setForm({...form, isPinned: e.target.checked})} className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
            <label htmlFor="isPinned" className="ml-2 text-sm font-medium text-slate-700">Tandai sebagai Pengumuman Penting (Pinned)</label>
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm font-medium hover:bg-blue-700 transition-colors">
              {isEditing ? "Simpan Perubahan" : "Simpan Pengumuman"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-sm">
              <th className="p-4 font-semibold rounded-tl-xl">Pengumuman</th>
              <th className="p-4 font-semibold">Kategori</th>
              <th className="p-4 font-semibold">Lampiran</th>
              <th className="p-4 font-semibold rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pengumumanList.map((item) => (
              <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {item.isPinned && <span className="material-symbols-outlined text-blue-500 text-sm">push_pin</span>}
                    <p className="font-bold text-slate-800">{item.title}</p>
                  </div>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </td>
                <td className="p-4"><span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{item.category}</span></td>
                <td className="p-4">
                  {item.fileUrl ? (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">attach_file</span> {item.fileSize}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">-</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-sm">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
