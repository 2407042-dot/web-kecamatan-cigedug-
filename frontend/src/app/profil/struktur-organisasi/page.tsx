import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Struktur Organisasi - Kecamatan Cigedug",
  description:
    "Struktur organisasi pemerintahan Kecamatan Cigedug, Kabupaten Garut beserta nama pejabat dan staf.",
};

const subNavLinks = [
  { href: "/profil", label: "Selayang Pandang", icon: "info", active: false },
  { href: "/profil/visi-misi", label: "Visi & Misi", icon: "star", active: false },
  { href: "/profil/sejarah", label: "Sejarah", icon: "history_edu", active: false },
  { href: "/profil/struktur-organisasi", label: "Struktur Organisasi", icon: "account_tree", active: true },
  { href: "/profil/aparatur", label: "Aparatur", icon: "badge", active: false },
];

// ─── Tipe data ─────────────────────────────────────────────────────────────────
type JabatanCard = {
  jabatan: string;
  nama: string;
  nip?: string;
  staf?: { jabatan: string; nama: string; nip?: string }[];
};

// ─── Data Sekretariat ──────────────────────────────────────────────────────────
const kasubbagList: JabatanCard[] = [
  {
    jabatan: "Kasubbag Keuangan dan BMD",
    nama: "Ahmad Rualudin, S.IP",
    nip: "198003282006041010",
    staf: [
      { jabatan: "Bendahara", nama: "Inan Sutandi", nip: "197607152007011009" },
      { jabatan: "Pengelola BMD", nama: "Wawan Gunawan, S.IP", nip: "197806032009011011" },
    ],
  },
  {
    jabatan: "Kasubbag Perencanaan & Evlap",
    nama: "Siti Jaenab, S.IP. M.SI",
    nip: "197409032006042006",
    staf: [
      { jabatan: "Penata Layanan Operasional", nama: "Fitriana, SE", nip: "197708252014112003" },
      { jabatan: "Pranata Kelola Sistem Informasi", nama: "Surita Farida, S.T", nip: "197409032006042006" },
    ],
  },
];

// ─── Data Kasi ─────────────────────────────────────────────────────────────────
const kasiList: JabatanCard[] = [
  {
    jabatan: "Kasi Pemerintahan",
    nama: "Iim Ibrahim, S.IP",
    nip: "196904092008011000",
    staf: [
      { jabatan: "Pengadministrasian Perkantoran", nama: "Arip Hidayat Soleh", nip: "198208172021211011" },
    ],
  },
  {
    jabatan: "Kasi Pelayanan",
    nama: "Aay, SE",
    nip: "197709152014081002",
    staf: [
      { jabatan: "Operator SIAK", nama: "Mulyana, S.IP" },
      { jabatan: "Operator SIAK", nama: "Jajang Iwan" },
    ],
  },
  {
    jabatan: "Kasi Pemb. Masyarakat Desa",
    nama: "Nolis Hertika, S.IP",
    nip: "197409152008012010",
    staf: [],
  },
  {
    jabatan: "Kasi Kesejahteraan Masyarakat",
    nama: "-", // No name in the box (red block)
    nip: "-",
    staf: [
      { jabatan: "Penata Layanan Operasional", nama: "Heri Permana, S.Sos", nip: "197503021997011001" },
    ],
  },
  {
    jabatan: "Kasi Trantibum",
    nama: "Tajpudin",
    nip: "197402271994031008",
    staf: [
      { jabatan: "Satpol PP", nama: "Nendang Kurnia, S.IP" },
    ],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function OrgCard({
  jabatan,
  nama,
  nip,
  color = "bg-primary",
  textColor = "text-on-primary",
  size = "md",
  icon = "person",
  fotoUrl = "",
}: {
  jabatan: string;
  nama: string;
  nip?: string;
  color?: string;
  textColor?: string;
  size?: "lg" | "md" | "sm";
  icon?: string;
  fotoUrl?: string;
}) {
  const padding = size === "lg" ? "p-4" : size === "sm" ? "p-2.5" : "p-3";
  const nameSize = size === "lg" ? "text-title-lg" : size === "sm" ? "text-label-md" : "text-title-md";
  const jabatanSize = size === "sm" ? "text-[10px]" : "text-[11px]";
  const photoSize = size === "lg" ? "w-16 h-20" : size === "sm" ? "w-10 h-12" : "w-12 h-16";
  const iconSize = size === "lg" ? "text-lg" : size === "sm" ? "text-sm" : "text-base";

  return (
    <div className={`${color} ${padding} rounded-xl shadow-md min-w-[210px] max-w-[280px] flex items-center gap-3 text-left`}>
      <div className={`${photoSize} shrink-0 bg-black/10 rounded-lg flex items-center justify-center overflow-hidden border border-white/20`}>
        {fotoUrl ? (
          <img src={fotoUrl} alt={nama} className="w-full h-full object-cover" />
        ) : (
          <span className={`material-symbols-outlined icon-filled ${textColor} opacity-40 text-3xl`}>account_circle</span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-1 mb-1">
          <span className={`material-symbols-outlined icon-filled ${textColor} ${iconSize}`}>{icon}</span>
          <p className={`${jabatanSize} ${textColor} opacity-90 uppercase tracking-widest truncate`}>{jabatan}</p>
        </div>
        <p className={`${nameSize} ${textColor} font-bold leading-tight line-clamp-2`}>{nama}</p>
        {nip && <p className={`text-[10px] ${textColor} opacity-75 mt-1 truncate`}>NIP. {nip}</p>}
      </div>
    </div>
  );
}

function StafCard({ jabatan, nama, nip }: { jabatan: string; nama: string; nip?: string }) {
  return (
    <div className="bg-surface-container-high border border-outline-variant/60 rounded-lg px-3 py-2 text-center min-w-[120px] max-w-[160px]">
      <span className="material-symbols-outlined icon-filled text-base text-on-surface-variant block mb-0.5">person</span>
      <p className="text-[10px] text-on-surface-variant uppercase tracking-wide leading-tight mb-0.5">{jabatan}</p>
      <p className="text-caption text-on-surface font-semibold leading-tight">{nama}</p>
      {nip && <p className="text-[9px] text-on-surface-variant mt-0.5">NIP. {nip}</p>}
    </div>
  );
}

function VLine({ h = "h-8" }: { h?: string }) {
  return <div className={`w-1 ${h} bg-outline-variant mx-auto shrink-0`} />;
}

function HLine() {
  return <div className="h-1 bg-outline-variant flex-1 shrink-0" />;
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function StrukturOrganisasiPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative w-full min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/aparatur.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-container/80 to-inverse-surface/80" />
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
            <span className="text-white">Struktur Organisasi</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="material-symbols-outlined icon-filled text-sm text-tertiary-fixed-dim">account_tree</span>
            <span className="text-label-md text-white/90 tracking-widest uppercase">Tata Kelola</span>
          </div>
          <h1 className="text-display-lg text-white mb-4 max-w-2xl">
            Struktur Organisasi<br />
            <span className="text-primary-fixed-dim">Kecamatan Cigedug</span>
          </h1>
          <p className="text-body-lg text-white/75 max-w-xl leading-relaxed">
            Susunan organisasi dan tata kerja Kecamatan Cigedug berdasarkan Peraturan Bupati
            Garut Nomor 111 Tahun 2020.
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

      {/* ── Bagan Struktur Organisasi ────────────────────────────────────────── */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">account_tree</span>
              Bagan Organisasi
            </span>
            <h2 className="text-headline-lg text-on-surface mb-2">Susunan Organisasi</h2>
            <p className="text-body-md text-on-surface-variant">
              Peraturan Bupati Garut Nomor 111 Tahun 2020
            </p>
          </div>

          {/* ──── Bagan ──── */}
          <div className="overflow-x-auto pb-6">
            <div className="min-w-[1200px] flex flex-col items-center gap-0">
              
              {/* ── Level 1: CAMAT ── */}
              <OrgCard
                jabatan="Camat"
                nama="Ma'mun Gunawan, S.Ag. A.Kp"
                nip="197409252009021001"
                color="bg-primary"
                textColor="text-on-primary"
                size="lg"
                icon="manage_accounts"
              />
              <VLine h="h-8" />
              
              {/* ── Level 2: KJF & SEKCAM Split ── */}
              <div className="flex items-stretch justify-center w-[1200px] relative">
                {/* Horizontal Bar connecting KJF and SEKCAM */}
                <div className="absolute top-0 left-[123px] w-[754px] h-1 bg-outline-variant" />
                
                {/* KJF (Left) */}
                <div className="flex flex-col items-center w-[250px]">
                  <VLine h="h-8" />
                  <div className="bg-surface-container-high border-2 border-dashed border-outline rounded-xl px-5 py-3 text-center w-full">
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wide leading-tight">Kelompok</p>
                    <p className="text-label-md text-on-surface font-bold leading-tight">Jabatan Fungsional</p>
                  </div>
                </div>
                
                {/* Center continuation line to Kasi */}
                <div className="w-[300px] flex justify-center shrink-0">
                  <div className="w-1 min-h-[300px] h-full bg-outline-variant" />
                </div>
                
                {/* SEKCAM (Right) */}
                <div className="flex flex-col items-center w-[650px]">
                  <VLine h="h-8" />
                  <OrgCard
                    jabatan="Sekretaris Kecamatan"
                    nama="Kanda, SE"
                    nip="197502032007011007"
                    color="bg-secondary"
                    textColor="text-on-secondary"
                    size="md"
                    icon="person_4"
                  />
                  <VLine h="h-8" />
                  
                  {/* Kasubbags */}
                  <div className="flex flex-col items-center w-[650px] relative pb-4">
                    <div className="absolute top-0 left-[152.5px] w-[345px] h-1 bg-outline-variant" />
                    <div className="flex justify-between w-full gap-8">
                      
                      <div className="flex-1 flex flex-col items-center px-1">
                        <VLine h="h-6" />
                        <OrgCard jabatan={kasubbagList[0].jabatan} nama={kasubbagList[0].nama} nip={kasubbagList[0].nip} size="sm" color="bg-blue-600" textColor="text-white" icon="manage_history" />
                        <VLine h="h-6" />
                        <div className="flex gap-6">
                          {kasubbagList[0].staf?.map((s, i) => (
                            <StafCard key={i} jabatan={s.jabatan} nama={s.nama} nip={s.nip} />
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center px-1">
                        <VLine h="h-6" />
                        <OrgCard jabatan={kasubbagList[1].jabatan} nama={kasubbagList[1].nama} nip={kasubbagList[1].nip} size="sm" color="bg-blue-600" textColor="text-white" icon="manage_history" />
                        <VLine h="h-6" />
                        <div className="flex gap-6">
                          {kasubbagList[1].staf?.map((s, i) => (
                            <StafCard key={i} jabatan={s.jabatan} nama={s.nama} nip={s.nip} />
                          ))}
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ── Level 3: Kasi ── */}
              {/* The center line reached this point */}
              <div className="flex w-[1200px] items-center justify-center">
                <div className="h-1 bg-outline-variant w-[897px]" />
              </div>

              <div className="flex items-start justify-center gap-4 w-[1100px] mt-0">
                {kasiList.map(({ jabatan, nama, nip, staf }) => (
                  <div key={jabatan} className="flex flex-col items-center gap-0 flex-1">
                    <VLine h="h-8" />
                    <OrgCard
                      jabatan={jabatan}
                      nama={nama === "-" ? "" : nama}
                      nip={nip === "-" ? undefined : nip}
                      color={nama === "-" ? "bg-error" : "bg-inverse-surface"}
                      textColor={nama === "-" ? "text-error" : "text-inverse-on-surface"}
                      size="sm"
                      icon={nama === "-" ? "warning" : "person_outline"}
                    />
                    {staf && staf.length > 0 && (
                      <>
                        <VLine h="h-6" />
                        <div className="flex flex-col gap-2 items-center">
                          {staf.map((s, i) => (
                            <StafCard key={i} jabatan={s.jabatan} nama={s.nama} nip={s.nip} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── Sekretariat Sub-chart ── */}
          <div className="mt-12 bg-surface-container-low rounded-3xl p-8 border border-outline-variant/40">
            <h3 className="text-headline-md text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined icon-filled text-secondary text-xl">edit_note</span>
              Detail Sekretariat
            </h3>
            <div className="flex flex-col items-center gap-0">
              <OrgCard
                jabatan="Sekretaris Kecamatan"
                nama="Kanda, SE"
                nip="197502032007011007"
                color="bg-secondary"
                textColor="text-on-secondary"
                size="md"
                icon="person_4"
              />
              <VLine h="h-8" />
              {/* Horizontal bar */}
              <div className="h-1 bg-outline-variant w-[520px]" />
              <div className="flex gap-16 mt-0">
                {kasubbagList.map(({ jabatan, nama, nip, staf }) => (
                  <div key={jabatan} className="flex flex-col items-center gap-0">
                    <VLine h="h-8" />
                    <OrgCard
                      jabatan={jabatan}
                      nama={nama}
                      nip={nip}
                      color="bg-blue-600"
                      textColor="text-white"
                      size="sm"
                      icon="manage_history"
                    />
                    {staf && staf.length > 0 && (
                      <>
                        <VLine h="h-6" />
                        <div className="flex flex-col gap-2 items-center">
                          {staf.map((s, i) => (
                            <StafCard key={i} jabatan={s.jabatan} nama={s.nama} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-caption text-on-surface-variant italic text-center mt-4">
            * Berdasarkan Peraturan Bupati Garut Nomor 111 Tahun 2020
          </p>
        </div>
      </section>

      {/* ── Daftar Pejabat Card Grid ─────────────────────────────────────────── */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-label-md text-primary bg-primary-fixed px-4 py-1 rounded-full mb-4">
              <span className="material-symbols-outlined icon-filled text-sm">groups</span>
              Pejabat Struktural
            </span>
            <h2 className="text-headline-lg text-on-surface mb-3">Daftar Pejabat</h2>
            <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">
              Pejabat struktural yang bertugas di Kecamatan Cigedug.
            </p>
          </div>

          {/* Camat & Sekretaris */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { jabatan: "Camat", nama: "Ma'mun Gunawan, S.Ag. A.Kp", nip: "197409252009032001", icon: "manage_accounts", color: "bg-primary", text: "text-on-primary" },
              { jabatan: "Sekretaris Kecamatan", nama: "Kanda, SE", nip: "197502032007011007", icon: "person_4", color: "bg-secondary", text: "text-on-secondary" },
            ].map(({ jabatan, nama, nip, icon, color, text }) => (
              <div key={jabatan} className={`${color} rounded-2xl p-6 flex items-center gap-5 shadow-md`}>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined icon-filled text-3xl ${text}`}>{icon}</span>
                </div>
                <div>
                  <p className={`text-caption ${text} opacity-70 uppercase tracking-widest mb-0.5`}>{jabatan}</p>
                  <p className={`text-headline-md ${text} font-bold`}>{nama}</p>
                  <p className={`text-label-md ${text} opacity-60 mt-0.5`}>NIP. {nip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Kasubbag */}
          <h3 className="text-headline-md text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined icon-filled text-blue-600">manage_history</span>
            Sub Bagian
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {kasubbagList.map(({ jabatan, nama, nip, staf }) => (
              <div key={jabatan} className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
                <div className="bg-blue-600 px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined icon-filled text-xl text-white">manage_history</span>
                  </div>
                  <div>
                    <p className="text-label-md text-white font-bold">{jabatan}</p>
                    <p className="text-caption text-white/80">{nama}</p>
                    {nip && <p className="text-[10px] text-white/60">NIP. {nip}</p>}
                  </div>
                </div>
                {staf && staf.length > 0 && (
                  <div className="divide-y divide-outline-variant/30">
                    {staf.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3">
                        <span className="material-symbols-outlined icon-filled text-sm text-outline">person</span>
                        <div>
                          <p className="text-caption text-on-surface-variant">{s.jabatan}</p>
                          <p className="text-label-md text-on-surface font-semibold">{s.nama}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Kasi */}
          <h3 className="text-headline-md text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined icon-filled text-on-surface-variant">person_outline</span>
            Kepala Seksi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kasiList.map(({ jabatan, nama, nip, staf }) => (
              <div key={jabatan} className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
                <div className="bg-inverse-surface px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined icon-filled text-xl text-inverse-on-surface">person</span>
                  </div>
                  <div>
                    <p className="text-label-md text-inverse-on-surface font-bold">{jabatan}</p>
                    <p className="text-caption text-inverse-on-surface/70">{nama}</p>
                    {nip && <p className="text-[10px] text-inverse-on-surface/50">NIP. {nip}</p>}
                  </div>
                </div>
                {staf && staf.length > 0 && (
                  <div className="divide-y divide-outline-variant/30">
                    {staf.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 px-5 py-3">
                        <span className="material-symbols-outlined icon-filled text-sm text-outline">person</span>
                        <div>
                          <p className="text-caption text-on-surface-variant">{s.jabatan}</p>
                          <p className="text-label-md text-on-surface font-semibold">{s.nama}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {(!staf || staf.length === 0) && (
                  <div className="px-5 py-3 text-body-md text-on-surface-variant italic">
                    &mdash; Tidak ada staf yang tercatat
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-headline-lg text-white mb-2">Kenali Aparatur Kami</h2>
            <p className="text-body-lg text-white/70 max-w-lg">
              Lihat profil lengkap aparatur yang mengisi jabatan di Kecamatan Cigedug.
            </p>
          </div>
          <Link
            href="/profil/aparatur"
            className="bg-white text-primary text-label-md px-6 py-3 rounded-full font-bold hover:bg-primary-fixed transition-colors duration-200 flex items-center gap-2"
          >
            <span>Aparatur Kecamatan</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
