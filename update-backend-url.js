const fs = require('fs');
const { execSync } = require('child_process');

const files = execSync('dir /s /b *.ts *.tsx', { cwd: 'd:/project/web desa/frontend/src' }).toString().split('\r\n').filter(Boolean);

let modified = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(
    /https:\/\/api-desa-cigedug\.onrender\.com/g,
    'https://web-kecamatan-cigedug-backend-five.vercel.app'
  );
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modified++;
    console.log('Updated: ' + file);
  }
}
console.log('Total files updated: ' + modified);
