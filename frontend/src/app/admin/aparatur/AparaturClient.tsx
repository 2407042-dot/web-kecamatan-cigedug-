"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Aparatur = {
  id: string;
  nama: string;
  jabatan: string;
  nip?: string;
  golongan?: string;
  unit: string;
  icon?: string;
  imageUrl?: string;
};

const API_URL = "http://localhost:5000/api/aparatur";

export default function AparaturClient() {
  const [aparaturList, setAparaturList] = useState<Aparatur[]>([]);
  const [form, setForm] = useState({
    id: "",
    nama: "",
    jabatan: "",
    nip: "",
    golongan: "",
    unit: "Sekretariat",
    icon: "person",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchAparatur = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAparaturList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAparatur();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("jabatan", form.jabatan);
    formData.append("nip", form.nip || "");
    formData.append("golongan", form.golongan || "");
    formData.append("unit", form.unit);
    formData.append("icon", form.icon || "person");
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

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Gagal menyimpan data: ${errorData.error || res.statusText}`);
        return;
      }

      setForm({ id: "", nama: "", jabatan: "", nip: "", golongan: "", unit: "Sekretariat", icon: "person" });
      setFile(null);
      setIsEditing(false);
      setShowForm(false);
      fetchAparatur();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const handleEdit = (item: Aparatur) => {
    setForm({
      id: item.id,
      nama: item.nama,
      jabatan: item.jabatan,
      nip: item.nip || "",
      golongan: item.golongan || "",
      unit: item.unit,
      icon: item.icon || "person",
    });
    setFile(null);
    setIsEditing(true);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data aparatur ini?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchAparatur();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Manajemen Aparatur</h2>
        <button onClick={() => { setShowForm(!showForm); setIsEditing(false); setForm({ id: "", nama: "", jabatan: "", nip: "", golongan: "", unit: "Sekretariat", icon: "person" }) }} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          {showForm ? "Batal Tambah" : "+ Tambah Aparatur"}
        </button>
      </div>
      
      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama</label>
            <input required type="text" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: Budi Santoso, SE" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan</label>
            <input required type="text" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: Kasi Pemerintahan" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">NIP (Opsional)</label>
            <input type="text" value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: 198001012010011001" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Golongan (Opsional)</label>
            <input type="text" value={form.golongan} onChange={e => setForm({...form, golongan: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white" placeholder="Contoh: III/b" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Unit Kerja</label>
            <select required value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white">
              <option value="Pimpinan">Pimpinan</option>
              <option value="Sekretariat">Sekretariat</option>
              <option value="Kasi Pemerintahan">Kasi Pemerintahan</option>
              <option value="Kasi Pelayanan">Kasi Pelayanan</option>
              <option value="Kasi Pemb. Masyarakat Desa">Kasi Pemb. Masyarakat Desa</option>
              <option value="Kasi Kesejahteraan Masyarakat">Kasi Kesejahteraan Masyarakat</option>
              <option value="Kasi Trantibum">Kasi Trantibum</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Foto Profile (Opsional)</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full px-4 py-1.5 rounded-lg border border-slate-300 text-slate-900 bg-white" />
          </div>
          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-sm font-medium hover:bg-blue-700 transition-colors">
              {isEditing ? "Simpan Perubahan" : "Simpan Aparatur"}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/40 bg-surface-container-low text-on-surface-variant text-sm">
              <th className="p-4 font-semibold rounded-tl-xl">Foto</th>
              <th className="p-4 font-semibold">Nama & Jabatan</th>
              <th className="p-4 font-semibold">Unit</th>
              <th className="p-4 font-semibold rounded-tr-xl">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {aparaturList.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant/40 hover:bg-surface-container-lowest">
                <td className="p-4">
                  {item.imageUrl ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image src={`http://localhost:5000${item.imageUrl}`} alt={item.nama} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant">person</span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <p className="font-bold text-on-surface">{item.nama}</p>
                  <p className="text-sm text-on-surface-variant">{item.jabatan}</p>
                </td>
                <td className="p-4"><span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">{item.unit}</span></td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-primary hover:bg-primary/10 rounded-lg">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-error hover:bg-error/10 rounded-lg">Hapus</button>
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
