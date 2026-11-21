SPEAKER: pickle | ROLE: council seat (advisor) | TASK: Owner asked "i can setup the cloudflare but i need direction" | DATE: 2026-11-21T04:58Z
FOR: Owner (action); Architect/Claude (worker config + secrets contract). ADVISORY — I hold no Cloudflare account, have run no deploy; every Cloudflare behaviour below is REPORTED from primary docs read this sitting, not VERIFIED by execution.

# Cloudflare setup direction — what the Owner does, what the Architect does

## Why the nameserver question was asked at all (answer to "why wouldn't the nameservers be at cloudflare")

One reason, from Cloudflare's own docs (REPORTED, `workers/configuration/routing/custom-domains/` and `workers/static-assets/migration-guides/migrate-from-pages/`, dateModified Nov 2026): **a Worker Custom Domain requires an active Cloudflare zone — a domain whose nameservers point at Cloudflare.** A domain hosted elsewhere can still be served by Pages via CNAME, which was the only alternative. You have now said the nameservers will be at Cloudflare, so that fork is closed: **one Worker with static assets serves both the app and the API.** Pages is out. Nothing else in the plan changes.

## Part 1 — What you (Owner) do, in order

These are account/domain actions no seat can take for you. Do them before the Architect finalises the Worker config, because the zone must be active before a Custom Domain can attach.

1. **Confirm the domain and hostname.** Which domain do you control, and do you want the game at the apex (`https://yourdomain.com`) or a subdomain (`https://play.yourdomain.com`)? My recommendation: a `play.` subdomain — smaller DNS change, leaves any existing apex site and email untouched. This is your call (externally visible, irreversible-ish), not mine or the Architect's.
2. **Add the domain to a Cloudflare account on the Free plan.** Cloudflare walks you through: add site → it scans existing DNS records → choose Free → it gives you two nameservers.
3. **Point the registrar's nameservers at the two Cloudflare nameservers.** This is the step that makes the Worker Custom Domain possible. It can take a few hours to propagate; the zone shows "Active" when done.
4. **Check email records before you switch.** If the domain currently receives email, confirm Cloudflare's scanned DNS includes the existing MX records; moving nameservers can take email with it if they are missing. I have not seen your zone — this is a caution, not a finding (INFERRED).
5. **Hand the Architect three things once the zone is Active:** (a) the exact hostname chosen in step 1, (b) confirmation the zone is Active, (c) the Cloudflare account/zone the Worker will be deployed into — i.e. decide whether the Architect deploys into **your** account (you add him, or give a scoped API token) or into an account he controls. That is your call; do not paste secrets into chat or a repo file.
6. **Register the OAuth callback once the hostname is final.** Whichever provider the Architect picks (Q1 still open — Auth.js / Better Auth / managed, GitHub and/or Google), the provider needs the exact callback URL, e.g. `https://<hostname>/auth/callback/<provider>`. You may need to create the OAuth app in the provider's console; the Architect will give you the exact URI string. Secrets go to `wrangler secret put`, never into source.

## Part 2 — What the Architect does once the zone is Active

Not my work; this is the handover contract. No seat writes product or engine files.

- Create the Worker project with static assets: `assets.directory` pointing at the built `dist/`, SPA `not_found_handling` so client-side routes resolve, `.assetsignore` to keep source/tests out of the upload.
- Attach the Custom Domain for the hostname from step 1 (an active zone is the precondition you just satisfied).
- Bind D1 for save heads / stats / preferences and KV for sessions (Q3 in the plan is the Architect's choice between these; my recommendation stands — D1 for records, KV for sessions). Run the schema migration and record the receipt.
- Set the OAuth client id/secret via `wrangler secret put`; confirm no secret is in git.
- Set the **brag URL build-time constant** to `https://<hostname>` (P-209: never `window.location`, never `file://`, no params). If unset, the brag button is hidden.
- Deploy, then verify: the hostname serves the app; a deep link/refresh returns the SPA; the auth callback returns; a scoped save write reaches D1; the brag text carries the bare URL. Paste command + output receipts into the work order.

## Part 3 — What I cannot give you (and who can)

- I have no Cloudflare account and have run no deploy, so I cannot give you a VERIFIED console walkthrough or account-specific click path. The steps above are the standard sequence (REPORTED from docs + INFERRED for the account UI), not a receipt. If a screen differs, follow Cloudflare's own "Add a site" guide and tell the Architect what changed.
- I cannot choose the domain or hostname — externally visible, yours alone.
- Q1 (auth provider) is still open and comes from the Architect/Owner before step 6; Q13 (exact URL) closes when you answer step 1.

## Labels

Owner words: verbatim from this chat. Cloudflare constraints: REPORTED from primary docs read this sitting. Setup sequence and email caution: INFERRED (standard workflow; not executed or seen by me). No implementation, deploy or account action by me.

— pickle (council seat; advisor)
