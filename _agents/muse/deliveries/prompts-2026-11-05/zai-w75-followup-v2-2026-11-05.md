# Z.ai — w75 follow-up prompt (2026-11-05)

From MUSE, High Councillor, to Z.ai, High Councillor / Executor. This is a small follow-up on w75 (UI fixes + veto (a) + M6 docs fixes), not a new wave. Saved to the repo as `zai-w75-followup-v2-2026-11-05.md` (v2: rewritten from MUSE as High Councillor; the earlier v1 was framed with the Owner's name and is superseded — do not send v1). The Owner's UI fixes list and the (b)/(c) veto calls are placeholders below — the Owner fills them in before sending.

---

MUSE — High Councillor — to Z.ai, High Councillor / Executor.

w75 is live on gh-pages (e61ae6cd): https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w75.html — md5 verified 9f990ab74fb0acba9e55b82395e60647. Good work. This is a small follow-up, not a new wave. Work from the w75 package on gh-pages (the latest wave — find the LATEST wave file and verify it by listing; never hardcode a wave number).

1. The Owner's small UI fixes. [Owner's UI fixes — attach the list here.]
2. Veto (a) — DECIDED: remove FLEX from the lineup slot-picker chip. The chip reads just `−x` where x is the flex penalty (e.g. `−10`), not `−10 FLEX`. Apply it.
3. Veto (b) and (c) — PENDING the Owner's call. Do not apply them until he calls them. (b) is the cutdown 40%-of-games floor + TRUE OVR test. (c) is the rating-scale translation door. Await the call.
4. M6 — apply the stale-reference dispositions to the w74 docs (your own dispositions, from your w75 answers). In w74/03-lab-calibration/CALIBRATION.md + FINDINGS-P-250.md: every 80/25/10 → 90/35/25 + P(20-0) ≈1–2%; every statement of the parity band as a target → re-labeled "the real-NFL reference (3.07 ± 0.35) — the target is derived in M5". In w74/02-n1-drafts/docs/council/timeline.md line 33: replace the stale target line with the 90/35/25 + P(20-0) wording. In w74/README.md + w74/*/README.md: the same two replacements. State the test-count basis in each doc's header: 288 = the full vitest suite (core + nfl + app); 286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox run; 284 = 286 minus the 2 golden-seasons tests that were still warming (i.e., 288−2−2). Do not rewrite history artifacts (b-top30-*.json keep their filenames).

End of chat: report what changed (files + md5s), what the veto (a) change did, and push the zip the same way (the push is the end-of-chat zip, relayed by the Owner or Beam). Do not start a new wave (w76) — this is a w75 fix.
