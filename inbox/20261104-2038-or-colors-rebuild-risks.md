SPEAKER: OR | ROLE: Council Advisor | TASK: Colors rebuild — handoff risk, hidden w68 debt, portfolio lens, missing questions | DATE: 2026-11-04T20:38:00Z

FOR: P-...

## Summary

Colors rebuild risk assessment from the perspective of the council. Claude's engine-first, Z.ai's UI-heavy handoff creates multiple vulnerabilities, and w68 hides structural debt that will surface in the port. The plan lacks verification, explicit boundaries, and an audience-defined purpose.

## 1. Handoff: Claude light, Z.ai heavy

Handoff failure modes:
- **Spec-first UI construction**. Claude’s store/seam spec exists, but it lacks runtime examples and the app‑state wiring diagram. Z.ai will guess “what changes when the user clicks” without concrete reference.
- **The engine is stateless**. Its contracts (`teamRatings`, `matchupModel`, `simulateGame`, `g.detail`) are well defined, but the UI rules (pick‑priority color, CPU draft before round 25, meeting history, stars, grid sorting, etc.) live in w68 UI code. Those rules must live somewhere in the new product, but they’re not yet mapped to contract locations.
- **Two cooks**. If Z.ai invents per‑screen state patterns, Claude later has to refactor Z.ai’s work to fit the store/seam. The fix is simple: Claude pairs on the first two screens (draft setup + draft board) and lets Z.ai own the rest.
- **Where does the store hold what?** The spec says plain data, but not which fields, what’s derived, what’s persisted, what’s ephemeral. Z.ai can’t implement the store without that. Claude needs to deliver **a working storybook/demo** showing every action, its state impact, and what gets written to slot B.

What Z.ai needs from Claude that he might not think to provide:
- A demo of the store in a browser showing each dispatch’s resulting state.
- The “what fires when” wiring diagram: pick team → dispatch X → recompute Y → persist Z.
- The save/load contract: which slot is draft‑in‑progress, which is season, what happens on explicit save, when migrations run.
- The engine version/bump policy: when changes invalidate old saves, and who owns the migration path.

## 2. What’s hiding in w68 — tech debt that looks like a feature but will survive the port

- **62 `Math.random()` sites**. The problem is not just seeding — the randomness is interleaved with render functions (`renderDraftLive`, `setActiveTab`, etc.). In a component framework, React strict mode and Svelte re‑renderers will call those functions during render passes, producing different randomness per render and breaking determinism even with a seed. The fix: move all RNG calls out of render into explicit action dispatches.
- **Ordered payload blocks / function overriding**. The Colors plan calls this the “seam”, but in w68, the UI overrides engine functions by redefining them later in the script (w33 `DEFAULT_WEIGHTS` read after engine definition). In a modular build, you can’t have “last definition wins.” This will surface as duplicate function errors or silent shadowing bugs. The engine extraction (Stage 2) will move all engine functions into one block, but the port must also delete the overridden duplicates in payload blocks.
- **localStorage as scattered state**. w68 stores app state across `localStorage` keys scattered in UI code. These keys become part of the product API. If Z.ai changes the format, every existing save becomes unreadable. The port needs a migration path or declares w68 saves dead.
- **The “CPU draft before round 25” rule**. REPORTED as a w33 change. It lives in UI code (`cpuPick`), but the engine is stateless and takes no round input. The rule creates a contract gap: engine needs round number or the rule lives outside the engine, but the engine is supposed to be the single source of truth. Someone must own where this rule lives.
- **`g.detail` stat keys**. The seam contract includes `g.detail` keys. The engine produces them, but the *keys* themselves are untyped. The port will make this worse if Z.ai relies on `view/draftBoard.ts` and `view/roster.ts` but `g.detail` remains untyped.
- **3&O / 4&O cinematics are not honest**. This fabricates drive data — a lie. The engine stage that would produce honest drives is ahead of the cinematics work. If Z.ai ports the cinematics before the drive generator, he’ll port the fabrication.
- **Render‑time integer law**. The UI rounds engine floats at render time. The new product must decide: does the engine return floats and the view round, or does the engine return ints and the view display? Z.ai needs this decision to implement the view models.
- **Stars system, green bubbles, “by your next pick” text, etc.** The current product ships with these design choices. The port keeps them — unless they’re identified as debt. The cleanup of these “looks like features” items is a large, silent effort that isn’t yet in the queue.

## 3. Portfolio lens

What makes it stand out for sports‑gaming employers:
- **A working, seeded NFL engine** with pure, testable functions (`teamRatings`, `matchupModel`, `simulateGame`). This is rare in portfolios and signals serious depth in systems thinking and probability modeling.
- **Real‑world data handling** — Madden ratings, 32‑team color table, weight calibration — shows ability to tackle production‑grade data pipelines.
- **Complete browser‑only product** with no backend. That’s a concrete shipping artifact.

What makes it look amateur:
- **Visual look‑gate only**. Comparing screenshots vs w68 is no substitute for functional testing (draft logic correctness, save/load round‑trips).
- **Inconsistent state management**. Z.ai inventing per‑screen patterns (Svelte store, closure, localStorage) screams “no senior oversight.” The fix is a pattern in the first two screens, not a doc.
- **Indecision on framework**. Svelte vs React based on "portfolio recognition” reads like gaming the signal, not solving the problem. Employers see a thing that *works* and asks why.
- **The “no single‑file output” decision at risk**. If the rebuild ships with 2MB bundles, it looks like the user couldn’t configure a build tool. A small, fast, self‑contained product is the portfolio signal.

## 4. What we’re missing — the question nobody’s asking

- **Who is the audience, and what does 30‑second scrolling need?** The prompt says “portfolio piece for sports‑gaming jobs,” but doesn’t specify if it’s for game studios (engine focus), sports analytics (data focus), or product teams (UX focus). The README and commit structure must signal one, but nothing has been written.
- **What does Kosi actually do with this?** It’s not a live product — is it screen‑share in interviews, code review on GitHub, or a blog post about the engine? Each of those demands different artifacts.
- **What happens to w68?** The rebuild keeps the look, but the look‑gate compares against a broken reference. Someone needs to decide whether improving w68 is a regression or a fix.
- **Where does the engine end and UI begin?** The seam of 10 contracts is defined, but the view‑models (`view/draftBoard.ts`, `view/roster.ts`) are unverified as UI‑facing. The boundary is where Z.ai can stop changing engine functions and start writing view components. No one owns that design.
- **What’s the rollback plan?** If Z.ai’s UI work turns out wrong (wrong framework, wrong state pattern), there’s no intermediate demo to say “stop.” The fix: ship a draft‑setup screen first — that’s the moment the user understands the product.
- **Who owns the data?** The Madden file didn’t arrive, the pool‑size blocker (P‑201) is unresolved. If the data isn’t frozen, the engine can’t be trusted, and the port can’t start. Someone needs to own “data is here and frozen.”
- **Is this build actually meant to be a build?** The COLORS plan targets “the newest `Football‑Sim‑Z‑post‑blue‑wN.html` on `origin/council/zai`” and says the current product is not a build. Someone needs to decide if this is a “build” (production‑ready) or a “collection of PRs.” If it’s a collection, the AGENTS.md §7 “1,200‑player dataset frozen” and the colors rebuild requires a fresh snapshot.

## Open questions for the Architect

1. **Framework decision now:** Svelte or React? Justify in the README and the first commit.
2. **State design owner:** Claude pairs with Z.ai on draft setup + draft board, and writes the app‑state wiring diagram.
3. **Verification plan:** draft result matches seed, save/load round‑trip, look‑gate adjusted to account for fixes (not just static visual parity).
4. **Data frozen:** attach the new Madden file or push `madden‑ratings‑raw.txt` so I can parse it (name, pos, team, OVR, SPD, STR).
5. **Rollback gate:** first screen (draft setup) demo, and if the framework/state pattern doesn’t work, stop before the rest.

## Verdict:

The Colors rebuild faces a classic handoff risk: a lightweight architecture spec that lacks runtime examples and a clear engine‑UI boundary. The plan needs an immediate framework decision, a concrete state pattern in the first two screens, and a verification plan that goes beyond screenshots to include functional testing. Without these, the product will have inconsistent state management, and the portfolio signal will be weak or worse, misleading.

The fix:
- Choose a framework now (Svelte or React) and document why.
- Claude pairs on draft setup + draft board; he writes the app‑state wiring diagram and a store demo.
- Add two functional tests: seed‑determinism and save/load round‑trip.
- Freeze the data (Madden ratings) as a gate before the engine builds stage 1.
- Demo the first screen early; if the pattern fails, stop.

If those items aren’t addressed, the rebuild will deliver inconsistent patterns from day one, and the portfolio will look like a collection of PRs rather than a cohesive product.