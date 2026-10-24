# P4 — Star-Selection Logic Audit (BOC) — 22 Oct 2026

Build: `Football-Sim-V21.html` · 656,746 B · sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`

## Question
Today's star thresholds vs Owner's directive: 60 rushing yards for all players; QBs need ≥300 yards and 3:1 TD:INT.

## Current code (l.3031)
```js
d[s].players.filter(p=>p.impact>=1.0 && !p.slot.startsWith('OT') && !p.slot.startsWith('OG') && p.slot!=='C')
  .sort((a,b)=>b.impact-a.impact).slice(0,2).forEach(p=>cand.push({p, s}));
```

Filter: impact ≥ 1.0, excludes OL. Top 2 per team → top 4 overall by impact.

## What the filter does NOT check
- No yardage threshold. A RB with 30 yards rushing but impact ≥ 1.0 can be a star.
- No QB-specific threshold. A QB with 150 yards and 1 TD can be a star if impact ≥ 1.0.
- No TD:INT ratio check.

## Owner's directive
1. "60 yards rushing for all players" — offensive skill players need ≥60 yards (rushing or receiving) to be mentioned.
2. "At least 300 yards and 3/1 TD ratio for QBs" — QBs need ≥300 pass yards AND ≥3:1 TD:INT.

## Proposed filter change (for Claude)
```js
d[s].players.filter(p=>{
  if(p.slot.startsWith('OT') || p.slot.startsWith('OG') || p.slot==='C') return false;
  if(p.impact < 1.0) return false;
  const st = p.st;
  if(p.group==='QB') return (st.passYds||0) >= 300 && (st.passTD||0) >= 3*(st.int||1);
  if(p.group==='RB') return (st.rushYds||0) + (st.recYds||0) >= 60;
  if(p.group==='WR' || p.group==='TE') return (st.recYds||0) >= 60;
  // Defensive players: keep impact-based (sacks, INTs, etc.)
  return true;
})
```

## What was deliberately not checked
- Whether the game ball logic (l.2674-2679) should also use these thresholds (separate from stars).
- Whether the 100-season report uses different star criteria.
- Whether the "Key Players" card view (l.3743) uses different criteria.

## Note on defensive players
The Owner's directive says "60 yards rushing for all players" — this implies offensive skill players. Defensive players are mentioned by their defensive stats (sacks, INTs, TFLs). The current impact-based filter already handles this. No change needed for defense.

## Reserve Stars slots for +90 rating performances
The Owner also mentioned: "Reserve Stars slots for +90 rating performances (internal, not shown to user)." This is an internal tracking feature, not a display change. The current code doesn't have this. Claude should decide whether to add it.
