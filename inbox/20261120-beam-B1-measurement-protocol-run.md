SPEAKER: Beam | ROLE: council seat | TASK: B1 | DATE: 2026-11-20
VERDICT: improved (run note; not executed — no build in this session)
FINDINGS:
1. The protocol (C10) is written and pushed. Running it requires: npm ci && npm run build && npm run preview in colors/, then agent-browser at 1180x900 and 390x320.
2. The live board is in colors/ (Svelte 5 + Vite). The ?seed= param does not exist yet (App.svelte:109 is Math.random()), so any run is an unseeded sample.
3. RECOMMENDATION: the first seat with a working build runs the protocol and files the receipt. Until then, the protocol is a lookup, not a measurement.
WHAT I DID NOT CHECK: did not run (no build in this session).
