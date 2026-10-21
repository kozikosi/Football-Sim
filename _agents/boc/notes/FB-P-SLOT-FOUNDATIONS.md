# FB & Punter Slot Foundations — BOC — #12 (DS broadcast) — 20 Oct 2026

Read-only on `NFL Draft Simulator merged.html` (657,486 B, `40233d6b…`). No product edits. No protected constants touched. Specification only; Claude builds.

## (a) Slot codes to add, and where each of the four structures must change

Current state (verified by reading l.924–976):

- `ROSTER_SLOTS` (l.924): 26 entries — `['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','DE1','DE2','DT1','DT2','MIKE','WILL','SAM','CB1','CB2','CB3','SS','FS','K']`. Note `FB` and `P` are NOT in ROSTER_SLOTS (comment l.925: "no DL5/LB4/CB4/SS2/FS2/WR4/P/FB").
- `TOTAL_ROUNDS = ROSTER_SLOTS.length` (l.925) = 26.
- `SLOT_FAMILY` (l.931): maps each slot to a family string; currently no `FB` or `P` family entry. Would need `FB:'FB'`, `P:'P'`.
- `NATURAL_SLOT_MAP` (l.932–938): maps position tag → list of natural slots. Currently `HB:['RB1','RB2']`, `TE:['TE1','TE2']`, `K:['K']`. There is no `FB` tag, no `P` tag, no `P` slot. FB players (pos 'FB') have no entry → `flexRule` returns null → `POS_SLOT_MAP['FB']` = [] (invisible to draft pool, replacement levels, slot maps — AGENTS.md KI-002 class).
- `FLEX` (l.940–952): flex penalties by position. Currently no `FB` or `P` keys. `K:{}` (no flexes). HB has `{TE:6}` (HB can flex to TE at −6).
- `POS_SLOT_MAP` (l.962–970): built from NATURAL_SLOT_MAP × ROSTER_SLOTS via flexRule. Positions not in NATURAL_SLOT_MAP get `[]` (empty → excluded from pool at l.1481: `PLAYERS.filter(p=>POS_SLOT_MAP[p[1]])`).

Required changes:
1. Add `'FB'` and `'P'` to `ROSTER_SLOTS` (l.924) — or at minimum `'FB'` and `'P'` as new slot codes. Add `'FB'` family to SLOT_FAMILY: `FB:'FB'`. Add `'P'` family: `P:'P'`.
2. `NATURAL_SLOT_MAP`: add `FB:['FB']` (FB's natural slot is FB), and `HB:['RB1','RB2','FB']` (RB can play FB naturally? Owner says "at no flex cost" → treat FB as natural for RB/FB/TE, penalty 0). Actually Owner says "available to play FB at no flex cost" = penalty 0, which could be natural (0) or flex 0. Either way effOvr subtracts 0. I recommend adding `FB` to HB/TE/FB natural lists OR a FLEX entry with 0. Cleaner: add `FB:['FB']` and make HB/TE/FB natural to FB with penalty 0 via FLEX `{FB:0}`. Either works; Claude decides.
   For P: add `K:['K','P']` and `P:['P','K']` (or `P:['P']` with K flexing to P at 0). Owner: "Kickers (K) and Punters (P) are available to be punters at no draft cost." So K→P and P→P (natural). Add `P:['P']` to NATURAL_SLOT_MAP and K→P via FLEX 0, OR K:['K','P'].
3. `FLEX`: add `HB:{TE:6, FB:0}`, `TE:{..., FB:0}`, `FB:{}` (or flex to others), `K:{P:0}`, `P:{}`. And `FB`/`P` family entries in SLOT_FAMILY.
4. `POS_SLOT_MAP` rebuilds automatically from NATURAL_SLOT_MAP × ROSTER_SLOTS (l.962–970). No manual edit needed if the above are correct.

## (b) The Owner's two free-play rules expressed as data (Owner clarification 2026-10-21)

Owner correction: "no flex cost for the punter as well. Same logic as the fullback. 28 rounds. Running back and Half back can be used interchangeably... HBs can become FBs at no flex cost. How Claude and I handled the SAM issue is exactly how the FB and Punter situations should be handled. Other positions can flex into the role. Don't change any flex penalties. Just add the new rules for FB and P."

So BOTH rules are "no FLEX cost" (zero rating penalty), same as SAM precedent. There is no separate "no draft cost" mechanism. The P slot IS drafted (28 rounds). The Owner's earlier "no draft cost" phrasing is superseded by this clarification.

Rule 1 — RB/HB/FB/TE → FB at zero flex penalty:
- `flexRule('HB','FB')` = 0, `flexRule('TE','FB')` = 0, `flexRule('FB','FB')` = 0 (natural).
- effOvr(player, 'FB') = player[3] - 0 = full OVR. No rating loss.
- "Other positions can flex into the role" (Owner) → add FLEX entries for other positions to FB at a penalty (e.g., DT:{FB:6}, etc.) following the SAM precedent (SAM has LB_FLEX with penalties). Do not change existing penalties.

Rule 2 — K/P → P at zero flex penalty (same as FB, same as SAM):
- `flexRule('K','P')` = 0, `flexRule('P','P')` = 0 (natural).
- effOvr(player, 'P') = player[3] - 0 = full OVR. No rating loss.
- "Other positions can flex into the role" → add FLEX entries for other positions to P at a penalty.

SAM precedent (l.940-952): SAM has `SAM:LB_FLEX` where `LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}`. So SAM allows flexes at penalties. FB and P should follow the same pattern: natural at 0, others at a penalty. Do not change existing penalty values.

Note on labels: the site uses "HB" for the player position (PLAYERS tuple index 1). "RB"/"RB1"/"RB2" are slot codes. The Owner says "Running back (RB)" but the data uses "HB". Preserve the site's labelling: player position = HB, slot = RB1/RB2/FB. Do not rename.

## (c) Round arithmetic (Owner confirmed 2026-10-21: 28 rounds)

Owner: "28 rounds." Both FB and P are drafted slots (not auto-filled).

- Current: 26 rounds. 32 teams × 26 = 832 picks (l.925 TOTAL_ROUNDS; l.852/863 "26 starters"; l.1559 "Round X of 26").
- Add FB only: 27 rounds → 32 × 27 = 864 picks.
- Add FB + P: 28 rounds → 32 × 28 = 896 picks.
- If P is auto-filled (not drafted): 27 rounds → 864 picks (FB only).

## (d) What breaks when the draft changes

- `optimalLineup` (l.1206–1211): iterates ROSTER_SLOTS; adding FB/P changes the assignment matrix (players × slots). Hungarian recomputes. Cost: O(n³) but n small (28). Low risk.
- `effOvr` (l.978): subtracts flexPenaltyFor; with zero-penalty flexes, effOvr = full OVR. Already handles null penalty (EMERGENCY_PENALTY=8). No change needed if flex entries added.
- `teamRatings` (l.1988–2000): nine unit ratings (qb, rec, olPass, olRun, rb, passRush, frontRun, coverage, kicker). FB is not a unit rating; P is not a unit rating (kicker is). Adding FB/P slots does not change the nine units unless FB feeds rb/runOff or P feeds kicker. Currently `ret` (returner) is computed (l.1989) but not in the nine units. FB/P would need a consumer in teamRatings or they are dead slots (like FB currently is in TEAM_DATA).
- `replacementLevels` (l.1352–1366): counts open slots per position group across rosters; adding FB/P slots changes demand counts. Dem (demand) array grows. Low risk if POS_SLOT_MAP updated.
- Awards: any award keyed to ROSTER_SLOTS length (e.g., "26 starters") or to specific slots would need updating. Search for `ROSTER_SLOTS.length` (l.1182, 1204, 1244, 1245, 1578, 1602, 1653, 1654, 1658, 1684, 1777, 1778) — all iterate ROSTER_SLOTS, so they adapt automatically.
- Recorded evidence quoting 832 picks or 26 rounds: l.852 ("Your 26 starters"), l.863 ("draft 26 starters"), l.925 (TOTAL_ROUNDS comment), l.1559 ("Round X of 26"). Plus any external (pw4, validate, E2E) that hardcodes 832 or 26. Those would need updating (not BOC's call).

## (e) The trap: 52 dropped players (P/LS/FB) — corrected by MOC verification

- Verified: PLAYERS has 32 P + 8 FB + 12 LS = 52 players with pos tags not in NATURAL_SLOT_MAP (l.932). POS_SLOT_MAP[pos] = [] for them → excluded from pool at l.1481 (`PLAYERS.filter(p=>POS_SLOT_MAP[p[1]])`) and from replacement levels at l.1366 (`PLAYERS.filter(p=>POS_SLOT_MAP[p[1]]), rosters`).
- MiniMax's recon: 1,148 draftable + 52 not drafted by design (P, FB, LS).
- If FB and P become slot-eligible (added to ROSTER_SLOTS + NATURAL_SLOT_MAP), then FB (8) and P (32) become draftable → 40 additional draftable players. Only LS (12) remains dropped.
- The trap: any code or document that assumes "52 dropped" or "1,148 draftable" becomes stale. The pool swap (export-current-pool) would silently include 40 more players. Any test asserting 1,148 draftable would fail. Flag for Claude.

**MOC refinement (21 Oct):** The −10 in the backfield is not in the backfield — HB 89 + FB 8 = 97 for 96 backfield slots (+1). The hole is tight ends: TE 53 for 64 TE slots (−11). The Owner's FB rule lands on a group that is *not* short. The SAM hole (5 for 32) is free at the slot (MIKE/WILL are natural SAM, zero penalty) but the cost hides downstream: LB group 86 for 96 slots (−10), landing on DT/LEDG (−2/−4) and CB/SS/FS (−4). The kicking parity (64 for 64) is real but the K slot itself is a knife-edge: `FLEX.K = {}` means a kicker can flex nowhere and nobody can flex into K, so a K injury costs the emergency penalty (8). The drop is emergent from NATURAL_SLOT_MAP + taxonomy, not a hardcoded filter — when the build carries FB/P, the tool writes 1,188 and drops 12 by itself. Stale 52/1,148 counts live only in documents (FB-P-SLOT-FOUNDATIONS.md, current-pool-distribution.md ×4, nfl-position-taxonomy.md l.42, SUBMISSIONS.md l.1615), nowhere in the tool.

## (f) Smallest correct change set (ordered, for Claude)

1. Decide the "no draft cost" vs "no flex cost" ambiguity (Owner decision, see (b)).
2. Add `FB` and `P` to ROSTER_SLOTS (l.924) — both drafted (28 rounds confirmed by Owner).
3. Add `FB:'FB'` and `P:'P'` to SLOT_FAMILY (l.931).
4. Add `FB:['FB']`, and extend `HB:['RB1','RB2','FB']`, `TE:['TE1','TE2','FB']`, `K:['K','P']`, `P:['P']` (or `P:['P','K']`) to NATURAL_SLOT_MAP (l.932–938).
5. Add `HB:{TE:6, FB:0}`, `TE:{..., FB:0}`, `FB:{}`, `K:{P:0}`, `P:{}` to FLEX (l.940–952).
6. Update TOTAL_ROUNDS (auto, l.925) and all hardcoded "26"/"832" references (l.852, 863, 1559, external tests).
7. Update teamRatings (l.1988) to consume FB and/or P if they feed a unit rating; otherwise they are dead slots (acceptable for FB/P, but document).
8. Update replacementLevels demand (auto via ROSTER_SLOTS).
9. Update pool export (1,148 → 1,188 draftable if FB+P added; 12 LS remain dropped).
10. Update awards/recap strings referencing "26 starters" or "832 picks".

## Verified vs inferred
- VERIFIED by reading: ROSTER_SLOTS (l.924), TOTAL_ROUNDS (l.925), NATURAL_SLOT_MAP (l.932–938), FLEX (l.940–952), SLOT_FAMILY (l.931), POS_SLOT_MAP (l.962–970), effOvr (l.978), optimalLineup (l.1206), teamRatings (l.1988), replacementLevels (l.1352), player counts (32 P + 8 FB + 12 LS = 52, verified via python parse of PLAYERS).
- INFERRED: "no draft cost" = auto-filled (not drafted). This is BOC's interpretation of the Owner's distinct phrasing; needs Claude confirmation.
- NOT CHECKED: live execution of any change; awards strings beyond the grepped lines; external test files (pw4, validate, etc.) that may hardcode 832/26.
