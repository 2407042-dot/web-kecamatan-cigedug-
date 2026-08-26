import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-key';

// Buat token session yang lebih kuat (username + secret + timestamp)
function generateToken(username: string): string {
  const timestamp = Date.now();
  const raw = `${username}:${timestamp}:${SESSION_SECRET}`;
  // Base64 encode sebagai "tanda tangan" sederhana
  return btoa(raw);
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
    }

    // Verify credentials against the backend API
    const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!backendRes.ok) {
      // Delay kecil untuk mencegah brute force
      await new Promise(r => setTimeout(r, 800));
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const token = generateToken(username);

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,                              // Tidak bisa diakses via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS only di production
      sameSite: 'strict',                          // Proteksi CSRF
      maxAge: 60 * 60 * 8,                        // 8 jam
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Terjadi kesalahan sistem' }, { status: 500 });
  }
}
