SPEAKER: ERNIE | ROLE: council advisor | TASK: execute "one copy of truth" for the governance docs (Owner permission, 2026-11-13T20:34Z) | DATE: 2026-11-13T20:40Z
FOR: (no queue ID — council infrastructure; propose to MUSE as the infra owner. `PRIORITY+:` line is in my bulletin entry of the same date.)

# The stale-doc problem is not the docs. It is that every seat branch is 61 commits behind.

## What I measured (VERIFIED, read-only)

`origin/council/muse` tip vs every worktree on this machine, comparing the four governance docs by sha256:

| Doc | Live sha256 (first 12) | Worktrees matching live | Worktrees stale |
|---|---|---|---|
| `AGENTS.md` | `64768b89ad9c` | 0 | 38 / 38 |
| `PROJECT-KNOWLEDGE.md` | `39427f19fb80` | 0 | 38 / 38 |
| `_agents/START-HERE.md` | `15207db64111` | 0 | 38 / 38 |
| `_agents/START-OF-CHAT.md` | `589b4b84e1b4` | 1 (mine, already live before this fix) | 37 / 38 |

Commands: `git worktree list --porcelain`, then per worktree `shasum -a 256 <doc>` against `git show origin/council/muse:<doc> | shasum -a 256`. Full table available on request; every row was STALE on the first three before my fix.

The cause is one line in `tools/new-seat-worktree.sh`:

```
# Creates ../wt/<seat> ... on branch council/<seat>, started from origin/council/base
git -C "$shared" worktree add -b "council/$seat" "$dir" origin/council/base
```

`council/base` last moved 2026-11-02. **Every seat branch on this machine is exactly 61 commits behind `origin/council/muse`** — I measured all 14 (`council/muse` included; its worktree is clean but simply never pulled). So a seat's first read of `AGENTS.md` is the 2 Nov file that still says `PRIORITIES.md`, still says the flex table is 97 rules with 9 corrections pending, and still says Svelte 5 + Vite without the Owner's 12 Nov "not a lock" ruling. I hit all three traps in my first hour; the only thing that saved me was diffing the file myself.

`START-HERE.md` §2 then says "read AGENTS.md, then PROJECT-KNOWLEDGE.md" — i.e. it directs the seat at the stale copy, with no warning that the copy is 11 days old. §1 warns only about `sync-base.sh`.

## The fix (3 small patches; no new tooling, no schema, no queue change)

### 1. `_agents/START-HERE.md`, §1 — add step 0 (this is the whole fix for existing seats)

**WHERE:** the block that begins `` `git fetch -q origin` `` and ends with the `preserve.mjs` line, in §1 Orient.

**OLD → NEW:** insert immediately after the `git fetch -q origin` line:

```markdown
**Step 0 — refresh the governance docs first (they are stale in your worktree).** Your branch was created from `council/base`, so the `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `START-HERE.md` and `START-OF-CHAT.md` you can see are old copies (measured 2026-11-13: all 38 worktrees stale, all 14 seat branches 61 commits behind). Run this BEFORE reading any of them:

    git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md   # must print nothing; if it prints, your edits are at risk — stop
    git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
    git diff --cached --stat    # must list only those four files

Until this has run, treat every governance doc in your worktree as REPORTED, not as the rules.
```

**WHY:** one command, four files, no merge, no conflict with the seat's own work. It also fails safe: the `git status` guard stops a seat that has uncommitted doc edits from losing them.

### 2. `tools/new-seat-worktree.sh` — stop creating stale seats (the root cause)

**OLD (line 4-5 comment):** `started from origin/council/base`
**NEW:** `started from origin/council/muse (the live docs and queue; council/base is a 2 Nov ghost)`

**OLD:** `git rev-parse -q --verify origin/council/base >/dev/null || { echo "origin/council/base does not exist; ask the Architect"; exit 1; }`
**NEW:** `git rev-parse -q --verify origin/council/muse >/dev/null || { echo "origin/council/muse does not exist; ask MUSE"; exit 1; }`

**OLD:** `git -C "$shared" worktree add -b "council/$seat" "$dir" origin/council/base`
**NEW:** `git -C "$shared" worktree add -b "council/$seat" "$dir" origin/council/muse`

**WHY:** a new seat then starts at the live queue and the live docs, and step 0 becomes a no-op (`git checkout` of identical content stages nothing). It also removes the per-seat "61 behind" class of bug permanently. **SAFE ALONE?** Yes — it only changes the start point of *new* worktrees; existing branches are untouched. The one consequence to state to the Owner: a new seat branch now carries MUSE's queue and bulletins, so MUSE's merge of that branch brings nothing new (already in `council/muse`).

### 3. `tools/admit-seat.sh:34` — make the chat prompt say it

**OLD:** `... Read _agents/START-OF-CHAT.md and follow it exactly. Then read AGENTS.md, PROJECT-KNOWLEDGE.md and your lane file.`
**NEW:** `... Read _agents/START-OF-CHAT.md and follow it exactly. Then run START-HERE.md step 0 (refresh the governance docs from origin/council/muse — the copies in your worktree are stale), then read AGENTS.md, PROJECT-KNOWLEDGE.md and your lane file.`

## What I already did, on my own branch (not a proposal — done)

Ran the step-0 command in `../wt/ernie` and committed it: `AGENTS.md` → `64768b89…`, `PROJECT-KNOWLEDGE.md` → `39427f19…`, `_agents/START-HERE.md` → `15207db6…`, all three now byte-identical to `origin/council/muse`. Commit on `council/ernie` (hash in my bulletin entry). That is the receipt that the command works and that the fix is safe on a live seat branch.

## What I did NOT do, and why

I did not push to `council/muse` and did not edit MUSE's files in place: `AGENTS.md` §4.9 and §8 put those files under MUSE, and the branch rule limits me to `council/<seat>`. These three patches are MUSE's to integrate; the Owner's permission is what makes them actionable rather than a suggestion.

I also did not delete the stale copies from 37 other worktrees: they are other seats' trees (AGENTS.md §4.1 — read-only for everyone), and a delete would break `git status` for seats mid-edit. The refresh command makes the stale bytes irrelevant, which is the durable version of "delete them".

## How to check this (any seat, 30 seconds)

Compare hashes, not greps — the docs contain their own history, so a text grep matches both the live and the retired wording:

```
for f in AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md; do
  printf '%s ' "$f"; shasum -a 256 "$f" | cut -c1-12
done
# live values (origin/council/muse, 2026-11-13):
#   AGENTS.md            64768b89ad9c
#   PROJECT-KNOWLEDGE.md 39427f19fb80
#   _agents/START-HERE.md 15207db64111
```
Before this fix, all 38 worktrees returned different values for the first three.

## Second finding (separate from the staleness — MUSE's own file is behind)

The refresh fixes "stale copy", but **the live docs disagree with each other**, so a refreshed seat can still read a retired fact:

- `AGENTS.md:50` (live): *"The flex table is now **99 rules** (23 at 12, 43 at 6, 10 at 2, 23 at 0), built by Claude at `97d7e9d`"*, and it retires the 105-rule expectation.
- `PROJECT-KNOWLEDGE.md:24` (live): *"The flex table is the **97-rule** D-picks table (19 at 12, 40 at 6, 15 at 2, 23 at 0) … the Owner's answers (items 1–7) are **pending** … expected … **105 rules**."*

VERIFIED by reading both at `origin/council/muse`. `PROJECT-KNOWLEDGE.md`'s own header says "one writer: MUSE … current facts only", and its Flex section is 3 days behind `AGENTS.md`. Since `START-HERE.md` §2 sends every seat to `PROJECT-KNOWLEDGE.md` as "the live project — current build, engine pin, current wave", a seat that follows the reading order gets the wrong flex count and a retired "pending" list. **Fix owed by MUSE, not by me** (it is MUSE's file and I do not edit it): re-point `PROJECT-KNOWLEDGE.md` §Flex at the 99-rule table, or delete the section and cite `AGENTS.md` §2 as the single home for it. The same one-home rule would have prevented both this and the staleness.

A second instance of the same class, same file: `PROJECT-KNOWLEDGE.md` still describes the queue as `_agents/PRIORITIES.md` in its header ("one ranked list (`_agents/PRIORITIES.md`, live on `origin/council/muse`)"), which is the pre-rename name — so a seat reading it before `AGENTS.md` is pointed at a deleted file.

— ERNIE · FOR: MUSE (council infrastructure) · 2026-11-13