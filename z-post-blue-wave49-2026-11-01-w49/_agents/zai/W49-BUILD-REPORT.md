# W49 BUILD REPORT — the expansion: every 90+ name in the shimmering gold

Product: `Football-Sim-Z-post-blue-w49.html` · md5 `6bf627b017c1e26281e2bb4fa70d4a60` ·
1,548,598 chars · base: the w48 bytes (md5 `d8b64fd7958324ca98a64d0fb6e08a9f`) ·
chain: `tools/zpb_v49.py` (10 asserted replacements, 28 post-checks, all green).

## O1 · the directive

The Owner: the w48 restore is accepted; now EXPAND it — check every page for a 90+ player
not written in the shimmering gold; the Raiders still lack it on the team comparison page and
so do the players on the Madden Rankings page; the yellow frame around the anchor players
becomes a delicate rose gold, barely not white; the result is named w49.

### The diagnosis that made the fix (new this wave)

The comparison page's shimmer was never team-broken — it was SIDE-broken. The lu-cell sweep's
gradient strip opened at the deep gold (`--gold3` #9a6b1f light / #8a5f18 dark), and the
lineup rows hug the center column from opposite edges (`.zpb-lu-l` right-aligns, `.zpb-lu-r`
left-aligns). The left team's glyphs therefore rest on the strip's pale band while the right
team's rest on the deep-gold head — which paints as flat dark ink. Proof: swapping the two
dropdowns flips the paint with the side, not the team (Raiders-left shimmered, Chiefs-right
went dark). The headless paint freezes at background-position 0%, but the asymmetry is
structural: any environment that doesn't animate the strip shows one side gold and one side
dark — exactly his report, against every build back to w45.

### What w49 did (10 replacements, nothing else)

1. **`--goldm` — the new mid-gold token** on all four `:root` theme blocks
   (light `#ad7f2e` · dark `#c39a4a`).
2. **The lu-cell/pcard sweep re-toned**: `linear-gradient(100deg, var(--gold2) 10%,
   var(--goldm) 22%, var(--gold2) 34%, var(--goldm) 52%, var(--gold2) 70%, var(--goldm)
   88%)` — the deep head is GONE from the surface; every phase, both alignments, both themes
   reads gold. Keyframes, timing (`zpbshmsweep 3.4s`) and the gold family unchanged; the
   cream bands stay retired (his w46 O4 ruling).
3. **The ANCHOR name wears the tier law again** in both `narr` template branches
   (`best.ovr>=90 ? 'zpb-shm' : (best.ovr>=85 ? 'zpb-vib' : '')`) — the w48 exception
   retires, exactly as his round-49 words demand.
4. **The chip frame goes rose gold**: border `#e2bfae` · fill `#f9ece4` · ink `#6b4634`
   (contrast 7.4:1). The dark chip keeps the plum family.
5. **The chip's own sweep** (new rules after the dark chip override): deep gold
   (`--gold3`) breathing to the mid gold — never the pale cream bands — so the 0.78rem bold
   name reads at every phase on the pale rose fill; dark reads the lighter pair
   (`--gold2d`↔`--goldmd`) on the plum. Fallback + `@supports` in the house pattern.
6. **The team detail's "led by" names join the tier law** (`m.top[0][3]>=90 → zpb-shm`,
   `>=85 → zpb-vib`) — they had carried no tier class at all.
7. **The w49 ruling paragraph** appended to the w47-css block's comment; the wave is named.

Token accounting (base → product): `--goldm` 0 → 6, `zpbshmsweep 3.4s linear infinite`
3 → 4 (the chip rule), `#cfa96b/#f4e6c3/#4a3410` 1 each → 0, `zpb-shm` +4, `zpb-vib` +0 net,
`zpbshimglow` stays 0. The root `--zshim` law, the champion exceptions and the generic
w45 sweep (cream bands included) are untouched — post-check pinned.

## Verify (all on the w49 bytes)

- `tools/w49_nodecheck.js` **11/11** script blocks clean.
- `tools/w49_live.js` **20/20** — both comparison sides compute the new strip
  (`rgb(230,198,125)`+`rgb(173,127,46)` light / `rgb(232,200,126)`+`rgb(195,154,74)` dark),
  the deep head absent, Crosby 97 sweeping by name; 32 chips, 30 sweeping anchors, the rose
  frame and deep→mid gold asserted both themes, dark plum untouched; "led by" tiered;
  zero console errors.
- `tools/w49_audit_shimmer.js` **34/34** — the long audit with the chips INCLUDED: every 90+
  name on every listing surface sweeps (zpbshmsweep or the generic fxshine), every 85+ reads
  bold, both themes, zero page errors.
- `tools/w49_domcheck.js` **10/10** — the NEW separate-element check: player browser 188
  tiered rows, position rankings 88 players + The Series — every 90+ sweeps, both themes.
- `tools/w49_mobile.js` — 390px rankings: no horizontal overflow, the chips still sweep.
- `tools/w49_pixel_shots.js` + PIL sampling — the pixel proof: Crosby `#cda65a` (was flat
  `#9a6b1f`), Bowers `#c49c4f`, Mahomes `#b8863b` in light; both sides `#e6c67x`–`#e8c87e`
  in dark; chips `#9a6b1f` on the rose fill (light) / `#e8c87e` on plum (dark).
- Dash law: `w46_verifydashes` on w49 — 361 occurrences examined, 0 visible in literals.
- Regressions: `w46_live` **27/29** (the 2 w46-pink-chip asserts, superseded w47→w49, same 2
  as on w48) · `w47_live` **45/52** (5 supersedes: the w47 glow/fill/chip-gold asserts the
  w48+w49 rulings retire; 2 documented environment flakes, both green on `w47_map_check`) ·
  `w47_map_check` **4/4** · `w48_live` **15/20** (the 5 chip-exception asserts his round-49
  retires) · `w48_audit_shimmer` **29/34** (the 5 chip asserts likewise) · `w48_map_check`
  **4/4** · `w48_nodecheck` **11/11** · `w48_mobile` green.

Evidence in `notes/evidence/` · the chain and suites in `tools/`.
