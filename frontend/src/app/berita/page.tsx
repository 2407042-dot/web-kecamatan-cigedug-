import { getSiteContent } from '@/lib/content';
import { getAllBerita } from '@/lib/berita';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Media Informasi & Berita - Kecamatan Cigedug',
  description: 'Kumpulan berita, informasi, dan inovasi terbaru dari Kecamatan Cigedug.',
};

export const dynamic = 'force-dynamic';

export default async function BeritaPage() {
  const content = getSiteContent();
  const beritaList = await getAllBerita();


  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/kegiatan-2.jpeg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="material-symbols-outlined text-sm">campaign</span>
            Seputar Cigedug
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Media <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Informasi</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Temukan berbagai inovasi, pengumuman, dan berita terkini tentang perkembangan Kecamatan Cigedug untuk pelayanan masyarakat yang lebih baik.
          </p>
        </div>
      </section>

      {/* Main Content / Grid */}
      <section className="relative z-10 max-w-container-max mx-auto px-6 md:px-10 lg:px-16 pb-32 -mt-10">
        {beritaList.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">article</span>
            <h3 className="text-2xl font-semibold text-on-surface mb-2">Belum ada berita</h3>
            <p className="text-on-surface-variant">Saat ini belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaList.map((berita, index) => (
              <Link 
                href={`/berita/${berita.slug}`} 
                key={berita.slug}
                className="group flex flex-col bg-white dark:bg-surface-container-low rounded-3xl border border-outline-variant/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
                  {berita.imageUrl ? (
                    <Image
                      src={berita.imageUrl}
                      alt={berita.title}
                      fill
                      unoptimized // Because it's local API and to avoid Next.js caching issues locally
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <span className="material-symbols-outlined text-5xl text-primary/30">image</span>
                    </div>
                  )}
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-surface-container-highest/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-on-surface shadow-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">calendar_today</span>
                    {berita.date}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-on-surface mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {berita.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {berita.snippet || berita.content.substring(0, 150) + "..."}
                  </p>

                  
                  <div className="mt-auto flex items-center text-primary font-medium text-sm">
                    Baca Selengkapnya
                    <span className="material-symbols-outlined text-base ml-1 group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
