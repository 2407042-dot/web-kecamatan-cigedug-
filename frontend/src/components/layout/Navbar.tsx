"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// ─── Navigation Data ──────────────────────────────────────────────────────────

type NavItem = {
  href: string;
  label: string;
  subItems?: { href: string; label: string; external?: boolean }[];
};

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/profil",
    label: "Selayang Pandang",
    subItems: [
      { href: "/profil", label: "Profil Kecamatan" },
      { href: "/profil/visi-misi", label: "Visi & Misi" },
      { href: "/profil/sejarah", label: "Sejarah Kecamatan" },
      { href: "/profil/struktur-organisasi", label: "Struktur Organisasi" },
      { href: "/profil/aparatur", label: "Aparatur Kecamatan" },
    ],
  },
  {
    href: "/desa",
    label: "Desa",
    subItems: [
      { href: "/desa/cigedug", label: "Desa Cigedug" },
      { href: "/desa/barusuda", label: "Desa Barusuda" },
      { href: "/desa/cintanagara", label: "Desa Cintanagara" },
      { href: "/desa/sindangsari", label: "Desa Sindangsari" },
      { href: "/desa/sukahurip", label: "Desa Sukahurip" },
    ],
  },
  {
    href: "/pelayanan",
    label: "Pelayanan",
    subItems: [
      { href: "/pelayanan", label: "Pelayanan Publik" },
      { href: "/pelayanan/pengaduan", label: "Pengaduan Masyarakat" },
    ],
  },
  {
    href: "/inovasi",
    label: "Inovasi",
  },
  {
    href: "/media",
    label: "Media Informasi",
    subItems: [
      { href: "/berita", label: "Berita" },
      { href: "/pengumuman", label: "Pengumuman" },
      { href: "/agenda", label: "Agenda Kegiatan" },
      { href: "/galeri", label: "Galeri Foto" },
      { href: "/potensi", label: "Potensi Daerah" },
      { href: "/penghargaan", label: "Penghargaan" },
    ],
  },
  {
    href: "/data",
    label: "Data",
    subItems: [
      { href: "/data", label: "Portal Satu Data" },
      { href: "/data/umkm", label: "Data UMKM" },
      { href: "/data/pendidikan", label: "Data Pendidikan" },
      { href: "/data/kesehatan", label: "Data Kesehatan" },
      { href: "/data/fasilitas-umum", label: "Fasilitas Umum" },
      { href: "/data/infografis", label: "Infografis & Statistik" },
      { href: "/data/dataset", label: "Unduh Dataset" },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav className="bg-surface dark:bg-surface-container-highest border-b border-outline-variant dark:border-outline shadow-sm sticky top-0 z-50 w-full">
      <div className="w-full px-6 md:px-10 lg:px-16 flex items-center h-16 gap-4">

        {/* ── Brand ── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 opacity-100 hover:opacity-80 transition-opacity duration-200"
        >
          {/* Logo Garut */}
          <Image
            src="/logo-garut.png"
            alt="Logo Pemerintah Kabupaten Garut"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
          />
          {/* Logo Pinunjul */}
          <Image
            src="/logo-pinunjul.png"
            alt="Cigedug Unggul Pinunjul"
            width={80}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <div className="flex flex-col border-l-2 border-outline-variant pl-3 whitespace-nowrap">
            <span className="text-caption text-primary dark:text-primary-fixed-dim uppercase tracking-wider leading-tight">
              Pemerintah Kabupaten Garut
            </span>
            <span className="text-label-md font-bold text-primary dark:text-primary-fixed-dim leading-tight">
              Kecamatan Cigedug
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-1">
          {navLinks.map(({ href, label, subItems }) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => setOpenMenu(label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {/* Nav item button */}
              <Link
                href={href}
                className="flex items-center gap-0.5 px-3 py-2 rounded-lg text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:text-outline-variant dark:hover:text-primary-fixed-dim transition-colors duration-150 whitespace-nowrap"
              >
                {label}
                {subItems && (
                  <span
                    className={`material-symbols-outlined text-base transition-transform duration-200 ${openMenu === label ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                )}
              </Link>

              {/* Dropdown panel */}
              {subItems && openMenu === label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white dark:bg-surface-container-highest rounded-xl shadow-xl border border-outline-variant/50 py-2 min-w-52 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-150">
                  {/* Pointer triangle */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-surface-container-highest border-l border-t border-outline-variant/50 rotate-45" />
                    <div className="flex flex-col py-2">
                      {subItems.map(({ href: subHref, label: subLabel, external }) => (
                        external ? (
                          <a
                            key={subHref}
                            href={subHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                          >
                            <span className="material-symbols-outlined icon-filled text-sm text-outline">
                              chevron_right
                            </span>
                            {subLabel}
                            <span className="material-symbols-outlined text-[12px] ml-auto text-outline">open_in_new</span>
                          </a>
                        ) : (
                          <Link
                            key={subHref}
                            href={subHref}
                            className="flex items-center gap-2 px-4 py-2.5 text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                          >
                            <span className="material-symbols-outlined icon-filled text-sm text-outline">
                              chevron_right
                            </span>
                            {subLabel}
                          </Link>
                        )
                      ))}
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Desktop Actions ── */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari..."
              className="bg-surface-container-low border border-outline-variant rounded-full py-1.5 pl-4 pr-9 text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-32 focus:w-48 duration-300"
            />
            <span className="material-symbols-outlined absolute right-2.5 top-2 text-on-surface-variant text-lg">
              search
            </span>
          </div>

          {/* Pelayanan Online */}
          <Link
            href="/pelayanan"
            className="bg-primary hover:bg-primary-container text-on-primary text-label-md py-1.5 px-4 rounded-full transition-colors duration-200 shadow-sm whitespace-nowrap"
          >
            Pelayanan Online
          </Link>

          {/* Login */}
          <Link
            href="/admin/login"
            className="text-primary text-label-md hover:bg-surface-container py-1.5 px-3 rounded-full transition-colors duration-200"
          >
            Login
          </Link>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden ml-auto text-on-surface-variant p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant shadow-md">
          {navLinks.map(({ href, label, subItems }) => (
            <div key={label} className="border-b border-outline-variant/30 last:border-0">
              {subItems ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === label ? null : label)}
                    className="w-full flex items-center justify-between px-6 py-3 text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                  >
                    {label}
                    <span className={`material-symbols-outlined text-base transition-transform duration-200 ${mobileExpanded === label ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {mobileExpanded === label && (
                    <div className="bg-surface-container-low border-t border-outline-variant/30">
                      {subItems.map(({ href: subHref, label: subLabel, external }) => (
                        external ? (
                          <a
                            key={subHref}
                            href={subHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-9 py-2.5 text-label-md text-on-surface-variant hover:text-primary transition-colors pr-6"
                          >
                            <span className="material-symbols-outlined icon-filled text-sm text-outline">chevron_right</span>
                            {subLabel}
                            <span className="material-symbols-outlined text-[12px] ml-auto text-outline">open_in_new</span>
                          </a>
                        ) : (
                          <Link
                            key={subHref}
                            href={subHref}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-9 py-2.5 text-label-md text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined icon-filled text-sm text-outline">chevron_right</span>
                            {subLabel}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-6 py-3 text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                >
                  {label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile actions */}
          <div className="flex flex-col gap-3 px-6 py-4 bg-surface-container-low">
            <Link
              href="/pelayanan"
              onClick={() => setMobileOpen(false)}
              className="bg-primary text-on-primary text-label-md py-2.5 px-4 rounded-full text-center transition-colors duration-200"
            >
              Pelayanan Online
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="text-primary text-label-md py-2.5 px-4 rounded-full text-center border border-primary transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
