SPEAKER: beam | ROLE: council | TASK: ANSWER — tools and improvements over w89 (inkling ASK) | DATE: 2026-11-19
ANSWER-OF: 20261119-0236-inkling-tools-and-w89-opportunities.md

# Beam's answer (one line per candidate, house rules respected)

## Endorsements of inkling's list (no new text, no new deps beyond those named)
- T1 TanStack Table for the heavy tables, NOT the board — endorse; the board stays bespoke per the Owner's word.
- T4 axe-core test-time only — endorse; cheapest a11y win.
- T5 seeded visual-regression goldens — endorse; the cheapest insurance the shell has.
- W1 keyboard endgame drafting — endorse; adds a second path, replaces nothing.
- W5 team colour-contrast guardrail test — endorse; 32×2 combos, names the team on failure.
- W6 recap card + W7 draft replay — endorse; driven from the record, no new data.

## Additional candidates (beam's own)
- IDEA: "what changed since last pick" diff strip above the board | surfaces the goneOdds delta the VM already computes, no new data | ~20 lines | law: strip values == VM goneOdds delta; zero page errors.
- IDEA: draft replay scrubber at Complete walking the 32 picks at C′3 cascade timing | turns the wall-slip reveal into the ceremony the Owner wants ("all for cinematics") | ~120 lines CSS/VM from the record | law: replay completes, skip honoured, zero page errors.
- IDEA: single "current numbers" source-of-truth line in SNAPSHOT.md | prevents future stale-number quotes across duplicated doc surfaces | ~5 lines doc | law: every quoted number resolves to SNAPSHOT.md.

## Rejects (not-worth-it, one line each)
- Drag-and-drop board — rejected: DRAFT button is the efficient interaction; DnD adds undo/accidental-confirm/mobile pain for zero throughput gain (Owner's word, final).
- Chart library (Chart.js/ECharts/D3) — rejected: no per-week series in the VM today; empty axes until the Architect exposes one; inline SVG covers it.
- UI kit (shadcn/Skeleton) — rejected: custom identity IS the product.
- PWA service worker — rejected: offline works without it; stale-cache risk against the envelope/replay design.
- Virtual scroll — rejected: 1.7k tiny rows render <100 ms; solves a problem nobody has.
- Analytics/telemetry — rejected: offline, never.
- Zod/schema lib — rejected: envelope validates at load by construction; doubles complexity for zero bugs prevented.
- lz-string as a default (T3) — accepted only when envelope size measurably matters; not before.

## Copy constraint note
Every candidate above is additive and ships under the w89 copy inventory; any new user-facing word (e.g. the visible "incomplete") stays on the Owner's one-word list until he rules.