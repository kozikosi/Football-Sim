# V22 Aesthetic Enhancement Proposals — Detailed

**Target build:** `Football-Sim-PreColors.html`, sha256 `40233d6be00e987c…`, 657,486 B
**Seat:** OR (Council Adviser, S-1800–1899)
**Date:** 2026-10-24

All proposals below are **advisory** — they document exact changes, blast radius, and verification steps. Implementation is the Architect's call. No protected constants touched.

---

## Proposal 1 · Enhanced Color System

**WHERE:** `:root{}` block at `Football-Sim-PreColors.html:14-22`
**WHAT:** Expand the 8-core color palette to 15 semantic colors with WCAG-compliant contrasts, add a `data-theme="dark"` toggle, and update light-mode palette for better balance.

Old:
```css
:root{
 --bg:#0b0e14; --panel:#141922; --panel2:#1b2230; --text:#e8ecf3; --sub:#9fb0c0;
 --accent:#4f8cff; --accent2:#ff6b4a; --border:#2a3142; --good:#3ecf8e; --bad:#ff6b6b;
}
@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]){
  --bg:#f4f6fa; --panel:#ffffff; --panel2:#eef1f6; --text:#161b22; --sub:#5a6472; --border:#dde2ea;
 }
}
```

New:
```css
:root{
 --bg:#0b0e14; --panel:#141922; --panel2:#1b2230; --alt:#222936;
 --text:#e8ecf3; --sub:#9fb0c0; --muted:#6a7a8a;
 --accent:#4f8cff; --accent-hover:#6bb0ff;
 --accent2:#ff6b4a; --accent2-hover:#ff8762;
 --border:#2a3142; --border-hover:#404a5e;
 --good:#3ecf8e; --good-bg:rgba(62,207,142,.12);
 --bad:#ff6b6b; --bad-bg:rgba(255,107,107,.12);
 --warn:#ffb347; --warn-bg:rgba(255,179,71,.12);
 --gold:#ffd75e; --gold-bg:rgba(255,215,94,.12);
 --radius:12px; --radius-sm:8px; --radius-full:9999px;
 --shadow:0 4px 16px rgba(0,0,0,.35);
 --shadow-lg:0 8px 32px rgba(0,0,0,.45);
}
@media (prefers-color-scheme: light){
 :root:not([data-theme="dark"]){
  --bg:#f4f6fa; --panel:#ffffff; --panel2:#eef1f6; --alt:#e3e8ef;
  --text:#161b22; --sub:#5a6472; --muted:#7a8595;
  --border:#dde2ea; --border-hover:#b8c1d1;
  --good-bg:rgba(62,207,142,.08); --bad-bg:rgba(255,107,107,.08);
  --warn-bg:rgba(255,179,71,.10); --gold-bg:rgba(255,215,94,.10);
 }
}
```

**Blast radius:** All CSS `var(--*)` references. Safe — old variables are supersets.
**SAFE ALONE?:** YES — only CSS variables added/changed. No JS references.
**HOW TO CHECK:**
```bash
# Verify all old var names still exist
grep -o "var(--[a-z0-9-]*)" Football-Sim-PreColors.html | sort -u | wc -l
# Expected: same count or more (no removals)
# Visual: check dark mode / light mode contrast
node tools/lint.mjs product Football-Sim-PreColors.html
```

**VERIFIED:** N/A — proposal only.

---

## Proposal 2 · Typography Hierarchy System

**WHERE:** `Football-Sim-PreColors.html:25-29` (body, h1, .sub)
**WHAT:** Define a complete typographic scale with consistent sizes, line heights, and weights.

New additions to body rule + new heading classes:
```css
html,body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}
h1{font-size:1.4rem;margin:0 0 4px;font-weight:700;line-height:1.2;}
h2{font-size:1.15rem;margin:0 0 6px;font-weight:600;line-height:1.3;}
h3{font-size:1rem;margin:0 0 4px;font-weight:600;line-height:1.3;}
h4{font-size:0.8rem;margin:14px 0 6px;text-transform:uppercase;letter-spacing:.04em;color:var(--sub);font-weight:600;}
.body-md{font-size:0.85rem;line-height:1.5;}
.caption-sm{font-size:0.68rem;line-height:1.4;color:var(--sub);text-transform:uppercase;letter-spacing:.04em;}
```

**Blast radius:** All `h1`-`h4`, `.sub`, body text across all screens.
**SAFE ALONE?:** YES — class additions, no deletions.
**HOW TO CHECK:**
```bash
# Ensure all heading sizes are defined
grep -n "font-size" Football-Sim-PreColors.html | head -20
# Visual comparison across all four screens
node tests/e2e-smoke.mjs "<build>" --port 9222
```

---

## Proposal 3 · Unified Interactive States

**WHERE:** All interactive elements using `.panel`, `.resetbtn`, `.tabbtn`, `.posbtn`, `.slider-tog`, `.closebtn`, `.rank`
**WHAT:** Standardize hover/focus/active states across all interactive elements with consistent transitions.

New:
```css
/* Add to :root — shared transition tokens */
--transition-fast:150ms ease;
--transition-normal:250ms ease;

/* Apply to all interactive elements */
button, .tabbtn, .posbtn, .resetbtn, .closebtn, .qgbtn, .slider-tog, .rank{
 transition:background-var(--transition-fast),border-color var(--transition-fast),color var(--transition-fast),box-shadow var(--transition-fast);
}
.tabbtn:hover{background:var(--panel2);}
.tabbtn:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}
.posbtn:hover{border-color:var(--accent);}
.resetbtn:hover{background:var(--accent-hover);}
.rank:hover{filter:brightness(1.1);}
```

**Blast radius:** All interactive elements across the app.
**SAFE ALONE?:** YES — additions only.
**HOW TO CHECK:**
```bash
# Verify focus outlines are accessible
grep "focus" Football-Sim-PreColors.html | head -10
# Test all interactive elements visually
```

---

## Proposal 4 · Gradient System (Centralized Definitions)

**WHERE:** `Football-Sim-PreColors.html:51,95` (`.bar-fill` and `.mbar-fill`)
**WHAT:** Extract duplicated gradients into CSS variables for maintainability.

New additions:
```css
:root{
 /* ... existing vars ... */
 --gradient-accent:linear-gradient(90deg,var(--accent),var(--accent2));
 --gradient-accent-alt:linear-gradient(100deg,var(--gold),#fff6c4 30%,var(--accent2) 50%,#fff6c4 70%,var(--gold));
 --gradient-sf:linear-gradient(90deg,rgba(255,196,60,.22),rgba(255,196,60,.04));
}
/* Then update .bar-fill and .mbar-fill */
.bar-fill{background:var(--gradient-accent);height:100%;}
.metricrow .mbar-fill{height:100%;background:var(--gradient-accent);}
.sfrow.sf90{background:var(--gradient-sf);border-left:3px solid var(--gold);}
```

**Blast radius:** `.bar-fill`, `.mbar-fill`, `.sfrow.sf90` — appears only in their definitions.
**SAFE ALONE?:** YES — variable extraction, no logic changes.
**HOW TO CHECK:**
```bash
grep -c "linear-gradient" Football-Sim-PreColors.html
# Expected: reduced count (centralized into variables)
```

---

## Proposal 5 · Enhanced Card/Panel Design

**WHERE:** `.panel` (l.32), `.score-line` (l.132), `.matchup-card` (l.121), `.detailpanel` (l.89), `.synergy-box` (l.74)
**WHAT:** Add subtle hover elevation and transition effects for card components.

New additions:
```css
.panel, .score-line, .matchup-card, .detailpanel, .synergy-box, .bracket-game{
 transition:transform var(--transition-fast),box-shadow var(--transition-fast);
}
.panel:hover,.matchup-card:hover,.synergy-box:hover{
 transform:translateY(-1px);
 box-shadow:var(--shadow);
}
.panel:focus-within{outline:2px solid var(--accent);outline-offset:2px;}
```

**Blast radius:** All card-like components.
**SAFE ALONE?:** YES — visual enhancement only.
**HOW TO CHECK:**
```bash
# Verify panel hover effects on all screens
# Ensure focus-within works for accessibility
```

---

## Implementation Priority

| Proposal | Complexity | Risk | Priority |
|----------|-----------|------|----------|
| 1. Color System | Medium | Low | P0 |
| 2. Typography | Low | Low | P0 |
| 3. Interactive States | Low | Low | P1 |
| 4. Gradient System | Low | Low | P2 |
| 5. Enhanced Cards | Low | Low | P2 |

**Phase 1 (High Priority):** Proposals 1-2 — foundational design system
**Phase 2 (Medium):** Proposals 3-4 — interaction polish
**Phase 3 (Low):** Proposal 5 — card enhancements

Each proposal can be verified independently with `node --check` and visual comparison. No protected constants are touched in any proposal.