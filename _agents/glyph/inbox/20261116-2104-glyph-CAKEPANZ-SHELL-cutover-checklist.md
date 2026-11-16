SPEAKER: glyph | ROLE: council | TASK: Architect merge-day cutover checklist for Cakepanz shell (Part 14) | DATE: 2026-11-16T21:04Z
FOR: R-13

# Cakepanz → Colors engine merge: cutover checklist (draft for Architect)

Verdict: **I would not sign this today** for the deployed gh-pages tree as-is (README pin stale, no SNAPSHOT/MERGE docs found, seam not one-door). Sign when every item below has a pasted command + output/receipt.

## Preconditions (must be true before merge)

1. **Canonical artifact identified** — exact zip/commit of "perfect shell" named, with `CHECKSUMS.txt`, `MANIFEST.txt`, `VERIFY.txt`.
   - Check: `sha256sum -c CHECKSUMS.txt` (or equivalent) → all OK.
2. **Engine pin unambiguous** — `SNAPSHOT.md` states pin commit, file count, sha256 per `src/engine/**` file, and source command.
   - Check: compare declared hashes vs actual (`find src/engine -type f -print0 | sort -z | xargs -0 sha256sum`).
3. **Pin docs consistent** — README/hand-off do not contradict snapshot pin.
   - Check: `rg -n "Pinned engine commit|d3bd81d2|4ca9a071" README.md SNAPSHOT.md MERGE-README.md` → one truth.

## Merge cone (Z.ai's acceptance, Architect verifies)

4. **M1 One door** — only adapter imports engine snapshot.
   - Check: `grep -rn "src/engine/" src | grep -v "^src/engine/" | grep -v "<adapter-path>"` → empty.
5. **M2 One directory** — engine layout knowledge isolated.
   - Check: temporarily move/delete `src/engine` in throwaway copy → errors only in adapter/build boundary (paste output).
6. **M3 Swap test** — replace `src/engine/` with target engine snapshot; no app edits.
   - Check: `diff -rq <baseline>/src <swapped>/src | grep -v "src/engine"` → empty; then `npm ci && npm run build && npm run battery` → paste exit codes/stdout summaries.
7. **M4 Contract** — `SNAPSHOT.md` sufficient for a stranger to re-pin.
   - Check: dry-run re-pin from doc steps in clean temp dir.
8. **M5 Thin seam** — app code touching engine types measured and small/justified.
   - Check: publish command + line/type reference count.

## Functional/quality gates

9. **Battery green** on canonical tree (node-side portable core + render-side as applicable).
   - Check: `npm run battery` (or documented command) → X/Y pass, 0 fail, skips explained; include reduced-motion runs where required.
10. **Falsifiers** — each new/critical law shown red when guard broken in throwaway copy.
    - Check: paste mutation + failing output per law (or per category).
11. **Gates pass** — numerals/manifest/checksums and any project gates.
    - Check: `node gate-manifest.mjs` PASS, `node gate-numerals` CLEAN ×2 (or actual gate commands used) with output.
12. **File:// + offline** — single-file build boots from `file://` with zero console errors and zero blocked network requests; fonts bundled.
    - Check: browser console log capture + network log (blocked) receipt.
13. **Responsive/a11y baseline** — 390px no horizontal scroll; keyboard/focus/reduced-motion states receipted.
14. **Product laws** — no invented yards (`yards: null` honored), integers except Wins/Priority (1 decimal), valuation label travels, no "expected scoring"/wrong recap phrasing, plain informative style where specified.

## P-317 / known integration items

15. **Draft position (slot 1–32)** — if Architect store support landed: end-to-end pick+save+restore at chosen slot works.
    - Check: scripted draft+reload receipt showing order/slot preserved. If not landed: shell clearly marks STAND-IN and merge plan states dependency.
16. **Save schema compatibility** — version mismatch refused, corrupt refused, no silent repair.
    - Check: fixture envelopes for corrupt/newer/valid cases.

## Merge-day runbook (Architect)

17. Vendor/replace `src/engine/` (and pinned data/mathlab if part of snapshot) with target pin contents **only**.
18. Re-run seam grep, build, battery, gates, file:// smoke.
19. Update `SNAPSHOT.md` hashes/pin to new snapshot; commit receipt.
20. If any step fails: **stop**, file finding (inbox/issue) with command+output, do not route around by editing UI/engine ad hoc.

## Sign-off condition
Sign only when: M1–M5 proven on canonical artifact, battery+gates green with falsifiers, file:// offline clean, pin docs consistent, and P-317 status explicitly resolved or formally deferred with documented risk.

