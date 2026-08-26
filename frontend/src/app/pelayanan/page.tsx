"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface SubRequirement {
  title: string;
  items: string[];
}

interface LayananItem {
  id: string;
  category: "kk" | "pencatatan" | "pindah" | "kia";
  categoryLabel: string;
  icon: string;
  title: string;
  description: string;
  syarat: string[] | SubRequirement[];
  mekanisme: string[];
  pengajuan: string[];
  images: string[];
}

const layananList: LayananItem[] = [
  {
    id: "kk",
    category: "kk",
    categoryLabel: "Kartu Keluarga",
    icon: "badge",
    title: "Pelayanan Kartu Keluarga (KK)",
    description: "Layanan pembuatan KK baru, perubahan data elemen KK, serta penambahan anggota keluarga.",
    syarat: [
      {
        title: "Persyaratan KK Baru",
        items: [
          "Fotokopi Buku Nikah / Akta Perkawinan / Akta Perceraian",
          "Surat Keterangan Pindah / Surat Keterangan Pindah Datang",
          "E-mail dan No. Telp Aktif",
        ],
      },
      {
        title: "Persyaratan KK Perubahan Data",
        items: [
          "Formulir Perubahan Elemen Data F-1.06 (dapat di-download di menu formulir)",
          "Fotokopi Kartu Keluarga",
          "Fotokopi KTP-el pemohon",
          "Fotokopi Dokumen Pendukung Perubahan Data",
          "E-mail dan No. Telp Aktif",
        ],
      },
      {
        title: "Persyaratan Penambahan Anggota Keluarga",
        items: [
          "Formulir Biodata Keluarga F-1.01 (dapat di-download di menu formulir)",
          "Fotokopi Surat Keterangan Lahir dari desa / Rumah Sakit / Bidan",
          "Fotokopi Kartu Keluarga Lama",
          "E-mail dan No. Telp Aktif",
        ],
      },
    ],
    mekanisme: [
      "Pemohon adalah yang berkepentingan / tidak diwakilkan.",
      "Pemohon mengisi dan menandatangani formulir serta memberikan persyaratan.",
      "Petugas pelayanan melakukan verifikasi dan validasi terhadap formulir dan persyaratan.",
      "Petugas melakukan penginputan data ke dalam Sistem Informasi Administrasi Kependudukan (SIAK).",
      "Pejabat menandatangani Kartu Keluarga dengan Tanda Tangan Elektronik (TTE).",
      "Petugas menerbitkan KK dan menyampaikan kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: [
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (1).jpeg",
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (2).jpeg",
    ],
  },
  {
    id: "kelahiran",
    category: "pencatatan",
    categoryLabel: "Pencatatan Sipil",
    icon: "child_care",
    title: "Pelayanan Pencatatan Kelahiran",
    description: "Penerbitan Akta Kelahiran bagi bayi baru lahir maupun anak WNI.",
    syarat: [
      "Formulir Kelahiran F-2.01 (dapat di-download di menu formulir)",
      "Fotokopi Buku Nikah Orang Tua / SPTJM",
      "Fotokopi KTP Orang Tua",
      "Surat Keterangan Lahir dari dokter/bidan/penolong kelahiran atau komsen kelahiran dari desa",
      "Fotokopi Kartu Keluarga (NIK anak sudah masuk KK)",
      "Fotokopi KTP-el saksi (2 orang)",
      "E-mail dan No. Telp Aktif",
    ],
    mekanisme: [
      "Pelapor adalah yang berkepentingan / tidak diwakilkan.",
      "Pelapor mengisi dan menandatangani formulir serta memberikan persyaratan lengkap.",
      "Petugas pelayanan melakukan verifikasi dan validasi terhadap formulir dan persyaratan.",
      "Petugas pelayanan melakukan proses penginputan data ke dalam SIAK.",
      "Pejabat menandatangani dengan proses Tanda Tangan Elektronik (TTE).",
      "Petugas menerbitkan Akta Kelahiran dan menyampaikan kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: [
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (7).jpeg",
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (8).jpeg",
    ],
  },
  {
    id: "kematian",
    category: "pencatatan",
    categoryLabel: "Pencatatan Sipil",
    icon: "sentiment_dissatisfied",
    title: "Pelayanan Pencatatan Kematian",
    description: "Penerbitan Akta Kematian untuk kepastian hukum administrasi kependudukan.",
    syarat: [
      "Formulir Kematian F-2.01 (dapat di-download di menu formulir)",
      "Surat Keterangan Kematian (dari dokter/rumah sakit/kepala desa)",
      "Fotokopi Kartu Keluarga orang yang meninggal",
      "Fotokopi KTP orang yang meninggal (jika ada)",
      "Fotokopi KTP pelapor",
      "KARIP (khusus untuk pensiunan)",
      "Dokumen Perjalanan RI bagi WNI bukan penduduk / Dokumen Perjalanan bagi Orang Asing",
      "E-mail dan No. Telp Aktif",
    ],
    mekanisme: [
      "Pelapor adalah ahli waris.",
      "Pelapor mengisi dan menandatangani formulir serta memberikan persyaratan lengkap.",
      "Petugas pelayanan melakukan verifikasi dan validasi terhadap formulir dan persyaratan.",
      "Petugas pelayanan melakukan penginputan data ke dalam SIAK.",
      "Pejabat menandatangani dengan proses Tanda Tangan Elektronik (TTE).",
      "Petugas menerbitkan Akta Kematian dan menyampaikan kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: [
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (2).jpeg",
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (3).jpeg",
    ],
  },
  {
    id: "kia",
    category: "kia",
    categoryLabel: "Kartu Anak",
    icon: "face",
    title: "Penerbitan Kartu Identitas Anak (KIA)",
    description: "Penerbitan kartu identitas resmi bagi anak berusia 0 hingga kurang dari 17 tahun.",
    syarat: [
      "Fotokopi Akta Kelahiran Anak",
      "Fotokopi Kartu Keluarga Orangtua",
      "Fotokopi KTP Orangtua",
      "Pas Foto Anak berwarna ukuran 4x6 (khusus untuk anak usia di atas 5 tahun)",
    ],
    mekanisme: [
      "Pemohon adalah orangtua / wali.",
      "Pemohon memberikan persyaratan lengkap.",
      "Petugas pelayanan melakukan verifikasi dan validasi terhadap persyaratan.",
      "Petugas pelayanan melakukan proses penginputan data ke dalam SIAK.",
      "Pejabat menandatangani dengan proses Tanda Tangan Elektronik (TTE).",
      "Petugas menerbitkan KIA dan menyampaikan kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: ["/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (4).jpeg"],
  },
  {
    id: "kepindahan",
    category: "pindah",
    categoryLabel: "Pindah & Datang",
    icon: "flight_takeoff",
    title: "Pelayanan Kepindahan (SKPWNI)",
    description: "Penerbitan Surat Keterangan Pindah WNI bagi warga yang akan pindah domisili.",
    syarat: [
      "Formulir kepindahan F-1.03 (dapat di-download di menu formulir)",
      "Fotokopi Kartu Keluarga",
      "Fotokopi KTP-el",
      "Jika status di bawah umur: a. Surat pernyataan izin dari Orangtua/Wali bermaterai Rp10.000; b. KTP Orangtua/Wali",
      "E-mail dan No. Telp Aktif",
    ],
    mekanisme: [
      "Pemohon adalah yang bersangkutan / tidak diwakilkan.",
      "Pemohon mengisi, menandatangani formulir dan memberikan persyaratan.",
      "Petugas pelayanan melakukan verifikasi berkas persyaratan.",
      "Petugas pelayanan melakukan proses penginputan data ke SIAK.",
      "Pejabat menandatangani dengan proses Tanda Tangan Elektronik (TTE).",
      "Petugas menerbitkan Surat Keterangan Pindah WNI (SKPWNI) dan menyampaikan kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: ["/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (5).jpeg"],
  },
  {
    id: "kedatangan",
    category: "pindah",
    categoryLabel: "Pindah & Datang",
    icon: "flight_land",
    title: "Pelayanan Kedatangan Penduduk",
    description: "Pencatatan kedatangan warga pindahan ke wilayah Kecamatan Cigedug.",
    syarat: [
      "Surat Keterangan WNI (SKPWNI) dari daerah asal",
      "KTP-el (khusus 17 tahun ke atas)",
      "Akta lahir pendatang (jika di bawah umur)",
      "Jika status numpang KK: KK tujuan yang ditumpangi",
      "Jika status numpang KK berusia di bawah 17 tahun: a. KK tujuan; b. KTP-el Kepala Keluarga; c. Surat pernyataan bersedia dari Kepala Keluarga bermaterai Rp10.000",
      "E-mail dan No. Telp Aktif",
    ],
    mekanisme: [
      "Pemohon adalah yang bersangkutan atau dalam satu KK.",
      "Petugas pelayanan melakukan verifikasi dan validasi terhadap persyaratan.",
      "Petugas pelayanan melakukan proses penginputan data ke SIAK.",
      "Pejabat menandatangani dengan proses Tanda Tangan Elektronik (TTE).",
      "Petugas mengkonfirmasi status kedatangan yang telah selesai diproses kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: [
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (6).jpeg",
      "/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (7).jpeg",
    ],
  },
  {
    id: "perceraian",
    category: "pencatatan",
    categoryLabel: "Pencatatan Sipil",
    icon: "heart_broken",
    title: "Pelayanan Pencatatan Perceraian",
    description: "Pencatatan perceraian untuk penerbitan Akta Perceraian.",
    syarat: [
      "Formulir pencatatan perceraian F-2.19 (dapat di-download di menu formulir)",
      "Salinan putusan pengadilan yang telah mempunyai kekuatan hukum tetap",
      "Kutipan Akta Perkawinan",
      "Fotokopi Kartu Keluarga",
      "Fotokopi KTP-el",
      "Surat pernyataan bahwa kutipan akta perkawinan tidak dimiliki (jika ada alasan sesuai peraturan perundang-undangan)",
      "E-mail dan No. Telp Aktif",
    ],
    mekanisme: [
      "Pelapor mengisi dan menandatangani formulir serta memberikan persyaratan lengkap.",
      "Petugas pelayanan melakukan verifikasi dan validasi terhadap persyaratan.",
      "Petugas pelayanan melakukan proses penginputan data ke SIAK.",
      "Pejabat menandatangani dengan proses Tanda Tangan Elektronik (TTE).",
      "Petugas menerbitkan Akta Perceraian dan menyampaikan kepada pemohon.",
    ],
    pengajuan: [
      "Pelayanan online melalui link pastioke.garutkab.go.id",
      "Pelayanan offline dengan datang langsung ke kantor Disdukcapil / Kantor Kecamatan Cigedug",
      "Jangka Waktu: 60 menit setelah berkas persyaratan lengkap",
    ],
    images: ["/images/foto-layanan/WhatsApp Image 2026-08-14 at 14.40.18 (9).jpeg"],
  },
];

export default function PelayananPage() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/konten")
      .then(res => res.json())
      .then(data => {
        const map: Record<string, string> = {};
        data.forEach((item: any) => map[item.key] = item.value);
        setContent(map);
      })
      .catch(err => console.error("Error fetching content:", err));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { key: "all", label: "Semua Layanan", icon: "apps" },
    { key: "kk", label: "Kartu Keluarga", icon: "badge" },
    { key: "pencatatan", label: "Akta & Pencatatan", icon: "description" },
    { key: "pindah", label: "Pindah / Datang", icon: "swap_horiz" },
    { key: "kia", label: "Kartu Identitas Anak", icon: "face" },
  ];

  const filteredLayanan = layananList.filter((layanan) => {
    const matchesCategory =
      selectedCategory === "all" || layanan.category === selectedCategory;
    const matchesSearch =
      layanan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layanan.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ── Hero Section ───────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden text-white min-h-[400px] flex flex-col justify-center">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-2.jpg')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/80 to-primary/40" />
        </div>
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white backdrop-blur-md px-5 py-2 rounded-full text-label-md font-semibold tracking-widest uppercase mb-6 shadow-sm border border-white/20">
            <span className="material-symbols-outlined icon-filled text-sm">
              support_agent
            </span>
            Pusat Pelayanan Terpadu Kecamatan Cigedug
          </span>
          <h1 className="text-display-md md:text-display-lg text-white mb-6">
            {content["pelayanan.hero.title"] || "Standar Pelayanan Publik & Adminduk"}
          </h1>
          <p className="text-body-lg text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            {content["pelayanan.hero.desc"] || "Pusat informasi dan panduan layanan administrasi kependudukan dan perizinan terpadu."}
          </p>

          {/* Banner Gratis & Link Formulir */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 bg-secondary text-on-secondary px-6 py-3.5 rounded-full font-bold shadow-lg shadow-secondary/30 text-title-sm md:text-title-md">
              <span className="material-symbols-outlined icon-filled text-xl">
                verified
              </span>
              <span>Layanan Administrasi Kependudukan GRATIS / TIDAK DIPUNGUT BIAYA</span>
            </div>
            <a
              href="https://linktr.ee/disdukcapilgarut"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-full font-bold shadow-lg hover:bg-surface-container-low transition-transform transform hover:-translate-y-0.5 text-title-sm"
            >
              <span className="material-symbols-outlined">download</span>
              <span>Download Formulir Persyaratan</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Search & Filter Controls ──────────────────────────────────── */}
      <section className="bg-surface-container-lowest border-b border-outline-variant/30 sticky top-20 z-20 shadow-sm py-4">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-label-md font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? "bg-primary text-on-primary shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Cari jenis layanan (misal: KK, KIA...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/50 pl-11 pr-4 py-2.5 rounded-xl text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-sm"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ── Daftar Layanan Content ───────────────────────────────────────── */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-headline-md font-bold text-on-surface">
              Daftar Layanan ({filteredLayanan.length})
            </h2>
            <span className="text-body-sm text-on-surface-variant">
              Est. Waktu Penyelesaian: <strong>60 Menit</strong> setelah berkas lengkap
            </span>
          </div>

          {filteredLayanan.length === 0 ? (
            <div className="bg-white border border-outline-variant/40 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/40 mb-4">
                search_off
              </span>
              <h3 className="text-title-lg font-bold text-on-surface mb-2">
                Layanan Tidak Ditemukan
              </h3>
              <p className="text-body-md text-on-surface-variant mb-6">
                Tidak ada jenis layanan yang sesuai dengan kata kunci &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold text-label-md"
              >
                Tampilkan Semua Layanan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12">
              {filteredLayanan.map((layanan) => (
                <div
                  key={layanan.id}
                  id={layanan.id}
                  className="bg-white border border-outline-variant/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Header Card */}
                  <div className="bg-gradient-to-r from-surface-container-low to-surface-container-lowest p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-outline-variant/40">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-primary text-on-primary rounded-2xl flex items-center justify-center shrink-0 shadow-md">
                        <span className="material-symbols-outlined icon-filled text-3xl">
                          {layanan.icon}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-label-sm font-bold uppercase tracking-wider">
                            {layanan.categoryLabel}
                          </span>
                          <span className="inline-flex items-center gap-1 text-label-sm text-secondary font-bold">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            60 Menit
                          </span>
                        </div>
                        <h3 className="text-headline-md font-bold text-on-surface">
                          {layanan.title}
                        </h3>
                        <p className="text-body-md text-on-surface-variant mt-0.5">
                          {layanan.description}
                        </p>
                      </div>
                    </div>

                    {/* Infographic Poster Thumbnail Button */}
                    {layanan.images && layanan.images.length > 0 && (
                      <button
                        onClick={() => setSelectedImage(layanan.images[0])}
                        className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/60 text-on-surface px-4 py-2.5 rounded-xl font-semibold text-label-md hover:bg-primary hover:text-on-primary transition-colors shrink-0"
                      >
                        <span className="material-symbols-outlined text-lg">image</span>
                        <span>Lihat Poster Infografis Resmi</span>
                      </button>
                    )}
                  </div>

                  {/* Konten Card 3 Kolom */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/30">
                    
                    {/* Kolom 1: Persyaratan */}
                    <div className="p-6 md:p-8">
                      <h4 className="text-title-lg font-bold text-on-surface mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          rule_folder
                        </span>
                        Persyaratan Berkas
                      </h4>

                      {Array.isArray(layanan.syarat) &&
                      typeof layanan.syarat[0] === "string" ? (
                        <ul className="space-y-3.5">
                          {(layanan.syarat as string[]).map((s, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-body-md text-on-surface-variant leading-relaxed"
                            >
                              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-label-sm font-bold">
                                {idx + 1}
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="space-y-6">
                          {(layanan.syarat as SubRequirement[]).map((sub, sIdx) => (
                            <div key={sIdx} className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40">
                              <h5 className="text-title-sm font-bold text-primary mb-3">
                                {sub.title}
                              </h5>
                              <ul className="space-y-2.5">
                                {sub.items.map((item, itemIdx) => (
                                  <li
                                    key={itemIdx}
                                    className="flex items-start gap-2.5 text-body-sm text-on-surface-variant"
                                  >
                                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-label-xs font-bold">
                                      {itemIdx + 1}
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Kolom 2: Mekanisme Prosedur */}
                    <div className="p-6 md:p-8">
                      <h4 className="text-title-lg font-bold text-on-surface mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary">
                          settings_timelapse
                        </span>
                        Mekanisme & Prosedur
                      </h4>
                      <ol className="space-y-4">
                        {layanan.mekanisme.map((m, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-body-md text-on-surface-variant leading-relaxed"
                          >
                            <span className="w-6 h-6 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0 mt-0.5 text-label-sm font-bold">
                              {idx + 1}
                            </span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Kolom 3: Sistem Pengajuan */}
                    <div className="p-6 md:p-8 bg-surface-container-lowest flex flex-col justify-between">
                      <div>
                        <h4 className="text-title-lg font-bold text-on-surface mb-5 flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">
                            send_time_extension
                          </span>
                          Sistem Pengajuan
                        </h4>
                        <ul className="space-y-4 mb-8">
                          {layanan.pengajuan.map((p, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-body-md text-on-surface-variant leading-relaxed"
                            >
                              <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5 text-xl">
                                check_circle
                              </span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <a
                          href="https://pastioke.garutkab.go.id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary py-3 rounded-xl font-bold shadow-md hover:bg-primary-fixed hover:text-primary transition-colors text-label-lg"
                        >
                          <span className="material-symbols-outlined text-lg">
                            open_in_new
                          </span>
                          Portal Online pastioke.garutkab.go.id
                        </a>
                        <a
                          href="https://linktr.ee/disdukcapilgarut"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-surface-container-high border border-outline-variant/60 text-on-surface py-2.5 rounded-xl font-semibold hover:bg-surface-container hover:text-primary transition-colors text-label-md"
                        >
                          <span className="material-symbols-outlined text-lg">
                            download
                          </span>
                          Download Form Persyaratan (Linktree)
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── Modal Poster Infografis Viewer ────────────────────────────── */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-surface rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            {/* Header Modal */}
            <div className="bg-surface-container-high px-6 py-4 flex items-center justify-between border-b border-outline-variant/40">
              <div className="flex items-center gap-2 text-title-md font-bold text-on-surface">
                <span className="material-symbols-outlined text-primary">
                  photo_library
                </span>
                <span>Poster Infografis Resmi Disdukcapil Garut</span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-9 h-9 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-error hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content Modal Image */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/90">
              <Image
                src={selectedImage}
                alt="Infografis Layanan"
                width={800}
                height={1200}
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Footer Modal */}
            <div className="bg-surface-container-low px-6 py-3 flex items-center justify-between text-body-sm text-on-surface-variant">
              <span>Sumber: Dokumentasi Resm Disdukcapil & Kecamatan Cigedug</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-primary text-on-primary px-5 py-1.5 rounded-lg text-label-md font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Contact & Support CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-surface-container-high border-t border-outline-variant/30 text-center">
        <div className="max-w-3xl mx-auto px-margin-mobile">
          <span className="material-symbols-outlined icon-filled text-5xl text-primary mb-4">
            contact_support
          </span>
          <h2 className="text-headline-md font-bold text-on-surface mb-3">
            Butuh Bantuan Lebih Lanjut?
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8">
            Jika Anda memiliki pertanyaan mengenai pengurusan dokumen kependudukan atau membutuhkan pendampingan di Kecamatan Cigedug, silakan hubungi tim pelayanan kami.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/profil"
              className="bg-white text-on-surface border border-outline-variant px-8 py-3.5 rounded-full font-bold shadow-sm hover:bg-surface-container-low transition-colors"
            >
              Lihat Profil & Alamat Kecamatan
            </Link>
            <a
              href="https://pastioke.garutkab.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-primary-fixed hover:text-primary transition-colors"
            >
              Ajukan Online di PASTIOKE
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
