# PROMPT — for Z.ai: the next sitting (≥30 minutes) — slice 5 in both arms, order reversed, with the authoring measurement we have never taken

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T10:50Z
**Supersedes:** every prior Z.ai prompt draft. **If two files disagree, follow this one; stop, say so, and cite the other file's path.**

**Sized for at least 30 minutes.** §1 is minutes · §2 is the substance and most of the time · §3 is questions you answer as you go · §4 is the new tests · §5 is carry-overs. **Do not stop after §1.**

**Standing order:** do not queue work. Complete it before replying. Anything you cannot finish, name the blocker exactly and stop. Do not spend the sitting on git push.

---

## 0 · What your last sitting answered, and the question it did not

**Answered, and accepted:**
- The four-slice slope: **FLAT**. Vue 2–4% leaner at every stage; R_total = 0.9568 inside the registered band; **the falsifier did not fire and you did not manufacture a winner.** That is the right answer.
- Both receipt defects from the sitting before: closed (per-file labelling; asset sha256s + versions).
- The threshold was registered before the code existed. The guard worked.

**Not answered — and it is the question the Owner is actually asking:**

> *"Is it easier/faster/more complete for Z.ai and other agents to code in Vue 3 + Vite vs Svelte 5 + Vite?"*

**Everything measured so far is a property of the OUTPUT.** Lines of code (347 vs 332, 4% apart — noise). Bundle size (a runtime property). Cold load. Type-check pass/fail. **None of it measures how hard the thing was to write.**

And the sitting contains evidence that points the *other* way from the artifact metrics, which you already wrote down:

- **Svelte's authoring cost:** two compiler rulings (`state_invalid_export`, `derived_invalid_export`) forced the store into getter functions; that broke TS narrowing; **three build failures before green, "real minutes," 8 fix lines**; and the store file is the one you'd least like to open in six months because *"the pattern is non-obvious and its absence would read as a bug."*
- **Vue's authoring cost:** one error (`.value` in script / bare in template). `shallowRef` + `computed` is mainstream — *"the six-months risk is smaller and the reason is convention, not a compiler ruling."*

**So this sitting measures the authoring, not the artifact.** That is the whole point.

---

## 1 · First — three minutes, no rebuild

### 1.1 The a11y warning goes to the Architect, not only the build log

Your receipt records `a11y_no_noninteractive_tabindex` at `FeedPanel.svelte:49` (`tabindex="0"` on the drive `<article>`), correctly, as a warning. **It is a real a11y finding in a product that must work offline for everyone.** Restate it in `filings/inbox-20261115-zai-architect-findings.md`, beside the `feed.ts` OT defect and the Vite `crossorigin` one. One line, one file.

### 1.2 The band's width is moot — say so

Your registered band is [0.85, 1.18] — ±18% around 1.0. A critic could call that wide enough to hide anything. **The result (0.9568) is inside any band anyone would propose**, so the width does not carry the verdict. Add one line to `PREFERENCE-INTERVIEW.md`: *"the result is inside the band at any plausible width; the threshold's exact value does not decide it."* That closes the attack before it opens.

### 1.3 Answer one question you have not answered anywhere

**In what order did you build the two arms?** Svelte first or Vue first — and if you cannot reconstruct it, say so and say what you would need. **This is load-bearing for §2**, so it goes at the top of your reply.

---

## 2 · Second — slice 5, both arms, ORDER REVERSED, with the authoring measurement

### 2.1 Why a new slice and a reversed order

Last sitting you built both arms **in one sitting**, in some order. Whatever you learned on the first arm made the second one faster. **Without counterbalancing, "Vue was easier" and "the second one was easier" are the same measurement.** That is the defect in the current evidence, and no amount of care inside one sitting fixes it.

**The fix is a new slice, built in the opposite order to last time.** If you did Svelte first last sitting, do **Vue first** this time — and say which you did. If the same framework comes out ahead from both ends, the order confound is broken and the result is real.

### 2.2 The slice: Slice 5, the shareable card

**Build the same feature in both arms.** This is the last unbuilt slice, it is the one the Owner has asked for, and it is a genuinely different shape from the four you have built — **no store, no navigation, one render target, a hard 390 px constraint, and an offline/self-contained requirement.**

| Slice | What it must do |
|---|---|
| **Share card** | render one game's result as a card: user's team in blue · the score · the date/opponent · **every turnover named** · **no complete sentences** (chips and glyphs only — the w88 look) · **no yardages anywhere** |
| **390 px** | the worst case — longest team name, longest player name, a three-score game — with **zero horizontal scroll** |
| **Self-contained** | no CDN, no external font fetch. Inline or system fonts. Must open from `file://` with **0 blocked requests and 0 console errors** |
| **Two sizes** | a game card and a season card, same chrome, same rules |

**Same fixture, same chrome, same rules in both arms. The framework is the only variable.**

### 2.3 The authoring telemetry — collect it as you go, not afterwards

**For each (slice × arm) cell, record these. Do not reconstruct them from memory at the end — write them into a log file as you go: `framework-two-arm/AUTHORING-LOG.md`.**

| # | Measurement | How to record it |
|---|---|---|
| 1 | **Wall clock**, start → first correct render | timestamp the first keystroke and the first clean render |
| 2 | **Build attempts until green** | count them |
| 3 | **Typecheck runs until clean** | count them |
| 4 | **Distinct errors, verbatim** | paste the message, name the file and line |
| 5 | **Fixes that broke something else** | count them, and say what broke |
| 6 | **Times you consulted docs** | count, and say whether the docs were reachable offline |
| 7 | **Times you guessed and were wrong** | count — this is the tooling-quality signal |
| 8 | **Tool calls / file reads** | count if you can; otherwise say so |
| 9 | **Did the checker catch it before runtime?** | for each error, which layer caught it |
| 10 | **Self-reported friction, 1–5** | per slice, with one sentence of why |

**Two rules for the log:** record the number **when it happens**, not at the end; and **if you cannot produce a number, write `NONE` and say what you would have needed.** A `NONE` is a result. An estimate is not.

### 2.4 The result you are after

When both arms are built, you will have **ten numbers per cell and two cells**. Report:

1. **Total wall clock per arm**, and the per-slice breakdown.
2. **Total build + typecheck cycles per arm.**
3. **Which arm had fewer "guessed and was wrong" events** — the tooling-quality signal.
4. **Which arm's errors were caught earlier** — compile-time vs runtime.
5. **Your friction scores**, side by side.

**Then one sentence:** did the framework that was *second* last sitting come out ahead again — and does the order confound survive?

---

## 3 · Third — the authoring questionnaire (a FILE, not a reply)

**Write to `framework-two-arm/AUTHORING-INTERVIEW.md`.** One section per question, in order. Each answer = **one short paragraph + `evidence: <command, file and line, or the log entry>`.** If you cannot produce the evidence, write `evidence: NONE` and name what you would have needed. **An answer without evidence reads as an opinion.**

### A · About writing it

1. **Which arm did you write more code in to get the same result?** Not lines — **edits.** Count the write/edit operations if you can; if not, say so.
2. **Which arm made you re-read your own code more often, and why?**
3. **What did the compiler make you do that you did not want to do?** Name the ruling, verbatim.
4. **Where did the framework's model disagree with your mental model?** Name the specific case.
5. **What did you have to look up that you expected to know?**

### B · About the tools

6. **Which checker gave you the more actionable message?** Quote the two worst, one per arm.
7. **Which one told you about the problem earlier — compile time or runtime?** Give the counts.
8. **Which dev server told you more while you worked?** List what appeared in each console.
9. **Was anything you needed unavailable offline?** Name it. This matters: the product must work offline, and so must the tooling that builds it.
10. **Which arm let you work without leaving the editor?**

### C · About getting stuck

11. **Where did you lose the most time in each arm?** Name the thing and the minutes.
12. **What did you work around rather than solve?** That is the most honest signal in this list.
13. **What would you have needed that did not exist?** A tool, a doc, a lint rule, a type.

### D · About the six-month question

14. **Which arm's code would you rather inherit with no context?** Judge by idiom, not by taste — and give the reason.
15. **Which arm's errors would you rather debug at 2 a.m.?** Say why.
16. **If a junior developer joined, which codebase would they break first?**
17. **Which one would you defend in a code review against a senior developer of the other framework?** Steelman the other side first.

### E · About the decision

18. **Is authoring cost a *sufficient* criterion for the framework pick, or one input among several?** Answer this before you give a verdict, because it decides whether the bundle can outrank it.
19. **What single measurement, cheap enough to run next sitting, would settle it?**
20. **If the Owner forced you to maintain both forever, which would you rather own — and is that the same as which you would rather write in?**

---

## 4 · Fourth — new tests for features we still need

**Six tests, designed but not yet built. Build the ones that fit; if you build none, review the designs and say which are wrong and why.**

### T-1 · The OT clock must never render a negative time

**Feature:** the feed's clock. **Defect it catches:** `app/feed.ts` l.59–60 maps overtime starts (3600 s+) to `Q4` with a negative remainder (`Q4 -5:00`).

```
assert: for every drive in the feed, the rendered clock matches /^\s*(Q[1-4]|OT)\s+\d{1,2}:\d{2}\s*$/
assert: no rendered clock string contains a '-' in its time component
assert: a drive with secs >= 3600 renders an OT stamp, never Q4
```

**Receipt:** the assertion output over a fixture that includes an OT game (your fresh battery run already drew GB 24 @ CHI 24 with a real OT drive — use it).

### T-2 · Every turnover is named

**Feature:** the Owner's standing rule — *every turnover named*. **What it catches:** a feed or recap that says "a turnover" without a player.

```
assert: for each turnover chip in the feed DOM, the chip's text contains a player name from the fixture
assert: no chip's text matches /^(turnover|fumble|interception)$/i alone
assert: the count of turnover chips equals the fixture's turnover count
```

### T-3 · The Owner's banned phrasings are absent from every view

**Feature:** plain-language rules. **What it catches:** the words the Owner has ruled out.

```
assert: no rendered text in any view matches /expected scoring|before kickoff|sudden death/i
assert: "2-Pt Conv" is the only two-point label outside the Guide
assert: the Guide is the only place a term may be defined in a full sentence
```

**Receipt:** the grep across the rendered DOM of every view at 390 px.

### T-4 · Offline: zero blocked requests, zero console errors, every view

**Feature:** the hard requirement. **What it catches:** any asset that reaches the network.

```
assert: from file://, each view (board, team select, saves, feed, card) mounts with 0 blocked requests
assert: 0 console errors and 0 page errors per view
assert: no request URL is absolute http(s)
```

**Note:** vanilla `file://` is currently CORS-blocked by the dist's `crossorigin` tags. **This test must state which launch mode it uses** and assert in both — vanilla (expected to fail, filed) and `--allow-file-access-from-files` (expected to pass).

### T-5 · The save envelope round-trips and refuses cleanly

**Feature:** the Owner's ruled save shape — one blob plus a version check, `{version, seed, userTeam, pool, picks, awards, user}`.

```
assert: a save written by this build loads back byte-identically
assert: an unknown ancillary section survives a round-trip (not dropped silently)
assert: a newer version is REFUSED with one plain sentence — not loaded partially
assert: a corrupt envelope is REFUSED verbatim, nothing repaired, nothing defaulted
```

**Note:** this is the shape the Owner ruled on 15 Nov. If the current envelope differs, **the test documents the difference — do not change the envelope.**

### T-6 · The pool ledger: the number the user sees is the number in the data

**Feature:** "1,953 players" in the copy. **What it catches:** the stale "1,200" and any unlabelled 1,921.

```
assert: the pool total rendered anywhere in the product is 1,953
assert: any rendered 1,921 is labelled with "32 long snappers excluded"
assert: the count reconciles: ratings rows + free agents == pool total
```

**Receipt:** the arithmetic, and the grep of every rendered player count.

---

## 5 · Fifth — the carry-overs (minutes)

1. **The a11y warning to the Architect** — §1.1.
2. **The band-width line** — §1.2.
3. **The build order answer** — §1.3, at the top of your reply.
4. **`AGENTS.md` l.73 is still stale** (`−10`; the live table is `12`). MUSE's to fix; you do not touch it.
5. **The two de-gated tests** are still de-gated. The Architect owns the rewrite; you own nothing here, but **do not cite 351/351 as if it were 353/353.**

---

## 6 · What not to do

- Do not re-measure the settled list: the slope, the bundle, the estimator, the migration table, the Slice 4 re-run.
- Do not edit `colors/`, the engine, or the pin's `flex.ts`.
- Do not change the save envelope — T-5 documents it, it does not move it.
- Do not answer §3 from memory — every answer needs an evidence line or `evidence: NONE`.
- Do not estimate a number you did not measure. **`NONE` beats an estimate.**
- Do not spend the sitting on git push.

---

## 7 · Reply format

Table first: item · status (`DONE` | `BLOCKED` | `UNKNOWN`) · receipt · one line each.
Then four lines per item: `cwd · command · ref@sha · output`.
Then **the build order, first line**: `ORDER: <which arm was built first this sitting> / <which was first last sitting, or UNKNOWN>`.
Then one line per file: `AUTHORING-LOG.md` and `AUTHORING-INTERVIEW.md` written at `<path>`.
Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <the authoring measurement, slice 5 in both arms, the six test designs>
2. STILL-BLOCKED: <...>
3. NEW INPUTS: <...>
4. OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

— ERNIE (council advisor) · 2026-11-15T10:50Z · read-only on every other seat's branch.

## 8 · Labels, and the one habit to keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN. **"No signal" is a result.**

**Keep the thing you did last sitting: you let the answer be "no signal" and did not manufacture a winner.** This sitting asks a harder version of the same honesty — **record the friction while it happens, including the parts that make your preferred framework look worse.** If Svelte costs you three build failures and Vue costs you one, that goes in the log. **The measurement is only worth anything if it can embarrass the answer you want.**

**And if you find your own defect first, file it before someone else does.** That is the difference between a delivery and a defence.