# inbox/20261121-0735-beam-muse-sweep-additions.md

SPEAKER: Beam | ROLE: council seat | TASK: record unique items from MUSE's 21 Nov sweep not already captured | DATE: 2026-11-21T07:35Z
TYPE: NOTE (advisory; MUSE's sweep is mostly restatement of locked rulings; these are the genuinely new/valuable catches)

## New items worth recording (not previously in my inbox notes)

1. **P-208 needs an 11th stat row.** Since the Owner ruled both 17-0 (undefeated regular season) and 20-0 (perfect season) are recorded (§1.13), P-208's locked ten stats must gain "Perfect season (20-0)" as an 11th. MUSE to action the queue row; cite the Owner's verbatim words. (I had noted the both-recorded ruling but not the queue-row consequence.)

2. **Constraint: do not remove the display-rounded-oracle caveat from top-three copy.** The top-three treatment must keep its "INTERIM — display-rounded, awaiting rawSort" label (and the L13 oracle pairing) until the Architect's `rawSort` engine half lands. Do not silently drop the caveat when porting the sheen/glow.

3. **Source-string laws are brittle — reconcile together.** `BoardRow.svelte:53` carries `<span tabindex="0">`, which trips Svelte's `a11y_no_noninteractive_tabindex`; the law at `node.battery.mjs:611` pins that exact source string, so a legitimate `<span>`→`<button>` fix would break the law. Laws that assert text rather than behaviour are fragile. Related: L23 asserts the pulse is top-three-only today, but the v8 direction ("every Draft button pulses, top three skip") inverts that — L23 must be retired by name or rewritten, and the floor stated explicitly (18 vs 19). The sheen already exists (`BoardRow.svelte:136`, `cp-suggest-shimmer`) — keep it, do not add a second.

4. **Two copies of the rival images — glyph's `_reference/rivals/` (with MANIFEST.tsv) is canonical; the duplicate in delivery folders should be deleted, not both kept.** My 21 Nov image store went to `notes/rival-pro-football-dynasty/` in the beam lane — I should reconcile with glyph's canonical location rather than leave a second copy. (I have not deleted anything; flagging for reconciliation.)

5. **iceman's C4 heading is mislabelled.** It reads "Multi-season stat tracking (MANDATORY TO RELEASE)" but his own Q14 and §1.11 say cross-run career stats. The mandatory item is cross-run career stats, not multi-season continuity. (Relevant to my earlier answer in `inbox/20261121-0458-beam-answer-stats-beyond-single-season.md`.)

6. **Claude's account-sync contract has not been written yet.** It is owed and blocks the account/sync schema work; nothing in my inbox notes assumed it existed. Flagging so nobody builds against a phantom contract.

7. **MUSE VERIFIED gap: the three 1 Nov storage notes are on HEAD and `architect/engine-and-seats` but ABSENT on `origin/council/muse`** (`git cat-file -e` check this sitting). Seats reading only `origin/council/muse` cannot see the locked storage rules. MUSE to reconcile.

8. **Playwright honesty line.** "Not verified in the Architect's sandbox; verified by seats at 1.57.0 / chromium-1255" — the Architect's 1.65.1 pin cannot run there. Any receipt citing Playwright should carry this caveat rather than "no browser run is verified."

## Items I deliberately did NOT add (already captured or antiquated)
- The mandatory-release list, fence, and no-domain ruling — already in my 0450/0455/0530 notes and the canonical reference.
- D1/D3/D5/H2/F4 defects — already in the canonical reference §8 and my 0530 note.
- "No weakening a law to make it pass" — standard council rule (AGENTS.md §5), not new.
- The S15 composite/gate-table/packaging close-out order — that is Z.ai's work order, not beam's.

— Beam · recorded the unique catches only. No code changed.
