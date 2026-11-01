# W48 BUILD REPORT — the w45 shimmer restored, the glow retired

Product: `Football-Sim-Z-post-blue-w48.html` · md5 `d8b64fd7958324ca98a64d0fb6e08a9f` ·
1,546,441 chars · base: the w47 bytes (md5 `eef6b93849b3df5d49b3f262185f678b`) ·
chain: `tools/zpb_v48.py` (3 asserted replacements, 22 post-checks, all green).

## O1 · the one directive

The Owner: the new shimmer effect is gone; the shimmer is the one the Kansas City Chiefs' 90+
players wear on the team comparison page in w45/w46, everywhere possible; the Madden rankings
page must be readable again; the result is named w48.

### What the w47 shimmer actually was (the diagnosis)

Three rules + a keyframe appended at the end of the `<style id="zpb-w47-css">` block:

- `@supports … .zpb-shm,.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm{background:none !important;…}`
  — killed the gradient sweep on EVERY shimmering name and left a static gold fill;
- `…{animation:zpbshimglow 3.4s ease-in-out infinite}` +
  `@keyframes zpbshimglow{…50%{text-shadow:0 0 16px currentColor;}}` — a pulsing 16px halo
  around every 90+ name at once; on the Madden rankings' ANCHOR chips (w47 had also put the
  tier law INSIDE the chip) a gold-swept name sat on the chip's gold fill with a brown halo —
  the page he could not read.

### What w48 did (3 replacements, nothing else)

1. **The whole w47 shimmer block → one w48 ruling comment.** The w45/46 cascade beneath rules
   again untouched: `.zpb-shm` = `linear-gradient(100deg,var(--zshim,…gold3),var(--gold2) 40%,…)`
   under `zpbshmsweep 3.4s`; `.zpb-lu-cell.zpb-shm,.zpb-pcard b.zpb-shm` = the 18/38/55/72/88%
   gold3↔gold2 sweep; the solid-color fallbacks for no-`background-clip` browsers intact.
   PROOF: `tools/w48_css_parity.py` — the shimmer-relevant CSS of w48 vs w46 is byte-identical
   (21 rule lines, zero differences).
2. **The ANCHOR chip name loses the tier classes** in both `narr` template branches (the w48
   exception): `<span class="zpb-anchname">` plain again, exactly as w45/w46 rendered it; the
   comment says so. The chip keeps his w47 "more golden" light fill (`#cfa96b/#f4e6c3/#4a3410`)
   and the dark chip (`#8a5f78/#4d2f3f/#f2d7e4`) — those were separate rulings and stand.
3. **The wave is named w48** (the file; the in-code ruling comment carries the name too).

Token accounting (base → product): `zpb-shm` 85 → 74 (the 11 w47 additions: 9 CSS + 2 JS),
`zpb-vib` 54 → 52, `zpbshimglow` 2 → 0, `zpbshmsweep` unchanged at 6, `--zshim` root law and
the champion exceptions untouched. Everything else w47 shipped stands (spot-held in the post-
checks: the DIME stack, the theme default, the topbar removal, txMd, the golden chip).

## Verify (all on the w48 bytes)

- `tools/w48_nodecheck.js` **11/11** script blocks clean.
- `tools/w48_live.js` **20/20** — no `zpbshimglow` anywhere; the comparison's 90+ cells compute
  `animationName: zpbshmsweep` + `linear-gradient(100deg, …)` clipped to the text, Chiefs and
  Raiders on the SAME gradient string at the same instant, both themes; the chip name reads the
  chip ink in both themes (`rgb(74,52,16)` light / `rgb(242,215,228)` dark, `animation: none`,
  `background-image: none`); the review board's 9 visible shimmers all sweep; zero console
  errors through the drive. Screenshots: `w48-madden-light/dark.png`, `w48-cmp-dark/light.png`,
  `w48-board-dark.png`.
- `tools/w48_audit_shimmer.js` **34/34** — the long audit across Madden rankings (both themes),
  Madden team detail, player browser, team comparison (both themes), draft review, review
  comparison, preseason, week-1 plan, regular season review, season review + awards, Super Bowl
  recap: every 90+ name wears `.zpb-shm` AND computes the real sweep (gradient + text clip);
  every 85+ name reads bold; the chip names are the declared exception and are checked
  separately; zero page errors.
- `tools/w48_map_check.js` **4/4** (run twice) — the DIME stack (479/507 under 479/556) and the
  per-team dark halfway ink on the live play lines (LAC `#80c8ee`, KC `#ef858f`).
- `tools/w48_mobile.js` — 390px rankings: no horizontal overflow, zero page errors.
- Regressions: `w46_live.js` on w48 **27/29** (the 2 fails are the pink-anchor asserts his w47
  "more golden" supersedes — the gold chip stands); `w47_live.js` on w48 **47/53** (4 fails are
  the w47 shimmer-law asserts the w48 ruling supersedes; 2 are the documented environment
  flakes — the review-map layout quirk and the replay capture timing — both proven green by the
  dedicated map check on the same bytes).
- `tools/w48_css_parity.py` — **w48 ≡ w46 shimmer CSS, byte-for-byte**.
- Dash law: the w46_live dash section ran on w48 — no em/en/standalone hyphen dashes in rendered
  text on any checked view.

Evidence in `notes/evidence/` · the chain and suites in `tools/`.
