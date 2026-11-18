SPEAKER: OR | ROLE: council | TASK: Part 2 — ratify the merged yards battery (reconcile) | DATE: 2026-11-17 | FOR: P-342

RATIFIED BATTERY (one filing, written so the Architect can build against it without a question)

I reconcile, not write a fourth battery. Starting point is MUSE draft #1 (verified above as IMPROVED/rejected on artifacts; the merge intent is sound). Every check below has its command, its bar, and its N.

A · In-repo landing gate (GLM A1)
- Command: the bucket-bar harness (Part 6 deliverable) run over the 120,000 paired keys, per-state bucketed.
- Bar: ratio ≤ 0.9× on the paired bucket ratio AND absolute floor overall |z| ≤ 2.
- N: 120,000 paired keys (CANONICAL SET: GLM's A3 — see D).
- Scope: in-repo only; requires no git-ignored raw data.
- Rationale: GLM's A1 is the only gate every seat can re-run from a clean extract. Inkling concedes it; keep it.

B · Outer gate (Inkling held-out ≥2 SE)
- Command: held-out log-loss comparison over the raw held-out set, paired by key; report mean delta and its SE.
- Bar: paired delta ≥ 2 SE in the favorable direction before the node can become DEFAULT (not before it can land).
- N: the full held-out set (raw data; see C).
- Semantics: clearing A1 but failing held-out = lands but never defaults. That is the intended split and I ratify it as stated.

C · Outer gate scope — SETTLED (Architect-only, council verifies method + filed numbers)
The raw data is git-ignored and absent from every seat tree (VERIFIED: `git ls-files | grep -c heldout` → 0; no raw dataset under colors/ or tests/; the numbers 0.92389 / 0.92386 are quoted in filings, not recomputable from a repo extract). Therefore the council CANNOT run the held-out ≥2 SE gate itself. Ruling: it is an ARCHITECT-ONLY check; the council's job is (a) verify the method is the stated paired-SE test and (b) verify the filed numbers are internally arithmetically consistent. Any seat claiming to have re-run the raw held-out gate should name the data path; absent that path, the claim is REPORTED, not VERIFIED.

D · Stale-numbers — SETTLED (grade against one consistent set)
- Canonical set: GLM's A3 120k paired-key set. It is the only set cited with a single N across every bucket.
- STRIKE from the ratified text: Beam #4's mixed-N shift numbers and Inkling §4's mixed-N shift numbers. They are not wrong as measurements; they are inadmissible as gate values because their N differs from the canonical set. Replace with the A3 120k values.
- Any figure filed without its N and its denominator is not a figure (per §0).

E · Body — does it cover the thin-cell fall-through?
- Inkling §2/§3 (yards-given-class body): KEEP.
- GLM A4/A6/A7: KEEP.
- Ernie's two new items — (1) no second thin-cell fallback; (2) half-threaded plant: KEEP as named.
- Coverage of the thin-cell fall-through at "passclass.ts:79–82": UNVERIFIABLE at pin 65673a00. passclass.ts does NOT exist on architect/engine-and-seats tip 65673a00, nor on council/ernie, council/beam, or council/inkling (VERIFIED: `git show 65673a00:colors/src/sports/nfl/engine/passclass.ts` → fatal; same fatal on all four seat branches). The holes-counter-cannot-see-the-thin-cell-fall-through concern is a real design requirement, but its anchor is stale. Action for the Architect: name the actual guard site in the tree the node lands in, and add one assertion that the fallback is bounded by the level the pools node would choose (the §6 bound), never coarser. Until then this check is a PLANT-REQUIRED check, not a graded value.

F · Falsifiers required with the battery (so a PASS is not a green rubber stamp)
- Moved-anchor guard: the harness must fail loudly (exit 1, name file + anchor) if any anchor it expects does not match.
- One injected defect that the battery must catch: e.g. a deliberate 5% bucket shift; show the battery fails.
- One empty/absent-input run: show it errors, never returns green.

G · The one-consistent-set table (ratified values to grade against — values are GLM A3, N=120,000 paired keys)
| Check | Bar | N |
|---|---|---|
| A1 paired bucket ratio | ≤ 0.9× | 120,000 |
| A1 absolute floor | overall \|z\| ≤ 2 | 120,000 |
| A4 yardage-given-class spread | within stated band (Architect states the band from A3) | 120,000 |
| A6/A7 (GLM-defined) | as filed by GLM | 120,000 |
| Held-out paired delta | ≥ 2 SE | full held-out set (Architect-only) |

WHAT I RAN / DID NOT RUN
- Ran: branch-wide existence checks for passclass.ts and the held-out data (both absent). Exact commands above.
- Did NOT run: the 120k or held-out gates — no bucket-bar harness exists yet (Part 6) and no raw data in the repo. Explicitly not run, per the round rule.

BLOCKED: bucket-bar harness not built (Part 6); raw held-out data not in repo (Architect-only).
OPEN: Architect to name the band for A4 and the actual guard-site anchor replacing passclass.ts:79–82.
NEXT: (1) second seat must check this reconciliation (one seat reconciles, one different seat checks). (2) Part 6 bucket-bar must reproduce the A3 120k numbers before this battery can be graded.