# PROMPT — for Z.ai: the next sitting (≥30 minutes) — four slices, two frameworks, the written questionnaire, and the flex facts
**From:** INKLING (council seat), folding ERNIE's 0bef403a sitting design with INKLING's 2026-11-15 byte checks · **Date:** 2026-11-15 · **For:** Z.ai (Executor) — relayed by the Owner
**Supersedes:** every prior prompt draft (continuation v2/v3, the handover delta, my 2026-11-14 full sitting, ERNIE's 9de12c0b/0bef403a). If two files in your possession disagree, follow this one; stop, say so, and cite the other file's path.

**Sized for at least 30 minutes of real work.** Order: §1 is minutes · §2 is the substance and the bulk of the time · §3 is a file you write while §2 runs · §4 is minutes. **Do not stop after §1.**

**Standing order:** do not queue work. Complete it before replying. Anything you cannot finish, name the blocker exactly and stop. Do not spend the sitting on git push.

---

## 0 · State of play — what is settled, and what is not

**Settled. Do not re-measure, re-derive or re-open:**
- The two-arm build's **five ties** — offline 0/0 · cold load ±100 ms · 390 px both · both type checkers pass · **99 vs 103 lines**.
- **The one separation: bundle, Svelte −11.6 KB gz** (105,756 → 94,197) — and see §1.1 for the arithmetic fix there; the receipt's conclusion is built on the JS-only delta of 11,569 B.
- The `feed.ts` OT defect (l.59–60: `Q4 -5:00`) and the Vite `crossorigin` `file://` finding.
- The **estimator**: window 0.0130 → target per-cell SE 0.0046 · **minimum resolvable cell ≈ 541 games** · REG pooled 2,639 clears it 4.9× · **POST 122 never at this volume**.
- The **pin migration table**: seed 1115, **1/32 identical**, QB→FS **10 → 12**, cross-side **4 → 12**, same-slot **−900 → −3,300** — and note for the record that the same-slot example was confounded by the flex reprice (penalty moved 4 → 12; effOvr moved 70 → 62); attribution, not the numbers, was the filing's error. The clean discriminator slot exists: **TE→OLB = 6 at both pins**.
- The **Slice 4 re-run**: 61/0/10/3 + 18 feed laws · DOM ≡ VM on all four numbers · engine 284/0.
- The residues · the Owner's 2026-11-15 rulings (pin `d3bd81d2` · save = one blob + version check · λ accepted · framework narrowed to two arms · React removed · Title Odds rejected · ratings not yet · the two red tests fixed · 1,953 in the copy).

**Not settled — this sitting:** the two receipt defects (§1), the four-slice slope test (§2), the written questionnaire (§3).

**Your last verdict:** *"Svelte 5, narrowly — and the narrowness is itself the finding."* You named the falsifier yourself: *"This panel is one screen; the proxy's tie at one screen does not predict four."* **This sitting measures the four.**

---

## §FLEX · The live table — confirmed from three refs (cite, never re-measure)

The live flex table, at HEAD of the two branches that matter, is one file, one sha, mirrored twice:

```
origin/architect/engine-and-seats:tools/mathlab/flex.json  -> 0a26d7c225cb7ec8  99 leaves  QB: { FS: 12 }
origin/council/muse:tools/mathlab/flex.json               -> 0a26d7c225cb7ec8  99 leaves  QB: { FS: 12 }   (mirror, byte-identical)
d3bd81d2:tools/mathlab/flex.json                          -> 0a26d7c225cb7ec8  99 leaves  QB: { FS: 12 }   (R-2's ruled pin)
colors/src/sports/nfl/engine/flex.ts @ 03640133           -> QB: { FS: 12 }     (inline agrees)
```
Tiers: **23 @ 12 · 43 @ 6 · 10 @ 2 · 23 @ 0**. Retired REV 4 (`28a2e993…`, 107 leaves, QB→FS **10**) lives only on pin `4ca9a071` and in `council/ernie:tools/mathlab/flex.json` — **do not cite it anywhere.** `flex.ts` and its companion `lineup.test.ts` move as a pair on every re-pin.

**Also live, wrong, and not MUSE's to cite as live:**
- `AGENTS.md` l.73 — "QB flex ONLY to FS, at −10 … flex.json (REV 4) governs" — self-contradicts l.50 of the same file. MUSE's one-line fix.
- `PROJECT-KNOWLEDGE.md` — "97-rule … expected 105" — never landed; the live table is 99.
- `67-cakepanz-s3-s4-rev2/tools/mathlab/flex.json` — a faithful vendor of pin `4ca9a071` (REV 4), labeled by `flex.json.VENDOR-NOTE.txt`, correct for the contract, **not citable as live**; `flex-live/tools/mathlab/flex.json` beside it is the live one.

**One correction to your delivery, now written:** the review union of the save wave and 2026-11-15 found one prose-vs-receipt mismatch in your pin-migration filing (row 4 — the "same penalty / pure replacement effect" attribution; your receipt says penalty 4 → 12). The numbers were right; the attribution was wrong; the affected finding is noted there, not used elsewhere.

---

## 1 · First — the two receipt defects (minutes, no rebuild)

### 1.1 The bundle totals do not equal the per-file figures
`framework-two-arm/receipts/two-arm-bundles.txt` — vue: 340,358 + 3,695 = 344,053 raw ✓; gzip: 104,481 + 1,365 = 105,846 ≠ stated 105,756 (90 short). Svelte: 94,277 ≠ 94,197 (80 short). **Cause:** almost certainly `gzip -9` of the concatenation. Legitimate method — but unlabelled, and a reviewer who adds the columns files a false defect. **Fix, and say which:** (a) make the total the sum, or (b) keep the concatenation and add: *"totals are gzip -9 of the concatenated js+css; per-file figures are separate gzips and do not sum to it."* **Also state which number the delta comes from** — the JS-only delta is 104,481 − 92,912 = **11,569 B**; that is the number the −11.6 KB conclusion is built on.

### 1.2 The arms' `dist/` are not shipped
Bundle is the only criterion that separated the arms and the one number a reviewer cannot re-derive without `npm install && npm run build` in both. **Add to the receipt:** the exact commands + Vite version + Node version · sha256 of each shipped asset in both arms · the raw and gzip sizes as the shipped script computes them. **Do not ship dist/** — ship the hashes and the version line.

### 1.3 The two stale slice manifests (GLYPH's catch)
`sha256sum -c CHECKSUMS-slice1.txt` → `WARNING: 9 lines are improperly formatted` · `CHECKSUMS-slice2.txt` similar; hash checks still pass. Both carry an in-band prose header that slice3/slice4 don't. **Fix: normalize both to slice3's format exactly, and say in the reply what you found in them.** Do not guess the format — read it, then match.

---

## 2 · Second — the four-slice slope test (the substance; this is most of the sitting)

**Your falsifier #1, verbatim:** *"A full four-slice port measured, not this one panel: if Vue's composables + devtools show a lines-per-feature slope >15% better than Svelte's across the board + team-select + saves + feed, the maintainability edge flips and the bundle's 11 KB becomes noise — I'd switch to Vue."*

**Build it. Both frameworks, same surface, same fixture, same engine bytes, same chrome.**

### 2.1 The four slices
| Slice | What it must do |
|---|---|
| **Board** | draft board: the user team's picks, the best-available list, a pick action through the real reducer |
| **Team select** | 32; the choice persists; the pool re-renders for that team |
| **Saves** | 3 slots; save; load; **refuse a corrupt envelope with a plain message**; **refuse a newer version** |
| **Feed** | the panel you already built in both arms — **reuse it, do not rewrite it** |

**The engine stays the vendored pin. The view-model stays the plain-JSON law. The framework is the only variable.**

### 2.2 Measure the slope, not the total
| Measurement | How |
|---|---|
| **Lines per feature** | framework-owned app code (entry + root + screen + store glue) **per slice separately**, then the total |
| **Cumulative** | 1 slice (known: **99 / 103**) → 2 → 3 → 4. **Is the slope widening, flat, or closing?** |
| **Store/state code** | lines per framework for the same state — composables vs runes will show here |
| **Type-check effort** | errors on first run; **quote the two worst checker messages verbatim** |
| **What you wrote twice** | every duplicated logic, with line counts of each copy |
| **What the framework gave you free** | every place the framework removed code you expected to write |
| **Debugging** | one real bug per arm; **which error message told you the truth faster — quote both** |
| **Rebuild after a change** | time a one-line copy change to rebuild, per arm |

### 2.3 Then answer the slope question — in one sentence
**State the threshold BEFORE you read your own result** (q13), then:
- **Vue's slope >15% better** → the falsifier fires → **switch to Vue**, and say so.
- **The gap holds, or Svelte's slope is better** → the falsifier does not fire → **stay on Svelte**, and say why.
- **Inside 15% either way** → **"inside the band, no signal"** — do not manufacture a winner.

---

## 3 · Third — the written questionnaire (a FILE, not a reply)
**You run in a sandbox with no memory between sessions.** Every answer re-derived from the bytes in front of you.
**Write it to: `framework-two-arm/PREFERENCE-INTERVIEW.md`** — inside the delivery, under the same MANIFEST.
**Rules:** one section per question, in order. One short paragraph + `evidence: <command or file and line>` per answer. **If you cannot produce the evidence, write `evidence: NONE` and say what you would have needed.** An answer with no evidence reads as an opinion.

### A · About the code that exists
1. **Which file in each arm carries the most logic?** Name it, its line count, and the command that counted it.
2. **What did you have to write twice?** Every place the same logic exists in both arms, **with the line count of each copy**.
3. **Where did each framework fight you?** Template restriction, unsilenceable type error, state pattern that didn't fit — **quote the error text verbatim**.
4. **Which file would you least like to open in six months, and why?** (size / state held / dependents — say which, give the number.)
5. **What did the framework give you free?** Every place it removed code you expected to write — name the file where the code is absent.

### B · About the failure modes
6. **Which gave you the better error message?** Run both type checkers from clean; quote the two worst, one from each, verbatim.
7. **Which would fail more quietly in production?** Point at the **absence of a check**: the runtime error neither checker would catch, and what you would add.
8. **What does each dev build tell you that the other's does not?** List what appears in each console.

### C · About the decision, not the code
9. **What is the cost of being wrong?** (migration cost at slice 8, per direction, from §2 counts.)
10. **Which has the better answer to "the Owner wants a native shell in two years"?** Say what actually changes — renderer, build target, state layer — **do not assert without a source you can name**.
11. **What did you NOT measure that you should have?** Could it change the answer? **Measure it now if it is cheap.**
12. **Where does your confidence come from — a measurement, or the fact that the tree you build in is Svelte?** Answer by removing familiarity: if the four-slice numbers were identical and the tree were greenfield, which would you pick? **That is the answer to record.**

### D · About the band
13. **Is 15% the right threshold for the slope?** Write the threshold into this file BEFORE §2.3's result so it cannot be chosen after the answer.
14. **What single measurement would make you switch tomorrow?** One, named, cheap enough for the Owner to order next sitting.
15. **If the Owner forced you to ship both forever, which would you rather maintain?** Answer from the line counts and store/state counts, **not from preference**.

### E · Tracking questions (blunt answers beat flattering ones)
16. What did you plan vs what you shipped? Name the variance — what dropped, and why.
17. What took longer than expected? Name the thing and the reason. If nothing did, say so plainly.
18. What did you skip, and would you have shipped it if the sitting had been twice as long?
19. Which files changed unintentionally? Run `git status`; list every one. If none, show the command.
20. What is the weakest part of this delivery? Not the part you are proudest of — the part a hostile reviewer opens first.
21. What would a hostile reviewer attack first? Name it and answer the attack now.
22. Did anything measured this sitting contradict something filed earlier? Withdraw it on the record — correction, not failure.
23. What did you assume without checking? List every assumption including the small ones.
24. What do you not understand well enough to be confident about? `UNKNOWN` is an acceptable answer and a better one than a guess.
25. What would you do differently in the next sitting? One sentence.

---

## 4 · The verdict — last, and in the same file
1. The slope answer (widened / held / closed / inside the band). 2. Your preference with the strongest single reason. 3. The strongest argument against your own preference — steelmanned, not dismissed. 4. Confidence as a percentage + what would move it ten points. 5. The falsifier, restated: the one measurement that flips you.
**The measurement decides, not the seat. If the data says Vue and you prefer Svelte, say both.**

---

## 5 · What not to do
- Do not re-measure §0's settled list. Do not edit `colors/`, the engine, the pin's `flex.ts`. Do not ship `dist/`. Do not rewrite Slice 4. Do not answer §3 from memory. No git push.

## 6 · Reply format
Table first: item · status (`DONE` | `BLOCKED` | `UNKNOWN`) · receipt · one line each. Then four lines per item: `cwd · command · ref@sha · output`. Then one line:
`PREFERENCE-INTERVIEW.md written at <path> — 25 answers + the five-part verdict inside.` Then:
```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <the two receipts; the four-slice slope test + numbers; the questionnaire file>
2. STILL-BLOCKED: <...>
3. NEW INPUTS: <...>
4. OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

— INKLING · 2026-11-15 · folding ERNIE's 0bef403a + INKLING's byte-checks · the flex facts cite INKLING's three-ref verification at this sitting · nothing here moves a ruling — those are the Owner's.
