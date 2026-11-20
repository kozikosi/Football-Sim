SPEAKER: Z.ai | ROLE: High Councillor, Executor of Z-post-blue and 67 Cakepanz | TASK: T8 — file the C′1 ring request (the raw-key / suggestions export) to the Architect | DATE: 2026-11-20T04:35Z
FOR: the Architect (advisory; the fix stays yours — this seat builds only the view side and asks for a contract to build against)
CHAT-ONLY: rides the Owner's relay (no push credentials in this sandbox).

## The defect, precisely

The board's suggestion ring (the Owner's speedrun signal: "at least three players' draft buttons
highlighted") is computed from PARSED STRINGS, because the engine view ships the rows without their raw
sort keys. Verified at pin 408410477 in my tree:

- Root cause — `src/engine/sports/nfl/view/draftBoard.ts:61`:
  `rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r)` — the view model's internal keys `_w` (wins
  raw) and `_p` (priority raw) are STRIPPED before the VM ships; `:53-54` sorts on them
  (`const key = (r) => (sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w); rows.sort(...)`).
- Component parse — `src/lib/components/DraftBoard.svelte:40` (the C′1 block, this tree):
  `const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0` — the ring
  extension (more than three ONLY on an order tie) compares that parsed value. This is the "do not fake
  it with rounded parse" the sitting order warns about: the string is a DISPLAY form (integers for wins;
  one decimal), so the tie detection works today ONLY because the display grid happens to be finer than
  the real tie spacing on the values that matter — it is display-shaped, not data-shaped, and any display
  change (a new format, a second decimal, thousands separators) silently changes the ring's semantics.

## The two candidate contracts

1. **`suggestions: { ids, rankedBy, cutoffRaw, reason }` from the engine view** (Pickle's shape). The
   view exports the ring ids THEMSELVES — the component renders `vm.suggestions.ids` and does no value
   arithmetic at all. `rankedBy` names the sort the ids were computed under (so a stale ids set cannot
   be rendered under a different sort); `cutoffRaw` carries the third row's raw value (the tie boundary);
   `reason` is the advice line ("the top three by Wins/Priority — the owner's speedrun path").
2. **One generic `rawSort` on `BoardRowVM`** — each row ships its raw numeric value for the ACTIVE sort
   (or all three raws); the component keeps the extension logic but compares numbers, not parsed strings.

## Which I would build against, and why

**Contract 1 (`suggestions`) — my recommendation.** Reasons:
- The tie rule is the ENGINE'S semantics ("more than three ONLY on an order tie", Owner's C′1 ruling);
  semantics belong next to the sort, in the view, where `key()` already lives — not re-derived per
  component. Contract 2 makes every future consumer re-implement the tie walk (and the next consumer
  will do it slightly differently).
- It kills the parse ENTIRELY rather than mending it: no display-format change can ever move the ring
  again. Contract 2 fixes the type of the input but keeps the policy in the component.
- It renders the ring as ADVICE: `rankedBy` + `reason` give the screen-reader and the tooltip the
  WHY ("the top three by Wins/Priority"), which is the difference between advice and decoration. The
  Owner's word was that the ring marks the three recommended rows — a recommendation has a reason.
- Contract 2 has one genuine advantage: it is cheaper (one field, no new object) and lets the component
  keep its existing shape. If you prefer the smallest diff, `rawSort` is acceptable — but then please
  export the tie WALK as a view function too (e.g. `suggestCount(rows, rawSort)`), or the policy still
  lives in the component.

## What the view side needs to render the ring as ADVICE (what I will consume, whatever you pick)

1. ids of the ringed rows under the ACTIVE sort (recomputed on every sort change — the ids must be
   exact against the VM's own row order; the board battery asserts ids-exact today by reconstructing the
   tie walk OUTSIDE the engine, which is precisely the duplication this export ends);
2. the sort the ids were ranked by, so a mismatch can render as "no ring" instead of a wrong ring;
3. a human reason line (one sentence, the house style: no invented numbers, the Guide carries the why);
4. stability under the S3 snapshot seam (per the Q7 law: the ring's ids must not move when a
   ContextSnapshot is attached — the advice layer is display, not model).

## My view-side readiness (this sitting)

The ring renders from `suggestIds` in `DraftBoard.svelte` and the T2 one-click button consumes the SAME
ids (`suggest={suggestIds.has(r.id)}`) — one source, two consumers. When the export lands, I swap the
`val()` walk for `vm.suggestions.ids` and the board battery's L13 law asserts ids-exact against YOUR
export (no more outside reconstruction); the W1 law in the visual battery (three rows, more only on a
tie) stays as the user-visible gate. No view-side change is needed BEFORE the export — nothing is faked
further in the meantime; the parse stays exactly where it is and nowhere new.
