SPEAKER: hy4 | ROLE: advisor | TASK: review Architect's dfdb887 (contract/runbook/NOW/work-order v8) | DATE: 2026-11-21T00:30Z
FOR: Architect (Claude) · Owner · Z.ai relay. Two byte-proven defects before Z.ai starts; everything else in the report checks out.

REVIEW-OF: `origin/architect/engine-and-seats @ dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0` (parent `7d8d71c`), files `claude/NOW.md`, `claude/cutover-runbook-2026-11-20.md`, `claude/dispatchasync-contract-2026-11-20.md`, `claude/zai-work-order-v8-2026-11-21.md`.

## 0 · What I verified (all VERIFIED)

`git ls-remote` → `dfdb887`; `git diff 7d8d71c..dfdb887 --stat` → 4 files, +61/-23, exactly the four named. No `claude/releases.md` yet — consistent with the report ("create at the merge"). Contract §5 now credits pickle's byte read, lists all six `__cp` keys, names both LOAD calls (`:61/:170` S13, `:66/:175` S14) and adds law L-ERR. Runbook: five gh-pages lines rewritten, Playwright decided with pin/lockfile/`npm run test:ui` receipt, w89 key resolved to `zpb:season`, gate 5 recast as S13 floors not thresholds. Rollback = Cloudflare history primary + pinned artifact fallback, UNKNOWNs named. Visual acceptance = filed side-by-side + asserted tokens, seam golden unchanged. NOW.md marks the decisions and keeps multisport parked. All of it matches the report and the Owner's answers.

## 1 · DEFECT (byte-proven): the w89 glow scope is inverted

Claude's v8 §1/§2.1: "the Draft button **glows on top-3 rows**". S14's existing `shell.css:181`: `.cp-rows .cp-row.cp-suggest .cp-quick { animation: zpbBtnPulse 1.5s … }`.

w89 says the opposite, verbatim at `Football-Sim-Z-post-blue-w89.html:12849-12855`:
```
/* 7) the DRAFT button on top-priority rows breathes between static and hover (a visual guide) */
@keyframes zpbBtnPulse{…}
/* W66 (Owner): EVERY Draft button breathes (the top-3 law goes site-wide on the board),
   and the top-3 buttons graduate from the pulse to the progression treatment — filled in
   the drafting team's gradient with the sheen sweep … */
button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}
button.resetbtn[data-pick].zpb-ctabig{animation:none;} /* the hero buttons shimmer via the sheen, the brightness pulse retires for them */
```
So: pulse on **every** Draft button; top-3 buttons **explicitly opt out** (`animation:none`) and get the sheen instead (`:1749-1750` `tr.zpb-top3 button.slotdraft::after`, `:6430` `zpb-ctabig`, TOP badge `:6432`). The Owner's answer 3 — "w89 the buttons glow and there is a separate 'top' badge" — matches w89's every-button pulse + badge, not a top-3-only pulse.

This is the w89 line Claude himself flagged ("Z.ai may object with the w89 line that contradicts it"): it is `:12855`, and Z.ai would be right. S14's port had the same inversion, so this is a correction to three artifacts: Claude's v8, S14's `shell.css`, **and my own v8 relay/chat mockup** (I wrote "glow on the buttons" but drew the glow only on the three). I own my part of that error. Correct instruction: pulse on all Draft buttons with the reduced-motion guard; sheen + `.cp-top` badge on the three; no `animation:none` on non-top rows.

## 2 · DEFECT (P0 law breaks): removing `cp-quick` needs a battery re-point, and v8 does not order it

Claude's v8 §2.2 removes `cp-quick` ("the glowing Draft button on a top-3 row is the one-click path"). In S14, `batteries/visual.battery.mjs` uses `.cp-rows .cp-row.cp-suggest .cp-quick` at **six** sites — `:98`, `:175`, `:199`, `:206`, `:230`, **`:292`**. Line `:292` is W14 leg A, the click that creates the autosave for the P0 shareable-link law. Remove the selector without re-pointing and W14 fails for an unrelated reason — exactly pickle's F8, now live.

v8 §2.4 orders "no `cp-quick`" as an assertion but never tells Z.ai to re-point the six existing legs to the new single Draft-button path. Add one line before the work order goes out:
> Re-point every `.cp-quick` locator in `batteries/visual.battery.mjs` (`:98, :175, :199, :206, :230, :292`) to the new single Draft button. W14 leg A at `:292` must still create the autosave; keep both directions and the `savedSeed`/`savedPicks` assertions. Do not weaken W14 to make it pass.

My own v8 relay said "do not assume pickle's F8 re-point is needed, measure it" — that was right *then* (button survived in my reading). Claude's decision to remove `cp-quick` makes the re-point necessary; my note is superseded by his call.

## 3 · Minor / non-blocking

- v8 cites pickle's `622b70a` and the 22:46Z filing but not the Owner's direct five answers (`inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`), which are the ones that settle "top three only" for the why copy. Add as provenance; no behaviour change.
- NOW.md keeps RULINGS at REPORTED. Conservative and acceptable; pickle's verbatim filing is available if Claude wants VERIFIED.
- `claude/releases.md` absent at this tip — expected, it is merge-time work per §4 of the report.
- The rest of the report (L-ERR, gate-5 floors, rollback A+B, side-by-side, Playwright, multisport parked) is consistent with the Owner's answers and with the context I filed. No objection.

## 4 · Recommendation

Hold the v8 relay until the two lines above are folded in: invert the glow per w89 `:12853-12855`, and order the six-selector re-point. Both are small, reversible doc edits in Claude's files; I edited none of them. Z.ai should not start with the current v8 as-is.

— hy4
