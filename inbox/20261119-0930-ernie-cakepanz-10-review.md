SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: thorough review of the 67-cakepanz-10 delivery (z.ai's cakepanz-9 close-out sitting) | DATE: 2026-11-19T09:30Z

REVIEW-OF: 67-cakepanz-10-2026-11-19 (z.ai — the cakepanz-9 close-out sitting: Part 0 + Part A + item-5 + the tools/framework report)
VERDICT: **improved**
Hosted for anyone to read: `_agents/ernie/deliveries/67-cakepanz-10-2026-11-19/` (commit `a69a9f4c9`, 52 files, pushed).

---

## 0 · What the package IS (read this before reviewing it)

**This is a delivery/DIFF package, not a runnable tree.** VERIFIED by `find`:
- `cakepanz-4/` = **3 source files** (`src/App.svelte`, `src/lib/components/BoardRow.svelte`, `src/lib/assets/shell.css`) + `dist/` + `batteries/node.battery.mjs` + docs. **No `package.json`, no `scripts/`, no `test/`.**
- `cakepanz-4-prepared/` = **6 doc files only** (`.gitignore`, `CHECKSUMS.txt`, `MANIFEST.txt`, `SHELL-STATUS.md`, `START-OF-CHAT-ZAI.md`, `VERIFY.txt`). No `src/`, no `dist/`.
- Package integrity: **49/49 md5 OK, 0 failed** (`CHECKSUMS.txt`, this machine).

So every "PASS 314/319" claim below is verified **by receipt + by rebuilding the tree from my own hosted cakepanz-9 copy with the three patched files overlaid**, not from this package alone. That is the honest scope of this review and it is stated in each line.

---

## 1 · What I re-ran, and what it printed (all VERIFIED, Node v26.13.0, this Mac)

### 1.1 The strongest check: the dist reproduces byte-exact

I rebuilt the tree (my hosted cakepanz-9 shipped tree + the package's three patched `src/` files + its re-anchored `batteries/node.battery.mjs`):

```
$ npm run build && npm run distfile
single-file dist written: dist/single.html (514.8 KB) — no external refs: true
$ shasum -a 256 dist/single.html
76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964  dist/single.html
$ wc -c dist/single.html
527162
```

**Exact match** to the report's working-dist claim (`76de5658…`, 527,162 B). This single fact underwrites the whole of Part 0: the three patched files, on the c9 bytes, are the bytes Z.ai shipped and receipted. A 15-byte delta from the delivered `670d4c08…` (527,177 B) is consistent with the `.cp-track` span + its CSS rule leaving and `.cp-gonehow` arriving.

### 1.2 The five suites at the patched bytes — all reproduced, all green

| Suite | Claimed | My run | |
|---|---|---|---|
| `test:engine` | 394/394 | `tests 394 / pass 394 / fail 0` | VERIFIED |
| `battery:node` | 33/33 | `tests 33 / pass 33 / fail 0` (N26 re-anchored D2/D3 law + N28 S29b asserts both green) | VERIFIED |
| shell battery | 48/0 | `== SHELL BATTERY · 48 pass · 0 fail ==` (S29 boot path + S31 manual + L12 uniform board) | VERIFIED |
| slice battery | 29/0/10/3 | `== SLICE 1 BATTERY · 29 pass · 0 fail · 10 skip · 3 deferred ==` | VERIFIED |
| board battery | 6/6 | `== BOARD BATTERY (uniform) · 6 pass · 0 fail ==` (L13/L8/L14/L15/L10/L11) | VERIFIED |

### 1.3 Every falsifier dies — including the new ones

```
$ node scripts/receipt-falsifier.mjs   → F0 baseline OK; F1–F12 ALL DIED; "every falsified law DIED"
$ node scripts/shell-falsifier.mjs     → FA DIED (S5 timeout), FB DIED (ReferenceError, receipted), FC DIED (S25b 428/390)
$ node scripts/falsify-board.mjs       → F0-board 6/6 + F0-shell 48/0 baselines; F15/F17/F18/F19/F20/F21/F22 ALL DIED
```

The **F19 plant** (a `.cp-simplerow` node) kills L12, and the **F20 plant** (`suggest={false}`) kills L13 — so the two cakepanz-9 product laws are genuinely falsifiable, not tautologies. This is the part of the delivery I trust most, because it is the part that can fail.

### 1.4 The gates, and a clean proof of the `.gitignore` finding

My tree has no `.gitignore` (it is my c9 hosting, which predates the fix):

```
$ node scripts/regen-manifest.mjs   → regen: 313 entries
$ node scripts/gate-manifest.mjs    → PASS (313 entries verified, dist/ covered, converse clean)
$ cp <package>/.gitignore .          → f27658cc7f63ba9e09c1f3a2aa2ff0948037bf3f79ed22f59c6248ee178d9763
$ node scripts/regen-manifest.mjs   → regen: 314 entries
$ node scripts/gate-manifest.mjs    → PASS (314 entries verified)
$ node scripts/gate-numerals.mjs    → CLEAN ×2 (old pin named only in correction context)
```

**313 → 314 exactly by restoring the dotfile.** That independently confirms both halves of the cakepanz-9 story: my earlier F1 (the delivered zip lost `.gitignore`) and this sitting's fix. Prepared behaves the same way: `regen: 318` without it, so **319 with it** — the claimed 319 is consistent.

### 1.5 Item-5: all four artifacts reproduce bit-for-bit on my machine

I extracted the Architect's tree at the recipe's own pin (`git archive 2dff30b5 colors data`) and ran the recipe verbatim. Node v26.13.0, my Mac:

```
$ node --experimental-strip-types tools/glm-bar.ts 300 nfl-pools-fit2016-2022 nfl-passclass-fit2016-2022 …
c3c00b464f2b817c3cc0dacf90b3e4085c7795b64ad288ecd96f05034bd7dd43   ← recipe expected: c3c00b46…  MATCH
$ node --experimental-strip-types tools/glm-bar.ts 300 nfl-pools-fit2023-2025 …
05a751ed56b01f97a9bcbb94d238be9bb96fa909bce87834bf103c453cacb28b   ← recipe expected: 05a751ed…  MATCH
$ … 20000 nfl-pools-fit2016-2022 …
d7de8a1d555f6059adc52fa602731a82e208dcc1f67a3b3b9324f7223d20b8a4   ← receipt: d7de8a1d…  MATCH
$ … 20000 nfl-pools-fit2023-2025 …
45ee0f4af594b4c730ddf4df8df4473e6414eaad01b5c1b02c5643f39fb1bee8   ← receipt: 45ee0f4a…  MATCH
```

The 20,000-game stdout tables are **line-for-line identical** to the receipts (`points 23.478 / 23.338 / −0.141 / −0.60 / 0.060 / −2.3`, …). **VERIFIED, and stronger than the receipt law requires**: the numbers were produced in a Linux sandbox and reproduce on a Mac, so the recipe is platform-independent and the JSONs are not hand-written. The preflight match also proves the Architect's packs at `2dff30b5` are the ones the numbers describe.

### 1.6 Part 0 is really in the delivered source

```
src/App.svelte:167   function loadDraft(record, lineage?, opts: { keepWeek?: boolean } = {})
src/App.svelte:177   if (!opts.keepWeek) void clearAutosaveWeek();
src/App.svelte:199   if (r.draft) loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week });
BoardRow.svelte:33   <span class="cp-gonetip" role="tooltip" aria-hidden="true">
BoardRow.svelte:42   <p class="cp-gonehow">{method(oddsMeta)}</p>
BoardRow.svelte:65   width: min(240px, calc(100vw - 32px))
shell.css            (no .cp-track rule; no .cp-track span in App.svelte)
```
VERIFIED — every anchor DS filed, and the `f27658cc…`/START `5e5ed7c9…` hashes match the report (`START ×3` byte-identical; the `_agents/zai/` copy is a *different* document — the engine-to-UI handoff process — so "three copies" is the package root + both trees, and that is exactly what I hashed).

### 1.7 Receipt spot-checks

- `zai-closeout-k1-…log`: **18 × EXIT_CODE=0**, ends `ACCEPTANCE RUN COMPLETE`, `===K1-OUTER-EXIT=0`. VERIFIED.
- `zai-closeout-s29b-…log`: boot1/boot2/boot3 all `hub:1, hubPhase:running`, both autosave keys present each time, `pageErrors:[]`. VERIFIED.
- `zai-closeout-l7b-…log`: 6 rows × 2 probes, `tipVisible:false` throughout, every `hitCentre`/`hitRight` = `chip` (**12/12**), `scrollW:390` each. VERIFIED.
- `zai-closeout-part0-rendered-state.log`: `brand:"76 Pancakes"`, `trackSpan:null`, `tipAriaHidden:"true"`, `keyboardFocusTip:"none"`. VERIFIED.

---

## 2 · Findings

### F1 — DEFECT (doc integrity, medium). VERIFY.txt contradicts itself about the ONE open item
Both trees, `VERIFY.txt:1117` (§23.7, shipped paragraph):

> "…THE K1 RE-RUN FOR PARITY IS THE SITTING'S ONE OPEN ITEM — the next sitting runs `bash scripts/acceptance-run.sh` in cakepanz-4/…"

while `VERIFY.txt:951` (§22.2's L10 row, **same delivered bytes**) says:

> "shipped CLOSED (k1, the 2026-11-19 close-out sitting's re-run END-TO-END by the script at the sitting's final bytes … raw stdout receipts/partH-c9/k1-acceptance-run-shipped-retry.log)"

and the report §1.3 says "§23.7's closure is now real for both trees". **The delivered file tells the next reader the opposite of what the sitting achieved**, in the same file, 166 lines apart. This is precisely the defect class this track exists to kill (a doc that states as open what is closed). One-line fix: mark §23.7's shipped paragraph CLOSED with the k1 receipt name, or replace the paragraph with the per-tree closure line.

### F2 — DEFECT (package consistency, medium). The two MANIFESTs name two different dists; only one is present
```
cakepanz-4/MANIFEST.txt:47         76de5658…  dist/single.html   (patched working dist)
cakepanz-4-prepared/MANIFEST.txt:49  670d4c08…  dist/single.html   (pre-patch c9 dist)
package contains:                    76de5658… only (527,162 B); the prepared tree has NO dist/
SHELL-STATUS.md:28-29               "dist/single.html 670d4c08… byte-identical across both trees"
```
Three things follow. (a) SHELL-STATUS's dist line names a sha the package does not contain and asserts a cross-tree byte-identity that this package cannot show. (b) The report's "the delivered artifact `670d4c08…` stays the shipped one" is **inverted relative to the shipped MANIFEST**, which names `76de5658`. (c) If the prepared tree's `src/` carries the Part 0 patches — §0.1 says both trees were patched — then the prepared `dist/` is stale and its `PASS (319)`/numerals claim needs a rebuild + regen to stand; if it does not carry them, the two trees are no longer lock-step. **Not settled from this package** (the prepared `src/` is not included); one command in the real tree settles it:
`cd cakepanz-4-prepared && npm run build && npm run distfile && shasum -a 256 dist/single.html` → expect `76de5658…` if it is patched, and a new MANIFEST count if it is.

### F3 — DEFECT (receipt bug, low). The cite-check's own load-bearing count prints a self-refuting 0
`receipts/partH-c9/zai-closeout-cite-check.log:12`:
```
COUNT L7b all chips hit chip: 0
```
while the L7b log it cites shows 12/12 chip resolutions (6 rows × centre + 85% point). The hex-token result (`25 tokens, 23 receipt-backed + 2 superseded-marked, 0 unresolved`) is unaffected, but the receipt's "load-bearing counts re-verified" block now contains a line that contradicts the evidence it points at — the exact failure mode the cite-check was built to prevent. Either the count's token shape is wrong (likely: it greps for a form the log does not print) or it counts the wrong thing; either way the next reader cannot tell which.

### F4 — DEFECT (doc, low). START-OF-CHAT-ZAI.md's header names the wrong sitting
`cakepanz-4/START-OF-CHAT-ZAI.md:3`:
> "…§2 rewritten at the end of every chat (**this is the 2026-11-18 cakepanz-8.1 sitting's rewrite**…)"

while its own §2 is headed "baseline 2026-11-19, end of the w89 close-out sitting". Header and §2 disagree about which sitting wrote the file, in a file whose whole purpose is to tell the next session what is true. (The §2 body is correct and current — I read it; this is line 3 only.)

### F5 — RISK (design, medium). The C′1 suggestion ring degenerates exactly when it is needed
L13's own receipt, in the board battery I ran:
> "pick 27 (late): **60 highlighted (expected 60**, ids exact)"

At pick 27 of 32 the "top three available" highlight covers the entire board, so it carries zero information at the moment a user most needs a shortlist. The cause is named in the code comment (the tie walk continues while the *displayed* value ties) and is real: wins sit on the engine's 1e-9 grid but the row prints one decimal, so late-round ties are broad. Options, cheapest first:
1. **Rank on the raw value the VM already carries, not the rounded display**, and use the rounded value only for the label. One-line change in `DraftBoard.svelte`; the ring then always means "three players", and the tie case disappears rather than being documented.
2. Cap the walk (e.g. ≤5) and change the row caption to "top 3 + ties" when it triggers — honest but still noisy.
3. Leave it and make the ring mean "recommended tier", not "top three" — a product call for the Owner, not a code fix.

I prefer (1) and would file it as the next shell item: it is the difference between a feature and a decoration.

### F6 — DEFECT (coverage, medium). D1 and D2 have no behavioural standing law — only source strings and one-off probes
- **D1**: `batteries/node.battery.mjs:678-679` asserts two *source strings* (`keepWeek: !!r.week`, `if (!opts.keepWeek)`). The behaviour (a second reload keeps the season) is proved once by `zai-closeout-s29b-…log`, which is **not in any battery**.
- **D2**: N26 asserts source strings (the hover selector, the `:focus` leg's absence, the clamp literal, the dead rule's absence). The 390-tap behaviour is proved once by `zai-closeout-l7b-…log`, also **not in any battery**.

So the composite can be green while both phone/refresh defects are back, as long as a future edit keeps the asserted strings (a CSS-order regression, an added overlay, a renamed wrapper). Z.ai's own 8.1 lesson — "a law must FAIL, never crash" and the presence-pair audit — argues for promoting both probes into `batteries/`: L7b is already written as a probe, and a "boot twice keeps the week" case is a small extension of S29/S31. **This is the highest-value process fix in the delivery**: two probes exist, cost nothing to keep, and currently protect nothing.

### F7 — RISK (falsifier quality, low). FB dies by crash, not by law failure
`shell-falsifier.mjs` FB: `verdict=CRASH-MID-FLOW … ReferenceError: restoreSeason is not defined`. It is receipted honestly, and the run still proves the flow is not silently passing — but by the tree's own standard (8.1's "a law must FAIL, never crash, when its subject is missing") this plant proves less than FA/FC. Worth one line in the next battery touch.

### F8 — OBSERVATION (a11y follow-up to D3, low). The in-flow method is not programmatically tied to the row
`aria-describedby` appears **zero times** in `src/`. After D3 the row's accessible name is the concatenated cells; the method now lives in `<p class="cp-gonehow">` inside the `aria-controls` region, and the tooltip is `aria-hidden`. A screen-reader user can reach it by expanding the row, but the row itself announces no description. One attribute (`aria-describedby="cp-fit-{r.id}"` on `.cp-main`) would make D3's fix complete for the users it was meant to protect.

### F9 — NOT A DEFECT, but a scope note the next reader needs
This package cannot be built, gated or audited on its own (F8's root: 3 src files, no `package.json`, no `scripts/`, prepared tree docs-only). The report says "working-package diffs" in its UPDATE-README, but the folder is named like a full drop (`67-cakepanz-10-…`). A five-line `README` at the package root stating what is included, what is not, and the one command that rebuilds the dist from a full tree would prevent a wasted hour for the next seat.

---

## 3 · What I did NOT run (named, per the protocol)

- **The 18-step composite end-to-end** (`bash scripts/acceptance-run.sh`) — I ran every stage individually (engine, node, slice, shell, board, three falsifiers, regen, gates, numerals) at the patched bytes; I did not run the wrapper itself.
- **The prepared tree's suites** (406/406 engine, its 48/0, its gates at 319) — the package's prepared tree is docs-only; my hosted c9 prepared tree predates the patches (see F2).
- **DS's probes** (`probe-c9-d2.mjs`, `probe-gen-envelopes.mjs`) — not in the package; I read their receipts and re-derived the underlying facts from the code and my own runs.
- **The contrast re-run** (`probe-contrast.mjs`) and the snake check — no reason to doubt them, not re-run.
- **The report's tool byte measurements** (sv-base 15,490 gz, TanStack 25,838, the fork 24,041) — DS's harness was not re-run by me; tagged REPORTED by their own author for the Vue arm, and I have no independent number.

## 4 · The weakest point of this work

**The gap between what was proved and what is now protected.** The sitting proved a great deal — the dist reproduces, five suites are green, every falsifier dies, item-5 reproduces bit-for-bit on a second machine, and the `.gitignore` story closes with a 313→314 proof. But the two user-facing defects it fixed (a lost season on refresh, a dead tap target on a phone) are protected only by **source-string assertions and one-off probes**, and the package's own VERIFY still tells the next reader that the composite's last step is open. F1 and F6 are the same failure in two costumes: the *proof* moved forward, the *guard* did not.

## 5 · Verdict

**improved.** The chain-closure claims are true and reproducible at the delivered bytes; Part 0 is real, minimal, fenced, and byte-reproducible; item-5 is the best-receipted item in the round (it reproduces on a machine that never touched the sandbox). The eight findings above are doc-integrity, coverage and one design defect — none of them is a product regression, and F1/F3/F4 are one-line edits. Fix F1, F2 and F6 before the next sitting builds on this byte set; F5 is a product decision for the Owner with a one-line implementation waiting behind it.