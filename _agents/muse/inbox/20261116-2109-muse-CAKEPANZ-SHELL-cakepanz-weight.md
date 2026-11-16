SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 12 — the weight of the shell | DATE: 20261116-2109
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 12 — The weight of the shell (DOM node counts)

## Method — read this before the table

- **The reference numbers (VERIFIED):** the fresh-start arms' per-screen counts come from the Rev 10 battery receipts, both arms identical: `football-sim-svelte/probes/battery-svelte.json` and `football-sim-vue/probes/battery-vue.json` both report `screens: { cards: 871, stats: 457, board: 470, feed: 125, week: 221, settings: 39 }`, measured as `document.querySelectorAll('*').length` at viewport 1180 on `file://` dist builds (`probe-battery.mjs:40`: `nodeCount: document.querySelectorAll('*').length`). The prompt's `871/457/470/125/221/39` matches those JSONs exactly. (Side note: `REV-5.1-addendum`/receipt text elsewhere says "867" for cards — that figure disagrees with **both** battery JSONs, which say 871. The 867 is the outlier; the JSONs are the receipts.)
- **The Cakepanz numbers (INFERRED, not browser-measured):** there is no Playwright/Chromium in this environment, the Cakepanz battery asserts no node counts, and the standing boundary forbids live-browser checks for this seat. I therefore counted elements **analytically from the Svelte templates** — every element a template emits in the stated state, using the same definition (`querySelectorAll('*')` = elements only, no text nodes; Svelte components emit no wrapper nodes). Each count below shows its composition so a seat with a browser can falsify it in one `page.evaluate`. **The browser-measured Cakepanz counts are UNKNOWN**; treat the table as a computed prediction with a stated method, not a measurement.
- **States counted (all dev build `?dev=1`, viewport 1180):** Team Select with a team chosen; board at draft start (60 rows closed, no pick open, no confirm bar, 32 open slots, lineup advice showing all 32 placements); feed on the battery's fixture game (20 drives, 25 `.zrl-badge` elements, regulation — figures taken from `slice1-battery.json` details: "20 lines · 25 badges"); share on the game brag (3 facts, 4 proof lines); saves with 3 empty slots; empty state as the public default.
- **What counts as "the page":** document shell (8: `html, head, meta, meta, title, body, div#app, script`) + App chrome (11 when ready: `main`, `header`, brand `span`+`strong`, track `span`, topbar `span`+Saves `button`, ModeSwitch `div`+3 `button`s) + the screen. The fresh-start counts are whole-page counts the same way (their receipts include the shell chrome), so the comparison is like-for-like in definition, though the screens differ in content (see §3).

## The table

| Cakepanz screen | Nodes (analytic) | Fresh-start analogue | Fresh-start nodes | Ratio | Verdict |
|---|---|---|---|---|---|
| Team Select (team chosen) | **82** | — (no analogue; fresh-start has no team-select screen) | — | — | — |
| Draft board (start) | **831** | board | 470 | **1.77×** | Heavier — see §2 |
| Draft board (start) | **831** | cards | 871 | **0.95×** | Lighter than the cards screen |
| Feed (week 1, 20 drives) | **269** | feed | 125 | **2.15×** | Heavier — see §2 |
| Share (game brag) | **69** | — (no analogue) | — | — | — |
| Saves (3 empty slots) | **39** | settings | 39 | **1.00×** | Coincidence — different screens, same count |
| Empty state (public default) | **25** | — | — | — | — |
| Week stepper | **0 — missing** | week | 221 | — | Screen does not exist |
| Stats table | **0 — missing** | stats | 457 | — | Screen does not exist |
| Settings form | **0 — missing** | settings | 39 | — | Screen does not exist |
| Player cards | **0 — missing as a screen** | cards | 871 | — | No card grid; board rows are the only player surface |

## 1. How the Cakepanz counts are composed (falsifiable arithmetic)

**Team Select — 82 page / 63 screen.** Document 8 + App chrome 11 + screen 63. Screen: `section` 1 + `h1` 1 + provenance `p`+`b` 2 + 2 conferences × (`h2` 1 + `div.cp-ts-divs` 1 + 4 divisions × (`div` 1 + `h3` 1 + 4 `button`s)) = 52 + detail `aside` (`aside`+`h3`+`meta p`+`rivals p`+`b`+`note p`+go `button`) 7. (Idle, no team chosen: 77 page.)

**Draft board — 831 page / 812 screen.** Screen: provenance `p`+`b` 2 + `section.cp-board` 1 + header (`div`+3 `span`s+`p.cp-onclock`) 5 + NeedsRow (`div`+label `span`+3 unit `span`s+32 `button`s) 37 + `div.cp-rows` 1 + 60 rows × 11 = 660 + footer (`div`+SortControls `div`+3 `button`s+count `span`+undo `button`) 7 + LineupAdvice (`section`+`h3`+`ul`+32 × (`li`+`span`+`b`)) 99. Per closed row (11): `div.cp-row` + `button.cp-main` + `span`s name/pos/team/ovr/wins/priority (6) + `span.cp-gone-wrap` + `span.cp-gone` + `span.cp-gonetip` (tooltip span is always in the DOM, `display: none` until hover). The 32-placement LineupAdvice count was confirmed node-side: `lineupFor([], '4-3').placements.length` === 32 (run in the scratch copy with `node --experimental-strip-types`).

**Feed — 269 page / 250 screen.** Screen: `section` 1 + header (`header`+week `span`+vs `span`+tools `span`+4 `button`s) 8 + final card (`div`+away `b`+`span`+`at` `span`+home `b`+`span`+final-note `span`+provenance `span`) 8 + log `div` 1 + 4 quarter-mark `div`s + 20 drives × 10 elements (`article`+`zrl-t`+`zrl-team`+`zrl-play`+summary `span`+badges `span`+`zrl-sc`+`b`+dot `span`+`b`) = 200 + 25 badge `span`s + footer (`footer`+2 `span`s) 3. Drives are 225/250 = 90% of the screen.

**Share — 69 page / 50 screen.** Screen: `section` 1 + header (`header`+`h2`+sub `span`+close `button`) 4 + note `p` 1 + brag `article` 24 (eyebrow 1 + headline `p`+3 `span`s + outcome 1 + facts `p`+3×(`span`+`i`) + proof `div`+4×(`p`+`i`) + foot 1) + SAVE PNG `button` 1 + seed `article` 16 (title+label+value+derived `p`+`i`+`ul`+3 `li`+prov `div`+2×(`p`+`i`)+foot 1) + SAVE PNG `button` 1 + static `p`+`b` 2.

**Saves — 39 page / 20 screen.** Screen: `section` 1 + header (`header`+`h2`+sub `span`+close `button`) 4 + grid `div` 1 + 3 slots × (`article`+`h3`+empty `p`+save `button`) 12 + foot `p`+`b` 2.

**Empty state — 25 page.** Document 8 + App chrome 10 (no Saves button; the empty `span.cp-topbtns` is still in the DOM) + empty `section` 7 (`section`+`h1`+`p`+`p`+`code`+`p`+`a`).

## 2. Reading the ratios — where the weight comes from

- **Board 831 vs fresh-start board 470 (1.77×).** The gap is not the rows: Cakepanz rows cost 11 nodes each (660 total, 81% of the screen); the fresh-start board's 60 rows cost 470 − chrome, i.e. roughly 7–8 nodes per row. Cakepanz pays +3–4 nodes per row for the gone-odds wrapper + tooltip span (2 nodes × 60 = 120) and the separate pos/team spans, plus chrome the fresh-start board does not carry: the NeedsRow (37), the LineupAdvice (99 — 12% of the screen, and it duplicates information the board already shows), and the provenance line. Against the fresh-start **cards** screen (871 for the same 60 players), Cakepanz's board is actually *lighter* (0.95×) — the honest comparison depends on which fresh-start screen is the analogue. The board is not 3× the DOM for the same information; it is ~1.8× the compact board and ~1.0× the card grid. The weight is real but not extreme, and it buys the tooltip span on every row and the needs/advice chrome.
- **Feed 269 vs fresh-start feed 125 (2.15×).** This one is structural: Cakepanz feed lines cost ~11.25 nodes each (225/20) vs ~6.25 in the fresh-start feed. The extras are the summary `span`, the badges wrapper `span`, the running-score `b`/dot/`b` trio (3 nodes), and the per-drive badge spans themselves (25 across 20 drives). Plus Cakepanz-only chrome: the FINAL card (8), the quarter marks (4), the tools row (4 buttons), the footer (3), and the App topbar (11). A feed that costs 2.15× for the same 20 drives is a finding even though every feed law passes (REPORTED 75/0/10/3) — the information is the same game; the DOM is twice the size. Whether that matters is a performance question, not a correctness one: at 20 drives it is negligible in absolute terms; it would matter if the feed grew to a full season of games.
- **Saves 39 = settings 39 is a coincidence**, not a comparison: different screens, different content, same count. Noted so nobody cites it as parity.
- **Missing screens are the biggest weight story in the other direction:** the fresh-start arms carry week (221) + stats (457) + settings (39) + cards (871) screens Cakepanz does not have at all. Cakepanz's total across its six screens is ~1,335 analytic nodes; the fresh-start arms' six screens total 2,183. The shell is light *in total* because it is incomplete, and heavy *per screen* on the two screens it shares with the arms.

## 3. Caveats that bound these numbers

- **INFERRED, not measured.** A browser count could differ: Svelte's `{#each}` blocks add no nodes, but the counts assume the exact states listed (closed rows, regulation game, 20 drives/25 badges from the battery's fixture run, 3 facts/4 proof lines on the game brag). An open row adds its `.cp-fits` div + label + N chip buttons (2 nodes per chip + 1 primary); a picked row adds the confirm bar (4 nodes); an OT game adds the regulation `span` in the final card and `OT` quarter marks; a filtered board (19 rows) drops to ~19×11. The method is falsifiable: `document.querySelectorAll('*').length` on each screen in a browser, compared against the compositions in §1.
- **The battery counts nothing.** `slice1.battery.mjs` has no node-count assertion (grep for `node|querySelectorAll('*')` → only `.cp-feed-line` and `.zrl-badge` counts). The delivery's own evidence never measures weight; this filing is the first count.
- **Row-count sensitivity:** the board count scales with the 60-row page size (a battery constant, not a UI choice). If the board paged differently, the per-screen total would move with it; the per-row cost (11) is the stable figure to compare.

## 4. What this unblocks / how to verify

- For Z.ai's next round: the feed's 2.15× is the cheapest weight to attack (the running-score trio and badge wrappers are the obvious candidates — but any change must keep the battery's per-line assertions green); the LineupAdvice's 99 nodes deserve a second look (it re-lists 32 slots the board already shows). Neither is urgent at 20 drives / 60 rows.
- For the next reviewer with a browser: run the built slice in Playwright, `page.evaluate(() => document.querySelectorAll('*').length)` per screen in the states of §1, and replace this filing's INFERRED numbers with measured ones. The probe to copy is the fresh-start arms' `probe-battery.mjs:40`.
- How to verify this filing: re-derive any screen from its template in §1 (files cited in Part 1), and confirm the 32-placement LineupAdvice count with `node --experimental-strip-types -e "import('./src/engine/sports/nfl/engine/lineup.ts').then(m => console.log(m.lineupFor([],'4-3').placements.length))"` in the s5 copy.
