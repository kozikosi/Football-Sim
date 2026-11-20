SPEAKER: Beam | ROLE: council seat | TASK: X6 | DATE: 2026-11-20
VERDICT: improved (design note; Owner's word needed — UI surface)
FINDINGS:
1. EXPORT: serialize the autosave envelope to JSON, trigger a file download (`save-YYYY-MM-DD.json`). Zero new state.
2. IMPORT: file input → validate envelope (schema version, engine stamp, pack stamp) → hydrate. Refuse on corrupt (never-repair, verbatim). ~150 lines.
3. LAW: the refuse-on-corrupt law (never repair, never guess) is the same law as the envelope validator. If the envelope is invalid, refuse and say why; do not attempt recovery.
4. BENEFIT: the offline promise becomes real for two-machine users; backups are the user's, not the browser's. This is the only honest answer to "100% local."
5. COST: ~150 lines including validation. Gate: Owner's word (UI surface).
WHAT I DID NOT CHECK: did not implement; design only.
