# AUTHORING-COST.md — the authoring cost, separately (item 8)

Seat: Z.ai · 2026-11-15 · pin `d3bd81d2` · every number below comes from the build journal kept DURING the
build (`framework-two-arm/receipts/slice5-build-journal.txt`), the two timing filings
(`receipts/slice5-timing.txt`, `receipts/season-timing.txt`) and the probe JSONs. Nothing is reconstructed
from memory; anything estimated is labelled est.

## The units, best available

STANDING QUALIFIER (D3 — carried everywhere the 34/9 min appears): after the shared instrumentation
exists, the second arm of this pair is ~9 min in EITHER direction; the 34-vs-9 gap is dominated by the
first arm paying the probe-authoring cost, an order-of-authorship artifact recorded as exactly that.

| unit | Vue 3 + Vite | Svelte 5 + Vite | source |
|---|---|---|---|
| time to first green (slice 5, incl. shared files + probe authoring) | ≈34 min | ≈9 min (second arm: instrumentation already existed) | journal T0/T2, T3/T4 |
| time to green (season slice, svelte first) | ≈4 min (second arm) | ≈7 min (first arm incl. probe) | journal T-season0..3 |
| failed builds | 0 | 1 (season: wrong relative CSS path — `../cards.css` vs `../../cards.css`; svelte screens nest one level deeper) | season-timing.txt |
| failed probe runs paid by the arm | 1 (probe-side team-index assumption; app code never failed) | 0 (probe bugs were paid in the vue arm first — an order-of-authorship advantage, recorded as such) | slice5-timing.txt |
| typecheck errors | **1 (F1, FIXED)** then 0 — the ORIGINAL receipts read 0, but the shipped tree had ONE error in BOTH arms (`src/lib/savesService.ts(58,16): error TS2352`, byte-identical shared file, introduced by the week-save-hydration work AFTER the type-check receipts were taken). Fix: cast via `unknown`; both checkers RE-RUN on the shipped tree — see f1-typecheck-rerun.txt for the exit codes (the receipts were stale; Ernie F1/F4) | same fix in the same byte-identical file, re-run attached | f1-typecheck-rerun.txt (Rev 5.1) |
| workaround lines | 0 (a slotId `as never` cast was CAUGHT pre-build and fixed properly) | 0 new; the module-reassigned-`$state.raw` getter-wrapper idiom predates slice 5 — it is the compiler's own `state_invalid_export` remedy | journal + slice5-timing.txt |
| framework-owned lines (slice 5 card screen) | 86 | 88 | slice5-timing.txt |
| framework-owned lines (season standings) | ≈51 | ≈50 | season-timing.txt |
| context-scratch checks (slice 5) | 8 | 2 | journal tally |
| context-scratch checks (season) | 0 | 1 (the css-path miss) | journal tally |
| rebuild after one word | 1568 ms | 1479 ms | timing filings |
| full_build (build+probe green) | ≈25 s + build | same | timing filings |
| self-corrections before first build | 1 (the slotId catch) | 0 | journal |
| keystrokes / thinking lines | NOT MEASURED — no keystroke logger in the sandbox; the honest proxy is the journal's wall-clock + the line counts. Labelled: NOT INSTRUMENTED. | same | — |
| fresh context opened vs reused | the arms reused the four-slice tree; each arm required re-reading ONLY its own glue file (1-2 reads) — see the scratch tallies | same | journal |

## Tool access, tool by tool

- **vite build / dev / HMR**: identical binary, identical config surface — access equally robust in both arms (HMR numbers: see receipts/tooling-rows.txt, measured this sitting).
- **type checker**: vue-tsc (3.1) and svelte-check (4.3) both installed clean and both run in ~3 s. Precision differs: svelte-check audits a11y and emits file:line coordinates with a rule URL; vue-tsc audited nothing my markup violated. One quote each is in the questionnaire receipts.
- **compiler errors**: Svelte's compile error named the file:line and the Svelte rule (`js_parse_error: Identifier 'tourIdx' has already been declared`; `attribute_duplicate: Attributes need to be unique` with a code frame); Vite's resolve error named the file and the unresolved specifier (`Could not resolve "../cards.css" from src/lib/screens/Season.svelte`). Both arms' errors were directly actionable; Svelte's carried a code frame + rule URL.
- **docs**: not opened this sitting in either arm — package introspection (`.d.mts` reads) sufficed; the one API hunt (the pure-vapor entry) was a package dump, not a docs read (receipts/vapor-mode-bundle.txt: finding (1) and (3)).

## The verdict on authoring cost ALONE

Was this task harder in Svelte or Vue, holding all else equal, and by how much? **A measured tie with one
real, small asymmetry against Svelte: the file-system idiom.** Across two slices and ~140 framework-owned
lines per arm, both arms built green, typed clean and probed identically; the delta that actually cost
minutes was Svelte's deeper screen directory (one wrong-relative-path build failure, the lesson
transferring to the second arm) and Svelte 5's module-level `$state.raw` getter-wrapper idiom — a
compiler-forced pattern Vue has no equivalent of (MUSE's original store-file observation; this sitting
confirmed it: the idiom is real, the compiler enforces it, and it costs four lines + one concept per
module-level reactive export). Against that: svelte-check's a11y audit caught two things vue-tsc never
looks at — a maintenance-side point IN Svelte's favour at authoring time (2 warnings to read) and
forever after. **Net: authoring cost alone is even within measurement noise; the tie-breaker is NOT the
authoring cost.**

## What would flip it

- A measured HMR or dev-server gap beyond the noise floor in either direction (receipts/tooling-rows.txt).
- A real svelte-check false-positive rate on this codebase (none observed: 3 warnings, all real).
- The getter-wrapper idiom multiplying across a store-heavy surface (the w89 season/offseason work is
  store-heavy: watch the next sittings' store-file line counts).
- A second agent running `measurements/PROTOCOL-FOR-A-SECOND-AGENT.md` cold and disagreeing.

## The confound, stated plainly

**The training-data mix is an unseparable confound.** This agent has read more Vue than Svelte 5 (or
less — it cannot introspect its own corpus), so fluency differences are baked into every wall-clock
number. The within-agent design removes agent-skill variance; it CANNOT remove corpus variance. What
would remove it: (1) a second agent with a different corpus running the same protocol (Ernie's slice-5
arm, secondary, never averaged), and (2) a harder domain split — author one slice the Vue ecosystem
documents well and one it doesn't, and see which arm's docs-gaps cost more. Until then: every answer in
this file is subjective-but-measured — say so, do not conceal it.
