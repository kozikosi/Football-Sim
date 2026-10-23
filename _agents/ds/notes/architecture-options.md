# Architecture options — decision memo (repos vs folders)

SPEAKER: DS | ROLE: council reviewer (advisory) | TASK: W7 · architecture options with folder sketches
DATE: 2026-10-21T01:25Z

Assigned twice this round — by the Owner directly ("the earlier question was too abstract for me to
answer") and by Pickle (S-800–899). This memo answers it with measured facts about the tree as it
actually is, not as a planning doc describes it.

Artifact under discussion: `NFL Draft Simulator merged.html`, 657,486 B, SHA-256 `40233d6b…`,
branch `merge/v20-donor` @ `ff8c05ae`. Called the merge candidate throughout — not "V21".

---

## 1. What actually exists today (VERIFIED)

| Claim                                                                                       | Evidence                                                                                    |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| The NFL product is one self-contained HTML, 657,486 B / 6,553 lines, at repo root           | `stat -f%z`, `wc -l`, `shasum -a 256`                                                       |
| `core/` is **empty** — 0 files                                                              | `find core -type f \| wc -l` → `0`                                                          |
| `sims/` is **empty** — 0 files                                                              | `find sims -type f \| wc -l` → `0`                                                          |
| `shared/` is **empty** — 0 files                                                            | `find shared -type f \| wc -l` → `0`                                                        |
| `sports/` holds **2 data files, no code**                                                   | `sports/football/ratings.json`, `sports/basketball/all_time_draft.json`                     |
| `SIM-PLATFORM/` is real and substantial: docs, schema, 9 tools, 4 project folders           | `find SIM-PLATFORM -type f` → **45 files** (30 `.md`, 9 `.mjs`)                             |
| Six competing topology directories already exist on disk                                    | `sports/` 2 files · `shared/` 0 · `datasets/` 1 · `sims/` 0 · `Sim/` 0 · `SIM-PLATFORM/` 45 |
| A nested clone exists at `Football Sim/`, 669 files, on branch `council-intake` @ `caace3e` | `git -C "Football Sim" rev-parse`                                                           |
| The pool is a genuine build-time input, swappable without hand-editing                      | §2 below                                                                                    |

### The correction that matters

`FOLDER_STRUCTURE_RECOMMENDATION.md` opens with "## Current Approach: One Product Family, Modular by
Sport" and presents `core/` as "the universal simulation engine that all sports use", with a shared
`web/` layer. **That engine does not exist.** `core/`, `sims/` and `shared/` are empty directories.
The document describes a target state as if it were the present one.

It also conflicts with two things the Owner has now stated plainly:
- It assumes a shared `web/` shell ("UI changes benefit all sports automatically"), while the Owner
  wants a **self-contained HTML output for each simulation**.
- It calls `core/` "immutable after V21 stabilization" — but V21 has not shipped, so the condition it
  depends on is unmet by its own terms.

Recommendation: mark that file superseded rather than let it keep answering the Owner's question
with a layout that is not real. I have not edited it (shared-doc lane, not mine).

Two proposals therefore exist and disagree: `FOLDER_STRUCTURE_RECOMMENDATION.md` (shared core now)
and `SIM-PLATFORM/ARCHITECTURE.md` (MiniMax, 180 lines; shared `engine/` + `packs/`, staged). Neither
carries a cost-of-error section in the Owner's terms, which is why the question still reads as open.

---

## 2. The stage-1 seam, measured (VERIFIED, run this session)

I ran `SIM-PLATFORM/tools/build-pool-variant.mjs` against the merge candidate using the build's **own**
pool (`SIM-PLATFORM/data/nfl/current.json`, 1,200 records) and diffed the result:

```
variant written: 647,101 bytes   sha256 b2e097f2879a892826f3d1399357b11c96a28045a20a538c0d405688f26b8193
records in pool: 1200 · written: 1148 · translated: 0 · dropped: 52

input   657,486 B · 6,553 lines
output  647,101 B · 6,553 lines
diff     2 lines (+1 / −1) → exactly ONE differing line
line     449: `const PLAYERS = `  (identical line number in both files)
```

So Pickle's "one differing line at line 449" is **confirmed**. But it needs two caveats, both measured:
1. **The swap is not lossless.** 52 of the build's own 1,200 players are dropped: punters 32, long
   snappers 12, fullbacks 8. Cause: the build has 19 legal slot codes (`QB,HB,WR,TE,LT,RT,LG,RG,C,DT,
   REDG,LEDG,MIKE,WILL,SAM,CB,SS,FS,K`) and `P`, `LS`, `FB` are not among them.
   Draft behaviour is unchanged — those positions are already non-draftable, which is why 32 × 26 =
   832 picks is unaffected. But they do leave the file, so roster and player-browsing surfaces that
   read `PLAYERS` lose 52 people.
2. **It does not substitute `TEAM_DATA`** — the 32 depth charts stay NFL-shaped. The tool says so in
   its own closing note.

**What this does NOT prove.** It proves the _pool_ is separable from the build and that a variant can
be produced mechanically. It does not prove the _engine_ is separable: the maths, the season loop, the
bracket and the UI are still one unit, still NFL-shaped, still only ever exercised by one sport. It is
a data seam, not an architecture seam. Treating one demonstrated line as evidence that "the engine is
already reusable" would overstate it by a wide margin.

---

## 3. The three options

### Option A — one repo, one folder per simulation, no shared code

```
Football Sim/
├── sims/
│   ├── nfl-current/        NFL Draft Simulator.html          ← today's product moves here
│   ├── nfl-all-time/       NFL All-Time Simulator.html
│   ├── nba-current/        NBA Draft Simulator.html
│   ├── nba-all-time/       NBA All-Time Simulator.html
│   ├── mlb-current/  mlb-all-time/  nhl-current/  nhl-all-time/
│   └── soccer/<league>/    EPL, La Liga, Serie A, Bundesliga, Ligue 1, MLS …
├── pools/
│   ├── nfl/current.json  nfl/all-time.json
│   ├── nba/current.json  nba/all-time.json …
├── shared/                 ← stays EMPTY, with a README stating the cut-the-seam trigger
├── tests/                  ← per-sim harness; shared runner is fine, shared *math* is not assumed
├── _agents/  docs/  _reference/  _archive/  SIM-PLATFORM/
└── AGENTS.md  STATUS.md  COUNCIL-BULLETIN.md …
```

Each sim is one self-contained HTML plus its pool. No module system, no build step, no CDN.
- **For:** exactly the Owner's provisional preference. Zero risk to the shipping NFL file — it moves
  by `git mv` and nothing else changes. V21 is not delayed at all. Any agent can verify one sim
  without loading the others.
- **Against:** the maths will be copied. Eight copies of `matchupModel`, `slotWins`, `optimalLineup`
  is eight places for the protected constants to drift, and eight verification surfaces.
- **Cost of choosing wrong:** if reuse turns out large, you pay a later extraction across N sims
  instead of one — but each extraction is mechanical and independently verifiable, and you can
  extract from whichever sim is best understood.

### Option B — one repo, per-sport folders, byte-pinned shared engine, products still self-contained

```
Football Sim/
├── engine/                 ← extracted, versioned, byte-pinned (SIM-PLATFORM/ARCHITECTURE.md stage 2)
│   ├── draft/  season/  playoffs/  awards/  ui/
│   └── VERSION  ENGINE-SHA256
├── packs/
│   ├── nfl-current/{profile.json, data/, copy/}      ← NFL-specific rules + copy
│   ├── nfl-all-time/  nba-current/  nba-all-time/ …
├── sims/                   ← BUILT output: one self-contained HTML per pack (still one file each)
├── tools/build-sim.mjs     ← pack + pinned engine → single HTML, hash recorded
└── tests/                  ← engine tests once, pack tests per sport
```

- **For:** fixes a bug once. Makes "the same maths everywhere" checkable by hash rather than by
  reading. Keeps the Owner's self-contained-HTML requirement as an _output_ property.
- **Against:** it is a refactor of the most-reviewed artefact in the project, done while V21 is still
  in flight. It needs a build step — which the Owner has ruled out ("no build steps") unless that
  ruling is revisited. An engine bug becomes an all-sports outage.
- **Cost of choosing wrong:** highest of the three. Abstractions invented against a single use case
  tend to fit that case and fight the next one; undoing it means re-inlining an engine into every
  pack, and every hash pin and verification receipt collected in between becomes stale.

### Option C — separate repository per sport (or per sport family)

```
github.com/kozikosi/Football-Sim          ← NFL current (today's repo)
github.com/kozikosi/nfl-all-time-sim
github.com/kozikosi/nba-sim
github.com/kozikosi/mlb-sim  nhl-sim  soccer-sims
github.com/kozikosi/sim-engine            ← optional shared package, versioned
```

- **For:** total isolation; no cross-sport review friction; each repo's history is clean.
- **Against:** the council's own working model breaks. Every shared artefact — `AGENTS.md`, the
  bulletin, the submission protocol, the evidence releases, the verifier role — currently assumes one
  tree. Splitting multiplies the protocol by N. The Owner relays between sessions; with N repos the
  relay becomes N-way.
- **Cost of choosing wrong:** the expensive direction. Merging repos back means reconciling unrelated
  histories; the protocol has to be rewritten twice.

---

## 4. Comparison

|                                    | A · folders, no shared code        | B · pinned engine + packs    | C · repo per sport |
| ---------------------------------- | ---------------------------------- | ---------------------------- | ------------------ |
| Protects the shipping NFL file     | **highest** — a `git mv`           | medium — refactor before V21 | high per repo      |
| Duplication cost per new sport     | high (maths copied)                | **lowest**                   | high               |
| Cost of a shared-engine mistake    | none (no engine)                   | high (all sims)              | none               |
| Council protocol / review friction | **unchanged**                      | moderate (build step)        | severe (N trees)   |
| Needs a build step                 | no                                 | **yes**                      | no                 |
| Keeps self-contained HTML per sim  | **yes, natively**                  | yes, as output               | yes                |
| Migration effort from today        | **~zero** (`sims/` already exists) | large                        | large              |
| Delays V21                         | **no**                             | yes                          | yes                |

---

## 5. Recommendation

**Adopt A's folder shape now, keep `shared/` empty on purpose, and write the trigger that starts B.**

Reasoning:
1. It is the Owner's stated preference, and nothing measured contradicts it. The only real objection —
   duplicated maths — is a cost you pay _later and incrementally_, not a risk you take _now_.
2. It costs almost nothing today: `sims/` and `shared/` already exist as empty directories, so the
   _directory_ is not the cost. The real cost is one cleanup decision — **six competing topology
   directories already coexist** (`sports/`, `shared/`, `datasets/`, `sims/`, `Sim/`, `SIM-PLATFORM/`).
   Adopting A elects one and declares the rest non-authoritative; it does not invent a layout.
3. The demonstrated seam (§2) belongs to A, not B. It says the _pool_ is a build-time input — which is
   exactly what a per-folder sim needs — and says nothing about engine extraction.
4. Leaving `shared/` empty **with a written trigger** is what stops A from silently becoming "never
   revisit". The trigger is the thing that makes this a decision rather than a drift.

**Proposed trigger for cutting the seam (start B):** any one of —
- the same defect has to be fixed in two or more sims in the same round;
- a third sim needs >70% of its functions unchanged from an existing sim;
- a hash pin or validation receipt has to be repeated verbatim for a second sport.

Until then, `shared/` holds only a README naming the trigger. That satisfies "extract only after the
work shows what is genuinely reusable" without leaving the question open.

**Rejected for now:** C (breaks the one-tree protocol the council actually runs on) and B-as-next-step
(refactors the most-reviewed artefact before V21 ships, and needs a build step the Owner has ruled out).

---

## 5b. Build protection and PR integration (requested scope)

**The artifacts, with hashes measured in this checkout:**

| File                                  | Bytes   | SHA-256 (first 24)         | Role                                                   |
| ------------------------------------- | ------- | -------------------------- | ------------------------------------------------------ |
| `NFL Draft Simulator merged.html`     | 657,486 | `40233d6be00e987c472cf6b1` | **the merge candidate** — the only artifact under test |
| `merged.html`                         | 657,486 | `40233d6be00e987c472cf6b1` | **byte-identical duplicate** — see the warning below   |
| `NFL Draft Simulator v20 Claude.html` | 649,032 | `31b7d61f42a53f3b2e1a9f76` | v20 reference / merge base                             |
| `NFL Draft Simulator.html`            | 650,127 | `77bb9ed59ffa22949a8d71b6` | Season-first build, donor of fixes                     |

**Protection under every option: hash-pin by content, not by filename.** `MERGE-MANIFEST.md` and
`STATUS.md` gate on SHA-256, so the bytes are already the identity — which is exactly why the duplicate
matters.

**Warning — two names, one artifact.** `merged.html` and `NFL Draft Simulator merged.html` are
byte-identical today. Two paths to one build means a later edit to one leaves the other stale, and two
"candidates" then circulate with the same recorded hash but different content. Under any option, keep
**one** filename per build and let git history carry the rest. I have not deleted either file.

**Where each PR lands under Option A's tree:**

| PR  | Content                                                          | Home under A                                                                   |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| #3  | shared OpenChamber E2E suite (`tests/`, protocol, schema)        | `tests/` — shared runner, per-sim assertions                                   |
| #4  | NFL + NBA all-time source intake (raw files, manifest, gap CSVs) | `_agents/gpt/research/…` until a pool is Owner-approved; then `pools/<sport>/` |
| #5  | Council contribution assessment guide                            | `docs/` — process only, no product coupling                                    |

The coupling that matters: **#4 produces candidates, never ratings.** Nothing from #4 reaches `pools/`
until the Owner approves a pool. #3 is the only one of the three that touches what a build is judged by,
and it does so through `tests/`, not through the product file.

---

## 6. Contradictions to resolve (not mine to edit)

1. `FOLDER_STRUCTURE_RECOMMENDATION.md` presents `core/` as current; `core/` is empty. Mark superseded.
2. `SIM-PLATFORM/ARCHITECTURE.md` reaches for `engine/` + `packs/` in stage 2. That is Option B. It is
   compatible with the recommendation above _only_ because it is explicitly staged — but its framing
   ("build a platform") reads as a decision already taken. It should say plainly that stage 2 is
   unstarted and conditional on the trigger.
3. The Owner has ruled out build steps; Option B needs one. If B is ever chosen, that ruling must be
   revisited explicitly rather than quietly worked around.

---

## 7. What I could not verify

- Whether `sports/football/ratings.json` and `sports/basketball/all_time_draft.json` are live inputs to
  anything, or strays. **UNKNOWN** — nothing in the tree references them by name that I found.
- Whether the 8-agent-per-round review cost actually scales linearly with repo count. **INFERRED** from
  the protocol's structure, not measured.
- Who switched the nested clone at `Football Sim/` to branch `council-intake` (`caace3e`). **UNKNOWN.**

## 8. Reconciliation with GLM's independent paper

GLM delivered `_agents/glm/architecture/REPO-ARCHITECTURE-OPTIONS.md` (11,989 B, sha256 `d77cc474c72c…`)
this round, independently, from the same question. Byte-identical copy at
`_agents/glm/notes/architecture-options.md`, disclosed in both headers.

**Convergent:** both papers reject a repo-per-sport split on governance grounds, both land on folder-per-sim
in one repo, both keep `shared/` empty behind a written trigger, and both anchor on directories that
already exist rather than inventing a layout. Two independent routes to the same shape is the strongest
evidence this question has had.

**Divergent on one point, and GLM is right:** GLM's version is _no-touch_ — the shipping NFL file stays at
the repo root until one ratification round, and only new sports grow under `sims/` immediately. Mine moved
the candidate into `sims/` as a `git mv`. GLM's caution holds, and my own evidence proves it: every receipt
this round cites the path `NFL Draft Simulator merged.html`, and the hash pin in `MERGE-MANIFEST.md`/
`STATUS.md` is only half the identity — the path is the other half for anything that points at the file.
A move invalidates the path half of every receipt for no functional gain. **Adopt GLM's no-touch variant.**

**GLM undercounts the topology problem.** Its paper reports "four proto-topologies"; the tree has **six**
(`sports/`, `shared/`, `datasets/`, `sims/`, `Sim/`, `SIM-PLATFORM/`), including two that differ only by a
trailing letter — `Sim/` and `sims/` — both empty and both plausible looking. That is a trap for whichever
agent creates a folder next.

**Net effect on the recommendation: unchanged in shape, stricter in sequencing.** A → folder-per-sim, no
file moves until ratification, `shared/` empty with a trigger, one directory elected and five declared
non-authoritative.
