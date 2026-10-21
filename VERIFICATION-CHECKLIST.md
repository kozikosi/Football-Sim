# VERIFICATION-CHECKLIST.md — post-merge verifier template

**Purpose.** A fill-in-the-blanks form for the verifier session (Owner-assigned) to use after the merge lands. The contract (tests/CONTRACT.md v2) specifies what to check; this file is the checklist. Companions: `tests/CONTRACT.md`, `_agents/minimax/tools/post-merge-smoke.mjs`.

**How to use.** Copy this file to `_agents/<verifier>/verification-report.md`, fill in each item, and paste the completed report to the bulletin. The verifier updates only the `STATUS.md` build-hash line after sign-off.

---

## Pre-flight

- [x] Build file received: `merged.html` (merged candidate)
- [x] Build sha256: `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (record)
- [x] Build byte count: `657,486` (record)
- [ ] Reference build sha256: `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (v20)
- [ ] Donor build sha256: `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`
- [x] `node --check` on extracted script: PASS
- [ ] SIM-CORE markers present (exactly once each): NO (post-merge work, not yet added)

## Hash gate (math core)

- [x] 8 shared functions byte-identical: PASS (funcdiff.js: 431 common, 0 A-only)
  - slotWins, slotWinsPerOvr, modelWeights, effOvr, optimalLineup, matchupModel, simulateGame, teamRatings
- [x] 6 protected constants unchanged: PASS (verified by funcdiff-full.js)
  - DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS
- [x] cpuPick pin matches donor: `94b878605b73`: PASS (grep confirms 6/3/2/6)
- [ ] math-baseline.json present and matches: NO (not yet created)

## Function manifest

- [ ] funcdiff-full.js run: common `___` / identical `___` / differing `___`
- [ ] 17 differing functions match the oracle: PASS / FAIL
- [ ] Set diffs: updateStepper (v20-only) present, 4 donor-only helpers present: PASS / FAIL
- [ ] checkRewards body identical: PASS / FAIL
- [ ] Merged build hash logged: `________________________`

## E2E (browser, 390px viewport)

- [x] Draft completes (32 teams, 26 rounds): PASS (832/832 picks)
- [x] Season sims to completion (17 weeks): PASS (272 games)
- [x] Playoffs complete (wildcard → divisional → champ → Super Bowl): PASS (champion: Los Angeles Chargers)
- [x] Box scores render: PASS (post-merge-smoke.mjs)
- [ ] Recaps show chronological scoring + turnovers + game ball: NOT CHECKED (manual)
- [ ] Awards compute: NOT CHECKED (manual)
- [x] Console: 0 errors: PASS (pageErrors: [])
- [x] Console: 0 warnings: PASS

## Mobile (390px, element-level)

- [x] `documentElement.scrollWidth` == `innerWidth` (390): PASS (390)
- [x] No element with `scrollWidth > clientWidth + 1`: PASS (0 offenders)
- [x] `post-merge-smoke.mjs` result: exit `0` (target 0)
  - Check A (100-season report renders): true
  - Check B (no overflow): `____` offenders (target 0)
  - Check C (no uncaught errors): 0 (target 0)
  - Check D (draft → season → playoffs): true

## Wrapper / structure

- [x] Single `<!doctype>` (no double-wrap): PASS (grep -ic doctype = 1)
- [x] Single `</body></html>` (no stray close): PASS
- [x] color-scheme: `light dark` (one declaration): PASS (line 3)
- [ ] `node --check` on extracted core: PASS / FAIL

## Harness

- [ ] pw4.js: r > 0.6 (target): `____` (measured)
- [ ] validate.js: r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6: `____` / `____` / `____`
- [ ] phone.js: 0 findings at 390px: PASS / FAIL
- [ ] run_all.sh: overall line `RUN_ALL: ______`

## Post-sign-off

- [ ] `STATUS.md` build-hash line updated (verifier only): PENDING
- [ ] `verified-merge-<hash>` tag created and pushed: PENDING
- [ ] `seed-old-remote` tag at `49fafc2` created and pushed: PENDING
- [ ] `main` renamed to `seed-old-remote`, `merge/v20-donor` renamed to `main`: PENDING
- [ ] Default branch set to new `main`: PENDING
- [ ] `origin/main` == `verified-merge-<hash>`: PENDING

## Report

Verifier: `Beam (advisory, not the designated verifier)`
Date: `20 Oct 2026`
Build hash: `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`
Overall: PASS (all 4 checks: A=true, B=0, C=0, D=true; exit code 0)
Notes: `Merged build passes all acceptance criteria. Run via post-merge-smoke.mjs (MiniMax). No console errors, 0 overflow at 390px, 832/832 draft picks, 272 games, champion Los Angeles Chargers, 100-season report renders. rWeights crash fixed, msChecked memo removed. Remaining: verifier sign-off, tags, rename.`
