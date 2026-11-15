# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat; may disappear at any moment without notice. If a task here contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol (run in order; nothing else first)

1. `git fetch -q origin; git log --oneline -1; git status --short`
2. Read this file. Everything in it is permanent; if anything else in this lane claims currency, verify against git before trusting it.
3. **The live rules live on `origin/council/muse`** (AGENTS.md carried the Owner's 2026-11-15 rulings verbatim; R-1…R-13). This worktree's copy predates those rulings — never quote it as current.
4. `node tools/preserve.mjs check` — expect only the standing local-only/dirty items elsewhere (gh-pages dirty in shared tree, q/vl/vloc/flint/glm/ds dirty — NOT yours to touch); your own worktree must be clean.
5. If your task came with its own file list (the Owner, a prompt), that list **replaces** steps 2–3.

## Permanent seat rules

- Byte-check everything (Owner, 2026-11-13): every VERIFIED needs directory · exact command · ref/sha · output neighbourhood (exit code, counts, hashes). Independent re-run is the only confirmation. No speculating past a blocker — mark it OPEN.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; it does not build the engine, the product, or the repo's rulings.
- No new P-IDs without the Owner; no frameworks, no pins, no verdicts beyond what was rulable. Dissent in writing, inside the filing.

## Current state (2026-11-15, session end @ `9ceeae99`; branch pushed)

- **Fresh-start Vue vs Svelte experiments — Rev 2 design review FILED** — `inbox/20261115-1330-inkling-P-345-fresh-start-experiments.md` @ `bbed5337`. Answers Q1–Q8. Calls: candidate 3 (time-to-green, ≥15%, ≥2/3 pairs, ±5% wash→Vue, pre-registered, labels swapped) stays PRIMARY + Ernie's condition (b) as pre-registered secondary gate (must be operationalised — paired-t tripwire on six normalized deltas); **VL's double-AND stays retracted** (pre-registration/tiebreak salvaged); **Beam's forced workarounds = pinned witness + maintenance tiebreak, not primary** (≥2 outside store seam, not ≥1 — disagreement preserved); Glyph's composite rejected; **E0 static audit may settle only E1, only unanimous ≥1.5×**; Cardboard Ringers as admission test (split failure classes); **w89 measurable** via token file + `--tc` team-swap sweep + palette assert; `verified-as-of.json` adopted with falsifiers; **E4 add "error messages actionable" + per-answer evidence pointers**; **Q1 swap: (a) → board→card cross-component store-seam slice**; receipts schema dogfoods the Sim Lab synthesis (`receipts/<slice>-<arm>.json` plain JSON).
- **P-345 labeling mismatch FLAGGED** (twice): live queue on `council/muse` carries P-345 = play-level innovation round; **no queue row exists for the framework-comparison work**; filings use `FOR: P-345` by prompt instruction; MUSE/Owner should give it a row or a retireable label.
- **Z.ai authoring sitting DELIVERY vendored + reviewed (Owner-requested)** — tree `_agents/inkling/deliveries/zai-sitting-2026-11-15-authoring/` @ `85a54b66` (359 files; CHECKSUMS verified 358/358; engine spot-checks 6/6 byte-MATCH vs `d3bd81d2`; chrome cmp CLEAN; no product HTML). **Review:** `inbox/20261115-1342-inkling-authoring-sitting-review.md` @ `9ceeae99` — **VERDICT improved**. D1: DECIDES row quotes four-slice 61/68 stores vs **shipped 83/98** (same direction). D2: unlabelled bundle numbers in winner table. D3: "2nd arm ≈9 min after instrumentation exists" qualifier lost in compression. D4: strike stale w85 frame. **D5: the 62% Vue verdict must NOT be ruled on now** — rests on one store row whose cost was counted, never timed; await week-stepper sitting + `measurements/PROTOCOL-FOR-A-SECOND-AGENT.md` run; reversible. **D6 (owed to Architect):** OT-clock defect VERIFIED at `feed.ts` l.59-60 (clamps OT to Q4, negative remainder — `filings/OT-clock-fix-PENDING.txt`); **vanilla `file://` boot FAILS in both arms** (vite crossorigin/null-origin — offline hard requirement), fix is vite-config level.
- **Tests re-run by me, PASS:** pool-ledger (1,953→1,921, 32 LS one/team), turnovers-named (16/16), banned-phrasings (0 hits).
- **Round-2 filing stands** (`f9882fca`): Split 1 → Spec-first Sim Lab v0 hard-constrained; Split 2 → the settle rule above.
- **Verified-as-of this series:** live = **w89** (page markers + `3e69567c` publish on gh-pages tip `66096fb1`) · **w89 = newest Cakepanz engine re-pin `d3bd81d2`** (99 flex, QB→FS 12; `66096fb1`, 18 files) · two new repos exist (vue `6b4de5c7`, svelte `86ba6325`) · two-arm bundles **11,569 B JS-only gz** (labeled) · suite 351/351 @ `9acf1992` = REPORTED, not re-run · λ band `[0.3902, 0.4032)` · λ estimator absent from tree.

## What the next session needs

1. Read the Owner's rulings if any (framework pick timing — the 62% verdict is D5-blocked; week-stepper go/no-go + second-agent protocol; OT-clock fix; vite `file://` fix; the P-345 label question for the framework-comparison work).
2. `git fetch -q origin; git log --oneline -3; git status --short` — state must match this file's header; then read `inbox/20261115-1342-inkling-authoring-sitting-review.md` and `inbox/20261115-1330-inkling-P-345-fresh-start-experiments.md` before anything framework-shaped.
3. Never re-measure (fresh evidence only at a re-pin, fresh archive): pool 1,953/1,921 · λ band · 99 flex rules · live = w89 · pin `d3bd81d2` · suite 351/0 @ `9acf1992`.
4. If the framework experiments run: arms at `kozikosi/football-sim-{vue,svelte}`; **Vue FIRST order randomisation per slice**; fidelity pinned to fixture BYTES; receipts per Q7 schema; do not average cross-agent runs.
5. The P0 review chain (P-158…P-165) remains always-available next work; the inbox holds the ranked filings — nothing assigned.

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `9ceeae99` (verify with `git rev-parse HEAD`).

## Transition discipline (why this file is short)

Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
