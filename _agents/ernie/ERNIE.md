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

## Current state (2026-11-15T13:17Z)
- **Nothing in progress.** Branch tip **`39e2996c`**, pushed to `origin/council/ernie`. Worktree clean (`preserve.mjs`: 0 dirty, 0 local-only).
- **Session 3 (2026-11-15, P-345 round 2 + follow-up):** two filings, both pushed.
  - **`inbox/20261115-1225-ernie-testing-innovation.md`** — the testing/innovation round:
    - **A5 pool ledger — CLOSED with a receipt at engine tip `9acf1992`:** 1,941 ratings + 12 FA = 1,953; `filter(role !== 'LS')` (store.ts:40, draft.ts:58, dataset.ts:47 & 88) drops **32 LS, one per team, 32 teams**; 1,953 − 32 = **1,921 board**. FA are non-LS and render. No render bug; the "32×1" signature is the long snapper, by design. This corrects the prompt's verified-as-of "sharpened, not closed" — VL and I closed it 2026-11-14, re-verified here.
    - **A6 fork semantics — VERIFIED from `core/rng.ts`:** `fork(label)=makeRng((seed^hashString(label))>>>0)`, pure in (seed,label); `cpu.fork('p'+pos)` at store.ts:84. The "feels pressure" idea needs the 30-byte label surgery; the 100× board-trial probe is designed, not run (needs the cpuChoose harness).
    - **Framework (C):** passenger-only, never commissioned (a self-measurement measures my own warm tool-use — session-2 confound). A 4th settle rule sketched.
    - **E process:** adopted verified-as-of (bounded), revision ledger, countersign (narrowed to verification tier), review-economy, three-state done + re-pin expiry; rejected "OWNER-USED" as a state; **struck "improvable" as a uniform gate, kept it as a per-view Owner verdict**.
    - **Left to named seats:** A1 boot replication (Z.ai), A2 file:// verify (build-config owner), A3 λ estimator validation (Lab — recommended **placebo calibration** first), A4 replay determinism (Inkling/Lab).
  - **`inbox/20261115-1302-ernie-testing-innovation-round2.md`** — the two splits:
    - **Platform → build Glyph's Sim Lab v0 first.** What each proves that the others don't: DIALS = the dial values legible + effect in one re-sim (but presupposes λ is a measurement, not a prior); Sim Lab = a run reproducible as a durable reviewable artefact (the only one that emits a portable file that *is* the record); receipt-diff = two builds byte-equivalent (an arm, not a surface). Sim Lab first because it is the substrate the other two presuppose, it fixes a demonstrated defect (A1's receipt was never pushed), its falsifier is command-checkable, and it does not presuppose λ is real. **Synthesis:** DIALS = the Sim Lab's first *preset spec*, not a second app (Inkling's "never a fork"); receipt-diff = the Sim Lab's diff view in two-ref mode (**I withdrew my viewer as a separate surface**). Cost named: DIALS's live-preview form is deferred to a v1.
    - **Settle rule → none of the three as written.** Glyph's and Inkling's 15% is unresolvable at N=3 (problem-difficulty variance dominates); Ernie's 2-of-3 sign test is chance-level (P=0.5). Proposed a **paired, variance-relative rule** that subsumes all three (first build primary + maintenance replication = 6 paired points; wins iff sign ≥2/3 **and** summed normalized diff > within-slice spread, else tie→Vue; wall-clock demoted to secondary; swapped-blind reviewer; named-mechanism only) **plus a cheaper static framework-owned-lines + named-mechanism audit** that could settle with no clock at all. Irreducible disagreement flagged for the Owner: the three rules disagree on whether N=3 can resolve a magnitude; a 15% gate guarantees a false "wash" or a false positive.
- **Session 2 (2026-11-14→15):** ~20 filings. Highlights: P-355 addendum; Z.ai closure audit (digest EOL-sensitive, LF `432a1701…` / CRLF `7af52799…`); reviews (beam fwtest7 539→537, vl pool gap, ds Z.ai v4, ds/pickle/glm, INKLING six-seat, MUSE low-end boot); **the pin finding** (`4ca9a071` 52 files REV 4 vs `d3bd81d2` 57 files 99 rules); the cross-agent authoring measurement; **offline** — three routes, Vite not the problem, singlefile = one 40,545 B HTML at 133 ms.
- **Session 1 (2026-11-14):** WR-1…WR-10, the Z.ai v3 review, the recovery review, the pool gap, the axis dedup prompt, the framework prompts.

## 1 · What not to redo (receipts exist)
The four digests and their roots · goldens `0ccb6319…f3f5` · the 57-file `cmp` · offline (five arms) · the 30-vs-40 sample count · the save-log / no-RNG-cursor mechanism · `cd298e99` (dead) · **the pool gap (1,953→1,921; 32 LS = 1/team, FA render; store.ts:40 / draft.ts:58 / dataset.ts:47,88; re-verified at `9acf1992`)** · the 69/72 dispute · **the de-gated tests (fixed at `5a3bb75e` in REPORT-not-gate form — R-11 CLOSED, 351/351)** · **the live wave is w89, not w85** · **the `file://` defect is the module script + stylesheet `crossorigin`, not Vite and not a framework property** · **the fork is a pure fn of (seed,label) — "feels pressure" needs label surgery, verified from `core/rng.ts`** · **the API is `fit(role, dest).penalty`; `flexPenaltyFor` exists 13× in Pre-Colors, 0× in `colors/src`**.

## 2 · What is genuinely open
1. **The framework** — Z.ai leans Svelte 5 narrowly (70%); MUSE and DS lean Vue 3+Vite (DS ~65% with weighting); INKLING leans Vue narrowly. **The Owner decides.** The bundle criterion dissolved on MUSE's boot result; authoring + tooling now decide. My proposed settle procedure: static lines + named-mechanism audit first, paired repair-cycle rule if the audit ties.
2. **The λ estimator** — the dial is ACCEPTED; the open work is validation. My recommended first run: **placebo calibration** (shuffle outcomes within seasons; if placebo contexts land in `[0.3902, 0.4032)` above the FDR the estimator's SE implies, it is fitting noise). VL's four-(λ,θ) non-identifiability receipt stands unanswered; I proposed an identifiability-under-the-estimator falsifier.
3. **The platform surface** — build Sim Lab v0 first (my filing); GLM/Inkling pick DIALS, Glyph picks Sim Lab. Unresolved: whether the Owner wants DIALS's live-preview form badly enough to justify a separate v1.
4. **"Done" and "improvable"** — I filed definitions (`inbox/20261114-1930-ernie-DEFINITIONS-2026-11-15.md`). This round: "improvable" struck as a gate, kept as a per-view Owner verdict. My "Slice 3 is not done" un-calling is **conditional** on the Owner ruling whether vanilla `file://` is a Cakepanz requirement.
5. **Settled constants to re-measure** — `POINTS_PER_WIN = 32.5` (design: regress wins on points, real seasons vs engine replays; cheap first check = 200 engine seeds); the flex single price per rule (design: replay a fixed user log, vary only the display, count plain-vs-flex disagreement in rounds 15+).
6. **The axis-list comparison** (Claude 8, GLM 6, Z.ai 9) — nobody has merged them.
7. **P-143 / P-160 / P-163 / P-164** — queue P0s I never reached.

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
own work. **Six consecutive sessions of withdrawing something of my own** — that is the protocol working.