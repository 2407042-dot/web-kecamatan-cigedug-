"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Redirect ke halaman asal jika ada, atau ke dashboard
        const from = searchParams.get("from") || "/admin";
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Username atau password salah");
      }
    } catch {
      setError("Tidak dapat menghubungi server. Pastikan server berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">location_city</span>
          </div>
          <div>
            <p className="text-blue-300 text-xs uppercase tracking-widest font-semibold">Pemerintah Kab. Garut</p>
            <p className="text-white font-bold text-sm">Kecamatan Cigedug</p>
          </div>
        </div>

        {/* Main copy */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Sistem Manajemen Konten
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
            Panel Admin<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Web Cigedug
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
            Kelola konten website Kecamatan Cigedug dengan mudah — tambah berita, dataset, dan produk unggulan tanpa coding.
          </p>

          {/* Feature list */}
          <div className="space-y-3 pt-4">
            {[
              { icon: "article", text: "Manajemen Berita & Informasi" },
              { icon: "dataset", text: "Pengelolaan Open Data" },
              { icon: "storefront", text: "Katalog Produk Unggulan" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-blue-400 text-base">{item.icon}</span>
                </div>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-slate-600 text-xs">
          © 2025 Kecamatan Cigedug · Kabupaten Garut · Jawa Barat
        </p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">location_city</span>
              </div>
              <p className="text-white font-bold text-sm">Kecamatan Cigedug</p>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5">
                <span className="material-symbols-outlined text-white text-2xl">admin_panel_settings</span>
              </div>
              <h2 className="text-2xl font-black text-white">Masuk ke Dashboard</h2>
              <p className="text-slate-400 text-sm mt-1">Masukkan kredensial admin Anda untuk melanjutkan</p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl text-sm mb-6 flex items-start gap-3">
                <span className="material-symbols-outlined text-lg shrink-0 mt-0.5">error</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Masukkan username..."
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-lg">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl pl-11 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Masukkan password..."
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">login</span>
                    Masuk ke Dashboard
                  </>
                )}
              </button>
            </form>

            {/* Info */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
              <p className="text-xs text-slate-400 flex items-start gap-2">
                <span className="material-symbols-outlined text-blue-400 text-sm shrink-0 mt-0.5">info</span>
                Halaman ini hanya untuk administrator yang berwenang. Akses tidak sah akan dicatat dan dilaporkan.
              </p>
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs mt-6">
            © 2025 Kecamatan Cigedug · Semua hak dilindungi
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white">Memuat...</div></div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
