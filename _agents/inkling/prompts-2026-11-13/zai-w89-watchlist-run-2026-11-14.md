SPEAKER: KG (Owner) + inkling | ROLE: Z.ai | TASK: run the W89- essence test — the watchlist in each shell, in the Owner's visual language | DATE: 2026-11-14 (the scope expansion supersedes the one-feature reading; explicit per Owner) | Audience: Z.ai only

# INKLING — the w89 watchlist build (expanded): both shells, w89's own style, stretch your imagination

**The ask, plainly.** Build the starred-watchlist interaction in BOTH bench arms from the v1 package (Vue and Svelte), and push each into the **visual essence of the live w89 build** — not an homage, a real attempt made by someone who has read w89 end-to-end. The Owner wants to see which shell hands you a better OR worse canvas for *his* aesthetic — and how far you can stretch without breaking anything. Ambition is explicitly licensed (Owner: "no scope lock; encourage… stretch the limit… mobile optimized always… only make the website more beautiful and dynamic"). Nothing is a verdict here. **Everything in this brief is report-only; the Owner rules on the result by looking, never by being outranked.**

## 0. The blocks (non-negotiable, all short)

1. **Boundary holds:** engine copied verbatim (v1 arms); `boot.ts` shared wiring untouched; published scaffolds and public repos untouched; w89 itself is READ-ONLY reference (you will never write to `gh-pages`); protected constants, FLEX and `DEFAULT_WEIGHTS` untouched; free tooling only (no API keys needed — you have none anyway; no GUI authorization); no state leaks between arms; no wording that ranks the frameworks in any filing or in the UI.
2. **Mobile-optimized, always.** Every screen you design must serve 390 px flawlessly; 1280 px second; the watchlist row hierarchy, the chips, the shimmer — everything fits with no horizontal scroll at 390.
3. **Everything you submit uses labels:** VERIFIED (ran it) / REPORTED / INFERRED / UNKNOWN. Unreceipted beauty claims are the weakest artifact kind in this wave; don't ship them.
4. **No pretending you "did it in the style of w89" while quoting nobody.** Extract the tokens first (below), then spend against them.

## 1. Phase 0 — the w89-quirk inventory, before any code (60–90 minutes)

1. **Fetch the live blob yourself**: `git show origin/gh-pages:index.html > w89.html` (1,922,769 B, tip `3e69567`) — or `curl -s https://raw.githubusercontent.com/kozikosi/Football-Sim/gh-pages/index.html`. Verify `wc -c` = 1922769. **Never commit w89.html; it stays outside the package.**
2. **Build `w89-quirks.md`** — the actual inventory: (a) the palette tokens in use (top 20 by frequency with counts — starter: `#d9a94c` 48, `#e8c87e` 31, `#2c1e0c` 31, `#c9a24b` 26, `#e6c67d` 25, `#ffffff` 21, `#fffaf2` 21, `#fffaf2`, `#ffc43c` 10 …); (b) the type stack in use (`Cinzel`, `Cinzel Decorative`, `Bodoni Moda` opsz fonts); (c) the sheen family (your greps found ~97 "shimmer" / ~60 "shine" / `zpb-shine` 3× + prefixed `shine` classes everywhere; the HOVER state is shine-tinted); (d) chrome idioms that actually appear: section labels, OVR bubble family, badge rules, the dropdown idiom, the 20-0 tag, mobile breakpoint behaviours. **Give byte offsets / line anchors per item** (`grep -n … | head`).
   §2 covers at least 25 quirk candidates — list each, tag it "in scope for this build" / "not this build" / "untestable", and note the count you land.
3. **Ship w89-quirks.md FIRST in the handoff.** No build chapter begins before it exists — honesty-first measure of stretch.

## 2. The build — scope is pushed as far as your imagination + receipts allow

Start files (fresh extraction of `z bench1 run v1` @ `37c15d12`, or the two published fwtest-9 arms; engine verbatim; **published scaffold bytes untouched**; your additions live under `src/bench/`). The feature chain is exactly as in Lane B/D — star testids etc., **extended** to the w89 essence **and then beyond**; implement as much of this as quality permits:

### Core (required, same in both arms)
- Star toggle per row (`data-testid="star"`), watchlist = set of player ids; persists to `localStorage['w89-watchlist']`; restored on load; survives reload.
- Filter control (`data-testid="filter-watchlist"`) restricting the board; counter (`data-testid="watchlist-count"`).
- DOM contract untouched (board-row, sort-*, filter-pos, pick, roster-panel); zero console errors; build + type-check exits 0.
- **Vue arm ships with `@vueuse/core@^15.0.0` installed** (`npm install @vueuse/core@^15.0.0`, free; INKLING has no policy against it here — this IS the test); use `useLocalStorage` (mandatory — you will show the code delta it replaces) and anything else VueUse gives you naturally (`useMagicKeys` for ↑/↓/Enter/Esc Star/Save navigation, `usePreferredReducedMotion`, `useOnline`). List every VueUse call made and what it replaced.
- **Svelte arm gets NO external state library** (runes + plain JS only; no new deps — the most honest drawdown of "comparable capability").

### The w89 essence skin (required; counts toward the rubric)
1. **`w89-shine`** — CSS analogue of `zpb-shine`: gold glint sweeping over starred 90+ rows' name and OVR bubble, CSS-only (`::after` + gradient animation ≈ 90 ° sweep, ~1.6 s, `prefers-reduced-motion` respected).
2. **OVR bubble family in gold** — 85+ vibrant gold; 90+ with the sheen (immediate, always, not hoverable).
3. **Cinzel Decorative caps** for the board header "DRAFTING — ROUND n" and the watchlist chip "WATCHLIST · N" (both `letter-spacing: 0.08em`, gold `#e6c67d` opsz).
4. **Star icon** — inline SVG gold star; a filled/empty pair; hex `#ffc43c` for filled, outline `#c9a24b` for empty. No emoji.
5. **Palette discipline** — not a single `#ffffff`/white/pure-`#fff` anywhere you author; palette entries used with counts (`#fffaf2`→"cream", `#f2e4c8`→"champagne"), and the **espresso deep ground** (`#2c1e0c`/`#1f140c`-ish); gradients take over the body-vs-card contrast like w89.
6. **Any OTHER quirk from your inventory file that you can plausibly render** — implement, tag each with the leap-line budget it took; honest log of what was SKIPPED and why (inventing statlines/UI pieces you cannot honestly port is banned; “possible but w89 uses a code in 2,400 rows I didn't read” is a legal skip-reason).

### Stretch targets (optional, logged; your imagination counts, receipts decide whether they ship)
- **CAN YOU GO 20-0?** shimmer on the board header (the Owner's favourite jingle; CSS-only, animation must not block input on the board).
- **Team-colour user-team name** in the w89 gold-and-team-colour juxtaposition (32 teams' palettes fine to replicate in-band by reading the w89 bytes for team-colour values, or every-easy approximation flagged INFERRED).
- **Depth-chart badge language** for positions on rows (DE1/SS/QB badges in the w89 badge shape; no emoji; badge counts quoted).
- **Dropdown idiom** for the sort header (the w89 dropdown-house look — bordered gold-on-espresso, Cinzel labels).
- **Watchlist quick-view strip** — a thin gold strip below the header, showing starred players' names · pos · ovr in Cinzel, horizontally scrollable at 390 (no page scroll).
- **One sincere experiment nobody has tried** — your call, logged as "Stretch-N": something nobody has built yet for the live build this week (e.g., a truly dynamic "on-the-clock" label sweep; or 90+ OVR bubble in the user-team palette; or the pick summary "R1.03 — BA brought in the first pick" re-skinned like a Fellini title card). Slow it down, benchmark it, log restore behaviour.

## 3. What you file (handoff; same pattern as v1/v4)

- `w89-quirks.md` (the extracted inventory), `WATCHLIST-Z.ai-DRAFTING.md` if your design drifted, receipts/ (raw JSONs: build/e2e logs, screenshots `"1280x800-starred.png" "390x844-starred.png"` both arms — same file names), `REPAIR-LOG.md` per arm (real-time append, verbatim errors), `w89-essence-checklist.md` — a checkbox matrix 25+ items, each marked landed/best-effort/skipped with byte offsets for landed items.
- Handoff package under `download/zai-w89-watchlist-run-2026-11-14/` + `MANIFEST.txt` sha256 — same path protocol as v1/v4, relay published (no credentials; expected exit 128).
- **DO NOT modify w89.html; do not commit it anywhere; delete it in your scratch after the run or keep outside any git.**
- Report defending only what you measured: per-quirk landed counts, build times, bytes, screenshot paths, repair cycles, elapsed-to-green per arm. No framework claim in your summary; the final sentence is always "decision: the Owner's."

## 4. Verifications you MUST produce before claiming done

1. `npm ci` fresh in both arms (existing lockfiles only — no new deps in Svelte; Vue gains only @vueuse/core, lockfile updated there).
2. `npm run build` exits 0 (both arms). vue-tsc -b exits 0 (vue). `svelte-check` exits 0 (svelte).
3. Playwright: seed-star 2 players → reload → assert stars persist → activate watchlist filter → assert only starred rows render → assert counter value → no console errors anywhere in the flow. Script named `watchlist.test.mjs` in each arm; output pasted into receipts.
4. Screenshots at both viewports, both arms, same flows.
5. G5 round-trip (DOM rows text == engine VM text) skipped only because tier already established — if you touch any shared/board render path, RE-RUN the check.

## 5. What "done" looks like

Watchlist survives reload in both arms; 100% of required quirks land with receipts; screenshots readable by any owner at a glance; DESK count of honest skips ≥ honest landings — you decide with your receipts what ships; **the website is more beautiful and more dynamic than before for the same engine** — that is the actual deliverable, not a verdict on the framework that got you there.

## 6. Phase 0 note — the two missing artifacts from BENCH-1 v1

Separate file enroute (`zai-missing-artifacts-2026-11-14.md`); handle there. This brief covers the W89 essence run only.

Labels: VERIFIED (commands + offsets) / REPORTED / INFERRED / UNKNOWN. Errors under 4 hours per arm are shipping notes; over — log and skip. STOP if the w89 bytes won't fetch (file the block: file-size discrepancy from 1,922,769 B ends the build with UNKNOWN and a filed receipt).

— inkling for KG (expanded scope per Owner 2026-11-14: no scope lock; stretch is licensed; only more beautiful and more dynamic)
