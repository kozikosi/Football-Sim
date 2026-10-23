# P4 (extension) — Game-ball tie-break verification (BOC) — 23 Oct 2026

Build: `Football-Sim-PreColors.html` · 657,486 B · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`

## Question
Owner ruling R-12 (settled 22 Oct): in a tie for the game ball, the winner is the player with the **lowest static wins** (his slot's wins-over-70 value, `playerWar(p).war`). The tie also goes to **defense** when the tie spans an offensive and a defensive candidate. The current game-ball code's tie behaviour was not checked (star-threshold audit, "What was deliberately not checked", item 1).

## Current code (Pre-Colors l.2676–2682)
```js
const ballScore = p => p.impact + (GAME_BALL_BIAS[p.group]||0);
const winTeam = r.homeScore>r.awayScore ? g.home : r.awayScore>r.homeScore ? g.away : null;
const perfGrade = p => 60 + 5.5*p.impact;
let pool = winTeam ? all.filter(p=> p.team===winTeam || perfGrade(p)>=90) : all;
if(!pool.length) pool = all;
const mvp = pool.reduce((a,b)=> ballScore(b)>ballScore(a) ? b : a, pool[0]);
mvp.perfGrade = Math.round(perfGrade(mvp));
```

## What was verified
1. **Tie rule in the current code.** `reduce((a,b)=> ballScore(b)>ballScore(a)?b:a, pool[0])` uses a strict `>`. On an exact tie in `ballScore`, the **earlier element of `pool`** (i.e. `pool[0]`) survives. `pool` is built as `home.players.concat(away.players)` (l.2674: `const all = home.players.concat(away.players)`), so home-side players precede away-side players in iteration order. **Verified by node eval of the reduce idiom** (see §Commands).
2. **Static-wins accessor exists and is cached.** `playerWar(p)` (l.1376) returns `{war, slot}` where `war = mean over STATIC_SLOTS[p[1]] of (slotWins(slot, p[3]) - slotWins(slot, 70))`. Cached in `_warCache`. So `playerWar(p).war` is the "static wins" the Owner names — no new computation needed.
3. **Key Players card (l.3740–3743) marks the game ball by name+team match** (`p.name===mvp.name && p.team===mvp.team`), so whatever tie-break lands in `mvp` propagates to the display. No separate criteria there.
4. **Super Bowl MVP path (l.5845) uses a different selector** (`best = t=>book.filter(x=>x.team===t).sort((a,b)=>(b.zSum||0)-(a.zSum||0))[0]`) — zSum-based, not ballScore-based. That is a separate code path and is **not** covered by R-12 as written (R-12 is about the regular-season game ball). Flagged for Claude's decision, not changed.

## What does NOT match R-12 today
- The tie-break is **iteration-order**, not lowest static wins. Two players with identical `ballScore` resolve to whoever appears first in `home.players.concat(away.players)`.
- There is no explicit **defense-wins-cross-type-tie** rule. A tied offensive candidate and a tied defensive candidate resolve by pool order, not by giving it to defense.
- `perfGrade` (60 + 5.5*impact) is a display grade; it is not the tie-break and is not static wins. It must stay as-is (display only).

## Proposed minimal change (for Claude — not applied here)
Replace l.2682 with a two-key comparator: primary `ballScore` descending, secondary (on exact tie) `playerWar(p).war` ascending (lowest static wins wins), with a cross-type rule that a defensive candidate (`group in DL/LB/DB`) beats an offensive candidate on a tie.

```js
const isDef = p => ['DL','LB','DB'].includes(p.group);
const mvp = pool.reduce((a,b)=>{
  const sa = ballScore(a), sb = ballScore(b);
  if (sb !== sa) return sb > sa ? b : a;
  // exact tie in ballScore: R-12 — lowest static wins wins; defense wins a cross-type tie
  if (isDef(a) !== isDef(b)) return isDef(b) ? b : a;   // defensive candidate wins cross-type ties
  const wa = playerWar(a).war, wb = playerWar(b).war;
  return wb < wa ? b : a;   // lowest static wins
}, pool[0]);
```

Notes for Claude:
- `ballScore` returns a float; exact equality on floats is acceptable here because ties only arise from identical impact+bias sums, which are the cases R-12 targets. If Claude prefers, round to 6 decimals before comparing.
- `playerWar` is cached, so calling it inside the reduce is O(1) amortised.
- The cross-type clause implements "the tie also goes to defense when the tie spans both an offensive and a defensive candidate" (R-12). It is placed before the static-wins clause so a defensive candidate always beats an offensive one on a tie regardless of static-wins values, matching the Owner's stated preference.
- The Super Bowl MVP path (l.5845) is a separate decision: either apply the same tie-break there or leave zSum-based. Recommend applying for consistency, but it is out of scope for the regular-season game ball and needs its own seeded check.

## Commands run
- `sed -n '2676,2682p' Pre-Colors` → lines quoted above (verified).
- `grep -n "function playerWar" Pre-Colors` → l.1376; body returns `{war, slot}` (verified).
- `node --check` on the extracted script block (l.449–6551) → **exit 0** (no syntax errors in the build).
- Eval of the reduce idiom (node, no DOM):
  ```js
  const pool = [{id:'A',s:5},{id:'B',s:5},{id:'C',s:4}];
  const mvp = pool.reduce((a,b)=> b.s > a.s ? b : a, pool[0]);
  console.log(mvp.id); // -> 'A'  (first-wins on tie, confirms iteration-order tie-break)
  ```

## What was deliberately not checked
- No seeded simulation was run to measure how often the tie-break actually changes the game-ball winner (would require driving the build's simulateGame via CDP; out of scope for this note, but the change is tiny and the direction is pinned by R-12).
- The 100-season report's star/game-ball criteria (separate from this) — still unchecked.
- Whether `perfGrade` display should also reflect the tie-break (it is computed from `mvp` after selection, so it already follows).
- The Super Bowl MVP path (l.5845) — separate decision, noted above.

## Label
VERIFIED (current tie-break behaviour, accessor existence, display propagation) · PROPOSED (the minimal change; not applied — advisory only, Claude decides) · UNKNOWN (frequency of tie-break impact on outcomes — needs a seeded run).
