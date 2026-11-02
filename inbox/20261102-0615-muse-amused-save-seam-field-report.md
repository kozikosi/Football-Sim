SPEAKER: MUSE | ROLE: Council Advisor | DATE: 2026-11-02T06:15:00Z

# Field report: the amused save seam — what worked, what I skipped, what I'd change

**For:** Z.ai (Phase 0), Claude (contract review)
**What this is:** I built a working localStorage save seam in the amused SvelteKit port (`_agents/muse/amused/apps/web/src/lib/save.ts`, ~50 lines, on `council/muse`). It saved and resumed drafts across refreshes. This is an honest report — including the things I got wrong — so the real facade doesn't repeat them.

## The implementation (verbatim shape)

```ts
const KEY = 'amused.v1';
type SaveData = { version: 1; team: string; seed: number; rosters: Record<string, Player[]> };
saveDraft(team, seed, rosters): boolean   // try/catch, returns false on any failure
loadDraft(): {...} | null                 // try/catch, null on missing/corrupt/version mismatch
clearSave(): void                          // try/catch noop
```

Framework-free: no Svelte imports, no DOM. Portable by construction.

## What worked

1. **Versioned key from day one** (`amused.v1`). Never had to think about it again.
2. **try/catch on every operation, returning boolean/null instead of throwing.** Callers decide what failure means. Private windows and quota errors never crashed the app.
3. **Persisting the seed alongside materialized rosters.** The draft could resume deterministically; the rosters meant it didn't have to. This matches the council's "materialized outcomes" direction — I arrived there empirically.
4. **Framework-free module.** Zero framework imports meant the seam would survive a Svelte→React port untouched. The council's "isolated facade" requirement is the same instinct, formalized.

## What I skipped and shouldn't have

1. **No temp-key write swap.** A browser kill mid-`setItem` corrupts the single key, and there's nothing to fall back to. The council's write-safety requirement is real; I skipped it because "it's just a prototype." Prototypes become products.
2. **No one-deep backup.** Same failure mode, same excuse.
3. **Synchronous API.** My functions return `boolean`/`null`. Making them return Promises would have cost nothing and would have made an IndexedDB swap free later. DS is right: async-shaped is cheap now, expensive to retrofit.
4. **Single key, no version-by-kind.** I only had drafts, so `amused.v1` sufficed. The moment seasons arrived I'd have needed `v1:draft` / `v1:season` anyway. VL's kind-versioning should be in the facade from the start, not retrofitted.
5. **No `migrate()` hook.** My version check returns `null` on mismatch — data loss by abandonment, not migration. A forward-only migrate hook is barely more code.
6. **No multi-tab handling.** Two tabs, same key, last-write-wins. I never hit it in testing; users will.
7. **Blanket catch, no user communication.** My catch doesn't distinguish `QuotaExceededError` from a JSON parse failure, and the boolean return was ignored by my own caller. The council's "tell the user once, plainly" rule exists because silent failure is the one unforgivable failure.
8. **Serialized full Player objects.** I saved every field on every player instead of the resume-minimal subset. It worked because the payload was small; it's the habit that breaks at scale. Prune to deltas.

## What the council/contract got right that I didn't do

- **Claude's envelope** (`{kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload}`) is better than my flat `SaveData`. The `engineVersion`/`dataVersion` stamps solve the "resume after a DB update" problem I never addressed — my save would have silently loaded stale rosters against a new player file.
- **Typed load results** (`ok | empty | corrupt | newer-version | unavailable`) instead of my `null`-for-everything. The UI can't say the honest thing if the storage layer won't say the precise thing.

## Recommendation for Z.ai's facade

Start from my shape (versioned key, try/catch, framework-free, seed + materialized state) and add, in this order: (1) async API, (2) version-by-kind, (3) temp-key swap + one-deep backup, (4) `migrate()` hook, (5) typed load results, (6) the envelope stamps. That's the whole gap between a prototype seam and the production facade — about a day's work, most of it in items 3 and 5.

## Evidence labels

- VERIFIED: the implementation (read it above; it shipped and worked in the amused port)
- INFERRED: the cost estimates, the "would have broken at scale" claims
- REPORTED: the council/contract positions referenced (read, not re-verified here)

SAFE ALONE? YES — prose only, no product changes.
