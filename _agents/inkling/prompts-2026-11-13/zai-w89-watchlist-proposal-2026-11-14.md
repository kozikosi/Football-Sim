SPEAKER: inkling | ROLE: council · proposal (Owner rules before it fires) | TASK: conceive the Vue-only-package test — "W89 Watchlist in each shell" | DATE: 2026-11-14 | Audience: KG (Owner) + Z.ai

# INKLING — the test: build the watchlist in the w89 style, twice, with the Vue-only tool allowed where it exists

**Premise restated as a testable question:** does the Vue-only package most relevant to this product's real feature list make the feature *a lot easier* to ship — and can Vue still land the essence of the w89 look, or does it tie yet stumble on fidelity? One new test, two arms, same prompt text, report-only, no gates, no verdict.

## The package: `@vueuse/core@^15.0.0` (first-party, the only real candidate this wave)

**Why this one.** Rejected with receipts: `@tanstack/vue-table` (TanStack has a first-party `@tanstack/svelte-table`; not Vue-only), `pinia` (a second state store — the neutral-store law forbids it), `@vueuse` sibling libs (Vue-only, but they are *development* kits, not product surface), `lucide-vue` (`lucide` ships Svelte equivalents). `@vueuse/core` is **Vue-only with zero Svelte equivalent at parity**, and the product genuinely needs it: typed `useLocalStorage` (watchlist/saves persistence — ad-hoc custom wrappers were explicitly discouraged in the Vue scaffold's own AGENTS.md), `useMagicKeys` (arrow/Enter/Esc navigation on the board), `useOnline`, `usePreferredReducedMotion`. **It is the honest representative of what Vue's ecosystem adds over Svelte's for THIS product**, not a luxury add-on.

**The Svelte side of the comparison.** There is no first-party Svelte substitute — the idiomatic 2026 answer is `$state` + small localStorage helpers + hand-rolled key listeners. That asymmetry is the point: the test measures whether leaning on the Vue-only package produces a genuinely faster/cleaner build — or whether it just moves the idioms, not the count of keystrokes.

## Scope anchors settled by INKLING (byte-derived, not opinion)

The "essence of w89" as actually shipped at `origin/gh-pages` tip `3e69567cd1aa8130cdf74e4bd71488954b58050b` ("Publish w89 as live index"), from the bytes:

```css
/* palette (top 15 by frequency) */ #d9a94c ×48 #e8c87e ×31 #2c1e0c ×31 #c9a24b ×26 #e6c67d ×25
                                    #ffffff ×21 #fffaf2 ×21 #FFFFFF ×20 #c97a8e ×16 #ffc43c ×10 #f2e4c8
/* type stack */ font-family:'Cinzel','Bodoni Moda',Georgia,serif  ·  'Cinzel Decorative' opsz:wght screen titles
/* texture */    592 background/gradient declarations; `zpb-shine` sheen used 3× + ~60 "shine" hits; 97 "shimmer" hits
/* chrome */     PRE-LINE/SPLIT structure (two panes), no white text, navy-espresso deep ground, gold champagne accents, star/shine sweeps on 90+ names
/* behaviour */  hover ligatures around COMPACT sort menus, pick labels in team colour, palette-everywhere text, no emoji in badges
```

(Exactly those counts, from INKLING's byte grabs this afternoon; nothing here is inferred. The full w89 stays untouched.)

## The test (proposed design — one prompt, two arms, report-only)

**Starting state (fresh, no archaeology):** fresh extraction of `z bench1 run v1` arms (`arm-vue-pub`, `arm-svelte-pub`) — or fresh copies of the same published fwtest-9 arms. Engine copied byte-identically (boundary holds). **`.nvmrc`/Node recording per the Node-26 vs pin-24 law; `.mcp.json` never added.**

**Feature (identical prompt text both sides) — "Star Pets on the W89 Board":**

1. Star toggle per row (`data-testid="star"`), watchlist = set of player ids, persists via key `w89-watchlist`, survives reload, rows restored as starred.
2. Filter control (`data-testid="filter-watchlist"`) showing ONLY starred players; counter (`data-testid="watchlist-count"`) showing starred count.
3. **In the w89 essence:** rows/chrome/sections rendered with the extracted tokens above — Cinzel/Bodoni display face for names, deep espresso ground (#2c1e0c family), champagne gold body text (#e6c67d/#fffaf2), `zpb-shine`-style sheen on starred/90+ names, star button matching the shimmer family (gold, not emoji), board container still within 390 px without horizontal scroll.
4. DOM contract preserved (board-row, sort-*, filter-pos, pick, roster-panel), zero console errors, build exits 0, type-check exits 0 (vue-tsc -b / svelte-check as applicable).
5. **Vue arm may `npm install @vueuse/core@^15.0.0`** and is expected to use it (`useLocalStorage` mandatory; `useMagicKeys` supp.) — log where you used it and what it deleted vs the Svelte hand-made parts. **Svelte arm gets no such install** (it may add nothing new beyond its published deps; idiomatic runes + plain JS only).
6. **Verification + logs required from each instance** (per the Lane B/D pattern already proven): `watchlist.test.mjs` (load → star ×2 → reload → assert stars → filter → assert filter applies → assert count), `npm run build` exit code, `REPAIR-LOG.md` appended in real time — one entry per error (verbatim text), count of repair cycles, elapsed time, first-error of each distinct class, one paragraph per arm on what was hardest and why.
7. **Screenshots for review** at 1280×800 and 390×844: the board with a starred-90+ row and the watchlist filter active.

**Reports only — never comparisons by INKLING:** repair cycles; wall minutes to green; exits; first-class error texts (agent-language experience thickness is data); side-by-side screenshots for the Owner's eye; G5/VM counts not re-implied (same VM, identical behaviour expected); any build warnings both arms received.

**Non-goals / boundaries:** no framework verdict text anywhere in filings; no new arms; engine untouched; w89 itself never edited/forked; no ratings changed; no public repos touched; no FLEX involved; `@vueuse/core` never leaks into Svelte markdown; the deliverable is a handoff package under relay publication (v1/v4 pattern).

**What INKLING needs from the Owner before firing (answer in words, not negotiation):**

1. **Scope lock:** draft-board star watchlist only, or also the awards/recap screen? (recommended: board only; the awards screen re-introduces subjectivity you can't test in one chat.)
2. **Reference truth:** w89 tip `3e69567` is the style reference — confirm.
3. **Judge:** screenshots to you, blind pair to one seat for written ergonomics comparison (say which seat, if any; or you alone).
4. **Gate vs show:** is this lane part of the framework evidence for your future decision, or pure ergonomics study? (recommended: the latter; say so in Z.ai's brief.)
5. **Budget/limit:** two subagent runs, one chat, ~2-3 h, zero network beyond npm — confirm or extend.
6. **Deliverable shape:** `download/w89-watchlist-2026-11-14/` handoff (DESIGN.md + receipts + REPAIR-LOGs + screenshots + MANIFEST), relayed and published to `council/inkling` — confirm.
7. **If it ships before BENCH-1 ratification:** do you want Z.ai ALSO to run it under the BENCH-1 §report-only discipline (interleaved, 3 warmups), or as a qualitative Lane B/D only? (qualitative is fine; adding the protocol inflates cost for little signal.)
8. **Node environment:** same sandbox caveats apply (`nvmrc=24` vs his Node 24.22.3, one Chromium, no root) — acceptable, or should this run on your machine? Your machine needs the downloads; his does not.

**When those eight come back, INKLING hands Z.ai the composed prompt; it does not fire before.**

Labels: VERIFIED (w89 byte grabs, arm manifest, arm manifests, @vueuse absence in bench arms) / REPORTED (Z.ai's own run-1/run-2 vs published arms) / INFERRED (which package is "representative") / UNKNOWN (whether this is evidence you will weigh, or a gift).

— inkling
