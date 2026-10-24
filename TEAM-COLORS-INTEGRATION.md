# Team Colors Integration Guide for Claude

Quick drop-in instructions for plugging the color system into `Football-Sim-PreColors.html` or a new prototype.

## Files Created
- `TEAM-COLORS-PLUGINS.js` - Helper functions, TEAM_COLORS data, renderers
- `TEAM-COLORS-STYLES.css` - All CSS for S2, S4, S11, S12, S15, etc.

## Step 1: Add CSS
In the `<style>` block of your HTML, add the contents of `TEAM-COLORS-STYLES.css`.

## Step 2: Add JavaScript
In the `<script>` block (before closing `</script>`), add the contents of `TEAM-COLORS-PLUGINS.js`.

Or include them as external files if working locally:
```html
<link rel="stylesheet" href="TEAM-COLORS-STYLES.css">
<script src="TEAM-COLORS-PLUGINS.js"></script>
```

## Step 3: Wire Up Key Places

### A. Draft Board Rows (S2)
In `renderDraftBoard2()` or where rows are built (around line ~1766 in PreColors):
```js
h += `<tr class="teamrow" data-team="${r.p[2]}" ...>`;
```
The CSS will auto-apply the left edge. Also call `emitTeamColorCSS()` after DOM ready (already auto-called).

### B. Draft Board Header (S4)
Replace the drafting header with team frame:
```js
function renderDraftHeader(teamName, pickInfo){
  return renderTeamFrame(teamName, {role:'home', label:`Drafting as ${teamName}`, record: pickInfo});
}
```

### C. Game Preview (S5, S11)
```js
function renderGamePreview(home, away){
  let html = renderVsCard(home, away);
  html += `<div class="kp-grid">...use .opp-panel with data-team...</div>`;
  return html;
}
```

### D. Standings (S12)
When building standings rows:
```js
h += `<tr class="teamrow ${isUser?'user-row':''}" data-team="${r.team}">...`;
```
Also add classes to conference headers:
```js
<h5 class="conf-${conf}">${conf} playoff field</h5>
```

### E. Season Review (S20)
```js
html += renderTeamFrame(userTeam, {season:true, role:'home', label:userTeam, record:`${w}-${l}-${t}`, content: seasonHTML});
```

### F. 100-Season Report (S15)
```js
// For histogram bars
style="background: var(--t1);"
// Or add data-team and use CSS
<div class="hist-bar" data-team="${teamName}" style="height:${pct}%"></div>
```

### G. Team Names Everywhere (S16)
Replace manual coloring with `teamTag()`:
```js
// Before: <span style="color:var(--accent)">Chiefs</span>
// After:
${teamTag(teamName, {chip:true})}
```

## Quick Test Snippet
Add to console or a test function:
```js
console.log(getTeamColors('Kansas City Chiefs')); // {t1:'#E31837',...}
document.body.insertAdjacentHTML('beforeend', renderVsCard('Kansas City Chiefs','San Francisco 49ers'));
document.body.insertAdjacentHTML('beforeend', renderTeamFrame('Buffalo Bills',{season:true, record:'14-3'}));
```

## Notes
- Uses CSS custom properties `--t1/--t2/--t3` per team via `[data-team="..."]`
- Falls back gracefully if colors missing
- Respects reduced motion
- Works in dark/light themes
- Follows "color identifies team, not value" rule
- Max 2 saturated colors per screen via role system
