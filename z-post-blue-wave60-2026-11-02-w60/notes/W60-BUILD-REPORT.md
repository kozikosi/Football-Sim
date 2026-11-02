# W60 BUILD REPORT — Z.ai seat · 2026-11-02 (HST)

## Product
- `Football-Sim-Z-post-blue-w60.html` · md5 `bc841fb9fefb619438075e43bb45f975` · 1,690,787 chars (1,692,640 bytes)
- Delta vs baseline: **+11,774 chars**
- Baseline: **w59** md5 `889e531b9418fa7a2604d3e8ab4d23b4` (1,680,808 B) — pulled from gh-pages (the Owner's push) and asserted by the generator on every run.
- **Re-verified at close: a fresh generator run reproduces the shipped md5 exactly** — the bytes are the script output, no hand edits.

## Generator
- `tools/zpb_w60.py` — **30 asserted exact replacements** (R1–R7 in the intake ledger's order: the ellipsis paints off 15 carriers, the wrap laws, the playoffs buttons, the exit law, the footer pair, the intro rows) **+ 2 payload insertions** (`zpb-w60-css`, `zpb-w60-js` before the storage block) **+ 21 post-checks**.
- Payloads: `payload_w60_css.txt` (the fluid unit table, the name-ladder CSS, the face-off rows, the playoffs buttons, the season footer pair, the advance rail) · `payload_w60_js.txt` (the `zpbNameFit` engine + the `zpbAdvRail`).

## What shipped (the Owner's items)
1. **The unit comparison is fluid** — root cause MEASURED: the w59 `data-nostack` guard stopped the JS stacker, but the generic ≤760 law `table{display:block}` still shrink-wrapped the cells into a ~174px strip inside a full-width table (probe: cells 28·95·28 @700–760px vs 124·488·124 @800px). The table now re-asserts `display:table` + `table-layout:fixed` with proportional columns **25 · 50 · 25** — it expands and contracts continuously with the window and always matches the panel above. Both instances share the class.
2. **The name ladder** — the `zpbNameFit` engine walks every name carrier through the Owner's exact ladder, measured per element: full name one line → full name vertical (whole words) → **LAST NAME** → **INITIALS**. `data-nmfull` caches the full name (stateless — growing the window restores the fuller form). **JR. is never a last name** (Jr./Sr./II/III/IV/V stripped before the last-name step). The pure ladder is exposed as `zpbNameFit.ladder(full, fits)` and unit-tested.
3. **No '…' anywhere** — 15 `text-overflow:ellipsis` paints removed from the name carriers (the depth chart, the bracket, the pick grades, the FILLS link, the preview pairs, the browser cards, the standings strip, the selbtns, the draft cards…) + the two literal '…' in the loading strings + the two footer buttons. The sweep asserts zero '…' in `body.innerText` on every page at every width.
4. **Words never split** — `overflow-wrap:anywhere` → `normal` on every engine-covered carrier (lu-cell, dc-name ×2, gname, awname, pg-name + the w57 pass); the name-bearing mixed strings (the ranking cards' name lists, the award lines) → `break-word`; the narrative rules keep their laws. The RHAMONDRE/E class of bug is dead at the root.
5. **The pregame key players are face-off rows** — the absolute % lanes and the w59 phone fan retire. The intro is a flow: static block (title · crests · @) on top, then one `.zpb-intro-brow` row per beat (away left · home right), fading on the same beats. Nothing covers the static screen at any width (battery: `pos:static`, rows below the static block, gap 9px).
6. **BEGIN PLAYOFFS shimmers, SIM PLAYOFFS is a ghost** — the w51 gold-pill `background:` shorthand had reset `background-size`, killing the sweep on every ID-listed button. BEGIN PLAYOFFS now wears `background-size:220% !important` + `zpbbtnshine 3.4s infinite` (off under reduced-motion); SIM PLAYOFFS leaves the pill list and wears the transparent ghost (battery: `anim:zpbbtnshine`, `220% 100%`, `rgba(0,0,0,0)`, `box-shadow:none`).
7. **The during-the-game panel's only exits are Skip → Continue** — the backdrop-click close and the Escape close are REMOVED from the live builder (battery: dim click keeps the cinematic up, Escape keeps it up, Skip flushes → Continue appears → closes → page live).
8. **RUN IT BACK · SAME ROSTER / NEW DRAFT** — the footer pair reads the new labels (the site's dot span); SAME ROSTER takes its own line ≤520 and the pair stacks vertically there; side by side at 1280 (battery-verified both).
9. **The advance rail** — a slim fixed bar at the very top mirroring the current season screen's glowing CTA (Play the X · Continue to Week N · NEXT ROUND · BEGIN PLAYOFFS · Season Review · Begin Season). It clones the real button (same label, same glow), the clone clicks the original (battery: the week ADVANCED through the clone), it re-mirrors on every render, and it never shows on the homepage or the footer pages (sweep-verified across all pages × widths). Inside `.wrap`, so the w59 cinematic lock locks it with the page.

## The one the battery caught (honesty)
The first build's R7 kept the original `.join('')` on the renamed map — `starCards` was a STRING, `starCards.reduce` threw inside the builder's silent swallow-try, and the whole pregame intro died (the cine battery: `stars:0`, then TDZ errors from Skip). Root-caused with a rethrow probe (`starCards.reduce is not a function` at the exact line), fixed in the generator (the map returns the array; the reduce does the join), and the full battery re-run green. **The measure-don't-guess law caught a bug the post-checks could not see.**

## Batteries — 104/104 (re-run at close against the shipped bytes)
- `w60_nodecheck` **16/16** · `w60_ladder` **10/10** (the pure ladder incl. the JR law, hyphens, team names, initials)
- `w60_mobile` **27/27** (390+320: the w59 card laws hold, the unit table fluid at 7 widths with cells at both edges, the lock, the shimmer clip, the ladder live on 2,687 carriers with zero overflow, the footer pair, the draft card)
- `w60_cine` **26/26** (the full season flow: the rail up/mirroring/acting, the lock, the accident click, the NEW exit law, the face-off rows, the playoffs buttons, the footer pair, the dark shimmer)
- `w60_desktop` **12/12** (1280: the real tables, the fluid unit table, the board, the side-by-side pair, the rail silent outside the season, zero '…')
- `w60_sweep` **13/13** (6 views × 1920/1280/1024/768/600/390/320 + the storage showcase at 390: zero pan, zero '…', the rail silent on the footer pages, zero errors)

## Evidence (`shots/`, taken against the final bytes)
`w60-intro-stars-390` (the face-off rows under the static block) · `w60-intro-rows-390` (the static pregame alone) · `w60-rail-390` (the rail mirroring Play the Cardinals over the preview) · `w60-unitcmp-table-390` (the full-width spread with edge numbers) · `w60-unitcmp-390/1280` · `w60-posrank-390/1280` · `w60-madden-390/1280` · `w60-browser-390/320` · `w60-draftcard-390` · `w60-draft-1280` · `w60-review-390` (the review with the ghost SIM PLAYOFFS).
