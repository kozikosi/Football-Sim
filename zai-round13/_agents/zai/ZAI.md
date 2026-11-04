# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, **chat only: no git access and no access to the Owner's files**; the Owner relays its output via the end-of-chat zip (Beam: `tools/import-zip.sh zai <zip>` or `node tools/seat-save.mjs`).
- **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026).
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype (waves 1–18, verify suites v8..v11); FB/Punter math (REWEIGHT-BRIEF §7b, re-validated on w24 this session); style guide + Owner playbook; headless Playwright engine audits.

## Current work (round 13, 2026-10-27)
The Owner brought his senior-engineer friend's interview feedback and directed: *think about the architecture first; for now, solve the math problems for the engine.* Delivered in one package (`zai-round13-2026-10-27.zip`):
- **ENGINE-MATH-2026-10-27.md** — the exact "Simulate Season" chain (every game simulated; stats accumulated per game; no shortcut fake); measured per-game ≈0.65–1.1 ms, per-season ≈0.18–0.29 s, 100-season loop ≈20–40 s in-tab (31.2 s for 10 under headless timer-throttling); the Drake Maye "appeared as WR" class solved (6 full drafts scanned: 0 illegal placements, 0 QB misplacement; the only two reachable paths quoted with anchors + a two-line guard + badge law + standing legality test); KI-005 keep-direction RESOLVED for PreColors (floors+bounded present, anchors quoted); KI-006 rWeights VERIFIED ABSENT (0 grep + clean 10-season run); P-030 RNG inventory (38 lines / 56 sites, categorized) + P-031 drop-in seeded RNG design; P-141 FB/P math validated on w24 (FB90 +0.034, P90 +0.208 — brief's numbers reproduce); full 28-slot hierarchy re-measured on w24 (P-140 baseline: QB 2.541 → CB1 1.443 → … → FB 0.066; TE2 confirmed plan-gated ≈0 at 70); realism receipt (22.6 pts/team, 55.8 % home, 26.7 % one-score).
- **ARCHITECTURE-PATH-2026-10-27.md** — the structural answer to the friend's questions: no-framework today → extract `sim-core` (typed, seeded, headless) as Phase A → persistence (localStorage→D1/Postgres, seed-based replay) + OAuth Phase B → SvelteKit/Next shell + GitHub Actions → Cloudflare Pages/Workers Phase C → second-sport pack Phase D; single-file HTML stays the build ARTIFACT; anti-recommendations included (no framework rewrite before extraction, no AWS first, no backend before seeded RNG, never own auth).
- **inbox/** — claims+work for P-141, P-030, P-133 (all VERIFIED, evidence files in `_agents/zai/evidence/round13/`).
- **`_agents/owner-notes/2026-10-27-N3-verbatim.txt`** — the Owner's round-13 message verbatim + cluster map (P-188/R-ZAI-8).

## What the next session needs
1. **Owner's verdicts on the two memos** (architecture path + engine math). The friend's three UI items (badge law, dark-hover contrast, draft-button affordance) are PROPOSED as PRIORITY+ lines in the bulletin — they need PRIORITIES rows (Owner/Architect re-rank) before anyone builds them.
2. **If the Owner approves the seeded RNG (P-031 design)**: it is the prerequisite for P-140's 1,000-season sensitivity run and for "share your seed" permalinks; migration order is in the P-030 work file.
3. **The cpuPick/slotForUser QB-exclusion guard** (two lines, P-133 work file) + the badge law + the 10-line legality test are ready for review chain → Architect.
4. Standing faults the Owner reported re-test on his machine: Team Comparison render, Madden Rankings blank (w18-era reports) — re-test on current builds.

## Do not redo
- FB/P math validation (this session, evidence saved); the PreColors draft-legality scan (6 drafts, clean); KI-005/KI-006 dispositions for the PreColors lineage; the RNG inventory.
- The hierarchy re-measure (stage6 file) — cite it for P-140 instead of re-running.
- `window.league100` does not exist (`league100` is a lexical global — poll the bare identifier); headless `setTimeout` throttling makes `runLeague100` look 10–17× slower than direct `liteSeason` timing — measure the engine with direct calls.

## Files in this lane
- `deliveries/` — ENGINE-MATH-2026-10-27.md, ARCHITECTURE-PATH-2026-10-27.md (+ earlier: HANDOFF-FOR-CLAUDE REV 13, STYLE-GUIDE, REWEIGHT-BRIEF REV 2, playbook, governance, wisdom, build report, PALETTE-ADVISORY)
- `evidence/round13/` — stage1..stage7 raw outputs (boot/pool, draft legality ×2 builds, liteSeason timing, runLeague100 N=10, FB/P wins, 28-slot hierarchy, RNG inventory)
- `tools/` — build/verify scripts (this session's runs used packaged scripts; stage JS + RNG python included in the zip root `scripts/` for reproducibility)
- Not copied: wave-18 product bytes (Owner holds `z-post-blue-wave18-2026-10-26.zip`); evidence screenshots on `main`.

## Rules that changed since last session
None. Standing reminders honored this session: work via `inbox/` files (no invented IDs — P-141/P-030/P-133 are real rows; the friend's UI items went in as PRIORITY+ proposals); Owner's raw message captured verbatim under `_agents/owner-notes/`; every claim labelled VERIFIED/REPORTED/INFERRED/UNKNOWN; no product edits (Architect-only).
