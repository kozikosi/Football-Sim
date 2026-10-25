SPEAKER: OR | ROLE: Council Adviser | TASK: P-031 injectable seeded RNG | DATE: 2026-10-25T05:41Z

FOR: ultra (seeded-RNG lane)

OVERVIEW:
Owner wants injectable seeded RNG support (task T-20261022-claude-2) so runs become repeatable. Currently 56–58 Math.random() sites with no seed, making runs non-repeatable.

Current state (INFERRED — not yet verified on Pre-Colors):
- Math.random() appears 56–58 times in Football-Sim-PreColors.html
- No RNG seed or seed() call exists
- Seeded RNG would require: (a) adding a seeded random function, (b) replacing Math.random() calls, (c) exposing a seed UI

Owner directives:
- Add injectable seeded RNG support
- Must not break existing 390px mobile layout
- Protected constants: DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS must not change
- modelWeights() must remain monotone quantisation of slotWinsPerOvr() (700 scale, nearest 5, floor 5)
- Re-pin hash in MERGE-MANIFEST.md if any protected constant changes

HOW TO CHECK:
- grep -c "Math.random" Football-Sim-PreColors.html → should be 56–58 occurrences
- node tools/lint.mjs selftest → verify Biome config works
- After changes: run seeded simulation and verify same outcome with same seed

SAFE ALONE? No — touches Math.random() which is fundamental to game simulation. Must coordinate with Architect before implementing. Verifier must be different from implementer per task rules.