"use client";

import { useState, useEffect, useRef } from "react";

type Agenda = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
  description: string;
};

const emptyForm = {
  id: "",
  title: "",
  date: "",
  time: "",
  location: "",
  type: "Pemerintahan",
  status: "upcoming",
  description: "",
};

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api/agenda`;

export default function AgendaClient() {
  const [agendaList, setAgendaList] = useState<Agenda[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchAgenda = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAgendaList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchAgenda(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;
    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title, date: form.date, time: form.time,
          location: form.location, type: form.type,
          status: form.status, description: form.description,
        }),
      });
      setForm(emptyForm);
      setShowForm(false);
      setIsEditing(false);
      fetchAgenda();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item: Agenda) => {
    setForm({ ...item });
    setIsEditing(true);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus agenda ini?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchAgenda();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (item: Agenda) => {
    const newStatus = item.status === "upcoming" ? "past" : "upcoming";
    try {
      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, status: newStatus }),
      });
      fetchAgenda();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manajemen Agenda Kegiatan</h2>
        <button
          onClick={() => { setShowForm(!showForm); setIsEditing(false); setForm(emptyForm); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Batal" : "+ Tambah Agenda"}
        </button>
      </div>

      {showForm && (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200"
        >
          <h3 className="md:col-span-2 font-semibold text-slate-700 text-base">
            {isEditing ? "✏️ Edit Agenda" : "➕ Tambah Agenda Baru"}
          </h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Kegiatan *</label>
            <input
              required type="text" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
              placeholder="Contoh: Musyawarah Rencana Pembangunan"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori *</label>
            <select
              required value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
            >
              <option>Pemerintahan</option>
              <option>Kesehatan</option>
              <option>Lingkungan</option>
              <option>Budaya</option>
              <option>Pendidikan</option>
              <option>Ekonomi</option>
              <option>Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal *</label>
            <input
              required type="text" value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
              placeholder="Contoh: 20 Agustus 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Waktu *</label>
            <input
              required type="text" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
              placeholder="Contoh: 08:00 - Selesai"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Lokasi *</label>
            <input
              required type="text" value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
              placeholder="Contoh: Aula Kantor Kecamatan"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white"
            >
              <option value="upcoming">Akan Datang</option>
              <option value="past">Sudah Berlalu</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi *</label>
            <textarea
              required value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white h-24 resize-none"
              placeholder="Isi deskripsi kegiatan..."
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {isEditing ? "Simpan Perubahan" : "Simpan Agenda"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
              <th className="p-4 font-semibold">Kegiatan</th>
              <th className="p-4 font-semibold">Jadwal</th>
              <th className="p-4 font-semibold">Lokasi</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {agendaList.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  Belum ada agenda. Klik &quot;+ Tambah Agenda&quot; untuk menambahkan.
                </td>
              </tr>
            )}
            {agendaList.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                <td className="p-4">
                  <p className="font-bold text-slate-800">{item.title}</p>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{item.type}</span>
                </td>
                <td className="p-4">
                  <p className="text-sm font-medium text-slate-700">{item.date}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </td>
                <td className="p-4 text-sm text-slate-600">{item.location}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleStatus(item)}
                    title="Klik untuk mengubah status"
                    className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors cursor-pointer ${
                      item.status === "upcoming"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {item.status === "upcoming" ? "Akan Datang" : "Sudah Berlalu"}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium">Hapus</button>
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
