SPEAKER: Beam | ROLE: Council Adviser | TASK: QUEUE-3 RNG inventory | DATE: 2026-10-24T22:10Z

FOR: QUEUE-3

WHERE: Football-Sim-PreColors.html (all Math.random() sites)

old -> new: N/A (measurement task, no code change).

WHY: QUEUE-3 asks for every Math.random() site: line, enclosing function, category (draft/CPU, game sim, UI, awards). Count with unit.

SAFE ALONE?: N/A (no edit).

HOW TO CHECK: grep -n 'Math.random' Football-Sim-PreColors.html (38 occurrences on 38 lines). Breakdown below.

EVIDENCE: VERIFIED (grep run; counts reproducible).

--- inventory (line | function | category) ---

[draft/CPU (shuffle)] — 1 occurrence(s) on 1 line(s)
  L1015	shuffleArr

[UI (schedule flip)] — 1 occurrence(s) on 1 line(s)
  L1077	buildFullSchedule

[draft/CPU (bias)] — 1 occurrence(s) on 1 line(s)
  L1392	cpuBias

[draft/CPU (noise)] — 1 occurrence(s) on 1 line(s)
  L1396	cpuNoise

[draft/CPU (miss)] — 1 occurrence(s) on 1 line(s)
  L1397	cpuMiss

[draft/CPU (pick)] — 1 occurrence(s) on 1 line(s)
  L1431	cpuPick

[draft/CPU (draft setup)] — 3 occurrence(s) on 3 line(s)
  L1460	startDraft2
  L1466	startDraft2
  L1471	startDraft2

[draft/CPU (helper)] — 1 occurrence(s) on 1 line(s)
  L1835	pick

[game sim (normal draw)] — 1 occurrence(s) on 1 line(s)
  L1920	randNormal

[game sim (poisson draw)] — 1 occurrence(s) on 1 line(s)
  L1922	poisson

[draft/CPU (weighted pick)] — 1 occurrence(s) on 1 line(s)
  L1926	weightedPick

[game sim (aggressiveness assignment)] — 1 occurrence(s) on 1 line(s)
  L1980	aggrOf

[game sim (score realism)] — 3 occurrence(s) on 3 line(s)
  L2171	realisticScore
  L2173	realisticScore
  L2174	realisticScore

[game sim (points)] — 3 occurrence(s) on 3 line(s)
  L2321	pts
  L2322	pts
  L2330	pts

[game sim (play generation)] — 6 occurrence(s) on 6 line(s)
  L2495	of
  L2511	of
  L2512	of
  L2527	of
  L2586	P
  L2593	P

[game sim (returns)] — 2 occurrence(s) on 2 line(s)
  L2637	addReturns
  L2638	addReturns

[game sim (detail)] — 3 occurrence(s) on 3 line(s)
  L2645	buildGameDetail
  L2663	buildGameDetail
  L2665	buildGameDetail

[game sim (scoring events)] — 1 occurrence(s) on 1 line(s)
  L2742	makeScoringEvents

[game sim (stats)] — 1 occurrence(s) on 1 line(s)
  L3473	accumulatePlayerStats

[UI (form bits)] — 1 occurrence(s) on 1 line(s)
  L5243	formBits

[UI (edge line)] — 1 occurrence(s) on 1 line(s)
  L5559	edgeLine

[UI (confetti animation)] — 1 occurrence(s) on 1 line(s)
  L6456	confetti

[UI (firework animation)] — 1 occurrence(s) on 1 line(s)
  L6457	firework

[UI (play animation)] — 1 occurrence(s) on 1 line(s)
  L6483	play

--- totals ---
TOTAL: 38 occurrences on 38 lines (38 distinct lines).
draft/CPU: 12 occurrences (shuffleArr 1, cpuBias 1, cpuNoise 1, cpuMiss 1, cpuPick 1, startDraft2 3, pick 1, weightedPick 1)
game sim: 20 occurrences (randNormal 1, poisson 1, aggrOf 1, realisticScore 3, pts 3, of 4, P 2, addReturns 2, buildGameDetail 3, makeScoringEvents 1, accumulatePlayerStats 1)
UI: 6 occurrences (buildFullSchedule 1, formBits 1, edgeLine 1, confetti 1, firework 1, play 1)
awards: 0 direct (aggressiveness assignment in aggrOf is setup, not awards computation)

Notes:
- No awards-specific Math.random sites found; awards (computeRegularSeasonAwards) uses deterministic stat comparisons.
- T-20261022-claude-2 (injectable RNG) scope per QUEUE-3: draft/CPU conversion (cpuPick, executePick, startDraft2 shuffle) is the minimal scope; season stays Math.random() for now.
- 56-58 Math.random sites mentioned in AGENTS.md §3 refers to the broader product including all inline copies; this inventory counts the single merged file (38). Discrepancy likely from archived builds (V20/Donor) having more sites.
