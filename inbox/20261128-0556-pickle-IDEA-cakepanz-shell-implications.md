SPEAKER: pickle (council seat) | ROLE: adviser / brainstormer | TASK: implications and concrete UI/UX improvements for Cakepanz and Claude's engine shell from the 2026-11-28 PARTIAL bytes | DATE: 2026-11-28T05:56:00Z
FOR: Owner · Architect (Claude) · Z.ai · MUSE · council
IDEA: advisory only — no product, engine, pin, governance, queue or tools byte changed by this filing; nothing built here.

## 0. Grounding and non-duplication
Grounded in the byte-for-byte mirror `council/pickle@c417ec0db` and the receipts in `inbox/20261128-0556-pickle-P5-REVIEW-zai-partial-2026-11-28.md`, plus read-only `git show` of `origin/architect/engine-and-seats` (VERIFIED this sitting).

**Verified shell state:** `git ls-tree -r --name-only origin/architect/engine-and-seats colors/src | grep -E '\.svelte$'` → **empty**. `colors/package.json` says framework Svelte 5 + Vite 8 is decided and installed but "nothing in src, test or tools imports them yet"; the view layer is framework-free TypeScript at `colors/src/sports/nfl/view/{draftBoard,gameView,roster,teamColors,theme}.ts`. `boardVM()` already emits plain JSON strings (`wins`, `priority`, `gone`, `tone`, `alsoFits`) made by `engine/display.ts` — the future component only places text. `teamColors.ts` is the Owner's 22 Oct 32-team hex table with an explicit no-edit rule.

I do **not** repeat my 2026-11-26 ten tooling ideas, Z.ai's Wave 2–5 plans, hy4's twelve, porca's B1–B6, or DS/orcads' UX list. What is new here is the **UX translation** of the specific mechanisms p5 landed: the visible-scene probe, the honest FALLBACK cells, the tint repair, the byte latch, and the "acceptance covers this tree" wording.

Ranked by felt value ÷ risk. Engine-safe throughout: no `src/engine/**`, no new math in the UI, no protected constant, no hex edit, no default-green, no invented datum.

## 1. Single most transferable implication
p5 proved that a screenshot can be labelled **FALLBACK — NOT the intended scene** honestly, and that a scene proof needs three predicates: the target is hit-testable at its centre, stable across frames, and fingerprint-distinct from boot state. That is exactly the discipline the shell's future Svelte components lack. The highest-value transfer is not a chip or a screen: it is **making "this surface actually reached its state" a first-class, failing gate** before any w89-parity screenshot is called green. Six of p5's 41 captures failed that test; a product UI without the same test will ship the same lie with no label.

## 2. Ranked ideas

1. **Visible-scene smoke gate for the shell (do first).** Anchor: Z.ai `scripts/side-by-side-s15.mjs` (`sceneState` / `ensureScene` / `centerHit` / `stable` / pairwise-distinct fingerprints) → Architect's view layer via `colors/src/sports/nfl/view/draftBoard.ts`. Build a cheap 8-scene set — boot, team select, board top-three, pick confirm, feed, share sheet, and 390 px light/dark — and require all three predicates per cell. Law: plant an overlay above the board in a throwaway copy → that cell fails with the scene named, not a green PNG. Risk: low (tooling only). Value: closes the exact class behind six p5 FALLBACKs before the Svelte UI exists.

2. **Stale state must say so on-screen.** The 6 FALLBACK cells were honest because the doc named them; the UI analogue is a visible strip — "Preview — start a draft to see live picks" — whenever a scene cannot be reached (no draft started, no saved run), never a stale count that reads as live. Anchor: `BoardVM.footer.text` is already the honest footer surface; a `staleReason?: string` on the VM would carry the reason to the component (Architect's call; no engine math). Law: a numeric board cell rendered while `staleReason` is set fails the smoke gate. Risk: low.

3. **Epistemic status travels with the number, not the component.** Z.ai's Wave 2 plans MEASURED / INTERIM / UNKNOWN chips; my addition is to put the status on the datum — e.g. `winsStatus` beside `wins`, `goneStatus` beside `gone` in `BoardRowVM` — so a Svelte component cannot guess or default to green. `boardVM` already produces strings from `display.ts`; this is a VM field, not a new computation. Law: a row with a numeric `wins` and no status is a VM error. Risk: low, but the Architect must rule that VM metadata additions are in scope (no engine bytes).

4. **One contrast-safe accent helper over the Owner's colour table.** Z.ai's p5 repair in `takeover.ts:tintOf()` — 12% mix, halve while the gold's contrast degrades, fall back to the panel — should become a single helper in `colors/src/sports/nfl/view/teamColors.ts`, gated by a generated 32-team × light-mode contrast table (Z.ai already filed both measurement tables at `deliveries/receipts/tint-scope-measure.json`). **Never edit the 32 hex values** (Owner, 22 Oct). Law: zero AA fails across all 32 teams in light mode and Arizona's regression stays dead. Risk: low. This is the most directly reusable visual fix from p5.

5. **Byte latch as three honest labels, not a green dot.** The p5 SeamCard now carries `__CP_TREE_SHA__`. UX: distinguish the facts it latches — engine pin `408410477`, app build hash, dataset hash — each with its own "verified at" prefix; when the observed tree differs, show "unverified at this build" with the prefixes, the UI twin of `SHELL-STATUS`'s `COMPLETE at tree X; current tree Y`. Dev-gated only. Law: a chip showing MEASURED when the observed hash differs from the latch fails. Risk: low; **Owner must rule** provenance dev-only vs player-facing before any player-visible placement.

6. **The `+N tied` strip needs a reason and a non-colour signal.** Z.ai Wave 3's default is exactly three until `rawSort`, plus a `+N tied` strip. UX: name the tie basis (equal rounded `wins`), make the strip keyboard reachable, and never let the glow be the only signal — reduced-motion guard plus a text badge on top-three rows. Law: a tied row omitted from the strip while its displayed `wins` equals row 3 fails. Risk: low; the Owner still decides exactly 3 vs 3+ties.

7. **Offline chip degrades in place.** Complementary to Z.ai Wave 2: when the tent hash differs from the shipped dist or `externalRequests` is non-empty, keep the chip visible as `Offline · unverified` with a one-line reason rather than hiding it — absence reads as green. Law: no `Offline · no network used` without both a `distHash` match and an empty request list. Risk: low. Note the p5 tent is `?dev=1` labelled DEV; no CSV-import path is implied.

8. **Acceptance coverage as a dev-gated line.** Render `COMPLETE at tree X; current tree Y` verbatim from `SHELL-STATUS.md` on a dev surface, so a reviewer sees at a glance that a Wave A acceptance cannot certify Wave B bytes. Law: any "verified" label while the prefixes differ fails. Risk: low. This is the p5 checker bug (`acceptance-covers-this-tree` reading the wrong file) expressed as a UI invariant: show the honest line, never a default.

## 3. One small observation from the read-only pass
`colors/src/sports/nfl/view/draftBoard.ts`'s header comment still says the VM exists "so React and Svelte only place text". React was ruled out by the Owner (2026-11-15) and `colors/package.json` records Svelte 5 as the framework. This is a wording issue in the Architect's file, not mine to change; whoever lands the Svelte UI should update that comment in the same commit. Included so the future component author does not treat React as a live option.

## 4. Post-v1.1 / Owner-gated (do not start now)
- A public receipt drawer (manifest authority, seam card, cutover proof) — only after the Owner rules provenance player-facing.
- Counterfactual "what if I had picked X" replay driven by engine advice and the user's actual pick — post-v1.1, zero new math, never a scouting surface.
- Phone card deck / Pick Card / provenance drawer — already filed by DS and orcads; not restated here.

## 5. Anti-goals and handoff
Do not add a second colour table, do not edit a generated block by hand, do not loosen a law to make a gate green, do not bump Vite (R-13 is CLOSED; the migration plan is FILED), do not copy `src/data/*.csv` or a private id into a public manifest, and do not let a seat that authored these changes certify them. My recommendation is to start with **1**, because the visible-scene gap is the largest remaining evidence gap and it makes 2, 3, 5 and 8 testable; the choice is reversible and technical, so work on the others can proceed in parallel once 1 has a failing-law receipt. This is a brainstorm, not an assignment, not a build, and not an acceptance.
