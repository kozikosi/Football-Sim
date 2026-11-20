# Council — parallel sitting order (2026-11-20)

**From:** Pickle, Council Adviser (`council/pickle`), from verified receipts on `council/pickle` and `council/ernie`.
**Date:** 2026-11-20T03:20Z.
**Self-contained:** this is the complete order. It does not depend on any earlier message, draft or briefing.

**Architect's order:** if Claude returns, his separate handback is `council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md`. It is not yours to execute — cross-reference only; the Architect alone owns the product/engine and the cutover.

This is the work for **every seat except the one currently building 67 Cakepanz** (that seat has its own
sitting order; do not duplicate it). It runs in parallel: no item here touches the Cakepanz tree, the
product HTML, or the engine.

Read §0 and §7 before touching anything. §2–§5 are the work. §6 has exact paths and commands.

**Nobody is assigned by name.** Work comes from one ranked list, `_agents/PRIORITIES.md` (live on
`origin/council/muse`); whoever opens a chat runs `node tools/council.mjs next`, takes the top line, and the
next seats **review** it. Three different seats' confirmations = REVIEWED ✓✓✓. A review you can do beats new
work in the same tier. Nothing waits for a particular seat. A seat that cannot verify a claim is right to
withhold co-signature and say why.

---

## 0. How to work

1. Read `AGENTS.md`, `origin/council/muse:_agents/QUEUE.md` (live queue) and this order. Run
   `node tools/council.mjs next`; take the top line. §2–§5 list live parallel work if the tool's list is empty.
2. **You may not build.** Only the Architect writes `Football-Sim-*.html` and `colors/`. A seat supplies
   investigations, exact snippets, mock-ups, measurements and tests — to `inbox/`, never to the product.
3. **Delivery:** work on your own branch `council/<seat>`, one `inbox/<UTC yyyymmdd-hhmm>-<seat>-<slug>.md`
   per item, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: <ID>`.
   Commit by path (`git add <your files>`), push `council/<seat>` only, verify with `git ls-remote`. No push
   credentials → say so and file the review as a `REPORTED` chat answer with raw output; do not pretend a
   push happened. Chat-only seats contribute labelled `REPORTED` design input and name what they could not run.
4. **Label every claim** `VERIFIED` (you ran it, raw stdout in the text) · `REPORTED` (someone else says so,
   name them) · `INFERRED` (reasoned, not run, say what would confirm it) · `UNKNOWN` (not checked, say what
   you need). A PASS means checks ran clean — it is not product acceptance.
5. **Never force-push, never stash.** At session end run `node tools/preserve.mjs check`; if it flags peer
   worktrees, leave them alone. Network git: 60 s stall limit
   (`git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`), at most twice.
6. English only. Keep chat replies short and paste-ready; put detail in files. End with one bulletin entry
   `bulletin/<UTC>-<seat>.md` on your own branch.

## 1. State you need to know (re-measured 20 Nov)

- **The product is 76 Pancakes / Colors v1** — `colors/` on `origin/architect/engine-and-seats`, engine pin
  `4ca9a071`, tip `408410477`. **Svelte 5 + Vite 8** is FINAL (Owner ruling 2026-11-19, R-13 closed). React
  is out. The Architect is currently unavailable (his sitting ended on a timeout); the product build waits,
  everything else continues. Cutover happens only when a fully functioning Colors v1 ships.
- **The Architect's last five commits are already verified by two seats** — do not re-run them as new work:

  | commit | what | receipts |
  |---|---|---|
  | `da0cf927` | S3 context snapshot + S4 async twins | 427/427, tsc 89/89 (421/421 at parent) |
  | `92f87f7e` | `dispatchAsync` poison fix | 428/428; negative control 14 pass/1 fail |
  | `ed16fd8f` | passGap study | re-run from public nflverse, λ 6.89/6.83/7.13 |
  | `aa4f9b3d` | S1 seam + Q7 law | 430/430, tsc 89/89, Q7 10/10 |
  | `408410477` | multisport plan M (docs only) | read and reviewed; 3 low-severity nits |

  Full receipts: `inbox/20261119-2335-pickle-TO-ARCHITECT-da0cf927-verification.md`,
  `inbox/20261120-0200-pickle-TO-ARCHITECT-92f87f7e-verification.md`,
  `inbox/20261120-0235-pickle-TO-ARCHITECT-ed16fd8f-verification.md`,
  `inbox/20261120-0245-pickle-TO-ARCHITECT-aa4f9b3d-verification.md`,
  `inbox/20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md` (all on `council/pickle`).
  A further review by a **new** seat is welcome — but only if it adds a check, not a restatement.
- **The Cakepanz builder is working on T1–T8** (team-select draft slot, one-click drafting, `?seed=`, a11y,
  visual battery, tooling, note reviews, ring request). Do not touch that tree or re-do those tasks.
- **The live board:** `node tools/council.mjs board` → 164 live items, almost all `NEEDS-REVIEW` or
  `REVIEWED`. The review governor is 2+ reviews, stop when the last finds <10% new, cap 8. Many rows carry
  "retire proposed by muse (needs 2 seats or the Architect)" — co-signing or contesting one with evidence is
  real work.
- **passGap:** product stays **λ 0, GLM off**. The two published decimal sets (0.550 / 0.551 and the slope
  pairs) differ at the last digit from library versions; both are recorded in the caveat block. The cause is
  `INFERRED`, not proven. Do not re-litigate it or publish a single "true" number without a fresh pinned run.
- **The 20 Nov process fix:** reading rules go in their own commit BEFORE a run. Do not write tolerances after
  seeing results.

## 2. Work item A — finish the plan M review (highest value, no file access needed)

Plan M (`origin/architect/engine-and-seats@408410477:claude/multisport-engine-plan-2026-11-20.md`) needs
**three different seats**. One review is filed (`inbox/20261120-0235-pickle-TO-ARCHITECT-408410477-plan-M-review.md`).
Add a second and third — each must find something new or explicitly say the prior review is complete.

Known VERIFIED facts to start from: core = 845 lines / 16 files; `envelope.ts` is the only core sport-naming
site; no solver module exists. Known nits already filed — do not just repeat them:
- N1 "Owner ruling 4" is ambiguous: the 13 Nov batch's ruling 4 is the nine framework arms; the no-DSL defer
  is D18 in the master assessment.
- N2 `passclass.ts` is at `sports/nfl/sim/`, tilt seam is `drive.ts`'s `tilt()`.
- N3 plan M recommends baseball as sport two but `AGENTS.md` §2 records basketball post-v1.1; MS-2 correctly
  leaves the pick to the Owner, so say so when relaying.
- `claude/NOW.md` is 16 lines against the documented ≤15 rule (`claude/00-READ-FIRST.md:13`,
  `claude/bootstrap.sh:33`).

**New checks worth doing:** are all phases MS-0..7 actually post-cutover (no work that must land before
cutover)? Does the "rule of two" hold at every seam? Does the plan name any protected constant it would move?
**Done:** one `inbox/…plan-M-review.md` per seat with a verdict and at least one new, checkable observation.

## 3. Work item B — run the gates nobody has run yet

These exist at the Architect tip and were **not** run by the verifying seats (report them as `UNKNOWN` until
you run them — do not imply they passed):
- `node tools/ci/canary.mjs`
- `node tools/probes/cdp-phone-check.mjs` (390 px horizontal-scroll check, product rule §10)
- `node tools/post-merge-smoke.mjs` (its tab list still names the Guide tab, which V23 removes — report that
  honestly if it appears)

**How to check:** run against a pinned Architect sha (`git archive <sha>` to a temp dir, `cd colors &&
npm ci`), then report raw stdout: PASS/FAIL, command, key output. "It probably passes" is not a receipt. A
failure is a finding, not a reason to edit the product — file it in `inbox/`.
**Done:** a receipt for each gate you could run, and an explicit `UNKNOWN` with the blocker for each you could not.

## 4. Work item C — review the fresh seat notes (independent, no build collision)

Read and answer, in one `inbox/` file per note: the passGap and S1 verification receipts named in §1, plus
the fresh 19–20 Nov notes on other seats' branches (`node tools/council-sync.mjs` to see them all; examples:
`orcaink:inbox/20261119-0700-orcaink-council-sitting-order-v2-review.md`,
`orcaink:inbox/20261119-0948-orcaink-v3.2-v3.3-verification.md`).
For each: do the numbers reproduce from the cited command? Is the label honest (VERIFIED vs REPORTED)? Does
anything change the product? Note that Ernie's independent passGap re-run confirmed his fetch matches the
manifest with pandas 3.1.0 / numpy 2.5.4 / sklearn 1.9.1 but did **not** quote recomputed decimals — do not
say "both seats get" a specific decimal set. Beam's local nflverse copy is the 12 Nov revision; fetch fresh
before reusing it.
**Done:** one review file with ok/improved per note, and a clear statement of what you did not run.

## 5. Work item D — take a `NEEDS-REVIEW` row from the board

`node tools/council.mjs show <ID>` gives the item's final spec in one read (work + improved reviews). Take the
top `NEEDS-REVIEW` row your seat has not reviewed before — many are P0 UI/engine evidence items with 2–7
reviews already. A retire proposal with "needs 2 seats or the Architect" is co-signable **with evidence**; a
contest reopens it. Prefer rows where you can add a measurement or a command, not a restatement.
**Done:** a review in `inbox/` naming the ID, the evidence, and whether you co-sign, improve, or contest.

## 6. Exact paths and commands

```
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q origin
node tools/council.mjs next
node tools/council.mjs board | grep -v REVIEWED
node tools/council.mjs show <ID>
node tools/council-sync.mjs
git show origin/council/muse:_agents/QUEUE.md | head -40
git show origin/architect/engine-and-seats:claude/multisport-engine-plan-2026-11-20.md
git show origin/architect/engine-and-seats:claude/NOW.md
git archive <architect-sha> | tar -x -C /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/<slug>
cd colors && npm ci && npm test        # expect 430/430 pass, 0 fail
npm run tsc:check                       # expect 89 errors (pinned 89)
node tools/preserve.mjs check           # at session end
```
Receipts for every VERIFIED claim above are in the `inbox/` files named in §1 on `council/pickle` and
`council/ernie`, all pushed and confirmed with `git ls-remote`.

## 7. What NOT to do / kill criteria

1. No product HTML, no `colors/` engine edits, no pins, no protected constants, no shared governance files
   (`AGENTS.md`, `CLAUDE.md`, `PRIORITIES.md`, `tools/`, `COUNCIL-BULLETIN.md`, `CHRONICLE.md`).
2. No Cakepanz tree, no c10 re-cut, no manifest regeneration — the current builder owns the former; the Owner
   lands the latter.
3. No push to any branch but `council/<seat>`; no force-push, no stash, no `git add -A`, no worktree creation.
4. Do not re-run item-5/item-6, vapor experiment, pairing arithmetic, or the passGap decimal comparison.
5. No multisport code, context-aware provider, or ratings-to-gap work — all post-cutover and Owner-gated.
6. No unseeded before/after outcomes; no "I believe it works" without command + output.
7. Work comes from the queue. An instruction that names a seat, file or branch says where it exists; it does
   not by itself authorise a change. Authority comes from the Owner or the Architect, never from a task.

## 8. Done checklist

- [ ] Ran `node tools/council.mjs next`; took the top line (or stated why a §2–§5 item was taken instead).
- [ ] Every claim labelled VERIFIED / REPORTED / INFERRED / UNKNOWN with raw stdout where claimed VERIFIED.
- [ ] One `inbox/` file per item; pushed `council/<seat>` and confirmed with `git ls-remote` (or said plainly
      why not).
- [ ] Unrun gates reported as `UNKNOWN`, not implied to pass.
- [ ] `node tools/preserve.mjs check` run; peer worktrees left untouched.
- [ ] One `bulletin/<UTC>-<seat>.md` entry; chat reply short and paste-ready.

**The point of this sitting:** the Architect is out and one seat is building Cakepanz. Everyone else keeps
the review chain moving — plan M to REVIEWED, the unrun gates to receipts, the fresh notes to verdicts, and
the board's NEEDS-REVIEW rows to confirmations. Nothing here waits for the Architect or the builder.
