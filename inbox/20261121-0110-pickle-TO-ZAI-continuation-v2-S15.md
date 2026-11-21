SPEAKER: pickle | ROLE: council seat (Verifier of the S13 review round) | TASK: v2 self-contained S15 continuation prompt for Z.ai after the Architect's timeout | DATE: 2026-11-21T01:10Z
FOR: Owner to relay to Z.ai (build seat). Advisory filing; I edited no product, engine, pin, governance or queue file. This document is complete in itself: Z.ai reads THIS FILE and the named files in his S14 tree. No earlier chat, draft, inbox item or Architect sitting is assumed.

=====================================================================
Z.AI CONTINUATION ORDER v2 — S14 to S15 hand-over (21 Nov 2026)
=====================================================================

**Authority order:** (1) the Owner's verbatim words in §1; (2) this prompt where it corrects the Architect's written work order v8; (3) work order v8 for everything else; (4) your own technical judgement inside those bounds. If a NEWER written order from Claude contradicts this file, stop and report the conflicting lines with hashes before choosing — do not implement both.

**Label key:** V = I re-read the bytes or state this session (receipt inline) · R = another seat's receipt I did not re-run · I = reasoned · U = not established. Nothing below is presented as a gate I ran unless marked V.

## §0 · State of the world

- **The Architect's sitting timed out with no artifact.** (V) `git ls-remote origin refs/heads/architect/engine-and-seats` → `dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0`, parent `7d8d71c`, last commit 2026-11-21T00:24Z. `git fetch origin --prune` shows no newer commit on any remote ref. Both architect worktrees on disk hold no work from that sitting. Work order v8 at `claude/zai-work-order-v8-2026-11-21.md` on that tip is the written order, uncorrected. This file carries the corrections.
- **Your tree of record** is the S14 `67-cakepanz` delivery (`67-cakepanz-14-2026-11-20`, the "cakepanz-4" content), mirrored in several seat lanes. Work from your own copy. Not from `council/zai`'s old w55 packages; not from the `67-cakepanz/` snapshot on gh-pages (retired as a build target). (R: hy4, `01:00Z` filing — 468 files, 18 MB, no `node_modules`; `node tools/verify-package.mjs .` → `467 OK / 0 FAILED / 0 missing` + converse clean, exit 0.)
- **The shell is already complete — do not rebuild slices 3-5.** (V) `deliverables/SLICE-STATUS-2026-11-20.md` records slices 1-5 and the season shell s6-s12 as BUILT with named laws; slice 3's acceptance is closed at `deliverables/ACCEPTANCE-p316-slice3-2026-11-20.md`; slices 4 and 5 have per-slice rows. `README.md` says "THE COMPLETE SHELL (slices 1–5 + … s6–s12)". v8's "build slices 3-5" framing is stale. Your work is close-out, correction, migration, restyle and hand-over.
- **Engine fence.** Pin `408410477`; `colors/src` tree `8d8a8a1e81386e99f53f995492904348cb7d8345`; 69 TS files. Zero engine-byte diff. Protected constants (`FLEX`, `RATING_SPECS`, `SLOTS`, legacy `DEFAULT_WEIGHTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`) untouched. (R: S14 receipts; pin claim re-read from the tree README this session, V for the citation only — not re-measured.)
- **S14 final-byte gates — R, from `VERIFY-§26-append.txt:§26.6`, not re-run by me:** engine 430/430 · node 35/35 · board 19/0 · visual 18/0 · slot 28/0 · shell 48/0 · slice 29 pass / 0 fail / 10 skip / 3 defer · contrast 2/0 (3 known team holes, 0 new token holes) · viewport 45/45, 0 overflow, 0 console/page errors · golden seam MATCH · falsifier set exit 0 (`deliveries/receipts/partH-s14/`). These are the S14 floors; v8's 16/0 and 17/0 are **S13 receipts**, not thresholds (§4).
- **The composite is PARTIAL.** (V) `VERIFY-§26-append.txt:§26.5`: steps 1-13 `EXIT_CODE=0`, step 13b BEGUN with no output, steps 13b-17 absent from `ACCEPTANCE-RECEIPTS.txt`; gate-manifest/gate-numerals "NOT YET RECORDED THIS SITTING". This is the one evidentiary gap every reviewer named.
- **Cloudflare is not your task.** Deploy is the Architect + Owner; gh-pages is retired as a deploy target. The "how" is being decided by Claude + the council. You hand over a Cloudflare-ready static build. The account does not exist yet (U) — the Owner provisions it.

## §1 · The Owner's words (verbatim — final on product direction)

Filed by pickle (`622b70aeb052d6d7c929249e3ab919531d7829ea`) and hy4 (`inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`, `council/hy4`):

> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare. the panels are still too boxy in cakepanz and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

> "ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything; you can preserve your mockup as an example of the direction of change but that's still not complete."

Five direct answers:
> 1. top three highlight should be present in the button like w89
> 2. the little description of the top 3 choices of why the user would select that player
> 3. w89 the buttons glow and there is a separte "top" badge
> 4. i need to know further context and claude should decide
> 5. i need more context and claude should decide

(4 and 5 are now with Claude + the council, not you.) Acceptance: a **filed side-by-side** against live w89 at 390×844 and 1180×950, light and dark: Team Select, board with a top-three row, pick confirm, finished draft. "Directionally similar" is a **FAIL**. The mockup is direction only, not complete.

## §2 · Board work — the button, the glow, the badge, the why

**2.1 Remove the ring as a row construct; keep the top-three meaning.** Delete the row-level `.cp-suggest` treatment (the inset gold shimmer at `BoardRow.svelte:132-143`), the `suggest` prop's row-highlight role, and the ring-specific visual. The top three continue to come from the **first three array positions of the engine-sorted rows** — never rendered text, never `.textContent`/`innerText`. (V: that array-position rule is the S14 law L24, falsified by F24 in `scripts/falsify-board.mjs:273-291`.)

**2.2 Match w89's glow scope — v8 has it backwards.** From `origin/gh-pages:Football-Sim-Z-post-blue-w89.html:12850-12855` (V, re-read this session):

```
/* W66 (Owner): EVERY Draft button breathes (the top-3 law goes site-wide on the board),
   and the top-3 buttons graduate from the pulse to the progression treatment — filled in
   the drafting team's gradient with the sheen sweep … */
button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}
button.resetbtn[data-pick].zpb-ctabig{animation:none;}
```

So: **pulse on EVERY Draft button** (reduced-motion guard); **sheen + a separate `TOP` badge on the three**; the three opt out of the pulse with `animation:none`. Port the exact w89 bytes: `@keyframes zpbBtnPulse` (`:12849`), the sheen rule at `:1749-1750` (`linear-gradient(100deg,rgba(255,255,255,0),rgba(255,244,214,.8),rgba(255,255,255,0)); transform:skewX(-18deg); animation:zpbsheen 2.2s ease-in-out infinite;`), the top-three button class at `:6430`, the `TOP` badge at `:6432` (`<span class="toptag" title="One of your top three priorities right now">TOP</span>`), and the badge-in-name/button-in-button-cell layout at `:6488`. Reduced-motion guard: w89 `:1807` plus cakepanz's existing `body.cp-reduced`. `--glow` rides the house token (`color-mix(in srgb, var(--goldm) 28%, transparent)`) — **no new hex literal**; do not port `zpbstarglow` (in w89 it marks a ≥90 OVR star — a surface this board does not have). (V: S14 `src/lib/assets/shell.css:181` pulses only `.cp-suggest .cp-quick` — backwards; v8 §1/§2.1 says "glows on top-3 rows" — backwards. Both are corrected here.)

**2.3 One visible Draft button per row — this IS the Architect's decision; implement it properly.** v8 §2.2 says verbatim (V): "`cp-quick` is removed (Architect decision). The glowing Draft button on a top-3 row is the one-click path, as in w89. Two pick controls on one row doubles the double-click surface that the `busy` flag exists to contain … do not keep both silently." **That decision stands.** Only its stated premise about the current tree is false, and this is the fix:

- (V) `src/lib/components/BoardRow.svelte:25` — `<button class="cp-main" onclick={() => (open = !open)}>` is an **expander**.
- (V) `BoardRow.svelte:47` — `<button class="cp-quick" onclick={() => (onpickDirect ?? onpick)(r.id, r.slotId)}>` is the **only immediate-dispatch control**; there is also a staged `.cp-primary` inside the expand panel (`:60`).
- (V) `src/lib/components/DraftBoard.svelte:116` — `onpick={(id, slot) => (picked = { id, slot })}` **stages** the confirm banner; `onpickDirect={quickDraft}` **dispatches**.
- (V) `DraftBoard.svelte:28-32, 54-62` — the 380 ms guard and confirm disarm are on the **staged** path; `cp-quick` bypasses them by design.

Therefore: **do not merely delete `cp-quick`** — that would leave no one-click draft. Refactor so the single visible Draft button carries `onpickDirect`, is labelled with the **named slot** (a bare "Draft" silently chooses one), carries the pulse/sheen/TOP treatment, and dispatches exactly one PICK. Keep the expand/flex panel as the detail path, keep the `busy` flag and the L22 double-activation guard, and keep the staged-confirm behaviour where it still applies. Name the new button's stable class in your hand-over so the battery and the relay agree. Assert that no `cp-quick` class remains.

*(Correction to my own earlier filing `cd5095fb2`: I had proposed "keep `cp-quick`" as a default. That was wrong — it overrides a written Architect decision. The decision is to have one button; the finding was that the naive deletion breaks the one-click path. Both are now reflected here.)*

**2.4 Mandatory battery re-point (missing from v8).** (V, grepped this session) `batteries/visual.battery.mjs` uses `.cp-rows .cp-row.cp-suggest .cp-quick` at **`:98, :175, :199, :206, :230, :292`**. `:292` is **W14 leg A** — the click that creates the autosave for the P0 shareable-link law. Re-point all six to the new single Draft button selector **before** running the batteries. W14 must still exercise both directions (explicit `?seed=` link wins over a DIFFERENT autosave; SAME-seed reload restores) and keep the `savedSeed`/`savedPicks` assertions. **Do not weaken W14, skip it, or change its meaning to make it pass.**

**2.5 Why descriptions — top three only.** One plain line each, answering "why would the user select that player". Use the existing VM (`whyFor` in `src/lib/port/suggestWhy.ts`) as the **single source**; the battery imports the same function and asserts the DOM matches. w89's model is the why-chip at `:9840` (plan text, a percentage, `the math's pick` for rank 0, `−X.X pts vs. best` for the others) — if the VM lacks a w89 number, use the existing VM-derived copy and say so in the receipt. **Never parse rendered text; never invent a number the VM does not carry.** Render inside the existing row as a sub-line, not a new column (L12 uniform board stays), not focusable (L21 tab order main → Draft → method unchanged). Keep the ring-independent explanatory copy: `.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` ("Fills …"), `.cp-gonehow`.

**2.6 Data: `suggestIds[]` persistence.** This is a judgement call, not a settled ruling. Default: **keep the autosave's top-three set** until the one-button refactor proves it redundant. It is data, not the ring visual, and the restore/save path (W14, the RESUME law) depends on the save record. If you remove it, add a named law covering restore plus sort/needs change (pickle F4: a restored state that changes sort must not keep a stale derived highlight) and say so in the hand-over. Do not remove it silently to make a visual assertion pass.

**2.7 Panels / w89 parity.** "Too boxy" is real: cakepanz `.cp-panel` (`shell.css:80`) is 8px radius and flat; w89 `.panel` (`:625`) is `background:var(--glass)`, `border:1px solid var(--glassbd)`, `border-radius:22px`, `box-shadow:var(--shadow)`, `backdrop-filter:blur(14px) saturate(1.2)`. Port the glass vocabulary into `tokens-w89.css` for **both** light and dark roots. Assert `--glass`, `--glassbd`, `--shadow`, 22px radii on large panels, `.panel` parity, contrast battery 2/0 (three KNOWN team holes stay NAMED), and no horizontal scroll at 390px. Cinzel 700/900 and Cinzel Decorative 700/900 are **already inlined as base64** in `tokens-w89.css:21-30,83-95` — add no font dependency and never copy w89's remote Google Fonts `<link>` at `:478` (offline is hard). Body copy stays system sans in both products. Gold must not drift orange; no blue panels.

**2.8 `dispatchAsync` migration.** Read `origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md` in full; load-bearing points:
- API: `store.dispatchAsync(a): Promise<State>`; `selectBoardAsync(s, opts?): Promise<{pending:true}|{pending:false;vm:BoardVM|null}>`. Guarantees: serialised in call order; yields one macrotask first; **never rejects** (failure arrives as `state.error` on the resolved state); resolves with post-action state; subscribers still fire synchronously.
- Four product sites move **together**, never mix sync and async: **START** (keep `pickSlot`), **PICK** (drop `as any`), **UNDO** (keep `refresh()` and `void autosaveDraftNow()`), **LOAD** (already live; a synchronous LOAD left behind breaks the contract). Re-locate by call text — line numbers shift once you edit above them.
- `await store.dispatchAsync(…)`; `busy` flag set before each await, cleared in `finally`; disable pick/undo/start while set. `error = st.error ?? ''` on **every** resolve (law **L-ERR**: a failure shows, the next success clears).
- Gone-odds numbers differ from the shell's old `makeRng(seed*7+13)` because `selectors.ts` seeds from `makeRng(record.seed).fork('gone'+pos)` — the cutover law compares **method**, not digits. If you move to `selectBoardAsync`, keep the previous vm when `r.vm === null` and status is still `drafting`; clear on `idle`.
- Batteries: every `__cp.store.dispatch` becomes `await __cp.store.dispatchAsync`, including the two LOAD calls in `batteries/shell.battery.mjs:66` and `:175` (V, grepped this session; v8's `:61/:170` are S13). `slice1.battery.mjs` has zero `__cp`/dispatch references but still needs **timing** changes — wait for `busy` to clear or the new DOM state. `window.__cp` keeps six keys: `store, refresh, valuation, seasonFacade, go, vmStore`.

**2.9 Keep the P0 and P1 work.** The `hydrateBoot` seed precedence fix and W14, the visible `role=status` share notice, corrupt-never-repair, and the receipt-accuracy set (`verify-package.mjs` SKIP dirs, `scripts/fresh-server.mjs` stale-server guard, planted-law printing, receipt-path fixes, seedCode comment, honest PARTIAL wording). Do not redo them.

## §3 · Laws and falsifiers

The ring visual is gone, so ring-named laws cannot stay as written — but coverage must not disappear. **Reword/replace by name**, never silently delete or weaken: L13 (top-three identity), L16-L25 (one-click, guard, disarm, values, method, persistence, glow, no-display-parse), W14 (shareable/autosave precedence). hy4's list of stages F20/F24/F25/F26 (V: present in `scripts/falsify-board.mjs:203-320`) may be retired only if equivalent named mutants replace them. Add named, falsifiable laws for: TOP badge exactly on the three array-position rows at every sort and checkpoint; one visible Draft button per row with the all-button pulse and top-three sheen/opt-out; reduced-motion disables both; why copy on exactly those three with VM-sourced text; no `cp-quick` class; no ring class; no law derives state from rendered text; L-ERR both halves; W14 both directions; sort-after-restore regression (restored state changing sort must not keep a stale derived highlight). Each new law needs a mutant that **DIES by name** with a child log under `deliveries/receipts/partH-<next>/`. Keep the fresh-server guard and adapt the shared `ringPresentGuard` pattern to the new selectors.

## §4 · Gate floors and the drift class

S14 finals in §0 are the floors. v8's board 16/0 and visual 17/0 are labelled **S13 provenance**, not thresholds (V: `CUTOVER-CHECKLIST.md:20-22` is the S13 source). Re-state **all** battery counts from the bytes at your final state — do not copy 19/0, 18/0, 16/0 or 17/0 from any sheet. Then update the generated gate table in `deliverables/CUTOVER-CHECKLIST.md:20/22`, `CUTOVER-ONE-PAGER.md:31/33`, `SLICE-STATUS-2026-11-20.md:16/18/20`, `scripts/acceptance-run.sh:41/43` and `ACCEPTANCE-RECEIPTS.txt:417` — (R: hy4, relaying beam) prefer **one script that reads the receipts and emits the table**, so this drift class dies rather than being patched again. Note: `scripts/acceptance-run.sh:52` carries a stale "F0-board clean baseline 16/0" line — fix it in the same change.

## §5 · First actions, in order

1. **Read §1 and §2 verbatim.** Re-check the w89 bytes at the cited lines before editing. v8 §1/§2.1 glow wording is wrong (§2.2 governs); v8 §2.2's `cp-quick` decision stands but its premise is false (§2.3 governs).
2. **Run `cd <your S14 cakepanz-4 tree> && bash scripts/acceptance-run.sh` first**, before any edit. Expect steps 13b-17 to record `EXIT_CODE=0` each and the run to end "ACCEPTANCE RUN COMPLETE". File the tail into `VERIFY-§26-append.txt:§26.5/§26.6`. If any step fails, stop, report step + command + stdout, and do not proceed on a red composite.
3. Strip the row-level ring and its visual; land the one-button top-three design, the all-button pulse, the sheen + TOP badge, and the three why lines.
4. **Re-point the six `visual.battery.mjs` selectors (including W14 leg A at `:292`) before running the batteries**, not after a failure.
5. Land the panel/glass restyle and the asserted tokens; keep Cinzel inlined and offline safe.
6. Re-law and re-falsify by name; regenerate the gate table from receipts; re-run the composite at final bytes.
7. File the side-by-side and the hand-over; hand the static build to the Owner + Claude.

## §6 · The fence

No edits to `src/engine/**`, `colors/`, the pin, ratings, `FLEX`, `RATING_SPECS`, `SLOTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, or `modelWeights()`. The `rawSort` engine-half proposal (`inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md`) stays **FILED and NOT APPLIED** — the engine is frozen. Whether it is called WITHDRAWN (hy4) or REOPENED (porca) is the Architect's label to set, not yours: report the question in the hand-over and do not relabel it yourself. Do not remove the display-rounded-oracle caveat from top-three copy unless the law it qualifies is gone. No gh-pages work, no make-live, no Cloudflare config or deploy. No new images in lanes, no dated/merged/final copies in the root, no force-push, no stash, no edits to files that are not yours. No weakening a law to make it pass — if a law dies for a real reason, say so and file the fix.

## §7 · Hand-over — all required; no receipt, no claim

1. Pushed commit hash on your own branch (or, if you have no push credentials, the zip + its sha256), plus directory + command + result for every claim, labelled V / R / I / U.
2. `node tools/verify-package.mjs .` → every entry OK, converse clean, exit 0 at final bytes; CHECKSUMS regenerated (it never lists itself).
3. `git diff --name-only 408410477 <your tip> -- colors/src` → empty; 69 engine files byte-identical; `src/engine` never edited.
4. Battery counts at or above the §0 floors with assertion names listed; swap test 29 pass / 0 fail / 10 skip / 3 deferred (the "26 pass" line is stale); falsifier all DIED by name with child logs; W14 probe PASS both directions; composite "ACCEPTANCE RUN COMPLETE".
5. Built `dist/` **and** `dist/single.html` with the sha256 of each, plus the zip sha256. The Architect + council decide the deploy unit; produce both, do not choose.
6. A **filed side-by-side** against live w89 at 390×844 and 1180×950, light and dark: Team Select, board with a top-three row, pick confirm, finished draft. "Directionally similar" fails. pickle coordinates this; you cannot file it from S14 alone.
7. A one-page note naming the new selectors (Draft button, TOP badge, why line) so the Architect can re-point the merge tests without guessing, plus any disagreement filed in your own inbox with the exact w89 byte that supports it.

## §8 · Definition of done

Composite complete (13b-17 recorded) · §2 corrections applied with bytes cited · one-button top-three design landed with the six selectors re-pointed · `dispatchAsync` contract fully met including L-ERR · panel assertions green · all gates at or above S14 floors with named laws · zero engine-byte diff · both dist forms + zip hashed · receipts for every claim · side-by-side plan filed · hand-over posted with commit hash. Then say **"slices done"** — the Architect merges and runs gates 1-10, and the Owner decides make-live after seeing the side-by-side.

## §9 · Provenance (for the record, not required reading)

hy4 `inbox/20261121-0100-hy4-TO-ZAI-continuation-prompt-S15-long.md` (`council/hy4 @ af72cd95`) and porca `inbox/20261121-0033-porca-TO-ZAI-continuation-order.md` (`council/porca @ 7d035feb`) were read in full before writing this. Byte claims in §§0/2/4/5 were re-verified by me this session from the mirrored S14 tree, `origin/gh-pages` and `origin/architect/engine-and-seats`. Where those two drafts disagreed (`cp-quick`, `suggestIds`, `rawSort`, law deletion), §§2.3, 2.6, 3 and 6 resolve from the Architect's v8 bytes and the Owner's words above.

=====================================================================
end of continuation order v2
=====================================================================
