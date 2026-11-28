// LOCAL rehearsal of the deployed shape: built page + static assets + the real Worker + Better Auth session check + local D1, under
// `wrangler dev --local`, driven by Chromium. Nothing is deployed, created or sent to Cloudflare. Not covered: real GitHub sign-in
// (sessions are inserted into the local database), production limits, version rollback.
//
// Needs: `cd colors && npm run build` first; wrangler (WRANGLER=<path to its binary>); Playwright with Chromium.
//   WRANGLER=... node server/scripts/local-rehearsal.mjs --work <empty folder outside the repo> --data <private folder with the three CSVs>
import { spawn, spawnSync } from 'node:child_process';
import { createHmac, randomBytes } from 'node:crypto';
import { cpSync, mkdirSync, openSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const arg = (n) => { const i = process.argv.indexOf('--' + n); return i > 0 ? resolve(process.argv[i + 1]) : null; };
const WORK = arg('work'), DATA = arg('data'), WRANGLER = process.env.WRANGLER;
if (!WORK || !DATA || !WRANGLER) { console.error('usage: WRANGLER=<bin> node server/scripts/local-rehearsal.mjs --work <dir> --data <dir>'); process.exit(2); }
if (WORK.startsWith(REPO)) { console.error('--work must be outside the repo'); process.exit(2); }
mkdirSync(WORK, { recursive: true });
if (readdirSync(WORK).length) { console.error('--work must be empty'); process.exit(2); }

const PORT = 8787, INSPECT = 9229, ORIGIN = 'http://localhost:' + PORT, dist = join(WORK, 'dist');
const env = { ...process.env, WRANGLER_SEND_METRICS: 'false', NO_PROXY: 'localhost,127.0.0.1', no_proxy: 'localhost,127.0.0.1' };
const run = (cmd, args) => { const r = spawnSync(cmd, args, { cwd: WORK, env, encoding: 'utf8' }); if (r.status !== 0) { console.error(r.stdout, r.stderr); throw new Error(cmd + ' ' + args.join(' ') + ' failed'); } return r.stdout; };

// 1. the site folder: the built page, the dataset asset, and a throwaway harness that exposes the real sync client
cpSync(join(REPO, 'colors', 'dist'), dist, { recursive: true });
console.log(run(process.execPath, [join(REPO, 'tools', 'release-assemble.mjs'), '--dist', dist, '--dataset', DATA, '--log', join(WORK, 'dataset-log.md')]).trim().split('\n').pop());
writeFileSync(join(WORK, 'harness.ts'), `
import { createSync } from '${REPO}/colors/src/sync/sync.ts';
import { createFetchTransport } from '${REPO}/colors/src/sync/transport.ts';
import { draftEnv } from '${REPO}/server/test/helpers.ts';
const k = (key) => key;
const storage = {
  read: async (key) => ({ ok: true, value: localStorage.getItem(k(key)) }),
  write: async (key, t) => { try { localStorage.setItem(key, t); return { ok: true, value: undefined }; } catch (e) { return { ok: false, error: String(e) }; } },
  remove: async (key) => { localStorage.removeItem(key); return { ok: true, value: undefined }; },
  keys: async (p) => ({ ok: true, value: Object.keys(localStorage).filter((x) => x.startsWith(p)).sort() }),
  entries: async (p) => ({ ok: true, value: Object.keys(localStorage).filter((x) => x.startsWith(p)).sort().map((x) => [x, localStorage.getItem(x)]) }),
};
const transport = createFetchTransport(fetch.bind(globalThis));
const sync = createSync({ storage, transport, now: () => Date.now(), setTimer: (f, ms) => setTimeout(f, ms), clearTimer: (h) => clearTimeout(h), newId: () => crypto.randomUUID() });
addEventListener('pagehide', () => sync.flush());
addEventListener('online', () => sync.onOnline());
window.H = { sync, transport, env: draftEnv, put: (slot, id, rev, pool) => localStorage.setItem('sim:nfl:slot:' + slot, JSON.stringify(draftEnv(slot, id, rev, pool ?? 0))),
  get: (slot) => { const t = localStorage.getItem('sim:nfl:slot:' + slot); return t ? JSON.parse(t) : null; } };
`);
const esbuild = require(join(REPO, 'server', 'node_modules', 'esbuild'));
await esbuild.build({ entryPoints: [join(WORK, 'harness.ts')], bundle: true, format: 'iife', outfile: join(dist, 'harness.js'), logLevel: 'error' });
writeFileSync(join(dist, 'harness.html'), '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>rehearsal</title><link rel="icon" href="data:,"><script src="/harness.js"></script>');

// 2. the Worker config: the committed one, with local paths, a local origin and the rate limit switched on
const base = readFileSync(join(REPO, 'server', 'wrangler.jsonc'), 'utf8').replace('// "ratelimits"', '"ratelimits"');
const config = JSON.parse(base.replace(/^\s*\/\/.*$/gm, '').replace(/(?<=[,\]}\w"])\s+\/\/[^"\n]*$/gm, ''));
config.main = join(REPO, 'server', 'src', 'worker.ts'); config.assets.directory = dist;
config.d1_databases[0].migrations_dir = join(REPO, 'server', 'migrations'); config.vars.BASE_URL = ORIGIN;
writeFileSync(join(WORK, 'wrangler.json'), JSON.stringify(config, null, 1));
const SECRET = randomBytes(32).toString('hex');
writeFileSync(join(WORK, '.dev.vars'), `BETTER_AUTH_SECRET=${SECRET}\nGITHUB_CLIENT_ID=local\nGITHUB_CLIENT_SECRET=local\n`);

const persist = ['--local', '--persist-to', join(WORK, 'state')];
const sql = (command) => JSON.parse(run(WRANGLER, ['d1', 'execute', 'play', ...persist, '--json', '--command', command]))[0].results;
run(WRANGLER, ['d1', 'migrations', 'apply', 'play', ...persist]);
const now = Date.now(), iso = new Date(now).toISOString(), later = new Date(now + 864e5).toISOString();
const cookies = {};
for (const u of ['u1', 'u2', 'u3']) {
  const token = randomBytes(24).toString('hex');
  sql(`insert into "user" values ('${u}', '${u}', '${u}@example.com', 1, null, '${iso}', '${iso}'); insert into "session" values ('s-${u}', '${later}', '${token}', '${iso}', '${iso}', null, null, '${u}')`);
  cookies[u] = { name: 'better-auth.session_token', value: encodeURIComponent(token + '.' + createHmac('sha256', SECRET).update(token).digest('base64')), url: ORIGIN, httpOnly: true, sameSite: 'Lax' };
}

// A server left over from an earlier run would answer in place of this one and make the results meaningless.
if (await fetch(ORIGIN + '/api/health').then(() => true, () => false)) { console.error('something already answers on ' + ORIGIN + '; stop it first'); process.exit(2); }
const log = openSync(join(WORK, 'wrangler.log'), 'w');
const dev = spawn(WRANGLER, ['dev', ...persist, '--port', String(PORT), '--inspector-port', String(INSPECT)], { cwd: WORK, env, stdio: ['ignore', log, log], detached: true });
const results = []; let failed = 0;
const check = (name, ok, detail = '') => { results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  [' + detail + ']' : ''}`); if (!ok) failed++; };
let browser;
try {
  for (let i = 0; ; i++) { try { if ((await fetch(ORIGIN + '/api/health')).ok) break; } catch { /* not up yet */ } if (i > 90) throw new Error('wrangler dev did not start'); await new Promise((r) => setTimeout(r, 1000)); }

  const get = async (path, init) => { const r = await fetch(ORIGIN + path, init); return { status: r.status, type: r.headers.get('content-type') ?? '', headers: r.headers, text: await r.text() }; };
  const home = await get('/'); check('built page is served', home.status === 200 && home.type.includes('text/html'));
  const data = await get('/dataset/nfl.json'); check('dataset asset is served as JSON', data.status === 200 && data.type.includes('json'), data.text.length + ' bytes');
  // Version skew: an old open tab asking for a build file that a rollback removed. Recorded, not judged: confirm on the real deploy.
  const gone = await get('/assets/removed-by-a-rollback.json');
  results.push(`INFO  a missing build file is answered with ${gone.status} ${gone.type} on this local runtime`);
  const anon = await get('/api/saves'); check('anonymous sync request is refused', anon.status === 401);
  const ck = (u) => ({ cookie: cookies[u].name + '=' + cookies[u].value });
  const forged = await get('/api/saves', { headers: { cookie: cookies.u1.name + '=' + cookies.u1.value.slice(0, -6) + 'AAAAAA' } }); check('a tampered session cookie is refused', forged.status === 401);
  const cross = await get('/api/saves/nfl/A', { method: 'PUT', headers: { ...ck('u1'), origin: 'https://evil.example', 'content-type': 'application/json' }, body: '{}' }); check('cross-origin write is refused', cross.status === 403);

  const { chromium } = require('playwright');
  browser = await chromium.launch();
  const errors = [];
  const device = async (user) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    await context.addCookies([cookies[user]]);
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(ORIGIN + '/harness.html'); await page.waitForFunction(() => window.H);
    const run = (f, a) => page.evaluate(f, a);
    return { context, page, run, signIn: () => run((u) => H.sync.signIn(u), user),
      focus: () => run(async () => { H.sync.onVisible(60_000); await H.sync.idle(); }),
      save: (slot, id, rev, why = 'week', pool = 0) => run(async ([s, i, r, w, p]) => { H.put(s, i, r, p); H.sync.notifySaved(s, w); if (w !== 'edit') await H.sync.idle(); }, [slot, id, rev, why, pool]),
      rev: (slot) => run((s) => H.get(s)?.saveRevision ?? null, slot), status: () => run(() => H.sync.status()) };
  };
  const server = async (slot) => { const r = await get('/api/saves/nfl/' + slot, { headers: ck('u1') }); return r.status === 200 ? JSON.parse(r.text).envelope.saveRevision : r.status; };

  const a = await device('u1'), b = await device('u1');
  await a.run(() => H.put('A', 's1', 1, 1900));
  const bytes = await a.run(() => localStorage.getItem('sim:nfl:slot:A').length);
  let t = Date.now(); const first = await a.signIn(); const took = Date.now() - t;
  check('first sign-in uploads a large draft save', first.kind === 'ok' && (await server('A')) === 1, `${bytes} chars, whole sign-in ${took} ms on this machine`);
  await b.signIn(); check('second browser receives it', (await b.rev('A')) === 1);
  await a.save('A', 's1', 2); await b.focus(); check('progress reaches the second browser', (await b.rev('A')) === 2);
  await a.run(async () => { localStorage.removeItem('sim:nfl:slot:A'); H.sync.notifyDeleted('A'); await H.sync.idle(); });
  await b.focus(); check('a delete is applied on the second browser', (await b.rev('A')) === null && (await server('A')) === 404);
  const restored = await b.run(async () => { const h = await H.sync.serverHistory('A'); return h.ok ? H.sync.restoreFromServer('A', h.value[0].archivedSeq) : h; });
  await a.focus(); check('restore brings it back on both', restored.ok === true && (await a.rev('A')) === 2 && (await b.rev('A')) === 2);

  await a.context.setOffline(true); await a.save('A', 's1', 3); const off = await a.status();
  await a.context.setOffline(false); await a.page.waitForFunction(() => H.sync.status().kind === 'idle', null, { timeout: 15_000 }).catch(() => {});
  check('offline save is sent when the network returns', off.kind === 'failed' && (await server('A')) === 3, 'offline status ' + off.kind);

  await a.save('A', 's1', 4, 'edit'); await a.page.goto('about:blank');
  let r4; for (let i = 0; i < 20 && (r4 = await server('A')) !== 4; i++) await new Promise((r) => setTimeout(r, 250));
  check('leaving the page sends a small pending edit', r4 === 4, String(r4));
  await a.page.goto(ORIGIN + '/harness.html'); await a.page.waitForFunction(() => window.H); await a.signIn();
  check('the pending edit is on the server after the next load', (await server('A')) === 4);
  await a.save('B', 'small', 1); await a.save('B', 'small', 2, 'edit'); await a.page.goto('about:blank');
  let rb; for (let i = 0; i < 20 && (rb = await server('B')) !== 2; i++) await new Promise((r) => setTimeout(r, 250));
  check('leaving the page sends a second small pending edit', rb === 2, String(rb));
  await a.page.goto(ORIGIN + '/harness.html'); await a.page.waitForFunction(() => window.H); await a.signIn();
  await a.save('A', 's1', 5, 'edit', 1900); await a.page.goto('about:blank');
  await new Promise((r) => setTimeout(r, 2000)); const onLeave = await server('A');
  await a.page.goto(ORIGIN + '/harness.html'); await a.page.waitForFunction(() => window.H); const kept = await a.rev('A'); await a.signIn();
  check('a large pending edit survives leaving the page and is on the server after the next load', kept === 5 && (await server('A')) === 5,
    onLeave === 5 ? 'arrived while leaving on this machine; not to be relied on, it is too large for keepalive' : 'did not arrive while leaving (too large for keepalive); the local copy was sent on the next load');

  const link = await b.run(() => H.sync.shareSave('A'));
  const open = link.ok ? await get('/api/share/' + link.value.token) : { status: 0, text: '' };
  check('a share link opens without signing in', open.status === 200 && !open.text.includes('u1@example.com'));
  if (link.ok) await b.run((id) => H.sync.revokeShare(id), link.value.id);
  check('a revoked link is gone', link.ok && (await get('/api/share/' + link.value.token)).status === 410);

  await b.context.addCookies([cookies.u2]); await b.save('A', 's1', 9);
  const other = await get('/api/saves', { headers: ck('u2') }); const st = await b.status();
  check('another account signing in elsewhere in the browser receives nothing', other.status === 200 && JSON.parse(other.text).saves.length === 0 && st.kind === 'off', 'page status ' + st.kind);

  const c = await device('u1'); await c.page.route('**/api/**', async (route) => { const res = await route.fetch(); await route.fulfill({ response: res, headers: { ...res.headers(), 'x-api-version': '2' } }); });
  const skew = await c.signIn(); check('a server speaking another API version asks for a reload', skew.kind === 'failed' && /reload/.test(skew.reason), skew.reason ?? '');
  const newer = await a.run(async () => { const e = JSON.parse(localStorage.getItem('sim:nfl:slot:B')); e.schemaVersion = 99; const r = await fetch('/api/saves/nfl/C', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ envelope: { ...e, slot: 'C' }, base: null }) }).catch(() => null); return r ? r.status : 0; }).catch(() => 0);
  const newerDirect = newer || (await get('/api/saves/nfl/C', { method: 'PUT', headers: { ...ck('u1'), origin: ORIGIN, 'content-type': 'application/json' }, body: JSON.stringify({ envelope: { ...JSON.parse((await get('/api/saves/nfl/B', { headers: ck('u1') })).text).envelope, schemaVersion: 99, slot: 'C' }, base: null }) })).status;
  check('a save from a newer build is refused (426), not stored', newerDirect === 426 && (await server('C')) === 404, String(newerDirect));

  sql(`update saves set deleted_at = '2020-01-01T00:00:00.000Z' where user_id = 'u1' and slot = 'B'`);
  // `/__scheduled` (--test-scheduled) is answered by the asset router when the site has assets, so use the runtime's own local route.
  const cron = await get('/cdn-cgi/local/scheduled?cron=17+3+*+*+*');
  const left = sql(`select count(*) n from saves where user_id = 'u1' and slot = 'B'`)[0].n;
  check('the daily purge runs and removes an old deleted save', cron.status === 200 && left === 0, `status ${cron.status} ${cron.text.slice(0, 80)}, rows left ${left}`);

  const codes = []; for (let i = 0; i < 90; i++) codes.push((await get('/api/saves', { headers: ck('u3') })).status);
  const n429 = codes.filter((x) => x === 429).length;
  check('the rate limit binding limits one user (local simulation)', n429 > 0 && codes[0] === 200, `${90 - n429} allowed, ${n429} refused`);
  check('another user is not limited by it', (await get('/api/saves', { headers: ck('u2') })).status === 200);

  check('no uncaught page errors', errors.length === 0, errors.join(' | '));

  // Processor time of the Worker itself per request, sampled through the runtime's profiler. The local database runs apart from it, as in
  // production. Read the numbers as a guide only: they include local development instrumentation, and this machine is not Cloudflare's.
  const ws = new WebSocket(`ws://localhost:${INSPECT}/ws`, { headers: { origin: `http://localhost:${INSPECT}` } });
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('could not reach the profiler')); });
  let seq = 0; const waiting = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); waiting.get(d.id)?.(d); };
  const cdp = (method, params) => new Promise((res, rej) => { const id = ++seq; const h = setTimeout(() => rej(new Error('profiler timeout: ' + method)), 20_000);
    waiting.set(id, (d) => { clearTimeout(h); waiting.delete(id); if (d.error) rej(new Error(d.error.message)); else res(d.result); }); ws.send(JSON.stringify({ id, method, params })); });
  await cdp('Profiler.enable'); await cdp('Profiler.setSamplingInterval', { interval: 100 });
  const busy = async (n, one) => {
    await cdp('Profiler.start'); for (let i = 0; i < n; i++) await one(i); const { profile } = await cdp('Profiler.stop');
    const idle = new Set(profile.nodes.filter((x) => x.callFrame.functionName === '(idle)').map((x) => x.id));
    return (profile.samples.reduce((sum, id, i) => sum + (idle.has(id) ? 0 : profile.timeDeltas[i]), 0) / 1000 / n).toFixed(1);
  };
  const health = () => get('/api/health');
  for (let i = 0; i < 20; i++) await health();
  results.push(`INFO  processor time, health request (no database, no session): ${await busy(100, health)} ms`);
  for (const [label, pool] of [['about 90K characters', 1250], ['near the 256 KB limit', 3600]]) {
    const envelope = await a.run((p) => H.env('A', 'big', 1, p), pool);
    const size = Buffer.byteLength(JSON.stringify(envelope));
    const heads = Array.from({ length: 8 }, (_, i) => {
      const u = `p${pool}-${i}`, token = randomBytes(24).toString('hex');
      sql(`insert into "user" values ('${u}', '${u}', '${u}@example.com', 1, null, '${iso}', '${iso}'); insert into "session" values ('s-${u}', '${later}', '${token}', '${iso}', '${iso}', null, null, '${u}')`);
      return { cookie: 'better-auth.session_token=' + encodeURIComponent(token + '.' + createHmac('sha256', SECRET).update(token).digest('base64')), origin: ORIGIN, 'content-type': 'application/json' };
    });
    const revs = new Map(); let bad = 0, n = 0;   // at most about 40 requests per user, inside the per-user limit
    const upload = async (u, slot) => {
      const r = await get('/api/saves/nfl/' + slot, { method: 'PUT', headers: heads[u], body: JSON.stringify({ envelope: { ...envelope, slot, saveRevision: ++n }, base: revs.get(u + slot) ?? null }) });
      if (r.status === 200) revs.set(u + slot, JSON.parse(r.text).serverRev); else bad++;
    };
    const expect200 = async (path, u) => { if ((await get(path, { headers: heads[u] })).status !== 200) bad++; };
    for (let i = 0; i < 16; i++) await upload(i % 8, 'A');
    const up = await busy(200, (i) => upload(i % 8, 'A'));
    for (let u = 0; u < 8; u++) for (const slot of ['B', 'C']) await upload(u, slot);
    const list = await busy(40, (i) => expect200('/api/saves', i % 8));
    const down = await busy(40, (i) => expect200('/api/saves/nfl/A', i % 8));
    check(`uploads, listings and downloads of a save ${label} all succeed`, bad === 0 && size <= 256 * 1024, `${size} bytes, ${bad} failed`);
    results.push(`INFO  processor time per request, save ${label}: upload ${up} ms, list of 3 saves ${list} ms, download ${down} ms`);
  }
  ws.close();
} catch (e) {
  check('rehearsal ran to the end', false, e.message);
} finally {
  await browser?.close();
  try { process.kill(-dev.pid, 'SIGTERM'); } catch { /* already gone */ }
}
console.log(results.join('\n'));
console.log(failed ? failed + ' FAILED' : 'all ' + results.filter((r) => r.startsWith('PASS')).length + ' checks passed');
process.exit(failed ? 1 : 0);
