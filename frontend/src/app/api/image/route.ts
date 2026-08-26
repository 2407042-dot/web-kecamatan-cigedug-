import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const beritaDirectory = path.join(process.cwd(), '../berita');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imagePath = searchParams.get('path');

  if (!imagePath) {
    return new NextResponse('Missing path parameter', { status: 400 });
  }

  // Prevent directory traversal attacks
  const safePath = path.normalize(imagePath).replace(/^(\.\.(\/|\\|$))+/, '');
  const absolutePath = path.join(beritaDirectory, safePath);

  // Ensure the resolved path is still inside the beritaDirectory
  if (!absolutePath.startsWith(beritaDirectory)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  if (!fs.existsSync(absolutePath)) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(absolutePath);
    
    // Determine content type based on extension
    const ext = path.extname(absolutePath).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.gif') contentType = 'image/gif';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.svg') contentType = 'image/svg+xml';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error) {
    console.error('Error reading image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
