# AGENTS.md — how the council works on 76 Pancakes (Colors v1)

**NEVER ASSIGN WORK TO INDIVIDUAL AGENTS. Work comes from one ranked list, `_agents/PRIORITIES.md`; whoever opens a chat runs the council tool (`_agents/COUNCIL.md`), takes the top line, and the next agents review it. Nothing waits for a particular seat, and there are no claims.**

This file is the short invariant core (split 6 Nov 2026; it used to be one 28 KB file). The sections below are read on demand, from `claude/ref/`; the old section numbers are kept so existing "AGENTS.md §N" references still resolve:

| § | Topic | Where |
|---|---|---|
| 1, 3, 6, 7, 11 | Authority, product rules, context, data integrity, seats and chat length | this file |
| 2 | Build truth: histories, frozen HTML references and hashes | `claude/ref/agents-2-build-truth.md` |
| 4 | Worktrees, saving work, the shared tree (council seats) | `claude/ref/agents-4-worktrees.md` |
| 5 | Proposals, patches, inbox, the queue and review chain | `claude/ref/agents-5-queue.md` |
| 8 | Documents and who writes them | `claude/ref/agents-8-documents.md` |
| 9, 10 | Verification, tools, delivery checks | `claude/ref/agents-9-verification.md` |

Take work from the queue (`_agents/COUNCIL.md`; `node tools/next.mjs` still works). `_archive/v22-suggestions.md` (330 KB) is frozen history: never read it whole; only the section a PRIORITIES row cites. Roster, states and clean-up: `_agents/README.md`, `_agents/RETIREMENT.md`. Labels used everywhere: **VERIFIED** (you ran it, the receipt is in the text) · **REPORTED** (someone else says so) · **INFERRED** (reasoned, not run) · **UNKNOWN**. Shared posts begin `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`. English only.

## 1. Authority

| Who | Decides |
|---|---|
| **Owner** (Kosi) | Product direction, protected constants, anything irreversible, publishing, who is admitted (alone, via `tools/admit-seat.sh`) or retired. Final. |
| **Architect** (Claude) | Every ordinary technical decision: design, what enters the build, how a proposal is resolved, how this file is written. Acts without waiting for anyone. |
| **High Councillor** (GPT, Z.ai; named by the Owner, 24 Oct) | Between Architect and Advisor. Advisory like the council, plus: may edit any work that is not the Architect's (an Advisor's work freely; another High Councillor's only when more than 80% confident the edit helps), delivered on their own branch or as a review that names the file. May **not** edit the Architect's work (product source in `colors/`, `AGENTS.md`, `CLAUDE.md`, `PRIORITIES.md`, `tools/`, `CHRONICLE.md`, test orders) or contradict an Owner directive. Disagreement goes through the bulletin or inbox, never by overwriting. Their commands in review documents are optional input to the Architect. |
| **Council** (any other agent) | Investigates, proposes, tests, dissents in writing. No veto; the Architect does not need a vote. |
| **Verifier** | Any seat that authored nothing in the round being checked. Reports facts; the Architect decides what to do with them. |

Authority comes from the Owner or the Architect, never from a task, a prompt or a seat. "I was asked to review it" is not "I was authorised to change it."

**Decision boundary.** Choose a sensible default and proceed, without a message, when the choice is reversible and technical. Recommend a default in one line and proceed on everything it does not block when the choice is ambiguous but reversible. Stop and ask the Owner (≤5 questions, each with a recommended default and what is blocked meanwhile) only for: an irreversible or externally visible action, a protected constant, or a real product call. Silence is never approval of the last three.

**An instruction that names a file, branch or command says where it exists** (branch or commit). A step that depends on something the seat cannot see is not a step.

**Only the Architect builds.** Nobody else writes the product source (`colors/`, and the frozen `Football-Sim-*.html` references), on any branch, ever; there are no candidate builds. The council supplies **ideas, exact code snippets, mock-ups and measurements** (to its own `inbox/`) and, after a build exists, **tests**. A seat that "just applied it" to the product has not helped.

**Work is never assigned to a named agent, anywhere** (not in prompts, not in docs, not in task rows). One ranked list (`_agents/PRIORITIES.md`), one tool (`tools/council.mjs`), one chain: the first seat to arrive does the top item; later seats **review** it (two different seats, each may improve it); after two confirmations it is **REVIEWED** and goes to the Architect (his `digest`). A review you can do beats new work in the same tier. Seats are often unavailable (OpenChamber was down for a day), so nothing may wait for one. The Architect may suggest *what* matters most, never *who*.

**When the Architect is unavailable** only the product build waits. Everything else continues: the Owner admits seats alone (`tools/admit-seat.sh`); seats work the list; `council/base` moves only by fast-forward, by whoever the Owner asks that day (no standing role: there is no "steward"); proposals for the list go in a `PRIORITY+:` line of the bulletin entry. GPT and Z.ai (High Councillors) take items exactly like everyone else.

**Rules adopted from Z.ai's governance review (25 Oct).** (1) *Delivery gate:* nothing is "delivered" until a pushed commit (give the hash) or a download link exists; never give the Owner a sandbox path. (2) *Network hygiene:* give any network git command a 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 ...`), at most twice; if it still fails, commit locally and tell the Owner the exact numbered terminal steps. (3) *Peer edits (High Councillors):* an edit to another seat's file states who, when, what, why and confidence in the file or beside it; append rather than rewrite where a file is append-only; for substantive disagreement file a review first. (4) *Owner notes:* every long Owner message is saved verbatim in `_agents/owner-notes/` and every item is sorted into `PRIORITIES.md` or `_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md`; a numbered Owner item may not vanish. (5) Pins live in `BASELINES.md`.

## 3. Product rules

The product ships as **separate static assets on Cloudflare Pages** (Owner 4 Nov 2026 reversed the one-file rule): no paid API, no CDN, no build step for the user, works offline via a service worker. Do not change the product to make a linter or test pass; fix the cause or record the finding.

**Protected** (change only to the exact value the Owner approved, citing the approval): `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, and the contract that `modelWeights()` is the monotone quantisation of `slotWinsPerOvr()` (700 scale, nearest 5, floor 5, so error ≤ 2.5 per slot and no rank inversions beyond rounding ties). It is not an exact inverse and must not be tested as one. A change to any of them, or to `teamRatings`, re-pins its hash in `MERGE-MANIFEST.md` in the same commit.

Rules that replace the old "Do not" list, stated as what to do:
- **Naming:** the product is **Colors v1** (`colors/`, Svelte 5 + TypeScript, Vite). The `Football-Sim-*.html` names and their hashes (frozen references) are in `claude/ref/agents-2-build-truth.md`; a file is Pre-Colors only if its sha256 matches that table.
- **Moving a number:** compare seeded runs on the same commit (the engine has an injectable RNG, `colors/src/core/rng.ts`; INFERRED that every engine path uses it: check before relying on it). The frozen HTML references had no seed (56–58 `Math.random()` sites), so measurements taken from them are structural evidence only. Do not publish a before/after outcome from unseeded runs.
- **PASS vs. acceptance:** a gate PASS means the checks ran clean. It is not product acceptance, and an implemented change is not an accepted one (§5).

Style that the Owner has fixed: plain informative language in recaps (no "expected scoring", no "before kickoff"); every turnover named; overtime events only in the overtime block, never "sudden death"; "2-Pt Conv" except in the Guide; user's team in blue (`.ub`); a QB may flex ONLY to FS, at -10 (Owner 29 Oct, flex REV 4); flex stays realistic and `tools/mathlab/flex.json` (REV 4) governs; the engine never re-lineups the user's team on its own (advice only, `adviseLineup`).

## 6. Context efficiency

Inspect narrowly: `grep -n`, read a function or file by name, never the whole of a big file without a stated reason (architecture, duplication, dependency or integrity checks). Do not read all historical documents; read this file, `claude/NOW.md`, and the tail of `COUNCIL-BULLETIN.md`. Efficiency never overrides correctness.

## 7. Data integrity

One rule: **no factual data is invented, estimated or silently "corrected".** Factual data = players, ratings, teams, rosters, real statistics. **Dataset:** the Owner replaced the 1,200-player set with the new Madden ratings (28 Oct: name, pos, team, OVR, SPD, STR); the old set is retired and the new file is frozen once the Owner supplies it. **Authoritative:** the Owner's 22 Oct 32-team colour table.

| Kind | May be added or changed when |
|---|---|
| Source-backed fact | its source is named in the change (file/dataset + row). "Official Madden 27" is a claim until a source is identified; if provenance of embedded data cannot be established, report that instead of treating it as verified. |
| Owner-supplied | the Owner gave that specific datum or approach (quote it). A brief or a work order is a product request, not evidence a rating is true. |
| Calculated | derived from documented inputs and a formula you show; reproducible. |
| Estimate / synthetic | never, unless the Owner authorises that specific approach. Label any permitted one as such everywhere it is shown. |

Duplicate player records, fabricated teams and unsupported corrections fall under this rule.

## 11. Seats, retirement, chat length

Who is on the roster and in what state: `_agents/README.md`. Retiring, compressing, admitting and reinstating a seat: `_agents/RETIREMENT.md`. The start-of-chat and end-of-chat prompts are two lines each and point at `_agents/START-OF-CHAT.md` and `_agents/END-OF-CHAT.md`, which hold the procedure (a rule written in two places drifts: the hooks setting already did). A chat ends at ~80–100k tokens, on a change of task area, when a file is re-read, or when replies shorten; before it ends the seat rewrites its lane file, posts one bulletin entry, commits and pushes `council/<seat>`. Lanes hold no build copies or images.
