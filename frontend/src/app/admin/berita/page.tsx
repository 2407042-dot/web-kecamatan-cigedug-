import BeritaClient from "./BeritaClient";

export const dynamic = "force-dynamic";

export default async function BeritaPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}/api/berita`, { cache: 'no-store' });
  const berita = await res.json().catch(() => []);


  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">Kelola Berita</h1>
          <p className="text-on-surface-variant mt-2">Daftar artikel berita dan pengumuman.</p>
        </div>
      </div>

      <BeritaClient initialData={berita} />
    </div>
  );
}
