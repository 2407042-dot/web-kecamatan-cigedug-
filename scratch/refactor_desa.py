import os
import glob

files = glob.glob(r"d:\project\web desa\frontend\src\app\desa\*\page.tsx")
for f in files:
    if "segera-hadir" in f: continue
    
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Find the Identitas table start
    table_start_idx = content.find('<div className="divide-y divide-outline-variant/40 rounded-2xl border border-outline-variant/40 overflow-hidden bg-white shadow-sm">')
    if table_start_idx == -1:
        continue
    
    # Find the p tag ending right before it
    p_end_idx = content.rfind('</p>', 0, table_start_idx) + 4
    
    # In the p tag, remove mb-8
    p_start_idx = content.rfind('<p', 0, p_end_idx)
    p_tag = content[p_start_idx:p_end_idx]
    new_p_tag = p_tag.replace(' mb-8"', '"')
    
    content = content[:p_start_idx] + new_p_tag + '\n            </div>\n\n            <div>\n              ' + content[table_start_idx:]
    
    # Now remove the Visi Misi section
    visi_start = content.find('<div className="space-y-8">')
    if visi_start == -1:
        continue
    
    # Count divs from visi_start
    depth = 0
    i = visi_start
    while i < len(content):
        if content[i:i+4] == '<div':
            depth += 1
            i += 4
        elif content[i:i+5] == '</div':
            depth -= 1
            i += 6 # including >
            if depth == 0:
                break
        else:
            i += 1
            
    visi_end = i
    
    # Remove leading spaces before visi_start
    last_newline = content.rfind('\n', 0, visi_start)
    if last_newline != -1 and content[last_newline:visi_start].strip() == '':
        visi_start = last_newline
    
    content = content[:visi_start] + content[visi_end:]
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
        
    print(f"Updated {f}")
