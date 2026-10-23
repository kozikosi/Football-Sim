# Beam — Owner's two rulings of 22 Oct (game-ball tie-break; position labels vs. position identity)

**Status:** shared reference for every seat. The Owner's words, then the technical mapping verified against the pinned build, then the one thing still open.
**Build:** `NFL Draft Simulator merged.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` · 6,554 lines.

---

# Ruling 1 — the game ball in a tie goes to the least highly rated player by static wins

**The Owner's words:**

> "The least highly rated play by static wins should be the winner in a tie. Therefore players that statistically have less of a chance of putting in an exceptional performance get rewarded for beating expectation. You could also use the player with the least OVR score. but static wins probably breaks more ties."

**The rationale, stated back:** the game ball already rewards *beating expectation* — the build's own comment at l.2365 says *"The game ball goes to whoever most exceeds what is normal FOR THEIR ROLE, so a star RB1 no longer wins by default."* This ruling adds: in a tie, the underdog is the one who beat the most expectation, so the ball goes to the player with the **lowest static wins** (the draft-board value of their slot) among those who exceeded their role baseline.

## What the build does today (verified)

`NFL Draft Simulator merged.html` l.2677-2683:

```js
const winTeam = r.homeScore>r.awayScore ? g.home : r.awayScore>r.homeScore ? g.away : null;
const perfGrade = p => 60 + 5.5*p.impact;
let pool = winTeam ? all.filter(p=> p.team===winTeam || perfGrade(p)>=90) : all;
if(!pool.length) pool = all;
const mvp = pool.reduce((a,b)=> ballScore(b)>ballScore(a) ? b : a, pool[0]);
```

and l.2676:

```js
const ballScore = p => p.impact + (GAME_BALL_BIAS[p.group]||0);
```

**On a tie `winTeam` is `null`, so `pool = all`** (every player on the field) and the pick is the **maximum** `ballScore`. The ruling inverts that ordering for the tie case only.

**The supporting tables (both already in the build):**
- `SLOT_BASE` (l.2366-2367) — keyed by **slot**: per-slot mean and sd of `impact`, e.g. `"MIKE":[5.96,3.27]`, `"WILL":[4.93,2.92]`, `"CB3":[1.72,1.62]`, `"DT1":[3.57,3.02]`. This is the *role baseline* — "normal for their role".
- `GAME_BALL_BIAS` (l.2369) — keyed by **group** (`QB/RB/WR/TE/DL/LB/DB/K`), fitted so game balls land QB 24% / RB 15% / WR 16% / TE 6% / defense 36% / K 3%.
- `gameZ(slot, raw)` (l.2370) — `(raw - mean) / sqrt(sd)`: how far a player exceeded their own role's baseline.

**"Static wins"** is the draft-board value of the player's slot — the `DEFAULT_WEIGHTS` scale (QB 700, RB1 185, WR1 305, …, K 200, P 1, FB 1) as run through `modelWeights()`. It is *not* `impact` and *not* `ballScore`.

## What the change is, in one line

```
tie (winTeam === null)  →  among players who beat their role baseline, pick the LOWEST static wins
otherwise               →  unchanged (max ballScore on the winning team)
```

## The one implementation detail that needs a default

Taken literally, "least highly rated" would hand the ball to a zero-impact bench player. The ruling's own rationale (*"get rewarded for beating expectation"*) implies the candidate set is still **players who exceeded their role baseline**, and the static-wins ordering only decides *among those*.

**Recommended default (one line, for the Architect):**
```js
// tie: the underdog who beat expectation most wins the ball
const z = p => gameZ(p.slot, p.impact);
const qual = pool.filter(p => z(p) > 0);
const cand = qual.length ? qual : pool;
const staticWins = p => slotStaticWins(p.slot);      // draft-board value of the slot
const mvp = winTeam
  ? pool.reduce((a,b)=> ballScore(b)>ballScore(a) ? b : a, pool[0])   // unchanged
  : cand.reduce((a,b)=> staticWins(b) < staticWins(a) ? b : a, cand[0]);
```
with a secondary tie-break of **highest `ballScore`** if two candidates share the same static wins, so the ball still goes to the better performance.

**Cost of being wrong: low** — the tie case is rare (ties are a small fraction of games) and the change is ~3 lines in one function.

**How to check it (one command):**
```sh
grep -n "const winTeam" "NFL Draft Simulator merged.html"
```
→ l.2677. The tie branch is the `null` path.

---

# Ruling 2 — OLB, ILB, NT and Nickel are labels applied at placement, not player positions, and their math is inherited

**The Owner's words:**

> "Why would the math change? OLB, ILB, and NT won't be considered mathematically signifcant positions. It should be treated like the fact that CB3 becomes a Nickel. A lot of other positions could become a Nickel as well. No player in the original player pool identifies as a Nickel. They become a nickel upon being placed in that position.
>
> The same is true for NT, ILB, and OLB. No one is inherently changing their position or their math. The math for the OLBs stays the same as WILLs and the math for the ILB stays the same as MIKEs and the math for the NTs stay the same as DT1. It can be written as 'DT1 / Nose Tackle'"

**Read back in one line: the base scheme and the defensive package decide the *label*; the *slot* decides the math; the *player* never changes position.**

This settles MOC's Q5 ("which flex table is the rule?") and MOC's Q6 ("is the 3-4 a real front or a label?") in a specific way: **it is a label, and it changes no math at all.**

## What the build's tables are keyed by (verified)

| Table | Line | Keyed by | Contains |
|---|---|---|---|
| `NATURAL_SLOT_MAP` | 931-937 | **player position code** | `QB:['QB'], HB:['RB1','RB2'], WR:['WR1','WR2','WR3'], TE:['TE1','TE2'], LT/RT:['OT1','OT2'], LG/RG:['OG1','OG2'], C:['C'], DT:['DT1','DT2'], REDG/LEDG:['DE1','DE2'], MIKE:['MIKE','WILL','SAM'], WILL:['WILL','MIKE','SAM'], SAM:['SAM','MIKE','WILL'], CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'], K:['K']` |
| `LB_FLEX` / `FLEX` | 939-950+ | **player position code** | slot → penalty. `REDG/LEDG:{DT:2, MIKE:4, WILL:2, SAM:2, TE:6, RB:6}`, `MIKE/WILL/SAM: LB_FLEX` = `{DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}` |
| `SLOT_BASE` | 2366-2367 | **slot** | per-slot mean/sd for the game-ball z-score |
| `GAME_BALL_BIAS` | 2369 | **group** | `QB:1.82, RB:-0.50, WR:0.03, TE:-0.30, DL:-0.36, LB:-0.55, DB:-0.45, K:0.10` |
| `DEFAULT_WEIGHTS` | — | **slot** | QB 700, RB1 185, RB2 60, WR1 305, WR2 165, WR3 105, WR4 5, TE1 220, TE2 40, OT1 285, OT2 285, OG1 235, OG2 235, C 235, DE1 360, DE2 305, DT1 260, DT2 210, DL5 5, MIKE 240, WILL 220, SAM 20, LB4 5, CB1 395, CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5, K 200, P 1, FB 1 |

**There is no `FB`, `P`, `CB3`, `NT`, `OLB` or `ILB` key anywhere.** `CB3` and `SS2`/`FS2`/`DL5`/`LB4`/`WR4` exist as *slots* but not as *position codes*.

## What the ruling means for each table

| Change | Effect |
|---|---|
| New slots `OLB1, OLB2, ILB1, ILB2` (3-4) and the label `DT1 / Nose Tackle` | `ROSTER_SLOTS` gains slot *names* only |
| `DEFAULT_WEIGHTS` | **unchanged** — OLB1/OLB2 resolve to `WILL` (220), ILB1/ILB2 to `MIKE` (240), `DT1 / Nose Tackle` to `DT1` (260). **No new weight entries, no changed weights.** |
| `NATURAL_SLOT_MAP` | **unchanged** — still keyed by the player's real position code (a `DT` is still `DT`, a `WILL` is still `WILL`) |
| `FLEX` | **unchanged** — a WILL placed at OLB1 takes WILL's row; a MIKE at ILB1 takes MIKE's row; a DT at `DT1 / Nose Tackle` takes DT's row. **No new penalty rows.** |
| `SLOT_BASE` | must **resolve through the alias** — OLB1 uses WILL's `[4.93,2.92]`, ILB1 uses MIKE's `[5.96,3.27]`, `DT1 / Nose Tackle` uses DT1's `[3.57,3.02]`, `CB3 / Nickel` uses CB3's `[1.72,1.62]`. Otherwise the game-ball z-score would treat a Nose Tackle as an unknown slot and fall through to `gameZ` returning 0. |
| `GAME_BALL_BIAS` | **unchanged** — OLB/ILB are `LB`, NT is `DL`, Nickel is `DB`, which is already how the groups are derived. |
| The **player pool** | **unchanged** — no player gains a new position code. "No player in the original player pool identifies as a Nickel." |

**The mechanism the ruling points to is an alias layer, and it is new work — not a change to the constants:**

```js
// slot label -> the slot whose math it inherits
const SLOT_ALIAS = { OLB1:'WILL', OLB2:'WILL', ILB1:'MIKE', ILB2:'MIKE',
                     'DT1 / Nose Tackle':'DT1', 'CB3 / Nickel':'CB3' };
const mathSlot = s => SLOT_ALIAS[s] || s;
```
then every slot-keyed lookup (`DEFAULT_WEIGHTS`, `SLOT_BASE`, `POS_SLOT_MAP`, `replacementLevels`) resolves `mathSlot(slot)` first, and every position-keyed lookup (`NATURAL_SLOT_MAP`, `FLEX`) is untouched.

**This is the cheapest possible implementation of the 3-4 and it keeps every protected constant exactly as it is.** No new weights, no new flex rows, no pool change — only a label map plus a resolver.

## "A lot of other positions could become a Nickel as well"

Read as: **the Nickel is a package, not a position.** In a Dime package the player at `CB4` could be labelled "Quarter"; in a 4-3 Nickel the player at `CB3` is the "Nickel". The label is assigned by the package the slot is in, and the same slot can carry different labels in different packages. The slot's math never changes. That is why the Owner's example — *"It can be written as 'DT1 / Nose Tackle'"* — is a *slot name with a label*, not a new slot with new maths.

**Consequence for the flex chart:** the chart shows a slot/label pair, and the penalties shown are the *math slot's* penalties. A WILL shown as "OLB1" shows WILL's flex row. A CB shown as "CB3 / Nickel" shows CB's row (which already includes `CB3:4` via `LB_FLEX`).

---

# Still open (one item, unchanged from M-459)

**P0-26 in the work order says:** "3-4: CB3/Nickel on → **nose tackle (DT1) off**; all four linebackers stay on."
**The Owner's 22 Oct answer to MOC Q6 says:** "**The lowest rated linebacker** comes off in 3-4 for the nickel."

Those are in direct conflict, and the Owner's 22 Oct ruling does **not** settle it — the ruling is about the *label* and the *math*, not about which player comes off. The arithmetic also disagrees with the work order: 3 DL + 4 LB + 5 DB = 12 is legal (a 3-4-5), and 3 DL + 3 LB + 5 DB = 11 needs one more DB, which is the 4-3 case where SAM comes off. So the work order's "3-4 → NT off, all four LBs stay" is a *legal* reading (3-4-5), but it is not the Owner's answer.

**One sentence needed:** in a 3-4, going to Nickel, does the **lowest-rated of the four linebackers** come off (Owner's answer, giving 3-4-4-5), or does the **nose tackle** come off with all four LBs staying (work order P0-26, giving 3-4-5)? Recommended default: **the Owner's answer — the lowest-rated of the four LBs comes off** — because it is the newer ruling and it keeps the front intact.

---

**What I did NOT check:** whether `optimalLineup` / `effOvr` / `replacementLevels` already contain a slot→value resolution path that an alias layer would slot into (I verified the *keying* of the five tables, not every read site of them); whether the 3-4 slot names can be added to `ROSTER_SLOTS` without changing the 26-round / 832-pick arithmetic (that is P0-20's question and Claude's); the rendered result of any of it. What I did check: every line number, key set and table quoted above, by grep against the pinned build.

**Self-audit (R5):** this note is in my own lane (`_agents/beam/notes/`). No product edits. No other session's file touched. Build pin re-verified: `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`.
