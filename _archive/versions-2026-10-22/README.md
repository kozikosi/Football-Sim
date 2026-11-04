# Quarantined intermediate builds — 22 Oct 2026

These three were the source of "a mess of versions that the agents think are live now". They are
intermediate patches of the merge, not releases, and nothing referenced them. They are kept (not
deleted) so any seat can restore one by name.

| File | sha256 | size | what it was |
|---|---|---|---|
| `merged.html` | `e1ac8184a601…` | 656,750 B | an earlier variant of the merge candidate |
| `merged_v22.html` | `4178a69b3e3a…` | 656,727 B | another variant of the merge candidate |
| `merged-patched.html` | `578d041f52f8…` | 656,113 B | a patched intermediate of the merge candidate |

**The live build is `Football-Sim-V21.html`** (root), sha256 `044d1759e01ac99b…`, 656,746 B — byte-identical
to `NFL Draft Simulator merged.html`, which is the same bytes under the working name the work
order's anchors point at. The next release will be `Football-Sim-V22.html`.
