SPEAKER: muse | ROLE: council | TASK: cakepanz shell assist part 14 — cutover checklist for the Architect | DATE: 20261116-2103
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 14 — The cutover checklist for the Architect (FOR: R-13)

**What this file is:** the one page Claude reads before he merges the 67 Cakepanz shell with the engine. **What "perfect shell" means** is the numbered list below: each check states the command, the expected result, and where the evidence lives. A check is not done because a README says it — it is done when the command's output is pasted next to it. **What this file unblocks:** the merge itself — Claude's wiring task, and the Owner's cutover decision. **Exact artifact:** this filing. **How to verify/apply:** run the commands from a clean extract of the delivery; nothing here requires the live browser (per the standing boundary I ran no browser checks myself — the checks that need a browser are marked RUN, not claimed).

**How to use it:** work top to bottom. Any check that fails stops the line — do not skip ahead and sign. Checks 0–2 are about *which* shell and *which* engine you are merging; everything after them assumes those answers are written down.

## The checklist

### 0. Name the pin — in writing, in both trees

**Command (the question, not a shell command):** the Owner or the Architect writes one line — "The cutover pin is `________`" — and it goes in the delivery README, the gh-pages README, and `AGENTS.md` §2, all three, same commit.

**Why this is check 0 (VERIFIED this session):** the pin is currently three different answers. The s5 delivery's snapshot is byte-identical to `4ca9a071` (52 .ts files, 0 differ — I ran the diff). The gh-pages deployment's engine is byte-identical to `d3bd81d2` (57 .ts files, 0 differ — I ran the diff, re-pin `66096fb1`). The gh-pages README still says `4ca9a071` (stale). The prompt names `d3bd81d2`. Until one pin is named, every check below is ambiguous about what it is checking. **Expected result:** one pin, three documents, zero disagreement. **If it fails:** stop. A merge against an unnamed pin is a merge against a moving target.

### 1. Byte-identity of the snapshot against the named pin

**Commands (run from a clean extract of the delivery tree):**

```sh
git archive origin/council/inkling _agents/inkling/deliveries/67-cakepanz-s5 | tar -x -C /tmp/cakepanz-cutover
cd /tmp/cakepanz-cutover/_agents/inkling/deliveries/67-cakepanz-s5/src/engine
for f in $(find . -type f -name '*.ts'); do
  git show <PIN>:colors/src/${f#./} | diff -q - "$f" >/dev/null 2>&1 || echo "DIFFERS: $f"
done
```

**Expected result:** no `DIFFERS` lines, and the file count matches the delivery README (52 at the s5 delivery; 57 on gh-pages after the re-pin — the count itself is a check: if it changed, say why). **Receipt I can already give (VERIFIED):** against `4ca9a071` the s5 snapshot is 52/52 clean; against `d3bd81d2` it is 6 differ (`engine/value.ts`, `engine/slots.ts`, `engine/flex.ts`, `engine/draft.ts`, `app/dataset.ts`, `core/app.ts`). Against `d3bd81d2` gh-pages is 57/57 clean. **If it fails:** the snapshot was edited or the pin moved — find which, do not merge around it.

### 2. The shell on the table is the whole shell

**Command:**

```sh
git ls-tree -r --name-only origin/gh-pages 67-cakepanz/src/lib/
# and: ls <delivery>/src/lib/screens/ <delivery>/src/lib/
```

**Expected result:** the deployment's screen list and the delivery's screen list agree — Team Select, Draft Board, Saves, Feed, Share all present in both. **Current state (VERIFIED):** they do NOT agree. gh-pages `src/lib/screens/` holds `TeamSelect.svelte` only; the delivery holds `Feed.svelte`, `Share.svelte`, `TeamSelect.svelte` plus `savesApp.ts`, `feedVM.ts`, `shareVM.ts`. The deployment is slices 1–2; the delivery is slices 1–5. **If it fails:** merge from the delivery tree, never from gh-pages alone — and publish the delivery before cutover, or the thing the Owner cut over is not the thing the council reviewed.

### 3. Build clean

**Commands (in the extracted delivery tree):**

```sh
npm ci && npm run build
```

**Expected result:** exit 0, no warnings that name a file you own, `dist/` produced. **Current state:** REPORTED (slice-5 README: `vite build` → `dist/` clean, 316 kB JS / 107 kB gzip). Re-run it — a REPORTED build is not a verified build. **If it fails:** paste the failure verbatim; a build failure is the answer, not a reason to try a different command.

### 4. Engine tests green in the shell tree

**Command:**

```sh
npm run test:engine
```

**Expected result:** 284 pass, 0 fail (the REPORTED s5 number). **If it fails:** the snapshot and the shell's test wiring disagree — that is a seam finding, not a test problem.

### 5. The battery, from a clean extract, all laws

**Command:**

```sh
node batteries/slice1.battery.mjs
```

**Expected result:** 75 pass · 0 fail · 10 SKIP (loud, with reasons) · 3 DEFER to cutover — the REPORTED s5 tally — **and** the per-law JSON in `batteries/slice1-battery.json` regenerated from this run, not copied from the delivery. **Current state:** UNKNOWN to me — I did not run the battery (no live-browser checks for this seat; the battery drives Playwright). **If it fails:** the failing law's name is the finding. A battery that is not re-run at cutover is a battery that certifies a different tree.

### 6. The slot laws (P-317) green

**Commands:** the slot battery laws (proposed in my Part 4 file, B1, and the probe in my Part 15 file, Asset A6 — `batteries/probe-slot.mjs` once it exists):

```sh
node batteries/probe-slot.mjs
# plus the UI battery laws: slot 1 / 12 / 32 put the user on the clock at the
# right overall pick in rounds 1-3; save/load round-trips the slot;
# a legacy save loads as slot = userTeam + 1; slot 0 / 33 / 1.5 is refused verbatim
```

**Expected result:** all green at the cutover pin. **Current state:** the store change has not landed (VERIFIED — `store.ts` `START` has no slot), so these laws do not exist yet, let alone pass. **If it fails:** P-317 is not done, and Team Select ships without the draft-position pick the Owner required. This is a merge-blocker, not a nice-to-have: the Owner's P-317 ruling is "Slice 2 is not accepted until it does [team AND slot]."

### 7. Save round-trip: draft, week, season, corrupt, newer

**Command:** the battery's slice-3 save laws, plus a manual pass if the battery does not cover one:

```sh
node batteries/slice1.battery.mjs   # save laws live here (slice 3: 17 laws)
```

**Expected result (each, separately):** a draft save survives reload and restores the board and the team; a real week save hydrates (`WEEK · rev · next: week N`); a real season save classifies and renders its own numbers; a corrupt save is REFUSED verbatim (nothing repaired, nothing defaulted); a newer-version envelope is refused as newer. **Current state:** REPORTED green at s5 (README's verification section) — re-run, do not trust. **If it fails:** corrupt-never-repair is the product's trust model; a save path that repairs silently is a merge-blocker.

### 8. The seam is one door (or say it is not)

**Commands:**

```sh
grep -rn "import.*engine/" src/lib src/App.svelte | wc -l
grep -rln "engine/" src/lib src/App.svelte
```

**Expected result:** either the count is small and every import goes through one consumption module (`src/lib/engine.ts` or equivalent — see my Part 4, B5), or the checklist records "the seam is NOT one door: N imports across M files" as a known merge cost, with the number. **Current state (VERIFIED):** 65 imports across 15 files; there is no single consumption module. **If it fails:** Claude's merge is not "swap one module" — it is "touch every screen that imports the engine." Say so, price it, and do not claim otherwise in the cutover note.

### 9. No number without the engine

**Command:**

```sh
grep -rn "hard-coded\|TODO.*number\|= [0-9]\{2,\}" src/lib/*.ts src/lib/screens/*.svelte | head -30
# plus: every Wins / Priority / OVR on every screen traces to boardVM / the record / the envelope
```

**Expected result:** no hard-coded flex cost, no generated ratings, no stand-in table; the valuation label travels with every number (the `.cp-prov` line on board and Team Select). **Current state:** INFERRED clean from the code I read (every number I traced came from `boardVM`, `goneOdds`, the record, or the envelope) — but I did not run an exhaustive audit, so this is a check to run, not a result to quote. **If it fails:** the hit's file and line is the finding.

### 10. file:// boot, zero network, zero console errors

**Commands (in a browser, network blocked):** open the built `dist/index.html` via `file://`, walk every screen (Team Select → board → saves → feed → share) in both the empty state and `?dev=1`, and record console errors per screen.

**Expected result:** boots, every screen renders, zero console errors, zero network requests. **Current state:** UNKNOWN to me (no live-browser checks for this seat). **If it fails:** paste the console error verbatim with the screen it happened on. Offline is a hard requirement — a screen that fetches is a merge-blocker.

### 11. 390 px, no horizontal scroll, every screen

**Command:** viewport 390 px wide, walk every screen in both light and dark, empty and dev states.

**Expected result:** no horizontal scroll on any screen; the sticky needs row collapses (see my Part 5, B4 — at 32 open slots it is five-plus lines of sticky chrome on a phone); the gone-odds tooltip is reachable without hover (it has `:focus-within` — VERIFIED in `BoardRow.svelte:52` — but that needs a tap/keyboard test, not a grep). **Current state:** UNKNOWN to me. There is no width-based `@media` query anywhere in `src/` (VERIFIED by grep — the only `@media` rules are `prefers-reduced-motion`). **If it fails:** the screen and the overflowing element, verbatim.

### 12. Reduced motion, both modes, both palettes

**Command:** `prefers-reduced-motion: reduce` on, walk the feed (the beat-in animation) and the board (the tooltip transition); toggle light/dark on every screen.

**Expected result:** animations off under reduced motion (feed: `animation-name: none` — the battery asserts this, REPORTED); palette reads as w89 in both modes, team colors driving the palette in both. **Current state:** REPORTED for the feed animation; everything else UNKNOWN to me. **If it fails:** name the animation and the screen.

### 13. Style laws, by grep

**Commands:**

```sh
grep -rni "expected scoring\|before kickoff" src/ | head
grep -rn "2-Pt Conv\|2PT" src/lib/ | head   # "2-Pt Conv" except in the Guide; the Guide does not exist yet (Part 5, A4)
grep -rn "DRAFT\. \|SEASON\. \|PLAYOFFS\. \|SUPER BOWL\. " src/ | head  # no periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL
```

**Expected result:** zero hits on the first and third greps; the second grep's hits are only where the law allows. **Current state:** NOT RUN by me this round — run it. **If it fails:** the string and its location, verbatim.

### 14. The OT clock has one owner

**Check (a reading check, not a command):** the snapshot's `app/feed.ts` `clock()` still maps overtime starts to Q4 with a negative remainder (REPORTED, s5 README finding 1), and `Feed.svelte` works around it with `OTn` stamps. **Expected result at cutover:** either the re-pin carries the Architect's OT fix and the feed's workaround is deleted, or the workaround is documented as the single owner of OT clock rendering and every future clock-rendering screen uses it. **If neither is true:** two screens will disagree about overtime, and the first one to ship will be the wrong one.

### 15. The week-1 game has one derivation

**Check:** `feedVM.playUserWeek` (from the draft record) and the season path (`startSeason` → `playWeek`) produce the same week-1 game from the same (seed, record), or `feedVM`'s derivation is retired in favour of the `WeekPayload` path (my Part 4, B3). **Expected result:** a battery law asserting equality, green. **Current state:** no such law exists that I found. **If it fails:** the shell has two week-1s, and the season slice will ship the second one while the feed shows the first.

### 16. Shareables are static, and the seed card's promise is proven

**Command:** the battery's slice-5 laws (`node batteries/slice1.battery.mjs`, 14 laws).

**Expected result:** the brag's scoreline equals the engine game exactly; SAVE PNG produces real PNG bytes (magic bytes, non-trivial size); the card contains no link back into the app; the node-side replay from (seed, year, run) lands the same champion and record row (REPORTED flagship: seed 4275, Buffalo Bills 10-7-0). **Current state:** REPORTED green at s5 — re-run. **If it fails:** a shareable that invents a number is worse than no shareable.

---

## Verdict: would I sign it?

**No — not as the shell stands today.** And the reason is not a vague feeling; it is the checklist above, read honestly:

1. **Check 0 fails.** The pin is three different answers (delivery `4ca9a071`, deployment `d3bd81d2`, gh-pages README stale at `4ca9a071`). I cannot sign a merge when I cannot say which engine is being merged.
2. **Check 2 fails.** The deployment is slices 1–2; the delivery is slices 1–5. The thing the public sees is not the thing I reviewed.
3. **Check 6 does not exist yet.** P-317's slot pick — the Owner's own acceptance condition for Team Select — has no store support, no picker, and no battery laws. Signing would certify a shell that fails the Owner's stated acceptance test.
4. **Checks 5, 10, 11, 12 are UNKNOWN to me,** not green: I did not run the battery or any browser check, and the REPORTED numbers (75/0/10/3, 284 engine tests) are someone else's receipts from a different pin. A signature on REPORTED numbers is not a signature.
5. **Check 8 fails as a claim.** There is no single seam (65 imports, 15 files). The merge is real work across many screens, and the checklist should price it, not hide it.

**What would change my answer:** one named pin (check 0) with byte-identity re-verified in both trees (check 1); the delivery published so deployment and delivery agree (check 2); the slot store change landed and its laws green (check 6); the battery re-run from a clean extract at the cutover pin (check 5); and the browser laws (10, 11, 12) run by a seat that may run them, with the output pasted. At that point the remaining items (seam shape, OT clock, week-1 derivation) are known costs with owners, not open questions — and I would sign a checklist that says so plainly, with the costs written on it.

**What I am NOT saying:** the shell is bad. Slices 1–5 are substantial, engine-true work — the method tooltip carrying the engine's own numbers, the needs filter honouring flex routes, corrupt-never-repair, the proven seed card — and the battery discipline (75 laws, each asserted through the real UI) is exactly what a mergeable shell looks like. The gap between this shell and a signable one is a pin ruling, a publish step, a store change, and a re-run — not a rebuild. But a checklist that signs anyway would be a certificate, and the prompt forbids those for a reason.
