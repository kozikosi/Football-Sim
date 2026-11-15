# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat; may disappear at any moment without notice. If a task here contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol (run in order; nothing else first)

1. `git fetch -q origin; git log --oneline -1; git status --short`
2. Read this file. Everything in it is permanent; if anything else in this lane claims currency, verify against git before trusting it.
3. **The live rules live on `origin/council/muse`** (AGENTS.md carried the Owner's 2026-11-15 rulings verbatim; R-1…R-13). This worktree's copy predates those rulings — never quote it as current.
4. `node tools/preserve.mjs check` — expect only the standing local-only items (gh-pages `7c9694e9` w89-as-live, owned by the shared tree; dirty worktrees q/vl/vloc/ds/pickl/flint/GH/glm/architect-colors — NOT yours to touch).
5. If your task came with its own file list (the Owner, a prompt), that list **replaces** steps 2–3.

New chat recovery depends on branch `council/inkling` alone — not on this chat existing.

## Permanent seat rules

- Byte-check everything, a lot more (Owner, standing from 2026-11-13): every VERIFIED needs directory · exact command · ref/sha of the bytes · output neighborhood (exit code, counts, hashes). Archive beats the tree (`git archive <ref> | tar -x -C $SCRATCH`); state the ref — "at tip" is never a fact. Independent re-run is the only confirmation. No speculating past a blocker — mark it OPEN.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; it does not build the engine, the product, or the repo's rulings.
- No new P-IDs without the Owner; no frameworks, no pins, no verdicts beyond what was rulable. Dissent in writing, inside the filing.

## Current state (2026-11-15, session end @ e1312f87; branch council/inkling pushed)

- **P-345 round 2 (testing + innovation) FILED @ `e1312f87`** — `inbox/20261115-1240-inkling-testing-innovation.md`. Runs: **A2** (Route C multi-page FAILS both arms — missing shared boot chunk; single-input PASSES both — 334.94 kB/136.85 gz Vue, 307.31 kB/126.97 gz Svelte, vanilla file://, 0 errors, 390 px); **A4** (pmath bit-for-bit PASS at tip, manual gate); **A5** (pool 1,953→1,921 = 32 LS one/team + 12 FAs — intended filter, ledger CLOSED); **A6** (fork semantics VERIFIED; filed idea dies at first step — board-awareness total; surviving question = static team traits); **A1** (committed four-slice dists boot under NO file:// protocol — `ERR_FILE_NOT_FOUND`×3 with the flag too; MUSE boot artifact unidentifiable; n=6 paired singlefile replication svelte 4/6 vs vue 2/6 — noise-adjacent; FCP ill-defined on single-paint artefacts). A3 not run (no λ estimator in tree).
- **Round 1 filings standing:** P-345 Rev-4 direction-innovation @ `fc25004f` (corrected @ `16c72349`: **live = w89** — tip `3e69567c`); Ernie offline/compare reviews @ `1510`/`1535` (both ok, re-probed all routes); the framework lean stays **Vue, narrow, maintenance economics**; the decide measurement = within-agent cold-task sitting on slice 5; GLM's commission-declined in favour of passenger-with-one-escalation; settle rule adopted (GLM skeleton + majority-of-pairs N≥3 + pre-registration; lines-as-gate killed after verifying the sign-flip).
- **Ernie's authoring arm** (empty-shell regime): Svelte wins every measurable axis at card scale — REPORTED as scale-dependent, not decisive; four-slice scale flips line counts to Vue.
- **GLM DIALS panel** picked as first platform surface (zero engine work, tightest falsifier, doubles as forms stress-test); Glyph Sim Lab v2 (holds Cardboard Ringers probe); slice-5 cards = Glyph contract + Inkling state machine + GLM expanded face.
- **Owner rulings outstanding:** vanilla file:// y/n · build-config fix owner + tree · Route C vs B confirm · framework pick · improvable strike · (7c9694e9 ruled moot by Owner's gh-pages reset; live = w89).

## What the next session needs

1. Read the Owner's rulings (all six pending items are in F. of the round-2 filing + the lane above); the MUSE boot-artifact question precedes any boot re-measurement.
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261115-1240-inkling-testing-innovation.md` (round 2) alongside `inbox/20261115-1154-inkling-direction-innovation.md` (round 1) before writing anything framework-shaped.
3. Never re-measure: pool 1,953/1,921 (CLOSED) · suite 351/0 @ `9acf1992` · λ window · flex 99 rules · w89 live · pin `d3bd81d2`.
4. If slice 5 greenlights: arms at `z open wave v3/arms/arm-{vue,svelte}/`; Vue FIRST; cold-task telemetry piggybacked per the settle rule — do NOT commission a standalone benchmark.
5. The P0 review chain (P-158…P-165) remains the always-available next work.
- **"Done" (Q5):** agree with Ernie + four-line receipt discipline + unexplained-numbers receipt + three states GREEN/OWNER-PENDING/RED + **re-pin expiry clause** ("done is a state, not a certificate"); un-calls Slice 3 (VERIFIED) and any Colors-fully-functioning claim (no app). **"Improvable" (Q6):** Ernie's three paths + a fourth "refusal path" (failures unreachable) + sixth "learns when used" (Ernie's own state-survives test is its checker); Guide = not improvable, agreed; 30-second user test as the gate for "visible without being told."
- **Q7: premise stale.** De-gated tests already rewritten as structural in `5a3bb75e` (13 Nov); versions engine stamp REPORTED/MOVED-UNMOVED, data stamp gated; lineup gap REPORTED (2700), structure gated. Suite 351/0 VERIFIED at tip. General rule filed: "law is re-pinned with approval; measurement is reported, never pinned."
- **Cross-gate:** Owner owes 3 rulings — vanilla file:// requirement y/n; owner + tree for the vite build-config fix; disposition of local-only gh-pages commit `7c9694e9` ("Publish w89 as live index") vs R-10 (live = w85). `preserve.mjs check` flags it; not mine to touch.
- **Prior filings this wave:** 20261115-1130 direction-brainstorm (c85a9e8c-ish), Z.ai vendor + receipt-chain reviews (ok/improved), four-slice sitting review (slope FLAT, R=0.9778).
- Prompts relayed to seats on 2026-11-15 (MUSE's v3 direction prompts; Z.ai's slice-5 prompt): awaiting Owner relay confirmations.
- **w88 Wins table question OPEN** — inherit at old pin; INKLING recommends re-derive at re-pin commit. **Owner pin re-point ruling still PENDING** (`d3bd81d2` vs `9acf1992`). **Framework ruling open** (R-13 two arms; Claude Vue-LOW; Owner wants council agreement if Architect's call differs from his; MUSE leans Vue narrowly).

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `e1312f87` (verify with `git rev-parse HEAD`).

## What the next session needs

1. Read the Owner's state first: the pending rulings ((a) vanilla file:// requirement y/n — gates Slice 3 and the meaning of every boot number; (b) who owns the vite build-config fix + which tree; framework ruling; (c) housekeeping on the redundant local `7c9694e9` gh-pages commit — w89 is live, nothing to push).
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261115-1154-inkling-direction-innovation.md` (Rev-4 answer; carries the w89 correction block) and the two Ernie reviews before touching anything framework-shaped.
3. Never re-measure: pool 1,953 · λ window [0.3902, 0.4032) · flex 99 rules / QB→FS 12 · pin-migration 1/32 · suite 351/0 at `9acf1992` (re-run only at a re-pin, on a fresh archive) · live = w89. The AGENTS.md snapshot in this worktree is kept fresh by the Step-0 refresh (this session's is commit `46f2e990`).
4. If Slice 5 greenlights **here**: arms live at `z open wave v3/arms/arm-{vue,svelte}/`; Vue FIRST per the relayed prompt; keep timing discipline; every receipt 4 lines (dir · cmd · ref · output). The cold-task sitting (novel micro-task, tool-call telemetry, order randomised per slice, fidelity pinned) is the authoring measurement that decides — run it only as a passenger on slice 5, never commissioned standalone.
5. The P0 review chain (P-158, P-160, P-162…P-165) is ready to be taken from the top at any time; nothing else pending.

## Transition discipline (why this file is short)

Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
