# The game ball and the stars — the Owner's ruling, mapped to the code

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: the Owner's 22 Oct ruling on the game ball and the stars | DATE: 2026-10-22T04:10:00Z**

**Build measured:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only; nothing in the product was touched.

---

## 1 · What the code does today (VERIFIED)

**The game ball — l.2676–2684:**

```js
const ballScore = p => p.impact + (GAME_BALL_BIAS[p.group]||0);          // l.2676
// The game ball (and the Super Bowl MVP) belongs to the winning team, unless a player on the losing team put up a 90+ performance grade.   // l.2677
const winTeam = r.homeScore>r.awayScore ? g.home : r.awayScore>r.homeScore ? g.away : null;   // l.2678
const perfGrade = p => 60 + 5.5*p.impact;                                 // l.2679
let pool = winTeam ? all.filter(p=> p.team===winTeam || perfGrade(p)>=90) : all;   // l.2680
if(!pool.length) pool = all;                                                // l.2681
const mvp = pool.reduce((a,b)=> ballScore(b)>ballScore(a) ? b : a, pool[0]);  // l.2682
```

and `p.impact = gameZ(p.slot, p.raw)` (l.2674, l.2371) — a **z-score against the base of that role**, with `p.raw = statImpact(p.st)` (l.2358). The comment at l.2365–2369 records the intent: the ball goes to whoever most exceeds what is normal **for their role**, fitted to roughly QB 24% / RB 15% / WR 16% / TE 6% / defense 36% / K 3% of balls.

**The stars — l.3027–3050:** `starsParagraph(g, blow)`; the only filter is **l.3031**

```js
p.impact >= 1.0 && !p.slot.startsWith('OT') && !p.slot.startsWith('OG') && p.slot !== 'C'
```

then **top 2 per side, top 4 overall** (l.3034). The praise words are picked from a **fixed pool** (l.3035: `['was the difference','played a big role','delivered','had a strong day']`, or the blowout set), and each line is then built per group (l.3041 QB · l.3042 RB · l.3043 WR/TE · l.3044 K · l.3045–3049 defence).

**The Key Players chart — l.2687–2693 (`notablePlayers`):** the QB, the top RB by rushing yards, the top two receivers and the top three defenders **by impact**; the chart marks the ball holder with **⭐** (l.3743).

## 2 · The Owner's ruling, against that code

| the ruling | today | verdict |
|---|---|---|
| **"There should always be one game ball"** | one `mvp`; `if(!pool.length) pool = all` guarantees a ball even in a tie or an empty pool | **already right** ✔ |
| **"delivered to the winning team"** | `pool` is the winning team's players | **already right** ✔ |
| **"unless a player on the opposite team has a particularly noteworthy 90+ performance"** | `|| perfGrade(p)>=90` admits the losing team's 90+ players, and `mvp` is then chosen from the whole pool | **already right** ✔ — and l.2677's comment already says it in the Owner's words |
| **"only one player gets the game ball"** | one `mvp` | **already right** ✔ |
| **"Defenders need to have the highest rating for any player that game to get that game ball, or be part of multiple turnovers, blocked kicks, anything bigger than just tackles or pass deflections"** | a defender's ball score is `impact + GAME_BALL_BIAS`, and `impact` is a z-score **against the role's base** — so a defender with six tackles and nothing else can out-score every offensive player, because his base is low | **THE GAP.** The defender's eligibility must be gated on a **notable event** (two or more turnovers, a blocked kick, a defensive touchdown, a sack with a fumble, a forced fumble) **or** on being the **highest `perfGrade` in the game** |
| **"players should be mentioned and awarded for 90+ performances"** | the gate is `impact >= 1.0` — in grade terms that is `60 + 5.5×1.0 =` **65.5**, so a merely average-above-baseline player can be praised | **THE GAP.** The stars gate must become the grade: **90+ → a star**; **80+ → a mention or a lighter compliment**; below 80 → not named |
| **"multiple good performers (around 80+) can get stars or some other type of compliment… there can be more than one amazing performance per game"** | up to four stars, 2 per side | **right in shape**; the *threshold* is wrong, and the praise words are random rather than earned |
| **"try not to give explicit compliments just because a player caught one pass and scored a touchdown for eight yards"** | the verb comes from a fixed pool, so "was the difference" can be attached to a one-catch, eight-yard touchdown; the stat line itself is printed as it happened | **THE GAP.** The praise must be **earned by the grade**, and the line must be allowed to stand without a compliment |

## 3 · The spec, in the house form

**Change 1 — the stars gate (l.3031).**
**WHERE** `starsParagraph`, l.3031 · **WHAT** replace `p.impact >= 1.0` with a grade gate — `perfGrade(p) >= 90` for a star, `perfGrade(p) >= 80` for a mention, and keep the offensive-line exclusion (`!p.slot.startsWith('OT') && !p.slot.startsWith('OG') && p.slot !== 'C`) · **WHY** the Owner's ruling: 90+ earns a star, 80+ earns a mention, and a merely average game no longer produces praise · **SAFE ALONE?** yes — it changes who is named, not the simulation · **HOW TO CHECK** drive a game, read the Stars paragraph: no named player below 80; every named player at 80+ is described by his own line without an inflated verb.

**Change 2 — the praise must be earned (l.3035–3049).**
**WHERE** the `strong`/`blow` word pool and the per-group lines · **WHAT** pick the verb **from the grade**, not at random — a 90+ player gets the strongest register, an 80+ player a lighter one, and a player whose line is thin (a single catch, a short gain) gets **no compliment word at all**, only the facts · **WHY** "don't give explicit compliments just because a player caught one pass and scored a touchdown for eight yards" · **SAFE ALONE?** yes · **HOW TO CHECK** the same driven game: the 90+ player's line reads differently from the 80+ player's, and no line claims more than the stat line shows.

**Change 3 — a defender's ball eligibility (l.2680–2682).**
**WHERE** the `pool` filter and the `mvp` choice · **WHAT** a defender qualifies for the ball only if he **is the highest `perfGrade` in the game**, or he has a **notable event** — two or more turnovers, a blocked kick, a defensive touchdown, a sack with a fumble, a forced fumble — instead of "tackles or a pass deflection" · **WHY** the Owner's ruling, and the reason it matters: `impact` is relative to the role, so a defender with a quiet game can currently out-score the game's best offensive player · **SAFE ALONE?** **no — it depends on Change 1's grade gate**, because the same grade decides both the stars and the ball · **HOW TO CHECK** drive a game where a defender has tackles only: he is not the ball holder; drive one where he has two turnovers: he is.

**Change 4 — the ball holder must be in the Key Players (l.3743).**
**WHERE** the Key Players chart · **WHAT** the list is built by `notablePlayers(side)` (l.2687–2693), which picks the QB, the top RB, the top two receivers and the top three defenders — so a ball holder outside that set (a kicker, a tight end, a defensive lineman not in the top three) is **never in the chart, and the ⭐ has nothing to mark** · **WHAT (the fix)** union the `mvp` into the list, so the ⭐ always lands on a card · **WHY** the Owner reported a game ball that was not in the Key Players chart — this is the mechanism · **SAFE ALONE?** yes · **HOW TO CHECK** drive a game, confirm the ball holder is in the Key Players and carries the ⭐.

**One judgement call left to Claude:** whether a **tie game** should send the ball to the highest-graded player on either side (today: `winTeam` is null → `pool = all` → the highest `ballScore` wins) — the Owner's rule speaks of "the winning team", and a tie has none, so today's behaviour is a reasonable reading, but it should be a decision rather than an accident.

## 4 · What I did not check

- whether `statImpact` (l.2358) counts **blocked kicks, forced fumbles, fumble recoveries and defensive touchdowns** in a defender's raw score — the "notable event" test in Change 3 depends on it, and I did not read that function;
- the **`GAME_BALL_BIAS`** values (l.2676) and the `SLOT_BASE` table behind `gameZ` (l.2371) — how the 90+ threshold behaves per position in practice;
- the **Super Bowl MVP** path, which the l.2677 comment says shares the game-ball rule, and the other ball consumers (l.4504, 5360, 5578, 5829);
- any **simulation** of the new thresholds: every behaviour above is read from the code, not observed in a run.
