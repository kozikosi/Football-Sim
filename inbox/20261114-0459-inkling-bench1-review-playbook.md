SPEAKER: inkling | ROLE: council · deliverable for decision-readiness | TASK: BENCH-1 Review Playbook — how the Owner's next session goes, minute by minute | DATE: 2026-11-14 (v4 supersession note at top: written before Z.ai's harness exists) | Audience: KG (Owner)

# INKLING — the BENCH-1 Review Playbook (for the afternoon the Z.ai handoff lands)

**Scope law.** This playbook verifies a result package. It does not produce one, does not fix one, and does not pass one. The framework verdict is never produced here. When any step fails, the correct output is: STOP → name the failed step → file it. Replacement/repair is the author's (Z.ai's) lane.

---

## 0. Before opening anything — five sanity checks (2 min)

1. Is the package a `MANIFEST.txt` + files layout (or extracted from one)? Everything must hash-verify; nothing else counts as delivered.
2. Are there **three or more report-only result sets** (runs 1–3)? One beautiful run proves nothing; the design requires interleaved A–B repeats. If only one exists, the package is incomplete for ratification — consult §8 before proceeding.
3. Does the package name the **engine commit it ran against** (`engineAt`) and the spec? If either is absent → incomplete.
4. Is there an environment fingerprint per result file (Node, OS, CPU, Chromium build, npm version, `git rev-parse HEAD` of the arm clone)? Absent → unusable for ratification.
5. Is `DESIGN-LOG.md` present (Z.ai's drift log)? If missing → ask for it before reading numbers; without it you cannot tell reference design from improvisation.

## 1. Verify the manifest (5 min, one paste on macOS)

```zsh
cd <extracted-package>   # directory that holds MANIFEST.txt + the files
python3 - <<'PY'
import hashlib, os
bad = []
total = 0
for line in open('MANIFEST.txt'):
    parts = line.split(None, 1)
    if len(parts) != 2:
        continue
    want, rel = parts
    if not os.path.isfile(rel):
        bad.append((rel, 'MISSING')); continue
    got = hashlib.sha256(open(rel, 'rb').read()).hexdigest()
    total += 1
    if got != want:
        bad.append((rel, f'MISMATCH want {want} got {got}'))
print(f'verified {total} entries; {len(bad)} problems')
for r, why in bad:
    print('  FAIL', r, '->', why)
PY
```

Expected for a clean package: `verified N entries; 0 problems`. Anything else → STOP, file, no downstream reading until resolved by the author.

## 2. Fingerprint triage — one look per result JSON

For each `results-*.json` (names may drift; the schema is the contract):

| Key | Must contain | Red flag if |
|---|---|---|
| `engineAt` | full sha the engine was read at (e.g., `46aafad9…`) | absent or "the pin" |
| `specAt` | spec commit/sha | absent |
| `env` | Node, npm, OS/arch, CPU model, RAM, Chromium/build for Tier 2 | partial |
| `dataHash` | pool hash (`PIN_DATA`-discipline) | absent |
| `rounds` | per-pick or per-interaction curve & counts | only means, no dispersion |
| `discarded` | warm-up count (spec: 3 discarded / 20 kept) | 0 discarded with cold start |
| `arms` | which framework, which clone SHA | "the svelte one" |
| `budgets` | the provisional values from spec §4, verbatim | edited numbers |

## 3. Tier 1 — what green means (the engine answer key)

Re-derive, don't trust: run **two** independent means and compare SHA equality, per spec §6.

- **W1 (pool):** parse+freeze ≤ 250 ms on the reference machine; `datasetHash` identical across the two runs; zero duplicate ids → else the pool/pipeline is broken, stop.
- **W2 (32 rosters):** every slot filled; no player twice; each pick `fit(...).legal = true`. → else the engine under your instrument is being exercised wrong.
- **W3 (snake drafts):** D-5R and D-32R; per-pick ms curve (you want the *shape*, especially rounds 16–32 where the replay-from-pick-1 design soaks); full-draft ms vs **≤ 10 s (provisional)**; save record ≤ 250 KB; **record hash identical across both runs**; replay via `restoreDraft` → identical `DraftState` summary hash.
- **W4 (season):** `fixtures` count = **272** regular games; every team's W+L+T = their games; league points-for == points-against; **each game regenerated from `gameSeed(seed, week, home)` byte-identical** to the season-run row; season ≤ 10 s; one `simulateGame` p95 ≤ 20 ms.
- **W5 (board VM):** `selectBoard` output string-equal to the harness's recorded rows; sort order equals engine's, including id tie-break; PICK-then-UNDO restores prior VM byte-for-byte.
- **A1/A2:** Tier-1 determinism — same (seed, team, policy) twice → identical record/table/summary hashes; Node-version A2: his box runs Node 24 and 26 (report both, explicitly not Node 22 — that cell stays with the Architect's CI wave). **A3 cross-engine = report-only one row; never gate.**

If Tier 1 fails any hard gate, **do not read Tier 2**. A broken answer key makes both arms look equal.

## 4. Tier 2 — reading the arms (only if Tier 1 is clean)

For each arm (Interleaved A–B pairs, 5 rounds minimum per spec §5):

- **Budget cells (provisional, report-only):** PICK→paint p50 ≤ 100 ms / p95 ≤ 250 ms at every round · sort/filter→paint 60 r p95 ≤ 50 ms / 1,000 r p95 ≤ 100 ms · select→roster p95 ≤ 50 ms · record ≤ 250 KB · season ≤ 10 s · game p95 ≤ 20 ms. **None may fail anything yet.**
- **Dispersion:** demand median, p95, MAD and bootstrap-95 CI of the median per cell. Mean-only reports are incomplete — file a request for the raw runs.
- **G5 (contract byte-identity, the strongest single check):** for each arm, for each interaction, rendered text must equal the engine's VM text exactly, and the **DOM-text hash must match across arms**. Recipe:
  1. Dump VM text for the interaction from the harness (or a one-off `node -e` against the vendored engine — selection: `selectBoard(state,{sort,limit:1000})` then map rows → name/pos/ovr/wins text).
  2. In each arm's page, read the row cells' text via Playwright (`locator('[data-testid=board-row]').allTextContents()`).
  3. Byte-compare the two joined strings; record `domTextHash == vmTextHash` per arm per interaction round.
  4. Any mismatch → this is an arm defect or an instrument defect; file it, never average it away.
- **Tie rule application (spec §5):** report each cell with bootstrap 95% CI of the median. A "beats" claim requires (i) CI non-overlap AND (ii) ratio ≥ 1.2. Otherwise the cell is a TIE and is reported as one. Worked example (synthetic): arm-a median 78 ms [CI 61–95], arm-b median 65 ms [CI 79–??] → overlapping ⇒ tie regardless of ratio. arm-a 78 [CI 60–96] vs arm-b 40 [CI 33–47] → non-overlap, ratio 1.95 ≥ 1.2 ⇒ "a beats b on this cell", reportable. **Means without CIs cannot claim either.**
- **Number of runs:** if fewer than 3 full interleaved rounds exist, demand them before ratifying anything.

## 5. The ratification packet — how the rows are processed

Per provisional budget, the packet contains: `budget | run1 | run2 | run3 | budget met? (median) | proposed disposition`. Your dispositions, one row at a time:

- Keep (budget survives ratification) — optionally with tightening/relaxing value.
- Relax (provisional value was too aggressive for the product's reality — allowed; say why in one sentence).
- Convert (a budget becomes a hard gate in CI double-checked by the Architect's CI wave; only after ratification, per spec §4's 1.5× × 2-of-3 reruns rule, and only if you say the word).
- Reject (measurement is untrustworthy — name the confound; e.g., chromium cold-cache variance, one arm ran lousy npm ci, instrument drift mid-run).

You do this row by row in one sitting; the output is a filled table with your initials per row. **The packet carries no decision about the framework.**

## 6. Writing the decision note (when you rule)

One-paragraph scaffold, filled by you, evidence-first:

> "I have read the BENCH-1 package at <path/sha> (manifest verified N/N entries on <date>; Tier 1 gates <pass/fail>; Tier 2 <summary of cells that beat/tied>) and Z.ai's DESIGN-LOG (deltas from the reference design: <list>). On this evidence I sign <framework> at <confidence>, noting <the one material caveat, e.g. Tier-2 tie on sort/filter at 1,000 rows / Werkzeug asymmetry on MCP ergonomics>. If I am wrong, the cost is one ui/ folder behind the view-model contract, per the Architect's IF-WRONG analysis. This note supersedes provisional judgement recorded in <file> on 2026-11-14."

Cite only what you ran; say exactly what you did not; if the package fails §8's completeness rule, the only correct note is "decision deferred; reasons: …".

## 7. Integrity gotchas already observed (verify, don't inherit)

- Working-copy `.mcp.json`-dependent tools **report PASS on the working copy and crash on fresh clones** — true of `report-tooling.mjs` today; check the same class of artifact in the handoff (goal: the package must verify from its own bytes alone).
- Manifests listing untracked/gitignored files (the v3 phantoms) — see FROZEN v3 findings page; require the handoff's manifest to be regenerable from tracked bytes only.
- `npm ci` vs `npm install` — lockfile fidelity matters for fingerprints; mismatch means fingerprints lie; flag.
- Timings from debug builds, or with devtools open, are noise — demand prod build evidence only for Tier 2 budget cells.

## 8. If the package is incomplete

Stop. Name the first failing completeness item (manifest, fingerprint, N-runs, DESIGN-LOG, engineAt). Write `inbox/<UTC>-owner-bench-1-incomplete.md` naming it. Do not take the partial peek; partial peeks poison later ratings.

## 9. One-line summary

**Verify the manifest → fingerprints → Tier 1 gates → Tier 2 G5 + ties → per-budget ratification → your note — and no step of this certifies the framework. You do, alone, on the evidence before you.**

Labels: INFERRED (this file's correctness rests on BENCH-1 as written on 2026-11-14; Z.ai's actual artifacts supersede wherever they differ) · UNKNOWN (everything about the not-yet-written harness).

— inkling
