# Council — review Z.ai w75 + Claude's latest (2026-11-05)

Kosi: send this to the council. It directs the council to review the latest work from Z.ai (w75) and Claude (tsconfig + cleanups + tsc errors). The Z.ai w75 P-items are already filed (P-275–P-278); the Claude items are new in §2. Saved to the repo as `council-review-prompt-zai-claude-2026-11-05.md`.

---

**To the council:** review the latest work from Z.ai and Claude. The work is filed as P-items in _agents/PRIORITIES.md (P-275–P-278 for Z.ai w75; the Claude items in §2 below are new — take them from this prompt or file them as P-items). Review format: read the work, check it against the repo, file `inbox/<UTC>-<seat>-<ID>-review.md` with `REVIEW-OF:`, `VERDICT: ok | improved | rejected`, and the improved text if any. Three reviews (ok/improved) mark an item REVIEWED. No seat reviews the same item twice. Never hardcode a wave number — find the LATEST wave file (highest w-number with a product HTML on gh-pages) and verify it by listing.

**§1 — Z.ai w75 (P-275–P-278, already filed).**
- **P-275 (P1):** Review the w75 non-product answers (M1–M15). Verify each disposition: M1 (top30→skilled rename; strike "naive best-OVR"; targets apply to the AVERAGE of the class), M6 (the two stale-reference replacements + the test-count reconciliation — the test-count arithmetic still needs pinning: 288 full, 286 = 288−2 storage-env, 284 = 286−2 golden-seasons), M7 (the BUILD-1+2 verdict: approve as drafts, do not merge yet — confirm the BUILD-2 envelope field-order flag), M9 (seed-share UX = profile-stored seeds), M11 (telemetry headline inline caveat), M12 (76 Pancakes on new docs; shell HTML naming untouched), M13 (nothing needing Claude's w74 rulings touched). The byte-count flag is RESOLVED (the live file is 1,826,882 B; the build report's 1,826,921 B was a typo).
- **P-276 (P0):** Verify the w75 reproduction (M14) + resolve the two-cluster split. Re-run Z.ai's exact commands on 425f72a (baseline N=1000, midFloor ladder, policy battery) and test his two-cluster hypothesis (slot handling in the draft loop — the low cluster applied the skilled policy's position priorities BEFORE the flex-penalty pass, the high cluster after it; secondary suspect slotForUser's emergency path). Log draftSim.pos at the first deviation. This is the Q10 reproduction for w75.
- **P-277 (P1):** Apply the M6 stale-reference dispositions to the w74 docs (after P-275 reviews them).
- **P-278 (P1):** The three veto-point interpretations (review + recommend; the Owner decides). (1) The slot-picker chip keeps its `−10 FLEX` contrast. (2) The cutdown list keeps the 40%-of-games sample floor + reads TRUE OVR for the <80 test. (3) The rating scale rides the translation door (average displayed rating = database median 76).
- The product (w75 HTML, md5 9f990ab74fb0acba9e55b82395e60647, live on gh-pages e61ae6cd): verify the test claim (134 pass / 0 fail) if you can run the battery; the Owner knows the UI/UX changes.

**§2 — Claude's latest (new — review now).**
Claude's last chat landed, on architect/engine-and-seats:
- NOW.md corrected (`3f976d8`): P-262 done, no longer NEXT.
- tsconfig landed (`b27571a`): Z.ai's w74/04 draft, unchanged. It is the only tsconfig on gh-pages. Verify it is byte-identical to Z.ai's w74/04-contracts-fixes/colors/tsconfig.json (the latest wave, w75, has no tsconfig).
- tsc --noEmit (VERIFIED by Claude): 0 config errors, 305 type errors, almost all strict-mode "possibly undefined." Per file: drives 37, schedule 32, seasonrun 27. That is Z.ai's 301 plus 4 in store, keys, weekmap (which Z.ai's contract fixes would cure). Claude fixed nothing, as asked. Verify the error breakdown (re-run tsc if you can, or check the counts against the files).
- Cleanups (`c577fb2`): V22-Suggestions.md → _archive/v22-suggestions.md (byte-identical move). AGENTS.md Figma line now says Figma is NOT available + its two path references updated to the archived file. Project boot doc now reads "Only the Architect builds the product." The repo's claude/00-READ-FIRST.md is a 3-line pointer without that line, so nothing changed there. Verify the V22 move is byte-identical and the AGENTS.md edits are correct.
- typescript + vite are NOT devDependencies yet (Claude installed them with --no-save; package.json is untouched). Advise: should they be added as devDependencies (so a clean checkout can run tsc/build without a --no-save install)? The Owner decides; give a recommendation.

**§3 — The F1 ruling + contract fixes (review when they land).**
Claude's next chat rules F1 (the dual AppState/Action pairs — store.ts vs appstate.ts; F1 unblocks the pattern freeze) and lands the contract fixes (Z.ai's w74/04; F5–F10 may be applied as drafted; the F5 ruling is Claude's). When they land on architect/engine-and-seats, review the ruling (is the canonical pair the right call? is the consolidation sound?) and the contract fixes (do they cure the 305 errors without changing behavior?). File the reviews the same way.

**Standing rules:** Only the Architect builds the product. Work comes from _agents/PRIORITIES.md — never assign work to a named agent. Use VERIFIED / REPORTED / INFERRED / UNKNOWN. Do not re-file the Fix-It Board or the cinematic intents (the Owner is handling them). Do not delete old shells (Architect-led at cutover).
