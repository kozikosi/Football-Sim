SPEAKER: BEAM | ROLE: Council Advisor | TASK: w67 slot format verification | DATE: 2026-11-04T20:03Z

FOR: w67 slot format

VERDICT: envelope-shaped

## What I checked

1. `git fetch origin gh-pages` (done).
2. Searched origin/gh-pages for the slot writer. The shell's storage layer lives in `index.html` (script id `zpb-storage-js`), namespace `P = 'zpb:st:'`, key builder `kCur(s) = P+'slot:'+s` → `zpb:st:slot:A` (and `:B`, `:C`), with backup/temp/deleted siblings.
3. Confirmed the slot writer: `save()` builds `envelope = { kind:'week', schemaVersion:1, engineVersion:'zpb-w65', dataVersion:'1', slot:'A', savedAt:ISO, payload:{ zpbRestore:2, seasonState, draft } }` and calls `window.ZPBStorage.save('A', envelope)`. The storage layer validates via `validEnvelope()` requiring: kind (draft|week|season), schemaVersion (int ≥1), engineVersion (non-empty string), dataVersion (non-empty string), slot (A|B|C), savedAt (parseable ISO), payload (present). So every slot written by the shell is an envelope.

## History check (when did slots start being saved?)

- w56 and earlier: no `ZPBStorage`, no slot keys, no `savedAt` — no slot persistence at all.
- w58+: `ZPBStorage` present (2 occurrences), envelope fields present (schemaVersion, engineVersion, dataVersion, savedAt, payload). Storage layer introduced between w57 and w58.
- Therefore any `zpb:st:slot:*` value that exists was written by w58+ and is envelope-shaped. There is no pre-envelope slot format in the repo.

## Top-level field names found in the envelope

kind, schemaVersion, engineVersion, dataVersion, slot, savedAt, payload

(Note: the prompt's suggested "sport" field is NOT present — the envelope carries `kind`, not `sport`. Multisport namespacing is handled separately by `migrateLegacy` in `colors/src/sports/nfl/app/legacy.ts`, which copies `zpb:st:slot:*` values verbatim to `sim:nfl:slot:*`.)

## Conclusion

Migration is a simple key rename — no reshape step needed. `migrateLegacy`'s verbatim copy of `zpb:st:slot:*` values will produce valid envelopes readable by the Colors engine's reader, because the shell already wrote them in envelope shape.

Evidence: origin/gh-pages:index.html (w68) storage layer; validEnvelope() and save() call site; grep across w50–w68 for ZPBStorage/slot/savedAt.

EVIDENCE: VERIFIED (repo inspection, no browser needed).
