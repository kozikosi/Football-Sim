# Z.ai — Cakepanz-7 sitting (2026-11-18) — merged v3: Cakepanz-6 close-out + Slice 3

From: MUSE (Inkling, delegated 2026-11-18 by the Owner) — v3 2026-11-18T04:00Z, filed on `council/muse`.
For: Z.ai · Executor · one zip, one response, all steps complete · you do not push
Based on: the merged draft `zai-cakepanz-7-merged-2026-11-18.md` @ `7caca1d4` (from Inkling's `zai-cakepanz-7-2026-11-18.md` v1/v2 plus the seats' reviews) with v3 adding Beam's prepared-tree `≤18` verify (B2) and restoring the mandatory D-1 fresh-clone receipt (v2 §4 strengthened). Close out Cakepanz-6 first (A→C), then Slice 3 (Part D) — the close-out is not a blocker for Slice 3, and Slice 3 is not a licence for the close-out to remain open.

v3 changelog (from v2 `271631ea`): **+PART D (Slice 3, P-316) adopted wholesale from the merged draft** — app hydration, gone-odds tooltip, my-needs sticky row; **+PART B2** (prepared tree carries tip `<= 18` — verify-only); **§4** restored to mandatory D-1 on both Node majors; host attribution corrected (delivery on `council/inkling` @ `60171cb4`). Beam's "exclude receipt logs from the gate" and "manifest FAIL" premise remain rejected (gates are green — fresh runs by Ernie and me).

## 0 · State of the world (verified by the seats, cited)

- **The gates are green.** `node scripts/gate-manifest.mjs` → **PASS (326, shipped) / PASS (330, prepared)** — re-run fresh by Ernie (01:41Z) and me (01:45Z). The Cakepanz-5 prepared-manifest defect is **fixed and verified by two seats.** Any file you touch ⇒ `node scripts/regen-manifest.mjs` ⇒ `node scripts/gate-manifest.mjs` ⇒ paste the PASS line; never hand-edit the manifest, never list a receipt before its final write, never "exclude" receipt logs from the gate.
- **Pins honest.** shipped = `5c808472` (67 files, exit 0 vs pin); prepared = `65673a00` (68 files, exit 0 vs pin; flex identical to tip: 17/17/42/23 at 0/2/6/12). Engine suites re-run (394/394 + 406/406 — Ernie on 26, me on 24); `battery:node` 28/28 both Nodes; N23/N24 green both Nodes.
- **Takeover wired, slogan/shimmer/900-weights/title/meta verified to the byte** (tokens-who-remap `[data-zpbteam]` ×3 modes, dark block on `@media`; Cinzel 700/900 rides the 100-face variable file — two `@font-face` ranges one payload; Decorative-900 19,423/14,568 B; 40,472 raw added exactly; 193 gold-class contrast pairs PASS; hairline `NEW-FAIL` ≥ 2.11 vs defaults 1.60/1.41). **Do not re-plumb or re-filter.**
- **The receipts are stale, the trees are not.** `receipts/partB/gate-manifest-{shipped,prepared}.log` ship an intermediate FAIL — **those two files are the defect; do not "fix" the gate.**

## 1 · PART A — receipt hygiene (Ernie's finding — the one fix)

`receipts/partB/gate-manifest-shipped.log` and `gate-manifest-prepared.log` ship an intermediate FAIL (the tool was run before its own log bytes joined the manifest). The trees are correct; the receipts as filed are not — a verifier opening `receipts/` sees FAIL on a passing tree. **Fix:** after PART B lands, run `node scripts/regen-manifest.mjs`, then `node scripts/gate-manifest.mjs`, redirect each to the SAME paths with the final state; assert output `PASS (N)` (record what the gate prints, not a predicted count); paste both into VERIFY §19.10. **Law for this package: a receipt is the raw stdout of the tool at the final state; if the state changes, the receipt is rewritten.** Name this law in FIXLOG §Part-I with your words.

## 2 · PART B — the prepared tree's door sign (Inkling's R-13 finding)

`cakepanz-4-prepared/README.md:1,3,8` and `SHELL-STATUS.md:1` still name `5c808472` / "67 files" — the sibling-shipped README copied, not synced. (The SNAPSHOT contract is correct: PREPARED, 65673a00, 68 files, diff exit 0.) **Fix:** those README pin lines become 65673a00 / 68 files, SHELL-STATUS gains the same, each keeping the sentence "this is the PREPARED, NOT ACTIVATED copy; SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the Owner says so." Then regen + gate on the prepared tree. **Do NOT activate the prepared re-pin. Do NOT change any pin in the shipped tree.**

## 2.1 · PART B2 — the prepared tree's no-arbitrage line (Beam's ask; verify only)

`cakepanz-4-prepared/test/engine/nfl/lineup.test.ts` carries the tip's `bad.length <= 18` at line 111 (tip `65673a00`, shipped `5c808472` identically; the deployed gh-pages tree still carries the stale `<= 12` behind its red suite). **grep it; report the number you see (must be 18). If you see 12 or anything else: STOP, touch nothing, file it as a finding.**

## 3 · PART C — the deployed gh-pages fix package (the Owner places it)

You staged `deliveries/gh-pages-fix/` (FIX-RECEIPT.md + the two corrected files + `67-cakepanz-gh-pages-fix-c6.zip` for `origin/gh-pages:67-cakepanz` — the 9 stale flex expectations from the pre-re-pin carried suite, and the stale README/CHECKSUMS pin lines naming 4ca9a071 over d3bd81d2 bytes). **The Owner places the files; you do not push to `gh-pages`.** If placed when you sit: re-run `node --test --experimental-strip-types test/` on the re-pinned deployed tree (expect **286/0**), paste it, delete nothing else. If not placed: file the placement instructions VERBATIM and nothing else.

## 4 · PART D — Slice 3: hydration + board chrome (P-316) — the continuation

Slice order: Draft Board → Team Select → **hydration** → feed → shareables. Slice 3 **does not depend on P-317** (the Architect's store change — the draft-payload slot stamp); it touches app hydration and the board, not Team Select. Build, in this order:

1. **App hydration** — the shell rehydrates the full AppState (settings, the current draft, the season) on boot from the saver, so a refresh mid-draft lands back on the same board with the same user team, picks, and mode. Prove it: START a draft, make picks, reload, assert the board + header + your next pick all return (a `HYDRATE` law in `battery:node`).
2. **Gone-odds tooltip** — the "between now and my next pick" odds the engine already computes (`boardEntries` / gone-odds), surfaced on hover with its method stated (how many of the drafted players at each position are gone, what it does to your remaining needs). The shell never told the user this; now it does.
3. **'My needs' sticky row** — which of your 32 slots are still open, clickable to filter the board to that need. Sticky row above the board; the open-slot count updates as picks land.

Prove each with a law (N25/N26/N27 or your numbering): hydration returns the same board (sha of the rendered board pre/post reload); the tooltip renders the engine's own gone-odds number (not a hardcoded one); the sticky row's open-slot set matches the roster's empty slots. Reuse `batteries/accept.js` + the adapter; a second battery is forbidden. Update the Slice README with the slice laws and any new snapshot pin note.

## 5 · The rulings that govern (never yours)

- **Label:** keep `Model Value` (MEASURED_LABEL, report-only). "Engine Value" is RULED OUT as a user-facing label; the open choice is w89's "Value" vs the shell's "Model Value" — **the Owner picks; you report both live.**
- **Bodoni Moda:** stays OUT of the bundle pending the Owner's ruling; the wordmark falls back to the inlined Cinzel Decorative. Do not inline it.
- **2PT chip:** stays as-is ("2PT"/"2PT FAIL"). w89 uses "2-Pt Conv" — open Owner question; untouched.
- **dark `--text` 3.17:1 and the light-gold2 1.65:1 DEFAULT pair:** untouched (Owner's word).
- **Prepared re-pin activation, GLM default, λ value, the 4-3/3-4 target:** the Owner's — never yours.
- **Flex table, engine snapshot at either pin, protected constants, ratings of any kind:** never edit.

## 6 · Verification protocol (receipts or it didn't happen) — mandatory

On **both** trees after every file change: `node scripts/gate-manifest.mjs` (paste the count); engine suite via `node --test --experimental-strip-types test/engine.test.ts` on **Node 24** (portable) and Node 26 (host); `npm run battery:node` on both (expect 28/28 each); **the full fresh-clone receipt (MANDATORY this time — your Part A/B changes move the tree): clone scratch → `npm ci` → `npm run battery:node` + engine suite → paste the log**; full F0–F10 falsifier on **both Node majors** (F9 wrong-team plant + F10 Cinzel-body plant both must DIE); the takeover probe screenshots only if any token/takeover file changed (else cite the 16/16 sha-verified set); the M3 logs present under the cited names unchanged (`swap-rehearsal-5c808472.log` PASS/0, `swap-m3-oldpin.log` FAIL/2-by-design); any browser law you cannot run, name it REPORTED. **"VERIFIED" must carry the command; "REPORTED" must carry the name of the seat that ran it.**

## 7 · Delivery + what not to touch

One zip with both trees + receipts/ + the two fixed logs + FIXLOG/VERIFY additions + the Slice 3 laws; all work complete before you respond; no push to any branch (the Owner places the zip). **Do NOT touch:** the flex table; the engine snapshot at either pin; the flex test; any protected constant; the prepared re-pin activation; the three open w89 rulings; dark `--text`; the light-gold2 DEFAULT pair; the GLM default; ratings of any kind; the gh-pages tree itself. If a path leads there, stop and put a question in your report for the Owner — never around it.

## 8 · When you respond

Report: the two fixes with receipts (the two `receipts/partB` logs now print PASS; README/SHELL-STATUS now name 65673a00/68); the B2 grep line (`<= 18`, or a STOP report); the gh-pages placement (286/0, or instructions verbatim); Slice 3 with its three laws and before/after evidence; everything verified or named REPORTED; anything you could not run and why; any new finding (if none, say "nothing new"). The seats re-run; theirs is the PASS, yours is the submission.
