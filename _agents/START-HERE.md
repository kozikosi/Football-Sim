# START HERE — every council seat, every chat
(Read this from `origin/council/muse` — it is always the current version. Your prompt points here, so you do not need a longer prompt.)

**THE RULE: nobody is assigned to anything.** Work comes from one ranked list; you take the top item you can do; later seats review it. Never wait for a particular seat, and never tell another seat what to do.

**Who owns what (Owner, 2026-11-09).** The Owner (Kosi) decides product direction. The Architect (Claude) owns the product/engine only. **MUSE owns all council infrastructure** — this file, `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `tools/council.mjs`, and the queue (`_agents/QUEUE.md`, which MUSE custodians). The Owner does not read or sweep the queue manually; queue hygiene is the custodian's standing job. If a doc or the tool contradicts the live project, the live project (below) wins and you tell MUSE in your bulletin entry.

## 1. Orient
`pwd; git branch --show-current; git rev-parse --git-common-dir`
You must be in `.../wt/<your-name>` on branch `council/<your-name>`. If not, stop and tell the Owner.
`git fetch -q origin`
**Step 0 — refresh the governance docs FIRST. They are stale in your worktree.** Your branch was started from `council/base`, so the `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `START-HERE.md` and `START-OF-CHAT.md` you can see are old copies (measured 2026-11-13: all 38 worktrees stale; all 14 seat branches 61 commits behind `council/muse`). Run this BEFORE reading any of them:

    git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md   # must print nothing; if it prints, commit your edits first, then re-check
    git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md
    git diff --cached --stat    # must list only those four files

Until this has run, treat every governance doc in your worktree as REPORTED, not as the rules. (Do NOT run `sync-base.sh` — `council/base` is a stale snapshot from 2026-11-02, not the live state. The live queue and docs are on `origin/council/muse`.) Then `node tools/preserve.mjs check` (reports unsaved work anywhere; does not touch it).

## 2. Read — only what you need
- **If a task is given in your prompt:** read ONLY the files that task names. Do NOT read AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, or your lane file first. Go straight to the task.
- **If NO task is given:** read AGENTS.md, then PROJECT-KNOWLEDGE.md (the live project — current build, engine pin, current wave, cutover status), then **your lane file `_agents/<your-name>/<NAME>.md`. The lane file is the entry point: it says what you were mid-way through and what to read next.** If it names handover documents, work requests or a ledger, those paths are authoritative — read them without waiting to be told them in a prompt. Then go to §3 to find work.

## 3. Find work — only if no task is given
Get the tool into your WORKTREE (not /tmp): `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`
(The tool is v9, owned by MUSE. It produces output from any path — the old /tmp silent failure is fixed — but run it from your worktree anyway.)
`node ./.council_tool.mjs next` — it prints your next actions, by tier. Take the first line you can do well. Delete `.council_tool.mjs` before you push.
Note: the tool reads QUEUE.md from `origin/council/muse` (the live queue). Items on `council/base` are stale — ignore them.

## 4. Work
You advise: propose, test, review, dissent in writing, measure. You never edit the product file, AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants, and you never assign work to a named seat. (MUSE, as infrastructure owner, edits the governance files and the queue; that is not your job.) Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN; "done" needs a command and its output.
- WORK: write `inbox/<UTC yyyymmdd-hhmm>-<name>-<ID>-<slug>.md` per `inbox/README.md` (exact snippet, anchor string, how to check, evidence label).
- REVIEW: read the author's file, check every claim against the repo with commands, then write `inbox/<UTC>-<name>-<ID>-review.md` (`REVIEW-OF:`, `VERDICT: ok|improved|rejected`, what you ran). You may not review your own work or the same item twice. Three ok/improved from three seats = REVIEWED. A file that only confirms a claim (`CONFIRM:`) is a note, not work — it does not make you an author.
- Save as you go: `git add -- <your paths>`, commit, `git push origin council/<name>` after every finished file. Your own `council/<name>` is the only branch you push. Never force-push, never `git stash` (WIP commit instead).
- Nothing is "delivered" until a pushed commit (give the hash) or a download link exists — never give the Owner a sandbox path.
- Terminal states (BUILT/SUPERSEDED) are moved by the Owner, the Architect, or MUSE (custodian, standing permission). Seats propose them with evidence; they do not move items themselves.

## 5. Stop
Run `_agents/END-OF-CHAT.md` (read it via `git show origin/council/muse:_agents/END-OF-CHAT.md`) when any is true: ~80–100k tokens used · you switch task area · you re-read a file you already read · your replies get shorter or drop detail · one tool result exceeds ~50k tokens. Say: "Token budget is low — start a new conversation. Lane file updated and pushed; read it first."
