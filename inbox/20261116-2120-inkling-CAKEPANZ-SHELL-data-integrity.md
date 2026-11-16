SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 9 — data integrity | DATE: 2026-11-16T21:20Z
FOR: R-13

# Cakepanz — can any number on screen be produced without the engine? (Part 9)

**Unblocks:** Z.ai's "what you may not touch or claim" list before he writes new screens; Claude's merge audit (every on-screen number must trace to the snapshot). Scope measured on the s5 delivery (slices 1–5, pin 4ca9a071) and on the live gh-pages tree (slice 1–2 + re-pin, `d3bd81d2`). Commands and exit codes inline.

## Clean bill (with the greps used)

1. **No shell-side flex table / slot-value table.** `grep -rn -E "\[(\s*-?[0-9]+(\.[0-9]+)?\s*,){6,}" <shell>/src` → **no output** in either tree (delivery 9 non-engine `.ts` modules, 750 lines; gh-pages 2 non-engine `.ts` + main.ts). VERIFIED (both trees).
2. **No direct `modelWeights`/`slotWinsPerOvr` call sites outside the snapshot** — weights computation is not re-implemented in the shell; `valuation.ts` carries only the three mode NAMES (`measured|balance|owner`) and labels. VERIFIED (`grep -rn -E "slotWinsPerOvr|modelWeights"` outside `src/engine` → empty).
3. **Valuation-mode label travels with the numbers.** `App.svelte:213`, `TeamSelect.svelte:23`, `ModeSwitch.svelte` (delivery + gh-pages): "Every number on this board reads **{MODE_LABEL[mode]}** — the label travels with the numbers." VERIFIED (both trees). Mode switch is disabled mid-draft (`valuation.set()` no-ops when locked). VERIFIED by reading `src/lib/valuation.ts:18-22`.
4. **No ratings generated or "corrected" in the shell.** `data/nfl/madden27-ratings.csv` (1,941 rows) + `free-agents-old-ratings.csv` (12) + `player-ids.csv` are byte-identical between the s5 delivery and gh-pages (`git ls-tree` blob IDs `44f13989…`/`18d254ad…`/`2a323dcd…` identical in both). These are the Owner's dataset files, not shell output — shell has no CSV writer beyond saves/PNG export. VERIFIED (blob comparison).
5. **No injuries anywhere** in shell surfaces: `grep -rni injur` over src/notes/deliveries → empty. VERIFIED.
6. **`yards: null` honoured** — feed renders plays/time/clock only, no yard figures (delivery README + the `yards` grep in battery laws; the battery asserts "no yard figure appears anywhere"). REPORTED (delivery README; the yard-grep itself was not re-run by me — see undone below).

## Hits / flags (not defects — provenance and ownership calls, Owner/Architect to rule)

7. **`madden27-ratings.csv` provenance is not established in-repo.** The file is consumed as the ratings source; its header matches the known 1,941-player set (Ja'Marr Chase 99/96/…, matches the AGENTS.md/PK inventory), but no in-repo receipt names its origin. Per AGENTS.md data-integrity, "Official Madden 27" must not be asserted until a source is identified; the file should be described as "the Owner's dataset file, provenance UNKNOWN in-repo" until the Owner says otherwise. This is a naming/provenance risk, not a fabrication by the shell. FLAG for Owner.
8. **`madden27` vs `free-agents-old-ratings.csv` naming** mixes vintages in one `data/` dir ("old"); nothing in-tree states which is authoritative for the 12 free agents vs the 1,941. The v1 union says the pool is 1,953 (1,941 + 12 FA). FLAG: provenance/archival note for the Owner — do not "tidy" the directory without a ruling.
9. **The s5 delivery's numbers are pinned to 4ca9a071** (see my Part 10 filing, `inbox/20261116-2105-inkling-CAKEPANZ-SHELL-pin.md`). Any "REPORTED at the pin" number from that delivery measures the OLD engine (REV 4 flex, QB→FS −10). Live numbers must come from the gh-pages tree at `d3bd81d2`. Label accordingly.

## Verdict

No number on screen is produced without the engine at the pin, and no engine math is re-implemented in the shell, with one caveat: the claim is VERIFIED for what exists (slices 1–5 + live slice 2); it is NOT yet true that "every number travels its label" screen-by-screen — only board + Team Select carry the provenance line today. The new surfaces (season hub, week views, etc.) must each carry the same provenance line from day one or they fail this part by construction. FLAG to Z.ai.

## How to verify

```
grep -rn -E "\[(\s*-?[0-9]+(\.[0-9]+)?\s*,){6,}" <shell>/src   # expect nothing
grep -rn -E "slotWinsPerOvr|modelWeights" <shell>/src | grep -v engine/   # expect nothing
git ls-tree origin/gh-pages 67-cakepanz/data   # blob ids vs delivery copies
```

## Not done in this filing

- Re-running the battery's yard-grep law independently (REPORTED only).
- Provenance ruling on madden27 (Owner's to give; I only flag).
- Screen-by-screen provenance-line audit on the new surfaces — none exist yet; becomes due when they ship.
