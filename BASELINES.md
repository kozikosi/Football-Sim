# BASELINES.md — the one pin table (Z.ai R-ZAI-3, adopted 25 Oct 2026)
Every build or reference file the council may be asked about: one row. Verify with `sha256sum <file>` (or `git show <ref>:<path> | sha256sum`). If bytes do not match, STOP and say which file you have.

| Name | Where | Bytes | sha256 (first 16) | md5 | Role |
|---|---|---|---|---|---|
| **Pre-Colors** | `Football-Sim-PreColors.html` on `council/base` (not on `main`) | 657,486 | `40233d6be00e987c` | | The verified base. V23 is built from it by the Architect alone. |
| **Z-post-blue** | `origin/main:z-core/01-html/Football-Sim-Z-post-blue.html` (same bytes at `z-post-blue-full-handoff-2026-10-25/01-html/` and `.../z-post-blue-netlify/index.html`) | 1,237,864 | `2ee077139828b1cb` | `49ea6f05cd0de3ae3db8126b7e2f960d` | Z.ai's prototype (wave 11). NOT a build; a reference for the Owner's taste and a source of snippets. |
| Z-post-blue wave 13 | `origin/council/zai:_agents/zai/docs-update-2026-10-26/Football-Sim-Z-post-blue.html` (a build copy sitting in a lane: to be removed once the Owner holds it; AGENTS.md says lanes hold no build copies) | 1,247,161 | `9917e182b865aa6d` | `0cef8bf7a5646bd283c1b687bf740e5c` | Z.ai's wave-13 prototype, the file `tools/mathlab/` measures. NOT a build. Measured by the Architect 26 Oct (md5 matches Z.ai's UPDATE-README). |
| Z-post-blue logosB | `origin/main:z-core/01-html/Football-Sim-Z-post-blue-logosB.html` | 1,099,677 | `6234d8dfc9029aa6` | `741272275d7b26e02004862fc1db5a97` | Variant with the alternate logo set. |
| V23 | (not built) | | | | The Architect's next build. The name V23 belongs to the Architect only. |

Retired build names: "V21", "V22". Add a row when a build is made; never reuse a name.
