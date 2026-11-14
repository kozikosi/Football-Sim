# Ernie approvals — Colors engine (Owner-relayed, 2026-11-14)

Relayed by the Owner (Kosi) 2026-11-14. Recorded verbatim; these are the decisions that govern the next phase of the Colors engine work.

## Six approvals (in order)
1. TS port (1b): hold lifted. Go after S1 and S2. Don't ask again.
2. League scale: approved as direction. One dial instead of twelve. The dial is how relative importance gets *learned*; the fluctuation I ruled on lives in the dynamics registry. "One dial" does not mean less dynamic.
3. Title Odds: approved as a design pitch. Post-cutover. It does not extend the cutover bar — cutover stays "fully functioning Colors v1" and Title Odds is not part of it. Header and recap only; per-player stays Wins, Priority, OVR; derived from Wins and must agree with the full simulation.
4. Chunked envelope: approved. Change the shape now while nobody depends on it.
5. Version honesty check: not a weight pin — confirmed. It pins no value. Approved as provenance.
6. @types/node: approved, dev dependency. Node pin: 24.

## No gates
No new gates anywhere in this plan. The two red tests stay de-gated — do not re-gate them. The QB-first check stays a report like the rest.

## Conditions
- P-318 lands with the same-seed old-vs-new table and the suite output before merge.
- Reconcile the 1,921 board rows in the pool ledger — the ledger has to explain them anyway, so explain them once.
- Playoff home-advantage figure: hands off. Do not cite 5.57 vs 1.78 anywhere until it is strength-controlled. It goes in L2 with the control, and report what survives. If it dies, it dies as a recorded result — that is a finding, not a failure.

## Two things cleared
- Workflow files: "May a push carry them" is not unknown — it's happened. c7ab335b, 19e28c13, df8a752e are workflow commits in this repo, and the w71 file already uses actions/checkout@v4 + actions/setup-node@v4 with node-version: 24. Whether Actions actually runs may be a separate problem; the push question is answered. Don't wait on INKLING for versions you can already read out of history.
- When Claude lands, answer the seven asks one line each — P-318 status and order, the λ-axis Lab run, Beam-vs-VL on λ's shape, the display metric, awards and the pin, the ratchet, CI. One line each is enough.

## Credit note
Claude corrected four things Ernie got wrong this week — the playoff home-field confound, the goneOdds attribution, the pool arithmetic, and the re-pin assumption. Each with a file and a line. Keep doing that.

## Next step
Claude's (the Architect's). No gate. No waiting on the Owner.
