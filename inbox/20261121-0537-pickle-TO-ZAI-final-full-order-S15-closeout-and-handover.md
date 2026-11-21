SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: final, self-contained S15 close-out and hand-over order for Z.ai after reading Claude's 05:33Z ruling | DATE: 2026-11-21T05:37Z
FOR: Owner to relay to Z.ai (build seat). Advisory filing — I edited no product, engine, pin, governance, queue or `tools/` file. This document is complete in itself: read it and the four named files; no earlier chat, draft or Architect sitting is assumed.

=====================================================================
Z.AI FINAL ORDER — S15 CLOSE-OUT AND CLOUDFLARE-READY HAND-OVER (21 Nov 2026)
=====================================================================

**Authority order.** (1) The Owner's verbatim words in §1. (2) The Architect's rulings at `a17c323de` / `0533` in §2 — these are DECIDED, not proposals. (3) This order where it states the close-out. (4) Work order v8-revised for everything else. (5) Your own technical judgement inside those bounds. If a NEWER written order from Claude contradicts this file, stop and report the conflicting lines with hashes before choosing — do not implement both.

**Label key.** **V** = the named seat re-read or re-ran it, receipt cited · **R** = another seat's receipt, not re-run here · **I** = reasoned · **U** = not established. Nothing below is a gate I ran unless marked V.

## §0 · Read these four documents first

All `pickle` filings below are on **`origin/council/pickle`** (tip `85f76e545` or later); Claude's is on **`origin/architect/engine-and-seats`** (tip `a17c323de`). Read them with `git show <ref>:<path>` — none is in your own tree.

1. `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` — the permanent reference (§0 how to read, §1–3 Owner words, §4 locked, §5 future, §6 do-not-redesign, §7 build state, §8 defects, §9 hosting, §10 questions, §11 fence, §12 sources). **Updated this sitting** to include Claude's rulings; earlier "not yet ratified" wording is gone.
2. `origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` — the Owner's three answers verbatim; the questions that produced Claude's rulings.
3. `origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` — **Claude's rulings**, with his sources and measurements. This is the authority for hosting, stats scope and auth.
4. `origin/council/pickle:inbox/20261121-0110-pickle-TO-ZAI-continuation-v2-S15.md` — the previous full order, still the byte-level spec for the board design, `dispatchAsync`, laws and gate floors. Where §§2–7 below are shorter, 0110 governs. `inbox/20261121-0301-pickle-S15-WIP-review.md`, `0303` (digest fix) and `0305` (UX implications), all on `origin/council/pickle`, carry the close-out detail.

One conflict resolved: earlier reference text about "building slices 3–5" was **stale and has been corrected in the copy on `origin/council/pickle`**. My `0110` §0 and my `0301` byte review both establish **slices 1–5 are BUILT**. Do not rebuild them; do the close-out in §4. If you were handed an older copy of `0513`, ignore that line.

## §1 · The Owner's words (verbatim — final on product direction)

From my `0324`/`0358` filings and `0110` §1 (V, re-read):

> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare. the panels are still too boxy in cakepanz and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

> "ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything; you can preserve your mockup as an example of the direction of change but that's still not complete."

> "Make a note that 01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format"

Five direct answers (verbatim): "1. top three highlight should be present in the button like w89; 2. the little description of the top 3 choices of why the user would select that player; 3. w89 the buttons glow and there is a separte 'top' badge; 4. i need to know further context and claude should decide; 5. i need more context and claude should decide."

Answers 4 and 5 are now **ruled by Claude** (§2), not open. Release scope (verbatim, `0420`): *"these are not future possibilites; these are all mandatory to release along with the brag share"* — accounts, sync, conflict resolution, local-save migration and text-brag ship with the game. But **you do not build them** (§8 fence). Sign-in stays optional for the player, mandatory to exist at deploy. Domain (verbatim to hy4, via `0505`): *"free now and always"* — no registrar, no nameservers, no custom domain, ever.

Acceptance of the visual work: a **filed side-by-side** against live w89 at 390×844 and 1180×950, light and dark, of Team Select, board with a top-three row, pick confirm, finished draft **and one panel-bearing season screen** (§4.7). "Directionally similar" is a **FAIL**. The Owner's screenshots 01/02 with badges-for-faces are the long-term goal, **not** a v1 gate — do not fold them into the gate silently or claim they are done.

## §2 · Claude's 05:33Z rulings — what they mean for you

The Architect's sitting did time out in chat, but **the work landed**: commit `a17c323de` (2026-11-21T05:34:46Z) on `origin/architect/engine-and-seats`, verified by `ls-remote` this sitting. He ruled on all three of pickle's `0520` questions. You are affected by the first only; the other two are listed so you do not accidentally build them.

**2.1 Hosting — RATIFIED: one Cloudflare Worker with Static Assets, D1 only.**
- Pages is dropped. One Worker serves the built `dist/` and owns `/api/*` (auth, sync, stats). Explicit `wrangler deploy` after the Owner's "go"; no Git auto-deploy.
- D1 only at v1: no KV, no R2, no Durable Objects. (Claude's correction to the council text — sessions live in D1, a row holds up to 2 MB, R2 revisited only if a measured envelope nears that.)
- **Hostname corrected:** Workers addresses are `<worker>.<account-subdomain>.workers.dev`, so `76pancakes.workers.dev` is impossible. Target account subdomain `76pancakes` + Worker `play` → **`play.76pancakes.workers.dev`**, closest free variant if taken. This supersedes every earlier hostname line, including my own `0455`/`0508`/`0513` text. Do not hard-code it anywhere in your tree.
- **Your hand-over changes, and nothing more:** Vite `base: '/'` so asset URLs are root-relative; any backend call uses a **relative** `/api/...` path, never an absolute host; no `_redirects` or `_headers` file; no `pages.dev` string; no wrangler config; you deploy nothing. Claude writes `wrangler.jsonc`, D1 migrations, the Worker and the deploy command. (V, `0533` §1.)
- Rollback is a Worker version; a known version-skew limit after rollback is recorded, not fixed.

**2.2 Stats — RULED, and NOT your build.** The Owner's "all the players' top seasons" means the **user's own run players**, not real NFL careers. One ledger row per run, aggregates maximised, raw logs stay pruned, legend weights 100/10/1 kept INFERRED. Three small payload fields (`playerLines`, `pickOverall`, `seed`/`seeding`) are needed; they live in `colors/src/app/saves.ts` and the week flow and are **pin bytes**, so they wait for **one deliberate re-pin sitting after your merge** — seam golden `e8fed8ab…` must still hold. League awards are deferred. **Do not add these fields yourself.** If your close-out happens to touch `saves.ts`, stop and report before editing (§8).

**2.3 Auth — RULED, and NOT your build.** **Better Auth inside the same Worker**, D1 for users/accounts/sessions; GitHub at v1, Google only if a rehearsal spike passes. Clerk rejected — its production guide requires a domain you own, which "free now and always" rules out. The Owner provisions the OAuth App and sets two Worker secrets himself after the hostname is pinned. No credentials in repo, bundle or chat.

## §3 · What is already DONE — do not redo it

My `0301` byte review (V, 21 Nov, against the published 545-file mirror `67-cakepanz-15-WIP-2026-11-21`):
- The w89 design work is **byte-faithful**: all seven cited w89 lines true; `tokens-w89.css` and `shell.css` carry the glass tokens, 22px radii, sheen and pulse verbatim; `--glow` rides the house token, no new hex.
- The ring is gone: `cp-suggest`/`cp-quick` survive only in comments/assertions, no live DOM or CSS.
- One `.cp-draftbtn` per row, carrying `onpickDirect ?? onpick` and naming the slot; `.cp-top3` DOM hook; `.cp-toptag` in the name cell; why-copy inside the row. The staged `.cp-primary` chip remains in the expand panel — intentional, do not delete it.
- `dispatchAsync` migration true at START/PICK/UNDO/LOAD with `busy` before and `finally` clear and `error = st.error ?? ''` at each site; `as any` gone at PICK.
- Engine fence clean: `src/engine` byte-identical to the pin tree `8d8a8a1e81386e99f53f995492904348cb7d8345`.

Do not rebuild slices, re-port w89 bytes, re-land the one-button design, or re-do the `dispatchAsync` migration. Verify they still hold at your final bytes, and say so in the hand-over. **`rawSort`** stays FILED and NOT APPLIED — whether it is WITHDRAWN or REOPENED is the Architect's label, not yours.

## §4 · The close-out — your actual work, in detail

**4.1 D1 — fix the digest-format defect (BLOCKER).** `node tools/verify-package.mjs .` in the S15 tree → **359 UNPARSEABLE, 474 EXTRA, exit 1** (V, run by me). Cause: `scripts/regen-manifest.mjs:17` writes SHA256 (64 hex), `scripts/package-delivery.sh:39` checks with `sha256sum`, but `tools/verify-package.mjs:29,46` still parse `/^([0-9a-f]{32})\s\s?(.+)$/` and `:34` hashes with `md5` (V). The hand-over's "node_modules + pending regen" diagnosis is **wrong** — there is no `node_modules` and regen already ran. The manifest itself is fine (`shasum -c CHECKSUMS.txt` → 359 OK, exit 0, V). Exact three-line fix is `inbox/20261121-0303-pickle-S15-manifest-drift-fix.md`: accept 32 **or** 64 hex in both regex occurrences, choose `createHash(want.length === 64 ? 'sha256' : 'md5')`, update the comment, and add a composite step **17b** (`node tools/verify-package.mjs .`) after step 17 and before the M3 swap test. Expected after: `359 OK / 0 FAILED / 0 missing`, converse clean, exit 0; S14 tree must stay `467 OK / 0 FAILED / 0 missing`, exit 0. This is the one change that is explicitly yours to make in `tools/` (inside your own S15 tree) — the council `tools/` directory is MUSE/Architect-owned and untouched.

**4.2 F27–F30 — falsify by name.** `deliveries/receipts/partH-s15/` contains only shell FA–FD and slot FS1 child logs; there are **no F27–F30 logs** (V). The four new laws L26–L30 / S32 / S33 have never been falsified. Run `scripts/falsify-board.mjs` at final S15 bytes and produce child logs under a new `deliveries/receipts/partH-<next>/` showing each mutant **DIED by its own name**. A green battery count in prose is not a falsified law. Keep the fresh-server guard; adapt the `ringPresentGuard` pattern to the new selectors.

**4.3 Receipts — make the counts real.** No raw stdout in the tree prints `BOARD BATTERY · 23 pass` or `SHELL BATTERY · 51 pass`; the only S15 counts are prose in the hand-over and `VERIFY-§26-append.txt:74-80`. Root `deliveries/receipts/shell-battery.log` ends `SHELL_EXIT=1` and `fb-battery.log` ends in a `TimeoutError` (older sittings) — they must be regenerated at final bytes, not quoted. Label counts V only when a raw log is filed.

**4.4 Docs and gate table — regenerate from receipts.** `CUTOVER-CHECKLIST.md:20,22`, `CUTOVER-ONE-PAGER.md:31,33`, `SLICE-STATUS-2026-11-20.md:16-27` still carry 15/0, 16/0, 17/0, 48/0, 33/33 (V), and `scripts/acceptance-run.sh:41,43,52` carry stale S13 numbers (16/0 baseline line at `:52`). Prefer **one script that reads the receipts and emits the table** so this drift class dies rather than being patched again (R, hy4 relaying beam). Re-state all battery counts from bytes at final state — do not copy 19/0, 18/0, 16/0, 17/0, 23/0 or 51/0 from any sheet.

**4.5 Composite — uninterrupted at final bytes.** Run `bash scripts/acceptance-run.sh` once at the final tree. Expect steps 13b–17 to record `EXIT_CODE=0` each and the banner to end **"ACCEPTANCE RUN COMPLETE"**, with gate-manifest and gate-numerals PASS/CLEAN. File the raw tail into `VERIFY-§26-append.txt:§26.5/§26.6`. If any step fails, stop, report step + command + stdout, and do not proceed on a red composite. The S14-bytes composite in `ACCEPTANCE-RECEIPTS.txt` is complete (23/23) but is **not** an S15 result — do not present it as one.

**4.6 Two product bugs in your file.** (a) **D5 — stale engine stamp:** `src/App.svelte:83` is `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the previous pin — while the shipped engine is `408410477` (R, ernie, §8.1). `metaNow()` stamps it into autosaves and manual slots; `Saves.svelte:80` prints it to the user. Fix before any server compares `engine_version`, or every save arrives flagged foreign. (b) **One-click toast can lie** (I, code read, `0301` §RISK): `DraftBoard.svelte:37-46` sets `draftedToast` synchronously in `quickDraft` before the async `pick()` at `App.svelte:194-206` can refuse a PICK, so S32 can show "illegal fit" while the toast still says "Drafted · <name>". Fix shape in `inbox/20261121-0305-pickle-S15-UX-implications.md`. Also check the two seed defects in `0513` §8.1 #11 (restore does not write the seed back to URL; second draft in a tab replays the same seed) — they are in `App.svelte` and are yours.

**4.7 Side-by-side — includes a panel-bearing screen.** `.cp-panel` renders only on season screens, so a board-only capture cannot prove the glass law (calibration from my smoke probe, `0301` §CALIBRATION). File the side-by-side at 390×844 and 1180×950, light and dark: Team Select, board with a top-three row, pick confirm, finished draft, **plus a season screen that actually renders `.cp-panel`** (Hub/Week/Standings). If you cannot capture it, say so and scope the glass claim explicitly to season screens — do not silently let it pass.

## §5 · Laws and falsifiers

Ring-named laws cannot stay as written, but coverage must not disappear. Reword/replace **by name**, never silently delete or weaken: L13, L16–L25, W14. hy4's F20/F24/F25/F26 may be retired only if equivalent named mutants replace them. Assert: TOP badge exactly on the three array-position rows at every sort and checkpoint; one visible Draft button per row with all-button pulse and top-three sheen/opt-out; reduced-motion disables both; why copy on exactly those three with VM-sourced text; no `cp-quick` class; no ring class; no law derives state from rendered text; L-ERR both halves; W14 both directions; sort-after-restore regression. **Do not weaken W14** (the explicit-`?seed=` link wins over a DIFFERENT autosave; SAME-seed reload restores) or skip its six re-pointed selectors in `batteries/visual.battery.mjs` (`:98, :175, :199, :206, :230, :292` — `:292` is W14 leg A).

## §6 · Gate floors

S14 finals are the floors, not v8's S13 numbers: engine 430/430 · node 35/35 · board **19/0** · visual **18/0** · slot **28/0** · shell 48/0 · slice 29 pass / 0 fail / 10 skip / 3 defer · contrast 2/0 (three KNOWN team holes stay NAMED) · viewport 45/45, 0 overflow, 0 console/page errors · golden seam MATCH · falsifier set exit 0. (R, `VERIFY-§26-append.txt:§26.6`, not re-run by me.) Do not treat a PASS as product acceptance — a Verifier who wrote none of it signs off later.

## §7 · First actions, in order

1. Read §§0–2 of this file and the four named documents. Re-check the w89 bytes at the cited lines before any edit; 0110 §2.2 governs the glow, 0110 §2.3 governs `cp-quick`.
2. Run `bash scripts/acceptance-run.sh` **before** any edit to establish the baseline. If a step fails, stop and report.
3. Apply the 4.1 digest fix, then re-run `node tools/verify-package.mjs .` on both S15 and S14 trees.
4. Land 4.6 (D5 stamp, toast, seed defects) and re-run the affected batteries.
5. Falsify F27–F30 by name (4.2), regenerate receipts and the gate table (4.3–4.4).
6. Run the uninterrupted composite at final bytes (4.5).
7. File the side-by-side including a panel-bearing season screen (4.7).
8. Produce the Cloudflare-ready `dist/`: `base: '/'`, relative `/api/...`, no wrangler config, no deploy. Both `dist/` and `dist/single.html` with sha256 of each plus zip sha256.
9. Post the hand-over (§9), then say **"slices done"**. Claude merges and runs gates 1–10; the Owner decides make-live after seeing the side-by-side.

## §8 · The fence

No edits to `src/engine/**`, `colors/`, the pin, ratings, `FLEX`, `RATING_SPECS`, `SLOTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `modelWeights()`. Zero engine-byte diff; 69 engine files byte-identical; `git diff --name-only 408410477 <your tip> -- colors/src` → empty. No account system, no D1 schema, no auth, no Worker, no deploy — those are Claude's and the Owner's. No gh-pages work, no make-live, no re-hosting rival images. No new images in lanes, no dated/merged/final copies in the root, no force-push, no stash, no edits to files that are not yours. Do not remove the display-rounded-oracle caveat from top-three copy. **No weakening a law to make it pass** — if a law dies for a real reason, say so and file the fix.

## §9 · Hand-over — all required; no receipt, no claim

1. Pushed commit hash on your own branch (or, without push credentials, the zip + its sha256), plus directory + command + result for every claim, labelled V / R / I / U.
2. `node tools/verify-package.mjs .` → every entry OK, converse clean, exit 0 at **final** bytes; S14 tree still 467 OK / 0 FAILED / 0 missing, exit 0.
3. Engine fence empty (command in §8); seam golden unchanged.
4. Battery counts at or above §6 with assertion names listed; swap test 29 pass / 0 fail / 10 skip / 3 deferred (the "26 pass" line is stale); all falsifiers DIED by name with child logs; W14 PASS both directions; composite "ACCEPTANCE RUN COMPLETE".
5. Built `dist/` **and** `dist/single.html` with sha256 of each plus zip sha256; `base: '/'`; relative `/api/...`; no `pages.dev` string, no wrangler config.
6. The filed side-by-side (§4.7), including the panel-bearing season screen.
7. A one-page note naming the new selectors (Draft button, TOP badge, why line) so Claude can re-point the merge tests without guessing; the new hostname contract acknowledged; any disagreement filed in your own inbox with the exact w89 byte that supports it.

## §10 · Definition of done

Digest fix landed and verifier clean on both trees · F27–F30 DIED by name · receipts regenerated from bytes · docs/gate table generated, not patched · one uninterrupted composite at final bytes · D5 stamp, toast and seed defects fixed · side-by-side filed with a panel screen · all gates at or above §6 floors · zero engine-byte diff and seam golden unchanged · Cloudflare-ready `dist/` and `single.html` hashed · Cloudflare hand-over requirements met · receipts for every claim. Then say **"slices done"**. Nothing here authorises you to deploy, to write the Worker, or to build the account/sync/stats features.

=====================================================================
end of final order
=====================================================================
