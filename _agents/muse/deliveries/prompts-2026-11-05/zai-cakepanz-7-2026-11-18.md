# Z.ai — Cakepanz-7 sitting (2026-11-18) — the receipts-and-docs close-out (v2, supersedes v1 @ 5b63a7ff)

From: MUSE (Inkling, delegated 2026-11-18 by the Owner) — v2 drafted 2026-11-18T03:45Z, filed on `council/muse`.
For: Z.ai · Executor · one zip, one response, all steps complete · you do not push
Your last sitting (Cakepanz-6, 2026-11-18) is ACCEPTED with two fixes owed — both receipts/docs, not code. v2 folds in Beam's `inbox/20261118-0340-beam-zai-cakepanz6-continue-prompt.md` where it is right, and rejects its stale manifest premise (below). This is the whole scope; resist the urge to add.

v2 changelog: **+§1-PART-A evidence** (two fresh `gate-manifest` PASS runs refute "manifest FAIL"; Beam's prompt item 1 as filed is withdrawn); **+§B2** (prepared tree carries tip `<= 18` no-arbitrage bound — verify-only, my independent check confirms line 111; STOP if otherwise); **+§4** (D-1 fresh clone is MANDATORY, both Node majors, not conditional); **host attribution corrected** (delivery is on `council/inkling` @ `60171cb4`, not `council/beam`); the rest of v1 stands. The full verdict table of the seats' reviews is in the Owner's hands.

## 0 · State of the world (verified by the seats, cited)

- **The gates are green.** `node scripts/gate-manifest.mjs` → **PASS (326, shipped) / PASS (330, prepared), exit 0** — re-run fresh by Ernie (01:41Z) and by me (01:45Z). The intermediate `receipts/partB/*.log` still say FAIL (the log listed itself before it was written) — **those two logs are the stale artifact, not a defect in the tree; do NOT "fix" the gate, regenerate the logs (PART A).** Cakepanz-5's prepared-manifest defect is fixed and twice-verified.
- **The engine pins are honest on both trees.** shipped = `5c808472` (67 files pass-equal), prepared = `65673a00` (68 files pass-equal; flex identical to the tip: 17/17/42/23 at 0/2/6/12). Engine suites re-run by Ernie (394/394 shipped, 406/406 prepared); mine 394/394 on Node 24; `battery:node` = 28/28 on both Nodes. N23 (takeover ≥3 accent tokens, `--zcream` untouched) and N24 (system-sans body, slogan, 900 faces) green on both Nodes.
- **The takeover is wired, verified.** Tokens remap blocks ride in `tokens-w89.css` with the dark block on `@media` (your fix); my sha256 check of all 16 `shots/takeover/*.png` matches the receipt exactly; contrast 193/193 gold-class PASS (hairlines ≥ 2.11, above the 1.60/1.41 defaults). **Do not re-plumb the takeover, do not re-solve contrast, do not re-shoot unless a token file changes.**
- **Slogan, shimmer, 900 weights, title, meta — verified present and inlined** (Cinzel 700/900 rides the same variable file as the 100 face — two `@font-face` ranges, one payload; Decorative-900 = 19,423 base64 chars ≈ 14,568 raw; 25,904 + 14,568 = 40,472 exactly; `prefers-reduced-motion` kills all; title "76 Pancakes — Can you go 20-0?").

## 1 · The fixes owed (the whole mechanical scope)

**PART A — receipt hygiene (Ernie's finding; your Part-B interaction).** `receipts/partB/gate-manifest-shipped.log` and `receipts/partB/gate-manifest-prepared.log` ship an intermediate FAIL. **Fix:** after PART B lands, run `node scripts/regen-manifest.mjs` then `node scripts/gate-manifest.mjs`, redirect each to the SAME paths, assert output `PASS (N)` (N is the count the gate prints — expect growth of exactly the files your PART B edit changes; do not predict it), paste both into VERIFY §19.10. **Newton's law for the package: a receipt in this delivery is the raw stdout of the tool at the final state; if the state changes, the receipt is rewritten. Any receipt you ship follows this and Beam's "exclude receipt logs from the gate" is explicitly rejected — the gate semantics stay self-referential-by-design; only the receipts move.**

**PART B — the prepared tree's door sign (my finding, your residual).** `cakepanz-4-prepared/README.md:1,3,8` and `SHELL-STATUS.md:1` still name `5c808472` / "67 files" — the sibling-shipped README copied, not synced. **Fix:** 65673a00 / 68 files on each line; each keeps "PREPARED, NOT ACTIVATED — SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the Owner says so." Then regen + gate on the prepared tree (whatever count the edit produces). **Do NOT activate the prepared re-pin. Do NOT change any pin to 65673a00 in the shipped tree.**

**PART B2 — the prepared tree's no-arbitrage line (Beam's ask; you verify, never edit).** `cakepanz-4-prepared/test/engine/nfl/lineup.test.ts` carries the tip's `bad.length <= 18` bound at line 111 (tip `65673a00`; shipped `5c808472` identically; the deployed gh-pages tree still carries the stale `<= 12` behind its red suite). **Verify: grep the line; report the number you see (must be 18). If you see 12 or anything else: STOP, do not touch anything, file it as a finding.**

## 2 · The gh-pages fix package (placed by the Owner — you do not push it)

`deliveries/gh-pages-fix/` (FIX-RECEIPT.md + the exact two corrected files + `67-cakepanz-gh-pages-fix-c6.zip`) re-points the deployed tree's stale flex expectations: after placement, `node --test --experimental-strip-types test/` must print **286/0**. **The Owner places the files; you do not push to `gh-pages`.** If it is done when you sit: re-run, paste 286/0, done. If not: file verbatim shoelace instructions and nothing else.

## 3 · The w89 carry-throughs (verify, don't redo)

System-sans body (N24); slogan+shimmer (both modes, Guide+home+title+meta, `prefers-reduced-motion` honoured); 900 weights inlined and declared; system font-body verified in the built artifact; takeover wired (N23 at 28/28 green); wordmark stack unchanged (Bodoni Moda stays OUT the bundle pending the Owner); MEASURED_LABEL untouched (`Model Value`, report-only); 2PT chip untouched; dark `--text` untouched; light-gold2 DEFAULT untouched. **All the Owner's, never yours.**

## 4 · Verification protocol (mandatory, for this sitting)

After every file change on **both** trees: `node scripts/gate-manifest.mjs` (paste the count); `node --test --experimental-strip-types test/engine.test.ts` on **Node 24** (portable) and Node 26 (host) — both full suites; `npm run battery:node` on both (expect 28/28 each); then **the full fresh-clone receipt, mandatory**: clone to a scratch dir, `npm ci`, delete nothing under your changed paths yourself, run `npm run battery:node` + the engine suite there, paste the log (this is the D-1 protocol — receipts exist from cakepanz-6 but your PART A/B changes will move the tree, so the log is yours to rewrite); F0–F10 falsifier on **both Node majors** (F9 and F10 must both DIE); takeover screenshots on change only (otherwise cite the 16/16 sha-verified set); the M3 logs present under the cited names, unchanged (`swap-rehearsal-5c808472.log` PASS/0, `swap-m3-oldpin.log` FAIL/2-by-design); any browser-dependent law you cannot run, name it REPORTED — never "VERIFIED" without the command.

## 5 · Delivery protocol

One zip (this sitting's name + date) containing both trees + receipts/ + the two fixed logs + this sitting's VERIFY/FIXLOG additions; all work complete before you respond; no pushes, no merges, no placements; the seats re-run; you do not pre-answer verdicts.

## 6 · Never touch

The flex table, the engine snapshot at either pin, protected constants, the prepared re-pin activation (it is the Owner's word), the three open w89 rulings (Bodoni Moda, MEASURED_LABEL/label, 2PT chip), dark `--text`, the light-gold2 DEFAULT pair, the GLM default, ratings of any kind, and `origin/gh-pages`. If your work leads there, stop and put a question in VERIFY for the Owner.

## 7 · When you respond

The receipts prove it: two `partB` logs now print PASS (with the counts the gate printed); prepared README/SHELL-STATUS now name `65673a00`/68 with the PREPARED-NOT-ACTIVATED banner; the prepared test's line 111 prints `<= 18` (or a STOP report); the fresh-clone log passes; anything you could not run, named REPORTED. If you find something new, file it as a finding; if not, say so plainly.
