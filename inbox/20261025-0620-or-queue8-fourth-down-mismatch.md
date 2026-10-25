SPEAKER: OR | ROLE: Council Adviser | TASK: QUEUE-8 4th-down rule vs on-screen copy (T-20261022-claude-4) | DATE: 2026-10-25T06:20Z

RULE CODE (Football-Sim-PreColors.html):

Lines 1973-1977 — AGGR_INFO:
- cautious: td=0.96, fg=1.08, two=0.45 — desc: "takes the field goal on most 4th downs inside the 35"
- balanced: td=1.00, fg=1.00, two=1.00 — desc: "goes for it on 4th down when it is short and the field position is good"
- aggressive: td=1.05, fg=0.86, two=1.90 — desc: "goes for it on 4th down instead of kicking. More 2-Pt Convs, more touchdowns, fewer field goals, and a few more failed 4th downs."

Line 2704 — scoreDecompositions(): const LAMBDA = {td:2.6*AG.td, fg:1.05*AG.fg, six:0.07*AG.two, eight:0.022*AG.two, saf:0.012}
Drives scoring-combo selection: higher td → more TDs; higher fg → more FGs; higher two → more 2-Pt Convs (8-pt TDs) and 2-Pt tries (6-pt TDs).

Line 2514 — 2-Pt Conv success: Math.random()<Math.min(0.9, 0.38*(AGGR_INFO[ev.ag||'balanced'].two))
Base 38% × style multiplier (cautious: 17%, balanced: 38%, aggressive: 72% capped at 90%).

Lines 2718-2731 — lateTwoPt(): trailing by 8 or 11 late in Q4 with a 7-pt TD → swaps to forced 8-pt TD (always goes for 2 late).

ON-SCREEN COPY:

Line 5082-5085 — aggrControlHTML():
"How bold is your coach on 2-Pt Convs and 4th downs?"
"How a 2-Pt Conv works: ... kick the extra point (1 point, made about 94% of the time) or run one play from the 2-yard line for 2 points (made about 48% of the time). Both are worth about 0.95 points a try... Whatever your setting, a team trailing by 8 or 11 late always goes for 2..."

MISMATCH ANALYSIS:

1. "XP made about 94%" — code does NOT encode an explicit XP success rate. pts:7 (XP successful) and pts:6 (XP failed / 2-Pt failed) are driven by LAMBDA.td (2.6*AG.td) and LAMBDA.six (0.07*AG.two), not an independent XP rate. No single code value of 94% exists. → COPY CLAIMS A RATE NOT IN CODE.

2. "2-Pt Conv made about 48%" — code base rate is 0.38 × two multiplier: cautious=17%, balanced=38%, aggressive=72% (cap 90%). No single setting gives ~48%. Only at two≈1.26 would it hit 48%. → COPY'S "48%" DOES NOT MATCH ANY STYLE SETTING.

3. "Whatever your setting, a team trailing by 8 or 11 late always goes for 2" — code line 2724 implements this exactly (forced swap to forced 8-pt TD). → MATCH.

4. Style descriptions match code direction: cautious→more FGs (fg=1.08), balanced→neutral (1.00), aggressive→more TDs/fewer FGs (td=1.05, fg=0.86). → MATCH.

RULING: Partial mismatch. Copy claims "XP 94%" and "2-Pt Conv 48%" which are not encoded as discrete code values. Code computes scoring via LAMBDA (td/fg/six/eight/saf probabilities) rather than per-play XP/2-Pt success rates. The "late by 8/11 always goes for 2" matches exactly. Style-direction claims match code.

HOW TO CHECK:
- grep "made about 94%" → found only at line 5085 (copy)
- grep "made about 48%" → found only at line 5085 (copy)
- grep "0.38\|0.9\|0.96\|1.08\|1.05\|0.86\|1.90" → found in AGGR_INFO lines 1975-1977 (code)
- Compare: 0.38×1.00=38% ≠ "about 48%" claimed for balanced; no 94% value in code

SAFE ALONE?: YES — read-only investigation, no product edits.