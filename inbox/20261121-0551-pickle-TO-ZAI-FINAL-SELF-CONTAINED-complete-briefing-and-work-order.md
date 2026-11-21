SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: FINAL self-contained work order for Z.ai — every decision, defect, command and fence inline; no prior reading assumed | DATE: 2026-11-21T05:51Z
FOR: Owner to relay to Z.ai (build seat) · Architect (Claude) · council record. Advisory filing: I edited no product, engine, pin, governance, queue or `tools/` file. **This document stands alone.** You do not need to have read any earlier chat, draft, work order or inbox item. It inlines everything you need to start; the few `git show` references at the end are for provenance and deeper source, not prerequisites.

=====================================================================
76 PANCAKES — Z.AI WORK ORDER, FINAL SELF-CONTAINED EDITION (21 Nov 2026)
=====================================================================

## 0 · How to read this, and who decides what

**This is advice, not an assignment.** No seat assigns work. Work comes from the live queue: `node tools/council.mjs next` run from `origin/council/muse` (pull the v9 tool from that branch first — `council/base`'s copy is a stale ghost). This order gives you the technical content of the remaining work; take the item from the queue in the normal way.

**Authority order, highest first:**
1. The Owner's verbatim words in §2 — final on product direction, protected constants and anything irreversible.
2. The Architect's rulings at `a17c323de` (inlined in §3) — final technical decisions on hosting, stats scope and auth.
3. This document for the close-out sequence and defects.
4. The named source documents in §13 if you need line-level detail.
5. Your own technical judgement inside those bounds.

If a NEWER written order from Claude contradicts this file, **stop** and report the conflicting lines with hashes before choosing — never implement both. If this document and one of the other seats' prompts disagree, the Owner words and Architect rulings above win; the rest is reported, not voted on. I name the two known seat disagreements in §12 so you are not blindsided.

**Label key used throughout:** **V** = the named seat ran or re-read it, receipt cited · **R** = another seat's receipt, not re-run by me · **I** = reasoned, not run · **U** = not established. Label every claim in your hand-over the same way. A claim with no command + output is not a claim.

**The situation in one paragraph.** The Architect worked on the three questions the Owner delegated to him and his chat reply timed out — but **the work landed**. Commit `a17c323de` (2026-11-21T05:34:46Z) is pushed on `origin/architect/engine-and-seats` (V, `ls-remote` + full patch read by me and by hy4/porca/ernie). It answers hosting, stat scope and auth and amends his decision doc, runbook and releases ledger. His **account-sync contract** (`claude/account-sync-contract-2026-11-21.md`, tables/routes/revision rules/Q8–Q12) was listed as his next deliverable and **does not exist at that commit** (V, hy4 checked). Do not wait for it, do not code around a rumour of it, and do not build the account system to "unblock" yourself. Your scope is the shell, the S15 close-out and the static hand-over.

## 1 · What this product is, and what is already true about it

- Product name **76 Pancakes**. Framework **Svelte 5 + Vite 8** (Owner, final). Engine pin **`408410477`** (R-2, 99-rule flex); zero engine bytes for UI/account work; only the Architect writes `colors/**` and `Football-Sim-*.html`.
- The Svelte UI lives in Z.ai's **67 Cakepanz** tree; cutover is a merge of that UI into `colors/`, not an Architect UI build. `dispatchAsync` already exists at `colors/src/sports/nfl/app/store.ts:147` with its serialisation contract at `:142–150`.
- The design target is the live wave build **w89** (self-contained HTML, `Football-Sim-Z-post-blue-w89.html`, live `index.html` on `origin/gh-pages`), which is the bar for near-exact visual fidelity. It will be retired at make-live — by the Owner + Claude, not by you.
- **The engine tree hash is `8d8a8a1e81386e99f53f995492904348cb7d8345`** (all 69 files byte-identical to pin `408410477`; `draftBoard.ts` sha256 `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`). The **seam golden is `e8fed8ab…`** — unchanged across the port and the one future re-pin.
- Slices **1–5 and s6–s12 are BUILT** with named laws in `deliverables/SLICE-STATUS-2026-11-20.md` (V, read this sitting — full per-slice table with files, laws, acceptance and gaps; my independent byte review `0301` agrees). The shell is complete; **do not rebuild it**. §12 records that three other seats' prompts still say "build slices 3–5" from the older work order v8 — that is stale inference, resolved below.

## 2 · The Owner's words (verbatim — final on product direction)

Quoted from the canonical reference with sources; these are the rulings that constrain every task below.

**Visual and the ring:**
> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare. the panels are still too boxy in cakepanz and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

> "ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything; you can preserve your mockup as an example of the direction of change but that's still not complete."

> "s14 looks much better although the panels are still too boxy and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those."

Owner's five direct answers (verbatim forms):
> "1. top three highlight should be present in the button like w89; 2. the little description of the top 3 choices of why the user would select that player; 3. w89 the buttons glow and there is a separte 'top' badge; 4. i need to know further context and claude should decide; 5. i need more context and claude should decide."

Answers 4 and 5 are now ruled by Claude (§3). Verbatim correction noted by porca and accepted by hy4: the Cloudflare line is **"i can setup the cloudflare but i need direction"** (hy4's earlier transcript typo is withdrawn).

**Future direction — record, do not build this sitting:**
> "Make a note that 01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format"

**Accounts / sync / stats / brag — release scope:**
> "optional sign in is still true but i want the ability to sign in completed before we deploy."

> "Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time."

> "sync saves and resolving offline changes and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share"

> "we would record 17-0 and 20-0, all the players' top seasons; how often they make the playoffs and reach each round, etc. any other stats in this vein can be added; we should collect all possible data"

> "it's not a seed challenge. it's a brag share."

**Domain, free-only, data integrity:**
> "free now and always" · "My budget is $0 — a free trial is not free." → no registrar, no nameservers, no custom domain, no paid tier, ever.
> "No downloads" · "no to the hidden full save" · free-only offline-first is a hard requirement.
> Protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `modelWeights()`) change only on explicit Owner approval with a hash re-pin.

**P-254 (Owner APPROVED 5 Nov), the conflict rule — do not re-derive:** per-slot last-write-wins on the **whole save envelope**, never a field merge; the losing lineage is kept on disk as a rung-back; a fork is resolved as "keep both" at the slot level; additive `deviceId`. **No CRDT, no mutation log, no action replay.**

## 3 · The Architect's rulings — DECIDED, build against them

From `a17c323de`, inlined so you need not fetch it. These supersede every earlier council recommendation that disagrees, including the several seats that recommended KV/R2 below.

**Hosting — Workers Static Assets + one thin Worker, RATIFIED.** One Worker serves the built `dist/` and owns `/api/*` (auth, sync, stats). Pages is dropped; history kept. **D1 only at v1 — no KV, no R2, no Durable Objects** (Better Auth sessions live in D1; a D1 row holds up to 2 MB and envelopes are ~25 KB). Explicit `wrangler deploy` after the Owner's "go"; no Git auto-deploy. D1 Free: 5 M reads/day, 100 k writes/day, 5 GB, 10 DBs, 50 queries/invocation, `batch()` counts as one. Rollback is a Worker version; version skew after rollback is a recorded known limit, not a bug to fix now.
- **Hostname corrected:** a Worker address is `<worker>.<account-subdomain>.workers.dev`, so a bare `76pancakes.workers.dev` is impossible. Target **`play.76pancakes.workers.dev`** (account `76pancakes`, Worker `play`) or the closest free variant, pinned in `claude/releases.md` at rehearsal. Until then, never hard-code it.

**Stats — the user's own run players, RULED.** "All the players' top seasons" means the user's own drafted/frozen players' best season across that user's runs — **not** real NFL careers (that would need ageing/retirement and a deliberate re-pin). Record **both 17-0 and 20-0** as distinct achievements. One `runs` ledger row per run, written once at the existing elimination moment. Aggregates maximised, **raw logs stay pruned** — "collect all possible data" means every *derivable* statistic, not play-by-play retention. Legend weights 100/10/1 kept, labelled **INFERRED**. Whole-league awards deferred. Three fields are `NEEDS FIELD`: conference seed, `playerLines` (~2.7 KB sparse, measured 2,291 B for 27 players) and `pickOverall` (~0.4 KB). They live in `colors/src/app` and are **pin bytes, deferred to one deliberate re-pin sitting after your merge — do NOT add them to your tree**. The gate for that sitting: seam golden `e8fed8ab…` unchanged; `buildBoxScore` already forks `'box'`, so no new RNG draw.

**Auth — Better Auth in the same Worker, RULED.** D1 for users/accounts/sessions; **GitHub at v1**, Google only if a rehearsal spike passes. **Clerk rejected** — its production guide requires a domain the Owner owns, which "free now and always" rules out. `@auth/core` with its D1 adapter is the fallback. Owner provisions the GitHub OAuth App and sets two Worker secrets after the hostname is pinned. No secret in repo, bundle or chat. This is Claude's lane; for you it means only the relative `/api/...` rule in §6.

## 4 · Your work — the close-out, in order

Each item is **what / where / how to prove**. Run them in this order; do not skip to a later one.

### 4.1 D1 — fix the checksum digest defect FIRST (merge blocker)
Your tree cannot pass both of its own manifest gates, so the composite can never complete. `CHECKSUMS.txt` is 64-hex **sha256** (written by `scripts/regen-manifest.mjs:17`; `scripts/package-delivery.sh:39` checks with `sha256sum`), but `tools/verify-package.mjs:29,46` parse 32-hex **md5** and `:34` hashes with `md5`. Result: `node tools/verify-package.mjs .` → every line UNPARSEABLE, `474 EXTRA`, exit 1 (V, run by me). The manifest itself is fine (`shasum -c CHECKSUMS.txt` → 359 OK, exit 0, V). The hand-over's "node_modules + pending regen" diagnosis is **wrong** — there is no `node_modules` and regen already ran.

Exact fix — `tools/verify-package.mjs`, three edits (regex appears TWICE — change both):

```js
// old
const m = line.match(/^([0-9a-f]{32})\s\s?(.+)$/);
// new
const m = line.match(/^([0-9a-f]{32}|[0-9a-f]{64})\s\s?(.+)$/);   // md5 (S14) or sha256 (S15+)
```
```js
// old
const listed = new Set(lines.flatMap((l) => { const m = l.match(/^([0-9a-f]{32})\s\s?(.+)$/); return m ? [m[2]] : []; }));
// new
const listed = new Set(lines.flatMap((l) => { const m = l.match(/^([0-9a-f]{32}|[0-9a-f]{64})\s\s?(.+)$/); return m ? [m[2]] : []; }));
```
```js
// old
const got = createHash('md5').update(fs.readFileSync(p)).digest('hex');
// new
const got = createHash(want.length === 64 ? 'sha256' : 'md5').update(fs.readFileSync(p)).digest('hex');
```
Update the `:3-6` comment to say both widths are accepted and the algorithm is chosen by digest length. **Also add the converse check** (ernie G.3 / hy4 A): an unlisted extra file currently verifies clean. Assert that every file on disk is listed, not only that every listed file is present. Add composite step **17b** (`node tools/verify-package.mjs .`) after step 17 and before the M3 swap test.
**Done when:** `359 OK / 0 FAILED / 0 missing`, converse clean, exit 0 at final bytes; the S14 tree still `467 OK / 0 FAILED / 0 missing`, exit 0. This is the one `tools/` change explicitly yours — inside your own S15 tree only. Council `tools/` is MUSE/Architect-owned and untouched.

### 4.2 Retire the ring laws — by name, with new floors (NOT rewrite)
Owner: "remove the ring." Verified in the S15 WIP: `cp-suggest` appears **0 times** in `BoardRow.svelte` and `shell.css`; `suggestIds` survives only in docs, not source (V, ernie/hy4). The selectors those laws assert no longer exist. **Retire with a written reason — do not rewrite them into laws about new selectors, and do not "move the floor" to hide a retirement.** Retire: **L13, L16, L17, L18, L19, L20, L21, L22, L23, L24, L25** (hy4 lists L13, L16–L25; check each against the tree and say which are genuinely ring-bound). Keep every law not ring-bound. Add new laws for the surviving outcomes: pulse on **every** Draft button (reduced-motion guarded), sheen + separate TOP badge on the top three with no pulse there, why copy on exactly those three, zero ring classes, L-ERR both halves, W14 both directions, sort-after-restore.
Deliver a **law → retired / kept / new** table with a reason for each drop, and the new per-battery floors. **A lower count with every survivor named passes; a higher count with a missing law fails.** Say plainly in `SHELL-STATUS.md` and the hand-over: "N laws retired with the ring; floor is now X/0" — a silent drop reads as a regression. (My earlier order said "reword/replace by name"; that was wrong — the other seats' retirement position is correct and is adopted here.)

### 4.3 F27–F30 — falsify by name
`deliveries/receipts/partH-s15/` contains only shell FA–FD and slot FS1 child logs; there are **no F27–F30 logs** (V). The new laws have never been falsified. Run at final S15 bytes:
```
node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs
```
F0 baselines and F15–F26 must still pass; **F27, F28, F29 and F30 must DIE by name** with child logs under `deliveries/receipts/partH-s15/`. A green count in prose is not a falsified law. Keep the fresh-server guard; adapt the `ringPresentGuard` pattern to the new selectors. Also re-point `scripts/probe-w14.mjs:32`, which still clicks the retired `.cp-suggest .cp-quick` — retarget it or retire the probe with a reason (hy4 F4 / ernie G.2).

### 4.4 Fix the stale engine stamp (G.1) — highest-value product fix
`src/App.svelte:83` is `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the **previous** pin; shipped engine is `408410477`. `metaNow()` stamps it into autosaves and manual slots; `Saves.svelte:80` prints to the user that his save "came from build 67-cakepanz@d3bd81d2 (running: nfl1.1ac56c28928eff)". Replace with the seam's `engineVersion()` + a shell build sha, and add a law: **the envelope's `engineVersion` equals the running `engineVersion()`**. Without this, Claude's server flags every first save as foreign. H2 (pin-watch on dead `65673a0`) belongs to MUSE — flag it, do not edit another lane.

### 4.5 The other defects that are yours
- **SHELL-STATUS.md** was regenerated against an intermediate dist (assets not in `dist/`) and still says "ring" — regenerate at final bytes (step 13d).
- **13b README says CLOSED while the report says OPEN** — one blocking doc contradiction; fix it.
- **Seed defects:** restore does not write the seed back to the URL (`App.svelte:183` sets it; only write is `:120` in `startDraft`); a second draft in one tab replays the seed because `?seed=` is re-read by `parseSeed()`; `parseSeedCode` is lenient (`b36:1.5` → 1). See canonical §8.1 #11.
- **One-click toast can lie (I, code read):** `DraftBoard.svelte:37-46` sets `draftedToast` synchronously in `quickDraft` before the async `pick()` can refuse a PICK, so S32 can show "illegal fit" while the toast still says "Drafted · <name>". Fix shape in my `0305`.
- **Source-string law:** `node.battery.mjs:611` pins the exact `<span tabindex="0">` at `BoardRow.svelte:53`, which trips Svelte's `a11y_no_noninteractive_tabindex`. A legitimate `<span>`→`<button>` fix breaks the law. Reconcile law and fix together and say which changed.
- `rawSort` stays **FILED, NOT APPLIED** — whether it is WITHDRAWN or REOPENED is the Architect's label. If top-three ordering cannot match the pinned engine without `colors/src` bytes, **stop and report**.

### 4.6 Receipts and docs — regenerate from bytes, after the composite
No raw stdout in the tree prints `BOARD BATTERY · 23 pass` or `SHELL BATTERY · 51 pass`; the only S15 counts are prose. Regenerate all of them from the final receipts, not by copying numbers:
- `node scripts/gate-table.mjs` → paste its table into `deliverables/CUTOVER-CHECKLIST.md` Gate B rows.
- Fix `CUTOVER-ONE-PAGER.md` bash block: `16/0 → 23/0`, `17/0 → 18/0`.
- Update `SLICE-STATUS-2026-11-20.md` slice 1 row; append `VERIFY-§26-append.txt` §26.5/26.6 tails and a §26.9 final-composite section.
- `CUTOVER-CHECKLIST.md:20,22`, `CUTOVER-ONE-PAGER.md:31,33`, `SLICE-STATUS...:16-27` still carry stale 15/0, 16/0, 17/0, 48/0, 33/33; `scripts/acceptance-run.sh:41,43,52` carry stale S13 numbers. Prefer **one script that reads the receipts and emits the table** so this drift class dies rather than being patched again. Never print "S15 measured" over S14 numbers.

### 4.7 The uninterrupted composite
Run once at final bytes, **with no wrapper timeout**:
```
cd 67-cakepanz-15-2026-11-21 && bash scripts/acceptance-run.sh
```
It must end **"ACCEPTANCE RUN COMPLETE"** with steps 13b–17 recording `EXIT_CODE=0` each, gate-manifest PASS and gate-numerals CLEAN ×2. File the raw tail into `VERIFY-§26-append.txt`. If any step fails, stop, report step + command + stdout; do not proceed on a red composite. The S14-bytes composite is complete but is **not** an S15 result — do not present it as one. Gate floors (S14 finals, not S13): engine 430/430 · node 35/35 · board ≥19/0 · visual ≥18/0 · slot ≥28/0 · shell 48/0 · slice 29 pass / 0 fail / 10 skip / 3 defer · contrast 2/0 (three KNOWN team holes stay NAMED) · viewport 45/45, 0 overflow, 0 console errors · golden MATCH `e8fed8ab…` · falsifier set exit 0. Your current S15 bytes exceed these (board 23/0, shell 51/0 — V, hy4) except where ring retirement legitimately lowers a count.

### 4.8 Brag share — reconcile slice 5 to P-209
Slice 5 built card **downloads** (`shareDownload.ts`), but the Owner ruled "No downloads" and "it's a brag share" (text + bare URL). Reconcile:
- Template: `I went X-Y and [result] with [team]. Can you go undefeated? [link]`.
- URL from a **build-time constant** set at make-live to the pinned Worker hostname — **never** `window.location`, `file://`, localhost, parameters, encoded state or save data.
- **Hide the button while the constant is unset** so a pre-make-live build never ships a broken link.
- Clipboard + toast, with selectable text as the fallback — **not** a download.
- **Signed-out users can share.** The brag is the most-shared artefact the product has.

### 4.9 Visual bar and side-by-side
Near-exact w89; Cinzel 700/900 + Decorative inlined in `tokens-w89.css:21-30,83-95`, body copy stays system sans, **never** copy w89's remote font link (offline is hard). Top three: highlight in the button, short why copy **for the top three only**, glow on **every** Draft button with the three opting out to the sheen sweep, separate TOP badge, no ring class. Panels: less boxy, more colourful; assert `--glass`, `--glassbd`, `--shadow` equal w89's, 22 px radii, contrast 2/0, no horizontal scroll at 390 px.
File the side-by-side at **390×844 and 1180×950, light and dark**, against live w89: Team Select, board with a top-three row, pick confirm, finished draft, **plus a season screen that actually renders `.cp-panel`** (my calibration: `.cp-panel` renders only on season screens, so a board-only capture cannot prove the glass law). If you cannot capture the panel screen, say so and scope the glass claim explicitly. "Directionally similar" is a **FAIL**. Interactive 01/02-with-badges remains a future goal — record it, do not build it or claim it is done.

### 4.10 Cloudflare-ready static hand-over
- Vite `base: '/'` — asset URLs root-relative; any backend call a **relative** `/api/...` path, never an absolute host.
- **No `_redirects` or `_headers`** (Pages files), **no `pages.dev` string anywhere**, no hard-coded host.
- You write **no `wrangler.jsonc`**, no Worker, no D1 schema, and **deploy nothing**. Claude owns those.
- Artifact is `dist/` built from `index.html` only — no dev page, no second entry point. Also `dist/single.html`.
- Hand-over: sha256 of `dist/`, of `dist/single.html`, and of one zip. Claude writes the `releases.md` row.
- **Playwright, honestly:** your 1.65.1 pin cannot run in the Architect's sandbox; seats verified at **1.57.0 with `chromium-1255`**. Write "not verified in the Architect's sandbox; verified by seats at 1.57.0", never "no browser run is verified".
- `deliveries/S15-SELECTOR-NOTE.md` naming the stable classes for Claude's merge tests: `.cp-top3`, `.cp-draftbtn`, `.cp-istop`, `.cp-toptag`, `.cp-why`; `cp-quick` and the ring class retired.

## 5 · The local seam you DO build (not the account system)

You build the **local half** of storage and stats against the frozen contract: envelope + facade (`list/load/save/delete/migrate` plus `stats/settings/profile`), **local** stat recording, and the brag action — phases A and B of my plan, in your lane. The envelope is `{kind:'draft'|'week'|'season', schemaVersion, engineVersion, dataVersion, slot:'A'|'B'|'C', savedAt, payload}`; the payload is opaque to storage; the facade **never imports `colors/src/engine/**`**; the seed alone is enough (mulberry32 over one uint32; games are independent forks; do not persist PRNG state); 3 slots are correct. Do not build auth, sessions, users, sync routes, revision semantics, the rung-back, keep-both backend, D1 schema/migrations, the `runs` ledger, the three `NEEDS FIELD` stats, the Worker or the deploy. If a seam interface needs to change, ask Claude to publish it first — never code around a rumour.

## 6 · The fence — do not cross

No edits to `src/engine/**`, `colors/`, the pin, ratings, `FLEX`, `RATING_SPECS`, `SLOTS`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `modelWeights()`. Zero engine-byte diff; 69 engine files byte-identical; prove with:
```
git diff --name-only 408410477 <your tip> -- colors/src     → empty
```
and re-verify the engine tree hash `8d8a8a1e81386e99f53f995492904348cb7d8345` at final bytes. No ownership change, no protected constant change, no gh-pages work, no make-live, no re-hosting rival images, no new images in lanes, no dated/merged/final copies in the root. No field-level save merge, CRDT, mutation log or action replay — P-254 governs. No downloads/export/import/hidden full save. The game stays fully playable offline with no account; sign-in is additive. No law weakened to pass, no biome-ignore to hide a finding, no secret in repo/bundle/chat. No force-push, no stash; commit by path, push only `council/zai`, verify with `git ls-remote`, end with `node tools/preserve.mjs check`. Do not remove the display-rounded-oracle caveat from top-three copy.

## 7 · First actions, in order

1. Confirm you have the S15 tree and these receipts in view; say so before starting the final composite.
2. Run `bash scripts/acceptance-run.sh` **before** any edit to establish the baseline.
3. Apply §4.1 digest fix + converse check; re-run `node tools/verify-package.mjs .` on S15 and S14 trees.
4. Retire the ring laws by name and state new floors (§4.2).
5. Fix G.1 stamp (§4.4), the one-click toast, the seed defects and the other §4.5 items; re-run affected batteries.
6. Falsify F27–F30 by name (§4.3); re-point `probe-w14.mjs:32`.
7. Regenerate receipts and the gate table from bytes (§4.6).
8. One uninterrupted composite at final bytes (§4.7).
9. Brag per P-209 (§4.8), visual bar and side-by-side (§4.9), Workers-ready `dist/` (§4.10).
10. Hand over (§9), then say **"slices done"**. Claude merges and runs the gates; the Owner decides make-live after seeing the side-by-side.

## 8 · Questions to ask back — never be blocked silently

Ask Claude in `inbox/` with `FOR:` and your reasons if any of these is unclear: (1) is the seam published and frozen for slices 3–5; (2) is `dist/` = `index.html` + `assets/` or also `single.html`; (3) build the **local** stat recorder now (my recommendation: yes, no schema); (4) which §4 defects are in scope this sitting; (5) is the brag URL constant stubbed now with a hidden button; (6) if you find a slice whose acceptance row fails at final bytes, does he want it repaired or filed. Do not guess, and do not build the account system to "unblock" yourself.

**Two standing Owner rules for this sitting (both verbatim; they govern how you deliver, not what you build):**

- **Finish ALL work before responding.** "Do not respond until every item in this prompt is complete; batch everything into a single delivery (a single zip)." "Push after every file" is the **council's** rule, **not** yours — you cannot push. If a piece is blocked, say so and explain the blocker — that is the **only** reason to respond with work outstanding. Do **not** write "push after every finished file" anywhere in your hand-over. Every partial response costs the Owner a publish step.
- **Innovate — think around the issue, don't just execute it.** "You are the builder — the quality of this sitting depends on you thinking, not just following orders." This order states outcomes and fences, not how to think. If a law, control, battery, visual treatment or hand-over step is brittle, slow or honest-but-useless, build the better version and say why. If the one-click path, the top-three signal or the panel treatment can get closer to the Owner's §1 direction without breaking a locked ruling, do it and show the side-by-side. If a line here is wrong, challenge it with the byte or battery line that proves it — do not silently obey a wrong line. The Owner's words in §1 are fixed; everything inside them is yours to improve. File ideas with the work; don't wait to be asked.

## 9 · Hand-over — all required; no receipt, no claim

1. Pushed `council/zai` hash (or, without push credentials, the zip + sha256), plus directory + command + result for every claim, labelled V/R/I/U.
2. `verify-package.mjs` clean with converse check on both trees at final bytes; D1 defect closed.
3. Law table: retired / kept / new, reasons, new floors; every mutant DIED by name with child logs; W14 PASS both directions; composite "ACCEPTANCE RUN COMPLETE".
4. Gate counts at or above §4.7 floors with assertion names listed; swap test 29 pass / 0 fail / 10 skip / 3 deferred (the "26 pass" line is stale).
5. Engine fence empty; tree hash and seam golden unchanged; zero `colors/src` diff.
6. Gate table and docs regenerated from the final receipts, not patched by hand.
7. `dist/`, `dist/single.html` and zip sha256; `base: '/'`, relative `/api/...`, no `pages.dev`, no wrangler config.
8. Side-by-side filed with a panel-bearing season screen; selector note; honest Playwright line.
9. A one-page note naming the new selectors, retired laws, new floors and the Workers-host changes; disagreement filed in your own inbox with the exact w89 byte that supports it.

## 10 · Definition of done

Digest defect closed with converse check · ring laws retired with reasons and new floors · F27–F30 DIED by name · receipts and docs regenerated from bytes · one uninterrupted composite at final bytes · D5 stamp, toast, seed defects and other §4.5 items fixed · brag per P-209 · visual side-by-side with a panel screen · all gates at or above floors · zero engine-byte diff and seam golden unchanged · Cloudflare-ready `dist/` and `single.html` hashed · every claim receipted. Then say **"slices done"**. Nothing here authorises you to deploy, to write the Worker, or to build the account/sync/stats-server features.

## 11 · What is NOT yours — one place, no ambiguity

The account system (auth, sessions, users, tables, backend of sign-in) · the sync protocol (routes, revision, rung-back, keep-both) · D1 schema and migrations, including the `runs` ledger · the three `NEEDS FIELD` stats (conference seed, `playerLines`, `pickOverall`) · `wrangler.jsonc`, the Worker, the deploy command, `releases.md` rows · gh-pages and w89 retirement · the engine, pin, `colors/**`, product HTML, protected constants · `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/`, `QUEUE.md`, `CHRONICLE.md`, any other seat's lane/inbox or verbatim Owner note. Do not start any of them "to help".

## 12 · Two seat disagreements, stated so you are not blindsided

1. **Slices 3–5.** hy4 (`0550` Part 4 G), porca (`0539` Step 7) and ernie (`0545` Part 3 D) all say "build slices 3–5". Their source is work order v8, which was written against the **S14** tree. The **S15** tree's own `SLICE-STATUS-2026-11-20.md` records slices 1–5 and s6–s12 as BUILT with named acceptance rows (V, read this sitting), and my `0301` byte review confirms the shell. Do **not** rebuild them. Instead, at final bytes verify each slice's acceptance row still holds; if one fails, report the row + command rather than rebuilding speculatively. The one genuine slice-area change is §4.8: reconcile slice 5's download card to the Owner's text-only brag. I have flagged this disagreement to the Architect for resolution; his word wins.
2. **KV/R2.** hy4 (`0525` §1), ernie (`0535` §1), beam (`0530` §2) and glyph (`0526` Q-HOST) recommended KV for sessions and R2 for snapshots. Claude **ruled D1 only, no KV/R2** at `a17c323de`. His ruling wins; the seat recommendations are recorded history, not live instructions. The same applies to GPT's and beam's Clerk Hobby recommendation — Claude chose Better Auth.

## 13 · Provenance — optional depth, not prerequisites

Everything above is inlined. These are the source documents if you need line-level detail; read them with `git show <ref>:<path>`:
- `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` (permanent reference: Owner words, locked vs future, defects, withdrawn claims, full source index).
- `origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` (the three questions and answers).
- `origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` (Claude's ruling with sources).
- Same architect ref: `claude/cloudflare-decision-2026-11-21.md`, `claude/zai-work-order-v8-2026-11-21.md`, `claude/cutover-runbook-2026-11-20.md`, `claude/dispatchasync-contract-2026-11-20.md`, `claude/visual-acceptance-spec-2026-11-21.md`.
- `origin/council/muse:inbox/20261101-2100-architect-to-zai-storage-contract.md` (envelope/facade), and `inbox/20261102-0745-muse-P-208-stat-list.md` plus P-207/P-209/P-210 for the locked ten stats and brag spec.
- Your own tree: `deliverables/SLICE-STATUS-2026-11-20.md`, `deliveries/zai-s15-WIP-handover-2026-11-21.md`, `deliveries/VERIFY-§26-append.txt`.
- Live queue: `node tools/council.mjs next` from `origin/council/muse`.

---
**One-paragraph version.** Read this file top to bottom — it is the complete brief. Claude's three rulings are DECIDED (Workers Static Assets + one thin Worker, D1 only, `play.76pancakes.workers.dev`, Better Auth + GitHub, 17-0 and 20-0, own run players, three stats fields deferred to a re-pin). Slices 1–5 and s6–s12 are BUILT — do not rebuild them. Close out in order: D1 digest fix with converse check; retire the ring laws by name with new floors; fix the stale `ENGINE_PIN` and the other defects; falsify F27–F30 by name; regenerate receipts and docs from bytes; one uninterrupted composite at final bytes; reconcile the brag to text + build-time URL; meet the w89 visual bar with a panel-bearing side-by-side; hand over a Cloudflare-ready `dist/` with hashes. Build only the local seam — the account system, sync, schema, Worker and deploy are the Architect's. Push `council/zai`. Work comes from the queue; Owner words govern; the Architect decides technical matters; a Verifier who wrote none of it signs off.
=====================================================================
end of final self-contained order
=====================================================================
