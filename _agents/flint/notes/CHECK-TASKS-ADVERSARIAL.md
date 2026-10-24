# CHECK-TASKS-ADVERSARIAL — Flint's adversarial run of `tools/check-tasks.mjs`

Date: 22 Oct 2026
Seat: Flint
Status: COMPLETE (fixtures + run + matrix + note)
Original implementation under test: `_agents/ds/tmp/p3/check-tasks.mjs` — **EXISTS** (original present, read-only for Flint).

## Command under test

```
node /Users/kosi/Desktop/Football Sim/_agents/flint/tools/check-tasks.mjs \
  <fixtures...>
```

## What the reference checker enforces (as tested)

1. Heading must carry a task id (`^P\d+-[A-Za-z0-9]+$`).
2. Ids unique within a file.
3. House form complete: WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK (substring match on lowercased text).
4. Protected-constant entry (`DEFAULT_WEIGHTS|FLEX|NATURAL_SLOT_MAP|PLAN_K|RATING_SPECS|MC`) must be flagged (`/protected|flag/i`).
5. Body-only ids (prose mention, not a heading) flagged.

During this adversarial round, one gap was closed in **Flint's** copy of the checker (my lane):
prefix-collision detection (`P0-26` vs `P0-26b` / `P0-26c` / `P0-26d`) added — previously treated as distinct ids.

## Fixture matrix (14 fixtures, `_agents/flint/fixtures/`)

| Fixture | Expected | Actual | Caught / Not caught | Why |
|---|---|---|---|---|
| f01-duplicate-id.md | caught | problems=1 | CAUGHT | duplicate id `P0-18` |
| f02-duplicate-different-body.md | caught | problems=1 | CAUGHT | duplicate id `P1-4` (diff bodies) |
| f03-appendix-only.md | caught | problems=1 | CAUGHT | appendix id `P0-99` body-only |
| f04-body-only.md | caught | problems=1 | CAUGHT | body id `P2-7`, heading `P2-8` |
| f05-prefix-collision.md | caught | problems=3 | CAUGHT | `P0-26` vs `P0-26b/c/d` prefix collision |
| f06-malformed-id.md | caught | problems=1 | CAUGHT | heading id `P0-1А` (Cyrillic) → no id |
| f07-heading-levels-same-id.md | caught | problems=1 | CAUGHT | same id `P3-1` at H3 and H2 → duplicate |
| f08-heading-no-id.md | caught | problems=1 | CAUGHT | heading `### Owner: heading with no id` → no id |
| f09-protected-unflagged.md | caught | problems=1 | CAUGHT | `DEFAULT_WEIGHTS` touched, unflagged |
| f10-malformed-house.md | caught | problems=1 | CAUGHT | house incomplete (missing HOW TO CHECK, claimed DONE) |
| f11-protected-flagged-clean.md | clean | problems=0 | CLEAN | flagged protected entry → no false positive |
| f12-empty.md | clean | problems=0 | CLEAN | empty file → no crash, clean |
| f13-one-heading-clean.md | clean | problems=0 | CLEAN | single well-formed entry → clean |
| f14-missing-where.md | caught | problems=1 | CAUGHT | house incomplete (missing WHERE) |

## Result

- Hostile fixtures: **11 / 11 caught** (caught = correct detection; not caught = failure of this round = 0).
- Clean fixtures: **3 / 3 clean** (no false positives; empty file handled).
- Checker exit: 1 on hostile set (as designed), 0 on clean set (as designed).
- `node --check` on the checker: clean.

## Caught / not caught (summary)

- CAUGHT: duplicate ids (same file, different bodies), appendix-only ids, body-only ids, prefix collisions, malformed ids (homoglyph), heading-level reuse of an id, headings without ids, protected-constant touches without flags, malformed house forms (missing HOW TO CHECK, missing WHERE), completion claims without HOW TO CHECK.
- NOT CAUGHT: **none** in this hostile set — the minimal contract held.

## Findings from the adversarial pass (design gaps surfaced)

1. **H1 document titles false-positive.** Fixtures originally carried `# Task Registry`; the checker flagged it as a heading without id. Real task docs (`tasks/T1-mobile-draft-board.md`) use `# T1 — …` H1 titles whose first token fails the `P\d+-…` RE. Either titles are exempt or the id scheme must accept `T<n>`.
2. **Protected regex is loose** (`MC` as substring) — incidental prose could trip it.
3. **House-form check is substring-based** — sufficient for missing-field detection, weak for "field present but placeholder" (`WHAT: x`).

## What this class of checker fundamentally cannot catch

- Semantic quality of WHERE/WHAT/WHY values (placeholders like `WHAT: x` pass).
- State-order, skipped states, verifier==implementer (outside this minimal contract).
- Redundant-but-unique ids (two genuinely distinct tasks may look identical).
- Deep sub-item / nested structure handling.
- The registry's own id-scheme migration (T-ids vs P-ids).

## Deliverable state

- Reference checker: `_agents/flint/tools/check-tasks.mjs` (my lane copy; original exists at `_agents/ds/tmp/p3/check-tasks.mjs`).
- Fixtures: `_agents/flint/fixtures/` (14 files).
- Note: this file at `_agents/flint/notes/CHECK-TASKS-ADVERSARIAL.md`.
- Next free M-number: see Flint's last bulletin tail.

## Report back (per dispatch)

- Note path: `_agents/flint/notes/CHECK-TASKS-ADVERSARIAL.md`
- Original exists: **yes** (`_agents/ds/tmp/p3/check-tasks.mjs`)
- Caught / not caught: **11 hostile caught / 0 missed**; clean fixtures 3/3 clean.
