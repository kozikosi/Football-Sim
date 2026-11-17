# Council prompt — compare the Cakepanz shell to w89: where does the current shell stray from w89's aesthetic details?

You are the **council** — reviewers and measurers for **76 Pancakes**, a football draft simulator. The **Architect** (Claude) builds the engine. **Z.ai** builds the shell (the UI). You investigate, propose, test, and dissent in writing. You do not build the product. You do not decide Owner questions. This prompt is self-contained: you need only this prompt and the repo.

## The question

Z.ai's shell has now had five sittings (Cakepanz-1 through Cakepanz-5). The Owner's standing beauty rule is: **light and dark should both look like w89 — every team's color changes almost every aspect of the color palette** (Owner, 2026-11-15). The shell's token sheet says it was built "exactly to the live w89 layer." Your job: **test that claim. Open w89 and the shell side by side, look at the same screens, and list every place the shell strays from w89's aesthetic details** — with the w89 anchor and the shell anchor for each one, so the fix is a named change, not a vibe.

**Compare the SHIPPED tree** (`cakepanz-4`, engine pin `5c808472`) — that is what a user would open. If the prepared tree (`cakepanz-4-prepared`, engine pin `65673a00`, NOT activated) differs from it aesthetically, say so; it should not, the re-pin is engine-only, but check.

## The two trees (where to look)

**w89 — the reference.** The live wave on `origin/gh-pages`: `Football-Sim-Z-post-blue-w89.html` (1,920,191 bytes; `index.html` on that branch IS w89). One self-contained file. Open it in a browser; read its CSS and JS from the file itself.

**The shell — the thing under review.** The Cakepanz-5 delivery, hosted byte-identically on three branches: `origin/council/beam` at `_agents/beam/deliveries/67-cakepanz-5-2026-11-17/`, `origin/council/inkling` at `_agents/inkling/deliveries/67-cakepanz-5-2026-11-17/`, `origin/council/glyph` at `67-cakepanz-5-2026-11-17/` (top level). Inside it: `cakepanz-4/` (shipped) and `cakepanz-4-prepared/` (prepared re-pin). Build it with `npm ci && npm run build && npm run distfile` (Playwright is a declared devDependency; run `npx playwright install chromium` once for the browser), then serve `dist/` and open it. The shell's own aesthetic files: `src/lib/assets/tokens-w89.css` (the palette law, "Variant L"), `src/lib/assets/shell.css` (the chrome), `src/lib/bindings/tokensApply.ts` (the DOM half of the team remap), `src/lib/port/tokens.ts` (the pure half), `src/lib/assets/zpb-team-colors.json` (the 32-team palette), `src/App.svelte` (the brand header).

## w89's measured facts (the reference — all VERIFIED from the file; cite the anchor when you use one)

- **Default mode is pale-rose LIGHT, not dark.** Light root: background `#fdf2f6`, panel `#ffffff`, panel2 `#f9e9f0`, text `#8e5566`, sub `#885261`, rosehair `#e6c3d2`, zcream `#53382b`. Dark mode exists (via `prefers-color-scheme` and `[data-theme="dark"]`): background `#1e1119`, panel `#291a24`, panel2 `#35202d`, sub `#c99cae`, zcream `#f2e7d5`. Gold family, light: gold2 `#e6c67d`, goldm `#ad7f2e`, gold3 `#9a6b1f`; dark: gold2 `#e8c87e`, goldm `#c39a4a`, gold3 `#8a5f18`.
- **w89 has NO `--tc` variable.** Its team colour is a JavaScript map (`ZPB_TEAM_COLORS`, 32 teams × 3 stops) remapped by `[data-zpbteam]` selectors. w89's own comment: the remap "remaps every accent token to the user's franchise (JS computes accessible tones)."
- **Fonts are linked from Google Fonts** (this breaks the offline requirement — w89's own defect, not a feature): Cinzel 700/900, Cinzel Decorative 700/900, Bodoni Moda 500/600/700. The display stacks use Cinzel and Bodoni Moda (`'Cinzel','Bodoni Moda',Georgia,serif` and `'Bodoni Moda',Didot,"Bodoni MT","Playfair Display",Georgia,serif`); the **body copy is a system sans** (`-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif`, 14px).
- **The value column is called "Value"** (the pick-analysis header reads `<span>Value</span>`). w89 contains neither "Model Value" nor "Engine Value" anywhere.
- **Two-point conversions read "2-Pt Conv"** in the UI (11 occurrences). The string "2PT" appears twice in the file: once inside a base64 blob and once as a terse stat abbreviation in a player line (`${s.tpc} 2PT`, alongside `FR` and `TD`).
- **The slogan is a visible line**: `<p class="zpb-cygline"><span class="zpb-cygt">Can you go </span><b class="zpb-shine">20-0</b>…` — "Can you go 20-0?" with a gold shimmer on "20-0". The page meta description reads "Play the season. Coach your team to the Super Bowl. Can you go 20-0?"
- **The feed uses `zrl-*` classes** (90 occurrences in w89), including the "me" glow on the user's own lines.
- **Contrast, measured:** w89's own numbers are the ones the shell's contrast table reports — light gold2 1.51:1 on pale rose (1.65:1 on white), dark text 3.17:1 at AA normal. w89's dark block does NOT set `--text`, so the light plum ink (`#8e5566`) carries into dark mode. The Owner has NOT ruled on the one-line dark `--text` fix, and Bodoni Moda is unanswered (one seat's default: out). Do not treat an unruled item as decided either way — report what w89 does, what the shell does, and whether the difference needs the Owner's word.

## The shell's claimed state (what Z.ai says it built — test it, don't take it on trust)

- The token sheet (`tokens-w89.css`) says it is "Variant L (live-w89)", two-mode like w89, with the light and dark values above, no `--tc`, and the team colour via `zpb-team-colors.json` beside the sheet, applied by setting `data-zpbteam` plus three custom properties.
- **Cinzel + Cinzel Decorative are INLINED as base64 data URIs** (~54 KB fixed cost) — deliberately different from w89's Google-Fonts link, so the shell works offline. That is an intended improvement, not a stray; judge it on whether the inlined faces actually render the way w89's linked ones do.
- The brand header reads "76 Pancakes" (`src/App.svelte`); the Guide names the product the same way. The valuation label calls the measured default "Model Value" (`src/lib/valuation.ts`).

## Method — look, don't just grep

A grep finds strings; this round is about what the eye sees. For each part: **build the shell, open w89 and the shell side by side in the same browser, and screenshot the same screens** (light + dark, 1180px + 390px, at least two teams — pick one light-palette team and one dark-palette team, e.g. a team whose colors are near-black vs one whose are bright). Paste or describe what you see; a screenshot path in your filing beats a paragraph. Where a difference is in the code rather than on the screen (a token value, a font stack, a missing rule), cite file + line on both sides.

## Part 1 — The palette: default, dark, and the team takeover

1. **Default mode.** Open both in light mode. Is the shell's first screen the same pale rose (`#fdf2f6`), the same white panels, the same plum ink (`#8e5566`)? Name every surface that differs (background, panels, hairlines, sub-text) with the token on each side.
2. **Dark mode.** Same in dark. Does the shell's dark match w89's dark (plum `#1e1119`, panels `#291a24`/`#35202d`)? And the known w89 defect: w89's dark block never sets `--text`, so the light ink carries over — does the shell reproduce that, fix it, or do something third? Say which, with the token values. (Fixing it without a ruling would be overreach; reproducing it is fidelity — but report it either way, because the Owner's ruling is still owed.)
3. **The team takeover — the headline question.** Pick a team in w89 and watch the palette change. Pick the same team in the shell. **How much of the shell actually re-tints?** w89's rule is "every accent token" — the golds, the hairlines, the panels, the text accents. Trace the shell's mechanism end to end: the JSON stops → `teamRemap` → the custom properties → the stylesheet rules that consume them. Count what consumes the team stops and what does not. If the shell sets the team stops but no rule reads them, say so plainly — that is the finding, not a footnote. If it re-tints fully, prove it with two teams' screenshots. This is the part the Owner's palette ruling ("every team's color changes almost every aspect of the color palette") turns on.

## Part 2 — Type: the display faces, the body, the wordmark

1. **The display faces.** w89's headers use Cinzel (700/900) and Bodoni Moda (500/600/700), with Bodoni Moda as the primary face on the brand header and the view headings. What does the shell use for the same elements — family, weight, and which font files actually ship (read the `@font-face` blocks: family, weight, and whether the file is inlined)? If the shell inlines only one weight of Cinzel, say which weights the CSS asks for and what the browser actually renders.
2. **The body.** w89's body copy is a 14px system sans. What is the shell's body font, and does it read the same at 390px? If the shell sets the body in a display serif, say so — that is a stray no token table can hide.
3. **The wordmark.** w89's brand header and the shell's "76 Pancakes" header, side by side at the same size. Family, weight, color, letter-spacing. If they are different faces, that is the single most visible stray in the round — name it first in your verdict.

## Part 3 — Words: labels, chips, and the slogan

1. **The value label.** w89's column says "Value". The shell's board and Team Select say "Model Value". Confirm where each label appears in the shell (board, Team Select, Guide) and whether the shell's label is the only difference or part of a larger labelling system w89 doesn't have. (The Owner has ruled "Engine Value" must not appear to the user — it is not a live option for the label. The live choice is w89's "Value" vs the shell's "Model Value"; report where each appears.)
2. **The two-point chip.** w89's feed says "2-Pt Conv"; the shell's feed chip says "2PT" / "2PT FAIL". Confirm the exact strings on both sides and where each appears. This is one of the 11 Owner rulings still owed — your filing is the evidence for it, not the ruling.
3. **The slogan.** w89 shows "Can you go 20-0?" with the shimmer on "20-0". Does the shell show it anywhere — home, Guide, meta, title? If it is missing entirely, say so.
4. **"Touchdown" copy.** w89 prints "touchdown" in its recaps; the shell's engine recap strings do too. Confirm both sides and say whether the shell's copy matches w89's or adds its own wording. (The "never print Touchdown" law has no source on disk in either tree — report that, don't invent one.)

## Part 4 — The surfaces: feed, board, Team Select, review, saves

Walk the same flow in both: Draft Board → Team Select → a played week (feed + review) → the saves screen → a shareable brag card. For each surface: does it read as w89 — same density, same gold usage, same cream (`--zcream`, the never-recolored neutral), same "me" treatment? The feed's `zrl-*` classes are shared with w89 — check whether the shared classes actually render the same, or whether the shell restyled them. Name every surface that strays and every surface that matches; a surface that matches is a finding too, so the next round doesn't re-check it.

## Part 5 — Contrast: whose failures are these?

Recompute the contrast table for both trees (the shell ships `scripts/probe-contrast.mjs`; w89's numbers are in its own CSS). For each failing pair, say: is this w89's own defect faithfully reproduced (the shell matches w89 and both fail), or the shell's own (the shell fails where w89 passes, or passes where w89 fails)? The light-gold2 and dark-text failures are already on the record as measured — confirm them fresh, don't cite them from memory, and add any pair the table missed.

## Part 6 — The verdict: a ranked list of strays

End with a numbered list, most visible first. Each entry: **what strays, the w89 anchor (file + line or selector), the shell anchor (file + line), and the fix shape in one line** (e.g. "inline the 700/900 Cinzel files", "wire the team stops into the gold tokens", "rename the chip"). Separate the list into (a) strays the shell can fix without any Owner decision, (b) strays that need the Owner's word (the dark `--text` fix, Bodoni Moda, the value label, the 2PT chip), and (c) places where the shell IMPROVED on w89 (the offline fonts, anything else) — those are not strays and must not be "fixed" back. If you find no stray in a part, say so with the evidence — an empty result with screenshots is a filing, not a shrug.

## Part 7 — Innovate: is "look like w89" still the right bar? (lighter, for the council)

Two questions, short answers. First: the shell now inlines its fonts, runs offline, and carries its own battery — w89 is a single-file wave from a different era. Is "look like w89" still the right beauty bar for the shell, or should the shell be judged on its own terms now, with w89 as the palette source rather than the look? Second: the team takeover is the deepest unbuilt piece of the palette ruling — if you were designing it from scratch, would you re-tint every token per team (w89's way), or is there a smaller set of tokens that carries the team identity better? Think around the question; a good idea here is worth more than a correct verdict elsewhere. Do not let this part eat the round — two paragraphs each, then file.

## Part 8 — Filing rules (read before you file)

One file per seat, in your own `inbox/` directory: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`. First line: `SPEAKER: <seat> | ROLE: council | TASK: <what you did> | DATE: <UTC>`, then `FOR: P-366` (and `FOR: P-367` for the label section in Part 3). Label every claim VERIFIED (you ran it / you saw it) / REPORTED (someone else ran it; name them) / INFERRED / UNKNOWN. Include your screenshot paths or descriptions for every visual claim — a visual verdict without a screenshot is INFERRED. End with `BLOCKED`, `OPEN`, `NEXT`. Push after every finished file, on your own branch only. Work comes from this prompt; do not assign work to a named seat — if a part needs a voice it does not have, say so in your filing and leave it open. If you disagree with anything in this prompt, say so in your filing and do what you think is best, inside your lane.
