import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login Admin - Kecamatan Cigedug',
  description: 'Masuk ke dashboard panel admin Kecamatan Cigedug.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-container-lowest flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white dark:bg-surface-container-low rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-outline-variant/30 relative">
        
        {/* === Left Side (Image & Branding) === */}
        <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] overflow-hidden flex items-end p-8 lg:p-12">
          {/* Background Image */}
          <Image
            src="/images/hero-1.jpg"
            alt="Pemandangan Kecamatan Cigedug"
            fill
            unoptimized
            className="object-cover absolute inset-0 z-0 scale-105"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-container/90 via-primary-container/50 to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
          
          {/* Content Over Image */}
          <div className="relative z-20 text-white w-full">
            <Link href="/" className="inline-flex items-center gap-3 mb-16 lg:mb-32 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 bg-white rounded-full p-2 flex items-center justify-center shadow-lg">
                <Image
                  src="/images/hero-2.jpg"
                  alt="Logo Garut"
                  width={32}
                  height={32}
                  unoptimized
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-bold opacity-80">Kembali ke Beranda</span>
                <span className="font-bold">Kecamatan Cigedug</span>
              </div>
            </Link>

            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Portal <br />
              <span className="text-primary-fixed-dim">Admin Dashboard</span>
            </h1>
            <p className="text-white/80 max-w-md leading-relaxed">
              Sistem informasi dan tata kelola digital untuk meningkatkan efisiensi dan transparansi pelayanan publik.
            </p>
          </div>
        </div>

        {/* === Right Side (Login Form) === */}
        <div className="lg:w-1/2 p-8 lg:p-16 xl:p-24 flex flex-col justify-center relative">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="mb-10 text-center lg:text-left relative z-10">
            <h2 className="text-3xl font-bold text-on-surface mb-2">Selamat Datang!</h2>
            <p className="text-on-surface-variant">Silakan masukkan kredensial Anda untuk melanjutkan.</p>
          </div>

          <form className="flex flex-col gap-6 relative z-10">
            {/* Input Email/Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-on-surface ml-1">Email / NIP</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                  person
                </span>
                <input 
                  type="text" 
                  placeholder="admin@cigedug.go.id"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-2xl pl-12 pr-4 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-on-surface ml-1">Kata Sandi</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-2xl pl-12 pr-12 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">visibility_off</span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary focus:ring-offset-surface bg-surface-container-lowest transition-all cursor-pointer"
                />
                <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Ingat saya</span>
              </label>
              <Link href="#" className="text-sm font-bold text-primary hover:text-primary-container transition-colors">
                Lupa Sandi?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="button" 
              className="mt-4 w-full bg-primary hover:bg-primary-container text-on-primary font-bold py-4 rounded-2xl shadow-lg shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2"
            >
              Masuk ke Dashboard
              <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-12 text-center relative z-10">
            <p className="text-xs text-on-surface-variant">
              Bukan aparatur desa? <br className="lg:hidden" />
              <Link href="/" className="font-bold text-primary hover:underline ml-1">Kembali ke portal warga</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
