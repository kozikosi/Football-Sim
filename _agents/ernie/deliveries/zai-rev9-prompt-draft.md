# Work order — Z.ai, Rev 9: the decision-grade derivation, the constant harness, and closing the last three

**To:** Z.ai (architecture seat)
**From:** the council, via KG. **KG sends this. Do not send it yourself.**
**Supersedes:** the Rev 7 work order (which Rev 8 executed). Do not re-execute Rev 6, 7 or 8.
**Rev:** 9 — 2026-11-16.

---

## Why this exists

Rev 8 closed the store question, closed the errata, closed E3, and withdrew the ~55% rather than defending it.
It is the first delivery in this exchange that closed more than it opened. What remains is:

1. **three small loose ends** from my Rev 8 review (one erratum, one vacuous-pass gate, one uninterpreted receipt);
2. **one question the council opened and nobody has productised** — P-333, the flex derivation. The council
   showed the DIME penalties are derivable and that a derived table cuts the formation gap 900 → 300. That is a
   *prototype on a synthetic 70-OVR roster*. It is not yet something the Owner can rule on;
3. **one correctness defect in the harness that prices every flex experiment** — the optimizer's priority
   ladder. It is the Architect's to fix, but the *test that proves it* does not exist and you are the seat with
   the measurement discipline to write it;
4. **the sealed recipe**, which is the named falsifier for the entire verdict and is still OWED.

This Rev is long on purpose. Budget **45–60 minutes**. A reply without Part A's frontier table is incomplete by
construction.

---

## Part 0 — the three loose ends (small; do these first, they are quick)

**0.1 — Ship `r51_patch.py` or strike the claim.** `REV-5.1-ADDENDUM.md:7` says "(`scripts/r51_patch.py`,
applied 17/17)". The file is still not in the tree. Either ship it, or change the line to say the applier is
not shipped and the 17/17 is unverifiable from the delivery. Do not leave a citation pointing at an absent file
— that is the one item from my Rev 8 review still open.

**0.2 — The C2 gate passes vacuously.** `receipts/gate-c2-rev8-pass.txt` reports:

```
manifest REV-5.1-addendum/MANIFEST.txt: 0 entries, 0 OK, 0 MISMATCH, 0 MISSING → PASS
GATE RESULT: PASS — 1023 entries verified across 4 manifest(s)
```

`REV-5.1-addendum/MANIFEST.txt` is 53 lines of **prose**, not a sha-list. The gate read it as a checksum
manifest, found zero entries, and passed it. **Fix: if a manifest parses to zero entries, exit non-zero with
"unparseable" and name the file.** Then re-run and show the before/after. The 1,023 will drop to 663 and become
honest.

**0.3 — One line on E3's `0 of 32 starters`.** `receipts/e3-devtools-vue.json` and `-svelte.json` both report
`countBeforeSort: "0 of 32 starters"`, `ovrTopAfterSort: "99"`. Identical across two frameworks is either real
parity or a probe reading a list that is empty at that point. Say which, in one line, in `RECEIPT.md`. The
`e3-part-a-live` receipts are unambiguous, so the store half of E3 is fine; it is the devtools half that needs
the gloss.

**0.4 — Put both gates in CI.** `gate-manifest.mjs` and `gate-numerals.mjs` exist and work. Wire them into
`.github/workflows/ci.yml` as steps that actually fail (not `continue-on-error` — see 0.5).

**0.5 — Report-only CI needs an expiry.** I raised this for the Architect's repo and it applies to yours:
`.github/workflows/ci.yml` marks every step `continue-on-error`, so the run summary says green on a commit
whose build fails. If you keep that, put `REPORT-ONLY` in the workflow `name:` and a comment naming the date or
condition on which it flips to gating. A green check that cannot go red is worse than no check.

---

## Part A — the candidate ladder (the real work)

### The situation you are walking into

The council answered P-333 on 2026-11-16 (`inbox/20261116-0015-ernie-P-333-derivation.md`, seat ernie). The
findings you need, all measured against `origin/architect/engine-and-seats` @ `86f22d10`:

- **The architecture is already what the Owner asked for.** `lineup.ts:59` computes
  `v[dest] × (ovr − penalty)` — the **destination's value** times the player's effective OVR. The flex table is
  therefore a **distance in OVR points**, not a price in wins; the optimizer supplies the destination weight.
  Say this plainly in your write-up, because it removes half the apparent problem.
- **The DIME penalties are derivable.** Athletic shortfall A from the P-322 skill profiles: TE>DIME 11.10,
  ILB>DIME 12.40, OLB>DIME 11.20 → all tier **12**. The Owner can keep TE/ILB/OLB>DIME at −12 **without
  hand-setting them.**
- **Two places the raw formula is wrong:** FB>TE derives to **12** (displacement D = 17.99 dominates A = 5.20;
  the Owner has approved 6→2) and it wants WR>CB/FS/SS/NICKEL/DIME at **2**, reverting the Owner's cross-side
  floor of 6 unless the floor is encoded as a *constraint*.
- **Measured effect on the formation gap** (roster = one native per spot at 70 OVR, DL5 = DT):

  | table | loss(4-3) | loss(3-4) | **formation gap** | flexed spots |
  |---|---|---|---|---|
  | live (99 rules) | 2700 | 1800 | **900** | 3 |
  | formula + floor 6 | 2100 | 1800 | **300** | 4 |
  | formula, no floor | 2000 | 1800 | **200** | 4 |

- **The catch:** the gap closes by lowering *other* pairs (SS>ILB 6→2, TE>ILB 12→6, EDGE>SS 12→6, RB>SS 12→6)
  — the same hand-lowering the Owner objected to, automated — and the **flexed-spot count rises 3 → 4**. A
  small gap and few out-of-position players are opposite goals. The no-floor limit case is a **running back
  playing wide receiver at −12**.

**That is a prototype on a synthetic roster. The Owner cannot rule on it.** Your job is to make it
decision-grade.

### A1 — build the ladder

Sweep the two real parameters and build **at least 8 candidate tables**:

- **floor** ∈ {none, 2, 4, 6}
- **cuts** ∈ {(1, 4, 9), (1.5, 4, 9), (2, 5, 10)}

Keep the P-322 `override` map (including FB>TE) and the `fbFree` list as explicit exemptions — those are the
Owner's rulings, not formula failures. Use `tools/mathlab/flexderive.mjs` as the starting point and extend it;
do not fork it silently. **Do not edit `tools/mathlab/flex.json`** — it is the Architect's. Candidates go in
your inbox as a proposal.

### A2 — measure each candidate on six axes

For **every** candidate, report with the command and its output:

1. **formation gap** under the *reference* provider (`tableValues()`) and under the *measured* one
   (`DEFAULT_VALUES`). Both. The Owner's "about 900" is the table figure; the measured one is 914.5.
2. **flexed-spot count** for a 4-3 roster in a 3-4, and for a 3-4 roster in a 4-3.
3. **Out-of-position count on a NATIVE roster** — a roster already built for its own base must flex **zero**
   players. Any candidate that moves a player in his own base is broken; report it as a hard fail.
4. **The worst pair** — the most absurd assignment any candidate produces, named (e.g. `WR4←RB@12`). This is
   the realism gate, and it is the one that killed the no-floor variant.
5. **fit against the live table** — exact / off-by-one-tier / hard misses, out of 99.
6. **rule count** — a derived table covers pairs the Owner never ruled on. Report how many rules each candidate
   adds beyond the 99, and what the emergency fallback was doing for those pairs before.

### A3 — run it on the real pool, not a synthetic roster

**This is the falsifier I filed and it is the point of the exercise.** Every number above was measured on a
synthetic roster of 70-OVR natives. Build the rosters from the **real player pool** (`data/nfl/madden27-ratings.csv`,
1,953 players; `buildPool` in `players.ts`) — for example: for each of several real teams, take that team's
actual roster, ask for its optimal lineup in its own base and in the other, and measure the gap.

If the real pool does **not** reproduce the direction (gap falls, flexed count rises), say so plainly and
report the synthetic numbers as the artefact. **A negative result here is a legitimate and valuable
deliverable** — it would kill the derivation before the Owner wastes a ruling on it.

### A4 — the deliverable

One page, `PART-A-LADDER.md`:

- the frontier table (candidate × the six axes);
- **one recommended point**, named, with what it costs — "floor 6 / cuts 1.5-4-9 gives gap X at Y out-of-position
  players; I recommend it because …";
- one line on whether the real pool confirms or overturns the synthetic result;
- a plain statement of what the Owner is actually choosing between, in his terms: **a smaller formation gap and
  fewer players moved out of position cannot both be maximised.** Put a number on the trade.

---

## Part B — the optimizer-constant harness

### The defect

`colors/src/sports/nfl/engine/lineup.ts:25`:

```ts
const ILLEGAL = 1e12, PLAYS = 1e7, EMERGENCY = 1e5;
```

with the comment stating the intent: *"3. as few emergency (−8) fills as possible; 4. the highest total
value × effective OVR."*

Measured on the live provider (32 spots, `sum(v) = 8,628.6` fitted-weight units):

| quantity | value |
|---|---|
| `v_max` (QB) | 999.31 |
| largest single-spot value swing (`v_max × 99`) | **98,932** |
| largest whole-lineup value (`sum(v) × 99`) | **854,227** |
| `EMERGENCY` | **100,000** |

**`EMERGENCY` is 1.01× the largest single-spot swing and 0.12× the whole-lineup maximum.** Priority 3 is
therefore not strictly above priority 4. The council's A/B on 300 identical seeded rosters, changing only
`EMERGENCY` from 1e5 to 1e9:

```
assignment changed: 164 (55%)
  strict-emergency used MORE emergency fills: 0
  strict-emergency used FEWER: 139
mean emergency fills: 1.010 -> 0.000
```

### B1 — write the test that catches it

Build `tools/mathlab/emergency-scale.mjs` (or your own name): a read-only script that

1. computes the value scale from the provider (`sum(v) × MAX_OVR`) and asserts `EMERGENCY > scale`, reporting
   the ratio;
2. runs N seeded rosters under the shipped constant and under a strict constant, and reports how many
   assignments differ and the mean emergency-fill count;
3. exits non-zero if the ratio is below 1 or if any roster's assignment changes.

Run it on the current tree and show it **failing**. That failure is the receipt.

### B2 — propose the fix, do not land it

`lineup.ts` is the Architect's. Write the patch as a proposal in your inbox, in the §5 patch form (target
build + sha, WHERE anchor, old → new, WHY, SAFE ALONE?, HOW TO CHECK). The shape I would propose:

```ts
// priorities scale with the provider, so they cannot silently break when values are re-measured
const scale = slots.reduce((t, _, j) => t + v[j], 0) * MAX_OVR;   // ~854k today
const EMERGENCY = 2 * scale;      // strictly above the whole-lineup value
const PLAYS     = 1e3 * scale;    // strictly above EMERGENCY x spots
```

Then show the harness passing on a patched *copy* — never on the shipped tree.

**Why this matters beyond tidiness:** any flex measurement that depends on who ends up in a last-resort spot is
currently measuring a magic constant. That includes Part A.

---

## Part C — the sealed recipe, made turnkey

`SEALED-RECIPE.md` is the named falsifier for the whole verdict and it is **OWED, not run**. You cannot run it
(you have the tree in your head). Someone else has to. Make it possible for them.

**C1 — cold-read audit.** Read `SEALED-RECIPE.md` as an agent who has never seen either repo. For **every
step**, ask: *could I execute this without asking a question?* List every step that fails that test — every
place it assumes you know a path, a command, a convention, an output format, or what "done" looks like.

**C2 — fix them and re-issue.** Each fix is a sentence in the recipe. Where a step depends on a convention,
state the convention. Where it depends on a command, give the command and the expected output.

**C3 — ship the two things a runner will need that are not in the recipe:**
- a **preflight** block: the exact clone/install/build commands, with expected output, so a runner knows the
  tree is sound before starting;
- a **what counts as a stall** list: the three most likely places a fresh agent gets stuck, and what to do.

**C4 — state the falsifier so a runner can apply it without judgement.** `VERDICT-REV-8.md` has the flip and
confirm thresholds (2.0× / <1.0×, wash between). Restate them as a **rule the runner applies mechanically**,
with the arithmetic spelled out, so two runners get the same answer.

---

## Part D — restate the verdict

One page, replacing `VERDICT-REV-8.md`. It must carry:

1. what Parts 0–C changed (including "nothing", if that is the answer);
2. the ladder's recommended point, or a plain statement that the derivation is not ready and why;
3. the sealed recipe's status — still OWED, with the cold-read audit result;
4. the confidence figure, **with no number attached if the sealed bench is still unrun** — that discipline was
   right in Rev 8, keep it;
5. one line on what would have to be true to change the pick.

---

## What not to do

- **Do not re-run E0–E4.** They passed; the batteries are green.
- **Do not edit `tools/mathlab/flex.json`, `lineup.ts`, `flex.ts`, or anything under the Architect's tree.**
  Candidates and patches go in your inbox as proposals.
- **Do not touch the engine** (`d3bd81d2`, byte-identical in both repos).
- **Do not quote a synthetic-roster number as product evidence** without saying it is synthetic. A3 is the
  test of whether it means anything.
- **Do not "fix" a number to make a gate pass.** If a gate fails, the gate is the finding.

## Minimum evidence — the checklist

Tick every line, or write the command and its output beside it. A reply without this block is incomplete.

```
[ ] 0.1  r51_patch.py shipped, or "17/17 unverifiable" stated
[ ] 0.2  C2 gate fails on an unparseable manifest; before/after receipts
[ ] 0.3  one line on E3's "0 of 32 starters"
[ ] 0.4  both gates wired into CI, failing (not continue-on-error)
[ ] 0.5  REPORT-ONLY named and dated, or flipped to gating
[ ] A1   >= 8 candidate tables spanning floor x cuts
[ ] A2   six axes per candidate, each with its command
[ ] A3   the REAL player pool run — confirms or overturns the synthetic result
[ ] A4   PART-A-LADDER.md with one named recommendation and the trade-off in the Owner's terms
[ ] B1   emergency-scale.mjs shipped and FAILING on the current tree
[ ] B2   the fix as a §5 patch proposal, with the harness passing on a copy
[ ] C1   cold-read audit listing every step that assumes knowledge
[ ] C2   recipe re-issued with the fixes
[ ] C3   preflight block + "what counts as a stall" list
[ ] C4   falsifier restated as a mechanical rule
[ ] D    the one-page verdict restatement
[ ] Z    VERIFY.txt a stranger can run; all manifests verifying; no vacuous passes
```

## Verified-as-of (load-bearing premises, stated positively)

- Engine pin `d3bd81d2`; `colors/src/sports/nfl/engine/lineup.ts`, `core/hungarian.ts`, `flex.ts` (note: **not**
  `colors/src/engine/…` — the prompt that shall not be named got this wrong).
- `EMERGENCY = 1e5`; `sum(v) = 8,628.6`; `v_max = 999.31`; largest single-spot swing 98,932; whole-lineup max
  854,227.
- Formation gap: **900** under `tableValues()`, **914.5** under `DEFAULT_VALUES`; loss(4-3) 2700 / 2773.04,
  loss(3-4) 1800 / 1858.53.
- The DIME rules are TE>DIME, ILB>DIME, OLB>DIME, all at 12; their athletic shortfalls are 11.10 / 12.40 / 11.20.
- `flexderive.mjs` reproduces 88/99 of the live table (11 off-by-one-tier, 0 hard misses); 5 rules carry named
  `U` deltas; 14 are fiat (override + fbFree).
- Rev 8 errata: 0.1–0.4, 0.6, 0.7 closed; **0.5 open**; 0.8/0.9 raised and closed by Z.ai himself.
- `REV-5.1-addendum/CHECKSUMS.txt` 360/360 OK; `REV-5.1-addendum/MANIFEST.txt` is 53 lines of prose and parses
  to 0 entries under the C2 gate.
- Sealed recipe: `SEALED-RECIPE.md` sha256 `7fcc3fc0…`, status OWED, bench unrun.

## Revision ledger

- **Rev 9 (2026-11-16):** new work order, supersedes the Rev 7 order (executed as Rev 8). Adds Part 0 (three
  loose ends from the Rev 8 review, plus CI wiring and the report-only expiry), Part A (the P-333 candidate
  ladder made decision-grade, including the real-pool falsifier), Part B (the emergency-scale harness and the
  patch proposal for the optimizer's mis-scaled priority constant), Part C (the sealed recipe made turnkey via a
  cold-read audit), Part D (the verdict restatement), and a minimum-work contract.