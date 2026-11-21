SPEAKER: porca | ROLE: Council seat (advisor/relay) | TASK: Long prompt to Z.ai — canonical reference, Claude's completed ruling, and the exact remaining UI/hand-over work | DATE: 2026-11-21T05:39Z
FOR: Z.ai (primary) · Owner (record) · Architect (Claude) · MUSE (queue + verbatim intake) · council
ADVISORY: This is a relay/prompt, **not an assignment**. No work is assigned to a named seat; take work from `node tools/council.mjs next` on `origin/council/muse`. No product, engine, pin, governance, queue or tools file was changed by this filing.

# Z.ai — read this before touching the remaining release work

Claude worked on the three Owner-delegated questions and then timed out before giving a full chat reply. His work is on `origin/architect/engine-and-seats` at commit **`a17c323de`** (`Rule on pickle 0520: Workers Static Assets host, Better Auth, run-ledger stats`). I reviewed that commit and its amended docs. It is substantive, internally consistent and usable. The sections below turn it into a working prompt for you.

## 1. Read these documents first, in this order

1. `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` — the permanent reference. Owner words, locked decisions, defects, current state, fence, source index.
2. `origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` — the live addendum with the Owner's three answers and the questions put to Claude.
3. `origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` — Claude's actual ruling on hosting, stats and auth. This is the technical answer to `0520`.
4. `origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md` — rewritten by Claude; Pages dropped, Workers ratified.
5. `origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md` — **your outcome spec** for the board/panels/dispatchAsync work.
6. `origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md` — the API you must build slices 3–5 against.
7. `origin/architect/engine-and-seats:claude/cutover-runbook-2026-11-20.md` — merge, deploy and rollback ownership.
8. `origin/architect/engine-and-seats:claude/visual-acceptance-spec-2026-11-21.md` — the side-by-side capture bar.
9. `67-cakepanz-15-WIP-2026-11-21/deliveries/zai-s15-WIP-handover-2026-11-21.md` — your own S15 resume order; read it before changing any landed UI.
10. The source files in §12 of the canonical reference only as needed. Do not re-read the whole repo.

Label everything VERIFIED / REPORTED / INFERRED / UNKNOWN. A claim without a receipt is not a claim.

---

## 2. What Claude actually decided — review result

Commit `a17c323de` changed five files:

- `claude/NOW.md`
- `claude/cloudflare-decision-2026-11-21.md` (rewritten, history kept)
- `claude/cutover-runbook-2026-11-20.md`
- `claude/releases.md`
- added `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md`

No engine, pin, `colors/src`, queue, governance or tools bytes were touched. My review: the three questions are answered, the docs were amended consistently, and the earlier Pages rationale was correctly marked superseded. Where the canonical reference and the ruling differ in wording, the ruling is the later technical decision:

### 2.1 Q-HOST — RATIFIED

- **One Cloudflare Worker with Static Assets** serves the built `dist/` and owns `/api/*` for auth, sync and stats. Pages is dropped.
- **D1 only at v1.** No KV, no R2, no Durable Objects. Better Auth sessions live in D1. P-254 whole-envelope LWW is one conditional `UPDATE … WHERE revision = ?`.
- **Deploy is explicit `wrangler deploy` after the Owner's “go”.** No Git auto-deploy.
- **Hostname corrected:** a Worker is `<worker-name>.<account-subdomain>.workers.dev`, not a bare `76pancakes.workers.dev`. Target **`play.76pancakes.workers.dev`**, or the closest free variant if taken; exact string pinned in `releases.md` at rehearsal. No registrar, no nameservers, no custom domain, ever. The canonical reference's shorter `76pancakes.workers.dev` wording is now corrected by Claude.
- **D1 Free limits** (Claude VERIFIED): 5 M rows read/day, 100,000 rows written/day, 5 GB total, 10 databases; 50 queries per Worker invocation; `batch()` counts as one. Write budget and debounce go in the account contract.
- **Known limit recorded, not fixed:** after rollback, a stale tab can request an asset the older version lacks (version skew). Saves are unaffected. Rehearsal must try it once.

### 2.2 What this changes for your hand-over — almost nothing

You still hand over a static Vite `dist/`. Added requirements, all cheap:

- Vite `base: '/'` — asset URLs root-relative.
- Any backend call uses a relative `/api/...` path, never an absolute host.
- No hard-coded `pages.dev` or `workers.dev` string.
- No `_redirects` or `_headers` file.
- You write **no** wrangler config and deploy **nothing**. Worker, `wrangler.jsonc`, D1 migrations and deploy command are Claude's.
- Supply `dist/` sha256 and zip sha256; Claude records them in `claude/releases.md` before upload.

### 2.3 Q-STATS — resolved, but not your bytes

- Record **both 17-0 and 20-0**. Do not re-open that question.
- “Players' top seasons” means **the user's own drafted/frozen players across that user's runs**, not real NFL career history.
- Aggregates are maximised; **raw logs stay pruned**. Whole-league awards are deferred as a future P-item.
- One ledger row per run, written once at the existing elimination moment.
- Three fields are `NEEDS FIELD`: `playerLines` (sparse, ~2.7 KB/roster), `pickOverall` (~0.4 KB) and `seeding`. They live in `colors/src/sports/nfl/app/saves.ts` and the week flow — **pin bytes**. Claude will add them in one deliberate re-pin sitting **after** you finish slices 3–5 and he merges. **Do not add them yourself.**
- Gate for that re-pin: seam golden `e8fed8ab…` must be unchanged. Sim must stay identical; `buildBoxScore` already forks `'box'`, so no new RNG draw.
- Legend weights 100/10/1 confirmed for v1, labelled INFERRED.

### 2.4 Q-AUTH — resolved, not your bytes

- **Better Auth inside the same Worker**, D1 for users/accounts/sessions. **GitHub at v1**, Google only if the spike passes. Clerk rejected because its production guide requires an owned domain, which the Owner has ruled out forever.
- No home-made credential handling. Boundary tests prove user A cannot read/write user B's saves.
- This is Claude's lane. You only need the `/api/...` relative-path rule above.

### 2.5 Inconsistencies for MUSE/Claude, not for you

- Canonical §10 Owner Q3 says confirm `76pancakes.workers.dev`; Claude corrected the form to `play.76pancakes.workers.dev`. Use Claude's form.
- Canonical §10 provisioning mentions “R2 buckets”; Claude ruled no R2 at v1. His ruling supersedes.
- D5 (`ENGINE_PIN` stale) and H2 (pin-watch watches dead pin) remain. D5 is yours; H2 is MUSE's. Flag, do not edit another lane.

---

## 3. Your remaining work, in order

This is the resume order from your own S15 hand-over and the canonical reference. Work from the queue; this ordering is technical advice, not an assignment.

### Step 1 — Close D1: one checksum digest policy

`CHECKSUMS.txt` is 64-hex SHA-256 but `tools/verify-package.mjs` parsed 32-hex MD5 (`0 OK / 359 FAILED / 474 EXTRA`, exit 1). `regen-manifest.mjs` writes SHA-256. Choose **one digest policy — SHA-256 is the obvious default — and make generator and verifier agree**. Do not weaken the verifier to pass. Receipt required:

```
node tools/verify-package.mjs .
```

Expected: `0 FAILED / 0 missing / 0 EXTRA`, exit 0, at the final bytes. Cite the file and command.

### Step 2 — Falsify-board F27–F30 at the S15 bytes

Run:

```
node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs
```

at the final S15 bytes. F0 baselines and F15–F26 must still pass; **F27, F28, F29 and F30 must DIE by name**. Child logs must land under `deliveries/receipts/partH-s15/`. No S14 receipt counts as an S15 receipt. Report the four named DIED lines.

### Step 3 — One uninterrupted final composite

Run from the delivery directory, **with no wrapper timeout**:

```
cd 67-cakepanz-15-2026-11-21 && bash scripts/acceptance-run.sh
```

It must end `ACCEPTANCE RUN COMPLETE` at the final bytes in one run. Verify by named law, not just counts:

- board **23/0**
- shell **51/0**
- visual **18/0**
- slot **28/0**
- node **35/35**
- slice **29/0/10/3**
- contrast **2/0**
- falsifiers exit 0
- gate-manifest PASS, gate-numerals CLEAN ×2

The S14 composite already ran; do not present it as final. If the wrapper kills a step, resume with the documented step discipline and say so honestly, but the goal is one uninterrupted run.

### Step 4 — Doc/gate regen from the final receipts

After the composite, not before:

- `node scripts/gate-table.mjs`; paste its table into `deliverables/CUTOVER-CHECKLIST.md` Gate B rows.
- Fix `CUTOVER-ONE-PAGER.md` bash block: `16/0 → 23/0`, `17/0 → 18/0`.
- Update `SLICE-STATUS-2026-11-20.md` slice 1 row.
- Append `VERIFY-§26-append.txt` §26.5/26.6 tails and a §26.9 final-composite section.
- Regenerate/fix `SHELL-STATUS.md` (stale hash and stale “ring” wording) at step 13d.
- Re-point `scripts/probe-w14.mjs:32` off the retired `.cp-suggest .cp-quick` selector if still stale (F4).
- Ensure `gate-table.mjs` does not print “S15 measured” over S14 numbers.

### Step 5 — §7 packaging and hand-over

- Fence receipt: `git diff --name-only 408410477 <tip> -- colors/src` → empty. Also file the delivery `src/engine` tree hash `8d8a8a1e81386e99f53f995492904348cb7d8345` and re-verify at final bytes.
- `dist/` + `dist/single.html` sha256. The production dist contains one entry, `index.html`; no dev page.
- Delivery zip + sha256. One zip hand-over. Push test max 2 attempts; if push fails, the zip is the hand-over.
- Side-by-side shots at **390×844 and 1180×950, light and dark, four scenes** (Team Select, board with top-3 row, pick confirm, finished draft), against w89. Pickle coordinates the live w89 side. “Directionally similar” is a FAIL.
- `deliveries/S15-SELECTOR-NOTE.md` naming the stable classes: `.cp-top3`, `.cp-draftbtn`, `.cp-istop`, `.cp-toptag`, `.cp-why`. `cp-quick` and the ring class are retired.
- `rawSort` stays FILED-NOT-APPLIED. If top-three ordering cannot match the pinned engine without `colors/src` bytes, **stop and report**; do not change engine bytes.
- Hand-over doc with every claim labelled V/R/I/U and directory + command + result for each.

### Step 6 — Fix D5 before the server compares `engine_version`

`src/App.svelte:83` still has:

```
const ENGINE_PIN = '67-cakepanz@d3bd81d2';
```

Shipped engine is **`408410477`**. `metaNow()` stamps this into autosaves and manual slots and `Saves.svelte:80` prints it. Fix it in your tree so no save arrives flagged foreign. Use the envelope's agreed stamp form; if the exact string format is unclear, confirm with Claude in one line rather than guessing. H2 (pin-watch on `65673a0`) belongs to MUSE — flag it, do not edit it.

### Step 7 — Slices 3–5 on the c12/S15 tree

Build on the S15/c12 tree against pin **`408410477`**. **Zero engine bytes.** Do not redo the landed S15 design; it is the direction of change, not a mockup to replace.

Locked visual rulings, verbatim from the canonical reference:

> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare"

> "s14 looks much better although the panels are still too boxy and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

> "ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything; you can preserve your mockup as an example of the direction of change but that's still not complete."

> "1.. top three highlight should be present in the button like w89"

> "2. the little descpriton of the top 3 choices of why the user would select that player"

> "3. w89 the buttons glow and there is a separte "top" badge"

Required outcomes from work order v8:

1. **One-click draft survives on the top-3 rows.** Keep `.cp-draftbtn` or rewire the main button; either way one visible click creates exactly one PICK and W14 leg A still creates the autosave with `savedSeed`/`savedPicks` assertions intact.
2. **Glow follows w89.** Every Draft button pulses (`zpbBtnPulse`, reduced-motion guard); top-three buttons opt out of the pulse and get the sheen sweep plus a separate `.cp-top`/`.cp-toptag` badge. No `animation:none` on ordinary buttons.
3. **Why copy on top three only**, from `whyFor`/VM single source. Keep ring-independent copy. Update stale “gold ring” comments.
4. **Panels toward w89.** `--glass`, `--glassbd`, `--shadow` equal w89 values; 22 px radii on large panels; `.panel` per w89; contrast 2/0; no horizontal scroll at 390 px; DESC-1 green.
5. **dispatchAsync per contract.** START keeps `pickSlot`; PICK, UNDO and LOAD all awaited; `busy` flag set before and cleared in `finally`; controls disabled while busy; `error = st.error ?? ''` at every site (law L-ERR); no sync/async mixing; `window.__cp` keeps six keys (`store`, `refresh`, `valuation`, `seasonFacade`, `go`, `vmStore`); every `__cp.store.dispatch` in batteries becomes `await __cp.store.dispatchAsync`.
6. **Gate floors are S14 finals**, not S13: board ≥19/0, visual ≥18/0, slot ≥28/0, swap 29/0/10/3. Your S15 bytes currently exceed them; list every retired law by name and reason. A missing unretired law fails even if the count is higher.
7. **rawSort:** if the pinned engine's top-three ordering cannot be reproduced without `colors/src` bytes, stop and report. No engine edits, no protected constants.

### Step 8 — Static hand-over for Cloudflare

Hand over a built `dist/` only. Do not deploy, do not touch gh-pages, do not retire w89 at make-live (that is Owner+Claude after acceptance). Record hashes for Claude's releases ledger. Root-relative assets, relative `/api/...`, no hard-coded host, no wrangler config.

---

## 4. The fence — do not cross

- Do not build the account system, server, auth, sync, conflict UI, migration backend or brag-share backend. Those are Claude's after the contract. Your local seam phases A/B are the hand-off surface.
- Do not edit `Football-Sim-*.html`, `colors/src/**`, the engine, the pin, protected constants, `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/`, `QUEUE.md`, `CHRONICLE.md`, another seat's lane/inbox or any verbatim Owner note.
- No field-level save merge. No CRDT. No mutation log. P-254 whole-envelope LWW, rung-back and keep-both govern.
- No downloads, no export/import, no hidden full save. Brag share is text + bare deployed URL.
- Free-only. No paid tier. No secret in repo, bundle or chat. No domain purchase, ever.
- The game stays fully playable offline with no account. Sign-in is additive.
- No images in lanes; do not re-host the rival screenshots; keep the engine copy byte-identical to the pin.
- No force-push, no stash. Push only your own seat branch and verify with `git ls-remote`. End the chat with `node tools/preserve.mjs check`.

## 5. Release context you do not own but must not block

Six capabilities are launch gates, not future possibilities: accounts, cross-device sync, offline-conflict resolution, local-save migration, cross-run career stats, and brag share — all on the frozen engine pin, free-only, offline-first, no domain. Owner verbatim, via the canonical reference:

> "optional sign in is still true but i want the ability to sign in completed before we deploy."

> "Accounts are not a future goal; ideally they ship as soon as possible. we wanted users to create an account and be able to track their stats beyond a single season; this has been in the directive for a long time."

> "sync saves and resolving offline changes  and migrationg local saves into reconnection across devices are also a mandatory features before deployment; also noted since the beginning. these are not future possibilites; these are all mandatory to release along with the brag share"

Your UI is upstream of those gates. Hand over a clean static build and the account/sync work can start without you redesigning it.

---

## 6. Bottom line

The canonical reference is the record. Claude's `0533` ruling closes the three questions. Your job is the **tail of S15** — checksum policy, falsifiers, one uninterrupted composite, regenerated docs, packaging, D5 — then **slices 3–5** against the `dispatchAsync` contract, then a **Cloudflare-ready static hand-over**. You do not own the server, the auth provider, the stats schema fields, the pin re-pin, the deploy, or w89 retirement.

Z.ai, can you confirm you have the S15 tree and these receipts in view before starting the final composite?
