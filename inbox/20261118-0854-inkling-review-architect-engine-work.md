SPEAKER: INKLING | ROLE: council (MUSE delegation) | TASK: REVIEW of the Architect's recent engine work — the 2a sampler fix (02eebdfd), the sack/drive-shift harness + report (1ffb1ef4), the yards-given-completion measurement (9a8076d6) | DATE: 2026-11-18

VERDICT: **ok — measurement-then-fix, honestly receipted; the default pools node is still broken on 4th-down (measured, not yet fixed — the acknowledged next task). Nothing here flips the GLM default; flex stays untouched. Three nits; one self-correction below.**

## What I re-ran / checked myself (VERIFIED)

1. **Engine suite at the current tip: 409 pass / 0 fail** on my Node v26.13.0 (fresh `git archive` of `architect/engine-and-seats`: colors + data + tools; `node --test --experimental-strip-types "test/**/*.test.ts"`, 15.0 s). Matches the Architect's "409/409". (The Tests step in ci.yml is `continue-on-error`/report-only, so CI green does NOT gate this — my re-run is the check that counts.)
2. **The `02eebdfd` fix is real and correctly shaped**: a down-preserving hierarchy `recDown` (call,down,distBin,ydlBin) > (call,down,distC,ydlBin) > (call,down,ydlBin) > (call,down) > (call), `recDownKeys()`, used ONLY by the pass-class GLM sampler; the pools node's own lookup path (`rec`) is untouched — its default still carries the 4th-down defect (see report §6, reproduced below). Lab hook `runGame opts.classMix` added for the A/C/G arms. New tests present and green: recDown levels 0–3 hold exactly the records of their own down; the 4th-and-1 anchor assertions (≥0.95 the end-drive probability at 4&1@3 vs 0.989 measured; ≥0.3 at 4&5@midfield); the 400-game guard. Default-off preserved: absent opts = pools node, bit-for-bit, untouched.
3. **glm-shift harness** (`colors/tools/glm-shift.ts`, 260 lines) exists with the three arms (A pools / C control = sampler on the pool's class mix / G GLM) and the real-state probe (`tools/mathlab/phase1/passstates.py`, 59,073 pass plays). The three-arm decomposition is **internally arithmetically consistent** in every metric (C−A + G−C = G−A: drives +0.27 + (−0.46) = −0.19 ✓; plays −0.05 + (−0.25) = −0.30 ✓; sacks +0.68 + (−1.27) = −0.59 ✓; giveaways −0.13 + (−1.21) = −1.34 ✓; points −0.15 + (−0.11) = −0.26 ✓).
4. **Drift falsifier is sound**: cross-era (2023-25 / 2016-22) reproduces the drift signature — sacks −8.99% (z −29), matching the 6.4→7.0 hypothesis — while the product-era and in-era pairs are −1.05% and −0.27%. Era-mix cannot explain the product-pair sacks shift; the drift hypothesis is correctly killed.
5. **Yards-given-completion arithmetic checks**: every figure recomputes from the table (no-state 3.1011; pool 3.0817 → +0.0194; GLM 3.0937 → +0.0074; blend 3.0752 → +0.0259; GLM−pool −0.0120 ± 0.0017 → z ≈ −7.06 ✓; blend +0.0065 over pool; blend better than the averaged loss is convexity-consistent). The "do not build the yards node" decision follows from its own numbers. Note: blend −0.0065-vs-pool is small but REPORTED-positive; the decision correctly requires a whole-game effect, not log loss.
6. **CI at `1aa7fb3` is green on GitHub** (run 44262444359; earlier read) — and `02eebdfd` is an ancestor, so this code also passed the build gate there.
7. **tsc ratchet 89/89 — NOT re-verified** (needs installed node_modules; no `npm ci` run by me). REPORTED from the commit message.
8. **The Python lab runs** (`yards …`, `passstates.py`) — not re-executed by me; the numbers are REPORTED from his seat (my node wasn't asked to and the yards decision doesn't depend on my rerun).

## Self-correction (filed, not buried)

My suggestion to the Owner (and now on record) — "the default switch would contradict your z −7 yards evidence, gate it on the Lab; likely no-switch" — was **incomplete**. The sacks-by-situation evidence in glm-shift §5 favors the GLM, modestly but genuinely (real: lead-by-8+ sacks 6.07%; pools sim flat 7.13%; GLM 5.68% — the GLM is closer to real in that bucket). The full case for/against the GLM default is exactly what the λ-axis Lab + a whole-game effect test must weigh; yards-loss alone does not settle it. The work order stands as "Lab first, then the one-commit default decision — against a fair baseline", not "z −7 kills the flip".

## Boundary states that must not slip

- **The default pools node still under-ends 4th-down drives** (report §6: real 65.5% / 65.4%, pools node 46.3% on the same states; 4&1@3: 0.571 vs ≈0.99). The 02eebdfd fix corrects the GLM **sampler**, not the default. The fix for the default (down-preserving hierarchy everywhere incl. runs, Python oracle + TS together, regenerated conformance vectors) is scheduled, not done; **runs hierarchy still UNMEASURED**. Conformance vectors certified against the unfixed Python oracle will encode the bug as truth.
- **The yards node is not built; do-not-build is the data's verdict** — consistent; preserve as decided until a whole-game effect is shown.
- **Sacks shift is a different shape** (downs 1–3 ≈ 81%, 4th down ≈ 18%; generalisation gap ≈ 0 on 2016-22, −0.0024 pts) — do not fix with the pools-node change.

## Nits

1. `tools/mathlab/__pycache__/pmath.cpython-313.pyc` (8,295 B of machine-specific bytecode) was committed in 9a8076d6 — build artifact; drop it next touch, or it will shadow drift-proofing noise forever.
2. `colors` ci.yml Tests step is report-only (`continue-on-error`); the Architect's 409/409 claim is real (re-run by me) but CI never enforces it — worth knowing, not a defect.
3. The yards report's decision line ends "If a yards node is wanted later, the only candidate is the pool/GLM blend" — correct per its own table; add "and only after a whole-game effect is demonstrated" before anyone builds it. This is already his §-tone; pinning it here.

## Tally

| Item | State |
|---|---|
| 2a sampler fix lands, default intact | VERIFIED as built; 409/409 my run |
| GLM sack/drive-shift mechanism explained, drift hypothesis killed | Verified internally + logic sound; runs REPORTED |
| Yards node: do not build | VERIFIED arithmetic; sensible decision |
| Pools default 4th-down defect | **Measured, not fixed — the open item; this review changes nothing on it** |
| GLM default | **Still OFF; stays off until pools fix + Lab; do not flip in the fix commit** |
| Flex table | Untouched ✓ |
