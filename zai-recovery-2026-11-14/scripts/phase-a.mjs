// PHASE A — save/record schema + the resume test, run against an arm's vendored engine copy.
// Usage: node scripts/phase-a.mjs <armDir> main <envelopeOutFile> <userPick5File>
//        node scripts/phase-a.mjs <armDir> child <envelopeFile> <userPick5File> <outFile>
// The child process IS the "quit the process — relaunch" half of the A1 acceptance.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ARM = process.argv[2];
const MODE = process.argv[3] ?? 'main';
const FILE_A = process.argv[4] ?? '';
const FILE_B = process.argv[5] ?? '';
const OUT_FILE = process.argv[6] ?? '';
const ARM_DIR = path.resolve(ARM);
const SB = path.join(ARM_DIR, 'src-bench');
const E = (p) => path.join(SB, 'engine', p);
const S = (p) => path.join(SB, 'shared', p);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');

const { buildPool, roleOf } = await import(path.join(E('sports/nfl/engine/players.ts')));
const { makeRng } = await import(E('core/rng.ts'));
const { DEFAULT_CONFIG, newDraft, runDraft, cpuChoose, userChoose, applyPick } = await import(E('sports/nfl/engine/draft.ts'));
const { createStore, freezePool, restoreDraft, thawPool } = await import(E('sports/nfl/app/store.ts'));
const { startSeason, playWeek, isFinished, table } = await import(E('sports/nfl/engine/seasonrun.ts'));
const { teamRatings, spotsOf, leagueBaseline } = await import(E('sports/nfl/engine/ratings.ts'));
const { lineupFor } = await import(E('sports/nfl/engine/lineup.ts'));
const { returnerRating } = await import(E('sports/nfl/engine/returner.ts'));
const { netPts } = await import(E('sports/nfl/engine/value.ts'));
const { TEAMS } = await import(E('sports/nfl/engine/league.ts'));
const { stamps } = await import(E('sports/nfl/app/versions.ts'));
const { toWeekPayload } = await import(E('sports/nfl/app/weekmap.ts'));
const { serialize: serializeEnvelope, parseEnvelope } = await import(E('core/envelope.ts'));
const { buildDraftEnvelope, writeDraftSave, readDraftSave, rngPosition, draftSlotKey } = await import(S('save-envelope.ts'));
const { resolveConflict, applyConflict, envelopeText } = await import(S('sync-rule.ts'));

const ratingsCsv = fs.readFileSync(path.join(SB, 'data/madden27-ratings.csv'), 'utf8');
const faCsv = fs.readFileSync(path.join(SB, 'data/free-agents-old-ratings.csv'), 'utf8');
const idsCsv = fs.readFileSync(path.join(SB, 'data/player-ids.csv'), 'utf8');
const players = buildPool(ratingsCsv, faCsv, idsCsv);
const poolRows = freezePool(players);
const stamp = await stamps(poolRows);

const mapKV = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, v); }, removeItem: (k) => { m.delete(k); } }; };

function userGreedyPick(state) {
  const st = state.draft;
  const c = userChoose(st, st.order[st.pos], makeRng(0).fork('driver'), 'greedy');
  return { playerId: c.player.id, slot: c.slot, overall: st.pos + 1 };
}
// The first CPU pick after the user's pending pick is applied (from a state already at the user's turn).
function firstCpuAfterUserPick(state, userPick) {
  const st = restoreDraft(state.record);
  const player = st.pool.find((p) => p.id === userPick.playerId);
  applyPick(st, st.order[st.pos], player, userPick.slot);
  const cpu = makeRng(state.record.seed).fork('cpu');
  const team = st.order[st.pos];
  const c = cpuChoose(st, team, cpu.fork('p' + st.pos));
  return { overall: st.pos + 1, team, pid: c.player.id, slot: c.slot };
}

const recShaOf = (rec) => sha(JSON.stringify({ seed: rec.seed, userTeam: rec.userTeam, pool: rec.pool, picks: rec.picks }));

if (MODE === 'child') {
  const raw = fs.readFileSync(FILE_A, 'utf8');
  const outer = parseEnvelope(JSON.parse(raw));
  if (!outer.ok) { console.log(JSON.stringify({ ok: false, stage: 'parseEnvelope', error: outer.message })); process.exit(1); }
  const userPick5 = JSON.parse(fs.readFileSync(FILE_B, 'utf8'));
  const store = createStore(players);
  store.dispatch({ type: 'LOAD', record: outer.value.payload });
  const s0 = store.getState();
  if (s0.status !== 'drafting') { console.log(JSON.stringify({ ok: false, stage: 'load', status: s0.status, error: s0.error })); process.exit(1); }
  const firstCpu = firstCpuAfterUserPick(s0, userPick5);
  // resume: apply the user's pending pick, then greedy to completion
  store.dispatch({ type: 'PICK', playerId: userPick5.playerId, slot: userPick5.slot });
  let guard = 0;
  while (store.getState().status === 'drafting' && guard++ < 1200) {
    const cur = store.getState();
    if (cur.draft.order[cur.draft.pos] === cur.record.userTeam) { const p = userGreedyPick(cur); store.dispatch({ type: 'PICK', playerId: p.playerId, slot: p.slot }); } else break;
  }
  const fin = store.getState();
  fs.writeFileSync(OUT_FILE, JSON.stringify({ ok: true, firstCpu, finalPicks: fin.record.picks.length, recordSha: recShaOf(fin.record), status: fin.status, rngPos: rngPosition(fin.record) }));
  process.exit(0);
}

// ---------- main ----------
const store = createStore(players);
store.dispatch({ type: 'START', seed: 1, userTeam: 0 });
const userPicks = [];
let envelopeAt5 = null, userPick5 = null, nextCpuAfter5 = null;
const envelopeSizes = {};
let guard = 0;
while (store.getState().status === 'drafting' && guard++ < 1200) {
  const cur = store.getState();
  if (cur.draft.order[cur.draft.pos] !== cur.record.userTeam) break;
  const p = userGreedyPick(cur);
  if (userPicks.length === 0) envelopeSizes.atStart = envelopeText(buildDraftEnvelope(cur.record, { ...stamp })).length;
  if (userPicks.length === 4) {
    // SAVE just before the user's 5th pick: envelope → slot-refusing write → read back
    const env = buildDraftEnvelope(cur.record, { ...stamp, slot: 'A', createdAt: '2026-11-14T00:00:00.000Z', now: new Date('2026-11-14T00:00:00.000Z') });
    envelopeAt5 = envelopeText(env);
    userPick5 = p;
    nextCpuAfter5 = firstCpuAfterUserPick(cur, p);
    envelopeSizes.at5 = envelopeAt5.length;
    const kv = mapKV();
    const w = writeDraftSave(kv, env);
    const r = readDraftSave(kv, 'A');
    envelopeSizes.writeRoundTrip = w.ok && r.ok && JSON.stringify(r.env.payload) === JSON.stringify(env.payload) ? 'ok' : 'FAIL:' + (w.ok ? r.error : w.error);
    const wrongSlot = buildDraftEnvelope(cur.record, { ...stamp, slot: 'B', createdAt: '2026-11-14T00:00:00.000Z', now: new Date('2026-11-14T00:00:00.000Z') });
    // F8 refusal needs a mis-slotted PAIR (envelope slot B under the slot-A key). writeDraftSave derives the
    // key from the envelope, so it can never mis-slot; the guard protects callers that compute keys separately.
    const { assertSlotMatchesKey } = await import(E('sports/nfl/app/saves.ts'));
    const direct = assertSlotMatchesKey('B', draftSlotKey('A'));
    // LocalStorageModule's own refusal path is proven in the BROWSER A1 test (Node 24 strip-only mode
    // cannot import platform/localstorage.ts: parameter properties, ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX).
    envelopeSizes.slotRefusal = direct ? 'refused (F8, assertSlotMatchesKey): ' + direct : 'FAIL: mis-slotted pair accepted';
  }
  store.dispatch({ type: 'PICK', playerId: p.playerId, slot: p.slot });
  userPicks.push(p);
}
const fin = store.getState();
envelopeSizes.atEnd = envelopeText(buildDraftEnvelope(fin.record, { ...stamp })).length;
const finalSha = recShaOf(fin.record);

// ---- Phase G: conflict rule under deliberately wrong clocks ----
const g = {};
const mkEnv = (rev, savedAt, picksLen, saveId) => buildDraftEnvelope({ ...fin.record, picks: fin.record.picks.slice(0, picksLen) }, { ...stamp, slot: 'A', createdAt: '2026-11-14T00:00:00.000Z', now: new Date(savedAt), revision: rev, saveId });
{
  const deviceA = mkEnv(7, '2019-01-01T00:00:00.000Z', 900, 'lineage-g');   // more progress, CLOCK WRONG by ~7 years
  const deviceB = mkEnv(3, '2026-11-14T00:00:00.000Z', 300, 'lineage-g');   // less progress, correct clock
  const dec = resolveConflict(JSON.parse(envelopeText(deviceA)), JSON.parse(envelopeText(deviceB)));
  g.progressOverClock = { winnerRevision: dec.revisionWinner, loserRevision: dec.revisionLoser, basis: dec.basis, verdict: dec.revisionWinner === 7 && dec.basis === 'saveRevision' ? 'PASS: higher revision won despite its 2019 clock' : 'FAIL' };
  const tieA = mkEnv(5, '2026-11-13T10:00:00.000Z', 512, 'lineage-g'), tieB = mkEnv(5, '2026-11-14T09:00:00.000Z', 512, 'lineage-g');
  const decTie = resolveConflict(JSON.parse(envelopeText(tieA)), JSON.parse(envelopeText(tieB)));
  g.tieBreak = { basis: decTie.basis, verdict: decTie.winner.savedAt === '2026-11-14T09:00:00.000Z' && decTie.basis === 'savedAt-tiebreak' ? 'PASS: genuine tie → newer savedAt' : 'FAIL' };
  const kv2 = mapKV();
  const app1 = applyConflict(kv2, decTie, 'A', envelopeText(decTie.winner), envelopeText(decTie.loser));
  const bakBack = JSON.parse(kv2.getItem(app1.loserKey));
  const app2 = applyConflict(kv2, decTie, 'A', envelopeText(decTie.winner), envelopeText(decTie.loser));
  g.loserRetained = { bakParses: !!bakBack.saveId, loserBytes: app1.loserBytes, noticeWrittenOnce: app1.noticeFlagWritten && !app2.noticeFlagWritten, verdict: !!bakBack.saveId && app1.noticeFlagWritten && !app2.noticeFlagWritten ? 'PASS: loser recoverable from slot:A:bak, user told exactly once' : 'FAIL' };
  const other = mkEnv(9, '2026-11-14T00:00:00.000Z', 100, 'other-lineage');
  const r = resolveConflict(JSON.parse(envelopeText(deviceA)), JSON.parse(envelopeText(other)));
  g.wrongLineage = r.ok === false ? 'PASS: different saveIds refused as a conflict (keep both)' : 'FAIL';
}

// ---- A3: season payloads from real engine data ----
const a3 = {};
{
  const rng = makeRng(777);
  const st = newDraft(thawPool(poolRows), rng.fork('draft'), DEFAULT_CONFIG);
  runDraft(st, rng.fork('run'));
  const raw = st.rosters.map((r) => Object.values(r)).map((pl) => (['4-3', '3-4']).map((b) => { const l = lineupFor(pl, b); return { l, R: teamRatings(spotsOf(l), returnerRating(l)) }; }));
  const lg0 = leagueBaseline(raw.map((b) => b[0].R));
  const teams = raw.map((b, i) => { const best = netPts(b[0].R, lg0) >= netPts(b[1].R, lg0) ? b[0] : b[1]; return { name: TEAMS[i].name, ratings: best.R }; });
  const userTeam = TEAMS[0].name;
  const frozenRoster = Object.values(st.rosters[0]).map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: p.freeAgent }));
  let s = startSeason(teams, { seed: 1, year: 2026 });
  while (!isFinished(s) && s.nextWeek <= 9) s = playWeek(teams, s).state;
  const wp = toWeekPayload(s, teams, { userTeam, roster: frozenRoster, plan: null, statsRecorded: false });
  const wkEnv = serializeEnvelope('nfl', 'week', 'B', { engineVersion: stamp.engineVersion, dataVersion: stamp.dataVersion, saveId: 'lineage-a3', saveRevision: 9, createdAt: '2026-11-14T00:00:00.000Z' }, wp, new Date('2026-11-14T00:00:00.000Z'));
  a3.week9EnvelopeBytes = wkEnv.length;
  while (!isFinished(s)) s = playWeek(teams, s).state;
  const t = table(s);
  const userResults = [...s.scores, ...s.playoffs].filter((x) => x.home === userTeam || x.away === userTeam).map((x) => ({ week: x.week, home: x.home, away: x.away, hs: x.hs, as: x.as, ...(x.round ? { round: x.round } : {}) }));
  const seasonPayload = { seed: 1, year: 2026, run: 1, userTeam, roster: frozenRoster, table: t, userResults, champion: s.champion, userOutcome: s.champion === userTeam ? 'champion' : 'missed-playoffs', statsRecorded: true };
  const sEnv = serializeEnvelope('nfl', 'season', 'C', { engineVersion: stamp.engineVersion, dataVersion: stamp.dataVersion, saveId: 'lineage-a3', saveRevision: 30, createdAt: '2026-11-14T00:00:00.000Z' }, seasonPayload, new Date('2026-11-14T00:00:00.000Z'));
  a3.seasonEnvelopeBytes = sEnv.length;
  a3.threeSeasonsBytes = 3 * sEnv.length + wkEnv.length + envelopeSizes.atEnd;
  a3.localStorage5MBShare = +(a3.threeSeasonsBytes / (5 * 1024 * 1024) * 100).toFixed(1) + '%';
  a3.notes = 'draft envelope retained + week-9 save + 3 season envelopes; the draft envelope (187 KB) dominates.';
}

const result = {
  arm: ARM, node: process.version, stamps: stamp,
  A1: { referenceRecordSha: finalSha, referencePicks: fin.record.picks.length, rngPosition: rngPosition(fin.record), envelopeSizes, nextCpuAfter5, userPick5, userPicksFirst3: userPicks.slice(0, 3), userPicksTotal: userPicks.length },
  G: g, A3: a3, recordFields: Object.keys(fin.record),
};
fs.mkdirSync('/home/z/my-project/scratch/wave', { recursive: true });
fs.writeFileSync(`/home/z/my-project/scratch/wave/phaseA-${path.basename(ARM)}-main.json`, JSON.stringify(result, null, 2));
if (envelopeAt5) { fs.writeFileSync(FILE_A, envelopeAt5); fs.writeFileSync(FILE_B, JSON.stringify(userPick5)); }
fs.writeFileSync('/home/z/my-project/scratch/wave/userPicks.json', JSON.stringify(userPicks));
console.log(JSON.stringify({ arm: ARM, finalSha, picks: fin.record.picks.length, g: { progress: g.progressOverClock.verdict, tie: g.tieBreak.verdict, loser: g.loserRetained.verdict, lineage: g.wrongLineage }, a3: { week: a3.week9EnvelopeBytes, season: a3.seasonEnvelopeBytes, three: a3.threeSeasonsBytes, share: a3.localStorage5MBShare }, envelopeSizes }, null, 1));
