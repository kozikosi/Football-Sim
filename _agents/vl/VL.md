# VL — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** VL · **Role:** Council Advisor · **State:** active (roster in `_agents/README.md` is the truth)
- **ID block:** S-2000–2099 · **First seen:** 2026-10-24
- **Worktree:** `/Users/kosi/Desktop/wt/vl` · **Branch:** `council/vl` · **merge-base HEAD origin/council/base:** `1b91f50e161fa10d0607c8e09330115ffa27f1ff`

## How this seat works
- Follow the council protocol (START-HERE, AGENTS.md, QUEUE.md via `node tools/council.mjs next`, fetched per START-OF-CHAT).
- Work comes from the ranked live queue on `origin/council/muse`; I take the top line I can do and skip stale items (e.g. P-042/P-043, not in the live table).
- I do **not** edit the product file, AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants, and I never force-push or `git stash` (WIP commit instead). I do not build another seat's shell/engine bytes (v4-2: "You assist; you do not build").
- **Owner direction:** if the Owner asks me to pass through a delivery so Muse/Claude can read it, I copy it into my lane, commit, push to `council/vl`, and give the hash.
- **Folder separation:** my own review work lives under `inbox/`; Z.ai pass-through deliveries pushed at the Owner's direction live under `deliveries/zai-pass-through/<item>/`, visually separate from VL's own work.

## Current session (2026-11-17, council/muse)
- Followed START-HERE from origin/council/muse exactly: `git fetch origin`, governance-doc refresh, `node tools/preserve.mjs check`.
- **Delivered all four parts of the new council prompt (P-333 ×2, P-375, CI-GATE), committed and pushed:**
  - `inbox/20261117-0403-vl-P-333-poolnode-check-can-fail.md` (FOR: P-333, Part 1) — VERIFIED at engine tip 5c808472. Baseline 394/394 pass. Planted two of Claude's five pools.ts faults, one at a time, restoring after each: Fault 1 (`>=`→`>` in min pool size): 6/10 poolnode tests fail; Fault 2 (40s→41s bucket): 4/10 poolnode tests fail. Both faults caught — the check can fail. "Pool nodes: the check can fail" test passes on clean tree. Table-hole divergence: NOT SAFE, needs a rule (428 hole states skipped across both packs; lab takes arbitrary pool at holes, product takes largest — no test coverage).
  - `inbox/20261117-0403-vl-P-375-cosine-bit-identical.md` (FOR: P-375, Part 2) — VERIFIED at b584d73 (re-confirmed at 5c808472). Python checker exit 0: keyedrng philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6 all match; normal() 120/120 bit for bit (this Node 26/macOS machine, where old code got 106/120). pmath_check.py exit 0: all pmath vectors bit for bit, worst error 1.87e-15. Full TS suite: 394/394 pass. tsc ratchet: 89 errors (pinned 89), unchanged. Machine: Darwin/macOS, Node v26.13.0, Python 3.15.
  - `inbox/20261117-0403-vl-CI-GATE-ci-gate.md` (FOR: CI-GATE, Part 3) — VERIFIED. Workflow `.github/workflows/ci.yml` at 5c808472: build step has NO continue-on-error (gate); type check and tests have continue-on-error: true (report-only). Last 3 CI runs (44010235789 @ 5c808472, 44006643913 @ db33bfa0, 44002436907 @ 7828d914): all success, build step success, statuses match. Gate mechanism confirmed real; failure path not observed live (no failing build run in last 3).
  - `inbox/20261117-0403-vl-P-333-recent-engine-work.md` (FOR: P-333, Part 4) — VERIFIED at 5c808472. Flex rules: 6 rules at 2 (EDGE→DT, ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS), SS→NICKEL at 0, counts 23@12/42@6/17@2/17@0 = 99. Pack: 2,990,032 bytes VERIFIED, zero table holes in 6,000 games VERIFIED, loader hash CONTESTED (0e78e4db382f9f dt_f / 1fe065713f326b dt_pf vs expected 0ff47e1de5e2db — hash is config-dependent, another seat reported same non-reproduction). Derived priorities VERIFIED (computed from spot values, not literals). OT clock "OT mm:ss" VERIFIED. FB→TE = 2 VERIFIED. DIME trio at 12 VERIFIED. Full suite 394/394.
- Also pushed this session: P-342 GLM passclass verification (ba071892) — second seat verification at engine tip 65673a00. Full suite 406/406 pass; tsc baseline 89/89; passclass test 12/12 (bit-for-bit Python lab conformance, loader guards, default-off guarantee, lambda seam, mutation tests all caught); glm-bar paired comparison reproduces exactly (sacks -1.7% z-3.0, drives -1.1% z-6.4, points +0.6% z1.9, class-pool holes 0); state-bucket decomposition (my own test): state-mix effect +0.0156 pts (negligible), per-state effect -0.1272 pts (ALL of the -0.1173 pts diff) — Architect's state-mix hypothesis REFUTED; held-out log loss and calibration REPORTED from Architect's report (cannot re-run Python lab — needs external parquet data). Verdict: GLM node verified as built; shift does NOT block making it the default.

## Next session
- `node tools/council.mjs next` (live queue on origin/council/muse) and take the next top item VL can do; skip P-042/P-043 (stale).
- P-333 flex hash: the loader hash `pack53:0ff47e1de5e2db` does not reproduce under either clock variant — flagged for the Owner/Architect.
- cakepanz-4: KG decides on the Owner questions (contrast, label, 3-4 note); Claude decides on P-317 store slot support, OT clock, parameter property, deviceId, gravity/double-teams, awards grades. VL's review filing stands (`inbox/20261117-0737-vl-cakepanz-4-review.md`).
- Review inbox files from other seats when they land; three seats confirming = REVIEWED.

## Open questions (updated)
- R-13 (framework comparison) does not appear in the live QUEUE.md table — UNKNOWN whether the ID exists or was retired; used FOR: R-13 per the v4-2 filing instruction, flagged to the queue custodian.
- The shell of record is unnamed: three trees diverge (gh-pages d3bd81d2 slices 1-2; rev2 4ca9a071 slices 1-4; s5 4ca9a071 slices 1-5). Owner/Architect decision needed.
- Pack loader hash `pack53:0ff47e1de5e2db` does not reproduce under dt_f or dt_pf — config-dependent; needs Owner/Architect clarification.

## Live files / receipts
- All inbox filings above — committed and pushed on origin/council/vl this session (hash given at push time).
- `_agents/vl/deliveries/zai-pass-through/67-cakepanz-4/` — Z.ai's cakepanz 4 complete shell (323 files, dist excluded), pushed this session (087018ba) and reviewed (1ba18b02); pin VERIFIED at 5c808472 (67/67 engine files byte-match); single-door seam VERIFIED (no engine imports outside src/engine + src/lib/port); engine tests 394/394, node battery 24/24, slice battery 29/0/10/3, shell render battery 46/0 (S1a-S30 whole season through the UI), gates PASS, falsifiers all died (Z.ai's receipts, read in full). Open Owner questions flagged (light gold2 1.51:1 FAIL, dark --text 3.17:1 FAIL normal, awards content, Model Value vs Engine Value label, 3-4 one-liner, P-364 wording); open Architect items (P-317 store slot support, OT clock(), parameter property still at 5c808472, deviceId?: string, gravity/double-teams, awards grades). Review filing: `inbox/20261117-0737-vl-cakepanz-4-review.md`.
- `_agents/vl/deliveries/zai-pass-through/67-cakepanz-2/` — Z.ai's cakepanz 2 complete shell (234 files, dist excluded), pushed a2c5a5a6.

## Pending
- Pre-existing untracked build artifacts under `_agents/vl/deliveries/zai-pass-through/` (`.vinxi/`, `.svelte-kit/`, `dist/`, `build/`) intentionally left uncommitted per §4.5 add-by-path — not VL's work product.
- Other seats' unsaved work shown by `preserve.mjs check` (ds, boc, dsd, flint, GH, glm, or, q, vloc) — not VL's to touch.