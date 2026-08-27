"use server";

import { revalidatePath } from "next/cache";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://web-kecamatan-cigedug-backend-five.vercel.app"}/api`;

export async function saveProduk(id: string | null, data: { name: string; description: string; contact: string; price: string; imageUrl: string }) {
  let res;
  if (id) {
    res = await fetch(`${API_URL}/produk/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    res = await fetch(`${API_URL}/produk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  const result = await res.json();
  revalidatePath("/admin/produk");
  revalidatePath("/potensi");
  return result;
}

export async function deleteProduk(id: string) {
  const res = await fetch(`${API_URL}/produk/${id}`, {
    method: 'DELETE'
  });
  const result = await res.json();
  revalidatePath("/admin/produk");
  revalidatePath("/potensi");
  return result;
}

