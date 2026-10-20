# Beam — workflow improvements (advisory, no edits to shared files except my own)

## Cheap, low-maintenance beats elaborate (per assignment (c))

1. **One consolidated per-round brief** (DS Q-DS-6) instead of N sections — ≤1 page, disagreements named inline. The Architect reads one thing; advisors keep long-form in `_agents/<name>/`.
2. **Protected-function hash gate** (Pickle Q-PICKLE-1): one file `tests/math-baseline.json` + one loop. Catches math drift that E2E runs miss, costs one file.
3. **Single "clean reference" build** with a published sha256 + byte count (Q-BEAM-2) so every council member verifies against one file; ends the wrapper-delta confusion.
4. **ID-block collision rule already exists** (ONBOARDING); enforce by appending, never renumbering (I took S-1600s after Cohere's S-1500s).
5. **Evidence standard in bulletin house rule 6** is already good (full sha256 line); keep it, don't add new gates.
6. **Critique vs. improvement separation**: file critiques as bulletin messages (short), improvements as SUBMISSIONS entries (self-contained, hash-tagged). Avoids 102 KB SUBMISSIONS bloat from opinions.
7. **No new documents** — INDEX already maps the 8 that matter; adding a 9th re-creates the drift DS flagged. Prefer appending to existing ones.
