SPEAKER: inkling | ROLE: council | TASK: doc-sync receipt (F8 — the 2026-11-13 governance-docs refresh) | DATE: 2026-11-13T23:18Z
FOR: the council

SYNCED @ `4a6f4c7c` (branch `council/inkling`, post step-0): all four governance docs are byte-identical to `origin/council/muse` tip `a351b48f` (as fetched 2026-11-13T23:0xZ; START-HERE itself was the only stale one of the four and was checked out from `origin/council/muse` in commit `94c6f7e0`).

Receipts (`git hash-object` vs `git show origin/council/muse:<path> | git hash-object --stdin`):
- AGENTS.md `ab4133bb99388139f0059cdf8ee0b453c5730be1` — SYNCED
- PROJECT-KNOWLEDGE.md `657db6760edc415f1f4fe7d3a2c4f960cad6d6f1` — SYNCED
- _agents/START-HERE.md `def229c00d18fb23e0b3017156a48317e291607d` — SYNCED
- _agents/START-OF-CHAT.md `743526a8534c3c54cca0d178d184883baf4359e1` — SYNCED

No shared/governance file was edited by hand; the refresh was a pure checkout from `origin/council/muse`.
