# Beam — merge plan checklist (advisory, for the Architect)

Base: v20 `31b7d61f…` (649,032 B). Donor: `77bb9ed5…` (650,127 B). Intake: `origin/council-intake` at `9ab0292` (182 files).

## Pre-merge — COMPLETE (verified 20 Oct)

Merged build: `merged.html` — 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`
Branch: `merge/v20-donor` at `ff8c05a` (pushed to origin). Build script: `tools/build-merged.js` (in branch).
Verification: node --check PASS, rWeights 0, msChecked 0, nostack 2, color-scheme light dark (single declaration), doctype 1, cpuPick donor keywords present (6/3/2/6), Math.random 56 (donor count), funcdiff confirms 431 common + 4 donor-only helpers.

## Pre-merge (original checklist)
- [ ] Read origin/council-intake; verify both build sha256 match (31b7d61f… / 77bb9ed5…).
- [ ] Create merge/v20-donor from 9ab0292.
- [ ] Run funcdiff-full.js --hashes to confirm 408/391/17 split.
- [ ] Confirm checkRewards body identical (0a000ce52783) — boundary artifact, not a real diff.
- [ ] Decide #glue Variant A vs B (council recommends A; nostack guard depends on v20 #draftTable2 markup at line 425).
- [ ] Decide color-scheme: light vs light dark (council recommends light dark).
- [ ] Decide render100: donor drop-in vs compute rWeights (council leans donor drop-in).
- [ ] Decide renderSeasonTabInner markup branch: (a) keep v20 markup → 13/2/2 split + null-guard setActiveTab view loop, OR (b) adopt donor Season surface wholesale → 14/1/2 but much larger scope.
- [ ] Decide wrapper surgery: relocate 372 B base style, delete 173 B duplicate markup (158 + 15 stray tail).

## Merge execution
- [ ] Fix double-wrapped wrapper (relocate base style, delete duplicate markup + stray tail).
- [ ] Apply 17-function oracle (14 donor / 1 v20 / 2 synthesize), adjusted for markup branch.
- [ ] Apply #glue phone block (Variant A or B, per decision).
- [ ] Synthesize CSS (#style0 color-scheme + #style1 union, dedup by selector).
- [ ] Keep 4 donor-only helpers (seasonToast, goSeason, meetingInfo, meetingTagText).
- [ ] Keep v20-only updateStepper.
- [ ] Keep cpuPick from donor (94b878605b73).
- [ ] Keep render100 from donor (cc1016eacc78).
- [ ] Add .gitattributes (* text=auto, product builds -text) before pinning.
- [ ] Run node --check on extracted core.
- [ ] Run funcdiff-full.js --hashes to confirm 8 shared math functions + 6 constants + donor cpuPick pin unchanged.
- [ ] Push merge/v20-donor only. No main push, no force-push, no tag.

## Post-merge
- [ ] Verifier runs post-merge-smoke.mjs (exit 0, A=true, D=true, B=0, C=0).
- [ ] Verifier creates verified-merge-<hash> tag.
- [ ] Preserve old main: tag seed-old-remote at 49fafc2, push.
- [ ] Rename main → seed-old-remote, merge/v20-donor → main, set default.
- [ ] Verify origin/main == verified-merge-<hash>.
- [ ] Update STATUS.md build-hash line (verifier only).
- [ ] Begin SIM-CORE markers + headless entry points per tests/CONTRACT.md v2.
- [ ] Re-measure validate.js targets if weights changed.

## Notes
- Persistence: out of scope for merge (absent from both builds).
- SIM-CORE markers: build on merged hash, not alongside.
- Harness scripts (pw4.js, validate.js, phone.js, funcdiff.js, run_all.sh) do not exist yet — draft them post-merge.
- Question pack: 4 [BLOCKING] in intake copy, 10 in working copy; neither is a merge gate.
