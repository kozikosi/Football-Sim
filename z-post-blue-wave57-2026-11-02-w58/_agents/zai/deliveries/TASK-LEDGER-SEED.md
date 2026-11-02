# TASK-LEDGER-SEED — proposed boot content for the council's single `TASK-LEDGER.md`

**Proposed by:** Z.ai (seat S-2600–2699) · 25 Oct 2026
**Status:** lane delivery — a *seed*, not the registry. Per `_agents/zai/notes/AGENT-PIPELINE-PROMPT.md` §2 there is **one** ledger (`TASK-LEDGER.md` at repo root, "never two registries"); this file becomes its boot content at the moment the Owner/Architect order dispatch, or ports into `master_task_list.md` if the council prefers that home (one migration, never a second registry).
**Source slate:** `_agents/zai/notes/PROMPT-FOR-CLAUDE-v2.md` (61 enumerated tasks; the v2 header's "62" is an erratum — fix in v3 alongside the §2/T-51 correction).
**Errata applied:** **T-51 DROPPED (struck)** — the "corrupted `[hidden]` selector" premise was false; receipt `_agents/zai/notes/CORRECTION-LINE3-SELECTOR.md`. **T-55** edited to remove its T-51 clause.

## Row format (one line per task; append/transition, never renumber)

`| ID | Pri | Type | Status | Owner (name · date) | Review log (reviewer · verdict · evidence ptr) | Artifact pointers |`

- **Type:** AUDIT / IMPL / RULING (RULING rows are Architect/Owner-only; agents skip them)
- **Status:** `OPEN → IN-PROGRESS → DONE → VERIFIED`, plus `DROPPED (struck)` and `[BLOCKING]` flag inline
- **Review:** max 3 entries; third independent PASS ⇒ VERIFIED; any FAIL ⇒ back to OPEN, count resets; you cannot review a task you owned
- **Evidence:** every status transition cites a command, hash, or report path — no transition on assertion (G3)

## Seed rows

| ID | Pri | Type | Status | Owner | Review log | Artifacts / notes |
|---|---|---|---|---|---|---|
| T-01 | P0 | IMPL | OPEN (await APPROVED-IMPL) | — | — | baseline identity receipt: `notes/BASELINE-VERIFICATION.md` |
| T-02 | P0 | IMPL | OPEN (await APPROVED-IMPL) | — | — | KI-003..007 verified resolved, KI-009 → 56 occ/38 lines |
| T-03 | P0 | IMPL | OPEN (await APPROVED-IMPL) | — | — | markers per `tests/CONTRACT.md` C2 |
| T-04 | P0 | IMPL | OPEN (await APPROVED-IMPL) | — | — | mulberry32 behind `rnd()`; 56 occ / 38 lines |
| T-05 | P0 | IMPL | OPEN (blocked by T-04) | — | — | deterministic `baseline.json` per C6/B4 |
| T-06 | P0 | AUDIT | OPEN | — | — | superset diff vs `V22-candidate-teamcolours.html` → feeds Ruling 1 |
| T-07 | P0 | IMPL | OPEN (await APPROVED-IMPL) | — | — | paired-seed harness |
| T-08 | P0 | IMPL | OPEN (this seed is its half) | — | — | taxonomy + 13-field template |
| T-09…T-37 | P1 | AUDIT | OPEN | — | — | see slate §P1-INTEL for per-ID briefs |
| T-38…T-50 | P1 | IMPL | OPEN (contingent on APPROVED-IMPL list) | — | — | see slate §P1-REL |
| T-51 | P1 | IMPL | **DROPPED (struck)** | — | — | premise false — rule is intact in all four builds; `_agents/zai/notes/CORRECTION-LINE3-SELECTOR.md` |
| T-52…T-61 | P2 | mixed | OPEN (await ruling(s) where marked) | — | — | see slate §P2; **T-55 note: T-51 clause removed (struck)** |

## Bootstrap note (first adopting session)

Create `TASK-LEDGER.md` at root from this file verbatim; log one CHRONICLE line ("ledger bootstrapped from Z.ai seed, row count, hash of seed"); notify the Architect. Then run the pipeline session protocol (`AGENT-PIPELINE-PROMPT.md` §3) from Step 0.

## Escalations open at seed time
- **Q-ZAI-1** (audit base pin) — blocks every line-number claim in the slate from being cited safely; resolved by R-ZAI-3's pin table or an Architect line.
- **Q-ZAI-3** (review ordering) — gates pipeline adoption.
- **Q-ZAI-4** (slate home) — this seed is the concrete option; the Architect/Owner pick.

— Z.ai, seat S-2600–2699
