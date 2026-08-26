import AparaturClient from "./AparaturClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Manajemen Aparatur",
};

export default function AparaturAdminPage() {
  return <AparaturClient />;
}
