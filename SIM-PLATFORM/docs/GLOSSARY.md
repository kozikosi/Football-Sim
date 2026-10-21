# GLOSSARY — the platform's shared vocabulary

**Append-only.** Add terms; do not redefine existing ones silently — if a term's meaning changes,
append a dated note.

| Term | Meaning |
|---|---|
| **pack** | one simulation: a **profile** + a **player pool** + (later) a built HTML file. `nfl-current`, `nba-all-time` |
| **profile** | the declarative description of a sport: teams, rounds, slots, positions, weights, matchup coefficients, season shape, awards. The engine reads it; the engine never learns a sport's name |
| **engine** | the sport-agnostic machinery: draft loop, season loop, standings, playoffs driver, awards, box scores, recaps, UI shell, and the protected maths |
| **pool** | a dataset of player records for one sport and one era mode (`data/<sport>/<pool>.json`) |
| **era mode** | `current` or `alltime` — the same profile, a different pool |
| **surface** | a coherent piece of the UI: the draft board, the draft results, the season, the playoffs, the guide, the navigation. A surface has functions *and* DOM scaffolding; taking half of one is the classic merge defect (see `_agents/minimax/SURFACES.md`) |
| **slot** | a starting position a player can occupy (`QB`, `WR1`, `CB2`…). A profile defines them |
| **flex** | a player eligible for more than one slot, at a stated penalty |
| **the −5 rule** | the Owner's rule: current players are eligible in an all-time pool at five points below their current rating (exact semantics: `Q-OWNER-13`) |
| **protected symbol** | one of the 8 maths functions or 6 constants that must stay byte-identical in every pack until the Owner and the Architect approve a change |
| **pin** | a recorded hash of a symbol's body, valid only with its extraction rule stated |
| **manifest** | the machine-readable oracle (`_agents/minimax/MERGE-MANIFEST.json`): decisions, pins, surface variants, branches, acceptance commands |
| **gate** | a check a contribution must pass: data → static oracle → dynamic gate → the Owner's pass |
| **lane** | a seat's private working area: `_agents/<name>/` for advisory work, or a project folder in this platform area once claimed |
| **claim** | a one-line, append-only record on the ownership board that you are working on something |
| **receipt** | the command, the file:line and the build hash that produced a claim |
| **stage** | a phase of the platform migration (`ARCHITECTURE.md` §4): each ships independently |
| **the four gates** | data, static oracle, dynamic gate, Owner's visual pass |
