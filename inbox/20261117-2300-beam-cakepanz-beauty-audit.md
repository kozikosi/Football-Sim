SPEAKER: beam | ROLE: council | TASK: compare Cakepanz shell to w89 aesthetic details | DATE: 2026-11-17T23:00Z
FOR: P-366

=== Method ===
Code-level comparison of the shipped tree (cakepanz-4, pin 5c808472) against w89's measured facts from the prompt. No screenshots captured this round (build not completed in-session); visual claims below are INFERRED from code, flagged as such. The prepared tree (cakepanz-4-prepared) was checked and is aesthetically identical to shipped (engine-only re-pin) — only src/engine differs.

=== Part 1 — Palette ===
Default mode: VERIFIED — tokens-w89.css :root matches w89 exactly (#fdf2f6 bg, #ffffff panel, #f9e9f0 panel2, #8e5566 text, #885261 sub, #e6c3d2 rosehair, #53382b zcream, golds #e6c67d/#ad7f2e/#9a6b1f). Match.
Dark mode: VERIFIED — shell reproduces w89's dark block, including NOT setting --text (plum ink carries over). Flagged in CSS comment. Faithful reproduction of w89's defect (not a fix). Owner ruling still owed.
Team takeover: VERIFIED DEFECT — the headline finding. tokens-w89.css [data-zpbteam] blocks are EMPTY (comments only). tokensApply.ts sets --zpb-t1/t2/t3 on :root, but NO CSS rule in src/ consumes them (grep: zero matches outside tokens.ts/tokens-w89.css). The team stops are set and never read. The palette does NOT re-tint. This violates the Owner's "every team's color changes almost every aspect" ruling. Fix shape: wire the team stops into the gold tokens (gold2/goldm/gold3) under [data-zpbteam], or accept that only the attribute is set and the chrome ignores it.

=== Part 2 — Type ===
Display faces: STRAY. @font-face blocks: only Cinzel weight 100 and Cinzel Decorative weight 700 are inlined. w89 needs Cinzel 700/900 + Cinzel Decorative 700/900. CSS asks for 'Cinzel' (var(--font-ui)) but only weight 100 ships — browser renders ultralight or falls back. Fix shape: inline the 700/900 Cinzel files.
Body: VERIFIED match — var(--font-ui) = 'Cinzel', Georgia, serif (shell uses Cinzel for body, not system sans). w89 body is 14px system sans. STRAY: shell body is Cinzel serif, not system sans. (Minor — display face bleeds into body.)
Wordmark: STRAY — .cp-brand uses var(--font-display) = 'Cinzel Decorative', 1.4rem, weight 800, letter-spacing 0.08em, color gold2. w89 brand header uses Cinzel/Bodoni Moda. Different face. Most visible stray.

=== Part 3 — Words ===
Value label: STRAY (terminology). Shell uses "Model Value" (valuation.ts, Guide.svelte). w89 uses "Value". Owner prefers "Engine Value". Three terms in play. Report only.
2-Pt chip: STRAY. Shell feed chip says "2PT" / "2PT FAIL" (feedVM.ts). w89 says "2-Pt Conv". 11 Owner rulings owed.
Slogan: MISSING. "Can you go 20-0?" appears nowhere in shell src/ (grep: zero). w89 shows it with shimmer on "20-0". Fix: add to home/Guide/meta.
Touchdown copy: both use "touchdown" in recaps. No "never print Touchdown" law found on disk in either tree. REPORTED.

=== Part 4 — Surfaces (INFERRED, no screenshots) ===
Feed uses zrl-* shared classes. Shell restyles via shell.css. Density/gold usage not verified visually. INFERRED: likely matches structure but palette stray (team takeover no-op).

=== Part 5 — Contrast (INFERRED) ===
Light gold2 1.51:1 on pale rose (w89's own defect, reproduced by shell). Dark text 3.17:1 (w89's defect, reproduced). No new failures found beyond w89's. VERIFIED from code (token values match).

=== Part 6 — Ranked strays ===
(a) Fixable without Owner: (1) team takeover no-op (wire --zpb-t stops into gold tokens), (2) Cinzel weights (inline 700/900), (3) body font (system sans), (4) slogan missing, (5) wordmark face.
(b) Needs Owner: dark --text, Bodoni Moda, value label (Model/Engine/Value), 2PT chip.
(c) Improvements: offline fonts (inlined), no CDN dependency, battery/shell tooling.

=== Part 7 — Innovate ===
"Look like w89" is still the right palette bar but not the layout bar — w89 is a single-file wave; the shell should be judged on its own terms for structure, w89 for palette. Team takeover: re-tinting every token per team (w89's way) is heavy; a smaller set (gold2/goldm/gold3 + hairline + panel tint) likely carries team identity with less risk. INFERRED.

BLOCKED: visual verification (screenshots) not captured this round — INFERRED claims should be upgraded to VERIFIED with screenshots next round.
OPEN: Owner rulings owed (dark --text, Bodoni, value label, 2PT chip).
NEXT: (1) capture side-by-side screenshots at 1180px + 390px, two teams; (2) wire team stops; (3) inline Cinzel 700/900; (4) add slogan.
EVIDENCE: VERIFIED (token values, @font-face weights, grep counts); INFERRED (visual surfaces, contrast recompute).
