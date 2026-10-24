# Re-cut Hunks: merge-team-guide.patch against current build — BOC — 21 Oct 2026

Build: `NFL Draft Simulator merged.html`, 656,746 B, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (V22 candidate).

The patch `merge-team-guide.patch` fails 2 of 11 hunks against this build. Both failures are because the patch was cut against an older version of the build that used string concatenation (`'+'+r.wpo.toFixed(3)`), while the current build uses template literals (`` `+${r.wpo.toFixed(3)}` ``). The re-cut hunks below match the current build exactly.

## Re-cut Hunk 1: slotRoleTableHTML (l.4902–4905)

Old (current build):
```
 const rows = slotRoleRows().map(r=>Object.assign({up:slotWins(r.slot,90)-slotWins(r.slot,70)}, r)).sort((a,b)=>b.up-a.up);
 const body = rows.map(r=>`<tr><td><b>${slotName(r.slot)}</b></td><td class="score">${r.up.toFixed(2)}</td><td class="score">${r.wpo>=0.0005?`+${r.wpo.toFixed(3)}`:'~0'}</td><td>${r.kick>0.5?'kicking only':`${(r.passShare*100).toFixed(0)}% pass · ${(r.runShare*100).toFixed(0)}% run`}</td><td class="narr">${r.roles.join(' · ')}</td></tr>`).join('');
 return `<table><thead><tr><th>Starting spot</th><th title="Extra wins per season if this spot goes from a 70 to a 90">Wins from a 70→90 upgrade</th><th>Wins per +1 rating</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;
```

New:
```
 const rows = slotRoleRows().map(r=>Object.assign({up:slotWins(r.slot,90)-slotWins(r.slot,70)}, r)).sort((a,b)=>b.wpo-a.wpo);
 const body = rows.map(r=>`<tr><td><b>${slotName(r.slot)}</b></td><td class="score">${r.wpo>=0.0005?`+${r.wpo.toFixed(3)}`:'~0'}</td><td>${r.kick>0.5?'kicking only':`${(r.passShare*100).toFixed(0)}% pass · ${(r.runShare*100).toFixed(0)}% run`}</td><td class="narr">${r.roles.join(' · ')}</td></tr>`).join('');
 return `<table><thead><tr><th>Starting spot</th><th>Wins per +1 rating</th><th title="Of this spot's wins, how many come from the passing game vs the running game (offense) or from stopping the pass vs stopping the run (defense)">Where the wins come from</th><th title="How much of each team-wide rating this one spot makes up">Share of each team rating it feeds</th></tr></thead><tbody>${body}</tbody></table>`;
```

## Re-cut Hunk 2: valueTiersHTML (l.4982–4984)

Old (current build):
```
 return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b> (${l[0].w.toFixed(1)}${l.length>1?`–${l[l.length-1].w.toFixed(1)}`:''} wins from a 70→90 upgrade): ${l.map(r=>slotName(r.s)).join(', ')}.</li>` : ''; }).join('')}</ul>`;
```

New:
```
 return `<ul class="gl">${tiers.map(([n,f])=>{ const l = rows.filter(f); return l.length ? `<li><b>${n}</b>: ${l.map(r=>slotName(r.s)).join(', ')}.</li>` : ''; }).join('')}</ul>`;
```

## Re-cut summary
- Hunk 1: sort by `b.wpo-a.wpo` instead of `b.up-a.up`; remove the "Wins from a 70→90 upgrade" column (header + cell); rename "Wins per +1 rating" → "Wins per +1 rating" (unchanged label, just column removed).
- Hunk 2: remove "wins from a 70→90 upgrade" from tier list → plain ordered list of slots.

Both hunks verified against the current build (template literals confirmed). The other 9 hunks of merge-team-guide.patch apply cleanly.

## Re-pinning
- Pin: `NFL Draft Simulator merged.html`, 656,746 B, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, @ current HEAD of `merge/v20-donor` (or wherever the build lives). The original pin (`40233d6b…`, 657,486 B) no longer matches any file in the working tree.

## Re-measurement
- Seeded A/B re-measurement: NOT performed by BOC (no browser access). The three patches that apply cleanly (value-here-keepsort, merge-items1-5, merge-guide-v21) were measured against the old build (`40233d6b…`); their evidence does not transfer to the new build until re-run. The re-cut hunks (above) are verified by string match only, not by A/B.
- BOC recommends: re-run the seeded A/B (seeded Math.random via Page.addScriptToEvaluateOnNewDocument) on the current build before Claude applies anything.

## What BOC did not check
- Live browser execution of any patch.
- Whether the current build's other strings (beyond these two hunks) match the patch's remaining 9 hunks (they apply cleanly per --dry-run, so they match).
- The v20 and donor builds (they fail 3 hunks each, worse than merged's 2).
- Whether the re-pinned build is the one Claude will actually edit (MOC should confirm).
