# W73 INTAKE LEDGER — the Owner's directives, itemized

**Source:** Owner's message, received 2026-11-05 (chat) · **Form:** three draft-board asks + one season-review ask + the 551af1b contract-review assignment.
**Rule:** Owner's words are law verbatim. Nothing here is paraphrased into permission.

## Product asks (the shell build — Football-Sim-Z-post-blue-w73.html)

| # | Owner's words (verbatim) | My action |
|---|---|---|
| P1 | "On the draft board, The positions drop down menu is not in a good order. Please change the order of the positions in the list to the order the positions are listed in the depth chart. Obviously just TE; not TE2 and TE3" | `draftPosFilter2` options rebuilt in depth-chart first-appearance order: QB, RB, WR, TE, OT, OG, C, EDGE, DT, LB, CB, FS, SS, K. Depth chart order source: `DEPTH_CHART_GROUPS` (Offense QB,RB1,RB2,FB,WR1-4,TE1-3,OT1,OG1,C,OG2,OT2 → Defense DE1,DT1,DT2,DE2,DL5,MIKE,WILL,SAM,CB1,CB2,FS,SS,CB3 → ST K,P). Each filter group once (TE, never TE2/TE3). Values unchanged — the filter math still speaks WV_GROUPS. |
| P2 | "On the draft board, all the positions are highlighted initially which is good. But when a user clicks on one of the positions individually from a fully highlighted panel, then I want only that position group to be highlighted. if they then reclick that same button, all would become highlighted. This is different than if the user hits CLEAR first. and then selects one position group. if the user then selects that same position group, the ideally the rowo of buttons would go back to CLEAR. but if that's not possible and all position light back up again in this scenrio, that is fine" | Chip row state machine in the `draftChips` click handler + a `soloBase` memory on `draftUI` (`'all'`/`'none'`/null). Full board → click G → {G} alone; re-click G → full board. CLEAR → click G → {G}; re-click G → back to CLEAR (the Owner's ideal path — implemented, not the fallback). Mixed states toggle as before; ALL/CLEAR reset the memory. |
| P3 | "Also I would like a little bit of separation of ALL and CLEAR from the rest of the buttons and a slightly a different shape to both buttons so the user knows that those buttons are slightly different." | `.zpb-srutil` gets: 16px gap before ALL (5px between ALL and CLEAR), pill radius (999px vs the chips' 8px), transparent fill that gains the chip fill on hover, letter-spaced labels. Slightly different, never louder. |
| P4 | "I'd like to add one panel to the season review page that explains to the user what they could have done better. That highlights their worst position groups and worst players and they should try to improve those position groups next time. This should be based on OVR but also on their season performance. This should be done primarily visually, not through plaintext. Be creative and good luck." | New panel **THE FIX-IT BOARD** on the Season Review (one panel, right under the Unit Report Card). Two visual sections: (A) THE ROOMS BELOW THE LINE — the three units furthest under league average, drawn as drain gauges (fill away from the league tick), each wearing its OVR, rank and letter grade, with the season-proof stat in the tooltip. (B) THE SEASONS THAT HURT MOST — the three weakest contributors, each a card with two stacked bars on one scale: the OVR he arrived with vs the season tape he gave; the shortfall renders as a hatched band; the delta chip counts it; cards whose room is in section A wear the rose edge so the fix points at the room. Footer: THE NEXT DRAFT IS WHERE YOU FIX THIS. Numbers only where numbers are honest (integers); no white text; team-colored; one caption line per section, detail lives in tooltips. |

## Non-product ask (the answers track)

| # | Directive | My action |
|---|---|---|
| P5 | "Your next work: review the contracts in 551af1b and flag anything that's ambiguous, unbuildable, or inconsistent with your w72 answers. If the contracts are clean, you're clear to start the N1 drafts while Claude finishes the view models and slice." | `20261105-zai-contract-review-551af1b.md` — every contract in `core/app.ts` + `sports/nfl/app/appstate.ts` reviewed against the w72 answers (ADR-1..12), each flag carrying the seat-level consequence. Also reviews `core/saver.ts`, `core/envelope.ts`, `core/hash.ts` where they touch my §2/§3 storage design. |

## Read-back of the relayed context (Claude's 551af1b transcription) — noted, not re-derived

- Envelope: saveId/saveRevision/createdAt shipped now; datasetId dropped; SHA-256 replaced cyrb53; Kosi has posed the three discrepancies back to Claude — **the envelope is not frozen; I build against it as a moving target and say so in the review**.
- runCounter = run-it-back counter (schedule + SB host parity, never the game stream); determinism proven at every week cut.
- Saver: newest-wins per slot, stale-revision drops, bounded retries, saveStatus; localStorage v1; 250K chars at 0.4 ms median.
- Framework: Svelte 5 + Vite SPA confirmed by Kosi (matches my ADR-1).
- Hydration trust/re-derive list + corrupt-never-repaired rule — shapes my storage module when the Colors track reaches me.
- Kosi's calibration numbers (80 % playoffs / 25 % SB / 10 % title) and the real-names ruling (Claude's fictional-league fallback must be reconciled — flagged in the review, not ruled by me).

## Veto/precision flags

1. P2's "all the positions are highlighted initially which is good" — read as: the INITIAL state law is untouched (`newDraftUI` still lights all groups). Only click behavior changes.
2. P2's fallback ("all position light back up again in this scenario, that is fine") — the CLEAR→CLEAR return is implemented, so the fallback stays unused; noted so the Owner can ask for the fallback if he prefers it.
3. P1's "the depth chart" — the depth chart's FS/SS order (FS before SS) differs from the chip row's long-standing QB-first order (SS before FS, blessed w26). Only the dropdown was named; the chip row order is untouched.
4. P4's "one panel" — one panel, inserted once, in the shared review body, so it appears on both the regular-season review and the post-Super Bowl review.
