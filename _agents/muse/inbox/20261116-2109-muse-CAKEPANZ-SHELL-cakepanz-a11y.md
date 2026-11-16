SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 13 — accessibility, keyboard, palette, fixtures, benchmarks, docs | DATE: 20261116-2109
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 13 — Accessibility, keyboard, palette, fixtures, benchmarks, docs

Scope note: this part takes what can be done without a browser. Everything that needs a real browser (rendered focus order, computed contrast of `color-mix`, 390px scrollWidth, file:// boot, console errors) is marked UNKNOWN, with the static evidence that bounds it. No fixes are proposed (per the task: the 14-AA-cell fix wait is the Owner's).

## 1. Keyboard and focus

### Tab order on the picker (VERIFIED by reading templates; rendered order UNKNOWN)
- Team Select: 32 native `<button class="cp-ts-team">` elements in DOM order — AFC divisions (East, North, South, West) then NFC, 4 teams each — followed by the detail panel's `DRAFT AS …` button. No `tabindex` attribute exists anywhere in the shell (grep `tabindex` in `src/` → zero hits), so tab order is pure DOM order and is logical. The chosen team carries `aria-pressed`.
- Slot picker (per-pick): `SlotPicker.svelte` renders native buttons in slot order — but it is never rendered (see Part 1, finding F3), so there is no picker tab order to test. The live per-pick choice is the flex chips inside an open `BoardRow` (native buttons, DOM order).
- Board rows: each row is a `<button class="cp-main">` with `aria-expanded` — 60 tab stops before any chip is reachable, and a chip is reachable only after its row is opened (two-step: tab to row, Enter to open, tab to chips). That is usable but heavy; there is no roving-tabindex or skip-to-picks affordance.
- No skip link exists. No focus-visible styling exists anywhere in the shell CSS (grep `focus-visible|:focus` → only the `:focus-within` tooltip rule, below). Keyboard users get the browser default focus ring.

### Gone% tooltip focus behaviour (VERIFIED — broken for keyboard)
- `BoardRow.svelte:53` CSS: `.cp-gone-wrap:hover .cp-gonetip, .cp-gone-wrap:focus-within .cp-gonetip { display: block; }`. The `:focus-within` branch is dead: `.cp-gone-wrap` contains only two `<span>`s (the gone number and the tooltip itself), neither focusable, and there is no `tabindex` in the file. A keyboard user tabbing through the board can never trigger `:focus-within` on that wrapper, so the method text ("how often the CPU took him… replayed 30 times") is hover-only. The tooltip also has `role="tooltip"` but no `aria-describedby` link from the gone number, so a screen reader never announces the association either. This is the shell's clearest a11y defect. (Filed as F2 in Part 1; repeated here because this is the part that owns it.)

### Needs-row filter (VERIFIED by reading)
- `NeedsRow.svelte`: 32 native `<button>`s with `aria-pressed={isSel(id)}` and a `title` ("filter the board to {slotLabel}"), plus an ALL clear button that appears only when a filter is active. The filter predicate (`DraftBoard.svelte`: primary slot OR any flex fill) is correct and includes flex routes. Keyboard access is fine (native buttons); the only gap is discoverability — the row's purpose is conveyed by the visible label "MY NEEDS · N OPEN" but there is no `aria-label` on the container and no live-region announcement when the board filters from 60 → 19 rows (a screen-reader user gets no feedback that the list changed, other than the new tab stops).

## 2. Reduced-motion audits (VERIFIED by grep)

- Exactly two `prefers-reduced-motion` rules exist in the whole shell: `Feed.svelte:110` (`.cp-feed-line { animation: none; opacity: 1; transform: none; }`) and `BoardRow.svelte:53` (`.cp-gonetip { transition: none; }` — a transition that is never defined elsewhere in that file, so the rule guards nothing).
- The feed beat-in (`Feed.svelte:106-107`: `animation: cpbeat 0.55s …; animation-delay: calc(var(--beat, 0) * 0.03s)`) is the **only** animation in the shell, and it has the off-switch. Battery (REPORTED) asserts computed `animation-name: none` under reduced motion. No other animation exists to audit, so the audit is complete by exhaustion — with one caveat: the staggered `animation-delay` (up to 19 × 0.03s ≈ 0.6s on the last drive) means the feed takes ~1.1s to fully land under motion; under reduced motion all lines land at once, which is the correct behaviour and is what the battery asserts.
- No `prefers-reduced-motion` handling exists for anything else because there is nothing else animated. No reduced-motion variant is needed for the share PNGs (static by construction).

## 3. Colour-contrast audits

### 3a. CONTRAST-TABLE.md — the w89 tokens (VERIFIED by recomputation)
- Source: `zai-fresh-start-rev10-2026-11-16/CONTRAST-TABLE.md` on `origin/council/inkling` (Variant L, `tokens-w89.css`). 36 cells (6 text classes × 3 backgrounds × 2 modes), WCAG 2.x relative luminance, "computed (contrast-table.py) — no eyeballing".
- **I recomputed all 36 ratios independently in Python from the hex pairs in the table: 36/36 match the table to within 0.02, and the fail count is 14 exactly as stated.** The 14 failing cells, with the table's own thresholds (4.5 normal, 3.0 large for the Cinzel display class):
  - Light: gold2 `#e6c67d` on bg/panel/panel2 = 1.51 / 1.65 / 1.41 (large-text bar 3.0 — fails by ~half); goldm `#ad7f2e` = 3.28 / 3.59 / 3.07; gold3 `#9a6b1f` on bg = 4.27 and on panel2 = 3.99 (passes on panel at 4.67).
  - Dark: text `#8e5566` on bg/panel/panel2 = 3.17 / 2.87 / 2.61; gold3 `#8a5f18` = 3.25 / 2.94 / 2.67.
  - Everything else passes, including dark gold2 `#e8c87e` at 11.30 / 10.25 / 9.31 and dark sub/zcream at 6.34–14.94.
- **Internal inconsistency in the table's own reading note (VERIFIED):** the note says "dark gold2 (the bright gold the display class actually uses in dark) PASSES at 4.60–7.83" — but the table's dark-gold2 cells read 11.30 / 10.25 / 9.31. The 4.60–7.83 range matches nothing in the table. The verdict (pass) is right; the quoted range is wrong. Flagging so the record is clean; the numbers in the table itself recompute correctly.
- **Scope warning (INFERRED):** the table is a *token-level* audit of w89's tokens, not of the Cakepanz shell. Cakepanz does not use these tokens (see §3b). The 14 fails are findings about w89's live behaviour (notably dark `--text` `#8e5566` carried into dark mode at 2.61–3.17, and light gold display type at 1.41–1.65), awaiting the Owner's fix decision. No fix is proposed here, per instructions.

### 3b. Cakepanz's own palette — computed from its CSS (VERIFIED by computation)
Cakepanz is dark-only (`color-scheme: dark`, page `#181114`, panel `#221820`). Its actual text/background pairs, computed with the same WCAG formula:

| Pair | Ratio | AA (4.5) |
|---|---|---|
| Text `#f5e9dd` on page `#181114` | 15.57 | pass |
| Text `#f5e9dd` on panel `#221820` | 14.42 | pass |
| Sub `#c8a48f` on page `#181114` | 8.11 | pass |
| Sub `#c8a48f` on panel `#221820` | 7.51 | pass |
| Gold `#e8c87e` on page | 11.51 | pass |
| Gold `#d9a94c` on page / panel | 8.62 / 7.98 | pass |
| Good `#72c18e` on page | 8.62 | pass |
| Bad `#e08573` on page | 6.88 | pass |
| Error `#ff8d7e` on page | 8.29 | pass |
| Dark text `#2c1e0c` on gold `#c9a24b` (gradient start) | 6.74 | pass |
| Dark text `#2c1e0c` on gold `#b3766a` (gradient end) | **4.40** | **FAIL (marginal)** |
| Dark text `#2c1e0c` on gold `#d9a94c` | 7.50 | pass |

- The shell's own static palette is in good shape: every solid pair passes AA, most by 2×. The single fail is the dark text on the rose end of the gold→rose gradient used by `.cp-go`, `.cp-need-on`, and `.cp-play` (4.40 vs the 4.5 bar — a 0.1 miss at one end of a gradient whose other end passes at 6.74). Noted as a measured finding, not a fix proposal.
- **UNKNOWN — team inks:** `ink.ts` picks the first of a team's three hexes with contrast ≥ 3.0 on the panel (`#181114`), falling back to a `color-mix(in srgb, <hex> 55%, #f5e9dd)` "pale" form. The 3.0 threshold is the *large-text* bar, not the 4.5 normal-text bar — so a team abbreviation rendered at 0.72rem/800 could sit as low as ~3.0:1, below AA for its size. And the `color-mix` pale values cannot be resolved statically (they are computed by the browser). Team-ink contrast is therefore UNKNOWN as measured; the mechanism (pick-best-of-three, lighten the too-dark ones) is sound in design and the threshold choice is the open question.

## 4. Screen-reader basics (VERIFIED by reading templates)

Present and correct: `aria-label` on the feed, share, saves, board, and lineup-advice sections; `role="group"` + `aria-label` on sort controls, slot picker, and mode switch; `aria-pressed` on every toggle (team buttons, mode buttons, feed tools, needs buttons); `aria-expanded` on board-row buttons; `aria-live="polite"` on the team-detail aside; `role="alert"` on the saves notice; `role="status"` on the share saved-note; `aria-label` on close buttons ("Close saves", "Close share").
Gaps: no `aria-describedby` anywhere (tooltip association, needs-row purpose); no live region for board filtering, pick confirmation, or draft completion; feed drive lines are bare `<article>`s with no accessible name (a screen reader hears the text run-on: clock, team, summary, badges, score — intelligible but unlabelled); the Saves panel's slot articles have no accessible state summary beyond their visible text; the empty state has no `role` or heading structure issue (one `h1`, fine) but the `?dev=1` link text ("Open the dev build →") is the only path out of the empty state and it is dev-only. Heading order per screen is sane (one `h1` on Team Select / empty state; `h2` section heads elsewhere). No `alt` text question arises — the shell has no `<img>` elements at all.

## 5. Visual before/after diffs vs w88 (partially VERIFIED, visual verdict UNKNOWN)

- **What exists:** the delivery ships 10 screenshots, all 1180px wide (`slice1-board.png`, `slice3-board-needs.png`, `slice3-gonetip.png`, `slice3-saves.png`, `slice4-feed.png`, `slice5-share-game.png`, `slice5-share.png`, `probe-feed.png`, `probe-share.png`, `probe-share-artifact.png` 1200×675). I verified their dimensions and non-trivial sizes with `file` (78–130 KB each). No w88 reference screenshot ships in the delivery to diff against.
- **What I verified textually instead:** the w88 badge CSS matches Cakepanz's line-for-line (`.zrl-badge{border:1px solid currentColor;border-radius:6px;padding:0 5px;font-size:.62rem;font-weight:800;letter-spacing:.08em;}` in both `Football-Sim-Z-post-blue-w88.html` and `Feed.svelte`); the `zrl-*` class names are genuinely w88's (12 `zrl-t`, 11 `zrl-team`, 9 `zrl-sc` in w88.html). The anatomy claim holds at the CSS level.
- **What I did not verify:** the actual look — colours, spacing, the me-glow, the quarter marks — against a rendered w88, because that needs a browser and a side-by-side render. UNKNOWN. Also note the font divergence (see §6): w88's badge/font stack is `'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif`; Cakepanz renders everything in Georgia. A visual diff would show that immediately.
- **Node counts (recount, per the task):** I recount the analytic counts from Part 12 here rather than trusting any battery number (the Cakepanz battery asserts no node counts): board page 831, feed page 269, team page 82, share page 69, saves page 39, empty state 25. Method and compositions are in the Part 12 filing; browser-measured counts remain UNKNOWN.

## 6. Fixture-league scenarios (VERIFIED by reading both fixture files)

The delivery has exactly two fixture builders, both in `batteries/`:

| Fixture | What it builds | Determinism |
|---|---|---|
| `weekfixture.mjs` (`leagueTeams` + `buildWeekEnvelope`) | Fixture league via the engine tests' own path: `newDraft(pool, makeRng(777).fork('draft'))` → `runDraft` → `lineupFor`/`teamRatings` per team; then `startSeason(…, {seed: 4242, year: 2027})` → `playWeek` ×2 → `toWeekPayload` → `serialize('week', 'C', …)`. User team is always `TEAMS[0]` (Buffalo Bills). Next week 3, 32 games played. | Fixed seeds 777 / 4242. |
| `seasonfixture.mjs` (`buildSeasonFixture` + `replaySeason`) | Same league; scans seeds 4242–4301 for a championship season for Buffalo, first hit wins (landed seed **4275**, Bills **10-7-0**, `BUF WIN THE SUPER BOWL**); fallback is the first playoff run in the window. `outcomeOf` derives the outcome token from the engine's own results. | Deterministic scan window; the landed seed is whatever the scan finds first. |

- **Scenarios that do not exist:** no blowout fixture, no Super Bowl rematch fixture, no no-picks-win fixture, no corrupt-roster refusal fixture, no save-with-null-commitment fixture, no multi-seed matrix. The battery's corrupt-save case is a hand-corrupted *week* envelope (refused verbatim — REPORTED), not a corrupt-roster case. The "27/9" fixture named in the task does not appear in the s5 delivery's batteries (grep for `27` finds only `madden27` and a string slice); I could not locate it to compare against — if it lives in another track, the s5 fixtures above are the complete local set.
- **Coverage gap worth naming:** every fixture is Buffalo Bills as `TEAMS[0]`, seeds 777/4242/4275, year 2027. The battery proves the happy paths (hydrate, brag, replay) on one team and a narrow seed band. A fixture with a different user team, a losing season (the season brag's non-champion branches: `super-bowl-loss` / `conference` / `divisional` / `wild-card` / `missed-playoffs` — all unexercised by the battery), or a tie/OT game would exercise `shareVM.ts`'s outcome table and the feed's OT branch, which the current fixtures never reach. (The feed's OT branch *is* exercised somewhere — the battery detail mentions "OT drives carry the OT stamp" — but the fixture game in the reported run is CHI 39 · IND 36 in regulation; the OT path's coverage is via the battery's own game, not a dedicated fixture.)

## 7. Benchmarks — bundle, file:// boot, offline, 390px

### Single-file bundle size vs budgets (VERIFIED by building)
- My build of the s5 copy: `dist/` total **335,665 bytes** — JS `316.10 kB` (gzip 107.48 kB), CSS `19.13 kB` (gzip 3.82 kB), HTML `0.44 kB`. These match the slice-5 README's own figures exactly (316 kB / 107 kB gzip).
- w89 (gh-pages root `index.html`): **1,922,769 bytes** single-file (VERIFIED by `wc -c`). Cakepanz's whole `dist/` is ~17% of w89's bytes — comfortably inside any budget w89 sets. But the comparison is apples-to-oranges in form: w89 is one self-contained file; Cakepanz is three files (HTML + hashed JS + hashed CSS). Against a "single-file" budget, Cakepanz fails the *form* (it is not single-file) while passing the *size*. No `vite-plugin-singlefile` or equivalent is configured. If the product rule ("one self-contained HTML file", AGENTS.md §3) is meant to bind the shell too, that is a finding; if the shell's multi-file `dist/` is acceptable because it deploys to Cloudflare Pages, the rule needs that carve-out written down.
- Build warning: one Svelte `non_reactive_update` warning on every build (`userTeam`, `App.svelte:48`) — see Part 1 §6 for the verbatim text. The slice-5 README's "no warnings" claim does not survive a re-run.

### file:// boot (UNKNOWN)
- In favour: `vite.config.js` sets `base: './'` (relative asset paths); `index.html` references `./assets/index-*.js` and `./assets/index-*.css` relatively; zero external URLs anywhere in `src/` or `index.html` (grep `https?://|fonts.google|cdn` → no hits), so nothing needs the network at boot.
- Against (i.e. unproven): the battery boots via `vite preview` over HTTP (`http://localhost:4179/?dev=1`), never `file://`; the fresh-start arms measured `file://` (their receipts show `file:///.../dist/index.html`, `blocked: 0`, zero console errors) but Cakepanz has no equivalent receipt; `dist/index.html` + `dist/assets/` must travel together (a user who saves only the HTML gets a blank page). No `file://` boot was demonstrated by the delivery or by me. UNKNOWN.

### Offline contract with network blocked (UNKNOWN)
- Static evidence is good: no CDN, no Google Fonts, no fetched assets, `localStorage` only, dataset bundled via `?raw` imports. Nothing in the shell *should* need the network.
- But no measurement exists: the Cakepanz battery records no `blocked` count and no console/page-error list for a network-blocked run (the fresh-start arms' receipts do: `blocked: 0`). Whether the built app makes zero requests with the network blocked is UNKNOWN until someone runs it that way.

### 390px pass (INFERRED risk, UNKNOWN as measured)
- No `@media` width query exists anywhere in `src/`; the battery viewport is 1180×950 only, and no 390px law exists in the battery (the V5 phone laws are SKIPped as "shell chrome"). So the 390px pass has never been run on this shell.
- Static arithmetic on the tightest component, `BoardRow.svelte`'s grid: `grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px` → fixed columns total 336px + 6 gaps × 8px = 384px, before the `1fr` name column and the `8px 6px` row padding. At 390px viewport with the app's `16px` side padding, the content box is 358px — **~26px narrower than the row's fixed minimum**, so the row should overflow horizontally (or squeeze the name column to zero with `overflow-wrap: anywhere` doing the rest). This is INFERRED from the CSS, not measured; the actual behaviour (scroll vs wrap vs clip) needs a 390px render. The other screens look safer statically: TeamSelect's grid is `repeat(auto-fit, minmax(210px, 1fr))` (collapses to one column), NeedsRow/Saves/Feed/Share all `flex-wrap: wrap`, and the topbar wraps. The board row is the specific 390px risk.

## 8. Documentation layer (VERIFIED by file listing)

What the delivery ships (6 markdown files + the vendored `tools/` docs):
- `README.md` — the delivery README (slices 1–5, pin, verification, w88 look, findings, innovations, boundaries). Long and useful; it is the de facto handoff note.
- `deliveries/slice3/README.md`, `deliveries/slice4/README.md`, `deliveries/slice5/README.md` — per-slice READMEs.
- `notes/INTAKE-LEDGER-slice3-slice4.md`, `notes/INTAKE-LEDGER-slice5.md` — directive-by-directive intake ledgers (what was asked, where it landed).

What the prompt's Part 13 asks for and the delivery **does not have**:
- **No "how the shell consumes the engine" one-pager.** The closest thing is scattered paragraphs in the README (the "what was copied into the snapshot" section, the `feedVM`/`shareVM` header comments). No single document states the seam, the VM rule, and the engine-versioning.
- **No screen-by-screen VM table.** No table maps screens → view models → engine functions → battery laws. The information exists (in code headers and the battery), but not as a table a new seat could inherit.
- **No pre/post-merge checklists** for either side (Z.ai's shell side or Claude's merge side). The README's "boundaries respected" checklist is a per-delivery self-check, not a merge checklist.
- **No review rubric** the next seat inherits. The battery *is* the rubric in executable form (88 laws), but there is no written rubric for the non-battery judgements (palette fidelity, wording, states coverage).
- **No neutrality inventory** (which files are portable vs Svelte-locked) — see Part 3 §3. This is the doc gap that most directly costs the cutover, because the next seat cannot tell at a glance what ports for free.

## 9. Findings filed (no fixes applied)

- **A1 — Tooltip is hover-only (VERIFIED):** `:focus-within` dead, no `aria-describedby`. The shell's clearest a11y defect.
- **A2 — No focus-visible styling; no skip link; no live regions for filtering/picks (VERIFIED).** Keyboard users get browser defaults and no announcements.
- **A3 — CONTRAST-TABLE recompute clean, but its reading note misquotes dark gold2 (VERIFIED):** "4.60–7.83" matches nothing in the table; the table's own cells (11.30/10.25/9.31) are correct. The 14 AA fails are confirmed as stated.
- **A4 — Cakepanz's own palette: 13/14 pairs pass; gradient end fails at 4.40 (VERIFIED by computation).** Team-ink contrast UNKNOWN (3.0 threshold + `color-mix`).
- **A5 — No w88 visual diff exists (UNKNOWN):** shots ship, no reference, no rendered comparison; CSS anatomy matches textually, fonts diverge (Georgia vs Cinzel/Bodoni).
- **A6 — Fixtures are one team, one seed band, happy paths only (VERIFIED):** no blowout/rematch/no-picks/losing-season fixtures; non-champion brag branches unexercised.
- **A7 — Bundle is small (335,665 B) but not single-file (VERIFIED):** form-vs-size tension with the product's one-file rule, unresolved in the docs.
- **A8 — file:// boot, network-blocked offline, and 390px are all UNKNOWN (VERIFIED as unmeasured):** no receipts exist; BoardRow grid arithmetic predicts ~26px overflow at 390 (INFERRED).
- **A9 — Docs layer is delivery READMEs + ledgers only (VERIFIED):** no consumption one-pager, VM table, merge checklists, review rubric, or neutrality inventory.

## 10. What this unblocks / how to verify

- For Z.ai's next round: A1 (focusable tooltip trigger + `aria-describedby`) is the highest-value a11y fix; A8 needs three receipts (file:// boot, blocked-network run, 390px scrollWidth per screen — the fresh-start `probe-battery.mjs` is the template); A9 needs the four missing docs, starting with the VM table and the neutrality inventory.
- For the next reviewer with a browser: re-run the contrast computation against the *rendered* team inks (computed `color-mix` values), measure 390px `scrollWidth` per screen, and boot `dist/index.html` from `file://` with the network blocked, recording `blocked` / console errors like the fresh-start receipts do.
- How to verify this filing: `grep -rn "tabindex\|focus-visible" src/` (expect zero hits); `grep -rn "prefers-reduced-motion" src/` (expect exactly the two rules cited); recompute the CONTRAST-TABLE with the Python in §3a against `/tmp/ct/.../CONTRAST-TABLE.md` (or re-extract it from `origin/council/inkling`); `npm run build` in a copy of s5 and `du -sb dist`; `grep -rn "@media" src/ --include="*.svelte"` (expect only the two reduced-motion rules).
