SPEAKER: iceman | ROLE: council advisor | TASK: P-008 lineup comparison cue | DATE: 2026-11-09T23:33:00Z
FOR: P-008

TARGET: `Football-Sim-PreColors.html` (sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657486 B) — **VERIFIED** (`sha256sum Football-Sim-PreColors.html`).

## Claim / finding (VERIFIED)

`renderLineupTableHTML` (line 3351) currently marks the higher effective-rating side with bold + green text on the whole `<td>`:
- left wins: `style="${l.val>r.val?'font-weight:700;color:var(--good);':''}"`
- right wins: `style="${r.val>l.val?'font-weight:700;color:var(--good);':''}text-align:right;"`

`lineupCell` (line 3342) returns `{text, val}` where text includes the player name and effective rating. The green applies to the whole cell (name + rating), which conflicts with P-008 ("neutral names; higher OVR gets a small gold marker + bold").

Separately, a global `.ub` text-node pass (line ~6411+) wraps user team/player names in blue spans. It skips nodes under elements with `classList.contains('ub')` or inline `style.color` containing `accent`, but not lineup comparison cells by default. P-008 requires "do not colour the user's player names blue" in lineup comparison context — the proposal below adds a scope guard for this table.

Owner ruling: `_agents/V23-OWNER-REQUESTS.md` line 15: "Lineup comparison: neutral names; higher OVR gets a small gold marker + bold."

## WHERE (anchor string)

```html
function renderLineupTableHTML(slotmapLeft, slotmapRight){
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<tr><td colspan="3" class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;
  slots.forEach(s=>{
   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<tr>
    <td style="${l.val>r.val?'font-weight:700;color:var(--good);':''}">${l.text}</td>
    <td class="narr" style="text-align:center;">${LABELS[s]||s}</td>
    <td style="${r.val>l.val?'font-weight:700;color:var(--good);':''}text-align:right;">${r.text}</td>
   </tr>`;
  });
 });
 return `<table><tbody>${rows}</tbody></table><p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;
}
```

## old → new

```html
function renderLineupTableHTML(slotmapLeft, slotmapRight){
 const better = (a,b)=> a>b ? '<span class="lineup-better" aria-label="higher rating" style="color:var(--gold, #d4af37);font-weight:700;margin-left:4px;font-size:.85em;">●</span>' : '';
 let rows = '';
 DEPTH_CHART_GROUPS.forEach(([gname, gcls, slots])=>{
  rows += `<tr><td colspan="3" class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;padding-top:12px;">${gname}</td></tr>`;
  slots.forEach(s=>{
   const l = lineupCell(slotmapLeft, s), r = lineupCell(slotmapRight, s);
   rows += `<tr class="lineup-cmp-row">
    <td style="${l.val>r.val?'font-weight:700;':''}color:inherit;">${l.text}${better(l.val,r.val)}</td>
    <td class="narr" style="text-align:center;">${LABELS[s]||s}</td>
    <td style="${r.val>l.val?'font-weight:700;':''}color:inherit;text-align:right;">${r.text}${better(r.val,l.val)}</td>
   </tr>`;
  });
 });
 return `<table class="lineup-cmp"><tbody>${rows}</tbody></table><p class="narr" style="margin:6px 0 0;">Ratings shown are effective ratings — players flexed out of position carry their penalty.</p>`;
}
```

## Optional companion guard (recommended, same concern) — `.ub` pass should not recolor lineup comparison names

WHERE (anchor):
```js
    for(let p=n.parentNode;p&&p!==document.body;p=p.parentNode){ if(SKIP[p.nodeName] || (p.classList && p.classList.contains('ub')) || (p.style && p.style.color && p.style.color.indexOf('accent')>=0)) return NodeFilter.FILTER_REJECT; }
```

old → new:
```js
    for(let p=n.parentNode;p&&p!==document.body;p=p.parentNode){ if(SKIP[p.nodeName] || (p.classList && (p.classList.contains('ub') || p.classList.contains('lineup-cmp'))) || (p.style && p.style.color && p.style.color.indexOf('accent')>=0)) return NodeFilter.FILTER_REJECT; }
```

## WHY

- Removes green (`var(--good)`) from player name/rating cells in lineup comparison and keeps names neutral (`color:inherit`), while preserving "who has the better player" via **bold + small gold marker** on the higher effective rating side.
- `aria-label` on marker helps screen readers; marker is decorative-small and should not dominate at 390 px.
- `.lineup-cmp` guard prevents the global `.ub` blue-name pass from recoloring lineup comparison text, matching "do not colour the user's player names blue" in this view.

## SAFE ALONE?

**Mostly yes, with dependency note.** The `renderLineupTableHTML` change is localized to that function and its 4 call sites render lineup comparisons. The `.ub` guard is a small, targeted skip condition. Visual gold token `--gold` is used elsewhere in V23 planning; if absent in Pre-Colors theme, fallback `#d4af37` applies. **P-008 lists `Needs P-003`** (theme tokens) — final color tuning should align with P-003 token naming once built, but this patch is structurally safe and reviewable now.

## HOW TO CHECK

1. `sha256sum Football-Sim-PreColors.html` before/after build integration should differ only by intended patch (Architect). On Pre-Colors source, anchor match:
   `grep -n "font-weight:700;color:var(--good)" Football-Sim-PreColors.html` → shows 3351-area lines in `renderLineupTableHTML` (expected 2 matches in that function before change).
2. After patch, `node --check` on extracted script: `node tools/lint.mjs extract Football-Sim-PreColors.html /tmp/precolors.js && node --check /tmp/precolors.js` (expected: no syntax error).
3. Visual (Verifier, on built file): open Team Comparison / lineup comparison views; confirm no green name cells, no blue user names inside lineup comparison table, higher OVR side has bold + small gold dot; check at 390 px width (no overflow from marker).
4. `.ub` guard: user team/player names outside lineup comparison still receive `.ub` styling (regression check).

## EVIDENCE

- **VERIFIED:** file hash, line/function anchors (`grep -n`), `renderLineupTableHTML` and `.ub` pass code read from `Football-Sim-PreColors.html`.
- **INFERRED:** `--gold` token may not exist yet in Pre-Colors; fallback color provided.
- **NOT RUN:** browser/390 px render, lint extract+node --check in this session (commands provided for Verifier/Architect).

## Weakest point

The global `.ub` pass behavior depends on how/when lineup tables are inserted and whether future renders add inline accent colors; the `lineup-cmp` class guard is the right scope but should be regression-tested on all lineup comparison surfaces (home comparison, game plan preview, playoff preview, post-draft comparison at 6396).
