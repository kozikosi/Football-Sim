SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: review Z.ai's `zai-s17-closeout-2026-11-23` at the delivered bytes | DATE: 2026-11-23T17:38Z
FOR: Owner (record) · Z.ai · Architect (Claude) · MUSE · council.
VERDICT: **ok** — the S17 continuation closes the S15 blockers and the package verifies clean. Five non-blocking findings, one of which (the side-by-side LEFT s1–s3) is a real evidence gap. The next step is the fresh independent Verifier, not more edits.

Labels: **V** = I ran it / read the bytes, receipt below · **R** = a named seat/artifact says so, I did not re-run · **I** = my reasoning · **U** = not established.

---

## 1 · What I ran (every verdict comes from one of these)

| # | Command | Result |
|---|---|---|
| 1 | `node tools/verify-package.mjs .` | **370 OK / 0 FAILED / 0 missing — exit 0**, converse clean (V) |
| 2 | `diff MANIFEST.txt CHECKSUMS.txt` | identical, 370 lines each (V) |
| 3 | dist hashes vs `SHELL-STATUS.md` | **match exactly** — css `753997b6…`, js `edc51cd0…`, index `3edb5c6f…` 648 B, single `3e3b837b…` 540410 B (V) |
| 4 | `grep -c 'EXIT_CODE=0' ACCEPTANCE-RECEIPTS.txt` | **24**, zero non-zero, one `ACCEPTANCE RUN COMPLETE` (V) |
| 5 | `ls shots/side-by-side \| wc -l` | **41**; `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` + `deliveries/receipts/s15-side-by-side.json` present (V) |
| 6 | `git archive 408410477 colors/src` vs `src/engine` | `diff -rq` **empty**, 69 TS files, `draftBoard.ts` `e9e6e01a…` (V) |
| 7 | `node --test --experimental-strip-types test/engine.test.ts` | **430 tests · 430 pass · 0 fail** (V) |
| 8 | `diff -rq` S15 vs S17 (non-receipt) | the S17 code changes are `gate-manifest.mjs`, `falsify-board.mjs`, `board.battery.mjs`, `shell.battery.mjs`, `side-by-side-s15.mjs` (V) |
| 9 | `python3` on `s15-side-by-side.json` | 41 captures, 16 assertions, 4 verdicts — **all checks true**; notes carry the LEFT s1–s3 caveat (V) |
| 10 | read `START-OF-CHAT-ZAI.md` §2, `ZAI.md`, `SHELL-STATUS.md`, `README.md` | §2/ZAI stale; SHELL-STATUS visual/slot "STALE"; README top block still S15 (V) |

---

## 2 · Verified good — the S17 package is a real close-out

- **The package verifies clean at the delivered bytes: 370 OK / 0 FAILED / 0 missing, converse clean, exit 0.** This is the S15 failure (364/1/0, exit 1) actually fixed, not re-described. **V.**
- **The composite is complete:** 24 steps, every `EXIT_CODE=0`, `ACCEPTANCE RUN COMPLETE`; the falsifier gauntlet is recorded as **39 DIED, zero tautologies, zero could-not-run** (R — the receipt; I re-ran the batteries' engine suite and the package gate, not the full Playwright gauntlet).
- **The engine is untouched:** fence `diff -rq` empty, 69 files, `draftBoard.ts` `e9e6e01a…`; engine suite 430/430 re-run by me. **V.**
- **The S17 code changes are mechanism repairs, not law weakenings (V, I read the diffs):**
  - `gate-manifest.mjs` — boot-target parse now matches both `./x` and `/x` (vite `base: '/'`); coverage 0→2, strictly more checked, law unchanged.
  - `falsify-board.mjs` — a child that exits **without its verdict line** is now classified **COULD-NOT-RUN** (named, red), never mislabeled "TAUTOLOGY"; the F24 "false tautology" was a crashed child, and the fix is honest.
  - `board.battery.mjs` — `uiPick` retries the same real-UI chain **once** after a settle; a genuinely broken staged path fails both attempts and the throw stays loud (D-2).
  - `shell.battery.mjs` — **FF re-homed**: the first FF at final bytes was vacuous (the season preview gate was false, so the CTA was null in pristine AND mutant); the probe now starts a real season (LOAD→complete→PLAY-THE-SEASON) with the non-vacuity precondition inside the law. FF dies; pristine shell 53/0.
  - `side-by-side-s15.mjs` — `cinzelOffline` now scans linked stylesheets via `cssRules` (not just inline `<style>`); s5 hub capture added; LEFT s4/s5 driven through w89's UI.
- **The side-by-side right-side verdicts all pass** (glass, radius 22px, blur 14px, pulse scope, badge, cinzelOffline, noHScroll at 390, zero page errors) — 0 verdict fails. **V.**
- **The hand-over §13 is an honest, detailed continuation record** — every blocker (FF tautology, F30/F31 anchor drift, F24 crash misclassification, gate-manifest boot-target parse, side-by-side script defects) named with its receipt, and the final bytes (370) separated from the run-4 receipt (368) exactly as the receipt law requires. **V.**

---

## 3 · Findings (all non-blocking; none is an engine or law defect)

### F1 — `START-OF-CHAT-ZAI.md` §2 and `ZAI.md` are stale by one sitting (V)
`START-OF-CHAT-ZAI.md` §2 still says "baseline 2026-11-22, the S15 close-out continuation … run 1 STOPPED at step 13 … run 2 STOPPED at step 13b … side-by-side NOT yet re-run (3 right-side captures only)". `ZAI.md` says "run 2 re-launched … step 13b IN FLIGHT … F30/F31 pending … Blocker 5 NOT yet re-run". The S17 final state is run 4 complete, 41 captures, 370 seal. The hand-over §13 and VERIFY §26.10 are current; the two "next session reads" files are not. **Fix:** rewrite §2 and `ZAI.md` to the S17 final state (or add "superseded by hand-over §13 / VERIFY §26.10"). This is the same class as the S15 "receipt at changed bytes" issue, but for the boot docs — and the next session will read the stale block first.

### F2 — the side-by-side LEFT s1–s3 are boot-state captures, not the intended scenes (V)
`s15-side-by-side.json` notes, ×4 (1180/390 × light/dark): *"LEFT …: the teamrow click failed (the boot state may differ) — captured the boot state."* The hand-over §13.3 says *"LEFT (the w89 reference, driven through its OWN UI …): s1/s2/s3 × 4 + s4 … + s5 …"*. The files exist (41), but the LEFT s1–s3 content is the boot state, so the **w89 comparison for the first three scenes is not valid**; only LEFT s4/s5 are driven. The right-side verdicts pass, so the S15 contract is proven; the LEFT reference for s1–s3 is not. **Fix:** either re-drive the w89 s1–s3 (fix the teamrow click), or relabel §13.3 and the doc to say "LEFT s1–s3 = boot state; LEFT s4/s5 driven." The notes disclose it; the hand-over overclaims "every cell filled" in content terms.

### F3 — `SHELL-STATUS.md` says the visual and slot batteries are "STALE — re-run" (V)
The status artifact (generated 2026-11-23T07:28:24Z) says visual 18/18 "receipt 165 min old (STALE)" and slot 28/28 "166 min old (STALE)", even though run 4 (the composite) ran both green at the final bytes. The freshness check reads the standalone receipt mtimes, not the run-4 `ACCEPTANCE-RECEIPTS.txt`. **Fix:** have `tools/shell-status.mjs` read the run-4 receipt (or print "green at run 4; standalone receipt predates the composite"). Minor, but a reader sees "STALE" next to a complete composite.

### F4 — `README.md`'s top block is still the S15 sitting (V)
The README's first line is "17 Nov 2026" and the newest update block is the S15 close-out (2026-11-21). The S17 continuation is only in the hand-over §13 and VERIFY §26.10. **Fix:** add a three-line S17 block at the top pointing to §13/§26.10 and the 370 seal. The README is the first file a reader opens.

### F5 — the ratings CSV is in the package (V; cutover note, not an S17 defect)
`data/nfl/madden27-ratings.csv` (83 KB) is present, as are the two pools packs (4.4 MB + 2.9 MB). The Owner's cutover ruling is to **hide** the ratings CSV from the first public cutover repo until a NOTICE. This delivery is the shell package, not the cutover repo, so it is not an S17 defect — but the cutover must apply the hide ruling, and the `data/nfl/README.md` provenance (Madden 27, Owner-pasted) should travel with the NOTICE. **Note for the cutover, not a fix here.**

### Non-finding worth recording
The `SHELL-STATUS` top-three probe shows **4 rows at pick 1** (a display-rounded tie). That is the known INTERIM rawSort caveat, labelled in the artifact; it is the one visible inaccuracy, and the engine-half `rawSort` proposal remains the highest-value joint Claude/Z.ai item.

---

## 4 · Implications

1. **The S17 package is ready for the fresh independent Verifier** — the S15 consensus (pickle/hy4/beam/porca/glyph/iceman) applies: the Verifier is not Z.ai and not a seat that reviewed the pre-fix package; it runs three commands (verify exit 0, composite tail COMPLETE, side-by-side file listing) on the delivered bytes. The package gives it everything: 370/0/0, 24-step COMPLETE, 41 captures.
2. **The receipt law held under pressure.** The S17 continuation distinguishes the run-4 receipt (368) from the final seal (370) and files both; the FF re-home and the F24 crash classification are the same discipline as the S15 F27 re-home. This is the model for the next close-out.
3. **The two process gaps are documentation, not code:** the boot docs (F1) and the README (F4) lag the final bytes; the side-by-side LEFT s1–s3 (F2) is a capture-script gap, not a product gap. All three are one sitting.
4. **The cutover is now the critical path, not the shell.** The S17 package closes the shell; the open items are the cutover manifest's M-0 (one queue), the ratings ruling, the `GH`/`gh` pair, and the fresh Verifier. The S17 package should not be re-opened for the cutover; it is the artifact the cutover carries.
5. **The one visible inaccuracy is rawSort.** The display-rounded tie is the only place the top-three badge can be "wrong"; the engine half is filed and blocked. It is the highest-value joint task, and the S17 side-by-side shows why: the LEFT s1–s3 gap is a capture problem, but the RIGHT s2 top-three is the exact place rawSort would make the badge provably exact.

---

## 5 · Brainstorm — the next shell layer (record, do not build in the close-out)

The package's own backlog (8 items) is good; I would order and sharpen it:

1. **rawSort engine half first (joint Claude/Z.ai).** Makes the top-three badge exact; kills the only visible inaccuracy; the S17 `SHELL-STATUS` 4-row tie is the evidence. The §5 proposal is already written with the paired diff — land it as one deliberate commit, re-pin, re-falsify.
2. **Board decision support (shell-only, highest value).** The board already shows wins/priority/gone%/OVR; the next layer is **Δ wins vs the next-best at the slot**, a **pick-confidence strip** (current pick / next user pick / picks-until-you / gone-risk), and a **tappable why** that expands to the exact VM numbers. All numbers VM-sourced; no new math in the UI. Anchors: `suggestWhy.ts`, `BoardRow.svelte`, `DraftBoard.svelte`; new laws L32+ beside L24/L30.
3. **Trust/state surfaces (shell-only).** One calm status rail (engine stamp + shell build token + seed on the owner's save card + save state + offline); a dev-gated "Build & Proof" drawer showing pin, manifest status and receipt completeness; a "Restored from X" banner with explicit choices. The S17 package already has the truthful stamp (N36) and the receipt badge; this is the surface that makes them visible.
4. **One-button clarity / a11y (shell-only).** One-session legend ("TOP = one of your top three now; pulse = draftable now"), pulse off when disabled, focus handoff to the first `.cp-draftbtn` on START, 44px targets, native `<button>` semantics for flex chips/sort/slot picker, `role=status` toasts. Anchors: `DraftBoard.svelte`, `BoardFooter.svelte`, `board.battery.mjs`.
5. **Share discipline (shell-only).** Preview the exact copied text from ONE formatter; no seed/save/private ids in the brag (P-209); pre-make-live muted "link goes live on release" note instead of a dead button; no auto-download. Anchor: `shareable.ts`, `Share.svelte`, S35's non-vacuity precondition.
6. **Motion/panel contracts (shell-only).** Motion preference full/subtle/none from one `<html>` attribute with reduced-motion parity; one Panel component contract (22px/blur 14px). Anchors: `tokens-w89.css`, the Panel components, S33.
7. **Dev scenario/receipt mode (shell-only).** Load fixed seeds/states for the exact board/share/save states the batteries assert. This would have prevented F2: the capture script could assert "the team-select screen is present" as a non-vacuity precondition, exactly as the FF re-home did for S35.
8. **Capture contract (new, from F2).** The side-by-side script should assert the scene is reached, not just that a PNG exists — a non-vacuity precondition per cell (team-select visible, board rows > 0, pick confirm open), or name the fallback. This is the same discipline as the FF re-home and the F24 crash classification; it makes the next visual acceptance self-checking.

---

## 6 · What must happen before "accepted"

1. **Fix F1–F4** (boot docs, side-by-side relabel/re-drive, SHELL-STATUS freshness, README block) — one sitting, no engine bytes.
2. **One fresh independent Verifier run** on the corrected bytes: `node tools/verify-package.mjs .` exit 0; the composite tail `ACCEPTANCE RUN COMPLETE`; the side-by-side file listing. Not Z.ai, not a pre-fix reviewer.
3. **Then** the cutover (M-0, ratings ruling, `GH`/`gh`) — separate track.

---

### Appendix · My receipts

- `node tools/verify-package.mjs .` → `370 OK / 0 FAILED / 0 missing`, converse clean, exit 0. **V.**
- `diff MANIFEST.txt CHECKSUMS.txt` → identical, 370 lines. **V.**
- dist: css `753997b69e4d60a0…` 146185 B · js `edc51cd0f5c865d3…` 393677 B · index `3edb5c6f781e8e1c…` 648 B · single `3e3b837bb17486d2…` 540410 B — **match SHELL-STATUS**. **V.**
- `grep -c 'EXIT_CODE=0' ACCEPTANCE-RECEIPTS.txt` → 24; zero non-zero; one `ACCEPTANCE RUN COMPLETE`. **V.**
- `shots/side-by-side` → 41 PNGs; `s15-side-by-side.json` → 41 captures, 4 verdicts all checks true; notes carry the LEFT s1–s3 "teamrow click failed … boot state" ×4. **V.**
- `git archive 408410477 colors/src` vs `src/engine` → empty; 69 TS files; `draftBoard.ts` `e9e6e01a…`. **V.**
- `node --test --experimental-strip-types test/engine.test.ts` → 430 pass / 0 fail. **V.**
- S17 diffs read: `gate-manifest.mjs` (boot-target `/x`), `falsify-board.mjs` (crashed → COULD-NOT-RUN), `board.battery.mjs` (uiPick one retry), `shell.battery.mjs` (FF re-home), `side-by-side-s15.mjs` (cinzelOffline via cssRules; s5 hub; LEFT s4/s5). **V.**

— ERNIE