SPEAKER: VL | ROLE: council | TASK: P-284 | DATE: 2026-11-06T15:32:26Z

FOR: P-284 (P1) — Finalize ONE weights table: every seat sweeps all positions and recommends changes

Source: Owner-supplied, this chat (2026-11-06). "I've done a lot of salary analysis and this is what I want to save as my permanent opinion on the weights that the engine should be built around." The Owner's direct table, format xM y z (x = rounded salary in Millions for a slightly above-average starter at that position, y = position, z = weight on a QB=1000 scale). AGENTS.md §7: Owner-supplied datum; the Owner gave these values, so this filing carries Owner approval. EVIDENCE: Owner-supplied (verbatim below).

The Owner's permanent-opinion weight table (salary saved internally as reference, NEVER displayed to the user):

40M QB 1000
10M RB1 250
4M RB2 100
1M FB 25
25M WR1 650
15M WR2 400
4M WR3 100
2M WR4 50
10M TE1 250
5M TE2 150
2M TE3 50
20M OT1 500
15M OG1 400
5M C 150
10M OG2 250
12M OT2 300
25M DE1 650
12M DE2 300
20M DT1 500
10M DT2 300
5M DL5 150
12M MIKE 300
6M WILL 150
3M SAM 100
15M CB1 400
12M SS 300
12M FS 300
10M CB2 250
4M NICKEL 100
2M DIME 50
2M K 50
2M P 50

Exactly 32 slots, matching colors/src/engine/slots.ts SLOT_IDS one-for-one (QB,RB1,RB2,FB,WR1,WR2,WR3,WR4,TE1,TE2,TE3,OT1,OG1,C,OG2,OT2,DE1,DE2,DT1,DT2,DL5,MIKE,WILL,SAM,CB1,SS,FS,CB2,NICKEL,DIME,K,P). All weights integers on QB=1000 scale; QB anchored at 1000 (40M). Salary column is internal reference only (never shown in the app).

WHERE / old -> new (proposal; the Architect builds — no seat edits a protected table unilaterally):

colors/src/engine/slots.ts, the SLOTS table (ENGINE-MATH-SPEC REV 5, Owner-approved), and the Pre-Colors product DEFAULT_WEIGHTS (Football-Sim-PreColors.html line 452).

old: the current REV 5 table (QB 1000, WR1 470, DE1 520, CB1 450, OT1 430, OT2 400, WR2 330, C 320, DT1 400, DE2 400, MIKE 260, OG1 290, OG2 290, FS 260, SS 240, WILL 240, TE1 270, RB1 230, WR3 190, DT2 300, CB2 340, CB3 280, DL5 140, RB2 80, TE2 60, TE3 10, WR4 10, K 200, P 100, FB 30, DIME 40, SAM 30).
new: the Owner's table above (QB 1000, WR1 650, DE1 650, DT1 500, OT1 500, CB1 400, OG1 400, SS 300, FS 300, RB1 250, TE1 250, OG2 250, CB2 250, OT2 300, DE2 300, DT2 300, MIKE 300, C 150, TE2 150, WILL 150, DL5 150, WR2 400, WR3 100, RB2 100, SAM 100, NICKEL 100, FB 25, TE3 50, WR4 50, DIME 50, K 50, P 50).

WHY: The Owner wants ONE final weights table so the council stops disagreeing about which table is "the" table. These are the Owner's intuition-based salary weights (±25 points personal manipulation around the 40M-QB=1000 anchor). The weights on the right are the goal for the engine math: derivedWeights() / slotWinsPerOvr revealed impact should land around these values, ±50 per slot (Owner's stated tolerance). The Guide page should rerank players by importance by WINS.

HOW TO CHECK: measure derivedWeights('4-3') and derivedWeights('3-4') from colors/src/engine/value.ts (slotWins20(slot)/0.00254), normalize each to QB=1000, subtract the Owner's target, and flag any slot whose deviation is outside ±50. See the measurement report this seat files in the same session (verdict per slot, deviations, implications). Command: a standalone script importing colors/src/engine/value.ts and slots.ts (no product file is written).

SAFE ALONE?: no. DEFAULT_WEIGHTS / the SLOTS table are Owner-approved protected constants (AGENTS.md §3; slots.ts comment "Owner-approved values ... REV 5"). Any change needs Owner approval (cited: this chat) and a MERGE-MANIFEST.md re-pin in the same commit (P-013). The Architect integrates into the build. This seat only measures and recommends.

Related: VL's earlier P-284 filings (inbox/20261106-112154 and -1139) recommended impact-derived integers (QB=1000, e.g. WR1 434, CB1 568). This Owner table supersedes those as the Owner's stated final opinion where they conflict; the measurement below quantifies exactly where each conflicts with the engine's revealed impact.

Labels: table verbatim Owner-supplied (VERIFIED against this chat); slot→SLOT_IDS mapping VERIFIED (32/32 match); everything else (deviations, implications) is this seat's measurement, reported in the testing report.

Receipts: none yet (measurement script output to follow in the same session; will be quoted in the testing report).

— VL · council/vl · 2026-11-06
