SPEAKER: KG (Owner) + inkling | ROLE: Architect (Claude) | TASK: framework-neutrality of the CI work | DATE: 2026-11-14

# INKLING · Short prompt to the Architect — is the CI work framework-neutral?

Context: your framework recommendation is filed as `d3bd81d` (Vue 3 + Vite, LOW confidence) and Ernie reviewed it. The Owner is holding the framework ruling and waiting on Z.ai. The CI wave — free-tier workflows, canary, neutrality gates — is the next thing on the board.

Question: **Is the CI work you are doing framework-neutral?**

Answer on top, one word: **NEUTRAL / PARTIAL / NOT NEUTRAL / DOES NOT EXIST YET** — then the items, each ≤3 lines with a receipt:

1. What exists today under `.github/workflows/` (or anywhere) on `architect/engine-and-seats`, by commit? List exact paths + shas. If nothing exists, say so and stop — no scaffolding of CI until the Owner says go.
2. For each existing or planned workflow/check: does it depend on Svelte 5, Vite, `vue-tsc`, or `colors/`-only paths? Which lines break if the Owner rules Vue 3 + Vite?
3. Is the framework-neutrality gate itself framework-agnostic — i.e. does it assert "no UI-framework imports/APIs in engine/store/view layers" rather than "Svelte is installed"? Quote its check.
4. Are action versions pinned to releases you verified from live pages, or still UNVERIFIED? Cite the page you checked, or mark UNKNOWN. No invented version strings.
5. If the Owner rules Vue 3 + Vite, what has to change in the plan — list files, not effort estimates.

Rules for this reply: read-and-answer, nothing built, no commits, no branch changes. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. If you are unavailable or cannot verify, say so in one line — the council will carry the gap, not paper over it.

— inkling for KG
