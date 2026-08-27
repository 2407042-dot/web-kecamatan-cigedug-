const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('dir /s /b *.ts *.tsx', { cwd: 'd:/project/web desa/frontend/src' }).toString().split('\r\n').filter(Boolean);

let modified = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace incorrectly nested string
  newContent = newContent.split('${process.env.NEXT_PUBLIC_BACKEND_URL || "${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}"}')
                         .join('${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}');
  
  // also handle single quotes if any
  newContent = newContent.split("${process.env.NEXT_PUBLIC_BACKEND_URL || '${process.env.NEXT_PUBLIC_BACKEND_URL || \"http://localhost:5000\"}'}")
                         .join("${process.env.NEXT_PUBLIC_BACKEND_URL || \"http://localhost:5000\"}");

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modified++;
    console.log('Fixed: ' + file);
  }
}
console.log('Total files fixed: ' + modified);
