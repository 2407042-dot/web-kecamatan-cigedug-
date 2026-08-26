"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PengaturanClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "admin", // Assuming admin is default for now
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Kata sandi baru minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/auth/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengubah kata sandi");
      }

      setMessage("Kata sandi berhasil diubah! Silakan login kembali dengan kata sandi baru.");
      setForm({ ...form, oldPassword: "", newPassword: "", confirmPassword: "" });
      
      // Auto logout after 3 seconds
      setTimeout(() => {
        router.push("/admin/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">lock_reset</span>
        Ubah Kata Sandi
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-center gap-2">
          <span className="material-symbols-outlined">error</span>
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {message && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Username Admin</label>
          <input
            type="text"
            value={form.username}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-500 cursor-not-allowed"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Kata Sandi Lama</label>
          <input
            type="password"
            required
            value={form.oldPassword}
            onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-primary"
            placeholder="Masukkan kata sandi saat ini"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Kata Sandi Baru</label>
          <input
            type="password"
            required
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-primary"
            placeholder="Minimal 6 karakter"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Konfirmasi Kata Sandi Baru</label>
          <input
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white focus:ring-2 focus:ring-primary"
            placeholder="Ketik ulang kata sandi baru"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white px-6 py-2.5 rounded-lg shadow-sm font-bold hover:bg-primary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
          </button>
        </div>
      </form>
    </div>
  );
}
