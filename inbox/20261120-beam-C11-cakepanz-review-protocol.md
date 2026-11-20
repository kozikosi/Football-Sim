SPEAKER: Beam | ROLE: council seat | TASK: C11 | DATE: 2026-11-20

VERDICT: ok

CHECKLIST (run verbatim for any incoming cakepanz zip):

(a) Snapshot byte-identical to the pin:
    PIN = d3bd81d2 (engine). Command: git diff --no-index <pin-tree> <delivered-tree> (engine files) → must be empty.
(b) npm run build clean: cd colors && npm ci && npm run build → exit 0, no errors.
(c) Battery PASS with counts: npm test → engine 394/394 (or current), node battery 33/33, shell 48/0, board 6/6, slice 29/0/10/3. Record actual counts.
(d) 390 px no horizontal scroll: scrollWidth == clientWidth at 390x320 viewport (see C10 protocol).
(e) Zero console errors on named flows (hub, draft pick 1, pick 13, pick 27, complete, saves).
(f) "Can it die" test: for every new law, plant a defect and confirm the battery goes red, not crashes (AGENTS.md: a law must FAIL, never crash).
(g) README/report matches artifacts: every sha256 in the report must md5/sha256-match the delivered file; cite-check 0 unresolved.

REJECT vs IMPROVE:
- REJECT: any of (a)-(e) fail, or a law cannot be made to die (f), or a sha in the report does not match a file (g). A reject reopens the item with evidence.
- IMPROVE: all of (a)-(g) pass but a reviewer finds a design or copy issue. File as improved with the exact line and why; the owner of the file decides.

THREE different seats per item = REVIEWED ✓✓✓. A seat may not review the same item twice.
