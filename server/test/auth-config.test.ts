import { test } from 'node:test';
import assert from 'node:assert/strict';
import { authOptions, authPathAllowed } from '../src/auth.ts';

const env = { DB: {}, BASE_URL: 'https://play.76pancakes.workers.dev', BETTER_AUTH_SECRET: 'x'.repeat(40), GITHUB_CLIENT_ID: 'gid', GITHUB_CLIENT_SECRET: 'gsec' };

test('auth config: no credentials, GitHub only unless Google is configured, tokens encrypted, fixed origin', () => {
  const o = authOptions(env);
  assert.equal(o.emailAndPassword.enabled, false);
  assert.deepEqual(Object.keys(o.socialProviders), ['github']);
  assert.deepEqual(Object.keys(authOptions({ ...env, GOOGLE_CLIENT_ID: 'a', GOOGLE_CLIENT_SECRET: 'b' }).socialProviders), ['github', 'google']);
  assert.deepEqual(Object.keys(authOptions({ ...env, GOOGLE_CLIENT_ID: 'a' }).socialProviders), ['github'], 'half-configured Google stays off');
  assert.equal(o.account.encryptOAuthTokens, true);
  assert.equal(o.baseURL, 'https://play.76pancakes.workers.dev');
  assert.equal(o.session.expiresIn, 30 * 86400);
});

test('auth allowlist: exactly sign-in/social, callback, get-session, sign-out, ok, error', () => {
  const yes: [string, string][] = [['POST', '/api/auth/sign-in/social'], ['GET', '/api/auth/callback/github'], ['GET', '/api/auth/callback/google'], ['GET', '/api/auth/get-session'], ['POST', '/api/auth/sign-out'], ['GET', '/api/auth/ok'], ['GET', '/api/auth/error']];
  const no: [string, string][] = [['GET', '/api/auth/sign-in/social'], ['POST', '/api/auth/callback/github'], ['GET', '/api/auth/callback/apple'], ['POST', '/api/auth/sign-in/email'], ['POST', '/api/auth/sign-up/email'],
    ['POST', '/api/auth/delete-user'], ['GET', '/api/auth/delete-user/callback'], ['POST', '/api/auth/change-email'], ['GET', '/api/auth/list-sessions'], ['GET', '/api/auth/get-session/x'], ['GET', '/api/auth/'], ['GET', '/api/auth']];
  for (const [m, p] of yes) assert.ok(authPathAllowed(m, p), m + ' ' + p);
  for (const [m, p] of no) assert.ok(!authPathAllowed(m, p), m + ' ' + p);
});
