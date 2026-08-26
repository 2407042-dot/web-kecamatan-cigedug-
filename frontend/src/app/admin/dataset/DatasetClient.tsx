"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteDataset, saveDataset } from "./actions";
type Dataset = {
  id: string;
  title: string;
  description: string;
  fileCsv: string;
  sizeCsv: string;
  filePdf: string;
  sizePdf: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function DatasetClient({ initialData }: { initialData: Dataset[] }) {
  const [data, setData] = useState<Dataset[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", category: "Kependudukan", fileCsv: "", sizeCsv: "", filePdf: "", sizePdf: "" });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleOpenForm = (item?: Dataset) => {
    if (item) {
      setEditingId(item.id);
      setForm({ title: item.title, description: item.description, category: item.category, fileCsv: item.fileCsv || "", sizeCsv: item.sizeCsv || "", filePdf: item.filePdf || "", sizePdf: item.sizePdf || "" });
    } else {
      setEditingId(null);
      setForm({ title: "", description: "", category: "Kependudukan", fileCsv: "", sizeCsv: "", filePdf: "", sizePdf: "" });
    }
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus dataset ini?")) {
      await deleteDataset(id);
      setData(data.filter((d) => d.id !== id));
      router.refresh();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'csv' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}/api/upload`, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    if (result.success) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      if (type === 'csv') {
        setForm({ ...form, fileCsv: result.url, sizeCsv: sizeMB });
      } else {
        setForm({ ...form, filePdf: result.url, sizePdf: sizeMB });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const saved = await saveDataset(editingId, form);
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
          <span className="material-symbols-outlined">upload_file</span> Tambah Dataset
        </button>
      )}

      {isFormOpen && (
        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/30 mb-8">
          <h2 className="text-title-lg font-bold mb-4 text-on-surface">{editingId ? "Edit Dataset" : "Upload Dataset Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Judul Dataset</label>
              <input
                type="text"
                required
                placeholder="Contoh: Data Kependudukan Desa Sukahurip 2024"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Deskripsi Singkat</label>
              <textarea
                required
                rows={2}
                placeholder="Jelaskan isi data secara singkat"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Kategori</label>
              <input
                type="text"
                required
                placeholder="Kependudukan, Kesehatan, dll"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-outline-variant/50 rounded-xl bg-blue-50/30">
                <label className="block text-sm font-bold mb-2 text-blue-800">Unggah File CSV / Excel</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'csv')} accept=".csv,.xlsx,.xls" className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
                {form.fileCsv && <div className="text-xs text-blue-700 font-bold mt-2 truncate">✓ {form.fileCsv.split('/').pop()} ({form.sizeCsv})</div>}
              </div>
              <div className="p-4 border border-outline-variant/50 rounded-xl bg-rose-50/30">
                <label className="block text-sm font-bold mb-2 text-rose-800">Unggah File PDF / Lainnya</label>
                <input type="file" onChange={(e) => handleFileChange(e, 'pdf')} accept=".pdf" className="block w-full text-xs text-on-surface-variant file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200" />
                {form.filePdf && <div className="text-xs text-rose-700 font-bold mt-2 truncate">✓ {form.filePdf.split('/').pop()} ({form.sizePdf})</div>}
              </div>
            </div>
            <div className="flex gap-3 pt-6 border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isSaving || (!form.fileCsv && !form.filePdf)}
                className="bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {isSaving ? "Menyimpan..." : "Simpan Dataset"}
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
              <th className="px-6 py-4">Judul Dataset</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">File Tersedia</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-lowest">
                <td className="px-6 py-3 font-medium">
                  {item.title}
                </td>
                <td className="px-6 py-3">{item.category}</td>
                <td className="px-6 py-3">
                  <div className="flex flex-col gap-1">
                    {item.fileCsv && <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold w-fit">CSV/XLSX ({item.sizeCsv})</span>}
                    {item.filePdf && <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold w-fit">PDF ({item.sizePdf})</span>}
                  </div>
                </td>
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
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">Belum ada dataset.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
