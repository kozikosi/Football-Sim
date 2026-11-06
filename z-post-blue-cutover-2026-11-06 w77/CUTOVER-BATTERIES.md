# CUTOVER-BATTERIES — the acceptance spec for 76 Pancakes

**From:** Z.ai (High Councillor) · **Date:** 2026-11-06 · **Status:** drafted BEFORE the port starts, against the frozen w76 shell.
**Reference build:** `Football-Sim-Z-post-blue-w76.html` · md5 `4f363452a4ad33709244ca08d4ab3b00` · 1,830,164 B · gh-pages 367d8e3e (Muse-verified, re-verified here from the branch bytes).
**Harness:** `batteries/accept.js` — the w76 battery (84 assertions) with the shell lifted into a pluggable adapter. Reference run verified this session: **84 pass · 0 fail, labels byte-identical** to `tools/w76/verify_w76.js` (the detail strings differ run-to-run because the simulator is nondeterministic — proven by running the ORIGINAL battery twice; the drift is the sim's, not the harness's).

---

## 0 · The doctrine

The batteries are the artifact that knows what the product is supposed to do. Code does not cross the cutover; **the assertions do.** This spec says what each group asserts and which Owner law it carries. The port is accepted when the same 84 assertions pass against the port's build — the adapter (who fills `adapters/pancakes.js`) decides WHERE to look, never WHAT to expect.

Two grounding rules, learned the hard way (w76's V15 lesson):

1. **Measure, don't guess** — every assertion reads the live DOM/computed styles, never source text.
2. **No vacuous passes** — if the fixture a probe needs doesn't exist, the assertion FAILS or SKIPs loudly; it never passes because it read nothing.

## 1 · The acceptance bar

```
node accept.js --file <76-pancakes-build> --adapter ./adapters/pancakes.js
```

- **84 pass · 0 fail · 0 skip** → ACCEPTED. The port reproduces the shell's behavior.
- Any **FAIL** → a law the port does not reproduce. Fix the port or bring the law to the Owner.
- Any **SKIP** → an adapter key left unfilled. Fill it or bring the surface to the council.
- Exit codes: 0 accepted · 1 failures · 2 crash · 3 skips/adapter gaps.

Before the FIRST port run, re-prove the harness: `node accept.js --file <w76.html>` must print 84/0/0. If the port changes the batteries' expectations, that is an OWNER-visible decision (the batteries are his law archive), never a port-side edit.

## 2 · The assertion map (Owner law → battery)

### V0 · the veto (c) median — 5 assertions
**Law (Owner, w75/w76 vetoes):** the rating DISPLAY scale is median-centered on the NORMALLY-DRAFTED pool — the top `TOTAL_ROUNDS × 32` (1,024) of the POS_SLOT_MAP-filtered board — produced ONCE, cached (`window.__zpbMedOvr`), never recalculated per draft; the backend math untouched.
**Assertions:** the live derivation equals an independent recomputation · the old all-database median (76) is superseded (the 50s are out; the drafted pool's median is higher) · the value is stored once · no BACK TO bars before the simulator starts · the stored median survives a draft boot.
**Frozen values:** median **77** · all-database **76** · take **1,024**.

### V1 · the dropdown — 2
**Law (w69, standing):** the positions dropdown reads the depth chart in order (`all QB RB WR TE OT OG C EDGE DT LB CB FS SS K`, TE once), and the OG option reads **Offensive Guard** — never just Guard.

### V2 · the chip law — 11
**Law (w75, standing):** the TOGGLE MODEL — buttons start all OFF while the board is FULL; a lit button keeps its group on the board; a dark one keeps it off; ALL lights all 14; every button off (the default) is the full board; ALL/CLEAR tell the truth (`all on` / `all off`).
**Frozen value:** 14 position groups.

### V3 · the selected chip is FILLED — 1
**Law (w75):** the selected chip is a filled button (the accent background = the accent border) in both themes.

### V15 · the fills read — 3
**Law (w75 + veto a):** the fills cells read `x (-y)` — **no FLEX word anywhere**; the battery reads the REAL fills cells (the w76 V15 harness-gap fix); the board does not pan the page at 1280.

### V17 · the slot-picker chip — 2
**Law (veto a, w76):** the DRAFT-HIM-INTO picker's flex chip reads just `−x`; **NATURAL keeps its word**; no FLEX word on any picker chip. The probe drives the picker directly off the live pool when the table has no fixture (the w76 V17 fix).

### V5 · the phone laws at 390 — 2 + screenshots
**Law (w55, standing):** at 390px the chip row and the draft table view never pan the page (measured `scrollWidth − clientWidth ≤ 0`).

### V8 · BACK TO \<STAGE\> — 5
**Law (w75, standing):** every footer page carries a bar top AND bottom while the simulator has started; the label reads the LIVE stage (BACK TO DRAFT → BACK TO PRESEASON → BACK TO WEEK 17 → BACK TO SUPER BOWL); clicking returns to the simulator.

### V13 · the preseason page — 6
**Law (w75, standing):** the four preseason explainers are PLAIN (the WHAT-DO-THESE-TERMS-MEAN pattern, no box, no glass — measured equal to the reference summary's border/background); the header says HOW A 2 POINT CONVERSION WORKS; the offense dropdown lost "(x teams run it)"; the bars read BACK TO PRESEASON; the season boots into the preseason.

### V9 · SIM SEASON = SIM GAME — 2
**Law:** SIM SEASON wears the exact neutral of SIM GAME — transparent at rest (never a white panel), same family fill and border.

### V11 · the box score border — 1
**Law:** the linescore border color equals the score border color.

### V7 · the display scale — 2
**Law (veto c):** displayed ratings are INTEGERS centered on the drafted-pool median (mean within 3 of 77), bounded 0..99.

### V4 · DRAFT COMMAND CENTER (the Owner's w76 round) — 26
| # | Assertion | Owner law |
|---|---|---|
| 1–2 | the board renders on the shared review; the title reads DRAFT COMMAND CENTER | U-round, w76 |
| 3 | the old subtitle line is gone | U2 |
| 4 | (U1) the section-A header text is gone — the cards speak for themselves | U1 |
| 5 | (U2) the line text is gone — the cut math keeps running unseen | U2 |
| 6–7 | (U3) the subtitle reads **Cutdown Day** (as the Owner typed it), centered, Cinzel Decorative | U3 |
| 8 | (U3) the size law: sec 12.6px < cdtitle 16.8px < title 19.32px — the LARGER subtitle | U3 |
| 9–10 | the rooms wear the small report cards (no gauges), best-to-worst, every one below a B | w75 standing |
| 11–12 | (U5) every cutdown card carries its number and CUT; no "vs his" delta anywhere | U5 |
| 13 | (U6) the rating label reads **SEASON RATING** on every card | U6 |
| 14–16 | (U6) every card wears the position badge AND the OVR badge ("NN OVR"), the OVR badge measured the SAME size as the position badge (same class), the rating number about the badge size (±3px) | U6 |
| 17 | the CUT badge fades in and out (zpbCutFade) | w75 |
| 18 | the old two-bar cards are retired | w75→w76 |
| 19–21 | (U4) the footer reads PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO **20-0**; the 20-0 shimmers (fxshine sweep, background-clip: text) on a team-color gradient | U4 |
| 22 | the dot law — no displayed colon/semicolon anywhere on the board | w52 |
| 23 | no side scroll at 1280 | w53 |
| 24–26 | (V0c) the scale explainer reads the drafted pool, no retired wording on any live surface, prints the stored median (77) | V-c + U5 |

**Frozen values:** OVR badge 13.02px (== position badge) · season rating 15.12px (±3 of badge) · nm60 light `rgb(122, 31, 43)` · halfway rose `rgb(142, 85, 102)`.

### V12 · the award names — 2
**Law (w75):** award names ride the 0.60 preset (`--nm60`) in light mode (`rgb(122, 31, 43)`); the 0.50 law stays in dark.

### V6 · SIM PLAYOFFS — 5
**Law (standing):** the door sims the whole bracket to a champion; a cinematic page per round the user plays, waiting for Continue; the first card is the round the user plays (WILD CARD ROUND); the Super Bowl storm never jumps early; after the last Continue the Super Bowl page mounts.

### V16 · the guide ladder — 3
**Law (w75):** all 32 depth-chart slots on the ladder — TE3 and DIME on the map (and WR4, DL5); NICKEL and DIME share one map row's family; the guide bars stay in place.

### V10 · the pregame player cards — 4
**Law (w75):** light mode wears the light gradient wash (no dark base `rgba(16, 9, 4…)`), fill transparent (no dark color layer), the name rides the halfway ink `rgb(142, 85, 102)`; dark keeps its own darker stage gradient.

### V14 · the in-season format — 1
**Law:** the season review keeps "2-Pt Conversions"; the preseason/guide pages say "2 Point Conversion".

### Final — 1
Zero page errors across the whole battery (every sim, every theme, both viewports).

**TOTAL: 84 assertions.**

## 3 · What the adapter must provide (the port's homework)

See `adapters/pancakes.stub.js` for the annotated list. Summary:
- **~60 selector hooks** — the port's equivalents of the ids/classes above. If the port reproduces the w76 hooks 1:1, the reference adapter runs UNCHANGED (that is the cheapest acceptance in history — consider it).
- **10 engine snippets** — page-context observations the shell made through its own globals (the median derivation, the draft/season/playoffs boots, the stage label…). For the port, write the same OBSERVATION against the port's internals. The shapes are documented on each key.
- **2 probe-element recipes** — the award-name and pregame-star fixtures (the classes/vars the port's theme laws key on).

**Known adaptation points (flagged now, not at cutover):**
1. `zpbCutFade` / `fxshine` — the animation NAMES are asserted. The port may keep the names (recommended: the law cites them) or the runner's expectation must change WITH the Owner's word.
2. `engine.explainerProbe` — in w76 this reads the RETIRED recap generator (override-shadowed; see the w76 build report). The port should read the line's LIVE home (the Guide). If the Owner rules the explainer's home differently (see the answers doc, flag 5), the snippet follows the ruling.
3. `V0`'s `allMed === 76` anchor — if the port keeps no all-database median concept, V0's second assertion needs an Owner decision to re-anchor. Do not silently re-anchor it.
4. The empty-state header ("EVERY ROOM AT A B OR BETTER") is NOT asserted (the battery can't drive an all-rooms-≥B season through the UI). It is on the KNOWN-GAP list below — the port's component tests can reach that state trivially; recommend the port adds one.

## 4 · The three runs (the ritual)

1. **REFERENCE** — `node accept.js --file <w76.html>` → 84/0/0. Proves the harness. (Done 2026-11-06; re-run before every port acceptance.)
2. **ACCEPTANCE** — `node accept.js --file <76-pancakes-build> --adapter ./adapters/pancakes.js` → the verdict.
3. **DELTA** — any FAIL/SKIP lines become the port's work list; nothing else. A green acceptance is the cutover gate.

## 5 · The known gaps (asserted NOW so they are honest)

- **The empty state** ("EVERY ROOM AT A B OR BETTER") — not behaviorally asserted (the UI can't force it). If the Owner rules on the flag, the ruling goes here AND into the port's component tests.
- **U3's rendered casing** — the battery asserts the DOM text ("Cutdown Day", as typed) and the computed font (Cinzel Decorative), but no assertion can read GLYPHS. The font has no lowercase letterforms (measured this session — see the answers doc, flag 3): caps is the only render either build can produce. The port must not "fix" this by changing fonts — that would break the U3 law itself.
- **The veto (b) floor** — the 40%-games floor and the TRUE OVR test run in the cut math but are not separately asserted (they predate the battery's U-round; they show through V4's cut list). If the Owner calls veto (b), the ruling adds an assertion here FIRST, then the code follows — in the port only, unless he reopens the shell.

## 6 · File manifest

```
batteries/accept.js                    the runner — 84 assertions, law strings byte-identical to w76
batteries/adapters/w76.js              the frozen reference adapter (verified 84/0 this session)
batteries/adapters/pancakes.stub.js    the port's homework, annotated key by key
contract.json                          the machine-readable contract (ids, law strings, frozen values, engine globals)
RUNBOOK.md                             the three runs + the environment notes
CUTOVER-BATTERIES.md                   this spec
```
