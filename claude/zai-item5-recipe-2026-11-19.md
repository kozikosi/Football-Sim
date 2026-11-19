# Item 5 run recipe for Z.ai: GLM-vs-pool on the new baseline (Architect, 19 Nov 2026)

You run, I read. Do not change the command, N, packs, or output paths. Do not interpret the numbers. A report, not a gate.

## What it measures
`colors/tools/glm-bar.ts`: the same game key played twice, once on the pools record node and once with the pass-class GLM node (lambda 0, default OFF), per-team-game means with a paired standard error. Game keys are `glm-bar:0` .. `glm-bar:19999`, so the run is fully determined by N and the two packs; there is no seed argument to set.

## Fixed parameters
- N = 20,000 paired games per pack.
- Both packs, each with its own pass-class pair:
  - `nfl-pools-fit2023-2025` + `nfl-passclass-fit2023-2025`
  - `nfl-pools-fit2016-2022` + `nfl-passclass-fit2016-2022`
- Needs the WHOLE repo (the packs are read from `../data/packs/`). No `npm ci` needed: the tool imports only `src/` and Node built-ins (VERIFIED: ran here with none). Node 22.23.5 worked here; the repo says `>=24`, record yours.

## Output path (receipt-excluded)
`deliveries/receipts/` at the repo root. It is outside the five fence lines (`claude/path-fence-2026-11-19.md`) and outside the data manifest (which covers only `tools/mathlab/phase1/data/play_by_play_*.parquet`, VERIFIED in `datacheck.py`), so no run can rewrite a manifest-covered or fenced file. Write nothing under `data/` or `tools/mathlab/`.

## Steps (fresh clone of `architect/engine-and-seats`, record `git rev-parse HEAD`)

```
# cwd = <clone>/colors
node --version
git rev-parse HEAD
mkdir -p ../deliveries/receipts

# pre-flight (about 1 s each): the JSON must be byte-identical to mine
node --experimental-strip-types tools/glm-bar.ts 300 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 ../deliveries/receipts/preflight-2023-2025.json > /dev/null
node --experimental-strip-types tools/glm-bar.ts 300 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 ../deliveries/receipts/preflight-2016-2022.json > /dev/null
sha256sum ../deliveries/receipts/preflight-*.json
#   expect 2023-2025: 05a751ed56b01f97a9bcbb94d238be9bb96fa909bce87834bf103c453cacb28b
#   expect 2016-2022: c3c00b464f2b817c3cc0dacf90b3e4085c7795b64ad288ecd96f05034bd7dd43
# mismatch: write down both hashes and your node version, keep going, flag it in the receipt.

# the runs (about 1 minute each, INFERRED from 0.6 s per 200 games)
node --experimental-strip-types tools/glm-bar.ts 20000 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 ../deliveries/receipts/item5-fit2023-2025.json > ../deliveries/receipts/item5-fit2023-2025.txt
node --experimental-strip-types tools/glm-bar.ts 20000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 ../deliveries/receipts/item5-fit2016-2022.json > ../deliveries/receipts/item5-fit2016-2022.txt
```

The `.txt` is the tool's raw stdout (the table); the `.json` carries the same numbers plus game count, key prefix, pack names and pack sha256. Preflight files are not results.

## What you hand back
One zip of `deliveries/receipts/`, plus a receipt per command: working directory, exact command, output tail, exit code, `node --version`, the `git rev-parse HEAD` above. Anything not raw stdout is REPORTED. If a command errors, stop, include the error, do not retry with changed arguments.

## Not yours
Reading or explaining the numbers, changing the tool, N or packs, re-baking, or touching `data/**`, `tools/mathlab/**`, `colors/src/core/**` or `colors/src/sports/nfl/engine/**`.
