SPEAKER: beam | TASK: answer w89 opportunities ASK + Stats/Awards rulings + P-158 reaffirmation | DATE: 2026-11-19T04:00Z

## Part 1 — w89 opportunities ASK (one-line entries: IDEA | use case | cost | law sketch)

1. IDEA: seeded screenshot goldens (Playwright, fixed seed+viewport+fonts) | use case: protect the uniform board, Team Select, Hub, Complete, and dashboard layouts from silent visual regressions | cost: 0 new deps (Playwright already devDep), 0 bundle bytes, 0 engine | law sketch: same seed+browser+viewport+fonts+reduced-motion → byte-identical screenshots on two clean runs; any pixel diff fails; intentional change needs reviewed re-pin.

2. IDEA: axe-core (dev/QA only) | use case: catch unlabeled icon controls, invalid ARIA, contrast failures, focus-management defects on Team Select / board / Hub / Complete / new stats screens | cost: 1 devDep, 0 product bytes, 0 engine | law sketch: no serious/critical violations on named flows; exclusions local, named, justified.

3. IDEA: Rosetta chips (tap a term → existing Guide sentence, live value interpolated) | use case: explain gone%, Priority, Wins to a user who doesn't know the terms, without adding new copy | cost: ~60 lines, 0 deps, 0 engine | law sketch: every chip resolves to a non-empty existing explanation; keyboard+touch; no dead ends; no new explanatory copy without Owner approval.

4. IDEA: palette contrast guardrail (test all 32 team palettes × dark/light) | use case: prevent a team color from making text unreadable on a given mode | cost: ~40 lines test, 0 deps, 0 engine | law sketch: every palette passes WCAG AA on both modes or is flagged; failures block the build.

5. IDEA: CSS pick-complete pulse (respects prefers-reduced-motion) | use case: confirm a successful pick visually without a new screen | cost: ~15 lines CSS, 0 deps | law sketch: animation only when motion allowed; reduced-motion users get an instant state change, no motion.

## Part 2 — weigh-in on the three disagreements

Chart library (ECharts/Unovis) for awards/stats: NO — agrees with Inkling. The engine has no per-week probability series today; a 32-team PF-vs-PA scatterplot is ~40 lines of inline SVG. Reconsider only if 3+ interactive visualizations with zoom/legends/complex axes are approved.

PWA service worker (vite-plugin-pwa): NO — agrees with Inkling. Offline already works (hard requirement, no CDN). A SW risks stale-cache incidents against the envelope/replay design. Revisit only after saves/sync ship and a real offline-failure mode is demonstrated.

Virtual scrolling (TanStack Virtual) for the 1,953-row stats table: NO for the board (agrees with all); PARTIAL for heavy dashboards — pair with TanStack Table only if the Architect's brief approves column visibility, faceted filtering, or multi-sort. ~1.7k tiny rows render in <100ms; do not add Virtual for its own sake. (This is my one dissent from the unanimous "no virtual scroll" on dashboards.)

## Part 3 — Stats/Awards brief rulings (my opinion, Owner decides)

1. Four tab labels + column headers as the only new strings: YES — four labels only, consistent with the w89 inventory rule.
2. Heavy tables scroll inside their container at 390px with data-testid proof: YES — tables only, not the board.
3. Hand-rolled table vs TanStack: HAND-ROLLED — matches GPT's challenge and the brief's default ~180-line StatTable. TanStack only if column visibility/faceted filters/multi-sort are later approved.
4. Z.ai builds under Architect brief vs Architect in Colors v1: Z.ai brief; Architect reviews the diff — matches the frozen-view-model-contract plan.
5. Fold into Cakepanz-9 or companion Cakepanz-10: COMPANION C10 — keeps 9's budget (A→B→B-bis→C→D→E) intact.
6. Playoff grain per-game rows vs leaders-only: PER-GAME TABLE + playoff leaders — more useful for a user checking "did my team's playoff game count."

## Part 4 — P-158 threshold reaffirmation

I keep my position: the Costly Miss floor should stay at 0.45 (not the Owner's 0.10), because 0.10 would flag nearly every miss as Costly and dilute the signal. This is a threshold call for the Owner + Architect, not the reviewers. Filing for the record.

## Part 5 — one additional idea neither Inkling nor Ernie named

IDEA: a "season recap card" generated from existing seasonStats + awards + Book (native canvas, 1080×1350) | use case: the Share screen already exists (Share.svelte) but exports nothing; a deterministic canvas card (team record, top 3 stat leaders, awards) gives the user something to screenshot/share with zero new dependencies | cost: ~120 lines, 0 deps, 0 engine, reuses existing view models | law sketch: repeated render from the same record is byte-identical; exported values match the underlying VM; reduced-motion not applicable (static image).
