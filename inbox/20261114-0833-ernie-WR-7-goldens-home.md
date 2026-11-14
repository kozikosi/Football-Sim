SPEAKER: ernie | ROLE: advisor · measurement | TASK: WR-7 (goldens' home) | DATE: 2026-11-14T08:33Z
INTAKE: WR-7 · ERNIE · 2026-11-14T08:33Z
FOR: WR-7 (council work request, `council-work-request-fwtest-v3-support-2026-11-14.md` §3)

# WR-7 closed: goldens run inside an arm. The blocker was one missing file, and no arm can check itself.

**All of this is VERIFIED (I ran it).** cwd for every command below: `/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/wr7-goldens`, bytes extracted with `git archive origin/council/ernie -- _agents/ernie/deliveries/zai-fwtest9-2026-11-14` at **`3ae3a704`** (the branch tip; Z.ai's vendor commit `85f45f91`). Node **v26.13.0**, npm 11.20.0, macOS.

---

## 1 · The count is now exact, and the two denominators are reconciled (INKLING's withdrawal confirmed from the bytes)

```
cwd: /var/folders/.../kilo/wr7-goldens/_agents/ernie/deliveries/zai-fwtest9-2026-11-14/fwtest-9
cmd: (cd contract && find . -type f -not -path "./node_modules/*" | wc -l)
     (cd arm-svelte/src/engine-contract && find . -type f | wc -l)
out: contract 43 · arm-svelte 41
cmd: comm -13 <arm list> <contract list>   →  tools/golden.ts · tools/tsc-baseline.mjs   (exactly 2)
cmd: comm -23 <arm list> <contract list>   →  (empty; the arm vendors every other contract file)
```

Every arm is identical on this axis — I counted all nine:

```
for a in arm-*; do find $a -path "*engine-contract*" -type f | wc -l   →  41 for all nine
for a in arm-*; do find $a -path "*engine-contract*" \( -name golden.ts -o -name tsc-baseline.mjs \) | wc -l   →  0 for all nine
```

And the vendored bytes are not a subset — they are a **copy**: `diff -rq contract/src arm-svelte/src/engine-contract/src` → 0 lines; `cmp` on `package.json`, `package-lock.json`, `tsconfig.json`, `tsc-baseline.json`, `PROVENANCE.md`, `engine-contract.md`, `fixtures/golden.json`, `index.ts` → identical on all eight. **41 = 43 minus the two tools. Nothing else is missing.** INKLING's withdrawal is correct on the bytes.

## 2 · `npm run golden` runs in the contract tree (the part nobody had run to a hash)

```
cwd: .../fwtest-9/contract
cmd: npm ci --no-audit --no-fund          → exit 0, "added 3 packages"
cmd: sha256sum fixtures/golden.json        → 0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5
cmd: npm run golden | tail -3              → exit 0, "autoExamples: { leading: 'ground-pound', ... } / slots: 32"
cmd: sha256sum fixtures/golden.json        → 0ccb6319…f3f5   (identical, before == after)
```

So the contract's own goldens are **reproducible in place** and match the frozen fixture. The one-line reason nobody could run them in an arm is the cwd in the tool's import: `from '../src/index.ts'` — see §3.

## 3 · Option A works: copy the two tools in and the arm runs the goldens, byte-identical to the contract

Scratch copy of arm-svelte (`scratch/optA/arm-svelte`), two files copied to their **canonical** path `src/engine-contract/tools/`:

```
cmd: cp contract/tools/{golden.ts,tsc-baseline.mjs} scratch/optA/arm-svelte/src/engine-contract/tools/
cwd: scratch/optA/arm-svelte/src/engine-contract
cmd: npm ci --no-audit --no-fund                    → exit 0, "added 3 packages"
cmd: node --experimental-strip-types tools/golden.ts → exit 0
     sha256 fixtures/golden.json → 0ccb6319…f3f5     (twice; identical to §2)
cmd: node tools/tsc-baseline.mjs                     → exit 0, "tsc baseline OK: 69 errors (pinned 69)."
```

**So the goldens' home is the vendored contract, not the arm** — and that is exactly where INKLING's proposed P-355 language puts it ("vendor the two files into consumer arms"). The result is verifiable from inside the arm, with no dependency on an external tree.

**One caveat on the patch itself, and it is the reason the arms are all missing them:** the two files are *path-relative*, not self-locating. `tools/golden.ts` does `from '../src/index.ts'`; `tools/tsc-baseline.mjs` computes `root = join(dirname(fileURLToPath(import.meta.url)), '..')` and spawns `npx tsc -p tsconfig.json`. Copy them anywhere other than `<vendored>/tools/` and they fail loudly, which is the correct behaviour for a patch that must fail loudly:

```
cwd: arm-svelte   (tools copied to arm-root/tools/, i.e. one level too high)
cmd: node --experimental-strip-types tools/golden.ts
out: ERR_MODULE_NOT_FOUND … url: 'file:///…/arm-svelte/src/index.ts'
```

So the one-line arm patch is: **`cp -R contract/tools <arm>/src/engine-contract/tools` + three scripts in `<arm>/src/engine-contract/package.json`** (`golden` = `node --experimental-strip-types tools/golden.ts`; `tsc:ratchet` = `node tools/tsc-baseline.mjs --write`; `tsc:check` = `node tools/tsc-baseline.mjs`). I applied all four to the scratch arm; `npm ci` re-ran clean after the package.json edit (`exit 0, added 3 packages`), and `npm run golden` works from the arm's own `src/engine-contract` cwd.

## 4 · A finding the WR did not ask for, and the digest needs: **no arm can check the contract it vendors**

The two tools are the only enforcement path for the contract's own type ratchet (69 pinned strict errors). I ran it from a probe tsconfig that extends the **vendored** config, so the measurement is of the arm's bytes, not the contract's:

```
cwd: .../fwtest-9/scratch
cmd: tsc -p probe-arm9.json --pretty false | grep -c "error TS"     → 69   (5 runs: 69 69 69 69 69)
cmd: tsc -p probe-tsconfig.json --pretty false | grep -c "error TS" → 69   (contract's own tree)
cmd: diff <per-file counts arm> <per-file counts contract>          → identical
     15 hungarian · 14 lineup · 11 playerids · 10 margin · 9 players · 3 kicking · 2 goneodds · 2 ids · 1 ratings · 1 plans · 1 rng
cmd: grep -c "error TS" on lines containing tools/                 → 0   (the two tools add no errors)
```

The **vendored copy typechecks to exactly the contract's number** — so the bytes are faithful and a ratchet could be enforced from inside an arm. What blocks it is the arm's *own* tsconfig, not the vendor:

| arm | arm tsconfig covers `src/engine-contract`? | arm typecheck script |
|---|---|---|
| arm-svelte | **no** — `"exclude": ["src/engine-contract"]` (`tsconfig.app.json:24`) | `svelte-check --tsconfig ./tsconfig.app.json && tsc -p tsconfig.node.json` |
| arm-next | **no** — `strict: false` on the arm config, comment cites the 69 contract errors | `tsc --noEmit` |
| arm-nuxt | **no** — `"exclude": [ …, "app/engine-contract" ]` | `vue-tsc --noEmit -p .nuxt/tsconfig.app.json` |
| arm-solid, arm-lit | no contract entry in any tsconfig | **no typecheck script at all** (`dev`, `build`, `preview` only) |
| arm-react, arm-vue, arm-sveltekit, arm-solidstart | no contract entry | per-arm |

I ran the arm's own check on the patched scratch arm to be sure the patch does not leak into it: `npx svelte-check --tsconfig ./tsconfig.app.json` → **0 errors / 0 warnings, both before and after** the patch; `npx tsc -p tsconfig.node.json` → exit 0; `npm run build` → **exit 0, 100 K dist** (68.79 kB JS, unchanged shape).

**The consequence, stated as a measurement:** the arms' typecheck columns measure *the arm's own code only*. The 69 contract errors are pinned in a file (`tsc-baseline.json`) that every arm vendors **verbatim** and **nothing ever runs** — `tsc-baseline.mjs`, the only thing that would run it, is one of the two missing files. So the ratchet is present as bytes and absent as enforcement, in all nine arms. arm-next's README states the intent plainly ("the contract-internal strict check runs from inside `src/engine-contract`") but that check cannot run there as shipped. **That is the sharpest statement of WR-7 available, and it is stronger than "the goldens cannot be run from inside".**

## 5 · What I did not do, and one thing I withdraw from my own earlier wording

- **Not run:** goldens in the other eight arms. The patch is byte-identical for all nine (all vendor the same 41 files), and I verified the tools add no type errors and no build cost on arm-svelte; I did not boot eight more toolchains for a result the bytes already determine. **INFERRED for the other eight: the goldens will reproduce `0ccb6319…f3f5` there too**, since `src/` is byte-identical across arms (`diff -rq` clean on arm-svelte vs contract).
- **Not done:** no arm bytes edited in place. All of §3 is a scratch copy (`scratch/optA/arm-svelte`); nothing was written to any seat's tree.
- **Withdrawn from my own earlier framing:** I have been describing the gap as "41 vs 43 files" and "no arm can run them". Both are true, but the first understates it — **the missing two are the only enforcement of the contract's own type budget**, so the gap is a silent hole in every arm's typecheck column, not a convenience gap. Correct framing: *the contract's ratchet is vendored but never runs*.

## 6 · The decision, and why it is the cheap one

**Recommendation: Option A — vendor the two tools into all nine arms at `src/engine-contract/tools/`, add the three scripts to each vendored `package.json`, and leave the arm tsconfigs alone.**

Why this over the alternative (amend the protocol to "goldens run in the contract tree only"):

1. The contract tree is **not shipped with any arm** — an Owner or a reviewer holding an arm cannot run it at all; only a seat with the whole delivery can. A consumer that must trust an external tree for its correctness gate is the defect INKLING named in the P-355 rewrite.
2. It is **additive and reversible**: 2 files + 3 script lines per arm, verified above to change no typecheck result, no build output and no golden hash.
3. It **closes the ratchet hole** as a side effect: once `tsc-baseline.mjs` is inside the arm, the 69-pin becomes enforceable at the arm boundary, which is what arm-next's README already claims happens.
4. The alternative leaves the ratchet hole exactly as it is: a protocol line that says "run it elsewhere" does not make any arm able to.

**Cost, measured:** 2 files, **6,224 B total** (`wc -c`: `golden.ts` 2,696 B · `tsc-baseline.mjs` 3,528 B), 0 new dependencies. `golden.ts` needs only `node`; `tsc-baseline.mjs` spawns `npx tsc`, which resolves from the **vendored contract's own `node_modules`** — I verified that path on arm-svelte (`typescript 6.0.3` present at `src/engine-contract/node_modules/typescript`).

**Caveat for whoever applies it:** two arms have **no typecheck script at all** (arm-solid, arm-lit: `dev`/`build`/`preview` only), so for those the ratchet is enforceable only by adding a script — an arm-code change, not a vendor change. Owner/Architect call on whether that is in scope.

**One limit on the claim "0 new dependencies", stated honestly:** only arm-svelte has an installed tree in my scratch run (`node_modules` present; the other eight arms are absent because I extracted bytes only). I did not run `npm ci` in eight toolchains to confirm the vendored contract's `typescript`/`@types/node` install there — that is INFERRED from `package.json` + `package-lock.json` being byte-identical across all nine arms (`cmp`, §1).

## 7 · Receipts, one place

```
ref: origin/council/ernie @ 3ae3a704 (vendor commit of the delivery: 85f45f91)
cwd: /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/wr7-goldens
env: node v26.13.0 · npm 11.20.0 · darwin
contract: npm ci 0/3pkgs · golden exit 0 · golden.json 0ccb6319…f3f5 (before == after)
arm+s tools (scratch): npm ci 0/3pkgs · golden exit 0 · golden.json 0ccb6319…f3f5 (before == after, twice)
                       tsc-baseline.mjs exit 0 "OK: 69 errors (pinned 69)"
arm typecheck unaffected: svelte-check 0/0 before and after · tsc -p tsconfig.node.json exit 0
build unaffected:         npm run build exit 0 · 68.79 kB JS · dist 100 K
contract-in-arm probe:    69 errors, per-file counts identical to the contract tree, 5/5 runs
tools add 0 errors:       grep -c "error TS" on tools/ lines → 0
files: contract 43 · arm 41 · delta = {tools/golden.ts, tools/tsc-baseline.mjs}
```

**VERDICT: closed as measured.** The goldens' home is `<arm>/src/engine-contract`; the patch is two files and three scripts; the finding that outranks the original WR is that the contract's 69-error ratchet is vendored into all nine arms and executed by none of them. Terminal state (BUILT/SUPERSEDED) is proposed with this evidence, not moved by me — Architect or MUSE (custodian) decides.

Labels: **VERIFIED** — every command and output in §1–§4 and §7. **INFERRED** — §5 first bullet (other eight arms). **UNKNOWN** — none. **Withdrawn by me** — §5 last bullet (my own earlier framing).

— ernie (advisor) · 2026-11-14T08:33Z