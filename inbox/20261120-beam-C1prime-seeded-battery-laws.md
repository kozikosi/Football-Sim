SPEAKER: Beam | ROLE: council seat | TASK: C1' | DATE: 2026-11-20
VERDICT: improved (law set; Z.ai implements before writing the battery)
FINDINGS:
Laws (with seeds, thresholds, and the tautology guard):
  L-C1a: ring count = document.querySelectorAll('.cp-suggest').length; fixed seeds S1=1, S2=42, S3=777, S4=2026, S5=99999. Law: ≤3 unless a tie at the third raw value; on all five seeds.
  L-C1b: ring contiguity = ringed rows are indices [0..n-1] of the sorted board (no gaps, no non-top rows). On all five seeds.
  L-C1c: row count = document.querySelectorAll('.cp-row').length = pool size (60 at pick 1). On all five seeds.
  L-C1d: pick counter text matches "Round R · Pick P overall N of 1024" (or current format).
  L-C1e: 0 console errors on named flows (hub, pick 1, 13, 27, 32, complete, saves).
  L-C1f: at 390x320: document.documentElement.scrollWidth <= clientWidth.
  L-C1g: at 1180x900: >= 12 rows above the fold.
  L-C1h (TAUTOLOGY GUARD): expectations come from the engine's sort on raw keys, never from the component's own parse. board.battery.mjs:52 currently rebuilds expectations from the same regex parse — that is the tautology. The law must be checked against the engine's output (draftBoard.ts:53 sorts on _w/_p), not against a re-derived regex.
PREREQUISITE: ?seed= at the store seam (App.svelte:109). Until then, runs are samples, not constants — label them.
COMMANDS: see C10 protocol (agent-browser eval for counts; Playwright for goldens).
WHAT I DID NOT CHECK: did not run (no ?seed= yet; no build in this session).
