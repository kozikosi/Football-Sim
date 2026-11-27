// Random multi-device histories through the real client and the real API (D1-shaped sqlite), with offline spells, lost replies,
// writes made while a request is out, reloads and account switches. Checks after every history: nothing reaches another account; a
// slot sync replaces or removes was first kept as a local rung-back; on a lone device sync never changes a slot; once the network
// is back and nobody plays, devices stop changing and agree with the server.
// Run: node --experimental-strip-types scripts/sync-fuzz.ts                      (all modes, 1000 seeds each; exit 1 on a violation)
//      node --experimental-strip-types scripts/sync-fuzz.ts <mode> <count>       (more seeds of one mode)
//      node --experimental-strip-types scripts/sync-fuzz.ts <mode> 0 <seed>      (replay one history with its log)
import { memoryD1 } from '../test/sqlite-d1.ts';
import { handle } from '../src/api.ts';
import { serialize } from '../../colors/src/sports/nfl/app/saves.ts';
import { createSync } from '../../colors/src/sync/sync.ts';
import { createFetchTransport } from '../../colors/src/sync/transport.ts';
import { Clock, T0 } from '../../colors/test/sync/fake.ts';

const SL = ['A', 'B', 'C'] as const; const K = (s: string) => 'sim:nfl:slot:' + s;
const fp = (t: string | undefined | null) => { if (!t) return '-'; const e = JSON.parse(t); return e.saveId + '|' + e.saveRevision + '|' + e.savedAt; };
type Mode = { devices: number; users: number; offline: number; lost: number; race: number; steps: number };

const macrotask = () => new Promise((r) => setImmediate(r));
async function run(seed: number, m: Mode) {
  let x = seed * 2654435761 >>> 0 || 1; const rnd = () => { x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; };
  const pick = <T>(a: readonly T[]) => a[Math.floor(rnd() * a.length)]!;
  const db = await memoryD1(); const log: string[] = []; const bad: string[] = []; let t = 0, ids = 0, calm = false;
  const owners = new Map<string, Set<string>>();   // saveId -> accounts allowed to receive it ('*' = never tied to one)
  const devs: any[] = [];
  const make = (d: any) => {
    const fetchFn = (async (url: string, init?: any) => {
      await macrotask(); const user = d.session;     // as in a browser: the app only acts between tasks, e.g. while a request is out
      if (!calm && rnd() < m.offline) throw new Error('offline');
      const leakCheck = (status: number) => { if (status < 300 && ((init?.method === 'PUT' && url.includes('/saves/')) || (init?.method === 'POST' && url.endsWith('/runs')))) {
        const body = JSON.parse(init.body); const envs = body.envelope ? [body.envelope] : body.envelopes ?? body.runs ?? [];
        for (const e of envs) { const o = owners.get(e.saveId); if (o && !o.has('*') && !o.has(user)) bad.push(`LEAK ${e.saveId} (of ${[...o]}) sent as ${user} by d${d.i}`); }
      } };
      const res = await handle(new Request('http://x' + url, { ...init, headers: { ...(init?.headers ?? {}), 'x-test-user': user } }), { DB: db }, async (r: any) => r.headers.get('x-test-user'), new Date(T0 + t * 1000));
      log.push(`    d${d.i} ${init?.method ?? 'GET'} ${url} -> ${res.status}`); leakCheck(res.status);
      await macrotask();
      if (!calm && rnd() < m.race) appOp(d, true);
      if (!calm && rnd() < m.lost) { log.push('      reply lost'); throw new Error('reply lost'); }
      return res;
    }) as any;
    d.clock = d.clock ?? new Clock(); d.clock.timers.clear();
    const storage = {
      read: async (k: string) => ({ ok: true, value: d.data.get(k) ?? null }),
      write: async (k: string, v: string) => { guard(d, k, v); d.data.set(k, v); return { ok: true, value: undefined }; },
      remove: async (k: string) => { guard(d, k, null); d.data.delete(k); return { ok: true, value: undefined }; },
      keys: async (p: string) => ({ ok: true, value: [...d.data.keys()].filter((k: any) => k.startsWith(p)).sort() }),
      entries: async (p: string) => ({ ok: true, value: [...d.data.entries()].filter(([k]: any) => k.startsWith(p)).sort() }),
    };
    d.sync = createSync({ storage, transport: createFetchTransport(fetchFn), now: d.clock.now, setTimer: d.clock.setTimer, clearTimer: d.clock.clearTimer, newId: () => 'dev-' + d.i, random: rnd });
  };
  const guard = (d: any, k: string, v: string | null) => {
    const mm = /^sim:nfl:slot:([ABC])$/.exec(k); if (!mm) return;
    const old = d.data.get(k);
    log.push(`    d${d.i} sync ${v === null ? 'removes' : 'writes'} ${mm[1]}: ${fp(old)} => ${fp(v)}`);
    if (m.devices === 1 && m.users === 1 && fp(old) !== fp(v)) bad.push(`SOLO sync changed slot ${mm[1]} on the only device: ${fp(old)} => ${fp(v)}`);
    if (old !== undefined && old !== v && ![...d.data.entries()].some(([ak, av]: any) => ak.startsWith('sim:nfl:sync-archive:' + mm[1] + ':') && av === old)) bad.push(`LOST d${d.i} slot ${mm[1]} ${fp(old)} replaced with no local rung-back`);
  };
  const recUser = (d: any): string | null => { const r = d.data.get('sim:nfl:sync'); return r ? JSON.parse(r).userId : null; };
  function appOp(d: any, inflight = false) {
    const s = pick(SL), cur = d.data.get(K(s)), r = rnd(); t++;
    if (cur && r < 0.2) { d.data.delete(K(s)); log.push(`  ${inflight ? '(mid-request) ' : ''}d${d.i} user deletes ${s} (${fp(cur)})`); d.sync.notifyDeleted(s); return; }
    const adv = cur && r < 0.75;
    const e = adv ? JSON.parse(cur) : null;
    const saveId = adv ? e.saveId : 'g' + ++ids;
    if (!adv) owners.set(saveId, new Set([recUser(d) ?? '*']));
    const meta = { engineVersion: 'e1', dataVersion: 'sha256:' + 'a'.repeat(64), saveId, saveRevision: adv ? e.saveRevision + 1 : 1, createdAt: new Date(T0).toISOString() };
    const text = serialize('draft', s, meta, { seed: 1, userTeam: 0, picks: [], pool: [] }, new Date(T0 + t * 1000));
    d.data.set(K(s), text); const why = pick(['edit', 'week'] as const);
    log.push(`  ${inflight ? '(mid-request) ' : ''}d${d.i} user ${adv ? 'plays' : 'starts'} ${s}: ${fp(text)} [${why}]`);
    d.sync.notifySaved(s, why);
  }
  const idle = async (d: any) => { let timer: any; await Promise.race([d.sync.idle(), new Promise((_, no) => { timer = setTimeout(() => no(new Error('idle hang')), 2000); })]).finally(() => clearTimeout(timer)); };
  const signIn = async (d: any, u: string) => {
    d.session = u; log.push(`  d${d.i} signs in ${u}`);
    const out = await d.sync.signIn(u);
    if (out.kind === 'needs-account-choice') {
      if (rnd() < 0.3) { log.push('    keeps separate'); await d.sync.resolveAccountSwitch({ action: 'keep-separate' }); return; }
      const slots = SL.filter(() => rnd() < 0.3);
      for (const s of slots) { const v = d.data.get(K(s)); if (v) owners.get(JSON.parse(v).saveId)?.add(u); }
      log.push('    adopts ' + slots.join(',')); await d.sync.resolveAccountSwitch({ action: 'adopt', slots });
    }
  };
  for (let i = 0; i < m.devices; i++) { const d = { i, data: new Map<string, string>(), session: 'u1' }; make(d); devs.push(d); await signIn(d, 'u1'); }
  for (let step = 0; step < m.steps && !bad.length; step++) {
    await macrotask(); const d = pick(devs), r = rnd();
    if (r < 0.5) appOp(d);
    else if (r < 0.62) { log.push(`  d${d.i} focus`); d.sync.onVisible(60_000); }
    else if (r < 0.72) { const ms = pick([1000, 10_000, 70_000]); log.push(`  d${d.i} +${ms}ms`); await d.clock.advance(ms); }
    else if (r < 0.76) { log.push(`  d${d.i} online`); d.sync.onOnline(); }
    else if (r < 0.82) { log.push(`  d${d.i} reload`); d.sync.flush(); await idle(d); d.sync.signOut(); make(d); await signIn(d, d.session); }
    else if (r < 0.88 && m.users > 1) { d.sync.signOut(); await signIn(d, d.session === 'u1' ? 'u2' : 'u1'); }
    else if (r < 0.9) { const s = pick(SL); const h = await d.sync.serverHistory(s); if (h.ok && h.value.length) { const e = pick(h.value) as any; log.push(`  d${d.i} restores ${s} #${e.archivedSeq} ${e.saveId}@${e.saveRevision}`); m.devices === 1 ? null : await d.sync.restoreFromServer(s, e.archivedSeq); } }
    else appOp(d);
    if (rnd() < 0.7) await idle(d);
  }
  // quiet period: network fine, nobody plays; everything must settle and agree
  calm = true;
  const snap = async () => JSON.stringify([(await db.all('SELECT user_id, slot, server_rev, save_id, save_revision, deleted_at FROM saves ORDER BY 1,2')), devs.map((d) => SL.map((s) => fp(d.data.get(K(s)))))]);
  let before = '', after = '';
  for (let round = 0; round < 8 && !bad.length; round++) {
    for (const d of devs) { d.sync.onOnline(); await d.clock.advance(200_000); await idle(d); d.sync.onVisible(60_000); await idle(d); d.sync.flush(); await idle(d); }
    before = after; after = await snap();
  }
  if (!bad.length && before !== after) bad.push('LOOP still changing after 8 quiet rounds');
  if (!bad.length) for (const d of devs) {
    if (d.sync.status().kind === 'off') continue;
    const held = d.sync.heldSlots();
    for (const s of SL) {
      if (held.includes(s)) continue;
      const row = await db.get('SELECT save_id, save_revision, saved_at, deleted_at FROM saves WHERE user_id = ? AND slot = ?', d.session, s) as any;
      const srv = row && !row.deleted_at ? row.save_id + '|' + row.save_revision + '|' + row.saved_at : '-';
      if (srv !== fp(d.data.get(K(s)))) bad.push(`DIVERGED d${d.i} (${d.session}) slot ${s}: device ${fp(d.data.get(K(s)))} server ${srv} status ${JSON.stringify(d.sync.status())}`);
    }
  }
  return { bad, log };
}

const modes: Record<string, Mode> = {
  solo: { devices: 1, users: 1, offline: 0.1, lost: 0, race: 0.1, steps: 30 },
  soloLost: { devices: 1, users: 1, offline: 0.05, lost: 0.15, race: 0.1, steps: 30 },
  pair: { devices: 2, users: 1, offline: 0.1, lost: 0.05, race: 0.08, steps: 35 },
  shared: { devices: 2, users: 2, offline: 0.05, lost: 0.05, race: 0.08, steps: 35 },
};
const [name, count = '1000', show] = process.argv.slice(2);
if (show) { const r = await run(Number(show), modes[name!]!); console.log(r.log.join('\n')); console.log(r.bad.join('\n')); process.exit(r.bad.length ? 1 : 0); }
for (const mode of name ? [name] : Object.keys(modes)) {
  const found = new Map<string, { n: number; seed: number; len: number; msg: string }>();
  for (let seed = 1; seed <= Number(count); seed++) {
    let r; try { r = await run(seed, modes[mode]!); } catch (e: any) { r = { bad: ['CRASH ' + e.message], log: [] }; }
    if (r.bad.length) { const k = r.bad[0]!.split(' ')[0]!; const f = found.get(k); if (!f) found.set(k, { n: 1, seed, len: r.log.length, msg: r.bad[0]! }); else { f.n++; if (r.log.length < f.len) { f.len = r.log.length; f.seed = seed; f.msg = r.bad[0]!; } } }
  }
  console.log(mode, count, 'histories;', found.size ? '' : 'no violations');
  for (const [k, f] of found) console.log(` ${k}: ${f.n} histories; shortest seed ${f.seed} (${f.len} lines): ${f.msg}`);
  if (found.size) process.exitCode = 1;
}
