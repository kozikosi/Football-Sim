# SECTION 5 — Evidence Record + Repo Truth — BOC (MOC dispatch) — 20 Oct 2026

## 1. Shared-record loss and recovery (VERIFIED)

Two loss events on 20 Oct (first 01:21–01:24, second ~12:13) replaced `COUNCIL-BULLETIN.md`, `CHRONICLE.md`, and `QUESTIONS-FOR-THE-ARCHITECT.md` from every copy (root, mirror, `origin/council-intake`). GLM re-filed the 47 pre-loss messages M-32…M-79 byte-for-byte from `stash@{1}` (291,971 B). MOC independently verified 76/76 message blocks present by body and 0 pre-loss chronicle lines missing; both stashes untouched. No message was renumbered or rewritten (rule 2). Why it matters: the record's integrity is the substrate every other claim rests on; a lossy sync would propagate the gap. Cost of being wrong: a council that cannot trust its own history. Evidence: MOC M-102 §§3–4, GLM recovery receipts `_agents/glm/recovery/`.

## 2. Candidate build (VERIFIED)

`NFL Draft Simulator merged.html` / `merged.html`, 657,486 B, SHA-256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, @ `merge/v20-donor` `ff8c05ae0ef89e9030faa991a942d1c611f891bd`. Reproducible byte-for-byte by `node tools/build-merged.js` (GPT, verified by MiniMax). Why it matters: the merge is no longer a trusted blob; it is a reproducible artifact. Cost of being wrong: a candidate that cannot be rebuilt cannot be audited. Evidence: MiniMax M-80, `tools/build-merged.js`.

## 3. Independent verifier sign-off (VERIFIED)

Gate (`post-merge-smoke.mjs`) exit 0 on the candidate with negative control (v20 exits 1): 832/832 picks, 272 regular-season games, 0 console/page errors, 0 viewport offenders, champion visible, 100-season report rendered (14,451 ms). Two corrections the Owner should have: (a) the 370 px P0 — `#startSeasonBtn` at `top=963.03` in an 844 px viewport fails the preseason primary-action clause (DS M-122 addendum 2); (b) the 1,188-vs-1,148 count — the drop is emergent from `NATURAL_SLOT_MAP` + taxonomy, not a hardcoded filter; when FB/P are carried the tool writes 1,188 and drops 12 (all LS) by itself. Why it matters: functional flow is clean but 390 CTA placement is not; the gate's `E_viewportUsable` does not assert `primaryAction.inViewport`. Cost of being wrong: a green gate masking a real 390px defect. Evidence: MiniMax M-80, DS M-122 addendum 2, MOC M-102.

## 4. PR #5 discovery instance (VERIFIED)

The scorecard generator admits `_agents/minimax/recon/run-reconciliation-v2.proposed.md`'s `SPEAKER: MiniMax subagent (run-reconciliation)` as a council member. One regeneration away from being published. Why it matters: an unattributed subagent would be credited as a council member. Cost of being wrong: inflated contribution metrics. Evidence: PR #5 review, `COUNCIL-SCORECARD.md` lines 44/51.

## 5. Invented-ratings quarantine (VERIFIED)

Both canonical paths (`sports/football/ratings.json`, `sports/basketball/all_time_draft.json`) are now stubs; originals preserved byte-for-byte. The files were untracked in every ref and bundle (origin UNKNOWN). No code reads them now (`core/draft_engine.js` deleted, `core/` empty). Why it matters: the last hard-rule violation (AGENTS.md "❌ Invent player ratings") is neutralised without losing the forensic record. Cost of being wrong: quarantine leaves a folder that must be clearly labelled "not engine data." Evidence: BOC A7 (`_agents/boc/notes/invented-ratings-provenance.md`), MOC M-102 §5.

## 6. Repo truth (VERIFIED)

`main` holds only `AGENTS.md` of the four council documents (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `QUESTIONS-FOR-THE-ARCHITECT.md`, `SUBMISSIONS.md` are absent from `main`). The live documents exist in three states (working tree, mirror, `origin/council-intake`); a push from the mirror ships none of them. Fresh-clone manifest is ~2.87 MB. Why it matters: a fresh clone or a mirror sync from a lossy root would propagate the loss. Cost of being wrong: the council's shared record is unrecoverable from git. Evidence: MOC M-102, BOC M-110 (release verified, 9 assets), `git ls-tree` on `origin/main`.
