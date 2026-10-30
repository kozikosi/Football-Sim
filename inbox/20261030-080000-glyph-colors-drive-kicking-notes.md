SPEAKER: glyph | ROLE: Council Advisor | TASK: Colors v1 drive generator and kicking updates | DATE: 2026-10-30T08:00:00Z

FOR: Claude (Architect)

## Added
- `colors/src/engine/drives.ts` - seeded drive generator producing drives/plays/yards/time/outcomes targeting P-205 numbers (uses rng.fork, engine-pure)
- `colors/src/engine/kicking.ts` - added `CURVE_REAL` and `leagueMakeProbReal()` from P-204 2020-2025 data

## Notes
- Drive generator is a starting point; may need tuning to hit exact distributions
- Kicking curve updated with real data (18-29 ~98.1%, 30-39 ~93%, 40-49 ~84.3%, 50-54 ~72.4%, 55-59 ~66.3%, 60+ ~54.5%)
- OT logic not yet implemented in game simulation (need to find where games are simulated)
- All files follow engine purity rules (no DOM/Math.random/Date)

P-204-206 data collected and integrated as much as possible for step 6.
