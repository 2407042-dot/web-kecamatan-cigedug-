import { Metadata } from "next";
import AgendaClient from "./AgendaClient";

export const metadata: Metadata = {
  title: "Admin - Manajemen Agenda Kegiatan",
};

export default function AgendaAdminPage() {
  return <AgendaClient />;
}
