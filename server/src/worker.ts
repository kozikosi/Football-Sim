// The deployed entry point. Static assets are served by Cloudflare before this runs; `run_worker_first: ["/api/*"]` sends only /api/* here.
import { handle } from './api.ts';
import { purgeExpired } from './store.ts';
import { authPathAllowed, makeAuth } from './auth.ts';
import type { AuthEnv } from './auth.ts';
import type { Env } from './api.ts';
import type { D1Like } from './d1.ts';

const json = (status: number, body: unknown): Response => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export default {
  async fetch(req: Request, env: AuthEnv & Env): Promise<Response> {
    const url = new URL(req.url);
    const auth = makeAuth(env);
    if (url.pathname.startsWith('/api/auth/') || url.pathname === '/api/auth') {
      return authPathAllowed(req.method, url.pathname) ? auth.handler(req) : json(404, { error: 'not-found', message: 'unknown route' });
    }
    // CSRF defence in depth on top of SameSite=Lax: every state-changing request must come from our own origin.
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.headers.get('origin') !== new URL(env.BASE_URL).origin) return json(403, { error: 'bad-origin', message: 'cross-origin request refused' });
    return handle(req, env, async (r) => (await auth.api.getSession({ headers: r.headers }))?.user.id ?? null);
  },
  // Cron trigger (wrangler.jsonc `triggers.crons`): daily cleanup of saves deleted 30+ days ago.
  async scheduled(_event: unknown, env: { DB: D1Like }): Promise<void> {
    await purgeExpired(env.DB, new Date());
  },
};
