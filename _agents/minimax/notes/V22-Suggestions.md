# V22-Suggestions

**From the council** (written by MiniMax, seat S-1900–1999) · **21 Oct 2026** · **for:** Claude (Architect) and Kosi (Owner)

**What this is.** The council's consolidated, priority-ordered work list for V22, in the format Kosi asked for: **each item is a piece of code with a comment saying where it belongs and what it adds, removes or replaces**, so Claude can read it quickly and fix his V22 without re-deriving anything.

**Base:** **V21** = `NFL Draft Simulator merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B. Line numbers below are V21 line numbers.

**Two tags:**
- **[DONE]** — already implemented and verified in the V22 candidate: `_agents/minimax/prototypes/V22-candidate-2026-10-21.html`, sha256 `e5fa7e0e891368099ef87f3b956f69a160a15a69c43711d6e00fefd09a8490fe`, 660,046 B. **Claude can diff that artifact** rather than apply these by hand. Built by chaining three re-runnable builders (`tools/build-owner-brief-variant.mjs` → `…2-…` → `…3-…`), every anchor asserted.
- **[NEW]** — from Kosi's 21 Oct brief, written here for the first time.

**Receipts for the [DONE] items:** `post-merge-smoke.mjs` exit 0, A–I PASS, 0 findings, 0 page errors (receipt `88675335a98b`); `node --check` exit 0; 390 px probe 0 overlapping cells, 0 clipped, 0 px overflow; live-probed with `tools/v22-probe.mjs`.

---

# P0 — The draft board: readable, and honest about what it is showing

### P0-1 · [DONE] "Value here" is gone from the board, the guide and the sort label
```js
// WHERE: candidate line 426 (the board header), 1766 (the row cell), 268-269 (the mobile grid),
//        418 (the sort dropdown), 4991/4992/5056 (the guide)
// WHAT: REMOVES the "Value here" column and every mention of the phrase. ADDS nothing to the maths:
//        r.v is still computed for every row and still feeds Priority, the priority bar, the flex tag,
//        the group best, the replacement counts and the sort key. The sort option is KEPT and relabelled
//        "Sort: slot value" so no visible control names a column that no longer exists.
<th data-sort="priority" class="sortable" title="Wins at this spot minus what you would probably still find at that position at your next pick. High = waiting costs you.">Priority</th>
// CSS: the td.dc-val rule is deleted and td.dc-pri reflows 10/13 -> 7/13. Measured: the grid is
// repeat(12,1fr) — 12 columns — and ONLY dc-pri moves (dc-gone is on row 3; Pos/Team are nth-child
// selected and the deleted cell is the 6th child).
```
**Verified:** 0 occurrences of "value here" left in the page; Priority still populates (1,121 of 1,133 cells non-zero mid-draft); 390 px clean.

### P0-2 · [NEW] The board shows a player at a spot he is worth **less** at, and then advertises the better spot
This is the Cooper DeJean row Kosi reported. **Reproduced and diagnosed** (live, Kansas City Chiefs, pick #19, round 2 of the CPU run):

| DeJean (CB, 89 OVR) placement | flex? | value | priority |
|---|---|---|---|
| **FS** | no (a CB may play FS for free) | 0.813 | **−0.114** ← **shown** |
| **CB1** | no (natural) | **1.374** | −0.167 |
| SS | yes −2 | 0.755 | −0.223 |
| MIKE | yes −4 | 0.653 | −0.269 |
| WR1 | yes −4 | 0.811 | −0.429 |
| TE1 | yes −6 | 0.513 | −0.448 |
| RB1 | yes −6 | 0.372 | −0.449 |

**Two rules disagree.** The row's *displayed* slot is chosen by **priority** (scarcity: "where will he be gone?"), while the *“also fits”* line is chosen by **value** ("where is he worth most?"). So the board displayed DeJean at **FS (+0.81)** while the same row advertised **CB1 (+1.37)** — a spot worth 0.56 wins more, and his natural one. The code's own comment says the opposite of what the code does.

```js
// WHERE: candidate line 1745-1748 (inside renderDraftBoard2, the per-player slot choice)
// WHAT: CHANGES the ranking key from priority to value. Priority answers "where is he scarce"; the
//        Fills cell answers "where should he play". Ranking by priority put Cooper DeJean at FS
//        (+0.81) while the row's "also fits" advertised CB1 (+1.37). The natural spot still wins ties.
//        NOTHING else changes: the Priority column keeps its own meaning and still shows r.pri.
   // show the player where he is worth the most to you right now (flexes included); on a tie the natural spot wins
-  const rk = x=> Math.round(((x.pri!=null?x.pri:x.v))*100);
+  const rk = x=> Math.round(((x.v!=null?x.v:0))*1000);
   if(!cur || rk(r)>rk(cur) || (rk(r)===rk(cur) && cur.flex && !r.flex) || (rk(r)===rk(cur) && cur.flex===r.flex && r.v>cur.v+1e-9)) byP.set(r.p[0], r);
```
**Ask the Owner before shipping:** this changes which spot every board row is shown at, so the "Priority" column will now describe *that* spot's scarcity. It is a one-line change and it makes the board answer Kosi's question ("why isn't he picked for CB?") with "CB1, because it is worth 0.56 more wins".

### P0-3 · [NEW] The "also fits" line: "x also y (−z flex)" — no wins number, no "fits"
```js
// WHERE: candidate line 1763-1764
// WHAT: REPLACES the text "also fits: CB1 +1.37" with "CB1 also WR2 (−4 flex)":
//        REMOVES the wins figure and the word "fits"; ADDS the primary slot before "also".
   const alt = r.slot ? (flexAlt[r.p[0]]||[]).filter(x=>x.slot!==r.slot && x.v>r.v-0.15 && x.g!==r.g).sort((a,b)=>b.v-a.v)[0] : null;
-  const altTxt = alt ? `<div class="narr" title="The other spot he could fill, with the value he would have there">also fits: ${LABELS[alt.slot]||alt.slot} ${fmtWar(alt.v)}${alt.flex?' (\u2212'+alt.pen+' flex)':''}</div>`
+  const altTxt = alt ? `<div class="narr" title="The other spot he could fill">${LABELS[r.slot]||r.slot} also ${LABELS[alt.slot]||alt.slot}${alt.flex?' (\u2212'+alt.pen+' flex)':''}</div>`
```
**Note for the Owner:** with P0-2 applied, the "also fits" line can no longer be worth *more* than the slot shown. The remaining question is whether the line may show a **flex** at all — Kosi wrote "the FS flex option shouldn't even appear, except in the change menu", and this line is not the change menu. **Council default: show only natural alternatives in this line; keep every legal placement (including flexes) in the change menu.**

### P0-4 · [NEW] The change menu: flexes of −2 and −4 only; −6 and −8 from round 21
```js
// WHERE: candidate line 1762 (the option list) and 1765 (the "change" menu)
// WHAT: ADDS a filter so the menu never shows a −6/−8 flex before the 20th round is over.
//        (26 rounds total, so "after the 20th round" = rounds 21-26.)
   const opts = canPick && r.slot ? openSlotsFor(roster, r.p) : [];
+  const lateRounds = (typeof draftSim!=='undefined' && draftSim) ? (Math.floor((draftSim.pos||0)/32)+1) >= 21 : false;
+  const optsShown = lateRounds ? opts : opts.filter(o=>!o.pen || o.pen<=4);
```
*(the menu's option list is built from `opts` at line 1765 — feed it `optsShown` instead.)*

### P0-5 · [NEW] The Star system is removed
```js
// WHERE: candidate lines 1572 (PRIO_STAR / PRIO_MULT), 1705 (the star on each position chip),
//        1708 (the explanatory paragraph), 1727 (the card header)
// WHAT: REMOVES the ★★ / ★ / ☆ stars and the paragraph that explains them. Stars multiplied Priority
//        by 1.5 / 1 / 0.5; Kosi's instruction is "remove the star system, it's not useful and confusing".
//        Also REMOVES the chip-numbers sentence, which is only there to explain the stars.
//        The chips themselves (QB 0/1, CB 1/3 …) stay — they say how many starters you have drafted.
-  const PRIO_MULT = {2:1.5, 1:1, 0:0.5}, PRIO_STAR = {2:'★★', 1:'★', 0:'☆'};
+  const PRIO_MULT = {2:1.5, 1:1, 0:0.5};
-  <div class="narr" style="margin:-4px 0 8px;">Chip numbers are starters drafted / starting spots (0/2 = both open). Stars set how much you care about a position: ★★ must-fill (Priority ×1.5), ★ normal, ☆ low (×0.5). Click a star to change it.</div>
```
**Decide with the Owner:** removing the stars removes the *only* way the user can express "I need this position", and `PRIO_MULT` (which multiplied Priority by 1.5 / 0.5) goes with them. If the stars go and the multiplier goes, Priority becomes a pure scarcity number — that is cleaner, and it is what the guide then has to describe.

### P0-6 · [NEW] "One table" → "Table"
```js
// WHERE: candidate line 419
// WHAT: RENAMES the view dropdown option. Nothing else.
- <select id="draftView2"><option value="table" selected>One table</option><option value="cards">Position cards</option></select>
+ <select id="draftView2"><option value="table" selected>Table</option><option value="cards">Position cards</option></select>
```

### P0-7 · [NEW] "Undo my last pick" → "Undo", and the feature gets explained
```js
// WHERE: the button is in the draft panel (grep "Undo my last pick" in the build you are editing)
// WHAT: SHORTENS the label. The explanation moves to the guide and to the home page's
//      "Reading the draft board" section (see P1-5).
```

### P0-8 · [NEW] "Drafting as … (Round 1)" must show the live round, right-aligned
```js
// WHERE: candidate line 1488
// WHAT: REPLACES the hard-coded "Round 1" with the round being drafted right now. The user's overall
//        pick no longer determines it: the box should read "Round 3" while round 3 is being drafted.
-  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick (Round 1)</div>`;
+  `<div class="badge-mono">${abbr}</div><div class="das-text">Drafting as <b>${userTeamName}</b> — you hold the #${userIndex+1} overall pick<span style="float:right;margin-left:12px;">Round ${liveRound}</span></div>`;
```
where `liveRound = Math.floor((draftSim.pos||0)/32)+1` (32 teams, 26 rounds; the 33rd pick is round 2). **"Round x" is right-aligned** with `float:right` (or `display:flex; justify-content:space-between` on the parent — Claude's call, same result).

### P0-9 · [NEW] "You're on the clock — Round 2 of 26, Pick 14 (overall 46 of 832)" needs to be bigger
```js
// WHERE: candidate line 1559 (the clock line) + a CSS rule
// WHAT: ADDS a class to the clock line and a rule that makes it larger. Nothing is removed.
   const clockLine = draftSim.awaitingUser
     ? `You're on the clock — Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} (overall ${draftSim.pos+1} of ${draftSim.order.length})`
     : `Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} — ${teamLabel(draftSim.order[draftSim.pos])} is on the clock...`;
+  // CSS, in the block that styles the draft panel:
+  .clockline{font-size:1.05rem;font-weight:700;}
```
*(wrap the string in `<span class="clockline">…</span>`; the exact size is Claude's — Kosi asked for "bigger".)*

### P0-10 · [NEW] The board should fill the bottom of its panel (about two more names)
```js
// WHERE: the CSS for #draftTableWrap / #draftTable2 (the table's max-height) and the row height
// WHAT: ADDS roughly two rows of height. Kosi: "on my desktop that would be about two more names".
```
*Council note:* this is a desktop-height judgement; the 390 px layout is already verified clean, so any change must be re-checked with `tools/board-mobile-probe.mjs` (0 overlaps, 0 clipped, 0 px overflow).

### P0-11 · [NEW] The roster summary line moves to the bottom of the panel
```js
// WHERE: candidate line 433 (the empty div) and line 1778 (the writer)
// WHAT: MOVES "n of 26 starters · +3.69 wins above a replacement-level lineup" from the top of the
//        roster panel to the bottom of it. The markup order changes, the string does not.
   <div id="draftRosterTotal" class="narr" style="margin:6px 0;"></div>
   <div id="draftRosterList"></div>
+  <div id="draftRosterList"></div>
+  <div id="draftRosterTotal" class="narr" style="margin:6px 0;"></div>
```

### P0-12 · [NEW] The position cards follow the roster order; the mobile cards collapse; the filters get out of the way
```js
// WHERE: candidate lines 1718-1736 (the card view) and the CSS block for .pcard / .cardgrid
// WHAT: three changes.
//   (a) ORDER: the cards are currently grouped by position chip (WV_NAMES order). They should follow the
//       order of the user's roster: offense, then defense, then specialists, in the same order as the
//       depth chart. Use DEPTH_CHART_GROUPS (candidate line 1091) as the source of truth.
//   (b) MOBILE: on a narrow screen each card collapses to one row — icon, position abbreviation, OVR —
//       and expands on tap. A .pcard-compact class plus a tap handler; the full attributes stay in the
//       DOM so the expansion needs no data plumbing.
//   (c) FILTERS: the position chips and the search/sort controls move into a sticky header or a
//       collapsible panel so they stop eating the vertical space on a phone.
```
*Council note:* (b) and (c) are the only items in this document that are real design work rather than a one-line change. They are also the two that most need a 390 px check afterwards.

### P0-13 · [NEW] The wins wording: "+1.65 wins", not "wins here"
```js
// WHERE: the "Pick priority" panel, candidate line 1697 (V21) / 1708 (V22 candidate)
// WHAT: REPLACES "wins here" with "wins" next to the number, and makes the sign explicit:
//        "+1.65 wins" / "−0.40 wins". The static Wins number is the one to show, not the spot-specific one.
   // the line under each position bar, today:
   //   Josh Allen (99 OVR) · +3.69 wins here · priority +0.73 · 100% chance he is gone by your next pick
   // becomes:
   //   Josh Allen (99 OVR) · +3.69 wins · priority +0.73 · 100% chance he is gone by your next pick
```
**Correction to an earlier note (MiniMax, M-369):** an earlier version of this document said the line Kosi quoted "does not exist in V21" and that it came from the donor build. **That was wrong.** The line is the **Pick priority panel's** per-position detail line, at candidate line 1697 (V21) / 1708 (the V22 candidate) — the screenshot of the built page shows it. The earlier claim came from a grep whose output line was cut before the phrase, and I did not re-check it against the rendered page. The change above is the right one; the anchor is now exact.

---

# P1 — The guide

### P1-1 · [DONE] The guide's cleanup
```js
// WHERE: candidate lines 5053 (the box), 5034 (the season line), 5035 (advanced stats),
//        4982-4986 (the tier list), 4902-4906 (the values table), 4962-4981 (the flex table),
//        5037-5047 and 5055-5058 (the sections)
// WHAT: REMOVES the "Guide / Short reference sections…" box; REWRITES "Seventeen games, a 14-team
//      playoff" as "Seventeen-game regular season, the playoffs"; REMOVES "(what caused sacks and big
//      runs)"; REPLACES the tier list with one list of spots and their wins per +1 OVR
//      ("Franchise-changing: Quarterback (+0.127 per +1 OVR)."); REMOVES the "Wins from a 70→90 upgrade"
//      column from the values table; REORDERS the flex table into the board's order with the quarterback
//      first; SAYS "offensive tackle" and never a bare "tackle"; FOLDS "Position values" into the
//      drafting section and renames it "Drafting & Position Values"; ADDS thirteen glossary terms
//      (Turnover, Personnel 11/12/13/21/22, Extra point / 2-Pt Conv, Safety the position vs the score,
//      Field position, Pancakes, Yds behind, Press. alwd, Hurry-up, Shootout, The edge, Chip numbers),
//      each marked with where it appears.
```
**Verified:** 0 "70→90" wording left; 0 bare "tackle" left in the page; the flex table order = Quarterback · Running back · Wide receiver · Tight end · Offensive tackle · Guard / center · Edge rusher · Defensive tackle · Linebacker · Cornerback · Safety; the guide has seven sections.
**Open question for the Owner:** the guide is **one shared HTML string** rendered both in the Guide tab and inside the Draft Simulator's guide panel (`fillDraftGuide()`, candidate line 5028) — so the box, the season line and the tier list change in *both*. One parameter per item if that must differ.

### P1-2 · [NEW] "Flexing players, explained" → "Flexing"
```js
// WHERE: candidate line 5057 (the section title)
// WHAT: RENAMES the section.
-  + sec('Flexing players, explained', flex, false)
+  + sec('Flexing', flex, false)
```

### P1-3 · [NEW] "Football and site terms" → "Glossary"
```js
// WHERE: candidate line 5061
// WHAT: RENAMES the section.
-  + sec('Football and site terms', termsHTML(), false);
+  + sec('Glossary', termsHTML(), false);
```

### P1-4 · [NEW] The game-plan math and the glossary leave the home page
```js
// WHERE: candidate line 5028 (fillDraftGuide) and the home page's guide host (#draftGuideHost)
// WHAT: The home page shows the guide's opening sections only. The math of every game-plan choice and
//      the Glossary belong to the Guide page. Add a parameter to the guide renderer:
- function fillDraftGuide(){ const h = document.getElementById('draftGuideHost'); if(h && !h.dataset.ready){ h.dataset.ready = '1'; h.innerHTML = guideHTMLCached(); } }
+ function fillDraftGuide(){ const h = document.getElementById('draftGuideHost'); if(h && !h.dataset.ready){ h.dataset.ready = '1'; h.innerHTML = guideHTMLCached(true); } }
   // and in renderGuideHTML(), when `forHome` is true, drop the last two sections:
-  + sec('The math of every game-plan choice', planMathHTML(), false)
-  + sec('Glossary', termsHTML(), false);
+  + (forHome ? '' : sec('The math of every game-plan choice', planMathHTML(), false))
+  + (forHome ? '' : sec('Glossary', termsHTML(), false));
```
**Check with the Owner:** "the math of every game-plan choice" and the glossary are the two most reference-like sections — if they are moved off the home page, the home page's guide becomes five sections and a reader has to switch tabs for the definitions.

### P1-5 · [NEW] "Reading the draft board" — the title, and the Undo explanation
```js
// WHERE: candidate line 5056 (the section title) and the board section's content
// WHAT: RENAMES the section to "Reading the draft board" (the parenthetical list goes with the stars
//      and "Value here" in P0-1/P0-5) and ADDS a short paragraph about Undo:
+  <li><b>Undo</b> — takes back your last pick. The computer teams' picks between then and now are replayed
+      from scratch, so the board you see after an undo is the board you would have seen.</li>
```
The same sentence should appear **on the home page under "Reading the draft board"** (Kosi asked for it in both places).

### P1-6 · [NEW] Wins and Priority, written so a five-year-old gets it
```js
// WHERE: candidate line 4990 and 4992 (the board's bullets)
// WHAT: REWRITES the two bullets in plain words. Current text and a proposed replacement:
```
> **Wins** — "how many more games per season a player adds than a 70-rated player at his position…"

→ **Wins** — "how many extra games a season this player wins for you compared with a 70-rated player at the same spot. It is the same for everybody with that rating, on every team, all draft."

> **Priority** — "Value here minus the best you would probably still find at that spot at your next pick…"

→ **Priority** — "how much you would lose by waiting. High priority means the good ones at this spot will be gone before your next pick."

*(Council note: the Priority bullet currently names "Value here", which no longer exists — it must be rewritten anyway. Kosi's plain-language request is the opportunity to make both bullets short, and to say plainly that the numbers are the model's judgement, not a fact about the real world.)*

---

# P2 — The weights

### P2-1 · [DONE] The panel's buttons and the penalty sections
```js
// WHERE: candidate lines 505-570 (buildControls) and 247 (the button CSS)
// WHAT: RENAMES "Use model weights" to "Default"; REPLACES "Back to my weights" with a button that is
//      transparent and disabled until a weight differs from the default, then blue and labelled
//      "My Weights"; MOVES the three penalty sections (Can't Run / Weak D / Can't Pass) from the top of
//      the panel to the bottom, under the buttons; REPLACES the long explanation with one sentence.
   <button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Default</button>
   <button class="resetbtn off" id="personalWBtn" disabled title="Change a weight to enable this.">Save My Weights</button>
   // CSS: .resetbtn.off{background:transparent;color:var(--sub);border:1px solid var(--border);box-shadow:none;opacity:.7;cursor:default;}
```
**Verified live:** disabled and transparent on load; blue "My Weights" after the first edit; clicking saves; pressing "Default" keeps it reachable and it reloads the saved set.

### P2-2 · [NEW] The five adjustments, as a calibration layer
```js
// WHERE: a new constant, next to the wins model (candidate line 1318-1350)
// WHAT: ADDS one table of per-slot factors. Each factor scales that spot's wins curve, so the 70→90
//      value, the wins-per-+1 value, the priority and the value columns all move together.
//      These are the five Kosi asked for, expressed as the exact factors that land on his numbers.
+ // Owner's 21 Oct positional calibration. Each factor scales that spot's wins curve, so the "Wins, 70→90"
+ // value, the "Wins per +1 OVR" value and the board's value and priority columns all move together.
+ // The games do NOT move: the season runs on RATING_SPECS, and this table is derived from the model.
+ const SLOT_VALUE_ADJ = { K:0.6234, WR2:1.0490, RB1:0.8718, CB2:0.8068, DE1:1.0608 };
```
Apply it where the curve is produced (`slotWinsTable()`, candidate line 1326) and clear `_wpoCache` so the derived weights and the guide re-derive. **Measured result:** K 0.7218→0.4500, WR2 0.6006→0.6300, RB1 0.6653→0.5800, CB2 1.1775→0.9500, DE1 1.3010→1.3800 — exact.
**Two things the Architect must fix with it:** the guide's sentence "measured on the matchup model itself" is no longer true (say "measured, then calibrated"), and the slope must print to **four** decimals (three decimals makes the columns look like they disagree).

### P2-3 · [NEW] The user weights go away entirely
```js
// WHERE: candidate lines 456-457 (the state), 563-565 (the handlers), 6410 (the init)
// WHAT: REMOVES the saved-weights concept. Kosi: "Please delete any record of my user weights. They
//      keep distracting you from making good decisions about balance. Forget the user weights."
- let personalWeights = null;
-  personalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights(); buildControls(); render();
+  weights = modelWeights(); buildControls(); render();
```
**Consequence to tell the Owner:** with P2-3 the "Save My Weights" button (P2-1) has nothing to save into. The two instructions conflict: one asks for a save button, the other asks to forget the saved set. **Council recommendation: keep the button (it is the "you have edited the defaults" signal), but make it a no-op that simply restores the defaults** — or drop the button. **This needs one sentence from Kosi.**

### P2-4 · [NEW] The default weights table becomes the Owner's list
```js
// WHERE: candidate line 452
// WHAT: REPLACES the static table with the 34-value list Kosi supplied (QB 700, RB1 185, RB2 60,
//      WR1 305, WR2 165, WR3 105, WR4 5, TE1 220, TE2 40, OT1 285, OT2 285, OG1 235, OG2 235, C 235,
//      DE1 360, DE2 305, DT1 260, DT2 210, DL5 5, MIKE 240, WILL 220, SAM 20, LB4 5, CB1 395,
//      CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5, K 200, P 1, FB 1).
```
**Council warning, with measurements:** that list is **byte-identical to the live `modelWeights()` output — 34 of 34 values** — and the current constant is a **fossil**: `modelWeights()` overwrites every modelled spot from the model, so the constant's only live influence is `P = 1` and `FB = 1`. Writing the list in changes nothing measurable **today**. But once P2-2 lands, the derived table moves (RB1 185→160, WR2 165→175, DE1 360→380, CB2 325→260, K 200→125) and the constant would then disagree with the button. **Recommendation: keep the constant as the fallback only and let the derived table be the truth; if the constant is written at all, write the post-adjustment values.**

### P2-5 · [DONE] The explanation sentence and the tab footer's "MORE"
```js
// WHERE: candidate line 547 (the explanation) and line 439 (the footer label)
// WHAT: REPLACES "The default is the model weights: what each spot is really worth in wins, scaled so
//      the biggest spot (QB) is 700 and rounded to the nearest 5. Edit any number to build your own set;
//      the buttons switch between the two." with "Default is how the draft simulator sees the game."
//      REMOVES the <span class="footlabel">More</span> from the footer nav; the six buttons stay.
```
**Verified:** the footer reads "Simulator · Madden Rankings · Player Browser · Position Rankings · Team Comparison · Guide".

---

# P3 — The other pages

### P3-1 · [DONE] The Team Comparison page
```js
// WHERE: candidate lines 823 (the subtitle), 3351-3364 (the lineup table), 3374-3383 (the unit
//        comparison), 3398-3420 (the page)
// WHAT: REMOVES the word "real"; REMOVES the "Ratings shown are effective ratings…" note FROM THIS
//      PAGE ONLY (the Draft Simulator and the season view keep it — the note is behind a flag now);
//      REPLACES the flat 14-row unit table with the Owner's Offense/Defense grouping, a group header
//      row for each, and the labels without their parentheses; REMOVES the descriptive verdict
//      sentence; DEFAULTS the pair to Kansas City Chiefs (A) and Las Vegas Raiders (B).
```
**Verified live:** 14 rows (Primary Coverage out, Linebackers in — the count is unchanged), no parentheses, the note absent here but present elsewhere, the default pair Chiefs/Raiders.

### P3-2 · [NEW] The player browser shows about fifteen players on desktop
```js
// WHERE: the player browser's table renderer (candidate line 791, `renderPlayers()`)
// WHAT: LIMITS the rows shown on a wide screen to ~15 and keeps the footer's tab buttons visible at
//      all times. Kosi: "on desktop you should only be able to see around 15 players at a time (on
//      mobile probably less, but I haven't looked at it)".
```
*Council note:* the browser is the one page that renders all 1,200 players; a 15-row window needs a scroll container **or** a "show more" control, and the search/filter must keep working. The mobile number is unmeasured — the Architect should pick it by looking at the 390 px render, not by guessing.

### P3-3 · [NEW] The Position Rankings dropdown gets every combination
```js
// WHERE: candidate line 455 (GROUP_DEFS) and lines 879/903 (the group select)
// WHAT: ADDS the unit combinations Kosi listed, in this order, with no duplicates:
//      Offense:  QB → QB+WR1 → QB+WR1+OT1 → … → through WR3
//      Defense:  CB1 → CB1+DE1 → CB1+DE1+CB2 → … → through DT2
//      Combined: the first combination not already present (QB+CB1) → … → through WR3
//      Naming: plural "s" for multiples ("Defensive Line (Edges + DTs)"), and the parentheticals become
//      explicit lists: "(WR1-3)" → "(WR1+WR2+WR3)", "(CB1-4)" → "(CB1+CB2+CB3+CB4)".
```
*Council note:* this is the one item on the list that is **data generation**, not an edit — the combination list has to be generated in the right order and de-duplicated against the units that already exist, or the dropdown will show the same set twice.

---

# P4 — The platform

### P4-1 · [NEW] Local storage: a refresh puts you back where you were
```js
// WHERE: the draft state (draftSim), the season state (seasonState) and the weights panel
// WHAT: ADDS persistence. The build has NO localStorage today (verified: zero occurrences in the file),
//      so this is new code, not a change. Kosi: "if the draft refreshes, you are in the same spot".
//      A versioned key ("nflsim.v22.draft") holding the draft state, the user's team and pick, the
//      current round, the user's picks, and the weights; cleared when the draft is finished.
```
**Council note:** this is the item with the most edge cases (a half-finished draft, a changed player pool, a stale key after a build change) and the most value to the Owner. A versioned key and a "the draft was reset because the build changed" message is the minimum safe shape.

### P4-2 · [NEW] The roster's left-hand colours follow the team
```js
// WHERE: the roster's row markup (candidate line 1774-1790) and the .ub rule (candidate line 100)
// WHAT: ADDS a team -> colour map and uses it for the left edge of each roster row: Kansas City Chiefs
//      red and white, Seattle Seahawks blue and green, and the special-teams rows in the team's third
//      colour (yellow for the Chiefs, white for the Seahawks). The user's own team keeps the accent
//      colour it has today (.ub).
```
*Council note:* the map is thirty-two teams × three colours — it is a data table, and it should be written once, in one place, and used by both the roster and the depth chart. **The Owner should be asked to confirm the two or three teams he cares about before thirty-two are guessed.**

### P4-3 · [NEW] The mobile position cards collapse to one row
*(covered in P0-12b — same change, one implementation. Listed here because it is a platform-level behaviour, not a board copy change.)*

---

# P5 — The model (protected constants — the Architect's call, the Owner's approval)

### P5-1 · [NEW] "QBs rush and receivers block"
```js
// WHERE: RATING_SPECS (candidate line ~1975) and the team's run rating (teamRatings, line 1998)
// WHAT: ADDS a run-game role for the quarterback and for the receivers. Today the QB's rating never
//      touches the run game and a receiver's rating never touches run blocking, which is exactly why
//      the guide measures 100% pass for them.
-  olRun:    {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6},
+  olRun:    {OT1:1.0, OT2:1.0, OG1:1.2, OG2:1.2, C:1.2, TE1:0.6, WR1:0.3, WR2:0.2, WR3:0.1},
-  rb:       {RB1:2.0, RB2:0.5},
+  rb:       {RB1:2.0, RB2:0.5, QB:0.5},
```
**Measured effect (in memory, in the running build):** QB 100/0 → **96/4**; WR1 → **95/5** and +5.7% value; WR2 → **95/5** and +9.9%; WR3 → **96/4** and +6.5%; RB1 −13%; OT −2%; OG/C −3%. **This edits a protected constant and therefore changes the games, not just the draft.** It should ship with a 100-season regression, and it is a bigger statement about the game than the other items in this list.

### P5-2 · [NEW] Quarterback separation — a question, not an instruction
The reviews all argue the QB is not separated enough from the rest. **The council's position: this is a fourth protected-constant decision and it should be sized by running `passOff = 0.45·qb + …` against a higher QB share over 100 seasons and measuring the win spread — not by editing a table.** The Owner's five adjustments (P2-2) do not include it, and this document does not recommend a number.

---

# P6 — Council-only notes (not for Claude to implement; for the record)

### P6-1 · The four reviews, corrected where they are wrong
Full detail in `_agents/minimax/notes/position-value-adjustments.md` §5. The short version:
1. **"The table fails its own arithmetic" — it does not.** `slotWinsPerOvr()` is *defined* as `(wins 90 − wins 70)/20`, so `up = 20 × wpo` holds for all 24 spots by construction; the measurement confirms it to four decimals (DT1 .047287, CB3 .047005, MIKE .043153, OG/C .042618, RB1 .033266, SAM .003703). The five rows that look wrong are **three-decimal displays of different slopes**. Fix: four decimals, or drop the 70→90 column (Kosi asked for that anyway).
2. **"The aggregate is impossible" — a category error.** Each number is a *marginal* (that spot alone, the others held at 80); summing marginals assumes independence the model does not have. It was never a team total.
3. **"One OVR point is not a common currency" — the model already handles the flat part.** The 70→90 column is the integral over the swept curve; the per-+1 column is the local slope.
4. **Salaries measure market value, not wins per point of OVR.** A directional check, not a calibration source — and Kosi's own five adjustments already make the two calls the reviews argue for.
5. **"QB separation"** is a protected-constant decision (P5-2), not a table edit.

### P6-2 · More advanced stats — seventeen proposals, nine of them free
`_agents/minimax/notes/advanced-stats-proposals.md`. **The sim already computes most of what was asked for** (`tfl`, `pd`, `hur`, `blk`, `dint`, `dtd`, `saf`, `ff`, `sa`, `opOL`, `att/cmp/tgt/rec`, return yards) and the Season Review does not display it. So nine of the twelve game-level proposals cost **no new modelling**. **Recommendation: do not build EPA** — the model is structural, not play-level.

### P6-3 · The decisions still open
**For Kosi:** (1) P0-2 — the board's display slot changes for every row, OK? (2) P0-3 — may the "also fits" line show a flex, or only natural alternatives? (3) P0-5 — removing the stars also removes the only way to say "I need this position"; agree? (4) P2-3 — the "Save My Weights" button versus "forget the user weights": which wins? (5) P1-4 — the math and the glossary move off the home page: agreed? (6) P4-2 — the team colours: confirm the palette for the teams that matter. (7) P2-4/P2-2 — the constant versus the derived table.
**For Claude:** (8) the wording of the "Save My Weights" button once the user weights are gone; (9) whether the guide's shared markup needs a home-page variant; (10) the order of P0-2 against P0-5 (both change the board's meaning, and it is better to ship them together).

---

## The instruments (all dependency-free, plain Node over CDP, no install)
`tools/post-merge-smoke.mjs` (the gate) · `tools/board-mobile-probe.mjs` (390 px board) · `tools/board-columns-probe.mjs` (the board's columns) · `tools/owner-brief-probe.mjs` · `tools/owner-brief2-probe.mjs` · `tools/v22-probe.mjs` (everything at once) · `tools/build-owner-brief-variant.mjs` · `…2-…` · `…3-…` (the builders).
**Working notes:** `_agents/minimax/notes/` — `value-here-column-removal-verification.md`, `owner-brief-merge-changes.md`, `owner-brief2-merge-changes.md`, `position-value-adjustments.md`, `advanced-stats-proposals.md`.
**The Owner's own summary of the first three rounds:** `V21 Suggestions.md` (repo root).
