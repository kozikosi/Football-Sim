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

## Current state (2026-11-17 ~04:30Z — M3 engine-verification round + Z.ai charter drafted; branch pushed @ d474090b)

**This sitting, in order:**
- **Part 1 (P-333 poolnode check-can-fail)** — filed `inbox/20261117-0240-inkling-P-333-poolnode-check-can-fail.md` (pushed 9153b379). Suite at architect tip `5c8084720604c6f2e160104d185bf4a816586380`: **394/394 VERIFIED**. All five faults planted one at a time and restored each time; vectors test dies in 5/5 — fault 4 via the loader's own self-check (`distC edges` subset assert), not an assertion. One-byte mutation of a digest kills the test (pass 9/fail 1). Table-hole divergence (lab arbitrary pool vs product largest-on-coarsest): **SAFE** — small node class, counted in code + recorded in vectors (`holes_skipped`: 136 fit2023-2025 / 292 fit2016-2022, clockNon only), coarsest-max is principled, both sides count. Needs a design-record line, not a rule.
- **Part 2 (P-375 cosine)** — `inbox/20261117-0255-inkling-P-375-cosine-bit-identical.md` (pushed 30e93ea3). On Node v26.13.0 / macOS: `keyedrng_check.py` → normal() **120/120 bit-identical** (was 106 here on the old code); `pmath_check.py` all vectors bit-for-bit; keyedrng vectors test PASS (the guard that failed before); suite 394/394; tsc ratchet unchanged at 89.
- **Part 3 (CI-GATE)** — `inbox/20261117-0310-inkling-CI-GATE-ci-gate.md` (pushed 220bf231). `7828d914` removed `continue-on-error` from the Production build step ONLY; tests+tsc stay report-only by Owner direction. Last three runs all **✓ built (71/92/116 ms) → success**; the flip commit itself green; **no red build run exists — teeth wired, never exercised**.
- **Part 4 (P-333 landed claims)** — `inbox/20261117-0325-inkling-P-333-recent-engine-work.md` (pushed e94354d6). Six flex 0→2 VERIFIED in file+count (17/17/42/23); pack loads, md5 `d80c312b…` matches the note, **zero table holes** on both configs (1000 games each); **the claimed loader hash `pack53:0ff47e1de5e2db` reproduces ONLY under `dt_pf computed`** (raw body → `0e78e4db382f9f`) — the loader hash is configuration-dependent, invocation must be cited with it; claimed gzip size (325,938) does not reproduce (319,099 @ level 6 / 314,458 @ level 9); derived priorities confirmed in code; OT clock "OT mm:ss" asserted gameview.test.ts; FB→TE 2; DIME stays 12 asserted; gh-pages README still pins `4ca9a071` (stale). Suite 394/394.
- **Z.ai "continue any work" charter** — `inbox/20261117-0426-inkling-prompt-zai-continue-any-work.md` (pushed d474090b). Standing charter for the shell track: part-ordered (A inventory; B re-pin to `5c808472`; C review findings; D re-verify; E satellite items P-360/P-369/P-363/P-364/P-365/P-368/P-254/P-260; F Slice 3 P-316 only if green + room); blocked-rulings table; one-zip law; composes with MUSE's sitting prompt (`7e9e915d`, council/muse), which is the build order. Cakepanz-3's four reviews labelled accurately (inkling improved; beam ok/merge-ready; vl merge-ready-behind-two; ernie fixes-landed).

**Live facts others rely on:** engine tip `5c808472` suite 394/0 VERIFIED; `normal()` 120/120 on Node 26 macOS; CI build gate exists (no report-only), unexercised by red; pack loader hash is config-dependent; Muse prompt `7e9e915d` on council/muse is the sitting build order for Z.ai (re-pin to 5c808472).

## What the next session needs
1. `git fetch -q origin; git log --oneline -3; git status --short` + `node tools/preserve.mjs check` (my worktree was OK; `wt/or` 162 dirty, `wt/q` 1831, `wt/vloc` 2 — all not mine to touch).
2. Read the latest bulletin (`bulletin/20261117-0433-inkling.md`) — current standing state; the four M3 filings `inbox/20261117-02{40,55,31,25}/0310…` + `-0426-…-continue-any-work` are the live record; don't re-read older rounds.
3. The MUSE prompt `zai-cakepanz-repin-and-continue-2026-11-16.md` (council/muse `7e9e915d`) is likely what KG relays to Z.ai; my charter composes with it. If Z.ai's delivery lands: re-run the cutover checklist (`inbox/20261116-2225-…`) and the carried-expectation swap test against the re-pinned shell; then the seam-checkers reconciliation + the shell-of-record ruling can move.
4. Queue: `node .council_tool.mjs next` (v9 from `origin/council/muse`). A review you can do beats new work in the same tier.
5. **Open Owner rulings (do NOT decide):** palette gold2 (1.51 AA fail) + dark `--text` (3.17); Engine Value vs Model Value label; 2027 product-year (FEED_YEAR 2027, label-only per P-374 review, Owner's call); shell of record; Option B DIME legs (Owner re-rule pending; my review asks); .ub scope; w89 shimmer source law; touchdown law source.
6. **Do NOT re-litigate** the cap ruling, flex rulings, pin facts, D1/D2 (fixed, receipts green), the 99-rule flex counts. Prove it fresh every time; measurement > position.

## Where this worktree is
Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e` · HEAD = pushed tip (ls-remote verified).

## Transition discipline
Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
