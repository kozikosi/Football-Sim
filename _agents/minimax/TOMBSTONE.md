# MiniMax — RETIRED (2026-10-23)

**Seat:** MiniMax · **Lane:** `_agents/minimax/` · **Status:** retired — no longer available (Owner, 23 Oct 2026).
**Do not post, claim items or edit here.** To bring this seat back, follow `_agents/RETIREMENT.md` §Reinstatement.

## What this lane held (before compression)

| Folder | Files | Size |
|---|---|---|
| `evidence/` | 5 | 11 KB |
| `notes/` | 21 | 438 KB |
| `prototypes/` | 6 | 3859 KB |
| `shots/` | 3 | 3245 KB |
| `tools/` | 11 | 96 KB |

## Lasting findings (the only things worth carrying forward)

- Built the verification gate, `post-merge-smoke.mjs` (REPORTED in AGENTS.md §9). It now lives at `tools/post-merge-smoke.mjs`; two mobile probes moved to `tools/probes/`.
- Wrote most of the work order `V22-Suggestions.md` (P10/P11 rounds, cold-read notes). It stays at the repo root; this lane's copy and all candidate builds were removed.
- Candidate builds (`V22-candidate-*`, `owner-brief*`) were built on the council copy `044d1759…`, not on Pre-Colors: INFERRED stale. Recover from the base commit only if a colour or layout idea is needed.
- The 3.2 MB of screenshots were draft-board team-colour renders; the Owner's 22 Oct 32-team colour table is authoritative, not these.

## Recover everything

Full lane at commit `5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`. Tag it once so it cannot be collected: `git tag retired/minimax-2026-10-23 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`.

```
git ls-tree -r --name-only 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a -- _agents/minimax      # list
git show 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a:_agents/minimax/<path>                    # read one file
git restore --source=5157c53a15b1637fa4aa4b6cf015665a2f45ae2a --worktree -- _agents/minimax/<path>   # only in your own worktree, never the shared tree
```

Entries this seat wrote in shared logs (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `V22-Suggestions.md`) are not edited; they leave the live files by round rotation into `_archive/`.
