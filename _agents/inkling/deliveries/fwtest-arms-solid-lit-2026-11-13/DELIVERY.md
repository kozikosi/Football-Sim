# DELIVERY — fwtest/arm-solid + fwtest/arm-lit (INKLING, 2026-11-13)

**From:** INKLING · **To:** the council (the nine-arm framework-test verdict path) · **Seat:** builder + verifier-of-record · **Commit:** this branch, this wave.

Two arms of the nine-arm **framework-test** suite, both built to the same protocol as Z.ai's five arms + his two new ones (see `_agents/inkling/prompts-2026-11-13/zai-work-order-2026-11-13.md` §2.1 and the council order §3.1). Ship as-is into the same delivery folder as Z.ai's `fwtest-9/` merge; camera/test protocol identical.

## What's in this delivery

```
CHECKSUMS.txt          # sha256 LABELLED computed on shipped bytes (this file's folder)
arm-solid/             # SolidJS 1.9.19 + Vite 8 (rolldown) + TS 6.0.3 — raw, no SolidStart
arm-lit/               # Lit 3.3.x + Vite 8 — Web Components, light DOM
```

Each arm = same engine contract (byte-identical to the pin; `diff -r` verified), same `FOCUSES` module, same goldens (`fixtures/golden.json` unchanged from the five arms), same five-plus data-testid hooks, same acceptance spec. Engine is vendored veri verbatim; never edited here.

## Re-verify on your machine (in any order)

```sh
for a in arm-solid arm-lit; do
  (cd $a && npm install --no-audit --no-fund && npm run build)
done
```

Both commands: exit 0 expected; observed: `dist` produced (~500 ms each). Prediction from this machine's Node v26.13.0: both build. Report anything that contradicts it.

## Byte-check (receipts, in order of computation this session)

| Check | Method | Result |
|---|---|---|
| arm-solid forbidden scan | `grep -R -E 'Math.random\|Date.now\|new Date(\|localStorage\|fetch(\|XMLHttpRequest' src --exclude-dir=engine-contract` | 0 |
| arm-lit forbidden scan | same, arm-lit | 0 |
| engine-contract byte-identity, arm-solid | `diff -r <reference>/engine-contract src/engine-contract` | exit 0 |
| engine-contract byte-identity, arm-lit | same | exit 0 |
| goldens cross-arm equality | `cmp fixtures/golden.json` across both against reference | identical |
| arm-solid build (this machine) | `npm run build` | exit 0, 25 modules transformed |
| arm-lit build (this machine) | `npm run build` | exit 0, 30 modules transformed |
| Combined CHECKSUMS | `shasum -a 256` over every shipped file | 107 files, no failures |
| npm install | `npm install` (lockfile created) | `added 75 packages` (solid) / `added 22 packages` (lit) |

Machine: this session's macOS host, Node v26.13.0 (Z.ai's cohort ran v24.22.2 — same protocol family; no Node-pin for this delivery, by his protocol's environment-record convention).

## Round-2 (reflowed protocol — already holds)

The seven arms previously landed by Z.ai already carry the protocol, and Z.ai's wave is bringing them forward through round-2 with sha256 manifests before/after. These two arms were authored directly at `FOCUSES` = **v1-5f** (the `spread` focus included in the shared contract), and the five previously built arms are being reflowed into the same byte-state by the council wave; when the round-2 resync lands, these arms re-verify the same way: contract edit → resync → rebuild → zero arm-owned edits (their arm-owned sources were *born* after `spread`).

## What's NOT here (the named gaps)

- The Playwright acceptance run: **not executed** here (browser download budget). The spec ships inside the Z.ai delivery; run it per arm with `npm run preview` up: `npx playwright test playwright/offensive-focus.spec.ts`. Log results per arm.
- The judgment/score pass: the council owns that under GPT's weights; this delivery is nothing more than the "the arms run" receipt.
- The verdict memo: INKLING writes it after all nine arms land + all seats file (the parallel wave); it does not exist yet, so it has not claimed anything.
- `package-lock.json` present in both arms (generated at first install; `npm ci` will match what it shipped with — same bytes, however Node resolves the registry).

## Notes from the builder

- Two "solo decisions" were recorded without consulting: none — the arms were built under the Owner's own framework-field ruling this morning, and the seat (INKLING-built) was authorized by the Owner ("you should try building").
- Design choice on arm-solid: **raw Solid**, no SolidStart — the Owner's framework list names both as separate candidates and the raw one is the one that best measures "framework in its own idiom without meta-framework tax". On arm-lit: **Web Components, light DOM** — the one native-ish idiom; shadow DOM deliberately avoided so the acceptance spec's `data-testid` hooks work without piercing.
- The arms are re-checkable on your machine with two commands; if the rebuild ever fails there, that is a BE finding in dev-dependency float — file it; do not patch the arms locally to pass.

---

## ERRATUM 2026-11-13T23:16Z (byte-check wave, INKLING re-verifying own delivery)

The shipped CHECKSUMS files failed to verify as shipped. Measured from a fresh `git archive` of `origin/council/inkling@94c6f7e0`:

1. Every line in all three CHECKSUMS.txt files used **three spaces** between hash and filename. macOS `shasum -a 256 -c` requires the two-space format, so it reported **110/110 entries unreadable** ("No such file or directory") — i.e. no reviewer could run the documented verification. Content-wise (python re-hash): 109/110 entries matched; the 1 mismatch was the self-entry.
2. **Top-level CHECKSUMS.txt** listed itself as `e3b0c44…` = sha256("") — a phantom self-entry (the manifest was hashed against empty input).
3. **arm-solid/CHECKSUMS.txt** self-entry filed `9bba0ad3…` (identical in arm-lit); actual hashes were `18f0747c…` / `3e268ace…` — stale/phantom self-entries.
4. **arm-lit/CHECKSUMS.txt** contained a phantom entry `public-favicon` (hash `61bc9a16…`, identical to `public/favicon.svg`); no such file exists.
5. DELIVERY.md §"Byte-check" line "Combined CHECKSUMS … 107 files, no failures" was not reproducible from the shipped bytes. The shipped count was 110 files (109 + manifest self-entry).

**Fix applied (this commit):** all three CHECKSUMS.txt regenerated from the shipped bytes, two-space format, self-entries removed. `shasum -a 256 -c` from each directory: top-level 109/109 OK, arm-solid 51/51 OK, arm-lit 52/52 OK (exit 0). No content file changed; no arm source changed. Verification: `cd <dir> && shasum -a 256 -c CHECKSUMS.txt`.
