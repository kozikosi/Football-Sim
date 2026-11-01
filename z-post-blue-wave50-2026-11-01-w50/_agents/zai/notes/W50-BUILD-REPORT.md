# W50 BUILD REPORT — the black retires · the panel follows the franchise

Product: `Football-Sim-Z-post-blue-w50.html` · md5 `babc5dc1c50f5b6253a9ee4919138cae` ·
1,558,490 chars · base: the w49 bytes (md5 `6bf627b017c1e26281e2bb4fa70d4a60`) ·
chain: `tools/zpb_v50.py` (asserted replacements, post-checks) + `tools/w50_live.js` 29/29.

## O1 · the directive

The Owner: no black text anywhere — recolored to the team's neutral, ideally the 0.50
selection (the Madden rankings in light mode and the AVG OVR column named); the anchor panel
follows every team's theme while the homepage's rose gold stays; DIME directly below NICKEL on
the same defense depth chart; the map names and the cards land twice at the same exact time;
the 4-3/3-4 toggle fixed; the during-game neutral words in a neutral cream; the season-review
badges' dashes become dots. The result is named w50.

### The diagnoses that made the fixes (new this wave)

1. **The black was one token.** `--text:#54303f` (the B2 rose block) — 2,744 texts. The fix is
   the site's own halfway ink `#8e5566` (plum→crayola rose at 0.50, clamped, 5.27:1 on #fdf2f6).
2. **The rankings rows had no team vars.** `render()` emitted bare `<tr class="teamrow">` —
   the Position Rankings rows already called `zpbNeutralRowVars`; the Madden rankings never
   did. Added (plus `zpbAnchorVars`) and the consumption CSS for `.team`/`.score`.
3. **The AVG OVR cell never consumed the row vars.** Its `td.score` inherited --text while the
   neighboring `td.team` rode `var(--tn)`. Mirrored the team law onto the score.
4. **The editor had no DIME row.** `lineupEditorHTML` mapped DEPTH_CHART_GROUPS' slots only —
   CB4/DIME is not in the display list, and unlike every other surface the editor appended no
   dime row. Added `dimeEd()` to the defense group.
5. **The toggle's staging was invisible.** w47 staged the formation but nothing repainted the
   rows (the labels/order read the global ZPB34 only). Three-part fix: `zpbLabelsFor` (a
   non-mutating snapshot), `zpbOrderSlots(gcls, slots, formOn)` (explicit formation), and
   `zpbRerenderLineupEditors()` wired through `wireLineupEditor`'s host handle — the ACTIVE
   wiring is the later `window.wireLineupEditor` (12895), which now also carries the handle.
6. **The cream was being eaten by the replay's own inherit law.** `.zpb-replay span/div
   {color:inherit}` (0,2,1) outranked the plain `.zrl-t` rule — the game time inherited the
   takeover's `--text` (the team's dark halfway ink). Proved by rule-walk: zero color rules
   matched the element; the value was pure inheritance. Fix: `--zcream` (takeover-proof token,
   light `#53382b` · dark `#f2e7d5`) + `.zpb-replay .zrl-t,.zpb-replay .zpb-rep-qchip,
   .zpb-replay .zpb-rep-q{color:var(--zcream,var(--sub)) !important;}`. The TO/INT/FF chips
   switched to the token inline (inline beats the inherit law).
7. **The badges' dashes were dynamic strings** (`wins+'-'+losses`) the w46 dash-law sweep never
   saw. Fixed at the single render point: `String(b.v).replace(/(\d)\s*-\s*(\d)/g,'$1·$2')`.

### What w50 did (the replacement list)

1. B2 light `--text` #54303f → **#8e5566** (plain + media-light) + `--zcream` tokens in all four
   theme paths (light/dark × plain/media).
2. `zpbAnchorVars(name)` — the per-team chip vars (fill L 0.93 sat≤0.50, border L 0.80, ink
   txM/txMd) — and the rankings `render()` now stamps `zpbNeutralRowVars(row.team) +
   zpbAnchorVars(row.team)` on every row.
3. `.zpb-anch` switched to `var(--anchB/F/I, <the w49 rose>)` with the dark plum fallbacks —
   the team themes flow through, the approved rose stands where no team feeds the chip.
4. Consumption CSS: `#resultsBody tr.teamrow .team/td.score` → `var(--tn/--tnd)`;
   `#groupTable tr.zpb-grow td.score` → the same (light + dark + system paths).
5. The editor's DIME row (below NICKEL, both formations) + `zpbDimeDrafRow` repainted with
   `zpb-trow` and the neutral vars.
6. TE3 into the breakdown cards (a private copy of GROUPS).
7. The toggle: `zpbLabelsFor`, `zpbOrderSlots(…, formOn)`, `zpbRerenderLineupEditors`, the
   wire-handle on BOTH wireLineupEditor definitions, the click-handler repaint.
8. `--zcream` applied to `.zrl-t` / `.zpb-rep-q` / `.zpb-rep-qchip` + the replay-scoped
   `!important` rule + the TO/INT/FF chips on the token.
9. The badge renderer's dash→dot conversion.
10. The w50 marker block + this wave's comments on every touched rule.

### The verification record

See UPDATE-README §Verify — `w50_live.js` 29/29 is the headline; the older suites fail only on
the asserts the Owner's own later rounds superseded (the chip frames), never on the laws.

### §veto candidates (for the Architect's review)

1. The w48/w49 chip-frame asserts are retired by the Owner's round-50 words — the suites' two
   chip-assert failures are CORRECT behavior, not regressions.
2. `--zcream` is a NEW token (light #53382b / dark #f2e7d5) — it never appears in the takeover
   blocks, by design.
3. The site light ink #8e5566 replaces #54303f — the old value survives nowhere; --ongold and
   the gold-chip pair are untouched by his "no black" law (dark ink ON gold, not black text on
   the page).
