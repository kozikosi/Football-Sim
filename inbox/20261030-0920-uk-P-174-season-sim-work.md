SPEAKER: uk | ROLE: council | TASK: P-174 | DATE: 2026-10-30
FOR: P-174

WHERE 1: Football-Sim-PreColors.html line 346 — wrap player table in scrollable container
OLD:
```html
   <table id="playerTable">
    <thead><tr>
     <th data-col="name">Player</th><th data-col="pos">Pos</th><th data-col="team">Team</th>
     <th data-col="ovr">OVR</th><th data-col="spd">SPD</th><th data-col="str">STR</th>
     <th data-col="agi">AGI</th><th data-col="cod">COD</th><th data-col="inj">INJ</th><th data-col="awr">AWR</th>
    </tr></thead>
    <tbody id="playerBody"></tbody>
   </table>
```
NEW:
```html
   <div class="plist" style="max-height:400px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;">
    <table id="playerTable">
     <thead><tr>
      <th data-col="name">Player</th><th data-col="pos">Pos</th><th data-col="team">Team</th>
      <th data-col="ovr">OVR</th><th data-col="spd">SPD</th><th data-col="str">STR</th>
      <th data-col="agi">AGI</th><th data-col="cod">COD</th><th data-col="inj">INJ</th><th data-col="awr">AWR</th>
     </tr></thead>
     <tbody id="playerBody"></tbody>
    </table>
   </div>
```
WHY: Adds a scrollable container (`.plist` pattern from existing CSS) so players scroll inside their own panel without pagination or "Next" buttons.
SAFE ALONE? YES — only wraps the table in a div.
HOW TO CHECK: Open Player Browser tab, verify scrollbar appears at 390px, verify no horizontal overflow.

---

WHERE 2: Football-Sim-PreColors.html line 62 — add fade-in animation class for player rows
OLD:
```css
#playerTable th.sorted{color:var(--accent);}
```
NEW:
```css
#playerTable th.sorted{color:var(--accent);}
#playerTable tbody tr{opacity:0;animation:fadeIn .6s ease-in-out forwards;animation-delay:calc(var(--row-delay,0)*-1ms);}
@keyframes fadeIn{to{opacity:1;transform:translateY(0);}}
```
WHY: Adds CSS for fade-in animation of table rows. Each row gets an animation delay via `--row-delay` custom property.
SAFE ALONE? YES — additive CSS.
HOW TO CHECK: Open Player Browser tab, rows should fade in sequentially from top.

---

WHERE 3: Football-Sim-PreColors.html — add row-delay to each row during rendering (line 811-812 in extracted JS area)
OLD:
```javascript
const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
h += `<tr><td>${name}${xf?'<span class="xf">XF</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
```
NEW:
```javascript
const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
let rowIdx = 0; // will be set via forEach or iteration counter
h += `<tr style="--row-delay:${++rowIdx}"><td>${name}${xf?'<span class="xf">${xf}</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td>${awr}</td></tr>`;
```
BUT BETTER: Use rows.forEach with index:
```javascript
rows.forEach((p, i)=>{
 const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
 h += `<tr style="--row-delay:${i+1}"><td>${name}${xf?'<span class="xf">${xf}</span>':''}</td><td>${pos}</td><td>${team}</td><td class="score">${ovr}</td><td>${spd}</td><td>${str_}</td><td>${agi}</td><td>${cod}</td><td>${inj}</td><td class="score">${awr}</td></tr>`;
});
```
WHY: Adds sequential fade-in animation delay and removes emoji from XF badge (plain text).
SAFE ALONE? YES — changes row generation logic.
HOW TO CHECK: Open Player Browser tab, rows fade in with ~600ms stagger, XF shows as styled text, not emoji.

---

WHERE 4: Football-Sim-PreColors.html CSS — remove emoji styling from XF badge
OLD:
```css
.xf{color:var(--accent2);font-weight:700;font-size:0.7rem;margin-left:4px;}
```
NEW:
```css
.xf{color:var(--accent);font-weight:600;font-size:0.75rem;margin-left:6px;text-transform:uppercase;}
```
WHY: Removes any font-size that might render emoji-sized, ensures text is styled properly without emoji dependency (Owner requirement: no emojis in badges).
SAFE ALONE? YES — CSS-only change.
HOW TO CHECK: Look at player names with "XF" badge, verify it's styled text, not an emoji.

---

WHERE 5: Football-Sim-PreColors.html CSS — ensure scrollable container has proper scroll padding
OLD (after adding .plist around table):
```css
.plist{max-height:380px;overflow-y:auto;}
```
NEW:
```css
.plist{max-height:400px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;background:var(--panel);}
```
WHY: Increased max-height to 400px for better visibility, adds border/radius/background to match panel styling.
SAFE ALONE? YES — CSS enhancement.
HOW TO CHECK: Player count > 20 rows should show scrollbar; container matches panel styling.

---

WHERE 6: Football-Sim-PreColors.html in renderPlayers() — ensure text fades at half speed or slower
OLD: The fade-in animation at 0.6s is already half speed or slower (600ms).
NEW: No change needed — 600ms satisfies "half speed or slower" requirement (slower = longer).

VERIFICATION SUMMARY
Run: `grep -n 'plist\|xf\|fadeIn' Football-Sim-PreColors.html`
Expected output should show:
- .plist class with max-height:400px
- .xf style without emoji-specific styling  
- @keyframes fadeIn animation

After edits:
- Player Browser tab shows scrollable table with fade-in rows
- No emojis in XF badges
- No pagination/Next buttons (all players in one scrollable view)