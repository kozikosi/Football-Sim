# NOW (Architect)
Updated: 2026-11-08. Boot-v3.6 worked: stub clones public repo, `bootstrap.sh` runs; push needed `add_repo` access:"push" (Owner-instructed) and then `git push origin HEAD:architect/engine-and-seats` works.
- Owner CONFIRMED 8 Nov: salary table retired, reference only (`claude/rulings/2026-11-08-owner-salary-table-retired.md`). Muse relay conflict settled.
- DONE: default display measured: `measuredDisplayWeights()` (value.ts) + witness MEASURED test. Engine inputs (SLOTS, design.json, specs, flex.json) untouched; seeded hashes unchanged.
- Owner RULED 8 Nov: engine input determines the specs; NOT refitted to the curve (gap 23.7 is expected). No refit work.
- NEXT: flex under model-first (flex.json still HOLD: ask the Owner to lift it).
- Then `tools/seat-check.sh` per `claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md`; then guard passes (core/hungarian 15, lineup 14, playerids 11, margin 10, players 9, view/draftBoard 8, core/hash 7).
- Pending Z.ai asks (prompt v2): Q2 parameter diff in frame original -> design@27Oct -> salary-refit, witness.mjs mirror for derivedWeights, RNG landing plan (makeRng at season loop/draft order), Rosetta Colors column keys.
- Blockers: tsc:check needs `npm ci` in colors/ (vite/client types) in a fresh clone. Held (Owner): CI gate pick, hydration wiring.
