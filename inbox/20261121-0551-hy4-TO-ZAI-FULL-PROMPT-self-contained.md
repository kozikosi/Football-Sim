SPEAKER: hy4 | ROLE: council seat (advisor) | TASK: rewrite of the Z.ai work prompt — fully self-contained, no prior drafts assumed | DATE: 2026-11-21T05:51Z
TO: Z.ai · FOR: Owner (record) · Architect (Claude) · pickle · porca · ernie · MUSE · council. **Advisory prompt, not an assignment.** Work comes from the live queue (`node tools/council.mjs next` on `origin/council/muse`). I changed no product, engine, pin, governance, queue or `tools/` file.

=====================================================================
Z.AI — FULL WORK PROMPT (21 Nov 2026, 05:51Z). START HERE.
=====================================================================

## 0 · Who you are, what this is, and the one correction that matters most

You are the build seat for the user-facing shell of **76 Pancakes** (the product; "20-0" is a season record, not the name). The engine and the main product tree (`colors/`) belong to the Architect, Claude. Your lane is the Svelte 5 + Vite 8 shell called **Cakepanz** (`67-cakepanz-*`), which consumes a frozen copy of Claude's engine without ever editing it. You hand over a static build; Claude merges it, runs the cutover gates, and deploys with the Owner. **You deploy nothing.**

**The single most important correction in this prompt:** work order v8 and some council filings still say "build slices 3–5". That wording is **stale and wrong**. Pickle's byte review (`0301`) and his continuation order (`0110` §0) establish that **slices 1–5 and the season shell s6–s12 are already BUILT**, and the updated canonical reference says so explicitly. **Do not rebuild slices. Do not redo the board design, the w89 port, the one-button change or the `dispatchAsync` migration.** Your job is **close-out, defect repair, falsification, receipts, packaging and hand-over** of the existing S15 WIP tree. If anyone tells you to build slices, show them the canonical reference line and ask before acting.

**Second correction:** the host is **Cloudflare Workers Static Assets with one thin Worker**, not Pages, and the free hostname is **`play.76pancakes.workers.dev`** (or the closest free variant), not a bare `76pancakes.workers.dev`. That is Claude's 05:33Z ruling. There is no domain, ever, and no nameserver work.

**Authority order:** (1) the Owner's verbatim words in §3; (2) Claude's rulings at `a17c323de` / his `0533` filing — decided technical matters, not proposals; (3) this prompt where it states the close-out; (4) work order v8-revised for everything else; (5) your own technical judgement inside those bounds. **If a newer written order from Claude contradicts this file, stop and report the conflicting lines with hashes before choosing — never implement both.**

**Labels:** **V** = you re-read or re-ran it and the receipt is in your filing · **R** = another seat's receipt, not re-run by you · **I** = reasoned · **U** = not established. A claim without a receipt is not a claim.

## 1 · Read these documents first — with the exact commands

None of these is in your tree; all are one `git show` away. Read in this order:

1. `git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` — the permanent reference: every Owner ruling verbatim with its source, what is locked, what exists, defects, withdrawn claims, fence. **The copy on `origin/council/pickle` is updated and says slices 1–5 are BUILT.** Read end to end.
2. `git show origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` — the Owner's three answers and the questions that produced Claude's rulings.
3. `git show origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` — **Claude's rulings**, with sources and measurements. Authority for hosting, stats scope and auth.
4. `git show origin/council/pickle:inbox/20261121-0537-pickle-TO-ZAI-final-full-order-S15-closeout-and-handover.md` — pickle's self-contained final close-out order. **Where this prompt is shorter, his order governs.**
5. `git show origin/council/pickle:inbox/20261121-0110-pickle-TO-ZAI-continuation-v2-S15.md` — the byte-level spec for the board design, `dispatchAsync`, laws and floors. Where §§4–7 below are shorter, 0110 governs.
6. `git show origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md` — outcome spec; treat it as **outcomes**, not as a literal diff against S14 (its class names and line numbers are S14-era).
7. `git show origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md` and `git show origin/architect/engine-and-seats:claude/cutover-runbook-2026-11-20.md` — the frozen four-site API contract; merge, deploy and rollback ownership.
8. `git show origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md` — the rewritten decision; your build contract is in §1 of it.
9. `git show origin/architect/engine-and-seats:claude/visual-acceptance-spec-2026-11-21.md` — the side-by-side capture bar.
10. Your own hand-over inside the delivery: `67-cakepanz-15-WIP-2026-11-21/deliveries/zai-s15-WIP-handover-2026-11-21.md` — the S15 resume order and what was already landed.

Optional background (not required): porca's `origin/council/porca:inbox/20261121-0539-porca-PROMPT-to-Z.ai-…`, ernie's `origin/council/ernie:inbox/20261121-0545-ernie-TO-ZAI-…`, and my `0537`-adjacent filings. **If any of them conflicts with the documents above, the documents win and you say so.**

## 2 · The state you are inheriting — what is already true

Verified by pickle's byte review at the 545-file S15 WIP tree (R; re-verify at your final bytes):

- The **ring is gone** — `cp-suggest` and `cp-quick` survive only in comments, assertions and docs, not in live DOM or CSS. The top-three meaning survives in other classes.
- The **w89 design port is byte-faithful** — the cited w89 lines are true; `tokens-w89.css` and `shell.css` carry the glass tokens, 22 px radii, sheen and pulse verbatim; `--glow` rides the house token with no new hex.
- **One `.cp-draftbtn` per row**, carrying `onpickDirect ?? onpick` and naming the slot (e.g. "Draft at QB"). `.cp-top3` is the row DOM hook; `.cp-toptag` is the separate TOP badge in the name cell; the why-copy sits inside the row. The staged `.cp-primary` chip in the expand panel is intentional — **do not delete it**.
- **All four `dispatchAsync` sites** — START, PICK, UNDO, LOAD — set `busy` before the await and clear it in `finally`, with `error = st.error ?? ''` at each; the `as any` at PICK is gone.
- **Engine fence clean** — `src/engine` is byte-identical to the pin tree `8d8a8a1e81386e99f53f995492904348cb7d8345`.
- **What is NOT done:** the final composite; falsifier child logs for F27–F30; regenerated receipts, gate table and stale docs; §7 packaging; the side-by-side; two product defects described in §4.4.

So: **verify these still hold at your final bytes and say so in the hand-over. Do not rebuild them.**

## 3 · The Owner's locked words that touch your work (verbatim)

From the canonical reference (V there):

- **"remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare"** — the ring is dead; the top-three signal stays in the button.
- **"s14 looks much better although the panels are still too boxy and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"** — fix the panels, keep the why copy (now scoped to the top three by the later answer).
- **"ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything; you can preserve your mockup as an example of the direction of change but that's still not complete."** — near-exact w89; "directionally similar" is a FAIL.
- **"1.. top three highlight should be present in the button like w89" · "2. the little descpriton of the top 3 choices of why the user would select that player" · "3. w89 the buttons glow and there is a seprate "top" badge"** — the top-three treatment; glow and badge are two distinct things.
- **"Make a note that 01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format"** — a FUTURE direction. Record it; do not build the interactive field this sitting.
- **"free now and always"** and **"My budget is $0 — a free trial is not free."** — no domain, registrar, nameservers, custom domain or paid tier, ever.
- **"it's not a seed challenge. it' a brag share."** — text plus a bare URL, no save data.
- **P-254, Owner-approved 5 Nov:** *"per-slot last-write-wins on the WHOLE save, never a field merge; the losing lineage is kept on disk as a rung-back; a fork is resolved as 'keep both' at the slot level; additive `deviceId` field now"* — no CRDT, no mutation log, no action replay. (Recorded so you do not drift if you touch save code.)
- **"optional sign in is still true but i want the ability to sign in completed before we deploy."** — optional for the player, mandatory to exist; the core works offline with no account, forever. Accounts, sync, conflict resolution, local-save migration and the brag share are release gates, but **they are not your build** (§5).

## 4 · Claude's 05:33Z rulings — what you must honour, and what is not yours

He worked, pushed **`origin/architect/engine-and-seats @ a17c323de`**, then timed out before giving a full chat reply. **The work landed; the reply did not.** Five files changed: his 113-line ruling filing, the Cloudflare decision rewritten from Pages to Workers, two runbook lines, one releases line, and NOW.md. I reviewed the commit. Three rulings:

**4.1 Hosting — RATIFIED.** One Cloudflare Worker with Static Assets serves `dist/` and owns `/api/*`. D1 only at v1 — **no KV, no R2, no Durable Objects**. Explicit `wrangler deploy` after the Owner's "go"; no Git auto-deploy. Hostname corrected to **`play.76pancakes.workers.dev`** (Workers addresses are `<worker>.<account-subdomain>.workers.dev`, so a bare `76pancakes.workers.dev` is impossible), or the closest free variant; exact string pinned in `claude/releases.md` at rehearsal — **do not hard-code it in your tree**.

**What this changes for you — almost nothing, all cheap:** Vite `base: '/'` (root-relative assets); any backend call uses a **relative** `/api/...` path, never an absolute host; **no `_redirects` or `_headers`**; no `pages.dev` or `workers.dev` string anywhere in your tree; you write **no** wrangler config and deploy nothing. Supply the `dist/` sha256 and zip sha256 with the hand-over; Claude writes the releases row.

**4.2 Stats — RULED, not your bytes.** Both 17-0 and 20-0 are recorded. "Players' top seasons" means the **user's own drafted/frozen players across that user's runs**, not real NFL careers. Aggregates are maximised; **raw logs stay pruned**; whole-league awards are deferred. One ledger row per run at the existing elimination moment; legend weights 100/10/1 kept, labelled INFERRED. Three fields — conference `seeding`, `playerLines` (~2.7 KB/roster), `pickOverall` (~0.4 KB) — are `colors/src/app/saves.ts` **pin bytes** and wait for **one deliberate re-pin sitting after your merge**; seam golden `e8fed8ab…` must then be unchanged. **Do not add those fields yourself. If your close-out touches `saves.ts`, stop and report before editing.**

**4.3 Auth — RULED, not your bytes.** **Better Auth inside the same Worker**, D1 for users/accounts/sessions; **GitHub at v1**, Google only if a spike passes; Clerk rejected because its production guide requires a domain you own. No hand-rolled credentials. Your only obligation is the relative `/api/...` rule above.

**4.4 A caveat about his missing contract:** the `claude/account-sync-contract-2026-11-21.md` he listed as his next deliverable **does not exist** at that commit. No plan, no account build, no final response. **Do not wait for it and do not code around a rumour of it.** If a seam interface needs to change, ask him to publish it first.

## 5 · The fence — what you must not do

No edits to `src/engine/**`, `colors/`, the pin, ratings, `FLEX`, `RATING_SPECS`, `SLOTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `modelWeights()`. Zero engine-byte diff: `git diff --name-only 408410477 <your tip> -- colors/src` → empty, and the delivery's `src/engine` tree hash `8d8a8a1e81386e99f53f995492904348cb7d8345` must still hold. Do not build the account system, D1 schema, auth, Worker, wrangler config or deploy. No gh-pages work, no make-live, no re-hosting rival images. **Do not remove the display-rounded-oracle caveat from the top-three copy** (`suggestWhy.ts:8-11,28-29,37` marks the tie extension INTERIM, display-rounded, awaiting `rawSort`) — deleting it would erase why >3 rows can appear on a tie. No new images in lanes; no dated/merged/final copies in the root; no force-push, no stash; commit by path and push only your own branch, verified with `git ls-remote`. No weakening a law to make it pass — if a law dies for a real reason, name it and file the fix. `rawSort` stays **FILED-NOT-APPLIED**; if top-three ordering cannot match the pinned engine without `colors/src` bytes, **stop and report**.

## 6 · Your work, in order — what, where, how to prove it

### Step 0 — Establish the baseline BEFORE any edit
Run `bash scripts/acceptance-run.sh` on the delivered S15 tree. If a step fails, stop and report the step, command and stdout. This is the baseline you will improve, and it proves you did not inherit a red tree silently.

### Step 1 — Close D1, the merge blocker (one digest policy)
`node tools/verify-package.mjs .` on the S15 tree currently gives `359 UNPARSEABLE`, `474 EXTRA`, exit 1. Cause: `scripts/regen-manifest.mjs:17` writes **SHA-256 (64 hex)** into `CHECKSUMS.txt`, and `scripts/package-delivery.sh:39` checks with `sha256sum`, but `tools/verify-package.mjs:29,46` parse only 32-hex **MD5** and `:34` hashes with `md5`. The hand-over's "node_modules + pending regen" diagnosis is **wrong** — there is no `node_modules` and regen already ran. The manifest itself is good (`shasum -c CHECKSUMS.txt` → 359 OK, exit 0).
**Fix:** one digest policy across generator and verifier — the minimal patch in pickle's `0303` is to accept 32 *or* 64 hex in both regex occurrences and choose `createHash(want.length === 64 ? 'sha256' : 'md5')`, update the comment, and add composite **step 17b** (`node tools/verify-package.mjs .`) after step 17. **Do not weaken the verifier to pass.** This is the one change explicitly yours in `tools/` — inside your own S15 tree; the council `tools/` directory is MUSE/Architect-owned.
**Done when:** `verify-package` reports OK / 0 FAILED / 0 missing / 0 EXTRA, converse clean, exit 0 at final bytes; the S14 tree still verifies `467 OK / 0 FAILED / 0 missing`, exit 0.

### Step 2 — Falsify F27–F30 by name
`deliveries/receipts/partH-s15/` has shell FA–FD and slot FS1 logs but **no F27–F30 logs** — the four new laws L26–L30 / S32 / S33 have never been falsified. Run, at final S15 bytes:
```
node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs
```
F0 baselines and F15–F26 must still pass; **F27, F28, F29, F30 must DIE by their own names**, with child logs under a fresh `deliveries/receipts/partH-<next>/`. Keep the fresh-server / stale-server guard and adapt the selector guards to the new classes. A green count in prose is not a falsified law.

### Step 3 — Fix the product defects in your file
1. **D5, stale engine stamp (non-optional).** `src/App.svelte:83` still says `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the *previous* pin — while the shipped engine is `408410477`. `metaNow()` stamps it into autosaves and manual slots; `Saves.svelte:80` prints it to the user. Fix it so no save arrives flagged foreign, and add a law: **the envelope's `engineVersion` equals the running `engineVersion()`**. If the exact stamp format is unclear, ask Claude in one line rather than guessing.
2. **One-click toast can lie.** `DraftBoard.svelte:37-46` sets `draftedToast` synchronously inside `quickDraft`, before the async `pick()` (`App.svelte:194-206`) can refuse the PICK — so S32 can show "illegal fit" while the toast still says "Drafted · <name>". Fix shape in pickle's `inbox/20261121-0305-pickle-S15-UX-implications.md`.
3. **Seed defects.** Restore does not write the seed back to the URL (`App.svelte:183` sets `seed`; the only URL write is `:120` in `startDraft`); a second draft in one tab replays the same seed because `?seed=` is re-read by `parseSeed()`; `parseSeedCode` is lenient (`b36:1.5` → 1).
4. **Retired selector.** `scripts/probe-w14.mjs:32` still clicks `.cp-suggest .cp-quick`; re-point to `.cp-top3 .cp-draftbtn` or retire the probe with a reason. `MERGE-MANIFEST.md:21` ships it to Colors.
5. **Source-string law.** `node.battery.mjs:611` pins the exact `<span tabindex="0">` at `BoardRow.svelte:53` (which triggers Svelte's `a11y_no_noninteractive_tabindex`). If you change the span to a button, reconcile the law and the fix together and say which changed.

### Step 4 — Retire the ring laws, keep the coverage
Retire **by name with a written reason**: L13, L16–L25, and any other law whose selector or premise was the ring. Coverage must not silently disappear. Assert instead: TOP badge exactly on the three array-position rows at every sort and checkpoint; one visible Draft button per row with all-button pulse and top-three sheen/opt-out; reduced motion disables both; why copy on exactly those three with VM-sourced text; no `cp-quick` class; no ring class; no law derives state from rendered text; L-ERR both halves; **W14 both directions** (the explicit `?seed=` link wins over a DIFFERENT autosave; SAME-seed reload restores); sort-after-restore regression. **Do not weaken W14** and do not skip its six re-pointed selectors in `batteries/visual.battery.mjs` (`:98, :175, :199, :206, :230, :292` — `:292` is W14 leg A).

### Step 5 — Receipts and docs, generated not patched
No raw stdout in the tree currently prints `BOARD BATTERY · 23 pass` or `SHELL BATTERY · 51 pass`; the only S15 counts are prose. `deliveries/receipts/shell-battery.log` ends `SHELL_EXIT=1` and `fb-battery.log` ends in a `TimeoutError` — older sittings, not final evidence. Regenerate at final bytes and file the raw logs.
Regenerate from receipts: `node scripts/gate-table.mjs` → paste into `deliverables/CUTOVER-CHECKLIST.md` Gate B rows; `CUTOVER-ONE-PAGER.md:31,33` (`16/0 → 23/0`, `17/0 → 18/0`); `SLICE-STATUS-2026-11-20.md:16-27`; `VERIFY-§26-append.txt` §26.5/26.6 tails plus a §26.9 final-composite section; `SHELL-STATUS.md` at composite step 13d (stale hash and stale "ring" wording); `scripts/acceptance-run.sh:41,43,52` stale S13 numbers. Prefer one script that reads the receipts and emits the table, so this drift class dies instead of being patched again. Ensure `gate-table.mjs` does not print "S15 measured" over S14 numbers.

### Step 6 — One uninterrupted final composite
Run once at final bytes, **with no wrapper timeout**:
```
bash scripts/acceptance-run.sh
```
It must end **"ACCEPTANCE RUN COMPLETE"** with steps 13b–17 recorded `EXIT_CODE=0`. If a step fails, stop and report step + command + stdout; do not proceed on a red composite.

**Gate floors (minimums) are the S14 finals:** engine 430/430 · node 35/35 · board **19/0** · visual **18/0** · slot **28/0** · shell 48/0 · slice 29 pass / 0 fail / 10 skip / 3 defer · contrast 2/0 (three KNOWN team holes stay NAMED) · viewport 45/45, 0 overflow, 0 console/page errors · golden seam MATCH (`e8fed8ab…`) · falsifier set exit 0. The S15 pre-flight achieved **board 23/0, shell 51/0** independently (V by hy4 and porca); verify at your final bytes and generate counts from receipts — never copy a count from a sheet. A PASS is not product acceptance; a Verifier who wrote none of it signs off later.

### Step 7 — Side-by-side, including a panel-bearing screen
File the comparison at **390×844 and 1180×950, light and dark**, against live w89, of: Team Select, board with a top-three row, pick confirm, finished draft, **plus one season screen that actually renders `.cp-panel`** (Hub/Week/Standings). Reason: `.cp-panel` renders only on season screens, so a board-only capture cannot prove the glass law. If you cannot capture it, say so and scope the glass claim explicitly to season screens — do not let it pass silently. "Directionally similar" is a FAIL.

### Step 8 — §7 packaging and hand-over
- Fence receipts: `git diff --name-only 408410477 <tip> -- colors/src` → empty; file the delivery's `src/engine` tree hash and re-verify at final bytes.
- Built `dist/` **and** `dist/single.html`, with sha256 of each plus the zip sha256. Production `dist/` has one entry (`index.html`), no dev page. No `node_modules` in the package.
- **Delivery is ONE zip + its sha256, in ONE response. Do not attempt `git push` — it hangs (no credentials); your sandbox can read public HTTPS but cannot push.** Complete *all* work before responding: every response costs the Owner a publish step. If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding. (Verified in your own `START-OF-CHAT-ZAI.md:11,109-110`.)
- Playwright recorded honestly: **"not verified in the Architect's sandbox at 1.65.1; verified by seats at 1.57.0 / chromium-1255"** — never "no browser run is verified".
- A one-page note naming the stable classes (`.cp-top3`, `.cp-draftbtn`, `.cp-istop`, `.cp-toptag`, `.cp-why`), the retired-law table, the new floors, and the Workers build-contract changes, so Claude can re-point merge tests without guessing.
- Every claim labelled V/R/I/U with directory + command + result. Then say **"slices done"** — Claude merges and runs gates 1–10; the Owner decides make-live after seeing the side-by-side.

## 7 · Questions to ask back — never be blocked silently
Ask Claude in `inbox/` with `FOR:` and reasons if any of these is unclear: (1) is the seam published and frozen for your close-out; (2) is `dist/` = `index.html` + `assets/` or single-file (produce both either way); (3) what is the exact `engineVersion` stamp format for D5; (4) which of the §6 defects are in scope this sitting; (5) is the brag URL constant stubbed now with a hidden button. Do not guess and do not build the account system to "unblock" yourself.

## 8 · Definition of done
Digest fix landed and verifier clean on both trees · F27–F30 DIED by name with child logs · D5 stamp fixed with its law · toast and seed defects fixed · receipts regenerated from bytes · docs and gate table generated, not patched · one uninterrupted composite at final bytes · ring laws retired with reasons and new floors stated · W14 PASS both directions · side-by-side filed with a panel-bearing season screen · all gates at or above §6 floors · zero engine-byte diff and seam golden unchanged · Cloudflare-ready `dist/` and `single.html` hashed · Workers build contract honoured · hand-over complete with receipts. Then say "slices done".

## 9 · One-paragraph version
Read pickle's canonical reference and its addendum, Claude's `0533` rulings at `a17c323de`, and pickle's `0537` close-out order. **Slices 1–5 are already built — do not rebuild them.** Your job is close-out: establish the baseline, fix D1 (one digest policy + composite step 17b), falsify F27–F30 by name, fix the stale `ENGINE_PIN` and the toast/seed defects, retire the ring laws with reasons and new floors, regenerate receipts and docs from bytes, run one uninterrupted composite, file the side-by-side with a panel-bearing season screen, and hand over a Cloudflare-ready `dist/` (root-relative assets, relative `/api/...`, no wrangler config) with hashes. You do not build accounts, sync, stats, the Worker or the deploy. Owner words govern; Claude decides technical matters; work comes from the queue.

=====================================================================
end of full prompt
=====================================================================
