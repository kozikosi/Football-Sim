SPEAKER: ernie | ROLE: council | TASK: retest — "EDGE to DT2", measured at four prices | DATE: 2026-11-17T00:50Z
FOR: P-333

# What "EDGE to DT2" is, in the engine's terms

There is no `DT2` destination — `Dest = Role | 'NICKEL' | 'DIME' | 'DL5'` (`slots.ts:8`). The **DT2 slot** has `dest: 'ILB'` in a 3-4 (`case 'DT2': return { slot: 'DT2', dest: 'ILB', row: 'DT2', label: 'ILB2' }`), and `dest: 'DT'` in a 4-3. `EDGE→DT` is already **0**, so the only change that does anything is **`EDGE→ILB`** (currently 6). I tested four prices; everything else is untouched.

# Results

Engine `7a0706df`, table units, positive = 4-3 worth more. Every row is a full re-run (build + 32 clubs × 2 bases + the scenario 2×2).

| `EDGE→ILB` | gap (synthetic) | real mean bias | clubs better in 3-4 | flexed spots (of 2048) | emergency | scenario: DT≤70 | scenario: LB=85 |
|---|---|---|---|---|---|---|---|
| **6 (today)** | 700 | **+1145** | 3 / 32 | 147 | 0 | −95 (17/32) | 32/32 |
| 4 | 700 | +1068 | 3 / 32 | 148 | 0 | −111 (17/32) | 32/32 |
| 2 | 600 | +865 | 3 / 32 | 150 | 0 | −195 (17/32) | 32/32 |
| **0** | **0** | **+469** | 3 / 32 | **127** | 0 | **−369 (17/32)** | 32/32 |

**`EDGE→ILB = 0` closes the synthetic gap to exactly 0** (4-3 loses 1800 in 3-4, 3-4 loses 1800 in 4-3) **and cuts the real-roster bias from +1145 to +469** — the largest structural improvement measured in this round, better than VL's `DT→ILB=6` (+1015) and far better than any re-pricing (best was ~+947). It also **reduces** flexing league-wide (147 → 127) instead of doubling it, which every fitted formula did.

Your scenario is preserved and strengthened: with a weak DT class the 3-4 advantage deepens from −95 to **−369** (still 17/32 clubs), and with a strong LB corps **all 32 clubs** are better in a 3-4, unchanged.

# The honest caveat — and a structural finding

At 0, a 4-3 can also put an **EDGE at MIKE for free**, because the table keys on the *destination* (ILB), not the *slot* (DT2). Counted across the league:

| | 4-3 clubs fielding an EDGE at an ILB spot | 3-4 clubs fielding an EDGE at an ILB spot |
|---|---|---|
| today (`EDGE→ILB = 6`) | 0 | 2 |
| `EDGE→ILB = 0` | **4** | **28** |

So the intended effect is large (2 → 28: an edge rusher becomes a 3-4 inside-backer) and the side effect is small but real (0 → 4: e.g. Myles Murphy, Donovan Ezeiruaku, Cameron Jordan at MIKE).

**The finding worth keeping:** your ask — *"EDGE to DT2"* — is **not expressible in the current flex table**, because the table has no slot-level entries. Pricing `EDGE→ILB` necessarily also prices `EDGE→MIKE` and `EDGE→WILL`. A true slot-level rule (EDGE may play the DT2 slot only) would need an Architect-side change to the flex shape, not a table edit. That is why the side effect exists at all.

I did **not** count the EDGE-at-ILB cases at 2 and 4; they will sit between 4 and 28 and I did not run them.

# What I would do with this

- If the goal is **the gap at 0 and the bias halved**, `EDGE→ILB = 0` is the single best measurement in the round: gap 0, bias +469, flexing down, emergency 0, and your scenario stronger.
- If the 4 edges at MIKE are unacceptable, `EDGE→ILB = 2` is the compromise (gap 600, bias +865) — but it leaves the gap open and only gets a third of the bias reduction.
- The clean version is a **slot-level `EDGE→DT2`** rule in the engine, which the table cannot express today. That is an Architect change, not a price.

**Nothing is implemented.** All four variants are throwaway trees; the live table is untouched.

**Falsifier:** if "better in 3-4" is meant club-by-club rather than on average, `EDGE→ILB=0` leaves the split at 3/32 — the mean moves but no club flips. The clubs that would flip are the ones near zero (Indianapolis +150, Arizona 0), and the change is worth re-checking there before you rely on it.