import fs from 'fs';
import path from 'path';

export function getHeroImage(id: string, defaultPath: string) {
  try {
    const configPath = path.join(process.cwd(), 'src', 'data', 'media-settings.json');
    if (fs.existsSync(configPath)) {
      const data = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      const hero = data.page_heroes?.find((h: any) => h.id === id);
      if (hero && hero.url) return hero.url;
    }
  } catch (e) {
    console.error("Error reading media settings:", e);
  }
  return defaultPath;
}
