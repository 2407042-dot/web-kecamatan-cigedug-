const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const uploadDir = path.join(__dirname, 'uploads');

async function uploadFiles() {
  if (!fs.existsSync(uploadDir)) {
    console.log("No uploads directory found.");
    return;
  }

  const files = fs.readdirSync(uploadDir);
  console.log(`Found ${files.length} files to upload...`);

  for (const file of files) {
    const filePath = path.join(uploadDir, file);
    if (fs.statSync(filePath).isFile()) {
      const fileBuffer = fs.readFileSync(filePath);
      
      let mimeType = 'application/octet-stream';
      if (file.endsWith('.png')) mimeType = 'image/png';
      else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) mimeType = 'image/jpeg';
      else if (file.endsWith('.pdf')) mimeType = 'application/pdf';
      else if (file.endsWith('.csv')) mimeType = 'text/csv';

      console.log(`Uploading ${file}...`);
      
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(file, fileBuffer, {
          contentType: mimeType,
          upsert: true
        });

      if (error) {
        console.error(`Failed to upload ${file}:`, error.message);
      } else {
        console.log(`Successfully uploaded ${file}`);
      }
    }
  }
  console.log("Done uploading all files to Supabase Storage!");
}

uploadFiles();
