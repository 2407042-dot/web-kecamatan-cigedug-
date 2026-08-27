import { getSiteContent } from '@/lib/content';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galeri Foto - Kecamatan Cigedug',
  description: 'Dokumentasi visual kegiatan dan keindahan alam Kecamatan Cigedug.',
};

// Dummy Data using existing valid Google image URLs from the project
const defaultGaleri = [
  {
    id: 1,
    title: 'Semarak Upacara Peringatan Hari Kemerdekaan RI Tingkat Kecamatan Cigedug',
    category: 'Kegiatan',
    img: '/images/galeri/keg-1.jpg',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 2,
    title: 'Rapat Koordinasi dan Sinergitas Aparatur Pemerintahan se-Kecamatan',
    category: 'Pemerintahan',
    img: '/images/galeri/keg-2.jpg',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 3,
    title: 'Giat Sosialisasi Program Pemberdayaan dan Kesejahteraan Masyarakat',
    category: 'Pemberdayaan',
    img: '/images/galeri/keg-3.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 4,
    title: 'Pelayanan Publik Prima dan Tanggap Keluhan Warga Desa',
    category: 'Pelayanan',
    img: '/images/galeri/keg-4.jpg',
    aspectRatio: 'aspect-video',
  },
  {
    id: 5,
    title: 'Evaluasi Kinerja dan Musyawarah Perencanaan Pembangunan (Musrenbang)',
    category: 'Pemerintahan',
    img: '/images/galeri/keg-5.jpg',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 6,
    title: 'Kunjungan Lapangan dan Pembinaan Langsung oleh Camat Cigedug',
    category: 'Kegiatan',
    img: '/images/galeri/keg-6.jpg',
    aspectRatio: 'aspect-square',
  },
];

const categories = ['Semua', 'Kegiatan', 'Pemerintahan', 'Pelayanan', 'Pemberdayaan'];

type GaleriItem = {
  id: string | number;
  title: string;
  category: string;
  img: string;
  aspectRatio: string;
  description?: string;
};

export const dynamic = 'force-dynamic';

export default async function GaleriPage() {
  const content = getSiteContent();
  let galeriList: GaleriItem[] = defaultGaleri;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api/galeri`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) galeriList = data;
    }
  } catch (error) {}

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/kegiatan-banner.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">photo_library</span>
            Dokumentasi Visual
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Galeri <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-primary">Foto</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Rekam jejak dan potret nyata dedikasi Kecamatan Cigedug dalam memberikan pelayanan prima, merangkul masyarakat, serta melangkah bersama menuju masa depan yang lebih baik.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 max-w-container-max mx-auto px-6 md:px-10 pb-32 -mt-10">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat, i) => (
            <button 
              key={cat}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                i === 0 
                  ? 'bg-primary text-on-primary shadow-md' 
                  : 'bg-surface-container hover:bg-primary/10 text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CSS Column Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galeriList.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative rounded-3xl overflow-hidden break-inside-avoid bg-surface-container shadow-sm hover:shadow-xl transition-all duration-500"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={`relative w-full ${item.aspectRatio}`}>
                <Image
                  src={item.img.startsWith('/uploads') ? `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}${item.img}` : item.img}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="inline-block px-3 py-1 mb-2 text-[10px] uppercase font-bold tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full w-fit border border-white/30">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-bold leading-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white/80 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                )}
              </div>
              
              {/* Hover Enlarge Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                <span className="material-symbols-outlined text-sm">open_in_full</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
