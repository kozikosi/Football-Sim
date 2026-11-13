SPEAKER: zai | ROLE: High Councillor · Executor | TASK: D.6 — the clutch visual (my singled-out job) | DATE: 2026-11-13T22:20Z
FOR: P-345 · the Owner (this one is aimed at your eyes, not the council's)

**Position in one sentence (INFERRED, sketch):** clutch time should feel like the broadcast's two-minute graphic — **the game strip contracts to a single heartbeat line, everything else fades, and the things that actually decide the game (win probability, the opposition's one move, your two-way card, the big-penalty narration) rise to the top of the screen** — an *experience* change (layout + pace + emphasis), not more text.

## The sketch (what the user SEES in the final 5:00 of Q4 + all of OT)

```
┌──────────────────────────────────────────────────────────────┐
│  4TH · 2:41 · BAL 20 ─── KC 23          ● WIN PROBABILITY   │
│  ▁▁▂▃▅▆▇████▇▆▅▆▇█  ← the last 10 drives as a pulse line     │
│  ── CLUTCH ────────────────────────────────────────────────  │
│  KC ball, 3rd-and-4 at the BAL 41                            │
│  ▸ their call: 62% pass-heavy posture (their focus shifted)  │
│  ▸ your 2-WAY card: HAIL-MARY READY · press to stage WR1     │
│  ▸ LAST EVENT: holding, defense — 10 yds, automatic replay   │
└──────────────────────────────────────────────────────────────┘
   [everything below this line dims to 30%: box score, stats, feed]
```

1. **The heartbeat line** — win probability as a pulse strip across the top, one glyph per drive, the current mark pulsing once per second (CSS only, no engine cost). This is the ONE new number-adjacent element; it is the *game's* probability, not a per-player clutch metric (the Owner refused per-player clutch metrics — respected: nothing here attributes clutchness to a player).
2. **The contraction** — every panel below the strip (box score, stats, the feed) dims to ~30% and stops updating live; clutch is not the time to read a box score. One click restores them (the user is never trapped).
3. **The opposition's move, stated plainly** — one line: their posture/focus read and what it implies (the D.1 focus machinery, surfaced as one sentence: "they've gone pass-heavy — expect the deep shot"). This is the "better visual experience" the Owner asked everyone for: the drama of clutch is knowing what the opponent is about to try.
4. **The two-way moment (Ruling 5 interplay — stated explicitly as required):** the clutch visual is the natural HOST of the cross-side-star event — the "2-WAY" badge appears ON the clutch card as a stageable action ("HAIL-MARY READY — press to stage WR1 on defense"), only in the final 5:00/OT windows the ruling names. The pairing is load-bearing in BOTH directions: the ruling needs a place for the badge to live, and the clutch card needs an action to make it more than a read-only graphic. If the council rejects the pairing, the clutch card still ships — the badge simply lives wherever the two-way mechanism lands.
5. **The P-354 big-penalty narration pairing:** big penalties in the clutch replay in the strip's event line (LAST EVENT) with the automatic-replay tag — the narration engine's clutch branches render INTO the strip instead of a toast, so the penalty story and the probability pulse share one visual thread instead of two competing ones.

## What it is NOT

- Not more text (the ruling says a *better visual experience* — the sketch removes live panels from view during clutch).
- Not a win-probability product surface elsewhere (the strip exists ONLY in the clutch window; the rest of the game shows scores — the W-L-from-simulation honesty stays).
- Not a build: this is the mock-up the dynamic-engine prompt asked for ("a filing with a mock-up, not a build").

## Receipt

- The design cost is honest: the strip needs win probability per drive — the engine computes it (the margin machinery) but does not currently EMIT per-drive series; the receipt is one field in the game output (`wpSeries[]`), an Architect-line item, named not approximated. The visual itself is CSS + one emission.
- The test (is it better?): the only honest instrument is the Owner's eyes on a seeded two-minute drill — propose one shipped seed ("the 2026-11-13 clutch demo seed") with a fixed box that reaches 4th-and-2 inside the final 2:00, so you see the sketch on a real screen in one click. Named, cheap, and the demo seed doubles as a regression artifact for the narration.

## Failure mode

- **Sensory overload → user disables it.** Guard: the strip is one row tall and everything it adds is dismissible; if the Owner's playtest says "too much", the first thing to cut is the opposition-posture line, the last is the pulse.
- **The gambling-feel trap:** a pulsing probability bar can read like a sportsbook. Guard: no percentages printed — the pulse is shape, not number (the user who wants the number gets it from Wins on the board, not from clutch chrome).

## The Owner-question it carries

Do you want the **pulse without a number** (my default — drama, no sportsbook feel) or **the number printed** (62% in the corner — information-first)? Consequence of my default being wrong: the user feels momentum but cannot verify it; consequence of the other: the screen carries a second live number in clutch, which the consistency ruling then has to explain.

Cross-references: Ruling 5 (the 2-WAY badge host — interaction stated in §4), D.1 (the posture line is the focus machinery surfaced), P-354 (the narration pairing), PD.2 (no new user-facing metric).
