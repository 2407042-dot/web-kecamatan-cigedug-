import os
import re

desas = ["cigedug", "barusuda", "cintanagara", "sindangsari", "sukahurip"]
base_dir = r"d:\project\web desa\frontend\src\app\desa"

for desa in desas:
    file_path = os.path.join(base_dir, desa, "page.tsx")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # 1. Add import if not exists
        if "getHeroImage" not in content:
            content = content.replace('import Image from "next/image";', 'import Image from "next/image";\nimport { getHeroImage } from "@/lib/media";')
        
        # 2. Add heroImage const
        function_def = f"export default function {desa.capitalize()}Page() {{"
        if f"const heroImage = getHeroImage('{desa}'" not in content:
            replacement = f"{function_def}\n  const heroImage = getHeroImage(\"{desa}\", \"/images/desa/{desa}-hero.jpeg\");"
            content = content.replace(function_def, replacement)
        
        # 3. Replace background image URL
        # e.g., backgroundImage: `url('/images/desa/cigedug-hero.jpeg')` -> backgroundImage: `url('${heroImage}')`
        pattern = r"backgroundImage:\s*`url\(['\"]/images/desa/" + desa + r"-hero\.jpeg['\"]\)`"
        content = re.sub(pattern, "backgroundImage: `url('${heroImage}')`", content)
        
        # also handle case where it's double quotes inside
        pattern2 = r"backgroundImage:\s*`url\(['\"]/images/desa/" + desa + r"\.jpg['\"]\)`"
        content = re.sub(pattern2, "backgroundImage: `url('${heroImage}')`", content)

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"Updated {desa}")
