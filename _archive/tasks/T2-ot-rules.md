# T2 — Overtime: rules-accurate events + end-of-game narration

> STATUS after Oct 19 v10 edit batch: the OT checks are largely DONE — OT events render in their own Overtime block, the dramatic walk-off paragraph moves to Overtime for OT games, `sudden death` copy is gone, and the OT-tail rule text now matches the score type (first-possession TD walk-off vs. answered FG). Line numbers have drifted a few lines. This packet is now a VERIFICATION pass: simulate many OT games (force overtime by rigging two even rosters), confirm the four checks below still hold, and implement only what fails.

Goal: (a) OT scoring appears in its own "Overtime" subsection, never inside the 4th-quarter list; (b) no "sudden death" copy — current NFL OT possession rules in both wording and event structure, at minimum for the recap text; (c) walk-off credits the actual scorer.

File: `NFL Draft Simulator.html`. Contact points (verified):
- OT event created at ~line 2216–2222 (`otAdd` push, `q:5`).
- Recap timeline: `playByPlay()` (~2929–3002) groups events by quarter — ensure `e.q>=5` items render ONLY in the OT block.
- `dramaticEnding()` (~2767–2825): the phrase `"sudden death, and that was the end of it."` (line ~2813). Replace with rule-accurate narration:
  - Walk-off TD on the opening possession: `…and the touchdown on the opening drive of overtime ends it — the opponent never gets a possession.`
  - First-possession FG (playoffs): the other team must possess; note `both teams get a possession unless a touchdown ends it first` and if the second team answers with a FG, continuation is procedural — for the current event granularity, cap the sim at "second possession decides or keeps playing" unless extended below.
  - Regular-season OT first-minute nuance can be summarized as: `in the regular season overtime is 10 minutes, everybody plays to win`.
- Optional engine step (do it ONLY if the packet-within-time budget allows, otherwise record as future): make OT two-possession structured events — possession 1 by the receiving team (FG → opponent possession: TD wins / FG → continue one more possession / turnover-or-punt → game continues), possession-TD ends it. This is a bounded extension of the `otAdd` coin flip: replace `add = Math.random()<0.35 ? 7 : 3` with a small possession ladder feeding the SAME event shape (`{pts, type, q:5, t:…}`), keeping totals consistent with step 6's invariant.

Steps:
1. `playByPlay`: quarter labels — verify q>=5 events go into an "Overtime:" block; if they currently merge into Q4, split them. Output order: Q1..Q4 bullets, then Overtime bullets, then the dramaticEnding paragraph.
2. `dramaticEnding`: rewrite the two lines quoted above; delete the phrase "sudden death" globally (grep it — there is exactly one narration use).
3. If walk-off was a TD: name the actual scorer. The event pushed at 2222 does not carry a scorer yet; add `scorer` hydration: when the detail pass builds `tdScorers` for that team, bind the last-years event to the last entry (OT TD is the last TD event). Then `dramaticEnding` reads `last.scorer` first, before the `hashPick` fallback that can name the wrong player.
4. Score consistency: after your changes re-run the invariant test (§6 of MASTER_GUIDE): events sum ≡ final for 100 piped games.
5. Done-when: at 390px and desktop, `Overtime:` subsection holds only OT events; no "sudden death" anywhere; walk-off names a real scorer of the winning side; a 0–0→OT game renders sanely.

Do NOT touch: `realisticScore` snapping (separate known ticket), standings, weights.
