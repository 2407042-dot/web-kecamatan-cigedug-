import PengumumanClient from "./PengumumanClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Manajemen Pengumuman",
};

export default function PengumumanAdminPage() {
  return (
    <div>
      <PengumumanClient />
    </div>
  );
}
