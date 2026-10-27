# mathlab — measures and fits the REAL engine; never writes a product file
Needs Node + Playwright (`NODE_PATH=$(npm root -g)`), and a product-like HTML (Z-post-blue wave 13, Pre-Colors, or later V23). Engine edits are made **in memory inside headless Chromium**; the HTML on disk is never modified.
| File | What it does |
|---|---|
| `design.json` | the target position-value table (QB 1000, tens) = the specification |
| `cfg.json` | fit settings: targets in wins (weight x 0.00254), new-term constants, DIME share, MC knobs allowed to move |
| `fitlm.js` | Levenberg-Marquardt fit of composition weights + MC knobs to the table; writes `results/fit-*.json` |
| `check-design.mjs` | tests E1/E2: derived integers equal the table, no inversions, all end in 0 |
| `after.js` | installs a fit in memory; prints the table, pass/run split, full-lineup realism |
| `realcheck.js` | 32 real rosters vs 2025 wins (`wins2025.json`), before/after |
| `flex.json` `flexparse.mjs` `flexcheck.mjs` `flexengine.js` | the Owner's flex guide as data; re-parse from his text; sanity; compile into the engine's table and test with the engine's own `flexPenaltyFor` |
| `emit-patch.mjs` | prints the exact literals for the build from a fit result |
| `inpage.js` | `installDime` (the 29th slot and its situational coverage term) |
| `lab.js` | table / split / stack measurements |
Typical run: `node fitlm.js <html> cfg.json --out results/fit.json && node check-design.mjs results/fit.json && node realcheck.js <html> results/fit.json wins2025.json cfg.json`.
A test you add must fail when the thing it guards is broken: corrupt one input and watch it fail (ENGINE-MATH-SPEC section 7, E8).
