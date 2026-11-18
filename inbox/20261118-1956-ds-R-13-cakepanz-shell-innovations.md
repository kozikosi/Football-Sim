SPEAKER: ds | ROLE: council (innovation) | TASK: cakepanz / the UI shell for Claude's engine — 10 proposals after reading cakepanz-8 | DATE: 2026-11-18T19:56Z
FOR: P-337, R-13, P-316
PRIORITY+: one line for the queue: **P-337 v2 — the late draft should be a three-choice card, not a 60-row table, and Complete should print the roster the engine would field.**

# What this is

Written after reviewing `67-cakepanz-8-2026-11-18` in full (see `inbox/20261118-1956-ds-P-337-cakepanz-8-review.md`). Nothing here is an instruction to Z.ai or the Architect; it is design input. Every item names what it costs and what law would prove it. Items 1–6 are **render/shell only** (no engine, no port, no flex); item 7 is the one that belongs to the Architect; items 8–10 are process/measurement and belong to the round.

The Owner's words this serves (Q6, verbatim): *"We want the user to really enjoy the first ten rounds of the draft and be able to make simple decisions in the second half, not have to do complex math or planning to make a decent roster."* — two halves: **simple decisions** (items 1, 3, 4) and **a decent roster** (item 2, which nothing measures today).

# 1 · The three-choice card (the strongest idea)

**What.** For the user's picks 11+, replace the 60-row simple board with a card of **three** options, each one button:

- **Best available** — the top row by the board's own ranking (the engine's Wins), with gone% band.
- **Best at a need** — the top row among the player's open slots (the needs row already computes the set: `openSlots`).
- **Best value at risk** — the top row whose gone% says he will not last to the next pick (highest wins × urgency band; a shell-side pick over the same VM).

Under the card: `Show the full board` (the existing FULL BOARD door) and the honest one-liner. The board stays one click away; the card is presentation only and moves no engine number.

**Why.** "Simple decisions" is a choice among **three**, not a scan of sixty. The current simple form still asks the user to read 60 rows and compare one number per row — better than the full board, but still a table. The three-card form is the literal reading of the Owner's words.

**How.** `src/lib/port/` gets a pure `pickCard(vm, openSlots)` → `{best, need, risk}` over existing `BoardVM` rows; `DraftBoard.svelte` renders it when `lateMode` is on and `!cardDismissed`. Zero new engine numbers: every candidate is a row the engine already produced, and the chosen pick calls the same `onpick(id, slot)`.

**Cost.** ~80 lines render + ~30 lines port. **Risk.** A user may want a player not on the card — the board is one click away; keep the card dismissible per pick? No: keep it stable, and the card's `Show the full board` behaves like today's door (stays full for the draft).

**Law.** The card's candidates are **rows of the same VM** (ids + wins equal, by sha of the projection); picking from the card produces the same store state as picking that row on the board; the board is reachable in one click and returns.

# 2 · Complete should print the roster the engine would field (the missing acceptance signal)

**What.** On the Complete screen (and the Share card), show the lineup the engine itself would start — `lineupFor(rostersOfRecord(rec)[userTeam], '4-3')` — with `effOvr` per slot, the **three weakest slots**, and one line: "the simple board was on for picks 11–32" (when it was).

**Why.** Q6's goal is an **outcome**: "a decent roster". Today nothing in the shell says whether the roster is decent. The engine already computes the best lineup and every player's effective OVR; printing it turns the promise into a visible result, and gives the Owner the evidence to judge simple mode (and later to set the "decent" bar).

**How.** Complete already receives the record; `lineupFor` is already imported into `App` (it feeds the advice panel). Move the call into Complete (or pass a derived `lineupSummary`). No engine change.

**Cost.** ~40 lines render + a derived. **Risk.** None beyond screen density; keep it to one line + the three weakest slots, details behind the existing `CARDS`/`BOOK` doors.

**Law.** The printed lineup equals `lineupFor` by sha; the three weakest slots are the three smallest `effOvr` in that lineup; a record with fewer than 11 players prints "incomplete" rather than inventing one.

# 3 · The single number should say what it recommends

**What.** In the simple row, print the **slot the DRAFT button will fill** next to the position — `CB · CB2` — and mark it when that slot is one of the user's open slots (`· open`). When the user has open slots, default the needs filter to the two most valuable open slots (a presentation filter that already exists).

**Why.** Today the simple row shows the player's position (`CB`) but not which roster hole he would fill, so "one number" cannot answer "does this make my roster decent?". The confirm bar does show the slot, but only after a tap. This is the cheapest way to make the single number need-aware without inventing an engine value.

**How.** `BoardRowVM` already carries `slotId`, `slotLabel`, `natural`, `alsoFits`; `App` already carries `openNow`/`needsSel`. Render only.

**Cost.** ~15 lines. **Risk.** One more token in a row that is deliberately sparse; measure at 390px.

**Law.** The printed slot equals the slot the DRAFT button dispatches; the `open` mark agrees with `openSlots`; 390px stays clean.

# 4 · Risk as words, not a percent (in the simple form only)

**What.** Replace the gone% number in the simple row with a three-word band — `likely gone` (≥70%), `coin flip` (40–70%), `should last` (<40%) — with the number kept in the row detail (item from the review, F1) and the method tooltip unchanged. Thresholds are named constants, not magic.

**Why.** Round 11+ is the low-attention half; a percent invites arithmetic ("is 63 high?"), a band does not. The engine's number is unchanged and still visible one tap away, so the honesty rule holds.

**How.** Render-only map over `r.gone`; the thresholds live in one constant beside the VM.

**Cost.** ~10 lines. **Risk.** A band hides the exact number from a user who wants it — the detail keeps it; and the bands must be a monotone map of the engine number (law).

**Law.** The band is a monotone function of the engine's gone value at the named cut points; the detail shows the exact %; the tooltip's method text is unchanged.

# 5 · A refresh is normal — so a presentation choice is state, not a variable

**What.** Make the FULL BOARD choice (and any future presentation choice) live in `settings` (or the draft autosave), never in module state. Same for a future "card dismissed" flag. The review's F3 fix is the first instance.

**Why.** The whole Slice 3 work says a refresh must land the user back where they were (N25/N28/N29). A choice that a refresh discards is the same defect class the A1 round just closed, one layer up.

**How.** `Settings.fullBoard` (backward-compatible field), or `SaveRecord.meta.presentation` if it must be per-draft. Prefer settings: it is a user preference, and a new draft resets it.

**Cost.** ~15 lines. **Law.** L9 (the review's §5).

# 6 · Announce the flip once, properly

**What.** The first time the flip happens, show a dismissible two-line banner above the board: what changed, why, and the FULL BOARD door; after dismissal, keep the small persistent line. Do not rely on a 0.82rem note that a first-time user will read as decoration.

**Why.** A form change with no announcement feels like a bug ("where did my columns go?"). One honest sentence is the difference between "simplified" and "broken".

**How.** `localStorage`/settings flag `simpleIntroSeen`; render in `DraftBoard` when `lateMode && !seen`.

**Cost.** ~20 lines. **Risk.** A modal would be worse; keep it inline and dismissible.

**Law.** The banner appears exactly once per draft (or per user — pick one and say which); the note is present in both cases; zero page errors.

# 7 · Move the late-mode projection into the port (the one item for the Architect)

**What.** `src/lib/port/` gains `simpleRows(vm)` and `pickCard(vm, openSlots)` as pure functions; `DraftBoard` renders their output. Both framework arms of R-13 then share the mode logic, and the framework measurement stays about **rendering**.

**Why.** Block C is a render-layer measurement. If the Vue arm re-implements the late-mode projection, the comparison measures two different behaviours, not two frameworks. The port is the seam the Architect owns; the functions are pure and framework-free (`BoardVM` → view data).

**Cost.** ~40 lines in `port/`, ~20 lines of render rewiring. **Risk.** Low; a port change is the Architect's call and re-pins nothing (it is shell code, not the engine snapshot).

**Law.** The port functions are framework-blind (N16 already sweeps `port/`); the rendered rows equal the port output by sha; the two arms call the same functions.

# 8 · Count absence laws' mirror: every "no X" law gets a "yes Y" law

**What.** Make it a council battery rule: a law that asserts something is **absent** must be paired with a law that asserts the affordance that replaces it **works**. L2 is the example (it asserts "no flex chip" and passed while the row's expand toggle was dead). The review's L7 is the general shape.

**Why.** Absence laws can pass on a blank screen. They are necessary (the simple form must be sparse) and insufficient (the sparseness must be a deliberate collapse, not a missing feature).

**Cost.** One line in the battery style guide. **Law.** The pair itself.

# 9 · A delivery-audit tool (process, for the round)

**What.** `scripts/delivery-audit.mjs` in each delivery: (a) re-measure every quoted `sha256` in the package docs against the file it names (catches the review's F5 before shipping); (b) re-run every quoted count's command or refuse the quote (F6); (c) run the tree's **own** acceptance gates, including `gate-numerals`, at the final state (F4); (d) refuse a green if `ACCEPTANCE-RECEIPTS.txt` ends red (F7). Print one line per check and exit 1 naming it.

**Why.** Two of the four hygiene findings in cakepanz-8 are stale numbers/hashes **inside the delivery that corrected stale numbers/hashes**. The manual sweep works but does not converge; a checker does. It is the same discipline as the manifest gate, applied to prose and hashes.

**Cost.** ~120 lines, no new dependencies; can reuse `gate-manifest`'s walk and the tree's own commands. **Risk.** Quoted hashes that are deliberately historical need a marker convention (e.g. `(historical)` on the line) — the concealment the fix must not allow.

**Law.** A fixture with a deliberately wrong quoted hash fails, naming file + line; a clean fixture passes; a fixture whose receipt ends red fails. Show it failing before it passes.

# 10 · Local, offline instrumentation for the Owner (no telemetry)

**What.** Keep a small local counter in settings (or a `sim:nfl:stats` key): picks made in simple vs full form, how often the top recommendation was taken, and the final roster's weakest three slots. Show it on Complete/Stats. Nothing leaves the machine (offline is a hard requirement).

**Why.** The Owner's calibration work (skilled drafter 90% playoffs, ~25% title) needs to know whether users on the simple board actually draft a competitive roster. Today the answer is unknowable. Local counters give the Owner data without a network.

**Cost.** ~30 lines + one settings/record field. **Risk.** Storage schema discipline (field-by-field validation, corrupt = defaults, like settings today).

**Law.** The counters are monotone; a fresh install starts at zero; a corrupt blob falls back to zero without touching the draft save.

# Implications I would put in front of the Architect

- **The done state should be a state machine with one owner.** A1 fixed two doors into the finished draft; the pick transition was the third (review F2). One `done` owner (Complete) and a law per transition is cheaper than a door-by-door fix.
- **Simple mode's value is an outcome, not a rendering.** Until Complete prints the roster the engine would field (item 2), "decent roster" is a wish, not a measurement.
- **Block C's fairness depends on the port owning the mode logic** (item 7). If the Svelte arm ships a card and the Vue arm does not, the measurement is void — and the Owner's framework call is entitled to a clean measurement.
- **The flip threshold stays the Owner's.** The 10th *user* pick is implemented; the overall-320 alternative is flagged. Neither this note nor the review moves it.

# BLOCKED | OPEN | NEXT

**BLOCKED:** nothing. **OPEN:** the Owner picks what enters the next sitting; the Architect rules on item 7 and on any port change; Z.ai owns items 1–6 and 10 in his tree. **NEXT:** if P-337 v2 is taken, the order is small: item 1 + item 2 + the review's F1/F2/F3, with L7–L9 as the laws, and one zip.
