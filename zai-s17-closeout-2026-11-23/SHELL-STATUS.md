```
GENERATED 2026-11-23T07:28:24Z — do not edit (node tools/shell-status.mjs)

## the pin
- engine snapshot: 408410477 (read from SNAPSHOT.md — the contract of record)

## dist (the shipped bytes)
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a0…
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3…
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c…
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2…

## batteries
- node battery (live): ℹ tests 37 · ℹ pass 37 · ℹ fail 0
- contrast guardrail (live): == CONTRAST GUARDRAIL · 2 pass · 0 fail · AA 4.5:1 · 3 team hole(s), 0 new token hole(s) ==
- visual battery: last receipt 18/18 (fail 0) at seeds a3f2, k1x9 — receipt 165 min old (STALE — re-run the battery)
- slot battery (P-317): last receipt 28/28 (fail 0) at seeds n/a — receipt 166 min old (STALE — re-run the battery)

## the ring retirement (S15 §4.2) and the floors
- 6 ring-era law subjects RETIRED with the ring, by name: L13 (the top-three ring), L16 (the ringed-row qualifier), L21 (the quick leg of the Tab walk), L23 (the backwards ring-only glow), L24 (the ring oracle), L25 (the ring explanation) — reasons per law in deliverables/RING-LAW-RETIREMENT-2026-11-21.md; L17/L18/L19/L20/L22 are KEPT (their subjects — undo/expand, the double-activation guard, the staged disarm, the announced values, the staged-confirm guard — are not ring-bound); every surviving outcome carries a law
- floor is now: board 24/0 · shell 53/0 · visual 18/0 · node 37/37 · slot 28/0 · slice 29 pass / 0 fail / 10 skip / 3 defer · contrast 2/0 (three KNOWN team holes stay NAMED) · engine 430/430 · falsifiers ALL DIE

## the seed wiring (T3)
- src/App.svelte:15: import { parseSeedCode, randomSeed, seedToCode, writeSeedToUrl } from './lib/port/seedCode.ts';
- src/App.svelte:67: let seed = $state(777);
- src/App.svelte:127: function parseSeed(): number {
- src/App.svelte:128: return parseSeedCode(new URLSearchParams(location.search).get('seed') || '') ?? randomSeed();
- src/App.svelte:135: // (parseSeed still reads the URL first; nothing is weakened).
- src/App.svelte:153: seed = parseSeed();

## aria attributes
- source (.svelte, 26 files): 33 aria-* attributes
- dist bundle: 32 aria-* occurrences (assets/index-Cb5sVPrX.js)

## the top-three treatment at a fixed seed (a3f2 · 1180×900, measured headless)
- top-three rows at pick 1: nfl-p00061, nfl-p00071, nfl-p00002, nfl-p00081 (4 rows — >3 only on an order tie, C′1's rule)
- seed code displayed in the footer: b36:a3f2
```
