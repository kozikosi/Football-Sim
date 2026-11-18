# Z.ai — Cakepanz-7 sitting (2026-11-18) — v4: close out Cakepanz-6, then Slice 3

From: MUSE (Inkling, delegated 2026-11-18 by the Owner) — v4 2026-11-18T04:10Z, filed on `council/muse`.
For: Z.ai · Executor · one zip, one response, all steps complete · you do not push
**v4 supersedes `zai-cakepanz-7-2026-11-18.md` (v3 eae32d6a) and `zai-cakepanz-7-merged-2026-11-18.md` (a5fc6788)** — it is the merge of both, with one correction I owe Beam (below). The Owner sends exactly one file to Z.ai; this is it.

v4 changelog: **PART A now carries the compound fix** — (a) harden the gate so it is robust to its own receipts (Beam's root cause, verified against `cakepanz-4/scripts/gate-manifest.mjs`: the converse `walk(TREE)` skips `shots/` but does NOT skip `deliveries/receipts/` or `gate-manifest-*.log`, so any receipt written there fails the NEXT gate run), and (b) regenerate the two partB logs. My v2/v3 rejection of "exclude receipt logs from the gate" was too blunt — the intent is narrow: skip the receipt-log path, beside the existing `shots/` skip, mirror in `regen-manifest.mjs`, and keep the gate green for its own outputs while the receipt law stands. +**PART B2** (prepared tree `<= 18` no-arbitrage line — verify-only, with STOP-and-report wording); **§6** keeps D-1 fresh-clone MANDATORY on both Node majors (the merged draft made it conditional — keep it mandatory, your PART A/B edits move the tree). The rest is common ground (Slice 3 Part D, the rulings list, no-activation law, host corrected to `council/inkling` @ `60171cb4`).

## 0 · State of the world (verified by the seats, cited)

- **The gates are green.** `node scripts/gate-manifest.mjs` → **PASS (326, shipped) / PASS (330, prepared), exit 0** — re-run fresh by Ernie (01:41Z) and me (01:45Z). The Cakepanz-5 prepared-manifest defect is fixed and twice-verified. **The two `receipts/partB/*.log` still ship an intermediate FAIL** — those files are the defect, not the gate.
- **Pins honest.** shipped = `5c808472` (67 files, exit 0); prepared = `65673a00` (68 files, exit 0; flex == tip: 17/17/42/23 at 0/2/6/12). Engine 394/394 + 406/406 (Ernie on Node 26, me on Node 24); `battery:node` 28/28 both Nodes; N23/N24 green both Nodes.
- **Takeover wired, slogan/shimmer/900-weights verified to the byte** (three `[data-zpbteam]` blocks; dark block on `@media`; Cinzel 700/900 = the existing 100-face variable file, two `@font-face` ranges one payload; Decorative-900 = 19,423 base64 chars ≈ 14,568 raw; 40,472 raw added exactly; 193 gold-class pairs PASS; hairlines ≥ 2.11 vs default baselines 1.60/1.41). **Do not re-plumb the takeover, do not re-shoot unless a token file changes, do not re-solve contrast.**

## 1 · PART A — receipt hygiene (Ernie + Beam, root cause verified against the gate source)

The two `receipts/partB/gate-manifest-{shipped,prepared}.log` ship an intermediate FAIL — written before the log bytes joined the manifest. Worse than that: **the gate is not robust to its own receipts** — `walk(TREE)` in `gate-manifest.mjs` skips `shots/` but NOT `deliveries/receipts/` or a `gate-manifest-*.log` pattern, so any receipt written into the tree fails the NEXT gate run. (Beam caught this and proposed the exception; my v2/v3 called it wrong — it is right, narrowly.) **Do both, in this order:**

1. **Harden the gate** — add the receipt-log skip beside the existing `shots/` skip: e.g. `SKIP` gains `'deliveries/receipts/'` or `rel.startsWith('deliveries/receipts/')` and/or a `gate-manifest-*.log` test; mirror the same exclusion in `regen-manifest.mjs`. The manifest's own `CHECKSUMS.txt`/`MANIFEST.txt`/`ACCEPTANCE-RECEIPTS.txt` already ride this exact self-reference exclusion — receipts join it. **The gate must be robust to its own outputs. Nothing else changes.**
2. **Regenerate the two logs** — `node scripts/regen-manifest.mjs` → `node scripts/gate-manifest.mjs` → redirect each to the SAME paths; assert `PASS (N)` (record what the gate prints); paste both into VERIFY §19.10. **Law for this package: a receipt is the raw stdout of the tool at the final state; if the state changes, the receipt is rewritten.** Name this law in FIXLOG §Part-I.

Then confirm: two consecutive `gate-manifest` runs both PASS (the self-reference stress test). Paste both.

## 2 · PART B — the prepared tree's door sign (Inkling's R-13 finding)

`cakepanz-4-prepared/README.md:1,3,8` and `SHELL-STATUS.md:1` still name `5c808472` / "67 files". (SNAPSHOT.md is correct: PREPARED, 65673a00, 68 files, diff exit 0.) **Fix:** those pin lines become 65673a00 / 68 files; each keeps "this is the PREPARED, NOT ACTIVATED copy; SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the Owner says so." Then regen + gate on the prepared tree. **Do NOT activate the prepared re-pin. Do NOT change any pin to 65673a00 in the shipped tree.**

**PART B2 — the prepared tree's no-arbitrage line (Beam's ask; verify only, never edit).** `cakepanz-4-prepared/test/engine/nfl/lineup.test.ts` line 111 must read `bad.length <= 18` (the tip `65673a00` bound; 18 counterexamples re-derived by me; the deployed gh-pages tree still carries the stale `<= 12` behind its red suite — that's Part C). **grep it; report the number you see (must be 18). If you see 12 or anything else: STOP, touch nothing, file it as a finding.**

## 3 · PART C — the deployed gh-pages fix package (the Owner places it)

You staged `deliveries/gh-pages-fix/` (FIX-RECEIPT.md + the two corrected files + `67-cakepanz-gh-pages-fix-c6.zip` for `origin/gh-pages:67-cakepanz` — the 9 stale flex expectations + stale pin lines naming 4ca9a071 over d3bd81d2 bytes; expected output **286/0** after placement). **The Owner places the files; you do not push to `gh-pages`.** If placed when you sit: re-run `node --test --experimental-strip-types test/` on the re-pinned deployed tree, paste 286/0, delete nothing. If not placed: file the placement instructions VERBATIM and nothing else.

## 4 · PART D — Slice 3: hydration + board chrome (P-316) — the continuation

Slice order: Draft Board → Team Select → **hydration** → feed → shareables. Slice 3 does not depend on P-317 (the Architect's store change); it touches app hydration and the board, not Team Select. Build, in this order:

1. **App hydration** — the shell rehydrates the full AppState (settings, the current draft, the season) on boot from the saver, so a refresh mid-draft lands back on the same board with the same user team, picks, and mode. Prove it: START a draft, make picks, reload, assert the board + header + your next pick all return (a `HYDRATE` law in `battery:node`).
2. **Gone-odds tooltip** — the "between now and my next pick" odds the engine already computes (`boardEntries` / gone-odds), surfaced on hover with its method stated.
3. **'My needs' sticky row** — which of your 32 slots are still open, clickable to filter the board; the open-slot count updates as picks land.

Prove each with a law (N25–N27 or your numbering): hydration returns the same board (sha of the rendered board pre/post reload); the tooltip renders the engine's own gone-odds number (not a hardcoded one); the sticky row's open-slot set matches the roster's empty slots. Reuse `batteries/accept.js` + the adapter; a second battery is forbidden. Update the Slice README with the slice laws.

## 5 · The rulings that govern (never yours)

- **Label:** keep `Model Value` (MEASURED_LABEL, report-only). "Engine Value" is ruled out; the open choice is w89's "Value" vs the shell's "Model Value" — **the Owner picks; you report both live.**
- **Bodoni Moda:** stays OUT of the bundle pending the Owner's ruling; the wordmark falls back to the inlined Cinzel Decorative. Do not inline it.
- **2PT chip:** stays as-is ("2PT"/"2PT FAIL"). w89 uses "2-Pt Conv" — open Owner question; untouched.
- **dark `--text` 3.17:1, the light-gold2 1.65:1 DEFAULT pair:** untouched (Owner's word).
- **Prepared re-pin activation, GLM default, λ value, the 4-3/3-4 target:** the Owner's — never yours.
- **Flex table, engine snapshot at either pin, protected constants, ratings of any kind:** never edit.

## 6 · Verification protocol (mandatory — receipts or it didn't happen)

On **both** trees after every file change: `node scripts/gate-manifest.mjs` (paste the count); `node --test --experimental-strip-types test/engine.test.ts` on **Node 24** (portable) and Node 26 (host); `npm run battery:node` on both (expect 28/28); **the full fresh-clone receipt (MANDATORY — your PART A/B edits move the tree): clone scratch → `npm ci` → `npm run battery:node` + the engine suite → paste the log**; full F0–F10 falsifier on **both Node majors** (F9 and F10 must both DIE); the takeover probe screenshots only if a token/takeover file changed (else cite the 16/16 sha-verified set); the M3 logs present under the cited names unchanged (`swap-rehearsal-5c808472.log` PASS/0, `swap-m3-oldpin.log` FAIL/2-by-design); **the two consecutive gate runs from PART A, both PASS**; any browser law you cannot run, name it REPORTED. "VERIFIED" must carry the command; "REPORTED" must carry the seat that ran it.

## 7 · Delivery + what not to touch

One zip with both trees + receipts/ + the two fixed logs + FIXLOG/VERIFY additions + the Slice 3 laws; all work complete before you respond; no push to any branch (the Owner places the zip). **Do NOT touch:** the flex table; the engine snapshot at either pin; the flex test; any protected constant; the prepared re-pin activation; the three open w89 rulings; dark `--text`; the light-gold2 DEFAULT pair; the GLM default; ratings; `origin/gh-pages`. If a path leads there, stop and put a question in your report for the Owner — never around it.

## 8 · When you respond

The receipts: the two consecutive gate runs (both PASS); the two `partB` logs now print PASS at the printed counts; README/SHELL-STATUS name 65673a00/68 with the PREPARED-NOT-ACTIVATED banner; B2's line 111 prints `<= 18` (or a STOP report); the fresh-clone log passes; the gh-pages placement (286/0, or instructions verbatim); Slice 3 with its three laws and before/after evidence; everything verified or named REPORTED; anything you could not run and why; any new finding (if none, say "nothing new"). The seats re-run; theirs is the PASS, yours is the submission.
