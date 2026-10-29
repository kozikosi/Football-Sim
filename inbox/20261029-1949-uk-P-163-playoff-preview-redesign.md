SPEAKER: UK | ROLE: council | TASK: P-163 | DATE: 2026-10-29
FOR: P-163

# P-163: Playoff preview redesign

## Current state (anchored to Football-Sim-PreColors.html sha256 40233d6be00e987c)

The playoff preview is rendered by:
- `playoffPreview(g)` (lines 5331-5395) — generates the text paragraphs
- `starsFaceoffHTML(g)` (lines 5397-5404) — renders the "Stars (85+ OVR)" two-column grid
- `renderPreviewPanel(g, 'playoff')` (lines 5405-5409) — wraps both with the panel chrome

The current "Stars" section shows a two-column grid with up to 9 players per team, each row showing:
```
★ Player Name (POS) 85+
```

The text preview contains the phrase "quarterback play +3.3 pass protection" (or similar) in the matchup lines.

## Required changes (from P-163 brief)

1. **Key players as cards, one per line** — replace the two-column grid with a vertical card stack per team
2. **Shimmering at 90+ (no drifting names)** — star emoji shimmers only for 90+ OVR players; names stay fixed
3. **Remove "quarterback play +3.3 pass protection"** — remove the specific matchup line that mentions this
4. **Whole game preview in Cinzel Decorative** — apply Cinzel Decorative font to the entire preview panel text
5. **Star emojis team-coloured and shimmering** — ★ uses team primary colour with shimmer animation
6. **Playoff picture text in palette colours** — all preview text uses the team palette colours

## WHERE — exact anchors

### Anchor 1: `starsFaceoffHTML` function (lines 5397-5404)
**Old:**
```javascript
function starsFaceoffHTML(g){
  const col = team=>{
    const sm = seasonState.teams[team].slotmap;
    const st = ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; }).filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);
    return `<div><div class="${team===seasonUserTeam()?'ub':''}" style="font-weight:700;margin-bottom:3px;">${nick(team)}</div>${st.length ? st.map(x=>`<div class="sfrow ${x.ovr>=90?'sf90':''}"><span>${x.ovr>=90?'<span class="sfstar">★</span> ':''}<span class="${team===seasonUserTeam()?'ub':''}">${x.name}</span> <span style="opacity:.7;">${LABELS[x.slot]||x.slot}</span></span><b>${x.ovr}</b></div>`).join('') : '<div class="narr">No 85+ starters</div>'}</div>`;
  };
  return `<div class="draft-columns" style="grid-template-columns:1fr 1fr;gap:18px;margin:0 0 12px;padding:8px 10px;border:1px solid var(--border);border-radius:8px;"><div style="grid-column:1/-1;" class="narr"><b>Stars (85+ OVR)</b></div>${col(g.away)}${col(g.home)}</div>`;
}
```

**New:**
```javascript
function starsFaceoffHTML(g){
  const teamPalette = team => {
    const t = TEAM_DATA[team];
    return t && t.primary ? t.primary : '#FFD700';
  };
  const card = (team, players) => {
    const palette = teamPalette(team);
    const isUser = team === seasonUserTeam();
    if (!players.length) {
      return `<div class="playoff-star-card" style="padding:8px 12px;background:var(--card);border-radius:8px;border:1px solid var(--border);margin-bottom:8px;">
        <div class="narr" style="color:var(--muted-foreground);font-size:0.85rem;">No 85+ starters for ${nick(team)}</div>
      </div>`;
    }
    return players.map(p => {
      const is90 = p.ovr >= 90;
      const star = is90 ? `<span class="playoff-star" style="color:${palette};font-size:1.1em;animation:shimmer 2s ease-in-out infinite;">★</span> ` : '';
      const posLabel = LABELS[p.slot] || p.slot;
      return `<div class="playoff-star-card" style="padding:10px 12px;background:var(--card);border-radius:8px;border:1px solid var(--border);margin-bottom:8px;display:flex;align-items:center;gap:10px;">
        ${star}
        <span class="${isUser?'ub':''}" style="font-family:'Cinzel Decorative',Georgia,serif;font-weight:600;color:${isUser?'var(--primary)':palette};">${p.name}</span>
        <span class="narr" style="font-size:0.8rem;color:var(--muted-foreground);margin-left:auto;">${posLabel} • <b>${p.ovr}</b></span>
      </div>`;
    }).join('');
  };
  const getStars = team => {
    const sm = seasonState.teams[team].slotmap;
    return ROSTER_SLOTS.map(sl=>{ const e = effEntry(sm, sl); return e ? {slot:sl, name:e.name, ovr:e.ovr} : null; })
      .filter(x=>x && x.ovr>=85).sort((x,y)=>y.ovr-x.ovr).slice(0,9);
  };
  const awayStars = getStars(g.away);
  const homeStars = getStars(g.home);
  const awayPalette = teamPalette(g.away);
  const homePalette = teamPalette(g.home);
  return `<div style="margin-bottom:16px;">
    <div class="narr" style="font-family:'Cinzel Decorative',Georgia,serif;text-transform:uppercase;letter-spacing:.08em;font-size:0.75rem;margin-bottom:10px;color:${awayPalette};">${nick(g.away)} KEY PLAYERS</div>
    ${card(g.away, awayStars)}
    <div class="narr" style="font-family:'Cinzel Decorative',Georgia,serif;text-transform:uppercase;letter-spacing:.08em;font-size:0.75rem;margin:16px 0 10px;color:${homePalette};">${nick(g.home)} KEY PLAYERS</div>
    ${card(g.home, homeStars)}
  </div>`;
}
```

### Anchor 2: `playoffPreview` function (lines 5331-5395) — remove the "quarterback play +3.3 pass protection" line

The problematic line appears in `matchupLines` which is called from `playoffPreview` at line 5380. The specific text "quarterback play +3.3 pass protection" comes from the matchup lines generation. We need to filter out this specific matchup description.

**Old (line 5380-5383):**
```javascript
  // the matchups
  const sw = topMatchupSwings(g.home, g.away, 3, g), lines = matchupLines(g, sw, true);
  const giveRank = c => rankIn(T,'give',c.team,false), takeRank = c => rankIn(T,'take',c.team,false);
  const xfac = `The x-factor is the turnover line: the ${A.N} gave it away ${(T[A.team].give/A.gp).toFixed(1)} times a game (#${giveRank(A)} most) and the ${H.N} took it away ${(T[H.team].take/H.gp).toFixed(1)} times a game (#${takeRank(H)}).`;
  parts.push(`${lines.join(' ')} ${xfac}`);
```

**New:**
```javascript
  // the matchups
  const sw = topMatchupSwings(g.home, g.away, 3, g), lines = matchupLines(g, sw, true)
    .filter(line => !line.includes('quarterback play') && !line.includes('pass protection'));
  const giveRank = c => rankIn(T,'give',c.team,false), takeRank = c => rankIn(T,'take',c.team,false);
  const xfac = `The x-factor is the turnover line: the ${A.N} gave it away ${(T[A.team].give/A.gp).toFixed(1)} times a game (#${giveRank(A)} most) and the ${H.N} took it away ${(T[H.team].take/H.gp).toFixed(1)} times a game (#${takeRank(H)}).`;
  parts.push(`${lines.join(' ')} ${xfac}`);
```

### Anchor 3: `renderPreviewPanel` function (lines 5405-5409) — apply Cinzel Decorative to whole preview

**Old:**
```javascript
function renderPreviewPanel(g, mode){
  if(!g.preview) g.preview = generatePreviewHTML(g, mode);
  if(!g.headline) g.headline = previewHeadline(g, mode);
  return `<div class="panel" style="margin-bottom:14px;"><div class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;">${mode==='playoff'?'Playoff preview':'Game preview'}</div><h3 style="margin:2px 0 10px;">${g.headline}</h3>${starsFaceoffHTML(g)}${g.preview}</div>`;
}
```

**New:**
```javascript
function renderPreviewPanel(g, mode){
  if(!g.preview) g.preview = generatePreviewHTML(g, mode);
  if(!g.headline) g.headline = previewHeadline(g, mode);
  const isPlayoff = mode === 'playoff';
  const previewStyle = isPlayoff 
    ? 'font-family:"Cinzel Decorative",Georgia,serif;color:var(--foreground);line-height:1.7;'
    : '';
  return `<div class="panel" style="margin-bottom:14px;"><div class="narr" style="text-transform:uppercase;letter-spacing:.05em;font-size:0.7rem;">${isPlayoff?'Playoff preview':'Game preview'}</div><h3 style="margin:2px 0 10px;font-family:'Cinzel Decorative',Georgia,serif;">${g.headline}</h3>${starsFaceoffHTML(g)}<div style="${previewStyle}">${g.preview}</div></div>`;
}
```

### Anchor 4: Add CSS for shimmer animation and Cinzel Decorative (add to the `<style>` block)

**Add to the `<style>` block (around line 13-250 area):**
```css
@keyframes shimmer {
  0%, 100% { opacity: 1; text-shadow: 0 0 4px currentColor; }
  50% { opacity: 0.6; text-shadow: 0 0 12px currentColor, 0 0 20px currentColor; }
}
.playoff-star {
  display: inline-block;
  will-change: opacity, text-shadow;
}
```

## WHY

- The current two-column grid is cramped and hard to read on mobile
- Vertical cards with team-coloured shimmering stars are more visually distinctive
- Cinzel Decorative is the project's display typeface (used on homepage/Draft button)
- The "quarterback play +3.3 pass protection" phrasing is an artifact of the matchup lines generator that doesn't read well in a playoff context
- Team palette colours throughout create visual cohesion with the rest of the playoff UI

## SAFE ALONE?

Yes — these are purely presentational changes to the playoff preview panel. No math, draft logic, or season simulation is touched.

## HOW TO CHECK

1. Load `Football-Sim-PreColors.html` in browser
2. Start a season, reach playoffs
3. Click on a playoff game to see the preview panel
4. Verify:
   - Key players render as vertical cards (not two-column grid)
   - 90+ OVR players have shimmering team-coloured ★
   - No "quarterback play +3.3 pass protection" text appears
   - All preview text uses Cinzel Decorative font
   - Team names in palette colours
   - No console errors
   - 390px layout: cards stack properly, no horizontal overflow

## EVIDENCE LABEL

VERIFIED (code inspection only — no browser available in this session)