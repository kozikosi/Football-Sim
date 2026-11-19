SPEAKER: pickle | TASK: P-345 | DATE: 2026-11-18 14:00 UTC
FOR: P-345
KIND: IDEA (advisory — Pickle does not build; Architect/Z.ai own implementation)

# Cakepanz after 8.1: make the shell's honesty *generated*, not written

## Why this round, in one paragraph

Z.ai's 8.1 package closes the five user-facing findings from my c8 review (dead simple-row
detail, stale board on the completing pick, `fullBoard` lost on reload, hash-door drift, sort
vs displayed number). I re-ran the mechanical legs: pins 67/68 files byte-identical, flex
99 rules sha `76c02c65…6a6a`, engine 394/406, node 33/33 ×2, gates 314/319 with numerals
CLEAN ×2, dist `4ce69205…507057a` in both trees (all VERIFIED in my review filing). But the
package *still* contradicts itself: `README-DELIVERY.md`'s opening verdict says the acceptance
script "completes end-to-end" while its own L10 bullet says it could not finish. That is not a
typo; it is a class of failure — hand-written status drifting from machine-produced receipts —
and it is the highest-value thing to fix next. The five UI fixes were all defects of the same
class too: two sources of truth (store vs UI, sort vs caption, screen vs hash, envelope vs
setting) that were allowed to disagree.

**Direction:** one generated status surface, one view model, one transition machine, one
persistence path. Not new engine rules; shell-level structure around Claude's frozen engine.

## Ideas, ranked

### 1. Receipt-generated build status (do this first)
`npm run shell:status` reads the *receipt files themselves* (`receipts/partH-c8-1/*.log`,
CHECKSUMS/MANIFEST, VERIFY §22) and emits one Markdown table: claim → receipt path → sha of the
receipt → PASS/FAIL/ABSENT. README-DELIVERY, VERIFY §22.2 and the package status line are
generated from that table, never hand-edited. An absent or stale receipt renders **UNVERIFIED**,
never "done". Falsifier: delete one receipt → its row goes UNVERIFIED and the command exits 1.
Why it matters: it mechanically prevents this round's contradiction and the c8 numerals-gate
falsehood (a doc claiming CLEAN while the tool said FAIL). Blast radius: docs + a new script;
no engine, no UI. Acceptance: generated status matches every quoted sha/count in this package,
and one planted stale quote is caught.

### 2. One board view model — the number and its caption cannot disagree
The B3 fix added a caption, but the shell still derives the displayed number in the row and the
caption in the header. Introduce `deriveBoardVM(engineState, sortKey) -> {rank, value,
caption, chips}` as the *only* function that feeds a row. The header reads `vm.caption`; the
row reads `vm.value`. Property law over all four sort keys: for every row, the displayed value
equals the engine's own ordering for that key and the caption names the active key. Falsifier:
swap two sort keys in the VM → the law dies naming the row. This turns my c8 finding into a
structural invariant rather than a patched sight line.

### 3. Transitions as a typed state machine, with the matrix generated from it
VERIFY §22.3 lists eleven screen-flipping transitions and names row 6 (direct `loadDraft`) as
still manual. Define transitions as `{from, event, guard, to}` in one module; have `go()` accept
only declared events, and generate the §22.3 matrix from that table at build time. The
completing-pick handoff (B2) then lives in one guard instead of a refresh() patch. Acceptance:
a new transition with no guard fails a build-time law; a removed guard kills the matrix row.
This is the durable version of the hash-door fix (4.4).

### 4. One persistence path for shell prefs, with a boot-time restore audit
8.1's `fullBoard` sidecar works, but L9 only became honest after Z.ai found that the test's
store-dispatch pick skipped autosave. Generalize: every user gesture that changes a UI preference
goes through one `persistUiPrefs()`; keys are versioned and shell-owned (the save envelope stays
frozen). At boot, a debug drawer shows what will be restored (settings + screen + pick count).
Law: after each user gesture, the persisted bytes contain the new value; falsify by deleting one
write. This kills the whole "works until reload" family, not just `fullBoard`.

### 5. An engine-seam badge and a one-command shell health check
The package proves its pin in 1000-file manifests; the running app says nothing about which
engine it holds. Generate `engine-manifest.json` (pin sha, flex sha, rule census, dist sha) and
show a small "About this engine" drawer in the UI. A boot check warns (non-blocking) if runtime
constants disagree with the manifest. Pair it with `npm run shell:health` = pin check + flex
census + numerals gate + transition-matrix check + a11y check, one page. This is the shell-side
cousin of my corrected merge-gate spec: "mergeable/shipable" becomes countable by any seat.

### 6. Keyboard/reduced-motion battery as a first-class gate
8.1 gave the simple row `aria-controls`/`data-testid`. Extend to every expander, sort header and
transition: keyboard path and accessible name, with `prefers-reduced-motion` honored. Battery
tabs/Enter/Arrow/Escape through a full draft; falsify by removing one aria link. The Owner's
30–60 s game animation makes a skip/resume path a usability requirement, not polish.

### 7. Seed + gesture replay for visual before/after
Runs are unseeded today, so only structural evidence counts (AGENTS.md §3). The shell can own a
`?seed=` and a gesture log *without* editing the engine: replay a draft to the same screen and
diff screenshots. Unlocks real regression testing of 2–6 and makes "same input, same screen"
checkable by any reviewer.

## Implications for cutover (flag, do not decide)

- These are shell-only. The engine pin (5c808472 / 65673a00), the frozen 99-rule flex table,
  `teamRatings` and the envelope stay untouched; Z.ai's one additive `settings.ts` port exception
  is the precedent for how shell state may extend, not a licence to touch engine files.
- c8.1 is **not** a cutover candidate while L10 is open: the fresh-clone composite is green
  (REPORTED, Z.ai's m1 log), but the per-tree acceptance-run is unfinished at the delivered
  bytes. Idea 1 would make that state visible in the app/docs instead of prose.
- `START-OF-CHAT-ZAI.md` was rewritten ×3 at `8ef3b18d…` (unverified by me); MUSE must re-file
  it on `council/muse` or the seats' start-of-chat instructions drift from the package.
- gh-pages placement and Block C remain Owner/MUSE gates; nothing here opens them.

## Questions for the Owner / Architect (Pickle does not decide)

1. Should the generated status table (idea 1) become a required input to the acceptance gate,
   so a hand-edited "done" line can never pass?
2. Is `npm run shell:health` (idea 5) council tooling (MUSE/Architect) or shipped with the app?
3. Should the keyboard/reduced-motion battery (idea 6) be a cutover gate for 76 Pancakes?

EVIDENCE: mechanical legs VERIFIED by me (commands + outputs in the c8.1 review filing);
user-facing fix details REPORTED from Z.ai's package and the two parallel audit legs; all ideas
INFERRED proposals, not accepted work.
