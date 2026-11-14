# Z.AI — continuation prompt: 67 Cakepanz, the held rows, and the dynamic engine
**From:** ERNIE (council advisor), relayed by the Owner · **Date:** 2026-11-14 · **Version:** 2
**Read this whole file before you run anything.** It is long on purpose: it is the handover, the
corrections, the closure checklist, and the queue, in one place, so you do not have to reconstruct it
from twelve branches.

---

## 0 · Orientation (do this first)

1. `git fetch -q origin` then the step-0 checkout in `START-HERE` §1 (four governance docs from
   `origin/council/muse`).
2. Read `AGENTS.md` §1–§5 and `_agents/README.md`. Nothing below overrides them.
3. **Your push credentials do not work.** `council/zai` is at `25e3b2f` (2026-11-01) and your last
   pushes failed with `could not read Username for 'https://github.com'`. That is expected for your
   seat and it is not a blocker: **build in your sandbox, then hand the Owner the folder** and a seat
   with credentials (ERNIE has done this three times) will vendor it byte-exact with a manifest.
   Do not try to fix git auth. Do not re-clone.
4. Your v3 delivery and the recovery are already on remotes, verified by three seats:
   - `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/` @ `council/ernie` `ddddd600` — 256 files,
     MANIFEST **255/255 verified**.
   - `_agents/ernie/deliveries/zai-recovery-2026-11-14/` @ `council/ernie` `d190e192` — 22 files,
     MANIFEST **20/20 verified**. Also published at repo root on `council/inkling` (`e79e7693`) and
     `_agents/glyph/deliveries/` (`d3271ff1`). Same bytes, three locations.
5. **You do not need to re-ship either.** They are on remotes and they verify.

---

## 1 · What closed since you shipped — do not redo

- **The vendor digest is fully closed.** All four digests reproduced with your algorithm:

  | Root | File set | Digest |
  |---|---|---|
  | `colors/` @ `d3bd81d2` | all 112 | `432a1701…195e272d` |
  | `colors/` @ `d3bd81d2` | `src/**` (57), prefix kept | `753997ba…0ba08aa0b` |
  | `<arm>/src-bench/engine` | all 57 | `4c3c8f17…511e428923` |
  | `colors/` @ `4ca9a071` | all 103 | `fef700c7…a31191fcb` |

  `cd298e99` is dead. `753997ba` is **retired as a mystery** — it was the 57-file `src/` subset with
  the `src/` prefix retained, root = `colors/`. INKLING marked it UNKNOWN, I reproduced it, they
  re-derived it, their packet now carries the correction. **Your `vendor-digest.mjs` is the algorithm
  of record.** The rule everyone follows: a digest without its root is not a receipt.
- **The errata re-adjudication stands.** I recomputed min/median/max and `recSha 7af4b773…` from your
  raw `ms` arrays in `errata/` — all correct, record sha identical across all three files, no tail over
  1 s in 40 samples. Your conclusion (the run-1 tail is a host event, not a workload property) holds.
- **`a3.json` is a real receipt.** Node ≡ Chromium field-by-field; Firefox/WebKit failures recorded
  verbatim. "chromium-identical" is the correct ceiling and you stated it.
- **Offline works.** I re-ran it twice on my own machine (Chromium 1.65, not your 1.57), both arms,
  once clicking the real PICK button and once through `__bench.pickById`. Boots, plays, 0 console
  errors, 0 blocked requests. Your `closeBundle` recipe is the recipe.

---

## 2 · Four items from my review of v3 — still open, all cheap

1. **`tier1-run1/2/3.json` and `tier1-smoke.json` are in neither delivery.** They are the errata
   table's stated primary sources. The conclusion is checkable from the `ms` arrays, but the source rows
   are not there. Ship them or say in one line that they were not packaged.
2. **`analyze.mjs` and `a3.mjs` are in neither delivery**, yet your REPORT's defect ledger describes
   syntax errors found in them. That row is unverifiable as written. Either ship them or narrow the row
   to "defect found in a driver that was not packaged."
3. **E1 "achievements as data, data-file-only"** — no achievement data file exists in either delivery,
   and the engine has no evaluator (only `Achievement {id,label,at,team}` in
   `sports/nfl/app/profile.ts`). Claude's plan puts a predicate language at Phase 3. Until then,
   re-label E1 as **REPORTED — harness not included**, or ship the data file.
4. **REPORT says "30 fresh samples"** where the receipts hold **40** (10 cold + 10 gc + 20 warm). The
   conclusion is right; the number is wrong. Fix the row.

---

## 1.5 · Four loose ends from v3 that only you can close

These are small and they stop the digest carrying claims nobody can check. Do them in this sitting if
you can.

**a. The sveltekit cell.** Your own logs carry both **"5 passed (2.1s)"** (primary) and **"4 failed,
1 passed (1.1m)"** (sibling run). Either isolate the flake in one line — what you changed, if anything
— or file it **RECORDED-OPEN** with your honest current belief and stop speculating about it. Do not
leave both numbers in circulation; that is how a flake becomes a rumour.

**b. `OK: 751` vs 753 listed.** `CHECKSUMS` was generated from frozen bytes, and the v3 package has
now been extracted twice independently. Say what the 2-entry delta was, once, and close it.

**c. The Phase-J pilot log.** Your REPORT references *"log in the zip"* for the 7 defects / 10 repair
cycles. Either ship it in-repo or strike the reference. A citation to a file nobody can open is worse
than no citation.

**d. Firefox / WebKit.** If the executables still are not present in your environment, record the
failure verbatim again and **stop asking root for them**. A3 stays **chromium-identical** in all future
prose. Nobody may cite multi-engine evidence from this wave, including you.

**e. Do not re-pin.** Re-verify the v3 arms and the recovery package against the **current**
`colors/src` tip. If the tip moved, **report the delta** — do not re-pin, and do not edit the engine.

---

## 2.5 · Two rules that keep the record clean

- **No new P-IDs.** File proposals as inbox files with a `PRIORITY+:` line. The queue is MUSE's to
  edit; a seat that opens a new ID creates a parallel list, and parallel lists are how work gets lost.
- **The decimal display rule** (Owner): **integers everywhere on the board and site, except Wins and
  Priority, which allow one decimal.** Read values from the engine; never hard-code.

---

## 3 · Claude has landed a plan, and it changes what you should build next

Claude pushed **engine plan v3** at `architect/engine-and-seats` **`0364013`** (4 files, docs only; no
product code, no dependency, no save format, no framework changed). Read it — it is the sequencing
everything else now hangs off:

```
git show 0364013:tools/mathlab/results/engine-plan-v3-2026-11-14.md
```

**What matters to you specifically:**

- **P-318 lands first**, as a `ValueProvider` seam. Claude is removing `SLOTS[].weight` from the loop
  so `slotWins20` drives the draft and the lineup. Until it lands, **`draft.ts`, `lineup.ts`,
  `slots.ts`, `value.ts` are his lane and nobody else's.** Do not send patches at those four files.
- **All six of Claude's questions are answered yes. No new gates anywhere** — the two red tests stay
  de-gated. That means **no CI gate will catch a regression for you.** Your own checks are the only
  ones. Budget for that.
- **Title Odds is approved as a post-cutover design pitch**, not part of the cutover bar.
- **The framework ruling is still OPEN.** Owner, 2026-11-12: *Svelte is not a lock.* Claude recommends
  Vue 3 + Vite at **LOW confidence**; you have said you prefer Svelte 5. Neither is decided. **Structure
  your next work so it is not wasted if the ruling goes the other way** — the engine contract you
  consume is framework-neutral, and that is the part worth keeping framework-free. Do not present either
  as decided in any artifact.

---

## 4 · 67 Cakepanz: what to build, in order

Current state: **Slice 1 (Draft Board) and Slice 2 (Team Select) built**, 284/284 engine tests pass in
tree, slice battery 26 pass / 0 fail / 10 loud SKIP. Slices 3, 4, 5 remain.

### 4.1 Slice 2 revision — BLOCKED, and the block is not yours

The Owner ruled Slice 2 is **not accepted as-is**: the user must pick **both** their team **and** their
draft position (slot 1–32) on Team Select, same screen, same look.

- **Claude's half** (P-317): accept a slot in `START`, build a custom order, pass it to `newDraft`
  (which already takes an `order` parameter), and **persist the slot in `SaveRecord`** — otherwise
  restore throws `pick is out of order`.
- **Your half**: add the slot picker to Team Select and pass the chosen slot through `START`.

**Write the exact spec now** — files, store contract, restore behaviour, seed-order interaction,
accessibility, the slot = the user's original pick slot UX — and mark every assumed line **INFERRED**
where the store contract is not yet landed. **Do not merge a UI against an unlanded store contract.**
When Claude's change lands, file your revision as a review separate from his (the queue asks for both).

### 4.2 Slice 3 — UNBLOCKED, and the Owner encourages you to build it next

P-316. Hydration + board chrome:
1. **The gone-odds tooltip** — "between now and my next pick", **explaining its method** on hover. The
   engine already computes it; the shell has never told the user. This is the cheapest high-value thing
   in the whole slice. Ground the method text in the actual computation; do not invent math.
2. **The "my needs" sticky row** — which of my 32 slots are still open, clickable to filter.

The queue says explicitly: **Slice 3 does not depend on the Slice 2 revision.** Build it. Keep the
snapshot byte-identical to the pin (`4ca9a071`), run the battery and boundaries checks as in prior
slices, and file the delivery plus a review request.

### 4.3 When P-317 lands — the deeper check (P-315)

Do not stop at "the picker renders." Draft several rounds as a chosen team — **both an early-pick and a
late-pick team** — and confirm: the chosen team is on the clock at its slots; the picks land on its
roster; the CPU picks correctly around it; the mode lock holds across the whole draft. **Receipt per
round.** That is the test that proves P-317 works rather than that it draws.

### 4.4 Slices 4 and 5 — later, with one-paragraph briefs now

- **Slice 4 (feed):** what the engine already exposes (`FeedEvent` union, drive-level), what you would
  have to mock, what you would refuse to ship.
- **Slice 5 (shareables):** your `receipts/brag-card.html` is already a working, self-contained,
  offline-openable card — I opened it from `file://`, 0 errors, 0 external refs, fonts embedded as data
  URIs. **That is a strong head start on Slice 5 and you should say so in the slice README.**

**Do not start Slice 4 or 5 ahead of the items above.**

### 4.5 P-324 — w88: position values in WINS, not weights

The Owner wants the position values shown as **WINS**, not the engine's measured weights (QB 1000 …
FB 25). **Correction already on the record:** the Wins are the **NEW P-321 measurement** (per-position
local slope at ±5, pool centres, slope × 20), **not** `slotWins20`. The exact table is in
`_agents/muse/deliveries/prompts-2026-11-05/zai-w88-wins-2026-11-09.md` (council/muse `a5ecc25e`,
computed by MUSE on the Colors engine). **Read that file before you touch w88.** Keep slope × 20 at
±5 — the ±10 form reproduces the old `slotWins20` for moved slots and will silently undo the
correction.

### 4.6 Drift check on what you already shipped

Is any part of `67-cakepanz/` on `gh-pages` **not** byte-identical to `colors/src` where it vendors the
engine? Flag every drift file you find, with a `diff -rq` or `cmp` receipt. Do not fix drift by editing
the engine.

---

## 5 · The held rows — what they are and who owns the fix

The ratification packet holds three UX rows and one SAVE row. **None of them is your bug, and none of
them is a framework result.**

| Row | Measured | Why held | Whose fix |
|---|---|---|---|
| **UX-1 / UX-2** | `goneOdds` sort r1-u0 ≈ 1,215 ms desktop, ≈ 8,900 ms at 6× throttle | Engine-bound: 30 sims × 62 CPU picks × `cpuChoose` | **Claude** — his plan §3.6 |
| **UX-3** | select → roster panel p95 ≈ 64 ms vs a 50 ms budget | Same cost class; probably `selectRoster` → the lineup solver | **Claude** (INFERRED, not yet read) |
| **SAVE-1** | record size measured; **write median not measured** | Not measured in your BENCH-1 delivery | **You** — one measurement, cheap |

**On UX-1/2/3: do not re-measure them and do not re-open them.** Claude has already diagnosed the
mechanism in code — `goneodds.ts:15-29` runs `for (s < 30) for (i < picks-until-your-next-turn)` with a
`cpuChoose` each time, so r1-u0 is 30 × 62 = 1,860 calls at ≈0.65 ms each. That is the answer, and a
second measurement from you would be worse than the one already on the record.

**What I do need from you: the SAVE-1 write median.** One number. Your record-size row is fine; the
write-median cell is empty and the packet says so. That is the one held row you can close yourself.

**And one thing I need you not to do:** do not present any of these as framework findings anywhere.
They are engine costs that surface in a UI. The fix is in `goneodds.ts` / `selectRoster`, not in Svelte
or Vue.

---

## 6 · The dynamic engine — the biggest open thing, and you are already in it

The Owner's rulings are in the record verbatim:
`_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt` and
`…-dynamic-engine-verdicts-verbatim.txt`, both on `origin/council/muse`. **Read both before you propose
anything about the engine.** The short version:

- The **0.20-vs-0.40 binary is dead.** Not "which number" — *"Every structure of the engine
  should/could fluctuate."*
- **Twelve items ruled on:** slot values (APPROVED, matchup-aware, plus a **new offensive-focus-per-game
  feature** to broadcast); flex prices (**REJECTED** — stay consistent all season); drive params
  (APPROVED); home-field (APPROVED, find playoff data); form (**APPROVED**, ±5–6/season, **no injuries
  ever**); group synergies (APPROVED); gravity/double-teams (APPROVED, **surface in Advanced Stats**);
  calibration targets (**static**, not a dynamic item); clutch/game state (APPROVED, **better clutch
  visuals — the Owner names you specifically**); variance (only with good reason); draft slot value
  (**MOOT**); cross-side stars (APPROVED in theory, −6, clutch/OT, "2-WAY" visual).
- **Your three-axis programme is the method of record.**
  `zai-fwtest7-…/partb-emerge-spec/three-axis-testing-programme.md` — GLM's rule adopted verbatim, two
  axes' real-data halves run.
- **A correction that lands on your own numbers:** the playoff home-advantage cut (5.57 vs 1.78) is
  **not strength-controlled** — I read `d8_data_cuts.py` and it is a raw margin by `season_type`.
  Playoff home teams are the higher seeds, so venue and team quality are mixed. **Do not cite
  5.57 vs 1.78 anywhere until it is controlled.** It goes into L2 with the control and you report what
  survives. If it dies, it dies as a recorded result — that is a finding, not a failure.
- **Axis (c) — key-player presence — is yours and it is the named gap.** You filed it as needing the
  player-game join. Claude agrees: one join answers both (c) and the λ estimation. If you build that
  join, you unblock the single most-cited missing piece in the whole dynamic thread.
- **Claude has answered the Owner's "what else is static?" question with eight candidate axes. GLM
  answered with six. You have D.1–D.9 and PD.1–PD.7.** Nobody has compared the three lists. File the
  differences: where you have an axis nobody else has, and where you think someone else's axis is not
  measurable with 2016–2025 participation and play-by-play. That is worth more than another green test
  row.

---

## 7 · Measurement discipline (the house rules, restated because they keep costing us)

1. **Four lines per claim:** cwd · exact command · ref@sha · output (exit codes, counts, hashes).
   "Exit 0" alone is not a receipt.
2. **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`. Never a moving checkout.
3. **Label everything:** VERIFIED (you ran it, receipt in the text) · REPORTED (someone else says so) ·
   INFERRED (reasoned, not run) · UNKNOWN. "No signal" is a result.
4. **No rankings, no winners, no eliminations** — not of frameworks, not of seats, not of approaches.
   You measure; the digest is INKLING's; the decisions are the Owner's and Claude's.
5. **A manifest is not a measurement.** Recompute every hash yourself, from bytes, before you cite it.
   `shasum -c` mis-parses a 3-field manifest — I hit that twice this week.
6. **Withdraw your own errors in writing, on your own filing.** You did this in the recovery note
   (*"my packaging `cp` read from `scratch/bench1/receipts/`; the failure was silenced by `2>/dev/null`"*)
   and it was the best paragraph in either delivery. Keep doing that.

---

## 8 · What not to do

- **Do not edit the engine, `colors/`, or any seat's branch.** Claude owns the engine and the product
  file. You are the Executor/UI builder: you build the shell, you measure, you propose.
- **Do not touch `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`** until P-318 lands.
- **Do not re-rank the nine arms or re-open the framework question.** It is the Owner's, it is open, and
  another table will not close it.
- **Do not re-measure settled things:** goldens, contract identity, byte-identity, manifest counts, the
  four digests, the 30-vs-40 sample count. Those are identity receipts; they are done.
- **Do not build basketball, the platform UI, or the simulation-designer.** Not yet, by ruling.
- **Do not treat weights as a fit target.** The weights table is retired; measured engine value is the
  source of truth.
- **Do not propose injuries, or per-player clutch ratings.** The Owner ruled both out explicitly.

---

## 9 · Priority order — what I would do with your next sitting

1. **Slice 3** (P-316). Unblocked, Owner-encouraged, and the gone-odds tooltip is the single most
   user-visible thing left in the shell.
2. **The player-game join for axis (c)** (P-345). Highest leverage in the dynamic thread; nobody else
   has built it; it also feeds Claude's λ estimation.
3. **The SAVE-1 write median.** One number, closes a held row, takes an hour.
4. **The eight closure items** — §2 (four) and §1.5 (four). All cheap, and they stop the digest
   carrying claims nobody can check.
5. **The axis-list comparison in §6** — where your dynamic axes differ from Claude's eight and GLM's
   six.
6. **Slice 2 revision** — only when Claude's `SaveRecord` change lands. Then the P-315 deep check.
7. **w88 (P-324)** — read the MUSE table first, and watch the ±10 trap.

**Slices 4 and 5 are later. Do not start them ahead of the above.**

---

## 10 · Two things to know about the people you are working with

- **Claude corrected four of my claims this week** — a confounded playoff number, my goneOdds
  attribution, the pool arithmetic, my re-pin assumption. Each with a file and a line. He reads closely
  and he is right. If your measurement disagrees with his code, **bring a command**; he will check it
  and concede on the record. That is the whole protocol.
- **INKLING publishes your work for you when your push fails, and says so.** Their recovery review
  credits your packaging note by name. When they or I vendor a folder, the bytes are verified against
  your manifest before commit — you are not being silently edited.

**File your work as `inbox/<UTC>-zai-<slug>.md` on your branch if you can push; otherwise hand the
Owner the folder with a `MANIFEST.txt` and a one-line note, and it will be vendored byte-exact.**

---

## 11 · What a good next delivery looks like

```
SPEAKER: zai | ROLE: executor | TASK: <task> | DATE: <UTC>
FOR: <P-id or topic>
PIN: <engine pin(s) used> · BASE: <commit/branch> · ENV: <node, os>

VERIFIED:
- <command> -> <key output / hash / count>

REPORTED:
- <claim + source + why not re-run>

FINDINGS / IDEAS:
- <numbered, specific, falsifiable where possible>

FILES:
- <paths added, seat-owned only> + MANIFEST.txt reference
```

— ERNIE (council advisor) · 2026-11-14 · relayed by the Owner