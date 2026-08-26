import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selayang Pandang - Kecamatan Cigedug",
  description:
    "Profil umum, identitas wilayah, letak geografis, dan batas administrasi Kecamatan Cigedug, Kabupaten Garut, Jawa Barat.",
};

const HERO_BG =
  "/images/visi-misi-cigedug.jpg";

const subNavLinks = [
  { href: "/profil", label: "Selayang Pandang", icon: "info", active: true },
  { href: "/profil/visi-misi", label: "Visi & Misi", icon: "star", active: false },
  { href: "/profil/sejarah", label: "Sejarah", icon: "history_edu", active: false },
  { href: "/profil/struktur-organisasi", label: "Struktur Organisasi", icon: "account_tree", active: false },
  { href: "/profil/aparatur", label: "Aparatur", icon: "badge", active: false },
];

const identitasData = [
  { label: "Nama Kecamatan", value: "Cigedug" },
  { label: "Pusat Pemerintahan", value: "Desa Cigedug" },
  { label: "Kabupaten", value: "Garut" },
  { label: "Provinsi", value: "Jawa Barat" },
  { label: "Negara", value: "Indonesia" },
  { label: "Luas Wilayah", value: "31,20 km²2" },
  { label: "Jumlah Desa", value: "5 Desa" },
  { label: "Kode Kemendagri", value: "32.05.18" },
  { label: "Kode BPS", value: "3205151" },
];

const statCards = [
  { icon: "square_foot", value: "31,2 km²2", label: "Luas Wilayah", desc: "Kawasan dataran tinggi lereng Gunung Cikuray" },
  { icon: "holiday_village", value: "5", label: "Desa", desc: "Termasuk Ibukota Kecamatan, Desa Cigedug" },
  { icon: "groups", value: "40.000+", label: "Penduduk", desc: "Jiwa berdomisili di seluruh wilayah kecamatan" },
  { icon: "terrain", value: "1.200 m", label: "Ketinggian", desc: "Meter di atas permukaan laut (mdpl)" },
];

const desaList = [
  {
    name: "Desa Cigedug",
    badge: "Ibukota Kecamatan",
    badgeColor: "bg-primary text-on-primary",
    desc: "Pusat pemerintahan Kecamatan Cigedug dengan berbagai fasilitas administrasi dan pelayanan publik.",
    icon: "account_balance",
    href: "/desa/cigedug",
    img: "/images/desa-asli/desa-cigedug.jpeg",
  },
  {
    name: "Desa Barusuda",
    badge: "Desa",
    badgeColor: "bg-surface-container-high text-on-surface-variant",
    desc: "Desa dengan potensi pertanian dan perkebunan dataran tinggi yang subur dan produktif.",
    icon: "park",
    href: "/desa/barusuda",
    img: "/images/desa-asli/Desa-Barusuda.jpeg",
  },
  {
    name: "Desa Cintanagara",
    badge: "Desa",
    badgeColor: "bg-surface-container-high text-on-surface-variant",
    desc: "Desa yang kaya tradisi dan budaya lokal dengan komunitas masyarakat yang guyub dan harmonis.",
    icon: "diversity_3",
    href: "/desa/cintanagara",
    img: "/images/desa-asli/desa-cintanagara.jpeg",
  },
  {
    name: "Desa Sindangsari",
    badge: "Desa",
    badgeColor: "bg-surface-container-high text-on-surface-variant",
    desc: "Desa dengan keindahan alam pegunungan dan potensi agrowisata yang sedang dikembangkan.",
    icon: "landscape",
    href: "/desa/sindangsari",
    img: "/images/desa-asli/Desa-Sindangsari.jpeg",
  },
  {
    name: "Desa Sukahurip",
    badge: "Desa",
    badgeColor: "bg-surface-container-high text-on-surface-variant",
    desc: "Desa dengan potensi UMkm² dan kerajinan tangan khas daerah yang terus berkembang pesat.",
    icon: "storefront",
    href: "/desa/sukahurip",
    img: "/images/desa-asli/Desa-Sukahurip.jpeg",
  },
];

const kecamatanSekitar = [
  "Bayongbong", "Banjarwangi", "Cikajang", "Cisurupan", "Cilawu",
  "Garut Kota", "Samarang", "Pasirwangi", "Singajaya", "Cihurip",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
      {children}
    </span>
  );
}

function SectionHeader({ label, title, desc, icon }: { label?: string; title: string; desc?: string; icon?: string }) {
  return (
    <div className="text-center mb-12">
      {label && (
        <div className="flex justify-center">
          <SectionLabel>
            {icon && <span className="material-symbols-outlined icon-filled text-sm">{icon}</span>}
            {label}
          </SectionLabel>
        </div>
      )}
      <h2 className="text-headline-lg text-on-surface mb-3">{title}</h2>
      {desc && <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">{desc}</p>}
    </div>
  );
}

export const dynamic = 'force-dynamic';

export default function ProfilPage() {
  const content = getSiteContent();

  return (
    <>
      {/* 1. Hero */}
      <section className="relative w-full min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/selayang-pandang.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
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
            <span className="text-white">Selayang Pandang</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">location_on</span>
                <span className="text-label-md text-white/90 tracking-widest uppercase">Kabupaten Garut &middot; Jawa Barat</span>
              </div>
                <h1 className="text-display-lg text-white mb-4 max-w-2xl">
                  {content["profil.hero.title"] || "Selayang Pandang"}
                  <br />
                  <span className="text-primary-fixed-dim">Kecamatan Cigedug</span>
                </h1>
                <p className="text-body-lg text-white/75 max-w-xl leading-relaxed">
                  {content["profil.deskripsi"] || "Kecamatan di lereng Gunung Cikuray yang sejuk, berjarak ±25 km dari pusat Kota Garut — kaya potensi pertanian, budaya, dan alam pegunungan."}
                </p>
            </div>
            <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 text-white">
              <p className="text-label-md text-white/60 uppercase tracking-wider mb-3">Koordinat</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary-fixed-dim">south</span>
                  <span className="text-body-md font-mono">7&deg;20&prime;22&Prime; LS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary-fixed-dim">east</span>
                  <span className="text-body-md font-mono">107&deg;48&prime;34&Prime; BT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sub-Nav Tabs */}
      <div className="bg-white border-b border-outline-variant sticky top-16 z-40 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <nav className="flex overflow-x-auto gap-1 py-2">
            {subNavLinks.map(({ href, label, icon, active }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-label-md whitespace-nowrap transition-all duration-150 ${active
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                  }`}
              >
                <span className="material-symbols-outlined icon-filled text-sm">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Identitas Wilayah */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src={HERO_BG}
                  alt="Panorama Kecamatan Cigedug"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-label-md text-white/80 uppercase tracking-wider">Panorama</p>
                  <p className="text-headline-md text-white font-bold">Kecamatan Cigedug</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-outline-variant/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined icon-filled text-2xl text-on-primary">terrain</span>
                  </div>
                  <div>
                    <p className="text-headline-md text-primary font-bold">&plusmn;1.200 m</p>
                    <p className="text-label-md text-on-surface-variant">Di atas permukaan laut</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <SectionLabel>
                  <span className="material-symbols-outlined icon-filled text-sm">info</span>
                  Identitas Wilayah
                </SectionLabel>
              </div>
              <h2 className="text-headline-lg text-on-surface mb-6">Profil Kecamatan Cigedug</h2>
              <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
                Kecamatan Cigedug merupakan salah satu kecamatan di wilayah Kabupaten Garut,
                Provinsi Jawa Barat, yang terletak di kawasan lereng Gunung Cikuray dengan
                ketinggian berkisar antara 1.000&ndash;1.400 mdpl.
              </p>
              <div className="divide-y divide-outline-variant/40 rounded-2xl border border-outline-variant/40 overflow-hidden">
                {identitasData.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-5 py-3.5 hover:bg-surface-container-low transition-colors"
                  >
                    <span className="text-body-md text-on-surface-variant">{label}</span>
                    <span className="text-label-md font-semibold text-on-surface text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Statistik */}
      <section className="py-section-gap bg-primary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-block text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">Data Umum</span>
            <h2 className="text-headline-lg text-white">Kecamatan dalam Angka</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map(({ icon, value, label, desc }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-200">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined icon-filled text-2xl text-primary-fixed-dim">{icon}</span>
                </div>
                <p className="text-display-lg text-white font-bold mb-1">{value}</p>
                <p className="text-label-md text-white/80 uppercase tracking-wider mb-2">{label}</p>
                <p className="text-body-md text-white/55 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Letak Geografis & Batas Wilayah */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="Geografis"
            icon="public"
            title="Letak & Batas Wilayah"
            desc="Posisi strategis Kecamatan Cigedug dalam peta administratif Kabupaten Garut."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Compass layout */}
            <div>
              <h3 className="text-headline-md text-on-surface mb-6">Batas Administrasi</h3>
              <div className="relative flex items-center justify-center min-h-[320px]">
                {/* Center */}
                <div className="absolute w-32 h-32 bg-primary rounded-full flex flex-col items-center justify-center shadow-lg z-10">
                  <span className="material-symbols-outlined icon-filled text-3xl text-on-primary">location_on</span>
                  <span className="text-label-md text-on-primary font-bold text-center leading-tight mt-1">Cigedug</span>
                </div>
                {/* North */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-center shadow-sm max-w-[160px]">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-sm text-blue-600">north</span>
                      <span className="text-label-md text-blue-700 font-bold">Utara</span>
                    </div>
                    <p className="text-caption text-blue-600">Kec. Bayongbong</p>
                  </div>
                  <div className="w-0.5 h-12 bg-blue-200" />
                </div>
                {/* South */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <div className="w-0.5 h-12 bg-green-200" />
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center shadow-sm max-w-[160px]">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-sm text-green-600">south</span>
                      <span className="text-label-md text-green-700 font-bold">Selatan</span>
                    </div>
                    <p className="text-caption text-green-600">Kec. Cikajang</p>
                  </div>
                </div>
                {/* West */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 text-center shadow-sm max-w-[148px]">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-sm text-purple-600">west</span>
                      <span className="text-label-md text-purple-700 font-bold">Barat</span>
                    </div>
                    <p className="text-caption text-purple-600">Kec. Cisurupan</p>
                  </div>
                  <div className="h-0.5 w-8 bg-purple-200" />
                </div>
                {/* East */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-amber-200" />
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center shadow-sm max-w-[148px]">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-sm text-amber-600">east</span>
                      <span className="text-label-md text-amber-700 font-bold">Timur</span>
                    </div>
                    <p className="text-caption text-amber-600">Kec. Banjarwangi &amp; Cikajang</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Topografi */}
            <div className="space-y-6">
              <h3 className="text-headline-md text-on-surface mb-2">Topografi Wilayah</h3>
              <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined icon-filled text-2xl text-primary">terrain</span>
                  </div>
                  <div>
                    <h4 className="text-headline-md text-on-surface mb-1">Gunung Cikuray</h4>
                    <p className="text-body-md text-on-surface-variant">
                      Sebagian besar wilayah kecamatan berada di kawasan lereng Gunung Cikuray,
                      salah satu gunung di Jawa Barat dengan ketinggian 2.818 mdpl.
                    </p>
                  </div>
                </div>
                <div className="border-t border-outline-variant/30 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-caption text-on-surface-variant mb-0.5">Lintang Selatan</p>
                    <p className="text-label-md font-mono text-on-surface">7&deg;20&prime;22&Prime; S</p>
                  </div>
                  <div>
                    <p className="text-caption text-on-surface-variant mb-0.5">Bujur Timur</p>
                    <p className="text-label-md font-mono text-on-surface">107&deg;48&prime;34&Prime; E</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined icon-filled text-2xl text-secondary">directions_car</span>
                  </div>
                  <div>
                    <h4 className="text-headline-md text-on-surface mb-1">Jarak ke Kota Garut</h4>
                    <p className="text-body-md text-on-surface-variant">
                      Berjarak sekitar <strong className="text-on-surface">&plusmn;25 km²</strong> dari
                      pusat Kota Garut ke arah selatan, ditempuh dalam 45&ndash;60 menit perjalanan darat.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-outline-variant/40 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-tertiary-fixed rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined icon-filled text-2xl text-tertiary">local_florist</span>
                  </div>
                  <div>
                    <h4 className="text-headline-md text-on-surface mb-1">Iklim &amp; Kesuburan</h4>
                    <p className="text-body-md text-on-surface-variant">
                      Iklim sejuk khas dataran tinggi (18&ndash;24&deg;C) mendukung
                      produktivitas pertanian: sayuran, kopi arabika, dan tanaman hias.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Desa-desa */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="Wilayah Administrasi"
            icon="holiday_village"
            title="Desa dalam Kecamatan"
            desc="Kecamatan Cigedug membawahi 5 desa dengan karakteristik dan potensi masing-masing."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured Desa Cigedug */}
            <div className="lg:col-span-4 md:col-span-2">
              <Link
                href={desaList[0].href}
                className="group flex flex-col md:flex-row bg-white rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden">
                  <Image
                    src={desaList[0].img}
                    alt={desaList[0].name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/30" />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-on-primary text-caption font-semibold px-3 py-1 rounded-full mb-4 w-fit">
                    <span className="material-symbols-outlined icon-filled text-xs">star</span>
                    Ibukota Kecamatan
                  </span>
                  <h3 className="text-headline-lg text-on-surface mb-3">Desa Cigedug</h3>
                  <p className="text-body-md text-on-surface-variant mb-5 leading-relaxed">
                    Pusat pemerintahan Kecamatan Cigedug. Di sini terdapat kantor kecamatan,
                    fasilitas pelayanan publik, dan berbagai infrastruktur pemerintahan yang
                    melayani seluruh warga kecamatan.
                  </p>
                  <div className="flex items-center gap-1.5 text-label-md text-primary">
                    <span>Lihat profil desa</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            </div>
            {/* Other 4 desa */}
            {desaList.slice(1).map(({ name, badge, badgeColor, desc, icon, href, img }) => (
              <Link
                key={name}
                href={href}
                className="group flex flex-col bg-white rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image src={img} alt={name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />
                  <span className={`absolute top-3 left-3 ${badgeColor} text-caption font-semibold px-3 py-1 rounded-full`}>{badge}</span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary-fixed rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined icon-filled text-sm text-primary">{icon}</span>
                    </div>
                    <h3 className="text-headline-md text-on-surface">{name}</h3>
                  </div>
                  <p className="text-body-md text-on-surface-variant flex-grow mb-4 leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-1 text-label-md text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span>Selengkapnya</span>
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Pemerintahan */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <SectionHeader
            label="Pemerintahan"
            icon="account_balance"
            title="Pemerintah Kabupaten Garut"
            desc="Kecamatan Cigedug berada di bawah naungan Pemerintah Kabupaten Garut."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-5 shadow-lg">
                <span className="material-symbols-outlined icon-filled text-4xl text-on-primary">person</span>
              </div>
              <p className="text-caption text-primary uppercase tracking-widest mb-1">Bupati Garut</p>
              <h3 className="text-headline-md text-on-surface mb-2">Abdusy Syakur Amin</h3>
              <p className="text-body-md text-on-surface-variant">Bupati Kabupaten Garut periode 2024&ndash;2029.</p>
            </div>
            <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-5 shadow-lg">
                <span className="material-symbols-outlined icon-filled text-4xl text-on-secondary">person</span>
              </div>
              <p className="text-caption text-secondary uppercase tracking-widest mb-1">Wakil Bupati Garut</p>
              <h3 className="text-headline-md text-on-surface mb-2">Luthfianisa Putri Karlina</h3>
              <p className="text-body-md text-on-surface-variant">Wakil Bupati Kabupaten Garut periode 2024&ndash;2029.</p>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-headline-md text-on-surface text-center mb-6">Kecamatan Sekitar di Kabupaten Garut</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {kecamatanSekitar.map((nama) => (
                <span key={nama} className="bg-white border border-outline-variant/40 text-on-surface-variant text-body-md px-4 py-2 rounded-full hover:bg-primary-fixed hover:text-primary transition-colors cursor-default">
                  {nama}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Jelajahi Lebih Lanjut</h2>
            <p className="text-body-lg text-white/70 max-w-lg">
              Temukan visi misi, sejarah, struktur organisasi, dan informasi aparatur
              Kecamatan Cigedug secara lengkap.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/profil/visi-misi"
              className="bg-white text-primary text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2"
            >
              <span>Visi &amp; Misi</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link
              href="/profil/struktur-organisasi"
              className="border-2 border-white/50 hover:border-white text-white text-label-md px-6 py-3 rounded-full transition-colors duration-200"
            >
              Struktur Organisasi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
