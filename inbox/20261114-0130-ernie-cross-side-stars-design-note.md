SPEAKER: ernie | ROLE: council | TASK: Phase 5 — cross-side stars design note (independent of beam's) | DATE: 2026-11-14T01:30Z
FOR: P-345

Beam filed the design from the Owner's ruling. This is a **second, independent note** with a different angle: not "what it should do" (settled by the Owner) but **where the numbers come from, how it stays deterministic, and one inconsistency the rule creates with an existing ruling**. No engine edits proposed for me to make; nothing here touches protected constants.

## Owner's ruling (verbatim, as carried)
> "All players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime. ideally there is also a visual indicator to the user that the coach made a decision to play someone on both sides for one play. for example, i can see a top wide receiver coming in to defend a hail mary at the end of the game and getting an interception."

## 1 · The price must come from `FLEX`, not from a new constant (design constraint)

The rule says "-6 or less penalty in a position at the other side of the ball". **The engine already has that number per player-slot pair**: `flexPenaltyFor` / `effOvr` (AGENTS.md §9 finding code), driven by the 99-rule `FLEX` table. So:

- **Do not add a cross-side constant.** Read the existing penalty. "≤ -6" is a *filter over the flex table*, and the 99 rules already price every pair (0 / 2 / 6 / 12, plus the cross-side floor at −6 for WR>CB/DIME/FS/NICKEL/SS).
- **This makes the feature automatically consistent with flex.** If the Owner later changes a flex price, the set of players eligible to appear on the other side changes with it, with no second edit. Two sources of truth for one number is how these features rot.
- **Consequence, stated plainly:** the eligibility set is exactly "pairs priced at −6 or below". Players whose opposite-side penalty is −2 or 0 are **more** eligible than the rule's minimum, which is the right reading of "−6 or less".

## 2 · The inconsistency the rule creates (flagging, not deciding)

Owner ruling REV 4 (29 Oct): **a QB may flex only to FS, at −10.** The new rule says any player with **−6 or less** at an opposite-side position can appear there in clutch/OT. A QB at FS is **−10**, which is *worse* than −6, so under a literal reading **a QB can never be the cross-side player** — even though the QB→FS flex is the one cross-side path the Owner has already blessed.

Two readings, and they disagree:
- **(a) Literal:** "−6 or less penalty" = "penalty ≤ −6" = at most −6, so −10 is excluded. QB→FS stays the only QB path, and it is a *flex* path, not a cross-side one. Consistent with REV 4 by accident.
- **(b) Directional:** the Owner means "a penalty no worse than −6", i.e. **penalty ≥ −6**, which would *include* −10 and let a QB play a defensive snap in OT.

I am **not** choosing. I am flagging it because the two readings produce different player sets, and because the phrase "−6 or less" is ambiguous between "−6 magnitude or less" and "−6 or lower on the number line". **The Architect should pick one and write it into the rule text**, or the implementation will pick one silently.

## 3 · Determinism: this feature must be in the keyed RNG stream

- AGENTS.md §3: the product has **no injectable RNG** yet (56–58 `Math.random()` sites, no seed) — task `T-20261022-claude-2`. A cross-side appearance is a *random* event, so **it must be drawn from the keyed, counter-based stream**, never from ambient `Math.random()`, or replays will diverge and no before/after measurement of this feature will ever be repeatable.
- Concretely: the roll should be keyed by something stable and specific to the play — `(gameId, driveIndex, playIndex, playerId)` is the shape that survives a re-simulation and does not shift when an unrelated earlier play changes. A key derived from a mutable counter would make the whole feature non-reproducible under any upstream change.
- **Test that would actually prove it:** same seed + same state → identical set of cross-side appearances, twice, plus a determinism replay that includes the appearance in the compared tuple (the existing purity test compares `{h, aw, n, ev}`; the cross-side flag belongs in that tuple).

## 4 · Scope: "one play", and what that forbids

- The appearance is **one play**, not a possession and not a series. The engine must record it as an event with the play index so the recap can show it once.
- It must **not** mutate the player's depth-chart slot, must **not** persist into the next game, and must **not** be offered as a lineup choice. It is an *emission*, not a *state change*. This is the same rule the engine already follows for advice-only behaviour (`adviseLineup` — advice, never an auto-lineup).
- **Save compatibility:** because it is not a state change, it adds nothing to the save envelope. If an implementation makes it stateful, that is a save-format change and needs the versioning path (`envelope.ts`) plus a migration — which is a much bigger change than the feature.

## 5 · The event contract the UI needs (so the engine does not leak display)

Engine emits; UI renders "2-WAY". Minimum fields on the event:

```
{ playIndex, playerId, name, fromPosition, toPosition, penaltyAtTo, window: 'clutch' | 'ot', succeeded: boolean }
```

- `succeeded` matters because the Owner said "can randomly pop up" — the *failed* roll is invisible to the user, but the recap needs to know whether a 2-WAY appearance happened on that play at all.
- The **label "2-WAY"** is the Owner's word; use it verbatim (AGENTS.md style: plain informative language, user's words). The UI renders it on the play in the game report/recap. No emoji, no new terminology.
- Keep `penaltyAtTo` in the event even though it is not displayed — it is how a test proves the −6 filter was applied to the right pair.

## 6 · What this is NOT

- Not a new flex rule, not a new price, not a new constant.
- Not a permanent position change; not a lineup option.
- Not available outside clutch/OT.
- Not a guarantee — it is a roll.
- Not something I can measure in the framework fixture. **The fwtest fixture has no game state beyond a single pregame/halftime/final flow and no clutch/OT window with a cross-side candidate**, so the 12-item realism list and this feature are **engine-side work**; the framework test cannot rank them (see my `fwtest9-evaluation` §"no signal" rows).

## VERDICT

Design note filed, **no code proposed for me to apply** (the Architect builds). One decision is put to the Architect/Owner: the **−6 direction ambiguity** (§2), because it changes the eligible player set and interacts with QB→FS at −10. One engineering constraint is put on the record: **keyed RNG, event not state** (§3–4), or the feature will be unreproducible and will cost a save migration.

Labels: **VERIFIED** — the flex/penalty/`adviseLineup`/RNG facts, all from AGENTS.md §3/§9 and the rulings quoted. **INFERRED** — the keying shape and the event fields (design reasoning, not measured). **UNKNOWN** — which reading of "−6 or less" the Owner intends; that is the one open question here.

*Filed by ERNIE (advisor) · 2026-11-14T01:30Z.*