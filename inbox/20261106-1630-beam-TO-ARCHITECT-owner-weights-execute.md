TO-ARCHITECT: execute Owner-final weights implications (P-284)

Owner directive 2026-11-06: apply the implications from Beam's P-284 report. Exact change set below. Protected constants involved (DEFAULT_WEIGHTS, RATING_SPECS/DEF_SPECS/PERS_REC, MC) require MERGE-MANIFEST.md re-pin in the same commit (AGENTS.md sec.3). Fit artifact: _agents/beam/data/fit-owner-2026-11-06.json.

------------------------------------------------------------
A. DEFAULT_WEIGHTS (line ~452, Football-Sim-PreColors.html) — replace object
------------------------------------------------------------
OLD:
const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 80, "TE2": 20, "OT1": 295, "OT2": 295, "OG1": 295, "OG2": 295, "C": 295, "DE1": 350, "DE2": 350, "DT1": 320, "DT2": 300, "DL5": 5, "MIKE": 100, "WILL": 100, "SAM": 60, "LB4": 5, "CB1": 350, "CB2": 295, "CB3": 80, "CB4": 20, "SS": 80, "SS2": 5, "FS": 60, "FS2": 5, "K": 5, "P": 1, "FB": 1};

NEW (Owner's 1000-scale table; depth slots LB4/CB4/SS2/FS2 kept tiny; FB=25 retained per Owner despite tens convention):
const DEFAULT_WEIGHTS = {"QB": 1000, "RB1": 250, "RB2": 100, "WR1": 650, "WR2": 400, "WR3": 100, "WR4": 50, "TE1": 250, "TE2": 150, "OT1": 500, "OT2": 300, "OG1": 400, "OG2": 250, "C": 150, "DE1": 650, "DE2": 300, "DT1": 500, "DT2": 300, "DL5": 150, "MIKE": 300, "WILL": 150, "SAM": 100, "LB4": 5, "CB1": 400, "CB2": 250, "CB3": 100, "CB4": 20, "SS": 300, "SS2": 5, "FS": 300, "FS2": 5, "K": 50, "P": 50, "FB": 25};

Display scale: use Owner's 1000-scale values verbatim (linear weights; ranking unaffected by absolute scale). modelWeights() contract stays 700-scale (QB=700, nearest 5, floor 5) per AGENTS.md sec.3.

------------------------------------------------------------
B. Engine math (RATING_SPECS/DEF_SPECS/PERS_REC/MC) — apply fit
------------------------------------------------------------
Recommend applying the snapped composition weights + MC knobs from fit-owner-2026-11-06.json (fitlm converged 0.2% rms, 0 page errors) so slotWinsPerOvr revealed impact lands within +/-50 of the Owner's table. This is the Owner's stated goal ("land somewhere around these values, +/-50"). Alternative: keep current engine and change only the display default (leaves modelWeights() button showing quantised revealed impact, which differs from Owner's numbers — visible inconsistency). Architect's call. If applied: re-pin RATING_SPECS hash in MERGE-MANIFEST.md same commit. realcheck impact: r 0.672 -> 0.635 (E4 still passes).

------------------------------------------------------------
C. Guide ranking by WINS — VERIFIED, no change
------------------------------------------------------------
valueTiersHTML() (line 4982) already sorts by `slotWins(s,90)-slotWins(s,70)` (revealed wins), not weights. Guide already ranks by importance by wins. No edit needed. Verified by grep.

------------------------------------------------------------
D. check-design tens convention
------------------------------------------------------------
FB=25 breaks the "ends in 0" rule in tools/mathlab/check-design.mjs. Either round FB to 20 or 30 in DEFAULT_WEIGHTS (within +/-50) or relax the rule to allow 5-unit steps. Recommend relaxing to 5-unit (Owner explicitly chose 25). If kept at 25, update check-design to allow multiples of 5.

------------------------------------------------------------
E. Salary data
------------------------------------------------------------
Salary data stays internal reference only (_agents/beam/data/owner-weights-2026-11-06.json + inbox report). Must never be shown in the app. Confirm no salary strings leak into UI.

— Beam · council/beam · 2026-11-06
