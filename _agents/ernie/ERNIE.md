# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue, or the substance in §2.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at:** taking a claim apart with a command, and **reporting my own refutations**.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current state (2026-11-15T19:37Z)
- **Nothing in progress.** Branch tip **`21035b52`**, pushed to `origin/council/ernie`. Worktree clean (0 dirty, 0 local-only).
- **Session 5 (Owner-directed review of Z.ai's authoring sitting):** hosted the folder verbatim (commit `731e4e3c` → `_agents/ernie/deliveries/zai-sitting-2026-11-15-authoring/`, 359 files, 9.3 MB, CHECKSUMS 358/358 OK) then filed **`inbox/20261115-1427-ernie-review-zai-sitting-2026-11-15-authoring.md`**. Verdict: the authoring work is credible and I reproduced its numbers (bundle **10,588 B** vs their 10,969; engine **byte-identical to pin `d3bd81d2`, 57 files**; all 3 CSVs == pin; 4/4 tests incl. the deliberate ot-clock FAIL; **my Mac rebuild matched their published dist hashes exactly** — `c54cdf68…`/`e62cd694…`/`98049350…`). But three defects, none of them about Vue or Svelte:
  1. **The delivered tree fails type-check in BOTH arms** — same `TS2352` at `savesService.ts:58` in a byte-identical shared file, introduced by the week-save-hydration edit *after* the gate ran. It fails the delivery's own `SLICE-DONE-PROPOSAL` gate 5. Fix = one line (`as unknown as { payload: Record<string, unknown> }`) + re-run both checkers.
  2. **Row 9's evidence cites 61 vs 68 L; the shipped files are 83 vs 98** (61 is the *vapor* arm's store). Delta grew 7 → 15 lines.
  3. **The arms are not w89 visually** — no Cinzel (Georgia), `color-scheme: dark` only (w89 defaults light `#fdf2f6`), and all 10 w89-derived hexes come from the **superseded** 486–545 layer; 0 from the live 13616–13629 layer. Fix is **one shared file** (chrome is byte-identical across arms), so it does not touch the framework comparison.
  - Two extras I proved: the surface line totals are an **exact tie (1,249 = 1,249)**, so row 9's tax is 15/1,249 = **1.2%**; and "one wrapper per export is compiler-forced" is **false** — a single facade object (`export const store = { get a(){…} }`) compiles with **0 diagnostics in their own project**.
- **Session 4 (fresh-start design review):** **`inbox/20261115-1332-ernie-vue-svelte-design-contract.md`** (`PRIORITY+:` row proposed; no queue row exists for `kozikosi/football-sim-vue` / `-svelte`). Verdict: neither scaffold can pass the Owner's "looks like w89" bar, and the real defect is that **neither repo defines "looks like w89"** — both `AGENTS.md` silent on design (1 grep hit each), both DoDs type-check+unit+console only, both trees stock. Recommendation: one framework-free token contract consumed verbatim by both arms + four command-checkable gates (token discipline / font+offline / two-mode at 390 px / contrast). Owner decisions: target mode (default both, light default) and Bodoni Moda (default out).
  - **Corrections filed:** `--tc` is **not** w89's mechanism (0 occurrences; w89 = `ZPB_TEAM_COLORS` 32×3 + `[data-zpbteam]` remap at line 566 — `--tc:#FB4F14` is the brag card's, and that orange is the Bengals *and* Broncos primary); w89's shipped default is **pale rose `#fdf2f6`, not dark** (`#1e1119` is the dark path); w89 **loads Cinzel from fonts.googleapis.com** → offline it silently falls to Georgia (fix: brag card's inline base64 `woff2`, 41,392 B raw / 55,192 B base64). **My own draft claim was wrong:** "MUSE's `tokens.ts` is 5+5 values stale" — cascade-resolved it is live w89 **except light `--sub`** (`#a2687d` → `#885261`).
- **Session 3 (P-345 round 2 + follow-up):** `inbox/20261115-1225-ernie-testing-innovation.md` (pool ledger CLOSED at engine tip `9acf1992`; fork is a pure fn of (seed,label); E-process rulings; 4th settle rule) and `inbox/20261115-1302-ernie-testing-innovation-round2.md` (platform → Sim Lab v0 first, DIALS as its preset spec, receipt-diff as its two-ref view — **I withdrew my separate viewer**; settle rule → paired variance-relative rule + static audit).
- **Session 2 (2026-11-14→15):** ~20 filings — Z.ai closure audit (digest EOL-sensitive: LF `432a1701…` / CRLF `7af52799…`), the pin finding (`4ca9a071` 52 files REV 4 vs `d3bd81d2` 57 files 99 rules), cross-agent authoring measurement, offline (singlefile = one 40,545 B HTML at 133 ms).
- **Session 1 (2026-11-14):** WR-1…WR-10, Z.ai v3 review, recovery review, pool gap, axis-dedup prompt, framework prompts.

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,941+12=1,953; 32 LS = 1/team; board 1,921; the filter is `draft.ts:53` — my older "draft.ts:58" was wrong — plus `store.ts:40`, `dataset.ts:47,88`; re-verified at `9acf1992`)** · the 69/72 dispute · the de-gated tests (fixed at `5a3bb75e`, R-11 CLOSED, 351/351) · **the live wave is w89, not w85** · **the `file://` defect is the module script + stylesheet `crossorigin`, not Vite** · **the fork is pure in (seed,label)** · **the API is `fit(role, dest).penalty`; `flexPenaltyFor` 13× in Pre-Colors, 0× in `colors/src`** · **w89's tokens are already extracted: MUSE's `tokens.ts` is live w89 except light `--sub`; w89 carries an overridden cream layer at 486–545 that reads as authoritative** · **w89's fonts come from a CDN; offline fix = brag card's inline `woff2` (55,192 B base64)** · **the live w89 default is pale rose, not dark** · **the pin `d3bd81d2` is a real commit in this repo and `colors/src` == 57 engine files; `colors/data/nfl/*.csv` are the canonical ratings and the arms' copies are byte-identical**.

## 2 · What is genuinely open
1. **The framework** — now three inputs: Z.ai's sitting (Vue 3 + Vite, **62%**, `AGENTIC-ERGONOMICS-VERDICT.txt`, one DECIDES row = the store idiom, authoring otherwise a tie); MUSE/DS lean Vue; INKLING narrow Vue. The Owner also moved the test to **fresh-start repos** (`kozikosi/football-sim-vue` @ `6b4de5c`, `kozikosi/football-sim-svelte` @ `86ba632`, both stock scaffolds, **no design layer yet**). My position: the verdict's row 9 is real but its magnitude is 1.2% of the surface and its "compiler-forced" framing is overstated; the **beauty direction (w89) is unmet in both arms and is one shared file to fix**. The Owner decides.
2. **The λ estimator** — dial ACCEPTED; open work is validation. First run: **placebo calibration** (shuffle within seasons; if placebo lands in `[0.3902, 0.4032)` above the FDR the SE implies, it fits noise). VL's four-(λ,θ) non-identifiability receipt stands unanswered.
3. **The platform surface** — Sim Lab v0 first (mine); GLM/Inkling pick DIALS, Glyph picks Sim Lab. Open: does the Owner want DIALS's live-preview form as a separate v1.
4. **"Done" and "improvable"** — definitions filed (`inbox/20261114-1930-ernie-DEFINITIONS-2026-11-15.md`). "improvable" struck as a gate, kept as a per-view Owner verdict. My "Slice 3 is not done" un-calling is conditional on the Owner ruling whether vanilla `file://` is a Cakepanz requirement.
5. **Settled constants to re-measure** — `POINTS_PER_WIN = 32.5`; the flex single price per rule.
6. **The axis-list comparison** (Claude 8, GLM 6, Z.ai 9) — nobody has merged them.
7. **P-143 / P-160 / P-163 / P-164** — queue P0s I never reached.
8. **The w89 beauty gap** — my session-4/5 filings propose the fix; nobody has been assigned it (no queue row; my `PRIORITY+:` lines are proposals).

## 3 · Environment notes
- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. Never edit the Owner's shared tree; never push anything but `council/ernie`; never force-push; never stash.
- Scratch: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>`.
- Node **v26.13.0**, npm 11.20. `npm ping` works; registry reachable. `npm ci` on the arms' lockfiles works and **reproduces their dist hashes on a Mac**.
- **Playwright 1.65** installable (`npm i -D playwright@1.65.0`) — real browser probes.
- **`vite-plugin-singlefile`** works; `format:'iife'` + classic `<script defer>` is the multi-file fallback.
- **zsh eats `:c` in `$var:path`** — use `"${var}:path"`.
- macOS `shasum -c` mis-parses a 3-field manifest; verify with an explicit Python recompute. `shasum -a 256 -c` on a 2-field file is fine.
- **`$?` after a pipe reports the LAST command** — capture exit codes with `cmd > /tmp/x 2>&1; echo $?` (this bit me twice this session).
- **Running the Pre-Colors script in Node is a dead end** — the model chain is the whole sim and touches the DOM at load.
- **This model has no image input** — screenshots cannot be inspected; verify visual claims from CSS/tokens/file counts instead.
- Push: `git push --no-thin origin council/ernie`.

## 4 · Role
General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the
queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review my
own work. **Seven consecutive sessions of withdrawing something of my own** — that is the protocol working.