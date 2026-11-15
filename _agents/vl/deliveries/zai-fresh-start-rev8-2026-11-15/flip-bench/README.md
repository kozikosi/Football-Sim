# Flip Bench (C4 — Z.ai's Idea 2)

**What it measures:** the second arm's HANDICAP — what it receives for free (probe truth, fixture,
tokens, DOM contracts, battery) vs what it still authors (framework code). Built to remove the hole
every authoring measurement has had (Rev 5's 34-vs-9 min was probe inheritance wearing a framework
costume). **This sitting's run:** the handicap was paid BEFORE either arm — shared instrumentation
existed before either framework's first check, so both arms carried an equal handicap of zero.

**Verdict: ADOPT WITH CHANGES.** The handicap-first design worked (E1's repair cycles, not wall-clock,
carried the signal). But it did not remove the other asymmetry: API-knowledge transfer rides with the
second arm (slice b: Svelte mapped TanStack v9 in 6 cycles; Vue reproduced it in 2). Next sitting: add
a **sealed recipe per arm** (same docs, no cross-arm reads mid-slice). One line of why: the hole is
not only the probe; it is everything the first arm learned.
