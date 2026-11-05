# Envelope freeze mechanics (Z.ai proposal, w74 item 8b) — HOW freezing works, not the field list

## The lifecycle

1. **The Architect writes the freeze.** One commit that states: the frozen field list (per envelope kind), the
   current `SCHEMA_VERSION`, and the conformance test's location. The commit is TAGGED (`envelope-freeze/v1`) so
   every later diff is measured against a name, not a hash.
2. **A conformance test in CI confirms it, forever.** `test/core/envelope-freeze.test.ts` pins, per kind: the
   exact field NAMES of the envelope + each payload (order-insensitive), each field's TYPE class (string /
   integer / number / boolean / array / object-of / union-members), and the required/optional split. The test
   fails on ANY difference that is not additive-by-the-rules below. It is generated from a checked-in manifest
   (`docs/envelope-freeze-v1.json`) so the freeze is data, and the test is a reader.
3. **Later changes are additive + version-numbered, never renames:**
   - NEW OPTIONAL field → allowed, `schemaVersion` unchanged; the reader treats absent as "pre-freeze save";
     writers may emit it immediately (P-254's `deviceId?`, item 5f's `worldSeed?` are the first two).
   - NEW REQUIRED field or NEW union member the old reader would reject → bump `SCHEMA_VERSION` by +1; the
     reader accepts ≤ its own version (already implemented: `parseEnvelope` refuses only NEWER).
   - RENAME → forbidden. Deprecate + add: keep writing the old name (or stop writing it but keep READING it
     forever), add the new name, document in the freeze manifest's changelog section.
   - SEMANTIC change of an existing field (same name, different meaning/type) → forbidden; it is a rename in
     disguise. New field.
4. **Never repair on read** — the reader-side rule already shipped in hydrate/saver: a save that does not
   conform is refused (corrupt / newer-version), never silently re-interpreted. Migration is a v1.1 PRODUCT
   feature if it is ever wanted, not a reader behaviour.

## The three receipts the freeze hangs on (all already true on the branch, VERIFIED this session)

- `parseEnvelope` refuses `schemaVersion > SCHEMA_VERSION` (core/envelope.ts) — the newer-version refusal.
- `saveRevision` is monotonic per lineage and validated on every load — the ordering spine for additive fields
  that need "since when".
- `PIN_ENGINE`/`PIN_DATA` re-pinning (w74 label correction on my own w73 F12) — a ruleset or dataset change is
  already a deliberate, visible act; the freeze extends the same discipline to the envelope shape.

## What the freeze does NOT cover

Payload CONTENT (rosters, scores, plans — those are sport contracts with their own inner checks), the storage
KEY scheme (core/keys.ts has its own law), and the wire format of any future sync layer (that is P-254's rule).

**Needs ruling:** the tag name convention (`envelope-freeze/vN`), the manifest location
(`docs/envelope-freeze-v1.json` proposed), and whether the conformance test lives in `test/core/` (proposed).
