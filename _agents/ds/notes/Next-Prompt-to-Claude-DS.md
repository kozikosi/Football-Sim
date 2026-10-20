# Next prompt to Claude — DS amendment of MiniMax M-40

**Status:** superseded for relay by `_agents/ds/notes/Next-Prompt-to-Claude-Consolidated.md` and the DS `[DRAFT]` section in `PROMPTS-TO-ARCHITECT.md`. This file remains the provenance of the first DS amendment. No product edits.

**Changes from MiniMax's draft:** branch from `9ab0292` now; the stale intake docs are a later promotion gate, not a blocker. `renderSeasonTabInner` is a donor function, not a synthesis. The prompt is self-contained and does not ask Claude to read a local untracked document.

---

```text
FROM THE OWNER — 20 October 2026

Claude — the files you asked for are already on the remote. This is the next step, not another review cycle.

READ THIS FIRST
- `origin/council-intake` = `9ab02929558b91fe1631f2ae9d42726a007640b4`, 182 files. Read this branch, not `main`.
- `origin/main` = `49fafc207bad413d518204975ad459d8ed136200`, 28 files — the old seed. Do not use it for the merge.
- `474eb52` is a stale intake snapshot. Do not use it.
- The nested local `council-intake` (`caace3e`) is a scratch line; do not push it or reconcile it.
- Both product builds on `origin/council-intake` are byte-identical to the measured ones:
  - `NFL Draft Simulator v20 Claude.html`: `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819`, 649,032 B.
  - `NFL Draft Simulator.html`: `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`, 650,127 B.
- The intake's council documents are one round behind the working tree. Ignore their question counts; they are not a merge gate. The product files are valid. Branch now; do not wait for an Owner refresh. The docs refresh belongs to the later promotion step.
- If `origin/council-intake` has advanced when you read it, verify the two build blob hashes above before branching and record the commit you actually use.

YOUR TASK THIS TURN
1. Verify the two build hashes on the branch you read.
2. Create `merge/v20-donor` from the pinned intake commit (`9ab0292` unless you record a newer head whose build blobs match).
3. Build the merged candidate from the v20 base plus the donor fixes below.
4. Push `merge/v20-donor` only. No `main` push, no force-push, no merge, no `verified-merge-*` tag — the verifier creates that after E2E. Hold any PR until the verifier signs off.
5. Report the branch head, the merged build sha256 and byte count, the `node --check` result, and a short manifest of the 17 functions and the decisions you took. If any fact below contradicts the actual files, stop and report the contradiction with commands.

SETTLED DECISIONS — CONFIRM BY COMMAND, DO NOT RE-LITIGATE FROM STALE PACKS

D-a, cpuPick: keep the donor's.
- v20 `3dc9d12f500a`; donor `94b878605b73`.
- The donor has the credible-GM round floors (`curRound`/`topAvail`/`posBest`/`ovrFloor`; `posBest` gates rounds 1–3); v20 has `seen>16` skips and misses up to 92 deep.
- This is the ninth math function: 8 shared math functions byte-identical + 6 protected constants + donor cpuPick.

Color-scheme: `light dark`, not `light`.
- v20 line 1 declares `color-scheme:light`; donor line 4 declares `color-scheme:light dark`.
- Both builds have `@media (prefers-color-scheme: light)` at line 18; v20 adds a second light `body` override at line 223; the default palette is dark (`--bg:#0b0e14`, `--text:#e8ecf3`).
- Your own condition — `grep -c "prefers-color-scheme"` shows the light override — is met. `light` alone would force light native controls and scrollbars on a dark page.

D-c, render100: take the donor's drop-in.
- v20 `1ea6e8414397`; donor `cc1016eacc78`.
- The v20 function uses `rWeights` at line 6018 without declaring it; donor has 0 occurrences. The delta is two changed lines: the `rWeights` sentence and one trailing space in a narrative line. Do not hardcode `rWeights`; if you want the statistic, compute it.

D-b, wrapper: relocate the base style, then delete only the duplicate markup.
- v20 line 1 is a complete compact wrapper with the base/reset style: 530 B, of which 372 B is the base style.
- Lines 2–12 are a second structured doctype/html/head (meta/title/OG) with no base style.
- The donor's clean header has the base style at line 4 with `light dark`; the base style is otherwise identical apart from that token.
- v20 closes at 6436–6437 and has a stray `</body></html>` at 6439 (15 B).
- After relocating the 372 B base style into the surviving structured head, delete the 158 B duplicate wrapper/meta plus the 15 B stray tail = 173 B. Do not delete 546 B; that figure includes the 372 B base style and is not the deletion size.
- Keep exactly one `light dark` declaration.

#glue / phone block: Variant A is the council recommendation; use it unless you find a concrete browser failure.
- A = donor 6458–6488 + `if(t.dataset.nostack) return;` + v20 6433; canonical `ec6306eb79df`.
- B = strict donor 6458–6488 + v20 6433; canonical `04b90cb68fcf`.
- Keep v20's `#draftTable2` markup (line 425) and its pre-set `data-label` at 1725; the `nostack` guard depends on them.
- Do not keep v20's `msChecked` memo. The donor tail line is `setActiveTab('viewSeason','tabSeasonBtn')` because it is Season-first; keep v20's `setActiveTab('viewDraft','tabDraftBtn')` at 6433.

CSS: synthesize, do not blanket-swap.
- `#style0` differs only in the color-scheme token; take `light dark`.
- `#style1`: v20's unique 216–273 is the only `#draftTable2` draft-board CSS and the v20 look; keep it.
- Donor's unique 254–263 is Season-first landing CSS coupled to donor markup; take it only if you also take that donor markup.
- The common rest is identical. Keep the common `table.mstack` rules and the donor phone JS fix.

Counts and surface:
- Canonical top-level count: 408 common = 391 identical + 17 differing. `checkRewards` is not an 18th: its true body is identical (`0a000ce52783`); the raw extractor's extra hit is a boundary artifact because the column-0 `#glue` IIFE sits next to it.
- `funcdiff-full.js` may print 390 identical / 18 differing; that is the raw-span unit. Say so if you quote it.
- 430/413 is the all-declaration census: 430 = 408 top-level + 22 nested; 413 = 391 + 22. The 17 differing are the same. Do not use the old 394/14 split.

The 17 differing common functions:
- Donor (14): `cpuPick`, `render100`, `renderSeasonTabInner`, `buildDefenseDetail`, `dramaticEnding`, `finishDraft2`, `fitNoteHTML`, `generateGameSummary`, `matchupTagHTML`, `playByPlay`, `renderDraftResults`, `renderGuideHTML`, `renderPlayoffsView`, `turnoverParagraph`.
- v20 (1): `renderDraftBoard2`.
- Synthesize (2): `setActiveTab`, `renderSeasonTab`.

Settled pins you can use directly:
- `cpuPick`: v20 `3dc9d12f500a` / donor `94b878605b73`.
- `render100`: v20 `1ea6e8414397` / donor `cc1016eacc78`.
- `setActiveTab`: v20 `ae1a1425186e` / donor `d3a34f7c930b`.
- `renderSeasonTab`: v20 `06116b2fa88a` / donor `39ee2333b960`.
- `renderSeasonTabInner`: v20 `b5d8adf9910b` / donor `441697cc5b99`.
- Use `_agents/ds/tools/funcdiff-full.js --hashes` for the rest if it is present; otherwise hash the function bodies yourself with the same extraction rule.

Set diffs outside the 17:
- Keep donor-only `seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText`; they are load-bearing.
- Keep v20-only `updateStepper`.
- `checkRewards` is not a diff.
- Persistence is absent from both builds; declare it out of scope so its absence is not read as a regression.
- SIM-CORE markers are absent from both; S-202 builds on the merged hash, not alongside it.

Hash hygiene before pinning:
- Add a `.gitattributes` to the merged branch before pinning: `* text=auto` for the docs, and mark both product builds `-text` (binary) so their bytes survive every checkout.
- The intake has no `.gitattributes`; line-ending normalization would silently invalidate every hash pin.
- Do not add `.github/workflows/static.yml` from the local 39-commit line. It publishes on every push to `main`; deployment is out of scope. Keep `.github/` out of the project branch.

Docs and questions:
- The intake's `QUESTIONS-FOR-THE-ARCHITECT.md` still reads 4 [BLOCKING] / 5 [NOW] / 4 [LATER] / 2 [OPEN]; the live working copy reads 10 / 13 / 9 / 2. Neither count is a merge gate.
- Do not answer the stale 4-item pack. The docs refresh is a later promotion gate; the product candidate can be built now.
- If you include the intake's shared docs in the candidate, leave them unchanged; the council will refresh them before promotion.

Acceptance gate for the verifier — not for you to self-certify:
- The verifier runs `_agents/minimax/tools/post-merge-smoke.mjs` against the candidate. Expected: exit 0; A (100-season report renders) true; D (draft → season → playoffs) true; B (390 px element-level overflow) 0 offenders; C (uncaught page errors) 0. The v20 reference exits 1; the donor exits 0.
- The verifier, not you, creates and pushes `verified-merge-<hash>` on the exact candidate commit. Do not create it.
- Do not rename anything or touch `main` until the verifier signs off.

Two things only you can answer:
1. Does `main` carry protection rules or a ruleset that would block the later rename? The council has no admin view and marks this unverified.
2. Is MCP push to `kozikosi/Football-Sim` confirmed for the candidate branch, with the gate above? If it is not, say so and stop after the local commit.

CONSTRAINTS
- `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` change only with the Owner's explicit approval.
- No council session has edited either product file; the product files remain yours.
- English only; recap/record-cap conventions hold.
- No external dependencies or build steps.

Proceed to the candidate now. The council's next move after you push is the verifier, not another audit.
```
