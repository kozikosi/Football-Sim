# W52 BUILD REPORT — wave 52 of Z-post-blue

2026-11-01 · one directive · fifteen moves · the sync got the session's center of gravity.

## Deltas against w51 (the Owner's words → the code)

| # | Move | Where | Proof |
|---|------|-------|-------|
| M1 | line-up ↔ cards on ONE clock | the w42 look-gate observer + the skip release | syncbattery 10/10 |
| M2 | Q + time → the neutral team ink (var(--text)); cream retired | .zrl-t rule + the w50 replay block | w52_live M2a/M2b · reg R1a |
| M3 | COTY reads YOU · the ratings sentence removed | the composer + both award renderers | w52_live M3a · source |
| M4 | the #X Y badge leads · plaintext positions removed | posRankOf + both award renderers + the playoff cards | w52_live M4a/M4b |
| M5 | solid chip borders only | .zpb-splain paints nothing | w52_live M5a |
| M6 | Touchdowns (no Scrimmage) · champions' badges beside them | the composer + zpbStatChipsHTML(winKey) + the RETY chip | w52_live M6a/M6b |
| M7 | the bar track never rides the takeover · mirrored fills | .zpb-mbar ink wash + .zpb-mc-h margin-left:auto | w52_live M7a/b/c · evidence 64/64 |
| M8 | the MVP sentence removed | mvpWhy deleted; the MVP wears badges | w52_live M8a |
| M9 | "/ g" → "per game" · one ink for every number | the cards arrays + the adgood/adbad value rules | w52_live M9a/M9b |
| M10 | the featured-game sentence removed | renderPlayoffsView | w52_live M10a/M10b |
| M11 | the bye's top game = the most likely opponent | the max-seed picker before the featured render | w52_live M11a |
| M12 | the SB is PLAYED first · the storm waits · the fanfare + the halftime show | the round sim + the replay close + the complete-view hook + the intro/CSS | w52_live M12a–f |
| M13 | the @ on its own line when compressed · one line when roomy | the tree card trio + per-card container queries | w52_live M13a/b |
| M14 | the unit report card: all backs, whole corps, nameless kicker | renderReportCardHTML + zpbMetricsHTML produced() | w52_live M14a/b |

## The M1 root cause (recorded so it never returns)

The w46 sync walk released the breakdown groups with
`_anc.querySelectorAll('.zpb-dbk-g:not([data-zseen])')` — but `data-zseen` is stamped at OBSERVE
time, so every group already carried it and the selector matched NOTHING. The two groups you saw
sync were the ones already inside the viewport (their own intersection fired); everything below
the fold waited for its own scroll — the "user motion" delay. The fix releases by CLASS state
(zpb-seen), takes every group AND depth zone in scope, reuses the map's exact --dfc-cine value,
and sweeps again once at 900ms as a failsafe. The mirror direction (cards first → map follows)
closes the loop. Probes that caught it: tools/w52_syncprobe{1,2,3,4}.js.

## The M12 flow (recorded)

simulatePlayoffRound('superbowl') now sets __zpbSBReplayHold and OPENS zpbGameReplay for the
user's game (the overlay's existence is verified immediately — reduced motion or an empty log
frees the storm at once). The replay's close() releases the hold: the winner storm mounts only
there. The renderSeasonCompleteView hook holds while __zpbSBReplayStandby is live. SIM PLAYOFFS
(the quiet path) keeps its run-cine → storm choreography untouched.

## Verify summary

syncbattery 10/10 · w52_live 30/30 · w51 regression 25/25 · evidence sweep 64/64 · mobile 5/5 ·
nodecheck 12/12 · pageerrors 0 across every battery.

## Sizes

base w51 = 1,571,506 B (md5 e40732a235aa621002bc268c59b36bd0) → w52 = 1,585,036 B
(md5 40613b81de26b5ed9c67bdcc0637ac6f) · +13,530 bytes.
