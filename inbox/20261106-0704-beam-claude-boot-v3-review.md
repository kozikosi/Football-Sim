SPEAKER: Beam | ROLE: Verifier (council seat) | TASK: Review Claude's boot-v3 (commit eb12e106) | DATE: 2026-11-06T07:04Z

REVIEW-OF: eb12e106 (boot-v3: bootstrap refspec + NOW freshness check; repo-authoritative boot rules; AGENTS.md split), parent c577fb2, 10 files changed, 2026-11-06 06:13 UTC.

VERDICT: ok

Scope checked (per MUSE briefing §1): bootstrap.sh refspec widening + depth + NOW-CHECK; 00-READ-FIRST.md authoritative vs Project stub; AGENTS.md 159→74 lines with §2/4/5/8/9/10 moved to claude/ref/agents-*.md and one-file-HTML passages corrected; NOW.md NEXT; vite correction.

Receipts:

1. Single-branch clone problem — FIXED (VERIFIED by reading the script).
   Command: `git show eb12e106:claude/bootstrap.sh`
   Finding: after clone/fetch, the script runs
     `for r in 'council/*' 'gh-pages'; do git config --get-all remote.origin.fetch | grep -qF "refs/heads/$r:" || git remote set-branches --add origin "$r"; done`
   This adds `+refs/heads/council/*:refs/remotes/origin/council/*` and `+refs/heads/gh-pages:refs/remotes/origin/gh-pages` to remote.origin.fetch on first boot, so a later `git fetch -q --depth=1 origin council/<seat>` (or gh-pages) resolves by name without a manual refspec. The clone itself stays --single-branch (correct: it only needs architect/engine-and-seats to boot); widening is a one-time post-clone step. Caveat: on a fresh clone the widening runs after the clone, so the first fetch of another branch happens on the next boot or an explicit fetch — acceptable, and matches the documented `git fetch -q --depth=1 origin council/<seat>` usage. DEPTH=50 (was shallow default) is set and used in both clone and fetch.

2. NOW-CHECK flags a stale NOW.md instead of silently following it — YES (VERIFIED).
   Command: `git show eb12e106:claude/bootstrap.sh` (NOW-CHECK block)
   Finding: NC = last commit touching claude/NOW.md; if NC is inside the shallow boundary, N = `git rev-list --count "$NC..HEAD"`; N=0 → "NOW-CHECK: fresh"; N>0 → "NOW-CHECK: STALE? $N commit(s) landed after NOW.md was last written" plus the commit list (head -12). If NC is at/beyond the shallow boundary, the `grep -q "^$NC" .../shallow` branch prints "NOW-CHECK: STALE? NOW.md was not changed in the last $DEPTH commits; verify NEXT with git log before acting". 00-READ-FIRST.md reinforces: "NOW-CHECK line: if it says STALE?, read the listed commits and correct NOW.md's NEXT before acting." So a stale NEXT is flagged, not silently followed. Also prints a length warning when NOW.md exceeds 15 lines.

3. claude/00-READ-FIRST.md is the AUTHORITATIVE copy; Project doc is a boot stub — repo side VERIFIED; stub not verifiable from this worktree.
   Command: `git show eb12e106:claude/00-READ-FIRST.md`
   Finding: header reads "# 76 Pancakes — Architect rules (boot-v3; AUTHORITATIVE copy, printed by claude/bootstrap.sh; keep under 40 lines)" and body states "The Project doc of the same name is only a boot stub (add_repo + one Bash command). ... If the stub does not say `boot-v3`, tell the Owner the stub is stale." CLAUDE.md (commit) echoes: "Chat start: the Project doc is a boot stub; run it...". The chat-side Project document itself cannot be read from this worktree (it lives in the Claude Project, not the repo), so the "does the stub say boot-v3?" check is left to the Owner — this review cannot mark it VERIFIED. Owner action: open the Project doc and confirm it says "boot-v3"; if not, the stub is stale and must be updated to the boot-v3 wording. I did NOT edit it (not authorized; Architect/Owner only).

4. AGENTS.md short core + ref split + corrected one-file-HTML passages — VERIFIED.
   Command: `git show eb12e106:AGENTS.md | wc -l` → 74 (was 159). Ref files present: claude/ref/agents-2-build-truth.md, agents-4-worktrees.md, agents-5-queue.md, agents-8-documents.md, agents-9-verification.md (all exist in the commit). One-file-HTML passage: `grep` on the new AGENTS.md shows "The product ships as **separate static assets on Cloudflare Pages** (Owner 4 Nov 2026 reversed the one-file rule)..." — the old "one self-contained HTML file" wording is gone from the core. Ref files carry the corresponding corrections (e.g. agents-2: "The product is the `colors/` app, not a single HTML file; the `Football-Sim-*.html` rows below are frozen references and history"; agents-8: "colors/ (product source), Football-Sim-*.html (frozen references)"). Section numbers retained (core keeps §1/§3/§6/§7/§11; moved sections referenced as `claude/ref/agents-*.md`).

5. NOW.md NEXT — VERIFIED correct and current.
   Command: `git show eb12e106:claude/NOW.md`
   Finding: NEXT (exact) reads "the F1 ruling, then land the contract fixes from gh-pages w74/04-contracts-fixes/colors/ (list gh-pages for the latest wave; never hardcode), then guard passes (drives, schedule, seasonrun = 96 of 305) with a pinned tsc baseline." Matches MUSE's description ("F1 ruling + contract fixes + guard passes"). Also records the vite correction: "vite IS already a devDep (^8.3.6); only typescript is missing."

6. vite correction — VERIFIED.
   Command: `git show eb12e106:colors/package.json` → devDependencies: "@sveltejs/vite-plugin-svelte": "^7.3.1", "vite": "^8.3.6". No "typescript" entry. tsconfig.json exists (added b27571ae). So "add typescript and vite" is half-wrong: vite is already a devDep; only typescript is missing. MUSE's correction stands. Note: NOW.md itself contains a stale phrase in an earlier line ("typescript/vite are not devDeps yet") that contradicts the later boot-v3 DONE note ("vite IS already a devDep"). Recommend the Architect reconcile that sentence in the next NOW.md rewrite (non-blocking).

7. Items NOT done in this commit (confirmed not claimed as done): F1 ruling, contract fixes, devDependencies — none present in the diff (only bootstrap.sh, 00-READ-FIRST.md, AGENTS.md, CLAUDE.md, NOW.md, and 5 ref files). VERIFIED via `git show eb12e106 --stat` (10 files, all docs/rules).

Non-blocking follow-ups:
- NOW.md internal inconsistency on vite devDep status (point 6) — fix next rewrite.
- Project-doc (chat-side) boot-stub "boot-v3" wording — Owner to confirm (point 3).
- bootstrap.sh NOW-CHECK shallow-clone fallback message could name the command to run (`git log --oneline -20 -- claude/NOW.md`); cosmetic.

Conclusion: boot-v3 achieves its stated goals; bootstrap.sh does fix the single-branch fetch-by-name problem after boot and prints a real NOW-CHECK verdict; the rules are now repo-authoritative; AGENTS.md is a short core with corrected passages; NOW.md NEXT is correct and current. No rejected findings. VERDICT: ok.
