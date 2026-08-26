import Link from "next/link";

export const metadata = {
  title: "Website Segera Hadir - Kecamatan Cigedug",
  description: "Website desa sedang dalam tahap pembuatan atau pengembangan.",
};

export default function SegeraHadirPage({
  searchParams,
}: {
  searchParams: { desa?: string };
}) {
  const desaName = searchParams?.desa ? `Desa ${searchParams.desa}` : "Desa";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 bg-surface">
      <div className="max-w-xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-sm">
          <span className="material-symbols-outlined icon-filled text-5xl text-primary">
            construction
          </span>
        </div>
        
        <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1.5 rounded-full mb-6">
          <span className="material-symbols-outlined text-sm">info</span>
          Sedang Dalam Pengembangan
        </span>

        <h1 className="text-display-sm text-on-surface mb-6">
          Website {desaName} Segera Hadir
        </h1>
        
        <p className="text-body-lg text-on-surface-variant leading-relaxed mb-10 max-w-lg mx-auto">
          Mohon maaf, website resmi untuk <strong>{desaName}</strong> saat ini masih dalam tahap pembuatan dan pengembangan. Kami akan segera menghadirkannya untuk Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/desa"
            className="flex items-center justify-center gap-2 bg-primary text-on-primary text-label-md px-6 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity w-full sm:w-auto shadow-md"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Kembali ke Daftar Desa
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-outline-variant text-on-surface-variant text-label-md px-6 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors w-full sm:w-auto bg-white shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">home</span>
            Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
