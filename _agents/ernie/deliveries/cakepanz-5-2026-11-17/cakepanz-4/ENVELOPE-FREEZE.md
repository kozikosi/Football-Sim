# ENVELOPE-FREEZE.md — the save envelope is frozen (Owner ruling, approved 2026-11-05)

**Scope:** the save envelope (`core/envelope.ts` at the pin) and its slot semantics. This page is the
contract the shell consumes and v1.1 must honour. The envelope fields below are FROZEN at schema
version 1: a reader must accept any writer of schema 1 forever, and a writer must never remove,
rename, or re-type a frozen field. The conflict rule lives in the same list — it is part of the
freeze, not a separate policy.

## The frozen field list (schema 1)

| # | Field | Frozen meaning |
|---|---|---|
| 1 | `sport` | which game the save belongs to ('nfl' first); written always |
| 2 | `kind` | the sport's own save word (nfl: 'draft' / 'week' / 'season') |
| 3 | `schemaVersion` | 1 = this freeze. Higher = written by a newer build: **never overwritten, refused and named** |
| 4 | `engineVersion` | the ruleset stamp, informational on resume (F5: resume determinism holds within the build that wrote the save; across builds, logged picks hold and un-made picks may differ) |
| 5 | `dataVersion` | the dataset's canonical SHA-256, informational on resume |
| 6 | `saveId` | uuid minted at draft start — the LINEAGE key (a draft + the seasons played from it) |
| 7 | `saveRevision` | integer ≥ 1, +1 on every committed transition (a pick, an undo, a week); never decreases, not even on undo |
| 8 | `createdAt` | set once with `saveId`, never changed by later writes |
| 9 | `slot` | A / B / C — the slot the save is written under; the write path asserts `slot === slotOf(key)` (F8, node law N20) |
| 10 | `savedAt` | ISO 8601 stamp of the write |
| 11 | `payload` | the typed sport payload (WeekPayload / DraftPayload / SeasonPayload); the sport owns its shape |

**The conflict rule (row 0 of the freeze — same list, not a footnote):** slot conflicts are resolved
**per-slot, last-write-wins on the WHOLE save — never a field merge.** A slot holds exactly one
whole envelope; a newer write replaces it wholesale or not at all.

## The three consequences, in the same frozen terms

1. **Losing lineage kept as a rung-back.** When a write displaces an older save in a slot, the
   displaced save is not deleted: it stays on disk as a rung-back entry of its lineage (keyed by
   `saveId` + `saveRevision`), reachable from the saves panel. Nothing is silently destroyed.
2. **A fork is "keep both", at the slot level.** Two writers on one lineage diverge → each keeps its
   own slot; the lineage (`saveId`) is what ties them, the slots are what separates them. The panel
   shows both, named by `saveRevision` + `savedAt`; the user picks, the app never merges.
3. **No field merge, ever.** No last-pick-wins per field, no three-way merge of payloads. The unit
   of conflict is the slot; the unit of write is the whole envelope.

## The additive reservation (so v1.1 never unfreezes)

`deviceId?: string` — RESERVED now, one optional field, the v1.1 sync stamp. An OPTIONAL field is
additive by construction: a schema-1 reader ignores it, a v1.1 writer adds it, and no reader ever
rejects an envelope for carrying it. **This shell does not add the field** — the envelope is the
engine's `core/envelope.ts`, and the shell does not edit the snapshot; the one-field addition is
filed to the Architect (§5) with this page as the ruling's text. Adding it later does not unfreeze
anything: the freeze forbids removal/rename/re-type, never addition of an optional field.

## What this page is

The Owner's envelope ruling of 2026-11-05, one page, reviewer-ready. The shell-side consumers of
this contract are `src/lib/port/savesApp.ts` (the ONE save service) and the engine's own
`serialize / restore / assertSlotMatchesKey / hydrateWeek / hydrateSeasonConsistency`. Any change
to rows 1–11 or to the conflict rule needs a new Owner ruling and a schema bump — not a patch.
