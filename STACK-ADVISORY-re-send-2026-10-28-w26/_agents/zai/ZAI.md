# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push (sandbox reads GitHub via public HTTPS); work reaches GitHub via the Owner, `tools/import-zip.sh zai`, or `tools/seat-save.mjs`. · **State:** High Councillor (below the Architect, above advisors; Owner, 24 Oct 2026)

## Current work
- 2026-10-28 chat: **stack advisory shipped** under two NEW Owner laws: (1) everything must be FREE — hard constraint; (2) portfolio/interview value is the primary success metric. Deliverable: `deliveries/STACK-ADVISORY-FREE-AND-PORTFOLIO-2026-10-28.md`. No product build this chat; the product stands at wave 19 (`Football-Sim-Z-post-blue-w19.html`, md5 `1215639c9529882f685037ecd765f81f`).
- Rulings in the advisory: the friend's stack survives the free rule except server-side simulation (→ browser Web Workers; free Workers = 10 ms CPU per invocation, hard-enforced); WebSockets moot; auth nuance (GitHub OAuth is free; volunteer the no-verification shortcut in the README); database = D1 + Drizzle (Supabase free tier pauses on idle — dead-demo risk on a bursty-idle traffic shape); SvelteKit-vs-Next decision rule documented (flip by target job market; engine stays framework-independent as the hedge); four-rule free-tier audit added (no card; nothing on the demo path sleeps; quotas fail closed; assume free tiers get revoked — keep everything swappable).
- Open to council: WZ-1..7 in `WORK-REQUESTS-ZAI-w19.md` (unaffected by this chat).

## What the next session needs
- Read first: `deliveries/STACK-ADVISORY-FREE-AND-PORTFOLIO-2026-10-28.md`; this file; `START-OF-CHAT-ZAI.md` §3.
- If the Owner green-lights the framework app: intake-ledger every line of his directive FIRST, then follow the advisory's decision rules (framework fork by target job market; engine stays framework-independent; simulation in browser workers, never server-side on free tiers).

## Do not redo
- The 2026-10-28 free-tier verification pass: Workers free = 100k req/day + 10 ms CPU per invocation (hard-enforced); Pages free = 500 builds/mo, effectively unlimited bandwidth; Supabase free pauses projects on inactivity; PlanetScale/Fly.io free tiers dead since 2024. Facts pinned in the advisory.
- Baseline identity and line-3 selector history (`notes/BASELINE-VERIFICATION.md`, `notes/CORRECTION-LINE3-SELECTOR.md`).

## Files in this lane
- `deliveries/` Z.ai's documents (handoff REV 15, style guide, playbook, reweight brief, governance, wisdom, build report, stack advisory)
- `tools/` build scripts, CSS/JS parts, verify suites, logo scripts
- `builds/` the two Z-post-blue HTML files (NOT product builds; pins in `BASELINES.md`)
- `notes/` prompts, corrections, worklog

## Rules that changed
- NEW Owner laws (2026-10-28): zero-cost hard constraint + portfolio-first framing apply to every future architecture recommendation. Server-side compute for simulations is OFF the table on free tiers; browser workers are the default. Nothing on the demo path may sleep.
