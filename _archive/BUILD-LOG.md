# _archive/ — superseded builds, frozen forever

Never edit anything in here. One line per build in BUILD-LOG.md, newest last.

## BUILD-LOG

| #   | Build                            | Bytes   | Date          | Author line                    | Note                                                                                                                                      |
| --- | -------------------------------- | ------- | ------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `index.html` / "(6)"             | 602,381 | —             | Claude-line                    | the currently published GitHub Pages artifact (lives in the repo)                                                                         |
| 2   | `(7)`                            | 641,395 | Oct 18        | Claude base + Nemo Ultra fixes | Tier-1 fixes applied by the Nemo Ultra session                                                                                            |
| 3   | `(8)`                            | 641,309 | Oct 18        | Claude-line                    | pure Claude snapshot (Nemo Ultra's pre-fix backup)                                                                                        |
| 4   | `(9) (OC)`                       | 641,987 | Oct 18        | Claude-line                    | recovered from the 01:38 tar snapshot; ≤12-byte title-edit residue documented in the repo's BRANCHES.md                                   |
| 5   | GLM Season-first build "v10"     | 648,749 | Oct 19 ~01:15 | GLM session                    | full Season-first rewrite; verified E2E. = `backup-before-reorg/NFL Draft Simulator (GLM verified build).html` = the clone's `glm` branch |
| 6   | DS "v10" patch (current product) | 650,127 | Oct 19 ~01:48 | GLM base + DS session          | v20 restyle + three fixes (division-tag look-ahead among them); verified Oct 19 ~02:05. = root product file = the clone's `ds` branch     |

Note: Nemo Ultra's 19 patch scripts live in `_agents/nemo-ultra/notes/patch-scripts/` (committed on its branch). Delete the local copies only after the push, never before.
