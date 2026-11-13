# Framework-test judgment packet (the standing order Part 3 outputs, shipped for the council)

**Author:** Z.ai · 2026-11-13 · **Status:** input for the council's judgment half — never a verdict. Three parts, as scoped.

## (i) The arms decision packet (written as input)

- **Seven arms as built vs the frozen four-design:** the original design named four candidate designs; the Owner's ratifications expanded the candidate set (nine total — my seven + INKLING's `arm-solid` + `arm-lit`). The measured table lives in `fwtest-7/results/FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md` §2; the design's scoring weights (correctness gate 20% pass/fail · second-round modification 20% · agent quality 15% · integration 10% · maintainability 10% · UI 10% · server-ready 10% · tooling 5%) are the council's instrument, not mine.
- **The incumbent double-use (named, as ordered):** the **Svelte+Vite arm is the reference implementation of the offensive-focus feature on the product's own stack** — if the verdict is "stay", the arm is the seed of the real feature (D.1's prototype), not a throwaway. This materially lowers Svelte+Vite's switching cost relative to every other arm and the council should weigh it explicitly.
- **The D3 call:** RESOLVED — `arm-nuxt` exists; round 1's "Vue via Vite, not Nuxt" is superseded. The Vue family is now measured on both shapes (plain Vite 3.5.45: 206 LOC/56 pkgs vs Nuxt 4.6.4: 217 LOC/508 pkgs — the meta-framework cost signature is visible in one table).
- **Expected direction of judgment-half scoring per GPT's weights (input, not prediction):** the arms that carry a real type-check gate (react/vue/sveltekit/svelte-repaired/next/nuxt) score mechanically better on "tooling" and "maintainability" columns than the transpile-only arm (solidstart); the meta-framework arms pay in install weight and audit surface on "tooling" but demonstrate static-export capability on "server-ready"; the correctness gate (20%) is pass/fail on all seven — the Playwright spec is the instrument and is SHIPPED NOT EXECUTED (D2). Fresh-session protocol (D1) remains unrestored — the single-author confound is the council's to weigh.
- **The single-author confound, flagged loudly (as ordered):** round 1 and this round-2 reflow were authored by me alone for my seven arms. INKLING's `arm-solid`/`arm-lit` from a different model restores PARTIAL symmetry when merged (two authors across nine arms), not full (seven-vs-two). A formal re-run with per-arm independent authors is the Owner's call; the protocol ships ready.

## (ii) The executed-evidence instrument (command lines per arm)

One spec, all arms: `fwtest-7/playwright/offensive-focus.spec.ts`. Per-arm: build → preview → run. Full table with ports, drop-in config and the red-result interpretation (contract violation vs arm-specific defect) lives in `fwtest-7/playwright/PLAYWRIGHT-COMMANDS.md`. One command per arm:

```
npx playwright test   # from each arm root, with the arm's playwright.config.ts dropped in
# arm-solidstart serves :3000; all others :4173 (arm-next: serve out/, arm-nuxt: serve .output/public)
```

A red result means one of two NAMED things: (a) **contract violation** (the arm shows a number the contract did not produce) — red on never-Wins/board-value assertions; (b) **arm-specific defect** (selector drift, state bug, hydration mismatch) — red on click/visibility assertions with board values correct. The spec distinguishes them by which assertion fails.

## (iii) The round-2 hash protocol (for a formal re-run, if the Owner orders one)

- **This wave's manifests (shipped):** `fwtest-7/round2/manifests/before-*.sha256` + `after-*.sha256` ×7 — arm-owned files only (vendored contract excluded, build dirs excluded), computed on bytes, diff verdict ZERO drift ×7 in `reflow-report.json`. The script that produces them ships (`scripts/round2_reflow.py` in the delivery's scripts folder): it is the formal re-run instrument.
- **The sixth synthetic focus:** does NOT exist; the standing order forbids creating one unless directed. If the Owner orders the formal re-run, the protocol is: order the sixth focus → I edit ONLY the contract (FOCUSES + goldens, version bump) → resync via the script → rebuild all arms → manifests before/after → zero arm-owned edits expected, INKLING re-audits. **The single-author confound is loud on this protocol too** — the discriminating power of the data-driven check in a single-author run is what round 1 already declared; independent authors per arm is the Owner's lever to pull if he wants the strong version.
- **What a formal re-run adds beyond this wave's reflow:** a NEW canonical change (the sixth focus) exercises the resync with an actual contract delta, rather than re-proving byte-stability of an already-shipped resync. Both are legitimate evidence; only the first is a round-2 in the round-1 sense.
