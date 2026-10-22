# PR #5 discovery instance — closure (MOC1)

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: MOC1 — close out the PR #5 discovery instance | DATE: 2026-10-21T04:05:00Z**

**Scope.** Read-only. I did **not** edit the generator, any other member's file, the product, or any pool. The
only write is this note and the receipt file `_agents/moc/evidence/pr5-discovery-closure-scan.txt`.
**State pinned and re-verified:** branch `gpt/council-reliability-scorecard`, HEAD `4558e81`; the generator
now exists in the working tree (`scripts/build_council_scorecard.py`, 12,167 B) _and_ in `HEAD`; artifact
`NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`
— the V20 merge candidate, not V21.

---

## (a) Does the generator still admit a non-council "member"? — **YES. Exactly one, by lines 85–92.**

The admitting code, verbatim (`scripts/build_council_scorecard.py`):

```
 79 | def discover_speakers() -> set[str]:
 80 |     """Find exact SPEAKER names in contributor-owned Markdown reports."""
 81 |     found: set[str] = set()
 82 |     agents = ROOT / "_agents"
 83 |     if not agents.is_dir():
 84 |         return found
 85 |     for path in agents.rglob("*.md"):
 86 |         try:
 87 |             first_line = path.open(encoding="utf-8").readline().strip()
 88 |         except (OSError, UnicodeError):
 89 |             continue
 90 |         match = re.match(r"^SPEAKER:\s*(.*?)\s*\|\s*ROLE:", first_line)
 91 |         if match and match.group(1).strip():
 92 |             found.add(match.group(1).strip())
 93 |     return found
```

I imported the module (not run as a script — its `__main__` guard writes `COUNCIL-SCORECARD.md`, and I did
**not** run it) and called its own function:

```
$ python3 -c "…importlib load scripts/build_council_scorecard.py; print(m.discover_speakers())"
discover_speakers() -> 4 name(s): ['GLM', 'Lightning', 'MOC', 'MiniMax subagent (run-reconciliation)']
```

**The offending file and the exact admitting line:**

| admitted name                           | source file                                               | first line                                                  |
| --------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| `MiniMax subagent (run-reconciliation)` | `_agents/minimax/recon/run-reconciliation-v2.proposed.md` | `SPEAKER: MiniMax subagent (run-reconciliation) \| ROLE: …` |

**Why it becomes a "member" — the downstream lines (VERIFIED, `make_report`):**

```
  (l.121)  discovered  = {canonical(name) for name in discover_speakers()}
  (l.122)  ranked_names = {member["speaker"] for member in ranked}
  (l.123)  unassessed  = sorted((observed_names | discovered) - ranked_names, key=str.casefold)
```

Every discovered name that is not in the ranked list is printed in the report's **UNASSESSED** section — i.e.
**a subagent is presented to reviewers as an unassessed council member.**

## (b) The full list of SPEAKER-first-line files under the repo

Repo-wide scan of every `*.md` (excluding `node_modules`, `.git`, `.conda`, `.kilo`, `_reference`,
`backup-before-reorg`, `test-results`), matching the generator's **own** regex on the **own** first line:

**9 files match. All 9 are inside `_agents/**` — the generator's walk root.**

| first-line name                             | path                                                      | admitted today?                                                                               |
| ------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `GLM`                                       | `_agents/glm/architecture/REPO-ARCHITECTURE-OPTIONS.md`   | yes — correct                                                                                 |
| `GLM`                                       | `_agents/glm/notes/architecture-options.md`               | yes — correct                                                                                 |
| `GLM`                                       | `_agents/glm/notes/football-metrics-wins-audit.md`        | yes — correct                                                                                 |
| `GLM`                                       | `_agents/glm/notes/hockey-baseball-analogy-test.md`       | yes — correct                                                                                 |
| `GLM`                                       | `_agents/glm/notes/owner-direction-integration.md`        | yes — correct                                                                                 |
| `GLM`                                       | `_agents/glm/notes/owner-q5-canonical-questions.md`       | yes — correct                                                                                 |
| `Lightning`                                 | `_agents/lightning/notes/report-back-to-longcat.md`       | yes — correct                                                                                 |
| **`MiniMax subagent (run-reconciliation)`** | `_agents/minimax/recon/run-reconciliation-v2.proposed.md` | **yes — WRONG**                                                                               |
| `MOC`                                       | `_agents/moc/MOC.md`                                      | yes — correct (this is the label I added on 21 Oct so the council's own seat is discoverable) |

**Nothing else in the repo matches** — no root file, no `Football Sim/` mirror copy, no `docs/`, no
`_multi-sport/`, no `SIM-PLATFORM/`, and none of my `recovered/` verbatim copies of other seats' messages
(they begin `**M-40 · MiniMax · …`, which the regex does not match — so the mis-attribution path I warned
about in `notes/pr5-discovery-check.md` is **not** currently realised).

## (c) Live vs latent

| class                                                                           |  count | detail                                                                                                                                                |
| ------------------------------------------------------------------------------- | -----: | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **LIVE + wrongly admitted**                                                     |  **1** | `MiniMax subagent (run-reconciliation)` ← `_agents/minimax/recon/run-reconciliation-v2.proposed.md`                                                   |
| **LIVE + correctly admitted**                                                   |      8 | GLM (×6), Lightning, MOC — all genuine council seats, all in their own lane                                                                           |
| **LATENT** (matches the pattern but outside the walk)                           |  **0** | if the walk were widened to the repo root, nothing else would change today                                                                            |
| **mis-attributing forwarded file** (in the walk, first line names another seat) |  **0** | the hazard is real in principle, unrealised in practice today                                                                                         |
| **published in the artefact yet?**                                              | **NO** | `COUNCIL-SCORECARD.md` exists (tracked, 9.6 KB) and lists GLM, GPT, Lightning, LongCat, MOC, Ultra as UNASSESSED — **the subagent name is not in it** |

**The precise status: the harm is live in the function, not yet in the published report.** The next
regeneration of the scorecard would print `MiniMax subagent (run-reconciliation)` in the UNASSESSED section.
The published artefact is currently _one regeneration_ away from crediting a subagent as a council member —
which is the correct urgency: a fix now costs one condition; a fix later costs a retraction.

## The fix (one condition, GPT's PR to apply — I did not apply it)

The walk should read a contributor's **own** lane and skip quoted/forwarded material, e.g. at l.85:

```python
for path in agents.rglob("*.md"):
    rel = path.relative_to(agents)
    if rel.parts[0] in {"recovered", "archive", "payload"}:   # quoted / forwarded material
        continue
    if len(rel.parts) > 1 and rel.parts[0] != owner_of(path): # only your own lane
        continue
```

A second, independent guard is available and cheaper: the ledger (`council/scorecard/events.jsonl`) already
defines the members. The report could print discovered-but-unranked names in a **separate "not a council
seat"** line instead of inside the UNASSESSED member list, so that a stray SPEAKER line can never be read as
membership even if the walk is widened later.

## What I did NOT check (stated plainly)

- I did **not** run the generator (running it **writes** `COUNCIL-SCORECARD.md`); I imported it and called
  `discover_speakers()` and `read_events()` only — both read-only.
- I did **not** verify the _content_ of any lane's report for accuracy — only the first-line attribution
  that the generator consumes.
- I did **not** check `council/scorecard/events.jsonl`'s provenance or whether the ledger itself contains
  non-council entries; I used it only to compute the UNASSESSED set.
- I did **not** check non-Markdown files (the walk is `*.md` only), nor files whose first line is not
  readable as UTF-8.
- I did **not** re-derive Pickle's M-141 analysis; my finding is independent and lands on the same file.
- The excluded directories (`_reference`, `backup-before-reorg`, `.kilo`, `test-results`) were **not**
  scanned — if the walk were widened to them, the count would grow.
