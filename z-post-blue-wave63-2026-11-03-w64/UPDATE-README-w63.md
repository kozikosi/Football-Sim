# UPDATE README — wave 63 · the QA round + the Owner's UI round, one build

**File:** `Football-Sim-Z-post-blue-w63.html` · md5 `8b601f06ad2938960a636f53e709148d` · 1,716,179 bytes
**Baseline:** the w62 bytes (`468e6883…`, your gh-pages push), asserted on every generator run. Two rounds merged: **Muse's QA five** (measured, then fixed) + **your UI list** (every item, in your words' order).

## Part 1 · Muse's QA findings — measured, then fixed

1. **P0 · the Player Browser froze on 1,200 players** — measured: 9,769 DOM nodes, the pager UI present but gutted (`PLAYER_PAGE_SIZE = 1000000`). Now **paginated: 60 a page** ("PAGE 1 OF 20 · SHOWING 1–60 OF 1200", ‹ PREV / NEXT ›) — 619 nodes, the page flies. Your later "player browser glitch" report is this same bug — re-tested green.
2. **P1 · the "PLAY THE X" pill appeared twice** — the w60 advance rail always showed when a CTA existed. Now the rail **steps aside while the real CTA is on screen** (a live rect gate + a scroll listener) and returns when you scroll past. The button is never twice.
3. **P1 · the first Draft click froze ~300-400 ms** — measured: one long task following a 1.88 MB board write. The board now **paints in ~20-row slices** (a generation guard kills stale chains). The worst long task fell 407 → 107 ms; the whole board still arrives.
4. **P1 · the season hub CTA** — the review's big pill said "SEASON" but went to *preseason*. It now reads **"START PRESEASON →"** with a hint line, and it **rides the advance rail** as you scroll the review. Unmissable, as asked.
5. **P1 · the autosave indicator** — nothing actually saved (only the tab/theme memories). Honest wiring, per your directive: the season state rides **ZPBStorage's versioned envelope into slot A** (kind week · schemaVersion 1 · engineVersion zpb-w63 · ~213 KB, write+verify <1 ms) on every season render (debounced 700 ms) — and a small **"AUTOSAVED ✓"** chip in your team's ink confirms each save. Save-only: the restore/Continue UI still waits for the Architect's E2 types, exactly as the standing guidance requires.

## Part 2 · Your UI round — every item

- **Hover:** a real styled tooltip — hover any crest or team cell and the team's name speaks in **Cinzel Decorative, the team's color, its 0.50 ink** (light/dark aware, touch devices skip it).
- **"…spot from a 70 to a 90" → "…position from a 70 to a 90"** — all three places.
- **No side scrolling on preview/review** — asserted zero pan at 390 across the whole flow (the standing sweep re-runs it at seven widths).
- **The 49/51 bar** now wraps to **its own line** on a phone — it never covers the team name.
- **The during-the-game panel stands tall from the pregame** (min-height 72vh) — the log scrolls inside; no more clash.
- **The results screens:** the "Week N Results" and round-results titles retire; **CONTINUE TO WEEK X takes the whole line**; **SIM SEASON / SIM PLAYOFFS move up beside YOUR ROSTER and TEAM COMPARISON** (the tab row) **and appear at the bottom of the page** (the footer pair's row) — the same treatment for the playoffs.
- **The season-in-badges panel never pans** — badge cards wrap tighter on a phone.
- **The awards stack: title, then the player, then the badges** — the 170px title column retires. The Coach of the Year name is now readable on a phone; your own COTY reads **YOU**.
- **The league leaders wear the player-card format on phones** — rank, name, rating and stat **badges** instead of the table (the draft-pick-grades standard you praised).
- **2-Pt conversions read "x / y"** — the word "OF" is gone.
- **The lineups dropdowns wear the name ladder**: full name if it fits, then the last name, then initials that are **always both (or three) — never one** (the ladder itself now guards the lone-initial case).
- **The badge fades run at least half a second faster** (the story cards, the depth chart, the review badges — the per-beat clock halved).
- **The Overall Grade table on the roster tab retires** — the draft-pick grade player cards take its place.
- **The team comparison tab works in season mode** (64 options populate, it renders, zero pan) — verified live.
- **Four skies for four rounds**: each game cine now plays under its own background — the quiet drift (regular season) → the swirl wakes (wild card + divisional) → gold storms in (the championship) → the full aurora with rotating gold rays (the Super Bowl). Reduced-motion freezes them.
- **Miami dark, "Try again to go 20-0?"** — the question reads the page ink; **contrast 11.79:1** on Miami dark (was far too dark).
- **Carry = CAR**; **YPR (yards per reception)** joined the RB/WR/TE stat chips and the guide.

## The batteries — 145/145 on the shipped bytes

nodecheck 18/18 · the Muse verify 13/13 · mobile 41/41 · desktop live 7/7 · storage 7/7 (the module's 25-check rig green inside the real page) · the six-view sweep 13/13 (1920→320, zero pan, zero '…') · the season-flow cine 27/27 · the owner round 19/19.

## In the package

- `Football-Sim-Z-post-blue-w63.html` — the product (also loose in the download area)
- `CHECKSUMS.txt` · `UPDATE-README-w63.md`
- `notes/W63-INTAKE-LEDGER.md` — both rounds, your words verbatim, interpretations flagged
- `notes/W63-BUILD-REPORT.md` — the measurements, the merge, the batteries
- `tools/` — the two generators (`zpb_w63.py` = the Muse round on w62; `zpb_w63b.py` = your round on that) + all eight batteries
- `shots/` — the evidence
- `_agents/zai/` — the refreshed lane (START-OF-CHAT REV 20, ZAI.md, END-OF-CHAT)

## Thresholds and flags, so you can veto with numbers

- The browser page size = **60** (your 50–100 range).
- The board slices = **20 rows/frame**; STEP is one number if you want it snappier or smoother.
- The autosave debounce = **700 ms**; the chip fades after 4.2 s.
- The autosave uses **slot A** — when the Continue/slot UI arrives (E2), it can read slot A as the autosave or we re-cut.
- The team tooltip follows crests and team cells; say the word if you want it on more surfaces.
