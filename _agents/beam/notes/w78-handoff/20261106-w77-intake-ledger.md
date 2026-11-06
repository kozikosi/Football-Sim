# W77 INTAKE LEDGER — the Owner's directives, itemized

**Source:** the Owner's message, received 2026-11-06 — "There was some confusion in the council about which weights you are using in the most current version of the engine… this is what I want to save as my permanent opinion on the weights that the engine should be built around." — riding no Muse briefing; the Owner speaking directly.
**Rule:** Owner's words are law verbatim.
**Base:** the latest wave with a product HTML on gh-pages, verified by listing = **w76** (`Football-Sim-Z-post-blue-w76.html` · md5 `4f363452a4ad33709244ca08d4ab3b00` · 1,830,164 B · live at 367d8e3e, hash re-verified from the branch this session before the first patch). The cutover freeze said "no w77 unless the Owner sends a UI fixes list" — **the Owner has now spent w77 himself**; the freeze lifts for this round only.

## The Owner's data (verbatim table, xM y z format)

> "The format of this list is xM y z where x is my approximately and very rounded salary (in Millions) for a slightly above average player at that position, y is the position, and z is the weight i am choosing to give the player and that I would like shown to the user."

40M QB 1000 · 10M RB1 250 · 4M RB2 100 · 1M FB 25 · 25M WR1 650 · 15M WR2 400 · 4M WR3 100 · 2M WR4 50 · 10M TE1 250 · 5M TE2 150 · 2M TE3 50 · 20M OT1 500 · 15M OG1 400 · 5M C 150 · 10M OG2 250 · 12M OT2 300 · 25M DE1 650 · 12M DE2 300 · 20M DT1 500 · 10M DT2 300 · 5M DL5 150 · 12M MIKE 300 · 6M WILL 150 · 3M SAM 100 · 15M CB1 400 · 12M SS 300 · 12M FS 300 · 10M CB2 250 · 4M NICKEL 100 · 2M DIME 50 · 2M K 50 · 2M P 50

**Slot-name mapping (the shell's keys):** NICKEL → `CB3` (the label law already renders NICKEL), DIME → `CB4`. All 32 priced slots exist in the shell.

## Product asks

| # | Owner's words (verbatim) | My action |
|---|---|---|
| W1 | "The salary data should be saved internally as refernce but should never be displayed to the user on the app." | The salaries + the full verbatim table are saved in this ledger and in `notes/W77-WEIGHTS-OPINION.md` (the permanent-opinion doc, with a machine-readable block for Claude's engine calibration). **Nothing salary-shaped is written into the product HTML** — not even a comment — so "never displayed to the user" is literally true (view-source included). The app carries the WEIGHTS only. |
| W2 | "The weights on the right should be the default values for the model weights on the Madden Rankings page." | `ZPB_SLOTS_W` (the site's displayed weight table, w65) is replaced by the Owner's 32 values (+ the three unpriced shell depth slots held at 10). `modelWeights()` now returns the table 1:1 — **no 700 rescale** — so the MODEL preset, the boot state of the Madden Rankings page, the Position Rankings series select and the lineup editor's group weighting all ride the Owner's numbers. The weight inputs' ceiling rises 700 → 1000 (the badge title, the max attribute and both clamps) so QB 1000 fits and types back exactly. |
| W3 | "The Guide page should rerank the players by importance by WINS. You will need to calculate the WINS values for the Guide chart yourself." | The Guide's tier viz and the one-row-per-spot slot table recompute from the Owner's table through the site's standing conversion (1 unit = 0.00254 wins over a 70→90 upgrade, the w65 law — unchanged): **QB 2.54 · WR1 1.65 · DE1 1.65 · OT1 1.27 · DT1 1.27 · WR2/OG1/CB1 1.02 · the 300s 0.76 · the 250s 0.64 · the 150s 0.38 · the 100s 0.25 · the 50s 0.13 · FB 0.06**. Both charts re-sort automatically → the rerank is the Owner's own order. The two Guide sentences that described the old defender ordering are re-worded to describe HIS order, and the stale REWEIGHT-BRIEF pointer retires. The full calculation is printed in the build report. |
| W4 | "When Claude builds the engine, try to land the slotWinsPerOvr revealed impact somewhere around these values but Claude has a plus or minus 50 room for deviation." | Claude's lane, not this wave. The opinion doc carries the table in engine-ready form (slot → integer weight, QB=1000 anchor, ±50 tolerance noted) so the 76 Pancakes engine can calibrate against it. No engine code changed here. |
| W5 | "If you can change the coefficients easily in w76, then go ahead. But I'm more concerned with you adjust the UI/UX to represent this data on the w77 even if the game doesn't fully use this math." | The shell's coefficients ARE the display table — changed (W2). The sim's internal `slotWins` math is **measured off the matchup model at boot, not a coefficient table** — there is nothing easy to flip without re-engineering the model, so the engine keeps its own math (exactly the Owner's "even if the game doesn't fully use this math"). The draft board's per-player WINS column therefore still reads the engine's own measured truth; the Guide's charts read the Owner's table. One honest Guide line says the two scales coexist until the engine lands. **w76 itself is untouched** — the frozen reference stands; everything lands in w77, built from the w76 bytes. |
| W6 | "I don't think you have FB or Punters implemented at all in your game math if i remember correctly and that's fine." | Noted, no action: the shell's display table has modeled FB and P rows (FB 25, P 50 under your table); the sim's internal math treats them lightly. Your values are shown either way. |

## Interpretation flags (veto points)

1. **The three unpriced slots.** The shell carries SS2 (Big Nickel), FS2 (Quarter) and LB4 — the Owner's 32-line list does not price them. They are held at **10** (below his DIME at 50, in line with the previous table's depth treatment, "extra depth spots stay tiny"). Say the word and they move.
2. **Salaries stay out of the HTML entirely** (W1) — saved in the lane docs only. If the Owner meant "embedded in the app's internal data but never rendered", say the word and a commented constant goes in.
3. **The WINS conversion is the standing 0.00254** (w65's law, 1 unit = 0.00254 wins per 70→90) — the Owner's weights ride it unchanged, so QB = 2.54 wins. If he wants a different WINS unit for the Guide (e.g., per-season wins above average), say the word.
4. **"The weights on the right"** is read as the z column (the rightmost value in each "xM y z" line) — the weight shown to the user, which is also the MODEL preset default. The salary x stays internal.
5. **The draft board's per-player WINS column still reads the engine**, not the table (W5). The Guide tier viz + slot table + the Position Rankings button values read the table. If the board should wear the Owner's numbers too, that is a one-line change — say the word.
6. **The MODEL preset button now restores the Owner's table exactly** (no more rounding to 5s on the 700 scale). SAVE MY WEIGHTS / MY WEIGHTS behavior unchanged.
7. **The cumulative SERIES rides the Owner's order.** The Position Rankings series dropdown (`zpbSeriesData`) and the rankings-page series select steps (`zpbSeriesSteps`, P and FB stay outside it — the W13-1 law unchanged) ranked by the engine's slot-wins order; they now rank by the Owner's table, because the w65 law already puts the Position Rankings surfaces on the display table and the steps sit on the same dropdown rows as the Owner-valued buttons. Say the word and the series returns to the engine order.
8. **TE3 (50) applies but has no badge.** The weights panel's group layout predates TE3 — his weight participates in every calculation (the total reads 8605 = your 32 priced slots + the three unpriced at 10) but no badge renders to edit him. Pre-existing shape, untouched this wave; say the word and TE3 joins the Quarterback & Skill Positions group.

## Non-product track

| # | Item | Disposition |
|---|---|---|
| N1 | The Owner's "permanent opinion" storage | This ledger + `notes/W77-WEIGHTS-OPINION.md` travel in the zip; Beam can import them to `_agents/zai/` on `council/zai`. |
| N2 | The five flags from the cutover chat (veto (b), twin header, casing, SEASON RATING, explainer home) | Still awaiting the Owner's call — untouched this wave; nothing in this message overrules them. |
| N3 | "Feel free to run tests but don't spend too much time on testing." | The w76 battery re-pointed at w77 (84 assertions) + the four standing suites + a new V77 block (the Owner-table assertions — every new surface ships with an assertion). One pass each; no sweep marathons. |
