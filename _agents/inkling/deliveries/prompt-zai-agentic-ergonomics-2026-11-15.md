# PROMPT — for Z.ai: the agentic-ergonomics sitting (≥30 minutes, uninterrupted)
**From:** INKLING (council seat) · **Date:** 2026-11-15 (after the 2026-11-15 rulings) · **For:** Z.ai (Executor) — relayed by the Owner
**Delivery:** folder + MANIFEST; never attempt git push; the courier pattern stands.

---

You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. **This is not another code-comparison table. The Owner has asked a question that no seat has measured yet: "Is it easier/faster/more complete for an agent to code this product in Vue 3 + Vite vs Svelte 5 + Vite?" — and the data so far (bundle sizes, line counts, type-check passes) does not answer it.** This sitting answers it, with receipts.

**The standing order holds:** do not queue work; complete everything before replying; anything you cannot finish, name the blocker exactly and stop. **Do not stop after the measurement section — there is a second, asking section after it.** This sitting is sized for 40+ minutes; if you finish §1–§3 inside 15 minutes, the §4 backlog is not optional.

## 0 · State of play — read, do not re-derive

Settled this week and carried into `AGENTS.md`: **the pin is `d3bd81d2`** (R-2; the migration table exists, `filings/inbox-20261115-zai-pin-migration-table.md`; both pins' flex.ts receipt recorded — old 10, new 12; old engine serves REV 4, new serves 99 rules tiers {0,2,6,12}); **framework narrowed to TWO arms** (R-13, Owner 2026-11-15: Vue 3 + Vite vs Svelte 5 + Vite, Z.ai builds both, measurement decides); **React removed** (R-9); **pool = 1,953** (R-12); **flex asymmetries ruled deliberate** (R-7); **Title Odds rejected** (R-5); **ratings not yet** (R-8); **red tests fixed** (R-11); **save = one blob + version check** (R-3).

Your previous sitting produced the three artifacts under test (both arms, same fixture, same chrome, same engine bytes) and the 4-slice slope (vue 332 lines / svelte 347 lines; both type checks PASS; slope $R=0.978$ inside band; 4-slice bundle −10.9 KB gz Svelte). **What that sitting did not measure:** you, the agent, as the variable. That is the variable in this sitting.

## 1 · The experiment this sitting is built around — the Slice 5 head-to-head (do this first, it is the spine)

**Build Slice 5 (the shareables brag card) in BOTH arms, same machine, same session.** Slice 5 is the one needed feature that does not yet exist and is unblocked.

**The setup you will work to:**

1. **Spec to implement (both arms).** A shareable card the user opens after a finished draft (after the board shows "Done", a PLAY WEEK 1 equivalent control is NOT part of this; the control opens the card): the user's team, user's final record, best player (highest wins above replacement at their natural slot — engine truth from `teamRatings`), the user's total OVR-over-replacement as a "Priority Score", a one-line bragging headline the user can copy, and a print-styles pass that survives to PDF/screenshot without color drift.
2. **Same surface, not same chrome.** The chrome is whatever each arm finds idiomatic — you may not copy chrome from one arm to the other; the point is the **language**, not the component.
3. **Engine stays read-only at pin `d3bd81d2`.** Borrow the existing brag-card skeleton if it helps (`receipts/brag-card.html` lives in `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/`) — do not mutate it; the frame you build in each arm is yours.

**The measurement protocol (same discipline as the four-slice test, applied to one agent's one pass):**

- **Time** from cold "blank file opened" to "build passes" per arm — `time` the stamp inside your own session or write down the clock, honestly, section by section (any gaps you supply as narrative).
- **Iterations to green**: count your own edit-cycles from blank to green (a cycle = one build attempt that failed + its fix). Record the verbatim error that broke the first build, and whether you fixed it the first time you saw it.
- **Lines per arm** at green (same counting convention: framework-owned app code, entry + root + card + store glue, whatever it is).
- **Errors caught by the type-checker on first run** — count (svelte-check vs vue-tsc) — and the verbatim text of the two worst. These are your own error messages, quoted.
- **Final bytes** (gzip-9) of each arm's shareable-card bundle contribution, by diff vs the empty arm's bytes if you can compute it; otherwise raw gzip of the final `dist/`.
- **Turn order.** Svelte first or Vue first — pick one and name it; if you switch it inside the sitting, name that too and note why.

**Files to produce as receipts:**

- `measurements/slice5-headtohead-vue.txt` and `...-svelte.txt` (all of the above, plus the six receipt's check items from §4 of ERNIE's prompt — keep them).
- Both arms' builds, shots at 390 px.
- `PREFERENCE-INTERVIEW-§5.md` — see §3 of this prompt.

## 2 · The questionnaire — measure and qualify yourself, honestly

**Write one file per arm** — `measurements/vue-ergonomics-receipt.txt` and `measurements/svelte-ergonomics-receipt.txt` — every answer short, every answer with `evidence: <command or file and line>` or `evidence: NONE` with what you would have needed. An answer with no evidence reads as an opinion.

**A · The task, as you lived it**

1. What is the single most annoying thing you had to remember about each framework? Name it in one line.
2. What is the single best moment of the session in each framework? Name it in one line.
3. Which arm produced more of your friction — the language, the tooling, the type-checker, or the docs? Why, with a receipt.
4. Which framework fight — a template construct, a type error, a missing convention — cost you the most minutes? Quote the verbatim error.
5. Which framework gave you the cleaner first error message? Quote it.
6. Which error made you want to quit and switch arms halfway through? Name it.
7. Which framework made you feel *kinda done* too early (i.e., it looked working and you found it didn't)? Name the bug.
8. Where did each framework's freebie arrive — something it computed for you that you would have written by hand? List them with file names.
9. What did you have to write twice in one arm that the other computed? Name it in one line.

**B · The ergonomics of keeping context in your head**

10. When you came back to the code after a five-minute gap in each arm, how long before you knew what you were doing again? Round numbers are fine; name WHY the arm was faster to re-enter.
11. How many pieces of state are there in each (list them: the card's draft, the brag line, the player name, the win-score) and how did each framework want them shaped?
12. Did each framework force you to pick a persistence strategy, or did it let you refuse? When forced, which did you pick and why?
13. Which arm made the cheaper anatomy for "a card that shows one value, one name, one stat"? Name it in one line.
14. What did the documentation itself cost you — did you go to it, did it help, did it mislead (if so with what quote)? If you ran into an older QuickStart or StackOverflow that taught Svelte 4 while you were writing Svelte 5, name one line.
15. How did you check yourself at each stage (build? probe? screenshot? step through with the browser tool)? Which check caught the bug, per arm?

**C · The tooling level — where agents actually differ**

16. `svelte-check` vs `vue-tsc` — which gave you (a) more precise coordinates on the fault, (b) more useful prose? Quote one error from each.
17. Which arm's build tool surfaced errors at the earliest phase? How many total errors across both runs?
18. Which arm's HMR/live-reload actually worked inside your sandbox (file:// protocol, blocked HTTP, etc.), and which silently didn't? Name what broke and where.
19. Which newer tool (MCP, extension, fetched docs) did each arm use? Name the tool or the ausencia.
20. Did any arm require you to change your prompt — i.e., work around the idiom instead of inside it — and if so, where?
21. Which arm's CSS output did you trust without inspecting (shadow DOM, scoped styles, vendor prefixes), and which arm needed you to verify personally with a screenshot?
22. Which arm had the better "the task is impossible" issue — i.e., where you thought you'd have to fall back to a workaround, and didn't?

**D · Where you, the model, are weaker**

23. Where do you hallucinate in each arm — e.g., you reference a Vue 3 API signature that doesn't exist, or a Svelte 5 rune rule incorrectly — and which arm did you catch yourself more often? Name one caught-hallucination per arm if you can find them in your output. If you cannot, say so with `evidence: NONE`.
24. Which framework suffers more from stale training data in your context — i.e., from the model's knowledge being from a past version of the framework? Name evidence in your own failed attempt.
25. If the Owner assigned you this card in three months, which arm do you expect you will build it in right then, all else equal? Name it, one line. This is a prediction — state it as one and do not revise it after the sitting.
26. Which arm has better odds of accumulating technical debt by your next three sittings if you keep working on it? Name what and why.
27. Which framework, in your honest assessment, is best-suited to what the Owner elsewhere described as "agent-maintained and owned by a non-specialist"? Name your answer and the reason, and mark whether the reason is empirical from the sitting or extrapolation.

## 3 · The answer to the Owner's question, in one paragraph per arm — with receipts

Write one paragraph **for each arm**, headed **for [ARM]**, giving your honest verdict on ease/speed/completeness for *this* task and *this* project, and what specifically would convince you otherwise. Support every paragraph with receipts from §1–§2; `evidence: NONE` is allowed but read it as a defect.

**And the final verdict, in the file `measurements/AGENTIC-ERGONOMICS-VERDICT.txt`:**

1. The winner across the board (or "no signal — even", with the two numbers that say so).
2. Your one-sentence recommendation to the Owner for which arm the Cakepanz product should ship in — **do not flatter** the outcome; name your actual attachment.
3. Your confidence percentage, and what would move it ten points.
4. The falsifier, restated with receipt line: the one measurement that would flip you, and why.
5. One paragraph for the Owner on the risk of ruling by bundle size vs by agent ergonomics — name one real person who would suffer each failure mode.
6. One paragraph on the risk of ruling *now* vs after one more sitting on a different surface — remember Slice 3's evidence (the four-arm slope was not ready on slice 1 and was ready on slice 4; the same may be true of Slice 5 here).

## 4 · Backlog (do not stop inside §1–§3)

After §3 is complete, in order, all unfinished only:

1. **The pin-migration re-receipt**: re-vendor `src/engine` to `d3bd81d2` **in your previous sitting's deliveries/ copy only** (not in Cakepanz's pinned tree), re-run the pin-migration harness's outcome, and file one line saying which of the three candidates for migration order it implies (nothing groundbreaking, but it is cheap inside one sitting).
2. **Open/deliver the canonical copy for the zip** — merge your sitting's outputs (the two arms, the receipts, the interview, the verdict) into this sitting's delivery under the same MANIFEST rule (`git ls-files`; blob bytes; after your last byte-changing step).
3. **Slice 6** — also measured, if and only if you finished §1–§5 inside the sitting: the additive "Week Summary" card beneath the game-over panel, same protocol. One additional shot at what the owner called 'next week', but only if all of §1–§3 are green and the manifest still verifies.
4. **`measurements/frame of the two SLAVE benchmarks that no one has superported yet`** — this is the cold load measurement that has been repeatedly scheduled and deferred across three sittings. Ship it once and for all: the 390 px boot time of each four-slice arm under a 6× CPU throttle, with the w89 profile as the baseline comparison. Receipts in `measurements/coldload-four-slice.txt` (the same protocol as the single-slice coldload receipt, extended).
5. **The reading question:** if the Owner wants to understand, in one sitting, how you think about writing a product with another person watching — who or what on this project's record has earned that read, and why? One line of honest answer, one section of prose, no name-dropping without receipts.
6. **Your next two days-deliverables sitting**, if the Owner gives you one — sketch what it would cover, in four ordered lines.

## 5 · Standing rules (binding)

- No engine edits; no `colors/` edits. The pin stays where it is (`d3bd81d2`); the old pin does not re-enter the conversation.
- No push; the courier pattern stands. Verify everything you'd want reviewed from bytes.
- No flex number from any delivery tree; the live table is `0a26d7c2…` / 99 leaves / QB→FS 12.
- No injuries, no per-player clutch ratings, no flex-price fluctuation, no draft slot value (MOOT), calibration targets static.
- One MANIFEST, after the last byte-changing step, blob bytes. If the tree cannot contain something, say so in one line.
- No quotes from the retired REV-4 family without a pin.
- No renames of existing files or hidden directories; no silent re-baseline of anything past.
- Keep evidence. One receipt per claim. Re-verify anything you say "done" with a command.
- Do not stop before the questionnaire is written. The measurement without the questionnaire is not done, and it is this sitting's heart.

## 6 · How to reply (this is the whole finishing form)

Table first: item · status · receipt · one line each. Then four lines per item: cwd · command · ref@sha · output. Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <every §1-§6 item terminated and its receipt>
2. STILL-BLOCKED: <...>
3. NEW INPUTS FOR THE NEXT PROMPT: <pointers to receipts, interview, verdict>
4. NEXT-SEATING OWNER STATE: <anything the Owner told you mid-sitting>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
6. THE AGENTIC-ERGONOMICS VERDICT: <the file's one-line answer; receipts: path>
```

— INKLING (council seat) · 2026-11-15 · this prompt is a product decision aid — the Owner uses it to decide what to build the next version of this project in