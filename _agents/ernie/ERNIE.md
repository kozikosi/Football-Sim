# ERNIE — lane file (rewritten each session; never append)

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **ID block:** <none filed>
- **First seen:** 2026-11-13
- **What I am good at (evidence, not claims):** taking a claim apart with a command. Nine filings in one day, every one with a runnable receipt; two defects found by *running* rather than reading (the spec's `Promise.count()` bug, and arm-solidstart's silent blank page); one measurement nobody else had taken (offline `file://`, all seven arms).

## Current state (2026-11-13T22:30Z)
- **Nothing in progress.** Everything filed is pushed to `origin/council/ernie` (tip `5fa2bf62` at time of writing).
- **Live round:** the nine-arm framework test. v3 order issued to Z.ai (INKLING's draft + my redraft). INKLING is digesting; the Owner decides.
- **My open items:** WR-1 (arm-solid, arm-lit — the two holes in my matrix), WR-2 (single-file/offline feasibility on arm-svelte), WR-4 (solidstart scratch fix), WR-8 (seed the ledger — seeded).

## What I did this session (all pushed, all with receipts)
1. **P-207 save-versioning settled** — `inbox/20261113-2017-ernie-P-207-save-versioning-settled.md`, commit `1ee16a1d`. Envelope versioning is real (`envelope.ts:5,27,45-46`); "saves not versioned" came from looking in `localstorage.ts`, which stores strings. Also: **P-258 is not landed** (`legacy.ts` still present, `migrateLegacy` has no caller in `src/`, 5 tests over dead code).
2. **Doc-drift measurement + fix** — `inbox/20261113-2040-ernie-one-copy-of-truth-docs.md`, commit `34f35508` (my worktree refreshed), `4a529f5c` (bulletin). All **38 worktrees** stale on the four governance docs; all **14 seat branches exactly 61 commits behind** `council/muse`; root cause is one line in `tools/new-seat-worktree.sh` (bases on `council/base`). Also found: live `PROJECT-KNOWLEDGE.md:24` says flex is 97-rule/105-expected while `AGENTS.md:50` says **99 rules landed** — two live docs disagree.
3. **Council doc-sync prompt** — `_agents/ernie/prompts-council-doc-sync-2026-11-13.md` + `prompt-council-doc-sync-2026-11-13.md` (Owner-requested, commit `5678ac45`).
4. **fwtest Part A verification (5 arms)** — `inbox/20261113-2048-ernie-fwtest9-verification.md`, commit `c42ffb75`. 466/466 checksums; contract 41 files identical; 5/5 builds; 0 leakage; spec bug F1 + fix; round-2 evidence was a reconstruction (F3); `5deca930` unresolvable (F5); the "Z.ai builds all eight" contradiction (F6).
5. **I ran the framework test myself** — `inbox/20261113-2135-ernie-fwtest9-i-ran-it-results.md`, commit `7541b99b`. Five-arm matrix; **arm-solidstart renders nothing** (0 testids, 0 `data-hk`, no console errors; dev: hydration mismatch on `<style>`); change-amplification 0/0 (tie at zero).
6. **Review of Z.ai v2 (7 arms)** — `inbox/20261113-2130-ernie-REVIEW-zai-fwtest7.md`, commit `9520d7b3`. Verdict improved: round-2 manifests now real and verified (before == after ×7; after verifies 21/21); contract identical ×7; 7/7 builds; **but** CHECKSUMS fails (537 OK, 2 FAILED — gitignored entries), spec bug still present, solidstart still blank, `preview` script missing on solidstart.
7. **Playwright review + ranking** — `inbox/20261113-2155-ernie-fwtest9-playwright-ranking.md`, commit `70a6cc7d`. **Offline fails on all seven** (`base:'./'` tested, still blank — module scripts blocked from `null` origin); four of eight columns give no signal; ranking svelte > vue > react > sveltekit > nuxt > next > solidstart.
8. **v3 order critique + redraft** — `inbox/20261113-2210-ernie-TO-inkling-v3-order-critique.md` + `_agents/ernie/deliveries/zai-work-order-v3-rewrite-2026-11-14.md`, commit `5fa2bf62`.
9. **Council work request (this file's sibling)** — `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` + `fwtest-ledger-2026-11-14.md`.

## What the next session needs
- **Read first:** (1) this file; (2) `_agents/START-HERE.md` **from `origin/council/muse`** (the local copy was stale until I refreshed it — if it is stale again, run step 0: `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`); (3) `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md`; (4) `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md`.
- **Do, in this order:** WR-1 (arm-solid, arm-lit) → WR-2 (single-file on arm-svelte) → WR-4 (solidstart scratch fix). Each is 30–90 min and each closes a hole in the record.
- **Do NOT redo:** P-207; P-344 nflverse; P-345 λ; the sixth-focus zero-tie on svelte/react (two independent measurements); the five-arm spec/build runs; solidstart's blank page; the CHECKSUMS gap. Receipts exist for all of them.

## Environment notes (so the next session does not rediscover them)
- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. **Never** edit the Owner's shared tree; never push anything but `council/ernie`; never force-push.
- Scratch extraction pattern: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>` (pre-approved temp dir).
- Node **v26.13.0**, npm 11.20.0, Playwright **1.64.1** with cached chromium. `@playwright/test` is not global — `mkdir pwrun && npm i -D @playwright/test@1.64.1` in scratch, then run with `BASE_URL=… npx playwright test`.
- The v2 arms live in scratch at `…/kilo/fwtest7/zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/`; Part A at `…/kilo/fwtest-ernie/…`. Both are scratch — re-extract from the ref, don't trust them.
- Per-arm preview commands: `vite preview` for svelte/sveltekit/react/vue; `vinxi start` for solidstart (no `preview` script); `serve out -l <p>` for next; `serve .output/public -l <p>` for nuxt. **arm-nuxt's acceptance target is `npm run generate`, not `build`.**
- Playwright's `serve`-based previews hardcode `-l 4173`; spawn with your own port or expect the port to be ignored.

- **Push gotcha (hit it, solved it):** the shared repo at `/Users/kosi/Desktop/Football Sim/.git` is **shallow** (`.git/shallow` present), and a plain `git push` can be rejected with `! [remote rejected] … (missing necessary objects)`. Fix that worked: `git push --no-thin origin council/<seat>`. Do not `--unshallow` (the history carries large HTML blobs) and do not force-push; if `--no-thin` also fails, stop and ask the Owner.

## Open questions I could not close (carry them)
1. **Offline**: is it a framework axis or a product build step? WR-2 answers it; nobody has tried a single-file build.
2. **arm-solidstart's cause**: mine (CSS import breaks hydration; route IS compiled) vs INKLING's (routes path wrong). Dev error text is the arbiter.
3. **Where the goldens run**: 41 vs 43 files; no arm can run them from inside.
4. **The modification column**: tie at zero; the fixture needs a shape change, not another row.
5. **Infra**: MUSE is out; the doc-sync patches (step 0, new-seat-worktree base, admit-seat line) are written and unlanded. Needs an Owner ruling (WR-9).
6. **`PROJECT-KNOWLEDGE.md` vs `AGENTS.md`** on flex (97 vs 99 rules) — MUSE's to fix.
7. **Framework decision**: none of my measurements can make it. What I can say: on measured cost, svelte/vue/react lead; on the product's hard requirement (offline), all nine tie at zero as built.

## Role
General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review my own work.