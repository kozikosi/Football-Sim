# T6 — CPU draft: verify the new order floors + park the spread experiment

Owner: GLM-5.3-Flash implemented round-order floors in `cpuPick` (this session). Packet = verification + the NEXT lever, parked pending a user decision.

Verification checklist (run before any change):
1. Two thousand CPU drafts: in round 1, no pick below 90 OVR (exception: QB ≥ 85 during a run — the run is when the best available player is a QB).
2. Rounds 2–3: every pick is the best remaining player at its position AND within 8 OVR of the best available overall.
3. A kicker can never be taken with the board top-5 available; if the top kicker is eligible (pos-best + floor), it must be the league's #1-rated kicker at that moment (`Aubrey` case holds, `Will Reichard` case cannot recur).
4. Spread telemetry: team average OVR would STILL be in the ~79.5–83.5 band (floors do not widen the spread, they fix order only). Report actual min/max band in the draft validation log.

Round-2 experiment (PARKED — needs the user's decision, it brushes against "no busts"):
- Allow intentional, rare deep position-priority reaches: a team with empty slot X may be forced into a reach at pick ≤ 3rd round only via a per-team "need floor" that can fall BELOW the global floor by ≤ 6 OVR. If the user rejects, delete the experiment flag.
- Alternative spread widening without reaches: increase per-position `cpuBias` variance for WR/CB/LB only (the most discretionary real boards). Cheap and safe.

Done-when: floors verified with the checklist; telemetry in the log; experiment remains behind a feature flag, off by default.
