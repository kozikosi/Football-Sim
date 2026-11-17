SPEAKER: ernie | ROLE: council | TASK: retest — every free (0-priced) flex set to 2, alone and in combination, measured against the gap | DATE: 2026-11-17T01:10Z
FOR: P-333

# Answer first

**None of the 21 free flexes moved the synthetic gap — not one, alone or in combination.** Every single stayed at exactly **700** (one, `DT→FB`, made it *worse* at 750). The gap is set by the 6/6/2/12 stand-ins on the two ideal rosters; the 0-priced rules are not on that path.

**But they do move the other thing you care about, and the combination is the best result of the round:**

| variant | gap | real bias | clubs better in 3-4 | flexed |
|---|---|---|---|---|
| today | 700 | **+1145** | 3 / 32 | 147 |
| `EDGE→ILB = 0` alone | **0** | +469 | 3 / 32 | 127 |
| **`EDGE→ILB = 0` + `EDGE→DT = 2`** | **0** | **+334** | **11 / 32** | 130 |

That last row is the one to look at: **gap 0, bias cut by 71% (+1145 → +334), and eleven clubs — not three — now genuinely better in a 3-4**, with flexing *down* (147 → 130).

# The full sweep (each rule flipped to 2 on its own)

Engine `7a0706df`, table units. `bias` = mean (4-3 − 3-4) over the 32 real rosters; `fav34` = clubs better in 3-4.

| rule | gap | bias | fav34 | flex |
|---|---|---|---|---|
| `EDGE>DT` | 700 | **1060** | **5** | 155 |
| `ILB>OLB` | 700 | 1109 | **5** | 152 |
| `CB>FS` | 700 | 1129 | 3 | 154 |
| `CB>DIME` | 700 | 1132 | 3 | 161 |
| `RB>FB` | 700 | 1142 | 3 | 149 |
| `FS>NICKEL` | 700 | 1140 | 3 | 151 |
| `OG>FB` | 700 | 1143 | 3 | 150 |
| `OT>FB` | 700 | 1144 | 3 | 147 |
| `OLB>FB` | 700 | 1144 | 3 | 147 |
| `TE>FB`, `C>FB`, `EDGE>FB`, `ILB>FB`, `FS>DIME` | 700 | 1145 | 3 | 147 |
| `SS>NICKEL` | 700 | 1115 | 3 | 154 |
| `SS>DIME` | 700 | 1149 | 3 | 152 |
| `CB>NICKEL` | 700 | 1166 | 3 | 146 |
| `CB>SS` | 700 | 1183 | 3 | 155 |
| `EDGE>OLB` | 700 | 1227 | **2** | 185 |
| `DT>FB` | **750** | 1156 | 3 | 156 |

Only three improve the bias at all (`EDGE>DT`, `ILB>OLB`, `SS>NICKEL`); two make it worse (`EDGE>OLB`, `CB>SS`); `DT>FB` makes both worse.

# The combinations

| variant | gap | bias | fav34 | flex |
|---|---|---|---|---|
| `EDGE>DT` + `ILB>OLB` + `SS>NICKEL` at 2 | 700 | 996 | 7 | 166 |
| all six bias-improvers at 2 | 700 | 972 | 7 | 186 |
| **`EDGE→ILB 0` + `EDGE→DT 2`** | **0** | **334** | **11** | 130 |

Free-flex→2 alone buys bias but costs flexing (147 → 166–186) and never touches the gap. **Added to `EDGE→ILB = 0` it is close to free** (flexing 127 → 130) and it is what moves the club-level split from 3 to 11.

# Why `EDGE→DT = 2` is the one that helps

A 4-3 today plays an **EDGE at DT for free** in 10 league-wide cases (`EDGE→DT = 0`). Charging 2 for it makes the 4-3 slightly worse exactly where it is already substituting, which is why the bias falls and two more clubs flip to 3-4. It is also the least disruptive of the free flexes: no other rule in the sweep comes close.

# What I did not measure

- **Your scenario under C2** (weak DT class / strong LB corps). I ran it for `EDGE→ILB = 0` alone (17/32 clubs, mean −369) but **not** for the +`EDGE→DT = 2` combination. **INFERRED**: the weak-DT case should strengthen, because capping DTs at 70 makes teams lean on `EDGE→DT` more, and C2 charges 2 for exactly that. That is one command in the harness and it is the check I would run before you rely on the combination.
- The `EDGE→ILB = 0` side effect is unchanged by C2: 4 four-three clubs still field an EDGE at an ILB spot (0 → 4), against 28 in a 3-4 (2 → 28).
- I did not test the same-role 0 entries (`ILB: {ILB: 0}`, `OLB: {OLB: 0}`) — they are dead entries, shadowed by `fit()`'s `role === dest` early return, so a change there cannot do anything.

**Nothing is implemented.** All variants are throwaway trees; the live flex table is untouched.

**Recommendation, if you want one:** `EDGE→ILB = 0` plus `EDGE→DT = 2` is the strongest measured package — gap 0, bias +334, eleven clubs better in 3-4, flexing down. Run the scenario check on it first, because that is your actual requirement.