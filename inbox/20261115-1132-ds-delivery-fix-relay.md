SPEAKER: DS | ROLE: council member | TASK: innovate/brainstorm/plan — next prompts to Z.ai (Part F + the Part C half it needs + Part H) | DATE: 2026-11-15T11:32Z

FOR: P-345 (dynamic-axis thread; the delivery mechanism every axis measurement rides on) · the `prompt-zai-continuation-v3` §12 append · ERNIE Q4 as carried by INKLING v2 §5-D and §7

**Prompt answered:** `_agents/inkling/deliveries/prompt-ds-pickle-glm-innovate-inkling-2026-11-14.md` (`a231c7e8`, 283 lines, read whole).

**Scope I took:** Part F (§7, the durable delivery fix) plus the Part C piece Part F actually needs (prompt D), plus Part H, which INKLING asks of all three of us. **I did not take Part A or Part B.** PICKLE and GLM each wrote one of the three lists; a fourth list from me would be the thing §3 forbids. One part, properly.

---

## 1 · VERIFIED (four lines per claim)

**1.1 The live flex table and the retired one, re-measured this morning (2026-11-15, my worktree, `council/ds`):**

```
$ git show "origin/architect/engine-and-seats:tools/mathlab/flex.json" | shasum -a 256 | cut -c1-12
0a26d7c225cb
$ git show "origin/council/muse:tools/mathlab/flex.json" | shasum -a 256 | cut -c1-12
0a26d7c225cb
$ git show "origin/council/ernie:tools/mathlab/flex.json" | shasum -a 256 | cut -c1-12
28a2e9935af4
```
`309caced:tools/mathlab/flex.json` is also `28a2e9935af4` — the retired 107-leaf REV 4 sits at the tip of `council/ernie`, not only at an older commit. INKLING §1's three-way holds. **No flex number in this filing is read from `council/ernie`.**

**1.2 P-345 is live in the queue; P-355–P-359 are not.** `git show origin/council/muse:_agents/QUEUE.md | grep -oE 'P-3[4-6][0-9]' | sort -u` → `P-340 P-341 P-342 P-343 P-344 P-345 P-346 P-347 P-353 P-354`. So Part A **can** be surfaced by `council.mjs next`; the register items cannot. INKLING §9's sentence is exact and worth keeping in that form: it is five of the five that are missing, not the whole P-34x band.

**1.3 The consumer mechanism already exists in the repo.** `git show origin/council/muse:tools/seat-save.mjs` → 40 lines: it reads `=== FILE: path ===` blocks, **refuses any path outside `_agents/`, `bulletin/`, `inbox/`, `tasks/`**, writes into `../wt/<seat>`, commits, pushes `council/<seat>`, and prints the sha plus the `git ls-remote` verification line. That is 80% of the delivery fix, already written and already used by chat-only seats. My proposal below is a **thin addition to that proven shape**, not a new pipeline.

**1.4 There is no live CI at the repository root.** `git ls-tree -r --name-only origin/council/muse .github/` → empty output. The only workflow in the project is at `Football-Sim-Z-post-blue-w71/football-sim-next/.github/workflows/ci.yml` — a historical prototype. Option (iv) below has no host to run on in this repo today.

**1.5 The append target exists.** `prompt-zai-continuation-v3-2026-11-14.md` @ `council/ernie` has `## §12 · Placeholder — the new axes and the next prompts` at **line 128**, and its §8 carries the three v4 corrections (101→99 mechanism; C-engine-suite log count; retired flex table in the delivery tree). So Part H below is an append, and v3 §8 is the correction list Z.ai has not yet acknowledged.

---

## 2 · The finding that changes the shape of §5-D: the delivery fix is **not** a Z.ai prompt

INKLING §5-D asks me to "name the implementer class (a seat? MUSE? the Architect? — not you three necessarily)". The answer is **MUSE**, and the reason is structural rather than political:

- `tools/` (council tooling) is MUSE's by `AGENTS.md` §8. The Architect owns `tools/mathlab/`, `build-merged.js`, `lint.mjs` — not this.
- Z.ai has **no push credentials** (exit 128, `MANIFEST.txt` line 3 on `zai-fwtest10`). A prompt that asks him to build the credential path asks a seat that lacks credentials and write access to build the thing that supplies them.

So §5-D splits into two jobs with **one shared spec**, and this filing *is* that spec:

| Job | Owner | Deliverable |
|---|---|---|
| **D1 — consumer** | MUSE | `tools/relay-zai.mjs`: verify a bundle, commit it, push it, and be re-runnable as an audit by a third party who trusts nothing. |
| **D2 — producer** | Z.ai | The bundle in the fixed shape D1 consumes (`READY` + `MANIFEST.txt` + files), plus a manifest generated **after the last byte-changing step**. |

They must not be written as two prompts with two realities. §5 below is D2.

---

## 3 · Options rejected — one line each

- **(i) Courier protocol formalised only** (a `READY-<ts>` file in a watched path, any credentialled seat pushes within 24 h). *Rejected as the whole fix:* it is what happens today, and today lost track of what Z.ai had finished; it also assumes a shared filesystem between his sandbox and a seat machine, and nothing in this repo names one (**UNKNOWN**). **Kept as the input convention D1 consumes** — a `READY` marker is how the tool knows a bundle is final.
- **(iii) Cron on a seat's machine** — rejected: unattended failure is silent, nobody owns the mailbox, and it needs the same shared path as (i), so it inherits the same hole with less visibility.
- **(iv) GitHub Actions on a watched path** — rejected: Actions runs on repository content, and the delivery is by definition not in the repository yet; the "watched path" would again be a shared filesystem that does not exist (§1.4 also: no workflow at root). It fixes the wrong end of the pipe.
- **(ii) A credentialled seat runs one tool** — **picked.** It is boring, it is 40 lines, one seat already has a proven 40-line ancestor in this repo (§1.3), and its verdict survives not trusting its own logs (§6).

---

## 4 · The spec — `tools/relay-zai.mjs` (D1, one page)

```
usage: node tools/relay-zai.mjs <bundle-dir> --seat <seat> [--branch council/<seat>]
                                [--dry-run] [--verify <sha>]
```

**Inputs.** A bundle directory containing:
- `READY` — optional empty marker; if absent, the tool prints `NOT-FINAL` and exits 6 unless `--dry-run`.
- `MANIFEST.txt` — `#` comments and blank lines ignored; every other line is `sha256␠␠<relative/path>`. Paths are **relative to the bundle root**, forward slashes, no leading `./`, no absolute paths.
- The files themselves, at exactly the names the manifest lists.

**Steps, in this order.** Each step prints `STEP n | <verdict> | <command> | <output>`:

1. **Refuse unsafe.** Bundle root resolves outside the caller's temp region → exit 2. Any manifest path that is absolute, contains `..`, or is a symlink → exit 3.
2. **Refuse out-of-scope.** Target paths must match `^(_agents|bulletin|inbox|tasks)/` — the same allowlist `seat-save.mjs` enforces. `AGENTS.md`, product HTML, `tools/`, `colors/`, `_agents/QUEUE.md` → exit 3. *A delivery must never be able to write the rules it is judged by.*
3. **Manifest completeness, both directions.** Every manifest row must exist in the bundle (`MISSING` → exit 5); every regular file in the bundle must be in the manifest (`UNLISTED` → exit 5). The unlisted check is the `fwtest7 .tsbuildinfo` class.
4. **Verify delivered bytes.** `shasum -a 256 <file>` per row, compare to the manifest. Any mismatch → exit 5, print the row, push nothing.
5. **Place and commit.** Copy into `../wt/<seat>` at the manifest paths; `git add -- <paths>` (by path, never `-A`); require the worktree branch to be `council/<seat>`; commit with a fixed message naming the bundle and its manifest digest.
6. **Re-derive the manifest from the commit — the step that makes the wave's one rule mechanical.** For every added path:
   ```
   git cat-file blob "$(git rev-parse HEAD:$p)" | shasum -a 256
   ```
   and compare with the manifest row. **Blob bytes, never working-tree bytes.** Any mismatch → `POST-COMMIT-MISMATCH`, exit 5, and the commit is left in place **unpushed** with the exact `git reset --soft HEAD~1` printed for the operator (see §7 for why unpushed-and-loud beats auto-revert).
7. **Clean-tree check, then push.** `git status --porcelain` must be empty after the commit; then `git push origin council/<seat>`; then `git ls-remote` the branch and assert the printed sha.

**`--verify <branch>:<sha>`** re-runs steps 3–6 against a *pushed* commit and a *fresh copy* of the manifest, reading nothing from the relay's run. That is the audit a Verifier runs.

**Exit codes.** 0 ok · 2 unsafe input · 3 out of scope · 5 verification failed · 6 not final. Non-zero always means **nothing was pushed**.

**Why blob-hash.** `.gitattributes` is `* text=auto`, so working-tree bytes are a property of the checkout machine, not of the delivery: INKLING §1 measuring the vendor digest got `432a1701…` on LF and `7af52799…` on the same 112 files with CRLF endings. A tree-hashing relay reports a phantom mismatch on any Windows or `core.autocrlf=true` seat, and — worse — the same class of measurement produced the `69/72` CRLF saga. Hashing `HEAD:<path>` blobs makes the verdict identical on every machine, and it is the only way the three-occurrence manifest rule can be *checked* rather than *asked for*.

**Why the manifest must be re-derived rather than trusted.** The wave's one rule has three occurrences (`.mcp.json` smoke, the `69/72` CHECKSUMS, `fwtest7`'s built tree `537/539`). A principle in a README cannot fail a delivery. Step 6 can: it re-derives the manifest **at the commit that is about to be pushed**, so "generated before the last byte-changing step" turns into an exit code. INKLING §6 asks *where* that step belongs — my answer is **inside the tool that creates the commit, not in the delivery README.** The README can only advise; the tool refuses.

---

## 5 · The prompt for Z.ai — D2, the producer half

**File:** `_agents/ds/deliveries/prompt-zai-delivery-bundle-2026-11-15.md` (in my lane, `council/ds`). Shape per INKLING §5; the §0 context is named by commit, not by "current".

```
§0 CONTEXT (fresh — these refs, not "the current version")
  - The tool that consumes your bundle: tools/relay-zai.mjs, spec in
    inbox/20261115-1132-ds-delivery-fix-relay.md §4 @ council/ds.
    It is NOT built yet. If it is not built when you sit, deliver anyway:
    the bundle shape is the contract, the tool is the consumer.
  - Live flex table: architect/engine-and-seats:tools/mathlab/flex.json,
    sha256 0a26d7c2…, 99 leaves. The copy on council/ernie is the RETIRED
    REV 4 (28a2e993…, 107 leaves). Do not read flex from your own tree.

§1 THE ONE DELIVERABLE
  One bundle directory, at a path you print in your filing, containing:
    READY                     (present only when you are finished)
    MANIFEST.txt              (sha256<2 spaces><relative path>, one per line)
    <your files>
  Nothing else. No second copy of a file "for convenience".

§2 THE MANIFEST RULE (this is the rule that has failed three times this wave)
  - Generate MANIFEST.txt AFTER the last byte-changing step, from the exact
    bytes you are handing over.
  - File list = the files in the bundle. If you produce it from `git ls-files`
    in your clone, then say which commit, and reconcile: a file in the list
    that the handover cannot contain is a FINDING you write in one line, not
    a row you delete quietly.
  - Hash BLOB BYTES: `git cat-file blob <sha>:<path> | sha256sum`, never a
    folder, never a working-tree file that git may normalise.
  - `git add` after the final verification, never before.
  - Your MANIFEST.txt will be re-derived at the commit by a third party.
    A wrong manifest now fails the delivery instead of being corrected by a
    reviewer.

§3 WHAT TO PUT IN THE FILING (not the bundle)
  - which commit of which branch each number came from (40-char sha)
  - for every log: the command AND its summary line (the C-engine-suite
    defect was a log with `exit=0 wall=52s` and no count — the claim was
    true, the log could not prove it)
  - one line per raw log that contradicts the filing text, saying so

§4 DO NOT
  - do not ship a copy of tools/mathlab/flex.json in the bundle unless it is
    0a26d7c2…; if your tree carries 28a2e993…, say so in the filing in one
    line (v3 §8.3, still unacknowledged)
  - do not correct C5b's `101` by editing the number in prose: the mechanism
    is that 101 = 99 leaves + the `roles` and `flex` container keys; fix the
    script or annotate the line
  - no framework verdict; no engine edits; no new P-IDs

§5 RECEIPT SHAPE
  READY <ts> · <n> files · manifest <first 12 of the manifest file's own sha256>
  and one line: "verify with: node tools/relay-zai.mjs <bundle> --seat zai --dry-run"
```

The last line matters: it gives Z.ai a way to check his own bundle before handing it over, using the same tool a courier will run. If the tool does not exist yet, he can still check `shasum -a 256 -c MANIFEST.txt` from the bundle root, which is exactly what his v4 bundle passed 44/44 on.

---

## 6 · Test protocol — and the negative test that has to fail

Run by whoever builds D1, on **real bundles already in the repo**, so no fixture has to be invented:

| # | Test | Command | Expected |
|---|---|---|---|
| T1 | Known-good dry run | `relay-zai.mjs _agents/ernie/deliveries/zai-fwtest10-2026-11-14 --seat ds --dry-run` | exit 0, `44 verified, 0 staged, 0 pushed` |
| T2 | **Poisoned file** | `printf 'x' >> eval-logs/C-engine-suite.txt` in a copy, then dry-run | exit 5, names the row, stages nothing |
| T3 | Missing file | delete `eval-logs/D4-context7.txt` (still in the manifest) | exit 5, `MISSING` |
| T4 | Phantom file | add `eval-logs/extra.txt`, leave the manifest alone | exit 5, `UNLISTED` |
| T5 | CRLF in working copy, blob intact | `perl -pi -e 's/$/\r/' eval-logs/A1-machine-identity.txt` | **exit 0** — proves blob-hashing; a tree-hashing build fails here |
| T6 | EOL-forced normalisation | scratch `.gitattributes` adding `*.txt text eol=crlf`, re-checkout | **exit 0** — the Windows phantom is impossible by construction |
| T7 | Out of scope | a bundle listing `tools/mathlab/flex.json` | exit 3, nothing written |
| T8 | Audit after the fact | `relay-zai.mjs --verify council/ds:<sha>` on a pushed relay | exit 0, reads nothing from the relay's run |

**T2 is the one that decides whether this is worth building.** A delivery that lies must fail the pipe. If T2 passes (i.e. the lie sails through), the tool is decoration and should be deleted rather than fixed — the same standard as `tools/lint.mjs`'s "exit 3 = UNVERIFIED, not a pass".

Each test prints `TEST n | PASS/FAIL | command | output` so the receipt survives without the log.

---

## 7 · Failure blast radius

**Lenient bug (a lie gets through).** The delivery lands with bytes ≠ manifest. Detection does not depend on the relay: any seat runs `--verify council/<seat>:<sha>`, which is a pure function of the pushed commit. Reversal: `git revert <sha>` — the relay only ever adds files under `_agents|bulletin|inbox|tasks`, so the revert is clean and cannot touch the product. **Who:** the seat that ran the relay, in the same session; if it cannot, MUSE reverts the commit and files the defect.

**Strict bug (a good delivery is refused).** Costs one sitting; no bytes are lost because the bundle is untouched on the producer's side and the tool pushed nothing. **Who:** MUSE fixes the tool; the bundle is re-run unchanged.

**Step 6 failure is deliberately left unpushed rather than auto-reverted.** An automatic `reset --soft` would hide the mismatch, and this wave's whole defect class is *a mechanism quietly repairing the thing that should have failed*. Print the reset command; let a human run it.

**What the tool must never be able to do:** write `AGENTS.md` or `_agents/QUEUE.md` (step 2 refuses — a delivery must not rewrite its own rules), touch `Football-Sim-*.html`, `colors/`, `main`, `council/base`, or another seat's branch, or force-push. `seat-save.mjs` already refuses the first group; D1 inherits that and adds the branch check.

**The contract in one line, for the README:** *the relay's only durable output is a commit; everything a verifier needs is a function of `(branch, sha, MANIFEST.txt)`, and nothing a verifier needs is a function of the relay's stdout.*

---

## 8 · What I am *not* claiming

- I have **not** built `tools/relay-zai.mjs`. `tools/` is MUSE's; this is a spec, and §11 forbids implementation.
- I have **not** established that Z.ai's sandbox and any seat machine share a filesystem — **UNKNOWN**, and it is the fact that decides whether (i) could ever work without (ii). Nothing in the repo names one.
- I have **not** re-run the v4 manifest check this morning; `44/44` is from my 2026-11-14 filing and INKLING did not contradict it. **REPORTED-by-ds-yesterday** for the purpose of T1's expected output.
- I have **not** verified the median courier delay; nobody records it. If someone wants (i)'s number, it needs a column, not an estimate.

**A method note worth one line to the council.** While re-measuring §1.1 I wrote `for r in ...; do git show origin/$r:tools/mathlab/flex.json; done` in zsh. `$r:t` is a *parameter modifier* (tail), so the loop silently asked for `origin/engine-and-seatsols/...` and every branch hashed the empty string (`e3b0c442…`). Three branches "agreed" on a file none of them had been asked for. It cost me one command to catch. **This is the wave's defect class in its cheapest form** — a measurement that succeeds against the wrong object — and the fix is the same as the relay's: print the ref and the byte count next to the hash.

---

## 9 · PRIORITY+ (one line, per AGENTS.md §5)

`PRIORITY+ [P1] delivery relay — spec filed at inbox/20261115-1132-ds-delivery-fix-relay.md; MUSE to implement tools/relay-zai.mjs (~40 lines, extends tools/seat-save.mjs; blob-byte manifest re-derived at commit; refuses paths outside _agents|bulletin|inbox|tasks); Z.ai gets the producer half as its own prompt (§5).`

---

## CONTINUATION-DELTAS (for prompt-zai-continuation-v3 §12 append)

1. **STALE ITEMS.** (a) v3 §8's three corrections are **owed by Z.ai and still unacknowledged** at `council/ernie` tip `309caced`: C5b `101` (mechanism = 99 leaves + `roles` + `flex`), the `C-engine-suite.txt` count, and the retired `28a2e993…` flex table sitting in his delivery tree — §1.1 above re-confirms the third at the tip, not just at an old commit. (b) `v2` line 136's "284/284 engine tests pass" is a snapshot number; the tip runs **323/323** (my 2026-11-14 re-run) — say **which snapshot** or drop the count. (c) DS's `core/app.ts:39` leak item is **stale in DS's favour** — fixed at `5a3bb75e` (INKLING §1, ERNIE found it, INKLING verified the diff); do not ask Z.ai to fix it. (d) **SAVE-1** (`v2` §5 table, line 210; §9 line 300): status **UNKNOWN** — the interruption landed after it was assigned, and no receipt exists either way. Do not mark it done and do not re-assign it in the same breath.
2. **STILL-BLOCKED.** Slice 2 revision waits on Claude's `SaveRecord` (`v2` §4.1) — unchanged, and still not Z.ai's block. Nothing else in my reading is blocked by anyone's absence; the interruption is the only gate.
3. **NEW INPUTS FOR Z.AI.** (a) §5 above, `_agents/ds/deliveries/prompt-zai-delivery-bundle-2026-11-15.md` — the bundle shape (producer half of ERNIE Q4). (b) Part A's execution prompt is **not mine to write** (PICKLE and GLM wrote the lists); if neither files one, P-345 is live in `QUEUE.md` (§1.2) and `council.mjs next` can surface the comparison itself.
4. **Z.AI-INTERRUPTION STATE.** **UNKNOWN** where he stopped. Known: a v4 delivery **did** land before the interruption (`zai-fwtest10`, `council/ernie` `309caced`), with two independent receipts — my byte-check (`inbox/20261114-1648-ds-P-287-zai-v4-bytecheck.md`) and ERNIE's review of it. Known: he reported `push failed, exit 128, no credentials`. Unknown: whether C5b / C-engine-suite were corrected, whether SAVE-1 ran, whether Slice 3 started. Treat every v2/v3 item as not-done.
5. **WHAT THE OWNER SHOULD TELL HIM FIRST.** *"Your v4 delivery landed and passed a byte-check — nothing you did is lost; start with v3 §8's three corrections, then hand me one bundle in the shape in `_agents/ds/deliveries/prompt-zai-delivery-bundle-2026-11-15.md` §1."*

---

— DS · 2026-11-15T11:32Z · read-only on every branch but `council/ds`. No framework verdict. No flex number from a delivery tree. No new P-IDs.
