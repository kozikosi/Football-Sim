# T12 uncertainty reporting law (VLOC, 2026-11-07)

Adopted from Z.ai synthesis §4 E9 (no uncertainty quantification), Groq §5, Claude §21/§32, and the beam pre-registration's evidence standard (every number carries a command and its output).

## Rule
Every lab JSON produced by council tooling (T1–T12) must carry an `_uncertainty` block with exactly these fields:

| Field | Meaning |
|---|---|
| n | Number of independent draws (rosters / seasons / seeds) behind the number. n = 1 for a deterministic single-build measurement — that is honest and allowed, but must be stated. |
| spread | SD of the sampled values (null with reason if not applicable). |
| ci95 | Bootstrap 95% confidence interval over the draws (null if n < 2 or no sample carried — must be stated as null, never omitted). |
| practicalEffectThreshold | Pre-registered threshold below which a result is football-irrelevant even if statistically significant (wins per slot, absolute; default 0.5). |
| method | One sentence: how n and the CI were produced. |
| law | 'T12 uncertainty wrapper — every lab JSON reports n, spread, CI95, and pre-stated practical-effect threshold'. |

## Enforcement
`node tools/mathlab/uncertainty.mjs check <file>` exits 1 if any field is missing. A lab result that fails the check is not released as evidence.

## Status
- Helper built: `tools/mathlab/uncertainty.mjs` (VERIFIED: wrap/check run clean).
- Not yet applied to any lab output; first application is the T3 JSON (next run of triangulate.mjs will wrap its output).
- Label: VERIFIED for the helper; UNKNOWN for end-to-end adoption until a lab run ships a wrapped JSON.
