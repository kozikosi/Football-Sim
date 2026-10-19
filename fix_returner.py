import re

with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'r') as f:
    content = f.read()

# Find and replace the returnerRowHTML function
old_pattern = r'return `<div style="margin-top:12px;border-top:1px solid var\(--border\);padding-top:8px;"><div class="depth-row lgrid">'
new_replacement = 'return `<div class="depth-row lgrid">'

# Also remove the closing </div> at the end of the function
old_end = r'</details></div>`;'
new_end = '`;'

# Use regex to find the function and replace
pattern = r'(function returnerRowHTML\(hostId\)\{[\s\S]*?return `)<div style="margin-top:12px;border-top:1px solid var\(--border\);padding-top:8px;"><div class="depth-row lgrid">'
replacement = r'\1<div class="depth-row lgrid">'

content = re.sub(pattern, replacement, content)

# Also fix the closing
pattern2 = r'(</details>)</div>`;'
replacement2 = r'\1`;'
content = re.sub(pattern2, replacement2, content)

with open('/Users/kosi/Desktop/Football Sim/Madden NFL 27 Team Power Rankings & Draft Simulator (7).html', 'w') as f:
    f.write(content)

print("Done!")