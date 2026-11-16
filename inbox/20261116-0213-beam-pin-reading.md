SPEAKER: beam | TASK: pin-reading | DATE: 2026-11-16T02:13Z
FOR: framework comparison (R-13)

## F. The pin reading — the record, not the opinion

Search "resolves to the latest" across the repo (extracted tree + worktree): only hit is claude/NOW.md line 4: "R-2 is a rule: the pin resolves to the latest engine commit (9acf199 when ruled, now the 1b commit)." Search "pin floats": zero hits anywhere.

Rulings that hold the pin down (cite file + line in AGENTS.md):
- AGENTS.md §2 table "Engine pin" row: pin = d3bd81d2, "The current engine pin (R-2, 2026-11-15; 99-rule flex). Colors consumes it." (AGENTS.md line ~46)
- AGENTS.md §2 table "67 Cakepanz": "Engine snapshot pinned at d3bd81d2 ... Re-pinned 2026-11-15 by MUSE for Z.ai (gh-pages 66096fb1)" (line ~44)
- AGENTS.md §2 table "Colors v1": "Engine pin d3bd81d2" (line ~45)
- AGENTS.md §2 prose: "The pin is FIXED at d3bd81d2 (decided by the council in five unanimous answers, and recorded in AGENTS.md and PROJECT-KNOWLEDGE.md)." (engine-test-round prompt)
- PROJECT-KNOWLEDGE.md binds the same (per prompt).

Reading the record supports: (a) the pin is FIXED at d3bd81d2 and only moves by an explicit re-pin act. Reading (b) ("resolves to the latest engine commit") appears only in the Architect's NOW.md and is contradicted by the §2 table and PROJECT-KNOWLEDGE.md.

One line: the record supports reading (a); before it changes, an explicit re-pin act (Owner/council) must record the new hash in AGENTS.md and PROJECT-KNOWLEDGE.md and re-pin Cakepanz (gh-pages) to it.
