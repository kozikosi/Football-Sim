// DS probe: build the REAL mid-season autosave pair (done draft + stepped week) and print the
// exact texts the browser's localStorage would hold. Mirrors N28's fixture, no app code edited.
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(new URL('.', import.meta.url).pathname);
const P = (rel) => path.join(ROOT, rel);

const seam = await import(P('src/lib/port/seam.ts'));
const hydrateApp = await import(P('src/lib/port/hydrateApp.ts'));
const seasonSession = await import(P('src/lib/port/seasonSession.ts'));
const feedVMm = await import(P('src/lib/port/feedVM.ts'));
const { TEAMS } = await import(P('src/lib/port/seam.ts'));

const pool = seam.buildPool(
  fs.readFileSync(P('data/nfl/madden27-ratings.csv'), 'utf8'),
  fs.readFileSync(P('data/nfl/free-agents-old-ratings.csv'), 'utf8'),
  fs.readFileSync(P('data/nfl/player-ids.csv'), 'utf8'));

const store = seam.createStore(pool);
const seed = 8282, team = 7;
store.dispatch({ type: 'START', seed, userTeam: team });
let guard = 0;
while (store.getState().status === 'drafting' && guard++ < 5000) {
  const s = store.getState().draft;
  const c = seam.candidates(s, team)[0];
  store.dispatch({ type: 'PICK', playerId: c.player.id, slot: c.slot });
}
const rec = JSON.parse(JSON.stringify(store.getState().record));
console.error('draft picks', rec.picks.length, 'status', store.getState().status);

const myRoster = feedVMm.rostersOfRecord(rec)[team].map((p) => ({ id: p.id, name: p.name, pos: p.pos, role: p.role, team: p.team, ovr: p.ovr, spd: p.spd, str: p.str, freeAgent: !!p.freeAgent }));
const facade = (await import(P('src/lib/port/seasonFacade.ts'))).seasonFacade;
facade.begin(feedVMm.ratedLeagueOfRecord(rec), seed, 2027, TEAMS[team].name, myRoster);
facade.step();
facade.step();   // two weeks deep, so the resumed week is 3 and unmistakable
const meta = { engineVersion: 'ds-probe', dataVersion: 'sha256:ds-probe', saveId: 'ds-probe', saveRevision: 1 + rec.picks.length, createdAt: '2026-11-18T00:00:00.000Z' };

const written = new Map();
const mod = {
  async read(k) { return { ok: true, value: written.has(k) ? written.get(k) : null }; },
  async write(k, v) { written.set(k, v); return { ok: true }; },
  async remove(k) { written.delete(k); return { ok: true }; },
};
const e1 = await hydrateApp.autosaveDraft(rec, meta, new Date('2026-11-18T00:01:00.000Z'), mod);
const e2 = await hydrateApp.autosaveWeek(facade.weekPayload(), meta, new Date('2026-11-18T00:02:00.000Z'), mod);
if (e1 || e2) { console.error('autosave refused', e1, e2); process.exit(2); }
const draftKey = hydrateApp.AUTO_DRAFT_KEY, weekKey = hydrateApp.AUTO_WEEK_KEY;
const out = { draftKey, weekKey, texts: { [draftKey]: written.get(draftKey), [weekKey]: written.get(weekKey) },
  nextWeek: facade.snapshot().state.nextWeek };
fs.writeFileSync('/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/ds-c81/envelopes.json', JSON.stringify(out));
console.error('wrote envelopes; nextWeek =', out.nextWeek, 'bytes', out.texts[draftKey].length, out.texts[weekKey].length);
