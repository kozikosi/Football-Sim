# Z-POST-BLUE — build report (v2, consolidated)

**SEAT: Z.ai (High Councillor) | DATE: 2026-10-25 | TASK ID: Z-POST-BLUE**
**Deliverable: `Football-Sim-Z-post-blue.html` (worktree root, 696,346 B, sha256 `32192ecc…`)**
**Netlify-ready folder: `_agents/zai/deliveries/z-post-blue-netlify/` (index.html + README.txt)**
**Reproducible build: `_agents/zai/tools/zpostblue_build.py` (every replacement exact-match and asserted; aborts on any mismatch)**

> Record note: this file was renamed from my earlier report name and its content fully
> rewritten on 25 Oct. My first-session prototype (preserved, content-frozen, at
> `_agents/zai/snapshots/Football-Sim-Z-pre-blue-superseded.html`, sha `66c49504…`) is
> referred to everywhere as **Z-pre-blue** — its screenshots live in
> `_agents/zai/evidence/z-pre-blue/`. Z-post-blue v2 supersedes it and the v1 Z-post-blue
> pass; `_agents/zai/deliveries/Z-POST-BLUE-REPORT.md` (v1 report) was merged into this
> document and removed.

## 1 · Lineage and rules kept

- **Base:** `_agents/pickle/builds/Football-Sim-PreColors.html`, sha256 `40233d6b…`
  verified by the build script before any edit. Nobody else's file touched; Claude's
  builds remain read-only and byte-untouched.
- **Protected invariants byte-verified unchanged** across 10 markers
  (`DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, PLAN_K, RATING_SPECS, slotWinsPerOvr,
  optimalLineup, effOvr, MC2027, function optimalLineup`) — before/after counts equal.
- **Owner rulings respected:** English-only everywhere; file names keep the "Football Sim"
  family; product identity is "20-0"; all changes are UI/copy only — zero game math.
- Post-checks recount every branding token from the build payloads themselves; a
  team-color parity step verifies all 32 franchise names against the base's `TEAM_DATA`
  keys before anything is written. `node --check` passes on both inline script blocks.

## 2 · Identity & copy (unchanged from v1)

`<title>`/og:title/footer brand → **20-0**; masthead wordmark **20-0** with tagline
*"Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"*; guide season bullet and the
draft-review line carry *"Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"*;
meta description carries the motto. CTA is **DRAFT**.

## 3 · Home page (Owner directive: strip it, then the guide fades in)

The home stage is now **open air**: no heading, no paragraph, no labels, no panels.

- The only visible elements: the glowing orb + serif **20-0** wordmark (with three
  liquid-gold drips falling from it), the **moving 20-0s marquee** in the header band,
  two label-free selects (team + pick number, `aria-label`ed for accessibility), and the
  **DRAFT button**.
- **Marquee (VL pattern, executed per the Owner's directive):** two overlapped tracks of
  `20-0 · 20-0 · …` in Bodoni serif drifting in opposite directions at different speeds;
  seamless loop via duplicated track content and a ±50% translate animation; edge fade
  mask; hairline top/bottom borders; visible only on the home stage
  (`body[data-home]` gating driven by `zpbSyncHome()`); static single layer under
  `prefers-reduced-motion`.
- **DRAFT button:** set in **Cinzel** (Google Fonts, with Bodoni Moda also loaded so the
  wordmark is true Bodoni on non-Apple systems), 900 weight, wide tracking, animated
  liquid-metal gradient sweep **plus a specular sheen sweep** (the "effect to the left" is
  gone — the button itself shimmers). Hover lift + glow; ≥44 px mobile target kept.
- **Guide:** removed from the home stage (opacity 0, shifted down). It **fades in from
  the ether** — an IntersectionObserver plus a scroll guard (`scrollY > 100`) reveal it
  only once the user has actually scrolled toward the footer; the reveal resets when a
  new draft setup is opened. The separate Guide tab keeps working untouched.

## 4 · Team-color takeover (Owner directive)

When the user selects a team and starts the draft, the **entire project re-tints to that
franchise's three brand colors** (council table: `figma/team-colours.json`, GPT's 22 Oct
NFL brand reference, keyed to the sim's exact team names).

- `zpbApplyTeamTheme(name)` computes a **display pack** per franchise: the brand **primary**
  leads the identity; every derived tone is hue-preserving (darker or paler, never grey) and
  contrast-checked (`zpbReadable` targets ≥4.6:1 for accents, ≥7:1 for body text, against
  both the light `#fcf7f1` and dark `#181114` backgrounds — light *and* dark variants are
  computed and swapped by CSS).
- Tokens are set as CSS custom properties and consumed by the `[data-zpbteam]` override
  blocks: accent, secondary, tertiary, text, sub-text, hairlines, glows, auras, background
  tint, orb, drips, marquee, buttons, focus rings — the whole identity. Neutrals stay
  white; **no black or grey text in either mode**.
- Edge cases decided: teams whose primary is non-chromatic (Raiders) get their most
  chromatic brand color warmed toward rose-gold for UI tones while **chips always show the
  true 3 hexes**. Brand colors that are too light for white-on-color text (Steelers gold)
  are darkened just enough for legibility.
- Starting a new draft (`startNewDraftFlow`) clears every token and restores the default
  rose-gold identity.

## 5 · Draft board — franchise frames + "Flex x (-y)"

- **During the draft**, every player on the board (table rows and card rows), every
  recent-pick line, and the roster sidebar are framed by their **real NFL team's true 3
  brand hexes**: a 3px franchise-colored edge, a faint two-tone wash, and a **3-dot color
  chip** rendered from the exact hexes next to the team abbreviation. Each row carries
  light/dark variable pairs so frames stay correct when the theme flips.
- **After the draft completes**, my roster (starter table, depth chart, lineup editor
  context) is framed in **my selected team's colors**, while any other franchise's roster
  (draft-results detail panes, starter-by-starter lineup tables, team comparison) is framed
  in **that franchise's colors** — verified live: my Chiefs red next to the Rams' blue in
  the same view.
- **"Fits as" is gone.** The board now says exactly **`Flex x (-y)`** — e.g. `Flex WR (-4)` —
  in the Fills column, the priority chart, the slot-change dropdown, and the lineup
  "flexed" note (Owner's format, ASCII minus). The "also fits: …" secondary line was
  removed entirely; the FLEX VALUE badge remains (it contains no "fits" wording).

## 6 · Carried forward from the v1 pass (unchanged behavior)

Open-air masthead; all 65 `.panel` surfaces as glass hairlines; pale rose-gold light mode
(`#fcf7f1`, espresso-rose text) and espresso dark mode (`#181114`, champagne text — no
black text); ☾/☀ toggle persisted at `localStorage['zpb:theme']` with a no-flash head
script; drifting background auras; player browser at **15 rows/page** with pill pager
(sort/filter data flow untouched, verified 1200 players → 80 pages); clickable 20-0
wordmark returns home (click/Enter/Space); `prefers-reduced-motion` freezes every
animation; mobile 390 px verified.

## 7 · Verification (all green, this build)

- `node --check`: both inline script blocks parse clean; payload brace balance asserted.
- Headless Chromium (agent-browser), **zero console/page errors** across the whole session:
  home state (marquee 36 spans, tagline/stepper/heading/motto/labels absent, Cinzel loaded);
  guide hidden at load → fading in (0.69 opacity) 400 ms after a 600 px scroll;
  DRAFT (Chiefs) → `data-zpbteam` set, accent `#dc1735`, text `#a51128`, 1143 board rows
  + 1143 chips framed, `Flex CB1 (-4)` format, old flex wording absent;
  Sim to End → Draft Complete; Your Roster tab: 26 starter rows + 26 depth rows framed
  `#dc1735`; Vs. Actual NFL Teams: Rams detail framed `#003594` beside my `#dc1735`;
  dark mode: accent `#eb3e59`, Rams border `rgb(46,121,255)` (dark twins swap), no black text;
  Team Comparison: 48 lineup cells in two franchise colors; "Start a new draft" → tokens
  cleared, accent back to `#c9a24b`, guide re-hidden, marquee restored, home stage back.
- Evidence screenshots: `_agents/zai/evidence/z-post-blue/v2-home.png`,
  `v2-home-full.png`, `v2-roster-chiefs.png`, `v2-roster-dark.png`, `v2-mobile-home.png`
  (plus the v1 set for the carried-forward surfaces).

## 8 · Executive decisions on discrepancies (as instructed by the Owner)

1. **Engine color = brand primary first.** Pure saturation ranking made Kansas City read
   gold (their gold is more saturated than their red); the Owner's "those colors" means
   the franchise identity, so the primary leads unless it is non-chromatic.
2. **"Flex x (-y)" applied globally** — priority chart, slot dropdown and the lineup
   flexed-note too, not just the Fills column, so no old format survives anywhere.
3. **Guide scroll guard:** the guide sits high enough on tall desktop viewports that a
   bare IntersectionObserver revealed it instantly; the reveal additionally requires
   `scrollY > 100` so the home stage stays clean until the user actually scrolls.
4. **Stepper hidden only on the home stage** — Draft/Season/Playoffs/Champion labels were
   on the Owner's removal list; they still function as the progress indicator on every
   other view, and the tagline returns there too (identity off-home, minimalism at home).
5. **Marquee adopted per the new directive** (v1 had declined it); implemented VL-pattern
   but restyled to the Z-post-blue serif/rose-gold system, home-stage only.
6. **The line-3 `[hidden]` selector** in the base was proven correct on 25 Oct (my earlier
   "corrupted selector" claim was a tool-display artifact, struck in Q-ZAI-2) — left untouched.

## 9 · How to deploy (Owner)

Drag `_agents/zai/deliveries/z-post-blue-netlify/` onto <https://app.netlify.com/drop> —
done. No build step, no dependencies; the folder is the whole site. The standalone
`Football-Sim-Z-post-blue.html` is byte-identical to the folder's `index.html` (fonts load
from Google Fonts when online; the app falls back to Didot/Georgia offline).

## 10 · Known notes

- `draftStatusText` keeps the last "on the clock" string after completion (base behavior;
  "Draft Complete" is the real signal).
- `renderDraftResults` ranking tables list franchises as text rows (uncolored) — player
  surfaces are the colored ones, per the directive's wording.
- Web fonts are a progressive enhancement; first paint never blocks on them.

## 11 · Third wave (shipped this session, sha256 `08e6c43d…`, 696,022 B)

Owner directives executed 25 Oct after the REV 3 handoff review:

1. **Footer 20-0 removed.** The `footlabel` span is gone from the footer nav entirely
   (executive call: removing beats restoring the old "More" label — one less word, same
   minimalism). 20-0 remains in the title, og:title, meta description, hero wordmark,
   header marquee, and the Owner's mandated season/draft copy lines. Build post-check
   recount: 12 literal "20-0" tokens, auto-asserted.
2. **Way less text on every page** (own take on VL's KC game-preview v8 + the Glyph
   homepage guidelines — principles absorbed, nothing copied: meters stand alone,
   floating entities, transparency, and the guide keeps the long explanations so the
   surfaces don't have to). Asserted replacements, all count-verified:
   - Draft board: the 48-word "Pick priority" explainer paragraph **cut entirely** — the
     meter stands alone (VL v8 principle); priority rows trimmed from
     `Player (93 OVR) · +1.31 wins here · priority +0.38 · 100% chance he is gone by your next pick`
     to `Player (93) · +1.31 wins · 100% gone by your next pick`; "You're on the clock" →
     "On the clock".
   - Season page: 60-word preseason paragraph → one line ("Three optional settings,
     preselected with recommended values. Philosophy and aggressiveness lock at Week 1;
     lineup and returner stay editable."); group-scores parenthetical → "(wins added ·
     flex penalties included)"; "a lineup of 70s" → "a 70s lineup"; the optimal-lineup
     note → "No better arrangement exists — within X wins of optimal."
   - **Deliberately untouched:** generated game narration (playoff recaps are content,
     not chrome), the guide (the designated home of longer explanations), all functional
     labels, all Owner-mandated 20-0 copy lines.
3. **Brand-dash defect found and fixed.** The Bodoni Moda webfont paints U+002D as a
   blank glyph (advance width allocated, zero ink — proven by a red-fill pixel scan
   returning 0 hits). The wordmark silently read "20 0" and the marquee read "2000".
   Fix: the hyphen character is kept in the DOM (transparent — accessible name stays
   "20-0") and the dash is **drawn as a gold bar** (`width:.30em · height:.058em ·
   border-radius`, `--g4` light/`--g4` dark on the wordmark, `--rose` on the marquee),
   with per-surface `vertical-align` (.30em hero / .04em marquee) tuned against measured
   baselines. Weight 700 added to the Google Fonts request as fallback insurance.
4. **Palette disseminated.** `deliveries/PALETTE-ADVISORY.md` carries the Owner-praised
   hexes + the six rules that make them work, for council-wide use; bulletin
   M-20261025-zai-5 announces it.

Verification: asserted build all-green (invariants byte-unchanged across 10 markers);
headless Chromium zero console errors through DRAFT (Chiefs) → Sim to End → Start
Season → season page; every trim string asserted absent/replace in live DOM; footer
`footlabel` confirmed absent; wordmark/marquee dash pixel-verified light + dark +
Chiefs theme; 390 px mobile clean. Evidence: `evidence/z-post-blue/v3-*.png`.
Deliverable synced byte-identical (4 copies): worktree root, `deliveries/
z-post-blue-netlify/index.html`, download standalone, download netlify folder.

## 12 · Fourth wave (shipped this session, sha256 `24d7f73a…`, 699,002 B)

Owner directive: (a) the gold 20-0 moves into the bar where the pink 20-0s move — same
size and font, left side, the control that returns to the homepage "which would be the
season if the season has already started"; (b) DRAFT button gets a new font; (c) the
dropdown menus go more rose-gold with shimmering type/color/font.

1. **The site bar (was: home-only marquee).** The 20-0 marquee is now wrapped in a
   persistent `.zpb-bar` rendered as the first child of `.wrap` — visible on every page
   and every tab (previously it existed only on the home stage). Left end: the gold 20-0
   (`<a class="zpb-home">` wrapping the document's `<h1>`), rendered in **Bodoni Moda 600
   at the exact marquee size** (both computed 31.5 px on the default root; 17.6 px on
   390 px mobile), letter-spacing `.22em`, gold shimmer gradient + the drawn gold dash
   (Bodoni Moda's blank U+002D workaround carried over), with the three-stagger
   **dripping-gold animation falling from the wordmark through the bar's lower hairline**.
   Right end: the glowing orb (`.zpb-orb`) relocated from the hero. Between them the two
   pink 20-0 tracks keep their dual-direction drift (edge mask tuned: 14 % left fade so
   the pink ones dissolve before reaching the gold wordmark).
2. **Home routing.** The gold 20-0 click/Enter/Space → `setActiveTab('viewDraft')` —
   draft and season are phases on that one primary tab, so the same control is Home
   before a season and **the season once one is running** (headless-verified:
   home → Players tab → click → lands on the live season view; mid-draft click returns
   to the draft board; post-draft click returns to the draft-complete stage).
3. **Hero becomes empty on home.** The big hero wordmark is gone (moved into the bar);
   with the orb relocated, `body[data-home="1"] .hero{display:none}` collapses the hero
   on the home stage — home = bar + two selects + DRAFT pill + scroll-fade guide. On
   non-home phases the hero shows the tagline and stepper as before.
4. **DRAFT font: Cinzel Decorative** (weights 700/900 added to the Google Fonts request;
   Cinzel retained as fallback and for the selects). The liquid-metal gradient, sheen
   sweep and reduced-motion freezes are unchanged.
5. **Dropdown menus in rose gold.** New `select` layer: `appearance:none`, **Cinzel 700**
   type in **deep rose `#a05a70`** (4.8:1 on the cream canvas; dark mode uses the pale
   rose `#dfa6b4`, 8.4:1), rose wash gradient, rose hairline border, an SVG chevron
   tinted per scheme, and a **breathing rose-gold glow** (`zpbselg`, 4.6 s) as the
   shimmer — chosen over gradient-clipped text because form controls clip backgrounds
   unreliably across engines and an invisible option list is the failure mode that
   matters. `option` lists themed via `--panel`/`--text` in both schemes; team-color
   takeover remaps the select text to the accessible franchise accent.
6. **Bonus defect fixed (self-caught during verification):** base `setActiveTab` calls
   `updateStepper` — which carried my `zpbSyncHome()` hook — *before* toggling the view
   classes, so `data-home` lagged one tab-switch behind. Harmless while the flag only
   trimmed text, but wrong now that it hides the hero. Fix: a `zpbSyncHome()` appended
   to the end of `setActiveTab` (the `updateStepper` hook stays for non-tab updates).
   Verified: Players → home round-trip now lands with `data-home="1"`, hero hidden.
7. **Count erratum:** REV 3/4 prose said "53 exact-match replacements"; the precise
   count of replacement entries in the v3 script was 50 (multi-line tuples miscounted).
   This build has 51 (50 + the `setActiveTab` sync). The asserted build's own checks
   were always the real gate — every entry is exact-match and aborts on drift.

Verification: asserted build all-green (invariants byte-unchanged across 10 markers;
41 post-checks ok); headless Chromium **zero console errors** across the whole session —
home (light/dark/mobile), DRAFT (Chiefs) with full team takeover, mid-draft home return,
Sim to End, Start Season, Players round-trip with season landing, new-draft reset
(theme cleared to default rose-gold, guide re-hidden, marquee color restored); player
browser 15 rows + pager intact; mobile bar 42 px with 1.1 rem gold wordmark. Evidence:
`evidence/z-post-blue/v4-*.png` (home, bar, 4x gold wordmark zoom, 4x marquee zoom,
season-return light + dark, mobile, players-bar). Deliverable synced byte-identical
(4 copies): worktree root, `deliveries/z-post-blue-netlify/index.html`, download
standalone, download netlify folder.

## 13 · Fifth wave (shipped this session, sha256 `d38c587e…`, 699,654 B)

Owner directive (verbatim intent): all other text on the home page moves to the Guide
page only, with a tiny "See Guide for details" line above the footer; "How the Site
Works" renamed to "Sim Guide" on the Guide page; the homepage scroll fade applied
almost everywhere and bidirectional (fade out at the same speed on scroll-up); the
gold ball removed from the header bar; the 20-0 dash to be the standard dash
everywhere ("just use the standard dash like in the quotations"). The Owner confirmed
the rest is perfect as shipped and praised the DRAFT font.

1. **Home page stripped to the wordmark.** `fillDraftGuide()` no longer injects the
   guide into the home stage; it injects a single quiet line —
   `<p class="zpb-hint"><a>See Guide for details</a></p>` — styled `.78rem`-scale,
   muted rose, hairline underline, centered above the footer, and it opens the Guide
   page on click (executive call: the wording invites a click; the Guide content
   itself already lives on the Guide tab, so nothing was duplicated). During a live
   draft/season the host stays hidden exactly as before (base behaviour).
2. **"Sim Guide".** The Guide page's first section summary `sec('How the site works',
   how, true)` → `sec('Sim Guide', how, true)`. The page h2 stays "Guide" (the Owner
   calls the page by that name in the same sentence).
3. **Bidirectional scroll fade, almost everywhere.** One IntersectionObserver
   (`zpbFadeScan`) toggles `.zpb-fade-in` on enter *and* exit; a single
   `opacity/transform 1.2 s ease` transition serves both directions, so leaving the
   viewport fades out at exactly the speed the fade-in had. Scope (static text
   surfaces): `#guideBody .panel` (all 9 guide sections), `#suppHead h2` +
   `#suppHead p.narr` (page headers on Rankings/Players/Groups/Compare/Guide),
   `#homeCmpResult .panel` (comparison results), `#seasonHost .hero-panel` (stage
   intros — inert in this build since that host never renders here, kept as a
   future-proof hook wired at the end of `goSeason`). **Deliberate exclusion:**
   live-sim chrome (board rows, priority list, week narration, season pages) — those
   re-render on every pick/sim tick and would flicker-fade; the fade is for text
   pages, matching the Owner's "text fades in" framing. The home hint reuses the
   existing `.zpb-guidefade` host, now toggled both ways too. Reduced motion: the
   fade collapses to an opacity-only transition, as before.
4. **Orb removed.** The bar is now wordmark + marquee only. Swept: the bar's orb
   element, `.zpb-bar .zpb-orb`, `.zpb-orb` gradient/shadow rules, `@keyframes
   zpborb`, the `.hero-ball` animation rule from the v4 payload, the mobile orb rule,
   its reduced-motion reference — *plus* the base's own orphaned `.hero-ball` /
   `@keyframes heroBounce` rules (orphaned since the v2 emoji-ball removal). Post-
   check now asserts zero `zpb-orb` / `zpborb` / `hero-ball` / `heroBounce` tokens.
5. **Standard dash everywhere.** The v3 drawn-bar hack (the Bodoni Moda webfont paints
   U+002D blank) produced bars that read as a different dash from the standard hyphen
   in body copy ("the quotations"). Fix: keep the `-` character (accessible name stays
   "20-0") and render it in the site's standard sans stack
   (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`) — the very stack the
   tagline and sentences use, so the dash glyph is *literally the same* as in body
   text at every surface's own size. The wordmark's gold gradient shows through the
   glyph via the parent's `background-clip:text` (clip-through validated with a
   minimal probe before the build: 44 ink px inherited vs 55 px self-painted); the
   marquee spans paint it in their own rose. Pixel-measured on the built page: dash
   ink 8 × 3.75 CSS px at 1.5 rem — a real hyphen, identical geometry on wordmark and
   marquee. Old drawn-bar CSS deleted; post-check asserts zero drawn-bar leftovers.
6. **New asserted replacements (5):** Sim Guide heading; home hint replacing the guide
   block; base `.hero-ball` rule sweep; base `.hero-ball` mobile rule sweep;
   `zpbFadeScan` hook at the end of `goSeason`. The v4 `setActiveTab` sync entry was
   extended (not duplicated) with the fade scan. 56 entries total; all-green build on
   the first run after edits.
7. **Verification (headless Chromium, zero console errors across the whole session):**
   home shows bar + DRAFT controls + hint only (guide panels absent from home, 0);
   hint fades in on load, Guide page opens from the hint link; guide first section
   reads "Sim Guide", "How the site works" absent; fade census 9/9 sections tagged,
   7 in at page bottom → 2 back at top → 5 at mid (bidirectional, same speed);
   rankings/compare headers fade on every nav; orb/hero-ball tokens = 0; dash ink
   present on wordmark and marquee (light + dark + 4x zoom crops); full engine smoke
   re-run end-to-end (Chiefs draft → Sim to End → season → playoffs → Super Bowl
   champion → gold-20-0 home lands on the live season view → new-draft reset restores
   gold accent `#c9a24b`, home state, and the hint); dark-mode home (hint
   `rgb(200,164,143)`, legible, no black-on-black); 390 px mobile: 42 px bar, no
   horizontal overflow, hint visible. Evidence: `evidence/z-post-blue/v5-*.png`.
   Deliverable synced byte-identical (4 copies): worktree root,
   `deliveries/z-post-blue-netlify/index.html`, download standalone, download netlify
   folder.

## 14 · Sixth wave — slower fades, franchise crests, star removal, Value-here erasure, draft-page strip (25 Oct)

**Directives (Owner, verbatim intent):** fade into the draft a lot slower (home ≈2 s out,
draft ≈2 s in); pick-priority bar in the selected team's palette (never green); use the
new logo set (`all-logos-sdv.csv` / `nf-team-logos` — neither reached this sandbox; the
sdv set IS the ESPN-CDN set, so the crests are embedded from that exact source at
96 px, 32/32 build-time parity-checked) and replace the TEAM abbreviations, adding
logos wherever they fit; "change" button off the default blue; remove the star system
and its explainer text; shrink "Search available players" until clicked; erase every
user-visible "Value Here" value or explanation; remove the draft-page tagline and the
Draft/Season/Playoffs/Champion stepper; remove "you hold the #N overall pick (Round 1)"
and right-align a live "(x.y)" next-pick indicator; make the moving 20-0s shimmering
rose gold like the gold control but slightly more pink; "see guide for details" a lot
smaller and all lowercase.

**Implementation (25 new asserted entries, 81 total; every entry exact-match):**

- Fades: `.zpb-fade`/`.zpb-guidefade` transitions 1.2 s → 2 s (one transition still
  serves both directions — symmetric at the new pace).
- Priority bars: the chart's green segment and the board cards' bar segment switch to
  `var(--accent)` (rose-gold default, franchise accent under takeover). The TOP pill
  re-tints to the identity too; the green FLEX VALUE badge is removed outright.
- Crests: `ZPB_LOGOS` (data-URI table, generated by `scripts/zpb_fetch_logos.py`) +
  `zpbTeamLogo()`/`zpbTeamCell()`; the board table TEAM cell and the mobile cards row
  render the crest instead of the abbreviation (abbr kept in `alt`, name in `title`);
  the drafting-as badge becomes the crest; the recent-picks feed prepends it. Dark mode
  paints a pale ivory disc under every crest. The Owner's own logo files never reached
  this sandbox — decision documented, swap is a one-file regeneration.
- Stars: chip star span, sidebar star, the chip/star explainer paragraph, the click
  branch, the `PRIO_STAR` const and the closest() selector arm all removed;
  `prioOf()` pinned to 1 so priority weighting stays at the default even for stale
  stored stars.
- Search: `#draftSearch2` 150 px quiet → 330 px on focus (mobile: always full width).
- Value-here erasure: board `<th>`/`<td>`, sort option, the Priority header tooltip,
  the FLEX VALUE badge, and three Guide mentions (section title, bullet, Priority
  bullet reworded; list intro matches) — `html` post-check asserts zero case-
  insensitive occurrences.
- Draft page: hero header (tagline + stepper) removed entirely with the
  `setActiveTab` hero query guarded; the drafting-as banner drops "you hold…" and
  gains the crest plus a live right-aligned `(round.pick)` span updated from
  `renderDraftLive` via the user's next position in the shuffled order.
- Marquee: the moving 20-0s take the wordmark's own 92° gradient with every stop pulled
  38 % toward rose via `color-mix` — shimmering rose gold on the same 9 s fxshine
  cadence as the gold control.
- Hint: lowercase, 0.5 rem desktop (≈10.5 px), 0.62 rem mobile (≈9.9 px).

**Verification:** headless Chromium, zero console errors — home (no hero/stepper,
gradient marquee, tiny hint), guide (Sim Guide, no value-here/stars, 2 s fades), draft
as Chiefs (takeover, crest banner, live (x.y) right-aligned, 1,148 board crests,
accent priority bar `rgb(220,23,53)`, search 150→330→150, palette change links, no
star/value text, prioOf()=1, recent-picks crests, next-pick advance), dark-mode crest
discs, sim-to-end → season → new-draft reset (theme cleared, home restored); mobile
390 px (no overflow, full-width search, 1,852 crested cards, accent bar). Deliverable
1,043,123 B, sha256 `31f283e5…`, byte-identical across all four published copies.
Build-script note: the invariant marker `FLEX` was refined to `const FLEX = {` (the
removed badge text legitimately lowered the raw token count), and the v23 check now
inspects with data-URI payloads stripped (base64 noise can contain the token).

## 15 · Seventh wave — identity everywhere, visual week view, the game replay (25 Oct)

**Directive:** Owner's seventh message (~26 items): Claude copy-paste kit; no green in
the pick-priority light mode; the draft-complete line rewritten and right-aligned;
"Play a Season" panels removed for a bare shimmering Start Season; season options
replaced by a Caution screen; group labels de-parenthesized and reordered
Offense→Defense; the draft-recap narrative deleted; preseason explainers collapsed
into simplified dropdowns with visuals; "Current lineup:", "Three optional settings…"
and "wins added ·" removed; last-name compression on narrow windows; the whole week
view turned visual (matchup, preview, scouting, identity, matchup math, schedule,
key players, lineups, standings, review, game review); and the ~15–20 s game replay
with an ESPN/Sleeper-style scoring log.

**Build script:** 24 new exact entries + 11 whole-function range rewrites (start/end
anchors asserted, anchor preserved) + `GROUP_DEFS`/`DETAIL_KEYS`/`LINEUP_GROUPS`
rebuilt at build time from the parsed original with parity asserts (62/62 groups, zero
parentheses). New post-check block (~40 entries) + `payload_count` now subtracts every
v7-removed segment. **New gate: every inline `<script>` must pass `node --check`
before the build writes** — it caught two broken JS strings on the first run (a
Python-eaten `\'` escape) that the old brace-balance check missed.

**Changes, grouped:**
- Palette: `--good`/`--bad` re-tint to the identity under `[data-zpbteam]` (light,
  dark, explicit dark theme — three rules); `.stepper li.done` wears the accent; CTA
  `.resetbtn` gains a franchise gradient sweep (`zpbbtnshine`, reduced-motion off);
  `goldTone()` in `zpbPackFor()` pulls bright secondary yellows (hue 30–70°) to the
  site's deep gold — the Chiefs' "snot yellow" is now `#956b10`-family shimmer; the
  mtag rivalry/division gradients follow the identity.
- Copy/flow: dsub → "Your draft is in the books. Play the season. Coach your team to
  the Super Bowl. Can you go 20-0?" right-aligned; meta description follows; both
  "Play a Season" panels replaced by `.zpb-stageintro` + `.zpb-startbtn` (Cinzel
  Decorative, DRAFT sizing, team gradient + shimmer); "Season options"/"These throw
  away…" gone; `zpbCaution()` overlay — "Caution: Your current season will be erased
  if you continue" with Return-to-the-season + the clicked confirm; "Current
  lineup:", "Three optional settings…" and "wins added ·" removed; the draft-recap
  narrative deleted at both call sites and the `generateDraftRecap` generator removed
  entirely.
- Preseason: `scriptWhyHTML` → one simplified dropdown with three win-chance bars;
  the Auto explainer + deviation note → one `zpbAutoWhyHTML` dropdown with three mode
  chips; the off/def style tables each in their own dropdown; the aggressiveness
  description is now a plain `<p>` (same size/font as the intro, verified equal
  computed styles) with the 2-Pt Conv math in its own dropdown (Kick/Go-for-2 chips);
  `zpbFitLineupNames()` swaps full names to last names under 700 px (resize-aware,
  restores on widen).
- Week view: `matchupCardHTML` → `.zpb-mu` (two crests, team-tone side washes, @ in
  Cinzel with gradient, sheen sweep, hover lift — no panel box); `renderPreviewPanel`
  → model strip (`zpbPreviewStripHTML`: crest/name/model pts + shimmering win-prob
  bar + unit-edge chips) + `starsFaceoffHTML` rebuilt as row-aligned faceoff with
  glowing `★` (`.zpb-sglow`); `renderIdentityPanel` → rank bars (bar length = league
  rank, identity-colored); `matchupMathInner` → side-by-side unit bars with a model
  line header; `renderUserScheduleHTML` → 17 crest week tiles (W/L/T + score, tap
  opens the recap; `wireScheduleClicks` rewritten for tiles); `renderLineupTableHTML`
  → floaty `.zpb-lu` rows with winner glow; `planCardsHTML` → two crest cards;
  `renderStandingsHTML` → the user's division as the main table + the other seven as
  compact `.zpb-smdiv` chips (own conference first); the regular-season review
  narrative collapses into "The season in words"; `renderGameResultHTML` drops the
  journalist summary + both pregame `<details>` (team stats collapsed by default).
- **The game replay:** `zpbGameReplay(g, focusTeam)` — hooked after
  `simulateCurrentWeek()` and `simulatePlayoffRound()` for the user's game only;
  merges `homeEvents`/`awayEvents` sorted by quarter/time; scorer names come from the
  box score (`g.detail` players' `rushTD`/`recTD` + kicker; pass TDs credit
  "QB to receiver" with counts matching the box); timeline ≈ intro 0.7 s + quarter
  banners + 1.15–2.4 s per scoring play + FINAL hold (≈15–20 s total); header shows
  abbr + Cinzel scores + quarter chip; log lines carry crest, clock, play, +pts and
  the running away–home score; the user's team's lines glow; Skip/Continue/Escape/
  backdrop close it; auto-closes 6 s after FINAL; reduced-motion skips.
- **Claude kit (§4b of the handoff):** the build script, crest dict, CSS/JS payloads,
  and every wave-7 piece are documented as self-contained, copy-pasteable sections.

**Self-caught issues fixed during the build:** (a) the LINEUP advice edit removed the
`let h = ''` accumulator — caught by the verify (ReferenceError broke renderDraftResults)
and restored; (b) two JS strings broke under Python escaping — caught by the new
`node --check` gate before any write; (c) the first goSeason intro panel kept its old
indentation — asserted abort, bytes corrected; (d) payload double-counting of
`ZPB_V7_JS` and of v7-replaced payload text — `payload_count` rebuilt around captured
removed segments (`REMOVED_V7`).

**Verification:** headless Chromium, **all checks passed, ZERO console errors** —
static (no "Play a Season", no old meta), draft (takeover, Chiefs `--good` =
`#956b10`, board wins column not green), draft-complete (right-aligned new dsub, no
recap anywhere incl. Your Roster tab, Start Season in Cinzel Decorative at left x=77
with the team gradient + `zpbbtnshine`), preseason (all dropdowns verified open/closed,
aggr desc font equality, 2-Pt dropdown, no group parens, no "wins added", no "Current
lineup:"), week view (`.zpb-mu` with two crests, model strip + star faceoff, 9+ rank
bars, 9+ matchup bars, 17 tiles, 26+ floaty rows, plan cards, AFC West main table +
7 compact divisions), **the replay** (opens, fills over time, quarter banners, reaches
FINAL, closes; log shows e.g. "2Q 10:56 KC — Trevor Lawrence to Rashid Shaheed +7
10–3"), results (no journalist paragraphs, no pregame details, W/L not green, tile
recap opens), caution flow (exact wording, Return + confirm paths), name compression
("Trevor Lawrence — QB 86" ↔ "Lawrence"), dark mode, 390 px. Deliverable 1,063,998 B,
sha256 `858747d6…`, byte-identical across all four published copies.

## 16 · Eighth wave — responsive home, real footer, pure logos, board that never loses the Draft button (25 Oct)

**Deliverable:** `Football-Sim-Z-post-blue.html` (worktree root), 1,096,335 B, sha256
`a175747e…`; prototype `download/Football-Sim-Z-post-blue-logosB.html`, 1,099,677 B,
sha256 `6234d8df…`. Build script: 141 asserted entries, all-green; both inline scripts
pass `node --check`; protected invariants byte-verified unchanged.

**1 · Home dropdowns never stack.** The two draft selects kept `min-width:250px`
(desktop) and `min-width:100%` (≤760px) — the latter *forced* stacking. Both replaced:
`flex:1 1 0` + `min-width:0` + `flex-wrap:nowrap` at every width, font/padding step down
at ≤760px and ≤430px, `white-space:nowrap` + ellipsis. Verified side-by-side at 1280 /
700 / 390 with no horizontal overflow.

**2 · A real footer.** The base never explicitly closes `.wrap` (the parser nests
everything, including the bottom nav and the scripts, inside it), so the classic
body-flex sticky footer left the footer floating mid-page. The build now pins it
*inside* `.wrap`: `body` flex column with `min-height:100svh`, `.wrap{flex:1 0 auto;
display:flex;flex-direction:column}`, `nav.footnav{order:8}`, `.zpb-foot{order:9;
margin-top:auto}` — the footer is the last visual element, at the bottom of the viewport
on short pages and below the content on long ones. It carries the tiny "see guide for
details" hint (still opens the Guide; wiring is now DOM-ready-safe) above a hairline
and a small gold `20-0` mark. Measured: footer bottom at the viewport edge, hint 3px
above the hairline.

**3 · Logos: pure artwork, two packages.** `scripts/zpb_fetch_logos_v8.py` re-fetches
set A (sportsdataverse/ESPN) and fetches set B (the nflverse CSV's `team_logo_wikipedia`
column — the flat Wikipedia style, visually far apart from ESPN's), **alpha-trims both
(alpha>12 bbox crop — whitespace fully subtracted)** and emits 96px data URIs (32/32
parity asserted). The dark-mode ivory disc bubbles are **removed** — pure logos with a
1px drop-shadow for dark-ink crests. Package B is wired through a `--logos-b` build
flag that swaps the logo table and badges the prototype (`<title>20-0 · logo package
B</title>`, `body[data-zpblogopkg="B"]`). Wikimedia rate-limits (429) and two stale
CSV URLs (KC, LA) were handled: pacing + backoff + a resolver that found the current
Rams file via the Wikipedia API.

**4 · Draft board.** The compact grid-card layout now **takes over at ≤1120px** (was
≤760px) — between those widths the 9-column table previously overflowed `.tablewrap`
and put the **Draft button behind a sideways scroll**; now name + pos + OVR + the Draft
button are always on screen at 1200/1100/980/900/800/700/390 (verified, no horizontal
scroll). The **OVR bubble no longer stretches** to its grid cell (`justify-self:start`
+ fixed padding; it also tints to the identity via `color-mix(var(--tA…))`). **Every
sortable header sorts on click** (base wiring kept) and now *shows* it: the active
column wears the accent + an ▲/▼ arrow, synced by a wrapper around `renderDraftBoard2`.
The **three team-color bubbles moved UNDER the crest** (`zpb-teamcol` column). "No
picks yet." (2×) and the depth-slot "needed" filler are gone; "by your next pick" is
wrapped in `.zpb-nxpick` and hides ≤900px (the % gone stays).

**5 · Flex mentions removed; math's pick follows the palette.** Removed: the roster
"Flexed" badge, the preseason lineup "Flexed" badge, the season slot-table "Flexed
from X" badge + "(-N, flexed)" penalty cell, the pick-priority "· Flex (-N)" suffix,
the slot-picker "Flex (-N)" suffix, and the entire roster-building paragraph the Owner
quoted (`if(isUser){…}` block in the identity builder, range-replaced). The
`math's pick` badge (`.badge-passfail` — the Owner's "Math's pick") now wears the
selected franchise's secondary under takeover (`color-mix` tint, light + dark pairs);
the confetti engine pulls its colors from the identity via `FXC()` (the fixed green
piece `#3ecf8e` only survives inside the no-team fallback palette). Standing green
re-audit at build time: only theme-default `--good` definitions + the fx fallback
remain — everything user-facing resolves through the takeover (Chiefs: `--good`
resolves `#956b10`, gold, verified live).

**6 · The Owner's note to everyone.** The shimmering "Can you go 20-0?" is recorded as
the standing emphasis pattern (palette + shimmer, one phrase per surface) in
PALETTE-ADVISORY.md §5 and handed to every agent via HANDOFF-FOR-CLAUDE.md §4b.

**Verification:** v8 suite (43 checks) + full v7 regression suite — **all passed, ZERO
console errors end-to-end on both builds**; evidence `v8-home-390.png`,
`v8-board-800.png`, `v8-board-eagles-1280.png`, `v8-dark-draft.png`, `v8-B-board.png`,
`v8-home-footer.png`. Deliverable synced to the download folder + Netlify folder + lane
mirror; prototype additionally at `download/Football-Sim-Z-post-blue-logosB.html`.

## §17 · Ninth wave (25 Oct) — the Owner's ~48-directive round
Entries: 141 + 18 V9_EXACT (asserted exact-match, count-verified). Payloads: ZPB_CSS_V9 (~350 lines) + ZPB_V9_JS (two files, loaded from disk). New post-checks: ~60. node --check gate green (2 inline scripts).
Headline fixes: the scouting rank bars were self-defeating (bar gradient ended in a 0.12-alpha wash so #1 read faded and #32 vibrant) — now solid identity tones with top/bottom tags; the 100-season back button landed on the Start-Season intro when no season existed — now routes to renderDraftResults; the replay closed itself at FINAL — now never times out and hides SKIP.
Engineering notes: the payload injects at `initPlayerBrowser();` (mid-script) — base function declarations AFTER that point out-hoist payload declarations, so every v9 override is an ASSIGNMENT (`fn = function(){...}`) with a trailing semicolon (bare `}` + a following `(` IIFE once parsed as a call — ASI hazard); the replay's regular-season path calls runEvents() after its const definition (TDZ); `document.body.textContent` includes inline script text — rendered-text assertions use innerText; the site root font-size is 21px (rem math); the season renders inside #draftFinalResults by design, so DOM-order assertions filter offsetParent and use closest('.panel').
Verification: v9_verify.js — 40+ checks across home/draft/draft-complete/100-report/preseason/week/replay/rest/review/playoffs/SB/try-again/guide/dark/mobile — repeated all-green, zero console errors. Deliverable synced ×4, sha 6717e43f…

## 18 · Tenth wave (25 Oct) — ~90 directives + the publishing order

Deliverable: sha 4445d540…, 1,201,902 B. Build script at ~140 asserted entries;
all post-checks green; both inline scripts parse clean (node --check gate);
invariant allowlist extended ONLY for the Owner-directed NATURAL_SLOT_MAP
growth (3→5: FB + Punter).

Highlights:
- 100 Season Sim naming sweep (button, tabs, report title, guide, progress);
  Re-run gated on an actually-started sim; league100 reset on new draft.
- Full-bleed 20-0 bar re-asserted on every view; footer nav stripped of panel
  chrome and pinned via a stretched .wrap; DRAFT button ~half-button above the
  window centerpoint; home dropdowns slightly higher; "see guide for details"
  retired everywhere (static footer hint + JS wiring both removed);
  "Back to the Simulator" verified absent.
- Guide rebuilt: positions-ranked bars + cumulative series (engine-derived,
  auto-update after any rebalance), Star-Wars fading explainers (5.5 s,
  bidirectional IO), personnel boxes without the "What it means" column,
  package viz (Base/3-4/Nickel + symbol-only Pass/Run/Balanced badges),
  Glossary rename + 13 entries + softened ink, values section at 28 spots.
- Draft board: palette names (Cinzel Decorative), single-word sort headers,
  pips, shimmering top-3 Draft buttons, brightness lift for dark franchises,
  segmented Table/Cards, "Search", SAM/Nickel + full-name hovers, base
  toggle, drafting-as removed.
- Draft review: cinematic 3-sentence finisher (super-slow, one at a time),
  Draft Complete gone, NEW DRAFT + 100 SEASON SIM cluster, capitalized tabs,
  simulated-teams tab removed, Type column gone, You shimmering, integers,
  grade line cleaned + league-position chip, strengths/weaknesses via the
  existing tile path, Start Season + glimmering Can-you-go (live season tab).
- Preseason: bubbles, wins-of-optimal card, KR/PR (PR = second best; UI-only),
  aggro copy per the Owner's exact wording (Balanced Approach:, 4th & short in
  opponent territory — matches the engine's 4th-down rule, aggressive rewrite),
  2-Pt Conversion panel smaller, model-tries + strongest/shakiest cards,
  flexing + group scores bottom row, philosophy unlocked all season.
- Engine: ROSTER_SLOTS 26→28 (FB after TE2, P last), NATURAL_SLOT_MAP + FLEX
  per the Owner's matrix, 3-4 toggle with zpbAdjSpec + natural LB slots,
  group/lineup updates.
- Verified: v10_verify.js (35+ checks) ALL PASS; v9_verify.js regression ALL
  PASS (3 checks updated to the Owner's v10 supersessions); zero console
  errors end-to-end on both suites; evidence v10-*.png (7 shots).
- Publishing: publish.sh one-command verify+commit+push (dry-run verified;
  push needs an environment with GitHub credentials); REWEIGHT-BRIEF.md
  delivered for the Owner-approved rebalancing task.
