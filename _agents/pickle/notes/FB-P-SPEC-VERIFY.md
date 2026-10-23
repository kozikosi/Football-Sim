# FB-P-SPEC-VERIFY.md — can FB and P be added with zero flex edits?

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: verify the FB/P spec Claude will build | DATE: 2026-10-21

Build under test: `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. **This is the build as it stands now** — it has moved twice since my last read (`40233d6b…` → `044d1759…`); every line number and hash below is measured on `044d1759…`. Read-only: I edited no product file, no protected constant, no other lane.

**Owner's confirmed rules (from this session's brief):**
- FB and P become draft-board slots; both are drafted.
- 28 rounds, 32 × 28 = 896 picks.
- HB/FB/TE may play FB at no flex cost; K and P may play P at no flex cost. *(The Owner clarified the punter rule to mirror the fullback rule.)*
- Other positions may flex into the role, exactly as SAM works.
- **No existing flex penalty changes.** Only new FB and P rules are added.
- SAM is the precedent. Site labels unchanged (players coded HB, slots named RB1/RB2).

---

## POINT 1 — Can FB and P be added with ZERO edits to any existing FLEX entry or penalty?

**VERDICT: No — not with zero edits to *protected constants*. But YES with zero edits to `FLEX` itself, if the change follows the SAM precedent through `NATURAL_SLOT_MAP`.**

This is the crux, so it is stated precisely.

### 1a. `FLEX` needs no edit — the SAM precedent proves it

**VERIFIED.** `SAM` today is filled by **ordinary flex, with no special-case code**:

```
$ grep -nE "=== *['\"]SAM|slot *=== *['\"]" merged.html   →   (no output)
```
There is **no branch anywhere that keys on a slot name**. SAM is reachable because `NATURAL_SLOT_MAP.MIKE = ['MIKE','WILL','SAM']` and `NATURAL_SLOT_MAP.WILL = ['WILL','MIKE','SAM']` (l.935) make MIKE and WILL *natural* at SAM, so `flexRule` returns `0` before it ever consults `FLEX`. Other positions reach SAM through the shared `LB_FLEX` table (`FLEX.MIKE = FLEX.WILL = FLEX.SAM = LB_FLEX`, l.939/945).

**So the FB and P rules can be added the same way: through `NATURAL_SLOT_MAP`, with `FLEX` left alone.** I proved it by executing the build's own `flexRule` on a patched copy of its constant block:

```
PATH A (NATURAL_SLOT_MAP route — the SAM precedent):
   flexRule(FB,FB) = 0      flexRule(P,P) = 0
   flexRule(HB,FB) = 0      flexRule(TE,FB) = 0      flexRule(K,P) = 0
   touches FLEX? NO.   touches NATURAL_SLOT_MAP? YES (protected).
```

That is exactly the ruled behaviour, and it adds **no** new machinery.

### 1b. But it CANNOT be done with zero edits to *protected* constants — and that is the honest answer

`NATURAL_SLOT_MAP` is a **protected constant** (AGENTS.md Prohibited Actions; R-rulings). The FB/P change **must** touch it, and **also** `ROSTER_SLOTS`, `SLOT_FAMILY`, and `WV_SLOT_GROUP`. Named individually:

| Constant | Line | What must change | Protected? |
|---|---|---|---|
| `ROSTER_SLOTS` | 924 | append `'P','FB'` (26 → 28 slots; `TOTAL_ROUNDS` derives from `.length`) | **yes** |
| `SLOT_FAMILY` | 930 | add `P:'P', FB:'FB'` (else family lookup for these slots is `undefined`) | **yes** |
| `NATURAL_SLOT_MAP` | 931–938 | add `FB:['FB']`, `P:['P']`; and add `'FB'` to `HB` and `TE`, add `'P'` to `K` — this is what makes HB/FB/TE free at FB and K/P free at P | **yes** |
| `WV_SLOT_GROUP` | 1315 | add `P:'P', FB:'FB'` — **see the trap in Point 4; without this the slot totals go silently wrong** | **not listed as protected, but load-bearing** |
| `FLEX` | 940–952 | **no change required** | yes — but untouched |

**What this means for the Owner, plainly:** the change is **possible exactly as ruled**, and it needs **no change to any existing flex penalty** — but it is **not** a "no-protected-constant" change. The Architect must approve the `ROSTER_SLOTS` / `SLOT_FAMILY` / `NATURAL_SLOT_MAP` / `WV_SLOT_GROUP` edits. **`FLEX` — the thing the Owner said not to touch — is genuinely untouched under the SAM route.** That is the good news, and it is worth stating as such.

**And the one thing that cannot be reached:** there is no way to add FB and P as *drafted slots* without touching `ROSTER_SLOTS`, because `TOTAL_ROUNDS = ROSTER_SLOTS.length` (l.925) is how the round count is defined. Adding the slots *is* the mechanism for the 28 rounds.

---

## POINT 2 — Verify 32 × 28 = 896, and that snake order still gives every team exactly 28 picks

**VERDICT: The arithmetic holds (896; 28 per team), BUT the build has TWO hardcoded `32*26` gates that would break a 28-round draft. This is a real blocker Claude must fix.**

### 2a. The arithmetic — VERIFIED

```
$ python3 -c "print(32*28, (32*28)//32)"   →   896 28
```
**NOTE — correction to MOC's brief, which reads "32 × 28 = 918".** 32 × 28 = **896**, not 918. (918 is not a multiple of 32; it appears to be a typo.) The figure the Owner gave — **896** — is correct. Flagging it because 918 is now in circulation.

### 2b. Snake order gives every team exactly 28 picks — VERIFIED structurally

`buildSnakeOrder()` (l.1159–1166):
```
for(let r=0;r<TOTAL_ROUNDS;r++){ const teams=[...Array(32).keys()]; if(r%2===1) teams.reverse(); order.push(...teams); }
```
Each round pushes all 32 teams once → every team appears **once per round**. With `TOTAL_ROUNDS = ROSTER_SLOTS.length = 28`, the order length is `28 × 32 = 896` and **each team gets exactly 28 picks**. The snake reversal on odd rounds does not change the per-team count. **VERIFIED.**

### 2c. THE BLOCKER — hardcoded `32*26` at l.849 and l.866

**VERIFIED by direct search:**
```
$ grep -nE "32\*26" merged.html
849: if(draftSim && draftSim.pos >= 32*26){
866:   ${(draftSim && draftSim.pos < 32*26) ? '<button class="tabbtn" id="goDraftResumeBtn">Continue draft in progress</button>' : ''}
```
These are **not display strings** — they are **control-flow gates** in `goSeason()`:

- **l.849** decides whether the season stage shows *"Your 26 starters are done"* (or *"draft 26 starters first"*). With 28 rounds, after pick **832** the code believes the draft is finished, shows the season hero ("Your 26 starters are done"), and **the last 64 picks (2 rounds) never happen.**
- **l.866** controls the *"Continue draft in progress"* button: it would **disappear at pick 832**, so a user mid-draft past that point loses their only resume path.

Under the ruled change the correct value is `32*TOTAL_ROUNDS` (or `32 * ROSTER_SLOTS.length`), **not** the literal `32*26`. **This is the single most important line-item in the spec** — it is exactly the kind of hardcoded-26 that looks like display and is not.

### 2d. Two display strings also hardcode 26 — cosmetic, but they will read wrong

- **l.5002** — Guide: *"the 26 starting spots on this site"*.
- **l.5058** — Guide section title: *"Position values: all 26 starting spots"* (this string is already in scope of the pending Guide merge — see item 5).
- **l.850 / l.868** — *"Your 26 starters are done"* and *"draft 26 starters first"* (inside the same `goSeason()` block as the gate).

These do not break behaviour but will read wrong to a user. They must become 28 (or the number derived from `ROSTER_SLOTS.length`).

---

## POINT 3 — Is the SAM precedent ordinary flex, not a special case, so FB/P need no new machinery?

**VERDICT: VERIFIED. SAM is ordinary flex; FB/P need no new machinery *provided the change follows the same route*.**

**VERIFIED, three ways:**
1. **No slot-name branch exists.** `grep -nE "=== *['\"]SAM|slot *=== *['\"]"` → **no output**. Nothing in the product tests a slot's name to give it behaviour.
2. **SAM is filled by `NATURAL_SLOT_MAP`.** l.935: both `MIKE` and `WILL` list `'SAM'` among their natural slots, so `flexRule(MIKE,SAM) = 0` and `flexRule(WILL,SAM) = 0` — confirmed by executing the build's own function. `CB → SAM` reaches the shared `LB_FLEX` table (l.939).
3. **`flexRule` (l.955–961) is the ONLY path** for "may he play there, and at what cost": natural map → `FLEX[pos][slot]` → `FLEX[pos][family]` → else `null` → `EMERGENCY_PENALTY`.

**The FB/P mapping mirrors it exactly** (Path A above): `NATURAL_SLOT_MAP.FB = ['FB']`, `NATURAL_SLOT_MAP.P = ['P']`, and `'FB'` added to `HB`/`TE`, `'P'` added to `K`. **No new function, no new table, no new branch.** The `EMERGENCY_PENALTY = 8` (l.953) path is untouched.

**One precision on the Owner's wording.** The Owner said "HBs can become FBs at no flex cost." Note `NATURAL_SLOT_MAP` is keyed by **player position code**, and the build's code for a running back is **`HB`** (confirmed: 89 `HB` records in `PLAYERS`; there is **no `RB` player code** — `RB1`/`RB2` are *slot* names). So the rule is written on `HB`, exactly as the Owner's "site labels unchanged: players coded HB" instruction requires. **Do not write `RB` into `NATURAL_SLOT_MAP` — that key does not exist and the rule would never fire.**

---

## POINT 4 — Does anything in the confirmed rules contradict the build as it stands?

**VERDICT: Four contradictions, one of them silent. All are fixable; none blocks the ruling.**

### 4a. THE SILENT ONE — `WV_SLOT_GROUP` has no FB/P key, so draft-board slot totals go wrong

**VERIFIED.** `WV_SLOT_GROUP` (l.1315) is keyed by **every slot** and currently has **26 keys, exactly matching the 26 slots**. `SLOT_TOTALS` (l.1578) does `t[WV_SLOT_GROUP[s]]` for every slot. Adding `FB`/`P` to `ROSTER_SLOTS` **without** adding them to `WV_SLOT_GROUP` produces:

```
SLOT_TOTALS groups: {...,"K":1,"undefined":2}
-> t[undefined] = 2     total slots counted: 28 (looks right, is wrong)
```

**Two slots collapse into an `"undefined"` group.** This is the dangerous kind of failure: **no error, no crash, a plausible-looking total.** Two other readers are hit the same way — `replacementLevels` (l.1421, `repl[WV_SLOT_GROUP[s]]`) and `cpuPick`'s raw-weights path (l.1587/1644). Fix: add `P:'P', FB:'FB'` to `WV_SLOT_GROUP`. (MOC's brief flags the `POSITION_TIER`/`_POSITION_TIER` pair as never read — **VERIFIED** here too: it is now renamed `_POSITION_TIER` at l.983, consistent with dead code; it needs no FB/P attention either way.)

### 4b. The "no flex cost" rule is unreachable if only `ROSTER_SLOTS` is edited

**VERIFIED.** With slots added but no `NATURAL_SLOT_MAP`/`FLEX` rule, every ruled pairing returns `null`:
```
flexRule(HB,FB)=null  flexRule(TE,FB)=null  flexRule(K,P)=null  flexRule(FB,FB)=null  flexRule(P,P)=null
```
`flexPenaltyFor` then returns `EMERGENCY_PENALTY = 8`. So a spec that adds the slots and stops would make the FB/P slots **penalised for everyone**, which is the *opposite* of the ruling. The `NATURAL_SLOT_MAP` edits in Point 1 are **not optional**.

### 4c. Supply does not cover demand — but this predates the FB/P ruling and the ruling *improves* two groups

**VERIFIED against the build's own `PLAYERS` (1,200 records):**

| Player code | Records | Slots it must fill (after the change) | Net |
|---|---:|---|---:|
| **HB + FB** | 89 + 8 = **97** | RB1+RB2+FB = **96** | **+1** |
| **TE** | **53** | TE1+TE2 = **64** | **−11** |
| **K + P** | 32 + 32 = **64** | K+P = **64** | **0 (exact parity)** |
| **MIKE + WILL + SAM** | 43 + 43 + 5 = **91** | MIKE+WILL+SAM = **96** | **−5** |

**This independently confirms MOC's three refinements:** the shortfall DS attributed to the backfield is **not** there (the backfield nets **+1** once FB is a slot); the hole is **tight ends (−11)** and predates the ruling; kicking is **exact parity with zero slack**. **I add the LB figure precisely:** the SAM deficit is real (SAM has only **5** records for 32 slots), but the *group* totals 91 for 96 — **−5**, not −27, because MIKE and WILL are natural at SAM and absorb 27 of the 32 SAM slots at zero penalty (as MOC found). The cost does not vanish; it moves downstream.

**Not a contradiction with the ruling** — the ruling does not promise supply — but it is the thing that determines whether a 28-round draft *looks* broken. **Nothing here should stop Claude building the ruled change.** Scalping the pool is a separate, Owner-approved step.

### 4d. Two display strings say "26" where the build is about to say 28

Covered in 2d (l.5002, l.5058, plus l.850/868). Cosmetic, must not be forgotten.

---

## The one-paragraph answer to the Owner

**The FB and P rules can be built exactly as ruled, with no change to any existing flex penalty — `FLEX` is untouched — but the change does require edits to four protected/load-bearing constants (`ROSTER_SLOTS`, `SLOT_FAMILY`, `NATURAL_SLOT_MAP`, `WV_SLOT_GROUP`), so it needs the Architect's approval rather than being a "no-constant" change.** 896 and 28-per-team are correct (MOC's brief says 918 — that is a typo, 32 × 28 = 896). **Two hardcoded `32*26` gates at l.849 and l.866 would silently cut the draft off at pick 832** — that is the real blocker and the first thing Claude must fix. SAM is genuinely ordinary flex with no special-casing, so FB/P need no new machinery. The silent `WV_SLOT_GROUP` gap (Point 4a) is the second must-fix.

---

## Appendix — commands run

| Check | Command | Result | Tag |
|---|---|---|---|
| Build hash | `shasum -a 256 "NFL Draft Simulator merged.html"` | `044d1759e01ac99b…`, 656,746 B | VERIFIED |
| Constants present | `grep -nE "^const ROSTER_SLOTS\|^const FLEX\|NATURAL_SLOT_MAP\|SLOT_FAMILY\|WV_SLOT_GROUP"` | l.924/930/931/940/1315 | VERIFIED |
| 26 slots today | executed build's `ROSTER_SLOTS` | length 26; no FB/P | VERIFIED |
| Ruled pairings today | executed build's `flexRule` | all `null` | VERIFIED |
| SAM = ordinary flex | `grep -nE "=== *['\"]SAM"` | no output (no special case) | VERIFIED |
| SAM via natural map | executed `flexRule(MIKE,SAM)` | `0` | VERIFIED |
| Path A works | executed patched constant block | all five pairings `= 0` | VERIFIED |
| `WV_SLOT_GROUP` gap | simulated `SLOT_TOTALS` with FB/P slots, no group keys | `t["undefined"]=2` | VERIFIED |
| Snake math | read `buildSnakeOrder` l.1159–1166 | 28×32=896, 28/team | VERIFIED |
| Hardcoded gates | `grep -nE "32\*26"` | l.849, l.866 | VERIFIED |
| Display "26" | `grep -nE "26 starting\|all 26"` | l.5002, l.5058 | VERIFIED |
| Supply | `PLAYERS` histogram | HB89 FB8 P32 K32 TE53 LS12; MIKE43 WILL43 SAM5 | VERIFIED |
| DS's backfield claim | arithmetic | backfield nets **+1**, not −10 | VERIFIED (corrects) |
| MOC's 918 | arithmetic | 32×28 = **896** | VERIFIED (corrects) |

**What I did not check:** I did not run the product in a browser (the flex trace executes the build's *constants* in isolation, which is the level the question lives at); I did not verify how a 28-slot `ROSTER_SLOTS` interacts with the season stage beyond the two `32*26` gates (a full E2E run is the verifier's job); I did not check the NBA side; I did not test the alternative CAM/FLEX path on any other position. No product file, protected constant, or other lane was edited.
