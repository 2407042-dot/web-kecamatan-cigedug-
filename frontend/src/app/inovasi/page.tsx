import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Program Inovasi - Kecamatan Cigedug",
  description: "Daftar program inovasi dan unggulan dari Kecamatan Cigedug.",
};

export const dynamic = 'force-dynamic';

export default async function InovasiPage() {
  let inovasiList: any[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}/api/inovasi`, { cache: "no-store" });
    if (res.ok) {
      inovasiList = await res.json();
    }
  } catch (err) {
    console.error("Gagal mengambil data inovasi", err);
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold tracking-widest uppercase mb-6 border border-white/20">
            <span className="material-symbols-outlined text-sm">lightbulb</span>
            Kecamatan Cigedug
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Program Inovasi</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Mewujudkan kemajuan melalui berbagai terobosan, program unggulan, dan inisiatif baru demi peningkatan kesejahteraan masyarakat dan kualitas pelayanan publik.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        {inovasiList.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-6xl text-primary/40 mb-4 block">construction</span>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Belum Ada Program Inovasi</h2>
            <p className="text-on-surface-variant max-w-md mx-auto">
              Saat ini data program inovasi belum ditambahkan oleh administrator. Silakan cek kembali nanti untuk informasi terbaru.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inovasiList.map((inovasi) => (
              <div key={inovasi.id} className="group bg-white dark:bg-surface-container-low rounded-3xl border border-outline-variant/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video bg-surface-container overflow-hidden shrink-0">
                  {inovasi.imageUrl ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}${inovasi.imageUrl}`}
                      alt={inovasi.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary/5">
                      <span className="material-symbols-outlined text-4xl text-primary/30">lightbulb</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {inovasi.date}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    {inovasi.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">
                    {inovasi.description}
                  </p>
                  
                  {/* Detailed Content in a styled block if it exists */}
                  {inovasi.content && (
                    <div className="mt-auto bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 text-sm text-on-surface-variant">
                      {inovasi.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
