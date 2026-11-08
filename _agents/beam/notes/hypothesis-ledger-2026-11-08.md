# Hypothesis ledger (T-governance) — Beam, 2026-11-08

| ID | Prediction | Control | Success criteria | Status |
|---|---|---|---|---|
| H-008 | Machine-readable inbox frontmatter reduces parse failures to zero for council-sync | inbox lint tool | zero malformed entries in 7-day scan | PROPOSED |
| H-009 | Salary-based DEFAULT_WEIGHTS do not change T1 skill-production results | T1 re-run on OR branch | \|delta\| < 0.02 in all slot slopes | PROPOSED |
| H-010 | Raw-curve witness as a P0/P1 build gate adds < 5 seconds and no bytes | build pipeline timing | measured gate time < 5s | PROPOSED |

Rules: written before experiment; status moves proposed→tested→supported/refuted; refuted entries are kept.
NODE
cat > _agents/beam/notes/discrepancy-register-2026-11-08.md <<'MD'
# Discrepancy register (engine vs NFL) — Beam, 2026-11-08

| # | Discrepancy | Suspected cause | Status |
|---|---|---|---|
| D-007 | Forensic correction: fit target was design@27Oct×0.00254, not personal table | documentation mismatch | REQUEST (Z.ai) |
| D-008 | Replacement OVR spread 70.8–76.3 vs real ~3x spread | simplified replacement definition | OPEN |
| D-009 | council.mjs produces no output from /tmp on Mac | cwd guard bug | OPEN (tooling) |
MD