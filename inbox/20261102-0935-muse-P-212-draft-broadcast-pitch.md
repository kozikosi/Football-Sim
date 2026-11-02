SPEAKER: MUSE | ROLE: Council Advisor | DATE: 2026-11-02T09:35:00Z

# PITCH: Draft night broadcast (for Z.ai / council)

FOR: P-212

**Origin:** Owner, 2026-11-02 (amused design session). "The draft night broadcast idea is good but seems difficult to create."
**Status:** pitch — not a work order. Z.ai to tackle if the council agrees.

## Concept

When the draft completes, the recap becomes a **broadcast**: a skippable cinematic replay of your draft night, in the visual language of a TV draft show — but rendered in the game's own grammar (team colors, shimmer, gold earned).

## The beats (in order)

1. **Cold open.** Team logo, gold shimmer sweep, "DRAFT RECAP." Two seconds, then it moves.
2. **Round-by-round reveal.** Picks surface in draft order. CPU picks flow past quickly (small, muted). *Your* picks get the hero treatment: the card blooms in team colors, 85+ OVR gets the shimmer. Each round is a chapter; the round header holds in Cinzel while its picks play.
3. **Steals & reaches.** The draft-grade logic names your three best-value picks (steals — gold accents) and your worst reach (muted, honest, one card — no piling on). This is the analysis beat; it's why the broadcast earns its runtime.
4. **The grade.** Your overall draft grade revealed large, with the shimmer treatment it earns. Then the bridge: "Can you go 20-0?" — and the season begins.

## Making the difficult shippable (phased)

- **Phase 1 — the reveal mechanic.** One new UI pattern: sequential card reveal with timing control. Everything else hangs off this. Shippable alone as "draft replay."
- **Phase 2 — steal/reach spotlight.** Needs per-pick value-vs-slot logic (the draft review already grades picks — reuse, don't reinvent).
- **Phase 3 — grade cinematic + 20-0 bridge.** The finale packaging.

## Hard requirements

- **Skip always.** Prominent, from the first frame. (Owner's standing rule.)
- **Reduced motion respected.** A stills version: same beats, no animation.
- **Data exists:** draft log, per-pick grades (draft review), player OVR — no new engine work.
- **Gold discipline:** shimmer on 85+, gold on steals and the grade. The reach card stays muted — gold is earned, even in a broadcast.
- **Length target:** 30–60 seconds total, matching the game-animation law (P-007).

## Open questions for Z.ai's design

1. Does the broadcast auto-play on draft completion, or does a "Watch the broadcast" pill offer it? (Recommend: offer, don't force — the Owner hates unskippable.)
2. Round chapters: all 26 rounds, or compress early rounds and linger on the first 10 picks?
3. Sound: none per the Owner's audio rule (playoff victories excepted) — the broadcast is silent by design.

## Evidence labels

- INFERRED: the phasing, the beat structure (design proposal)
- VERIFIED: the data dependencies exist (draft log, grades, OVR)
- REPORTED: none
