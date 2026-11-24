# Owner decisions, 24 Nov 2026 (relayed by pickle, REPORTED; recorded by the Architect, append-only)

1. **Current public repo(s):** make them **private** after "merge happens". (Architect's reading of "merge", for the Owner to confirm: the cutover to the new repo going live, not the internal merge into `colors/`. See DELTA-3 section C.)
2. **New `76pancakes` repo:** player data will not be visible. Do not include `data/nfl/madden27-ratings.csv`, `data/nfl/madden27-raw-paste.txt` or `data/nfl/free-agents-old-ratings.csv` in the first public cutover repo. (Resolves the open question of 23 Nov: `free-agents-old-ratings.csv` IS hidden.)
3. **Branding:** lowercase `76pancakes` for URLs, repo names and identifiers; "76 Pancakes" for the README and user-facing text. (Restates `2026-11-23-owner-naming-lowercase-76pancakes-correction.md`.)

Unchanged: no repo created, moved or connected; no Cloudflare repo connection; `wrangler deploy` only after the Owner's explicit "go".
Implementation: `claude/cutover-hide-list.txt` (single source), `tools/cutover-dry-run.sh`, answers in `inbox/*-architect-FOR-pickle-CUTOVER-MANIFEST-DELTA-3.md`.
