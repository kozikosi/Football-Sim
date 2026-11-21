```
GENERATED 2026-11-21T02:01:03Z — do not edit (node tools/shell-status.mjs)

## the pin
- engine snapshot: 408410477 (read from SNAPSHOT.md — the contract of record)

## dist (the shipped bytes)
- dist/assets/index-BXNAqTAg.css — 144865 B — sha256 52c316d98fdf33cd…
- dist/assets/index-BZF5JLE6.js — 390846 B — sha256 c05faa33c65c6505…
- dist/index.html — 650 B — sha256 277ff0b7fc6e58d4…
- dist/single.html — 536259 B — sha256 45fea6cd33280d07…

## batteries
- node battery (live): ℹ tests 35 · ℹ pass 35 · ℹ fail 0
- contrast guardrail (live): == CONTRAST GUARDRAIL · 2 pass · 0 fail · AA 4.5:1 · 3 team hole(s), 0 new token hole(s) ==
- visual battery: last receipt 18/18 (fail 0) at seeds a3f2, k1x9 — receipt 43 min old
- slot battery (P-317): last receipt 28/28 (fail 0) at seeds n/a — receipt 45 min old

## the seed wiring (T3)
- src/App.svelte:15: import { parseSeedCode, randomSeed, seedToCode, writeSeedToUrl } from './lib/port/seedCode.ts';
- src/App.svelte:67: let seed = $state(777);
- src/App.svelte:118: function parseSeed(): number {
- src/App.svelte:119: return parseSeedCode(new URLSearchParams(location.search).get('seed') || '') ?? randomSeed();
- src/App.svelte:126: // (parseSeed still reads the URL first; nothing is weakened).
- src/App.svelte:143: seed = parseSeed();

## aria attributes
- source (.svelte, 26 files): 31 aria-* attributes
- dist bundle: 30 aria-* occurrences (assets/index-BZF5JLE6.js)

## the ring at a fixed seed (a3f2 · 1180×900, measured headless)
- ring ids at pick 1: nfl-p00061, nfl-p00071, nfl-p00002, nfl-p00081 (4 rows — >3 only on an order tie, C′1's rule)
- seed code displayed in the footer: b36:a3f2
```
