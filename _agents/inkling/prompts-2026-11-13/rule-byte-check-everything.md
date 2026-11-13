# STANDING RULE — CHECK YOUR BYTES (2026-11-13, Owner broadcast)

**From:** INKLING, at the Owner's broadcast direction 2026-11-13. **Scope:** every council seat, every session from today, until retired by the Owner. **Name:** the byte-check rule.

"everyone should byte check everything a lot more" — the Owner, 2026-11-13. This file is the law, one page. Read it before any other filing.

**The law.**

1. **Every VERIFIED carries four lines**: the working directory · the exact command · the ref/commit/tag the bytes came from (never "at tip" — always the sha) · the output neighborhood (exit code, counts, hashes — quoted, trimmed). A claim without those four lines is REPORTED. This applies to your own work and every claim about anyone else's.

2. **Git beats the filesystem.** Prefer `git archive <ref> -- <path> | tar -x` over `cd`-ing into a checkout, and `git show <ref>:<path>` for one-liners. In your filing, state which you used. Working trees move; archived bytes don't.

3. **Two-seat confirmation.** One seat re-running is a datapoint, not confirmation. "The suite passes" requires two seats, each with their four lines, from distinct machines or distinct checkouts of the same ref. When three seats align, that's convergence; when two disagree, the filing says so — neither wins by seniority.

4. **No speculation past a blocker.** If a step needs data, a ruling, or another seat's delivery, you stop and declare it: precisely what is missing, precisely what unblocks it (target: 15 minutes, named), and the rest of the wave proceeds. Invented output is worse than absent output.

5. **REPORTED is not a failure.** Everything unrereveriable is labelled REPORTED honestly, from which nobody escalates hostility, blame, or authority. The labels exist so the Owner can weigh confidence, not so factions can.

6. **Checksums gate trust.** Any delivery whose CHECKSUMS fail — or whose CHECKSUMS exist but whose bytes were never re-downloaded or re-diffed by the verifier — is REPORTED, full stop. Nothing downstream (review, ruling, verdict) relieves this.

7. **Archive the ref, not the friend.** Citing a colleague's sentence ("he said the suite passes on his machine") is not evidence. Re-run it; cite yours; their sentence is supporting context.

**How this rule gets enforced.** INKLING (acting organizing hand until MUSE returns) reads the four lines; disagreement on any VERIFIED escalates to the Owner with both reports, unmerged. The rule is one page on purpose: it is the floor, not the ceiling. No one wrote it to slow you down; it exists because this project has shipped the same CRLF/LF confusion three times and the same 318/320-vs-320/318 two-current-truths wave once — both failures would have been impossible under it.

**In effect today.** If you already sent output without the four lines — fix it in your next push. No grandfathering; no ceremonies; better-byte-checks everywhere from this minute.

— INKLING · council/inkling · 2026-11-13 · adopting/approving seats: the Owner, via broadcast
