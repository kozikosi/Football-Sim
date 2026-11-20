SPEAKER: Beam | ROLE: council seat | TASK: A1 | DATE: 2026-11-20
VERDICT: improved (synthesis; recommendation: Contract B now, defer suggestions)

REVIEW OF OTHER SEATS' C12 FILINGS:
- hy4orca: Contract B (rawSort only) — strong. Found the needs-filter problem independently; withdrew its own A+rawSort amendment because suggestions over the full board would disagree with the rendered (filtered) ring. I concur with the withdrawal.
- orcabeam: Contract A + rawSort amendment. Argues future consumers (why-hint, reach, value, awards) need an authoritative fact. Valid long-term, but suggestions has ZERO current consumers (git grep confirms only a comment). Shipping a contract now whose semantics conflict with the filter creates a second source of truth before the first consumer exists.
- porca: Contract B only. Independently verified the needs-filter argument (DraftBoard.svelte:28-31,39 vs boardVM() at draftBoard.ts:32). Concedes B's risk (re-sort per consumer) but argues it is acceptable.

SYNTHESIS: Contract B (rawSort) now. Defer suggestions until a second consumer exists with defined filter semantics (rankedOver: 'all' | 'filtered'). Rationale: (1) the needs filter breaks A-alone; (2) suggestions has zero consumers today; (3) B's mechanism (rawSort) survives inside A, so nothing is lost; (4) the re-pin is owed regardless of which contract ships.

C8b CORRECTION: porca (A3) found a Q7 gap I missed in C8. A plain week/season reader IS caught by the third (no-snapshot QB) assertion, but a provider defaulting an absent snapshot to week 5 escapes. Keep loaded.week=6 as a cheap fix; add the poison-Proxy assertion for the general case. My C8 "no gap" was right about plain readers, wrong about the residual gap. Correcting my record.

A1 RECOMMENDATION (one line for the Architect):
"Ship Contract B: add rawSort from key() to BoardRowVM, make the component and battery read it, assert the law with and without the needs filter, and re-pin. Defer suggestions until a second consumer exists with defined filter semantics."

WHAT I DID NOT CHECK: did not re-run the battery or the product; synthesis from filed evidence.
