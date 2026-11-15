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

## Current state (2026-11-15, session end @ 16c72349; branch council/inkling pushed)

- **P-345 Revision-4 direction + innovation filing landed @ `fc25004f`** — `inbox/20261115-1154-inkling-direction-innovation.md`; corrected in `16c72349` (**live site is w89, not w85** — `origin/gh-pages` tip `3e69567c`, three verifications; R-10 stale; `7c9694e9` is a redundant local duplicate). Two P-345 filings today; 1154 answers Q1–Q8 of Revision 4 and supersedes the 1130 brainstorm on every overlapping point.
- **Review chain worked this sitting:** filed `…-1510-…REVIEW-ernie-offline-file.md` and `…-1535-…REVIEW-ernie-compare-cards.md` — **both verdict ok**, every claim re-run: Route B (IIFE+classic, 98 ms) and Route C (singlefile, one 40,545 B file — byte-match with his receipt) both BOOT from **vanilla file://**; strip-crossorigin-alone does NOT unblock the module script; Svelte-at-card-scale bundle win reproduces (+12,656 B gz for Vue; gzip −37 B machine delta); lines 103/113; both builds exit 0 with hashes identical to his receipts; his CHECKSUMS hold on clean re-extract (my own first extraction truncated one PNG — my flaw, not his). Mount 5×: direction (Svelte faster) holds on this machine, magnitude compressed (34/44 med; machine class differs from his 51/71).
- **Framework lean on file: Vue 3 + Vite, NARROW, on maintenance economics** — but with Ernie's counterbalanced arm on the table (Svelte leaner at 6-card scale, one fewer config step, no tsconfig needed): the scale flips line counts (Vue leaner at four slices), the boot is engine-dominated (MUSE boot, REPORTED — receipt provisional per Beam/Ernie/OR), and authoring is decided only by the **cold-task sitting** (see Q3). Do not quote one sitting either way to the Owner.
- **"Done" (Q5):** agree with Ernie + four-line receipt discipline + unexplained-numbers receipt + three states GREEN/OWNER-PENDING/RED + **re-pin expiry clause** ("done is a state, not a certificate"); un-calls Slice 3 (VERIFIED) and any Colors-fully-functioning claim (no app). **"Improvable" (Q6):** Ernie's three paths + a fourth "refusal path" (failures unreachable) + sixth "learns when used" (Ernie's own state-survives test is its checker); Guide = not improvable, agreed; 30-second user test as the gate for "visible without being told."
- **Q7: premise stale.** De-gated tests already rewritten as structural in `5a3bb75e` (13 Nov); versions engine stamp REPORTED/MOVED-UNMOVED, data stamp gated; lineup gap REPORTED (2700), structure gated. Suite 351/0 VERIFIED at tip. General rule filed: "law is re-pinned with approval; measurement is reported, never pinned."
- **Cross-gate:** Owner owes 3 rulings — vanilla file:// requirement y/n; owner + tree for the vite build-config fix; disposition of local-only gh-pages commit `7c9694e9` ("Publish w89 as live index") vs R-10 (live = w85). `preserve.mjs check` flags it; not mine to touch.
- **Prior filings this wave:** 20261115-1130 direction-brainstorm (c85a9e8c-ish), Z.ai vendor + receipt-chain reviews (ok/improved), four-slice sitting review (slope FLAT, R=0.9778).
- Prompts relayed to seats on 2026-11-15 (MUSE's v3 direction prompts; Z.ai's slice-5 prompt): awaiting Owner relay confirmations.
- **w88 Wins table question OPEN** — inherit at old pin; INKLING recommends re-derive at re-pin commit. **Owner pin re-point ruling still PENDING** (`d3bd81d2` vs `9acf1992`). **Framework ruling open** (R-13 two arms; Claude Vue-LOW; Owner wants council agreement if Architect's call differs from his; MUSE leans Vue narrowly).

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `16c72349` (verify with `git rev-parse HEAD`).

## What the next session needs

1. Read the Owner's state first: the pending rulings ((a) vanilla file:// requirement y/n — gates Slice 3 and the meaning of every boot number; (b) who owns the vite build-config fix + which tree; framework ruling; (c) housekeeping on the redundant local `7c9694e9` gh-pages commit — w89 is live, nothing to push).
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261115-1154-inkling-direction-innovation.md` (Rev-4 answer; carries the w89 correction block) and the two Ernie reviews before touching anything framework-shaped.
3. Never re-measure: pool 1,953 · λ window [0.3902, 0.4032) · flex 99 rules / QB→FS 12 · pin-migration 1/32 · suite 351/0 at `9acf1992` (re-run only at a re-pin, on a fresh archive) · live = w89. The AGENTS.md snapshot in this worktree is kept fresh by the Step-0 refresh (this session's is commit `46f2e990`).
4. If Slice 5 greenlights **here**: arms live at `z open wave v3/arms/arm-{vue,svelte}/`; Vue FIRST per the relayed prompt; keep timing discipline; every receipt 4 lines (dir · cmd · ref · output). The cold-task sitting (novel micro-task, tool-call telemetry, order randomised per slice, fidelity pinned) is the authoring measurement that decides — run it only as a passenger on slice 5, never commissioned standalone.
5. The P0 review chain (P-158, P-160, P-162…P-165) is ready to be taken from the top at any time; nothing else pending.

## Transition discipline (why this file is short)

Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
