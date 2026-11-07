# W79 INTAKE LEDGER — the Owner's words, item by item (Z.ai, 7 Nov 2026)

Source: the Owner's IM message of 7 Nov 2026 (verbatim directive) + the two quoted
prior directives embedded in it (the salary/weight ruling; the flex-cap ruling).
Law: the Owner's words are law verbatim. Nothing below is paraphrased into new policy.

## §1 · The quoted weight ruling (earlier chat, the permanent opinion)

1.1 — "The format of this list is xM y z where x is my approximately and very rounded salary (in Millions) … y is the position, and z is the weight i am choosing to give the player and that I would like shown to the user."
1.2 — The 32-row table (40M QB 1000 … 2M P 50). Saved verbatim in tools/mathlab/salary-reference.json on architect/engine-and-seats (Owner ruling 6 Nov) and now carried inside the product as an internal reference constant.
1.3 — "The salary data should be saved internally as reference but should never be displayed to the user on the app." → ZPB_SALARY_REF lives in the engine block; zero render paths read it (asserted).
1.4 — "The weights on the right should be the default values for the model weights on the Madden Rankings page and should be the goal to adjust the engine math to." → DEFAULT_WEIGHTS and the MODEL preset now open at the Owner's table (QB 1000 scale; the QB=700 preset scale retires).
1.5 — "The Guide page should rerank the players by importance by WINS." → the Guide's value tiers re-derive from the new weights (wins per 70→90 upgrade), and the narrative text was rewritten to match the new ranking.
1.6 — "try to land the slotWinsPerOvr revealed impact somewhere around these values but you have a plus or minus 50 room for deviation." → the w79 engine now calibrates its measured slot curves per slot so the revealed impact lands ON the table (deviation 0, inside the ±50 room).

## §2 · The quoted flex conversation (facts I inherit from Claude's work)

2.1 — Claude's verified findings stand: at TE→WR −6, McBride plays WR1 in 17 of 24 lineups; the WR1/TE1 weight gap is the driver; one rule alone is whack-a-mole.
2.2 — Claude's tools (flexscan, flextune, flexcap) and results live on architect/engine-and-seats (the Owner could not find the flexcap push — FOUND: tools/mathlab/flexcap.mjs + results/flexcap10-2026-11-07.json + results/flexcap10-fixed600-2026-11-07.json, both marked EXPERIMENT, not adopted). His engine is the Colors track; my lab re-runs the same questions against the w79 shell engine.
2.3 — The Owner's verbatim flex working table of 7 Nov (_agents/owner-notes/2026-11-07-flex-table-verbatim.txt) is the base list for the cap policy.

## §3 · The flex-cap ruling (this chat's quoted directive)

3.1 — "the flex penalties are capped at -10".
3.2 — "if i called for a flex of -6, then change that flex penalty to -10. also change the -12 penalties to -10."
3.3 — "Leave all 2s and 4s the same for now. Let me know if they cause a problem somehow in the subsequent testing." → the lab reports every 2/4-rule placement of an 85+ player (reported, never driving).
3.4 — Named calls (override everything): CB→WR1 −10 · RB→WR1 −10 · TE→WR1 −10 · OG→OT −10 (Thuney) · C→OT −10 (Humphrey) · DT→DE1 −10 (Derrick Brown) · ILB→DE1 −10 (Warner) · OLB→DE1 −10 (Baun).
3.5 — "Raise TE1 value from 250 in increments of 50 until Mcbride wants to stay at TE1. Apply this same logic for … all the guys you mentioned … Leave the upper values the same (e.g. WR1 650 and OT1 500) but raise the lower position values (by increments of 50) until all 85+ players prefer to play their natural position."

## §4 · This chat's build directives

4.1 — "help design and run tests around this conversation … a really strong testing apparatus and good system so that if i want to change one player's weight, we can see the downstream effects."
4.2 — "Maybe you can think of other implications of changing weights or flex penalties and design infrastructure and testing around those ideas as well." → the lab sweeps: CPU draft emphasis, star placements, WINS totals, rankings order, flex decisions; plus a one-player weight override mechanism.
4.3 — "once you have created your own weights and set the flex penalties, update all the ui / ux showing of flex penalties and WINS and ratings and ship w79."
4.4 — "These do no not need to accurately show up in any background math that determines the game or shows up in the play by play on the during the game cinematic. But please change anything the user would see in w79 regarding weights or flex penalties to the new information."
4.5 — "The Madden rankings dropdown is super messy: please add the same buttons as the draft board and fix the drop downs to use the same order as the depth chart. Can keep the position groups."
4.6 — "For some reason on mobile when I click to one of the pages in the footer like Madden rankings or position rankings, my screen will automatically go to the bottom of the page. That's not ideal. User should default to the top of the page like any other website."
4.7 — Wave number: w79 (the Owner's counter is the truth; w77 was cutover support, w78 the flex conversation). Base = the latest product HTML on gh-pages = w76 (md5 4f363452…), verified at boot.

## §5 · Z.ai's interpretation calls (veto-flagged for the Owner)

5.1 — FLEX base: the Owner's 7 Nov list AS ENCODED by Claude's candidate JSON (the encoding the whole conversation ran on), + the cap policy (≥6 → 10; 2/4/0 untouched), + the named-call override OG→OT = 10 (Claude's flexcap left it at 4; the Owner named Thuney explicitly). QB→FS 10 kept (standing w65 law; the 7 Nov "None" row reads as "no new QB flexes" — Claude encoded the same).
5.2 — The w66 unit law (natural-first auto lineups) already blocks cross-unit star promotions ON THE SHELL; the raises are therefore driven by the shell lab's own scan, not imported from Claude's Colors-track numbers (his TE1 600 / SS 600 results were run on an engine without the unit law and are marked EXPERIMENT, not adopted).
5.3 — The engine's measured slot curves are calibrated per slot (multiplicative, shape-preserving) so revealed impact = the displayed weights; the game-day matchup model and the play-by-play are untouched (the Owner's 4.4 carve-out).
5.4 — LB4 / SS2 / FS2 are not in the Owner's table (they are extra depth spots on the real-roster pages): kept tiny at 10.
5.5 — The w73 dropdown order law said FS before SS; the depth chart reads SS then FS — the Owner's 4.5 order law wins; both dropdowns now read SS before FS.
