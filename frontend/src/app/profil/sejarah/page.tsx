import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sejarah Kecamatan Cigedug",
  description:
    "Sejarah pembentukan dan perkembangan Kecamatan Cigedug, Kabupaten Garut dari masa ke masa.",
};

const HERO_BG =
  "/images/sejarah-cikuray.png";

const subNavLinks = [
  { href: "/profil", label: "Selayang Pandang", icon: "info", active: false },
  { href: "/profil/visi-misi", label: "Visi & Misi", icon: "star", active: false },
  { href: "/profil/sejarah", label: "Sejarah", icon: "history_edu", active: true },
  { href: "/profil/struktur-organisasi", label: "Struktur Organisasi", icon: "account_tree", active: false },
  { href: "/profil/aparatur", label: "Aparatur", icon: "badge", active: false },
];

const timelineItems = [
  {
    era: "Era Kolonial",
    tahun: "Abad XIX",
    icon: "history",
    color: "bg-amber-500",
    judul: "Pembentukan Wilayah Awal",
    isi: "Wilayah Cigedug mulai dikenal sebagai kawasan pemukiman dan pertanian di lereng Gunung Cikuray pada era pemerintahan Hindia Belanda. Tanah subur dataran tinggi menarik para petani untuk bermukim dan menggarap lahan.",
  },
  {
    era: "Kemerdekaan",
    tahun: "1945 - 1960",
    icon: "flag",
    color: "bg-red-500",
    judul: "Masa Kemerdekaan Indonesia",
    isi: "Pasca kemerdekaan Indonesia, wilayah Cigedug mulai tertata secara administratif sebagai bagian dari Kabupaten Garut. Masyarakat bahu-membahu membangun pemerintahan desa dan kecamatan yang mandiri.",
  },
  {
    era: "Orde Lama",
    tahun: "1960 - 1965",
    icon: "account_balance",
    color: "bg-orange-500",
    judul: "Penetapan Batas Administratif",
    isi: "Pemerintah menetapkan batas-batas administratif kecamatan secara resmi. Kecamatan Cigedug mulai memiliki kantor pemerintahan tersendiri dan melayani warga 5 desa yang berada dalam lingkup wilayahnya.",
  },
  {
    era: "Orde Baru",
    tahun: "1966 - 1998",
    icon: "construction",
    color: "bg-green-600",
    judul: "Pembangunan Infrastruktur",
    isi: "Era Orde Baru membawa banyak pembangunan fisik: jalan desa, irigasi pertanian, fasilitas pendidikan, dan puskesmas. Pertanian menjadi tulang punggung ekonomi warga dengan komoditas sayuran dan kopi arabika sebagai unggulan.",
  },
  {
    era: "Reformasi",
    tahun: "2001",
    icon: "public",
    color: "bg-blue-600",
    judul: "Pemekaran Kecamatan",
    isi: "Kecamatan Cigedug yang awalnya merupakan bagian dari Kecamatan Bayongbong resmi memekar dan menjadi kecamatan sendiri pada sekitar tahun 2001. Mulai dari tahun tersebut, pembangunan dan perbaikan fasilitas terus digalakkan hingga ke daerah pelosok.",
  },
  {
    era: "Modern",
    tahun: "2011 - Sekarang",
    icon: "devices",
    color: "bg-primary",
    judul: "Era Digitalisasi & Smart Village",
    isi: "Kecamatan Cigedug bertransformasi menuju pemerintahan berbasis digital. Pelayanan publik dimodernisasi, UMkm² dikembangkan, dan potensi wisata alam serta agrowisata mulai diperkenalkan kepada masyarakat luas.",
  },
];

const faktaMenarik = [
  { icon: "mosque", judul: "Pusat Pesantren", isi: "Kecamatan Cigedug merupakan kecamatan yang paling banyak terdapat Pesantren di seluruh Kabupaten Garut." },
  { icon: "map", judul: "Pemekaran 2001", isi: "Cigedug secara resmi memekar dari Kecamatan Bayongbong menjadi kecamatan mandiri pada tahun 2001." },
  { icon: "storefront", judul: "Agribisnis & Perdagangan", isi: "Mata pencaharian warga Cigedug mayoritas bertumpu pada sektor agribisnis dan perdagangan." },
  { icon: "landscape", judul: "Kawasan Luas", isi: "Memiliki luas wilayah sekitar 3.750 Hektar yang menaungi 5 desa/kelurahan di dataran tinggi." },
];

export default function SejarahPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${HERO_BG}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/60 to-on-surface/20" />
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
            <a href="/profil" className="hover:text-white transition-colors">Selayang Pandang</a>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Sejarah</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">history_edu</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">Perjalanan Waktu</span>
          </div>
          <h1 className="text-display-lg text-white mb-4 max-w-2xl">
            Sejarah Kecamatan<br />
            <span className="text-primary-fixed-dim">Cigedug</span>
          </h1>
          <p className="text-body-lg text-white/75 max-w-xl leading-relaxed">
            Menelusuri jejak perjalanan Kecamatan Cigedug dari masa ke masa,
            dari kawasan pertanian tradisional menuju kecamatan modern yang inovatif.
          </p>
        </div>
      </section>

      {/* Sub-Nav */}
      <div className="bg-white border-b border-outline-variant sticky top-16 z-40 shadow-sm">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <nav className="flex overflow-x-auto gap-1 py-2">
            {subNavLinks.map(({ href, label, icon, active }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-label-md whitespace-nowrap transition-all duration-150 ${
                  active
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

      {/* Pengantar */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
                <span className="material-symbols-outlined icon-filled text-sm">auto_stories</span>
                Tentang Cigedug
              </span>
              <h2 className="text-headline-lg text-on-surface mb-6">Sejarah Daerah</h2>
              <div className="space-y-4 text-body-md text-on-surface-variant leading-relaxed">
                <p>
                  Cigedug adalah sebuah daerah yang awalnya masuk kepada kecamatan Bayongbong, tetapi sekitar pada tahun 2001-an Cigedug memekar membuat kecamatan sendiri. Selama beberapa tahun ini, kecamatan Cigedug terus menerus memperbaiki fasilitas-fasilitas di daerah, bahkan sampai ke daerah pelosok.
                </p>
                <p>
                  Alamat Kantor Kecamatan Cigedug terletak di Jl. Raya Cigedug No.1 Kp. Cigedug Tonggoh RT/RW. 03/09 Ds. Cigedug Telp.(0262) 577269 Cigedug - Garut.
                </p>
                <p>
                  Luas wilayah daerah Cigedug yaitu sekitar 3.750 Ha secara keseluruhan dan mempunya 5 (lima) Desa/Kelurahan, di antaranya: Kelurahan/Desa Barusuda, Cigedug, Cintanagara (Cintanaara), Sindangsari, dan Sukahurip. Dengan jumlah penduduk sekitar 34.936 lebih. Kode Pos Kecamatan yaitu 44116.
                </p>
                <p>
                  Mata pencaharian Cigedug mayoritas Agribisnis sama perdagangan, serta Kecamatan Cigedug adalah kecamatan yang paling banyak terdapat Pesantren di seluruh Kabupaten Garut.
                </p>
                <p className="pt-2 italic text-sm text-outline-variant/80 font-medium">
                  Oleh: Muhamad Raihan Al Mutawaqin
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image src="/images/sejarah-cikuray.png" alt="Gunung Cikuray Tempo Dulu" fill unoptimized className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5 border border-outline-variant/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined icon-filled text-2xl text-white">history_edu</span>
                  </div>
                  <div>
                    <p className="text-headline-md text-on-surface font-bold">Abad XIX</p>
                    <p className="text-label-md text-on-surface-variant">Awal pemukiman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">timeline</span>
              Kronologi
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">Perjalanan Sejarah</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Tonggak-tonggak penting dalam perkembangan Kecamatan Cigedug dari masa ke masa.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-outline-variant/50 -translate-x-1/2" />

            <div className="space-y-12">
              {timelineItems.map(({ era, tahun, icon, color, judul, isi }, i) => (
                <div key={tahun} className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 ${color} rounded-full flex items-center justify-center shadow-lg z-10 shrink-0`}>
                    <span className="material-symbols-outlined icon-filled text-xl text-white">{icon}</span>
                  </div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 ${i % 2 === 0 ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"} w-full`}>
                    <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-caption font-bold uppercase tracking-widest px-2 py-0.5 rounded text-white ${color}`}>
                          {era}
                        </span>
                      </div>
                      <p className="text-label-md text-on-surface-variant mb-2">{tahun}</p>
                      <h3 className="text-headline-md text-on-surface mb-3">{judul}</h3>
                      <p className="text-body-md text-on-surface-variant leading-relaxed">{isi}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fakta Menarik */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">lightbulb</span>
              Tahukah Anda?
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">Fakta Menarik Cigedug</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Hal-hal unik yang menjadi keistimewaan Kecamatan Cigedug.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faktaMenarik.map(({ icon, judul, isi }) => (
              <div key={judul} className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined icon-filled text-2xl text-primary">{icon}</span>
                </div>
                <h3 className="text-headline-md text-on-surface mb-3">{judul}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{isi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Kenali Organisasi Kami</h2>
            <p className="text-body-lg text-white/70 max-w-lg">
              Lihat struktur organisasi dan aparatur yang mengelola Kecamatan Cigedug saat ini.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/profil/struktur-organisasi" className="bg-white text-primary text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2">
              <span>Struktur Organisasi</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link href="/profil/aparatur" className="border-2 border-white/50 hover:border-white text-white text-label-md px-6 py-3 rounded-full transition-colors duration-200">
              Aparatur Kecamatan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
