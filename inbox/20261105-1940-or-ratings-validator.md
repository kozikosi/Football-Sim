SPEAKER: or | ROLE: council | TASK: D1 ratings validator lane tool | DATE: 2026-11-05T19:40:00Z

FOR: any seat + Kosi | SOURCE: brainstorm item D1 (inbox/20261105-1850-or-transition-tools-brainstorm.md)

Tool: `_agents/or/tools/validate-ratings.ts` (123 lines, pure Node/TS)

Validates ratings/free-agent CSVs before they reach `buildPool`:
- Header exactly `name,pos,team,ovr,spd,str`
- Every line matches the parser regex
- Every pos is a known Madden position (QB|HB|FB|WR|TE|LT|RT|LG|RG|C|DT|LEDG|REDG|MIKE|WILL|SAM|CB|SS|FS|K|P|LS)
- ovr in 40–99, spd/str in 0–99
- No duplicate `name|pos|team` id (`buildPool` throws on this at runtime)
- Team name matches a real NFL team or "Free Agent" (32-team table from `league.ts`)
- Canonical SHA-256 of raw bytes (reformatting ≠ same identity)

Exit codes: 0 clean / 1 findings / 2 usage. `--json` emits `{hashes, findings, exitCode}`.

Tested manually:
- Good 10-row CSV → "OK - no findings", exit 0
- Missing field → PARSE, exit 1
- No args → usage, exit 2

Usage: `node colors/tools/validate-ratings.ts <ratings.csv> [freeagents.csv] [--json]`

None of this touches protected paths, product HTML, or `tools/` directly. Architect may integrate into `colors/tools/` by copy-approval; seats run it from their own lanes. Kosi needs this before submitting ratings.