"use client";

import { useState, useEffect, FormEvent } from 'react';

// Simple profanity list (Indonesian) - for demonstration
const BAD_WORDS = ['bodoh', 'anjing', 'babi', 'bangsat', 'goblok', 'tolol', 'kampret', 'sialan'];

function censorText(text: string): string {
  let censoredText = text;
  BAD_WORDS.forEach((word) => {
    // Case insensitive regex replacing the word with asterisks
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    censoredText = censoredText.replace(regex, '*'.repeat(word.length));
  });
  return censoredText;
}

export default function PengaduanPage() {
  const [judul, setJudul] = useState('');
  const [pesan, setPesan] = useState('');
  
  // Rate limiting states
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [reportsCount, setReportsCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState('');
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{judul: string, pesan: string} | null>(null);

  // Check rate limits on load
  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = () => {
    const historyJson = localStorage.getItem('aspirasi_history');
    if (historyJson) {
      try {
        const history: number[] = JSON.parse(historyJson);
        const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        
        // Filter only reports from the last 7 days
        const recentReports = history.filter((timestamp) => timestamp > oneWeekAgo);
        
        // Update local storage to clean up old timestamps
        localStorage.setItem('aspirasi_history', JSON.stringify(recentReports));
        setReportsCount(recentReports.length);
        
        if (recentReports.length >= 3) {
          setIsLimitReached(true);
          // Calculate when the oldest report in the current window will expire (be older than 7 days)
          const oldestReport = Math.min(...recentReports);
          const unlockTime = oldestReport + (7 * 24 * 60 * 60 * 1000);
          
          // Format remaining time nicely
          const diffHours = Math.ceil((unlockTime - Date.now()) / (1000 * 60 * 60));
          if (diffHours > 24) {
            setRemainingTime(`${Math.ceil(diffHours / 24)} hari lagi`);
          } else {
            setRemainingTime(`${diffHours} jam lagi`);
          }
        } else {
          setIsLimitReached(false);
        }
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  };

  const addReportToHistory = () => {
    const historyJson = localStorage.getItem('aspirasi_history');
    let history: number[] = [];
    if (historyJson) {
      history = JSON.parse(historyJson);
    }
    history.push(Date.now());
    localStorage.setItem('aspirasi_history', JSON.stringify(history));
    checkRateLimit(); // Re-check after adding
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLimitReached) return;
    
    setIsSubmitting(true);

    // 1. Censor Text (Filternisasi)
    const sanitizedJudul = censorText(judul);
    const sanitizedPesan = censorText(pesan);

    // 2. Real API Call
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/pengaduan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul: sanitizedJudul, pesan: sanitizedPesan }),
      });
      if (!res.ok) throw new Error("Gagal mengirim");
      
      // 3. Save submission to history
      addReportToHistory();
      
      // 4. Show success state
      setSubmittedData({ judul: sanitizedJudul, pesan: sanitizedPesan });
      setShowSuccess(true);
      setJudul('');
      setPesan('');
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim aspirasi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/kegiatan-7.jpeg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-surface/40 dark:from-surface-container-lowest dark:via-surface-container-lowest/90 dark:to-surface-container-lowest/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <span className="material-symbols-outlined text-sm">record_voice_over</span>
            Layanan Publik
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 tracking-tight">
            Pengajuan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aspirasi Anonim</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Sampaikan kritik, saran, dan aspirasi Anda untuk kemajuan Kecamatan Cigedug secara aman dan rahasia.
          </p>
        </div>
      </section>

      {/* Main Content Form */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 pb-32 -mt-10">
        
        {/* Status / Alert Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-6 mb-8 flex gap-4 shadow-sm">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 mt-1">info</span>
          <div>
            <h3 className="text-blue-800 dark:text-blue-300 font-bold mb-1">Ketentuan Layanan</h3>
            <ul className="list-disc list-inside text-sm text-blue-700/80 dark:text-blue-400/80 space-y-1">
              <li>Identitas Anda dirahasiakan sepenuhnya (Anonim).</li>
              <li>Maksimal 3 pengajuan per perangkat dalam 1 minggu ({reportsCount}/3 digunakan).</li>
              <li>Sistem dilengkapi dengan filter sensor kata-kata kasar otomatis.</li>
            </ul>
          </div>
        </div>

        {/* Limit Reached Warning */}
        {isLimitReached && !showSuccess && (
          <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/30 rounded-2xl p-6 mb-8 flex gap-4 items-center animate-fade-in-up">
            <span className="material-symbols-outlined text-rose-500 text-3xl">block</span>
            <div>
              <h3 className="text-rose-700 dark:text-rose-400 font-bold mb-1">Batas Pengajuan Tercapai</h3>
              <p className="text-sm text-rose-600/80 dark:text-rose-300/80">
                Anda telah mengirimkan 3 aspirasi dalam minggu ini. Silakan coba lagi dalam <strong>{remainingTime}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && submittedData && (
          <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-3xl p-8 mb-8 animate-fade-in-up shadow-sm">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-emerald-200/50 dark:border-emerald-800/30">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined">check</span>
              </div>
              <div>
                <h3 className="text-emerald-800 dark:text-emerald-400 font-bold text-xl">Aspirasi Berhasil Dikirim!</h3>
                <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">Terima kasih atas partisipasi Anda.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-container rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Pratinjau Hasil Sensor:</p>
              <h4 className="text-lg font-bold text-on-surface mb-2">{submittedData.judul}</h4>
              <p className="text-on-surface-variant text-sm whitespace-pre-wrap">{submittedData.pesan}</p>
            </div>
            
            <button 
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full py-3 rounded-full border border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              Kirim Aspirasi Lainnya
            </button>
          </div>
        )}

        {/* The Form */}
        {!showSuccess && (
          <div className="bg-white dark:bg-surface-container-low rounded-3xl p-8 md:p-10 shadow-lg shadow-primary/5 border border-outline-variant/30 relative overflow-hidden">
            {/* Disabled Overlay */}
            {isLimitReached && (
              <div className="absolute inset-0 bg-surface/50 backdrop-blur-[2px] z-10 rounded-3xl"></div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="judul" className="text-sm font-bold text-on-surface">
                  Judul Aspirasi / Pengaduan
                </label>
                <input
                  id="judul"
                  type="text"
                  required
                  disabled={isLimitReached}
                  placeholder="Singkat, padat, dan jelas (Contoh: Jalan rusak di Desa Cigedug)"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pesan" className="text-sm font-bold text-on-surface">
                  Isi Aspirasi
                </label>
                <textarea
                  id="pesan"
                  required
                  disabled={isLimitReached}
                  rows={6}
                  placeholder="Ceritakan detail aspirasi atau keluhan Anda di sini... (Sistem akan menyensor kata-kata kasar secara otomatis)"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isLimitReached}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isLimitReached 
                      ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-container hover:-translate-y-1 text-on-primary shadow-primary/30'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">sync</span>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      Kirim Aspirasi Anonim
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </section>
    </div>
  );
}
