"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';

const filePath = path.join(process.cwd(), 'public/Data_Fasilitas.json');

export type Fasilitas = {
  id: string;
  kategori: string;
  nama: string;
  desa: string;
  alamat: string;
  latitude: string;
  longitude: string;
};

function readData(): Fasilitas[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading Fasilitas data", error);
    return [];
  }
}

function writeData(data: Fasilitas[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function getFasilitas() {
  return readData();
}

export async function saveFasilitas(id: string | null, data: Omit<Fasilitas, 'id'>) {
  const current = readData();
  let saved: Fasilitas;
  
  if (id) {
    const index = current.findIndex(f => f.id === id);
    if (index >= 0) {
      current[index] = { ...data, id };
      saved = current[index];
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } else {
    saved = { ...data, id: randomUUID() };
    current.unshift(saved);
  }
  
  writeData(current);
  revalidatePath('/admin/fasilitas');
  revalidatePath('/data/infografis');
  return saved;
}

export async function deleteFasilitas(id: string) {
  const current = readData();
  const filtered = current.filter(f => f.id !== id);
  writeData(filtered);
  revalidatePath('/admin/fasilitas');
  revalidatePath('/data/infografis');
  return { success: true };
}
