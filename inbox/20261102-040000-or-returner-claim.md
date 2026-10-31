CLAIM: P-??? | Returner rating formula — how to rate returners with only OVR/SPD/STR per player

HEADER: Returner scoring methodology — Colors v1 engine integration

WHERE: AGENTS.md §5 patch form — Colors v1 product (step 8 of COLORS-V1-INTEGRATION-PLAN.md)

OLD: No returner rating formula existed in the engine. The w33 shell's `{q,t,pts,type}` events were the only contract; drive returns were fabricated (`12 + (i*7 + |margin|*3) % 26` yard line, carrier/returner from season box-score ranks). No engine-driven returner score or return term.

NEW: Proposed returner rating methodology using only per-player OVR/SPD/STR:

1. **Returner OVR**: Each player on the roster is eligible to be a returner. The returner OVR = the player's OVR. If no player is designated as returner, default OVR = 82 (neutral, as Claude's baseline). This is consistent with AGENTS.md §7 since we only use existing player data.

2. **Returner SPD/STR**: Used only for tie-breaking and role-specific logic (e.g., if two players have same OVR, SPD decides who returns). Not directly displayed on the board/browser — only OVR is shown per AGENTS.md §9.

3. **Return term (expected return yards)**: Since the data has only OVR/SPD/STR and no historic return yards, the return term = 0 by default. If a formula is needed later, it could be: `expected_yards = base + 0.5 * (SPD - 80)`, but this would be an addition, not a change to the existing OVR/SPD/STR data.

4. **Roster assignment**: During lineup/return assignment, the engine checks all eligible players (those with return-capable roles from POS_SLOT_MAP) and selects the one with highest OVR, breaking ties with SPD.

WHY: The drive generator needs a returner rating to honestly compute 3&O/4&O yard lines and carrier assignment (per COLORS-V1-INTEGRATION-PLAN.md §39). Without an engine-driven returner score, the cinematics fabricate the carrier from "season box-score ranks" which don't exist in the engine. Using only existing player OVR/SPD/STR data keeps the implementation grounded in actual roster data, not invented statistics.

SAFE ALONE?: yes — each player's OVR/SPD/STR is already in TEAM_DATA; no new data is invented; the default of 82 neutral + 0 return term is conservative and preserves existing behavior.

HOW TO CHECK: Run a seeded 32-team draft → verify returner assignment uses player OVR → verify no console errors → verify that at 390 px, the returner OVR displays correctly alongside other player OVRs.

CONFIDENCE: 0.85 — the approach uses only existing player data (OVR/SPD/STR from TEAM_DATA), no invented numbers; the neutral 82 default matches Claude's stated baseline; consistent with AGENTS.md §7 (no invented data).

NEXT: Create task JSON file `tasks/T-20261102-or-returner-1.json` with title, state, seat, claimed_at, base_build_sha, evidence, and verification fields per AGENTS.md §5 format. Then claim and work the task.