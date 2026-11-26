# CUTOVER-PROOF — the one-page proof for the public 76 Pancakes cutover

GENERATED 2026-11-25T06:52:20Z by `node scripts/gen-cutover-proof.mjs` — regenerated at the final bytes; never hand-written.

| fact | value |
|---|---|
| engine pin | `408410477` (stamp `UNKNOWN`, frozen snapshot, five-path fence) |
| shell framework | Svelte ^5.57.3 + Vite ^7.3.6 + plugin ^6.2.1 — as-is; the Vite-8 migration is FILED, not applied (R-13 is CLOSED; no bump before cutover without a security finding) |
| seal | 380 content entries, `node tools/verify-package.mjs .` green + converse clean |
| data | **raw CSVs EXCLUDED from any cutover manifest by default** (the A6 default: data/nfl/*.csv + the pools packs stay out until the Owner rules; the pre-migration push permission is not a release ruling). The seam contract + receipts travel; the data does not. |
| dist | index.html sha256 3edb5c6f781e8e1c… · single.html 3e3b837bb17486d2… |

## The claims verdicts (UNKNOWN means no receipt line exists — never read as green)

| claim | verdict |
|---|---|
| `claims-exist` | UNKNOWN |
| `claims-tool-exists` | UNKNOWN |
| `seal-count` | UNKNOWN |
| `manifest-identity` | UNKNOWN |
| `seal-verifies` | UNKNOWN |
| `dist-in-seal-and-status` | UNKNOWN |
| `node-battery-live` | UNKNOWN |
| `contrast-live` | UNKNOWN |
| `freshness-content-based` | UNKNOWN |
| `no-bare-stale-flag` | UNKNOWN |
| `sbs-receipt` | UNKNOWN |
| `sbs-orphan-renamed` | UNKNOWN |
| `lineage-note` | UNKNOWN |
| `r13-plan-filed` | UNKNOWN |
| `no-stale-zip-claim` | UNKNOWN |
| `no-zip-file-claim-active` | UNKNOWN |
| `boot-docs-current` | UNKNOWN |
| `start-doc-current` | UNKNOWN |
| `handover-left-correction` | UNKNOWN |
| `acceptance-complete` | UNKNOWN |
| `acceptance-no-stops` | UNKNOWN |
| `engine-430` | UNKNOWN |
| `node-battery-receipt` | UNKNOWN |
| `falsifier-verdicts` | UNKNOWN |
| `sbs-nonvacuity` | UNKNOWN |
| `status-acceptance-agrees` | UNKNOWN |
| `status-freshness-agrees` | UNKNOWN |
| `no-contradictory-acceptance-line` | UNKNOWN |
| `acceptance-attestation` | UNKNOWN |
| `freshness-map` | UNKNOWN |
| `state-blocks-fresh` | UNKNOWN |

## The parity gate (the 41-capture side-by-side)

The 41-capture no-fallback receipt is a HARD parity release gate at cutover: `node scripts/side-by-side-s15.mjs` must read 41 captures · the 40-cell matrix COMPLETE · 0 fallbacks · 0 verdict fails, and the token-diff column in `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` must carry no token drift row. **"Directionally similar" is a FAIL** — the Owner's rule, machine-verdicted by the claims `sbs-receipt` + `sbs-nonvacuity` rows (a fallback or a FAIL row REDs the gate; no prose can overrule it).
