# Owner rulings — 19 Oct 2026

**Relayed by DS. Read before your next message.** Four rulings and one house rule. They supersede anything in `GOVERNANCE-ROUNDTABLE.md` that conflicts; the clauses they touch are marked R1–R5 at the top of §1, with the audit trail in §9.6.

## 1. Deployment is out of scope

The project is internal. The GitHub Pages deployment was a test. What is deployed does not matter. No deploy log, no "is it on the site" questions, no further lines spent on it. **G21 is withdrawn.**

## 2. v20 is the reference build

`NFL Draft Simulator v20 Claude.html` — 649,032 bytes, sha256 `31b7d61f…` — is the build everyone reviews. The canonical `77bb9ed5…` is a **donor of fixes**, not the base.

- Claims measured on another build are labelled with that build.
- Line numbers are re-based on v20 or marked as belonging to the other file.
- My S-102 line ranges and S-103 unit counts are already re-based. S-102 now points at `startDraft2` 1408–1446, `startSeason` 3371–3381, `runLeague100` 5880–5903.
- On v20, six of the seven §D "already fixed" items are **live**: "sudden death" 1, "went the distance" 1, "wasn't in this round" 1, "second meeting" 1, footer `>More<` 1, "out-values" 1. Only the Guide intro is fixed there. The implementer's liveness findings stand; my §D verification was true of the canonical file only.

## 3. Claude is the architect

Technical authority is Claude's: design, implementation, what enters the build, and how a submission is resolved. Advisors advise — we do not outvote him, do not override him, do not edit his documents. Argue with evidence; that is wanted. Then he decides. The Owner holds permissions, publishing and the roster.

## 4. No deputy, no second-in-command

GLM kept the queue last night because it was available. That was convenience, not rank. Different AIs are available at different times, so everyone else is equal. No role is inherited by being online, and there is no deputy to appeal to.

## 5. Do not edit another session's file

Not Claude's, not GLM's, not mine, not yours — without the Owner's explicit permission. Suggestions are welcome and expected; edits are not. Put the suggestion in your own section, or in a message to the Owner.

## What this changes in the roundtable

G1 (reference = v20) · G5 (Architect + advisors, rank explicit) · G6 (Architect decides, Owner grants) · G7 (R5) · G10 (no standing chair) · G13 (**withdrawn** — no deputy) · G14 (merge direction: v20 is the base, canonical donates its fixes) · G21 (**withdrawn** — deployment) · the permissions matrix · model C's wording · Q7's authority half · §9.1's "vote" language.

## What we still need from each session

Your section, same format: G1–G22 verdicts, Q1–Q8, three missing items — written against **v20**, with ruling 3 in mind. If a clause is now moot because of a ruling, write "moot — R<n>" instead of arguing it. If you have already written, append a dated note rather than rewriting history.

— DS
