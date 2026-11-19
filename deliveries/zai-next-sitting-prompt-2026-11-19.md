SPEAKER: ERNIE → Z.ai | ROLE: advisor (MUSE co-delegate) | TASK: the next sitting — the cakepanz-10 integrity pass, the item-6 runs, and the two laws that guard the phone/refresh defects | DATE: 2026-11-19 | v1 · supersedes nothing (the live brief is `council/inkling:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ v3.3 `d7d2acd18` — **read v3.3 first**, this order adds the work v3.3 does not carry)

---

## 0 · Read this first — what is true right now (all VERIFIED this session, on my Mac, Node v26.13.0)

**0.1 · The cakepanz-9 chain is closed and I re-verified it end to end.** Your cakepanz-10 package (`_agents/ernie/deliveries/67-cakepanz-10-2026-11-19/`, also hosted at `_agents/inkling/67-cakepanz-10-2026-11-19/`) is receipted 49/49 md5. I rebuilt the patched tree from my own c9 hosting plus your three source files and got:

```
dist/single.html = 76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964  (527,162 B)
engine 394/394 · node 33/33 · shell 48/0 · slice 29/0/10/3 · board 6/6
falsifiers F1–F12 ALL DIED · FA/FB/FC DIED · F15/17/18/19/20/21/22 ALL DIED
gate-manifest PASS 314 (313 without .gitignore — the delta IS the dotfile)
gate-numerals CLEAN ×2
```

**Your Part 0 work is real and byte-reproducible.** Nothing here re-opens it.

**0.2 · Item 5 is DONE and reproduces bit-for-bit on a machine that never touched your sandbox.** I extracted the Architect's tree at `2dff30b5` and ran the recipe verbatim:

```
preflight 2016-2022  c3c00b464f2b817c3cc0dacf90b3e4085c7795b64ad288ecd96f05034bd7dd43
preflight 2023-2025  05a751ed56b01f97a9bcbb94d238be9bb96fa909bce87834bf103c453cacb28b
item5    2016-2022  d7de8a1d555f6059adc52fa602731a82e208dcc1f67a3b3b9324f7223d20b8a4   (N=20,000)
item5    2023-2025  45ee0f4af594b4c730ddf4df8df4473e6414eaad01b5c1b02c5643f39fb1bee8   (N=20,000)
```

The printed tables match line-for-line. **Do NOT re-run item 5.** The receipts are on `council/inkling @ fee5c2fd8`, not on `council/zai` (which is frozen at `25e3b2f9`, the wave-55 era — that is why it looked empty to the Architect).

**0.3 · Item 6 landed while you were reading this.** `architect/engine-and-seats @ 560b8364`: `claude/zai-item6-recipe-2026-11-19.md` + `colors/tools/lambda-axis.ts` (report-only; lambda overridden to 1 off-pack; `s = lambda × passGap` swept over −1, −0.5, −0.25, +0.25, +0.5, +1 vs the `s = 0` baseline; paired keys `lambda-axis:0..19999`; N = 20,000 per arm per pack; no seed argument). **The preflight hashes are now confirmed from a second seat**:

```
item6-preflight-2023-2025.json  e793aacbb8c2bfaaf830b25d7c2eca59d94e82bfb8b89b3052b16756a0fcd45b   ← recipe  e793aacb…  MATCH
item6-preflight-2016-2022.json  ad3f1a2a2719cb8dc18e046e611b599e3046b5cade6e1b4c39fdc213e49efc66   ← recipe  ad3f1a2a…  MATCH
```

**0.4 · The Architect's branch was re-rooted.** `560b8364` is a **single-root commit with no parents**; the whole pre-re-root line (84 commits, root `568e6c04…`) is preserved at **`preserve/architect-engine-and-seats-pre-reroot-2026-11-19` = `2dff30b5`**. Tree-level diff `2dff30b5 → 560b8364` is **exactly three paths** (`claude/NOW.md`, `claude/zai-item6-recipe-2026-11-19.md`, `colors/tools/lambda-axis.ts`); `colors/src`, `tools/`, `data/`, `_agents/`, `MERGE-MANIFEST.md`, `BASELINES.md`, `AGENTS.md`, `CLAUDE.md` are **tree-identical**. Practical consequences for you:

- **Cite `560b8364` for anything current.** Cite `2dff30b5` only when you mean the item-5 recipe, and say "reachable only via the preserve ref".
- **Do not add new citations to pre-re-root shas.** A citation-rot audit is running across the seats this week; every new rot is work someone else has to clean up.
- The preserve ref is **the only remote anchor** for the old line. Never delete or force-move a `preserve/*` ref.

---

## 1 · What you must NOT redo (receipts exist; re-running is waste and it dirties the record)

1. **Item 5** — done, reproduced twice (yours + mine). Do not re-run.
2. **The 18-step composite** (`bash scripts/acceptance-run.sh`) — green at the close-out bytes, 18 × EXIT_CODE=0, `ACCEPTANCE RUN COMPLETE`. **The receipt law**: do not re-run it until bytes change. If your edits are docs + battery files, the composite's *code* stages are unaffected, but **the gates at the end must be re-run** (see §4.6).
3. **The five suites at the close-out bytes** — I re-ran all of them; they are green and receipted twice.
4. **Part 0 (D1/D2/D3/D5.3)** — patched, fenced, byte-reproducible. It rides on the Owner's accept-or-strike word; do not re-apply, re-argue or re-measure it.
5. **The framework question** — your Svelte 5 / ~85 word is delivered. The Owner rules at cutover; R-13 is the only thing that reopens it. Do not re-litigate.
6. **The `.gitignore` restore** — done ×2 trees, `f27658cc…`, and I proved 313→314 is exactly that dotfile. Do not touch it again.

---

## 2 · The Owner's words still owed (do not block on these; note them as pending in your report)

| # | The word owed | What you do meanwhile |
|---|---|---|
| 1 | **Part 0 — accept or strike** | Keep it. If the relay strikes it, one revert of your lane commit; §§4–5 below are unaffected. |
| 2 | **Q-H5** — display-round semantics as spec (no code), or the Architect's engine-view export (`raw: { wins, priority }` on `BoardRowVM`) + re-pin (exact-three) | Do **not** attempt either. §5.2 is written to be a no-op until he rules. |
| 3 | The four tab labels (THE LEADERS / YOUR STATS / PLAYOFF STATS / ALL TEAMS) | Ship the w89 inventory strings ("Season stats" / "Playoff stats" / "Your Players" / "League Leaders"). GPT's copy gate stands: the four capitalised labels appear 0× in w89. |
| 4 | The re-zip decision (a re-zip with the restored `.gitignore` is a NEW sha) | Record the sha where the package names it, if you re-zip. |
| 5 | The light-gold2 contrast value (AA fails at 1.51) | Leave the token untouched; the palette guardrail in §5.5 makes the failure visible without ruling on it. |
| 6 | P-317 shell-slot spec (pickSlot through the cakepanz store) | Not yours until the Architect's one-page spec lands. |
| 7 | The gh-pages two-file fix click | Unplaced; nothing to do. |

---

## 3 · Work item 1 — the item-6 N=20,000 runs (the Architect's recipe, exactly as written)

**Why first:** it is the only item on this list that unblocks the Architect, it is fully specified, and it is deterministic.

**Command (cwd `<clone>/colors`, after `git clone` of `architect/engine-and-seats` at `560b8364` and `npm ci`):**

```
git rev-parse HEAD                                   # must print 560b8364f51fa07335b84649c8203ae06500c955
node --version                                       # record it
node --experimental-strip-types tools/lambda-axis.ts 300 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 deliveries/receipts/item6-preflight-2023-2025.json
node --experimental-strip-types tools/lambda-axis.ts 300 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 deliveries/receipts/item6-preflight-2016-2022.json
# both must equal e793aacb… / ad3f1a2a… (write the hashes + node version in the receipt; on mismatch, keep going and flag it)
node --experimental-strip-types tools/lambda-axis.ts 20000 nfl-pools-fit2023-2025 nfl-passclass-fit2023-2025 deliveries/receipts/item6-fit2023-2025.json
node --experimental-strip-types tools/lambda-axis.ts 20000 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 deliveries/receipts/item6-fit2016-2022.json
```

**Receipt per command:** cwd · `git rev-parse HEAD` · `node --version` · the exact command · the tail of stdout · the exit code · the artifact's sha256.

**What to return:** the raw stdout tables + the four JSONs + the per-command receipts. **Do not interpret the numbers.** Do not tune lambda. Do not propose a lambda value. The GLM default stays 0 until the Architect rules.

**One sentence to carry in your report** (it is true and it protects the Owner from a misread): the tool passes a single scalar `passGap` for both sides (`lambda-axis.ts:28`), so each arm measures *tilt strength* — `s = lambda × passGap` — not an identified lambda. It answers "how far does a tilt of strength *s* move a whole game", not "what lambda should ship".

---

## 4 · Work item 2 — the cakepanz-10 integrity pass (my review's F1–F4, all one-line edits)

Source of truth for the anchors: `_agents/ernie/deliveries/67-cakepanz-10-2026-11-19/` (my hosting, commit `a69a9f4c9`) or `_agents/inkling/67-cakepanz-10-2026-11-19/` (inkling's copy). **Fix in your own working copy, never in either hosted copy.** Both trees (`cakepanz-4/`, `cakepanz-4-prepared/`) unless a line says otherwise.

**4.1 · F1 — VERIFY.txt contradicts itself about the one open item.** Both trees, `VERIFY.txt:1117` (§23.7, shipped paragraph) still reads:

> "…THE K1 RE-RUN FOR PARITY IS THE SITTING'S ONE OPEN ITEM — the next sitting runs `bash scripts/acceptance-run.sh` in cakepanz-4/…"

while `VERIFY.txt:951` (§22.2's L10 row, same bytes) says the shipped k1 is **CLOSED** at the close-out sitting, and your report §1.3 says §23.7's closure is real for both trees. **Fix:** rewrite §23.7's shipped paragraph to the per-tree truth and name the receipt (`receipts/partH-c9/zai-closeout-k1-acceptance-run-shipped-retry.log` — 18 × EXIT_CODE=0, ends `ACCEPTANCE RUN COMPLETE`, outer exit 0). **Do not re-assert the open item in any form.**

**4.2 · F2 — the two MANIFESTs name two different dists, and one dist is missing.** Measured:

```
cakepanz-4/MANIFEST.txt:47         76de5658…  dist/single.html   (patched working dist, 527,162 B)
cakepanz-4-prepared/MANIFEST.txt:49  670d4c08…  dist/single.html   (pre-patch c9 dist)
package contents:                    76de5658… only — the prepared tree has NO dist/
SHELL-STATUS.md:28-29               "dist/single.html 670d4c08… byte-identical across both trees"
```

**Settle it with one command in the real prepared tree, then write the truth:**

```
cd cakepanz-4-prepared && npm run build && npm run distfile && shasum -a 256 dist/single.html
# 76de5658… → the prepared src IS patched and its dist was stale; regen its MANIFEST (count stays 319)
# anything else → say so and name the sha
```

Then fix `SHELL-STATUS.md:28-29` so it names the sha the tree actually carries and does not claim a cross-tree identity the package cannot show. Your report's "the delivered artifact `670d4c08…` stays the shipped one" is **inverted relative to the shipped MANIFEST** — correct it or say which sha is which.

**4.3 · F3 — the cite-check's own count line is self-refuting.** `receipts/partH-c9/zai-closeout-cite-check.log:12`:

```
COUNT L7b all chips hit chip: 0
```

while the L7b log it cites shows **12/12** chip resolutions (6 rows × centre + 85% point). The hex-token result (`25 tokens, 23 receipt-backed + 2 superseded-marked, 0 unresolved`) is fine; the count's token shape is not. **Fix:** correct the count (expect 12) or delete the line and say why. A cite-check that prints a number contradicting its own evidence is the defect class it exists to prevent.

**4.4 · F4 — START-OF-CHAT-ZAI.md's header names the wrong sitting.** Both trees + the package root, line 3:

> "…§2 rewritten at the end of every chat (**this is the 2026-11-18 cakepanz-8.1 sitting's rewrite**…)"

while its own §2 is headed "baseline 2026-11-19, end of the w89 close-out sitting". **Fix:** line 3 names the close-out sitting. The three copies must stay byte-identical — re-measure (`shasum -a 256` ×3) and record the new sha. **MUSE re-files from those bytes** (the file's own §6 rule); say so explicitly in your report.

**4.5 · F9 — the package is a diff drop, not a buildable tree.** Add a short `README` at the package root stating: which files are included (3 source files, the docs, the manifests/receipts), which are not (`package.json`, `scripts/`, `test/`, the prepared `src/` and `dist/`), and the one command that rebuilds the dist from a full tree. Five lines. This prevents the next seat losing an hour.

**4.6 · After any edit above, re-run the closing gates and paste the raw stdout:**

```
node scripts/regen-manifest.mjs        # expect 314 shipped / 319 prepared
node scripts/gate-manifest.mjs         # expect PASS (314) / PASS (319)
node scripts/gate-numerals.mjs         # expect CLEAN ×2
CP_PIN=65673a00 node scripts/gate-numerals.mjs   # prepared only, expect CLEAN ×2
```

**Do not re-run the composite for doc-only edits.** If you touch a battery or a `src/` file, the receipt law applies and the composite must run.

---

## 5 · Work item 3 — the two laws that guard DS's phone/refresh defects (my F6, the highest-value item here)

**The problem, precisely.** DS's D1 (a second refresh loses the season) and D2 (the gone% tooltip intercepts chip taps at 390 px) are currently protected only by **source-string assertions plus one-off probes that live in no battery**:

- **D1** — `batteries/node.battery.mjs:678-679` asserts two *strings* (`keepWeek: !!r.week`, `if (!opts.keepWeek)`). The behaviour is proved once, by `receipts/partH-c9/zai-closeout-s29b-two-reload-law.log`, which **no battery runs**.
- **D2** — N26 asserts strings (the hover selector, the `:focus` leg's absence, the clamp literal, the dead rule's absence). The 390-tap behaviour is proved once, by `receipts/partH-c9/zai-closeout-l7b-390-tooltip-law.log`, also **in no battery**.

So the composite can be green with both defects back, as long as a future edit keeps the asserted strings (a CSS-order regression, a new overlay, a renamed wrapper). Your own 8.1 lesson — "a law must FAIL, never crash" and the presence-pair audit — argues for promoting both probes.

**5.1 · Promote L7b into the shell battery.** Port `zai-closeout-l7b-390-tooltip-law.log`'s probe into `batteries/shell.battery.mjs` as **L7b**: at 390×844, open six rows in sequence; assert `tipVisible:false` / `tipW:0` on each; assert every chip's centre **and** 85%-width point resolves to `chip` (12/12); assert `scrollW === clientWidth` (390); assert six sequential taps succeed; assert zero page errors. Shell goes 48/0 → **49/0**. Falsifier **F23**: re-add the dead `.cp-gonetip { width: 200px; }` inside the 430 px block → L7b must DIE (the old defect's exact mechanism).

**5.2 · Promote S29b into the node battery as a behavioural law.** Extend N28 (or add N30): boot twice from the same autosave pair and assert the second boot still lands on the hub with the week key present, and that the Complete screen never appears. The current N28 asserts only the source strings at `:678-679`; keep them (they are cheap) but add the behavioural half. Falsifier **F24**: restore the c7 gate `if (!r.draft) go('hub')` → N28/N30 must DIE.

**5.3 · Add the defect→law registry to VERIFY (new §24).** One table, four rows to start:

| Filed defect | The law that kills it | The falsifier that proves the law can die |
|---|---|---|
| DS D1 (second refresh loses the season) | S29b / N28 behavioural half | F24 |
| DS D2 (tooltip intercepts taps at 390) | L7b | F23 |
| DS D3 (method inside the accessible name) | N26 (source-level only — flag it) | F20? (name it or mark it as a gap) |
| DS D5.3 (two product names in the header) | N26's header asserts | (name it or mark it as a gap) |

**Why this matters more than any other item here:** it is the difference between a proof and a guard. Every future sitting inherits the difference.

**5.4 · Do not fix F5 (the suggestion ring) in this sitting.** It is Owner-gated (Q-H5). For the record, my measurement: at pick 27 the C′1 ring highlights **60 of 60 rows** (`DraftBoard.svelte:40` reads the display string with `|| 0`; `:46` walks while values tie; wins sit on a 1e-9 grid but print at one decimal, so late-round ties are broad). If the Owner picks display-round (option a), the one-line mitigation is to rank the tie walk on the **unrounded value the VM already carries** rather than the printed one, so the ring always means three players. Do not implement it until he rules.

**5.5 · Two small a11y/offline laws that are cheap and in-scope:**
- **F8** — `aria-describedby` appears **zero times** in `src/`. Add `aria-describedby="cp-fit-{r.id}"` to `.cp-main` in `BoardRow.svelte` so the in-flow method is programmatically tied to the row (this completes D3 for screen-reader users). One attribute; no new strings.
- **F15** — the `file://` law (S26–S28) boots the single-file dist and checks console errors + blocked requests, but **not** with the network cut. Add one law: `context.setOffline(true)` before the `file://` goto, walk the five screens. This is the Owner's "tent in the woods" requirement made testable (pickle's P-363 caveat).

---

## 6 · Work item 4 — the shell ideas worth building now (from my innovation notes, `inbox/20261119-0940-ernie-cakepanz-shell-innovation.md`)

The one idea that reframes the rest: **the save record is a replay script, not a snapshot.** `DraftPayload = { seed, userTeam, picks[], pool }` (`colors/src/sports/nfl/app/saves.ts:24-31`) is sufficient to reconstruct the whole draft. Build in this order:

1. **I10 — a `?debug=1` state dump.** One JSON (`screen`, `record`, `vm` rows, `settings`, `season`, `pageErrors`) so batteries stop scraping DOM. ~40 lines, dev-gated, zero product bytes. This makes 2–4 cheap and makes every future law less brittle. **Do this first.**
2. **I1 — the draft code.** A small "Draft #A3F2-7 · 76 Pancakes" line in the board footer and on the Complete screen, from `seed` + `userTeam` + a pool hash. `shareable.ts:64` (`draftBrag`) already takes `seed` — the share card gains a code field for free. This is the cheapest shareable slice in the track and it is infrastructure for trust: a draft that can be replayed from a code is a draft nobody can call staged. Law: same code → same board VM sha (reuse the N25 sha pattern at the UI level).
3. **I2 — the post-draft trace.** One screen: for each of the user's picks, the board's own top available at that moment vs the player taken, in the board's existing currency (wins / priority), plus the three largest reaches and steals. Derivable by replaying `picks[0..k-1]` over `pool` with the same CPU functions. **Zero new engine semantics.** Falsifier: a trace that disagrees with a recomputation from the record must fail the law.
4. **I11 — contrast as a gate, not a note.** A zero-dependency script over the 64 team × mode combinations that fails on any pair below 4.5:1 and names the team + token. The two known failures stay Owner-gated; the guardrail stops new ones.
5. **I12 — a cutover retarget script.** `tools/retarget.sh <tree>` that rewrites the battery/receipt paths from `cakepanz-4/` to the merged tree and re-runs the five suites + the three falsifiers, printing one table. Rehearse it on a throwaway copy **before** the cutover.
6. **I14 / I15** — the `aria-describedby` fix and the network-free `file://` law from §5.5.

**Explicitly not now:** I3 (what-if — it constrains the record format, so design for it but do not build it); any table/dashboard framework (TanStack or otherwise) before the four dashboards are specified; **any field added to the record that is not derivable from `seed + pool + picks`** (it would break I2 and the replay property).

---

## 7 · What you may NOT do (the fence, verbatim)

**Tier 4 — never:** engine semantics · λ (dynamic, measurement-only; the GLM default is 0) · the protected constants and the pins · re-pins · the cutover merge · final acceptance · every Owner-gated ruling · **the framework verdict** · gh-pages/ratings/deployment · and any byte under the five fence paths:

```
colors/src/core/**
colors/src/sports/nfl/engine/**
app/saves.ts · appstate.ts · hydrate/versions/envelope   (name resolution: colors/src/sports/nfl/app/{saves,appstate,hydrate,versions}.ts + colors/src/core/envelope.ts)
data/**
tools/mathlab/**
```

**Also:** no force-push · no `preserve/*` deletion or move · no edit to the Architect's tree · no policy proposals (the Owner rules on recovery and on the citation law for re-rooted branches — that is a later round) · no sim/20k runs beyond item 6 · no new user-facing sentences unless they ride the Owner's one-word list.

**Tier 2 — only on the Architect's written per-item word, with his diff review:** the P-317 shell-slot wiring, `cite-check.mjs` from a written spec, the `colors/` re-pin **verification** (never the re-pin), the gold2 display/text split, the `go()`/router fork, the fence check.

---

## 8 · Receipts and delivery shape

- **Claims are tagged** VERIFIED (command + output) / REPORTED (another seat's receipt) / INFERRED (reasoned, not run) / UNKNOWN. "No signal" is a result.
- **Every receipt is raw stdout at the final state**, with cwd + command + exit code. Never hand-write a receipt.
- **Deliver as one zip + one report.** No push from your sandbox (you have no credentials; a push hangs — standing rule, never attempted). Name the zip's sha256 in your chat reply, and the report's path inside the zip.
- **The report** answers, in order: (1) item-6 RUNS status + the four shas; (2) F1–F4 + F6 + F8 + F15 with before/after anchors and the gate stdout; (3) what you did NOT run, named; (4) the Owner's words still owed (§2); (5) what you refuse to adopt, and why.
- **Say what you could not check.** A claim about a file you did not read is UNKNOWN, not VERIFIED.

---

## 9 · Stop rules

Stop and say so if: an anchor in §4 does not match the bytes in front of you (do not improvise a replacement) · the item-6 preflight hashes do not match `e793aacb…` / `ad3f1a2a…` (write both hashes + your node version, keep going, flag it) · a command in §4.6 does not produce 314/319 · the Owner's relay contradicts §2 · you are asked to touch a fence path. In every case: report the exact command and its output, do not guess.

---

## 10 · The one-line version

*Item 6's 20,000-game arms for the Architect, then the four integrity fixes and the two laws that make DS's phone/refresh defects impossible to regress — all at receipted bytes, nothing shipped, nothing fenced.*