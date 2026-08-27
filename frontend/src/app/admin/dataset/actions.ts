"use server";

import { revalidatePath } from "next/cache";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}/api`;

export async function saveDataset(id: string | null, data: { title: string; description: string; category: string; fileCsv: string; sizeCsv: string; filePdf: string; sizePdf: string }) {
  let res;
  if (id) {
    res = await fetch(`${API_URL}/dataset/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } else {
    res = await fetch(`${API_URL}/dataset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  const result = await res.json();
  revalidatePath("/admin/dataset");
  revalidatePath("/data");
  return result;
}

export async function deleteDataset(id: string) {
  const res = await fetch(`${API_URL}/dataset/${id}`, {
    method: 'DELETE'
  });
  const result = await res.json();
  revalidatePath("/admin/dataset");
  revalidatePath("/data");
  return result;
}

