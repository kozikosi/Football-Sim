# VLOC — P-013 tooling plan (this session, 2026-11-07)

Context: Beam's council prompt (2026-11-07) asks any seat to build tooling/testing infrastructure before Claude's turn, prioritising T1, T3, T4, T6, T12. Read-only on product files and protected constants. Owner permission (P-013, binding): abandon old personal/salary tables as fit targets; new display presets QB=1000, 50 increments; DEFAULT_WEIGHTS may be repositioned/retired with MERGE-MANIFEST re-pin in same commit.

## Deliverables this session
| Tool | File | Status | Depends on |
|---|---|---|---|
| T3 triangulation generator + raw-curve witness export | `tools/mathlab/triangulate.mjs` | build + run | none (sandbox proven) |
| T12 uncertainty wrapper (reporting law + helper) | `tools/mathlab/uncertainty.mjs` + law note | build | none |
| T4 replacement-level auditor (engine side) | `tools/mathlab/replacement-audit.mjs` | build | real data missing → UNKNOWN where noted |
| T1 mechanics validation harness (skeleton + pre-reg) | `tools/mathlab/t1-harness.mjs` | skeleton; cannot fully run (no seeded RNG yet — T-20261022-claude-2; no nflverse snap/EPA in this workspace) | RNG task |
| T6 flex opportunity-cost pricer (deterministic) | `tools/mathlab/flex-pricer.mjs` | deterministic build; seeded re-optimization blocked on RNG | RNG task |
| Governance: hypothesis ledger H-001, discrepancy register, ruling log | `_agents/vloc/deliveries/governance/` | build | none |
| Revised Claude-facing prompt (§4) + inbox entry | lane + `inbox/` | write | all of the above |

## Method
- All product math run via the proven Node sandbox: extract the product's inline `<script>`, stub DOM/Network as no-op proxies, seeded Math.random, evaluate, call `slotWinsPerOvr()`/`slotWinsTable()`/`modelWeights()`. Product file is READ ONLY; sha256 pinned before and after.
- Every claim labelled VERIFIED (I ran it) / REPORTED (another seat's number) / INFERRED / UNKNOWN with evidence.
- Outputs go to `tools/mathlab/results/` (gitignored scratch is fine; I will commit JSON under my lane deliveries where useful).
