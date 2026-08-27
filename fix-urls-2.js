const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('dir /s /b *.ts *.tsx', { cwd: 'd:/project/web desa/frontend/src' }).toString().split('\r\n').filter(Boolean);

let modified = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace ${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}
  // with ${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}
  
  newContent = newContent.replace(/\$\{process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| "http:\/\/localhost:5000"\}/g, '${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}');
  
  // Also handle single quotes if any
  newContent = newContent.replace(/\$\{process\.env\.NEXT_PUBLIC_BACKEND_URL \|\| 'http:\/\/localhost:5000'\}/g, '${process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://api-desa-cigedug.onrender.com"}');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modified++;
    console.log('Fixed: ' + file);
  }
}
console.log('Total files fixed: ' + modified);
