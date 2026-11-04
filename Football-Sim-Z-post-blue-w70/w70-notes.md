# w70 — wave notes (Z-post-blue)

**Base:** w69 (gh-pages `17da6b359f297da9`, 1,803,514 B) · **Shipped:** `Football-Sim-Z-post-blue-w70.html`
**Pins:** 1,806,245 B (+2,731) · sha256 `f031dfd39d64d71d…` · md5 `79c4a934969d04e17f357e26ec6740e2`

## The finding first

w69's ledger claimed all six of the Owner's UI items. The artifact contained **two**: UI 3 (tier-law
classes on the review cards) and UI 6 (crests on All-Playoff chips). The other four were **claimed
but absent** — `--tOn` had zero code hits, the map bubbles still read `var(--text,#53382b)`, no
padding rule existed for the real trio ids, and no option element carried any Cinzel/ink/hover rule.
w70 implements the missing four, hardens UI 3, and finishes UI 6. The w70 header block documents the
audit so the ledger and the artifact agree from now on.

## What shipped (Owner UI 1–6)

| # | Item | w70 change | Verified |
|---|---|---|---|
| 1 | 20-0 pill | light: deep-coffee ink `#4a2b0d` on the panel (10.4:1); dark: cream-gold `var(--g5)` (14.4:1); gold ramp retired inside the box only | battery + scoping grep |
| 2 | Line-up map ink | bubbles solve per theme: `#4a2b0d` light / `#f6e8c9` dark against the tinted effective paint | 32 teams × 2 modes: worst **6.86:1** |
| 3 | Tier law floor | `.zpb-vib` now bold in CSS; rest = team neutral @0.50 riding `--tn`/`--tnd` (theme-aware — no more dark-neutral-on-dark) | muted tier 2.1/3.1 (Owner-spec 0.50, by design) |
| 4 | Preseason trio | `#scriptOff,#scriptDef,#aggrSel` → `padding:8px 26px 8px 12px` | rule asserted in build |
| 5 | Player dropdowns | Cinzel + muted ink on options; 90+ gold / 85+ bold riding the rows; team-ringed hover + gold wash | ink 5.6/8.3; gold 3.8/3.0 |
| 6 | Crests lead | honor lines now crest-then-name (chips were already correct in w69) | asserted in build |

## Verification

- **Contrast battery** (`scripts/w70_battery.py`): 15/15 PASS — real `:root` surface values per theme,
  white/black tint bounds + all 32 team primaries composited at 18% over panel-over-page.
- **Headless smoke** (Playwright chromium): boots with **0 console errors, 0 page errors** in both
  themes; `w70css` rules live. Not driven: deep screens (draft review, map, preseason) are
  flow-gated — Owner's playthrough remains the visual gate, as every wave.

## Carry-over ledger (for the Colors rebuild)

All six w70 items are token-shaped fixes (scoped ink pairs + theme-aware neutrals) — they port
directly into the rebuild's token contract; the contrast battery script is the seed of the CI
contrast gate proposed in the rebuild plan.
