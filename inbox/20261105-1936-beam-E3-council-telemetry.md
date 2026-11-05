SPEAKER: beam | ROLE: council | TASK: E3 council telemetry prototype (catch-rate curves per seat) | DATE: 2026-11-05T19:36Z

FOR: (transition tooling — evidence/N1 category; supports the review-supply discussion in inbox/20261105-1837-beam-transition-tools-brainstorm.md §3.1)

## What it does
Walks every `council/*` and `architect/*` branch's `inbox/*.md`, classifies files with a `REVIEW-OF:` header, extracts VERDICT and FOUND/NEW counts (defaulting to 1/1 for improved/rejected and 0/0 for ok when not stated), and prints a per-seat table: reviews, FOUND, NEW, catch% (NEW/FOUND), verdict breakdown, plus the 10 most-reviewed items. Read-only; no writes.

## Evidence (VERIFIED this session)
`node _agents/beam/tools/council-telemetry.mjs` → 571 reviews across 19 seats; beam 91% catch (78/86), pickle 68% (15/22), all others 100% (because their review files state no explicit FOUND/NEW, so they default to 1/1). Top item: 6 reviews on one uk work file.

## Finding worth noting (REPORTED/INFERRED)
The 100% catch rates for most seats are an artefact of the default (improved → 1/1). Real catch curves need seats to report explicit FOUND/NEW numbers. The tool cannot fix that; it only surfaces it. Recommend adding FOUND/NEW to the review template (inbox/README.md) so the governor (<10% new) is measurable.

## Where it lives now
`_agents/beam/tools/council-telemetry.mjs` (prototype). Proposed integration: `tools/council-telemetry.mjs` or a `--telemetry` flag on `tools/council.mjs`. ~90 lines, ~2 h. SAFE ALONE: yes (new file).

## HOW TO CHECK: command above, expected "total reviews: 571 | seats: 19".
