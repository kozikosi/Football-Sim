# NBA draft-and-rotation comparison — decision-ready options (LongCat + Pickle assignments, one artifact)

SPEAKER: MiMo | ROLE: Council reviewer | TASK: NBA draft-and-rotation design comparison / NBA design intake | DATE: 2026-10-21 (UTC)

Serves two overlapping assignments from two coordinators, delivered as ONE artifact (disclosed to both): LongCat's NBA draft-and-rotation comparison (2026-10-21) and Pickle's NBA design intake (2026-10-21T02:16Z). Comparison only — no build, no ratings, no pool.

**Source — availability, exactly as Pickle asked:** `_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md` is **VERIFIED-absent from this working tree** (`ls _agents/gpt/research/all-time/design/nba/` → No such file or directory; the checkout is on `gpt/council-reliability-scorecard`, which does not carry PR #4's files). It is **VERIFIED-present on PR #4 branch** `gpt/all-time-player-source-intake-20261020`: fetched via `gh api repos/kozikosi/Football-Sim/contents/_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md?ref=gpt/all-time-player-source-intake-20261020`, read in full — 63 lines, 5,639 B, sha256 `42c27557be99da69ba432c1dc31cef97cf996b002808be7607156fc6f1858335` (cross-hashed identically by GLM this session — VERIFIED twice). Football math reference: `merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B (= the merge candidate at `merge/v20-donor` `ff8c05ae`, VERIFIED this session).

---

## (a) Roster size — 10 vs 12 vs 13 vs 15

Snake draft, one pick per team per round → **rounds = roster size** (assumption: 30 NBA franchises, the figure not stated in either direction doc — INFERRED, confirm when pool work starts):

| Roster | Rounds | Picks (30 teams) | Share of a 1,500 pool | What it does to the draft |
|--------|--------|------------------|------------------------|---------------------------|
| 10 | 10 | 300 | 20% | Owner's floated number; tightest draft, every pick plausible rotation depth; bench of 5 behind a typical 8–9-man rotation is thin (foul trouble/injury exposure in sims) |
| 12 | 12 | 360 | 24% | 8–9 rotation + 3 deep; compact rounds with realistic depth |
| 13 | 13 | 390 | 26% | Midpoint with no structural difference from 12 |
| 15 | 15 | 450 | 30% | Real-NBA roster length (REPORTED — league roster rule, not re-verified this run); last ~3 rounds are picks that never reach a computer-managed rotation → dead rounds |

Pool demand is **not** the binding constraint at any size (even 15 uses ≤30% of the Owner's 1,500–2,000 target; football by contrast drafts 832 picks from a 1,148-player pool ≈ 72% — REPORTED, MiniMax's pool census M-84). The binding constraints are rotation utility of late picks and roster fragility. Direction-doc quote (VERIFIED): the Owner "floated drafting up to 10 players per team … concepts to compare, not finalized rules", and open question 1 asks whether to fix ten "or use a roster size justified by the rotation model".

**Recommended default: 12.** Cost of wrong: **10** → thin-bench artifacts in sim results and no headroom if the rotation model later wants 10 active on rest nights; **15** → 3+ rounds of picks with zero rotation impact, diluting the draft's decision content and padding the pool requirement for nothing; **13** → pays a round of extra length for no mechanism gain.

## (b) Computer-managed rotations vs user-set rotations

**The structural fact that decides this:** the Owner will play *his* team; the other 29 teams are always CPU. Therefore computer rotation logic is **mandatory for v1 regardless** — user-set is an overlay on the user's team, not a replacement. The real comparison is *how much UI before the math is validated*.

| | What the simulation math must provide | What it hides from the user |
|---|---|---|
| **Computer-managed** | A rotation policy: rank players by expected wins contribution per unit time; assign minutes under 5-on-floor + legality rules; per-game rotation log; determinism under a seed for reproducible evidence. Needs lineup-level on/off accounting to justify minutes (ties directly to (d)) | *Why* a player got 14 minutes. If the policy is wrong it silently distorts every result (single point of failure) — and a bad draft becomes indistinguishable from a bad rotation |
| **User-set** | The same computer policy **still** for 29 CPU teams; plus: minutes editor UI, legality validation (5 on floor, hard constraints from (c)), and a default-fallback when the user leaves a slot empty | Hides the model entirely behind user intuition; creates divergence between "how I'd rotate" and "what the model says wins", and delays validating the rotation math behind UI work |

Owner's own framing (VERIFIED): "Computer-managed rotations could make an initial version easier; user-set rotations could be an advanced option. Those are concepts to compare, not finalized rules."

**Recommended default: computer-managed everywhere in v1, with a visible rationale (rotation log + lineup net ratings) and a user-override panel for the user's team; the full user-set editor is the advanced option.** Cost of wrong: shipping user-set first → UI built on unvalidated math (and 29 CPU teams still need the computer policy, so nothing is saved); shipping computer-only with no visibility → violates the Owner's "statistics that explain Wins" requirement and his hands-on beta style (he will want to intervene when minutes look wrong).

## (c) Positionless with hard constraints — the general mechanism

Football's reference structure (VERIFIED in `merged.html` / AGENTS.md): `effOvr(player, slot)` applies flex penalties from `NATURAL_SLOT_MAP`/`FLEX`, QB cannot flex, penalties surface in the draft board's "Value here", and `teamRatings` aggregates **by slot** (`r[k] = wavgSlots(slotmap, RATING_SPECS[k])`, l.1991). What generalizes is the **mechanism, not the table** — exactly the Owner's rule ("the football flex system is a guideline, not a system to copy unchanged" — VERIFIED).

**Proposed general mechanism (three tiers over a role-eligibility matrix):**
1. **Natural** — player's listed role maps to lineup role, penalty 0.
2. **Plausible flex** — eligible with a graduated penalty, ordered by distance (the Owner's own example, VERIFIED: a shooting guard flexing to small forward takes a *smaller* penalty than to power forward).
3. **Hard constraint** — ineligible outright (the Owner's example: guards should not play center).

**Which are hard vs soft (proposal for Owner review — basketball content, not football's):**
- **Hard (2):** guard ↔ center crossover in both directions (the Owner's stated example); and any matchup the league's own scenarios deem physically implausible — kept to a *minimum set*, because over-hardening contradicts the Owner's stated preference for positionless play.
- **Soft (graduated):** wing ↔ big boundary (SF/PF, and SG→PF as the Owner's larger-distance flex); multi-ball-handler lineups as an *encouraged* configuration (spacing/creation synergy bonus) rather than a constraint.
- **Not positional at all:** rim protection and three-point shooting are **attributes, not slots** — they feed lineup fit and matchup math (see (d)/cannot-express), not eligibility. A lineup has no "rim protector slot" to fill; asking whether a given 5-man set defends the rim is a property of the set.
- **Lineup-level legality** (5 on floor, ≥1 creator) expressed as lineup constraints distinct from per-player eligibility — football has no analog (formation fixes the count), so this layer must be *added*, not inherited.

**Cost of wrong:** too many hard constraints → positionless play (the Owner's stated direction) is blocked and modern small-ball lineups become illegal; too few → implausible 5-guard lineups destroy credibility, and every flex becomes an exploit path (the failure mode the football rules already guard against with the QB ban).

## (d) Statistics that explain Wins — what the sim must compute

Prerequisite: a **possession-based box score** (possessions; makes/attempts by rim/3PT/FT zone; turnovers; rebounds; fouls; minutes). From it, the win-explaining set:

| Metric | Role | Sim must compute it? |
|--------|------|----------------------|
| Points per possession (off/def) + **Net Rating** | the headline Wins explainer (efficiency differential *is* the win mechanism in basketball) | **Must** — it is the model's native output once possession accounting exists |
| **TS+** (the Owner's named example, VERIFIED: "advanced statistics such as TS+… Select exact metrics only after defining the model and source") | draft-board context | **Must** internally; publish only after its formula is frozen (Owner rule: define metrics before publishing) |
| eFG%, TOV%, offensive-rebound rate, FT rate | the four component factors behind efficiency | Must internally; show progressively |
| Pace / possessions | denominators + the strategy variable | Must |
| Lineup +/- / on-off | justifies rotation minutes (b) and lineup fit (c) | Must (rotation log depends on it) |

Formula conventions (TS+ = true shooting indexed to league average, standard possession estimation) are public-analytics conventions — **REPORTED** as such, not re-fetched this run; they must be written down and frozen in the model definition before first publication (Owner's rule, VERIFIED). Source-era handling for all-time players (era-relative indexing) must be **display-only with an explicit era label** — feeding it into ratings would be an all-time adjustment, and the −5-style adjustments are **not approved** (VERIFIED). Every metric here must be *derivable from the sim's own outputs* — if the game can't produce attempts by zone, TS+ cannot be shown honestly; that is the hard dependency.

## (e) Top 5 open decisions — options, default, cost of wrong (Pickle's table)

| # | Open decision | Options | Recommended default | Cost of choosing wrong |
|---|---------------|---------|--------------------|------------------------|
| 1 | **Roster size** | 10 / 12 / 13 / 15 | **12** | 10 → thin-bench artifacts, no headroom; 15 → dead late rounds + inflated pool demand; 13 → paid extra length for nothing |
| 2 | **Rotation ownership** | computer-only / computer + user override / user-set first | **Computer everywhere + user override for user's team; full editor as the advanced option** | User-set first → UI on unvalidated math (29 CPU teams need computer logic anyway); computer-only with no visibility → hides the Wins statistics the Owner asked for and blocks his hands-on style |
| 3 | **Hard vs soft role constraints** | hard-heavy / balanced / soft-only | **Balanced: the Owner's guard↔center hard pair + graduated wing/big flex penalties; lineup legality separate from player eligibility** | Hard-heavy → positionless play blocked (against Owner's stated direction); soft-only → implausible lineups and flex exploits |
| 4 | **Attributes beyond OVR (rim protection, 3PT)** | fit/matchup terms internal only / draft-board info only / baked into public OVR | **Internal fit + matchup terms; public integer OVR unchanged (Owner prefers OVR-oriented public model, VERIFIED)** | Info-only → attributes are cosmetic and cannot explain Wins; baked into OVR → OVR stops meaning "overall" and the Owner's source-of-truth summary drifts |
| 5 | **Wins-metric set + definition freeze** | freeze 4 (PPP/net, TS+, TOV%, pace) / publish everything / defer | **Freeze definitions first, compute all internally, show 2–3 in v1** | Metric drift between releases (published numbers changing meaning); or the "which metrics matter to Wins" question never actually gets answered, violating the Owner's explicit sequencing rule |

---

## "Cannot express in football math" list (Pickle item 3)

Quoting the football build's own structure as reference (`merged.html`, sha `40233d6b…`):

1. **Rim protection as a player-vs-player interaction.** `teamRatings` (l.1988–2002) produces fixed **unit scalars** from slot-weighted averages (`r[k] = wavgSlots(slotmap, RATING_SPECS[k])`), and `matchupModel` (l.2100+) compares league-relative unit deltas (`dFront = D.frontRun-LD.frontRun`, l.2107) — unit-vs-unit, never defender-vs-attacker. Football's `coverage` is one team-level scalar (CB1 weighted 1.4 inside `DEF_SPECS.covBase`, l.2047). Nothing in `MC`/`PLAN_K` is an interaction term; "rim protection" (one defender vs a specific driver at the rim) has **no channel** to exist in. It needs an interaction matrix the model does not have.
2. **Shot distribution & three-point shooting.** Football's scoring chain is linear yardage→points: `PT_RUSH 0.040, PT_PASS 0.070` per yard with `RUSH_BASE/PASS_BASE` (l.2089–2090) feeding points. There is no attempt, miss, distance, or expected-value-per-attempt variable anywhere — so three-point skill (efficiency per *attempt*) and TS+/eFG% (which need FGA/3PM/FTA counts) are not expressible outputs of the existing math; they require a shot-emulation layer football never had.
3. **Possessions & pace.** Football implies drive structure from yardage/TO/sack outputs; in basketball possessions are the **denominator** of every efficiency stat and pace is a strategic choice both teams make. The closest mechanism is `PERS`/`STRAT` tendency shifts in run/pass percentage points (l.2028–2035) — a volume-mix knob, not a possession budget. No pace mechanic exists.
4. **Lineup-combination (set) effects.** The only combination terms football has are narrow: `r.rbHeavy` (l.1996), `r.te1/r.te2` (l.1995), and personnel receiver weights `PERS_REC` (l.2038–2043). `effOvr` penalties are per (player, slot); positionless basketball needs per-*set* properties (spacing multiplier of a 5-out lineup, two-creator redundancy) — an n-man combination has no additive slot structure to hang on, and football formations fix the count anyway.
5. **Minutes, foul trouble, within-game load.** Football substitution exists only at game-plan granularity (`PERS`/`DEF_PKG` packages chosen before the game, l.2028–2036); `optimalLineup` assigns starters once per game. Basketball's rotation economy — minutes budgets, foul trouble forcing a bench player in, back-to-back rest — has no state variable to live in (the `inj` field models multi-game availability, not within-game load).
6. **Win-share curves by roster size.** `slotWins`/`slotWinsPerOvr` and the 700-scale `modelWeights` are football-specific curves over football's slot list (structure per AGENTS.md — the pipeline shape generalizes, the constants absolutely do not); replacement levels conceptually carry (position-group supply vs drafted starters), but every curve must be re-derived for basketball's roster size and positionless supply (INFERRED from AGENTS.md's documented architecture; functions not re-read this run).

**What *does* generalize (for contrast):** OVR as the public summary (Owner prefers it — VERIFIED); snake draft + `cpuPick`'s value-over-replacement × bias × noise structure; replacement-level floors; the flex *mechanism* (eligibility + graduated penalties, not football's table); independent offense/defense game plans (→ basketball scheme choices); the weights↔wins consistency discipline (re-derive constants, keep the inverse-relationship invariant); noise + late-game script pattern.

---

**Protected-file compliance:** no product HTML read-modified (read-only hashes only); no ratings, no pool, no build; every Owner quote VERIFIED against fetched direction docs; external facts labeled REPORTED with source + date; receipts: `_agents/mimo/notes/nba-draft-rotation-receipts.md`.
