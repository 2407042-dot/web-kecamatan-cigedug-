"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduk, saveProduk } from "./actions";
type ProdukUnggulan = {
  id: string;
  name: string;
  description: string;
  contact: string | null;
  price: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProdukClient({ initialData }: { initialData: ProdukUnggulan[] }) {
  const [data, setData] = useState<ProdukUnggulan[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", contact: "", price: "", imageUrl: "" });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleOpenForm = (item?: ProdukUnggulan) => {
    if (item) {
      setEditingId(item.id);
      setForm({ name: item.name, description: item.description, contact: item.contact || "", price: item.price || "", imageUrl: item.imageUrl || "" });
    } else {
      setEditingId(null);
      setForm({ name: "", description: "", contact: "", price: "", imageUrl: "" });
    }
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await deleteProduk(id);
      setData(data.filter((d) => d.id !== id));
      router.refresh();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/upload`, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (result.success) {
      setForm({ ...form, imageUrl: result.url });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const saved = await saveProduk(editingId, form);
      if (editingId) {
        setData(data.map((d) => (d.id === saved.id ? saved : d)));
      } else {
        setData([saved, ...data]);
      }
      setIsFormOpen(false);
      router.refresh();
    } catch (err) {
      alert("Gagal menyimpan");
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
          <span className="material-symbols-outlined">add</span> Tambah Produk
        </button>
      )}

      {isFormOpen && (
        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/30 mb-8">
          <h2 className="text-title-lg font-bold mb-4 text-on-surface">{editingId ? "Edit Produk" : "Tambah Produk"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Nama Produk / Potensi</label>
              <input
                type="text"
                required
                placeholder="Contoh: Kopi Arabika Khas Cigedug"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Deskripsi Produk</label>
              <textarea
                required
                rows={3}
                placeholder="Jelaskan secara detail keunggulan, bahan baku, rasa, atau cara pembuatan produk ini..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-on-surface">Harga (Opsional)</label>
                <input
                  type="text"
                  value={form.price}
                  placeholder="Rp 50.000 / bungkus"
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-on-surface">Kontak / WA (Opsional)</label>
                <input
                  type="text"
                  value={form.contact}
                  placeholder="08123456789"
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Foto Produk Unggulan</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="h-40 mt-3 rounded-lg object-cover border border-outline-variant/30 shadow-sm" />}
            </div>
            <div className="flex gap-3 pt-6 border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {isSaving ? "Menyimpan..." : "Simpan Produk"}
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
              <th className="px-6 py-4">Foto</th>
              <th className="px-6 py-4">Nama Produk</th>
              <th className="px-6 py-4">Harga</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-lowest">
                <td className="px-6 py-3">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-lg">
                      <span className="material-symbols-outlined text-outline">image</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 font-medium">
                  {item.name}
                  <div className="text-xs text-on-surface-variant font-normal max-w-xs truncate">{item.description}</div>
                </td>
                <td className="px-6 py-3">{item.price || "-"}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenForm(item)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">Belum ada data produk.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
