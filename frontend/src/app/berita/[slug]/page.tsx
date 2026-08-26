import { getBeritaBySlug, getAllBerita } from '@/lib/berita';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


// Generate static params for all berita at build time
export async function generateStaticParams() {
  const beritaList = await getAllBerita();
  return beritaList.map((berita) => ({
    slug: berita.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const berita = await getBeritaBySlug(resolvedParams.slug);
  
  if (!berita) {
    return {
      title: 'Berita Tidak Ditemukan - Kecamatan Cigedug',
    };
  }

  return {
    title: `${berita.title} - Kecamatan Cigedug`,
    description: berita.snippet,
  };
}

export default async function BeritaDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const berita = await getBeritaBySlug(resolvedParams.slug);

  if (!berita) {
    notFound();
  }



  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest pb-24">
      {/* Cover Image Header */}
      <div className="relative w-full h-[45vh] min-h-[400px] bg-surface-container">
        {berita.imageUrl ? (
          <Image
            src={berita.imageUrl}
            alt={berita.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary/40">newspaper</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
        
        {/* Navigation & Title Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto w-full px-6 md:px-10 pb-12">
            <Link 
              href="/berita"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-semibold text-sm mb-6 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Kembali ke Berita
            </Link>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm font-semibold mb-4">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              {berita.date}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight text-balance">
              {berita.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-10 mt-8">
        <article 
          className="bg-white dark:bg-surface-container-low rounded-3xl p-8 md:p-12 shadow-sm border border-outline-variant/30 [&>p]:text-lg [&>p]:text-on-surface-variant [&>p]:leading-relaxed [&>p]:mb-6 [&>h1]:text-4xl [&>h1]:font-extrabold [&>h1]:mt-10 [&>h1]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:mb-6 [&>ul]:ml-4 [&>ol]:list-decimal [&>ol]:list-inside [&>ol]:mb-6 [&>ol]:ml-4 [&>img]:rounded-xl [&>img]:my-6 [&>img]:w-full [&>img]:object-cover"
          dangerouslySetInnerHTML={{ __html: berita.content }}
        />

        {/* Share / Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-outline-variant/30">
          <p className="text-on-surface-variant font-medium">Bagikan informasi ini:</p>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-sm">link</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-[#1877F2] hover:text-white text-on-surface-variant flex items-center justify-center transition-colors">
              <span className="font-bold text-sm">f</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-[#25D366] hover:text-white text-on-surface-variant flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-sm">forum</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
