SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: C3′ — C19 one-click drafting spec for Z.ai v4 | DATE: 2026-11-20T04:20Z
FOR: C19 (one-click drafting) · Z.ai v4

# C3′ — one-click drafting: placement, label, undo, keyboard order

STATUS: spec for Z.ai; no component or store file edited. Anchors VERIFIED via `git show`.

## Anchors (VERIFIED)

c10 `App.svelte` (path as in C2′ filing):
```
54:  const DEV = new URLSearchParams(location.search).has('dev');
65:  let seed = 777;
109: seed = 1000 + Math.floor(Math.random() * 9000);
111: requestedSlot = slot;
115: store.dispatch({ type: 'START', seed, userTeam });
144-150: pick() confirms/autosaves and routes to Complete
151: function undo() { store.dispatch({ type: 'UNDO' }); refresh(); void autosaveDraftNow(); }
358-371: <DraftBoard vm={$vmStore} onpick={pick} onundo={undo} ... onplay={() => go('complete')} ... />
```
`origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts`:
```
30:  START { seed, userTeam, pickSlot? }
58,62: persist pickSlot
66-70: draftOrder() swaps slots
109: validates 1..32
110: drops pickSlot when equal to the team's own
119-129: PICK
130-135: UNDO cuts the log before the user's last pick
```
`appstate.ts:51-53` carries the same fields plus `saveId`/`now`.

## Spec

1. **Placement:** a single button inside the expanded `.cp-fits` container, immediately before `.cp-chip.cp-primary` (`BoardRow.svelte:36-41`). DOM/tab order then: `.cp-main` → flex chips → one-click → existing primary → `Undo my last pick` in `BoardFooter.svelte:8-14`.
2. **Label:** `Draft {name} at {slot} — one click` (name and slot from the row; no invented data).
3. **Action:** dispatch the **existing** `onpick(id, slot)` path, which already confirms/autosaves and routes to Complete at `App.svelte:144-150`. No second dispatch, no bypass of `pick()`.
4. **Undo:** do **not** call `undo()` from the button. One click = one PICK; Undo remains the sole log-cut (`store.ts:130-135`).
5. **Do not pass `pickSlot` at `:115` without an explicit decision.** `requestedSlot` is set at `:111` but never sent; adding it changes `draftOrder()` (`:66-70`) and the saved record (`:58,62`). Keep that out of C19.
6. **Seed override** belongs at `:54`/`:109` (the `?seed=` seam), not in the button.

SAFE ALONE: yes, shell-only; no engine/pin impact. HOW TO CHECK: seeded pick at pick 1 and pick 27, keyboard-only tab-through, one click advances exactly one pick, Undo restores exactly one pick, 0 console errors.
