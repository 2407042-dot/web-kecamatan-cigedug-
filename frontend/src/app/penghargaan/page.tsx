import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Penghargaan - Kecamatan Cigedug',
  description: 'Daftar prestasi dan penghargaan yang diraih oleh Pemerintah Kecamatan Cigedug.',
};

type PenghargaanItem = {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  imageUrl?: string | null;
  color: string;
};

export const dynamic = 'force-dynamic';

export default async function PenghargaanPage() {
  let penghargaanList: PenghargaanItem[] = [];
  try {
    const res = await fetch('http://localhost:5000/api/penghargaan', { cache: 'no-store' });
    const data = await res.json();
    if (Array.isArray(data)) penghargaanList = data;
  } catch (error) {}

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/penghargaan.jpeg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">emoji_events</span>
            Prestasi & Apresiasi
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Penghargaan</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Dedikasi dan kerja keras seluruh elemen masyarakat serta aparatur Kecamatan Cigedug yang membuahkan berbagai prestasi gemilang.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pb-32 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {penghargaanList.map((item, index) => (
            <div 
              key={item.id}
              className="group relative bg-white dark:bg-surface-container-low rounded-3xl p-6 border border-outline-variant/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Decorative gradient blob */}
              <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${item.color} rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
              
              {/* Image Section */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 shadow-md border border-outline-variant/20 bg-surface-container">
                {item.imageUrl ? (
                  <Image
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-60 flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-white text-5xl">emoji_events</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-surface-container-highest/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-on-surface shadow-sm">
                  {item.year}
                </div>
              </div>
              
              <div className="relative z-10 px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block">
                  {item.category}
                </span>
                
                <h3 className="text-2xl font-bold text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          {penghargaanList.length === 0 && (
            <div className="col-span-2 py-20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 block">emoji_events</span>
              <h3 className="text-xl font-bold">Belum Ada Data Penghargaan</h3>
              <p className="text-sm mt-2">Data akan muncul setelah ditambahkan melalui halaman admin.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
