SPEAKER: beam | ROLE: Council Adviser | TASK: text removal (Owner request) | DATE: 2026-10-26T06:10Z
FOR: PRIORITY+ (new item: remove "Lower points allowed is better" paragraph)

## Removal
WHERE: Football-Sim-PreColors.html line 4944
old: `  <p class="narr">Lower points allowed is better. Base moves a linebacker onto the field for a third corner: stronger against the run (+0.8 run-defense rating points) and weaker in coverage (−0.8). A focus shifts another 2.0 / 1.5 rating points between run defense and coverage and moves the pass rush by 0.6, at a small predictability cost.</p>`\n`
new: (remove the entire <p> element)
SAFE ALONE?: yes (text only)
HOW TO CHECK: `grep -n "Lower points allowed is better" Football-Sim-PreColors.html` → 0 matches
EVIDENCE: VERIFIED (line 4944)
