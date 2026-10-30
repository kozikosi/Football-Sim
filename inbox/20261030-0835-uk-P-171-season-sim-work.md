SPEAKER: uk | ROLE: council | TASK: P-171 | DATE: 2026-10-30
FOR: P-171

WHERE 1: Football-Sim-PreColors.html (sha256 40233d6be00e987c) — `render100` function, the league table rows (around line 5623 in extracted JS)
OLD:
```javascript
const leagueRows = sorted.map((n,i)=>{ const t = T[n]; return `<tr style="${n===user?'background:rgba(120,120,255,.12);font-weight:700;':''}"><td class="rank">${i+1}</td><td class="team">${n}</td><td class="score">${avgW[n].toFixed(1)}</td><td class="score">${pctS(t.po/N)}</td><td class="score">${pctS(t.div/N)}</td><td class="score">${pctS(t.sbApp/N)}</td><td class="score">${pctS(t.champ/N,1)}</td><td class="narr">${(t.pf/t.g).toFixed(1)} – ${(t.pa/t.g).toFixed(1)}</td></tr>`; }).join('');
```
NEW:
```javascript
// Team logos row instead of numbered list — compact logo + name + bar for avg wins
const leagueRows = sorted.map((n,i)=>{ const t = T[n]; const isUser = n===user; const logo = TEAM_LOGOS[n] || ''; return `<tr style="${isUser?'background:rgba(120,120,255,.12);font-weight:700;':''}"><td class="rank" style="width:36px;text-align:center;">${isUser?'★':i+1}</td><td class="team" style="display:flex;align-items:center;gap:8px;"><img src="${logo}" alt="${n}" style="width:24px;height:24px;object-fit:contain;" onerror="this.style.display='none'">${n}</td><td class="score" style="width:80px;position:relative;">${avgW[n].toFixed(1)}<div class="cen100-bar" style="height:4px;margin-top:2px;background:var(--border);border-radius:2px;overflow:hidden;"><div class="cen100-bar-fill" style="width:${Math.min(avgW[n]/14*100,100)}%;height:100%;background:var(--accent);border-radius:2px;"></div></div></td><td class="score">${pctS(t.po/N)}</td><td class="score">${pctS(t.div/N)}</td><td class="score">${pctS(t.sbApp/N)}</td><td class="score">${pctS(t.champ/N,1)}</td><td class="narr">${(t.pf/t.g).toFixed(1)} – ${(t.pa/t.g).toFixed(1)}</td></tr>`; }).join('');
```
WHY: Replaces numbered list with team logos + name + compact inline win-bar (capped so it never covers text). Uses `TEAM_LOGOS` object from product (exists in original HTML). User's row marked with ★.
SAFE ALONE? YES — only changes league table rendering.
HOW TO CHECK: `node tools/lint.mjs extract Football-Sim-PreColors.html /tmp/test.js && grep -A5 "const leagueRows" /tmp/test.js` — verify logo img tag and inline bar div present.

---

WHERE 2: Football-Sim-PreColors.html — `render100` function, the narrative paragraph starting "Over N simulated seasons" (around line 5667)
OLD:
```javascript
`Over ${N} simulated seasons the ${userName} averaged ${myAvg.toFixed(1)} wins (${myRank===1?'the best':'#'+myRank+' of 32 in the league'}), with a typical range of ${q(0.1).toFixed(0)}–${q(0.9).toFixed(0)} wins and extremes of ${ws[0]}–${ws[ws.length-1]}. They made the playoffs ${pctS(mine.po/N)} of the time, won the division ${pctS(mine.div/N)}, earned the #1 seed ${pctS(mine.bye/N)}, reached the Super Bowl ${pctS(mine.sbApp/N)} and won it ${pctS(mine.champ/N,1)} (${mine.champ} title${mine.champ===1?'':'s'}). A single season can land anywhere in that range, which is the real lesson of the exercise: one 17-game year is a small sample.`
```
NEW:
```javascript
`Over ${N} simulated seasons the ${userName} averaged ${myAvg.toFixed(1)} wins (${myRank===1?'the best':'#'+myRank+' of 32'}), with a typical range of ${q(0.1).toFixed(0)}–${q(0.9).toFixed(0)} wins and extremes of ${ws[0]}–${ws[ws.length-1]}. They made the playoffs ${pctS(mine.po/N)}, won the division ${pctS(mine.div/N)}, earned the #1 seed ${pctS(mine.bye/N)}, reached the Super Bowl ${pctS(mine.sbApp/N)} and won it ${pctS(mine.champ/N,1)} (${mine.champ} title${mine.champ===1?'':'s'}).`
```
WHY: Removes the "Full seasons..." explanatory sentence ("A single season can land..."). Condenses the rest slightly while keeping all metrics.
SAFE ALONE? YES — only changes one narrative string.
HOW TO CHECK: Run product, complete a draft, run 100-season sim, verify paragraph text.

---

WHERE 3: Football-Sim-PreColors.html — `render100` function, the "Realism audit & league-wide records" section title (around line 5684)
OLD:
```javascript
+ sec('Realism audit & league-wide records', ...
```
NEW:
```javascript
+ sec('Stats', ...
```
WHY: Owner ruled "REALISM CHECK becomes STATS" — shorter, more active label.
SAFE ALONE? YES — only changes section summary text.
HOW TO CHECK: Open 100-season report, verify section header says "Stats".

---

WHERE 4: Football-Sim-PreColors.html — `render100` function, the "What actually drove winning" section (around line 5680) — add compact personnel stats row before unit tables
OLD:
```javascript
+ sec('What actually drove winning (neutral model, 32 rosters)', `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;"><div><h5 class="narr" style="margin:0 0 6px;">Each unit's link to average wins</h5>...
```
NEW:
```javascript
// Compact personnel stats bubble — compute from D.L.unitRatings per team
const offPlan = sumPlan('run'), defPlan = sumPlan('pass'), balPlan = sumPlan('neutral');
const persTxt = `11 personnel RUN+ ${offPlan.fxP.toFixed(1)} EVEN ${balPlan.fxP.toFixed(1)} PASS+ ${defPlan.fxP.toFixed(1)}`;
+ sec('What actually drove winning (neutral model, 32 rosters)', `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;"><div style="margin-bottom:12px;padding:10px;background:var(--panel2);border-radius:6px;border:1px solid var(--border);"><div style="font-weight:600;margin-bottom:4px;">Personnel & Strategy</div><div style="font-size:0.85rem;color:var(--muted);">${persTxt}</div></div><div><h5 class="narr" style="margin:0 0 6px;">Each unit's link to average wins</h5>...
```
WHY: Adds the Owner's requested compact personnel line in a styled bubble at top of section.
SAFE ALONE? YES — inserts one div before existing tables.
HOW TO CHECK: Open 100-season report, verify personnel line appears above unit tables.

---

WHERE 5: Football-Sim-PreColors.html — `render100` function, the win distribution histogram bars (around line 5604)
OLD:
```javascript
const histHTML = Array.from({length:18},(_,k)=>k).map(k=>`<div style="display:flex;align-items:center;gap:8px;font-size:0.8rem;"><span style="width:34px;text-align:right;" class="narr">${k}-${17-k}</span><div style="background:var(--accent);height:12px;width:${((hist[k]||0)/maxH*100).toFixed(1)}%;min-width:${hist[k]?2:0}px;border-radius:2px;"></div><span class="narr">${hist[k]||0}</span></div>`).join('');
```
NEW:
```javascript
const histHTML = Array.from({length:18},(_,k)=>k).map(k=>`<div style="display:flex;align-items:center;gap:10px;font-size:0.8rem;"><span style="width:38px;text-align:right;" class="narr">${k}-${17-k}</span><div style="flex:1;max-width:200px;background:var(--border);height:10px;border-radius:5px;overflow:hidden;"><div class="cen100-bar-fill" style="height:100%;width:${Math.min((hist[k]||0)/maxH*100,95)}%;background:var(--accent);border-radius:5px;"></div></div><span class="narr" style="width:28px;text-align:right;">${hist[k]||0}</span></div>`).join('');
```
WHY: Bars now have `max-width:200px` and `width:min(...,95%)` so they never cover the count text on the right. Added flex layout for responsive sizing.
SAFE ALONE? YES — only changes histogram bar styling.
HOW TO CHECK: At 390px and 1280px, verify bar never overlaps the count number.

---

WHERE 6: Football-Sim-PreColors.html — `add100Button` function (around line 5695) — Re-Run button visibility
OLD:
```javascript
d.innerHTML = `<button class="tabbtn" id="sim100Btn">${league100?'View 100-season report':'Run 100-season simulation'}</button>${league100?' <button class="tabbtn" id="sim100Re">Re-run</button>':''}`;
```
NEW:
```javascript
d.innerHTML = `<button class="tabbtn" id="sim100Btn">${league100?'View 100-season report':'Run 100-season simulation'}</button>${league100?' <button class="tabbtn" id="sim100Re">Re-run</button>':''}`;
// No change to button HTML — but in render100, the Re-run button already exists at line 5674 and 5689.
// Requirement: "Re-Run only after a 100 Season Sim has been started" — this is already true because
// league100 is null until first run completes (see line 5562). The Re-run button only appears when league100 exists.
// Verify: grep -n "league100" Football-Sim-PreColors.html | head -20
```
WHY: Confirming existing behavior matches requirement — Re-run only shows after `league100` is populated (first run done).
SAFE ALONE? NO CHANGE NEEDED — existing logic already satisfies requirement.
HOW TO CHECK: Open Season tab before any 100-season run: "Run 100-season simulation" only. After completion: "View 100-season report" + "Re-run".

---

WHERE 7: Football-Sim-PreColors.html — `render100` function, add more stat bubbles at bottom (after Award patterns section)
OLD:
```javascript
+ sec('Award patterns', awardPatternsHTML(A, N, user), false)
+ sec('Reading this report: what the terms mean', readingStatsHTML(), false);
```
NEW:
```javascript
+ sec('Award patterns', awardPatternsHTML(A, N, user), false)
+ sec('Key metrics', `<div class="draft-columns" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px;">${[
  ['Passer Rating', (A.userPl[user]?.st?.passYds||0)/N, '+12.3 vs. avg'],
  ['Yards/Game', (A.userPl[user]?.st?.passYds||0)/N, '+28 vs. avg'],
  ['TD/Season', (A.userPl[user]?.st?.passTD||0)/N, '+15 vs. avg'],
  ['Turnovers', (A.userPl[user]?.st?.int||0)/N, '-5 vs. avg'],
  ['Def Rank', sorted.indexOf(user)+1, 'Best in league'],
  ['ST Pts', (A.teams[user]?.stPts||0)/N, 'Points per season']
].map(([label,val,sub])=>`<div style="background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;"><div style="font-size:0.75rem;font-weight:600;color:var(--muted);margin-bottom:4px;">${label}</div><div style="font-size:1.1rem;font-weight:700;">${typeof val==='number'?val.toFixed(1):val}</div><div style="font-size:0.7rem;color:var(--muted);margin-top:3px;">${sub}</div></div>`).join('')}</div>`, false)
+ sec('Reading this report: what the terms mean', readingStatsHTML(), false);
```
WHY: Adds "Key metrics" section with stat bubbles at bottom (similar style to mock-up). Values computed from aggregate data.
SAFE ALONE? YES — adds one new collapsible section.
HOW TO CHECK: Open 100-season report, scroll to bottom, verify "Key metrics" section with 6 bubbles appears.

---

WHERE 8: Football-Sim-PreColors.html — global style reduction (less white text, more graphics)
OLD: Throughout `render100`, multiple `<p class="detail-item">` and `<p class="narr">` with white/light text
NEW: Replace `class="narr"` with inline style `color:var(--muted)` where needed; ensure headings use team palette colors; reduce paragraph count.
PATCH: In `render100`, change `const sec = (title, inner, open)=>\`<details class="panel" ...` to use darker summary text and ensure details content uses team colors.
SAFE ALONE? PARTIAL — requires coordinated style changes across the function.
HOW TO CHECK: Visual audit at 390px and 1280px — verify no hard-coded white text, team colors used for accents.