# COUNCIL.md — how the council and the Architect work together (v8, 2 Nov 2026). One page; the rules live in `tools/council.mjs`.

**Purpose.** The Architect builds. The council does everything that is not building: research, statistics, exact snippets, mock-ups, measurements, reviews, tests, and keeping the queue clean. The Architect should never spend a token on something a seat can do, and never has to be reminded to look at the council's output.

## 1. The model: nobody edits the queue, everybody feeds it
The live queue is **derived**, not edited: `_agents/PRIORITIES.md` rows + every seat's small files in its own `inbox/` + age. Seats push only their own branch; there is nothing to merge, claim, lock or wait for. Leaving an item alone costs nothing (no claims, no leases). The Architect's branch `architect/engine-and-seats` is the home of the tool and the table; run the tool straight from it (`git show origin/architect/engine-and-seats:tools/council.mjs`), no seat needs a merge first.

## 2. What a seat can do (each is one command that writes one inbox file; then commit and push your branch)
| Command | Effect |
|---|---|
| `next` | Your list: ASKs first, then reviews, then work, by tier. |
| `add "<title>" --tier P2|P3 --work "<what to produce>"` | Adds an item at once (ID derived). P0/P1 are the Owner's. |
| `retire <ID...> --why BUILT\|SUPERSEDED\|DUPLICATE\|STALE --evidence "<proof>"` | Retires a dead item. P2/P3: one seat is enough. Owner's P0/P1: two different seats, or the Architect. **No evidence, no effect.** |
| `revive <ID>` | Undoes any retirement (anyone may; the Architect can retire again with proof). |
| `keep <ID>` | Resets an item's age clock (an idea you still want). |
| `probe <ID> present\|absent "<text>"` | A machine check against the current build (`_agents/BUILD.txt`). When every probe on an item passes **and at least one is `present`**, the item retires itself as BUILT. Absence alone never retires an item (a string can be missing because it never existed: measured 2 Nov, 0 of 23 "candidate built" items were built). |
| `ask "<question>" --format "<shape>"` | Posts a research question to every seat (the Architect uses this instead of searching the web). |
| work / review files | Unchanged: `inbox/README.md`. Two reviews by two different seats (the author never counts) make an item REVIEWED. |
| `to the Architect` | A file whose header has `TO-ARCHITECT: <one line>` shows in his digest until he acks it. |

## 3. Dead items cannot accumulate
1. **Built** → the Architect runs `retire <ID...> --why BUILT --evidence <commit>` in the same turn he ships (one command, batch).
2. **Superseded or built, noticed by anyone** → any seat retires it with proof (§2).
3. **Probe passes** → retires itself (§2).
4. **Age** → P2/P3 items with no activity for 14 days show "auto-retires in Nd"; at 21 days they retire themselves. Any seat can `keep` or `revive`. P0/P1 never age out (they are the Owner's words); they leave only by proof.
5. **Standing chore** for an idle seat: `board`, pick items you can prove dead, `retire` them.
All of it is reversible and every action appears in the Architect's digest, so a mistake costs one `revive`.

## 4. How the Architect consumes it (no reminders needed)
Bootstrap step 9 of `claude/00-READ-FIRST.md`: run `node tools/council.mjs digest`. It prints, state-based (no "since last time" memory needed): **READY TO BUILD** (reviewed items; `show <ID>` prints the final spec: the work plus every improving review in one read), **ANSWERS** to his asks, **NOTES** to him, what seats added or retired in the last 3 days, what auto-retired, what is about to. The first reply of every chat quotes its headline line. He acts on READY items as normal build work, then retires them.

## 5. Delegation (what the Architect does not do himself)
Statistics, real-data tables, web or dataset research, "find every occurrence", cross-checks, calibration reads: `ask` the council (answers arrive in the digest) or, for in-repo exploration inside a chat, a subagent. The Architect's chat budget goes to building: engine, UI, tests, and integrating reviewed work.

## 6. What did not change
Only the Architect edits `Football-Sim-*.html`, `AGENTS.md`, `tools/`. Seats push only their own branch. Evidence labels (VERIFIED/REPORTED/INFERRED/UNKNOWN). The Owner's tiers and words are final.
