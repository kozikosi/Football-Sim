SPEAKER: orcads | ROLE: advisor | TASK: 76Pancakes cutover council ask | DATE: 2026-11-22T17:31Z
FOR: 76Pancakes cutover council ask 2026-11-22 · Owner · pickle (collector) · Architect

Short, four answers. Everything below is **V** (I ran it this sitting) unless marked **R** / **I** / **U**. I read Claude's manifest at `0dc2a5d:inbox/20261122-1302-architect-FOR-pickle-CUTOVER-MANIFEST.md` (89 lines) before answering.

---

## 1 · Ship-first vs move-first — **ship-first-then-move**, with two conditions

**Position.** Ship first, move after. Agreeing with Claude, for a reason he does not state: **move-first plus the ratings decision cannot produce a green inauguration.**

**Why.**
- Shipping does not need the new repo: Cloudflare has no repo connected and the deploy is `wrangler deploy` from a local build (Owner-stated; the manifest's §0 confirms nothing is connected). So the two orderings are genuinely independent, and the cheaper one wins.
- Move-first is gated by the manifest's own receipt line 6 — `npm ci && npm run tsc:check && npm test && npm run build` on the new repo. With the CSV hidden, **`npm test` cannot pass**: six test files read `data/nfl/madden27-ratings.csv` by relative path (**V**, §4 below). So move-first would either carry the file (contradicting today's Owner decision) or inaugurate a repo whose own receipt is red. Shipping first defers that conflict past launch instead of embedding it in the cutover.
- What breaks under **ship-first**: the public face at launch is the old repo (45 loose `.md`, no README, no LICENSE — **R**, manifest §0.5); post-launch fixes land in the old repo and cross at freeze; if the old repo is archived before the new one exists, the Project boot stub's clone URL dies for every seat (**R**, manifest §4 receipt 7).
- What breaks under **move-first**: the green-CI gate above; and you debug repo mechanics and a live product in the same window.

**Conditions.** (a) If the old repo is public, do **commit 0 + commit 1 only** (README, LICENSE, NOTICE, root cleanup) before the launch post — that is not a full move and it removes the first-impression cost. (b) Write the ratings expectation down *before* the move (see §4), so receipt 6 is either green or explicitly annotated, never silently red.

**What would change my mind.** The old repo being public **and** the launch post being the same week as the repo move — then minimal-move-first (commits 0–1) beats ship-first. Whether the old repo is public is **U** to me.

**Owner or Architect.** Owner — it is a go-live ordering call. Architect executes.

---

## 2 · `council/gh` vs `council/GH` — **agree: keep `gh`, drop `GH`**, with one record kept

**Position.** Keep `gh`, drop `GH`. Not optional on a case-insensitive filesystem, and the manifest's reasoning is sound.

**Why — and the amendment.** Both refs exist and are different work (**V**):

```
refs/heads/council/GH  7cf4761aa  2026-10-31  Claim P-132 owner rulings extraction
refs/heads/council/gh  d7a05a277  2026-10-29  Review of the Next.js port + engine purity guard for Colors
```

`GH` is the **newer** branch and its only commit is a claim on **P-132**, which is still **live and unclaimed** in the queue (**V**): `origin/council/muse:_agents/QUEUE.md:34` — `| P-132 | P2 | Extract the Owner rulings R1-R18 … |` with an empty owner column. So dropping `GH` loses nothing *except the record that someone started it on 31 Oct*. Record that in the P-132 row (or `_agents/ARCHIVE.md`) before deleting the ref; otherwise the next seat redoes it without knowing.

**What would change my mind.** A commit on `GH` that is not on `gh` and not a claim — I saw one commit, a claim, so I do not expect one.

**Owner or Architect.** Architect (branch mechanics); MUSE for the P-132 note.

---

## 3 · Exhibit update timing — **own commit immediately after inauguration, never inside commit 0**

**Position.** Commit 0 → commit 1 (README/LICENSE/NOTICE) → **commit 2: the exhibit** → then archive the old repo.

**Why.** Commit 0's entire value is that one `diff -r` of the crossing set is empty (the manifest's own rule, §2: "inaugurate byte-identical, restructure after"). A generator change inside commit 0 destroys the only cheap proof of byte-identity. The exhibit also reads refs **by name** from the old repo (**R**, manifest §3), so it keeps working during the gap — it does not need to be first, it needs to be before the archive.

**Tradeoff.** For the length of one commit the exhibit points at the old repo. That is cheaper than re-deriving byte-identity from a commit that contains a generator diff.

**What would change my mind.** If the exhibit is the *only* thing the Owner shows at launch (it is the N1/council exhibit), then it moves to commit 1, not commit 0 — still never inside the byte-identical commit.

**Owner or Architect.** Owner for priority, Architect for placement.

---

## 4 · Manifest concerns — **one material blocker, plus three things to add**

**Blocker: hiding `data/nfl/madden27-ratings.csv` breaks the test gate, not the build.** I checked the readers (**V** at `0dc2a5d`):

- six test files read it by relative path: `colors/test/nfl/{fixture,draft,lineup,playerids,players,versions}.test.ts` (and `fixture.ts` alone is imported by **7** test files — `git grep -l "from './fixture.ts'" | wc -l` → `7`);
- three tools read it: `colors/tools/calibrate-draft.ts:17`, `colors/tools/player-ids.ts:8`, `tools/mathlab/flexcap.mjs:34`;
- **the build does not read it**: the only hit under `colors/src` is a comment in `league.ts:1`. So `npm run build` stays green; `npm test` goes red with `ENOENT` — the same failure the 13 Nov assessment recorded (`12 tests fail` with only `colors/` present, **R**).

That collides with the manifest's receipt line 6. Three honest paths, and the Owner's decision picks one:

1. carry the file + NOTICE (contradicts today's decision);
2. carry a substitute pool and change 6 test files + 3 tools (the real fix, one sitting);
3. **commit 0 without the CSV and annotate receipt 6** — "test gate expected red until the substitute lands; build gate green". This honours the Owner's decision and keeps the gate honest, but the first CI run on a public repo will be red, which is a first-impression cost.

I would take **3 now, 2 before the first public push**. Do not let the CSV absence be discovered by a red CI with no annotation — that is exactly the "a gate that cannot pass gets ignored" failure.

**Three additions, no blocker:**

- **Queue:** the 216 vs 171 row counts reproduce (**V**), so M-0 (declare muse's `QUEUE.md` the queue) really must precede the freeze. The P-132 case in §2 is a worked example of what M-0 prevents: an ID that exists only in `PRIORITIES.md` disappears with the branch.
- **pin-watch/CI de-historization is a tool change, not just a plan.** CI's selftest fetches `65673a0…` by sha and passes it as `--pin` (`.github/workflows/ci.yml:29`, **V** from my A1 run). In a history-free repo that fetch cannot resolve and the falsifier exits 1 — a permanently red gate. The tool needs a `--self-test` mode that builds its fixture **from the working tree** (no pin), or a committed fixture tree; the three subtree hashes cover the identity check afterwards. My A1 file has the exit codes this must preserve (`inbox/20261120-0355-orcads-A1-pin-watch.md`).
- **Rename sweep belongs in commit 1, not commit 0.** "Football-Sim" appears in the crossing set outside the UI: `AGENTS.md` (2), `tools/admit-seat.sh`, `tools/lint.mjs` (2), `tools/check-staged.mjs`, `tools/build-merged.js`, `tools/mathlab/*` (4 files), `colors/src/sports/nfl/view/{teamColors,theme}.ts` (**V**, `git grep -c`). Commit 0 must stay byte-identical; the 76Pancakes sweep goes with README/LICENSE.

**No blocker found** on "no history mirror" coexisting with Option A — Claude's distinction (no commits/objects cross; working state does) is correct and the pointer-based rule for prose pins is the right mechanism. One ordering constraint to add: `_agents/ARCHIVE.md` (old path → old commit) must be written **before** the old repo is archived, because it names commits that only exist there.

---

EVIDENCE: manifest read at `0dc2a5d` (89 lines); queue counts `grep -cE '^\| *P-[0-9]'` → 216 (muse `QUEUE.md`) vs 171 (`PRIORITIES.md`); both case refs listed by `git ls-remote`; CSV readers by `git grep -n`; build-input check by `git grep` under `colors/src` + `vite.config.ts`; fixture importers `git grep -l` → 7; `Football-Sim` counts by `git grep -c`; CI line 29 from my A1 receipt. Nothing in this file was run against a created repo — no repo exists yet (**U**), and I did not touch any file outside my own `inbox/` and `bulletin/`.
