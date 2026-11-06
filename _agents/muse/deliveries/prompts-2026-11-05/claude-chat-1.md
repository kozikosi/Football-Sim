# Claude prompt — chat 1 (rewritten from scratch, 2026-11-05)

Send after the w74 read. Chat 2 follows once this one lands.

```
Continue.

The two Project files are deleted and the instructions are replaced, as you asked. Figma is NOT available (paywall). The w74 read is done — Kosi read it and answered the 9 questions plus a 10th order. This chat is the work that was already queued in NOW.md, plus a small cleanup. The w74 rulings are the next chat, not this one.

New from me this chat:
1. Work NOW.md NEXT in order (P-262, then tsconfig + tsc), reporting the hash after each.
   - P-262: fetch origin/council/muse, take `_agents/muse/deliveries/P-262-sweep.ts` and the proposal `inbox/20261105-2113-muse-P-262-sweep-bands-patch.md` (Beam reviewed ok, 7 hunks). Replace `colors/tools/outcomelab/sweep.ts`, run a small-N smoke run, push, report the hash. Do NOT decide the 2 flagged points: ≤4-wins centre 4.6 vs 4.5; home-win report-only.
   - Note on parity: the patch's parity band (3.07 ± 0.35) is the REAL-NFL reference, not the engine target. Kosi now wants the engine's win-SD HIGHER than real NFL (clear losers + at least 3 other top teams), with the target derived by the Lab from the skilled-success percentages. Land the patch as-is (the reference bands); the engine parity target is a separate Lab derivation. Do not re-litigate the bands.
   - tsconfig: Z.ai drafted one in w74/04-contracts-fixes/ (tsconfig.json + contract fixes; contracts 0 errors, 301 pre-existing errors named in TSC-REPORT.md) — review and land the tsconfig draft, do not write one from scratch. Land the tsconfig only; do not land the contract fixes in 04 yet — those need the F1 ruling, which is the next chat. Report the tsc result (pass, or the errors only).
2. Lean cleanup, same chat:
   - Move the repo-root V22-Suggestions.md (324K, frozen history, zero PRIORITIES.md rows cite it) to _archive/v22-suggestions.md. Do not split or rewrite it.
   - Fix AGENTS.md line 149 (your branch): Figma is NOT available. Delete the sentence "Figma is available to the Architect: hand him a palette, a state list, the data and what each screen must say." The boot doc already says NOT available; AGENTS.md must agree.
   - Fix the "Only Claude builds Football-Sim-*.html" line in the Project boot doc: the product is now a Svelte app, not a single HTML file. Reword it to "Only the Architect builds the product."
3. Do not run the digest — this work does not touch the queue.

Heads-up (not a task this chat): the old-shell deletion is APPROVED (Owner). Nothing is deleted in this chat — the deletion is timed at cutover, anchored on the LATEST wave before 76 Pancakes is finished (not w70), with an archive tag. And the product naming is converting to 76 Pancakes where it makes sense (that's the next chat).
```
