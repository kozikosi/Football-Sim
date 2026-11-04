# UPDATE README — wave 65 · the Owner's UI/UX round + Claude's weights + the Muse QA

**File:** `Football-Sim-Z-post-blue-w65.html` · md5 `948f789da6d3ccf064104212ec748f3a` · 1,741,540 bytes
**Baseline:** the w64 bytes (`8b601f06…`, your gh-pages push), asserted on every generator run. Three rounds merged in one nine-step asserted chain (`zpb_w65.py` → `zpb_w65i.py`): **your 25-item UI/UX list**, **Claude's de60e05 weights wherever the UI displays them**, and **Muse's w64 QA four** (tested, then fixed where real).

## Part 1 · Your UI/UX list — every item

1. **The Draft button keeps its distance** — a real floor below the two dropdowns (≥36px measured) and a hard gap above the footer nav (≥40px measured) at every width.
2. **The footer moved DOWN** — the sticky thumb-reach law retired: the footer nav sits in flow with a 64px+ top margin; it can never encroach on the panel above it again.
3. **The 100-season badges grew** — the hero row and the badge row wear the site's advanced stats: **12+ win seasons**, **playoff trips that became titles**, **turnovers per game**, **sacks per game** (the four the aggregate carries; points-allowed and the point swing are not in the aggregate — say the word and they join).
4. **BACK TO SEASON from the 100 seasons glows in the team's color** — the team-ink tokens (the autosave chip's law), Cinzel Decorative, pill.
5. **SIM GAME + SIM SEASON: one size, on the header** — both ride the tab row at the SIM GAME size (the dead duplicate in the Week panel retired); SIM SEASON shows only while the regular season is live — it can never appear on the Super Bowl review page.
6. **The depth chart fades ≥0.5s faster** — the beat clock: 1s → **0.12s** per row (every row 0.88s faster than the w64 pace), the fade .55s → .3s; the draft-review cards ride the same clock; the formation map keeps its 1s law. The 90+ escape-hatch floor (undrafted fillers) retired — the tail waited 15s even at the new pace (w64: two minutes); fillers now land right after the drafted beats.
7. **The special-teams pane left-aligned** — the same grid as offense/defense, the horizontal lines restored, nothing crosses the panel boundary (measured 11px of air).
8. **A glowing BACK TO SEASON closes EVERY page** — Your Roster, Team Comparison, the 100 seasons, the player browser, rankings, guide — every page with a live season carries the team-ink door top AND bottom (the season tab itself carries neither; the SEASON tab stays in the row).
9. **The comparison tab inside the Season works** — the two broken panels retired; one header panel copies the footer page: two pill dropdowns with the X vs Y score between them; the starter-by-starter import untouched.
10. **The X vs Y score is never covered** — ≤760px the score takes its own centered line ABOVE the dropdowns, on the footer page AND in the season tab (one law, two surfaces).
11. **The two dropdowns match** — both wear the bigger size and the pill shape (999px, the DRAFT button's silhouette) on both comparison surfaces.
12. **The Player browser's faces read clean** — the team face reads **ALL TEAMS** (the middle dot is gone; the opened menu offers ALL TEAMS so you can come back), **ALL POSITIONS**, the search placeholder reads **SEARCH PLAYER NAME** — no ellipses anywhere.
13. **The weights you SEE are Claude's** — the Position Rankings buttons, the Guide's tier visualization and per-slot table, and the MODEL preset in ADJUST THE WEIGHTS all read the de60e05 table (QB 1000 anchor · WR1 525 · DE1 520 · DT1 410 · WR2 295 · TE1 295 …; 1 unit = 0.00254 wins over a 70→90 upgrade). The engine itself untouched, per your note.
14. **The draft board's vertical bar is dead** — the w57 law killed it in light mode only; the dark theme re-added it. It now retires in every theme (scoped to the draft board).
15. **"Roster locked — preseason setup is the next step." is gone.**
16. **START PRESEASON → rides the bottom of the post-draft page** — the linear-progress footer law.
17. **The Season stats panel left the Week 1 preview** — the whole panel stays off while zero games are played (it returns the moment Week 1 is in the books).
18. **The pregame cinematic sits low** — ≤600px the marquee's top padding grows (22 → 64px) so the logos and key players clear the horizontal lines; a very short window trims the logos a touch.
19. **SIM PLAYOFFS asks twice** — a second warning page in the exact SIM SEASON format: ARE YOU SURE YOU WANT TO SIMULATE THE PLAYOFFS? / Every remaining round plays out at once. This cannot be undone. / YES · SIMULATE THE PLAYOFFS · Cancel — gated on your team being alive in the bracket (missed the playoffs → no warning).
20. **The Season Review button** — the arrow is gone, it is centered, glowing, in its own panel with real distance from the SUPER BOWL CHAMPIONS banner.
21. **The Season Review glitch is dead** — reproduce-then-fix in the live probe: after the 100 seasons, SEASON REVIEW lands on the Season Review page, every time (asserted on the exact path).

## Part 2 · Claude's weights (de60e05) — synced where the UI displays them

- The **SLOTS table** (14 re-measured spots: WR1 470→525, WR2 330→295, TE1 270→295, DT1 400→410 …) — read from the architect branch, not from any earlier wave.
- **RATING_SPECS.rec** (WR2 0.91→0.70, WR3 0.53→0.45) and **PLAN_K.defPredict 0.4→0.15**.
- The **FLEX table is REV 4** — see Part 3.

## Part 3 · Muse's w64 QA — tested, then fixed where real

1. **P-232 CLOSED (P0)** — the embedded FLEX table is now `tools/mathlab/flex.json` REV 4 verbatim (translated to the site's tags): **QB flexes ONLY to FS at -10**; P→K costs 4 (K→P free); every row re-measured. The draft's late auto-fill — which filled ANY player into ANY slot at a flat -9 — now obeys the flex table too. The in-code comment no longer attributes QB→RB/WR to you.
2. **THE AUTOSAVE CHIP TELLS THE TRUTH** — boot with a save in slot A and a **RESTORE SAVED SEASON** chip (team ink) appears; clicking it rebuilds the season and the draft roster behind it (32 rosters) and re-renders the season tab. The save envelope carries the draft pickRounds; w63-era saves restore through the same door.
3. **THE BROWSER GOES BEYOND 60** — the pager (PREV · PAGE X OF 20 · NEXT) existed since w63 but an old "removals safety" CSS law was hiding it (`display:none !important`). The law is lifted; the pager shows and works (verified live, pages 1→2 with new players).
4. **THE PRESEASON HEADING — NOT REPRODUCED** — the probe re-played the exact path (draft as the Raiders → preseason): the heading reads "Set up the **Las Vegas Raiders** before Week 1" and agrees with the roster panel and the season state. The heading reads `seasonUserTeam()` — the same source the lineup panel uses. Recorded with evidence; say the word if you saw otherwise.

## The batteries — 205/205 on the shipped bytes

nodecheck 19/19 · **the w65 round 59/59 (NEW — your 25 items, probe-first)** · verify 13/13 · mobile 41/41 · live 7/7 · storage 7/7 · sweep 13/13 · cine 27/27 · owner 19/19.

## In the package

- `Football-Sim-Z-post-blue-w65.html` — the product (also loose in the download area)
- `UPDATE-README-w65.md` — this file · `CHECKSUMS.txt` — the lineage pins
- `_agents/zai/` — START-OF-CHAT REV 21 · END-OF-CHAT · ZAI.md
- `notes/` — W65-INTAKE-LEDGER.md (your words, item by item) · W65-BUILD-REPORT.md (the chain, the probes, the three late visual catches)
- `tools/` — the nine generators + the nine batteries · `shots/` — the evidence
