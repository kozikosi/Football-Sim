SPEAKER: or | ROLE: Council seat (Verifier) | TASK: Review Claude's boot-v3 (commit eb12e106) | DATE: 2026-11-06T07:15:00Z
REVIEW-OF: eb12e106 boot-v3 — bootstrap refspec + NOW freshness check; repo-authoritative boot rules; AGENTS.md split (origin/architect/engine-and-seats, parent c577fb2, 10 files)
VERDICT: ok

## Scope
eb12e106 lives on origin/architect/engine-and-seats, NOT on council/base. This review verifies the commit on its own merits; it does not alter council/base's Football-Sim AGENTS.md (159-line core) or the one-file HTML product. MUSE §1 correction noted and applied: vite IS already a devDep (^8.3.6, added at 425f72a); only typescript is missing — so this is NOT an "add typescript and vite" commit.

## 1. claude/bootstrap.sh — refspec widening + NOW-CHECK (VERIFIED)
Claim: widens the refspec (council/*, gh-pages) so a fresh single-branch clone can fetch other branches by name; deepens to 50; prints a NOW-CHECK freshness verdict counting commits landed after NOW.md was last written, lists them, flags STALE?.

Empirical test (VERIFIED, command + output): created a `git clone -q --depth 50 --single-branch --branch architect/engine-and-seats https://github.com/kozikosi/football-sim /tmp/bstest` (exit 0). Before widening, `git fetch -q --depth=1 origin council/muse` (explicit ref) already works. After the script's exact loop (`git remote set-branches --add origin 'council/*' gh-pages`), `git fetch -q origin` (no args) succeeds and populates all remote-tracking refs: origin/council/* (23 branches incl. muse) and origin/gh-pages. => The single-branch clone problem IS fixed; council/gh-pages are fetchable by name.

NOW-CHECK logic (VERIFIED by reading eb12e106:claude/bootstrap.sh): NC = last commit touching claude/NOW.md; shallow-boundary branch prints STALE? ("not changed in the last DEPTH commits"); otherwise N = `git rev-list --count "$NC..HEAD"`; N=0 => "fresh (HEAD is the commit that last wrote NOW.md)", N>=1 => "STALE? $N commit(s) landed after NOW.md was last written" followed by the commit list (`git log --format='  %h %s' "$NC..HEAD" | cut -c1-110 | head -12`). Then it cats NOW.md and warns if NOW.md > 15 lines.

Does it silently follow a stale NOW.md? NO. It prints STALE? + lists commits whenever anything landed after the last NOW.md write, and 00-READ-FIRST.md instructs: read the listed commits and correct NOW.md's NEXT before acting; a commit that lands a NEXT item must update NOW.md in the same commit. So no silent following.

## 2. claude/00-READ-FIRST.md — authoritative boot-rules copy (VERIFIED for the copy; stub not checkable here)
File states itself as "boot-v3; AUTHORITATIVE copy" and "The Project doc of the same name is only a boot stub... If the stub does not say boot-v3, tell the Owner the stub is stale." => rules centralized in one copy read at boot; drift risk reduced by single source of truth. Caveat: the boot stub itself is not among eb12e106's 10 files and is not present in this council/base tree, so I could not confirm the stub says "boot-v3". That check requires the Project doc (external to / not part of this commit) — flagged for Owner/Architect confirmation, NOT treated as done.

## 3. AGENTS.md — short invariant core (VERIFIED)
- Line/byte count at eb12e106: exactly 74 lines, 10,655 bytes (was 159 lines / 28 KB). Short core: yes.
- §2/4/5/8/9/10 moved to claude/ref/agents-{2,4,5,8}-*.md — all 5 new files present in the commit; old section numbers kept in a Where table so existing "AGENTS.md §N" references resolve.
- One-file-HTML passages corrected: §3 product rule now reads "The product ships as separate static assets on Cloudflare Pages (Owner 4 Nov 2026 reversed the one-file rule)" and "Naming: the product is Colors v1 (colors/, Svelte 5 + TypeScript, Vite)"; Football-Sim-*.html hashes moved to agents-2-build-truth.md as frozen references. => The one-file HTML passage is gone; the product line matches MUSE's expected "separate static assets on Cloudflare Pages". yes.

## 4. claude/NOW.md — NEXT correct and current (VERIFIED)
NEXT (exact): "the F1 ruling, then land the contract fixes from gh-pages `w74/04-contracts-fixes/colors/` ... then guard passes (drives, schedule, seasonrun = 96 of 305) with a pinned tsc baseline." => matches MUSE's "F1 ruling + contract fixes + guard passes". yes.
DONE list is consistent with boot-v3; notes "vite IS already a devDep (^8.3.6); only typescript is missing" => matches MUSE correction.
NOT done (correctly not claimed as done here, per MUSE): F1 ruling, contract fixes, typescript devDep. tsc: 305 errors REPORTED only (tsc not installed here, not a devDep).

## Verdict rationale
eb12e106 does what its message says: refspec widened and empirically proven to unblock council/gh-pages fetching; NOW-CHECK flags a stale NOW.md with commit listings instead of silently following it; 00-READ-FIRST.md is the authoritative boot-rules copy; AGENTS.md is now a 74-line core with on-demand refs and the corrected product passage; NOW.md NEXT = F1 ruling + contract fixes + guard passes. Two scope caveats (not faults of the commit): the boot stub's "boot-v3" wording isn't verifiable from this commit, and F1/contract fixes/typescript are explicitly pending in NEXT, not DONE. Nothing here is treated as accepted or built — only reviewed.

EVIDENCE: `git show eb12e106:<path>` for all 10 files (VERIFIED by reading); shallow-clone refspec test in /tmp/bstest (VERIFIED: clone exit 0, explicit fetch OK, set-branches --add OK, plain `git fetch origin` OK, 23 council branches + gh-pages now tracked). Labels: VERIFIED = command run / file read; REPORTED = from MUSE briefing; INFERRED = reasoned from the commit text.