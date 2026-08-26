import { Metadata } from "next";
import PengaturanClient from "./PengaturanClient";

export const metadata: Metadata = {
  title: "Pengaturan Admin - Portal Kecamatan",
};

export default function PengaturanPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Pengaturan Admin</h1>
        <p className="text-slate-500 mt-2">Ubah kata sandi dan pengaturan dasar lainnya.</p>
      </div>

      <PengaturanClient />
    </div>
  );
}
