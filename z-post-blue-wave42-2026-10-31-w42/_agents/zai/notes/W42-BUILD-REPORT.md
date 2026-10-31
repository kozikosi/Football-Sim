# W42 BUILD REPORT — the proof

Base: `Football-Sim-Z-post-blue-w41.html` · md5 `5c87f60340f6dff622fbbc46221cd4d5` · 1,494,337 B
Product: `Football-Sim-Z-post-blue-w42.html` · md5 `94474a4d636cdd0a209824f661e876f6` · 1,500,122 B
Builder: `scripts/zpb_v42.py` (the zpb chain: 12 asserted exact replacements + two appended blocks)

## The patch ledger

| # | What | Where it lands |
|---|---|---|
| P1 | The vivid rows' text inks collapse to `txd`, both themes | `zpbRowVars` |
| P2 | The neutral rows' light inks join the dark ink | `zpbNeutralRowVars` |
| P3/P4 | The homepage dropdown's face + options read the dark ink in light mode | the dropdown builder (`--zaL`) |
| P5 | The rankings' renderer vars read the one ink | `zpbGroupPlayerHTML`'s vars |
| P6 | The score-line team names read the one ink | `renderGameResultHTML`'s `_vars` |
| P7 | The honor lines read the one ink | `honorLineHTML` |
| P8 | The All-Pro chips + the winner cards leave the vivid vars | the live `renderRegularAwardsHTML` (`stv` → `zpbNeutralRowVars`) |
| P9 | The cinematic records its end (6.9s); the skip pulls it to 0.4s, zeroes `--dfc-base`, and bounces every gate the veil caught | `zpbMaybeFinishCine` + `zpbReleaseLookGate` |
| P10 | The golden storm mounts in the same paint as the page | the `renderSeasonCompleteView` wrapper (the 450ms `setTimeout` dies) |
| P11 | The w42 script + style blocks at the end of the body | the look-gate, the skip release, the sweep, the straggler inks, the gate CSS |
| P12 | The gate canary (`zpbCardInCssOk`) | the gate degrades to always-visible if the block ever fails to land |

## The straggler inks (the CSS the tokens cannot reach)

- `.zpb-poschip{color:var(--tn,var(--zrb,var(--accent)))}` — the position chips' text.
- `.zpb-pstat{color:var(--tn,var(--text))}` — the key-player stat chips.

## What was deliberately NOT touched (flagged for the Owner's veto)

1. The **washes, borders, chips, logos, glows** — surfaces, not text; the team identity lives on.
2. The **90+ shimmer** and the **game-score inks** (the replay/preview score lines, the box
   score's F column) — his standing celebration + colored-score laws.
3. The **A10/A22 deep-ink row washes** in light mode — the rows stay legible as surfaces; only
   the TEXT goes pale.
4. The **pick-order cascade** compresses to 0.15s/beat (was 1s/beat — a 26-second tail).

## The suites

- `w42_verify.js` — 47/47. Static asserts on the bytes + live jsdom probes (the token
  equality on both row kinds, the dropdown pair, the All-Pro chip render, the gate's
  record/skip/release, the sweep's three paths, the w41 regressions carried).
- `w42_stress.js` — 52/52. The full flow in jsdom: the 32-pick draft (the NFL tab lives
  pre-season), the look-gate on the real map + the breakdown groups, the one-ink audit on the
  live rendered rows, the season through the books leg, the game surfaces' inks, the playoffs
  round by round with the real replays, the golden storm in the DOM the instant the page
  renders (I7), the awards' neutral chips, zero console errors end to end.
- `w42_live.js` — 27/27 in real Chromium. The width ladder (1280/900/500/390 × 2 themes),
  the computed inks (name/number/team cell identical across themes; `--tn === --tnd`), the
  dropdown's light ink = its dark ink, the gate drilled with the REAL IntersectionObserver
  (held while the cinematic runs → the skip releases it → the bubbles paint; a map below the
  fold stays invisible until scrolled to), evidence screenshots.
- The w41 carried suite: 58/62 — the four fails are the superseded per-theme ink mechanics,
  each an intended replacement (see UPDATE-README).

## Evidence (in `notes/evidence/`)

`dropdown-open-light.png` / `dropdown-open-dark.png` — the homepage dropdown, light reading the
dark ink (the white-on-white he asked to see) · `browser-neutral-light.png` /
`browser-neutral-dark.png` — the browser's tier law in both themes (the light one pale by
design) · `browser-light.png` / `browser-dark.png` — the 90+ shimmer pages ·
`map-review.png` — the review map after the gate opened · `rankings-light.png` /
`rankings-dark.png` · `map-seen.png` · `dropdown-light.png` / `dropdown-dark.png`.
