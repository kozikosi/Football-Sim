# OWNER-QUESTIONS.md — the concept-question queue

> **Generated** by `tools/owner-questions.mjs` on 2026-10-20. Do not hand-edit this file: edit `tools/question-bank.json` and re-run the generator.
> The durable record of answers is `ANSWERS.md` (append-only).

**Bank:** 53 questions · **open:** 53 · **answered:** 0 · **shown below:** 53

## How to answer (2 minutes each)

Reply in any order — by question ID. A sentence or two is enough; "ask me again with an example"
is a valid answer and very welcome. The answer becomes a decision input for the Architect, so
the useful answer is the _rule_, not the example.

If you want to record an answer yourself: `node tools/owner-questions.mjs --answer Q-OWNER-03 "your answer"`.

---

## The open queue

### Q-OWNER-24 — The NBA's unit of value  `[blocking]` · area: `nba-concepts`

**Question.** What is the NBA's equivalent of 'wins added at a slot' — total season value, points above replacement, win shares, or something custom? The draft's value system has to be rebuilt from first principles.

**Why it matters.** It is the deepest design question in the NBA pack.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1172` — `function lineupWins(slotmap){ let t = 0; ROSTER_SLOTS.forEach(sl=>{ const p = slotmap[sl]; t += slotWins(sl, p`
- `NFL Draft Simulator v20 Claude.html:1177` — `const cost = players.map(p=> ROSTER_SLOTS.map(sl=> eligibleSlotsFor(p).includes(sl) ? -slotWins(sl, effOvr(p, `
- `NFL Draft Simulator v20 Claude.html:459` — `function modelWeights(){`
- `NFL Draft Simulator v20 Claude.html:564` — `document.getElementById('modelWBtn').addEventListener('click', ()=>{ if(JSON.stringify(weights)!==JSON.stringi`
- `NFL Draft Simulator v20 Claude.html:452` — `const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 8`
- `NFL Draft Simulator v20 Claude.html:456` — `let weights = {...DEFAULT_WEIGHTS};`

> **Answer:**

---

### Q-OWNER-12 — The rating scale  `[blocking]` · area: `ratings-and-data`

**Question.** Should the all-time pools use exactly the current 60–99 scale and the same six attributes (speed, strength, agility, coordination, durability, awareness), or should each sport get attributes that mean something in that sport (e.g. 'handling' for a quarterback)?

**Why it matters.** Attribute names are what 1,200 raters will read every day; changing them later means re-rating.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:449` — `const PLAYERS = [["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,92,96,92,99,true],["Jaxon Smith-Njigba","`
- `NFL Draft Simulator v20 Claude.html:664` — `return groupAvgFromPool(PLAYERS.filter(p=>p[2]===team), def);`
- `NFL Draft Simulator v20 Claude.html:1897` — `const RATING_SPECS = {`
- `NFL Draft Simulator v20 Claude.html:1950` — `for(const k in RATING_SPECS) r[k] = wavgSlots(slotmap, RATING_SPECS[k]);`
- `NFL Draft Simulator v20 Claude.html:2046` — `const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.`
- `NFL Draft Simulator v20 Claude.html:2068` — `const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp`

> **Answer:**

---

### Q-OWNER-01 — What flex means  `[blocking]` · area: `flex-and-lineup`

**Question.** In our football sim, a flex player is one body that fills more than one slot type. Is that the concept you want carried into every sport, or is the NBA's equivalent something else entirely (positionless lineups, a big/small switch, a 3-point specialist role)?

**Why it matters.** Flex is the engine's most opinionated rule; every sport inherits or replaces it.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:894` — `// ---- FLEX RULES -------------------------------------------------------------------------------------------`
- `NFL Draft Simulator v20 Claude.html:896` — `// FLEX[tag] lists the other spots he may play: by exact slot (CB3) or by slot family (OT, OG, C, DE, DT, CB, `
- `NFL Draft Simulator v20 Claude.html:899` — `const NATURAL_SLOT_MAP = {`
- `NFL Draft Simulator v20 Claude.html:922` — `function isNaturalSlot(pos, slot){ const nat = NATURAL_SLOT_MAP[pos]; return !!(nat && nat.includes(slot)); }`
- `NFL Draft Simulator v20 Claude.html:940` — `function isOutOfPosition(pos, slot){ return !isNaturalSlot(pos, slot) && flexPenaltyFor(pos, slot) > 0; }`
- `NFL Draft Simulator v20 Claude.html:941` — `function flexPenaltyFor(pos, slot){`
- `NFL Draft Simulator v20 Claude.html:946` — `function effOvr(player, slot){`
- `NFL Draft Simulator v20 Claude.html:1172` — `function lineupWins(slotmap){ let t = 0; ROSTER_SLOTS.forEach(sl=>{ const p = slotmap[sl]; t += slotWins(sl, p`

> **Answer:**

---

### Q-OWNER-07 — The draft's meaning  `[blocking]` · area: `draft-rules`

**Question.** What is the draft for, in one sentence — a test of the user's football knowledge, a lottery of team strength, or a way to make the user's team feel earned? The answer changes what the sim should reward.

**Why it matters.** Every draft parameter (rounds, order, CPU behaviour) should follow from the purpose.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1368` — `function cpuPick(teamIndex, st){`
- `NFL Draft Simulator v20 Claude.html:1466` — `const pk = cpuPick(t);`
- `NFL Draft Simulator v20 Claude.html:1074` — `document.getElementById('startDraftBtn').addEventListener('click', startDraft2);`
- `NFL Draft Simulator v20 Claude.html:1408` — `function startDraft2(){`
- `NFL Draft Simulator v20 Claude.html:3372` — `const {draftEntries} = buildResultEntries();`
- `NFL Draft Simulator v20 Claude.html:3374` — `draftEntries.forEach(e=>{ teams[e.teamName] = {pool: e.pool, slotmap: e.slotmap, isUser: e.isUser}; });`

> **Answer:**

---

### Q-OWNER-19 — Teams in an all-time world  `[blocking]` · area: `all-time-mode`

**Question.** In an all-time mode, do the 32 teams keep today's names and cities with legends on them, or do we use historical teams and eras (e.g. the 1985 Bears as a roster)?

**Why it matters.** It is the first thing a user sees and it changes the whole framing.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:450` — `const TEAM_DATA = {"Cincinnati Bengals":{"DE1":{"ovr":78,"name":"Boye Mafe"},"DE2":{"ovr":77,"name":"Cashius H`
- `NFL Draft Simulator v20 Claude.html:478` — `const slotmap = TEAM_DATA[team];`
- `NFL Draft Simulator v20 Claude.html:6083` — `renderDraftResults();`
- `NFL Draft Simulator v20 Claude.html:6124` — `function renderDraftResults(){`

> **Answer:**

---

### Q-OWNER-32 — Season length and feel  `[blocking]` · area: `season-and-playoffs`

**Question.** Should a simulated season keep the real length (17 NFL games, 82 NBA games), or is a shorter season acceptable if it makes the sim better to use?

**Why it matters.** It sets the rhythm of every session a user has.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3434` — `function simulateCurrentWeek(){`
- `NFL Draft Simulator v20 Claude.html:3449` — `if(!seasonState.weekSimulated) simulateCurrentWeek();`
- `NFL Draft Simulator v20 Claude.html:3391` — `const before = {}; Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ before[k] = rec.st[k]||0; });`
- `NFL Draft Simulator v20 Claude.html:3394` — `if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAP`

> **Answer:**

---

### Q-OWNER-45 — One engine or many  `[blocking]` · area: `platform-and-process`

**Question.** Should all the sports share one engine (one draft engine, one season engine, different profiles), or is it acceptable for each sport to have its own engine if that produces a better game?

**Why it matters.** It is the platform's central architectural question, and it is yours to set the direction of.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1172` — `function lineupWins(slotmap){ let t = 0; ROSTER_SLOTS.forEach(sl=>{ const p = slotmap[sl]; t += slotWins(sl, p`
- `NFL Draft Simulator v20 Claude.html:1177` — `const cost = players.map(p=> ROSTER_SLOTS.map(sl=> eligibleSlotsFor(p).includes(sl) ? -slotWins(sl, effOvr(p, `
- `NFL Draft Simulator v20 Claude.html:1174` — `function optimalLineup(slotmap){`
- `NFL Draft Simulator v20 Claude.html:1190` — `function optimizeCpuLineups(){ draftSim.rosters.forEach(r=>{ if(!r.isUser) applyLineup(r, optimalLineup(r.slot`
- `NFL Draft Simulator v20 Claude.html:1274` — `S.unitRatings[user] = teamRatings(S.teams[user].slotmap);`
- `NFL Draft Simulator v20 Claude.html:1297` — `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, l`

> **Answer:**

---

### Q-OWNER-37 — What a season is 'for'  `[now]` · area: `awards-and-presentation`

**Question.** When a season ends, what should the user feel they have achieved: a title, a playoff run, a record, an award, or a personal best team?

**Why it matters.** It decides which outputs the season view should lead with.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3458` — `seasonState.awardsRS = computeRegularSeasonAwards();`
- `NFL Draft Simulator v20 Claude.html:5661` — `function computeRegularSeasonAwards(){`
- `NFL Draft Simulator v20 Claude.html:3810` — `if(sim) sim.addEventListener('click', ()=>{ simulateCurrentWeek(); renderSeasonTab(container); });`
- `NFL Draft Simulator v20 Claude.html:3812` — `if(nxt) nxt.addEventListener('click', ()=>{ advanceWeek(); renderSeasonTab(container); });`
- `NFL Draft Simulator v20 Claude.html:5776` — `function renderSeasonCompleteView(container){`
- `NFL Draft Simulator v20 Claude.html:6058` — `else if(seasonState.phase==='complete') renderSeasonCompleteView(container);`

> **Answer:**

---

### Q-OWNER-41 — How realistic must it be  `[now]` · area: `simulation-realism`

**Question.** Where is the line between 'a fun simulation' and 'a simulation you would not be embarrassed by'? Are approximate margins acceptable if the narrative is convincing?

**Why it matters.** It sets the accuracy budget for every model in every sport.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2046` — `const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.`
- `NFL Draft Simulator v20 Claude.html:2068` — `const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp`
- `NFL Draft Simulator v20 Claude.html:2009` — `const PLAN_K = { kRun:1.4, kPass:0.85, kTo:1.0, kSack:0.9, rAmp:3.0, pAmp:2.5, vm:1.3, kBlock:1, predict:0.38,`
- `NFL Draft Simulator v20 Claude.html:2025` — `out.olRun = O.olRun + PERS[p].tbw*(blk-75)*PLAN_K.kBlock;`
- `NFL Draft Simulator v20 Claude.html:2245` — `function simulateGame(homeSM, awaySM, isPlayoff, lg, plans){`
- `NFL Draft Simulator v20 Claude.html:3402` — `g.result = simulateGame(hs, as, isPlayoff, seasonState.league, ensureGamePlans(g));`

> **Answer:**

---

### Q-OWNER-50 — Mobile first  `[now]` · area: `ui-and-experience`

**Question.** Should every new sim be designed mobile-first (390 px) rather than adapted to a phone later? The current sim had a layout defect that only appeared after a viewport change.

**Why it matters.** It is a cheap decision now and an expensive one later.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:291` — `table.mstack{display:block;overflow:visible !important;width:100%;}`
- `NFL Draft Simulator v20 Claude.html:292` — `table.mstack thead{display:none;}`
- `NFL Draft Simulator v20 Claude.html:6418` — `if(t.dataset.msChecked && t.dataset.msChecked===String(t.rows.length)) return;`
- `NFL Draft Simulator v20 Claude.html:6419` — `t.dataset.msChecked = String(t.rows.length);`

> **Answer:**

---

### Q-OWNER-25 — The NBA's draft shape  `[blocking]` · area: `nba-concepts`

**Question.** The real NBA draft is 2 rounds, 30 teams, and 60 picks — a thin event compared with 26 rounds. Should the NBA sim instead run a league-wide expansion draft (every team rebuilding from the whole pool), which is the direct analogue of our football draft?

**Why it matters.** It determines whether the NBA sim's core loop is interesting at all.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1368` — `function cpuPick(teamIndex, st){`
- `NFL Draft Simulator v20 Claude.html:1466` — `const pk = cpuPick(t);`
- `NFL Draft Simulator v20 Claude.html:1074` — `document.getElementById('startDraftBtn').addEventListener('click', startDraft2);`
- `NFL Draft Simulator v20 Claude.html:1408` — `function startDraft2(){`
- `NFL Draft Simulator v20 Claude.html:892` — `const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','DE1','DE2','`
- `NFL Draft Simulator v20 Claude.html:893` — `const TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/C`

> **Answer:**

---

### Q-OWNER-13 — The −5 rule  `[blocking]` · area: `ratings-and-data`

**Question.** 'All top current players are eligible with around a −5 to their score' — does −5 apply to the overall rating only, or to every attribute? And is it exactly 5, or a judgement (a Hall of Famer at −2, a fringe starter at −8)?

**Why it matters.** It changes both the pool and the maths of a draft over it.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:449` — `const PLAYERS = [["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,92,96,92,99,true],["Jaxon Smith-Njigba","`
- `NFL Draft Simulator v20 Claude.html:664` — `return groupAvgFromPool(PLAYERS.filter(p=>p[2]===team), def);`

> **Answer:**

---

### Q-OWNER-02 — Flex penalty shape  `[blocking]` · area: `flex-and-lineup`

**Question.** How harsh should a flex penalty be? Today a player used out of position loses rating according to a table (FLEX). Should the penalty be a flat point deduction, a percentage, or position-dependent (guards out of position hurt less than a centre at wideout)?

**Why it matters.** A single number or a curve decides whether drafting a multi-position player is a real edge or a trap.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:894` — `// ---- FLEX RULES -------------------------------------------------------------------------------------------`
- `NFL Draft Simulator v20 Claude.html:896` — `// FLEX[tag] lists the other spots he may play: by exact slot (CB3) or by slot family (OT, OG, C, DE, DT, CB, `
- `NFL Draft Simulator v20 Claude.html:940` — `function isOutOfPosition(pos, slot){ return !isNaturalSlot(pos, slot) && flexPenaltyFor(pos, slot) > 0; }`
- `NFL Draft Simulator v20 Claude.html:941` — `function flexPenaltyFor(pos, slot){`
- `NFL Draft Simulator v20 Claude.html:946` — `function effOvr(player, slot){`
- `NFL Draft Simulator v20 Claude.html:1172` — `function lineupWins(slotmap){ let t = 0; ROSTER_SLOTS.forEach(sl=>{ const p = slotmap[sl]; t += slotWins(sl, p`

> **Answer:**

---

### Q-OWNER-08 — Draft length and roster building  `[now]` · area: `draft-rules`

**Question.** Should the draft stay 26 rounds to fill 26 starter slots, and should a team also have to fill a bench? For the NBA (2 rounds) the draft cannot fill a rotation, so what fills it?

**Why it matters.** It is the difference between a draft and a roster assembly.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:892` — `const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','DE1','DE2','`
- `NFL Draft Simulator v20 Claude.html:893` — `const TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/C`
- `NFL Draft Simulator v20 Claude.html:1368` — `function cpuPick(teamIndex, st){`
- `NFL Draft Simulator v20 Claude.html:1466` — `const pk = cpuPick(t);`
- `NFL Draft Simulator v20 Claude.html:828` — `else if(typeof draftSim!=='undefined' && draftSim && draftSim.pos>=draftSim.order.length) step = 'season';`
- `NFL Draft Simulator v20 Claude.html:1054` — `let draftSim = null;`

> **Answer:**

---

### Q-OWNER-20 — What an all-time draft is  `[blocking]` · area: `all-time-mode`

**Question.** Should the all-time draft be a straight draft of the legend pool (the strongest player available is best), or should there be a rule that rewards building a complete team (take a Hall of Famer even if you have enough linebackers)?

**Why it matters.** This is what makes the all-time mode a different game rather than a re-skin.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1368` — `function cpuPick(teamIndex, st){`
- `NFL Draft Simulator v20 Claude.html:1466` — `const pk = cpuPick(t);`
- `NFL Draft Simulator v20 Claude.html:452` — `const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 8`
- `NFL Draft Simulator v20 Claude.html:456` — `let weights = {...DEFAULT_WEIGHTS};`

> **Answer:**

---

### Q-OWNER-33 — Playoff shape  `[now]` · area: `season-and-playoffs`

**Question.** Should the playoff bracket keep the real shape per sport (14-team NFL wildcards, 16-team NBA play-in) or be simplified for playability?

**Why it matters.** The bracket is the climax of every season; the shape is a strong statement of realism.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3855` — `function renderPlayoffsView(container){`
- `NFL Draft Simulator v20 Claude.html:6057` — `else if(seasonState.phase==='playoffs') renderPlayoffsView(container);`
- `NFL Draft Simulator v20 Claude.html:3464` — `function startPlayoffs(){`
- `NFL Draft Simulator v20 Claude.html:3851` — `{ const bp = document.getElementById('beginPlayoffsBtn'); if(bp) bp.addEventListener('click', ()=>{ startPlayo`

> **Answer:**

---

### Q-OWNER-46 — The website's shape  `[now]` · area: `platform-and-process`

**Question.** Should the simulations be separate pages you open individually, or one page with a sport picker that loads the chosen sim?

**Why it matters.** It decides whether the portal is an index or an app.

> **Answer:**

---

### Q-OWNER-38 — The box score  `[now]` · area: `awards-and-presentation`

**Question.** Which stats must a box score contain to feel right to you — in football we show yards, attempts, touchdowns, sacks, turnovers; in basketball, points, rebounds, assists, shooting splits, turnovers, blocks, steals?

**Why it matters.** It is the most-read screen in the product.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2979` — `function playByPlay(g, pEnd, halfTxt, collapse){`
- `NFL Draft Simulator v20 Claude.html:3100` — `const pbp = playByPlay(g, pEnd, half, collapse);`
- `NFL Draft Simulator v20 Claude.html:3855` — `function renderPlayoffsView(container){`
- `NFL Draft Simulator v20 Claude.html:6057` — `else if(seasonState.phase==='playoffs') renderPlayoffsView(container);`

> **Answer:**

---

### Q-OWNER-42 — Upsets and randomness  `[now]` · area: `simulation-realism`

**Question.** How much randomness do you want? A 5% upset rate in every game, or more variance early in a season and less in the playoffs?

**Why it matters.** It is the difference between a predictable sim and a story-shaped one.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2245` — `function simulateGame(homeSM, awaySM, isPlayoff, lg, plans){`
- `NFL Draft Simulator v20 Claude.html:3402` — `g.result = simulateGame(hs, as, isPlayoff, seasonState.league, ensureGamePlans(g));`
- `NFL Draft Simulator v20 Claude.html:1290` — `if(isOff) return OFF_OPTS.reduce((m,o)=>Math.max(m, matchupModel(R, lg, lg, {off:o, def:DEFAULT_DEF}).structPt`
- `NFL Draft Simulator v20 Claude.html:1291` — `return -DEF_OPTS.reduce((m,d)=>Math.min(m, matchupModel(lg, R, lg, {off:NEUTRAL_OFF, def:d}).structPts), 1e9);`

> **Answer:**

---

### Q-OWNER-51 — The visual language  `[now]` · area: `ui-and-experience`

**Question.** Should all the sports share one visual identity (dark, dense, data-first) or should each sport have its own look (NBA: hardwood and team colours)?

**Why it matters.** It decides whether the portal feels like one product or eight.

> **Answer:**

---

### Q-OWNER-26 — The NBA's matchup model  `[now]` · area: `nba-concepts`

**Question.** Which factors should drive a game's expected result: pace, offensive/defensive efficiency, three-point rate and accuracy, free throws, turnovers, rebounding, and rim coverage? Which of these would you most want visible in the box score?

**Why it matters.** It is the NBA's version of the football model's nine unit ratings.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2046` — `const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.`
- `NFL Draft Simulator v20 Claude.html:2068` — `const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp`
- `NFL Draft Simulator v20 Claude.html:2009` — `const PLAN_K = { kRun:1.4, kPass:0.85, kTo:1.0, kSack:0.9, rAmp:3.0, pAmp:2.5, vm:1.3, kBlock:1, predict:0.38,`
- `NFL Draft Simulator v20 Claude.html:2025` — `out.olRun = O.olRun + PERS[p].tbw*(blk-75)*PLAN_K.kBlock;`
- `NFL Draft Simulator v20 Claude.html:1274` — `S.unitRatings[user] = teamRatings(S.teams[user].slotmap);`
- `NFL Draft Simulator v20 Claude.html:1297` — `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, l`

> **Answer:**

---

### Q-OWNER-14 — How many current players  `[blocking]` · area: `ratings-and-data`

**Question.** How many of the ~1,200 all-time slots are current players (at −5) and how many are legends? And which current players qualify as 'top' — first team all-pro only, or a larger tier?

**Why it matters.** The pool's composition decides how the all-time draft plays.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:449` — `const PLAYERS = [["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,92,96,92,99,true],["Jaxon Smith-Njigba","`
- `NFL Draft Simulator v20 Claude.html:664` — `return groupAvgFromPool(PLAYERS.filter(p=>p[2]===team), def);`
- `NFL Draft Simulator v20 Claude.html:450` — `const TEAM_DATA = {"Cincinnati Bengals":{"DE1":{"ovr":78,"name":"Boye Mafe"},"DE2":{"ovr":77,"name":"Cashius H`
- `NFL Draft Simulator v20 Claude.html:478` — `const slotmap = TEAM_DATA[team];`

> **Answer:**

---

### Q-OWNER-03 — The NBA's flex  `[blocking]` · area: `flex-and-lineup`

**Question.** For the NBA: which positions can cover which others, and at what cost? Concretely: can a point guard start at shooting guard, can a small forward play centre, and is a 'positionless' player (e.g. a Ben Simmons type) a distinct archetype the data should represent?

**Why it matters.** The NBA pack's flex rules are the single largest behavioural difference from the football pack.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:894` — `// ---- FLEX RULES -------------------------------------------------------------------------------------------`
- `NFL Draft Simulator v20 Claude.html:896` — `// FLEX[tag] lists the other spots he may play: by exact slot (CB3) or by slot family (OT, OG, C, DE, DT, CB, `
- `NFL Draft Simulator v20 Claude.html:899` — `const NATURAL_SLOT_MAP = {`
- `NFL Draft Simulator v20 Claude.html:922` — `function isNaturalSlot(pos, slot){ const nat = NATURAL_SLOT_MAP[pos]; return !!(nat && nat.includes(slot)); }`

> **Answer:**

---

### Q-OWNER-09 — CPU GM behaviour  `[now]` · area: `draft-rules`

**Question.** Should the CPU GMs be good but imperfect (missing a few obvious picks, occasionally reaching), or near-optimal? And do you want them to value 'need' (a team with a weak position drafting one) as well as 'value'?

**Why it matters.** The CPU draft is the main opponent most users will ever feel.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1368` — `function cpuPick(teamIndex, st){`
- `NFL Draft Simulator v20 Claude.html:1466` — `const pk = cpuPick(t);`
- `NFL Draft Simulator v20 Claude.html:1357` — `function cpuBias(teamIndex, group){`
- `NFL Draft Simulator v20 Claude.html:1383` — `const v = w*cpuBias(teamIndex, g)*nz + 0.002*p[3];`
- `NFL Draft Simulator v20 Claude.html:1364` — `function cpuNoise(teamIndex){ draftSim.noiseSd = draftSim.noiseSd || {}; if(draftSim.noiseSd[teamIndex]==null)`
- `NFL Draft Simulator v20 Claude.html:1377` — `const nz = Math.max(0.02, 1 + cpuNoise(teamIndex)*randNormal());`
- `NFL Draft Simulator v20 Claude.html:1365` — `function cpuMiss(teamIndex){ draftSim.missP = draftSim.missP || {}; if(draftSim.missP[teamIndex]==null) draftS`
- `NFL Draft Simulator v20 Claude.html:1389` — `if(cands.length>8 && Math.random() < cpuMiss(teamIndex)){ cands.sort((a,b)=>b.v-a.v); const c = cands[3 + Math`

> **Answer:**

---

### Q-OWNER-21 — All-time scores and records  `[now]` · area: `all-time-mode`

**Question.** In an all-time season, should the statistical records (single-game yards, season yards) still be capped at real NFL records, or should the all-time world have its own (much larger) records?

**Why it matters.** It is a display question with a big feel: an all-time season should look extraordinary.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3391` — `const before = {}; Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ before[k] = rec.st[k]||0; });`
- `NFL Draft Simulator v20 Claude.html:3394` — `if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAP`

> **Answer:**

---

### Q-OWNER-34 — Home field and scheduling  `[now]` · area: `season-and-playoffs`

**Question.** Should home-court advantage and schedule strength be modelled (as today), and should the schedule look like a real one (division rivals twice, conference play)?

**Why it matters.** It is what makes a simulated season feel like a season.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1274` — `S.unitRatings[user] = teamRatings(S.teams[user].slotmap);`
- `NFL Draft Simulator v20 Claude.html:1297` — `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, l`
- `NFL Draft Simulator v20 Claude.html:1290` — `if(isOff) return OFF_OPTS.reduce((m,o)=>Math.max(m, matchupModel(R, lg, lg, {off:o, def:DEFAULT_DEF}).structPt`
- `NFL Draft Simulator v20 Claude.html:1291` — `return -DEF_OPTS.reduce((m,d)=>Math.min(m, matchupModel(lg, R, lg, {off:NEUTRAL_OFF, def:d}).structPts), 1e9);`

> **Answer:**

---

### Q-OWNER-47 — Quality over quantity  `[now]` · area: `platform-and-process`

**Question.** Would you rather have 3 excellent simulations (NFL current, NFL all-time, NBA current) than 8 uneven ones? What is the bar for a sport being 'ready'?

**Why it matters.** It sets the standard the council should hold itself to as the platform grows.

> **Answer:**

---

### Q-OWNER-39 — The recap  `[now]` · area: `awards-and-presentation`

**Question.** What makes a good game recap in your eyes — who the story is about, how much narrative, how much analysis of the matchup?

**Why it matters.** The recap is the product's voice; it should sound like you.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3031` — `function generateGameSummary(g, ctx){`
- `NFL Draft Simulator v20 Claude.html:3442` — `if(g.home===user || g.away===user) g.summary = generateGameSummary(g, {recHome:recStr(st,g.home), recAway:recS`
- `NFL Draft Simulator v20 Claude.html:2979` — `function playByPlay(g, pEnd, halfTxt, collapse){`
- `NFL Draft Simulator v20 Claude.html:3100` — `const pbp = playByPlay(g, pEnd, half, collapse);`
- `NFL Draft Simulator v20 Claude.html:2707` — `function factorParagraph(g){`
- `NFL Draft Simulator v20 Claude.html:3140` — `const p3 = (factorParagraph(g) + ' ' + impl).trim() + (planParagraph(g) ? `</p><p class="detail-item"><b>Game `

> **Answer:**

---

### Q-OWNER-43 — The comeback and the script  `[now]` · area: `simulation-realism`

**Question.** Should the sim still 'script' late-game drama (trailing team scores, defensive stops, the two-minute warning)?

**Why it matters.** It is a signature of the current sim and a judgement call about realism.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2245` — `function simulateGame(homeSM, awaySM, isPlayoff, lg, plans){`
- `NFL Draft Simulator v20 Claude.html:3402` — `g.result = simulateGame(hs, as, isPlayoff, seasonState.league, ensureGamePlans(g));`
- `NFL Draft Simulator v20 Claude.html:2834` — `function dramaticEnding(g, ctx){`
- `NFL Draft Simulator v20 Claude.html:3098` — `const pEnd = dramaticEnding(g, ctx);`

> **Answer:**

---

### Q-OWNER-52 — The sport's vocabulary  `[now]` · area: `ui-and-experience`

**Question.** Should the interface use the sport's own language (football: snaps, drives; basketball: possessions, points, +/-), and should it change with the sport?

**Why it matters.** It is the difference between a translated app and a native one.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3031` — `function generateGameSummary(g, ctx){`
- `NFL Draft Simulator v20 Claude.html:3442` — `if(g.home===user || g.away===user) g.summary = generateGameSummary(g, {recHome:recStr(st,g.home), recAway:recS`
- `NFL Draft Simulator v20 Claude.html:4918` — `function guideHTMLCached(){ return _guideHtml || (_guideHtml = renderGuideHTML()); }`
- `NFL Draft Simulator v20 Claude.html:4920` — `function renderGuideHTML(){`

> **Answer:**

---

### Q-OWNER-27 — Rosters and minutes  `[now]` · area: `nba-concepts`

**Question.** What is a roster in the NBA sim — 13 active + 3 G-League? 15? And should minutes and roles (starter, sixth man, closer, energy big) be simulated explicitly?

**Why it matters.** Rotations are the NBA's real draft payoff; without them the season feels thin.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:892` — `const ROSTER_SLOTS = ['QB','RB1','RB2','WR1','WR2','WR3','TE1','TE2','OT1','OT2','OG1','OG2','C','DE1','DE2','`
- `NFL Draft Simulator v20 Claude.html:893` — `const TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/C`
- `NFL Draft Simulator v20 Claude.html:1274` — `S.unitRatings[user] = teamRatings(S.teams[user].slotmap);`
- `NFL Draft Simulator v20 Claude.html:1297` — `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, l`

> **Answer:**

---

### Q-OWNER-15 — Who decides the ratings  `[now]` · area: `ratings-and-data`

**Question.** For the NFL all-time pool, should there be one agreed rubric and independent raters (median), or a single authority (you) who sets the ratings and the council only reviews them?

**Why it matters.** The method is the deliverable; the rubric decides the pool's coherence.

> **Answer:**

---

### Q-OWNER-04 — Lineup editing and the optimizer  `[now]` · area: `flex-and-lineup`

**Question.** Should the user be allowed to hand-pick a lineup that is worse than the computed best, and should the app still tell them it is worse? Today the same optimizer runs for the user (advisory) and for the CPU (binding).

**Why it matters.** It sets the tone: is the sim a calculator or a sandbox?

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1174` — `function optimalLineup(slotmap){`
- `NFL Draft Simulator v20 Claude.html:1190` — `function optimizeCpuLineups(){ draftSim.rosters.forEach(r=>{ if(!r.isUser) applyLineup(r, optimalLineup(r.slot`
- `NFL Draft Simulator v20 Claude.html:1245` — `function lineupEditorHTML(roster, hostId){`
- `NFL Draft Simulator v20 Claude.html:4990` — `${lineupEditorHTML(roster, 'lineupPre')}</div>`;`

> **Answer:**

---

### Q-OWNER-10 — Trade and free agency  `[now]` · area: `draft-rules`

**Question.** Should there be a trades phase or a free-agency phase after the draft, or is the draft the entire roster-building event?

**Why it matters.** A league draft plus free agency is a very different product from a pure draft.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1461` — `if(userIsStuck()){ finishDraft2(); return; }`
- `NFL Draft Simulator v20 Claude.html:1470` — `finishDraft2();`
- `NFL Draft Simulator v20 Claude.html:6083` — `renderDraftResults();`
- `NFL Draft Simulator v20 Claude.html:6124` — `function renderDraftResults(){`

> **Answer:**

---

### Q-OWNER-22 — How the all-time mode differs  `[now]` · area: `all-time-mode`

**Question.** In one sentence, what should an all-time season FEEL like compared with today's? (More scoring? More parity? More chaos? Bigger upsets?)

**Why it matters.** It is the brief for every number in the all-time pack.

> **Answer:**

---

### Q-OWNER-35 — The user's control  `[now]` · area: `season-and-playoffs`

**Question.** How much of the season should the user steer — nothing (watch it play out), the game plan and lineup only, or week-by-week decisions including trades?

**Why it matters.** It is the difference between a simulation and a game.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2020` — `function applyOffPlan(O, po){`
- `NFL Draft Simulator v20 Claude.html:2062` — `const O = applyOffPlan(O0, po), LO = applyOffPlan(lg, po);`
- `NFL Draft Simulator v20 Claude.html:2028` — `function applyDefPlan(D, pd, isLeague){`
- `NFL Draft Simulator v20 Claude.html:2063` — `const D = applyDefPlan(D0, pd, false), LD = applyDefPlan(lg, pd, true);`
- `NFL Draft Simulator v20 Claude.html:4491` — `function planWhy(g, side){`
- `NFL Draft Simulator v20 Claude.html:4633` — `const why = planWhy(g, side);`

> **Answer:**

---

### Q-OWNER-48 — The ranking of the NFL sim  `[now]` · area: `platform-and-process`

**Question.** If the all-time mode and the NBA sim compete for engineering time with the V21 build, which wins?

**Why it matters.** Priority 1 is the current sim; this makes the order explicit when it is tested.

> **Answer:**

---

### Q-OWNER-40 — The trophies  `[later]` · area: `awards-and-presentation`

**Question.** Should the sim keep a season history (past champions, records, award winners) across sessions, or is each season a self-contained experience?

**Why it matters.** It decides whether a save file is needed at all.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3391` — `const before = {}; Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ before[k] = rec.st[k]||0; });`
- `NFL Draft Simulator v20 Claude.html:3394` — `if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAP`
- `NFL Draft Simulator v20 Claude.html:6040` — `try{ checkRewards(); }catch(e){}`
- `NFL Draft Simulator v20 Claude.html:6381` — `function checkRewards(){`

> **Answer:**

---

### Q-OWNER-44 — Weather and venues  `[later]` · area: `simulation-realism`

**Question.** Should outdoor games have weather and indoor ones not — and should the venue (roof, turf, crowd) matter?

**Why it matters.** It is a small realism lever that can be very atmospheric.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:2046` — `const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.`
- `NFL Draft Simulator v20 Claude.html:2068` — `const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp`
- `NFL Draft Simulator v20 Claude.html:2245` — `function simulateGame(homeSM, awaySM, isPlayoff, lg, plans){`
- `NFL Draft Simulator v20 Claude.html:3402` — `g.result = simulateGame(hs, as, isPlayoff, seasonState.league, ensureGamePlans(g));`

> **Answer:**

---

### Q-OWNER-53 — Persistence  `[later]` · area: `ui-and-experience`

**Question.** Should a user be able to keep a team, a season history and their settings between sessions?

**Why it matters.** It decides whether the product becomes a game or a simulator.

> **Answer:**

---

### Q-OWNER-28 — Position value  `[now]` · area: `nba-concepts`

**Question.** Should position value in the NBA be set by scarcity (a true point guard is rare and expensive) or by role (a defensive wing is what a champion needs)?

**Why it matters.** It is the NBA's version of the QB-versus-CB question.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:452` — `const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 8`
- `NFL Draft Simulator v20 Claude.html:456` — `let weights = {...DEFAULT_WEIGHTS};`
- `NFL Draft Simulator v20 Claude.html:460` — `const w = slotWinsPerOvr(), mx = Math.max(...Object.values(w)), out = {...DEFAULT_WEIGHTS};`
- `NFL Draft Simulator v20 Claude.html:1211` — `const adv = lineupAdvice(roster), wpo = slotWinsPerOvr();`

> **Answer:**

---

### Q-OWNER-16 — Position value vs player quality  `[now]` · area: `ratings-and-data`

**Question.** Should a 97-rated quarterback be worth more in the draft than a 97-rated wide receiver because quarterbacks are harder to replace, or should the value follow the player's own quality?

**Why it matters.** It is the core economic question of the draft, and the reason QB is worth 320 while CB is worth 350 today.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:452` — `const DEFAULT_WEIGHTS = {"QB": 320, "RB1": 100, "RB2": 40, "WR1": 60, "WR2": 40, "WR3": 20, "WR4": 5, "TE1": 8`
- `NFL Draft Simulator v20 Claude.html:456` — `let weights = {...DEFAULT_WEIGHTS};`
- `NFL Draft Simulator v20 Claude.html:459` — `function modelWeights(){`
- `NFL Draft Simulator v20 Claude.html:564` — `document.getElementById('modelWBtn').addEventListener('click', ()=>{ if(JSON.stringify(weights)!==JSON.stringi`
- `NFL Draft Simulator v20 Claude.html:460` — `const w = slotWinsPerOvr(), mx = Math.max(...Object.values(w)), out = {...DEFAULT_WEIGHTS};`
- `NFL Draft Simulator v20 Claude.html:1211` — `const adv = lineupAdvice(roster), wpo = slotWinsPerOvr();`

> **Answer:**

---

### Q-OWNER-05 — The bench  `[now]` · area: `flex-and-lineup`

**Question.** How deep does the roster go, and does bench quality matter to the season sim? Today the season model uses nine unit ratings, so depth is mostly implicit.

**Why it matters.** In the NBA, a 15-man rotation is the whole game; if depth is invisible the season will feel hollow.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1274` — `S.unitRatings[user] = teamRatings(S.teams[user].slotmap);`
- `NFL Draft Simulator v20 Claude.html:1297` — `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, l`
- `NFL Draft Simulator v20 Claude.html:1897` — `const RATING_SPECS = {`
- `NFL Draft Simulator v20 Claude.html:1950` — `for(const k in RATING_SPECS) r[k] = wavgSlots(slotmap, RATING_SPECS[k]);`
- `NFL Draft Simulator v20 Claude.html:2046` — `const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.`
- `NFL Draft Simulator v20 Claude.html:2068` — `const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp`

> **Answer:**

---

### Q-OWNER-11 — The draft board's intelligence  `[later]` · area: `draft-rules`

**Question.** Should the board show what a pick is 'worth' to you (as now), or also what it will be worth after the CPU's remaining needs are known — i.e. should the app model the CPU's likely picks?

**Why it matters.** It is the difference between a board and a forecast.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:1580` — `function boardEntries(){`
- `NFL Draft Simulator v20 Claude.html:1632` — `const {sim, entries} = boardEntries();`
- `NFL Draft Simulator v20 Claude.html:1086` — `const rer = ()=>{ if(draftSim) renderDraftBoard2(); };`
- `NFL Draft Simulator v20 Claude.html:1102` — `renderDraftBoard2();`

> **Answer:**

---

### Q-OWNER-23 — User's all-time team  `[later]` · area: `all-time-mode`

**Question.** Should the user's all-time team be allowed to mix eras and modern players, or should there be an 'era team' option where you draft for one decade?

**Why it matters.** It is a natural second mode once the first works.

> **Answer:**

---

### Q-OWNER-36 — Injuries over a season  `[later]` · area: `season-and-playoffs`

**Question.** Should injuries occur and be reported during a simulated season, or only exist as a pre-season risk rating?

**Why it matters.** It changes the emotional texture of a season.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:350` — `<th data-col="agi">AGI</th><th data-col="cod">COD</th><th data-col="inj">INJ</th><th data-col="awr">AWR</th>`
- `NFL Draft Simulator v20 Claude.html:721` — `const PCOLS = ['name','pos','team','ovr','spd','str','agi','cod','inj','awr'];`

> **Answer:**

---

### Q-OWNER-49 — What the council may decide  `[later]` · area: `platform-and-process`

**Question.** Which decisions may the council make on its own (data, tooling, documentation) and which must come to you (concepts, structure, priorities)?

**Why it matters.** It keeps the question channel and the decision log aimed at what only you can answer.

> **Answer:**

---

### Q-OWNER-29 — Awards and All-NBA  `[now]` · area: `nba-concepts`

**Question.** Which awards should an NBA season crown — MVP, DPOY, ROY, All-NBA teams, All-Defensive, and an All-Star game — and should the All-Star game be simulated as an event?

**Why it matters.** It is the presentation layer of the NBA pack and a big part of its charm.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3458` — `seasonState.awardsRS = computeRegularSeasonAwards();`
- `NFL Draft Simulator v20 Claude.html:5661` — `function computeRegularSeasonAwards(){`
- `NFL Draft Simulator v20 Claude.html:3855` — `function renderPlayoffsView(container){`
- `NFL Draft Simulator v20 Claude.html:6057` — `else if(seasonState.phase==='playoffs') renderPlayoffsView(container);`

> **Answer:**

---

### Q-OWNER-17 — Team strength and the user's team  `[later]` · area: `ratings-and-data`

**Question.** Should the 32 teams be ranked by their own rosters, and should the user's drafted team be measured against them on the same scale?

**Why it matters.** It decides whether 'Your Team' at the end of the draft means anything.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:450` — `const TEAM_DATA = {"Cincinnati Bengals":{"DE1":{"ovr":78,"name":"Boye Mafe"},"DE2":{"ovr":77,"name":"Cashius H`
- `NFL Draft Simulator v20 Claude.html:478` — `const slotmap = TEAM_DATA[team];`
- `NFL Draft Simulator v20 Claude.html:1274` — `S.unitRatings[user] = teamRatings(S.teams[user].slotmap);`
- `NFL Draft Simulator v20 Claude.html:1297` — `const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, l`

> **Answer:**

---

### Q-OWNER-06 — Injuries and availability  `[later]` · area: `flex-and-lineup`

**Question.** Should the injury rating ('inj') reduce a player's effective value in the draft, in the season, or both? And should injuries ever be simulated as events during a season?

**Why it matters.** It decides whether a durable 88 is meaningfully different from a fragile 88.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:350` — `<th data-col="agi">AGI</th><th data-col="cod">COD</th><th data-col="inj">INJ</th><th data-col="awr">AWR</th>`
- `NFL Draft Simulator v20 Claude.html:721` — `const PCOLS = ['name','pos','team','ovr','spd','str','agi','cod','inj','awr'];`
- `NFL Draft Simulator v20 Claude.html:3391` — `const before = {}; Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ before[k] = rec.st[k]||0; });`
- `NFL Draft Simulator v20 Claude.html:3394` — `if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAP`

> **Answer:**

---

### Q-OWNER-30 — The NBA2K ratings  `[later]` · area: `nba-concepts`

**Question.** When you transmit NBA2K ratings, do you want the NBA sim's player attributes to follow NBA2K's attribute set as closely as possible (so a player reads the same to someone who knows 2K), or should they be remapped into our six shared attributes for consistency across sports?

**Why it matters.** It decides how faithful the NBA pack is to the ratings the Owner is bringing.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:449` — `const PLAYERS = [["Ja'Marr Chase","WR","Cincinnati Bengals",99,96,73,92,96,92,99,true],["Jaxon Smith-Njigba","`
- `NFL Draft Simulator v20 Claude.html:664` — `return groupAvgFromPool(PLAYERS.filter(p=>p[2]===team), def);`

> **Answer:**

---

### Q-OWNER-18 — Era labels  `[later]` · area: `ratings-and-data`

**Question.** Should each all-time record carry an era label (1980s, 2000s, today) and should the era ever affect the maths (rule changes, free throws, three-point line)?

**Why it matters.** It is a small annotation now and a large re-rating later if it turns out to matter.

**Code context** (read-only, cited for reference):
- `NFL Draft Simulator v20 Claude.html:3391` — `const before = {}; Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ before[k] = rec.st[k]||0; });`
- `NFL Draft Simulator v20 Claude.html:3394` — `if(book===seasonState.playerStats) Object.keys(SEASON_RECORD_CAPS).forEach(k=>{ if(rec.st[k]>SEASON_RECORD_CAP`
- `NFL Draft Simulator v20 Claude.html:2046` — `const MC = { rb:0.0249, olRun:0.0516, front:0.0559, qb:0.00766, rec:0.0173, olPass:0.0149, rush:0.0138, cov:0.`
- `NFL Draft Simulator v20 Claude.html:2068` — `const lean = MC.lean*((0.35*(O0.rb-lg.rb)+0.65*(O0.olRun-lg.olRun)) - (0.45*dQB+0.30*(O0.rec-lg.rec)+0.25*dOLp`

> **Answer:**

---

### Q-OWNER-31 — The NBA's all-time pool  `[later]` · area: `nba-concepts`

**Question.** For an all-time NBA mode, should the pool be weighted toward the modern era (where the current players are eligible) or should it be a true cross-era pool including the 1960s and 70s?

**Why it matters.** Cross-era raises the same comparability question the football all-time pool raises.

> **Answer:**

---

## Answered so far

_(none yet)_
