# GLM — lane file (rewritten 2026-11-15, end of session)

## Identity
- **Seat:** GLM · branch `council/glm` · worktree `/Users/kosi/Desktop/wt/glm` (verify with `pwd; git branch --show-current` on entry).
- **Merge-base HEAD vs origin/council/base:** `474eb52` (the shared root — every seat branch descends from it; the live docs/queue are on `origin/council/muse`, not base).
- Governance docs synced from `origin/council/muse` at session start (commit `e5c7cd56` carries AGENTS.md R-2/R-9/R-13/R-12 + engine pin `d3bd81d2`).

## Current work and state
- **DONE this session:** the P-345 direction+innovation filing, pushed at `033566dd`:
  `inbox/20261115-1154-glm-direction-innovation.md` — assesses Ernie's f3551218 answers (done / improvable / design attack / structural assertions), answers Q1–Q8.
- **Key verified receipts filed (others may rely on them):**
  - Both de-gated tests are ALREADY the structural rewrite on `architect/engine-and-seats` (FETCH_HEAD 2026-11-15): `versions.test.ts` 7/7 (engine stamp REPORTed MOVED/UNMOVED, shape `^nfl1\.[0-9a-f]{14}$` gated, data stamp gates), `lineup.test.ts` 34/34 (mechanism gates: 3 flexes all at 6, TE3←FB 6, DT>FB free, gap>0; ties REPORTed). REPORTed gap is now 2773.04 (comment says 2700 — stale comment, REPORT working as designed).
  - Full engine suite on a `git archive FETCH_HEAD` scratch extract: **351/351 pass, 0 fail, 0 skipped** (node v26.13.0, `node --test --experimental-strip-types`, zero installed deps). R-11 done and exceeded.
  - Flex table re-check: WR>CB 6, WR>FS 6, WR>SS 6, DT>FB 0; 99 rules {0:23, 2:10, 6:43, 12:23}.
  - Colors `colors/src`: 0 `.svelte` files.
  - Pool files: 1,941 ratings + 12 free agents (team `Free Agent`) = 1,953 VERIFIED; 32 teams hold 55–68 rows each — NO team has 32 rows, so the board's 32-row render gap is not one whole team; strongest surviving signature is exactly one row per team (32 × 1). Free agents render-status UNKNOWN.
  - My lane raw pack re-verified: all four hashes in `_agents/glm/anchors/raw-hashes.txt` match the local `.gz` files.

## What the next session needs
- Read START-HERE from `origin/council/muse` first (worktree docs go stale).
- The next P-345 review chain step: two more seats reviewing my filing (or reviews of other seats' filings — no seat reviews the same item twice).
- If taking the boot replication: MUSE's harness exists; run the probe WITHOUT `--allow-file-access-from-files` (the vanilla file:// failure is real, both arms, MUSE-verified), and use paired interleaved trials (my Q4 contrarian: the protocol resolves signs, not 100 ms magnitudes).

## Open questions
- Owner: is vanilla `file://` required for Cakepanz, or only the final built product? (My recommendation, filed: required for everything shipped.)
- The 32-row pool render gap — Claude's pool ledger; my two first checks are in the filing (per-team drop-of-one; do the 12 Free Agent rows render?).

## Files in this lane (live)
- `GLM.md` (this file) · `_agents/glm/anchors/` (2024 anchor pack: hashes + derived JSONs committed; raw `.gz` untracked by design, hashes pinned) · `_agents/glm/deliveries/` (older: discrepancy register, flexrebuild report) · `_agents/glm/P-152-card-mockup.html` (the collapsed card state cited as Slice 5's collapsed state).
- Lane rule honored: no build copies, no images; keep under 300 KB.
