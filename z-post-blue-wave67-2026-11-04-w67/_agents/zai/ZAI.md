# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git credentials — the zip is the push. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 57; the per-wave live batteries (w46..w67); the halfway-ink law; the w61 measurement method (live rect sweeps); the w62 merge proofs; the w63 double round; the w65 triple round; the w66 double round with the battery catching three real regressions in-chain; **the w67 round — nine Owner items in a five-step asserted chain, the flash loop reproduced live before fixing (the w55 "measure, don't guess" lesson paying for itself again), and the all-teams ink battery extended to four surfaces × 2 modes**

## Current work
- **Wave 67 SHIPPED (2026-11-04):** the Owner's nine UI items —
  1. the two homepage dropdown bubbles are ONE fixed box (260×46, the measured full→city→abbr fit; equal at rest and after every selection, every width — battery-asserted across 32 teams);
  2. the player browser's flash is dead (data-nostack + the colspan-aware stacker; the loop was reproduced live first: the mstack flip every ~150ms at 390/430 while idle);
  3. the Series subtitle on the Owner's exact two lines (RANKING BY THE N MOST VALUABLE POSITIONS over the slot list);
  4. the fills dropdown's dark ink rides the neutral dropdown family (--tTxd; the Panthers read 11.77:1 in dark now, 32/32 teams ≥4.5:1);
  5. ONE reveal clock at **the season-in-badges pace — 0.6s per beat, measured and reported to the Owner** (the cards, the map, the depth; the w66 0.3s and the 1s map fallback retired);
  6. the dark-mode ink laws: the star cards read --tnd on their always-dark stage (the 90+ shimmer sweeps tnd→cream), the kp-title/kp-shm and the matchup bars swap to --zrbd in dark — 32 teams × 2 modes measured on four surfaces;
  7. the pregame stage ends at the footer (the mount clamps the intro's bottom inset to the footer's height; the ≤740/≤660 tiers compress the static block; swept at six window sizes, every row fully visible);
  8. the upper line is one left-aligned cluster (NEW DRAFT · 100 SEASONS · SIM GAME · SIM SEASON · BACK TO SEASON; the 20-0 far right; the LIVE add100Button reassignment wears the ctasmall family);
  9. SIM PLAYOFFS left the big-button law — BEGIN PLAYOFFS 216×50 @16px, SIM PLAYOFFS 126×40 @12.8px.
- **BATTERIES, all green on the shipped bytes:** nodecheck 23 blocks SYNTAX OK · w67_owner 40/0 twice · w67_teams 8/0 · w67_probe1 7/0 · zero page errors.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 23 (§3), then the w67 INTAKE LEDGER + BUILD REPORT.
- **The chain:** `zpb_w67.py` → `zpb_w67e.py` (FIVE steps, w66 → w67). Each asserts the previous md5; run in order; never hand-edit. The w66 baseline md5 `41d2cb10ab3608fcc879816e61e20002`.
- **Watch for:** `seasonState` is a top-level `let` (read bare inside try/catch) · the w55 restore stays the LAST body script · comments NEVER live inside template literals · flex children in `.tabs` stretch (the upper-line hosts carry align-self) · the draft room hides itself once the draft completes — probe the roster with a roster-view click · the welcome cinematic's `done()` fires the CPU kickoff — `_zpbWelCleanup()` cancels it · **the LIVE add100Button is a later reassignment — patch that one** · **the game cine's own exit law: the first #zrepSkip ends the intro, the second ends the game; #nextWeekBtn advances the week** · **the star stage is dark in BOTH modes — measure its inks against the stage, not the page** · `simToEnd` ignores the speed toggle · `zpbEnhanceCmpSel` must recurse OPTGROUP children.
- **Do not redo:** the w50–w66 laws; the one-ink laws; the merge proofs; the w66 natural-first lineup law (the FLEX table itself is REV 4 and UNTOUCHED); the w67 light-mode matchup bars (the Owner flagged dark only).

## The batteries
- `w67_nodecheck.py` 23 blocks SYNTAX OK · `w67_owner.js` 40/0 (twice; path-dependent legs 39-41) · `w67_teams.js` 8/0 (32 teams × 2 modes on four surfaces) · `w67_probe1_w67.js` 7/0 · `w67_shots.js` the evidence.

## Files in this lane
- `deliveries/` Z.ai's documents · `tools/` build scripts + verify suites · `builds/` the baseline HTMLs · `notes/` prompts, corrections, worklog
- gh-pages carries the Owner's pushes (w56–w66 + w67 when he relays this zip).
