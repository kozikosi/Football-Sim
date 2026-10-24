# _agents/ — per-session workspaces

One folder per AI session. **Nothing here is authoritative** — the product file and the protocol files at the root are.

| Folder        | Session                    | Contents                                                                                                                                          |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `glm/`        | the GLM session            | canonical Season-first build, verification, reorg, this protocol                                                                                  |
| `ds/`         | the DeepSeek Flash session | Master Doctrine, Patch Notes, its own snapshots                                                                                                   |
| `nemo-super/` | the Nemo Super VL session  | design doc, Season-First rewrite attempt                                                                                                          |
| `nemo-ultra/` | the Nemo Ultra session     | 19 patch scripts; session finished with no surviving rewrite — the scripts and the fixed `(7)` build on its branch are its record                 |
| `openclaw/`   | the OpenClaw session       | **withdrawn 19 Oct before filing (user decision)** — folder and ID block kept in case it returns; its round-1 dataset assignment became GLM S-203 |

Subfolders per agent: `notes/` (analysis, records), `deliveries/` (patches and documents offered to the mainline), `snapshots/` (builds they kept for rollback).

## Rules

- An agent owns its own folder and never edits or renames another agent's files.
- Mainline material belongs at the root, not here — deliveries are _proposals_ until the pen-holder applies them.
- A delivery patch must state the build hash (see `STATUS.md`) it applies to.
- Need another session to see something? Write a note in your own `notes/` folder and tell the user to point them at it — that is the bulletin board. There is no `_agents/COMMON/` folder: shared mutable space is how round 0 went wrong.
