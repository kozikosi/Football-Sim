SPEAKER: zai | ROLE: executor | TASK: Slice 2 revision — the exact spec (merge BLOCKED on the unlanded store contract) | DATE: 2026-11-14
FOR: P-317 (the Z.ai half; the Architect half is P-317's store change)
PIN: n/a — SPEC ONLY · BASE: architect/engine-and-seats @ 0364013 (store read, not edited) · ENV: —

**Status: the merge is BLOCKED, per the assignment and v2 §4.1 — Claude's SaveRecord change has NOT landed.** Receipt: `git show origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts` @ 0364013 → `SaveRecord = DraftPayload` with `{ seed, userTeam, picks, pool }` — **no slot field, no custom order**; the `START` action takes `{ seed, userTeam }` only and builds the default `snakeOrder()`. Building the picker against this contract would ship a UI that silently loses the slot on every restore (`pick N is out of order`). So: spec now, merge never before the store change.

## The spec (framework-neutral; INFERRED lines marked)

**1 · Store contract the Architect must land first (his half, restated for the record).**
- `START` gains an optional `slot?: number` (1–32, the user's draft slot). Validation: integer, 1–32, else `start: bad slot`.
- With `slot`, the store builds the custom order: the user's team fixed at index `slot−1`, the other 31 teams filling the remaining 31 indexes of a snake order (INFERRED: keep the default snake's round-by-round reversal; the slot only permutes WHERE the user's team sits. Alternative — reverse snake from the slot — is the Owner's call if he wants one).
- `DraftPayload` gains `slot?: number` (and the order is RE-DERIVED from seed+slot on restore — never stored — so old saves without `slot` restore exactly as today, unchanged bytes for unchanged behaviour).
- `restoreDraft` uses the derived order; the out-of-order throw then fits the log by construction.

**2 · The Z.ai half (this spec's deliverable once (1) lands).**
- `TeamSelect.svelte`: add the slot picker on the SAME screen, SAME look — a second inline `select.slotsel` beside the team picker, options "Your pick: 1 … 32", defaulting to the team's natural snake slot (INFERRED default; the Owner's ruling "user picks BOTH team AND position" implies no silent default for submission, so the CTA stays disabled until both are chosen — the disabled state is the existing w-18 ALL/NONE quiet style).
- `App.svelte startDraft(teamIndex, slot)`: passes `slot` through `dispatch({ type:'START', seed, userTeam, slot })`.
- `draftStore.ts`: type extension only (the action union).
- Restore: the slot rides the payload; the Team Select screen is skipped on LOAD (the store already restores the draft); the saves panel shows "slot N" next to the team (INFERRED label placement — same line, small caps).
- Accessibility: the select is a real `<label>`d control, keyboard-operable, aria-label "Your draft slot"; no color-only state; the disabled CTA carries a visible reason ("choose your draft slot").
- Seed-order interaction: the seed stays random per START (unchanged); the ORDER is a pure function of (slot, 32 teams) — the same seed with a different slot replays a different but deterministic draft (INFERRED: the seed's schedule/rng use is unaffected; only `order` changes).
- UX for "slot = the user's original pick slot": after START, the board footer names it — "You pick Nth overall" — computed from the store's own order (engine truth, not a UI copy).

**3 · The deeper check this unlocks (P-315, also blocked on (1))**: draft an early-pick team (slot 1–3) and a late-pick team (slot 30–32) through several rounds — chosen team on the clock at its slots, picks landing on its roster, CPU picking correctly around it, mode lock holding — receipt per round.

VERIFIED: store shape read at 0364013 (command above) — the blocker is real and current as of this sitting.
REPORTED: the Owner's ruling text (P-317 queue row) for the UX requirements.
INFERRED: the 4 lines marked above; each becomes firm when the store contract lands.
FILES: this spec only. No UI code was written against the unlanded contract.
