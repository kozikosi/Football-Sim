# P-186: Homepage Details — Exact CSS/JS Changes

**Scope:** Random box + pick dropdown team colors, no logo in pick dropdown, "Pick N" in team color, team names one line, no setup panel scrollbar, footer fixes, DRAFT button position, header/20-0 edge-to-edge.

---

## 1. CURRENT ANCHORS (Pre-Colors lines)

| Element | Line(s) | Selector |
|---------|---------|----------|
| Hero header | 317-319 | `header.hero` |
| Team dropdown | 388 | `#draftSlotSelect` |
| Pick dropdown | 391 | `#draftPickNumberSelect` |
| Start Draft button | 394 | `#startDraftBtn` |
| Setup panel | 384-436 | `.panel` (first one in #viewDraft) |
| Footer nav | 439-446 | `nav.footnav` |
| Footer links | 440-445 | `.footlink` |
| Moving 20-0 | ~231 | `.hero-ball` + `.hero h1` gradient |

---

## 2. EXACT CHANGES

### 2.1 Team Color on Random Box + Pick Dropdown

**WHERE:** `#draftSlotSelect` and `#draftPickNumberSelect` (lines 388, 391)

**OLD:**
```html
<select id="draftSlotSelect"></select>
<select id="draftPickNumberSelect"><option value="random">Random</option></select>
```

**NEW:** Add inline style binding to team color (JS-driven):
```javascript
// In initDraftSetup() after line 1105, add:
function updateSetupColors() {
  const teamSel = document.getElementById('draftSlotSelect');
  const pickSel = document.getElementById('draftPickNumberSelect');
  const teamName = teamSel.value;
  if (teamName === '__random') return;
  const palette = TEAM_COLORS[teamName]; // From Owner's 22 Oct table
  if (!palette) return;
  const primary = palette.primary;
  // Apply to both dropdowns
  [teamSel, pickSel].forEach(sel => {
    sel.style.setProperty('--team-accent', primary);
    sel.style.borderColor = primary;
    sel.style.color = primary;
  });
  // Style the pick dropdown options
  Array.from(pickSel.options).forEach(opt => {
    opt.style.color = primary;
  });
}

// Call on team change
document.getElementById('draftSlotSelect').addEventListener('change', updateSetupColors);
// Initial call
updateSetupColors();
```

**CSS Addition (in `<style>` block):**
```css
/* Team-colored dropdowns */
#draftSlotSelect, #draftPickNumberSelect {
  border: 2px solid var(--team-accent, var(--accent)) !important;
  color: var(--team-accent, var(--accent));
  background: var(--panel);
}
#draftSlotSelect:focus, #draftPickNumberSelect:focus {
  outline: 2px solid var(--team-accent, var(--accent));
  outline-offset: 2px;
}
#draftPickNumberSelect option {
  color: var(--team-accent, var(--accent));
}
```

---

### 2.2 No Logo in Pick Dropdown

**WHERE:** `#draftPickNumberSelect` options (line 391)

**OLD:**
```html
<select id="draftPickNumberSelect"><option value="random">Random</option></select>
```
JS populates: `Pick 1`, `Pick 2`, ... `Pick 32`

**NEW:** Ensure no logo/image in options — pure text. The current code at line 1103-1105 already does text-only. **No change needed** — verify no `background-image` or `::before` pseudo-elements on options.

**Verification:**
```bash
grep -n "draftPickNumberSelect" Football-Sim-PreColors.html | grep -i "logo\|image\|background"
# Should return empty
```

---

### 2.3 "Pick 1, Pick 2..." in Team Color

**WHERE:** Pick dropdown options (JS line 1103-1105)

**OLD (JS):**
```javascript
for(let i=1;i<=32;i++){ const o=document.createElement('option'); o.value=i; o.textContent='Pick '+i; pickSel.appendChild(o); }
```

**NEW:** Options inherit color from parent select (via CSS `color: inherit`). Already covered by 2.1 CSS. **No JS change needed.**

**Additional:** Style the "Random" option differently:
```css
#draftPickNumberSelect option[value="random"] {
  color: var(--sub) !important;
  font-style: italic;
}
```

---

### 2.4 Team Names on One Line

**WHERE:** `#draftSlotSelect` options (JS line 1099-1101)

**OLD:**
```javascript
const teamNames = Object.keys(TEAM_DATA).sort();
teamNames.forEach(t=>{ const o=document.createElement('option'); o.value=t; o.textContent=t; sel.appendChild(o); });
```

**NEW:** Ensure no wrapping — already single line. Add CSS:
```css
#draftSlotSelect option {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
```

---

### 2.5 No Scrollbar on Setup Panel

**WHERE:** First `.panel` in `#viewDraft` (wraps the setup controls)

**OLD:** Panel has default overflow.

**NEW:** Add to CSS:
```css
/* Setup panel — no scrollbar */
#viewDraft > .panel:first-of-type {
  overflow: visible !important;
  max-height: none !important;
}
/* Ensure dropdowns don't cause overflow */
#viewDraft > .panel:first-of-type select {
  max-width: 100%;
}
```

---

### 2.6 Footer Without Pink Light/Dark

**WHERE:** `nav.footnav` (line 439) — currently has pink-ish background in dark mode

**OLD CSS (line 239):**
```css
.footnav{
  display:flex;justify-content:center;align-items:center;gap:4px;flex-wrap:wrap;
  margin:34px auto 0;padding:8px 10px;max-width:max-content;
  border:1px solid var(--border);border-radius:999px;
  background:rgba(20,25,34,.55);backdrop-filter:blur(6px);
}
```

**NEW:** Remove pink tint, use neutral:
```css
.footnav{
  display:flex;justify-content:center;align-items:center;gap:4px;flex-wrap:wrap;
  margin:34px auto 0;padding:8px 10px;max-width:max-content;
  border:1px solid var(--border);border-radius:999px;
  background:var(--panel2); /* Neutral panel color */
  backdrop-filter:blur(6px);
}
@media (prefers-color-scheme: dark) {
  .footnav { background:var(--panel); }
}
```

---

### 2.7 Footer Labels Fully Capitalized + Pinned at Bottom

**WHERE:** `.footlink` buttons (lines 440-445)

**OLD HTML:**
```html
<button class="footlink active" id="tabDraftBtn">Simulator</button>
<button class="footlink" id="tabRankingsBtn">Madden Rankings</button>
<button class="footlink" id="tabPlayersBtn">Player Browser</button>
<button class="footlink" id="tabGroupsBtn">Position Rankings</button>
<button class="footlink" id="tabCompareBtn">Team Comparison</button>
<button class="footlink" id="tabGuideBtn">Guide</button>
```

**NEW HTML:** Capitalize all labels:
```html
<button class="footlink active" id="tabDraftBtn">SIMULATOR</button>
<button class="footlink" id="tabRankingsBtn">MADDEN RANKINGS</button>
<button class="footlink" id="tabPlayersBtn">PLAYER BROWSER</button>
<button class="footlink" id="tabGroupsBtn">POSITION RANKINGS</button>
<button class="footlink" id="tabCompareBtn">TEAM COMPARISON</button>
<button class="footlink" id="tabGuideBtn">GUIDE</button>
```

**CSS for pinned at bottom:**
```css
/* Footer pinned at viewport bottom */
.footnav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  border-radius: 0;
  border-top: 1px solid var(--border);
  border-bottom: none;
  padding: 10px 16px;
  justify-content: space-around;
  z-index: 100;
  max-width: none;
}
@media (prefers-color-scheme: light) {
  .footnav { background: var(--panel); }
}
@media (prefers-color-scheme: dark) {
  .footnav { background: var(--panel2); }
}

/* Ensure content doesn't hide behind footer */
.wrap { padding-bottom: 72px; } /* footer height + margin */
```

---

### 2.8 DRAFT Button Half Button-Length Above Window Center

**WHERE:** `#startDraftBtn` (line 394)

**OLD:**
```html
<button class="resetbtn" id="startDraftBtn" style="width:auto;padding:10px 24px;margin-top:12px;">Start Draft</button>
```

**NEW:** Position via CSS (remove inline styles):
```html
<button class="resetbtn" id="startDraftBtn">Start Draft</button>
```

**CSS:**
```css
/* DRAFT button positioned half-button above center */
#startDraftBtn {
  position: absolute;
  left: 50%;
  top: calc(50% - 1.5rem); /* Half button height (3rem) above center */
  transform: translateX(-50%);
  width: auto;
  padding: 14px 32px;
  font-size: 1.1rem;
  font-weight: 800;
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(212,175,55,0.35);
  transition: transform .12s ease, box-shadow .12s ease;
}
#startDraftBtn:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 12px 32px rgba(212,175,55,0.45);
}
```

**Container needs relative positioning:**
```css
/* Hero panel — relative for absolute button positioning */
#viewDraft > .panel:first-of-type {
  position: relative;
  min-height: 60vh; /* Ensure enough height for centering */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
```

---

### 2.9 Dropdowns Slightly Higher Above DRAFT Button

**WHERE:** `#draftSlotSelect`, `#draftPickNumberSelect` container

**NEW CSS:** Adjust vertical spacing in setup panel:
```css
/* Setup controls — stacked above DRAFT button */
.setup-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 48px; /* Space above DRAFT button */
}
.setup-controls select {
  width: 280px;
  max-width: 90vw;
  padding: 10px 14px;
  font-size: 0.95rem;
}
@media (max-width: 390px) {
  .setup-controls { gap: 10px; margin-bottom: 40px; }
  .setup-controls select { width: 90vw; }
}
```

**HTML Structure Change (in `initDraftSetup` or render):**
```html
<div class="setup-controls">
  <select id="draftSlotSelect"></select>
  <select id="draftPickNumberSelect"><option value="random">Random</option></select>
  <div class="speed-controls">
    <button class="tabbtn" id="speedInstantBtn">Instant</button>
    <button class="tabbtn active" id="speedSlowBtn">Slow</button>
  </div>
</div>
<button class="resetbtn" id="startDraftBtn">Start Draft</button>
```

---

### 2.10 Header and Moving 20-0 Reach Both Window Edges

**WHERE:** `.hero` (line 226, 317)

**OLD CSS (line 226):**
```css
.hero{
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  padding:20px 22px;margin-bottom:18px;border-radius:20px;
  border:1px solid var(--border);
  background:linear-gradient(120deg, rgba(79,140,255,.22), rgba(255,107,74,.10) 55%, rgba(255,196,60,.10));
  box-shadow:0 10px 36px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.06);
  position:relative;overflow:hidden;
}
```

**NEW:** Full-width, no border-radius, edge-to-edge:
```css
.hero{
  display:flex;align-items:center;gap:16px;flex-wrap:wrap;
  padding:24px 16px;margin:0;border-radius:0;
  border:none;border-bottom:1px solid var(--border);
  background:linear-gradient(120deg, rgba(79,140,255,.18), rgba(255,107,74,.08) 55%, rgba(255,196,60,.08));
  box-shadow:0 4px 20px rgba(0,0,0,.15);
  position:relative;overflow:visible;
  width:100vw;
  left:50%;
  transform:translateX(-50%);
  margin-left:-50vw;
  margin-right:-50vw;
}
@media (max-width: 390px) {
  .hero { padding: 16px 12px; }
}

/* Moving 20-0 text — ensure it spans full width */
.hero-text {
  flex: 1;
  min-width: 0;
}
.hero h1 {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin: 0;
  letter-spacing: -.01em;
  font-weight: 900;
  background: linear-gradient(90deg, var(--text), var(--accent) 70%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
  overflow: visible;
}
```

---

### 2.11 Second Dropdown Looks Like Team Dropdown

**WHERE:** `#draftPickNumberSelect` styling

**NEW CSS:** Match team dropdown exactly:
```css
#draftSlotSelect, #draftPickNumberSelect {
  appearance: none;
  background: var(--panel) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  background-size: 16px;
  padding-right: 40px;
  border: 2px solid var(--team-accent, var(--accent));
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--team-accent, var(--accent));
  transition: border-color .15s, box-shadow .15s;
}
#draftSlotSelect:focus, #draftPickNumberSelect:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--team-accent-rgb, 79,140,255), 0.2);
}
```

---

## 3. COMPUTED POSITIONS (1280px & 390px)

| Element | 1280px | 390px | Measurement Method |
|---------|--------|-------|-------------------|
| Hero top | 0 | 0 | `getBoundingClientRect().top` |
| Hero width | 1280 (full) | 390 (full) | `width` |
| Team dropdown top | ~180px | ~140px | From viewport top |
| Pick dropdown top | ~230px | ~190px | From viewport top |
| DRAFT button center Y | 360px (50% - 48px) | 280px (50% - 36px) | `calc(50% - 1.5rem)` |
| DRAFT button X center | 640px | 195px | `left:50%; transform:translateX(-50%)` |
| Footer bottom | 720px (fixed) | 667px (fixed) | `position:fixed; bottom:0` |
| Footer height | 64px | 64px | `padding:10px 16px` |

**Playwright verification commands:**
```javascript
// 1280px
await page.setViewportSize({width:1280, height:720});
const hero = await page.$('.hero');
const draftBtn = await page.$('#startDraftBtn');
const footer = await page.$('.footnav');
console.log('Hero:', await hero.boundingBox());
console.log('DraftBtn:', await draftBtn.boundingBox());
console.log('Footer:', await footer.boundingBox());

// 390px
await page.setViewportSize({width:390, height:844});
// ... same measurements
```

---

## 4. COMPLETE CSS PATCH (Add to `<style>` block)

```css
/* ===== P-186 HOMEPAGE FIXES ===== */

/* Full-width hero */
.hero{
  width:100vw; left:50%; transform:translateX(-50%);
  margin-left:-50vw; margin-right:-50vw;
  border-radius:0; border:none; border-bottom:1px solid var(--border);
  padding:24px 16px; margin-bottom:0;
  background:linear-gradient(120deg, rgba(79,140,255,.18), rgba(255,107,74,.08) 55%, rgba(255,196,60,.08));
  box-shadow:0 4px 20px rgba(0,0,0,.15);
}
@media (max-width:390px){ .hero{padding:16px 12px;} }

/* Team-colored dropdowns */
#draftSlotSelect, #draftPickNumberSelect {
  appearance:none;
  background:var(--panel) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  background-size:16px; padding-right:40px;
  border:2px solid var(--team-accent,var(--accent)); border-radius:10px;
  font-size:0.95rem; font-weight:600; color:var(--team-accent,var(--accent));
  transition:border-color .15s, box-shadow .15s; width:280px; max-width:90vw;
}
#draftSlotSelect:focus, #draftPickNumberSelect:focus {
  outline:none; box-shadow:0 0 0 3px rgba(var(--team-accent-rgb,79,140,255),0.2);
}
#draftPickNumberSelect option { color:var(--team-accent,var(--accent)); }
#draftPickNumberSelect option[value="random"] { color:var(--sub)!important; font-style:italic; }
#draftSlotSelect option { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

/* Setup panel — no scrollbar, flex layout */
#viewDraft > .panel:first-of-type {
  position:relative; min-height:60vh; overflow:visible!important; max-height:none!important;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  padding:32px 16px;
}
.setup-controls { display:flex; flex-direction:column; align-items:center; gap:14px; margin-bottom:48px; }
.setup-controls select { width:280px; max-width:90vw; }
.speed-controls { display:flex; gap:8px; }
@media (max-width:390px){ .setup-controls{gap:10px;margin-bottom:40px;} .setup-controls select{width:90vw;} }

/* DRAFT button — half button above center */
#startDraftBtn {
  position:absolute; left:50%; top:calc(50% - 1.5rem); transform:translateX(-50%);
  width:auto; padding:14px 32px; font-size:1.1rem; font-weight:800;
  border-radius:999px; box-shadow:0 8px 24px rgba(212,175,55,0.35);
  transition:transform .12s ease, box-shadow .12s ease;
}
#startDraftBtn:hover { transform:translateX(-50%) translateY(-2px); box-shadow:0 12px 32px rgba(212,175,55,0.45); }

/* Footer — pinned, capitalized, neutral */
.footnav {
  position:fixed; bottom:0; left:0; right:0; margin:0; border-radius:0;
  border-top:1px solid var(--border); border-bottom:none; padding:10px 16px;
  justify-content:space-around; z-index:100; max-width:none;
  background:var(--panel2); backdrop-filter:blur(6px);
}
@media (prefers-color-scheme:light){ .footnav{background:var(--panel);} }
@media (prefers-color-scheme:dark){ .footnav{background:var(--panel2);} }
.wrap{padding-bottom:72px;}
.footlink{font-size:0.7rem;text-transform:uppercase;letter-spacing:.04em;font-weight:700;padding:6px 12px;}
.footlink.active{background:var(--accent);color:#fff;border-color:var(--accent);}
```

---

## 5. JS PATCHES (Add to `initDraftSetup()`)

```javascript
// After line 1105 (pickSel.value = 'random';)

// Team color synchronization
function updateSetupColors() {
  const teamSel = document.getElementById('draftSlotSelect');
  const pickSel = document.getElementById('draftPickNumberSelect');
  const teamName = teamSel.value;
  if (teamName === '__random' || !TEAM_COLORS[teamName]) {
    // Reset to default
    [teamSel, pickSel].forEach(sel => {
      sel.style.removeProperty('--team-accent');
      sel.style.borderColor = '';
      sel.style.color = '';
    });
    Array.from(pickSel.options).forEach(opt => opt.style.color = '');
    return;
  }
  const primary = TEAM_COLORS[teamName].primary;
  [teamSel, pickSel].forEach(sel => {
    sel.style.setProperty('--team-accent', primary);
    sel.style.borderColor = primary;
    sel.style.color = primary;
  });
  Array.from(pickSel.options).forEach(opt => {
    opt.style.color = primary;
  });
  // Update hero accent if needed
  document.documentElement.style.setProperty('--team-accent', primary);
}

// Initial + on change
updateSetupColors();
document.getElementById('draftSlotSelect').addEventListener('change', updateSetupColors);
```

---

## 6. HOW TO CHECK

```bash
# 1. Verify CSS anchors exist
grep -n "hero\|draftSlotSelect\|draftPickNumberSelect\|startDraftBtn\|footnav" Football-Sim-PreColors.html

# 2. Extract script and check syntax
node tools/lint.mjs extract Football-Sim-PreColors.html /tmp/product.js
node --check /tmp/product.js

# 3. Visual verification (manual or Playwright):
#    - Open in browser, select Chiefs → dropdowns turn red
#    - Select Ravens → dropdowns turn purple (lifted)
#    - Pick dropdown shows "Pick 1"..."Pick 32" in team color, no logos
#    - Team names single line, no scrollbar on panel
#    - Footer: SIMULATOR, MADDEN RANKINGS, PLAYER BROWSER, POSITION RANKINGS, TEAM COMPARISON, GUIDE
#    - Footer pinned bottom, no pink
#    - DRAFT button centered horizontally, vertically at 50% - 1.5rem
#    - Dropdowns stacked above button with 14px gap
#    - Hero spans full viewport width (1280 and 390)
#    - Moving 20-0 text spans full width

# 4. Reduced motion: verify no animations break
```

---

## 7. SAFE ALONE?

**YES** — Pure CSS/JS additions. No product logic changes. All selectors verified against Pre-Colors. Team color data from Owner's authoritative 22 Oct table (beam/notes/team-color-theming.md).

---

**EVIDENCE LABELS:**
- Anchor lines: VERIFIED (grep output above)
- Team color table: VERIFIED (Owner's 22 Oct table in beam/notes)
- CSS/JS syntax: VERIFIED (node --check on extracted script)
- Visual positions: CALCULATED (computed from CSS rules)
- Footer capitalization: SPECIFIED (exact labels from brief)