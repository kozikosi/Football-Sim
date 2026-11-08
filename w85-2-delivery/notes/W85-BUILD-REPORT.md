# W85 BUILD REPORT — the doors that hover · 2026-11-08

**Generator:** `tools/zpb_w85.py` — 24 asserted exact replacements + one payload append; re-ran clean from the pristine w55 baseline on every iteration. Baseline md5 `49161f118e587701f1d639346e22d4d2` → w85 md5 `2de5d414097c020adec048acc1645ad6`.

## The fix table

| # | Item | What changed | Proof |
|---|------|--------------|-------|
| 1 | W85-1 stage banner | `#zpb-stagebar` fixed pill + `zpbUpdateStageBanner()` hooked into `renderSeasonTab` / `setActiveTab` / `updateStepper`; stage+CTA computed from `seasonState`/`draftSim`; Back-to-<stage> on the five tool tabs | battery 28/28 · shots e2/e3/e4/e8/e10 |
| 2 | W85-2 top landings | `window.scrollTo(0,0)` on every stage-advance handler (page + banner) | battery scrollY===0 after beginseason / playweek / beginpo / restore |
| 3 | W85-3 seeds | `seedLabel` → `<span class="zpb-seedlbl">NFC #7</span>`; conference derived from the team when the bracket game lacks it; Cinzel Decorative ink via `--tn`/`--tnd` | battery: `NFC #7`/`NFC #2`, Cinzel, `rgb(169,33,27)` · shot e8 |
| 4 | W85-4 names/badges | `.zpb-pstat` and the hidden `.zpb-pcard-stats span` override → .6rem, padding 1px 5px; hd flex 1.7 / stats flex 1 / rt min-width 50px; `overflow-wrap:anywhere` on the name | battery: zero clipped at 1280/1440/1920; 12.6px badges (was 13.86px) |
| 5 | W85-5 pregame fit | `.zpb-replay` 840→920px; `.zpb-rep-log` min 340→425px, max 66→72vh; star lanes 78→71, 66→62 | battery: 6 stars inside the box, last pair 132px clear · shot e9 |
| 6 | W85-6 null grades | `if(!e \|\| !e.name) return;` in `pickGradePanelHTML`'s slot loop | battery: TE1 deleted → no TE1 row |
| 7 | W85-7 autosave | `zpbAutosave/Tick/ClearAutosave` + sig-gated tick in `renderSeasonTab`; draft+lineup dirty flags; `zpbRestoreSeason` rebuilds draftSim (pool/order/pos=order.length) + lands via `renderDraftResults` at the top; the bubble offers the saved stage; New Draft clears | battery: saves at week 2 → week 3; reload → bubble names Week 3; restore lands Week 3 top; champion save restores to the champion page; New Draft → save gone, no bubble |
| 8 | W85-8 border + cutdown | linescore double frame (2px + inset ring + drop, 14px radius); `zpbCutdownPanelHTML()` leads the preseason page (32 audited slots, OPEN/FLEX chips, advice, editor jump) | battery: 2px/solid/shadow; 32 rows + edit button · shots e1/e5 |

## Standing-law sweep (the ten commandments + the w55 phone laws)
- Integers only — every count in the new panels is an integer; letter grades ride the existing `letterGrade`.
- No white text — banner/bubble/cutdown/seed colors ride `--text`/`--sub`/`--tn`/`--tnd`/`--accent`; the battery asserts the seed ink is never pure white or black in both themes.
- One shimmer, 90+ / 85+ bold — the banner, bubble and cutdown add no new shimmer; tier classes ride the existing laws.
- Cinzel Decorative — the banner stage label, the seed label and the cutdown slots inherit the site's Cinzel family.
- The dot law — no new colons or semicolons introduced.
- Phone laws — 390px probe: banner pill 356px (fits, kicker hides ≤640px), zero page errors, no pan.
- Explanations live in the Guide — no new explainer panels on the game pages.

## Batteries
- `w85_nodecheck` — 14/14 script blocks parse.
- `w85_battery` — **28/28** across draft → preseason → weeks → review → playoffs → champion → restore → new-draft, 1280/1440/1920, **zero page errors**.
- `w85_shots` — 11 evidence screenshots, zero page errors (prematch/replay/story overlays dismissed for clean captures; the pregame shot keeps its overlay).
- Mobile probe (390px) — banner fits, no pan, no errors.


---

# ROUND 2 — the w78 merge + the re-sent comments · 2026-11-08

**Generator:** `tools/zpb_w85b.py` — 55 asserted exact replacements + the payload append; re-ran clean from the recovered w85 bytes (`2de5d414…`) on every iteration → md5 `92372f62a5de2a6eb36bbde7a5ed77bb`.

| # | Item | What changed | Proof |
|---|------|--------------|-------|
| 1 | R2-13/R2-18/R2-20 Draft Command Center | `zpbDraftCommandCenterHTML()` on the Season Review — below-B unit cards best→worst, CUTDOWN DAY subtitle (centered Cinzel Decorative 1.34rem), cut cards with OVR + SEASON RATING badges + the shining CUT, PRIORITIZE… 20-0 team-color shine; the five retired lines never print | battery: rooms sorted (#17→#30, all below B), every cut <80 OVR with rating under the median (76), the punter never listed, zero retired strings · shots r2-14/r2-15 |
| 2 | R2-19 the rating scale | `ZPB_MEDIAN_OVR` = median OVR of all 1,200 database players (76) + `zpbSeasonRating()` translation; rankTag, the QBR chip (integer), the preview key-player cards and the Guide glossary read it | battery: r50→76 (the median), r70→96, guide carries the law |
| 3 | R2-2 the gated banner | `gateBanner()` + IntersectionObserver on the page's own next-stage button (per-stage anchor map); the banner hides while that button is on screen and appears the moment it scrolls out | battery: hidden at preseason top (own button at y=208), shown at scroll 1100; guide bar anchor too |
| 4 | R2-14 Back bars | `.zpb-view-backbar` top + bottom pills on the five tool views, stage-labeled, one click home | battery: all five pages carry both bars reading Back to Preseason · shot r2-09/r2-11 |
| 5 | R2-4 the chip law | `newDraftUI` groups start empty; the board shows all when every chip is off (cards + table + pool paths); ALL = all on; CLEAR = the default | battery: default 14 off / 151 rows; QB on → 40 QB rows; all on → 151; QB off from all-on → 0 QB rows |
| 6 | R2-3 the chip fill | `.zpb-srbtn.on` fills with the accent (ongold ink) in both themes | battery: light rgb(170,0,0) fill, dark rgb(254,0,0) fill · shot r2-02 |
| 7 | R2-17 fills + no pan | flexTxt → `(-N)`; `#draftTableWrap` overflow-x hidden + width 100% + wrapping fills | battery: zero 'flex' in fills, scrollWidth fits, 390px no pan |
| 8 | R2-12 the chained cinematics | the Sim Playoffs handler collects the user's played rounds; `__zpbCineChain` + the replay close handler mount each round's full cinematic, the Super Bowl holds for the storm | battery: first cine = WILD CARD ROUND, the chain mounts round by round, the champion reveal mounts after the last close · shot r2-13 |
| 9 | R2-9 light pregame cards | theme-aware `.zpb-intro-star` (light team wash + --tn ink; dark keeps the stage) | battery: luminance 0.82 light / 0.10 dark · shot r2-08 (Chiefs) |
| 10 | R2-10 the box score ink | the linescore double frame rides `var(--accent)` — the score border's color | battery: both computed rgb(170,0,0) on the same page · shot r2-07 |
| 11 | R2-11 the 0.60 award ink | `txM6` in every pack (0.60 mix, 5:1 floor) + `--tTxM6` var + `zpbAwardInkVars()` on the award cards, AP chips, playoff cards, honor lines | battery: every <85 name computes its own card's 0.60 ink · shot r2-12 |
| 12 | R2-8 the sim-season ghost | `button.zpb-simseason` → transparent + glassbd, identical to SIM GAME | battery: backgrounds equal rgba(0,0,0,0) |
| 13 | R2-5/R2-6/R2-7 preseason text | zpb-dd loses the box and shrinks (.78rem); the terms dropdown joins the class; 2 point conversion spelled out; "(x teams run it)" removed | battery: all dropdowns border-none 16.38px, spelled strings present, zero 2-pt on the page, zero 'run it' |
| 14 | R2-15 the full viz | the win-math bars stop filtering — all 32 spots rank (~0 wins for the lightest); SLOT_FRIENDLY + LABELS gain TE3/WR4/FB/DL5/CB4-DIME/P; the field-map legend gains FB | battery: 32 rows, TE3 + DIME + P + FB present, ~0 label |
| 15 | R2-16 Offensive guard | WV_NAMES.OG → Offensive guard (the draft dropdown), ZPB_FULL + SLOT_FRIENDLY follow | battery: the option list reads Offensive guard, no bare Guard |
