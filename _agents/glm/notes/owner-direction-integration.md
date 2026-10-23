SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: report-back to MiMo — decision-record integration (Owner direction, 2026-10-21) | DATE: 2026-10-21T01:48Z

# Owner direction integration — items (1)–(4) delivered

## (1) CHRONICLE block — DONE

Attribute-faithful digest block appended to `CHRONICLE.md` (append-only via heredoc; size receipt in the execution log). It records, with hash-pointer, all 15 digest lines: priorities order (with "no multi-sport redesign delays the NFL build"), never "V21", arch-OPEN, pool rules, integer policy, −5-not-approved, today's franchises, identity-field separation, modern-training license, snake drafts + flex-as-guideline, wins-explaining metrics before publication, beta-not-a-gate, assessment-guide qualitative-only, working rules (one accountable owner + labels + ≤5-questions-with-defaults + speaker protocol).

## (2) Durable direction-file hashes — VERIFIED

```
git show FETCH_HEAD:OWNER-PRODUCT-DIRECTION.md | shasum | cut → f816486550a5 (11,319 B)
git show FETCH_HEAD:_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md | shasum | cut → 42c27557be99 (5,639 B)
```
FETCH_HEAD = `f68b7f8a49ef…` on `gpt/all-time-player-source-intake-20261020` (receipt from `.git/FETCH_HEAD` head -4). Both verified twice this session (pre/post branch switch of the working tree).

## (3) Stale priority/decision summaries — pointer list (paths + stale lines exactly)

| File:line                                                                                                                                                                    | Stale text                                                                                           | Status                                                                                                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FOLDER_STRUCTURE_RECOMMENDATION.md:19`                                                                                                                                      | "core/  # Shared engine (immutable after V21 stabilization)"                                         | SUBSTANTIVELY stale — presumes a shared-engine core dir now; the Owner's line is "extract only when proven reuse" (option C keeps `shared/` empty until the ledger trigger) |
| `FOLDER_STRUCTURE_RECOMMENDATION.md:85`                                                                                                                                      | "Stick with the single-product-family approach until V21 is fully stabil…"                           | LABEL-stale only (V21 = term-forbidden); substance is consistent with "do not let multi-sport redesign delay the NFL build"                                                 |
| `SIM-PLATFORM/ROADMAP.md:4,14,41,69,75`                                                                                                                                      | "the V21 merge, then the platform refactors"; "stage 0 (V21) merged and verified"; "…the V21 merge…" | LABEL-stale (correctly use `40233d6b…`); the substance — the stage-0/1 tables and "Priority 1 is a constraint" — remains consistent with the direction."                    |
| `SIM-PLATFORM/VISION.md:89,90`                                                                                                                                               | "help Claude make V21 as beautiful…"; "…must not compete with the V21 merge…"                        | LABEL-stale only                                                                                                                                                            |
| Nothing else in AGENTS.md / ONBOARDING.md / MASTER_GUIDE.md / COLLECTIVE-PROMPT.md / COUNCIL-DIGEST.md / `_multi-sport/README.md` sweeps contains "V21" (0 hits — VERIFIED). |

## (4) Contradictions between the direction and current shared-doc/repo state — ≤5, each with default + cost-of-wrong

1. **The nested repo `Football Sim/` now sits on branch `council-intake` @ caace3e** (was main; UNKNOWN who/why). Default: verify with the seat that changed it; adopt MOC §5.1 (never switch branches with uncommitted council work; commit first). Cost-of-wrong: silent history divergence in the publication lane; PRs may bind to an unexpected base.
2. **The term "V21" is used for the merge candidate in three shared docs** (§3 rows). Default: scribe-owned correction pointers only (you just got them); never rewrite other seats' text. Cost-of-wrong: hash-citation ambiguity in future round notes.
3. **Four parallel proto-topologies exist simultaneously** (`sims/`, `sports/+shared/`, `SIM-PLATFORM/`, `Sim/`). Default: the Owner elects ONE container (the paper's them, later in the batch — pointer `REPO-ARCHITECTURE-OPTIONS.md` §4/§8). Cost-of-wrong: continued duplicate scaffolds and the next collision in the absorb-map.
4. **Ultra's `responsive-390-audit: FAIL` against the merge candidate** (Pickle M-139, REPORTED) vs earlier gate receipts PASing the same candidate. Default: rerun the W3 matrix on the failing artifact (MOC's own procedure) before accepting "the candidate is gate-green." Cost-of-wrong: ratifying a build with a mobile defect.
5. **LONGCAT's KI-016 quarantine** (invented-ratings fixtures in `sports/football/ratings.json` and `sports/basketball/all_time_draft.json`, decimals on integer scale) vs the direction's integer-public/pool-approval rules. Default: Keep the quarantine-pull (fixtures folder + `provenance:{source:"example"}`) as ONE of the next practitioner round items w/ the Architect assigned. Cost-of-wrong: invented data keeps polluting datasets used by later pools.

## Receipt place

`_agents/glm/notes/owner-direction-integration.md` (this file) + the CHRONICLE block (append-only; block ends with the pointer line). The bulletin carries the one-line presence note; the session.send to `ses_ea488c3b8ffeJ4bbPTh9u85304` carries the report.
