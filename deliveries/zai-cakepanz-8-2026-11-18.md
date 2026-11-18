SPEAKER: inkling (MUSE delegation) | ROLE: council infrastructure | TASK: cakepanz-8 sitting prompt for Z.ai | DATE: 2026-11-18

# To Z.ai · Executor of 67 Cakepanz · the cakepanz-8 sitting

You deliver one zip; the Owner places it; you never push. This prompt is the current state for anyone who opens it cold. Everything labelled VERIFIED was checked by a seat against the refs named — rerun it only if you dispute it, with receipts.

## 1 · Where things actually stand (2026-11-18, after the cakepanz-7 sitting)

- **The live site stays wave 89** (`origin/gh-pages` tip is still `66096fb`). The staged gh-pages fix (two files: `67-cakepanz/README.md` + `CHECKSUMS-slice2.txt`) that names `d3bd81d2` / 57 files is **NOT placed** — the deployed tree still names `4ca9a071` / 52 files. Placement is the Owner's click (see §5-C). Never place it yourself.
- **The engine (`architect/engine-and-seats`) is now at `57fb83c`** ("Pools node: down-preserving record hierarchy"). Note what that means for you: the **default pools node changed** — 4th-down tries that go on without a first down went from 17% (passes) / 10% (runs) to ~0.2% / ~0.1%, matching real 2023-25; conversion rates are untouched; points moved −0.28/game; **the GLM pass-class node stays OFF** (lambda 0); the sacks shift is a different problem, untouched; 409 → 414/414 tests; a CI gate at `1aa7fb3` ran the pin-watch falsifier green (GitHub Actions run `44262444359`, 57s, job `colors`). The engine is the Architect's; you never edit it. The Architect is measuring against real seasons next; any number you quote about the engine must come from a receipt, not from this paragraph.
- **67 Cakepanz shipped tree** = `67-cakepanz-7-2026-11-18/cakepanz-4` → 76 Pancakes UI, **pin 5c808472**; engine snapshot 67 TS files + data packs; **preparations** = `cakepanz-4-prepared` @ **65673a00** (PREPARED, NOT ACTIVATED), door sign names 65673a00 / 68 files.
- **`65673a00` is now superseded by `57fb83c`.** Any future re-prep (only if the Owner orders it) targets `57fb83c`; the shipped tree stays 5c808472 until the Owner says re-pin/activate. The 65673a00 prepared package remains valid *as a package* but the pin it was built for is no longer the engine's tip — do not re-activate, do not re-prep, do not touch it without his word.
- **Cakepanz-7 delivery is readable** (`council/inkling @ 0fcbc2c0` → `_agents/inkling/67-cakepanz-7-2026-11-18/`, 796 files, 33 MB) — pushed for readability by the Owner's instruction; the delivery's own line "Push nothing" was about the original zip hand-off and remains the default for anything you produce now.
- **Reviews are public**: `inbox/20261118-0745 (cakepanz-7)` ok-with-notes and `inbox/20261118-0756 (pin-watch receipt)`, `inbox/20261118-0804 / -0814 / -0815 / -0800-vl` (verification wave), `inbox/20261118-1720 (hier-fix review)`, `inbox/20261118-0854 (architect engine work)` on `council/inkling`/`council/beam`/`council/glyph`/`council/ernie`/`council/vl`. Read them only if you dispute a VERIFIED line; they do not change your instructions.
- **Owner-gated, unreachable to you (see §5)**: gh-pages placement; the prepared re-pin activation (any pin); the stale-flex-expectations question; Part-E label rulings; dark `--text`; light gold2; Bodoni Moda; "Value" vs "Model Value"; 2PT chip; the CI gate itself.

## 2 · Ground rules (unchanged, they are why the c6/c7 packages look the way they do)

1. **You cannot push. You deliver a zip; the Owner places it.** Nothing you produce mutates any branch, and nothing you produce goes live. The last sitting was pushed for readability by the Owner — a one-time override, not a licence.
2. **The Architect owns the engine — you do not touch it, ever, not even to "fix" something.** Cakepanz consumes the engine as a **frozen snapshot** (byte-identical copy of `colors/src/**` at the named pin into `src/engine/`, plus the five paths: `src/engine/` · `tools/mathlab/flex.json` · `test/engine/` · `test/engine.test.ts` · `data/packs/*.json`). A re-prep = the pinned five paths copied byte-identical from the pin, regenerated via `scripts/sync_engine_tests.py` + `scripts/precompile-engine.mjs`, verified by the listed checks — exactly the procedure in every `SNAPSHOT.md` (read the newest one; VERIFY.txt §20/§§ makes the exact steps public).
3. **THE RECEIPT LAW (this is the rule that cost you a sitting's credibility in c6 and won it back in c7):** a receipt is the raw stdout of the tool **at the final state**; **if the state changes, the receipt is rewritten**. Never ship a FAIL print in the package while claiming PASS. If something is unverifiable, it goes in the delivery as REPORTED/UNKNOWN, named — never as a green you wish you had.
4. **The gate is the gate.** `scripts/gate-manifest.mjs` and `regen-manifest.mjs` self-exclude the receipt layer (`deliveries/receipts/` and `(^|/)gate-manifest-[^/]*\.log$` in the manifest loop AND the converse walk — both trees, identical bytes). Do not weaken it, do not re-add exclusions, do not bypass it. Two consecutive gate runs PASS must be pasted.
5. **Verify against bytes and commands, never against memory or prints** — count files, then hash a sample; `cmp` the flex table; if a number disagrees with what you expect, measure again, and if it still disagrees you STOP and report it. **If you find something changed that you cannot explain, you do not fix it, you file it** — the Architect's world just produced a live example (`clockLate`/`kick_digest` in the 2016–22 vector regen differed from the committed file; he spliced only `rec` and filed the anomaly instead of papering over it). Copy that discipline.
6. **Two trees, never confused.** Shipped (`cakepanz-4/`) vs prepared (`cakepanz-4-prepared/`). Door signs must name THIS tree's pin and the PREPARED-NOT-ACTIVATED banner (if prepared). The shipped tree never moves off 5c808472 without the Owner's word.
7. **Both majors.** The engine suite + the node battery run on Node v24 AND Node v26; the table in VERIFY lists both; if one major is unavailable on your machine, the table says which, and that is reported.
8. **D-1 fresh clone is mandatory when any code moved.** `npm ci` → build → `npm run distfile` → batteries. Fresh `git archive`-style copy of the tree; nothing inherited.
9. **Falsifiers F0–F10, every law dies.** Falsifier logs get pasted in full; a falsifier that cannot run counts as FAILURE, never as a green light.
10. **English-only output; labels VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim.** Do not re-litigate the Part-E label questions — they are REPORTED there and the Owner rules on them; restating them verbatim in "blocked, not yours" is fine.
11. **Zip, one response.** One zip containing everything; one response naming what changed, what was NOT re-run and why; checksums if the delivery includes many artifacts.

## 3 · What the c7 sitting fixed/proved (so you do not redo or break it)

- Gate is robust to its own receipts (PART A); partB receipts rewritten at final state: shipped regen **311 PASS ×2**, prepared **316 PASS ×2**.
- Prepared door sign names **65673a00 / 68 files / PREPARED, NOT ACTIVATED**; B2's `lineup.test.ts:111` reads `assert.ok(bad.length <= 18, ...)` — untouched, keep it that way.
- Engine suite **394/394 (shipped @ 5c808472) / 406/406 (prepared @ 65673a00)** on Node v24.22.3 and v26.13.1; battery:node **31/31** both trees both majors; slice **29/0/10/3**; shell **46/0** both trees; falsifiers **F0–F10 DIED** both majors both trees; D-1 green; M3 logs stand unchanged.
- Slice 3 complete: the boot rehydration (`src/lib/port/hydrateApp.ts`, corrupt-never-repair verbatim, autosave over the engine's own serialize/restore, sim:nfl:autosave:* keys) + N25/N26/N27 laws.
- The flex table stays the 99-rule table (17/17/42/23 at 0/2/6/12) in BOTH trees; SS→NICKEL stays 0; do not count rules, never "simplify" it. If the flex table bytes differ across the two trees, STOP.

## 4 · Scope of this sitting — I (the Owner) have not widened it; this is the default; if I want more I will amend this brief

**A · The hygiene-and-receipt sitting (default; explicit scope):**

1. **Fix the delivery's own two document defects found in review** (both yours to fix; both are wording, not bytes):
   - root + shipped `START-OF-CHAT-ZAI.md` carry the RECEIPT LAW sentence **doubled verbatim**; the prepared-tree copy carries it once. Make all three copies byte-identical (prepared wins), and note it.
   - `receipts/partC/gh-pages-fix/FIX-RECEIPT.md` says "the zip carries ONLY those two files" — it carries three (the two corrected files + FIX-RECEIPT.md itself). Correct the line to what the zip actually carries, or drop the sentence; do not re-cut the zip.
   - Same sitting: in the D-1 browser log, `exit=1` from the strip-only TypeScript attempt remains visible two lines before the green re-run — leave it (the PROVENANCE NOTE earned its keep); do not rewrite history, do not renumber anything.
2. **Re-run the c7 receipts fresh, on this machine, on both majors** — OR explicitly state, per item, what is REPORTED-carried-forward unchanged and why (it is accepted to carry forward; ii) re-run it. Deliverable: a dual-major table identical in shape to VERIFY §20.5, rewritten at THIS sitting's final state.
3. **DELIVER-only verification**: verify **this prompt's own §1 state against the live refs** (the gh-pages tip, the pin lines, CI run `44262444359`'s existence and conclusion, `57fb83c` existence) and name anything that moved since this brief was written; if a number is wrong, fix the brief's successor, say so, and move on.
4. **D-1 fresh clone** mandatory for the two doc fixes (trivial changes — cut the clone, do not skip it: it is the only cheap D-1 you get every sitting). Falsifiers re-run only if any code moved — state which it is.
5. **START-OF-CHAT-ZAI.md §2 rewrite** for this sitting (a short one: hygiene sitting, no engine move, c7 state carried, nothing re-pinned).

**B · ONLY if the Owner says "re-prep to 57fb83c" (he has NOT said so):**

Re-prepare against **`57fb83c`** (supersedes the 65673a00 prep): five paths byte-identical (`src/engine/` = 68 TS files + data/packs, `tools/mathlab/flex.json` must be the 99-rule table, `test/engine/`, `test/engine.test.ts`, regenerate via `sync_engine_tests.py` + `npm run distfile` + `precompile`), full D-1, both majors, door sign with 57fb83c + PREPARED banner, M3 both directions, Verify everything in §2's rules. **The shipped tree stays 5c808472. Activation is NEVER this sitting's scope.**

**C · Carry-forward blockers — NOT YOURS, DO NOT ACT (state them verbatim in "blocked, not yours"):**

1. gh-pages placement: the two corrected files over `67-cakepanz/` on `gh-pages` — one commit — the Owner's click (VERIFY.txt §20.3 has the instructions verbatim; the zip carries README + CHECKSUMS-slice2 + FIX-RECEIPT).
2. The deployed suite's 9 red flex expectations (277/9 measured): the staged fix deliberately does NOT touch them; the re-point is the Owner/Architect's decision.
3. Prepared re-pin ACTIVATION (any pin) — the Owner's word only.
4. Part-E label questions: "Model Value" (shell) vs "Value" (w89) — MEASURED_LABEL is the one constant; "Engine Value" is OUT by the Owner's 2026-11-17 ruling; 2PT chip ("2PT / 2PT FAIL" in feedVM.ts vs "2-Pt Conv" in w89) — untouched; dark `--text` 3.17:1 (w89 live behavior) — untouched; light gold2 1.65:1 DEFAULT pair — untouched; Bodoni Moda — OUT of the bundle (the Owner ruling is owed).
5. The CI gate itself (you never modify, weaken, or "fix" workflow files anywhere).
6. The Architect's tree, engine, flex table, lambda default (0), yards-node decision.

**D · What NOT to do, ever, this sitting or any other:**

- No activation, no placement, no re-pin without the Owner's word — silence is never approval.
- No edits to the Architect's tree to make anything match an expectation of yours; any seam in his numbers is filed, not fixed.
- No merging, rebasing, force-pushing, branch creation; you deliver zips and read GitHub over HTTPS only.
- No weakening the gate, the falsifiers, or the receipts' honesty to make a count come out.
- No re-opening settled questions (measured/label/flex/2PT/default-off) — they are settled by the Owner where they are settled, and everything else is his call.

## 5 · Deliverable format

- One zip including: the two trees (or shipped-only if only A ran — say which), `receipts/`, rewritten START-OF-CHAT-ZAI.md, VERIFY.txt additions (or a short VERIFY-addendum if the c7 VERIFY stands untouched), MANIFEST/CHECKSUMS, the gh-pages-fix zip unchanged under `deliveries/gh-pages-fix/` unless the Owner says otherwise.
- One response, English, listing: what you ran and got; what you did not run and why; what is REPORTED vs VERIFIED vs UNKNOWN; the two document fixes; explicitly: nothing placed, nothing activated, nothing pushed, no gate weakened; the blocked list verbatim.
- If (and only if) the Owner asks in the delivery's instructions, the sitting may be pushed for readability — that is a per-sitting Owner decision, never a default.

## 6 · When you are done

The Owner reads the zip; the Architect looks at the receipts; the council reviews. If anything is unclear, you ask the Owner before acting on it — one sitting, one zip, nothing else rides.
