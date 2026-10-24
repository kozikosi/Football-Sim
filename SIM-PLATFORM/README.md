# SIM-PLATFORM — one engine, many sports

**The Owner's expansion plan, made concrete.** 20 Oct 2026 · advisory documents · the Architect
(Claude) holds technical authority over anything that enters a build; the Owner holds the vision,
the priorities and the permissions.

The NFL draft simulator is one of many simulations the website will host. This folder is the
planning, data, tooling and question surface for that programme — and, in time, the platform
source.

## Start here

| If you want to…                                  | Read                                                           |
| ------------------------------------------------ | -------------------------------------------------------------- |
| understand the goal in the Owner's words         | [`VISION.md`](VISION.md)                                       |
| know how the sims should be structured (and why) | [`ARCHITECTURE.md`](ARCHITECTURE.md)                           |
| contribute without stepping on anyone            | [`CONTRIBUTION.md`](CONTRIBUTION.md) — **read this one**       |
| claim a piece of work                            | [`OWNERSHIP.md`](OWNERSHIP.md)                                 |
| see the order of the work                        | [`ROADMAP.md`](ROADMAP.md)                                     |
| rate players (or understand how rating works)    | [`DATASET.md`](DATASET.md)                                     |
| ask the Owner a conceptual question              | [`questions/OWNER-QUESTIONS.md`](questions/OWNER-QUESTIONS.md) |
| look up a term                                   | [`docs/GLOSSARY.md`](docs/GLOSSARY.md)                         |
| see what has been decided and what is open       | [`docs/DECISIONS.md`](docs/DECISIONS.md)                       |
| join the expansion work                          | [`docs/ONBOARDING-EXTENSION.md`](docs/ONBOARDING-EXTENSION.md) |

## The shape in one paragraph

One **engine** (the draft, the season, the playoffs, the awards, the UI shell) and many **packs**
(sport data + a sport profile). The current NFL simulation is pack #1 and keeps shipping untouched.
An all-time NFL pack is the same engine over a different player pool. The NBA is the same engine
with a different profile (30 teams, 82 games, five positions) and a genuinely different matchup
model. The pools are ~1,200 records each in one shared schema: NFL all-time rated by the council
against a rubric, NBA from the Owner's NBA2K ratings through a stated mapping. The migration is
staged so that the current simulation is never at risk.

## The tools (all dependency-free, no installs)

```
node tools/owner-questions.mjs --list | --status | --next 5 | --answer <id> "text"
node tools/validate-dataset.mjs <pool.json> --ref <other.json>
node tools/rating-worksheet.mjs --make <pool.json> --out <worksheet.json>
node tools/rating-worksheet.mjs --aggregate <rater-dir> --out <merged.json>
```

Plus the football sim's own gates, which the platform inherits:
`../_agents/minimax/tools/candidate-lint.mjs` (the static oracle) and
`../_agents/minimax/tools/post-merge-smoke.mjs` (the dynamic gate).

## The four priority projects

1. [`projects/1-football-current/`](projects/1-football-current/) — the existing sim (protected; the inheritance)
2. [`projects/2-football-all-time/`](projects/2-football-all-time/) — the same engine, the legends
3. [`projects/3-nba-current/`](projects/3-nba-current/) — the same engine, very different maths
4. [`projects/4-nba-all-time/`](projects/4-nba-all-time/) — the NBA engine, the legends

## The three questions that block the most work

- `Q-OWNER-45` — one engine or many? (the platform's central question)
- `Q-OWNER-13` / `Q-OWNER-19` / `Q-OWNER-20` — what an all-time mode _is_
- `Q-OWNER-03` / `Q-OWNER-24` / `Q-OWNER-25` — the NBA's flex, its unit of value, and its draft shape

They are in [`questions/OWNER-QUESTIONS.md`](questions/OWNER-QUESTIONS.md) with the code they concern.

## What this folder is not

It is not a product. The product files are read-only to every advisor, the current simulation is
priority 1, and nothing here changes a line of the build. It is the map and the scaffolding for a
programme that starts with one more dataset and grows into a platform.
