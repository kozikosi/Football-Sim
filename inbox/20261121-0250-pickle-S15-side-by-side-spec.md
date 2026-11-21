SPEAKER: pickle | ROLE: council seat | TASK: exact side-by-side acceptance recipe for the S15 cutover | DATE: 2026-11-21T02:50Z
FOR: S15 (supplementary work order item 4)

IDEA: the Owner requires a FILED side-by-side against live w89 before make-live. This is the recipe so it can be executed the moment a gated build exists. I coordinate the filing; this file says what to capture and how to judge it. No images in lanes — paths and receipts only.

## Sides

- **LEFT (reference):** live w89 — `https://kozikosi.github.io/Football-Sim/Football-Sim-Z-post-blue-w89.html` on `origin/gh-pages`. The bytes I verified this sitting at `:12849-12856`, `:1749-1751`, `:6429-6433` are the visual contract: every board Draft button breathes `zpbBtnPulse 1.5s`; the three CTAs opt out with `animation:none` and get the sheen + **separate TOP badge**; panels use `var(--glass)` / `var(--glassbd)` / `22px` radius / `var(--shadow)` / `blur(14px) saturate(1.2)`. "Directionally similar" is a FAIL.
- **RIGHT (candidate):** the S15 tree's `dist/index.html` served locally, or the Cloudflare preview alias per `inbox/20261121-0248-pickle-CLOUDFLARE-counsel.md` IMPROVEMENT 2.

## Screens — four, at both viewports, both themes

| # | Screen | How to reach it | What is being judged |
|---|---|---|---|
| 1 | Team Select | fresh start | cards, selection state, CTA; corner singularity and run-stopping identity read correctly |
| 2 | Board with a top-three row | 1 pick into a fresh draft | the three top players are marked in the BUTTON/mock-up, not by a ring; small "why" copy visible for each; no ring visual; the SINGLE visible Draft button dispatches immediately (expander is separate) |
| 3 | Pick confirm | click that button | staged→direct path produces the same done state as w89; TOP badge and sheen placement; no double-dispatch |
| 4 | Finished draft | finish the draft via the battery's seeded path | chronological recaps, every turnover named, game ball, no console errors |

Viewports: **390×844** and **1180×950**. Themes: **light and dark**. That is 16 captures (4 screens × 2 viewports × 2 themes) per side, 32 total. Capture with the browser tool or Playwright at named seeds `a3f2`,`k1x9` so the two sides are comparable; record the seed and URL/state in the receipt.

## Token assertions (assert in code, not by eye)

1. Glass present: computed `--glass`, `--glassbd`, `--shadow` resolve and are applied to panels; `backdrop-filter: blur(14px) saturate(1.2)` (or `-webkit-` equivalent) present.
2. Radius: panel `border-radius: 22px`; smaller callouts 16px — an S14/Cakepanz drift to boxy 8px is a FAIL (Owner 2026-11-21: "panels too boxy and not colorful enough").
3. Color: Cinzel inlined and offline (no remote font request); gold does not drift orange; **no blue panels** (`.ub` blue is for the user's team only).
4. Pulse scope: on the candidate, every board Draft button carries the 1.5s breathe; the three CTAs opt out with `animation:none` and carry the separate TOP badge. If the candidate still pulses ONLY `.cp-suggest .cp-quick`, that is the inverted-glow defect from v8 — FAIL.
5. No horizontal scroll at 390 px on any of the four screens; no console errors on any.

## Pass/fail rule

Per screen, per viewport, per theme: PASS only if all five token assertions hold AND the candidate's meaning matches the Owner's rulings (top-three meaning stays in the button like w89; small "why" descriptions stay; ring visual gone; colorfulness improved, not boxier). Any FAIL is filed with both screenshots named and the exact computed values. The composite side-by-side is ONE file under the Architect's test-order path with the 16 pairs and a verdict; the Owner decides make-live after reading it. I do not make-live, and this seat does not edit the Architect's tree.

## Provenance

The w89 byte contract and the S14 selector sites were VERIFIED this sitting (see `inbox/20261121-0244-pickle-S15-fact-verification.md`). The 16-capture matrix is my INFERRED recipe, not an Owner order; the Owner's actual rulings are the four criteria in the pass/fail rule and the two viewports/he already named.
