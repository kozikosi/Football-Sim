# UK — Council Advisor

## Identity
- **Name:** UK
- **Seat:** S-2200–2299
- **Role:** Council Advisor
- **ID Block:** S-2200–2299

---

## Session Work Summary (2026-10-30)

### Reviews Completed (All Pushed to `council/uk`)

| Task | Review | Verdict | Key Finding |
|------|--------|---------|-------------|
| **P-004** | #3 | **ok** | Team theming: 32-team color table (Owner's 22 Oct), CSS cascade with `[data-team]`, draft board cards use real NFL team colours until draft ends, then user's team colours for user's players. Dark teams need `--team-primary-light`. Unblocks P-046, P-064, P-074, P-078, P-100, P-112, P-152, P-185, P-186. |
| **P-007** | #3 | **ok** | Game-play animation: 30-60s user game only, every turnover, Skip button, reduced-motion respected. Hook points: `playGame` (3479), `simulateCurrentWeek` (3543), `g.result.homeEvents`/`awayEvents`, `g.flow.after[q]`. Timing constants defined. Unblocks P-114, P-115, P-122, P-164, P-166. |
| **P-019** | #1 | **improved** | Game review redesign: `generateGameSummary` (2662), `playByPlay` (2609), `starsParagraph` (2580). Reorder: chronological plays → turnovers → stars with game ball guaranteed. Fix "blocked XP at 0-0" glitch at line 2573. Box-score style lines. |
| **P-020** | #1 | **ok** | Season review: badge cinematic (offense→defense→key factors, 1/s), conference standings (user division 2x), playoff bracket, gold awards, top 3 player cards, 20-0 cinematic. Mock needed (≤10 KB). Remove "Vs Actual NFL Teams", fix "undefinedDIFF", remove "(MVP, All-Pro, Pro Bowl)", shimmer All-Pro names. |
| **P-021** | #1 | **ok** | Playoff preview redesign: graphical, almost no sentences. Replace `playoffPreview` (4884) with matchup header, stat bars, chips, key players, win-prob bar. Bye-week panel replaces single grey line. CSS additions after `.ub` rule. |
| **P-042** | #1 | **ok** | "Change" button: single occurrence at draft board Fills column (line 1765). Use `var(--gold)` not `--accent` (blue). Team palette when team selected. |
| **P-043** | #1 | **improved** | Remove Star system: keep `PRIO_MULT`/`prioOf` (priority math), remove `PRIO_STAR`, star click handler, star spans in chips, star explanation, pcard header star, guide star section. 85+ OVR stars in `starsFaceoffHTML` — recommend KEEP (different system). |
| **P-044** | #1 | **ok** | Remove "you hold the #X overall pick" text from draftingas banner (line 1488). Keep "Drafting as [Team]" only. |
| **P-045** | #1 | **improved** | "(x.y)" draft pick indicator: add to `draftStatusText` as `<span class="next-pick-indicator">(R.P)</span>` aligned right. Format `(round.pickInRound)`. |
| **P-068** | #1 | **ok** | Homepage dropdowns: `.filters` change `flex-wrap:wrap` → `flex-wrap:nowrap; overflow-x:auto`. `.filters input` min-width 0. Mobile media query override. |
| **P-069** | #1 | **improved** | Footer: pinned bottom, not floating pill. Add "see guide for details" text above. Remove JS that moves footnav. CSS: `position:sticky; bottom:0`. |
| **P-071** | #1 | **improved** | Draft board bubbles: `.prow` add `min-width:0; overflow:hidden`. Table view: `dc-name`/`dc-ovr` smaller fonts, ellipsis. Draft button `flex-shrink:0`. Mobile media query additions. |
| **P-072** | #1 | **ok** | Draft button always visible: `#draftSetup` max-height + overflow, `#startDraftBtn` sticky bottom. Mobile: width 100%, override inline styles. |
| **P-073** | #1 | **ok** | Click any number to sort: delegated click on `#draftTable2` for `td[data-sort]`. Add `data-sort` to numeric cells (ovr, wins, value, priority, gone). Also apply to Position Rankings, Player Browser, Team Comparison. |
| **P-074** | #1 | **improved** | Three team color bubbles under logo in draftingas banner. CSS variables `--team-primary/secondary/accent` needed (from P-004). Fallback values for now. `applyTeamColors()` function required. |
| **P-075** | #1 | **ok** | Remove "No picks yet." (lines 1564, 1778) and "needed" (line 1785). Replace with empty strings. |
| **P-076** | #1 | **ok** | "by your next pick" text: wrap in `<span class="narrow-hide">`, hide at ≤760px via CSS. |
| **P-077** | #1 | **ok** | "Can you go 20-0?" shimmering on draft complete page (line 5794). Add `--gold` variable, shimmer CSS with `prefers-reduced-motion` respect. |
| **P-102** | #1 | **improved** | Draft board fills panel: `#viewDraft` flex column, `#draftLive` flex:1, `.draft-columns` grid, `#draftTableWrap` flex:1. Mobile: stack columns. |
| **P-153** | #1 | **improved** | Draft board controls: 22 sub-items. 1-14 covered. 15: sort menu words (no "Sort:"). 16: team logo filter (needs implementation). 17: search "Search" right-aligned. 18: Table/Cards toggle works. 19: overflow-x:auto mobile only. 20: all/none bubbles as graphic icons. 21: "↶ Undo". 22: Priority broken — `prioOf` returns 1, `PRIO_MULT` dead code, `score = pri`. Fix: remove dead code, simplify. |
| **P-183** | #1 | **improved** | Sitewide Style Law: 18 rules (no white text, integers only, Cinzel Decorative, fade titles, ALL CAPS buttons, foil shimmer 90+, hover position names, banned phrases, no blue panels, no orange, no emojis, open/airy glass, value here background only, team colours on team elements only, no permanent green, reduced motion, 390px floor, shimmer text emphasis). Conflicts flagged for Owner. |
| **P-160** | #1 | **WORK** | Season review copy and metrics cleanup. Removed "Team rankings are regular-season only...", "428 points for...undefined", "The bracket awaits...", long paragraph. Updated header to "SEASON REVIEW" once. QUARTERBACK PLAY only, RUN BLOCKING/PASS PROTECTION names, QB first, depth-chart order. Metrics clickable with fading notes. Integers only. 2-Pt Conversions "x of y". "IN DA CLUTCH" section. INDIVIDUAL SKILL, SUBPAR BLOCKING, EXCELLENT COVERAGE labels. Top-right "20-0?" + "Try again to go 20-0?" button. |
| **P-166** | #1 | **CLAIM** | Game animation log lines: panel 50% larger, more space between quarters, no lines, palette text, format "<team> <play> <yds>", shimmering TD/FG tags, score "x - y", turnovers as "x int y", "x fum", "y FF", "z FR", "x strips y & x recovers", always with time, never print "Touchdown" or "Turnover", fix glitches. |
| **P-158** | #1 | **improved** | Verdict threshold fix: Owner 0.10 cutoff for "Costly miss" replaced code's 0.45 with 0.10; "Fine" → "OK" label; verified `pickCritiqueHTML` function thresholds correct. |
| **P-162** | #1 | **improved** | Card design proposal: reusable card component for stats/awards/leaders/draft bubbles; correct userStatsInner anchor line 3651 (was listed 3642 in work doc); removal of "why" text from awards; consistent palette colours not white. |
| **P-162** | #1 | **improved** | Verdict: improved (calibration defect in anchors found; design direction sound; no runtime checks run). |
| **P-165** | #1 | **CLAIM + WORK** | Game review and result line: always shimmering player of the game; remove "PLAYER OF THE GAME"; final line "TB 29-34 NO" with each score in team colour; YOU WON/YOU LOST with shimmering star; remove "FINAL ... You winTurnovers ..." and second set of team names; no "Turnovers - ARI 2 - 1 NO". Claims pushed; work spec in inbox. |
| **P-163** | #1 | **CLAIM + WORK** | Playoff preview redesign: key players as vertical cards (one per line), shimmering at 90+ (no drifting names); remove "quarterback play +3.3 pass protection"; whole preview in Cinzel Decorative; star emojis team-coloured and shimmering; playoff picture text in palette colours. Anchors: `starsFaceoffHTML` (5397-5404), `playoffPreview` matchup lines filter (5380-5383), `renderPreviewPanel` Cinzel wrapper (5405-5409), CSS shimmer keyframes. Files: `inbox/20261029-1949-uk-P-163-claim.md`, `inbox/20261029-1949-uk-P-163-playoff-preview-redesign.md`. |
| **P-125** | #1 | **ok** | 'Start A New Draft' button at bottom of draft page: exact anchor at lines 434-438, uses `confirmDialog` + `startNewDraftFlow`, CSS gradient `--accent`/`--gold`. No duplication with existing buttons. |
| **P-165** | #1 | **improved** | Game review & result line: root causes confirmed (mvp guard at 3735, unconditional mvp at 3188, simulateGame pool empty → undefined mvp). Improved spec adds `renderGameBallHTML`, week-1 OVR guard, foil shimmer complementary colour. |
| **P-166** | #1 | **improved** | Game animation log lines: root causes confirmed (duplicate lines from synthetic turn times, missing MM:SS times, bare "touchdown" word, en-dash score, "Turnover" prose). Improved format spec: 10 lines with columns play|time|score, TD/FG shimmer tags, lowercase turnover codes, no "Touchdown"/"Turnover" words. |
| **P-164** | #1 | **WORK** | Playoff flow and cinematics: playoff button "Play the <opponent>", SIM PLAYOFFS after elimination, cinematic timeline (regular=playoff intro, playoff=Super Bowl cinematic, Super Bowl=1 min), "Season in Words" glitch fix (persistent panel in playoffs view), skip behaviour, reduced motion. |
| **P-167** | #1 | **WORK** | Lineups (Game Preview) fix: root causes for "undefined" (normalizeSlotEntry), dark colours (use team-aware foil shimmer), missing slots (fallback in lineupCell), ratings parentheses (already present), centred headers (add text-align:center), effective ratings note (keep narr but readable), team identity visible (change details to div), foil shimmer on matchup winners and 85+ players in team colour. Anchors: lineupCell (3341), renderLineupTableHTML (3351), starsFaceoffHTML (5397), renderIdentityPanel (5192). |

### Current Session (2026-10-30 continued)

| Task | Status | Notes |
|------|--------|-------|
| **P-167** | **WORK** | Lineups (Game Preview) fix — detailed root causes and exact code changes with anchors |

### GitHub Pushes

- All reviews and work pushed to `council/uk` branch (commits: `d3e43d71`, `066b69be`, `13f4966c`, `27371417`, `8e921b81`, `13f4966c`, `27371417`, and earlier)

---

## Key Findings/Decisions

- **P-004** (review #3): Team theming spec complete and authoritative. Architect must verify 32-team table against Owner's 22 Oct source.
- **P-007** (review #3): Animation spec complete with exact hook points and timing. Ready for Architect implementation.
- **P-005** (review #3 by me earlier): Cooper DeJean FS-flex glitch root cause confirmed (`FLEX.CB.FS = 0`).
- **P-153** Priority fix: `prioOf(g)` always returns 1 (stars removed), `PRIO_MULT[1] = 1`, so `score = pri`. Remove dead code.
- **P-183** Style Law: 18 canonical rules. Conflicts with current code flagged (warm white vs cool white, blue panels vs rose/gold, green vs gold, Cinzel not loaded).
- **P-158** (review #1): Code inspection: threshold inconsistency in `pickCritiqueHTML` corrected; "Fine" → "OK" label applied.
- **P-162** (review #1): Design inspection: card spec validated; anchor line 3651 confirmed; award text removal confirmed.
- **P-165** (review #1): Root causes confirmed; improved spec with `renderGameBallHTML`, week guard, foil shimmer complement.
- **P-166** (review #1): Root causes confirmed; improved format spec with columns, shimmer tags, lowercase codes.
- **P-164** (work): Playoff flow spec complete with cinematic timeline, Season in Words fix, skip/reduced-motion.
- **P-167** (work): Lineups fix spec complete with 8 root causes, exact anchors, foil shimmer integration with team theming.

---

## Updated Open Questions / Blockers

- **P-004**: Architect must implement team theming (CSS variables, `applyTeamColors`, 32-team table verification)
- **P-007**: Architect must implement animation (new `animateGame` function, integration in `simulateCurrentWeek`)
- **P-005**: Ready for Architect (Beam's work complete, my review #3 done)
- **z-post-blue draft board**: Race condition needs triage
- **P-163**: Ready for Architect review — presentational changes only, safe alone
- **P-125**: Ready for Architect — beam's work verified ok
- **P-165**: Ready for Architect — improved spec ready
- **P-166**: Ready for Architect — improved format spec ready
- **P-164**: Ready for Architect — work spec ready
- **P-167**: Ready for Architect — work spec ready

---

## Current Build State

- **Pre-Colors (reference):** `Football-Sim-PreColors.html` — sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)
- **V20 Reference:** `Football-Sim-V20.html` — sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 B)

---

## Next Session Should Read

1. **`inbox/20261030-0530-uk-P-167-lineups-game-preview-fix.md`** — This session's P-167 work
2. **`inbox/20261030-0425-uk-P-164-playoff-cinematics.md`** — Previous session's P-164 work
3. **`inbox/20261030-0345-uk-P-165-review.md`** — P-165 improved review
4. **`inbox/20261030-0355-uk-P-166-review.md`** — P-166 improved review
5. **`_agents/PRIORITIES.md`** — Master priority list
6. **`_agents/V23-OWNER-REQUESTS.md`** — Owner's direct requests

---

## Blocked Items

- **P-004**: Architect implementation needed
- **P-007**: Architect implementation needed
- **P-005**: Ready for Architect
- **z-post-blue draft board**: Race condition needs triage

---

## Worktree / Branch

- **Worktree path:** `/Users/kosi/Desktop/wt/uk`
- **Branch:** `council/uk`
- **Merge-base with origin/council/base:** `d7a05a2770bad6b1d2cc31c759bbf64e28a5cf4d`

---

## Identity Block

- **Name:** UK
- **Seat:** S-2200–2299
- **Role:** Council Advisor
- **ID Block:** S-2200–2299