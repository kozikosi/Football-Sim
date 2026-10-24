# Cooper DeJean Glitch Analysis — BOC (pool item 12) — 21 Oct 2026

Read-only on `NFL Draft Simulator merged.html` (657,486 B, `40233d6b…`). No product edits.

## The glitch

Owner's example (round 2, QB taken in round 1):
```
Cooper DeJean  CB  PHI  89  +1.13  +0.81  −0.03  50%  FS
also fits: CB1 +1.37
CB1 CB2 CB3 / Nickel FS SS (flex −2) WR1 (flex −4) WR2 (flex −4) WR3 (flex −4)
MIKE (flex −4) WILL (flex −4) LB3 / SAM (flex −4) RB1 (flex −6) RB2 (flex −6)
TE1 (flex −6) TE2 (flex −6)
```

The "Fills" column shows **FS** (flex −2) as the best fit, even though **CB1** (natural, +1.37) has higher value. The "change" dropdown shows ALL eligible slots including weak flexes (−6, −8).

## Root cause (VERIFIED)

1. **`byP` logic (l.1756):** selects the slot with the highest priority score `rk(r) = Math.round(((r.pri != null ? r.pri : r.v) * 100))`. FS has higher priority (scarcity) than CB1, so FS is picked as the best fit even though CB1 has higher raw value. The comparison does not prefer natural slots over flex slots.

2. **`eligibleOpen` (l.1660):** returns all open slots in `POS_SLOT_MAP[pos]` including weak flexes (−6, −8). For a CB, POS_SLOT_MAP includes CB1-3, SS, FS, MIKE, WILL, SAM, WR, TE, RB — all of them. No filtering by penalty strength.

3. **Owner's rule (DB-12):** "Only display flex potential if (-2 or -4). (-6) flexes or (-8) can appear after the 20th round." This is not implemented — all flexes show always.

## Why DeJean isn't "naturally picked for CB"
The `byP` selection (l.1756) uses priority (scarcity) as the primary sort key, not natural-slot preference. When FS is scarcer than CB1, FS wins the "best fit" slot even though CB1 is natural and has higher value. The Owner expects: if a natural slot (CB1/CB2/CB3) is open, show that as the default fill, not a flex slot.

## Proposed fix (for Claude)

### Fix 1: Prefer natural slots in byP (l.1756)
When comparing candidates, if one is natural (penalty 0) and the other is flex (penalty > 0), prefer the natural slot unless the flex slot's priority is significantly higher (e.g., > 1.0 higher). Add a natural-slot bonus to the sort key:
```
const rk = x => Math.round(((x.pri != null ? x.pri : x.v) * 100)) + (x.flex ? 0 : 50);
```
This gives natural slots a +50 priority bonus, ensuring they're preferred unless a flex slot is dramatically better.

### Fix 2: Filter weak flexes in eligibleOpen (l.1660)
```
function eligibleOpen(roster, p){
  const round = draftSim ? Math.floor(draftSim.pos / 32) + 1 : 1;
  let o = (POS_SLOT_MAP[p[1]] || []).filter(s => !roster.slots[s]);
  if (round < 20) {
    o = o.filter(s => {
      const pen = flexPenaltyFor(p[1], s);
      return pen <= 4; // only -2 and -4 flexes before round 20
    });
  }
  return (!o.length && p[1] !== 'QB' && userEmergency(roster)) ? ROSTER_SLOTS.filter(s => !roster.slots[s]) : o;
}
```

### Fix 3: Hide FS flex in "Fills" display when a natural CB slot is open
In the `fills` rendering (l.1766), if the best slot is a flex and a natural slot is open, show the natural slot instead:
```
const naturalOpen = opts.filter(s => isNaturalSlot(r.p[1], s));
const displaySlot = naturalOpen.length > 0 ? naturalOpen[0] : r.slot;
const fills = displaySlot ? `${LABELS[displaySlot]||displaySlot}...` : 'Full';
```

## What BOC did not check
- Whether the `byP` change affects the "also fits" alternative selection (altTxt, l.1763).
- Whether hiding weak flexes in `eligibleOpen` affects the CPU draft (cpuPick uses POS_SLOT_MAP directly, not eligibleOpen, so CPU is unaffected).
- Whether the `round` variable is available in `eligibleOpen`'s scope (it reads `draftSim.pos`).
- Whether the "change" dropdown (`slotchg`, l.1766) should also filter weak flexes (Owner said "Except in the change menu" — so the change menu should show ALL options including -6/-8).

## Verdict
The glitch is caused by `byP` preferring priority (scarcity) over natural-slot fit, combined with `eligibleOpen` not filtering weak flexes. The fix is three small changes: (1) natural-slot bonus in byP, (2) weak-flex filtering in eligibleOpen before round 20, (3) prefer natural slot in Fills display. The "change" menu keeps showing all options (including -6/-8) per the Owner's instruction.
