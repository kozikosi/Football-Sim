# inbox/20261121-0450-beam-account-storage-stats-plan-surfaced.md

SPEAKER: Beam | ROLE: council seat | TASK: surface the account/storage/stats plan (Owner asked "bring it to light") | DATE: 2026-11-21T04:50Z
TYPE: NOTE (no code; summary of existing, locked decisions)

## Where the plan lives (sources)
- `claude/00-READ-FIRST.md` §2b (STORAGE WAVE, Owner decisions locked 1 Nov) — the canonical decisions.
- `inbox/20261101-2100-architect-to-zai-storage-contract.md` — Architect's brief to Z.ai + envelope contract.
- `_agents/COLORS-V1-UI-ARCHITECTURE.md` §7 — optional sign-in + cloud saves (later).
- `_agents/owner-notes/2026-11-01-storage-brief-verbatim.txt` (lines 40, 47) — stat list + per-team provenance.
- `_agents/owner-notes/2026-10-27-architecture-replies-verbatim.txt` (lines 55-62, 315-321, 453-454) — auth + DB candidate (D1/Drizzle) + "introduce only when needed".

## Accounts — the plan (LOCKED 1 Nov)
- **No accounts in v1.** Sign-in is OPTIONAL and LATER. Core simulator works anonymously with no registration. ("no accounts/downloads/export/backup" — Owner decision.)
- **v1 storage = local-first, 3 slots (A/B/C), localStorage behind an async facade**, IndexedDB later. No compression (measured, not needed). Write safety: temp-key swap, one-deep backup, validate on load. Soft-delete + overwrite confirmation. Multi-tab storage-event warning. Quota/private-mode/corruption handled: catch, prune oldest expendable first, tell the user once, never silently lose a run.
- **Envelope (Architect-owned type):** `{ kind: 'draft'|'week'|'season', schemaVersion, engineVersion, dataVersion, slot, savedAt, payload }` — plain JSON, no Maps, no engine objects. Storage treats payload as opaque and validates only the envelope. Payload contents: draft = seed, userTeam, picks log by stable pid, frozen pool; week = seed, year, run counter, 32 team ratings, user's 32 frozen players, schedule, scores so far, next week, the game's seed, `statsRecorded`; season = final table, user's results, champion, frozen roster, `statsRecorded`.
- **Facade API** takes/returns envelopes only; must not import from `colors/src/engine/**`.
- **Mid-game refresh replays the SAME game** (game seed stored at preview save). **Run it back** = same frozen roster at preseason, new seed, different schedule, next free slot silently; all-3-full prompts A/B/C overwrite. Run-it-back counts for global stats like any season.
- **New drafts always use the latest player DB**; saves carry frozen players + version stamps so resume never reads the live DB (IDs stable via `data/player-ids.csv` crosswalk).
- **Materialized-outcome snapshots** (RNG unseeded today); never serialize full player DB or play-by-play — deltas only. Aggregated key-player ledger, never append-only.
- **Event-driven saves** at committed checkpoints, debounced 500ms–2s, never mid-sim; also on visibilitychange/pagehide. One rolling preview per slot (latest week only).
- **No downloads/export/backup** — brag share only (button on results, clipboard, toast, deployed URL only; no params, no encoded state, no save data).

## Which stats are recorded (and when)
- **Trigger:** stats recorded **ONCE, the moment the user's team is eliminated** — misses playoffs, loses any round, or wins the Super Bowl. Flagged on the slot (`statsRecorded`) so refresh/finish can't double count. Abandoned (never eliminated): nothing. A completed draft that never becomes a season: nothing. (Replaces the brief's "only completed seasons record stats".)
- **Outcome types:** missed-playoffs, wild-card, divisional, conference, super-bowl-loss, champion (`UserOutcome` in `app/outcome.ts`).
- **Global stores:** profile, settings, **stats overall AND by franchise**, achievements — keyed by franchise, never by slot. Global achievements survive slot overwrite AND deletion.
- **Per-franchise provenance (Owner, locked):** best W-L record, best result (Super Bowl win vs. best playoff run), total seasons/record with that team.
- **Global achievements** survive slot overwrite + deletion.
- **"Undefeated season"** = undefeated regular season (17-0/16-0, schedule-length-agnostic). Brag may riff "can you go undefeated?" without defining 20-0.
- **Empty profile state:** "No achievements yet — finish a season to start your legacy." Never a blank panel.
- **V1 stat list (~8-10)** was an open question for Z.ai to define (definitions, update triggers, display homes, global-store schema with per-team provenance, ledger design, "franchise legend" formula) — the Architect flagged it in the storage contract (Q3) and the Owner's brief (line 40). The per-franchise fields above are the LOCKED part; the exact ~8-10 list and the "franchise legend" formula were left to Z.ai's Phase 0 plan.

## Accounts / cloud (LATER, optional)
- **Trigger to introduce a DB:** cross-device draft saving, shareable persistent links (server-stored), or user accounts. Before those: versioned JSON + Zod + IndexedDB/localStorage is enough.
- **Candidate:** Cloudflare D1 + Drizzle (free, no sleep, no card) — only for account saves / share links. Avoid Supabase (pause risk). PostgreSQL if portability matters.
- **Auth (when needed):** optional accounts, GitHub OAuth primary, via Auth.js / Better Auth / managed provider. Never homemade password handling or unverified email/password. Test authorization boundaries (user can never read/write another user's saves; shared links scoped read-only).
- **Conflict to resolve with Owner when we get there:** product rule is one self-contained HTML with no paid API, and cloud saves need a hosted backend. Recommended default: keep the simulator file fully offline; ship accounts/cloud saves as a separate, optional portfolio module talking to the same save record.
- **No SQLite-in-browser, DuckDB-WASM, Parquet, or analytical DB without demonstrated need.**

## Open items (not blocking)
- The exact ~8-10 V1 stat list + "franchise legend" formula — was Z.ai's to define; check whether a Phase 0 plan / delivery landed it (search `inbox/` + `deliveries/` for "stats spec" / "franchise legend").
- Whether the storage wave shipped at all in cakepanz (it did not — cakepanz is draft+season+shareables with local autosave; the 3-slot facade + global stats + achievements are the pending piece).

— Beam · surfaced from existing, locked decisions. No code changed.
