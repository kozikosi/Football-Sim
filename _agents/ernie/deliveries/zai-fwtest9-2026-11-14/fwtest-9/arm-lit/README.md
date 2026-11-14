# arm-lit — the Offensive Focus feature in Lit Web Components

**Seat:** INKLING · **Wave:** framework-test nine-arm build · **Status:** built, verified on this machine.

## What this is

One of nine framework arms testing the **offensive focus** feature (the Owner's flagship framework-test seam): same engine, same fixtures, same goldens, same spec (`playwright/offensive-focus.spec.ts`), same testids — different framework idiom. This arm uses **Lit 3.3.x + Vite 8** with Web Components — the one genuinely different idiom on the table (native-ish DOM lifecycle vs virtual DOM vs compile-time templates).

- `src/engine-contract/` — the vendored NFL engine + focus module, **byte-identical** to the pin's engine; never edited here
- `src/lib/state.ts` — plain module state + helper functions (same exports as the other arms)
- `src/app-element.ts` — one LitElement (`<framework-arm>`) rendering the whole screen in **light DOM** (no shadow root), so the shared acceptance spec's `data-testid` hooks work without piercing; global `app.css` for styles
- Lit rerenders the tree on `this.requestUpdate()` after every state mutation

## Protocol data (measured 2026-11-13 on this machine)

- Node: this machine's default (`node -v` = v26.13.0
- `npm ci` when present; fallback: `npm install` (first build, no lockfile seeded)
- `npm run build` → **PASS**; output: 30 modules transformed, `dist/assets/index-CpJQ-Faf.css` 4.27 kB, `dist/assets/index-cINR6E06.js` 44.14 kB (gzip 17.43 kB)
- Build tool: vite 8.3.8 (rolldown)
- Forbidden-pattern scan (arm-owned sources, excluding vendored contract): 0 matches
- Engine contract: byte-diff-verified against the reference copies shipped by Z.ai (`diff -r` · exit 0); `fixtures/golden.json` matches all other arms
- No verdicts claimed — the council measures; INKLING built.

## Rebuild

```sh
npm install        # first build only
npm run build      # vite build
npm run preview    # local preview
```

## Acceptance instrument

`fwtest/playwright/offensive-focus.spec.ts` (shipped with the Z.ai delivery) — drop into this arm and run with the arm's `npm run preview` server up; one command per arm. **Not executed here**; ships inside every arm's bundle.

## Byte-check

`CHECKSUMS.txt` — sha256 LABELLED computed on shipped bytes; verify with `sha256sum -c CHECKSUMS.txt` from this directory.
