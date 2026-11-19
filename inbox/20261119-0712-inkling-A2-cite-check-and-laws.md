SPEAKER: INKLING | ROLE: seat (MUSE delegation) | TASK: A2 — cite-check prototype battle-tested (as-delivered FAIL → post-fix PASS) + laws.json registry prototype | DATE: 2026-11-19T07:12Z

All commands this window. Scratch at `/private/…/opencode/c9-fixed/` (rsync of the delivered Desktop copy minus node_modules).
Desktop source NEVER edited. The deliverable is the two artifacts — z.ai adopts or rewrites them; the council proposes, never ships.

## 1 · `cite-check.cjs` — the run both ways (VERIFIED)

```
$ node cite-check.cjs "/Users/kosi/Desktop/Football Sim/67-cakepanz-9-2026-11-19"
cite-check: FAIL
  UNMARKED-TOKEN README-DELIVERY-c8.md:39 · 1529a003763459aa…
  UNMARKED-TOKEN README-DELIVERY.md:52 · 4ce69205b72a8f33…
  UNMARKED-TOKEN README-DELIVERY.md:69 · 8ef3b18df08f0989…   ← stale START sha
  UNMARKED-TOKEN RECEIPTS.md:46 · 15b4410469577365…
  UNMARKED-TOKEN WHAT-CHANGED.md:299 · 8ef3b18df08f0989…
  UNMARKED-TOKEN WHAT-CHANGED.md:344 · f31bdf51129a009b…
  UNMARKED-TOKEN cakepanz-4/CHECKSUMS.txt:20 · f27658cc7f63ba9e…
  UNMARKED-TOKEN cakepanz-4/FIXLOG.md:238 · 4ce69205b72a8f33…
  … (26 rows at as-delivered, incl. the Class-1 "both composites re-run" claims)
  COMPOSITE-OVERCLAIM README-DELIVERY.md:60
  COMPOSITE-OVERCLAIM WHAT-CHANGED.md:264
  COMPOSITE-OVERCLAIM cakepanz-4/SHELL-STATUS.md:32 (+ prepared)
  COMPOSITE-OVERCLAIM VERIFY.txt:951 (both trees)   ← WAIT: exempt correctly ONLY when per-tree scoped
exit=1

$ node cite-check.cjs /private/…/c9-fixed     # after: seven doc edits (v3 §1 a–g) + .gitignore placed + node scripts/regen-manifest.mjs ×2
cite-check: PASS (110 docs, zero unmarked tokens, zero composite overclaims)
gate-manifest: PASS (314) shipped · PASS (319) prepared   ← re-verified
exit=0
```
**In sight of the whole fix order:** edit docs → place `.gitignore` (byte `f27658cc…`, in git @ `5fb4989a`) → **`regen-manifest` ×2 (mandatory — any content edit invalidates the manifest) → `gate-manifest` PASS → cite-check PASS → THEN re-zip.** Skipping regen re-fails the manifest half of the check — measured: every edited doc's manifest hash diverges until regen.

What the check enforces (one paragraph): every ≥40-hex token quoted in the doc layer is either a literal file's sha256 in the tree (or the .gitignore's, now placed), a pinned known-superseded value superseded in-line, or it is on a receipts/ line — anything else FAILS, plus the composite-overclaim rule (line-scoped, with the per-tree exemption: VERIFY:951/:1027 pass post-fix), plus the ACCEPTANCE-RECEIPTS COMPLETE/no-EXIT_CODE=1 assertion.

## 2 · `laws.json` — the registry prototype (VERIFIED)

```
$ node validate.mjs laws.json
laws: 16 unique ids: 16 active: 11 superseded: 4 proposed: 1   exit=0
```
Contents: the live set — L8 (Complete hand-off; F15-board kills), L10 (acceptance law, named collision with the c9 B1 id — flagged, not silently merged), **L10-b1** (c9 B1: new-draft-after-done), L11, L12, L13, L14, L15, the K-family N25–N29, S1a–S31, plus the SUPERSEDED record L1/L4/L7/L9, plus **F23–F25 as `state: "proposed"`** (the four-dashboard laws — seeds only, unbuilt, awaiting the Owner's Q-rulings). An id reused for a different statement fails the build by construction; superseded laws are history, never deleted.

## 3 · Receipts for the acceptance claim

- Fixed-state process receipts: `regen: 314 entries` / `regen: 319 entries` → `PASS (314/319)` both trees → `cite-check: PASS` ($? 0).
- The 8 as-delivered NOT-IN-TREE tokens, confirmed line-by-line (this session): `1529a003` (c7 dist — marked at all 3 sites), `4ce69205` (8.1 dist — marked at every VERIFY/SHELL-STATUS/FIXLOG site; two MERGE-README/c8 sites already carried SUPERSEDED), `8ef3b18d` (8.1 START — replaced ×4 with `15f088c7`), `f31bdf51` (mid-sitting START — replaced ×2 with `15f088c7`), `15b44104` (c7 shas — marked at the banner site), `3c0dfd3f` (already inline-marked), `f27658cc` (.gitignore sha — tree-resident once placed), `65673a00` (the PREPARED pin identity — a live fact, correctly marked in its own filing; the checker's first draft wrongly flagged it; now whitelisted as scoped-benign).
- The one print bug: the PASS line prints `undefined files hashed` (files is an Array; cosmetic — counts 1070).
- **The check is a floor, not a ceiling:** it catches claim-vs-bytes mismatches; it does not verify claims against intent (e.g. the "Class 6" note about h23). It knows nothing about whether a claim SHOULD exist — that door stays open for human review (it is the reason this round exists).

## 4 · What the fixed package state needs in order (if the Owner directs the fix)

1. The seven doc edits (v3 §1, INKLING's brief) + SHELL-STATUS/FIXLOG inline markers + WHAT-CHANGED:264 (+ the four `ledger/intake-…`/`build-report` rows) — all applied in a scratch copy exactly as listed in A1's table — verified end-to-end by the PASS above.
2. `.gitignore` placed (the bytes are at `council/inkling @ 5fb4989a` — one file, any seat's copy may supply it; beam's copy already carries it and hashes `f27658cc…`).
3. `regen-manifest` ×2 → `gate-manifest` PASS ×2 → cite-check PASS → re-zip → the zip sha replaces `0d362203…` in every doc that names it ($A1 Class 4 rows 24–26).

— INKLING, 2026-11-19T07:12Z. Both artefacts exist as files this session (`cite-check.mjs`, `laws.json`, the validator); the package is NOT modified by any of this; nothing is adopted until z.ai's next sitting or the Owner says so.
