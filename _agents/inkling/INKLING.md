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

## Current state (2026-11-15, session end @ fc25004f; branch council/inkling pushed)

- **P-345 Revision-4 direction + innovation filing landed @ `fc25004f`** — `inbox/20261115-1154-inkling-direction-innovation.md`. Two P-345 filings exist today; the 1154 one answers Q1–Q8 of Revision 4 (the 1130 `direction-brainstorm` was filed pre-verification; 1154 supersedes it on every point they overlap). Built on four verifications: Colors suite **351/0** at `9acf1992` (fresh archive+ci+test); `vite build` fails on `/src/main.ts`; **vanilla file:// boot fails both arms** (Playwright/Chromium, CORS blank, `#app` children 0) while `dist-file` tent-test builds boot clean; flex.json matches Ernie's asserts exactly.
- **Framework lean on file: Vue 3 + Vite, NARROW, on maintenance economics** — the bundle input is dead after the boot replication + MUSE's boot numbers; tooling/devtools ecosystem + 61-line plain store idiom decide; Vue > Svelte by Z.ai's own maintain-question (q15). Flip condition on file: counterbalanced within-agent per-slice sitting shows Svelte ≥15% better on BOTH wall-clock and repair cycles → everything folds to Svelte. If the sitting ties, tooling still points Vue.
- **"Done" (Q5):** agree with Ernie + four-line receipt discipline + unexplained-numbers receipt + three states GREEN/OWNER-PENDING/RED + **re-pin expiry clause** ("done is a state, not a certificate"); un-calls Slice 3 (VERIFIED) and any Colors-fully-functioning claim (no app). **"Improvable" (Q6):** Ernie's three paths + a fourth "refusal path" (failures unreachable) + sixth "learns when used" (Ernie's own state-survives test is its checker); Guide = not improvable, agreed; 30-second user test as the gate for "visible without being told."
- **Q7: premise stale.** De-gated tests already rewritten as structural in `5a3bb75e` (13 Nov); versions engine stamp REPORTED/MOVED-UNMOVED, data stamp gated; lineup gap REPORTED (2700), structure gated. Suite 351/0 VERIFIED at tip. General rule filed: "law is re-pinned with approval; measurement is reported, never pinned."
- **Cross-gate:** Owner owes 3 rulings — vanilla file:// requirement y/n; owner + tree for the vite build-config fix; disposition of local-only gh-pages commit `7c9694e9` ("Publish w89 as live index") vs R-10 (live = w85). `preserve.mjs check` flags it; not mine to touch.
- **Prior filings this wave:** 20261115-1130 direction-brainstorm (c85a9e8c-ish), Z.ai vendor + receipt-chain reviews (ok/improved), four-slice sitting review (slope FLAT, R=0.9778).
- Prompts relayed to seats on 2026-11-15 (MUSE's v3 direction prompts; Z.ai's slice-5 prompt): awaiting Owner relay confirmations.
- **w88 Wins table question OPEN** — inherit at old pin; INKLING recommends re-derive at re-pin commit. **Owner pin re-point ruling still PENDING** (`d3bd81d2` vs `9acf1992`). **Framework ruling open** (R-13 two arms; Claude Vue-LOW; Owner wants council agreement if Architect's call differs from his; MUSE leans Vue narrowly).

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `fc25004f` (verify with `git rev-parse HEAD`).

## What the next session needs

1. Read the Owner's state first: the three pending rulings ((a) vanilla file:// yes/no — it decides Slice 3's fate and the boot-numbers meaning; (b) who owns the vite build-config fix + which tree; (c) `7c9694e9` push or clear); pin re-point; framework ruling; whether he relayed the v3 prompts (Z.ai, DS/GLM/PICKLE) and the slice-5 two-arm prompt.
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read BOTH P-345 filings (`20261115-1154` first) before writing anything adjacent.
3. Never re-measure: pool 1,953 · λ window [0.3902, 0.4032) · flex 99 rules / `0a26d7c2…` behavior / QB→FS 12 · pin-migration 1/32 (all ruled, all dead to re-litigate). The AGENTS.md snapshot in this worktree is kept fresh by the Step-0 refresh (this session's is commit `46f2e990`).
4. If Slice 5 greenlights **here**: arms live at `z open wave v3/arms/arm-{vue,svelte}/`; Vue FIRST per the relayed prompt; keep timing discipline; every receipt 4 lines (dir · cmd · ref · output).
5. Do not re-run the suite to "check" — it is VERIFIED 351/0 at 9acf1992; re-run only at a re-pin, and then on a fresh archive.

## Transition discipline (why this file is short)

Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
