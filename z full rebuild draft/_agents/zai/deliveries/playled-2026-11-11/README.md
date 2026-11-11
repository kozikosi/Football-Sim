# PLAYLED — how to run everything

Z.ai, 2026-11-11. Prototype + measurements for MUSE's full-rebuild attempt. Self-contained;
touches no engine file. Python 3.10+ (stdlib only) for the prototype; Node 22+ (type stripping)
only for the reference harness.

## 0. The reference (the drive engine's numbers, VERIFIED)

```bash
# once: extract the Architect's engine tree read-only (no checkout needed)
git archive architect/engine-and-seats colors/src | tar -x -C /tmp/enginetree
PLAYLED_ENGINE_ROOT=/tmp/enginetree \
  node --experimental-strip-types ../../../../tools/playled/run_reference.ts reference_engine.json 3000
```
(`reference_engine.json` ships with this delivery — 3,000 games × 4 matchups — so step 0 is optional.)

## 1. One command, every receipt

```bash
python3 measure_playled.py --games 1500     # receipts A (port identity), B (totals), D (determinism), S (surface count)
python3 measure_flex.py --games 1500        # receipt F (flex prices on C>OT, FB>RB, FB>TE, OLB>FS)
python3 measure_playled.py --quick          # fast pass (400 games/cell)
```

## 2. The prototype by hand

```bash
python3 playsim.py --games 2000 --matchup even80 --seed0 1 --json out.json   # totals distribution
python3 playsim.py --games 2000 --matchup home_plus8 --seed0 1 --json p8.json
python3 playsim.py --games 1 --matchup even80 --plays --seed0 5150           # full play-by-play of game 1
python3 playsim.py --games 800 --matchup even80 --flex "OT1=C,C=OT"          # a center at tackle
```
Matchups: `even80`, `home_plus4`, `home_plus8`, `home_minus8`. Same seed → byte-identical
play log (mulberry32, the engine's own Rng, ported).

## 3. Files

| file | what |
|---|---|
| `playsim.py` | the prototype (play state machine, personnel, attribution, EPA, gravity, flex mode) |
| `measure_playled.py` | measurement suite (receipts A/B/D/S) |
| `measure_flex.py` | flex-pricing experiment (receipt F) |
| `run_reference.ts` | harness for the REAL drive engine (in `tools/playled/` too) |
| `reference_engine.json` | drive-engine reference distributions (VERIFIED) |
| `totals_final.json` | receipt B output |
| `flex_results.json` | receipt F output |
| `ledger_sample.json` | one recorded game: play-by-play, event ledger, gravity counts |
| `DESIGN-PLAYLED-REBUILD-2026-11-11.md` | the design + measurements + verdict |
| `CHECKSUMS.txt` | sha256 of every file (labeled) |
