import type { Metadata } from "next";
import Link from "next/link";
import { getHeroImage } from "@/lib/media";

export const metadata: Metadata = {
  title: "Desa Barusuda - Profil Desa",
  description: "Profil lengkap Desa Barusuda, Kecamatan Cigedug, Kabupaten Garut.",
};


const potensiList = [
  { icon: "eco", label: "Pertanian Holtikultura", desc: "Komoditas seperti padi, cabai, singkong, dan kacang-kacangan tumbuh subur." },
  { icon: "pets", label: "Peternakan Warga", desc: "Pengembangan budidaya domba dan kambing yang menjadi investasi masyarakat." },
  { icon: "water_drop", label: "Sumber Air Pegunungan", desc: "Lingkungan yang asri dan ketersediaan sumber air bersih dari hulu Gunung Cikuray." },
];

const programList = [
  "Penyaluran Bantuan Pangan",
  "Perbaikan Jalan Tani",
  "Pengembangan Kelompok Tani",
  "Pemeliharaan Saluran Irigasi",
];

const aparaturDesa = [
  { nama: "Asep Parid Parijarwan", jabatan: "Kepala Desa", icon: "person" },
  { nama: "(Data belum tersedia)", jabatan: "Sekretaris Desa", icon: "manage_accounts" },
];

const subNavLinks = [
  { href: "/desa/cigedug", label: "Cigedug" },
  { href: "/desa/barusuda", label: "Barusuda" },
  { href: "/desa/cintanagara", label: "Cintanagara" },
  { href: "/desa/sindangsari", label: "Sindangsari" },
  { href: "/desa/sukahurip", label: "Sukahurip" },
];

export default function BarusudaPage() {
  const heroImage = getHeroImage("barusuda", "/images/desa/barusuda-hero.jpeg");
  return (
    <>
      {/* -- Hero ----------------------------------------------------------- */}
      <section className="relative w-full min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 flex w-[200%] animate-slide-hero">
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
            <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/desa/barusuda-pelayanan.jpeg')` }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/70 to-on-surface/20" />
        </div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-16 pt-32">
          <nav className="flex items-center gap-2 text-white/60 text-label-md mb-6">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <a href="/desa" className="hover:text-white transition-colors">Desa</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Desa Barusuda</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">holiday_village</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">Kecamatan Cigedug</span>
          </div>
          <h1 className="text-display-lg text-white mb-3">Desa Barusuda</h1>
          <p className="text-body-lg text-white/80 max-w-2xl leading-relaxed mb-6">
            Desa dengan potensi pertanian hortikultura yang produktif dan asri di kawasan lereng Gunung Cikuray.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
             <Link
               href={"/desa/segera-hadir?desa=Desa Barusuda"}
               className="bg-primary text-on-primary text-label-md px-6 py-3.5 rounded-full font-bold hover:bg-primary-fixed transition-colors flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
             >
               <span className="material-symbols-outlined text-lg">language</span>
               Kunjungi Website Resmi
             </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { icon: "groups", val: "~6.500 Jiwa", label: "Penduduk" },
              { icon: "square_foot", val: "5,8 km²-", label: "Luas Wilayah" },
              { icon: "location_city", val: "3 Dusun", label: "Wilayah" },
            ].map(({ icon, val, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
                <span className="material-symbols-outlined icon-filled text-sm text-white/70">{icon}</span>
                <div>
                  <p className="text-label-md text-white font-bold leading-none">{val}</p>
                  <p className="text-caption text-white/60">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Sub-Nav Antar Desa ---------------------------------------------- */}
      <div className="bg-white border-b border-outline-variant sticky top-16 z-40 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <nav className="flex overflow-x-auto gap-1 py-2">
            <Link href="/desa" className="flex items-center gap-1 px-3 py-2 rounded-lg text-label-md whitespace-nowrap text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined icon-filled text-sm">grid_view</span>
              Semua
            </Link>
            {subNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={"px-4 py-2 rounded-lg text-label-md whitespace-nowrap transition-all duration-150 " + (
                  href === "/desa/barusuda"
                    ? "bg-primary text-on-primary shadow-sm font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* -- Profil & Identitas Desa --------------------------------------- */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
                <span className="material-symbols-outlined icon-filled text-sm">info</span>
                Identitas Desa
              </span>
              <h2 className="text-headline-lg text-on-surface mb-6">Profil & Sejarah Singkat</h2>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Desa Barusuda merupakan salah satu wilayah yang lahir dari pemekaran Kecamatan Bayongbong sekitar tahun 2001. Desa yang berada di wilayah dataran tinggi bersuhu sejuk ini memfokuskan perkembangannya pada penguatan sektor pertanian dan penyediaan fasilitas layanan desa yang inklusif.
              </p>
            </div>

            <div>
              <div className="divide-y divide-outline-variant/40 rounded-2xl border border-outline-variant/40 overflow-hidden bg-white shadow-sm">
                {[
                  { label: "Kepala Desa", value: "Asep Parid Parijarwan" },
                  { label: "Kode Pos", value: "44116" },
                  { label: "Luas Wilayah", value: "5,8 km²-" },
                  { label: "Jumlah Dusun", value: "3 Dusun" },
                  { label: "Jumlah RW", value: "13 RW" },
                  { label: "Jumlah RT", value: "27 RT" },
                  { label: "Kecamatan", value: "Cigedug" },
                  { label: "Kabupaten", value: "Garut" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-5 py-4 hover:bg-surface-container-low transition-colors">
                    <span className="text-body-md text-on-surface-variant">{label}</span>
                    <span className="text-label-md font-bold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -- Aparatur Desa ------------------------------------------------- */}
      <section className="py-section-gap bg-white border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">groups</span>
              Pemerintahan
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">Aparatur Desa Barusuda</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Susunan perangkat desa yang bertugas melayani masyarakat dan menjalankan roda pemerintahan desa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aparaturDesa.map((aparatur) => (
              <div key={aparatur.jabatan} className="flex items-center gap-4 p-5 rounded-2xl border border-outline-variant/40 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-surface-container-low group-hover:bg-primary-fixed transition-colors rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined icon-filled text-2xl text-primary">{aparatur.icon}</span>
                </div>
                <div>
                  <h4 className="text-title-md text-on-surface font-bold">{aparatur.nama}</h4>
                  <p className="text-label-md text-on-surface-variant">{aparatur.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Potensi & Program Desa ---------------------------------------- */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Potensi */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined icon-filled text-white">diamond</span>
                </div>
                <h2 className="text-headline-md text-on-surface font-bold">Potensi Unggulan</h2>
              </div>
              <div className="space-y-4">
                {potensiList.map(({ icon, label, desc }) => (
                  <div key={label} className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6 hover:-translate-y-1 transition-transform">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined icon-filled text-2xl text-primary">{icon}</span>
                      </div>
                      <div>
                        <h3 className="text-title-md text-on-surface font-bold mb-1">{label}</h3>
                        <p className="text-body-md text-on-surface-variant">{desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined icon-filled text-white">task_alt</span>
                </div>
                <h2 className="text-headline-md text-on-surface font-bold">Program Prioritas</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {programList.map((program, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-outline-variant/40 shadow-sm px-5 py-4">
                    <div className="w-8 h-8 bg-surface-container rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined icon-filled text-sm text-primary">check</span>
                    </div>
                    <span className="text-body-md text-on-surface font-medium">{program}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* -- Navigasi Antar Desa ------------------------------------------- */}
      <section className="py-10 bg-surface border-t border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between">
          <Link href="/desa/cigedug" className="flex items-center gap-2 text-label-md text-primary font-bold hover:underline"><span className="material-symbols-outlined text-base">arrow_back</span>Desa Cigedug</Link>
          <Link href="/desa" className="flex items-center gap-1.5 px-6 py-2.5 bg-surface-container-low text-on-surface rounded-full text-label-md font-bold hover:bg-outline-variant transition-colors">
            <span className="material-symbols-outlined icon-filled text-sm">grid_view</span>
            Semua Desa
          </Link>
          <Link href="/desa/cintanagara" className="flex items-center gap-2 text-label-md text-primary font-bold hover:underline">Desa Cintanagara<span className="material-symbols-outlined text-base">arrow_forward</span></Link>
        </div>
      </section>
    </>
  );
}
