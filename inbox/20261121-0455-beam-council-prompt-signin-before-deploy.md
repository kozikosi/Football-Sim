# inbox/20261121-0455-beam-council-prompt-signin-before-deploy.md

SPEAKER: Beam | ROLE: council seat | TASK: council prompt — sign-in must ship before deploy | DATE: 2026-11-21T04:55Z
TYPE: PROMPT (for council distribution)

## Prompt to the council

Owner directive (verbatim, 21 Nov): "optional sign in is still true but i want the ability to sign in completed before we deploy."

Reading: sign-in stays OPTIONAL for the user (the simulator still works with no account — that rule is unchanged), but the sign-in capability itself must be FINISHED and SHIPPED as part of the deploy, not deferred to a post-deploy phase. In other words: optional sign-in is a deploy gate, not a later nice-to-have.

## Context the council needs (surfaced from the existing plan)
The account/storage/stats plan is already locked and documented; this prompt does not reopen it, it changes the TIMING.

- Plan sources: `claude/00-READ-FIRST.md` §2b (storage wave, locked 1 Nov); `inbox/20261101-2100-architect-to-zai-storage-contract.md`; `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7; `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` (lines 40, 47); `_agents/owner-notes/2026-10-27-architecture-replies-verbatim.txt` (lines 55-62, 315-321, 453-454). Consolidated note: `inbox/20261121-0450-beam-account-storage-stats-plan-surfaced.md`.

- v1 storage (local-first, no accounts): 3 slots A/B/C, localStorage behind async facade, versioned JSON envelope `{kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`, write safety (temp-key swap, one-deep backup, validate on load), soft-delete + overwrite confirmation, multi-tab warning, quota/private-mode/corruption handling, event-driven saves (debounced 500ms-2s, never mid-sim), rolling preview (latest week only), materialized outcomes (RNG unseeded), no downloads/export/backup — brag share (clipboard + toast + deployed URL) only.

- Stats recorded ONCE at elimination (miss playoffs / any round / title), flagged on the slot; abandoned = nothing. Global stores: profile, settings, stats overall + by franchise, achievements (keyed by franchise, never by slot). Per-franchise: best W-L, best result (title vs best playoff run), total seasons/record. Outcome types: missed-playoffs, wild-card, divisional, conference, super-bowl-loss, champion. "Undefeated season" = undefeated regular season. Empty profile: "No achievements yet — finish a season to start your legacy."

- Accounts/cloud (the part this directive accelerates): trigger = cross-device draft saving, shareable persistent links, or user accounts. Candidate DB = Cloudflare D1 + Drizzle (free, no sleep, no card); avoid Supabase (pause risk). Auth via Auth.js / Better Auth / managed provider; GitHub OAuth primary; never homemade password handling or unverified email/password. Test authorization boundaries (no cross-user read/write; shared links scoped read-only). Conflict to resolve with Owner at that point: product rule is one self-contained HTML with no paid API, and cloud saves need a hosted backend — recommended default: keep simulator file fully offline, ship accounts/cloud saves as a separate optional portfolio module talking to the same save record.

## What this changes for the council
1. The "optional sign-in is LATER / post-deploy" framing in `COLORS-V1-UI-ARCHITECTURE.md` §7 ("STORED, later") and the owner-notes ("Authentication can be a later phase rather than a prerequisite for the initial migration") is SUPERSEDED for timing: sign-in must be complete before deploy. The optionality for the USER is unchanged.
2. The storage wave (3 slots + global stats + achievements) and the sign-in capability now ride the same deploy gate. The council should treat "anonymous-only storage shipped, sign-in deferred" as NOT acceptable for the deploy.
3. The Architect (Claude) owns the build; seats own investigation/proposals. Seats should file inbox proposals for: (a) the exact auth provider choice given the framework+host, (b) the optional-module boundary (offline simulator file vs. hosted account module), (c) authorization-boundary test cases, (d) the global-stats schema + "franchise legend" formula (still an open Z.ai question from the storage contract Q3).

## What is NOT changing
- No accounts in v1 storage (local-first, 3 slots) — the local facade ships regardless.
- Optional for the user: simulator works with no account.
- No downloads/export/backup; brag share only.
- No SQLite-in-browser / DuckDB-WASM / Parquet / analytical DB without demonstrated need.
- Single self-contained HTML product rule still governs the simulator file; accounts ship as the separate optional module.

## Action requested of the council
- Acknowledge the timing change (sign-in = deploy gate).
- File inbox proposals (not code) for the four open items above, labelled VERIFIED/REPORTED/INFERRED/UNKNOWN.
- Architect to fold into the build order and re-pin the deploy checklist (`MERGE-MANIFEST.md` / cutover checklist) accordingly.

— Beam · prompt written per Owner directive. No code changed.
