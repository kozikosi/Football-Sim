SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C17 + C19 — the BoardRow a11y patch and the one-click drafting spec | DATE: 2026-11-20T04:12Z

FOR: Z.ai (T2 + T4), the Architect (the a11y law)
VERDICT: **C17 improved (exact patch) · C19 improved (four decisions, one layout).**

---

## C17 · The BoardRow a11y patch

**The defect.** In the c10 `BoardRow.svelte` the gone% method exists twice in the DOM:

```svelte
<span class="cp-gone-wrap">
  <span class="cp-num cp-gone">{r.gone}</span>
  <span class="cp-gonetip" role="tooltip" aria-hidden="true">{method(oddsMeta)}</span>
</span>
…
<p class="cp-gonehow">{method(oddsMeta)}</p>
```

The visible tooltip is `aria-hidden="true"` (correct for a visual duplicate), but the only *other* copy is inside `.cp-fits`, which is `hidden` until the row is expanded. So a screen-reader user who never expands the row never hears the method. The numeric cells carry `title` (not reliably announced) and the row has no `:focus-visible`.

**The patch (three lines + one CSS rule).**

1. **Name the gone% cell with the method** — the simplest robust fix, no new DOM:

```svelte
<span class="cp-num cp-gone" aria-label={`${r.gone} — ${method(oddsMeta)}`}>{r.gone}</span>
```

A screen reader announces the full sentence ("62% — how often the CPU took him before your next pick…"); a sighted user sees `62%`. The tooltip keeps `aria-hidden="true"` so it is not double-announced.

2. **If you prefer `aria-describedby`** (a separate node), add a visually-hidden description and point at it:

```svelte
<span id={`cp-gone-${r.id}`} class="cp-sr">{method(oddsMeta)}</span>
…
<span class="cp-num cp-gone" aria-describedby={`cp-gone-${r.id}`}>{r.gone}</span>
```

Either is fine; do not do both (the cell would be named and described with the same text).

3. **Focus-visible** (the row, the chips, the confirm):

```css
.cp-main:focus-visible, .cp-chip:focus-visible, .cp-go:focus-visible {
  outline: 2px solid var(--gold2);
  outline-offset: 2px;
}
```

4. **Do not** remove `aria-controls="cp-fit-{r.id}"` — the container is always present (hidden when closed), which was the A8e fix.

**How to check.** An a11y-tree dump of a row: the gone% cell's accessible name contains the method sentence; tabbing to `.cp-main` shows a visible ring; Enter expands; the chip is reachable; zero console errors.

---

## C19 · One-click drafting — the interaction spec

**The four decisions.**

1. **Where the button goes: in the name cell, not a new column.** The row is a 7-column grid (`1fr 44px 44px 48px 72px 72px 56px`); adding an 8th column shifts every row and breaks the 390 px layout. The name cell is `1fr`, so a small pill after the name costs no layout:

```svelte
<span class="cp-name">
  {r.name}
  {#if suggest}<button class="cp-draft" onclick={(e) => { e.stopPropagation(); onpick(r.id, r.slotId); }}
    aria-label={`Draft ${r.name} at ${r.slotLabel}`}>Draft</button>{/if}
</span>
```

`stopPropagation` matters: the row itself is a button, and the click must not also toggle the expand.

2. **The label names the slot.** `Draft` alone is ambiguous for a player who fits several slots (the flex chips); `aria-label="Draft {name} at {slot}"` names it for the screen reader, and a visible `Draft` pill keeps the row compact. If there is room, show `Draft {slot}`.

3. **Undo is the safety net, not a confirm dialog.** One click picks; `undo()` (`App.svelte:151`, already wired to `UNDO` + autosave) is visible next to the pick counter. No modal.

4. **The flex path stays.** A non-ringed row still expands to `.cp-fits` and the chips; a player who wants a flex slot is unaffected. The ringed row can also expand (click the name, not the pill).

**The states.**

| state | row | pill |
|---|---|---|
| idle | `.cp-main` default | hidden (not ringed) |
| ringed | gold ring (`.cp-suggest`) | visible, `Draft` |
| hover | row tint | pill brightens |
| focus | `:focus-visible` outline | outline |
| picked | the row leaves the board, the counter advances | gone with the row |
| undone | the row returns, the ring is recomputed | visible again |

**How to check.** At pick 1 the three ringed rows have a pill; clicking one advances the counter by exactly 1 and the CPU picks on; undo restores the same rows and ring; a non-ringed row still expands; keyboard Tab reaches the pill and Enter picks; zero console errors.

**What I did not decide.** Whether the pill shows `Draft` or `Draft {slot}`; that is a visual call for Z.ai, and the reviewer should accept either as long as the accessible name carries the slot.