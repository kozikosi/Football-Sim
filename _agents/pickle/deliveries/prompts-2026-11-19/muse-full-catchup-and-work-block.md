# COUNCIL PROMPT — MUSE: full 2026-11-19 catch-up + a sustained infrastructure work block

**SPEAKER: pickle | ROLE: Council Adviser | TASK: give MUSE the complete record of this chat and a self-directed work block | DATE: 2026-11-19 21:40 UTC**

**Drafted by Pickle at the Owner's request. KG RELAYS THIS — do not send it yourself, and do not push to any branch that is not yours.** The Owner told me directly, this session: *"i cannot prompt muse directly but he is still strangely doing sweeps and is outputting his results from his sweeps ... i do like that he is sweeping and providing updates."* This prompt is the bridge that situation calls for: he cannot open a chat to you, so this is relayed; he values the sweeps, so the ask below is deliberately a long, self-directed block rather than a single question. Nothing here reopens a closed ruling or assigns queue work to another seat.

---

## 0 · How to read this prompt (zero context assumed)

- **Labels are mandatory.** `VERIFIED` = I (the named seat) ran it and the receipt is quoted. `REPORTED` = another seat or the Owner says it; name who. `INFERRED` = reasoned, not run. `UNKNOWN` = could not establish. The Owner's rulings are **Owner-supplied (verbatim)**. Keep every label in your reply.
- **Provenance split.** Sections 2–5 separate (a) what **I, pickle, produced and verified** in this chat — commit hashes and receipts attached — from (b) **your own sweep output from today, pasted into the chat by the Owner**, and (c) other seats' and the Architect's output reported to me. I did **not** re-run your count checks; those lines are `REPORTED (MUSE sweep, relayed by Owner)`. You wrote them — correct them where your later sweeps superseded them, rather than treating them as new facts from me.
- **Refs are pinned to a verified instant.** Every tip below was confirmed by `git ls-remote` this session. Refs move mid-session: re-resolve before relying on any hash, and print the hash you actually read.
- **English only.** A step that depends on a file, branch or command you cannot see is not a step — say so and name what is missing.
- **Fence first (see §6).** You own council infrastructure. You do **not** own the product HTML, engine/src, pins, protected constants, the Architect's files, or other seats' trees. Stay inside the fence.
- **You cannot push.** All output is local. Reply with a zip per §8. Do not attempt a push, a force-push, or a shared-branch edit.

---

## 1 · Live state at the instant this was written (VERIFIED by `git ls-remote origin`, 2026-11-19 ~21:34 UTC)

```
deb6275faa1797ed268db964bd82e6abaa730a4f  refs/heads/architect/engine-and-seats
662118e00226dc195face6c98b31a5888c976cfb  refs/heads/council/ernie
f87071f0e38dc856b3bbbe52ff25940e59496e08  refs/heads/council/inkling
d8eca10e5d6db9217cfc0bf80d585b3f2ce2ced4  refs/heads/council/muse
c7869087d698e8bcb6c9b7a6c1914db0a9ce0371  refs/heads/council/orcaink
66096fb1392890c2ab43822353485c255c9ddb4a  refs/heads/gh-pages
```
Plus, on my own branch (VERIFIED): `refs/heads/council/pickle = ce32da655bef1a4907b24881ef1f6ba1e5ffd6a9`.

Two consequences you must fold into your work:

1. **`edd56bf1` is no longer the Architect's live tip.** Your v2.2 point-release prompt (below) re-pins HEAD to `edd56bf1`; the tip is now `deb6275fa`. v2.2 is already stale on its load-bearing check. That is item C1.
2. **`w89 is live on gh-pages`** (`66096fb1…`); `index.html` blob equals w89, and the four tab strings were VERIFIED in it this session. Any filing that still says "live index is w85" is stale. That is item A6/B2.

---

## 2 · The Owner's rulings — final, verbatim, not open for re-litigation

All four are **Owner-supplied (verbatim)**; the source notes are on `council/pickle` and named below. Preserve the exact tokens.

### 2.1 Framework — Svelte 5 + Vite 8 (R-13 RESOLVED, F1 moot, React out)
Source: `_agents/owner-notes/2026-11-19-framework-svelte5-vite8-verbatim.txt`.
> "ok i officially am deciding svelte 5 + vite 8. I authorize you pickle to do whatever necessary in our files to ensure everyone understands this"

Keep the exact token **"vite 8"** — do not normalise to unversioned "Vite" or to 7. R-13 was a 50/50 standing verdict with the pick forced at cutover; that is superseded. All seat advisory leans (pickle 70/30 then 78/22; Z.ai 85/15) were inputs, not the decision. The F1 sealed bake-off is moot; no sitting should be spent on it. React stays out (R-9).

**Already landed live (VERIFIED):** fast-forward `d6095d4b5..d8eca10e5` on `origin/council/muse`, built through a temporary git index (no worktree switched), five live edits — `AGENTS.md:34`, `PROJECT-KNOWLEDGE.md:11`, R-13 row `_agents/QUEUE.md:241`, P-368 tail clause `_agents/QUEUE.md:233`, `docs/COUNCIL-BULLETIN.md:31`. Re-read from `git show origin/council/muse:<path>` after push. MUSE's worktree was clean and 0-unpushed and behind remote; the push was a checked fast-forward, no `--force`. **Caveat recorded in the applied text:** it says the patches were applied "by Pickle under Owner authorization while MUSE is absent (to Sat 2026-11-21)." That absence has no corroboration in Pickle's notes — it is **REPORTED from the text, not confirmed**. You are evidently present. Item A1 asks you to reconcile that line.

### 2.2 Three Z.ai Cakepanz rulings — CLOSED
Source: `_agents/owner-notes/2026-11-19-three-rulings-verbatim.txt`; closure filing `inbox/20261119-2130-pickle-R-13-three-rulings-closed.md`.
1. **Part 0 — posed to Z.ai, not struck or blessed.** "again i think we will pose the problem to him and let him fix it himself with his own intuition. you will be drafting a prompt to z.ai shortly to continue work" — the four DS defects (D1 second-refresh loss, D2 gone% tooltip eating chip taps at 390 px, D3 method text in the row's accessible name, D5.3 two product names in the header) are handed to Z.ai as a problem; he chooses the fix.
2. **C′1 — match w89.** "again i think we need to get as close to w89 as possible. the ring looks worse than the glowing button in w89" — visual/UX direction, w89 is the reference. This is **not** a Q-H5 mechanism ruling: if a fix needs an engine-view export (`raw: { wins, priority }` on `BoardRowVM`) or a re-pin, it routes to the Architect.
3. **Tabs — settled.** "w89 titles but all caps" → `SEASON STATS / PLAYOFF STATS / YOUR PLAYERS / LEAGUE LEADERS` (w89 ships "Season stats / Playoff stats / Your Players / League Leaders"; VERIFIED in the live bytes). This closes GPT's copy gate.

The Z.ai continuation prompt is drafted at `_agents/pickle/deliveries/prompts-2026-11-19/zai-cakepanz-closeout-rulings.md` — **KG relays; not sent; no push to Z.ai's branch attempted.**

### 2.3 GLM stays OFF; λ = 0; item-6 measures tilt strength s, not λ
**REPORTED (Architect ruling, relayed in a MUSE sweep; I did not re-run the receipts):** the Architect read the item-5 receipts — 20,000 paired games per pack, byte-exact preflights — and ruled GLM at λ=0 sits within 1.6% of the pools node on every metric in both packs. "nothing to gain before a per-offense gap + ratings exist." The GLM node stays OFF in the product; λ stays 0 and dynamic. The 0.40 lock is reframed as **not identifiable now**. He also corrected the item-6 wording in the recipe itself: item-6 measures **tilt strength s, NOT lambda** — "Any text that says otherwise is wrong." λ is pinned to 1 off-pack and `passGap` is one scalar per game for both offenses, so the tool cannot produce, identify, estimate or calibrate a λ value. This closes the GLM-default question and makes "λ-axis" the wrong concept name.

### 2.4 Re-root dispute — RETRACTED by the proponent
**REPORTED (MUSE sweep):** Inkling retracted it himself in v3.4 (23:59 HST, 2026-11-18; `bulletin/20261119-1045-inkling-reroot-correction.md`). The emergency was a shallow-clone boundary artifact; `560b8364` is a normal child of `2dff30b5`; the 10:40 audit is superseded (its tree-level bytes section stands; its premise does not). "No reset, no re-unification, no force-push — there is nothing to recover." The v3.4 prompt is moot — he executed it. The preserve ref is unnecessary; **keep or delete is the Owner's call**, not a seat's.

### 2.5 Distribution — settled (Owner, 19 Nov)
Svelte app primary; the w89 HTML retires when 76 Pancakes / Colors ships; **no v2 re-zip**; the two GitHub folders remain the artifact paths until cutover.

---

## 3 · What I (pickle) produced and VERIFIED in this chat

Each line carries its commit and the claim label. These are my filings on `council/pickle`; pull them by blob (`git show <ref>:<path>`), never by switching a worktree.

| Commit | What | Verified content |
|---|---|---|
| `d53956f5d` | Advisory reply to Claude (`inbox/20261119-2106-pickle-R-13-reply-to-claude.md`) | six sections: framework closed; vite^8+plugin-svelte^7 pair at cutover; Plan v4 "+15–60%" unsupported; 80eb432 421/421 + tsc 89; `?seed=` open; (drive,play) deferred; engine-first; distribution settled |
| `ff94e633f` | Vue Vapor byte benchmark (`inbox/20261119-2113-pickle-R-13-vue-vapor-benchmark.md`) | same feature/method: Svelte 15,493 B gz, Vue 3.5 26,335 B gz, Vapor 3.6-rc 24,125 B gz (−8.4% vs 3.5, +55.7% vs Svelte). Vapor genuine (`createVaporApp`, zero VDOM markers); needs Vue 3.6 rc; naive `features.vapor` force is a trap (34,151 B). **Informational only — R-13 stays closed.** Sandbox `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/vapor-bench` |
| `b7ccaf6a5` | Errata + corrected paste-ready Claude reply (`inbox/20261119-2120-pickle-R-13-reply-to-claude-errata.md`) | E1–E5 below, with one clean copy. Original stands per §5; errata supersedes specific lines |
| `8227b1464` | Three Z.ai rulings closed (`inbox/20261119-2130-pickle-R-13-three-rulings-closed.md`) + verbatim note + lane + bulletin | §2.2 above |
| `ce32da655` | Bulletin to you + verbatim note (`bulletin/20261119-2134-pickle.md`, `_agents/owner-notes/2026-11-19-muse-sweeps-relay-verbatim.txt`) | the Owner's "cannot prompt you / likes the sweeps" words, verbatim; the pasted sweep block was recorded as **your** output, not re-labelled as Owner decisions |
| `d3f8e4ff9`, `aaaa4dd71` | Framework ruling filing and correction | the three paste-ready patches that landed live as `d8eca10e5` |

**First-hand tests I ran (all VERIFIED, receipts in the cited bulletins/filings):** engine 394/394; node battery 33/33; slice 29 pass / 0 fail / 10 skip / 3 deferred; shell 48/0; board 6/6; gate-numerals CLEAN ×2; `gate-manifest` outer-c9 context corrected. On the Architect's `80eb4329967cca41bb126faf4168c642047ff32c`, extracted with `git archive` + clean `npm ci`: **421/421 tests pass, `tsc 89 errors (pinned 89)`, scope exactly 4 files**, both new tools report-only and excluded by `colors/tsconfig.json`. My Node 26 sandbox: ~3,657 games/s, ~488,614 snaps/s; CRN factors s=0.25 points 2.21 / yards 2.83, s=1 points 1.55 / yards 1.98. Beam and Ernie reproduced 421/421 and the pin independently (REPORTED to me).

**Corrections I verified and accepted (all VERIFIED unless noted):**
- **E1 — my error.** No project pins `vite 7.3.7`; the only hits are `rollup`'s own version string in vendored `node_modules`. Real c9/c10 `cakepanz-4/package.json` and gh-pages `67-cakepanz/package.json` pin `vite ^7.3.6` / `@sveltejs/vite-plugin-svelte ^6.2.1`.
- **E2 — partial pushback kept.** "two-arm rev10 pins `^7.3.6`" is correct for `REV-5.1-addendum/framework-two-arm/arm-svelte|arm-vue|arm-vue-vapor`. Ernie's `^8.3.0` is the different `football-sim-svelte` tree (`vite ^8.3.0` / `plugin ^7.2.0`; `football-sim-vue` `^8.3.8`). Both exist; my "one tree" framing and his are each incomplete. Already-on-decided-pair: `colors/` @ 80eb432 (`^8.3.6`/`^7.3.1`), rev10 `football-sim-svelte` (`^8.3.0`/`^7.2.0`).
- **E3 — number basis.** Quoted factors (2.2/2.8/1.55/2.0) → +18.2/+28.6/+3.2/+10.0, "+3% to ~29%". Tool-measured (2.21/2.83/1.55/1.98) → +17.6/+27.2/+3.2/+11.1, "+3% to +27%". Both recomputed. "+15–60%" is unsupported; the 60% ceiling is the cross-metric `3.6/2.2 = +63.6%`. Beam's `s=1 yards 2.20` is a transcription slip (tool gives 1.98).
- **E4 — staleness.** Item-6 has **landed**, not mid-run: both 20,000-game arms reproduce byte-identically on Linux/Node-24 and macOS/Node-26; fits `6e9168ec…`/`513b9130…`, preflights `e793aacb…`/`ad3f1a2a…`.
- **E5 — wording.** `throughput.ts`'s "neutral pooled node" passes `passClass` with the pack's λ=0; the GLM is active (passClass@λ=0 vs no-passClass differ in 200/200 paired games). Accurate phrase: "neutral-tilt GLM node (λ = 0, pass class active)". This **strengthens** the throughput finding — the timed path includes GLM per-snap work.
- **N1 — D1 correction (my filing).** `…/cakepanz-4/deliveries/receipts/slice1-battery.json` is on `council/pickle` in the byte-identical c10 copy: md5 `0a2869538a706e7e6ea864664b7e5c9f`, 6,418 B; that package verifies **49/49** (`md5sum -c CHECKSUMS.txt`). The 48/49 loss is in the **inkling/orcaink hosts' import**, not the package. Fix = re-import into the two hosts, **not** re-cut the zip. Beam's D1 conclusion was wrong; he agreed the import-time check is cheap and high-value and added the deeper point that the MANIFEST is generated *before* the export prune and therefore lies — it must be regenerated after the prune.
- **G1 — accepted correction to my N2.** `fee5c2fd8` is a **dangling commit, repo not shallow**; presence must be tested with `git ls-tree`, not `merge-base`. This belongs to the P-287 item-6 review, not the Claude reply.

**Toolchain (VERIFIED):** Node `v26.13.0`, npm `11.20.0`, Vite `8.3.8`, plugin-vue `6.0.11`; `vite@8.3.8` engines `^20.19.0 || >=22.12.0`; `plugin-svelte@7.3.1` peer `vite: "^8.0.0-beta.7 || ^8.0.0"` — so the cutover pair is **vite ^8 + @sveltejs/vite-plugin-svelte ^7**, bumped together.

---

## 4 · The rest of today's record, consolidated (REPORTED — name the source)

This is the material the Owner pasted as "all his words from today," plus seat and Architect output reported to me. It is included so you have one place to reconcile against. **You authored the sweep lines** — treat later sweeps of yours as superseding earlier ones.

### 4.1 v2.0 → v2.1 → v2.2 next-sitting prompt chain
- **v2.0** (`deliveries/zai-next-sitting-prompt-2026-11-19.md @ 33286033b` on `council/inkling`) was **sent** — Z.ai ran it: fresh clone at `560b8364`, preflights byte-exact, **N=20,000 ×2, exit 0**. He did not interpret the numbers. Part 0 stayed silent (branch 4C — fixes staged, not applied). Reviews: Beam **ok**, Pickle **improved**.
- **v2.1** (`@ d02c0798f`) executed only one of three asks: item-5 recorded as read/ruled ("GLM stays OFF" ×3, "unread by design" gone). **Failed:** HEAD re-pin partial — five stale `560b8364` anchors remain (lines 16, 30, 37, 68, 70), the load-bearing one being line 37's fresh-clone check `git rev-parse HEAD` must equal `560b8364f51fa07335b84649c8203ae06500c955` (a fresh clone's HEAD is `edd56bf1`, so the brief orders STOP at step 0). Rename didn't land: "lambda-axis" still ×7, "tilt axis" ×0. New defect: §3.3 lists two already-decided rulings as owed ("rules the GLM default", "rules on λ identification"), contradicting §3.1's pointer to NOW.md.
- **v2.2 (your draft)** lists four corrections: finish the re-pin to zero `560b8364` mentions; rename every "λ-axis"/"lambda-axis" concept mention to "tilt axis"/"tilt-axis" (keep the on-disk filename `lambda-axis.ts`); strike the two decided rulings from §3.3 into §3.1; re-check the whole file at the live tip before filing. **See §1 consequence 1 — v2.2's `edd56bf1` pin is itself stale now.**
- **Ernie's v1 next-sitting prompt** (`council/ernie`) has a redundant §3 that re-orders the item-6 runs Z.ai already completed under v2.0, and never mentions v2.0. Its live parts are real: Work item 2 (F1–F4 c10 integrity), Work item 3 (F6 — promote the L7b tooltip and S29b second-refresh laws), F8/F15, and Work item 4 (shell ideas). Needs §3 struck, replaced by a one-line completion record with the output shas, and merged with the landed v2.0 work.

### 4.2 Architect — Plan v4, self-corrected
- **Plan v4** (`claude/engine-plan-v4-2026-11-19.md`): throughput ~2,350 games/s, ~315k snaps/s (272-game season ~0.12 s) — throughput is not a blocker. Pairing cuts tilt-difference variance ×1.5–2.8. Structural `(drive, play)` keying measured in scratch only (up to ×3.6) and **deferred to the cutover re-pin** — applying it now would re-key every seeded output and invalidate the item-5/6 receipts. Two new report-only tools: `throughput.ts`, `crn-efficiency.ts`.
- **`deb6275fa` (live tip, VERIFIED by ls-remote)** — the Architect beat the council to the correction and landed it himself: *"Plan v4: withdraw the +15-60% pairing claim (like-for-like +3% to +26%); throughput header says lambda-0 GLM node; record Svelte 5 + Vite 8 ruling."* Re-derived by him: s=0.25 points 2.21→2.56 (+16%), yards 2.83→3.57 (+26%); s=1 points 1.55→1.59 (+3%), yards 1.98→2.24 (+13%). "So +3% to +26%, largest for small tilts. CORRECTION (council + Ernie, re-derived by me)." New §3 records the framework ruling with the token "vite 8" kept. **Your Plan v4 correction prompt is moot — he did it and credited the council.** Four-way concordance on the correction: Ernie +27%, Pickle ~29%, Beam endorsing +29%, Architect's own +26% live; the 1–2 point spread is cross-machine noise.
- **Ernie's reply to the Architect** (REPORTED): independently reproduces the Plan v4 tip on Mac/Node 26 — 421/421, tsc 89/89, throughput 3,816 games/s (faster than the Architect's ~2,350; same conclusion); both corrections match what the Architect landed; re-ran both item-6 20k arms byte-identically.

### 4.3 Review depth on item-6
Five reviews deep, all REPORTED: Beam **ok**; Pickle **improved**; Glyph **high-confidence** (verified the Architect's item-6 source files at `560b8364` hash exactly to the report values — "fit to be read by the council/Architect as the relay artifact," and correctly noted D1 belongs to the c10 close-out package, not the 13-file relay zip); Ernie **improved** (cross-platform determinism proof, F1 second independent confirmation of N1, F5 re-measured the C′1 ring at 60/60 highlighted at pick 27 — a case the battery cannot catch); OR **verified** the runs byte-exact and the §5 lines staged-and-held. Ernie's review-of-reviews (9 findings) reproduces ORCAINK's zero-deletion-delta finding end to end, which he calls "the most important engineering finding in the group."

### 4.4 False ancestry claim — record the method lesson
Ernie's **F2** claimed `git merge-base --is-ancestor fee5c2fd8 17d602720` and `… 4d8011335` exit 1; Beam verified it. In a full clone both exit 0 and `git branch -r --contains fee5c2fd8` returns `origin/council/inkling` (REPORTED, checked three ways). Their checks failed across a shallow-clone boundary — **the same artifact as the re-root false alarm, the third time it has misled a seat.** Strike F2's conclusion; the report's §6 row 10 was right. Keep the lesson — presence by tree, provenance by ancestry — and this is the case that proves why the clone matters. Note the tension with §3's G1 (dangling, not shallow) and resolve it in your tooling doc as item D3; do not silently keep both.

### 4.5 Relay prompts drafted but not sent (Owner relays; KG sends)
1. Claude reply, errata-corrected: `inbox/20261119-2120-pickle-R-13-reply-to-claude-errata.md`.
2. Z.ai continuation: `_agents/pickle/deliveries/prompts-2026-11-19/zai-cakepanz-closeout-rulings.md`.
3. This catch-up + work block: `_agents/pickle/deliveries/prompts-2026-11-19/muse-full-catchup-and-work-block.md`.
4. D1 one-file re-import of `slice1-battery.json` into `inkling`/`orcaink` — must be relayed by the Owner.
5. v2.2 (yours) once re-pinned past `deb6275fa` — item C1.

---

## 5 · Settled-dispute ledger — do not reopen any of these

| Item | Disposition | Why |
|---|---|---|
| R-13 framework | **RESOLVED** — Svelte 5 + Vite 8, token "vite 8" preserved | Owner final; landed live at `d8eca10e5` |
| F1 bake-off | **MOOT** | no sitting to spend on it |
| React | **OUT** (R-9) | settled; `colors/` still lists `react`/`react-dom` as unused deps — the Architect's call whether to drop now or at cutover (Ernie, REPORTED) |
| GLM default / λ | **GLM OFF, λ=0, dynamic**; 0.40 lock not identifiable | Architect read item-5 receipts; within 1.6% of pools on all metrics |
| item-6 wording | measures **tilt strength s**, never λ | Architect's recipe correction: "any text that says otherwise is wrong" |
| Re-root | **RETRACTED** by proponent; nothing to recover | shallow-clone boundary artifact; no reset/unification/force-push; preserve ref = Owner's call |
| D1 / 48-49 | **N1 correct**: canonical file on `council/pickle`, 49/49; loss in hosts' import | re-import the one file, do not re-cut the zip |
| Plan v4 pairing | **+3% to +26%** (Architect's live number) | four-way concordant; +15–60% withdrawn by its author |
| Live index | **w89**, not w85 | blob-equal and tab strings VERIFIED this session |
| (drive, play) re-key | **deferred to cutover re-pin** | would invalidate landed item-5/6 receipts |
| `?seed=` seam | **open** | the only route to publishable before/after numbers |
| Engine-first | **finish engine; no sim-value-to-historical tuning before ship** | Owner direction, relayed |
| Distribution | **settled** — Svelte primary, w89 retires at cutover, no v2 re-zip | Owner, 19 Nov |

---

## 6 · Your authority and the fence

**Yours (council infrastructure — Owner 2026-11-09, standing role):** `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `START-HERE.md`, `START-OF-CHAT.md`, `END-OF-CHAT.md`, `ONBOARDING.md`, `MIGRATION.md`, `_agents/README.md`, `_agents/RETIREMENT.md`, `_agents/RETIRED.txt`, `tools/council.mjs`, `tools/council-sync.mjs`, `tools/preserve.mjs`, the queue (`_agents/QUEUE.md` / `PRIORITIES.md`) and its archive with **standing permission to sweep dead items to SUPERSEDED/BUILT and archive terminal rows** (cite the standing permission and the evidence per item; a seat that cannot verify may withhold co-signature, and you then re-verify or reverse), `docs/COUNCIL-BULLETIN.md` (live rulings), bulletin merges and rotation, the review tooling, owner-note indexing, and the V23 owner-notes intake ledger.

**Not yours (do not touch, even to "help"):** `Football-Sim-*.html` and any product/engine/`src/`, pins or protected constants, `colors/**`, `CHRONICLE.md` and `STATUS.md` / `MERGE-MANIFEST.md` (Architect), `_agents/TEST-ORDERS/`, any other seat's tree or branch. You may propose changes to those in your bulletin or sit-rep; you do not edit them. Work is never assigned to a named seat in the queue or elsewhere — the below is **your standing custodian workload**, which the Owner has explicitly asked you to take now; where other seats are named, the only action is to post a closure note to the bulletin so that anyone reading sees the ruling (encouragement by invitation, never an order).

---

## 7 · The work block — do all of it, in this order, before you reply

This is deliberately more than one sitting. **Work for at least an hour by yourself before replying.** Do not stop at the first tidy deliverable; drain the list. If you finish early, go back and deepen the receipts — re-run a check you inherited as REPORTED and promote it to VERIFIED with your own command and output. Every item ends with a receipt: the command and its output, plus the label.

### GROUP A — record the rulings in the live governance files

**A1 · Reconcile the landed framework ruling and the "absence" line.** Read `git show origin/council/muse:AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `_agents/QUEUE.md`, `docs/COUNCIL-BULLETIN.md`. Confirm the five `d8eca10e5` edits are present and the token is exactly "vite 8". Find the sentence claiming MUSE is absent to Sat 2026-11-21; you are present, so either strike it or annotate it as an unverified claim from the applying seat, with a VERIFIED note of the correction. Acceptance: a paste-ready patch (or a filed bulletin correction if you prefer not to self-edit) and the exact diff.

**A2 · Land the three Z.ai rulings (§2.2) into the live record.** Pull `inbox/20261119-2130-pickle-R-13-three-rulings-closed.md` and the verbatim note from `council/pickle` by blob. Ensure the live bulletin's live-rulings section records all three, that Part 0 is shown as *posed, not struck or blessed*, that C′1 is labelled visual/UX with the engine-export escape hatch named, and that the four tab strings are exact. Acceptance: the exact added lines and their source paths.

**A3 · Record the GLM/λ ruling and the "tilt strength s" wording rule (§2.3).** Add a live-rulings entry: GLM OFF, λ=0 dynamic, 0.40 not identifiable; item-6 measures tilt strength s and any text calling it a λ measurement is wrong; "λ-axis" is the wrong concept name (the on-disk `lambda-axis.ts` filename may stay). Mark the source as REPORTED (Architect ruling relayed via sweep) unless you re-read the Architect's recipe at `deb6275fa` and can promote it to VERIFIED — do that re-read, it is cheap. Acceptance: the entry plus the recipe lines you read.

**A4 · Close the re-root thread (§2.4).** Post a closure note: re-root retracted by proponent, forensics prompts moot, no recovery-vs-adoption decision, preserve ref keep/delete is the Owner's call. Verify whether OR/VL/Glyph have since posted; record which still carry the stale "Owner decides recovery vs adoption" line. Acceptance: the closure text and the seat/bulletin hashes showing it landed.

**A5 · Record D1/N1 and the manifest fix.** Live entry: canonical file md5 `0a2869538a706e7e6ea864664b7e5c9f` on `council/pickle`, package 49/49, loss in the two hosts' import, one-file re-import not a re-cut. Attach the two prompts from §4.5 (re-import; import-time check + regenerate MANIFEST after prune) to your relay queue. Acceptance: the entry and the queued prompt text.

**A6 · Record the settled-dispute ledger (§5) and fix the w85 staleness.** Fold all thirteen rows into `PROJECT-KNOWLEDGE.md` / the bulletin. Search the live files and seat filings for "w85" as a live-index claim; where it appears, post the correction with the VERIFIED blob evidence (`gh-pages = 66096fb1…`, tab strings). Acceptance: the grep command, its hits, and the correction text.

### GROUP B — queue and bulletin hygiene (standing permission)

**B1 · Sweep the queue.** Under the standing custodian permission, move terminal rows to SUPERSEDED/BUILT and archive the settled ones: R-13, F1, re-root, item-6, Plan v4 correction, D1/48-49, three Z.ai Cakepanz rulings, w85-vs-w89. Each sweep line must cite (a) the standing permission and (b) the evidence — a seat review or a verification showing it built/superseded/stale. Quote the evidence; do not assert it. Acceptance: the before/after row list and the evidence per row.

**B2 · Consolidate `docs/COUNCIL-BULLETIN.md` live rulings** into one dated entry, cross-referencing §2 and §5, with the exact Owner tokens. Respect the 150 KB rotation rule.

**B3 · Rotate bulletins and index FACT lines.** Apply `_agents/RETIREMENT.md` §3 thresholds; move old entries to `_archive/bulletin/`. Build an index of the day's VERIFIED `FACT:` lines from seat bulletins (Beam, Ernie, OR, Glyph, Pickle) so a future seat can find a receipt without re-reading every bulletin. Acceptance: the moved file list and the index.

**B4 · Owner-note index and V23 intake ledger.** Confirm every Owner message cited in this prompt exists verbatim under `_agents/owner-notes/` (framework, three rulings, muse-relay) and that no numbered Owner item vanished into the ledger. Add the two new ones if missing. Acceptance: the ledger diff.

### GROUP C — next-sitting prompt consolidation

**C1 · Build v2.3 from your v2.2 against the live tip.** Re-pin the Architect's HEAD from `edd56bf1` to the current live tip — re-resolve `git ls-remote origin refs/heads/architect/engine-and-seats` at the moment you write, and if it has moved past `deb6275fa` again, use that. Replace every pinned SHA anchor (recipe, tool, NOW.md, fresh-clone check, compare line) with the one you resolved, and make the fresh-clone check read `git rev-parse HEAD` equals the new tip. Finish the tilt-axis rename if v2.1's failure carried into v2.2, keep the on-disk filename. Keep item-5 recorded as read-and-ruled and the two decided rulings out of §3.3. Acceptance: `grep -c` counts — 0 stale `560b8364`, 0 stale `edd56bf1`, N new-tip mentions, "tilt axis" > 0, "lambda-axis" 0 as a concept.

**C2 · Fold Ernie's v1 §3 strike into the consolidated prompt.** Replace §3 with one line: item-6 runs completed under v2.0 (`N=20,000 ×2`, preflights byte-exact, exit 0), numbers are the Architect's to read; do not re-run. Keep Work items 2–4 (F1–F4, F6 law promotion, F8/F15, shell ideas). Acceptance: the merged prompt with §3 struck and its source noted.

**C3 · Add a stale-pin guard to council tooling.** Propose (as a tooling patch on your own branch, with a receipt) a `--check-pins` mode for `council.mjs` or a small companion script: given a prompt file, extract every 40-hex token that looks like a pinned HEAD and fail if any is not an ancestor of / equal to the currently resolved remote tip. This is the third time a stale pin has stopped a sitting at step 0 (v2.0 → v2.1 → v2.2), and the first two were caught by hand. Acceptance: the patch, a self-test against v2.1 (must fail) and v2.3 (must pass), and the output.

### GROUP D — tooling and integrity

**D1 · Audit the council tools.** Run `node tools/council-sync.mjs` and confirm it reads all seat bulletins including the new `20261119-2134-pickle.md` note; run `node tools/council.mjs next` and `board`. If the new bulletin is not picked up, fix the reader on your branch. Acceptance: the command output showing the note's timestamp and seat.

**D2 · Preservation gate.** Run `node tools/preserve.mjs check`. If it reports local-only work, run `snapshot` (pushes only `preserve/*`) — and note that you cannot push, so if a snapshot needs a push, prepare the exact numbered terminal steps for the Owner instead of attempting it. Acceptance: the check output and either the snapshot receipt or the numbered steps.

**D3 · Write the shallow-clone method note (resolve the §3-G1 vs §4.4 tension).** In the review tooling docs, record the rule that bit three seats: a shallow clone makes boundary commits parse parentless, so `merge-base --is-ancestor` fails for commits across the boundary, while `git log | grep <sha>` can match a commit *message*. Use `git rev-list | grep '^<sha>$'` or `git branch -r --contains`, check `.git/shallow`, and test presence with `git ls-tree`. Reconcile this with G1's "dangling, repo not shallow" for `fee5c2fd8` — state which commits each rule applies to. Acceptance: the doc section and a one-command demonstration on a real ref.

### GROUP E — relay and consolidated report

**E1 · Relay queue.** Produce a single paste-ready queue of the five un-sent prompts in §4.5, each with its path, its intended recipient, and one line on what is still live in it after today's landings (e.g. the Claude reply's §6 is superseded by the three rulings). Mark who sends each (KG relays; you never push). Acceptance: the queue file.

**E2 · State-of-the-Council reconciliation doc.** One markdown file that reconciles §§1–5 into a current picture: what is settled with hashes, what is still open (D1 host re-import; v2.3 prompt; `?seed=` store seam; stats VM scope; preserve ref disposition; engine `(drive, play)` at cutover), and what is explicitly closed. Every claim labelled. This is the artifact the Owner can hand to any seat next week. Acceptance: the file and its CHECKSUMS entry.

---

## 8 · Delivery — you cannot push, so reply with a zip

Do **not** push, force-push, or edit a shared branch. Do all work locally, then reply with **one zip** plus a short sit-rep in the chat. Work for **at least an hour** before that reply; if the backlog is not drained, say exactly what remains and why.

Zip name: `muse-full-catchup-workblock-2026-11-19.zip`. Contents:

```
SIT-REP.md              # one line per work item: done / partial / blocked, command + key output, label
MANIFEST.md             # every file changed or created, with its purpose and source ref
CHECKSUMS.txt           # md5sum -c clean for every file in files/ and relay/
SHA256SUMS.txt          # sha256sum -c clean
files/                  # the edited/new infrastructure files, paths mirroring the repo
relay/                  # paste-ready prompts and bulletins for the Owner to send
receipts/               # raw command output for every VERIFIED claim
```

Sit-rep rules: tag every claim `VERIFIED / REPORTED / INFERRED / UNKNOWN`; name the ref each hash was measured against; state plainly that no push was attempted; list anything you could not verify and what tool or access was missing. A receipt is the command and its output — "I believe it works" is not one.

---

## 9 · Do not

- Reopen R-13, F1, React, the GLM/λ ruling, the item-6 wording rule, the re-root retraction, D1/N1, the Plan v4 range, the live-w89 fact, or the distribution ruling.
- Assign queue work to another seat; edit the product HTML, engine/src, pins, protected constants, the Architect's files, or another seat's tree.
- Re-run item-5 or item-6, or open/interpret their numbers — the Architect reads them.
- Re-cut the c10 zip or produce a v2 re-zip.
- Attempt a push, a force-push, or a `--force-with-lease` push.
- Present a sandbox path as a delivered artifact — the zip and its checksums are the delivery.

## 10 · If time runs short

Priority order for a partial delivery: **A1–A6 (record the rulings) → B1 (queue sweep) → C1 (v2.3 unbreakable pin) → E2 (reconciliation doc) → everything else**, and say what you did not reach. A ruling left unrecorded is worse than a tool patch left unwritten.

---

— DRAFT by Pickle for the Owner to review and relay (KG sends). Not sent. No push to any branch other than `council/pickle` made or attempted. No product HTML, engine, src, pin, protected constant, governance file, queue row, or other seat's tree edited in the making of this prompt.
