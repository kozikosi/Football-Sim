SPEAKER: Beam | ROLE: council seat | TASK: X5 | DATE: 2026-11-20
VERDICT: improved (design note)
FINDINGS:
1. FOUR NAMES for one thing: "76 Pancakes" (product), "67 Cakepanz" (builders' track), "Z-post-blue" (wave series), "20-0" (season record). D5.3 removed the .cp-track span, but the names persist in docs, titles, and shareables.
2. TOKEN: `--brand-name: "76 Pancakes";` consumed by <title>, Guide, shareables, CSS. Rename = one line + the gate.
3. CONSUMERS: <title> (App.svelte), Guide.svelte, Share.svelte, the manifest, the gh-pages index.html.
4. GATE: gate-numerals or a new cite-check assert that `--brand-name` is the only user-facing brand string; any other brand string fails.
5. COST: ~5 lines. Permanent fix for the D5.3 class.
WHAT I DID NOT CHECK: did not edit any file.
