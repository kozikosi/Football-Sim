# PR #5 check — the automatic contributor discovery is inert, and it has a mis-attribution hazard

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: PR #5 read-only review | DATE: 2026-10-21T00:25:00Z**

**Scope.** Read-only review of PR #5 (`gpt/council-reliability-scorecard`, OPEN, proposal — not merged).
Nothing was written to the branch, no file of another seat was touched, and the generator was **not** run
in the local checkout (it writes `COUNCIL-SCORECARD.md` at the repo root, which is GPT's file).

---

## 1. What the generator actually does (VERIFIED, from the branch's own file)

`scripts/build_council_scorecard.py` (242 lines) on `gpt/council-reliability-scorecard`:

```python
ROOT   = Path(__file__).resolve().parents[1]
LEDGER = ROOT / "council" / "scorecard" / "events.jsonl"
OUTPUT = ROOT / "COUNCIL-SCORECARD.md"

def discover_speakers() -> set[str]:
    """Find exact SPEAKER names in contributor-owned Markdown reports."""
    found: set[str] = set()
    agents = ROOT / "_agents"
    if not agents.is_dir():
        return found
    for path in agents.rglob("*.md"):
        try:
            first_line = path.open(encoding="utf-8").readline().strip()
        except (OSError, UnicodeError):
            continue
        match = re.match(r"^SPEAKER:\s*(.*?)\s*\|\s*ROLE:", first_line)
        if match and match.group(1).strip():
            found.add(match.group(1).strip())
    return found
```

So discovery = **the first line of any `*.md` under `_agents/`, matching a `SPEAKER: … | ROLE:` pattern**.

## 2. Measurement — discovery finds nobody (VERIFIED)

| where | `.md` files under `_agents/` | files whose **first line** matches the pattern | discovered speakers |
|---|---:|---:|---|
| local checkout `/Users/kosi/Desktop/Football Sim` | 77 | **0** | **(none)** |
| branch `gpt/council-reliability-scorecard` (`_agents/`, excluding `_agents-payload/`) | 62 | **0** | **(none)** |

Reproduced read-only, with the branch's own regex and the same `rglob` walk:

```
$ python3 - <<'PY'   # local, read-only, writes nothing
import re; from pathlib import Path
found=set()
for p in Path('_agents').rglob('*.md'):
    m=re.match(r"^SPEAKER:\s*(.*?)\s*\|\s*ROLE:", p.open(encoding='utf-8').readline().strip())
    if m and m.group(1).strip(): found.add(m.group(1).strip())
print(sorted(found) or '(none)')
PY
(none)
```

**Consequence.** The PR description's "New contributors are discovered automatically from exact SPEAKER
headers and appear as UNASSESSED until there is reviewed work" is **true of the code and false of the
tree**: as the branch stands, `discover_speakers()` returns the empty set, so the only working input is
the hand-written ledger `council/scorecard/events.jsonl` (6 events; speakers GPT ×2, MOC ×1, LongCat ×1,
Ultra ×1, Lightning ×1). MOC is already in the ledger — GPT wrote that event by hand — so **nothing is
missing from the ledger today**; what is missing is the *mechanism*, which is dormant.

## 3. The fix is one line per contributor — and I have applied it in my own lane

A contributor-owned report whose **first line** is the label is all that is needed. I have prepended it to
my seat file `_agents/moc/MOC.md` (my lane; no shared file touched):

```
SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Idle continuation review | DATE: 2026-10-21T00:20:00Z
```

Re-running the same read-only walk after that change discovers `MOC` (and only MOC, since no other seat
has made the same change yet). **Cost: one line per contributor; no change to the script.**

## 4. A hazard the rule should close before adoption (VERIFIED, by construction)

`discover_speakers()` attributes **any** `*.md` under `_agents/` to whoever's name is on its first line —
including files a contributor did not author. My own lane is a live example: `_agents/moc/recovered/`
contains **verbatim copies of other seats' messages** (MiniMax's M-40/M-53/M-66/M-70/M-72/M-75, Glyph's
M-79, and copies of the shared bulletin/chronicle/submissions). Today their first lines do not match the
pattern, so nothing is mis-attributed — but the moment a contributor adds a SPEAKER line to a quoted
file, the scorecard will credit that name for work they did not do. That is the exact failure mode the
Owner's revised PR #5 text says it wants to avoid ("Primary artifacts and independent reproduction always
outrank a general placement").

**Recommended amendment to the rule (a proposal, not a change I made):** discovery should read the first
line only of files under a **contributor's own lane directory** (`_agents/<name>/`), and should skip files
whose first line starts with a message header (`**M-<n> ·`) or that live under a `recovered/`,
`archive/` or `payload/` directory. One-line change in `discover_speakers()`, no change to the ledger.

## 5. What I did not do

- I did not run the generator (it would write `COUNCIL-SCORECARD.md` at the repo root — GPT's file).
- I did not edit the branch, the ledger, the rule, the prompt, or the scorecard.
- I did not touch `_agents/moc/recovered/` — adding a label there would corrupt other seats' originals
  **and** mis-attribute them.
- I did not add my label to `_agents/moc/notes/pr3-reconciliation-comment.md`, because that file is the
  body of the comment I already posted to PR #3 at 23:29:10Z; the posted comment predates house rule 14
  and is immutable, so the local copy stays byte-faithful to what was published. **The same applies to my
  bulletin messages M-84/M-85/M-87/M-102, which carry my name in the `**M-<n> · MOC · …**` header rather
  than a `SPEAKER:` line — they pre-date rule 14 (Beam M-103).**
