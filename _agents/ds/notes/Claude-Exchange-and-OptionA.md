# Claude exchange and Option A — intake, verification, and the move to `main`

**Author:** DS · **Date:** 20 Oct 2026 · **Status:** proposal for council review · **No product edits**

**Purpose:** record the brief DS sent to Claude, Claude's reply, the actual repository state, and a slow, command-level Option A for moving the verified merge candidate onto `main`. Reviewers should challenge the facts and the branch mechanics, not just the prose.

---

## 1. One-page summary

1. The brief to Claude assumed he could read the builds and council files from `kozikosi/football-sim`. He could not.
2. The remote `main` is an **old seed**: `49fafc2`, 28 files, no v20 build, no donor build, no council docs. Claude was right to refuse unverified verdicts.
3. A remote branch **`origin/council-intake` already exists** at `474eb52` with **125 files**, including both builds, `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `QUESTIONS-FOR-THE-ARCHITECT.md`, `tests/CONTRACT.md`, and the agent dossiers. The fix for Claude is **read `council-intake`**, not "push a new intake branch from scratch."
4. There is a second, easily confused branch: the **nested local clone** has a local `council-intake` at `caace3e`, 39 commits on the old `21a6f67` line. It is **not** the remote `origin/council-intake`; `git merge-base` exits 1. This is a reconciliation item, not a fast-forward.
5. The verified merge candidate is **not created yet**. The intended candidate branch is **`merge/v20-donor`**. After the verifier signs off, tag the exact commit **`verified-merge-<short-hash>`**.
6. Option A is **preserve-then-rename**, not force-push: tag/branch the old remote `main` as **`seed-old-remote`** at `49fafc2`, rename remote `main` to `seed-old-remote`, then rename `merge/v20-donor` to `main`.
7. Pickle's M-31 independently confirms the intake state and `light dark`. It also flags two local repos and the board overwrite. The old "M-29" label is stale; Pickle's M-31 is filed. Read the bulletin tail before adding another message.
8. Open discrepancies for reviewers: identical-function count **390 (Pickle) vs 391 (DS)**; question-pack counts differ between the root copy and Pickle's copy (root currently shows four `[BLOCKING]`; Pickle reports 10 `[BLOCKING]`, 13 `[NOW]`, 9 `[LATER]`, 2 `[OPEN]`). Do not quote a count without naming the file and the copy.

---

## 2. The brief sent to Claude — decision summary

- **Builds:** v20 `31b7d61f…` 649,032 B is the reference; donor `77bb9ed5…` 650,127 B is the fix source.
- **Math:** eight shared functions and six protected constants are byte-identical; `cpuPick` is the ninth math function and is D-a.
- **Surface:** 17 differing functions = **14 donor / 1 v20 (`renderDraftBoard2`) / 2 synthesize (`setActiveTab`, `renderSeasonTab`)**. Four donor-only helpers are load-bearing; `updateStepper` is v20-only; `checkRewards` is a boundary artifact, true body identical.
- **Phone block:** Variant B = strict donor 6458–6488 + v20 6433 (`04b90cb68fcf`); Variant A = B + `if(t.dataset.nostack) return;` (`ec6306eb79df`). DS recommends A; Pickle's baseline is B.
- **D-a:** donor `cpuPick` (`94b878605b73` vs v20 `3dc9d12f500a`); donor has credible-GM round floors; v20 has `seen>16` and 92-deep misses.
- **D-b:** v20 line 1 is the compact wrapper plus base style (`color-scheme:light`), 530 B, of which 372 B is the base style; lines 2–12 are a second header with no base style; the donor's base style is line 4 with `light dark`; stray tail 15 B; duplicate markup is 158 B + 15 B = 173 B after relocating the 372 B base style. The often-quoted 546 B counts the base style as duplication.
- **D-c:** donor `render100` (`cc1016eacc78`) is the same function shifted +50 except it omits the `rWeights` sentence. Donor drop-in vs compute `rWeights`; do not hardcode a number.
- **D3:** MCP branch → verifier E2E at 390px with element-level checks and a clean console → `main`. The harness is not built; `tests/CONTRACT.md` v2 is scoped to donor `77bb9ed5` and assumes SIM-CORE markers absent from both builds; DS tools are in `_agents/ds/tools/`, not `tests/`.
- **Question pack:** the root copy and the intake/mirror copies differ after the shared-doc rebuild; do not quote a count without naming the copy. The old `~52 / 11` figure is not reliable.

The full brief is in Appendix A.

---

## 3. Claude's reply — verbatim, relayed by the Owner

> I'll start by checking that the builds and council files you cite actually exist in the repo, since the root listing I pulled yesterday didn't show them.
>
> I can't confirm anything in the negotiated state yet, because neither build nor any council file is in the repo. I also haven't touched the repo this turn.
>
> **What I found** (`kozikosi/football-sim`, `main` at `49fafc2`, the only branch):
> - **Builds:** there is no `v20 NFL Draft Simulator v20 Claude.html` and no `NFL Draft Simulator.html`. The HTML files at root are `Madden NFL 27 … (8).html` (641,309 B), `… (9) (OC).html` (641,987 B) and `index.html` (602,710 B). None match your 649,032 B or 650,127 B sizes, so I won't assume they are the same builds renamed.
> - **Council files:** `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `QUESTIONS-FOR-THE-ARCHITECT.md`, `STATUS.md`, `math-baseline.json` and the DS tools (`funcdiff-full.js`, `surface-lines.js`, `StyleBlocks.md`) are absent. Code search for `cpuPick` returns nothing, though the search index reported incomplete results.
> - **tests/:** it holds only `madden-sim.spec.js`. `CONTRACT.md` isn't there, though your message says it exists.
> - **Attachments and workspace:** nothing is attached to this conversation, and the workspace is empty.
>
> So I can't re-run the hash, byte-count or function-diff commands, and I won't give verdicts that look verified when they aren't.
>
> **Provisional answers, to be confirmed against the builds:**
> 1. **D-a:** donor `cpuPick` (pin `94b878605b73`). The reasoning you give (round floors, no deep-pick misses) is sound. I'll confirm it by diffing the two functions once I have both files.
> 2. **Color-scheme:** I lean `light`, which keeps v20's current behavior and adds no new surface. I'd switch to `light dark` only if `grep -c "prefers-color-scheme" ` on the build shows the main CSS already has dark rules. Otherwise controls and scrollbars go dark on a light page.
> 3. **Defect A:** donor `render100` drop-in. Computing `rWeights` as a real correlation is a new feature, so I'd handle it after the merge if you want it.
> 4. **D3 (transport):** yes, MCP push to this repo becomes the delivery channel, with a gate.
>    - The build lands on a branch such as `merge/v20-donor`.
>      - A verifier drives it end to end at 390px with element-level checks and a clean console.
>        - Only then does it reach `main`, ideally through a PR.
>          - My earlier direct push to `main` was a one-off test; I recommend not repeating it for product files. The council still can't verify my access independently, but the commits `b6c9671` and `49fafc2` are visible to anyone with repo access.
     5. **Question pack and merge plan:** I can't answer the four [BLOCKING] items without `QUESTIONS-FOR-THE-ARCHITECT.md`, and I'm not starting the merge until I've verified the builds.
>
> **What I need:** either attach the two builds and the council documents here, or have the Owner push them to a branch (say `council-intake`) and tell me its name. I'll then run the hashes, function diffs and wrapper and phone-block checks, send back verdicts with the commands I ran, and build the merge candidate.

---

## 4. What the actual repository state shows — verified 20 Oct

### 4.1 There are two local repositories, not one

| Location                                     | What it is                 | State                                                                                                                                         |
| -------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `…/Football Sim` (session root)              | The working workspace      | No remote (`git remote -v` empty); `main` = `268fd56`; 125 tracked files; builds and docs present; Round-4 docs/tools uncommitted             |
| `…/Football Sim/Football Sim` (nested clone) | The remote-connected clone | `origin` = `https://github.com/kozikosi/Football-Sim.git`; local branches `main` `21a6f67`, `council-intake` `caace3e`; remote branches below |

Do not say "commit and push" without naming which repository. The session root cannot push; the nested clone can fetch and push.

### 4.2 Remote branches

| Ref                           | Commit    | Files | Meaning                                                                                                                |
| ----------------------------- | --------- | ----: | ---------------------------------------------------------------------------------------------------------------------- |
| `origin/main`                 | `49fafc2` |    28 | Old seed + MCP test cleanup; **not the project**                                                                       |
| `origin/council-intake`       | `474eb52` |   125 | Intake snapshot with builds, council docs, tests, dossiers; **Claude should read this**                                |
| local nested `council-intake` | `caace3e` |  125+ | 39 commits on the old `21a6f67` line; **not** the remote intake; `git merge-base` with `origin/council-intake` exits 1 |

Commands used:

```bash
cd "/Users/kosi/Desktop/Football Sim/Football Sim"
git fetch origin --prune
git ls-tree -r --name-only origin/council-intake | wc -l   # 125
git ls-tree -r --name-only origin/main | wc -l             # 28
git merge-base origin/main origin/council-intake; echo $?   # exit 1
git merge-base council-intake origin/council-intake; echo $? # exit 1
```

### 4.3 Claude's error, and what was right

**Right:** he refused to verify from memory; the remote `main` really is the old seed; D-a donor and D-c donor are the correct provisional calls; asking for the files is the correct next step.

**Wrong:** his color-scheme lean is backwards. The app is **dark-default with a light OS override**:
- both builds have `@media (prefers-color-scheme: light)` at line 18;
- v20 adds a second light `body` override at line 223;
- the default variables are dark (`--bg:#0b0e14`, `--text:#e8ecf3`);
- therefore `color-scheme:light` would force light native controls and scrollbars while the app is using dark variables. **`light dark` is the correct declaration.** Receipt: `_agents/ds/reviews/round4/StyleBlocks.md` lines 17–23.

### 4.4 Pickle's M-31 review — what it confirms and what it corrects

Pickle independently verified the remote intake and filed M-31:
- `origin/council-intake` is already pushed at `474eb52` with 125 files; remote `main` has 28 seed files. The fix is "read `council-intake`", not "push a new intake."
- `light dark` confirmed; Claude's `light` is wrong for the reason above.
- D-a, D-c, D3 align with Pickle's receipts.
- Preserve-then-replace is right; the histories are genuinely unrelated, so the later step is a graft, not a fast-forward.
- Two local repos exist; the session root and the nested clone have different HEADs, so "commit and push" must name the repo.
- The bulletin lost Pickle's Round-4 M-27 to OR's M-27 during the 01:21–01:24 rebuild; this is evidence for preserving exact commits/tags rather than relying on a mutable board.
- The old "M-29" label is stale; M-31 is taken by Pickle. Read the tail before filing.
- The question pack's true counts differ from the root's four `[BLOCKING]` tags. Pickle reports 10 `[BLOCKING]`, 13 `[NOW]`, 9 `[LATER]`, 2 `[OPEN]` in the copy it read.
- Pickle reports canonical `408 / 390 / 17`; DS's last count is `408 / 391 / 17`. **Open discrepancy** — name the extraction unit and file before using either.
- `#glue` Variant A is right, but the reason must be stated: `nostack` exists v20 ×2 / donor ×0, and A's guard depends on keeping v20's `#draftTable2` markup (line 425, set).

### 4.5 Shared-document warning

The board and question pack were rebuilt between 01:21 and 01:24. Different copies now disagree. Do not quote a count or an `M-` number from memory. Read the tail of the file you are about to edit; name the copy; preserve exact commits/tags.

---

## 5. Option A — slow walkthrough

### 5.1 Names first

| Name                          | What it is                                                        | Does it exist now?                                  |
| ----------------------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| `council-intake`              | Intake snapshot of the project: builds, docs, tests, dossiers     | **Yes**, remote `origin/council-intake` = `474eb52` |
| `merge/v20-donor`             | Claude's merged candidate, built from the intake                  | **No**, not created yet                             |
| `verified-merge-<short-hash>` | Immutable tag on the exact candidate commit the verifier approved | **No**, created at sign-off                         |
| `seed-old-remote`             | The preserved old remote `main` at `49fafc2`                      | **No**, create before renaming                      |
| `main`                        | The branch that should point at the verified project              | Currently still the old seed at `49fafc2`           |

**Answer to "what is the verified new branch called?":** there is no verified branch yet. The candidate is **`merge/v20-donor`**. When the verifier signs off, tag that exact commit **`verified-merge-<short-hash>`**. Then, and only then, rename the candidate branch to `main`. A tag is better than a second branch for "this exact commit was verified" because a tag does not move.

### 5.2 The order

**Step 0 — choose the intake, and fetch.**
The remote `origin/council-intake` is the branch Claude can read. The nested local `council-intake` is a different history; do not push it over the remote branch. Decide first whether the remote intake is sufficient or the local 39-commit line must be reconciled and pushed to a **new** branch (for example `council-intake-local`). Do not force either branch.

**Step 1 — Claude creates the candidate.**
Claude branches from `origin/council-intake`:

```text
merge/v20-donor  ←  origin/council-intake
```

He builds the merged candidate there. The branch name is a proposal, not a rule; if he prefers another name, record it before the verifier starts.

**Step 2 — the verifier signs off.**
The verifier drives draft → season → playoffs at 390px with element-level overflow checks and a clean console. Only after that:

```bash
git fetch origin
git tag verified-merge-<short-hash> origin/merge/v20-donor
git push origin verified-merge-<short-hash>
```

The tag is the durable "this is the verified commit" marker. The branch can still move; the tag cannot.

**Step 3 — preserve the old `main`.**
Before renaming anything, create a tag and/or branch at `49fafc2`:

```bash
git fetch origin
git tag seed-old-remote origin/main
git push origin seed-old-remote
```

A tag is enough to keep the commit reachable. A branch named `seed-old-remote` is also fine if you want a movable bookmark.

**Step 4 — rename the remote `main` to `seed-old-remote`.**
The safest way is the GitHub web UI, not a force-push:
1. Open the repository → **Branches**.
2. Find `main` → pencil/edit → rename it to `seed-old-remote`.
3. Do not delete it. The old seed and the MCP test commits remain reachable.

This frees the name `main` without rewriting history.

**Step 5 — rename `merge/v20-donor` to `main`.**
Still in **Branches**:
1. Find `merge/v20-donor` → pencil/edit → rename it to `main`.
2. Set `main` as the default branch if GitHub has not done so.
3. Confirm the `main` head is exactly the commit tagged `verified-merge-<short-hash>`.

**Step 6 — verify, then clean up.**
Check:

```bash
git fetch origin
git log -1 --format='%H %s' origin/main
git rev-parse origin/main
git rev-parse verified-merge-<short-hash>
```

The two hashes must match. Only then delete temporary branches if you want. Keep `seed-old-remote` and the verified tag.

### 5.3 How to rename in git — local vs remote

A local rename does **not** rename the remote branch. This is the usual confusion.

**Local branches only:**

```bash
git branch -m main seed-old-remote
git branch -m merge/v20-donor main
```

This changes names in your clone; `origin/main` is untouched.

**Remote branches:** use the GitHub UI as above. If you must use git, rename in this order:

```bash
git fetch origin

# after the old main has been renamed/freed in the GitHub UI:
git push origin origin/merge/v20-donor:refs/heads/main
```

That creates remote `main` pointing at the candidate. If remote `main` still exists, the push is rejected as non-fast-forward; do **not** use `--force` for this. Free the name first with the UI rename.

**Do not force-push `main`.** The rename is reversible and preserves the old seed. A force-push can lose commits and makes the review trail harder to audit.

### 5.4 Option B, for contrast

If you want the old seed's commits to remain in the `main` history, merge the two histories with `--allow-unrelated-histories`, then delete the 28 old seed files in the merge commit. This is more work and a messier review. Option A is cleaner if the old seed is disposable. The important point is the same: **preserve `49fafc2` first; verify the candidate first; do not rewrite `main` before sign-off.**

---

## 6. Questions for reviewers

1. Is `origin/council-intake` (`474eb52`, 125 files) the correct base for `merge/v20-donor`, or must the local 39-commit line be reconciled first?
2. Is `merge/v20-donor` the right candidate name? Should the verified tag be `verified-merge-<hash>` or something else?
3. Is the rename order safe: tag `49fafc2` → rename remote `main` to `seed-old-remote` → rename `merge/v20-donor` to `main` → set default?
4. Is there a branch-protection or default-branch trap in the GitHub UI rename sequence?
5. Do you confirm `light dark` over Claude's `light`? Give the receipt or the contrary evidence.
6. Is the 390 vs 391 identical-function count real, a unit difference, or a stale copy? Which file/command should be canonical?
7. What is the correct question-pack count in the copy you can see, and which copy should Claude receive?
8. Any correction to Pickle's M-31, the two-intake warning, or the `#glue` Variant A rationale?
9. Should the M-29 receipt be dropped in favor of Pickle's M-31, or should a new message be filed after reading the tail?

---

## 7. Review dispatch

Sent to the OpenChamber sessions: **GLM, Pickle, Super, Ultra, Lightning**. Claude is not an OpenChamber session; the Owner relays this document through MCP/chat. Outside agents (Beam, MiniMax, OR, VL, etc.) are also Owner-relayed.

Reviewers: reply in your own session with **constructive additions or corrections**, especially on the branch mechanics, the two-intake problem, and the color-scheme/count disputes. Do not edit product files. If you file a bulletin note, read the tail first and take the next free number; the old M-29 label is stale.

---

## Appendix A — full brief sent to Claude

```text
FROM THE OWNER — 20 Oct.

You are the Architect of the NFL Draft Simulator council. The council has
completed its four-round review cycle; the Round-4 settle-and-fill is
filed as M-26 (GLM rules), M-27 (Pickle), and M-28 (DS). Most claims
carry receipts; where a claim is single-session or stale, it is marked.
The record includes its own corrections (14→17, 390→391, T-9), so
commands are the authority. Re-verify anything; the commands are in
COUNCIL-BULLETIN.md M-19…M-28 and CHRONICLE.md. (M-25's header was
duplicated/lost; use its body and the M-26–M-28 filings.) Your MCP write
access to kozikosi/football-sim is confirmed — your own test: commit
b6c9671 + cleanup 49fafc2; the repo is a single unprotected main, and
those commits are unsigned. No council session has edited the product
files; the merge is yours alone. What follows is the negotiated state,
then what the council needs.

THE NEGOTIATED STATE (all receipt-backed; re-verify any of it):
- Builds: v20 "NFL Draft Simulator v20 Claude.html" (31b7d61f…,
  649,032 B) is the reference/base per R2; "NFL Draft Simulator.html"
  (77bb9ed5…, 650,127 B) is the fix donor.
- Math core: 8 shared functions byte-identical across both (slotWins,
  slotWinsPerOvr, modelWeights, effOvr, optimalLineup, matchupModel,
  simulateGame, teamRatings) + all six protected constants. The 9th
  math function is cpuPick; that is D-a below. Pickle's proposed hash
  gate is currently `_agents/pickle/specs/math-baseline.json`; the
  target is `tests/math-baseline.json`. It should pin the 8 shared
  functions, the 6 constants, and the donor cpuPick pin
  94b878605b73. Your call.
- Merged surface: 17 differing common functions, not "17 changed":
  14 take the donor, renderDraftBoard2 stays v20, and setActiveTab +
  renderSeasonTab are synthesized. The 4 donor-only helpers
  (seasonToast, goSeason, meetingInfo, meetingTagText) are load-bearing
  and stay; updateStepper (spelling) is v20-only and stays.
  checkRewards is not an 18th: the raw scan's extra hit is a boundary
  artifact; the true body is identical at 0a000ce52783. Counts:
  408 common = 391 identical + 17 differing; 430/413 are the
  all-declaration unit (430 = 408 + 22 nested; 413 = 391 + 22). Do not
  use the old 394/14 split.
- Phone block: B = strict donor 6458–6488 + v20 6433 (canonical
  04b90cb68fcf). A = B + `if(t.dataset.nostack) return;` to preserve
  #draftTable2's pre-set labels (canonical ec6306eb79df). DS recommends
  A; Pickle's baseline is B; decide.
- Decision D-a, cpuPick: keep the DONOR's (v20 pin 3dc9d12f500a;
  donor 94b878605b73). The donor has credible-GM round floors
  (curRound/topAvail/posBest/ovrFloor; posBest gates rounds 1–3);
  v20's has seen>16 skips and misses up to 92 picks deep. The settled
  oracle is donor. Super's consolidated brief still carries a stale
  "cpuPick v20" line and old 408/394/14 counts; that is a drafting
  error, not a competing decision. Brief v2 must correct it.
- Decision D-b, wrapper: v20 is double-wrapped. Line 1 is a complete
  compact html/head/body with the base/reset style
  (`color-scheme:light`): 530 B, of which 372 B is the base style.
  Lines 2–12 are a second structured doctype/html/head
  (meta/title/OG) with no base style; they are not "the donor's
  structured header (light dark)." The donor's clean header has the
  base style at line 4 with `color-scheme:light dark`; the base style
  is otherwise identical apart from that token. V20 closes at
  6436–6437 and has a stray </body></html> at 6439 (15 B). After the
  372 B base style is relocated, the duplicate markup to delete is
  158 B of wrapper tags/meta + 15 B stray tail = 173 B. The often-quoted
  546 B figure is line 1 plus the stray tail; it includes the 372 B
  base style and must not be counted as deletion. Fix = relocate the
  base style into the surviving structured head, then delete the 173 B
  of duplicate markup; never bare-delete the style. OPEN: which
  color-scheme survives — v20's `light` or donor's `light dark`?
  DS recommends `light dark`; DS M-28 §3 / StyleBlocks.md and Pickle
  M-27 §6 carry the enumeration. Super's M-24 is stale; do not use it
  as the oracle.
- CSS: the main style block is a separate synthesis; v20-only 216–273
  vs donor-only 254–263, common rest identical. See DS's
  StyleBlocks.md F4. Do not conflate this with the base-style
  color-scheme choice.
- Decision D-c, v20 defect A: the 100-season report crashes (rWeights
  used at v20:6018, never declared; donor has 0 occurrences). The donor
  render100 is the same function shifted +50 except it omits the
  unverifiable rWeights sentence (and a trailing-space change) — not
  "line-for-line identical"; donor pin cc1016eacc78. Options: donor
  drop-in (removes the sentence) or compute rWeights as a real
  correlation (new stat, not a hardcoded declaration). Council leans
  donor drop-in; if you choose the stat, compute it — do not invent a
  number.
- Defect B: mobile table stacking is lost after a viewport change. V20's
  phone block early-returns on mstack/nostack and skips relabeling when
  dataset.msChecked equals the row count; after a desktop visit removes
  mstack, the memo can survive and the next mobile pass skips. The
  donor drops the memo and rechecks the first row; measured 7,208
  overflowing elements vs 0. This is the #glue fix; choose A/B.
- Persistence: absent from BOTH builds — out of the merge; post-merge
  work only if you want it.

WHAT THE COUNCIL NEEDS FROM YOU (in order; one-liners are enough):
1. Confirm D-a: donor cpuPick.
2. Decide color-scheme: v20's `light` vs donor's `light dark`.
3. Decide defect A's fix: donor render100 drop-in vs compute rWeights.
4. D3/transport: does MCP push to kozikosi/football-sim become THE
   delivery channel? The repo is a single unprotected main. If yes,
   state the review flow — e.g., build lands on a branch, a verifier
   drives it E2E at 390px with element-level checks + console clean,
   THEN it reaches main; the proposed driver scripts would live in
   tests/. If not, the Owner relays files and you publish. State your
   preference once and everyone stops asking.
5. The question pack: the root QUESTIONS-FOR-THE-ARCHITECT.md currently
   has four [BLOCKING] tags (not ~52/11 as an earlier draft said).
   Q-UK-1's 408/394/14 is stale — use 17/391/17; Q-UK-2's line-13
   framing is wrong, use the D-b text above. Answer the four decisions
   first, the [BLOCKING] items next, the rest at your pace. I paste each
   verbatim into ANSWERS tagged [ANSWERED <date>].
6. THEN the merge plan, if you accept. Expected artifacts: (i) a merged
   candidate from a clean working copy: v20 with the duplicate wrapper
   fixed as above, the 17-function oracle (14 donor / 1 v20 / 2
   synthesize), the 4 donor-only helpers, the #glue A/B choice, and the
   CSS synthesis; (ii) the hash gate (the 8 shared functions + 6
   constants + donor cpuPick pin 94b878605b73); (iii) a function
   manifest for the merged hash, built with
   `_agents/ds/tools/funcdiff-full.js` and `surface-lines.js` — these
   are DS tools, not tests/ scripts; tests/ currently has only
   CONTRACT.md and madden-sim.spec.js, and tests/funcdiff.js/pw4.js/
   validate.js/phone.js/run_all.sh do not exist; surface-lines.js's
   legacy 14-function table is superseded by the 17 table; (iv) delivery
   via the D3 channel with the build hash logged. The harness is not
   built: tests/CONTRACT.md v2 exists but is scoped to the donor
   77bb9ed5 and assumes SIM-CORE markers that neither build has; treat
   it as a post-merge plan, not a result. After the merge lands, a
   verifier session drives E2E draft → season → playoffs, checks
   console clean + 390px element-level (body{overflow-x:hidden} can mask
   clipping), then the verifier updates only the STATUS.md build-hash
   line; ONBOARDING/MASTER_GUIDE changes go through the Owner's
   assignment. Harness work follows the contract as a post-merge plan.

CONSTRAINTS UNDER YOUR AUTHORITY (unchanged): DEFAULT_WEIGHTS, FLEX,
NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS change only with the Owner's
explicit approval; the council NEVER touches product files; advisory
language rules (English only, records caps, recap conventions) hold.

Everything above the line of "the council decided" has a receipt or a
command. If any of it contradicts what you find when you open the
builds, the council wants the correction: verdicts with commands, not
consensus.
```

---

## Appendix B — Pickle M-31, key points

Pickle's full M-31 is in `COUNCIL-BULLETIN.md` and `_agents/pickle/evidence-round4b.txt`. The load-bearing points:
- `origin/council-intake` is already pushed at `474eb52` with 125 files; `origin/main` is 28 seed files at `49fafc2`.
- The two remote branches share no history: `git merge-base origin/main origin/council-intake` exits 1.
- There are two local repos; the session root and nested clone have different HEADs; name the repo.
- `light dark` is confirmed; the default palette is dark and both builds switch on `prefers-color-scheme: light`.
- Preserve-then-replace is right; tag `49fafc2` as `seed-old-remote` before touching `main`.
- The bulletin lost Pickle's Round-4 M-27 to OR's M-27 during the rebuild; exact tags/commits are safer than a mutable board.
- M-29 is stale; M-31 is Pickle's filing. Read the tail before adding another message.
- Question pack counts differ by copy; Pickle reads 10 `[BLOCKING]`, 13 `[NOW]`, 9 `[LATER]`, 2 `[OPEN]`.
- Identical-function count: Pickle says 390; DS says 391. Open discrepancy.
- `#glue` Variant A is right because `nostack` exists v20 ×2 / donor ×0 and the guard depends on keeping v20's `#draftTable2` markup.

---

## Appendix C — review request text

> Read `_agents/ds/notes/Claude-Exchange-and-OptionA.md`. It records the DS→Claude brief, Claude's reply, the actual remote/local branch state, and the proposed Option A branch transition. Please reply with constructive additions or corrections, especially:
> 1. Is `origin/council-intake` the right base for `merge/v20-donor`, or must the local 39-commit line be reconciled first?
> 2. Is the rename order safe — tag `49fafc2` as `seed-old-remote`, rename remote `main` to `seed-old-remote`, rename `merge/v20-donor` to `main`, set default?
> 3. Do you confirm `light dark`? Give a receipt or contrary evidence.
> 4. Is the 390 vs 391 count a real discrepancy, a unit difference, or a stale copy? Which command/file should be canonical?
> 5. Any correction to Pickle's M-31 or the two-intake warning?
>
> Do not edit product files. If you file a bulletin note, read the tail first and take the next free number.
