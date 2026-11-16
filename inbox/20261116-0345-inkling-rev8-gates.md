SPEAKER: inkling | TASK: Engine test round — E. Rev 8 integrity sweep: re-run the delivery's own gates on a clean copy | DATE: 2026-11-16T03:45Z
FOR: framework comparison (R-13)

DELIVERY: Z.ai fresh-start "Rev 8", vendored pass-through at `_agents/inkling/deliveries/zai-fresh-start-rev8-2026-11-15/` on `council/inkling` @ `11425623` ("inkling: vendor Z.ai fresh-start Rev 8 delivery (OWNER-DIRECTED)"). blob of `scripts/gate-manifest.mjs` = `320d11985d4e…`, `scripts/gate-numerals.mjs` = `e68ad2a95966…`.
METHOD: pass-through copy tarred to a disposable scratch dir, excluding `node_modules/`, `.git/`, `dist/` (the delivery's own stated exclusion rule). All commands run there. Files mutated during the probe were restored afterwards; the gates re-run CLEAN; the delivery on the branch is byte-untouched (`git status` empty for it). The Svelte probes ran with `npm ci` (not install) in the scratch copy.

## E1. The delivery's own gates, one line each (exact commands, exact outputs)
- `sha256sum -c CHECKSUMS.txt` (root) → `MANIFEST.txt: OK` / `RECEIPT.md: OK` / `DELIVERY-NOTE.md: OK` / `verified-as-of.json: OK`, exit 0. VERIFIED.
- `sha256sum -c REV-5.1-addendum/CHECKSUMS.txt` **from the tree root** → `sha256sum:  <entry>: No such file or directory` on all 360 entries, exit 1. The manifest's paths are relative to the addendum directory. **Re-run from inside `REV-5.1-addendum/`** → 360/360 OK, exit 0. VERIFIED both. Note for the record: the brief's literal command fails on this tree from the root for a path-base reason, and prints "anything else" in exactly the way the brief warned about — stop and say so, done; the content verifies 360/360 from the base the manifest assumes, and `node scripts/gate-manifest.mjs .` (which is base-aware) verifies the same 360 from the root.
- `node scripts/gate-manifest.mjs .` → `gate-manifest: 4 manifest file(s) found`; `CHECKSUMS.txt: 4 entries … PASS`; `MANIFEST.txt: 659 entries, 659 OK … PASS`; `REV-5.1-addendum/CHECKSUMS.txt: 360 entries, 360 OK … PASS`; `REV-5.1-addendum/MANIFEST.txt: 0 entries, 0 OK, 0 MISMATCH, 0 MISSING → PASS`; `GATE RESULT: PASS — 1023 entries verified across 4 manifest(s)`, exit 0. VERIFIED. The surprise (mine, of the run): the green verdict includes a manifest that verified NOTHING and still counts as PASS.
- `node scripts/gate-numerals.mjs . --legacy-scan` → `CLEAN — 0 hits`, exit 0. VERIFIED.
- `node scripts/gate-numerals.mjs . --claims` → `CLEAN — 0 hits`, exit 0. VERIFIED.
- Battery probes both arms, `football-sim-{vue,svelte}/probes/battery-*.json`: `pass == true` in both; `checks` lists 24 items in each, `ok == true` in all 48; `screens.*.nodeCount` IDENTICAL in both arms: cards 871 / stats 457 / board 470 / feed 125 / week 221 / settings 39 — matches the expected tuple exactly; `blocked: 0`, `consoleErrors: []`, `pageErrors: []`. VERIFIED.
- `grep -rniIF "358/358" .` outside REV-8-ERRATA.md → **2 hits** (the brief expects zero), both quote-state receipts of an intermediate re-freeze: `RECEIPT.md:81` ("patched tree — **358/358 OK** (was 346 OK / 12 FAILED …") and `verified-as-of.json:15` ("nested REV-5.1-addendum/CHECKSUMS.txt regenerated on the patched tree: 358/358 OK"). Both are pinned by the root `CHECKSUMS.txt`, both contradict the shipped tree (the addendum now verifies 360/360). VERIFIED.
- VERIFY.txt's own count drifted by one against its own tree: it says "root MANIFEST.txt 658 entries" (twice) and "(658 entries)"; the shipped `MANIFEST.txt` carries **659** hash lines and the gate reports **659 OK**. The brief says "VERIFY.txt says 659 entries" — in this tree it says 658. Gate says 659, file says 659, VERIFY.txt says 658. VERIFIED (all three).
- Not verified here: e2e/Playwright runs, the app builds of the arms (item I of this round runs those), and the sealed recipe (item L). UNKNOWN there.

## E2. C2 — the gate passes vacuously on a prose manifest (reproduced)
`REV-5.1-addendum/MANIFEST.txt` is 53 lines of prose (a delivery description; no `<hex>  <path>` lines at all). The gate's entry regex `/^[0-9a-f]{64}\s+\S/` parses it to **0 rows**, the "any bad or missing" branch never fires, and the manifest is reported **PASS**. Reproduced:
- In the clean tree: shown in E1's gate output (`0 entries … → PASS`).
- Standalone: a scratch fixture containing ONLY that prose file → `node gate-manifest.mjs <fixture>` prints `GATE RESULT: PASS — 0 entries verified across 1 manifest(s)`, exit 0. VERIFIED.
- Control: the same gate on a fixture with one wrong hash → `GATE RESULT: FAIL — 1 entry did NOT match`, exit 1. VERIFIED. The gate is not always-green; the defect is specifically that **zero parsed entries is indistinguishable from zero failures**.

**§5 proposal (for the delivery's owner; do NOT apply in-place — this is a filing, not an edit):**
TARGET BUILD: `scripts/gate-manifest.mjs` in the Rev 8 delivery (pass-through `_agents/inkling/deliveries/zai-fresh-start-rev8-2026-11-15/scripts/gate-manifest.mjs` @ council/inkling 11425623; blob `320d11985d4ee97432256e680df9ccab7ac0373e`; same file rides the zip). The gate is Z.ai's tool; whoever owns the delivery applies this.
WHERE (anchor): the line `  const rows = readFileSync(mf, 'utf8').split('\n').filter((l) => l.trim().length > 0 && /^[0-9a-f]{64}\s+\S/.test(l));`
old → new (insert immediately after that line, before `let ok = 0…`):
```
  if (rows.length === 0) {
    failures += 1;
    lines.push(`manifest ${relative(root, mf)}: 0 entries parsed — UNPARSEABLE (expected "<hex>  <path>" lines; a manifest that verified nothing must not report PASS)`);
    continue;
  }
```
and, defense in depth, after the manifests loop and before the verdict block:
```
  if (manifests.length === 0) { console.error(`gate-manifest: no CHECKSUMS.txt/MANIFEST.txt found under ${root}`); process.exit(2); }
```
WHY: closes the vacuous-pass class for every prose manifest, not only this one; a delivery that means "this file is prose, not a list of hashes" must rename it, not have the gate bless it.
SAFE ALONE?: yes — additive; every valid manifest in this tree parses ≥4 rows (root 4, MANIFEST 659, addendum CHECKSUMS 360); only the prose manifest flips PASS→FAIL, which is the point. It changes the delivery's verdict line for the whole tree from PASS to FAIL until the prose file is dealt with — deliberately so; the C2 defect must not be laundered by a green headline.
HOW TO CHECK: fixture with only the prose file → before: exit 0 "PASS — 0 entries"; after: exit 1 with `UNPARSEABLE`; fixture with a wrong hash → still exit 1 FAIL; the real tree after the change → exit 1 naming the prose manifest (expected); after the owner re-freezes (real manifest for the addendum, or the prose file renamed) → exit 0. VERIFIED by me for the before-states; the after-state is INFERRED from the patch text (not applied — it is Z.ai's file).

## E3. C3 — the numeral gate catches planted falsehoods (all four)
All plants appended to the disposable copy; both files restored; `--legacy-scan` and `--claims` CLEAN again after restore. VERIFIED.
- `--claims` with "**Gate 7 sign-off**: the final tree inlines **951204 bytes** and ships with **512** fixtures." → exit 1: `claims: decision numeral 512 in "512**…" has no entry in verified-as-of.json`. **951204 is NOT flagged**: the decision-numeral regex is `\b(\d{2,5})\b` — six digits slips through silently (so do 4,343,000 and any 6+-digit byte count). Weak point filed.
- `--legacy-scan` with "MANIFEST.txt carries 12345 sha256 lines as shipped." → exit 1: `R3 … claims MANIFEST.txt 12345 lines but the shipped file has 659`.
- `--legacy-scan` with "The board fidelity pin was cards 999/999 per screen in both arms." → exit 1: `R1 … cards count quoted 999 but battery JSONs say 871`.
- `--legacy-scan` unscoped "workarounds 4 vs 6 holds in the final tree." → exit 1: `R2 … workarounds quoted 4 vs 6 but RECEIPT.md itemises 4 vs 3`.
Weakest points (filed, not fixed): the 2–5 digit bound; the `/^(19|20)\d\d$/` year exclusion is broad; `--claims` validates attribution against `verified-as-of.json`, not truth — an in-set-but-false claim passes; and R1/R2/R3 read only DELIVERY-NOTE/RECEIPT (a false numeral planted in PART-A-CLASS-BRIDGE.md, the ERRATA, or VERIFY.txt is invisible to this gate — VERIFIED by design reading of the code; not planted there).

## E4. Gate-5 falsification probe — reproduced, with one correction to the delivery's receipt
Appended and run; all three probes restored afterwards; check + build green again after restore. VERIFIED.
- **FACADE arm (the one that matters):** `export { ready as _probeFacade };` appended to `src/lib/state/seasonStore-facade.svelte.ts` → `npm run check` exits **0** — `svelte-check found 0 errors and 0 warnings` — and `npm run build` exits **1** — `RolldownError: src/lib/state/seasonStore-facade.svelte.ts:60:9 Cannot export state from a module if it is reassigned … (state_invalid_export)`. Checker silent; build red. Exactly the gate-5 hole; the build-green clause (Part C1) is therefore REQUIRED, and this tree proves it in both directions. VERIFIED by my run.
- **CLASS arm — the delivery's receipt does not reproduce:** `export { ready as _probeClass };` appended to `src/lib/state/seasonStore-class.svelte.ts` (the exact line PART-A-CLASS-BRIDGE.md receipts) → `npm run check` exits **1**: `seasonStore-class.svelte.ts:52:10 Error: Cannot find name 'ready'.` — `ready` is an instance field ($state.raw on the class), not a module-level binding; the line is an invalid program the checker rejects. So the claimed outcome "build fails while svelte-check reports 0 errors and 0 warnings" does NOT occur for the class file as written. The class-side story should be corrected in the next revision (or the arm dropped; the facade arm already carries the proof). VERIFIED by my run — this contradicts the delivery's own PART-A-CLASS-BRIDGE.md claim, verbatim.
- **Wrappers arm (bonus, same pattern):** `export { slot };` appended to `src/lib/state/weekStore-wrappers.svelte.ts` → `npm run check` exits 0 (0/0); `npm run build` exits 1; the error is reported twice (vite-plugin-svelte compile-module + RolldownError), both at `weekStore-wrappers.svelte.ts:44:9`, `state_invalid_export`. VERIFIED.
- After restore: `npm run check` exit 0 (0 errors, 0 warnings); `npm run build` exit 0, `singlefile: inlined · remaining external refs: 0 · bytes: 434753` — matches the delivery's stated Svelte build size (434,753 B). VERIFIED.
Bottom line: the build-green clause is vindicated on this tree — two of three probe arms are invisible to svelte-check and visible only to the build. The third (class) is an invalid program, not a silent failure: a different failure, still not a pass.

## E5. What this sweep does not settle
Where the Rev 8 numbers SHOULD have moved and did not get re-run here: the arm builds/tests (`git status` clean; item I of this round covers the fresh repos), e2e, and the sealed recipe. `REV-5.1-addendum/MANIFEST.txt` remains prose in a tree whose gate cannot fail it (until the owner acts on E2). VERIFY.txt's 658 vs the shipped 659 and the two pinned 358/358 receipts are documentation defects inside a CHECKSUMS-pinned envelope: any future re-freeze that regenerates the manifest will make those receipts visibly stale, which is correct behavior for an append-only record — but the delivery should not ship with its VERIFY.txt understating its own manifest by one.

## E6. Verdict on the sweep
No gate here was silently broken in the always-green sense — the numeral gate fires on four kinds of plant, the manifest gate fires on mismatches and (pre-fix) only misses 0-entries, and the checker passes things the build rejects. The delivery's self-description is honest about what it did NOT verify (r51_patch.py "applied 17/17" unverifiable; sealed bench OWED). What E shows is narrower: (i) one whole class of gate verdicts (0-entry manifests) is structurally exempt from failure; (ii) the delivery's own prose pins two stale counts as current fact; (iii) the class-side falsification receipt does not reproduce.
Evidence labels: everything run by me this session is VERIFIED. The §5 patch text is INFERRED to apply cleanly (not applied). No file in the delivery was modified on the branch; scratch mutations were restored and the gates re-run CLEAN.
