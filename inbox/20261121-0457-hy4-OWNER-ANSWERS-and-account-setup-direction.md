SPEAKER: hy4 | ROLE: advisor | TASK: record Owner's three answers and give account-creation direction | DATE: 2026-11-21T04:57Z
FOR: Owner · Architect (Claude) · MUSE · council · Z.ai. Addendum to `0453` — read both. No decision enacted by me beyond recording the Owner's own answers; no product/engine/queue/governance edit.

## 0 · The Owner's answers, verbatim

> locked cross run career stats; why wouldn't the nameservers be at cloudflare; and i an create but i need direction

## 1 · What this resolves in the `0453` plan

**Q2.3 (cross-run vs cross-year stats) — RESOLVED BY OWNER.** The ten locked stats accumulate **across runs**, survive slot overwrite/deletion, and are global + per franchise. Cross-year franchise continuity is **NOT** a release feature and is parked with other sports, the pfd-01/02 visuals and multiplayer (L0.3). No new lifecycle or engine decision. Gate 2 of `0453` is unblocked on this point; Q2.4 (legend weights 100/10/1) remains an Owner option with my default "keep for v1, label INFERRED".

**Q9.1/Q9.2 (host and domain) — the carve-out is answered.** I asked about nameservers because Cloudflare's own compatibility matrix says **Workers cannot serve a custom domain whose nameservers are not managed by Cloudflare** — that was Claude's original reason for choosing Pages. The Owner's question implies the nameservers will be at Cloudflare. **Recommended reading, to confirm:** yes — point the domain's nameservers at Cloudflare (free) and deploy the app as **Workers Static Assets + thin Worker**; Pages is no longer needed. If there is no domain yet, a `workers.dev` subdomain is free and acceptable for a portfolio link; do not buy a domain, since the budget is $0. Please confirm the actual domain name and that its nameservers are at Cloudflare — the decision doc, runbook and releases ledger stay provisional until then.

**Q1.2 (who creates the accounts) — RESOLVED: the Owner creates them and needs direction.** §2 below is that direction. The Architect configures and deploys; no credential ever enters the repo, a bundle or a chat.

## 2 · Account-creation direction for the Owner (step by step)

All platform facts here are REPORTED from Cloudflare and auth-provider docs fetched 21 Nov; confirm against the live dashboards, which can change. **Nothing here costs money; stop if any page asks for a card or a paid plan.**

**A. Cloudflare (free).**
1. Create an account at cloudflare.com with your email and choose the **Free** plan. Workers Free is $0 and does not require a card.
2. If you already own a domain: add it to Cloudflare as a site on Free, let Cloudflare scan existing DNS, then change the **nameservers at your registrar** to the two Cloudflare values it gives you. This is free and is what makes a Workers custom domain possible. **Do not buy a new domain or register one through Cloudflare** — that would break the $0 constraint. If you have no domain, skip this step; `workers.dev` is fine.
3. Do **not** enable Git auto-deploy or Workers Builds connected to the repo. Our release rule is an explicit deploy after your "go" and the side-by-side.
4. Note the **Account ID** from the dashboard and hand it to the Architect (it is an identifier, not a secret). Do not create the D1 database or the schema yourself — that is the Architect's implementation step.
5. For the Architect's local deploy, prefer `wrangler login` (browser OAuth — no token to store). If a CI token is ever needed, create a **scoped API token** (minimum: Workers Scripts edit, D1 edit on the one database) and keep it in your password manager; hand it to the Architect only through a secure channel, never in chat or a file.

**B. Auth tenant (Clerk Hobby, my recommended default from Q1.1).**
1. Sign up at clerk.com with the **Hobby / free** plan — no card; the free tier is 50,000 monthly retained users and includes a custom domain. If the signup flow offers a paid trial, decline.
2. Create one application for 76 Pancakes. Enable email sign-in; add a social provider (Google or GitHub) only if you want it — it is free and optional. MFA is not on Hobby; do not pay to add it.
3. Collect the **publishable key** (safe to hand to the Architect; it ships in the client) and the **secret key** (treat as a credential — store it in your password manager and configure it as a Cloudflare Secret, or hand it over only via a secure channel; never paste it here or commit it).
4. Decide later whether to use a custom auth domain; Hobby includes one, but it is not needed for the first release.

**C. What to hand over, in one message to the Architect.** Account ID · domain name (or "use workers.dev") · Clerk publishable key · confirmation that nameservers are at Cloudflare · confirmation that the Free plans were selected. Secret key via secure channel only.

**D. What stays with you regardless.** The Cloudflare account, the auth tenant, the domain, and custody of all credentials. The Architect owns the schema, the Worker, the D1 migration and the deploy command. Z.ai owns slices 3–5 and the static hand-over. No seat is assigned by this document; it only supplies direction to the Owner.

## 3 · Why this does not break the plan

- The engine pin `408410477` is untouched; none of this is a `colors/src` change.
- Free-only holds: Cloudflare Free, Workers Free, D1 Free and Clerk Hobby are $0. Overages fail rather than bill; we are nowhere near the limits.
- The gate list in `0453` is unchanged; only Q2.3, Q9.2 and Q1.2 move from OPEN to RESOLVED, with the domain name still to be confirmed.
- The six release gates remain mandatory; sign-in remains optional for the player.

**Status:** Owner answers recorded verbatim; direction is advisory and labelled REPORTED where it describes external dashboards. No account, tenant, domain change or deploy was performed by me.
