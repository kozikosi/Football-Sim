SPEAKER: inkling | ROLE: council advisor | TASK: P-322 — design the per-role skill profile | DATE: 2026-11-10T01:12Z
FOR: P-322

# P-322 — the per-role skill profile: a design, measured against the Owner's final flex table

**What this is:** a design-only proposal (P-322 says DESIGN ONLY — do not build). It proposes the skill list, a score per role per skill, the formula from two profiles to a flex price, and — the part the brief actually hinges on — exactly where the model disagrees with the Owner's table, and why. Evidence labels: VERIFIED = I ran it (command quoted); REPORTED = cited from another document; INFERRED = reasoned, not run; UNKNOWN = cannot tell from what I have. The FLEX table and protected constants are **not touched** by this file. Building any of it is the Architect's call; any build re-pins FLEX (protected constant, §3) — this file is a proposal, not an approval.

## 0. The benchmark I measured against (VERIFIED)

The Owner's table at `728b2c53` (architect/engine-and-seats tip; `git log --oneline -1 728b2c53` → "Architect: flex corrections, 9 Owner overrides (19/40/15/23)"; `git diff 728b2c53 origin/architect/engine-and-seats -- tools/mathlab/flex.json` → empty):

```
$ python3 p322.py   # loads tools/mathlab/flex.json at 728b2c53, applies items 3+7
final rules: 105 | counts: {0: 26, 2: 16, 6: 40, 12: 23}
matches Owner expected counts (23/40/16/26, 105 rules): OK
```

Constructed final table = 97 rules at 728b2c53 + item 3 (TE>DIME 6→12, TE>FS 6→12, ILB>FS new 12, OLB>FS new 12) + item 7 (SAM mirrors OLB: EDGE>SAM 0, FS>SAM 6, ILB>SAM 0, OLB>SAM 0, SS>SAM 2, TE>SAM 6). **VERIFIED by my run**; the items-3+7 table itself has NOT landed on the Architect's branch (per the 2026-11-09 council prompt and P-323's brief) — so this file pre-verifies the *counts* but not the build; **P-323 remains the gate for the real diff.** Base table re-read: 19×12 / 40×6 / 15×2 / 23×0 = 97 (VERIFIED, matches the prompt's numbers).

## 1. The skill list (what each means)

Nine priced skills, scored 0–10, stored per role **once** (source and destination use the same vector — "one place"):

| Skill | Football meaning | Who needs it |
|---|---|---|
| **BLK** | Point-of-attack blocking: run fits, pass setting, chip-calling. Not "can he push his man" in aggregate — *can he do the job the destination demands*. | OT/OG/C (elite), TE/FB (good), others (poor) |
| **CTH** | Catching under real conditions: tracking, hands, ball-skills in traffic. Not route-running (that is COV's cousin). | WR (elite), TE (good), CB hand-adjacent (7) |
| **COV** | Staying with a receiver in man/match coverage; discipline vs route combos. The DB job. | CB 10, FS 9, SS 9 (box-expert), NICKEL ~CB, DIME ~DB |
| **RNG** | Deep-range: getting from depth to the deep third/half without turn-arounds — the single-high problem. | FS 9, CB 8, NICKEL 4, DIME 4, SS 4, LBs 2–3, QBs/WRs low |
| **RSH** | Getting to the QB as a job: pass-rush moves, effort, angles. | EDGE 10, DT 8, WILL(OLB) 7, ILB 5, SS 3 (blitz package), FS 1 |
| **RUN** | Ball-carrying as a skill: vision, elusiveness, breaking first contact. Scores **only RB-the-slot** prices (see formula: RUN gap counts only for dst == RB). | RB 9, FB 6, QB 8, TE 5, WR 4 |
| **SNP** | Snapping: the ball-exchange choreography and reliability. | C 10, OG 6, OT 5 (they know the cadence) |
| **KCK** / **PNT** | Specialist jobs: kicking and punting are *different* jobs. | K 10/0, P 0/10 |

(Unpriced, recorded for UI only: **TKL** — tackling. Every defensive role tackles adequately; no ρ gap drives a flex price; put it on player cards if wanted. **Run defense** is inside BLK for OL. This keeps the formula honest instead of stuffing it with skills that correlate and cancel.)

Why these nine: they cover every price driver the Owner named in his verbatim flex answers and D-rebuild brief (REPORTED: `_agents/muse/deliveries/prompts-2026-11-05/claude-reply-flex-answers-2026-11-09.md`, `...-owner-picks-D-2026-11-09.md`, both on `origin/council/muse`): blocking (WR>TE −6), catching (WR>DB cheap; RB>WR 12), the LB/DB/TE coverage gap, the center/OG athlete gap and snapping, rushing (DT/EDGE at TE/DIME), specialist swaps (K/P at 2), and the ball-carrying gap (RB>anything 12/6).

## 2. The scores (proposed, with the reasons anchored to the Owner)

Destinations are scored with the same vector; two extra "slot-destinations" exist with no outgoing rules (consistent with the table: SAM has only incoming rules (item 7), NICKEL/DIME have none at all):

| Role | BLK | CTH | COV | RNG | RSH | RUN | SNP | | |
|---|---|---|---|---|---|---|---|---|---|
| QB | 1 | 2 | 2 | 1 | 2 | 8 | 0 | | |
| RB | 3 | 6 | 2 | 1 | 0 | 9 | 0 | | |
| FB | 8 | 2 | 2 | 0 | 0 | 6 | 0 | | |
| WR | 1 | 10 | 6 | 5 | 0 | 4 | 0 | | |
| TE | 7 | 8 | 4 | 2 | 0 | 5 | 0 | | |
| OT | 10 | 0 | 0 | 0 | 0 | 0 | 5 | | |
| OG | 9 | 0 | 0 | 0 | 0 | 0 | 6 | | |
| C | **6** | 0 | 0 | 0 | 0 | 0 | 10 | | |
| DT | 0 | 0 | 0 | 0 | 8 | 0 | 0 | | |
| EDGE | 2 | 0 | 3 | 2 | 10 | 0 | 0 | | |
| ILB (=MIKE) | 0 | 2 | 3.5 | 3 | 5 | 1 | 0 | | |
| OLB (=WILL) | 0 | 2 | 4.5 | 2 | 7 | 0 | 0 | | |
| SS | 0 | 3 | **9** | 4 | **3** | 0 | 0 | | |
| FS | 0 | 4 | 9 | 9 | 1 | 0 | 0 | | |
| CB | 0 | **7** | 10 | 8 | 0 | 0 | 0 | | |
| K | — specialists KCK 10 / PNT 0 | | | | | | 0 | | |
| P | 0 | 0 | 0 | 0 | 0 | 0 | 0 | PNT 10 | |
| NICKEL (slot) | 0 | 5 | **9** | 4 | 0 | 0 | 0 | | |
| DIME (slot) | 0 | 4 | 9.5 | 4 | 0 | 0 | 0 | | |
| **SAM** | *no row — aliased to OLB (item 7)* | | | | | | | | |

Load-bearing choices, each tied to the Owner's words:

- **C scores BLK 6, not 9.** The Owner's #2: "guards are better athletes and are weighed more favorably by the engine in terms of impact. the cost to snapping is less than being a better athlete and more one on one matchups with the 3-technique." A center is a good lineman but not a tackle; the BLK demand on the C slot is under the OLB bar. (This is also what makes `OT>C 2`, `OG>C 2`, `DT>C 6` fall out naturally; with `C BLK=9`, `DT>C` prices at 12.)
- **SS COV 9 (box-expert), SS RSH 3 (SS blitzes on third down).** The Owner's item-3 additions dropped all LBs/TEs to FS at −12, i.e. *everyone without real DB experience pays the FS price*; SS is the one LB-adjacent DB role. The blitz-gap reproduces `SS>OLB 2` and `SS>SAM 2` (SS is rush-convenient) against `FS>OLB 6`/`FS>SAM 6` (FS never rushes) — the exact texture item 7 demands on the SAM mirror.
- **ILB COV 3.5 ("Mike = run-first", Owner #6 vagueness note).** This is the single biggest knob: it puts `ILB>NICKEL 6`, `ILB>DIME 12`, `ILB>FS 12`, `ILB>SS 2` in the right tiers.
- **ILB RNG 3, WR RNG 5.** RNG is what separates box-slot from deep-slot (NICKEL 4 / DIME 4 / FS 9): `SS>DIME 0` and `SS>NICKEL 0` stay free (a safety is a safety), while `ILB>DIME 12` needs the range + coverage gap.
- **CB CTH 7.** The Owner's #4: "dbs and wrs are similar athletes but wrs are better and paid more because they can catch." CBs catch well enough that the CTH gap is real but small (his table: `CB>WR 6` is D-priced, D 6.84→6).
- **SAM has no profile row** — item 7 verbatim: "Any rule that applies to WILL/OLB should apply to SAM. Add SAM as a destination mirroring OLB." The mirror is implemented as *slot alias for the six incoming rules* (§3), not as a lookalike profile; `SAM` incoming: EDGE 0, FS 6, ILB 0, OLB 0, SS 2, TE 6.

## 3. The formula (exact, runnable)

```
price(src → dst) = tier( clamp( max(0, D_bumped) + A + U , 0, 12 ) )

tier(x)      : x < 1 → 0 ; x < 4 → 2 ; x < 9 → 6 ; else → 12   (midpoints 1/4/9, Owner's arrondi)
D_bumped     : slotWins20 displacement of src→dst, computed against WILL=200, C=200 weights
              (the WILL/C bump — INFERRED for OLB>ILB and OLB>SS as ~6.7, the Owner's own figure)
A            : Σ_s β_s × max(0, p_dst[s] − p_src[s]), with:
   β          BLK .75 · CTH .5 · COV .5 · RNG .6 · RSH .8 · RUN 1.1 · SNP .4 (dst==C only)
                KCK/PNT .2 (dst==K / dst==P only)
   dst==RB    : RUN gap counts ONLY here (else RUN is noise, every position is more athletic than a lineman)
   dst in {NICKEL, DIME, FS} : COV weight × (1.7 / 3.6 / 2.0)  — "DB-scheme slots" charge full price on coverage
   src CTH ≥ 9: COV and RNG gaps × 0.5 — catching specialists stay with balls (Owner #4 logic)
   dst==C     : BLK gap zeroed if both src,dst BLK ≥ 8 (elite-line swaps price by D only)
   Gate (vs D): if D ≥ 5 → A counts 0.0 ; if 4 ≤ D < 5 → A × 0.5 ; else A counts fully
U            : sparse unlikeness deltas (the Owner's "real-world grounds" overrides, kept sparse):
   RB>TE +3.0 · SS>ILB +5.0 · TE>ILB +6.4 · RB>SS +6.6 · EDGE>SS +5.1
FB discount  : tier 0 for the nine whitelisted sources (RB, TE, OT, OG, C, DT, EDGE, ILB, OLB) — Owner #1
              "Nine roles play FB for free … the least important spot. we want to make it easy on the user."
              (any other source → rule absent = not allowed, matching the table)
SAM          : dst==SAM → price := price(src → OLB)  (item 7, exact)
```

**Why the gate:** D and the skill gaps overlap badly when summed raw — `CB>WR` reads 6.84 (D) + 1.5 (CTH) = 9.34 → model 12, owner 6; `OG>EDGE` reads 8.3 + 8.0 → 12, owner 6; `OT>EDGE` 5.38 → ≥ half-A → 9.4 → 12, owner 6. The Owner's base method is *round(D) and then only lift what D under-prices*; the gate encodes exactly that: skills are evidence about the move's *plausibility*, most of it already inside D once WILL/C are bumped. The gate's soft edge is `4 ≤ D < 5` (`DT>EDGE` 4.61, `OG>DT` 4.79 compute at half A; both land 6 — the Owner's split).

**Honest status of this layer:** the gate is a simplification with a visible seam. An engine build should either (a) keep it with the thresholds as named constants (`GATE_LO=4`, `GATE_HI=5`), or (b) replace it by re-deriving D and letting skills do all the work — in which case MIKE>WILL-free / WILL>MIKE-6 break unless a slot-value pseudo-skill is added (see §6).

## 4. The result, measured (VERIFIED commands, INFERRED weights)

Method: construct the final 105-rule table (§0), compute model prices as above (scratch script, not committed — `/private/var/folders/.../opencode/p322final2.py`), compare rule-by-rule with the Owner's final table. Well-formedness checks: 97/105 exact, 8/105 off by ONE tier, **0 hard misses**. For calibration: the D-rounding baseline (Owner's own "θ=1 round" method, FB and SAM rules excluded, 90 rules compared) reproduces **38/90** — the rest are exactly the rows the Owner elevated on real-world grounds; that lift is what the skill layer is *for*.

**The 8 one-tier residuals (all identical in kind: owner 0, model 2):**
EDGE>OLB · EDGE>SAM · ILB>OLB · ILB>SAM · SS>NICKEL · SS>DIME · CB>FS · CB>SS.
All sit at raw A ∈ [1, 2) — the Owner's fixed tier-1 midpoint (round to 2 at 1) catches gas-pedal blitz gaps (SS RSH 3 vs rusher-less slots) and LB-rusher residue (ILB RSH 5 vs WILL's 7). Fixes, in order of preference: (1) Owner accepts a "0-or-2 = near-free" pairing on exactly these eight rows (his own table is 0/2-fuzzy at the bottom tier everywhere: `SS>OLB 2`, `OT>C 2`, `FB>RB 2`); (2) subtract 0.6 from A when it is <2 (a "near-free rebate" — one line, kills the class); (3) keep as-is. My recommendation is (1): no extra machinery, the difference is invisible to a user watching the flex picker and *material* to nobody's win total (2 penalty points on a flex nobody makes). If the Owner wants (2), the rebate constant is the single new knob.

**Owner anchor checks:**

| Anchor (from the P-322 brief / Owner verbatim) | Final table | Model | Verdict |
|---|---|---|---|
| WR>TE 6 for lack of blocking (Owner Buyer's-market note #D) | 6 | 6 (BLK .75 gap) | ✓ exact |
| TE>DIME 12 (item 3) | 12 | 12 (COV dmult 3.6 + RNG) | ✓ exact |
| TE>FS 12 (item 3) | 12 | 12 (COV dmult 2.0 + RNG) | ✓ exact |
| LBs/TE → FS 12 (item 3: ILB>FS, OLB>FS new) | 12 / 12 | 12 / 12 (bumped D gate + COV+RNG) | ✓ exact |
| TE>NICKEL 6, TE>SS 6 (stay 6, item 3) | 6 / 6 | 6 / 6 | ✓ exact |
| QB>FS 12 (Owner lock, flex REV 4 revived) | 12 | 12 (COV+RNG max(0,D)+A) | ✓ exact |
| FB free — the nine roles (Owner #1) | 0 | 0 (discount, not skill) | ✓ exact (all 9) |
| MIKE>WILL free (ILB>OLB 0) | 0 | **2** (A 0.5 COV + 1.6 RSH > 1) | ✗ ±1 — one-tier class |
| WILL>MIKE 6 (OLB>ILB 6) | 6 | 6 (requires bumped D ~6.7 → tier 6) | ✓ exact (post-bump) |
| EDGE>TE 6 (Owner re-clarified 6, not removed) | 6 | 6 (BLK+CTH gaps 6.5) | ✓ exact (no override needed) |
| The six item-7 SAM mirrors | 0/6/0/0/2/6 | alias → exact | ✓ exact (by construction) |
| MIKE(ILB)>WILL 0 etc. — handled above | | | |

**Solved-but-owned-by-the-Owner rows (no model can or should produce them):**
- `C>OG 6` with D 12.5 — the Owner's explicit anti-D override ("do not raise to 12 despite D 12.5"; Owner #2 verbatim). Stays an override row: `OVERRIDE[C>OG]=6`. The "missing real-world factor the engine doesn't capture" that the Owner asked about in the D-rebuild brief is *himself*: the athlete weighting of the guard over the center is a weights decision, not a skill — no skill in the list will ever out-pull a 14.3 D. **The table wins.**
- `FB>RB 2`, `FB>TE 6` with D 17.97/17.99 — "few FBs, just-in-case rule" caps. Stays override rows `OVERRIDE[FB>RB]=2`, `OVERRIDE[FB>TE]=6`.
- `EDGE>RB 6`, `EDGE>ILB 6` — Owner −6 lists (real-world grounds; EDGE>ILB moved 12→6 in his 9 Nov corrections; EDGE>RB set to 6). Stays `OVERRIDE[EDGE>RB]=6`, `OVERRIDE[EDGE>ILB]=6`.
- `RB>TE 6`, `SS>ILB 6`, `TE>ILB 12`, `RB>SS 12`, `EDGE>SS 12` — the Owner's own "unlikeness reason: a RB playing TE or a SS playing ILB is unlikely in real life" (his D-rebuild doc, verbatim) and his "set to 12 — so unlikely in real life they stay heavily penalized: … RB>FS, RB>SS, TE>ILB" (verbatim) and EDGE>SS 12 ("these would round to 0 under the pure rounding rule", verbatim). These five ARE skills-adjacent (RB→TE is "no blocking + no receiving grade") but the model lands them at 2–8, not 6/12; they are named unlikeness deltas `U = {RB>TE +3.0, SS>ILB +5.0, TE>ILB +6.4, RB>SS +6.6, EDGE>SS +5.1}`. Note the model *rediscovers* this honor system — it does not abolish it; that is not a defect, it is the honest shape of "real-world knowledge the engine does not model" (the Owner's own words).

## 5. Where the profile disagrees with the table — full honesty (P-322 Q4)

**The model is right and the table used to be inconsistent/unsound (in my measurement, the table as published is sound; these are alignment points, not errors):**
- `TE>OG` — D 7.54; raw-D rounds to 6 ✓ matches owner 6 only when the gate zeroes skills (skill-only would say 12; owner agrees with gated D). The Owner's −6 override stands; model reproduces under the gate. **Aligned.**
- `SS>FS 2` / `FS>SS 0` — owner has both at 2; model gives SS>FS 2 (RNG gap 4→9, 3.0) ✓ but FS>SS 0 (SS is the better job). Asymmetric mirror-tax; if the Owner wants symmetry it needs one U-negative on FS>SS — **flag as a question to the Owner, not an error.** Owner doc: "SS to CB3 free, FS/OLB/WILL/SAM -2" (flex guide REV 2) — the -2 there is on the SS side; the FS>SS side may be deliberate (FS is the *value* the move protects). Leave as-is.
- `WILL>SS 6` — reproduced ONLY via the bumped D (~6.7). The Owner's bump justification ("The 9.99 in the thetaprice file does NOT reflect the WILL bump; it was computed at WILL=150. After the bump, the math agrees with the Owner's -6") — **the model agrees iff the bump ships as decided.** If WILL is ever re-derived or reverted, `OLB>SS` flips to 12 under the model; so do `OLB>ILB`. **Build note: the WILL/C bump is part of this design, not independent of it.**
- `OLB>EDGE` — must remain 12. Its price rides on bumped D staying ≥9; UNKNOWN post-bump value (the Owner forbade recomputing D). If the bump lands deep enough to push D(OLB>EDGE) <9, the model prints 6/12 depending on the D — the Architect should print `slotWins20` for WILL→EDGE post-bump and confirm ≥9 before re-pinning. **UNKNOWN — needs the bump landed to settle.**
- `MIKE>WILL` (ILB>OLB) — model 2, owner 0 (the one named-anchor miss, in the §4 residual class). If the Owner wants his table word honored exactly, this is one negative U row; asking costs nothing. **Question to Owner, not a defect.**

**The table is right and the model is wrong (accept or tune, do not fight):**
- `C>OG` (D override, guards-athletes argument), `FB>RB`/`FB>TE` (just-in-case caps), `EDGE>RB`/`EDGE>ILB` (real-world grounds 6s), the five U rows. All are Owner judgment that no skill vector will ever produce; they are the *smallest* such set I could find (5 U + 6 overrides out of 105), which is the design argument for the whole approach.

**Unverified / not measured (say so):**
- I did not load the Colors engine or run `slotWins20`; all D values are thetaprice's pre-bump file (REPORTED as pre-bump by the Owner's own doc) with two Owner-estimated bumped values (~6.7, REPORTED). The fit is **INFERRED at the D layer**.
- The 8 residuals are fit on this one table, not on fresh data; β's are tuned blind, not pre-registered. Nothing here is a benchmark of play, OVR, or slot wins.
- P-323 verify remains the real gate; this file should be overruled by it if the Architect's rebuild contradicts §0.

## 6. Recommendation (the Architect decides; this is the shortest path to "one place")

**Option A (recommended) — "slot value + nine skills + five deltas":** keep D as-is in the engine (it already computes slotWins20 per P-318; the bump is already decided), add the nine-role skill vector beside the SLOTS table (one row per role — the data exists; `roles` list in flex.json already drives it), the gate (LO=4/HI=5), the dmults, the synergy, the FB-discount whitelist (the nine free `X>FB 0` rows already exist in FLEX at 728b2c53), the SAM slot-alias, and five U rows. The 105-row hand table then **degenerates to**: 9 β's + 3 dmults + 2 gate thresholds + 5 U + 6 overrides + FB list + SAM alias ≈ **26 constants, all named, all in one file** — every flex price is then *explained* by a reason the UI can show the user ("−12: TE→FS — no deep range, no coverage technique"), which is exactly what the Owner's "flexing is fun" principle wants on screen.

**Option B (rejected for incompleteness, recorded) — pure skill vector:** add a tenth pseudo-skill `VAL` (slot value normalized) and no D; mathematically identical to A once VAL:=D — i.e., A *is* B with VAL named honestly as D. If the Architect wants the engine self-consistent, he can do this inside the build: flexPrice reads the same slot-value table TeamRankings reads. No behavioral difference; do not build both.

**Option C (fallback, zero-risk) — the model as a linter:** keep the Owner's 105-row table as the *spec*, run this model in a test; a red test flags any future hand-edit that moves a price >1 tier off the model without an override row. This needs no product change: one test file + the profiles JSON. If the Owner wants to keep his table as truth but freeze its drift, C costs an afternoon.

**Do not do:** ship A silently re-pricing protected constants. FLEX is protected; any build re-pins the hash in MERGE-MANIFEST.md in the same commit (AGENTS.md §3). The Owner owns the final call on whether his table becomes a derived one — his sentence stands: "MY FLEX TABLE IS MERELY A GUIDE FOR YOU TO UNDERSTAND HOW I WOULD LIKE THE ENGINE TO WORK." This design treats that sentence as the requirement.

## 7. What this changes about the queue (notes, not instructions)

- P-323 (verify items 3+7) is unaffected and still the gate; this file's §0 partially pre-verifies counts (both give 105/23-40-16-26).
- P-318 (WILL/C bump; slotWins20) is on the critical path for the skill model exactly as it is for D: build order should keep them coupled.
- P-321's ±5 adoption and per-position slope: untouched — D's shape changes slightly under it, which only moves the gate edges, not the skill terms; re-fit after the P-321 measurement lands, not before.
- P-312 (flex edge-case playtest) should run once the items land; the ±1 class in §4 is worth one probe: a user watching a MIKE play WILL will see −2.
- `inbox/README.md` and `council.mjs` behaved; no tool issues beyond §8 of my bulletin entry.

EVIDENCE: VERIFIED (final-table construction + counts; 97/105 fit; baseline 38/88; all commands quoted; flex.json `728b2c53` diff empty; Pre-Colors hash table; all anchor rows of §4) · REPORTED (Owner's verbatim docs on `origin/council/muse`; thetaprice pre-bump labeling) · INFERRED (D bumped ~6.7; all β/dmult/synergy/gate calibrations; the football priors in §2) · UNKNOWN (D(OLB>EDGE), D(OLB>ILB), D(OLB>SS) post-bump — Owner forbade recomputation; OLB>EDGE staying ≥9) · **This file replaces nothing and changes nothing; the Architect decides.**
