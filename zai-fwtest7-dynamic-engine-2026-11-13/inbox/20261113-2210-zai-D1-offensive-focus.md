SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.1 — the offensive focus (design inside the Owner's answered questions) | DATE: 2026-11-13T22:10Z
FOR: P-345 · the Owner · the Architect (Claude)

**Position in one sentence (INFERRED, design):** the offensive focus ships as a **data-driven menu plus one context function** — the focuses, their matchup weights, their halftime eligibility and their automatics are all rows in one `FOCUSES` table, and the only new machinery is `pick(focus, context) → priority` — because that shape is what makes the Owner's "the focus re-ranks Priority but never Wins" ruling a structural property instead of a discipline.

**Status of the design: VERIFIED-as-prototype.** This is not paper — I built it, and it runs in seven framework arms right now (`fwtest-7/contract/src/focus/focus.ts`, 257 lines; goldens in `fixtures/golden.json`; the acceptance spec asserts its rules per arm). The prototype exists precisely so the Owner decides from a running artifact, not a memo.

## The design, inside the Owner's answers (all verbatim-anchored)

- **Pre-game pick + one halftime change** (2026-11-12 00:18 ruling). The halftime offer is gated three ways in the prototype: manual mode only, once per game, and only into focuses with `halftimeEligible: true` — the gate is a field on the focus row, not an if-chain, so a new focus can declare itself non-adjustable (that is exactly how `spread` proves the design: added as a fifth row, the picker, the halftime rule and the automatics all picked it up with **zero arm-owned edits** across seven frameworks).
- **AUTO EVERYTHING default** (verbatim ruling). Auto is a deterministic situational pick (`autoPickFocus` reads the game state, never the user). No halftime prompt in auto; a season-level toggle can re-light the prompt for active managers — sketch: one checkbox on the season settings screen ("Ask me at halftime"), default OFF, which is the only UI the ruling demands.
- **Priority moves, Wins never** (verbatim ruling, twice). The prototype's board function is `priority = wins + adjustment(focus, matchup) ∈ [wins−0.5·s, wins+0.5·s]`, with `wins` the untouched static `slotWins` — the invariant the Playwright spec asserts per row on every arm. If the Owner replaces Wins with another metric later, the focus adds its adjustment to that metric's static value; the separation survives.
- **Q4 automatics** (2026-11-11 23:46 ruling: going for 2 down 14, difficult fourths, longer passes late — automatic regardless of user focus). The prototype REPORTS the automatics to the engine layer and shows a "reported to the engine layer" tag rather than faking a result — the pin takes no such input, and a fake would be a lie on the screen. The display rule it obeys: the user is never silently re-picked; the precedence note appears when a run-strat focus meets a pass-tendency override.
- **CPU focuses** — random-by-personality (each CPU team draws a focus from its roster shape) is cheap and needs no data; **true-to-life** (real coordinator systems) costs a per-coach table that goes stale every hiring cycle. My call inside the delegation: ship random-true-to-roster first, keep true-to-coach as a data-conditional upgrade (if a coach-system table ever exists as data, the focus row gains a `coach` field and nothing else changes). **A defensive focus is out of scope for v1** — the Owner's examples are all offensive; the same table shape accepts a defensive row later without surgery.
- **Interaction with form and matchup** (D.3/D.2 cross-ref): the focus adjustment and the form arrow never touch the same number — form moves OVR (±5–6, D.3), focus moves Priority only, matchup-aware slot value is D.2's game-time effect. Three separate layers, three separate filings, one rule: the user's screen shows each once.

## Receipt

- The prototype: `fwtest-7/contract/src/focus/focus.ts` + `sim.ts`; goldens deterministic (two `npm run golden` runs byte-identical); seven arms render it green; leakage audit zero. VERIFIED.
- The round-2 proof of the data-driven claim: adding the fifth focus changed 0 arm-owned files in 7 arms, sha256-manifested. VERIFIED.

## Failure mode (when it becomes a no-brainer or a trap)

- **No-brainer:** if one focus's adjustment is systematically larger, every auto game picks it and the menu is decoration. Guard: the adjustment is normalized per focus (the prototype's weights sum to the same budget) and the auto rule must be re-tuned whenever a focus is added — put that in the focus-adding checklist.
- **Trap:** the focus that wins games by construction (e.g., "protect the QB" against every blitz-heavy CPU). The receipt that catches it: seeded seasons, user-locked-focus vs auto — if one focus's win% edge exceeds ~+3 pp across 1000 seasons, the adjustment is a cheat, not a choice.

## The Owner-question it carries

Does the user see **why** auto picked a focus (one sentence on the pre-game screen: "Their front four is strong — expecting short throws")? My default: yes, one sentence, no second number — it teaches the mechanic without adding a metric. The sketch ships in the prototype; the sentence is yours.

Cross-references: D.2 (matchup-aware value shares the matchup function), D.3 (form is OVR, not Priority), Part-D-PD.1 (the third-objective frame the dial rides on).
