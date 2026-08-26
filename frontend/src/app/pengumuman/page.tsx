import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pengumuman - Kecamatan Cigedug',
  description: 'Pusat informasi dan pengumuman resmi dari Kecamatan Cigedug.',
};

// Dummy Data (Fallback)
const fallbackPengumuman = [
  {
    id: "1",
    title: 'Pemberitahuan Jadwal Pelayanan Pembuatan e-KTP Keliling',
    date: '15 Agustus 2026',
    category: 'Pelayanan Publik',
    snippet: 'Dalam rangka percepatan perekaman e-KTP, Kecamatan Cigedug akan melaksanakan pelayanan keliling ke 5 desa mulai minggu depan. Warga diimbau menyiapkan dokumen pendukung.',
    isPinned: true,
    fileSize: '1.2 MB',
    fileUrl: null,
  },
  {
    id: "2",
    title: 'Edaran Kewaspadaan Musim Hujan dan Potensi Longsor',
    date: '10 Agustus 2026',
    category: 'Imbauan',
    snippet: 'Mengingat tingginya curah hujan di kawasan Gunung Cikuray, warga diimbau untuk selalu waspada terhadap potensi bencana longsor, terutama di area kemiringan curam.',
    isPinned: true,
    fileSize: '850 KB',
    fileUrl: null,
  },
];

export const dynamic = 'force-dynamic';

export default async function PengumumanPage() {
  let pengumumanList = fallbackPengumuman;
  try {
    const res = await fetch("http://localhost:5000/api/pengumuman", { cache: "no-store" });
    const data = await res.json();
    if (data && data.length > 0) pengumumanList = data;
  } catch (error) {}

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/kegiatan-3.jpeg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            Informasi Resmi
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Papan <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-primary">Pengumuman</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Dapatkan informasi, surat edaran, dan pengumuman resmi terbaru dari Pemerintah Kecamatan Cigedug.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pb-32 -mt-10">
        <div className="flex flex-col gap-6">
          {pengumumanList.map((item, index) => (
            <div 
              key={item.id}
              className={`group flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${
                item.isPinned 
                ? 'bg-primary-fixed/20 border-primary/30 dark:bg-primary-fixed-dim/10' 
                : 'bg-white dark:bg-surface-container-low border-outline-variant/50 hover:border-primary/40'
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {/* Icon / Date block */}
              <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-surface-container-high dark:bg-surface-container-highest text-center">
                <span className={`material-symbols-outlined text-3xl mb-1 ${item.isPinned ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {item.isPinned ? 'push_pin' : 'article'}
                </span>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                  {item.date.split(' ')[0]} {item.date.split(' ')[1].substring(0, 3)}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
                    {item.category}
                  </span>
                  {item.isPinned && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary text-on-primary animate-pulse">
                      Penting
                    </span>
                  )}
                  <span className="text-sm text-on-surface-variant ml-auto hidden md:block">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
                  {item.snippet}
                </p>
                <div className="mt-auto flex flex-wrap gap-4">
                  {item.fileUrl && (
                    <a href={`http://localhost:5000${item.fileUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary-container font-semibold text-sm bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-base">download</span>
                      Unduh Lampiran {item.fileSize ? `(${item.fileSize})` : ""}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary/10 text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-bold shadow-md">
            1
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary/10 text-on-surface-variant font-bold transition-colors">
            2
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary/10 text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
}
