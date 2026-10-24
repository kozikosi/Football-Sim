# LongCat — verification report (corroborating, not displacing MOC's sign-off)

**Scope.** Independent re-measure of the merged candidate by a session that authored nothing in
the round being verified (LongCat, S-2400–2499). MOC's M-84/M-85/M-87 already hold the verifier
seat; this is a second, clean-session receipt, not a second claim to the seat.

## Five-line report

1. **Hash.** `merged.html` = `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B, `merge/v20-donor @ ff8c05ae0ef8`. Negative control `NFL Draft Simulator v20 Claude.html` = `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, 649,032 B.
2. **E2E driven.** `node tests/e2e-smoke.mjs merged.html --port 9222` over Brave headless CDP, Chrome/151.0.7922.137, viewports 390×844 + 1280×900 → **exit 0 · verdict PASS · A/B/C/D all true**. The same command on v20 → **exit 1 · verdict FAIL**.
3. **Numbers re-measured (command + sample).** Sample = 2 artifacts × 1 run each, plus a repeat run of the candidate. Candidate: draft **832/832**, **272** games, playoffs complete, champion **Atlanta Falcons**; report rendered and not stalled; **0** offenders; **0** page errors. v20: draft 832/832, 272 games, champion **New Orleans Saints**, **A false** (`ReferenceError: rWeights is not defined` at v20:6018, thrown from :5900), **B false** (7,208 offenders), **C false** (1 page error).
4. **Console / 390 px.** Candidate — 0 uncaught page errors, 0 element-level overflow offenders, `documentScrollWidth` 390 = viewport. v20 — 1 page error, 7,208 offenders.
5. **Deliberately not checked.** No seeded RNG (58 `Math.random()` sites → not seed-reproducible; the champion varies run to run); no human visual pass; `pw4.js` / `validate.js` / `phone.js` / `run_all.sh` **do not exist**; no protected-function hash gate; **no function-diff** (MOC ran DS's `funcdiff-full.js`: 408 common / 390 identical / 18 differing); no accessibility / performance / persistence; **no promotion steps taken** — the `verified-merge-<hash>` tag and the canonical `STATUS.md` hash line (still reading "the merged result has no hash yet") remain the Owner's/Architect's call.

## New datum for the no-seed finding

Five runs of the same artifact `40233d6b…` produced **five distinct champions**:

| run                         | champion             |
| --------------------------- | -------------------- |
| MiniMax M-80 receipt        | New England Patriots |
| MOC lane run                | Houston Texans       |
| MOC shared-path run         | Los Angeles Chargers |
| LongCat run 1               | Baltimore Ravens     |
| LongCat run 2 (this report) | **Atlanta Falcons**  |

272 games and a PASS verdict every time. This corroborates MOC's M-85 §3: **the gate certifies that the build runs; it cannot certify season balance or win realism.** Filed as Q-LONGCAT-1.

## Receipts

- `_agents/longcat/evidence/gate-merged-pass.json` — candidate run (exit 0, PASS, Atlanta Falcons)
- `_agents/longcat/evidence/gate-v20-negative-control.json` — v20 run (exit 1, FAIL, New Orleans Saints)
