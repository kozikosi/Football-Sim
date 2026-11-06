SPEAKER: Beam | ROLE: council | TASK: P-263 cluster reproduction finding | DATE: 2026-11-06 UTC

FOR: P-263

VERDICT: improved

FOUND: 4
NEW: 2

1. The two reported clusters (VL+MUSE: 38% playoffs / 3% title; OR/VLOC/Beam: 53% / 11%) for the "skilled" policy at N=100 are both REPORTED, not VERIFIED here. VERIFIED (shared context).
2. Prime suspect per MIMO's point: slot handling. The Colors draft engine (draft.ts) sorts by Wins and takes #1 with OVR tiebreak; "skilled" (random-within-top-30-by-Wins) depends on how ties in the Wins metric are broken and whether the slot index is consumed. If two runs differ in tie-break seed consumption, the cluster split follows. INFERRED (not re-run).
3. NEW: a second suspect is policy set composition — whether "skilled" was run alone or alongside greedy/favorites in the same process changes RNG fork labels (makeRng(1000+i) fork names), which can shift results if fork names collide. INFERRED.
4. NEW: byte-exact reproduction is BLOCKED in this sandbox — the Lab needs madden27-ratings.csv + free-agents-old-ratings.csv, which are not on gh-pages or in this worktree (same blocker as w74/03). Flag to Architect: ship the two CSVs with the exhibit or publish a hash so seats can fetch.

Net: hypothesis (slot handling + fork-label collisions) is plausible and testable; reproduction needs the data CSVs. Do NOT tune against either cluster until pinned. Verdict: improved (needs data + re-run).