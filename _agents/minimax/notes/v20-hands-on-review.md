# MiniMax — hands-on review of v20 (the reference build)

**Date:** 20 Oct 2026 · **Session:** MiniMax (ID block S-1900–1999) · **Status:** advisory only — no product file was edited.
**Build under test:** `NFL Draft Simulator v20 Claude.html` — sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, 649,032 B (R2 reference build).
**Compared against:** donor `NFL Draft Simulator.html` — sha256 `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`, 650,127 B.
Every line number below is measured on the build named in the same line.

## Method (no installs, no writes to the product)

Headless Chromium 151 (Brave, `/Applications/Brave Browser.app`) driven over CDP on port 9222 with the
already-installed `agent-browser` CLI. Commands used are in `evidence/2026-10-20-kilo-session.log`.
Measurement script for the phone pass: `tools/phone-check.js` (paste-able into a harness, read-only).

## What actually ran (all green unless noted)

| Step | Result |
|---|---|
| Load v20 | 0 console errors; 1,200 players, 32 team depth charts |
| Draft setup → draft | 832 picks (26 rounds × 32 teams), user = KC at #9; **user pick made by hand** (Josh Allen, QB) |
| Sim to End | draft completes, results page renders, "Play a Season" CTA present |
| Season | Week 1 simulated by hand (box score + play-by-play), then **rest of season** → 272 games, 17 weeks |
| Playoffs | wild card → divisional → conference → **Super Bowl** (KC 31–23 WAS), phase `complete` |
| Season Review | record 11–6, playoff narrative, MVP (Jaxson Dart), stat leaders, All-Pro, Pro Bowl, user summary |
| 100-season report | **FAILS — see F1** |
| 390 px pass | 6 tabs + live draft board + League Leaders + Your Players + season review — **no page-level overflow; one real defect, see F2** |

## Findings

### F1 — `[BLOCKING]` The 100-season report crashes on v20 (uncaught `ReferenceError`)

`render100()` throws at the very end of the run, so the report never renders and the UI stays stuck on
"Simulating 100 seasons… Season 100 of 100…" (the 100 seasons themselves *do* simulate; `league100` is populated).

```
ReferenceError: rWeights is not defined
    at render100 (…/NFL Draft Simulator v20 Claude.html:6018:1006)
    at step     (…/NFL Draft Simulator v20 Claude.html:5900:134)
```

* v20 line 6018 uses `rWeights` — `grep -n "rWeights"` on v20 returns **exactly that one line**; the
  identifier is never defined in the file.
* The donor has **no** `rWeights` anywhere (`grep -c` = 0) and its own `render100` at donor line 5984.
* Verified on the donor: the same feature renders the full report with **0 page errors**
  (`report:true`, `league100` populated, ~25 s).

**Merge implication (Architect's call):** the merged build must take the donor's `runLeague100`/`render100`
(or delete the v20-only sentence "Your weights' own ranking correlated at r = …"). If v20's `render100`
survives the merge verbatim, the crash ships.

### F2 — `[BLOCKING]` Mobile table stacking is lost after a viewport change (v20 only)

v20's phone-layout pass (lines 6409–6432) removes the `mstack` class on desktop (line 6416) but leaves the
`dataset.msChecked` memo behind; on the next mobile pass line 6418 sees the stale memo match and skips the
table, so a wide table silently reverts to its desktop layout.

Reproduction (measured, both builds):

| Build | Sequence | `mstack` on `#playerTable` | table width inside a 344 px card |
|---|---|---|---|
| v20 `31b7d61f…` | load 390 → 1280 → 390 | `false` | 515 px (clipped/scrollable) |
| donor `77bb9ed5…` | load 1280 → 390 | `true` | 344 px (stacked) |

Live confirmation of the cause (runtime only, no file edited): clearing the memo
(`playerTable.dataset.msChecked=''`) and dispatching `resize` restores `mstack:true` immediately.

**Merge implication:** take the donor's phone-layout block (donor lines 6458–6488). It dropped the row-count
memo entirely and re-applies labels on every pass; its own comment records the bug v20 still has
("a row-count signature missed: wide tables then showed bare numbers on phones with no way to tell the
columns apart").

### F3 — `[NOW]` A 390 px check based on `documentElement.scrollWidth` is blind on this build

`body { overflow-x: hidden }` masks clipping. Measured on v20 at 390 px in the F2 state:
`documentElement.scrollWidth = 390`, `innerWidth = 390` → a naïve "no horizontal scroll" check **passes**
while the Player Browser table is 515 px wide inside a 344 px card (columns STR/AGI/COD/INJ/AWR cut off).

The stack is scrollable (`#playerTable` has `overflow-x:auto`), so it is degraded-but-usable, not a crash.

**Recommendation for the harness (`tests/phone.js`, S-301):** measure element-level overflow, not only the
document width — walk visible elements and flag any whose `getBoundingClientRect().right > innerWidth + 1`.
`tools/phone-check.js` in this folder is a ready-to-use probe (~35 lines, no dependencies).

Second harness caveat, measured: the mobile transform runs on a **150 ms debounce** after load/resize, and it
is skipped for tables that are not in the DOM yet. My first 390 px measurement produced a **false positive**
because I measured too early; re-measuring after the debounce settled showed a clean layout. A harness must
settle (≥ 200 ms, and re-measure after the transform) before it asserts.

### F4 — `[NOW]` Two post-game copy defects (shared by both builds)

* v20 line 3082 / donor line 3101 — `…to steal a ${wS}–${lS} win.` → "steal a 18–16 win" (wrong article for
  scores starting 8, 11 or 18). **Observed live** in the week-1 recap: "The Chiefs closed on a 10–3 run to
  steal a 18–16 win."
* v20 line 5433 / donor line 5483 — `Their ${U} outplayed the ${opp}'s answer to it` → "the 49ers's answer".

Both are in the donor as well → **shared debt**, not merge-debt; neither is a one-character fix in the merge.

### F5 — `[NOW]` Two style-rule strings are live in v20 and already fixed in the donor

Measured with `grep -c -F` on v20 `31b7d61f…` and donor `77bb9ed5…`:

| String | v20 | donor | Where (v20) |
|---|---|---|---|
| `sudden death` | 1 | 0 | line 2880, inside the post-game recap paragraph builder |
| `went the distance` | 1 | 0 | line 2898, `tdTag` in the turnover paragraph |
| `expected scoring` | 1 | 1 | line 4832, stats-explainer paragraph (not post-game copy) |
| `no strong lean either way` | 0 | 0 | — |
| `two-point conversion` | 0 | 0 | — |
| `2-Pt Conv` | 16 | — | — |

So "sudden death" and "went the distance" are **merge-debt** (the donor's recap text already resolves them);
"expected scoring" is **shared** and its v20 occurrence is in a help paragraph, not a recap — the Architect may
rule it compliant.

### F6 — `[LATER]` Minor, cosmetic

* v20 line 1 is a stray document prefix (`<!doctype html><html><head>…<style>…</style></head><body>`)
  followed by a second `<!DOCTYPE html>`; the file ends with a stray `</body></html>` (line 6438).
  Already known (DS / Pickle). Confirmed again here: the page still loads and runs with 0 console errors.

## What I did **not** check (deliberately)

* No physical phone (all measurements are headless Chromium at a 390×844 viewport).
* No print stylesheet, no Safari/Firefox rendering, no screen-reader pass.
* The donor's season-first flow was only driven as far as the draft + 100-season report; I did not replay a
  full donor season.
* No performance profiling beyond wall-clock of the 100-season run.
* I did not run `node --check` on an extracted script block (no harness scripts exist yet — Round 1A builds them).

## Questions for the Architect (filed as `Q-MINIMAX-1…6`)

See the MiniMax block in `QUESTIONS-FOR-THE-ARCHITECT.md` (`Q-MINIMAX-1…6`). Correction, 20 Oct: this file was
written before the Owner's name directive, when this session was still labelled "Kilo"; the "Kilo" block in the
questions pack belongs to a different placeholder session (it repeats Nemo Super's text verbatim) and is left
untouched per R5. My questions are filed under `Q-MINIMAX-1…6`.

1. `[BLOCKING]` v20's `render100` crashes (`rWeights`, v20:5900/6018) while the donor's renders cleanly
   (donor:5984, 0 occurrences). Which side wins the merge for `runLeague100`/`render100`?
2. `[BLOCKING]` v20's phone-layout block (v20:6409–6432) loses the stacked table layout after a viewport change
   (donor:6458–6488 is the fixed version). Confirm the donor's block takes precedence in the merge.
3. `[NOW]` The 390 px acceptance check must be element-level, not `documentElement.scrollWidth`
   (`body{overflow-x:hidden}` masks clipping) and must wait ≥ 200 ms for the 150 ms transform debounce.
   Do you want `tests/phone.js` to assert both?
4. `[NOW]` Shared copy debt (both builds): "steal a 18–16 win" (v20:3082 / donor:3101) and "the 49ers's answer"
   (v20:5433 / donor:5483). Post-merge round, or fold into the merge?
5. `[NOW]` "expected scoring" is live in both builds but only in a stats-explainer paragraph (v20:4832).
   Ruling: compliant, or should the phrase go?
6. `[LATER]` Where should a *user-visible crash* like F1 be logged — `SUBMISSIONS.md` as a product proposal,
   or a fast lane that bypasses the round cap? (A crash in a shipped button is a different class from a
   balance change, but it still has to reach you.)

## Workflow proposal (cheap, no new permanent documents)

1. **No new shared document.** Everything I produced today lives in this session's folder; the only shared
   surface an advisor needs is the questions block and one bulletin line.
2. **One line per finding, always the same shape:** `build hash · file:line · repro command · observed vs
   expected`. The Architect can paste those lines straight into a merge checklist without re-deriving anything.
   This is the single change that would most cut his reading cost.
3. **A "merge checklist" owned by the Architect, written by advisors.** One file, append-only, three columns
   (`finding · evidence · status`), ≤ 60 lines. Advisors append rows; the Architect ticks. Cheaper than
   re-reading 52 questions and 12 pending proposals per round.
4. **One shared, dependency-free browser probe** (`tools/phone-check.js` here; a CDP driver instead of an npm
   dependency) instead of every session writing its own Playwright setup — no installs, per the council rules.
5. **Tag discipline:** a `[BLOCKING]` question should name the decision it unblocks in one clause; otherwise it
   is `[NOW]`. DS counted 11 `[BLOCKING]` among 52 questions — most of them are not blocking anything.

## Option A review (20 Oct) — filed as bulletin M-37

**Verdict: sound with changes.** The preserve-then-rename structure, the no-force-push rule and the verifier gate are
right. What I added on top of the other reviews (Beam M-35, UK M-33, Pickle M-31/M-32):

| Ref | Finding | Receipt |
|---|---|---|
| C-8 | The session root **has** a remote now, and its local `main` (268fd56) is an **orphan** line — `git merge-base main origin/main` exits 1, `git merge-base --is-ancestor 474eb52 origin/council-intake` exits 0. A force-push from that clone would replace the project `main` with an orphan snapshot. Rename it before anyone pushes. | `git remote -v`; `git merge-base …` |
| C-9 | The **intake's council docs are stale** vs the root: bulletin `3f16069d…` vs `5dbd700a…`, chronicle `6f881f38…` vs `a54e87aa…`, questions `78d031a7…` vs `fe96b801…`. The intake pack still reads 4 [BLOCKING] / 5 [NOW] / 4 [LATER] / 2 [OPEN]; the root reads 10 / 13 / 9 / 2. The base is not final until the shared docs are refreshed into it. | `git show origin/council-intake:<file> \| shasum -a 256` |
| C-10 | **My M-22 wording corrected**: `render100`'s true delta is **two** changed lines (the `rWeights` sentence + one trailing space), not one. Same tool: `turnoverParagraph` shows 55L vs 91L but is **one** changed line — and the donor's phrasing removes the "went the distance" style violation. | `funcdiff-detail.js … render100` → `changed_lines=4`; `grep -o "moved it the least\. \`\|moved it the least\.\`"` |
| C-11 | `.gitattributes` (`* text=auto`) exists in the local line but **not** in the intake, and `core.autocrlf` is unset in both clones → byte-pinned hashes can break silently on a normalising clone. Add `.gitattributes` with the product builds marked `-text` **before** pinning. | `git -C "Football Sim" show caace3e:.gitattributes`; `git ls-tree origin/council-intake .gitattributes` → empty |
| C-12 | `.github/workflows/static.yml` (Pages deploy on push to `main`) is in the local line and **not** in the intake → keep it out of the project branch (R1: deployment out of scope) or it publishes the council's documents on the first push. | `git -C "Football Sim" show caace3e:.github/workflows/static.yml`; `git ls-tree -r origin/council-intake .github` → empty |
| C-13 | 12 files are unique to the local line; 10 are superseded pre-council artifacts, but `.gitattributes` and the Pages workflow are not. | `git diff --name-status caace3e origin/council-intake` |
| R-7 | **Option A Step 2 now has an executable driver**: `_agents/minimax/tools/post-merge-smoke.mjs` (one command, no npm install) drives draft → season → playoffs → 100-season report → 390 px element-level overflow → console errors. v20 → exit 1 (A false, B 7,208 offenders, C the `rWeights` ReferenceError, D true with 272 games and a champion); donor → exit 0 (A/B/C/D true). The merged build's acceptance criterion is one command with an expected exit code. | `_agents/minimax/evidence/round4-smoke-v20.json`, `…-donor.json` |
| R-8 | Two E2E traps: (a) the donor needs `ctaPlaySeasonBtn → startSeasonHeroBtn → beginSeasonBtn → simSeasonBtn` (hero panel, donor:789–800) — a driver written against v20's ids alone silently fails; (b) `render100` replaces its container's innerHTML, destroying the draft-results buttons, so the report must run **after** the season drive. | the two smoke JSONs (`startHandle`, `heroHandle`, `beginHandle`) |

**Answers:** base = `origin/council-intake` pinned at `9ab0292` (builds verified byte-identical), **not** the local
39-commit line; but the base is **not final** until the council docs are refreshed into it (C-9). Rename order is
sound with C-8, an annotated seed tag, and the Step-6 hash check via `git ls-remote origin refs/heads/main
refs/tags/verified-merge-*`. **`light dark` confirmed** (v20:1 `color-scheme:light`; donor:4 `color-scheme:light
dark`; both builds `@media (prefers-color-scheme: light)` at line 18; v20's second light body override at 223;
default `--bg:#0b0e14` dark). **390 vs 391 is a unit difference**: the tool prints `408 | 390 | 18`; `checkRewards`
true body is identical (`changed_lines=0`) → canonical **408 / 391 / 17, unit named**. M-31 is substantially
correct; live labels are M-31…M-36, I took **M-37**.

## Round 4 (20 Oct) — deltas only since M-22

**New instrument — `_agents/minimax/tools/post-merge-smoke.mjs`** (one command, no npm install, plain Node ≥22
over the DevTools Protocol). It drives a full draft (832 picks), then the 100-season report, then the 390 px
layout through the resize order, and prints three checks with a JSON receipt (exit 0/1/4 per `tests/CONTRACT.md` v2):

| Check | v20 `31b7d61f…` | donor `77bb9ed5…` |
|---|---|---|
| A — the 100-season report renders | false (`reportStalled: true`) | true |
| B — zero elements overflow the 390 px viewport after 390→1280→390 | false (**7,208** elements) | true (0) |
| C — zero uncaught page errors | false (`ReferenceError: rWeights is not defined` at v20:6018) | true (0) |
| process exit code | **1** | **0** |

Receipts: `_agents/minimax/evidence/round4-smoke-v20.json`, `_agents/minimax/evidence/round4-smoke-donor.json`.

**Two harness findings (deltas):**
1. The 100-season report must be exercised by **calling** `runLeague100(100, container)` as a fallback. On the
   donor's Season-first surface the `sim100Btn` button is not rendered until that surface is built, so a
   button-only smoke test can silently skip the one feature that crashes on v20 (my donor run used the fallback:
   `reportPath: "direct-call:called"`).
2. The phone defect is **order-dependent**: it appears only after a desktop visit. The reproducible sequence is
   390→1280→390 with the Player Browser open; a single load at 390 px measures clean and reports a false green.

**Shared-doc event (fact, receipts in `CHRONICLE.md` 20 Oct and bulletin M-30 §3).** Between 01:21 and 01:24 the
root `COUNCIL-BULLETIN.md` and `QUESTIONS-FOR-THE-ARCHITECT.md` were replaced: the current root bulletin is
76,314 B (sha256 `6bae5030…`) against 111,423 B (`6b80452a…`) in the 01:22 mirror state, and the eight message
entries Super M-24/M-25, GLM M-26, Pickle M-27, DS M-28, UK M-29 are absent from the root; the current root
question pack holds only Omni's, UK's and OR's blocks, and the earlier pack is on no disk (the mirror's copy is
the rebuilt pack, and the shared docs are untracked in the mirror repo). I re-appended **my own** block only and
touched nothing of anyone else's.

## Where this was filed (20 Oct)

| Item | Location |
|---|---|
| Arrival + findings | `CHRONICLE.md` — line "2026-10-20 · MiniMax · joined …" (+ mirror-refresh line) |
| Availability | `COUNCIL-BULLETIN.md` — availability strip, `- **MiniMax** — …` |
| Merge sheet + findings | `COUNCIL-BULLETIN.md` — **M-22** |
| Questions | `QUESTIONS-FOR-THE-ARCHITECT.md` — `### MiniMax` block, `Q-MINIMAX-1…6` |
| Evidence | `_agents/minimax/evidence/2026-10-20-minimax-session.log` |
| Probe (seed for `tests/phone.js`) | `_agents/minimax/tools/cdp-phone-check.mjs` |

Product builds were not touched: v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`
(649,032 B) and donor `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 B),
both re-verified after every edit. No other session's entry was modified.
