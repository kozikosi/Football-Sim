SPEAKER: porca | ROLE: advisor | TASK: draft a long, self-contained continuation order for Z.ai after the Architect's timeout | DATE: 2026-11-21T00:33Z
FOR: Owner to relay to Z.ai (build seat). Advisory — I edited no product, engine, pin, governance or queue file. Every fact here is bundled; Z.ai does not need an earlier chat. The three corrections in §3 OVERRIDE work order v8 as published; if Claude publishes a newer written order that contradicts them, stop and report the conflicting bytes rather than guessing.

=====================================================================
Z.AI CONTINUATION ORDER — from S14 to handover (21 Nov 2026)
=====================================================================

## 0 · Where the work actually is (read before you touch anything)

- The Architect's last push is `dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0` (parent `7d8d71c`). His following sitting timed out: **no newer commit exists on any remote ref**, so the published work order v8 is still the uncorrected one. Corrections are in §3 of this order.
- Your tree of record is the **S14 cakepanz-4 delivery** (`67-cakepanz-14-2026-11-20`), mirrored verbatim in several seat lanes. Work from your own S14 tree, not from `council/zai`'s older w55 packages and not from the `67-cakepanz/` snapshot on gh-pages (retired as a build target).
- **The shell is already complete.** `deliverables/SLICE-STATUS-2026-11-20.md` shows slices 1-5 and the season shell s6-s12 all BUILT with per-slice laws; `README.md:9` says "THE COMPLETE SHELL (slices 1–5 + … s6–s12)". Slice 3's acceptance is closed at `deliverables/ACCEPTANCE-p316-slice3-2026-11-20.md`; slices 4 and 5 got their per-slice rows in that audit. **Do not re-build slices 3-5.** Your remaining work is close-out, correction, migration, restyle and hand-over.
- S14 final-byte gates (REPORTED receipts in `VERIFY-§26-append.txt:§26.6`, not re-run by me): engine **430/430** · node **35/35** · board **19/0** · visual **18/0** · slot **28/0** · shell **48/0** · slice **29 pass / 0 fail / 10 skip / 3 defer** · contrast **2/0** (3 known team holes, 0 new token holes) · viewport **45/45, 0 overflow, 0 console/page errors** · golden seam MATCH · standalone falsifier set exit 0. Those are the floors, not the S13 numbers in v8.
- Engine pin **408410477**; `colors/src` tree `8d8a8a1e81386e99f53f995492904348cb7d8345`; 69 TS files. Zero engine bytes change. Protected constants (`FLEX`, `RATING_SPECS`, `SLOTS`, and the legacy `DEFAULT_WEIGHTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`) untouched.

## 1 · Your FIRST command, before any edit

```
cd <your S14 cakepanz-4 tree> && bash scripts/acceptance-run.sh
```
The S14 sitting hit its time budget: steps 1-13 recorded `EXIT_CODE=0`, step 13b BEGUN with no output, and steps 13b-17 are absent from `ACCEPTANCE-RECEIPTS.txt` (`VERIFY-§26-append.txt:§26.5`). Expect steps 13b-17 to record `EXIT_CODE=0` each and the run to end "ACCEPTANCE RUN COMPLETE". File the finished tail into `VERIFY-§26-append.txt` (the composite steps 14-17 also record gate-manifest and gate-numerals, which are "NOT YET RECORDED" at S14). If any step fails, **stop and report the step, command and stdout**; do not paper over it, and do not proceed to §2 on a red composite. The standalone falsifier run at the S14 bytes is already green (`§26.4`, `deliveries/receipts/partH-s14/`); the staged run is the missing receipt.

## 2 · Owner rulings in force (verbatim, 21 Nov, filed by pickle `622b70a` and hy4 `0020`)

> "top three highlight should be present in the button like w89"
> "the little description of the top 3 choices of why the user would select that player"
> "w89 the buttons glow and there is a separte 'top' badge"
> "i need to know further context and claude should decide" / "i need more context and claude should decide"

And later, on Cloudflare: "i want claude and the council to deicde oh how to deploy to cloudflare." Meaning:
- The **ring visual is removed**; the **top-three meaning stays**, expressed in the button: glow + a separate `Top` badge on the row.
- The top-3-scoped "why" copy (`cp-why`) is **kept**.
- Panels are too boxy and not as colourful as w89 — restyle toward w89.
- Deploy is Cloudflare, by the Architect and the Owner. **You do not deploy**; you hand over a Cloudflare-ready static build.
- Cloudflare's *how* is now the Architect's decision with council input (recommendation on record: Pages + explicit Direct Upload, not Git auto-deploy). This does not change your hand-over.
- `rawSort` is **REOPENED** but **not granted**: the engine stays frozen. Keep the top-three set derived from the first three array positions of the engine-sorted rows, as S14 does. Leave the paired engine diff in `inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md` FILED and BLOCKED; do not apply it. Update the INTERIM labels to say the display-rounded oracle remains pending the Architect's ruling, not that top-three itself is withdrawn.

## 3 · Three corrections to work order v8 — these override it

### 3.1 Do not remove `cp-quick` as v8:14 says (pickle `cd5095fb`, re-verified by porca)
v8:14 states "The glowing Draft button on a top-3 row is the one-click path, as in w89" and removes `cp-quick`. That premise is false in your S14 bytes:
- `src/lib/components/BoardRow.svelte:25` — `<button class="cp-main" onclick={() => (open = !open)} …>` is an **expander**.
- `src/lib/components/BoardRow.svelte:47` — `<button class="cp-quick" onclick={() => (onpickDirect ?? onpick)(r.id, r.slotId)}>` is the **only immediate-dispatch control**.
- `src/lib/components/DraftBoard.svelte:116` — `onpick={(id, slot) => (picked = { id, slot })}` **stages** the confirm banner; `onpickDirect={quickDraft}` **dispatches**.
- `DraftBoard.svelte:28-32, 54-62` — the 380 ms guard and confirm disarm are on the staged path; `cp-quick` bypasses them by design.

**Default (use this unless Claude rules otherwise): keep `cp-quick` as the one-click control.** Put the glow and the `.cp-top` badge on the top-3 row / its `cp-quick` button, keep the staged confirm on `cp-main`, and keep all six `.cp-quick` locators in `batteries/visual.battery.mjs` (`:98, :175, :199, :206, :230, :292`) — `:292` is W14 leg A, the click that creates the autosave for the P0 shareable-link law. Do **not** weaken W14. If instead you rewire `.cp-main` on top-3 rows to `onpickDirect`, that is a larger behaviour change: you must re-point all six locators, re-measure the board battery because L22 and the staged-confirm guard are affected, and say so in the hand-over. **Never ship "remove `cp-quick`, glow the expander"** — it leaves top-3 rows with no one-click draft.

### 3.2 Invert the glow scope to match w89 (hy4 `ecff7045`, re-verified by porca)
`origin/gh-pages:Football-Sim-Z-post-blue-w89.html:12849-12855` says, verbatim: "W66 (Owner): EVERY Draft button breathes (the top-3 law goes site-wide on the board), and the top-3 buttons graduate from the pulse to the progression treatment"; then `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}` and `button.resetbtn[data-pick].zpb-ctabig{animation:none;}`. Top-3 get the sheen (`:1749-1750`, `:6430`) and the separate TOP badge (`:6432`). Your S14 `src/lib/assets/shell.css:181` pulses only `.cp-suggest .cp-quick`, and v8 §2.1 says "glows on top-3 rows" — both backwards. Correct: pulse on **every** Draft button with the existing reduced-motion guard; sheen + `.cp-top` badge on the three; no `animation:none` on ordinary rows. Keep the colour on the house gold `--glow` token; no new hex literal; do not port `zpbstarglow`.

### 3.3 Gate floors are S14, not S13 (porca `0026`)
v8 §3 and runbook `:36` say "at or above the S13 baselines: board 15→16/0, slot 28/0, visual 15→17/0". Those are S13 receipts from `CUTOVER-CHECKLIST.md:20-22`. Use the **S14 finals from §0** as the floors and label 16/0 and 17/0 as S13 provenance only. A tree that regressed board 19→16 would pass v8 as written. Compare by **named laws**, not raw count: retiring ring-specific laws may legitimately shrink a battery, but no law may be dropped silently and no law may be weakened to make a mutant survive.

## 4 · Work items, in order

**A. Law migration for ring → button (after §1 is green).** Remove the ring *visual* (ring class, shimmer) from the top-3 rows; keep the top-three *set* (first three array positions of the engine-sorted rows), the tie-extension paired with the L13 oracle (still labelled INTERIM), the why copy (`cp-why`, VM-sourced from `src/lib/port/suggestWhy.ts`), and the `suggestIds[]` autosave persistence unless Claude explicitly orders its removal (it is data, not a visual ring, and W14 depends on the save path). Reword ring-named laws to top-3-button laws rather than deleting them: L13 (top-three identity), L23 (pulse, now every button), L24 (no display-parse), L25 (persistence), W14 (shareable/autosave precedence). Re-run the full falsifier set at the final bytes and keep every mutant dying **by named law**, with stdout in `deliveries/receipts/partH-<next>/`. Update the stale "gold ring" comments in `BoardRow.svelte` (`:8`, `:132` per v8 — re-locate by text) and keep the ring-independent copy: `.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` ("Fills …"), `.cp-gonehow`.

**B. dispatchAsync migration** per `claude/dispatchasync-contract-2026-11-20.md` (read the whole file; summary here):
- All four shell sites move **together**, never mix sync and async: START (keep `pickSlot` — it carries the Owner's draft-position choice), PICK (drop `as any`), UNDO (keep `refresh()` and `void autosaveDraftNow()`), LOAD (already live; a synchronous LOAD left behind breaks the contract). Anchor texts are in contract §2; line numbers shift once you edit above them, so re-locate by call text.
- Use `await store.dispatchAsync(…)`; add a `busy` flag set before each await and cleared in `finally`; disable pick/undo/start while set. Read the error from the resolved state with `error = st.error ?? ''` on **every** resolve (law **L-ERR**): a failed action shows its message, the next success clears it.
- Gone-odds numbers will differ from the shell's old `makeRng(seed*7+13)` because `selectors.ts` seeds from `makeRng(record.seed).fork('gone'+pos)` — the cutover law compares **method**, not digits. If you move to `selectBoardAsync`, keep the previous vm when `r.vm === null` and status is still `drafting`, clear it on `idle`.
- Batteries: every `__cp.store.dispatch` becomes `await __cp.store.dispatchAsync`, including the two LOAD calls in `shell.battery.mjs` (`:66` and `:175` in S14). `slice1.battery.mjs` has zero `__cp`/dispatch references but still needs timing changes: wait for `busy` to clear or for the new DOM state instead of assuming a synchronous pick. `window.__cp` keeps its six keys: `store, refresh, valuation, seasonFacade, go, vmStore`.
- Add assertions: top-3 rows have the glow and the badge; non-top-3 rows have neither (with the §3.2 inversion: every button pulses, only the three get sheen + badge); why copy only on top-3; no ring class; L-ERR both halves (force an illegal PICK, see the message; make a legal PICK, see it gone); W14 both directions unchanged.

**C. Panel restyle toward w89.** Assert the glass tokens `--glass`, `--glassbd`, `--shadow` equal w89's measured values (read them from the bytes; do not invent values); 22 px radii on the large panels; `.panel` styling per w89 (`w89.html:625`); contrast battery still 2/0 with no new token holes; no horizontal scroll at 390 px; DESC-1 green. This is the Owner's "panels too boxy / not colorful enough" ruling. Do not change engine, pin or protected constants to make a visual assertion pass.

**D. Close the composite and re-run gates at the final bytes** (§1, then after A-C). Keep S14's floors; add the new/changed assertions by name; record every command and its output.

**E. Hand-over package — all required, no receipt no claim:**
1. Commit hash and path; `git diff --name-only 408410477 <tip> -- colors/src` → **empty**.
2. Battery counts at or above §0 floors, with the assertion names listed; swap test 29 pass / 0 fail / 10 skip / 3 deferred (the "26 pass" line is stale); falsifier stdout with all mutants dying by name.
3. Built `dist/` **and** `dist/single.html` plus the sha256 of each, and the zip sha256. S14's last measured dist hashes are in `SHELL-STATUS.md`; re-measure at your final bytes. The Architect + council will decide whether the deploy unit is `dist/` or `dist/single.html` — produce both, do not choose.
4. A plan for the filed side-by-side against live w89 at 390×844 and 1180×950: Team Select, board with a top-3 row, pick confirm, finished draft. pickle coordinates it when a built tree exists; "directionally similar" is a FAIL. You cannot file it from S14 alone.
5. A `deliveries/` receipt for every claim: directory + command + result. Label V (you ran it), R (someone else says so), I (inferred), U (unknown). No console errors across START → 3 picks → UNDO → reload/LOAD → finish.

## 5 · Decisions you may make, with defaults (do not block on them)

| Question | Default | Source |
|---|---|---|
| Keep `cp-quick`? | **Keep** as one-click control; glow + `.cp-top` on the top-3 row/button | §3.1; Architect may rule otherwise |
| Remove `suggestIds[]` persistence? | **Keep** (data, not visual); W14 depends on the save path | Owner ruled on the ring *visual*, not the data |
| Apply the `rawSort` engine diff? | **No** — engine pinned; proposal stays FILED/BLOCKED, now REOPENED for Architect ruling | Owner top-three ruling; §2 |
| Reword or delete ring-named laws? | **Reword** by name, never silent deletion or weakening | §3.3 |
| w89 season carry-over (`KEY='zpb:season'`, `w89.html:18080`)? | **No import** — new build starts clean | runbook §5, default |
| Deploy target/config? | **Not yours** — hand over both dist forms with hashes | runbook §1.4, §5 |
| Guide copy freshness, card ink palette? | Leave as-is this round; report if you see a concrete defect | SLICE-STATUS "Not checked" |

## 6 · Not yours / deferred

Engine files, protected constants, `colors/` dependency or lockfile changes (Playwright is the Architect's at the merge), deploy, gh-pages, make-live, rollback, the side-by-side decision, and `claude/releases.md`. Defer save export/import, migration scaffold, quota class and multi-tab guard until **after** cutover — they change engine bytes and pin `408410477` must stay frozen through the merge. Multisport is parked per the Owner's 20 Nov ruling. `AGENTS.md` pin drift (`d3bd81d2` vs `408410477`) is MUSE's file. The Cloudflare account does not exist yet; that is the Owner's provisioning step.

## 7 · If anything conflicts

If Claude publishes a newer written order that disagrees with §3, **stop and report the conflicting lines with hashes** before choosing — do not silently implement both. If a gate fails, report the step and stdout; do not weaken a law to make it pass. If a correction changes a law name, the falsifier must die on the **new** name and that rename must be in the hand-over.

## 8 · Definition of done

Composite complete (steps 13b-17 recorded, "ACCEPTANCE RUN COMPLETE") · §3 corrections applied with bytes cited · dispatchAsync contract fully met including L-ERR · panel assertions green · all gates at or above S14 floors with named laws · zero engine-byte diff · both dist forms + zip hashed · receipts for every claim · side-by-side plan filed · hand-over posted with commit hash. Then say "slices done" — the Architect merges and runs gates 1-10, and the Owner decides make-live after seeing the side-by-side.

=====================================================================
end of continuation order
