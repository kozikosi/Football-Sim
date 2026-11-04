# W65 BUILD REPORT — the chain, the probes, the three late visual catches

## The chain (every step asserts the previous md5 + exact anchors + post-checks)

| Step | Script | Round | Delta |
|---|---|---|---|
| baseline | `Football-Sim-Z-post-blue-w64.html` | the w64 bytes from gh-pages | md5 `8b601f06ad2938960a636f53e709148d` · 1,716,179 B |
| 1 | `zpb_w65.py` | the direct replacements + the weight tables + the FLEX REV 4 + the comparison rebuild + the doors + the browser faces + the board bar + the footer flow + the pregame law | +23,646 B |
| 2 | `zpb_w65b.py` | the payloads: the universal BACK TO SEASON, the top doors, the restore chip, the comparison header panel, the 100-seasons door | (chain total +24,666 B after step 3) |
| 3 | `zpb_w65c.py` | the autosave envelope v2 (the draft pickRounds ride; w63-era saves restore) | |
| 4 | `zpb_w65d.py` | the restore fallback fix (a fresh reload has no `#draftResultsBody` — the restore no longer wipes the app shell) | |
| 5 | `zpb_w65e.py` | the comparison template's selects, the roster top door, the header doors' phase sync | |
| 6 | `zpb_w65f.py` | the depth zones' seen-gate beat (1s → 0.12s), the review cards, SIM SEASON off the big-ID law, the graphical hero badges | md5 `815462…` · 1,740,845 B |
| 7 | `zpb_w65g.py` | the sim-tabs host stops stretching, the hero2 class on the graphical hero, the badge row natively, the 90+ floor retired | 1,741,377 B |
| 8 | `zpb_w65h.py` | the w65 comment out of the template literal (it rendered as page text) | 1,741,378 B |
| 9 | `zpb_w65i.py` | `align-self:center` — the tall tabs stopped stretching SIM SEASON | md5 `948f789da6d3ccf064104212ec748f3a` · 1,741,540 B |

## The probes that found what the checks missed

- **H3 (the doors' size):** the first measurement [42,35] — the `zpb-simtabs` host (inline-flex) stretched SIM GAME to the 42px tab height while SIM SEASON sat at 35. Fix 1: `align-items:center` on the host. The next measurement [35,42] — with the leaked comment gone the row fit one line and the TALL TABS stretched SIM SEASON instead. Fix 2: `.tabs > .zpb-ctasmall{align-self:center}`. Final: [35,35].
- **L1 (the hero badges):** the step-6 patch landed on the graphical render100 — a probe proved the graphical one is what runs, but its hero carried only the `zpb-100hero` class, so the battery's `.zpb-100hero2` query was null. The class joined; the badge row (zpb100More) also gained the set natively and the step-e monkey-patch retired (it would have doubled two badges).
- **F1 (the depth speed):** the 15.4s tail delay was the 90+ escape-hatch beats (undrafted fillers) — w64's floor against the new 0.12s clock. The floor retired; the battery check now measures the cadence honestly (0.12s a beat vs the w64 1s law = 0.88s faster per row).
- **The Muse #4 path:** re-played exactly (draft as the Raiders → preseason): the heading read the Raiders and agreed with the roster panel and the season state. Not reproduced; evidence in the ledger.
- **The visual catches:** the step-8 comment leak (a `// w65` comment inside a template literal rendered as page text under the tab row and wrapped SIM SEASON onto its own line) — found by reading the screenshot, not by any check.

## The weight sync (de60e05, read from the architect branch)

- SLOTS: QB 1000 anchor · WR1 525 · DE1 520 · OT1 430 · CB1 430 · DT1 410 · DE2 405 · OT2 400 · CB2 340 · C 320 · WR2 295 · TE1 295 · OG1/OG2 290 · DT2 305 · CB3 280 · MIKE 265 · FS 265 · SS 265 · WILL 245 · RB1 235 · K 200 · WR3 180 · DL5 145 · P 100 · RB2 80 · TE2 60 · DIME 40 · FB 30 · SAM 35 · TE3 10 · WR4 10 (+ depth spots).
- RATING_SPECS.rec: WR2 .70 · WR3 .45 · PLAN_K.defPredict 0.15.
- Displayed: the Position Rankings buttons (wins over 70→90), the Guide tier viz + per-slot table, the MODEL preset (QB 700 · WR1 370 · TE1 205 …).
- NOT touched: the engine math (the Owner: "your actual engine and during the game screen don't have to function perfectly off these weights").

## The batteries — 205/205 on the shipped bytes

nodecheck 19 · round 59 · verify 13 · mobile 41 · live 7 · storage 7 · sweep 13 · cine 27 · owner 19.
