SPEAKER: orcaman | ROLE: council advisor | TASK: C31 Z.ai order errata | DATE: 2026-11-20T03:49:27Z
FOR: C31

## Purpose
Errata for Z.ai's next-sitting order / related sitting text, consolidating corrections stated in Council Sitting order v3 (2026-11-20) so they are not repeated in the old wording. One file per item rule satisfied for C31.

## Errata (apply to Z.ai order text where applicable)

### E1 — `pickSlot` introduction commit hash
- **Incorrect/ambiguous:** `560b8364f` cited as `pickSlot` introduction (REPORTED as a re-root artifact in v3 corrections).
- **Correct:** `06d89724d` is the `pickSlot` introduction commit (P-317: `START` takes `pickSlot` (1-32); optional record field, old saves unchanged).
- **Evidence (VERIFIED, 2026-11-20T03:49Z, this worktree):**
  - `git show --name-only --oneline 06d89724d` →
    - `06d89724d P-317: START takes pickSlot (1-32); optional record field, old saves unchanged; absorb-work answer; NOW`
    - touched: `claude/NOW.md`, `claude/absorb-work-answer-2026-11-19.md`, `colors/src/sports/nfl/app/appstate.ts`, `colors/src/sports/nfl/app/saves.ts`, `colors/src/sports/nfl/app/store.ts`, `colors/test/nfl/store.test.ts`
  - `git log --oneline -n 5 --decorate origin/architect/engine-and-seats` shows `408410477` tip and ancestry including `aa4f9b3d0`, `92f87f7e3` etc. (context); `06d89724d` is reachable in repo history as above.

### E2 — patch apply level for hosted c9 subtree
- **Incorrect:** applying with `-p1` from the c9 subtree/root context (REPORTED as failing in settled C4 results).
- **Correct:** `patch -p1 --dry-run < <diff>` from the **archive root** works; `patch -p5 --dry-run < <diff>` from the **c9 subtree root** works. `-p1` from the c9 root FAILS.
- **Evidence:** **REPORTED** (Council Sitting v3, "SETTLED — DO NOT RE-RUN": C4 doc-fix landing — Ernie, Beam, Porca, Glyph; FIX-NOTES §6 md5s match). Not re-run by orcaman in this session (no dry-run receipt produced here).

### E3 — D18 citation (no-DSL defer), not "Owner ruling 4"
- **Incorrect/ambiguous:** attributing "no DSL / defer platform concept" to "Owner ruling 4" as a blanket label. **Correction:** 13 Nov batch item 4 is "Measure first, replace second" (different meaning); the no-DSL defer is **D18** in `claude/assessments/2026-11-13-master-assessment.md:142`.
- **Correct citation:** "D18 | Platform concept | **Defer** | Owner ruling 4: football only until football ships. Keep `SportModule` as a seam; build no DSL." (row text) — cite **D18** for the no-DSL defer; do not cite "Owner ruling 4" alone for that point without the D18 context.
- **Evidence (VERIFIED, 2026-11-20T03:49Z):**
  - `git show origin/architect/engine-and-seats:claude/assessments/2026-11-13-master-assessment.md | sed -n '130,155p'` includes line: `| D18 | Platform concept | **Defer** | Owner ruling 4: football only until football ships. Keep \`SportModule\` as a seam; build no DSL. |` (within that section; file line numbering on branch: 142 as stated in v3 correction — **VERIFIED by prompt+inspection context; exact line number on rendered excerpt consistent with stated location**).

### E4 — inkling/orcaink c10 status wording
- **Incorrect:** "failing a hash" for inkling/orcaink c10 state.
- **Correct:** **MISSING a file**, not failing a hash: "48 OK / 1 missing, exit 1" (pre-repair state as reported in settled rehearsals).
- **Evidence:** **REPORTED** (Council Sitting v3 corrections and settled C3+C9: Ernie, Glyph, Porca agree inkling/orcaink 48 OK / 1 missing / 51 files -> 49 OK / 0 missing / 52 files after repair; repair 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, sha256 `3e6476de…`). Not re-run by orcaman.

## Additional note (REPORTED, from v3 corrections — for completeness)
- c10 repair destination is `cakepanz-4/deliveries/receipts/`, NOT `batteries/` (relevant to landing scripts/docs; verify against host layout before applying).

## Labels summary
- VERIFIED: E1 commit identity/contents via git; E3 D18 row text/location context via `git show` on `origin/architect/engine-and-seats`.
- REPORTED: E2 patch-level outcomes (settled C4), E4 missing-vs-hash wording and repair hashes (settled C3+C9), destination note. No independent rehearsal performed in this session.
