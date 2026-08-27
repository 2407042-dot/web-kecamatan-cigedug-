export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats = { berita: 0, dataset: 0, produk: 0 };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api/stats`, { cache: "no-store" });
    if (res.ok) stats = await res.json();
  } catch { /* backend offline */ }

  const cards = [
    { label: "Total Berita", value: stats.berita, icon: "article", color: "from-blue-600 to-blue-500", glow: "shadow-blue-500/20" },
    { label: "Total Dataset", value: stats.dataset, icon: "dataset", color: "from-emerald-600 to-emerald-500", glow: "shadow-emerald-500/20" },
    { label: "Produk Unggulan", value: stats.produk, icon: "storefront", color: "from-orange-600 to-orange-500", glow: "shadow-orange-500/20" },
  ];

  const quickLinks = [
    { label: "Tambah Berita", icon: "add_circle", href: "/admin/berita", desc: "Buat artikel berita baru" },
    { label: "Upload Dataset", icon: "upload_file", href: "/admin/dataset", desc: "Unggah file data publik" },
    { label: "Tambah Produk", icon: "add_shopping_cart", href: "/admin/produk", desc: "Daftarkan produk unggulan" },
    { label: "Kelola Konten", icon: "edit_note", href: "/admin/konten", desc: "Edit teks semua halaman" },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Selamat datang di Panel Manajemen Konten Kecamatan Cigedug.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-slate-900 border border-white/5 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg ${card.glow} shrink-0`}>
              <span className="material-symbols-outlined text-white text-xl">{card.icon}</span>
            </div>
            <div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{card.label}</p>
              <p className="text-3xl font-black text-white mt-0.5">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group bg-slate-900 border border-white/5 hover:border-blue-500/40 rounded-2xl p-5 transition-all duration-200 hover:bg-slate-800"
            >
              <span className="material-symbols-outlined text-blue-400 group-hover:text-blue-300 text-2xl transition-colors">{link.icon}</span>
              <p className="text-white font-bold text-sm mt-3">{link.label}</p>
              <p className="text-slate-500 text-xs mt-1">{link.desc}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 flex gap-4">
        <span className="material-symbols-outlined text-blue-400 text-xl shrink-0 mt-0.5">info</span>
        <div>
          <p className="text-blue-300 font-semibold text-sm">Cara Menggunakan Panel Admin</p>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed">
            Gunakan menu di sebelah kiri untuk mengelola konten website. Setiap perubahan yang Anda simpan akan langsung tampil di halaman publik secara otomatis — tanpa perlu coding.
          </p>
        </div>
      </div>
    </div>
  );
}
