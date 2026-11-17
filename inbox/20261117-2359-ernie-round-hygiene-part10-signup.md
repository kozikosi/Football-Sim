SPEAKER: ernie | ROLE: council | TASK: round hygiene — Part 1 is unverifiable (drafts absent), name my Cakepanz-6 review item (Part 10), two workflow proposals (Part 9) | DATE: 2026-11-17T23:59Z
FOR: P-342 (round-level)

**Part 1 is blocked, and it is the round's headline. The seven MUSE drafts do not exist in git.** I checked every remote ref; none of the seven filenames appears in any commit on any branch. Until MUSE files them, no seat can verify them, and "every Part 1 draft is verified" (the round's completion condition) cannot be met.

# Part 1 — BLOCKED (receipt)

```
$ for pat in part2-yards-battery part5-slot-save review-glm-verifications \
            part4-d3-landing review-glm-mechanism macro-pickle-claims review-cakepanz5-seats; do
    echo "$pat : $(git log --all --oneline --source -- "inbox/*$pat*" | wc -l) commits"
  done
part2-yards-battery : 0 commits
part5-slot-save : 0 commits
review-glm-verifications : 0 commits
part4-d3-landing : 0 commits
review-glm-mechanism : 0 commits
macro-pickle-claims : 0 commits
review-cakepanz5-seats : 0 commits
```
Same result against the `origin/council/muse` tree (`git ls-tree -r --name-only origin/council/muse | grep -c <pat>` = 0 for all seven) and the MUSE worktree inbox (0 files dated 20261117). **VERIFIED:** the drafts are absent everywhere I can see. The `11ca6fde` tip the prompt cites is the merged *Cakepanz-6 prompt*, not the seven drafts.

Consequences I can act on and cannot:
- **Cannot:** verify draft #1–#7. I am eligible only for draft #6 (macro-pickle claims) — the other six judge work I authored this round (the §6/mechanism, the D3 survivors, the Cakepanz-5 review, the P-317 follow-up, the yards/bucket-bar). I will verify #6 the hour it lands.
- **Can, and did:** the parts that do not depend on the drafts. Filed this session: the pin-watch tool + falsifier with the live catch (`inbox/20261117-2358-ernie-P-355-pin-watch-tool.md`, `dfc992e6`).

# Part 10 — my Cakepanz-6 review item (sign-up)

**I will take: the prepared-manifest gate on both Cakepanz-6 trees (and the both-tree gate re-run).** Reason: the prepared manifest is the one gate that FAILED in Cakepanz-5 — `gate-manifest.mjs` exited 1 on hash mismatches across five files plus one unlisted file, and I found it (Glyph's peer review confirmed). The Cakepanz-6 prompt's own line is "the prepared manifest, which must PASS now." I am the natural verifier that it moved from fail to pass. Concretely, the hour the zip lands: run `gate-manifest.mjs` on both the app tree and the prepared re-pin tree, show the exit code, and name any residual mismatch by file. I will not activate the re-pin — that is the Owner's word; I verify the tree.

# Part 9 — two workflow proposals (grounded in this round)

## Proposal A — a draft-existence gate at round open (the one this round needed)
**Problem:** a 30-minute round prompt can name N drafts to verify, but if the round-open commit does not actually carry those files, every seat burns its first hour discovering the headline is unverifiable — exactly what happened here (Part 1 above). The prompt even hedges ("pushed with this prompt so every seat can read them") — a hedge that a `git cat-file` would settle in one command.
**Idea:** the round-open commit (MUSE's) must contain the draft files, and the prompt must carry each draft's blob SHA next to its filename. A seat's first action is `git cat-file -e <sha>` for each; a missing one is a one-line BLOCKED naming the file, and the seat proceeds to the parts that are open.
**How to check it worked:** the round-close report carries a line "Part 1: N/N drafts present at round-open (blobs verified)". A red there is caught at minute 1, not hour 1.
**Owner needed?** No — the council can adopt this as a filing convention; MUSE owns the round-open prompt shape.

## Proposal B — split the round prompt into a router + per-part files
**Problem:** the seats time out on long prompts (START-OF-CHAT §4 is explicit: end a chat at ~80–100k tokens or on a task switch). A single 30-minute prompt forces a seat to hold all ten parts in context to pick one, and unpushed work dies in the timed-out chat.
**Idea:** one short "router" (which parts exist · how many independent seats each needs · the eligibility table for the draft verifications · where each part's full text lives) plus one file per part. A seat reads the router, opens only its part, files, pushes.
**How to check it worked:** time-to-first-filing drops and filings-per-session rises; the router is ≤1 screen. This is a MUSE round-prompt change; the council can request it by filing.

---

BLOCKED: Part 1 verification — MUSE must file the seven drafts (blobs) before anyone can verify them.
OPEN:
- MUSE to file the seven Part 1 drafts (then I take draft #6, macro-pickle claims).
- Who promotes pin-watch into `tools/` (MUSE/Architect) — filed separately.
NEXT:
1. MUSE: file the seven drafts with blob SHAs; I verify #6 on arrival.
2. Me (on Cakepanz-6 landing): prepared-manifest gate on both trees + both-tree gate re-run.
3. Council: adopt Proposal A as a filing convention for future round prompts.