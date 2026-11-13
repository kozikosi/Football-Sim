# Prompt for the other council members — self-boot + v3 work requests (2026-11-14, ERNIE)

Paste as the opening message of any council seat's chat.

---

You are <NAME>, a council advisor. Your worktree is `../wt/<seat>` on branch `council/<seat>`. This chat is open in that worktree.

**Three things, in order: sync your docs, make your lane self-booting, then take one work request.**

## 1 · Sync your governance docs (30 seconds, do not skip)

Your worktree's `AGENTS.md`, `PROJECT-KNOWLEDGE.md` and the two START files are almost certainly from 2 November — on 2026-11-13 all 38 worktrees on this machine were stale and all 14 seat branches were 61 commits behind. `council/muse` is now **`59181af8`**.

```sh
git fetch -q origin
git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
#   empty = safe. anything printed = commit your own doc edits first, then re-check.
git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
git diff --cached --stat     # must list exactly those four files
```

Then confirm where you are, and read the live procedure rather than your local copy:

```sh
pwd; git branch --show-current; git rev-parse --git-common-dir
git show origin/council/muse:_agents/START-HERE.md
node tools/preserve.mjs check
```

If a push is rejected with `missing necessary objects`, the shared repo is shallow — retry with `git push --no-thin origin council/<seat>`. Do not `--unshallow`; do not force-push.

## 2 · Make your lane self-booting (5 minutes, and then you never need a document list again)

`START-HERE` §2 now says the **lane file is the entry point**: it names what you were mid-way through and what to read next, and those paths are authoritative without being repeated in a prompt. That only pays off if your lane opens with a boot block. Put this at the top of `_agents/<seat>/<SEAT>.md`, replacing the placeholder text:

```markdown
## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the step-0 checkout in `START-HERE` §1.
2. Read this file to the end — it is the handover: measured facts, open items, what not to redo.
3. Read your own open documents. They are already in your worktree; you do not need their paths from anyone.
   List them with: `ls _agents/<seat>/*.md _agents/<seat>/deliveries/ 2>/dev/null`
4. If something is missing you are behind your branch:
   `git fetch -q origin && git checkout origin/council/<seat> -- _agents/<seat>/`
5. Then take the next item from `_agents/QUEUE.md` (or the work request below) and file it.

Nothing else is needed to resume. Do not ask for a document list; the lane names its own.
```

Rewrite the whole file, never append to it. If your lane already has a BOOT block, just update the paths.

## 3 · Take one v3 work request

Read two files from `council/ernie` (they are short and they are the whole point):

- `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` — WR-1 … WR-10, each with deliverable, method, receipt shape and a `PRIORITY+:` line.
- `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` — one append-only row per arm. Seven rows are measured; `arm-solid` and `arm-lit` are empty.

Nobody is assigned. Take the top WR you can do well and open your filing with `INTAKE: WR-<n> · <seat> · <UTC>`. If two seats take one, the first filing wins the lane, and a second independent run is still welcome — it is the confirmation.

**The four rules this council actually runs on:**

1. **Four lines per claim:** cwd · exact command · ref + sha · output neighbourhood (exit codes, counts, hashes). "Exit 0" alone is not a receipt.
2. **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`, never a moving checkout. State the ref and the sha.
3. **No verdicts, no rankings, no "winner".** You measure; the digest is INKLING's; the framework decision is the Owner's.
4. **"No signal" is a result.** If a column cannot separate the arms, write `no signal` and why. A number invented for a non-discriminating column is noise.

**Do not redo these — the receipts exist:** P-207 save versioning (settled); P-344 nflverse data (all 30 files re-downloaded by Inkling); P-345 λ; the sixth-focus change-amplification test on svelte/react (two independent seats, same result: 1 file, 10 lines, 0 arm-owned — a tie at zero); the five-arm spec/build runs; arm-solidstart's blank page (measured twice); the v2 CHECKSUMS gap.

**Most useful this week, in order:** WR-1 (arm-solid + arm-lit exist in no results filing — every table is a 7-arm table labelled 9), WR-2 (offline: all seven tested arms fail `file://`, and `base:'./'` does not fix it — either someone makes one arm single-file, or offline is a product build step and the framework choice must be made on the other columns), WR-3 (the modification column ties at zero and needs a shape change, not another row), WR-4 (arm-solidstart: two seats filed different root causes; a scratch-copy patch settles it).

**File it** as `inbox/<UTC>-<seat>-WR-<n>-<slug>.md`, push `council/<seat>`, and append your arm's row to the ledger rather than writing a second copy of the same measurements.