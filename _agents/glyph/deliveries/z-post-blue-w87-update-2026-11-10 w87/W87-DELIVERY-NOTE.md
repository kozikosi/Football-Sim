# W87 DELIVERY NOTE — the dropdown house + the recalculated Wins table

**Wave:** w86 → w87 · **File:** `Football-Sim-Z-post-blue-w87.html` · 1,900,033 B · md5 `bffdccace803ab126b52783e0de8f2e1`
**Built from:** `Football-Sim-Z-post-blue-w86.html` (gh-pages, 1,880,723 B, md5 503d7d31…) via asserted-replacement patch scripts (`scripts/zpb_w87.py` + fixes 1–4, 17 asserted replacements + 11 asserted fix replacements, every one matched exactly once).
**Unpushed** — the sandbox has no git credentials; this file + zip are the delivery.

---

## 1 · THE DROPDOWN HOUSE (Owner: "review of all the dropdown menus… 0.50 neutral tones + Cinzel… spend considerable time")

A full inventory was taken first — every dropdown in the project, native and custom:

| Surface | Before | Now |
|---|---|---|
| Player browser · position dropdown | **checkboxes** per position | checkboxes retired — Cinzel row buttons on the panel wash; the chosen row is a lit wash + a small gold diamond (multi-select and Quick Groups behavior unchanged; "Clear all" kept) |
| Player browser · team dropdown | house popup | house popup + the chosen team now marked (lit wash + diamond) — same marks added to Draft-as-team, Pick number, both homepage compare dropdowns and both comparison dropdowns |
| Position Rankings · ranking dropdown | native select | house popup — Cinzel Decorative section heads (Offense · Positions… The Series), Cinzel rows, diamond on the open step |
| Draft board · position filter + sort | native selects | house popup, diamond on the current sort/filter |
| Preseason · Offense / Defense / Style (aggressiveness) | native selects | house popup, fill their labels |
| Weekly game plan · Personnel / Lean / Package / Focus | native selects | house popup |
| Depth chart & KR pickers (the zpb-pick menus) | plain white menu | house chrome — rosehair, panel gradient, soft shadow, Cinzel rows, sliding hover, diamond on the current player |
| Native `<option>` lists anywhere one still shows | default | Cinzel ink on the panel, 0.50 halfway ink (`--tTxM` / `--tTxMd` — the team's 0.50 neutral) |

The house popup for plain selects is pinned to its button (fixed positioning + scroll/resize re-pinning), so it escapes every scroll container; it closes on outside click, and never two popups at once. Intake note: the depth chart no longer uses native `<select>` elements at all in this lineage — its own picker component received the same treatment instead of the popup conversion.

## 2 · THE GUIDE — WHICH POSITIONS MATTER (Owner: accurate with the recalculated engine math)

- The guide's ranking bars now read the recalculated table: 1 QB 1000 · 2 DE1 675 · 3 WR1 630 · 4 DT1 520 · 5 OT1 495 · 6 CB1 415 · 7 OG1 395 · 8 WR2 390 · 9–13 MIKE/DE2/FS/DT2/SS 310 · 14 OT2 295 · 15 CB2 260 · 16–18 OG2/TE1/RB1 245 · **19 WILL 155 · 20 DL5 155** · 21 C 150 · 22 TE2 145 · 23–24 SAM/NICKEL 105 · 25–26 WR3/RB2 95 · 27–30 DIME/K/P/TE3 50 · 31 WR4 40 · 32 FB 25. Ties read the Owner's raw order (MIKE>DE2>FS>DT2>SS, OG2>TE1>RB1, WILL>DL5, SAM>CB3). **DL5 stands at 20 beside WILL**, as ordered.
- The rankings-page spot buttons show the same integers (verified in-browser: QB 1000, DE1 675, DL5 155, FB 25, all 32).
- The Series dropdown + the default series 7 follow the new order (QB + DE1 + WR1 + DT1 + OT1 + CB1 + OG1) and now run the full 1–32 (every slot has real value in the recalculated table; the old 26-step cap came from the old zero slots). A boot-order race (options built before the w87 block ran) is fixed by a rebuild-on-stale check — the seventh step is the tell.
- The engine itself is untouched per the Owner's carve-out — the engine-derived surfaces (the draft board's Wins/Priority columns, the Lab measured-weights chips) still read `slotWins`/`modelWeights` and will re-join the new table when Claude's engine change lands. The UI table lives in `ZPB_SLOTS_W` + `ZPB_SLOT_UI_ORDER` (one place, commented with every delta).

## 3 · THE GUIDE — THE SCARCITY CALLOUT (Owner: a line between sentence 1|2 and 2|3; the last two keep their spacing)

Now four blocks: the question, then "Because priority is about scarcity." with a line of air, then the edge-rushers sentence with a line of air, then the Wins/Priority pair keeping its own tight two-line spacing.

## 4 · THE GUIDE — THE BADGE LINE (Owner: remove)

"The same personnel can lean pass, lean run, or stay even." — the "· the badge shows the lean at a glance." tail is gone from the FOCUS card.

## 5 · THE FOUR WORDS (Owner: more aesthetic, dynamic, beautiful)

DRAFT → SEASON → PLAYOFFS → SUPER BOWL now march in one line: Cinzel Decorative, growing step by step (0.92 → 1.32rem) toward the Super Bowl, breathing diamonds between them, staggered slow fade-in on scroll (the same fade family as before, re-fading on re-entry), **SUPER BOWL wearing the one shimmer**. On phones it wraps to two lines with the crescendo intact. Reduced-motion honored.

## Verification (headless Chromium, zero console errors, zero view-failure panels)

- 28 script blocks pass `node --check`; style/script/details tags balanced (+1/+1/+0 vs w86; w86 carries one pre-existing benign literal `</script>` inside a string).
- Player browser: checkboxes 0, 22 position rows + 28 quick groups; selecting WR filters (61 rows), face reads "WR", diamond lit; dark mode reads clean.
- Position Rankings: boot state = series 7 new order, lit buttons QB/DE1/WR1/DT1/OT1/CB1/OG1 with 1000/675/630/520/495/415/395; picking "6 QB + DE1 + …" re-renders and relabels the face.
- Guide: march present with 4 steps; bars 1–32 exact (spot-checked DL5 20·155, WILL 19·155, NICKEL 105, DIME 50, FB 25); callout has the two airy lines; badge line absent.
- Draft flow: instant draft → preseason (coaching dropdowns converted, faces correct) → season roster (33 depth pickers, current player marked) → game-plan select conversion proven on a live-planted node.
- Mobile 390px: march wraps gracefully; popups pin inside the viewport.
- Screenshots: light + dark, desktop + mobile (`/tmp/w87shots/` in the sandbox, evidence names in the note).

## Not touched (by design, Owner's carve-outs)

- `DEFAULT_WEIGHTS`, `slotWins`, the flex table, the matchup model — the engine waits for Claude's replacement.
- The draft board's Wins/Priority/Gone columns and the Lab's measured-weights chips remain engine-derived (P-319: read from the engine, re-pin when the new measurement lands).
