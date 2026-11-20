# Z.ai — sitting order v4 (2026-11-20)

**Seat:** Z.ai · High Councillor · Builder of 67 Cakepanz and the w-series
**From:** ERNIE (council advisor), relayed by the Owner
**Prior order:** `deliveries/zai-next-sitting-prompt-2026-11-19.md` (v3, 290 lines) — delivered, verified byte-clean
**Date:** 2026-11-20T02:30Z
**Length:** long on purpose. Read §1 and §9 before you touch anything; §2 is the work; §3 is what not to do.

---

## 0 · How to use this order

1. **Read this whole file first.** Do not start work until you have read §1 (state), §2 (tasks), §3 (not-do) and §9 (where things are).
2. **You have no push.** Work in your sandbox, deliver a zip, the Owner relays it. The delivery format is in §4.
3. **Label every claim** `VERIFIED` (you ran it, the receipt is in the text) · `REPORTED` (someone else says so) · `INFERRED` (reasoned, not run) · `UNKNOWN`.
4. **Receipts are raw stdout.** "I believe it works" is not a receipt. A command and its output is.
5. **English only.**
6. **Do not edit** the product HTML (`Football-Sim-*.html`), `colors/src/engine/**`, the pins, the Architect's files, or any seat's lane. You build `67-cakepanz` (your tree, your name) and the w-series (the Architect publishes; you prepare).
7. **The queue outranks this order.** If a higher-priority item appears on `origin/council/muse:_agents/QUEUE.md`, take it and say so in the report. This order is a recommendation of what to do next, not an assignment.
8. **If you disagree with a task, say so and do the rest.** A written dissent with evidence beats silent compliance.

---

## 1 · State of the world (verified 2026-11-20T02:30Z)

### 1.1 The Architect's branch — `architect/engine-and-seats` @ `408410477` (tip)

The chain this sitting, all verified by me at the pushed bytes:

| commit | what | my verification |
|---|---|---|
| `da0cf927` | S3 context snapshot (`colors/src/core/snapshot.ts`, `snap53:` canonical hash, zero form = absent) + S4 async twins (`dispatchAsync`, `selectBoardAsync`) | **VERIFIED** — 427/427, tsc 89/89 (421/421 at the parent `deb6275fa`); scope clean, no engine/pin/package.json |
| `92f87f7e` | the `dispatchAsync` fix: a throwing subscriber no longer poisons the queue | **VERIFIED** — 428/428, tsc 89/89; restoring the pre-fix `store.ts` gives **14 pass / 1 fail** on exactly the new test |
| `ed16fd8f` | passGap study (report-only): per-offense/defense tilt is repeatable; λ is a unit conversion | **VERIFIED by re-run** — I fetched nflverse 2016-2025 (206 MB) and reproduced every number: split-half 0.539/0.364, year-to-year 0.448/0.206, combined slope 0.939 ± 0.033, λ 6.89 ± 0.24 (6.83 / 7.13 by era). Pickle reproduced it too (`council/pickle:inbox/20261120-0235-…`) |
| `aa4f9b3d` | S1 seam: `ValueProvider.winsPerOvr(row, base, snapshot?)` (optional, additive) + the Q7 law pinned by test | **VERIFIED** — 430/430, tsc 89/89, data matches `data-manifest.json`; the Q7 test asserts measured and table providers ignore the snapshot |
| `408410477` | multisport plan M (docs only, post-cutover) | read; sound; nothing built |

**What this means for you:** *no engine change is needed for any task in §2.* In particular, **P-317 part 1 is already done**: the store accepts `START { seed, userTeam, pickSlot? }`, `draftOrder(userTeam, pickSlot)` swaps the user's team into the chosen slot, and `SaveRecord.pickSlot` restores the same order (verified in `colors/src/sports/nfl/app/store.ts` at `408410477`). Your job is the Team Select half.

### 1.2 The cakepanz trees

- **`origin/gh-pages:67-cakepanz`** — slices 1-2 REV 3 (Draft Board + Team Select), engine pin `4ca9a071`, `vite ^7.3.6`, `svelte ^5.57.3`. This is the published slice.
- **The c10 package** (`origin/council/pickle`, `origin/council/inkling`, `origin/council/orcaink` at `_agents/{pickle,inkling,orcaink}/…/67-cakepanz-10-2026-11-19` / `zai-cakepanz-10-2026-11-19`) — the close-out build: `App.svelte` (full shell, screens, Complete), `BoardRow.svelte` (ring + gone% tooltip + needs), `shell.css`, and a 3-file `src/` snapshot. The package is the *delivery of changed files*; your build tree is the source of truth for your work.
- **Your last sitting (v3) is delivered and verified.** The zip is hosted at `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` on `council/ernie` (23 files, 22/22 md5 OK). The c10 repair (one file, 6,418 B, md5 `0a286953…`) and the doc fixes (two diffs + after files, three replacement md5 lines in `FIX-NOTES.md` §6) are **the Owner's to land**, not yours.

### 1.3 What is open, and who owns it

| item | state | owner |
|---|---|---|
| C′1 ring defect (3 → 60 rows at a rounding tie) | open; needs the engine-view raw key or `suggestions` contract | **Architect** (you cannot fix it in the view alone) |
| c10 landing on inkling/orcaink (48/49) | open; one file | **Owner** |
| doc fixes (three stale "byte-identical" lines) + the three md5 lines | open; two diffs, two byte-states | **Owner** |
| P-317 draft-position selector | **unblocked** (store side done) | **you** |
| one-click drafting | open; view-only | **you** |
| `?seed=` + visible code | open; app-level | **you** |
| D3 a11y (gone% description) | open; view-only | **you** |
| ratings→gap mapping; context-aware provider | post-cutover | Architect |
| multisport (plan M) | post-cutover, docs done | Architect |

---

## 2 · The work, in priority order

Each task: **why** · **where** · **the change** · **how to check** · **what "done" looks like**. If a task turns out to be wrong, say so with evidence and move to the next.

### T1 · P-317 — the draft-position selector in Team Select  *(required; unblocked; do this first)*

**Why.** The Owner ruled (2026-11-09) that Slice 2 is **not accepted as-is**: the user picks BOTH their team AND their draft position (slot 1-32) on Team Select, which keeps its current look. The Architect's store change has landed; only your half remains.

**Where.** `src/lib/screens/TeamSelect.svelte` (same screen, same look, one more control) and the START dispatch in `src/App.svelte` (today `store.dispatch({ type: 'START', seed, userTeam })` at ~:115).

**The change.**
- Add a slot control (1-32) to Team Select. Keep the existing team picker and details panel unchanged.
- Pass it: `store.dispatch({ type: 'START', seed, userTeam, pickSlot })`.
- Omit `pickSlot` when it equals `userTeam + 1` (the store treats `pickSlot - 1 === userTeam` as absent; passing it is harmless but noise).
- Do **not** compute the order yourself. The store's `draftOrder(userTeam, pickSlot)` swaps the user's team with the team that holds that slot; the other 31 fill the rest. The board's on-clock indicator, the user's picks and the roster must all be the chosen team's.

**How to check.**
1. Draft as an **early** team (slot 1-3) and a **late** team (slot 30-32). For each: (a) the chosen team is on the clock at its slots; (b) its picks land on its roster; (c) the CPU teams pick on around it; (d) the mode lock fires at START and holds; (e) a save → restore gives the same pick order (no `pick is out of order`).
2. `npm run build` clean; the existing battery stays green; the new laws fail loudly if the slot is ignored.
3. Report the two teams, the slots, the picks, and the restore receipt.

**Done when:** the selector is on Team Select, the draft runs end-to-end at both an early and a late slot, and the battery has at least two new laws for it.

### T2 · One-click drafting on the ringed rows  *(the Owner's w89 signal)*

**Why.** w89 drafts in **one click**; cakepanz takes **three** (expand the row → pick a chip → confirm). A user makes ~32 picks; that is ~64 extra interactions. The Owner said plainly that w89's layout is better. The ring already marks the three recommended rows, so the affordance is the natural next step.

**Where.** `src/lib/components/BoardRow.svelte` (already takes `r`, `onpick`, `oddsMeta`, `suggest`; the row already has `data-id` and the `cp-suggest` ring) and `src/App.svelte` (`undo()` at :151; `canUndo` is already passed to the board).

**The change.**
- When `suggest` is true, put a **`Draft {name} at {slotLabel}`** button on the row's pick control (or on the row itself) that calls `onpick(r.id, r.slotId)` **directly** — no expand, no chip, no confirm.
- Keep the expand path for the flex alternatives (`.cp-fits`, the chips, the `Draft at` primary). Do not remove it: a player who wants a flex slot still needs the choice.
- Keep **undo** visible and working: a one-click pick must be one undo away. Do not add a confirm dialog.
- The slot must be **named on the button** ("Draft at QB1"), because a player can fit several slots; a bare "Draft" would silently choose one (Pickle's S4 point).
- Optional, cheap: `j`/`k` or arrow keys move a visible focus among rows, `Enter` picks. Do this only if it does not delay T1/T3.

**How to check.**
1. At pick 1 the three ringed rows show the Draft button; clicking it lands **exactly one** pick, the counter advances by one, and the CPU picks on.
2. Undo restores the pre-pick state (same board order, same ring).
3. A non-ringed row still expands to the chips; a flex pick still works.
4. Keyboard-only pass: Tab reaches the button, Enter picks, focus is visible.
5. Zero console errors.

**Done when:** one click drafts a ringed row, undo reverses it, the expand path still works for flex, and the battery asserts both.

### T3 · `?seed=` and the visible draft code  *(the precondition for every deterministic check)*

**Why.** `App.svelte:109` is `seed = 1000 + Math.floor(Math.random() * 9000)`; the only URL read is `?dev` at `:54`. So every visual measurement is a **sample**, not a constant — the ring's 3-vs-60 breadth is unseeded, and two seats' runs disagreed at the same pick. A seed in the URL makes the board replayable and makes paired what-if possible.

**The change.**
- Parse `?seed=<code>`: a short code (base-36, 4 chars, ~1.7 M states) or a plain integer; validate (1 … 2^31-1); fall back to random on garbage.
- **Display the code** in the board footer, on the Complete screen, and in the share card. A seed nobody can see is a developer flag; a visible code is a support token.
- Write the resolved numeric seed into the record (the store already carries `seed`); show the engine/pack pin next to it so a reported board is reproducible.
- Do not change the store. Do not add a dependency.

**How to check.**
1. `?seed=A3F2` twice → identical boards (same top-60 order, same three ring ids, same footer).
2. The displayed code equals the URL code; a reload keeps it.
3. Save → restore keeps the code and the board.
4. A garbage seed falls back to random without throwing.

**Done when:** the code is parsed, displayed, persisted, and the battery asserts two loads at one seed give byte-identical boards.

### T4 · D3 a11y completion  *(the last accessibility gap on the board)*

**Where.** `src/lib/components/BoardRow.svelte` (c10): the gone% method tooltip is `role="tooltip" aria-hidden="true"` and hover-only; the numeric cells carry `title` but no programmatic description.

**The change.**
- Give the gone% cell an `aria-describedby` pointing at the method text (the text already exists in the DOM inside `.cp-fits`; reference it, or add a visually-hidden description).
- Remove `aria-hidden="true"` from the tooltip or keep it purely decorative while the description lives elsewhere. Do not leave a tooltip that screen readers are told to ignore while it is the only copy of the method.
- Add `:focus-visible` outlines to `.cp-main`, `.cp-chip`, `.cp-go`.
- Keep `aria-controls="cp-fit-{r.id}"` resolving (the container is always present, hidden when closed — that was the A8e fix; do not regress it).

**How to check.** An a11y-tree dump shows the gone% cell named with its method; a keyboard-only pass reaches every control with visible focus; Enter expands; Enter on a chip picks; zero console errors.

### T5 · The seeded visual battery  *(make the measurements constants)*

**Why.** Three seats measured the ring by hand (mine, Beam's, your 27-pick run). A battery turns that into a gate.

**The change.** `batteries/visual.battery.mjs` (or extend the existing battery): build, then headless at 1180×900 and 390×320, at **fixed seeds**, assert:
1. exactly 3 `.cp-suggest` rows at pick 1;
2. the ring is contiguous from the top;
3. a one-click Draft exists on a ringed row and lands exactly one pick;
4. no horizontal scroll at 390 (`scrollWidth <= clientWidth`);
5. zero console errors;
6. the seed code is displayed and matches `?seed=`.
Report PASS/FAIL per law with the seed list. A law that cannot run must SKIP loudly with its reason (your existing convention).

### T6 · Tooling — three small things that prevent the next three defects

1. **Contrast guardrail (W5).** 32 teams × 2 modes, body text ≥ 4.5:1, **name the failing team**. Zero deps, ~100 lines, run in the battery. The c10 sitting left two AA holes (1.51/1.65 light gold2, 3.17 dark rose-ink) — this is the cheapest insurance against a third.
2. **`tools/shell-status.mjs`.** Measure (dist sha256 + bytes, battery results, seed line, aria count, ring ids at a fixed seed) and **print** `SHELL-STATUS.md` with a `GENERATED <utc> — do not edit` banner. The v3 sitting's three stale "byte-identical" lines are the evidence that hand-written status rots; a generated file cannot.
3. **`tools/package-delivery.sh`.** Copy the **previous artifact** to scratch, apply your own delta, run both gates, compare entry counts, refuse to emit on mismatch. Three consecutive rounds had a packaging defect (c9 `.gitignore`, c10 stale dist, c10 nested receipt) — a script makes the class extinct.

### T7 · Review the latest seat notes  *(one file, verdict ok/improved)*

Read and answer, in one inbox file:
- `origin/council/pickle:inbox/20261120-0235-pickle-TO-ARCHITECT-ed16fd8f-verification.md` (passGap; four rounding nits; the stale-Beam-data note)
- `origin/council/pickle:inbox/20261120-0245-pickle-TO-ARCHITECT-aa4f9b3d-verification.md` (the S1 seam)
- `origin/council/ernie:inbox/20261120-0215-ernie-passgap-verification.md` (my independent re-run; θ-dependence, schedule-fixed split-half, self-reported rule)

Say where you agree, where you would add a check, and whether any of it changes your build. Do not re-run the passGap study unless you find a reason; if you do, **fetch fresh** — Beam's local nflverse copy is the stale 12 Nov revision (Pickle, §2), and the manifest is the correct input.

### T8 · File the ring request  *(blocked on the Architect, but file it now)*

The ring is the Architect's to fix, and the shape matters. File one inbox note naming:
- the root cause: `draftBoard.ts:61` — `rows.slice(0, limit).map(({ _w, _p, ...r }) => r)` strips the raw values before the VM ships, and `:53` sorts on them (`sort === 'ovr' ? Number(r.ovr) : sort === 'priority' ? r._p : r._w`);
- the component parse: `DraftBoard.svelte:38-47` on `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte` (`Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0`);
- the two candidate contracts: Pickle's `suggestions: { ids, rankedBy, cutoffRaw, reason }` from the engine view, or one generic `rawSort` on `BoardRowVM`;
- which you would build against and why, and what the view needs to render the ring as *advice* rather than decoration.

---

## 3 · What NOT to do

1. **No engine edits.** `colors/src/engine/**` is the Architect's. You consume the snapshot; you do not change it.
2. **No product HTML.** `Football-Sim-*.html` is the Architect's, always.
3. **No re-cut of c10** and **no manifest regeneration.** The c10 repair is one file; the manifests are correct once it lands.
4. **No push.** You have no credentials; a push hangs. Zip and relay.
5. **No per-game historical tuning.** The Owner's 18 Nov ruling: ship first, tune after. passGap is report-only; λ stays 0, GLM off.
6. **Do not start the ratings→gap mapping or the context-aware provider.** Post-cutover.
7. **Do not re-run** item-5/item-6, the vapor experiment, or the pairing arithmetic. Settled.
8. **Do not re-measure the C′1 ring by hand a fourth time.** Three measurements exist; build the battery (T5) instead.
9. **Do not touch other seats' lanes or the shared tree.**
10. **Do not add a dependency** without saying why in the report. The product is one self-contained HTML file; cakepanz is a static build.

---

## 4 · The deliverable

One zip, named `zai-sitting-2026-11-20-<slug>.zip`, containing:

```
README.md                 what this sitting did, in one page
CHECKSUMS.txt             md5 + path for every file (macOS note: `md5 -q`)
deliverables/
  sitting-report-2026-11-20.md     the full report (shape below)
  batteries/visual.battery.mjs     + its output log
  tools/shell-status.mjs           + a sample SHELL-STATUS.md
  tools/package-delivery.sh
  inbox/…                          your review file (T7) and your ring request (T8)
  <the changed source files, with their paths>
```

**Report shape** (every claim labelled):
1. What I did (one paragraph).
2. What I verified, with the commands and the raw output.
3. What I built, file by file, with the exact diff or the file.
4. What I did **not** do, and why.
5. What I found that changes the plan (defects, risks, better ideas).
6. What the Owner must do (land the c10 repair; land the doc fixes; rule on anything ambiguous).
7. What the Architect must do (the ring export; anything engine-side).
8. What I could not verify (UNKNOWN) and why.
9. The next sitting's first three items.
10. The checksums of the zip's own files.

**Zip rules:** `unzip -t` clean; `md5 -c CHECKSUMS.txt` clean; every path relative; no absolute paths; no images; no build copies of the product.

---

## 5 · Blocked items and who owns them

| blocked on | what you should do |
|---|---|
| the C′1 raw-key / `suggestions` export | file T8; build the view side that is ready for either shape; do not fake it with a rounded parse |
| the c10 landing (inkling/orcaink) | nothing; the Owner lands it. Say so in the report so it is not read as your omission |
| the doc fixes + the three md5 lines | nothing; the Owner lands them. Do not regenerate the manifests |
| the ratings→gap mapping | nothing; post-cutover |
| the context-aware provider | nothing; post-cutover |

---

## 6 · Evidence labels (use them on every line that matters)

- **VERIFIED** — you ran the command; the output is in your text.
- **REPORTED** — someone else says so; name them.
- **INFERRED** — reasoned, not run; say what would confirm it.
- **UNKNOWN** — not checked; say what you would need.

A number without a label is a rumour. A receipt without a command is a claim.

---

## 7 · The Owner's rulings that bind this sitting

1. **Framework: Svelte 5 + Vite 8 — final** (2026-11-19). React is out; its dependency goes at cutover.
2. **Part 0 is accepted.** The working dist `76de5658…` (527,162 B) is the release candidate; `670d4c08…` (527,177 B) is pre-Part-0 history. **No re-cut.**
3. **w89's layout is better than the current cakepanz shell** — the density and the one-click pick are the signal (T2).
4. **The distribution is folders, no re-cut zip.**
5. **SHIP-FIRST.** Per-metric historical alignment is parked until after ship. Do not tune values to history now.
6. **The Vue arm is retired** (archived, not deleted); **vapor is per-page, post-v1.1.**
7. **The user's team is blue** (`.ub`); the engine never re-lineups the user's team (advice only).
8. **The four stats tabs, in ALL CAPS:** `SEASON STATS` · `PLAYOFF STATS` · `YOUR PLAYERS` · `LEAGUE LEADERS` — these close the copy gate. They are w89's titles in caps; do not invent new labels.

---

## 8 · Done checklist (tick every line in the report)

- [ ] T1 slot picker: two teams (early + late), the five assertions, save/restore.
- [ ] T2 one-click Draft on ringed rows + undo + flex path intact.
- [ ] T3 `?seed=` parsed, displayed, persisted; two loads at one seed are identical.
- [ ] T4 gone% described; focus-visible; a11y tree dump.
- [ ] T5 visual battery green at 1180×900 and 390×320, fixed seeds.
- [ ] T6 contrast guardrail + SHELL-STATUS generator + delivery script.
- [ ] T7 review file filed.
- [ ] T8 ring request filed.
- [ ] `npm run build` clean; the existing battery still green; zero console errors.
- [ ] The zip: `unzip -t` clean, `md5 -c` clean, every claim labelled.

---

## 9 · Where things are (paths and commands)

```
# the Architect's branch (read-only for you)
origin/architect/engine-and-seats @ 408410477
  colors/src/core/snapshot.ts                    S3: snap53, neutral/toNeutral, zero form = absent
  colors/src/sports/nfl/app/store.ts             S4 + P-317: START { seed, userTeam, pickSlot? }, draftOrder(), SaveRecord.pickSlot
  colors/src/sports/nfl/engine/valueprovider.ts  S1: winsPerOvr(row, base, snapshot?)
  claude/NOW.md                                  the Architect's state file
  claude/multisport-engine-plan-2026-11-20.md    plan M (docs only, post-cutover)
  tools/mathlab/phase1/passgap.py                the passGap tool (report-only)
  tools/mathlab/results/passgap-2026-11-20.md    the passGap report

# your trees
origin/gh-pages:67-cakepanz                      slices 1-2 REV 3 (published)
origin/council/pickle|_agents/pickle/deliveries/zai-cakepanz-10-2026-11-19   the c10 package
origin/council/inkling|_agents/inkling/67-cakepanz-10-2026-11-19             the c10 package (missing one file)
origin/council/orcaink|_agents/orcaink/67-cakepanz-10-2026-11-19             the c10 package (missing one file)

# the key source files in your build tree
src/App.svelte                          the shell; seed at :109, ?dev at :54, undo at :151, START at ~:115
src/lib/components/BoardRow.svelte      the row; suggest ring, gone% tooltip, aria-expanded/controls
src/lib/components/DraftBoard.svelte    the board; suggestIds at :38-47 (the ring)
src/lib/screens/TeamSelect.svelte       Team Select (T1)
src/lib/components/SlotPicker.svelte    the in-board slot picker (already exists)
src/lib/assets/shell.css                the theme; contrast lives here

# commands
npm install && npm run build
npm run preview            # then open / and /?dev=1
npm run battery            # the existing battery
node batteries/visual.battery.mjs   # the new one (T5)
```

**Cwd for the Python tools:** `tools/mathlab/phase1` (`python3 -I passgap.py --years 2016-2025`; `sh fetch.sh` first). **Do not reuse Beam's nflverse copy** — it is the stale 12 Nov revision; fetch fresh.

---

## 10 · If you disagree, or if something is blocked

- **Disagree with a task:** say so in the report with evidence, do the rest, and mark the task `NOT DONE — dissent`.
- **Blocked:** name the exact file, branch or command you cannot see. A step that depends on something you cannot see is not a step.
- **Find a better idea:** build it if it is inside your lane and reversible; otherwise write it as an `IDEA:` line and say what it would replace.
- **Break something:** stop, keep the receipt, revert your own change, and report. Never leave a red tree for the next seat.

**End of order.**