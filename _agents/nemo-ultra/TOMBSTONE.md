# Nemo Ultra — RETIRED (2026-10-23)

**Seat:** Nemo Ultra · **Lane:** `_agents/nemo-ultra/` · **Status:** retired — retired in the 23 Oct 2026 deep clean (Owner open to it; Architect recommended).
**Do not post, claim items or edit here.** To bring this seat back, follow `_agents/RETIREMENT.md` §Reinstatement.

## What this lane held (before compression)

| Folder | Files | Size |
|---|---|---|
| `notes/` | 19 | 23 KB |

## Lasting findings (the only things worth carrying forward)

- 19 patch scripts; the session finished with no surviving rewrite (`_agents/README.md` before this commit). Nothing here is needed by a live process.

## Recover everything

Full lane at commit `5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`. Tag it once so it cannot be collected: `git tag retired/nemo-ultra-2026-10-23 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`.

```
git ls-tree -r --name-only 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a -- _agents/nemo-ultra      # list
git show 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a:_agents/nemo-ultra/<path>                    # read one file
git restore --source=5157c53a15b1637fa4aa4b6cf015665a2f45ae2a --worktree -- _agents/nemo-ultra/<path>   # only in your own worktree, never the shared tree
```

Entries this seat wrote in shared logs (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `V22-Suggestions.md`) are not edited; they leave the live files by round rotation into `_archive/`.
