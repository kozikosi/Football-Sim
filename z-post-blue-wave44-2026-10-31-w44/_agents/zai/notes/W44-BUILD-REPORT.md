# W44 BUILD REPORT — the Owner's round-44 directives

Delivered 2026-10-31 · product `Football-Sim-Z-post-blue-w44.html` ·
md5 `da3fc202237d7dddba37a7429ea6266d` · 1,514,199 B · base: the w43 bytes (md5 `53ce9def…`).

## The chain
`zpb_v44.py` (15 asserted replacements) + `zpb_v44b.py` (6 asserted replacements on the
stage-1 output — the ACTIVE card-based awards renderers live further down the file than the
w33-era table renderers they override) — 21 exact-match replacements on the w43 bytes, zero
hand edits. Every script block passes `node --check`.

## What shipped (his round)
- **O1 — the halfway ink.** `txM` rebuilt: a 50/50 mix of the page's warm ink (`#53382b`) and
  each team's crayola anchor, clamped (chroma ≥0.22, L 0.30–0.52). Light mode everywhere the
  tokens reach; dark keeps `txd`. A tone study across all 32 franchises (chroma vs the
  geometric mean of the dark tint and the crayola; ratios 0.42/0.50/0.58; screenshots at each)
  fixed the ratio at 0.50 — his literal halfway. The crayola sat retires; nothing is gray.
- **O2 — the Pro Bowl / All-Pro placements** inherit O1 through the same row tokens; asserted
  per-row in the live suite (NE `#4c5e78`, PHI `#4c7878`…).
- **O3 — the first-team gold register.** AP1 names are gold on the awards page (award cards,
  statistical champions, All-Pro chips, PRO BOWL placements), the playoff awards cards, the
  All-Playoff chips, the season story honor cards and the rest-day HONORS EARNED overlay —
  the constant gold, his exact gold, kept everywhere else untouched.
- **O4 — the wildcard pregame 36s → 22s.** Star pairs ≈5.1s apart, plays start ≈23.5s.
- **O5 — no result reveal mid-intro.** The FX safety timer re-arms while a cinematic is up
  (was: a blind 15s drain — the "second key player" confetti); the whistle and Continue still
  drain the queue.
- **O6 — the leaked review text removed** (a w43 note printed from inside a template literal).
- **O7 — "Rush / Pass"** on the Team Stats row.
- **O8 — the SB champions cinematic untouched** (guard checks green: opaque at mount, the
  champion's `--zshim`).
- **O9 — "WHERE YOUR PLAYERS LINE UP?" breathes at 0.5s per player** (the 0.15s sprint
  retires; the draft-board cadence is not his item and stays).
- **O10 — the during-game header scores wear their teams in LIGHT too.** The replay's
  `color:inherit` law (0,1,1) had out-ranked the w43 single-class rules (0,1,0) — dark only
  won on the `:root[data-theme]` lift. The w44 style block's two-class rules (0,2,1) beat it
  in both themes; live-verified (LV gold vs KC red, both themes).

## The proof
- `w44_live.js` — **32/32**: the halfway ink per-row (both themes, dark pinned to `txd`),
  the during-game scores per-team (both themes), the review HTML clean + `Rush / Pass`, the
  wildcard intro < 26s, the FX queue surviving 16.5s under a cinematic + whistle drain, the
  belong map at 0.5s/beat, the SB cinematic unchanged, the gold register (24 names, 58/58
  listed AP1 spans shimmering), the season drive clean with zero page errors.
- `w43_regress_stress.js` — **43/43** (the full w43 functional sweep on the w44 bytes).
- `w42regress_stress.js` — **48/50** on w44; the same 2 fail on the w43 baseline — the
  superseded w42 one-ink audits, retired by the Owner's own round-43 review.
- Evidence: `notes/evidence/browser-light-w44.png`, `browser-dark-w44.png`,
  `duringgame-light-w44.png`, `duringgame-dark-w44.png`, `awards-light-w44.png`,
  `awards-dark-w44.png`, `sb-cinematic-w44.png`, plus the tone strips
  (`tone-dark/r42/r50/r58/crayola.png`).

## Held interpretations (§veto of the intake ledger)
1. The halfway mix = 0.50 with L kept ≤0.52 (readable) and a 0.22 chroma floor (never gray);
   one constant moves the whole site on his word.
2. "Gold everywhere their name is listed" = the honors surfaces; per-play surfaces keep the
   team-ink law.
3. "A little too slow" = 22s; the Super Bowl keeps its 60s.
