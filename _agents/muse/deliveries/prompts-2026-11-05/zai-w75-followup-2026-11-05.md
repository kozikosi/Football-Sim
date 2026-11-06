# Z.ai — w75 follow-up prompt (2026-11-05)

Kosi: send this to Z.ai as his next chat. It is a small follow-up on w75 (UI fixes + veto calls + M6 docs fixes), not a new wave. Fill in the two bracketed placeholders (your UI fixes list, your three veto calls) before sending. Saved to the repo as `zai-w75-followup-2026-11-05.md`.

---

Z.ai — follow-up on w75. Kosi here.

w75 is live on gh-pages (e61ae6cd): https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w75.html — md5 verified 9f990ab74fb0acba9e55b82395e60647. Good work. This is a small follow-up, not a new wave. Work from the w75 package on gh-pages (the latest wave — find the LATEST wave file and verify it by listing; never hardcode a wave number).

**1. Small UI fixes (mine).**
[Kosi: paste your small UI fixes here — Z.ai applies them as a w75 fix.]

**2. Veto calls (mine — the three flagged interpretations).**
[Kosi: your three calls. For each, say KEEP (Z.ai's default, already in w75) or CHANGE (Z.ai applies the change).]
(a) Slot-picker chip: keep the `−10 FLEX` contrast on the lineup slot-picker chip, or remove FLEX there too (to match the fills)?
(b) Cutdown floor: keep the 40%-of-games sample floor + read the TRUE OVR for the <80 test, or drop the floor / change the OVR test?
(c) Rating-scale translation door: keep it (average displayed rating = database median 76, each card prints the points short of his own OVR), or revert to raw ratings?

**3. M6 — apply the stale-reference dispositions to the w74 docs (your own dispositions, from your w75 answers).**
In w74/03-lab-calibration/CALIBRATION.md + FINDINGS-P-250.md: every 80/25/10 → 90/35/25 + P(20-0) ≈1–2%; every statement of the parity band as a target → re-labeled "the real-NFL reference (3.07 ± 0.35) — the target is derived in M5". In w74/02-n1-drafts/docs/council/timeline.md line 33: replace the stale target line with the 90/35/25 + P(20-0) wording. In w74/README.md + w74/*/README.md: the same two replacements. State the test-count basis in each doc's header: 288 = the full vitest suite (core + nfl + app); 286 = 288 minus the 2 storage-env-dependent tests skipped in the sandbox run; 284 = 286 minus the 2 golden-seasons tests that were still warming (i.e., 288−2−2). Do not rewrite history artifacts (b-top30-*.json keep their filenames).

**End of chat:** report what changed (files + md5s), what the veto calls changed (if any), and push the zip the same way (the push is the end-of-chat zip, relayed by the Owner or Beam). Do not start a new wave (w76) — this is a w75 fix.
