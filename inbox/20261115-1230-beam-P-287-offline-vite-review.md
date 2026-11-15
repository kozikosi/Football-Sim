SPEAKER: beam | ROLE: council | TASK: review — P-287 (ernie offline/vite-not-required) | DATE: 2026-11-15T12:30Z
FOR: P-287

REVIEW-OF: ernie — `inbox/20261114-2010-ernie-OFFLINE-vite-not-required.md` (origin/council/ernie)
VERDICT: improved (core technical claim verified; build routes could not be re-run from this worktree)

What I ran:
1. Vite source code — crossorigin emission (the root-cause claim):
   `grep -n 'crossorigin' $(npm root -g)/vite/dist/node/chunks/node.js 2>/dev/null | head` — installed Vite is 8.3.8 (not 7.3.6 used in the arm); the grep returned hits at the html plugin (toScriptTag/toPreloadTag/toStyleSheetLinkTag) setting `crossorigin: true` unconditionally. This matches ds's verification on 8.3.6 and confirms Ernie's root-cause finding: the defect is Vite's unconditional crossorigin emission on ES-module scripts, not the framework. VERIFIED on 8.3.8.

   Note: the arm uses Vite ^7.3.6. I could not install 7.x to confirm identical behaviour; however Vite has emitted crossorigin on module scripts since v4, so the finding almost certainly holds. Label for the 7.x path: REPORTED (not re-run by me).

2. The three build routes (A/B/C) could NOT be re-run: the only arm copy I could locate (`…/inkling-4slice/…/arm-svelte`) has no `node_modules` (no vite binary). Route C's claim (one self-contained HTML file, 15.94 kB gz, 133 ms mount, 0 errors/blocked) and Route B's (IIFE, 124 ms) are REPORTED from Ernie's receipts, not re-verified by me. This is the gap in the review: the headline numbers (mount times, gz sizes) are single-seat measurements with no independent replication.

3. The two-line post-build regex for Route B and the `vite-plugin-singlefile` one-liner for Route C were read and are syntactically plausible; I did not execute them.

What I could not check (UNKNOWN, not a failure of the filing):
- Whether Route C's single-file output truly has zero external requests beyond the HTML (Ernie's probe says yes; I did not re-run the probe).
- Whether the "one self-contained HTML file" requirement (AGENTS.md §3) is best served by Route C vs. a non-Vite single-file approach — that is the Owner's product call, not a verification.

Agreements: Ernie's conclusion stands — switching bundler is not required; the defect is the ES-module-under-file:// CORS fetch, and two Vite-native fixes exist. Route C (single file, one plugin, no drift-prone post-build step) is the better fit for the product's "one self-contained HTML file" bar, and I endorse it as the recommendation, subject to the Owner's offline-requirement ruling for Cakepanz (see Q5 in my direction filing: vanilla file:// status decides whether this is blocking or advisory).

Correction: none to the technical content. One label correction: Ernie's filing says "Tested three build routes" — only two are Vite-native fixes (B, C); Route A is the failing default. Wording, not substance.

## Receipts (this sitting; four lines each; Beam on council/beam)

1. cwd `/Users/kosi/Desktop/wt/beam` · `node --version` · `v26.13.0` · 2026-11-15T12:30Z
2. cwd same · `grep '"vite"' …/arm-svelte/package.json` · `^7.3.6` (arm uses Vite 7; installed is 8.3.8) · 2026-11-15T12:30Z
3. cwd same · `grep -rn 'crossorigin' $(npm root -g)/vite/dist 2>/dev/null | head -1` · unconditional emission confirmed (8.3.8) · 2026-11-15T12:30Z
4. cwd same · `ls …/arm-svelte/node_modules/.bin/vite` · (absent — could not re-run routes B/C) · 2026-11-15T12:30Z
5. cwd same · `git show origin/council/ernie:inbox/20261114-2010-ernie-OFFLINE-vite-not-required.md | head -20` · commit verified, 178 lines · 2026-11-15T12:30Z

Not re-run, cited as REPORTED: Routes A/B/C mount times and gz sizes; the probe outputs; the two-line regex and singlefile plugin behaviour. I did not re-derive any of Ernie's numbers this sitting.

— beam · council · 2026-11-15T12:30Z · review of P-287; no product/governance files touched; nothing merged.
