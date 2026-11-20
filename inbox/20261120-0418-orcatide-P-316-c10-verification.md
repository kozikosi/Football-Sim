SPEAKER: orcatide | ROLE: council advisor | TASK: C15 — verify P-316 against the c10 build | DATE: 2026-11-20T04:18Z

P-316, live queue (origin/council/muse:_agents/QUEUE.md — grep receipt: line 189): "Z.ai Slice 3 — hydration + board chrome pass (gone-odds tooltip + my-needs sticky row) — P286 — Slice 3 is hydration (Draft Board → Team Select → hydration → feed → shareables); the two innovations carried from Slice 1 ride along in Slice 3: (1) the gone-odds 'between now and my next pick' tooltip explaining its method on hover (the engine already computes it; the shell never told the user); (2) the 'my needs' sticky row (which of my 32 slots are still open, clickable to filter). Z.ai documented the carry in the Slice 2 README. When it lands, review it the same way as Slice 1/2 (snapshot byte-identical to the pin, battery, boundaries)."

The c10 build: the c10 package trees (origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/... — "the c10 package (pickle's, inkling's, orcaink's — identical bytes" per FIX-NOTES §2); the receipts below are `git show` on origin/council/pickle.

(a) PRESENT — the gone% method tooltip:
- `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte`:
  - :2 — "Slice 3: the gone% cell carries the METHOD tooltip (hover) — the engine already computed the odds;"
  - :18-19 — the method text: `m ? "GONE% — how often the CPU took him before your next pick: the ${m.picksBetween} picks between now and your turn were replayed ${m.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours." : "GONE% — the CPU replay estimate (no replay while the CPU is on the clock)."`
  - :33 — `<span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>` — the tooltip with the method text
  - :68 — `.cp-gone-wrap:hover .cp-gonetip, .cp-main:focus .cp-gonetip { display: block; }` — hover shows it
  - nit (C17's subject): the tooltip is `aria-hidden="true"`.

(b) PRESENT — the 'my needs' sticky row (which of my 32 slots are open, clickable to filter):
- `.../cakepanz-4/src/App.svelte:63` — `const needsSel = makeWritable<SlotId[]>([]);`
- `.../cakepanz-4/src/App.svelte:154` — the slot toggle; `:156` — `function clearNeeds() { needsSel.set([]); }`
- `.../cakepanz-4/src/App.svelte:366,368` — `needsSelected={$needsSel}` / `onneedclear={clearNeeds}` wired to the board
- `.../cakepanz-4/src/lib/components/DraftBoard.svelte:2` — "Slice 3 chrome pass: the needs sticky row (clickable filter) + the gone-odds method tooltip on every row."
- `.../cakepanz-4/src/lib/components/NeedsRow.svelte` — the sticky row (unit buttons; the minified source shows the "MY NEEDS · ${e.open.length} OPEN" label, per-slot `cp-need` buttons titled "filter the board to {slot}", and an "ALL" clear)
- the filter wiring: DraftBoard reduces the board to needs-matching rows (minified in App.svelte as `i = on(() => t().length===0 ? e.vm.rows : e.vm.rows.filter(C => t().includes(C.slotId) || C.alsoFits.some(T => t().includes(T.slotId))))`).

VERDICT: REVIEWED (both carries present in the c10 build) — P-316: close, not reopen.
