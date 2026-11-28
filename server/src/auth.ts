// Better Auth wiring (contract section 4). GitHub at v1; Google only when both of its secrets are set (it is not verified against Google yet).
// Credentials never touch our code: the library owns OAuth state, PKCE, tokens and the session cookie. Email/password is off.
import { betterAuth } from 'better-auth';

export interface AuthEnv {
  DB: unknown;                       // the D1 binding; Better Auth detects it (batch/exec/prepare) and uses its built-in D1 dialect
  BASE_URL: string;                  // fixed public origin, e.g. https://play.76pancakes.workers.dev (a var, not derived from the request)
  BETTER_AUTH_SECRET: string;        // `wrangler secret put`, set by the Owner, 32+ random bytes
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;      // `wrangler secret put`
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
}

export function authOptions(env: AuthEnv) {
  return {
    database: env.DB as never,
    baseURL: env.BASE_URL,
    basePath: '/api/auth',
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: false },
    account: { encryptOAuthTokens: true },   // GitHub's access/refresh tokens are not needed after sign-in; if stored at all they are encrypted
    socialProviders: {
      github: { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET },
      ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET ? { google: { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET } } : {}),
    },
    session: { expiresIn: 60 * 60 * 24 * 30, updateAge: 60 * 60 * 24 },   // 30 days, refreshed at most once a day (one D1 row write)
  };
}

// The ONLY auth routes reachable from outside. Better Auth ships ~30 (change-email, delete-user, set-password, reset-password...);
// none of them is wanted at v1, so the Worker forwards nothing outside this list (a test enforces it, end to end).
export const AUTH_ALLOW: readonly [string, RegExp][] = [
  ['POST', /^\/api\/auth\/sign-in\/social$/],
  ['GET', /^\/api\/auth\/callback\/(github|google)$/],
  ['GET', /^\/api\/auth\/get-session$/],
  ['POST', /^\/api\/auth\/sign-out$/],
  ['GET', /^\/api\/auth\/(ok|error)$/],
];
export const authPathAllowed = (method: string, path: string): boolean => AUTH_ALLOW.some(([m, re]) => m === method && re.test(path));

export const makeAuth = (env: AuthEnv) => betterAuth(authOptions(env));

// Building the library costs several milliseconds and the free plan allows 10 per request, so one instance is kept per environment.
// It is kept only after its own setup has finished: a request must never wait on a promise another request started (workerd refuses that).
const built = new WeakMap<AuthEnv, ReturnType<typeof makeAuth>>();
export async function authFor(env: AuthEnv): Promise<ReturnType<typeof makeAuth>> {
  const hit = built.get(env);
  if (hit) return hit;
  const auth = makeAuth(env);
  await auth.$context;
  built.set(env, auth);
  return auth;
}
