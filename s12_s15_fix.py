#!/usr/bin/env python3
"""S12 and S15: Fix standings row highlighting and 100-season report colours"""

with open('/Users/kosi/Desktop/Football Sim/_agents/minimax/prototypes/V22-candidate-teamcolours.html', 'r', errors='replace') as f:
    content = f.read()

import re

print("=== S12: Standings row highlighting ===")

# 1. Add data-team attribute to standings rows
# Find the tr line in renderStandingsHTML and add data-team
old_tr_line = 'html += `<tr class="${r.team===user?\'user-row\':\'\}"><td>${r.team}</td>'
new_tr_line = 'html += `<tr class="${r.team===user?\'user-row\':\'\}" data-team="${r.team}"><td>${r.team}</td>'

# Replace
if old_tr_line in content:
    content = content.replace(old_tr_line, new_tr_line)
    print("✓ Added data-team to standings rows")
else:
    print("! Old tr line not found, searching alternative...")
    # Try to find any tr class line in the standings function
    idx = content.find('function renderStandingsHTML')
    if idx >= 0:
        chunk = content[idx:idx+2000]
        # Look for the pattern
        if '"user-row"' in chunk:
            print("  Found user-row in standings function")
        else:
            print("  No user-row found")

# 2. Add classes to conference headers
old_h3 = 'html += `<div><h3 style="margin:0 0 8px;">${conf}</h3>`'
new_h3 = 'html += `<div><h3 class="conf-${conf}" style="margin:0 0 8px;">${conf}</h3>`'

if old_h3 in content:
    content = content.replace(old_h3, new_h3)
    print("✓ Added classes to conference headers")
else:
    print("! Old h3 line not found")

# 3. Add S12 CSS rules for user-row and conference headers
# Find a good place to insert CSS - after the teamrow CSS section
# The teamrow CSS ends around line 5750

s12_css = '''.user-row[data-team] {
  border-left: 3px solid var(--t1);
  background: color-mix(in srgb, var(--t1) 7%, transparent);
  color: var(--t1);
}
.conf-AFC { color: var(--t1); font-weight: 600; }
.conf-NFC { color: var(--t2); font-weight: 600; }
'''

# Insert after the .score rule block
# Find the score rule
score_match = re.search(r'\\.score\\{font-weight:700;font-var', content)
if score_match:
    # Find the closing brace of the score rule
    after_score = content[score_match.start():]
    close_brace = after_score.find('}')
    if close_brace >= 0:
        insert_pos = score_match.start() + close_brace + 1
        content = content[:insert_pos] + s12_css + content[insert_pos:]
        print(f"✓ Added S12 CSS at position {insert_pos}")
    else:
        print("! Could not find score rule closing brace")
else:
    print("! Could not find score rule")

print("\n=== S15: 100-season report win distribution ===")

# S15: Highlight win distribution in user's colour
# The histogram uses: background:var(--accent)
# I need to change it to use the user's team colour

# Find the histogram HTML in render100
# It uses: <div style="background:var(--accent);height:12px;width:...>
old_hist_style = 'background:var(--accent)'
# Check if this exists in the 100-season report
if old_hist_style in content:
    # Replace with user colour scheme
    # The histogram should use the user's team colour when available
    # I'll add a conditional approach: use --t1 for user's team, --accent otherwise
    
    # Actually, looking at the render100 function, the histogram is always rendered
    # I need to add the user's colour scheme
    new_hist_style = 'background:var(--t1)'  # Will be overridden by user-row styling
    
    # But the histogram is in a different part of the code. Let me find it.
    hist_match = re.search(r'background:var\(--accent\)', content)
    if hist_match:
        content = content.replace(old_hist_style, new_hist_style)
        print("✓ Changed histogram background to var(--t1)")
    else:
        print("! Could not find histogram style")
else:
    print("! Old histogram style not found")

# S15: Also add the user's colour to the league table row
# The league rows have: <tr style="${n===user?'background:rgba(120,120,255,.12);font-weight:700;':''}">
old_league_row = 'background:rgba(120,120,255,.12)'
if old_league_row in content:
    # Replace with user's team colour
    new_league_row = 'background:color-mix(in srgb, var(--t1) 12%, transparent)'
    content = content.replace(old_league_row, new_league_row)
    print("✓ Changed league table row background to user's colour")
else:
    print("! Could not find league row style")

# Write the modified content
with open('/Users/kosi/Desktop/Football Sim/_agents/minimax/prototypes/V22-candidate-teamcolours.html', 'w', errors='replace') as f:
    f.write(content)

print("\n=== Script complete ===")
print("Modified file saved.")