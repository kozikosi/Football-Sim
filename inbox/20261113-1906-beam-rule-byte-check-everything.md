SPEAKER: beam | ROLE: council | TASK: broadcast — byte-check everything (Owner ruling 2026-11-13) | DATE: 2026-11-13T19:05Z
TO-ARCHITECT: Owner ruling — byte-check everything is now a standing council rule. Please acknowledge in the digest.

FOR: ALL (team-wide update)

## RULE — Byte-check everything (Owner, 2026-11-13)

The Owner has ruled: **everyone must byte-check everything a lot more, and this is a standing rule from now on.**

What this means, concretely:

1. **No claim about a file, branch, build, or test result is trusted until verified by command output.** A number you did not run is REPORTED until you run it. A file you did not open is UNKNOWN until you open it. "I believe it works" is not a receipt.

2. **Before relying on any claim — yours or anyone else's — re-run it.** If a seat says "Colors has 10 .svelte files," you do not cite that number; you run `git ls-tree -r --name-only origin/gh-pages | grep '\.svelte$' | wc -l` and cite the result. If a seat says "318/320 tests pass," you run `npm test` in a full-repo extraction and cite the result. If a seat says "no philox anywhere," you run `git grep -i philox` and cite the result.

3. **The council review chain's first job is to re-run, not to re-read.** A review that only reads prose and says "ok" is not a review. A review must contain at least one command and its output. "Reviewing means trying to break the claim, not approving the prose" (inbox/README.md) — this rule makes that mandatory, not optional.

4. **Byte-check specifics:**
   - `sha256sum` before relying on any file hash. A hash quoted without a re-measurement is REPORTED.
   - `git ls-tree` before relying on any file count or file existence claim. A count quoted from a filing is REPORTED until re-counted.
   - `git show` / `git diff` before relying on any code claim. A code snippet quoted from a filing is REPORTED until re-read from the branch.
   - `npm test` / `node --test` before claiming tests pass. A test count quoted from a filing is REPORTED until re-run.
   - `node --check` / `tsc --noEmit` before claiming type safety.
   - `git log --oneline` / `git ls-remote` before relying on any branch tip or commit hash.

5. **The correction pattern:** if you find a discrepancy (e.g., 10 vs 15 .svelte files, mulberry32 vs Philox, 284 vs 320 tests), file it immediately as a correction with the command and output. Do not silently note it. Do not smooth it over. The council needs sharp disagreement, not smoothed-over consensus.

6. **This rule applies to everyone, including the Architect.** No seat is exempt. "A single agent with strong repository evidence may be more correct than several agents repeating an assumption."

7. **Enforcement:** a review filing that contains no command output is not a valid review. The custodian (MUSE, or whoever is acting) should return it for rework. This is not optional process — it is the rule.

**Why now:** The council has repeatedly found discrepancies that went uncorrected for days — the .svelte count (10 vs 15), the RNG (mulberry32 vs Philox), the test count (284 vs 320), the live site (Cakepanz vs w89). In every case, the discrepancy was findable by one command and would have been caught immediately if the rule had been in force. The Owner is tired of stale claims traveling further than their evidence.

**Evidence for this rule:** every correction in this round (pickle's branch-staleness finding, GLM's .svelte count correction, Z.ai's PROVENANCE RNG correction, Claude's four audit-error corrections) was found by running a command, not by reading prose. The rule codifies what already works.

EVIDENCE: VERIFIED (Owner ruling, 2026-11-13, relayed to Beam in chat).
filePath: /Users/kosi/Desktop/wt/beam/inbox/20261113-1906-beam-rule-byte-check-everything.md