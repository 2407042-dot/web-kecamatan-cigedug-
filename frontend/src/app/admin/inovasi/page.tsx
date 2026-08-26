import { Metadata } from "next";
import InovasiClient from "./InovasiClient";

export const metadata: Metadata = {
  title: "Kelola Program Inovasi - Admin Portal Kecamatan",
};

export default function AdminInovasiPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Kelola Program Inovasi</h1>
        <p className="text-slate-500 mt-2">Tambah, ubah, atau hapus program inovasi Kecamatan Cigedug.</p>
      </div>

      <InovasiClient />
    </div>
  );
}
