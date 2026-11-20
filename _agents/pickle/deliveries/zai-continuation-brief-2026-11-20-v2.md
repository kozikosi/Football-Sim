# Z.ai — sitting order v5 (merged): state, receipts, work, evidence
# Pickle 2026-11-20 02:55Z, incorporating Ernie's `zai-next-sitting-prompt-2026-11-20.md` (sitting-order v4)

Supersedes Pickle's `_agents/pickle/deliveries/zai-continuation-brief-2026-11-20.md` (v1) and Ernie's
`_agents/ernie/deliveries/zai-next-sitting-prompt-2026-11-20.md` (v4). Reasons for the merge: Ernie's task
cards carry exact anchors and checks mine lacked; my governance, receipts and independent review findings
carry byte-level evidence his lacked. Three corrections were made before merging (marked **CORrection** below
and in §9). Read §0, §1, §3 and §7 before touching anything; §2/§5 is the work; §8 is where things are.

This is context and options, **not an assignment**. Nobody is assigned by name. Whoever opens a chat runs
`node tools/council.mjs next` (v9, from `origin/council/muse`) and takes the top line; a review you can do
beats new work in the same tier. If a higher-priority item appears on `origin/council/muse:_agents/QUEUE.md`,
take it and say so. A written dissent with evidence beats silent compliance. If you disagree with a task,
say so and do the rest.

---

## 0. How to work

1. Read `AGENTS.md`, `origin/council/muse:_agents/QUEUE.md` (live queue) and §1–§3/§7/§8 of this file. Never read
   `V22-Suggestions.md` whole — only the row a work item cites.
2. Run `node tools/council.mjs next`; take the top line. §5 lists what is live and what is already done so you do
   not repeat it.
3. **Delivery:** if you have file access, work on your own branch `council/<seat>`, commit by path, push, verify
   with `git ls-remote`. If you are chat-only / have no push credentials (Ernie's standing note: a push hangs),
   work in your sandbox, produce the zip in §6, and let the Owner relay it — say plainly which case applies.
   A missing tool is not a missing obligation; disclose it.
4. **Label every claim** `VERIFIED` (you ran it, raw stdout in the text) · `REPORTED` (someone else says so, name
   them) · `INFERRED` (reasoned, not run, say what would confirm it) · `UNKNOWN` (not checked, say what you need).
   A number without a label is a rumour; a receipt without a command is a claim. PASS means checks ran clean —
   it is not product acceptance.
5. English only. Keep chat replies short and paste-ready; put detail in files.

## 1. Build truth (re-measured by Pickle 20 Nov)

| Name | Location | Pin / sha | State |
|---|---|---|---|
| **76 Pancakes / Colors v1** | `colors/` on `origin/architect/engine-and-seats` | engine pin `4ca9a071`; tip `408410477` | Product. **Svelte 5 + Vite 8** (Owner ruling 2026-11-19, FINAL, R-13 closed — supersedes the old "open" wording); React out, dependency removed at cutover. Ship when fully functioning. |
| **Pre-Colors** | `Football-Sim-PreColors.html` | `40233d6be00e987c` (657,486 B) | Frozen reference; engine anchor; POINTS_PER_WIN 32.5. |
| **Z post-blue waves** | `Football-Sim-Z-post-blue-wNN.html` on `origin/gh-pages` | w87 md5 `bffdccac…` (1,900,033 B) | Live wave series. `w88` exists on gh-pages; `index.html` is still w85 — w88 is not live until the Owner replaces it. |
| **67 Cakepanz** | `67-cakepanz/` on `origin/gh-pages` | engine snapshot `4ca9a071`; published slice uses `svelte ^5.57.3`, `vite ^7.3.6` | Slices: 1 Draft Board (done), 2 Team Select (done, **not accepted** until P-317), 3 hydration + board chrome (P-316), 4 feed, 5 shareables. New work targets Vite 8 per the ruling. |
| **Engine pin** | — | `4ca9a071` | Frozen snapshot every track consumes. Never edit the engine to match a UI. |

## 2. The Architect's completed work — verified at the pushed bytes

Sitting ended on a timeout. Ernie and Pickle independently verified the whole chain; all receipts reproduce.

| commit | what | verification |
|---|---|---|
| `da0cf927` | S3 context snapshot (`core/snapshot.ts`, `snap53:` hash, zero form = absent) + S4 async twins (`dispatchAsync`, `selectBoardAsync`) | 427/427, tsc 89/89 (421/421 at parent `deb6275fa`); scope clean |
| `92f87f7e` | `dispatchAsync` fix: throwing subscriber no longer poisons the queue | 428/428; negative control — restore pre-fix `store.ts` → 14 pass / 1 fail on the new test |
| `ed16fd8f` | passGap study (report-only) | re-run from public nflverse 2016-25; split-half 0.539/0.364, year-to-year 0.448/0.206, slope 0.939 ±0.033, λ 6.89 ±0.24 (6.83/7.13 by era) |
| `3cf3e91f` + `aa4f9b3d` | report caveats; S1 seam `winsPerOvr(row, base, snapshot?)` + Q7 law pinned by test | 430/430, tsc 89/89, Q7 asserts measured/table providers ignore snapshot |
| `408410477` | multisport plan M (docs only) | read; sound; post-cutover; rule of two; 3 low-severity citation nits (§4) |

**Receipts (VERIFIED, Pickle, Node v26.13.0):** `git archive <sha>` → `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/…`,
`cd colors && npm ci && npm test` → `tests 430 / pass 430 / fail 0 / skipped 0`;
`npm run tsc:check` → `tsc baseline OK: 89 errors (pinned 89)`; `valueprovider.test.ts` alone 10/10.

**passGap decimal:** Pickle 0.550 / slopes 0.966, 0.958, 0.989; report 0.551 / 0.965, 0.959, 0.988. Cause
INFERRED library versions (Pickle pandas 3.1.0 / numpy 2.5.4 / sklearn 1.9.1 vs report's 3.0.5 / 2.5.3 /
1.9.1). Ernie confirmed his fetch matches the manifest with the same version pair as Pickle but did **not**
quote recomputed decimals — do not say "both of us get" Pickle's values. Both sets are recorded in the caveat
block; neither was overwritten. Do not re-litigate it.

**λ:** implied λ ≈6.9 is a unit conversion `1/Var(theta)`, **not a free dial**. Product stays **λ 0, GLM off**.
Open item is the ratings→gap mapping (post-cutover tuning, fit against the team-season scores). No per-game
historical tuning — Owner's 18 Nov ruling: ship first, tune after.

**Process note:** reading rules go in their own commit BEFORE a run (Architect's 20 Nov fix). Do not write
tolerances after seeing results.

## 3. State of the Cakepanz trees

- **`origin/gh-pages:67-cakepanz`** — slices 1–2 REV 3, engine pin `4ca9a071`, `vite ^7.3.6`, `svelte ^5.57.3`.
- **c10 package** (on `council/pickle`, `council/inkling`, `council/orcaink` at
  `_agents/<seat>/deliveries/…/67-cakepanz-10-2026-11-19`): the close-out build — `App.svelte` (full shell,
  screens, Complete), `BoardRow.svelte` (ring + gone% tooltip + needs), `shell.css`, 3-file `src/` snapshot.
  Package = delivery of changed files; **your build tree is the source of truth for your work**.
  Verified anchors in the packaged `App.svelte`: `:54` `?dev`, `:109` `seed = 1000 + Math.floor(Math.random()*9000)`,
  `:115` `store.dispatch({ type:'START', seed, userTeam })` (no pickSlot), `:151` `undo()`.
- **v3 sitting delivered and verified** — `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/`
  on `council/ernie` (23 files, 22/22 md5 OK) and hosted byte-for-byte on `council/pickle`. The c10 repair (one
  file, 6,418 B, md5 `0a286953…`) and the doc fixes are the **Owner's to land**, not yours.

## 4. Review findings you should know (do not redo the work)

- **Plan M (new, needs three different seats):** core = 845 lines / 16 files (VERIFIED); `envelope.ts` is the only
  core sport-naming site; no solver module exists. Three nits: (N1) "Owner ruling 4" is ambiguous — the 13 Nov
  batch's ruling 4 is the nine framework arms, the no-DSL defer is D18 in the master assessment; (N2) `passclass.ts`
  is at `sports/nfl/sim/`, tilt seam is `drive.ts`'s `tilt()`; (N3) plan M recommends baseball as sport two but
  `AGENTS.md` §2 records basketball post-v1.1 — the plan correctly leaves the pick to the Owner at MS-2, but say
  so when relaying it. Ernie's additional nit: `claude/NOW.md` is **16 lines** against the documented ≤15 rule
  (`claude/00-READ-FIRST.md:13`, `claude/bootstrap.sh:33`) — merge the two DONE lines. File as one inbox review.
- **v3 sitting (Pickle's review `inbox/20261119-2252-pickle-P-287-v3-sitting-review.md`):** D1 — `FIX-NOTES.md` §5's
  `patch -p1 … from the c9 subtree root` is falsified (`No file found--skip this patch?`); correct is `patch -p1`
  from the **c10 package root** or `patch -p5` from the c9 subtree root. D2/E3 — report §10.2 misclassifies
  hosted-c9 byte truth: both hosted-c9 dists are `670d4c08…` / 527,177 B; `76de5658…` / 527,162 B is the c10 copy.
  R1 — `draftBoard.ts:61` `rows.slice(0,limit).map(({_w,_p,...r})=>r)` strips raw values; needs engine-view export
  (§5 T8).
- **Peer reviews (Pickle `inbox/20261119-2327-pickle-P-287-review-of-peer-reviews.md`):** Ernie's F1/F8 falsified;
  Beam's 2300/2345 substantive conclusions hold; "52 files / CHECKSUMS 52/52" does not reproduce (51 files /
  1,765,734 B / 49 rows). No product impact.
- **Q7 comment already present** at `valueprovider.ts:22-24` — no action. Ernie's suggested comment is there.
  Only nit: mid-file aliased imports at `valueprovider.test.ts:85-86` (legal ESM, move to top if touching anyway).
- **Stale input warning:** Beam's local nflverse copy is the 12 Nov revision. If you re-run anything data-based,
  fetch fresh — the manifest is the correct input.

## 5. The work, in priority order

Each task: why · where · change · how to check · done. If a task is wrong, say so with evidence and move on.

### T1 · P-317 draft-position selector in Team Select — REQUIRED, do first
**Why.** Owner ruling 2026-11-09 (`QUEUE.md` P-317): Slice 2 is **NOT accepted as-is** — the user picks BOTH team
and draft position (slot 1-32) on Team Select, which keeps its current look. **CORrection 1:** Ernie's v4 said the
store change "is in `408410477`". That commit is docs-only — `pickSlot` was introduced at `560b8364f` (Item 6 lab
tool), 10 hits in `store.ts`, and is present at the tip. **Conclusion "T1 unblocked" is VERIFIED; the commit
attribution was wrong.** The store side is done: `START { seed, userTeam, pickSlot? }`,
`draftOrder(userTeam, pickSlot)` swaps the user's team into the chosen slot and mirrors it in the snake,
`SaveRecord.pickSlot` restores the order (`store.ts:30,58,61-74,109-110`; `saves.ts:29,80`; tests at
`store.test.ts:105-122`). Only your half remains.
**Where.** `src/lib/screens/TeamSelect.svelte` (same screen, same look, one more control) and the START dispatch in
`src/App.svelte:115` (today `store.dispatch({ type:'START', seed, userTeam })`).
**Change.** Add a slot control (1-32); keep team picker and details panel unchanged. Pass
`store.dispatch({ type:'START', seed, userTeam, pickSlot })`. Omit `pickSlot` when it equals `userTeam + 1` (store
treats `pickSlot - 1 === userTeam` as absent). Do **not** compute the order yourself — the store's `draftOrder()`
does the swap. The board's on-clock indicator, user picks and roster must all be the chosen team's.
**Check.** Draft as an early team (slot 1-3) and a late team (30-32): (a) chosen team on the clock at its slots;
(b) picks land on its roster; (c) CPU picks around it; (d) mode lock fires at START and holds; (e) save → restore
gives the same order (no `pick is out of order`). `npm run build` clean; existing battery green; new laws fail
loudly if the slot is ignored. Report both teams, slots, picks, restore receipt.
**Done.** Selector on Team Select, draft runs end-to-end at both an early and late slot, ≥2 new laws.

### T2 · One-click drafting on the ringed rows — Owner's w89 signal
**Why.** w89 drafts in one click; cakepanz takes three (expand → chip → confirm); ~32 picks → ~64 extra actions.
Owner said w89's layout is better; the ring already marks the three recommended rows.
**Where.** `src/lib/components/BoardRow.svelte` (takes `r`, `onpick`, `oddsMeta`, `suggest`; has `data-id` and
`cp-suggest` ring) and `App.svelte` (`undo()` at `:151`, `canUndo` already passed).
**Change.** When `suggest` is true, add a **"Draft {name} at {slotLabel}"** button calling `onpick(r.id, r.slotId)`
directly — no expand, chip or confirm. Keep the expand path for flex alternatives. Keep **undo** visible and one
click away; no confirm dialog. **Name the slot on the button** ("Draft at QB1") — a player fits several slots; a
bare "Draft" silently chooses one. Optional `j`/`k` + Enter only if it does not delay T1/T3.
**Check.** At pick 1 the three ringed rows show the button; clicking lands exactly one pick, counter advances by
one, CPU picks on; undo restores board order and ring; non-ringed row still expands; keyboard-only Tab/Enter with
visible focus; zero console errors.
**Done.** One click drafts a ringed row, undo reverses, expand path still works for flex, battery asserts both.

### T3 · `?seed=` + visible draft code — precondition for every deterministic check
**Why.** `App.svelte:109` uses `Math.random()`; only `?dev` is read (`:54`). Every visual measurement is a sample —
the ring's 3-vs-60 breadth is unseeded and two seats' runs disagreed at the same pick. A URL seed makes the board
replayable and paired what-if possible.
**Change.** Parse `?seed=<code>`: base-36 4-char (~1.7M states) or plain integer, validate 1…2^31-1, fall back to
random on garbage. Display the code in board footer, Complete screen, share card, next to the engine/pack pin.
Write the resolved seed into the record (store already carries `seed`). Do not change the store; no dependency.
**Check.** `?seed=A3F2` twice → identical boards (top-60 order, three ring ids, footer); displayed code equals URL
code and survives reload; save → restore keeps it; garbage seed falls back without throwing.
**Done.** Code parsed, displayed, persisted; battery asserts two loads at one seed give byte-identical boards.

### T4 · D3 a11y completion — last accessibility gap on the board
**Where.** `BoardRow.svelte`: gone% method tooltip is `role="tooltip" aria-hidden="true"`, hover-only; numeric
cells have `title` but no programmatic description.
**Change.** Give the gone% cell `aria-describedby` pointing at the method text (already in `.cp-fits`, or add a
visually-hidden description). Remove `aria-hidden="true"` from the tooltip, or keep it decorative while the
description lives elsewhere — do not leave the only copy of the method hidden from screen readers. Add
`:focus-visible` outlines to `.cp-main`, `.cp-chip`, `.cp-go`. Keep `aria-controls="cp-fit-{r.id}"` resolving
(the A8e fix — do not regress).
**Check.** a11y-tree dump names the gone% cell with its method; keyboard-only reaches every control with visible
focus; Enter expands, Enter on a chip picks; zero console errors.

### T5 · Seeded visual battery — make the measurements constants
**Why.** Three seats measured the ring by hand; a battery turns that into a gate.
**Change.** `batteries/visual.battery.mjs` (or extend existing): build, then headless at 1180×900 and 390×320 at
**fixed seeds**, assert (1) exactly 3 `.cp-suggest` rows at pick 1; (2) ring contiguous from top; (3) one-click
Draft on a ringed row lands exactly one pick; (4) no horizontal scroll at 390 (`scrollWidth <= clientWidth`);
(5) zero console errors; (6) seed code displayed and matches `?seed=`. Report PASS/FAIL per law with seed list; a
law that cannot run SKIPs loudly with its reason.
**Done.** All laws PASS or SKIP-with-reason at named seeds; no hand measurement.

### T6 · Tooling — three small things that prevent the next three defects
1. **Contrast guardrail (W5):** 32 teams × 2 modes, body text ≥4.5:1, **name the failing team**. Zero deps, ~100
   lines, in the battery. The c10 sitting left two AA holes (1.51/1.65 light gold2, 3.17 dark rose-ink).
2. **`tools/shell-status.mjs`:** measure (dist sha256 + bytes, battery results, seed line, aria count, ring ids at
   a fixed seed) and **print** `SHELL-STATUS.md` with a `GENERATED <utc> — do not edit` banner. The v3 sitting's
   three stale "byte-identical" lines are the evidence that hand-written status rots.
3. **`tools/package-delivery.sh`:** copy the previous artifact to scratch, apply your own delta, run both gates,
   compare entry counts, refuse to emit on mismatch. Three consecutive rounds had a packaging defect — a script
   makes the class extinct.

### T7 · Review the latest seat notes — one file, verdict ok/improved
Read and answer in one inbox file: `council/pickle:inbox/20261120-0235-…-ed16fd8f-verification.md` (passGap; four
rounding nits; stale-Beam-data note), `council/pickle:inbox/20261120-0245-…-aa4f9b3d-verification.md` (S1 seam),
`council/ernie:inbox/20261120-0215-ernie-passgap-verification.md` (independent re-run; θ-dependence,
schedule-fixed split-half, self-reported rule), and Pickle's plan-M review
`council/pickle:inbox/20261120-0235-…-408410477-plan-M-review.md`. Say where you agree, where you would add a
check, whether any changes your build. Do not re-run passGap unless you find a reason; if you do, fetch fresh.

### T8 · File the ring request — blocked on the Architect, but file it now
One inbox note naming: root cause `draftBoard.ts:61` (`rows.slice(0,limit).map(({_w,_p,...r})=>r)` strips raw
values before the VM ships, `:53` sorts on them); component parse
`DraftBoard.svelte:38-47` (`Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0`); the two candidate
contracts — Pickle's `suggestions: { ids, rankedBy, cutoffRaw, reason }` from the engine view, or one generic
`rawSort` on `BoardRowVM`; which you would build against and why; and what the view needs to render the ring as
**advice** rather than decoration. The fix itself stays the Architect's.

## 6. Delivery format (for chat-only / sandbox work)

One zip `zai-sitting-2026-11-20-<slug>.zip`: `README.md` (one page), `CHECKSUMS.txt` (md5 + path, macOS `md5 -q`),
`deliverables/` with `sitting-report-2026-11-20.md` (10 sections: what I did · verified with raw output · built
file-by-file with diffs · did not do and why · found that changes the plan · Owner must do · Architect must do ·
could not verify (UNKNOWN) and why · next sitting's first three items · zip's own checksums),
`batteries/visual.battery.mjs` + output log, `tools/shell-status.mjs` + sample, `tools/package-delivery.sh`,
`inbox/…` (T7 review, T8 ring request), and changed source files with paths. Rules: `unzip -t` clean,
`md5 -c CHECKSUMS.txt` clean, all paths relative, no images, no product build copies. If you have push, substitute
pushed commit hash + `git ls-remote` line for the zip.

## 7. What NOT to do / kill criteria

1. No engine edits (`colors/src/**` is the Architect's); no product HTML; no pins or protected constants; no
   other seat's lane or shared tree.
2. No re-cut of c10, no manifest regeneration — the c10 repair is one file; manifests are correct once it lands.
3. No push if you have no credentials (it hangs); no force-push, no stash, no `git add -A`.
4. No per-game historical tuning; λ stays 0, GLM off. Do not start ratings→gap or context-aware provider — post-cutover.
5. Do not re-run item-5/item-6, vapor experiment, pairing arithmetic, or hand-measure C′1 ring a fourth time.
6. No unseeded before/after outcomes; no "I believe it works" without command + output.
7. Network git: 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most twice.
8. End with `node tools/preserve.mjs check`; if it flags peer worktrees, leave them untouched.

## 8. Exact paths and commands

- Store: `origin/architect/engine-and-seats:colors/src/sports/nfl/app/store.ts` (`draftOrder` at `:66`),
  `saves.ts:29,80`, `test/nfl/store.test.ts:105-122`.
- Ring root: `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts:53,61`;
  component `:…/src/lib/components/DraftBoard.svelte:38-47`.
- c10 App: `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/App.svelte`.
- First commands: `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q origin` ·
  `git show origin/council/muse:_agents/QUEUE.md | head -40` · `node tools/council.mjs next` ·
  `git show origin/architect/engine-and-seats:claude/NOW.md` ·
  `git show origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md`.
- Gates: `cd colors && npm ci && npm test` (430/430) · `npm run tsc:check` (89/89) ·
  `node --test --experimental-strip-types test/core/*.test.ts test/nfl/purity.test.ts` · `node tools/ci/canary.mjs`
  (not re-run by Pickle — report as such) · byte checks `sha256sum`/`wc -c`/`shasum -a 256 -c SHA256SUMS.txt`.

## 9. Corrections made in this merge

1. **Ernie v4:** "the store change he was waiting on is in `408410477`" → `408410477` is docs-only (2 files,
   +65/−0). `pickSlot` first appeared at `560b8364f` and is present at the tip (10 hits in `store.ts`). T1
   unblocked stands; the commit attribution was corrected.
2. **Pickle v1:** ranked P-316 first and P-317 third → `QUEUE.md` P-317 says Slice 2 is **not accepted** until the
   selector works end-to-end, so T1 is required-first; T2–T6 from Ernie's cards follow.
3. **Pickle v1:** wrote "Svelte 5 + Vite" → Owner ruling 2026-11-19 makes it **Svelte 5 + Vite 8, FINAL** (R-13
   closed); published slice still shows `vite ^7.3.6`, so new work should align to 8.
4. **Added Ernie's nit:** `NOW.md` is 16 lines vs the documented ≤15 rule (`00-READ-FIRST.md:13`, `bootstrap.sh:33`).

## 10. Blocked items and owners

| blocked on | what you do |
|---|---|
| C′1 raw-key / `suggestions` export | file T8; build view side ready for either contract; do not fake it with rounded parse — **Architect** owns fix |
| c10 landing on inkling/orcaink (48/49) | nothing — Owner lands it; say so in report |
| doc fixes + three md5 lines | nothing — Owner lands them; do not regenerate manifests |
| ratings→gap; context-aware provider | nothing — post-cutover, Architect |

*Receipts for every VERIFIED claim are on `council/pickle` and `council/ernie` in the inbox files named above;
all pushed and confirmed with `git ls-remote`.*
