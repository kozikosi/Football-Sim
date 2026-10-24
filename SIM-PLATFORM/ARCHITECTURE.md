# ARCHITECTURE.md — how the sims should be structured

**MiniMax (S-1900–1999) · 20 Oct 2026 · advisory · the Architect (Claude) decides, the Owner rules,
the council measures.** This document answers the Owner's question directly:

> _Do you think that each of these projects should be their own Folder structure, or should everything
> branch out of the systems we've already built in the football sim?_

**Short answer: neither, exactly — build a platform.** One shared engine, many **sport packs**, and a
**staged migration** that starts by adding a second dataset to the existing single file (priority 2
first) and only later splits the code. The project folder stays as the _planning and data_ home until
the seam is proven, so nothing about the current simulation is disturbed by the expansion.

---

## 1. The reasoning, in four steps

**(a) The engine and the data are currently fused, and they must separate — but not on day one.**
The NFL build is one 650 KB file containing two different things: _content_ (1,200 player records, 32
team depth charts, position weights, flex rules, matchup coefficients) and _machinery_ (the draft
engine, the season loop, the standings, the playoffs bracket, the awards, the box scores, the recaps,
the UI shell). A multi-sport platform needs the machinery once and the content many times. But the
machinery is currently the most valuable, most reviewed artefact in the project, and it is not
separable for free.

**(b) A fork per sport is the wrong shape, and this council already paid to learn why.**
Eight copies of a 650 KB file means eight copies of every bug, eight places where the protected
constants can drift, and eight verification surfaces. The council's own record shows the cost: one
"one-line delta" in `render100` was mis-described for a whole round; a hash pin voided three times
because the extraction rule was unstated; a 17-function list turned out to be a _surface_ decision,
not a function list. Multiply that by eight and the review trail collapses.

**(c) A rewrite now is also the wrong shape.** Writing a general engine before the second pack exists
means inventing abstractions with no second use case, and it puts the verified product at risk while
the V21 merge is still in flight. The seam should be cut by the second pack, not by the design of the
first.

**(d) So: cut the seam with the cheapest possible instrument, in the order the Owner prioritised.**
Priority 2 (an all-time version of _our_ football sim) is the cheapest possible second pack, because
it shares the engine entirely and differs only in data. It teaches the pipeline (1,200 rated
legends) without touching the maths, and it leaves a seam that the NBA then forces properly.

## 2. The recommended shape

```
SIM-PLATFORM/                      ← you are here: planning, data, tools, questions
├── engine/                        ← STAGE 2: the sport-agnostic machinery (extracted once)
│   ├── draft/                     ←   snake draft, CPU GMs, board, priority chart
│   ├── season/                    ←   schedule, week loop, standings, tiebreakers
│   ├── playoffs/                  ←   bracket (shape comes from the profile)
│   ├── awards/                    ←   award computation (shape comes from the profile)
│   └── ui/                        ←   shell, tabs, recap rendering, shared chrome
├── packs/                         ← STAGE 2: one folder per simulation
│   ├── nfl-current/               ←   data + profile (the existing sim becomes pack #1)
│   ├── nfl-all-time/              ←   data + profile
│   ├── nba-current/
│   ├── nba-all-time/
│   ├── mlb-current/ …             ←   later
├── data/
│   ├── schema/                    ←   the one player-record schema, all sports
│   ├── nfl/  nba/  mlb/  nhl/     ←   the pools (generated, validated, provenance-tracked)
├── tools/                         ←   build, validate, convert, question generator, gates
├── projects/                      ←   the four priority projects (this is where humans work)
├── docs/                          ←   glossary, decisions log, onboarding
└── questions/                     ←   the Owner's concept-question channel
```

**Three rules that make this a platform and not a folder of folders:**
1. **The engine is written once and is byte-pinned.** The eight protected math functions and six
   protected constants must be **byte-identical in every pack** until the Owner and the Architect
   approve a change. This is the existing hash-gate discipline, carried forward: the same rule that
   says "a pin without its extraction rule is not a pin" says "an engine without a pin is not an
   engine."
2. **A pack is data + profile, and nothing else.** No pack may contain its own copy of the draft
   engine, its own season loop, or its own UI shell. The moment it does, the platform has forked.
3. **The build emits one self-contained HTML per pack.** The source is multi-file; the _output_ is
   still a single file, so the promise of the product ("one HTML you can open") survives the platform.
   The build script is dependency-free plain Node — no npm, no bundler, no CDN, $0, no install.

## 3. The seam, concretely — what is engine and what is pack

The existing code already contains the abstraction; it is just not factored out. The evidence is the
constant list in `AGENTS.md`:

| Belongs to the **engine** (once)                                                            | Belongs to the **pack** (many)                                                                                                     |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| draft mechanics: snake order, CPU pick loop, board, priority chart                          | `PLAYERS` (the pool), `TEAM_DATA` (the 32 depth charts)                                                                            |
| season loop: schedule, weekly sim, standings, tiebreakers                                   | `DEFAULT_WEIGHTS` (position values), `FLEX` and `NATURAL_SLOT_MAP` (slots & flexibility)                                           |
| playoffs bracket driver, awards computation, box scores, recaps                             | `MC` and `PLAN_K` (matchup coefficients), `RATING_SPECS`, `SEASON_RECORD_CAPS`                                                     |
| UI shell, tab system, recap/narrative rendering, mobile layout rules                        | the sport profile: 26 rounds vs 2 rounds, 32 vs 30 teams, 17 weeks vs 82 games, divisions, conferences, playoff shape, award names |
| the shared deterministic helpers (`slotWins`, `modelWeights`, `optimalLineup`, `effOvr`, …) | the sport's _math flavour_: the NFL's yardage model vs the NBA's pace/efficiency model                                             |

**The "profile" is the key new concept.** A profile is a small, declarative object — teams, rounds,
slots, positions, flex rules, weights, matchup coefficients, season shape, awards — that the engine
reads instead of hardcoded values. The NFL profile is _already written_, spread across
`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `ROSTER_SLOTS`, `MC`, `PLAN_K` and the schedule code.
The NBA profile is the same shape with different numbers and different names. `ENGINE-SPEC.md` turns
this into a concrete spec.

## 4. The staged path (nothing breaks; each stage is independently shippable)

| Stage                                                      | What happens                                                                                                                                                                                                                         | Risk                                                                                                                                                                     | Ends with                                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| **0 — V21** (now)                                          | The donor fixes merge into v20, gates green. Nothing here touches it.                                                                                                                                                                | none                                                                                                                                                                     | a verified reference build                                                  |
| **1 — dataset indirection** (2–3 weeks of council time)    | Inside the existing single file: `PLAYERS`/`TEAM_DATA` become named datasets (`current`, `alltime`), a runtime switch selects the active pool, and the UI gains a mode toggle. **No engine extraction, no build step, no new repo.** | low — the maths is unchanged because it already works on "the active pool"; the risk is a careless edit, mitigated by the existing hash gate on the 14 protected symbols | the Owner's priority 2 delivered, with the all-time pool built by the group |
| **2 — engine extraction + profiles** (when the NBA starts) | Move the machinery into `engine/`, write the NFL profile, cut the seam with the hash gate as the safety net, and rebuild the NFL file from parts — byte-comparing the protected symbols before and after.                            | medium — mitigated by the gate and by `SURFACES.md` (which says what belongs to which surface)                                                                           | a real platform: `engine/` + `packs/nfl-current/` + `packs/nfl-all-time/`   |
| **3 — the NBA**                                            | Write the NBA profile (30 teams, 82 games, 5 positions, playoff shape, award set) and the NBA matchup model; the engine is reused untouched.                                                                                         | medium-high — the matchup model is genuinely new maths, and the NBA is where the engine's assumptions will be tested                                                     | `packs/nba-current/`                                                        |
| **4 — the remaining sims**                                 | MLB, NHL, then the football leagues (current + all-time each), each a profile + a data pool.                                                                                                                                         | per-pack                                                                                                                                                                 | 8+ sims                                                                     |
| **5 — the portal**                                         | One landing page listing every sim; each is still a single self-contained file.                                                                                                                                                      | low                                                                                                                                                                      | the "one of many" website                                                   |

**Stage 1 is the important recommendation.** It delivers the Owner's second priority at the lowest
possible cost, it does not touch the engine, it does not require a build step, and it forces the
dataset pipeline to prove itself on the hardest dataset (1,200 NFL legends rated by the council)
before anyone writes a single line of NBA code.

## 5. Where the data lives (the other half of the answer)

```
data/schema/player-record.schema.json     one schema, all sports
data/nfl/current.json                      1,200+ players (today's build, extracted)
data/nfl/all-time.json                     ~1,200 legends (created by the council)
data/nba/current.json                      ~1,200 (from the Owner's NBA2K ratings)
data/nba/all-time.json                     ~1,200 (NBA2K-era pool + legends)
```

- **One record shape, all sports.** The current build's 10-field tuple
  `[name, pos, team, ovr, spd, str, agi, cod, inj, awr]` is a good, proven schema and it transfers
  to the NBA with different position codes. The schema is a _file_, not a comment, so a validator can
  enforce it (`tools/validate-dataset.mjs`).
- **Provenance per record.** Every record carries where its numbers came from (NBA2K export + date +
  mapping version, or "council rating, rater ids, rubric version"). A pool of 2,400 hand-made numbers
  is unusable later if nobody can tell which ones were guesses.
- **Validation is a gate, not a courtesy.** Count, ranges, duplicates, position coverage, OVR
  distribution, and the "-5 current-player rule" are checked before a pool is allowed into a pack.

## 6. Alternatives considered and why they lose

| Option                                                 | Why not                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. A separate folder (and separate copy) per sport** | Eight copies of the engine and the data. Divergence is guaranteed; verification cost multiplies by eight. This is the shape the Owner's question was worried about, and it is the worst of the answers.                                                                           |
| **B. One big rewrite into a general engine**           | Discards a verified product, the review trail, and the protected-symbol pins — while the V21 merge is still in flight. Also: the second pack does not exist yet, so the abstraction would be guessed. Come back to it at stage 2, with a gate instead of a leap.                  |
| **C. One file with eight sports inside it**            | The file is already 650 KB; eight sports is several megabytes of code in one editable blob, with every agent's edits colliding. The "one HTML you can open" promise survives a _build_ that emits one file per sim; it does not survive eight sports in one file.                 |
| **D. Separate repositories per sport**                 | One project, one set of gates, one glossary, one question channel. Repo count is not the bottleneck — the council's _coordination_ cost is (the record shows: M-number collisions, a replaced board, a lost question pack, a stale mirror). Splitting repos multiplies that cost. |
| **E. npm toolchain / bundler / framework**             | $0 budget, no installs, no CDN, and the product must stay openable as a file. A dependency-free plain-Node build script gets the same result with no supply chain.                                                                                                                |
| **F. One platform, staged (recommended)**              | Starts at the Owner's priority 2, keeps priority 1 untouched, defers the risky extraction until the second pack forces it, and keeps every later sport to "write a profile and a data pool".                                                                                      |

## 7. Risks to watch, and the mitigations already on the table

| Risk                                                  | Mitigation (already exists or proposed here)                                                                                         |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| An expansion edit degrades the current sim            | The protected-symbol hash gate; the four-pack verification gates; expansion work happens in `SIM-PLATFORM/`, not in the product file |
| The engine forks silently (a pack grows its own copy) | Rule 2 above; `SURFACES.md`; the lint's "parent-only symbol" check finds helpers that travel alone                                   |
| A profile change silently changes the maths           | Protected constants pinned per pack; a profile diff is a reviewable artefact, not a code edit                                        |
| 2,400 hand-made ratings, no provenance, no validation | `DATASET.md` (rubric + calibration + multi-rater), `tools/validate-dataset.mjs`, provenance per record                               |
| Council coordination cost becomes the bottleneck      | One claim board (`OWNERSHIP.md`), one question channel (`tools/owner-questions.mjs`), one decision log (`docs/DECISIONS.md`)         |
| The platform becomes a rewrite in disguise            | Stage gates: each stage ships independently; if stage 2 stalls, stages 1 and 3–4 still stand                                         |

## 8. What the Architect and the Owner are being asked to decide

1. **Do we adopt the staged platform shape** (stages 1–5) or prefer a single big step? _Recommendation:
   stages, starting with stage 1._
2. **Is the single-file output preserved** (multi-file source, one HTML per sim) or is a multi-file
   deployment acceptable? _Recommendation: preserve the single file; it is the product's promise._
3. **Do the protected symbols stay byte-identical across packs** until an explicit Owner approval?
   _Recommendation: yes — it is the existing rule, extended._
4. **Where does the platform live** — this folder, inside the existing repo, or a new repository?
   _Recommendation: inside the existing repository, on a `platform/` branch, with the current
   simulation untouched on `main` until the Architect's V21 build is verified._
5. **The next three questions are the Owner's, not ours** — the flex concept, the all-time pool
   composition, and the NBA profile's first principles. They are generated in
   `questions/OWNER-QUESTIONS.md`.

## 9. What this document does not claim

- It does not change the product. No product file was touched to write it.
- It does not commit the Architect to the seam; it argues for it, with the gate that would make it
  safe.
- The stage estimates are deliberately absent: the council's throughput is not the constraint, the
  review trail is.
