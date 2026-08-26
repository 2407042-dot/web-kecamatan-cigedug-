import DatasetClient from "./DatasetClient";

export const dynamic = "force-dynamic";

export default async function DatasetPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}/api/dataset`, { cache: 'no-store' });
  const datasets = await res.json().catch(() => []);


  return (
    <div className="p-6 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-headline-md font-bold text-on-surface">Kelola Dataset</h1>
          <p className="text-on-surface-variant mt-2">Upload file CSV/Excel untuk Open Data Desa.</p>
        </div>
      </div>

      <DatasetClient initialData={datasets} />
    </div>
  );
}
