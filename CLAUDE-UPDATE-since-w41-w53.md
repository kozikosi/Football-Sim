# CLAUDE UPDATE — the Owner's direct instructions since w41

FROM: Z.ai (High Councillor, seat ZAI) · 2026-11-01 · the w52 round just shipped
FOR: Claude/Architect — the V23 engine swap reads this instead of re-deriving the round history.

The Owner's words are law verbatim. Below is EVERY directive he has sent since w41 shipped,
wave by wave, with the law each one fixed. This file continues the chain: rounds 34–38 live in
the w38/w39 packages' `CLAUDE-UPDATE-since-w33.md`, round 39 full text is in the w39 package's
copy, round 41 is in the w41 package's copy — **rounds 42–52 are new below.** If you swap the
engine under the shell (`Football-Sim-Z-post-blue-w52.html`, md5 `40613b81de26b5ed9c67bdcc0637ac6f`,
1,585,036 B — verify against the package's `CHECKSUMS.txt`), every line here is a regression test
you must keep green.

**Numbering:** items are `<round>.<n>` (e.g. `42.3`), matching the per-round intake ledgers'
own keys (I/N/O/K/M) — the older chain's flat 1–52/53–64 count collides with the w41 copy's
61–70, so this file does not continue it. Cross-reference: `42.3` = the w42 ledger's I3.

> **Chain note (honesty first).** Waves 45–48 shipped as chat zips the Owner holds; their
> packages are NOT on `council/zai` (the branch carries no w45/w46/w47/w48 package folders).
> Their sections below are reconstructed from the lane's law records (the w49-era §0 amendments
> and the w49/w50 ledgers' recaps), not from verbatim intake ledgers — each carries a
> `[reconstructed]` flag. Verify against the Owner's zips (`z-post-blue-wave4x-*.zip`) before
> you treat a detail as pinned. Rounds 42/43/44/49/50/51/52 are verbatim-sourced from the
> intake ledgers in their packages on `council/zai`.

---

## Round 42 — shipped in w42 (2026-10-31)

- **42.1 · The one-ink law lands on the browser.** The player browser's name text reads the
  neutral tinted ink of the homepage dropdown (dark-mode law); no more crayola vivid; the tiers
  stay 90+ shimmer / 85+ bold / everyone else neutral-but-team-tinted (his "80 everyone else").
- **42.2 · The one-ink law lands everywhere.** Every piece of text — especially player names —
  in the ENTIRE project reads like the homepage dropdown in dark mode. Washes, borders, chips,
  logos, glows and the shimmer stay team-colored (surfaces and celebrations, not text). The
  game-score inks keep the colored-score law (commandment 3).
- **42.3 · Light mode reads what dark mode reads.** The homepage light-mode team names take the
  dark-mode wording — "Let me see if it is too white on white, but I want to see you implement
  this everywhere."
- **42.4 · All-Pro First Team and the All-Playoff team lose the crayola** in both themes — the
  Position Rankings or homepage-dropdown formatting instead.
- **42.5 · The draft review's entrances time to the LOOK, not the load.** A seen-gate
  (IntersectionObserver) starts the positions'/players' entrance when the user actually looks at
  the section; skipping the cinematic releases the wait immediately; the pick-order cascade
  compresses from 1 s per beat to 0.15 s per beat (a 26-second cascade was itself part of the
  waiting he described). Reduced-motion keeps everything visible; the w37 hold survives for
  content seen while the cinematic still runs.
- **42.6 · VS. ACTUAL NFL TEAMS lives only on the draft review page** — nowhere else, enforced
  twice (render guard + a post-render sweep for strays).
- **42.7 · The Super Bowl winner cinematic covers from the first frame** — the 450 ms
  setTimeout gap (the flash of the page underneath) is dead; the overlay mounts synchronously
  in the same paint as the page render.

## Round 43 — shipped in w43 (2026-10-31)

- **43.1 · The Madden rankings cards stop growing when the window compresses** — `#` and the
  rank sit on one line (`white-space:nowrap` on the rank cells); the card no longer balloons.
- **43.2 · The player browser's NAMES join the better formatting** — the team cells and
  positions had it; the names now wear the same tinted dropdown ink, dark AND light.
- **43.3 · Light-mode team names get a little more tint** (still faded) — the pack learns
  `txM`, the light mid ink (deep team tone lifted to L 0.52).
- **43.4 · The shimmering gold is CONSTANT, every team, both themes.** With NYG selected the
  90+ names on Position Rankings went blue (the Series rows had no team vars; a deep-sheet
  `.zpb-shm` gradient still read team tones and out-cascaded the patched copies). New law:
  `:root{--zshim:var(--gold3)}` and every `.zpb-shm` reads `--zshim` first. The stars and the
  two Super Bowl champion surfaces are the exceptions.
- **43.5 · The other light-mode names get a little more tint too** (better than reverting to
  w40); Team Comparison light mode included.
- **43.6 · Small windows may scroll sideways** — the no-pan laws scope to ≥1025 px; at ≤1024 px
  the viewport itself scrolls so the whole footer is reachable. (The w20 "no horizontal
  scrolling anywhere" law is consciously superseded on small windows — his words.)
- **43.7 · The game preview treats every team the same** — the vivid-vs-faded mix is gone; one
  law, every team, both themes.
- **43.8 · Each team's score wears its own color on the during-game header** (as KC, the
  opponent was red too) — the replay header scores carry each side's pack, theme-correct.
- **43.9 · The game review dresses every number in its own team** — score lines, Team Stats
  columns, Key Players cards; the Ravens were red, they are purple. Tested across many teams.
- **43.10 · The Super Bowl champions cinematic starts OPAQUE** — the overlay's own fade-in was
  the flash; `opacity:1` from the first frame, only the stage inside keeps its rise.
- **43.11 · The Super Bowl champions shimmer in THEIR colors, not the user's** — the champion
  banner carries `--zshimL/--zshimD`; LAR champions shimmer royal blue, not the user's gold.
- **43.12 · The playoff bracket:** scores in each team's colors; seeds read `#X` (never
  `N1`/`A2`); "Click a played game to review what happened." is deleted.
- **43.13 · The light-mode balance pass (global).** All tinted text edited so far reads "a
  little more of their respective color but not fully crayola vibrant" — light mode only; dark
  untouched.

## Round 44 — shipped in w44 (2026-10-31)

- **44.0 · Guards, not edits:** "Great job implementing the gold. Keep it." · "Good job on the
  superbowl champions cinematic. Don't change a thing." — the w44 suite re-asserts both.
- **44.1 · THE HALFWAY INK (O1).** Light's `txM` is rebuilt as the halfway ink:
  `mix('#53382b', crayolaAnchor, 0.5)`, clamped to L 0.30–0.52 with a 0.22 chroma floor —
  halfway between the natural-but-tinted dark-mode tone and the too-vivid crayola. One number
  (the `0.5` in `zpbPackFor`) moves it on his word.
- **44.2 · The Pro Bowl / All-Pro placements follow** the same halfway ink.
- **44.3 · All-Pro FIRST-TEAM names are gold wherever their name is listed in the honors
  surfaces** (Pro Bowl placements included) — the `ap1Names` register feeds the awards pages,
  the story's honor cards, the HONORS EARNED overlay and `honorLineHTML`.
- **44.4 · The playoff intro speeds up** — 36 s → 22 s (−39%); the Super Bowl keeps its 60 s.
- **44.5 · No result leaks mid-game** — the w37 FX safety timer drained queued celebrations at
  15 s unconditionally (mid-wildcard-intro, as the second star pair landed); it now re-arms
  while a cinematic overlay is up and drains only at the whistle / Continue.
- **44.6 · Build comments never print** — the `// w43 (N9…)` note that leaked into the review
  as literal page text is out of the template string.
- **44.7 · "RUSH/PASS:" reads `Rush / Pass`.**
- **44.8 · The map's reveal slows to 0.5 s per player** (the w42 0.15 s compression retires for
  the field map; the draft-board cards keep their own cadence — not named by him).
- **44.9 · The during-game opponent score wears the opponent's color in LIGHT mode too** — root
  cause: the replay's `.zpb-replay b/span/div{color:inherit}` law (0,1,1) out-ranked the
  single-class score rules; the two-class rules `.zpb-replay span.zpb-slsc-aw/hm` (0,2,1) now
  win in both themes. Never re-lower them.

## Rounds 45–48 — shipped in w45/w46/w47/w48 `[reconstructed — the packages are not on council/zai; the Owner holds the zips]`

- **45 · The shimmer becomes the SWEEP.** The 90+ gold is the animated gradient sweep
  (`zpbshmsweep`, the deep gold breathing to `--gold2`), synchronized per surface — the
  static-fill era ends.
- **46 · The comparison sweep era.** The Team Comparison lu-cells / player cards get their own
  synchronized strip (the surface w49 later re-tunes); the generic `.zpb-shm` sweep stands
  everywhere else.
- **47 · Dark gets its own halfway ink.** `txMd` = 0.50 mix of the dark page ink and the
  crayola anchor (L 0.60–0.86, chroma floor 0.25, 4.5:1 floor vs the dark page) — the
  during-game screen's team ink rides `txMd` in dark, so DEN reads DEN, not cream. Also: the
  homepage dropdown reads last names; the review tab's depth-chart rows ride the map's beats;
  the lineup editor's bar reads `↶ UNDO · APPLY THE CHANGES (n) · RETURN TO MODEL LINEUP ·
  REVERT CHANGES` and the base-defense toggle stages beside a lineup editor; **dark-theme
  overrides must wrap their naked `:root:not([data-theme="light"])` selectors inside
  `@media (prefers-color-scheme: dark)`** — the unguarded w32-era dark selectors never come
  back; **the theme default follows the computer (`prefers-color-scheme`) and a device with no
  signal boots dark.**
- **47→48 · The constant-gold whiplash resolves.** w47 briefly made the gold a literal constant
  with a synchronized glow (`zpbshimglow`) — w48 RETIRED that: the shimmer is the w45/46 SWEEP
  again (`zpbshmsweep`, `--zshim` breathing to `--gold2`) on every surface and every team. w48
  also deliberately left the ANCHOR chip's name plain (the readability exception) — retired by
  w49 below.

## Round 49 — shipped in w49 (2026-11-01)

- **49.1 · The shimmer expansion is the task** — "check every page for where there is a 90+
  player not written in this shimmering gold": the Raiders on Team Comparison and the Madden
  Rankings players were the two named gaps.
- **49.2 · The comparison sweep breathes PALE to MID gold** (`--gold2`↔`--goldm`; light
  `#ad7f2e`, dark `#c39a4a`) — the deep-gold head retired from that surface because the far
  side's glyphs rested on it and read flat ink (the Raiders report).
- **49.3 · The Madden rankings' ANCHOR name wears the tier law again** (90+ sweep inside the
  chip on the chip's own deep→mid sweep; 85+ bold); the detail's "led by …" names join the tier
  law (they had no tier class at all — the w48 audit never saw them: "led by NAME" carries no
  trailing number for the text-walker).
- **49.4 · The chip's frame is the W49 ROSE GOLD** — border `#e2bfae` · fill `#f9ece4` · ink
  `#6b4634` (7.4:1), light only; the dark chip keeps his plum family. The yellow gold family
  retires. (This is ALSO what makes the shimmer inside the chip readable — his own w48 veto
  called the shot.)

## Round 50 — shipped in w50 (2026-11-01)

- **50.1 · NO BLACK TEXT ANYWHERE.** The light base ink `#54303f` painted 2,744 texts; the
  site's own light ink becomes the halfway rose `#8e5566` (5.27:1 on the pink page `#fdf2f6`).
  The Madden rankings rows ride the row's halfway ink (txM light / txd dark); the Position
  Rankings' AVG OVR joins its team. The only dark-on-light ink left is the `--ongold` pair on
  gold buttons.
- **50.2 · THE ANCHOR PANEL FOLLOWS THE TEAM** (`zpbAnchorVars`) — every rankings row feeds its
  chip the team's own border/fill/ink; the delicate rose gold he approved stays as the FALLBACK
  frame wherever no team context exists (the homepage version he kept).
- **50.3 · DIME is on the list** — the lineup editor's defense depth chart had NO DIME row; it
  now rides the group's bottom directly under NICKEL; the draft board's DIME row joins its
  siblings' paint.
- **50.4 · The names land twice, together** — TE3 joins the cards; every map station has a card
  twin with the EXACT same `--beat` and animation-delay.
- **50.5 · The 4-3/3-4 toggle answers** — the staged flip repaints every live lineup editor at
  once (NT/OLB1/ILB1/ILB2/OLB2; the defense rows reorder via a non-mutating label snapshot).
- **50.6 · The neutral words are cream** (as shipped in w50 — later narrowed by w51/w52):
  `--zcream` (light `#53382b` · dark `#f2e7d5`) put the game time, quarter marks, q-chip and
  TO/INT/FF boxes on neutral cream.
- **50.7 · The badges carry dots** — every digit-dash-digit renders as the middle dot (RECORD
  10·7, the scores 27·15) at the single render point. (The ancestor of the w52 dot law.)
- **50.8 · The page paper is the rose paper** — light `--bg:#fdf2f6` / dark `--bg:#1e1119` (the
  rose sheet sits at the END of the document and out-cascades the original cream sheet; the w50
  build report pins "5.27:1 on #fdf2f6"). The page moved to this paper at w49.

## Round 51 — shipped in w51 (2026-11-01)

- **51.1 · ONLY the game time is neutral** (his own correction of w50): `--zcream` narrows to
  the `.zrl-t` clock alone; the quarter chip, quarter marks and play words return to the team's
  ink. The TO/INT/FF boxes wear the BENEFICIARY'S color (TO = calling team, INT = interceptor,
  FF = the defense that forced it); the play descriptions ride the offense's color.
- **51.2 · NICKEL and DIME share one map row** — both at l=339, side by side (nickel left of
  middle, dime mirrored right) on BOTH field maps; the empty dime renders the clean middot
  bubble, no bracket ever.
- **51.3 · The homepage DRAFT button's ink is the halfway rose on default** (`--text`) and the
  team's 0.50 ink under the takeover (`--tTxM/--tTxMd` — the halfway law carried to the gold).
- **51.4 · The gold franchise pill is the CONTINUE color on EVERY Continue button** — the
  Sim-Season button's beloved gold moves to `CONTINUE TO WEEK X`, `CONTINUE TO DIVISIONAL
  ROUND`, every Continue; SIM SEASON stays in the American spot.
- **51.5 · The dot law sweeps the cinematics** — "first seed: first week bye" → all caps with a
  middle dot; audit EVERYWHERE for colons and semicolons.
- **51.6 · The playoff pregame flashes once per key player** — the center panel flashes per
  star; extra beauty/drama/intensity expected.
- **51.7 · "CONFERENCE CHAMPIONSHIP" moves slightly down** so the top key player never sits on
  it.

## Round 52 — shipped in w52 (2026-11-01)

- **52.M1 · THE LOOK-GATE RELEASES ON ONE CLOCK** (the session's main work): the draft-review
  map's look releases EVERY breakdown group and depth zone in scope on the map's exact clock —
  select by `.zpb-seen` class state, NEVER by `:not([data-zseen])` (data-zseen means OBSERVED,
  not SEEN — the old filter matched nothing, which was his "line of scrimmage first" delay).
  The mirror law holds (cards first → the map follows, the MAP'S OWN `--dfc-cine`); a 900 ms
  failsafe re-sweep; the skip release includes the depth zones.
- **52.M2 · THE QUARTER CLOCK RIDES var(--text)** — the same neutral team ink the word FINAL
  wears at the top of the during-game scene. The w50/w51 CREAM LAW IS RETIRED by his own words
  (`--zcream` keeps no `!important`; the token survives unused; never restore it).
- **52.M3 · COTY reads "YOU"** for the user's team; the "led them to N wins against M
  projected" sentence is REMOVED.
- **52.M4 · THE AWARDS:** the position is the FIRST badge as `#X Y` (rank at the position by
  rating, `posRankOf` over `honorCandidates`); the plaintext position under the name is GONE.
- **52.M5 · Chip borders are SOLID ONLY** — the dashed border around targets/catches
  (throws/completions) is removed.
- **52.M6 · THE STATISTICAL CHAMPIONS carry their badges** (`zpbStatChipsHTML(rec, winKey)`;
  the `_lead` map puts the winning stat first — PASSY/RUSHY/RECY/zpb-splain/TD/SK/INT/TKL/RETY/FG;
  RETY appends whenever `st.retYds` exists); "Scrimmage" is gone from the TD title.
- **52.M7 · THE MATCHUP-MATH BARS** — the track is the quiet ink wash (NEVER `var(--border)`:
  the takeover repaints it as the franchise hairline — the 49ers red-on-red); the home fill
  anchors to its outer edge (`margin-left:auto`; assert geometry, not the literal — headless
  getComputedStyle resolves it to px); all 32 teams, both themes.
- **52.M8 · The featured-game sentence is gone** ("the league's top-rated QB profile, carrying
  Buffalo Bills to 12 wins").
- **52.M9 · THE ADVANCED STATS** — every "/ g" reads "PER GAME"; every advanced number wears
  ONE ink (the good/bad state lives on the card border).
- **52.M10 · The bye week's top game is the most likely opponent** (the lowest seed playing);
  the "AREN'T PLAYING THIS ROUND / the game everyone is talking about" line is gone.
- **52.M11 · THE SUPER BOWL IS PLAYED** — when the user's team is in it, the during-game
  cinematic OPENS first (`__zpbSBReplayHold`; `simulatePlayoffRound('superbowl')` sets it
  before opening the replay and frees it immediately if no overlay mounted; the replay's
  `close()` releases the hold and fires `zpbPostSuperBowlCine()` if `__zpbSBFinPending`; the
  complete-view hook also holds while the flag is live). The SB pregame wears the cup, the LIVE
  banner, three bursts, fourteen embers, two grand flashes at INTRO_MS−1500/−900; the game
  earns the HALFTIME SHOW card at the 3rd-quarter mark (the seq beat stretches to 4300 ms).
- **52.M12 · THE BRACKET @** — un-played tree cards read their own width: compressed → the @ on
  its OWN line; roomy (≥190 px) → @ and both teams on ONE line (per-card container queries,
  `.zpb-tree .bracket-game{container-type:inline-size}`; assert `(card.offsetWidth >= 190) ===
  (display === 'flex')`).
- **52.M13 · THE UNIT REPORT CARD IS UNIT ANALYSIS** — the backs read as ALL backs, the corps
  as the whole corps, the kicker's numbers carry no name; no player is singled out.
- **52.M14 · Standing thanks:** "THE PLAYOFF CINEMATICS ARE AMAZING. THANK YOU SO MUCH." ·
  "TAKE YOUR TIME TO COMPLETE THESE TASKS."

---

## The standing laws (the REV 13 §0 list, current as of w52 — re-attach them)

Integers only (the PRTG decimal; the draft board's WINS/PRIORITY one-decimal) · no white text ·
**w41**: every 90+ shimmers (the per-team cap is retired) / 85+ bold · **w43**: the shimmer is
the CONSTANT deep gold on every surface · **w48**: the shimmer is the W45 SWEEP (`zpbshmsweep`,
deep gold breathing to `--gold2`) · **w49**: the comparison lu-cell/pcard sweep breathes PALE to
MID gold (`--gold2`↔`--goldm`); the ANCHOR name shimmers inside the chip · **w50**: the ANCHOR
PANEL FOLLOWS THE TEAM (`zpbAnchorVars`), the rose gold is the FALLBACK frame; NO BLACK TEXT
ANYWHERE — the site light ink is the halfway rose `#8e5566` · **w51**: the DRAFT button's ink is
the halfway rose on default and the team's 0.50 ink under the takeover; the gold franchise pill
is the CONTINUE color on EVERY Continue button; NICKEL and DIME share one map row (both l=339);
the TO/INT/FF boxes wear the BENEFICIARY'S color · **w52**: THE DOT LAW (every displayed colon
and semicolon renders as the middle dot); THE QUARTER CLOCK RIDES `var(--text)` (the cream law
is RETIRED); THE LOOK-GATE RELEASES ON ONE CLOCK (`.zpb-seen`, never `:not([data-zseen])`;
mirror law; skip covers the zones); THE AWARDS (`#X Y` leads, no plaintext position, solid
borders, champions carry their badges, COTY reads YOU); THE MATCHUP-MATH BARS (quiet ink-wash
track, never `var(--border)`, fills face off from their outer edges); THE ADVANCED STATS
("PER GAME", one ink); THE SUPER BOWL IS PLAYED (the game leads, the storm waits for the
whistle; cup + LIVE + bursts + embers + HALFTIME SHOW); THE BRACKET @ (container queries at
190 px); THE UNIT REPORT CARD IS UNIT ANALYSIS · Cinzel Decorative · the ink pair `--txM` light /
`--txd` dark is the site's neutral team text ink · the replay's `color:inherit` law is beaten
only by two-class score rules — never re-widen them · the theme default follows the computer
and a no-signal device boots dark · the Owner's words are the labels · explanations live in the
Guide.

## What to keep green (the engine-swap regression list, w52 era)

The current batteries are in the w52 package (`tools/`): `w52_syncbattery.js` (the M1 law) ·
`w52_live.js` (M2..M14 — drives a rigged season; wraps `playGame` ONCE before
`simRestOfSeason`, a second wrap recurses) · `w51reg_live.js` (the standing laws; its R1a
asserts the w52 clock law now) · `w52_evidence.js` (32 teams × 2 themes) · `w52_mobile.js`
(390 px — click `tabDraftBtn` before scrolling to the review map, or the view stays hidden and
the observer never fires) · `w52_nodecheck.js`. The stress suites drive a full draft → season →
playoffs → Super Bowl → champion page with zero console errors. If your V23 engine changes a
number, a name, a timing or a layout the Owner legislated, the suite will name the directive
you broke.

## Version truth (w52 era)

- Product: `Football-Sim-Z-post-blue-w52.html` · md5 `40613b81de26b5ed9c67bdcc0637ac6f` ·
  1,585,036 B (w51 `e40732a2…` 1,571,506 · w50 `babc5dc1…` 1,559,883 · w49 `6bf627b0…` 1,548,598
  · w48 `d8b64fd7…` 1,546,441 · w47 `eef6b938…` 1,548,267). The Owner's zip is truth; verify
  the hash, never the location.
- The per-wave intake ledgers (the Owner's words verbatim, item by item) live in each wave
  package on `council/zai` (`notes/W<n>-INTAKE-LEDGER.md`). Rounds 45–48 have no package on the
  branch — the Owner holds their zips.

## Open item this chain carries (flagged, awaiting the Owner's round)

`zpbPackFor()` still computes every readability floor against the RETIRED page pair
(`bgL='#fcf7f1'` / `bgD='#181114'`) while the shipped page renders `#fdf2f6` / `#1e1119` (the
w50 rose paper; the page moved at w49). Measured with the shipped function's own math (all 32
teams × both themes): with the old references, eight of the nine floors fail worst-case against
the REAL shipped page (accL 4.49 LAC · acc2L 4.13 LAC · acc3L 4.11 CLE · txL 6.83 BUF · txM
4.89 PHI · accD 4.52 MIN · acc2D 4.13 SEA · acc3D 4.18 TEN; txMd passes); with the new
references every floor passes. All 32 teams' packs shift (`--tBg/--tBgd` takeover paper,
hairlines, `--tSu` for everyone; text/accent inks for about half the league). The
`<meta name="theme-color">` is also still `#fcf7f1`. The fix is a two-hex edit PLUS a full 32×2
evidence re-sweep — it moves the Owner-visible inks, so it rides his round; the full
measurement is in `_agents/zai/notes/2026-11-01-zpbPackFor-contrast-backgrounds.md` and the
ready probe is `_agents/zai/tools/w52_packbg_probe.js`.

— Z.ai · the shell is at w52; this file plus the w38/w39/w41 copies is the complete round
record since w33; the Owner's laws are not negotiable; welcome to the chase for 20-0.
