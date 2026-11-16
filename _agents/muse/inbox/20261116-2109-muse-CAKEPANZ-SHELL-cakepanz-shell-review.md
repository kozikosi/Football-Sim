SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 1 — review the shell as it stands | DATE: 20261116-2109
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 1 — Review of the 67 Cakepanz shell as it stands (slices 1–5)

## What was reviewed (sources)

- **Latest delivery (VERIFIED by extraction):** `67-cakepanz-s5` on `origin/council/inkling` (`_agents/inkling/deliveries/67-cakepanz-s5/`, 195 files). README dated 10 Nov 2026, Z.ai, slices 1–5.
- **Prior delivery (VERIFIED by extraction):** `67-cakepanz-s3-s4-rev2` on `origin/council/ernie` (185 files). Diffed against s5 (see §2).
- **Deployment (VERIFIED by extraction):** `67-cakepanz/` on `origin/gh-pages` (166 files) — slices 1–2 only, stale (see §7).
- **w88 reference (VERIFIED):** `Football-Sim-Z-post-blue-w88.html` on `origin/gh-pages`, 1,904,952 bytes.
- **What I ran myself (VERIFIED):** `npm install && npm run build` in a scratch copy of s5 → build exit 0 (see §6); `npm run test:engine` in that copy → **284 pass / 0 fail** in 179 s (see §6); `diff -rq` of `src/engine/` against `colors/src` at `4ca9a071` → 0 differences, 52 files (see §5); `sha256sum -c CHECKSUMS-slice5.txt` → 21/21 OK (see §5).
- **What I did NOT run:** the Playwright battery (`batteries/slice1.battery.mjs`). Playwright is not installed in this environment (`~/.npm-global/lib/node_modules/` is empty; no `playwright` in the installed `node_modules`), and the battery needs a `vite preview` server on port 4179 plus a Chromium launch. All battery numbers below are therefore **REPORTED** (Z.ai/Inkling), not re-verified by me. Per the standing boundary, no live browser check was attempted; every browser-dependent claim is marked UNKNOWN.

## 1. Inventory — what exists, screen by screen

| Screen / surface | Exists in s5? | File(s) | State |
|---|---|---|---|
| Empty state (public default, F11) | YES | `src/App.svelte` (empty branch) | Renders "No player dataset yet" + `?dev=1` link. VERIFIED by reading; rendering UNKNOWN (no browser). |
| Team Select | YES, but P-317 incomplete | `src/lib/screens/TeamSelect.svelte` | 32 teams, real AFC/NFC alignment, details + rivals, flows into board. **No draft-position (slot 1–32) picker on this screen** — see finding F1. |
| Draft board | YES | `src/lib/components/DraftBoard.svelte`, `BoardHeader/BoardRow/BoardFooter/SortControls.svelte` | 60 rows, wins-first sort, on-clock indicator, gone%, flex chips, confirm step, undo. |
| "My needs" row | YES | `src/lib/components/NeedsRow.svelte` | Sticky, 32 open slots at start, click-to-filter incl. flex fills, ALL clear. |
| Gone-odds tooltip | YES | `src/lib/components/BoardRow.svelte` | Hover method tooltip carrying engine `picksBetween`/`sims`. Keyboard behaviour is broken — see Part 13 / finding F2. |
| Slot picker (per-pick) | HALF — dead code | `src/lib/components/SlotPicker.svelte` | Imported by `DraftBoard.svelte:9` but **never rendered** (`grep "<SlotPicker" src/` → no hits). The per-pick slot choice is instead the flex chips + primary chip inside each open `BoardRow`. See finding F3. |
| Lineup advice | YES | `src/lib/components/LineupAdvice.svelte` | Best lineup from roster via engine `lineupFor`. |
| Valuation mode switch | YES | `src/lib/components/ModeSwitch.svelte`, `src/lib/valuation.ts` | Measured default, Owner preset one click away, locked mid-draft. |
| Saves / hydration | YES | `src/lib/savesApp.ts`, `src/lib/components/Saves.svelte` | Slots A/B/C, envelope read/write, corrupt-never-repair, newer-version refusal, real week-save hydration. |
| Week-1 feed | YES | `src/lib/screens/Feed.svelte`, `src/lib/feedVM.ts` | Drive-level feed, week 1 only. No week stepper, no weeks 2–18. |
| Share / brag + seed card | YES | `src/lib/screens/Share.svelte`, `src/lib/shareVM.ts`, `src/lib/bragCard.ts` | Game brag + season brag + seed card, SAVE PNG via canvas. |
| Season hub | NO | — | Missing. Only a hydrated-week card inside the Saves panel and a season brag rendered from an injected save. |
| Week views / week stepper | NO | — | Missing. Feed is hardcoded `week: 1` (`feedVM.ts`: `week: 1, year: FEED_YEAR`). No navigation between weeks. |
| Standings / bracket | NO | — | Missing in UI. Engine has `standings.ts`/`seasonrun.ts` in the snapshot; no screen renders them. |
| Awards | NO | — | Missing in UI. Engine has `awards.ts` in the snapshot; no screen renders it. |
| Season review / Super Bowl review | NO | — | Missing, except the season brag card (a static artifact, not a review screen). |
| Stats table | NO | — | Missing. No stats screen exists in s5 (fresh-start arms have one; Cakepanz does not). |
| Player cards | NO (as a screen) | — | No player-detail card. The board row is the only player surface. |
| Settings form | NO | — | Missing. No settings screen, no persistence of user prefs (fresh-start arms have one, 39 nodes). |
| Guide ("How this works") | NO | — | Missing. No guide surface at all. |
| Palette — dark mode | YES | `src/App.svelte` (`color-scheme: dark`, `#181114` page) | Dark only. |
| Palette — light mode | NO | — | Missing. No light tokens, no light CSS, no mode toggle anywhere in `src/` (grep `dark|light mode` in shell files → only `color-scheme: dark` and ink comments). The w89 pale-rose light mode is not implemented. |
| Offline / file:// | PARTIAL | `index.html`, `vite.config.js` (`base: './'`) | Zero external references in `src/` + `index.html` (grep `https?://|fonts.google|cdn` → no hits) — good. But `dist/` is **not single-file** (see §6), and nothing in the battery boots `file://`. File:// boot UNKNOWN. |
| 390px | UNVERIFIED | — | No `@media` width query anywhere in `src/`; battery viewport is 1180×950 only. BoardRow grid arithmetic suggests overflow at 390 — see Part 13. |

## 2. What slice 5 added over s3–s4-rev2 (VERIFIED by `diff -rq`)

New files: `src/lib/screens/Share.svelte`, `src/lib/shareVM.ts`, `src/lib/bragCard.ts`, `batteries/probe-share.mjs`, `batteries/seasonfixture.mjs`, `deliveries/slice5/README.md`, `notes/INTAKE-LEDGER-slice5.md`, `CHECKSUMS-slice5.txt`, three new shots. Changed files: `src/App.svelte` (share wiring), `src/lib/components/Saves.svelte` (Brag card button), `src/lib/savesApp.ts` (`readEnvelope`), `src/lib/screens/Feed.svelte` (SHARE THE RESULT), `batteries/slice1.battery.mjs` (+14 laws), `batteries/slice1-battery.json`, `batteries/weekfixture.mjs` (`leagueTeams` export), `index.html` (title), `README.md`, `deliveries/slice3/README.md` (law-count fix 12→17), `shots/slice4-feed.png`. Engine untouched between the two deliveries (both pin `4ca9a071`).

## 3. Per-screen verification (what I could check without a browser)

### Team Select — VERIFIED by reading; P-317 gap is real
- `TeamSelect.svelte` renders 2 conferences × 4 divisions × 4 teams = 32 `<button>`s from engine `league.ts` (`TEAMS`, `DIVS`, `divisionTeams`), details panel with `aria-live="polite"`, rivals from the real alignment, `DRAFT AS <TEAM>` start button. Tab order is plain DOM order (no `tabindex` anywhere). **No slot picker on this screen.** `SlotPicker.svelte` exists but is a per-pick slot chooser, not a draft-position picker, and it is not rendered anywhere. The draft-position choice (slot 1–32, same screen, same look) is therefore **not built**. `startDraft` in `App.svelte` takes only `teamIndex`; `seed` is random (`1000 + Math.floor(Math.random() * 9000)`). The store's `START` is dispatched without an `order` parameter. This matches the known P-317 blocker, but the shell side (picker UI against the engine's `order` parameter) is also unbuilt — it is not solely waiting on the Architect's store change.

### Draft board — VERIFIED by reading + build; battery claims REPORTED
- Structure is as claimed: `boardVM` from the snapshot, 60 rows, sort `wins` default, `goneOdds` with 30 sims, confirm-before-pick, undo, CPU picks on. Battery json (REPORTED) asserts 60 rows / 0 bad fields, OVR sort actually sorts, flex chips observed open (14 pickers, 48 chips), pick lands + footer counts, undo returns to 0, mode lock fires at START. I could not re-run these assertions (no Playwright — see header). The one thing I did re-prove node-side is the engine underneath: 284/284 tests pass in this tree.
- **Finding F1 (P-317, VERIFIED):** Team Select has no draft-position picker; `startDraft(teamIndex)` takes no slot; no `order` is passed to the store.
- **Finding F3 (VERIFIED):** `SlotPicker.svelte` is dead code — imported at `DraftBoard.svelte:9`, never instantiated. Either it should be wired in or deleted; as it stands it is a false affordance in the tree (a reader assumes the picker exists in the UI).
- **Finding F4 (VERIFIED, build warning):** my `vite build` re-run emits a Svelte warning the slice-5 README says does not exist: `src/App.svelte:48:6 'userTeam' is updated, but is not declared with '$state(...)'` (`non_reactive_update`). `userTeam` and `seed` are plain `let` (lines 48–49) while `screen` is `$state`. The board still refreshes in practice because `refresh()` writes the `writable` stores, but the compiler is telling the truth: assignments to `userTeam`/`seed` in `startDraft`/`loadDraft` do not themselves trigger updates. The delivery README's "no warnings" (goals-check §1, also `deliveries/slice5/README.md`) is false on re-run. Full warning text is in §6.

### Needs row + gone tooltip — VERIFIED by reading; battery claims REPORTED
- `NeedsRow.svelte`: `openSlots` from engine `openSlots`, labels from `slotLabel`, filter predicate in `DraftBoard.svelte` is `slotId ∪ alsoFits` (flex fills included). Battery (REPORTED): 32 chips at start, click filters 60 → 19 rows, all 19 provably fill the slot, ALL clears.
- Tooltip: `BoardRow.svelte` renders `.cp-gonetip` with the engine meta (`picksBetween`, `sims`) and the battery (REPORTED) recomputes `goneOdds` node-side (between=22, sims=30 on the run). **Finding F2 (VERIFIED by reading):** the tooltip shows on `:hover` and `:focus-within`, but `.cp-gone-wrap` contains no focusable element (two `<span>`s, no `tabindex`, no button/link) — `:focus-within` can never fire from the keyboard. A keyboard user can never see the method text. See Part 13 for the full a11y treatment.

### Saves / hydration — VERIFIED by reading; battery claims REPORTED
- `savesApp.ts` routes all reads/writes through the engine's `serialize`/`restore`/`assertSlotMatchesKey` and `createLocalStorageModule` (keys `sim:nfl:slot:<S>` via `sportKey`). `Saves.svelte` shows empty / ok / refused states verbatim, with the hydrated-week card naming the trusted-vs-rederived split. Battery (REPORTED): draft envelope lands in slot A (rev 21, 20 picks, Chicago Bears), survives reload, corrupt week save refused verbatim (`week: roster must be 32 frozen players`), newer-version envelope refused as newer, real engine-built week save hydrates (WEEK · rev 1 · Buffalo Bills · next week 3 · Seattle Seahawks @ Buffalo Bills · 32 games played).
- Limitation (VERIFIED by reading): loading a **week/season** save does not enter a season flow — `load()` in `Saves.svelte` only sets `hydrated = sum` and shows the card; the comment admits "the season screens ride a later slice". A user who loads a week save has nowhere to go (no PLAY WEEK 2, no season hub). Hydration is proven; continuation is missing.

### Feed (week 1) — VERIFIED by reading; w88 anatomy match VERIFIED textually
- `feedVM.ts` derives the game exactly as documented: `buildSchedule` → `gameSeed` → `matchupModel`/`teamIdentity`/`simulateGame` → snapshot `gameFeed`; running scores, lead-change marks, me-flag, `yards: null` honoured (no yard figure invented — grep for yard rendering in `Feed.svelte` finds only the footer sentence "none is faked"). Battery (REPORTED): UI game = engine game exactly (CHI 39 · IND 36, 20 drives = 20, 10 me-drives, 4 lead changes, 25 badges, running scores end at the final, NEWEST FIRST flips, MY DRIVES filters to 10, reduced-motion off).
- w88 look: I compared the claimed badge CSS against the w88 file directly (VERIFIED): w88 `.zrl-badge{border:1px solid currentColor;border-radius:6px;padding:0 5px;font-size:.62rem;font-weight:800;letter-spacing:.08em;}` matches `Feed.svelte`'s `.zrl-badge` line-for-line. The `zrl-t`/`zrl-team`/`zrl-sc` class names are genuinely w88's (12 `zrl-t`, 11 `zrl-team`, 9 `zrl-sc` occurrences in w88.html). The "faithful re-derivation" claim holds at the CSS level.
- **Finding F5 (VERIFIED in snapshot source):** the engine `clock()` in `src/engine/sports/nfl/app/feed.ts:59-62` caps the quarter at 4 (`Math.min(4, Math.ceil(secs/900))`), so an OT drive start maps to Q4 with a negative mm:ss remainder. `Feed.svelte` works around it (`period >= 5` → `OT` stamp / `OT${period-4}` clock). The README reports this as finding 1; I confirm the snapshot code reads exactly as described. Presentation working around a frozen-snapshot quirk is the right call; the one-line fix belongs to a future re-pin, not to this shell.
- **Finding F6 (VERIFIED):** the feed is week-1-only by construction (`feedVM` returns `week: 1`; `playWeek()` in `App.svelte` gates on draft `status === 'done'` and plays exactly one game). There is no week stepper, no week-2 fixture, no way to play on. The "week stepper" screen in the prompt's inventory does not exist.

### Share / brag + seed card — VERIFIED by reading; battery claims REPORTED
- `shareVM.ts` is clean plain-JSON view-model code: game brag from `feedVM` (same path as the feed), season brag from the envelope's own table row/champion/outcome, seed card with an honest replay recipe. `bragCard.ts` draws the same VM onto canvas (1200×675 PNG per `shots/probe-share-artifact.png`). Battery (REPORTED): scoreline exact vs node recompute, proof carries real seed + gameSeed + pin + dataset sha, SAVE PNG is real PNG magic bytes (78,820 bytes game card; 87,207 seed card), card contains no link back (0 `http|href` occurrences), season save classifies (SEASON · rev 1 · Buffalo Bills · champion · 21 games played), node-side replay from (seed 4275, year 2027, run) lands the same champion and 10-7-0 row.
- **Finding F7 (VERIFIED by reading `shareVM.ts:seedCardForGame`):** the seed card's replay recipe tells the user to "enter the seed {seed} at the start" — but the app has **no seed-entry UI**. `startDraft` generates a random seed; Team Select has no seed field; there is no way for a user to enter a seed. The recipe step is currently unperformable from the UI. (The battery proves the replay node-side; the human path does not exist.)
- **Finding F8 (style-law note, VERIFIED):** the conversion badge reads `2PT` / `2PT FAIL` (`feedVM.ts:114-115`). The house style law is "2-Pt Conv" except in the Guide. The feed badge is neither "2-Pt Conv" nor covered by a Guide exception (no Guide exists). Minor wording drift; flagging, not verdicting.
- No "expected scoring" / "before kickoff" / "expected points" / "projected score" strings anywhere in shell `src/lib`, `App.svelte`, `main.ts`, or `index.html` (grep → zero hits). The plain-informative negative check is clean on those phrases.

### New surfaces — states-coverage review
- **Season hub / week views / standings / bracket / awards / review / guide:** absent, so there is no snapshot byte-identity, battery structure, VM seam, states coverage, 390px check, or reduced-motion audit to perform on them. The battery's 10 SKIP entries are exactly these surfaces (V4 command center, V5 phone laws, V6 playoff cinematics, V8 stage bars/preseason/guide, V9–V12 season surfaces, V1/V7/V15/V17 shell forms). The SKIPs are loud and reasoned — that is the honest form — but the consequence is that slices 1–5 cover the draft + one game + a static card, and nothing of the season.
- **Shareables' states (VERIFIED by reading `Share.svelte` + `shareVM.ts`):** game brag (vm present) / seed-only (vm null, draft/week save) / saving-disabled-while-saving / saved-note (`role="status"`). The empty-brag note ("no result stored in this save yet") is honest. Missing state: share from a week save has no week-brag variant (filed as IDEA in the slice-5 README itself — agreed, not built).
- **Reduced-motion audit (VERIFIED by grep):** exactly two `prefers-reduced-motion` rules in the whole shell: `Feed.svelte:110` (beat-in animation off) and `BoardRow.svelte:53` (tooltip transition none). The feed beat-in is the only animation in the shell, and it has the off-switch; battery (REPORTED) asserts computed `animation-name: none` under reduced motion. No other animation exists to audit.

## 4. Battery structure review (REPORTED numbers, VERIFIED structure)

- `batteries/slice1.battery.mjs` is 453 lines, one file for all five slices. 88 laws: **75 PASS / 0 FAIL / 10 SKIP / 3 DEFER** (counted from `slice1-battery.json` with Python — matches the README). The 3 DEFERs all go to the cutover battery (gone-odds method equality, 84-assertion DOM byte-parity, witness export parity).
- The battery runs Playwright Chromium against `vite preview` on `http://localhost:4179/?dev=1` at viewport 1180×950. It does **not** boot `file://`, does **not** test 390px, does **not** count DOM nodes, does **not** test keyboard/focus, and does **not** test light mode. Its SKIP list is honest, but the battery's coverage ends where the season begins.
- Probes (`probe-filter/save/shots/slice3/slice4/share.mjs`) are dev tools, not wired into `npm run battery` (package.json `battery` script runs only `slice1.battery.mjs`). A seat re-running the gate gets the battery only.

## 5. Snapshot byte-identity (VERIFIED)

- `diff -rq src/engine/ /tmp/pin4/colors/src` (engine at `4ca9a071`) → **0 differences, 52 files**. The snapshot is byte-identical to `4ca9a071`, as the README claims.
- Against the prompt's stated pin `d3bd81d2`: **11 differences** (5 changed files — `core/app.ts`, `app/dataset.ts`, `engine/draft.ts`, `engine/flex.ts`, `engine/slots.ts`, `engine/value.ts` — plus 5 files present only at `d3bd81d2`: `core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `engine/legacyprovider.ts`). The s5 snapshot is therefore **not** the `d3bd81d2` engine; it predates the 99-rule flex and the newer core files. The README is internally consistent about this (it names `4ca9a071` throughout); the prompt's "pin `d3bd81d2`" does not describe this delivery. (Pin detail is Part 10's territory in the full prompt; recorded here because it bounds what the shell can express — e.g. the flex chips read the old flex table.)
- Checksums: `CHECKSUMS-slice5.txt` → **21/21 OK** under `sha256sum -c`. `CHECKSUMS-slice3-slice4.txt` → 12 OK / **10 FAILED** on re-run — but every failing file is one slice 5 legitimately changed (`App.svelte`, `Saves.svelte`, `Feed.svelte`, `savesApp.ts`, `slice1.battery.mjs`, `weekfixture.mjs`, `slice1-battery.json`, `README.md`, `shots/slice4-feed.png`, `deliveries/slice3/README.md`). The slice3–4 manifest is a per-slice record, not a live manifest; a naive re-run looks like 10 failures. `CHECKSUMS-slice1.txt` / `slice2.txt` are md5 + prose headers, not `sha256sum`-parseable (`no properly formatted checksum lines found`).

## 6. What I ran (receipts)

```
$ cp -r <s5 delivery> /tmp/cake-build && cd /tmp/cake-build && npm install --no-audit --no-fund
  (installed; node v24.22.1, npm 10.9.4)
$ npm run build
  9:08:15 PM [vite-plugin-svelte] no Svelte config found at /tmp/cake-build - using default configuration.
  9:08:17 PM [vite-plugin-svelte] src/App.svelte:48:6 `userTeam` is updated, but is not declared with `$state(...)`.
  Changing its value will not correctly trigger updates
  https://svelte.dev/e/non_reactive_update
  46:   const openNow = writable<SlotId[]>([]);            // the real open slots (recomputed every refresh)
  47:   const needsSel = writable<SlotId[]>([]);           // the user's filter selection (ephemeral UI state)
  48:   let userTeam = 0;
                    ^
  49:   let seed = 777;
  50:   let screen = $state<Screen>('team');   // the draft flow starts at Team Select; the board follows the choice
  ✓ 183 modules transformed.
  dist/index.html                   0.44 kB │ gzip:   0.31 kB
  dist/assets/index-D2jUzyc-.css   19.13 kB │ gzip:   3.82 kB
  dist/assets/index-6Lyri8Rm.js   316.10 kB │ gzip: 107.48 kB
  ✓ built in 12.00s   (first build: 2.48s; same output sizes)
$ npm run test:engine
  ℹ tests 284 / ℹ pass 284 / ℹ fail 0 / ℹ duration_ms 179332.79
$ git show origin/gh-pages:index.html | wc -c   → 1922769  (w89, ≈1.9 MB, matches the prompt's figure)
```
- `dist/` total: **335,665 bytes** (JS 316.10 kB / gzip 107.48 kB; CSS 19.13 kB / gzip 3.82 kB; HTML 0.44 kB). **Not single-file**: `index.html` loads `./assets/index-*.js` + `./assets/index-*.css`. `base: './'` makes the relative paths file://-friendly in principle, but no `file://` boot was demonstrated by the delivery or by me — UNKNOWN.
- Note the build output sizes match the slice-5 README's own figures exactly (316 kB JS / 107 kB gzip) — but the README's "no warnings" does not survive a re-run: the `userTeam` warning above appeared on both of my builds.

## 7. gh-pages deployment (VERIFIED)

- `67-cakepanz/` on `origin/gh-pages` is **slices 1–2 only** (README: "Slices 1-2: the Draft Board + Team Select", 8 Nov 2026; battery json 26 PASS / 10 SKIP / 3 DEFER). It lacks `NeedsRow.svelte`, `Saves.svelte`, `feedVM.ts`, `Share.svelte`, `shareVM.ts`, `bragCard.ts`, `seasonfixture.mjs`, the probe files, `weekfixture.mjs`, and the slice 3–5 shots. The deployment is two slices behind the latest delivery. The live site root (`index.html`, 1,922,769 bytes) is w89, not Cakepanz.
- **Pin nuance on the deployment (VERIFIED after the first draft of this section):** the gh-pages engine snapshot is byte-identical to **`d3bd81d2`** (`diff -rq` vs `colors/src` at `d3bd81d2` → 0 differences, 57 files), while the gh-pages README still claims pin `4ca9a071`. The engine was re-pinned on the deployment (AGENTS.md §2 records the re-pin at gh-pages `66096fb1`) but the README claim and the shell slices were not updated with it. So the deployment carries the newer engine with the older shell, and its own README misstates its pin. The s5 delivery (52 files, `4ca9a071`) is behind the deployment's engine, not ahead of it.

## 8. Findings filed (no fixes applied — per the laws)

- **F1 — P-317 incomplete on the shell side (VERIFIED):** Team Select picks team only; no draft-position picker; `startDraft` takes no slot; no `order` reaches the store. The Architect's store change is one half; the shell picker is the other, and it is unbuilt.
- **F2 — Gone tooltip is hover-only (VERIFIED):** `:focus-within` rule exists but no focusable element inside `.cp-gone-wrap`; keyboard users cannot reveal the method text.
- **F3 — Dead `SlotPicker` import (VERIFIED):** imported in `DraftBoard.svelte:9`, never rendered.
- **F4 — Build warning contradicts the delivery README (VERIFIED):** `userTeam` `non_reactive_update` warning on every build; README says "no warnings".
- **F5 — OT clock quirk confirmed in snapshot (VERIFIED):** `feed.ts:59-62` caps at Q4; feed works around it. Fix belongs to a future re-pin.
- **F6 — No season beyond week 1 (VERIFIED):** no week stepper, season hub, standings, bracket, awards, review, stats table, player cards, settings, or guide. Loading a week/season save dead-ends at an informational card.
- **F7 — Seed card recipe unperformable (VERIFIED):** "enter the seed at the start" — no seed-entry UI exists; seeds are random.
- **F8 — "2PT" badge vs "2-Pt Conv" style law (VERIFIED):** minor wording drift in `feedVM.ts:114-115`.
- **F9 — Light mode missing (VERIFIED):** dark-only shell; the w89 pale-rose light mode and Cinzel display type are not implemented (Georgia throughout; no `@font-face`, no font loading). The shell's look is the dark-gold brand, not the w89 two-mode palette.
- **F10 — Checksum manifests are per-slice records, not live gates (VERIFIED):** slice3–4 manifest fails 10/22 on re-run against the slice-5 tree; slice1–2 manifests are md5+prose and not machine-checkable with `sha256sum -c`.

## 9. What this unblocks / how to verify

- For Z.ai's next round: F1 (slot picker UI), F2 (focusable tooltip trigger), F3 (wire or delete SlotPicker), F6 (season surfaces are the whole remaining shell), F7 (seed entry or reword the recipe), F9 (light mode + Cinzel, if the Owner wants the w89 look in full).
- For Claude's merge: the snapshot is byte-identical to `4ca9a071` (not `d3bd81d2`) — any merge plan must name which pin it targets; the shell's engine-facing surface is `boardVM`/`goneOdds`/`lineupFor`/`feedVM`/`shareVM` plus the envelope seam, all read-verified here.
- How to verify this filing: `git archive origin/council/inkling _agents/inkling/deliveries/67-cakepanz-s5 | tar -x -C /tmp/cake-s5`, then `npm install && npm run build && npm run test:engine` in that copy; `diff -rq src/engine/ <colors/src @ 4ca9a071>`; `grep -rn "<SlotPicker" src/`; `grep -rn "non_reactive" ` on build output. The Playwright battery needs Playwright + `vite preview` on port 4179 — I could not run it here.
