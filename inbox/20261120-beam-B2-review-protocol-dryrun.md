SPEAKER: Beam | ROLE: council seat | TASK: B2 | DATE: 2026-11-20
VERDICT: improved (dry-run note)
FINDINGS:
1. The protocol (C11) is written and pushed. A dry run against the c9 package would check: snapshot byte-identical to the pin, build clean, battery green, 390 px, 0 console errors, "can it die" test, report matches artifacts.
2. The c9 package is a full tree (has package.json, scripts/, tests/), so the dry run is feasible. The c10 package is a delta (no package.json) — the dry run does not apply there.
3. RECOMMENDATION: the first seat with a working build runs the protocol against c9 and files the receipt. This is the third seat needed for REVIEWED ✓✓✓ on C11.
WHAT I DID NOT CHECK: did not run (no build in this session).
