SPEAKER: UK | ROLE: Council Advisor | TASK: P-164 Playoff flow and cinematics | DATE: 2026-10-30T04:25Z

FOR: P-164

## TARGET
Football-Sim-PreColors.html — Season tab playoff flow, cinematics, and "Season in Words" section

## CURRENT STATE ANALYSIS

### Playoff Buttons (VERIFIED)
- **Regular Review View** (lines 3950-3962): 
  - `beginPlayoffsBtn` → "Begin Playoffs" (line 3952)
  - `simPlayoffsBtn` → "Sim Playoffs" (line 3952)
  - Wired at 3960-3961: `startPlayoffs()` + `renderSeasonTab()`

- **Playoffs View** (lines 3964-4003):
  - `simRoundBtn` → "Simulate ${ROUND_LABELS[rk]}" (line 3976)
  - `simRestBtn` → "Sim Playoffs" (line 3976)
  - `nextRoundBtn` → "Continue to ${NEXT_ROUND_LABEL[rk]}" (line 3988)
  - Wired at 3997-4002

- **Draft Complete** (line 6240): "Draft Complete" with "Season" tab button

### Cinematics
- **playoffPreview()** (lines 5331-5395): Generates playoff preview text with stakes, road, history, players, matchups
- **renderPreviewPanel()** (lines 5405-5409): Renders preview panel for 'regular' or 'playoff' mode
- **generatePreviewHTML()** (line 5396): Switches between playoffPreview and regularPreview
- No explicit cinematic animation system exists yet (P-007 animation is separate)

### "Season in Words" (VERIFIED)
- **generateRegularSeasonRecapRaw()** (line 5693): Returns `[fragArc, fragMoments, fragOffense, fragDefense, fragPlayoffField, fragWeaknessCost, fragOutlook].map(...)`
- **generateSeasonReviewRaw()** (line 5704): Returns `[fragFinalVerdict, fragPlayoffDeep, fragPlayoffVsRegular, fragSeasonStars, fragExitCause, fragDraftLessons, fragPriorities]`
- Rendered in `renderRegularReviewView()` (line 3954) and `renderSeasonCompleteView()` (not shown but uses generateSeasonReview)

### Glitch Root Cause (INFERRED)
The "Season in Words" disappears because:
1. `renderSeasonTabInner()` at line 6163-6167 switches views based on `seasonState.phase`
2. When phase changes from `'regularReview'` → `'playoffs'`, `renderPlayoffsView()` is called (line 3964)
3. `renderPlayoffsView()` does NOT include `generateRegularSeasonRecap()` — it only shows bracket, current round, and stats tabs
4. The recap is only in `renderRegularReviewView()` (line 3954)
5. No persistent "Season in Words" section carries into playoffs view

## REQUIRED CHANGES

### 1. Playoff Button Text — "Play the <opponent name>"
**Anchor:** `renderPlayoffsView()` line 3976 (`simRoundBtn`)
**Change:** When `status.status==='playing' && status.round===rk` (line 3978), button text should be:
```js
`<button class="resetbtn" id="simRoundBtn" style="width:auto;padding:10px 24px;">Play the ${opp}</button>`
```
where `opp = pg.home===user ? pg.away : pg.home`

**Anchor:** `renderRegularReviewView()` line 3952 (`beginPlayoffsBtn`)
**Change:** After `startPlayoffs()` is called, the first playoff round view should show "Play the <opponent>"

### 2. After Elimination → "SIM PLAYOFFS"
**Anchor:** `renderPlayoffsView()` line 3972-3973
**Change:** When `status.status==='eliminated'`, show "SIM PLAYOFFS" button instead of "Simulate Round":
```js
html += `<p class="dsub">${user} was eliminated in the ${ROUND_LABELS[status.round]}. <button class="resetbtn" id="simPlayoffsBtn2" style="width:auto;padding:10px 24px;">SIM PLAYOFFS</button></p>`;
```
Wire to simulate all remaining rounds.

### 3. Cinematic Timeline

| Game Type | Cinematic | Duration | Trigger |
|---|---|---|---|
| Regular season (user game) | Playoff intro cinematic | ~5-10s | `simulateCurrentWeek()` when user game |
| Playoff game (user game) | Super Bowl cinematic | ~15-30s | `simulatePlayoffRound()` when user game |
| Super Bowl (user game) | New Super Bowl cinematic | ~60s | `simulatePlayoffRound()` for superbowl |
| All other games | Instant | 0s | Auto-sim |

**Implementation:** Add `cinematicType` parameter to `simulateGame()` / `playGame()`:
- `'regular'` → playoff intro
- `'playoff'` → Super Bowl cinematic  
- `'superbowl'` → new 1-minute cinematic

### 4. "Season in Words" Glitch Fix
**Anchor:** `renderPlayoffsView()` (lines 3964-4003)
**Change:** Add persistent "Season in Words" panel at top of playoffs view:
```js
html += `<details open id="seasonInWords"><summary class="narr" style="cursor:pointer;">Season in Words ▸</summary><div style="margin-top:8px;">${generateRegularSeasonRecap()}</div></details>`;
```
Place before the round panel (line 3969).

Also in `renderSeasonCompleteView()` ensure it's included.

### 5. Skip Behaviour
- Add "Skip" button to each cinematic
- Clicking Skip → jump to game result immediately
- Respects `prefers-reduced-motion` — if set, cinematics auto-skip

### 6. Reduced Motion
**Anchor:** CSS `@media (prefers-reduced-motion: reduce)` (line 110)
**Add:** Cinematic animations disabled, instant results

## ANCHORS (exact)
- `renderRegularReviewView`: 3944-3962
- `renderPlayoffsView`: 3964-4003
- `renderSeasonCompleteView`: search for it
- `simulatePlayoffRound`: 3598-3611
- `playoffPreview`: 5331-5395
- `renderPreviewPanel`: 5405-5409
- `generateRegularSeasonRecap`: 5689-5696
- `ROUND_LABELS`: search (likely near line 3830)
- `NEXT_ROUND_LABEL`: search
- `userPlayoffStatus`: search

## SAFE ALONE?
Presentational + flow changes. No protected constants. No math changes.

## HOW TO CHECK
1. Start draft → complete → start season → play to playoffs
2. Regular review: "Begin Playoffs" button visible
3. Click → playoffs view: "Play the <opponent>" button for user's game
4. Simulate user's playoff game → cinematic plays (5-30s based on round)
5. Skip button works
6. After elimination: "SIM PLAYOFFS" button appears
7. "Season in Words" visible in playoffs view (details open by default)
8. Super Bowl: 1-minute cinematic
9. `prefers-reduced-motion`: cinematics instant
10. Mobile 390px: no overflow

## EVIDENCE LABEL
VERIFIED (anchors checked against Pre-Colors sha256 40233d6be00e987c)