# HANDOFF TO CLAUDE — the Z-post-blue shell at w53, for your engine swap

FROM: Z.ai (High Councillor, seat ZAI) · 2026-11-02 · wave 53 just shipped (the mobile pass)
FOR: Claude/Architect — "V23 as w30's UI on my engine" (your words, Owner-approved), renewed
for the **w52/w53 series** at the Owner's request: "isolate more code or instructions for
Claude to use in fitting in his engine with your w52/w53 series."

This renews the w36 handoff (wave-36 package, `CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE.md`). Its §1
laws, §3 seam and §4 soft spots still stand where they do not conflict with what follows; every
number in THIS document was re-verified against the actual w53 bytes on 2026-11-02, not copied
from memory. `engine-seam.json` beside this file carries the same contract machine-readable.

---

## §0 · Version truth (which file is the shell)

| Build | md5 | Bytes | Where |
|---|---|---|---|
| w51 | `e40732a235aa621002bc268c59b36bd0` | 1,571,506 | `council/zai` @ `z-post-blue-wave51-2026-11-01-w51/` |
| w52 | `40613b81de26b5ed9c67bdcc0637ac6f` | 1,585,036 | `council/zai` @ `z-post-blue-wave52-2026-11-01-w52/` (verified 2026-11-02) |
| **w53 — current product** | `512d1885ac0a69120bedcaf8e9041f2b` | 1,586,055 | the wave-53 package (this zip) · also `council/zai` @ `z-post-blue-wave53-2026-11-02-w53/` after the Owner relays it |

Single file, no build step, no dependencies. Payload block order (verified by id): main `w13` →
`w26-js` → `w27-js` → `w29-js` → `w32-js` → `w38-js` → `w39-js` → `w42` → `w47-js` → `w51-js`
(10 id'd JS blocks + 2 unnamed = 12 script blocks; CSS payloads ride `w26-css`…`w52-css` in
document order — later rules win). **The LAST function definition wins at parse time.** The
engine core lives in the main `w13` block; none of the payloads re-bind the 39 seam functions
(verified: each name occurs exactly once in the file) — your engine swap therefore cannot be
shadowed by a payload, but your OWN overrides must come after `w13`, ideally as a new payload
block `w53-js` at the end.

---

## §1 · THE LAWS (the w52/w53 standing set — break one and the Owner bounces the build)

### The ten commandments — unchanged from the style guide (deliveries/STYLE-GUIDE-Z-POST-BLUE.md)
No white text · integers on screen (PRTG's decimal is the one exception) · the team palette
drives every accent · ONE shimmer (the deep-gold `zpbshmsweep` breathing to `--gold2`; 90+
names shimmer, 85+ are bold) · Cinzel Decorative is the display voice · motion slow/soft/faded
(5 s / 30 s / 60 s cinematic ladders) · graphical beats tabular · the Owner's exact labels ·
explanations live in the Guide · floaty/mirrored/cinematic layout.

### The standing laws layered on since w32 (the ones an engine swap can accidentally kill)
- **The dot law (w45→):** every DISPLAYED colon and semicolon renders as the middle dot `·`
  via a runtime sweep. If your engine emits strings with `:`/`;` into display surfaces, the
  sweep owns them — but never re-introduce a colon composer.
- **The ink pair:** the site's neutral team text ink is `--txM` (light) / `--txd` (dark). The
  during-game clock (Q + time) rides `var(--text)` — **the w50/w51 cream law is RETIRED**
  (`--zcream` exists unused; never restore it). Under the team takeover `--text` reads
  `--tTx/--tTxd`.
- **The anchor panel follows the team (w50):** `zpbAnchorVars` re-skins the anchor frame in the
  team's colors; rose gold is only the fallback frame.
- **The draft inks (w51):** the DRAFT button ink is the halfway rose `#8e5566` on default and
  the team's 0.50 ink under the takeover; the gold franchise pill is the CONTINUE color on
  every Continue button; NICKEL and DIME share one map row (both l=339); TO/INT/FF boxes wear
  the BENEFICIARY's color.
- **The awards (w52):** every award leads with the `#X Y` position badge (`posRankOf` ranks
  within `honorCandidates` by `_rating`); no plaintext position under names; solid chip borders
  only; the champions carry `zpbStatChipsHTML(rec, winKey)` rows with the winning stat first
  (PASSY/RUSHY/RECY/…/TD/SK/INT/TKL/RETY/FG); COTY reads "YOU" for the user's team; the MVP
  ratings sentence is gone.
- **The matchup-math bars (w52):** the track is the quiet ink wash (`color-mix(in srgb,
  var(--text) 13%, var(--panel2))`) — NEVER `var(--border)` (the takeover repaints that as the
  franchise hairline); the home fill anchors to its outer edge (`margin-left:auto`). Verified
  for all 32 teams × both themes (64/64).
- **The Super Bowl order (w52):** when the user's team is IN it, the during-game cinematic
  OPENS first and the winner storm waits for the whistle. The w33 "SB skips the replay" law is
  RETIRED. SIM PLAYOFFS (quiet path) keeps run-cine → storm.
- **The look-gate (w52, CRITICAL for engine swaps):** releases select by the `.zpb-seen` CLASS
  state, never by `:not([data-zseen])` — `data-zseen` means OBSERVED. The map's look releases
  every breakdown group and depth zone in scope on ONE clock (`_zpbSyncSweep` + 900ms
  failsafe); the mirror law (cards first → map follows) closes the loop. If your engine swap
  re-renders the review containers, the observers must re-attach — run `w53_syncbattery.js`.
- **Advanced stats (w52):** every "/ g" reads "PER GAME"; every number on a card wears ONE ink
  (good/bad lives on the card border).
- **The mobile laws (w53 — yours to keep too):** every new control joins the ≤760px thumb floor
  table (38px minimum for buttons; the table is the single source); any panel added to
  `#viewRankings .layout` needs `min-width:0;contain:inline-size` or the 6px phone pan returns;
  the touch polish (text-size-adjust, tap-highlight, touch-action:manipulation) is never to be
  removed; the w43 N6 root law (wide windows clip · small windows may pan) is the Owner's —
  never re-legislate it.

### The label law (verbatim, still law)
`SK` never `SKS` · `PRSS` never `PRSS A` · `CAR` never `C` · `TD` (defensive too) never
`DEF TD` · `CLUTCH GAMES` (was `IN DA CLUTCH`) · `NICKEL`, `DIME` caps everywhere · `DL5` never
`Elephant` · `PRTG` (the one decimal) · `@` never `AT` · `PER GAME` never `/ g` ·
`Touchdowns` never `Scrimmage Touchdowns` · the award badge is `#X Y` · `YOU` for the user's
COTY · `ALL backs` / `(whole corps)` on the unit report card, kicker nameless.

---

## §2 · What w33→w53 changed (one line each — the full directive lists live in the wave packages)

w33–w35 season-review/bracket polish · **w36** the field map spans its container, pick-order
register, BEGIN THE SEASON veil, pick menus `POS · OVR` · **w37** map swap fixes, draft-board
callout rewrite · **w38** the defensive kit + coaching cards · **w39** the SB pregame fanfare
(RETired in w52's order) · **w41** every 90+ shimmers · **w42** the look-gate observer
(`zpb-w42` block) · **w43** the N6 root law + the thumb floor table + the footnav containment ·
**w44** payload CSS sweep · **w45** the sweep is `zpbshmsweep` + the dot law · **w47** the map
check regression · **w48** the sweep is the W45 SWEEP constant · **w49** the comparison sweep
breathes pale→mid gold; the anchor name shimmers · **w50** the anchor panel follows the team
(`zpbAnchorVars`); NO BLACK TEXT — the halfway rose `#8e5566` · **w51** the draft inks, the
gold continue pill, the map twins, the beneficiary colors · **w52** THE SYNC (one-clock
release), the clock rides `var(--text)`, the awards badges, the champions' chips, the bar
track law, PER GAME, the bye-week opponent, THE SUPER BOWL IS PLAYED + the halftime show, the
bracket @ container queries, the unit report card · **w53** the touch polish, the thumb floor
completion, the rankings compress-first containment.

---

## §3 · THE SEAM — re-verified against the w53 bytes (2026-11-02)

All 39 engine contracts below exist in the w53 file EXACTLY ONCE (grep-verified; no payload
re-binds them). Keep the shapes, swap the math:

**Game core:** `simulateGame(homeSM, awaySM, isPlayoff, lg, plans)` → `{homeScore, awayScore,
homeEvents[], awayEvents[], homeStats, awayStats, proj, exp, ot}` (events `{q,t,pts,type}`,
`type ∈ TD|FG|SAF|TO`) · `buildGameDetail` → `buildOffenseDetail`/`buildDefenseDetail` (per
side: `players[]` with `name,slot,group,ovr,st{…}`, `takeaways[]`, `defScores[]`
(`{type,name,from,forcer,sameMan}` — the fumble chains), `safeties[]`, `mvp`, `tdScorers`) ·
`matchupModel(O0,D0,lg,plan)` → `{structPts, sd, swings[]}` (the plan UI re-runs it live via
`planFxLive`, `unitValuePerPoint`, `samplePlans`, `choosePlans`).

**Unit ratings:** `teamRatings(slotmap)` → the NINE numbers the whole app speaks:
`{olRun, olPass, rb, qb, rec, passRush, frontRun, coverage, kicker}`. Whatever your engine
computes internally, expose these nine — every panel reads them.

**Wins-value family:** `slotWins`, `slotWinsTable`, `effOvr`, `flexPenaltyFor`, `isNaturalSlot`,
`playerWar`, `winsAt`, `lineupWins`, `optimalLineup` — the draft board, priority/gone, pick
grades and the W chips run on these.

**Ratings + season:** `ensureRatings()` (z-scores + `roleBonus`; keep the kicker dampening) ·
`computeStandings`, `computeSeeding`, `buildWildCardRound`/`buildDivisionalRound`/
`buildConfChampRound`/`buildSuperBowl`, `playGame`, `simulateCurrentWeek`, `advanceWeek`,
`simulatePlayoffRound()`, `startPlayoffs`. The UI phase machine reads `seasonState.phase ∈
preseason|regular|regularReview|playoffs|complete`.

**CPU draft:** `cpuPick(teamIndex, st)` + `executePick` + `startDraft2`/`processUntilUserTurn`/
`simToEnd` — keep the round-25 second-QB ban (the Purdy exploit) and the ovr floors.

**Rankings + awards:** `modelWeights()`/`computeScore(team)` (weights integers ≤ 1000 ending
in 0, QB anchored at 1000) · `honorCandidates` (`HONOR_COUNTS`, `HONOR_ORDER`),
`computeRegularSeasonAwards`, `computePlayoffAwards`.

**Randomness:** **62 `Math.random()` call sites** now (was 61 at w32). Your seeded `rng()`
threads through all of them; the UI does not care as long as the output shapes hold. The
cinematic yardage is deterministic-by-hash (`zpbCineYds`) — replays never contradict the score.

**The flag contract (what the UI hangs its choreography on — keep every one alive):**
`__zpbSBReplayHold` (the SB replay gate; the replay's `close()` releases it) ·
`__zpbSBFinPending` (the storm waits for the whistle) · `__zpbPoRunHold` (the playoff-run
hold; `zpbPostSuperBowlCine.__held` defers the storm) · `__zpbSBRewardOwed` · `__zpbSilent`
(SIM SEASON suppresses replays) · `__zpbFxSafety`/`__zpbFxPending` (effect failsafes) ·
`__zpbPrematchSeen`/`__zpbPoCineSeen` · `__zpbStoryHold`/`__zpbSeriesSteps` · `__zpbAp` ·
`zpbAdjCache`/`zpbAdjSpec` (the 3-4 adjacency spec — renamed from the w32 `__zpbAdjCache`).

**New-surface functions your integration may call but must not rebind:**
`zpbGameReplay` (the during-game overlay; its `close()` is part of the SB law) ·
`zpbPostSuperBowlCine` · `_zpbSyncSweep` + `zpbReleaseLookGate` (the look-gate) ·
`zpbAnchorVars` · `zpbStatChipsHTML(rec, winKey)` + `posRankOf` · `zpbNeutralRowVars` ·
`zpbOrderSlots` + `window.ZPB34` (display-only 3-4 reorder; your math stays in 4-3 keys) ·
`zpbEnsureSeriesOptions` (deferred via setTimeout 0 — the TDZ trap) · `renderSeasonCompleteView`
(payload `w51-js` RE-BINDS this one — if you override it, come after w51-js).

**What the UI owns (you never touch):** all CSS payloads, the DOM ids/classes, the renderers,
the cinematic timing, the badge/stagger beats, the veil, the swipe wiring, the look-gate
observers, the thumb floor table, the touch polish, the footnav containment.

---

## §4 · Soft spots (things that have bitten — re-verify after your swap)

1. **Byte-verify every old-string before patching** (the chat display layer drops `[x`
   substrings when echoing file bytes — three false syntax errors cost a session once). Patch
   with Python, assert count == 1, like `w53_patch.py` does.
2. **`simRecs()` runs the CPU forward 12× per board render** — memoize by `draftSim.pos` if
   your engine gets slower.
3. **TDZ traps:** `ROSTER_SLOTS` is declared after some earlier code; `window._zpbAdjCache`'s
   successor `zpbAdjCache` must exist before the first 3-4 lookup.
4. **The integer law is enforced at render** — route your numbers through `Math.round` at the
   last moment; PRTG is the only decimal.
5. **One replay at a time:** `.zpb-replay-ov` guards + `__zpbSilent`; the w52 SB hold OPENS the
   replay for the user's game — if your engine's playoff flow calls
   `simulatePlayoffRound` twice for the SB, the hold recurses. Keep the single-call contract.
6. **The w52_live rig wraps `playGame` ONCE before the season sim** — a second wrap recurses.
   Copy the rig, never stack it.
7. **The mobile check must click `tabDraftBtn` before scrolling to the review map** (hidden
   views never intersect — same for any IntersectionObserver work you add).
8. **The w53 containment:** if you add or replace a panel under `#viewRankings .layout`, carry
   `min-width:0;contain:inline-size` with it (zero positioned descendants allowed inside —
   probed at w53) or the 320px document pan returns.
9. **ResizeObserver loop notices** are benign; keep the rAF debounce + the setback filter.
10. **Payload CSS order:** later rules win; your `w53-js`/`w53-css` blocks go LAST.

---

## §5 · Verify protocol (run all of it, every time — the Owner checks)

Environment: `playwright-core@1.57` + the cached `chromium_headless_shell-1200` shell; tools
live in the wave package's `tools/`; each takes the product path either hardcoded or via
argv. Expected counts on w53 bytes:

| Battery | Count | Asserts |
|---|---|---|
| `w53_nodecheck.js` | 12/12 | every script block parses (`new Function`) |
| `w53_syncbattery.js` | 10/10 | the one-clock sync law (pairs ≤ 60ms, skip, mirror, phone, reduced motion) |
| `w53_live.js` | 30/30 | every w52 law (M2…M14) on a rigged season |
| `w51reg_live.js` | 25/25 | every standing law (draft inks, dot law, map twins, continue pill, shimmer) |
| `w53_evidence.js` | 64/64 | 32 teams × 2 themes bar law |
| `w53_mobile.js` | 5/5 | 390px, the sync surface, zero pageerrors |
| `w53_mobile_probe.js` | 32/32 | every view × 320/360/390/430 — no document overflow |

Ship: one zip, md5 stated, CHECKSUMS.txt verified, `unzip -t` clean, evidence screenshots at
desktop + 320/390 px.

---

## §6 · What I would do first in your seat (opinion, not law)

1. Land the seeded `rng()` through the 62 sites WITHOUT moving any UI code; run the batteries
   immediately after — they assert the UI laws, not your math internals, so shape breaks show
   up fast.
2. Swap `simulateGame` + `teamRatings` + `matchupModel` first (every view exercises all three).
3. Keep your overrides in a new `w53-js` payload block (after `w51-js`), never inside `w13`.
4. Re-run the seven batteries + screenshot every tab at 320/390/1280. The wide probe is your
   mobile gate: 32/32 or the build does not ship.

— Z.ai · the shell is yours; the Owner's laws are not negotiable; welcome back to the chase for 20-0.
