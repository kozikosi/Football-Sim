# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE is out; answers to the Owner alone; holds no standing rank over any seat; may disappear at any moment without notice. If a task here contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol (run in order; nothing else first)

1. `git fetch -q origin; git log --oneline -1; git status --short`
2. Read this file. Everything in it is permanent; if anything else in this lane claims currency, verify against git before trusting it.
3. **The live wave** is `_agents/inkling/prompts-2026-11-13/` for the closeout items — the Owner's "where we go next" direction (Z.ai + absent seats) is being relayed by him; treat this lane as reviewer-verifier unless told otherwise. Newest commit carries current truth.
4. `node tools/preserve.mjs check` — expect only the standing local-only items (`gh-pages` 7c9694e9; glm local-only `01b73dd8`; dirty vl/vloc); anything unsaved in **this** worktree is yours to reconcile.
5. If your task came with its own file list (the Owner, a prompt), that list **replaces** steps 2–3.

Delete `.council_tool.mjs` before any push. New chat recovery depends on branch `council/inkling` alone — not on this chat existing.

## Permanent seat rules

- Byte-check everything, a lot more (Owner, standing from 2026-11-13): every VERIFIED needs four lines — directory · exact command · ref/sha of the bytes · output neighborhood (exit code, counts, hashes). Archive beats the tree (`git archive <ref> | tar -x -C $SCRATCH`); state the ref and sha — "at tip" is not a fact. Independent re-run is the only confirmation. No speculating past a blocker — mark it OPEN.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews and advises; INKLING does not build the engine, the product, or the repo's rulings.
- Dissent in writing, always, inside the filing; the Owner and the Architect decide; INKLING proposes, measures, verifies, organizes. No INKLING claim is true until INKLING re-ran it.
- No new P-IDs without the Owner; no frameworks, no pins, no verdicts beyond what was rulable this wave (the framework call was the Owner's, deferred to his read of the council's table).

## Current state (2026-11-14, session end)

- **Vendor digest question FULLY CLOSED** (`288726df`): `432a1701…` = colors/ @ d3bd81d2 (112 files, root=colors/) · `753997bac4…` = src/ subset, root=colors/ (INKLING's rerun — my earlier "unreproducible" claim was wrong; ERNIE reproduced it first, I re-derived byte-exact) · `4c3c8f17…` = arm subset (root=engine dir, identical v1/v3/both frameworks) · `fef700c7…` = colors @ 4ca9a071 (ERNIE, 103 files, REPORTED not re-run by me) · `cd298e99` author-withdrawn. Ratification packet + review correction recorded (`288726df`).
- **`zai-recovery-2026-11-14/` published @ `e79e7693`** — closes the three missing-artifact defects from `z open wave v3/` (a3.json, vendor-digest/digest-chase, vite.file.config.mjs); review `inbox/20261114-0950-inkling-REVIEW-zai-recovery-2026-11-14.md`, verdict ok. "Errata all closed" is usable with the a3 boundary (chromium-only).
- **Claude plan v3 landed @ `0364013`** (engine plan; S1 = P-318 as `ValueProvider` seam, then S2 `core/pmath.ts`, portable math, context snapshot; TS port proceeds; no gates; Owner answered all six §7 asks YES). Claude's boot ran; `claude/NOW.md` rewritten (15 lines, honest).
- **BENCH-1 ratification packet** (`_agents/inkling/notes/2026-11-14-ratification-packet.md`): post-errata — W1/ENG-1/ENG-2/ENG-3/SAVE-1 record-size signable; UX-1/UX-2/UX-3 held (goneOdds engine-bound; UX-3 p95 ≈ 64.2–64.7 ms vs 50 ms spec); SAVE-1 write-median UNKNOWN; digest line updated post-correction; A3 chromium-only. Signing is the Owner's call.
- **Phase-1 football baseline answered** (`inbox/20261114-0835-…`, derived table @ `11b63867`); **`z open wave v3/` published @ `908fbdb8`** (review `20261114-0935`, improved); **other seats' closeout reviews** (`20261114-0854`); **four Z.ai/council prompts compared** (beam/ernie/glyph/inkling) — merged send advised; five defects identified pre-relay (glyph a3/digest staleness, ernie push-credentials wording, tip refs, beam unreproducible Q&A quotes, pool-gap framing). Details in the 2026-11-14 chat.
- MUSE still out. INKLING holds the Owner-facing organizing stream by delegation; on MUSE's return this lane reverts to reviewer-verifier without ceremony.

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · tip `288726df` (verify with `git rev-parse HEAD`).

## What the next session needs

1. Owner may relay a Z.ai prompt and absent-seat prompt (four drafts compared in this session; fix the five defects before relaying). If relayed, verify he sends ONE merged prompt per audience, not four.
2. Read `_agents/inkling/notes/2026-11-14-ratification-packet.md` before citing any budget row; UX-3 answer lives there — do not re-measure.
3. If the Owner asks about digests, the answer is the closed table in the lane state above; `git show origin/architect/engine-and-seats:claude/NOW.md` for the Architect's live state.

## Transition discipline (why this file is short)

Temporary state never lives in this file. Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
