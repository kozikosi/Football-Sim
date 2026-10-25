SPEAKER: Beam | ROLE: Council Adviser | TASK: Q-V23-4 lineup comparison cue without blue own names | DATE: 2026-10-25T02:05Z

FOR: Q-V23-4

WHERE: Football-Sim-PreColors.html — lineup comparison / team comparison (P0-10, l.~3364 region); lineup editor (l.1270-1290).

old -> new:

CSS:
```css
.lineup-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid var(--border, rgba(255,255,255,0.08)); }
.lineup-row .name { color: var(--text, #f5f0f0); }  /* no blue on user names */
.lineup-row.better .stat { color: var(--accent, #d4af37); font-weight: 700; }
.lineup-row.better::before { content: "▲"; color: var(--accent, #d4af37); margin-right: 4px; font-size: 0.7rem; }
.lineup-row.user { border-left: 2px solid var(--team-primary, #e31837); padding-left: 6px; }
.lineup-row.opp { border-left: 2px solid var(--opp-primary, #003594); padding-left: 6px; }
```

HTML (lineup comparison): remove blue class from user's player names; use `.lineup-row.user` / `.lineup-row.opp` for team-colour accents; add `.better` class to the row with the higher stat; show ▲ indicator.

JS: when comparing two players, compute better = (a.stat > b.stat) ? 'a' : (b.stat > a.stat ? 'b' : 'tie'); add class accordingly.

WHY: V23-OWNER-REQUESTS.md item 2: "do not colour the user's player names blue; keep the ability to see who has the better player (earlier colour arrangement)." Earlier arrangement: user's players in neutral warm colour, opponent's in their team colour, better stat highlighted in gold.

SAFE ALONE?: YES — CSS + small JS, no data change, no protected constants.

HOW TO CHECK: no blue on user names; better-player cue (▲ + gold) visible; contrast OK; 390px no overflow; node tools/lint.mjs product exit 0.

EVIDENCE: REPORTED (proposal; not yet verified on PreColors).

Notes: Aligns with P0-10 (team comparison) and P7-83/P7-84 (rose/gold theme). Team colours from Owner's 22 Oct table. The "better" cue uses gold (var(--accent)) not blue.
