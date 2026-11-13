INTAKE: WR-1 · ERNIE · 2026-11-13T23:20Z

WR-1 · Arms 8 and 9 — the matrix has two holes (P1). Measured both. The nine-arm table can now be nine arms.
Every number below is mine unless labelled REPORTED. Environment: macOS (darwin, arm64), Node **v26.13.0**, npm **11.20.0**, Playwright **1.64.1**.

## Bytes (VERIFIED)

```
cwd:        /Users/kosi/Desktop/wt/ernie
command:    git rev-parse origin/council/inkling ; git ls-tree -r --name-only origin/council/inkling -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/
ref + sha:  origin/council/inkling @ 94c6f7e06b63e7f686dcfdd07501c2023b2b2fed  ("Refresh START-HERE.md from council/muse (step 0)")
output:     23 paths; arm-solid/ and arm-lit/ each with package.json, package-lock.json, tsconfig.json, vite.config.ts, index.html, src/
```

Extraction (archive beats tree — no checkout was made):

```
command:    git archive origin/council/inkling -- _agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/{arm-solid,arm-lit,CHECKSUMS.txt,DELIVERY.md} | tar -x -C /var/folders/.../kilo/wr1-ernie
            (exit 0)
```

**Manifest check.** `CHECKSUMS.txt` lists 110 files. Re-computed every entry with a Python verifier (macOS `shasum -c` mis-parses this manifest's separator and reports all 110 as unreadable — a tool artefact, not a delivery defect; the manifest is a working one):

```
listed=110  OK=106  MISMATCH=1  MISSING=3
missing:   MAINTAINER-INSPECTOR.md, PLAYWRIGHT-RESULTS.md, PLAYWRIGHT-V3-2026-11-14.md   (not in my extraction paths — my omission)
mismatch:  CHECKSUMS.txt   (self-referential: its own entry is sha256 e3b0c442…b855 = the empty string)
```

So: **all 106 present arm bytes verify**. The one mismatch is the manifest hashing itself before it was written. Small finding, filed because §1.5 says file small findings: a manifest that lists itself with the empty-string hash can never verify, on any machine, for any seat.

## Receipt — arm-solid (VERIFIED)

```
INTAKE: WR-1 · ERNIE · 2026-11-13T23:20Z
arm-solid
  cwd:        /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/wr1-ernie/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-solid
  bytes ref:  origin/council/inkling @ 94c6f7e06b63e7f686dcfdd07501c2023b2b2fed
  env:        node v26.13.0 · npm 11.20.0 · darwin arm64
  install:    npm ci --no-audit --no-fund → exit 0, 76 packages, 1.0 s (4 top-level: solid-js 1.9.19, vite 8.3.8, vite-plugin-solid 2.11.16, typescript 6.0.3)
  build:      npm run build → exit 0, 43,464 B JS + 4,104 B CSS, dist 68 KB / 4 files, 341 ms (vite v8.3.8, 25 modules)
  typecheck:  NONE shipped (no typecheck script). `npx tsc --noEmit -p tsconfig.json` → exit 1, **143 errors**, of which 139 are inside the vendored engine-contract (72× TS5097 .ts-extension, 29× TS2532, 13× TS2345, 10× TS18048, 9× TS2322, 7× TS2538) and 4 are arm-owned (TS5097 ×2, TS2882 side-effect css import, TS2322 FormArrow|null)
  contract check: `npx tsc --noEmit -p src/engine-contract/tsconfig.json` → 1 error, TS2688 "Cannot find type definition file for 'node'" (@types/node not installed in the arm)
  spec:       BASE_URL=http://localhost:4331 npx playwright test offensive-focus.spec.ts → **5/5 passed, 1.9 s** (spec with the one-token fix)
  render:     `#app` children = 1 · testids 69 · rows 32 · focus buttons at rest 0 · 390 px overflow 0
  file://:    BLOCKED — `Access to CSS stylesheet at 'file:///assets/index-CsUDhMuy.css' from origin 'null' has been blocked by CORS policy`; same for the script (net::ERR_FAILED); #app children 0, 0 testids
  leakage:    0 — `diff -rq` against the canonical contract src = 0 lines; contract tree sha256 265ea8c6c509200b…fe5988 (identical to the ledger's figure)
  drift:      n/a this run (no modification applied)
  LOC:        code 523 / 3 f (index.tsx, lib/state.ts, app.css) · all-src 523 / 3 f
  note:       Builds and passes clean. Typecheck is the one column where this arm cannot be compared as shipped: its tsconfig has no `allowImportingTsExtensions` and `include: ["src"]` pulls in the vendored contract, which imports with `.ts` extensions.
```

## Receipt — arm-lit (VERIFIED)

```
INTAKE: WR-1 · ERNIE · 2026-11-13T23:20Z
arm-lit
  cwd:        /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/wr1-ernie/_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-lit
  bytes ref:  origin/council/inkling @ 94c6f7e06b63e7f686dcfdd07501c2023b2b2fed
  env:        node v26.13.0 · npm 11.20.0 · darwin arm64
  install:    npm ci --no-audit --no-fund → exit 0, 0.8 s (4 top-level: lit 3.3.3, vite 8.3.8, typescript 6.0.3)
  build:      npm run build → exit 0, 44,145 B JS + 4,270 B CSS, dist 68 KB / 4 files, 281 ms (vite v8.3.8, 30 modules)
  typecheck:  NONE shipped. `npx tsc --noEmit -p tsconfig.json` → exit 1, same defect class: TS5097 (.ts extensions) against the vendored contract; `experimentalDecorators` is on, `allowImportingTsExtensions` is not
  spec:       BASE_URL=http://localhost:4332 npx playwright test offensive-focus.spec.ts → **5/5 passed, 2.0 s**
  render:     container is **`<framework-arm>`**, not `#app` — `#app` children = -1 (absent). testids 69 · rows 32 · focus buttons at rest 0 · 390 px overflow 0 · console errors 0
  file://:    BLOCKED — `Access to CSS stylesheet at 'file:///assets/index-CpJQ-Faf.css' from origin 'null' … CORS`; script likewise; 0 testids
  leakage:    0 — diff -rq 0 lines; contract tree sha256 265ea8c6c509200b…fe5988 (identical)
  drift:      n/a this run
  LOC:        code 499 / 3 f (app-element.ts, lib/state.ts, app.css, main.ts = 4 f incl. main.ts)
  note:       Lit is the one arm whose root container is not `#app`. Every render assertion written as `#app.children.length` reports -1 (absent) rather than 0 (empty) — a pass/fail script that only checks `> 0` is fine, one that distinguishes "empty" from "absent" is not.
```

## The two lines WR-1 asked for

**Does the picker read `FOCUSES` live, or is anything hard-coded?** — **Live, in both arms** (VERIFIED, read from the extracted bytes):

- arm-solid `src/lib/state.ts:15` → `export const FOCUS_LIST = FOCUSES;` and `src/index.tsx:29` → `<For each={FOCUS_LIST}>{(f) => …  data-testid={`focus-${f.id}`} … <strong>{f.label}</strong><span>{f.blurb}</span>` — label and blurb both come from the data, nothing spelled out in the template.
- arm-lit `src/app-element.ts:6` imports `FOCUS_LIST`, `:30` → `${FOCUS_LIST.map((f) => html\`… data-testid="focus-${f.id}" …\`)}`.

So adding a sixth focus to `fixtures.ts` needs **zero arm-owned edits** on these two arms, same as the seven already measured. That is the honest answer to WR-3's premise for these two arms: they do not push back on a data-only row.

## Two protocol findings (small, filed under §1.5)

1. **The `#app children` field does not generalise.** 8 of 9 arms mount into `#app`; arm-lit mounts `<framework-arm>`. The §2 receipt shape should say "root container children (name the container)". Otherwise a future seat records `-1` and a reader thinks the arm rendered nothing.
2. **Typecheck is not a comparable column as currently run.** Each arm ships its own tsconfig, and they disagree about the vendored contract: arm-sveltekit and arm-next set `allowImportingTsExtensions: true`; arm-next additionally sets `strict: false` with the comment that the contract carries 69 pre-existing strict errors; arm-solid and arm-lit set neither, so a plain `tsc` reports 143 errors that are contract-wide configuration noise, not arm quality. Recommendation for the digest: report typecheck as *"as configured by the arm"* and never as a cross-arm score, or run the contract's own tsconfig (which needs `@types/node` — the WR-7 gap) as the single standard.

## Corrections to my own record (append, not overwrite)

- My ledger's cross-arm line "73 testids / 32 rows / 5 focus buttons — identical (shared fixture)" was measured **after the manage picker is opened**. At rest all three arms I measured are **69 testids / 32 rows / 37 non-row / 0 focus buttons** — arm-svelte (control, re-built and re-probed this session at `origin/council/beam` @ `16cf4629`), arm-solid and arm-lit are **identical**. 69 + 5 focus cards = 74, so even the earlier figure was one off; I do not know which extra testid produced 73 and I am not going to guess. **The conformance claim holds; the number in the ledger does not.**
- Control provenance note: `origin/council/beam` moved from `04cefbf5` to `16cf4629` during this session (someone pushed). I verified the spec is byte-identical across both: sha256 `98ab38e8…a2b6` at `04cefbf5`, at `16cf4629`, and in my harness copy.

## What this changes in the record

- The nine-arm table is now **nine measured arms**: 9/9 built, 9/9 render, 9/9 interactive on http, **9/9 blocked on `file://`**, and 8/9 at 5/5 on the acceptance spec (arm-solidstart 0/5, previously measured by two seats).
- The two new arms change **no ranking input**: they add two more arms at the same place as arm-svelte on every column I can measure — build ~0.3 s, ~44 kB JS, 0 leakage, 5/5, offline blocked.
- Both new arms carry the **identical 41-file contract** (tree sha `265ea8c6…fe5988`), so the cross-arm fixture identity claim now covers 9/9, not 7/9.

## VERDICT

WR-1 **done**. arm-solid and arm-lit are measured, both 5/5, both offline-blocked, both contract-identical, both reading `FOCUSES` live. Two protocol defects found and filed (container name; typecheck comparability), plus one manifest self-hash defect.

Labels: arm receipts **VERIFIED** (commands and output above). "The arms read FOCUSES live" **VERIFIED** by reading the extracted bytes. The 73-vs-69 figure **CORRECTED** (mine). Nothing here is a ranking and nothing here ranks the arms.

*Filed by ERNIE (advisor) · 2026-11-13T23:20Z · scratch: `/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/wr1-ernie` (re-extractable from `origin/council/inkling` @ `94c6f7e0`).*