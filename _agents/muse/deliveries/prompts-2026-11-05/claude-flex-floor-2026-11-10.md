# Claude — flex build, continued: items 3+7 PLUS the new cross-side floor rule

## What this is

You timed out applying the Owner's flex answers (items 3+7) from `claude-reply-flex-answers-2026-11-09.md`. Continue that build — and fold in one new Owner rule below. One job: the flex table only. Do not run tests; the council verifies (P-323).

## The new Owner rule (2026-11-10) — cross-side flex floor

Cross-side flexes (offense ↔ defense) cost at least −6:
- Cross-side −2 → −6. Cross-side free (0) → −6.
- Cross-side −6 stays −6. Cross-side −12 stays −12. (The floor is a minimum, not a cap.)
- FB exception: players who play FB for free stay free (DT, EDGE, ILB, OLB > FB stay 0).

Concrete effect on the live 97-rule table — only 5 rules change, all WR → DB:
WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS: −2 → −6.
The 97-rule table becomes {0: 23, 2: 10, 6: 45, 12: 19}.

## The build (items 3+7 + the floor rule)

Apply to the flex table (`tools/mathlab/flex.json` and `colors/src/sports/nfl/engine/flex.ts`):
1. Item 3: TE>DIME 6→12, TE>FS 6→12, ILB>FS new 12, OLB>FS new 12. (These stand — the floor is a minimum, so TE>FS and TE>DIME at −12 are fine.)
2. Item 7: SAM mirrors OLB — EDGE>SAM 0, FS>SAM 6, ILB>SAM 0, OLB>SAM 0, SS>SAM 2, TE>SAM 6.
3. The floor rule: WR>CB, WR>DIME, WR>FS, WR>NICKEL, WR>SS: 2→6.

Expected final table: **105 rules, {0: 26, 2: 11, 6: 45, 12: 23}**. (Without the floor rule it would have been {0: 26, 2: 16, 6: 40, 12: 23} — the floor moves 5 rules from −2 to −6.)

Re-pin the table and commit + push. The council (P-323) will verify the counts, flex.json = flex.ts, the new base total, and the test suite.

## Think around it

This is a table edit, but think about what it means, not just the numbers. The floor says a wide receiver can cover a defensive back, but not cheaply — WRs are athletes, not trained DBs, so playing DB should cost real value. The FB exception says the fullback spot is different: big bodies (DT, EDGE, ILB, OLB) can line up there for free because that's what the spot asks for. If the floor rule exposes anything odd about how the engine prices cross-side moves — a rule that now looks too cheap, or a same-side rule that looks inconsistent with it — say so in your reply. The Owner's list is the reality check and the engine is the truth; if they disagree anywhere, flag it rather than forcing the table to match.
