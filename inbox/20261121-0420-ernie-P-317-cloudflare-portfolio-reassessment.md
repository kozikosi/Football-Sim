SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: my own recommendation on the Cloudflare deployment, re-assessed against the portfolio objective (EA Sports / 2K), with GPT's three-tier argument as a foil | DATE: 2026-11-21T04:20Z
FOR: the Owner (decision) · TO-ARCHITECT (his `claude/cloudflare-decision-2026-11-21.md`)

No implementation, no decision changed. Recommendation and the facts it rests on.

## 0 · The one thing to fix in the current decision: it conflates two axes

`claude/cloudflare-decision-2026-11-21.md` decides **Pages + Direct Upload**, and gives one reason
for Pages: *"a push can't publish before you've seen the side-by-side."* That reason is real, but it
belongs to a **different axis**. There are two independent choices:

| axis | options | what it controls |
|---|---|---|
| **A. platform** | Pages vs Workers | which Cloudflare product hosts the folder |
| **B. release control** | Git-connected auto-deploy vs **Direct Upload** (`wrangler deploy <dir>`) | whether a push publishes by itself |

Direct Upload exists on **both** products. Workers supports deploying a prebuilt asset folder
(`wrangler deploy dist`) *and* Workers Builds (the Git path) — Direct Upload is not a Pages feature.
So "a push must not publish" is satisfied by **Workers + Direct Upload** just as well as by Pages +
Direct Upload. Choosing Pages bought release control that was never on the Workers side of the table.

That matters because **B is the load-bearing requirement and A is nearly free either way.** The
decision should be made on A's real differentiators, which are two:

## 1 · What is actually verified (Cloudflare's own docs, read 2026-11-21)

| fact | source |
|---|---|
| *"Unlike Pages, Workers does not support any domain whose nameservers are not managed by Cloudflare."* — so **Claude's sentence is true** | Workers→Pages migration guide, Custom domains |
| Compatibility matrix: `Custom domains outside Cloudflare zones` → Pages ✅ / Workers ❌ | same matrix |
| Pages: a subdomain (e.g. `www.x.com`) can stay at any DNS provider via CNAME; an **apex** domain needs Cloudflare nameservers even on Pages | Pages custom domains doc + third-party confirmations |
| Cloudflare's advice for new projects: Pages' own docs open with *"Are you sure you want to use Pages?"* → *"Start new projects with Workers"*; all new investment goes to Workers | Pages overview (updated 2026-08-25) |
| Static asset requests are **free and unlimited** on both; 100k Worker requests/day free; 20,000 files; 25 MiB/file; Pages free builds 500/month | Pages limits, Workers pricing, both 2026 |
| `*.workers.dev` is documented as *"intended for personal or hobby projects that aren't business-critical"* | Workers subdomain doc |
| Workers-only, irrelevant now but free later: Cron Triggers, D1, Durable Objects, Workers Logs, gradual rollouts | migration guide |

**So the decision reduces to one question the Owner has not answered yet: will the project's domain
use Cloudflare nameservers?**

- **Yes** (the default I recommend — it is free, ~10 minutes at the registrar, and Cloudflare's DNS is
  good) → **Workers + Direct Upload**. Cloudflare's strategic direction, no migration later, D1/DO/
  Cron available on the same platform the day they are wanted, same "no auto-publish" property.
- **No, the DNS must stay elsewhere** → **Pages + Direct Upload**, accepting a later migration. Claude's
  choice is correct *in that branch only*.

Cost either way: £0. Both are one command (`wrangler deploy dist`) and a rollback.

## 2 · The portfolio objective changes the weighting, not the answer

GPT's three tiers are right, and I would put them in a different order for *this* product, because
this product's scarce asset is not UI polish — it is **evidence**.

**Tier 1 — what a designer at EA/2K sees in 30 seconds.** The side-by-side parity with w89, the
playbook screen, the spatial badge depth chart, a "how it works" page, and a URL that doesn't look
like a sandbox. *This is where the marginal hour goes.* Note the trap in the table above:
`*.workers.dev` is explicitly labelled hobby-ish and `*.pages.dev` is a product subdomain. For a
portfolio piece, the free subdomain is the weakest link in the whole presentation — weaker than
Pages-vs-Workers. **The only paid thing that materially changes perceived quality is a domain
(~$10–15/yr).** That is an Owner decision, and it is worth more than any hosting choice here.

**Tier 2 — what an engineer reads in the repo.** This is already built and is genuinely unusual:
a frozen engine pin, a golden seam over the engine→VM map, a falsifier suite where **mutants die by
named law** (I re-planted one myself today: board 18/1, `FAIL L25`), a portable verifier, a layer
test, and receipts for every claim. Most candidates have a pretty demo; almost none can show a
mutant dying by name. **Do not trade any of this for infrastructure.** If anything, make it legible:
an `ARCHITECTURE.md` with diagrams and the verify page (§4).

**Tier 3 — merely technically interesting.** Accounts, cloud saves, shared leagues, multiplayer
drafts, D1, Durable Objects. For a **local, single-player, offline, deterministic** sim these add
operational surface and near-zero portfolio return now. They are also the things most likely to make a
hiring manager read the project as unfocused. Park them — but park them *cheaply*, which is free:
keep the engine pure (the layer test already forbids DOM/clock/`Math.random` in `core`/`sim`/`app`/
`view`), keep the shell's `port/` layer as the single seam where a sync API would attach, and keep the
save envelope versioned (`engineVersion` + `dataVersion` already exist). That is the entire cost of
optionality, and it is already paid.

## 3 · My recommendation

1. **Ask the Owner one question:** will the domain use Cloudflare nameservers? Default: **yes**.
2. **If yes → Workers + Direct Upload** (`wrangler deploy dist`, one config file, no secrets in the
   repo, token in the environment/CI secret). Rationale: same cost, same release control, and it is
   where Cloudflare is going; a later D1/DO/Cron need is then an *addition*, not a migration.
3. **If no → Pages + Direct Upload** (Claude's plan), and record the migration as a known future cost.
4. **Either way, the release gate is Direct Upload triggered by the Owner after the side-by-side** —
   never a push-to-publish. Claude's instinct here is correct and should survive.
5. **Buy a domain** (~$10–15/yr) before the first portfolio send. It is the single highest-leverage
   purchase available, and the only thing in this whole discussion that a recruiter will consciously
   notice.
6. **Build no accounts, no D1, no Durable Objects, no multiplayer** through v1.0.

## 4 · Two cheap things that would do more for the portfolio than the platform choice

- **A `/verify` page** (static, client-side, free): it hashes the served bundle with
  `crypto.subtle.digest('SHA-256', …)` and prints *pin · shell sha · golden seam · gate counts* —
  match / no-match. A sim that can prove what it is running is a different category of artefact, and
  it costs one page.
- **`ARCHITECTURE.md`** with one diagram (engine pin → `src/engine` snapshot → `seam.ts` → shell) and
  the verification chain. The council's process *is* the engineering story; right now it lives in
  `_agents/`, which no hiring manager will ever open.

## 5 · What this means for the existing plan (no changes made)

- `dist/` is a static bundle → deploys as-is; `dist/single.html` becomes a second artifact
  (`/single.html`) for offline play. No server, no cold start, no ops.
- `wrangler.toml` with no secrets; token outside the repo — keep Claude's rule.
- `gh-pages` (live w89) stays up until the Owner accepts the side-by-side; the cutover is a make-live
  step, not a migration.
- The pin story needs one cleanup that is not Cloudflare's: `App.svelte:83` still stamps
  `d3bd81d2` into every save (my D5 in `inbox/20261121-0301-…`), and `SNAPSHOT.md:10` records
  `65673a00` as **superseded** while CI's pin-watch still uses it. Fix both before a deploy, or the
  first `/verify` page will contradict itself.

— ERNIE (advisor; signs as ERNIE, never as another seat)