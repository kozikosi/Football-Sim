# W59 INTAKE LEDGER — the Owner's words, item by item (verbatim intake, Z.ai seat)

Source: the Owner's chat message, 2 Nov 2026 (HST). Nothing paraphrased in the quotes.
Base: the renamed wave — the Owner pushed my last product as **w58** (md5 7d1e07dd…,
1,661,434 B) and the earlier unpushed round as **w57** (md5 765ee5cf…, 1,611,548 B),
both on gh-pages. w59 builds on **w58** and takes the best of **w57**.

---

## 1 · "On the position rankings page, change 'CB4/DIME' TO 'DIME'"

- The page renders the spot two ways: the toggle buttons read `CB4 / DIME` (LABELS) and the
  dropdown reads `CB4 / Dime` (GROUP_DEFS).
- **Build:** `LABELS["CB4"]` → `"DIME"` and the GROUP_DEFS label → `"Dime"`.
- **Veto/interpretation:** the LABELS map is the site-wide slot label law (w34); every other
  surface already moved to the bare DIME (the depth chart's DIME row, the lineup editor, the
  station map — all hardcoded "DIME" since w50/w55). Carrying the change in LABELS harmonizes
  the weights buttons, the lu-cells, the dz-rows and the draft fills with those rows instead of
  leaving one straggler. The hover title still resolves (DIME → "Dime Cornerback (CB4)").

## 2 · "PLEASE OPTIMIZE THE PANELS ON THE POSITION RANKINGS PAGE FOR MOBILE. THE PLAYERS
   NAMES AND BASICALLY EVERYTHING ON THESE RANKING PANELS MOVES TO WEIRD ALIGNMENT AND
   DOESN'T LOOK NATURAL AT ALL."

- The stacked groupTable cards (the mstack line-per-cell law) put `#`, `Team`, `Avg OVR` and
  `Top Players` on four labelled flex lines — the 38% label column drags every value right and
  the player chips wrap under it at an offset.
- **Build:** the Position Rankings card reads as a NATURAL card on the phone: `#N · Crest Team
  · score` on one line (score right, bold), the player names flowing left-aligned beneath,
  no label column, nothing pushed to the right edge.

## 3 · "SAME FOR THE MADDEN RANKINGS PANELS. … THE NUMBER SCORE IS TOO FAR AWAY FROM THE WORD
   SCORE AND THE SAME FOR # AND THE RANKING NUMBER. THIS INFORMATION CAN BE CONDENSED ONTO
   FEWER LINES IN A SMALLER FORMAT. A SIMILAR TREATMENT TO WHAT YOU DID WITH THE DRAFT BOARD
   PLAYERS PANELS PLEASE."

- Same root: the stacked resultsTable cards give `#` and `Score` each a full labelled line,
  value stranded at the far right of a wide card.
- **Build:** the Madden card condenses to the draft-card treatment: `#N · Team (badges) · score`
  on one line, the ANCHOR/LEAK story under it, the bar last. The word labels retire; the
  `#` prefix renders itself. Fewer lines, smaller format, information rearranged.

## 4 · "EXACTLY THE SAME FOR THE PLAYER BROWSER. ALL OF THESE PLAYER PANELS GET LARGER AS THE
   WINDOW BECOMES SMALLER. THAT SHOULDN'T HAPPEN. THERE SHOULDNT BE AS MANY LINES. TRY TO
   REARRANGE THE INFORMATION FOR MOBILE / SMALL WINDOWS THAT LOOKS MORE NATURAL."

- The stacked player cards were SIX labelled lines (Player/Pos/Team/OVR/SPD/STR) — the card
  grows taller as the window shrinks.
- **Build:** the browser card reads in TWO lines like the draft card: `name · pos chip · OVR`
  on line one, `Team · SPD · STR` compact on line two. Six lines → two. Fonts step down
  (.90/.68rem). The panel cannot grow as the window shrinks.

## 5 · "THE TEAM COMPARISON PANEL IS GREAT BUT THE UNIT COMPARISON TABLE SWITCHES FROM FULL
   WINDOW TO A REALLY NARROW TABLE ALL OF THE SUDDEN. THAT TRANSITION SHOULD BE MORE GRADUAL
   AS THE WINDOW GETS SMALLER."

- The unit table (number · unit · number, no header) rides the generic mstack machinery —
  at the 760px cliff it either stacks into labelled slivers or collapses narrow.
- **Build:** the unit table leaves the mstack machinery (`data-nostack`) and wears its own
  graduated law — a full-width table at EVERY width, with padding/font steps at 1024 · 760 ·
  480 so it compresses gradually instead of switching. Both instances (home compare and the
  draft-vs-draft compare) share the builder, so one change covers both.

## 6 · "I have been user clicking to fast forward through the cinematic which is good. But I
   just realized I can actually click on the buttons behind the cinematic. That is not good.
   I summed an entire season I was trying to play because I hit that button in the background.
   The background page should not actually be accessible during the cinematics."

- Root cause measured: the pregame marquee (`zpb-prematch`) mounts with `pointer-events:none`
  (it is a 3.4s text card), so every click passes through it onto the live page — and the
  game-stage buttons (SIM SEASON among them) sit exactly where a fast clicker clicks.
- **Build — the cinematic lock:** while ANY cinematic overlay is up (the replay, the prematch
  marquee, the SB storm, the playoff-run cine, the rest/books stage, the caution, the storage
  shell, the confirm) the page behind is locked twice: `pointer-events:none` on the page body
  wrappers AND the `inert` attribute (keyboard too). The overlays themselves stay live —
  the click-to-fast-forward the Owner likes is untouched. When the LAST cinematic closes, a
  300ms invisible click shield swallows the one accidental click that used to land on a sim
  button. The story veil already covers the page itself; it needs no lock.

## 7 · "The draft player panels look worse in w58 than w57." + "I don't think you used w57 to
   make w58. Please take the best of w57 to fix the draft board and anything else."

- Confirmed by the bytes: w58 was built from w56 without w57 (that round was never pushed
  when w58 was built). w57 carries the Owner-approved draft board round:
  the TWO-LINE labeled phone draft card (name · Draft on top, the six labeled stats spread on
  the bottom, FILLS right under the button), the priority number wearing the gone/wins ink,
  the contrast pass (unit-report title/grade, pick-grade slot chip, DRAFT button ink, the
  dark card values, the FILLS link, the honor title, the anchor's muted line), the pregame
  marquee pinning to the top of the phone stage, the badge cascade 0.25s faster, the
  1.17rem large-text badges, the deepened muted inks.
- **Build:** the whole w57 draft-board round merges into the w59 line. The w56 three-line
  phone card law is REVOKED by this ruling — w57's two-line labeled card is the standing law.
  The ×0.6s beat (w58's own law) and w57's 0.25s head start compose: `calc(var(--beat,0)*.6s - .25s)`,
  and the badge veil follows the faster cascade (total·0.6s + 0.8s).

## 8 · "there is a glitch on w57 where a lot of the gold shimmer names become solid blocks of
   gold that doesn't allow the user to see the player names at all. please fix or revert.
   w58 doesn't have that"

- Root cause found in w57's CSS: the light-sweep override used the `background` SHORTHAND with
  `!important` — a shorthand resets `background-clip` to `border-box`, which beat the earlier
  `background-clip:text !important`. The bronze gradient then painted the whole box BEHIND
  text whose fill was transparent: a solid gold block where a name should be.
- **Build:** FIX, not revert — the same override ships with `-webkit-background-clip:text
  !important;background-clip:text !important;` re-declared inside it. The burnished-bronze
  light sweep survives (w57's contrast gain) and the names read again. The probe screenshots
  the shimmer names on the rankings and the browser at both themes.

## 9 · "Again test almost every page at different window sizes and make sure everything is
   optimized for mobile"

- The battery: every view (Simulator · Madden Rankings · Player Browser · Position Rankings ·
  Team Comparison · Guide) at 1920 / 1280 / 1024 / 768 / 600 / 390 / 320, plus the draft board
  and the season screens; zero console errors; screenshots to evidence.

## 10 · "You are now working on w59."

- File: `Football-Sim-Z-post-blue-w59.html`, built from the pristine w58 bytes
  (md5 7d1e07dd…), asserted replacements only, re-runs clean from base every iteration.

## §veto — the standing laws touched

1. The w56 THREE-LINE phone draft card law is revoked by the Owner's ruling (item 7) —
   w57's TWO-LINE labeled card is the law now.
2. "CB4/DIME" → "DIME" rides the site-wide LABELS law (item 1) — the Owner scoped it to the
   position rankings page; the change harmonizes rather than widens.
3. The cinematic lock covers every fixed overlay the site mounts, not only the game replay —
   the Owner's law is "the background page should not actually be accessible during the
   cinematics", wherever a cinematic mounts.
4. The click-to-fast-forward behavior is untouched — the lock only guards the page BEHIND.
5. The 300ms post-cinematic click shield is build-side insurance for the exact accident the
   Owner reported (a fast click landing after the overlay closed); it swallows at most one
   click and is invisible.
