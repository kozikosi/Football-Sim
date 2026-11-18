# Z.ai — Cakepanz-7 sitting (2026-11-18) — the receipts-and-docs close-out

From: MUSE (Inkling, delegated 2026-11-18 by the Owner) — drafted 2026-11-18T02:58Z, filed on `council/muse`.
For: Z.ai · Executor · one zip, one response, all steps complete · host may not push
Your last sitting (Cakepanz-6, 2026-11-18) is ACCEPTED with two fixes owed — both are receipts/docs, not code. This is the whole scope; resist the urge to add.

## 0 · State of the world (verified by the seats, cited)

- **The gates are green.** `node scripts/gate-manifest.mjs` → **PASS (326 entries, shipped) / PASS (330 entries, prepared)** — Ernie re-ran both fresh (b02b8182); I re-ran both (exit 0). The Cakepanz-5 prepared-manifest defect (5 hash mismatches + 1 unlisted, landed before your sitting) is **fixed and verified by two seats independently. Keep it that way: any file you touch ⇒ `node scripts/regen-manifest.mjs` ⇒ `node scripts/gate-manifest.mjs` ⇒ paste the PASS line; never hand-edit the manifest, never list a receipt in a manifest before its final write.**
- **The engine pins are honest on both trees.** `diff -rq <pin:colors/src> cakepanz-4/src/engine` (5c808472, 67 files, exit 0); prepared vs 65673a00 (68 files, exit 0); flex identical to the tip (17/17/42/23 at 0/2/6/12). Engine suites re-run by Ernie (394/394 shipped, 406/406 prepared on Node 26; my run: 394/394 on Node 24). `battery:node` = 28/28 on Node 24 and Node 26 (my run, both). N24 (body font/slogan/900 faces) and N23 (takeover: ≥3 accent tokens change, `--zcream` untouched) are green on both Nodes.
- **The takeover is wired, verified.** Three `[data-zpbteam]` blocks ride in `tokens-w89.css` (light + system-dark @media + `[data-theme=dark]`); my sha256 check of all 16 `shots/takeover/*.png` matches the receipt exactly; the bare dark-block defect you caught and fixed (light mode painting dark accents) is fixed with brace-aware N23. **Do not re-plumb the takeover. Do not re-solve contrast numbers (all 193 gold-class pairs PASS; the 51 hairline `NEW-FAIL` tags are ≥ 2.11 — better than the default baselines 1.60/1.41 — report stands).**
- **Slogan, shimmer, 900 weights, title, meta — verified present and inlined** (to the byte: Cinzel 700/900 rides the same variable file as the 100 face — two `@font-face` ranges, one payload; Decorative-900 adds 19,423 base64 chars ≈ 14,568 raw; 25,904 + 14,568 = 40,472 exactly; `prefers-reduced-motion` kills all animations; title = "76 Pancakes — Can you go 20-0?").

## 1 · The two fixes owed (the whole mechanical scope)

**PART A — receipt hygiene (Ernie's finding; the one fix).** `receipts/partB/gate-manifest-shipped.log` and `receipts/partB/gate-manifest-prepared.log` ship an intermediate **FAIL** line (`deliveries/receipts/gate-manifest-shipped-PASS-325.log` was unlisted at the time it was written). The tool and the trees are correct; the receipts as filed are not, and a verifier opening `receipts/` sees FAIL on a tree whose gates pass — the exact defect class the D-3 discipline exists to forbid. **Fix:** after your Part B edit lands, run `regen-manifest.mjs`, then `gate-manifest.mjs`, redirect each to the SAME paths with the final state; assert `PASS (326)` / `PASS (330)` (the counts may grow by your Part B edit — record what the gate prints, not what I predicted); paste both outputs into VERIFY §19.10. Any receipt generated this sitting follows the same law: **a receipt in this package is the raw stdout of the tool at the final state; if the state changes, the receipt is rewritten.** Name this law in FIXLOG §Part-I with your words.

**PART B — the prepared tree's door sign (my R-13 finding).** `cakepanz-4-prepared/README.md:1,3,8` and `SHELL-STATUS.md:1` still name `5c808472` / "67 files" — the sibling-shipped README, copied, not synced (the SNAPSHOT contract is correct: PREPARED, 65673a00, 68 files, diff exit 0). A reader trusting the prepared tree's README pins the wrong engine. **Fix:** one doc edit — the three README pin lines become 65673a00 / 68 files, and SHELL-STATUS gains the same; every one of those lines additionally keeps the sentence "this is the PREPARED, NOT ACTIVATED copy; SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the Owner says so." Then regen + gate on the prepared tree (expect PASS at whatever count the edit produces). **Do NOT activate the prepared re-pin. Do NOT change any pin anywhere to 65673a00 in the shipped tree — the two trees diverge by exactly the five paths; leave them that way.**

## 2 · The gh-pages fix package (placed by the Owner — you do not push it)

You staged `deliveries/gh-pages-fix/` (FIX-RECEIPT.md + the exact two corrected files + `67-cakepanz-gh-pages-fix-c6.zip` for the deployed `origin/gh-pages:67-cakepanz` — the 9 stale flex expectations from the pre-re-pin carried suite, and the stale README/CHECKSUMS pin lines naming 4ca9a071 over d3bd81d2 bytes). **The Owner places the two files; you do not push to `gh-pages`.** If the placement is done when you sit: re-run `node --test --experimental-strip-types test/` on the re-pinned deployed tree (expect **286/0**), paste it, and delete nothing else. If it is not done: file the placement instructions for the Owner VERBATIM (paths, the two files, expected 286/0 after) and nothing else — do not improvise a different fix.

## 3 · The w89 carry-throughs (already done — verify, don't redo)

`.cp-shine` shimmer on home + Guide + title + meta — present, `prefers-reduced-motion`-killed; Cinzel Decorative 900 + Cinzel 700/900 inlined and declared; system-sans body; `[data-zpbteam]` wired; wordmark leads `'Bodoni Moda', Didot, 'Bodoni MT', 'Playfair Display'` then falls back to the inlined Cinzel Decorative (Bodoni Moda itself stays OUT of the bundle **pending the Owner's ruling — do not inline it**). **The label stays `Model Value` (MEASURED_LABEL, the term unchanged, report-only). The 2PT chip stays as it is. The dark `--text` and the light-gold2 DEFAULT pair stay untouched. Every one of those is the Owner's word, never yours.**

## 4 · Verification protocol for this sitting (receipts or it didn't happen)

Same as cakepanz-6, with the two fixes above applied: on **both** trees after every file change — `gate-manifest` PASS with its printed count; engine suites on Node 24 (portable) and on Node 26 (host), both `battery:node`s; the full F0–F10 falsifier on both Node majors (F9's wrong-team plant and F10's Cinzel body plant must both DIE); the takeover probe screenshots only if any token or takeover file changed (else cite last sitting's 16/16 sha-verified set, don't re-shoot); the M3 logs present under the cited names (`swap-rehearsal-5c808472.log` PASS/0, `swap-m3-oldpin.log` FAIL/2-by-design) unchanged; the D-1 fresh-clone receipt unless your edits touch nothing outside `scripts/` + docs (then state that explicitly instead of re-running it). Any browser-dependent law you cannot run, name as such — "REPORTED" is a label, not a crime; "VERIFIED" is a claim and must carry the command.

## 5 · Delivery protocol

One zip (`cakepanz-7-2026-11-18` or later) containing both trees + receipts/ + the two fixed logs + this sitting's FIXLOG/VERIFY additions; all work complete before you respond; no push to any branch (the Owner places the zip); the Owner receives the receipt set; the seats re-run; you do not pre-answer their verdicts.

## 6 · What you must NOT touch

The flex table, the engine snapshot at either pin, the flex test, any protected constant, the prepared re-pin activation, the two open w89 rulings (Bodoni Moda, MEASURED_LABEL vs the shipped w89 label), dark `--text`, the light-gold2 DEFAULT pair, the 2PT chip, the GLM default, ratings of any kind, and `origin/gh-pages` itself (the Owner places the fix). If your sitting's path leads to one of those, stop and put it in your report as a question for the Owner — never around it.

## 7 · When you respond

Report: the two fixes (with before/after receipts: the two `receipts/partB` logs now PASS; README/SHELL-STATUS now name 65673a00/68), everything verified or named REPORTED, anything you could not run and why, and any new finding you surfaced (if none, say so — "nothing new" is a fine report). The seats will re-run; theirs is the PASS, yours is the submission.
