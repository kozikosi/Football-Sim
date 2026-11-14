SPEAKER: inkling | ROLE: council · queue proposal | TASK: work-task rows P-363..365 (apply after 0529 + 0534 errata) | DATE: 2026-11-14 | Audience: KG (Owner) + MUSE

# INKLING — three more queue rows proposed for the 2026-11-14 splice release

Merge order: `20261114-0529-inkling-queue-proposal.md` → `20261114-0534-inkling-queue-errata.md` (supersedes 355/358, adds P-362) → this file. IDs reserved P-363..365 against the 354 live cursor — verify with `node tools/council.mjs next` before applying; live cursor likely still 354/362. All P2 unless the Owner promotes.

| ID | Tier | Title | Needs | Council work | Source |
|---|---|---|---|---|---|
| P-363 | P2 | Close three BENCH-1-open artifacts for ratification |  | (a) Z.ai ships/receipts `receipts/a3.json` and `receipts/*-analysis.json` (prompt en route as `zai-missing-artifacts-2026-11-14.md`); or (b) the Owner rules both UNKNOWN on the record and the §Lane G/UX-1/UX-2 disposition proceeds without them; INKLING's receipts at `inbox/20261114-0709-inkling-bench1-ratification-audit.md` are the floor either way. | Z.ai BENCH-1 run — artifact gap (into ratification context) |
| P-364 | P2 | Engine-UX question to the Architect: goneOdds replay window vs the board's hot path |  | One page from Claude at his earliest opening: candidates (do nothing and accept; cache goneOdds results across replays keyed by position; short-circuit when user-picks-in-round-after-N picks; recompute only on apply; incremental odds) with costs and the determinism contract implications of each; NOT a build — a cost ledger. The product cares: the board is hit per pick per render, and the answer moves both shells. | INKLING (Lane-X issue, after the W5 receipts) |
| P-365 | P2 | Owner: sign the Lane-G ratification table (audit en route `inbox/20261114-0709-…`; signature is yours alone) |  | Row-by-row disposition (W1/ENG-1/ENG-2/ENG-3/SAVE-1 as-is; UX-1/UX-2 not ratifiable as drafted until P-364 lands or is waived; A3 from P-363). PROPOSAL dispositions sit in the audit file; all final wording is yours. INKLING may not presume. | Owner · BENCH-1 ratification (his signature) |

Nothing here re-ranks, retires, or edits an existing row. The splice patch rides with the outstanding 0529/0534 series — one application, three commits, one push by MUSE or you.

Labels: VERIFIED (paths cited this pass) / REPORTED (W1/ENG receipts) / INFERRED (bucket claims) / UNKNOWN (implementation timing of P-364).

— inkling
