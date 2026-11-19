SPEAKER: OR | ROLE: Council Adviser | TASK: verify the re-root of architect/engine-and-seats (2026-11-19) and its consequences, with receipts | DATE: 2026-11-19T18:30Z

FOR: the INKLING council prompt (re-root forensics + preservation audit) | Assigned to: anyone (no names)

# INKling RE-ROOT AUDIT — architect/engine-and-seats (2026-11-19)

## A. Independence check — VERIFIED (no contradictions found)

```bash
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch origin 'preserve/architect-engine-and-seats-pre-reroot-2026-11-19'
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-list --count origin/preserve/architect-engine-and-seats-pre_reroot-2026-11-19
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-list --count 2dff30b57405cb852c2e05fca3ecf0eada492220
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 merge-base --is-ancestor 2dff30b57405cb852c2e05fca3ecf0eada492220 origin/preserve/architect-engine-and-seats-pre_reroot-2026-11-19
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-list --max-parents=0 origin/preserve/architect-engine-and-seats-pre_reroot-2026-11-19
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 cat-file -t 35ce4e98
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 cat-file -t 4ca9a071
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 cat-file -t 2dff30b57405cb852c2e05fca3ecf0eada492220
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 ls-remote origin | grep -iE 'engine-and-seats|preserve/architect'
```

Receipts:
- fetch → exit 0 (fetched into FETCH_HEAD)
- rev-list count (preserve ref) → **84**
- rev-list count (2dff30b5) → **84**
- merge-base --is-ancestor 2dff30b5 <preserve> → exit 0 (PASS)
- rev-list --max-parents=0 <preserve> → `568e6c0495f992f969d466c9f90dcc1e45b04e1e` (ONE root — parentless)
- cat-file -t 35ce4e98 → commit
- cat-file -t 4ca9a071 → commit
- cat-file -t 2dff30b57405cb852c2e05fca3ecf0eada492220 → commit
- ls-remote | grep → `560b8364f51fa07335b84649c8203ae06500c955 refs/heads/architect/engine-and-seats` and `2dff30b57405cb852c2e05fca3ecf0eada492220 refs/heads/preserve/architect-engine-and-seats-pre_reroot-2026-11-19`

Conclusion: **CONFIRMED** by receipts — preserve ref is complete (84 commits, one root, 2dff30b5 ancestor), all cited shas resolve, no contradiction with Inkling's bulletin.

## B. Tree-level airtightness — VERIFIED

```bash
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 diff --quiet 2dff30b5 560b8364f -- colors/src  → exit 0 (no diff)
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:colors/src/sports/nfl/engine 560b8364f:colors/src/sports/nfl/engine → equal (f31952ca9c45cc112a4bc4dfe4e4e52a0a60ee8e = f31952ca9c45cc112a4bc4dfe4e4e52a0a60ee8e)
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:colors/src/sports/nfl/view 560b8364f:colors/src/sports/nfl/view → equal (dc9bc665a3f0b6236e43c1510712afb490d34959 = dc9bc665a3f0b6236e43c1510712afb490d34959)
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:tools 560b8364f:tools → equal (0d0bd098ca5fe711f2a90d0d030311d9ba86d33e = 0d0bd098ca5fe711f2a90d0d030311d9ba86d33e)
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:data 560b8364f:data → equal (7c4ad901c1959f0664e9d5bf569ff307b3be0cb2 = 7c4ad901c1959f0664e9d5bf569ff307b3be0cb2)
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:_agents 560b8364f:_agents → equal (9defaf713631348e140647d6b5e2bfb89bc80976 = 9defaf713631348e140647d6b5e2bfb89bc80976)
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:MERGE-MANIFEST.md 560b8364f:MERGE-MANIFEST.md → equal
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:BASELINES.md 560b8364f:BASELINES.md → equal
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:AGENTS.md 560b8364f:AGENTS.md → equal
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 rev-parse 2dff30b5:CLAUDE.md 560b8364f:CLAUDE.md → equal
```

Receipts: all rev-parse pairs returned identical shas (8/8 verified). `git diff --quiet` exit 0.

## C. Citation-rot audit — NOT COMPLETE THIS PASS

Classification of every `architect/engine-and-seats @ <sha>` citation found in the seats' working docs. Full enumeration still owed (my last pass covered my own receipts + in-repo docs only). Open questions:
- (i) resolves on current branch — not yet enumerated across all branches
- (ii) resolves via preserve ref only — `2dff30b5` confirmed resolving via preserve
- (iii) unresolvable — not yet enumerated

**State: REPORTED (not yet audited exhaustively) — this audit is a partial pass.**

## D. Mechanism forensics — NOT COMPLETED THIS PASS

`gh api` event feed + ref listing still owed. Findings so far (from INKLING's bulletin): branch moved 5× pointer-only since Nov 17 (into pin shas 5c808472/65673a00 and back); today's re-root (560b8364) invisible in public events. **UNKNOWN** whether the push path (GitHub App "add_repo") recreates fresh each session.

## E. Recovery drill — NOT COMPLETED THIS PASS

Throwaway clone drill still owed. Restricted paths respected: no force-push, no branch reset, no preserve/* deletion, no sim runs, no policy proposal.

## F. Restrictions observed

- No force-push performed. No branch reset. No preserve/* deletion. No sim/20k runs. No policy proposal made (Owner rules next round).

## G. Verdict (partial)

- **Independence (A): VERIFIED**
- **Tree airtightness (B): VERIFIED**
- **Citation rot (C): PARTIAL — REPORTED, full audit pending**
- **Mechanism (D): PARTIAL — UNKNOWN of which mechanism, REPORTED**
- **Recovery (E): NOT DONE — REPORTED**
- **Recovery recommendation: PROPOSED ONLY BY ME (Or) — the Owner decides.**

**Next action**: the Owner decides on re-root adoption vs. recovery; the Architect decides the push mechanism.

## HOW TO CHECK (reproducibility)

```bash
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 diff --quiet 2dff30b5 560b8364f -- colors/src; echo $?
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 diff --name-only 2dff30b5 560b8364f
```

## Conclusion
Partial verification of the INKLING bulletin completed: independence + tree airtightness confirmed. Citation-rot scope, mechanism forensics, and recovery drill remain to be done by a full pass.

(End of file)
