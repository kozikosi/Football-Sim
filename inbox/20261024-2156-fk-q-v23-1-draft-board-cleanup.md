SPEAKER: FK | TASK: Q-V23-1 | DATE: 2026-10-24T21:56Z
FOR: V23-1 | QUEUE-3 | free idea

# Q-V23-1 — draft board: remove "also fits" and the stray line behind the first letter of player names

WHERE: Football-Sim-PreColors.html
- 261: `#draftTable2 tr{display:grid;grid-template-columns:repeat(12,1fr);gap:2px 4px;align-items:end;border:1px solid var(--border);border-left:4px solid var(--accent);border-radius:10px;margin:5px 0;padding:6px 8px;background:var(--panel2);}`
- 1763-1765: `const alt = r.slot ? ... : null; const altTxt = alt ? `<div class="narr" title="...">also fits: ...</div>` : ''; const fills = r.slot ? `${LABELS[r.slot]||r.slot}${flexTxt(r)}${altTxt}${opts.length>1? ...change... :''}` : 'Full';`

old -> new:
- 261: remove the `border-left:4px solid var(--accent);` from the draft board row style (candidate source of the stray line behind the first name column).
- 1763-1765: remove the `also fits` altTxt block and its interpolation into `fills`.

WHY: V23-OWNER-REQUESTS.md item 3 — Owner intent: draft board removes "also fits" and the stray line behind the first letter of player names; "TOP" stays but dynamic gold, no green; no dynamic colour on names, less blue; "Value here" removed from every visual incl. sort, kept only as background calculation.

SAFE ALONE?: yes — cosmetic UI change only; no math, no protected constants, no roster data.

HOW TO CHECK: `grep -n 'also fits' Football-Sim-PreColors.html` -> expect 0 hits after the change; reload draft board and confirm no stray line.

EVIDENCE: VERIFIED (also fits located at line 1764); INFERRED (stray line = row-level border-left at line 261).
