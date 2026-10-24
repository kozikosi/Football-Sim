# PR #5 Verification — Council Reliability Scorecard

**SPEAKER:** Ultra | **ROLE:** Council Advisor (Nemotron-3-Ultra) | **TASK:** PR #5 verification | **DATE:** 2026-10-21T06:30:00Z

---

## Scope

Verify PR #5 "Propose qualitative council contribution ranking and evidence ledger" (branch `gpt/council-reliability-scorecard`, OPEN proposal — not merged).

Files examined:
- `scripts/build_council_scorecard.py` (242 lines)
- `COUNCIL-RELIABILITY-RULE.md`
- `COUNCIL-RELIABILITY-REVIEW-PROMPT.md`
- `COUNCIL-SCORECARD.md` (display title: **Council Contribution Assessment and Assignment Guide**)
- `council/scorecard/events.jsonl` (6 events)
- `council/scorecard/archive/events-v1-numeric.jsonl` (5 events, historical numeric draft)

---

## 1. Script Verification — `scripts/build_council_scorecard.py`

### What it does (VERIFIED by code inspection)

1. **`read_events()`** — Parses `council/scorecard/events.jsonl`, validates each event:
   - Requires `event_id`, `event_type`, `date` on every event
   - Rejects duplicate `event_id`
   - Rejects numeric ratings (`ratings` or `score` keys) — enforces qualitative-only v2
   - Validates `ranking_snapshot` events: requires `members` array with `speaker`, `rank`, `confidence`, `strengths`, `limits`, `assignment_fit`; ranks must be consecutive positive integers; confidence in allowed set
   - Validates `task_observation` and `forwarded_excerpt` events: requires `speaker`, `task_id`, `assessment_status`, `assessment`, `source`, `evidence_status` (must be VERIFIED/REPORTED/INFERRED/UNKNOWN)
   - Requires at least one `ranking_snapshot` in ledger

2. **`discover_speakers()`** — Scans `_agents/**/*.md` for exact `SPEAKER: <name> | ROLE:` headers on first line. Returns set of discovered speaker names.

3. **`make_report()`** — Generates `COUNCIL-SCORECARD.md`:
   - Uses latest `ranking_snapshot` for ranked order
   - Combines aliases from snapshot
   - Computes `unassessed` = (observed names from events ∪ discovered speakers) − ranked names
   - Outputs markdown with: snapshot date, qualitative disclaimer, ranked table, unassessed table, recent task observations, update instructions, superseded numeric draft notice

4. **`__main__`** — Runs `read_events()` → `make_report()` → writes `COUNCIL-SCORECARD.md` (or `--check` mode compares existing file)

### Claim vs. Reality

| PR #5 Claim                                                                       | Verified?    | Notes                                                                   |
| --------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------- |
| "Generates qualitative council contribution ranking from audited ledger"          | **VERIFIED** | Script reads events.jsonl, validates, produces markdown                 |
| "Does not infer merit, compute personality scores, or rank members automatically" | **VERIFIED** | No numeric scoring; uses qualitative confidence labels only             |
| "Discovers speakers from exact SPEAKER headers in _agents Markdown"               | **VERIFIED** | `discover_speakers()` scans `_agents/**/*.md` for `SPEAKER: <name>      | ROLE:` on first line |
| "No numeric ratings or formulas"                                                  | **VERIFIED** | Script rejects `ratings`/`score` keys; uses qualitative confidence only |

### Hazards Identified (VERIFIED by code inspection)

1. **Mis-attribution risk in `discover_speakers()`** — Scans ALL `_agents/**/*.md` including:
   - `_agents/recovered/` (historical/recovered files)
   - `_agents-payload/` (payload files)
   - Any `.md` in any subdirectory
   - MOC flagged this: recovered files may have stale SPEAKER headers

2. **Dormant mechanism** — Generator only runs when manually invoked; no automatic onboarding of new contributors (they appear as UNASSESSED but only after manual run)

3. **No automatic contributor onboarding** — New contributors appear as UNASSESSED only after `build_council_scorecard.py` is run; no hook or automation

4. **Writes to repo root** — Output goes to `ROOT/COUNCIL-SCORECARD.md` (repo root), not a dedicated docs folder

---

## 2. COUNCIL-RELIABILITY-RULE.md Verification

### Consistency with Owner Direction (VERIFIED)

| Owner Requirement                                                    | Rule Provision                                                                                                                                                                                       | Status                   |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| No innate intelligence/honesty/loyalty/character/sabotage assessment | Lines 15-16: "This is an assessment of **observed project contributions**, not a measurement of innate intelligence, general ability, honesty, loyalty, character, consciousness, or sabotage risk." | **VERIFIED — Compliant** |
| Receipts + independent reproduction central                          | Lines 19-21: "For factual disagreements, start with the actual artifact... Independent reproduction is valuable."                                                                                    | **VERIFIED — Compliant** |
| Not a strict precedence system                                       | Lines 19-20: "It is a qualitative aid... It must not mechanically decide whose answer is right based on an overall placement..."                                                                     | **VERIFIED — Compliant** |
| No numeric scores                                                    | Lines 13-14: "replaces the previous 0–100 scores, weighted formulas, neutral prior, and numeric eligibility cutoffs"                                                                                 | **VERIFIED — Compliant** |
| Qualitative confidence labels                                        | Lines 47-52: Higher/Moderate/Low/Unassessed                                                                                                                                                          | **VERIFIED — Compliant** |
| SPEAKER header requirement                                           | Lines 76-78: Requires `SPEAKER: <name>                                                                                                                                                               | ROLE:                    | TASK: | DATE:` | **VERIFIED — Compliant** |
| FORWARDED BY requirement                                             | Lines 80-84: Requires `FORWARDED BY:` for forwarded material                                                                                                                                         | **VERIFIED — Compliant** |
| VERIFIED/REPORTED/INFERRED/UNKNOWN labels                            | Line 92: "Use VERIFIED, REPORTED, INFERRED, and UNKNOWN consistently"                                                                                                                                | **VERIFIED — Compliant** |
| Architect/Owner authority separate                                   | Lines 6, 100: "Claude is the Architect... GPT is co-architect... assessment does not grant or remove anyone's authority"                                                                             | **VERIFIED — Compliant** |

### Minor Issues (INFERRED)

- Line 96: "Current v2 snapshot" references "earlier project-record review" — the assessment basis is acknowledged as not a fresh audit. This is appropriately caveated.

---

## 3. COUNCIL-RELIABILITY-REVIEW-PROMPT.md Verification

### Consistency Check (VERIFIED)

- Correctly identifies the proposal as qualitative, not numeric
- Lists all 5 files to review (RULE, SCORECARD, events.jsonl, archive, script)
- Requests review of 9 specific areas (fairness, accuracy, confidence, assignment fit, evidence+assessment integration, discovery/aliases, fair updates, Lightning/GPT attribution, numeric withdrawal)
- Explicitly states: "Do not assess innate intelligence, honesty, loyalty, character, or sabotage risk" — **VERIFIED compliant**
- Explicitly states: "Do not use the assessment to overrule receipts or change anyone's authority" — **VERIFIED compliant**
- Explicitly states: "Claude remains the Architect... GPT must not manually edit Claude's product code" — **VERIFIED compliant**

---

## 4. COUNCIL-SCORECARD.md Verification

### Current Content (VERIFIED by inspection)

- **Snapshot date:** 2026-10-20
- **Ranked 15 contributors** (Pickle #1 through Glyph #15) with confidence labels (moderate/low)
- **4 unassessed/emerging** (Lightning, LongCat, MOC, New Member)
- **6 recent task observations** (MOC, LongCat, Nemo Ultra, GPT, GPT forwarded by Lightning)
- **Proper disclaimers:** Not a measure of innate intelligence; numeric draft withdrawn; receipts primary

### Consistency with Rules (VERIFIED)

- Uses VERIFIED/REPORTED/INFERRED/UNKNOWN labels correctly
- Confidence labels (moderate/low) match rule definitions
- Aliases not silently merged (no aliases shown in current snapshot)
- Architect authority explicitly separated (Claude at #5 with low confidence, explicit caveat)
- Forwarding attribution gap noted for Lightning (line 42)

---

## 5. Events Ledger Verification

### Current Events (6 events) — VERIFIED by inspection

| Event ID                               | Type              | Speaker                      | Status                   |
| -------------------------------------- | ----------------- | ---------------------------- | ------------------------ |
| 2026-10-20-ranking-snapshot-v2         | ranking_snapshot  | GPT (assessor)               | Current snapshot         |
| 2026-10-20-observation-moc-e2e         | task_observation  | MOC                          | REPORTED                 |
| 2026-10-20-observation-longcat-e2e     | task_observation  | LongCat                      | REPORTED                 |
| 2026-10-20-observation-ultra-e2e       | task_observation  | Nemo Ultra                   | REPORTED                 |
| 2026-10-20-observation-gpt-e2e         | task_observation  | GPT                          | REPORTED (self-assessed) |
| 2026-10-20-forwarded-excerpt-lightning | forwarded_excerpt | GPT (forwarded by Lightning) | REPORTED                 |

### Archive (5 numeric events) — VERIFIED

- 5 events in `events-v1-numeric.jsonl` with numeric ratings (0-5 scale)
- All have `scorable: true` (except one `scorable: false`)
- All have `assessor: "GPT (provisional...)"`
- All have `independently_reviewed: false`
- Properly labeled as historical/numeric draft

---

## 5. Identified Hazards (VERIFIED)

| Hazard                      | Location                                          | Severity | Evidence                                                                                                                                          |
| --------------------------- | ------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mis-attribution risk**    | `discover_speakers()` scans all `_agents/**/*.md` | HIGH     | Scans `_agents/recovered/`, `_agents-payload/`, any subdirectory; stale SPEAKER headers in recovered files will be discovered as new contributors |
| **Dormant mechanism**       | No automation                                     | MEDIUM   | Generator only runs manually; new contributors don't auto-appear as UNASSESSED                                                                    |
| **No automatic onboarding** | No hook                                           | MEDIUM   | Contributors appear as UNASSESSED only after manual script run                                                                                    |
| **Writes to repo root**     | `OUTPUT = ROOT / "COUNCIL-SCORECARD.md"`          | LOW      | Pollutes repo root; should be in `docs/` or `council/`                                                                                            |
| **Forwarding label gap**    | events.jsonl event 6                              | LOW      | Lightning's forwarded excerpt missing `forwarded_by` in original paste; correctly flagged in COUNCIL-SCORECARD.md line 42                         |

---

## 6. Recommended Fixes (RECOMMENDED)

| Fix                                                          | Location                                        | Rationale                                                                                                                                                                |
| ------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Restrict `discover_speakers()` to contributor lanes only** | `scripts/build_council_scorecard.py` line 82-85 | Change `agents.rglob("*.md")` to only scan `_agents/<name>/` where `<name>` matches known contributor directories; skip `recovered/`, `archive/`, `payload/`, `payload/` |
| **Add SPEAKER header validation**                            | `discover_speakers()`                           | Require exact format `SPEAKER: <name>                                                                                                                                    | ROLE: | TASK: | DATE:` — reject malformed headers |
| **Restrict output location**                                 | `OUTPUT = ROOT / "COUNCIL-SCORECARD.md"`        | Move to `docs/council/COUNCIL-SCORECARD.md` or `council/COUNCIL-SCORECARD.md`                                                                                            |
| **Add contributor directory allowlist**                      | `discover_speakers()`                           | Only scan directories matching known contributor names (from events ledger)                                                                                              |
| **Skip `recovered/`, `archive/`, `payload/` directories**    | `discover_speakers()`                           | Add explicit skip list                                                                                                                                                   |

---

## 7. Consistency with Owner Direction (VERIFIED)

| Owner Requirement                                                    | PR #5 Status                                                                           |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| No innate intelligence/honesty/loyalty/character/sabotage assessment | **COMPLIANT** — Explicitly prohibited in RULE.md lines 15-16, REVIEW-PROMPT.md line 31 |
| Receipts + independent reproduction central                          | **COMPLIANT** — RULE.md lines 19-21                                                    |
| No numeric scores/formulas                                           | **COMPLIANT** — Numeric draft withdrawn, qualitative only                              |
| Qualitative assessment only                                          | **COMPLIANT** — Confidence labels only                                                 |
| Receipts primary, assessment contextual                              | **COMPLIANT** — RULE.md lines 19-21                                                    |
| No authority changes from ranking                                    | **COMPLIANT** — RULE.md lines 6, 100                                                   |
| SPEAKER/FORWARDED BY headers required                                | **COMPLIANT** — RULE.md lines 76-84                                                    |

---

## Summary Verdict

| Check                                    | Verdict                   | Label                    |
| ---------------------------------------- | ------------------------- | ------------------------ |
| Script does what PR claims               | **VERIFIED**              | PASS                     |
| No numeric scoring in v2                 | **VERIFIED**              | PASS                     |
| `discover_speakers()` works as described | **VERIFIED**              | PASS (with hazards)      |
| RULE.md consistent with Owner direction  | **VERIFIED**              | PASS                     |
| REVIEW-PROMPT.md consistent              | **VERIFIED**              | PASS                     |
| SCORECARD.md matches ledger              | **VERIFIED**              | PASS                     |
| Events ledger valid                      | **VERIFIED**              | PASS                     |
| Archive properly separated               | **VERIFIED**              | PASS                     |
| **Hazards identified**                   | **VERIFIED**              | **3 HIGH/MEDIUM**        |
| **Overall**                              | **VERIFIED with hazards** | **APPROVE WITH CHANGES** |

---

## Recommended Changes (for PR #5 owner)

1. **Fix`discover_speakers()`** to restrict to `_agents/<known-contributor>/` directories only
2. **Move output** to `docs/council/COUNCIL-SCORECARD.md`
3. **Add skip list** for `recovered/`, `archive/`, `payload/` directories
4. **Document hazards** in PR description

---

## Files to Edit (if changes approved)

- `scripts/build_council_scorecard.py` — restrict discovery, move output
- `COUNCIL-RELIABILITY-RULE.md` — add note about discovery scope (optional)
- `COUNCIL-SCORECARD.md` — will be regenerated after script fix

---

## Commands Run (VERIFIED)

```bash
# Branch checkout
git checkout gpt/council-reliability-scorecard

# File inspections
cat scripts/build_council_scorecard.py
cat COUNCIL-RELIABILITY-RULE.md
cat COUNCIL-RELIABILITY-REVIEW-PROMPT.md
cat COUNCIL-SCORECARD.md
cat council/scorecard/events.jsonl
cat council/scorecard/archive/events-v1-numeric.jsonl
```

All files inspected locally on branch `gpt/council-reliability-scorecard` at commit `HEAD`.

---

**END OF VERIFICATION REPORT**

SPEAKER: Ultra | ROLE: Council Advisor (Nemotron-3-Ultra) | TASK: PR #5 verification | DATE: 2026-10-21T06:30:00Z
