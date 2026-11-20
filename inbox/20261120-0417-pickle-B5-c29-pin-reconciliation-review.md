SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: B5 — third-seat review of C29 pin reconciliation | DATE: 2026-11-20T04:17Z
FOR: C29 (pin reconciliation) · test orders C15/C16/C22

# B5 — all four C29 sub-claims VERIFIED; use the four-pin map in test orders

STATUS: third-seat review. Nothing re-pinned; pins are protected and only the Architect/Owner change them.

## Receipts (VERIFIED)

```
(a) origin/gh-pages:67-cakepanz/README.md:4
    4:**Pinned engine commit:** `4ca9a071` on `architect/engine-and-seats` ·
(c) 66096fb1392890c2ab43822353485c255c9ddb4a
    66096fb13 67 Cakepanz: re-pin engine snapshot 4ca9a071 -> d3bd81d2 (99-rule flex, QB->FS 12)
    18 files changed, 482 insertions(+), 164 deletions(-)
    README last touched at 0a9d73273 (9 Nov), three commits before the re-pin.
(b) gh engine paths: 57 / d3 colors/src paths: 57 / common paths: 57 / differing blobs: 0
    diff -rq <extracted trees> => exit 0
(d) file counts: 4ca9a071=52, d3bd81d2=57, 5c808472=67, 65673a00=68, 408410477=69
    branch containment: first four -> origin/preserve/architect-engine-and-seats-pre-reroot-2026-11-19
                        408410477  -> origin/architect/engine-and-seats
    ancestry: d3->5c80 exit=0; d3->6567 exit=0; 5c80->d3 exit=1
    65673a00 vs 408410477: 68 common, 7 differing:
      appstate.ts, saves.ts, selectors.ts, store.ts, valueprovider.ts, game.ts, pools.ts
      only at tip: core/snapshot.ts
```
Also VERIFIED: both c10 `SHELL-STATUS.md:1` lines declare `5c808472` (shipped) / `65673a00` (prepared); build report row 29 matches. The README at `0a9d73273` did read `4ca9a071`, so staleness is caused by `66096fb1` not updating it. No correction to the C29 filing found — my first join pass was buggy (joined on hash); the corrected joins reproduce the 57/57 and 7-file results above.

## Four-pin map (VERIFIED — name the tree in every citation)

| Pin | Meaning |
|---|---|
| `4ca9a071` | stale pin in the gh-pages README (README not updated by `66096fb1`) |
| `d3bd81d2` | public / deployed engine snapshot (57/57 blobs identical; 99-rule flex) |
| `5c808472` | shipped c10 pin (declared in c10 `SHELL-STATUS.md:1`) |
| `65673a00` | prepared c10 pin (declared in the other c10 `SHELL-STATUS.md:1`) |
| `408410477` | Architect tip |

Downstream: test orders C15/C16/C22 must name which tree and which pin they measure; do not flatten `d3bd81d2` and `4ca9a071`. porca's C5 `d3bd81d2`-does-not-move statement names a different pin string than the authoritative map — Architect resolves (see A1 §6).
