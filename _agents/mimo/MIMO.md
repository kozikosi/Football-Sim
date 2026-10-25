# MIMO — lane file

## Identity
- **Seat:** MiMo (`mimo`) · **Model / how reached:** MiMo-V2.6-Flash-Free via OpenCode · **State:** **probation (reinstated)** — `_agents/README.md` row 23: `| MiMo | probation (reinstated) | mimo/ (to create) | |`. Not in `_agents/RETIRED.txt`.
- **ID block:** none (no submission ids filed) · **First seen:** 2026-10-22
- **Strengths shown so far (evidence, not claims):** independent re-measurement that corrected three premises in the A2b colour brief (`_agents/mimo/notes/A2b-colour-provenance.md`); independent dataset hash (`notes/DATASET-HASH-CROSSCHECK.md`); toolchain + pool-impact audits.
- **Worktree:** `/Users/kosi/Desktop/wt/mimo` · **Branch:** `council/mimo` · **merge-base HEAD origin/council/base:** `f4527a260f11aa805fceefdc7c6602739c3fefb7`

## Worktree repair — done this session (the thing the next session must know first)
`wt/mimo` had a **broken registration**: its `.git` file pointed at `Football Sim/.git/worktrees/mimo`, and that admin dir **did not exist**, so every git command in the worktree failed with `not a git repository`. `git worktree repair` also failed (`unable to locate repository`).

Fixed by recreating only what git itself writes — `.git/worktrees/mimo/{commondir→../.., gitdir→/Users/kosi/Desktop/wt/mimo/.git, HEAD→ref: refs/heads/council/mimo}` — then `git read-tree HEAD`.

**Why `read-tree` mattered:** with no index git reported **283 staged deletions** (`D ` for every tracked file); committing at that point would have destroyed the tree. After `read-tree`, status fell to 1 stray file. `read-tree` touches only the index — never working files, never history.

## Current work
- **Claimed / in progress:** none open. Session is at END-OF-CHAT.
- **Done this session (with proof):**
  - Worktree repair + index restore — `git status --short` → 1 line, then 0 after cleanup. VERIFIED.
  - **Lane recovered** from preserve commit `27bac0ec` into `_agents/mimo/` (13 files) via `git archive | tar -x` — **SHARED was read only, never modified.** VERIFIED.
  - **Dataset hash (P6):** `node _agents/mimo/tools/hash-dataset.mjs` → 1,200 rows, 11 fields each, 32 teams, `xf==true` **49**. `notes/DATASET-HASH-CROSSCHECK.md`. VERIFIED.
  - **Step 3a copy-band re-anchor vs Pre-Colors** (done pre-migration): all five banned strings byte-identical to `044d1759…`; em dash **201 = 201**; the 201→212 delta exists only in the candidates. VERIFIED.
  - **A2b colour provenance:** 96 slots cite only **2 blanket URLs**, **0/96** name a team; statuses **62 `reference_unverified` + 34 `reference_conflict`**; GPT↔Gemini **secondary 6 disagree / full palette 24**; `figma/team-colours.json` matches the recon GPT column on **30/32**. VERIFIED. Corrections to three premises in the brief are in the note.
  - **Q4 poll:** voted **`structured`** (machine-compilable counts; markdown tables drift).
- **Blocked / waiting on:** nothing. MOC's canonical PLAYERS hash is the only input I'm waiting for.

## What the next session needs
- **Read first:** (1) `notes/DATASET-HASH-CROSSCHECK.md` — carries the control hash; (2) `notes/A2b-colour-provenance.md` — carries the three corrected premises; (3) `bulletin/20261025-0300-mimo.md` — the FACT lines.
- **Open questions:**
  1. **MOC's canonical PLAYERS hash** — compare to `e9030c9e…`; verdict **UNKNOWN** until received. On mismatch, bisect format first (trailing `\n`, `\r\n`, raw-slice vs re-serialized, `71.0`, `TEAM_DATA` key order) — a format difference is not a data change; require `JSON.parse` equality before anyone claims the rows moved.
  2. **`core.hooksPath`** — set repo-wide (`file:…/.git/config → tools/hooks`). **I never set it**, so the Owner's "unset it now" condition is false for me; and `tools/hooks/pre-commit` (150 B) now **exists** on this branch, so unsetting would disable a hook the bundle ships on purpose. Left as-is and flagged rather than mutating config every seat shares. Needs one word from the Owner/Architect.
  3. The old per-seat `session.send` fan-out vs the open-queue rule ("no assignment to a named seat") was never answered — still open.
- **Do not redo:** the copy-band counts, the A2b provenance counts, the pool/weight audits (`notes/FB-P-*`), `TOOLCHAIN-CHECK.md`, `V22-AESTHETICS-TRIAGE.md` — receipts are in the notes. Do not re-derive `40233d6b…`; it is pinned.

## Files in this lane
- `_agents/mimo/MIMO.md` — this file
- `_agents/mimo/notes/DATASET-HASH-CROSSCHECK.md` — control hash, verdict pending MOC
- `_agents/mimo/notes/A2b-colour-provenance.md` + `A2b-colour-provenance-table.md` — 32-team source table
- `_agents/mimo/notes/FB-P-POOL-IMPACT.md`, `FB-P-28ROUND-IMPACT.md` — pool/kicking/backfield maths
- `_agents/mimo/notes/TOOLCHAIN-CHECK.md` — biome/mermaid/figma availability
- `_agents/mimo/notes/V22-AESTHETICS-TRIAGE.md` — 13 P7 headings triaged
- `_agents/mimo/notes/SOCCER-CUTOFF-DECISION.md`, `owner-soccer-ranking-options.md` — soccer cutoff work
- `_agents/mimo/notes/nba-draft-rotation-comparison.md`, `nba-draft-rotation-receipts.md`, `nba-pick-economy-m1.md` — NBA work
- `_agents/mimo/notes/quarantine-execution.md` — VLOC quarantine receipt
- `_agents/mimo/tools/hash-dataset.mjs` — the independent hash implementation
