SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: report-back to LongCat — hockey/baseball structural analogy test | DATE: 2026-10-21T01:49Z

# Hockey / baseball structural analogy test — official-source grounding

**Scope**: for MLB and NHL, establish from primary sources the rules facts that decide whether the football model (snake draft, slot families, flex penalties, unit ratings) transfers. Every fetch receipt sits in `_agents/glm/notes/hockey-baseball-analogy-test.receipts.txt`.

## 1. The rulebook facts, cited

**MLB — VERIFIED (official MLB.com sources fetched):**
- **Roster**: 26 active players (from Opening Day through Aug 31 and postseason), max 13 pitchers; September 28 (max 14 pitchers); the 40-man roster is the reserve pool. (MLB.com 2020 official press release; 2021 and 2023 MLB.com rule articles).
- **Starters**: 9 fielding positions (C, 1B, 2B, 3B, SS, LF, CF, RF) + the DH. The DH is universal since 2022 (Rule 5.11; official 2022 MLB/MLBPA press release).
- **Substitution**: "Any runner or batter removed from the game for a substitute shall be ineligible to return to the game, as is the case in all circumstances under the OBR." (official 2022 MLB/MLBPA release). Pitchers never re-enter: a player removed from the pitching position may not return to pitch. (No re-entry in MLB — high-school re-entry rules are a DIFFERENT rulebook, NFHS, do not cite those here.)
- **Playing staff shape**: with a 13-pitcher cap, teams run ~5 starters + relievers (INFERRED from cap arithmetic, standard practice).
- **Season**: 162 games (VERIFIED: "the condensed 162-game schedule" in the official 2022 release).
- **Postseason**: 12 teams — 3 division winners + 3 wild cards per league; WC = best-of-3, DS best-of-5, LCS best-of-7, World Series best-of-7; top-2 seeds get byes. (official MLB.com playoff FAQ, 2026 edition).
- **Draft**: MLB's entry draft is a straight (not snake) order by reverse record with independent per-round order in the real league — but OUR sims' draft convention is the council's own snake rule, not a league rule; the Owner decides what realism level to import (flagged below).

**NHL — VERIFIED (official rulebook PDF + nhl.com fetched):**
- **Roster**: max 23 players Sept–trade deadline; game-day dress: 20 players = 18 skaters + 2 goaltenders (Rule 5.1, NHL Official Rules 2026-2027, media.nhl.com PDF); IR does not count against 23.
- **On-ice**: 6 per side = 3 forwards + 2 defensemen + 1 goalie; goalie removable but a substitute "shall not be permitted the privileges of the goalkeeper" (Rule 5.3).
- **Substitution**: unlimited, including live on-the-fly changes (REPORTED — official rules structure + corroborated by secondary league references; the rules PDF covers change-of-players mechanics; no quota exists).
- **Positions**: three hard classes — forwards (C/LW/RW within class), defensemen, goaltenders; lines/pairs are units of 5 skaters + goalie.
- **Season**: 82 games (REPORTED, league-standard).
- **Postseason**: 16 teams, top-3 per division + 2 wild cards per conference, best-of-7 across all four rounds (official nhl.com Playoff Format page).
- **Draft**: league entry draft, straight order (REPORTED); our snake convention is again a council design choice.

## 2. Which football-model parts transfer (evidence-based)

### MLB — verdict: **PARTLY CONFIRMED**

| Football-model piece                    | Transfer?                        | Evidence                                                                                                                                                                                                                                                       |
| --------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slot families (per-position ratings)    | **YES** — natural                | 9 fielding positions + DH is a clean slot sheet; the DH and catcher create real specialization                                                                                                                                                                 |
| Unit ratings (offense vs defense split) | **YES**                          | Hitting vs pitching splits off naturally; the 9-vs-9-inning structure is discrete like football drives                                                                                                                                                         |
| Flex penalties                          | **NO**                           | Terreforeign to the game: position eligibility is season-long certified; the DH slot is locked once used; pitchers don't hit; removed players may never return — substitution is one-way, not flexed                                                           |
| Snake draft                             | **DESIGN CHOICE, not structure** | Real MLB draft is straight-order; using snake with 32 teams is a council convention that works for any sport but is NOT structurally implied                                                                                                                   |
| Draft shape vs football                 | **MOSTLY YES**                   | ~13–14 roster slots needed for a draftable starting set (9 batters + DH + ~3–4 pitchers per rotation) — but MLB's "starters" are batter-positions + the pitching STAFF is a basket; a two-tier draft (position players vs pitching staff) is the natural shape |
| Season sim shape                        | **YES**                          | 162 games ≈ football's game-by-game frame; a 12-team playoff bracket maps close to football's 14-team design                                                                                                                                                   |

### NHL — verdict: **PARTLY CONFIRMED for the Owner's basketball guess; the football-slot model part is REFUTED**

| Football-model piece           | Transfer?                                          | Evidence                                                                                                                                                                               |
| ------------------------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Snake draft                    | **DESIGN CHOICE** (works)                          | Same as MLB note                                                                                                                                                                       |
| Slot families                  | **WEAK**                                           | Only three hard class (F/D/G); within forwards, C/LW/RW is a soft label; what matters is LINE chemistry (unit-of-5 skill), which does not decompose per-slot the way football units do |
| Flex penalties                 | **REFUTED except within-forwards**                 | D↔F conversion is a career/role change, not in-game flexed substitution; goalie privileges cannot be assumed by skaters (Rule 5.3)                                                     |
| Unit ratings (5-man unit)      | **CLOSER TO BASKETBALL**                           | Football's "unit" = O-line group vs a formation; hockey's unit = the line (LW-C-RW + 2 D) + goalie pair — a rotation model, i.e., basketball-style lines on the court/ice              |
| Substitution                   | **REFUTES the football sim's discrete-play frame** | Unlimited live substitution + continuous flow means a down-based sim does not map; possession/shift rotations do                                                                       |
| Season sim shape               | **YES**                                            | 82 games, 16-team bracket — easy league frame                                                                                                                                          |
| `rock关节炎/goalie` specialism | **YES**                                            | Goalie = a hard-constrained class like football's kicker: small number of slots, outsized win impact — draft with special scarcity rules                                               |

**The Owner's two-way guess, judged:**
- "Soccer and baseball may be closer to football's draft structure" — for BASEBALL specifically: **PARTLY CONFIRMED** (clean position slots + discrete-play frame make the football model mostly usable; flex is the misfit). For soccer / ice hockey: refs to LongCat/other seats.
- "Hockey may be more like basketball" — **PARTLY CONFIRMED**: the rotation/line-change structure is basketball-like, NOT football-like; a 5-man unit/possession model is the better first architecture; discrete-play football math (downs, field position) does NOT apply.

## 3. What)] the draft would have to be (per sport)

- **MLB draft** (council convention): snake across 32 teams; round structure = (a) position slots 9 fielding + DH; (b) STAFF basket slots (SP1–SP5 + RP group) — the basket is the tricky piece; keep the football `slotWins`-style marginal-win math but re-derive per-slot marginal contributions from sport-specific lineup engines; flex = OFF (no crossclass), DH universal already.
- **NHL draft**: snake; slots = 2 G + 6 D + 12 F (+ extras), which is ~18-20 draftable slots to fill; unit ratings = line-of-5 chemistry applied via the basketball-style rotation model; no down/field-position barrel; flex = within-forwards slight penalty only.

## 4. Limits and not-verified

- On-the-fly change-of-players mechanics: REPORTED via rulebook structure + secondary corroboration, not a direct Rule 74 quote — one more fetch can pin Rule 74 verbatim if the Owner wants it.
- MLB starting rotation = 5 (standard; the 13-pitcher cap is the VERIFIED anchor).
- Whether soccer's draft-scale shape fits the football model: OUT OF SCOPE for this test (different discipline).
- The basketball model itself has not been built anywhere this council can measure — this test outputs the architecture SUSPECT, not a tested engine.

VERDICTS (per sport, against the football model): **MLB PARTLY CONFIRMED** (slot families YES; flex NO; two-tier staff); **NHL PARTLY CONFIRMED as basketball-like / REFUTED as football-slot-like** (continuous flow, line units, hard G/D/F classes).
