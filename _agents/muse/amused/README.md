# amused — the merge, attempted (MUSE's branch build)

**Owner directive (2026-11-01):** "If you would like to try the merge yourself, you can do so
in your branch under the name 'amused'. You could begin with v1."
**Goal:** merge Claude's engine with Z.ai's wave series (w52) into a version that is
portable, expandable into a multisport framework, and presentable as a portfolio piece
("a complex project i vibe coded").

**This is MUSE's experiment, not the Architect's build.** It lives on `council/muse` only,
never merges to `council/base`. Names are deliberately distinct: nothing here is called
`Football-Sim-*`, `Colors`, or `V23`. Findings that prove useful go to the council through
the normal inbox; the Architect decides what enters the real build.

## What "merge" means here

- **Engine:** Claude's fitted engine (ENGINE-MATH-SPEC.md + `colors/src/engine` TS) — seeded RNG,
  32-spot weight table, flex engine, Hungarian lineup optimizer. Framework-free, no DOM.
- **Design guide:** Z.ai's w52 UI/UX (rose-gold system, shimmer, Cinzel Decorative, team-color
  takeover, persistent bar) — treated as a design guide, with room to improve visually.
- **New in amused:** a real project structure (not one HTML file) built for portability and
  multisport from day one.

## Architecture (v1)

```
amused/
  packages/engine-core/   # framework-free TS: Rng, core types, the SportSpec contract
  packages/sport-nfl/     # NFL: slots, flex table, weight table, bases (data + rules)
  apps/web/               # UI (framework TBD: SvelteKit recommended, React possible)
  data/                   # rosters, weights tables (versioned)
  docs/                   # decisions (ADRs), evidence
```

- **SportSpec contract** (from GPT's multisport proposal + Claude's Stage 7): a sport is
  *data* (slots, flex, composition, target values) plus a *game model*; the engine consumes
  the spec. Second sport = new package, not a rewrite.
- **Simulation contract:** `simulate(scenario, seed) -> result` — reproducible runs, the
  answer to "can I run it twice and get the same result?"
- **Persistence v1:** localStorage (saves, settings). Core usable without registration.
  A `Storage` interface leaves room for cloud saves later.
- **Auth (later):** OAuth via a maintained library (Auth.js / Better Auth), never hand-rolled
  passwords. The quoted sensible approach: optional sign-in, account cloud saves,
  access-controlled sharing, core works without registration.
- **Deploy (later):** Cloudflare (Pages/Workers + D1), per Claude's verified research.

## v1 scope (proposed)

Engine core + SportSpec + NFL data tables + app shell with the w52 design language +
the **draft experience** (the signature interaction) + localStorage saves.
Season sim follows in v2. Framework decision (SvelteKit vs React) is with the Owner.

## Sources read for this plan

- Z.ai `HANDOFF-FOR-CLAUDE.md` REV 13 (25 Oct) + w52 deliverable (1,585,036 B)
- Claude `_agents/COLORS-V1-INTEGRATION-PLAN.md` (29 Oct) + `_agents/ARCHITECTURE-DIRECTION.md` (27 Oct)
- GPT `proposals/multisport-platform-gpt/TARGET_ARCHITECTURE.md`
- ENGINE-MATH-SPEC.md §§7, 10, 12 (acceptance tests E1–E9 — see P-195 deliverable)

## Status

- [x] Plan written; engine-core Rng + types ported (attributed)
- [ ] Framework decision (Owner)
- [ ] v1 scope confirmation (Owner)
- [ ] sport-nfl data port (slots/flex/weights from colors/src/engine + mathlab)
- [ ] app shell + design tokens from w52
- [ ] draft experience v1
- [ ] localStorage saves
