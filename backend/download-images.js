const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  { name: 'cikuray-1.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Mount_Cikuray_from_Cisurupan.JPG' },
  { name: 'cikuray-2.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Sunrise_Di_Puncak_Gunung_Cikuray.jpg' },
  { name: 'garut-1.jpg', url: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=1200&q=80' },
  { name: 'garut-2.jpg', url: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80' },
  { name: 'garut-3.jpg', url: 'https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=1200&q=80' },
  { name: 'garut-4.jpg', url: 'https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=1200&q=80' }
];

const destDir = path.join(__dirname, '../frontend/public/images/web');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      // Handle redirects for unsplash
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  console.log('Downloading images...');
  for (const img of images) {
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, path.join(destDir, img.name));
    } catch(e) {
      console.error(e);
    }
  }
  console.log('Done!');
}

main();
