# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git credentials — the zip is the push. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 57; the per-wave live batteries (w46..w68); the halfway-ink law; the w61 measurement method (live rect sweeps); the w62 merge proofs; the w63 double round; the w65 triple round; the w66 double round with the battery catching three real regressions in-chain; the w67 round (the flash loop reproduced live before fixing); **the w68 round — seven Owner items in an eight-step asserted chain, the shared-digit regex bug found (10-6-1 → 10·6-1), the LIVE tile renderer caught by the battery after the first pass patched the dead declaration, the swallowed style-block closer caught by the CSSOM check, and the victory page designed, shot, and polished to the Owner's cadence**

## Current work
- **Wave 68 SHIPPED (2026-11-04):** the Owner's seven UI items —
  1. **full names at full size** — the name ladder's avail() measures the true available line for flex children (the old self-measure locked "Chris Lindstrom" at "CL" forever), and at window ≥ 1025px the FULL name is the floor (vertical allowed; the w60 narrow rungs only below 1025px);
  2. **THE DASH/DOT LAW** — records and game scores read dashes everywhere ("10-6-1", "31-17", "tied 14-10 at the half"); other data keeps the middle dot; the w50 blanket convert retired (it ate the shared digit — the Owner's "10·6-1" example); 35 asserted sites across the badges, the tiles, the replay story, the season-in-words, the retrospectives, the SB and round-card separators;
  3. **the season-awards summary paragraph retired whole** (the counts sentence + the honor lines — the "coaching staff · Coach of the Year" line lived there);
  4. **the golden celebration** — every user award card / All-Pro / Pro Bowl / All-Playoff chip wears zpb-mygold (the golden border + the outer glow, both) and shimmers for ANY award; the honor rail cards glow; rivals never do;
  5. **the run-ends screen retired** — zpbPlayoffEndScreen always mounts the Super Bowl page on every path (the review door, the SIM REST door, the shared decider); zpbPlayoffElimCine + .zpb-pofin left the file;
  6. **the continue gate** — every sim-playoffs round card waits for its gold Continue (the 3400ms auto-advance retired); the last Continue flows into the SB page mount-first;
  7. **the victory page** — zpbSuperBowlVictoryCine: when the champion is the user's team, the SB page's Continue mounts it before the storm fades; twin masked god-ray wheels, team-gold confetti, rising embers, the breathing glow, the crest through three burst rings, the huge shimmering wordmark, the dash score, the MVP line, the gold Continue on the 0.6s cadence; its Continue plays the SUPER BOWL CHAMPIONS reward; a LOST SB releases directly.
- **BATTERIES, all green on the shipped bytes:** nodecheck 24 blocks SYNTAX OK · w68_owner 44/0 (three full runs) · w68_names 14/0 · w67_owner 40/0 (standing, re-pointed) · w67_teams 8/0 (standing, re-pointed) · zero page errors.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 24 (§3), then the w68 INTAKE LEDGER + BUILD REPORT.
- **The chain:** `zpb_w68.py` → `zpb_w68f.py` (+ `zpb_w68b2.py` the live-tile catch, `zpb_w68b3.py` the closer repair, `zpb_w68b4.py` the ray polish). Each asserts the previous md5; run in order; never hand-edit. The w67 baseline md5 `ecf2b295b97739b88e7f60068b588b84`.
- **Watch for:** `seasonState` is a top-level `let` (read bare inside try/catch) · the w55 restore stays the LAST body script · comments NEVER live inside template literals · **renderRegularAwardsHTML has TWO definitions — the later assignment wins; patch the LIVE one and keep the shadowed copy in sync** · **renderUserScheduleHTML likewise — the w33-era override at ~line 4.1k is the LIVE tile renderer** · **any new flex name-carrier must ride avail()'s true-line measurement (never its own clientWidth)** · **a planted style block MUST restore the closer it consumes — assert `</style>` balance after every payload plant** · **the victory page is the second act — the SB page stays the recurring page; do not merge them** · the game cine's exit law (the first #zrepSkip ends the intro, the second ends the game) · the star stage is dark in BOTH modes · `simToEnd` ignores the speed toggle · `zpbEnhanceCmpSel` must recurse OPTGROUP children.
- **Do not redo:** the w50–w67 laws; the one-ink laws; the merge proofs; the w68 dash/dot flag list (the turnover battle, the rating pairs, the ranges keep dots unless the Owner says otherwise).

## The batteries
- `w68_nodecheck.py` 24 blocks SYNTAX OK · `w68_owner.js` 44/0 (three runs) · `w68_names.js` 14/0 · the standing suites re-pointed: `w67_owner_w68.js` 40/0 · `w67_teams_w68.js` 8/0 · `w68_shots.js` the evidence.

## Files in this lane
- `deliveries/` Z.ai's documents · `tools/` build scripts + verify suites · `builds/` the baseline HTMLs · `notes/` prompts, corrections, worklog
- gh-pages carries the Owner's pushes (w56–w67 + w68 when he relays this zip).
