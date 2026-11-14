SPEAKER: inkling | ROLE: council · pending deliverables | TASK: what Pickle can evaluate, now vs later | DATE: 2026-11-14 | Audience: KG (Owner)

# INKLING — Pickle's two prompts, sized and sequenced

Pickle is the right instrument for two windows, and wrong for the rest of today: his evidence value is highest when he reads deeply into artifacts that already exist and lowest when nothing new is on paper. **Recommendation: spend his budget today on prompt A only if you want the engine-cost mirror before dispatching Z.ai (it is the one unmeasured assumption in BENCH-1's budget table); hold prompt B and delivery-week prompts for the day the harness and results exist.**

What his budget FAR SHOULD NOT touch this week: FLEX (closed by your directive), any verdict sentence (the framework stays yours), the public repos, Claude's CI files, and anything duplicating INKLING/beam/ernie's byte-checks (they're fresh and receipted).

---

## PROMPT A — the engine-cost audit (eligible now; does not touch the verdict)

```
You are Pickle (council). Deep read, no runs required except the existing test suite if you want it. Audience: KG (Owner). Write ONE file to `inbox/<UTC>-pickle-engine-cost-audit.md`, then stop — nothing else.

Goal: calibrate BENCH-1's Tier-2 budget cells (spec §4: PICK→paint p50 <= 100 ms / p95 <= 250 ms at EVERY round 1..32) against the ENGINE AS IT EXISTS, so the budgets land annotated "evidence-supported / evidence-absent / likely miscalibrated" per cell. You make no framework claim; do not mention Vue or Svelte anywhere in the file.

Ground truth to read, at `origin/architect/engine-and-seats` inspected-at 46aafad9db46f45232f68f4e71f27f06620283d8 (NOT the tip d3bd81d — the two differ only by the doc-only recommendation commit; verify that yourself with git diff --name-only 46aafad9..d3bd81d):

1. The store: colors/src/sports/nfl/app/store.ts — the four actions (START/PICK/UNDO/LOAD), in particular the PICK action's record replay path (the "replay from pick 1" design).
2. selectors: colors/src/sports/nfl/app/selectors.ts — selectBoard calls goneOdds(s.draft, s.record.userTeam, makeRng(s.record.seed).fork('gone' + s.draft.pos), opts.sims ?? 30) per render. Read goneOdds (colors/src/sports/nfl/engine/goneodds.ts) and account the Monte-Carlo work honestly.
3. boardVM (colors/src/sports/nfl/view/draftBoard.ts) — what each board row costs.
4. restoreDraft/save + replay (colors/src/sports/nfl/app/saves.ts or appstate: find them) — what rebuilding state from pick 1 costs per PICK action.
5. The W3 spec workloads (claude/notes/2026-11-14-benchmark-spec-BENCH-1.md §3) and the replay claim Z.ai made in v4 §B4 ("record replay from pick 1 per action").

Answer exactly four questions:
(i) For a PICK at round 1, round 8, round 16, round 32: describe the actual compute executed to reach paint, naming the functions and rough complexity (Big-O per layer: replay / goneOdds / boardVM). No invented micro-timing — estimates must be labelled INFERRED.
(ii) Is p50 <= 100 ms / p95 <= 250 ms even structurally possible at round 32 under the replay-from-pick-1 design, or must those cells be relaxed — and WHICH formula would tell the Architect (not you) what to measure first?
(iii) Which single engine change would make round-32 PICK massively cheaper, and is it in the engine's determinism contract (PIN_DATA / record replay discipline) or beside it?
(iv) What you would ask the Architect to print from the already-existing 323-test suite to settle the question without new code — exact test names if you can find them.

Labels everywhere: VERIFIED if you ran/read it, REPORTED/INFERRED/UNKNOWN otherwise. No runs are strictly required; runs of the existing suite are allowed (expect 323/323 exit 0). No verdict word anywhere. No file outside `inbox/`.
```

## PROMPT B — same-day alternative: the adversarial record read (only if you don't want A)

```
Pickle (council). Audience: KG (Owner). Read every 2026-11-14 filing on `council/inkling` (git ls-tree -r --name-only HEAD | grep 2026-11-14) and the 20-F4 chain — beam 0430-0505, ernie 0410/0420/0425/0500/0505, glyph 0421, inkling 0459/0504/0520 files and inbox reviews, the v4 publish bytes at bbe106bc or council/ernie:ed0ec4df. Produce ONE file `inbox/<UTC>-pickle-record-adversarial.md` — an end-to-end contradiction and overclaim audit across the whole wave. Rules: (a) you may ONLY flag, never fix; (b) cite branch+path+sha for every hit; (c) rank findings by decision-relevance for the Owner (top 3 only, rest in an appendix); (d) no framework claim; (e) labels on every line; (f) if your read changes nothing, say so explicitly — that is an acceptable result. One file, then stop.
```

## Delivery-week prompts (queued, do NOT fire until the triggers exist)

**C — after Z.ai's Phase-1 harness handoff lands (before anyone ratifies budgets):**
```
Pickle: Phase-1 harness review. Read tools/bench/ (or wherever Z.ai put it) in the handoff package; step through the spec §5 protocol line by line; find instrument bias (wrong warmup discards, bad arm interleaving, asymmetric DOM contracts across arms, missing fingerprints, per-cell MAD/CI defects). One file; the deliverable is a numbered defect list and a one-line overall disposition (route to: accept-as-is / fix-before-first-run / redesign). No verdict.
```

**D — after three report-only result sets land:**
```
Pickle: ratification pre-read. Verify Z.ai's result JSONs + DESIGN-LOG vs the playbook at inbox/20261114-0459-inkling-bench1-review-playbook.md — fingerprint triage table, TIE application examples, G5 vmText==domText per interaction, budget-vs-median table, DESIGN-LOG consistency. Deliverable: one filled ratification pre-table + the two most surprising numbers + any tie-breaks nobody else will catch. The Owner rules on every budget; you prepare, never rule.
```

## Scheduling recommendation (2 prompts/day)

- Today: A **or** B (A preferred — it annotates the only budget table without a basis; B is a nice-to-have, INKLING/beam/ernie already swept for factual errors).
- Delivery day, prompt 1 of 2: C (harness Phase-1 review).
- Delivery week, prompt 2 of 2: D (ratification pre-read).
- Nothing else Pickle-sized appears on this horizon; that is the healthy state.

Labels: INFERRED (this plan is sufficient as of 2026-11-14 morning; triggers above are the gates) / UNKNOWN (when Z.ai ships — unknown; how many Pickle slots remain this week).

— inkling
