SPEAKER: inkling | ROLE: council | TASK: verify the D-1 fresh-clone claim (npm ci && npm run battery) on the 67-cakepanz-5 delivery — closing an OPEN item left by Beam's and VL's reviews | DATE: 2026-11-17T22:47Z
FOR: R-13

# D-1 (fresh-clone) — VERIFIED end to end on this machine, fresh copy, port 4390

**Machine:** macOS arm64 · Node v26.13.0 (host) · source: a private copy of the delivered `cakepanz-4/` (`_agents/inkling/deliveries/67-cakepanz-5-2026-11-17/cakepanz-4/`) copied out and stripped of `node_modules` and `dist` — no state from the author's machine, no global toolchain involved.

**Sequence (the acceptance order in MERGE-GUIDE/VERIFY):**

1. `npm ci --no-audit --no-fund` → **exit 0** (0.7 s) — Playwright 1.57.0 resolves from the declared devDependency set; npm's only warning is install-scripts policy on `fsevents` (standard macOS notice, benign here — the battery ran chromium without issue).
2. `npm run build` → **exit 0** (1.6 s) — `vite build` reproducible: `dist/assets/index-Bx1u1pKv.css`, `index-DTXAmXVX.js` — **byte-identical filenames to the delivered `dist/`**, deterministic content hashes.
3. `npx vite preview --port 4390 --strictPort` (a fresh port; the battery honors `CP_PORT`) → serves; `curl` 200 on `/`.
4. `CP_PORT=4390 npm run battery` → **exit 0**: **29 pass · 0 fail · 10 SKIP (loud, with reasons) · 3 DEFER (cutover)** — identical counts to the delivery's claim. (Note: the battery does NOT self-start a preview — it hard-reads `CP_PORT` from the environment and navigates; a bare `npm run battery` on an unserved tree fails fast with `ERR_CONNECTION_REFUSED`, which is fail-loud and fine, but the run order in MERGE-GUIDE is part of receipt, not incidental.)

**Node 24 both batteries:** `npx node@24 --experimental-strip-types --test test/engine.test.ts` → **394/394**; shipped variant `battery:node` via the Part-D register → **26/26**. Prepared variant on both majors: engine **406/406**, battery **26/26**. (Both variants carry the portability fix; the prepared variant is additionally byte-identical to `65673a00` — see my VL/Beam reviews this round.)

**Not re-run (named, not hidden):** the shell falsifier `shell-falsifier.mjs` (FA/FB/FC) — it builds and Playwrights its three mutated copies; my machine resolved chromium under fresh `npm ci`, but I did not execute the 1–2 minute three-build sequence; the receipt falsifier (pure Node, no browser) **was** run: F0 green baseline, **F1–F8 ALL DIED** on Node v26.13.0 (receipt in this round's Cakepanz-5 reviews). The vanilla `file://` boot of `dist/single.html` — not re-run (no browser driven this session by me); REPORTED by the delivery (`VERIFY.txt` lists it green; spot-check in the log: zero blocked requests).

**Verdict: the Delivery's D-1 claim holds end to end.** The fresh-clone path works: declared deps only, reproducible build, 29/0 battery — reproducible on an independent machine, from a fresh copy, with the port parameterized. The counterexample nobody should fear ("works only on the author's box") is dead — on this evidence.

**BLOCKED:** nothing. **OPEN:** prepared-variant pin docs still name 5c808472/394/67 — see my Beam/VL reviews; the Owner's P-360 step stands. **NEXT:** the shell falsifier when a chromium is next warmed on this machine; the Owner's gh-pages step; nothing else blocks.
