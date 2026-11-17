SPEAKER: glyph | ROLE: council | TASK: Compared shipped Cakepanz shell (cakepanz-4, pin 5c808472) to w89 (gh-pages Football-Sim-Z-post-blue-w89.html) on palette/type/words/surfaces/contrast/team-takeover; static code+token inspection (no browser render/screenshots available in this environment) | DATE: 2026-11-17T23:15Z
FOR: P-366
FOR: P-367

# Cakepanz (shipped) vs w89 — aesthetic strays (glyph)

## Scope / method (VERIFIED unless noted)
- **w89 reference:** `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B). Anchors below are line numbers from that file (`git show`).
- **Shell under review (shipped):** `67-cakepanz-5-2026-11-17/cakepanz-4/` (engine pin `5c808472` per delivery docs). Key files: `src/lib/assets/tokens-w89.css`, `src/lib/assets/shell.css`, `src/lib/bindings/tokensApply.ts`, `src/lib/port/tokens.ts`, `src/lib/assets/zpb-team-colors.json`, `src/App.svelte`, `src/lib/valuation.ts`, `src/lib/port/feedVM.ts`, `src/lib/screens/{TeamSelect,Feed,Guide}.svelte`, `src/lib/components/{DraftBoard,BoardHeader,BoardRow,BoardFooter}.svelte`, `src/engine*/sports/nfl/engine/recap.ts`, `scripts/probe-contrast.mjs`.
- **Prepared aesthetic delta:** `diff -rq`/`diff -q` (VERIFIED): **no aesthetic differences** between `cakepanz-4/` and `cakepanz-4-prepared/` in `src/lib/assets/tokens-w89.css`, `shell.css`, `src/lib/bindings/tokensApply.ts`, `src/lib/port/tokens.ts`, `src/App.svelte`. Differences are engine-only (`src/engine/sports/nfl/sim/game.ts` differs, prepared adds `passclass.ts`, `src/engine-node` differs/stamp) — re-pin appears engine-only, no shipped/prepared visual stray found.
- **Visual evidence limitation:** no browser/GUI/screenshot capture available here; all visual claims below are **INFERRED from static CSS/markup/token values** (I cannot attest rendered appearance). `scripts/probe-contrast.mjs` is read/compared, not executed for new numbers beyond its stated table.

## Part 1 — Palette: default, dark, team takeover

### Default (light) & dark tokens
| Aspect | w89 anchor | Shell anchor | Finding |
|---|---|---|---|
| Light defaults | `:root`/light media `w89:13616-13623` — bg `#fdf2f6`, panel `#ffffff`, panel2 `#f9e9f0`, text `#8e5566`, sub `#885261`, rosehair `#e6c3d2`, zcream `#53382b` | `tokens-w89.css:37-48,76-84` — same values | **Match (VERIFIED).** |
| Dark defaults | dark blocks/media `w89:13624-13629` — bg `#1e1119`, panel `#291a24`, panel2 `#35202d`, sub `#c99cae`, zcream `#f2e7d5` | `tokens-w89.css:86-99` — same values | **Match (VERIFIED).** |
| Dark `--text` | w89 dark block does **not** set `--text` (light plum `#8e5566` carries) `w89:13624-13629` | `tokens-w89.css:86-90` does not set `--text`; comment: “NOTE: w89's dark block does NOT set --text — … flagged, not fixed (Owner question)” `tokens-w89.css:90` | **Faithful reproduction of w89 defect (VERIFIED).** Not a fix, not a third behavior; Owner ruling still owed. |
| `--tc` | w89 has no `--tc` (prompt; not set in w89 root blocks shown) | No `--tc` in `tokens-w89.css`/`tokens.ts` (VERIFIED by inspection) | **Match.** |
| Page base | w89 body `w89:113` system sans on `var(--bg)`/`var(--text)`; B2 pale-rose base `w89:13616` | `shell.css:10-16` body uses `background: var(--bg); color: var(--text); font-family: var(--font-ui)`; `tokens-w89.css:112-121` sets flat bg + `font-family: var(--font-ui)` | Base colors match; **body font differs** (see Part 2). |

### Team takeover — headline (VERIFIED, static)
- **w89 mechanism:** `[data-zpbteam]` remaps “every accent token…” (`w89:483`), extensive token remaps and per-team computed vars (`w89:566,579,592,892-906,3206-3211,14730-14732`; palette `ZPB_TEAM_COLORS` `w89:2988`).
- **Shell mechanism:** `teamRemap()` returns `{ attr: teamName, vars: { '--zpb-t1': c1, '--zpb-t2': c2, '--zpb-t3': c3 } }` from `zpb-team-colors.json` (`src/lib/port/tokens.ts:28-44`); `applyTeam()` sets `dataset.zpbteam` and those 3 properties only (`src/lib/bindings/tokensApply.ts:8-18`). `zpb-team-colors.json` holds 32 teams × 3 stops (VERIFIED: `Arizona Cardinals ["#97233F","#000000","#FFB612"]`).
- **Consumption gap:** `tokens-w89.css:102-110` defines empty `[data-zpbteam]` blocks (light/system-dark/dark) with comments “values ride in the JSON…” but **no remapped token values and no rules consuming `--zpb-t1/2/3`**. Core surfaces use static tokens: `--gold2/--goldm/--gold3` (`tokens-w89.css:45-47,56-59,81-83,88-89`), `--hairline/--rosehair`, `--panel*`, `--text` — none overridden per team. `shell.css` consumes `var(--gold*)/var(--hairline)/var(--panel*)/var(--text)` (e.g. `.cp-brand` `shell.css:28`, `.cp-panel` `:53`, buttons `:30-33`, tables/feed/cards throughout) with no `--zpb-t*` usage. Grep in shell `src/` shows `zpb-t1/2/3` set only in `tokensApply.ts`/`port/tokens.ts` (no consumers); large `--tA/--tG*` family exists only in `test/engine/nfl/golden/teamPacks.w54.json`, not in runtime src.
- **Finding (high severity, VERIFIED):** the shell **sets the team attribute and 3 stop vars but does not re-tint accent/gold/hairline/panel/text tokens or surfaces**. It does **not** satisfy “every team's color changes almost every aspect of the color palette”; in static terms it behaves closer to “team selected (attribute) with mostly fixed palette” than w89’s full takeover. (Rendered proof: INFERRED — cannot screenshot; code path is decisive.)

## Part 2 — Type: display faces, body, wordmark

| Aspect | w89 anchor | Shell anchor | Finding |
|---|---|---|---|
| Font loading | Google Fonts link `w89:476-478` (Cinzel 700/900, Cinzel Decorative 700/900, Bodoni Moda 500/600/700). Offline defect in w89 (known). | Inlined `@font-face` base64 woff2 in `tokens-w89.css:1-34`: **Cinzel 700** and **Cinzel Decorative 700** only (`font-weight: 700`). No Bodoni Moda. | **Stray/partial parity (VERIFIED):** missing Bodoni Moda and missing 900 weights that w89 loads; **improvement** is offline bundling (not a stray to revert) but faces/weights do not fully match w89’s linked set. |
| Display stacks | w89 uses Cinzel/Bodoni Moda widely (e.g. brand/mq `w89:645,668`, headings/buttons/intro `w89:702,786,911,1058,1160,1370,...`) | `--font-display: 'Cinzel Decorative','Cinzel',Georgia,serif` `tokens-w89.css:64`; `--font-ui: 'Cinzel',Georgia,serif` `:65`; headings `.cp-brand/.champ/h2` use display in `shell.css:28,49` | **Different primary display (INFERRED visually, VERIFIED by stacks):** Bodoni Moda absent; Cinzel Decorative/Cinzel dominate. |
| Body | `w89:113` `font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif` | `shell.css:13` `font-family: var(--font-ui)` (= Cinzel) on body; `tokens-w89.css:116` also sets body `font-family: var(--font-ui)` | **Stray (VERIFIED):** body copy set in Cinzel (display/serif UI face), not w89’s 14px system sans. Likely visible at 390px (INFERRED). |
| Wordmark | w89 brand/header uses Bodoni Moda in stacks (e.g. `w89:645`) and “20-0”/slogan treatment `w89:1767-1768,2932`; page title/meta `w89:95,98,2225` | `App.svelte:361-364` renders `<header class="cp-topbar"><span class="cp-brand">76 Pancakes</span>…</header>`; `.cp-brand` `shell.css:28` uses `var(--font-display)` (Cinzel Decorative), weight 800, color `var(--gold2)` | **Stray (VERIFIED/INFERRED most visible):** “76 Pancakes” wordmark face/weight/color treatment differs from w89’s Bodoni-Moda-led brand (and w89 brands “20-0”). |

## Part 3 — Words: labels, chips, slogan (FOR: P-367)

| Aspect | w89 anchor | Shell anchor | Finding |
|---|---|---|---|
| Value label (3 terms) | Draft pick-analysis header `<span>Value</span>` `w89:4498` | **“Model Value”**: `src/lib/valuation.ts:2,11` (`MODE_LABEL.measured = 'Model Value'`, default), used in UI provenance (`App.svelte` sets/probes via mode label; Team Select `TeamSelect.svelte:44` shows `MODE_LABEL[...]`), Guide `Guide.svelte:22` “Every number carries a label: **Model Value**…” , batteries/docs. **“Engine Value”**: not found in `cakepanz-4/src` (VERIFIED grep). **“Value”**: w89’s column label; shell board components inspected (`BoardHeader.svelte`, `BoardRow.svelte`, `BoardFooter.svelte`) do not show a literal “Value” column header string (VERIFIED). | **Stray vs w89 label, Owner-ruling-needed vs preferred term (VERIFIED):** w89 = “Value”; shell = “Model Value” (valuation/mode system, Guide, Team Select provenance); Owner-preferred “Engine Value” absent. Not an Owner-decided rename — report only. |
| 2PT chip | Feed UI “2-Pt Conv” strings `w89:4447,6622,7035,7383,7708,7754-7755,9027,9324,9346-9347,9359`; stat abbrev `w89:7035` shows `2PT` in a player line | Feed chip labels `src/lib/port/feedVM.ts:100-101` `two:{label:'2PT'}` / `two_fail:{label:'2PT FAIL'}` rendered as `.zrl-badge` in `Feed.svelte:57-62,116`; engine recap text uses “2-Pt Conv good/failed” `src/engine/sports/nfl/engine/recap.ts:107-108` (and `engine-node` mirror) | **Stray in chip UI (VERIFIED):** shell feed chips say “2PT/2PT FAIL” vs w89 “2-Pt Conv” in UI; underlying recap copy differs by layer. Owner ruling owed (do not change here). |
| Slogan | `<p class="zpb-cygline">…Can you go </span><b class="zpb-shine">20-0</b>…` `w89:2932` (+ many refs e.g. `1767-1768,11444`), meta `w89:2225` | No `Can you go`, no `zpb-cygline`/`zpb-shine` slogan in `cakepanz-4/src`; “20-0” appears only in engine dev pages `src/engine/main.ts:56,59` and `src/engine-node/main.ts:56,59` (“20-0 · engine dev page”), not user-facing shell | **Missing (VERIFIED):** w89 slogan/shimmer not present in shell UI/meta. |
| “Touchdown” copy | w89 recaps print “touchdown” (prompt) | `src/engine/sports/nfl/engine/recap.ts:135-136` (and `engine-node`): “… for a touchdown”, interception/fumble return text includes “for a touchdown” | **Matches in substance (VERIFIED, code-level):** both emit “touchdown” in recap strings. “Never print Touchdown” law has **no source on disk in either tree** (VERIFIED/REPORTED) — not invented here. |

## Part 4 — Surfaces (static/code; visual parity INFERRED)

| Surface | w89 anchor / note | Shell anchor | Finding |
|---|---|---|---|
| Feed anatomy | `zrl-*` classes in w89 (`.zrl-t/.zrl-team/.zrl-play/.zrl-badge/.zrl-sc/.zrl-me` e.g. `w89:1065-1069,1381,1409,1929-1937,1961-1962,14723`) | `Feed.svelte:51-75,111-121` uses `zrl-t/team/play/badge/sc`, `.cp-me` glow; `feedVM` carries `me/badges` `feedVM.ts:25,28,100-101`; `shell.battery`/`node.battery` expect `zrl-*` | **Class anatomy largely shared (VERIFIED)**; styling/values differ (w89 large inline CSS vs `shell.css` tokens/components). Parity of rendered look **INFERRED**. |
| Draft board | w89 board lives in monolith (grid/filters/chips extensive) | `DraftBoard.svelte:1-74`, `BoardHeader.svelte`, `BoardRow.svelte`, `BoardFooter.svelte` — custom compact grid; `BoardRow.svelte:49-57` hardcodes colors `#221820/#3a2c31/#e8c87e/#f5e9dd/#c8a48f` (not tokenized to team/palette vars) and 390px grid tightening `:36-39`; `DraftBoard.svelte:55` container `#221820` | **Likely stray (INFERRED visually, VERIFIED by hardcoded palette):** dense custom board chrome with fixed colors vs w89 board styling; does not consume team takeover vars. |
| Team Select | w89 team selection flows in monolith | `TeamSelect.svelte:1-150` custom layout, uses `var(--panel/gold/hairline/zcream)` tokens, slot/order preview, provenance “Model Value” | **Different surface implementation (VERIFIED)**; palette-token use present but team-remap consumption absent (Part 1). Visual match **INFERRED unknown**. |
| Review/saves/share/brag | w89 review/badges/zpb surfaces extensive in file | `App.svelte` wires `Review`, `Saves`, `Share`, `Cards`, `Complete`, `WeekView` etc. (screens/components) | **Not fully walked without render (UNKNOWN visually).** Code exists; no evidence gathered of per-surface parity beyond feed classes. |
| `--zcream` usage | w89 neutral cream token (never recolored) `w89:13621,13629` | Token defined `tokens-w89.css:44,80,88,98`; used in shell (e.g. headings/cards/share/feed text classes in CSS/components like `.cp-pcard .pname { color: var(--zcream) }` `shell.css:90`, `.cp-feed-vs/.cp-feed-summary` `Feed.svelte:90,114`) | **Present and used as neutral (VERIFIED in token defs/uses sampled)**; takeover does not tint it (consistent with intent). |

## Part 5 — Contrast (whose failures)

From `scripts/probe-contrast.mjs` (VERIFIED file contents; recomputation not executed here, values match prompt/w89-known set):

| Pair (probe) | Result in probe | Attribution |
|---|---:|---|
| light gold2 `#e6c67d` on pale rose `#fdf2f6` | 1.51:1 FAIL (AA 4.5) | **w89 defect faithfully reproduced** (shell tokens identical) |
| light gold2 `#e6c67d` on white `#ffffff` | 1.65:1 FAIL | **w89 defect faithfully reproduced** |
| light text `#8e5566` on pale rose `#fdf2f6` | 5.27:1 PASS | **Matches** |
| dark text (rose/plum ink) `#8e5566` on plum `#1e1119` | 3.17:1 FAIL | **w89 defect faithfully reproduced** (dark `--text` unset in both; `tokens-w89.css:86-90`) |
| dark zcream `#f2e7d5` on plum `#1e1119` | 12.91:1 PASS | **Matches** |
| dark gold2 `#e8c87e` on plum `#1e1119` | 10.30:1 PASS | **Matches** |

- **Unruled items:** dark `--text` fix and Bodoni Moda not ruled — reported as-is (no fix applied in shell). No pair observed where shell passes and w89 fails or vice versa from this table (INFERRED no additional pairs audited).

## Part 6 — Verdict: ranked strays

### (a) Strays the shell can fix without any Owner decision
1. **Team takeover not consumed (palette mostly static).** w89: `w89:483,566,579,592` (full accent remap). Shell: sets only `--zpb-t1/2/3` `tokensApply.ts:12-14`, `port/tokens.ts:41-44`; empty remap blocks `tokens-w89.css:102-110`; no runtime consumers of team stops in `src/` (gold/hairline/panels/text stay static). **Fix shape:** define and apply `[data-zpbteam]` token remaps (and/or map `--zpb-t*` into accent/gold/hairline/panel/text vars) and ensure key UI rules consume them, keeping `--zcream` untinted.
2. **Body font is Cinzel, not w89’s 14px system sans.** w89: `w89:113`. Shell: `shell.css:13`, `tokens-w89.css:116` (`--font-ui` Cinzel). **Fix shape:** set body to w89’s system sans stack/14px (keep display faces for headers/brand where intended) and align `--font-ui` usage.
3. **Display face set incomplete vs w89 (Bodoni Moda missing; only 700 weights inlined).** w89: `w89:476-478` (+ Bodoni stacks e.g. `645,786`). Shell: `tokens-w89.css:1-34` inlines Cinzel 700, Cinzel Decorative 700 only. **Fix shape:** inline the needed Bodoni Moda and 700/900 weights (or equivalent) and wire stacks to match w89’s display usage, preserving offline bundling.
4. **Wordmark “76 Pancakes” rendered as Cinzel Decorative brand, not w89 Bodoni-led brand.** w89: Bodoni Moda brand stack `w89:645` and 20-0/slogan branding. Shell: `App.svelte:362`, `shell.css:28`. **Fix shape:** apply the w89 brand/header type stack/weight/spacing/color treatment to the shell brand (and decide brand text only if Owner-directed; styling can align without changing meaning).
5. **Feed 2PT chip labels differ from w89 UI wording.** w89: “2-Pt Conv” UI `w89:4447,7754-7755` etc. Shell: `feedVM.ts:100-101` `2PT/2PT FAIL`, `Feed.svelte:57-62`. **Fix shape:** map conv badges to w89’s UI strings (layer choice: VM label or presentation) — **note:** this overlaps Part 3 Owner-ruling area in prompt; treat as “needs Owner word” below if label choice is contested.
6. **Slogan “Can you go 20-0?” (shimmer) absent.** w89: `w89:1767-1768,2932,2225`. Shell: none in src (only dev-page titles in `engine*/main.ts`). **Fix shape:** add the slogan line/placement and meta/title treatment per w89 surfaces (copy/placement details may be product choices; pure absence is clear).
7. **Draft board/row chrome uses hardcoded hex colors, not token/team-driven.** Shell: `DraftBoard.svelte:55`, `BoardRow.svelte:49-57,69,73-76`. w89 uses theme/team tokens broadly. **Fix shape:** replace hardcoded board palette with token vars and ensure team takeover can affect them.

### (b) Strays/differences that need the Owner’s word
1. **Dark `--text` not set (plum ink carries; contrast FAIL 3.17:1).** w89: `w89:13624-13629`. Shell: `tokens-w89.css:86-90` (reproduced). Fixing is better contrast but departs from w89 fidelity — Owner ruling owed.
2. **Bodoni Moda inclusion/role.** w89 loads/uses it heavily; shell omits it. Whether to restore Bodoni Moda (and where) is a design decision (prompt notes one seat’s default “out”, unanswered).
3. **Value label term/location.** w89: `Value` `w89:4498`. Shell: `Model Value` `valuation.ts:11`, `Guide.svelte:22`, `TeamSelect.svelte:44`. Owner-preferred: `Engine Value` (absent). Which term and on which surfaces (board column, Team Select, Guide, provenance) needs ruling (P-367 evidence).
4. **2PT vs 2-Pt Conv.** w89 UI: `2-Pt Conv`; shell chips: `2PT/2PT FAIL` `feedVM.ts:100-101`; engine recap already “2-Pt Conv” `recap.ts:107-108`. Canonical user-facing form needs ruling.

### (c) Shell improvements on w89 (do not “fix” back)
1. **Offline inlined fonts (Cinzel, Cinzel Decorative 700) vs w89 Google Fonts link.** Shell: `tokens-w89.css:1-34` base64 woff2. w89: `w89:476-478` network dependency (w89 defect). **Improvement** for offline requirement (even if face coverage must expand for parity).
2. **No `--tc`/explicit 3-stop team var API and typed TS token/port split.** Shell: `port/tokens.ts`, `bindings/tokensApply.ts` (DOM isolated) — structurally cleaner than monolith JS, though takeover consumption is currently incomplete (a).
3. **Contrast probe script shipped.** `scripts/probe-contrast.mjs` codifies the measured failures (aids verification) — not present as a separate tool in w89 in the same form.

*Surfaces/parts with no stray claimed:* **default/dark token hex values** match w89 (Part 1 table); **`--zcream` intent** (neutral, not team-tinted) preserved in sampled uses; **prepared tree has no aesthetic delta** vs shipped. (All VERIFIED/INFERRED as noted; not a substitute for rendered screenshots.)

## Part 7 — Innovate (short)

1. **Bar: “look like w89” as source, not sole judge.** w89 is a proven palette/identity source, but the shell is a different (componentized, offline, battery-backed) product era. The right bar now: **preserve w89’s palette language, key brand moments, and Owner-rules (team takeover depth, neutral zcream, copy rulings) while allowing structural/implementation improvements** (offline fonts, tokenized components) — judge parity on those identity-critical axes, not on monolith quirks or w89 defects (e.g. dark `--text` contrast) except when fidelity is explicitly required. w89 remains the palette/visual reference; the shell earns its own look where it improves clarity/accessibility within that language.
2. **Team takeover from scratch.** Re-tinting “every token” (w89 way) is maximally expressive but expensive and fragile. A smaller, better-carried set would be: **(1) primary/secondary accent + gold ramp anchors, (2) hairlines/borders and key surfaces (panel/panel2 tints), (3) interactive/selection states and “me”/highlight glows, (4) chart/badge accents** — while keeping **text, `--zcream`, and base neutrals stable** for contrast and identity. This concentrates team identity where the eye reads it (CTAs, highlights, chrome, key cards) without recoloring every neutral, reducing contrast regressions and making per-team tuning tractable.

## BLOCKED
- No browser/render environment: cannot provide screenshots of side-by-side screens (light/dark, 1180/390, two teams) or confirm rendered font fallbacks/visual layout parity. Visual claims marked INFERRED.
- `pin-watch.mjs` / D3 items from prior prompt not in scope here (no change). No Owner rulings on dark `--text`, Bodoni Moda, Value/Model/Engine label, or 2PT vs 2-Pt Conv.

## OPEN
- Whether to fix dark `--text` contrast (departs from w89) vs preserve defect pending Owner.
- Canonical label: “Value” vs “Model Value” vs “Engine Value” and per-surface placement (P-367).
- “2PT/2PT FAIL” vs “2-Pt Conv” in feed chips.
- Bodoni Moda restoration scope and weights for offline bundle.
- Exact set of tokens/surfaces that must participate in team takeover to satisfy “almost every aspect of the color palette”.

## NEXT
1. Owner/Architect rulings on OPEN label/contrast/font/chip items; then land (a)-fixes in one pass (team-remap wiring + body/display fonts + board tokenization) with before/after shots.
2. A seat with a browser builds/serves shipped `cakepanz-4` and captures the requested side-by-side screenshots (w89 vs shell, light/dark, 1180/390, light-palette vs dark-palette team) to upgrade INFERRED visual claims to VERIFIED.
3. If takeover is rewired, add a render/DOM assertion (or probe) that selected team changes computed accent/gold/hairline on representative surfaces for ≥2 contrasting teams.
