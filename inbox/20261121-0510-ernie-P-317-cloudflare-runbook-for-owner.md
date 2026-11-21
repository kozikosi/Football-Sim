SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: the Owner's three answers recorded (cross-run career stats · nameservers at Cloudflare · he will set up Cloudflare and needs direction) + a step-by-step Cloudflare runbook | DATE: 2026-11-21T05:10Z
TO: all seats · TO-ARCHITECT (Claude) · TO-Z.AI · FOR: the Owner (the runbook in §3 is his)

## 1 · The three answers, recorded (Owner, 2026-11-21T04:58Z, verbatim)

> *"locked cross run career stats; why wouldn't the nameservers be at cloudflare; and i can setup the
> cloudflare but i need direction"*

| question | answer | consequence |
|---|---|---|
| **B1** — does "stats beyond a single season" mean the user's career or the players'? | **"locked cross run career stats"** → the **user's** career across runs, i.e. **P-208 as specified** | **The engine pin does not move.** No offseason/ageing/retirement model is needed for v1. `408410477` stands. Player career totals and franchise continuity are **post-v1** and require a scheduled engine sitting. |
| **G1** — nameservers on Cloudflare? | **"why wouldn't the nameservers be at cloudflare"** → **yes, move them** | **Workers** is the platform (Pages' only advantage was external DNS, now moot). |
| **G2** — domain/origin | implied by the above: **a real domain on Cloudflare, final origin at launch** | the origin question is answered in principle; the *name* is still his to pick (§3 step 2). |
| **G0** — he needs direction | **this document's §3** | he executes §3; the council can verify each step. |

**Now unblocked:** Phase 0's biggest decision (B1) and the platform question (G1). **Still open:**
B2 (stat #2 definition), A1 (identity provider — §3 step 7 gives him a default), F3 (share card),
H1 (stale engine stamp — Architect), H3 (P-210 measurements).

## 2 · "Why wouldn't the nameservers be at Cloudflare?" — the honest answer

**There is usually no reason not to.** Moving nameservers to Cloudflare is free, it is what makes
Workers custom domains possible, and Cloudflare's DNS is fast and includes unlimited records. Three
legitimate reasons a domain keeps its DNS elsewhere:

1. **Someone else controls the DNS** — an employer, a school, a registrar bundle, a client. Then you
   can't move it, and Pages becomes the only option.
2. **The domain's email is load-bearing and you don't want to re-create the records.** This is the
   real risk: **nameservers control every record on the domain**, so MX / SPF / DKIM / DMARC for
   email, plus any `A`/`CNAME`/`TXT` for other services, all move with them. Cloudflare *scans and
   imports* existing records at setup, but "usually" is not "always" — a missing MX record means
   **email silently stops working** the moment the switch completes.
3. **You might move the domain away later** — a registrar transfer is separate from an NS change, and
   moving NS twice is more work than moving once.

**So the safe procedure is:** export/record the existing DNS rows *before* the switch, let Cloudflare
import, then **verify the imported set against the export**, and only then change nameservers at the
registrar. If email is on the domain, do the switch when you can check mail within the hour.

**If you have no email or other services on the domain, just move them — there is no downside.**

## 3 · THE RUNBOOK — Cloudflare, step by step (for the Owner)

Every step says what to click/type, what success looks like, and what to do if it fails. **Do them in
order.** Nothing here costs money. Steps 1–6 are one sitting; 7–12 are the build.

---

### Step 1 — Create the account
1. Go to `dash.cloudflare.com` → **Sign up** (email + password).
2. **Enable two-factor auth immediately** (Profile → Authentication). A domain and a Worker are
   attached to this account; a compromised account means a hijacked domain.
3. Choose the **Free** plan when asked. Do not enter a card unless you later want paid features.

*Success:* you are in the dashboard with an empty account list.

---

### Step 2 — Pick the domain (DECIDE — yours alone)
Two cases:

- **You already own a domain.** Use it. Decide **today** which one, because the origin becomes
  permanent (§4).
- **You don't.** Buy one at any registrar (Cloudflare Registrar is at cost, ~$10/yr; Namecheap /
  Porkbun / Squarespace are fine). Prefer a short `.com`; if that is taken, `.com` with a suffix beats
  an exotic TLD for a portfolio link.

*Recommended default:* **a domain you own, on Cloudflare Registrar if you're buying new** — one less
account, and no markup.

---

### Step 3 — Add the domain to Cloudflare
1. Dashboard → **Add a domain** → type the domain → **Continue**.
2. Choose the **Free** plan → **Continue**.
3. Cloudflare scans for existing DNS records. **Leave this page open** and go to Step 4 *without*
   changing anything at the registrar yet.

*Success:* Cloudflare shows a list of DNS records and **two nameservers** like
`xxx.ns.cloudflare.com` / `yyy.ns.cloudflare.com`.

---

### Step 4 — Record the existing DNS before switching (the email safety step)
If the domain already does anything (a site, email, a subdomain), **export it**:
- Cloudflare's scan is shown in the UI — screenshot or copy the full list, **or**
- at your current DNS host, export the zone file (most registrars have "Export DNS").

You are checking one thing above all: **is there an MX record (email)?** If yes, the imported list
must contain it. If it does not, **stop** and add it manually in Cloudflare (Step 3's screen → *Add
record*) before proceeding.

*Success:* you have a before-picture of the DNS, and every MX/TXT/A/CNAME you rely on is present in
Cloudflare's list.

---

### Step 5 — Move the nameservers (the actual switch)
1. At your **registrar** (where you bought the domain): find **Nameservers** / **DNS** settings.
2. Replace the registrar's nameservers with the **two Cloudflare ones** from Step 3.
3. Save. Propagation is usually minutes, occasionally up to an hour.

**If email is on the domain:** do this when you can watch the inbox. A missing record shows up
immediately as bounced mail.

*Success:* Cloudflare emails you "Great success — domain is active", and the domain shows **Active**
in the dashboard.

*If it fails:* the registrar may still show the old NS (DNS caching, up to the TTL). Wait, then
re-check; do not change them twice.

---

### Step 6 — Confirm what you have
- Domain: **Active** in Cloudflare.
- DNS: only the records you expect.
- No email breakage.

**This is the moment the origin is decided.** Everything from here is deployed to
`https://<your-domain>` and **never moved** — see §4 for why.

---

### Step 7 — Create the identity provider (DECIDE — default given)
§1's locked rule: **maintained OAuth 2.0 / OIDC, never homemade passwords.** Cloudflare Access is
*not* the answer here: it gates a host and caps at 50 seats, which would block your public demo.

**Recommended default: a managed OIDC provider** (Clerk or Auth0 free tier; any provider that speaks
OIDC works, because the Worker validates its JWTs against its published keys — the game database never
stores a password or an email).
1. Create an account at the provider.
2. Create an application of type **Single Page Application** (or "Web app").
3. Copy the **client ID** (and a client secret if the provider issues one).
4. Set the allowed callback URL to `https://<your-domain>/` (and a localhost URL for development).
5. Enable **one** social connection (GitHub or Google) plus email/password if you want it.

*Success:* you have a client ID and a login screen you can test at the provider's own URL.

---

### Step 8 — Install and log in to Wrangler
In the app directory:
```bash
npm i -D wrangler
npx wrangler login          # opens a browser; click Allow
```
*Success:* `npx wrangler whoami` prints your account.

---

### Step 9 — Create the database
```bash
npx wrangler d1 create pancakes-db
```
It prints a `database_id`. **Copy it** — it goes in the config in Step 10.

Then create the schema (the table shape comes from the Architect's contract, not from me):
```bash
npx wrangler d1 execute pancakes-db --remote --file=./schema.sql
```
*Success:* `npx wrangler d1 execute pancakes-db --remote --command "select name from sqlite_master where type='table'"` lists your tables.

---

### Step 10 — One Worker, assets + API
`wrangler.jsonc` at the repo root:
```jsonc
{
  "name": "pancakes",
  "main": "src/worker.ts",
  "compatibility_date": "2026-11-01",
  "assets": { "directory": "./dist" },
  "d1_databases": [
    { "binding": "DB", "database_name": "pancakes-db",
      "database_id": "<the id from step 9>" }
  ]
}
```
Non-asset requests go to `worker.ts`; everything else is served from `dist`. That is the whole
backend: no separate server, no cold starts, no ops.

*Success:* `npm run build && npx wrangler deploy` prints a `*.workers.dev` URL.

---

### Step 11 — Test on the workers.dev URL first
Open it. Check: the app boots · no console errors · the static assets load · a save writes locally.

*Do not* test account features on a preview URL later — a preview is a **different origin**, so it has
its own localStorage and its own cookies. Previews are for review, never for data.

---

### Step 12 — Attach the custom domain
Dashboard → **Workers & Pages** → your Worker → **Settings → Domains & Routes → Add → Custom Domain**
→ type the domain (or `www.` + the apex).

*Success:* `https://<your-domain>` serves the app, with a valid certificate, in minutes.

---

### Step 13 — Put the secrets in
Never in the repo:
```bash
npx wrangler secret put AUTH_CLIENT_SECRET
npx wrangler secret put AUTH_COOKIE_SECRET      # only if your library needs one
```
*Success:* `npx wrangler secret list` shows the names (values hidden).

---

### Step 14 — The first real deploy of the account system
Merge the account slice → `npm run build` → `npx wrangler deploy`. Then run **G4's ten acceptance
steps on the real domain** (sign up → sign in → link a local save → open a second browser profile →
see the save → offline edit → reconnect → conflict path → brag copied → sign out → local saves still
there).

---

### Step 15 — Rollback, and how to watch
```bash
npx wrangler versions list        # every deploy, newest first
npx wrangler rollback             # previous version
npx wrangler tail                 # live logs while you click
```
Rollback is instant and keeps the same URL. **Rehearse it once before launch** (deploy, break
something deliberately, roll back, confirm the app returns).

---

### Step 16 — CI (later, optional)
Store `CLOUDFLARE_API_TOKEN` as a **GitHub Actions secret** (account API token, scoped to this Worker
+ D1 only) and deploy from the workflow. Until then, `npx wrangler deploy` from your machine is
perfectly fine — and it keeps "a push never publishes" true by construction.

---

## 4 · Why the origin must not move (the one thing to internalise)

`localStorage` is scoped per **origin** (scheme + host + port). Every save, setting and "linked"
device lives under the origin that wrote it. If you launch at `pancakes.pages.dev`, get users, then
move to `pancakes.com`, **every one of those saves becomes unreachable** — not corrupted, not synced:
gone from the user's point of view. With accounts, a host change also moves the session cookie domain.

So: **buy/choose the domain now (Step 2), deploy to it (Step 12), and never move.** The only paid
thing in this entire plan (~$10–15/yr) is the thing that makes that possible.

## 5 · What this costs

| item | cost |
|---|---|
| Cloudflare Free (Workers + static assets) | $0 — static requests free and unlimited; 100,000 Worker requests/day |
| D1 Free | $0 — 5 GB total, 500 MB/database, 5 M rows read + 100 k written per day |
| Durable Objects (later, only if multiplayer) | $0 on free — SQLite backend, 100,000 requests/day |
| A domain | **~$10–15/year** — the only spend |
| Managed identity provider | $0 at launch scale (free tier) |

Free daily limits are **hard caps**: when D1 or Workers is exhausted, requests fail until 00:00 UTC.
That is the right failure mode (fail closed, local save still safe) but it wants a dashboard alert, not
a design change.

## 6 · What I need from the Architect to finish this

1. **The account + sync contract** (§3 A/C/D/E of `inbox/20261121-0505-…`), so Step 9's `schema.sql`
   and Step 10's routes have a shape to implement.
2. **H1 — the stale engine stamp** (`src/App.svelte:83`), before the first migration runs.
3. **H2 — re-point the pin-watch** at `408410477`.
4. **A one-line answer on the Worker's session strategy**: does he validate the provider's JWT per
   request, or mint a Cloudflare-side session after the first exchange? Either is fine; it changes
   Step 7's callback list.

## 7 · Still open (not blocking Step 1–12)

- **B2** — stat #2's definition ("undefeated" = regular season vs 20-0). Needed before Step 14's
   stats slice, not before the deploy pipeline.
- **A1** — the provider choice (Step 7's default is Clerk/Auth0-class; he may pick another).
- **F3** — whether the brag share gets a PNG card (post-v1 unless he wants it in).
- **H3** — the P-210 origin/browser measurements (nice-to-have; §4 of this document is the design
  answer, the measurements would confirm it per browser).

— ERNIE (advisor; signs as ERNIE, never as another seat). The runbook is advice for the Owner; it
creates no account, no config and no deploy on its own.