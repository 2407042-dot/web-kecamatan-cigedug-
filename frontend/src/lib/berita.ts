import fs from 'fs';
import path from 'path';

export interface Berita {
  slug: string;
  title: string;
  date: string;
  snippet: string;
  imageUrl: string | null;
  content: string;
  folderName: string;
}

const API_URL = "http://localhost:5000/api";

export async function getAllBerita(): Promise<Berita[]> {
  try {
    const res = await fetch(`${API_URL}/berita`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    
    return data.map((b: any) => {
      // Create snippet by stripping HTML tags and truncating
      const plainText = b.content.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      const snippetText = plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '');
      
      return {
        slug: b.id, // using database ID as slug
        title: b.title,
        date: new Date(b.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        snippet: snippetText,
        imageUrl: b.imageUrl ? (b.imageUrl.startsWith('http') ? b.imageUrl : `http://localhost:5000${b.imageUrl}`) : null,
        content: b.content,
        folderName: ''
      };
    });
  } catch (error) {
    console.error("Failed to fetch berita:", error);
    return [];
  }
}

export async function getBeritaBySlug(slug: string): Promise<Berita | undefined> {
  const allBerita = await getAllBerita();
  return allBerita.find((b) => b.slug === slug);
}
