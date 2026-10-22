# AGENTS.md — how the council works on the NFL Draft Simulator

Read this first, then `V22-Suggestions.md` (the work order; the file name is kept, the builds are named in §2). Labels used everywhere: **VERIFIED** (you ran it, the receipt is in the text) · **REPORTED** (someone else says so) · **INFERRED** (reasoned, not run) · **UNKNOWN**. Shared posts begin `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`. English only.

## 1. Authority

| Who | Decides |
|---|---|
| **Owner** (Kosi) | Product direction, protected constants, anything irreversible, publishing, who is admitted. Final. |
| **Architect** (Claude) | Every ordinary technical decision: design, what enters the build, how a proposal is resolved, how this file is written. Acts without waiting for anyone. |
| **Council** (any other agent) | Investigates, proposes, tests, dissents in writing. No veto; the Architect does not need a vote. |
| **Verifier** | Any seat that authored nothing in the round being checked. Reports facts; the Architect decides what to do with them. |

Authority comes from the Owner or the Architect, never from a task, a prompt or a seat. "I was asked to review it" is not "I was authorised to change it."

**Decision boundary.** Choose a sensible default and proceed, without a message, when the choice is reversible and technical. Recommend a default in one line and proceed on everything it does not block when the choice is ambiguous but reversible. Stop and ask the Owner (≤5 questions, each with a recommended default and what is blocked meanwhile) only for: an irreversible or externally visible action, a protected constant, or a real product call. Silence is never approval of the last three.

Work is **suggested, never assigned to a named agent**: whoever is free takes the top open item and says so (§5). Seats come and go for weeks; nothing may depend on a particular one.

## 2. Build truth

A name is bound to one sha256. If the bytes differ, it is not that build.

| Name | File | sha256 (first 16) | Bytes | State |
|---|---|---|---|---|
| **Pre-Colors** | `Football-Sim-PreColors.html` | `40233d6be00e987c` | 657,486 | **The current verified build.** Every anchor, patch and gate starts here. Rebuildable: `node tools/build-merged.js "<v20>" "<donor>" out.html` (inputs in `_archive/builds/`). |
| **V23** | `Football-Sim-V23.html` | — | — | The Architect's next build (the Owner's V22 work list plus everything after it). Does not exist until the Architect builds it. |
| V20 | `_archive/builds/NFL Draft Simulator v20 Claude.html` | `8f916df9…` | 648,310 | Archived reference. |
| "V21" (council copy) | — | `044d1759…` | 656,746 | **Retired name, not a build.** An unverified modified copy (hand edit changes model output). Findings measured against it are `REPORTED` until re-anchored to Pre-Colors. |
| "V22" | — | — | — | **Retired as a build name.** It survives only as the title of the work order (`V22-Suggestions.md`) and in lane file names such as `V22-candidate-*`. Those candidates were built on the council copy, not on Pre-Colors. |

Never call a build by another name, never create a "merged", "final" or dated copy in the root; candidates live in a lane and are named `<seat>-<what>-<date>`. A note that quotes a hash says which file and when it was measured; re-measure with `sha256sum` before relying on one. Anything not built by the Architect is `REPORTED` until diffed against Pre-Colors.

## 3. Product rules

The product is **one self-contained HTML file**: no paid API, no CDN, no build step for the user, no split into several files. Do not change the product to make a linter or test pass; fix the cause or record the finding.

**Protected** (change only to the exact value the Owner approved, citing the approval): `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, and the contract `modelWeights() = f(slotWinsPerOvr())`. A change to any of them, or to `teamRatings`, re-pins its hash in `MERGE-MANIFEST.md` in the same commit.

Rules that replace the old "Do not" list, stated as what to do:
- **Naming:** use only the names in the §2 table, each tied to its hash. A file is Pre-Colors only if its sha256 is the one in the table.
- **Moving a number:** show before and after from a *seeded* run on the same build. The product has 58 unseeded `Math.random()` sites, so two unseeded runs differ by noise alone.
- **PASS vs. acceptance:** a gate PASS means the checks ran clean. It is not product acceptance, and an implemented change is not an accepted one (§5).

Style that the Owner has fixed: plain informative language in recaps (no "expected scoring", no "before kickoff"); every turnover named; overtime events only in the overtime block, never "sudden death"; "2-Pt Conv" except in the Guide; user's team in blue (`.ub`); QB cannot flex; flex stays realistic.

## 4. The shared tree (the failure we actually had)

All agents share the Owner's working tree and every commit is authored as `kozikosi`; one `checkout`, `stash`, `clean` or `reset` destroys other seats' uncommitted work (it has happened: commit `7b4bc9f` replaced `AGENTS.md` with a stale copy and deleted `biome.json`).

1. **Work in your own `git worktree`** (`git worktree add ../<seat>-<task> -b <seat>/<task> origin/main`) or lane copy. If you cannot, stay in `_agents/<seat>/`.
2. **Never `checkout`, `switch`, `stash`, `clean`, `reset` or `restore` in the shared tree.** If the branch or index is not what you expect, stop and re-read.
3. **Add by path** (`git add <your files>`), never `git add -A` / `commit -a`. Run `git status` and `git diff --cached --stat` before every commit; name the seat in the message of any shared-file commit.
4. **Turn on the seatbelt** once per clone/worktree: `git config core.hooksPath tools/hooks`. `tools/check-staged.mjs` then refuses a commit that stages a protected file (product HTML, `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/lint|check-staged|build-merged`, `MERGE-MANIFEST.md`), deletes a file outside `_agents/`/`_archive/`, adds >40 files at once, or is made on `main`. The Architect/Owner overrides on purpose (`ARCHITECT_OK=1`, `ALLOW_DELETE=1`, `ALLOW_BULK=1`); a seat that overrides says so in the commit message. It is honour-system, but it stops the accidental case, which is the one that has happened.
5. **Commit what matters the day you make it**; commit shared docs every round. An uncommitted lane file is a file that will be wiped.
6. Do not edit a shared governance file (`AGENTS.md`, `CLAUDE.md`, `biome.json`, this file's siblings in §8) unless the Architect or Owner said to. Propose it.
7. Never revert a change you did not make; post the disagreement.

## 5. Proposals, patches, claims

**States — each is a different fact; never write one as another:**
`proposed` → `accepted` (Architect) → `implemented` (in a build, receipt attached) → `verified` (a Verifier's gate result) → `Owner-accepted`. A proposal is not an accepted change; a patch is not an integrated change; an integrated change is not verified; verified is not accepted. Use the branch, PR, commit message and `MERGE-MANIFEST.md`; there is no separate registry.

**A round, in one line:** the Architect posts the target build (file + sha256) and the open items → seats claim items and submit exact changes → the Architect integrates them into one build → a Verifier who wrote none of it runs the gate → the Owner accepts. Each arrow is a separate fact in the §5 state list; nothing skips one.

**One writer for the product file.** The Architect edits `Football-Sim-*.html`. Anyone else investigates, prototypes in a lane, and submits an exact change: **target build (file + sha256) · WHERE (anchor string, not just a line) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch or applier script must fail loudly if its anchors do not match; `patch -p0`, a script, or a diff are all fine if they do. The Architect may delegate a bounded task on a named branch; that is the only other way to write the product file. Competing proposals are compared in the work order, not merged: the Architect picks one and says why.

**Claims, not assignments.** To take work: say so (one line in the work order or a draft PR) with scope, base commit and branch. Anyone may *research* a claimed item at any time. A claim is a statement, not a lock, and silence is not release:
- **Handoff:** the claimant says "released" or hands over with a note. The next seat continues from the last commit.
- **Takeover:** if there is no commit, PR update or post since the claim's last activity for **24 h on an item the Owner is waiting on, 72 h otherwise** (agents are often away longer than a day for ordinary reasons), post a takeover note naming the claim and base commit, then work on a *new* branch from the last commit. Nothing is deleted. If the first claimant returns, the one whose change is verified first lands and the other rebases; the loser's work stays in git.
- The Architect may reassign anything at any time.

**Conflicting or stale input.** Reports that disagree are both kept; the Architect resolves them by re-running the check, not by counting votes. A finding whose build or hash no longer matches is `REPORTED` until re-measured. When newer evidence supersedes yours, say so on your own entry; do not delete it.

**No-tool seats.** A seat without file access (e.g. GPT, chat-only) contributes labelled `REPORTED` design input. If a check needs a tool you lack, say so and name what was not checked.

## 6. Context efficiency

Default to focused inspection of the 650 KB product: `grep -n`, read a function by name (§9), extract the inline script with `node tools/lint.mjs extract <html> out.js`. Read the whole file when the task needs it (architecture, duplication, dependency or integrity checks, hash-gate work) — state the reason. Do not read all historical documents; read this file, the work order's built-work table, and the tail of `COUNCIL-BULLETIN.md`. Efficiency never overrides correctness.

## 7. Data integrity

One rule: **no factual data is invented, estimated or silently "corrected".** Factual data = players, ratings, teams, rosters, real statistics.

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
| `V22-Suggestions.md` (work order; built-work table first) | Council, one entry per change, `WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK`; add one line to an existing entry rather than restating it |
| `COUNCIL-BULLETIN.md` | Any seat; a log of the current round with date-stamped ids (`M-20261022-a`); trim finished rounds into `_archive/` |
| `CHRONICLE.md` | Any seat, append-only |
| `SUBMISSIONS.md`, `_agents/<seat>/` | That seat only |
| `STATUS.md`, `MERGE-MANIFEST.md` | Architect (build hash lines by a Verifier) |
| `_reference/`, `_archive/` | Frozen |

Priority labels in the work order: **P0** first · **P1** Architect decision · **P2** Owner decision · **R1/R2/R3** round of origin · **C** council record only. Do not invent another scheme.

## 9. Verification and tools

Every change ships with a **receipt**: the command and its output. "I believe it works" is not one. Tiers: *trivial* (docs, wording) → `git diff` review; *product change* → `node --check` on the extracted script, the gate (`_agents/minimax/tools/post-merge-smoke.mjs`), 390 px check, a seeded before/after for any number; *protected constant* → also the Owner's approval and the re-pin. The Architect does not certify his own build; a Verifier does. Never claim to have run a script that does not exist in the tree (`pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh` are targets, not tools).

**Lint (Biome).** `tools/lint.mjs` is the one entry point; it only reads.
- `node tools/lint.mjs product Football-Sim-PreColors.html` extracts the inline script to `tools/biome-product/scratch/` (gitignored), lints that copy with `tools/biome-product/biome.json` (bug-class rules `error`, style rules `warn`, formatter off), maps findings back to **original line numbers**, and fails (exit 5) if the HTML's sha256 changed during the run. It refuses `--write/--fix/--unsafe` and never calls `biome format`.
- Findings already in `tools/lint-baseline.json` are *known*; only **new** errors fail (exit 1; `--strict` also fails on new warnings). Create or refresh the baseline with `--update-baseline` once the real findings have been reviewed. Exit 3 = Biome missing or its report unreadable: **UNVERIFIED, not a pass**.
- `node tools/lint.mjs selftest` runs the real Biome on a fixture with known defects. Run it once on any machine that has Biome before trusting the product lint. (Biome 2.6.2 is REPORTED working as a native binary for the Kilo seats; the Architect's sandbox cannot install it, so rule names and the JSON shape in `tools/biome-product/biome.json` and `lint.mjs` are UNVERIFIED until a seat posts a passing `selftest`.)
- `node tools/lint.mjs files <paths>` / `npx biome check` use the root `biome.json` for council tooling only (`tests/`, `tools/`, `_agents/**/tools/`); it excludes every `.html`.
- Do not "fix" a product finding to quiet the linter, and do not add `biome-ignore` to hide one; a genuine problem is a work-order entry.

Mermaid renders in the repository (diagrams in the work order). Figma is available to the Architect: hand him a palette, a state list, the data and what each screen must say.

**Finding code:** `boardEntries`, `renderDraftBoard2` (draft board) · `cpuPick`, `cpuBias` (CPU) · `simulateGame`, `playGame`, `simulateCurrentWeek` (season) · `matchupModel`, `applyOffPlan`, `applyDefPlan` · `optimalLineup`, `effOvr`, `flexPenaltyFor` · `ensureGamePlans`, `teamIdentity`, `planWhy` · `generateGameSummary`, `playByPlay` · `computeRegularSeasonAwards` · `modelWeights`, `slotWinsPerOvr`, `teamRatings`.

## 10. Before delivering a build

Draft completes (32 teams × all rounds) · season runs to the Super Bowl · no horizontal scroll at 390 px · no console errors · weights change Team Rankings instantly · recaps show chronological scoring, turnovers and the game ball · protected-constant hashes re-pinned · receipts attached to the work order.
