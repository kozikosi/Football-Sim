# CAKEPANZ SHELL — POST-COLORS PLANNING PHASE (the brainstorm, fleshed out)

**SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | DATE: 2026-11-20T20:10Z**
**FOR: the Architect (shell/UI owner) · the Owner (product direction) · the next builder of 67 Cakepanz**
**STATUS: PARKED — return after Colors v1 ships.** These are proposals, not builds. The engine is
frozen (`408410477`, 69 files); nothing here edits the engine, the ratings, or Claude's files.

**Origin.** Owner, 2026-11-20: "i like your brainstorm ideas. make sure they are fleshed out a lot
more from a planning phase, recorded and stored and we'll return to them after colors ships."
This file is the planning phase. The one-page brainstorm was
`inbox/20261120-1959-ernie-P-287-cakepanz-shell-ux-brainstorm.md`; this expands it to buildable specs.

**How to read this.** Each idea has: *problem* (tied to the Owner's words / a product rule) · *design*
(UX + data flow, with the real seam API it reads) · *acceptance* (what "done" means + a proposed
battery law) · *effort* (S/M/L, rough) · *risks/guardrails* · *where it plugs in* (file/screen).
"Seam API" = an export of `src/lib/port/seam.ts` (the one door; verified present at the S13 pin).

**Guardrails that apply to ALL of them (the fence):**
- No engine edits. The engine is `408410477`, byte-frozen. Read-only via the seam.
- No ratings work. Real names/teams, non-EA ratings, Owner's alone.
- Offline / single-file. No CDN, no network, no paid API; `dist/single.html` boots from `file://`.
- AA contrast stays 2/0 (3 named team holes). No new token hole.
- Uniform board (L12): ONE anatomy, same board for all picks. No density additions — legibility per row.
- Advice only, never auto-lineup (Owner: the engine advises, never re-lineups the user's team).
- Values announced (L20); keyboard reachable (L21); reduced motion honored.
- Integers everywhere except Wins/Priority one decimal (`ONE_DECIMAL_KINDS = qbr/wins/priority`).
- Style: plain informative language; the user's team in blue (`.ub`); "2-Pt Conv" except the Guide.

---

# A · QUICK WINS (a sitting each; low risk; high felt value)

## A1 — "Why this player" one-liner on the ring

**Problem.** The top-3 ring (`.cp-suggest`) marks the board's active order, and the one-click
draft button (`.cp-quick`) names the player + slot. But the user has to *infer* why the machine
likes this player. The Owner's doctrine (P-337) is "enjoy the first ten rounds … simple decisions …
not complex math." The ring is the machine's recommendation; it should speak one plain sentence.

**Design.** Under each ringed row's name (or as a subtitle in the `.cp-quick` button), render ONE
reason string, computed from the SAME VM the board already reads — never a new engine call, never a
hardcoded value:
- "best value at {slot}" — when this player is the #1 `wins` (slotWins20) at his slot among available rows.
- "fills your thinnest need" — when the player's slot is the thinnest open slot on the needs row
  (NeedsRow.svelte's data).
- "highest Wins still on the board" — when the player has the max `wins` across all rows.
- fallback: "best available" (no special case).

The reason is a pure function of the BoardVM rows (already in `engine.boardVM`), the needs row, and
`engine.slotWins20`. No store dispatch. It rides the existing `.cp-suggest` block.

**Acceptance.**
- The reason string is deterministic per (board state, sort) — a golden-pinnable text law (see C1).
- The reason never contradicts the ring: the ringed rows each get a reason; non-ringed rows get none.
- Screen-reader: the reason is inside the accessible name or adjacent, so it is announced (extends L20).
- Proposed law **L23** (board battery): "each ringed row carries a non-empty reason; the reason is
  one of the four exact strings; it matches the row's `wins`/`alsoFits` data; 390 px clean."

**Effort.** S (a half-sitting). Pure VM transform + a Svelte snippet in BoardRow.svelte.
**Risks.** Text must stay plain and short (≤ 6 words) — the Guide carries the long form. Must not
shift layout at 390 px (the wrap band W11 stays green).
**Where.** `src/lib/components/BoardRow.svelte` (the `.cp-suggest` block); a `reasonFor(row, vm)` helper
in `src/lib/port/` (new, pure).

## A2 — late-round "one number" mode (P-337)

**Problem.** Owner (P-337): "enjoy the first ten rounds … simple decisions in the second half, not
complex math." Today the board shows Wins/Priority/OVR/gone% for every pick. Late rounds should
collapse to ONE number + the ring, with the full math one click away.

**Design.** A display-mode flag (`simpleLate`, default ON when `roundOf(state) > 10`, user-toggleable
in Settings). In simple mode, the board hides the Priority and gone% columns (keeps OVR + Wins) and
shows a single "best available by Wins" label on the top row. A "show the math" expander reveals the
full columns for that row / the whole board. Same board anatomy (L12) — columns hidden by default,
revealed on demand, NOT a second board form.

**Acceptance.**
- L12 stays green (one anatomy; the hidden columns are a CSS/conditional on the SAME row, no
  `.cp-simplerow`/data-form node).
- The toggle persists in the settings blob (S4 round-trips).
- Reduced motion / focus: the expander is keyboard-reachable (extends L21).
- Proposed law **L24** (visual or shell): "after round 10, simpleLate is default-on; the priority
  and gone columns are hidden until the expander; the expander reveals them; no layout break at 390."

**Effort.** M (a sitting). A settings flag + conditional columns + the expander. Touches BoardHeader/
SortControls/Settings.
**Risks.** Must not regress the uniform-board law or the "same board for all picks" ruling. The simple
mode must still show enough to make a decision (OVR + Wins + the ring is the floor).
**Where.** `BoardRow.svelte` / `SortControls.svelte` / `Settings.svelte` / `settings.ts` (the flag).

## A3 — keyboard-first pick flow (j/k + Enter)

**Problem.** L17 proves Tab→quick→method works, but a power user wants to draft without a mouse. The
Owner will want a "watch me draft in 20 seconds" demo for sharing; that is a keyboard flow.

**Design.** `j`/`k` move the ring focus down/up the available rows; `Enter` triggers the one-click
draft on the focused ringed row; `u` triggers undo; `?` opens a tiny shortcut hint. All reuse the
existing focus machinery (`.cp-quick`, `.cp-undo`) — no new actions, just keybindings + a focus ring
that is already styled (`:focus-visible`). Advertised in the Guide.

**Acceptance.**
- The keybindings never fire while a text input is focused (no interference with search/sort).
- `j/k` move a visible focus ring across the ringed rows; `Enter` lands exactly one pick (same L18
  guard); `u` undoes.
- Proposed law **L25** (board battery): "j/k move the focus; Enter drafts the focused ringed row;
  the 380 ms guard holds; u undoes; no page errors."

**Effort.** S (a sitting). Keydown handler + focus management + a Guide line.
**Risks.** Keybindings must not collide with browser shortcuts or the slot picker. Reduced-motion is
unaffected. Must not fire when a modal (Settings/Saves) is open.
**Where.** `DraftBoard.svelte` (a `svelte:window on:keydown` handler) + `Guide.svelte` (the hint).

## A4 — share-card "receipt" line

**Problem.** Slice 5 stamps `seed N (code b36:…) · engine …` on every brag card. It proves
provenance but does not *brag*. The Owner wants shareables that feel like a result, not a receipt.

**Design.** Add one human line to each stage card, computed from the run state (no new engine data):
"Drew {team} at {slot}, went {w-L}, {playoff result}." The draft card: "Drew Chicago at slot 6."
The week/season card: "Went 11-6, lost the divisional." The bracket card: "Lost the Super Bowl, 31-24."
The awards card: "MVP: {name}." All from the VM / run state the card already reads.

**Acceptance.**
- The line is derived (never hardcoded) and matches the run state exactly (the existing N14/N14b
  laws extend).
- The line is optional (a toggle? no — always on; it is the card's headline).
- Proposed law **N36** (node battery): "each stage card's receipt line matches the run state
  (record / result / champion) — no invented facts."

**Effort.** S (a sitting). One template line per card in `shareable.ts` / `cardVM.ts`.
**Risks.** The line must not invent a fact (the data-integrity rule); "went 11-6" must be the real
record, "lost the divisional" the real result. The playoff result wording must match the engine's
own round names.
**Where.** `src/lib/port/shareable.ts` / `cardVM.ts` / `shareDownload.ts`.

---

# B · BIGGER BETS (real value; a bit more work)

## B1 — the draft "film room": a 3-second replay of the CPU's on-clock run

**Problem.** Between the user's picks, the CPU makes ~20 picks the user never sees — the board just
jumps. The draft should feel alive between picks. The wall-slip cascade already exists at Complete;
reuse it.

**Design.** After each user pick lands, briefly cascade the board reordering as the CPU makes its
next picks until the user is back on the clock. The data is free: the store's `DraftState` after the
user's pick already contains the CPU's picks (the store advances them); `engine.cpuChoose` /
`engine.candidates` are available if we want to show "the CPU is choosing" before the reveal. The
reveal is a short CSS cascade (reuse `cp-reveal`), 3 s cap, instant under reduced motion.

**Acceptance.**
- The replay never blocks input; it is skippable (a click/Enter ends it).
- It shows only picks that already happened in the store (never a speculative/CPU-choose preview
  that did not happen — that would be "invented data").
- Reduced motion: instant (no cascade).
- Proposed law **L26** (visual): "after a user pick, the board cascades the CPU run to the user's
  next on-clock; ≤ 3 s; reduced motion instant; zero page errors; the picks shown equal the store."

**Effort.** M (a sitting). A post-pick effect that reads the store's new state and animates the row
diff. Reuses the Complete cascade.
**Risks.** Must not slow the draft down (the Owner wants to *play*, not watch). 3 s cap is a hard
ceiling; a "skip" is always available. The cascade must not run when the user is on the clock
immediately (no CPU run to show).
**Where.** `DraftBoard.svelte` / `App.svelte` (a post-pick effect) + CSS.

## B2 — lineup "what if" advice panel (advice only, never auto)

**Problem.** The engine has `adviseLineup` (returns optimal moves + `gainWins`) and `valueOf` /
`fit` / `effOvr`. The user never sees "your roster vs. the best you could field." This is the natural
bridge from draft to season, and it reuses existing engine output.

**Design.** A panel (on the Complete screen and/or the Hub) that shows "your lineup" next to "the
best lineup the engine would field" — the `adviseLineup` moves (from → to, slot, flex penalty) with
the `gainWins` as "this gains {+X} Wins." It is ADVICE: a "show me" / "apply" is a manual user
action (and even "apply" is out of scope for v1 — the panel explains, the user edits their own
lineup). Never auto-lineups (Owner's rule).

**Acceptance.**
- The panel reads `engine.adviseLineup` / `optimalLineup` / `effOvr`; it invents nothing.
- It never changes the user's lineup on its own (the store is untouched by rendering).
- The weakest three slots are marked (the C2 roster print already does this — extend it).
- Proposed law **L27** (node/board): "the advice panel's moves equal `adviseLineup`'s moves; the
  gain equals `gainWins`; the user's lineup is unchanged after rendering."

**Effort.** M–L (a sitting or two). A new panel component + the advice VM.
**Risks.** Must not become an auto-lineup; the wording must say "the engine suggests," not "you
should." Must stay AA-contrast and 390 px clean.
**Where.** `Complete.svelte` / `Hub.svelte` + a new `src/lib/port/lineupAdviceVM.ts` (pure).

## B3 — season "one number" playoff view

**Problem.** The season shell (s6–s12) shows a lot (week, standings, bracket, awards). The run to
the Super Bowl should be legible at a glance.

**Design.** A bracket view that reduces each game to three things: win% (from `matchupModel` /
`teamIdentity`), one key matchup (the highest-leverage slot duel), and the game ball (the engine's
`gradeOf` / star). All from existing engine output (`seasonFacade.runState`, `simulateGame`'s
result, `buildRecap`'s star).

**Acceptance.**
- Every number is derived (win% from `matchupModel`, the star from `buildRecap`), never invented.
- The view is a *reduction* of the existing bracket, not a new screen with new data.
- Proposed law **N37** (node): "the playoff one-number view's win% equals `matchupModel`'s; the
  game ball equals the recap's star; no invented fields."

**Effort.** M (a sitting). A bracket sub-view + the recap/star join.
**Risks.** The "one key matchup" must be a real engine concept (the highest win% swing), not a
narrative invention. AA + 390 px.
**Where.** `Bracket.svelte` / `WeekView.svelte` + a `src/lib/port/playoffVM.ts` (pure).

---

# C · STRUCTURAL (for the Architect's radar; the shell consumes, the Architect decides)

## C1 — extend the seam golden to DISPLAY strings (P-319 → gated)

**Problem.** Today the golden (N34) pins the VM *shape* (boardVM/goneOdds/lineupFor → JSON). The
*display* format (`ONE_DECIMAL_KINDS = qbr/wins/priority`, `showInt`/`showDecimal`) is owned by the
engine's `display.ts` and is NOT in the golden. A re-pin that changes a rounding rule would not fail
the golden — it would fail at the Owner's first draft. P-319 (Owner: engine values everywhere,
integers except Wins/Priority one decimal) is "architectural" but not *gated*.

**Design.** Add a `fmt(engineValue)` to the seam (or pin the existing `showInt`/`showDecimal`
outputs) and extend the golden to include the display strings for the same seed. Then a re-pin that
changes a rounding rule fails N34 at build, not at play. This extends P-319 from "architectural" to
"gated" without touching the engine (the formatter is already in `display.ts`; we just pin its
output).

**Acceptance.**
- The golden gains a `display` block: the formatted strings for the pinned seed's VMs.
- N34 (extended) fails on any display change; the merge must match through `colors/` paths.
- Proposed law: **N34b** (node) — "the display strings equal the committed golden."

**Effort.** S–M (a sitting). A golden-generator extension + one new law.
**Risks.** The golden must be regenerated ONLY on a deliberate re-pin (the `--write` discipline).
It touches the Architect's `display.ts` only by reading it — no edit. Coordinate with the Architect
(this is his radar).
**Where.** `scripts/golden-seam.mjs` + `batteries/seam-golden.json` + `node.battery.mjs`.

## C2 — offline-first save portability (the tent-in-the-woods test)

**Problem.** Offline is a hard requirement ("tent-in-the-woods test; local-first, sync-on-reconnect").
The autosave is localStorage. A v1.1 "export my save to a file / import it" (the seed already
round-trips) makes play-on-device-A-continue-on-device-B real, fully offline.

**Design.** An "Export save" (download a JSON envelope) and "Import save" (file picker → restore)
on the Saves screen. The envelope is the engine's own `serialize`/`restore` format (the same one the
autosave uses), so import is a `restore` + `loadDraft` — no new format, no new engine code. The
seed code is already the shareable key; the file is the full state.

**Acceptance.**
- Export produces a file the engine's `restore` accepts; import round-trips the exact state.
- Offline: no network (it is a file download/upload).
- Proposed law **N38** (node): "export → import round-trips the record (seed, picks, team, slot) —
  the same `serialize`/`restore` the autosave uses."

**Effort.** S–M (a sitting). A download button + a file input + the existing serialize/restore.
**Risks.** The file is the user's data — no silent "repair" (the corrupt-never-repair rule: a bad
import is refused with a message, not silently fixed). AA + 390 px on the Saves screen.
**Where.** `Saves.svelte` + `src/lib/port/savesApp.ts` (the existing save service).

---

# D · ONE THING NOT TO DO

Do NOT add columns to the board. The uniform-board law (L12) and the Owner's "same board for all
picks" ruling are load-bearing. The value is in *legibility per row* (A1, A2), not density. A
"more data" board is a worse board.

---

# SEQUENCING (when we return, after Colors ships)

1. **C1 first** (it gates everything: the display golden protects every later UI change at re-pin).
2. **A1, A4** (pure VM + text; the highest felt value for the least risk).
3. **A3** (keyboard flow; makes the board demo-able).
4. **A2** (late-round simplicity; the Owner's P-337 — pairs with the ring restyle the Owner asked
   for, §1 of the S14 prompt).
5. **B1, B2, B3** (the bigger felt-value bets).
6. **C2** (offline portability; v1.1).

Each item ships with a law (the battery grows: L23–L27, N34b, N36–N38), a 390/768/1280 matrix
pass, and the contrast battery staying 2/0. Nothing ships without a receipt.

---

# WHAT I DID NOT DO (stated plainly)

These are proposals. I did not build any of them; I did not edit the product, the engine, or the
Architect's files. I grounded each one against the actual seam API (read from the S13 tree at pin
`408410477`) so the data sources are real, not aspirational. The battery laws (L23–L27, N34b,
N36–N38) are PROPOSED ids, not yet written. The Architect decides what enters the shell; the Owner
decides the product calls (e.g. the late-round simple-mode default, the ring glow direction).

— ERNIE (Kilo seat; signs as ERNIE). Planning phase, 2026-11-20. Parked until Colors ships.