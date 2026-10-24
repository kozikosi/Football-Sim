# F2/F4 — the two `<style>` blocks, per build (Architect receipt pack)

**DS · 20 Oct 2026 · Round 4 (M-25 §6).** Read-only analysis. Reference v20 `31b7d61f…` 649,032 B; donor `77bb9ed5…` 650,127 B. No product edit.

## 0. Naming

- **`#style0`** = the head inline `<style>` (v20 line 1; donor line 4).
- **`#style1`** = the main `<style>` after `<body>` (v20 lines 13–313; donor lines 13–264).

Receipts: `_agents/ds/reviews/round4/style-blocks.txt`, `style-blocks-diff.txt`; tool `_agents/ds/tools/style-blocks.js`.

## 1. `#style0` — head inline block

| build | span   | bytes | rule opens | what it contains                                                                                                                                                                                                                                                                                               |
| ----- | ------ | ----- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v20   | line 1 | 372   | 5          | `:root{color-scheme:light;box-sizing:border-box;padding-top/bottom:safe-area}`; `html{scroll-padding-top}`; `body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}`; `img{max-width:100%}`; `[hidden]:not([hidden=until-found i]){display:none!important}` |
| donor | line 4 | 377   | 5          | identical except **`color-scheme:light dark`**                                                                                                                                                                                                                                                                 |

**Exact check:** `block0 exact same: false`; after replacing the donor's `color-scheme:light dark` with `color-scheme:light`, the two blocks are byte-identical. This is the only `#style0` difference. It contains no draft-board selectors.

**Color-scheme evidence:** v20 `light`; donor `light dark`. Both main blocks still contain a `@media (prefers-color-scheme: light)` variable override at line 18; the default variables at the top are dark (`--bg:#0b0e14` …). v20 adds a second light-mode body-background override at line 223.

**F2 recommendation (advisory, Architect decides):** take the donor's **`light dark`**. The app is dual-theme (dark default, light OS override); `color-scheme:light` would tell the browser to render native controls/scrollbars light even when the OS is dark and the app is using its dark variables — a control/theme mismatch. `light dark` matches the OS and the existing media query. If the product is intended to be **light-only**, then `light` is coherent only with a larger change (remove the dark default variables and the light override); that is not a CSS one-liner and should be a separate decision.

## 2. `#style1` — main block

| build | span   | lines | bytes  | `{` opens | `@media` | `@keyframes` | `prefers-color-scheme` |
| ----- | ------ | ----- | ------ | --------- | -------- | ------------ | ---------------------- |
| v20   | 13–313 | 301   | 25,872 | 310       | 9        | 5            | 2                      |
| donor | 13–264 | 252   | 20,186 | 259       | 8        | 4            | 1                      |

Common base (identical in both; only two diff hunks):
- root variables + light media override (line 18); layout, panels, buttons, tables; player browser/filters/position list/synergy; detail/metric bars/animations/toasts; draft board base, roster, matchup, playoffs, depth chart, draft UI; generic phone layout and `table.mstack`.

v20-only **lines 216–273** (58 lines): `/* ===== v20 look: the season is the product ===== */` (216–253) + `/* the phone draft board... */` (254–273):
- `:root --glow/--gold`; body radial/repeating background; light-mode body override (223–225); hero/hero-ball/heroBounce; tagline; stepper; viewhead/backlink/footnav; panel/tabbtn/resetbtn rounding and gradients; season/action button sizing (249–250); `th.sortable`/`h2`/`.panel h3`.
- the `#draftTable2` mobile card block (255–273): display block, hidden thead, 12-column grid rows, `dc-name`/`dc-ovr`/`dc-btn`/`dc-wins`/`dc-val`/`dc-pri`/`dc-gone`/`dc-fills`, label pseudo-elements, button sizing.

donor-only **lines 254–263** (10 lines): `/* ---- Season-first presentation: bottom supplementary links + hero CTAs ---- */`:
- `.bottomlinks`, `.bottomlinks .bl-label`, `.bottomlinks .bllink`; `.cta-row`, `.cta-row .resetbtn`; `.hero-panel h2`, `.hero-panel ol`, `.hero-panel ol li`; a mobile tweak for `.bottomlinks`/`.cta-row .resetbtn`.

The rest of `#style1` is byte-identical; the diff has only those two hunks. The v20 block is 5,686 B larger.

## 3. F4 — Draft-board CSS synthesis notes

Counts (v20 / donor): `#draftTable2` **14 / 0**; `dc-name` **2 / 0**; `table.mstack` **8 / 8**; `bottomlinks` **0 / 5**; `cta-row` **0 / 4**; `hero-panel` **0 / 5**.

**What v20 contributes to the draft board:** the only unique draft-board CSS — the `#draftTable2` mobile card rules at 259–272 (inside 216–273). It is coupled to the v20 markup:
- v20 table `<table id="draftTable2" data-nostack="1">` at line 425;
- v20 `renderDraftBoard2` pre-sets `data-label` on the data cells at line 1725 (`Pos`, `Team`, `OVR`, `Wins`, `Value here`, `Priority`, `Gone`, `Fills`);
- v20's custom card grid uses `dc-name`/`dc-ovr`/`dc-btn`/`dc-wins`/`dc-val`/`dc-pri`/`dc-gone`/`dc-fills`.

**What the donor contributes to the draft board:** **no unique draft-board CSS**. Its `table.mstack` generic rules (8 occurrences) are identical to v20's; its unique 254–263 block is Season-first landing CSS, not draft board.

**Coupling check — donor unique CSS is used by donor markup, not v20:**
- donor `.bottomlinks` markup at line 392; `.hero-panel` at 793/804; `.cta-row` at 6190; v20 has none of these classes.
- donor table is `<table id="draftTable2">` at line 377 (no `data-nostack`); donor's render does not pre-set `data-label`; the donor phone block adds labels.

**Synthesis notes (advisory, Architect decides):**
1. **Keep v20 216–273** if the v20 draft-board look is kept; it is the only side with unique draft-board CSS. Replacing it with donor CSS would delete the `#draftTable2` cards and the v20 look; the donor has no equivalent draft-board rules.
2. **Keep the common `table.mstack` rules** (identical) and the donor phone JS fix; the generic stack remains for non-draft tables.
3. **Donor 254–263 is conditional on donor markup.** Taking it alone adds `.bottomlinks`/`.cta-row`/`.hero-panel` rules with no matching v20 markup (dead CSS). Taking it with the donor markup is a separate Season-first presentation decision, not a CSS hygiene swap.
4. **Phone JS interaction:** the primary F1 synthesis keeps `data-nostack` for `#draftTable2`, so the donor generic label pass does not overwrite the v20 pre-set labels. If Variant B (strict donor block) is chosen, the v20 ID-specific CSS still wins the card layout, but the donor label pass may rewrite the `data-label` content and add `mstack`; verify in a browser at 390 px before freezing.
5. **Do not read `#style0`/`#style1` as a single "donor CSS" choice.** `#style0` is one `color-scheme` token; `#style1` has a v20-only draft-board/visual block and a donor-only Season-first block. The rest is common.

## 4. Verification

- `node _agents/ds/tools/style-blocks.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html"` → `style-blocks.txt` (block0 372/377 B; block1 25,872/20,186 B; 301/252 lines; 310/259 opens; 9/8 media; 5/4 keyframes).
- `diff -u` of the two main blocks → `style-blocks-diff.txt` (84 lines, exactly two hunks).
- `grep -c` counts above; `#draftTable2` / `dc-name` / `table.mstack` / `bottomlinks` / `cta-row` / `hero-panel`.
- No browser run this session; the color/label visual claims are structural, not a rendered comparison. The M-22/MiniMax 390 px evidence remains the source for the phone overflow measurement.
