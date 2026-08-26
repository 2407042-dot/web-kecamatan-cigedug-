import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visi & Misi - Kecamatan Cigedug",
  description:
    "Visi dan Misi Kecamatan Cigedug, Kabupaten Garut dalam mewujudkan tata kelola pemerintahan yang baik dan masyarakat sejahtera.",
};

const subNavLinks = [
  { href: "/profil", label: "Selayang Pandang", icon: "info", active: false },
  { href: "/profil/visi-misi", label: "Visi & Misi", icon: "star", active: true },
  { href: "/profil/sejarah", label: "Sejarah", icon: "history_edu", active: false },
  { href: "/profil/struktur-organisasi", label: "Struktur Organisasi", icon: "account_tree", active: false },
  { href: "/profil/aparatur", label: "Aparatur", icon: "badge", active: false },
];

const misiList = [
  {
    no: "01",
    icon: "school",
    title: "Sumber Daya Manusia",
    desc: "Mewujudkan sumber daya manusia yang berbudaya, berdaya saing, dan adaftif",
  },
  {
    no: "02",
    icon: "groups",
    title: "Kualitas Hidup",
    desc: "Meningkatkan kualitas hidup masyarakat yang bermartabat dan inklusif",
  },
  {
    no: "03",
    icon: "trending_up",
    title: "Kemandirian Ekonomi",
    desc: "Mewujudkan kemandirian ekonomi berbasis nilai tambah sektor unggulan lokal yang berkelanjutan",
  },
  {
    no: "04",
    icon: "health_and_safety",
    title: "Penanggulangan Kemiskinan",
    desc: "Memperkuat upaya penanggulangan kemiskinan",
  },
  {
    no: "05",
    icon: "gavel",
    title: "Tata Kelola Pemerintahan",
    desc: "Mewujudkan tata kelola pemerintah yang baik, bersih, dan inovatif dengan layanan publik yang inklusif",
  },
  {
    no: "06",
    icon: "construction",
    title: "Infrastruktur & Pembangunan",
    desc: "Mewujudkan pemerataan kualitas infrastruktur dan percepatan pembangunan kawasan perdesaan dan penataan kawasan perkotaan",
  },
  {
    no: "07",
    icon: "eco",
    title: "Kelestarian Lingkungan",
    desc: "Mewujudkan kelestarian pemanfaatan sumber daya alam dan lingkungan yang berbasis daya dukung, fungsi ruang, dan penanggulangan bencana",
  },
  {
    no: "08",
    icon: "diversity_3",
    title: "Kesalehan & Ketertiban Sosial",
    desc: "Mewujudkan kesalehan sosial, kerukunan antar umat beragama, ketentraman dan ketertiban umum, serta perlindungan masyarakat",
  },
];

const nilaiOrganisasi = [
  { icon: "verified", label: "Integritas", desc: "Jujur, bertanggung jawab, dan konsisten dalam setiap tindakan" },
  { icon: "handshake", label: "Kolaborasi", desc: "Bekerja sama dengan semua pihak demi kepentingan masyarakat" },
  { icon: "rocket_launch", label: "Inovasi", desc: "Terus berinovasi dalam pelayanan publik yang lebih baik" },
  { icon: "favorite", label: "Pelayanan Prima", desc: "Mengutamakan kepuasan dan kebutuhan masyarakat" },
];

export default function VisiMisiPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/visi-misi-cigedug.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/30" />
        </div>
        <div
          className="absolute inset-0 opacity-5 z-0"
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
            <span className="text-white">Visi &amp; Misi</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">star</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">Arah &amp; Tujuan</span>
          </div>
          <h1 className="text-display-lg text-white mb-4 max-w-2xl">
            Visi &amp; Misi<br />
            <span className="text-primary-fixed-dim">Kecamatan Cigedug</span>
          </h1>
          <p className="text-body-lg text-white/75 max-w-xl leading-relaxed">
            Landasan arah pembangunan dan penyelenggaraan pemerintahan
            Kecamatan Cigedug untuk mewujudkan masyarakat yang maju dan sejahtera.
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

      {/* Visi */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full">
                <span className="material-symbols-outlined icon-filled text-sm">visibility</span>
                Visi
              </span>
            </div>
            <h2 className="text-headline-lg text-on-surface text-center mb-12">Visi Kecamatan Cigedug</h2>

            {/* Visi statement card */}
            <div className="relative bg-primary rounded-3xl p-10 md:p-14 text-center overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                  backgroundSize: "30px 30px",
                }}
              />
              <span className="material-symbols-outlined icon-filled text-5xl text-primary-fixed-dim mb-6 block">
                format_quote
              </span>
              <blockquote className="text-headline-lg text-white leading-relaxed mb-6">
                &ldquo;Terwujudnya Garut Hebat dan Berkelanjutan&rdquo;
              </blockquote>
              <div className="w-16 h-1 bg-primary-fixed-dim mx-auto rounded-full" />
            </div>

            {/* Makna visi */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { kata: "Garut", icon: "location_city", makna: "Merupakan wilayah kabupaten Garut yang menjadi fokus utama dalam setiap pembangunan dan pelayanan." },
                { kata: "Hebat", icon: "star", makna: "Mencerminkan keunggulan dalam sumber daya manusia, tata kelola pemerintahan, dan kemandirian ekonomi." },
                { kata: "Berkelanjutan", icon: "eco", makna: "Pembangunan yang memperhatikan kelestarian lingkungan dan kesejahteraan masyarakat secara terus-menerus." },
              ].map(({ kata, icon, makna }) => (
                <div key={kata} className="bg-white border border-outline-variant/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined icon-filled text-2xl text-primary">{icon}</span>
                  </div>
                  <h3 className="text-headline-md text-primary mb-2">{kata}</h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{makna}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">flag</span>
              Misi
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">Misi Kecamatan Cigedug</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Delapan misi strategis sebagai penjabaran operasional dari visi yang ingin dicapai.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misiList.map(({ no, icon, title, desc }) => (
              <div key={no} className="group bg-white rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-7 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 bg-primary-fixed rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <span className="material-symbols-outlined icon-filled text-2xl text-primary group-hover:text-on-primary transition-colors duration-300">{icon}</span>
                  </div>
                  <span className="text-display-lg text-outline-variant/50 font-bold leading-none">{no}</span>
                </div>
                <h3 className="text-headline-md text-on-surface mb-3">{title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed flex-grow">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai Organisasi */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">diamond</span>
              Nilai-Nilai
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">Nilai Organisasi</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Prinsip-prinsip yang menjadi landasan perilaku aparatur dalam melayani masyarakat.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nilaiOrganisasi.map(({ icon, label, desc }) => (
              <div key={label} className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-7 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  <span className="material-symbols-outlined icon-filled text-3xl text-on-primary">{icon}</span>
                </div>
                <h3 className="text-headline-md text-on-surface mb-2">{label}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Kenali Lebih Jauh</h2>
            <p className="text-body-lg text-white/70 max-w-lg">
              Pelajari sejarah, struktur organisasi, dan aparatur yang menjalankan visi misi kecamatan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/profil/sejarah" className="bg-white text-primary text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2">
              <span>Sejarah Kecamatan</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
            <Link href="/profil/struktur-organisasi" className="border-2 border-white/50 hover:border-white text-white text-label-md px-6 py-3 rounded-full transition-colors duration-200">
              Struktur Organisasi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
