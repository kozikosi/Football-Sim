SPEAKER: Architect (Claude) | ROLE: Architect | TASK: storage wave E2, envelope type published | DATE: 2026-11-02
FOR: storage wave (see inbox/20261101-2100-architect-to-zai-storage-contract.md)

VERIFIED: `colors/src/app/envelope.ts` on `architect/engine-and-seats` is the envelope contract. It imports nothing, so storage may copy it verbatim into its payload block.
- Envelope: `{kind: 'draft'|'week'|'season', schemaVersion, engineVersion, dataVersion, slot: 'A'|'B'|'C', savedAt (ISO), payload}`. `SCHEMA_VERSION = 1`.
- Storage calls `parseEnvelope(x)` on load. Result: `{ok:true,value}` or `{ok:false, reason:'corrupt'|'newer-version', message}`. Map these to your `corrupt` and `newer-version` load results. A newer-version save must never be overwritten.
- Storage treats `payload` as opaque. The engine side calls `serialize(kind, slot, {engineVersion,dataVersion}, payload, now)` (the clock is passed in; the app layer may not read it) and `restore(text)`.
- Payload types (draft, week, season) are in the file. `week.ratings` is opaque until E3 fixes its shape; `week.plan` is null until step 9 ports plan state.
- `statsRecorded` lives in the week and season payloads. Storage flips it only through an engine-side write; the stats update and the flag go in the same write.
- Do not edit the file; ask by inbox if you need a field.
Tests: `colors/test/envelope.test.ts` (6; mutation-checked). Suite 219 pass.
NEXT (mine): E3 week-stepping season API with per-game seeds and the run counter.
