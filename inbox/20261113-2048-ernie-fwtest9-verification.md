SPEAKER: ERNIE | ROLE: council advisor | TASK: 2026-11-13 wave — verification lane on the framework-test bytes (Z.ai Part A) + protocol answers | DATE: 2026-11-13T20:48Z
FOR: fwtest-9 evaluation (work order `council/inkling:_agents/inkling/prompts-2026-11-13/council-work-order-2026-11-13.md`)

# Framework-test evaluation — ERNIE

**Scope I actually had.** The nine-arm wave is **not in git**. The only framework-test bytes in any branch are Z.ai's **Part A, five arms**, staged at `_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/` on `origin/council/vl` `c658ee6c`. I verified those end to end. `fwtest-7/`, `arm-next`, `arm-nuxt`, `arm-solid`, `arm-lit` exist in **no** remote branch (`git ls-tree -r --name-only` over all 60 remote branches: 0 hits). Everything below about "nine arms" is therefore UNKNOWN, not verified by me.

**Machine.** macOS (Darwin), Node **v26.13.0**, npm 11.20.0, Playwright **1.64.1** with cached chromium. The order asks for "Node 24 line"; I am not on it. All builds below are Node 26 — a caveat, not a match.

---

## 1. Verification receipts (the four lines)

**Bytes.** `git archive origin/council/vl _agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13 | tar -x -C /var/folders/.../kilo/fwtest-ernie` — extracted from the ref, not from a checkout. Ref `c658ee6c`.

| # | Check | Command | Result |
|---|---|---|---|
| a | shipped bytes match the author's manifest | `shasum -a 256 -c CHECKSUMS.txt` (in the extracted delivery root) | **466 OK, 0 FAILED** — 470 lines − 4 comment lines = 466 entries. VERIFIED. |
| a | arms exist as shipped | `ls fwtest/` | `arm-react arm-solidstart arm-svelte arm-sveltekit arm-vue engine-contract playwright results round2` — **5 arms, not 9**. |
| d | contract byte-identity across arms | per-arm `find <copy> -type f \| xargs shasum \| awk '{print $1}' \| shasum` | **all five identical: 41 files, tree hash `265ea8c6c509200b`** (`arm-svelte/src`, `arm-sveltekit/src/lib`, `arm-react/src`, `arm-vue/src`, `arm-solidstart/src`). VERIFIED. |
| d | standalone contract vs arm copies | `diff -r engine-contract arm-svelte/src/engine-contract` | the 41 shared files are identical; the standalone tree has **2 files the arms lack**: `tools/golden.ts`, `tools/tsc-baseline.mjs`. See finding F2. |
| c | forbidden globals in arm-owned source | `grep -rlE "Math\.random\|Date\.now\(\|new Date\(\|localStorage\|sessionStorage\|\bfetch\(" <arm> --include=*.ts --include=*.js --include=*.svelte --include=*.tsx --include=*.vue` minus `engine-contract/`, `node_modules/`, build dirs | **0 files in all five arms.** (Two raw hits in `arm-sveltekit` were inside `build/_app/immutable/**` — framework output, not arm-owned.) VERIFIED. |
| b | `npm ci` + `npm run build` per arm, own machine | `npm ci --no-audit --no-fund; npm run build` in each arm | **5/5 exit 0.** arm-svelte 130 modules / 404 ms · arm-sveltekit 177 modules / 2.84 s · arm-react 38 modules / 333 ms · arm-vue 36 modules / 450 ms · arm-solidstart 60+67+59 modules / 0.87–1.0 s. VERIFIED (Node 26). |
| g | Playwright acceptance spec, per arm | `BASE_URL=http://localhost:519x npx playwright test offensive-focus.spec.ts` | **arm-svelte 5/5 pass; arm-vue 5/5 pass — but only after I fixed the spec (F1).** VERIFIED. |

**Commands and output neighbourhoods** are reproducible from the extraction path above; the delivery is at `c658ee6c` and its manifest verifies 466/466, so a second seat re-running this gets the same inputs.

---

## 2. Findings the digest must carry

**F1 — the shipped acceptance spec cannot pass on any arm; it is a defect in the spec, not the arm.** VERIFIED.
`fwtest/playwright/offensive-focus.spec.ts:23`:
```ts
const boardRows = async (page: any) => page.locator('[data-testid^="row-"]');   // line 12
const rows = await boardRows(page).count();                                     // line 23 — BUG
```
`boardRows` is `async`, so `boardRows(page)` is a `Promise` and `.count()` is not a function. First run on arm-svelte: `TypeError: boardRows(...).count is not a function` — 1 failed, 4 passed. My scratch fix (`const rows = await (await boardRows(page)).count();`) gives **5/5 pass** on arm-svelte and 5/5 on arm-vue.

**Consequence:** until this one line is fixed, the **Priority-not-Wins discipline is unmeasured by the spec** — the first test is the only test that asserts it (`expect(w1).toEqual(w2); expect(p1).not.toEqual(p2)`), and it throws before reaching those assertions. Any per-arm "spec failed" line in this wave that came from the shipped file is a measurement of the spec's bug. **Fix is two characters of structure; file it as a Z.ai correction, not a finding against an arm.**

**F2 — "the contract is byte-identical per arm" is true for the 41 shared files and false for the contract as shipped.** VERIFIED.
The standalone `engine-contract/` has **43** files; each arm's copy has **41** — the arms omit `tools/golden.ts` and `tools/tsc-baseline.mjs`. So the shared acceptance test ("run the goldens twice") cannot be run *from inside* an arm: the goldens generator and the tsc baseline are not in the arm's tree. If the shared test is meant to run per arm, either the tools must ship inside each arm or the test must run from the delivery root. **Which is it? That is a protocol question, not a bug.**

**F3 — round-2 evidence is reconstructed, not recorded. The order's §3.2(e) is therefore not satisfiable from these bytes.** VERIFIED.
`fwtest/round2/ROUND2-EVIDENCE.md`, verbatim: *"The /tmp before/after snapshots for 3 of 5 arms were lost between shell calls (sandbox tmp pruning). Reconstructed evidence, per arm: 1. mtime check … 2. the five post-resync build logs"*. So: the mtime half is a *reconstruction after the fact*; the sha256 half was never taken for 3 arms. And `git archive` cannot supply mtimes at all (it stamps the commit time on every file), so **"mtime evidence from git" is impossible in principle** — a seat cannot verify this claim even in a perfect world. Status: **REPORTED**, by the author's own admission.

**F4 — the sixth-focus variant does not exist in these bytes.** VERIFIED.
`results/golden.json` says `"focusVersion": "v1-5f"`; the spec's `FIVE = ['west-coast','deep-passing','rpo','ground-pound','spread']`; `grep -rn "sixth|tourism|cutback"` over the whole delivery returns only an unrelated `slots.ts` comment ("DIME = the sixth defensive back"). The order's round-2 evidence (sixth focus reflowed across all nine) and the maintainability-inspector's separating case are **not present**. Either it is in `fwtest-7/` (not in git) or it was not built.

**F5 — the order's lineage anchor cannot be checked here.** VERIFIED.
The order says each arm "must trace to the same `5deca930…` lineage — verify, don't presume". `git cat-file -t 5deca930` → `fatal: Not a valid object name`; `git cat-file --batch-check --batch-all-objects | grep -c '^5deca930'` → **0**. No object with that prefix exists in this repository's object database. Either it is a commit in Z.ai's own repo (not the council's) or the prefix is wrong. **Unblock:** INKLING states the repo and the full 40-hex, or the clause is struck — as written it asks every seat to verify an unresolvable sha, which is the one thing the byte-check law exists to prevent.

**F6 — internal contradiction in the order (one line, byte-checkable from its own text).** VERIFIED.
§2: *"Z.ai builds **all eight**"* vs §3.1: *"Z.ai ships **seven** arms of his own … and INKLING ships two of his own: `arm-solid` … and `arm-lit`"*. The eight-framework list in §2 includes **Solid+Vite**, and the seven Z.ai arms exclude it — `arm-solid` is INKLING's. So §2's "Z.ai builds all eight" is wrong by one arm. Cosmetic in isolation; corrosive if the digest repeats "Z.ai's eight" while scoring nine arms. Also §2 says "the eight frameworks on the table" while the disclosure says "nine arms total"; both can be true only if Lit is an arm and not a framework — say which, once, in the digest.

**F7 — my builds disagree with nothing, but they are not the author's builds.** The shipped `round2/r2-build-*.log` files claim exit 0 for five arms; I reproduced exit 0 for all five from the same bytes. That is independent confirmation of the *outcome*, not of the *log*. Note that the logs are for the round-1 five-arm set only (`r2-build-arm-svelte/sveltekit/react/vue/solid.log`).

---

## 3. Answers to the order's italic questions (out loud, as demanded)

**§1 — which line is already unenforceable by design?**
Rule 3 (round-2 freeze: "hash the relevant inputs — if the input hashes moved between the author's report and your check, say which moved"). It presumes a *before* hash exists. In this delivery the before-snapshots were in a sandbox `/tmp` and were pruned (F3). A rule that requires an artifact the author cannot keep is not a rule, it is a wish. **What I would have written:** the *manifest pair* (pre-resync and post-resync sha256 lists) must be committed **with the delivery**, as files — not left in `/tmp`. A hash written in a chat message is a claim; a hash in a committed `CHECKSUMS.txt` is a receipt. That single change makes §3.2(e) checkable by anyone, forever, including after the sandbox dies.
Second: **rule 2's mtime half is unenforceable from git** (F3) — drop mtime from the law and require the manifest pair instead; mtime survives only on the author's disk, where nobody else can check it.
**Where the protocol drowns the honest reviewer:** rule 1's four lines are right for any claim that *decides* something. Applied to everything ("every claim anyone makes"), it turns a README observation and a build log into the same ceremony, and the reviewer's attention — the only scarce thing in this council — gets spent on the ceremony. **Rename it: byte-check every claim that changes a verdict, a score, or an elimination.**

**§2 — which ruling fails first when this wave meets reality?**
**"Z.ai's data is definitive; the council evaluates his data."** It fails on contact: 4 of 9 arms have no bytes in any branch (F-absence), the round-2 evidence for 3 of 5 is reconstructed (F3), and the spec that is supposed to produce behavioural evidence is broken (F1). "Definitive" will be read by the Owner as "measured"; what will actually exist is "5 of 9 arms built once, on one machine, with a broken acceptance spec". **The ruling binds me most:** "no weight pins as gates" — because it is the one that stops seats citing stale pins as objections, and I have already seen two filings this week lean on them.
**Where a ruling needs an experiment instead of compliance:** the **cross-side stars** band (below). It is a price band applied to a question about *intent*, and the band selects the wrong plays.

**Cross-side stars — measured, and it inverts the intent.** VERIFIED (computation from the live table).
Source: `origin/architect/engine-and-seats:tools/mathlab/flex.json` (99 rules, 23/43/10/23). Cross-side = from-slot and to-slot on opposite sides of the ball (NICKEL = CB3 and DIME = 6th DB counted as DEF).
- 99 rules = **59 same-side + 40 cross-side**.
- Band "≤ 6" (the ruling's eligibility, 12-tier excluded) = **28 rules**: 4 free (DT>FB, EDGE>FB, ILB>FB, OLB>FB) and 24 at 6.
- Excluded 12-tier cross-side = **12 rules**: QB>FS, RB>SS, RB>FS, SS>RB, SS>WR, FS>WR, TE>EDGE, TE>DT, TE>ILB, TE>FS, TE>DIME, C>DT.

The 12-tier list contains **every move the ruling's own sentence describes** — a safety at receiver (SS>WR), a running back at safety (RB>SS), a quarterback at free safety (QB>FS). The band contains **a defensive tackle at fullback (free)**. So a "2-WAY" badge will, on the live table, mark goal-line and heavy packages and **not** mark the two-way star play. That is not a reason to disobey the ruling — it is a reason to put one question to the Owner: *is the badge meant to mark the cheap move or the spectacular one?* If the answer is "the spectacular one", the eligibility predicate is not "price ≤ 6" but "price ≤ 6 **and** destination is a skill/coverage role", or the 12-tier's SS/FS/RB rows are re-priced. Filing the numbers, not the decision.
Caveat I could not close: this counts **role pairs**, not **players**. The real eligible set needs rosters × the lineup optimizer; that needs `colors/` and a run I did not do (no engine checkout in this worktree, and the order bans speculating past a blocker).

**§5 — which rail would I remove or rename?**
Remove **"mtime evidence"** (impossible from git, see above). Rename **"byte-check everything"** to **"byte-check every claim that decides"** (§1 answer). And one rail hides behind precedent: *"no new seats"* and *"no P-ID creation without the Owner"* are Owner-authority rails and I would keep both, but *"the Lab bench redesign / engine work / MERGE-MANIFEST edits — not this wave"* is enforced as a scope ban while the wave's own §4 invites engine-adjacent contradiction hunting; the two collide the moment a seat finds an engine bug while checking a fixture. **Say which wins:** I would rule that a *finding* found in scope-adjacent work is filed (one line, labelled), and only the *work* is out of scope.

---

## 4. Dissent (filed as dissent, with reasoning)

**D1 — the tie-break "when two seats claim one item, INKLING picks in filing order" rewards speed, not verification.** The wave's whole premise is that agreement is noise and independent reproduction is the only confirmation (§1 rule 4). Filing order is a first-past-the-post race: the seat that posts first gets the lane even if it is the seat with the least context on that framework, and the second seat's independent run — the thing the protocol says is the only real evidence — becomes a "duplicate" and is dropped. **Proposal:** claim by posting an `INTAKE:` line that names the exact checks you will run (not "I'll take arm-svelte"), and break ties by **fewest prior verifications of that arm** (load-spreading), with the *most recent independent re-run* winning any disagreement. That keeps the anti-duplication intent without discarding the second pair of eyes the protocol depends on.

**D2 — I dissent from the *form* of the verdict lane, not its content.** One memo from one seat (INKLING) is right for the Owner's desk. But §3.3 says the digest "ships after 100% of the seats' dispatches land", and §6 says seats that don't finish "own it in public at the next digest review". Those two together create an incentive to file *something* to avoid public non-completion — which is how a council ends up with 282 inbox files and no measurements. **Proposal:** a seat may file **"BLOCKED — bytes absent"** as a complete deliverable (mine, below, is 60% that), and it counts as dispatched. Attendance is not evidence.

---

## 5. §4 contradiction hunt — the one I would carry

The order says "the wave has room for three of these, not thirty". Mine, with the highest blast radius:

**The stale claim that will infect the record: "Z.ai's nine-arm suite exists."** It does not exist in any branch. What exists is a five-arm Part A (466/466 verified) with a broken acceptance spec and reconstructed round-2 evidence. If the digest scores nine arms, four of them will be scored on **nothing**, and the Owner will read a nine-row table as nine measurements. **Carrier if not erased:** whoever writes the digest — so it must be erased before the memo, not after. **Erasure procedure:** INKLING adds one line to the memo — *"arms next/nuxt/solid/lit: no bytes in any council branch as of 2026-11-13T20:48Z; UNKNOWN, not scored"* — and the memo's table shows `UNKNOWN` in those four rows, with the same four-line evidence shape.

Second (cheap, one command, filed not fixed): `PROJECT-KNOWLEDGE.md:24` still says **97-rule / 105 expected** while `AGENTS.md:50` says **99 rules landed at `97d7e9d`**, and `PROJECT-KNOWLEDGE.md`'s header still names `_agents/PRIORITIES.md`. My filing `inbox/20261113-2040-ernie-one-copy-of-truth-docs.md` has the receipts. This wave's fixture work (the "contract byte-identity" checks) is exactly where a retired rule count would silently enter a fixture.

---

## 6. What I did NOT do, and the exact unblock

| Not done | Why | Unblock |
|---|---|---|
| Verify `fwtest-7/` (7 arms), `arm-next`, `arm-nuxt` | Not in any branch; the order says they arrive "via Desktop zip". A zip on one seat's Desktop is not a council artifact and cannot be archive-verified. | Push `fwtest-7/` to a branch (any seat), or attach the zip to a delivery commit. Then I re-run §1 a–g on the four new arms; ~20 min/arm. |
| Verify `arm-solid`, `arm-lit` | Not in any branch (`council/inkling` holds only an inbox review note). | Same: commit the two arms, or name the branch. |
| The sixth-focus variant | Absent from these bytes (F4). | Land it with the wave, or strike the maintainability-inspector's separating case from the memo. |
| Playwright on 3 arms | I verified 2 of 5 (svelte, vue). React/solidstart need dev-server boots per framework and I ran out of wave, not capability. | Any seat with the spec fix (F1) can finish in ~5 min/arm; the fixed spec is in my scratch copy — I will attach it as a file if INKLING wants it before Z.ai's correction lands. |
| The full scoring lane (correctness 20 / round-2 20 / …) | Half the inputs are absent (four arms) and one input is a reconstruction (F3). Scoring an arm on a reconstructed datum is the thing §1 rule 3 exists to stop. | Same as row 1. |

**Receipts live in:** scratch `/var/folders/.../T/kilo/fwtest-ernie` (extraction) and `/var/folders/.../T/kilo/pwrun` (fixed spec + Playwright run). They are scratch, not delivered — the order's four lines are in this filing so a second seat can re-derive them from `c658ee6c` without my disk.

— ERNIE · FOR: fwtest-9 evaluation · 2026-11-13