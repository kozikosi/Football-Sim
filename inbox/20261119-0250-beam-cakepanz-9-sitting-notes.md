SPEAKER: beam | ROLE: council | TASK: cakepanz-9 sitting notes (verification + tools + framework vote) | DATE: 2026-11-19T02:50Z

## 1. Verification of delivered 8.1 bytes (VERIFIED)

- Pins vs tree: shipped 67 files @ 5c808472, prepared 68 @ 65673a00. Engine delta = game.ts + passclass.ts only (both src/engine and src/engine-node). VERIFIED by diff -rq + .stamp.json.
- flex census: 99 rules {0:17,2:17,6:42,12:23}; SS>NICKEL=0; flex sha 76c02c65…6a6a. cmp vs both pins exit 0. VERIFIED.
- node battery: 33/33 both trees (with --import ./scripts/node-port-register.mjs; plain node dies on TS parameter property). VERIFIED (run earlier in this worktree).
- gate-numerals: shipped (CP_PIN=5c808472) → CLEAN ×2. prepared (CP_PIN=65673a00) → FAIL: "MERGE-GUIDE.md never names the CURRENT pin (65673a00)". Confirms the three-seat finding; the 8.1 receipts' "CLEAN ×2" claim for prepared is FALSE at the delivered bytes.
- dist sha both trees: 4ce69205… byte-identical (diff -rq exit 0). VERIFIED.
- START-OF-CHAT-ZAI.md: sha 8ef3b18d… ×3 byte-identical. VERIFIED.
- A2 mutation (shipped): deleted hydrateBoot → 46/1 (S29 red); restored → 47/0. VERIFIED on receipt (not re-run by me this sitting).

## 2. Tools investigation — ranked top-4 for the shell (each with use case + cost + law)

1. TanStack Table + Virtual (framework-agnostic) — use case: Awards/Stats/Standings dashboards with 1,200 players; native <table> + manual sort is the current pain. Cost: ~15KB gz, no engine touch, no new text. Law: L5 (390px) + the "every number self-describing" caption rule. Beats native: column virtualization + keyboard sort without re-implementing.
2. Unovis (or ECharts) for charts — use case: season stats visualization on data that already exists (seasonStats, tableNow). Cost: ~30KB gz; offline (bundled, no CDN). Law: "charts only on data that exists today" (no invented metrics). Prefer Unovis for tree-shakeable SVG.
3. html-to-image — use case: Share screen card export (Share.svelte already exists). Cost: ~8KB gz. Law: "no new text beyond w89 inventory" (image only). Beats native: canvas screenshot of a DOM node.
4. axe-core (dev/QA only, not shipped) — use case: accessibility audit of the shell (contrast, ARIA). Cost: devDependency only. Law: "no new text" (audit tool). Complements the caption rule.

Explicitly NOT proposing (per constraints): drag-and-drop (DRAFT button more efficient), UI kits, PWA (saves are the sync story), virtual scroll for the board, Zod, Storybook, analytics, state library, router (unless deep-links needed).

## 3. Vue 3 vs Svelte 5 vote

Vote: Svelte 5, confidence 65.
Evidence: the port layer is framework-free TS (port/, seam.ts) — the render layer is the only framework-bound part, so the cost of either is small; Svelte 5's $state/$derived reactivity matches the existing $state usage in App.svelte; bundle 7% smaller than Vue per sealed-bench; GPT 60/40, Inkling 70/30, Ernie ~60/40 all lean Svelte; the one pro-Vue weight (heavy-table/dashboard direction) is addressed by TanStack Table being framework-agnostic. What would change my mind: if the Owner commits to a dashboard-heavy product (charts/tables dominate) and wants Vue's ecosystem for that, or if Svelte's SSR story becomes a hard requirement. Neutral-with-rigged-argument is acceptable per the prompt; my vote is a lean, not a mandate.

## 4. What I did NOT do

- Did not edit cakepanz/product/governance/protected files. Did not re-run browser batteries (playwright not available in this worktree's node_modules). Did not re-run the A2 mutation on prepared. All receipt numbers REPORTED except the numerals gate (VERIFIED above).
