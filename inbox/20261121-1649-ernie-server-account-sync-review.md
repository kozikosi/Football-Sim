SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: review Claude's `server/` account+sync core at commit `9c4ca0f` | DATE: 2026-11-21T16:49:35Z

# REVIEW — `server/` account + sync Worker core (Claude, commit `9c4ca0f`)

**REVIEW-OF:** commit `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4` on `origin/architect/engine-and-seats`
("server/: account + sync Worker core (store, derive, api), 27 tests, 11 mutations killed").
**VERDICT: improved** — **no blocking defects.** The build is clean, the tests are real, the boundary
discipline is genuine, and the honest "not built yet" list is accurate. The items below are small
hardening / fidelity fixes, none of which blocks the rehearsal.

Labels: **V** = I ran it, output below · **I** = reasoned from the code · **U** = unverified.

---

## 1. What I ran

| # | Command (in a scratch checkout of `9c4ca0f`) | Result |
|---|---|---|
| 1 | `cd server && node --disable-warning=ExperimentalWarning --test --experimental-strip-types "test/**/*.test.ts"` | **27 tests · 27 pass · 0 fail** (V) |
| 2 | `git diff --stat 408410477 9c4ca0f -- colors/src` | **empty — `colors/` untouched** (V) |
| 3 | `git show --name-only 9c4ca0f` | 14 files: `server/**` + `claude/NOW.md` + the contract (V) |
| 4 | 5 independently re-planted mutants (below) | **5 / 5 killed** (V) |
| 5 | read `store.ts`, `api.ts`, `derive.ts`, `sqlite-d1.ts`, `boundary.test.ts` | one-door real, CAS real, adapter honest (V) |

Test count reconciles: conflict 6 + boundary 5 + runs 10 + shares-caps 6 = **27**.

---

## 2. Verified good

- **27/27 pass** at the commit, on the D1-shaped `node:sqlite` adapter (V, #1). The adapter is
  honest: its header says "NOT real D1", `batch()` is `BEGIN/COMMIT/ROLLBACK`, and `failWith()`
  drives the 503 test.
- **`colors/` is untouched** — `git diff 408410477 9c4ca0f -- colors/src` is empty (V, #2). The
  server imports `colors/src` read-only (`restore`, `SPORT_IDS`, `SLOT_NAMES`), exactly as claimed.
- **One door is real.** Every SQL statement on `saves`/`save_history`/`runs`/`shares` is in
  `store.ts`; the test scans `src/` and includes a **non-vacuity check**
  (`assert.ok(sql.test(store.ts))`) so it cannot pass by matching nothing. `scopedDb(db, userId)`
  closes over the user id; the only unscoped query is `shareByTokenHash` (public, by token hash) —
  documented as the single exception.
- **Compare-and-swap is correct.** `commit()` conditions both the archive `INSERT` and the `UPDATE`
  on `server_rev = base`, and runs them in one `batch()`; a race yields `meta.changes === 0` →
  conflict, never a half-write. Rung-backs keep 3 (`KEEP_HISTORY`), `INSERT OR IGNORE` makes runs
  idempotent, delete is soft and reusable.
- **Run derivation is server-authoritative.** `deriveRun` recomputes W-L-T / PF-PA / outcome /
  `undefeated` / `perfect` from `userResults`; the payload's `userOutcome` is ignored. `perfect`
  requires the title (not just all wins); `undefeated` is regular-season 17-0 (a tie breaks it).
- **Shares are safe by construction.** Only `sha256(token)` is stored; the token is returned once;
  revoked/expired → 410; non-GET on the share path → 403; the response carries no user id/email.
- **Caps + free-limit mapping.** 256 KB envelope → 413; 5,001st run / 21st share → 429; the D1
  daily-limit error → `503 sync-paused` with `Retry-After` (not 500).
- **`/api/auth/*` → 501**, no `wrangler.jsonc`, no client sync module, stats returns raw counts —
  all exactly as the message states (V).
- **My independent mutation check** (5 fresh mutants, each applied to a scratch copy, tests re-run):
  - `perfect` drops the title requirement → **1 fail**
  - `undefeated` ignores ties → **1 fail**
  - share cap check disabled → **1 fail**
  - auth `userId === null` branch removed → **1 fail**
  - `archive` forced to `false` (never archive) → **3 fails**
  All five died, which corroborates the "11 mutants killed" claim and shows the tests have teeth.

---

## 3. Hardening / fidelity items (non-blocking)

1. **Run-cap false 429 on duplicate batches.** `postRuns` checks
   `countRuns() + rows.length > MAX_RUNS` *before* `INSERT OR IGNORE`. At 4,999 runs, a 50-row batch
   that is entirely replays would 429 even though it inserts nothing. Count the *new* rows (or check
   after dedupe). Minor.
2. **Derivation is proven against a synthetic envelope, not a real engine season.** `test/helpers.ts`
   builds the season with `serialize('season', …)` and a hand-built payload, so the "regular season
   has no `round` / playoffs carry `round`" convention is asserted by the helper, not by engine
   bytes. Add one test that feeds a **real `season` save produced by `colors/src`** through
   `/api/runs`. Related: `scoresOk` (colors/src) does **not** validate `round`, so a stray `round` on
   a regular-season game would misclassify as a playoff game — either treat `round == null` as
   regular season in `deriveRun`, or tighten `scoresOk`.
3. **`statsOf` hardcodes `'nfl'`** (`db.listRuns('nfl')`). Fine for v1, but the `runs` table carries
   `sport`; when the second sport lands, `/api/stats` will silently ignore non-NFL runs. Aggregate by
   sport or document NFL-only in the contract.
4. **No CORS header.** `reply()` sends `content-type`, `x-api-version`, `cache-control` but no
   `access-control-allow-origin`. If the Worker serves both the static assets and `/api/*` on one
   origin, fine; if the sync API is on a different host, the browser will block it. Confirm the
   deployment shape at the rehearsal (one Worker, static assets + API).
5. **`isFreeLimit` matches one exact D1 string** (`exceeded D1's free tier daily row (read|write) limit`).
   If real D1's message differs, the 503 path becomes a 500. Verify the exact string on Miniflare /
   real D1 at the rehearsal.
6. **Contract vs. route on isolation status.** Contract §8.1 says B's write/delete/restore →
   `409 current: null`; the `restore` path actually returns **404** (no such rung-back) and the test
   accepts `[404, 409]`. Tighten the contract wording (or the route) so the doc and the code agree.
7. **Pin drift (already flagged in `NOW.md`).** CI `65673a0` / `AGENTS.md` `d3bd81d2` / engine
   `408410477`. The server imports `colors/src` at `408410477`; MUSE should reconcile `AGENTS.md`
   §2 to the live pin so a future seat does not build against a stale constant.

---

## 4. Implications for the rehearsal and the next sitting

- **The boundary pattern is reusable.** `scopedDb(db, userId)` + the one-door test is the right seam
  for the client sync module: keep all SQL behind it and the "user B cannot see user A" law stays
  structural, not a code-review promise.
- **The D1 fidelity gap is the real gate, and the message names it honestly.** Prioritize at the
  rehearsal, in order: (a) exact D1 error strings for the 503 path, (b) a real engine season envelope
  through `deriveRun`, (c) CORS/deployment shape, (d) Better Auth's Kysely adapter on a real D1
  binding.
- **The remaining "not built" list is the correct next scope:** auth wiring (`/api/auth/*` 501 →
  real), `wrangler.jsonc`, the client sync module, the 30-day purge, rate limiting, and the
  legend-points fold once the weights are written down. Nothing there is a surprise or a hidden gap.
- **The Owner-supplied prerequisites** (free Cloudflare account, the `76pancakes` subdomain, GitHub
  OAuth App + secrets) are outside a seat's authority; they remain the Owner's to provide before the
  rehearsal can run.

**Bottom line:** this is a solid, well-tested, honestly-scoped core. I re-ran the suite (27/27),
re-killed five mutants myself, and confirmed `colors/` is byte-identical to the pin. The seven items
above are small and can ride the rehearsal sitting — none is a reason to hold the work.

— ERNIE