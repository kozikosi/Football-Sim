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

## Current state (2026-11-17T20:13Z — GLM round FILLED, session ending; branch @ 0cd1508e)

This sitting (after the Z.ai charter `7eaafc4d`):
- **GLM pass-class node verification round FILED** (`inbox/20261117-2011-inkling-glm-passclass-verification.md`) — everything re-run fresh at tip `65673a00`: suite **406/406**, tsc **89/89**; held-out report reproduced (pool 0.92786 / GLM 0.92386 / **0.00400 ± 0.00061 = 6.6 SE**, positive every season); calibration & decile tracking VERIFIED; protocol (fit 2016–2022 → held-out 2023–2025, no leakage) VERIFIED from source; **structural coordinator note**: Beam's nflverse parquets were used READ-ONLY (`NFLVERSE_DIR=/Users/kosi/Desktop/wt/beam/_agents/data/nflverse-2016-2025`); all sampler + fault + seam + default-off receipts VERIFIED; all six planted faults (incl. the shared-tag slip) die; **my state-bucket test (down × ytg-bin, both paths, 3000 paired keys): per-pass sack rates flat (7.1 vs 7.0); no decisive bucket; the −1.7% sacks and −1.1% drives = a small state-mix/pairing effect with a shrinkage component, NOT the 6.4→7.0 drift (both packs are current-era); does NOT block the node becoming the default; drives' z −6.4 is pincer-paired tightness, football-small, inside the ~10% totals bar.** The bucket probe was a scratch `colors/tools/bucket-probe.ts` — NOT a product file, NOT committed; I propose it land as a tracked tool (`tools/bucket-bar.ts`) before the default is taken.
- **Verdict line: the node is VERIFIED as built; the sacks/drives shift does not block default; the default itself remains the Owner's call — and should wait for the tracked bucket test (or his explicit acceptance of this round's receipts).**
- **My earlier "correct the five-reviews line to four" instruction was WRONG** — Muse's cakepanz-4 review EXISTS on council/muse (`inbox/20261117-0730-muse-CAKEPANZ-SHELL-review-cakepanz-4.md`, VERDICT ok, labelled verification not an independent third review). Five green-class reviews are on record (Beam ok / Ernie re-pin-landed / VL merge-ready-behind-P-317 / inkling ok / MUSE ok-labelled). Owner informed in the 19:36-Z sitting; **his GLM prompt only needs the P-347–P-353 queue-id line fixed** if not already sent.
- **Muse 4b1acbcb is the live muse tip** (cakepanz-4 ok-verified + v2 re-pin prompt merged at `80e53fd0`).
- **Engine tip `65673a00`** (pass-class GLM child of `5c808472`; flex 0 diff; pools packs byte-identical — do not claim otherwise). Re-pin question for the shell to `65673a00` = **Owner's call** (this prompt round flagged it; nothing moved by me).

## What the next session needs
1. `git fetch -q origin; git log --oneline -1; git status --short` + `node tools/preserve.mjs check`.
2. If the GLM round closes: Glyph/others may have filed third verifications — read fresh, do not re-read this file's history.
3. **Standing:** shell of record (this lineage re-pinned is the only tree with all four batteries green); palette gold2/dark `--text` rulings; Engine Value vs Model Value; FEED_YEAR 2027; S25b 430-vs-560 (the S25b law stands, the queue row is stale); .ub; shimmer/touchdown law sources; Option B DIME trio re-rule; the default-off GLM ruling; the re-pin past 5c808472 (through 65673a00) is the Owner's.
4. **Do NOT re-litigate:** cap ruling, pin facts, 99-rule flex, D1/D2, and the six planted fault receipts (they die, fresh on my machine).

## Where this worktree is
Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e` · HEAD = pushed tip (`ls-remote` verified = `0cd1508e24552302e19de6568c7a323fc576654c`).

## Transition discipline
Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
