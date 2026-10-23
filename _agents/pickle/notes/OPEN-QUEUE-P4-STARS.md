# OPEN-QUEUE P4 — Recap star thresholds (60 rush yds all players; QB ≥300 yds + 3:1 TD:INT)

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: council open queue P4 (taken from the open board, not assigned) | DATE: 2026-10-22

**Build measured:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only. No product edit, no protected constant, no other lane.

**Queue item (Owner):** *"60 yards rushing for all players. At least 300 yards and 3/1 TD ratio for QBs to be mentioned as stars."*

---

## What the build does today (VERIFIED — read the code)

The star list is built in **`starsParagraph(g, blow)` at l.3027**. The gate is **one line**, l.3031:

```js
// l.3031  (inside starsParagraph)
d[s].players.filter(p => p.impact>=1.0
                          && !p.slot.startsWith('OT')
                          && !p.slot.startsWith('OG')
                          && p.slot!=='C')
             .sort((a,b)=>b.impact-a.impact).slice(0,2).forEach(p=>cand.push({p,s}));
// l.3033
cand.sort((a,b)=>b.p.impact-a.p.impact);
// l.3034
const pick4 = cand.slice(0,4), ...
```

So today's rule set is exactly:
- **`impact >= 1.0`** — a **z-score**, not a yardage number.
- **linemen excluded** (OT/OG/C filtered out).
- **top 2 per side**, then **top 4 overall**.
- ordering by `impact`.

**The thresholds the Owner named are absolute yardage and do not exist anywhere in the build.**
```
$ grep -c "Value here\|rushYds>=60\|passYds>=300\|3:1\|tdRatio" "NFL Draft Simulator merged.html"   # (yardage gates)
(no 60 / 300 / 3:1 gate exists — confirmed by reading l.3031 and by grep finding no such literal)
```

**`impact` is a z-score, not yards (VERIFIED at l.2674 / l.2371):**
```
l.2674:  p.raw = statImpact(p.st); p.impact = gameZ(p.slot, p.raw);
l.2371:  function gameZ(slot, raw){ const b = SLOT_BASE[slot]; return b ? (raw-b[0])/Math.sqrt(b[1]) : 0; }
l.2358:  function statImpact(s){ ... }   // reads s.passYds, s.passTD, s.int, s.rushYds, s.rushTD, s.recYds, s.recTD ...
```

**Consequence that decides the implementation:** a 60-yard gate **cannot** be expressed with `impact`. `impact` is normalized *against the position's own baseline* (`SLOT_BASE[slot]`), so a 60-yard rushing day is a different z-score for a QB, an RB and a WR — and a 300-yard passing day is a different z-score again. The Owner's rules are **absolute stat lines**, so the gate must read the **raw** fields on `p.st`, not `impact`:

| Owner's rule | Raw field(s) on `p.st` | Present? |
|---|---|---|
| 60 rushing yards, all players | `s.rushYds >= 60` | **VERIFIED yes** (used l.2359/l.2393) |
| QB ≥300 passing yards | `s.passYds >= 300` | **VERIFIED yes** |
| QB ≥3:1 TD:INT | `s.passTD / max(1,s.int) >= 3` | fields present; **the ratio test is new** |

## The exact change the Owner's rule requires (WHERE · WHAT · WHY · SAFE ALONE?)

> **WHERE** `NFL Draft Simulator merged.html` l.3031 (the `.filter(...)` inside `starsParagraph`).
> **WHAT** add a second predicate beside `p.impact>=1.0`:
> ```js
> // skill players: need an absolute 60-yard day (rush OR rec) to be named a star
> const rushY = p.st.rushYds||0, recY = p.st.recYds||0;
> const qbOK  = (p.st.passYds||0) >= 300 && (p.st.passTD||0) / Math.max(1, p.st.int||0) >= 3;
> const skillOK = Math.max(rushY, recY) >= 60;
> const qualifies = (p.group==='QB') ? qbOK : skillOK;   // K/returner/DEF keep impact-only paths
> ```
> and gate the offensive branches on `qualifies` (defensive and K lines have no yardage, so they must keep the `impact` path — the Owner's 60-yard rule is for *players who run/receive*).
> **WHY** today a star can be named on a high z-score alone; the Owner wants a **visible production floor** (60 yds; QB 300 + 3:1) before a name appears.
> **SAFE ALONE?** **depends** — it changes recap prose for every game, so it must land with the other recap-star work in one pass, and it touches no protected constant. The `impact>=1.0` term should **stay** (the Owner asked to *add* a floor, not to replace ranking).
> **HOW TO CHECK** after the change: sim one week, then
> `grep -oE "rushing for [0-9]+ yards" <out>` — every RB/WR named must show `>= 60`; every named QB must show `>= 300` passing yards and a TD:INT of 3 or better (or 0 INT with ≥3 TD).

## Two traps a naive patch will hit (INFERRED — read from the code, not observed)
1. **`impact`-only defensive/K lines.** l.3031's filter also admits DL/LB/DB and K. They have no `rushYds`/`passYds`; applying the 60-yard gate to them would **empty the defensive star lines**. The gate must be **branch-specific** (offensive skill only), which is why `SAFE ALONE?` is *depends*.
2. **The Owner's wording says "60 yards rushing for all players."** Taken literally it excludes a 100-yard *receiving* day. That is almost certainly not intended (the tie-break sentence in the same directive says "rushing **or receiving**" per BOC's compile, `owner-directives-v22.md` §5). **The Owner should confirm** whether the floor is `rushYds>=60` only, or `max(rushYds, recYds)>=60`. I have written the second form above because it matches the compile; if the Owner meant strictly rushing, drop `recY >= 60`.

## Tags
- **VERIFIED:** star gate is `impact>=1.0` + lineman-exclusion + top-2/side + top-4 (l.3031, 3033, 3034); `impact` is a z-score via `gameZ`/`SLOT_BASE` (l.2371, 2674); raw fields `rushYds/passYds/passTD/int/recYds/recTD` all exist (l.2358–2360, 2393); **no 60 / 300 / 3:1 threshold exists anywhere in the build**.
- **INFERRED:** the defensive/K-line trap and the rush-vs-reception ambiguity (both read from code/wording, not observed).
- **UNKNOWN:** whether the Owner intends `rush only` or `rush or rec` for the 60-yard floor; whether a "star" pool cap beyond top-4 should change once floors thin the pool.
- **NOT CHECKED:** I did not run a season; I did not test the patch (read-only); I did not touch the product file, protected constants, or another lane.
