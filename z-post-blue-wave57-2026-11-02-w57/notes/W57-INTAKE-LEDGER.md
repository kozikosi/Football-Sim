# W57 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 57 (the Owner's count) · received 2026-11-02 · one directive with six named asks + the standing quality mandate ("we are approaching the final version"). Baseline: my w56 (`Football-Sim-Z-post-blue-w56.html`, md5 `42af55f7…`, 1,600,958 B — verified locally from the w56 lane before the first replacement).

> "Better on the compressed draft cards. The color used for the priority numbers on the player cards needs to be changed to match the gone and wins color."
> — The w56 card renders the Priority value in gold (the w56 ledger: "priority (gold, leading)"). The GONE and WINS values wear the row's one-ink law (txM light / txd dark — the dc-name pattern). Fix: the Priority value joins that same one-ink law — same color as GONE/WINS, in both themes. The gold PRIORITY label treatment (if any) is judged against the same ask — the NUMBER's color is the named target.

> "Move the 'FILLS' right under the drag button."
> — "the drag button" = the card's Draft button (the tap-to-draft control on the phone card's first line; w55 gave it the 40px tap floor). FILLS currently sits on line 3 beside PRIORITY. Fix: FILLS (label + value) moves directly under the Draft button.

> "I think you can fit player name and the draft button one the top line and everything else spread out the bottom of the second line. Try to put them in order of pos, team, over, wins, priority, gone."
> — The card returns to TWO lines (the w55 shape, now labeled): line 1 = player name + the Draft button (and FILLS right under the button); line 2 = everything else spread out in the order POS · TEAM · OVR ("over") · WINS · PRIORITY · GONE. This supersedes the w56 three-line shape. The OVR joins the bottom line for the first time on the phone card (the w56 chip kept it on line 1; the Owner now names "over" in the bottom-line sequence). Labels stay (the w56 label law is not revoked — the bottom line is labeled).

> "On the during the game pregame cinematic, The first key players to appear end up covering the logos when they appear on a small mobile screen. I'm not sure how to fix but please think of a solution."
> — The pregame cinematic (the during-game page) shows team logos and then the first key players; on a small phone the first key players overlap/cover the logos. Owner asks me to devise the fix. Probe first (measure the logo rect and the first key-player rect at 320/390), then fix — candidate: reposition the key-player row below the logo band on phones, or shrink/stack the logos, so nothing overlaps. Keep the same panels and text.

> "Have the season in badges and unit report card appear 0.25 seconds faster then they currently come in. Make sure they're still aligned with any cinematic that cuts to their pages."
> — The season-in-badges rail and the unit report card both appear 0.25s sooner than their current delays (their animation-delay / appearance beat). They must stay aligned with the cinematic cut to their pages (the cut itself does not move — only the element's entrance advances by 0.25s). NOTE: the w55 law "the honors carry the FIRST beats of the season-in-badges rail (appearance order = vertical order, the 1s pace untouched)" — the 1s pace refers to the stagger pace; the ENTRANCE of the rail/report card as a whole is what advances 0.25s. Measure the current delays in the build, subtract 0.25s, verify the cut alignment.

> "Everything else is looking pretty good. Please check any possible contrast issues or color issues with light and dark mode for all teams. Perform any possible tests. Take your time. We are approaching the final version if you can get all these tasks right."
> — A full contrast/color audit: LIGHT and DARK themes × ALL 32 teams. Build a WCAG contrast checker over the real theme+team ink/background pairs (the row washes, the name inks, the chips, the buttons, the muted text) and sweep every team in both themes; fix any pair that fails. Then run the standing batteries + extra tests. This is the pre-final quality gate.

## §veto — interpretations the Owner may overturn
1. "the drag button" = the Draft button on the phone draft card (the only button on the card; the tap-to-draft control). FILLS (label+value) sits directly beneath it.
2. "over" = OVR (the card's overall rating) — it joins the bottom line in the named position (third of six), keeping its chip styling if that survives the two-line shape, or as a labeled value if not.
3. The bottom-line order is EXACTLY pos, team, ovr, wins, priority, gone (left to right) — the w56 order was pos · team · wins · gone + priority · fills; PRIORITY and GONE swap positions per this directive, and OVR joins.
4. "0.25 seconds faster" applies to BOTH the season-in-badges rail AND the unit report card (each measured separately, each −250ms); the cinematic cut timing itself does not change.
5. The contrast audit's pass bar = WCAG AA for the text pairs the site actually renders (4.5:1 body, 3:1 large/UI) — failures get fixed in this wave; borderline-but-passing pairs stay (no visual churn in the final stretch).
