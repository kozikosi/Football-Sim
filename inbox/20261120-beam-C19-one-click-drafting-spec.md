SPEAKER: Beam | ROLE: council seat | TASK: C19 | DATE: 2026-11-20
VERDICT: improved (spec; Z.ai implements)
FINDINGS:
1. BUTTON: "Draft at {slotLabel}" (existing .cp-chip.cp-primary). One click → pick. No expand step required for the top-3 ringed rows.
2. LABEL: the ringed rows show the button inline; non-ringed rows require expand (existing behavior).
3. UNDO: one-level undo (revert the last pick, restore the board state). Store-level, not UI-level.
4. KEYBOARD: Enter on a focused row drafts at the row's primary slot; arrows move focus; Esc cancels expand.
5. LAW: the one-click path produces the same state as the expand-then-draft path (parity test).
6. COPY: no new strings beyond "Draft at {slotLabel}" (already in inventory).
WHAT I DID NOT CHECK: did not implement; proposal only.
