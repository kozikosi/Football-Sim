# tasks/CRITIQUES-DIGEST.md — digest of the relayed colleague critiques (19 Oct)

**Provenance.** The user relayed the tail of the last Claude chat: several colleague critiques (notably **Grok**, not one of the five rostered sessions, plus older-session batches) and one stale implementation-session report. They mostly target the **pre-Season-first builds** — `(7)`/`(8)`/`(9)`, ~6,367 lines, different function positions from today. Line numbers and several claims are therefore **stale for build `77bb9ed5…`**. This digest maps stale vs live so the implementer's master document can absorb what's real without re-diagnosing old files. New user items live in `tasks/ROUND-1-USER.md` (U-01…U-22).

## Verified stale (already built or fixed in the current build — do not re-litigate, verify only)

- **Standings tiebreaker gaps** (missing division/conference records, point-diff too early, three-way circle) → the standings chain was built (T7; `sortStandings` implements H2H → division → conference → point diff; invariant 8).
- **Schedule generator fragility** (3,000-try throw, no recovery, home games 6–12, conference imbalance) → schedule constraints + retry built (T8).
- **Random record-cap subtraction** (cap − fork(0–34), non-deterministic clipping) → deterministic two-layer caps (per-game cap + cap-at-accumulate; the S-000 example cites the shipped fix).
- **Narration strings**: "sudden death" (0 hits), the "went the distance" grammar, the singular "Kansas City Chiefs wasn't in this round", the three "best flexed player out-values…" lines, the Guide intro block, the footer "MORE" grouping, the false "second meeting" look-ahead — all 0 hits on the 19 Oct text check.
- **100-season cancel button** — listed as built in the Season-first lineage (verify on the next playtest; not a work-order item).

## Verified live or standing (real value, current build — where the old critiques are still true)

1. **Persistence is absent.** 0 hits for `localStorage`/`sessionStorage`/`IndexedDB` — a finished draft or week-12 season dies on reload ("nothing survives a refresh" is still literally true). The old sessions ranked this their #1 product gap; the user received it as a genuinely new fact → **U-21**.
2. **One-game coherence** (score, stat line, and recap are three stitched simulations; OT as a walk-off add-3/7) → partially stands. The user's U-14 asks for modern OT rules; the deeper single-generator rewrite remains the biggest standing architecture theme for the master doc.
3. **CPU draft spread mechanism** (top-16 consideration, one shared win table, 76 floor, uniform deep "misses" that never actually deny good players) → now fully specified by the user: **U-12** (round-1 ≥90 OVR outside a QB run; within ~8 OVR of the top player remaining; best-in-group for early low-tier positions; Reichard/Smith/Greenard repro cases; target: user reliably a top-5 team).
4. **Awards text vs code** (OL honors footnote claims pancake/sack-allowed stats that don't feed the award score; role bonuses double-count OVR) → not yet user-triaged; master-doc candidate.
5. **Weights audit** (kicker above RB1/WR2) → **U-13**, conditional user approval on evidence; optional GPT second opinion.
6. **The user's own small-item set** → U-01…U-11, U-14…U-20 (defaults, layout, copy, bugs).
7. **Advanced-stats direction** (the two attached sack documents as the flavor) → **U-22**, standing design directive for the master doc.
8. **Other themes with merit, not yet user-prioritized**: seeded RNG (their highest-leverage infra lever; natural Round-2 pairing with the harness), letter-grade calibration, draft-board explain-its-recommendations, schedule-formula realism (randomized-vs-NFL-slate choice, now partially constrained by T8), starter-only depth-chart data hygiene (thin-team 70-fills), 100-sim lite perf path, mobile observer/render costs, accessibility basics, win-probability graph, model-diagnostics tab (feeds U-22).

## For the master document (Claude, pending request)

Fold in: the layered working model (Claude owns philosophy/math/architecture and rulings; sessions research, implement parts, and test across rounds — the per-round split is Claude + user to set), the evidence discipline, the U-series as the current work order, this digest's live list, and the standing directives. Nothing here overrides `AGENTS.md`; where draft disagrees, it argues and the user rules.
