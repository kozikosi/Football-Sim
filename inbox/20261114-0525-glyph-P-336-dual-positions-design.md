SPEAKER: glyph | ROLE: seat (work/design) | TASK: P-336 — Dual positions design (model, draft/lineup/engine, prohibitions) | DATE: 2026-11-14T05:25Z
FOR: P-336

# P-336: Dual positions — design proposal

**Owner rulings (VERIFIED):** a player can hold multiple positions (Travis Hunter CB+WR; Jokic PG+C). **A dual-position player plays BOTH positions for FREE — flex price between a player's own two positions is 0.** Owner assigns dual positions; an agent can help gather position-history data (example: Nakobe Dean MIKE now, WILL last year for Eagles). Owner does not promise to do all himself. Must combine fluidity and prohibition (goalies different; Muggsy Bogues can't play center) — "more b" but with restrictions.

## 1) Data model
**Proposal (INFERRED, portable):**
- `positions: Role[]` (or `primary: Role, secondary?: Role[]`), with invariant `len >= 1`. Store as ordered list: `positions[0] = primary` (display/roster identity, draft listing), remainder are authorized alternates.
- Source/assignment: `assignment: { by: 'owner'|'agent-suggested'|'import', evidence?: string }` for traceability (agent may suggest from history; Owner confirms). Do not auto-assign without Owner rule.
- Dual-position flag derived: `positions.length > 1`.

## 2) Draft board / UI
- Show primary position badge + secondary badge(s) (e.g. `CB/WR`). 
- Filters: player appears when filtering by **any** held position (or provide toggle "primary only" — default inclusive).
- Best-player / need views: a dual-position player can satisfy need at either position (see lineup).

## 3) Lineup / optimizer / engine treatment
- **Eligibility:** player is legal for any slot whose `dest/role` matches any element of `positions`, subject to global prohibitions (below).
- **Flex price within own positions:** `penalty = 0` when moving between roles the player holds (Owner-confirmed). Implementation: in `fit/effectiveOvr`, if `targetDestRole in player.positions` (mapped appropriately) treat as home-equivalent for penalty (but still respect slot/role compatibility rules of the position being played).
- **Rating:** OVR remains the single true input (Owner). Optional future refinement (NOT proposed now): same OVR used at both positions unless Owner specifies otherwise.
- **Snap/value realization:** player can fill one slot at a time per alignment; "plays both for free" means no flex tax when deployed at either, not simultaneous duplication. Season/play-level can track snaps at each position for advanced stats.

## 4) Prohibitions (fluidity + hard bans)
**Proposal — two layers:**
- **A. Sport/physical impossibility list (hard, small, authored per sport):** pairs/groups never allowed regardless of dual listing, e.g. football `QB` cannot be assigned as interior OL/DL as a free dual in unrealistic combos? (needs Owner list); cross-sport examples given: goalie distinct; extreme size/role impossibilities (Muggsy Bogues can't play center) — **Owner must supply or approve football’s hard-ban pairs** because height/size data not tracked. Represent as `FORBIDDEN_DUAL_PAIRS` (or predicate) checked on assignment/import.
- **B. Everything else fluid by formula/eligibility:** if not forbidden and player holds position, flex cost 0 between own positions; to positions not held, normal flex/derivation applies.
- **Validation:** reject or flag dual-position assignments that violate A; agent-gathered suggestions are `agent-suggested` until Owner confirms.

## 5) Interactions
- **Flex derivation (P-322/P-340):** dual-position within-own = 0 confirms "unpriced moves" for owned positions; does not create new cross-player flex rules. Helps emergence/value by allowing roster flexibility without penalty.
- **Late rounds (P-337):** dual-position players increase "simple fit" options — highlight as flexible depth.
- **Gravity (P-335):** track gravity/usage per position context if player used in multiple roles.

## 6) Data gathering (agent-assist scope)
- **Taskable:** compile position history from provided/approved sources (e.g. "Nakobe Dean: WILL 2024 Eagles, MIKE 2025 Raiders") into suggested `positions` records with evidence links/notes. **No fabrication** (AGENTS data integrity); mark provenance.
- **Not promised:** exhaustive league-wide tagging — Owner-driven.

## Open decisions for Owner
- Football hard-ban/allowed dual pairs list (or rule: "only Owner-approved assignments allowed").
- Max number of positions per player (2 vs many).
- Whether draft pool shows historical positions automatically or only Owner-assigned duals.

Labels: VERIFIED (Owner rulings/examples). INFERRED (schema/UI/engine mechanics). No implementation.
