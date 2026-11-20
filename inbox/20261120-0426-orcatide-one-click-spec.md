SPEAKER: orcatide | ROLE: council advisor | TASK: C19 — the one-click drafting interaction spec | DATE: 2026-11-20T04:26Z

CONTEXT (for the Author): the c10 board today — expand → chip → confirm (the cakepanz affordance, measured below). w89's row Draft (the Owner's w89 signal) is one click (`resetbtn zpb-ctabig`, label "Draft", on the row). The spec below is the council's shape for T2: a Draft button on the ringed rows that lands one pick on one click. Proposal only — do not edit the build.

MEASUREMENTS:
- w89 (`origin/gh-pages:Football-Sim-Z-post-blue-w89.html:6430` — `const btn = r => (canPick && r.slot) ? \`<button class="resetbtn${top3.has(r.p[0])?' zpb-ctabig':''}" style="width:auto;margin:0;padding:3px 9px;font-size:0.75rem;" data-pick="${r.p[0]}" data-slot="${r.slot}">Draft</button>\` : ''; // W66: the top-3 priority buttons wear the team-colored sheen`): the row's own Draft button — label "Draft", one click, no confirm; the `zpb-ctabig` sheen rides the top-3 priority rows.
- cakepanz (the c10 path — the expand → chip → confirm affordance):
  - `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte` — the row is a button (`.cp-main`, `aria-expanded={open}` + `aria-controls="cp-fit-{r.id}"` — the detail container always exists, `hidden` when closed — A8e);
  - the chip: `<button class="cp-chip cp-primary">Draft at {r.slotLabel}</button>` (the "chip" — the pick control);
  - the confirm: `DraftBoard.svelte:55-61` — the `.cp-confirm` paragraph ("Draft {name} at {slot}?", Confirm the pick / Cancel).

DECISIONS (the four calls):
(a) The button's home: on the row itself — the one-click Draft button rides the ringed row (`.cp-suggest`), beside the row's pick control. Rationale: the ring is on the pick control (C′1), but the Owner's w89 signal puts the Draft on the row; the council spec takes the w89 shape (row-level button) so the ring rows are pickable with one click.
(b) The label: `Draft {name} at {slot}` — e.g. "Draft Tannehill at 4". (w89 says "Draft"; the sitting wanted the exact label decided.)
(c) Undo: the board's existing one-step Undo ("Undo my last pick") stays as-is; the Draft click is itself the pick — there is no second undo for it.
(d) Keyboard: Tab/Enter on the Draft button is the primary path; j/k to move the ring + Enter on the focused row's Draft button.

THE SPEC — states, idle → picked → undone:
- idle: the ringed row shows the Draft button (label per (b)); the row is `.cp-suggest` (the ring); un-ringed rows carry no Draft button.
- hover: the Draft button + the row's hover background (`.cp-main` hover — color-mix 7% — the c10 rule).
- focus: `:focus-visible` on the Draft button + the row — the C17 patch adds `:focus-visible` to `.cp-main`/`.cp-chip`/`.cp-primary` and shows the tooltip on it.
- picked (one click): the Draft button click → the pick lands (the player moves to the user's roster, the board re-sorts by the C12 law, the ring shifts by the C12 law); the pick-confirm ("Draft {name} at {slot}?" + Confirm/Cancel) is NOT shown — one click = the pick (the sitting: "a one-click Draft on a ringed row lands exactly one pick" — C18).
- undone: the board's Undo — one step back (the picked player back on the board; the ring recomputes by the C12 law).
- states not offered: a "picked" state where the Draft button stays on the row after the pick (the ring shifts past the picked row on the next pick — no separate undo state needed).

WHERE IT LANDS (for the Architect): the c10 package trees — the Draft button in `cakepanz-4/src/lib/components/BoardRow.svelte` (on the ringed row, where the `suggest` prop lives) — plus the CSS (the button styles, the `:focus-visible` from C17). Proposal only — do not edit the build.

WHAT I RAN (receipts):
- w89 — `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html | grep -nE 'ctabig' | head -10` — receipt above: :6430 the Draft button (class `resetbtn${top3?' zpb-ctabig':''}`, label "Draft"); the `zpb-ctabig` rule at :1370 (the shimmer CSS).
- the c10 affordance (all on origin/council/pickle):
  - `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/BoardRow.svelte` — `git show ... | head -45` — the `.cp-main` row button (`aria-expanded`/`aria-controls`, :37), the detail container (:30, `.cp-fits`), the method tooltip (:33), the method text (:18-19), the `cp-gone` cell (:32);
  - `_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte` — `git show ... | sed -n '55,61p'` — the `.cp-confirm` paragraph ("Draft {name} at {slot}?", Confirm/Cancel);
  - `_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/...` — `git show ... | sed -n '40,80p'` of BoardRow — the style block (`.cp-gone`, `.cp-gone-wrap`, `.cp-gonetip` hover rules, `.cp-main`, `.cp-chip`, `.cp-primary`).
- the sitting v3 C19 text (the four decisions) — the user message.

DONE WHEN: one page, four decisions (the button's home, the label, the undo, the keyboard path), the exact labels.
