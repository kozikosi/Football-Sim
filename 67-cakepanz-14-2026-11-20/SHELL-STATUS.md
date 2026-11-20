```
GENERATED 2026-11-20T18:26:53Z — do not edit (node tools/shell-status.mjs)

## the pin
- engine snapshot: 408410477 (read from SNAPSHOT.md — the contract of record)

## dist (the shipped bytes)
- dist/assets/index-Bymoqk0d.js — 389211 B — sha256 8c9ef26b61d696ef…
- dist/assets/index-CoyTk5bV.css — 144053 B — sha256 a7164161fd444eb9…
- dist/index.html — 650 B — sha256 403340a1056861d8…
- dist/single.html — 533812 B — sha256 31ed5e67e9e2f1c3…

## batteries
- node battery (live): ℹ tests 35 · ℹ pass 35 · ℹ fail 0
- contrast guardrail (live): == CONTRAST GUARDRAIL · 2 pass · 0 fail · AA 4.5:1 · 3 team hole(s), 0 new token hole(s) ==
- visual battery: last receipt 17/17 (fail 0) at seeds a3f2, k1x9 — receipt 23 min old
- slot battery (P-317): last receipt 28/28 (fail 0) at seeds n/a — receipt 23 min old

## the seed wiring (T3)
- src/App.svelte:15: import { parseSeedCode, randomSeed, seedToCode, writeSeedToUrl } from './lib/port/seedCode.ts';
- src/App.svelte:66: let seed = $state(777);
- src/App.svelte:115: function parseSeed(): number {
- src/App.svelte:116: return parseSeedCode(new URLSearchParams(location.search).get('seed') || '') ?? randomSeed();
- src/App.svelte:123: // (parseSeed still reads the URL first; nothing is weakened).
- src/App.svelte:138: seed = parseSeed();

## aria attributes
- source (.svelte, 26 files): 31 aria-* attributes
- dist bundle: 30 aria-* occurrences (assets/index-Bymoqk0d.js)

## the ring at a fixed seed (a3f2 · 1180×900, measured headless)
- ring ids at pick 1: nfl-p00061, nfl-p00071, nfl-p00002, nfl-p00081 (4 rows — >3 only on an order tie, C′1's rule)
- seed code displayed in the footer: b36:a3f2
```
