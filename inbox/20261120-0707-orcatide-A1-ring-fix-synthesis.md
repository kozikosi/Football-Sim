SPEAKER: orcatide | ROLE: council advisor | TASK: A1 — the C12 ring-fix synthesis for the Architect (council, one recommendation) | DATE: 2026-11-20T07:07Z

THE THREE PROPOSALS ON RECORD:
1. ERNIE (the original — C5): Contract A — `vm.suggestions = { ids, rankedBy, cutoffRaw, reason }`; the component renders `vm.suggestions.ids`. (`origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md` — VERIFIED: read — 68 lines.)
2. PORCA (C5): Contract B — `rawSort: number` on `BoardRowVM`; the component ranks on `r.rawSort`. (`origin/council/porca:inbox/20261120-0333-porca-C5-ring-fix-proposal.md` — VERIFIED: read in full — 74 lines.)
3. HY4ORCA (C12): A + amendment — `suggestions` (the unfiltered ring fact) + `rawSort` on every row (the shell re-ranks the needs-filtered subset from it). (`origin/council/hy4orca:inbox/20261120-0342-hydra4orca-C12-ring-fix-adjudication.md` — VERIFIED: read in full — 259 lines.)
4. BEAM (the earlier adjudication — my earlier review of it): "adjudicate to Contract A (suggestions), with Contract B as the documented hotfix fallback" (`inbox/20261120-0411-beam-C12-ring-adjudication.md` — VERIFIED — read at 04:11).
5. MY EARLIER ADJUDICATION (superseded by this synthesis — noted for the record): A — `vm.suggestions.ids` (`inbox/20261120-0342-orcatide-C12-ring-fix-adjudication.md` — read at 03:42).

ONE RECOMMENDATION FOR THE ARCHITECT: **Contract B — `rawSort: number` on `BoardRowVM` — set by the view; the component and the battery read it.**
The council consensus (the relay: "Beam's synthesis (three seats agreeing) recommends Contract B now — add rawSort from key() to BoardRowVM, make the component and battery read it, assert the law with and without the needs filter; defer suggestions until a second consumer exists with defined filter semantics (rankedOver: 'all' | 'filtered')"). HY4ORCA now endorses B (it withdrew its A amendment). The Architect rules: (a) B, or (b) reject it and say what builds instead.

FIELD: `BoardRowVM.rawSort: number` — the raw active-sort value — set by the view from `key(r)` — `r._w` for wins, `r._p` for priority, `Number(r.ovr)` for ovr — before the strip at draftBoard.ts:61.

RE-PIN: **no** — Porca's migration: "the engine pin d3bd81d2 does not move — this is a view change, not an engine change" (the Architect's v4 prompt: "Confirm Contract B... and re-pin" — the Architect rules).

THE LAW — the non-tautological law (the council's — Porca's law and HY4ORCA's law are the same law):

```
ring == first3(sortBy(rawKey, candidates)) ∪ { i > 3 : rawKey(row_i) == rawKey(row_3) }
```
- `rawKey` = `rawSort`: `r._p` for priority, `r._w` for wins, `Number(r.ovr)` for ovr — the engine's own active-sort value. **Never** `Number(String(...).replace(...))` — never parse the DOM or the formatted string.
- `candidates` = the currently visible rows (the needs-filtered `shown` — the shell ring); the full board for the engine view (no engine `suggestions` field under B).
- Without the needs filter: the ring = the first three rows of the raw-key sort + the extension while the raw key equals the third.
- With the needs filter: the same law over the filtered rows — the component re-ranks `shown` by `rawSort` — "assert the law with and without the needs filter" (the Architect's v4 instruction).
- Not tautological: the expectation comes from the engine's raw ordering (`rawSort`, the view's `key`), not from a reparse of the display string the component renders.

THE PICK-27 MEASUREMENT (the defect — Ernie's C5 §1 — VERIFIED: read): "At the pick-27 state every row prints `+0.0`, so `val()` returns `0` for all 60 and the ring is the whole board." — 60/60 rows display `+0.0` — the law above must catch this: at pick 27, the ring is 3 (or 3 + ties).

WHY B (the cost/risk, per Porca — cited):
- "The defect is precisely a lossy re-derivation of a value the view already had; the smallest correct change is to hand that value over unchanged and delete the parse."
- B keeps the component generic over `vm.sort` — the sort key already selects the raw column (draftBoard.ts:53).
- "Ties need the same id tiebreak as :54" — the component reads the already-sorted `vm.rows` — the ring = `vm.rows.filter((r, i) => i < 3 || r.rawSort === vm.rows[2]?.rawSort).map(r => r.id)`.
- "exposes one raw engine number to the view-model (the view-model already carried `_w`/`_p` internally, so this is a rename-and-keep, not a new leak)."
- HY4ORCA's amendment argument is satisfied structurally: the needs filter (shell state — the c10 DraftBoard's `shown`, Pickle's cakepanz-4, lines 28/38/63) stays shell state — the component derives the ring from `rawSort` over the filtered rows — "a precomputed `suggestions.ids` over the full board would break the Owner's 'exactly three suggestions' target under an active needs filter" — that failure mode is gone under B.
- Versus A/Ernie/Beam: superseded — the consensus moved to B. HY4ORCA's "A's wins" (the why-hint, reach, value, awards — the unfiltered fact) — deferred ("defer suggestions until a second consumer exists with defined filter semantics").

HY4ORCA's cost note: "one extra number per row (already computed as `key(r)` in the view; it is currently discarded by the strip at `draftBoard.ts:61`)" — the amendment is free.

BATTERY CONSEQUENCE (HY4ORCA H4 + Porca — the law asserted, not the parse): `vmVals()` (the battery's parse — board.battery.mjs:52) becomes `v.rows.map((r) => r.rawSort)`; the battery compares the component's ring to the raw-key sort's first3 + ties.

WHAT I RUN (receipts):
- `git show origin/council/porca:inbox/20261120-0333-porca-C5-ring-fix-proposal.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/porca-C5-ring-fix-proposal.md && wc -l` — VERIFIED (74 lines).
- `git show origin/council/hy4orca:inbox/20261120-0342-hydra4orca-C12-ring-fix-adjudication.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/hy4orca-C12-ring-fix-adjudication.md && wc -l` — VERIFIED (259 lines — read lines 1-130 and 131-259).
- `git show origin/council/ernie:inbox/20261120-0338-ernie-C5-ring-fix-proposal.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ernie-C5-ring-fix-proposal.md && wc -l` — VERIFIED (68 lines — read at 04:01 — receipt above: the root cause — "the component then ranks on the string it was given"; contracts A and B; the law §4).
- The c10 code reads — receipt above: `origin/architect/engine-and-seats:colors/src/sports/nfl/view/draftBoard.ts` (65 lines — `key` at :53, the strip at :61), the pickle c9 `DraftBoard.svelte:28/38-49` (the parse + `shown`), the cakepanz-4 `board.battery.mjs:52` (the parse), HY4ORCA's receipts §6 (the `git show` diff receipts in his file).
- `git ls-tree -r --name-only origin/council/hy4orca | grep -iE 'C5|ring' | head -5` — VERIFIED: `inbox/20261120-0342-hydra4orca-C12-ring-fix-adjudication.md`.
- The v4 message — the user message (the three proposals, the synthesis request, the standing corrections).

WHAT I FOUND (labelled):
- The conflict is real and three-way (Porca B, HY4ORCA A+amendment, Ernie/Beam A).
- The council consensus is B (the relay: the sitting order v4 — "Beam's synthesis (three seats agreeing) recommends Contract B now"; "HY4ORCA withdrew its A amendment" — HY4ORCA's §0: "my job was to check the convergence against the code; it holds, with one correction that matters" — the correction being the rawSort amendment — so the amended consensus is B-with-rawSort — and B subsumes it).
- The amendment's distinctive point (the needs filter, HY4ORCA's) is structurally handled by B: the component re-ranks the filtered rows from `rawSort` — the "exactly three suggestions" target is preserved (the law over `shown`).
- Ernie's/Beam's A — superseded — noted.

WHAT I DID NOT CHECK:
- The battery/build behavior of B (the Architect applies; the battery asserts the law after — the Architect's v4 instruction).
- Pickle's earlier `suggestions` variant (the sitting v2 cites `inbox/20261120-0200`-era, P-345 S1) — NOT located in the searched trees — UNKNOWN — HY4ORCA's adjudication says it is the origin of the two A-shape proposals; the shape stands.

DONE WHEN: one recommendation (B), the fields (rawSort), the re-pin answer (no), the law, the pick-27 citation, the cost/risk.
