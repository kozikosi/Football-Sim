# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat; may disappear at any moment without notice. If a task here contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol (run in order; nothing else first)

1. `git fetch -q origin; git log --oneline -1; git status --short`
2. Read this file. Everything in it is permanent; if anything else in this lane claims currency, verify against git before trusting it.
3. **The live rules live on `origin/council/muse`** (AGENTS.md carried the Owner's 2026-11-15 rulings verbatim; R-1…R-13). This worktree's copy predates those rulings — never quote it as current.
4. `node tools/preserve.mjs check` — expect only the standing local-only items (gh-pages 7c9694e9 owned by the shared tree; dirty worktrees q/vl/vloc/ds/pickl/flint/GH/glm/architect-colors); anything unsaved in **this** worktree is yours to reconcile.
5. If your task came with its own file list (the Owner, a prompt), that list **replaces** steps 2–3.

New chat recovery depends on branch `council/inkling` alone — not on this chat existing.

## Permanent seat rules

- Byte-check everything, a lot more (Owner, standing from 2026-11-13): every VERIFIED needs four lines — directory · exact command · ref/sha of the bytes · output neighborhood (exit code, counts, hashes). Archive beats the tree (`git archive <ref> | tar -x -C $SCRATCH`); state the ref and sha — "at tip" is not a fact. Independent re-run is the only confirmation. No speculating past a blocker — mark it OPEN.
- Never edit governance (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/`), never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews and advises; INKLING does not build the engine, the product, or the repo's rulings.
- Dissent in writing, always, inside the filing; the Owner and the Architect decide; INKLING proposes, measures, verifies, organizes. No INKLING claim is true until INKLING re-ran it.
- No new P-IDs without the Owner; no frameworks, no pins, no verdicts beyond what was rulable.

## Current state (2026-11-15, session end)

- **Vendor + receipt chain reviews CLOSED** — Z.ai's save wave (`5b1d022e`, verdict **ok**, receipts all shipped); 2026-11-15 sitting (`f6470d36`, verdict **improved**; pin-migration table reproduced; ov-917 prose/receipt mismatch measured); four-slice sitting (`98aafc7b`, verdict **ok**; rebuilds clean; slope FLAT (R=0.9778), inside band; bundle 10,946 B gz favors Svelte narrowly). Pin/flex escalation surfaced: a 4ca9a071-vendored app/engine tree carries **REV 4** (`QB: { FS: 10 }`), 99-rule table governs live (`0a26d7c2…`, QB→FS 12); `colors/` untouched.
- **Prompts relayed for the Owner (v3, @ `02b6115e`):** `prompt-zai-agentic-ergonomics-2026-11-15.md` (Slice 5 two-arm build, both frameworks, z.ai logs same twelve metrics, vue FIRST, AUTHORING-COST.md + CATEGORY-WINNERS.md incl. weighting ask, second-agent protocol, full-arc S5 framing) and `prompt-council-direction-brainstorm-2026-11-15.md` (direction/innovation/definition-of-done/definition-of-improvable asks for DS/GLM/PICKLE). v1/v2 copies superseded; 2026-11-14 drafts committed for the record @ `3ba59d2c`.
- **P-345 answer filed @ `c85a9e8c`** — `inbox/20261115-1130-inkling-direction-brainstorm.md` (SPEAKER: INKLING). Key positions: Claude — one re-pin sitting (pin ruling + suite + w88 Wins answered together), then 1b, then Lab + R-11 structural asserts; striking self-verification passes (fresh-clone countersign instead). Z.ai — Slice 5 now; arms stay at parity until the ruling; next probe save→season round trip. Stop the three-seat review tax on settled items (delta-only countersign). Definition of done: base + per-mechanism module (fresh-clone battery with a red case; receipts; rollback line; scope line; save→refusal paths; sim→determinism+laws; UI→Owner look + 390 px). "Improvable" struck as gate; 3-clause bar; beauty routes to Owner via before/after screenshots. Innovations: (A) `slotsWinsConsistency` hook (gh-pages l.13182 re-derive vs engine), (B) cold-domain toy league ("CardBoard Ringers") two-arm paper proof; founder note = second-day re-entry cost is the unmeasured axis.
- **Slice 5 build NOT started** — INKLING began reading the arms (feedVM/appStore/savesService@arm, ratings.ts) after the Owner said "run it yourself if you can," then the Owner redirected to the council-prompt execution; the arms are untouched, nothing half-built. Resumable.
- **Owner pin re-point ruling still PENDING** (`d3bd81d2` vs `9acf199`). Framework ruling also open; R-13 two arms only; Claude's Vue-LOW recommendation on file; Owner wants council agreement if the Architect's call differs from his.
- **w88 Wins table question OPEN** — inherit at old pin; INKLING recommends re-derive at re-pin commit.
- **Owner relayed nothing yet** for the v3 prompts (Z.ai, DS/GLM/PICKLE) — awaiting relay; on relay, seller/second eyes per seat.
- MUSE is ACTIVE (this wave's prompts were MUSE's); INKLING remains transient; the Owner coordinates.

## Where this worktree is

Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e161fa10d0607c8e09330115ffa27f1ff` · HEAD `3ba59d2c` (verify with `git rev-parse HEAD`).

## What the next session needs

1. Read the Owner's state first: pin re-point ruling (d3bd81d2 vs 9acf199); framework ruling; whether he relayed the v3 prompts (and to whom); whether he answered the brag-card-skeleton borrow question (Z.ai's `receipts/brag-card.html` from ERNIE's v3 delivery — borrow and rebuild fresh, or strip the line from the Z.ai prompt at `02b6115e`).
2. `git fetch -q origin; git log --oneline -3; git status --short` — then read `inbox/20261115-1130-inkling-direction-brainstorm.md` (your own direction positions) before writing anything adjacent.
3. Re-verify before trusting claims about: `PROJECT-KNOWLEDGE.md` l.24 (stale — 97-rule/expected-105; MUSE's one-line fix pending), gh-pages Google Fonts (l.476–478) and `ZPB_SLOTS_WINS` (l.13182, accessor wired), `feed.ts` OT clock (l.59–60) — the four receipts are filed at the top of this session's P-345 entry.
4. If the Owner re-greenlights "run Slice 5 yourself": start at the arms `framework-two-arm/arm-{vue,svelte}/`, Vue FIRST per the relayed prompt; keep the timing discipline; record nothing by heart.
5. Do not re-measure: the pool (1,953), λ window (R-6), flex 99 rules / `0a26d7c2…` / QB→FS 12, pin-migration 1/32.

## Transition discipline (why this file is short)

Wave state lives in wave directories and is expected to die with the wave. Delete or archive the whole set in one commit when the Owner closes the wave, after harvesting anything worth keeping into the lane's pointers. Rewrite this file wholesale on seat-state change; never grow it.
