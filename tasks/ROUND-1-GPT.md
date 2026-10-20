# ROUND 1 — assignment packet for GPT (paste-ready)

> Maintenance note (not part of the prompt): written by the GLM session at the user's request. Paste **everything below the line** into the GPT chat. GPT has no file access — its entries come back as paste text and are transcribed verbatim into the `## GPT` section of `SUBMISSIONS.md`.

---

# ROUND 1 — your assignment (relayed from the GLM session, via the user)

You are **GPT**, the fifth advisor in a six-session collective building the **NFL Draft Simulator** — a single-file HTML app (Madden NFL 27 ratings): 1,200+ real player ratings, 32-team snake draft with CPU general managers, positional weights derived from estimated wins, 17-game season engine with playoffs, game simulation with box scores and awards.

You reviewed the collaboration protocol earlier. If that context survives in this conversation, this packet supersedes it where they differ; if not, this packet is self-contained on everything you need to act.

## Your actual capabilities (read carefully)

- **You have no file access.** You cannot read the project folder, the product file (`NFL Draft Simulator.html`, build `77bb9ed59ffa…`, 650,127 bytes), or any shared document. Work only from what this packet contains plus whatever I paste you separately. Never pretend otherwise.
- **You cannot write files.** Your submissions are **paste text you output to me**. I relay them and they are transcribed **verbatim** into your section (`## GPT`) of `SUBMISSIONS.md`, above your end-anchor `<!-- gpt:end -->`. Format them exactly per the template below — they are copied word-for-word.
- Your ID block is **S-500–599** (pre-allocated so parallel batches never collide: DS S-100–199 · GLM S-200–299 · Nemo Super S-300–399 · Nemo Ultra S-400–499 · GPT S-500–599 · OpenClaw S-600–699).

## Entry template (each entry, exactly these fields)

1. **ID + title** — your first two are S-501 and S-502.
2. **Proposed:** 2026-10-19 · **By:** GPT · **Applies to build:** `77bb9ed59ffa` (see STATUS.md)
3. **Type** — bug fix | improvement | feature | question | assessment
4. **Problem / idea** — what's wrong or missing, why it matters
5. **Proposal** — the change in plain language
6. **Code** — for a script spec (your case): the CLI, the exact output format, code sketches; no bare diffs
7. **Blast radius** — what else this touches and what could regress
8. **Evidence** — how any numerical claim was produced: command, sample size, code path. A number without these is **prose** and must be marked as such. Two citations of the same code path are **not** independent confirmation.
9. **Checked** — what you actually verified, or "untested". **Never claim results you don't have.**
10. **Status: pending** (only the user changes it)

One topic per entry — but the Round-1 assessment-bundle exception applies to you this round, as it does to all sessions (declared in the assignment packet).

## Round-1 context (decided already; do not re-derive or re-propose)

The round's product is a **regression harness** — five scripts around the product file. The product file itself changes in exactly one way this round: two marker comments `/*SIM-CORE-START*/ … /*SIM-CORE-END*/` delimit a DOM-free core containing the embedded data (`PLAYERS`, `TEAM_DATA`, `DEFAULT_WEIGHTS`, `ROSTER_SLOTS`, `FLEX`/`NATURAL_SLOT_MAP`, `POS_SLOT_MAP`, `SEASON_RECORD_CAPS`, `PER_GAME_CAP`, `POINTS_PER_WIN`), the module-level state and caches (`seasonState`, `draftSim`, `weights`, `_wTable`), and three new DOM-free entry points: `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`.

Components other sessions already specced — **do not duplicate them**:

| Script | Owner | One-line summary |
|---|---|---|
| `pw4.js` | DS | 100-season internal regression; primary gate = drift against a frozen baseline (`tests/baseline.json`), r > 0.6 only a sanity floor |
| `phone.js` | Nemo Ultra | static 390px overflow lint (HTML/CSS parse only) |
| `tests/run_all.sh` | Nemo Super | composite runner: `node --check` → pw4 → validate → phone; exit 2 of any script = hard failure |
| `tests/funcdiff.js` | DS (pending) | function-diff between two builds — catches mutated functions |
| SIM-CORE architecture | GLM | markers, extraction method, manifest check |

**Your component is `validate.js` — the external real-2025 validation.** It is the one script that checks the model against reality rather than against itself.

## Mechanical facts you must design around

- The engine **generates its own schedule** (`buildFullSchedule`) — real 2025 matchups are **not** replayable. So validation is a **team-level** comparison: the model's per-team win estimates vs the **real 2025 standings**.
- The **real 2025 rosters ship in the app** — `TEAM_DATA` holds each team's depth chart as `{slot: {ovr, name}}`, which is directly a slotmap. Headless-computable functions (all inside SIM-CORE): `teamRatings(slotmap)`, `leagueBaseline(slotmaps)`, `optimalLineup(slotmap)`, `lineupWins(slotmap)`, `computeUnitRanks`.
- **Targets** (from AGENTS.md): **r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6** — your spec must define precisely what each is computed between (projected wins vs real wins is the natural reading; a single simulated season on the shipped rosters is a possible second statistic — you decide the design and say why).
- **Extraction method** (same as DS's pw4): read the HTML, slice the SIM-CORE block, evaluate in a sandboxed context (node `vm`), seed `Math.random` with a fixed seed for reproducibility, append the driver to the same evaluated source (the core's top-level bindings are lexical), and hand results back via `globalThis.__VALIDATE__ = …`.
- **`run_all.sh` contract your output must fit**: a parseable line `VALIDATE: r=<value>, rho=<value>, rmse=<value> PASS|FAIL`; exit **0** pass · **1** fail · **2** harness error. Thresholds: define the pass window for each target (e.g. |Δ| tolerances around r 0.66).
- **No dependencies, no network, no installs. Plain node. $0 budget — nothing paid, ever.**

## Dataset interlock (important)

The **real 2025 season results table** is being compiled right now by OpenClaw (its S-602: all 32 teams, W-L, point differential if sourceable, every value sourced and cross-checked). Your spec must define the **format** that dataset arrives in so the two interlock without another round. Requirements to state in your spec:

- A concrete machine-readable format (suggest: a JS array of `[teamName, wins, losses, ties, pointDiff]`).
- **Name matching is a real pitfall**: the dataset's team names must match `TEAM_DATA`'s keys exactly, or your spec must require an explicit mapping table. Say which, explicitly.
- The script must **fail loudly (exit 2)** if the table is missing, incomplete (not 32 teams), or internally inconsistent (wins+losses+ties ≠ 17 games per team in 2025, which had no ties — but don't take my word: make your spec verify it).

## Your assignment — two entries, output as paste text

**S-501 — assessment** (Type: `assessment`). You cannot read the build, so your assessment is **protocol-level** — the collaboration architecture itself: the submission workflow, verification gates, delivery contract, round structure, role separation. Your earlier protocol review was sharp; file its residue formally: the top **3 process risks** in how the collective works, each with evidence or a concrete failure scenario, and which one **Round 2** should attack first. Mark clearly that it is protocol-level, not code-level.

**S-502 — validate.js spec** (Type: `improvement`). The full spec per the template: CLI, checks, thresholds, the dataset format, the extraction approach, the exact stdout lines `run_all.sh` parses, exit codes, and code sketches where useful. Design the comparison so its failure actually means something — DS's finding on pw4 applies to you too: a gate that passes with huge margin detects nothing. If the 0.66/0.69/2.6 targets would pass trivially on shipped rosters, propose the tighter, more discriminating statistic and keep the record targets as reference points.

## Do not

- Re-propose settled work: Season-first interface (Season tab default, weights demoted to bottom links, auto-applied optimal lineup after draft), transport decisions, ID blocks, round cap — all settled and recorded in the ledger.
- Invent the 2025 standings — that is OpenClaw's S-602; you spec the format only.
- Propose product-file changes beyond the round's single marker change.
- Use or request anything paid.

## Deliver

Both entries as paste text in your reply, then say **"done"**. If any part is ambiguous — including the mechanical facts above — **ask me questions instead of guessing**; I relay to the collective and answer back.
