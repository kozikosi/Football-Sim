# UPDATE-README — wave 49 (the Owner's round-49: the expansion)

Delivered 2026-11-01 · the product: `Football-Sim-Z-post-blue-w49.html` ·
md5 `6bf627b017c1e26281e2bb4fa70d4a60` · 1,548,598 chars · base: the w48 bytes (md5 `d8b64fd7…`).

## The shimmering gold now reaches every 90+ player he named

**The Raiders on the team comparison page.** The diagnosis was new and pixel-deep: the
lineup sweep's gradient strip BEGAN at the deep gold, and the two sides of the matchup hug
the center column from opposite edges — the left team's glyphs rest on the strip's pale band,
the right team's on the deep-gold head, which painted as flat dark ink. Swapping the two
dropdowns flips the paint with the SIDE, not the team — his "Raiders don't shimmer" was the
far side of the matchup all along, in every build back to w45. Fixed at the strip: the
comparison sweep now breathes pale gold (`--gold2`) to a NEW mid gold (`--goldm`), so every
phase, both alignments, both themes reads unmistakable gold. Crosby 97, Bowers 93 and Miller
91 glow exactly like Mahomes and Kelce now — measured on the pixels, not just the computed
style (Crosby's glyphs went from flat `#9a6b1f` to living gold `#cda65a`).

**The players on the Madden Rankings page.** The rows carry one player name each — the
ANCHOR chip's — and w48 had deliberately left it plain. The anchor name wears the tier law
again: 90+ sweep inside the chip (30 of 32 anchors; the two 85–89 anchors read bold), on a
deep-gold-to-mid-gold sweep tuned so the small name stays readable at every phase. The team
detail's "led by …" names joined the tier law too — they had carried NO tier class, and no
audit had ever seen them (no trailing number for the text-walker). The Player Browser and
Position Rankings got a new DOM-level check that reads name and OVR even when they live in
separate elements: 188 browser rows and 88 rankings players, every 90+ sweeping, both themes.

## The frame is a delicate rose gold, barely not white

The yellow gold-family chip (#cfa96b / #f4e6c3 / #4a3410) is retired. The ANCHOR chip now
frames in border `#e2bfae` · fill `#f9ece4` · ink `#6b4634` (7.4:1 on the fill) — a delicate
rose gold, just barely not white, exactly as he asked. The dark chip keeps his plum family
untouched (the yellow he flagged was the light-mode one). The rose fill is also what makes
the gold name inside the chip readable — the w48 veto called exactly this shot.

## Nothing else moved

The w45/46 cascade stands everywhere else: the generic sweep (deep gold breathing to gold2
under `fxshine`), the draft board, the season surfaces, the champion exceptions, the glow
stays dead (zero `zpbshimglow`), the theme default, the DIME stack, the halfway inks, the
editor, the cinematics — spot-held by the post-checks and the regression battery.

## Verify

- `w49_live.js` **20/20** — both sides of the comparison sweep on the new strip (deep head
  GONE from the gradient), Crosby by name; the chips sweep 30/32 with the rose frame and
  deep→mid gold, dark plum untouched; "led by" tiered; zero console errors. Screenshots:
  `w49-cmp-light/dark.png`, `w49-madden-light/dark.png`.
- `w49_audit_shimmer.js` **34/34** — the long audit, chips NO LONGER skipped: every 90+ name
  on every listing surface (rankings, team detail, browser, position rankings, comparison,
  draft review, comparison review, preseason, week-1, season review, awards, Super Bowl
  recap) sweeps, every 85+ reads bold, both themes; the rose frame asserted per theme.
- `w49_domcheck.js` **10/10** — the new separate-element surfaces: player browser (188
  tiered rows) and position rankings incl. The Series (88 players), both themes.
- `w49_nodecheck.js` **11/11** · `w49_mobile.js` 390px clean (no overflow, the chips still
  sweep) · dash law: 361 occurrences examined, 0 visible in literals.
- Pixel proof (`w49_pixel_shots.js` + sampling): comparison glyphs both themes both sides in
  gold; chip glyphs deep gold on the rose fill.
- Regressions: `w46_live` on w49 **27/29** (the 2 fails are the w46-era pink-chip asserts,
  superseded by w47's gold and now w49's rose — same 2 as on w48) · `w47_live` on w49
  **45/52** (5 supersedes: the glow law and the chip-gold asserts the w48/w49 rulings retire;
  2 known environment flakes, both proven green by `w47_map_check` on the same bytes) ·
  `w47_map_check` **4/4** · `w48_live` on w49 **15/20** (the 5 fails are exactly the w48
  chip-exception asserts his round-49 retires) · `w48_audit_shimmer` on w49 **29/34** (the 5
  chip asserts likewise) · `w48_map_check` **4/4** · `w48_nodecheck` **11/11** ·
  `w48_mobile` green.

Screenshots in `_agents/zai/notes/evidence/` · the chain and suites in `_agents/zai/tools/`.
§veto candidates live in `notes/W49-INTAKE-LEDGER.md`.
