# Patch notes — v10 (DS Flash)

**File patched:** `../NFL Draft Simulator.html` (the canonical Season-first build, 648,749 bytes before this patch)
**Rollback copy:** `NFL Draft Simulator (pre-v10 backup) (DS Flash).html` in this folder — byte-identical to the file as it stood at 01:15.
**Date:** 19 October 2026

Three defects fixed, all verified in Chromium against a full draft and season. The engine's maths is otherwise untouched.

---

## 1. Division tag looked forward in time

`meetingInfo()` filtered other meetings on `played`, not on whether they happened **before** the game being previewed. A Week 2 division game therefore read *"They already met in Week 11: Bills lost 13–11."*

```js
// before
const others = reg.concat(po).sort((a,b)=>(a.week||99)-(b.week||99));
const prior = others.filter(x=>x.played && x.result);

// after — one clock: weeks 1–18, then the four playoff rounds
const RKS = ['wildcard','divisional','champ','superbowl'];
const ord = new Map();
reg.forEach(x=>ord.set(x, x.week||0));
po.forEach(x=>{ const ri = RKS.findIndex(rk=>((S.playoffRounds||{})[rk]||[]).some(y=>y===x)); ord.set(x, 19+Math.max(0,ri)); });
let gOrd = g.week || 0;
if(!gOrd) gOrd = 19 + Math.max(0, RKS.findIndex(rk=>((S.playoffRounds||{})[rk]||[]).some(y=>y===g)));
const others = reg.concat(po).sort((a,b)=>(ord.get(a)||0)-(ord.get(b)||0));
const prior = others.filter(x=>x.played && x.result && (ord.get(x)||0) < gOrd);
```

**Verified:** 16 Week 1–2 division games, 0 mention a meeting. Week 11 games cite Week 2 and nothing later.

## 2. Nineteen percent of sacks were never credited

`buildDefenseDetail` dropped 18% of sacks to stand in for a rotation, so team sacks and player sacks disagreed. The rotation now exists as named players (`DL5`, `LB4`) with their own weights, and every sack is credited.

```js
// before
if(Math.random()<0.18) continue;   // credited to a rotation player outside the starting lineup

// after
['DL5','LB4'].forEach(s=>{ const e=get(s); if(e && !bySlot[s]) bySlot[s]={e, slot:s}; });
const sackers = ['DE1','DE2','DT1','DT2','MIKE','WILL','SAM','DL5','LB4'].filter(s=>bySlot[s]);
const sackW = {DE1:1.3,DE2:1.2,DT1:.9,DT2:.7,MIKE:.6,WILL:.6,SAM:.45,DL5:.42,LB4:.36};
```

`SLOT_GROUP` gained `DL5:'DL'` and `LB4:'LB'` so the new slots bucket correctly.

**Verified:** 1,229 team sacks = 1,229 credited sacks (100%, was 80.8%). 100-season sack leader **17.1 average, 21 maximum** (was 14.8 / 21); 20+ sack seasons 0.09 per league season (was 0.03), against roughly 0.1 in the record book.

## 3. The document was wrapped in a second document

The file opened with a second `<!doctype html><html><head>…<body>` and closed with an extra `</body></html>`. Its `:root{color-scheme:light}` beat the app's dark theme, so native selects and scrollbars rendered light on a dark page.

The wrapper's stylesheet is preserved and moved to the top of the real `<head>`; the document tags are deleted; `color-scheme` is now `light dark` so native controls follow the same preference the theme does. The `h1` label moved from `(OC v9)` to `(v10)`.

**Verified:** one `<html>` in source, dark select rendering, no change to layout, theme, or the 390 px overflow result.

---

## Measured after the patch

| Check | Before | After |
|---|---|---|
| Scoring events = final score | 272/272 | 272/272 |
| Sacks credited to a player | 80.8% | 100% |
| Sack leader, 100 seasons | 14.8 avg | 17.1 avg |
| Division tag on a Week 2 game | "met in Week 11" | no meeting mentioned |
| Page-level overflow at 390 px | none | none |
| Console errors | none | none |
| 100-season runtime | 45 s | 45–61 s |

---

## Found, not fixed — needs the owner's call

**141 of 832 starters line up out of phase** (4.4 per team) once the optimal lineup is applied. A centre starts at defensive tackle, a receiver at corner, a corner at tight end. `FLEX` allows it and the penalty is smaller than the OVR gap:

- `WR:{TE:4, SS:4, FS:4, CB:4, RB:6}`
- `C:{OG:0, OT:4, DT:4}`
- `CB:{SS:2, FS:0, MIKE:4, WILL:4, SAM:4, WR:4, TE:6, RB:6}`

The box score is already producing interceptions credited to receivers. The minimal fix is a phase guard — offence cannot start on defence and vice versa, whatever `FLEX` says — while keeping the realistic crossovers. That changes lineup maths, so it is recorded as R-9 in the doctrine and left for the owner.

---

## How to check it yourself

1. Open `NFL Draft Simulator.html`.
2. Draft → Sim to End → Play a Season → Start Season → Begin the season → Sim Rest of Season.
3. Open any Week 2 division game: the tag should not mention a meeting.
4. Open the defensive-line leaders: the sack totals should add up to the team sack column.
5. Open a one-turnover game: the Turnovers paragraph should name the quarterback and the defender.
