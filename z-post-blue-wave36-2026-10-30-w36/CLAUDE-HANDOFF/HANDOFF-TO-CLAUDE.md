# HANDOFF TO CLAUDE — the Z-post-blue UI/UX shell, for the V23 engine swap

FROM: Z.ai (High Councillor, seat ZAI) · 2026-10-29 · wave 32 just shipped
FOR: Claude/Architect — "V23 as w30's UI on my engine" (your words, Owner-approved)

This document is everything you need to put your math engine inside the shell I built,
without breaking a single one of the Owner's laws. Read §1 and §3 at minimum; §2 is the
full directive history if you want to know WHY any panel looks the way it does.

---

## §0 · Version truth (which file is the shell)

| Build | md5 (first 8) | Bytes | Where |
|---|---|---|---|
| w30 — last Owner-pushed | `8d8e1a4b` | 1,367,386 | `council/zai` @ `z-post-blue-wave30-2026-10-28-w30/` |
| w31 — delivered via chat zip | (Owner holds it) | — | not in this sandbox; GitHub never received it |
| **w32 — current product** | `cdf1abd9` | 1,398,983 | this handoff's zip · `Football-Sim-Z-post-blue-w32.html` |

w32 = w30 + the full round-31 directive list (re-landed; the w31 zip never reached my sandbox,
so I rebuilt it from the Owner's verbatim list) + the full round-32 list. Verified: jsdom suite
97/97, season stress 20/20, zero console errors. The Owner has NOT yet played w32 — expect a
round-33 critique list; treat w32 as the newest shell until he says otherwise.

Single file, no build step, no dependencies. The engine and the UI live in one `<script>` block
(plus ordered payload blocks: w13 → w27 → w29 → w30 → w32; later blocks re-bind earlier
`function` declarations — the LAST definition wins at parse time).

---

## §1 · THE LAWS (break any of these and the Owner will bounce the build)

### The ten commandments (from STYLE-GUIDE-Z-POST-BLUE.md — keep them all)
1. **No white text. Anywhere. Ever.** Light text = a tint of the active team palette. No `#fff`,
   no near-white (`#fff8e1`, `#fffde7` are violations too — Beam flagged these).
2. **Integers only.** Every number on screen is an integer. **The one exception: PRTG**
   (passer rating keeps its decimal, e.g. 105.4). Internal math may float; round at render.
3. **The team palette drives everything.** Three brand colors per team cascade into every
   panel, chip, border, score, dropdown. Scores render in each team's own color. Never
   introduce greens/blues/purples that belong to no team. (Anchor chips are PINK as of w32.)
4. **One shimmer.** The shimmer sweep (`zpb-shm`) is the universal "this is special" signal:
   90+ player names, Player of the Game, "YOU WON", #1 seeds. **85+ names are BOLD** (`zpb-vib`),
   not shimmering. Everything else neutral. All in team colors.
5. **Cinzel Decorative is the display voice.** Headings, hero wordmarks, cinematic lines.
   Game previews are entirely Cinzel Decorative.
6. **Motion is slow, soft, faded.** Fade cycles ~4.2 s. Cinematic pacing: 5 s regular intro,
   30 s playoffs, 60 s Super Bowl. Nothing abrupt.
7. **Graphical beats tabular.** Cards, bars, badges, bubbles. If a table is unavoidable:
   integer, palette-colored, compact.
8. **Labels are the Owner's exact words.** Do not "improve" his names.
9. **Explanations live in the Guide**, not inline. No methodology paragraphs next to panels.
10. **Layout is floaty, mirrored, cinematic.** Right team's accent sits on the RIGHT edge.

### The label law (verbatim — w28/w30/w32 rulings)
| Write | Never |
|---|---|
| `SK` | `SKS`, `SK A` |
| `PRSS` | `PRSS A` |
| `CAR` | `C` |
| `TD` (defensive scores too) | `DEF TD`, `Def TD` |
| `CLUTCH GAMES` | `IN DA CLUTCH` |
| `RUSHER WON` (caps) | `Rusher won` |
| `NICKEL`, `DIME` (always caps, everywhere) | `Nickel`, `Dime` |
| `DL5` | `Elephant`, `/ Elephant`, `/DL` |
| `PRTG` (badge guide, passer rating) | `20-0` in that slot |
| `@` (during-game away games) | `AT`, ` at ` |
| `PRTG` badge = passer rating | decimals anywhere else |

### The during-game play language (w19→w32, exact)
- Every score type is a **boxed chip** in the color of the team it benefits:
  `[TD]` `[FG]` `[INT]` `[FF]` `[FR]` `[SAF]` `[FUM]`; yardage reads `12Y`.
- TD lines: pass = `QB to WR [TD] 12Y` · rush = `RB rush [TD] 12Y`.
- **Fumble chains (Owner, w32):** forced + recovered + scored by different men on one play:
  `x [FF] y [FR][TD]` (x = forcer, y = recoverer/scorer). Same man does all three:
  `z [FUM] x [FF][FR][TD]` (z = the player who fumbled, x = forcer/recoverer/scorer).
  The engine must therefore record, per defensive score: `type`, `name` (scorer),
  `from` (ball loser), `forcer`, `sameMan` — that is what the UI reads.
- Safeties: `x [SAF] y` (x = the defender, y = the player tackled). A safety is never solo —
  a second defender is always in on it (w28).
- No nameless fallback lines. Ever. Pad queues from the box score if records come up short.
- Every quarter shows its card even if nothing happened; 1 s dwell per card (w30).

### The name-tier law (audit constantly)
90+ name shimmers · 85+ name bold · everyone else neutral — **in their respective team
colors, on every surface**: browser, rankings, depth charts, lineup comparison, preview
cards, season badges, honors, draft board, during-game. The Owner re-audits this every wave.

### Structural names the Owner personally set (do not rename)
`20-0` (the product identity and the chase), `Can you go 20-0?`, `↶ Undo`, `SIM PLAYOFFS`,
`Play the x`, `TRY AGAIN TO GO 20-0?` (now a 3-option modal), `THE SEASON IN BADGES`,
`UNIT REPORT CARD`, `WHERE YOUR PLAYERS LINE UP?`, `DRAFT PICK GRADES`, `CLUTCH GAMES`,
`YOUR FULL DEPTH CHART`, personnel `10 / 11 / 12 / 13 / 21 / 22` badges in `X Y` line format
(`RB x` / `TE y` / `WR z`), `≡` for balanced focus (the three bars are retired).

---

## §2 · The directive history in one page (waves 1 → 32)

Waves 1–13 built and refined the base app (draft board, season, playoffs, guide, badges,
cinematics, series, 100-seasons, weights). Waves 14–30 (each wave = one Owner round, one zip):

- **w14–w17** — homepage stage ("20-0" identity, panel-free home, guide reveal on scroll),
  full team re-tint, draft board colors, the Guide's field map + flex chips, DIME station.
- **w18** — Team Comparison rebuild (dropdowns in the header, thin panels, mirrored accents),
  Guide "WHERE THEY LINE UP" (WRs on the LOS, CBs wider, NICKEL, DIME deep), DEFENSE panel
  (DL squares / LB triangles / DB circles, five named colors).
- **w19** — draft board priority/gone from first render, natural-position-first fills, homepage
  selects, comparison/position-rankings/Madden pass, during-game badge language, THE SEASON IN
  BADGES cinematic (one beat per badge, then the veil, CONTINUE releases the page).
- **w20** — Position Rankings rebuild: dropdown gone, spot toggle buttons, THE SERIES presets,
  blank spots show nothing, primary-position badges.
- **w24/w25/w26** — no emojis (standing law), Brave SETBACK root fixes (adj-spec cache,
  weights panel ordering, shimmer fallbacks), comparison dropdowns, guide flex re-order,
  defense kit, draft group chips with ALL/CLEAR, 3-4 relabeling, player browser team colors,
  tier-law sweep.
- **w27** — 30-directive pass: both SETBACKs fixed at root with forced-fault tests.
- **w28** — during-game language (CAR, SK, SAFETY victims), season stat chips, honors,
  `Try AGAIN TO GO 20-0?` top-right.
- **w29** — one shared field map (offense on top, defense mirrored below, CBs across WRs,
  nickel + dime in the slot), coaching cards from the defense kit, draft-board rewrites with
  boxed [WINS], CPU DRAFT STRATEGY + UNDO panels, undo once per round, comparison backing
  panels (85+ highlighted border).
- **w30** — sage-teal anchor chips, 85+ bold everywhere, AGI/COD/INJ/AWR removed (six-column
  browser), series default 7, full team names in comparison at every width, CBs pressing at the
  LOS, DIME at the nickel's spot, X.Y in Cinzel unbolded, DIME standard depth row, TE3/WR4/DL5
  display slots everywhere, quarter cards unconditional, team-colored play-by-play, `X [FF] Y`,
  pick-six `X [INT][TD] Y`, `X [SAF] Y`, CAR never C, never SKS, dropdown titles caps,
  shuffled schedule (divisional home+away), SIM GAME button.
- **w31 (rebuilt inside w32)** — see the round-31 list in the Owner's message: streak cinematic
  at game end, kicker ratings damped, personnel wall centered + `10`, DIME card into Coaching,
  Guide defense panel removed, PRTG badge, full player-panel wall, footer theme button below,
  ResizeObserver cure, SIM SEASON confirm gate, Chargers light-mode contrast, preview lineup
  tier law, WHY THESE PLANS removed, two-line game reports, integers everywhere, lineup
  dropdown OVRs, KR/PR display law, depth chart layout (ST horizontal beneath), NICKEL/DIME
  caps, badges at season end, pick-grade table, light-mode tint lifts, award highlights,
  DEF TD→TD, returner sort, 3-option try-again, fumble chains, [TD] boxes, @ law, preview caps.
- **w32 (current)** — pink anchor, pinker homepage, browser centering, mobile sweep + swipe
  strips, position rankings no-scroll, comparison right-alignment kept, ELEPHANT removed,
  field-map swap (nickel↔DE, dime on the nickel's row), coaching sentence removed, `≡` glyph,
  draft-board callout rewrite, DIME/OLB1 ordering in the 3-4, single-click flex dropdown,
  map→card hover light, WHERE YOUR PLAYERS LINE UP?, breakdown reorder, SEASON OPENER +
  rivalry phrase generator (28 phrases, one per game, no period after feud), UNIT REPORT CARD
  letter-grade badges, champion wordmark banner, QB-25 draft rule.

**Standing rule for you:** the Owner's words are law verbatim. When his words and elegance
disagree, his words win. Interpretations get flagged for veto, never hidden.

---

## §3 · THE SEAM — where the UI calls the math (your integration surface)

The engine is already a fairly clean block: the big first `<script>` holds all math with
**no DOM calls inside the compute functions**. The UI reads its OUTPUTS. If you swap in your
engine block, keep these contracts:

### Contracts the UI depends on (keep the shapes, swap the math)
1. **`simulateGame(homeSM, awaySM, isPlayoff, lg, plans)`** → `{ homeScore, awayScore,
   homeEvents[], awayEvents[], homeStats, awayStats, proj, exp, ot }`. Events: `{q, t, pts, type}`
   with `type ∈ TD|FG|SAF|TO` — the replay renderer sorts by `(q, t)` and drives off these.
2. **`g.detail` (buildGameDetail → buildOffenseDetail/buildDefenseDetail)** → per side:
   `players[]` (`name, slot, group, ovr, st{...}` — the stat keys feed `seasonStatLine`),
   `takeaways[]` (`{type:'INT'|'FUM', q, name, from, recoveredBy}`), `defScores[]`
   (`{type, name, from, forcer, sameMan}` — w32 added forcer/sameMan for the fumble chains),
   `safeties[]` (`{n1, v}`), `mvp`, `tdScorers`.
3. **`teamRatings(slotmap)`** → the nine unit ratings `{olRun, olPass, rb, qb, rec, passRush,
   frontRun, coverage, kicker}`. The WHOLE app speaks in these nine numbers (previews, reviews,
   comparisons, the unit report card). Whatever your engine computes internally, expose these
   nine (or map your units onto them) — every panel reads them.
4. **`matchupModel(O0, D0, lg, plan)`** → `{structPts, sd, swings[]}` — the deterministic
   core; the game-plan UI (`planFxLive`, plan cards, `unitValuePerPoint`) re-runs it live.
5. **Wins-value family** — `slotWins(slot, ovr)`, `slotWinsTable()`, `effOvr(player, slot)`,
   `flexPenaltyFor(pos, slot)`, `isNaturalSlot`, `playerWar`, `winsAt`, `lineupWins`,
   `optimalLineup`. The draft board, priority/gone math, lineup advice, pick grades and the
   `W` chips all run on these. Your `tools/mathlab` equivalents must land here or behind here.
6. **`ensureRatings()`** — season player ratings from z-scores (`RATING_WEIGHTS`) + `roleBonus`.
   w32 compressed the kicker curve: `K → 56 + (rating−50)×0.42` clamped `[40, 82]` — the Owner
   flagged kickers rating too high. Keep that dampening (or better, fix the underlying weight).
7. **Season scaffolding** — `computeStandings`, `computeSeeding`, `buildWildCardRound/
   buildDivisionalRound/buildConfChampRound/buildSuperBowl`, `playGame`, `simulateCurrentWeek`,
   `advanceWeek`, `simulatePlayoffRound`, `startPlayoffs`. The UI phase machine reads
   `seasonState.phase ∈ preseason|regular|regularReview|playoffs|complete`.
8. **CPU draft** — `cpuPick(teamIndex, st)` + `executePick` + `startDraft2/processUntilUserTurn/
   simToEnd`. w32 law inside cpuPick: **a team may not draft a second QB before round 25**
   (the Brock Purdy RB1 exploit). Keep the round-1/2/3 ovr floors and the "some front offices
   miss" realism.
9. **`modelWeights()` / `computeScore(team)`** — the Madden Rankings page. Weights are
   integers ≤ 1000 ending in 0 (REWEIGHT-BRIEF), QB anchored at 1000, FB/Punter carry real
   modeled wins (§7b) — no display-only special cases.
10. **Awards** — `honorCandidates` (`HONOR_COUNTS`, `HONOR_ORDER`), `computeRegularSeasonAwards`,
    `computePlayoffAwards`. Returners sort by rating (w32). All-Pro/Pro-Bowl selectors feed the
    honor cards and the Owner's "my players must be visually obvious" law.

### Randomness (your seeded-rng pass)
**61 `Math.random()` call sites** (60 in the main block). They live in: `poisson`, `randNormal/
gaussNoise` (per-play jitter), `splitAmong` (yardage shares), `buildDefenseDetail` (weightedPick
for sack/FF/INT credit, fumble recoveries, safeties), `makeScoringEvents`, the plan samplers
(`samplePlans`, `choosePlans`), CPU noise/miss (`cpuNoise`, `cpuMiss`), and a few narrative
`pick([...])` calls. Your seeded `rng()` should thread through ALL of them — that is exactly
your step 2, and the UI does not care as long as the outputs keep their shapes. The cinematic
yardage is already deterministic-by-hash (`zpbCineYds`) so replays never contradict the score.

### What the UI owns (you never touch)
All CSS payloads, the DOM ids/classes, the renderers (`render*`), the cinematic timing, the
badge/stagger system (`data-beat`), the veil, the prematch cinematics, the pick lists, the
swipe wiring, the guide, the footer. **If your engine rename touches a display string, stop —
check §1's label law first.**

---

## §4 · Soft spots (things that have bitten before — verify after your swap)

1. **Payload override order.** w13/w27/w29/w30/w32 script blocks re-bind functions. If your
   engine pass rewrites the main block, make sure the payloads' overrides still target the
   right functions — or consolidate the payloads INTO the main block in one wave (their CSS
   must stay ordered: later rules win).
2. **Swallowed exceptions** (Beam's critique, verified real): draft deadlocks and missing tabs
   came from silent `try/catch` around `renderDraftLive`/`setActiveTab`. Don't add new silent
   catches; log and paint a visible SETBACK note instead.
3. **`simRecs()` runs the CPU forward 12× per board render** — memoize by `draftSim.pos`
   (Beam). Cheap win, do it in your pass.
4. **TDZ traps:** `ROSTER_SLOTS` is a `const` declared AFTER some earlier code —
   `zpbEnsureSeriesOptions` is deferred via `setTimeout(...,0)`. `window._zpbAdjCache` must
   exist before the first 3-4 lookup (the w27 Brave fix).
5. **ResizeObserver loop notices** are benign browser chatter — w32 rAF-debounces the observer
   AND filters the message from the setback handler. Keep both halves.
6. **The integer law is enforced at render time**, not in the engine — if your engine emits
   floats into strings directly, the UI will show them. Route numbers through `Math.round`
   at the last moment. PRTG is the only decimal (the season/QB RTG chip and the badge guide).
7. **Tooling artifact warning (for ANY seat driving this codebase through a chat tool):** the
   chat display layer can DROP `[x` substrings when echoing file bytes (I verified
   `F.st[marquee.opp].wins` rendering as `F.starquee.opp].wins`). Never patch from displayed
   text — byte-verify every old-string with node before asserting. Three false "syntax errors"
   cost me real time this session.
8. **`document.querySelector('.zpb-replay-ov')` guards** assume one replay at a time; the SIM
   SEASON loop suppresses replays via `window.__zpbSilent`. Keep that flag contract if you
   restructure the week-sim flow.
9. **The season story stagger** (`data-beat` × 1 s + veil after total+1.2 s) is Owner-blessed;
   at season end it must play automatically (w32 wires it into `renderSeasonCompleteView`),
   and the rest-summary box must be class-set BEFORE first paint (the flash bug).
10. **`zpbOrderSlots`** — in the 3-4 the def depth list reorders to `DE1, DT1, DE2, DL5, DT2
    (OLB1), MIKE (ILB1), WILL, SAM, CB1, CB2, FS, SS, CB3`. Display-only; the slot KEYS never
    change (your math can stay in 4-3 keys and just read `window.ZPB34`).

---

## §5 · Verify protocol (the Owner checks these every wave)

- Headless: jsdom suite asserting every directive + zero console errors (w32_verify.js ships
  in the zip — 97 checks). Season stress: draft → 17 weeks → review → playoffs → complete
  (w32_stress.js — 20 checks).
- Evidence screenshots at desktop + 390 px mobile (no horizontal scroll anywhere).
- Every number on every panel: integer. Every name: tier law. Every label: §1's table.
- Ship: one zip, md5 stated, CHECKSUMS.txt verified, `unzip -t` clean.

## §6 · What I would do first in your seat (opinion, not law)

1. Diff w32 against Pre-Colors purely to enumerate engine call sites (you said you'd do this).
2. Land the seeded `rng()` through the 61 sites (your step 2) WITHOUT moving any UI code.
3. Swap `simulateGame` + `matchupModel` + `teamRatings` first — the UI immediately exercises
   all three in every view, so the suites catch shape breaks fast.
4. Run my two suites (they assert the UI laws, not the math internals) + the season stress,
   then screenshot every tab at both widths.

— Z.ai · the shell is yours; the Owner's laws are not negotiable; welcome to the chase for 20-0.


---

# w34 ADDENDUM (session 26 · 2026-10-30)

Read with the W34-BUILD-REPORT (which is law for the w34 bytes). The short version:

- Base: the w33 PACKAGE bytes (`3407407c`), never the repo top-level copy.
- w34 product: `Football-Sim-Z-post-blue-w34.html` · md5 `6468c1edb86ab008e45e000572df6930` · 1,447,501 B (the SECOND ship — the Owner sent a second round-34 message, R8–R11, after the first seven shipped).
- R1 the LIGHT/DARK button is attached to the footer IN FLOW on every page — `position:fixed` is retired; the nav and `.zpb-foottheme` travel together at `.wrap` level (the w32 IIFE used to leave the theme block trapped inside #viewDraft — that was the homepage-only button).
- R2 the Guide player-panel chips end in 5 or 0; PRTG is 158.3.
- R3 the Madden Rankings weights live behind the ADJUST THE WEIGHTS dropdown, closed by default.
- R4 the player browser and the draft board wear `zpbNeutralRowVars` — the homepage dropdown ink, `zpbLift(txL,.62)`/`txd`.
- R5 the 3-4/4-3 toggle sits at the top of the Lineups panel and repaints the real container.
- R6 lineup edits stage on `roster._zpbStage`; APPLY THE CHANGES commits; REVERT CHANGES clears.
- R7 the finishDraft2 auto-flex is GONE. The stress suite drafts 31 natural picks and audits 0/31 out of position.
- Verify 70/0 · stress 35/0 · mobile overflow 0 px · 16 evidence shots.


---

# w36 ADDENDUM (session 27 · 2026-10-30)

Read with the W36-BUILD-REPORT (which is law for the w36 bytes). The short version:

- Base: the w34 SECOND-ship package bytes (`6468c1ed`) — the file the Owner renamed w35. The reconciliation is ruled in the W36-INTAKE-LEDGER §Reconciliation: the second ship already carried everything of the first; the best of his two files WAS the newer bytes. His naming law: this wave ships as w36.
- w36 product: `Football-Sim-Z-post-blue-w36.html` · md5 `d0e06392e359ec0dd95caf95a918852d` · 1,448,116 B.
- R1 WHERE YOUR PLAYERS LINE UP? spans its container's inner content edges (`zpb-fm-wide`; 1114px live at 1280 — was a 560px island) and leads every YOUR ROSTER tab (both states) with the pick-order register + the two-way highlight.
- R2 the top card set (`zpbDraftCardsFirstHTML`) is DELETED; the breakdown cards under the map carry the float-in (`zpb-dfc2`, unique pick-order beats, delay = beat × 1s).
- R3 the review's SEASON tab starts the season and lands the preseason page; the big SEASON button re-queries the live body.
- R4 the lineup pick menus read POS · OVR when open (`QB · 91`); the closed face stays name-only. The fix lives in the w33 payload's `zpbPickList` item building — the baseline selects are replaced at wire time (an optgroup change there was proven dead code and reverted).
- R5 BEGIN THE SEASON lands week 1 behind the SEASON OPENER veil. Root cause of both glitches: a straggler draft kickoff re-ran `finishDraft2` (no re-entry guard) and `startSeason`'s internal review re-render rebuilt `#draftResultsBody` — captured containers painted detached. Cured: the guard (+ reset), the `renderSeasonTab` dead-container re-target, the null-guarded begin wiring.
- Verify 136/0 (five greens) · stress 50/0 (seven runs) · probe all green in Chromium · mobile 0 px · 6 evidence shots.
