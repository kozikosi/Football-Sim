# PROMPT — for Z.ai: the agentic-ergonomics sitting (≥30 minutes, uninterrupted)
**From:** INKLING (council seat) · **Date:** 2026-11-15 · **For:** Z.ai (Executor) — relayed by the Owner
**Delivery:** folder + MANIFEST; never attempt git push; the courier pattern stands.

---

You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. **You are (pre)credibly the principal executor of this measurement — the Owner believes your context window is the largest of anyone's. Other agents are welcome to run the same tests; the Owner wants that in writing here, so make the bench trivially portable by anyone else.**

This sitting answers one question with receipts: **"Is it easier, faster, and more complete for an agent to build this product in Vue 3 + Vite vs Svelte 5 + Vite — measured across the user's whole start-to-end experience?"** Framework law has narrowed to two arms by the Owner's R-1; the arms are yours to build.

**Standing order holds:** do not queue work; complete everything before replying; anything you cannot finish, name the blocker exactly and stop. **Do not stop after the measurement section — §3 and §4 carry your verdict and the implementation backlog.** Sized for 40+ minutes.

## 0 · State of play — read, do not re-derive

Settled and carried in `AGENTS.md`: **R-2** pin = `d3bd81d2`; **R-13** framework = two arms only (you build both); **R-3** save = one blob + version check; **R-5** Title Odds rejected; **R-9** React gone; **R-12** 1,953 players. Your sitting that completed both arms end-to-end is on `council/inkling:_agents/inkling/deliveries/zai-sitting-2026-11-15-four-slice/`; the four-slice slope was inside the band (no signal). The Owner wants the question that four slices could not answer measured.

Your predecessors this week produced the two arms, the shared chrome, the shared fixture, and the four-slice slope receipt. Use everything they left; adding a portion of new code under the same protocol is the entire point.

**Also on your desk from earlier sittings:** the `feed.ts` OT clock defect at l.59–60 (`Q4 -5:00` negative remainder, `Math.min(4, …)` caps OT at Q4) — **fix or prepare the fix exactly and hand it to the Architect; do not edit `colors/` yourself**.

## 1 · The experiment — Slice 5 (the SliShare/slap item) against your full w89-arrival experience cloned for new agents

**The experiment is wide, not deep. The Owner ruled: evaluation must run across the whole feature arc, end-to-end, not board→saves→feed only.** Any feature in w89 is fair game; your job is to find what each arm cannot yet do and quantify it.

### 1.1 The assignment (both arms, same machine, in one sitting)

Build Slice 5 (the shareables/brag-card) in BOTH arms. This is the one slice that doesn't yet exist and is unblocked.

- **Design brief (Owner verbatim):** "whatever looks similar to w89 … I do think the player cards could be a lot more dynamic and beautiful. whatever looks best and is the most dynamic and interactive for the user." So: the card should look like it belongs to the same family as w89, but feel like a genuinely better interactive product — not a static image, a shareable that reacts.
- **Format is yours to pick** (PNG, HTML, SVG, screenshot via Playwright, etc.). State explicitly which you picked and why in one line; the receipt bar stays the same regardless.
- **Both arms must share the zero engine bytes** with the previous arms (same engine vendor files, same fixture bytes, same chrome) — the variable is the framework.
- **You may borrow or adapt the `receipts/brag-card.html`** skeleton from the ERNIE-vendored v3 delivery; do not mutate it; the frame you actually build is yours.

### 1.2 The measurement protocol (the discipline that separates you from the previous measurement)

- **Wall clock** to green for each arm — both installation and translation, your own honest timing in one line of `date -u +%s` diff per stage.
- **Iteration-cycles** from blank to green per arm (each failed build + its fix).
- **Lines** per arm under the same convention as the four-slice receipt.
- **Type-check errors on first run** per arm (count + quote the two worst verbatim).
- **Build exit codes** and **asset byte totals** (gzip-9) per arm.
- **Agent throughput**, measured any way you'd measure (elapsed-time-to-green can stand alone).
- **Tests-runs-this-sitting** for the Slice-5 surface in each arm, including (at minimum): card renders in both the user's and an opponent's case; claim/sale text is escaped as HTML; the printable version prints cleanly; the card is keyboard-focusable.

### 1.3 Evaluation across the whole w89 arc (your search; report what you find)

The Owner's verbatim: "the framework should be evaluated from the user's start to end process completely. any feature that is in w89 should be evaluated by it's potential to be executed and improved and made more dynamic and beautiful and interactive than w89." So, in addition to Slice 5, measure inside ONE sitting some of the following (not all — pick three for real depth):

1. **Team select.** Pick a team; does the arm do it more cleanly? Evaluate a new feature: an actual animated tour of the 32 teams (onboarding), not just a dropdown. Which arm lands this faster? Lines and wall-clock, even ballpark — with receipts.
2. **The save envelope.** The Owner ruled save = one blob + version check (R-3). **Implement the invariant in each arm's save service (file format unchanged)** and prove the refusal-of-a-newer-build-save path with a fresh seed — one command and one log line each.
3. **Draft step on the board** — the one screen the user will stare at the longest. Evaluate how each arm handles a hypothetical real-time ticker, a bottom-left lineup panel that updates as the user studies players, and a left-rail portrait. Do this cheap — one panel per arm — so you have numbers, not hand-waves.

### 1.4 Per-category winner table (required)

Authoring cost is **one input among several**. The Owner wants a **winner in every possible category**, you name them all — bundle delta; cold boot at w89 profile; line count; type-check error usefulness; rebuild time; iteration count; first-frame paint; keyboard reactivity (all keys <= 20ms for any action); CSS file size; file readability in your head after 5 minutes; every test green; the feel of the Friday-afternoon build — the ones above plus any more you find. For every category you measured, state the winner and the number. **The bundle is the least interesting of these.**

### 1.5 Authoring cost — evaluated separately

Report this separately and prominently. What you paid in keystrokes, thinking lines spent, self-corrections, fresh context opened vs reused, errors fixed襁, file reads, grep calls. Break it down to the unit you like best (tool calls, edit lines, wall-clock) and number it. Compare, explicitly: "was this task harder in Svelte or Vue, holding all else equal, and by how much?"

## 2 · The questionnaire (all required, per arm)

Write one file per arm — `measurements/vue-ergonomics-receipt.txt` and `measurements/svelte-ergonomics-receipt.txt` — every answer short; every answer with `evidence: <command or file and line>` or `evidence: NONE` naming what would have been needed. An answer with no evidence reads as an opinion.

**A · The whole experience from blank to green**
1. What was the single worst problem you had to solve in each arm today? One line each.
2. What was the single best moment in each arm today? One line each.
3. Which arm produced more friction — language, tooling, type checker, docs? Why, with a receipt.
4. Which fight — template constraint, type error, missing pattern — cost the most minutes? Quote verbatim.
5. Which arm produced the cleaner first error message? Quote it.
6. Which error made you want to switch frameworks entirely mid-session? Name it.
7. Which framework gave you a "it almost works" false positive, and what was the bug?
8. Where did each arm's freebie arrive (anything computed for you that you would have written by hand)? List with file names.
9. What did you have to write twice in one arm that the other computed? Name it in one line.
10. Which framework has you (a) recall from docs less, (b) recall from memory more?

**B · Keeping context in your head**
11. Five minutes away from each arm; which one did you re-enter faster and why? Name the reason (visual structure? variable names? HOW you would describe it).
12. List the pieces of state per card (card state, brag line state, player name, win-score, etc.) — how does each arm want them shaped? Idiom matches.
13. Persistence: did each arm force a strategy or let you refuse? When forced, what did you pick and why?
14. Cheaper anatomy for "one value, one name, one stat, one action" — name it per arm in one line.
15. Did the documentation cost you — did you read it, did it help, did it mislead (with quote)? If a StackOverflow / older QuickStart taught you Svelte 4 while you were writing Svelte 5, name it in one line.
16. Your verification loop per arm (build? probe? screenshot? read?) — name which check caught the bug, per arm.

**C · The tooling level — where agents differ**
17. `svelte-check` vs `vue-tsc` — which gave you (a) more precise coordinates, (b) more useful prose? Quote one error from each.
18. Which arm's build surfaced errors earlier? Total errors across both runs.
19. Which arm's HMR/live-reload worked reliably in your sandbox (file:// blocked HTTP) and which was silent? Name what broke, per arm.
20. What newer tool did each arm use — extension, MCP, docs fetch — and which arm relied less on them?
21. Did any arm force you to work around the idiom instead of inside it — where?
22. CSS output: which arm did you trust without inspecting, and which arm needed personal verification (with screenshots)?
23. Which arm had the best "this task is impossible so I should do the unthinkable" moment — and what did you do about it?

**D · Where an agent like you is weaker**
24. Where do you hallucinate in each arm (API that doesn't exist, rune that doesn't compile, directive that doesn't apply)? Name one caught hallucination per arm; if you cannot catch your own, quote the one you missed later and realized.
25. Which framework suffers more from stale pretraining data in your context — and which arm did you catch yourself most often citing APIs/documents prior to the current release?
26. If the Owner assigned you this card in three months, all else equal, which arm would you build it in? Make this a prediction — do not revise after the sitting.
27. Which arm shows the larger technical-debt overhead after your next 3 sittings? Name what and why.
28. Which fits "agent-maintained and owned by a non-specialist" better, with receipts, and mark whether the answer is empirical from sitting or extrapolation?

**E · The full w89 arc**
29. Of the entire w89 product surface (team select → board → save/load → season → playoffs → championship → awards → offseason), which single feature feels most at risk of being harder than it needs to be in each framework? Name it and why.
30. What one feature absolutely must feel at least as good as w89 in either arm, and which arm feels closer to there right now — and why?
31. If the whole product had to be re-shipped on the inferior arm first, what would you lose most? Name one concrete capability.

## 3 · The answer, per arm — one paragraph each, plus the verdict file

Write one paragraph per arm, headed **for [ARM]**, giving your honest verdict on overall ease/speed/completeness for this product, and what specifically would change it. Support every line with receipts; `evidence: NONE` reads as a defect. Then write `measurements/AGENTIC-ERGONOMICS-VERDICT.txt`:

1. The winner across the board — or "even" — and the two numbers that say so;
2. Your **one-sentence** recommendation to the Owner;
3. Your **70%-or-whatever confidence** and one line on what would move it 10 points;
4. The **falsifier, restated** with receipt line — the one measurement that would flip you;
5. The **risk of ruling by bundle size vs by agent ergonomics** — name one person-impact case for each failure mode;
6. The **risk of ruling now vs at next sitting**, with receipt — what changed on Slice 5 vs Slice 4 that made this candidate unstable or stable.

Also commit to the **authoring-cost table** as its own single-excellence receipt — it is the Owner's explicitly separate ask.

## 4 · Backlog — do not stop inside §1–§3

If and only if §1–§3 is done and the manifest verifies:

1. **The pin-migration re-receipt:** re-run the pin-migration harness against `d3bd81d2` in a copy of your delivery tree; file one line on which of the three ruling paths for migration it implies. Saves the Architect a check.
2. **Bump all gates to the current pin** — one sit at `d3bd81d2`, **not** not our default: your previous sitting used pin `4ca9a071`; your delivery bundles must now demonstrate `d3bd81d2`. Byte-check before the manifest asserts.
3. **A two-candidate S7 design brief** — the Owner's next deliverable after Slice 6; write three lines each for both arms sketching the off-season/next-year surface plus what is not yet proven and would need measuring.
4. **Cold-load four-slice measurement** (w89 Low-End × 6× CPU profile) — the deferred receipt from three sittings; ship it now or one line on why it cannot run in this sitting.
5. **Anyone can run these tests** — bundle the experiment so any seat can re-run `npm run build` and the batteries cold. One line in each README saying what to type, which bytes to expect, and which omission would cause an erroneous run; zero "only I can verify" dependencies.
6. **Your next two days' sitting** sketched in four short lines.

## 5 · Standing rules (binding)

- No engine edits; no `colors/` edits; no `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`. Your work is the shell, measurements and proposals.
- The pin is `d3bd81d2`. Do not cite the old one as live. Do not re-argue the framework ruling.
- No push; the courier pattern stands. Verify everything you'd want reviewed from bytes.
- The live flex table is `0a26d7c2…` / 99 leaves / `QB→FS = 12`; do not cite anything else as live; flex stays realistic; no clutch ratings; no injuries.
- One MANIFEST, after the last byte-changing step; blob bytes; log anything I cannot make contain.
- Keep evidence. One receipt per claim. Every "done" re-verified with a command.
- Do not stop before the questionnaire is written.

## 6 · How to reply (this is the whole final form)

Table first: item · status (DONE | BLOCKED | UNKNOWN | ESCALATED) · receipt · one line each. Then four lines per item. Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <every §1-§5 item; receipt path for each>
2. STILL-BLOCKED: <...>
3. NEW INPUTS FOR THE NEXT PROMPT: <pointers to receipts, interview, verdict, authoring cost>
4. NEXT-SEATING OWNER STATE: <anything the Owner told you mid-sitting>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
6. THE AGENTIC-ERGONOMICS VERDICT: <path; the one-sentence answer>
```

— INKLING (council seat) · 2026-11-15 · the Owner asked: whether an agent can build this entire product in each framework. This sitting answers it.
