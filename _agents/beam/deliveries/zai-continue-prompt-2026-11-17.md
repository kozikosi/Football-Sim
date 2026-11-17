# Council prompt to Z.ai — 67 Cakepanz sitting 6 (beauty fixes + portability + re-pin prep + defect close-out)
# For: Z.ai (shell builder). From: Beam (council). Date: 2026-11-17.
# Authority: Owner beauty ruling (2026-11-15) "light and dark should both look like w89 — every team's color changes almost every aspect of the color palette"; council findings below.
# Base: Cakepanz-5 delivery on council/beam (pushed ae8f16de-era, 684 files). Engine pin stays 5c808472 shipped; prepared re-pin to 65673a00 stays NOT activated.

## Part 0 — Read first
- w89 is the reference: Football-Sim-Z-post-blue-w89.html on origin/gh-pages (1,920,191 bytes). index.html there IS w89.
- Shipped tree under review: _agents/beam/deliveries/67-cakepanz-5-2026-11-17/cakepanz-4 (pin 5c808472).
- Prepared tree: cakepanz-4-prepared (pin 65673a00, NOT activated). Aesthetic files identical between the two — only src/engine differs. Do not change aesthetics in prepared without changing shipped.
- Council beauty audit (Beam, 2026-11-17): team takeover is a no-op, Cinzel only weight 100 inlined, slogan missing, body uses Cinzel not system sans, "Model Value" vs w89's "Value", 2PT vs "2-Pt Conv".

## Part 1 — The team takeover (the headline, Owner ruling)
The Owner's rule: every team's color changes almost every aspect of the palette. Currently:
- tokensApply.ts sets --zpb-t1/t2/t3 on :root (works).
- tokens-w89.css [data-zpbteam] blocks are EMPTY (comments only).
- No CSS rule in src/ reads --zpb-t1/t2/t3 (grep: zero hits outside tokens.ts/tokens-w89.css).
Result: the team stops are set and never consumed. The palette does not re-tint. This is the single biggest stray.

Fix: wire the team stops into the gold tokens and hairlines under [data-zpbteam]. Minimum: gold2/goldm/gold3 + rosehair re-map to the team stops in light and dark. Keep --zcream NEVER tinted (Owner law). Prove with two teams' screenshots (one light-palette, one dark-palette) showing re-tint. Do not invent new tokens; reuse --zpb-t1/t2/t3.

## Part 2 — Type: inline the missing Cinzel weights
Currently only Cinzel weight 100 and Cinzel Decorative 700 are inlined. w89 needs Cinzel 700/900 and Cinzel Decorative 700/900. The CSS asks for 'Cinzel' but only 100 ships, so the browser renders ultralight or falls back.
Fix: inline Cinzel 700 and 900 (woff2, base64) alongside the existing 100. Keep the offline-first improvement (no CDN). Verify the rendered weight matches w89's 700/900 headers.

## Part 3 — Body font: system sans, not Cinzel
w89 body copy is 14px system sans (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif). Shell body is var(--font-ui) = Cinzel. Fix: set body font-family to the system sans stack. Keep --font-display for headers only.

## Part 4 — Wordmark
w89 brand header uses Cinzel/Bodoni Moda. Shell .cp-brand uses 'Cinzel Decorative' 1.4rem weight 800. Align to w89: use 'Cinzel' weight 900 (or Bodoni Moda if approved — Owner ruling still owed; default out). Letter-spacing 0.08em, color gold2. Name it first in the verdict if it still differs.

## Part 5 — Words
5a. Value label: shell says "Model Value" (valuation.ts, Guide.svelte). w89 says "Value". Owner prefers "Engine Value". Report all three terms and where each lives; do not rule — the Owner decides. But make the label a single constant so one change flips it everywhere.
5b. 2-Pt chip: shell says "2PT"/"2PT FAIL" (feedVM.ts). w89 says "2-Pt Conv". Report both; Owner ruling owed.
5c. Slogan: "Can you go 20-0?" with gold shimmer on "20-0" is MISSING entirely from the shell. Add it to home, Guide, meta description, and title. w89: <p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b>.
5d. Touchdown copy: both use "touchdown" in recaps. No "never print Touchdown" law on disk in either tree. Report, don't invent.

## Part 6 — Portability (verified, keep as-is)
- precompile-engine.mjs generates src/engine-node/ (68 files, 1 transformed). Gitignored. VERIFIED working on Node 24 and 26 (26/26 node battery, 406/406 engine). Keep.
- F2/F3 falsifiers: re-derive with corrected target strings (mutation targets moved since Cakepanz-3). Run both Node 24 (die loudly) and Node >=26 (named error, never TAUTOLOGY). Report.

## Part 7 — Re-pin prepared (not activated)
Keep the five prepared paths as-is (snapshot, flex, carried expectations, packs, default-off proof). Verify against tip 65673a00. Do not activate. Confirm shipped tree still names 5c808472.

## Part 8 — Defect fixes (D-1/D-2/D-3, M1/M2)
- D-1: fresh-clone run (npm ci && npm run battery exits 0, Playwright resolved, no fallback to author's machine path). Reproduce.
- D-2: falsifier on Node 24 (all three cases die) AND Node >=26 (fails loudly, named error). Run both.
- D-3: corrected counts (README 29 pass, manifest 305). Grep for stale counts.
- M1: current-era pack hash named with invocation in VERIFY §1.
- M2: old pin's override-variant hashes left honestly UNKNOWN.

## Part 9 — Filing
One file per seat per item, inbox/<UTC>-<seat>-<slug>.md, FOR: P-366 (beauty) / R-13 (shell). Label VERIFIED/REPORTED/INFERRED/UNKNOWN. End with BLOCKED/OPEN/NEXT. Push to your own branch only.

## Part 10 — Do NOT
Do not edit the engine snapshot. Do not re-pin anything yourself. Do not decide the shell of record, palette, labels, cutover, or pin. Do not touch the product file.
