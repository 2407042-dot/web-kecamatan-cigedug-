"use client";

import { useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { deleteBerita, saveBerita } from "./actions";

// Import Quill styles
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill: any = dynamic(() => import("react-quill-new"), { ssr: false });

type Berita = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export default function BeritaClient({ initialData }: { initialData: Berita[] }) {
  const [data, setData] = useState<Berita[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const quillRef = useRef<any>(null);

  const handleOpenForm = (item?: Berita) => {
    if (item) {
      setEditingId(item.id);
      setForm({ title: item.title, content: item.content, imageUrl: item.imageUrl || "" });
    } else {
      setEditingId(null);
      setForm({ title: "", content: "", imageUrl: "" });
    }
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus berita ini?")) {
      await deleteBerita(id);
      setData(data.filter((d) => d.id !== id));
      router.refresh();
    }
  };

  // Custom Image Handler for Quill
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api/upload`, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();

        if (result.success) {
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, "image", result.url);
          }
        } else {
          alert("Gagal mengunggah gambar");
        }
      } catch (e) {
        alert("Gagal mengunggah gambar ke server");
      }
    };
  };

  // Quill Modules Configuration
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api/upload`, {
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
      const saved = await saveBerita(editingId, form);
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
          <span className="material-symbols-outlined">add</span> Tambah Berita
        </button>
      )}

      {isFormOpen && (
        <div className="bg-white dark:bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/30 mb-8">
          <h2 className="text-title-lg font-bold mb-4 text-on-surface">{editingId ? "Edit Berita" : "Tambah Berita"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Judul Berita</label>
              <input
                type="text"
                required
                placeholder="Contoh: Desa Barusuda Raih Juara 1 Lomba Desa Tingkat Kabupaten..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none bg-surface dark:bg-surface-container-highest text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-1 text-on-surface">Gambar Sampul Utama (Opsional)</label>
              <input type="file" accept="image/*" onChange={handleMainFileChange} className="mb-2 block w-full text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {form.imageUrl && <img src={form.imageUrl} alt="Preview" className="h-40 mt-3 rounded-lg object-cover border border-outline-variant/30 shadow-sm" />}
            </div>

            <div className="pb-8">
              <label className="block text-sm font-bold mb-2 flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-sm">edit_document</span> 
                Isi Berita Lengkap
              </label>
              <div className="bg-white dark:bg-surface-container-highest text-black rounded-xl overflow-hidden border border-outline-variant">
                {/* @ts-ignore */}
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={form.content}
                  placeholder="Tuliskan konten lengkap berita, pengumuman, atau artikel di sini. Anda juga bisa menyisipkan gambar/foto di dalam teks..."
                  onChange={(val: string) => setForm({ ...form, content: val })}
                  modules={modules}
                  className="h-96"
                />
              </div>
            </div>
            
            <div className="flex gap-3 pt-6 border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-primary text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {isSaving ? "Menyimpan..." : "Simpan Berita"}
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
              <th className="px-6 py-4">Gambar</th>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-surface-container-lowest">
                <td className="px-6 py-3">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                  ) : (
                    <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-lg">
                      <span className="material-symbols-outlined text-outline">image</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 font-medium max-w-xs truncate">{item.title}</td>
                <td className="px-6 py-3">{new Date(item.createdAt).toLocaleDateString("id-ID")}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenForm(item)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg">
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">Belum ada data berita.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
