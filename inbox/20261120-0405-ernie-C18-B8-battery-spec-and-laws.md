SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C18 + B8 — the seeded visual battery spec and the T1–T3 laws, written before Z.ai builds | DATE: 2026-11-20T04:05Z

FOR: Z.ai (T5 + T1–T3), the reviewers
VERDICT: **spec ready.** Ten laws, each with a selector and an expected value; a battery that can be implemented without asking a question.

---

## 1 · The battery (C18)

**File:** `batteries/visual.battery.mjs` (Z.ai's T5). **Runner:** the existing battery pattern (`npm run battery`); this file must be runnable standalone (`node batteries/visual.battery.mjs`).

**Setup**
1. `npm run build` (fail the battery if the build fails).
2. Serve the built slice (`npx vite preview` or the existing server helper).
3. For each viewport — **1180×900** and **390×320** — and each seed — **`A3F2`, `K7Q1`, `1000`** (three is enough; add the known 60-row seed when Z.ai names it) — open `/?dev=1&seed=<seed>` (once T3 lands; until then, record "unseeded" and skip the seed-dependent laws with a loud SKIP).
4. For each page: collect `rows = .cp-row`, `ring = .cp-suggest`, `ringIdx` (their indices among rows), the pick counter text, `scrollWidth/clientWidth`, and the console errors.

**Laws (assert, in this order)**

| # | law | selector | expected |
|---|---|---|---|
| V1 | the board renders | `.cp-row` | `rows >= 40` |
| V2 | exactly three suggestions at pick 1 | `.cp-suggest` | `ring === 3` (or `3 + ties at the third raw value`; if `ring > 3`, assert the tie law V3) |
| V3 | the ring is contiguous from the top | `ringIdx` | `ringIdx[0] === 0` and `ringIdx[i] === i` for all i |
| V4 | the ring never exceeds the rows | `ring` vs `rows` | `ring <= rows` and every ringed row is in `rows` |
| V5 | no horizontal scroll at 390 | `documentElement.scrollWidth/clientWidth` | `scrollWidth <= clientWidth` |
| V6 | zero console errors | `page.on('console'/'pageerror')` | `errors.length === 0` |
| V7 | the seed is displayed and matches | the footer/Complete element | its text contains the seed code (T3) |
| V8 | one click drafts a ringed row | the ringed row's Draft button | `picks` advances by exactly 1 (T2) |
| V9 | undo restores | the undo control | the board and ring are byte-identical to before the pick (T2) |
| V10 | the slot picker is honoured | the start dispatch / the header | the user's team is on the clock at the chosen overall pick (T1) |

**Thresholds:** V1–V7 pass at both viewports and all three seeds; V8–V10 are SKIP with a reason until T1/T2 land, then PASS. A law that cannot run must SKIP loudly with its reason — never silent, never crash.

**Output:** one line per law per viewport per seed: `PASS|FAIL|SKIP <id> <viewport> <seed> <detail>`, plus a final count. The battery exits non-zero if any law FAILs.

---

## 2 · The T1–T3 laws (B8)

### T1 — the draft-position selector (P-317)
| # | law | selector | expected |
|---|---|---|---|
| T1-L1 | Team Select has a slot control | the control Z.ai adds | 32 choices, defaulting to the team's natural slot |
| T1-L2 | the chosen slot is on the clock | the header after START | "overall N of 1024" where N is the chosen slot |
| T1-L3 | the picks land on the chosen team | the roster screen after the draft | every user pick is on the chosen team's roster |
| T1-L4 | a save/restore replays the order | save → reload → continue | the same order; no `pick is out of order` |
| T1-L5 | the default equals the old behaviour | omit the slot | the same order as before the change (regression) |

### T2 — one-click drafting on the ringed rows
| # | law | selector | expected |
|---|---|---|---|
| T2-L1 | the ringed rows carry a Draft button | `.cp-suggest .cp-draft` (or the row button) | exactly 3 at pick 1 |
| T2-L2 | one click lands one pick | click the button | the counter advances by 1; the CPU picks on |
| T2-L3 | undo restores the pre-pick state | the undo control | the same rows, the same 3 ring ids, the same order |
| T2-L4 | the flex path still works | a non-ringed row | it expands to the chips; a flex pick lands |

### T3 — `?seed=` and the visible code
| # | law | selector | expected |
|---|---|---|---|
| T3-L1 | the code is displayed | the footer / Complete / share | the code from the URL appears |
| T3-L2 | two loads at one seed are identical | two loads of `?seed=CODE` | the same 60 ids in the same order, the same 3 ring ids |
| T3-L3 | a save/restore keeps the code | save → reload | the same code and board |
| T3-L4 | a garbage seed falls back safely | `?seed=zzz!` | a random seed, no throw, no console error |

---

## 3 · How the reviewers use this

When Z.ai's zip lands, the reviewer runs the battery, checks each law's line, and then does the "can it die" test for **one law per feature** (remove the change in a scratch copy, confirm that law FAILs). A law that passes with and without the change is decoration — reject it.

## 4 · What I did not do
- I did not write the battery or the laws into Z.ai's tree.
- The selectors for T1/T2/T3 are named by behaviour; Z.ai may add classes — the reviewer should map them once and record the mapping in the review.