"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteFasilitas, saveFasilitas, Fasilitas } from "./actions";

export default function FasilitasClient({ initialData }: { initialData: Fasilitas[] }) {
  const [data, setData] = useState<Fasilitas[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ kategori: "Pendidikan", nama: "", desa: "Cigedug", alamat: "", latitude: "", longitude: "" });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleOpenForm = (item?: Fasilitas) => {
    if (item) {
      setEditingId(item.id);
      setForm({ kategori: item.kategori, nama: item.nama, desa: item.desa, alamat: item.alamat, latitude: item.latitude, longitude: item.longitude });
    } else {
      setEditingId(null);
      setForm({ kategori: "Pendidikan", nama: "", desa: "Cigedug", alamat: "", latitude: "", longitude: "" });
    }
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus fasilitas ini?")) {
      await deleteFasilitas(id);
      setData(data.filter((d) => d.id !== id));
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const saved = await saveFasilitas(editingId, form);
      if (editingId) {
        setData(data.map((d) => (d.id === saved.id ? saved : d)));
      } else {
        setData([saved, ...data]);
      }
      setIsFormOpen(false);
      router.refresh();
    } catch (err) {
      alert("Gagal menyimpan fasilitas");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {!isFormOpen && (
        <button
          onClick={() => handleOpenForm()}
          className="mb-6 bg-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-fixed hover:text-primary transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add_location</span> Tambah Fasilitas
        </button>
      )}

      {isFormOpen && (
        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/30 mb-8">
          <h2 className="text-title-lg font-bold mb-4 text-on-surface">{editingId ? "Edit Fasilitas" : "Tambah Fasilitas"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-on-surface">Kategori</label>
                <select
                  required
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
                >
                  <option value="Pendidikan">Pendidikan (Sekolah/PAUD)</option>
                  <option value="Kesehatan">Kesehatan (Puskesmas/Posyandu)</option>
                  <option value="Pesantren">Pesantren & Masjid</option>
                  <option value="UMKM">UMKM / Ekonomi</option>
                  <option value="Adat & Budaya">Seni & Budaya</option>
                  <option value="Wisata Alam">Wisata & Publik</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-on-surface">Desa</label>
                <select
                  required
                  value={form.desa}
                  onChange={(e) => setForm({ ...form, desa: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
                >
                  <option value="Cigedug">Cigedug</option>
                  <option value="Barusuda">Barusuda</option>
                  <option value="Cintanagara">Cintanagara</option>
                  <option value="Sindangsari">Sindangsari</option>
                  <option value="Sukahurip">Sukahurip</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Nama Fasilitas</label>
              <input
                type="text"
                required
                placeholder="Contoh: SDN 1 Cigedug atau Puskesmas Sukahurip"
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Alamat Lengkap</label>
              <textarea
                required
                rows={2}
                placeholder="Contoh: Kp. Cigedug Tonggoh RT 03/RW 09"
                value={form.alamat}
                onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-on-surface">Latitude (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: -7.312345"
                  value={form.latitude}
                  onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-on-surface">Longitude (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: 107.821345"
                  value={form.longitude}
                  onChange={(e) => setForm({ ...form, longitude: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isSaving ? "Menyimpan..." : "Simpan Fasilitas"}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="bg-surface-container-high text-on-surface px-8 py-2.5 rounded-full font-bold hover:bg-surface-container transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-surface-container-low rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-container text-on-surface-variant uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Nama Fasilitas</th>
              <th className="px-6 py-4">Lokasi</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-lowest">
                <td className="px-6 py-3 font-medium text-primary">{item.kategori}</td>
                <td className="px-6 py-3 font-bold text-on-surface">{item.nama}</td>
                <td className="px-6 py-3">
                  <div className="text-on-surface">{item.desa}</div>
                  <div className="text-xs text-on-surface-variant max-w-[200px] truncate">{item.alamat}</div>
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenForm(item)} className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg font-bold">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg font-bold">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant font-medium">Belum ada data fasilitas yang ditambahkan manual.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
