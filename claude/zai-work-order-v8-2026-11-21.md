# Work order v8, revised (Architect, 21 Nov 2026, after the dfdb887 reviews)

Replaces the first v8 (dfdb887), which was held. Corrections taken from bytes read by three seats (R: hy4 `ecff7045`, porca `30e1f20c`/`485a8473`, pickle `cd5095fb2`): the first v8 had the w89 glow backwards, rested on a false `cp-quick` premise, and used S13 gate floors on an S14 build. I did not open the S14 tree; every S14 line number below is R.

Build on the S14 tree against engine pin **408410477**. **Zero engine bytes change.** `FLEX`, `RATING_SPECS`, `SLOTS` are untouched. This order states outcomes. How you get there is yours; show receipts.

## 1. Owner rulings (R: pickle `622b70a`, hy4 `inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`)
- Ring visual removed. Top-three meaning stays.
- "top three highlight should be present in the button like w89", "the little description of the top 3 choices of why the user would select that player", "w89 the buttons glow and there is a separate 'top' badge".
- Panels too boxy, not as colorful as w89: restyle toward w89.
- Deploy is Cloudflare, by the Architect and the Owner. You hand over a static build.

## 2. Outcomes
1. **One-click draft survives on the top-3 rows.** Today `cp-quick` (`BoardRow.svelte:47`) is the only immediate-dispatch control; `.cp-main` (`:25`) is an expander. R: `DraftBoard.svelte:116` wires `onpick` (staged confirm) and `onpickDirect={quickDraft}`. The finished board must still let the user draft a top-3 player in one click. Keep `cp-quick` as that control, or rewire the main button, your call. Whichever you pick: the board laws stay green by name, and W14 leg A (the click that creates the autosave for the shareable-link P0 law) still creates it, both directions, with its `savedSeed`/`savedPicks` assertions intact. If you rename or remove a locator, re-point every use (R: `visual.battery.mjs:98, :175, :199, :206, :230, :292`) and say so in the hand-over. Do not weaken a law to make it pass. Do not ship a top-3 row whose only visible control is the expander.
2. **Glow follows w89, not the first v8.** R, w89 `:12849-12855`: every Draft button pulses (`zpbBtnPulse`, with a reduced-motion guard); the top-3 buttons opt out of the pulse and get the sheen sweep (`:1749-1750`) in the drafting team's gradient (`zpb-ctabig`, `:6430`) plus a separate "Top" badge (`:6432`). Ordinary rows' buttons pulse; no `animation:none` on them. S14's `shell.css:181` (pulse only on `.cp-suggest .cp-quick`) has the same inversion; correct it. New `.cp-top` badge class (none exists today).
3. **Why copy**: the small "why this player" line stays, shown on the top 3 only. The ring-independent copy stays (`.cp-gonetip`, `.cp-sr`, `.cp-fitlbl` "Fills ...", `.cp-gonehow`). Update the stale "gold ring" comments.
4. **Panels** toward w89: assert `--glass`, `--glassbd`, `--shadow` equal w89's values, 22 px radii on the large panels, `.panel` per w89 (`:625`), contrast 2/0, no horizontal scroll at 390 px, DESC-1 green.
5. **dispatchAsync** per `claude/dispatchasync-contract-2026-11-20.md`: START (keep `pickSlot`), PICK, UNDO, LOAD together; `busy` flag; no sync/async mixing; law L-ERR. Every `__cp.store.dispatch` in batteries becomes `await __cp.store.dispatchAsync`, including `shell.battery.mjs` LOAD at `:66`/`:175` (S14). `window.__cp` keeps its six keys.
6. **Top-three ordering (`rawSort`).** R: the restored top-three highlight reopens how the top three are ordered. `rawSort` does not exist in `colors/` (VERIFIED: zero hits in `colors/` and `claude/` at dfdb887), so it lives in your tree. The top three must be the same three the pinned engine's ordering gives. If you cannot do that without changing a `colors/src` byte, stop and report; do not change engine bytes. A change in ordering semantics is a post-ship tuning call for me and the Owner.

## 3. Gates (named laws, not raw counts)
- Floors are the S14 finals (R: `README.md:3`, `START-OF-CHAT-ZAI.md:67-68`): board **>=19/0**, visual **>=18/0**, slot **>=28/0**, swap test 29/0/10/3. The S13 numbers (16/17) are provenance only.
- Retiring the ring will legitimately remove some assertions. List every retired law by name with the reason. Any law not on that list must still exist and pass. A smaller count with every surviving law named passes; a higher count with a missing law does not.
- Add assertions for outcome 2 (pulse on every Draft button; sheen + badge and no pulse on the top three; why copy on the top three only; no ring class) and L-ERR.

## 4. Hand-over (all required)
- Commit hash, path; `git diff --name-only 408410477 <tip> -- colors/src` empty.
- Battery results by named law, with the retired-law list.
- Built `dist/` plus sha256, and the zip sha256. The build contains one entry, the product (`index.html`); no dev page.
- Side-by-side against live w89 per `claude/visual-acceptance-spec-2026-11-21.md`. "Directionally similar" fails.
- Directory + command + result for every claim. No receipt, not claimed.

## 5. Not yours
Deploying, gh-pages, make-live, rollback, engine files, `colors/package.json` and lockfile (Playwright is already pinned by me), `claude/releases.md`.
