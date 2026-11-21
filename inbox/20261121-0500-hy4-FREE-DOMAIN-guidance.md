SPEAKER: hy4 | ROLE: advisor | TASK: answer the Owner's question — no domain yet, how to get a free one | DATE: 2026-11-21T05:00Z
FOR: Owner · Architect (Claude) · MUSE. Addendum to `0453`/`0457`. Advisory only; no account, domain or deploy created.

## 0 · Owner's question, verbatim

> i don't already have a domain; how can i get a free one?

## 1 · My recommendation first

**Do not get a domain for the first release. Ship on the free `workers.dev` subdomain.** It is a clean, legitimate URL for a portfolio piece, costs $0, requires no registrar, and needs no nameserver changes. Cloudflare does **not** give away domains — its registrar sells at cost; `workers.dev` is a free platform hostname, which is a different thing. The portfolio value is the running app, the repo and the architecture note, not a vanity TLD.

If you later want a free vanity name at $0, two paths are realistic (both REPORTED from pages fetched 21 Nov — verify their current terms before committing):

1. **`yunamo.com` / `.loc.cc` free subdomain** — their page advertises $0, no card, GitHub/Google sign-in, and **custom nameservers** ("delegate to Cloudflare"). That is exactly what a Workers custom domain needs. It is still a subdomain owned by the provider, not a domain you own.
2. **`eu.org`** — the long-standing free second-level domain, supports custom nameservers and Cloudflare, non-commercial, permanent, but **manual review taking days to weeks** (some reports say months). You supply Cloudflare's two NS at application time; a temporary DNS zone may be needed to pass their NS-response check. Do not plan a release around it.

Do **not** chase Freenom (`.tk/.ml/.ga/.cf/.gq`) — free registrations ended around 2023–24; any 2026 "free .tk" offer is stale or a trap. `is-a.dev` is for developer projects via GitHub PR and explicitly restricts NS delegation (not granted for convenience or to new accounts), so it is not a reliable route to Cloudflare. Student-pack year-one free domains exist but only with proof of enrolment. A cheap real TLD (~$1–2 first year, ~$10+ renewal) would be the right long-term answer **if** you ever lift the $0 constraint — that is your call, not mine.

## 2 · Consequence for the plan

- `0457` §1's domain question resolves to: **no domain at launch → use `workers.dev`**; no nameserver work, no registrar, no cost. The Workers + thin Worker recommendation is unchanged — it works on `workers.dev` without a custom domain.
- The Cloudflare account and Clerk Hobby tenant from `0457` §2 are still needed; skip only the "add site / move nameservers" step.
- The exact live URL goes into `claude/releases.md` and the brag-share text once the rehearsal has run; no URL is invented now.
- If a `.loc.cc` or `eu.org` name is added later, that is a **separate, reversible** change: add the zone to Cloudflare, point its NS there, attach the custom domain to the Worker, re-run the live-hash and 390 px gates, and add a releases row. It is not a release gate.

## 3 · Verification

Facts in §1 are REPORTED from pages fetched 2026-11-21 (Cloudflare DNS/nameservers docs; is-a.dev FAQ; yunamo.com; eu.org guides and 2026 Freenom-alternative surveys dated Aug–Nov 2026). None was actioned or purchased. The recommendation in §1 is INFERRED under the standing $0 constraint and the portfolio objective (Owner, 21 Nov).

**Status:** advisory. No domain registered, no account created, no paid service touched.
