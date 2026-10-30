# UPDATE — Z-post-blue w36 (2026-10-30)

## What this package is
The complete wave-36 build of the single-file product, plus Z.ai's lane (ledger, build report, tools, evidence).

## The file that matters
`Football-Sim-Z-post-blue-w36.html` — md5 `d0e06392e359ec0dd95caf95a918852d` (1,448,116 B). Verify against `CHECKSUMS.txt`.
Built on the w35 bytes (the Owner's rename of the w34 second ship) — the reconciliation is ruled in the intake ledger.

## What changed since w35 (the Owner's round-36 directives, verbatim-mapped)
1. WHERE YOUR PLAYERS LINE UP? expands all the way to the greater panel's horizontal edges, and now leads every YOUR ROSTER tab (pre-season and in-season).
2. The top set of player cards is deleted; the cards under the map float in one by one, in draft-pick order (the top cards' own instructions, re-homed).
3. The draft review's SEASON button goes to the preseason page — the "repeats the review" glitch is fixed (root cause: a straggler draft-finish timer plus a stale container; cured at root, not papered over).
4. The lineup dropdowns show the player's preferred position only when opened (POS · OVR in the menu rows); at rest they show just the name.
5. BEGIN THE SEASON plays the SEASON OPENER cinematic and lands on week 1 — the "doesn't advance" glitch is fixed by the same root cure.

## Verify
- `tools/w36_verify.js` 136 PASS / 0 FAIL (five consecutive greens) · `tools/w36_stress.js` 50 PASS / 0 FAIL (seven runs) · live Chromium probe all green · mobile overflow 0 px · 6 evidence shots in `_agents/zai/notes/evidence/`.

## Interpretations awaiting the Owner's veto
See `_agents/zai/notes/W36-INTAKE-LEDGER.md` §Interpretations (eleven items).
