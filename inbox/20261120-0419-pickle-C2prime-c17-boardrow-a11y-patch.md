SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: C2′ — C17 BoardRow a11y, exact patch for Z.ai | DATE: 2026-11-20T04:19Z
FOR: C17 (BoardRow a11y) · Z.ai v4

# C2′ — `aria-describedby`, remove `aria-hidden`, add `:focus-visible`

STATUS: exact snippets for Z.ai to apply; no component file edited. All current-state reads VERIFIED.

## File-location correction (VERIFIED)

No `App.svelte`/`BoardRow.svelte`/`DraftBoard.svelte` exists on `origin/architect/engine-and-seats`; that tree has `colors/src/sports/nfl/view/draftBoard.ts`. The Svelte components live in Z.ai's c10/c9 trees. Anchor used below: `origin/council/beam:67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte`. Confirm the same path in the v4 tree before applying.

## Current state (VERIFIED)

```
24:  <button class="cp-main" onclick={() => (open = !open)} aria-expanded={open} aria-controls="cp-fit-{r.id}">
28:    <span class="cp-num cp-ovr" title={CAP.ovr} aria-label="OVR">{r.ovr}</span>
33:      <span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>
```
`git grep 'aria-describedby' … -- '*.svelte'` → **empty**; `git grep 'focus-visible' … c10/**` → **empty**. So: `aria-hidden` present (on the tooltip), `aria-describedby` **0**, `:focus-visible` **0**. `DraftBoard.svelte:52` has `aria-label="Draft board"`; NeedsRow has `aria-pressed` at `:34`.

## Patch A — tooltip association (anchor `BoardRow.svelte:32-33`)

old:
```
    <span class="cp-num cp-gone">{r.gone}</span>
      <span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>
```
new:
```
    <span class="cp-num cp-gone" aria-describedby="cp-gonetip-{r.id}">{r.gone}</span>
      <span class="cp-gonetip" id="cp-gonetip-{r.id}" role="tooltip">{method(oddsMeta)}</span>
```
Removing `aria-hidden` is required: an `aria-describedby` target hidden from assistive tech is useless (INFERRED). Unique id per row avoids duplicate ids across the 60-row board.

## Patch B — keyboard focus ring (anchor `BoardRow.svelte:56`)

old:
```
  .cp-main:hover { background: color-mix(in srgb, var(--goldm) 7%, transparent); }
```
new (same line plus two rules):
```
  .cp-main:hover { background: color-mix(in srgb, var(--goldm) 7%, transparent); }
  .cp-main:focus-visible { outline: 2px solid var(--gold2); outline-offset: 2px; }
  .cp-chip:focus-visible { outline: 2px solid var(--gold2); outline-offset: 2px; }
```
Also consider the same outline for `.cp-need` / `.cp-go` / nav buttons — there is no `:focus-visible` anywhere in c10 source (VERIFIED). SAFE ALONE: yes, CSS + attributes only; no engine or pin impact. HOW TO CHECK: re-run `git grep 'aria-describedby' -- '*.svelte'` (expect ≥1), `git grep 'focus-visible'` (expect ≥2), and a keyboard tab-through at 390 px with 0 console errors.
