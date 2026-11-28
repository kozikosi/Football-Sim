# Local Cloudflare rehearsal (T5 b, c, d), 27 Nov 2026

Local only: `wrangler dev --local` 4.168.0, Chromium (Playwright), local D1. Nothing deployed; no Cloudflare account used. Labels V/R/I/U.

## Run it again

```
cd colors && npm run build && cd ..
WRANGLER=<path to wrangler 4.168.0> node server/scripts/local-rehearsal.mjs --work <empty folder outside the repo> --data <private folder with the three CSVs>
```

## (b) Result (V): 26 checks pass

Built page and dataset asset served; anonymous, tampered-cookie and cross-origin requests refused; sign-in upload; second browser receives, progresses, deletes, restores; offline save sent later; page-leave sends; share and revoke; second account receives nothing; daily purge; rate limit (60 allowed, then refused, other user unaffected); no page errors; 90K and 252 KB saves upload, list and download.

**Not covered (U):** real GitHub sign-in (sessions were inserted into the local database), production limits, rollback, a real phone.

**Notes**
- `/__scheduled` is answered by the asset handler when a site has assets; the script uses `/cdn-cgi/local/scheduled`.
- A save over the browser's page-leave size (60,000) arrived on localhost anyway. Do not rely on it; the local copy is sent on the next load (V, also checked).

## Processor time (Free plan: 10 ms per request)

Sampled with the runtime profiler, 2-core cloud container, local development instrumentation included. Ranges over repeated runs, ms per request. A guide, not a production figure.

| Request | Before (2 runs) | After (6 runs, two scripts) |
|---|---|---|
| Health (no database, no session) | 4.3 (1 run) | 1.8 to 4.1 |
| Upload, ~88 KB save | 11.6 to 15.2 | 9.3 to 10.8 |
| Download, ~88 KB | 10.1 to 14.7 | 7.3 to 9.9 |
| List, 3 saves of ~88 KB | 9.8 (1 run) | 6.0 to 7.0 |
| Upload, 252 KB | 18.1 to 18.8 | 11.9 to 17.5 |
| Download, 252 KB | 13.9 to 16.5 | 9.9 to 14.9 |
| List, 3 saves of 252 KB | 14.3 (1 run) | 5.7 to 8.8 |

Before and after were measured with different warm-up (the first "before" runs had none), so read the gain as approximate. Two causes fixed, both in `server/` only:
1. `worker.ts` built the sign-in library on every `/api` request. Now one per environment, kept only after its setup finishes (`auth.ts` `authFor`).
2. `store.ts` read whole rows, save text included, to list, upload and delete. Now label columns only; a download reads the text.

Tests: `server/test/cpu.test.ts` (written first, failed, then passed) and 3 new deliberate breakages.

**Verdict (I):** not shown to fit the Free plan. Typical saves sit at the limit here; large ones are over. Cloudflare's docs say CPU time excludes database waiting, allow occasional overruns, and name 10 to 20 ms as typical for sign-in or large-payload work ([limits](https://developers.cloudflare.com/workers/platform/limits/)). Measure on the rehearsal deploy before launch.

## (c) Rate limit if the binding is not on Free

**Decision (Architect, open to the Owner): no database fallback.** A counter in D1 writes a row per request, spending the same 100,000-rows-a-day budget the limit protects, and adds processor time. Without the binding, one signed-in abuser could use up a day's budget; sync then pauses for everyone until midnight UTC and play continues on each device. Accepted for v1. Free-plan availability of the binding stays U until the rehearsal deploy. The binding is per Cloudflare location and approximate ([docs](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)).

## (d) Version skew

| Case | Result |
|---|---|
| Server speaks another API version | page says reload (V, simulated by rewriting the reply header) |
| Save written by a newer build | 426, nothing stored (V) |
| Old tab asks for a build file a rollback removed | local runtime answers **200 with the front page**, not 404 (V, local). Production behaviour U. The colors build fetches one such file, the hashed pools JSON (V). Check on the rehearsal rollback |
| Rollback itself, stale tab | U, real deploy only |
