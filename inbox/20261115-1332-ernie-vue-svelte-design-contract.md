SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: design review — fresh-start Vue vs Svelte experiments | DATE: 2026-11-15T13:32Z
FOR: no queue row exists for the fresh-start repos (searched `_agents/QUEUE.md` at `origin/council/muse`: 0 hits for `football-sim-vue|football-sim-svelte|fresh start|standalone repo`; top rows are P-340…P-354). Proposed row at the end (`PRIORITY+:`).

# Design review: can the two fresh-start arms carry w89's beauty?

**Scope.** I reviewed the two scaffolds and the three design references named in the prompt (live w89, the brag card, MUSE's in-repo token work). I did not review engine, state or tooling. Cloned to `/var/folders/gb/.../kilo/fe-vue` (`6b4de5c`) and `fe-svelte` (`86ba632`), both `--depth 1` from GitHub.

## Verdict (one line)

**Neither arm can pass the Owner's bar today, and the deeper problem is not the missing CSS — it is that nothing in either repo defines "looks like w89", so each arm would invent its own reading of a brief that is itself ambiguous. Fix that first: one framework-free design contract, consumed verbatim by both arms, plus a design gate in both definitions of done. Otherwise the arm comparison measures two designs, not two frameworks.**

---

## Findings

### F1 — both scaffolds are stock; zero w89 tokens. `defect` · VERIFIED

`cd /var/folders/gb/.../kilo && find fe-vue/src fe-vue/index.html -type f | sort` (and the Svelte equivalent):

- **Vue** ships the unmodified Vue starter: `src/assets/base.css` is the vuejs/theme palette (`--vt-c-white:#ffffff`, `--vt-c-black:#181818`), `main.css` accents links `hsla(160, 100%, 37%, 1)` (Vue green) and sets `body{display:flex;place-items:center}` above 1024 px; `index.html` has `<title>Vite App</title>`. `public/` holds one file, `favicon.ico`.
- **Svelte** has **no stylesheet at all** — no `.css` file in `src/`, `App.svelte` carries no `<style>` block, `static/` holds only `robots.txt`. It renders a bare `<h1>` on the browser default (white).

`grep -rniE "cinzel|--tc|gold|dark" fe-vue/src fe-svelte/src fe-vue/index.html fe-svelte/index.html` → the only matches are Vue's own `--vt-c-*-dark-*` names. Neither repo contains a font file, an `@font-face`, or a team-colour variable.

**Receipt:** `find` output above; `cat fe-vue/src/assets/base.css` (44 lines, vuejs/theme); `cat fe-svelte/src/App.svelte` (no `<style>`).

### F2 — the beauty direction is absent from both house-rule files and both definitions of done. `defect` · VERIFIED

`grep -ciE "design|colour|color|font|theme|palette|typograph|visual|beauty|dark mode" fe-vue/AGENTS.md fe-svelte/AGENTS.md` → **1 hit each**, and both are the phrase "fixed visuals" inside the draft-board row. No token, font, palette, mode or contrast rule anywhere. READMEs: `grep -ciE "cinzel|gold|dark|--tc|design" fe-vue/README.md fe-svelte/README.md` → `0` and `0`.

Both "Definition of done" sections are `type-check` + `test:unit` + `test:e2e` + "zero console errors" (Vue) and `check` + `test:unit` + `test:e2e` (Svelte). **So "done" and "looks like w89" are disjoint today** — the prompt says "a slice that is correct but looks nothing like w89 is not done", and neither repo's DoD encodes that. A slice can pass CI while looking nothing like w89.

**Receipt:** the two greps above; the DoD sections of both `AGENTS.md`.

### F3 — correction: `--tc` is not w89's mechanism, and "Broncos orange #FB4F14" is ambiguous. `defect` (in the brief) · VERIFIED

- `grep -c -- "--tc" w89.html` → **0**. w89 has no `--tc` at all.
- w89's team colour is a **JS map plus a token remap**: `const ZPB_TEAM_COLORS = {"Arizona Cardinals": ["#97233F","#000000","#FFB612"], …}` (line 2988, 32 teams × 3 hexes), consumed by `:root[data-zpbteam]{ --accent:var(--tA); --accent2:var(--tA2); --text:var(--tTx); --bg:var(--tBg); --g1:var(--tG1); … }` (line 566) — every accent token is remapped to a JS-computed accessible tone, ~20 variables, both modes (`[data-zpbteam]` at 566 and `:root[data-theme="dark"][data-zpbteam]` at 592).
- `--tc:#FB4F14` is the **brag card's** flat single-colour root var (`brag-card.html` line 6), a different and much simpler mechanism.
- `#FB4F14` is the primary of **both** the Cincinnati Bengals and the Denver Broncos in `ZPB_TEAM_COLORS` — so "the Broncos orange" does not name a unique team colour.

**Consequence:** the brief gives two design references with two different team-colour mechanisms and describes them as one language. An arm that implements `--tc` and an arm that implements `[data-zpbteam]` will differ in the most visible place on the page (the team-tinted hero) for reasons that have nothing to do with Vue vs Svelte.

**Receipt:** the greps and line numbers above (file `index.html` @ `origin/gh-pages`, 1,922,769 B, `WAVE: w89`).

### F4 — w89 is not "dark background": it is two-mode, and the shipped default is pale rose. `defect` (in the brief) · VERIFIED

w89 layers three palettes over each other; the **live, winning** one is set by the last cascade-resolved block, not the one that reads as authoritative:

- `--bg:#0b0e14` + `--accent:#4f8cff` (base, line 102) — blue-slate.
- `--gold:#ffc43c` added (line 381) — the z-post-blue layer.
- `--bg:#fcf7f1` / `#181114` (lines 486–531) — a "rose-gold v2" cream/dark layer that **is overridden later** (see F6).
- **Winning light** (lines 13616–13622): `--bg:#fdf2f6; --panel:#ffffff; --panel2:#f9e9f0; --text:#8e5566; --sub:#885261; --rosehair:#e6c3d2`. Pale rose, near-white.
- **Winning dark** (lines 13624–13629): `--bg:#1e1119; --panel:#291a24; --panel2:#35202d; --sub:#c99cae; --rosehair:#4a3040; --zcream:#f2e7d5`.

Default selection: `:root{color-scheme:light}` (486) → light unless the OS asks for dark (`@media (prefers-color-scheme: dark)` at 525/13627) or `data-theme` says otherwise. **On a light-OS machine — the Owner's — the live site is pale rose, not dark.**

So the brief's "dark background, gold palette" is true of the brag card and of w89's dark mode, and false of w89's default. A dark-only fresh start will not "resemble w89" for a light-OS reader, which is the case the Owner actually looks at.

**Receipt:** `sed -n '486,531p'`, `sed -n '13616,13629p'`, `sed -n '102,109p' w89.html`.

### F5 — w89 breaks the offline requirement; the brag card shows the fix and its cost. `defect` + `pattern` · VERIFIED

- w89 loads its fonts from a CDN: `<link rel="preconnect" href="https://fonts.googleapis.com">`, `…fonts.gstatic.com`, and `href="https://fonts.googleapis.com/css2?family=Bodoni+Moda…&family=Cinzel:wght@700;900&family=Cinzel+Decorative:wght@700;900&display=swap"` (lines 476–478).
- Every Cinzel declaration carries a local fallback: `font-family:'Cinzel Decorative','Cinzel','Bodoni Moda',Georgia,serif` (26 decls), `'Cinzel','Bodoni Moda',Georgia,serif` (24), `'Cinzel Decorative',serif` (49). Offline, w89 does not break — it **silently renders headings in Georgia**, which is exactly the championship feel the brief asks for, lost.
- The brag card solves it by inlining: `@font-face{font-family:'Cinzel';src:url(data:font/woff2;base64,…)}`. Measured: **Cinzel 25,904 B woff2 (34,540 B base64) + Cinzel Decorative 15,488 B (20,652 B base64) = 41,392 B raw / 55,192 B base64**, inside a 58,087 B file.

**So the offline cost of the beauty direction is a fixed ~54 KB, identical in both arms, and the pattern to copy is the brag card, not w89.** Neither scaffold has any font asset (F1), so today both arms would either link the CDN (offline fail) or fall back to a system serif (beauty fail).

**Receipt:** `grep -noE "(fonts\.googleapis|@font-face|Cinzel)" w89.html`; the python base64 decode of `brag.html`.

### F6 — correction to my own draft: MUSE's token file is live w89 **except one token**, and the trap is that w89 contains a superseded palette that looks authoritative. `risk, resolved` · VERIFIED (self-refutation)

I first compared `_agents/muse/amused/apps/web/src/lib/design/tokens.ts` (a cascade-resolved w52 extraction) against w89's lines 486–531 and got "5 of 51 light and 5 of 50 dark values stale" — and I was **wrong**: 486–531 is the overridden layer. Composing the cascade properly (later block wins at equal specificity; `:root:not([data-theme=…])` beats `:root`):

- **Light: 51 tokens shared, 1 differs** — `--sub` `#a2687d` (w52) → `#885261` (w59; the file's own comment records "the muted ink deepens one step, 3.7:1 to 5.0:1 on the panels").
- **Dark: 51 shared, 0 differ.**

Everything else — `--bg`, `--panel`, `--panel2`, `--text`, `--rosehair`, the whole `--g*/--b*/--o*/--dr*` gold ramp — matches live w89 exactly.

**Two consequences.** (1) MUSE's file is the right contract and needs exactly one edit; the arms should not re-extract by eye. (2) Anyone who reads w89's CSS top-to-bottom gets the wrong palette, because a superseded cream theme sits at line 486 and the live one at 13616 — which is precisely the trap I fell into, and the reason the extraction must be cascade-resolved (as `tokens.ts` documents) rather than eyeballed.

**Receipt:** the python cascade composition over lines 486–504/505–524/13616–13622 (light) and 525–545/13624–13629 (dark) vs `tokens.ts` `light`/`dark` exports; `grep -n -- "--bg:" w89.html` (last sets at 13616/13624).

### F7 — contrast: the live palette is AA-clean; the superseded one is not. `defect (only if the wrong layer is copied)` · VERIFIED

Computed WCAG ratios (relative-luminance formula, run in `node`):

| pair | ratio | AA body (4.5) |
|---|---|---|
| light `--text` `#8e5566` on `--bg` `#fdf2f6` | 5.27 | pass |
| light `--sub` `#885261` on `--panel2` `#f9e9f0` | 5.24 | pass |
| light `--text` on `--panel2` | 4.93 | pass |
| dark `--text` `#f2e7d5` on `--panel` `#291a24` | 13.54 | pass |
| dark `--sub` `#c99cae` on `--panel2` `#35202d` | 6.34 | pass |
| gold `#ffc43c` on dark `--bg` `#1e1119` | 11.50 | pass |
| *superseded* light `--sub` `#9c6a5e` on `#fcf7f1` | 4.25 | **fail** |
| *superseded* light accent `#c9a24b` on `#fcf7f1` | 2.25 | fail (non-text only) |

So "resemble w89" and "AA on body text" do **not** conflict — provided the live layer is used. The brief's own summary ("dark background, gold palette") happens to name the safe layer. The risk is an arm copying 486–531 and failing contrast while looking plausible.

**Receipt:** the node contrast script (kept in the session log; formula = WCAG 2.x relative luminance).

### F8 — the token layer is large, so it must be extracted, not eyeballed. `risk` · VERIFIED

`grep -oE "#[0-9a-fA-F]{6}\b" w89.html | sort -u | wc -l` → **190 distinct hexes**. The two-mode token block alone is ~51 variables per mode, plus ~20 team-remap variables and a 32×3 colour map. A per-arm reimplementation from screenshots cannot converge on that; two arms would produce two palettes and the visual delta would be uninterpretable.

**Receipt:** the grep count above.

### F9 — the house rules already diverge from the trees in both repos, so a design review cannot trust the docs alone. `risk` · VERIFIED

- Vue `AGENTS.md` names `@lucide/vue` and `lz-string`; `package.json` installs neither. Runtime deps present: `@tanstack/vue-table ^9.3.1`, `pinia ^4.1.0`, `@vueuse/core ^15.0.0`, `vue`. Icons are part of the visual language: an arm without the icon package hand-rolls SVG or reaches for emoji, and the look diverges.
- Svelte `AGENTS.md` names `lucide-svelte`, `@tanstack/svelte-table` and `lz-string`; the Svelte `package.json` has **zero runtime dependencies** (dev-only: svelte, vite, vitest, playwright, svelte-check, typescript).

**Receipt:** `node -e "…Object.keys(p.dependencies)…"` against both `package.json` files.

### F10 — neither arm is configured for offline output, and the cause is known. `risk` · REPORTED (my earlier receipt) + VERIFIED (config absence)

Both `vite.config.ts` files are minimal (Vue: `vue()`, `vueDevTools()`, `@` alias; Svelte: `svelte({compilerOptions:{runes:true}})`). Neither sets `base`, a singlefile plugin, or an output format. From my session-2 receipt (in my lane file): **the `file://` defect is the module `<script>` plus the stylesheet `crossorigin` attribute — not Vite and not a framework property**; the fix that works is `vite-plugin-singlefile` with `format:'iife'` and a classic `<script defer>` tag (one 40,545 B HTML, 133 ms). If either arm's deliverable must open from disk, that config has to land **before** slice 1, or both arms rediscover it and one of them will "fix" it in a framework-specific way that contaminates the comparison.

**Receipt:** `cat fe-vue/vite.config.ts fe-svelte/vite.config.ts`; lane file §1 (offline receipts).

---

## Recommendation

**R1 — one shared design contract, framework-free, consumed verbatim by both arms.** Adopt `_agents/muse/amused/apps/web/src/lib/design/tokens.ts` (4,443 B, plain TS, cascade-resolved, `tokens.test.ts` alongside it) with **one edit**: light `--sub` `#a2687d` → `#885261`. It is already proven portable — `tokens.ts`'s own header says both the SvelteKit app and a React proof-of-portability consume it, and it is the only in-repo artefact that resolves w89's cascade correctly (F6). This is the single change that makes the arm comparison interpretable: with the tokens identical, a visual delta is attributable to the framework.

**R2 — fonts: inline, never link.** Embed Cinzel 700/900 + Cinzel Decorative 700 as base64 `woff2` in both arms (the brag card's pattern; 55,192 B base64 measured, F5). Default on **Bodoni Moda: drop it** — it appears in w89's stack only as a middle fallback, is not in the brag card, and the body stack in both w89 and the brag card falls to system sans anyway. Cost of keeping it is a third embedded face for no measured benefit. (Owner call, one line, F5.)

**R3 — team colour: one mechanism, w89's.** Implement the `ZPB_TEAM_COLORS` map + a `[data-team]` remap of the accent tokens (F3), not a flat `--tc`. If a hero moment wants a single flat colour, derive it from the map (team primary), never as a second source of truth. Note for the record: the brief's `--tc` came from the brag card, which is a standalone artefact with one team.

**R4 — decide the mode before slice 1, and default to building both.** w89 is two-mode with light as the shipped default (F4). The token file already models both, so the marginal cost is one `data-theme` toggle; the cost of retrofitting a second mode into a dark-only build is a restyle of every component. Recommend: both modes from day one, light default, `prefers-color-scheme` honoured — which is what w89 does.

**R5 — add a design gate to both definitions of done.** Four checks, all command-checkable, none needing an eyeball:

| gate | check | fails when |
|---|---|---|
| **G1 token discipline** | scan `src/**/*.{vue,svelte,css,ts}` for a hex literal outside the token file (allowlist: the token module) | a component hardcodes a colour — the exact mechanism by which two arms diverge |
| **G2 font + offline** | build, then in a Playwright context with `offline: true`: assert `document.fonts.check('700 16px Cinzel')` and zero requests whose host is not localhost | the CDN link creeps back (F5) |
| **G3 two-mode, 390 px** | screenshots at 390 and 1280 in light and dark; assert `document.documentElement.scrollWidth <= 390` | a single-mode build, or sideways scroll |
| **G4 contrast** | for every text token against its background token, computed ratio ≥ 4.5, with a named exemption list | a palette copy from the superseded layer (F7) |

G1 is the one that protects the experiment: without it, "the Vue arm looks different" is unattributable.

**R6 — configure offline output in both `vite.config.ts` now** (F10), before slice 1, identically in both arms.

## For the Owner (two decisions, each with a default)

1. **Which mode is the target?** Default: both, light default, as w89 ships (F4, R4). Blocked meanwhile: nothing — tokens cover both; only the hero's default look waits.
2. **Bodoni Moda in or out?** Default: out (R2). Blocked meanwhile: nothing.

## What I did not do

- Did not run either scaffold's dev server or build (`npm install` not attempted); F1/F2/F9 are from the trees and manifests, which is sufficient for a design review, and F10's build half is REPORTED from my session-2 receipt rather than re-run here.
- Did not judge whether the *engine* can feed the team-colour map (out of scope).
- Did not review any slice, because no slice exists in either repo (both trees are stock scaffolds — F1).

PRIORITY+: P1 · Design contract + design gate for the two fresh-start framework arms (Vue `kozikosi/football-sim-vue` @ `6b4de5c`, Svelte `kozikosi/football-sim-svelte` @ `86ba632`) · owner: framework comparison must compare frameworks, not two designs · deliverable: one framework-free token module (MUSE's `tokens.ts` + the `--sub` fix), the two inline `@font-face` blocks, and the four gate scripts in both repos · evidence: `inbox/20261115-1332-ernie-vue-svelte-design-contract.md` · source: council prompt 2026-11-15 (Owner beauty direction: w89 resemblance) + F1–F10 above