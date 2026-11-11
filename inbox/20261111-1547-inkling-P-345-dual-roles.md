SPEAKER: inkling | ROLE: council seat | TASK: P-345 innovation round — Q5 dual positions, one number changes | DATE: 2026-11-11T15:47:00Z
FOR: P-345

## Question addressed
**Q5 — Dual positions.** Free between your own two positions, assigned by the Owner (Jokic PG+C, Travis Hunter CB+WR). How does the engine represent a two-position player — one player, two slots, or two entries? What breaks: the draft board, the lineup, the flex pricing?

## Idea (one line)
**A dual player is one player with `roles: [A, B]`, and exactly one function changes: `fit(role, dest)` becomes `fitDual(roles, dest)` (0 at either home position; the cheaper listed price elsewhere; the QB rule propagates). Hungarian, the value function, WINS_PER_UNIT, the draft board's keying — all unchanged, because everything consumes `fit`.** No schema fork, no second entry, no new table. The interesting work is downstream of the representation: the assignment barely moves but the *census* of stackable free slots widens, and that is where the Owner's attention must go.

## Method / oracle discipline
- **Live flex oracle:** `tools/mathlab/flex.json` mirrored at **origin/council/muse @ 4c235316** (file last changed in a32f28f1), **99 rules** (counted programmatically: `Object.values(flex).reduce((n, r) => n + Object.keys(r).length, 0)` → 99; the script asserts it and refuses otherwise). Copied verbatim to `deliveries/p345-flex99-oracle.json` (sha256 `0a26d7c2…`). The retired 107-rule REV 4 file in my worktree was NOT used.
- **Slot weights:** ENGINE-MATH-SPEC REV 5 table from `colors/src/engine/slots.ts` in this worktree (QB 1000, multiples of 10; 4-3 base only — the 3-4 weight remap (DT2→MIKE 260, SAM→DT2 300) is noted but not modelled here; conclusions are formation-independent modulo that remap).
- **Ratings:** `data/madden27-ratings.csv`, 1,941 players, 32 teams, VERIFIED by parsing; **no dual-position entries exist in the source** (checked: no name+team appears with two positions; every row is one `pos`).
- **Reference implementation:** `colors/src/engine/lineup.ts` (this worktree, commit 06e05b4b) — Hungarian ported verbatim in structure, cost matrix identical in form (`-(PLAYS + weight × (ovr − penalty))`); `fit` semantics from `colors/src/engine/flex.ts` (dl5Penalty = min of role→DT/role→EDGE; QB never takes the fallback).
- **Prototype:** `deliveries/p345-dual-roles.mjs` (runs: `node deliveries/p345-dual-roles.mjs`).

## Receipt (VERIFIED — command output, abbreviated)
```
players: 1941  teams: 32  oracle flex rules: 99 (expect 99)

== best CB -> CB+WR (Hunter) ==
teams changed >=1 placement: 5/32   total placements changed: 26
mean value gain per team: 0.0041 wins   max: 0.0825 wins   monotonicity violations: 0
dual player started AT THE SECOND POSITION (WR) in 3 of the changed teams
example Baltimore Ravens: Marlon Humphrey (85 OVR); gain 0.0825 wins
   WR2: Rashod Bateman -> Marlon Humphrey (pen 0)   CB1: Marlon Humphrey -> Nate Wiggins (pen 0)  …

== best OG -> OG+OT ==
teams changed >=1 placement: 25/32   total placements changed: 62
mean value gain per team: 0.0565 wins   max: 0.1092 wins   monotonicity violations: 0
dual player started AT THE SECOND POSITION (OT) in 22 of the changed teams
example Atlanta Falcons: Chris Lindstrom (94 OVR); gain 0.1092 wins
   OT1: Chris Lindstrom -> Chris Lindstrom (pen 0)

== best TE -> TE+WR ==
teams changed >=1 placement: 8/32   total placements changed: 40
mean value gain per team: 0.0068 wins   max: 0.0953 wins   monotonicity violations: 0
dual player started AT THE SECOND POSITION (WR) in 5 of the changed teams
```
Monotonicity violations = 0 across 96 team-sweeps, as the theory below requires. Placement changes are real but modest for CB→WR (only 5/32 teams re-slot); the OL case re-slots 25/32 because OT1/OT2 outweigh OG1/OG2 (430/400 vs 290/290) — the optimum prefers the OT side, exactly as a weight-aware solver should.

## Why the representation is one `fit` change
The lineup solver never sees positions — it sees penalties. Proof: in `optimalLineup`, the only positional input is `fit(players[i].role, slots[j].dest)` (VERIFIED by reading `lineup.ts`). So the entire dual-position feature reduces to:

```
fitDual(roles, dest):
  if dest ∈ roles:               return 0                       // Owner's rule: free between your own two
  else:                          return min(fit(r,dest) ∀ r∈roles)  // never worse than either parent
```
with two carried rules: (1) the **QB rule propagates** — a dual containing QB never takes the emergency fallback (Owner's QB-only-to-FS rule unchanged; `legal:false` survives); (2) the **DL5 special case survives** — `min(DT, EDGE)` semantics already generalise, since a dual containing DT *or* EDGE is home. The second clause is the only judgement call: the alternative is `FLEX[A][dest]` (price as if he were still his primary) which contradicts "free", or a new authored table, which violates the binding constraint (no new authored pair tables). `min` is the only clause consistent with "the Owner's two positions are free and everything else is the same guide".

**Monotonicity (state as a theorem, verify per run):** adding a role expands the zero-penalty feasible set of the assignment problem; Hungarian solves it exactly; hence optimal value never decreases. Verified 0/96 violations. Any future regression that shows a dual LOWERING value is a bug in the implementation, not in football.

## What breaks — honestly enumerated
1. **The draft board — the one real collision.** The board is keyed by player; a dual must be **one entry, `name|posA+posB|team`, never two rows**. Two rows would let the same body be drafted twice (the id grammar `name|pos|team` would silently permit it). Concretely needed: pos display `CB/WR`, `ROLE[pos]` parser yields two roles, id stays `name|posA|team` with the second role in a new field (never in the id — else every history/save comparison breaks).
2. **The Hungarian matrix — nothing.** Rows are players, columns are slots; penalties just change. Same code path, same O((n+s)³). The stay-bonus advice path (`adviseLineup`) also consumes only `fit` — unchanged.
3. **Flex pricing — the price of the second position is 0, but the census of exploits widens.** A stacked 99 with two home slots is exactly the C>OG-shaped escape the Owner cares about, now with more room. That is not a defect — the Owner said dual positions are free — but the exploit census (`flexcensus.mjs`) must be re-run with duals admitted, and the Owner should see the new top-5 exploiters BEFORE duals ship, labelled as the price of the feature. Pricing advice (P-336): free at either home position; for a THIRD destination, `min` of the two parent prices; never a new authored number. If the Owner instead wants "free at second position up to −X only for elite OVR" — that is a product call, not a math question, and should be rejected as it reintroduces an authored gate the 8 Nov ruling removed.
4. **Value display ("counted as").** When Humphrey starts at WR2 as a CB, the UI must say "Marlon Humphrey — counted as WR" (or show `-0`); otherwise the user sees an inexplicable CB at WR1's line and reasonably files a bug. One-line change in placement rendering; state it now so it isn't discovered in playtest.
5. **The MEASURED value layer.** effOVR already feeds everything downstream; a dual's value at a 0-penalty slot is his full OVR, so the Hungarian's preference for his better slot is automatic. But draft-board VALUE (slotWinsPerOvr) ignores second positions today; the honest extension prices a dual's coverage of failure states (INFERRED, not measured; needs the lab, not this filing). Do not hand-fit; leave it as a named UNKNOWN for the measured-value loop.
6. **Tests that assert `role` is a single enum.** `Role` in players.ts is a union of singles; `fitDual` needs `roles: readonly Role[]`. Save-file compatibility: old saves have single roles — default `roles = [role]` on load, no migration needed.
7. **3-4 weight remap.** In 3-4, a dual at SAM/DT2 is worth weight 300 as OLB2 — the free-position math inherits the Owner's SAM ruling automatically through `fieldSlots`; nothing extra to specify.
8. **Roster/draft slot of the second position.** A dual does NOT fill two slots (one body, one slot; Hungarian enforces it). The Owner's draft still fills 32 named slots, one player per round. No change to draft grammar.

## What would falsify it / prove it
- **Monotonicity violation in any run** → implementation bug (prototype asserts the counter).
- **If the Owner's intent is "free at second position but not usable there until round 2"** (a draft restriction), the representation still holds but the draft board must gate it — ask the Owner explicitly; my reading of "free between your own two positions" is no restriction at any stage.
- **If a dual never survives the Hungarian into his second position** (e.g., the CB+WR sweep shows 0 second-position starts) the feature is cosmetic and the Owner may not care — but the OG+OT sweep shows the opposite (22/32 second-position starts with real rating data), and the mechanism is proven either way.
- **Census rejection:** if the re-run census shows stacked duals creating unacceptable exploit mass (e.g., a 92+ CB/WR saturating both CB1 and WR1 — 898 weight-units at penalty 0), the answer is the Owner's dial, not a price. Surface it; do not pre-empt him.

## What it would take to test
In the Phase 1/2 strangler path: (1) `Player.roles: Role[]` (default `[role]`), `fit`→`fitDual` with the two carried rules; (2) draft board: one row, dual display, draft grammar unchanged; (3) re-run `flexcensus.mjs` with duals admitted on the live lab; (4) re-pin goldens (every lineup optimum may move in the 22/32-OG-style cases — that is the feature working, not noise); (5) the `counted as` placement label. No engine file is touched by this filing; the Architect decides.

## Labels
Prototype output VERIFIED (this session, commands shown). fit semantics + Hungarian + lineup code read VERIFIED in this worktree. Slot weights REV 5 VERIFIED by reading slots.ts. Live 99-rule oracle VERIFIED by count. No-dual-in-source-data VERIFIED. "Value display must say counted-as" INFERRED (usability, not measured). Draft-board value of second position UNKNOWN (needs the lab).
