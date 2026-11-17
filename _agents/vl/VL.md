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
- **Delivered all four parts of the new council prompt (P-333, P-375, P-373, P-374), committed and pushed:**
  - `inbox/20261117-0237-vl-P-333-gap-condition-real-data.md` (FOR: P-333, Part 1) — VERIFIED at engine tip b584d73, no cap, real rosters (1,953 players). DT2 OVR = 2nd-highest DT OVR per team; LB quality = mean of top 2 LB OVR; adv = value(4-3) - value(3-4), negative = better in 3-4. Per-team table: mean adv +1170.74, split 6 favor 3-4 / 25 favor 4-3 / 1 tie. Check teams reproduce direction: Washington (DT2=76, adv=-652.4), KC (DT2=75, adv=-181.4), Carolina (DT2=74, adv=-2.0) all favor 3-4. Pattern: corr(DT2 OVR, adv) = +0.671 (worse DT2 -> more 3-4, HOLDS); corr(LB quality, adv) = -0.137 (HOLDS weakly). Counter-example: Miami (DT2=75, LBq=83.5, adv=+852.5, favors 4-3). Verdict: PARTIAL.
  - `inbox/20261117-0237-vl-P-375-keyedrng-twin-review.md` (FOR: P-375, Part 2) — VERIFIED at b584d73. Python checker exit 0: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6 all match; normal() 106/120 bit-identical, worst rel diff 2.08e-16 (reported, not required). pmath.ts: no cosine. keyedrng.py: native 64-bit int multiply (independent from TS 16-bit limbs). Check chain: real (TS emitter -> vectors.json -> Python checker -> JS guard test). Full engine suite: 379 tests, 378 pass, 1 documented normal() failure. MUSE's "379/379" and "108/120 normal" CONTESTED (I measured 378/379, 106/120).
  - `inbox/20261117-0237-vl-P-373-parts-16-17.md` (FOR: P-373, Part 3) — Part 16 (specs) MISSING as independent coverage (MUSE draft only). Part 17 (label hygiene) MISSING as independent finding (MUSE draft covers 8 Inkling + 4 Ernie FOR: P-345 -> R-13 mislabels). VL VERIFIED R-13 not in live QUEUE.md table.
  - `inbox/20261117-0237-vl-P-374-d6-review.md` (FOR: P-374, Part 3) — Ernie D6 CONFIRMED in substance: FEED_YEAR=2027 at feedVM.ts:20, used at lines 77 (buildSchedule year), 108 (default year), 154 (feedVM call); it DOES drive the demo schedule year; comment "drives nothing" is incorrect. Line numbers (:37, :91) wrong. Not a defect.
  - `inbox/20261117-0237-vl-P-333-innovation-ideas.md` (FOR: P-333, Part 4) — Part 4A: paired within-team gap-condition test (degrade DT2 to OVR 60 per team, regress delta on LB quality). Part 4B: workflow/future ideas (name shell of record, green-suite-before-seam, run battery fresh, basketball readiness via sport-tagged save envelope, cutover as gate, propose-first gate unruled, seam-checkers ready but inventory missing, box-score mutations are engine's test-only fix).
- Earlier this session (also pushed): 67-cakepanz-2 delivery review (a2c5a5a6 lineage), P-333 MUSE flex-math verification (3b3a1cd6), P-333 correction (43a54c5d), P-333 gap-condition real-data (ff39440c), P-375 keyedrng twin (b611724e), P-373/P-374 (a2c5a5a6), Part 4 innovation (1f80d786).

## Next session
- `node tools/council.mjs next` (live queue on origin/council/muse) and take the next top item VL can do; skip P-042/P-043 (stale).
- P-333: KG decides on the gap condition — the per-team measurement shows it holds in direction (corr +0.671) but is not universal (Miami counter-example). No implementation unless KG asks.
- Review inbox files from other seats when they land; three seats confirming = REVIEWED.

## Open questions (updated)
- R-13 (framework comparison) does not appear in the live QUEUE.md table — UNKNOWN whether the ID exists or was retired; used FOR: R-13 per the v4-2 filing instruction, flagged to the queue custodian.
- The s5 README's "snapshot bug" claim (DESTain corruption in draftBoard.ts at 4ca9a071) does not hold at 4ca9a071 (file is clean; no stand-in boardVM.ts) — README claim stale or predates the pin; correction is Z.ai's.
- P-333 Part B: real-roster bias (28 teams better in 4-3, mean +1144) is Ernie's REPORTED finding; not reproducible here (no roster dataset). Re-measurement needs Ernie's data or the Architect's roster fixture.
- The shell of record is unnamed: three trees diverge (gh-pages d3bd81d2 slices 1-2; rev2 4ca9a071 slices 1-4; s5 4ca9a071 slices 1-5). Owner/Architect decision needed (MUSE's review-synthesis identifies this as the root cause of non-commensurable measurements).

## Live files / receipts
- All 7 inbox files + 1 bulletin entry above — committed and pushed on origin/council/vl this session (hash given at push time).
- Prior: `inbox/20261115-1332-vl-OP-add-fresh-start-vue-vs-svelte-expe.md` (9d202b52), `inbox/20261115-1340-vl-S-2016-vue-svelte-design-review.md` (9d202b52), `_agents/vl/deliveries/zai-pass-through/zai-sitting-2026-11-15-authoring/` (d3df02c3, 359 files), `inbox/20261115-1410-vl-S-2016-review-authoring-sitting.md` (a2482727, tip).
- `_agents/vl/deliveries/67-cakepanz-s5/` — the reviewed s5 delivery (committed on council/vl); engine snapshot at 4ca9a071.
- `_agents/vl/deliveries/zai-pass-through/67-cakepanz-2/` — Z.ai's "complete shell" delivery (234 files, dist excluded), pushed this session on the user's request; engine snapshot VERIFIED at d3bd81d2 (re-pinned from 4ca9a071 — all 4 differing engine files match d3bd81d2, not 4ca9a071); carries MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md, SNAPSHOT.md, VERIFY.txt, CHECKSUMS.txt, MANIFEST.txt. Reviewed below.
- `_agents/vl/deliveries/zai-pass-through/67-cakepanz-3/` — Z.ai's cakepanz 3 complete shell (286 files, dist excluded), pushed this session on the user's request (de204d6d) and reviewed (956f4489); engine snapshot VERIFIED at d3bd81d2 (57/57 files byte-match); single-door seam VERIFIED (no engine imports outside src/engine + src/lib/port); engine tests 323/323, node battery 23/23, slice battery 26/0/10/3, shell render battery 46/0, gates PASS, falsifiers all died (Z.ai's receipts, read in full). Open Owner questions flagged (light gold2 1.51:1 FAIL, dark --text 3.17:1 FAIL normal, awards content, Model Value vs Engine Value label, 3-4 note, never-print-Touchdown law); open Architect items (P-317 store slot support, OT clock(), gravity/double-teams, awards grades, parameter property). Review filing: `inbox/20261117-0320-vl-cakepanz-3-review.md`.

## Pending
- Pre-existing untracked build artifacts under `_agents/vl/deliveries/zai-pass-through/` (`.vinxi/`, `.svelte-kit/`, `dist/`, `build/`) intentionally left uncommitted per §4.5 add-by-path — not VL's work product.
- `.council_tool.mjs` untracked in this worktree — deleted before push, never committed.
- Other seats' unsaved work shown by `preserve.mjs check` (ds, boc, dsd, flint, GH, glm, or, q, vloc) — not VL's to touch.
