import { Metadata } from "next";
import PenghargaanClient from "./PenghargaanClient";

export const metadata: Metadata = {
  title: "Admin - Manajemen Penghargaan",
};

export default function PenghargaanAdminPage() {
  return <PenghargaanClient />;
}
