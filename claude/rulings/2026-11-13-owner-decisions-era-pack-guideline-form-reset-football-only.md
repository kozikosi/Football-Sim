# Owner decisions, 13 Nov 2026 (answers to engine plan v2 section 8, plus CI)

Recorded verbatim in intent by the Architect the same turn they were given. Source: Owner message, Turn 2 of the 13 Nov session.

1. **Era packs.** "One current-era product pack for now. The architecture should support multiple era/rules packs later, but no user-facing era selector yet."
   - Effect: Phase 1b/2 fit and ship ONE pack on recent seasons. The pack format stays era-capable. No selector UI.
2. **The ~10% totals bar is a guideline, not a gate.** "The 10% is merely a guideline. let's just keep a sense of realism. use the historical data as something to test against but not as you need to meet certain targets to proceed with building."
   - Effect: historical totals are a TEST (reported, compared, explained), not a pass/fail condition for starting or continuing a phase. Supersedes the "bar passes" wording in NOW.md and plan v2 sections 3 and 5. The penalties-on/off question is closed: report both, gate neither.
3. **Form resets each season.** "Reset".
4. **Football only until football ships.** This closes plan v2 item 4 as "hold": the test-only second-sport fixture is NOT approved. Basketball stays design-only.
5. **CI.** Use the Architect's minimal gate: clean dependency install, type check, tests, production build, "using verified commands and working directories". See the master assessment, section 3: the gate is only partly runnable today (Colors has no working production build).
6. **NOT approved:** the TS port (Phase 1b). "These decisions do not constitute approval to begin the TS port yet." No code changes until the Owner has reviewed the broad assessment (`claude/assessments/2026-11-13-master-assessment.md`).
