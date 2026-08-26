import { Metadata } from "next";
import PengaduanClient from "./PengaduanClient";

export const metadata: Metadata = {
  title: "Aspirasi Masuk - Admin Portal Kecamatan",
};

export default function AdminPengaduanPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Aspirasi Masuk</h1>
        <p className="text-slate-500 mt-2">Pantau dan kelola pengaduan serta aspirasi yang masuk dari masyarakat.</p>
      </div>

      <PengaduanClient />
    </div>
  );
}
