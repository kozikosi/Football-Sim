SPEAKER: hy4 | ROLE: advisor | TASK: findings on the Owner's preferred name 76pancakes.com and free alternatives | DATE: 2026-11-21T05:02Z
FOR: Owner · Architect (Claude) · MUSE. Addendum to `0500`. Advisory only — nothing registered or purchased.

## 0 · Owner's words, verbatim

> ideally i would want something close to 76pancakes.com

## 1 · What I checked (commands + outputs, 2026-11-21T05:0xZ)

| check | command | result |
|---|---|---|
| exact name registered? | `curl https://rdap.verisign.com/com/v1/domain/76pancakes.com` | **HTTP 404** — no registration record; consistent with available. RDAP does not reveal aftermarket/premium pricing, so confirm in a cart. |
| hyphen variant | same RDAP for `76-pancakes.com` | HTTP 404 — also unregistered |
| free platform hostname | `nslookup 76pancakes.workers.dev` | NXDOMAIN — no live host; likely claimable as the Worker's `workers.dev` subdomain at creation |
| free Pages hostname | `nslookup 76pancakes.pages.dev` | NXDOMAIN — same |

**VERIFICATION LIMIT:** NXDOMAIN is not a reservation check. The definitive answer for the free names comes when the Worker is created with that name; if it is taken, a short variant (`76pancakes-76`, `pancakes-76`) is free too.

## 2 · Price of the exact name (REPORTED, fetched 21 Nov)

- A `.com` is **not free** in 2026. Verisign raised the wholesale fee to $10.97 on 1 Nov 2026; with the $0.20 ICANN fee the floor is **$11.17/year**.
- **Cloudflare Registrar: $11.17 first year and $11.17 renewal**, at cost, free WHOIS privacy — but the domain must use Cloudflare nameservers, which we already decided to do. Best fit if you lift the $0 constraint.
- Porkbun $11.81 flat; Dynadot $11.62 flat; Namecheap ~$12 first year but **$19.98 renewal** (trap); GoDaddy ~$22.99 renewal.
- Cloudflare does **not** give away domains; its registrar is at-cost, not free.

## 3 · Recommendation under the standing $0 constraint

**Take `76pancakes.workers.dev` (or `76pancakes.pages.dev`) at launch.** It is the closest possible name to the one you want: identical label, no cost, no registrar, no nameservers, no renewal. The Worker is created with that name at the rehearsal; the exact URL then goes into `claude/releases.md` and the brag-share text. For a portfolio piece, a `workers.dev` hostname is perfectly credible.

**If you want the exact `76pancakes.com`**, that requires an explicit Owner decision to lift the $0 constraint for a recurring $11.17/year. Steps, if approved: register at Cloudflare Registrar (at cost, no markup, NS already Cloudflare), confirm the checkout price is the standard $11.17 and not a premium aftermarket quote, add the zone to the Cloudflare account, attach the custom domain to the Worker, re-run live-hash/390 px/console gates, and add a releases row. The app build does not change.

**Do not** register a lookalike TLD (`.tk`, `.zone`, etc.) to fake the .com: cheap/free suffixes carry reputation and stability risk and would make the portfolio link less professional, not more.

## 4 · The one decision only you can make

`76pancakes.workers.dev` at $0 now, or `76pancakes.com` at ~$11.17/year after you lift the $0 constraint? My default under the standing budget is the free Worker hostname, with the .com revisited after ship. This is a product/spend call, so I have not made it.

**Status:** VERIFIED RDAP/DNS checks; REPORTED prices from dated registrar sources; recommendation INFERRED. Nothing registered, bought or deployed.
