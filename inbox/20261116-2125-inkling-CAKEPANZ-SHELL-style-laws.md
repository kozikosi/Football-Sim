SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 11 — style laws | DATE: 2026-11-16T21:25Z
FOR: R-13

# Cakepanz — the style laws, greped (Part 11)

**Unblocks:** Z.ai's screen-build round (every violation below is a string he can grep for today); the Owner's visual-law checklist for the shell. Method: literal/regex greps over the s5 delivery (slices 1–5) and the live gh-pages tree (slice 1–2 @ `d3bd81d2`), plus `index.html`/CSS inspection.

## Banned strings — clean

Searched (both trees, case-insensitive): `expected scoring` · `before kickoff` · `sudden death` · `2-Pt Conv` outside Guide · `.ub` presence · periods after DRAFT / SEASON / PLAYOFFS / SUPER BOWL.

- `expected scoring`, `before kickoff`: **zero hits** in shell surfaces. The engine's own `recap.test.ts`/`recap.ts` asserts the recaps never contain them (found in gh-pages: `test/engine/nfl/recap.test.ts`), which covers every string the engine prints in feeds/recaps. VERIFIED (grep) for the shell; the engine's law is the Architect's receipt, REPORTED via the test file.
- `sudden death`: only in engine code comments (`drives.ts`), never in UI strings (none found). VERIFIED.
- `injur`: **zero hits** anywhere in the shell. VERIFIED.
- Periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL headings: **none found**. VERIFIED.
- "2-Pt Conv": **never appears at all** — not as a chip, not in copy (the conversion events are the engine's to emit; whether the shell must render "2-Pt Conv" when one occurs is a spec question, not a law the shell currently breaks). UNKNOWN whether any drive triggers a 2-pt try in the fixture data — the string is absent, not violated. INFERRED.

## Violations / deviations found (as the laws are written)

1. **The user's team is NOT carried by `.ub` and is NOT blue.** The live tree and the s5 delivery highlight the user's drives via `.cp-me` (gold border + glow) on the feed (`Feed.svelte:108`, delivery; gh-pages identical) and via the me-glow elsewhere — no `.ub` selector exists anywhere in the shell (`grep -rn "\.ub\b"` → empty in both trees). AGENTS.md §3 fixes "user's team in blue (`.ub`)" and the v4 ground truth says "the user's team carries the .ub class". **The shell does not comply with the law as written.** This may be a deliberate Cakepanz brand divergence (gold-on-ink), but the v4 visual law does not grant one. FLAG — not mine to fix, not mine to accept. Owner's/builder's call.
2. **Cinzel is absent.** No `font-family: Cinzel`, no base64-inlined font, anywhere in either tree — the shell renders Georgia/'Times New Roman'/serif and `ui-monospace` for mono (delivery `App.svelte:244`, `Feed.svelte:87`, `Share.svelte:*`). No Google-Fonts / gstatic references either (offline-safe by accident, but NOT the w89 law). The v4 visual law (pale-rose `--bg:#fdf2f6` light, Cinzel inlined ~54 KB, `[data-zpbteam]`) is **not implemented in slices 1–5** — they implement the builder's earlier dark-gold look (`#181114` ink, `#e8c87e`/`#d9a94c` golds, `Georgia` display). This is the single largest visual-law gap between the shipped shell and the v4 ground truth. FLAG for the Owner/builder: either the skin is re-cut to the w89 law or the Owner amends the ruling — INFERRED (no in-tree statement saying which; the delivery README calls the dark-gold "the shell's brand", which predates the v4 ruling).
3. **Valuation label travels (law met):** `App.svelte:213` / `TeamSelect.svelte:23` both print "Every number … reads {MODE_LABEL[mode]}". VERIFIED (both trees).
4. **`.cp-prov` provenance line** is the pattern for the label law; new surfaces must copy it (Part 7/Part 9 reference).

## How to verify

```
grep -rni -- "expected scoring\|before kickoff\|sudden death\|injur" <shell>/src <shell>/index.html
grep -rn "\.ub\b" <shell>            # expect nothing
grep -rni "cinzel" <shell>           # expect nothing
```

## Not done / UNKNOWN

- The Guide (slice 11) does not exist yet, so "2-Pt Conv except in the Guide" and the Guide-prose review are vacuous today; must be re-checked when it ships (slice 11).
- No w89-dark/w89-light palette is present to diff against w89; the contrast numbers live in `_agents/inkling/deliveries/zai-fresh-start-rev10-2026-11-16/CONTRAST-TABLE.md` (see my contrast verification in Part 13 filing, if landed).
- I did not render the shell to screenshot the pieces; findings are string- and code-level only.
