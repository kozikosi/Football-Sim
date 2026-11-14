SPEAKER: glyph | ROLE: seat (work/design) | TASK: P-354 — Big penalties + clutch narration (model + narration design) | DATE: 2026-11-14T05:25Z
FOR: P-354

# P-354: Big penalties + clutch narration — design proposal

**Owner decision (VERIFIED, 2026-11-11, `_agents/owner-notes/2026-11-11-penalties-big-and-clutch-verbatim.txt`):** routine/common penalties (holding, false start, offsides) **NOT modeled and NOT shown**. **BIG penalties ARE modeled** (headline: 40+ yard pass interference; accuracy to data nice, **pseudo-real acceptable**). **Clutch = final 5 minutes of 4th Q + OT** gets more play-by-play narration. In clutch, **show** big penalties to user: roughing the passer, pass interference, facemask, unsportsmanlike conduct, roughing the kicker, intentional grounding, game-changing holding, any 15+ yard penalty — whether modeled accurately or not. Amends P-344 "penalties OFF" (now routine off, big in, clutch-visible shown).

## 1) Big-penalty model (engine/probability layer)

### Scope
- **Modeled (can affect state/yardage/drive):** big penalties, especially DPI (incl. 40+ yd) and other 15+ yd / drive-changing fouls.
- **Not modeled, not shown:** holding (routine), false start, offsides, other common small penalties (declines/no-plays except as absorbed into noise — but per ruling keep them out of feed).

### Event types (enumeration for sim + narration)
`ROUGHING_PASSER`, `PASS_INTERFERENCE` (spot/yardage; flag `long_40plus`), `FACEMASK` (15), `UNSPORTSMANLIKE_CONDUCT` (15), `ROUGHING_KICKER` (15 + first down as applicable), `INTENTIONAL_GROUNDING` (spot+loss of down), `HOLDING_GAME_CHANGING` (clutch-eligible, 10 but "game-changing" tag), `OTHER_15_PLUS`. (Intentional grounding yardage can be modeled simply; accuracy secondary.)

### Rate & yardage (proposal, pseudo-real acceptable)
- **Baseline approach (INFERRED):** per-dropback/per-play hazard rates calibrated loosely to P-344 pbp eras if convenient (pbp has penalty flags/types; 40+ yd PI identifiable from yards/penalty data) but **not required** — Owner allows pseudo-real. Suggested starting points (tunable constants, not gates):
  - DPI: low single-digit % of pass attempts result in DPI; conditional on DPI, tail allows 40+ yd spot fouls (headline case) — e.g. `P(DPI|pass) ~ 0.8–1.5%`, `P(40+ | DPI) ~ small but nonzero` so it occurs memorably but rarely.
  - Roughing passer: rare per dropback (~0.2–0.4%), 15 yd + auto first.
  - Facemask/USC/roughing kicker/intentional grounding: very rare situational triggers (special teams/pass rush/pressure/endgame desperation) with fixed yardage.
  - "Game-changing holding": **clutch-only tag** on a modeled holding event with elevated narrative weight (see narration) — can be sampled only in clutch to satisfy "shown in clutch" without adding routine holding elsewhere.
- **Clutch modifier:** optional slight uplift in *narration visibility* (guarantee big calls are surfaced) rather than large rate distortion; keep game balance reasonable (pseudo-real). If modeled, apply same RNG/seed discipline as engine.
- **State effects:** apply standard enforcement (yards, automatic first down where applicable, loss of down for grounding, spot foul for DPI) to drive simulation so outcomes can change — "big penalties ARE modeled."

### Integration points (INFERRED)
- Play resolution step (pass rush/dropback, pass attempt, kick): sample penalty event; if triggered, override/augment play result (no gain + penalty yards, or gain nullified per type) and emit structured event for log.
- Ensure routine penalties produce **no event, no yardage, no text**.

## 2) Clutch narration surface

### Definition
- **Clutch window:** `game_seconds_remaining_in_4th <= 300` OR `overtime == true` (VERIFIED from Owner: "final 5 minutes of the 4th Quarter + overtime").

### Behavior
- **Density:** increase play-by-play verbosity in clutch (more lines per drive/play: formation/context, key matchups, clock/score leverage) — e.g. expand from summary lines to per-play or per-key-play narration templates.
- **Big penalties always shown in clutch:** if any of {roughing passer, PI, facemask, USC, roughing kicker, intentional grounding, game-changing holding, any 15+} occurs in clutch, emit a dedicated, prominent narration line (and include in recap/feed). Outside clutch, big penalties that are **modeled** may still be shown when they occur (realistic/exciting) — **INFERRED extension** consistent with "modeled"; Owner states "especially in the clutch" for visibility, minimum is clutch.
- **Content rules:** name the penalty plainly (e.g. "Pass interference", "Roughing the passer", "40-yard pass interference" when applicable), state yardage/impact ("15 yards, automatic first down"; "spot foul, 42 yards"). No routine penalties mentioned.
- **Tone:** plain informative language; no "sudden death" phrasing outside OT rules as applicable (project style).

### UI/feed (presentation)
- Clutch feed: chronological, highlighted badge for penalties/turning points; ensure 15+ yd / long DPI visually distinct (icon/tag) — integers/clear labels.
- Recap: include clutch big-penalty moments in key plays.

## 3) Measurement / calibration notes (optional, data-nice)
- P-344 pbp contains penalty fields; can estimate rates for DPI, roughing passer, 15+ yd, 40+ yd PI by season/regime for **calibration hints** (REPORTED available). Not required; pseudo-real acceptable. If used, document source and keep routine penalties excluded.

## 4) Risks / checks
- Balance: rare but impactful; validate they don’t dominate outcomes (sample sim, NOT RUN).
- Consistency with variant-D bar framing: product now includes big penalties (small expected delta vs pure penalties-off) — TS port should carry big-penalty model.
- Determinism: sample via keyed RNG consistent with engine.

Labels: VERIFIED (Owner decision). INFERRED (rates, integration, outside-clutch visibility). NOT RUN (no implementation/sim).
