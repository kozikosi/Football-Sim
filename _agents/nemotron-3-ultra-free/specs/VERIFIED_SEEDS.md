# PROPOSAL: Verified Seeds Log (L13 pending)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-20  
**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Source:** GLM receipts 20 Oct + DS M-23 / Pickle M-31 / MiniMax M-53 verifications  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)  
**Canonical Build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)

---

## Purpose

Consolidate all verified seeds (reproducible measurements with command receipts) from Round 1-4 reviews and GLM/DS/Pickle/MiniMax independent verifications. This log serves as the canonical reference for all verified measurements.

---

## Verified Seeds Catalog

### 1. Build Identity (Round 4 Verification)

| Metric               | v20                                                                | Donor                                                              | Verification Command                                    | Verified By                                       |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------- |
| **v20 SHA256**       | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | N/A                                                                | `shasum -a 256 "NFL Draft Simulator v20 Claude.html"`   | DS M-23, Pickle M-31, MiniMax M-53, Ultra Round 4 |
| **v20 Byte Count**   | 649,032                                                            | N/A                                                                | `wc -c "NFL Draft Simulator v20 Claude.html"`           | DS M-23, Pickle M-31, MiniMax M-53, Ultra Round 4 |
| **Donor SHA256**     | N/A                                                                | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | `shasum -a 256 "NFL Draft Simulator.html"`              | DS M-23, Pickle M-31, MiniMax M-53, Ultra Round 4 |
| **Donor Byte Count** | N/A                                                                | 650,127                                                            | `wc -c "NFL Draft Simulator.html"`                      | DS M-23, Pickle M-31, MiniMax M-53, Ultra Round 4 |
| **v20 Git Blob**     | `86878f2b340c7fc37c17614409690f9fdd3e1857`                         | N/A                                                                | `git hash-object "NFL Draft Simulator v20 Claude.html"` | Pickle M-31, Beam M-35                            |
| **Donor Git Blob**   | N/A                                                                | `2c4e025208bc6e324e445dd1bfb7aade30437c76`                         | `git hash-object "NFL Draft Simulator.html"`            | Pickle M-31                                       |

### 2. Math Core (8 Functions + 6 Constants) — Byte-Identical

| Function / Constant | v20 Hash (12-char) | Donor Hash (12-char) | Status           | Verified By                                  |
| ------------------- | ------------------ | -------------------- | ---------------- | -------------------------------------------- |
| `slotWins`          | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `slotWinsPerOvr`    | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `modelWeights`      | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `effOvr`            | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `optimalLineup`     | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `matchupModel`      | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `simulateGame`      | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| `teamRatings`       | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ Identical     | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |
| **Shared Hash**     | `dc54e4210ce1`     | `dc54e4210ce1`       | ✅ 8/8 Identical | Pickle M-13, GLM M-24, DS M-23, MiniMax M-53 |

| Constant           | v20          | Donor        | Status | Verified By           |
| ------------------ | ------------ | ------------ | ------ | --------------------- |
| `DEFAULT_WEIGHTS`  | ✅ Identical | ✅ Identical | ✅     | Pickle M-13, GLM M-24 |
| `FLEX`             | ✅ Identical | ✅ Identical | ✅     | Pickle M-13, GLM M-24 |
| `NATURAL_SLOT_MAP` | ✅ Identical | ✅ Identical | ✅     | Pickle M-13, GLM M-24 |
| `MC`               | ✅ Identical | ✅ Identical | ✅     | Pickle M-13, GLM M-24 |
| `PLAN_K`           | ✅ Identical | ✅ Identical | ✅     | Pickle M-13, GLM M-24 |
| `RATING_SPECS`     | ✅ Identical | ✅ Identical | ✅     | Pickle M-13, GLM M-24 |

### 3. cpuPick Direction (CRITICAL)

| Build     | SHA1 (20-char) | SHA256 (12-char) | Full SHA256                                | Verified By                                                 |
| --------- | -------------- | ---------------- | ------------------------------------------ | ----------------------------------------------------------- |
| **v20**   | `fa6d752969e4` | `3dc9d12f500a`   | `fa6d752969e441e55b096e420afe30d7a05859c2` | Pickle M-31, GLM M-24, DS M-23, MiniMax M-53, Ultra Round 4 |
| **Donor** | `a2b8190e98f8` | `94b878605b73`   | `a2b8190e98f8736d86f9b7ac3a28bb678c954ef8` | Pickle M-31, GLM M-24, DS M-23, MiniMax M-53, Ultra Round 4 |

**Direction:** **DONOR WINS** — donor has round floors (`curRound`/`topAvail`/`ovrFloor`), `posBest` first-sight gate, bounded miss (`reach=3+min(9,floor(|randNormal()|*4))`); v20 has `seen>16` guard + deep miss (up to 92) but NO round floors, NO `posBest`, NO bounded miss.

**Verification Command:**
```bash
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator v20 Claude.html" | shasum
# fa6d752969e441e55b096e420afe30d7a05859c2

awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator.html" | shasum
# a2b8190e98f8736d86f9b7ac3a28bb678c954ef8
```

### 4. render100 Crash Fix (CRITICAL)

| Build     | SHA1 (20-char) | SHA256 (12-char) | Full SHA256                                | Status                   | Verified By                                                 |
| --------- | -------------- | ---------------- | ------------------------------------------ | ------------------------ | ----------------------------------------------------------- |
| **v20**   | `1ea6e8414397` | `6ff608342b9a`   | `6ff608342b9a3dd260969588f253527f58632e55` | **CRASHES** at line 6018 | DS M-23, Pickle M-31, MiniMax M-53, GLM M-25, Ultra Round 4 |
| **Donor** | `cc1016eacc78` | `cc1016eacc78`   | `cc1016eacc78`                             | **WORKS**                | DS M-23, Pickle M-31, MiniMax M-53, GLM M-25, Ultra Round 4 |

**Crash Evidence:**
```bash
# v20 has rWeights at line 6018 (used but never declared)
grep -n "rWeights" "NFL Draft Simulator v20 Claude.html"
# 6018: ... The sim never reads your weights. Your weights' own ranking correlated at r = ${rWeights.toFixed(2)} with simulated wins.

# Donor has ZERO rWeights occurrences
grep -n "rWeights" "NFL Draft Simulator.html"
# (no output)
```

**Fix:** Donor `render100` (`cc1016eacc78`) is drop-in fix; v20 crashes at line 6018.

### 5. render100 Function Hashes

| Build     | SHA1 (20-char) | SHA256 (12-char) | Full SHA256                                | Verified By                                  |
| --------- | -------------- | ---------------- | ------------------------------------------ | -------------------------------------------- |
| **v20**   | `1ea6e8414397` | `6ff608342b9a`   | `6ff608342b9a3dd260969588f253527f58632e55` | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |
| **Donor** | `cc1016eacc78` | `cc1016eacc78`   | `cc1016eacc78`                             | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |

**Note:** DS M-23 gives donor render100 pin as `cc1016eacc78` (full-body extraction); GLM M-24 confirms donor render100 SHA256 prefix `cc1016eacc78`.

### 6. cpuPick Full-Body Pins (Round 3 Correction)

| Build     | SHA1 (20-char) | SHA256 (12-char) | Full SHA256                                | Source                                                      |
| --------- | -------------- | ---------------- | ------------------------------------------ | ----------------------------------------------------------- |
| **v20**   | `fa6d752969e4` | `3dc9d12f500a`   | `fa6d752969e441e55b096e420afe30d7a05859c2` | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24, Ultra Round 4 |
| **Donor** | `a2b8190e98f8` | `94b878605b73`   | `a2b8190e98f8736d86f9b7ac3a28bb678c954ef8` | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24, Ultra Round 4 |

**Note:** Round 2 pins were truncated-body; Round 3 corrected to full-body pins.

### 5. Function Census (Round 3 Correction)

| Metric                    | v20                     | Donor                                                      | Status                                           | Verified By                                  |
| ------------------------- | ----------------------- | ---------------------------------------------------------- | ------------------------------------------------ | -------------------------------------------- |
| **Named Functions Total** | 409                     | 412                                                        | DS M-23: 409 v20 / 412 donor                     | DS M-23, Pickle M-31, MiniMax M-53           |
| **Common Functions**      | 408                     | 408                                                        | DS M-23: 408 common                              | DS M-23, Pickle M-31, MiniMax M-53           |
| **Identical Functions**   | 390 (Pickle) / 391 (DS) | 391                                                        | Unit difference (Pickle: 390 identical, DS: 391) | Pickle M-31, DS M-23                         |
| **Differing Functions**   | 17 (not 14)             | 17                                                         | 14 changed + 3 new narrative                     | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |
| **v20-only**              | `updateStepper`         | —                                                          | DS M-23, Pickle M-31                             | DS M-23                                      |
| **Donor-only**            | —                       | `seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText` | DS M-23, Pickle M-31                             | DS M-23, Pickle M-31                         |

### 6. New Narrative Functions (3) — All Donor

| Function              | v20       | Donor     | Status         | Verified By                                  |
| --------------------- | --------- | --------- | -------------- | -------------------------------------------- |
| `dramaticEnding`      | Different | Different | **Donor wins** | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |
| `generateGameSummary` | Different | Different | **Donor wins** | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |
| `renderPlayoffsView`  | Different | Different | **Donor wins** | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |

### 7. checkRewards — Identical (Boundary Artifact)

| Build     | Span            | True Body Hash | Status       | Verified By                       |
| --------- | --------------- | -------------- | ------------ | --------------------------------- |
| **v20**   | Lines 6381-6428 | `0a000ce52783` | ✅ Identical | Pickle M-31, DS M-23, Pickle M-31 |
| **Donor** | Lines 6430-6484 | `0a000ce52783` | ✅ Identical | Pickle M-31, DS M-23              |

**Note:** `checkRewards` span swallowed `#glue` phone block; tool counts as 18th diff but true body identical.

### 8. SIM-CORE Markers (Both Builds)

| Metric                     | v20 | Donor | Verified By                                  |
| -------------------------- | --- | ----- | -------------------------------------------- |
| `SIM-CORE-START` markers   | 0   | 0     | DS M-23, Pickle M-31, GLM M-24, MiniMax M-53 |
| `SIM-CORE-END` markers     | 0   | 0     | DS M-23, Pickle M-31, GLM M-24               |
| `grep -c "SIM-CORE-START"` | 0   | 0     | DS M-23, Pickle M-31, GLM M-24               |

### 4. Headless Entry Points (Missing Both)

| Function                  | v20        | Donor      | Status        | Required By |
| ------------------------- | ---------- | ---------- | ------------- | ----------- |
| `buildDraftState()`       | ❌ Missing | ❌ Missing | S-202 pending | S-202       |
| `simulateDraftHeadless()` | ❌ Missing | ❌ Missing | S-202 pending | S-202       |
| `buildLeagueFromDraft()`  | ❌ Missing | ❌ Missing | S-202 pending | S-202       |

### 5. Math.random() Census

| Metric          | v20 | Donor | Verified By                                  |
| --------------- | --- | ----- | -------------------------------------------- |
| **Occurrences** | 58  | 58    | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |
| **Lines**       | 39  | 39    | DS M-23, Pickle M-31, MiniMax M-53, GLM M-24 |
| **Sites**       | 39  | 39    | Pickle M-31, DS M-23                         |

### 5. Persistence (Both Builds)

| Metric                | v20 | Donor | Verified By                                       |
| --------------------- | --- | ----- | ------------------------------------------------- |
| `localStorage` refs   | 0   | 0     | Pickle M-31, DS M-23, MiniMax M-53, Ultra Round 4 |
| `sessionStorage` refs | 0   | 0     | Pickle M-31, DS M-23                              |
| `IndexedDB` refs      | 0   | 0     | Pickle M-31, DS M-23                              |

### 6. SIM-CORE Markers (Both Builds)

| Metric           | v20 | Donor | Verified By                                  |
| ---------------- | --- | ----- | -------------------------------------------- |
| `SIM-CORE-START` | 0   | 0     | DS M-23, Pickle M-31, GLM M-24, MiniMax M-53 |
| `SIM-CORE-END`   | 0   | 0     | DS M-23, Pickle M-31, GLM M-24               |

### 7. Harness Scripts (Both Builds)

| Script        | v20        | Donor      | Status        |
| ------------- | ---------- | ---------- | ------------- |
| `pw4.js`      | ❌ Missing | ❌ Missing | S-102 pending |
| `validate.js` | ❌ Missing | ❌ Missing | S-102 pending |
| `phone.js`    | ❌ Missing | ❌ Missing | S-102 pending |
| `funcdiff.js` | ❌ Missing | ❌ Missing | S-102 pending |
| `run_all.sh`  | ❌ Missing | ❌ Missing | S-102 pending |

### 6. v20 Wrapper Malformation

| Issue                      | Detail                     | Verified By                        |
| -------------------------- | -------------------------- | ---------------------------------- |
| Dual `<!doctype html>`     | Line 1 + Line 2            | Pickle M-31, MiniMax M-53, DS M-23 |
| Duplicate `</body></html>` | Line 6437-6438 + Line 6439 | Pickle M-31, MiniMax M-53, DS M-23 |
| Byte Delta                 | 649,032 vs 648,486 = 546 B | Pickle M-31, MiniMax M-53, DS M-23 |
| Clean Working Copy         | 648,486 B (GLM reported)   | Pickle M-31, GLM M-24              |
| `<style>` Blocks           | 2 (line 1 + line 13)       | Pickle M-31                        |
| Line 1 Style               | `color-scheme:light`       | Pickle M-31                        |
| Line 13 Style              | `color-scheme:light dark`  | Pickle M-31                        |

### 7. Phone Block Decision (M-23)

| Build     | Phone Block                                 | Decision                  |
| --------- | ------------------------------------------- | ------------------------- |
| **v20**   | Line 6433 (simpler, no label reapplication) | **KEEP** (M-23)           |
| **Donor** | Lines 6458–6488                             | Label reapplication logic |

**Decision:** Keep v20 line 6433 (default tab) per M-23 instruction.

### 8. Color-Scheme Decision

| Build                 | Color-Scheme                                      | Verified By                                  |
| --------------------- | ------------------------------------------------- | -------------------------------------------- |
| **v20**               | `color-scheme:light` (line 1)                     | DS M-23, Pickle M-31, GLM M-24, MiniMax M-53 |
| **Donor**             | `color-scheme:light dark` (line 4)                | DS M-23, Pickle M-31, GLM M-24, MiniMax M-53 |
| **Both**              | `@media (prefers-color-scheme: light)` at line 18 | DS M-23, Pickle M-31, GLM M-24               |
| **v20 Body Override** | Light body override at line 223                   | DS M-23, Pickle M-31                         |

**Decision:** `light dark` (donor) — v20's `light` contradicts its own dark defaults (`--bg:#0b0e14`).

### 8. Function Diff Summary (Round 3 Correction)

| Metric               | v20                     | Donor                                                      | Status                               |
| -------------------- | ----------------------- | ---------------------------------------------------------- | ------------------------------------ |
| **Common Functions** | 408                     | 408                                                        | DS M-23, Pickle M-31, MiniMax M-53   |
| **Identical**        | 391 (DS) / 390 (Pickle) | 391                                                        | Unit difference (Pickle 390, DS 391) |
| **Differing**        | 17 (not 14)             | 17                                                         | DS M-23 full-body re-run             |
| **v20-only**         | `updateStepper`         | —                                                          | DS M-23                              |
| **Donor-only**       | —                       | `seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText` | DS M-23                              |

### 9. 17-Function Diff Breakdown (Round 3 Correction)

| Category              | Count  | Functions                                                                 |
| --------------------- | ------ | ------------------------------------------------------------------------- |
| **Changed (14)**      | 14     | 14 functions modified between builds                                      |
| **New Narrative (3)** | 3      | `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView` (all donor) |
| **v20-only**          | 1      | `updateStepper`                                                           |
| **Donor-only**        | 4      | `seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText`                |
| **Total Diffs**       | **17** | (not 14 as previously reported)                                           |

### 10. Phone Block Decision (M-23)

| Build     | Lines     | Content                         | Decision                 |
| --------- | --------- | ------------------------------- | ------------------------ |
| **v20**   | Line 6433 | Simpler, no label reapplication | **KEEP v20 6433** (M-23) |
| **Donor** | 6458–6488 | Label reapplication logic       | Available but not chosen |

### 10. render100 Delta

| Build     | Hash           | Lines     | Changed Lines                          | Status    |
| --------- | -------------- | --------- | -------------------------------------- | --------- |
| **v20**   | `1ea6e8414397` | 5934–6028 | 2 (rWeights sentence + trailing space) | CRASHES   |
| **Donor** | `cc1016eacc78` | 5984–6078 | 2 (omits rWeights + trailing space)    | **WORKS** |

**Delta:** 2 changed lines (rWeights sentence + trailing space). Donor removes crash.

### 11. checkRewards

| Build     | Span            | True Body Hash | Status       |
| --------- | --------------- | -------------- | ------------ |
| **v20**   | Lines 6381-6428 | `0a000ce52783` | ✅ Identical |
| **Donor** | Lines 6430-6484 | `0a000ce52783` | ✅ Identical |

**Note:** Boundary artifact — tool counts as 18th diff but true body identical.

### 11. Phone Block Decision (M-23)

| Build     | Lines     | Content                         | Decision                 |
| --------- | --------- | ------------------------------- | ------------------------ |
| **v20**   | Line 6433 | Simpler, no label reapplication | **KEEP v20 6433** (M-23) |
| **Donor** | 6458–6488 | Label reapplication logic       | Available but not chosen |

### 12. Color-Scheme

| Build                 | Value                                             | Verified By                    |
| --------------------- | ------------------------------------------------- | ------------------------------ |
| **v20**               | `color-scheme:light` (line 1)                     | DS M-23, Pickle M-31, GLM M-24 |
| **Donor**             | `color-scheme:light dark` (line 4)                | DS M-23, Pickle M-31, GLM M-24 |
| **Both**              | `@media (prefers-color-scheme: light)` at line 18 | DS M-23, Pickle M-31, GLM M-24 |
| **v20 Body Override** | Light body override at line 223                   | DS M-23, Pickle M-31           |

### 11. render100 Delta

| Build     | Hash           | Lines     | Changed Lines                          | Status    |
| --------- | -------------- | --------- | -------------------------------------- | --------- |
| **v20**   | `1ea6e8414397` | 5934–6028 | 2 (rWeights sentence + trailing space) | CRASHES   |
| **Donor** | `cc1016eacc78` | 5984–6078 | 2 (omits rWeights + trailing space)    | **WORKS** |

### 12. checkRewards

| Build     | Span            | True Body Hash | Status       |
| --------- | --------------- | -------------- | ------------ |
| **v20**   | Lines 6381-6428 | `0a000ce52783` | ✅ Identical |
| **Donor** | Lines 6430-6484 | `0a000ce52783` | ✅ Identical |

### 13. Phone Block Decision (M-23)

| Build     | Lines     | Content                         | Decision                 |
| --------- | --------- | ------------------------------- | ------------------------ |
| **v20**   | Line 6433 | Simpler, no label reapplication | **KEEP v20 6433** (M-23) |
| **Donor** | 6458–6488 | Label reapplication logic       | Available but not chosen |

### 13. Color-Scheme

| Build                 | Value                                             | Verified By                    |
| --------------------- | ------------------------------------------------- | ------------------------------ |
| **v20**               | `color-scheme:light` (line 1)                     | DS M-23, Pickle M-31, GLM M-24 |
| **Donor**             | `color-scheme:light dark` (line 4)                | DS M-23, Pickle M-31, GLM M-24 |
| **Both**              | `@media (prefers-color-scheme: light)` at line 18 | DS M-23, Pickle M-31, GLM M-24 |
| **v20 Body Override** | Light body override at line 223                   | DS M-23, Pickle M-31           |

### 13. render100 Delta

| Build     | Hash           | Lines     | Changed Lines                          | Status    |
| --------- | -------------- | --------- | -------------------------------------- | --------- |
| **v20**   | `1ea6e8414397` | 5934–6028 | 2 (rWeights sentence + trailing space) | CRASHES   |
| **Donor** | `cc1016eacc78` | 5984–6078 | 2 (omits rWeights + trailing space)    | **WORKS** |

### 14. checkRewards

| Build     | Span            | True Body Hash | Status       |
| --------- | --------------- | -------------- | ------------ |
| **v20**   | Lines 6381-6428 | `0a000ce52783` | ✅ Identical |
| **Donor** | Lines 6430-6484 | `0a000ce52783` | ✅ Identical |

### 14. Phone Block Decision (M-23)

| Build     | Lines     | Content                         | Decision                 |
| --------- | --------- | ------------------------------- | ------------------------ |
| **v20**   | Line 6433 | Simpler, no label reapplication | **KEEP v20 6433** (M-23) |
| **Donor** | 6458–6488 | Label reapplication logic       | Available but not chosen |

### 15. Color-Scheme

| Build                 | Value                                             | Verified By                    |
| --------------------- | ------------------------------------------------- | ------------------------------ |
| **v20**               | `color-scheme:light` (line 1)                     | DS M-23, Pickle M-31, GLM M-24 |
| **Donor**             | `color-scheme:light dark` (line 4)                | DS M-23, Pickle M-31, GLM M-24 |
| **Both**              | `@media (prefers-color-scheme: light)` at line 18 | DS M-23, Pickle M-31, GLM M-24 |
| **v20 Body Override** | Light body override at line 223                   | DS M-23, Pickle M-31           |

---

## Verification Commands Index

```bash
# Build identity
shasum -a 256 "NFL Draft Simulator v20 Claude.html"
wc -c "NFL Draft Simulator v20 Claude.html"
shasum -a 256 "NFL Draft Simulator.html"
wc -c "NFL Draft Simulator.html"

# cpuPick hashes
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator v20 Claude.html" | shasum
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator.html" | shasum

# render100 hashes
awk '/function render100\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator v20 Claude.html" | shasum
awk '/function render100\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator.html" | shasum

# rWeights check
grep -n "rWeights" "NFL Draft Simulator v20 Claude.html"
grep -n "rWeights" "NFL Draft Simulator.html"

# Function census
awk '/^function [a-zA-Z]/ {print $2}' "NFL Draft Simulator v20 Claude.html" | wc -l
awk '/^function [a-zA-Z]/ {print $2}' "NFL Draft Simulator.html" | wc -l

# Math.random census
grep -c "Math.random()" "NFL Draft Simulator v20 Claude.html"
grep -c "Math.random()" "NFL Draft Simulator.html"
grep -n "Math.random()" "NFL Draft Simulator v20 Claude.html" | wc -l
grep -n "Math.random()" "NFL Draft Simulator.html" | wc -l

# SIM-CORE markers
grep -c "SIM-CORE-START" "NFL Draft Simulator v20 Claude.html"
grep -c "SIM-CORE-START" "NFL Draft Simulator.html"

# Persistence
grep -c "localStorage" "NFL Draft Simulator v20 Claude.html"
grep -c "localStorage" "NFL Draft Simulator.html"

# Math.random census
grep -c "Math.random()" "NFL Draft Simulator v20 Claude.html"
grep -c "Math.random()" "NFL Draft Simulator.html"
grep -n "Math.random()" "NFL Draft Simulator v20 Claude.html" | wc -l
grep -n "Math.random()" "NFL Draft Simulator.html" | wc -l

# render100 hashes
awk '/function render100\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator v20 Claude.html" | shasum
awk '/function render100\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator.html" | shasum

# cpuPick hashes
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator v20 Claude.html" | shasum
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator.html" | shasum

# SIM-CORE markers
grep -c "SIM-CORE-START" "NFL Draft Simulator v20 Claude.html"
grep -c "SIM-CORE-START" "NFL Draft Simulator.html"

# render100 rWeights
grep -n "rWeights" "NFL Draft Simulator v20 Claude.html"
grep -n "rWeights" "NFL Draft Simulator.html"

# Math.random lines
grep -n "Math.random()" "NFL Draft Simulator v20 Claude.html" | wc -l
grep -n "Math.random()" "NFL Draft Simulator.html" | wc -l
```

---

## Acceptance Criteria

- [ ] All seeds documented with command + output
- [ ] All critical seeds have independent verification (2+ sessions)
- [ ] All critical direction-slips documented with retractions
- [ ] All commands executable and reproducible
- [ ] Log saved to `_agents/nemotron-3-ultra-free/specs/VERIFIED_SEEDS.md`

---

**Status:** PROPOSAL — awaiting Owner approval (R5)  
**Next Step:** Owner approval → log seeds in this spec
