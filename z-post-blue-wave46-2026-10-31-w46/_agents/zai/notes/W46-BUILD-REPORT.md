# W46 BUILD REPORT — the build chain, byte by byte

Base: `Football-Sim-Z-post-blue-w45.html` · md5 `9990aa033b94a34aaf3c2a2a5d844fef` (asserted).
Output: `Football-Sim-Z-post-blue-w46.html` · md5 `f00995d07298836bd2bb47cd8b5e1aa7` · 1,524,302 chars.
Build: `tools/zpb_v46.py` (asserted exact replacements + the acorn dash sweep + post checks) —
one command, deterministic, re-runnable against the w45 bytes.

## The asserted replacements (26)

| # | What | Where |
|---|------|-------|
| O1 | ANCHOR chip light fill/border softened (`#f2dee6`/`#cfa3b5`) | zpb-w32-css |
| O2 | glossary positions rewritten: one line per family, dot separators | zpbGlossPositionsHTML |
| O3 | glossary extra-entries `<li>` separator dot | zpbGlossHTML |
| O6 | "Position rank counts…" line deleted | zpbDraftBreakdownHTML |
| O7 | `${hostId}Advice` swapped to `zpbFrontPickHTML` | lineupEditorHTML |
| O7 | `window.zpbFrontPickHTML` added (the two mini fronts, DT2 vs ILB2) | new fn |
| O7 | the retired advice function deleted from source | — |
| O7 | front-pick CSS (`.zpb-frontpick/.zpb-fp/.fp-dl/.fp-lb/.zpb-fp-on`) | zpb-w42-css tail |
| O5 | map cascade `*0.5s → *1s` | zpb-w42-css |
| O5 | depth panels `*0.15s → *1s` | zpb-w42-css |
| O5 | the map's look-gate releases its sibling `.zpb-dbk-g` on the same clock | zpbWireLookIn |
| O8 | `colOf`/`colOf2` → `dark ? txd : txM` (2 copies) | zpbGameReplay, zpbLastDrivesHTML |
| O8 | header score chips `--scA/--scH` → txM/txd | zpbGameReplay header |
| O8 | `.zrl-team` wears `colOf(side)` — 6 render sites (report, TO, blocks ×2, 4&O, 3&O) | zpbGameReplay + zpbLastDrivesHTML |
| O3 | the final whistle's `<i>-</i>` → `<i>·</i>` | zpbGameReplay finish |
| O8 | SB final abbreviations → `txd` (×2) | Super Bowl stage |
| O8 | `unitComparisonHTML(poolA, poolB, nameA, nameB)` + neutral row vars on the winner cells | fn + 2 callers |
| O4 | the lineup-cell/pcard shimmer gradient → gold3↔gold2 (the cream bands retire) | zpb-shm block |

## The dash sweep (O3)

`tools/zpb_v46_nodedash.js` parses each `<script>` block with **acorn** (ecmaVersion 2022) and
rewrites dash characters ONLY inside string-literal contents and template-literal quasis:
` — → ·`, bare `— → ·`, `– → ·` (spaced when between alphanumerics), ` - → ·`, `\u2014/\u2013 → \u00b7`.
The non-script regions go through a conservative HTML pass (text nodes + attribute values only;
`<style>` content is never touched — CSS has no visible text here).

- **343 replacements in 329 literals** (spaced em dashes 160, bare empty-state markers 41,
  en dashes 62, spaced hyphens 4, `\u2014`/`\u2013` escapes 76) + **1 attribute** (the wordmark's
  aria-label) = **344**.
- Post-checks: a second pass finds nothing (fixed point, both passes) ·
  `tools/w46_verifydashes.js` re-parses all 10 blocks and asserts **0 dashes remain in any
  literal** (341 occurrences examined, all in comments/code) · `node --check` passes 10/10.

## Kept, by design (the report he asked for)

- Hyphens inside compound terms: **20-0** (wordmark, marquee, aria-labels), **4-3 / 3-4** (fronts,
  toggle, guide), **man-to-man**, **2-Pt**, **hidden-yards** — word parts, not punctuation.
- Comment prose in JS/CSS (~350 dashes in source) — never rendered.
- Arithmetic minus in code — never rendered.

## Verify chain

| Suite | Result |
|---|---|
| `w46_live.js` (both themes, fresh asserts) | **29/29** |
| `w45_live.js` on the w46 bytes (full season drive) | **42/42** |
| `w44_live-w45check.js` | 27/32 — the 5 fails are the superseded asserts (vivid header-score ×4, 0.5s cadence ×1) |
| `w43_regress_stress-w45check.js` | 38/43 — the 5 fails are the vivid `--scA/--scH`/Team-Stats inks this wave retires |
| `w42regress_stress-w45check.js` | 50/52 — the 2 fails are the vivid header scores |
| `node --check` | 10/10 blocks |
| console errors | zero (w46 suite, w45 full-season drive, during-game synthetic drive) |

Evidence: `_agents/zai/notes/evidence/w46_*.png` (rankings light with the softened chip, the
comparison in both themes with every 90+ gold, the front-pick strip, the during-game screen with
the halfway abbreviations and dot scores).

## The mobile pass (rev 2, same chat)

Audited at 390px and 360px (light + dark), every tab plus the full draft flow, live DOM.

- Touch floors on phones: footer nav 26→44px · draft slot/pick selects 18→44px · `.tabbtn` 40px
  · `.resetbtn` 44px · Table/Cards + spot chips + sort chips 36-38px · 4-3/3-4 and roster view
  toggles 34px. Zero sub-34px targets remain in the live audit.
- Inputs/selects read 16px on phones: iOS Safari stops auto-zooming into fields.
- The pill nav on touch devices: sticky bottom (safe-area aware, z-index 30 under the fixed
  overlays), one-row swipe strip with scroll-snap (the story-zone pattern), the tapped tab
  centers itself (coarse pointers only). `contain:inline-size` keeps its min-content out of the
  shrink-to-fit layout viewport (the un-contained strip expanded the phone layout to 680px —
  caught in the re-audit, fixed, re-proven at 390px).
- Micro-label floors on phones: `.zpb-dbk-gh` .66rem · `.zpb-dbk b` .84rem · `.zpb-dbk i` .68rem
  · `.zpb-fm-scrim` .62rem · `.zpb-fadenote` .6rem · ≤430px formation bubbles .70/.52rem on
  33px cells.

Mobile verify: no horizontal overflow on any screen (390 and 360, both themes, all tabs, full
draft flow) · sticky nav proven pinned above its natural flow position on a phone-width window
and `static` on desktop · zero console errors. The w46/w45 suites re-run green on the rev-2
bytes (29/29 · 42/42 · stress 38/43 with the same documented supersessions · dashes 0 visible ·
`node --check` 10/10).

Evidence: `w46_mobile_hub.png` · `w46_mobile_sticky.png` · `w46_mobile_hub360.png`.
