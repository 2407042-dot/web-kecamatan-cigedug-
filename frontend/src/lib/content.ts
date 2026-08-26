import fs from "fs";
import path from "path";

type ContentMap = Record<string, string>;

export function getSiteContent(): ContentMap {
  try {
    const contentPath = path.join(process.cwd(), "src", "data", "site-content.json");
    if (!fs.existsSync(contentPath)) return {};
    
    const raw = fs.readFileSync(contentPath, "utf-8");
    const data = JSON.parse(raw);
    
    const contentMap: ContentMap = {};
    for (const key in data) {
      if (data[key] && typeof data[key].value === "string") {
        contentMap[key] = data[key].value;
      }
    }
    return contentMap;
  } catch (error) {
    console.error("Error reading site content:", error);
    return {};
  }
}
