SPEAKER: zai | ROLE: Executor of 67 Cakepanz (the shell) | TASK: fix round on slice 12 — merge rehearsal, gates, and the D3/D4 packaging fixes | DATE: 2026-11-17T02:21Z
FOR: R-13

Slice 12 after the 2026-11-17 fix round. This slice carried D3, D4, D5 and the merge-cone work.

- D3 FIXED: the delivered dist/index.html referenced ./assets/* that were NOT SHIPPED (a permanently
  blank page over vite preview). The packaging now ships what it needs: a rebuild produces
  dist/assets/ (this sitting: index-BWZpYvFy.js + index-BNgoTU95.css, receipted in CHECKSUMS.txt),
  dist/index.html stays the canonical preview artifact, and dist/single.html stays the file://
  artifact — built by scripts/distfile.mjs (449.7 KB, "no external refs: true"). The shell battery
  boots BOTH: S1–S25 over http against the built dist, S26–S28 over vanilla file:// against
  single.html — 46/0 exit 0. No hand-editing of dist/ anywhere; the build produced the artifacts.
- D4 FIXED: the gates were structurally blind to the build output (regen skipped dist/; the gate's
  converse check walked nothing under it). Now: regen-manifest.mjs hashes EVERY file under dist/;
  gate-manifest.mjs walks dist/ in the converse check AND asserts the BOOT TARGET — every
  <script src> / <link href> dist/index.html references must exist and match its manifest sha256,
  and dist/single.html must exist. Receipt: gate-manifest PASS with the dist entries verified +
  the boot target checked (ACCEPTANCE-RECEIPTS.txt this sitting). The D3-class loss is now
  gate-visible: a missing asset fails the gate.
- D5 FIXED: the <title> says the honest product line (76 Pancakes — the draft and the season; the
  slices-1-2 label is gone) in index.html and in both shipped dist files (the rebuild carries it).
  The README body's stale pin/52-files/284-tests lines are corrected (d3bd81d2 / 57 / 323, the old
  line kept only as a marked correction). The gh-pages README's pin line fix (4ca9a071 → d3bd81d2,
  52 → 57) is staged at deliveries/gh-pages-fix/README.md — I cannot push; the Owner applies it.
- M3 AS A HABIT: scripts/swap-test.mjs — one command swaps src/engine/ to a named engine commit,
  runs the engine suite + the node battery + a build + the slice battery, and diff -rqs the tree to
  prove nothing outside src/engine/ changed. Run this sitting at the Architect tip 7a0706df (receipt
  in VERIFY.txt §M3 / swap-test.log). Falsified: the D3-class loss (a missing dist asset) fails the
  manifest gate; the swap's diff -rq would scream on any file outside the snapshot.
- THE SEAM, RE-MEASURED (M5): the ONE DOOR holds — zero files outside src/engine/ and src/lib/port/
  import the engine (grep receipt in VERIFY.txt §M1). The seam is ONE file: src/lib/port/seam.ts,
  160 lines, 68 engine-import lines, 38 distinct engine module paths, 20 port modules beside it.
  Command: `grep -rn "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v src/engine | grep -v src/lib/port` (empty) and `grep -c "from '.*engine/" src/lib/port/seam.ts` (68).

Labels: VERIFIED (all receipts ran this sitting).
