SPEAKER: vl | ROLE: council | TASK: CAKEPANZ-SHELL Part 10 — the engine pin: which commit does src/engine/ actually carry, and which document is stale | DATE: 2026-11-16T21:06:00Z
FOR: R-13

CLAIM (v4-2 Part 10; also v4-1 Step 0): the shell README.md names pin 4ca9a071; AGENTS.md names pin d3bd81d2. Both cannot be current. State which commit src/engine/ actually carries, fix whichever document is stale.

FINDING — VERIFIED (I ran the commands below; outputs are quoted in full).

Scope: the latest Cakepanz state is the 67-cakepanz-s5 delivery. Its engine snapshot lives at _agents/vl/deliveries/67-cakepanz-s5/src/engine/ (52 TypeScript files), byte-identical to inkling's copy (diff -rq exit 0) and to the tree staged on council/vl.

Command (run in /Users/kosi/Desktop/wt/vl):
  D=_agents/vl/deliveries/67-cakepanz-s5/src/engine
  for f in $(cd $D && find . -type f | sort); do
    b=${f#./}
    s=$(git hash-object $D/$f)
    h4=$(git show 4ca9a071:colors/src/$b | git hash-object --stdin)
    hd=$(git show d3bd81d2:colors/src/$b | git hash-object --stdin)
    echo "$b snapshot=$s pin4=$h4 pind=$hd"
  done

Result: 52 files checked. 52/52 match 4ca9a071 exactly. Against d3bd81d2: 46 match; 6 differ:
  core/app.ts             snapshot 6f9edc39cfdf8b524fdb2cd88a4b50495aede980  d3bd81d2 0926b7ec7c1436739e5d79bc8bf8ff780f8435b3
  sports/nfl/app/dataset.ts snapshot 76fb80a25868b8f37028a679ad27bc7c3df04e72  d3bd81d2 b940f33b92d5be01943083fc4a45d1e3b8a20415
  sports/nfl/engine/draft.ts  snapshot 254a5b91fe2cfbf8b20891f220ee6bafb9782f29  d3bd81d2 4a8dbbbf946d06474e3b447b70b6d9cb6077ea10
  sports/nfl/engine/flex.ts   snapshot d8fb2e7d82cb2fec693586692630500ac62b7c47  d3bd81d2 c1ea3f5c1fb002e4f1727b4bf5a4241021d1ccc4
  sports/nfl/engine/slots.ts  snapshot cddbc4a6f8fbc7f26f3e71b6a501c58c869d0972  d3bd81d2 59b27a77dc438d9b4bbb6dcb2a92136c7b27b2dc
  sports/nfl/engine/value.ts  snapshot 057eafe5e30dc7e120289d482b3a237c345c5349  d3bd81d2 bd35b88a3b4bbfb9c508fcfc24f69d608be87a75
and 5 files exist at d3bd81d2 but not at 4ca9a071: core/events.ts, core/fold.ts, core/keyedrng.ts, core/pack.ts, sports/nfl/engine/legacyprovider.ts. No files removed.

CONCLUSION:
- src/engine/ actually carries commit 4ca9a071 — byte-identical, 52/52 files (VERIFIED).
- README.md ("Pinned engine commit: 4ca9a071") is CORRECT — not stale.
- AGENTS.md is right that the project's current engine pin is d3bd81d2 (R-2, 2026-11-15, 99-rule flex), but STALE as to Cakepanz: its claim "Cakepanz now consumes it too — re-pinned 2026-11-15 by MUSE for Z.ai" does not hold. The delivered shell consumes 4ca9a071; only the gh-pages deployment consumes d3bd81d2 (verified there too: all six flex files match d3bd81d2 hashes above; gh-pages deploys slices 1-2 only, CHECKSUMS-slice1/slice2.txt).
- Consequence: the shell is 6 modified + 5 added engine files behind the current pin. Before it is mergeable, Z.ai must re-vendor colors/src at d3bd81d2 (byte-identical, no edits — engine rule: never patch the snapshot), update the README pin and the ENGINE_PIN stamp ('67-cakepanz@4ca9a071', App.svelte:37). That is Z.ai's build work; this seat reports only.

ADDITIONAL FLAG — VERIFIED: the s5 README reports a "snapshot bug", a corrupted line `fit(p.role, DESTain.slot]).penalty === 0` in colors/src/sports/nfl/view/draftBoard.ts at 4ca9a071, worked around by a stand-in boardVM.ts. Measurement: at 4ca9a071 that file is clean (DEST[c.slot] at draftBoard.ts:14/41/45/49; hash fbf59939d15734745867738f11abc10c25ef118c matches the snapshot) and no stand-in boardVM.ts exists in src/lib/ (App.svelte:91 says "no stand-in"). The corruption claim does not hold at the pinned claim — it predates the pin or is stale. Nothing to fix in the shell; the README claim should be corrected or withdrawn.

Corroborating receipt: I re-ran the engine test suite vendored in the snapshot (`node --test --experimental-strip-types test/engine.test.ts` from the s5 delivery): tests 284, pass 284, fail 0 — VERIFIED by me, not just receipted.

Labels: all measurements above VERIFIED. The AGENTS.md "Cakepanz consumes d3bd81d2" claim: STALE (INFERRED from the byte comparison + gh-pages listing, both VERIFIED).
