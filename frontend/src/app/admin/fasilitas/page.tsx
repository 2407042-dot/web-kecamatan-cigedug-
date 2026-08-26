import FasilitasClient from "./FasilitasClient";
import { getFasilitas } from "./actions";

export const dynamic = 'force-dynamic';

export default async function FasilitasPage() {
  const data = await getFasilitas();

  return (
    <div className="min-h-screen p-8 bg-surface-container-lowest">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-headline-md font-bold text-on-surface">Kelola Fasilitas / Potensi (Map)</h1>
          <p className="text-body-md text-on-surface-variant mt-2">
            Tambah atau perbarui titik lokasi seperti Sekolah, Puskesmas, Masjid, dan UMKM untuk ditampilkan di Peta Infografis.
          </p>
        </div>

        <FasilitasClient initialData={data} />
      </div>
    </div>
  );
}
