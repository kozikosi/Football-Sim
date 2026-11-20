# Standing brief for Z.ai — state, receipts, and open work (Pickle, 20 Nov 2026, 02:40Z)

Audience: Z.ai, High Councillor. Author: Pickle, Council Adviser (`council/pickle`). Purpose: a single self-contained handoff so you can continue **any** open thread without re-deriving state, after the Architect's sitting ended on a timeout at commit `408410477`. Everything below is labelled VERIFIED (I ran it this sitting, receipt in `inbox/`), REPORTED (another seat or a document says it), INFERRED (reasoned), or UNKNOWN. English only.

This is context and options, **not an assignment**. Council rule: nobody is assigned by name; whoever opens a chat runs `node tools/council.mjs next` (v9, from `origin/council/muse`) and takes the top line. Nothing waits for a particular seat. A review you can do beats new work in the same tier.

---

## 0. How to use this brief

1. Read `AGENTS.md` and `origin/council/muse:_agents/QUEUE.md` (the live queue; `council/base`'s PRIORITIES.md is a stale ghost). Never read `V22-Suggestions.md` whole — only the row a work item cites.
2. Run `node tools/council.mjs next` and take the top line it prints for you. The list below tells you what is live and what is already done, so you do not repeat it.
3. Work from your own branch/worktree, commit by path, push, verify with `git ls-remote`. If you are chat-only in this session, say so: file labelled `REPORTED` design input and name what you could not check. A missing tool is not a missing obligation — disclose it.
4. Send short, paste-ready replies. Label every claim. Give the command and its output, not "I believe".

## 1. Governance you must not break (the expensive mistakes)

- **Only the Architect writes `Football-Sim-*.html`**, on any branch, ever. No candidate builds. You supply ideas, exact snippets, mock-ups, measurements to `inbox/`, and tests after a build exists. Do not "just apply it" to a product file — that has not helped.
- **Do not edit** product HTML, the engine (`colors/src/**`), pins, protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, the `modelWeights()` monotone-quantisation contract, `teamRatings`), `AGENTS.md`, `CLAUDE.md`, `PRIORITIES.md`/`QUEUE.md`, `tools/`, `CHRONICLE.md`, `MERGE-MANIFEST.md`, or test orders. Propose in `inbox/` or your own lane.
- **One ranked list, one command, one chain.** No claiming, no named assignments. Work: `inbox/<UTC>-<seat>-<ID>-<slug>.md`; review by three *different* seats (`REVIEW-OF:`, `VERDICT: ok | improved | rejected`); three confirmations = REVIEWED ✓✓✓. No seat reviews the same item twice. A rejection reopens.
- **Inbox file format:** first line `SPEAKER: … | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: <ID>`, then either the §5 patch form (target build + sha256 · WHERE anchor string · old → new · WHY · SAFE ALONE? · HOW TO CHECK with expected output) or `IDEA:` text. One file per item. Code over ~150 lines goes in your lane (`deliveries/`), named by the inbox file with commit.
- **Labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN. PASS means checks ran clean; it is not product acceptance. An implemented change is not accepted; verified is not Owner-accepted.
- **Byte-check everything, a lot** (standing Owner rule Q6). Four lines per VERIFIED claim: directory, exact command, ref/sha, output. Re-measure quoted hashes with `sha256sum` before relying on them.
- **No unseeded before/after numbers.** Runs are not repeatable without an injectable RNG; only structural evidence (diffs, function hashes, calculations from tables) counts. The kernel now has `keyedrng` (keyed by `(gameKey, eventIndex, tag, n)`), but the product's 56–58 `Math.random()` sites are gone in Colors — check before claiming a seeded product run.
- **Reading rules go in their own commit BEFORE a run** (Architect's 20 Nov process fix). Do not write tolerances/expectations after seeing results.
- **Git hygiene:** one worktree per seat, branch `council/<seat>` only, started from `origin/council/base` by `tools/new-seat-worktree.sh`. Commit and push required; verify with `git ls-remote`. **Never force-push**, never `git stash`, never `git add -A` / `commit -a`; add by path. Rejected push = stop, run `node tools/preserve.mjs snapshot`, report. Never checkout/switch/stash/clean/reset/restore in anyone else's worktree or the shared tree. Run `node tools/preserve.mjs check` at session end.
- **Network hygiene:** any network git command gets a 60 s stall limit (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most twice; then commit locally and give the Owner exact numbered steps.
- **Delivery gate:** nothing is delivered until a pushed commit (give the hash) or a download link exists. Never give the Owner a sandbox path.
- **Data integrity:** no factual data invented, estimated, or silently corrected. Source-backed facts name their source; Owner-supplied facts quote the Owner; calculated facts show the formula; synthetic data is never used unless the Owner authorised that specific approach, and is labelled everywhere.

## 2. Build truth — what each name means (all hashes re-measured 20 Nov)

| Name | Location | Pin / sha | State |
|---|---|---|---|
| **76 Pancakes / Colors v1** | `colors/` on `origin/architect/engine-and-seats` | engine pin `4ca9a071`; tip `408410477` | Product. Svelte 5 + Vite. Cutover ships this when fully functioning. |
| **Pre-Colors** | `Football-Sim-PreColors.html` | `40233d6be00e987c` (657,486 B) | Frozen reference; engine anchor; POINTS_PER_WIN 32.5. |
| **Z post-blue waves** | `Football-Sim-Z-post-blue-wNN.html` on `origin/gh-pages` | w87 md5 `bffdccac…` (1,900,033 B) | Live wave series. `w88` is present on gh-pages; `index.html` is still w85, so w88 is not live until replaced. |
| **67 Cakepanz** | `67-cakepanz/` on `origin/gh-pages` | engine snapshot `4ca9a071` | Z.ai's parallel Svelte UI track. Slices: 1 Draft Board (done), 2 Team Select (done, being revised per P-317), 3 hydration + board chrome (queued, P-316), 4 feed, 5 shareables. |
| **Engine pin** | — | `4ca9a071` | Frozen snapshot every track consumes. Never edit the engine to match a UI. |

Architecture rule for the second track: a sport is six things — event vocabulary, Step `(state,key) → events`, Pack (values as data, structure as code, no rules DSL), keying by natural structure, slots/ratings + `ValueProvider`, league shell. Kernel is `colors/src/core/` (845 lines, 16 files at `408410477`), sport-free except `envelope.ts` (`SPORT_IDS`, `SAVE_KINDS`, legacy default).

## 3. The Architect's completed work — read this before touching anything

The sitting ended on a timeout after pushing the following chain. I re-ran every receipt; all reproduce.

| Commit | What landed | My receipt (`inbox/` on `council/pickle`) |
|---|---|---|
| `da0cf927` | Item-6 tilt scale: sizes tilts only; lambda 0, GLM off, no pack/default change | `20261119-2335-pickle-TO-ARCHITECT-da0cf927-verification.md` — 427/427, tsc 89/89 |
| `92f87f7e` | poisoned-chain fix in `dispatchAsync`: try/catch around `dispatch(a)` + `chain = run.catch(() => undefined)` | `20261120-0200-pickle-TO-ARCHITECT-92f87f7e-verification.md` — 428/428, tsc 89/89, negative control 14 pass / 1 fail with fix removed |
| `ed16fd8f` | passGap study at team-season granularity (`tools/mathlab/phase1/passgap.py`, `tools/mathlab/results/passgap-2026-11-20.md`) | `20261120-0235-pickle-TO-ARCHITECT-ed16fd8f-verification.md` — 3 windows reproduce on 10/10 manifest-exact parquet files; four ≤0.001 table nits |
| `3cf3e91f` + `aa4f9b3d` | report caveats; S1 seam `ValueProvider.winsPerOvr(row, base, snapshot?)` with Q7 pinned by test | `20261120-0245-pickle-TO-ARCHITECT-aa4f9b3d-verification.md` — 430/430, tsc 89/89 |
| `408410477` | multisport plan M (`claude/multisport-engine-plan-2026-11-20.md`), docs only, phases MS-0..7 post-cutover | `20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md` — clean, 3 low-severity citation nits |

**Receipts I re-ran myself (VERIFIED, Node v26.13.0):** from `git archive <sha>` extracted to `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/…`, `cd colors && npm ci` then `npm test` → `ℹ tests 430 / pass 430 / fail 0 / skipped 0`; `npm run tsc:check` → `tsc baseline OK: 89 errors (pinned 89)`. `valueprovider.test.ts` alone: 10/10. Do not claim a number you have not run.

**passGap numbers (VERIFIED by me, manifest-exact data):** split-half offense 0.54, defense 0.36; year-to-year offense 0.45, defense 0.2; combined slope ~0.94 (24–28 SE); implied lambda ≈6.9 is a unit conversion `1/Var(theta)`, **not a free dial**. Product stays **lambda 0, GLM off**. My third-decimal values were 0.550 and slopes 0.966 / 0.958 / 0.989; the report's 0.551 / 0.965 / 0.959 / 0.988. Cause is library versions (INFERRED: my pandas 3.1.0 / numpy 2.5.4 / sklearn 1.9.1 vs the report's 3.0.5 / 2.5.3 / 1.9.1; Ernie independently confirmed data matches manifest on his fetch with the same version pair as mine). Both are recorded; neither was overwritten. Do not re-litigate the decimal.

**Current env notes (VERIFIED in my worktree):** `NOW.md` is 16 lines at `408410477`; `npm ci` is required before `tsc:check`; nflverse fetch is `sh tools/mathlab/phase1/fetch.sh`. Green CI means only the BUILD gate + pin-watch self-test — `tsc` and `tests` are `continue-on-error`. Tolerances (18 Nov, REG 2016-25, n=2761): margin SD 14.158 ±10%, one-score 48.5% ±4, home win 54.8% ±4, blowout 16.1% ±3, sacks/team-game ±10% of 2.33/2.44/2.35. A miss is REPORTED, not a gate.

## 4. Review findings you should know (do not redo the work)

- **v3 sitting package** (hosted byte-for-byte at `council/pickle:_agents/pickle/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/`, my review `inbox/20261119-2252-pickle-P-287-v3-sitting-review.md`): two delivery-layer defects need text fixes before onward relay. **D1:** `deliverables/doc-fixes/FIX-NOTES.md` §5 says `patch -p1 < doc-fixes/c10-package.diff` "from the c9 subtree root" — falsified; it produces `No file found--skip this patch? [y]` / `1 out of 1 hunks ignored`. Correct: `patch -p1` from the **c10 package root**, or `patch -p5` from the c9 subtree root (strip `a/_agents/pickle/deliveries/`). My review gives exact replacement text; the `cp` commands in §5 are correct as written. **D2/E3:** report §10.2 misclassifies pickle's hosted-c9 byte truth — both hosted-c9 dists measure `670d4c08…` / 527,177 B; `76de5658…` / 527,162 B is the c10 nested copy. **R1 (strengthening):** `zai-cakepanz-9-2026-11-19/cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts:61` is `rows: rows.slice(0, limit).map(({ _w, _p, ...r }) => r)` — the shell parses display strings because the view strips the raw wins/priority; the fix needs an engine-view export + re-pin, not a shell-only patch.
- **Peer reviews** (`inbox/20261119-2327-pickle-P-287-review-of-peer-reviews.md`): Ernie's F1 and F8 are falsified from branches reachable in this repo (exact `suggestIds` parse and `END-OF-CHAT-ZAI.md` md5 `e52c0ddb…` both exist on multiple council branches); Beam's 2300/2345 substantive conclusions hold; the "52 files / CHECKSUMS 52/52" figure does not reproduce at the cited commit (51 files / 1,765,734 B / 49 rows; 52 is outer `SHA256SUMS` rows). No product impact.
- **Plan M review (new):** the core is 845 lines / 16 files (VERIFIED), `passclass.ts` lives at `colors/src/sports/nfl/sim/passclass.ts` and the tilt seam is `drive.ts`'s `tilt()` (not passclass itself). Three nits: (N1) "Owner ruling 4" is ambiguous — the 13 Nov batch's ruling 4 is the nine framework arms; the no-DSL defer is D18 in the master assessment; (N2) cite the passclass path and tilt location; (N3) plan M recommends baseball as sport two but `AGENTS.md` §2 records basketball as the Owner's second sport post-v1.1 — the plan correctly leaves the pick to the Owner at MS-2, but say so explicitly when relaying it.
- **Q7 comment (already present, no action):** `colors/src/sports/nfl/engine/valueprovider.ts:22-24` already says the context-aware provider is used for Priority and the game, never for the Wins the user sees. Ernie suggested adding it; it is there. The only style nit still open is mid-file aliased imports (`test as seamTest`, `assert as seamAssert`) at `colors/test/nfl/valueprovider.test.ts:85-86` — legal ESM, move to top if you touch the file anyway.

## 5. Open work you can take, ranked by leverage

Nothing here is assigned. Take the top line from `node tools/council.mjs next`; use this list to avoid duplication.

1. **Review multisport plan M** (`claude/multisport-engine-plan-2026-11-20.md` on `origin/architect/engine-and-seats` at `408410477`). It is new and needs three different seats. Check N1/N2/N3 above; verify the additivity/log5 claim is labelled INFERRED (it is), the license/coverage are UNKNOWN (they are), and the kill criteria and admission checklist are mechanical. File `inbox/<UTC>-zai-…review.md` with `VERDICT: ok | improved`.
2. **P-316 — Slice 3 hydration + board chrome** (gone-odds "between now and my next pick" tooltip + my-needs sticky row). This is your track; the engine snapshot is `4ca9a071`. A first-class suggestion contract (my S1, below) is the cheapest seam — implement it in `view/`, keep the engine untouched, and prove the display contract with a test that does not share the parse bug (S2).
3. **P-317 — revise Slice 2**: Team Select must let the user pick BOTH team and draft position (1–32); today the slot is fixed by team index. Keep its look. Exact queue row is on `origin/council/muse:_agents/QUEUE.md`.
4. **P-324 / w88**: w88 already exists on `origin/gh-pages`; verify the guide and rankings buttons show the NEW P-321 Wins numbers (QB 2.5, DE1 1.7, WR1 1.6, …), no stray weights where a position value is shown, and headless checks are clean. w88 is live only when `index.html` is replaced with it — that is the Owner's make-live step, not yours.
5. **My P-345 shell brainstorm** (`inbox/20261119-2252-pickle-P-345-v3-shell-implications.md`) — ideas, not verdicts: **S1** first-class suggestion contract (highest leverage); **S2** property-based battery invariant that does not share the parse bug; **S3** seeded visual gate against w89, blocked on `?seed=` (B1); **S4** one-click drafting with explicit slot and visible undo; **S5** self-verifying shareables. **I1–I4** are implications for the Cakepanz/UI shell. The P-318 `ValueProvider` already existed; `aa4f9b3d` added the optional `snapshot` argument. Nothing context-aware exists to read it, and call sites (draft, lineup, board) do not pass it — wiring the shell now would add noise. Context-aware provider and ratings-to-gap mapping are post-cutover.
6. **P-343** — `sport-football.json` C/OLB 200→150 is the Architect's file; council verifies when it lands. Do not edit it. LOO and weight-source work in P-340 is reviewed; the λ objective and display relabeling remain Owner calls (four seats for 0.40, two for 0.20 — report both, do not decide).
7. **Older owed corrections (check status before starting):** P-346 REV 4 checksum pass + C2 D4-field fix + Part D Plays Ledger corrections; P-341 five ledger corrections (Appendix A numbers, P-007 citation, check script, labels). These were outstanding on 11–12 Nov; a later sitting may have landed them — verify against the branch before doing work. The recurring checksum defect is mechanical: writers emit CRLF, shipping converts to LF, so CHECKSUMS computed before shipping are stale. Durable fix: LF writers + a re-run/check step on shipped bytes.
8. **Post-cutover only** — ratings-to-gap mapping fitted against the team-season tilt scores (the passGap tool's offense/defense tables are the labels); context-aware provider (solver view); `dispatchAsync` from the UI shell. All are explicitly AFTER the football cutover. Ship first; tune after. Do not start them now.

## 6. Verification protocol — commands and expected outputs

- Product/suite: `cd colors && npm ci && npm test` → `ℹ tests 430 / pass 430 / fail 0` at `aa4f9b3d` and `408410477` (docs-only change, no code). `npm run tsc:check` → `tsc baseline OK: 89 errors (pinned 89)`. `valueprovider.test.ts` → 10/10.
- Purity: `node --test --experimental-strip-types test/core/*.test.ts test/nfl/purity.test.ts`; canary `node tools/ci/canary.mjs` plants five violations, each must turn the right test red. Not re-run by me — report as such.
- passGap: `python3 tools/mathlab/phase1/passgap.py` against the 10 manifest-exact parquet files; declare tolerances in a commit BEFORE the run.
- Lint: `node tools/lint.mjs product Football-Sim-PreColors.html` (exit 5 = hash changed mid-run; exit 3 = Biome missing, UNVERIFIED not pass). `node tools/lint.mjs selftest` on a machine with Biome.
- Byte checks: `sha256sum <file>` / `md5 -q <file>`; `wc -c`; `cd <dir> && shasum -a 256 -c SHA256SUMS.txt`. Quote the file and the time when a hash was measured.
- Deliveries: `git add -- <your paths>`; `git status --short`; `git diff --cached --stat`; commit; `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 push -q origin council/<seat>`; `git ls-remote origin refs/heads/council/<seat>`; `node tools/preserve.mjs check`.
- Inbox collection for the Architect: `node tools/council-sync.mjs --inbox --days 7`; board: `node tools/council.mjs board`.

## 7. Kill criteria and things that waste the sitting

- No product HTML, engine, pin, protected constant, governance file, or queue edits from your seat.
- No unseeded before/after outcomes; no "I believe it works" without a command and output.
- No force-push, no stash, no `git add -A`, no network git command without the 60 s stall limit.
- No re-litigating the passGap decimal, the Q7 comment (already present), Ernie's falsified findings, or the w88 Wins table unless new evidence arrives.
- Do not start multisport code, context-aware providers, or ratings-to-gap fitting before the football cutover and an Owner go.
- If a gate FAILs, report the command and output; do not change the product to make a linter or test pass.

## 8. First five commands

```
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q origin
git show origin/council/muse:_agents/QUEUE.md | head -40
node tools/council.mjs next
git show origin/architect/engine-and-seats:claude/NOW.md
git show origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md
```

Then take the top line, file one inbox entry, commit, push, verify with `git ls-remote`, and end with `node tools/preserve.mjs check`. Keep the chat reply short and paste-ready; put the detail in the file.

---

*End of brief. Receipts for every VERIFIED claim in sections 3–4 are on `council/pickle` in the `inbox/` files named there; all were pushed and confirmed with `git ls-remote`.*
