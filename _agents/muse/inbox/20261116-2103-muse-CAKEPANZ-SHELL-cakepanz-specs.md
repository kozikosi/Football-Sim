SPEAKER: muse | ROLE: council | TASK: cakepanz shell assist part 16 — shell specs and acceptance criteria | DATE: 20261116-2103
FOR: P-316, P-317

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 16 — Shell specs and acceptance criteria

**Coverage:** §1–§3 are the slice specs for **P-316** (slice 3: hydration + board chrome), slice 4 (feed), and slice 5 (shareables). §4 is the Team Select revision spec for **P-317**. The FOR line above covers both; each section states its own ID.

**What this file unblocks:** Z.ai's remaining slices (season hub next) and the Architect's merge — a builder should be able to read one section and know exactly what "done" means for that screen, including the states that are easy to forget. **Exact artifact:** this filing. **How to verify/apply:** each screen's "Done means" list is written as battery laws wherever possible (law text in `code` form, assertable through the real UI or node-side); anything I could not verify by reading the s5 delivery (`_agents/inkling/deliveries/67-cakepanz-s5/` on `origin/council/inkling`) is labelled UNKNOWN or INFERRED. No live-browser check was run (standing boundary) — 390 px and offline behaviour below are *requirements*, not claims of passing.

**Global requirements (apply to every screen in this file):**
- **Offline / file://:** the shell boots from `file://` with the network blocked; no screen fetches anything; all state is `localStorage` (via the `StorageModule` seam) or in-memory. A screen that needs the network is not done.
- **390 px:** no horizontal scroll at 390 px width; no clipped text; every control reachable by tap; sticky chrome collapses rather than consuming the viewport.
- **Numbers:** the user sees only Wins, Priority, OVR; the valuation label travels with every number (the `.cp-prov` line pattern); no number is invented — every figure traces to the engine snapshot, the pick log, or the envelope.
- **Reduced motion:** `prefers-reduced-motion: reduce` turns every animation off (computed `animation-name: none`, opacity restored).
- **Empty / error copy:** plain informative language; no "expected scoring" / "before kickoff"; every turnover named where turnovers appear; "2-Pt Conv" except in the Guide; no periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL.

---

## §1 — Slice 3: hydration + board chrome (FOR: P-316)

### 1a. Saves panel (`src/lib/components/Saves.svelte`, `src/lib/savesApp.ts`)

**Purpose:** three slots (A · B · C) that hold draft, week, or season saves as envelopes; load, save, and refuse — never repair.

**States:**
- **Empty slot:** shows `empty`; "Save draft here" is the only action; loading an empty slot is impossible (button absent, not disabled-with-a-surprise).
- **OK — draft:** shows `DRAFT · rev N`, `your X picks · Y picks made` (see Part 5, B1 — the panel must split the user's picks from the league log), team name, saved time. Actions: Load draft, Brag card, Save draft here (overwrite — see edge below).
- **OK — week:** shows `WEEK · rev N`, user team, `next: week N`, next fixture (`AWAY @ HOME` or `season complete` / `no user game this week`), games played. Loading shows the hydrated card (below), it does not silently start a season.
- **OK — season:** shows `SEASON · rev N`, user team, champion line, games played. Loading shows the hydrated card; the season brag renders from the save's own numbers (see §3).
- **Refused — corrupt:** shows `REFUSED (corrupt)` plus the engine's verdict verbatim (e.g. `week: roster must be 32 frozen players`); nothing is repaired, nothing is defaulted, the slot is not overwritten. The refusal reason is the whole message — no paraphrase.
- **Refused — newer-version:** shows `REFUSED (newer-version)` plus `envelope: written by a newer build (schema N)`; the save is never overwritten by this build.
- **Storage unavailable:** the panel says so (`storage unavailable: …`) and offers no save/load actions that would pretend to work.
- **Overwrite (edge):** saving into a non-empty slot asks once ("Slot B already holds … — replace it?"). No silent overwrite. (Proposed in Part 5, A5 — spec'd here as acceptance, not yet built.)
- **No draft in progress:** "Save draft here" is disabled with the reason visible ("nothing to save — no draft is in progress").

**Hydrated card (week/season load):** shows user team, next week, next fixture, games played, and the trust split in plain words: what was kept as saved (ratings, roster, scores, plan) and what was re-derived (table, seeding, bracket, champion). It states plainly that the season screens ride a later slice — it does not pretend the season is playable from this card.

**390 px:** the slot grid is one column; each slot card's buttons wrap; the refusal message wraps (`overflow-wrap: anywhere` — already in the CSS, VERIFIED `Saves.svelte` `.cp-slot-msg`); the hydrated card does not push the panel off-screen.

**Offline:** all reads/writes are `localStorage` through the `StorageModule`; the panel works with the network blocked; a slot written, the page reloaded from `file://`, and the panel re-opened shows the same slot.

**Done means:**
- `law: three slots, empty first; a saved draft lands as an ENVELOPE and survives a reload; the board restores, the team is the chosen team`
- `law: a corrupt week save is REFUSED verbatim; a newer-version envelope is refused as newer`
- `law: a REAL week save (engine-built: fixture league → startSeason → playWeek ×2 → toWeekPayload → serialize) HYDRATES through the panel and names week, team, next fixture, games played`
- `law: overwriting a non-empty slot asks first; cancelling leaves the old save byte-identical`
- `law: zero page errors across the panel in empty, ok, refused, and storage-unavailable states`

### 1b. "My needs" row (`src/lib/components/NeedsRow.svelte`)

**Purpose:** show which of the user's 32 slots are still open; tap a slot to filter the board to rows that fill it — including flex fills.

**States:**
- **Start of draft:** `MY NEEDS · 32 OPEN`, all slots listed grouped OFF / DEF / ST.
- **Mid-draft:** only open slots listed; filled slots disappear; the count updates on every pick and undo.
- **Filter active:** selected slots are marked (`aria-pressed`); the board shows only rows whose primary slot OR any flex fill matches a selected slot; the row count drops (REPORTED: 60 → ~19 for WR1); every shown row, picker opened, provably fills the chosen slot (primary label or flex chip). `ALL` clears.
- **Filter with zero matches:** the board shows an empty state ("no players fill {slot}" — not a blank board, not an error).
- **Draft done:** the row shows `MY NEEDS · 0 OPEN` and no longer filters (there is nothing to fill).

**390 px:** the row collapses to a summary line (`MY NEEDS · N OPEN — Offense n · Defense n · ST n`) that expands on tap; the sticky behaviour applies to the collapsed line only, never to five lines of pills. (Requirement, not a claim — see Part 5, B4.)

**Offline:** pure view of the store's roster; no network, no storage.

**Done means:**
- `law: the row is sticky (computed position: sticky) and lists all 32 open slots at the start`
- `law: clicking a slot filters the board; every filtered row provably fills the slot (primary or flex); ALL clears`
- `law: at 390 px the collapsed summary is one line and the expanded list does not trap the scroll`
- `law: the row never hides a legal flex route to a needed slot`

### 1c. Gone-odds method tooltip (`src/lib/components/BoardRow.svelte`)

**Purpose:** the gone% cell explains itself — the engine's actual method, not a static explainer.

**States:**
- **Hover / keyboard focus:** the tooltip appears (`:hover` and `:focus-within` — VERIFIED `BoardRow.svelte:52`) and names the method with the engine's own numbers from the very `goneOdds` object the board renders (`picksBetween`, `sims` — REPORTED: between=22, sims=30 on the run).
- **Not the user's turn:** the board holds the last board; the tooltip shows the last computed numbers, never a fresh invention.
- **CPU pick in flight:** no tooltip update is attempted mid-dispatch.

**390 px:** the tooltip is reachable by tap (focus) as well as hover; its 240 px width fits inside a 390 px viewport without clipping or horizontal scroll; it does not cover the row's pick button.

**Offline:** pure view of an already-computed object; no fetch.

**Done means:**
- `law: the tooltip is visible on hover AND on keyboard focus, and names the method`
- `law: the tooltip's numbers equal a node-side recompute of goneOdds with the same inputs (same seed fork, same sims)`
- `law: at 390 px the tooltip fits the viewport and does not block the pick action`

---

## §2 — Slice 4: the drive-level feed (FOR: P-316)

**Screen:** `src/lib/screens/Feed.svelte` + `src/lib/feedVM.ts`. **Purpose:** one entry per drive of the user's week-1 game — clock, team chip in the team's ink, outcome badge, the engine mapper's summary sentence, scoring badges, running score — under a FINAL card with the gameSeed as provenance. The w88 look is the target: badge format and colors preserved line-for-line.

**States:**
- **Absent while drafting:** PLAY WEEK 1 does not appear until the draft is done (`status === 'done'` gate — VERIFIED `App.svelte` `playWeek()` + `BoardFooter.svelte` `{#if draftDone}`).
- **The game:** the FINAL card shows the score (away · home, each side in its own ink), FINAL / OT ×N / TIE, regulation score when OT changed it, and the provenance stamp (`gameSeed N · week 1 · AWAY @ HOME · played by the pinned engine`).
- **The log:** drives in game order by default; quarter marks ride the log (`Q1`…`Q4`, `OT` for period ≥ 5); OT drives carry the OT stamp (`OT1`, `OT2` — the feed's workaround for the snapshot's `clock()` OT gap, see Part 4, B4). Every line carries clock · team chip · badges · running score; the running scores END at the final (the drives add up).
- **NEWEST FIRST:** flips the reading order (newest drive first); quarter marks do not render in this mode (they belong to game order — VERIFIED `Feed.svelte` `{#if !mineOnly && !newestFirst …}`).
- **MY DRIVES:** filters to the user's drives only; with zero user drives (impossible in a real game — the user always has drives — but the filter exists) the log shows `no drives match the filter`, never a blank section.
- **Lead changes:** drives that flipped or first broke the lead carry a gold `LEAD Δ` mark, computed from the running score.
- **Empty filter:** `no drives match the filter` (plain text, in the log area).
- **Yards:** none are ever shown. The engine's `yards: null` is honoured — the feed renders plays and time only. A drive line with a yard figure anywhere is a failure of this spec.
- **Error:** if the feed cannot be built (no week-1 game on the engine schedule — e.g. a corrupt record), the error surfaces as the app's error line (`the week-1 feed needs a finished draft` / the engine message), and the user stays on the board. No partial feed, no invented game.

**390 px:** the drive line wraps (summary wraps, badges wrap); the clock stamp keeps its width (`min-width: 52px`, tabular-nums); the running score never wraps mid-score; the tool row (NEWEST FIRST / MY DRIVES / SHARE / ← BOARD) wraps to two lines; the log scrolls internally (`max-height: 56vh`) rather than pushing the page.

**Offline:** the game is computed from the draft record already in memory; no fetch. The feed must render identically with the network blocked.

**Done means:**
- `law: PLAY WEEK 1 is absent while drafting and appears when the draft is done (through 32 real PICK actions on the real store reducer)`
- `law: the UI game IS the engine game — node-side feedVM recompute matches the DOM exactly: final score, drive count, me-drives, lead changes`
- `law: no yard figure appears anywhere in the feed`
- `law: NEWEST FIRST flips the reading; MY DRIVES filters to the user's drives`
- `law: prefers-reduced-motion turns the beat-in animation off (computed animation-name: none)`
- `law: the running scores END at the final; OT drives carry the OT stamp; quarter marks ride the log`
- `law: zero page errors across the feed in empty and dev states`

---

## §3 — Slice 5: the brag shareable + the seed card (FOR: P-316)

**Screen:** `src/lib/screens/Share.svelte` + `src/lib/shareVM.ts` + `src/lib/bragCard.ts`. **Purpose:** static artifacts (N2: static brag shareables over replay URLs) — the result and the proof, generated from the engine's own saved season/game, downloadable as PNGs that carry everything in their bytes.

**States:**
- **Game brag (from the feed):** headline is the result in one line (`CHI 39 · IND 36`, user-first, each side in its own ink); outcome line (`VICTORY — FINAL` / `DEFEAT — FINAL` / `A TIE` + OT note); facts (drives, lead changes, my drives, regulation when OT); proof block in monospace (draft seed, engine-derived gameSeed, engine pin, dataset stamp). Opened from the feed's SHARE THE RESULT.
- **Season brag (from a season save):** headline is the record or `BUF WIN THE SUPER BOWL`; outcome line from the outcome token (`champion` → `CHAMPIONS — the Super Bowl is yours`, etc.); facts (record from the engine's table row, points for/against, games, playoff path); proof (season seed, saveId, engineVersion, dataVersion). Opened from the Saves panel's Brag card on a season slot.
- **Seed card only (draft/week save, no result stored):** the brag area shows the honest note ("no result stored in this save yet") and the seed card alone — the seed, the replay recipe, the provenance. Never a brag with an invented result.
- **SAVE PNG:** produces a real static PNG (PNG magic bytes, non-trivial size); the file downloads (`76-pancakes-<kind>-<headline>.png`); the card carries no link back into the app (no URL, no href anywhere in the card); what you see is what downloads (DOM card and canvas painter render from the same view-model).
- **Error:** a share opened without a played game / without a real save shows the app's error line (`the brag card needs a played game` / `the brag card needs a real save: …`) and does not render a card.

**390 px:** the cards stack; the headline wraps without clipping; the proof block (monospace) wraps or scrolls internally — never overflows the viewport; SAVE PNG buttons stay tappable and labelled while a save is in flight (`saving` state) and report success/failure in place.

**Offline:** the PNG is drawn on a local canvas from the view-model; the download is a blob URL. Both work with the network blocked. The PNG must not fetch fonts or images — the painter uses system serif/mono stacks (VERIFIED `bragCard.ts`: `Georgia, "Times New Roman", serif` and `ui-monospace, Menlo, Consolas, monospace`).

**Done means:**
- `law: the brag's scoreline IS the engine game (exact string equality against the node feedVM recompute: scoreline + outcome line)`
- `law: the proof carries the REAL draft seed + the engine-derived gameSeed + the pinned engine + the dataset stamp (sha256 recomputed node-side)`
- `law: SAVE PNG produces a real static image (PNG magic bytes, non-trivial size); the card carries no link back into the app`
- `law: a REAL season save renders the SEASON brag from the save's OWN numbers (record = the engine table row · champion · outcome token)`
- `law: the seed card is PROVEN, not decorative — the node-side replay from (seed, year, run) lands the same champion and the same record row`
- `law: a draft/week save shows the seed card alone with the honest no-result note`
- `law: zero page errors across the share screen`

---

## §4 — Team Select revision: team AND draft position (FOR: P-317)

**Screen:** `src/lib/screens/TeamSelect.svelte` (current state VERIFIED: 32 team buttons in 8 division groups — AFC/NFC × East/North/South/West — plus a detail aside with division rivals and a `DRAFT AS {team}` button; `onstart(teamIndex)` only). **Requirement (Owner):** the user picks team AND draft position (slot 1–32), same screen, same look. Slice 2 is not accepted until it does.

**Layout (same screen, same look):**
- The team grid is unchanged (same groups, same pill buttons, same `aria-pressed`).
- The detail aside gains a slot control *inside the same aside*, below the rivals line: a 1–32 selector in the existing pill style (a compact grid of numbered pills, or a stepper with − / + and a 1–32 readout — either, but the pills must read as the same family as `.cp-ts-team`). Default slot = the team's natural slot (`teamIndex + 1` — the team's position in round 1 under default snake).
- The aside names the trade, in plain words: "Pick 12th — you swap draft positions with the Tennessee Titans" (the default round-1 holder of the chosen slot is `TEAMS[slot - 1]`). It also shows the first three rounds' positions: "R1 12th · R2 21st · R3 12th" (round 2 is `33 − slot`).
- The go button reads `DRAFT AS {TEAM} · PICK {slot}` (e.g. `DRAFT AS WASHINGTON COMMANDERS · PICK 12`). One button, one action — team and slot are chosen together, never on separate screens.

**States:**
- **No team chosen:** the aside is idle ("Select one of the 32 teams…"); the slot control is not shown (there is no natural slot without a team), or is shown disabled with the reason. The go button is absent.
- **Team chosen, slot at natural:** the aside shows the team, its rivals, the slot control with the natural slot marked ("your natural slot"), the trade line reads "no swap — this is your natural slot," and the go button is enabled.
- **Team chosen, slot changed:** the trade line names the partner team; the round preview updates; the go button is enabled.
- **Slot out of range (edge, e.g. a hand-edited value):** the control clamps to 1–32 and says so; the store refuses 0 / 33 / non-integers verbatim if one ever reaches it (battery law, below).
- **Store without slot support (the current snapshot — the gate):** the picker is built but the go button keeps the old path, and the slot control carries the honest label "draft position picks land with the next engine update." The screen must never promise a slot the draft will not honour. (Full reasoning in my Part 4 file, B1.)
- **After starting:** the board header shows the slot ("Drafting 12th") — a `BoardHeaderVM` addition or an App-level line; the saves panel's draft summary shows it too; a loaded save restores the same slot.

**Keyboard / accessibility:** the slot pills are real buttons with `aria-pressed`; the whole flow is operable by keyboard (team → slot → go, in tab order); the trade line is in the same `aria-live="polite"` aside as the team detail, so a screen reader hears the slot change.

**390 px:** the division grid is one column (it already uses `repeat(auto-fit, minmax(210px, 1fr))` — VERIFIED `TeamSelect.svelte` — so it collapses on its own); the slot grid wraps to at most 8 pills per row; the aside stacks below the grid; nothing scrolls horizontally.

**Offline:** pure UI over `league.ts` (already in the snapshot) and the slot derivation; no fetch, no storage until the draft starts.

**Done means (P-317 acceptance):**
- `law: team AND slot are chosen on one screen, same look; the go button carries both`
- `law: slot 1 / 12 / 32 each put the user on the clock at the right overall pick in rounds 1, 2 and 3 (battery, through the real store reducer)`
- `law: the trade line names the correct partner team (TEAMS[slot-1]) and the round preview reads slot / 33-slot / slot`
- `law: a saved draft with a slot reloads at the same slot and the same order; a legacy save (no slot field) loads as slot = userTeam + 1`
- `law: START with slot 0 / 33 / 1.5 is refused with the store's error verbatim; undo never changes the slot`
- `law: the slot is visible after the draft starts (board header) and in the save summary`
- `law: at 390 px the screen has no horizontal scroll and the slot control is fully tappable`
- `law: until the store carries slot, the picker is visibly gated and the go button does not promise a slot`

---

## Open questions (for the Owner / Architect, not decided here)

1. **Slot control shape:** numbered pill grid vs stepper — I spec'd either, but the Owner's eye is the decider; the battery laws above are identical for both, so the choice does not block the store work.
2. **The trade semantics:** this spec assumes the *swap* rule (Part 4, B1; Asset A1 in Part 15) — the user trades positions with the team that held the slot. If the Architect prefers *rotate* (shift every team so the user lands at the slot), the spec's trade line and round preview change, but the battery laws' shape does not. The Architect should confirm swap vs rotate when he lands `orderForSlot`.
3. **Season hub ordering:** §1–§3 spec the built slices; the season hub, standings, bracket, awards, review, and Guide are the next specs to write, in that order — the Guide's prose needs the Owner's style-law pass before it is spec'd in full.
