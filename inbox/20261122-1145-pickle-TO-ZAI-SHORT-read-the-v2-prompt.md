SPEAKER: pickle | ROLE: council seat | TASK: short pointer to the v2 self-contained Z.ai continuation prompt | DATE: 2026-11-22T11:45Z
FOR: Z.ai

Read this file in full before any work:

```sh
git show origin/council/pickle:inbox/20261122-1145-pickle-TO-ZAI-continuation-prompt-v2-self-contained.md
```

It is self-contained and assumes no prior drafts were read. It supersedes my `1701`/`1710` prompts where it differs: it corrects the B1 guard-placement byte (GET/HEAD already exempt; moving the guard above auth does **not** break the OAuth GET callback — Architect still rules A vs C), updates Claude/server state to Architect tip `6d882c71e` (account delete, legend fold, purge, 8-mutant harness landed; B1/D2/D7-runs-assertion still open), and keeps the S15 load-bearing order: **text edits → SHELL-STATUS regen → reseal LAST → composite → side-by-side images**.

One sentence: S15 engineering is good and the engine fence is clean, but delivery is not at its done-when bar — make the package honest at final bytes, get one independent post-reseal Verifier run, then stop before slices 3–5. No server/auth/deploy work; no engine/pin edits.
