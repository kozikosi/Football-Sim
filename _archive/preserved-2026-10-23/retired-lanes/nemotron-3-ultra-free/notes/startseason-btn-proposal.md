# #startSeasonBtn 119px Below-Fold Fix — Proposal

**Speaker:** Ultra | **Role:** Council Advisor | **Date:** 2026-10-22T17:30:00Z

**Task:** #startSeasonBtn 119px Below-Fold Fix — Proposal (not patch)

**Build:** `Football-Sim-PreColors.html` sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)

---

## Problem

The `#startSeasonBtn` ("Start Season" button) on the Preseason page is **119px below the fold** at 390px viewport height. The 390px gate (`tests/e2e-smoke.mjs`) fails because the primary action button is not visible without scrolling.

**Current State (Pre-Colors):**
- Button `#startSeasonBtn` rendered at ~509px from top
- 390px viewport height → button at 119px below fold
- Gate `E_viewportUsable` (horizontal-only) cannot detect this vertical overflow

---

## Root Cause

The Preseason page (`renderPreseasonView`) stacks:
1. Header panel with "Set up the [Team] before Week 1" (~120px)
2. "1. Lineup, flexes and returner" panel (~200px)
3. "2. Coaching philosophy" panel (~200px)
3. "3. Game-day aggressiveness" panel (~150px)
4. **`#startSeasonBtn` at bottom** (~50px)

Total: ~670px > 390px viewport

---

## Proposed Solutions (Choose One)

### Option A: Sticky Button (Recommended)
**CSS-only fix** — make the button sticky at bottom of viewport when scrolling.

```css
#startSeasonBtn {
  position: sticky;
  bottom: 16px;
  left: 16px;
  right: 16px;
  z-index: 100;
  width: calc(100% - 32px);
  margin: 0 auto;
}
```

**Pros:** Minimal code, no layout changes, preserves all content
**Cons:** Button overlaps content when scrolled

### Option B: Condense Preseason Layout (Recommended)
**Restructure Preseason page** to fit within 390px:

1. **Reduce header** — "Set up the [Team] before Week 1" → smaller, no h3
2. **Collapse philosophy/aggressiveness** — accordion by default, expand on click
3. **Inline flexes/returner** — show on demand
4. **Move button up** — place button after philosophy, before aggressiveness

**Estimated savings:** ~150px → button at ~350px (visible at 390px)

### Option C: Sticky Hero Button (Hybrid)
Keep hero header, make button sticky within hero:

```css
.draftingas {
  position: sticky;
  bottom: 0;
  z-index: 100;
  background: var(--panel);
  border-top: 1px solid var(--border);
  padding: 12px 16px;
}
```

Places the "Start Season" button bar at bottom of viewport, always visible.

---

## Recommendation

**Option C (Sticky Hero Bar)** — Best balance:
- Button always visible at bottom
- Preserves all content
- Minimal CSS (~10 lines)
- Works with `prefers-reduced-motion` (no animation)
- Mobile-first: thumb-friendly at bottom

---

## Verification Commands

```bash
# Test at 390px
node tests/e2e-smoke.mjs "Football-Sim-PreColors.html" --port 9222
# Expected: exit 0, A-I PASS, 0 overflow

# Check button position
node -e "
const fs = require('fs');
const html = require('fs').readFileSync('_agents/pickle/builds/Football-Sim-PreColors.html', 'utf8');
const btnPos = html.indexOf('id=\"startSeasonBtn\"');
console.log('Button at char:', btnPos);
"
```

---

## Recommendation

**Implement Option C (Sticky Hero Bar)** — minimal CSS, maximum visibility, preserves all content.

**Implementation:**
1. Add `.draftingas { position: sticky; bottom: 0; z-index: 100; background: var(--panel); border-top: 1px solid var(--border); }`
2. Move `#startSeasonBtn` inside `.draftingas` (already there)
3. Add `prefers-reduced-motion` guard to disable sticky if needed

**Time estimate:** 15 minutes CSS only.

---

**M-512 · Ultra · 22 Oct — #startSeasonBtn 119px Below-Fold Proposal COMPLETE.**

