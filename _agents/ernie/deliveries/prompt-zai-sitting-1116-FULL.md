# PROMPT — for Z.ai: the next sitting (≥30 minutes) — four slices, two frameworks, and the written questionnaire

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T07:45Z
**Supersedes:** every prior Z.ai prompt draft. **If two files in your possession disagree, follow this one; stop, say so, and cite the other file's path.**

**Sized for at least 30 minutes of real work.** Order: §1 is minutes · §2 is the substance and the bulk of the time · §3 is a file you write while §2 runs · §4 is minutes. **Do not stop after §1.**

**Standing order:** do not queue work. Complete it before replying. Anything you cannot finish, name the blocker exactly and stop. Do not spend the sitting on git push.

---

## 0 · State of play — what is settled, and what is not

**Settled. Do not re-measure, re-derive or re-open:**

- The two-arm build's **five ties** — offline 0/0 both · cold load inside ±100 ms · 390 px clean both · both type checkers pass · **99 vs 103 lines** (the maintainability proxy).
- **The one separation: bundle, Svelte −11.6 KB gz** (105,756 → 94,197).
- The `feed.ts` OT defect (l.59–60: `Q4 -5:00`) and the Vite `crossorigin` `file://` finding.
- The **estimator**: window 0.0130 → target per-cell SE 0.0046 · **minimum resolvable cell ≈ 541 games** · REG pooled 2,639 clears it 4.9× · **POST 122 never at this volume**.
- The **pin migration table**: seed 1115, 1,024 picks both pins, **1/32 user picks identical**, QB→FS **10 → 12**, cross-side **4 → 12**, same-slot **−900 → −3,300**.
- The **Slice 4 re-run**: 61/0/10/3 + 18 feed laws, DOM ≡ VM on all four numbers, engine 284/0.
- The five residues (README `-h`, "all eight", verification-1 path, join caveat, flex.ts line).
- The Owner's twelve rulings of 2026-11-15 (pin `d3bd81d2` · save = one blob + version check · λ accepted · framework narrowed to two · React removed · Title Odds rejected · ratings not yet · fix the two red tests · 1,953 in the copy).

**Not settled — this sitting:** the two receipt defects (§1), one packaging nit (§1.3), the four-slice slope test (§2), the written questionnaire (§3).

**Your last verdict:** *"Svelte 5, narrowly — and the narrowness is itself the finding."* You named the falsifier yourself: *"This panel is one screen; the proxy's tie at one screen does not predict four."* **This sitting measures the four.**

---

## 1 · First — the two receipt defects (minutes, no rebuild)

### 1.1 The bundle totals do not equal the per-file figures

`framework-two-arm/receipts/two-arm-bundles.txt`:

```
-- arm-vue --
index-BZNqWY9E.js: raw 340358 B · gzip-9 104481 B
index-BTejQ6u0.css: raw 3695 B · gzip-9 1365 B
-- totals --
arm-vue total: raw 344053 B · gzip-9 105756 B
```

**Raw adds up** (340,358 + 3,695 = 344,053 ✓). **Gzip does not** (104,481 + 1,365 = 105,846, not 105,756 — 90 B short). Svelte: 92,912 + 1,365 = 94,277 vs a stated 94,197 (80 B short).

**Cause:** almost certainly `gzip -9` of the **concatenation**, not the sum of separate gzips. Legitimate method — **but unlabelled, and a reviewer who adds the columns gets a different number and files a false defect.**

**Fix, and say which:** (a) make the total the **sum** (105,846 / 94,277), or (b) keep the concatenation and add: *"totals are `gzip -9` of the concatenated js+css; per-file figures are separate gzips and do not sum to it."*

**Also state which number the delta comes from.** The table says −11.6 KB gz (11,559 B); the **JS-only** gz delta is 104,481 − 92,912 = **11,569 B**. Both round to −11.6 KB and the verdict holds — **but the receipt must contain the number its conclusion is built on.**

### 1.2 The arms' `dist/` are not shipped

Bundle is **the only criterion that separated the arms**, and it is the one number a reviewer cannot re-derive without `npm install && npm run build` in both. `dist/` is rebuildable output, so excluding it is defensible — **then the receipt must carry enough to check without rebuilding.** Add to `receipts/two-arm-bundles.txt`:

1. the exact command, with the **Vite version and Node version**;
2. the **sha256 of each shipped asset** (`index-*.js`, `index-*.css`) in both arms;
3. the raw and gzip sizes **as the shipped script computes them**, so a reader can check the arithmetic without a build.

**Do not ship `dist/` if the convention forbids it. Ship the hashes and the version line.**

### 1.3 The two stale slice manifests (GLYPH's catch)

```
cmd: cd 67-cakepanz-s3-s4-rev2 && sha256sum -c CHECKSUMS-slice1.txt 2>&1 | grep -vE ": OK$"
out: sha256sum: WARNING: 9 lines are improperly formatted
```

`CHECKSUMS-slice1.txt` and `CHECKSUMS-slice2.txt` **carry a prose header** (`tree: …` / `engine snapshot: …` / `engine tests: …`) that `CHECKSUMS-slice3-slice4.txt` does not. **The hashes all pass — only the format is stale.**

**Fix:** normalize both to the same format as slice3/slice4, **and say in the reply what you found in them.** **Do not guess the format — read what the file actually contains first, then match slice3's shape exactly.**

---

## 2 · Second — the four-slice slope test (the substance; this is most of the sitting)

**Your falsifier #1, verbatim:** *"A full four-slice port measured, not this one panel: if Vue's composables + devtools show a lines-per-feature slope >15% better than Svelte's across the board + team-select + saves + feed, the maintainability edge flips and the bundle's 11 KB becomes noise — I'd switch to Vue."*

**Build it. Both frameworks, same surface, same fixture, same engine bytes, same chrome.**

### 2.1 The four slices

| Slice | What it must do |
|---|---|
| **Board** | the draft board: the user team's picks, the best-available list, a pick action through the real reducer |
| **Team select** | choose from 32; the choice persists; the pool re-renders for that team |
| **Saves** | three slots; save; load; **refuse a corrupt envelope with a plain message**; **refuse a newer version** |
| **Feed** | the panel you already built in both arms — **reuse it, do not rewrite it** |

**The engine stays the vendored pin. The view-model stays the plain-JSON law. The framework is the only variable.**

### 2.2 Measure the slope, not the total

| Measurement | How |
|---|---|
| **Lines per feature** | framework-owned app code (entry + root + screen + store glue) **per slice separately**, then the total |
| **Cumulative** | 1 slice (known: **99 / 103**) → 2 → 3 → 4. **Is the gap widening, flat, or closing?** |
| **Store/state code** | lines each framework needs for the same state — this is where composables vs runes would show |
| **Type-check effort** | errors on first run, and **which checker named the problem more usefully — quote the messages** |
| **What you wrote twice** | every place logic is duplicated because the framework could not share it, **with line counts** |
| **What the framework gave you free** | every place it removed code you expected to write |
| **Debugging** | one real bug per arm; **which error message told you the truth faster — quote both** |
| **Rebuild after a change** | time a one-line copy change to rebuild, per arm |

### 2.3 Then answer the slope question — in one sentence

**State the threshold BEFORE you read your own result** (see §3 q13), then:

- **Vue's slope >15% better** → the falsifier fires → **you switch to Vue**, and you say so.
- **The gap holds, or Svelte's slope is better** → the falsifier does not fire → **you stay on Svelte**, and you say why.
- **Inside 15% either way** → write **"inside the band, no signal"** — **do not manufacture a winner.**

---

## 3 · Third — the written questionnaire (a FILE, not a reply)

**You run in a sandbox with no memory between sessions, so nothing here asks you to recall how a session felt.** Every answer is re-derived from the bytes in front of you.

**Write it to: `framework-two-arm/PREFERENCE-INTERVIEW.md`** — inside the delivery, under the same MANIFEST.

**Rules:** one section per question, in order. Each answer = **one short paragraph + `evidence: <command or file and line>`.** **If you cannot produce the evidence, write `evidence: NONE` and say what you would have needed.** An answer with no evidence will be read as an opinion.

### A · About the code that exists

1. **Which file in each arm carries the most logic?** Name it, its line count, and the command that counted it.
2. **What did you have to write twice?** Every place the same logic exists in both arms, **with the line count of each copy.**
3. **Where did each framework fight you?** A template restriction, a type error you could not silence, a state pattern that did not fit — **quote the error text verbatim** where there is one.
4. **Which file would you least like to open in six months, and why?** Judge by size, state held, or dependents — **say which, and give the number.**
5. **What did the framework give you free?** Every place it removed code you expected to write — name the file where the code is absent.

### B · About the failure modes

6. **Which gave you the better error message?** Run both type checkers from clean; quote the two worst, one from each, verbatim.
7. **Which would fail more quietly in production?** Point at the **absence of a check**: the runtime error neither checker would catch, and what you would add.
8. **What does each dev build tell you that the other's does not?** List what appears in each console.

### C · About the decision, not the code

9. **What is the cost of being wrong?** From §2's line counts: if you pick wrong at slice 8, the migration cost is that many lines. **State the number for each direction.**
10. **Which has the better answer to "the Owner wants a native shell in two years"?** Say what actually changes — the renderer, the build target, the state layer — and **do not assert without a source you can name.**
11. **What did you NOT measure that you should have?** Name it, say whether it could change the answer — and **measure it now if it is cheap.**
12. **Where does your confidence come from — a measurement, or the fact that the tree you already build in is Svelte?** Answer by removing familiarity: if the four-slice numbers were identical and the tree were greenfield, which would you pick? **That is the answer to record.**

### D · About the band

13. **Is 15% the right threshold for the slope?** You set it last sitting. **You may revise it — but write the threshold into this file BEFORE §2.3's result**, so it cannot be chosen after the answer.
14. **What single measurement would make you switch tomorrow?** One, named, and **cheap enough for the Owner to order next sitting.**
15. **If the Owner forced you to ship both forever, which would you rather maintain?** Answer from the line counts and store/state counts, **not from preference.**

### E · Tracking questions — answer these too, and do not soften them

These are how the Owner and the council check the work, not the result. **A blunt answer here is worth more than a flattering one.**

16. **What did you plan to do this sitting, and what did you actually ship?** Name the variance — what dropped, and why.
17. **What took longer than you expected?** Name the thing and the reason. If nothing did, say so plainly.
18. **What did you skip, and would you have shipped it if the sitting had been twice as long?**
19. **Which files changed that you did not intend to change?** Run `git status` before you package, and list every one. If the answer is none, show the command.
20. **What is the weakest part of this delivery?** Not the part you are proudest of — the part a hostile reviewer would open first.
21. **What would a hostile reviewer attack first?** Name it, and answer the attack now.
22. **Did anything you measured this sitting contradict something you filed earlier?** If yes, say so on the record and withdraw the earlier claim — that is a correction, not a failure.
23. **What did you assume without checking?** List every assumption you made and did not verify, including the small ones.
24. **What did you not understand well enough to be confident about?** Name it. `UNKNOWN` is an acceptable answer here and a better one than a guess.
25. **What would you do differently in the next sitting?** One sentence.

---

## 4 · The verdict — last, and in the same file

After §3, in `PREFERENCE-INTERVIEW.md`:

1. **The slope answer** (widened / held / closed / inside the band).
2. **Your preference, with the strongest single reason.**
3. **The strongest argument against your own preference — steelmanned, not dismissed.**
4. **Your confidence as a percentage**, and what would move it by ten points.
5. **The falsifier, restated**: the one measurement that flips you.

**The measurement decides, not the seat.** If the slope says Vue and you prefer Svelte, **say both** — the Owner reads the disagreement, not a verdict dressed as one.

---

## 5 · What not to do

- Do not re-measure §0's settled list.
- Do not edit `colors/`, the engine, or the pin's `flex.ts`.
- Do not ship `dist/` if the convention forbids it — ship the hashes and the version line (§1.2).
- Do not rebuild Slice 4 — it is done, and it is slice 4 of this test's surface.
- Do not answer §3 from memory — every answer needs an evidence line or `evidence: NONE`.
- Do not answer §3 with a verdict — §3 is questions about the code, §4 is the verdict, and both live in the file.
- Do not spend the sitting on git push.

---

## 6 · Reply format

Table first: item · status (`DONE` | `BLOCKED` | `UNKNOWN`) · receipt · one line each.
Then four lines per item: `cwd · command · ref@sha · output`.
Then **one line**: `PREFERENCE-INTERVIEW.md written at <path> — 25 answers + the five-part verdict inside.`
Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <the two receipts; the four-slice slope test + numbers; the questionnaire file>
2. STILL-BLOCKED: <...>
3. NEW INPUTS: <...>
4. OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

— ERNIE (council advisor) · 2026-11-15T07:45Z · read-only on every other seat's branch.