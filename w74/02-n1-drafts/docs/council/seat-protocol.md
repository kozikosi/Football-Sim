# Seat protocol — who does what, and how work moves

## The seats in brief

- **The Owner** directs. Everything he writes about the product is law, transcribed verbatim
  into an intake ledger (one per wave) and, for standing decisions, into owner-notes files
  that are themselves pinned. When two rulings conflict, the seats surface the conflict —
  they never resolve it by picking one quietly. (Real case: "copy saves verbatim" vs "no
  migration" on the same day; Muse flagged it, the second ruling won, `legacy.ts` dies at
  cutover — see P-258.)
- **The Architect** builds the engine and the contracts: app state, actions, the save
  envelope, the view-model boundary, the product build. He is the only seat who edits the
  product source and `tools/`. His replies are reviewed by the other seats like any work
  file — the w73 contract review produced 12 findings against his contract commit `551af1b`,
  two of them structural.
- **The Executor** ships waves of product work, the verification batteries, and the
  measurement layer: save-size tables, determinism proofs, the Outcome Lab, storage dumps,
  debt inventories. The Executor also reviews contracts before screens are built against
  them. The Executor seat has no git push: everything ships as a hashed zip that another
  seat imports, which makes review the only path to production — by construction, not by
  policy.
- **Councillors** (advisors) do research, statistics, proposals and reviews. They file
  small documents into a shared inbox; nothing is assigned to anyone, and no seat can
  assign work to another seat.

## How work moves without meetings

1. **The queue is one ranked table** (`PRIORITIES.md`). Anyone may add a P2/P3 idea,
   retire a provably-done item, or keep an idea alive — each action is one small file.
   Owner-tier items (P0/P1) leave the queue only with proof.
2. **Work lands as an inbox file**: what was produced, the exact anchor it applies to,
   how to check it, and the evidence label. No chat, no meetings.
3. **Reviews are continuous-trust.** A review declares `FOUND: n` (items confirmed) and
   `NEW: n` (items no earlier review had). The item is REVIEWED when the latest review
   finds fewer than 10 % new, with at least two distinct seats having reviewed, capped at
   eight. A `rejected` verdict reopens the item; new work lets the rejecter review again.
   One vote per seat; a work author never votes on their own item.
4. **The Architect consumes a digest** — reviewed items ready to build, answers to his
   research asks, and notes addressed to him — and retires items in the same turn he
   ships them, with the commit as evidence.

## What no seat may do

- No seat edits another seat's lane files, or files that belong to the Owner's voice.
- No seat marks its own work reviewed, and no seat reviews the same item twice.
- No seat invents work beyond the directives; idle seats take standing chores (queue
  hygiene, fresh evidence for pinned artifacts) instead of freelancing.
- Nothing user-visible bakes in unresolved decisions (the brand ruling, for one).

## The protocol in the archive

The live protocol documents (the one-page `COUNCIL.md`, the inbox format, the review
governor's constants) ship with the repository; the historical versions are in the
curated archive trail:

- `BASELINES.md` — every pinned artifact and its md5.
- `CHRONICLE.md` — the wave-by-wave record.
- The debt inventories (v1, w68; v2a, w71) — the known-debt registers.
- The Outcome Lab Model Report — the measured-state document.
