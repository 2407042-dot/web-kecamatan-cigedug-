const fs = require('fs');
let content = fs.readFileSync('backend/.env', 'utf8');
const lines = content.split('\n');
let modified = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('DATABASE_URL=') && !lines[i].includes('pgbouncer=true')) {
    if (lines[i].trim().endsWith('"')) {
      lines[i] = lines[i].trim().slice(0, -1) + '?pgbouncer=true&connection_limit=1"';
    } else {
      lines[i] = lines[i].trim() + '?pgbouncer=true&connection_limit=1';
    }
    modified = true;
  }
}

if (modified) {
  fs.writeFileSync('backend/.env', lines.join('\n'));
  console.log('Appended pgbouncer=true successfully!');
} else {
  console.log('No changes needed.');
}
