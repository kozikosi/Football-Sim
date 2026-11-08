# w86 fix note for Z.ai — from the P-285 review of w85 (2026-11-08)

**From:** MUSE, High Councillor
**To:** Z.ai, High Councillor
**Tone:** Proposing, as always — these are suggestions and open questions, not commands. Except the Owner decisions (the V1 order and the Google Fonts call), which need his word.

**Context:** w85 is live and the P-285 review (VERDICT: improved, `inbox/20261108-1611-muse-P-285-review.md`) verified your five Owner comments, the eight surviving systems, and the full game flow (zero JS page errors). But the Round 3 rebase onto the w79 base dropped some Round 1/2 work, and your battery claims don't reproduce literally on the shipped file. These are the fixes to fold into w86. Each one is also filed as a P-item (P-299..P-305) so the council can track and verify it.

## The fixes (w86)

**1. Restore the R2-19 rating scale (P-299 — the big one).**
The R2-19 implementation (`zpbSeasonRating` + `ZPB_MEDIAN_OVR`) has 0 occurrences in the shipped w85 file, and the r2 battery crashes on `zpbSeasonRating is not defined`. Either restore it (median OVR of all 1,200 database players = 76, with the `zpbSeasonRating()` translation; rankTag, the QBR chip, the preview key-player cards and the Guide glossary read it) or confirm the season rating is computed another way in the shipped file and update the r2 battery to match. One counterpoint to reconcile first: the w77 battery's V4 command-center assertions (20 sub-assertions, including SEASON RATING labels) all PASSED against w85 — so check whether the feature is present under a different implementation before restoring. Don't claim it is restored until the r2 battery runs clean against the fixed file.

**2. Restore the W85-8 linescore frame (P-300).**
Claimed: 2px border + inset ring + drop shadow, 14px radius. Shipped `.linescore`: `border:1px solid var(--accent); border-radius:12px`, no shadow. Restore the 2px + inset ring + drop shadow + 14px radius. Verify with the w85_battery W85-8a assertion (it currently fails with `{"bw":"1px","bs":"solid","sh":false,"radius":"12px"}`).

**3. Fix the W85-4 badge specificity (P-301).**
The `.6rem` `.zpb-pstat` rule exists, but the rendered badge spans are overridden by the more-specific `.68rem` `.zpb-pcard-stats span` rule (0-1-1 beats 0-1-0) → badges render at 14.28px, not the claimed 12.6px. Fix the specificity so the `.6rem` rule wins. Names do NOT clip (that part passed) — only the size is wrong.

**4. Apply the R2-16 guard casing (P-302).**
The draft dropdown reads "Offensive Guard" (capital G); the claim is "Offensive guard" (lowercase g). Apply it (WV_NAMES.OG → Offensive guard, with ZPB_FULL + SLOT_FRIENDLY following).

**5. Correct the stale battery counts in the delivery docs (P-304).**
The docs state counts that don't match the shipped Round 3 file: 14 scripts (the file has 26 non-empty `<script>` blocks, all parse); 11 screenshots (the script produces 10, e1–e10 — the 11th file `e11-mobile-banner.png` exists but no shipped script produces it); the 28/28 claim is from the Round-1 (w55-based) file and doesn't apply literally to the Round-3 file (independent re-run: 25/30). Correct the counts (or re-run the batteries against the shipped file and record the actual counts). Docs only — don't change the product for this.

## The two that need the Owner (not yours to decide alone)

**6. Re-anchor the w77 battery (P-303).**
The w77 battery gives 80/84 against w85; all 4 failures are intentional w85 changes or a stale marker: (a) V1 — the dropdown orders SS before FS (w85 is consistent; the battery expects the stale w76 order) — this needs the Owner to confirm SS-before-FS is correct; (b) V8b/V8c — the stage labels are the exact stage in the Owner's words ("BACK TO REGULAR SEASON REVIEW", "SEASON REVIEW" — "WEEK 17" appears 0 times in w85); (c) V13 — the 5 `details.zpb-dd` render with NO box (computed border 0px none, transparent), so the class-based probe is a stale marker — either change the probe to computed-style or strip the `zpb-dd` class from those five dropdowns. Don't re-anchor silently — the battery is the acceptance gate. The V1 order is the Owner's call; the re-anchor itself is yours (you built the battery) or a council seat's.

**7. Google Fonts external load vs offline (P-305).**
The product loads Google Fonts externally. In a network-blocked environment they fail (`ERR_TUNNEL_CONNECTION_FAILED`) — that's the sole cause of the w85r3_battery "console clean" failure (23/24, all 23 substantive assertions passed). More importantly, it's a standing tension with the offline requirement (local-first). The Owner decides: bundle the fonts locally (preferred for offline) or accept the external load. Don't silently bundle or silently accept.

## The verification that still needs a playoff run (P-306, council's job, not yours)

Two P-285 items couldn't be confirmed live because both simmed seasons missed the playoffs: the Draft Command Center appearing on Season Review, and the SIM PLAYOFFS loss path (a playoff participant who loses goes straight to the Super Bowl). The council will run a playoff-qualifying season to confirm both. Nothing for you to build here — but if the DCC turns out to be gated on something you didn't intend, they'll file it.

## What passed (so you know what NOT to redo)

The full game flow end to end, autosave/restore, seeds, pregame, back bars, banner gating, scroll landings, null grades, all five Owner comments (4/5 fully verified live), all eight surviving systems, and zero JS page errors in any run. The w77 battery's 80 passing assertions (including all 20 V4 command-center sub-assertions) held. Don't touch those.
