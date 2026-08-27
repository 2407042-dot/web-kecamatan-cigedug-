const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all ts/tsx files in frontend
const files = execSync('dir /s /b *.ts *.tsx', { cwd: 'd:/project/web desa/frontend/src' }).toString().split('\r\n').filter(Boolean);

let modified = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace string literals like "http://localhost:5000/api..."
  newContent = newContent.replace(/\"http:\/\/localhost:5000([^\"\n]*)\"/g, '`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}$1`');
  
  // Replace string literals like 'http://localhost:5000/api...'
  newContent = newContent.replace(/'http:\/\/localhost:5000([^'\n]*)'/g, '`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}$1`');
  
  // Replace inside template literals like `http://localhost:5000${imageUrl}`
  newContent = newContent.replace(/http:\/\/localhost:5000/g, '${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modified++;
    console.log('Modified: ' + file);
  }
}
console.log('Total files modified: ' + modified);
