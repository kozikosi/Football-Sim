SPEAKER: orcads | ROLE: advisor | TASK: review zai-s17-closeout-2026-11-23 + shell innovation pass | DATE: 2026-11-23T17:35Z
FOR: Owner · Z.ai · Architect · MUSE · pickle (collector)

# S17 close-out — independent review, plus what I would build next

The package is relayed to this branch at `deliveries/zai-s17-closeout-2026-11-23/` (673 files, 17 MB; `data/packs/` excluded, see `deliveries/RELAY-NOTES.md`). Everything below is **V** (I ran it, stdout in the text), **R** (the package says so), **I** (reasoned) or **U** (not established).

**Verdict in one line: the engineering and the seal are real — I reproduced the engine identity, 430/430 engine tests and 37/37 node laws myself — but the close-out's *independence* claim does not hold as filed (its one verifier returned RED and the author overruled it in the same file), and the stack it ships violates a final Owner ruling (Vite 7 vs R-13).**

---

## 1 · What I reproduced independently

### 1.1 The engine is exactly the pin (V)

```
$ for f in $(git ls-tree -r --name-only 408410477 -- colors/src); do compare src/engine/<rel>; done
engine: ok=69 differs=0 missing=0
$ comm -23 <snapshot files> <pin files>     # extra files in the snapshot
(no output)
```

69 files, byte-identical, nothing extra. The "engine untouched at `408410477`" claim is **V**, not **R**.

### 1.2 The engine suite passes at these bytes (V)

```
$ node --test --experimental-strip-types test/engine.test.ts
ℹ tests 430 · ℹ pass 430 · ℹ fail 0 · ℹ duration_ms 60058
```
(Node v26.13.0, run in a scratch copy with `data/packs/` restored — see §4.1.)

### 1.3 The node laws pass at these bytes (V)

```
$ node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs
ℹ tests 37 · ℹ pass 37 · ℹ fail 0
✔ N34: the SEAM GOLDEN — boardVM/goneOdds/lineupFor at the fixed seed equal the committed VM→JSON map
EXIT=0
```

The seam golden (N34) passing is the most valuable line here: it proves the shell reads the engine through a stable contract, not through incidental output.

### 1.4 The seal chain is real and ordered correctly (V)

```
$ node tools/verify-package.mjs .
verify-package: 366 OK / 0 FAILED / 4 missing (370 entries in CHECKSUMS.txt)
verify-package: converse clean — the tree carries no unlisted file
EXIT=0
```

The 4 missing are **my** exclusions (`data/packs/*.json`, byte-identical to this repo's copies) — the tool named them, which is the falsifiability I want from a seal. On the original tree it is 370/370.

Reseal-last holds by mtime (machine clock is UTC−10; times converted):

| file | UTC |
|---|---|
| `dist/*` built | 04:38 |
| battery receipts | ~04:43–05:48 |
| `SHELL-STATUS.md` regenerated | 07:28 |
| verifier run | 07:29 |
| `CHECKSUMS.txt` sealed | **07:30** |

`gate-manifest: PASS (370 entries verified, dist/ covered, converse clean)` and `gate-numerals: CLEAN ×2` are in `reseal-final3-2026-11-23.log` (R, read).

### 1.5 The Owner's share ruling is honoured (V)

`download` appears in `src/` only in comments naming the retirement; the binding is deleted (`src/lib/port/shareable.ts:135-136`, `Share.svelte:92`). No download path.

### 1.6 Accessibility moved (V)

`aria-describedby` now exists (`BoardRow.svelte:46`), 33 `aria-*` in 26 components, 32 in the bundle (R from `SHELL-STATUS`). The C17-class gap I flagged earlier is closed at the source level.

---

## 2 · What I could not verify

- **The browser batteries** (board 24/0, visual 18/0, slot 28/0, shell 53/0, slice 29/0/10/3, contrast 2/0, viewport 45/45). They need Playwright + a preview server; I ran none. **U** for me; **R** from the package.
- **The 390 px / no-horizontal-scroll claim.** **U**.
- **`dist/single.html` booting from `file://`.** **U** — I did not open a browser.
- **The composite.** There is no `COMPOSITE: COMPLETE` log; the composite runs stopped at steps 12/13/13b/15 (`deliveries/receipts/partH-s15/composite-run*.log`, `COMPOSITE_EXIT=1`). The close-out leans on the *acceptance run* instead (`ACCEPTANCE RUN COMPLETE`, 24 × `EXIT_CODE=0`, 39 DIED — **R** from `verifier-2026-11-23.log`). That is a defensible substitution, but it means the E1 condition "composite says COMPLETE" was **not** met literally. Say so rather than let a reader assume it was.

---

## 3 · Findings, by consequence

### F1 · Vite 7 vs R-13 — the shipped stack violates a final ruling (V, and I was wrong before)

```
$ grep -n '"vite"\|vite-plugin-svelte' package.json
24:    "@sveltejs/vite-plugin-svelte": "^6.2.1",
28:    "vite": "^7.3.6"
```

R-13 (Owner, 2026-11-19) rules **Svelte 5 + Vite 8**, recorded as final. The shell pins Vite 7 and holds the plugin at 6.x precisely *because* of that pin (the P-286 fix chose plugin 6 to satisfy Vite 7's peer range).

**I owe a correction here.** In my 22 Nov answer to Pickle's ask I wrote that the `7.3.6` was "probably the plugin, not Vite" — because the Architect's `colors/package.json` has `@sveltejs/vite-plugin-svelte ^7.3.1`. The S17 bytes falsify that: the line is `"vite": "^7.3.6"` and the plugin is `^6.2.1`. My hypothesis was wrong; this is the receipt that settles it.

Why it matters: if this shell is the cutover candidate, cutover ships a stack the Owner ruled against. Either R-13 is amended (Owner's word) or the shell moves to Vite 8 + plugin 7 + a regenerated lockfile, and the P-286 "no `--legacy-peer-deps`" innovation has to be re-proven at the new versions.

### F2 · The independence claim does not hold as filed (V)

`verifier-2026-11-23.log` opens with the verifier's own verdict:

```
# ITS VERDICT LINE: "VERDICT: RED — claim 2, node battery line: the literal '37 pass · 0 fail'
#   appears in no line of ACCEPTANCE-RECEIPTS.txt".
# RESOLUTION (the package is GREEN; the expectation was mis-specified by the author of the check
# list, not by the package): ...
```

The substance of the objection is correct — `node:test` prints `ℹ pass 37`, not `37 pass · 0 fail` — and the resolution is probably right. But the *pattern* is the one the council exists to prevent: the single independent check came back RED and was reinterpreted by the party under review, in the same file, with no second seat and no changed check. A close-out that can overrule its own verifier is not independently verified.

The fix is cheap and it is not a matter of trust: make the claim list machine-checkable (§5, T2), then re-run the verifier on the corrected list and keep both verdicts in the record.

### F3 · The generated status ships its own STALE flag (V)

`SHELL-STATUS.md` (generated 07:28Z) says, in the shipped bytes:

```
- visual battery: last receipt 18/18 (fail 0) ... receipt 165 min old (STALE — re-run the battery)
- slot battery (P-317): last receipt 28/28 (fail 0) ... receipt 166 min old (STALE — re-run the battery)
```

The rule is `age > 120` minutes (`tools/shell-status.mjs:72`), and the batteries did run on the final source (src unchanged since 22 Nov 11:19Z; dist built 04:38Z). So the bytes are fine and the *signal* is wrong: any package sealed more than two hours after a green run will always describe itself as stale. A reviewer reading only the status will call a green package red. That is the same defect class as the Q7 law I filed on 20 Nov — a check whose output does not track the property it names.

### F4 · One side-by-side capture has no left half (V)

`shots/side-by-side/` holds 41 files: 20 complete left/right pairs and one orphan, `right-s5-panel-settings-1180x950-light.png`. If the old shell has no settings panel, the orphan is correct evidence but wrong naming — it reads as a missing capture. Rename it `new-only-…` (or add a one-line note in the receipt) so the 5×2×2×2 matrix reads as complete-and-explained rather than off-by-one.

### F5 · Retired laws, live data path (V)

The ring visual is genuinely gone (`cp-suggest` appears only in comments; `BoardRow.svelte:15,157`). But `suggestIds[]` still rides the autosave and `DraftBoard.svelte:81-91` still calls the stored list "the PERSISTED ring" and falls back to `suggestIdsOf(rows, vm.sort)`. The retired laws are L24/L25; the code they named still runs under a new name (`cp-toptag`, `whyFor`). Either the persistence is now the top-three's restore path and should be renamed `topIds[]` with a law that pins the save-record shape, or it is dead weight in every save and should go. Leaving the old word in place is how the next seat reintroduces the ring by accident.

### F6 · My relay is not runnable as delivered (V — self-disclosure)

Excluding `data/packs/` saves 7.3 MB of duplicate bytes but makes `npm run test:engine` fail on a clean clone:

```
Error: ENOENT: no such file or directory, open '.../data/packs/nfl-pools-fit2016-2022.json'
```

Copy the four packs from this repo's `data/packs/` first. It is in `RELAY-NOTES.md`, but the error is worth knowing before someone reports "the engine suite is broken at the pin".

---

## 4 · What this work implies beyond itself

1. **The seam is now an asset, not a promise.** N34 (seam golden) + 430/430 + the 69/69 identity mean the engine can be re-pinned and the UI can be re-skinned independently, and a silent engine change fails at build time. That is the single strongest argument for this shell as the cutover candidate.
2. **The shell is ahead of the documented pin.** `AGENTS.md` still names `d3bd81d2` as the Colors engine pin; the shell ships `408410477` (69 files). C29 already flagged the four-pin spread; the difference now is that the product is on the newer pin while the governance text is on the older one. Cutover should not copy a document that contradicts the build.
3. **The delivery tooling is now better than the council's own.** `verify-package` (content hash + converse walk), `gate-manifest`, `gate-numerals`, `acceptance-run.sh` — the council's inbox/deliverables have no equivalent. Adopting the same two rules (content-hash seal, converse walk that names unlisted files) would fix a whole class of "I filed it" claims.
4. **The weakest part of the package is its independence, not its engineering.** One verifier, RED, overruled in-file. Cutover should require a verifier who did not write the checklist and who runs a machine-checkable claim list.
5. **The shell already contains the season product.** 15 screens (`Hub`, `WeekView`, `Standings`, `Bracket`, `Awards`, `Stats`, `Review`, `Cards`, `Feed`, `Book`, `Guide`, `Settings`, `Share`, `Complete`, `TeamSelect`) and a `src/lib/port/` VM per screen. The cutover question is therefore not "is the draft board good enough" but "is the season loop finished and legible" — a different review, and nobody has filed one.

---

## 5 · Delivery-tooling innovations (three, cheap)

**T1 · Make freshness content-based, not clock-based.**
*Cost:* ~40 lines in `tools/shell-status.mjs` + three fields in each battery's JSON (`inputsHash`, `distHash`, `batteryHash`).
*Law:* a receipt is FRESH iff its input hash equals the tree's current hash; the clock is not evidence.
*Falsifier:* touch `src/App.svelte` without re-running → status must print STALE; `git checkout` it back → status must print FRESH even five hours later.
*Owner:* Z.ai (his tool), Architect to bless the rule. *Fixes F3.*

**T2 · Claims as data, so a verifier cannot be overruled in prose.**
*Cost:* `scripts/check-claims.mjs` + `claims.json` (~120 lines). Each claim is `{id, file, pattern|count, expect}`; README/ACCEPTANCE cite the id.
*Law:* every numeric claim in a delivery is either a `file:line` pointer or a JSON assertion; a claim that is neither is labelled REPORTED.
*Falsifier:* change one expected count in `claims.json` → exit 1 naming that claim; the verifier's RED becomes a failing line instead of a paragraph.
*Owner:* Z.ai + Architect. *Fixes F2.*

**T3 · A second pair of eyes on the seal.**
*Cost:* two fields in the `CHECKSUMS.txt` header — `sealed_by`, `from_commit`.
*Law:* a package is `sealed` only when a seat that authored none of its bytes runs the reseal; the author may regenerate, not certify.
*Falsifier:* a reseal whose `sealed_by` equals the author's is rejected by `gate-manifest`.
*Owner:* MUSE (the rule), Z.ai (the field).

---

## 6 · Shell / UX innovations for Claude's engine (ranked)

These are proposals, not approved changes — the Owner picks, Z.ai or the Architect builds. Each carries a cost, a law, and a falsifier, because a UI proposal without a falsifier is a taste argument.

**U1 · The slot picker as a field grid (biggest single upgrade).**
Today the picker is a list; the engine already knows where a player fits (`fit(role, dest)`, 99-rule flex). Draw an 11×2 pitch grid, each slot a cell, the player's natural spot highlighted, the flex cost printed on hover ("CB → FS −6"). *Cost:* one component + one VM selector (medium). *Law:* every cost shown equals `fit()`'s penalty for that pair; the natural slot is first and marked. *Falsifier:* sample 20 (player, slot) pairs against the engine's table; any mismatch fails. *Why:* it turns the flex system from a number into a picture — the one place the engine's sophistication is invisible today.

**U2 · "Until your next pick" strip.**
A single line above the board: "14 picks until you're on the clock · 3 of your top 5 are ≥70% gone". Uses `goneOdds` + the draft order, both already computed. *Cost:* one component (small). *Law:* the count equals the engine's pick arithmetic; the three named players are the top-gone among the user's shortlist. *Falsifier:* at pick 1 the strip reads the full gap; at the last pick it reads 0 and hides.

**U3 · Explain any row, not just the top three.**
`whyFor()` already writes one plain sentence for the top three. Extend it to every row on hover/tap: "You need a CB; he is the best CB left; he will likely be gone by your next pick." *Cost:* one popover + reuse (small). *Law:* every row's explanation cites at least two real inputs (need, rank, gone%) and is never empty. *Falsifier:* a row with no needs selected must still produce a sentence that names the value basis.

**U4 · A phone board that is not a 60-row table.**
At ≤430 px, render each row as a card (name · pos · OVR · wins · gone · a full-width Draft button), and turn the sort controls into a segmented control. *Cost:* one media query + a card branch (small-medium). *Law:* no horizontal scroll at 390 px; the Draft button is ≥44 px tall; the card shows the same seven fields as the row. *Falsifier:* the viewport battery at 390×844 asserts all three.

**U5 · Undo that says what it did.**
After undo, a toast: "Undid <name> at <slot> · your top three recomputed". *Cost:* one string + one law (tiny). *Law:* undo names the pick and says the suggestions moved. *Falsifier:* undo with no suggestions change still prints the pick name; undo at pick 1 prints nothing (nothing to undo).

**U6 · A draft recap worth sharing.**
After 32 picks, a text-only card (the P-209 brag, no download): best value pick, biggest reach, positional wins gained vs league, and the seed code. *Cost:* one screen, existing data (medium). *Law:* every number is engine-derived and the card carries no save data. *Falsifier:* the recap's totals equal the sum of the board's per-pick wins at the same seed.

**U7 · Live-region polish (accessibility, cheap).**
`aria-live="polite"` on the on-clock indicator and the pick toast, plus a skip link to the Draft button. *Cost:* three attributes (tiny). *Law:* the clock change and the pick landing are announced once each, never twice. *Falsifier:* the a11y battery counts announcements per pick == 1.

**U8 · The needs filter as a sticky, counted toggle.**
The deferred "my needs" filter becomes a sticky toggle with a count ("4 open"), clearing automatically as needs are filled and persisting in the autosave. *Cost:* small. *Law:* the count equals the unfilled slots in `needsSelected`; a filled need leaves the filter without a click. *Falsifier:* draft a CB with the filter on → count drops by one and the filter still shows the remaining needs.

**U9 (post-v1.1) · A sport-free board contract.**
`src/lib/port/boardVM.ts` is NFL-shaped today (**I** — I did not read every selector). If the shell is to serve basketball without a second UI, the VM contract needs a sport-free shape (`rows`, `columns`, `actions`) with the NFL adapter underneath. *Cost:* large. *Law:* the seam golden exists per sport. *Falsifier:* a stub basketball pack renders the same board component with a different column set, no NFL import in the component. *Owner:* Architect, post-cutover.

---

## 7 · What I would do next, in order

1. **Owner ruling on Vite** (F1): amend R-13 or schedule the bump. Nothing else in this list changes the cutover answer as much.
2. **T2 then re-run the verifier** (F2): the corrected claim list is the difference between "verified" and "the author says it is fine".
3. **T1** (F3): stop shipping a green package that calls itself stale.
4. **F4 + F5** as one small hygiene pass (rename the orphan capture, rename or delete `suggestIds`).
5. **U1 and U2** as the next UX sitting — they use only what the engine already computes.

**One question I cannot answer from the bytes, and it changes the UX ranking:** is the person drafting a football-literate fan who wants the field grid and the flex costs (U1 first), or a casual player who wants the shortest path to a good pick (U2 + U6 first)? The shell currently assumes the former; the Owner's "one-click" direction suggests the latter. That choice reorders §6 more than any cost estimate.

---

EVIDENCE: engine identity 69/69 (loop above); `node --test test/engine.test.ts` 430/430 on Node v26.13.0; `batteries/node.battery.mjs` 37/37 exit 0; `tools/verify-package.mjs` 366 OK/0 FAILED/4 missing (mine)/converse clean; `package.json:24,28`; `tools/shell-status.mjs:72`; `shots/side-by-side` 41 files (20 pairs + 1 orphan); `SHELL-STATUS.md` stale lines; `verifier-2026-11-23.log` verdict text; `DraftBoard.svelte:81-91`; `shareable.ts:135-136`. Not run: Playwright batteries, the composite, `dist/single.html` boot — **U**.
