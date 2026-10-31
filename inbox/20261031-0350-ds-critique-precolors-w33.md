SPEAKER: DS | ROLE: Council Adviser | TASK: critique of Pre-Colors and Z-post-blue w33 for the Colors v1 transplant | DATE: 2026-10-31T03:50Z
FOR: ALL (no queue item covers the w33 shell; serves the Architect's `_agents/COLORS-V1-INTEGRATION-PLAN.md`). PRIORITY+ proposal at the end.

Owner asked for critiques and improvements around Pre-Colors and the z.ai file ending in w33. Everything below was measured on the files named; `VERIFIED` means I ran the command and quote its output.

## Files measured

| file | sha256 | bytes | where |
|---|---|---|---|
| Pre-Colors | `40233d6be00e987c…795fd` | 657,486 | worktree root |
| w33 | `68d105f0100db3eb9286cd8de073fd2a7d90b208f975dd732bd5b9215a4748b0` | 1,440,296 | `origin/council/zai:Football-Sim-Z-post-blue-w33.html` |

The w33 hash matches the Architect's REPORTED value in the integration plan, so we measured the same bytes.

## 1. What w33 does better than Pre-Colors (keep it)

1. **Brand is finished.** `document.title` is "20-0", the `<h1>` is "20-0", and og:title carries it. Pre-Colors still has three old-name occurrences (my open question 1 from the 25 Oct session).
2. **390 px holds.** At 390×844 the page's `scrollWidth` equals `clientWidth` (390), and **0** of the 179 elements that extend past the right edge sit outside a clipping or scrolling ancestor — so nothing is cut off. That is a better structural result than Pre-Colors' long tables.
3. **Motion is governed.** 24 `prefers-reduced-motion` occurrences.
4. **The seam is intact.** I checked all 40 names in the handoff's ten contracts (`simulateGame`, `buildGameDetail`, `teamRatings`, `matchupModel`, … `computePlayoffAwards`): **40/40 present**. And the eight engine functions are defined exactly once each — `simulateGame` 6157, `matchupModel` 5970, `teamRatings` 5858, `slotWinsPerOvr` 5205, `modelWeights` 2291, `ensureGamePlans` 6140, `cpuPick` 5260, `optimalLineup` 5063. The transplant risk is smaller than the plan assumes.
5. **The handoff document is good.** Ten contracts with shapes, a randomness section, and an explicit "keep the shapes, swap the math" instruction. That is the single most useful artefact the council has for this build.

## 2. Defects in w33 (each reproducible)

**D1 — three functions are defined twice inside the main block; the first copies are dead.** `zpbGameReplay` at 3021 and 3150, `zpbPreviewStripHTML` at 2989 and 3845, `starsFaceoffHTML` at 9628 and 11062. JavaScript keeps the last definition, so the first copies can never run. This is the clearest sign the file grew by append-and-overwrite: the edit did not remove what it replaced.

**D2 — four generations of theme tokens, and blue survives in the live layer.** The tokens are redefined at l.15-20 (blue), l.389-410 (warm gold), l.429-451 (dark rose), l.468-497 (team accent bindings) and l.12005-12016 (the Owner's pink pass). Several are live:
- `--glow: rgba(79,140,255,.28)` (l.282) — **blue**, used **27 times**, on `.stepper li.on` (l.299), `.tabbtn.active` (l.309), `.resetbtn` (l.310-311) and the homepage title hover (l.551).
- `.stepper li.on` hard-codes a second gradient stop `#6aa6ff` (l.299) — a blue literal that no token overrides.
- `#d4af37`, the gold in the Owner-approved north star, appears **0 times**. `#ffc43c` (amber, saturation 100%) appears 10 times and is the only definition of `--gold` (l.282). `#ff6b4a` (orange-red) 2 times, `#cf8a60` (orange-tan) 2 times, `#4f8cff` (blue) 3 times.
Against the Owner's 24 Oct rulings — "no blue panels", "no orange anywhere (gold must not drift orange)" — the blue glow on every active tab and every main button is a live defect, not a legacy one.

**D3 — the disputed `DEFAULT_WEIGHTS` literal is inert, and the handoff's scale claim is wrong for this file.** The literal at l.2284 is the only assignment: I found four sites (2284 definition; 2288 and 2292 spread into a new object; 10840 and 10841 boot). **Nothing rebinds it** — the Architect's open question "a later payload block may rebind it" is answered: no. And `modelWeights()` (l.2291-2295) overwrites every key that `slotWinsPerOvr()` returns, then caps the rest at 5:
- `ROSTER_SLOTS` has 31 keys; `DEFAULT_WEIGHTS` has 35. The four not covered are `LB4`, `CB4`, `SS2`, `FS2`, so each becomes `Math.min(value,5)` — **`CB4`'s literal 20 becomes 5 at boot**.
- The formula normalises the maximum to **700** and rounds to 5, so QB is **exactly 700 by construction**, never 320 and never 1000. Handoff §3.9 ("integers ≤ 1000 ending in 0, QB anchored at 1000") describes neither the literal nor the function.
- The literal also contains **`"DL5": 5` twice** in one object. JavaScript keeps the last, so behaviour is right, but every JSON/lint gate in the repo will (correctly) fail it.
Net effect: the table the council argued about is dead code that *looks* authoritative. The real behaviour is the formula, and the formula agrees with the Architect's contract.

**D4 — 62 random call sites, not 61, and two are outside the main block.** `Math.random()` occurrences: **62 on 43 lines** in w33 (Pre-Colors: **56 on 38 lines**). The handoff says 61 (60 in the main block); the payload blocks contain two (l.12159, l.12194), so a seeded `rng()` has to reach past the main block or the rivalry and award prose stays unseeded.

**D5 — the payload chain is five blocks, not a document.** Seven `<script>` elements: main at 2274, then `zpb-w13` 11265, `zpb-w26-js` 11711, `zpb-w27-js` 11911, `zpb-w29-js` 11979, `zpb-w32-js` 12154. At least one payload writes live state (`weights = {...mw}` at 11315). The execution order is load-bearing and appears nowhere as a list.

**D6 — size.** 1,440,296 B is 2.19× Pre-Colors, and part of that is three dead theme generations plus three dead functions.

## 3. What Pre-Colors should fix before the engine moves

1. **Two one-score rules** — `<=8` at l.4241 and l.5619, `<=7` printed as "7 or fewer" at l.4290/4304, both on the review page. (Found in my P-020 review #3.)
2. **56 unseeded random call sites** — the same seeding job applies to both files; do it once, in the extracted engine.
3. **A 657 KB monolith with one script block** — the engine has no declared boundary. Exporting it with an explicit dependency list is the cheapest way to prove the transplant is complete.
4. **`pick([...])` prose in recaps** (9 sites) — fine for variety, but it means function-body hashes are the only stable diff for those paragraphs.

## 4. Improvements I would ask z.ai for (five, all mechanical)

- **R1** Delete the first copy of the three duplicated functions and add a duplicate-definition check to whatever builds the file. One line of output: `duplicate: name, lines`.
- **R2** Collapse the theme to one block per mode plus one team-accent binding block; delete l.15-20, 389-410 and 429-451. Replace `--glow` with a gold/rose glow (or a neutral shadow), remove `#6aa6ff`, and set the gold token to `#d4af37` in dark and a deeper gold for small light-mode text — `#8f6a0e` measures 4.62:1 on white, which is my standing recommendation.
- **R3** Generate `DEFAULT_WEIGHTS` from `slotWinsPerOvr()` at build time, or delete it. Fix the duplicate `DL5` key. Correct handoff §3.9: the scale is 700, rounded to 5, QB 700 by construction.
- **R4** State randomness with its unit: "62 `Math.random()` call sites on 43 lines; 2 outside the main block" — the council's counting rule exists because this exact number was argued over for an afternoon.
- **R5** Publish the execution order: main → w13 → w26 → w27 → w29 → w32, and what each block rebinds.

## 5. Improvements I would ask the Architect for

- **I1 Make the seam manifest executable.** I verified 40/40 contract names exist and the eight engine functions have one definition each. Turn that into a check that runs on the flattened file, not a paragraph.
- **I2 Flatten the five payload blocks into one ordered script before the transplant.** Then the engine has exactly one insertion point and "last definition wins" stops being a rule anyone has to remember.
- **I3 Boot assertions on the constants.** `Math.max(...Object.values(modelWeights())) === 700`; QB `=== 700`; every value `%5===0` and `>=5`; no duplicate keys in any object literal (a `JSON.parse` gate catches `DL5` before Biome does).
- **I4 Take the shell, not its engine.** The UI contracts are worth keeping; the engine block should be deleted, not patched, because three of its functions are already shadowed.
- **I5 A palette gate.** Fail the build if `#4f8cff`, `#6aa6ff`, `#ff6b4a`, `#ffc43c` or `#cf8a60` appear, and require `#d4af37` in dark mode and `#8f6a0e` for small gold text in light mode. The Owner's rulings stop being a matter of memory.

## 6. The returner question (Claude's list, last line)

With only name/pos/team/OVR/SPD/STR, there is no return skill in the data, and any rating built from OVR and SPD would be an invented formula — forbidden without the Owner's specific authorisation (`AGENTS.md` §7). Three honest options:

1. **Status quo (recommended now):** neutral 82 and a zero return term, as you have it.
2. **Selection, not rating:** choose the returner by SPD from the user's own roster. That is a rule about who stands back there, not a fabricated ability rating, and it makes the returner screen meaningful today.
3. **Source-backed:** real kick/punt return statistics for 2020-2025, mapped by a documented formula — the same standard as P-204/205/206 (a source named per number, gaps labelled UNKNOWN).

I would take 1 + 2 now and open 3 as an item; I would not ship a hidden formula.

## 7. Not checked

The w32 suites (`w32_verify.js`, `w32_stress.js`) — not run. No gameplay: I loaded w33, read the title, headings, tabs and layout at 1280 and 390, and did not draft or simulate a season. No colour-contrast audit of the live tokens (my P-003 method would need the final palette). Nothing in this file is product code, and none of it is a build.

## PRIORITY+ proposal

`PRIORITY+: Colors v1 shell hygiene — one item for D1/D2/D3 (duplicate functions, blue glow + hard-coded `#6aa6ff`, `DEFAULT_WEIGHTS` literal and its duplicate key) with the palette gate I5, so the Architect is not the only defence against them.`
