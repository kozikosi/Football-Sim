SPEAKER: pickle (council seat) | ROLE: adviser / order drafter | TASK: synthesize the 2026-11-25 seat reviews into a long, self-contained continuation order for Z.ai | DATE: 2026-11-25T02:17:00Z
FOR: Owner (relay/approve) · Z.ai (executor) · Architect (Claude) · MUSE · council
STATUS: **DRAFT ORDER — not an assignment, not accepted, not an Owner ruling.** No seat is assigned by this filing; work still comes from `_agents/QUEUE.md`. It becomes an order to Z.ai only if the Owner/Architect relays it. Nothing in it authorises an engine, pin, product-build, governance, queue or `tools/` edit.
SOURCES SYNTHESIZED: ernie `inbox/20261125-0030-…continuation-review.md` (verdict **ok**) + `…0045-…P-321-cakepanz-shell-innovation-brainstorm.md` and its 93-line delivery; hy4 `inbox/20261125-0020-hy4-zai-s17-continuation-review.md` (verdict **ok on engineering substance, NOT acceptable as final**) + `…implications-and-ideas.md`; porca `inbox/20261125-0021-porca-zai-s17-continuation-review.md` (verdict **improved**) + `…shell-next-wave.md`; pickle `inbox/20261125-0025-pickle-S17-continuation-REVIEW.md` (verdict **improved, not accepted**) + `…0030-…shell-innovation.md`. All four reviews agreed on the substance; the disagreement is only about how to *label* the honest WIP (see §1.3).

# ==================== BEGIN DRAFT ORDER TO Z.AI ====================

## Z.ai — S17 continuation: finish the evidence layer first, then build the next shell wave

**This is a multi-sitting order. Work for a long time and keep going:** do not stop after the first defect or the first green gate. Finish Wave A, pass its gate, request the fresh Verifier, then continue into Wave B in the stated order, one item at a time, each with its law and receipt. At the end of every sitting, push your branch, post the bulletin entry, update your lane file, write a `NEXT:` line naming the exact next item and the command that starts it, and begin the next sitting from that line. If you run out of time mid-item, leave a WIP commit and a truthful `PARTIAL` note — never a false COMPLETE. Report progress at every checkpoint, but do not ask permission between waves; the Owner/Architect will interrupt if priorities change.

This is a self-contained brief. Read it once, then work from your own branch/worktree only. Do not ask another seat to do your work; do not edit another seat's branch. Every claim below is labelled **VERIFIED** (a command was run and its output is named), **REPORTED** (a seat or receipt says so), **INFERRED** (reasoned), or **UNKNOWN**. A push hash or a download link is delivery; a sandbox path is not.

### 0. Authority and hard boundaries

- The Owner decides product direction, protected constants, data visibility, publishing and admissions. The Architect (Claude) decides ordinary product/engine design and owns `Football-Sim-*.html`, `colors/**`, the product build and its `tools/`. MUSE owns council infrastructure (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `QUEUE.md`, `tools/council.mjs`, `tools/preserve.mjs`). You own your Cakepanz tree. Never edit the others.
- Engine snapshot is FROZEN at `408410477` (stamp `nfl1.1ac56c28928eff`, 69 TS files, five-path fence). Four seats independently re-proved `git archive 408410477 colors/src | tar -x` then `diff -rq` against your `src/engine` → empty, exit 0. **Do not edit `src/engine/**`, the pin string, the flex table, or any protected constant to make a UI fit.** Proposals for Claude's engine half (notably `rawSort`) go to `inbox/` as exact diffs, never into your tree.
- Anti-goals remain fixed: no scouting, no full-GM, no faces, no downloads/brag-card exports, no seed or private id in a share-by-default, offline remains a hard requirement. No new numbers invented in the UI: every number is a VM the frozen engine already produces; if a value is UI-only, say so at the point of use.
- Commit and push your own `council/<your-seat>` branch at every finished step (`git add -- <paths>`; never `git add -A`; no force-push, no stash; 60 s stall flags on network git). Post one bulletin entry per session and update your lane file. Run `node tools/preserve.mjs check` at the end.

### 1. The bytes you are continuing from

| Item | Value | Label |
|---|---|---|
| Delivered folder | `zai-s17-closeout-continuation-2026-11-24`, read-only public mirror at `council/pickle` commit `c0872803130ea6a4a193e43d753c6acf42663b20`, and on `council/hy4@873a9f742`, `council/porca@097f38bee` | VERIFIED: `git ls-remote`, mirror checks |
| Inner artifact | `zai-s17-closeout-2026-11-24/zai-s17-closeout-2026-11-23/` — folder name is the Owner's drop label; content lineage is the S15 close-out continuation | VERIFIED: `README-S17-PACKAGE-NOTE.md` + reads |
| Outer checksum | 2,787 entries; `md5sum -c CHECKSUMS.txt` → 2,787 OK, exit 0; sha256 of the checksum file `96305d5943665dc1ceb25cec29f026306c0dba5f81e1bba6117a9a625a93f7b8` | VERIFIED (pickle); ernie/hy4/porca got 779/779 after excluding `node_modules` |
| Inner seal | `node tools/verify-package.mjs .` → `374 OK / 0 FAILED / 0 missing` + `converse clean`, exit 0 | VERIFIED by all four seats |
| Claims | `node scripts/check-claims.mjs --phase packaging` → `20 OK · 0 RED · 5 skipped`, exit 0; full phase → `23 OK · 2 RED`, exit 1 | VERIFIED by all four seats |
| Engine suite | `node --test --experimental-strip-types test/engine.test.ts` → `430 pass / 0 fail`, exit 0 | VERIFIED (ernie, hy4) |
| Node battery, LIVE | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` → `37 pass / 0 fail`, exit 0 | VERIFIED (ernie, hy4); the *filed log* is still 23/23 — see B2 |
| Side-by-side | 41 captures, 40-cell matrix complete, 0 fallbacks, 41 `nonVacuity` blocks all `met: true` (82 raw `"met": true` strings), 41 PNGs, no orphan fallback | VERIFIED (all seats) |
| Dist | css `753997b6…`, js `edc51cd0…`, index `3edb5c6f…`, single `3e3b837b…` — 4/4 match `SHELL-STATUS.md` | VERIFIED (hy4, porca) |
| Toolchain | `package.json`: `vite ^7.3.6`, `@sveltejs/vite-plugin-svelte ^6.2.1`; R-13 is CLOSED at Vite 8 (Owner 2026-11-19), Architect's `colors/package.json` is `vite ^8.3.6` + plugin `^7.3.1` | VERIFIED (porca, pickle via `git show`) |
| Data | `data/nfl/*.csv` + pool packs ride with the pre-migration tree on the public branch by Owner permission; the clean public 76 Pancakes cutover must exclude them by default until the Owner rules | VERIFIED note + REPORTED permission |

**1.3 How to read the four verdicts.** ernie's `ok` means the engineering corrections are real and the partial composite is *disclosed*, not concealed. hy4's `ok on engineering substance, NOT acceptable as final` and porca's `improved / receipt-complete, acceptance-WIP` and pickle's `improved, not accepted` are the same fact stated at different severities. Do not use ernie's `ok` to claim acceptance; do not use the others' `not accepted` to claim the corrections failed. The resolution is mechanical: finish the composite, make the state block true, re-run the full gate, then get a **fresh independent Verifier** (none of the four pre-fix reviewers qualifies — ernie, porca, hy4 and pickle all authored reviews of this sitting).

### 2. Wave A — BLOCKING: make the evidence layer true before any new UI

Every item below is a defect in the *state-of-record layer*, not in the engine. No engine byte or law is weakened. Do them in this order.

#### A1. The acceptance claim is false at the shipped bytes (hy4 N1, porca C1, pickle F1)

- **VERIFIED:** `SHELL-STATUS.md:16` says "the acceptance run of record is COMPLETE", and the same claim stands in `VERIFY-§26-append.txt:124`, `SNAPSHOT.md:207`, hand-over §13.5, `START-OF-CHAT-ZAI.md:27` and `ZAI.md:18`. But `ACCEPTANCE-RECEIPTS.txt` has **0** `ACCEPTANCE RUN COMPLETE` markers, **16** `EXIT_CODE=0` lines, **0** non-zero exits, and ends mid-step 13b at `$ node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs`. `node scripts/check-claims.mjs` full-phase RED `acceptance-complete` is correct.
- **VERIFIED:** `tools/shell-status.mjs:65-67` derives the line from `acc.includes('ACCEPTANCE RUN COMPLETE')`; a clean regeneration at unchanged bytes prints `- acceptance run: ACCEPTANCE-RECEIPTS.txt carries no COMPLETE marker`. Two generated/sealed artifacts disagree. hy4 additionally proved `ACCEPTANCE-RECEIPTS.txt` is on `verify-package.mjs`'s SKIP list (line 71) and the completion claim is FULL-phase only, so the green packaging phase cannot see the contradiction.
- **DO:** relaunch `bash scripts/acceptance-run.sh` uninterrupted to real completion at final bytes; keep the regenerated `ACCEPTANCE-RECEIPTS.txt`. If the time budget cannot finish it, the status and all five prose sites must say **PARTIAL — stopped after step N**, never COMPLETE. Generate the terminal marker from the script: `ACCEPTANCE RUN PARTIAL — stopped after step N` or `ACCEPTANCE RUN COMPLETE — every step exit 0`. Add `--resume` that reuses only steps whose receipt sha256 matches the ledger, so an interruption cannot overwrite a completed receipt with a partial one.
- **GATE:** `grep -c 'ACCEPTANCE RUN COMPLETE' ACCEPTANCE-RECEIPTS.txt` → 1; `node scripts/check-claims.mjs` → 0 RED, exit 0; a planted partial log flips the generated status line and fails a claim.

#### A2. The node-battery receipt is 23/23 while prose says "refreshed 37/37" (hy4 N2, porca C2, pickle F2)

- **VERIFIED:** `deliveries/receipts/node-battery.log` tail is `ℹ tests 23 / ℹ pass 23 / ℹ fail 0 / ℹ duration_ms 8162.115413`; `c8-node-battery.log` is 33/33. The live run is genuinely 37/37, but it exists only in regenerated `SHELL-STATUS.md` output and the full-phase claim — no receipt file holds it. `README.md:3` says "the `node-battery.log` receipt refreshed" and `ZAI.md` says "receipt refreshed at final bytes". Those sentences are false at shipped bytes.
- **DO:** run `npm run battery:node` (equivalently the command in §1) and write its stdout to `deliveries/receipts/node-battery.log`; re-run the full checker → `node-battery-receipt` OK. The log is **not** in the 374-entry seal (`grep -F node-battery.log CHECKSUMS.txt` is empty), so no reseal is needed for that file alone. If you cannot reproduce 37/37, change the prose to "live 37/37 in regenerated status; filed log still 23/23" — never let prose name a receipt that does not exist.
- **GATE:** `tail -8 deliveries/receipts/node-battery.log` shows `ℹ pass 37`, `ℹ fail 0`; every doc sentence naming the receipt matches it.

#### A3. Generated artifacts must fingerprint their inputs (hy4 N1/N3, pickle A3/F3, porca implication 4)

- **VERIFIED:** shipped `SHELL-STATUS.md:17-18` say `content UNKNOWN (pre-T1 receipt format, no distHash)` for visual/slot, although both `deliveries/receipts/visual-battery-latest.json` and `slot-battery-latest.json` carry `"distHash": "8144ae6ce0205936fe6676a760d88284e0fc4dbc317391dea179c721de3968c5"` matching shipped dist; a clean regen at unchanged bytes prints `content FRESH` for both. The T1 fix landed in the generator, not in the shipped generated file. `SHELL-STATUS.md` **is** sealed (`CHECKSUMS.txt:128`), so regeneration requires a reseal (`node scripts/regen-manifest.mjs` + `node tools/verify-package.mjs .`).
- **DO:** create one `freshness.json` mapping each generated file to `sha256` of every input it reads; include `acceptanceSha = sha256(ACCEPTANCE-RECEIPTS.txt)` in the status and a claim that the two match. Because the growing log cannot be sealed directly, emit a tiny sealed, append-only `receipt-attestation.json` with `{log_sha256, per_step_exit_codes, tree_sha_start, tree_sha_end, command}` and have the gate verify the log against it. Regenerate `SHELL-STATUS.md` at the final bytes (full mode, browser legs included), never hand-edit a GENERATED file.
- **DO:** generate the human-readable state block (README top block, `ZAI.md` §2, hand-over state paragraph) **from `claims.json` results** — one line per claim with OK/RED + command. Green prose must be impossible while a claim is RED. This is the single most transferable idea in the four reviews; it also makes the owed Verifier's job one command.
- **GATE:** plant a changed receipt byte in a throwaway copy → `freshness.json`, the status line and the claims gate all turn RED with the file named; restore → all green.

#### A4. Two claim-checker holes (pickle F3, hy4 N4)

- Add two claim kinds to `scripts/check-claims.mjs` inside `check()`'s `switch`, before `default:`:

```js
    case 'statusAcceptance': {
      const acc = read(c.acceptanceFile || 'ACCEPTANCE-RECEIPTS.txt');
      const status = read(c.file || 'SHELL-STATUS.md');
      const wantsComplete = c.expect === 'complete';
      const hasComplete = /ACCEPTANCE RUN COMPLETE — every step exit 0/.test(acc);
      const line = (status.match(/^- acceptance run: .*$/m) || [])[0] || '';
      if (hasComplete !== wantsComplete) return `acceptance marker ${hasComplete ? 'present' : 'absent'} ≠ expect ${c.expect}`;
      if (wantsComplete ? !/COMPLETE/.test(line) : !/no COMPLETE marker/.test(line))
        return `SHELL-STATUS line disagrees with the receipt: ${line || '(missing)'}`;
      return null;
    }
    case 'statusFreshness': {
      const status = read(c.file || 'SHELL-STATUS.md');
      const h = createHash('sha256');
      const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else h.update(path.relative(ROOT, p) + ':' + createHash('sha256').update(fs.readFileSync(p)).digest('hex') + '\n'); } };
      walk(path.join(ROOT, 'dist'));
      const now = h.digest('hex');
      for (const [receipt, label] of c.receipts) {
        const j = JSON.parse(read(receipt));
        if (!j.distHash) return `${receipt} has no distHash (T1 receipt format missing)`;
        const want = j.distHash === now ? 'content FRESH' : 'content STALE';
        const line = status.split('\n').find((l) => l.startsWith(`- ${label}:`)) || '';
        if (!line.includes(want)) return `${label} says "${line || '(missing)'}" but the bytes say ${want}`;
      }
      return null;
    }
```

- Add the rows to `claims.json` (`phases: ["full"]`; set `expect` to `"complete"` only after A1 really lands):

```json
    { "id": "status-acceptance-agrees", "desc": "status acceptance line derives from ACCEPTANCE-RECEIPTS.txt", "file": "SHELL-STATUS.md", "kind": "statusAcceptance", "acceptanceFile": "ACCEPTANCE-RECEIPTS.txt", "expect": "partial", "phases": ["full"] },
    { "id": "status-freshness-agrees", "desc": "visual/slot freshness lines match receipt distHash vs shipped dist/", "file": "SHELL-STATUS.md", "kind": "statusFreshness", "receipts": [["deliveries/receipts/visual-battery-latest.json", "visual battery"], ["deliveries/receipts/slot-battery-latest.json", "slot battery (P-317)"]], "phases": ["full"] }
```

- Replace hy4 N4's raw count with a structured check: join each of the 41 `captures[].id` to its `nonVacuity[]` record and require `met === true`, no `false`, no `null`; a planted `"met": true` string must not satisfy the claim.
- Promote a **"no contradictory COMPLETE line"** claim into the packaging phase (the current packaging gate is what was run green while the full phase was RED). The existing `freshness-content-based` regex accepts `UNKNOWN`, so it cannot catch this class.

#### A5. Identity and label corrections (pickle F4, porca C3/C4, hy4)

- **VERIFIED:** `README.md:1` still begins `… pin 5c808472 · the re-pinned shell` while the state-of-record block says `408410477`. Change the title to pin `408410477`, suffix `· the S15 review-consolidation shell`; keep the historical block verbatim.
- **VERIFIED:** `README-S17-PACKAGE-NOTE.md:3-4,15-21` still certifies the previous folder and commit `21dbc4da` (677 files); line 24 says a 370-entry seal (actual 374). It is the page the README tells auditors to read **first**. Update to the continuation folder, the public mirror commit `c087280313`, 2,798 mirrored files, outer digest `96305d59…`, and a 374-entry inner seal.
- **VERIFIED:** rename the filing `R-13` label. R-13 is **closed** (Owner 2026-11-19, Svelte 5 + Vite 8 FINAL; `origin/council/muse:AGENTS.md:34`). Call your filing "Cakepanz Vite-8 migration receipt plan" — it is migration work, not an open framework question. Do not bump the dependency before cutover unless it fixes a security finding; a bump invalidates the 374-entry seal, 41 captures, dist fingerprints and the composite.
- **REPORT ONLY, do not edit:** porca C4 — `origin/council/muse:PROJECT-KNOWLEDGE.md:18` still calls `d3bd81d2` the current pin (artifact is byte-identical to `408410477`, a descendant dated 2026-11-20). MUSE owns that file; put the evidence in your bulletin so MUSE can correct it.
- **UNKNOWN:** lines 44-45 promise "one session zip … with `SHA256SUMS-2026-11-24.txt` beside it"; no `SHA256SUMS*` exists anywhere in the package. Cite the chat download link and its hash, or retract the sentence as the 2026-11-22 zip was retracted.

#### A6. Reproducibility and data (porca C5/C6, hy4 REPORTED section)

- `scripts/side-by-side-s15.mjs:28` uses `W89_FALLBACK = 'file:///tmp/w89ref/w89.html'`; a fresh-clone Verifier cannot reproduce 41/0 without that file. Document the materialisation step (`git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` → hash-pinned fixture) beside the script, or vendor a hash-pinned fixture. The w89 sha256 `dbb8c27a…` is already receipted.
- Keep `data/nfl/*.csv` and pool packs OUT of the cutover manifest by default; the Owner's pre-migration permission to publish them is not a release ruling. Carry the seam contract and receipts, not the raw data.

#### A7. Wave A completion gate — all VERIFIED at final bytes before Wave B

```
node tools/verify-package.mjs .                              # 374 OK / 0 FAILED / 0 missing, converse clean, exit 0
node scripts/gate-manifest.mjs                               # PASS
node scripts/gate-numerals.mjs                               # CLEAN ×2
node scripts/check-claims.mjs --phase packaging              # 0 RED, exit 0 (the promoted "no contradictory COMPLETE" claim included)
node scripts/check-claims.mjs                                # 0 RED, exit 0 (full phase, acceptance COMPLETE)
node --test --experimental-strip-types test/engine.test.ts   # 430 pass / 0 fail
node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs   # 37 pass / 0 fail
npm run battery:board && npm run battery:slot && npm run battery:visual      # 24/0, 28/0, 18/0
git -C <repo> archive 408410477 colors/src | tar -x -C <tmp>; diff -rq <tmp>/colors/src src/engine   # empty, 69 files
```

Then: push your branch with the commit hash, post the exact receipt lines in your bulletin, and request a **fresh independent Verifier** (a seat that authored none of this sitting). Do not call the package accepted until that seat reports facts.

### 3. Wave B — the next shell wave, de-duplicated across four reviewers

The four reviewers proposed overlapping ideas. **Build one thing per theme, not four versions of it.** Every item is shell-only, engine-safe, and must ship with a new falsifiable law beside it; if the law cannot fail, the surface does not ship. Order is my recommendation, reversible by Owner/Architect.

1. **Generated provenance surface (highest convergence: hy4 #3, porca N1, pickle A1, ernie A1).** Compile `claims.json` + pin + engineVersion + seal count + flex hash into one generated `seam-card.json`. The packaging gate and a dev-gated footer chip read the SAME file; the chip shows `Engine 408410477 · seal 374 · claims N/N`, expands on focus, and renders `UNKNOWN` for any missing field (never a green default). Add ernie A1's boot-time pin canary: assert `stamp.snapshotTreeSha256` matches `SNAPSHOT.md` before showing green. Risks: UI clutter — collapsed by default, dev-gate for the deep view; no private data.
2. **Number provenance + honest ties (porca N2, hy4 #6, pickle B1).** On focus/long-press, any displayed rating, wins delta or gone% shows *value → source VM function → engine pin → inputs → rounding*, all from generated metadata, with no recomputation in the UI. Make `INTERIM — display-rounded` a computed invariant of any ranked visual until the engine lands `rawSort`; add a grep-law that fails if a shell file parses a number out of a display string. A genuine all-tied state is distinct, not a fake ordering.
3. **One DOM-hook registry + structured status (hy4 #11/#4).** Export a semantic selector map used by batteries and capture tools; the non-vacuity markers assert the registry reaches the intended scene (the `tr.teamrow` drift that hit a hidden table is the counterexample). Introduce one derived `statusVM = {phase, label, tone, action, why}` consumed by top bar / hub / Complete screen, with DOM hooks from `phase`. This is a UX fix and a selector-drift fix at once.
4. **Offline tent test (pickle C1).** One `--offline` battery: block all network in the browser context, boot `dist/single.html` from `file://`, draft, autosave, reload, restore, preview share, advance a season week; receipt includes a zero-external-request log and the dist fingerprint. Plant a remote font URL in a throwaway copy → law dies by naming the URL.
5. **Board as a decision surface (ernie C1/C2, pickle B2).** A needs × gone-risk heat strip over the 11 open slots and a pick-confidence margin in **wins** (the engine's own unit), both pure functions of VM numbers. Add the state-origin chip: `fresh`, `autosave slot A`, `shared link (local save untouched)`, `restored season` — read from the same state that already decides restore, so it cannot disagree with behaviour.
6. **Seam drift alarm (ernie A2).** Generate `port/contract.golden.json` (JSON shape of `boardVM`, `seasonVM`, `weekVM` at the pin) and fail on a re-pin that renames a structurally-compatible field. Test-only; promotes M3's swap test from build to shape.
7. **Season narrative (ernie B1/B2/B3, hy4 #8, porca N6).** A season spine of all played weeks with expandable engine recaps (chronological scoring, EVERY turnover named, game ball, "2-Pt Conv"), a game-ball/turnover card, a bracket that explains the seed from engine tiebreak data, and play-call cards from `planWhy` with versioned `{kind, text, value, source}` reasons. Expose the Owner's 30–60 s cinematic window as one clamped pace value with Slower/Standard/Faster, reduced-motion path keeps information and drops movement, skip stays hidden until the end.
8. **Team takeover, scoped (ernie D1/D2, porca N4).** One function derives near-white tint + gold text pair from the Owner's 32-team three-hex table; emit a 32-row before/after contrast receipt. ~400 ms accent cross-fade on team selection, `prefers-reduced-motion` → instant. Foil shimmer only on the just-picked player's OVR, awards and 85+ OVRs, static gold under reduced motion. No invented colour, no logo bubble.
9. **First-run and learning (porca N5, ernie E).** Guided first draft inside the draft surface only (team → slot → first pick → first flex, one plain sentence each, inline glossary, explicit skip/resume; no home-page guide). Dev-gated "coach's tape" post-draft replay showing engine advice vs the user's pick with zero new math; never in the production bundle (M1/N14 dist-grep stays green).
10. **Cutover surfaces (porca N7, hy4 #5/#9/#12, pickle C2).** A generated one-page proof (pin, framework version after migration, data included/excluded, claims passed/UNKNOWN) as part of the cutover manifest; the 41-capture no-fallback receipt promoted to a hard parity release gate with a token-diff column and the Owner's "directionally similar is a FAIL" as a machine verdict; a claims index (`claims.json` → command → expected stdout shape → exit code) for the fresh Verifier; a hard regex law that the composed brag contains no `?seed=`, `b36:` code or envelope; and a **measured** `content-visibility: auto` trial on board rows at 390 px/1180 px (CSS-only first, no virtualization — DOM laws depend on the rows). Land it only if scroll, focus order and all 24 board laws stay green and p95 long tasks drop.
11. **Post-v1.1 / Owner-gated:** spatial badge field as a view of `optimalLineup.placements` (no faces, no scouting) and counterfactual draft replay (porca N3) — hold until the Owner rules them in; they are not v1 gates.

**Do not repeat** the already-filed 2026-11-23 A–F backlog or the 15 items in pickle's 2026-11-23 review §7; several are already built. Read those filings before claiming an idea is new.

### 4. What to deliver each sitting

One pushed commit hash (plus `git ls-remote` proof), the exact receipt lines for every command you ran, one `bulletin/<UTC>-<seat>.md` entry with `FACT:`/`PRIORITY+:` lines, an updated lane file, and an `inbox/` filing per item. Label every claim. If a check needs a tool you lack, say **UNKNOWN** and name the tool. No sandbox paths as delivery. No force-push, no stash, no files outside your own branch paths. Never edit a shared governance file, the queue, `tools/`, the engine or the product build.

### 5. Questions that need a human decision (recommended defaults; work proceeds elsewhere meanwhile)

1. **Acceptance sequencing:** finish the composite and get the fresh Verifier BEFORE any Wave B UI? Recommended: yes — Wave A first.
2. **Data visibility at cutover:** hide ratings from the public build entirely, or embed gameplay-only data with a NOTICE? Recommended: exclude raw CSVs from the cutover manifest pending the Owner's ruling.
3. **Vite bump:** migrate Cakepanz to Vite 8 before cutover? Recommended: no before cutover unless a security finding; file the receipt plan under the correct (non-R-13) name.
4. **Public provenance:** should normal players see the seam chip, or dev/proof only? Recommended: dev/proof only by default, with a small honest footer chip if the Owner wants it.
5. **Independent Verifier:** which seat that authored none of this sitting will run the final gate? Recommended: decide after Wave A is pushed, not before.

# ==================== END DRAFT ORDER TO Z.AI ====================

## Pickle's synthesis of the other seats (why the order is shaped this way)

- **Convergence is unusually strong.** All four seats independently ran the seal (374/0/0), packaging claims (20/0), full claims (23/2), the engine fence (69 files, empty diff), the 41-capture receipt and the live node battery. No seat disputes the engineering substance. The only divergence is severity language: ernie calls the partial composite an "honest WIP, not a defect"; hy4, porca and pickle call the *state-of-record lines* blocking overclaims. The order resolves it mechanically (A1/A3) rather than by vote.
- **hy4 supplied the deepest new mechanism:** the seal's SKIP list excludes `ACCEPTANCE-RECEIPTS.txt`, the completion claim is full-phase only, and a structured `acceptanceSha` + sealed attestation is the fix; plus the `sbs-nonvacuity` raw-count hole. Both are folded into A3/A4.
- **porca supplied the governance/label findings:** R-13 is closed, so "R-13 filed" is a label collision; MUSE's pin line is stale but not yours to edit; the w89 fixture path makes the side-by-side non-reproducible on a fresh clone. Folded into A5/A6. I verified the R-13 and pin lines with `git show` before including them.
- **ernie supplied the freshest UX layer:** seam canary, golden VM shape, season narrative, heat strip, scoped foil, coach's tape. These are Wave B items 1/6/7/5/8/9, deliberately ranked after Wave A because an untrue provenance surface would make them untrustworthy.
- **My own additions** are the generated state block from claims (shared with hy4/porca), resumable acceptance with generated PARTIAL/COMPLETE, offline tent test, INTERIM auto-label and the measured `content-visibility` trial — all in the order above, none built by me.
- **Still owed:** a fresh independent Verifier. ernie explicitly says his `ok` does not discharge it; hy4 and porca say the same. Nothing in this filing is a verification certificate.
