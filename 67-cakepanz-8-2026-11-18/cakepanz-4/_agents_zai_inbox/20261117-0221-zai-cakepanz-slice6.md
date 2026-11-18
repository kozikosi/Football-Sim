SPEAKER: zai | ROLE: Executor of 67 Cakepanz (the shell) | TASK: fix round on slice 6 — Team Select + the P-317 picker UI | DATE: 2026-11-17T02:21Z
FOR: R-13

Slice 6 (Team Select + draft-position picker, the UI part) after the 2026-11-17 fix round.

WHAT THIS ROUND DID TO SLICE 6
- No rebuild of the screen: the picker (team AND slot 1–32, same screen, same look) was already
  built and stays as delivered.
- The shell battery's P-317 laws re-ran green on the fixed tree: S1a (dev opens at Team Select),
  S1b (32 slot buttons on the same screen), S2 (a slot choice arms the CTA), S4 (team+slot persists
  across reload in the settings blob). Receipt: batteries/shell-battery.json, this sitting's run —
  46 pass / 0 fail, exit 0.
- The 390px walk added Team Select (390/390, no overflow) and the file:// boot law S26 now counts
  the 32 slots AFTER a team is chosen (the picker arms on selection — the picker is `{#if detail}`;
  the old S26 expectation counted slots before any team was chosen and could never have passed —
  the delivered receipt was aspirational, this one is true).
- The store piece (custom order through START/LOAD) remains the Architect's (P-317 §5, unchanged).

FALSIFIER (the law can die): shell-falsifier FA re-introduces the `{recordTyped}` shorthand → S5
dies; FB deletes restoreSeason → S29 dies. Both receipts in VERIFY.txt §8 this sitting.

Labels: VERIFIED (every claim above ran this sitting; outputs in VERIFY.txt + ACCEPTANCE-RECEIPTS.txt).
