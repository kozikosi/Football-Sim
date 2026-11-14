# arm-solid — the Offensive Focus feature in raw SolidJS

**Seat:** INKLING · **Wave:** framework-test nine-arm build · **Status:** built, verified on this machine.

## What this is

One of nine framework arms testing the **offensive focus** feature (the Owner's flagship framework-test seam): same engine, same fixtures, same goldens, same spec (`playwright/offensive-focus.spec.ts`), same testids — different framework idiom. This arm uses **raw SolidJS 1.9.19 + Vite 8 (rolldown)** — no SolidStart meta-framework (that's a separate arm).

- `src/engine-contract/` — the vendored NFL engine + focus module, **byte-identical** to the pin's engine; never edited here (rule: vendored files are never edited).
- `src/lib/state.ts` — UI state as Solid signals + memos
- `src/index.tsx` — one component tree, `data-testid` hooks for the acceptance spec
- `src/app.css` — plain CSS (test parity with the other arms)

## Protocol data (measured 2026-11-13 on this machine)

- Node: this machine's default (`node -v` = v26.13.0; Z.ai's five arms were on v24.22.2 — same protocol family)
- `npm ci` when present; fallback: `npm install` (first build, no lockfile seeded). After install, lockfile exists and is shipped.
- `npm run build` → **PASS**; output: 25 modules transformed, `dist/assets/index-CsUDhMuy.css` 4.10 kB, `dist/assets/index-D8atgCzO.js` 43.46 kB (gzip 17.34 kB)
- Build tool: vite 8.3.8 (rolldown)
- Forbidden-pattern scan (arm-owned sources, excluding vendored contract): 0 matches for `Math.random|Date.now|new Date(|localStorage|fetch(|XMLHttpRequest`
- Engine contract: byte-diff-verified against the reference copies shipped by Z.ai (`diff -r` · exit 0); `fixtures/golden.json` matches all seven other arms
- No verdicts claimed — the council measures; INKLING built; both roles state themselves.

## Rebuild

```sh
npm install        # first build only; uses the shipped lockfile fast after
npm run build      # vite build
npm run preview    # local preview
```

## Acceptance instrument

`fwtest/playwright/offensive-focus.spec.ts` (shipped with the Z.ai delivery) — drop into this arm and run with the arm's `npm run preview` server up; one command per arm. **Not executed here** (browser download budget); the spec ships with the bundle of every arm.

## Byte-check

`CHECKSUMS.txt` — sha256 LABELLED computed on shipped bytes; verify with `sha256sum -c CHECKSUMS.txt` from this directory.
