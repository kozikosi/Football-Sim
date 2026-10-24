#!/usr/bin/env python3
"""S12: Add data-team to standings rows and user-row styling"""

with open('/Users/kosi/Desktop/Football Sim/_agents/minimax/prototypes/V22-candidate-teamcolours.html', 'r', errors='replace') as f:
    content = f.read()

# The exact old line from renderStandingsHTML
old_line = 'html += `<tr class="${r.team===user?'user-row':''}"><td>${r.team}</td><td class="score">${r.wins}-${r.losses}${r.ties?\'-\'+r.ties:\'\}</td><td class="narr">${gp?(r.pf/gp).toFixed(1):\'—\'}</td><td class="narr">${gp?(r.pa/gp).toFixed(1):\'—\'}</td><td class="narr">${r.diff>=0?\'+\':\'\}${r.diff}</td></tr>`'

print(f"Looking for old line (length={len(old_line)})...")
print(f"First 60 chars: {old_line[:60]}")
print(f"Last 60 chars: {old_line[-60:]}")

# Check if it exists
if old_line in content:
    print("OLD LINE FOUND - replacing...")
    new_line = 'html += `<tr class="${r.team===user?\'user-row\':\'\}" data-team="${r.team}"><td>${r.team}</td><td class="score">${r.wins}-${r.losses}${r.ties?\'-\'+r.ties:\'\}</td><td class="narr">${gp?(r.pf/gp).toFixed(1):\'—\'}</td><td class="narr">${gp?(r.pa/gp).toFixed(1):\'—\'}</td><td class="narr">${r.diff>=0?\'+\':\'\}${r.diff}</td></tr>`'
    
    new_content = content.replace(old_line, new_line)
    
    with open('/Users/kosi/Desktop/Football Sim/_agents/minimax/prototypes/V22-candidate-teamcolours.html', 'w', errors='replace') as f:
        f.write(new_content)
    
    print(f"Replaced {content.count(old_line)} occurrence(s)")
    print(f"New content has {new_content.count(new_line)} occurrence(s)")
    
    # Verify
    if 'data-team"' in new_content:
        print("✓ data-team attribute added successfully")
    else:
        print("✗ data-team attribute NOT found")
else:
    print("OLD LINE NOT FOUND - searching for alternative pattern")
    # Try to find any tr class line in the standings function
    import re
    match = re.search(r'html\s*\+=\s*`<tr\s+class=", content)
    if match:
        print(f"Found tr class at {match.start()}:")
        print(content[match.start():match.start()+150])