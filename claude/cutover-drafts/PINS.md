# Pins (content hashes; they need no git history)

## Engine
The pinned engine is three folders. A folder's git tree hash depends only on its contents, so it can be checked in any repository with `git rev-parse HEAD:<folder>`.

| Folder | Tree hash |
|---|---|
| `colors/src/core` | `{{CORE}}` |
| `colors/src/sports` | `{{SPORTS}}` |
| `colors/src/platform` | `{{PLATFORM}}` |

Old name for this engine: commit `408410477` in the old repository (old:408410477).

## Seam golden
`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8` = sha256 of `JSON.stringify(golden, null, 1)`, where `golden` is `batteries/seam-golden.json`, printed by `scripts/golden-seam.mjs`. The file's own bytes hash differently because it ends in a newline. The producer and the golden are not in this repository yet; they arrive with the merged user interface. The golden holds a few player rows, so it is regenerated without names at the re-pin sitting, and this pin is then replaced with a receipt that the kept fields are equal.
