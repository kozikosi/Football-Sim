SPEAKER: hy4 | ROLE: advisor | TASK: long, self-contained continuation prompt for Z.ai after Claude's timeout | DATE: 2026-11-21T01:00Z
FOR: Owner to relay to Z.ai verbatim. This is the complete brief; nothing needs to be read from an earlier draft, inbox item or the Architect's timed-out session.

REPLY TO Z.AI — continue cakepanz after S14 (call it S15). Everything below is inline. Where the Architect's `claude/zai-work-order-v8-2026-11-21.md` conflicts with this prompt, **this prompt governs** — he timed out before correcting two byte-proven errors in it, which are fixed here. Where anything conflicts with the Owner's verbatim words in §1, the Owner wins.

## §0 · Status of the world (VERIFIED this sitting)

- The Architect's branch tip is still `dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0` (parent `7d8d71c`). He worked and timed out; **no new commit and no new `claude/` file landed**. His work order v8 exists at `claude/zai-work-order-v8-2026-11-21.md` on that tip and is the written order, with the two corrections below folded in here.
- The S14 tree is `/Users/kosi/Desktop/Football Sim/67-cakepanz-14-2026-11-20` (468 files, 18 MB, no `node_modules`). It is mirrored read-only on `council/hy4 @ 871c3edc1` and byte-identical (`diff -rq` exit 0). Package integrity: `node tools/verify-package.mjs .` → `467 OK / 0 FAILED / 0 missing` + `converse clean`, exit 0.
- Engine fence: pin `408410477` (commit object present), 69 `.ts` files, `git archive 408410477 colors/src` vs the tree's `src/engine` → `diff -rq` exit 0; `draftBoard.ts` sha256 `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251` on both sides. Work-order pin for S14 was `c8b503414f798ad6b8cab8a9587f0ac594445fb117c53828bf849e5d6ced1111`. Neither pin moves.
- S14's own receipts: falsifier 11 stages, all mutants DIED by name, `FALSIFY_EXIT=0`, 13 child logs under `deliveries/receipts/partH-s14/`; W14 probe both directions PASS, 0 page errors; board 19/0, visual 18/0, node 35/35, engine 430/430, slot 28/0, shell 48/0, slice 29/0/10/3, contrast 2/0, viewport 45/45. The staged composite is **PARTIAL** at step 13b — honest in the tree; complete it at your final bytes.
- Nothing here blocks you: the Cloudflare deploy mechanism is being decided by Claude + the council; it is not your task.

## §1 · The Owner's words (verbatim — these settle every design question)

Earlier rulings, filed by pickle/hy4:
> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare. the panels are still too boxy in cakepanz and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

> "ultimately i need you to tell zai to make cakepanz look **almost exactly like w89 with Cinzel and everything**; you can preserve your mockup as an example of the direction of change but **that's still not complete**."

The five direct answers that settle the board:
> 1.. top three highlight should be present in the button like w89
> 2. the little descpriton of the top 3 choices of why the user would select that player
> 3. w89 the buttons glow and there is a separte "top" badge
> 4. i need to know further context and claude should decide
> 5. i need more context and claude should decide

(4 and 5 are now with Claude + the council, not you.) Acceptance: a **filed side-by-side** against live w89 at 390 and 1180, light and dark. "Directionally similar" is a **FAIL**. The mockup is direction only, not complete.

## §2 · What to build on the board

1. **Remove the ring as a row construct, keep the top-three meaning.** Delete the row-level `.cp-suggest` treatment (the inset gold shimmer at `BoardRow.svelte:132-143`), the `suggest` prop's row-highlight role, `suggestIds`/`savedSuggest` persistence (`App.svelte:73, 234-236, 276-277`, `DraftBoard.svelte:83-90`), the INTERIM pairing and the ring-specific laws/stages (L13, L16–L25; F20/F24/F25/F26). The top three continue to come from the **first three array positions of the engine-sorted rows** — never rendered text, never `.textContent`/`innerText`.
2. **The top-three signal lives in the button, w89-style.** Port these exact w89 bytes (`origin/gh-pages:Football-Sim-Z-post-blue-w89.html`):
   - `:12849-12855`: `@keyframes zpbBtnPulse` and `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}` — **EVERY Draft button breathes**. The top-three class opts out: `button.resetbtn[data-pick].zpb-ctabig{animation:none;}` — they graduate from the pulse to the *sheen*.
   - `:1749-1750`: `tr.zpb-top3 button.slotdraft::after, .zpb-shimbtn::after { … linear-gradient(100deg,rgba(255,255,255,0),rgba(255,244,214,.8),rgba(255,255,255,0)); transform:skewX(-18deg); animation:zpbsheen 2.2s ease-in-out infinite; }` — the sheen sweep on top-three buttons.
   - `:6430`: `const btn = … top3.has(r.p[0]) ? ' zpb-ctabig' : '' …` — the W66 top-three button treatment; `:6432`: `topTag` → `<span class="toptag" title="One of your top three priorities right now">TOP</span>`; `:6488`: badge in the name cell, button in the button cell of the same top-three row.
   - Reduced-motion guard: w89 `:1807` (and the existing cakepanz `body.cp-reduced` guard). Keep both. `--glow` rides the house token `color-mix(in srgb, var(--goldm) 28%, transparent)` — **no new hex literal**.
   - **Correction to the Architect's v8:** he wrote "the Draft button glows on top-3 rows". That is backwards. Pulse on **all** Draft buttons; sheen + TOP badge on the three; `animation:none` only for the sheened three. A named falsifiable law must fail if the pulse is removed from ordinary rows or from the three (both directions).
3. **One visible Draft button per row; remove `.cp-quick`.** The Architect decided this (his v8 §2.2): the visible Draft button is the one-click path, as in w89; a second pick control per row doubles the double-click surface the `busy` flag exists to contain. In the current tree the row has `.cp-main` (expand), `.cp-quick` (one-click, only on top-three rows, `BoardRow.svelte:47`), and a staged `.cp-primary` inside the expand panel (`:60`). Target: **one visible Draft button per row** labelled with the named slot (a bare "Draft" silently picks a slot), carrying the pulse; the expand/flex panel stays as the detail path. Do not silently keep both `.cp-quick` and the new button. Keep the `busy` flag, the L22 double-activation guard and the named-slot semantics; the one-click path must dispatch exactly one PICK.
   - **Mandatory re-point (missing from the Architect's v8):** `batteries/visual.battery.mjs` uses `.cp-rows .cp-row.cp-suggest .cp-quick` at **`:98, :175, :199, :206, :230, :292`**. Line `:292` is **W14 leg A** — the click that creates the autosave for the P0 shareable-link law. Re-point all six to the new single Draft button selector. W14 must still exercise both directions (explicit `?seed=` link wins over a different autosave; same-seed reload restores) and keep the `savedSeed`/`savedPicks` assertions. **Do not weaken W14, skip it or change its meaning to make it pass.** If the new button has a stable class, name it in your handover so the battery and the relay agree.
4. **Why descriptions: the top three only**, one line each, answering "why would the user select that player". w89's model is the why-chip at `:9840`: plan text, a percentage, `the math's pick` for rank 0 and `−X.X pts vs. best` for the others. Use cakepanz's VM (`whyFor` in `src/lib/port/suggestWhy.ts:21`) as the single source; the battery imports the same function and asserts the DOM matches. **Never parse rendered text; never invent a number the VM does not carry** — if the VM lacks w89's delta/percentage, use the existing VM-derived copy and say so in the receipt. Render inside the existing row (a sub-line, not a new column — L12 uniform board), not focusable (L21 tab order unchanged). Keep the ring-independent explanatory copy (`.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` "Fills …", `.cp-gonehow`, `BoardRow.svelte:14-20, 39, 53, 56, 61, 66`) — the Owner said keep those too.
5. **Panels / w89 parity.** "Too boxy" is real: cakepanz `.cp-panel` (`shell.css:80`) is 8px radius, flat; w89 `.panel` (`:625`) is `background:var(--glass)`, `border:1px solid var(--glassbd)`, `border-radius:22px`, `box-shadow:var(--shadow)`, `backdrop-filter:blur(14px) saturate(1.2)`. Port the glass vocabulary into `tokens-w89.css` for both light and dark roots; assert `--glass`, `--glassbd`, `--shadow`, 22px radii on large panels, `.panel` parity, contrast battery 2/0 (three KNOWN team holes stay NAMED), and the 390px no-scroll law. Cinzel 700/900 and Cinzel Decorative 700/900 are **already inlined as base64** in `tokens-w89.css:21-30,83-95` — do not add a font dependency and never copy w89's remote Google Fonts `<link>` at `:478` (offline is hard). Body copy stays system sans in both products. Gold must not drift orange; no blue panels.
6. **dispatchAsync contract** (Architect's `claude/dispatchasync-contract-2026-11-20.md`, published): all four product sites START (with `pickSlot`), PICK, UNDO, LOAD move together; `busy` flag set before each await and cleared in `finally`, controls disabled while set; never mix sync `dispatch` and `dispatchAsync`; read errors from the resolved state with `error = st.error ?? ''` (law L-ERR — a failure shows, the next success clears); `window.__cp` keeps six keys `store, refresh, valuation, seasonFacade, go, vmStore`; every `__cp.store.dispatch` in the batteries becomes `await __cp.store.dispatchAsync`, including the two LOAD calls in `shell.battery.mjs` (`:61/:170` in S13, `:66/:175` in S14). Gone-odds battery equality compares *method*, not digits. `selectBoardAsync` returns `null` vm unless status is `drafting` — keep the previous vm while drafting, clear on idle.
7. **Keep the P0 and P1 work.** The `hydrateBoot` seed precedence fix and W14 (§2.3 above), the visible `role=status` share notice, corrupt-never-repair, and the whole receipt-accuracy set (`verify-package.mjs` SKIP dirs, `scripts/fresh-server.mjs` stale-server guard, planted-law printing, receipt-path fixes, seedCode comment, honest PARTIAL-composite wording). Do not redo them.

## §3 · The fence — do not cross

- No edits to `src/engine/**`, `colors/`, the pin, ratings, `FLEX`, `RATING_SPECS`, `SLOTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, or `modelWeights()`. The §5 `rawSort` proposal is **WITHDRAWN** with the ring — do not implement it, and do not tell Claude to expect it.
- No gh-pages work, no make-live, no Cloudflare config or deploy. You hand over static output; the Owner + Claude deploy.
- No new images in lanes, no dated/merged/final copies in the root, no force-push, no stash, no edits to files that are not yours.
- No weakening a law to make it pass. If a law dies for a real reason, say so and file the fix.

## §4 · Batteries, laws and receipts

- Remove the ring-dependent laws and their falsifier stages; add named, falsifiable laws for: TOP badge exactly on the three array-position rows at every sort and checkpoint; one visible Draft button per row with the all-button pulse and the top-three sheen/opt-out; reduced-motion disables both; why copy on exactly those three with VM-sourced text; no `cp-quick`, no ring class; no law derives state from rendered text. Each new law needs a mutant that DIES by name and a child log.
- Keep the fresh-server guard and the shared `ringPresentGuard` pattern adapted to the new selectors. W14 keeps both directions. Add the sort-after-restore regression (pickle F4): a restored state that changes sort/needs must not keep a stale derived highlight.
- Re-state **all** battery counts from the bytes at your final state. Do not copy 19/0, 18/0, 16/0 or 17/0 from the S13/S14 sheets. Then update the generated gate table in `deliverables/CUTOVER-CHECKLIST.md:20/22`, `CUTOVER-ONE-PAGER.md:31/33`, `SLICE-STATUS-2026-11-20.md:16/18/20`, `scripts/acceptance-run.sh:41/43` and `ACCEPTANCE-RECEIPTS.txt:417` — prefer one script that reads the receipts and emits the table (beam's idea) so the drift class dies.
- Complete `bash scripts/acceptance-run.sh` to steps 13b–17 at the final bytes and file the tail into `VERIFY §26.5/§26.6`. The PARTIAL composite is the one evidentiary gap every reviewer named.

## §5 · Handover — all required

1. Pushed commit hash on your own branch (or, if you have no push credentials, the zip + its sha256 — route (b)), plus every claim with directory + command + result.
2. `node tools/verify-package.mjs .` → every entry OK, converse clean, exit 0, at the final bytes; CHECKSUMS regenerated (it never lists itself).
3. `git diff --name-only 408410477 <your tip> -- colors/src` → empty; 69 engine files byte-identical; `src/engine` never edited.
4. Battery counts at or above the S13 baselines (board 15→16/0, slot 28/0, visual 15→17/0 are S13 *receipts*, not thresholds) — your measured S15 numbers govern; falsifier all DIED by name with child logs; W14 probe PASS both directions.
5. The built `dist/` plus its sha256, and `dist/single.html` (self-contained, offline) plus its sha256. Keep both.
6. A **filed side-by-side** against live w89 at 390×844 and 1180×950, light and dark: Team Select, board with a top-three row, a pick confirm, a finished draft. "Directionally similar" fails. pickle coordinates this.
7. A one-page note naming the new selectors (Draft button, TOP badge, why line) so the Architect can re-point the merge tests without guessing.

## §6 · First actions, in order

1. Read §1 and §2 verbatim; re-check the w89 bytes at the cited lines before editing anything. The Architect's v8 §1/§2.1 glow wording is wrong — use §2.2 here.
2. Strip the row-level ring and its persistence; land the one-button top-three design, the all-button pulse, the sheen + TOP badge, and the three why lines.
3. Re-point the six `.cp-quick` battery selectors (including W14 leg A) **before** running the batteries, not after a failure.
4. Land the panel/glass restyle and the asserted tokens; keep Cinzel inlined, offline safe.
5. Re-law and re-falsify; regenerate the gate table from receipts; complete the composite.
6. File the side-by-side and the handover; hand the static build to the Owner + Claude.

## §7 · If you disagree

File the disagreement in your own inbox with the exact w89 byte that supports it; do not silently keep both designs, do not edit the Architect's files, and do not weaken a law. The Owner's words in §1 are final on product direction; technical shape inside them is yours to propose.

Filed as the continuation prompt. No product, engine, pin, governance or queue file was edited by me.

— hy4 (advisor)
