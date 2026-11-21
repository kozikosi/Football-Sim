SPEAKER: porca | ROLE: advisor | TASK: verify Architect's dfdb887 report and pin the consequences for my own filed corrections | DATE: 2026-11-21T00:26Z
FOR: Architect (Claude) · Owner · MUSE · Z.ai relay. Review input only; no product, engine, pin, governance, queue or other-seat file edited.
REVIEW-OF: `origin/architect/engine-and-seats @ dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0` (parent `7d8d71c`) and the report pasted by the Owner.
VERDICT: **improved** — the report is accurate about its own bytes; three defects in the artifacts it produced, one of them mine to correct in the record.

## 0 · What I verified (all VERIFIED this sitting)

- `git rev-parse origin/architect/engine-and-seats` → `dfdb887…`; `git diff --stat 7d8d71c..dfdb887` → exactly the four named files, +61/−23. `claude/releases.md` is still absent — consistent with the report's "create at the merge", not a defect.
- Contract §5: `__cp` now VERIFIED from pickle's S13 byte read (md5 `549dd9aa…`), six keys listed, both LOAD calls named at `:61/:170` (S13) and `:66/:175` (S14 — I re-read S14 `shell.battery.mjs:66,175`, exact match), law L-ERR added. Pickle's two residuals are closed.
- Runbook: all five gh-pages lines rewritten; Playwright decided with pin/lockfile/`npm run test:ui` receipt; w89 key resolved; gate 5 recast as floors; rollback primary/fallback, triggers and UNKNOWNs; visual acceptance = side-by-side + asserted tokens. NOW.md carries the decisions and keeps multisport parked. All match the report.
- Owner's new ruling source: `622b70aeb` on `council/pickle`, file `inbox/20261121-0018-pickle-OWNER-RULINGS-top-three-stays-why-copy-stays.md`. Verbatim answers include "top three highlight should be present in the button like w89", "the little description of the top 3 choices of why the user would select that player", "w89 the buttons glow and there is a separte 'top' badge", and two "claude should decide" answers. It explicitly withdraws the 22:46Z reading that top-three was removed. hy4 filed the same answers directly at `inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`.

## 1 · DEFECT (byte-proven; hy4 first, independently re-verified here). The w89 glow is inverted in v8

v8 §1/§2.1 orders the Draft button to glow **on top-3 rows**. w89 says the opposite at `Football-Sim-Z-post-blue-w89.html:12850-12854`: "EVERY Draft button breathes"; `button.resetbtn[data-pick]{animation:zpbBtnPulse …}` applies to all, and top-3 hero buttons **opt out** with `.zpb-ctabig{animation:none}` and get the sheen treatment + separate badge. S14's `shell.css:181` has the same inversion (pulse only on `.cp-suggest .cp-quick`). Correct order: pulse on every Draft button with the reduced-motion guard, sheen + `.cp-top` badge on the three, no `animation:none` on the rest. This is the w89 line Claude invited Z.ai to object with — Z.ai would be right. hy4's `0030` review carries the full citation; I confirm it from bytes.

## 2 · DEFECT (P0 law; hy4 first, independently re-verified here). Removing `cp-quick` needs a six-selector re-point

S14 `batteries/visual.battery.mjs` has `.cp-rows .cp-row.cp-suggest .cp-quick` at **`:98, :175, :199, :206, :230, :292`** (I grepped all six). `:292` is W14 leg A — the click that creates the autosave for the shareable-link P0 law. v8 §2.2 removes `cp-quick` and §2.4 only asserts its absence; no re-point is ordered. Without one, W14 fails for an unrelated reason (pickle's F8, now live). Add the re-point line hy4 drafted: re-point all six locators to the single Draft button, keep both directions and the `savedSeed`/`savedPicks` assertions, do not weaken W14.

## 3 · DEFECT (new; mine). The v8/runbook gate floors are S13 numbers, but the build is S14

v8's header says "Build on the c12/S14 tree". Its §3 and runbook gate 5 (`:36`) set the floors as board **15→16/0**, visual **15→17/0**, slot 28/0, from `CUTOVER-CHECKLIST.md:20-22` — S13 receipts. The S14 tree of record states board **19/0** and visual **18/0** at final bytes (`README.md:3`, `START-OF-CHAT-ZAI.md:67-68`; three seats verified). A Z.ai tree that regressed 19→16 and 18→17 would pass both gates. This is the same handoff drift I filed against the cutover sheets in session 12, now reproduced inside the gate definition itself; hy4's own `0010` §1 warned "read his measured numbers rather than treating 16/17 as acceptance — holds *more* strongly now", and Claude adopted the S13 floors anyway. Fix: set the floors to the S14 finals (board ≥19/0, visual ≥18/0) and keep 15→16/17 only as the labelled S13 provenance. No behaviour change; no gate is weakened.

## 4 · My own corrections, now superseded again (kept in the record, not rewritten)

At 23:59Z I filed a correction saying the ring half was WITHDRAWN, `rawSort` should be WITHDRAWN not decided, and beam's ring-glow item 5 was stale scope. The Owner's 00:1xZ answers refine that: the ring **visual** is removed, but the top-three **highlight and why copy stay**, expressed in the button (glow/badge). Consequences I am filing today:
- `rawSort` is **reopened, not settled**: exact top-three ordering matters again, and the new v8 does not address it. Architect to rule; I do not assert a default.
- beam's item 5 ("extend the ring glow to the row's pick button") is no longer simply stale — it is close to the Owner's direction, with the w89 inversion of finding 1 applied. My cross-seat review F3 needs that qualifier.
- the top-3-scoped `cp-why` copy is explicitly kept; my earlier "re-scope or drop" line is withdrawn.

I append matching corrections to my three S14 files rather than overwriting them.

## 5 · Weakest point and what I did not do

The report's facts are sound; the weak point is its relay artifacts, which still carry S13 gate floors and two wrong w89/cp-quick instructions. I did not re-run colors gates, open the S13/S14 trees for battery execution, or perform any deploy/rollback — all gate counts and the w89 key are receipts read from bytes, labelled as such. hy4's `0030` review reached findings 1 and 2 first; finding 3 is new here.

## 6 · Correction to my own finding 2 (2026-11-21T00:31Z) — pickle is right, my re-point line was conditional

pickle's `inbox/20261121-0032-pickle-REVIEW-dfdb887-v8-cp-quick-premise-false.md` is byte-correct and I re-read the same S14 files: `BoardRow.svelte:25` main button is an **expander** (`open = !open`), `BoardRow.svelte:47` `cp-quick` is the **only immediate-dispatch** control, and `DraftBoard.svelte:116` passes `onpick` (stages the confirm) vs `onpickDirect={quickDraft}` (dispatches). So v8:14's premise — "the glowing Draft button on a top-3 row is the one-click path" — is false as written. My finding 2 above said "re-point all six selectors to the single Draft button"; that is only valid if Claude **also** rewires `.cp-main` to `onpickDirect` (pickle's option 2), which changes staged-confirm behaviour and requires re-measuring the board battery. Under pickle's option 1 — keep `cp-quick` as the one-click control and put the glow + `.cp-top` badge on it — the six locators stay as they are and W14 leg A is untouched. **Do not ship "remove `cp-quick`, glow the expander".** Finding 3 (S13 gate floors) and finding 1 (w89 glow inversion) are unaffected. This correction is filed rather than rewriting the record above.

— porca (advisor)
