# Council idle brief — 22 Oct 2026 (Kosi)

**If you are idle, this is what needs doing, how to help, and what the site should become.** Read the
reading map at the top of the work order (`V22-Suggestions.md`) and take the highest-priority open
item nobody has claimed. **Work is posted openly; nobody is assigned.** If you take one, say so in the
bulletin with one line: "Taking P1-2 (the quarter cards) — started, ETA tonight."

**Two things this brief asks of you, beyond finishing tasks:**
- **Do not stop after one task** (§3.5). A session is a run of tasks, and before you go idle you
  work the loop until there is genuinely nothing left.
- **Bring beauty** (§4). The Owner's brief is half visual, and the site is a text game that should
  feel like a stadium. Propose as well as implement (§6) — a concept with a sketch is a real
  contribution, and the Architect owns the product file.

---

## §0 · What changed since this brief was written (22 Oct 05:15 — read this first)

- **The colour build is newer than the brief.** `V22-candidate-teamcolours.html` is now
  **`e2b0ea855358b2deaf371178…`, 663,706 B** (gate exit 0, A–I PASS, 0 page errors, receipt
  `3c8daedb9b30`). It now carries **your team's frame** (the drafting-as border in the primary, a
  tri-colour stripe primary → secondary → accent, the name in the primary) **and every board row in
  its NFL team's colour**, and the **32-team palette is emitted as CSS**
  (`[data-team="Kansas City Chiefs"]{--t1/--t2/--t3}`) so any surface can carry a team's colours.
  **The hooks for the opponent's side are built too**: `teamTag(name)`, `.opp-panel`, `.gamestar`.
  **Do not rebuild it; take `e2b0ea85…`, not `7eeffa86…`.**
- **The team-colour canvas and the Figma packet are in the work order** as **P14** (twenty surfaces,
  one rule each, each takeable) and **P15** (the tool map and the hand-off packet). S2 is built; the
  rest are specified and waiting.
- **The tool map — know it before you design anything.** **Claude has Figma**: he can execute in it,
  read designs, pull screenshots and design context, and generate diagrams. **Mermaid, Biome and Git
  are for everyone. `session.send` is for nobody.** So the visual work has **one owner and many
  authors**: the council writes the rule, the palette and the data; Claude executes the design in
  Figma and returns the frame, the screenshots and the tokens; the council's CSS is the implementation.
  **A seat with no Figma is not blocked — the rule and the data are what a design needs.**
- **The Guide panel is gone from both pages** (the guide page and the homepage's guide panel) — one
  shared HTML string, one removal. Still pending in the artifact: the section title **"Football and
  site terms" → "Glossary"** (one line, work order P1-3).
- **The sort-by-value option is removed, not relabelled** (the Owner's "remove the whole button from
  the Sort drop down"), and the maths behind it is untouched.

## 1 · Where the project stands

- **The live build is `Football-Sim-V21.html`** (root, sha256 `044d1759…`, 656,746 B). The next
  release is **`Football-Sim-V22.html`** — the Architect's to produce. Nothing else is a release.
- **`V22-Suggestions.md` is the work order** (~160 KB): a mermaid map of the document, a table of
  where each section lives and its state, and the suggested work queue.
- **Two artifacts are already built and gate-verified** — do not rebuild them. **Take the newest one in
  `_agents/minimax/prototypes/`; the work order's built-work table carries its current hash and receipt**
  (the table is the authority, not this paragraph — a hash written here goes stale, a table entry does
  not). They are also on `origin/council/minimax-lane`. **Diff, don't rebuild.**
- **The Owner's rounds, and where they live in the work order:** the 21 Oct and 23:00 rounds in **P10**, the 23:30 round in **P11**, the 22 Oct round in **P12**, the team-colour work in **P13** (built) and **P14** (the twenty-surface canvas), and the tool map and the Figma packet in **P15**. **The work order is the index; this brief is the method.**

## 2 · The work, in priority order

**P0 · Take what is already built.** The briefs 1–3 (the "Value here" removal and its CSS reflow,
the "MORE" label, the badges moved, "Default" / "Save My Weights", the Team Comparison page, the
Guide) and the team colours. **Take the colours build if you touch anything visual** — the two touch
the same lines.

**P1 · The copy passes** (P10-4 to P10-7, P11). Before → after, applied **verbatim**: the preseason
menu, the game preview, the game review, the season review, the 100-season report. The cheapest work
on the list and the most visible.

**P2 · The labels and the mechanics** (P10-1 to P10-3, P12). The flex rules as two replacement tables;
the 3-4 as a label-and-value mapping (OLB ≡ WILL, ILB ≡ MIKE); the unlocked coaching philosophy; the
nose/linebacker swap; "CB3 / Nickel" everywhere; no left/right language.

**P3 · The look and the excitement** (P11 and §4 below). The gold shimmering champion banner, the
confetti, the season's graphics, the chart rebuilds, the review's typography, the draft board's
polish. **This is the largest remaining surface, and it is open to every seat.**

**P4 · The weights** (protected). The five calibration factors, the constants question, the removal
of the saved user weights. **The Owner's word first, and a 100-season regression attached** — nobody
has measured the deltas yet.

**P5 · The platform.** localStorage draft persistence; the 32-team palette check (contrast, the third
colour); the mobile cards' collapse and the sticky filter header.

**P6 · The chores that unblock everyone.** Re-anchor the work order's anchors against
`Football-Sim-V21.html` with `verify-anchors.mjs` (one command); trim the bulletin (866 KB) into
`_archive/`; sweep the 135 biome findings in the other lanes.

## 3 · How to help, step by step

1. **Read the reading map, then your section.** Not the whole 160 KB. Find the section by its title.
2. **Take the highest-priority open item nobody has claimed**, and say so in the bulletin. If you
   cannot take it, say "not taking tasks this round" once — a normal, respected answer.
3. **Stay inside your authority.** The default is **PROPOSE**: work in your lane and hand the
   Architect a change set. **IMPLEMENT** only for files you were explicitly told to change.
   **VERIFY** means you did not write what you are checking. **Never** edit the product file,
   `AGENTS.md`, or the protected constants without the Owner's or the Architect's word.
4. **Measure before you claim.** Every number comes from a command you can paste, taken from the
   build you name (file + sha256). A line number is a hint, not an address.
5. **Build in your lane and commit the same day.** `git add -- _agents/<seat>/` only. **Never**
   `git checkout`, `git clean`, `git stash`, `git reset` or `git restore` in the shared tree — a stash
   restore there replaced two shared files on 21 Oct, and there are hundreds of uncommitted paths in
   the tree at any moment. If a shared file changes and you did not change it, do not revert it: note
   it and ask.
6. **Verify with the tools, and show the output.**
   - `node _agents/minimax/tools/post-merge-smoke.mjs "<build>" --port 9222` → exit 0, A–I PASS, 0 page errors.
   - `node _agents/minimax/tools/board-mobile-probe.mjs "<build>"` → 0 overlapping cells, 0 clipped, 0 px horizontal overflow. Run it for anything user-facing.
   - `~/node_modules/.bin/biome check` for any JavaScript you write.
   - `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-V21.html` when the anchors are in question.
   - Diagrams go in **mermaid** (it renders in the repository). The **palette, the state list and the
     data model** go to the Architect for Figma; the council does not design in Figma.
7. **Write it in the one form**: `WHERE file + line · WHAT old → new, exactly · WHY one line ·
   SAFE ALONE? yes|depends · HOW TO CHECK the command`. If the item already exists, **add one line —
   your measurement, your agreement or your dissent** — instead of restating it.
8. **Report with evidence**: what you built, its sha256, the command and its output, what you did
   **not** check, and the open decisions you hit. A change ships with its receipt.

## 3.5 · Do not go idle while there is work — take the next thing

**A session is a run of tasks, not one task.** When a task is finished and its receipt is posted, **go
straight back to the queue and take the next unclaimed item.** The Owner's words: *pick up as many
tasks in a session as you possibly can; when you finish one, pick up another; and before you go idle,
keep trying.*

**The loop, before you ever say you are idle:**
1. Read the queue in the work order's reading map.
2. Is there an unclaimed item at or above your capability? **Take it and say so in the bulletin.**
3. Queue empty? Do one of the **standing chores** — always open, always useful: re-anchor the
   work order's anchors, run the gate and the 390 px probe against the current candidate, sweep a
   lane's lint, tighten a note another seat will read, re-measure a number a decision depends on, or
   take a *verification* slot on something a seat just built.
4. Still nothing? **Then** say "not taking tasks this round."

**The courtesies:** take the top item you can do, not the most interesting one (the interesting jobs
are how a council stops being a council); say what you took and when you finished; if you abandon
one, say where it got to so the next seat continues; **do not manufacture work** — "verify what was
just built", "re-anchor", "sweep", "measure" and "tighten" always exist; and a **rate limit is a
pause, not a disappearance** — say "rate-limited until roughly X" and come back to the top item.

**And why this is safe:** nobody is *assigned* anything. You take it because it is unclaimed and you
can do it, and you say so. That is the whole allocation mechanism, and it is why it scales when
seats come and go.

---

## 4 · The Owner's aesthetic brief — every visual and excitement request, in one place

*The Owner's words, grouped and explained so a seat can pick up a piece and know the intent. These
are not "nice to have" — they are the point of the next edition.*

### 4.1 · The rule underneath all of it
> *"Ideally all game previews and game reviews are way more graphical. Full sentences should be used
> sparingly… The only thing that really needs sentences is narration of key plays in the clutch, extra
> compliments to your star players, and hyping up the next round."*

**One idea, one number, one card.** A sentence is the *last* step, not the first: the number is the
headline, the sentence says what it means. Where the Owner asked for "more like stats instead of full
sentences", the fix is a **row of figures with labels** — `21 Q3 points · 28–14 final · +3.3 rated` —
not a paragraph about them.

### 4.2 · The season's screens
- **The win banner**: *"much larger, centered on the screen, and remain on the screen for at least
  3 seconds. Similar to the Conference Champions graphic."* And: *"It would be cool if that graphic
  could also land on the screen somewhere after it shows and continue to shimmer/sparkle."* — so it
  **leaves the screen** and keeps living somewhere, quietly.
- **"Kansas City Chiefs: 14-3 · 397 PF · 296 PA"** is replaced by **two conference charts** ranking
  the team 1–16 in its conference, *"as beautiful as possible"*, and by a **March Madness-style
  playoff bracket** — *"an actual tournament style kind of bracket showing the byes and both
  conferences with the Super Bowl contestants meeting in the middle."*
- **The regular-season awards** are *"well formatted but could be made a lot more beautiful"*, and
  **your own players are gold** — *"on any awards charts, including the game ball winner."*
- **The regular-season review** is the biggest text wall in the product: *"I don't like the ui here.
  The text is ugly. Indent a lot more. The first sentence should be its own paragraph. Biggest win
  and ugliest win should be their own indentations and are ideally presented more like stats instead
  of full sentences. Each player highlighted should be on their own line and ideally presented more
  like graphics and stats instead of full sentences."* And the closing line is either removed or
  replaced with *"a better more exciting final sentence that either encourages the player to start the
  playoffs or encourages them to redraft and see if they can make the Super Bowl."*
- **"Why better or worse than the ratings?"** — *"This is great but again the ui is ugly. Could be more
  graphical."* Three lines of prose become three bars: projected vs actual, per unit.
- **"Seasons by Win total"** — *"The Left alignment … is poor and needs to be fixed. That whole chart
  could be made more beautiful."*
- **"Your players; average season"** and **"Award patterns"** — *"should be higher up and automatically
  visible."* They are the two a user checks first.
- **"Realism audit & league-wide records"** and **"Does the model predict real results?"** leave the
  user's screen; the numbers are still computed and stored.
- **The 100-season review** — *"should also be a lot more graphical. Only a few sentences here and
  there."*
- **The season review button** after the playoffs is **blue, near the top**, next to the 100-season
  simulation.

### 4.3 · The game preview
- **Tell the reader which team is which**: *"there should be a '(Chiefs)' or '(Vikings)' after 'run
  defense' and 'secondary'. I don't know which team has a good run defense by the way it is written."*
- **"Under center for the Chiefs is Matthew Stafford (99) against the Vikings' Geno Smith (74)."** — and
  delete the old "all eyes will be on …" line, because a cornerback does not draw the opposing
  defence's game plan.
- **The plans block**: *"The Ui is ugly here. Please make a little smaller and a lot more beautiful."*
- **The order**: **game plan → lineups → matchup match → opponent scouting report**, with the lineups
  *directly* below the plan.
- **The defensive packages lose their subtitles**: *"Nickel (the dot you have here is nice) Pass
  Protection"*, *"Nickel (dot) Run Defense"*, or just *"Nickel"* — and the long parentheticals
  *"(a nickel defense focused on the pass)"* go everywhere.
- **The overall line stays a number**: *"The ratings lean the Chiefs by about 9.7 points (26.6–16.8)"* →
  **"+9.7 points"**; and the per-unit "+x points a game" sentences are **removed entirely**.
- **Em dashes become periods**: *"Let's replace most — m dashes with points. Would rather that be two
  sentences."*
- **The playoff preview**: *"This should be a lot more beautiful and a lot more exciting."*

### 4.4 · The game review
- **The report starts with the quarters**, not with a summary: **"1st Quarter · 2nd · 3rd · 4th"**, and
  the "had ripped off 21 unanswered points" recap sentence is gone.
- **The scoring lines become box-score lines**: *"Rushing TD (dot) D'Andre Swift (Chiefs 7-0)"* — a
  dot, the play, the score.
- **The turnovers line becomes a score**: *"Turnovers: Chiefs 1 - 0 Vikings"*, then *"Jaylon Johnson
  interception (4th Q)"*.
- **The star heading becomes an actual star** — *"Replace 'Stars of the game:' with an actual Star,
  maybe glittering?"* — and the slots are reserved for **90+ rating performances** (60+ rushing yards
  for an offensive player, 300+ yards and a 3:1 TD/INT ratio for a quarterback) without the rating
  ever being shown.
- **"How it was decided"** loses every "+x points" phrase except the overall one (**"+3.3 points"**),
  and the pass-rush sentence reads *"but"*, not *"and"*; **1–2 sacks is "mid", 3+ is "exceptional"**.
- **"The Chiefs move to 1-0; the Vikings slip to 0-1."** is its own paragraph.
- **The "Game plans" block in the review hides** behind an arrow, like the other drop-downs.
- **The typography**: *"This whole font is terrible. Needs to be made a lot more beautiful and maybe
  can fade into the page."* — softer ink, more air, a lighter rule between blocks.
- **The box score of the quarters** table: *"can be made larger and more beautiful."*
- **The game ball's player must always be in the Key Players chart.**

### 4.5 · The draft
- **The team's colours** — the header badge, the row edge, the cards — already built; the palette is
  32 teams × 3 colours and it is the site's accent.
- **The board fills its panel**: *"about two more names"* on a desktop.
- **"You're on the clock — Round 2 of 26, Pick 14 (overall 46 of 832)"** gets bigger text.
- **The round in the drafting box is live** and **right-aligned**; "Undo" replaces "Undo my last pick".
- **"Your Roster · Depth Chart · Pick Order"** reads across, not down.
- **The position cards follow the roster order**, and show flex potential **only at −2 or −4** (−6 and
  −8 appear after the 20th round).
- **On mobile the cards collapse** to icon + abbreviation + OVR, expanding on tap, with the
  sort/filter controls in a sticky or collapsible header.

### 4.6 · The preseason
- **"Selected: Balanced offense with two tight ends (12 personnel, balanced) · Nickel defense focused
  on the pass"** — *"Just improve the ui of this. It's ugly as is."*
- **"Your strongest units" and "your weakest units"** get their own indentation, **side by side** if it
  fits.
- **The top three setups become three distinct cards**, not one sentence.
- **The philosophy dropdown's text gets significantly larger**, and **every description under it**
  becomes beautiful — the Cautious / Balanced Approach / Aggressive cards, and the smaller follow-up
  line under Aggressive.
- **"Why we recommend Auto" is removed**, and the duplicate "the label stays the same all season…"
  sentence appears once, not twice.

### 4.7 · Motion and reward
> *"In general I would like a lot more motion of graphics coming in and out of the screen, text coming
> in and out of the screen, and more ideas like the confetti and the banners to make a text based
> game a lot more exciting."*

**The rules that keep motion tasteful** (they are in the work order as P11-3): motion is for
**arrivals and the big moments** — the banner, the trophy, the final score, the award cards — not for
every table; **one thing moves at a time**; **text that arrives stays** (nothing slides away while it
is being read); **confetti is for the trophy only**, a short burst that settles; and the
`prefers-reduced-motion` guard is **not optional** — the site must read perfectly with motion off.

**The reward moments worth designing:** the championship banner (gold, shimmering, then it lands and
keeps sparkling), the confetti burst, the trophy, the award cards with **gold for your own players**,
the glitter on the star glyph, the *"!"* that makes the Super Bowl line land.

### 4.8 · Advanced stats
> *"It would be awesome if there were more advanced stats and when you click on the advanced stat it
> tells you why you did well or why you did poorly."*

So each advanced stat carries a **one-line "why"** on click, and the explainer
("Advanced stats: what really produced sacks and runs") is **highly condensed** and only visible when
you click the Coverage, Sacks or Offensive Line entry. "More Advanced Stats" becomes **"Advanced
Stats"**.

## 5 · The design principles these requests imply

1. **A number beats a sentence; a card beats a paragraph.**
2. **The user's team is the accent colour** — their team, their gold, their name.
3. **Hierarchy through space, not through more colour.** Indent, rule, air.
4. **Motion is punctuation, not decoration.**
5. **One idea per block**, and a block that can be a chart should be.
6. **The reader should never be told something the screen can show them.**
7. **Delight lives in the moments that earn it** — the trophy, the banner, the last play.

## 6 · Creativity counts as work

**A seat may propose a visual concept, not only implement one** — and that is real contribution. A
proposal is: the block, what it should contain (the numbers, from the build), the shape (a table, a
bar, a card, a bracket), a **sketch** (mermaid for a flow, a few lines of CSS for a visual), and the
one sentence it should say. Hand it to the Architect in the work order's form, in your lane, and to
the bulletin in one line. **The council does not design in Figma** — the palette, the state list and
the data model go to the Architect, and the Architect owns the visual system.

## 7 · What is not yours to change

The product file (the Architect's), `AGENTS.md` and the governance documents (the Owner's and the
Architect's), the protected constants without the Owner's word, and the history — no renumbering, no
deleting old records. If a change needs any of those, write the proposal and let the Architect
apply it.

## 8 · The committee rules, in one place

Post work openly with its priority, scope and acceptance bar. **Never assign a task to a named
agent** — the first free seat takes the top open item. Date-stamp your entry ids (`M-20261022-a`) so
two seats cannot claim the same number, and never edit another seat's label. Commit your own work
the day you make it. Propose; do not edit shared documents. Disagree in public with evidence: a
council that converges early loses more than it saves.
