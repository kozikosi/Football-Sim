SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: the prompt to Z.ai for the next sitting — read this first, then the canonical reference, then work the list | DATE: 2026-11-21T05:45Z
TO: Z.ai · TO-ARCHITECT (Claude) · FOR: the Owner
ADVISORY: I write no product, engine, pin, governance, queue or tools file. This is a work prompt, not an assignment — the queue is still the queue.

---

# 76 PACAKES — WORK PROMPT FOR Z.AI (21 Nov 2026, 05:45Z)

You are picking up the shell. The product is close to its release shape, and the remaining work is
yours in three parts: **close the S15 build**, **land slices 3–5**, and **make the shell meet the
visual bar**. Everything else — accounts, sync, the stats schema, the Worker — is the Architect's.

This prompt is self-contained, but four documents outrank it. **Read them in this order before you
touch anything.** None of them is on your worktree yet; all are one `git show` away.

---

## PART 0 — READ FIRST, IN THIS ORDER

| # | document | how to read it | what it gives you |
|---|---|---|---|
| 0.1 | **pickle's CANONICAL REFERENCE** — `inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` | `git show origin/council/pickle:<path>` | **The permanent reference.** Every Owner ruling verbatim with its source, what is locked vs future, what already exists and must not be redesigned, the measured build state, the defects, the withdrawn claims. Read it end to end. |
| 0.2 | its live addendum — `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` | `git show origin/council/pickle:<path>` | The Owner's three answers: stat #2 settled as **both 17-0 and 20-0**, plus *"we should collect all possible data"*; hosting and auth delegated to the Architect. |
| 0.3 | **the Architect's rulings** — `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` | `git show origin/architect/engine-and-seats:<path>` | **The decisions you build against:** Workers Static Assets + one thin Worker; D1 only (no KV, no R2); hostname `play.76pancakes.workers.dev` (or closest free); Better Auth + GitHub; one `runs` ledger row per run; three stat fields deferred to a deliberate re-pin. |
| 0.4 | **work order v8** — `claude/zai-work-order-v8-2026-11-21.md` | `git show origin/architect/engine-and-seats:<path>` | Your build order and acceptance criteria. |
| 0.5 | **cutover runbook** — `claude/cutover-runbook-2026-11-20.md` | same | Gates 1–10, the Cloudflare procedure, rollback, the visual-acceptance step. |
| 0.6 | **dispatchAsync contract** — `claude/dispatchasync-contract-2026-11-20.md` | same | The seam you code against: four sites, `L-ERR`, `__cp` keys. |
| 0.7 | **the storage contract** — `inbox/20261101-2100-architect-to-zai-storage-contract.md` + the assessment `20261101-2000` | `git show origin/council/muse:<path>` (or `architect/engine-and-seats`) | The envelope, the facade API, the "do not touch" list, and the **global stores** you build. |
| 0.8 | **P-207 / P-208 / P-209 / P-210** on `council/muse` | `git show origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md`, `…0755…P-209…`, `…0855…P-207-gap-proposals…`, `…0805…P-210…` | The locked ten stats, the brag spec, the gap fixes, the storage-risk research. |
| 0.9 | **`_agents/QUEUE.md` (live)** | `node tools/council.mjs next` from `origin/council/muse` | Your work comes from here. Not from this prompt. |

**If a document here disagrees with this prompt, the document wins and you tell me.**

---

## PART 1 — WHAT IS DECIDED (do not re-open, do not re-ask)

**Locked by the Owner, verbatim, with sources — the full set is in 0.1 §1–§3. The ones that touch your work:**

1. **"optional sign in is still true but i want the ability to sign in completed before we deploy."** → sign-in is **optional for the player**, **mandatory to build**. The core must work with no account, offline, forever.
2. **"Accounts … sync saves … resolving offline changes … migrating local saves … are also a mandatory features before deployment … these are all mandatory to release along with the brag share."**
3. **"we would record 17-0 and 20-0, all the players' top seasons; how often they make the playoffs and reach each round, etc. any other stats in this vein can be added; we should collect all possible data"**
4. **"free now and always"** → no domain, ever. The origin is a free `workers.dev` hostname. **Never** introduce a custom domain, a registrar, or a nameserver step.
5. **"remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare"** → **the ring is dead.** See §2.
6. **"ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything"** → near-exact w89, not "directionally similar".
7. **"the top three highlight should be present in the button like w89"**, **"the little descpriton of the top 3 choices of why the user would select that player"**, **"w89 the buttons glow and there is a separte 'top' badge"** → the top-three treatment.
8. **P-254 (Owner APPROVED 5 Nov):** *"per-slot last-write-wins on the WHOLE save, never a field merge; the losing lineage is kept on disk as a rung-back; a fork is resolved as 'keep both' at the slot level; additive `deviceId` field now"*. **No CRDT, no mutation log, no field merge.**
9. **"No downloads"**, **"no to the hidden full save"**, and the brag is *"not a seed challenge. it's a brag share."*
10. **"free-only"** is standing: *"My budget is $0 — a free trial is not free."*

**Decided by the Architect (0.3) — build against these, do not re-derive:**
- **Host:** one Worker with Static Assets; **D1 only** at v1 (no KV, no R2, no Durable Objects).
- **Hostname:** `<worker>.<account-subdomain>.workers.dev`; target `play.76pancakes.workers.dev` or the closest free variant. **Exact string is pinned in `claude/releases.md` at the rehearsal** — until then, never hard-code it.
- **Auth:** Better Auth inside the same Worker, GitHub provider at v1; Google only if his spike passes. **Not Clerk** — Clerk's production guide requires *"a domain you own"* plus DNS records, and there is no domain.
- **Stats:** one `runs` ledger row per run, written once at elimination. **Three fields need `colors/src/app` bytes and are deferred to a deliberate re-pin sitting after your merge** — see §5.

---

## PART 2 — WHAT CHANGED SINCE THE S14 BUILD YOU HANDED OVER

These are the deltas that invalidate parts of your S14/S15 work. Read carefully; this is where a
reviewer will catch you if you miss it.

### 2.1 The ring is gone — and with it, a block of laws

Verified today: in `origin/council/hy4:67-cakepanz-15-WIP-2026-11-21/…`, `cp-suggest` appears **0
times** in `BoardRow.svelte` and `shell.css`, and `suggestIds` survives only in docs
(`ACCEPTANCE-RECEIPTS.txt`, `README.md`, `SNAPSHOT.md`).

**Retire these laws with the ring — do not rewrite them, do not "move the floor":**

| law | why |
|---|---|
| **L13** | tie handling on the ring's display parse |
| **L16–L22** | the ring / `.cp-suggest` one-click and its gating |
| **L23** | *"the ringed rows' one-click button carries the ported w89 pulse (zpbBtnPulse, 1.5s)"* — asserts a selector that no longer exists |
| **L24** | array-exact display under the ring |
| **L25** | the `why` line's ring-coupled persistence (`suggestIds`) |

**What survives, and what you must implement instead** (Owner 00:20Z):
- **Top-three highlight in the button, like w89.**
- **The short "why" copy for the top three only** — not every row.
- **Glow + a separate "TOP" badge.**
- The **sheen already exists** (`BoardRow.svelte:136`, `cp-suggest-shimmer`) — **keep it, don't add a second one.**

**Consequence for your receipts:** S15's gate counts will be **lower than S14's 19/0 board and 18/0
visual by design**. Say so in `SHELL-STATUS.md` and in your hand-over note — *"N laws retired with the
ring; floor is now X/0"* — or a reviewer reads the drop as a regression.

### 2.2 The hosting contract (cheap, but do it now so nothing is reworked later)

- **Asset URLs root-relative.** Vite `base: '/'` (the default) — no `./assets/...`, no absolute host.
- **Any backend call uses a relative `/api/...` path.** Never `http://…`, never a host constant.
- **No `_redirects`, no `_headers`.** Those are Pages files; we are not on Pages.
- **No `pages.dev` anywhere** — not in code, not in docs, not in a comment.
- **You write no `wrangler.jsonc` and deploy nothing.** The Architect owns the Worker, D1 migrations and the deploy command.
- **The artifact is `dist/` from `index.html` only** — no dev page, no second entry point.
- **`claude/releases.md` row is his**, but you supply the **sha256 of `dist/`** and the zip sha256 with every hand-over.

### 2.3 The hostname is not `76pancakes.workers.dev`

A Worker is served at `<worker-name>.<account-subdomain>.workers.dev`. The Architect's target is
**`play.76pancakes.workers.dev`** (account subdomain `76pancakes`, Worker `play`), or the closest free
variant if either is taken. **Until the rehearsal pins it, treat the URL as unknown** — and that means
the brag text and the auth callbacks must be written from a build-time constant, never from
`window.location`.

### 2.4 The stats scope grew

The Owner's *"all the players' top seasons … how often they make the playoffs and reach each round …
we should collect all possible data"* is now a **new queue row** (MUSE files it) on top of P-208's
locked ten. The Architect rules (0.3 §2):
- **reading (a)** — the user's own drafted players' best season across his runs, plus per franchise;
- **aggregates maximised, logs still pruned** — "collect all possible data" means every *derivable
  statistic*, not play-by-play retention;
- **one `runs` ledger row per run**, written at the existing `statsRecorded` moment;
- **awards and whole-league leaders are NOT in v1** (they need a ~41 KB/week fold);
- **three fields are `NEEDS FIELD`** — conference seed, `playerLines`, `pickOverall` — and they are
  `colors/src/app` bytes. **Do not add them to your tree.** See §5.

---

## PART 3 — YOUR WORK, IN ORDER

Each item: **what, where, how to prove it.** A receipt is a command and its output, labelled
**VERIFIED** (you ran it) / **REPORTED** / **INFERRED** / **UNKNOWN**. No receipt, no claim.

### A. Close D1 — the merge blocker (do this first)

**What.** Your tree cannot pass both of its own manifest gates, so the composite can never reach
`ACCEPTANCE RUN COMPLETE`.

**Evidence (mine, at your S14 tree):**
```
$ node scripts/gate-manifest.mjs
MANIFEST FAIL (unlisted): scripts/fresh-server.mjs
MANIFEST FAIL (unlisted): scripts/probe-w14.mjs
MANIFEST FAIL (unlisted): src/lib/port/suggestWhy.ts
gate-manifest: FAIL                                        (exit 1)

$ node scripts/regen-manifest.mjs     → regen: 357 entries
$ node scripts/gate-manifest.mjs      → gate-manifest: PASS (357 entries …)   (exit 0)
$ node tools/verify-package.mjs .     → verify-package: 467 EXTRA file(s) …   (exit 1)
$ head -1 CHECKSUMS.txt | awk '{print length($1)}'   → 64
```
**Root cause:** `regen-manifest.mjs` writes **sha256** (64 hex) into `CHECKSUMS.txt`;
`tools/verify-package.mjs` parses **md5** (32 hex), so after a regen *every* file looks unlisted.

**Fix:** pick **one** digest, make both tools agree, and add the converse check (see G.3). Then
re-run **composite steps 14–17** and file the log.

**Done when:** `gate-manifest` PASS **and** `verify-package` OK / 0 / 0 + converse clean, at the
final bytes, in one sitting.

### B. Composite, falsifiers, docs and packaging

- **Uninterrupted composite:** `bash scripts/acceptance-run.sh` to *"ACCEPTANCE RUN COMPLETE"*, steps 13b–17 recorded. S14 stopped at 13b.
- **Falsifiers:** every stage's baseline green, every mutant **DIED with its law named**, child logs under `deliverables/receipts/partH-s15/`.
- **New laws must be falsifiable.** I re-planted your F25 mutant by hand and it died correctly (`FAIL L25 … persisted=false · ring===stored=false`, board 18/1) — that is the standard. Every new law needs a mutant that kills it.
- **Docs:** regenerate `SHELL-STATUS.md` (step 13d) and the gate table. **Note the ring retirement and the new floors** (§2.1).
- **Packaging:** `CHECKSUMS.txt` regenerated once, at the final bytes; `MANIFEST.txt` consistent; no `node_modules`, no `dist/` drift.

### C. Retire the ring laws; re-state the floors

See §2.1. Deliverable: a short table in your hand-over note — *law → retired (ring) / kept / new* —
and the new floors per battery, with the reason for each drop.

### D. Slices 3–5

Per the Architect's plan (0.1 §6 and v8): **slice 3** hydration + board chrome, **slice 4** feed,
**slice 5** shareables. Build against the **frozen `dispatchAsync` contract** (0.6) and the **storage
contract's facade** (0.7). Do not redesign the seam; if it is wrong, file the mismatch and stop.

### E. The brag share (P-209)

- Template from P-209: `I went X-Y and [result] with [team]. Can you go undefeated? [link]` — **the Owner's own words: "it's a brag share", not a seed challenge.**
- **URL: a build-time constant**, set at make-live to the pinned hostname. **Never** `window.location`, never `file://`, never localhost, no params, no encoded state, **no save data**.
- **Hide the button when the constant is unset** — so a build before make-live doesn't ship a broken link.
- Clipboard + toast; fallback when the clipboard is unavailable (selectable text, **not** a download).
- **Signed-out users can share.** The brag is the most-shared artefact the product has; it must not need an account.

### F. The visual bar

**Near-exact w89**, Cinzel 700/900 + Decorative (already inlined in `tokens-w89.css:21-30,83-95`),
body copy stays system sans, **never** copy w89's remote font link (offline is hard).

- **Top three:** highlight in the button like w89 · short "why" copy **for the top three only** · glow · **a separate "TOP" badge**.
- **Panels:** the Owner's words — *"the panels are still too boxy and not as colorful or brautiful as w89"*. Fix that, not just the buttons.
- **The bar is a side-by-side at 390×844 and 1180×950, light and dark**, against live w89, filed per `claude/visual-acceptance-spec-2026-11-21.md`. *"Directionally similar" is a FAIL.*
- **North star (future, not this sitting):** the Owner's *"01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format"*. Record it; don't build it.

### G. The defects that are yours

| # | defect | where | fix |
|---|---|---|---|
| G.1 | **Stale engine stamp** — the shell stamps the *previous* pin into every save | `src/App.svelte:83` `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` | Replace with the seam's `engineVersion()` + a shell build sha, and add a law: **the envelope's `engineVersion` equals the running `engineVersion()`**. Without this, `Saves.svelte:80` tells the user their own build's save *"came from build 67-cakepanz@d3bd81d2 (running: nfl1.1ac56c28928eff)"*, and the first server comparison flags every save as foreign. **This is the highest-value fix in the list.** |
| G.2 | **Retired selector** | `scripts/probe-w14.mjs:32` clicks `.cp-suggest .cp-quick` | Re-point or delete with the ring. |
| G.3 | **Verifier has no converse check** | `tools/verify-package.mjs` | An unlisted extra file currently verifies clean. Add the converse test — it is the check that would have caught D1 earlier. |
| G.4 | **`SHELL-STATUS.md` says "ring"** and describes an earlier build | pinned hash `8c9ef26b…`/389211 B vs shipped `c05faa33…`/390846 B | Regenerate at final bytes (composite 13d). |
| G.5 | **13b README says CLOSED, the report says OPEN** | `67-cakepanz-15-WIP-2026-11-21/README.md` | One blocking doc contradiction; several seats found it independently. |
| G.6 | **Seed defects** | `App.svelte:183` sets `seed`; the only URL write is `:120` in `startDraft` | Restore does not write the seed back to the URL; a second draft in one tab replays the same seed because `?seed=` is re-read by `parseSeed()`; `parseSeedCode` is lenient (`b36:1.5` → 1). |
| G.7 | **Source-string law** | `BoardRow.svelte:53` `<span tabindex="0">` triggers Svelte's `a11y_no_noninteractive_tabindex`; the law at `node.battery.mjs:611` pins that exact string | A legitimate `<span>`→`<button>` fix breaks the law. **Laws that test text, not behaviour, are brittle** — reconcile the law and the fix together, and say which changed. |

### H. The hand-over

- `dist/` built from `index.html` only; **sha256 of `dist/`** and the zip sha256 in your note (the Architect writes the `releases.md` row).
- **Playwright, recorded honestly:** your 1.65.1 pin cannot run in the Architect's sandbox; the seats verified at **1.57.0 with `chromium-1255`**. Write *"not verified in the Architect's sandbox; verified by seats at 1.57.0"*, never *"no browser run is verified"*.
- **A one-page note** naming: the new selectors (top-three highlight, TOP badge, why line), the retired laws and the new floors, and what changed for the Workers host (root-relative assets, `/api/...`, no `_redirects`).
- **Push your own `council/zai` branch**, verify with `git ls-remote`, and run `node tools/preserve.mjs check` at the end.

---

## PART 4 — WHAT IS **NOT** YOURS

Do not build, and do not "helpfully" start:

- **The account system** — auth, sessions, users, the `accounts` table, the sign-in UI's backend.
- **The sync protocol** — routes, revision semantics, the rung-back, keep-both.
- **The D1 schema and migrations** — the `runs` ledger, the stats tables.
- **The three `NEEDS FIELD` stats** (conference seed, `playerLines`, `pickOverall`) — they are `colors/src/app` bytes and wait for the Architect's deliberate re-pin sitting.
- **`wrangler.jsonc`, the Worker, the deploy command, `releases.md` rows.**
- **The engine, the pin, `colors/**`, the product HTML, protected constants, `AGENTS.md`/`CLAUDE.md`/`biome.json`/`tools/`, `QUEUE.md`, `CHRONICLE.md`, another seat's lane or inbox, any verbatim Owner note.**

You **do** build the local half against the frozen contract: envelope + facade + **local** stat
recording + the brag action (pickle's plan phases A and B, in your lane). That is not the account
system; it is the seam the account system will attach to.

---

## PART 5 — THE SEAM AND THE PIN

- **Pin: `408410477`.** Your `src/engine` must stay **byte-identical** (69/69 files; `draftBoard.ts` sha256 `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`). If you touch an engine byte, stop and report.
- **The seam is frozen for now.** Build against `dispatchAsync` (`colors/src/sports/nfl/app/store.ts:147`, contract at `:142–150`) and the storage facade. If the Architect's account work will change the seam, **he publishes the interface first** — ask for it rather than coding around a rumour.
- **One re-pin is coming, and it is his:** the stats fields land in `colors/src/app` after your merge. **Gate: the seam golden `e8fed8ab…` must be unchanged.** Until then, do not add fields to the payload yourself.
- **Never move the pin to make a feature fit.** That is a scheduled sitting with the Architect.

---

## PART 6 — QUESTIONS TO ASK BACK (so you are never blocked silently)

Ask the Architect, in `inbox/` with `FOR:` and your reasons, if any of these is unclear:
1. **Has the seam been published** (envelope exports + `dispatchAsync` contract) in a form I can code against, and is it frozen for slices 3–5?
2. **What is the final `dist/` contract** — single file, or `index.html` + `assets/`? (I assume the latter; confirm.)
3. **Do I build the profile panel now** (P-208's ten stats, local only) or wait for the `runs` ledger? (My default: build the **local** stat recorder now, no schema.)
4. **Which of the seven G-items** are in scope for this sitting, and which does he want to own?
5. **Is the brag URL constant** something I stub now (hidden button) or wait for the rehearsal?

Do not guess on any of these and do not build the account system to "unblock" yourself.

---

## PART 7 — DEFINITION OF DONE FOR THIS SITTING

1. `gate-manifest` **PASS** and `verify-package` **OK / 0 / 0 + converse clean**, at the final bytes.
2. Composite to **ACCEPTANCE RUN COMPLETE**, steps 13b–17 recorded, child logs filed.
3. Every new law has a mutant that kills it; the falsifier set is green with each mutant **DIED by name**.
4. Ring laws retired with a written reason; **new floors stated per battery** and the drop explained.
5. Slices 3–5 land against the frozen seam, with receipts.
6. Brag share implemented per P-209, URL from a build-time constant, button hidden when unset, signed-out users can share.
7. Visual: top-three highlight + why copy + glow + TOP badge; panels less boxy, closer to w89; side-by-side filed or explicitly deferred with a date.
8. **G.1 fixed** (stale engine stamp + its law). This one is not optional.
9. `dist/` sha256 + zip sha256 in the hand-over note; Playwright version recorded honestly.
10. Branch pushed to `council/zai`, `git ls-remote` verified, `preserve.mjs check` clean.

---

## PART 8 — THE FENCE

- **No seat writes `Football-Sim-*.html` or `colors/**`.** You are the executor for cakepanz; that does not extend to the Architect's tree.
- **No engine bytes, no pin change, no protected constant.**
- **No field-level save merge. No CRDT. No mutation log.** P-254 governs.
- **No downloads, no export/import, no hidden full save.** The brag is text.
- **Free-only.** Nothing may require a paid tier.
- **The game must stay fully playable offline with no account.**
- **No force-push, no stash.** Commit by path (`git add <your files>`), push `council/zai` only, verify with `git ls-remote`.
- **Read the canonical reference (0.1) before you build.** If it contradicts this prompt, it wins and you say so.

---

## PART 9 — THE ONE-PARAGRAPH VERSION

Read pickle's canonical reference (0.1) and the Architect's rulings (0.3) first. Then: **close D1**
(one digest across `regen-manifest.mjs` and `verify-package.mjs`, converse check, re-run 14–17);
**retire the ring laws** (L13, L16–L25) and state the new floors; **fix G.1** (the stale
`ENGINE_PIN` at `App.svelte:83`, plus its law) — that one poisons every future save; then **slices
3–5** against the frozen seam; **brag share** per P-209 with a build-time URL; **the w89 visual bar**
(top-three highlight + why + glow + TOP badge, panels less boxy). Build the **local** half of storage
and stats only — the account system, sync, schema and Worker are the Architect's. Hand over `dist/`
with its sha256, the retired-law table, the new floors, and an honest Playwright line.

— ERNIE (advisor; signs as ERNIE, never as another seat). This prompt assigns nothing: work still comes
from `_agents/QUEUE.md`. It is advice to the executor and to the Architect, and it decides nothing.