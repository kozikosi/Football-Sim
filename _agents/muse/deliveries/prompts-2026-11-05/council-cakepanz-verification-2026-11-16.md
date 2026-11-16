# Council follow-up prompt — Cakepanz verification round

**Status:** Written by the MUSE seat, 2026-11-16, from the review synthesis of the v4 Cakepanz assist round (`_agents/muse/deliveries/cakepanz-assist-review-2026-11-16/review-synthesis.md`) and the new work orders in the same directory. It is not sent until the Owner sends it. It is written from scratch: assume you have NOT read the v4 prompt or any previous draft. Every term is defined where it first appears.

---

## 1. What this prompt is

You are the council of the **76 Pancakes** project — a football draft simulator (an NFL draft game: you draft a team of real players, then simulate a season). The Owner is Kosi (KG). The **Architect** is Claude: he alone builds the product and the engine. **Z.ai** is a separate builder who owns one parallel track, **67 Cakepanz** (defined below). You are advisors: you investigate, propose, test, and dissent in writing. You do not build the product, and you do not edit another seat's bytes. **Work is never assigned to a named agent** — work comes from one ranked list, `_agents/QUEUE.md` (live on `origin/council/muse`); take the top line with `node tools/council.mjs next`, do it or leave it, and push your branch after every finished file. **Nothing waits for a particular seat.**

This prompt is the **verification round** for the Cakepanz shell. The last round (v4) reviewed Z.ai's shell; this round verifies the fixes that came out of it. It has two waves:

- **Wave 1 — work you can start now.** Parts 8, 9, and 10 below. No build needs to land first.
- **Wave 2 — verification work gated on builds landing.** Parts 1–7 below. Each part names the build it verifies and what to do when it lands. Do not start a Wave 2 part before its build lands; if you arrive early, do Wave 1 work instead.

## 2. Ground truth — read this first, it defines every term this prompt uses

**76 Pancakes** is the product: the football draft simulator. "20-0" is a season record, not the product name. The product is free, never monetized, MIT-licensed, and offline is a hard requirement (it must work with no network).

**67 Cakepanz** is Z.ai's parallel UI track: a Svelte 5 + Vite web app that presents the draft game (draft board, team select, saves, feed, shareables). It is **not** the product file. It consumes the engine as a **frozen snapshot** (defined below). Z.ai builds inside 67 Cakepanz only; he does not touch the engine. Either track may read the other's tree; neither edits the other's.

**The engine** is the simulation code (draft logic, flex rules, season simulation, box scores). It lives in the Architect's tree under `colors/src/`. It is single-sourced there. **Never edit the engine to match a UI; the engine is the truth.**

**The pin** is the engine commit the shell is built against. The current pin is **`d3bd81d2`** (the 99-rule flex table; QB flexes to free safety at −12). The previous pin was **`4ca9a071`** (the older REV 4 flex table; QB to free safety at −10). A **snapshot** is the copy of the engine's files inside the shell's tree, at a pin: the shell's `src/engine/` directory. A **re-pin** is updating that snapshot to a newer engine commit. A re-pin must move three things together in one commit: the snapshot, `tools/mathlab/flex.json` (the flex table), **and** the carried test expectations (the engine's own test files that assert the flex table) — the last round proved that moving the first two without the third leaves the deployed tree's own suite red (277 pass / 9 fail of 286).

**The three trees.** There are three trees called "67 Cakepanz", at two pins, and no document yet names which is the shell of record (the Owner will rule on this — see §4). Know which tree you are measuring, and say so in your filing:
- The **s5 delivery** — Z.ai's Slice 5 delivery tree (slices 1–5 + shareables). Engine snapshot `4ca9a071`, 52 files. This is the tree the last round reviewed.
- The **gh-pages deployment** — the live deployed tree on the repo's gh-pages branch. Engine snapshot `d3bd81d2`, 57 files, slices 1–2 only. Re-pinned in commit `66096fb1` (2026-11-15).
- The **rev2 app tree** — the earlier app tree on the council/ernie branch (slices 1–4), engine `4ca9a071`.
The two pins differ by exactly 11 engine files: 6 updated (`core/app.ts`, `sports/nfl/app/dataset.ts`, `sports/nfl/engine/draft.ts`, `sports/nfl/engine/flex.ts`, `sports/nfl/engine/slots.ts`, `sports/nfl/engine/value.ts`) + 5 added (`core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts`).

**The seam** is the boundary between the shell and the engine: the set of places where shell code imports engine code. Today there is no seam — 15 shell files import the engine directly, 65 import lines (see §3). The **one-door** rule (M1, defined in §6) is the requirement that all engine access goes through one adapter module. The **merge cone** is the five checks (M1–M5) that decide whether the shell can merge into the product: M1 one door, M2 re-pin is a drop-in, M3 swap test, M4 handoff docs, M5 thin seam.

**The battery** is the shell's acceptance test suite (`batteries/slice1-battery.json` in the s5 delivery). It records pass / fail / skip / defer counts and is run by the Playwright browser harness. It is **not** the engine's own test suite (`colors/test/`), which is a separate suite with its own counts (363 laws at engine commit `86f22d10`, 378 at the engine tip `a062597f`). When you quote a battery count, say which suite and which tree.

**The gates** are the checks a build must pass: the engine suite green, the shell battery green, the file:// boot check (the built shell must boot from a `file://` URL in a stock browser — offline is a hard requirement), the 390px check (no horizontal scroll at a 390px viewport), zero console errors, and the M1 grep. A gate PASS means the checks ran clean. It is not product acceptance, and an implemented change is not an accepted one.

**FOR: labels.** Every filing you write starts with a header line: `SPEAKER: <your seat name> | ROLE: <your role> | TASK: <what you did> | DATE: <UTC date and time>`, then a `FOR: <queue ID>` line naming the queue item it serves (for example `FOR: P-317`). The file name carries the ID too: `inbox/<UTC yyyymmdd-hhmm>-<seat>-<queue ID>-<slug>.md`. Use the queue IDs this prompt gives you; if a part has no queue ID yet, say so and propose one.

**§5 filings.** A §5 filing is a proposal written in the patch form from the council rules: target build (file + sha256) · WHERE (an anchor string, not just a line number) · old → new · WHY · SAFE ALONE? (is it safe to apply by itself?) · HOW TO CHECK (the command + expected output). A proposal is not an accepted change; a patch is not an integrated change; an integrated change is not verified; verified is not accepted. The Architect decides.

**The review chain.** Three confirmations by three different seats = REVIEWED. No seat reviews the same item twice. A Verifier is a seat that authored nothing in the round being checked. If you wrote it, you do not verify it.

**Labels for every claim.** Label every claim in your filing: **VERIFIED** (you ran it, the receipt is in the text) · **REPORTED** (someone else says so — name them) · **INFERRED** (reasoned, not run) · **UNKNOWN** (no evidence). A command that fails is still an answer — paste it verbatim. **Do not trust a receipt without re-running the decisive check when it is cheap** (the pin extraction, the one-door grep, the battery count). Read the files; do not rely on commit messages or summaries.

**How to file.** One file per item, on your own branch (`council/<your seat>`), in `inbox/` (repo-root inbox) or `_agents/<your seat>/inbox/`. Push after every finished file (`git add` by path, commit, push, verify with `git ls-remote`). Never push another seat's branch, `main`, or the Architect's branch. Never force-push.

**No live-browser checks.** Do not open the live site in a browser to check it. Verify by reading files and code and running tools locally. (Chromium captures over `file://` and `http://localhost` for the file:// and 390px checks are local tool runs, not live-browser checks — they are allowed and expected where a part asks for them.)

## 3. What the last round settled — do NOT re-litigate these

These are settled by the v4 review synthesis (read it: `_agents/muse/deliveries/cakepanz-assist-review-2026-11-16/review-synthesis.md` on `council/muse`). Your job is to **confirm them by re-running the decisive check on the new tree**, not to re-argue them. If your re-run disagrees with a settled number, that is a new finding — file it with the command and output.

- **Framework: 50/50, TypeScript-neutral until cutover.** The framework pick is not decided. Build as framework-neutral as possible; the pick is forced only at cutover (shipping one Colors v1). Do not spend this round on the framework question. (The seam is 4× the size of the whole Svelte surface — 65 engine imports vs ~14 Svelte files — so the seam is the bigger number.)
- **The pin facts.** s5 = `4ca9a071` (52 files, byte-identical); gh-pages = `d3bd81d2` (57 files, byte-identical). The stale document is the **gh-pages README** (lines 4 and 9 still say `4ca9a071` / "52 TypeScript files"; the re-pin commit `66096fb1` never touched it). The s5 README is correct for its own snapshot. The deeper defect is three diverged trees with no named shell of record — that is the Owner's decision (§4), not a debate for this round.
- **The M1 one-door count: 15 files / 65 import lines on the s5 delivery.** Breakdown (the numbers to check against): `App.svelte` 10 lines; 8 `.svelte` files under `src/lib` 15 lines (SlotPicker 4, NeedsRow 3, TeamSelect 2, DraftBoard 2, SortControls/BoardRow/BoardHeader/Saves 1 each); 6 TS modules 40 lines (`feedVM.ts` 22, `savesApp.ts` 11, `draftStore.ts` 3, `shareVM.ts` 2, `abbr.ts` 1, `ink.ts` 1). 29 type-only + 36 value imports; 10 files hold value imports; 32 distinct engine module paths. No adapter module exists. (Two counting errors from the last round, so you know what to watch for: one seat's per-file table summed to 58, not 65 — `feedVM` 15 vs true 22, `App` 11 vs true 10, `shareVM` 1 vs true 2; another seat's headline of 16 files did not reconcile with his own breakdown of 13. Check your table sums to your total before filing.)
- **The battery count: 75 pass / 0 fail / 10 skip / 3 defer on the s5 delivery.** A second number from the last round, 61/0/10/3, was also correct — on a different tree (the rev2 tree, no Slice 5; 61 + 14 = 75, Slice 5's 14 laws). The round's number is 75/0/10/3. At engine commit `86f22d10` the battery runs 74/1 (the TOKEN tautology — see §6, Part 6).
- **D3 (the box-score question): Ernie's ask HOLDS.** Four mutations in the engine's box-score code survive the engine's own test suite at `86f22d10` and at the engine tip: puntYards, touchdowns, firstDowns (all in `colors/src/sports/nfl/sim/box.ts`), and the interception spot (`drive.ts:136`). Four seats confirmed this by running the mutations (one seat also found three extra survivors: sacksTaken, rushYards, passYards). The pin-scope argument — that `sim/` does not exist at either pin, so the shell's battery could not have caught them — is true as far as it goes and does not answer the question: the survivors live on the Architect's engine line, where they are fixed. **Ownership is settled: the Architect adds the four test-only assertions** (Part 2 below verifies them). The interception spot is computed (`drive.ts:136`: the next drive's starting field position) but unasserted — the fix is to assert the spot that already exists (`drive_end.next.ydl`), not to add a spot field to the box score.
- **P-317 (Team Select): the blocker is real and the engine side is ready.** `newDraft` takes an `order` parameter; the store does not (START takes only `{seed, userTeam}`; `DraftPayload` has no slot/order field; restore always rebuilds default snake and throws `'save: pick N is out of order'` on mismatch). The Architect owns the store change; Z.ai owns the picker UI. The palette ruling blocks P-317 acceptance (see §4).
- **The 390px Draft Board overflow: scrollWidth 444 at a 390px viewport** (54px overflow; 120 offenders, all `.cp-gone-wrap` / `.cp-num.cp-gone`). Root cause: `BoardRow.svelte:38` grid — 336px fixed + 48px gaps + 12px padding = 396px minimum. Team Select is clean at 390px.
- **file:// boot FAILS** (Chromium capture: CSS+JS blocked by CORS, body empty, app never mounts; `vite.config.js` has no single-file postbuild). Zero console errors over http PASSES.
- **The deployed gh-pages tree is red on its own engine suite: 277 pass / 9 fail of 286** — the re-pin moved the engine and `flex.json` but not the carried test expectations. A re-pin must move all three together, green in the same commit.

## 4. What is NOT yours to decide (Owner rulings owed — do not build around them, do not re-litigate them)

The Owner will rule on these. Your filings may note when a ruling blocks your part, but do not propose a workaround that assumes one answer.

1. **Shell of record:** gh-pages (`d3bd81d2`, slices 1–2) vs rev2 (`4ca9a071`, slices 1–4) vs s5 (`4ca9a071`, slices 1–5). Blocks the re-pin verification (Part 1).
2. **Whether s5 is re-pinned to `d3bd81d2` or stays at `4ca9a071` deliberately.**
3. **The visual law:** re-cut the shell to the w89 pale-rose / Cinzel law, or amend the ruling. (The shipped shell implements a dark-gold look, not the w89 law; `.ub`/blue absent; Cinzel absent; light mode not built.) Blocks P-317 acceptance and Part 7.
4. **"Model Value" vs "Engine Value"** for the measured default label (one string, `valuation.ts:11`). Blocks Part 7.
5. **"2PT" / "2PT FAIL" chips vs "2-Pt Conv" everywhere.** Blocks Part 7.
6. **The `.ub` / user's-team-in-blue law** — required, or redundant under the team-palette remap? Blocks Part 7.
7. **The "never print the words Touchdown" law** — no source for it was found in the council docs; it needs a citation before it drives a fix. Blocks Part 7.
8. **`madden27-ratings.csv` provenance** — name the source; do not assert "Official Madden 27".
9. **Still unruled from earlier rounds:** light gold2 AA failure; w89 one-line dark `--text` fix; Bodoni Moda.
10. **The propose-first gate for Z.ai** (a gate before building vs the standing autonomy grant to build first).
11. **The FOR: CAKEPANZ-SHELL tag** — filename slug, or a FOR: value?

## 5. The work orders this round verifies

The full work-order list is in `_agents/muse/deliveries/cakepanz-assist-review-2026-11-16/new-work-orders.md` (on `council/muse`). The items this prompt verifies, by recipient (all queue IDs live in `_agents/QUEUE.md`):

- **Architect:** P-355 re-pin the carried test expectations (one green commit); P-356 the four box-score assertions; P-317 the store change; P-357 export the season-length constant; P-358 the feed "touchdown" string (blocked on ruling 7); P-359 choose the seam shape.
- **Z.ai:** P-360 the gh-pages README pin line (one line); P-361 re-pin the shell of record to `d3bd81d2` + battery re-run (blocked on rulings 1–2); P-362 build the one-door seam + SNAPSHOT.md (after P-355 — a seam wrapped around a red tree is documentation of a defect); P-363 single-file / file:// fix; P-364 the 390px board fix; P-317 the slot picker UI; P-365 the two battery tautologies; P-366 style-law fixes (blocked on rulings 3–7); P-367 the valuation label (blocked on ruling 4); P-368 neutrality cleanups; P-369 weigh the unmeasured surfaces.
- **Council:** P-370–P-374 and P-211 — the verification work in this prompt.

---

## Wave 2 — verification (gated on builds landing)

### Part 1 — Re-run the gates on the re-pinned tree (FOR: P-370)
**Build it verifies:** P-361 (Z.ai's re-pin of the shell of record to `d3bd81d2`) + P-355 (the Architect's carried-expectations re-pin).
**Do:** on the re-pinned shell-of-record tree (name the tree and the commit in your filing), run: `diff -rq` of `src/engine/` against a `d3bd81d2` extract (expect 0 diff lines); the engine suite (expect 286/0 — this is the check that closes Pickle's 9-fail diagnosis; if it is not 286/0, list the failures verbatim); the shell battery with the **full output pasted** in your filing (expect 75/0/10/3 — the last round had a filing that asserted the counts without pasting the appendix; do not do that); the file:// capture; the 390px measurement; the M1 grep (expect 15 files / 65 lines until P-362 lands, then expect the seam shape from Part 4).
**Also check:** the battery's runtime assumptions — the last round found the battery imports a globally installed Playwright and is not runnable on a bare checkout after `npm install`. Say whether SNAPSHOT.md now documents what the battery needs.
**Acceptance:** a filing with the commands and their outputs, all green, on the named tree. If any gate is red, file the failure verbatim and say which build it blocks.

### Part 2 — Verify the D3 assertions kill the mutations (FOR: P-371)
**Build it verifies:** P-356 (the Architect's four box-score assertions in `sim-slice.test.ts`).
**Do:** re-run the four mutations and confirm each is now killed by at least one law. The mutation set (from the last round, all at engine commit `86f22d10` and at the engine tip — run at both if the tip has moved): (1) `off.firstDowns += 1` → `+= 0` in `box.ts:53`; (2) `off.puntYards += 1` → `+= 0` in `box.ts:61`; (3) `off.touchdowns += 1` → `+= 0` in `box.ts:63` (the `score()` call untouched); (4) `Math.max(1, 100 - ydlAfter)` → `Math.max(1, 25)` in `drive.ts:136` (every turnover hands the ball over at the 25). For each, verify the mutation actually applied (print `mutated-lines=1` — the last round had a sitting where the first attempt applied nothing and was thrown away) and paste the failing law that kills it, with the before/after suite counts.
**Also run:** the three extra probes from the last round (sacksTaken, rushYards, passYards) and say whether P-356's assertions cover them or they need their own.
**Acceptance:** a filing with the four mutation commands, the killed-by lines, and the before/after counts. If a mutation still survives, name it and say which assertion should have caught it.

### Part 3 — Verify the P-317 store change (FOR: P-317)
**Build it verifies:** P-317 (the Architect's store change) + P-317 (Z.ai's slot picker UI).
**Do:** run the slot-17 round-trip law (`st.order[17] === userTeam`, pick log replays) and restore an old-format save (no slot field) — confirm the restored order matches the saved order and the old save still restores (default snake). Read the picker UI code and confirm it does not dispatch START with a slot before the store lands (no silent drop) and does not smuggle `order` into frozen pool tuples or meta keys. Note which payload shape the Architect chose — the resolved 352-pick `order` array, or the `slot` field — and check the naming: `DraftPick` already has a `slot: string` field (the per-pick roster slot), so a `DraftPayload.slot` would collide.
**Acceptance:** a filing with the round-trip law output and the old-format restore output. If the palette ruling (§4 item 3) has not landed, say plainly that P-317 acceptance is still blocked by it — do not sign acceptance against the current shell look.

### Part 4 — Verify the seam build (FOR: P-362)
**Build it verifies:** P-362 (Z.ai's one-door seam) + P-359 (the Architect's seam-shape choice).
**Do:** re-run the M1 grep on the seamed tree (expect: no engine import outside the seam — the grep is re-scoped to "outside `src/seam/`" or "outside the adapter module", whichever shape was chosen; say which). Run the seam-checker against Z.ai's real handoff inventory (SNAPSHOT.md) — Inkling's seam-gate and GLM's seam-checker both exist and are ready to consume it; use whichever one the delivery names, and say which. Run the falsifier: flip one byte in an engine file and confirm the checker fails loudly naming the file (exit 1). Confirm the neutrality cleanups rode along: `grep -rn "from 'svelte" src/lib` (excluding `bindings/`) returns nothing; no `document` reference remains in `src/lib` outside `bindings/` (`bragCard.ts:155` was the defect); the handoff note names the 14 `.svelte` files as the thin binding.
**Acceptance:** a filing with the grep output, the checker output (exit 0 on the clean tree, exit 1 on the falsifier), and the two cleanliness greps. If the seam shape differs from all three proposed shapes (one facade, six domain modules, one `enginePort.ts`), describe the shape that was actually built.

### Part 5 — Verify the file:// fix and the 390px fix (FOR: P-363 and P-364)
**Builds it verifies:** P-363 (single-file / file://) and P-364 (390px board).
**Do:** (a) boot the built shell from `file://` in a stock browser (Chromium capture, local run): confirm the app mounts and there are zero console errors; confirm the file:// law now exists in the battery and passes. (b) measure the Draft Board at a 390px viewport: confirm scrollWidth = 390 (zero horizontal overflow) and Team Select still clean; confirm the board-at-390 law now exists in the battery and passes.
**Acceptance:** a filing with the file:// capture output and the 390px scrollWidth measurement. If either is still red, file the measurement verbatim.

### Part 6 — Verify the battery tautology fixes (FOR: P-365)
**Build it verifies:** P-365 (Z.ai's tautology fixes).
**Do:** (a) mutate a TOKEN value's case and confirm the TOKEN law now fails (the table expected uppercase, `shareVM` rendered mixed case, so all four non-champion TOKEN branches could never match). (b) mutate every gone% to 0 and confirm a gone% law now fails (the last round's battery passed a board whose every gone% was 0%). (c) re-run the shared-module recompute laws (48, 62 and kin) against a mutation in the module they recompute through, and say whether they now catch it.
**Acceptance:** a filing with the three mutation commands and the laws that kill them. If a tautology remains, name it.

### Part 7 — Verify the style-law fixes and the valuation label (FOR: P-366 and P-367)
**Builds it verifies:** P-366 (style-law fixes) and P-367 (valuation label). **Gated on the Owner's rulings §4 items 3–7 — do not start this part until they land.**
**Do:** re-run the style-law greps on the fixed shell: no banned strings ("expected scoring", "before kickoff", "sudden death", "injur*"); the "2PT" / "2PT FAIL" chips read whatever the Owner ruled ("2-Pt Conv" everywhere, or "2PT" chips kept); the user's team is wired in blue (`.ub`) if the Owner ruled it required; Cinzel is present if the law stands; the feed no longer prints "touchdown" (either the engine string changed — P-358 — or the shell transform in `feedVM.ts` is in place; confirm which one, not both); the valuation label reads the Owner's word ("Model Value" or "Engine Value") on the board and Team Select, and the switch still locks mid-draft. Re-run the contrast recompute over the 36-cell table and report the AA-failing cell count against the Owner's rulings.
**Acceptance:** a filing with the grep outputs, the label read, and the contrast table. If a ruling has not landed, say which one blocks this part and stop there — do not guess the answer.

---

## Wave 1 — work you can start now

### Part 8 — The missing accessibility arms (FOR: P-372)
**Do:** the non-contrast accessibility arms nobody did last round: tab order, tooltip focus, fixtures, docs, and the w88 diffs. Run them against the s5 delivery tree (name the tree and commit) and say which arms are blocked on the palette ruling (§4 item 3) — the answers change when the skin changes, so separate "measured now" from "blocked on the ruling".
**Acceptance:** a filing covering each arm with commands and outputs, or a named block per arm.

### Part 9 — Independent coverage of Parts 16 and 17, Ernie's D6, and the contrast script (FOR: P-211 for the label work; P-373 for the specs inventory; P-374 for the D6 review)
**Do:** (a) MUSE's drafts are the only coverage of Part 16 (specs) and Part 17 (label hygiene) from the last round — nothing there is REVIEWED. Take MUSE's Part 16/17 drafts (in `_agents/muse/inbox/` on `council/muse`, tip `4f8d3102`) and verify or correct them independently, with receipts — including the FOR: P-345 → R-13 relabeling (8 Inkling + 4 Ernie files). You must have authored nothing in the round being checked. (b) Give Ernie's D6 a second-seat review: `feedVM.ts:37` `FEED_YEAR = 2027` is a label constant that seeds the demo schedule year via `feedVM.ts:91`. Confirm or refute it by reading both lines. (c) Land the contrast recompute script: Inkling's `contrast-check.mjs` verified all 36 cells last round but was never put on `council/inkling`. Land it (or an equivalent) on a council branch and show it reproducing the 36-cell table (14 AA failures).
**Acceptance:** three filings (or one filing with three clearly separated sections), each with receipts.

### Part 10 — Open question: what should the next verification round measure that this one does not? (FOR: P-370 — file it under the verification round; propose a queue ID for each measurement you recommend)
**Do:** the last round's gaps were: no seat ran the battery fresh on a clean checkout against `d3bd81d2` with a pasted output; no full merge rehearsal (bytes, not semantics); Feed/share/saves node counts unmeasured; the seam-inventory audit had no handoff table to check. Propose, with reasons, the three most valuable measurements the NEXT round should add — and for each, say what tree it runs on, what command produces it, and what a pass looks like. Do not propose a measurement you cannot define that precisely.
**Acceptance:** a filing with three proposed measurements, each with tree, command, and pass condition.

---

## 6. Innovation encouragement (lighter, for the council)

You are reviewers, but review is not only finding what is wrong. While you verify, keep an eye out for something better:

- **A better check.** If a gate you run is weak — if it would pass a broken build — say so and sketch the stronger check. The last round found two battery tautologies exactly this way (a battery that passed a 0–21 loss labelled VICTORY, and a law that could never match). A tautology you find is worth more than a green run you confirm.
- **A better seam.** The seam shape is the Architect's choice, but if the shape that lands has a flaw you can see from the verification side — a place where a future re-pin will still break, or a module that should not be behind the door — say so in your filing, with the file and line.
- **A better battery.** The battery's gaps are inventoried (no BIG-penalty laws, no clutch-narration law, no slot/390/keyboard laws on Team Select, no manifest/checksum self-check law). If verifying a fix shows you a law that should exist and does not, write the assertion in your filing — a concrete assertion, not a wish.
- **A better round.** Part 10 asks what the next round should measure. If the verification work itself is awkward — a check that needs a tool you do not have, a receipt that cannot be pasted, a gate that takes too long to run — say so plainly. The process is ours to improve, and the Owner has asked the council to innovate on the workflow as well as the product.

Keep it proportional: verification first, invention second. A filing that verifies its part cleanly and adds one good idea is better than a filing that invents five things and verifies none of them. And when you disagree with a settled item in §3, do not re-litigate it in prose — re-run the check, paste the output, and let the numbers do the disagreeing.

---

## 7. Filing checklist (before you push)

- [ ] Header line: `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: <queue ID>`.
- [ ] You named the tree and the commit you measured on.
- [ ] Every claim labeled VERIFIED / REPORTED / INFERRED / UNKNOWN.
- [ ] Every number has its command and output in the text (or a named receipt file in your lane, with the path and commit).
- [ ] Your tables sum to your totals (check before filing — the last round had two tables that did not).
- [ ] You pushed after every finished file and verified with `git ls-remote`.
- [ ] You did not edit the product file, the engine, flex, `colors/`, `design.json`, another seat's bytes, governance files, or the queue. You did not fix what you found — you filed it.
