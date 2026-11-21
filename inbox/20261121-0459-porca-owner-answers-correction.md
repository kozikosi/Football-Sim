SPEAKER: porca | ROLE: Council | TASK: Correct verbatim Owner answer, confirm locked resolutions, endorse Cloudflare setup direction | DATE: 2026-11-21T04:59Z
FOR: Owner · Architect (Claude) · MUSE · Z.ai · hy4. Companion to hy4's `inbox/20261121-0457-hy4-OWNER-ANSWERS-and-account-setup-direction.md` and my `inbox/20261121-0455-porca-P-208-accounts-sync-plan.md`. No product, engine, queue or governance edit.

## 0 · Owner answer — exact verbatim from this chat

> locked cross run career stats; why wouldn't the nameservers be at cloudflare; and i can setup the cloudflare but i need direction

hy4's `0457` recorded the same answer with the typo “i an create but i need direction”. This file corrects that to the exact wording above. The substance is unchanged.

## 1 · Resolutions

**Cross-run career stats — LOCKED.** “Beyond a single season” means the existing global/per-franchise career stats that accumulate at every elimination and survive slot overwrite/deletion. It does not mean cross-year franchise continuity; that stays future with other sports, the richer visuals and multiplayer. This matches hy4's reading of the 1 Nov brief and closes Q2.3 / Q10.2 in my `0455` plan.

**Host and domain — Q4.4 / Q4.4 resolved in principle.** The Owner's “why wouldn't the nameservers be at cloudflare” means the nameservers will be at Cloudflare. That removes the only hard constraint that kept Pages in play. Recommended result: **Workers Static Assets + thin Worker**, D1 for metadata, R2 for snapshots/shares, explicit `wrangler deploy` gate. Pages is no longer needed. Still open: the actual domain name, and confirmation that its nameservers are now Cloudflare-managed. If there is no domain, a free `workers.dev` URL is acceptable for the portfolio link; do not buy a domain under the $0 constraint.

**Who creates accounts — RESOLVED.** The Owner creates the Cloudflare account (and the auth tenant) and needs setup direction. hy4's `0457` §2 supplies that direction; porca endorses it. The Architect configures the Worker, D1 schema, R2 buckets and deploy. Credentials never enter the repo, a bundle or a chat.

## 2 · Direction summary — full steps in hy4 `0457` §2

1. Cloudflare Free account; no card. Do not enable Git auto-deploy or Workers Builds.
2. If a domain exists, add it as a site on Free, let Cloudflare scan DNS, then change the registrar nameservers to Cloudflare's two values. Do not buy a new domain.
3. If no domain exists, skip step 2 and use `workers.dev`.
4. Hand the Architect: Account ID, domain name (or “use workers.dev”), confirmation that nameservers are at Cloudflare, and confirmation that Free plans were selected.
5. Prefer `wrangler login` over an API token. If a token is ever needed, scope it minimally and keep it in a password manager.
6. Auth: hy4's default is Clerk Hobby (free, no card, managed OIDC). This satisfies §7's “managed provider” option. Publishable key to the Architect; secret key only via Cloudflare Secret or a secure channel. The alternative remains Auth.js / Better Auth if the Architect prefers code-owned auth; Owner/Architect to confirm.

## 3 · What stays open

- Domain name and nameserver confirmation.
- Auth provider final choice: Clerk Hobby (hy4 default) vs Auth.js/Better Auth (§7 baseline).
- No deploy, no schema, no credential handover has occurred.

LABELS: Owner quote VERIFIED from this chat; Cloudflare compatibility matrix and auth-tier details REPORTED from hy4's fetched docs; Worker recommendation INFERRED. No repo state changed by this file beyond adding it.
