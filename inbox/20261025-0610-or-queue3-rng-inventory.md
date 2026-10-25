SPEAKER: OR | ROLE: Council Adviser | TASK: QUEUE-3 RNG inventory (T-20261022-claude-2) | DATE: 2026-10-25T06:10Z

RNG INVENTORY — Math.random() sites in Football-Sim-PreColors.html (sha256 40233d6be00e987c):

SUMMARY: 56 occurrences across 38 lines. No seed or injectable RNG exists — runs are not repeatable.

By category:

--- DRAFT/CPU ---
Line 1018: function shuffleArr(arr) — 1 site per loop iteration (Knuth shuffle). Category: DRAFT.
  j=Math.floor(Math.random()*(i+1)) — picks swap partner.
Line 1395: Front-office value block (no named function, inline in draft setup). Category: DRAFT/CPU.
  5 sites: Math.random()<0.33 · Math.random()*0.03 · Math.random()<0.35 · Math.random()*8 · Math.exp(0.5*randNormal()).
Line 1399: function cpuNoise(teamIndex) — 1 site. Category: DRAFT/CPU.
  Math.pow(Math.random(),1.0)*4.0 — noise SD init per team.
Line 1400: function cpuMiss(teamIndex) — 1 site. Category: DRAFT/CPU.
  Math.pow(Math.random(),0.9)*0.95 — miss probability per team.
Line 1434: Draft CPU pick loop — 1 site. Category: DRAFT/CPU.
  if(Math.random() < cpuMiss(teamIndex)) — CPU skip chance.
Line 1463: Random team selection — 1 site. Category: DRAFT/UI.
  Math.floor(Math.random()*all.length) — picks random team when userTeamName==='__random'.
Line 1469: Shuffle loop (teams order) — 1 site per iteration. Category: DRAFT.
  Math.floor(Math.random()*(i+1)) — Knuth shuffle swap.
Line 1474: Shuffle loop (others order) — 1 site per iteration. Category: DRAFT.
  Math.floor(Math.random()*(i+1)) — Knuth shuffle swap.
Line 1838: function pick(arr) — 1 site. Category: DRAFT/UI.
  arr[Math.floor(Math.random()*arr.length)] — random element picker.
Line 5245: Two random picks — 2 sites. Category: DRAFT/UI.
  Math.floor(Math.random()*HOT_T.length) · Math.floor(Math.random()*COLD_T.length).
Line 5561: Pool element selection — 1 site. Category: DRAFT/UI.
  Math.floor(Math.random()*(pool.length||T.length)).

--- GAME SIM ---
Line 1080: const flip = Math.random()<0.5; — 1 site. Category: GAME SIM.
Line 1923: function randNormal() — 2 sites (two while loops). Category: GAME SIM/UTILITY.
  u=Math.random() · v=Math.random() — Gaussian sample rejection sampling.
Line 1925: function poisson(lambda) — 1 site per loop iteration. Category: GAME SIM/UTILITY.
  p*=Math.random() — Poisson sampling.
Line 1929: let r = Math.random()*total; — 1 site. Category: GAME SIM/UTILITY.
Line 1983: Team aggressiveness assignment — 1 site. Category: GAME SIM.
  u=Math.random() — sets S.aggr[t] (balanced/cautious/aggressive).
Line 2174-2177: Penalty/distance branching — 3 sites. Category: GAME SIM.
  s===1: Math.random()<0.5 ? 0 : 3 · s===4: Math.random()<0.5 ? 3 : 6 · s===5: Math.random()<0.5 ? 6 : 3.
Line 2324: Overtime trigger — 1 site. Category: GAME SIM.
  Math.random()>0.08 — decides if OT happens when tied.
Line 2325: OT winner + scoring — 2 sites. Category: GAME SIM.
  Math.random()<normCdf(...) · Math.random()<0.35 ? 7 : 3.
Line 2333: OT timing offset — 1 site. Category: GAME SIM.
  t:0.5+Math.random()*0.3.
Line 2498: Pass TD probability — 1 site. Category: GAME SIM.
Line 2514: Two-point conversion try — 1 site. Category: GAME SIM.
Line 2515: Catchers selection — 1 site. Category: GAME SIM.
Line 2530: QB decision — 1 site. Category: GAME SIM.
Line 2589: RS coin flip — 1 site. Category: GAME SIM.
Line 2596: Fumble recovery — 1 site. Category: GAME SIM.
Line 2640: Kick return — 1 site. Category: GAME SIM.
Line 2641: Punt return — 1 site. Category: GAME SIM.
Line 2648: Defensive TD count — 1 site per oppTO iteration. Category: GAME SIM.
Line 2666: OL sack/pass assignment — 1 site. Category: GAME SIM.
Line 2668: OL pressure loop — 1 site per iteration. Category: GAME SIM.
Line 2745: Event timing — 1 site. Category: GAME SIM.
  e.t = Math.random() — random event time within quarter.
Line 3476: Season record caps — 1 site. Category: GAME SIM/AWARDS.
  Math.floor(Math.random()*35) — caps player stats at end of season.

--- UI ---
Line 6458: function confetti(n,colors,x0,y0,spread,speed) — ~9 sites. Category: UI.
  Math.random()-.5 · Math.random() · Math.random()*0.08 · Math.random()*6 · Math.random()*5 · Math.random()*6 · (Math.random()-.5)*.35 · Math.random()*colors.length · Math.random()*0.004.
Line 6459: function firework(x,y,colors) — ~4 sites. Category: UI.
  Math.random()*.1 · Math.random()*3.8 · Math.random()*colors.length · Math.random()*0.01.
Line 6485: Confetti burst trigger — 2 sites. Category: UI.
  Math.random()*0.7 · Math.random()*0.35.

HOW TO CHECK:
- grep -c "Math.random" Football-Sim-PreColors.html → 38 lines containing Math.random
- grep -o "Math.random" Football-Sim-PreColors.html | wc -l → 56 total occurrences
- No injectable seed exists → runs not repeatable (supports task T-20261022-claude-2)

SAFE ALONE?: YES — read-only inventory, no product edits.