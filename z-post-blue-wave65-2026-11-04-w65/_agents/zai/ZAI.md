# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git credentials — the zip is the push. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 57; the per-wave live batteries (w46..w65); the halfway-ink law; the w61 measurement method (live rect sweeps); the w62 merge proofs; the w63 double round; **the w65 triple round — 25 Owner UI items + a weight sync + a QA round in one nine-step asserted chain, with the visual check catching three late defects the green checks missed**

## Current work
- **Wave 65 SHIPPED (2026-11-04):**
  1. **THE OWNER'S 25-ITEM UI/UX ROUND** — the homepage Draft button keeps its air (above the dropdowns, off the footer) · the footer sits in flow, pushed down (the sticky law retired) · the universal glowing BACK TO SEASON at the top and bottom of every page with a season · the header SIM GAME + SIM SEASON doors at one small size on the tab row (phase-gated) · the depth chart fades at 0.12s a beat (the 90+ floor retired) · the ST pane left-aligned like O/D with its lines back · the comparison tab rebuilt (pills + the X vs Y score, its own line on phones, both surfaces) · the dropdowns matched at the bigger pill size · the Player browser reads ALL TEAMS / ALL POSITIONS / SEARCH PLAYER NAME (the dot gone) · the draft board's first-letter bar dead in every theme · the roster-locked sentence gone · START PRESEASON copied to the bottom · the Season stats panel leaves the Week 1 preview (returns once a game is played) · the pregame logos + key players sit low (≤600px) · the SIM PLAYOFFS warning page (A9 format, your-team-in gate) · no SIM SEASON on the SB review · the SEASON REVIEW button: no arrow, centered, glowing, its own panel · the Season Review glitch pinned (lands on the review page even after the 100 seasons) · the 100-seasons badges + the glowing team-ink door.
  2. **CLAUDE'S WEIGHT SYNC (de60e05)** — the SLOTS table (WR1 525 · WR2 295 · TE1 295 · DT1 410 …), RATING_SPECS.rec (WR2 .70 · WR3 .45), PLAN_K.defPredict 0.15 — reflected everywhere the weights are DISPLAYED: the Position Rankings buttons, the Guide tier viz + per-slot table, the MODEL preset. The engine math untouched (the Owner said it need not follow).
  3. **THE MUSE QA FOUR** — P-232 CLOSED (the embedded FLEX table is REV 4 verbatim: QB only → FS -10; the auto-fill obeys the flex table — no flat -9) · the honest RESTORE SAVED SEASON chip (slot A + the draft envelope; w63-era saves restore) · the pager un-hidden (an old display:none law was killing it) · the preseason heading TESTED — reads the drafted team (Las Vegas Raiders), NOT reproduced; evidence in the ledger.
  4. **BATTERIES 205/205** on the shipped bytes (nine suites; the new w65_round battery encodes the 25 items).
- **The visual-check lesson:** three late defects were invisible to the green checks — a w65 comment inside a template literal rendered as page text (pushed SIM SEASON onto its own line), the sim-tabs host stretching SIM GAME to the tab height, the tab line stretching SIM SEASON after the fix. Screenshot every fixed surface before shipping.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 21 (§3), then the w65 INTAKE LEDGER + BUILD REPORT.
- **The chain:** `zpb_w65.py` → `zpb_w65b.py` → … → `zpb_w65i.py` (nine steps, w64 → w65). Each asserts the previous md5; run in order; never hand-edit.
- **Watch for:** `seasonState` is a top-level `let` (read bare inside try/catch) · the w55 restore stays the LAST body script · comments NEVER live inside template literals (w65 step 8) · flex children in `.tabs` stretch — the sim doors carry `align-self:center` (w65 step 9) · the graphical render100 (line ~3848) is the one that runs; the text report at ~10860 is not reachable from the tabs.
- **Do not redo:** the w50–w64 laws; the one-ink laws; the merge proofs; the w65 comparison-tab rebuild (the footer page's pattern is the law now).

## The batteries
- `w65_nodecheck` 19/19 · `w65_round` 59/59 (the 25 items) · `w65_verify` 13/13 · `w65_mobile` 41/41 · `w65_live` 7/7 · `w65_storage` 7/7 · `w65_sweep` 13/13 · `w65_cine` 27/27 · `w65_owner` 19/19.

## Files in this lane
- `deliveries/` Z.ai's documents · `tools/` build scripts + verify suites · `builds/` the two baseline HTMLs · `notes/` prompts, corrections, worklog
- gh-pages carries the Owner's pushes (w56–w64) and w65 when he relays this zip.
