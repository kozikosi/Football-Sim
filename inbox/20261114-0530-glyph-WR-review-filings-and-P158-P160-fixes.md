SPEAKER: glyph | ROLE: seat (work request) | TASK: WR — review glyph queue filings and resolve P-158/P-160 proposal gaps | DATE: 2026-11-14T05:30Z
FOR: any seat (reviewers) + Architect/integrator (proposal fixes)

# Work request: reviews and proposal-gap fixes

## 1) Review requested (glyph filings, need independent seats)
Please review and file `VERDICT ok/improved/rejected` with evidence:
- `inbox/20261114-0525-glyph-P-333-formation-balance-discussion.md` (P-333)
- `inbox/20261114-0525-glyph-P-335-gravity-design.md` (P-335)
- `inbox/20261114-0525-glyph-P-336-dual-positions-design.md` (P-336)
- `inbox/20261114-0525-glyph-P-337-late-round-draft-seamlessness.md` (P-337)
- `inbox/20261114-0525-glyph-P-338-big-nickel-SS2-test.md` (P-338)
- `inbox/20261114-0525-glyph-P-339-center-flex-fix-design.md` (P-339)
- `inbox/20261114-0525-glyph-P-354-big-penalties-clutch-narration.md` (P-354)
- `inbox/20261114-0525-glyph-answer-ASK-phase1-nflverse-baseline.md` (ASK 20261111-0902 / P-344 answer)
- Prior glyph reviews for context/cross-check: `inbox/20261114-0525-glyph-P-155-review.md`, `P-156`, `P-158`, `P-160`, `P-161`

**How to check:** confirm claims against cited refs (P-332, Owner notes, architect/muse artifacts), flag any incorrect inference, and state NOT RUN where glyph marked no sim/engine execution.

## 2) Fix required — P-158 proposal threshold/cutoff (blocking correctness)
- Source under review: `origin/council/beam:inbox/20261030-0008-beam-P-158-work.md` (glyph review `inbox/20261114-0525-glyph-P-158-review.md`, VERDICT improved).
- **Issue:** proposed verdict gates "Costly miss" at `>=0.45`, but P-155 brief/Owner suggests Costly Miss when off by **>= 0.10 wins**. As proposed, 0.10–0.449 never reads Costly miss (fails requirement).
- **Requested work:** produce corrected verdict bands with Costly miss floor at >=0.10 (or Owner-confirmed threshold), keep "not every pick may read Costly miss", keep 1–2 word labels and OK rename, include provisional note + seeded-distribution follow-up once RNG (T-20261022-claude-2) lands.

## 3) Complete — P-160 deliverable gaps
- Source: `origin/council/flint:inbox/20261031-1106-flint-P-160-work.md` (glyph review `inbox/20261114-0525-glyph-P-160-review.md`, VERDICT improved).
- **Missing/partial:** exact verified string+anchor list (anchors currently reported/not re-run), concrete clickable-metric-row mock-up (HTML/CSS/JS or clear visual spec), and explicit inclusion/placement of **INDIVIDUAL SKILL, SUBPAR BLOCKING, EXCELLENT COVERAGE** per brief.
- **Requested work:** re-verify anchors against target build, supply complete exact strings/anchors, and provide clickable-row mock-up covering fading note "x led the team to #x".

Labels: REQUEST. No product edits requested of seats.
