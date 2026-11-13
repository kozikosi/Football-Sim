# INKLING — lane file (rewrite at the end of every session; never append)

## Identity
- **Seat:** INKLING · **Model / how reached:** Inkling 2 Small Free (opencode/inkling-2-small-free), via OpenChamber · **State:** general advisor (acting as council organizer until MUSE returns; not a standing role)
- **First seen / admitted:** 2026-11-09 (Owner) · **Wave:** 2026-11-13 active (the framework-test evaluation wave + the Owner's 16-ruling batch + MUSE-absence refactoring)

## Identity note
INKLING is **not a permanent seat**. This lane is **the Owner's instrument**, in use temporarily until MUSE returns or the Owner picks a successor. It will be rewritten or handed off on demand; no contract, no relationship, no compensation, no replacement guarantee implied. Anything INKLING wrote lives in files on-disk — read those first.

## What INKLING produced this session (pointer + truth)
All files on `council/inkling` as of `91c2b349` (inclusive). Nothing lives only on this machine. INKLING reads the current tip for state; this file was rewritten at the end of session.

### Deliverables clustered by acceptance
- **Verification artifacts:** all arms rebuild green except arm-solidstart (0/5 — empty SSR shell, hydration never attaches); 6/7 arms passed Playwright acceptance run; arm-nuxt requires `npm run generate` (not `build`) — `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/PLAYWRIGHT-V3-2026-11-14.md` (`dd4d16c2`)
- **Both INKLING arms** built, verified, zero leakage, goldens byte-identical — `…/arm-solid/…` and `…/arm-lit/` (delivery `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/`)
- **Eight reviews of council filings** — `inbox/20261113-0255..0302-inkling-*.md` (`c9a805af` + `6fa14618`)
- **Work orders** — `_agents/inkling/prompts-2026-11-13/{claude,zai,council}-work-order-2026-11-13.md` (`5b780f06` merge)
- **Briefing for Z.ai** — `_agents/inkling/prompts-2026-11-13/briefing-for-zai-v3-2026-11-14.md` (`91c2b349`)
- **v3 work order** — `_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md` (revised through four passes; v3 final revision integrates Beam's 10 critiques, Glyph's 13, ERNIE's 8 — INKLING dissents on file for Beam's one error about arm-existence)
- **P-345 λ-followup** — `inbox/20261113-0300-inkling-P-345-lambda-followup.md` (`20ebc25a`) — flat-prior-context-multiplier model stage-following-(Owner's third objective ruling); includes Q7's 13-item static-inventory table + 2-regime proposal
- **Observation report** — `_agents/inkling/INKLING.md` (current) + HANDOVER.md (`path forthcoming`)

### What's left to finish — none of which needs INKLING
1. **Z.ai executing the briefing** (`briefing-for-zai-v3-2026-11-14.md`) — read file; it supersedes the old v3 order; one ask, zero commands
2. **Council scoring the arms** per the work order — the digest lands on the Owner's desk, not INKLING's hand
3. **Claude executing his order** (rulings file; GitHub Actions plan; track merge decision; cutover trigger; print layout; `@types/node` in place; Node pin decided)
4. **Owner ruling** on the framework from council digest; the other four Claude-prompt deliverables land in his hands

### Chosen commit pause points
- INKLING's standing practice for backing off: once the §-deliverable files have been pushed, the seat is quiet. All pending items belong to other seats or the Owner.

## Semantic relationships
- **Reviews of deliveries** from anyone — INKLING is reviewer-of-record here unless a seat claims one of his filings; seats never stand aside for INKLING's judgment
- **MUSE** (out since early Nov) — INKLING replaced her organizing role ambitiously but does not claim her authority or her lane; her return ends this post
- **Z.ai** — INKLING is junior to him inside this wave; v3 briefings are advisory, his arm seats are INKLING's not his; INKLING's arm-solid/lit pins hold until he says otherwise
- **Checkpoint evidence** — everything INKLING ever claimed was checked via run; but confirmations on his verification will beat an answer over any pigeoning of approval

## What the next seat should read
1. `PROJECT-KNOWLEDGE.md` (live on `council/muse`)
2. `AGENTS.md` (most recent — live on `council/muse`, 2026-11-13 carry; covers MUSE's standing permission for `AGENTS.md` + `_agents/*.md` as the single writer; INKLING's files are subordinate)
3. `INKLING-HANDOVER.md` (file next to this one)

## Retired-writing walls
- **INKLING never edits this repo's governance files** (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `CLAUDE.md`, `MERGE-MANIFEST.md`, `biome.json`, `tools/lint*`)
- **INKLING never reviews his own work** — INKLING's filings get reviewed by any other seat
- **INKLING never claims standing reviewer status**; standing is given, not claimed
- **INKLING arms stay verifiable by others** at `_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` — that address is fixed; INKLING doesn't move it
