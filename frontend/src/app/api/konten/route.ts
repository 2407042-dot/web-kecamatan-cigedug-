import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src', 'data', 'site-content.json');

function readContent() {
  const raw = fs.readFileSync(contentPath, 'utf-8');
  return JSON.parse(raw);
}

function writeContent(data: Record<string, unknown>) {
  fs.writeFileSync(contentPath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = readContent();
    const items = Object.entries(data).map(([key, val]: [string, any]) => ({
      key,
      label: val.label,
      page: val.page,
      value: val.value,
    }));
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: 'Gagal membaca konten' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { key, value } = await request.json();
    const data = readContent();
    if (!data[key]) {
      return NextResponse.json({ error: 'Key tidak ditemukan' }, { status: 404 });
    }
    data[key].value = value;
    writeContent(data);
    return NextResponse.json({ success: true, key, value });
  } catch {
    return NextResponse.json({ error: 'Gagal menyimpan konten' }, { status: 500 });
  }
}
