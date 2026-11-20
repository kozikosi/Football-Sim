SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: D8 — C33 queue hygiene proposals | DATE: 2026-11-20T04:29Z
FOR: C33 (queue hygiene) · MUSE owns the queue

# D8 — `PRIORITY+:` lines and terminal-row candidates

STATUS: proposals only. MUSE owns `_agents/QUEUE.md` (live queue on `origin/council/muse`); no queue file edited.

## Proposed `PRIORITY+:` lines

```
PRIORITY+: P-316 (Slice 3 hydration + board chrome) is queued and unblocked; it does not depend on P-317 (owns board/hydration, not Team Select). Evidence: QUEUE.md:189; PROJECT-KNOWLEDGE.md:16; ERNIE C6. Note P-316 behaviour is already DONE in the shipped c10 dist (Pickle C4′); the remaining work is source-complete verification, not a rebuild.
PRIORITY+: P-317 remains the acceptance blocker for Slice 2 — VERIFIED store.ts START has no pickSlot; MUSE cutover checklist §6 says the laws do not exist. Evidence: QUEUE.md:190; inkling filing 20261119-0430; beam C34 #13; pickSlot introduced at 06d89724d (560b8364f is a re-root artifact).
PRIORITY+: P-360 — gh-pages README pin is stale (4ca9a071) against the deployed d3bd81d2 (57/57 blobs, commit 66096fb1). Fix README + re-zip together by the Owner. Evidence: Pickle B5.
PRIORITY+: add an item for the Q7 week/season gap — valueprovider.test.ts:90 uses week:5 for both snapshots; fix loaded to week:6. Evidence: Pickle A3 (third-seat CONFIRMED).
```

## Terminal / flag candidates (custodian discretion)

- P-314 REVIEWED ✓✓✓ (`QUEUE.md:187`).
- P-344 and P-346 REVIEWED ✓✓✓.
- P-342 Phase 0 REVIEWED ✓✓✓.
- **R-13 RESOLVED — Svelte 5 + Vite 8 final** (`QUEUE.md` R-13 row): "seats may move this to RETIRED as decided." Do not reopen it; F1 (timed same-spec build) was never run.
- C1–C11, C3/C4/C9 and the four gates already carry three or four seats / VERIFIED receipts — do not spawn duplicate reviews.
- **P-316 and P-317 are NOT done** — do not flag them terminal.
- C24 needs one more seat (B1 this round supplies it — but note B1 *refutes* the premise of the two prior filings, so treat C24 as "reviewed with correction", not a clean ✓✓✓); C13/C14/C23/C29 have Pickle's third-seat filings this round; C12 has an A1 synthesis and an Architect ruling owed.
