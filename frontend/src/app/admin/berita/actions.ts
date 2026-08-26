"use server";

import { revalidatePath } from "next/cache";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}/api`;

export async function saveBerita(id: string | null, data: { title: string; content: string; imageUrl: string }) {
  let res;
  if (id) {
    res = await fetch(`${API_URL}/berita/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    res = await fetch(`${API_URL}/berita`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  const result = await res.json();
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  return result;
}

export async function deleteBerita(id: string) {
  const res = await fetch(`${API_URL}/berita/${id}`, {
    method: 'DELETE'
  });
  const result = await res.json();
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  return result;
}

