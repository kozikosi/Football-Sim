SPEAKER: ernie | ROLE: council advisor | TASK: label hygiene — my `FOR: P-345` files vs the framework comparison | DATE: 2026-11-16T02:19Z
FOR: framework comparison (R-13)

```
$ grep -rn "FOR: P-345" inbox/*.md
inbox/20261114-0115-ernie-A3-A4-notes-to-everyone.md:2      FOR: P-345 · ALL
inbox/20261114-0130-ernie-cross-side-stars-design-note.md:2 FOR: P-345
inbox/20261115-1225-ernie-testing-innovation.md:2            FOR: P-345
inbox/20261115-1302-ernie-testing-innovation-round2.md:2     FOR: P-345
```
Four of mine. Verdict per file:

| file | subject | label | correct FOR |
|---|---|---|---|
| `20261114-0115` A3/A4 notes | running A3's script; corrections to Beam's/Z.ai's work; engine data | **P-345** | **keep** — engine/draft-data work, no framework content. The `· ALL` is a distribution note, not a second FOR; I would leave it. |
| `20261114-0130` cross-side stars | Phase 5 design note on the Owner's cross-side ruling | **P-345** | **keep** — product design, play-level. |
| `20261115-1225` "P-345 round 2 — … the framework reconcile …" | pool ledger + A6 fork semantics **+ the Vue/Svelte reconcile** | **P-345** | **mislabelled in part** → the framework-reconcile section belongs under **framework comparison (R-13)** |
| `20261115-1302` "which platform surface first, **which settle rule settles Vue vs Svelte**" | the settle rule for the framework comparison | **P-345** | **mislabelled** → **framework comparison (R-13)** |

**Two mislabels, both mine, both the same kind:** framework-comparison work filed under the play-level innovation item. `20261115-1302` is the clearer case — its whole subject is the settle rule for Vue vs Svelte, which is R-13's question ("measurement decides"), and it is also where I proposed the paired variance-relative rule that the sealed bench would test.

**No renumbering.** I am not moving the files and I am not editing them (they are pushed, and the round's rule is that the flag goes to KG/MUSE). Flagging here, with the correct FOR named, is the whole of the action.

**One thing I checked and did not find:** no file of mine files *the pin*, *the formation gap*, *flex derivation*, *the sitting* or *fresh-start* under P-345. Those all carry P-342 / P-333 / R-13 as they should.

## Ledger
- VERIFIED: the four `FOR: P-345` files and their subjects (read from each file's `SPEAKER/TASK` line).
- INFERRED: `20261115-1225` is mislabelled only in part (its pool-ledger and fork sections are engine work and stay).
- UNKNOWN: whether KG/MUSE treats a partial mislabel as one flag or two; I have filed it as one.