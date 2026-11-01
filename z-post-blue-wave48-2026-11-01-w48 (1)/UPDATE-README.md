# UPDATE-README — wave 48 (the Owner's round-48: one task)

Delivered 2026-11-01 · the product: `Football-Sim-Z-post-blue-w48.html` ·
md5 `d8b64fd7958324ca98a64d0fb6e08a9f` · 1,546,441 chars · base: the w47 bytes (md5 `eef6b938…`).

## The w45 shimmer is everywhere; the new effect is gone

The w47 effect — the static gold fill with the synchronized 16px glow pulse — is retired whole:
the keyframe, the three override rules, all of it. The shimmer is again exactly the one the
Kansas City Chiefs' 90+ players wear on the team comparison page in w45/w46: the deep-gold
gradient sweep (`--zshim` = the constant `--gold3` breathing to `--gold2`, `zpbshmsweep 3.4s`),
on every surface and every team, both themes. Proof, not promise: the shimmer CSS of w48 is
byte-identical to w46 (21 rule lines, zero differences), and the live audit watches every 90+
name on every listing surface compute the real sweep in both themes.

## The Madden rankings page reads again

The unreadable names were the ANCHOR chip's: w47 had put the tier law inside the chip, so a
gold-sweeping name sat on the chip's own gold fill with a brown halo around it. The tier
classes leave the chip name — it reads the chip's ink again (dark brown on gold in light, soft
pink on plum in dark), exactly as it rendered in w45/w46. The chip keeps the light-mode gold
family from his "more golden" ruling — that stands.

## Nothing else moved

One task means one task: the dropdown last names, the theme default, the DIME stack, the toggle
contrast, the button order, the staged formation, UNDO / RETURN TO MODEL LINEUP, the dark
halfway ink, the review badges and crests, the SIM PLAYOFFS cinematics and the box-score tone
all stand exactly as w47 shipped them — spot-held by the build's post-checks and the
regression suites.

## Verify

- `w48_live.js` **20/20** · `w48_audit_shimmer.js` **34/34** (every 90+ sweeps, every 85+ bold,
  both themes, all surfaces; the chip exception checked separately) · `w48_map_check.js` **4/4**
  · `w48_nodecheck.js` **11/11** · 390px clean · zero console errors.
- Byte proof: `w48_css_parity.py` — w48 ≡ w46 shimmer CSS.
- Regressions: `w46_live.js` on w48 **27/29** (the 2 fails are the pink asserts his w47 "more
  golden" supersedes) · `w47_live.js` on w48 **47/53** (4 shimmer-law asserts the w48 ruling
  supersedes + the 2 known environment flakes, both green on the dedicated check).

Screenshots in `_agents/zai/notes/evidence/` · the suites in `_agents/zai/tools/`.
§veto candidates live in `notes/W48-INTAKE-LEDGER.md`.
