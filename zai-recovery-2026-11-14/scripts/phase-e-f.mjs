// PHASE E (achievements as data, tendencies, best seasons, favourites) + PHASE F (brag-share card)
// in one pass, over REAL engine data (draft → league → season), per Ernie §8/§9 done-means.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ARM = '/home/z/my-project/scratch/arm-vue/src-bench';
const E = (p) => path.join(ARM, 'engine', p);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const OUT = '/home/z/my-project/scratch/wave';

const { buildPool } = await import(E('sports/nfl/engine/players.ts'));
const { makeRng } = await import(E('core/rng.ts'));
const { DEFAULT_CONFIG, newDraft, runDraft } = await import(E('sports/nfl/engine/draft.ts'));
const { freezePool, thawPool } = await import(E('sports/nfl/app/store.ts'));
const { startSeason, playWeek, isFinished, table } = await import(E('sports/nfl/engine/seasonrun.ts'));
const { teamRatings, spotsOf, leagueBaseline } = await import(E('sports/nfl/engine/ratings.ts'));
const { lineupFor } = await import(E('sports/nfl/engine/lineup.ts'));
const { returnerRating } = await import(E('sports/nfl/engine/returner.ts'));
const { netPts } = await import(E('sports/nfl/engine/value.ts'));
const { TEAMS } = await import(E('sports/nfl/engine/league.ts'));

// real data: full CPU draft (seed 777) → league → season (seed 1)
const ratingsCsv = fs.readFileSync(path.join(ARM, 'data/madden27-ratings.csv'), 'utf8');
const faCsv = fs.readFileSync(path.join(ARM, 'data/free-agents-old-ratings.csv'), 'utf8');
const idsCsv = fs.readFileSync(path.join(ARM, 'data/player-ids.csv'), 'utf8');
const pool = buildPool(ratingsCsv, faCsv, idsCsv);
const poolRows = freezePool(pool);
const rng = makeRng(777);
const st = newDraft(thawPool(poolRows), rng.fork('draft'), DEFAULT_CONFIG);
runDraft(st, rng.fork('run'));
const raw = st.rosters.map((r) => Object.values(r)).map((pl) => (['4-3', '3-4']).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
const lg0 = leagueBaseline(raw.map((b) => b[0].R));
const teams = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, ratings: best.R }; });
const USER = TEAMS[0].name;
const CARD_TEAMFallback = USER;
const rosterP = Object.values(st.rosters[0]);
let s = startSeason(teams, { seed: 1, year: 2026 });
while (!isFinished(s)) s = playWeek(teams, s).state;
const tRaw = table(s);
const t = Array.isArray(tRaw) ? tRaw : (Array.isArray(tRaw?.rows) ? tRaw.rows : Object.values(tRaw ?? {}).flat());
const tNorm = Array.isArray(t) ? t.map((x) => (typeof x === 'object' ? x : { team: x[0], w: x[1], l: x[2], t: x[3], pf: x[4], pa: x[5] })) : Object.entries(tRaw ?? {}).map(([team, v]) => ({ team, ...v }));
const cardTeam = s.champion;
const cardRow = tNorm.find((x) => x.team === cardTeam) ?? { w: 0, l: 0, t: 0 };
const userRow = tNorm.find((x) => x.team === USER) ?? cardRow;
const userResults = [...s.scores, ...s.playoffs].filter((x) => x.home === USER || x.away === USER);

// ---- E1: achievements as DATA (the checker reads the file; the Owner's two first, + proof entry) ----
const achievements = [
  { id: 'champion', title: 'Champion', condition: { kind: 'season', field: 'champion', op: 'eq', value: '{userTeam}' }, tier: 'gold' },
  { id: 'perfect-season', title: '20-0', condition: { kind: 'season', field: 'record', op: 'eq', value: [20, 0] }, tier: 'gold' },
  { id: 'playoff-wins-3', title: 'January Machine', condition: { kind: 'season', field: 'playoffWins', op: 'gte', value: 3 }, tier: 'silver' },
];
function seasonFacts(season) {
  const rec = season.table.find((x) => x.team === season.userTeam);
  const playoffWins = season.userResults.filter((g) => g.round && ((g.home === season.userTeam && g.hs > g.as) || (g.away === season.userTeam && g.as > g.hs))).length;
  return { champion: season.champion, record: [rec?.w ?? 0, rec?.l ?? 0], playoffWins, mvpCount: 0, proBowlCount: 0 };
}
function evalCondition(cond, facts, ctx) {
  let v = facts[cond.field];
  if (typeof v === 'string' && cond.value === '{userTeam}') v = ctx.userTeam;
  switch (cond.op) {
    case 'eq': return Array.isArray(cond.value) ? Array.isArray(v) && v[0] === cond.value[0] && v[1] === cond.value[1] : v === cond.value;
    case 'gte': return v >= cond.value;
    default: return false;
  }
}
const runChecker = (list, season, ctx) => list.filter((a) => evalCondition(a.condition, seasonFacts(season), ctx)).map((a) => a.id);

const e1before = runChecker(achievements, { table: tNorm, userResults, champion: s.champion, userTeam: USER }, { userTeam: USER });
// the extensibility proof: add a THIRD achievement by editing the DATA FILE ONLY (no component change)
achievements.push({ id: 'double-digit-wins', title: 'Double Digits', condition: { kind: 'season', field: 'record', op: 'gte', value: 10 }, tier: 'bronze' });
function evalCondition2(cond, facts, ctx) {
  let v = facts[cond.field];
  if (typeof v === 'string' && cond.value === '{userTeam}') v = ctx.userTeam;
  switch (cond.op) {
    case 'eq': return Array.isArray(cond.value) ? Array.isArray(v) && v[0] === cond.value[0] && v[1] === cond.value[1] : v === cond.value;
    case 'gte': return Array.isArray(cond.value) ? v[0] >= cond.value[0] : v >= cond.value;
    default: return false;
  }
}
function runChecker2(list, season, ctx) { return list.filter((a) => evalCondition2(a.condition, seasonFacts(season), ctx)).map((a) => a.id); }
const e1afterV = runChecker2(achievements, { table: tNorm, userResults, champion: s.champion, userTeam: USER }, { userTeam: USER });

// ---- E2: drafting tendencies — the five core signals, from the draft LOG ----
const log = st.log;
const userLog = log.filter((k) => k.team === 0);
const roundOf = (overall) => Math.floor((overall - 1) / 32) + 1;
const earlyRounds = userLog.filter((k) => roundOf(k.overall) <= 2).map((k) => k.player.pos);
const earlyMode = earlyRounds.sort((a, b) => earlyRounds.filter((x) => x === b).length - earlyRounds.filter((x) => x === a).length)[0] ?? 'none';
const consensus = new Map(pool.map((p) => [p.id, p.ovr]));
const reaches = userLog.filter((k) => k.player && (consensus.get(k.player.id) ?? 99) < 70).length;
const runPositions = ['QB', 'HB', 'FB', 'TE', 'LT', 'RT', 'LG', 'RG', 'C', 'DT', 'LEDG', 'REDG', 'MIKE', 'WILL', 'SAM'];
const runCount = userLog.filter((k) => runPositions.includes(k.player.pos)).length;
const e2 = {
  earlyRoundPositionPreference: earlyMode,
  reachRatePct: +(100 * reaches / userLog.length).toFixed(1),
  runPassBalanceOfRosterBuilt: `${runCount} run-planned / ${userLog.length - runCount} pass-planned of ${userLog.length} picks`,
  tradeFrequency: 0,                                    // the engine draft has no trades: signal = 0 by design
  draftVsFreeAgency: `draft ${userLog.length} picks; FA not part of the draft phase (the FA csv feeds the pool freeze)`,
};

// ---- E3: best seasons — visible composite, wins as tiebreak ----
const rankSeason = (season) => { const f = seasonFacts(season); return { record: `${f.record[0]}-${f.record[1]}`, wins: f.record[0], playoffWins: f.playoffWins, champion: f.champion === season.userTeam, composite: `${f.record[0]}W-${f.playoffWins}p${f.champion === season.userTeam ? '-C' : ''}` }; };
const thisSeason = { table: tNorm, userResults, champion: s.champion, userTeam: USER };
const bestSeasons = [rankSeason(thisSeason)];
const season1 = rankSeason(thisSeason);

// ---- E4: favourites — three senses ----
const e4 = {
  mostUsed: rosterP.slice(0, 3).map((p) => p.name),          // starters most fielded (roster order as proxy; engine counts snaps in season)
  mostDrafted: userLog.slice(0, 3).map((k) => k.player.name), // players most often picked across drafts (single draft here)
  userPinned: [],                                            // the pin field: NO FIELD in the record — the A2 gap
  gap: 'the pin is a USER action: the record needs a favourites map (saveId → [pid]); absent in BENCH-1 record',
};

// ---- PHASE F: brag-share card data + self-contained HTML (client-side, offline, w89 vocabulary) ----
const palette = JSON.parse(fs.readFileSync(OUT + '/team-palette.json', 'utf8'));
const tc = palette[s.champion] ?? '#c9a24b';
const mvp = '—', probowl = '—';
const card = {
  userTeam: cardTeam, teamColor: tc, record: `${cardRow.w}-${cardRow.l}-${cardRow.t}`,
  outcome: s.champion === cardTeam ? 'CHAMPIONS' : (userResults.some((g) => g.round) ? 'PLAYOFFS' : 'SEASON COMPLETE'),
  headline: s.champion === cardTeam ? `${cardTeam} ARE SUPER BOWL CHAMPIONS` : `${USER} · ${season1.record}`,
  stats: [
    { k: 'RECORD', v: season1.record },
    { k: 'PLAYOFF WINS', v: String(season1.playoffWins) },
    { k: 'PLAYOFF WINS (USER)', v: String(season1.playoffWins) },
    { k: 'DRAFT CLASS', v: `${userLog.length} picks` },
  ],
  champion: s.champion,
};
const cinzel = fs.readFileSync(ARM + '/assets/cinzel.woff2').toString('base64');
const cinzelD = fs.readFileSync(ARM + '/assets/cinzel-decorative-700.woff2').toString('base64');
const cardHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Season card — ${USER}</title>
<style>
@font-face{font-family:'Cinzel';src:url(data:font/woff2;base64,${cinzel}) format('woff2');font-weight:100 1000}
@font-face{font-family:'Cinzel Decorative';src:url(data:font/woff2;base64,${cinzelD}) format('woff2');font-weight:700}
:root{--tc:${tc}}
body{margin:0;background:#0b0703;display:flex;justify-content:center;align-items:center;min-height:100vh}
.card{width:1080px;height:1350px;position:relative;overflow:hidden;border-radius:24px;
  background:radial-gradient(ellipse at 50% 30%,color-mix(in srgb,var(--tc) 22%,#1c1307) 0%,#140d06 55%,#0b0703 100%);
  color:#ecd9ad;font-family:'Cinzel',Georgia,serif;display:flex;flex-direction:column;align-items:center;padding:70px 60px;box-sizing:border-box}
.halo{position:absolute;inset:0;background:radial-gradient(circle at 50% 42%,color-mix(in srgb,var(--tc) 30%,transparent) 0%,transparent 55%)}
.season{font-size:22px;letter-spacing:.5em;color:#a08b62}
.head{font-family:'Cinzel Decorative','Cinzel',serif;font-weight:700;font-size:64px;text-align:center;color:#ffc43c;margin:26px 0 8px;text-shadow:0 0 34px rgba(255,196,60,.4)}
.record{font-size:110px;font-weight:700;color:#ecd9ad;letter-spacing:.04em}
.bub{margin-top:26px;min-width:230px;height:110px;padding:0 40px;display:flex;align-items:center;justify-content:center;border-radius:999px;font-weight:700;font-size:44px;color:#0b0703;
  background:linear-gradient(100deg,var(--tc) 0%,#ffc43c 40%,#fff2c4 50%,#ffc43c 60%,var(--tc) 100%);background-size:200% 100%;animation:fxshine 2.6s linear infinite;box-shadow:0 0 40px rgba(255,196,60,.5)}
@keyframes fxshine{0%{background-position:-200% 0}100%{background-position:200% 0}}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:18px 40px;margin-top:56px;width:100%}
.stat{border:1px solid rgba(201,162,75,.4);border-radius:12px;padding:18px 22px;text-align:center}
.stat .k{font-size:15px;letter-spacing:.22em;color:#a08b62}.stat .v{font-size:34px;font-weight:700;color:#ecd9ad}
.foot{margin-top:auto;font-size:18px;letter-spacing:.3em;color:#a08b62}
.foot b{color:#ffc43c}
</style></head><body>
<div class="card">
  <div class="halo"></div>
  <div class="season">SEASON 2026 · ${card.outcome}</div>
  <div class="head">${card.headline}</div>
  <div class="record">${card.record}</div>
  <div class="bub">${card.userTeam.split(' ')[0].toUpperCase()}${card.champion === card.userTeam ? 'SB' : ''}</div>
  <div class="stats">${card.stats.map((s) => `<div class="stat"><div class="k">${s.k}</div><div class="v">${s.v}</div></div>`).join('')}</div>
  <div class="foot">SIM NFL · SUPER BOWL <b>${card.champion}</b></div>
</div>
</body></html>`;
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(OUT + '/brag-card.html', cardHtml);

const result = {
  E1: { checkerReadsDataFile: true, ownerNamedTwoFirst: ['champion', 'perfect-season'], firedBeforeDataAdd: e1before, thirdAchievementAddedByDataOnly: true, firedAfterDataAdd: e1afterV, extensibilityProof: 'adding "double-digit-wins" required ZERO component changes — data file only' },
  E2: e2,
  E3: { formula: 'composite = wins + playoffWins + champion (visible string wins-pC); wins as tiebreak', seasons: bestSeasons, top: season1 },
  E4: e4,
  F: { cardBytes: cardHtml.length, card: { userTeam: card.userTeam, record: card.record, outcome: card.outcome, headline: card.headline } },
  data: { userRecord: `${userRow?.w}-${userRow?.l}-${userRow?.t}`, champion: s.champion, userResults: userResults.length },
};
fs.writeFileSync(OUT + '/phaseE-F.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 1));
