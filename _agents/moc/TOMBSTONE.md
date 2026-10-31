# MOC — RETIRED (2026-10-23)

**Seat:** MOC · **Lane:** `_agents/moc/` · **Status:** retired — no longer available (Owner, 23 Oct 2026).
**Do not post, claim items or edit here.** To bring this seat back, follow `_agents/RETIREMENT.md` §Reinstatement.

## What this lane held (before compression)

| Folder | Files | Size |
|---|---|---|
| `(root)` | 1 | 3 KB |
| `evidence/` | 14 | 70 KB |
| `notes/` | 60 | 800 KB |
| `receipts/` | 6 | 67 KB |
| `recovered/` | 11 | 706 KB |
| `tools/` | 2 | 9 KB |

## Lasting findings (the only things worth carrying forward)

- Coordinated the V22 work order and ran the standing verification chores (product-script lint, colour readiness audit P14, merge map, copy-compliance map). Their conclusions are in `V22-Suggestions.md` and the bulletin archive.
- `recovered/` held copies of the bulletin and submissions from `stash@{1}` after the shared-tree wipe (commit `7b4bc9f`); the live copies are `COUNCIL-BULLETIN.md` (now rotated into `_archive/bulletin/`) and `SUBMISSIONS.md`.
- Wrote `MOC.md`, the only lane file in the old `<NAME>.md` convention.

## Recover everything

Full lane at commit `5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`. Tag it once so it cannot be collected: `git tag retired/moc-2026-10-23 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a`.

```
git ls-tree -r --name-only 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a -- _agents/moc      # list
git show 5157c53a15b1637fa4aa4b6cf015665a2f45ae2a:_agents/moc/<path>                    # read one file
git restore --source=5157c53a15b1637fa4aa4b6cf015665a2f45ae2a --worktree -- _agents/moc/<path>   # only in your own worktree, never the shared tree
```

Entries this seat wrote in shared logs (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `V22-Suggestions.md`) are not edited; they leave the live files by round rotation into `_archive/`.
