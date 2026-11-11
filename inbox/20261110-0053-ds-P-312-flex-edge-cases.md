SPEAKER: DS | ROLE: council | TASK: P-312 — flex edge-case playtest on the rebuilt table | DATE: 2026-11-10T00:53Z

FOR: P-312

All checks run against `728b2c53` (the landed table) and against the generated 105-rule table (items 3 + 7).
Rosters are built from `SLOTS` (one player per slot role) with `fit()` from the real engine; "natural" means
SAM is an OLB (`players.ts:15`).

## (a) The FB/SAM artifact — VERIFIED

With a natural roster in the **3-4**, the cheapest arrangement is not "everyone in his own spot":

| base | arrangement | penalty total |
|---|---|---|
| 728 (97 rules) | FB slot ← DT (0), TE3 (50) ← FB (6), DT2 (300) ← SS (6), DIME (50) ← TE (6) | **2400** |
| 105 rules | FB slot ← DT (0), TE3 (50) ← FB (6), DT2 (300) ← OLB (6), SAM (100) ← TE (6) | **2700** |

So the prompt's description is half right: a **spare DT does play fullback for free**, but the **natural FB goes
to TE3**, not to SAM. With items 3 + 7 the TE goes to **SAM** and an OLB goes to **DT2**; the DIME slot then
takes a DB free. The 3-4 is 2400 (728) / 2700 (105) units cheaper than the 4-3 with the same roster. Values:
4-3 600250, 3-4 597550 (both tables; only the arrangement and the gap change).

## (b) Free flexes that look wrong — VERIFIED

The 728 table has 23 tier-0 rules, not 30 (the 30 was the stage-1 table; the 9 corrections raised eight of them).
The ones the optimizer actually uses:

- **`EDGE>DT` 0** — an elite EDGE plays defensive tackle for free. On a stacked roster (three 95 EDGEs, three 55
  TEs) the 4-3 puts a **95 EDGE at DT1 for 0** and a 70 EDGE at TE2 for 6. This is the most consequential zero:
  it moves a starter, and it is intra-unit, so the four cross-unit zeros below are not the whole story.
- **`DT>FB`, `EDGE>FB`, `ILB>FB`, `OLB>FB` 0** — four cross-unit free moves remain after the corrections. The
  optimizer uses `DT>FB` in the 3-4 (the spare DT at fullback). `FB>EDGE` was removed as absurd; `EDGE>FB` is
  free. Owner question, not a patch.
- 8 of the original 30 zeros were cross-unit; the corrections fixed `EDGE>OG/OT/RB/NICKEL` (0 → 6). The four
  above are what is left.

## (c) EDGE to TE at -6 — VERIFIED, it happens

With three 95 EDGEs and three 55 TEs, both bases place an EDGE at **TE2 (weight 150) for -6** (value 150 × 64 =
9600 vs 150 × 55 = 8250). It looks odd on the field — an edge rusher at tight end — but the weight is low and the
price is the Owner's 6; it is not a defect in the table. With ordinary rosters (two EDGEs) it does not happen:
moving a 95 EDGE off a DE spot to TE3 loses 25 × 650 at DE to gain 19 × 50 at TE3, so the optimizer keeps him at
DE. The artifact needs a genuinely spare EDGE.

## (d) Do the removals hold? — **NO (VERIFIED). This is the important one.**

```
fit('FB','EDGE') → {"penalty":8,"emergency":true,"legal":true}
fit('FB','DT')   → {"penalty":8,"emergency":true,"legal":true}
fit('FB','ILB')  → {"penalty":8,"emergency":true,"legal":true}
fit('FB','OLB')  → {"penalty":8,"emergency":true,"legal":true}
```

A removed -12 rule is not gone: it becomes the engine's emergency fallback at **-8 and legal**. So the seven
removals make those placements **cheaper**, not illegal, and P-312(d) fails on `728b2c53`. Two readings:
"removed = banned" (P-312(d)'s, and the plain meaning) needs a `FLEX_BANNED` check in `fit()`; "removed =
unlisted at -8" means the test is wrong. The Owner should rule; the generated `flex.ts` implements banned and it
is a one-constant revert (`BANNED_ARE_ILLEGAL`). See `inbox/20261110-0051-ds-P-311-flex-rebuild-review.md`.

## (e) The WILL/C weight change — cannot be observed because it has not landed (VERIFIED)

`slots.ts` on `728b2c53` still has `WILL 150`, `C 150`, `SAM 100`. `WEIGHT` is derived from `SLOTS`, so the draft
still values both at 150. The flex table itself does not move under the bump (0 of 97 D values change), so there
is no flex artifact to observe; the draft artifact (over-drafting WILL/C) can only be checked after the bump
lands. **Not run:** `flexeval` is not in this tree, so no replay against the P-310 baseline (fresh 626 / tune
1212).

## Weakest point

No draft-level replay: every finding above is a lineup-level measurement (Hungarian optimum) plus `fit()` calls,
not a season or draft scan. The (a)/(b) artifacts could be more or less visible once real rosters are drafted.

## EVIDENCE: VERIFIED for everything above; `flexeval` findings are UNKNOWN.
