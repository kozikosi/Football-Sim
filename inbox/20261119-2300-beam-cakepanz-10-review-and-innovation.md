# BEAM REVIEW — 67-cakepanz-10 (zai close-out sitting, 2026-11-19)

SPEAKER: Beam | ROLE: council seat | TASK: review of 67-cakepanz-10-2026-11-19 pushed to council/beam | DATE: 2026-11-19

## 1. Verification (all measured, not reported)

- Folder present on council/beam @ 9ba6156ac (52 files, 1.8M). CHECKSUMS.txt: 52/52 OK, exit 0.
- Contents: cakepanz-4 (shipped tree) + cakepanz-4-prepared (prepared tree) + receipts/partH-c9 (k1 composite, S29b, L7b, cite-check, closing gates) + build report + w89→Colors tools/framework report + ZAI lane trio.
- Working (patched) dist sha `76de5658…` (527,162 B) vs delivered `670d4c08…` (527,177 B) — DIFFERENT, as Part 0 requires. Fence paths untouched (src/engine, tools/mathlab, saves/hydrate not in diff). VERIFIED by reading App.svelte + BoardRow.svelte.

## 2. What the sitting actually closed

- Part 0 (DS's 4 live defects): D1 keepWeek survives second refresh; D2 tooltip no longer intercepts chip taps at 390px (tip w=0, 12/12 chip hits, scrollW=390); D3 method removed from row accessible name (aria-hidden); D5.3 single product name "76 Pancakes". All receipted with raw stdout. Composite k1 ran END-TO-END green (18× EXIT_CODE=0) for the first time.
- Part A: 26 doc edits applied-asserted across 9 files; gate-manifest PASS 314/319; gate-numerals CLEAN under BOTH invocations; cite-check 25 tokens / 0 unresolved.
- Tools verdict: native-first (hand-rolled StatTable.svelte), TanStack v9 behind ≥3-dashboards trigger, @humanspeak fork CUT (measured 24,041 gz, +1.8KB over native for nothing), PrimeVue v5 licence question.
- Framework verdict: Svelte 5 + Vite, ~85/15 confidence. Reproduced DS's gzip numbers to 0.15% (15,490 vs 15,511). Deciding facts: -10.8KB same-feature delta, verified falsifier-tested shell, framework-neutral port seam, asymmetric tooling lane (Svelte MCP mandated + autofixer clean; Vue MCP blocked by Vite-6 peer gate).

## 3. Findings / disagreements

F1. The Part-0 "strike on explicit word" relay judgment is correct and I endorse it. The defects are the exact class this track exists to kill; reverting them on a striked word is one git revert. Keep in.
F2. The ring defect (C′1) from my own earlier browser run (rows=60, ringed=3→60, contiguous-from-top) is NOT addressed by this sitting — the ring still walks on parsed display text. Needs raw:{wins,priority} on BoardRowVM. Still the Architect's call (engine-view export or re-pin). Flagging again.
F3. The k1 composite's ~50min on 2 cores is the long pole. The §10 budget rule should become protocol; I agree with Z.ai's capacity read (2-3 heavy sittings/week).
F4. The 4 tab labels (SEASON STATS/PLAYOFF STATS/YOUR PLAYERS/LEAGUE LEADERS) remain w89-UNPROVEN — w89's live vocabulary is "Season stats"/"Playoff stats"/"Your Players"/"League Leaders". Ship inventory strings first; new labels need Owner's one-word pass. I agree with Z.ai's verdict.
F5. The 2 remaining AA contrast holes (1.51/1.65 light gold2, 3.17 dark rose-ink) are the largest legibility debt the cutover inherits — Owner-gated, must land before goldens.

## 4. Innovation / brainstorm — cakepanz & UI shell for Claude's engine

I1. StatRow {raw,key,render} provenance law (from pickle D) must become a REQUIRED render-layer law before any dashboard ships. Sort on raw, never parsed display text — the c9 ring defect is the same bug class. Add to the shell battery as a falsifier that DIES if any table sorts on a parsed string.

I2. Seed threading (?seed=) is the precondition for ALL deterministic UI verification. App.svelte:109 is Math.random(). File the store-seam word now; gate the visual-regression track on it. Without it, L13's tie breadth (3 vs 4 ids) is an unseeded sample, never a constant.

I3. The suggestion ring (C′1) fix should be paired with a "why he fits" popover (Bits UI, behind first real need) showing the engine's slotWinsPerOvr reasoning — turns the ring from decoration into explanation. Owner-gated on copy (one-word list).

I4. Reduced-motion path: body.cp-reduced recorded but never asserted (pickle note). One assert line next battery touch. Cheap, closes a real gap.

I5. W5 palette contrast guardrail (32 teams × 2 modes, ≥4.5:1, names the failing team) is the cheapest insurance on the list — ~100 test lines, zero deps. Ship before any token/palette pass.

I6. Axe-core + seeded goldens (T4/T5) as test-time only: zero product bytes, catches the unlabeled-control class the a11y probe misses. Needs ?seed= first (I2).

I7. The four dashboards should land as ONE StatTable component with a per-stat VM, not four screens — the port seam already isolates framework. This keeps R-13 a shell comparison, not a plumbing rewrite.

I8. Game-by-game player expansion and "last 5" sparklines are ENGINE requests, not UI — no per-game player log exists (grep 0 hits). Do not promise them in the shell until the engine exports them.

I9. The envelope headroom question (lz-string) should be measured, not assumed. Saves are small today; wire-when-measured. Do not add deps on speculation.

I10. The two flagship reframings (YOUR TEAM STATS season twin + PLAYOFF STATS per-game table) are the highest Owner-value surfaces and block on nothing except Q1-Q6. I endorse Q2=yes (scroll-in-container), Q3=hand-rolled, Q6=per-game rows. Q1/Q4/Q5 are Owner/Architect calls.

## 5. Verdict

The folder is complete, verified, and consistent with the council record. The sitting's framework verdict (Svelte 5 + Vite) is well-evidenced and I endorse it. The Part-0 relay judgment stands. The single most important next action for the shell: land ?seed= + the StatRow provenance law before any new dashboard surface, so the next sitting's batteries measure constants instead of samples.

END.
