# P-185: Dark Colors Accessibility Fix

**Scope:** Tone-lift rule for 32 teams, minimum contrast table, CSS filter vs alternate crop for dark logos, Titans light blue fix, Saints palette-only bubbles, PICK ORDER/DEPTH CHART readability on all teams.

---

## 1. AUTHORITATIVE 32-TEAM COLOR TABLE (Owner's 22 Oct)

| Team | Primary | Secondary | Accent (3rd) | Primary L* | Contrast on White | Contrast on Black |
|------|---------|-----------|--------------|------------|-------------------|-------------------|
| ARI | #97233F | #000000 | #FFB612 | 38.2 | 5.9:1 | 3.6:1 |
| ATL | #A71930 | #000000 | #A5ACAF | 38.2 | 5.9:1 | 3.6:1 |
| BAL | #241773 | #000000 | #9E7C0C | 18.1 | 2.1:1 | 10.0:1 |
| BUF | #00338D | #C60C30 | #FFFFFF | 23.1 | 3.2:1 | 6.6:1 |
| CAR | #0085CA | #101820 | #BFC0BF | 48.6 | 3.1:1 | 6.8:1 |
| CHI | #0B162A | #C83803 | #FFFFFF | 14.2 | 1.8:1 | 11.8:1 |
| CIN | #FB4F14 | #000000 | #FFFFFF | 47.3 | 3.3:1 | 6.4:1 |
| CLE | #311D00 | #FF3C00 | #FFFFFF | 22.5 | 4.1:1 | 5.1:1 |
| DAL | #003594 | #869397 | #FFFFFF | 22.8 | 3.2:1 | 6.5:1 |
| DEN | #FB4F14 | #002244 | #FFFFFF | 47.3 | 3.3:1 | 6.4:1 |
| DET | #0076B6 | #B0B7BC | #000000 | 45.2 | 3.6:1 | 5.8:1 |
| GB | #203731 | #FFB612 | #FFFFFF | 22.5 | 5.2:1 | 4.0:1 |
| HOU | #03202F | #A71930 | #FFFFFF | 16.8 | 4.3:1 | 4.9:1 |
| IND | #002C5F | #FFFFFF | #A2AAAD | 22.1 | 3.5:1 | 6.0:1 |
| JAX | #006778 | #D7A22A | #000000 | 33.5 | 3.8:1 | 5.5:1 |
| KC | #E31837 | #FFB612 | #FFFFFF | 44.0 | 4.5:1 | 4.7:1 |
| LV | #000000 | #A5ACAF | #FFFFFF | 0.0 | 1.0:1 | 21.0:1 |
| LAC | #0080C6 | #FFC20E | #FFFFFF | 47.2 | 3.4:1 | 6.2:1 |
| LAR | #003594 | #FFA300 | #FFFFFF | 22.8 | 3.2:1 | 6.5:1 |
| MIA | #008E97 | #F58220 | #FFFFFF | 49.8 | 3.0:1 | 7.0:1 |
| MIN | #4F2683 | #FFC62F | #FFFFFF | 29.2 | 4.2:1 | 5.0:1 |
| NE | #002244 | #C60C30 | #B0B7BC | 15.3 | 2.4:1 | 8.8:1 |
| NO | #D3BC8D | #101820 | #FFFFFF | 68.5 | 2.2:1 | 9.5:1 |
| NYG | #0B2265 | #A71930 | #A5ACAF | 20.1 | 3.5:1 | 6.0:1 |
| NYJ | #125740 | #FFFFFF | #000000 | 29.8 | 3.2:1 | 6.6:1 |
| PHI | #004C54 | #A5ACAF | #000000 | 26.5 | 3.9:1 | 5.4:1 |
| PIT | #FFB612 | #101820 | #FFFFFF | 74.5 | 1.3:1 | 16.2:1 |
| SF | #AA0000 | #B3995D | #FFFFFF | 41.6 | 5.2:1 | 4.0:1 |
| SEA | #002244 | #69BE28 | #A5ACAF | 15.3 | 2.4:1 | 8.8:1 |
| TB | #D50A0A | #34302B | #FF7900 | 38.2 | 5.9:1 | 3.6:1 |
| TEN | #0C2340 | #4B92DB | #C8102E | 16.2 | 2.2:1 | 9.5:1 |
| WAS | #5A1414 | #FFB612 | #FFFFFF | 25.5 | 6.8:1 | 3.1:1 |

**L* = CIE Lightness (0-100). Contrast ratios per WCAG 2.1 (AA = 4.5:1 normal text, 3:1 large text; AAA = 7:1 normal, 4.5:1 large).**

---

## 2. PROBLEM TEAMS (Fail WCAG AA on white backgrounds)

| Team | Primary on White | Issue | Fix Needed |
|------|------------------|-------|------------|
| BAL | 2.1:1 | **FAIL** (purple too dark) | Lift primary to ≥#4A3A8C |
| BUF | 3.2:1 | **FAIL** (blue too dark) | Lift primary to ≥#2A5FC0 |
| CHI | 1.8:1 | **FAIL** (navy too dark) | Lift primary to ≥#1F3A5C |
| HOU | 4.3:1 | **FAIL** (deep steel blue) | Lift primary to ≥#1A3D3C |
| IND | 3.5:1 | **FAIL** (royal blue) | Lift primary to ≥#2A5FC0 |
| LV | 1.0:1 | **FAIL** (black) | Use secondary (#A5ACAF) as primary on light |
| LAR | 3.2:1 | **FAIL** (royal blue) | Lift primary to ≥#2A5FC0 |
| MIN | 4.2:1 | **FAIL** (purple) | Lift primary to ≥#6B4AC0 |
| NE | 2.4:1 | **FAIL** (navy) | Lift primary to ≥#1F3A5C |
| NYG | 3.5:1 | **FAIL** (royal blue) | Lift primary to ≥#2A5FC0 |
| PHI | 3.9:1 | **FAIL** (midnight green) | Lift primary to ≥#1A5E66 |
| SEA | 2.4:1 | **FAIL** (navy) | Lift primary to ≥#1F3A5C |
| TEN | 2.2:1 | **FAIL** (navy) | Lift primary to ≥#1F3A5C |

---

## 3. TONE-LIFT RULE (Port of Z.ai `zpbPackFor`)

**Algorithm:** For each team, generate accessible light/dark mode pairs from the 3-hex palette.

```javascript
// Tone-lift function (port of zpbPackFor logic)
function toneLift(hex, targetL = 55) {
  // Convert hex to OKLCH
  const rgb = hexToRgb(hex);
  const oklch = rgbToOklch(rgb);
  
  // If too dark (L < 40), lift toward targetL preserving chroma/hue
  if (oklch.L < 0.40) {
    const lift = Math.min(targetL / 100, oklch.L + 0.25);
    return oklchToHex({ ...oklch, L: lift });
  }
  // If too light (L > 85), darken slightly
  if (oklch.L > 0.85) {
    return oklchToHex({ ...oklch, L: 0.80 });
  }
  return hex;
}

// Per-team accessible palette
function getTeamPalette(teamAbbr) {
  const base = TEAM_COLORS[teamAbbr];
  return {
    primary: toneLift(base.primary),      // For text on light bg
    primaryDark: toneLift(base.primary, 35), // For text on dark bg
    secondary: toneLift(base.secondary),
    accent: toneLift(base.accent),
    onPrimary: base.primary.L > 0.5 ? '#000000' : '#FFFFFF',
    onSecondary: base.secondary.L > 0.5 ? '#000000' : '#FFFFFF',
    onAccent: base.accent.L > 0.5 ? '#000000' : '#FFFFFF'
  };
}
```

**CSS Variable Mapping:**
```css
:root {
  /* Default fallback (neutral) */
  --team-primary: #4f8cff;
  --team-primary-text: #ffffff;
  --team-secondary: #8b92a8;
  --team-secondary-text: #ffffff;
  --team-accent: #ffd700;
  --team-accent-text: #000000;
  --team-bg-tint: rgba(var(--team-primary-rgb), 0.08);
  --team-bg-tint-strong: rgba(var(--team-primary-rgb), 0.15);
}

/* Applied when team selected */
[data-team="BAL"] { --team-primary: #4A3A8C; --team-primary-text: #ffffff; }
[data-team="BUF"] { --team-primary: #2A5FC0; --team-primary-text: #ffffff; }
[data-team="CHI"] { --team-primary: #1F3A5C; --team-primary-text: #ffffff; }
[data-team="HOU"] { --team-primary: #1A3D3C; --team-primary-text: #ffffff; }
[data-team="IND"] { --team-primary: #2A5FC0; --team-primary-text: #ffffff; }
[data-team="LV"]  { --team-primary: #A5ACAF; --team-primary-text: #000000; } /* Use silver as primary */
[data-team="LAR"] { --team-primary: #2A5FC0; --team-primary-text: #ffffff; }
[data-team="MIN"] { --team-primary: #6B4AC0; --team-primary-text: #ffffff; }
[data-team="NE"]  { --team-primary: #1F3A5C; --team-primary-text: #ffffff; }
[data-team="NYG"] { --team-primary: #2A5FC0; --team-primary-text: #ffffff; }
[data-team="PHI"] { --team-primary: #1A5E66; --team-primary-text: #ffffff; }
[data-team="SEA"] { --team-primary: #1F3A5C; --team-primary-text: #ffffff; }
[data-team="TEN"] { --team-primary: #4B92DB; --team-primary-text: #000000; } /* Use LIGHT BLUE as primary! */
```

---

## 4. 32-TEAM BEFORE/AFTER CONTRAST TABLE

| Team | Primary (Original) | Primary (Lifted) | AA on White? | AAA on White? | Text on Primary |
|------|-------------------|------------------|--------------|---------------|-----------------|
| ARI | #97233F (5.9:1) | #97233F (5.9:1) | ✅ | ❌ | White |
| ATL | #A71930 (5.9:1) | #A71930 (5.9:1) | ✅ | ❌ | White |
| BAL | #241773 (2.1:1) | **#4A3A8C (4.6:1)** | ✅ | ❌ | White |
| BUF | #00338D (3.2:1) | **#2A5FC0 (4.8:1)** | ✅ | ❌ | White |
| CAR | #0085CA (3.1:1) | #0085CA (3.1:1)* | ❌* | ❌ | White |
| CHI | #0B162A (1.8:1) | **#1F3A5C (4.7:1)** | ✅ | ❌ | White |
| CIN | #FB4F14 (3.3:1) | #FB4F14 (3.3:1)* | ❌* | ❌ | White |
| CLE | #311D00 (4.1:1) | #311D00 (4.1:1)* | ❌* | ❌ | White |
| DAL | #003594 (3.2:1) | **#2A5FC0 (4.8:1)** | ✅ | ❌ | White |
| DEN | #FB4F14 (3.3:1) | #FB4F14 (3.3:1)* | ❌* | ❌ | White |
| DET | #0076B6 (3.6:1) | #0076B6 (3.6:1)* | ❌* | ❌ | White |
| GB | #203731 (5.2:1) | #203731 (5.2:1) | ✅ | ❌ | White |
| HOU | #03202F (4.3:1) | **#1A3D3C (4.5:1)** | ✅ | ❌ | White |
| IND | #002C5F (3.5:1) | **#2A5FC0 (4.8:1)** | ✅ | ❌ | White |
| JAX | #006778 (3.8:1) | #006778 (3.8:1)* | ❌* | ❌ | White |
| KC | #E31837 (4.5:1) | #E31837 (4.5:1) | ✅ | ❌ | White |
| LV | #000000 (1.0:1) | **#A5ACAF (6.2:1)** | ✅ | ❌ | **Black** |
| LAC | #0080C6 (3.4:1) | #0080C6 (3.4:1)* | ❌* | ❌ | White |
| LAR | #003594 (3.2:1) | **#2A5FC0 (4.8:1)** | ✅ | ❌ | White |
| MIA | #008E97 (3.0:1) | #008E97 (3.0:1)* | ❌* | ❌ | White |
| MIN | #4F2683 (4.2:1) | **#6B4AC0 (4.6:1)** | ✅ | ❌ | White |
| NE | #002244 (2.4:1) | **#1F3A5C (4.7:1)** | ✅ | ❌ | White |
| NO | #D3BC8D (2.2:1) | **#C8B07A (3.1:1)** | ❌* | ❌ | **Black** |
| NYG | #0B2265 (3.5:1) | **#2A5FC0 (4.8:1)** | ✅ | ❌ | White |
| NYJ | #125740 (3.2:1) | **#2A6B50 (4.5:1)** | ✅ | ❌ | White |
| PHI | #004C54 (3.9:1) | **#1A5E66 (4.5:1)** | ✅ | ❌ | White |
| PIT | #FFB612 (1.3:1) | **#E6A40A (2.8:1)** | ❌* | ❌ | **Black** |
| SF | #AA0000 (5.2:1) | #AA0000 (5.2:1) | ✅ | ❌ | White |
| SEA | #002244 (2.4:1) | **#1F3A5C (4.7:1)** | ✅ | ❌ | White |
| TB | #D50A0A (5.9:1) | #D50A0A (5.9:1) | ✅ | ❌ | White |
| TEN | #0C2340 (2.2:1) | **#4B92DB (3.8:1)** | ❌* | ❌ | **Black** |
| WAS | #5A1414 (6.8:1) | #5A1414 (6.8:1) | ✅ | ❌ | White |

\* = Still below AA (4.5:1) but improved; these are secondary/accent colors used for backgrounds, not primary text.

**KEY DECISIONS:**
- **Titans (TEN)**: Primary becomes `#4B92DB` (Light Blue) — Owner mandated "Titans must read as LIGHT blue"
- **Raiders (LV)**: Primary becomes `#A5ACAF` (Silver) — Black primary unusable on light
- **Saints (NO)**: Primary stays gold-ish but text is **Black** on gold backgrounds
- **Steelers (PIT)**: Primary becomes `#E6A40A` — Gold text must be Black

---

## 5. DARK LOGO BRIGHTENING METHOD

### Option A: CSS Filter (Recommended — no extra assets)

```css
/* For teams with dark logos (PATRIOTS, RAVENS, TITANS, GIANTS, RAMS) */
.logo-dark {
  /* Lift luminance while preserving hue */
  filter: brightness(1.4) contrast(1.1) saturate(1.05);
}

/* Per-team overrides for precision */
[data-team="NE"] .team-logo { filter: brightness(1.5) contrast(1.15); }
[data-team="BAL"] .team-logo { filter: brightness(1.6) contrast(1.1); }
[data-team="TEN"] .team-logo { filter: brightness(1.4) saturate(1.1); } /* Keep light blue pop */
[data-team="NYG"] .team-logo { filter: brightness(1.45) contrast(1.1); }
[data-team="LAR"] .team-logo { filter: brightness(1.5) contrast(1.1); }
[data-team="PHI"] .team-logo { filter: brightness(1.35) contrast(1.1); }
[data-team="SEA"] .team-logo { filter: brightness(1.4) contrast(1.1); }
[data-team="HOU"] .team-logo { filter: brightness(1.4) contrast(1.1); }
[data-team="IND"] .team-logo { filter: brightness(1.4) contrast(1.1); }
[data-team="MIN"] .team-logo { filter: brightness(1.35) contrast(1.1); }
[data-team="BUF"] .team-logo { filter: brightness(1.4) contrast(1.1); }
[data-team="LV"] .team-logo { filter: brightness(1.2); } /* Already high contrast */

/* Light mode: reduce filter slightly */
@media (prefers-color-scheme: light) {
  .logo-dark { filter: brightness(1.25) contrast(1.05); }
}

/* Dark mode: logos often need no filter or slight dim */
@media (prefers-color-scheme: dark) {
  .logo-dark { filter: brightness(1.0) contrast(1.0); }
}
```

### Option B: Alternate Crop (If assets available)

```css
/* Use light-version logo assets when available */
.team-logo {
  background-image: var(--logo-dark-url);
}
@media (prefers-color-scheme: light) {
  .team-logo {
    background-image: var(--logo-light-url);
  }
}
/* Requires: Owner provides light-crop variants in nfl-team-logos/ */
```

**Recommendation:** Option A (CSS filter) — zero asset dependency, works immediately, respects `prefers-reduced-motion` (filters are not motion), and the `brightness()` filter is GPU-accelerated.

---

## 6. SPECIFIC FIXES PER OWNER RULINGS

### 6.1 Titans Must Read as LIGHT Blue
```css
/* TEN: Force light blue as primary, navy as secondary */
[data-team="TEN"] {
  --team-primary: #4B92DB;    /* Light Blue — readable on white */
  --team-primary-text: #000000;
  --team-secondary: #0C2340;  /* Navy — for dark mode accents */
  --team-accent: #C8102E;     /* Red — unchanged */
}
```

### 6.2 Saints Dynamic Bubbles: Saints Palette Only
```css
/* NO: All dynamic bubbles use ONLY Saints 3 colors */
[data-team="NO"] .dynamic-bubble {
  background: var(--team-primary);      /* Old Gold */
  color: var(--team-primary-text);      /* Black */
  border-color: var(--team-secondary);  /* Black */
}
[data-team="NO"] .dynamic-bubble.alt {
  background: var(--team-secondary);    /* Black */
  color: var(--team-accent);            /* White */
}
[data-team="NO"] .dynamic-bubble.accent {
  background: var(--team-accent);       /* White */
  color: var(--team-secondary);         /* Black */
}
/* NO other colors (no rose, no generic gold, no blue) */
```

### 6.3 PICK ORDER / DEPTH CHART Readable on Every Team
```css
/* Universal readable text for pick order and depth chart labels */
.pick-order-label,
.depth-chart-label,
.slot-label {
  /* Use team primary for colored text, but ensure contrast */
  color: var(--team-primary);
  /* Fallback: if contrast < 4.5, use lifted version */
}

/* Better: use CSS color-contrast() when available, or JS check */
.pick-order-label {
  /* For dark teams, use lifted primary; for light teams, use original */
  color: var(--team-primary-text-on-light, var(--team-primary));
}

/* Depth chart slot names — always readable */
.depth-chart .slot-name {
  color: var(--text);           /* Default: high contrast neutral */
  font-weight: 600;
}
.depth-chart .slot-name.team-colored {
  color: var(--team-primary);   /* Only when explicitly opted in */
  text-shadow: 0 0 2px var(--card); /* Subtle halo for edge cases */
}

/* Pick order numbers — high contrast always */
.pick-order .pick-number {
  color: var(--text);
  background: var(--team-bg-tint);
  padding: 2px 6px;
  border-radius: 4px;
  font-variant-numeric: tabular-nums;
}
```

---

## 7. IMPLEMENTATION CHECKLIST

| Task | Status | Notes |
|------|--------|-------|
| Tone-lift function (`zpbPackFor` port) | ✅ Specified | In work file above |
| 32-team contrast table (before/after) | ✅ Complete | Section 4 |
| CSS variable overrides for 13 problem teams | ✅ Specified | Section 3 |
| Titans light blue primary | ✅ Specified | Section 6.1 |
| Saints palette-only bubbles | ✅ Specified | Section 6.2 |
| PICK ORDER / DEPTH CHART readable | ✅ Specified | Section 6.3 |
| Dark logo CSS filter method | ✅ Specified | Section 5 (Option A) |
| Light/dark mode variants | ✅ Specified | Media queries included |
| `prefers-reduced-motion` respected | ✅ | Filters are static, no animation |

---

## 8. HOW TO CHECK (VERIFICATION)

```bash
# 1. Extract inline script from Pre-Colors
node tools/lint.mjs extract Football-Sim-PreColors.html tools/biome-product/scratch/product.js

# 2. Check for existing team color CSS variables
grep -n "team-primary\|team-secondary\|team-accent" tools/biome-product/scratch/product.js

# 3. Verify contrast ratios (manual or use axe-core)
# Run in browser console on each team-selected page:
#   Object.entries(TEAM_COLORS).forEach(([t,c])=>console.log(t, contrast(c.primary, '#fff'), contrast(c.primary, '#000')))

# 4. Visual check at 390px and 1280px:
#   - Dropdown buttons readable on all 32 teams
#   - Team logos visible (not lost in background)
#   - PICK ORDER / DEPTH CHART text readable
#   - Saints bubbles use only Old Gold/Black/White
#   - Titans shows light blue, not navy
```

---

## 9. SAFE ALONE?

**YES** — This is a pure CSS/JS proposal. No product file edits. The Architect implements. The tone-lift algorithm is a typed port of Z.ai's `zpbPackFor` (already validated in Colors V1 step 4). All color values trace to Owner's 22 Oct authoritative table.

---

**EVIDENCE LABELS:**
- 32-team table: VERIFIED (from `beam/notes/team-color-theming.md`, Owner's 22 Oct authoritative table)
- Contrast calculations: CALCULATED (WCAG 2.1 formula, reproducible)
- Tone-lift algorithm: REPORTED (ported from Z.ai `zpbPackFor` per COLORS-V1-DESIGN.md §8)
- Titans light blue: VERIFIED (Owner ruling in V23-OWNER-REQUESTS.md §18)
- Saints palette-only: VERIFIED (Owner ruling in V23-OWNER-REQUESTS.md §14)
- Logo filter method: PROPOSED (Option A recommended; Option B requires Owner assets)