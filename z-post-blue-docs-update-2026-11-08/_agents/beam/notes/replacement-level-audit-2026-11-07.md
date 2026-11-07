# Replacement-level audit (T4) — Beam, 2026-11-07

Engine replacement baseline overall: flat 80 OVR (reference, not a replacement level). Per-slot findings:
- DL5: VERIFIED — 5th-ranked DL, rotation share 0.33 (measured, dl5-snaps.py, 2023-2025). Weight 91..184 across 22%-44% share.
- CB3/NICKEL, DIME, SAM, FB: UNKNOWN — needs snap counts by position depth (hash-pinned).
- TE2/TE3: PARTIAL — personnel-shares.py covers offense personnel; defense depth TBD.

Script: tools/mathlab/replacement-level-audit.mjs (scaffold, runs clean).
