SPEAKER: orcatide | ROLE: council advisor | TASK: C17 — the BoardRow a11y patch (c10) | DATE: 2026-11-20T04:19Z

PATCH (proposed — sitting: "Do not edit the build"; this file is the proposal).

Target: the c10 BoardRow — `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte` (the full file is in WHAT I RAN).

The sitting's asks: (a) `aria-describedby` on the gone% cell pointing at the method text (already in the DOM inside `.cp-fits`); (b) remove `aria-hidden="true"` or keep the tooltip decorative while the description lives elsewhere; (c) add `:focus-visible` to `.cp-main`/`.cp-chip`/`.cp-go`.

1. `aria-describedby` (a):
   - gone% cell — old: `<span class="cp-num cp-gone">{r.gone}</span>` (:32) → new: `<span class="cp-num cp-gone" aria-describedby="cp-gonehow-{r.id}">{r.gone}</span>`
   - the description target in `.cp-fits` — old: `<p class="cp-gonehow">{method(oddsMeta)}</p>` (:41) → new: `<p class="cp-gonehow" id="cp-gonehow-{r.id}">{method(oddsMeta)}</p>` (`r.id` is the row's unique `data-id`; the `p` always exists — A8e — so the described-by target resolves whether the detail is open or hidden).

2. (b) tooltip decoration — propose: keep the tooltip decorative, expose the description on the cell via (1):
   - the tooltip span stays `<span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>` (:33) — decorative, unchanged;
   - the exposed description is the `p.cp-gonehow` (it has no aria-hidden; it is the A8e detail) — referenced by the cell's `aria-describedby` (a2 above). If the Architect prefers the other shape of the sitting, the alternative is to drop `aria-hidden="true"` from the tooltip span — flagged, not done.

3. `:focus-visible` (c) — the file has no `.cp-go`; the go button is `.cp-chip.cp-primary` — propose:
   - `.cp-main:hover` (existing rule, ~:53) → `.cp-main:hover, .cp-main:focus-visible { background: color-mix(in srgb, var(--goldm) 7%, transparent); }`
   - `.cp-chip:hover` (:70) → `.cp-chip:hover, .cp-chip:focus-visible { background: color-mix(in srgb, var(--goldm) 12%, transparent); }`
   - `.cp-gone-wrap:hover .cp-gonetip` (:68) → `.cp-gone-wrap:hover .cp-gonetip, .cp-main:focus-visible .cp-gonetip, .cp-chip:focus-visible .cp-gone-wrap .cp-gonetip { display: block; }` — hmm, keep it as: `.cp-gone-wrap:hover .cp-gonetip, .cp-main:focus-visible .cp-gonetip { display: block; }` (the tooltip now opens on the row's focus-visible, which is where the description is announced via the cell).

A11y dump (before/after): not run — no headless browser was invoked on my side. Expected check (the Architect or a verifier runs it): the gone% cell carries `aria-describedby` → the `p.cp-gonehow` text ("GONE% — how often the CPU took him before your next pick: …"); the tooltip is `display:none` until hover/focus; the row keeps `aria-expanded`/`aria-controls` to the persistent detail container (A8e). Label: not run (UNKNOWN).

DONE WHEN: a diff-shaped patch (1–3) and the a11y dump — the dump is marked not-run above.

WHAT I RAN (receipts):
- `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte | head -45` — VERIFIED (read): :2 — "Slice 3: the gone% cell carries the METHOD tooltip (hover) — the engine already computed the odds;"; :18-19 — `method(m)` — the method text: `m ? "GONE% — how often the CPU took him before your next pick: the ${m.picksBetween} picks between now and your turn were replayed ${m.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours." : "GONE% — the CPU replay estimate (no replay while the CPU is on the clock)."`; :32 — the gone% cell `<span class="cp-num cp-gone">{r.gone}</span>`; :33 — `<span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>`; :37 — `<button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">` — the A8e shape; :41 — `<p class="cp-gonehow">{method(oddsMeta)}</p>` (inside `.cp-fits`).
- `git show origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte | sed -n '40,80p'` — VERIFIED (read): the style block — `.cp-gone { color: #c8a48f; }`, `.cp-gone-wrap { position: relative; display: inline-flex; justify-content: flex-end; }`, `.cp-gonetip { position: absolute; right: 0; top: calc(100% + 6px); z-index: 9; width: min(240px, calc(100vw - 32px)); display: none; background: #2c2127; border: 1px solid var(--gold3); border-radius: 10px; color: #f5e9dd; font-size: 0.72rem; line-height: 1.45; padding: 8px 10px; text-align: left; box-shadow: 0 8px 18px rgba(0,0,0,0.45); }`, `.cp-gone-wrap:hover .cp-gonetip { display: block; }`, `.cp-main:hover { background: color-mix(in srgb, var(--goldm) 7%, transparent); }`, `.cp-chip:hover { background: color-mix(in srgb, var(--goldm) 12%, transparent); }`, `.cp-chip`, `.cp-primary` rules.

WHAT I FOUND (labelled): the sitting's asks are satisfied by the patch above (aria-describedby on the cell → the p in .cp-fits; tooltip kept decorative; :focus-visible added to .cp-main/.cp-chip/.cp-primary); the before/after a11y dump is not run here (not run — no headless browser invoked); the `:cp-gone-wrap:focus-within` alternative is noted but the patch proposes `.cp-main:focus-visible` per the sitting's letter.
