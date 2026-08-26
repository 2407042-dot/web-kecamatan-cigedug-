import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { getAllBerita } from "@/lib/berita";
import fs from "fs";
import path from "path";

import HeroVideoCarousel from "@/components/HeroVideoCarousel";

// ─── Data ──────────────────────────────────────────────────────────────────────



const stats = [
  { icon: "holiday_village", value: "5", label: "Desa" },
  { icon: "square_foot", value: "31,2 km²", label: "Luas Wilayah" },
  { icon: "assignment_turned_in", value: "24+", label: "Jenis Layanan" },
  { icon: "groups", value: "40.000+", label: "Penduduk" },
];

const layananCards = [
  {
    href: "/pelayanan",
    icon: "support_agent",
    iconFilled: true,
    // Navy blue — primary brand color
    bgIcon: "bg-primary",
    textIcon: "text-on-primary",
    borderAccent: "border-t-primary",
    title: "Pelayanan Publik",
    desc: "Informasi dan pendaftaran layanan kependudukan, perizinan, dan non-perizinan.",
  },
  {
    href: "/pengaduan",
    icon: "campaign",
    iconFilled: true,
    // Light red — for pengaduan/complaints (semantic)
    bgIcon: "bg-error-container",
    textIcon: "text-error",
    borderAccent: "border-t-error",
    title: "Pengaduan Masyarakat",
    desc: "Sampaikan aspirasi, laporan, atau keluhan terkait pelayanan dan infrastruktur.",
  },
  {
    href: "/desa",
    icon: "holiday_village",
    iconFilled: true,
    // Light blue — harmonious with primary
    bgIcon: "bg-primary-fixed",
    textIcon: "text-primary",
    borderAccent: "border-t-primary",
    title: "Informasi Desa",
    desc: "Profil lengkap, data, dan program kerja dari desa-desa di lingkup kecamatan.",
  },
  {
    href: "/pengumuman",
    icon: "notifications_active",
    iconFilled: true,
    // Medium lavender — surface variant
    bgIcon: "bg-surface-container-high",
    textIcon: "text-primary",
    borderAccent: "border-t-primary",
    title: "Pengumuman",
    desc: "Pemberitahuan resmi terkini dari pemerintah kecamatan dan kabupaten.",
  },
  {
    href: "/agenda",
    icon: "event_note",
    iconFilled: false,
    // Neutral lavender — for calendar/agenda
    bgIcon: "bg-surface-variant",
    textIcon: "text-on-surface-variant",
    borderAccent: "border-t-outline",
    title: "Agenda Kegiatan",
    desc: "Jadwal acara, rapat paripurna, dan kegiatan kemasyarakatan mendatang.",
  },
  {
    href: "/data",
    icon: "bar_chart",
    iconFilled: true,
    // Dark navy — premium look for data/analytics
    bgIcon: "bg-inverse-surface",
    textIcon: "text-inverse-on-surface",
    borderAccent: "border-t-on-surface",
    title: "Data Kecamatan",
    desc: "Statistik demografi, pendidikan, kesehatan, dan infrastruktur wilayah.",
  },
];



// ─── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({ label, title, desc }: { label?: string; title: string; desc: string }) {
  return (
    <div className="text-center mb-12">
      {label && (
        <span className="inline-block text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
          {label}
        </span>
      )}
      <h2 className="text-headline-lg text-on-surface mb-3">{title}</h2>
      <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">{desc}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic';

export default async function Home() {
  const content = getSiteContent();
  const allBerita = await getAllBerita();
  const beritaList = allBerita.slice(0, 5);

  let pengumumanList: any[] = [];
  let produkList: any[] = [];
  let galeriList: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/pengumuman`, { cache: "no-store" });
    const data = await res.json();
    if (data && Array.isArray(data)) pengumumanList = data;
  } catch (error) {}

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/produk`, { cache: "no-store" });
    const data = await res.json();
    if (data && data.length > 0) produkList = data.slice(0, 4);
  } catch (error) {}

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/galeri`, { cache: "no-store" });
    const data = await res.json();
    if (data && data.length > 0) galeriList = data.slice(0, 7);
  } catch (error) {}
  
  const latestPengumuman = pengumumanList.slice(0, 3);

  // Read media settings directly from file system
  let homeVideos = ["/hero-1.mp4", "/hero-2.mp4", "/hero-3.mp4"];
  try {
    const configPath = path.join(process.cwd(), 'src', 'data', 'media-settings.json');
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf-8');
      const data = JSON.parse(raw);
      if (data.home_videos && data.home_videos.length > 0) {
        homeVideos = data.home_videos;
      }
    }
  } catch (e) {
    console.error("Error reading media settings:", e);
  }

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[620px] flex items-center justify-center overflow-hidden">
        {/* Background Video Carousel */}
        <HeroVideoCarousel videos={homeVideos} />

        {/* Content */}
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center pt-28 pb-20">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
            <span className="material-symbols-outlined icon-filled text-base text-yellow-300">star</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">
              {content["home.hero.subtitle"] || "Pemerintah Kabupaten Garut"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-display-lg font-extrabold text-white mb-4 md:mb-6 max-w-3xl leading-tight drop-shadow-lg px-2">
            {content["home.hero.title"] || "Portal Digital Kecamatan Cigedug"}
          </h1>
          <p className="text-base sm:text-lg md:text-body-lg text-white/90 mb-8 md:mb-10 max-w-2xl px-4 md:px-0 drop-shadow-md">
            {content["home.hero.tagline"] || "Portal resmi untuk layanan publik, informasi pemerintahan, dan pengembangan potensi desa menuju masyarakat yang tertib, damai, dan sejahtera."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-6 sm:px-0">
            <Link
              href="/pelayanan"
              className="bg-white text-primary text-label-md px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2 group"
            >
              <span>Lihat Pelayanan</span>
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/profil"
              className="border-2 border-white/50 hover:border-white text-white text-label-md px-8 py-3 rounded-full transition-colors duration-200 backdrop-blur-sm"
            >
              Jelajahi Kecamatan
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Statistik Strip ───────────────────────────────────────────── */}
      <section className="bg-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <span className="material-symbols-outlined icon-filled text-3xl text-primary-fixed-dim">
                {icon}
              </span>
              <span className="text-display-lg text-white">{value}</span>
              <span className="text-label-md text-white/60 uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Layanan Utama ─────────────────────────────────────────────── */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="Layanan Digital"
            title="Layanan Utama"
            desc="Akses cepat ke berbagai layanan dan informasi penting untuk kemudahan administrasi Anda."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {layananCards.map(({ href, icon, iconFilled, bgIcon, textIcon, borderAccent, title, desc }) => (
              <Link
                key={title}
                href={href}
                className={`group flex flex-col p-7 bg-white rounded-2xl border-t-4 ${borderAccent} border border-outline-variant/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${bgIcon} rounded-xl flex items-center justify-center mb-5 shadow-sm`}>
                  <span className={`material-symbols-outlined ${iconFilled ? "icon-filled" : ""} text-3xl ${textIcon}`}>
                    {icon}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-headline-md text-on-surface mb-2">{title}</h3>
                <p className="text-body-md text-on-surface-variant flex-grow leading-relaxed">{desc}</p>

                {/* Footer link */}
                <div className="mt-5 flex items-center gap-1 text-label-md text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Selengkapnya</span>
                  <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3.5 Berita & Pengumuman ───────────────────────────────────────── */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kiri: Berita Terbaru */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-headline-md text-on-surface mb-1">Berita Terbaru</h2>
                  <p className="text-body-md text-on-surface-variant">Informasi dan kabar terkini dari Kecamatan Cigedug.</p>
                </div>
                <Link href="/berita" className="hidden sm:flex text-primary text-label-md font-bold hover:underline items-center gap-1">
                  Lihat Semua Berita <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>

              <div className="flex flex-col gap-5">
                {beritaList.length > 0 ? beritaList.map((berita) => (
                  <Link href={`/berita/${berita.slug}`} key={berita.slug} className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl border border-outline-variant/30 hover:border-primary/30 hover:bg-surface-container-lowest hover:shadow-md transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-40 md:w-48 aspect-video sm:aspect-square relative rounded-xl overflow-hidden shrink-0 bg-surface-container">
                      {berita.imageUrl ? (
                        <Image
                          src={berita.imageUrl}
                          alt={berita.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                          <span className="material-symbols-outlined text-3xl text-primary/30">image</span>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex flex-col flex-1 py-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-label-sm text-primary font-bold">{berita.date}</span>
                      </div>
                      <h3 className="text-title-lg text-on-surface font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {berita.title}
                      </h3>
                      <p className="text-body-sm text-on-surface-variant line-clamp-2 mb-3">
                        {berita.snippet || berita.content.substring(0, 100) + "..."}
                      </p>
                      <div className="mt-auto text-label-sm text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Baca Artikel <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                )) : (
                  <div className="text-center py-10 bg-surface-container-low rounded-2xl border border-outline-variant/30 text-on-surface-variant">
                    Belum ada berita terbaru.
                  </div>
                )}
              </div>
              
              <Link href="/berita" className="sm:hidden mt-6 flex justify-center text-primary text-label-md font-bold hover:underline items-center gap-1">
                Lihat Semua Berita <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Kanan: Pengumuman (Bagian warna biru) */}
            <div className="lg:col-span-1">
              <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-6 lg:p-8 border border-primary/20 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-white text-xl">campaign</span>
                  </div>
                  <div>
                    <h2 className="text-title-lg text-primary font-bold">Pengumuman</h2>
                    <p className="text-label-sm text-on-surface-variant">Pemberitahuan Resmi</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 flex-1">
                  {latestPengumuman.length > 0 ? latestPengumuman.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-surface-container-low p-4 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        {item.isPinned && (
                          <span className="material-symbols-outlined text-[14px] text-error animate-pulse">push_pin</span>
                        )}
                        <span className="text-label-sm text-primary font-bold">{item.date}</span>
                      </div>
                      <h3 className="text-title-md text-on-surface font-bold mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-on-surface-variant line-clamp-3">
                        {item.snippet}
                      </p>
                    </div>
                  )) : (
                    <div className="bg-white/50 dark:bg-surface-container-low p-6 rounded-2xl border border-primary/10 text-center text-on-surface-variant">
                      Belum ada pengumuman.
                    </div>
                  )}
                </div>

                <Link href="/pengumuman" className="mt-6 w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl text-label-md font-bold hover:bg-primary-fixed hover:text-primary transition-colors shadow-sm hover:shadow-md">
                  Tampilkan Semua Pengumuman
                  <span className="material-symbols-outlined text-lg">open_in_new</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. Produk Unggulan ───────────────────────────────────────────── */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="UMKM Lokal"
            title="Produk Unggulan"
            desc="Kenali berbagai produk unggulan dari UMKM dan pertanian lokal Kecamatan Cigedug."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {produkList.length > 0 ? produkList.map(({ title, name, category, description, imageUrl, src, tag, desc }) => (
              <div
                key={title || name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <Image
                    alt={title || name}
                    width={400}
                    height={208}
                    unoptimized
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={(imageUrl ? `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${imageUrl}` : null) || src || "/images/placeholder.png"}
                  />
                  {/* Tag badge */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-caption font-semibold px-3 py-1 rounded-full">
                    {category || tag || "UMKM"}
                  </span>
                </div>

                {/* Text */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-headline-md text-on-surface mb-2">{title || name}</h3>
                  <p className="text-body-md text-on-surface-variant line-clamp-3">{description || desc}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10 bg-white rounded-2xl border border-outline-variant/30 text-on-surface-variant">
                Belum ada data produk unggulan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. Dokumentasi Kegiatan ──────────────────────────────────────── */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="Galeri"
            title="Dokumentasi Kegiatan"
            desc="Galeri momen penting dari berbagai aktivitas kemasyarakatan dan program pemerintah kecamatan."
          />

          {/* CSS columns masonry — lebih reliable dari grid complex spans */}
          <div className="masonry-grid">
            {galeriList.length > 0 ? galeriList.map(({ title, alt, img, src }, i) => (
              <div
                key={title || alt}
                className="overflow-hidden rounded-xl mb-4 break-inside-avoid"
                style={{ breakInside: "avoid" }}
              >
                <Image
                  alt={title || alt || "Galeri"}
                  width={600}
                  height={i % 3 === 2 ? 480 : 300}
                  unoptimized
                  className="w-full object-cover hover:scale-105 transition-transform duration-500"
                  src={(img ? `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}${img}` : null) || src || "/images/placeholder.png"}
                />
              </div>
            )) : (
              <div className="text-center py-10 w-full bg-surface-container-low rounded-2xl border border-outline-variant/30 text-on-surface-variant break-inside-avoid">
                Belum ada dokumentasi kegiatan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* -- 6. Peta Lokasi ----------------------------------------------------- */}
      <section className="py-section-gap bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="Peta Wilayah"
            title="Lokasi Kecamatan Cigedug"
            desc="Pusat pemerintahan dan wilayah strategis Kecamatan Cigedug, Kabupaten Garut, Jawa Barat."
          />
          
          <div className="w-full mt-10 rounded-3xl overflow-hidden shadow-sm border border-outline-variant/30 h-[450px] relative">
            <iframe 
              src="https://maps.google.com/maps?q=Kecamatan%20Cigedug,%20Garut&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </section>

      {/* -- 7. CTA Banner ------------------------------------------------------ */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-6 md:gap-8">
          <div>
            <h2 className="text-3xl md:text-headline-lg font-bold text-white mb-2">
              Ada keluhan atau aspirasi?
            </h2>
            <p className="text-base md:text-body-lg text-white/80">
              Kami siap mendengar dan merespons setiap masukan dari masyarakat.
            </p>
          </div>
          <Link
            href="/pengaduan"
            className="w-full md:w-auto shrink-0 bg-white text-primary text-label-md px-8 py-3.5 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Sampaikan Sekarang</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
