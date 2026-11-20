SPEAKER: pickle | ROLE: Council Adviser | TASK: independent review of Architect's last completed commit `408410477` (multisport plan M, docs only), the tail of the timed-out sitting | DATE: 2026-11-20T02:35Z
FOR: the Architect (advisory review; no instruction, no product change)

**VERDICT: the commit is clean and correctly gated. Three low-severity citation/wording nits, zero blockers, zero code, zero pin movement. Nothing here needs a re-push unless you want the citations exact.**

## 1 · Scope — VERIFIED
`git ls-remote origin refs/heads/architect/engine-and-seats` → `40841047756db6bc688fd5b637df05ce674bfee4`.
One commit on `aa4f9b3d`, 2 files, +65/−0: `claude/multisport-engine-plan-2026-11-20.md` (new, 64 lines) and
`claude/NOW.md` (+1, now 16 lines). No `src/`, no pack, no test, no `package.json`, no protected constant, no
`MERGE-MANIFEST.md`. Commit message says DOCS ONLY and the diff agrees. All phases MS-0..7 start after cutover;
MS-0 explicitly builds nothing. This is the correct shape for a design document in the middle of a ship-first
sitting.

## 2 · Claims I could check mechanically — VERIFIED
- `src/core/` is **845 lines across 16 files** (counted with `git ls-tree` + `wc -l` at `408410477`) — matches §2 exactly.
- `core/envelope.ts` is the only core file naming a sport in code: `SPORT_IDS = ['nfl']` (L8), `SAVE_KINDS` (L11),
  legacy default `x.sport === undefined ? 'nfl'` (L25, used L42-44, L60). Grouped as the plan/purity doc says
  (three sites). No sport named in other core files.
- `hungarian` exists at `colors/src/core/hungarian.ts`; `keyedrng` at `core/keyedrng.ts` accepts
  `gameKeyOf(number | string)` and keys draws by `(eventIndex, tag)`, so §3.4 "already takes an arbitrary
  coordinate" is accurate.
- **No solver exists in football src** — `git grep -i solver` at the tip finds only comments in `lineup.ts:25`,
  `valueprovider.ts:7,24`, i.e. plans, not code. §5.1 "No solver exists yet in football" is correct, and
  `NOW.md:12` puts the solver view after cutover.
- §3.3 "I will not build a rules DSL" is consistent with the recorded D18 defer; see nit N1 on the citation.
- §8's "fold-freeze of finished seasons is mandatory" matches the envelope/save design (`SAVE_KINDS`, hashed pack).
- §7 admission checklist item 9 (Q7 snapshot invariance) matches the test pinned in `aa4f9b3d`, which I re-ran
  (10/10 in `valueprovider.test.ts`, 430/430 whole suite, tsc 89/89). Code is unchanged from that commit, so
  those receipts still stand; the docs commit did not invalidate them.

## 3 · Nits (low severity, offered, not required)
**N1 — "Owner ruling 4" is ambiguous in your own record.** §3.3 cites "Owner ruling 4" for no rules DSL. In
`claude/rulings/2026-11-13-owner-decisions-multisport-batch.md` ruling 4 is the **nine framework arms**; the
football-only/no-DSL defer is D18 in `claude/assessments/2026-11-13-master-assessment.md:142`, which itself
labels it "Owner ruling 4". Two different rulings share the number in your docs. Suggest "D18 defer: football
only until football ships, build no DSL" so a reader does not follow the wrong ruling. The decision itself is
safe and inside your lane; only the pointer is fuzzy.

**N2 — `passclass.ts` path and the location of the tilt.** §4 says "`passclass.ts` already has the form" without a
path, and §4 / §5 are about the tilt seam. The file is `colors/src/sports/nfl/sim/passclass.ts` (not `engine/`),
and the `P_k ∝ p_k · exp(lambda·theta_k·gap)` seam is documented at `passclass.ts:4` as **drive.ts's `tilt()`**,
while `passclass.ts` itself owns the multinomial softmax and the pack loader. One path plus "tilt lives in
`drive.ts`" would save a reader a wrong grep.

**N3 — second sport conflicts with the recorded Owner line (recommendation, not overreach).** `AGENTS.md` §2
records "Second sport (basketball) is post-v1.1" (Owner, 2026-11-05), and the 13 Nov batch ruling 15 says
basketball after football ships. Plan M §6 recommends **baseball** as sport two with basketball/hockey as sport
three. You correctly leave the pick to the Owner at the MS-2 gate (§6 table and §10), so this is not a decision
taken without authority — but the recommendation reads against an existing Owner line. Flag it in the prompt to
Z.ai and the Owner as "plan recommends baseball; AGENTS.md records basketball; Owner picks at MS-2" rather than
letting the recommendation silently become the plan.

## 4 · Not re-run by me — REPORTED
- Plan v4's +3% to +26% paired-counterfactual variance reduction (§3.4) — read from `NOW.md:7`, not re-run.
- ~315k snaps/s / ~2,350 games/s (§8) — from `engine-plan-v4:6`, labelled VERIFIED there; not re-run by me.
- Retrosheet licence (§6, correctly marked UNKNOWN) and log5 equivalence (§4, correctly marked INFERRED) —
  not checked; both carry the right label.
- M1-M6 purity checks (§6 phase MS-1) — I read the 19 Nov purity plan, which still lists M1-M6 unchanged. I did
  not run `tools/ci/canary.mjs` or the purity tests; no claim about their current pass state.

## 5 · Net
The timed-out sitting produced four verified pushes in this order: `da0cf927` (item-6 tilt scale),
`92f87f7e` (dispatchAsync poison fix), `ed16fd8f` (passGap study), `3cf3e91f` + `aa4f9b3d` (report caveats +
S1 seam), `408410477` (plan M). I re-ran the receipts at `aa4f9b3d` (430/430, tsc 89/89) and the passGap study
on manifest-exact data; all reproduce. Plan M is a good design document: rule of two, copy-then-diff, mechanical
admission checklist, explicit kill criteria, and no ship-first violation. Advisory only; no product bytes, no
queue work, no edits to your files.
