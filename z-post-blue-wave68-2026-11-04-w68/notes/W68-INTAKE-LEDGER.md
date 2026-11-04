# W68 INTAKE LEDGER — the Owner's directives, verbatim, item by item

Source: the Owner's chat message (2026-11-04 HST, w68 round — seven items).

Baseline: `Football-Sim-Z-post-blue-w67.html` md5 `ecf2b295b97739b88e7f60068b588b84`
· 1,786,217 B (gh-pages, the shipped w67 bytes — hash verified against CHECKSUMS.txt at chat start).
Reachability note: w66/w67 were NOT on council/zai, council/vl or council/uk this chat —
the live `gh-pages` branch carried the newest wave packages (the §1 fallback chain, step 3's
lesson generalized: check gh-pages FIRST — the w67 START doc §1 already says so).

## The Owner's items

> 1 · "There is no reason not to display full names for the key players in the game preview
> screen when the window is at full size. I think you've overcorrected toward abbreviation.
> Please fix."
- The name ladder (w60: full → vertical → LAST NAME → INITIALS) overcorrects on the preview
  key-player cards. Two root causes (probed live on the w67 bytes):
  (a) `avail(el)` measures the carrier's own clientWidth — for a content-sized flex child
  (`.zpb-pcard-hd b`) a once-shortened name shrinks its own measuring box and locks (a
  "Chris Lindstrom" → "CL" lock reproduced at mid widths, never self-healing because the
  scan re-measures the shrunken box);
  (b) no full-size floor — the ladder walks to last names/initials whenever the measured box
  is narrow even on a wide window.
- Fix: `avail()` measures the TRUE available line for flex carriers (parent width minus the
  siblings minus the gaps — stateless, self-healing); and at window ≥ 1025px the ladder
  NEVER drops below the full name (the w60 rung 2 — full name vertical — is the floor; the
  last-name/initials rungs stay for genuinely narrow windows ≤ 1024px). Battery: the lock
  reproduced before, healed after; full names asserted at 1280/1440/1025; the narrow law
  asserted at 390.

> 2 · "There is still some sloppy formatting of the dashes to <dots>. For instance this appears
> in the season in review badges: '10·6-1'. I think we should use dashes for anything related to
> actual wins-losses-ties or the a single game score should use dashes. Any other data should be
> separated by a <dot>."
- THE DASH/DOT LAW (amends the w50 badge law and the w52 dot law's neighbors):
  (a) W-L-T records → dashes ("10-6-1");
  (b) single-game scores → dashes ("31-17", "tied 14-10 at the half", "won it in overtime 27-24");
  (c) any other data → the middle dot.
- Root cause of "10·6-1": the w50 blanket convert `replace(/(\d)\s*-\s*(\d)/g,'$1·$2')` ate the
  SHARED digit — "10-6-1" matches "0-6" first, replaced to "0·6", leaving "-1" → "10·6-1".
- Landing sites: the season-in-badges rail (the blanket convert retires; the W-L split badges
  ONE SCORE / VS DIVISION / AT HOME / ON THE ROAD / VS PLAYOFF TEAMS read dashes; RECORD and the
  game scores keep their dashes); the replay story's game scores (the tie line, the half, the
  third quarter, the OT line, the fourth-quarter run, every final); the how-the-game-was-decided
  `fin`; the series tag; the season-in-words scores; the schedule tiles' result scores; the h2h
  and preview story scores; the playoff retrospectives; the Super Bowl final screens' score
  separators; the replay's final scoreline; the sim-playoffs round card's score separator.
- Flagged (dot stays, per "any other data"): the turnover battle count ("3·1"), the projected
  ratings/coin-flip pairs ("28.4·24.1"), the 100-seasons win RANGES ("8·12 wins"). Say the word
  and any of these joins the dash law.

> 3 · "Remove this text season awards: 'Pittsburgh Steelers · 1 First-Team All-Pro · 1
> Second-Team All-Pro · 3 Pro Bowl selections.\nPittsburgh Steelers coaching staff · Coach of
> the Year'"
- The summary paragraph of REGULAR-SEASON AWARDS & HONORS retires whole — the counts sentence
  AND its indented honor lines (the "coaching staff · Coach of the Year" line is one of them;
  in the Owner's season it was the only one). The award CARDS (MVP, OPOY, DPOY, COTY — the
  card that reads "YOU · Pittsburgh Steelers" when his staff wins), the statistical champions,
  and the All-Pro/Pro Bowl tables all stay.

> 4 · "If the user's player(s) is first team all-pro or receives any award, the player(s) should
> be glowing or have a golden border around them or both."
- BOTH, everywhere the awards render: the award cards (MVP/OPOY/DPOY/CPOY/OROY/DROY/COY and the
  statistical champions) wear the golden border + outer glow when the winner is the user's;
  every All-Pro and Pro Bowl chip for a user player wears the golden border + glow and its name
  takes the shimmer (any award, not just First-Team); the All-Playoff chips join; the
  season-in-badges honor cards (already gold-bordered) gain the glow. The gold is the
  established celebration metal (the zpb-sb-gold badge language), never white.

> 5 · "Very good job on the sim playoffs button. Remove this final page though 'YOUR RUN ENDS IN
> THE DIVISIONAL ROUND TEN 44 · 24 PIT ELIMINATED BY THE TENNESSEE TITANS THE SUPER BOWL · FINAL
> SEA 25 · 21 TEN SUPER BOWL CHAMPIONS · SEATTLE SEAHAWKS SUPER BOWL MVP · Rashod Bateman RB'.
> And replace with the superbowl page."
- The solemn run-ends screen (zpbPlayoffEndScreen → zpbPlayoffElimCine, the w66 N8 page) is
  RETIRED on every path: the review-page SIM PLAYOFFS door, the mid-playoffs SIM REST door, and
  the shared end-screen decider all land on the Super Bowl page (zpbPostSuperBowlCine) — the
  SUPER BOWL · FINAL / score / crests / champion / MVP storm the Owner already approved. The
  zpbPlayoffElimCine function and its .zpb-pofin face leave the file (the N5 comparison CSS in
  the same style block stays).

> 6 · "Each round of the sim playoffs cinematic should require a continue button to proceed to
> the next round."
- The sim-playoffs run cine (zpbPlayoffRunCine) stops auto-advancing (the 3400ms timer retires).
  Every round card carries a Continue button (the gold franchise pill — the CONTINUE color law);
  the last card's Continue flows into the Super Bowl page (mount first, fade second — the w57
  storm law). The w47 round cards keep their ink laws; the loss card keeps SEASON ENDS /
  THE RUN ENDS HERE.

> 7 · "As the user will probably see the superbowl page many times before they actually win one,
> please add even more dramatic animation to a new user wins the superbowl page. Make it even
> more beautiful and dynamic. take your time to innovate and test."
- NEW: zpbSuperBowlVictoryCine — the victory page. The SB page stays the recurring page (the
  Owner's words); when the champion IS the user's team, the SB page's Continue mounts the
  victory page as the second act (mounted BEFORE the SB overlay fades — opaque from the first
  painted frame, the w43 law — no flash of the page beneath). Design (the ten commandments
  hold: Cinzel Decorative display, no white text, integers, the shimmer as THE celebration,
  slow soft motion, the 0.6s reveal cadence the Owner chose in w67):
  an opaque charcoal-gold stage; two counter-rotating god-ray wheels; falling team-gold
  confetti; rising embers; a breathing gold glow; the champion crest descending through THREE
  expanding burst rings; the huge shimmering wordmark in the champion's ink; the dash-law score
  line; the MVP line; the gold Continue pill; a mount flash; a slow stage breathing zoom.
  Its Continue plays the standing SUPER BOWL CHAMPIONS reward (FX.play('sb') + the champion
  banner) and releases the season — the same handshake the SB page had.

## Build contract
- Baseline: `Football-Sim-Z-post-blue-w67.html` md5 `ecf2b295b97739b88e7f60068b588b84` (asserted every run).
- Generator: the `zpb_w68*.py` chain — asserted exact replacements + payloads + post-checks;
  regenerated from the pristine baseline on every fix; never hand-edit.
- Batteries: the standing suites re-pointed at w68 + a new `w68_owner.js` for this round's items
  + the name-ladder battery (the lock reproduced and healed; full names at full size; the narrow
  law intact) + the dash/dot battery (records, scores, the badge rail, the SB screens) + the
  sim-playoffs battery (the continue gate, the SB page on every path, the victory page) + the
  awards battery (the golden celebration, the removed summary).
- Delivery: `z-post-blue-wave68-2026-11-04-w68.zip` + the loose HTML, download area
  first-class, the WAVE/CLAIMS header at the top of the shipped file.
