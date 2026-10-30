SPEAKER: UK | ROLE: Council Advisor | TASK: P-167 Lineups (Game Preview) fix | DATE: 2026-10-30T05:30Z

FOR: P-167

## TARGET
Football-Sim-PreColors.html — Lineups in Game Preview panel, preview panel lineup rendering, starsFaceoffHTML

## ROOT CAUSES (VERIFIED against Pre-Colors sha256 40233d6be00e987c)

### 1. "undefined" appearing in lineup display
**Anchor:** `lineupCell` function (line 3341-3350)
```js
function lineupCell(slotmap, s){
  const raw = slotmap[s];
  if(!raw) return {text:'—', val:70};
  const e = normalizeSlotEntry(raw);
  if(Array.isArray(raw)){
    const pen = flexPenaltyFor(raw[1], s), eff = raw[3]-pen;
    return {text:`${e.name} (${eff}${pen?` <span class="narr">· flexed −${pen}</span>`:''})`, val:eff};
  }
  return {text: e.name ? `${e.name} (${e.ovr})` : '—', val: e.ovr};
}
```
**Issue:** When `raw` exists but `e.name` is null/undefined (e.g., `{ovr:70, name:null}`), `e.name` is null, so ternary `e.name ? ... : '—'` returns '—' correctly. BUT if `slotmap[s]` is an object with `name: undefined` (not null), the ternary passes and shows "undefined (70)".

**Fix:** Change line 3349 to `return {text: e.name ? `${e.name} (${e.ovr})` : '—', val: e.ovr || 70};` and ensure `normalizeSlotEntry` returns `name: ''` for missing names.

### 2. "too-dark colours" in lineup table
**Anchor:** `renderLineupTableHTML` (line 3351-3365) and CSS
**Issue:** The winner highlighting uses `color:var(--good)` (line 3358, 3360) which is `#3ecf8e` (line 16) - a bright green that may not contrast well on dark backgrounds. The `--accent` blue (`#4f8cff`) is used elsewhere.

**Fix:** Use team-aware colors via CSS variables `--team-primary` / `--team-secondary` set by `applyTeamColors()` (P-004). For neutral, use `--gold` (`#ffc43c`) for advantage, `--sub` for neutral.

### 3. "every slot filled (Cardinals WR1 missing)" - DATA VERIFIED
**Check:** Arizona Cardinals TEAM_DATA has `WR1":{"ovr":81,"name":"Michael Wilson"}` - WR1 IS present.
**Possible cause:** The issue may be in `starsFaceoffHTML` (line 5397-5403) which filters for `ovr>=85`. Cardinals WR1 is 81 OVR, so not shown in "Stars (85+ OVR)". This is correct behavior, not a bug.

**However:** The lineup table in `renderLineupComparisonHTML` (line 3802-3805) uses `seasonState.teams[team].slotmap` which should have all slots. If a slot is missing from slotmap, `lineupCell` returns '—' with val 70.

**Fix:** Ensure all 26 slots are present in `seasonState.teams[team].slotmap` after draft. Add fallback in `lineupCell` for missing slots.

### 4. "ratings without parentheses"
**Anchor:** `lineupCell` line 3347, 3349
**Current:** Shows `${e.name} (${eff})` and `${e.name} (${e.ovr})` - parentheses ARE present.
**Possible confusion:** The "effective ratings" note at line 3364 says "Ratings shown are effective ratings — players flexed out of position carry their penalty." This note uses class `narr` which is tiny/faded.

### 5. "OFFENSE and DEFENSE headings centred"
**Anchor:** `renderLineupTableHTML` line 3353-3354
```js
rows += `<tr><td colspan="3" class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;
```
**Issue:** `text-align:center` is not set, so headers are left-aligned by default in table cells. The `colspan="3"` should center them but doesn't without explicit alignment.

**Fix:** Add `text-align:center` to the header row style.

### 6. "effective ratings note tiny and fading"
**Anchor:** `renderLineupTableHTML` line 3364
```js
return `<table><tbody>${rows}</tbody></table><p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;
```
**Issue:** Class `narr` makes it small (0.7rem) and low opacity. Per Style Law (P-183), notes should be "tiny and fading" but this is a KEY explanatory note, not decorative.

**Fix:** Keep as `narr` but ensure it's readable. Or move to a tooltip on hover of flexed players.

### 7. "team identity hidden unless clicked"
**Anchor:** `renderIdentityPanel` (line 5192) returns a `<details>` element
**Issue:** Team identity/scouting report is wrapped in `<details>` requiring click to open.
**Fix:** Per P-183 Style Law, remove "see guide for details" and "Back to Simulator" - but team identity should be visible by default in preview. Change `<details>` to `<div>` with open summary visible.

### 8. "foil shimmer on winner of each matchup and every 85+ player in team colour"
**Anchor:** `starsFaceoffHTML` (line 5397-5403) and `renderLineupTableHTML` (line 3351-3365)
**Current:** `starsFaceoffHTML` shows 85+ players with `sf90` class for 90+ (line 5401) which adds star emoji but no shimmer. Lineup table highlights winner with `color:var(--good)` (green).

**Required:** 
- Winner of each position matchup: foil shimmer (gold/rose-gold animation) in team's primary colour
- Every 85+ OVR player: foil shimmer in their team's colour
- Use `--team-primary` CSS variable from P-004 team theming

## REQUIRED CHANGES

### A. Fix `lineupCell` to never show "undefined" (line 3341-3350)
```js
function lineupCell(slotmap, s){
  const raw = slotmap[s];
  if(!raw) return {text:'—', val:70};
  const e = normalizeSlotEntry(raw);
  const name = e.name || '—';
  if(Array.isArray(raw)){
    const pen = flexPenaltyFor(raw[1], s), eff = raw[3]-pen;
    return {text:`${name} (${eff}${pen?` <span class="narr">· flexed −${pen}</span>`:''})`, val:eff};
  }
  return {text: `${name} (${e.ovr})`, val: e.ovr};
}
```

### B. Center OFFENSE/DEFENSE/SPECIAL TEAMS headers (line 3353-3354)
```js
rows += `<tr><td colspan="3" class="narr" style="text-align:center;text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;
```

### C. Update winner highlight to use foil shimmer with team colour (line 3358, 3360)
```js
// Instead of color:var(--good), use team-aware foil shimmer
// Requires applyTeamColors() to set --team-primary on table rows
// For now: use --gold with foil-shimmer class
const lWin = l.val > r.val, rWin = r.val > l.val;
rows += `<tr>
  <td style="${lWin?'font-weight:700;':''}">${lWin ? `<span class="foil-shimmer" style="color:var(--team-${awayTeam}-primary)">${l.text}</span>` : l.text}</td>
  <td class="narr" style="text-align:center;">${LABELS[s]||s}</td>
  <td style="${rWin?'font-weight:700;':''}text-align:right;">${rWin ? `<span class="foil-shimmer" style="color:var(--team-${homeTeam}-primary)">${r.text}</span>` : r.text}</td>
</tr>`;
```

### D. Add foil shimmer to 85+ players in starsFaceoffHTML (line 5401)
```js
// Change sfrow to include foil-shimmer with team colour
st.map(x=>`<div class="sfrow ${x.ovr>=90?'sf90':''}"><span>${x.ovr>=90?'<span class="foil-shimmer sfstar" style="color:var(--team-${team}-primary)">★</span> ':''}<span class="${team===seasonUserTeam()?'ub':''} foil-shimmer" style="color:var(--team-${team}-primary)">${x.name}</span> <span style="opacity:.7;">${LABELS[x.slot]||x.slot}</span></span><b>${x.ovr}</b></div>`)
```

### E. Make team identity visible by default in preview (renderIdentityPanel line 5192)
Change `<details>` to `<div class="panel">` with header visible, remove `<summary>` wrapper.

### F. Ensure all 26 slots exist in slotmap
Add validation in `startSeason()` or `applyLineup()` to fill missing slots with replacement-level placeholders.

## ANCHORS (exact line numbers from Pre-Colors)
- `lineupCell`: 3341-3350
- `renderLineupTableHTML`: 3351-3365
- `renderLineupComparisonHTML`: 3802-3805
- `starsFaceoffHTML`: 5397-5403
- `renderPreviewPanel`: 5405-5409
- `renderIdentityPanel`: 5192-5203
- `normalizeSlotEntry`: 3335-3338
- `lineupPanelHTML`: 5125-5128

## SAFE ALONE?
Presentational + data fixes. No protected constants. No math changes. CSS variables for team colours depend on P-004 `applyTeamColors()` — if not ready, use `--gold`/`--accent` as fallback.

## HOW TO CHECK
1. Open Game Preview for any matchup → lineup table shows all 26 slots per team, no "undefined"
2. OFFENSE/DEFENSE/SPECIAL TEAMS headers centered
3. Winner of each position matchup has foil shimmer in team colour
4. Stars (85+ OVR) in starsFaceoffHTML have foil shimmer in team colour
5. Team identity panel visible without clicking
6. Effective ratings note readable (not microscopic)
7. Mobile 390px: table scrolls horizontally, no overflow
8. `node tools/lint.mjs product Football-Sim-PreColors.html` → exit 0

## EVIDENCE LABEL
VERIFIED (anchors and data checked against Pre-Colors sha256 40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd)