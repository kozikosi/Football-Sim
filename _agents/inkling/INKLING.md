# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent**. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol
1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**. Refresh first.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere is not mine to touch.

## Permanent seat rules
- Byte-check everything: every VERIFIED needs directory · exact command · ref/sha · output neighbourhood.
- Never edit governance, never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product/shell.
- No new P-IDs without the Owner; dissent in writing, inside the filing.

## Current state (2026-11-17 session end — large meta-round; branch pushed)

This session ran the v4 Cakepanz round + the Architect-round review + the full P-333 arc + the "verify MUSE" round + the Owner's gap-condition measurement + reviewing/pushing the **67-cakepanz-2** drop:
- **v4-2 council round + Architect-round review + P-333 (options, round-2, bench review, Ernie-structural review, MUSE flex-math verification) filed.** Healthy coverage: pin/integrity/neutrality/seam/box-score/battery/style/contrast/cutover. Headline settlements: box-score survivors at 86f22d10 VERIFIED (+3 more); gh-pages README stale; s5 checksums stale; cutover checklist: would-NOT-sign; Option B partially landed (FB>TE only) — flagged for owner re-ruling; MUSE's flex math VERIFIED almost entirely (one mechanism count contested; provider sign-flip at cap-70 reproduced); **KG's condition REPRODUCED: 3-4 wins exactly under his named weak-DT/deep-LB cell (3/29 flip, −0.147 wins) — the gap can stand.**
- **P-333 Part B structure (Ernie, dest ILB→OLB):** independently VERIFIED everywhere I can check — league bias flips to inside noise (13/14/5, −148.7), at the cost of the synthetic gap (→ −1100). ILB2-shadow identified as driver (~22/64 of 3-4 misfits; pool has bodies). No existing row re-rate zeroes the real bias. **Definitional Owner ruling now blocks: ideal-equal vs real-equal.**
- **The 67-cakepanz-2 delivery (shell completion, Desktop):** pushed verbatim to my lane (`_agents/inkling/deliveries/67-cakepanz-2/`, `f48e1ea1`) so anyone can read; review filed (`inbox/20261117-0105-inkling-CAKEPANZ2-review.md`): VERDICT **improved** — **two blockers kill the season flow**: (1) `restoreSeason` referenced at App.svelte:314 and never defined (Hub crashes, whole season chain dead); (2) the draft-complete screen never mounts (`<Complete>` instantiation crashes: `Cannot read properties of undefined (reading 'picks')`) — reproduced on delivered bytes AND fresh rebuilds. Plus: `dist/index.html` references assets never delivered (preview path blank); gates skip `dist/` (packaging loss structurally invisible); `<title>` stale ("slices 1-2"). Snapshot contract + MERGE docs are the keeper; 323/323 engine tests, 21/21 node battery (tsx), 26/26 on rebuild, file:// artifact clean — VERIFIED.
- **Z.ai v5 continuation prompt drafted + pushed** (`inbox/20261117-0205-inkling-prompt-zai-cakepanz-fix-and-continue.md`, `4e1ecac9`). D1–D5 are hard gates, full acceptance run is the only close; four Owner calls flagged for him only (palette, 90+ shimmer, award lines, Engine Value vs Model Value wording; `.ub` coverage verify).
- **Verified receipts that others rely on:** MUSE flex-math VERIFIED (ce0196d1); pin audit gh-pages=d3bd81d2 (README stale); s5 pin=4ca9a071; cutover checklist red; CHECKSUMS re-run on s5 (34/53 match); 67-cakepanz-2 integrity re-verified (231/233 self-ref, gates PASS, 323/323, 21/21, 26/26 rebuilt).

## What the next session needs
1. `git fetch -q origin; git log --oneline -3; git status --short` + `node tools/preserve.mjs check`.
2. Read `bulletin/20261117-0102-inkling.md` (this session's ledger) — do NOT re-run settled items (1b suite, ratchet, sealed bench, the flex pin, the 67-cakepanz-2 verdict).
3. Queue: `node .council_tool.mjs next` (v9 from `origin/council/muse`); a review you can do beats new work in the same tier.
4. Pending owner rulings if they land: Option B (DIME legs), ideal-vs-real formation equality, palette rulings (gold2/dark `--text`), `.ub`, award-line content, wording (Model vs Engine Value), the cutover's six reds, the cutover checklist's use after the v5 fix; shell-of-record (gh-pages vs s5 vs 67-cakepanz-2 — in other words: which tree ships); MERGE-day gate merge (both gates exist, mine + GLM's — reconcile).

## Where this worktree is
Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e` · HEAD = pushed branch tip.

## Transition discipline
Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
