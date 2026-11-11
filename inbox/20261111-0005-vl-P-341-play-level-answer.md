SPEAKER: vl | ROLE: council seat | TASK: Should the engine go play-level (P-341)? | DATE: 2026-11-11T00:05:39Z
FOR: P-341

# Answer: should the engine go play-level?

**Short answer:** No — not as a replacement for the drive-level engine. Play-level does not eliminate the derivation headaches; it relocates them into a personnel model (who is on the field each play) and an attribution model (who gets credit for what). The engine still cannot "generate the math itself" — someone still has to decide what counts as valuable at play level and map that to prices. The lower-risk path is a play-level VIEW on top of the drives, used to measure participation and test the current formula in the sim (the one thing play-level genuinely adds: snap counts).

## What is verified in code (Football-Sim-PreColors.html, sha256 40233d6be00e987c, the current verified build)

- Drive-level engine confirmed: `matchupModel()` (line 2100) computes expected totals from unit ratings; `simulateGame()` (2286) / `playGame()` (3479) / `simulateCurrentWeek()` (3543) generate games from those totals; `generateGameSummary()` (3109) allocates to the boxscore. `slotWins()` (1341), `slotWinsPerOvr()` (1346), `modelWeights()` (459), `effOvr()` (978), `optimalLineup()` (1206) all exist. — VERIFIED (grep, function locations above)
- No per-play state: no `down`, `distance`, `fieldPosition`, `snapCount`, or `playLevel` anywhere in PreColors.html. — VERIFIED (grep returned no matches in that file)
- No per-player snap counts: the engine allocates stats from drive totals but does not track how many plays a player was on the field. A delivery doc from another seat explicitly notes "a snap model that does not exist yet" for snap counts. — VERIFIED (code) + REPORTED (delivery doc comment)
- The comment at line 2435 ("scaled by how much each one is actually on the field") shows allocation is heuristic, not measured snap data. — VERIFIED

## 1. Would play-level eliminate the headaches, or move them?

Moved, not eliminated (INFERRED).

- C>OT: at drive level the fight is ability 6 vs Owner 12 (value ladder vs ability layer). At play level it becomes: does a center actually get beaten one-on-one by a tackle in the play model, how often, and what EPA penalty does that carry? The same disagreement reappears as "how much does the play model penalize a center at tackle?" — still philosophy-to-math, now with less stable data to calibrate against (plays are noisy; drive totals are stable).
- Fullback / socialism: the Owner's point is exactly right — "the fullback only plays a few plays" is English knowledge the engine lacks (VERIFIED: no snap counts). Play-level would finally give the engine snap counts, so socialism (flex values reduced both ways for a one-good-player unimportant role) becomes *measurable*. This is the one genuine gain of play-level: you can measure FB snap share and price FB moves accordingly instead of guessing (FB>RB guard currently 18 vs Owner 2).
- Valuing new roles (SS2, DL5 blitzer): at play level these become "demands the play model places on a body" — you still have to author what an SS2 or DL5 does on a play. No emergence: the engine cannot know a new position's requirements (Owner Q18/Q19 clarification). Rebuilds the same hard part.

## 2. Are we starting from zero?

Partially (INFERRED; existence of the pieces VERIFIED above).

Transfers:
- Slot concepts, duty tables, matchup model, OVR+position-only input principle, measured slot values/slotWins as anchors, the 99 as a guide (not target), the ±5 acceptable-error bar, no named exceptions/no floor direction.
- Calibrated numbers: the drive engine's unit ratings and slot values carry over as priors for play-level tuning.

Rebuilds:
- Per-play state (down, distance, field position, clock) — none exists (VERIFIED).
- A play generator consistent with drive totals (the view) or a play model that determines drives (the rebuild).
- A personnel model: who is on the field for each play, including flexed players and snap shares.
- An attribution model: who touched the ball, who made the stop, credit assignment per play.
- Snap counting and play-level stats (EPA, success rate).
- New calibration target: plays instead of drives; recalibration of team values and flex prices against play-level outcomes.

## 3. Is the view enough, or does it move the translation?

The view is enough for participation stats (snap counts, touches, EPA per play). But it does NOT let the engine "generate the math itself" (INFERRED):

- The drive stays authoritative; the plays are generated to fit it, not the other way around. The engine sees what it produced — circular if you then derive values from those same plays.
- The personnel model (who's on the field) and attribution model (who gets credit) are themselves translations of football knowledge into a model — the same translation problem, one level down.
- The view adds error containment: a bad play model cannot break the game score because the drive outcome is fixed. The full rebuild bets the game on a play model reproducing drive totals — recalibration required, protected constants unsettled.

So: the view moves the translation into personnel/attribution models, but contains the risk. It is the right shape if adopted.

## 4. Path and measures

Path (INFERRED proposal):
1. Build the play-level view on top of PreColors drives: down/distance/field position inside each drive, play sequence summing to the drive total, personnel on field per play. Keep matchupModel authoritative.
2. Measure: (a) engine snap counts vs real football snap shares (test the "FB only plays a few plays" premise behind socialism); (b) centers staying at center in the lineup optimizer under the current 99 — the Owner's real test for C>OT (Q11: "C>OT at 6 is fine unless centers constantly flex to OT"); (c) value ranking from play outcomes vs the 99 as guide; (d) whether play-level attribution reproduces the measured slot values (slotWinsPerOvr, modelWeights).
3. Only after the view proves participation is derivable, consider whether flex prices can drop out of play outcomes — and only if a definition of "valuable" (EPA? success rate?) is chosen by the Owner, because the engine cannot choose it.

What would tell me it is working: (1) snap shares match real football (FB small, WR1 high, etc.); (2) centers do not constantly flex out under the current table; (3) play-derived role values rank slots the same way as slotWins20/Wins. Any one failing means the play model is not yet ground truth.

Exact drive count per team (~11.5) is not in the code — UNKNOWN whether it holds in PreColors.

## 5. Can the engine generate the math itself?

Not without a human-chosen target (INFERRED). Flex prices are a mapping from "what a move costs" — that is a definition of value, not a discovery. Even at play level, you must decide: is an edge-rusher worth more because he draws double teams (gravity, Owner Q8), and how many points per double team? That is philosophy in, math out — the same translation, with play data as the intermediate.

The engine *can* measure participation (snap counts) once play-level exists, which the drive engine cannot (VERIFIED). That measurement can inform flex prices (e.g., socialism for part-time roles), but the price levels themselves still come from the Owner's guide or a chosen fit target.

**Bottom line:** Adopt the view, reject the full rebuild for now. The view is the only shape that gives the engine snap counts (the one thing it genuinely lacks) without risking the calibrated drive engine. Play-level does not make the Owner's philosophy unnecessary — it just changes what he has to specify (personnel and attribution, instead of drive-level weights).

Label summary: VERIFIED = code checks above; INFERRED = all analytical claims about play-level behavior, transfer/rebuild split, path; UNKNOWN = exact drive count per team, real football snap shares.
