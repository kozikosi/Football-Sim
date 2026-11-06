# UPDATE-README — w76 (the Owner's command-center round + veto (a) + veto (c) + M6)

**What this package is:** wave 76 of the Z-post-blue shell track, built from the w75 bytes (md5 `9f990ab74fb0acba9e55b82395e60647`, re-verified), plus the M6 doc pass over the w74 tree. Everything in this zip is delivered files — nothing is pushed; the Owner relays or Beam imports (`tools/import-zip.sh zai <zip>`).

## The product

`Football-Sim-Z-post-blue-w76.html` — md5 `4f363452a4ad33709244ca08d4ab3b00` · 1,830,164 B.

What changed (the Owner's words are the law; the full itemization is in the intake ledger):

1. DRAFT COMMAND CENTER: "EVERY ROOM BELOW A B · BEST TO WORST" removed — the room cards stand alone.
2. "THE LINE IS THE AVERAGE SEASON (76) · BELOW 80 OVR · KICKER OR HIGHER ON THE WIN MATH" removed — the three rules still run in the cut math.
3. "Cutdown Day" — centered, Cinzel Decorative, the larger subtitle size (measured: 12.6 px retired line < 16.8 px subtitle < 19.32 px panel title).
4. "PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO 20-0" — the 20-0 shimmers in the user's team color (the fxshine sweep on the pack ink; static under reduced motion).
5. The "-x vs his x OVR" delta retired from every card.
6. Both numbers on every cutdown card: the OVR as a badge of the position badge's own class (measured equal) and the Season Rating at about the badge size (0.72 rem vs the badges' 0.62 rem).
7. **Veto (a):** the lineup slot-picker chip reads just `−10` — no FLEX anywhere on it; NATURAL keeps its word.
8. **Veto (c):** the translation stands; the delta is gone; **the median is the normally-drafted pool's** (the top 1,024 picks of the draft-eligible board — measured 77, up from the all-database 76), **produced once** and cached, never recalculated per draft.
9. **Veto (b): held** — the 40 %-of-games floor + TRUE OVR test keep standing until the Owner calls it.

## The M6 doc drop (`w74-docs-m6/`)

The w74 docs retargeted: 80/25/10 → 90/35/25 + P(20-0) ≈ 1–2 %; the parity band re-labeled the real-NFL reference (3.07 ± 0.35) — the target is derived in M5; timeline.md line 33; the test-count basis in every touched doc's header. 11 files at their gh-pages paths, 27 asserted edits, `M6-CHANGES.md` (the manifest) + `w74-m6.patch` (the unified diff). `results/b-top30-*.json` untouched.

## How to install

1. `Football-Sim-Z-post-blue-w76.html` → the gh-pages root (beside its predecessors).
2. `w74-docs-m6/w74/…` → the same paths on gh-pages (or apply `w74-m6.patch`).
3. `tools/w76/*` → `z-post-blue-wave76-2026-11-06-w76/tools/w76/` (the build script + the battery + the standing suites, re-pointed).
4. `_agents/zai/*` → the lane on `council/zai` via import-zip.

## Verify

`node tools/w76/verify_w76.js` against the w76 file (84/84), plus the re-pointed standing suites (`w69_owner.js` 33, `w69_dropdowns.js` 14, `w68_names_w69.js` 14, `w67_teams_w69.js` 8) — 153 pass / 0 fail, zero page errors. Evidence: `shots/`.
