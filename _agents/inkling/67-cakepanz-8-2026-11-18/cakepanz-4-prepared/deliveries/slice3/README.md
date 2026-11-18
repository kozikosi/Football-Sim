# Slice 3 — hydration + board chrome (P-316) · the laws

The slice order is Draft Board → Team Select → hydration → feed → shareables. The board chrome
(the gone-odds method tooltip, the "my needs" sticky filter) was found already built and wired in
the shell (BoardRow.svelte + NeedsRow.svelte + DraftBoard.svelte + App's `oddsMeta`/`needsSel`) —
per the Part A rule it was NOT rebuilt; the 2026-11-17 sitting shipped its browser-side laws
(26 → 29). What this sitting (cakepanz-7, 2026-11-18) adds is the piece that was genuinely
missing — **the app hydration** — plus the **node-side laws** for all three features. One battery
(batteries/node.battery.mjs — the framework-blind one); a second battery is forbidden.

## The build: the boot rehydration of the full AppState

- `src/lib/port/hydrateApp.ts` (NEW) — the auto layer over the engine's own save contract:
  - `autosaveDraft(record, meta)` — the WHOLE current draft record, enveloped by the engine's own
    `serialize()`, written whole (never merged) to `sim:nfl:autosave:draft` on every state change
    (START, LOAD, PICK, UNDO).
  - `autosaveWeek(payload, meta)` — the running season's week payload to `sim:nfl:autosave:week`
    (on begin/step/restore/manual save).
  - `clearAutosaveWeek()` — a NEW draft (START or a slot LOAD) invalidates a stale season autosave.
  - `readAutosave()` — the boot read: both keys classified by the engine's own `restore()`; a
    refused blob comes back `{ ok: false, message }` VERBATIM (corrupt-never-repair) and the shell
    shows it instead of landing on an empty board. Nothing repaired, nothing defaulted.
  - The keys are non-slot keys (F8's slot assertion binds only `slot:*` keys); the envelopes carry
    full lineage (saveId / createdAt / engineVersion / dataVersion), so the older-build note path
    stays honest across a refresh.
- `src/App.svelte` — the composition only: `hydrateBoot()` on boot (a saved draft lands back on
  `board` via the same `loadDraft` path the Saves panel uses; a saved season resumes through
  `sessionFromWeekPayload` → `seasonFacade.resume` and lands on `hub`), and the autosave writes at
  each state change. The settings (mode, reduced-motion, team, slot) already persist via
  port/settings.ts — together the boot restores settings + draft + season: the full AppState.
- `dist/` rebuilt (`npm run distfile`) — the boot artifact carries the rehydration.

## The laws (batteries/node.battery.mjs — `npm run battery:node`, now 31)

- **N25 (HYDRATE): a refresh mid-draft lands back on the same board.** START a draft, make three
  real picks through the engine's own store, write the autosave the way the shell writes it, read
  it back into a FRESH store through the boot path, and assert: the rendered board + header are
  byte-identical across the reload (sha256 of the VM's header + rows), the next pick is the user's
  own, every logged pick returns, the user team and seed return; the season half completes the
  draft (the WeekPayload contract needs the full 32), autosaves the week payload and resumes to
  the same `nextWeek` for the same team; a corrupt autosave is refused in the engine's own words
  (`payload: bad seed`); the composition (boot calls `hydrateBoot()`, the state changes write the
  autosaves, a new draft clears the stale week) is asserted on the App source.
- **N26 (tooltip): the gone-odds tooltip renders the engine's own number and states its method.**
  Every row's gone cell equals `goneDisplay(goneChance(odds, id))` recomputed from the seam row by
  row (no hardcode); the cell renders the VM value verbatim (`{r.gone}`); the tooltip opens on
  hover AND keyboard focus; its text names the engine's own replay meta (`picksBetween`, `sims`)
  and carries no hardcoded percentage; `oddsMeta` rides from the App's `goneOdds(st.draft,
  userTeam, makeRng(seed * 7 + 13), 30)` call. (The odds' TRUTH itself is N19's law — a direct
  engine replay; N26 is the surface law.)
- **N27 (needs row): the "my needs" sticky row shows exactly the roster's empty slots.** The open
  set IS the engine's `openSlots(roster)`; one landed pick closes exactly one open slot and the
  filled slot leaves the set; the count renders from that set (`MY NEEDS · {open.length} OPEN`);
  a need is clickable (`ontoggle`) and the selection filters the board (`needsSelected` →
  `vm.rows.filter`, the filtered count measurable via `data-count`); the row is `position: sticky`.

## Before / after

- Before this sitting: `npm run battery:node` → **28/28** (receipt: VERIFY §3, this sitting's §20).
  A refresh mid-draft landed back on Team Select with the draft gone (no auto layer).
- After: **31/31** (28 pre-existing + N25/N26/N27), exit 0, on Node 24 AND Node 26 — receipts in
  VERIFY §20.4. The dist/single.html boot artifact carries the rehydration (regen + gate receipted).
