SPEAKER: pickle | ROLE: Council Adviser | TASK: P-345 | DATE: 2026-11-19 22:52 UTC
FOR: P-345
IDEA: implications + four new ideas for Cakepanz / the UI-UX shell around Claude's engine,
  grounded in the v3-sitting package bytes I verified while reviewing it (review:
  `inbox/20261119-2252-pickle-P-287-v3-sitting-review.md`). Advisory only — I edit no product,
  engine, pin or queue row. The Owner rules; the Architect builds.

## Disclosure and method

I applied the brainstorming discipline: think wide privately, drop weak ideas, keep the ones that
change a decision. Grounding came from commands I ran this session on `council/pickle` and the
hosted package (cited inline). Ideas are labelled INFERRED (reasoned from measured code) except
where a receipt is quoted. Existing ideas I am NOT repeating: Z.ai's next-five (seed, C′1 raw
rank, one-click, aria-describedby, tab labels) and my own B1–B5 / L1–L4. S5 below sharpens L3;
everything else is new.

## The one sentence behind all of this

The c10 repair (a manifest names a file the import dropped) and the C′1 ring (a display string is
parsed back as if it were a raw value) are the **same failure shape**: data loses fidelity crossing
a boundary, and nothing downstream notices. That is the lens for the ideas below.

---

## S1 — Make "suggestion" a first-class engine-view contract, not a component parse (INFERRED)

**Where the bug actually lives:** I read the pipeline this session. `view/draftBoard.ts:50` builds
each row with raw `_w`/`_p`; line 53 sorts on them; **line 61 strips them**
(`rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r)`). `DraftBoard.svelte:38–48` then has to
re-derive a ranking from display strings with
`Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, ''))` — so a `+0.0` tie rings all 60 rows.

**Idea:** stop making the component reconstruct value from text. Compute the suggestion set in the
engine view, where the raw values still exist, and return it as part of `BoardVM`:

```
suggestions: { ids: string[]; rankedBy: 'wins'|'priority'|'ovr'; cutoffRaw: number; reason: string }
```

The component renders `suggestions.ids` and shows `reason` as a tooltip/text. `port/seam.ts`
(re-exports `boardVM` at line 15, `EnginePort` at line 160) is the one seam to extend.

**Why this beats a one-line C′1 fix:** the one-liner fixes the ring but leaves the anti-pattern
intact — every future feature that ranks, compares or thresholds on the VM ("is this a reach?",
best-value-at-this-pick, awards preview, a "why am I seeing this?" hint) will reinvent the same
parse bug. One contract closes the whole class. It also gives the Owner's w89 preference a
measurable target (exactly 3 ids at a seeded state) and gives assistive tech a spoken reason —
the ring is currently a purely visual affordance with no explanation for anyone.

**Cost:** touches `view/draftBoard.ts` (under `src/engine/`), so Architect + re-pin. Bundle the
re-pin with the vite-major reconciliation and the `raw` export (I4).

## S2 — A property-based battery invariant that does not share the bug (INFERRED)

**The blind spot, verified this session:** `batteries/board.battery.mjs:52` computes its expected
order with `Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0` — the *same* rounded parse as
the component. The battery is tautological for C′1: it will never fail on a display-rounding tie
because it uses the identical rounding. This confirms Ernie's blind-spot finding with a line I
read myself.

**Idea:** add an invariant derived from raw values, not from either display string or the parsed
display:

```
at every seeded board state:
  suggestions.length === 3
  OR every suggested row's raw ranked value is within ε of the third row's raw value
```

Compute it from the raw values in S1's `suggestions` contract (or from `_w`/`_p` before the line-61
strip). This catches "the ring extended on rounded ties" even though the snapshot battery cannot.
It also documents the intended exception (real 1e-9-grid ties) instead of leaving it in a code
comment — the current comment at `DraftBoard.svelte:34–36` asserts the raw grid makes ties exact,
which is true of the engine but false of the VM the component receives.

**Why it matters beyond C′1:** any new ranking/filtering feature needs a raw-value invariant, not
snapshot parity against a display-derived expectation. This is the reusable test pattern.

## S3 — Turn the Owner's "as close to w89 as possible" into a seeded visual gate (INFERRED)

Z.ai's own unseeded run ringed 31 rows at pick 13 where Ernie's ringed 46 — the same state, two
answers, because `App.svelte:109` seeds from `Math.random()`. That is the proof the `?seed=` seam
(B1) is worth doing first. Once it lands, add a headless check at fixed seeds asserting the
structural w89 targets already measured in `w89-vs-cakepanz.md`: exactly 3 suggestions, a direct
Draft affordance on each, no horizontal scroll at 390 px, the four ALL-CAPS tab strings at
cutover. "Looks worse than w89" becomes a finite acceptance list; a regression that rings 60 rows
fails a gate instead of needing an Owner's eye. Cheap once B1 exists; impossible before it.

## S4 — One-click drafting with an explicit slot and a visible undo (INFERRED)

Z.ai measured the affordance gap: w89 drafts in **one** click (row's own glowing "Draft" button);
cakepanz costs **three** (expand row → "Draft at <slot>" chip → "Confirm the pick"). Copying w89's
one click verbatim is tempting but the three clicks exist for a reason: a player can fit several
slots (the flex chips), so "draft this player" is ambiguous for the shell.

**Idea:** keep one click but make the choice legible on the button — `Draft <name> at QB1` on each
of the three ringed rows — and keep `undo()` (`App.svelte:151`, which already dispatches UNDO and
autosaves) visible for one step after the pick. The Owner gets w89's speed; the shell does not
silently choose a slot for a corner-singularity or run-stopping plan; a mis-click is one tap to
undo. This is a product change (Architect) and does not touch the save system.

## S5 — Self-verifying shareables: sharpen L3 with the D1 lesson (extension of my L3)

`loadDraft(record, lineage)` already accepts `{ saveId?, createdAt? }` (`App.svelte:167`). Extend
that lineage in the share envelope with `{ seed, enginePin, checksum }` and verify on import the
way the c10 repair asks a host to verify its manifest — but make a failure **visible in the UI**
("this replay was generated with engine `4ca9a071`; you have `d3bd81d2` — results may differ")
instead of silent. The c10 defect was a verification boundary that was external to the importer;
the product's share path should own its verification. Seed + engine pin are the two facts that
make a replay reproducible, and both are already in the system's vocabulary.

## Implications (I1–I4)

- **I1 — a standing review lens.** "Data loses fidelity crossing a boundary" covers the c10 import,
  the engine→VM strip, save/restore hydration and share import. Any shell review should ask: what
  gets rounded, stripped or dropped at this boundary, and does anything downstream notice?
- **I2 — tests must not share their subject's derivation.** A battery built from the same parse as
  the component cannot falsify the component. Prefer invariants over semantic quantities.
- **I3 — convergence should be on affordances, not the whole shell.** w89's 6 flat tabs and 151-row
  table are a different information architecture; cakepanz's 14-screen rail and 60-row window carry
  the save system and season flow. Match the *three affordances* (3 suggestions, one-click Draft,
  short tab labels), not the frame — copying the frame loses functionality the Owner has already
  approved.
- **I4 — re-pin once, not three times.** S1, S2 and C′1's raw export all touch engine-view files.
  Bundle them with the vite-major (`^8`) pin reconciliation at cutover into a single Architect
  re-pin; three separate pins would be three chances to drift.

## Not proposed, deliberately

No product/engine edits by me (the fence); no framework work (Svelte 5 + Vite 8 is final); no vapor
track (falsified and receipted); no re-cut of c10 or any manifest regeneration. No claim that any
idea here is accepted — these are ADVISORY inputs for the Owner/Architect, not queue rows.

## Where I would start

S1 first: it is the seam that makes C′1, S2 and S3 cheap. B1 (`?seed=`) is independent and should
land in parallel because S3 depends on it. S4 and S5 are product-track items for cutover, not
blockers. All of it stays behind `port/seam.ts` and the Architect's re-pin.
