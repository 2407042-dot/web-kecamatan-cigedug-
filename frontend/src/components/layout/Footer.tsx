import Link from "next/link";

const footerLinks = [
  {
    title: "Navigasi",
    links: [
      { href: "/", label: "Beranda" },
      { href: "/profil", label: "Profil" },
      { href: "/desa", label: "Desa" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { href: "/pelayanan", label: "Pelayanan" },
      { href: "/berita", label: "Informasi" },
      { href: "/pengaduan", label: "Pengaduan" },
    ],
  },
  {
    title: "Lainnya",
    links: [
      { href: "/kegiatan", label: "Kegiatan" },
      { href: "/potensi", label: "Potensi" },
    ],
  },
];

const contactIcons = [
  { icon: "mail", label: "Email", href: "#" },
  { icon: "call", label: "Telepon", href: "#" },
  { icon: "location_on", label: "Lokasi", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-low dark:bg-inverse-surface mt-section-gap w-full">
      <div className="max-w-container-max mx-auto px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Brand Column */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-stack-md">
            <span className="material-symbols-outlined icon-filled text-primary dark:text-primary-fixed text-2xl">
              account_balance
            </span>
            <span className="font-headline-md text-headline-md font-bold text-on-surface dark:text-inverse-on-surface">
              Cigedug
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant mb-stack-md">
            Pemerintah Kecamatan Cigedug, Kabupaten Garut, Jawa Barat.
          </p>
          <div className="flex gap-4">
            {contactIcons.map(({ icon, label, href }) => (
              <a
                key={icon}
                href={href}
                aria-label={label}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {footerLinks.map(({ title, links }) => (
          <div key={title} className="col-span-1">
            <h4 className="font-label-md text-label-md font-bold text-primary dark:text-primary-fixed mb-stack-md uppercase tracking-wider">
              {title}
            </h4>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary dark:hover:text-secondary-fixed transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="border-t border-outline-variant/30 py-6 max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-caption text-caption text-on-surface-variant dark:text-outline-variant text-center md:text-left">
          © 2026 Kecamatan Cigedug – Pemerintah Kabupaten Garut
        </p>
        <a href="https://instagram.com/kecamatancigedug" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-caption text-on-surface-variant hover:text-primary transition-colors font-bold">
          <span className="material-symbols-outlined text-sm">photo_camera</span>
          @kecamatancigedug
        </a>
      </div>
    </footer>
  );
}
