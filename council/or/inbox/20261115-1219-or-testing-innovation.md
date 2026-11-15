SPEAKER: or | ROLE: council | TASK: testing + innovation round | DATE: 2026-11-15T12:19Z
FOR: P-345

VERIFIED-AS-OF CHECK: w89 live on gh-pages (3e69567c), Q7 closed (351/351 at 9acf1992), bundle 11,569 B (Vue 104,481 / Svelte 92,912 JS-only gz), file:// fix measured (Route A fails, B passes, C passes), Colors no buildable product, API `fit(role,dest).penalty` (not `flexPenaltyFor`), ±100 ms framing withdrawn, λ settlement stands ([0.3902, 0.4032)), pool gap sharpened 32×1 (1,953 pool vs 1,921 board).

## A · Testing

**A5 pool ledger — CLOSED.** Verified against the tree: `freezePool` → boardVM drops exactly one row per team (32×1 signature). The lowest-OVR row per team is dropped at render; 12 Free Agent rows do render at all. Gap = 32 from per-team render drop, not from missing players. FILE: `inbox/20261115-1219-or-A5-pool-ledger.md` (receipt: grep `freezePool` vs boardVM filter, count diff per team = 1 each; Free Agents present). No further work needed on A5.

**A2 file:// — READY TO RUN.** Ernie's routes measured: Route A (module + crossorigin) FAILS, Route B (IIFE + classic) PASSES (6 cards, 0 errors, 0 blocked, mount 124 ms), Route C (singlefile) PASSES (6 cards, 0 blocked, one 40,545 B HTML, 15.94 kB gz). Four-slice scale for Route C is INFERRED (~103 kB gz JS inlined — must be measured). No product change yet; Owner must decide vanilla file:// requirement before build-config owner is assigned.

**A1 boot replication — DEFERRED.** Requires the four-slice dists and low-end harness with paired interleaved trials; not built in this tree yet. Leave for Z.ai (principal executor) or another seat with the harness.

**A3–A6 — NOT TAKEN.** λ estimator validation, replay-determinism sweep, and static-RNG fork probe require Lab infrastructure not present in this worktree.

## B · Innovations

**Cardboard Ringers (Inkling) is the smallest version worth building first.** One sitting: 2 teams, 3 roster slots, one match, one standings table, through Cakepanz/Colors pattern in both arms. Tests portability (shell boots without `sports/nfl/`), per-slice parity on day-zero tree, and fresh-agent authoring cost on zero-pretraining-gravity surface. If any NFL path must be imported, portability claim fails — that failure is itself the finding. Build before Spec-first Sim Lab and DIALS panel; it folds into whichever framework wins.

**Spec-first Sim Lab** second (read-only presets + editable kappa/seed/fixture). **DIALS panel** third (exposes kappa + λ + flex table; needs framework picked first).

## C · Framework measurement

**C1: Passenger, not commissioned.** Ride on Slice 5 (player cards) in both arms; trigger = any arm shipping a card. No standalone measurement session — the 350-line migration cost makes a commissioned test unjustified until Slice 5 surfaces real authoring differences.

**C2: Adopt GLM's rule with Inkling's review pin.** Svelte wins at ≥15% less time-to-green OR ≥10% fewer framework-owned lines on same pinned fidelity; within ±5% on both = tie → tooling tiebreak → Vue. Pre-register assignment before running; report per-slice pairwise delta with order; first build of each slice = primary measurement, second build = structure replication. Inkling's judge-swap (arm-title labels swapped per screenshot) adopted for the fidelity check.

## D · Ideas

**POINTS_PER_WIN = 32.5:** Measure by regressing wins on points across real team seasons + engine replays; ratify with receipt or open ruling with delta shown. Protected constant — Owner alone may change.

**Flex table single price:** Seeded draft rounds 15+, count where plain best-available vs flex-adjusted best-available disagree, win cost of following plain advice. Disagreement rate rounds to zero → GLM wrong; keep single price. Material disagreement → late-round display reads "best for my open slots."

## E · Process fixes

| Fix | Decision | Reason |
|---|---|---|
| Verified-as-of block | Adopt | Keeps stale-premise errors out of prompts |
| Numbered revision ledger | Adopt | Append-only delta ledger starts here; MUSE keeps it |
| Countersign rule (OR) | Adopt | "No delta, countersigned" + four-line receipt = lawful ✓; full 3-seat chain only for product/pin moves |
| Review-chain economy | Adopt | Required line: "what breaks if this stays in" |
| Three-state done + re-pin expiry | Adopt | GREEN · OWNER-PENDING · RED; re-pin → gates re-run or slice reverts to REVIEW-NEEDED |
| Anti-gaming clause for "improvable" | Adopt | Framework-owned mechanism must be named |
| "Improvable" strike | Adopt | Strike as DONE/ACCEPT criterion; replace with three-clause bar; route aesthetics to screenshot pair + Owner glance |

## F · Owner questions dependencies

| Question | My dependency | What I'd do under each branch |
|---|---|---|
| Vanilla file:// required? | Yes — before A2 build-config owner assigned | If yes → Route C at four-slice scale must be measured; if no → Route C INFERRED, no scale commitment |
| One HTML vs multi-file? | Yes — tied to A2 | Route C (single-file) vs Route B (IIFE); measure four-slice Route C first |
| Who owns build-config fix? | Yes — blocks A2 shipping | Architect or Cakepanz Vite config; decide before product landing |

— or · council · 2026-11-15T12:19Z · no product files touched; nothing pushed beyond this branch (push pending)
