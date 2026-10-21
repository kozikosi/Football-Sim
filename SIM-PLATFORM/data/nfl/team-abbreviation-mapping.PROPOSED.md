# Historical team abbreviation -> today's franchise (PROPOSED, evidence-attached)

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: candidate-pool substrate | DATE: 2026-10-21T03:05:00Z**

**Status: PROPOSED — a curator must confirm each row before it enters a pool.** The Owner's direction
requires today's franchises in the simulation and the historical team as **context only**, and requires
person, team/franchise, source and rating to stay distinct. This file proposes the abbreviation ->
franchise mapping **with the evidence that produced it**, and flags where the abbreviation is a
*franchise* code that spans eras, so the historical city is a per-candidate judgement.

## What the intake actually contains

Measured from the candidate queue (`tools/intake-to-candidates.mjs`; 726 NFL candidates, 2,098 mentions):
**exactly two team abbreviations appear in the football sources** — `KC` (61 candidates) and `STL` (23).

| abbr | candidates | names the source attaches to it | franchise those names identify | today's franchise |
|---|---:|---|---|---|
| `KC` | 61 | Justin Houston, Patrick Mahomes, Derrick Thomas, Joe Montana, Larry Johnson, Orlando Pace, Tamba Hali, … | **Kansas City Chiefs** | Kansas City Chiefs |
| `STL` | 23 | Orlando Pace, Aaron Donald, London Fletcher, Marshall Faulk, Aeneas Williams, Isaac Bruce, … | **St. Louis / Los Angeles Rams** | Los Angeles Rams |

## The catch the evidence shows

`KC` is a **franchise code that spans two cities**: Derrick Thomas, Orlando Pace and Tamba Hali played for
that franchise in **St. Louis**; Patrick Mahomes and Justin Houston played for it in **Kansas City**. So the
abbreviation identifies the *franchise*, not the city or the era. Consequences for the Owner's rule:

* **simulation identity** = the modern franchise (Chiefs / Rams) — one unambiguous row per candidate;
* **historical context** = the city and era the player actually played in — a **per-candidate** field the
  abbreviation cannot supply. "Chiefs" is not a historical team; "St. Louis Chiefs" and "Kansas City
  Chiefs" are, and which applies is a fact about the player.

## Recommendation

1. Store the franchise key (`KC_CHIEFS`, `STL_RAMS` -> modern `KC`, `LAR`) on the candidate row, taken from
   the abbreviation, with this file as its evidence.
2. Leave the **historical city** as an open per-candidate question, exactly like position and career
   status — the abbreviation cannot answer it, and the Owner's example (Oscar Robertson on the Cincinnati
   Royals) shows why the distinction matters.
3. Do **not** merge the two fields, and do not let a franchise abbreviation become a "historical team".

**Open for a curator (not for a script):** the 84 candidates whose abbreviation is `KC` or `STL` and whose
era is not obvious from the source still need the city; the queue lists them with their mentions so the
judgement can be made with the citation in view.
