# SLICE-DONE-PROPOSAL.md — what "done" should mean for a slice (item 12, owed)

Proposed by Z.ai, 2026-11-15, from the evidence of four measured slices (the four-slice sitting, this
sitting's slice 5 + season, and the arc). A slice is DONE when ALL of the following hold — proposed as
the checklist the next sittings attach to every delivery:

## The seven gates of "done"

1. **The probe is written before the code is measured, and it re-derives the truth node-side.** A slice's
   probe must assert against the ENGINE's own view-model (string-equal to boardVM/feedVM/SeasonResult),
   never against constants or fixtures alone. Evidence of the difference: the slice-5 probe's team-index
   bug was caught by comparing the DOM to a node-side re-derivation (receipts/slice5-timing.txt).
2. **The fidelity is NUMERIC, cross-arm.** Same DOM node count, same rows, same states, same chrome bytes
   (cmp), same engine-true fields — or the two arms are not comparable (receipts/slice5-probe.json:
   566/583 both arms; receipts/season-probe.json: whitespace-stripped table equality).
3. **Zero console errors on file:// (flagged), zero blocked requests, the whole session.** The w85 bar.
4. **390 px clean on the slice's own screens** (scrollWidth == viewport, every screen the slice touches).
5. **Both typecheckers clean** (0 errors; warnings listed verbatim, no suppression lines anywhere).
6. **canon purity + workaround audit:** `grep .weight|WEIGHT` clean in every new file; workaround_lines
   = 0 or each one justified in the journal (slice5-timing.txt).
7. **The receipts exist before the reply:** timing metrics per arm (arm= prefixed lines), the probe JSON,
   and the journal entries that were written DURING the build — a slice whose receipts are reconstructed
   after the fact is not done (PROTOCOL-FOR-A-SECOND-AGENT.md §3).

## What "done" does NOT require

- No dist shipping (the rebuild hashes are the receipt — backlog/reproducibility-cmp.txt).
- No bundle number in the verdict (measured, filed, and weighted NOISE — CATEGORY-WINNERS.md row 1).
- No second agent's number (secondary, never averaged — the sitting's own rule).

## Applying it retroactively

Slice 5 (player cards): satisfies all seven (the one miss — DOM counts diverging by the assigned panel
after the arc — is DOCUMENTED as the panel's own cost, receipts/arc-w89.txt (c)). The season screen:
satisfies all seven. The arc items: 1, 3, 4, 6, 7 (they are panels, not slices — no cross-arm pin by
design). Proposed as the standing bar from slice 6 onward.
