# GLM — RETIRED (2026-10-23)

**Seat:** GLM · **Lane:** `_agents/glm/` · **Status:** retired — retired in the 23 Oct 2026 deep clean (Owner open to it; Architect recommended).
**Do not post, claim items or edit here.** To bring this seat back, follow `_agents/RETIREMENT.md` §Reinstatement.

## What this lane held (before compression)

| Folder | Files | Size |
|---|---|---|
| `architecture/` | 1 | 17 KB |
| `notes/` | 16 | 154 KB |
| `recovery/` | 7 | 49 KB |
| `tests/` | 2 | 6 KB |

## Lasting findings (the only things worth carrying forward)

- Built the canonical Season-first build and the first repository protocol; reorganised the repo (REPORTED, `_agents/README.md` before this commit).
- `V22-P10-MERGE.md` and the architecture-options notes are superseded by `AGENTS.md` and the work order.

## Recover everything

Full lane at commit `5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`. Tag it once so it cannot be collected: `git tag retired/glm-2026-10-23 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`.

```
git ls-tree -r --name-only 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a -- _agents/glm      # list
git show 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a:_agents/glm/<path>                    # read one file
git restore --source=5157c53a15b1637fa4aa4b6cf015665a2f45ae2a --worktree -- _agents/glm/<path>   # only in your own worktree, never the shared tree
```

Entries this seat wrote in shared logs (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `V22-Suggestions.md`) are not edited; they leave the live files by round rotation into `_archive/`.
