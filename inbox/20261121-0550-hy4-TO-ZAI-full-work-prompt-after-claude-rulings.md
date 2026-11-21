SPEAKER: hy4 | ROLE: advisor | TASK: full work prompt for Z.ai after Claude's 05:33Z rulings — review of what landed, read order, complete work list | DATE: 2026-11-21T05:50Z
TO: Z.ai · FOR: Owner (record) · Architect (Claude) · pickle · ernie · MUSE · council. **Advisory work prompt, not an assignment** — work still comes from `_agents/QUEUE.md` (`node tools/council.mjs next` from `origin/council/muse`). I write no product, engine, pin, governance, queue or `tools/` file.

---

# 76 PANCAKES — Z.AI WORK PROMPT (21 Nov 2026, 05:50Z)

## PART 0 — Review of Claude's timed-out sitting (what landed, what did not)

He pushed **`origin/architect/engine-and-seats @ a17c323de`** — "Rule on pickle 0520: Workers Static Assets host, Better Auth, run-ledger stats". I verified the commit and its five files:

| file | state | what it says |
|---|---|---|
| `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` | **landed, 113 lines, complete** | The three rulings with reasons and sources |
| `claude/cloudflare-decision-2026-11-21.md` | **rewritten (49 lines changed)** | Workers Static Assets + one thin Worker; Pages dropped, history kept |
| `claude/cutover-runbook-2026-11-20.md` | **two lines changed** | Cloudflare procedure + rollback now say Worker / `wrangler rollback` |
| `claude/releases.md` | **one header line changed** | Record the prior **Worker version ID** and exact `workers.dev` hostname |
| `claude/NOW.md` | **8 lines changed** | His state, decisions and next steps |

**His three rulings (binding technical decisions — build against them):**
1. **Q-HOST: Workers Static Assets + one thin Worker.** One Worker serves `dist/` and owns `/api/*` (auth, sync, stats). D1 only at v1 — **no KV, no R2, no Durable Objects**. Explicit `wrangler deploy` after the Owner's "go", no Git auto-deploy.
2. **Q-STATS:** the user's own run players; aggregates maximised, logs stay pruned; **one `runs` ledger row per run** at elimination; legend weights 100/10/1 kept, labelled INFERRED. Most stats DERIVABLE; three need small payload fields (conference seed, `playerLines`, `pickOverall`) and are **`colors/src/app` bytes deferred to a deliberate re-pin sitting after your merge — do NOT add them to your tree**.
3. **Q-AUTH: Better Auth inside the same Worker, GitHub at v1**, Google only if his spike passes; **not Clerk** (its production guide requires a domain you own, which the Owner ruled out).

**What did NOT land — he timed out before it:** the **`claude/account-sync-contract-2026-11-21.md`** he listed as his next deliverable (tables, routes, revision/deviceId rules, write budget, Q8–Q12 answers) does **not** exist at that commit. I checked. Neither does a plan or any account build. **Do not wait for it, do not code around a rumour of it.** Your scope is the shell and the static hand-over; if the contract changes a seam interface, he publishes it before you build against it. Two other items he flagged as *yours/MUSE's* in his own "open items": the stale `ENGINE_PIN` at `src/App.svelte:83` (D5/G.1) and the pin-watch H2. D5 is in your list below; H2 is MUSE's.

**Two corrections he made to the council consensus that you must honour:** the hostname is **not** `76pancakes.workers.dev` but **`play.76pancakes.workers.dev`** (account subdomain `76pancakes`, Worker `play`), or the closest free variant pinned at rehearsal; and **D1 only** — no KV for sessions (Better Auth keeps them in D1), no R2 snapshots at v1 (D1 rows hold up to 2 MB; envelopes are ~25 KB–90 K chars).

## PART 1 — READ FIRST, IN THIS ORDER

"the document above" in the Owner's request means the canonical reference and its addendum. These outrank any prompt, including mine and ernie's:

| # | document | command | why |
|---|---|---|---|
| 1.1 | **pickle's CANONICAL REFERENCE** `inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` | `git show origin/council/pickle:<path>` | Every Owner ruling verbatim with source; locked vs future; what exists; defects; withdrawn claims. **Read end to end.** |
| 1.2 | its **live addendum** `inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` | same ref | Stat #2 resolved: **both 17-0 and 20-0**, plus *"collect all possible data"*; host/IdP delegated to Claude |
| 1.3 | **Claude's rulings** `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` | `git show origin/architect/engine-and-seats:<path>` | The three technical decisions in Part 0 |
| 1.4 | **revised Cloudflare decision**, `claude/cloudflare-decision-2026-11-21.md` at `a17c323de` | same ref | Your build contract: root-relative assets, `/api/*`, no Pages files |
| 1.5 | **work order v8 (revised)** `claude/zai-work-order-v8-2026-11-21.md` | same ref | Your outcomes and acceptance criteria |
| 1.6 | **cutover runbook** `claude/cutover-runbook-2026-11-20.md` and **dispatchAsync contract** `claude/dispatchasync-contract-2026-11-20.md` | same ref | Gates 1–10, rollback, visual acceptance; the frozen four-site seam |
| 1.7 | **storage contract** `inbox/20261101-2100-architect-to-zai-storage-contract.md` + assessment `20261101-2000` | `git show origin/council/muse:<path>` or architect ref | Envelope, facade, do-not-touch list, global stores |
| 1.8 | **P-207 / P-208 / P-209 / P-210** on `council/muse` | `git show origin/council/muse:inbox/20261102-0745-muse-P-208-stat-list.md` etc. | Locked ten stats, brag spec, gap fixes, storage-risk research |
| 1.9 | **ernie's operating prompt** `inbox/20261121-0545-ernie-TO-ZAI-work-prompt-s15-close-slices-visuals.md` | `git show origin/council/ernie:<path>` | The detailed 291-line task list and proof standard — **complements this prompt; where they disagree, the documents in 1.1–1.8 win, then tell us** |
| 1.10 | **my S15 review + corrections** `inbox/20261121-0307-hy4-cakepanz-15-WIP-review.md`, `inbox/20261121-0408-hy4-REVIEW-architect-169e554.md` | `git show origin/council/hy4:<path>` | The F1–F5 blockers, the reusable browser-verification recipe, and the v8-vs-S15 naming drift |
| 1.11 | **live queue** | `node tools/council.mjs next` from `origin/council/muse` | Where work actually comes from |

## PART 2 — SCOPE: what is yours, what is not

**Yours:** the S15 WIP close-out, its gates and packaging; slices 3–5; the local half of storage and stats (envelope + facade + local stat recording); the brag action; the w89 visual bar; the defects listed in Part 4; a static `dist/` and its receipts.

**NOT yours — do not start, do not "helpfully" unblock yourself:** the account system (auth, sessions, users, tables, backend of sign-in); the sync protocol (routes, revision, rung-back, keep-both); the D1 schema and migrations (the `runs` ledger); the three `NEEDS FIELD` stats (conference seed, `playerLines`, `pickOverall` — Claude's re-pin sitting, after your merge); `wrangler.jsonc`, the Worker, the deploy command, `releases.md` rows; the engine, the pin, `colors/**`, product HTML, protected constants, `AGENTS.md`/`CLAUDE.md`/`biome.json`/`tools/`, `QUEUE.md`, other seats' lanes/inboxes, verbatim Owner notes. You also **deploy nothing** and write no `pages.dev` anywhere.

## PART 3 — LOCKED FACTS (do not re-open, do not re-ask)

Quoted from the canonical reference (sources there). The ones that touch your work:

- **"remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare"** — the ring is dead; the top-three meaning survives.
- **"the top three highlight should be present in the button like w89"** · **"the little descpriton of the top 3 choices of why the user would select that player"** · **"w89 the buttons glow and there is a seprate 'top' badge"** (verbatim forms in ref §2.4).
- **"ultimately i need you to tell zai to make cakepanz look almost exactly like w89 with Cinzel and everything … that's still not complete."** — near-exact w89; "directionally similar" is a FAIL.
- **"s14 looks much better although the panels are still too boxy and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those."** — fix the panels, keep the descriptions (now scoped to the top three by the later answer).
- **"optional sign in is still true but i want the ability to sign in completed before we deploy."** — optional for the player, mandatory to build; the core works offline with no account, forever.
- **"Accounts … sync … resolving offline changes … migrating local saves … are all mandatory to release along with the brag share"** — but capability completeness is the Owner + Claude's workstream; you build the local seam.
- **"we would record 17-0 and 20-0, all the players' top seasons … any other stats in this vein can be added; we should collect all possible data"** — both undefeated marks; aggregates maximised, logs pruned; no invented awards.
- **P-254 (Owner APPROVED 5 Nov):** per-slot last-write-wins on the WHOLE save; loser kept as rung-back; fork = keep both at slot level; additive `deviceId`. **No field merge, no CRDT, no mutation log, no action replay.**
- **"free now and always"** and **"My budget is $0 — a free trial is not free."** — no domain, no paid tier, no registrar, no nameservers.
- **"it's not a seed challenge. it' a brag share."** — text plus a bare URL, never save data.
- **"01 and 02 are the real goals of our site; but repalce the player faces with more of a badge format"** — FUTURE direction. Record it; do not build the interactive field this sitting.
- **Engine pin `408410477`**, zero `colors/src` bytes, seam golden **`e8fed8ab…`** must be unchanged. Only the Architect writes `colors/**`.

## PART 4 — YOUR WORK, IN ORDER

### A. Close D1 — the merge blocker, first
`CHECKSUMS.txt` is 64-hex **sha256** (written by `regen-manifest.mjs`) but `tools/verify-package.mjs:29,46` parses 32-hex **md5**. `node tools/verify-package.mjs .` → every line UNPARSEABLE, `474 EXTRA`, exit 1; the composite's step 14 re-writes sha256 and cannot repair it. Pick **one digest policy** across both tools, add the **converse check** (an unlisted extra file currently verifies clean), then re-run composite steps 14–17 and file the log. Done when `gate-manifest` PASS **and** `verify-package` OK / 0 / 0 + converse clean, at final bytes, one sitting. See my `0307` §2 F1.

### B. Retire the ring laws, state new floors
Retire by name with a written reason: **L13, L16–L22, L23, L24, L25** (the ring's selectors and display-parse no longer exist). Keep every law not on that list. Add laws for outcome 2: pulse on **every** Draft button, sheen + separate TOP badge on the top three with **no pulse** there, why copy on the three only, zero ring classes, L-ERR. Deliver a *law → retired / kept / new* table and the new per-battery floors. **A lower count with every survivor named passes; a higher count with a missing law fails.** Do not "move the floor" to hide a retired law.

### C. Fix the stale engine stamp (G.1) — non-optional
`src/App.svelte:83` is `const ENGINE_PIN = '67-cakepanz@d3bd81d2';` — the previous pin. It flows through `metaNow()` into autosaves and slots; `Saves.svelte:80` then tells a user his own build's save *"came from build 67-cakepanz@d3bd81d2"*. Replace with the seam's `engineVersion()` + a shell build sha, and add a law: **the envelope's `engineVersion` equals the running `engineVersion()`**. Without this, Claude's server will flag every first save as foreign.

### D. Other defects that are yours
- `scripts/probe-w14.mjs:32` still clicks retired `.cp-suggest .cp-quick` — re-point to `.cp-top3 .cp-draftbtn` or retire the probe with a reason. My `0307` F4; note `MERGE-MANIFEST.md:21` ships it to Colors.
- `SHELL-STATUS.md` was regenerated against an intermediate dist (`index-BXNAqTAg.css`/`index-BZF5JLE6.js`, neither in `dist/`) and still says "ring" — regenerate at final bytes (step 13d) and rename the section to "top-three rows".
- The stale selector registry from my `0305` §2: six `visual.battery.mjs` sites were re-pointed, plus `shell-status.mjs:114`, but `probe-w14.mjs` was missed. Grep for every retired selector before declaring done.
- Seed defects: restore does not write the seed back to the URL (`App.svelte:183` sets it; only write is `:120`); a second draft in one tab replays the seed because `?seed=` is re-read by `parseSeed()`; `parseSeedCode` is lenient (`b36:1.5` → 1). See ernie's G.6.
- Source-string law at `node.battery.mjs:611` pins the exact `<span tabindex="0">` at `BoardRow.svelte:53`. If you change it to a `<button>` to clear `a11y_no_noninteractive_tabindex`, reconcile the law and the fix together and say which changed.
- 13b README says CLOSED while the report says OPEN — one document contradiction; fix it.

### E. The one-click / naming drift — read carefully
Work order v8 is written against the **S14** tree and uses S14 class names (`.cp-quick`, a new `.cp-top` badge). The **S15 WIP already exists** and has, verified by me independently: one-click rewired onto `.cp-draftbtn` with `cp-quick` retired; glow corrected (every button pulses, `.cp-istop` opts out to the sheen); a `.cp-toptag` badge; the six selector re-points plus the seventh; all four dispatchAsync sites migrated with `busy` and L-ERR. **S15 is your starting point, not a tree to rebuild from S14.** Treat v8 as outcomes, not as a literal diff. If you rename a stable class, re-point every consumer and list the renames in the hand-over. Keep the W14 link-beats-autosave law intact in both directions.

### F. Uninterrupted composite and falsifiers
`bash scripts/acceptance-run.sh` with **no wrapper timeout** to `ACCEPTANCE RUN COMPLETE`, steps 13b–17 recorded. Every falsifier baseline green and every mutant **DIED with its law named**, child logs under `deliveries/receipts/partH-s15/`. New laws need a mutant that kills them — I re-planted F25 by hand and it died (`FAIL L25 … persisted=false`, board 18/1); that is the standard. My independent S15 results (temp copy, beam's Playwright 1.57.0 + cached Chromium): node 35/35 · slice 29/0/10/3 · board 23/0 · shell 51/0 · visual 18/0 · slot 28/0 · contrast 2/0; receipt F0–F12 ALL DIED, shell FA–FD ALL DIED, slot F-S1 DIED; gates PASS/CLEAN.

### G. Slices 3–5 against the frozen seam
Slice 3 hydration + board chrome, slice 4 feed, slice 5 shareables. Build against `dispatchAsync` (`colors/src/sports/nfl/app/store.ts:147`, contract `:142–150`) and the storage facade. Do not redesign the seam; file a mismatch and stop. Publish nothing that depends on the missing account contract.

### H. Brag share (P-209)
Template: `I went X-Y and [result] with [team]. Can you go undefeated? [link]`. URL from a **build-time constant** set at make-live to the pinned `play.76pancakes.workers.dev` variant — **never** `window.location`, never `file://`, localhost, parameters, encoded state or save data. **Hide the button while the constant is unset.** Clipboard + toast, with selectable text as the fallback (not a download). Signed-out users can share.

### I. Visual bar
Near-exact w89; Cinzel 700/900 + Decorative already inlined (`tokens-w89.css:21-30,83-95`), body copy stays system sans, never copy w89's remote font link. Top three: highlight in the button, short why copy, glow on **every** Draft button with the three opting out to the sheen, separate TOP badge, no ring class. Panels: less boxy, more colourful, closer to w89; assert `--glass`, `--glassbd`, `--shadow` equal w89's, 22 px radii, contrast 2/0, no horizontal scroll at 390 px. File the side-by-side at 390×844 and 1180×950, light and dark, per `claude/visual-acceptance-spec-2026-11-21.md`.

### J. Workers-host build contract (cheap now, expensive to retrofit)
Vite `base: '/'`; asset URLs root-relative; any backend call a relative `/api/...` path, never an absolute host; **no `_redirects` or `_headers`**; no `pages.dev` string anywhere; **no wrangler config written by you**; `dist/` built from `index.html` only (no dev page). Supply `dist/` sha256 and zip sha256 with the hand-over — Claude writes the `releases.md` row. Playwright line: *"not verified in the Architect's sandbox; verified by seats at 1.57.0 / chromium-1255"*, never *"no browser run is verified"*.

## PART 5 — QUESTIONS TO ASK BACK (never be blocked silently)
Ask Claude in `inbox/` with `FOR:` and reasons if unclear: (1) is the seam published and frozen for slices 3–5; (2) is `dist/` = `index.html` + `assets/` or single-file; (3) build the **local** stat recorder now (my recommendation: yes, no schema); (4) which of the Part 4 defects are in scope this sitting; (5) is the brag URL constant stubbed now with a hidden button. Do not guess, and do not build the account system to "unblock" yourself.

## PART 6 — DEFINITION OF DONE
1. `gate-manifest` PASS **and** `verify-package` OK/0/0 + converse clean at final bytes. 2. Composite `ACCEPTANCE RUN COMPLETE` with steps 13b–17. 3. Every new law falsifiable; every mutant DIED by name. 4. Ring laws retired with reasons; new floors stated. 5. G.1 fixed with its law. 6. Slices 3–5 landed with receipts. 7. Brag per P-209, build-time URL, hidden when unset. 8. Visual bar + side-by-side filed (or deferred with a date). 9. `dist/` + zip sha256 in the hand-over. 10. `council/zai` pushed, `git ls-remote` verified, `preserve.mjs check` clean.

## PART 7 — FENCE
No product HTML, no `colors/**`, no engine byte, no pin change, no protected constant, no governance/queue/tools files, no other seat's lane. No field-level save merge, no CRDT, no mutation log — P-254 governs. No downloads, export/import or hidden full save. Free-only. The game stays fully playable offline with no account. No force-push, no stash; commit by path, push only `council/zai`. **Read pickle's canonical reference first. If it contradicts this prompt, it wins and you say so.**

---

**One-paragraph version.** Read the canonical reference (1.1), its addendum (1.2), Claude's rulings at `a17c323de` (Part 0) and ernie's detailed checklist (1.9). Claude finished the rulings and amended the decision/runbook/releases docs; his account-sync contract did **not** land — do not wait for it. Then, in order: close D1 with one digest policy + converse check; retire the ring laws with reasons and state new floors; fix the stale `ENGINE_PIN` (G.1); close the composite; land slices 3–5 against the frozen seam; implement the brag with a build-time URL; meet the w89 visual bar; honour the Workers build contract. Build only the local half of storage/stats. Hand over `dist/` with hashes, the law table, the floors and an honest Playwright line. Push `council/zai`.

— hy4 (council seat; advisor). This prompt assigns nothing: work comes from the queue. Owner words govern; the Architect decides technical matters.
