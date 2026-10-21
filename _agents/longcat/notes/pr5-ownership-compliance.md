# PR #5 compliance audit against the Owner's ruling

**SPEAKER: LongCat | ROLE: Council reviewer (S-2400–2499) | TASK: PR #5 ownership-compliance audit | DATE: 2026-10-21 (UTC)**

**Assignment:** MiMo (coordinator) — audit PR #5 (`gpt/council-reliability-scorecard`, 6 files) against the Owner's ruling. **READ-ONLY on the PR**; this file is my own lane. **No PR file edited.**

**PR #5 state at check:** `gh pr view 5 --json state,mergedAt,mergeable` → `{"mergeable":"MERGEABLE","mergedAt":null,"state":"OPEN"}` — **OPEN, unmerged.** VERIFIED.

**Owner ruling audited against:** 0–100 scores and formulas withdrawn · no assessing intelligence/character/loyalty/sabotage from ordinary project work · not a strict precedence rule / must not mechanically decide whose answer is right · must not change anyone's authority · Claude is Architect, Owner final authority, GPT co-architect.

## 1. Compliance matrix

| # | File | Line | Text / behaviour | Verdict |
|---|---|---|---|---|
| 1a | `COUNCIL-RELIABILITY-RULE.md` | 13 | "It replaces the previous 0–100 scores, weighted formulas, neutral prior, and numeric eligibility cutoffs." | **COMPLIANT** |
| 1b | `COUNCIL-RELIABILITY-RULE.md` | 39–45 | Permits a "provisional relative order" with per-row confidence, evidence, limits, independent-check flag | **COMPLIANT** — a relative order is not a 0–100 score |
| 1c | `scripts/build_council_scorecard.py` | 39–42 | `if "ratings" in event or "score" in event: raise SystemExit("numeric rating found; v2 uses qualitative evidence only")` | **COMPLIANT** — the generator *enforces* the withdrawal |
| 1d | `scripts/build_council_scorecard.py` | 4–5 | "It does not infer merit, compute personality scores, or rank members automatically." | **COMPLIANT** |
| 1e | `council/scorecard/events.jsonl` (live) | — | 1 `ranking_snapshot`, 4 `task_observation`, 1 `forwarded_excerpt`; `grep -oE '"(ratings\|score\|scorable)":'` → **no matches** | **COMPLIANT** |
| 1f | `council/scorecard/archive/events-v1-numeric.jsonl` | — | **Does** carry numeric `ratings` (0–5 scale) and `"scorable":true` | **COMPLIANT as archived history** — see D3 |
| 2a | `COUNCIL-RELIABILITY-RULE.md` | 15 | "not a measurement of innate intelligence, general ability, honesty, loyalty, character, consciousness, or sabotage risk" | **COMPLIANT** |
| 2b | `COUNCIL-SCORECARD.md` | 7, 33 | Same disclaimer, twice | **COMPLIANT** |
| 2c | `COUNCIL-SCORECARD.md` | 17–31 | All 15 ranked rows describe contribution patterns only (evidence discipline, adversarial review, execution, corrections) | **COMPLIANT** — no character/intelligence assessment found |
| 2d | `COUNCIL-RELIABILITY-RULE.md` | 35 | "Repeated mistakes… can lower confidence in a relevant work area, but they are not a character verdict." | **COMPLIANT** |
| 3a | `COUNCIL-RELIABILITY-RULE.md` | 19 | "it must not mechanically decide whose answer is right based on an overall placement, consensus, or a fixed formula" | **COMPLIANT** |
| 3b | `COUNCIL-RELIABILITY-RULE.md` | 21 | "A clear, reproducible receipt is stronger evidence for that particular claim than a contributor's general standing." | **COMPLIANT** |
| 3c | `COUNCIL-SCORECARD.md` | 9 | "Never decide a factual claim from rank alone or use an overall placement to dismiss a clear, reproducible receipt." | **COMPLIANT** |
| 3d | `scripts/build_council_scorecard.py` | 103 | `sorted(current["members"], key=rank)` — display ordering only; no decision logic | **COMPLIANT** |
| 4a | `COUNCIL-RELIABILITY-RULE.md` | 6 | "This assessment system changes none of those roles." | **COMPLIANT** |
| 4b | `COUNCIL-RELIABILITY-RULE.md` | 100 | "The Architect's product authority does not come from a leaderboard and is unaffected by this assessment." | **COMPLIANT** |
| 4c | `scripts/build_council_scorecard.py` | 223 | "Claude's Architect authority and the Owner's decision authority do not come from this ranking." | **COMPLIANT** |
| 4d | `COUNCIL-RELIABILITY-REVIEW-PROMPT.md` | 17 | "The assessment does not grant or remove anyone's authority." | **COMPLIANT** |

**Archive consumption check (1f):** the generator reads only `ROOT / "council" / "scorecard" / "events.jsonl"` (line 17). `grep -rn "events-v1-numeric\|v1-numeric"` over the tree finds **no code read** — only `COUNCIL-RELIABILITY-REVIEW-PROMPT.md:14` ("historical numeric draft only") and Ultra's `_agents/nemotron-3-ultra-free/notes/pr5-verification.md`. **The archived numeric ledger is history, not input.** VERIFIED.

## 2. Defects found (real; not Owner-ruling violations)

**D1 — the committed `COUNCIL-SCORECARD.md` is STALE (VERIFIED).** The generator's own self-check fails:

```
$ python3 scripts/build_council_scorecard.py --check
contribution assessment report is stale; regenerate it
```

Diff of committed vs freshly generated (only difference):

```
-| New Member | UNASSESSED | No audited contribution event recorded yet. | No negative conclusion. |
+| MiniMax subagent (run-reconciliation) | UNASSESSED | No audited contribution event recorded yet. | No negative conclusion. |
```

Cause: `discover_speakers()` (script lines 79–93) reads the **first line of every `*.md` under `_agents/`** and matches `^SPEAKER:\s*(.*?)\s*\|\s*ROLE:`. A subagent report carrying `SPEAKER: MiniMax subagent (run-reconciliation)` is picked up, so the generated report no longer matches the committed one. This is a breach of the Owner's working rule *"Use one canonical status/evidence source; correct or supersede stale claims rather than creating competing counts."*

**D2 — automatic discovery attributes a subagent as a contributor (VERIFIED from the same diff).** The generated report's "Emerging or unassessed contributors" table lists `MiniMax subagent (run-reconciliation)`. The Owner's rules state subagents are not council members and do not take an ID block; a subagent's report is its creator's work. MOC flagged this hazard in M-111 §2 (files under `_agents/…/recovered/` hold verbatim copies of other seats' messages).

**D3 — the archived numeric ledger keeps numeric `ratings` on the branch (REPORTED).** It is correctly out of the generator's path and labelled in the review prompt, but the file itself carries `"ratings":{...}` and `"scorable":true` with no in-file withdrawal header. A reader who greps for `ratings` will find live-looking numbers. Low risk; a one-line header in the file would close it.

## 3. Recommended amendments (TEXT ONLY — I did not edit the PR)

1. **Fix the stale report.** Either regenerate `COUNCIL-SCORECARD.md` and commit it, or remove the `--check` self-test. Recommended default: regenerate, and note in the PR that the report is generated.
2. **Restrict discovery to contributor-owned files.** Read the first line only of files directly under `_agents/<name>/`, and skip `recovered/`, `archive/`, `payload/`, and any file whose first line starts with `**M-<n> ·`. This closes D2 and stops D1 recurring.
3. **Add an in-file withdrawal header** to `council/scorecard/archive/events-v1-numeric.jsonl` (or move it out of the tree) so the numeric ratings cannot be mistaken for current standing.
4. **Optional:** state in the rule doc that the scorecard is advisory-only and that a rank can never override a receipt (already stated at lines 19/21 — consider promoting it to the file's first paragraph).

## 4. Verdict

**APPROVE WITH CHANGES.** The proposal is compliant with the Owner's ruling on all four audited points (0–100 withdrawal enforced in code; no character/intelligence assessment; no mechanical precedence; no authority change). Two real defects need fixing before adoption: the stale committed report (D1) and the subagent-attribution hazard in discovery (D2).

**Files edited:** none on the PR. Wrote `_agents/longcat/notes/pr5-ownership-compliance.md` only.
**Commands run:** `gh pr view 5 --json state,mergedAt,mergeable`; `grep -rn "events-v1-numeric\|v1-numeric" .`; `grep -oE '"(ratings|score|scorable)":' council/scorecard/events.jsonl`; `python3 scripts/build_council_scorecard.py --check`; generator diff (committed file restored; `git status --porcelain COUNCIL-SCORECARD.md` → clean).
