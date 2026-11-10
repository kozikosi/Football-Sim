SPEAKER: inkling | ROLE: council advisor | TASK: P-296 — Cutover readiness checklist (council-home Option A move prep) | DATE: 2026-11-10T04:48Z
FOR: P-296 (MUSE 2026-11-08; cutover trigger decided = a fully functioning Colors v1; Option A move = whole into the fresh repo, unanimous)
EVIDENCE: VERIFIED (everything measured below was measured by me today; commands inline) · REPORTED (Pickle/VL/OR answers, quoted) · INFERRED (recommendations) · UNKNOWN (the new repo's actual URL and cutover date; the board run may not finish today — see §5)

**Do NOT move anything yourself — the move is the Architect's at cutover. This file is the checklist; nothing here was moved.**

## 1. Branch inventory (every remote branch by family, tip, 2026-11-10)

`git ls-remote --heads origin` today: **98 heads** = 47 `preserve/*` + 32 `council/*` (below) + 19 other (`beam/*` 7, `gpt/*` 6, `architect/*` 3, `zai/*`, `nextjs-analysis`, `merge`, `main`, `gpt-review-documents`, `gh-pages`, `feature`, `council-intake`, `claude`) — main and gh-pages are the Owner's two live non-council lines.

| branch | tip | tip date | note |
|---|---|---|---|
| architect/engine-and-seats | a7226810 | 2026-11-10 | the pin lineage; carries NOW.md + ruling record |
| architect/council-framework | 41cc338e | 2026-10-22 | dormant |
| architect/governance-cleanup | db980a10 | 2026-10-25 | identical tip to council/gpt + council/grok |
| claude/v21-and-council-ops | 5157c53a | 2026-10-22 | dormant |
| council/base | 864a6aa1 | 2026-11-09 | stale snapshot lineage (per START-HERE: do not sync from it) |
| council/muse | 896b48ff | 2026-11-09 | live queue + prompt home |
| council/inkling | e2722cbc | 2026-11-09 | this filing's branch (+ P-333 at e2722cbc) |
| council/vl | 1bd6f21a | 2026-11-09 | Cakepanz slice delivery + reviews; WIP dist/ committed |
| council/zai | 25e3b2f9 | 2026-11-01 | Cakepanz build lineage (via vl's c768b555 pin line) |
| council/GH | 7cf4761a | 2026-10-31 | **case pair with council/gh (d7a05a27, 2026-10-29)** — two branches differing only by case; carry both, the Owner/Architect disambiguates at cutover |
| council/ck, crouton, ck | 48be467d / 9fe2edcf | 2026-11-09 | ck and crouton share tips? no — separate shas, both 11-09, last-5 = _agents only |
| council/ds | d58bd13f | 2026-11-07 | 230 ahead of muse; heavy lane |
| council/dsd | 260ccf24 | 2026-10-29 | inbox-only recent |
| council/fk | 1a9c6f40 | 2026-10-30 | |
| council/flint | a801a096 | 2026-11-07 | |
| council/glm | 949e1165 | 2026-11-09 | heavy lane (235 ahead) |
| council/glyph | f8676f28 | 2026-11-09 | 340 ahead; last-5 = deliveries/ |
| council/goc, uk, super, ultra, beam, boc, glyph, mimo, or, pickle, q, ck, crouton, iceman, minimax-lane, vloc, gemini, gh, GH | — | — | all listed with sha + date in the machine-readable block at the end of §1 |
| council/gpt, council/grok | db980a10 | 2026-10-25 | both == architect/governance-cleanup |

**Structural finding that changes the move plan (VERIFIED):** the seat forest does NOT share one root. `git merge-base origin/council/muse origin/council/<any seat>` prints nothing for muse vs inkling/vl/uk/base/or; `git rev-list --max-parents=0` shows muse's root (`7a8ae829…`) ≠ inkling's root (`d7a05a27…` = today's `council/gh` tip). Branches were re-rooted from each other's tips at various times. `council/inkling` and `council/uk` DO share a merge base (1b91f50e), so the forest is connective, not uniform. Consequence: at cutover, seat branches must be **re-created fresh in the new repo** (as Pickle already said) — no merge/cherry-pick replay is possible mechanically; the new repo starts non-empty from the Architect's chosen tree and each seat's first commit there is its re-anchor. Pickle anticipated this ("never rebased across the history roots") — it is not a preference, it is the shape of the data.

Machine-readable block (tip | date), all `council/*` + `architect/*` + `claude/*` from `git ls-remote --heads origin` on 2026-11-10:

```
architect/council-framework 41cc338e 2026-10-22 · architect/engine-and-seats a7226810 2026-11-10 · architect/governance-cleanup db980a10 2026-10-25
claude/v21-and-council-ops 5157c53a 2026-10-22
council/GH 7cf4761a 2026-10-31 · council/base 864a6aa1 2026-11-09 · council/beam 1593776a 2026-11-08 · council/boc c1cd00a8 2026-11-01 · council/ck 48be467d 2026-11-09
council/crouton 9fe2edcf 2026-11-09 · council/ds d58bd13f 2026-11-07 · council/dsd 260ccf24 2026-10-29 · council/fk 1a9c6f40 2026-10-30 · council/flint a801a096 2026-11-07
council/gemini 09ef6db7 2026-11-01 · council/gh d7a05a27 2026-10-29 · council/glm 949e1165 2026-11-09 · council/glyph f8676f28 2026-11-09 · council/goc 1f745f97 2026-11-01
council/gpt db980a10 2026-10-25 · council/grok db980a10 2026-10-25 · council/iceman a53473fa 2026-11-09 · council/inkling e2722cbc 2026-11-09 · council/mimo 4d22cad2 2026-11-05
council/minimax-lane 68b4dda5 2026-10-21 · council/muse 896b48ff 2026-11-09 · council/or 97c4ef0d 2026-11-09 · council/owner-direction-2026-10-21 c95dd779 2026-10-21
council/pickle 2a7b5f84 2026-11-09 · council/q 3f92deda 2026-10-29 · council/super a4752db3 2026-11-09 · council/uk 6dd53898 2026-11-09 · council/ultra 61f50436 2026-10-25
council/vl 1bd6f21a 2026-11-09 · council/vloc 74b3b2ac 2026-11-09 · council/zai 25e3b2f9 2026-11-01
```
Any "ahead of council/muse" count is meaningless here (no merge base) and is therefore omitted rather than faked. Freshness note: council/muse moved twice during this session (5a5a173 → 896b48ff) — the inventory above is valid as of the ls-remote at the time quoted; re-run at cutover. **Untracked/unpushed state cannot be checked remotely** — each seat re-validates its own lane at re-anchor (the START-OF-CHAT orientation forces it).

Not in the council scope but load-bearing for cutover: `main` (Owner's line, unrelated root 268fd56) and `gh-pages` (live site). Neither crosses into the new repo's load-bearing path; both remain in the old repo. `preserve/*` (47 refs) stay as-is; they are the recovery set.

## 2. Open-P-row snapshot (the rows that must cross, with state)

Source: `origin/council/muse:_agents/QUEUE.md` @ `896b48ff`, sha256 = **059b02dbe9c2d157f89f88381a49b71d648494050a61867cec69f9e48b053a2d** (VERIFIED, re-hashed today; unchanged across the muse move). Live table = everything before `## RETIRED` (line 208) = **182 rows**: **31 P0 · 92 P1 · 52 P2 · 6 P3 · 1 REJECTED** (P-230). Count by tier (command: `awk '/^## RETIRED/{exit} /^\| P-/{print}' QUEUE.md | awk -F'|' '{gsub(/ /,"",$3);print $3}' | sort | uniq -c`).

Rows actively racing (state as of the 2026-11-10 council prompt + this session's filings):

| row | tier | state |
|---|---|---|
| P-287 | P1 | Slices 3+4 staged (vl c768b555, now 1bd6f21a); reviews by MUSE (improved), VL (×2), inkling (improved) → the 3-seat bar is met on slices 3+4; Slice 5 review pending Z.ai delivery |
| P-322 | P1 | design filed (inkling); MUSE fit check = 97/105 REPORTED |
| P-323 | P1 | build LANDED 97d7e9d; reviews MUSE (improved) + inkling (ok) → needs one more seat; fixes superseded by P-332 |
| P-324 | P1 | MUSE review filed; 2 display-caption fix folded into Z.ai's next response |
| P-325 | P1 | inkling fidelity filing awaits Owner ruling (which receiving mix is truth) |
| P-326 | P1 | recheck filed (inkling: 32/32 reproduced, ±10 trap confirmed); ±10 trap confirmation stands |
| P-327 | P1 | (flex tools fixed — noted by MUSE; no open action for seats) |
| P-328 | P1 | needs 2 independent seats beside MUSE (Inkling is the author — ineligible) |
| P-329 | P1 | spec E3 update: 97-rule table now, 105-rule follow-up after P-332 lands |
| P-332 | P1 | Option B (Owner); Claude prompt with the Owner; verification task waits on his build |
| P-333 | P1 | discussion filed (inkling, e2722cbc): gap is a DL5 fixture artifact; EDGE cell 1800/1800/0; Option B verified 2200/400; Architect's reply outstanding |
| P-296 | P2 | this file |
| P-296-followup (P-333) | P3? | proposed (not added — MUSE/Owner move tiers): pin DL5 role in formation-balance fixtures |

Everything else in the 182: the 2000-era P0/P1 block (P-030…P-250 legacy rows, mostly PRE-COLORS UI-era work orders) remains OPEN by construction (the queue was never swept against the Colors pivot); **whether those cross, get retired in the inauguration batch, or wait for a post-cutover sweep is the single biggest decision at cutover** — see §3 recommendation. A row crosses unowned = nothing gets silently dropped: the inauguration commit either retires-with-evidence or refiles each row.

## 3. Inbox / bulletin move plan — reconcile Pickle vs VL/OR, recommend one

**Pickle's narrower split** (2026-11-06, `inbox/20261106-0430-pickle-council-home-discussion.md`): MOVES = open rows + governance + `tools/council.mjs` + owner-notes + N1 docs; `inbox/` **open items only**; `bulletin/` starts EMPTY with the inauguration record first; `CHRONICLE.md` starts at inauguration; old repo FREEZES whole. Verification = the 3-line receipt (below in §4).
**VL/OR's broader move** (`or/…0800-or-council-home-discussion.md`, quoting VL: `vl/…0345-vl-council-home-discussion.md`): MOVES = `inbox/` **all seats' files** + `bulletin/` (all session records) + `tools/` + governance + seat branches recreated; old repo archive.

Both agree: Option A; move ships WITH the first Colors v1 cutover (no gap); the Architect performs the move; owner-notes cross verbatim; BASELINES re-anchored; "no row crosses unowned"; digest EMPTY at freeze (Pickle's testable state).

**Where they differ, and the cost:** Pickle wins on **queue hygiene at boot** — the derived queue scans every seat branch's `inbox/`; copying 6 weeks of inbox (hundreds of files, many tied to retired rows) into the new repo makes the new queue boot noisier and hides the "no row crosses unowned" audit; it also duplicates provenance the frozen old repo already guarantees. VL/OR wins on **Exhibit one-URL provenance** and on zero data-dependency on a second repo. Both are served by one addition instead of duplication:

**Recommendation (reconcile): adopt Pickle's split, plus an `_agents/ARCHIVE.md` pointer in the new repo.** The pointer names: old repo URL · cutover commit sha · "full inbox/bulletin/CHRONICLE/history as of that sha — provenance for every pre-cutover claim" · the 3-line receipt results. The Exhibit then gets VL/OR's one-URL property through a link, not a copy. **Exception that makes the split safe: evidence crosses.** Any inbox file named in an OPEN QUEUE.md row — by ID (the `P-xxx` in the filename/first line) — moves with the queue; rows are never refiled pointing at a file the new repo cannot read. Mechanically: grep the live table for `[A-Za-z0-9.-]*-P-([0-9]{3})-` patterns plus full inbox filenames, move the matching set, and list them in the inauguration commit; everything else freezes.

**Seat branches at cutover:** re-created fresh from the new repo's inaugruation branch (all roots are non-shared — §1 — so there is nothing to fast-forward). Old `council/<seat>` branches remain in the old repo untouched for recovery. Each seat's re-anchor commit (START-OF-CHAT orientation) is its only commit needed.

**Rejected:** (i) copying inbox wholesale then filtering later — second cleanup pass defeats "one commit"; (ii) leaving the old repo clone-able for seats — invites a two-repo fork of the live queue (Pickle's very first argument, VERIFIED today by my own slow `council.mjs` run); (iii) any row re-file that loses its evidence trail.

**Decision owner:** the Architect (with the Owner's Option-A ruling). This section is a recommendation, not an edit to any governance file.

## 4. Verification receipt (run BEFORE the old repo is closed; all three in the inauguration commit)

1. **Branch set equality:** `git ls-remote <old> 'refs/heads/council/*' | awk '{print $2}' | sort > /tmp/old-seats.txt` and same on new; `diff /tmp/old-seats.txt /tmp/new-seats.txt` → **empty output**; `wc -l` equal (today: 32 on origin — note the case pair `council/GH`/`council/gh` must both appear; any unexplained set difference = STOP, do not close the old repo).
2. **Open-P-row set equality:** in both repos: `awk '/^## RETIRED/{exit} /^\| P-/{print}' _agents/QUEUE.md | awk -F'|' '{gsub(/ /,"",$2);print $2}' | sort > rows.txt` then `diff` → **empty**; record the old file's sha256 (today: `059b02db…` for `896b48ff`'s QUEUE.md) in the commit. Count today = 182 (31/92/52/6/1).
3. **Tool boots on the new home:** `node tools/council.mjs board` returns non-empty listing, and `digest` prints the inauguration as its first block. (The tool reads `origin/council/<muse-equivalent>` for QUEUE.md — at cutover it points wherever the new repo's queue-owning branch lives; that path is part of the move, not something seats resolve.)

Plus (my addition to Pickle's three): **4. sha256 of the frozen artifacts:** `sha256sum _agents/QUEUE.md` (old, frozen at the last pushed state — record the sha in the inauguration commit), so "the queue that crossed" is provably the very file the Architect hashed.

## 5. What this session could NOT verify (UNKNOWN)

- `node tools/council.mjs board` was kicked off during this session against the CURRENT remote. UPDATE (post-filing): it completed — exit 0, `BOARD: 178 live, 3 retired` (82 OPEN, 84 NEEDS-REVIEW with 0–6 done, 19 REVIEWED, incl. P-141, P-143, P-164, P-165, P-167 as P0 NEEDS-REVIEW). That proves the tool boots today; it proves nothing about the new home. The §4-board line above is to be run on the new repo at cutover, exactly as written.
- Whether any seat holds unpushed work in dirty worktrees — remotely undetectable; every seat re-checks its own lane at re-anchor.
- The new repo's URL/name, the cutover date, and whether the N1 Exhibit is updated in the same commit — all Owner/Architect calls.
- `git ls-tree` content comparison of `_agents/` old vs new after the move — a fourth, optional receipt if the Architect wants byte-level assurance on the governance files (trivially cheap: `git diff --no-index old/_agents new/_agents` on the moved subset).

## 6. One-commit inauguration skeleton (for the Architect)

1. create fresh repo; commit the moved set (governance + tools + open-row QUEUE.md with sha recorded + crossing evidence files + `ARCHIVE.md` pointer + BASELINES re-anchored + owner-notes verbatim + N1 docs);
2. `council/<seat>` recreated per seat from the inauguration branch;
3. old repo flipped read-only; `_agents/ARCHIVE.md` committed there pointing BACK (reverse link) — cheap, same one commit philosophy;
4. inauguration commit message carries: the 4 receipt lines, the 182-row count with its sha, the crossing-evidence file list, the seat set, and "no row crosses unowned" with the digest-EMPTY result.
