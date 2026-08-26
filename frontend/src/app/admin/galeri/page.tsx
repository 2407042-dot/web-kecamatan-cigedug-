import GaleriClient from "./GaleriClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Manajemen Galeri Foto",
};

export default function GaleriAdminPage() {
  return <GaleriClient />;
}
