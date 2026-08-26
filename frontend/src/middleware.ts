import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-key';

function isValidToken(token: string): boolean {
  try {
    // Decode token dan verifikasi format serta secret
    const decoded = atob(token);
    const parts = decoded.split(':');
    
    // Format: username:timestamp:secret
    if (parts.length !== 3) return false;
    
    const [, timestamp, secret] = parts;
    
    // Cek apakah secret cocok
    if (secret !== SESSION_SECRET) return false;
    
    // Cek apakah token belum kadaluarsa (8 jam)
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 8 * 60 * 60 * 1000; // 8 jam dalam ms
    if (tokenAge > maxAge) return false;
    
    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Hanya proteksi rute /admin
  if (path.startsWith('/admin')) {
    const isLoginPage = path === '/admin/login';
    const tokenCookie = request.cookies.get('admin_token');
    const hasValidToken = tokenCookie ? isValidToken(tokenCookie.value) : false;

    // Belum login, bukan halaman login → redirect ke login
    if (!hasValidToken && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', path); // simpan tujuan asal
      return NextResponse.redirect(loginUrl);
    }

    // Sudah login, akses halaman login → redirect ke dashboard
    if (hasValidToken && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
