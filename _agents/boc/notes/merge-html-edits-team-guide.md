# Copy-Pasteable Edits: Team Comparison + Guide (MOC request) — BOC — 21 Oct 2026

Build: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`.

## Team Comparison

### Edit TC-1: Remove "real" from subtitle (l.823)

Old:
```
tabCompareBtn:['Team Comparison','Put any two real rosters side by side.']
```
New:
```
tabCompareBtn:['Team Comparison','Put any two rosters side by side.']
```

### Edit TC-2: Remove effective-ratings note from Team Comparison only (l.3364)

Old:
```
 return `<table><tbody>${rows}</tbody></table><p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;
```
New:
```
 return `<table><tbody>${rows}</tbody></table>`;
```
Note: This line is inside `unitComparisonHTML` (l.3374) which is used by BOTH the Team Comparison page and the home-page comparison. To keep the note on the Draft Simulator's home-page comparison, Claude must either: (a) move the note to the callers (l.3420 and l.6399) instead of inside `unitComparisonHTML`, or (b) add a parameter. Recommended: move the note to the two call sites. The note stays at l.3420 (home comparison) and l.6399 (Team Comparison page) — wait, the Owner wants it REMOVED from Team Comparison only. So: remove from l.3364 (unitComparisonHTML), and add it back at l.3420 (home comparison only). l.6399 (Team Comparison page) gets no note.

### Edit TC-3: Unit Comparison table — remove parentheses + reorganize by Offense/Defense

Add a new constant (near l.643):
```
const COMPARE_KEYS = ['QB','OL','RB','WR','TE','RUN','PASS','DL','LB','SEC','RUND','PASSD'];
```

Modify `unitComparisonHTML` (l.3374) to accept an optional keys parameter and render subtitle rows:
```
function unitComparisonHTML(poolA, poolB, keys){
 keys = keys || DETAIL_KEYS;
 const mA = computeDetailMetrics(poolA, keys), mB = computeDetailMetrics(poolB, keys);
 let rows='', aUnits=0, bUnits=0;
 // Offense subtitle
 rows += `<tr><td colspan="3" style="font-weight:700;background:var(--sub-bg);">Offense</td></tr>`;
 mA.forEach((ma,i)=>{
  if(i===7) rows += `<tr><td colspan="3" style="font-weight:700;background:var(--sub-bg);">Defense</td></tr>`;
  const mb = mB[i];
  if(ma.avg>mb.avg) aUnits++; else if(mb.avg>ma.avg) bUnits++;
  const label = ma.label.replace(/\s*\([^)]*\)/, '');
  rows += `<tr><td style="${ma.avg>mb.avg?'font-weight:700;color:var(--good);':''}">${ma.avg.toFixed(1)}</td><td class="narr" style="text-align:center;">${label}</td><td style="${mb.avg>mb.avg?'font-weight:700;color:var(--good);':''}text-align:right;">${mb.avg.toFixed(1)}</td></tr>`;
 });
 return {html:`<table><tbody>${rows}</tbody></table>`, aUnits, bUnits, total:mA.length};
}
```

Modify `computeDetailMetrics` (l.667) to accept keys:
```
function computeDetailMetrics(pool, keys){
 keys = keys || DETAIL_KEYS;
 const allTeams = Object.keys(TEAM_DATA);
 return keys.map(key=>{
  ...
```

Update call sites:
- l.3410 (home comparison): `unitComparisonHTML(PLAYERS.filter(p=>p[2]===a), PLAYERS.filter(p=>p[2]===b))` → unchanged (uses DETAIL_KEYS, keeps note).
- l.6387 (Team Comparison page): `const units = unitComparisonHTML(a.pool, b.pool);` → `const units = unitComparisonHTML(a.pool, b.pool, COMPARE_KEYS);` (no note).

Note: LB must exist in GROUP_DEFS. It does: `'LB'` key with label "Linebackers (MIKE+WILL+SAM)". After paren removal: "Linebackers".

The Owner's 12-row order (COMPARE_KEYS) = QB, OL, RB, WR, TE, RUN, PASS, DL, LB, SEC, RUND, PASSD. This drops PRIMCOV and reorders DEFENSE to after the offense block (DEFENSE becomes the "Defense" subtitle, not a data row). Wait — the Owner's list includes "Defense" as a subtitle, not a data row. And "Offense" as a subtitle. So COMPARE_KEYS has 12 data keys, with subtitle rows inserted before index 0 (Offense) and before index 7 (Defense).

PRIMCOV is dropped. LB is added (was not in DETAIL_KEYS but exists in GROUP_DEFS).

## Guide edits

### Edit G-1: Remove Guide box header (l.5052)

Old:
```
 return `<div class="panel" style="margin-bottom:14px;"><h3 style="margin-top:0;">Guide</h3><p class="narr">Short reference sections for the terms the sim uses. Click through only what you need.</p></div>`
```
New:
```
 return ``
```
(Remove the entire panel div. The sections follow directly.)

### Edit G-2: Rewrite season playthrough (l.5035)

Old:
```
  <li><b>Play the season.</b> Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>
```
New:
```
  <li><b>Play the season.</b> Seventeen-game regular season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.</li>
```

### Edit G-3: Remove "(what caused sacks and big runs)" (l.5035)

Old:
```
  <li><b>Review.</b> Game recaps, awards, advanced stats (what caused sacks and big runs), a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>
```
New:
```
  <li><b>Review.</b> Game recaps, awards, advanced stats, a critique of your picks, and a 100-season simulation that shows how much of your result was skill and how much was luck.</li>
```

### Edit G-4: valueTiersHTML — remove "wins from a 70→90 upgrade" (l.4985)

Old:
```
 return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b> (${l[0].w.toFixed(1)}${l.length>1?'–'+l[l.length-1].w.toFixed(1):''} wins from a 70→90 upgrade): ${l.map(r=>slotName(r.s)).join(', ')}.</li>` : ''; }).join('')}</ul>`;
```
New:
```
 return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b>: ${l.map(r=>slotName(r.s)).join(', ')}.</li>` : ''; }).join('')}</ul>`;
```

### Edit G-5: slotRoleTableHTML — remove "Wins, 70→90" column (l.4905–4909)

Old:
```
 const body = rows.map(r=>Object.assign({up:slotWins(r.slot,90)-slotWins(r.slot,70)}, r)).sort((a,b)=>b.up-a.up);
 const body = rows.map(r=>`<tr><td><b>${slotName(r.slot)}</b></td><td class="score">${r.up.toFixed(2)}</td><td class="score">${r.wpo>=0.0005?'+'+r.wpo.toFixed(3):'~0'}</td><td>${r.kick>0.5?'kicking only':`${(r.passShare*100).toFixed(0)}% pass · ${(r.runShare*100).toFixed(0)}% run`}</td><td class="narr">${r.roles.join(' · ')}</td></tr>`).join('');
 return `<table><thead><tr><th>Starting spot</th><th title="Extra wins per season if this spot goes from a 70 to a 90">Wins from a 70→90 upgrade</th><th>Wins per +1 rating</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;
```
New:
```
 const body = rows.map(r=>`<tr><td><b>${slotName(r.slot)}</b></td><td class="score">${r.wpo>=0.0005?'+'+r.wpo.toFixed(3):'~0'}</td><td>${r.kick>0.5?'kicking only':`${(r.passShare*100).toFixed(0)}% pass · ${(r.runShare*100).toFixed(0)}% run`}</td><td class="narr">${r.roles.join(' · ')}</td></tr>`).join('');
 return `<table><thead><tr><th>Starting spot</th><th>Wins per +1 rating</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;
```

### Edit G-6: boardMathHTML — remove "Value here" bullet (l.4991)

Old:
```
  <li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).</li>
```
New: (remove the entire line)

### Edit G-7: SUPP_TITLES tabCompareBtn (l.823)

Old:
```
tabCompareBtn:['Team Comparison','Put any two real rosters side by side.']
```
New:
```
tabCompareBtn:['Team Comparison','Put any two rosters side by side.']
```

## Verification

- `node --check` on extracted script (exit 0).
- Visual: Team Comparison shows 12 data rows in Offense/Defense groups with subtitle rows, no parentheses in labels, no effective-ratings note, no verdict description. Default matchup Chiefs vs Raiders.
- Guide: no Guide box header, season text updated, advanced stats text simplified, value tiers without "wins from 70→90", slot role table without "Wins 70→90" column, no "Value here" bullet.
- No console errors.

## What BOC did not check

- Whether the `unitComparisonHTML` function is called elsewhere besides l.3410 and l.6387 (grep found only those two).
- Whether removing PRIMCOV from DETAIL_KEYS affects other views (it's only used in computeDetailMetrics, called by unitComparisonHTML and renderDetailHTML). renderDetailHTML (l.667) uses DETAIL_KEYS directly — removing PRIMCOV there would also remove it from the team detail view. If the Owner wants PRIMCOV kept elsewhere, use COMPARE_KEYS only in unitComparisonHTML and keep DETAIL_KEYS unchanged.
- The weight adjustments (K 0.72→0.45, WR2 0.60→0.63, RB1 0.67→0.58, CB2 1.18→0.95, DE1 1.30→1.38, TE1 within 0.5 of WR1, TE2 within 0.5 of WR3, pass/run split adjustments) are DEFAULT_WEIGHTS/slotWinsPerOvr changes (protected constants). Owner provided these as desired changes; Claude decides whether to apply. BOC presents as proposal.
- The guide's "Reading the draft board" section title update (already in value-here-prototype.md M-355).
