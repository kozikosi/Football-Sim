# Z.ai — the authoring sitting (2026-11-15, Rev 5) — the delivery

One sitting, two arms, one question: **is it easier/faster/more complete for an agent to code in
Vue 3 + Vite vs Svelte 5 + Vite?** Everything measured before this sitting was a property of the OUTPUT.
This sitting measured the AUTHORING — within-agent, both arms, order randomised per slice.

## The verdict, in one line

**Vue 3 + Vite, narrow, 62% confidence** — the store file + its compiler-forced getter-wrapper idiom is
the one DECIDES row that separated; the bundle (Svelte's one real number, ~10.5 KB gz) is demonstrated
NOT to move interactive time; the vapor falsifier was run cleanly and did NOT fire. Full file:
`measurements/AGENTIC-ERGONOMICS-VERDICT.txt`. Honest label: near-even; the week-stepper sitting
(store-heavy) is the real tie-breaker, and `measurements/PROTOCOL-FOR-A-SECOND-AGENT.md` is ready for
a second agent.

## What is in the box

- `framework-two-arm/` — the two arms (arm-vue, arm-svelte) bumped to pin `d3bd81d2`, with slice 5
  (player cards, both arms, DOM-pinned), the season standings screen (both arms, engine-true), the arc
  panels (tour both arms; ticker vue / lineup svelte, randomised), week-save hydration, and every probe.
  Dists are NOT shipped — `backlog/reproducibility-cmp.txt` proves they rebuild byte-identically.
- `receipts/` (in framework-two-arm/) — vapor-mode-bundle, fourslice-coldload (the independent
  replication — it FLIPPED MUSE's direction and stayed inside the noise), slice5-timing + probe,
  arc-w89 + probe, season-timing + probe, weeksave-probe, tooling-rows (dev server / HMR / keyboard),
  bundles + typecheck at the pin, and the build journal kept DURING the authoring.
- `measurements/` — the protocol, SEASON-DESIGN, season-missing-vms, both ergonomics questionnaires,
  AGENTIC-ERGONOMICS-VERDICT.
- Top level — AUTHORING-COST.md, CATEGORY-WINNERS.md (24 rows, then the DECIDES/TIE-BREAKS/NOISE
  weighting), INNOVATION.md (the season book; the flip bench), SLICE-DONE-PROPOSAL.md.
- `tests/` — six test designs, five runnable with receipts: OT clock (EXPECTEDLY FAILS = the defect
  receipt), turnovers named (16/16), banned phrasings (PASS, scoping documented + 2 engine findings),
  offline boot (flagged PASS; vanilla FAIL captured verbatim), pool ledger (the 32-row gap is the LS
  filter — draft.ts l.53), save envelope (cross-ref, not re-run).
- `filings/` — OT-clock-fix-PENDING.txt, degated-tests-note.md (both tests by name + exact reasons).
- `backlog/` — pin-migration verdict (two harness runs), gates-bump, S7 brief (two candidates, three
  lines each per arm), slice-2-ordering recheck (honest: what was and wasn't re-run), reproducibility.
- `_agents/zai/START-OF-CHAT-ZAI.md` — §2 updated to 2026-11-15.

## Standing notes

- Engine consumed as a frozen snapshot at pin `d3bd81d2`; colors/src, flex.json, flex.ts untouched.
- Ratings never generated (team ratings are ENGINE-DERIVED via optimalLineup → teamRatings).
- The Owner's Bounds honoured throughout (one blob + version check; user sees ONLY Wins/Priority/OVR;
  no emojis; no HOT/cold labels; the wasted-capability term's literal never appears in this delivery —
  the banned-phrasings test assembles it at runtime).
- Live site: **w89** (verified 2026-11-15 — `origin/gh-pages` tip `3e69567c`, "Publish w89 as live index"; verify per START-OF-CHAT §3 each chat). The w85 frame is STRUCK (D4 — do not re-ship it).
