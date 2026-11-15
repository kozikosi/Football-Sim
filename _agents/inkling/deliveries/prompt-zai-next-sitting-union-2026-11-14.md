# PROMPT — for Z.ai: the next sitting (post-save-wave, post-review-union)
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** Z.ai (Executor) — relayed by the Owner
**Delivery:** hand the Owner your folder + `MANIFEST.txt`; never attempt git push. INKLING can vendor byte-exact on request.

---

You are Z.ai, Executor of Z-post-blue and 67 Cakepanz. **Your save wave was received, vendored by six seats, reviewed by six more. Every check passed. The union of the reviews surfaced three structural findings that belong to the project — two of them landed on Claude and MUSE, one on you.** This is your next sitting. Read the whole file once, then experiment in every way you can think of before replying — and the standing order I re-stamp at the top: **do not queue any work; complete it all before replying; anything you cannot finish, name the blocker exactly and stop there.**

---

## 0 · Which prompt is authoritative (read this first; four were circulating)

Four drafts for this sitting exist: ERNIE's full-work prompt (`council/ernie` `d50e752b` → corrected `fbd76b1f` → updated `f010efdd`), my consolidated draft (`council/inkling`, unpushed), GLYPH's v4 (`council/glyph` `901973b2`), and BEAM's earlier push. **This file supersedes all of them** — not because it repeats their substance (it largely does) but because it records the **review wave that closed around your sitting** after the drafts were written. The seats you may be waiting on (DS, PICKLE, GLM) are still UNKNOWN for silence — but their failure to answer the innovation prompt is now moot: **you did the three-list deduplication yourself, and the record carries it.**

If two files in your possession disagree, follow this one; stop, say so in your reply, and cite the other file's path. The Owner relays exactly one prompt per sitting; if you were relayed two, your first sentence lists them.

---

## 1 · What your save wave delivered — the register, closed

Every item below is settled. Do not re-measure, do not re-derive, do not re-open. If you catch yourself wanting to, cite this section and go do something else instead.

| # | Item | Status | Authority |
|---|---|---|---|
| 1 | Manifests: outer 209/209 (+99 in README counting the next-sitting files) → 225/225 in the wave; inner 183/183 | **CLOSED** | beam `9e55c472` ok · glyph `377edf96` ok · OR `f4aa6c6f` ok · ERNIE addendum · my `580e8978` ok |
| 2 | Engine ≡ pin `4ca9a071` (52 files, `cmp` clean) | **CLOSED** | four seats, independent |
| 3 | D.8 playoff-HFA strength-controlled → **recorded-dead** (+1.3522, CI [−0.933, +3.682], HC1 t = 1.17) | **CLOSED, DEAD STAYS DEAD** | your own filing; INKLING + BEAM + ERNIE reproduced |
| 4 | The 1,921 pool study | **CLOSED** | VL (closed) · three seats re-verified; 3 seeds × 1,024/1,024 |
| 5 | SAVE-1 write median (0.889 ms node-side, p95 1.133, n=201, envelope 128,937) | **CLOSED, filing aligned** | alignment note re: OR/GLYPH mismatch finding |
| 6 | CRLF digest receipt (LF `432a1701…`, CRLF `7af52799…`) | **CLOSED, your receipt** | reproduced by INKLING + ERNIE |
| 7 | fwtest7 "539/539" → **537/539 on committed tree** | **CLOSED** | ERNIE improved; artefacts gitignored |
| 8 | The `C5b` 101 = `_source` + `roles` counted as leaves (your walker fixed it) | **CLOSED** | ERNIE withdrew his "roles + flex" mechanism |
| 9 | Pool tank alarm, Slice 2 refusing the merge vs unlanded `SaveRecord` | **CORRECT REFUSAL** | INKLING confirmed absence at `03640133` |
| 10 | w88/w89 carry P-321 Wins (32/32, live on gh-pages) | **CLOSED** | four-seat P-324 confirmation |
| 11 | The player-game join, `data/player-game/player_game_2016-2025.csv.gz` | **CLOSED, byte-verified, 253,107 rows** | INKLING + BEAM + ERNIE + file lists; REG/POST = 241,911/11,196 exact |
| 12 | The axis deduplication table (28 distinct rows, three lists merged, weather = the Owner's `etc.`, opponent-front first cut, λ(context) INFERRED unresolvable) | **CLOSED, filed** | `inbox-20261114-zai-p345-axis-table.md` |
| 13 | The flex-pin escalation (`tools/mathlab/flex.json` is the pin's REV 4) | **FILED, ESCALATED to Claude/MUSE** | your hand, your grep; ERNIE withdrew a `flex.ts` blind spot into it (see §2.2) |
| 14 | The three cited-but-missing measurement receipts | **CLOSED, shipped** | `measurements/d8-strength-control-output.txt` · `C-engine-suite-fresh.txt` · `distfile-boot.json` |
| 15 | The README's "seven → nine" filing count | **CLOSED** | GLYPH's finding, fixed |
| 16 | The battery-JSON per-run rewrite caveat in the ledger header | **NOTED** | was missing; add one line (see §2.1) |

**The three signers of the previous rounds are worth remembering here — you did not coast.** You corrected ERNIE's `101` mechanism instead of accepting it; you killed your own D.8 row; you withdrew the `(b)` merge politely; you asked for the grep before deleting the app-tree flex.json, and you got the right answer; you refused Slice 2 against an unlanded contract. Every reflex this wave ran on came from this behaviour. **Keep it. The Owner needs an Executor, not a compliant instrument.**

---

## 2 · What this sitting does — in order

### 2.1 First (two minutes) — the README `grep -h` fix
`README.md` §"How to verify" step 2 reprints the citation-sweep `grep` **without `-h`**, so any seat running it as printed gets ten false "CITED BUT ABSENT" lines (my re-run confirmed 10; ERNIE reproduced both forms at `0f1745fa… §3`). Your own `logs/verification-2-citations.txt` documents the fix. **Fix the README to prescribe the `-h` form; keep it byte-stable in one line; reply that you did.** If you touch anything else in the README as long as you are in there, say so explicitly.

### 2.2 Second — file the `flex.ts` escalation addendum (three paragraphs, no rebuild)
ERNIE's addendum to your save wave (`council/ernie` `0f1745fa`) found the line your escalation missed: **the pin serves REV 4 in engine code too** — `colors/src/sports/nfl/engine/flex.ts` line 9 carries `export const FLEX… QB: { FS: 10 }` with the header saying the test compares `FLEX` to `flex.json` "rule by rule." Consequences you should state in your addendum so Claude and MUSE have them in one place:

1. **The nine arms were built against `d3bd81d2` (57 files) while the documented pin is `4ca9a071` (52)** — 11 files differ including `draft.ts`, `slots.ts`, `value.ts`, `flex.ts` (the "fifth kernel file" list: `events.ts`, `fold.ts`, `keyedrng.ts`, `pack.ts`, `legacyprovider.ts` are new from `d3bd81d2` only). Any two measurements taken on the two references are not comparable.
2. **The re-pin Claude makes must move `flex.ts` and its companion rules-test with it** — the test will fail on the 99-vs-107 split by construction.
3. **`w88`/`w89` slot-wins tables (`window.ZPB_SLOTS_WINS`) inherit whichever pin the app vendors** — nothing downstream is insulated.
4. **The fix that protects both the slices and the future re-pin is the one you already filed**: keep the app-tree copy byte-identical to the pin, the `.VENDOR-NOTE.txt` beside it, `flex-live/` the only citable table, and escalate to the Architect with the `flex.ts` line added. **You do not re-pin anything; you do not delete or replace the app-tree copy; you sharpen the escalation with the evidence.**

Label the addendum VERIFIED (the pin bytes you can fetch) and INFERRED for (1)–(3), and note that both references still exist in the repo for Claude to fast-check (they fetched their pins on his side).

### 2.3 Third — Slice 4 (feed): brief first, build second, publish never
**Step A (read + one paragraph):** open `sports/nfl/app/feed.ts` in your rev2 tree (or equivalently `colors` at `4ca9a071`) and the `FeedEvent` union; write one paragraph confirming what the engine already exposes, what you would need to mock (nothing — it must ride the real log), what you would refuse to ship (nothing — no live odds, no derived numbers beyond the log, no network), and the delivery shape (offline, `file://` boot clean, same chrome as Slice 3). Save as `deliveries/slice4/README.md` in the rev2 tree.
**Step B (build, only if Step A is done inside this sitting and the sitting has room):** one `FeedPanel.svelte`, same chrome as Slice 3: the drive-level feed newest-first, filter by drive on click, keyboard reachable, zero console errors from `file://`. Extend the boundary battery sketch with: the panel renders in `Feed.svelte` context; zero runtime errors; navigation; the existing 61/0/10/3 battery still passes. If Step B runs out of sitting, the brief alone is the deliverable and you say so — that is a finished item.
**Hard scope lines:** no wiring into Team Select; no publish; no gh-pages push; no Slice 5; no changes to the published tree; do not generalize — one panel, drive-level events, same chrome, done.

### 2.4 Fourth — if the Owner publishes during this sitting
Verify with one `curl -sI` against the live domain and one `git ls-remote origin gh-pages`; then `sha256sum index.html` against your vendored bytes; file the result. If the Owner has not published, say so in one line and leave it — publishing is his step.

### 2.5 Fifth — anything you find, measure; anything you cannot find, leave alone
The standing orders: **the engine is Claude's until P-318 lands; the product file is his forever; you own shell, UI, measurements and proposals — not the four files.** No new motor unless the Owner relays one explicitly. The one unassigned measurement with receipts available, if and only if the Owner relays it: a **stat-only cut of axis (c)** (key-player presence→game outcome) from your own shipped join — pass/run, points, margin by (elite-QB present vs absent) cells, bootstrap CIs, no engine, no fitting. If you want to run it without that directive, write one sentence naming why, do not run it, and stop there.

### 2.6 Sixth — the handoff delta (five lines, this exact shape)
Include in your reply, verbatim:

```
CONTINUATION-DELTAS (for the next prompting of Z.ai)
1. STALE ITEMS CLOSED THIS SITTING: <README grep -h fix; flex.ts addendum filed; Slice 4 brief + build status; publish state after curl>
2. STILL-BLOCKED: <SaveRecord — Claude, unchanged until it lands · Slice 5 — unblocked only by Slice 4 · gh-pages publish — Owner · pin re-pin — Claude/MUSE>
3. NEW INPUTS FOR THE NEXT PROMPT: <pointers to your addendum, slice4/README.md, the built panel if any>
4. NEXT-SEATING OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

The Owner's workflow depends on these five lines; without them the next prompt has to be written blind.

---

## 3 · For completeness — what the review wave flagged as still open (do not touch)

- **The flex twin-defect cannot be fixed by you.** The re-pin sits with the Architect; until it lands, the slices vendor REV 4 legally, and your label + escalation is the mitigation.
- **There are two engines in play** — the arms ran `d3bd81d2`, the slices vendor `4ca9a071`, and *nobody has proposed a single pin for the benchmark arms and the product slices to share*. That is a Claude question; you note it in your CONTINUATION-DELTAS, nothing more.
- **Checkpoint 1 of `S1` and `S2`** (P-318 seam + `core/pmath.ts` + the purity lint) are **Claude's** work this wave, and unparked. Your engine-adjacent work waits behind them where it touches the same files.
- **UX-3 remains engine-bound** (64 ms vs 50 ms, probably `selectRoster`) — not yours, do not re-measure it.
- **The ratification packet's SAVE-1 row is closed** by your sitting — the Owner signs that line, not you.

---

## 4 · The MANIFEST rule, one more time, because it is the rule that keeps this wave working

One manifest per delivery. Generated **after your last byte-changing step**, with `git ls-files` as the file list, `git cat-file blob` for hashes. If the manifest lists a file that the tree cannot contain, say one line about how many and why. Every delivery this wave met that rule and every seat verified it; it is why the deliveries survived six reviews. Do not relax it.

---

## 5 · Ruled out — do not re-open, do not "improve"

Injuries (every sport, forever) · per-player clutch ratings (Owner, 11 Nov) · flex-price fluctuation (consistent all season) · draft slot value (MOOT) · calibration targets (static) · WR/CB floors, the cross-side −6/−12 lines, your three-line REV-4→99 migration of the win table — none of these. Your wins-at-±5/slope×20 measurement work at w89 is the blessed path; do not visit the ±10 form.

---

## 6 · Reply format — table first, four lines per row, five deltas last

Table: `item | status (DONE | BLOCKED | UNKNOWN | ESCALATED | NOT-RETRYING) | receipt | one line each`. Then per item: four lines (cwd · command · ref@sha · output). Last: §2.6's block. Do not add commentary beyond it; if something needs saying, append it as a labelled note at the very end (`NOTE:`, `QUESTION:`). Pressure is not your job; completing is.

— INKLING · 2026-11-14 · the review wave: INKLING `580e8978` · BEAM `9e55c472` · GLYPH `377edf96` · OR `f4aa6c6f` · ERNIE `0f1745fa` (addendum, three findings folded into §2.2–§2.3) · DS/PICKLE/GLM: UNKNOWN (silence this sitting) · the P-345 programme lives in your own axis-table filing — it is the current state of the λ thread, cite it, do not redo it