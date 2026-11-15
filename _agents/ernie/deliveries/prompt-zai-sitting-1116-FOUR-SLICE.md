# PROMPT — for Z.ai: sitting 2026-11-16 — close the two receipts, then the four-slice slope test and the preference interview

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T07:30Z
**For:** Z.ai · **Rel/absent:** no push; folder + MANIFEST handover.

**Standing order:** do not queue work. Complete it before replying. Anything you cannot finish, name the blocker exactly and stop. Do not spend the sitting on git push.

---

## 0 · What last sitting settled, and what it did not

**Settled — do not re-measure:** the two-arm build's five ties (offline · cold load · 390 px · type check · 99 vs 103 lines) · the `feed.ts` OT defect (l.59–60, verified) · the Vite `crossorigin` `file://` finding · the estimator (min resolvable cell ≈ 541 games; POST never at this volume) · the pin migration table (seed 1115: 1/32 identical, QB→FS 10→12) · the Slice 4 re-run (61/0/10/3 + 18 feed laws, DOM ≡ VM) · the five residues.

**Not settled — this sitting's work:** (1) two receipt defects, (2) the four-slice slope test that your own falsifier #1 asks for, (3) the preference interview.

**Your preference stands on one criterion.** Bundle separated (Svelte −11.6 KB gz); everything else tied. You said so yourself: *"This panel is one screen; the proxy's tie at one screen does not predict four."* **This sitting measures the four.**

---

## 1 · First — the two receipt defects (thirty minutes, no rebuild)

### 1.1 The bundle totals do not equal the per-file figures

`framework-two-arm/receipts/two-arm-bundles.txt` reads:

```
-- arm-vue --
index-BZNqWY9E.js: raw 340358 B · gzip-9 104481 B
index-BTejQ6u0.css: raw 3695 B · gzip-9 1365 B
-- totals --
arm-vue total: raw 344053 B · gzip-9 105756 B
```

**The raw total adds up** (340,358 + 3,695 = 344,053 ✓). **The gzip total does not** (104,481 + 1,365 = 105,846, not 105,756 — 90 B short). Same for Svelte: 92,912 + 1,365 = 94,277 against a stated 94,197 (80 B short).

**What is almost certainly happening:** the total is `gzip -9` of the **concatenation**, not the sum of the separately-gzipped files. Concatenating first is slightly smaller because the second file's dictionary already holds much of the first's content. That is a legitimate method — but the table does not say so, and **a reviewer who adds the columns gets a different number and files a false defect.**

**Fix, one of these, and label which:**
- **(a)** make the total the **sum** of the per-file gzips (105,846 / 94,277), and state that the concatenation-gzip is not used; **or**
- **(b)** keep the concatenation method and add one line: *"totals are `gzip -9` of the concatenated js+css; per-file figures are separate gzips and do not sum to it."*

**Also state which number the delta is computed from.** The table says Svelte is −11.6 KB gz (11,559 B); the **JS-only** gz delta is 104,481 − 92,912 = **11,569 B**. Both round to −11.6 KB and the verdict does not move — **but a receipt must contain the number its own conclusion is built from.**

### 1.2 The arms' `dist/` are not in the delivery

Bundle is **the only criterion that separated the two arms**, and it is the one number a reviewer cannot re-derive without `npm install && npm run build` in both arms (network, minutes). That is a legitimate choice — `dist/` is rebuildable build output — **but then the receipt must carry enough to check it without rebuilding.** Add to `receipts/two-arm-bundles.txt`:

1. the exact command, including the Vite version and the Node version;
2. **the sha256 of each shipped asset** (`index-*.js`, `index-*.css`) in both arms;
3. the raw and gzip sizes **as computed by the shipped script**, so a reader can confirm the script's arithmetic without a build.

**Do not ship `dist/` if the convention forbids it. Ship the hashes and the version line.**

---

## 2 · Second — the four-slice slope test (the substantive work)

**Your falsifier #1:** *"A full four-slice port measured, not this one panel: if Vue's composables + devtools show a lines-per-feature slope >15% better than Svelte's across the board + team-select + saves + feed, the maintainability edge flips."*

**Build it.** Not a demo — the real surface, both frameworks, same feature set.

### 2.1 The four slices, identical in both arms

| Slice | What it must do |
|---|---|
| **Board** | the draft board: the user's team's picks, the best-available list, a pick action through the real reducer |
| **Team select** | choose a team from 32; the choice persists; the pool re-renders for that team |
| **Saves** | three slots; save; load; **refuse a corrupt envelope with a plain message**; refuse a newer version |
| **Feed** | the panel you already built in both arms — **reuse it, do not rewrite it** |

**Same fixture, same engine bytes, same chrome, same store shape in both.** The engine stays the vendored pin; the view-model stays the plain-JSON law. **The framework is the only variable.**

### 2.2 Measure the slope, not the total

The single panel told us nothing about slope. This measures it:

| Measurement | How |
|---|---|
| **Lines per feature** | count framework-owned app code (entry + root + screen + any store glue) for **each slice separately**, then the **total**. Report the **per-slice delta** and the **slope** (lines added per additional slice). |
| **Cumulative lines** | 1 slice (known: 99 / 103) → 2 → 3 → 4. **Is the gap widening, flat, or closing?** |
| **Store/state code** | how many lines each framework needs for the same state. This is where a composable-vs-runes difference would show. |
| **Type-check effort** | errors on first run, and which framework's checker named the problem more usefully. **Quote the messages.** |
| **What you wrote twice** | list every place you duplicated logic that the framework could not share. |
| **What the framework gave you free** | list every place the framework removed code you expected to write. |
| **Debugging** | one real bug you hit in each; which error message told you the truth faster. **Quote both messages.** |
| **Rebuild after a change** | time a one-line copy change to rebuild, per arm. |

### 2.3 Then answer the slope question

**One sentence:** did the gap widen, hold, or close — and therefore, does your falsifier fire?

- **If Vue's slope is >15% better** → your falsifier fires → **you switch to Vue**, and you say so.
- **If the gap holds or Svelte's slope is better** → the falsifier does not fire → **you stay on Svelte**, and you say why.
- **If it is inside 15% either way** → say **"inside the band, no signal"**, and do not manufacture a winner.

---

## 3 · Third — the written questionnaire (answers are a FILE, not a reply)

**This is not an interview.** You run in a sandbox with no memory between sessions, so nothing here asks you to recall how a session felt. **Every answer must be re-derived from the bytes in front of you**, and the whole thing is written to one file:

**`framework-two-arm/PREFERENCE-INTERVIEW.md`** — in the delivery, under the same MANIFEST.

**Rules for that file:** one section per question, in order. Each answer is **one short paragraph plus a required evidence line** (`evidence: <command or file and line>`). **If you cannot produce the evidence, write `evidence: NONE` and say what you would have needed.** An answer with no evidence is an opinion and will be read as one.

### About the code that exists

1. **Which file in each arm carries the most logic?** Name the single file, its line count, and the command that counted it.
   *evidence: `wc -l` on the named file in each arm.*

2. **What did you have to write twice?** List every place the same logic exists in both arms because the framework could not share it — and **give the line count of each copy.**
   *evidence: `grep -c` or `wc -l` per copy.*

3. **Where did each framework fight you?** Name the specific thing — a template restriction, a type error you could not silence, a state pattern that did not fit. **Quote the error text verbatim** where there is one.
   *evidence: the build/typecheck log line, quoted.*

4. **Which file would you least like to open in six months, and why?** Judge by size, by how much state it holds, or by how many files depend on it — **say which, and give the number.**
   *evidence: line count + import count (`grep -c "from './X'"`).*

5. **What did the framework give you free?** List every place the framework removed code you expected to write — a store, a subscription, a binding, a re-render.
   *evidence: name the file where the code is absent, and the equivalent in the other arm if there is one.*

### About the failure modes

6. **Which gave you the better error message?** **Run both type checkers from clean** and quote the two worst messages, one from each, verbatim.
   *evidence: the two command outputs, pasted.*

7. **Which would fail more quietly in production?** Answer by pointing at the **absence of a check**: name the runtime error that neither checker would catch, and what you would add.
   *evidence: the unchecked path, by file and line.*

8. **What does each framework's dev build tell you that the other's does not?** Turn the dev server on for each and list what appears in the console that is not in the other's.
   *evidence: the two console outputs.*

### About the decision, not the code

9. **What is the cost of being wrong?** Answer by **counting the framework-owned lines** in each arm (from §2's measurement). If you pick wrong at slice 8, the migration cost is that many lines — **state the number for each direction.**
   *evidence: the line counts from §2.*

10. **Which has the better answer to "the Owner wants a native shell in two years"?** Both compile to web. **Say what actually changes** — the renderer, the build target, the state layer — and **do not assert without a source you can name.**
    *evidence: name the source, or write `INFERRED`.*

11. **What did you NOT measure that you should have?** Name it, and say **whether it could change the answer** — and if it could, **measure it now if it is cheap.**
    *evidence: the measurement, or the reason it is expensive.*

12. **Where does your confidence come from — a measurement, or the fact that the tree you already build in is Svelte?** Answer by **removing the familiarity from the question:** if the four-slice numbers were identical and the tree were greenfield, which would you pick? **That is the answer to record.**
    *evidence: the four-slice numbers, restated.*

### About the band

13. **Is 15% the right threshold for the slope?** You set it last sitting. **You may revise it — but state the revision before you read §2.3's answer**, so the threshold cannot be chosen after the result.
    *evidence: the threshold, stated in the file before the slope result.*

14. **What single measurement would make you switch tomorrow?** One, named, and **cheap enough that the Owner could order it next sitting.**
    *evidence: the command that would run it.*

15. **If the Owner forced you to ship both forever, which would you rather maintain?** Answer from the four-slice line counts and the store/state counts, **not from preference.**
    *evidence: the two numbers that decide it.*

## 4 · The verdict, last

**After §3, not before.** State:

1. **The slope answer** (widened / held / closed / inside the band).
2. **Your preference, with the strongest single reason.**
3. **The strongest argument against your own preference** — steelmanned, not dismissed.
4. **Your confidence as a percentage**, and what would move it by ten points.
5. **The falsifier, restated**: the one measurement that flips you.

**§4 goes in the same file**, after §3's fifteen answers — not in the chat reply. **The reply points at the file.**

**The measurement decides, not the seat.** If the slope says Vue and you prefer Svelte, **say both** — the Owner reads the disagreement, not a verdict dressed as one.

---

## 5 · What not to do

- Do not re-measure §0's settled list.
- Do not edit `colors/`, the engine, or the pin's `flex.ts`.
- Do not ship `dist/` if the convention forbids it — ship the hashes and the version line instead (§1.2).
- Do not rebuild Slice 4 — it is done; it is slice 4 of this test's surface.
- Do not spend the sitting on git push.
- Do not answer §3 from memory — every answer needs an evidence line or `evidence: NONE`.
- Do not answer §3 with a verdict — §3 is questions about the code, §4 is the verdict, and both live in the file.

---

## 6 · Reply format

Table first: item · status (`DONE` | `BLOCKED` | `UNKNOWN`) · receipt · one line each.
Then four lines per item: `cwd · command · ref@sha · output`.
Then one line: `PREFERENCE-INTERVIEW.md` written at `<path>`, with §3's fifteen answers and §4's five-part verdict inside it.
Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <two receipts; the four-slice slope test; the interview>
2. STILL-BLOCKED: <...>
3. NEW INPUTS: <...>
4. OWNER STATE: <...>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

— ERNIE (council advisor) · 2026-11-15T07:30Z · read-only on every other seat's branch.