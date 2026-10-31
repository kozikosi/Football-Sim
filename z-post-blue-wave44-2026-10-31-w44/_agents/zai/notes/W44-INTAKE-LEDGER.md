# W44 INTAKE LEDGER — the Owner's round-44 message, verbatim mapping

Owner message received 2026-10-31 (chat) · every line below is his law. Base: the w43 bytes —
`Football-Sim-Z-post-blue-w43.html` · md5 `53ce9def9db948991e8974c76824e0f6` · 1,509,529 B.
His reminder sets the wave: "the last version you sent me was w43 and you are now working on w44".
Standing law from the same message: "always speak directly to me in English".

| # | Item (his words rule) | Where it lands | Interpretation / flag |
|---|---|---|---|
| K0 | "Great job implementing the gold. Keep it." · "Good job on the superbowl champions cinematic. Don't change a thing." | GUARDS, not edits: the w44 live suite re-asserts the SB cinematic (opaque at mount, the champion's `--zshim`) and the constant-gold law stays untouched. | — |
| O1 | "the other colors in light mode are still too cartoonish. They are too vivid. You need to find a balance between these vivid colors and the neutral tone with the tint in the dark mode… The player browser is a great place to test… a tone for the color of the names halfway between the natural but tinted tone of the team names in the dark mode and the too vividly crayola cartoonish colorful way the teams names are written in light mode." | The pack's `txM` is rebuilt as the HALFWAY INK: `mix('#53382b', crayolaAnchor, 0.5)` where the anchor is the w43 crayola tone (txL lifted to L 0.52); the mix is clamped (chroma floor 0.22 so pale brands never go gray, L kept in 0.30–0.52 so nothing washes out or fails contrast). Light reads it everywhere the tokens reach (dropdown, browser, rankings, comparison, board, standings, schedule, score-lines, honors, preview). DARK keeps `txd` untouched. A tone study ran the ratio at 0.42/0.50/0.58 across all 32 franchises with chroma measured against the geometric mean of the dark and crayola tones — 0.50 landed on the halfway line and won the eye test; one number moves it on his word. | §veto 1 |
| O2 | "This applies to the pro-bowl and all-pro players as well. Please remove the crayola vividness in light mode." | The Pro Bowl / All-Pro placements ride the same row tokens (`zpbNeutralRowVars` → `--nm/--tn = txM`), so O1 covers them automatically; the live suite asserts their computed inks equal the halfway formula. | — |
| O3 | "if those players that made the all-pro first team should be gold everywhere there name is listed again, including their pro-bowl placement." | The FIRST-TEAM GOLD REGISTER: `computeRegularSeasonAwards` publishes `ap1Names`; the ACTIVE card renderers consume it — the regular awards page (First-Team box already shimmered; now the individual award cards, the statistical-champion cards and the PRO BOWL placements check the register), the playoff awards page (round/leader cards and the All-Playoff chips), the season story's honor cards (`gold` flag → `zpb-shm`), the rest-day HONORS EARNED overlay (AP1 + their PRO BOWL cards), and `honorLineHTML` (the table renderer; the user's own AP1 names keep their border, now gold). The shimmer stays the constant gold (`--zshim` root law) — his exact gold. | §veto 2 |
| O4 | "The playoff intro to the Wildcard is still a little too slow." | `INTRO_MS` for playoff rounds 36,000 → 22,000 ms (−39%); the star-pair pacing derives from it (gaps ≈5.1s), the Super Bowl keeps its 60s. Live drill: first play line lands ≈23.5s, was ~36s. | §veto 3 |
| O5 | "You also glitched and let the user know the result of the game when the second key player's name appears. Please no confetti and congratulations for winning until the end of the game." | ROOT CAUSE: the w37 FX safety timer drained the queued celebration at 15 s unconditionally — mid-wildcard-intro, right as the second star pair lands (beats at ~2.2 s / ~14 s under the 36 s pacing). Now the safety RE-ARMS (6 s) while a cinematic overlay is on screen and drains only when the stage is clear — the whistle and the Continue buttons still drain it. Live drill: a queued big reward survives 16.5 s with a replay up, zero toasts/canvas; drains on the whistle. | — |
| O6 | "Remove this text:'// w43 (N9, Owner): each side's score wears its own team's color, both themes?' Playoff game review screen." | The w43 note had been written INSIDE the review's template literal — it printed as literal page text. Removed from the string; the note now lives as a real JS comment outside the template. | — |
| O7 | "Write \"RUSH/PASS:\" as \"Rush / Pass\"" | The Team Stats row label reads `Rush / Pass`. | — |
| O9 | "The where your players line up? Now goes way too fast. A half a second per player please." | The look-gate's belong-map reveal: `var(--beat,0)*0.15s` → `*0.5s` (the w42 I5 compression retires). The draft-board cards keep their own 0.15s cadence (not named by him). Live drill: beats 1/2/4 land at 0.5s/1s/2s. | — |
| O10 | "On the during the game screen, the nonuser's team score at the top is till labeled in the user's color. Please correct. The score of the nonuser team should be in that nonuser's team's respective color." | ROOT CAUSE (found live, light mode only): the replay's old `.zpb-replay b,.zpb-replay span,.zpb-replay div{color:inherit}` law (specificity 0,1,1) out-ranked the w43 single-class score rules `.zpb-slsc-aw/hm` (0,1,0) — dark only won on the `:root[data-theme]` lift (0,3,0). The `zpb-w44-css` block adds `.zpb-replay span.zpb-slsc-aw/hm` (0,2,1) in both themes. Live: the away score reads the away pack, the home score the home pack, light AND dark. | — |

## §veto — interpretations awaiting the Owner's ruling

1. **The halfway point (O1/O2).** "Halfway" = a 50/50 RGB mix between the page's own warm ink
   (`#53382b`) and each team's crayola anchor (the w43 tone), chroma-floored at 0.22 and kept
   between L 0.30–0.52. Measured chroma lands between the dark tint and the crayola for all 32
   teams (e.g. KC `#9e2d36` brick, GB `#4f7b67` forest, DET `#2f7195` steel, SF `#a9211b`
   scarlet). If he wants it warmer toward vivid or toward neutral, the single `0.5` in
   `zpbPackFor` moves the whole site.
2. **"Everywhere their name is listed" (O3).** Read as the honors surfaces: the awards page
   (award cards, statistical champions, All-Pro chips, Pro Bowl placements), the playoff awards
   cards and All-Playoff chips, the season story's honor cards, the rest-day HONORS EARNED
   overlay. Per-play surfaces (during-game lines, lineup tables) keep the team-ink law — gold
   there would fight the per-team score colors he ordered in w43.
3. **"A little too slow" (O4).** 36s → 22s. The star pairs, the flash and the hand-off to the
   plays all scale from the one constant; the Super Bowl pregame keeps its 60s (his "don't
   change a thing" covers the champions cinematic, and the SB game intro keeps its gravity).
