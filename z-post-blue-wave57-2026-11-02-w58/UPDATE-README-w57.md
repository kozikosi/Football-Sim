# UPDATE README — wave 57 · the clean cards, the facing pairs, the flowing storm, and storage Phase 0

**File:** `Football-Sim-Z-post-blue-w57.html` · md5 `7d1e07ddb8b23ef6f03968a8fe26d6cc` · 1,659,697 chars (1,661,434 bytes) chars
**Baseline:** my w56 (md5 `42af55f794180910f1f9086fe0c68a3d`). One generator, the Owner's ten + the storage directive, every battery green.

## What you asked for → what shipped

1. **The vertical line is gone.** The player cards read clean to their left edge — the 4px accent bar on the phone card, the 3px team-ink inset that sat ON the first letter, and the cards-view bar all retired. The washes stay. The depth chart keeps its bar (it labels slots, never covers names).
2. **The draft buttons stay exactly as you liked them** — pinned as standing law.
3. **The key players face each other at every width.** No more OVR mingle in a tiny window: two cards across on your team's side and theirs, at 390, 320 and even 280px — the cards themselves compress (smaller name with a graceful ellipsis, smaller chip and numeral, season chips wrapping under; the chips yield under 360px where the OVR is the story).
4. **The game plan cards no longer say "+0.2 pts vs. auto".**
5. **The cinematics fit the compressed windows.** Tested at 320×640, 280×560 and a short 500×420: the header, the log, the intro, the Super Bowl storm and the playoff-run cine all shrink to fit — no overlap, no pan, and the panel never outgrows a short window.
6. **Last names never break letter-by-letter again.** The word-wrap law stopped the one-letter-per-line collapse — and while measuring I found the play column itself was squeezed to ~60px at 280px (which forced "BARINGE / R" even with the fix); the play text now takes its own full row on compressed windows. Every name whole.
7. **The box score glitch is fixed.** In an OT game the OT score appeared twice and the final landed outside the table's columns; the row now carries exactly one cell per column, the OT score once, the final under F. Regulation games are byte-identical to w56.
8. **BEGIN PLAYOFFS wears the SIM PLAYOFFS gold and size.** Verified on the real review page, not just in the stylesheet.
9. **The badges in review and unit report appear faster** — same beat order, ×0.6s per beat (the field map keeps its own slower law).
10. **SIM PLAYOFFS flows straight into the Super Bowl champion cinematic.** The storm now mounts underneath the run cinematic while it is still on screen — the run fades into the storm, never onto the page underneath; the dead air is gone.

## Storage — Phase 0, and the design you asked for

Open **`?storage=1`** on the file for the full walkthrough. The module (own payload block, engine-free, envelope-only) runs its 25-check fault rig inside the page; the looks are the site's own language:

- **The Continue moment** — the page opens with the run you left (team, phase line, gold CONTINUE, the three slot chips).
- **The slot selector** — three tall cards; the empty one reads as an invitation, not an error.
- **The A/B/C overwrite caution** — arm-then-confirm rows, "career stats and achievements stay".
- **The profile panel** — legend score, achievement chips, the per-franchise table, and the empty state word for word: "No achievements yet — finish a season to start your legacy."
- **Settings** — the slots with sizes, the storage meter, the softer-cinematics toggle, the honest sentence about what browser data clears really mean, and "clear all saves · achievements stay".
- **The brag share** — "I went 14-3 and won it all with the Carolina Panthers. Can you go 20-0? https://kozikosi.github.io/Football-Sim/" — clipboard + toast, the deployed URL only.
- **The four honest states** — empty, damaged (backup restored / no backup), newer-version, unavailable, plus the two-tabs warning — none of them promises a recovery that does not exist.

The plan itself (`inbox/20261101-2323-zai-storage-phase0.md`) answers the Architect's five questions: the deployed URL and the file:// truth, the Safari week-long test nobody in a sandbox can run, the nine-stat ladder with the elimination trigger and the franchise legend formula (a title 120, the best run 0–100 by its ladder, two per win, 30 per undefeated season), the preseason/results homes for run-it-back and brag, and the 247 KB bench numbers (stringify 0.9 ms · write 1.0 ms · parse 1.1 ms on this desktop; a mid-range phone lands ~15–25 ms for the whole save — checkpoint work, never mid-animation).

## Folder map
- `Football-Sim-Z-post-blue-w57.html` — the product (also at the branch root)
- `CHECKSUMS.txt` — md5s
- `notes/W57-INTAKE-LEDGER.md` — your words verbatim, item by item + the interpretations flagged for veto
- `notes/W57-BUILD-REPORT.md` — the full fix table, the root causes, the batteries
- `tools/` — the generator (`zpb_w57.py` + the payloads) and the batteries (`w57_nodecheck`, `w57_storage`, `w57_mobile`, `w57_live`, `w57_sweep`)
- `shots/` — the evidence (the board, the pairs at 390/320/280, the replay at 320/280/500×420, the review buttons, the storm, the storage walkthrough)
- `_agents/zai/` — the refreshed lane: START-OF-CHAT REV 17, ZAI.md, END-OF-CHAT
