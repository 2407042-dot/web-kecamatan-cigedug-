import { getSiteContent } from '@/lib/content';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Potensi Daerah - Kecamatan Cigedug',
  description: 'Mengenal lebih dekat potensi sumber daya alam, pertanian, pariwisata, dan ekonomi kreatif di Kecamatan Cigedug.',
};

export const dynamic = 'force-dynamic';

type Produk = {
  id: string;
  name: string;
  description: string;
  contact: string | null;
  price: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default async function PotensiPage() {
  const content = getSiteContent();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}/api/produk`, { cache: 'no-store' });
  const potensiListDb: Produk[] = await res.json().catch(() => []);


  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/kegiatan-4.jpeg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            Kekayaan Daerah
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Potensi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Daerah</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Menjelajahi keunggulan sumber daya alam, keindahan pariwisata, dan semangat kewirausahaan masyarakat di Kecamatan Cigedug.
          </p>
        </div>
      </section>

      {/* Main Content - Alternating Cards */}
      <section className="relative z-10 max-w-container-max mx-auto px-6 md:px-10 lg:px-16 pb-32 -mt-10">
        <div className="flex flex-col gap-16 md:gap-24">
          {potensiListDb.map((potensi, index) => {
            const isEven = index % 2 === 1;
            
            return (
              <div 
                key={potensi.id}
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 lg:gap-16 items-center`}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-tertiary rounded-[3rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container">
                    {potensi.imageUrl ? (
                      <Image
                        src={potensi.imageUrl}
                        alt={potensi.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-outline">image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">storefront</span>
                    </div>
                    <span className="text-label-md text-primary font-bold tracking-widest uppercase">0{index + 1}</span>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-6 leading-tight">
                    {potensi.name}
                  </h2>
                  
                  <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                    {potensi.description}
                  </p>
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {potensi.price && (
                      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-4">
                        <p className="text-sm text-on-surface-variant mb-1">Kisaran Harga</p>
                        <p className="text-xl font-bold text-on-surface">{potensi.price}</p>
                      </div>
                    )}
                    {potensi.contact && (
                      <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-4">
                        <p className="text-sm text-on-surface-variant mb-1">Kontak / WA</p>
                        <p className="text-xl font-bold text-on-surface">{potensi.contact}</p>
                      </div>
                    )}
                  </div>
                  
                  {potensi.contact && (
                    <div>
                      <a href={`https://wa.me/${potensi.contact.replace(/\D/g,'')}`} target="_blank" className="inline-flex items-center gap-2 text-primary font-bold group">
                        Pesan Sekarang
                        <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {potensiListDb.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline mb-4">inventory_2</span>
              <h3 className="text-2xl font-bold">Belum Ada Data Produk</h3>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-24 border-t border-outline-variant/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-on-surface mb-4">Mari Bangun Cigedug Bersama</h2>
          <p className="text-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Kami terbuka untuk kolaborasi, investasi, dan program kemitraan dalam rangka mengembangkan potensi daerah yang berdampak pada kesejahteraan masyarakat.
          </p>
          <Link href="/pelayanan/pengaduan" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-bold px-8 py-4 rounded-full transition-colors shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined">handshake</span>
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
  );
}
