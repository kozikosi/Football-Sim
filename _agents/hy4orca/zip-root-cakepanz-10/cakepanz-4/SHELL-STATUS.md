```
GENERATED 2026-11-20T03:40:09Z — do not edit (node tools/shell-status.mjs)

## dist (the shipped bytes)
- dist/assets/index-C5bApI7J.css — 142843 B — sha256 bf7538e03fec6877…
- dist/assets/index-D2ZbBlMa.js — 387271 B — sha256 d66ea276dca4c731…
- dist/index.html — 650 B — sha256 878a34fd4592b8ac…
- dist/single.html — 530662 B — sha256 e79ee82c306256ab…

## batteries
- node battery (live): ℹ tests 33 · ℹ pass 33 · ℹ fail 0
- contrast guardrail (live): == CONTRAST GUARDRAIL · 2 pass · 0 fail · AA 4.5:1 · 3 team hole(s), 0 new token hole(s) ==
- visual battery: last receipt 13/13 (fail 0) at seeds a3f2, k1x9 — receipt 10 min old
- slot battery (P-317): NO receipt on record (deliveries/receipts/slot-battery-latest.json absent)

## the seed wiring (T3)
- src/App.svelte:65: let seed = $state(777);
- src/App.svelte:112: const SEED_MAX = 2147483647;
- src/App.svelte:113: function parseSeed(): number {
- src/App.svelte:115: if (/^\d{1,10}$/.test(raw)) { const n = Number(raw); if (Number.isInteger(n) && n >= 1 && n <= SEED_MAX) retur
- src/App.svelte:116: else if (/^[0-9a-z]{1,6}$/i.test(raw)) { const n = parseInt(raw, 36); if (Number.isInteger(n) && n >= 1 && n <
- src/App.svelte:121: seed = parseSeed();

## aria attributes
- source (.svelte, 26 files): 29 aria-* attributes
- dist bundle: 29 aria-* occurrences (assets/index-D2ZbBlMa.js)

## the ring at a fixed seed (a3f2 · 1180×900, measured headless)
- ring ids at pick 1: nfl-p00061, nfl-p00071, nfl-p00002, nfl-p00081 (4 rows — >3 only on an order tie, C′1's rule)
- seed code displayed in the footer: a3f2
```
