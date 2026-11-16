SPEAKER: ernie | ROLE: council | TASK: 67 Cakepanz — 390 px, style laws, node counts, theme, data integrity (Parts 8, 9, 11, 12, 13) + §5 proposals | DATE: 2026-11-16T21:08Z
FOR: R-13

**Tree:** `_agents/ernie/deliveries/zai-sitting-1116-fourslice/67-cakepanz-s3-s4-rev2` (slices 1-4, engine `4ca9a071`).
**Probes (my own, in my lane, run against `vite preview` + `node --experimental-strip-types`):** `probe-dom.mjs`, `probe-390.mjs`, `probe-feed-copy.mjs`; receipts in `_agents/ernie/deliveries/cakepanz-shell-review-2026-11-16/`.

# Part 8 — the non-functional laws, measured

| law | result | receipt |
|---|---|---|
| 390 px, no horizontal scroll — **Team Select** | PASS — `scrollW 390, clientW 390, overflow 0` | `receipt-dom.txt` |
| 390 px, no horizontal scroll — **Draft Board** | **FAIL — `scrollW 444, clientW 390`, 54 px overflow, 120 elements past the edge** | `receipt-390.txt` |
| zero console errors / page errors — desktop | PASS — `pageErrorsDesktop: []` | `receipt-dom.txt` |
| zero console errors / page errors — 390 px | PASS — `pageErrorsMobile: []` | `receipt-dom.txt` |
| single-file / file:// boot | NOT RE-RUN by me; the sitting's own finding stands: vanilla `file://` is CORS-blocked by the dist's `crossorigin` tags, the flag boot is clean (`filings/inbox-20261115-zai-architect-findings.md`) | REPORTED (Z.ai) |
| build | PASS with one warning: `App.svelte:44 'userTeam' is updated, but is not declared with $state(...)` | `npm run build` |

The 390 px failure is a delivery-law failure ("390 px clean" is in the brief twice and in `AGENTS.md` §10) and it is on the screen the product opens on after Team Select. Root cause is one CSS rule with no media query behind it — see §5 proposal P1 below.

# Part 9 — data integrity: one hard-coded season length, no invented numbers

```
$ grep -rnE "flex|penalty" src/lib src/App.svelte | grep -v "//"   -> CSS only + the engine's own fit() calls
$ grep -rnE "= *[0-9]{2,}|: [0-9]{3,}" src/lib/*.ts src/lib/screens/*.svelte src/lib/components/*.svelte src/App.svelte
src/lib/feedVM.ts:37: export const FEED_YEAR = 2027;   // the label year for the demo week (informational; drives nothing)
src/lib/savesApp.ts:59: const f = lw.state.nextWeek <= 22
```

- **No hard-coded flex table, no slot values, no ratings, no draft order** anywhere in `src/lib/**` or `App.svelte`. The chips call the engine's `fit()` (`SlotPicker.svelte:10`), the board reads `boardVM`/`goneOdds` from the snapshot, the lineup advice calls `lineupFor`. The "every number comes from the engine" claim survives the grep.
- **Finding (D5): `src/lib/savesApp.ts:59` hard-codes `22`** as the last week. The engine owns that number (`weekmap.ts:73` uses the same literal; `season.ts:75` meets the Super Bowl at week 22). If the season length moves, the saves panel reports "season complete" early or late with no error. This is exactly the class of duplication the brief forbids ("no re-implemented … engine facts"), and it is two characters to fix — see P3.
- **`FEED_YEAR = 2027`** is a label, not a value: harmless, but it is a year on screen the engine does not vouch for. Worth one line in the handoff's provenance table.
- The valuation-mode label does travel with the numbers (`TeamSelect.svelte:24` prints `MODE_LABEL[...]`; the battery asserts the switch locks at START). PASS.

# Part 11 — the style laws

Grep over the shell's own source (`src/lib`, `src/App.svelte`), not the snapshot:

| law | hits in shell source |
|---|---|
| "expected scoring" | 0 |
| "before kickoff" | 0 |
| "sudden death" | 0 |
| "injur*" | 0 |
| periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL | 0 |
| 2-Pt Conv form | n/a — the shell has no conversion copy yet |
| the user's team in blue (`.ub`) | **`ubCount: 0`** — no `.ub` class exists in the tree (see Part 13) |

**But the rendered feed prints "touchdown".** `node probe-feed-copy.mjs` renders the shell's own `feedVM` on the pinned snapshot; 5 of 22 drive lines read:

```
Houston Texans ends in a touchdown — 9 plays, 3 min.
Chicago Bears ends in a touchdown — 9 plays, 3 min.
```

Source: the snapshot's own `src/engine/sports/nfl/app/feed.ts:88` (`TD: 'ends in a touchdown'`), spread into the VM at `src/lib/feedVM.ts:133` (`...d`) and rendered verbatim at `src/lib/screens/Feed.svelte:54` (`{d.summary}`). The Owner's law is "never print the words Touchdown". The shell cannot edit the snapshot, so this is a §5 to the Architect **and** a shell-side transform — see P2.

# Part 12 — node counts (measured, not taken from the battery)

| screen | DOM nodes | the fresh-start arms' numbers (REPORTED) |
|---|---|---|
| Team Select (initial) | **78** | — |
| Team Select (team chosen, details open) | **83** | — |
| Draft Board (60 rows, picker closed) | **832** | Svelte arm board 871 · Vue arm 470 |
| Saves panel open (over the board) | 40 (panel only) | — |

The board at 832 nodes is within 5% of the Svelte fresh-start arm's 871 for the same information — no 3× DOM finding. Team Select at 78 is cheap. **Caveat:** the arms' six numbers (871/457/470/125/221/39) are REPORTED by Z.ai's two-arm build; I did not rebuild them, so the comparison is indicative, not a parity proof.

# Part 13 — theme, palette, accessibility

`node probe-dom.mjs` theme block on the dev build:

```
bodyFont: "Times"      fontFaces: []        cinzel: []
dataZpbteam: null      .ub count: 0
colorScheme: "dark"    prefersLight: true   appBg: rgb(24, 17, 20)
```

Grep over `src/`: no `fdf2f6` (pale-rose light), no `1e1119` (dark bg), no `Cinzel`, no `data-zpbteam`, no `zcream`, no `--tc`.

**This is the largest gap between the tree and the Owner's visual law**, and it is not a defect the shell can fix quietly — the palette ruling is the Owner's. Stated plainly for the handoff:

1. the tree is **dark-only** (`color-scheme: dark`); there is no light mode to be beautiful in;
2. the display font is **not Cinzel** — nothing is inlined, and the body falls back to the browser's default serif (measured: `Times`);
3. **the team is not the palette** — the team colour appears only as the per-line ink in the feed (`src/lib/ink.ts`, contrast-picked against the dark panel). Every other surface is fixed gold-on-ink;
4. **no `.ub`** — the user's team is not marked, because the w89 blue law is not implemented in this skin;
5. no `[data-zpbteam]` remap exists, so the 32-team palette table cannot drive the page.

I did not measure contrast ratios (the w89 `CONTRAST-TABLE.md` exercise) because with no light mode and no team remap there is one surface to measure, and the Owner's two open palette questions (the light gold2 AA failure, the dark `--text` fix) are explicitly not mine to decide. **Recommend:** the next slice's first acceptance screen is the palette in both modes; until then "beautiful in both modes" is UNKNOWN, not done.

# §5 proposals (for the Architect / work items for Z.ai's next round)

**P1 · 390 px board overflow — one CSS rule (work item: Z.ai's shell, not the engine).**
WHERE: `src/lib/components/BoardRow.svelte:38`
old: `.cp-main { display: grid; grid-template-columns: 1fr 44px 44px 48px 72px 72px 56px; gap: 8px; ... }`
new: keep the desktop rule, and add below it (there is no `@media` in this file today):
`@media (max-width: 560px) { .cp-main { grid-template-columns: 1fr 40px 40px 44px; gap: 6px; } .cp-main > :nth-child(5), .cp-main > :nth-child(6), .cp-main > :nth-child(7) { display: none; } }`
WHY: 336 px of fixed columns + 48 px of gaps + 12 px padding = 396 px > 390 px viewport; the last three columns (priority / gone% / the gone wrapper) are the ones measured past the edge (`receipt-390.txt`).
HOW TO CHECK: `node probe-390.mjs` -> `scrollW` must equal `clientW` (390) at 390 px.
SAFE ALONE: yes. This is presentation only; no engine value is touched.

**P2 · the feed prints "touchdown" (§5 to the Architect for the snapshot; shell transform for Z.ai).**
WHERE (engine, Architect): `colors/src/sports/nfl/app/feed.ts:88` — `TD: 'ends in a touchdown'`.
old -> new: `TD: 'scores a touchdown'` is **not** the fix (the word remains). The Owner's law is the word itself. Two legal routes: (a) `TD: 'finishes a drive'` / `'punches it in'` — loses information; (b) keep the engine string, and have the shell map it.
WHERE (shell, Z.ai): `src/lib/feedVM.ts` — the VM already rewrites engine copy into badges (`BADGE`/`CONV_BADGE`, lines 106-115); add a summary transform in the same place so the rendered line never carries the word.
WHY: the Owner's style law is explicit ("never print the words Touchdown"), and the feed is the surface most likely to be screenshotted.
HOW TO CHECK: `node probe-feed-copy.mjs` -> `lines printing "touchdown"` must print 0.
SAFE ALONE: yes (string only).

**P3 · the shell duplicates the season length.**
WHERE: `src/lib/savesApp.ts:59` — `lw.state.nextWeek <= 22`.
old -> new: read the engine's own last week instead of the literal (the engine exposes the week count through the schedule/`LAST_REGULAR_WEEK`; if it does not, that is a §5 to the Architect to export it, not a reason to keep the literal).
WHY: a duplicated engine fact is a silent-divergence bug; the panel would claim a season is complete while games remain.
HOW TO CHECK: unit-check `fixtureLine` against a state with `nextWeek` at the boundary; the two branches must be driven by the engine's constant, not by 22.
SAFE ALONE: yes.

**P4 · `let userTeam = 0` is not reactive.**
WHERE: `src/App.svelte:44` — old: `let userTeam = 0;` new: `let userTeam = $state(0);`
WHY: `npm run build` warns `non_reactive_update`; it is a today-non-bug only because the screen flip re-renders in the same handler. One word removes the warning and the latent bug.
HOW TO CHECK: `npm run build` -> the warning is gone.

# What this unblocks

P1/P4 are one-line shell fixes Z.ai can take in the next slice with no ruling. P2/P3 are §5 items for the Architect (P2) and a shell-side transform (P2b) that removes a style-law violation from the most public screen. Part 13's finding is the honest statement the Owner needs before he rules the palette: this tree is not "beautiful in both modes" — it is one dark mode, not yet the w89 law.

**Weakest point:** all of the above is measured on the app tree at `4ca9a071`, not on the gh-pages copy (`d3bd81d2`, slices 1-2). If the deployment tree is the one that ships, P1/P2/P4 need re-measuring there — P1 especially, since the board markup may differ.