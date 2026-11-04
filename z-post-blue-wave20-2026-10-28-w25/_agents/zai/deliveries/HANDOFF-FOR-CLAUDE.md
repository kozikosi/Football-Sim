# HANDOFF FOR CLAUDE — read this first

**FROM: Z.ai, High Councillor (seat S-2600–2699) | TO: Claude (Architect) | DATE: 2026-10-25 · REV 13 (twelfth wave — packaging & guides event; supersedes the REV 3–12 status lines only) | BRANCH: `zai/lane` @ worktree `desktop/wt/zai`**

The Owner's standing instruction is that you can be onboarded with a single prompt:
*"Claude, read `_agents/zai/deliveries/HANDOFF-FOR-CLAUDE.md`."* This is that document.
It covers who I am, what the Owner has directed, what I built and where everything
lives, and the small set of things I need from you. One naming rule up front, because
it matters for everything below: **my builds are named Z-post-blue** (and my preserved
first prototype is **Z-pre-blue**). I never attach any other version name to my work,
and I have never edited your files.

> **A confession you should have from me directly.** My first build was accidentally
> created under the name **V23** — the name reserved for your build. I caught it the
> same day, changed the prototype to **Z-pre-blue** (content-frozen, preserved in my
> `snapshots/`) and my build to **Z-post-blue**, and then swept every artifact of mine
> for the token. I believe the sweep is complete, but **if you ever find one stray
> "v23" on my side of the fence, it is my fault** — not yours, and not the Owner's.
> Two known, deliberate residues exist: the frozen Z-pre-blue snapshot still carries 17
> internal occurrences (its content is intentionally unmodified — it is evidence of
> what shipped, not live work), and my build script's own assert-zero guard counts the
> token so that the Z-post-blue deliverable itself is verified to contain zero
> occurrences before it ships. The current deliverable has none.

## 0g · Twentieth wave — the six-point fix round (latest, 28 Oct, read this first)

The Owner reported six problems with the current build and ordered exactly
these fixed (intake §G has the line-by-line mapping):

1. **Player names not rendering in places** — two invisibility mechanisms
   removed (shimmer's `background-clip:text` dependency given a solid-color
   `@supports` fallback; Chromium classic scrollbars no longer push edge
   columns into the `overflow-x:hidden` clip zone — the draft board scrolls
   inside its panel with the scrollbar hidden instead).
2. **The name-tier law enforced everywhere** — 90+ shimmer, 85+ vibrant,
   everyone else neutral, all in the team's color. Four violating call sites
   fixed; `zpbRowVars` now carries the tier palette per row.
3. **Preseason/season lineup selector compaction** — fits a 390 px viewport.
4. **Position-rankings names sized down**, rows wrap instead of drifting wide.
5. **Zero horizontal page scroll** — `scrollbar-gutter`, `overflow-x:clip`,
   contained draft scroller, wrapping week strip; asserted by the suite.
6. **Brave/Chromium hardening** — the why (engine scrollbars + font metrics +
   timer throttling, not Shields API-blocking) and the fixes (gutter, clip,
   shimmer fallback, `visibilitychange` draft resume, and a gold `SETBACK`
   chip that reports any boot error in plain text).

Evidence: `evidence/w20/` (12 screenshots) · verify: `tools/w20_verify.js`
(27 checks, ALL PASS, zero console errors) · build: `tools/w20_patch.py`
(17 asserted replacements, node --check on every script block).

## 0d · Twelfth wave — packaging & delivery (latest, 25 Oct, read this first)

The Owner asked for everything in one place with download links first, and
no further product work until that existed. Done: a single zip,
`z-post-blue-full-handoff-2026-10-25.zip`, carries the latest deliverable
(md5 49ea6f05…, 1,237,864 B — same bytes as the wave-11 netlify index), the
logosB variant, every md I have written (this file at REV 13), every tool,
the full evidence screenshots, and four NEW companion guides:

1. `STYLE-GUIDE-Z-POST-BLUE.md` — the ten commandments distilled from the
   shipped versions (no white text, integers only, one shimmer, Cinzel
   Decorative, palette-driven theming, floaty layout, cinematic pacing) plus
   the do-not-regress ledger. Read before touching the UI.
2. `OWNER-PREFERENCES-PLAYBOOK.md` — how to read the Owner: his rulings, his
   exact-word copy rule, the delivery-first reflex, the per-item ledger.
3. `WISDOM-AND-LESSONS.md` — the honest record: lost checklist items, the
   20-minute hang, the V23 naming incident, the self-caught false claim.
4. `GOVERNANCE-AND-ARCHITECTURE-RECOMMENDATIONS.md` — consolidated REV 2:
   R-ZAI-1…6 carried forward + R-ZAI-7…9 (delivery gate, Owner-rounds intake
   ledger, sandbox network-timeout hygiene) + the architecture as practiced.

Git state: the sandbox push hung ~20 minutes on a credentials prompt, so the
push is handed to the Owner — local `main` was ahead 5 / behind 7 of origin,
everything committed locally on `zai/lane` and mirrored to `main` (including
this packaging wave), and `GIT-PUSH-INSTRUCTIONS.md` in the same folder gives
terminal-exact steps including a `git bundle` of all local commits. Nothing
is lost; the zip is the belt-and-suspenders copy. The deliverable itself is
UNCHANGED in this wave — no product edits.

## 0c · Eleventh wave (25 Oct — then 0b)

Two Owner rounds (6 + 7, ~90 items) are live in the deliverable
(sha 2ee07713, 1,237,864 B). Verified headless: v11_verify.js (69 checks) +
v11b_verify.js (53 checks) + the v10 regression suite — ALL PASS, zero console
errors end-to-end. Screenshots: `_agents/zai/evidence/z-post-blue/v11*.png`.

**THE WEIGHTS GUIDE first:** `REWEIGHT-BRIEF.md` is the single source of truth
for the value scale (QB = 1000 integer anchor). It is now promoted from the
handoff (here), the download README, `publish.sh`, the in-site Guide's
"Position values" section, and the bulletin. **§7b is new: the FB/Punter wins
math is designed AND shipped** (Owner approved on 25 Oct). FB 90 ≈ +0.034 wins
(lead-blocker share of run blocking; FB added to WV_OFF_SLOTS — it had been
missing, which zeroed the slot); P 90 ≈ +0.208 wins (hidden-yards field-position
term, `PUNT_PTS = 1.6`, parallel to the kick/return terms). No display-only
special cases — slotWinsTable() is honest for all 28 slots in both fronts.

Round-6 leftovers closed: on-the-clock text and the CPU pick-priority panel
deleted; Random box follows the team dropdown; pick-order dropdown in the
custom family; team-icon filter click-to-sort; chips under OVR (85+ only);
Cinzel Decorative across the board; no sort arrows; full-bleed 20-0s; no
desktop h-scroll on the draft; 100 Seasons rank rows show logos (no numbers),
STATS section, "11 personnel / RUN+ x / EVEN x / PASS+ x" rows, more bubbles;
duel cards; SCHEDULE/STANDINGS headings; replay ~50% larger with shimmering
team-colored TD badges, FG badges, real turnover descriptions ("x int y",
"x strips y & x recovers"), no "+7", no phantom "Touchdown".

Round-7 highlights: Undo shortened to "↶ Undo" (once per draft, documented in
the Guide); matchup panel's right-team border moved to the RIGHT edge; record
tags read "#x <division>" with a shimmering "#1 <conference>" for top seeds;
"Same division…" tag text deleted; replay final is now a colored
"ABBR x - y ABBR" score line with a shimmering YOU WON + star (no "FINAL ·",
no "You win", no turnovers footer); rest-summary points line and "The bracket
awaits" removed; cinematics: every regular game gets the 5 s intro, every
playoff game the 30 s Super Bowl intro, the Super Bowl a full 60 s; the
season-in-words glitch fixed (details content is now observed by the fade
IntersectionObserver — words fade back in when scrolled to); player cards
everywhere (season-stats cards in the game preview — OVR only in week 1 —
game-stat cards on the review) with a guaranteed shimmering PLAYER OF THE
GAME after every game (MVP fallback + dedupe); awards card-ified for both
regular and playoff panels, explanation paragraph removed, ROY/CPOY/COY moved
to the Guide glossary; draft pick analysis says OK / Costly Miss (no "wins
left"); turnover margin an integer total; "2-Pt Conversions x of y"; IN DA
CLUTCH; INDIVIDUAL SKILL / SUBPAR BLOCKING / EXCELLENT COVERAGE; standings
PF/PA as integer totals with your division panel exactly twice the compact
ones; metric board on the Season Review (nine units in draft-board depth-chart
order, click for a fading rank + key-player note); playoff round buttons read
"Play the X" and, after a loss (non-Super Bowl), "SIM PLAYOFFS"; strip edge
chips ("quarterback play +3.1") retired; NY Giants + LA Rams crests brightened
(`zpb-logo-bright` filter class, keyed to the LOGOS map names "NY Giants" and
"Los Angeles Rams"); footer all-caps and never pink.

## 0b · Tenth wave (25 Oct — superseded by 0c but kept for the wave-10 kit)

The Owner shipped a ~90-item directive plus a publishing order. Everything below
is live in the deliverable (sha 4445d540, 1,201,902 B) and verified headless
(v10_verify.js, ALL PASS, zero console errors; v9 regression suite also green).

**Publishing — your one-command door:** `bash publish.sh` at the worktree root
verifies all four deliverable copies, commits on `zai/lane`, and pushes to
origin. This sandbox has no GitHub credentials, so the push step needs to run
where credentials live (`--dry-run` works everywhere). The wave-10 kit:
`_agents/zai/tools/zpb_v10.py` (asserted replacements) + `zpb_css_v10.css` +
`zpb_js_v10.js`, built by `zpostblue_build.py` (now ~140 asserted entries,
allowlisted invariant drift for the Owner-directed FB/P slots).

**Highlights that touch your side of the fence:**
- **"100 Season Sim"** is now the site-wide name (tabs, buttons, report title,
  guide); the Re-run button only appears after a sim actually ran
  (`league100` resets on a new draft).
- **FB + Punter are real draft slots now** (28 rounds; NATURAL_SLOT_MAP +
  FLEX extended; DEPTH_CHART_GROUPS; GROUP_DEFS). The Owner said the
  underlying FB/P math is yours to design — **REWEIGHT-BRIEF.md** (same
  folder) is the full rebalancing specification with your entry points.
- **New flex matrix** (Owner's exact numbers): QB→RB/WR −6; OL→RB −6;
  TE→WR −2/RB −4; edges→OLB free; OLB/WILL/SAM→edge −2, DT/SS −4, FS −6,
  Nickel −2; MIKE→DT −4, SS −2; SS→Nickel free, FS/OLB −2; CB→MIKE −6;
  K↔P free.
- **3-4 / 4-3 base toggle** (draft sidebar + preseason): relabels the front,
  `zpbAdjSpec()` makes OLB=WILL and ILB=MIKE, LBs play the OLB1 slot
  naturally. Persisted in localStorage; guide explains the packages.
- **Philosophy never locks again** (Owner: editable all season) —
  `scriptLocked` assignments neutralized; selects never disabled.
- **Guide is now graphical**: engine-derived positions-ranked bars + the
  cumulative "1 QB · 2 QB + CB1 …" series, Star-Wars fading explainers,
  personnel boxes (no "What it means" column), package-movement viz with
  Pass/Run/Balanced badges, Glossary (renamed from "Football and site terms")
  with 13 new entries, values section now covers all 28 spots.
- **Draft board**: player names in Cinzel Decorative, palette ink (no white),
  click-to-sort single-word headers (OVERALL…TEAM), position pips replace the
  QB x/y chips, shimmering Draft buttons on the top-3 priorities, contrast
  lifted on dark franchises (Ravens), Table/Cards segmented control, search
  placeholder "Search" far right, "Drafting as" gone, SAM/Nickel labels with
  full-name hovers everywhere, base toggle beside Your Roster.
- **Integers on team scores** site-wide (comparison header, unit rows, draft
  ranks, grade line, 100-Season averages); correlations/coefficients keep
  their decimals (accuracy exception).
- **Comparison page**: the weights sentence is gone, colored player boxes are
  replaced by 90+ shimmer / 85+ vibrant names, better units wear team colors
  (no green), Team A/B labels dropped for aligned selects.
- **Madden Rankings**: badge emojis removed, the weights+badges strip is
  compact and sits below the results, the default-weights explainer is gone,
  fades slowed to 4.2 s. **Player Browser**: all 1,200 players in one
  scrollable panel, pager removed.
- **Draft finish**: a cinematic plays "Play the season. / Coach your team to
  the Super Bowl. / Can you go 20-0?" one super-slow sentence at a time;
  "Draft Complete" heading gone; NEW DRAFT + 100 SEASON SIM share the top
  cluster; tabs capitalized; the (live) season-tab Start Season button has
  the glimmering "Can you go 20-0?" beneath it.
- **Preseason**: selected styles as two large bubbles, "x wins of optimal"
  card, KR/PR rows (PR defaults to the second-best returner; UI-only until
  your special-teams math), aggressiveness copy rewritten per the Owner's
  exact wording, "How a 2-Pt Conversion works" smaller, strongest/shakiest
  cards, flexing explainer + group scores on one bottom row.

Known deliberate residues: the dead `goSeason()` hero branch still exists in
the base (its `#seasonHost` container never existed — the live Start Season
path is the SEASON tab's `startSeasonBtn`, which now carries the glimmer
line); `styleListsHTML()` remains in the source but has no visible call site.

## 1 · Who I am and what I did on arrival

I joined the council as **Z.ai** and completed the full ONBOARDING.md rite: read the
document chain, verified the on-disk builds against their pins (`NFL Draft Simulator
v20 Claude.html` @ `31b7d61f…`, PreColors @ `40233d6b…`, V21 @ `044d1759…`), claimed ID
block **S-2600–2699** (grep-verified zero conflicts), created worktree `desktop/wt/zai`
on branch `zai/lane`, and committed only inside `_agents/zai/**` (path-scoped, never
pushed). Lane folders: `notes/`, `deliveries/`, `reviews/`, `evidence/`, `tools/`,
`snapshots/`.

## 2 · My role — High Councillor

On 25 Oct the Owner promoted **me and GPT to High Councillor** (below Architect, above
advisor). Rules I operate under:

- I may **edit any work that is not yours**; for **GPT's** work I need **>80 % confidence**
  the edit helps; **I never edit your work** and never unilaterally contradict an explicit
  Owner directive.
- Disagreements with Owner directives or with your work go through the proper channels
  (QUESTIONS-FOR-THE-ARCHITECT / ROUNDTABLE / BULLETIN) — never by direct edit.
- You were unavailable during these sessions; the Owner relayed changes to you. This
  document is the catch-up.

## 3 · The Owner's directives (compressed, this arc)

1. **English only**, everywhere — the Owner does not read modern standard Mandarin.
2. **"1-4 are good, continue on beyond that"** — my four questions (§6) are endorsed;
   I act autonomously inside the governance.
3. **"Create your own version of pre-colors. Call it Z-post-blue."** — I was made full
   architect of my own build: incorporate everyone's work and recommendations, execute
   executive decisions on discrepancies myself. **Hard constraint: do not edit any of
   Claude's code.** The deliverable had to be trivially deployable (Netlify drop or
   standalone HTML).
4. **Taste brief:** like VL's v7 homepage prototype for its minimalism, dynamism and
   palette, but **no panels, no corner 20-0 badge**, and it should **shimmer in dripping
   rose gold** a lot more; palette is very pale rose gold (near white) + shimmering gold
   + white; **black only as the dark-mode background, never as text**.
5. **20-0 identity everywhere** (header, footer, title, copy, buttons) with the Owner's
   verbatim season/draft lines.
6. **Second wave (latest, executed):** (a) when the user picks a team and starts the
   draft, the **whole project transforms into that team's 3 colors** (tones may shift for
   accessibility); (b) **draft-board players framed by their real NFL teams' 3 hexes**
   until the draft ends, then **my roster in my colors and other franchises' players in
   theirs**, neutrals = white, no black/grey; (c) **remove "Fits as"** from the board —
   just **`Flex x (-y)`**; (d) home page: **VL's moving 20-0s in the header**, remove the
   tagline/step labels/setup heading/motto/select labels, **DRAFT in a new font with a
   shimmer**, guide removed from the home stage and **fading in on scroll toward the
   footer**; (e) **relabel my work** — no artifact of mine may carry the name reserved
   for your build; my old prototype is **Z-pre-blue**.
7. **Third wave (latest, this session):** (a) **remove 20-0 from the footer** (it stays
   in the title, header marquee and copy); (b) **publish my homepage hex palette
   council-wide** as a good-example advisory — the Owner publicly praised it and wants
   it disseminated broadly; (c) study VL's KC game-preview v8 and Glyph's 20-0 homepage
   guidelines — **principles, not copies** — and take the whole product to **far less
   text on every page**.
8. **Fourth wave (latest, this session):** (a) **the gold 20-0 moves INTO the bar** where
   the pink 20-0s move — **same size and font as the moving ones**, living on the bar's
   left side, and it is **the control that returns the user to the homepage — which is
   the season view once a season has started** (draft/season are phases on the one
   primary tab, so one navigation target serves both — verified live); (b) the bar is
   **persistent on every page** and the **glowing orb joins its right end**; (c) the
   **DRAFT button gets a new font** (Cinzel Decorative over the old Cinzel); (d) the
   **dropdown menus go full rose-gold** — deep-rose Cinzel type, rose wash, rose
   chevron, breathing rose-gold shimmer glow, themed option lists in both schemes.
9. **Fifth wave (latest, this session):** (a) **the home page keeps no text but the
   wordmark** — every other piece of home text lives on the Guide page only, with a
   **tiny "See Guide for details" line above the footer** (it is a quiet link that
   opens the Guide); (b) on the Guide page the first section is renamed
   **"How the site works" → "Sim Guide"**; (c) the homepage scroll fade now applies
   **almost everywhere** (guide sections, supplementary-page headers, comparison
   results, stage intros) and is **bidirectional — scrolling back up fades the text
   out at the same speed** (one 1.2 s transition serves both directions); live-sim
   chrome is deliberately excluded so week-by-week re-renders never flicker; (d) the
   **gold ball is removed from the header bar** (all orb CSS/animation swept,
   including the base's orphaned `.hero-ball` rules); (e) the **20-0 dash is the
   standard hyphen everywhere** — the Owner flagged inconsistent drawn bars, so the
   v3 drawn-bar hack is replaced by the real `-` glyph rendered in the same standard
   sans stack the site's sentences use (clip-through of the parent's gold gradient
   pixel-verified; the marquee paints it in its own rose). The Owner's exact words on
   the rest: "Otherwise it looks perfect. I like the new font on Draft."
10. **Sixth wave (latest, this session):** (a) **fades slow down** — every scroll fade
   breathes at 2 s (was 1.2 s): the home page gets a couple of seconds to fade out and
   the draft page a couple of seconds to fade in; (b) the **pick-priority bars wear the
   identity** (chart + board cards; `var(--accent)` = rose-gold, the franchise accent
   under takeover — never green again); (c) **franchise logos** — the Owner added
   `all-logos-sdv.csv` + `nf-team-logos/` to his working copy; neither reached my
   sandbox, and the sdv set *is* the ESPN-CDN set, so the crests are embedded as 96 px
   data URIs from that exact source (32/32 verified at build time): they **replace the
   team abbreviation under TEAM on the draft board** (table + cards), sit in the
   drafting-as badge and the recent-picks feed, and get a pale ivory disc in dark mode
   so dark-ink crests never vanish; (d) the **"change" affordance follows the palette**
   (deep rose / team accent — never default-browser blue); (e) the **star system is
   removed** — chip stars, star tooltip, the chip/star explainer text, the click
   handler, and the priority weighting pinned to the default (×1); (f) the **"Search
   available players" bar shrinks to ~150 px and expands to 330 px on click** (full
   width on mobile); (g) **"Value here" is erased from the user's view everywhere** —
   board column header, cells, sort option, the green FLEX VALUE badge, three Guide
   mentions, and the Priority tooltip reworded (the math itself stays in the
   background); (h) **draft page stripped further** — the tagline and the
   Draft/Season/Playoffs/Champion stepper are gone (the hero header removed
   entirely), "you hold the #N overall pick (Round 1)" is gone, replaced by a **live
   right-aligned `(round.pick)` next-pick indicator** that updates as the board moves;
   (i) the **moving 20-0s shimmer in rose gold** — the wordmark's own gradient pulled
   38 % toward rose, same fxshine cadence as the gold control to their left; (j)
   **"see guide for details"** — lowercase and a lot smaller (≈10.5 px desktop,
   ≈9.9 px mobile).
12. **Seventh wave (latest, this session):** (a) **every tool and discrete code section
   must be copy-pasteable for you** — see §4b, written for exactly that; (b) **no
   permanent green anywhere once a franchise is picked** — `--good`/`--bad` re-tint to
   the identity under takeover (pick-priority menu in light mode, standings W/L,
   lineup arrows, done-bubbles; Colts players now wear Colts colors, not green);
   (c) the draft-complete line is now **"Your draft is in the books. Play the season.
   Coach your team to the Super Bowl. Can you go 20-0?"** and **right-aligned** (meta
   description follows the new phrasing); (d) **"Play a Season" panels are gone** — a
   bare **Start Season** button in the DRAFT font/side shimmering with the selected
   team's colors; (e) **"Season options" heading + warning line removed**; both
   destructive actions open the **Caution screen** ("Your current season will be
   erased if you continue") with **Return to the season / confirm** buttons; (f)
   **group labels lose their parentheses** and run **Offense → Defense in the draft-
   board roster pattern** (DETAIL_KEYS + GROUP_DEFS + LINEUP_GROUPS rebuilt at build
   time with parity asserts); (g) the **draft-recap narrative is deleted for every
   team** (both call sites + the whole generator); (h) **preseason explainers collapse
   into simplified dropdowns** — "Why this style?", "Why Auto?", the style tables,
   "How a 2-Pt Conv works" — fifth-grader language with bar/mode visuals; the
   aggressiveness description matches the intro paragraph's size/font; "Current
   lineup:", "Three optional settings…" and "wins added ·" removed; **player names
   show last name only when the window compresses**; (i) the **week view went
   visual**: logo matchup card (no panel), preview = model strip + aligned star
   faceoff with glowing stars, scouting/identity = rank bars, matchup math =
   side-by-side bars, schedule = crest week tiles (tap for recap), lineups = floaty
   rows, standings = your division first with the other seven compact, review
   narrative collapsed, game-review text panels removed; (j) **GAME REPLAY** —
   simulating a week (or a playoff round) plays a ~15–20 s overlay that reveals the
   score by play and quarter with an ESPN/Sleeper-style scoring log (real scorer
   names from the box score), Skip + Continue + Escape, auto-closes at FINAL,
   reduced-motion skips it.
14. **Eighth wave (latest, this session):** (a) home dropdowns **shrink in place and stay
   side by side** on narrow windows (never stack); (b) home gets a **real footer pinned to
   the bottom of the page** with "see guide for details" **directly above it**; (c) **logo
   package B one-page prototype** (`download/Football-Sim-Z-post-blue-logosB.html`, the
   Wikipedia flat set) + **all logos alpha-trimmed** (whitespace fully subtracted) and the
   dark-mode ivory **disc bubbles removed** (pure logos + a whisper of drop-shadow);
   (d) draft board: the OVR bubble **no longer stretches** on compact screens, the compact
   card layout **takes over at 1120 px** so the **Draft button can never scroll out of
   reach** (name + pos always on the card), **every number column header sorts on click**
   with an active-sort arrow, and the **three team-color bubbles sit UNDER the crest**;
   (e) **"No picks yet." and "needed" removed**; (f) **"by your next pick" hides** as the
   window compresses (the % stays); (g) the Owner praised the shimmering "Can you go
   20-0?" and asked **everyone be told that is the emphasis pattern** — recorded as the
   standing rule in PALETTE-ADVISORY.md §5; (h) **"math's pick" wears the selected team's
   palette** (never fixed purple) and the confetti follows the identity too; (i) **every
   who-got-flexed mention removed** (roster/preseason/season-slot badges, priority suffix,
   slot-picker suffix, and the whole roster-building paragraph the Owner quoted); (j)
   standing green re-audit: only theme defaults + the fx fallback remain, everything
   user-facing follows the takeover.
15. **Usage guard:** near exhaustion I stop and leave this document.

## 4 · What I built — Z-post-blue (full report: `_agents/zai/deliveries/Z-POST-BLUE-BUILD-REPORT.md`)

- **Deliverable:** `Football-Sim-Z-post-blue.html` (worktree root, 1,096,335 B, sha256
  `a175747e…`) — byte-identical to `_agents/zai/deliveries/z-post-blue-netlify/index.html`
  and to both copies in the Owner's `download/` folder.
  The Owner deploys by dragging that folder onto app.netlify.com/drop.
- **Base:** PreColors `40233d6b…`, untouched (pristine copy in my `snapshots/`). Built by
  `_agents/zai/tools/zpostblue_build.py`: **141 asserted entries** (81 exact-match
  replacements from waves 1–6 + 24 seventh-wave exact entries + 11 seventh-wave
  whole-function range rewrites + 24 eighth-wave exact entries + 1 eighth-wave range
  rewrite) + one appended `<style id="zpbtheme">` block + one
  appended JS core + one v7 CSS/JS layer; **protected invariants byte-verified
  unchanged** (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, PLAN_K, RATING_SPECS,
  slotWinsPerOvr, optimalLineup, effOvr, MC markers); since v7 **every inline
  `<script>` must pass `node --check` before the build writes** (a real bug-catcher:
  it caught two broken strings on the first v7 run). No original line of the base's
  own CSS/JS was edited; my entire delta is append-only and surgical.
- **Features:** 20-0 identity; panel-free glass-hairline retheme (light rose-gold, dark
  espresso; no black text anywhere); **persistent site bar: shimmering gold 20-0 at left
  (Home; lands on the season once one runs) + VL-style moving 20-0s + glowing orb at the
  right end, with the dripping-gold effect falling from the gold wordmark**; home stage
  stripped to bar + two unlabeled rose-gold selects + a shimmering **Cinzel Decorative**
  DRAFT pill, guide fading in on scroll; 15-row player browser with pager; ☾/☀ theme
  toggle; **team-color takeover at draft start** (all 32 franchises, council color table,
  accessible tone computation, light+dark token pairs) — the bar and wordmark take the
  franchise tones too; **draft board framed by real NFL team colors** during the draft
  and by franchise colors after it (mine = my colors, others = theirs); **`Flex x (-y)`**
  labels everywhere; **rose-gold Cinzel dropdowns with breathing shimmer**; zero console
  errors in a full draft-to-champion headless run; mobile 390 px verified.
- **Executive decisions I took** (documented in the report §8): brand primary leads the
  theme engine; stepper/tagline hidden only on the home stage; guide reveal requires real
  scroll; marquee adopted per directive but restyled to my system; "Flex x (-y)" applied
  to every surface that had the old wording.
- **Third wave (this session) — SHIPPED:** all three §3.7 items done and verified —
  footer 20-0 removed; the Owner-praised homepage hexes published council-wide in
  `deliveries/PALETTE-ADVISORY.md` (bulletin M-20261025-zai-5); less-text pass applied
  (priority meter stands alone, season-page prose walls condensed) plus a bonus fix: the
  Bodoni Moda webfont's blank hyphen glyph was making the wordmark read "20 0" — the
  brand dash is now a drawn gold bar, pixel-verified light/dark/mobile. Full detail:
  build report §11. Receipts in `evidence/z-post-blue/v3-*.png`.
- **Fourth wave (this session) — SHIPPED:** all four §3.8 items done and verified — the
  gold 20-0 now lives at the left end of the persistent site bar (same 31.5 px size and
  Bodoni Moda 600 font as the moving pink ones), is the Home control, and **lands on the
  live season view when a season is running** (headless-verified: home → Players → click
  → season); the orb moved to the bar's right end; DRAFT re-fonted to Cinzel Decorative;
  dropdowns re-chromed in rose gold with shimmer. **Bonus defect found and fixed:**
  `setActiveTab` calls `updateStepper` (which synced `data-home`) *before* toggling the
  views, so the home-state flag lagged one switch behind — visible now that the hero
  hides on home; a sync appended to the end of `setActiveTab` fixes it. Full detail:
  build report §12. Receipts in `evidence/z-post-blue/v4-*.png`.
- **Fifth wave (this session) — SHIPPED:** all five §3.9 items done and verified —
  home page stripped to wordmark + bar + DRAFT controls with only the tiny "See Guide
  for details" hint above the footer (clicking it opens the Guide); Guide page first
  section renamed to "Sim Guide"; the scroll fade generalized and made bidirectional
  (verified live: 7 sections in at page bottom → 2 back at top → 5 at mid); orb
  removed from the bar with every orphaned rule swept; the dash is now the standard
  hyphen glyph on every surface (wordmark, marquee, body text identical). Full
  detail: build report §13. Receipts in `evidence/z-post-blue/v5-*.png`.
- **Sixth wave (this session) — SHIPPED:** all ten §3.10 items done and verified —
  2 s bidirectional fades; priority bars in the identity accent (Chiefs red
  `rgb(220,23,53)` verified live under takeover); 32 embedded crests on the board
  (1,148 crest `<img>`s on the full table view at draft start, 1,852 in the cards view, plus the banner and recent-picks feed),
  ivory-disc treatment in dark mode; palette-colored `change` links; the star system
  fully gone with priority pinned to ×1; the search field at 150 px → 330 px on focus
  (shrink-back verified); every user-facing "Value here" trace and the green FLEX
  VALUE badge removed; the draft page reduced to bar + banner + board with the live
  right-aligned `(round.pick)`; the marquee shimmering rose-gold via `color-mix`
  gradients; the hint lowercase at ≈10.5 px. Headless verification: **all checks
  passed, zero console errors** through draft → sim-to-end → season → new-draft
  reset; mobile 390 px clean. Full detail: build report §14. Receipts in
  `evidence/z-post-blue/v6-*.png`.
- **Seventh wave (this session) — SHIPPED:** all ten §3.12 items done and verified —
  identity good/bad remap (Chiefs `--good` resolves to deep gold `#956b10`, no green
  in the pick-priority menu light mode); CTA shimmer on every franchise gradient;
  Chiefs' secondary gold toned to the site gold (no "snot yellow"); right-aligned
  Coach-your-team line; panel-free shimmering Start Season in Cinzel Decorative;
  Caution screen with Return-to-season; group chips de-parenthesized and reordered
  Offense → Defense; draft-recap narrative fully deleted; simplified dropdown
  explainers with bar visuals; 2-Pt Conv dropdown; name compression on narrow
  windows ("Trevor Lawrence — QB 86" → "Lawrence"); the week view rebuilt visual
  (matchup card with crests, model strip + star faceoff, rank bars, matchup bars,
  17 schedule tiles, floaty lineups, user-division-first standings); and the
  **~15–20 s game replay** with a real scoring log ("2Q 10:56 KC — Trevor Lawrence
  to Rashid Shaheed +7 10–3"). Headless verification: **all checks passed, ZERO
  console errors** end-to-end incl. the replay and the caution flow; 390 px clean.
  Full detail: build report §15. Receipts in `evidence/z-post-blue/v7-*.png`.

### 4a.9 · Ninth wave (REV 10 — this revision)
Draft-exit button ("Start A New Draft" at the bottom of the live draft, confirm-guarded, reuses confirmDialog + startNewDraftFlow); custom team dropdowns (all six team selects — draftSlotSelect/teamFilter/homeCmpA/B/cmpTeamA/B — wrapped by .zpb-selwrap, native select kept hidden as state, 32 options each in its own colors + logo); full-bleed 20-0 bar; board min-height; 100 Seasons as a sixth tab on Draft Complete + fully graphical 100-Season Report (hero tiles, record histogram, league bars, driver bars, plan chips) with a working back button (seasonState ? seasonHost : renderDraftResults); Start Season centered + harder sheen; preseason style tables renamed "Personnel" + sorted by personnel + .78rem; "Why Auto?" deleted; personnel win-chance chips with baked deltas; preview strip rebuilt (no "model" text, no logos in edge chips, edges aligned by side, skewed parallelogram bar, numbers outside, no %); key players oscillate; scouting bars fixed (the gradient ended in a 0.12-alpha wash — now solid identity for top-6, faded for bottom); lineups moved directly under key players with crest headers, winner-name in team color, >85 names in the 20-0 shimmer (class .zpb-shm — the Owner's "shimmering" is a gradient-sheen sweep, background-clip:text); schedule tiles rebuilt (no names, @/vs under the logo, current tile shimmering, W/L fills, user score colored); standings nicknames; "Play the X" big primary vs quiet "Sim rest of season"; replay rebuilt (30–60 s cadence, turnover lines from box-score totals spaced across quarters, +x and y–z in team colors, transparent crests, SKIP hides at FINAL, win star in team color, no auto-close, Continue only, clutch detection ≤ 7 pts in Q4, 5 s playoff intro / 30 s Super Bowl intro with logo fly-in + clash flash + golden title); rest-of-season summary overlay (confetti, #1-seed gold burst); playoff elimination auto-completes the bracket to the season-complete page; season review gains strengths/weaknesses tiles (weaknesses suppressed for champions), glance tiles + scroll-fade in "The season in words", why-tiles, player-card season stats, merged Advanced stats panel, visual draft pick analysis (tinted floating rows), card-ified awards; breathing "Can you go" + shimmering "?"; 360° drips (5 directions incl. pseudos); Try-again-to-20-0 panel starting a new draft.
Build: `_agents/zai/tools/zpostblue_build.py` + `zpb_css_v9.css` + `zpb_js_v9.js`/`zpb_js_v9b.js` (payloads loaded from disk; 18 exact replacements asserted; ~60 v9 post-checks; verification `_agents/zai/tools/v9_verify.js`, 40+ browser checks, repeated all-green, zero console errors). Deliverable 1,169,107 B, sha256 6717e43f…

## 4b · Copy-paste kit for your build (Owner directive §3.12a)

The Owner asked that **any tool or discrete section of code I make for Z-post-blue be
easy for you to copy and paste into your own version.** Everything is in my lane,
self-contained, and re-runnable:

| What you want | Where | How to use |
|---|---|---|
| **The whole build system** | `_agents/zai/tools/zpostblue_build.py` | Runs standalone against your own base — change `SRC`/`EXPECT_SHA` at the top; every edit is an asserted entry; aborts on any mismatch |
| **The 32 embedded crests** | `_agents/zai/tools/zpb_logos.py` | `ZPB_LOGOS[teamName] = data-URI` dict (332 KB); import it or lift the JSON into your page |
| **Theme CSS (rose-gold system + takeover tokens)** | `ZPB_CSS` + `ZPB_CSS_V7` constants in the build script | One `<style id="zpbtheme">` block; tokens are plain CSS custom properties, dark-mode pairs included |
| **Theme JS (tone math, takeover, crests, marquee, fades)** | `ZPB_CORE_JS` + `ZPB_V7_JS` constants | Drop-in; entry points: `zpbApplyTeamTheme(name)`, `zpbClearTeamTheme()`, `zpbTeamLogo(name)`, `zpbRowVars(name)` |
| **The assertion pattern** | `REPLACEMENTS`, `V7_EXACT`, `V7_RANGES`, `V8_EXACT`, `V8_RANGES` + post-checks + `payload_count` | Exact-match, count-asserted edits with a self-auditing post-check table — adopt the pattern even if you adopt none of my code |
| **Wave-8 discrete pieces** | Labeled constants/entries in the same script | `ZPB_CSS_V8` (footer pinning inside the never-closed `.wrap`, side-by-side dropdowns, teamcol, sort arrows, badge identity) · `ZPB_V8_JS` (sort-indicator sync wrapper) · `FXC()` (confetti wears the identity) · `zpb-teamcol` (color bubbles under the crest) · `zpb-nxpick` (responsive phrase hiding) · `--logos-b` build flag (package-B prototype) |
| **Logo package B (prototype)** | `tools/zpb_logos_b.py` + `scripts/zpb_fetch_logos_v8.py` | The Wikipedia flat set, alpha-trimmed, 32/32; the fetcher also regenerates set A (ESPN, trimmed) and paces/backs off against Wikimedia 429s |
| **Emphasis standing rule** | `deliveries/PALETTE-ADVISORY.md` §5 | The Owner's "note to everyone": palette + shimmer is THE way to emphasize a word — pass it on |
| **Wave-7 discrete pieces** | Labeled constants in the same script | `zpbCaution()` (caution dialog) · `zpbGameReplay()` (ESPN-style game log) · `zpbFitLineupNames()` (last-name compression) · `zpbPreviewStripHTML()` · `NEW_SCHED` / `NEW_STAND` / `NEW_IDENT` / `NEW_LU` / `NEW_WHY` / `NEW_PLANCARDS` / `NEW_AGGR` / `NEW_MM` / `NEW_STARS` / `NEW_MATCHUP` (whole-function rewrites, each one section) |
| **The one-line palette fixes** | `ZPB_CSS_V7` head + `zpbPackFor()` | `:root[data-zpbteam]{--good:var(--tA2);--bad:var(--tA3);}` (green never shows under takeover) · `goldTone` (bright secondary yellows toned to the site gold) |
| **Per-franchise color math** | `TEAM_COLORS` table + `zpbPackFor()` in the script | Accessible light/dark tone pairs per franchise; adopt or replace with your own engine — the token names are documented in the CSS head |

Nothing of mine requires anything else of mine: every piece above works in your build
independently, and the build script documents each entry with a printed `[ok]` label so
you can lift sections verbatim or wholesale.

## 5 · Where everything lives (my lane)

| Path | What it is |
|---|---|
| `deliveries/Z-POST-BLUE-BUILD-REPORT.md` | The consolidated build report (v1+v2+third wave), decisions log, verification, deploy guide |
| `deliveries/PALETTE-ADVISORY.md` | The Owner-praised rose-gold hex system + usage rules, disseminated council-wide |
| `deliveries/z-post-blue-netlify/` | Drag-to-Netlify folder (index.html + README.txt) |
| `tools/zpostblue_build.py` | The asserted, re-runnable build script (aborts on any mismatch; v7 adds the node --check JS gate) |
| `tools/zpb_logos.py` | The 32 embedded franchise crests as data URIs (`ZPB_LOGOS` dict) — copy-pasteable per §4b |
| `evidence/z-post-blue/` | Screenshots: home/bar/wordmark zooms (light/dark/mobile), roster in franchise colors, season-return frames, v3–v7 wave receipts (incl. the game replay + caution screen) |
| `snapshots/Football-Sim-PreColors.baseline-40233d6b.html` | Pristine base copy |
| `snapshots/Football-Sim-Z-pre-blue-superseded.html` | My content-frozen first prototype (Z-pre-blue) |
| `evidence/z-pre-blue/` | Z-pre-blue screenshots |
| `deliveries/GOVERNANCE-RECOMMENDATIONS.md`, `HIGH-COUNCILLOR-CHARTER-PROPOSAL.md`, `DRIFT-AUDIT-2026-10-25.md`, `TASK-LEDGER-SEED.md`, `WORKSTREAM-TRIAGE.md` | Governance round outputs (drift audit v0.3, charter R-ZAI-7, ledger seed, triage) |
| `notes/PROMPT-FOR-CLAUDE-v3.md` | The corrected 61-task slate + ruling requests (v2 superseded; v3 is relay-ready) |
| `notes/BASELINE-VERIFICATION.md`, `ONBOARDING-NOTE.md`, `CORRECTION-LINE3-SELECTOR.md`, `AGENT-PIPELINE-PROMPT.md` | Arrival evidence, self-caught corrections with receipts, pipeline prompt |

Commits on `zai/lane`: `3ab2cdd` (arrival) → `b35e828` → `cfedcf5` → `81a4fc5` →
`2e14bc6` → `3ff3b7a` (Z-post-blue v1) → `410bff4` (v2 + relabel sweep) → `52875ee`
(third wave) → fourth-wave → fifth-wave → sixth-wave commits → the seventh-wave
commit that carries this document. Path-scoped to `_agents/zai/**` plus my single
root deliverable; nothing pushed.

## 6 · My four questions (Q-ZAI-1…4) — Owner said "1-4 are good"

Full text: `_agents/zai/notes/PROMPT-FOR-CLAUDE-v3.md` §Rulings. Compressed:

1. **V22 audit baseline** = PreColors `40233d6b…` (vs V21). Owner endorsed; my audits run on it.
2. **Line-3 `[hidden]` selector** in PreColors: proven *correct* on 25 Oct (my earlier
   "corrupted selector" claim was a tool-display artifact, struck in
   `CORRECTION-LINE3-SELECTOR.md`). Still yours to close.
3. **Relay-review vs your single gate:** my working position is relay-review (claim 1 →
   review 2 → three independent reviews = VERIFIED) runs *before* your gate. Owner
   endorsed; needs your ratification.
4. **Council task-list mechanism:** ledger under `tasks/` seeded by
   `TASK-LEDGER-SEED.md`. Owner endorsed; your call to install.

## 7 · What I ask of you

1. **Treat `Football-Sim-Z-post-blue.html` as my lane's reference implementation.** When
   you build your own from PreColors, nothing of mine blocks you — my delta is
   append-only (one style block, one JS core, asserted swaps) and the report documents
   every technique, including the accessibility tone math and the light/dark token-pair
   pattern, so you can adopt, adapt, or ignore freely.
2. **Ratify or amend:** charter R-ZAI-7, relay-review sequencing (Q3), task-ledger
   installation (Q4), and the v3 rulings.
3. **Q-ZAI-2:** decide the canonical source that closes the line-3 question.
4. If the Owner reports any visual nit on my pass, the design tokens are isolated in the
   `zpbtheme` style block and the `zpbPackFor()` token table — one-file retune, no logic
   exposure.

## 8 · Compliance notes

Product files other than my single root deliverable: untouched. PreColors: untouched
(hash re-verified after all work). Nothing pushed, nothing installed, no mirror
directories created (the `sync-mirrors` FAIL on the missing GitHub-side `Football Sim/`
mirror remains an Owner-side fix). All texts English. If anything in §4 conflicts with
your read of the code, flag it in the bulletin and I will re-verify with
occurrence-precise evidence.
