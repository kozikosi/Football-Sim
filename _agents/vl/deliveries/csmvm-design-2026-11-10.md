# VL — Cross-Sport Marginal Value Model (CS-MVM): From-Scratch Design

SPEAKER: VL | ROLE: Council seat | TASK: Design a generalizable cross-sport valuation model from first principles | DATE: 2026-11-10

## 0. Executive summary

The existing approach piggybacks on football-specific tables (flex matrices, RATING_SPECS, DEFAULT_WEIGHTS, slotWinsPerOvr) that do not generalize. This design starts from scratch with a model that works for football, basketball, soccer, baseball, hockey, or any team sport, by decomposing value into sport-agnostic primitives and letting sport-specific "adapters" translate them into on-field impact.

Name: **Cross-Sport Marginal Value Model (CS-MVM)**.
Core unit: **Marginal Wins Added (MWA)** — expected wins a player adds over a replacement-level team in a season, normalized per sport.
Key innovations: atomic skill vectors + role adapters + usage-diminishing-returns + synergy/conflict graph + dynamic replacement baseline + Bayesian shrinkage + multi-timescale aging.

---

## 1. Why previous designs don't generalize

| Existing construct | Sport-specific assumption | Fails for |
|---|---|---|
| `RATING_SPECS.olRun` | Football run-blocking shares | Basketball (no "run blocking"), soccer |
| `flex.json` tiers | Football positional flexibility | Soccer (roles fixed by formation), baseball (positions rigid) |
| `DEFAULT_WEIGHTS` | Madden OVR scale, 700-cap | Non-Madden sports, no OVR concept |
| `slotWinsPerOvr` | 700-scale nearest-5 quantization | Sports without a 0-99 rating system |
| `teamRatings` blend | Offensive/defensive unit split | Sports without clear O/D split (soccer) |

**Design rule**: no football-specific constant may appear in the core model. Football is just one adapter.

---

## 2. Core philosophy (what generalizes across sports)

Every team sport shares four structural facts:

1. **Scarcity**: Some roles are harder to fill well than others (QB > kicker; point guard > center; striker > goalkeeper).
2. **Diminishing returns**: A team cannot stack five ball-dominant creators and get five creators' worth of value.
3. **Complementarity**: Some skill pairs amplify (shooter + creator; pass-rusher + coverage); some conflict (two ball-dominant creators; two slow defenders).
4. **Replacement-level is dynamic**: The value of a player is measured against what's available on the waiver wire / draft right now, not a fixed number.

A cross-sport model must express all four in sport-agnostic terms, then let each sport fill in the details.

---

## 3. Mathematical framework

### 3.1 Atomic skill vector

Every player has an **atomic skill vector** `a ∈ R^k` over k sport-agnostic dimensions:

| Dimension | Meaning | Football example | Basketball example | Soccer example |
|---|---|---|---|---|
| `create` | Generate offense from nothing | QB passing, scramble | Shot creation, handles | Dribbling, key passes |
| `finish` | Convert opportunities to score | TD passes, rushing TD | Shooting, finishing | Shooting, finishing |
| `defend` | Prevent opponent scoring | Tackling, coverage, rush | Steals, blocks, defense | Tackling, interceptions |
| `distribute` | Move the ball efficiently | Short passing, RB vision | Passing, assists | Passing, progression |
| `presence` | Gravity/attention drawn | Deep threat, pass rush | Rim protection, spacing | Aerial ability, pressing |
| `durability` | Availability, health | Games started, snaps | Games played, MPG | Games played, minutes |

Each dimension is scored 0–1, independently of position. A QB and a WR both have `create`; a DT and a CB both have `defend`.

### 3.2 Role adapter (sport-specific translation)

Each sport defines a set of **roles** (positions). Each role maps atomic skills to **on-court impact** through a weight vector `w_role ∈ R^k` and an **impact ceiling** `c_role` (max value a player in that role can add per game).

`base_impact(player, role) = clip(dot(a, w_role), 0, c_role)`

This is where sport-specific knowledge lives — but it's a small adapter, not the core model. Football's adapter gives OL high `defend`/`distribute` weights for run blocking; basketball's gives centers high `presence` and low `create`.

### 3.3 Usage scaling (diminishing returns)

A player's value is capped by how much they're used. Define `u ∈ [0,1]` = usage share (fraction of team plays/possessions the player is involved in).

`effective_impact = base_impact * min(1, k_use / u)` for `u > k_use`, else `base_impact`.

Where `k_use` is a role-specific saturation constant (creators saturate at low usage; role players at high). This captures: you can't have five 30%-usage creators.

### 3.4 Synergy / conflict graph

Players interact. Define a **pairwise interaction matrix** `I[p_i, p_j] ∈ [-1, 1]` computed from atomic skill overlap:

`I[p_i, p_j] = synergy(skill_profiles) - conflict(skill_profiles)`

Examples:
- Creator + shooter: `+synergy` (creator's gravity opens shooter)
- Two creators: `-conflict` (both need the ball)
- Rim protector + perimeter defender: `+synergy` (complementary defense)
- Two slow-footed defenders: `-conflict` (both get exposed)

`team_impact = Σ effective_impact + Σ_{i<j} I[p_i, p_j] * min(u_i, u_j)`

The interaction term is weighted by the lesser usage — two players only interact if both are on the floor/field together.

### 3.5 Replacement baseline (dynamic)

`replacement(role, league, season)` = expected impact of a freely-available player at that role right now. Computed from the league's waiver/draft pool, not a fixed table.

`MWA(player) = team_impact_with_player - team_impact_with_replacement`

This is **Marginal Wins Added** — the core output, in sport-normalized wins per season.

### 3.6 Bayesian shrinkage

For players with few observed games, shrink `a` toward the role/age prior:

`a_shrunk = (n * a_obs + λ * a_prior) / (n + λ)`

Where `n` = games observed, `λ` = shrinkage strength (higher for rookies/injured). Prevents overvaluing small-sample breakouts.

### 3.7 Multi-timescale aging

Value is projected across three horizons:
- **Current**: this season (`MWA_now`)
- **Peak**: best expected season (`MWA_peak`, typically age 25–28 by sport)
- **Trajectory**: aging curve `age_factor(age)` applied to each atomic dimension (physical skills decline earlier than mental/processing skills)

---

## 4. Cross-sport normalization

To compare across sports, convert `MWA` to a common scale:

`normalized_value = MWA / replacement_team_wins`

Where `replacement_team_wins` = expected wins of a full replacement-level team in that sport (e.g., ~3 wins in NFL 17-game season, ~20 wins in NBA 82-game season, ~40 points in Premier League). This gives a unitless "value multiplier" — how many times better than a replacement team the player makes their team.

Draft value then = `normalized_value * scarcity_multiplier(role) * contract_surplus(age, salary)`.

---

## 5. Football adapter (to show it plugs into this project)

| Football construct | CS-MVM translation |
|---|---|
| `FLEX` table (QB→FS, etc.) | Synergy/conflict graph: QB+FS conflict (both handle ball in different ways), QB+WR synergy |
| `RATING_SPECS` | Role adapter weight vectors per position |
| `DEFAULT_WEIGHTS` | Replaced by dynamic replacement baseline + normalized MWA |
| `slotWinsPerOvr` | `base_impact` via atomic skills → on-field impact → wins |
| `teamRatings` | `team_impact` aggregation |

**Implication for the current codebase**: This is a *replacement* design direction, not a patch. It would live alongside (or eventually supersede) the existing weight tables. I am not editing `specs.ts`, `flex.json`, or `Football-Sim-PreColors.html` for this — it's a proposal for the Architect's consideration.

---

## 6. Why this is better than the current approach

| Dimension | Current approach | CS-MVM |
|---|---|---|
| Generality | Football-only | Any team sport |
| Value source | Fixed tables (DEFAULT_WEIGHTS, slotWinsPerOvr) | Dynamic replacement baseline |
| Player interactions | None (additive weights) | Pairwise synergy/conflict graph |
| Usage limits | Implicit via position caps | Explicit usage-diminishing-returns |
| Small samples | Raw ratings | Bayesian shrinkage |
| Aging | None explicit | Multi-timescale trajectory |
| Cross-sport comparison | Impossible | Normalized MWA |

---

## 7. Open questions for the Owner/Architect

1. Should CS-MVM replace `DEFAULT_WEIGHTS`/`slotWinsPerOvr` in the NFL sim, or run as a parallel "scouting" layer?
2. What atomic dimensions `k` and which sports' adapters to build first?
3. Who owns the role-adapter weight vectors (football = Architect; other sports = future)?

---

## 8. Next steps (if this direction is approved)

1. Define atomic skill schema + normalizers (0–1 per dimension).
2. Build football role adapter (32 positions × k weights + ceilings).
3. Implement `team_impact` + `MWA` in a lab tool (not the product HTML yet).
4. Validate: does MWA reproduce known draft value (QB premium, RB discount)?
5. Only then consider integrating into the product build.

---

**Label**: IDEA (from-scratch design proposal; no code changed; nothing committed to the product).
