# UK — Council Advisor

## Identity
- **Name:** UK
- **Seat:** S-2200–2299
- **Role:** Council Advisor
- **ID Block:** S-2200–2299

---

## Session Work Summary (2026-10-26)

### Reviews Completed (All Pushed to `council/uk`)

| Task | Review | Verdict | Key Finding |
|------|--------|---------|-------------|
| **P-004** | #3 | **ok** | Team theming: 32-team color table (Owner's 22 Oct), CSS cascade with `[data-team]`, draft board cards use real NFL team colours until draft ends, then user's team colours for user's players. Dark teams need `--team-primary-light`. Unblocks P-046, P-064, P-074, P-078, P-100, P-112, P-118, P-152, P-185, P-186. |
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
| **P-072** | #1 | **improved** | Draft button always visible: `#draftSetup` max-height + overflow, `#startDraftBtn` sticky bottom. Mobile: width 100%, override inline styles. |
| **P-073** | #1 | **ok** | Click any number to sort: delegated click on `#draftTable2` for `td[data-sort]`. Add `data-sort` to numeric cells (ovr, wins, value, priority, gone). Also apply to Position Rankings, Player Browser, Team Comparison. |
| **P-074** | #1 | **improved** | Three team color bubbles under logo in draftingas banner. CSS variables `--team-primary/secondary/accent` needed (from P-004). Fallback values for now. `applyTeamColors()` function required. |
| **P-075** | #1 | **ok** | Remove "No picks yet." (lines 1564, 1778) and "needed" (line 1785). Replace with empty strings. |
| **P-076** | #1 | **ok** | "by your next pick" text: wrap in `<span class="narrow-hide">`, hide at ≤760px via CSS. |
| **P-077** | #1 | **ok** | "Can you go 20-0?" shimmering on draft complete page (line 5794). Add `--gold` variable, shimmer CSS with `prefers-reduced-motion` respect. |
| **P-102** | #1 | **improved** | Draft board fills panel: `#viewDraft` flex column, `#draftLive` flex:1, `.draft-columns` grid, `#draftTableWrap` flex:1. Mobile: stack columns. |
| **P-125** | #1 | **ok** | "Start A New Draft" button at bottom of draft board: shimmering pill style, confirm dialog "Are you sure? Your current draft will be erased.", returns home. Update existing buttons to match style. |
| **P-153** | #1 | **improved** | Draft board controls: 22 sub-items. 1-14 covered. 15: sort menu words (no "Sort:"). 16: team logo filter (needs implementation). 17: search "Search" right-aligned. 18: Table/Cards toggle works. 19: overflow-x:auto mobile only. 20: all/none bubbles as graphic icons. 21: "↶ Undo". 22: Priority broken — `prioOf` returns 1, `PRIO_MULT` dead code, `score = pri`. Fix: remove dead code, simplify. |
| **P-183** | #1 | **improved** | Sitewide Style Law: 18 rules (no white text, integers only, Cinzel Decorative, fade titles, ALL CAPS buttons, foil shimmer 90+, hover position names, banned phrases, no blue panels, no orange, no emojis, open/airy glass, value here background only, team colours on team elements only, no permanent green, reduced motion, 390px floor, shimmer text emphasis). Conflicts flagged for Owner. |

### GitHub Pushes

- All 23 reviews pushed to `council/uk` branch (commits: `61076002`, `ea3b2255`, `8c7ab9a0`, `4a6be338`, `6e03ccc6`, `8384c02d`, `dbb616e8`, `f176125d`, `c31b4612`, `d2a6f541`, and earlier)

---

## Key Findings/Decisions

- **P-004** (review #3): Team theming spec complete and authoritative. Architect must verify 32-team table against Owner's 22 Oct source.
- **P-007** (review #3): Animation spec complete with exact hook points and timing. Ready for Architect implementation.
- **P-005** (review #3 by me earlier): Cooper DeJean FS-flex glitch root cause confirmed (`FLEX.CB.FS = 0`).
- **P-153** Priority fix: `prioOf(g)` always returns 1 (stars removed), `PRIO_MULT[1] = 1`, so `score = pri`. Remove dead code.
- **P-183** Style Law: 18 canonical rules. Conflicts with current code flagged (warm white vs cool white, blue panels vs rose/gold, green vs gold, Cinzel not loaded).
- **z-post-blue draft board**: Race condition in `setActiveTab` vs async `renderDraftLive` (from earlier session) — needs Architect triage.

---

## Updated Open Questions / Blockers

- **P-004**: Architect must implement team theming (CSS variables, `applyTeamColors`, 32-team table verification)
- **P-007**: Architect must implement animation (new `animateGame` function, integration in `simulateCurrentWeek`)
- **P-005**: Ready for Architect (Beam's work complete, my review #3 done)
- **z-post-blue draft board**: Race condition needs triage

---

## Current Build State

- **Pre-Colors (reference):** `Football-Sim-PreColors.html` — sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B)
- **V20 Reference:** `Football-Sim-V20.html` — sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 B)

---

## Next Session Should Read

1. **`inbox/20261026-1312-uk-P-019-review.md` through `20261026-1326-uk-P-007-review.md`** — This session's 23 reviews
2. **`_agents/PRIORITIES.md`** — Master priority list
3. **`_agents/V23-OWNER-REQUESTS.md`** — Owner's direct requests

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
- **Merge-base with origin/council/base:** `git merge-base HEAD origin/council/base`

---

## Identity Block

- **Name:** UK
- **Seat:** S-2200–2299
- **Role:** Council Advisor
- **ID Block:** S-2200–2299