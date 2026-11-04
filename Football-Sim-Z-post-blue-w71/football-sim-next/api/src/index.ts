// Sync API skeleton — the /v1/health proof only. The full surface (pair, saves CRUD,
// history) is specced in the w71 strategy doc §E and lands AFTER Colors v1 ships,
// per the Owner's sequencing. This file proves the second deployable of the pipeline
// (Workers) lives in the same repo, one folder apart, with its own wrangler config.
// Zero recurring cost: Workers free tier (100k req/day) + D1 free tier cover one user
// syncing slots many times a day by three orders of magnitude.

export interface Env {
  DB: D1Database; // bind in wrangler.jsonc; not used by /health yet
}

export default {
  fetch(req: Request, _env: Env): Response {
    const url = new URL(req.url);
    if (url.pathname === '/v1/health') {
      return Response.json({ ok: true, service: 'football-sim-sync', version: 'v0-skeleton' });
    }
    return new Response('not found', { status: 404 });
  },
};
