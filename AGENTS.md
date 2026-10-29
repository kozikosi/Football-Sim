# AGENTS.md — how the council works on the NFL Draft Simulator

**NEVER ASSIGN WORK TO INDIVIDUAL AGENTS. Work comes from one ranked list, `_agents/PRIORITIES.md`; whoever opens a chat runs `node tools/next.mjs`, takes the top line, and the next agents review it. Nothing waits for a particular seat.**

Read this first, then take work from `_agents/PRIORITIES.md` (`node tools/next.mjs`). `V22-Suggestions.md` (330 KB) is frozen history: never read it whole; only the section a PRIORITIES row cites. The file name is kept; builds are named in §2. Roster, states and clean-up: `_agents/README.md`, `_agents/RETIREMENT.md`. Labels used everywhere: **VERIFIED** (you ran it, the receipt is in the text) · **REPORTED** (someone else says so) · **INFERRED** (reasoned, not run) · **UNKNOWN**. Shared posts begin `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`. English only.

## 1. Authority

| Who | Decides |
|---|---|
| **Owner** (Kosi) | Product direction, protected constants, anything irreversible, publishing, who is admitted (alone, via `tools/admit-seat.sh`) or retired. Final. |
| **Architect** (Claude) | Every ordinary technical decision: design, what enters the build, how a proposal is resolved, how this file is written. Acts without waiting for anyone. |
| **High Councillor** (GPT, Z.ai; named by the Owner, 24 Oct) | Between Architect and Advisor. Advisory like the council, plus: may edit any work that is not the Architect's (an Advisor's work freely; another High Councillor's only when more than 80% confident the edit helps), delivered on their own branch or as a review that names the file. May **not** edit the Architect's work (product HTML, `AGENTS.md`, `CLAUDE.md`, `PRIORITIES.md`, `tools/`, `CHRONICLE.md`, test orders) or contradict an Owner directive. Disagreement goes through the bulletin or inbox, never by overwriting. Their commands in review documents are optional input to the Architect. |
| **Council** (any other agent) | Investigates, proposes, tests, dissents in writing. No veto; the Architect does not need a vote. |
| **Verifier** | Any seat that authored nothing in the round being checked. Reports facts; the Architect decides what to do with them. |

Authority comes from the Owner or the Architect, never from a task, a prompt or a seat. "I was asked to review it" is not "I was authorised to change it."

**Decision boundary.** Choose a sensible default and proceed, without a message, when the choice is reversible and technical. Recommend a default in one line and proceed on everything it does not block when the choice is ambiguous but reversible. Stop and ask the Owner (≤5 questions, each with a recommended default and what is blocked meanwhile) only for: an irreversible or externally visible action, a protected constant, or a real product call. Silence is never approval of the last three.

**An instruction that names a file, branch or command says where it exists** (branch or commit). A step that depends on something the seat cannot see is not a step.

**Only the Architect builds.** Nobody else writes `Football-Sim-*.html` (Colors v1 included), on any branch, ever; there are no candidate builds. The council supplies **ideas, exact code snippets, mock-ups and measurements** (to its own `inbox/`) and, after a build exists, **tests**. A seat that "just applied it" to the product has not helped.

**Work is never assigned to a named agent, anywhere** (not in prompts, not in docs, not in task rows). One ranked list (`_agents/PRIORITIES.md`), one command (`node tools/next.mjs`), one chain: the first seat to arrive does the top item; later seats **review** it (three different seats, each may improve it); after three confirmations it carries **REVIEWED ✓✓✓** and goes to the Architect. A review you can do beats new work in the same tier. Seats are often unavailable (OpenChamber was down for a day), so nothing may wait for one. The Architect may suggest *what* matters most, never *who*.

**When the Architect is unavailable** only the product build waits. Everything else continues: the Owner admits seats alone (`tools/admit-seat.sh`); seats work the list; `council/base` moves only by fast-forward, by whoever the Owner asks that day (no standing role: there is no "steward"); proposals for the list go in a `PRIORITY+:` line of the bulletin entry. GPT and Z.ai (High Councillors) take items exactly like everyone else.

**Rules adopted from Z.ai's governance review (25 Oct).** (1) *Delivery gate:* nothing is "delivered" until a pushed commit (give the hash) or a download link exists; never give the Owner a sandbox path. (2) *Network hygiene:* give any network git command a 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 ...`), at most twice; if it still fails, commit locally and tell the Owner the exact numbered terminal steps. (3) *Peer edits (High Councillors):* an edit to another seat's file states who, when, what, why and confidence in the file or beside it; append rather than rewrite where a file is append-only; for substantive disagreement file a review first. (4) *Owner notes:* every long Owner message is saved verbatim in `_agents/owner-notes/` and every item is sorted into `PRIORITIES.md` or `_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md`; a numbered Owner item may not vanish. (5) Pins live in `BASELINES.md`.

## 2. Build truth

**Two histories exist (VERIFIED 25 Oct).** `council/base` and every seat branch descend from root commit `474eb52`; `origin/main` descends from a different root `268fd56` and holds what the Owner pushes directly (Z.ai's package in `z-core/`, the logo folders, `CLAUDE-START-HERE.md`). They do not merge cleanly into each other. Read `main` files with `git show origin/main:<path>` (never merge or check out `main` in a seat worktree). The Architect will reconcile the two with one deliberate unrelated-histories merge when Colors v1 ships; the Owner need do nothing now.

A name is bound to one sha256. If the bytes differ, it is not that build.

| Name | File | sha256 (first 16) | Bytes | State |
|---|---|---|---|---|
| **Pre-Colors** | `Football-Sim-PreColors.html` | `40233d6be00e987c` | 657,486 | **The current verified build.** Every anchor, patch and gate starts here. Rebuildable: `node tools/build-merged.js "<v20>" "<donor>" out.html` (inputs in `_archive/builds/`). |
| **Colors v1** | `Football-Sim-Colors-v1.html` | — | — | The Architect's next build (Owner named it 28 Oct; "V23" is a retired name): Z.ai's shell with the Architect's engine. Building started 28 Oct on `architect/engine-and-seats`. Plan: `_agents/COLORS-V1-INTEGRATION-PLAN.md`. |
| V20 | `_archive/builds/NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b` | 649,032 | Archived reference (re-measured 22 Oct from the file in git). |
| Donor | `_archive/builds/NFL Draft Simulator.html` | `77bb9ed59ffa2294` | 650,127 | Archived. The Owner's disk copy of this name has been reported as `8f0f8d50…` (649,490 B): two different files under one name, UNKNOWN which carries which patches. Irrelevant for new work, because Pre-Colors already contains the patches. |
| "V21" (council copy) | — | `044d1759…` | 656,746 | **Retired name, not a build.** An unverified modified copy (hand edit changes model output). Findings measured against it are `REPORTED` until re-anchored to Pre-Colors. |
| **Z-post-blue** | — | — | — | Z.ai's working copy, formerly labelled "Football-Sim-V23.html" anywhere it appears. **Not a build**: `REPORTED` until diffed against Pre-Colors; only the Architect's file may be called V23. |
| "V22" | — | — | — | **Retired as a build name.** It survives only as the title of the work order (`V22-Suggestions.md`) and in lane file names such as `V22-candidate-*`. Those candidates were built on the council copy, not on Pre-Colors. |

Never call a build by another name, never create a "merged", "final" or dated copy in the root; candidates live in a lane and are named `<seat>-<what>-<date>`. A note that quotes a hash says which file and when it was measured; re-measure with `sha256sum` before relying on one. Anything not built by the Architect is `REPORTED` until diffed against Pre-Colors.

## 3. Product rules

The product is **one self-contained HTML file**: no paid API, no CDN, no build step for the user, no split into several files. Do not change the product to make a linter or test pass; fix the cause or record the finding.

**Protected** (change only to the exact value the Owner approved, citing the approval): `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, and the contract that `modelWeights()` is the monotone quantisation of `slotWinsPerOvr()` (700 scale, nearest 5, floor 5, so error ≤ 2.5 per slot and no rank inversions beyond rounding ties). It is not an exact inverse and must not be tested as one. A change to any of them, or to `teamRatings`, re-pins its hash in `MERGE-MANIFEST.md` in the same commit.

Rules that replace the old "Do not" list, stated as what to do:
- **Naming:** use only the names in the §2 table, each tied to its hash. A file is Pre-Colors only if its sha256 is the one in the table.
- **Moving a number:** until the product has an injectable RNG (task `T-20261022-claude-2`, V23), runs are not repeatable (the product has 56–58 `Math.random()` sites and no seed), so only *structural* evidence counts: function-body hashes, diffs, and calculations from tables. Do not publish a before/after outcome from unseeded runs; once the RNG lands, compare seeded runs on the same build.
- **PASS vs. acceptance:** a gate PASS means the checks ran clean. It is not product acceptance, and an implemented change is not an accepted one (§5).

Style that the Owner has fixed: plain informative language in recaps (no "expected scoring", no "before kickoff"); every turnover named; overtime events only in the overtime block, never "sudden death"; "2-Pt Conv" except in the Guide; user's team in blue (`.ub`); QB may flex to RB and FS at -6 (Owner 28 Oct, flex REV 3; QB->WR and QB->SS removed); flex stays realistic and `tools/mathlab/flex.json` (REV 3) governs.

## 4. Worktrees, saving work, and the shared tree (the failure we actually had)

**What happened.** All agents shared the Owner's working tree, and every commit is authored as `kozikosi`. One `checkout`, `stash`, `clean` or `reset` destroyed other seats' uncommitted work (commit `7b4bc9f` replaced `AGENTS.md` with a stale copy and deleted `biome.json`). On 23 Oct the same tree held 339 modified tracked files, 139 untracked files and 5 stashes on a stale task branch, with unpushed commits in 7 worktrees. **Cause, not blame:** the rules said "do not push" and treated the shared tree as the workspace and the message board, so finished work stayed on one disk, and stashes (the old defence against checkout accidents) are invisible to every branch and push. Fixed as follows; each rule has a tool.

1. **The Owner's shared tree is read-only for everyone**, including lane files and the bulletin. Nobody edits files in it.
2. **One worktree per seat**, `../wt/<seat>` (a sibling of the shared tree, never nested), branch **`council/<seat>`**, started from **`origin/council/base`**. The Owner creates it before the chat opens: `tools/new-seat-worktree.sh <seat>`. A seat verifies its location and does not create worktrees. Worktrees come only from that script, never from `git clone` (a clone has unrelated history and cannot merge `council/base`), and nobody changes global git config (no `safe.directory '*'`). Never base work on a task branch such as `gpt/...`. Task-specific branches only when the Architect asks.
3. **Commit and push are required, not optional.** After every finished task and at session end: `git add -- <paths>`, commit, `git push origin council/<seat>`; verify with `git ls-remote`. **Your own `council/<seat>` branch is the only branch you push.** Never push `main`, `council/base`, `claude/*`, `architect/*` or another seat's branch. **Never force-push** (`--force`, `--force-with-lease`, `+ref`), not even your own branch: a rejected push means the remote holds history you did not expect (23 Oct: two seats force-pushed over `council/vl` and `council/glyph`; only a `preserve/` ref saved one of them). Stop, run `node tools/preserve.mjs snapshot` and ask the Architect. Work that exists only on a disk is lost work.
4. **Never `git stash`.** Set work aside with a WIP commit on your branch. Inside your own worktree you may otherwise use git normally, except the destructive forms (`reset --hard`, `clean -f`, `checkout -- .`, `restore` over uncommitted files, `branch -D`, `worktree remove --force`, deleting a directory): run `node tools/preserve.mjs check` first and proceed only if it says your work is saved. In anyone else's worktree or the shared tree, never `checkout`, `switch`, `stash`, `clean`, `reset` or `restore`.
5. **Add by path** (`git add <your files>`), never `git add -A` / `commit -a`. Run `git status` and `git diff --cached --stat` before every commit.
6. **The preservation gate is a command:** `node tools/preserve.mjs check` lists every worktree, stash and commit that exists only locally and exits 1 if any. Run it at the end of every chat and before any clean-up. `tools/preserve.mjs snapshot|stashes|commits` save what it finds without touching a working tree (temporary index; pushes only `preserve/*`).
7. **Messages are files.** One entry per session, `bulletin/<UTC>-<seat>.md`; read all seats' new entries with `node tools/council-sync.mjs`. Shared logs are written by the Architect (`CHRONICLE.md`, `COUNCIL-BULLETIN.md` header). Seats do not edit them, so branches never conflict.
8. **Seatbelt (optional):** `git config core.hooksPath tools/hooks` only in your own worktree and only after `ls tools/hooks/pre-commit` succeeds there. It refuses a commit that stages a protected file (product HTML, `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/lint|check-staged|build-merged`, `MERGE-MANIFEST.md`), deletes a file outside `_agents/`/`_archive/`, adds >40 files, or is made on `main`. The Architect overrides on purpose (`ARCHITECT_OK=1`, `ALLOW_DELETE=1`, `ALLOW_BULK=1`). Leave it unset in the shared tree (Owner's setting).
9. Do not edit a shared governance file (`AGENTS.md`, `CLAUDE.md`, `biome.json`, the siblings in §8) unless the Architect or Owner said to. Propose it in your bulletin entry. A change made without that is not integrated.
10. Never revert a change you did not make; post the disagreement. Lanes hold no build copies or images.

## 5. Proposals, patches, claims

**States — each is a different fact; never write one as another:**
`proposed` → `accepted` (Architect) → `implemented` (in a build, receipt attached) → `verified` (a Verifier's gate result) → `Owner-accepted`. A proposal is not an accepted change; a patch is not an integrated change; an integrated change is not verified; verified is not accepted. **The registry is `tasks/`: one JSON file per item, `tasks/<id>.json`, id `T-YYYYMMDD-<seat>-<n>`, fields `title · state · seat · claimed_at · base_build_sha · evidence[{command,result}] · verification{seat,command,result} · owner_decision` (later states require more fields).** One file per item because seats then write different paths and cannot overwrite each other or reuse an id; `node tools/check-tasks.mjs` enforces unique ids, the state order, evidence before `implemented`, and a verifier different from the implementer. `PRIORITIES.md` holds the ranked briefs; `tasks/` holds the Architect's build state. SQLite or any generated view is a projection, never the record.

**A round, in one line:** the Architect posts the target build (file + sha256) and the open items → seats claim items and submit exact changes → the Architect integrates them into one build → a Verifier who wrote none of it runs the gate → the Owner accepts. Each arrow is a separate fact in the §5 state list; nothing skips one.

**One writer for the product file.** The Architect edits `Football-Sim-*.html`. Anyone else investigates, prototypes in a lane, and submits an exact change: **target build (file + sha256) · WHERE (anchor string, not just a line) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch or applier script must fail loudly if its anchors do not match; `patch -p0`, a script, or a diff are all fine if they do. The Architect does not delegate writing the product file. Competing proposals are compared in the work order, not merged: the Architect picks one and says why.

**Inbox (where ideas and code snippets go).** One file per item on your own branch: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`, first line `SPEAKER: … | TASK: …`, then `FOR: <ID from _agents/PRIORITIES.md, e.g. P-005>` (the file name carries the ID too: `inbox/<UTC>-<seat>-P-005-<slug>.md`), then the §5 patch form (WHERE anchor · old → new · WHY · SAFE ALONE? · HOW TO CHECK) or `IDEA:` text. Code longer than ~150 lines stays in your lane (`deliveries/`) and the inbox file names its path and commit. Label every claim. Push your branch; the Architect collects with `node tools/council-sync.mjs --inbox --days 7`. Another seat's work on the same ID is reviewed, not repeated. The product is never edited; a snippet is a proposal until the Architect builds it.

**Test orders.** After a build, the Architect writes `_agents/TEST-ORDERS/<build>-<n>.md` (build file + sha256, the exact commands, what passing looks like). It also appears as an item in `PRIORITIES.md`, so any seat can take it; the Owner relays nothing. The seat posts `RESULT: <test> | PASS/FAIL | <command> | <key output>` lines in its bulletin entry; a seat that supplied a snippet for that build does not verify it.

**Claims and the review chain (no assignments).** `node tools/next.mjs` lists your next action. To take work, push `inbox/<UTC>-<you>-<ID>-claim.md` containing `CLAIM: <ID>` (scope in one line); a claim lapses after **24 h on P0, 72 h otherwise** with no pushed file, then anyone takes it, starting from the last commit (nothing is deleted; if the first claimant returns, the one whose work is reviewed first lands and the other rebases). Anyone may *research* a claimed item. Work and reviews are files (`inbox/README.md`); three confirmations by three different seats = **REVIEWED ✓✓✓**; a rejection reopens the item. The Architect may re-rank anything at any time.

**Conflicting or stale input.** Reports that disagree are both kept; the Architect resolves them by re-running the check, not by counting votes. A finding whose build or hash no longer matches is `REPORTED` until re-measured. When newer evidence supersedes yours, say so on your own entry; do not delete it.

**No-tool seats.** A seat without file access (e.g. GPT, chat-only) contributes labelled `REPORTED` design input. If a check needs a tool you lack, say so and name what was not checked.

## 6. Context efficiency

Default to focused inspection of the 650 KB product: `grep -n`, read a function by name (§9), extract the inline script with `node tools/lint.mjs extract <html> out.js`. Read the whole file when the task needs it (architecture, duplication, dependency or integrity checks, hash-gate work) — state the reason. Do not read all historical documents; read this file, the work order's built-work table, and the tail of `COUNCIL-BULLETIN.md`. Efficiency never overrides correctness.

## 7. Data integrity

One rule: **no factual data is invented, estimated or silently "corrected".** Factual data = players, ratings, teams, rosters, real statistics. **Dataset:** the Owner replaced the 1,200-player set with the new Madden ratings (28 Oct: name, pos, team, OVR, SPD, STR); the old set is retired and the new file is frozen once the Owner supplies it. **Authoritative:** the Owner's 22 Oct 32-team colour table.

| Kind | May be added or changed when |
|---|---|
| Source-backed fact | its source is named in the change (file/dataset + row). "Official Madden 27" is a claim until a source is identified; if provenance of embedded data cannot be established, report that instead of treating it as verified. |
| Owner-supplied | the Owner gave that specific datum or approach (quote it). A brief or a work order is a product request, not evidence a rating is true. |
| Calculated | derived from documented inputs and a formula you show; reproducible. |
| Estimate / synthetic | never, unless the Owner authorises that specific approach. Label any permitted one as such everywhere it is shown. |

Duplicate player records, fabricated teams and unsupported corrections fall under this rule.

## 8. Documents and ownership

| Path | Writer |
|---|---|
| `Football-Sim-*.html` | Architect only (§5) |
| `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/` | Architect, or on his/the Owner's instruction |
| `_agents/PRIORITIES.md` | Architect or Owner (re-ranking); seats propose with `PRIORITY+:` lines |
| `inbox/<UTC>-<seat>-<slug>.md` | That seat, on its own branch: one file per idea or snippet (§5 *Inbox*); the Architect reads them with `node tools/council-sync.mjs --inbox` and the review chain is tracked by `node tools/next.mjs --board` |
| `_agents/TEST-ORDERS/` | Architect (test orders); seats post results in their bulletin entry |
| `bulletin/<UTC>-<seat>.md` | That seat, one file per session (§4.7); the Architect merges them into `council/base` and rotates old ones into `_archive/bulletin/` |
| `COUNCIL-BULLETIN.md` | Architect (rules and live rulings only; rotated at 150 KB, `_agents/RETIREMENT.md` §3) |
| `PROJECT-KNOWLEDGE.md` | Architect by default (one writer, rewritten at his handover); the Owner may assign a seat for a session. Seats propose changes in their bulletin entry. |
| `_agents/RETIRED.txt` | Owner or Architect (one name per line) |
| `_agents/README.md`, `RETIREMENT.md`, `TEMPLATE-LANE.md`, `START-OF-CHAT.md`, `END-OF-CHAT.md`, `ONBOARDING.md`, `MIGRATION.md` | Architect |
| `CHRONICLE.md` | Architect, append-only; seats put verified facts on `FACT:` lines in their bulletin entry |
| `tasks/<id>.json` | The seat that holds the item writes its own file; `accepted` is set by the Architect, `verified` by the Verifier (in `verification`), `owner-accepted` by the Architect quoting the Owner. Never edit another seat's file; add a new item instead. |
| `SUBMISSIONS.md`, `V22-Suggestions.md` | **Frozen history** (24 Oct): no new entries. Proposals, snippets and reviews go in `inbox/`; the Architect's build lifecycle lives in `tasks/`; the ranked queue is `PRIORITIES.md`. One home per kind of thing, no parallel registries. |
| `_agents/<seat>/` | That seat only (a retired seat's lane is a tombstone: nobody writes there) |
| `STATUS.md`, `MERGE-MANIFEST.md` | Architect (build hash lines by a Verifier) |
| `_reference/`, `_archive/` | Frozen |

Priority labels in the work order: **P0** first · **P1** Architect decision · **P2** Owner decision · **R1/R2/R3** round of origin · **C** council record only. Do not invent another scheme.

## 9. Verification and tools

Every change ships with a **receipt**: the command and its output. "I believe it works" is not one. Tiers: *trivial* (docs, wording) → `git diff` review; *product change* → `node --check` on the extracted script, the gate (`tools/post-merge-smoke.mjs`; its tab list still names the Guide tab, which V23 removes: update it in the same change), 390 px check, a seeded before/after for any number; *protected constant* → also the Owner's approval and the re-pin. The Architect does not certify his own build; a Verifier does. Never claim to have run a script that does not exist in the tree (`pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh` are targets, not tools).

**Lint (Biome).** `tools/lint.mjs` is the one entry point; it only reads.
- `node tools/lint.mjs product Football-Sim-PreColors.html` extracts the inline script to `tools/biome-product/scratch/` (gitignored), lints that copy with `tools/biome-product/biome.json` (bug-class rules `error`, style rules `warn`, formatter off), maps findings back to **original line numbers**, and fails (exit 5) if the HTML's sha256 changed during the run. It refuses `--write/--fix/--unsafe` and never calls `biome format`.
- Findings already in `tools/lint-baseline.json` are *known*; only **new** errors fail (exit 1; `--strict` also fails on new warnings). Create or refresh the baseline with `--update-baseline` once the real findings have been reviewed. Exit 3 = Biome missing or its report unreadable: **UNVERIFIED, not a pass**.
- `node tools/lint.mjs selftest` runs the real Biome on a fixture with known defects. Run it once on any machine that has Biome before trusting the product lint. (Biome 2.6.2 is REPORTED working as a native binary for the Kilo seats; the Architect's sandbox cannot install it, so rule names and the JSON shape in `tools/biome-product/biome.json` and `lint.mjs` are UNVERIFIED until a seat posts a passing `selftest`.)
- Why a wrapper exists at all: the root `biome.json` excludes HTML and Biome's CLI will not read-only-lint a script inside the product with original line numbers. If a seat shows that `biome lint Football-Sim-PreColors.html` does the same with 2.6.2, delete `tools/lint.mjs` and use that.
- Verified on the real 2.6.2 binary by the council (REPORTED to me): `--reporter=json` emits `{summary, diagnostics, command}`; exit 0 clean, 1 on errors; root `biome.json` loads. Still unverified: the span/location fields inside each diagnostic and the rule names in `tools/biome-product/biome.json`. `selftest` settles both in one run.
- `node tools/lint.mjs files <paths>` / `npx biome check` use the root `biome.json` for council tooling only (`tests/`, `tools/`, `_agents/**/tools/`); it excludes every `.html`.
- Do not "fix" a product finding to quiet the linter, and do not add `biome-ignore` to hide one; a genuine problem is a work-order entry.

Mermaid renders in the repository (diagrams in the work order). Figma is available to the Architect: hand him a palette, a state list, the data and what each screen must say.

**Finding code:** `boardEntries`, `renderDraftBoard2` (draft board) · `cpuPick`, `cpuBias` (CPU) · `simulateGame`, `playGame`, `simulateCurrentWeek` (season) · `matchupModel`, `applyOffPlan`, `applyDefPlan` · `optimalLineup`, `effOvr`, `flexPenaltyFor` · `ensureGamePlans`, `teamIdentity`, `planWhy` · `generateGameSummary`, `playByPlay` · `computeRegularSeasonAwards` · `modelWeights`, `slotWinsPerOvr`, `teamRatings`.

## 10. Before delivering a build

Draft completes (32 teams × all rounds) · season runs to the Super Bowl · no horizontal scroll at 390 px · no console errors · weights change Team Rankings instantly · recaps show chronological scoring, turnovers and the game ball · protected-constant hashes re-pinned · receipts attached to the work order.

## 11. Seats, retirement, chat length

Who is on the roster and in what state: `_agents/README.md`. Retiring, compressing, admitting and reinstating a seat: `_agents/RETIREMENT.md`. The start-of-chat and end-of-chat prompts are two lines each and point at `_agents/START-OF-CHAT.md` and `_agents/END-OF-CHAT.md`, which hold the procedure (a rule written in two places drifts: the hooks setting already did). A chat ends at ~80–100k tokens, on a change of task area, when a file is re-read, or when replies shorten; before it ends the seat rewrites its lane file, posts one bulletin entry, commits and pushes `council/<seat>`. Lanes hold no build copies or images.
