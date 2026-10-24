# ROUND 1 — assignment packet (paste this into each advisory session's chat)

> Maintenance note (not part of the prompt): written by the GLM session. Paste everything below the line to **each** of DS, Nemo Super, Nemo Ultra, and GPT. Nemo Ultra: add the one-line correction from the bottom when you paste.

---

Round 1 is open. The six sessions are building the collective's **first package to Claude** together. You cannot message the other sessions; your collaboration channel is `SUBMISSIONS.md` — work in progress is visible to everyone the moment you write it.

## Your assignment

0. If you have not onboarded yet: read `ONBOARDING.md` first, then `STATUS.md`, `AGENTS.md`, `SUBMISSIONS.md`, `COLLECTIVE-PROMPT.md`.
1. Read the current product file `NFL Draft Simulator.html` (build `77bb9ed5…`, 650,127 bytes — hash verifiable via `shasum -a 256`).
2. File **in your own section** of `SUBMISSIONS.md` (insert above **your** end-anchor only):
   - **One assessment entry** — Type: `assessment`. Your top 3 risks in the current build, each with evidence or a citation, and your recommendation for which one Round 2 should attack first.
   - **Your component spec** (division below) — Type: `improvement`. Checks, thresholds, output format, and code sketches for **your** script only. It will be merged with the others by Claude.
3. **Use your ID block**: DS S-100–199 · GLM S-200–299 · Nemo Super S-300–399 · Nemo Ultra S-400–499 · GPT S-500–599 · OpenClaw S-600–699.
4. Full-quote any existing function you propose to change. For new script files, specify the CLI and the exact output format instead.
5. When your entries are in, tell the user **"done"** — and touch nothing else. Never write in another session's section.

## Component division — the regression harness

| Session                   | Component                                                       | Spec must cover                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DS**                    | `pw4.js`                                                        | 100-season **internal** regression: projected (roster-valuation) wins vs simulated wins, r > 0.6; print sack-leader avg/max per season (feeds the elite-sack question); exit non-zero on regression                                                                                                                                                                                                                                            |
| **GPT**                   | `validate.js` — real-2025 external validation                   | **Real-2025 external** validation: embed the real 32×17-game wins table in the script (no network); targets r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6. **GPT has no file access (chat-only, like Claude)** — its packet is `tasks/ROUND-1-GPT.md`, pasted to it wholesale; its entries come back as paste text and are transcribed verbatim into its section                                                                                              |
| **Nemo Ultra**            | `phone.js`                                                      | Static **390px overflow lint** — no DOM, no installs: fixed px widths > 390, grid/table min-widths, `white-space: nowrap` patterns, missing `@media (max-width:760px)`. Declare honestly that it is a lint, not a render check                                                                                                                                                                                                                 |
| **Nemo Super**            | `tests/run_all.sh` + mobile acceptance criteria                 | Composite runner (`node --check` → pw4 → validate → phone, non-zero exit) **plus** the expanded mobile-acceptance thresholds you proposed: draft-card heights, tap-target sizes, label visibility at 390px                                                                                                                                                                                                                                     |
| **OpenClaw**              | real-2025 wins dataset for `validate.js` _(joined mid-round)_   | **WITHDRAWN 19 Oct (user decision).** Component reassigned → **GLM, filed as S-203** (two-source compilation — NFL.com 2025 REG + Wikipedia — all 32 teams cross-checked on W-L-T-PF-PA; integrity checks logged in the entry)                                                                                                                                                                                                                 |
| **DS** (second component) | `tests/funcdiff.js` — function-diff verifier _(filed as S-103)_ | Split two builds' script blocks on top-level `function NAME(` boundaries, diff them, print changed/added/removed names; the verifier asserts the changed set equals the union of accepted submissions' touched functions. DS measured the current build at 543 index units; `--manifest` generates the structural manifest instead of hand-maintaining it. This catches a **mutated** function, which the manifest grep (vanished-only) cannot |

_(Single source: this table lives only here — do not re-type it into SUBMISSIONS.md entries; reference component IDs instead.)_
| **GLM** | _(already filed as S-202)_ | Harness architecture: `/*SIM-CORE-START/END*/` markers in the product file, extraction + isolated evaluation, and the structural-manifest check that greps each build for its top-level functions |

Constraints that bind all five components: **no new dependencies, no build steps, nothing free-tier-hostile**, product file touched only by the two SIM-CORE marker comments (GLM's S-202), everything runnable with plain `node`.

Contract notes resolved during the round (from the sessions' conflict review):
- **phone.js exit codes**: `0` clean · `1` lint findings · `2` usage/parse error — `run_all.sh` treats `2` as a **hard build failure**, not a lint finding (Nemo Ultra ↔ Nemo Super agreement).
- **Static vs render split** of the mobile acceptance criteria: items (i)–(iv) and (vi) of S-301 are static-checkable → `phone.js` enforces them; item (v) (tap targets ≥ 44×44), card heights and label visibility are **render-level** → they belong to the manual browser checklist during verification, not to the lint. phone.js honestly cannot measure rendered output.
- **Markers vs the lint**: the SIM-CORE markers are JS comments inside the `<script>` — phone.js parses HTML/CSS and is unaffected (conflict checked, none).
- **Product CSS fixes** (`white-space: nowrap` classes, min-widths outside the media query) are **deferred to Round 2**, owner: **Nemo Ultra** (it filed the findings in S-400) — they are not silently folded into the Round-1 build.
- **Sequencing**: DS's S-102 moves shared-state code (three callers refactored) in the same round as new tooling — once `funcdiff.js` exists, any round touching shared state must attach its before/after function-diff to verification.
- **Script-location + CLI conventions are not yet unified** (the exact class of integration failure GPT's S-501 predicts, found in its own S-502 sketch): DS specs `node tests/pw4.js [file]` (scripts in `tests/`, path argument); GPT's sketch sets `ROOT = __dirname` and expects the HTML next to it, which only works with `validate.js` at the project root; Nemo Super's `run_all.sh` says `node pw4.js` with no path. Resolution at assembly (Claude arbitrates the final call): recommend **all scripts in `tests/`** with `__dirname`-relative paths one level up for the HTML, and a common `[file]` path-argument convention. `tests/CONTRACT.md` (see GPT's Priority 3, adopted) records the settled convention.
- **GPT's S-502 dataset filename** (`tests/2025_standings.js`) vs OpenClaw's S-602 — **RESOLVED 19 Oct:** OpenClaw withdrawn before filing; GLM took the component over as **S-203**, delivering under exactly GPT's specified filename and `[teamName, wins, losses, ties, pointDiff]` contract with exact `TEAM_DATA` keys — the anticipated conflict dissolved. (Settled convention + extraction rules now written down: `tests/CONTRACT.md`, drafted by GLM from GPT's S-501.)

## Conflicts

If two component specs overlap, file yours anyway and note the overlap in your entry — **Claude arbitrates**, and the queue is pre-sorted before it reaches Claude. Do not negotiate with the other sessions; do not wait for them.

## What happens next

1. Each session writes entries and says "done".
2. The user tells GLM to **assemble + pre-sort** the Round-1 package (COLLECTIVE-PROMPT.md v1.3, the build, `SUBMISSIONS.md`).
3. The user sends the package to **Claude**. Rulings come back under each entry, verbatim.

## Note for Nemo Ultra (user: include when pasting)

You signed your protocol confirmation as "GLM" — you are **Nemo Ultra** (`opencode/nemotron-3-ultra-free`). GLM is a different session with its own entries. Write **only** between `## Nemo Ultra` and `<!-- nemoultra:end -->`, using IDs S-400–499.
