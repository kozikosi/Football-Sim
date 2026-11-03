# W63 BUILD REPORT — Z.ai seat · 2026-11-03 (HST)

## Product
- `Football-Sim-Z-post-blue-w63.html` · md5 `8b601f06ad2938960a636f53e709148d` · 1,716,179 bytes
- Lineage: w62 (`468e6883…`) → `zpb_w63.py` (the Muse QA round, +7,893) → `zpb_w63b.py` (the Owner's UI round, +13,538) → w63. Both generators assert every anchor and re-run clean from the pristine baselines.

## The method — measure, don't guess (every claim probed live)

| Finding | Measured on w62 | Fixed | Verified on w63 |
|---|---|---|---|
| P0 browser freeze | 1,200 rows · 9,769 nodes · pager gutted | 60/page, the pager rebuilt | 60 rows · 619 nodes · "PAGE 1 OF 20 · SHOWING 1–60 OF 1200" · NEXT flips |
| P1 pill twice | the rail showed at scrollTop 0 beside the real CTA | rect gate in sync() + a scroll listener | hidden while the CTA is in view; returns carrying the label when scrolled |
| P1 draft jank | 1.88 MB board write → one 330–407 ms long task | ~20-row slices via zpbChunkBoard + a generation token | worst long task 107 ms; all 151 rows arrive |
| P1 hub CTA | the pill said SEASON, went to preseason | "START PRESEASON →" + a hint line + it joins the rail's IDS | the rail mirrors it when scrolled |
| P1 autosave | zero season persistence (only zpb:tab/theme/base34) | seasonState → ZPBStorage.save('A', envelope) on every season render (debounced 700 ms) + the team-ink chip | chip "AUTOSAVED ✓"; slot A holds the 213,548-byte envelope; a week advance re-saves |

## The Owner round — the anchors that mattered

- The pager: `PLAYER_PAGE_SIZE = 1000000` was a deliberate old law ("every player in one scrollable panel") — retired by the Owner's P0 directive (flagged in the ledger).
- content-visibility on the board rows was A/B-tested (330→400 ms — table layout ignores it) before choosing the slice painter.
- The rail's fix keeps `body.zpb-advrail` (the 64px top padding) constant per view — hiding the bar never reflows the page (no oscillation at the visibility threshold).
- The autosave wraps `renderSeasonTab`/`startSeason`/`renderDraftResults` (true globals); `seasonState` is a top-level `let` — a global lexical binding, never a window property (the first draft of the payload failed on exactly this; the battery caught it).
- The w55 law holds: the tab-restore script remains the LAST body script — the payload rode in before it (a post-check asserts it).
- The awards stack and the leaders cards are CSS-first (the DOM order already suited); the COTY "YOU" law rides the story honor cards; the awards panel already carried the real coach names (w52).
- The four skies: the replay overlay carries `zpb-rd-regular|wildcard|divisional|champ|superbowl` (derived from g.roundLabel in both builders); the CSS escalates conic/aurora layers with the site's --gold2; reduced-motion freezes them; compositor-only properties (transform/opacity/filter).
- The try-again ink: `.zpb-again-q` now reads var(--text) — Miami dark measured rgb(211,220,211) on rgb(41,26,36) = **contrast 11.79:1**.

## Batteries — 145/145 on the shipped bytes

- `w63_nodecheck` 18/18 (every inline script parses — the +2 are the w63/w63b payloads)
- `w63_verify` 13/13 — the Muse five end-to-end (KC draft drive, the inks light+dark, the detail-map floor, the storage walkthrough, zero errors)
- `w63_mobile` 41/41 — 280→740 + the inks + the storage walkthrough (the w61/w62 laws hold on the merged bytes)
- `w63_live` 7/7 — 1280: the review row, the map, the five OL one line
- `w63_storage` 7/7 — the 25-check fault rig green in the real page; the bench 0.5+0.3 ms
- `w63_sweep` 13/13 — 6 views × 1920/1280/1024/768/600/390/320: zero pan, zero '…', zero errors
- `w63_cine` 27/27 — the season flow on the w63 rail law (aside-when-visible, up-when-scrolled, the clone acts) + the exit law + the footer pair
- `w63_owner` 19/19 — the Owner round live: the tooltip, the pick cards, the tab-row SIM, the bars, the footer CTAs, the round sky, the tall panel, the full-width CONTINUE, the leaders cards, the review pan, the beats, the awards stack, the Miami ink

## Honesty notes

- The B10 door (the try-again confirm) is seed-dependent to REACH in the harness (the team must make the playoffs); on the missed-playoffs seed the check soft-skips — the law itself is proven on the SB-made seed (the screenshot + contrast 11.79).
- The autosave is SAVE-ONLY by design: no restore, no Continue UI — the standing guidance (the Phase 0 plan §6 + the E3 ack) gates those on the Architect's E2 envelope types. Slot A holds the autosave until then.
- The browser page size (60), the board slice (20), the autosave debounce (700 ms) and the chip fade (4.2 s) are one-number changes if the Owner wants them tuned.
