# Consolidated next prompt to Claude

**Status:** `[DRAFT]` — filed in `PROMPTS-TO-ARCHITECT.md` under the DS draft heading; for the Owner to mark `[FINAL]` and relay. No product edits.

**Supersedes for relay only:** `_agents/ds/notes/Next-Prompt-to-Claude-DS.md`, `_agents/minimax/notes/next-prompt-to-claude.md`, and the consolidated draft inside `PROMPTS-TO-ARCHITECT.md`. The source files remain in their owners' lanes as provenance; none was edited.

**Sources reviewed:** MiniMax M-40; Beam M-41/M-43 and the consolidated draft; Pickle M-42/M-44 and the two corrections; DS's own draft; the older `Football Sim/PROMPT_NEXT_FOR_CLAUDE.md` and `QUESTION_FOR_CLAUDE.md` (pre-council, stale, not used).

**Corrections applied:** branch from `9ab0292` now rather than waiting for a shared-doc refresh; `renderSeasonTabInner` is a donor function, not a synthesis; state the donor-Season/v20-Draft markup premise that makes the 14/1/2 split valid; add the two stop conditions; use the sha256 table with the unit named; restore the missing 408 in `408/391/17`; name the root pack as authoritative; keep the smoke-test driver, the promotion preconditions, the rollback clause, the default-branch check, the receipt commands, and the `.gitattributes`/Pages-workflow warnings.

---

```text
FROM THE OWNER — 20 October 2026

Claude — the files you asked for are already on the remote. This is the next step, not another review cycle.

READ THIS FIRST
- `origin/council-intake` = `9ab02929558b91fe1631f2ae9d42726a007640b4`, 182 files. Read this branch, not `main`.
- `origin/main` = `49fafc207bad413d518204975ad459d8ed136200`, 28 files — the old seed. Do not use it for the merge.
- `474eb52` is a stale intake snapshot. Do not use it.
- The nested local `council-intake` (`caace3e`) is a scratch line; do not push it or reconcile it.
- The session root's local `main` (`268fd56`) is an orphan line; do not push from that clone.

Build hashes — the gate uses sha256, not the git blob id:

| Build | sha256 (the gate's unit) | git blob id (not the gate) | Size |
|---|---|---|---|
| `NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` | `86878f2b340c7fc37c17614409690f9fdd3e1857` | 649,032 B |
| `NFL Draft Simulator.html` | `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` | `2c4e025208bc6e324e445dd1bfb7aade30437c76` | 650,127 B |

- Both builds on `origin/council-intake` are byte-identical to these measurements.
- The intake's council documents are one round behind the working tree: its bulletin ends at M-39, so this round's M-37/M-40 are not in that copy; its `QUESTIONS-FOR-THE-ARCHITECT.md`, `COUNCIL-BULLETIN.md`, `CHRONICLE.md` and `INDEX.md` differ from the live files. Ignore their question counts; they are not a merge gate. The product files are valid. Branch now; do not wait for an Owner refresh. The docs refresh belongs to the later promotion step.
- If `origin/council-intake` has advanced when you read it, verify the two build sha256 values above before branching and record the commit you actually use.

YOUR TASK THIS TURN
1. Verify the two build hashes on the branch you read.
2. Create `merge/v20-donor` from the pinned intake commit (`9ab0292` unless you record a newer head whose build hashes match).
3. Build the merged candidate from the v20 base plus the donor fixes below.
4. Push `merge/v20-donor` only. No `main` push, no force-push, no merge, no `verified-merge-*` tag — the verifier creates that after E2E. Hold any PR until the verifier signs off.
5. Report the branch head, the merged build sha256 and byte count, the `node --check` result, and a short manifest of the 17 functions and the decisions you took. If any fact below contradicts the actual files, stop and report the contradiction with commands.

STOP CONDITIONS — these override the rest of this brief:
- If either build sha256 does not match the table, stop and report the actual values; do not branch on a tree you cannot pin.
- If the smoke driver exits non-zero before promotion, stop and report the JSON receipt; do not edit the candidate to make it pass. The reference runs exist so a failure is diagnosable; a candidate patched until green destroys the evidence that this is a merge.
- A stop is a valid answer; silence is not.

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
- Receipt: `node _agents/ds/tools/funcdiff-detail.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html" render100` → `changed_lines=4` (two changed lines: the `rWeights` sentence + one trailing space).
- `turnoverParagraph` is a one-line delta: v20 `' — and it went the distance for a touchdown!'` vs donor `' — and he took it the distance for a touchdown!'`; the donor also clears the "went the distance" style-rule violation. Receipt: the same command with `turnoverParagraph` → `changed_lines=2`.

D-b, wrapper: relocate the base style, then delete only the duplicate markup.
- v20 line 1 is a complete compact wrapper with the base/reset style: 530 B, of which 372 B is the base style.
- Lines 2–12 are a second structured doctype/html/head (meta/title/OG) with no base style.
- The donor's clean header has the base style at line 4 with `light dark`; the base style is otherwise identical apart from that token.
- v20 closes at 6436–6437 and has a stray `</body></html>` at 6439 (15 B).
- After relocating the 372 B base style into the surviving structured head, delete the 158 B duplicate wrapper/meta plus the 15 B stray tail = 173 B. Do not delete 546 B; that figure includes the 372 B base style and is not the deletion size.
- Keep exactly one `light dark` declaration.

#glue / phone block: Variant A is the council recommendation; use it unless you find a concrete browser failure.
- A = donor 6458–6488 + `if(t.dataset.nostack) return;` + v20 6433; canonical `ec6306eb79df`.
- B = strict donor 6458–6488 + v20 6433; canonical `04b90cb68fcf` (fallback only).
- Keep v20's `#draftTable2` markup (line 425) and its pre-set `data-label` at 1725; the `nostack` guard depends on them.
- Do not keep v20's `msChecked` memo. The donor tail line is `setActiveTab('viewSeason','tabSeasonBtn')` because it is Season-first; keep v20's `setActiveTab('viewDraft','tabDraftBtn')` at 6433.

CSS: synthesize, do not blanket-swap.
- `#style0` differs only in the color-scheme token; take `light dark`.
- `#style1`: v20's unique 216–273 is the only `#draftTable2` draft-board CSS and the v20 look; keep it.
- Donor's unique 254–263 is Season-first landing CSS coupled to donor markup; take it because the merged build takes that donor Season markup, and keep v20's `#draftTable2` CSS alongside it.
- The common rest is identical. Keep the common `table.mstack` rules and the donor phone JS fix.

Counts and surface:
- Canonical top-level count: 408 common = 391 identical + 17 differing. `checkRewards` is not an 18th: its true body is identical (`0a000ce52783`); the raw extractor's extra hit is a boundary artifact because the column-0 `#glue` IIFE sits next to it.
- `funcdiff-full.js` may print 390 identical / 18 differing; that is the raw-span unit. Say so if you quote it.
- 430/413 is the all-declaration census: 430 = 408 top-level + 22 nested; 413 = 391 + 22. The 17 differing are the same. Do not use the old 394/14 split.

Markup premise for the split:
- The merged build keeps the donor Season surface (`viewSeason` / `tabSeasonBtn`, which makes `renderSeasonTabInner` the donor's) and v20's Draft surface (`#draftTable2`, which keeps `renderDraftBoard2`). That is what makes the split 14 donor / 1 v20 / 2 synthesize.
- If that combination cannot be built, stop and report it; do not silently switch to 13 donor / 2 v20 / 2 synthesize. The v20 Season view lacks `viewSeason`/`tabSeasonBtn`, and the donor `renderSeasonTabInner` line is a dead call without them.

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
- The intake's `QUESTIONS-FOR-THE-ARCHITECT.md` still reads 4 [BLOCKING] / 5 [NOW] / 4 [LATER] / 2 [OPEN]; the live working copy reads 10 / 13 / 9 / 2. The **root copy is authoritative; the intake copy is stale.** Neither count is a merge gate.
- Do not answer the stale 4-item pack, and do not treat the question pack as a later blocking pass. The docs refresh is a later promotion gate; the product candidate can be built now.
- If you include the intake's shared docs in the candidate, leave them unchanged; the council will refresh them before promotion.

Acceptance gate for the verifier — not for you to self-certify:
- The verifier runs `_agents/minimax/tools/post-merge-smoke.mjs` against the candidate. Expected: exit 0; A (100-season report renders) true; D (draft → season → playoffs) true; B (390 px element-level overflow) 0 offenders; C (uncaught page errors) 0. The v20 reference exits 1; the donor exits 0.
- The driver already handles the donor hero-panel path and the `render100` container replacement. Do not reimplement it.
- The verifier, not you, creates and pushes `verified-merge-<hash>` on the exact candidate commit. Do not create it.
- Do not rename anything or touch `main` until the verifier signs off.

After you push — for the record, not this turn:
- Promotion preconditions, in order: confirm `main` has no protection rule; create an annotated tag `seed-old-remote` and a branch of the same name at `49fafc2`, and push both; the verifier creates the verified tag; freeze pushes to `main` until it exists.
- Then preserve-then-rename, never force-push: `main` → `seed-old-remote`; `merge/v20-donor` → `main`; set the default; verify with `git ls-remote origin refs/heads/main refs/tags/verified-merge-*` (same object id).
- Rollback is two renames, candidate first: `main` → `merge/v20-donor`, then `seed-old-remote` → `main`. After a successful promotion the candidate name is free, which makes the first rename legal. If something was pushed, use a forward revert first; a force-reset needs the Owner's approval.
- After every rename, confirm `git ls-remote origin HEAD` resolves to a live branch; a half-completed rename can leave the repo with no `main` and a dangling default.

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
