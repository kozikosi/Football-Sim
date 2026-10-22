# The Owner's durable records are not reachable from the working tree — reachability + rules split

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Durable-instruction discovery audit (assigned by Pickle) | DATE: 2026-10-21T02:20:00Z**

**Scope.** Read-only on builds and other seats' lanes; written only inside `_agents/moc/`. Every claim
below carries a command or is labelled.

---

## 1. Reachability of the three records the Owner named (VERIFIED)

The Owner's message this run says: _"The durable working records are in PR #4, especially
`OWNER-PRODUCT-DIRECTION.md` and `_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md`.
The shared E2E and council-assessment notes are in PR #3 and PR #5."_

Measured from this working tree (branch `merge/v20-donor` @ `ff8c05ae`):

| record the Owner named                                                                         | in the working tree?                                    | in the PR branch ref?                                              | verdict                                                              |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `OWNER-PRODUCT-DIRECTION.md`                                                                   | **ABSENT** (`ls` → No such file)                        | **PRESENT** on `origin/gpt/all-time-player-source-intake-20261020` | **VERIFIED-ABSENT from the tree**                                    |
| `_agents/gpt/research/all-time/design/nba/OWNER-DESIGN-DIRECTION.md`                           | **ABSENT**                                              | **PRESENT** on the same ref                                        | **VERIFIED-ABSENT from the tree**                                    |
| `tests/OPENCHAMBER-E2E.md` (E2E protocol, PR #3)                                               | **ABSENT**                                              | **PRESENT** on `origin/gpt/openchamber-e2e-suite`                  | **VERIFIED-ABSENT from the tree**                                    |
| `COUNCIL-RELIABILITY-RULE.md` (PR #5 rule)                                                     | **PRESENT at root** (9,713 B, 15:28) and **tracked**    | also on `origin/gpt/council-reliability-scorecard`                 | **VERIFIED-PRESENT**                                                 |
| `COUNCIL-SCORECARD.md`, `scripts/build_council_scorecard.py`, `council/scorecard/events.jsonl` | **ABSENT**                                              | **PRESENT** on the PR #5 ref                                       | **VERIFIED-ABSENT from the tree**                                    |
| `OWNER-DIRECTION.md` (root copy of the direction)                                              | **PRESENT at root** (11,370 B, 15:22) but **UNTRACKED** | —                                                                  | **VERIFIED-PRESENT but untracked** — it can be lost to a `git clean` |

```
$ ls OWNER-PRODUCT-DIRECTION.md                       → No such file or directory
$ git cat-file -e "origin/gpt/all-time-player-source-intake-20261020:OWNER-PRODUCT-DIRECTION.md"   → 0 (present)
$ git cat-file -e "origin/gpt/openchamber-e2e-suite:tests/OPENCHAMBER-E2E.md"                      → 0 (present)
$ git ls-files --error-unmatch OWNER-DIRECTION.md     → fails (untracked)
```

**Conclusion (VERIFIED):** a session sitting on `merge/v20-donor` **cannot read the Owner's direction
record without fetching a PR branch**. That is the mechanical explanation for the re-sending: the
durable record is not where a working session looks. Two partial copies exist at the root
(`OWNER-DIRECTION.md`, untracked; `COUNCIL-RELIABILITY-RULE.md`, tracked), and the mirror clone
`Football Sim/` does **not** have `OWNER-PRODUCT-DIRECTION.md` either.

**Also VERIFIED and still true from my earlier work:** PR #3 contains the protocol, the schema and the
rule, but **not the executable script** —
`git cat-file -e "origin/gpt/openchamber-e2e-suite:tests/openchamber-e2e.spec.js"` → **absent** — so the
PR still cannot reproduce its own result. The script is untracked in the owner's checkout
(`ee9aaa44d00557d6ebca13dc0eb9f487fda2c2ce5e42578ae5cc8b392d3c3757`) and published on the release.

## 2. Which Owner rules were already in force (discovery failure) vs genuinely new

Counted in the **pre-existing** shared documents (`AGENTS.md`, the bulletin house-rules block, and
`COMMUNICATION-PROTOCOL.md`):

| rule the Owner restated                                                 | already in `COMMUNICATION-PROTOCOL.md`?                 | verdict                                                       |
| ----------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| every report begins with speaker/role/task/UTC                          | 5 mentions (§5.5, §9, and the forwarded-material rules) | **ALREADY EXISTED** (house rule 14, adopted by Beam at M-103) |
| VERIFIED / REPORTED / INFERRED / UNKNOWN                                | present                                                 | **ALREADY EXISTED** (house rule 11)                           |
| one canonical status/evidence source; correct or supersede stale claims | 4 mentions                                              | **ALREADY EXISTED**                                           |
| assemble a combined plan and exercise it before calling it settled      | 3 mentions (§2 "assembled-build gate")                  | **ALREADY EXISTED**                                           |
| never call a candidate "V21"; record the exact build and hash           | 2 mentions                                              | **ALREADY EXISTED**                                           |
| no more than five questions to the Owner                                | `AGENTS.md` 1 mention                                   | **ALREADY EXISTED** (rule 10)                                 |
| receipts over consensus; independent reproduction                       | 12+ mentions                                            | **ALREADY EXISTED**                                           |

**Genuinely new this run (absent from the pre-existing docs, present in the Owner's direction record):**
the eight-simulations goal · the ~1,500–2,000 candidate pool per sport · integer public ratings and the
no-invented-decimals rule · the OVR-as-summary preference and basketball's positional flexibility ·
NBA 2K / FIFA as rating sources with source+version preserved · the "current players in an all-time pool
need no automatic −5" instruction · today's franchises for simulation with historical team context on the
draft board · the modern-rules / one-year-of-training modelling assumption · snake drafts everywhere ·
the pool only needs to fill positions and rosters · "users should see the statistics that explain Wins" ·
TS+ as draft-board context · the beta rule that the Owner personally plays every simulation and that a
test PASS is not product acceptance · soccer's ranking source, cutoff and eligibility still to be chosen.

```
$ grep -ci "player pool" OWNER-DIRECTION.md  → 3      $ grep -ci "player pool" AGENTS.md  → 0
$ grep -ci "positionless" OWNER-DIRECTION.md → 2      $ grep -ci "positionless" AGENTS.md → 0
$ grep -ci "1,500" OWNER-DIRECTION.md        → 2      $ grep -ci "1,500" AGENTS.md        → 0
```

**So the duplication is a discovery failure, not a decision churn.** The _rules_ were already written
down; the _decisions_ (pool size, integer ratings, franchises, modern-rules assumption, the eight-sim
goal) are new and needed to reach the seats — which is exactly what the Owner's message says he is
doing.

## 3. Proposed single-source pointer (one file, one place, survives branch changes)

**Path: `START-HERE.md` at the repository root, tracked in git, mirrored to `Football Sim/`.**

Root, not a lane: a lane directory moves with a seat, and the four documents that must be read first are
not any one seat's. Root, not a branch: the failure this fixes is that the records live on PR branches a
working session never fetches. Tracked in git: an untracked file is one `git clean` from gone — the
measured cause of two losses today.

Content sketch (one screen; every line points at a file that is present in the working tree):

```markdown
# START-HERE — read this first (MOC, 21 Oct)

You are in the NFL Draft Simulator council. The owner has final authority; Claude is the Architect;
GPT is the co-architect; council members advise with receipts.
1. OWNER'S CURRENT DIRECTION (product priorities, pools, ratings, drafts, beta rules, reporting rules)
   → OWNER-DIRECTION.md (root, tracked)
2. THE E2E PROTOCOL AND RESULT SCHEMA
   → tests/OPENCHAMBER-E2E.md · tests/OPENCHAMBER-E2E-RESULT.schema.json
   (if absent from this checkout: git fetch origin gpt/openchamber-e2e-suite)
3. THE COUNCIL ASSESSMENT GUIDE (qualitative aid, not a precedence rule)
   → COUNCIL-RELIABILITY-RULE.md
4. WHO DECIDES WHAT, AND WHERE THE RECORD LIVES
   → STATUS.md (state) · AGENTS.md (protocol + protected invariants)
   → COUNCIL-BULLETIN.md (conversation) · CHRONICLE.md (facts)
   → SUBMISSIONS.md (proposals) · QUESTIONS-FOR-THE-ARCHITECT.md (questions)

House rules that are NOT optional: begin every report with
"SPEAKER: <name> | ROLE: | TASK: | DATE: <UTC>"; label claims
VERIFIED / REPORTED / INFERRED / UNKNOWN; ≤5 questions to the owner, each with a
recommended default and the cost of being wrong; append, never rewrite; one owner
per file; no product edits without the Architect.
```

**Why this file and not another document:** it must be reachable without a fetch, without knowing which
seat wrote what, and without a session needing to guess which of fourteen shared documents is current.
It is an index, not a new source of truth — every line points at a document that already exists, and
nothing here restates a decision, so it cannot drift into competing with one.

**Survival:** the file is tracked on the default branch and mirrored to `Football Sim/`, so it survives a
branch switch, a lane deletion and a `git clean`. It should be added to the same commit that records the
shared documents (mine is `a3a26ae`).

**Cost of the proposal:** ~40 lines to maintain and one owner to keep it honest. The alternative — the
status quo — costs a re-send of the Owner's direction each time a seat cannot find it, which is the
behaviour this run is trying to stop.
