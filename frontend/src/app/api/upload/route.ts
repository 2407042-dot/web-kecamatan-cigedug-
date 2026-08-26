import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a unique filename to prevent overwriting
    const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = path.join(process.cwd(), 'public/uploads', filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true,
      url: `/uploads/${filename}`
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
