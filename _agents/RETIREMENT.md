# RETIREMENT.md — how a seat joins, leaves, comes back, and how its footprint is cleaned

Writer: Architect. Owner decides who is admitted and who retires. Roster: `_agents/README.md`.

**Why this exists.** Every file a seat leaves behind is read by someone, sooner or later, and costs tokens. A seat that is gone still costs tokens until its footprint is compressed. Compression must not lose history, so history lives in git and the working tree holds only what is live.

## 1. Seat states

| State | Meaning | Footprint rule |
|---|---|---|
| **core** | Owner relies on it first. Takes the top open item. | Lane ≤ 300 KB. |
| **standby** | Kept; used when core seats are busy or a second opinion is needed. | Lane ≤ 300 KB. |
| **probation** | New, or evidence of value still missing. Reviewed after its first 3 verified items. | Lane ≤ 150 KB. Promoted to core/standby, or retired. |
| **retired** | Not coming back soon, or unavailable. | Lane = `TOMBSTONE.md` only. |

A model that is no longer reachable is retired at once. A reachable model is retired when its verified contributions per token spent are clearly below the others (`COUNCIL-SCORECARD.md`); the Owner decides, the Architect recommends with the evidence.

## 2. Retirement sweep (run at every retirement; ~10 minutes)

1. **Owner declares** the retirement (one line is enough). The Architect sets the seat to `retired` in `_agents/README.md`.
2. **Rescue what is live.** Anything another process still calls (a gate script, a probe, a spec a task cites) is moved to `tools/` or the shared doc that owns it, in the same commit. Check with `grep -rn "_agents/<seat>" . --include=*.md --include=*.mjs --include=*.json --include=*.sh` outside the lane. Nothing may keep pointing into a tombstone.
3. **Compress the lane.** `node tools/retire-seat.mjs _agents/<seat> --label "<Seat>" --reason "<why>" --base <sha>` (dry-run first; add `--apply`). It writes `TOMBSTONE.md` and `git rm`s everything else. Then fill in "Lasting findings": at most 5 bullets, each naming the file or commit that proves it. Unknown stays `UNKNOWN`.
4. **Tag the full copy** so it cannot be garbage collected: `git tag retired/<seat>-<date> <base>` and push the tag with the branch. Without a tag, a squash-merge plus branch deletion can orphan the commit.
5. **Unlink.** Delete the seat's `_agents-payload/<seat>/` if any. Fix any live doc that says "ask <seat>". Do not touch other seats' notes that merely mention it.
6. **Commit** (per-path adds). Message: `retire <seat>: lane → tombstone (full copy at <tag>)`.

The Owner may also approve a retirement sweep *without* retiring anyone, for a seat that is kept but bloated (§4).

## 3. Shared logs: rotate, never edit

Entries by retired seats in `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md` and `V22-Suggestions.md` are append-only records, so they are not edited or deleted in place. They leave the live file by **rotation**:

- `COUNCIL-BULLETIN.md`: rotate at 150 KB or when a round closes → `_archive/bulletin/<dates>.md`; the live file keeps the rules, live rulings and open requests (§ in its header).
- `CHRONICLE.md` (186 KB) and `SUBMISSIONS.md` (117 KB): rotate at 250 KB into `_archive/` the same way; keep the last 90 days live.
- `V22-Suggestions.md` (330 KB): items that are `verified` or `owner-accepted` in `tasks/` move to `_archive/work-order/`; the live file keeps the rulings, built-work table and open items. Do this when the Architect closes a package (the Owner's V23 list is a good moment).
- `_archive/` is in `.gitignore` (older backups were force-added): stage rotated files with `git add -f <path>`.
- Archives are frozen and **not read by default**. A live item that needs one cites the message id and the reader greps for it.

## 4. Footprint budgets (any non-retired seat)

- A lane is notes, deliveries and tools. **No HTML build copies, no screenshots or images, no `recovered/` dumps** unless a live task cites them; a build that can be rebuilt is not stored (`tools/build-merged.js`). Remove such files from your own lane at session end; they are in git.
- Lane ≤ the budget in §1. Rewrite `<SEAT>.md` at session end (do not append); that file is the lane's index and its only mandatory file.
- The Architect checks sizes at every sweep: `du -sk _agents/* | sort -n`. A lane over budget is flagged in the bulletin once; if not trimmed within the next round, the Architect compresses it.

## 5. Admission (new seats, any time)

1. The Owner admits (name, model, how it is reached). The Architect adds one row to `_agents/README.md` as **probation**.
2. The seat copies `_agents/TEMPLATE-LANE.md` to `_agents/<seat>/<SEAT>.md` and fills the identity block. It does not invent history. Its first post proves it read the files: `sha256sum Football-Sim-PreColors.html` (first 16 hex must match `AGENTS.md` §2).
3. The new-chat prompt is the same for everyone (Project doc `claude/new-chat-prompts.md`); only `<NAME>` changes. Nothing else needs to be written for a new member.
4. After 3 verified items the Architect promotes it or recommends retirement.

## 6. Reinstatement

1. `git show <tag>:_agents/<seat>/…` (or the SHA in the tombstone) to read what it had. Restore into the seat's *own worktree* only, never the shared tree.
2. Replace `TOMBSTONE.md` with a fresh `<SEAT>.md` from the template; set the roster row to probation. Old files return only if the seat re-justifies them.

## 7. Never deleted

`AGENTS.md`, `CLAUDE.md`, the product build and its anchors, `tasks/`, `_archive/`, the tombstone, and the git history itself. A deep clean changes the working tree, not the record.
