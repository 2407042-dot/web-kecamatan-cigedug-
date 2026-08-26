import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'src', 'data', 'media-settings.json');

function readConfig() {
  if (!fs.existsSync(configPath)) {
    return { home_videos: [], page_heroes: [] };
  }
  const raw = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(raw);
}

function writeConfig(data: any) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = readConfig();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal membaca konfigurasi media' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    writeConfig(data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan konfigurasi media' }, { status: 500 });
  }
}
