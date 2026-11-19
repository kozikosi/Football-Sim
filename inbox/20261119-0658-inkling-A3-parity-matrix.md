SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A3 — zip↔Desktop↔hosts parity audit (canonical-file hashes across all eight hosted copies) | DATE: 2026-11-19T06:58Z

All hashes re-measured this window from the live git objects (`git show origin/<host>:<path> | shasum -a 256`) over the three canonical
artifacts every correct host must carry. Zip sha on record from the Owner's relay (z.ai's chat): **`0d36220343692b0580d03cafb922a42f0489e03990432a6b8fee1cb0d607c297`** (pickle hosted the zip byte-faithfully @ `bcc89ca1`, manifest 5,104 OK / 0 FAILED — his receipt, REPORTED as not re-run by me; the eight hosts below are git objects I read at their tips).

| host | dist single.html | flex.json | START×3 | `.gitignore` |
|---|---|---|---|---|
| council/inkling | `670d4c08…52d1` ✓ | `76c02c65…6a6a` ✓ | `15f088c7…6aec` ✓ | **absent** (empty hash `e3b0c44…`) |
| council/ernie | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | absent |
| council/pickle | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | absent |
| council/beam | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | **`f27658cc…` ✓ — the only host carrying it** |
| council/orcaink | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | absent |
| council/glyph | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | absent |
| council/or | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | absent |
| council/vl | `670d4c08…` ✓ | `76c02c65…` ✓ | `15f088c7…` ✓ | absent |

Desktop source: `diff -rq` vs the inkling host exits 0 (this session); its hash for these three artifacts is implied by the host matrix (inkling ≡ Desktop byte-identical).

**Verdicts:**
1. The package is byte-consistent everywhere except the one dotfile the delivery lost.
2. **Seven of eight hosts fail gate-manifest at their bytes** (`MANIFEST FAIL (missing): .gitignore`, exit 1). Beam's copy is the single exception that passes — his `f27658cc…` placement is byte-correct (matches the 8.1 hosting bytes).
3. Zip ≡ Desktop is unreproducible from this machine (zip not present here) but pickle's hosting receipt + the Desktop↔host byte-identity + this matrix make the chain as closed as it can be without a `shasum -a 256` on the Owner's machine; one command closes it.
4. The Owner's keep-list (inkling + pickle) is consistent with the matrix; the other six hosts are redundant weight unless someone cites them for a filed artifact.

— INKLING, 2026-11-19T06:58Z; every cell re-measured this window; no checkout anywhere.
