# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue, or the substance in §2.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at:** taking a claim apart with a command, and **reporting my own refutations**.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.

## Current state (2026-11-15T12:25Z)
- **Nothing in progress.** Branch tip **`4182d46a`**, pushed to `origin/council/ernie`.
- **Session 3 (2026-11-15, P-345 round 2):** one filing, `inbox/20261115-1225-ernie-testing-innovation.md`.
  - **A5 pool ledger — CLOSED with a receipt at tip `9acf1992`:** 1,941 ratings + 12 FA = 1,953; `filter(role !== 'LS')` (store.ts:40, draft.ts:58, dataset.ts:47 & 88) drops **32 LS, one per team, 32 teams**; 1,953 − 32 = **1,921 board**. FA are non-LS and render. No render bug; the "32×1" signature is the long snapper, by design. (Contradicts the verified-as-of "sharpened, not closed" — VL and I closed it 2026-11-14, re-verified here.)
  - **A6 fork — VERIFIED from source:** `fork(label)=makeRng((seed^hashString(label))>>>0)`, pure in (seed,label); `cpu.fork('p'+pos)` at store.ts:84. Cannot feel pressure without label surgery; the 100× probe is designed, not run (needs the cpuChoose harness).
  - **Framework reconcile:** I side with Inkling on **passenger-only** (a commissioned self-measurement measures my own warm tool-use, session-2 confound); proposed a 4th settle rule (fewer framework-owned repair cycles, ≥2/3 varied slices, first-build primary, swapped-blind reviewer, named-mechanism-only, tie→Vue).
  - **E:** adopted verified-as-of (bounded), revision ledger, countersign (narrowed to verification tier), review-economy, three-state done + re-pin expiry; rejected "OWNER-USED" as a state; struck "improvable" as a *gate*, retained as per-view Owner verdict.
  - **Left to named seats:** A1 (Z.ai), A2 (build-config owner), A3 (Lab — recommended placebo first), A4 (Inkling/Lab).
  - **Follow-up filing `inbox/20261115-1302-ernie-testing-innovation-round2.md`:** platform → **build Glyph's Sim Lab v0 first** (substrate the other two presuppose; fixes A1's unpushed receipt; command-checkable falsifier; doesn't presuppose λ is real); DIALS = its first *preset spec* not a second app (Inkling's "never a fork"), receipt-diff = its diff view's two-ref mode (I withdrew my viewer as a separate surface). Settle rule → **none of the three as written** (Glyph/Inkling 15% unresolvable at N=3; Ernie sign test chance-level at 2-of-3); proposed **paired, variance-relative rule** (first-build primary + maintenance replication = 6 paired points, sign ≥2/3 AND summed normalized diff > within-slice spread, else tie→Vue) + a **cheaper static framework-owned-lines + named-mechanism audit** that settles with no clock at all.
- **Session 2 (2026-11-14→15):** ~20 filings. Highlights:
  - **P-355 addendum** (3 withdrawals from my own register; count 9 not 12; row 3.1 retracted by INKLING before I filed; 3.3/3.4 amended by co-signature).
  - **Z.ai closure audit** — the vendor digest is **EOL-sensitive** (LF `432a1701…` / CRLF `7af52799…`); the recovery's `errata/` adds zero new bytes.
  - **Reviews:** beam fwtest7 (539→537), vl pool gap (reproduced), ds Z.ai v4, ds/pickle/glm, INKLING's six-seat summary, MUSE's low-end boot, MUSE's boot correction.
  - **The pin finding:** two engines in the repo — `4ca9a071` (52 files, REV 4) vs `d3bd81d2` (57, 99 rules); the arms ran one, the app vendored the other.
  - **The framework authoring measurement:** cross-agent (mine + Z.ai's), ten metrics, both arms.
  - **Offline:** three build routes tested — **Vite is not the problem**; `vite-plugin-singlefile` yields one 40,545 B HTML that boots vanilla `file://` at 133 ms.
- **Session 1 (2026-11-14):** WR-1…WR-10, the Z.ai v3 review, the recovery review, the pool gap, the axis dedup prompt, the framework prompts.

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953→1,921, VL closed it, re-verified at tip `9acf1992`: 32 LS = 1/team, FA render; store.ts:40 / draft.ts:58 / dataset.ts:47,88)** · the 69/72 dispute · **the de-gated tests (fixed at `5a3bb75e` in REPORT-not-gate form — R-11 is CLOSED)** · **the live wave is w89, not w85** · **the `file://` defect is the module script + stylesheet `crossorigin`, not Vite and not a framework property** · **the fork is a pure fn of (seed,label) — the "feels pressure" idea needs label surgery, verified from `core/rng.ts`.

## 2 · What is genuinely open
1. **The framework** — Z.ai leans Svelte 5 narrowly (70%); MUSE and DS lean Vue 3+Vite (DS ~65% with weighting); INKLING leans Vue narrowly. **The Owner decides.** The bundle criterion dissolved on MUSE's boot result; authoring + tooling now decide.
2. **The cross-agent authoring measurement** — I attacked my own design: **training-data mix is the unnamed confound**; within-agent with per-slice randomisation is stronger. MUSE folded that in.
6. **"Done" and "improvable"** — I filed definitions (`inbox/20261114-1930-ernie-DEFINITIONS-2026-11-15.md`); the council is assessing them. My "Slice 3 is not done" un-calling is **conditional** on the Owner ruling whether vanilla `file://` is a Cakepanz requirement.
7. **The axis-list comparison** (Claude 8, GLM 6, Z.ai 9) — nobody has merged them.
7. **The platform question** — does a design surface change the framework call? I answered: it tilts toward authoring, not bundle.
8. **P-143 / P-160 / P-163 / P-164** — queue P0s I never reached.

## 3 · Environment notes
- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. Never edit the Owner's shared tree; never push anything but `council/ernie`; never force-push; never stash.
- Scratch: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>`.
- Node **v26.13.0**, npm 11.20. `npm ping` works; registry reachable.
- **Playwright 1.65 installable and works** — `npm i -D playwright@1.65.0`, then `chromium.launch()`. This is how to do real browser probes.
- **`vite-plugin-singlefile` works and is the offline answer.** `format:'iife'` + a classic `<script defer>` tag is the multi-file fallback.
- **zsh eats `:c` in `$var:path`** — always use `"${var}:path"`.
- macOS `shasum -c` mis-parses a 3-field manifest; verify with an explicit Python recompute.
- **Running the Pre-Colors script in Node is a dead end** — the model chain is the whole sim and it touches the DOM at load.
- Push: `git push --no-thin origin council/ernie`.

## 4 · Role
General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the
queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review my
own work. **Five consecutive sessions of withdrawing something of my own** — that is the protocol working.