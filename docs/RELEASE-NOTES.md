# RELEASE-NOTES.md — Versioned Change Log

**Format:** `vX.Y.Z | Date | Hash | Added | Changed | Fixed | Removed | Known Issues | Migration Notes`
**Policy:** Every promoted build gets an entry. Append-only.

---

## v20.0.0 (Reference Build) | 2026-10-19 | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`
**Added:**
- Initial v20 reference build (R2 ruling)
- Mobile draft board: 12-column CSS grid cards with `data-nostack="1"` opt-out
- Hero section with animated football emoji + 4-step stepper (Draft → Season → Playoffs → Champion)
- Stepper progress indicator in header
- Radial gradient backgrounds with `--glow`/`--gold` CSS variables
- `data-nostack="1"` opt-out pattern for mobile tables

**Changed:**
- Color-scheme: `light` (incorrect — contradicts dark defaults)
- Wrapper: dual `<!doctype html>` + duplicate `</body></html>` (546 B overhead)
- `render100` crashes at line 6018 (`rWeights` undefined)

**Known Issues:**
- `render100` crashes at line 6018 (`rWeights` used but never declared)
- Mobile table stacking lost after viewport change (7,208 overflowing elements)
- 58 `Math.random()` calls, no seed → no reproducible seasons
- SIM-CORE markers absent; 3 headless entry points missing
- Persistence absent (localStorage = 0)
- No harness scripts (pw4.js, validate.js, phone.js, funcdiff.js, run_all.sh)

**Migration Notes:** Base for donor merge; all fixes applied in merge candidate.

---

## v20.1.0 (Donor Fixes Merged) | 2026-10-20 | `TBD` | `TBD`
**Added:**
- Donor `cpuPick` (round floors, posBest, bounded miss) — replaces v20's `seen>16` + deep miss
- Donor `render100` drop-in fix (`cc1016eacc78`) — fixes `rWeights` crash at line 6018
- Donor `render100` function hash: `cc1016eacc78` (v20 was `1ea6e8414397`)
- Donor `cpuPick` pin: `94b878605b73` (v20 was `3dc9d12f500a`)
- Donor `render100` function hash: `cc1016eacc78` (v20 was `1ea6e8414397`)
- Donor `cpuPick` full-body hash: `a2b8190e98f8` (v20 was `fa6d752969e4`)
- 17-function oracle: 14 donor / 1 v20 (`renderDraftBoard2`) / 2 synthesize (`setActiveTab`, `renderSeasonTab`)
- 3 new narrative functions from donor: `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView`
- `checkRewards` identical (`0a000ce52783`)
- Phone block: keep v20 line 6433 (Variant A per M-23)
- Wrapper surgery: clean 648,486 B copy (removed dual doctype + duplicate `</body></html>`)
- Color-scheme: `light dark` (donor) — fixes v20's `light` contradiction
- SIM-CORE markers + 3 headless entry points (pending S-202)
- Seeded RNG indirection (pending)
- Persistence subsystem (pending)

**Changed:**
- Color-scheme: `light` → `light dark` (donor)
- Wrapper: dual doctype + duplicate close → clean 648,486 B copy
- `cpuPick`: donor wins (round floors, posBest, bounded miss)
- `render100`: donor drop-in (fixes `rWeights` crash)
- Phone block: keep v20 6433 (Variant A per M-23)
- `render100`: donor drop-in (fixes crash)
- 17 functions differ (14 changed + 3 new narrative)
- `checkRewards` identical (`0a000ce52783`)

**Fixed:**
- `render100` crash at line 6018 (`rWeights` undefined)
- `cpuPick` direction (donor's credible-GM machinery wins)
- Wrapper: clean 648,486 B copy (removed 546 B duplicate wrapper)
- 17-function diff surface correctly documented

**Known Issues (Post-Merge):**
- Persistence still absent (U-21 — post-merge work)
- Seeded RNG not yet implemented (58 `Math.random()` calls)
- SIM-CORE markers + 3 headless entry points not yet implemented
- Harness scripts (pw4.js, validate.js, phone.js, funcdiff.js, run_all.sh) not yet in `tests/`
- Mobile table stacking regression possible (mstack vs 12-col grid)

**Migration Notes:**
- Branch from `origin/council-intake` (9ab0292)
- Build on `merge/v20-donor`
- Verifier runs `_agents/minimax/tools/post-merge-smoke.mjs`
- Owner promotes via GitHub UI rename (preserve-then-rename)

---

## v21.0.0 (Planned) | TBD | TBD
**Planned (from v21 roadmap):**

**Tier 1 (Must Ship):**
- SIM-CORE markers + 3 headless entry points (S-202)
- Seeded RNG indirection (58 `Math.random()` → `rng(seed)`)
- Persistence (localStorage auto-save/resume)
- Harness scripts: pw4.js, validate.js, phone.js, funcdiff.js, run_all.sh

**Tier 2 (Should Ship):**
- Mobile-first: single 12-col grid table pattern
- 390px element-level overflow gate (≥200ms debounce)
- 390px breakpoint (`@media (max-width:390px)`)

**Tier 3 (Nice to Have):**
- Error boundaries (try/catch wrappers)
- Accessibility (ARIA labels, keyboard nav)
- Performance (lazy-load PLAYERS, defer CSS)
- Style debt cleanup (merge-debt strings)

**What Will NOT Change:**
- Single-file constraint (no split)
- Protected constants (DEFAULT_WEIGHTS, FLEX, etc.)
- No paid APIs / CDN dependencies
- 17-function merge surface (14 donor / 1 v20 / 2 synthesize)

---

## Migration Notes Template (Future Releases)

```
## vX.Y.Z | YYYY-MM-DD | <hash>

**Added:** ...
**Changed:** ...
**Fixed:** ...
**Removed:** ...
**Known Issues:** ...
**Migration Notes:** ...
```