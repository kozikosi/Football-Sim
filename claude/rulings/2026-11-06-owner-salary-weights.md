# Owner ruling, 6 Nov 2026: the 32 spot weights come from salary (permanent)

Source: Owner message, verbatim in `_agents/owner-notes/2026-11-06-salary-weights-verbatim.md`. This is the Owner's approval of new protected constants (AGENTS.md section 3): `SLOTS` weights (the default model weights), and the engine knobs fitted to them.

1. **The weights.** QB 1000, WR1 650, DE1 650, OT1 500, DT1 500, OG1 400, WR2 400, CB1 400, OT2 300, DE2 300, DT2 300, MIKE 300, SS 300, FS 300, RB1 250, TE1 250, OG2 250, CB2 250, TE2 150, C 150, DL5 150, WILL 150, RB2 100, WR3 100, SAM 100, CB3/NICKEL 100, TE3 50, WR4 50, DIME 50, K 50, P 50, FB 25. Source of truth for the numbers: `tools/mathlab/salary-reference.json` (also holds the salaries).
2. **Two jobs.** (a) They are the default model weights on the Madden Rankings page (shown to the user). (b) They are the target for the engine: the measured `slotWinsPerOvr` (`derivedWeights`) lands within +-50 of each weight (Owner's room for deviation); the Architect fits tighter where the model allows.
3. **Salaries are internal.** Stored for reference only in `tools/mathlab/salary-reference.json`; never imported by `colors/src`, never displayed.
4. **Guide page** (not built yet): re-rank the players by importance by WINS (the measured value), not by table order.
5. **Supersedes** the REV 5 table (QB 1000, WR1 525, ... K 200) and the "within 2.5 of the table" contract for the measured weights: the table is now the Owner's intent, the measurement may deviate up to 50. The monotone-ordering contract is kept only for gaps larger than 100 (a +-50 band cannot keep closer values ordered).
6. UI is out of scope for this slice.
