import Link from "next/link";
import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Dataset - Portal Satu Data Cigedug",
};

export const dynamic = "force-dynamic";

type Dataset = {
  id: string;
  title: string;
  description: string;
  fileCsv: string;
  sizeCsv: string;
  filePdf: string;
  sizePdf: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export default async function DatasetPage() {
  const res = await fetch("http://localhost:5000/api/dataset", { cache: "no-store" }).catch(() => null);
  let datasets: Dataset[] = [];
  if (res && res.ok) {
    const json = await res.json().catch(() => null);
    if (Array.isArray(json)) {
      datasets = json;
    }
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-slate-700 to-gray-900 text-white px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/data" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Kembali ke Portal Data
          </Link>
          <h1 className="text-4xl font-extrabold mb-3">Katalog Dataset</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            File dataset terbuka (CSV, XLSX, PDF) yang dapat diunduh untuk keperluan riset, akademik, dan transparansi publik.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-10 py-14">
        {datasets.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-6xl mb-4 block">folder_open</span>
            <h3 className="text-xl font-bold">Belum Ada Dataset</h3>
            <p className="mt-2 text-sm">Dataset dapat ditambahkan melalui halaman Admin.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((ds) => (
              <div key={ds.id} className="group bg-white dark:bg-surface-container-low border border-outline-variant/40 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">{ds.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{ds.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed flex-1">{ds.description}</p>
                  <div className="flex items-center gap-4 mt-5 pt-4 border-t border-outline-variant/30 text-xs text-on-surface-variant">
                    <span>Diperbarui: {new Date(ds.updatedAt).toLocaleDateString("id-ID")}</span>
                  </div>
                </div>
                <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-3">
                  {ds.fileCsv && (
                    <a href={ds.fileCsv} download target="_blank"
                      className="flex-1 flex flex-col items-center justify-center gap-1 bg-blue-50 text-blue-700 py-2.5 px-2 rounded-xl font-bold hover:bg-blue-100 transition-colors text-xs text-center border border-blue-200">
                      <span className="material-symbols-outlined text-base">table</span>
                      Unduh CSV/XLSX
                      <span className="text-[10px] opacity-70 font-normal">({ds.sizeCsv})</span>
                    </a>
                  )}
                  {ds.filePdf && (
                    <a href={ds.filePdf} download target="_blank"
                      className="flex-1 flex flex-col items-center justify-center gap-1 bg-rose-50 text-rose-700 py-2.5 px-2 rounded-xl font-bold hover:bg-rose-100 transition-colors text-xs text-center border border-rose-200">
                      <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                      Unduh PDF/Lainnya
                      <span className="text-[10px] opacity-70 font-normal">({ds.sizePdf})</span>
                    </a>
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
