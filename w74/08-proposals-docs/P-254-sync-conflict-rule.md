# P-254 — the sync-conflict rule (Z.ai proposal, w74 item 8a; the Architect freezes it)

## The rule, in one line

**Per-slot last-write-wins on the WHOLE save — never a field merge — with the envelope already carrying what
LWW needs to be correct later: monotonic `saveRevision` (shipped) plus `savedAt` (shipped); `deviceId` joins as
an ADDITIVE optional field now, so v1.1 sync does not force an unfreeze.**

## Why whole-save LWW and never a field merge

1. **The save is a lineage, not a document.** A slot's payload is one committed transition of one
   (saveId, saveRevision) chain. Merging FIELDS of two different revisions produces a save that never existed
   in any lineage — and every downstream guarantee (resume determinism, the gameSeed check, hydration's
   corrupt-never-repair) assumes the payload is a real committed state. A field merge is a corrupt save we
   manufactured ourselves, with the user's own hands.
2. **Determinism gives us what merges try to recover.** The engine's selling point is that the same seed and
   the same action log play identically. The cheaper, safer conflict-resolution for a deterministic game is not
   "merge the states" but "keep the newer state; the loser's lineage stays on disk as the rung-back" — the user
   loses nothing that replaying their choices cannot rebuild.
3. **Per-SLOT, not per-save-id:** two devices writing the SAME saveId is the LWW case; two different saveIds in
   one slot is a fork — the sync layer surfaces "keep both" (the loser gets a fresh slot or a bak key), which is
   an envelope-level operation (`saveId` is the lineage key — shipped for exactly this), never a payload merge.

## What the envelope already has, what joins now

- **Has:** `saveId` (the lineage), `saveRevision` (monotonic per lineage, +1 per committed transition, never
  decreases — even undo does not decrease it), `savedAt` (ISO per write), `slot`.
- **Joins now, additive, `schemaVersion` stays 1 (the freeze-mechanics doc, item 8b, carries the rule):**
  `deviceId?: string` — an anonymous install identifier, minted once per browser, sent with every write. LWW's
  tie-breaker becomes (saveRevision, savedAt, deviceId) — deterministic, no clock skew between devices can
  reorder two revisions, because revision compares first.
- **Never joins:** per-field timestamps, CRDT counters, a merge policy flag. The rule's whole point is that
  these are unnecessary.

## The v1.1 story (why this freezes now)

When sync arrives: a device uploads (saveId, saveRevision, savedAt, deviceId, payload-blob). The server keeps
the newest REVISION per lineage; an equal-revision conflict is impossible (revisions are minted per lineage by
the writing device); a slot pointing at two saveIds is a fork resolved at the SLOT level (keep-both), not the
payload level. No envelope field is renamed, no payload is reinterpreted, no unfreeze.

## What the app does TODAY under this rule (v1, no sync)

The saver already implements it locally: newest-wins per key, stale revisions dropped (core/saver.ts). The only
v1 addition this proposal needs is minting `deviceId` once (sim:device) and stamping it into the envelope when
the field lands. Until sync exists the field is inert metadata — which is exactly why it can join now.

**Needs ruling:** the field name (`deviceId`), the mint location (`sim:device` under the keys scheme), and the
fork-resolution UX ("keep both" is v1.1 work; the proposal only freezes that it will be slot-level).
