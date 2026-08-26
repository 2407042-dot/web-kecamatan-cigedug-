import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Desa - Kecamatan Cigedug",
  description:
    "Daftar 5 desa di Kecamatan Cigedug, Kabupaten Garut beserta profil, potensi, dan informasi masing-masing desa.",
};

const HERO_BG =
  "/images/desa-asli/foto-desa-cigedug.jpeg";

const desaList = [
  {
    nama: "Desa Cigedug",
    slug: "cigedug",
    ibukota: true,
    kades: "-",
    penduduk: "~8.000",
    luas: "6,4 km²",
    dusun: 3,
    desc: "Ibukota Kecamatan Cigedug. Terdapat kantor kecamatan, pasar tradisional, puskesmas, dan berbagai fasilitas pelayanan publik.",
    potensi: ["Kopi Arabika", "Perdagangan", "Pelayanan Publik"],
    img: "/images/desa-asli/desa-cigedug.jpeg",
  },
  {
    nama: "Desa Barusuda",
    slug: "barusuda",
    ibukota: false,
    kades: "-",
    penduduk: "~6.500",
    luas: "5,8 km²",
    dusun: 3,
    desc: "Lumbung sayuran Kecamatan Cigedug. Lahan pertaniannya menghasilkan wortel, tomat, bawang daun, dan kentang segar berkualitas tinggi.",
    potensi: ["Wortel", "Tomat", "Kentang"],
    img: "/images/desa-asli/Desa-Barusuda.jpeg",
  },
  {
    nama: "Desa Cintanagara",
    slug: "cintanagara",
    ibukota: false,
    kades: "-",
    penduduk: "~7.200",
    luas: "6,1 km²",
    dusun: 2,
    desc: "Desa yang kaya tradisi budaya Sunda. Dikenal dengan kerajinan bambu, kopi robusta, dan kesenian degung yang masih lestari.",
    potensi: ["Kerajinan Bambu", "Kopi Robusta", "Wisata Budaya"],
    img: "/images/desa-asli/desa-cintanagara.jpeg",
  },
  {
    nama: "Desa Sindangsari",
    slug: "sindangsari",
    ibukota: false,
    kades: "-",
    penduduk: "~5.800",
    luas: "5,2 km²",
    dusun: 2,
    desc: "Panorama alam pegunungan yang menawan dengan potensi agrowisata, kebun teh, dan peternakan sapi perah yang sedang berkembang.",
    potensi: ["Agrowisata", "Teh Lokal", "Sapi Perah"],
    img: "/images/desa-asli/Desa-Sindangsari.jpeg",
  },
  {
    nama: "Desa Sukahurip",
    slug: "sukahurip",
    ibukota: false,
    kades: "-",
    penduduk: "~6.100",
    luas: "7,7 km²",
    dusun: 3,
    desc: "Desa dengan luas wilayah terbesar di kecamatan. UMKM anyaman bambu, cemilan khas, dan tanaman hias menjadi andalan ekonomi warganya.",
    potensi: ["Anyaman Bambu", "Cemilan Khas", "Tanaman Hias"],
    img: "/images/desa-asli/Desa-Sukahurip.jpeg",
  },
];

export const dynamic = 'force-dynamic';

export default function DesaPage() {
  const content = getSiteContent();

  return (
    <>
      {/* -- Hero ----------------------------------------------------------- */}
      <section className="relative w-full min-h-[460px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_BG}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-primary/15" />
        </div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-16 pt-32">
          <nav className="flex items-center gap-2 text-white/60 text-label-md mb-6">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Desa</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">holiday_village</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">Kecamatan Cigedug</span>
          </div>
          <h1 className="text-display-lg text-white mb-4 max-w-2xl">
            {content["desa.hero.title"] || "Jelajahi Desa"}
          </h1>
          <p className="text-body-lg text-white/75 max-w-xl leading-relaxed">
            {content["desa.hero.desc"] || "Kenali lebih dekat potensi, profil, dan pesona dari 5 desa yang berada di wilayah Kecamatan Cigedug."}
          </p>
          {/* Stats */}
          <div className="flex flex-wrap gap-5 mt-8">
            {[
              { icon: "holiday_village", val: "5", label: "Desa" },
              { icon: "groups", val: "~33.600", label: "Total Penduduk" },
              { icon: "square_foot", val: "31,2 km²", label: "Total Luas" },
            ].map(({ icon, val, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3"
              >
                <span className="material-symbols-outlined icon-filled text-xl text-primary-fixed-dim">
                  {icon}
                </span>
                <div>
                  <p className="text-headline-md text-white font-bold leading-none">{val}</p>
                  <p className="text-label-md text-white/70">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Desa Grid ------------------------------------------------------ */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">holiday_village</span>
              Daftar Desa
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">5 Desa di Kecamatan Cigedug</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Klik <strong>Lihat Profil Lengkap</strong> untuk mengunjungi profil lokal setiap desa.
            </p>
          </div>

          {/* Featured: Desa Cigedug (Ibukota) */}
          <Link href={`/desa/${desaList[0].slug}`} className="group flex flex-col md:flex-row bg-white rounded-3xl border border-outline-variant/40 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden mb-6 cursor-pointer">
            <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
              <Image
                src={desaList[0].img}
                alt={desaList[0].nama}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20" />
              <span className="absolute top-4 left-4 bg-primary text-on-primary text-caption font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                <span className="material-symbols-outlined icon-filled text-sm">star</span>
                Ibukota Kecamatan
              </span>
            </div>
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-headline-lg text-on-surface mb-3">{desaList[0].nama}</h2>
              <p className="text-body-md text-on-surface-variant mb-5 leading-relaxed">{desaList[0].desc}</p>
              {/* Mini stats */}
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { icon: "groups", val: desaList[0].penduduk, label: "Penduduk" },
                  { icon: "square_foot", val: desaList[0].luas, label: "Luas" },
                  { icon: "location_city", val: `${desaList[0].dusun} Dusun`, label: "" },
                ].map(({ icon, val, label }) => (
                  <div key={icon} className="flex items-center gap-2 bg-surface-container-low rounded-xl px-4 py-2">
                    <span className="material-symbols-outlined icon-filled text-sm text-primary">{icon}</span>
                    <span className="text-label-md text-on-surface font-semibold">{val}{label ? ` ${label}` : ""}</span>
                  </div>
                ))}
              </div>
              {/* Potensi tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {desaList[0].potensi.map((p) => (
                  <span key={p} className="bg-secondary-container text-on-secondary-container text-caption font-semibold px-3 py-1 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-label-md text-primary font-bold">
                <span>Lihat Profil Lengkap</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* 4 desa lainnya */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {desaList.slice(1).map(({ nama, desc, luas, penduduk, dusun, potensi, img, slug }) => (
              <Link
                key={slug}
                href={`/desa/${slug}`}
                className="group bg-white rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Gambar */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={img}
                    alt={nama}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-headline-md text-white font-bold">{nama}</h3>
                  </div>
                </div>

                {/* Konten */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-body-md text-on-surface-variant mb-4 leading-relaxed flex-grow">{desc}</p>

                  {/* Stats */}
                  <div className="flex gap-4 pb-4 mb-4 border-b border-outline-variant/30">
                    <div>
                      <p className="text-label-md font-bold text-on-surface leading-none">{penduduk}</p>
                      <p className="text-caption text-on-surface-variant">Penduduk</p>
                    </div>
                    <div>
                      <p className="text-label-md font-bold text-on-surface leading-none">{luas}</p>
                      <p className="text-caption text-on-surface-variant">Luas</p>
                    </div>
                    <div>
                      <p className="text-label-md font-bold text-on-surface leading-none">{dusun} Dusun</p>
                      <p className="text-caption text-on-surface-variant">Wilayah</p>
                    </div>
                  </div>

                  {/* Potensi */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {potensi.map((p) => (
                      <span key={p} className="bg-primary-fixed text-primary text-caption font-semibold px-2.5 py-1 rounded-full">
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-label-md text-primary mt-auto font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Lihat Profil Lengkap</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Map */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-white rounded-3xl border border-outline-variant/40 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
                <span className="material-symbols-outlined icon-filled text-sm">map</span>
                Lokasi
              </span>
              <h2 className="text-headline-lg text-on-surface mb-4">Semua Desa di Satu Wilayah</h2>
              <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Kelima desa di Kecamatan Cigedug tersebar di kawasan lereng Gunung Cikuray
                dengan ketinggian rata-rata 1.000&ndash;1.400 mdpl. Jarak antar desa relatif
                dekat sehingga mudah dijangkau.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {desaList.map(({ slug, nama, ibukota }) => (
                  <Link
                    key={slug}
                    href={`/desa/${slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors group"
                  >
                    <div className={`w-8 h-8 ${ibukota ? "bg-primary" : "bg-primary-fixed"} rounded-lg flex items-center justify-center shrink-0`}>
                      <span className={`material-symbols-outlined icon-filled text-sm ${ibukota ? "text-on-primary" : "text-primary"}`}>
                        {ibukota ? "account_balance" : "holiday_village"}
                      </span>
                    </div>
                    <span className="text-label-md text-on-surface group-hover:text-primary transition-colors">{nama}</span>
                    {ibukota && <span className="text-caption text-primary ml-auto">Ibukota</span>}
                  </Link>
                ))}
              </div>
            </div>
            <div className="shrink-0 w-full md:w-72 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/40">
              <h3 className="text-headline-md text-on-surface mb-4">Informasi Umum</h3>
              <div className="space-y-3">
                {[
                  { label: "Jumlah Desa", value: "5 Desa" },
                  { label: "Total Luas", value: "31,20 km²" },
                  { label: "Estimasi Penduduk", value: "~40.000 Jiwa" },
                  { label: "Rata-rata Dusun/Desa", value: "3-4 Dusun" },
                  { label: "Ketinggian", value: "1.000-1.400 mdpl" },
                  { label: "Komoditas Utama", value: "Sayuran & Kopi" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-outline-variant/30 last:border-0">
                    <span className="text-body-md text-on-surface-variant">{label}</span>
                    <span className="text-label-md font-semibold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- CTA ----------------------------------------------------------- */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Potensi Produk Unggulan</h2>
            <p className="text-body-lg text-white/70 max-w-lg">
              Temukan produk-produk UMKM dan pertanian unggulan dari desa-desa di Kecamatan Cigedug.
            </p>
          </div>
          <Link
            href="/potensi"
            className="bg-white text-primary text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2"
          >
            <span>Lihat Potensi Daerah</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
