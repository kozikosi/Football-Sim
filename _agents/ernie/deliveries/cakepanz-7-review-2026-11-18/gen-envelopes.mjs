/* gen-midseason-envelopes.mjs — ERNIE, 2026-11-18. Builds the two autosave envelopes the SHELL
   would have written for a user who DRAFTED NORMALLY (so autosave:draft exists) and then began
   the season and stepped a week (so autosave:week exists too). Writes them as JSON to a file so
   a browser probe can inject them into localStorage before boot. */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(process.argv[2] || '.');
const P = (rel) => path.join(ROOT, rel);
const port = await import(P('src/lib/port/seam.ts'));
const { buildPool, newDraft, DEFAULT_CONFIG, runDraft, snakeOrder, freezePool, makeRng, createStore } = port;
const seasonVM = await import(P('src/lib/port/seasonVM.ts'));
const feedVMm = await import(P('src/lib/port/feedVM.ts'));
const hydrateApp = await import(P('src/lib/port/hydrateApp.ts'));
const { seasonFacade } = await import(P('src/lib/port/seasonFacade.ts'));

const CSV = (p) => fs.readFileSync(P(p), 'utf8');
const pool = buildPool(CSV('data/nfl/madden27-ratings.csv'), CSV('data/nfl/free-agents-old-ratings.csv'), CSV('data/nfl/player-ids.csv'));

const userTeam = 5;
const st = newDraft(pool, makeRng(2026).fork('draft'), DEFAULT_CONFIG, snakeOrder());
runDraft(st, makeRng(2026).fork('run'), { team: userTeam, policy: 'greedy' });
const RECORD = { seed: 2026, userTeam, pool: freezePool(pool), picks: st.log.map((p) => ({ overall: p.overall, team: p.team, pid: p.player.id, slot: p.slot })) };

const memStorage = () => { const m = new Map(); return {
  async read(k) { return { ok: true, value: m.has(k) ? m.get(k) : null }; },
  async write(k, t) { m.set(k, String(t)); return { ok: true, value: undefined }; },
  async remove(k) { m.delete(k); return { ok: true, value: undefined }; },
  async keys(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort() }; },
  async entries(p) { return { ok: true, value: [...m.keys()].filter((k) => k.startsWith(p)).sort().map((k) => [k, m.get(k)]) }; },
}; };

const mod = memStorage();
const meta = { engineVersion: 'nfl1.1ac56c28928eff', dataVersion: 'sha256:probe', saveId: 'probe-midseason', saveRevision: 1 + RECORD.picks.length, createdAt: '2026-11-18T00:00:00.000Z' };

// the draft autosave — exactly what startDraft/loadDraft/pick write
const dmsg = await hydrateApp.autosaveDraft(RECORD, meta, new Date('2026-11-18T00:01:00.000Z'), mod);
if (dmsg) throw new Error('draft autosave refused: ' + dmsg);

// begin the season the way the app does, step ONE week, and write the week autosave
const store = createStore(pool);
store.dispatch({ type: 'LOAD', record: RECORD });
const myRoster = feedVMm.rostersOfRecord(RECORD)[userTeam].map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: !!p.freeAgent }));
seasonFacade.begin(feedVMm.ratedLeagueOfRecord(RECORD), 2026, 2027, 'Chicago Bears', myRoster);
const stepped = seasonFacade.step();
const wmsg = await hydrateApp.autosaveWeek(seasonFacade.weekPayload(), meta, new Date('2026-11-18T00:02:00.000Z'), mod);
if (wmsg) throw new Error('week autosave refused: ' + wmsg);

const out = { draftKey: hydrateApp.AUTO_DRAFT_KEY, weekKey: hydrateApp.AUTO_WEEK_KEY, draft: null, week: null, nextWeek: null };
for (const [k, v] of modEntries(mod)) { if (k === out.draftKey) out.draft = v; if (k === out.weekKey) out.week = v; }
function* modEntries(m) { /* the memory module does not expose entries; use the known keys */ }
out.draft = (await readBack(mod, out.draftKey));
out.week = (await readBack(mod, out.weekKey));
async function readBack(m, k) { const r = await m.read(k); return r.value; }
out.stepped = !!stepped;
out.nextWeek = seasonFacade.weekPayload().nextWeek;
fs.writeFileSync(path.resolve(process.argv[3] || '/tmp/midseason-envelopes.json'), JSON.stringify(out, null, 1));
console.log('draft env bytes', out.draft.length, '| week env bytes', out.week.length, '| nextWeek', out.nextWeek, '| stepped', out.stepped);