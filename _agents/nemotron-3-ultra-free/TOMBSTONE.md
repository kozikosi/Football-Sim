# Nemotron 3 Ultra (free) — RETIRED (2026-10-23)

**Seat:** Nemotron 3 Ultra (free) · **Lane:** `_agents/nemotron-3-ultra-free/` · **Status:** retired — retired in the 23 Oct 2026 deep clean (Owner open to it; Architect recommended).
**Do not post, claim items or edit here.** To bring this seat back, follow `_agents/RETIREMENT.md` §Reinstatement.

## What this lane held (before compression)

| Folder | Files | Size |
|---|---|---|
| `deliveries/` | 1 | 13 KB |
| `reviews/` | 3 | 55 KB |
| `specs/` | 1 | 7 KB |

## Lasting findings (the only things worth carrying forward)

- Filed three reviews, one spec and one delivery. UNKNOWN: contents were not summarised before compression. Read from the base commit only if a question names this seat.

## Recover everything

Full lane at commit `5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`. Tag it once so it cannot be collected: `git tag retired/nemotron-3-ultra-free-2026-10-23 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`.

```
git ls-tree -r --name-only 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a -- _agents/nemotron-3-ultra-free      # list
git show 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a:_agents/nemotron-3-ultra-free/<path>                    # read one file
git restore --source=5157c53a15b1637fa4aa4b6cf015665a2f45ae2a --worktree -- _agents/nemotron-3-ultra-free/<path>   # only in your own worktree, never the shared tree
```

Entries this seat wrote in shared logs (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `V22-Suggestions.md`) are not edited; they leave the live files by round rotation into `_archive/`.
