SPEAKER: inkling | ROLE: council | TASK: P-355 — build tools/pin-watch.mjs, falsify it, show the live catch | DATE: 2026-11-18T00:01Z
FOR: P-355

**BUILT, FALSIFIED, AND RUN AGAINST THE LIVE STALE PIN.** Tool: `tools/pin-watch.mjs` on `council/inkling` at `fab6969f` (this seat; pushed). It is the first instance of the pin-watch Glyph could not find in any tree and Ernie ran by hand (his F-5 design, adopted).

## The design, as built (Ernie's F-5, with one strengthening)

1. **COUNT first** — the tree's engine snapshot (`src/engine/**`) file list vs the named commit (`colors/src` at `--pin`). Mismatch exits 2 with the missing/extra files named.
2. **HASH second** — sha256 of EVERY engine file the two share (a superset of F-5's three-file spot check; the files are small, the full set is cheap, and a partial check is how a one-file drift slips through), plus `tools/mathlab/flex.json` vs the pin's. Any difference exits 3 with the files named.
3. **The manifest is never a pass condition** — CHECKSUMS/MANIFEST are reported, never relied on (the manifest is the thing that goes stale). The tree's README/SNAPSHOT/SHELL-STATUS pin lines are printed with file:line, each resolved against the repo; `--strict` makes a doc line naming a different commit than `--pin` a failure (exit 4).
4. Preconditions exit 1 with the missing anchor named (tree-dir, engine-subdir, pin resolution, pin-prefix) — never a green it did not measure.

## The falsifier (self-test, one command)

`node tools/pin-watch.mjs --self-test --pin d3bd81d2` — creates fixtures in a temp dir: clean extract of the pin passes (0); one tampered `flex.ts` is caught (3); one deleted engine file is caught (2); missing tree-dir exits 1; unresolvable pin exits 1; missing engine-subdir exits 1. **Receipt (this seat, 2026-11-18, Node v26.13.0): all six fixtures behave.** The tool can fail on itself, loudly, naming file and anchor.

## The live catch (VERIFIED, extracts under `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/`)

Deployed tree `origin/gh-pages:67-cakepanz` (fresh `git archive` extract), the tree the README says is pinned at `4ca9a071`:

- `--pin 4ca9a071` (the pin its README names): **exit 2** — `count: tree 57 engine file(s) vs pin 52 -> MISMATCH … 0 missing, 5 extra vs 4ca9a071c702 (core/events.ts, core/fold.ts, core/keyedrng.ts, core/pack.ts, sports/nfl/engine/legacyprovider.ts)`.
- `--pin d3bd81d2` (the pin it actually carries, per the 2026-11-15 MUSE re-pin): **exit 0 on count+content** — 57 files byte-identical — **but** `--strict` exits **4**: five doc lines name `4ca9a071` and differ from the carried pin (`README.md:4`, `README.md:9`, `README.md:11`, `CHECKSUMS-slice1.txt:2`, `CHECKSUMS-slice2.txt:2`). The deployed tree's content is d3bd81d2 while its docs claim 4ca9a071 — exactly the P-355 defect class, caught on the live deployment.
- No `SNAPSHOT.md` exists in the deployed tree at all (the "honest pin line" check has no contract to read).

The prepared Cakepanz-5 tree (`cakepanz-4-prepared`, the 65673a00 re-pin sitting NOT activated), same tool:

- `--pin 65673a00` (the pin its `SNAPSHOT.md` names): **exit 0** — 68 files byte-identical, flex byte-identical.
- `--pin 5c808472` (the pin its `README.md` names — the prepared tree's README was copied from the shipped tree): **exit 2** — `count: tree 68 vs pin 67 … 1 extra: sports/nfl/sim/passclass.ts`. The documentary defect MUSE/VL found, reproduced as an exit code.

The shipped shell tree (`cakepanz-4`, `5c808472`): `--pin 5c808472` exit 0 (67 files); its docs carry the usual historical citations (29 WARNs, no FAIL).

## A second live defect the run surfaced (VERIFIED)

The flex table the deployed tree carries (byte-identical to d3bd81d2's) histograms **{0:23, 2:10, 6:43, 12:23}** — it does NOT include the Owner-approved landings `fe611cbd` (FB>TE 6→2, 2026-11-16) or `9c3a7701` (six rules 0→2, 2026-11-17). The tip (65673a00), the shipped shell (5c808472) and the prepared re-pin all carry **{0:17, 2:17, 6:42, 12:23}** (my count from the bytes; SNAPSHOT.md agrees), and `5c808472 == 65673a00` byte-identically (cmp exit 0) while `d3bd81d2` differs at line 2 (the two landings). **The live deployed engine does not include the Owner's two flex landings; the prepared re-pin (65673a00) does. Activation is the Owner's word; this is the fact in front of him.** d3bd81d2 is an ancestor of the tip but not a descendant of those landings (`git merge-base --is-ancestor` checked both ways).

## What this does NOT settle

The merge-gate work as filed in the round prompt is Part 7 (my P-333 filing) — pin-watch enforces checks 1–2 and the pin-line part of check 4; it does not run the suite (check 3) or check the seam (check 5). `--strict` is for trees whose docs must be single-pin-clean; the shipped/prepared trees legitimately cite old pins "kept for the record" and must not be run with it.

BLOCKED: nothing for the tool itself. Activation of the prepared re-pin (and the deployed tree's stale flex/docs) is the Owner's word. The seven MUSE drafts this round cites are not on origin/council/muse (tip 11ca6fde) or any remote ref I can fetch — see my P-333 filing; nothing here depends on them.
OPEN (Owner): activate the prepared 65673a00 re-pin (deployed tree carries d3bd81d2 = pre-FB>TE/pre-six-rules flex) — yours; not this seat's call.
NEXT (1–3): (1) Owner/Architect: apply pin-watch in the merge-gate as checks 1–2 (spec in my P-333 filing). (2) The pin-watch path is now written — path `tools/pin-watch.mjs` on `council/inkling` @ fab6969f (the round's Part 5 one-liner: previously "not written"). (3) Re-run the deployed tree under pin-watch after any re-pin; a green there is the activation receipt.
