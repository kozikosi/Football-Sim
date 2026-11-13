SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.7 — cross-side stars (bent toward the Owner's ratified rule, as directed) | DATE: 2026-11-13T22:22Z
FOR: P-345 · the Owner · the Architect · INKLING (whose Claude order hosts the design)

**Position in one sentence (REPORTED + INFERRED):** I adopt the Owner's ratified rule verbatim as the design frame — **opposite-side entry at price ≤ 6 (the normal flex band, the 12-tier punishments excluded), only in clutch (final 5:00 of Q4) or overtime, CPU gets the same call, "2-WAY" badge on the event** — and this filing adds the three mechanics that make it a real decision instead of a gimmick.

## The design, inside the ratified rule

- **Which stars, which windows (verbatim-bound):** the final 5:00 of Q4 and overtime ONLY, no cross-side use outside those windows. The natural menu, in decision order: the Hail-Mary defender (your WR1 on the deep ball — the ruling's own example), the goal-line stopper (a DT1 as the short-yardage FB on defense's goal-line stand), the OT returner variant. Each is one row in the same data-driven pattern D.1 uses (`CROSS_SIDE` table: who, which window, what the badge says) — the rule's windows are fields, not if-chains.
- **What it costs (fixed, per the flex-consistency ruling):** the price is the player's normal opposite-side flex price — already computed, already consistent, already ≤ 6 by the rule's own gate. No new number is invented; if a star's opposite-side price is 12 (punishment tier), the rule excludes him and the UI shows no card. The cost story stays static through the year, exactly as the flex ruling demands.
- **The CPU gets the same call (verbatim):** the CPU's decision is a fixed policy function of the same context the user sees — `cpu_two_way(state, roster) → stage|pass`, symmetric by construction, seeded by the game seed like every CPU decision. My default policy: stage the two-way only when the alternative is surrender (trailing by >1 score in the window) — the dramatic, fan-legible case. Same policy for both sides.
- **What keeps it a real decision (the anti-gimmick, three mechanisms):** (1) **the price is real** — flexing the WR1 to defense costs his opposite-side price and removes him from the offensive call in that window; the decision has an opportunity cost, not a free button; (2) **the window is scarce** — it exists only in the exact minutes the game is decided; (3) **the outcome is uncertain** — the badge stages the attempt; the sim decides it (a Hail Mary WR1 interception of a Hail Mary is a *simulated outcome* with seeded probability, not a scripted event).

## The user-facing indicator (verbatim: "the user-facing indicator is a simple '2-WAY' badge on the two-way event... exact visual is the UI's call")

- Badge: "2-WAY", uppercase, no period, on the clutch card (D.6's host) and on the event line in the feed ("Hail Mary up — 2-WAY: WR1 trailing on the route"). Two surfaces, one badge, one string — consistency inside the new surface too.
- The D.6 interplay (required explicit statement): the clutch visual hosts the badge as a stageable action; if the pairing is rejected, the badge ships standalone and D.6 loses one line, not the design.

## Receipt

- The ruling itself is REPORTED (Owner, 2026-11-13, ratified — recorded in the work order §1.5).
- The mechanics are design (this filing). The mechanical substrate already exists and is VERIFIED in the contract: the flex penalty machinery (`flex.ts` — `EMERGENCY_PENALTY`, role legality) prices opposite-side moves today; the rule reuses it with a window gate. No engine edit proposed by me — the landing is the Architect's (per the standing lane rule).
- The test once built: seeded clutch windows across 1000 seasons — (a) how often does the CPU stage (policy sanity: rare, dramatic, not every clutch game); (b) does the two-way event change W-L beyond noise (if it does, the price is wrong — it should be a coin-flip garnish, never a strategy).

## Failure mode

- **The every-week gimmick:** if the CPU stages it in every clutch game, the badge stops meaning anything within three user seasons. Guard: the policy gate (trailing by >1 score only) makes it a comeback story; log the stage rate as a regression pin (target band ~5–15% of clutch games, tuned once by the Owner's eyes).
- **The ratings-law leak:** a WR1 intercepting must not quietly create a defensive ratings entry — the two-way event borrows the flex penalty path (the priced, consistent one), never writes new ratings. Guard: one code path, asserted in the change-report.

## The Owner-question it carries

Is the price **charged visibly** (the badge shows "costs 6") or **silently** (the flex already happened when you press)? My default: visible, one word — the user should know what he is spending in the moment; it teaches the flex economy for free. Consequence of silent: the user discovers the price on his recap and trusts the badge less.

Cross-references: Ruling 5 (verbatim frame — this filing bends toward exactly that), D.6 (the badge host), flex-consistency ruling (the fixed price), P-142-adjacent (emergency legality path cited by INKLING's Q7 row 11).
