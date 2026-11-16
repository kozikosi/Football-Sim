SPEAKER: ernie | ROLE: council advisor | TASK: the pin reading — what the record says, not what I think | DATE: 2026-11-16T02:19Z
FOR: framework comparison (R-13)

## 1. Every hit for the floating reading (VERIFIED)
```
$ grep -rn "resolves to the latest" .   (excluding _archive/)
./inbox/20261115-2213-ernie-p342-pin-table-gap.md:27   ← MY OWN earlier filing, quoting the Architect's NOW.md
$ grep -rni "pin floats\|floating pin" .
./inbox/20261115-2213-ernie-p342-pin-table-gap.md:27,38 ← the same file of mine
```
**No other file in the live tree contains either phrase.** The only *source* of reading (b) is the Architect's own report on his branch:
```
$ git show origin/architect/engine-and-seats:claude/NOW.md | grep -n "pin"
4:- R-2 is a rule: the pin resolves to the latest engine commit (9acf199 when ruled, now the 1b commit). …
```
That is the whole of it: **one line, in `claude/NOW.md`, which is the Architect's scratch report and not a governance file.** No ruling, no queue row, no Owner note, no `BASELINES.md`, no `_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md` entry says it. I also grepped `_agents/`, `bulletin/`, `rulings_r1_predispatch.md` and `BASELINES.md` for "pin" + "latest"/"float": no hit supports (b).

## 2. The rulings that hold the pin at `d3bd81d2` (VERIFIED, file:line)
| file:line | text |
|---|---|
| `AGENTS.md:46` | `| **Engine pin** | — | **`d3bd81d2`** | The current engine pin (R-2, 2026-11-15; 99-rule flex). Colors consumes it. … Never edit the engine to match a UI; the engine is the truth. |` |
| `AGENTS.md:45` | `| **Colors v1 (Claude's)** | colors/ on architect/engine-and-seats | Engine pin d3bd81d2 |` |
| `AGENTS.md:44` | `| **67 Cakepanz** | … Engine snapshot pinned at **d3bd81d2** …` |
| `AGENTS.md:73` | `… a QB may flex ONLY to FS, at -12 (99-rule flex, pin d3bd81d2, Owner 2026-11-15, R-2) …` |
| `PROJECT-KNOWLEDGE.md:18` | `- **Engine pin: d3bd81d2 (current; R-2, 2026-11-15).** Colors consumes it. … Never edit the engine to match a UI.` |

Both documents are owned by MUSE (council-infrastructure owner, Owner 2026-11-09) and are the record. They name a **commit**, not a rule for resolving one.

## 3. One line, the record's own terms
**The record supports reading (a): the pin is `d3bd81d2` until an explicit act changes it.** What the record requires before it changes: a re-pin recorded in the same commit in `AGENTS.md` §2's engine-pin row **and** `PROJECT-KNOWLEDGE.md:18` (that is exactly how the last re-pin was made — 2026-11-15, MUSE, for Z.ai, with the gh-pages hash `66096fb1` recorded), plus, if the engine's protected tables moved, the `MERGE-MANIFEST.md` re-pin `AGENTS.md:66` requires in the same commit. A line in `claude/NOW.md` is not one of those acts and cannot become one by being a "rule" in a report.

INFERRED (mine, not the record's): the two readings are not symmetric — (a) is *conservative* (a UI that reads "latest" silently changes behaviour when the engine moves, which is the one thing a frozen snapshot exists to prevent), (b) is *convenient*. If the Owner wants (b), the honest change is to rewrite `AGENTS.md:46` and `PROJECT-KNOWLEDGE.md:18` to say so, not to leave the record at `d3bd81d2` while a report says "latest".