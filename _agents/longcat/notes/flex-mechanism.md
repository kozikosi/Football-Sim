# The football flex mechanism — what it is, and where it transfers

**SPEAKER: LongCat | ROLE: Council reviewer (S-2400–2499) | TASK: flex mechanism analysis (Pickle assignment) | DATE: 2026-10-21 (UTC)**

**Assignment:** Pickle — read the flex implementation, abstract the mechanism, instantiate it for two sports and show where it breaks. **READ-ONLY analysis.** `FLEX`, `NATURAL_SLOT_MAP` and the other protected constants are quoted, never proposed for change. Build: `merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B). Line numbers are that file's.

## 1. The football implementation, from the exact lines

**`NATURAL_SLOT_MAP`** (l.931–938) — position → the slots it fills **for free** (penalty 0). 19 position codes:

```js
const NATURAL_SLOT_MAP = {
	QB: ["QB"],
	HB: ["RB1", "RB2"],
	WR: ["WR1", "WR2", "WR3"],
	TE: ["TE1", "TE2"],
	LT: ["OT1", "OT2"],
	RT: ["OT1", "OT2"],
	LG: ["OG1", "OG2"],
	RG: ["OG1", "OG2"],
	C: ["C"],
	DT: ["DT1", "DT2"],
	REDG: ["DE1", "DE2"],
	LEDG: ["DE1", "DE2"],
	MIKE: ["MIKE", "WILL", "SAM"],
	WILL: ["WILL", "MIKE", "SAM"],
	SAM: ["SAM", "MIKE", "WILL"],
	CB: ["CB1", "CB2", "CB3"],
	SS: ["SS"],
	FS: ["FS"],
	K: ["K"],
};
```

**`FLEX`** (l.940–952) — position → {slot **or slot-family**: penalty}. A listed penalty means **allowed at that cost**; an **absent** key means **illegal (hard constraint)**:

```js
const FLEX = {
	LT: { OG: 0, C: 0, DT: 4 },
	RT: { OG: 0, C: 0, DT: 4 },
	LG: { C: 0, OT: 4, DT: 4 },
	RG: { C: 0, OT: 4, DT: 4 },
	C: { OG: 0, OT: 4, DT: 4 },
	DT: { DE: 4, MIKE: 4, WILL: 4, SAM: 4, OG: 4, C: 4, OT: 6, RB: 6 },
	REDG: { DT: 2, MIKE: 4, WILL: 2, SAM: 2, TE: 6, RB: 6 },
	LEDG: { DT: 2, MIKE: 4, WILL: 2, SAM: 2, TE: 6, RB: 6 },
	MIKE: LB_FLEX,
	WILL: LB_FLEX,
	SAM: LB_FLEX,
	CB: { SS: 2, FS: 0, MIKE: 4, WILL: 4, SAM: 4, WR: 4, TE: 6, RB: 6 },
	SS: { FS: 2, CB: 4, MIKE: 4, WILL: 4, SAM: 2, WR: 4, TE: 6, RB: 6 },
	FS: { SS: 2, CB: 4, MIKE: 4, WILL: 4, SAM: 4, WR: 4, TE: 6, RB: 6 },
	WR: { TE: 4, SS: 4, FS: 4, CB: 4, RB: 6 },
	TE: { MIKE: 6, WILL: 6, SAM: 6, SS: 6, FS: 6, RB: 6 },
	HB: { TE: 6 },
	QB: {},
	K: {},
};
const EMERGENCY_PENALTY = 8; // l.953 — only when no remaining player can legally fill a spot you still need
```

Note the two shapes of entry: a **slot key** (`CB:{SS:2,…}`) and a **family key** (`MIKE:LB_FLEX`), where `LB_FLEX` is a named constant reused for the whole linebacker family.

**`flexRule(pos, slot)`** (l.955–961) — the penalty lookup, and the hard-constraint test:

```js
function flexRule(pos, slot) {
	// penalty if the move is allowed, else null
	if (isNaturalSlot(pos, slot)) return 0;
	const t = FLEX[pos];
	if (!t) return null;
	if (t[slot] != null) return t[slot];
	const fam = SLOT_FAMILY[slot];
	return fam && t[fam] != null ? t[fam] : null;
}
```

**`flexPenaltyFor(pos, slot)`** (l.973–976) — `flexRule`'s result, or `EMERGENCY_PENALTY` (8) when null. So an illegal move is **costed at 8**, not forbidden — unless it is truly unavoidable.

**`effOvr(player, slot)`** (l.978–981) — the effective rating:

```js
function effOvr(player, slot) {
	if (!player) return 70;
	return player[3] - flexPenaltyFor(player[1], slot);
}
```

**`POS_SLOT_MAP`** (l.962–971) — for each position, the slots it can fill, sorted cheapest-first. This is the **eligibility list** the draft board and lineup editor use.

**`optimalLineup(slotmap)`** (l.1206–1213) — the assignment, by the Hungarian algorithm:

```js
const cost = players.map(p=> ROSTER_SLOTS.map(sl=> eligibleSlotsFor(p).includes(sl) ? -slotWins(sl, effOvr(p, sl)) : BIG));
const asg = hungarian(cost), out = {};
for(let i=0;i<players.length;i++){ const j = asg[i]; if(j<0 || cost[i][j]>=BIG/2) return Object.assign({}, slotmap); out[ROSTER_SLOTS[j]] = players[i]; }
```

**`isOutOfPosition(pos, slot)`** (l.972) — `!isNaturalSlot && penalty > 0`, i.e. a visible "out of position" flag.

**What each piece does, in one line each:**
- `NATURAL_SLOT_MAP` — the zero-cost slots per position (the "natural" assignment).
- `FLEX` — the allowed-at-a-cost moves, with **absence = illegal**.
- `flexRule` — the penalty lookup with family fallback and the legality test.
- `flexPenaltyFor` / `EMERGENCY_PENALTY` — the cost of a move, with a safety valve for unfillable spots.
- `effOvr` — rating minus penalty; the number every downstream consumer reads.
- `POS_SLOT_MAP` / `eligibleSlotsFor` — the eligibility set (what the UI offers).
- `optimalLineup` — the max-wins assignment **subject to eligibility**.

## 2. The generalised mechanism

The football table is one instance of this shape. A sport's lineup model is:

| Element          | Football                   | General form                                                               |
| ---------------- | -------------------------- | -------------------------------------------------------------------------- |
| Slots            | `ROSTER_SLOTS` (26, fixed) | a set **S**                                                                |
| Positions        | 19 codes                   | a set **P**                                                                |
| Natural map      | `NATURAL_SLOT_MAP`         | **N : P → 2^S** (penalty 0)                                                |
| Flex table       | `FLEX`                     | **F : P → (S ∪ Fam(S)) → ℕ ∪ {⊥}**, ⊥ = illegal                            |
| Family map       | `SLOT_FAMILY`              | **Fam : S → family name** (one penalty covers a family)                    |
| Penalty          | `flexPenaltyFor`           | **pen(p,s) = 0** if natural, else `F[p][s]` or `F[p][Fam(s)]`, else **⊥**  |
| Safety valve     | `EMERGENCY_PENALTY = 8`    | **E > max(F)**, applied only when nothing legal fills the slot             |
| Effective rating | `effOvr`                   | **eff(p,s) = rating(p) − pen(p,s)**                                        |
| Eligibility      | `POS_SLOT_MAP`             | **E(p) = {s : pen(p,s) ≠ ⊥}**                                              |
| Assignment       | `optimalLineup`            | **argmax over bijections of Σ value(s, eff(p,s))**, restricted to **E(p)** |

**The general rule:** _soft constraints are penalties inside the objective; hard constraints are exclusions from eligibility._ The Hungarian step maximises total wins; the penalty is not a veto (unless the key is absent, in which case the slot is not in `E(p)` at all).

## 3. Instantiation — NBA

| Element          | NBA instance                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| Slots            | PG, SG, SF, PF, C — with a 10–15 man roster there are several slots per position (e.g. PG1/PG2) |
| Positions        | PG, SG, SF, PF, C (or guard/wing/big families)                                                  |
| Natural          | PG→PG slots, C→C slots, etc.                                                                    |
| Flex             | wing↔wing free; big↔big at a small penalty; guard→big at a large penalty                        |
| Hard constraints | **none by position** — this is where it changes (see below)                                     |

**What survives:** the whole machinery — eligibility, penalty-in-the-objective, Hungarian assignment. A 10-player roster with multiple slots per position maps onto `ROSTER_SLOTS` unchanged.

**Where it breaks / must change:**
1. **The hard-constraint axis is wrong.** In football the hard constraints are _specialist positions_ (`QB:{}`, `K:{}`). Basketball's hard constraints are _roles_, not positions — rim protection and primary ball-handling. A "position → slots" table cannot express "only a rim-protector may fill the anchoring slot". The model needs a **role axis** alongside the position axis.
2. **One position code per player.** `player[1]` is a single code. Basketball and soccer routinely list a player at two positions. `NATURAL_SLOT_MAP` would need to be a _list_ of codes, or the natural map would need a many-to-many form.
3. **Positionlessness is a small penalty table, not a different mechanism.** "Flexible, positionless thinking" means most `F` entries exist at small penalties. The mechanism is unchanged; the _values_ are the design work (which the Owner reserved).
4. **`EMERGENCY_PENALTY` has no basketball analogue.** A basketball roster always has a legal fill; the safety valve would be dead code, or would mask a genuine modelling error.

## 4. Instantiation — soccer

| Element          | Soccer instance                                                |
| ---------------- | -------------------------------------------------------------- |
| Slots            | GK, LB, CB, RB, CDM, CM, CAM, LW, RW, ST (formation-dependent) |
| Positions        | same names                                                     |
| Natural          | GK→GK (hard), CB→CB slots, etc.                                |
| Flex             | defender↔midfielder at a penalty; forward↔winger at a penalty  |
| Hard constraints | **GK** (the `QB`/`K` analogue)                                 |

**What survives:** the penalty-in-the-objective shape, the family map (a "defender" family lets one penalty cover LB/CB/RB), and the Hungarian assignment.

**Where it breaks / must change:**
1. **The slot set is not fixed.** Football's `ROSTER_SLOTS` is a constant 26. Soccer's slots depend on the **formation** (4-3-3 vs 3-5-2 vs 4-2-3-1). `S` becomes _per-formation_, so `NATURAL_SLOT_MAP`, `FLEX`, `SLOT_FAMILY` and `POS_SLOT_MAP` all become formation-parameterised. This is the largest structural change.
2. **Position codes are fluid.** Modern soccer uses "fullback", "wing-back", "inverted winger", "false nine" — roles that straddle the natural map. Same fix as NBA: a role axis, or multi-code natural entries.
3. **GK is the only true hard constraint**, and it is a _different kind_ of hard constraint from `QB:{}` — a GK cannot play outfield at any penalty, whereas `QB:{}` is a specialist-position constraint. The mechanism handles it (absent key), but it is worth naming so the table is read correctly.
4. **The emergency penalty is wrong for soccer.** A formation always has a legal fill, so `E` would fire only on a modelling error — same caveat as NBA.

## 5. What transfers and what does not

| Transfers                                          | Does not transfer                                                                   |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Penalty-in-the-objective (soft constraints)        | `ROSTER_SLOTS` as a **fixed** set (soccer is formation-dependent)                   |
| Eligibility exclusion (hard constraints)           | `player[1]` as a **single** position code (basketball/soccer list multiples)        |
| Family map (one penalty for a slot family)         | The **hard-constraint axis**: football = specialist _position_; basketball = _role_ |
| Hungarian max-wins assignment                      | `EMERGENCY_PENALTY` (a football safety valve with no analogue)                      |
| `effOvr` as the single number every consumer reads | The **values** — the Owner reserved all table design                                |

**Conclusion:** the mechanism is a sound general shape — _soft = penalty, hard = exclusion, then optimise_ — and it transfers to basketball and soccer. What does **not** transfer is the football-specific **shape of the axes**: a fixed slot set, a single position code per player, and hard constraints keyed on specialist positions. Those three are the design work for each new sport, and the Owner has reserved it.

**Labels:** the football lines are **VERIFIED** (quoted with line numbers from `40233d6b…`). The generalised model is **INFERRED** from those lines. The NBA and soccer instantiations are **INFERRED** design sketches, explicitly not proposals to change any protected constant. **UNKNOWN:** whether the Owner wants a role axis at all — that is a decision, not an analysis.

**Files edited:** none. Wrote `_agents/longcat/notes/flex-mechanism.md` only.
