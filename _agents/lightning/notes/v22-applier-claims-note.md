# V22 Applier Claims Verification Note — GLM Batch 2026-10-22

**Five claims checked against** `_agents/lightning/notes/v22-applier.js` and `_agents/boc/notes/applier-verification.md`:

| # | Claim | Status | Evidence |
|---|-------|--------|----------|
| 1 | Applier built with `--item1..--item16` and `--all` and `--team-colors` flags | **NOT SUPPORTED** | merge-html-applier.js defines only items 21–25 (5 items); no `--team-colors` flag exists in either file; value-here-applier.js has `--drop-sort/--keep-sort` only |
| 2 | 8/16 items apply via exact-string matching | **NOT SUPPORTED** | File defines only 5 items (21–25); 2 of 5 use `new: ''` deletions; items 1–20 not configured |
| 3 | Self-check distinguishes HTML span `footlabel` from CSS `.footlabel{}` class | **NOT SUPPORTED** | Neither applier file contains "footlabel"; value-here-applier.js self-check checks header cell count (expect 9), body cells per row (expect 9), empty-state colspan (expect 9), "Value here" count (expect 0), r.v. consumers present — no footlabel distinction |
| 4 | Geometry invariants preserved (139 player entries, 64 team-data refs) | **WRONG AS STATED** | PLAYERS = 1,200 (not 139); TEAM_DATA = 32 teams (not 64) |
| 5 | `--team-colors` takes palette as external JSON with zero hard-coded values | **NOT SUPPORTED** | No `--team-colors` flag in either applier file |

## Key File Reality Checks

- **merge-html-applier.js** (87 lines): Rough draft, not usable. Defines items 21–25 only. Main function is placeholder. No flag parsing beyond `--item1..--item30` and `--all` mentioned in comments.
- **value-here-applier.js** (286 lines): Working, complete tool for its scope (7 value-here edits). Has idempotent check (`isPatched`), self-check with `node --check`, `--drop-sort/--keep-sort` flags.
- **Build pin verification**: The applier prints SHA256 of input file and expects `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B, current tree). If mismatch, patch may silently fail.

## Summary

Three of five claims are **not supported** by the files; one is **wrong as stated** (geometry counts); one is **partially true** only for value-here-applier.js (self-check exists but does not distinguish footlabel from CSS class). 

**The value-here-applier.js is the verified, working tool** for its scope (7 value-here removal edits). The merge-html-applier.js is a rough draft not ready for production use. Copy-pasteable edits in `merge-html-edits-*.md` remain the reliable change set.

**M-line**: M-412: V22 applier claims verification — 3 claims unsupported, 1 wrong as stated, 1 partially true only for value-here-applier.js; verified build hash `044d1759e01ac99b…` referenced; value-here-applier.js (286 lines) is the working tool; merge-html-applier.js (87 lines) is draft not for production.