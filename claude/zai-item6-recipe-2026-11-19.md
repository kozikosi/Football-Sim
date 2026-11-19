# Item 6 run recipe for Z.ai: the lambda axis (Architect, 19 Nov 2026)

You run, I read. Do not change the command, N, packs, or output paths. Do not interpret the numbers. A report, not a gate. Nothing here changes a pack, a default, or any file under `src/`.

## What it measures
`colors/tools/lambda-axis.ts`: how far the pass-class tilt (`drive.ts` `tilt()`, `P_k ∝ p_k * exp(s * theta_k)`, `s = lambda * passGap`) moves a whole game. The shipped pack has lambda 0, so the tool overrides lambda to 1 off-pack and sweeps `s` over -1, -0.5, -0.25, 0.25, 0.5, 1 against the `s = 0` baseline. Every arm plays the same game key as the baseline (`lambda-axis:0` .. `lambda-axis:19999`), so each difference carries a paired standard error. The run is fully determined by N and the two packs; there is no seed argument.

## Fixed parameters
- N = 20,000 paired games per arm per pack (6 arms plus baseline, so 7 plays per key).
- Both packs, each with its own pass-class pair:
  - `nfl-pools-fit2023-2025` + `nfl-passclass-fit2023-2025`
  - `nfl-pools-fit2016-2022` + `nfl-passclass-fit2016-2022`
- Needs the WHOLE repo (packs are read from `../data/packs/`). No `npm ci` needed for the tool. Node 22.23.5 worked here; the repo says `>=24`, record yours.

## Output path (receipt-excluded)
`deliveries/receipts/` at the repo root, same as item 5. Write nothing under `data/` or `tools/mathlab/`.

## Steps (fresh clone of `architect/engine-and-seats`, record `git rev-parse HEAD`)

```
# cwd = <clone>/colors
node --version
git rev-parse HEAD
mkdir -p ../deliveries/receipts

# pre-flight (about 2 s each): the JSON must be byte-identical to mine
node --experimental-strip-types tools/lambda-axis.ts 300 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 ../deliveries/receipts/item6-preflight-2023-2025.json > /dev/null
node --experimental-strip-types tools/lambda-axis.ts 300 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 ../deliveries/receipts/item6-preflight-2016-2022.json > /dev/null
sha256sum ../deliveries/receipts/item6-preflight-*.json
#   expect 2023-2025: e793aacbb8c2bfaaf830b25d7c2eca59d94e82bfb8b89b3052b16756a0fcd45b
#   expect 2016-2022: ad3f1a2a2719cb8dc18e046e611b599e3046b5cade6e1b4c39fdc213e49efc66
# mismatch: write down both hashes and your node version, keep going, flag it in the receipt.

# the runs (about 2 minutes each, INFERRED from 2 s per 300 games)
node --experimental-strip-types tools/lambda-axis.ts 20000 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 ../deliveries/receipts/item6-fit2023-2025.json > ../deliveries/receipts/item6-fit2023-2025.txt
node --experimental-strip-types tools/lambda-axis.ts 20000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 ../deliveries/receipts/item6-fit2016-2022.json > ../deliveries/receipts/item6-fit2016-2022.txt
```

The `.txt` is the tool's raw stdout (one table per arm); the `.json` carries the same numbers plus game count, key prefix, axis, theta, pack names and pack sha256. Preflight files are not results.

## What you hand back
One zip of `deliveries/receipts/`, plus a receipt per command: working directory, exact command, output tail, exit code, `node --version`, the `git rev-parse HEAD` above. Anything not raw stdout is REPORTED. If a command errors, stop, include the error, do not retry with changed arguments.

## Not yours
Reading or explaining the numbers, changing the tool, N, the axis or packs, re-baking, or touching `data/**`, `tools/mathlab/**`, `colors/src/core/**` or `colors/src/sports/nfl/engine/**`.

## Architect notes (not for Z.ai)
- At N=300 the extremes are large: s=-1 gives sacks +164%, completions -26%, points -18%; s=-0.5 gives sacks +65%. Theta (comp, inc, sack, int) is 0.300 -0.200 -1.000 -0.600 on the 2023-2025 pack (VERIFIED, tool output). So the usable range of `lambda * gap` is small, and a real lambda must be identified against that scale, not guessed.
- `passGap` is ONE scalar per game, applied to both offenses alike (VERIFIED, `drive.ts:78`, `game.ts:87`). A real team-strength lambda needs a per-offense gap (offense minus defense). That is a design question for the ratings track, not built here; the axis result tells us how big the gap may be.
- Decision it feeds: whether GLM default stays 0 (yes until item 5 lands) and what range lambda identification should target.
