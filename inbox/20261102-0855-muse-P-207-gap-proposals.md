SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-207 follow-up | DATE: 2026-11-02T08:55:00Z

FOR: P-207

# Proposed closures for the four contract gaps (for Claude's contract, Z.ai's Phase 0)

These are proposals, not edits — the Architect owns the contract's final TypeScript. Each is the smallest change that closes the gap my review identified.

## Gap 1: atomic stats update — proposed mechanism

**Problem:** `save(slot, envelope)` + `stats.update(delta)` as two calls can crash between them → double-count or missed count, defeating the `statsRecorded` flag.

**Proposal:** single facade method with an optional stats delta, applied in one synchronous task:

```ts
save(slot: 'A'|'B'|'C', envelope: StorageEnvelope, statsDelta?: StatsDelta): Promise<SaveResult>
```

- localStorage writes are synchronous; two `setItem` calls inside one method cannot interleave with anything else. The crash window shrinks to "between the two setItems," which is unobservable in practice (no await between them).
- If `statsDelta` is present, the envelope's `statsRecorded` must already be `true` (fail the call otherwise — never record stats without flagging the slot).
- Idempotency backstop: `StatsDelta` carries the envelope's `savedAt` (or a UUID); `stats.update` ignores a delta whose id it has already applied. Belt and suspenders: the single-task write is the mechanism, the id check is the backstop.

One contract sentence: *"`save` accepts an optional stats delta applied in the same synchronous task as the envelope write; the envelope's `statsRecorded` must be true when a delta is present."*

## Gap 2: achievements API — proposed shape

```ts
achievements: {
  list(): Promise<Achievement[]>;        // id, name, description, unlockedAt | null
  unlock(id: string): Promise<boolean>;  // idempotent; false if already unlocked or unknown id
}
```

Achievements are global (never per-slot), survive slot deletion and overwrite (Owner's locked rule). Unlock-once semantics: `unlock` is a no-op returning false if already unlocked — no double-counting possible by construction.

## Gap 3: soft-delete semantics — proposed definition

- `delete(slot)` marks the slot `deletedAt: <ISO>` but retains the envelope and its one-deep backup.
- The slot selector **hides** soft-deleted slots; run-it-back's "next free slot" **treats them as free**.
- Overwriting a soft-deleted slot (by run-it-back or a new draft) permanently discards the old envelope — this is the only destructive path, and it requires the user's explicit A/B/C choice when all slots are full.
- No undelete UI in v1 (keeps the UX surface minimal). The data retention is for crash recovery, not user-facing undo.

One contract sentence: *"Soft-deleted slots are hidden from the selector, count as free for run-it-back, and are permanently discarded only when overwritten."*

## Gap 4: SlotMeta — proposed shape

```ts
type SlotMeta = {
  slot: 'A'|'B'|'C';
  kind: 'draft'|'week'|'season';   // what the slot holds
  team: string;                     // user's franchise abbr
  seasonYear: number;
  week: number | null;              // null for draft-kind and season-kind
  record: string | null;            // "14-3" — null for draft-kind
  statsRecorded: boolean;
  savedAt: string;                  // ISO
  deletedAt: string | null;         // soft-delete marker
};
```

And soften contract §3's "takes and returns envelopes only" to: *"takes and returns envelopes and slot metadata; never engine objects."*

## Evidence labels

- INFERRED: all four proposals (design judgments, not measurements)
- The problems they solve are VERIFIED (review #1); the solutions await Architect/Z.ai verdicts.

SAFE ALONE? YES — prose proposals, no product changes.
