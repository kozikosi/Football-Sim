# Z.ai — S15 innovation backlog, ranked (filed per the v3 continuation §9 — RECORD ONLY, build none in this close-out)

DATE: 2026-11-23 · FILE: inbox/20261123-zai-innovation-backlog-ranked.md · FOR: Owner / council · STATUS: proposal — nothing here is built; every item is shell-only, engine-safe, and binds to the Owner anti-goals (no scouting, no full GM, no faces, no downloads, no seed in brag). Filed AFTER the packaging gates went green (run 4 ACCEPTANCE RUN COMPLETE, reseal 369 OK, gate-manifest PASS, numerals CLEAN ×2).

Ranked by (Owner value ÷ risk), each with the exact anchor it would touch. The rawSort/display-rounded oracle caveat rides items that surface tie-adjacent numbers: no raw-valued oracle ships against a display-rounded component until the engine lands rawSort (the §5 proposal, BLOCKED (engine half), remains the door).

1. **Trust/state surfaces** (beam/glyph/iceman/porca convergent) — the calm status bar: engine stamp + shell build token + seed on the owner's own save card + save state + offline indicator; dev-gated "Build & Proof" drawer; "Restored from X" banner with explicit choices; the receipt badge driven by the ACTUAL packaging state, never a green lie.
   Anchors: `src/App.svelte` (the boot/`hydrateBoot` restore path — the S14/P2 `savedSuggest` restore), `src/lib/components/TeamSelect.svelte` (the START row), a new `src/lib/components/StatusRail.svelte` (one component, one source). No engine bytes; the stamps read `metaNow()` (the truthful-stamp law N36).

2. **Board decision support** (beam/ernie/glyph/iceman) — promote `cp-why` into a first-class dismissible, remembered one-line reason with tap/hover expansion to the exact VM numbers; Δ wins vs the next-best; a pick-confidence strip (current / next / picks-until-you / gone-risk); a visible "Undo last pick" rail beside the truthful toast. ALL numbers VM-sourced — no new math in the UI (the L24 array-positions law and the no-display-parse scope are the floor).
   Anchors: `src/lib/port/suggestWhy.ts` (whyFor/`suggestIdsOf` — ONE source), `src/lib/components/BoardRow.svelte` (the why copy row), `src/lib/components/DraftBoard.svelte` (the strip rail), `batteries/board.battery.mjs` (new laws L32+ beside L24/L30, never weakened).

3. **One-button clarity / a11y** (glyph/orcatide/beam) — a one-session legend; the pulse off when disabled; focus handoff to the first `.cp-draftbtn` on START; 44px targets; long-name 390px checks; native `<button>` semantics for flex chips/sort/slot picker; `role=status` toasts (assertive only for errors).
   Anchors: `src/lib/components/DraftBoard.svelte` (the one-button bytes, the S15 §2.3 design), `src/lib/components/BoardFooter.svelte` (`.cp-undo`), `batteries/board.battery.mjs` (L16–L22 ride here — the new checks extend, never relax).

4. **Share discipline** (pickle/glyph/iceman/GPT) — preview the exact copied text from ONE formatter; no seed/save/private ids in the brag (P-209); the pre-make-live muted "link goes live on release" note instead of a dead button; no auto-download; no image card unless the Owner asks.
   Anchors: `src/lib/port/shareable.ts` (the envelope formatter — the ONE formatter), `src/lib/components/Share.svelte` (the CTA + `hasBragLink()` hiding while `VITE_BRAG_URL` is unset — the S35 law's surface), `batteries/shell.battery.mjs` (S35 — the season-surface non-vacuity precondition from the FF re-home carries).

5. **Why-copy as data** (pickle/glyph) — `{headline, detail, sourceStat}` from slot value/flex fit/team need — reproducible, falsifiable, sport-neutral; the display-rounded-oracle caveat stays visible whenever the tie extension is INTERIM.
   Anchors: `src/lib/port/suggestWhy.ts` (whyFor becomes the data producer), `src/lib/components/BoardRow.svelte` (the renderer), `batteries/board.battery.mjs` (L25 the explained law — extended to assert the shape).

6. **Motion/panel contracts** (beam/iceman/orcatide) — the motion pref full/subtle/none from ONE `<html>` attribute with reduced-motion parity; ONE Panel component contract (the 22px/blur-14px glass law stays the floor).
   Anchors: `src/lib/assets/tokens-w89.css` (the motion tokens — the L23 pulse/sheen scope holds), `src/lib/components/*Panel*` (the contract), `batteries/shell.battery.mjs` (S33 the panel law; `batteries/visual.battery.mjs` the reduced-motion pairs).

7. **Dev scenario/receipt mode** (iceman/glyph) — load fixed seeds/states for the exact board/share/save states the batteries assert (the batteries already build the RECORD node-side and LOAD it — this promotes that path into a dev-gated UI affordance).
   Anchors: `src/lib/port/shareable.ts` (the restore path — S29/W12), `src/App.svelte` (a `?dev=`-gated scenario loader), never in the production bundle (the gate: the dist grep law M1/N14 stay green).

8. **Future north star — RECORD ONLY** (pfd-01/02): the spatial badge field / play-calling screen (faces replaced by badges) — long-term, post-v1.1, zero engine bytes until the Owner rules the surface in.

**Build order if ruled in:** 1 → 3 → 2 → 4 → 5 → 6 → 7 (trust first: every later item is more credible over an honest status bar). None of it ships without new laws beside the old ones — the falsifier suite grows with the surface, or the surface does not ship.
