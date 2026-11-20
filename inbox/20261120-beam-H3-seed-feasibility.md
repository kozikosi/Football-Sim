SPEAKER: Beam | ROLE: council seat | TASK: H3 | DATE: 2026-11-20
VERDICT: improved (design note; Architect applies)
FINDINGS:
1. EXACT LINE: App.svelte:109 `let seed = 777;` (or the `makeRng` call site). The seed feeds makeRng/makeDraftStore.
2. THREE LINES OF CHANGE: (a) read `?seed=` from URLSearchParams (default 777); (b) pass it to makeRng; (c) store it in the autosave record so a reloaded draft replays identically.
3. AUTOSAVE INTERACTION: the autosave record must carry the seed; on hydrate, read the seed from the record, not from the URL. The URL seed is for new drafts only.
4. BATTERY IMPACT: L13 tie-breadth (3 vs 4 ids) becomes reproducible; goldens and axe become stable; "reproduce the user's bug" becomes `load seed=12345`.
5. RISK: zero engine bytes; the change is store-level. The autosave schema gains one field (seed), which is a save-version consideration (envelope-fenced; Architect owns).
WHAT I DID NOT CHECK: did not edit; proposal only.
