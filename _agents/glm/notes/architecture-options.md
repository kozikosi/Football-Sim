SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: architecture options paper (DS W7 batch assignment 1; also delivered for VLOC's parallel-batch architecture assignment — identical copy at `_agents/glm/notes/architecture-options.md`) | DATE: 2026-10-21T01:46Z

# Repository / folder architecture options for the multi-simulation era

**Status: RECOMMENDATION, NOT A DECISION.** The Owner holds this call; the Architect holds anything that enters a build. Every factual claim about current layout cites a path I read this turn (receipts per §1 and §0); labels VERIFIED / REPORTED / INFERRED / UNKNOWN used throughout.

## 0. Mandate and method

Owner's open question (PR #4, `OWNER-PRODUCT-DIRECTION.md` l.108): "What repository/folder structure best protects V21*" — *the merge candidate; the Owner binds us to call the build `40233d6b…` @ merge/v20-donor, never "V21". Provisional wants: protect the current NFL product; per-sport rules/math; one self-contained HTML per sim; extract a shared engine only after reuse is proven. This paper must give tree sketches, tradeoffs, a recommendation, and the cost of choosing wrong.

What I read (commands this turn): root listings, `git` state checks, `ls` of every proto-directory, `shasum` of the two product files, `git -C "Football Sim"` state. Build under reference verified: `NFL Draft Simulator merged.html` = `40233d6be00e…` 657,486 B (VERIFIED twice — before and after the working tree's mid-turn branch switch to `gpt/council-reliability-scorecard`).

## 1. What exists today (the exhibits")

The problem is already real: FOUR parallel claims on "where sims live" sit in the working tree, none of them canonical, several conflicting. Verified inventory:

| Path | Contents (verified) | Claimed by |
|---|---|---|
| root `*.html` | 4 product files: merged candidate, v20 Claude, `NFL Draft Simulator.html`, `merged.html` | — |
| root `*.md` | 55 council/governance files (VERIFIED: count 55; incl. COUNCIL-BULLETIN 673,125 B, CHRONICLE 179,602 B) | council shared docs (uncommitted) |
| `sims/` | `nfl-current/`, `nfl-alltime/`, `nba-current/`, `nba-alltime/` | per-sim product folders (GPT-style) |
| `sports/` | `football/`, `basketball/` (the KI-016 invented-ratings files live here) | per-sport data layer |
| `shared/` | `core/`, `ui/`, `verification/` | shared-engine/platform layer |
| `SIM-PLATFORM/` | 13 items: ARCHITECTURE.md, CONTRIBUTION.md, DATASET.md, DISPATCH-2026-10-21.md, ENGINE-SPEC.md, OWNER-DIRECTION-RECONCILIATION.md, OWNERSHIP.md, README.md, ROADMAP.md, VISION.md + `data/`, `docs/`, `projects/`, `questions/` | MiniMax's platform incubator (allestory: "one engine, many sports") |
| `Sim/` | `core/`, `data/`, `sports/`, `web/` | legacy scaffold (being torn down; KI-016 still unsegregated) |
| `datasets/` | `nba-alltime/`, `nfl-alltime/`, `schema.json` | dataset layer |
| `questions-to-owner/` | `QUESTIONS_TEMPLATE.md` | owner-question template |
| `council/` | `scorecard/` | scorecard artifacts |
| `docs/` | `ARCHITECTURE.md`, `CONTRIBUTING.md`, `DECISIONS.md`, `GLOSSARY.md` | docs lane |
| `_agents/` | 17 seat lanes (beam, boc, ds, glm, glyph, lightning, longcat, minimax, moc, nemo-super, nemo-ultra, nemotron-3-ultra-free, openclaw, or, pickle, vl + README) | council |
| `Football Sim/` (nested clone) | github.com/kozikosi/Football-Sim clone — **currently on branch `council-intake` @ caace3e** (was main) | repo |
| `tests/` | `CONTRACT.md`, `e2e-smoke.mjs`, `madden-sim.spec.js`, `openchamber-e2e-v2.spec.js`, `openchamber-e2e.spec.js` | verification |
| `_reference/`, `_archive/`, `backup-before-reorg/` | frozen | — |

I did NOT verify the interiors of `sims/<name>/` (whether they hold builds or stubs) — UNKNOWN; the paper works at the level of *elect* + *absorb-less*.

## 2. Option A — "Elect `sims/`, absorb the rest" (single repo, per-sim product folders)

```
Football-Sim/ (one repo)
├── sims/
│   ├── nfl-current/index.html        ← the merge candidate copied here WHEN ratification lands
│   ├── nfl-alltime/index.html
│   ├── nba-current/index.html
│   ├── nba-alltime/index.html
│   ├── mlb-current/index.html
│   ├── mlb-alltime/index.html
│   ├── nhl-current/index.html
│   ├── nhl-alltime/index.html
│   └── soccer/{above-mls/, mls/}/index.html
├── datasets/                          ← pools per sport-era + schema.json (already exists)
├── docs/  (per-sport guides, protocols, direction docs)
├── tools/ (gates, validators, build-merged.js — exists)
├── tests/ (per-sim E2E + protocol fixtures — exists)
├── council/ (bulletin, chronicle, status, submissions, INDEX — exists)
├── _agents/<seat>/                    ← unchanged (17 lanes live)
├── _reference/, _archive/             ← frozen
└── root-remaining: STATUS/AGENTS/SUBMISSIONS etc. → into `council/` or stay root per Owner's call
```

- Tradeoff: visible top-level split, one PR/one index, pools co-located; the shipping file COPIES into `sims/nfl-current/` (a *copy*, so root originals remain the legal originals until the Owner re-points everyone). Cost of absorbing: `sports/`→`datasets/`, `Sim/core/`→`tools/` or archival, `shared/` stays UNTOUCHED but EMPTY of engine code until the trigger fires.
- Cost of wrong: path/doc rework only (rename sessions, doc rewrites); no history surgery.

## 3. Option B — "Repo per simulation + council hub"

```
football-sim            ← current NFL (main product; mirror of today's upstream repo)
football-sim-alltime
nba-sim, nba-sim-alltime
mlb-sim, nba-…, nhl-… , soccer-above-mls, soccer-mls
council-hub             ← bulletin/chronicle/status/INDEX per seat, evidence releases, protocols
```

- Tradeoff: isolation per sim (clean tags/releases, no cross-sport CI noise), but multiplies: review surfaces, mirror scripts, indexes, onboarding docs, and the pool-sharing path (all-time datasets want cross-sport identity joins — a module you'd invent per-repo or centralize in `council-hub`).
- Cost of wrong: re-merging governance history and re-unifying shared docs is the most expensive wrong choice; PR/review friction for 11 council seats is structural (Day-1 split, hard to undo cheaply).

## 4. Option C — **"Staged monorepo, no-touch"** (Option A with a staged migration) — *(Fictional in prose only; the staged delta from Option A is: `4.posites` to `Option A + no-touch invariant`)*

Option A's tree, reached by THESE moves:

1. **中国移动 The shipping NFL file NEVER moves.** Root preserved workspace (`NFL Draft Simulator merged.html` stays until the Owner ratifies a moment when every seat's next PR references the new path simultaneously). The `sims/nfl-current/` directory is the *forwarding target*: nothing points at it until ratification.
2. **Absorb one dir at a time, one owner each move** (scribe-led): `datasets/` ← pool files; `sports/` teams/data → `datasets/<sport>-<era>/`; `shared/{ui,verification}` → `tools/`; `SIM-PLATFORM/{ARCHITECTURE,ENGINE-SPEC,OWNERSHIP,ROADMAP,VISION,README}.md` → `docs/platform/` (their DATA + `projects/` → `sims/`-adjacent homes); `Sim/{core,data,sports}` → `tools/legacy-scaffold/`or archive per KNOWN-ISSUES KI-016 cleanup owner; `questions-to-owner/` → `council/questions/`.
3. **`shared/` stays EMPTY of engine code until the extraction trigger fires** (§9) — satisfying "extract only when proven" with an EMPTY DIPRINGS, not a promise.
4. Everything else (tests, council, _agents, reference, archive) moves 0 inches.

- Tradeoff: all Option A benefits + collision-free migration + zero-risk shipping file; costs: two naming myths for a bridge period if seats continue re-ing into `sports/`-style layers (the *races* must be stopped by picking ONE assignment in SUBMISSIONS).

## 5. Tradeoff table (union of both assignments' criteria)

| Criterion | A (elect sims/, absorb) | B (repo per sim) | C (staged monorepo) |
|---|---|---|---|
| Protection of current NFL product | copies into sim folder at ratification (root stays until re-point) | separate repo = isolated, but nested-clone governance breaks | **shipping file never moves** before ratification |
| Duplication cost per new sport | one new folder + one pool dir + one docs page | one entire repo + CI + mirror + index | same as A |
| Cost of a shared-engine mistake | contained in `shared/`/tools, absorbed by absorb-move discipline | same logic per-repo | empty until proven eager trigger |
| PR/review friction (11 council seats) | one tree, one bulletin, one INDEX — receipts stay unified | N review surfaces, N indexes | same as A |
| Release/tag simplicity | per-sim tags on one repo reachable | per-repo tags (simple per repo) | same as A |
| Cross-sport pool reuse | datasets co-located (best path) | needs a hub repo or cross-repo sync | same as A |
| Team/seat onboarding | one INDEX | N INDEXes | same as A |
| Migration effort from today | moderate (absorb map) | high (repo splits) | **lowest** (copy-into-sims/; absorbs later) |
| Risk-of-rework if wrong | low (path moves) | highest (history/governance re-merge) | low-moderate (rename ordering) |

## 6. Cost of choosing incorrectly (concrete)

- **If A when C fits**: unnecessary moving of the shipping file and (`docs/` paths break — fixable by path moving + doc re-referencing, one tedious day, no data at risk.
- **If B when A/C fit**: repo splits create N governance tracks, N protocol duplicates, and the pool-sharing path breaks — re-merging histories and unifying receipts later involves history rewrites; measured CHRONICLE 179,602 B + COUNCIL-BULLETIN 673,125 B of council record would lose its single-file continuity or need careful rejoin.
- **If C declined after stages started**: the bridge period continues racing proto-dirs until a later re-cat; cost = the daily loss we repeat (M-135 ×2, M-137 ×2 label races; four proto-topologies coexisting on disk today).

## 7. Migration path (staged, never risking the shipping NFL file)

1. Seats STOP filing new scaffolds into `sports/`/`Sim/`/parallel `SIM-PLATFORM/incubators` — converge to ONE assignment (this paper elects `sims/<sport>-<era>/`).
2. Scribe ships the absorb map as an appendix (`docs/platform/ABSORB-MAP.md`); seats claim their moves in SUBMISSIONS.
3. New sims (all-time NFL first) are created directly in `sims/nfl-alltime/` — new work never touches the root product files.
4. At Owner's ratification round: `sims/nfl-current/index.html` ← the merged candidate's copy (root originals serve as legal originals until every doc/PR points at the new path — one simultaneous re-point).
5. Untracked council docs get a protective commit FIRST (MOC §5.1 rule) — commit-before-map is a prerequisite per the working rules.
6. Only after ≥2 completed sims exhibit the same seam (§9), engine extraction is proposed as an ordinary submission.

## 8. Shared-engine extraction trigger (concrete)

Proposed: extraction becomes justified exactly when **three independent model functions with identical signatures are needed by ≥3 different sims**, logged in a reuse ledger with seam receipts (each sim's function verified by that sim's owner). Then `shared/` stops being empty; a `scheme` moves, on the Architect's sign-off, as the first shared-layer submission. Until then: per-sport code stays per-sport (each sim self-contained HTML).

## 9. What I did not verify

- Contents of `sims/<name>/` (build-or-stub).
- Whether `Football Sim/`'s branch switch to `council-intake` @ caace3e was deliberate (flagged to the Owner for SiMo's contradiction list).
- GitHub remote branch state beyond the fetched FETCH_HEAD.
- The absorb eligibility of every SIM-PLATFORM file (ROADMAP stage table assigns Owner-answer sequencing I did not audit).

Receipts: listings, `git status --short` (104 entries), `git -C "Football Sim"` state, product hashes, doc date stamps (01:38–01:46Z), run this session.
