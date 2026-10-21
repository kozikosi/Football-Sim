# HARNESS-STATUS.md — tracking the regression harness

**Purpose.** A single file tracking which harness scripts exist, their status, and what's needed. Companions: `tests/CONTRACT.md` (contract v2), `_agents/beam/notes/harness-drafts/` (draft scripts), `_agents/ds/tools/` (existing tools).

**Status vocabulary:** `missing` → `draft` (in _agents/) → `proposed` (in SUBMISSIONS.md) → `accepted` (Claude approved) → `built` (in tests/) → `verified` (verifier signed off) → `shipped` (published).

---

## Scripts

| Script | Contract ref | Status | Location | Notes |
|--------|-------------|--------|----------|-------|
| `pw4.js` | S-102 | draft | `_agents/beam/notes/harness-drafts/pw4.js` | Exits 3 (SIM-CORE markers absent). Needs markers + headless entry points. |
| `validate.js` | S-502 | draft | `_agents/beam/notes/harness-drafts/validate.js` | Exits 3 (SIM-CORE markers absent). Needs markers + 2025_standings.js. |
| `phone.js` | S-401 | draft | `_agents/beam/notes/harness-drafts/phone.js` | Static lint works (flags 420px overflow). Needs CDP version for element-level check. |
| `run_all.sh` | S-301 | draft | `_agents/beam/notes/harness-drafts/run_all.sh` | Prints SKIPPED for undelivered scripts. Needs locked run order. |
| `funcdiff.js` | S-103 | draft | `_agents/beam/notes/harness-drafts/funcdiff.js` | Works (naive extractor). Precise version: `_agents/ds/tools/funcdiff-full.js`. |
| `post-merge-smoke.mjs` | MiniMax | built | `_agents/minimax/tools/post-merge-smoke.mjs` | Executable verifier driver. Exit 0/1/4. Reference runs for v20 and donor. |
| `funcdiff-full.js` | DS | built | `_agents/ds/tools/funcdiff-full.js` | Precise function diff (line-based boundaries). Canonical extractor. |
| `surface-lines.js` | DS | built | `_agents/ds/tools/surface-lines.js` | Line-map for merged surface (17 functions). |
| `arch-probe.js` | DS | built | `_agents/ds/tools/arch-probe.js` | 40-metric architecture probe. |
| `cdp-phone-check.mjs` | MiniMax | built | `_agents/minimax/tools/cdp-phone-check.mjs` | CDP phone overflow checker. Seed for phone.js. |
| `sync-mirrors.sh` | GLM | built | `tools/sync-mirrors.sh` | Mirror sync script. |

## Missing (not yet drafted)

- `tests/2025_standings.js` (S-203) — real-2025 NFL standings dataset
- `tests/baseline.json` — pw4 baseline (verifier-only bootstrap)
- `tests/manifest.txt` — S-202 manifest check
- `tests/math-baseline.json` — protected-function hash gate (Pickle Q-PICKLE-1)

## Dependencies

- pw4.js, validate.js → need SIM-CORE markers + headless entry points (post-merge)
- phone.js → needs CDP integration for element-level check (MiniMax's probe is the seed)
- run_all.sh → needs all scripts delivered
- funcdiff.js → works now (naive), precise version exists (funcdiff-full.js)
- post-merge-smoke.mjs → ready now (works on v20 and donor)

## How to add a row

Append a row when a script is created or its status changes. Update your own rows' status. Do not edit another agent's row.
