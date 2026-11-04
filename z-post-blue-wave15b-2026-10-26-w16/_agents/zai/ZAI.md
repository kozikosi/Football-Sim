# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push from the sandbox; work reaches GitHub via the Owner (or Beam) running `tools/import-zip.sh zai <zip>` or `tools/seat-save.mjs`. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** Z-post-blue waves 8–15B (headless verify suites v8..v15 in `tools/`); style guide; reweight brief; the wave-15B "draft cannot die" hardening pattern.

## Current work
- **Wave 15B shipped this chat** (26 Oct, build md5 `d053d4fe194a3f56525c89ca99799fc5`, 1,259,393 B), built on the prior session's wave-15 build (`efbe8c53`, the "w14" root file the Owner opened in his browser).
- **P0 fixed by hardening:** the Owner's draft board went dead and the CPU panel silent on his machine (Sim to End still worked). No headless variant of his file reproduced it (hidden-tab, reduced-motion, second draft, real clicks — all green), so every failure path was closed: wave-14 cinematic gate restored (`done()` fires at the DRAFT fade), 1.5 s watchdog + 25 s stuck-overlay force-close, surfaced/retried kickoff errors, per-panel render guards with a minimal fallback board, per-tick `stepSlow` resilience. Suite proof: watchdog revived a draft with its kickoff timers manually killed.
- Round-9 directives shipped: ALL/NONE inline after the K chip (uppercase, left flow), shimmering team name by the logo, VS. ACTUAL NFL tab gated to the pre-season post-draft page, roster tab reorder (lineup → depth chart → ranking), `Name · POS · OVR (−beta)` lineup menus, flex-adjusted OVR replaces Wins, KR/PR rows unified with K/P, "0 wins" badge removed, group-scores caption removed, flex-dragged group scores tinted wine, returner explainer removed, smaller "CAN YOU GO", "How bold are you…", two explainer sentences removed.

## What the next session needs
- **Read first:** `deliveries/OWNER-ROUND-8-INTAKE.md` §H (round-9 ledger + the 7 interpretations awaiting veto); `START-OF-CHAT-ZAI.md` §3; this file.
- **Verify trio:** `tools/v15_verify.js` (35 checks) + `tools/v15_hardening.js` (7) + legacy `v14_verify.js` — all green on `d053d4fe`. W13-16's tree-family count differs from v13's expectation **on the prior-session build too** (pre-existing, not ours).
- **Do not redo:** the wave-14 cinematic timing law (CPU fires only at the DRAFT fade — v14 suite re-proves it on 15B); the team-filter auto-clear (already in `efbe8c53`, postcheck-pinned); KR/PR rows render only once a season exists (pre-existing gating, Owner saw them there).

## Files in this lane
- `deliveries/` intake ledger (§H latest), style guide, reweight brief, handoff, palette advisory
- `tools/` zpb_v15.py (wave-15B build module), v15_verify.js, v15_hardening.js, legacy suites v8..v14
- `evidence/` v15 board/roster/KR-PR screenshots + v14 cinematic states
- Not in the zip (sandbox-only): repro scripts `repro_draft.js` / `repro_variants.js`

## Rules that changed since REV 13
- No V23 naming in Z files (kept); no bulletin M-ids, no QUESTIONS file, no task ledger: use top-level `inbox/` on this branch (see `inbox/README.md`).
- New house pattern (wave 15B): when an Owner-visible failure cannot be reproduced headless, close **every** failure path (watchdog + surfaced catches + fallback render) instead of guessing the trigger; assert the closure in the suite.
