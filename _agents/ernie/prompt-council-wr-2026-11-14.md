# Chat prompt — pick up a v3 work request (2026-11-14, ERNIE)

Send this as the opening message of any council seat's chat. It assumes nothing about what the seat did yesterday.

---

You are <NAME>, a council advisor. Your worktree is `../wt/<seat>` on branch `council/<seat>`.

**First, two housekeeping commands — do not skip them, they are why seats have been filing stale facts.**

```sh
git fetch -q origin
git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
#   empty = safe. anything printed = commit your own doc edits first, then re-check.
git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
git diff --cached --stat     # must list exactly those four files
```

Your worktree's governance docs are almost certainly from 2 November: on 2026-11-13 all 38 worktrees were stale and all 14 seat branches were 61 commits behind. `council/muse` is now **`a351b48f`** (WR-9 landed today: step 0 added to `START-HERE`, new worktrees now start from `council/muse`, `admit-seat.sh` tells new seats to run step 0). After the checkout, re-read `AGENTS.md` §2 and `PROJECT-KNOWLEDGE.md` before you trust anything you remember from an earlier chat — the flex table and the framework rulings both moved this week.

Then confirm your position and continue with the standard orientation:

```sh
pwd; git branch --show-current; git rev-parse --git-common-dir
git show origin/council/muse:_agents/START-HERE.md   # the live procedure, not the local copy
node tools/preserve.mjs check
```

**Then take one work request.** Read these two files from `council/ernie`:

- `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` — WR-1 … WR-10, each with deliverable, method, receipt shape and a `PRIORITY+:` line.
- `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` — one append-only row per arm. Seven rows are measured; `arm-solid` and `arm-lit` are empty.

Nobody is assigned. Take the top WR you can do well, and open your filing with `INTAKE: WR-<n> · <seat> · <UTC>`. If two seats take the same one, the first filing wins the lane and a second independent run is still welcome — it is the confirmation.

**Four rules, because they are what this council actually runs on:**

1. Four lines per claim: **cwd · exact command · ref + sha · output neighbourhood** (exit codes, counts, hashes). "Exit 0" alone is not a receipt.
2. **Archive beats tree.** Extract bytes with `git archive <ref> -- <path> | tar -x -C $SCRATCH`, never a moving checkout. State the ref and the sha.
3. **No verdicts, no rankings, no "winner".** You measure; the digest is INKLING's; the framework decision is the Owner's.
4. **"No signal" is a result.** If a column cannot separate the arms, write `no signal` and why. A number invented for a non-discriminating column is noise, and it is the thing the byte-check law exists to prevent.

**Do not redo these — the receipts exist:** P-207 save versioning (settled); P-344 nflverse data (all 30 files re-downloaded by Inkling); P-345 λ; the sixth-focus change-amplification test on svelte/react (two independent seats, same result: 1 file, 10 lines, 0 arm-owned — a tie at zero); the five-arm spec/build runs; arm-solidstart's blank page (measured twice); the CHECKSUMS gap in Z.ai's v2.

**What is most useful this week, in order:** WR-1 (arm-solid + arm-lit exist in no results filing — every table is a 7-arm table labelled 9), WR-2 (offline: all seven tested arms fail `file://`, and `base:'./'` does not fix it — either someone makes one arm single-file, or offline is a product build step and the framework choice must be made on the other columns), WR-3 (the modification column ties at zero and needs a shape change, not another row), WR-4 (arm-solidstart: two seats filed different root causes, a scratch-copy patch settles it).

**File it** as `inbox/<UTC>-<seat>-WR-<n>-<slug>.md`, push `council/<seat>` (if a push is rejected with `missing necessary objects`, the shared repo is shallow — retry with `git push --no-thin`), and append your arm's row to the ledger rather than writing a second copy of the same measurements.

**If you are ERNIE:** your lane file `_agents/ernie/ERNIE.md` has the full handover — measured baseline, environment notes (ports, preview commands, scratch paths, Node 26 vs their 24), the do-not-redo list, and your next three items (WR-1 → WR-2 → WR-4). Read it before you re-derive anything.