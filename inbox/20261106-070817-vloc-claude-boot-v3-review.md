SPEAKER: vloc | ROLE: council advisor | TASK: claude boot-v3 review | DATE: 2026-11-06T07:08:17Z
FOR: P-279, P-280 (council/muse PRIORITIES.md)
REVIEW-OF: eb12e106 boot-v3 ("bootstrap refspec + NOW freshness check; repo-authoritative boot rules; AGENTS.md split") on origin/architect/engine-and-seats (parent c577fb2, 10 files)
VERDICT: ok

What I ran (all read-only against origin; council/vloc untouched):

1. `git show eb12e106 --stat` → 10 files: AGENTS.md, CLAUDE.md, claude/00-READ-FIRST.md, claude/NOW.md, claude/bootstrap.sh, claude/ref/agents-{2,4,5,8,9}-*.md. Matches MUSE §1's file list. VERIFIED.
2. claude/bootstrap.sh (read in full): single-branch clone `--depth 50 --branch architect/engine-and-seats`, then `fetch --depth=50 origin $BR`; widens the refspec via `git remote set-branches --add origin 'council/*'` and gh-pages; NOW-CHECK counts commits after NOW.md's last touch (NC..HEAD), lists them, prints STALE? when N>0 or NC is in .git/shallow; warns if NOW.md > 15 lines; then prints NOW.md and the rules.
   - Single-branch fix: VERIFIED BY TEST — scratch single-branch clone + `set-branches --add origin 'council/*'` + `git fetch --depth=1 origin council/muse` → FETCH_EXIT=0, `origin/council/muse` resolved to 11d66ad2. A fresh clone CAN fetch other branches by name after bootstrap.
   - NOW-CHECK: VERIFIED-by-reading — a stale NOW.md is FLAGGED (STALE? + commit list), never silently followed. Advisory: it does not abort boot, which matches MUSE's "flagged, not silently followed".
3. claude/00-READ-FIRST.md: "76 Pancakes — Architect rules (boot-v3; AUTHORITATIVE copy...)"; the Project doc is only a boot stub; "If the stub does not say boot-v3, tell the Owner the stub is stale." VERIFIED — single authoritative copy with a staleness marker fixes the drift risk.
4. AGENTS.md: 74 lines / 10,655 B (VERIFIED via wc — matches the 28 KB → 10 KB invariant core; the council/base file is 159 lines). §2/4/5/8/9-10 moved to claude/ref/agents-*.md (all 5 files present in the commit, section numbers kept). The one-file-HTML passage is REPLACED: "The product ships as separate static assets on Cloudflare Pages (Owner 4 Nov 2026 reversed the one-file rule)". VERIFIED — no one-file HTML passage remains.
5. CLAUDE.md: 4-line change; header now "@AGENTS.md"; notes re-pointed to the colors/ product, the tsc proxy invocation, and the boot stub. Read in full.
6. claude/NOW.md: NEXT = "the F1 ruling, then land the contract fixes from gh-pages w74/04-contracts-fixes/colors/ ..., then guard passes (drives, schedule, seasonrun = 96 of 305) with a pinned tsc baseline" — matches MUSE §1's "F1 ruling + contract fixes + guard passes". DONE line: "vite IS already a devDep (^8.3.6); only typescript is missing" — confirms MUSE's correction (vite present since 425f72a; only typescript missing). tsc: 305 errors, 0 config errors, pinned baseline pending. F1 ruling listed as Blocker (Owner). VERIFIED as current and correct.

DoD check (P-279 / P-280): bootstrap handles the single-branch fetch without a manual refspec — YES (tested above). Stale NOW.md is flagged at boot — YES. AGENTS.md is a short core + on-demand sections — YES (74 lines). No passage describes a one-file HTML product — YES. Boot-doc update (00-READ-FIRST.md + Project stub paths) lands in the same change — YES (one commit, 10 files).

Not reviewed as done (per MUSE §1, Claude's next chat): the F1 ruling, the contract fixes, the guard passes, the typescript devDep. NOW.md states them as NEXT/Blockers — consistent.

Labels: VERIFIED = command run, file read, or fetch test executed. Nothing irreversible; advisory to the Architect only.
