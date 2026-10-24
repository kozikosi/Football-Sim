# ONBOARDING.md — Council Seat Onboarding

*For new advisory members joining the "20-0" / Football Sim council. Follow in order. If anything conflicts with AGENTS.md, AGENTS.md wins.*

## PRE-FLIGHT — Step 0
Before reading anything, reply with the following (one line each):

- Can you read and write files in a git repo?
- Run shell commands and node?
- Run git?
- Open a browser or Playwright?
- Use Figma?
- How many tokens of context do you have?

If you cannot touch files, say so. You will work as a **chat-only seat** (your output is REPORTED design input and the Owner will save it for you).

## STEP 1 — Read (Do not start work until complete)
Read in this order:

1. `AGENTS.md` (rules, build truth, who owns what, protected constants)
2. `PROJECT-KNOWLEDGE.md` (current state)
3. The last ~120 lines of `COUNCIL-BULLETIN.md` (`tail -n 120`; old rounds are archived, do not read them)
4. `_agents/README.md` (roster; you will be listed as probation)
5. Your lane file. **Do not assume a single path or case.** Search for it first: `find _agents -iname "<YOUR_SEAT_NAME>.md" | head -1` (this will match files at varying depths, e.g. `UK.md`, `BEAM.md`, or `vl.md` in subdirectories). If none is found, search more broadly: `find _agents -iname "*.md" | grep -i "/<your_seat_name>/" | head -1`. If one exists, read it. If none exists, check for `_agents/TEMPLATE-LANE.md`. If it exists, copy it to `_agents/<name>/<NAME>.md` (identity block only, no invented history). If it does *not* exist, create `_agents/<name>/<NAME>.md` from scratch in the shared tree using your identity from git log and the bulletin (no invented history). Say so in your first bulletin post.

## STEP 2 — Arrive
1. Run `pwd` and `git -C "/Users/kosi/Desktop/Football Sim" worktree list` to understand your starting context.
2. Post **ONE** bulletin entry in `COUNCIL-BULLETIN.md` (concise but complete). The bulletin format is defined in the COUNCIL-BULLETIN.md header (house rules 1–10) and AGENTS.md §"Ownership & Write Protocol". It must contain:
   - Your Step 0 answers
   - Proof you read the files: `sha256sum _agents/pickle/builds/Football-Sim-PreColors.html` and the first 16 hex characters (run from the shared tree). They must match the anchor build stated in `AGENTS.md` (Build truth). If they do not, say so and stop.
3. Confirm in your first post that `_agents/README.md` does not list you as retired (or note if it does not mention you at all).

## STEP 3 — Work Safely
- **Worktree first:** Get a canonical base SHA from the Owner/Architect **before creating a worktree** and create or reuse a worktree at `../wt/<name>` outside of the repo and never nested. Do **not** work in the shared tree at `/Users/kosi/Desktop/Football Sim` for new work.
- **Shared tree exceptions:** Lane files (`_agents/<name>/<NAME>.md`), `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, and `PROJECT-KNOWLEDGE.md` (by explicit Owner assignment per AGENTS.md R4) are the *only* items edited in the shared tree via per-path `git add`. No other seat may append to `PROJECT-KNOWLEDGE.md` without explicit Owner assignment.
- **Git hygiene:** Never `checkout`/`switch`/`stash`/`pop`/`apply`/`clean`/`reset`/`restore` in the shared tree. Per-path `git add -- <path>` only, never `git add -A`. Do not push to `main`. Pushing local-only commits to a new side branch is only allowed if explicitly directed by the Owner or Architect.
- **Labeling:** Label every claim `VERIFIED` (command + output shown), `REPORTED`, `INFERRED`, or `UNKNOWN`. "Done" needs a command and its output.
- **Scope:** You are an advisory seat. Propose, test, dissent in writing, and measure. Do **not** edit the product file, `AGENTS.md`, `STATUS.md`, or protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`). Do **not** assign tasks to named seats.
- **Lane hygiene:** No build copies or images in your lane. Delete files in your lane you no longer need. If `RETIREMENT.md` exists, follow §4 for removals.

## STEP 4 — First Task
Take the highest-priority unclaimed item in the bulletin or `tasks/` that checks someone else's work (if `tools/check-tasks.mjs` exists use it — note: it is only available on the `claude/v21-and-council-ops` branch, not on `main`; otherwise re-measure a claim against `_agents/pickle/builds/Football-Sim-PreColors.html`). Post one line saying you took it.

Your first three verified items decide promotion to standby/core or retirement. The Owner decides, the Architect recommends with your receipts.

If anything here conflicts with `AGENTS.md`, `AGENTS.md` wins — tell the Architect in the bulletin.