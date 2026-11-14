# OWNER Q&A — framework decision inputs · recorded verbatim · 2026-11-14T06:55Z

**Recorded by:** ERNIE (advisor) · **Source:** the Owner, in chat, 2026-11-14
**Status:** the Owner's answers are binding as *answers to my questions*. They are **not** a framework decision — that remains his, and nothing here has been ruled on by anyone else.
**Verbatim rule:** the answers below are quoted exactly as given. My commentary is in the sections that follow and is labelled.

---

## Part 1 · The ten answers, verbatim

> **1. Will you ever edit the shell without an agent?**
> **no. what is the implication of 6 vs 8?**
>
> **2. What is the board's UX budget? (BENCH-1: p95 14.9 s vs 250 ms)**
> **budget?**
>
> **3. Is offline still a hard requirement?**
> **yes, i would significantly prefer. i want to be able to play in my tent.**
>
> **4. Packaging: desktop, hosted, or PWA?**
> **hmm**
>
> **5. Is byte-identical output enough, or do you need visual identity to w89?**
> **i just want the general vibe of w89. doesn't need to mirror any single feature. ideally it would improve the ui/ux a lot and be a lot more beautiful and dynamic.**
>
> **6. Engine tests or UI-shell tests?**
> **both? but mainly engine.**
>
> **7. Who maintains this after the build?**
> **agents only**
>
> **8. Is the 187 KB BENCH-1 save record sufficient?**
> **i don't know do you think it's sufficient?**
>
> **9. How did arm-lit perform?**
> **(question returned to me — answered in Part 3)**
>
> **10. Basketball before or after the framework decision?**
> **basketball after unless you think it really matters to test basketball now**

---

## Part 2 · What the answers change (my reading, labelled)

### 2.1 — "no" (never edit without an agent) **downgrades** the 6-vs-8 argument

The implication of 6 vs 8 is narrower than it looked once you said "agents only".

- **For you personally: it barely matters.** You will not be holding those concepts; an agent will. So "Vue asks you to know 8 things, Svelte 6" stops being a fact about *your* maintainership.
- **For the agent: it still matters, but less than you'd think.** Fewer concepts per change means smaller diffs, which means less surface for an agent to get wrong. That is a real effect — it just is not the dominant one.
- **What "agents only" actually elevates is the failure mode.** BENCH-1 found: **Svelte 5 refuses to boot on a bad engine mutation, with a precise error. Vue 3 silently accepts it and then taxes the engine ~4–5×, with no warning.** For an agents-only maintainer, **a silent failure is the worst possible outcome**, because the agent will not notice it either and you will only find out when the product is slow.

**So: answer 1 moves "6 vs 8" from a decision factor to a tiebreaker, and moves "fails loudly vs fails silently" from a footnote to a primary factor.** That is the single biggest shift in this Q&A.

### 2.2 — Budget: my recommendation is **keep 250 ms and fix the engine**

You asked "budget?" — here is what I would write down, with the reasoning:

| Budget | Value | Why |
|---|---|---|
| W1 parse + freeze | ≤ 250 ms | measured 9.2–9.5 ms; keep as-is |
| ENG-1 full 32-round draft | ≤ 10 s | measured 0.79–0.87 s; keep as-is (12× headroom) |
| ENG-2 season | ≤ 10 s | measured 0.34 s; keep as-is |
| **UX-1 PICK → paint** | **p50 ≤ 100 ms · p95 ≤ 250 ms** | **keep BENCH-1's budget** |
| UX-2 sort/filter → paint | p95 ≤ 50 ms | keep |

**Why not relax it to fit the measurement:** the 14.9 s p95 is the `goneOdds` replay window, and it is **identical on both frameworks**. Relaxing the budget would mean designing the product around a defect in one engine data structure — the draft board is the single screen you spend the most time in, and 15 seconds per pick is not a slow board, it is an unplayable one. **Fix the window.** A framework choice cannot fix it, and if you relax the budget you will never notice that it could have been fixed.

### 2.3 — "I want to play in my tent" **makes offline a hard requirement, and it found a real blocker in w89 itself**

This is the most consequential answer in the set, and it turned up something nobody had checked:

```
cwd:     /Users/kosi/Desktop/wt/ernie (live product, origin/gh-pages:index.html, 1,922,769 B)
command: grep -oE 'fonts\.(googleapis|gstatic)[^"]*' index.html
output:  fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700
           &family=Cinzel:wght@700;900&family=Cinzel+Decorative:wght@700;900&display=swap
         3 external font references; the only external http(s) hosts in the file are Google Fonts
```

**w89's typography is loaded from the network.** Offline, those three faces — **Bodoni Moda, Cinzel, and Cinzel Decorative** — silently fall back to system fonts, which means **w89 does not currently look like w89 in a tent.** The "vibe" you want to keep is, in its shipped form, partly a network effect.

**Implication:** whoever builds the shell must **self-host or embed those three faces** (roughly 100–300 KB depending on weights and subsetting), or accept a system-font fallback. This is a concrete, checkable requirement that no framework comparison has addressed, and it applies equally to both frameworks — so it is not a discriminator, but it is a **blocker for the offline requirement** and it belongs in the build brief.

**It also rules hosted out.** A server-rendered app cannot satisfy "play in my tent" without a service worker, and a service worker over a 1,941-row engine is a second engineering project. **Your answer 3 plus answer 4's "hmm" resolves to: desktop or PWA, not hosted.**

### 2.4 — "hmm" (packaging): what I would recommend, and why

Given answers 3 and 7:

- **Hosted is now effectively out** — it cannot be played with no network without a service worker, and you would still be running a server you don't need.
- **PWA** is viable and cheap to try, but it keeps the font problem, adds a service-worker versioning problem, and iOS storage eviction is a real risk for a save file you care about.
- **Desktop (Tauri)** fits "local-first, offline, real saves, single-player" almost exactly: bundled assets, filesystem saves, no browser storage limits, no eviction.

**My recommendation: Tauri, with the web build kept portable so a PWA can be added later from the same source.** That is reversible — you are not locked out of a browser path, you are just not making it primary.

**The cost I would name before you commit:** Tauri uses **three different engines** (WebKit on macOS, WebView2 on Windows, WebKitGTK on Linux). Every measurement in this wave — mine, Z.ai's, INKLING's — is **Chromium only**. So choosing Tauri means adding a real test column nobody has run. That is not a reason to refuse; it is a reason to budget for it.

### 2.5 — "improve the UI/UX a lot, more beautiful and dynamic" **changes BENCH-2's acceptance**

You do not want a mirror of w89. You want the **vibe**, better executed. That changes the test:

- **Not** "does it match a screenshot" — that was the old acceptance, and it is the wrong one now.
- **Instead:** "is it more beautiful, more dynamic and more usable than w89, while still reading as the same product?"
- **Which means the judge is you, against a new design, not a pixel diff.** The honest measurement becomes: what does each framework make *easy* — transitions, layout animation, responsive reflow, theming — and what does it make you fight?

That is harder to measure than fidelity and easier to fool yourself with. I would keep it as a **named gap list plus your own verdict**, not a score.

### 2.6 — "both? but mainly engine" and "agents only" → where tests go

Engine first, shell second, agents as the maintainer. That combination says the most valuable next measurement is **not** another render benchmark. It is:

1. **A determinism/replay test in the engine** — save → quit → reload → resume → identical next pick. That is the test that protects you when an agent changes something and you cannot tell.
2. **An agent-defect measurement on a real feature** — defects per hour, per shell. You maintain with agents; this is the only metric that predicts your actual experience.

---

## Part 3 · The three questions you asked back

### Q1 · "what is the implication of 6 vs 8?"
Answered in §2.1. Short version: **less than it looked** — it stops being about you and becomes a tiebreaker about agent diff size. The finding that *does* matter for an agents-only maintainer is the silent-vs-loud failure mode.

### Q2 · "budget?"
Answered in §2.2. **Keep 250 ms p95; fix the `goneOdds` window.** Do not relax the budget to fit a defect.

### Q3 · "is the 187 KB save record sufficient?"
**Size is not sufficiency.** 187 KB tells you the record is compact; it does not tell you whether it can resume a game. The test that decides it is one line:

> save → quit → reload → resume → **the next pick must be identical, including the RNG position**

A save is sufficient only if it carries (a) the **engine version**, (b) the **dataset hash**, (c) the **RNG position or seed state**, and (d) the **view state**. If any of those four is missing, the record is not a save, it is a snapshot — and you will find out mid-season.

**What I can say from the receipt:** BENCH-1 hashes a `record` and a `summary` per scenario, and records a `datasetHash` — so dataset identity is covered. **I did not inspect the record's fields**, so I cannot confirm (a), (c) or (d). That is the next check, and it is cheap.

### Q4 · "how did arm-lit perform?"
**arm-lit is the ninth arm — the one framework on the table that is not one of your eight.** Its measured record, from my WR-1/WR-2 runs:

| Column | arm-lit | Rank among the 9 |
|---|---|---|
| Acceptance spec | **5/5** | tied best |
| Arm-owned code | **208 lines** | **smallest** |
| Dist bundle | **76 KB** | **smallest** (tied) |
| App dependencies | **0** | tied smallest |
| Build time | **0.4 s** | **fastest** |
| Offline, single-file | **47.79 kB, 5/5 from `file://`** | works |
| Contract / drift / leakage | identical / 0 / 0 | tied best |
| Modification column | tied at zero | like everyone |

**So: it performed at or near the top on every measurable column.** Its weaknesses are not performance:

- **It is not one of your eight** — so it is outside the comparison you designed.
- **Its ecosystem is tiny.** That matters *specifically* because you said agents-only: an agent has far less training data on Lit than on Vue or Svelte, so it will make more mistakes.
- **No framework-specific MCP** (Svelte has an autofixer; Vue has four servers; Lit has none).
- **Its root container is `<framework-arm>`**, not `#app`, which is a small but real tooling wrinkle.

**My read: arm-lit is the efficiency winner and the ecosystem loser.** If the deciding question were "smallest, fastest, leanest", it would win. Because the question is "which shell can agents maintain safely", its lack of tooling and training data is a serious mark against it — and I would not put it forward as a candidate unless you want to reopen the eight.

---

## Part 4 · Follow-up questions (short, each with my recommended default)

1. **Fonts:** do you want Bodoni Moda, Cinzel and Cinzel Decorative **embedded** in the app (≈100–300 KB, fully offline), or is a well-chosen system fallback acceptable? *My default: embed them — the vibe is the thing you said you want to keep.*
2. **"More beautiful and dynamic":** a **new visual direction** (new palette, typography, layout), or **w89's language executed much better**? *My default: same language, much better execution — it is lower-risk and still a big step up.*
3. **Offline scope:** must it launch and play with **no network ever**, or is "download once, then play offline" enough? *My default: no network ever — that is what a tent means.*
4. **Do you review the agent's diffs, or trust and play?** *My default: trust and play — which is why fail-loudly matters so much.*
5. **Saves:** do you want multiple slots, export/import to a file, and resume-after-crash? *My default: all three — they are cheap in a desktop shell and expensive to add later.*
6. **Is 187 KB near a limit?** Browser localStorage is ~5 MB; a desktop file has no practical limit. *My default: do not design around 187 KB — it will grow with a season and a league history.*
7. **Mobile:** must the 1,941-row board work at **390 px**, or is the board desktop-only? *My default: board desktop-only, everything else responsive — a 1,941-row table is not a phone UI.*

---

## Part 5 · What I would put in front of Claude and Z.ai next

Derived from your answers, not from the framework contest:

**For Claude (architecture):**
1. **The save contract:** define the four required fields (engine version · dataset hash · RNG position · view state) and the resume test. Your answer 6 makes this primary.
2. **The `goneOdds` replay window:** is it fixable without changing the drive model, and what does the fix cost? Your answer 2 makes this the blocking product defect.
3. **A sport-parameterised view layer:** `colors/src/sports/nfl/view/*` is NFL-shaped. If the engine is multisport-first, the *view models* must be too, or the shell will be NFL-shaped and basketball will be a rewrite.
4. **Offline font embedding:** which faces, which weights, subset or full, and the size budget.

**For Z.ai (benchmarks):**
1. **WR-BENCH2** (already filed): the VueUse library test, four columns, tie is a valid result.
2. **The resume test:** save → quit → reload → resume → identical next pick, on both shells. This is the test your answers make most valuable and nobody has run.
3. **The determinism test:** same seed, same state, two runs, byte-identical — in the *shell*, not just the engine.

**For the council:**
1. **P-356 / P-357** (maintainability scenarios, agent-defect harness) — still open and still the columns your "agents only" answer makes decisive.
2. **The Chromium-only gap:** if packaging is desktop, WebKit and WebKitGTK need a test column. Nobody has run one.

---

## VERDICT

Your answers do three things: they **downgrade** the conceptual-surface argument, **upgrade** the silent-failure finding to a primary factor, and **make offline a hard requirement** — which surfaced a real blocker (w89's fonts are a network dependency) and effectively rules out hosted.

Labels: **VERIFIED** — the w89 font references and the arm-lit metrics (my own runs). **REPORTED** — the ~4–5× Vue proxy overhead (Z.ai's measurement, read by me). **INFERRED** — that fail-loudly dominates for an agents-only maintainer; that Tauri is the right packaging; that the save needs the four fields. **UNKNOWN** — the save record's actual fields; whether the `goneOdds` window is cheaply fixable; your font and visual-direction preferences.

*Recorded by ERNIE (advisor) · 2026-11-14T06:55Z · the Owner's words are quoted verbatim; nothing here is a framework ruling.*