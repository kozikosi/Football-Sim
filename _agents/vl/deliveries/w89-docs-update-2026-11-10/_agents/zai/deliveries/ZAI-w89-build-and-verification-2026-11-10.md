# Z.ai — w89 build & verification report · 2026-11-10 (session 18, the recovery chat)

## 0 · What happened this chat

The previous session (session 17, the w89 build chat) **timed out before delivering**. This chat
recovered its work from the sandbox: the intake ledger (`INTAKE-W89.md`, all 26 Owner asks
mapped), the patch script (`build_w89.py`, 54 asserted replacements), the verify suite
(`verify_w89.mjs`, 35 laws) and the live battery (`w89_live.js`) were all found in place. The
session rebuilt w89 **from pristine w88 through the chain** (never from the timed-out working
copy), closed the gaps the timeout left behind, and delivered.

## 1 · Recovery findings (what the timeout left)

- The recovered `w89.html` (md5 `5e46b5f5…`, 1,919,300 B) had been built on a **dirty
  intermediate** (`w88-check.html`, +13.9 KB over pristine w88) — an unexplained ~2.1 KB of
  content outside the chain. Per the workflow law (build ONLY via the chain), this chat
  discarded it and rebuilt from pristine w88 (md5 `2f7a4654…`) with `build_w89.py`.
- The dock (the season tab cluster's new bottom home) was found **mid-fix**: RUN IT BACK sat
  AFTER 100 SEASONS instead of between NEW DRAFT and 100 SEASONS (the Owner's ask 7). Fixed in
  the chain and rebuilt.
- The dock on phones **stacked into three lines** instead of side-scrolling: the W61-3
  `column-reverse` media query (written for the retired top cluster) still bent any
  `.zpb-cygops` into a column at ≤429px. Fixed with dock-scoped overrides (specificity 0-2-0+).
- The old `w88-check.html` intermediate and the stale pre-rebuild evidence were deleted so no
  stale artifact can ship.

## 2 · The build (the chain, 54 asserted exact replacements)

`build_w89.py`: w88 (`2f7a4654bff000e4b2365e0bd6fd1e3f`, 1,904,952 B) →
**`Football-Sim-Z-post-blue-w89.html` · md5 `4fc6b76000be65c0b1699b30e28f9e48` · 1,919,691 B**,
54/54 anchors found exactly once, every replacement asserted. All 26 intake items landed:

- §1 SEARCH/BOARD: the idle player browser shows the SEARCH splash (L1a); the draft board's
  all-on/all-off subtitles retire (A10) while the weights panel's ALL keeps its `<i>` (A11);
  the depth chart's "+14 WINS…" badge, the "+x" wins numbers and "13 OF 32 STARTERS" retire
  (A8/A9), the grid rebalanced to 3 columns.
- §2 BANNERS/TABS/DOORS: the floating stage banner retires, the full-width rail (the one backed
  by the line across the page) is the only scroll banner and carries TRY AGAIN (A4/A5); the
  season tab cluster docks at the bottom as the sticky side-scrolling strip (A1/A2, L2a/b/c)
  — NEW DRAFT · RUN IT BACK · 100 SEASONS · SIM SEASON/SIM PLAYOFFS · 100-SEASONS hosts · the
  20-0 tagline; BEGIN PLAYOFFS rides the scroll-down rail; SIM GAME retires from the champions
  page (A7, L6c).
- §3 BOX/PLAYOFFS: team-inked vertical lines between the quarters and F, the dark-mode name-bar
  scoped out (A21, L4a/b, screenshot); the #1-seed bye panel shows the most likely divisional
  matchup (A23); AFC #1 / NFC #1 subtitles shimmer gold (A22, L5c); the round skies wear the
  user's team ink (A24) + three new during-game dynamics — the momentum tide, the command read,
  the big-play flash (A25).
- §4 DRAFT REVIEW/PRESEASON: full names on the draft-review fade cards on mobile (A26); the
  "SET UP THE X BEFORE WEEK 1" panel retired — the TRAINING CAMP cinematic plays before the
  page (L3a) and the page opens on 1. LINEUP (L3b, screenshot); NEW TO LINEUP? (A14).
- §5 COACHING: one WHY THIS STYLE? dropdown carrying the math + both style tables (A17, L3h),
  WHAT DO THESE TERMS MEAN? above it (A18), the philosophy paragraph retired (A15), AUTO
  statics (A16, L3d), the aggressiveness Style select lives in no `<label>` — the second
  dropdown cannot open (A19, L3f), the two-point try reads KICK 1 PT · 94% / GO FOR 2 2 PT ·
  48% badges (A20, L3g) with each explanation sentence on its own line.
- §6 GAME DAY/CINEMATICS/CHAMPIONS: the preview strip stacks ≤640px — the 44/56 bar takes its
  own full-width row (A32, L8a, phone screenshot); the bye banner reads NO. 1 SEED / FIRST-
  ROUND BYE! on two lines without the dot (A27); winning the Super Bowl skips the conventional
  page — the victory page IS the show, with THE FINAL WHISTLE sub-line, three dynamic lines
  reading the real season (PERFECTION · 20-0 on a 20-0 run) staggered at 6.2/9.2/12.2s, and the
  heavy storm (A28/A29, victory probe V1–V9, screenshots); the champions page wears the
  full-width TRY AGAIN bar with SEASON REVIEW below and RUN IT BACK only in the dock (A30,
  L6b/d).

## 3 · Verification (four gates, all green on the final bytes)

1. **Static laws** — `verify_w89.mjs`: **35/35** (A1–A33 structural + B1–B3 harness).
2. **Parse gate** — 30/30 script blocks parse, div/details/table census balanced; the one
   style-brace complaint is the **pre-existing W63 autosave block carried from w88** (a stray
   `}` after an unconditional `transition:none` — benign CSS recovery, shipped in w88, left
   untouched: not this wave's mandate).
3. **Live battery** — `w89_live.js` (Playwright, real Chromium): **27/27**, zero page errors —
   including the strengthened L8b (the dock is ONE 56px-tall row at 390px, `scrollWidth >
   clientWidth`, draftops nowrap) and L7b (a lost Super Bowl still plays the conventional page
   — the skip is win-only).
4. **Victory probe** — `w89_victory_probe.js`: **9/9** (direct mount with an injected champion
   season; the guard chain, the sub-line, the staggered dynamic lines, the storm, zero errors).

Evidence (fresh, final build): `evidence/w89-*.png` — splash-search, draft-review-dock,
preseason-cine, preseason-page, phone-preview, boxscore, review-top, champion-top, victory,
victory-settled.

## 4 · Notes for the next session

- w88's `w88-check.html` style intermediates must never seed a build — one base, pristine, md5
  asserted in the patch script header.
- The dock's host ids (`zpbDraftOps`, `zpbSimTabsHost`, `zpbBtsHost`) are unique on the page and
  every pre-existing wiring (add100Button, syncSimTabs, sim-game insertion) keeps working — do
  not re-introduce a second copy of those ids.
- L7 (won-the-SB path) stays SKIP in the live battery (the sim rarely wins); the victory probe
  covers the page directly — keep both.
- Slice 3 (P-316) remains read-but-not-started; 67 Cakepanz ignored this chat (the Owner's word).

## 5 · R2 — the Owner's second round, same chat (the w89 redelivery)

The Owner reviewed the w89 delivery, was not satisfied ("A lot of things i don't like with this
version so i'm not pushing it"), and returned **four more asks** (intake §8, items 27–30), still
delivered as **w89** (the first build never reached the branch). The chain absorbed them as an
R2 patch section (8 more asserted replacements, 62 total) and rebuilt from pristine w88:

**`Football-Sim-Z-post-blue-w89.html` · md5 `8efa9099ae508532d5392a7c82436b05` · 1,922,769 B**

1. **The guide's Wins caption retires** (item 27) — `zpbPosRankHTML` closes its wrapper and stops
   writing the prcap line; the ranking table reads alone. The draft board's twin caption
   ("· QB anchored at 1000") is not named and stays. (A34)
2. **The autosave bubble loses its words and its Not-now button** (item 28) — the bubble is now
   ONE quiet pill, `RETURN TO YOUR SEASON`. The restore door itself stays: `zpbRestoreSeason` is
   reachable ONLY through this bubble, so a literal removal of the quoted text + the named button
   keeps saved seasons reachable while the nag is gone. Live-proved on the real autosave: reload
   shows the bare pill, clicking it restores the finished season, the bubble leaves. (A35, R2e/f)
3. **The little "Style" word retires from the aggressiveness dropdown** (item 29) — the only
   `>Style<` label in the product (the style tables' `<th>Style</th>` column headers are table
   columns, not labels). Law 20's div form is untouched — the second-dropdown glitch stays fixed.
   (A19 rewritten, R2g)
4. **SIM GAME and SIM PLAYOFFS read at the top of the page again** (item 30) — `#zpbTopSimStrip`,
   right-aligned, the FIRST thing on the season page under the view tabs, mirroring the dock's
   doors exactly (SIM GAME while this week's game is up · SIM SEASON through the regular season ·
   SIM PLAYOFFS through the bracket); the dock keeps the same doors at the bottom. The preseason
   page never mounts it (1. LINEUP stays first) and the champions page mounts none. Top doors ride
   the `Head` ids so every dock wiring stays unique; the A9 SIM SEASON question and the W65-D SIM
   PLAYOFFS warning adopt the Head ids — both top doors ask first, exactly like the bottom ones.
   Interpretation on record: SIM SEASON rides the top strip too (the strip mirrors the dock's door
   set). (A36–A40, R2a/b/c)
5. **Found while wiring 4, pre-existing since w65, fixed**: the dock SIM GAME button gained a new
   click listener on EVERY re-render (the button persists across renders; the render wiring never
   guarded). A stacked click re-fired `zpbGameReplay` — one click, two replays. The wiring now
   guards on the shared `_zpbW65` flag. Regression-proved live (R2d: double renders, one click,
   calls===1, one sim week).

### R2 verification (all gates re-run on the final bytes)

1. **Static laws** — `verify_w89.mjs`: **44/44** (A1–A40 structural — A19 rewritten for the
   Style-word law — + B1–B4 harness; B4 runs the r2 block).
2. **Parse gate** — 31/31 script blocks parse (the r2 block included), div/details/table census
   balanced; the one style-brace complaint remains the **pre-existing w88 W63 artifact** (block 36
   in w88, 37 here — benign CSS recovery, not this wave's mandate).
3. **Live battery** — `w89_live.js`: **35/35**, zero page errors — the 27 prior checks plus R2a
   (strip first child, right-aligned, both doors, dock copies present), R2b (the top SIM GAME door
   plays the week and lands on the Game Review), R2c (after the sim the strip mirrors the dock),
   R2d (the dock wiring guard), R2e/f (the quiet bubble restores the real autosave), R2g (no Style
   word), R2h (the guide ranking stands alone).
4. **Victory probe** — `w89_victory_probe.js`: **9/9** (re-run on the rebuilt bytes).

Evidence (fresh, final build): `evidence/w89-*.png` — splash-search, guide-rank, draft-review-dock,
preseason-cine, preseason-page, aggr-nostyle, topstrip, phone-preview, boxscore, review-top,
champion-top, autosave-pill, victory, victory-settled.

### R2 notes for the next session

- The top-strip ids (`simGameBtnHead`, `simSeasonBtnHead`, `simPlayoffsBtnHead`) are unique
  companions of the dock ids — never reuse the dock ids for a top door (the dock's creation
  logic checks `getElementById` and a name collision would suppress the bottom copies).
- The top strip mirrors the dock's doors by design; if the Owner later wants SIM SEASON off the
  top, the change is one line in the w89r2 block (drop the simSeasonBtnHead append).
- The autosave pill is the ONLY restore door — do not remove `#zpb-savebud` entirely without
  giving `zpbRestoreSeason` a new home.
- The `w89_aggr_shot.js` tool captures the aggressiveness panel; keep it with the suite.
