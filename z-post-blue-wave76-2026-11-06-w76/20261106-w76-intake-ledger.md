# W76 INTAKE LEDGER — the Owner's directives, itemized

**Source:** the Owner's message, received 2026-11-06 (chat) — the DRAFT COMMAND CENTER edits + "I'd like to know if you'd like to reorder your own priorities and if you feel good about your own reboot infrastructure" — riding Muse's w76 briefing (two briefings; the second adds veto (c)'s decision and holds veto (b)).
**Rule:** Owner's words are law verbatim. Muse's briefing rides below them; where the two touch the same surface the Owner's own words win.
**Base:** the latest wave with a product HTML on gh-pages, verified by listing = **w75** (`Football-Sim-Z-post-blue-w75.html` · md5 `9f990ab74fb0acba9e55b82395e60647` · 1,826,882 B · live at e61ae6cd, hash re-verified from the branch this session before the first patch).

## Product asks (the shell build — Football-Sim-Z-post-blue-w76.html)

| # | Owner's words (verbatim) | My action |
|---|---|---|
| U1 | In the DRAFT COMMAND CENTER PANEL — Remove this text: "EVERY ROOM BELOW A B · BEST TO WORST" | The section-A header line is removed; the room cards render with no header. The panel's other header (DRAFT COMMAND CENTER) and the room cards themselves stay. |
| U2 | And remove this text: " THE LINE IS THE AVERAGE SEASON (76) · BELOW 80 OVR · KICKER OR HIGHER ON THE WIN MATH" | The whole tail after CUTDOWN DAY is removed. The three lines (the average-season line, below-80 OVR, kicker-or-higher) keep working in the cut math — only the printed label retires. The Guide's ratings explainer keeps telling the scale in one line (reworded this wave to stay truthful, see V3). |
| U3 | Center "Cutdown Day" and make it a larger subtitle size style in cinzel decorative. | CUTDOWN DAY leaves the small `.zpb-fx-sec` caps line and becomes its own centered subtitle: new `.zpb-fx-cdtitle` — Cinzel Decorative, centered, larger than the retired section line, in the title family under DRAFT COMMAND CENTER. |
| U4 | Replace "THE NEXT DRAFT IS WHERE YOU FIX THIS" with "PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO 20-0" AND HAVE "20-0" SHIMMERING IN THE USER'S TEAM COLOR. | The footer line is rebuilt: PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO **20-0**, the 20-0 wrapped in a new team-color shimmer (`.zpb-fx-goshine`) — the fxshine sweep riding the user's pack ink (`--zrb` light / `--zrd` dark), the same 220% gradient law the site's shines wear, static under reduced motion. |
| U5 | Remove this text: "-x vs his x OVR" | The delta span (`.zpb-fx-gapnum`, "−N vs his XX OVR", incl. the ±0 form) is gone from the cutdown cards — and from every card, per veto (c): the span was the only carrier. Its dead CSS rule retires with it. |
| U6 | Put the "x OVR" and "y Season Rating" both on the player cards. Make the OVR rating a badge at the same size as the position badges. The performance rating should be about the same size. | Every cutdown card now shows both numbers: the OVR as a badge built from the position badge's own class (same size structurally — zero drift), sitting beside the position badge; the season rating keeps its number slot with the label renamed PERFORMANCE → SEASON RATING, and the number steps down from 1.18rem to about the badge size (.72rem). |

## Vetoes (Muse's flags, the Owner's calls)

| # | Item | Disposition |
|---|---|---|
| V-a | The lineup slot-picker chip (`−10 FLEX` → `−10`) — DECIDED, fold into w76 | APPLIED. The DRAFT-HIM-INTO picker's flex chip reads just `−10` (the penalty alone); NATURAL keeps its word; nothing else on the picker moves. The fills category already read `x (-y)` since w75 — this closes the second and last FLEX surface. |
| V-b | The cutdown 40 %-of-games floor + TRUE OVR test — HOLD | NOT APPLIED (the Owner has not called it). The w75 behavior stands as shipped: the floor stays (sample hygiene) and the <80 test reads the TRUE OVR. Muse's context note (the floor does real work, `r.gp` is tracked) is recorded for the Owner's call. |
| V-c | The rating-scale translation — DECIDED, three parts | APPLIED. (1) The translation door stays, otherwise as shipped in w75 (backend `_rating` untouched). (2) The delta is gone from every visible card (U5). (3) The median is REDEFINED: no longer the median of all 1,200 database players (76) — the median of the **normally-drafted pool**: the draft-eligible players (`POS_SLOT_MAP` filter, the exact pool the draft sorts) down to the number of picks the draft actually makes (`TOTAL_ROUNDS × 32 teams = 1,024`), i.e. the players whose ratings in the 50s never get drafted are OUT. Produced ONCE as a stored derived value (`window.__zpbMedOvr`, computed at first need, cached — never recalculated per draft). The Guide's one-line explainer is reworded to match (drafted pool's median; no delta wording) — flagged below. |

## Non-product track — Muse's w76 items

| # | Muse item | Disposition |
|---|---|---|
| N1 | The Owner's UI fixes are the core of w76 | Done — U1–U6 above. |
| N2 | Veto (a) folded into w76 | Done — V-a. |
| N3 | Veto (c) decided: keep the translation, drop the delta, recalculate the median (drafted pool, produced once) | Done — V-c. |
| N4 | Veto (b) — hold for now (the floor + TRUE OVR test await the Owner's call) | Held — V-b. |
| N5 | M6 — apply the stale-reference dispositions to the w74 docs; asks whether it fits in w76 or w76 should stay UI+vetoes | It fits — docs-only, zero product risk, done this chat: CALIBRATION.md + FINDINGS-P-250.md (80/25/10 → 90/35/25 + P(20-0) ≈ 1–2 %; parity-band-as-target → the real-NFL reference (3.07 ± 0.35) — the target is derived in M5), timeline.md line 33 (the stale target line → the 90/35/25 + P(20-0) wording), w74/README.md + every w74/*/README.md carrying the same statements, and the test-count basis stated in each touched doc's header (288 = the full vitest suite (core + nfl + app); 286 = 288 − 2 storage-env-dependent tests skipped in the sandbox run; 284 = 286 − 2 golden-seasons tests still warming = 288−2−2). History artifacts untouched (b-top30-*.json keep their filenames and bytes). Delivered in the zip under `w74-docs-m6/` with a line-level manifest and a unified diff, ready for the gh-pages drop. |

## Interpretation flags (veto points)

1. **U1's second rendering** — the panel has a twin header for the no-rooms state ("EVERY ROOM AT A B OR BETTER"). The Owner quoted only "EVERY ROOM BELOW A B · BEST TO WORST"; the twin is a different string and keeps standing (it is the whole section in that state). Say the word and it goes too.
2. **U3's casing** — the Owner wrote "Cutdown Day"; the panel said "CUTDOWN DAY". His other quotes this wave match the page caps exactly, so the casing here reads as chosen: the subtitle renders "Cutdown Day" as written.
3. **U6's label** — "y Season Rating" is read as the label text on the card (the old "PERFORMANCE" caption becomes "SEASON RATING"), and "about the same size" is read as ≈ the badge size (.72rem vs the badges' .62rem — the same size family, the number keeps its Cinzel weight).
4. **V-c's pool definition** — "normally drafted" is derived from the engine's own numbers, not a guess: the draft makes `TOTAL_ROUNDS × 32` picks (32 × 32 = 1,024) off the sorted `POS_SLOT_MAP`-filtered pool, so the drafted pool = that pool's top 1,024. The median is derived once from the database and cached; the engine math is untouched.
5. **The explainer line** — the Guide's THE PERFORMANCE SCALE sentence named the database's median and the shortfall count; with V-c and U5 both decided, the line is reworded to the drafted pool's median and no longer mentions the shortfall. Flagged so the Owner can strike or re-word it.
