```
GENERATED (deterministic — state over ACCEPTANCE-RECEIPTS.txt d536d63f0cf5a0c8…) — do not edit (node tools/shell-status.mjs)

## the pin
- engine snapshot: 408410477 (read from SNAPSHOT.md — the contract of record)

## dist (the shipped bytes)
- dist/assets/index-BPQrt5Fx.css — 148578 B — sha256 771d6e422d20176a…
- dist/assets/index-CZba0I-q.js — 408937 B — sha256 98d2c64e2377c598…
- dist/index.html — 648 B — sha256 a0bf3040bde798db…
- dist/single.html — 558063 B — sha256 dc6c861f5efb3f50…

## batteries
- node battery (live): ℹ tests 37 · ℹ pass 37 · ℹ fail 0
- contrast guardrail (live): == CONTRAST GUARDRAIL · 2 pass · 0 fail · AA 4.5:1 · 3 team hole(s), 0 new token hole(s) ==
- acceptance run: the acceptance run of record is COMPLETE (ACCEPTANCE-RECEIPTS.txt — every step exit 0; the browser batteries ran inside it)
- acceptance-covers-this-tree: the acceptance receipt is COMPLETE at tree 78a4b452dfd68176…; current tree 37ee3b3601a99c49… — the attestation carries no dist fingerprint (pre-item-2 attestation) (the close-out chain's regenerations postdate the run; a Wave-A-style acceptance cannot certify bytes it never hashed)
- acceptance receipt sha256 (acceptanceSha): d536d63f0cf5a0c8149cf4e604663ac2b9f3da14b60159a5e0fe27bbf9c3baeb — receipt-attestation.json records it; claims acceptance-attestation + freshness.json verify the match
- visual battery: last receipt 18/18 (fail 0) at seeds a3f2, k1x9 — content FRESH (the receipt's dist fingerprint matches the shipped dist/)
- slot battery (P-317): last receipt 28/28 (fail 0) at seeds n/a — content STALE (the receipt's dist fingerprint does NOT match the shipped dist/ — re-run the battery)

## the ring retirement (S15) and the floors
- 6 ring-era law subjects RETIRED with the ring, by name: L13 (the top-three ring), L16 (the ringed-row qualifier), L21 (the quick leg of the Tab walk), L23 (the backwards ring-only glow), L24 (the ring oracle), L25 (the ring explanation) — reasons per law in deliverables/RING-LAW-RETIREMENT-2026-11-21.md; L17/L18/L19/L20/L22 are KEPT (their subjects — undo/expand, the double-activation guard, the staged disarm, the announced values, the staged-confirm guard — are not ring-bound); every surviving outcome carries a law
- floor is (GENERATED from this run + the receipts on record): node battery 37/37 (live) · contrast 2/2 (live) · engine 430/430 (the acceptance receipt of record) · falsifiers ALL DIE (the acceptance receipt of record) · visual 18/18 (receipt content-FRESH) · slot STALE — the receipt does not pin this dist · waveb 12/12 (receipt) · offline tent holds (receipt: 0 external, dist pinned) · board 24/24 (the acceptance receipt of record) · shell 53/53 (the acceptance receipt of record) · slice 29/29 · 10 skip (the acceptance receipt of record)

## the seed wiring (T3)
- src/App.svelte:15: import { parseSeedCode, randomSeed, seedToCode, writeSeedToUrl } from './lib/port/seedCode.ts';
- src/App.svelte:74: let seed = $state(777);
- src/App.svelte:140: function parseSeed(): number {
- src/App.svelte:141: return parseSeedCode(new URLSearchParams(location.search).get('seed') || '') ?? randomSeed();
- src/App.svelte:148: // (parseSeed still reads the URL first; nothing is weakened).
- src/App.svelte:167: seed = parseSeed();

## aria attributes
- source (.svelte, 27 files): 37 aria-* attributes
- dist bundle: 36 aria-* occurrences (assets/index-CZba0I-q.js)

## the top-three treatment at a fixed seed — SKIPPED (--no-browser)
```
