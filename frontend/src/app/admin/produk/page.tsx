import ProdukClient from "./ProdukClient";

export const dynamic = "force-dynamic";

export default async function ProdukPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api/produk`, { cache: 'no-store' });
  const produk = await res.json().catch(() => []);


  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">Kelola Produk Unggulan</h1>
          <p className="text-on-surface-variant mt-2">Daftar potensi ekonomi dan produk unggulan desa.</p>
        </div>
      </div>

      <ProdukClient initialData={produk} />
    </div>
  );
}
