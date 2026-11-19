SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A8 — the Part-0 defect packets, anchor-exact, adoptable verbatim (D1/D2/D3/D5.3) | DATE: 2026-11-19T06:54Z

Anchors re-pulled this window from the SHIPPED source (the scratch verify copy — `src/` untouched). Line
numbers as of the cakepanz-9 shipped bytes. No fixes made here; the fixes are Part 0 of z.ai's next sitting.

## D1 — the second-refresh season loss (the season disappears)

**Anchor (shipped bytes), `src/App.svelte`:**
```
167:  function loadDraft(record: unknown, lineage?: { saveId?: string; createdAt?: string }) {
177:    void clearAutosaveWeek();   // a slot load replaces the session; a stale season autosave dies with it
199:    if (r.draft) loadDraft(r.draft.record, r.draft.lineage);                   // the board + header + next pick return
```
(`hydrateBoot` resumes `r.week` AFTER `loadDraft`, but `loadDraft` deleted the week autosave at line 177 — nothing re-writes it. `hydrateApp.ts:47` — `clearAutosaveWeek` — removes `AUTO_WEEK_KEY`.)
**Law S29b:** after a resumed hub, a second refresh still lands on the hub and the week key exists.
**Fix (DS, applies verbatim):**
```ts
function loadDraft(record: unknown, lineage?: { saveId?: string; createdAt?: string }, opts: { keepWeek?: boolean } = {}) {
  …
  if (!opts.keepWeek) void clearAutosaveWeek();
}
// hydrateBoot → loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week })
```
**Repro:** two boots of a mid-season `?dev=1` build (boot1 → hub running; boot2 → Complete; boot3 → Complete); DS's receipt: `receipts-c81-c9-addendum.md` (`_agents/ds/deliveries/cakepanz-8.1-review-2026-11-18/`) with `probe-two-reload.mjs`; `AUTO_WEEK_KEY` present after boot1, then `keys=[sim:nfl:autosave:draft]` after the second refresh.
**REPORTED:** DS ran the probe at the c9 shipped bytes (`670d4c08…`); I re-read the three anchor lines and confirmed the control flow — REPORTED stands, cause CONFIRMED.

## D2 — at 390 px the gone% tooltip intercepts the chip taps

**Anchor (shipped bytes), `src/lib/components/BoardRow.svelte`:**
```
33:      <span class="cp-gonetip" role="tooltip">{method(oddsMeta)}</span>
44:  @media (max-width: 430px) {
50:    .cp-gonetip { width: 200px; }
…
65:  .cp-gonetip { position: absolute; right: 0; top: calc(100% + 6px); z-index: 9; width: 240px; display: none;
```
**Cause, mechanical and verified in the served dist:** the `@media (max-width: 430px)` block at lines 50–54 sets `width:200px` — equal specificity to line 65 and **earlier in the file, so the base rule wins at every width**; the 390 px rule is dead code. Shipped `dist/single.html` carries the two rules in that order (`cp-gonetip.svelte-q412k{width:200px}` precedes `…width:240px…`). Result: rendered width = 240 + 2×10 padding + 2×1 border = **262 px** — exactly DS's measurement; the tooltip sits on the chip centre (chip `elementFromPoint` returns `SPAN.cp-gonetip`; row 2 tap retries 30 s: `subtree intercepts pointer events`).
**Law L7b:** `elementFromPoint` at the chip's centre at 390×844 returns the chip; the row below an open row is tappable.
**Fix (DS, smallest full set):**
1. delete the 430 px `.cp-gonetip` rule (or `width: min(240px, calc(100vw - 32px))` in the base rule — one rule, cannot be mis-ordered);
2. `:focus` leg dropped from the tooltip display rule; `aria-hidden="true"` on the span;
3. the method becomes an in-flow line in the row detail: `<p class="cp-gonehow">{method(oddsMeta)}</p>`.
**Repro (DS, receipts):** Playwright 1.57 / chromium-1200, 390×844 — elementFromPoint probes + a tap-on-row-2 retry test. REPORTED.

## D3 — every row's accessible name carries the method text

**Anchor (shipped bytes), `src/lib/components/BoardRow.svelte`:**
```
24:  <button class="cp-main" … aria-controls="cp-fit-{r.id}">
33:      <span class="cp-gonetip" role="tooltip">{method(oddsMeta)}</span>
```
`role="tooltip"` span inside the row's `<button>`; no `aria-hidden`. Screen readers announce the row's accessible name INCLUDING the method string.
**Fix:** `aria-hidden="true"` on that span (part of D2's fix), or move it out of the button into the detail container (B2's hidden-when-closed `.cp-fits` always exists — same pattern).

## D5.3 — the header prints both names

**Anchor (shipped bytes), `src/App.svelte`:**
```
327:    <h1>76 Pancakes</h1>
328:    <span class="cp-track" title="the builders' track name">67 Cakepanz · the shell</span>
```
The track name — "67 Cakepanz · the shell" — renders in the shipped header beside the product name. The `title` is honest about intent ("the builders' track name") but both names are VISIBLE to every user.
**Ruling required from the Owner:** drop the `.cp-track` span, or keep it behind a non-visible treatment. No silence option: this is his one-word class.

## What Part 0 owes z.ai, verbatim

1. D1 patch + law S29b; **2.** D2 patch (one-line CSS + `aria-hidden` + in-flow `.cp-gonehow`) + law L7b; **3.** D3 folded into (2); **4.** D5.3 one line IF the Owner rules it (it is his, not the sitting's). Then: shell battery 48/0 + board battery 6/6 must hold at the fixed bytes, and the D1/D2 laws each pass their repro.

**Repro commands:** D1 — Playwright two-reload fixture (DS's `probe-two-reload.mjs`); D2 — the elementFromPoint + tap test at 390×844; both at the fixed bytes, all-green.

— INKLING, 2026-11-19T06:54Z; anchors read this window at the shipped bytes; repros REPORTED (DS) — re-run at fix time.
