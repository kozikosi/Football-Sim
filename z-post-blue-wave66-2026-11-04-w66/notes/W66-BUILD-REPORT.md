# W66 BUILD REPORT — the Owner's two UI rounds, P-232 closed for real, P-174 shipped

**File:** `Football-Sim-Z-post-blue-w66.html` · md5 `41d2cb10ab3608fcc879816e61e20002` · 1,780,103 bytes
(w65 1,741,540 → **+38,563**)
**Baseline:** the w65 bytes `948f789da6d3ccf064104212ec748f3a` — asserted on every generator run.
**New this wave (Claude's convention, binding from w66):** the file opens with the
`WAVE: w66 / CLAIMS:` packing list **before** `<!DOCTYPE html>` — every P-item names its
mechanism; a claim is only "done" after QA verification.

## The chain — 21 asserted generators (zpb_w66.py → zpb_w66u.py)

Every step asserts the previous step's md5, exact anchors (count checked), and post-checks;
the chain rebuilds from the pristine w65 baseline and is byte-stable across re-runs.

| # | step | what it lands | md5 after |
|---|------|---------------|-----------|
| 1 | zpb_w66.py | mid-window board law: the unconditional `1fr 340px` override retires; 761–860 stacks the rail; 761–1120 reads the w57 two-line card (P-175 mechanism) | fc271eac1b07dfccb354b76c6e6413d1 |
| 2 | zpb_w66b.py | every Draft button pulses (zpbBtnPulse); top-3 priority buttons graduate to the filled team-gradient sheen (zpb-ctabig) | 47278055cb3eb1bdd25400fe707027f1 |
| 3 | zpb_w66c.py | the field map + guide flex chips follow the team theme, 0.5-strength team ink, never pure black; the Season Review panel on the regular-season review page; TRY AGAIN to 20-0 gets its own centered filled+shimmering panel | abe5003928614435b9c05fb37bab21ce |
| 4 | zpb_w66d.py | the formation-map unit chips retheme (offense stops sitting on the fixed site yellow) | 411b16c5ee5896bf31fe9dc7a92d2e3b |
| 5 | zpb_w66e.py | RETURN TO MODEL LINEUP → RETURN TO AUTO LINEUP, hidden until the lineup is actually touched (roster._zpbTouched) | 323b498aa17d26e55eae2237f616e4b6 |
| 6 | zpb_w66f.py | "Shakiest" → "WEAKEST" in WHY THIS STYLE | d23e6b7586a060b5de20cdc46dd1b1ae |
| 7 | zpb_w66g.py | the pregame marquee clears the replay header line at every width (.zpb-rep-intro top:67px; ≤600px paddings rebalanced) | 5ed5c6a8bdce6576efac7d72ca7063ea |
| 8 | zpb_w66h.py | **P-232 stage one:** the auto lineup is natural-first — Hungarian over natural slots only | 46a279a760fb212639d5c6bcaa902ee9 |
| 9 | zpb_w66i.py | **P-232 stage two:** in-unit-only fill (ZPB_AUTO_UNITS), the draft brain obeys the same law (cpuPick in-unit, zpbAutoFindSlot natural-first, unfilled real slots pay a growing premium) | f95b94c4ca70e54ad70a608761755a99 |
| 10 | zpb_w66j.py | **P-174:** the Player Browser is an infinite scroll (#pbSentinel, IntersectionObserver, rootMargin 160px); the pager, PAGE X OF Y and the false comment retire | c8bf09f64fcc05d7f5d86ba5f83c1107 |
| 11 | zpb_w66k.py | the OG1 transient check (the early render never drops OG1 — verified across the draft) | c07988f29298000922297f4ec549acdf |
| 12 | zpb_w66l.py | **N1** the fills cell becomes ONE label inside a custom dropdown (zpb-slotdd / zpb-slotpop — Cinzel, the homepage team-picker principles, the user team's 0.5 ink); **N2** the roster summary becomes two team-tinted Cinzel badges (zpb-rbadge) | b6f9ac56d4e8b5b2bcb563e1e726ee43 |
| 13 | zpb_w66m.py | **N3** all four clocks read 0.3s per beat with ZERO gap — the cards are the master clock, the map/depth follow them; **N4** "(change who plays where at any time)" deleted everywhere | ce86828c0e8e7d93fc690230ca001ade |
| 14 | zpb_w66n.py | **N5** comparison dropdowns enhance into the custom family (zpbEnhanceCmpSel); **N6** SIM GAME · SIM SEASON · BACK TO SEASON ride the upper line next to NEW DRAFT / 100 SEASONS (the footer doors + the standalone panel retire); **N7** the second SIM PLAYOFFS next to Play-the-X retires | 06ecd4873ba2808536897bd70dafbb9c |
| 15 | zpb_w66o.py | **N8** SIM PLAYOFFS runs silently (the during-the-game panel never fires); miss the SB → the solemn zpbPlayoffEndScreen (round-out, opponent, score, the SB final, the champion — no confetti); make the SB → the Super Bowl screen directly | 217c1b625370cb277a70f7aa0b3acf98 |
| 16 | zpb_w66p.py | **N9** COTY "YOU" joins the shimmering-gold honors; the player-profile-name feature (zpbProfStore, localStorage `zpbPlayerProfiles`, editable from the Browser, 0.5-ink suffix); **N10** RUN IT BACK (SAME ROSTER retired) + the caution states the mechanism (preseason, same roster, season erased) | c79bcd5abd3a3141e05b20310ebbab60 |
| 17 | zpb_w66q.py | the CLAIMS header grows the round-2 claims | 70ead5fc196040bc39e5d62ed39083e1 |
| 18 | zpb_w66r.py | the N8 law reaches the review page's SIM PLAYOFFS door (the shared zpbPlayoffEndScreen mounts the right screen on every path) | 54ccb70d3f95193da135d9ef5ddd2bef |
| 19 | zpb_w66s.py | regression fix (caught by the round-2 battery): the shared Season Review page carried `${user}` out of scope — the review page renders its own user now | 6e8cdbcf5a79c5ace0bf4d2c151526e8 |
| 20 | zpb_w66t.py | audit fix: slotForUser's stuck-pick escape could drop an unplaceable late pick into a skill slot — the escape avoids the skill/specialist families entirely | b253982d680f7c94266647790f57c66d |
| 21 | zpb_w66u.py | audit fix: cpuPick's anyone-anywhere escape fired for the USER team during sim-to-end and the user's lineup is never re-optimized — the escape retires entirely; a pick with no legal landing passes, the slot sits honestly empty | 41d2cb10ab3608fcc879816e61e20002 |

## The batteries — all green on the shipped bytes

| suite | result | what it proves |
|-------|--------|----------------|
| w66_nodecheck.py | 23 script blocks · SYNTAX OK | every inline script parses |
| w66_r2.js (round 2) | **37 pass · 0 fail** (the review-door branch runs 34/0 — path-dependent legs) | N1 the dropdown (label format, the double-speak gone, Cinzel, retarget works) · N2 exactly two badges, the plaintext gone · N3 all four clocks 0.3s zero-gap · N4 the sentence nowhere in the live DOM · N5 the custom family + group headers + team ink + re-render on choose · N6 the upper line hosts the sim doors, the tab row and footer don't, BACK TO SEASON rides along and returns · N7 ONE door, the second button gone, the caution shows · N8 the during-the-game panel never fires, the right end screen mounts (solemn or SB), the round/SB-final/champion story present, no confetti · N9 verified statically this run · N10 the button reads RUN IT BACK, the caution explains preseason + same roster |
| w66_owner.js (round 1) | **48 pass · 0 fail** | A the mid-width board (no clipped Draft buttons, the two-line card) · B the Draft button tiers (pulse everywhere, the top-3 sheen) · C the preseason page (team-themed map, WEAKEST, RETURN TO AUTO LINEUP gated) · D the review doors (Season Review on the regular review, the TRY AGAIN panel, ← Back) · E the browser (first 60, no pager, the sentinel appends 60→180+, a filter rebuilds) · F the OG1 depth-list check (30/30) |
| w66_teams.js | **15 pass · 0 fail** | T 32 teams × 2 modes × 2 units measured — no pure-black ink, the fixed site yellow gone, every LIGHT pair ≥4.0:1, every DARK pair ≥4.5:1 · U the P-232 all-teams audit — all 32 teams, ZERO cross-unit placements, empties only where the pool supply runs out · V the pregame clearance sweep at 800×640, 761×780, 900×700, 1000×820, 1280×860, 390×844 |
| w66_geom.js | exit 0, sane geometry | the intro/header/logos rects (header bottom 181 vs logos top 202 at 800×640) |
| w66_inkprobe.js | exit 0 | dark: min --text 7.7:1, min anchored50 2.15:1, min tA2 2.31:1 · light: every team's text ≥4.15:1, anchors measured per team |
| w66_cmp2_probe.js | exit 0 | the comparison dropdowns' custom family (wrapped, native hidden, Cinzel face, the menu/list/ink vars) |
| w66_shot_n2.js | probe ok:true (2 badges) + shot | the N2 evidence screenshot from a LIVE draft (one hand-made pick at 1.01) |

**The battery-caught regressions (fixed in the chain, re-run clean):** the Season Review
`${user}` scope break (step 19); the DT→TE3 stuck-pick escapes (steps 20–21 — the audit
caught the path twice, the escape is retired entirely); the review-page SIM PLAYOFFS door
needed the shared end screen (step 18).

## Evidence — shots/

- `w66-slotpop.png` — N1: the fills dropdown popup (QB NATURAL / FS -10 FLEX), the caution panel behind it
- `w66-roster-badges.png` — N2: the two team-tinted Cinzel badges live in YOUR ROSTER mid-draft (and N1's single "FS (-10 FLEX)" label on the Stafford row)
- `w66-upperline.png` — N6: NEW DRAFT · SIM SEASON · BACK TO SEASON on the upper line above the tab row
- `w66-cmpdd.png` / `cmp2-open.png` / `cmp2-tab.png` — N5: the comparison dropdowns in the custom family
- `w66-pofin.png` / `w66-pofin-review.png` — N8: the solemn playoff-elimination screen from both doors
- `w66-review-tryagain.png` — the TRY AGAIN panel (filled, shimmering, centered, its own panel)
- `w66-pregame-800x640.png` / `w66-pregame-390.png` — the marquee clearance + the N3 card cadence
- `w66-browser-scroll.png` — P-174: the browser mid-scroll (no pager)
- `w66-preseason-1280.png`, `w66-regular-review-sr.png`, `w66-board-900.png`, `w66-board-hero-1280.png`, `geom-800x640.png` — the round-1 surfaces
