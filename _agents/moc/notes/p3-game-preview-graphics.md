# P3 · The game preview, rebuilt as graphics — the block-by-block spec

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P3 item 3 — the game preview screen | DATE: 2026-10-22T06:30:00Z**

**A proposal, in the §6 sense**, on the seven components from `_agents/moc/notes/p3-shared-visual-system.md` (M-20261022-b). The Architect owns the product file; this is a change set.

## 1 · The screen, in order, with the shape each block takes

| # | the block today | becomes | the data it needs | the one line it says |
|---|---|---|---|---|
| 1 | the opening — *"Opening day has a way of making everyone feel like a contender. The Chiefs visit the Vikings to open the season, one team built around its run defense, the other around its secondary."* | the **team names with their units attached** — "run defense **(Chiefs)**" and "secondary **(Vikings)**" — so the reader never has to guess whose unit is meant | the two unit names and their owners | the one hype line |
| 2 | *"The individual stories may matter as much as the team ones. Under center it is Matthew Stafford (99) against Geno Smith (74). All eyes will be on Matthew Stafford (QB, 99) and Christian Gonzalez (CB1, 98), the players each defense has to game-plan around."* | **one line, and it names the matchup**: *"Under center for the Chiefs is Matthew Stafford (99) against the Vikings' Geno Smith (74)."* The "all eyes will be on" sentence **goes**: a cornerback does not draw the opposing defence's plan, so the sentence is not just clumsy — it is wrong | the two quarterbacks and their teams | one line |
| 3 | the matchup paragraph — *"Here is where it could be decided: the Chiefs' quarterback play (#2) against the Vikings' secondary (#2). Against an average team the first is worth roughly +2.3 points a game, so whichever side flinches loses ground. The Vikings' secondary (#2) is a real weapon here — roughly +2.2 points a game compared with an average team — and the Chiefs' receiving corps (#19) is poorly equipped to beat it."* | **two `.bar-row`s** — the Chiefs' QB play and the Vikings' secondary, each with its value and its rank — and the sentence **"so whichever side flinches loses ground"** becomes the one line that says what it means. **Every "+x points a game" phrase goes** | the two unit values, ranks and owners | one line |
| 4 | *"The ratings lean the Chiefs by about 9.7 points (26.6–16.8), which is the kind of margin January loves to erase. The favorite has everything to lose, the underdog nothing — and that is exactly how upsets are born."* | **the number stays — "+9.7 points"** — and becomes a **`.stat-card`**: the value, the two team figures beneath it, and the one sentence of colour | the margin and the two projected scores | one line |
| 5 | the **plans block** — *"The Chiefs are a balanced offense with two tight ends team by nature, and the model expects 12 personnel, run-heavy this week — as the favorite they would rather shorten the game and protect the football and the pair of tight ends (Dallas Goedert 89 and Evan Engram 78) can do the job. The Vikings are… Defensively, expect the Chiefs in Nickel (a nickel defense focused on the pass) and the Vikings in Nickel · pass-defense (a nickel defense focused on the pass)."* | **two `.stat-card`s, one per team** — the personnel, the lean, and the two names on the line — **smaller**, the Owner's *"make a little smaller and a lot more beautiful"*. The defensive packages read **"Nickel · Pass Protection"**, **"Nickel · Run Defense"** or just **"Nickel"**, and **every long parenthetical goes** | the plan text per team, the personnel, the lean, the package and its focus | nothing |
| 6 | — | **the lineups sit directly below the plans**, as the Owner's order says: plan → lineups → matchup → scouting report | the two lineups | nothing |
| 7 | the matchup and the opponent scouting report | stay, in that order, as **two `.section-head` blocks** | the matchup and the scouting text | what they already say |
| 8 | the em-dashes throughout | **periods** — *"…protect the football and the pair of tight ends can do the job."* | – | – |

## 2 · The two rules that make it correct

- **"Say which team is which"** is a **data** rule, not a copy rule: the unit names must carry their owner, so "run defense **(Chiefs)**" and "secondary **(Vikings)**" are facts the builder must have, not adjectives the writer must add.
- **The overall line stays a number** and the per-unit "+x points a game" sentences go. The preview is a page of numbers; the sentences that remain are the opening hype, the matchup line, and the margin's one line of colour.

## 3 · The motion

The two team cards **arrive together** (one thing at a time — the pair is one idea), the matchup bars **after** them, and the margin card **last**, with the number counting up. Under `prefers-reduced-motion: reduce`: no stagger, no count-up — the page simply appears.

## 4 · Where it attaches

**The copy changes are already written out** in the work order (**P10-5, the game preview**), and they are meant to be applied **verbatim** — so this proposal does not restate them; it says what each becomes on the screen.

**Not verified by me — the implementing seat supplies the line:** the preview builder (the function that assembles the opening, the matchup and the plans), the plans block's renderer, the lineup table's renderer, and the CSS the preview text inherits. I have not opened the preview's builder in this session, and a line number is a hint, not an address. The **data** it needs — the two unit values and ranks, the projected scores, the personnel, the lean, the package and its focus — comes from the same matchup model the review uses (`matchupModel`, `teamRatings`, `ensureGamePlans`), which I have read.

**What I did not do:** I did not build a prototype, take a screenshot, or run the gate on a preview change — the Architect applies it and the gate runs on the built candidate.
