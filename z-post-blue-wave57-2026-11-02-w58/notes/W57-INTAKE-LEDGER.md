# W57 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 57 (the Owner's count) · received 2026-11-02 · two directives in one message: (A) ten small comments about w57, (B) the storage brief — fetch `architect/engine-and-seats`, read the contract first, write the Phase 0 plan, start the no-engine storage work, answer the five questions, push `council/zai`, don't touch §4 files. Baseline: my w56 (`Football-Sim-Z-post-blue-w56.html`, md5 `42af55f794180910f1f9086fe0c68a3d`, 1,600,958 bytes, verified from `council/vl`).

## A · The round-57 comments

> "Good job on the player cards. My only gripe is the vertical line at the left of the player cards. It often obscures the first letter of the player's names. Just remove this vertical line."
> — Reproduced on the w56 bytes: three paints draw a bar at the left edge of the player-card rows — the phone card's `border-left:4px solid var(--accent)` (`#draftTable2 tr`, the v8 compact board), the board name cell's `box-shadow:inset 3px 0 0 var(--zrb)` (`tr.zpb-trow td:first-child` — on the phone the name cell carries `padding:0`, so the 3px team-ink bar sits ON the first letter), and the cards-view row's `border-left:3px solid var(--zrb)` (`.prow.zpb-trow`). Fix: all three retire. The team wash (the gradient) stays — only the LINE goes. The depth-chart rows keep their bar (it leads a slot label, never a name, and the w56 D1 Dime law reads it).

> "You changed the shape and color of the draft buttons. I like it."
> — No action. The w56 Draft-button look is pinned as standing law.

> "In the game preview screen, when the window is very small, you chose to layer the key players by OVR but they are all mixed into one vertical list. I would prefer if the players still stay on their team's side and lineup across from each other even in a small window. I think the key player cards can support being even smaller."
> — Root cause on the w56 bytes: the w55 phone law `.zpb-pvfrow{grid-template-columns:1fr !important}` (≤640px) stacks the paired preview cards — away#1, home#1, away#2, home#2 … an OVR-ordered mingle instead of a face-off. Fix (the Owner's own override of the w55 law): the preview's key-player pairs sit TWO ACROSS at every width — `repeat(2,minmax(0,1fr))` so the grid may compress below min-content — and the cards themselves compress to fit: tighter padding, smaller Cinzel name (one line, ellipsis — never a mid-word break), smaller position chip, smaller OVR numeral, the season-stat chips wrapping under the name row. The review's Key Players (the `.kp-grid` half of the w55 rule) keep their one-per-line law — the Owner spoke about the preview screen only.

> "Remove this text from the game plan cards: '+0.2 pts vs. auto'"
> — The `.zpb-plan-fx` line inside `planCardsHTML` retires (both cards, every screen). The math behind it (`planFxLive`) stays — the story prose still cites cumulative plan value where the Owner's w33 law put it; only the per-card line goes.

> "In general, the during the game cinematics don't adjust well for super compressed screens and small windows. Please do more testing and find solutions for these cases."
> — A live probe walked the game-replay overlay at 320px, 280px and a short 500×420 window on the w56 bytes and found: the header's 1.5rem Cinzel score and 26px crests squeeze the two team blocks into overlap; the log's 46px time column and .82rem lines crowd; the overlay's 14px padding eats a 280px window; the intro's SB logos stay 120px where the regular-game logos already shrink (the ≤600px rule only matches `:not(.zpb-sb)`); the SB banner text and the porun score row run wide. Fix: a compressed-window pack for the whole cinematic family (replay overlay, intro, final, the Super Bowl storm, the playoff-run cine) at ≤480px, ≤360px and `max-height:620px` — smaller type, tighter gaps, scaled crests, the log's min-height relaxed on short screens, the panel capped to `min(640px,100%)` inside the overlay's own padding. Proven by the battery at 320/280/500×420 with zero page errors and no pan.

> "Also during the game, players last names will break and one letter will be on a different line than another. Please fix this."
> — Root cause: `overflow-wrap:anywhere` on the name carriers lets a squeezed flex/grid lane compute its min-content as ONE CHARACTER, so a name breaks letter-by-letter when the lane is narrow (the replay log's `.zrl-play`, the lineup cells `.zpb-lu-cell`, the global name class `.zpb-gname`). Fix: those three move to `overflow-wrap:break-word` — the min-content stays the widest word, names wrap at spaces, and a mid-word break happens only when a single word genuinely cannot fit. No hyphenation.

> "There is a glitch where one team's box score repeats one of their quarter or ot scores in the has their final score off the box score table. Please fix."
> — Reproduced by synthetic OT results on the w56 bytes: `renderLineScoreHTML` builds `cells = q.slice(0, r.ot?5:4)` — the OT quarter is ALREADY inside the sliced cells (the engine's `quarterTotals` lumps every OT period into index 4) — and then appends the separate `otOf` cell again. In an OT game the row carries SEVEN cells under a SIX-column header: the OT score shows twice (under OT and again under F) and the true final lands in a seventh cell with no header — off the table. Fix: `cells = q.slice(0, 4)` always — four quarter cells, the OT column comes solely from the w33 `otOf` law (OT-only score, never a running total), the final returns under F.

> "The begin playoffs button should have the color and size that the sim playoffs button has."
> — `#beginPlayoffsBtn` joins both standing button laws: the w51 size law (`font-size:1rem !important;padding:13px 30px !important`) and the gold CONTINUE-color law (the gradient pill). Its inline `padding:10px 24px` retires so nothing argues with the law.

> "The badges in review and unit report cards can appear even a little faster."
> — The review's stat badges/honor cards (`.zpb-sbadge`, `.zpb-scard`) and the unit report tiles (`.zpb-rcbadge`) pace at one beat per second (`calc(var(--beat,0)*1s)`). Fix: the same beats at ×0.6s — the cadence keeps its order, the wait nearly halves. The field-map and depth-chart one-second-per-beat laws (w44/w46) are untouched.

> "Good job on the sim playoffs showing your team's results first but it should flow instantly into the superbowl champion cinematic. There is a weird pause and showing of the page underneath in between those two cinematic. Make it flow more smoothly"
> — Reproduced: `zpbPlayoffRunCine` fades the run overlay out (0.5s) and only 560ms later removes it and mounts the Super Bowl storm — the page underneath shows through the fading overlay. Fix: the storm mounts FIRST (it is opaque from its first painted frame, and its z-index 120 sits under the run overlay's 130), then the run overlay fades to reveal the storm — never the page. The 560ms dead air is gone; the Continue button and the story release are untouched.

## B · The storage directive

> "Fetch branch architect/engine-and-seats of kozikosi/football-sim (read-only, don't check it out in your worktree). Read inbox/20261101-2100-architect-to-zai-storage-contract.md first, then inbox/20261101-2000-architect-storage-assessment.md and the three owner notes _agents/owner-notes/2026-11-01-storage-*-verbatim.txt. Then write your Phase 0 plan as an inbox file on council/zai and start the storage module and stats work that doesn't depend on the engine (section 2 of the brief). Answer the five questions in section 5 and push council/zai. Don't touch the files in section 4."
> — Read in order: the contract, the assessment, the brief, the answers, the run-it-back ruling (found on `council/muse`, `_agents/owner-notes/2026-11-01-storage-b6-run-it-back-verbatim.txt`). The five questions are answered in `inbox/20261102-*-zai-storage-phase0.md`. The module lands in the product as its own payload block (`zpb-storage-css` + `zpb-storage-js`, the w51-js pattern) — no engine imports, envelope-only, screen call sites NOT wired (the separate commit). §4 files untouched (this repo's worktree never had `colors/`; nothing to touch).

> "I would like you to focus on making UI/UX for the storage. You don't have to make sure everything actually works, but I want you to design how this all looks. Good luck"
> — The design mandate. The storage UI kit ships IN the product: the Continue moment, the slot selector, the A/B/C overwrite caution, the profile panel (with the Owner's exact empty-state sentence), settings, the brag share + toast, and the four honest states (empty / corrupt / newer-version / unavailable). They render as a showcase on `?storage=1` — every specimen in the visual language, walkthrough-ready — and the CSS carries the tokens so the real screens adopt them wholesale at the wiring commit.

## §veto — interpretations the Owner may overturn
1. "Player cards" = the draft board cards (`#draftTable2`, desktop table + phone card) and the cards-view rows (`.prow`). The DEPTH-CHART rows keep their left bar — it leads a slot label, never a name — and the w56 Dime paint law is untouched.
2. The preview key-player pairs go two-across at EVERY width; "even smaller" = tighter padding, smaller type, chips wrapping under — the stat chips stay (they vanish only under 360px, where the OVR is the story).
3. "A little faster" = one beat ×0.6s (was ×1s) for the review badges, honor cards and unit-report tiles only; the field map and depth chart keep their one-second beats.
4. The cinematics pack touches the replay overlay, its intro, the SB storm and the playoff-run cine — the three things the Owner called "during the game cinematics"; the schedule/story panels are not cinematics.
5. The storage showcase mounts on `?storage=1` (a design surface, not a screen call-site wiring); the real Continue/profile/settings/brag wiring waits for the separate commit, as the contract requires.
