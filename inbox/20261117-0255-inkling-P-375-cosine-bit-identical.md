SPEAKER: inkling | ROLE: council | TASK: P-375 portable cosine — run the bit-identical check on this machine | DATE: 2026-11-17T02:55Z
FOR: P-375

# The portable cosine — bit-identical `normal()` on my machine (Node v26.13.0, macOS)

**Engine commit tested:** `5c8084720604c6f2e160104d185bf4a816586380` — the tip the prompt named, verbatim from `origin/architect/engine-and-seats`. This machine: **Node v26.13.0**, Python 3.15.1, macOS (arm64; the node `--version` is the answer the prompt asked for — the old failure lived exactly here).

**Commands & outputs (VERIFIED, mine):**

```
python3 -I tools/mathlab/keyedrng_check.py
→ Random123 known-answer vectors: ok
→ checked: philox 323, hash 13, gamekey 90, draw 240, rng 120, throws 6
→ normal(): 120/120 compared bit for bit
→ RESULT: Python twin reproduces every vector exactly, normal() included

python3 -I tools/mathlab/pmath_check.py
→ pexp: 417 vectors, worst relative error vs reference 2.10e-16
→ pexpm1: 412 vectors, worst relative error vs reference 2.65e-16
→ plog: 412 vectors, worst relative error vs reference 2.03e-16
→ ptanh: 415 vectors, worst relative error vs reference 2.24e-16
→ psqrt: 409 vectors, worst relative error vs reference 2.21e-16
→ pcos2pi: 625 vectors, worst absolute error vs reference 1.11e-16
→ psin2pi: 625 vectors, worst absolute error vs reference 1.11e-16
→ pnorminv: 418 vectors, worst relative error vs reference 1.87e-15
→ RESULT: Python port reproduces every vector bit for bit

node --test --experimental-strip-types test/core/keyedrng-vectors.test.ts
→ ℹ pass 1 / ℹ fail 0   (the conformance test that was failing on Node 26 macOS)

npm test
→ ℹ pass 394 / ℹ fail 0

npm run tsc:check
→ tsc baseline OK: 89 errors (pinned 89).
```

**Verdict: the portable cosine lands. `normal()` is now 120/120 bit-identical on the exact machine/Node that previously produced 106.**

- Before this change, the failure was real on this machine (106/120 match in my own earlier P-375 verification). The portable cosine (`pcos2pi`/`psin2pi` in `core/pmath.ts`, commit `db33bfa`) closes it: `keyedrng_check.py` now reports **120/120 compared bit for bit**, worst absolute error 1.11e-16 — machine-independent, portable.
- `pcos2pi` / `psin2pi` / `pnorminv` all land within ~1e-16 — the port was mechanically generated from the same math Phil's Python twin audited.
- The `vectors` guard test that previously failed on Node 26/macOS now **passes** — `ℹ pass 1 / ℹ fail 0`.
- The `tsc` ratchet is untouched: pinned 89.

**One residual truth to note:** the "normal() reported, not required" line is now moot — the twin reports exact bit match for all 120 draws. If the vectors ever drift again (e.g., somebody touches `plog` or `psqrt`), the guard will catch it: the test is genuinely failing-able on the machine this report came from.

**Labels:** every output above is VERIFIED by me this session on this machine. The old 106 report and the 379/379 on contributor machines are REPORTED from my own earlier round, not re-run here.
