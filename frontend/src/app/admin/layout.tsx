"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: "dashboard", path: "/admin" },
  { name: "Kelola Berita", icon: "article", path: "/admin/berita" },
  { name: "Kelola Pengumuman", icon: "campaign", path: "/admin/pengumuman" },
  { name: "Kelola Agenda", icon: "event", path: "/admin/agenda" },
  { name: "Kelola Galeri", icon: "photo_library", path: "/admin/galeri" },
  { name: "Potensi Daerah", icon: "storefront", path: "/admin/produk" },
  { name: "Penghargaan", icon: "emoji_events", path: "/admin/penghargaan" },
  { name: "Kelola Dataset", icon: "dataset", path: "/admin/dataset" },
  { name: "Kelola Fasilitas", icon: "location_on", path: "/admin/fasilitas" },
  { name: "Kelola Konten", icon: "edit_note", path: "/admin/konten" },
  { name: "Media Halaman", icon: "perm_media", path: "/admin/media" },
  { name: "Program Inovasi", icon: "lightbulb", path: "/admin/inovasi" },
  { name: "Aspirasi Masuk", icon: "record_voice_over", path: "/admin/pengaduan" },
  { name: "Kelola Aparatur", icon: "badge", path: "/admin/aparatur" },
  { name: "Pengaturan Admin", icon: "settings", path: "/admin/pengaturan" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 z-30 flex flex-col
        bg-slate-900 border-r border-white/5
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="material-symbols-outlined text-white text-base">admin_panel_settings</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Cigedug Admin</p>
              <p className="text-slate-500 text-[10px]">Panel Manajemen Konten</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold px-3 pb-2 pt-1">Menu Utama</p>
          {menuItems.map((item) => {
            const isActive =
              item.path === "/admin"
                ? pathname === "/admin"
                : pathname === item.path || pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium
                  ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? "text-white" : "text-slate-500"}`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm font-medium w-full mb-1"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-500">open_in_new</span>
            Lihat Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-sm font-medium w-full"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 h-14 bg-slate-950/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-4">
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            <span className="material-symbols-outlined text-blue-400 text-sm">admin_panel_settings</span>
            <span className="text-slate-300 text-xs font-medium">Admin Cigedug</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
