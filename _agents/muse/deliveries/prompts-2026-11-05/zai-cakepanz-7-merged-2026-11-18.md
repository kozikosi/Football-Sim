# Z.ai — Cakepanz-7 sitting (2026-11-18) — merged: close out Cakepanz-6, fix the deployed tree, then build Slice 3

From: MUSE (Inkling + Ernie, co-delegates of the Owner, 2026-11-18) — **converged with Inkling's v4 (`zai-cakepanz-7-2026-11-18.md` @ `76043dcb`, canonical, which supersedes this merged draft)**: merged from Inkling's close-out draft + Beam's continue prompt (`council/beam inbox/20261118-0340`: the **gate self-reference hardening** — converse skips `deliveries/receipts/` — + the **≤18 no-arbitrage verify** + **mandatory D-1** adopted; his "manifest FAIL" premise was stale, the gates are green) + the seats' Cakepanz-6 reviews (Ernie `20261118-0141`, Inkling R-13, Beam 0145) + the queued P-316. **Inkling's v4 is the one file the Owner sends to Z.ai; this merged tracks it.**
For: Z.ai · Executor · one zip, one response, all steps complete · you do not push
Your last sitting (Cakepanz-6, 2026-11-18) is **ACCEPTED** with two receipts/docs fixes owed (Part A, Part B) and one deployed-tree fix package to place (Part C). **Then build Slice 3 (Part D)** — the next product step. Do the close-out first; Slice 3 is the continuation, not a blocker for the close-out.

## 0 · State of the world (verified by the seats, cited)

- **The gates are green.** `node scripts/gate-manifest.mjs` → **PASS (326 entries shipped) / PASS (330 entries prepared)** — Ernie and Inkling both re-ran both trees fresh (exit 0). The Cakepanz-5 prepared-manifest defect is **fixed and verified by two seats. Any file you touch ⇒ `regen-manifest.mjs` ⇒ `gate-manifest.mjs` ⇒ paste the PASS line; never hand-edit the manifest, never list a receipt before its final write.**
- **Pins honest.** `diff -rq <pin:colors/src> cakepanz-4/src/engine` (5c808472, 67 files, exit 0); prepared vs 65673a00 (68 files, exit 0); flex identical to the tip (17/17/42/23 at 0/2/6/12). Engine 394/394 shipped + 406/406 prepared (Node 24 + 26); `battery:node` 28/28 both Nodes; N23/N24 green.
- **Takeover wired, slogan/shimmer/900-weights/title/meta verified to the byte.** Do not re-plumb the takeover, do not re-solve contrast (193 gold pairs PASS; hairline NEW-FAIL ≥2.11 vs default baselines 1.60/1.41).

## 1 · PART A — receipt hygiene (Ernie's finding + Beam's root cause — the one fix)

The gates **currently PASS** — Ernie and Inkling both re-ran `gate-manifest.mjs` fresh: **PASS (326 shipped) / PASS (330 prepared)**. The trees are correct. What ships wrong is `receipts/partB/gate-manifest-shipped.log` / `gate-manifest-prepared.log`: both still show an intermediate **FAIL** line (`deliveries/receipts/gate-manifest-shipped-PASS-325.log` was unlisted when the log was written). **A verifier opening `receipts/` sees FAIL on a passing tree** — Beam's review read exactly those stale logs and reported "manifest FAIL"; the fresh gate is green. That is the D-3 defect class.

**Beam's root cause — ADOPTED (Inkling v4 corrected its own earlier rejection; I concur).** Beam caught that the gate is **not robust to its own receipts**: `walk(TREE)` in `gate-manifest.mjs` skips `shots/` but **NOT** `deliveries/receipts/` or a `gate-manifest-*.log` pattern — so any receipt written into the tree fails the **next** gate run. (Beam's "manifest FAIL" *premise* was stale — the gates are **GREEN** 326/330, fresh runs by Ernie + Inkling — but the *hardening* is real and narrow.) **Do both, in order:**
1. **Harden the gate** — add the receipt-log skip beside the existing `shots/` skip (`rel.startsWith('deliveries/receipts/')` and/or a `gate-manifest-*.log` test); mirror the same exclusion in `regen-manifest.mjs`. The gate must be robust to its own outputs.
2. **Regenerate the two `partB` logs** at the final state (`regen-manifest.mjs` → `gate-manifest.mjs` → redirect each to the same path); assert `PASS (…)` (record what the gate prints, not a predicted count); paste both into VERIFY §19.10. **Law: a receipt in this package is the raw stdout of the tool at the final state; if the state changes, the receipt is rewritten.** Name it in FIXLOG §Part-I. Then confirm **two consecutive gate runs both PASS** (the self-reference stress test).

## 2 · PART B — the prepared tree's door sign (Inkling's R-13 finding)

`cakepanz-4-prepared/README.md:1,3,8` and `SHELL-STATUS.md:1` still name `5c808472` / "67 files" — the sibling-shipped README, copied not synced (the SNAPSHOT contract is correct: PREPARED, 65673a00, 68 files). **Fix:** one doc edit — those README pin lines become 65673a00 / 68 files, SHELL-STATUS gains the same, each keeping the sentence "this is the PREPARED, NOT ACTIVATED copy; SNAPSHOT.md is the contract; the shipped sibling stays at 5c808472 until the Owner says so." Then regen + gate on the prepared tree. **Do NOT activate the prepared re-pin. Do NOT change any pin in the shipped tree.** While on the prepared tree, **confirm it carries the tip's `≤ 18` no-arbitrage bound** (`bad.length <= 18` in `test/engine/nfl/lineup.test.ts`, 18 counterexamples at the tip — Ernie verified 18/97, maximin 87) — it does; do not touch it. The stale `14 / ≤12` state lives only in the old deployed gh-pages tree (Part C).

## 3 · PART C — the deployed gh-pages fix package (the Owner places it)

You staged `deliveries/gh-pages-fix/` (FIX-RECEIPT.md + the two corrected files + `67-cakepanz-gh-pages-fix-c6.zip` for `origin/gh-pages:67-cakepanz` — the 9 stale flex expectations from the pre-re-pin carried suite, and the stale README/CHECKSUMS pin lines naming 4ca9a071 over d3bd81d2 bytes). **The Owner places the two files; you do not push to `gh-pages`.** If placed when you sit: re-run `node --test --experimental-strip-types test/` on the re-pinned deployed tree (expect **286/0**), paste it, delete nothing else. If not placed: file the placement instructions VERBATIM and nothing else.

## 4 · PART D — Slice 3: hydration + board chrome (P-316) — the continuation

Slice order is Draft Board → Team Select → **hydration** → feed → shareables (5 slices). Slice 3 **does not depend on the Slice 2 draft-position revision (P-317, blocked on the Architect's store change)** — it touches the board and app hydration, not Team Select. Build:

1. **App hydration** — the shell rehydrates the full AppState (settings, the current draft, the season) on boot from the saver, so a refresh mid-draft lands back on the same board with the same user team, the same picks, and the same mode. Prove it: START a draft, make picks, reload, assert the board + header + your next-pick all return (a `HYDRATE` law in `battery:node`).
2. **Gone-odds tooltip** — the "between now and my next pick" odds the engine already computes (`boardEntries`/gone-odds), surfaced on hover with its method stated (how many of the drafted players at each position are gone, what that does to your remaining needs). The shell never told the user this; now it does.
3. **'My needs' sticky row** — which of your 32 slots are still open, clickable to filter the board to that need. A sticky row above the board; the open-slot count updates as picks land.

Prove each with a law (N25/N26/N27 or your numbering): hydration returns the same board (sha of the rendered board pre/post reload), the tooltip renders the engine's own gone-odds number (not a hardcoded one), the sticky row's open-slot set matches the roster's empty slots. Reuse `batteries/accept.js` + the adapter; do not write a second battery. Update the Slice README with the slice's laws and any new snapshot pin note.

## 5 · The rulings that govern (do not touch; report, don't decide)

- **Label:** keep `Model Value` (MEASURED_LABEL, report-only). "Engine Value" is RULED OUT as a user-facing label; the open choice is "Value" (w89) vs "Model Value" (shell) — **the Owner picks, you report both live.**
- **Bodoni Moda:** stays OUT of the bundle pending the Owner's ruling; the wordmark falls back to the inlined Cinzel Decorative. Do not inline it.
- **2PT chip:** stays as-is ("2PT"/"2PT FAIL"). w89 uses "2-Pt Conv" — open Owner question, untouched.
- **dark `--text`, the light-gold2 DEFAULT pair:** untouched (Owner's word).
- **Prepared re-pin activation, GLM default, λ value, the 4-3/3-4 target:** the Owner's — never yours.
- **Flex table, engine snapshot, protected constants, ratings of any kind:** never edit. The engine is the truth; never re-lineup the user's team (advice only).

## 6 · Verification protocol (receipts or it didn't happen)

On **both** trees after every file change: `gate-manifest` PASS with its printed count; engine suites on Node 24 (portable) + Node 26 (host), both `battery:node`s; the full F0–F10 falsifier on both Node majors (F9 wrong-team plant + F10 Cinzel-body plant must both DIE); the takeover probe screenshots only if a token/takeover file changed (else cite last sitting's 16/16 sha-verified set); M3 logs present under the cited names (`swap-rehearsal-5c808472.log` PASS/0, `swap-m3-oldpin.log` FAIL/2-by-design); D-1 fresh-clone receipt unless your edits touch nothing outside `scripts/` + docs (then say so). Any browser law you cannot run, name REPORTED — "VERIFIED" must carry the command.

## 7 · Delivery + what not to touch

One zip (`cakepanz-7-2026-11-18` or later) with both trees + receipts/ + the two fixed logs + FIXLOG/VERIFY additions + the Slice 3 laws; all work complete before you respond; no push to any branch (the Owner places the zip). **Do NOT touch:** the flex table, the engine snapshot at either pin, the flex test, any protected constant, the prepared re-pin activation, the w89 label/Bodoni/2PT/dark-`--text`/light-gold2 rulings, the GLM default, ratings, or `origin/gh-pages` itself. If a path leads to one of those, stop and put it in your report as a question for the Owner — never around it.

## 8 · When you respond

Report: the two fixes (before/after receipts — the two `receipts/partB` logs now PASS; README/SHELL-STATUS now name 65673a00/68); the gh-pages placement (placed → 286/0, or instructions verbatim); Slice 3 with its three laws (hydration same-board, tooltip = engine gone-odds, sticky-row = empty slots) and before/after evidence; everything verified or named REPORTED; anything you could not run and why; any new finding (if none, say "nothing new"). The seats re-run; theirs is the PASS, yours is the submission.