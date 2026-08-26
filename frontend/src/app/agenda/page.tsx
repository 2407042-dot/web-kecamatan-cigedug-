import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda Kegiatan - Kecamatan Cigedug',
  description: 'Jadwal dan agenda kegiatan mendatang di Kecamatan Cigedug.',
};

type AgendaItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: string;
  description: string;
};

export const dynamic = 'force-dynamic';

export default async function AgendaPage() {
  let agendaList: AgendaItem[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/agenda`, { cache: 'no-store' });
    const data = await res.json();
    if (Array.isArray(data)) agendaList = data;
  } catch (error) {}

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/kegiatan-1.jpeg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">event</span>
            Jadwal & Kegiatan
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Agenda <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Kecamatan</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Pantau berbagai kegiatan, rapat, dan acara kemasyarakatan yang akan diselenggarakan di wilayah Kecamatan Cigedug.
          </p>
        </div>
      </section>

      {/* Main Content - Timeline Layout */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pb-32 -mt-10">
        <div className="relative border-l-2 border-outline-variant/50 ml-4 md:ml-10 space-y-12">
          
          {agendaList.map((agenda, index) => (
            <div key={agenda.id} className="relative pl-8 md:pl-12 group" style={{ animationDelay: `${0.1 * index}s` }}>
              {/* Timeline dot */}
              <div className={`absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 border-surface ${
                agenda.status === 'upcoming' 
                  ? 'bg-secondary group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(var(--secondary-rgb),0.5)]' 
                  : 'bg-outline-variant'
              }`}></div>
              
              {/* Card */}
              <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
                agenda.status === 'upcoming'
                  ? 'bg-white dark:bg-surface-container-low border-outline-variant/50 hover:shadow-xl hover:border-secondary/40 hover:-translate-y-1'
                  : 'bg-surface-container-low/50 dark:bg-surface-container-highest/30 border-outline-variant/30 opacity-75'
              }`}>
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Date Badge */}
                  <div className="shrink-0 flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-secondary/10 dark:bg-secondary/5 text-center border border-secondary/20">
                    <span className={`text-2xl md:text-3xl font-extrabold ${agenda.status === 'upcoming' ? 'text-secondary' : 'text-on-surface-variant'}`}>
                      {agenda.date.split(' ')[0]}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase font-bold text-on-surface-variant tracking-wider mt-1">
                      {agenda.date.split(' ')[1]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]">category</span>
                        {agenda.type}
                      </span>
                      {agenda.status === 'upcoming' && (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                          Akan Datang
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`text-xl md:text-2xl font-bold mb-3 ${agenda.status === 'upcoming' ? 'text-on-surface group-hover:text-secondary' : 'text-on-surface-variant'} transition-colors`}>
                      {agenda.title}
                    </h3>
                    
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span>{agenda.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        <span>{agenda.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {agenda.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {agendaList.length === 0 && (
            <div className="py-20 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 block">event_busy</span>
              <h3 className="text-xl font-bold">Belum Ada Agenda</h3>
              <p className="text-sm mt-2">Agenda kegiatan akan muncul setelah ditambahkan melalui halaman admin.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
