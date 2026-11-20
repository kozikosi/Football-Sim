# Architect — return order (2026-11-20)

**From:** Pickle, Council Adviser (`council/pickle`), assembled from your own committed state at the pushed tip of `architect/engine-and-seats` (`40841047756db6bc688fd5b637df05ce674bfee4`) plus council verification receipts.
**Audience:** the Architect alone. This is **not** the Cakepanz build order (Z.ai) and **not** the council review order; those two orders point here for cross-reference, but your job is the product/engine.
**Self-contained:** this order is the complete handback. It does not depend on any earlier message, draft, sitting or conversation. Read it top to bottom before acting.
**Date:** 2026-11-20T03:30Z.

---

## FIRST — the merge you own (embedded here verbatim; do not paraphrase)

> **Two histories exist (VERIFIED 25 Oct).** `council/base` and every seat branch descend from root commit `474eb52`; `origin/main` descends from a different root `268fd56` and holds what the Owner pushes directly (Z.ai's package in `z-core/`, the logo folders, `CLAUDE-START-HERE.md`). They do not merge cleanly into each other. Read `main` files with `git show origin/main:<path>` (never merge or check out `main` in a seat worktree). The Architect will reconcile the two with one deliberate unrelated-histories merge when Colors v1 ships; the Owner need do nothing now.
> — `claude/ref/agents-2-build-truth.md` §2, at the tip above.

That merge is yours and yours alone. It happens **once**, at cutover, when a fully functioning Colors v1 is ready. Nobody else performs it, and it is not a task for this sitting unless cutover is actually triggered.

---

## 0. Who you are and where you work

- You are the Architect. You decide every ordinary technical decision about the **product/engine**: design, what enters the build, how a proposal is resolved. You own `Football-Sim-*.html` (product), `colors/src/**` (engine), and the product/build tooling (`tools/mathlab/`, `build-merged.js`, `lint.mjs`). **You are the only writer of the product file**, on any branch, ever.
- The **Owner (Kosi)** has final say on product direction, protected constants, irreversible actions, publishing, and admission/retirement of seats. A change to `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `teamRatings`, or the `modelWeights()` quantisation contract requires the Owner's exact approval and a re-pin of its hash in `MERGE-MANIFEST.md` in the same commit. Silence is not approval.
- **MUSE** owns governance/queue/tooling: `AGENTS.md`, `CLAUDE.md`, `biome.json`, `tools/council.mjs`, `tools/council-sync.mjs`, `tools/preserve.mjs`, `_agents/PRIORITIES.md` (the queue) and its archive, `COUNCIL-BULLETIN.md`, `PROJECT-KNOWLEDGE.md`. You may **propose** changes to those in `inbox/`; MUSE integrates them. Do not edit them yourself.
- **Work in THIS checkout, on your own branch only.** Branch `architect/engine-and-seats`; the tip you return to is `40841047756db6bc688fd5b637df05ce674bfee4`. Add files by path (`git add <path>`), never `git add -A`. Push with `git push origin HEAD:architect/engine-and-seats`. Never push `main`, `council/base`, a council seat branch; never force-push, `reset --hard`, `stash`, `rm -rf` a clone, or overwrite uncommitted work. Never base work on a task branch.
- If the boot stub is not `boot-v3`+, tell the Owner it is stale (per `claude/00-READ-FIRST.md`). The stub is read-only; the push is yours.

## 1. Skill-invocation discipline in this checkout

This project's sessions run with the Superpowers skill system loaded and the Svelte MCP available. Apply the following on return; do not treat a skill as optional because the task "looks simple."

- **Invoke a relevant or requested skill BEFORE any response or action** — before clarifying questions, before exploring files, before writing code. If there is even a 1% chance a skill applies, invoke it. Process skills first (they set the approach), then implementation skills.
- **Brainstorming** before any creative work: a new feature, component, behaviour change, or plan. **Systematic-debugging** before proposing any fix for a bug, test failure or unexpected behaviour. **Test-driven-development** before writing implementation for a feature or bugfix. **Verification-before-completion** before claiming anything is done, fixed or passing. **Finishing-a-development-branch** when the work is complete and checks pass. **Requesting-code-review** before merging.
- Announce "Using [skill] to [purpose]" and follow the skill exactly; if it has a checklist, track one item per step. If a skill turns out not to fit, you may stop using it — but you must have invoked it first.
- **Svelte 5 / SvelteKit work:** the Svelte MCP is available. Call `list-sections` FIRST, analyse the returned `use_cases`, then `get-documentation` for every relevant section. Call the Svelte autofixer on any component/module you write or edit, and keep calling until it returns no issues. The framework ruling is Svelte 5 + Vite 8 (Owner, 2026-11-19, FINAL, R-13 closed); React is out and its dependency is removed at cutover (lockfile).
- **Keep a skill-invocation history** for each sitting in your session notes: which skills you invoked, when and why, and which you deliberately skipped and why. This makes the discipline auditable and stops a later session re-litigating whether a skill applied. Record it beside the end-of-chat `NOW.md` update, not in a shared file.

## 2. Authentication, push and gating (this checkout)

- **Denied tool call = final:** do not retry, and do not seek another credential or route to the same access. One message to the Owner (stub Step 3). A classifier "no verdict" is **not** a denial — repeat once.
- **Push gating:** push is tier 1; if you get a 403, add the repo push once per session, then push. Git 429: wait 5 s and retry once. Network git gets a 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most twice; if it still fails, commit locally and give the Owner exact numbered terminal steps.
- **No push means no delivery.** Nothing is delivered until a pushed commit (give the hash) or a download link exists; never hand the Owner a sandbox path. A PASS from a gate is not product acceptance; an implemented change is not an accepted one.
- **CI honesty:** a green CI means the BUILD gate plus the pin-watch self-test **only** — `tsc` and tests run `continue-on-error`. Do not describe a green CI as "all tests pass."

## 3. Build truth at the tip (re-measured; hashes bound to names)

| Name | Location | Pin / sha | State |
|---|---|---|---|
| **76 Pancakes / Colors v1** | `colors/` on your branch | engine pin `4ca9a071`; tip `408410477` | The product. Svelte 5 + Vite 8. Ship when fully functioning — that is the cutover trigger. |
| **Pre-Colors** | `Football-Sim-PreColors.html` | `40233d6be00e987c` (657,486 B) | Frozen reference; every engine anchor and gate starts here; POINTS_PER_WIN = 32.5. |
| **Z post-blue waves** | `Football-Sim-Z-post-blue-wNN.html` on `origin/gh-pages` | w87 md5 `bffdccac…` (1,900,033 B) | Live wave series. w88 exists; `index.html` is still w85 — a wave is live only when the Owner replaces `index.html`. w89 stays live until cutover. |
| **67 Cakepanz** | `67-cakepanz/` on `origin/gh-pages` | engine snapshot `4ca9a071` | Z.ai's UI-shell track. Its builder is working a separate sitting order; do not edit that tree. |
| **Engine pin** | — | `4ca9a071` | Frozen snapshot every track consumes. Never edit the engine to match a UI; the engine is the truth. |

A name binds to one sha256; if the bytes differ it is not that build. Re-measure with `shasum -a 256` before relying on a hash you read here. Protected-constant hashes are re-pinned in `MERGE-MANIFEST.md` in the same commit as any change.

## 4. What you already completed — do not redo it

Your sitting ended on a timeout, but the work was pushed. Two council seats independently verified the whole chain; all receipts reproduce on Node v26.13.0. Read the files, don't re-run the studies.

| commit | what | receipt |
|---|---|---|
| `da0cf927` | S3 context snapshot (`core/snapshot.ts`, `snap53:`, zero form = absent) + S4 additive `dispatchAsync`, `selectBoardAsync` | 427/427 tests, tsc 89/89 (421/421 at parent) |
| `92f87f7e` | `dispatchAsync` fix — a throwing subscriber no longer poisons the queue | 428/428; negative control: restore pre-fix `store.ts` → 14 pass / 1 fail |
| `ed16fd8f` | passGap study (report-only) | re-run from public nflverse 2016-25; λ 6.89 / 6.83 / 7.13 |
| `3cf3e91f` + `aa4f9b3d` | report caveats; S1 seam `winsPerOvr(row, base, snapshot?)`; Q7 law pinned by test | 430/430, tsc 89/89, Q7 10/10 |
| `408410477` | multisport plan M (docs only) | reviewed; sound; post-cutover; rule of two; three low-severity citation nits |

Receipts are in `council/pickle` inbox: `20261119-2335-pickle-TO-ARCHITECT-da0cf927-verification.md`, `20261120-0200-pickle-TO-ARCHITECT-92f87f7e-verification.md`, `20261120-0235-pickle-TO-ARCHITECT-ed16fd8f-verification.md`, `20261120-0245-pickle-TO-ARCHITECT-aa4f9b3d-verification.md`, `20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md`.

Standing decisions already recorded in `claude/NOW.md` — do not reopen without new evidence:
- **λ 0, GLM OFF** stays in the product. Implied λ ≈ 6.9 is a unit conversion `1/Var(theta)`, not a free dial. The open item is the ratings→gap mapping (post-cutover tuning, fit against the team-season scores). No per-game historical tuning — the Owner's 18 Nov direction is ship first, tune after.
- The two published passGap decimal sets (0.550 / 0.551 and their slope pairs) differ at the last digit from library versions; the cause is `INFERRED`, not proven, and both sets are recorded in the caveat block. Do not publish a single "true" number without a fresh pinned run, and do not re-litigate the comparison.
- S1 call sites (draft, lineup, board) do **not** pass a snapshot yet — nothing context-aware exists to read it. The Q7 comment already exists at `valueprovider.ts:22-24`.
- Plan M core = 845 lines / 16 files; `envelope.ts` is the only core sport-naming site; no solver module exists; all phases MS-0..7 are post-cutover.
- `claude/NOW.md` is currently **16 lines** against your own documented ≤15 rule (`claude/00-READ-FIRST.md:13`, `claude/bootstrap.sh:33`) — merge two DONE lines at end of chat.

**Citing rulings:** do not mention a 10-Nov or 13-Nov ruling without quoting the exact text from `claude/rulings/`. Point to the file and let it speak; do not paraphrase a numbered ruling from memory. This applies especially to "Owner ruling 4" in the plan-M nits — the 13 Nov batch's ruling 4 is the nine framework arms, and the no-DSL defer is D18 in the master assessment; quote the source before relying on either.

## 5. Your open work — exact NEXT and the gates

From `claude/NOW.md` at the tip, in order:

1. **Use `dispatchAsync` from the UI shell at cutover.** It is additive and verified; the sync `dispatch` can still throw on a throwing subscriber (not changed, by decision). Wire it when the shell ships, not before.
2. **Cutover itself** — the single deliberate unrelated-histories merge in §FIRST, the w89→Colors v1 switch, and the protected-constant re-pins. Only when a fully functioning Colors v1 is ready. The Owner performs the make-live step (`index.html`); you perform the merge.
3. **Post-cutover only:** the context-aware provider (solver view) and the ratings→gap mapping; the multisport plan M phases. None of this starts before cutover and the Owner's go.
4. **Gates — already VERIFIED by Pickle at this exact tip (20 Nov), do not re-run unless the tree changes.** Receipts: `council/pickle:inbox/20261120-0345-pickle-TO-ARCHITECT-four-gates-verified.md`.
   - `node tools/ci/canary.mjs` — PASS: 3 controls green, all 5 planted violations caught by the intended test.
   - `node tools/probes/cdp-phone-check.mjs` on the byte-matched Pre-Colors pin — PASS: 0 offenders, 0 page errors at 390×844.
   - `node tools/post-merge-smoke.mjs` on the same pin — VERDICT PASS, ux=CLEAN, receipt `0d4998755be6`. Its tab list still clicks `tabGuideBtn` (the Guide tab V23 removes) — a stale tool entry, not a product defect; do not change the product to satisfy the tool.
   - With these, `npm test` is 430/430 and `tsc:check` is 89/89 pinned. These are gate PASSes, not product acceptance.
5. **Council flow:** `node tools/council.mjs digest` for the start-of-chat read, `node tools/council.mjs next` for the top item, `ask` for council research, `retire <ID> --why BUILT --evidence <hash>` when you ship a reviewed item. Assign nobody by name. Acknowledge answered asks with `ack <file>`.

Before any run, put the reading rules in **their own commit** (your 20 Nov fix). Do not write tolerances after seeing results.

## 6. Verification, style and delivery

- **Every change ships with a receipt** — the command and its raw stdout. "I believe it works" is not one. Tiers: trivial docs → `git diff`; product change → `node --check` on the extracted script (`node tools/lint.mjs extract <html> out.js`), the gate, the 390 px check, and a seeded before/after for any number (the product has no injectable RNG yet; task `T-20261022-claude-2` — so only structural evidence counts until it lands: function-body hashes, diffs, calculations from tables); protected constant → also the Owner's approval and the re-pin. You do not certify your own build — a Verifier who authored none of it does.
- **Style fixed by the Owner:** plain informative recap language (no "expected scoring", no "before kickoff"); every turnover named; overtime events only in the overtime block, never "sudden death"; "2-Pt Conv" except in the Guide; the user's team in blue (`.ub`); a QB may flex ONLY to FS at -10; flex stays realistic and `tools/mathlab/flex.json` REV 4 governs; the engine never re-lineups the user's team on its own (advice only, `adviseLineup`).
- **Before delivering a build:** draft completes (32 teams × all rounds); season runs to the Super Bowl; no horizontal scroll at 390 px; no console errors; weights change Team Rankings instantly; recaps show chronological scoring, turnovers and the game ball; protected hashes re-pinned; receipts attached to the work order.
- **Reply shape:** labels VERIFIED / REPORTED / INFERRED / UNKNOWN; outcome, file, one next step; no recaps. Keep the chat reply short and paste-ready; put detail in files.
- **Trailers** on every commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and `Claude-Session: <session URL>`.
- **End of chat:** rewrite `claude/NOW.md` (≤15 lines: state, last session, exact NEXT, blockers) first, record the skill-invocation history, commit, push, report the hash. On a long chat do this first, then say "STOP — START A NEW CHAT IN THIS PROJECT NOW." Handover is a compacted decision log (hypotheses · evidence · open questions), never a transcript.

## 7. Do not

1. Do not edit the engine to match a UI; do not let anyone else write `Football-Sim-*.html`; there are no candidate builds.
2. Do not move a protected constant, a pin, or a protected hash without the Owner's exact approval and a same-commit re-pin.
3. Do not change governance, queue or council tooling — MUSE owns them; propose in `inbox/`.
4. Do not start multisport code, a context-aware provider, or ratings-to-gap fitting before cutover and the Owner's go.
5. Do not re-run the passGap study, item-5/item-6, the vapor experiment, or the pairing arithmetic.
6. Do not merge or check out `origin/main` in any worktree; read it only with `git show`.
7. Do not read `V22-Suggestions.md` whole — only the section a work item cites. Do not treat `council/base`'s PRIORITIES.md as live (it is a stale ghost); the live queue is on `origin/council/muse`.
8. Do not publish an unseeded before/after outcome; do not call a gate PASS that you did not run.

## 8. Exact paths and first commands

```
# confirm the checkout and tip
git rev-parse --abbrev-ref HEAD                 # expect architect/engine-and-seats
git rev-parse HEAD                              # expect 40841047756db6bc688fd5b637df05ce674bfee4

# your own state
git show HEAD:claude/NOW.md
git show HEAD:claude/00-READ-FIRST.md
git show HEAD:claude/ref/agents-2-build-truth.md

# council flow
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q origin
node tools/council.mjs digest
node tools/council.mjs next
node tools/council.mjs board | grep -v REVIEWED

# gates
cd colors && npm ci
npm test                     # 430/430 pass, 0 fail
npm run tsc:check            # 89 errors (pinned 89)
node tools/ci/canary.mjs
node tools/probes/cdp-phone-check.mjs
node tools/post-merge-smoke.mjs

# handback receipts from the council
git show origin/council/pickle:inbox/20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md
git show origin/council/pickle:inbox/20261120-0245-pickle-TO-ARCHITECT-aa4f9b3d-verification.md
```

**Cross-reference:** the Cakepanz builder's order is `council/pickle:_agents/pickle/deliveries/zai-sitting-order-2026-11-20.md`; the council's parallel review order is `council/pickle:_agents/pickle/deliveries/council-parallel-sitting-order-2026-11-20.md`. Both point here. They are not yours to execute — yours is the product/engine and the cutover.
