#!/usr/bin/env python3
"""Build the wave-65 delivery package: docs, checksums, zip."""
import hashlib, os, shutil, subprocess, zipfile

W65 = '/home/z/my-project/work/w65'
PKG = W65 + '/pkg/z-post-blue-wave65-2026-11-04-w65'
W64_START = '/home/z/my-project/w64pkg/_agents/zai/START-OF-CHAT-ZAI.md'
HTML = W65 + '/Football-Sim-Z-post-blue-w65.html'

md5 = hashlib.md5(open(HTML, 'rb').read()).hexdigest()
size = os.path.getsize(HTML)
assert md5 == '948f789da6d3ccf064104212ec748f3a', f'product md5 changed: {md5}'
print(f'product: md5 {md5} · {size:,} bytes')

# ---- the package skeleton ----
if os.path.exists(W65 + '/pkg'):
    shutil.rmtree(W65 + '/pkg')
os.makedirs(PKG + '/_agents/zai')
os.makedirs(PKG + '/notes')
os.makedirs(PKG + '/tools')
os.makedirs(PKG + '/shots')
shutil.copy(HTML, PKG + '/Football-Sim-Z-post-blue-w65.html')
for f in os.listdir(W65 + '/tools'):
    shutil.copy(W65 + '/tools/' + f, PKG + '/tools/' + f)
for f in os.listdir(W65 + '/shots'):
    shutil.copy(W65 + '/shots/' + f, PKG + '/shots/' + f)
shutil.copy(W65 + '/notes/W65-INTAKE-LEDGER.md', PKG + '/notes/W65-INTAKE-LEDGER.md')

# ---- START-OF-CHAT-ZAI.md REV 21 (the w64 doc, §1 path + §3 rewritten) ----
start = open(W64_START, encoding='utf-8').read()
start = start.replace(
 "REV 20 · 2026-11-03 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 18 w61; REV 19 the w62 merge; §3 carries the wave-63 double round — the Muse QA five + the Owner UI list.)",
 "REV 21 · 2026-11-04 · Maintainer: Z.ai — the LAST-KNOWN-STATE block (§3) is rewritten at every END-OF-CHAT; everything else changes only when the workflow itself changes. (REV 18 w61; REV 19 the w62 merge; REV 20 the w63 double round; §3 carries wave 65 — the Owner's 25-item UI/UX round, Claude's weight sync, the Muse QA four.)")
start = start.replace(
 "git show origin/council/zai:z-post-blue-wave57-2026-11-02-w57/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'",
 "git show origin/council/zai:z-post-blue-wave65-2026-11-04-w65/_agents/zai/START-OF-CHAT-ZAI.md | sed -n '/LAST-KNOWN-STATE/,/^## §4/p'")

OLD_S3_START = '## §3 · LAST-KNOWN-STATE'
i0 = start.index(OLD_S3_START)
i1 = start.index('## §4 · Version truth table')
NEW_S3 = '''## §3 · LAST-KNOWN-STATE ← *the anti-amnesia block. REWRITTEN EVERY END-OF-CHAT.*

```
DATE/TIME   : 2026-11-04 (chat ended ~) · sandbox session (web chat, w65 — resumed once
              after a stall; the sandbox kept work/, so the recovery cost nothing)
WAVE        : wave 65 SHIPPED — three rounds in one build: the Owner's 25-item UI/UX
              list, Claude's de60e05 weight sync (UI-displayed values), the Muse w64 QA
              four (P-232 FLEX REV 4, the restore, the pager, the preseason heading)
PRODUCT     : Football-Sim-Z-post-blue-w65.html · md5 948f789da6d3ccf064104212ec748f3a ·
              1,741,540 bytes (w64 1,716,179 → +25,361 via the NINE-step asserted chain
              zpb_w65.py → b → c → d → e → f → g → h → i; every step asserts the
              previous md5, exact anchors, and post-checks; the w64 baseline byte is
              pinned md5 8b601f06ad2938960a636f53e709148d)
LAWS ADDED  : THE UNIVERSAL BACK TO SEASON (a glowing team-ink door at the TOP and the
              BOTTOM of every page with a live season — roster, compare, 100 seasons,
              every footer page; the bottom bar hides on the season tab itself) · THE
              HEADER SIM DOORS (SIM GAME + SIM SEASON ride the tab row at ONE size — the
              SIM GAME size, align-self keeps the tall tabs from stretching them; the
              doors follow the phase: SIM SEASON only while phase==='regular' — never on
              the Super Bowl review; SIM PLAYOFFS playoffs-only) · THE COMPARISON TAB
              REBUILT (one header panel copied from the footer page: two pill dropdowns
              + the X vs Y score between; ≤760px the score takes its own centered line
              FIRST — both surfaces share the law; the huge filters panel retired) ·
              THE HONEST RESTORE (boot with a save in slot A → a RESTORE SAVED SEASON
              chip in the team ink; the envelope carries the draft pickRounds; w63-era
              saves restore too) · THE PAGER UN-HIDDEN (an old display:none law killed
              it; PREV · PAGE X OF 20 · NEXT lives) · ALL TEAMS / ALL POSITIONS / SEARCH
              PLAYER NAME (the dot face replaced; no ellipses) · THE DISPLAYED WEIGHTS =
              CLAUDE'S de60e05 TABLE (Position Rankings buttons, the Guide tier viz +
              per-slot table, the MODEL preset; 1 unit = 0.00254 wins over 70→90) ·
              THE FLEX TABLE IS REV 4 (P-232 closed: QB flexes ONLY to FS -10; the
              auto-fill obeys the flex table too — no flat -9) · THE DEPTH BEATS 0.12s
              (fade .3s; the formation map keeps its 1s law; the 90+ escape-hatch floor
              retired — fillers land right after the drafted beats) · THE ST PANE
              LEFT-ALIGNED (grid like O/D, the horizontal lines back) · THE FOOTER SITS
              IN FLOW (the sticky thumb-reach law retired; real margins around it) ·
              THE PREGAME MARQUEE SITS LOW (≤600px: the logos + key players clear the
              header lines) · THE SIM PLAYOFFS WARNING (the A9 format, YES-first, gated
              on your team being alive) · THE SEASON REVIEW PANEL (no arrow, centered,
              glowing, its own panel; the SB review never offers SIM SEASON; the review
              door always lands on the review page — even after the 100 seasons) · THE
              DRAFT BOARD BAR IS DEAD IN EVERY THEME (scoped #draftTable2) · the
              roster-locked sentence and the empty Week-1 stats panel retired · START
              PRESEASON rides the bottom of the post-draft page · the 100-seasons hero
              + badge row wear the advanced badges (12+ win seasons, playoff trips that
              became titles, turnovers per game, sacks per game)
BATTERIES   : 205/205 on the shipped bytes — nodecheck 19/19 · w65_round 59/59 (NEW:
              the 25-item round, probe-first) · verify 13/13 · mobile 41/41 · live 7/7 ·
              storage 7/7 · sweep 13/13 · cine 27/27 · owner 19/19
LANE        : local work/w65 in the sandbox; nothing committed (no git credentials)
QUEUE       : EMPTY — all three rounds shipped whole
LEDGER TAIL : notes/W65-INTAKE-LEDGER.md — the flagged interpretations (Owner-approved
              by silence): "move the footer down" = unstick + real margins · the depth
              speed = the per-beat cadence (the map's 1s law stands) · the Week-1 stats
              gate = zero GAMES PLAYED (returns Week 2+) · the playoffs warning = your
              team alive in the bracket · the 100-season badges = the four the
              aggregate carries (PA/g and the point swing are NOT in the aggregate —
              say the word and the aggregate grows)
LAST ZIP    : z-post-blue-wave65-2026-11-04-w65.zip
NEXT ACTION : whatever the Owner sends next; watch the w65 visual checks caught THREE
              late defects (a comment living inside a template literal rendered as page
              text, the sim-tabs host stretching SIM GAME, the tab line stretching SIM
              SEASON) — trust screenshots over green checks
WORKFLOW    : THIS doc + END-OF-CHAT-ZAI.md + ZAI.md define the loop (REV 20 → REV 21:
              §3 rewritten; §0's standing laws carry unchanged)
```

'''
start = start[:i0] + NEW_S3 + start[i1:]
open(PKG + '/_agents/zai/START-OF-CHAT-ZAI.md', 'w', encoding='utf-8').write(start)
print('START-OF-CHAT REV 21 written')

# ---- END-OF-CHAT ----
end = '''# END OF CHAT — Z.ai · wave 65 · 2026-11-04

## 1 · The zip
`z-post-blue-wave65-2026-11-04-w65.zip` — handed to the chat's download area; the Owner relays it (or Beam: `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/2026-11-04-w65/` on `council/zai`).

## 2 · The receipt
- PRODUCT · `Football-Sim-Z-post-blue-w65.html` · md5 `948f789da6d3ccf064104212ec748f3a` · 1,741,540 bytes
- BASELINE · the w64 bytes `8b601f06ad2938960a636f53e709148d` (gh-pages) → NINE asserted generators (zpb_w65.py → zpb_w65i.py)
- ROUNDS · the Owner's 25-item UI/UX list (every item landed) + Claude's de60e05 weight sync (the displayed values: rankings buttons, the Guide viz + table, the MODEL preset) + the Muse w64 QA four (P-232 FLEX REV 4 closed, the honest restore, the pager un-hidden, the preseason heading tested — NOT reproduced, evidence in the ledger)
- BATTERIES · 205/205 — nodecheck 19 · round 59 (new) · verify 13 · mobile 41 · live 7 · storage 7 · sweep 13 · cine 27 · owner 19
- EVIDENCE · `shots/` — the header doors (one size, one line), the compare tab at 390 (the score on its own line), the pregame logos clear of the lines, the restore chip, the post-draft page (no roster-locked line, START PRESEASON), the draft board, the 100-seasons badges + glowing door
- LANE · START-OF-CHAT REV 21 + ZAI.md + this file — all inside the zip under `_agents/zai/`

## 3 · What the next chat must know (one line)
w65 is the newest product — the universal glowing BACK TO SEASON (top + bottom of every page), the header SIM GAME/SIM SEASON doors at one small size on the tab row, the comparison tab rebuilt like the footer page (pills + the X vs Y score on its own line on phones), the honest RESTORE SAVED SEASON chip, the FLEX table at REV 4 (P-232 closed), the displayed weights at Claude's de60e05 table, the depth chart at 0.12s beats — 205/205 green, nine generators re-run clean.

## 4 · Unpushed
Everything (the sandbox cannot push). The zip is the push.
'''
open(PKG + '/_agents/zai/END-OF-CHAT-ZAI.md', 'w', encoding='utf-8').write(end)
print('END-OF-CHAT written')

# ---- ZAI.md ----
zai = '''# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git credentials — the zip is the push. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 57; the per-wave live batteries (w46..w65); the halfway-ink law; the w61 measurement method (live rect sweeps); the w62 merge proofs; the w63 double round; **the w65 triple round — 25 Owner UI items + a weight sync + a QA round in one nine-step asserted chain, with the visual check catching three late defects the green checks missed**

## Current work
- **Wave 65 SHIPPED (2026-11-04):**
  1. **THE OWNER'S 25-ITEM UI/UX ROUND** — the homepage Draft button keeps its air (above the dropdowns, off the footer) · the footer sits in flow, pushed down (the sticky law retired) · the universal glowing BACK TO SEASON at the top and bottom of every page with a season · the header SIM GAME + SIM SEASON doors at one small size on the tab row (phase-gated) · the depth chart fades at 0.12s a beat (the 90+ floor retired) · the ST pane left-aligned like O/D with its lines back · the comparison tab rebuilt (pills + the X vs Y score, its own line on phones, both surfaces) · the dropdowns matched at the bigger pill size · the Player browser reads ALL TEAMS / ALL POSITIONS / SEARCH PLAYER NAME (the dot gone) · the draft board's first-letter bar dead in every theme · the roster-locked sentence gone · START PRESEASON copied to the bottom · the Season stats panel leaves the Week 1 preview (returns once a game is played) · the pregame logos + key players sit low (≤600px) · the SIM PLAYOFFS warning page (A9 format, your-team-in gate) · no SIM SEASON on the SB review · the SEASON REVIEW button: no arrow, centered, glowing, its own panel · the Season Review glitch pinned (lands on the review page even after the 100 seasons) · the 100-seasons badges + the glowing team-ink door.
  2. **CLAUDE'S WEIGHT SYNC (de60e05)** — the SLOTS table (WR1 525 · WR2 295 · TE1 295 · DT1 410 …), RATING_SPECS.rec (WR2 .70 · WR3 .45), PLAN_K.defPredict 0.15 — reflected everywhere the weights are DISPLAYED: the Position Rankings buttons, the Guide tier viz + per-slot table, the MODEL preset. The engine math untouched (the Owner said it need not follow).
  3. **THE MUSE QA FOUR** — P-232 CLOSED (the embedded FLEX table is REV 4 verbatim: QB only → FS -10; the auto-fill obeys the flex table — no flat -9) · the honest RESTORE SAVED SEASON chip (slot A + the draft envelope; w63-era saves restore) · the pager un-hidden (an old display:none law was killing it) · the preseason heading TESTED — reads the drafted team (Las Vegas Raiders), NOT reproduced; evidence in the ledger.
  4. **BATTERIES 205/205** on the shipped bytes (nine suites; the new w65_round battery encodes the 25 items).
- **The visual-check lesson:** three late defects were invisible to the green checks — a w65 comment inside a template literal rendered as page text (pushed SIM SEASON onto its own line), the sim-tabs host stretching SIM GAME to the tab height, the tab line stretching SIM SEASON after the fix. Screenshot every fixed surface before shipping.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 21 (§3), then the w65 INTAKE LEDGER + BUILD REPORT.
- **The chain:** `zpb_w65.py` → `zpb_w65b.py` → … → `zpb_w65i.py` (nine steps, w64 → w65). Each asserts the previous md5; run in order; never hand-edit.
- **Watch for:** `seasonState` is a top-level `let` (read bare inside try/catch) · the w55 restore stays the LAST body script · comments NEVER live inside template literals (w65 step 8) · flex children in `.tabs` stretch — the sim doors carry `align-self:center` (w65 step 9) · the graphical render100 (line ~3848) is the one that runs; the text report at ~10860 is not reachable from the tabs.
- **Do not redo:** the w50–w64 laws; the one-ink laws; the merge proofs; the w65 comparison-tab rebuild (the footer page's pattern is the law now).

## The batteries
- `w65_nodecheck` 19/19 · `w65_round` 59/59 (the 25 items) · `w65_verify` 13/13 · `w65_mobile` 41/41 · `w65_live` 7/7 · `w65_storage` 7/7 · `w65_sweep` 13/13 · `w65_cine` 27/27 · `w65_owner` 19/19.

## Files in this lane
- `deliveries/` Z.ai's documents · `tools/` build scripts + verify suites · `builds/` the two baseline HTMLs · `notes/` prompts, corrections, worklog
- gh-pages carries the Owner's pushes (w56–w64) and w65 when he relays this zip.
'''
open(PKG + '/_agents/zai/ZAI.md', 'w', encoding='utf-8').write(zai)
print('ZAI.md written')

# ---- UPDATE-README ----
readme = '''# UPDATE README — wave 65 · the Owner's UI/UX round + Claude's weights + the Muse QA

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
'''
open(PKG + '/UPDATE-README-w65.md', 'w', encoding='utf-8').write(readme)
print('UPDATE-README written')

# ---- BUILD REPORT ----
report = '''# W65 BUILD REPORT — the chain, the probes, the three late visual catches

## The chain (every step asserts the previous md5 + exact anchors + post-checks)

| Step | Script | Round | Delta |
|---|---|---|---|
| baseline | `Football-Sim-Z-post-blue-w64.html` | the w64 bytes from gh-pages | md5 `8b601f06ad2938960a636f53e709148d` · 1,716,179 B |
| 1 | `zpb_w65.py` | the direct replacements + the weight tables + the FLEX REV 4 + the comparison rebuild + the doors + the browser faces + the board bar + the footer flow + the pregame law | +23,646 B |
| 2 | `zpb_w65b.py` | the payloads: the universal BACK TO SEASON, the top doors, the restore chip, the comparison header panel, the 100-seasons door | (chain total +24,666 B after step 3) |
| 3 | `zpb_w65c.py` | the autosave envelope v2 (the draft pickRounds ride; w63-era saves restore) | |
| 4 | `zpb_w65d.py` | the restore fallback fix (a fresh reload has no `#draftResultsBody` — the restore no longer wipes the app shell) | |
| 5 | `zpb_w65e.py` | the comparison template's selects, the roster top door, the header doors' phase sync | |
| 6 | `zpb_w65f.py` | the depth zones' seen-gate beat (1s → 0.12s), the review cards, SIM SEASON off the big-ID law, the graphical hero badges | md5 `815462…` · 1,740,845 B |
| 7 | `zpb_w65g.py` | the sim-tabs host stops stretching, the hero2 class on the graphical hero, the badge row natively, the 90+ floor retired | 1,741,377 B |
| 8 | `zpb_w65h.py` | the w65 comment out of the template literal (it rendered as page text) | 1,741,378 B |
| 9 | `zpb_w65i.py` | `align-self:center` — the tall tabs stopped stretching SIM SEASON | md5 `948f789da6d3ccf064104212ec748f3a` · 1,741,540 B |

## The probes that found what the checks missed

- **H3 (the doors' size):** the first measurement [42,35] — the `zpb-simtabs` host (inline-flex) stretched SIM GAME to the 42px tab height while SIM SEASON sat at 35. Fix 1: `align-items:center` on the host. The next measurement [35,42] — with the leaked comment gone the row fit one line and the TALL TABS stretched SIM SEASON instead. Fix 2: `.tabs > .zpb-ctasmall{align-self:center}`. Final: [35,35].
- **L1 (the hero badges):** the step-6 patch landed on the graphical render100 — a probe proved the graphical one is what runs, but its hero carried only the `zpb-100hero` class, so the battery's `.zpb-100hero2` query was null. The class joined; the badge row (zpb100More) also gained the set natively and the step-e monkey-patch retired (it would have doubled two badges).
- **F1 (the depth speed):** the 15.4s tail delay was the 90+ escape-hatch beats (undrafted fillers) — w64's floor against the new 0.12s clock. The floor retired; the battery check now measures the cadence honestly (0.12s a beat vs the w64 1s law = 0.88s faster per row).
- **The Muse #4 path:** re-played exactly (draft as the Raiders → preseason): the heading read the Raiders and agreed with the roster panel and the season state. Not reproduced; evidence in the ledger.
- **The visual catches:** the step-8 comment leak (a `// w65` comment inside a template literal rendered as page text under the tab row and wrapped SIM SEASON onto its own line) — found by reading the screenshot, not by any check.

## The weight sync (de60e05, read from the architect branch)

- SLOTS: QB 1000 anchor · WR1 525 · DE1 520 · OT1 430 · CB1 430 · DT1 410 · DE2 405 · OT2 400 · CB2 340 · C 320 · WR2 295 · TE1 295 · OG1/OG2 290 · DT2 305 · CB3 280 · MIKE 265 · FS 265 · SS 265 · WILL 245 · RB1 235 · K 200 · WR3 180 · DL5 145 · P 100 · RB2 80 · TE2 60 · DIME 40 · FB 30 · SAM 35 · TE3 10 · WR4 10 (+ depth spots).
- RATING_SPECS.rec: WR2 .70 · WR3 .45 · PLAN_K.defPredict 0.15.
- Displayed: the Position Rankings buttons (wins over 70→90), the Guide tier viz + per-slot table, the MODEL preset (QB 700 · WR1 370 · TE1 205 …).
- NOT touched: the engine math (the Owner: "your actual engine and during the game screen don't have to function perfectly off these weights").

## The batteries — 205/205 on the shipped bytes

nodecheck 19 · round 59 · verify 13 · mobile 41 · live 7 · storage 7 · sweep 13 · cine 27 · owner 19.
'''
open(PKG + '/notes/W65-BUILD-REPORT.md', 'w', encoding='utf-8').write(report)
print('BUILD REPORT written')

# ---- CHECKSUMS ----
base_md5 = hashlib.md5(open('/home/z/my-project/work/w65/baseline-w64.html', 'rb').read()).hexdigest()
lines = [f'{md5}  Football-Sim-Z-post-blue-w65.html', '', '# lineage pins',
         f'{base_md5}  Football-Sim-Z-post-blue-w64.html (the baseline)',
         '88cfe4126168fc609859106c36e0c1ba  stage-5 (the w65 round on w64, steps 1-6)',
         '8154627340b6e21246ca471630745c5b  stage-6 (steps 1-6 complete)']
open(PKG + '/CHECKSUMS.txt', 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('CHECKSUMS written')

# ---- zip ----
zpath = '/home/z/my-project/download/z-post-blue-wave65-2026-11-04-w65.zip'
os.makedirs('/home/z/my-project/download', exist_ok=True)
if os.path.exists(zpath):
    os.remove(zpath)
with zipfile.ZipFile(zpath, 'w', zipfile.ZIP_DEFLATED) as z:
    for root, dirs, files in os.walk(PKG):
        for f in sorted(files):
            full = os.path.join(root, f)
            rel = os.path.relpath(full, os.path.dirname(PKG))
            z.write(full, rel)
zh = hashlib.md5(open(zpath, 'rb').read()).hexdigest()
print(f'zip: {zpath} · md5 {zh} · {os.path.getsize(zpath):,} bytes')

# ---- loose HTML in the download area ----
shutil.copy(HTML, '/home/z/my-project/download/Football-Sim-Z-post-blue-w65.html')
print('loose HTML in download/')
