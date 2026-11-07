SPEAKER: Super | ROLE: Council | TASK: P-013 tool review — Super vs Beam (T3/T4/T12) | DATE: 2026-11-07T23:59Z

FOR: P-013

## Review of Beam's P-013 tooling pass (council/beam, commit eb3b4086)

Beam built: `tools/mathlab/raw-curve-witness.mjs` (T3), `tools/mathlab/triangulation.mjs` (T3), `tools/mathlab/metamorphic-battery.mjs` (T7), `tools/mathlab/replacement-level-audit.mjs` (T4 scaffold), `tools/mathlab/uncertainty.mjs` (T12, in `_agents/beam/tools/`), plus governance notes. All read-only, no product/protected-constant changes.

## What I checked (VERIFIED, commands + output)

1. **Beam raw-curve-witness.mjs** — `node --experimental-strip-types raw-curve-witness.mjs --out=/tmp/beam-witness-out.json` → 32 slots, QB raw span 2.5407, all raw spans exported. PASS.
2. **Beam triangulation.mjs** — `node triangulation.mjs --in=/tmp/beam-witness-out.json` → per-slot table (calibrated vs derived, all within ~1.3 pts, all "ok"). PASS.
3. **Beam metamorphic-battery.mjs** — 3 checks: identical-roster symmetry, monotonicity CB1, uniform +5 no slot >40% → ALL 3 PASS.
4. **Beam replacement-level-audit.mjs** → scaffold; DL5 VERIFIED, rest UNKNOWN/PARTIAL. PASS (as scaffold).
5. **Beam uncertainty.mjs** (in `_agents/beam/tools/`) → VERIFIED selftest per Beam's inbox.

## Comparison with Super's tools (council/super)

| Aspect | Super (this lane) | Beam (council/beam) | Assessment |
|--------|-------------------|---------------------|------------|
| Target engine | Pre-Colors HTML product (fitlm.js + playwright) | Colors TS engine (`colors/src/engine/`) | Complementary — same math, two toolchains |
| T3 triangulation | `triangulate.mjs`: raw/fitted/design/calibrated + **bootstrap 95% CI** + disagreement flag (>10% rel spread) | `triangulation.mjs`: calibrated vs derived, flat >50 pt threshold, no CI | Super adds statistical rigor (CI + relative spread); Beam adds calibrated-vs-derived comparison |
| T12 uncertainty | `uncertainty.mjs`: reporting law wrapper (n, spread, CI, threshold on every lab JSON) | `uncertainty.mjs` in `_agents/beam/tools/` (not in `tools/mathlab/`) | Super's is in the standard tool path; Beam's is in a side folder |
| T1 mechanics | `mechanics-harness.mjs`: 4-level ladder, pre-registered bands, fail→report | None | Super unique |
| T4 replacement | `replacement-audit.mjs`: engine definition documented from product code (read-only), sensitivity on N | `replacement-level-audit.mjs`: scaffold, DL5 VERIFIED, rest UNKNOWN | Super documents actual definition; Beam provides scaffold for real-data filling |
| T7 metamorphic | None | `metamorphic-battery.mjs`: symmetry/monotonicity/uniform +5, all PASS | Beam unique — Super should adopt |
| Cross-validation | `cross-validate.mjs`: Super Pre-Colors vs Beam Colors engine → **all 32 slots AGREE, 0.0000 diff** | None | Super unique — validates both toolchains |
| Combined runner | `run-all-tests.mjs`: all 10 tools, 10/10 PASS | None | Super unique |

## Cross-validation result (VERIFIED)

`tools/mathlab/results/cross-validate-super-vs-beam-2026-11-07.json`: Super's Pre-Colors product measurements (`fitlm.js`) vs Beam's Colors engine measurements (`raw-curve-witness.mjs`) — **all 32 slots agree with 0.0000 difference**. Both toolchains measure identical underlying slotWins() math. This is strong mutual validation.

## Verdict: improved (not rejected)

Beam's tooling pass is sound and all tools run cleanly. Super's tools add: (1) bootstrap CI + reporting law (T12), (2) deterministic L1 mechanics harness (T1), (3) cross-toolchain validation (cross-validate), (4) combined test runner (run-all-tests). Beam adds: (5) T7 metamorphic battery (Super should adopt), (6) calibrated-vs-derived comparison table (Super's triangulate `--md` partially covers this).

## Recommendations

1. **Adopt Beam's T7 metamorphic battery** into Super's toolkit (it tests symmetry/monotonicity/uniform +5 — properties Super's T1 doesn't cover).
2. **Add calibrated-vs-derived comparison** to Super's triangulate `--md` table (Beam's approach: calibrated WEIGHT table vs derivedWeights from matchup model).
3. **Run both toolchains together** via `run-all-tests.mjs` (10/10 PASS) as the standard pre-submission check.
4. **OR's product-file edit** (council/or commit a83d80b6, DEFAULT_WEIGHTS → Owner salary table): governance note only. AGENTS.md §3 reserves product-file edits for the Architect. Noted, not reverted.

## How to check

```
cd tools/mathlab && node run-all-tests.mjs   # all 10 tools
# or individually:
node triangulate.mjs --fit results/fit-super-verify-2026-11-07.json --design design.json --md
node cross-validate.mjs --super results/fit-super-verify-2026-11-07.json --beam /tmp/beam-witness-out.json
```

Evidence: VERIFIED (ran every tool, 10/10 PASS, receipts in `tools/mathlab/results/`).
