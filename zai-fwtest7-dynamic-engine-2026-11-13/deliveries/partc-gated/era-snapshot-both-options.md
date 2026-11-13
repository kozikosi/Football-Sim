# C.1 — Era-snapshot staging: both options, prepared, nothing built (waits on the Owner)

**Status:** PROPOSAL (the gate is the Owner's; the standing order is explicit — prepare both options exactly as asked, build nothing). Author: Z.ai, 2026-11-13. The underlying receipt (static-E era-robust pricing: zero tier changes, mae 1.311 vs 1.375 at λ=0.4) is on the record from the P-345 submission — cited, not re-run.

## The decision the Owner owns

Staging consumes the per-season snapshot vector **now**, or staging stays **static + a spot-table monitor**. Both options are prepared below with their costs; nothing is built until he rules.

## Option A — staging consumes the snapshot vector now

- **What it is:** the staging step reads the per-season E snapshot vector (the shipped C1 per-season tables) at fit time — the snapshot becomes an input to staging, not a reference artifact.
- **What it buys:** era-adaptive staging — each season's fit prices against its own measured E; the era-robustness finding (zero tier changes, mae 1.311) becomes a *property of the pipeline* instead of a validation result.
- **What it costs:** (1) a staging change in the pipeline scripts (mine — bounded, ~half a day, the writers already exist); (2) a new provenance obligation — every staged number must record WHICH snapshot E it consumed (the manifest gains a snapshot-hash column); (3) a consistency obligation — the fluctuating-dial snapshot law (Part B) and this staging snapshot are DIFFERENT snapshots with the same name-shaped idea; the README must say so in one line or the council will conflate them.
- **When it is right:** if the Owner intends the per-season E to be live input (the "era" concept operating, not monitored).

## Option B — static staging + the spot-table monitor

- **What it is:** staging keeps the single staged E; the spot-table monitor watches the 11 flip rows + the decade-mean-vs-current-season E deltas each season, and flags when a season's measured E would have moved a tier.
- **What it buys:** zero pipeline change now; the monitor is a report, not a mechanism — the fluctuating-dial program (Part B) stays the ONLY path by which any staged value ever moves, through its acceptance gate.
- **What it costs:** (1) the monitor is a standing chore (a per-season script run + one README line); (2) if the era effect is real and growing, the monitor eventually generates flags the Owner must act on manually — the decision pressure returns each season instead of being resolved once.
- **When it is right:** if the Owner wants the era concept OBSERVED before it is OPERATIONAL (the parsimony default — my recommendation inside this proposal).

## The shared tail (both options)

- The snapshot vector itself is already shipped and verified (C1 receipt, inputs byte-checked by three seats).
- The 15-minute unblock: neither option is blocked; the decision is. **The 15-minute fix is the Owner reading this page and ruling A or B.**
- C.5's record line for this item: "era-snapshot staging: Owner's call open; both options prepared 2026-11-13; nothing built" — as-of-this-date only.

## Failure mode (the proposal's own)

- Building A without the manifest provenance column would create staged numbers whose snapshot lineage is unauditable — the byte-check discipline would be the first casualty. That is why the manifest column is listed as a cost, not an afterthought.

## The Owner-question it carries

A or B? **My recommended default: B** (observe first; the Part B gate is the only mover). Consequence of being wrong in the B direction: one more season of manual monitoring if the era effect grows; consequence of the A direction: pipeline provenance debt to retire before the fluctuating-dial program can trust staged numbers.
