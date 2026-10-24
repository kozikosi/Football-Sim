# GLOSSARY.md — Shared Terminology

**Purpose:** Single source of truth for project terminology. Every term defined here must be used consistently across all documents, code, and communication.

---

## A

**ADR** — Architecture Decision Record (see `docs/RFC-LOG.md`)

**AGENTS.md** — Agent protocol document defining roles, permissions, invariants, and workflow rules.

---

## B

**Baseline** — Frozen reference state (hash + metrics) against which regressions are detected. See `tests/baseline.json`.

**Blob (Git)** — Git's internal object ID (40-hex SHA1) for a file's content. Not the same as file SHA256.

**Bootstrap** — Initial setup phase (draft → season → playoffs). `startSeason()`, `runLeague100()`.

**Build** — A complete, playable simulator file (`NFL Draft Simulator.html` or `NFL Draft Simulator v20 Claude.html`).

**Burn** — A CPU draft pick that reaches far below the best available player (a "miss").

---

## C

**Candidate Branch** — `merge/v20-donor` branch where the Architect builds the merged candidate.

**Canonical Build** — The authoritative reference build. Currently v20 `31b7d61f…` (649,032 B) per R2.

**Candidate Branch** — `merge/v20-donor` branch where the Architect builds the merged candidate.

**CheckRewards** — Boundary artifact in funcdiff (18th diff, but true body identical at `0a000ce52783`).

**Cohort** — A group of sessions/agents active in the same round.

**CONTRACT.md** — Test harness specification (`tests/CONTRACT.md` v2). Defines exit codes, extraction rules, dataset contracts.

**CPU Pick** — `cpuPick()` function: CPU GM logic selecting players via value-over-replacement × bias × noise.

**Canonical** — The authoritative reference. Two meanings: (1) canonical build = v20 reference; (2) canonical documents = the 8 docs in INDEX.md.

**Candidate** — The merged build on `merge/v20-donor` awaiting verification.

**council-intake** — Remote branch (`origin/council-intake` at `474eb52`, 125 files) containing builds, docs, tools.

**Council** — The advisory collective (GLM, DS, Nemo Super, Nemo Ultra, Pickle, Beam, MiniMax, Pickle, etc.).

---

## D

**Donor** — The canonical build `77bb9ed5…` (650,127 B) which donates its fixes to the merge.

**Donor CPU Pick** — The donor's `cpuPick` with round floors, `posBest`, bounded miss (kept in merge).

**Donor Render100** — The donor's `render100` function (`cc1016eacc78`) which fixes the `rWeights` crash.

**D-a / D-b / D-c** — The three merge deltas:
- D-a: `cpuPick` (donor wins)
- D-b: Season engine surface (donor wins)
- D-c: Persistence (absent both → new work)

**D-a** — cpuPick delta (donor → v20)
**D-b** — Season engine surface delta (donor → v20)
**D-c** — Persistence delta (neither has it)

---

## E

**E2E** — End-to-End test (full draft → season → playoffs → Super Bowl → 100-season report).

**E2E Gate** — The acceptance gate: `post-merge-smoke.mjs` must exit 0 with all checks passing.

---

## F

**Flex** — Playing a player out of natural position with rating penalty. `effOvr(player, slot) = player.ovr - flexPenaltyFor(player.pos, slot)`.

**Flex Penalty** — Rating reduction for playing out of position. Defined in `FLEX` object.

**Funcdiff** — Function-level diff tool (`funcdiff-full.js`, `funcdiff-detail.js`) comparing two builds function-by-function.

**Funcdiff-Full** — Full-body function extraction + sha256 comparison (used for 17-function diff).

**Funcdiff-Detail** — Line-level diff for specific functions (e.g., `render100`, `turnoverParagraph`).

---

## G

**Gate** — A verification checkpoint that must pass before promotion. Gates: hash gate, 390px lint, E2E smoke test.

**Git Blob** — Git's internal 40-hex object ID for a file's content (`git hash-object` or `git rev-parse :path`).

**GLM** — One of the five advisory sessions (queue-keeper, governance maintainer).

**Gate** — A verification checkpoint (hash gate, 390px lint, E2E smoke test).

---

## H

**Hash Gate** — Mandatory merge gate: 8 protected functions must remain byte-identical (hash `dc54e4210ce1`).

**Hash Gate** — Mandatory merge gate: 8 protected functions must remain byte-identical (hash `dc54e4210ce1`).

**Headless Entry Points** — Three functions required by CONTRACT.md C2: `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()`.

**Hash Gate** — Mandatory merge gate: 8 protected functions must remain byte-identical (hash `dc54e4210ce1`).

**Hash Pin** — A sha256 prefix (12 chars) pinned in the merge manifest for a specific function.

---

## I

**Intake Branch** — `origin/council-intake` (474eb52, 125 files) — the merge base.

**INDEX.md** — The "read me first" document listing the 8 current documents and 20+ history files.

---

## M

**Merge** — The operation combining v20 (base) + donor (fixes) into a single candidate.

**Merge Manifest** — `tests/merge-manifest.md` documenting the 17-function oracle, hash gate, pins, and deltas.

**Merge Candidate** — The build on `merge/v20-donor` awaiting verification.

**Merge Manifest** — `tests/merge-manifest.md` documenting the 17-function oracle, hash gate, pins, and deltas.

**Merge Surface** — The set of differing functions between v20 and donor (17 functions: 14 changed + 3 new narrative).

**MCP** — Model Context Protocol (Claude's GitHub access via MCP Server).

---

## M (cont.)

**Math Core** — The 8 shared math functions + 6 protected constants that are byte-identical across v20 and donor.

**Merge Base** — The commit/branch from which the merge candidate is built (`origin/council-intake` at `9ab0292`).

**Merge Manifest** — `tests/merge-manifest.md` documenting the 17-function oracle, hash gate, pins, and deltas.

**Merge Surface** — The set of differing functions between v20 and donor (17 functions: 14 changed + 3 new narrative).

---

## N

**Nemo Super / Nemo Ultra** — Two advisory sessions (distinct from GLM, DS, Pickle, etc.).

---

## O

**Oracle** — The 17-function keep-oracle (14 donor / 1 v20 / 2 synthesize) used in merge manifest.

**Owner** — The human user who owns the project, grants permissions, publishes builds, and arbitrates disputes.

---

## P

**Persistence** — localStorage/IndexedDB auto-save/resume of seasonState, draftSim, personalWeights. Absent from both builds (U-21).

**Pickle** — One of the five advisory sessions (math core hash gate discovery).

**PROMPTS-TO-ARCHITECT.md** — Shared draft space for prompts to the Architect (Claude).

**PROMPTS-TO-ARCHITECT.md** — Shared draft space for prompts to the Architect (Claude).

**Protected Constants** — `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` — change only with Owner approval.

---

## Q

**Queue** — `SUBMISSIONS.md` queue of proposals (S-001, S-002, ...).

---

## R

**R1–R5** — Owner Rulings (19 Oct): R1 deployment out, R2 v20 reference, R3 Claude Architect, R4 no deputy, R5 no edit others.

**RNG** — Random Number Generator. Currently 58 unseeded `Math.random()` calls; v21 adds seeded `rng(seed)`.

**Round** — A complete propose → triage → rule → implement → verify → freeze → promote cycle.

**Reference Build** — The authoritative build (v20 `31b7d61f…`, 649,032 B) per R2.

**Round** — A complete propose → triage → rule → implement → verify → freeze → promote cycle.

**Rollback** — Two renames (candidate first, then seed-old-remote) to revert a promotion.

---

## S

**S-202** — Submission: SIM-CORE markers + 3 headless entry points.

**SIM-CORE** — The DOM-free math core delimited by `/*SIM-CORE-START*/` … `/*SIM-CORE-END*/`.

**SIM-CORE Markers** — `/*SIM-CORE-START*/` and `/*SIM-CORE-END*/` delimiting the DOM-free math core.

**Seed-Old-Remote** — Tag + branch at `49fafc2` preserving the old seed `main` before rename.

**Seed** — RNG seed value stored in `seasonState`; enables reproducible seasons.

**SlotWins** — `slotWins(slot, ovr)`: wins/season added by player at slot vs 70 baseline.

**SlotWinsPerOvr** — `slotWinsPerOvr()`: marginal wins per +1 OVR at each slot (cached).

**S-202** — Submission: SIM-CORE markers + 3 headless entry points.

**SIM-CORE** — The DOM-free math core delimited by `/*SIM-CORE-START*/` … `/*SIM-CORE-END*/`.

**SIM-CORE Markers** — `/*SIM-CORE-START*/` and `/*SIM-CORE-END*/` delimiting the DOM-free math core.

---

## T

**Tier 1/2/3** — Priority bands for v21 roadmap: Tier 1 (must ship), Tier 2 (should ship), Tier 3 (nice to have).

**Three-Way Merge** — Not used; this project uses preserve-then-rename (Option A), not three-way merge.

---

## U

**U-21** — Persistence feature (localStorage auto-save/resume); absent from both builds.

**U-06** — 100-season mobile crash (render100 crash at v20:6018).

**U-Series** — User's playtest items (U-01 through U-22) from ROUND-1-USER.md.

---

## V

**v20** — The reference build (`31b7d61f…`, 649,032 B) per Owner Ruling R2.

**v20 Reference Build** — The build everyone reviews (`31b7d61f…`, 649,032 B) per R2.

**v21** — The next version (post-merge), first to earn "simulator" not "prototype."

**v20 Reference** — The build everyone reviews (`31b7d61f…`, 649,032 B) per R2.

---

## V (cont.)

**Verifier** — The session that runs E2E gate (`post-merge-smoke.mjs`) and pushes `verified-merge-<hash>`.

**v21** — The next version (post-merge), first to earn "simulator" not "prototype."

**Verifier** — The session that runs E2E gate (`post-merge-smoke.mjs`) and pushes `verified-merge-<hash>`.

---

## W

**Wrapper** — The HTML document structure (doctype, html, head, body). v20 has dual wrapper (546 B overhead).

**Wrapper Surgery** — Relocating 372 B base style into structured header, deleting 173 B duplicate markup.

---

## Z

**Zone** — Defensive coverage zones in matchup model (CB1, CB2, CB3, SS, FS, MIKE, WILL, SAM).

---

---

**Maintenance:** Add new terms here as they emerge. Every term must have a one-sentence definition and a reference (file, line, or command).
