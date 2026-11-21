// End to end in workerd: the real Worker bundle (src/worker.ts + Better Auth + our API) on Miniflare's D1, with GitHub mocked at the network edge.
// Only with D1_BACKEND=miniflare. What it is not: production Cloudflare, or the real GitHub (the OAuth app, secrets and callback URL are the rehearsal).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
import { Miniflare } from 'miniflare';
import { getMigrations } from 'better-auth/db/migration';
import { authOptions } from '../src/auth.ts';
import { draftEnv } from './helpers.ts';

const live = process.env.D1_BACKEND === 'miniflare';
const ORIGIN = 'https://play.76pancakes.workers.dev';
let mf: Miniflare; let d1: any;

before(async () => {
  if (!live) return;
  const out = await build({ entryPoints: [new URL('../src/worker.ts', import.meta.url).pathname], bundle: true, format: 'esm', platform: 'neutral', conditions: ['workerd', 'worker', 'browser'], mainFields: ['module', 'main'], external: ['node:*'], write: false, logLevel: 'silent' });
  mf = new Miniflare({
    modules: [{ type: 'ESModule', path: 'worker.mjs', contents: out.outputFiles[0].text }], modulesRoot: '.',
    compatibilityDate: '2026-08-06', compatibilityFlags: ['nodejs_compat'], d1Databases: { DB: 'e2e' },
    bindings: { BASE_URL: ORIGIN, BETTER_AUTH_SECRET: 'e2e-' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join(''), GITHUB_CLIENT_ID: 'e2e-client', GITHUB_CLIENT_SECRET: 'e2e-secret' },
    outboundService: async (req) => {
      const u = req.url;
      if (u.startsWith('https://github.com/login/oauth/access_token')) { const code = new URLSearchParams(await req.text()).get('code'); return Response.json({ access_token: 'tok-' + code, token_type: 'bearer', scope: 'read:user,user:email' }); }
      const who = (req.headers.get('authorization') ?? '').replace(/^(Bearer|token) tok-/i, '');
      if (u === 'https://api.github.com/user') return Response.json({ id: 1000 + who.length * 7 + who.charCodeAt(0), login: who, name: who, email: who + '@example.com', avatar_url: 'https://example.com/a.png' });
      if (u === 'https://api.github.com/user/emails') return Response.json([{ email: who + '@example.com', primary: true, verified: true }]);
      return new Response('blocked ' + u, { status: 502 });
    },
  });
  d1 = await mf.getD1Database('DB');
  for (const f of ['0001_init.sql', '0002_better_auth.sql'])
    for (const s of readFileSync(new URL('../migrations/' + f, import.meta.url), 'utf8').split(/;\s*\n/).map((x) => x.replace(/^(\s*--.*\n)+/g, '').trim()).filter(Boolean)) await d1.prepare(s).run();
});
after(async () => { if (mf) await mf.dispose(); });

const send = (path: string, init: RequestInit & { cookie?: string; origin?: string | null } = {}) => {
  const { cookie, origin = ORIGIN, ...rest } = init;
  const headers: Record<string, string> = { 'content-type': 'application/json', ...(rest.headers as Record<string, string> | undefined) };
  if (cookie) headers.cookie = cookie;
  if (origin) headers.origin = origin;
  return mf.dispatchFetch(ORIGIN + path, { redirect: 'manual', ...rest, headers });
};
const cookiePairs = (r: Response) => r.headers.getSetCookie().map((c) => c.split(';')[0]);
async function login(user: string): Promise<{ cookie: string; setCookie: string }> {
  const start = await send('/api/auth/sign-in/social', { method: 'POST', body: JSON.stringify({ provider: 'github', callbackURL: '/' }) });
  assert.equal(start.status, 200);
  const state = new URL(((await start.json()) as any).url).searchParams.get('state')!;
  const cb = await send('/api/auth/callback/github?code=' + user + '&state=' + state, { cookie: cookiePairs(start).join('; ') });
  assert.equal(cb.status, 302);
  const session = cb.headers.getSetCookie().find((c) => c.includes('session_token'))!;
  assert.ok(session, 'the callback set a session cookie');
  return { cookie: session.split(';')[0], setCookie: session };
}

test('e2e: sign-in, isolation, CSRF, route allowlist, sign-out, token encryption', { skip: !live && 'needs D1_BACKEND=miniflare' }, async () => {
  // The migration file matches what Better Auth's D1 dialect expects (nothing left to create or add).
  const m = await getMigrations(authOptions({ DB: d1, BASE_URL: ORIGIN, BETTER_AUTH_SECRET: 'x'.repeat(40), GITHUB_CLIENT_ID: 'x', GITHUB_CLIENT_SECRET: 'x' }) as never);
  assert.deepEqual([m.toBeCreated.length, m.toBeAdded.length], [0, 0]);

  // Public, and anonymous is refused.
  assert.equal((await send('/api/health')).status, 200);
  assert.equal((await send('/api/saves')).status, 401);
  assert.equal(await (await send('/api/auth/get-session')).json(), null);

  const alice = await login('alice'), bob = await login('bob');
  for (const f of ['HttpOnly', 'Secure', 'SameSite=Lax', 'Max-Age=2592000']) assert.ok(alice.setCookie.includes(f), 'session cookie has ' + f + ': ' + alice.setCookie);

  // Alice writes; Bob, with his own real session, sees nothing of hers.
  const put = await send('/api/saves/nfl/A', { method: 'PUT', cookie: alice.cookie, body: JSON.stringify({ envelope: draftEnv('A', 'alice-lineage', 1), base: null }) });
  assert.equal(put.status, 200);
  assert.equal(((await (await send('/api/saves', { cookie: alice.cookie })).json()) as any).saves.length, 1);
  assert.deepEqual(((await (await send('/api/saves', { cookie: bob.cookie })).json()) as any).saves, []);
  assert.equal((await send('/api/saves/nfl/A', { cookie: bob.cookie })).status, 404);
  const bobWrite = await send('/api/saves/nfl/A', { method: 'PUT', cookie: bob.cookie, body: JSON.stringify({ envelope: draftEnv('A', 'bob-lineage', 1), base: 1 }) });
  assert.equal(bobWrite.status, 409); assert.ok(!(await bobWrite.text()).includes('alice'));
  assert.equal(((await (await send('/api/saves/nfl/A', { cookie: alice.cookie })).json()) as any).envelope.saveId, 'alice-lineage');

  // CSRF defence: a state-changing request from another origin, or with none, is refused before it reaches the API.
  for (const origin of ['https://evil.example', null])
    assert.equal((await send('/api/saves/nfl/A', { method: 'PUT', cookie: alice.cookie, origin, body: JSON.stringify({ envelope: draftEnv('A', 'alice-lineage', 2), base: 1 }) })).status, 403);
  assert.equal(((await (await send('/api/saves/nfl/A', { cookie: alice.cookie })).json()) as any).envelope.saveRevision, 1, 'the cross-origin write changed nothing');

  // Only the allowlisted auth routes exist.
  for (const [method, path] of [['POST', '/api/auth/sign-up/email'], ['POST', '/api/auth/sign-in/email'], ['POST', '/api/auth/change-email'], ['POST', '/api/auth/change-password'],
    ['POST', '/api/auth/delete-user'], ['POST', '/api/auth/set-password'], ['POST', '/api/auth/request-password-reset'], ['GET', '/api/auth/list-sessions'], ['POST', '/api/auth/update-user']])
    assert.equal((await send(path, { method, cookie: alice.cookie, body: method === 'POST' ? '{}' : undefined })).status, 404, method + ' ' + path);

  // GitHub's token is not stored in the clear.
  const acc = await d1.prepare('SELECT accessToken, providerId FROM account').all();
  assert.equal(acc.results.length, 2);
  for (const r of acc.results) { assert.equal(r.providerId, 'github'); assert.ok(!String(r.accessToken ?? '').includes('tok-'), 'access token is encrypted at rest'); }

  // Sign-out ends the session.
  assert.equal((await send('/api/auth/sign-out', { method: 'POST', cookie: alice.cookie, body: '{}' })).status, 200);
  assert.equal((await send('/api/saves', { cookie: alice.cookie })).status, 401);
  assert.equal((await send('/api/saves', { cookie: bob.cookie })).status, 200, "Bob's session is unaffected");
});
