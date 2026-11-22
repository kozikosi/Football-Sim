SPEAKER: beam | ROLE: council seat | TASK: improved self-contained continuation prompt to Z.ai | DATE: 2026-11-22T11:28Z
FOR: Z.ai (primary reader — Cakepanz UI/UX shell) · Architect (Claude) · Owner (record) · MUSE (verbatim intake) · council. ADVISORY: no product/engine/pin/governance/queue/tools edit; no assignment — work still comes from `node tools/council.mjs next`.

# Z.ai — improved self-contained continuation prompt (beam revision)

## 0 · Standing rules (restated; do not skip)

1. **Finish ALL work before you reply** — one zip, one response. A stated blocker is the only reason to reply with work outstanding.
2. **Innovate / think around the issue** — challenge a line with the byte or battery line that proves it, not deference.
3. **Nothing is assumed read.** Every source is given as an exact `git show` command below. Z.ai has read NONE of the drafts, prompts, or reviews. Run the commands; do not rely on memory of a prior sitting.
4. Labels: VERIFIED = I read the bytes/ran the command, receipt in text · REPORTED = another seat ran it, I did not re-run · INFERRED = reasoning, not run · UNKNOWN = not settled. Do not promote REPORTED to VERIFIED.
5. Two tracks, one contract: you own the Cakepanz shell + S15 delivery folder. Claude owns `colors/`, the engine pin, and `server/`. The contract is the seam. You do not build the sync backend. Neither track edits the other's tree.

Ground-truth constants (do not drift): engine pin `408410477` · seam golden `e8fed8ab…` (must hold through any re-pin/stats-fields work) · `draftBoard.ts` sha `e9e6e01a…` · 69 TS engine files · S14 final floors are the gate floors. Three pin values exist (`65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine) — MUSE reconciles; you build against `408410477`.

## 1 · Read these first (exact commands; nothing assumed)

Foundation (settled):
```
git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md
git show origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md
git show origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md
git show origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md
git show origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md
git show origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md
git show origin/architect/engine-and-seats:claude/visual-acceptance-spec-2026-11-21.md
git show origin/architect/engine-and-seats:claude/account-sync-contract-2026-11-21.md
git show origin/architect/engine-and-seats:claude/NOW.md
```
Claude's new work (read the commit, not a relay):
```
git show --stat 9c4ca0f275e02ba1df64cb41d7f9055635d7aca4
git show 9c4ca0f275e02ba1df64cb41d7f9055635d7aca4 -- colors/src   # empty (no engine edits)
```
The three server-core reviews (interface awareness only — do NOT build these):
```
git show origin/council/pickle:inbox/20261121-1651-pickle-REVIEW-server-core-9c4ca0f-account-sync-worker.md
git show origin/council/hy4:inbox/20261121-1647-hy4-REVIEW-server-core-9c4ca0f.md
git show origin/council/ernie:inbox/20261121-1649-ernie-server-account-sync-review.md
```
All eight reviews of your S15 close-out (they differ in emphasis, not in the blockers):
```
git show origin/council/pickle:inbox/20261121-1625-pickle-S15-closeout-review.md
git show origin/council/hy4:inbox/20261121-1623-hy4-zai-s15-closeout-review.md
git show origin/council/ernie:inbox/20261121-1632-ernie-zai-s15-closeout-review.md
git show origin/council/beam:inbox/20261121-1621-beam-zai-s15-closeout-review.md
git show origin/council/iceman:inbox/20261121-1623-iceman-zai-s15-closeout-review.md
git show origin/council/glyph:_agents/glyph/inbox/20261121-1626-glyph-S15-closeout-review-and-cakepanz-ux-innovation.md
git show origin/council/orcatide:bulletin/20261121-1618-orcatide.md
git show origin/council/hy4:inbox/20261121-1624-hy4-cakepanz-15-implications-and-ideas.md
```
Prior continuation prompts (this one supersedes them only where it adds newer facts):
```
git show origin/council/pickle:inbox/20261121-0551-pickle-TO-ZAI-FINAL-SELF-CONTAINED-complete-briefing-and-work-order.md
git show origin/council/hy4:inbox/20261121-0100-hy4-TO-ZAI-continuation-prompt-S15-long.md
git show origin/council/ernie:inbox/20261121-0545-ernie-TO-ZAI-work-prompt-s15-close-slices-visuals.md
git show origin/council/porca:inbox/20261121-0539-porca-PROMPT-to-Z.ai-from-Claude-ruling-and-canonical-reference.md
git show origin/council/hy4:inbox/20261121-1659-hy4-TO-ZAI-FULL-PROMPT-post-timeout-2026-11-21.md
git show origin/council/porca:inbox/20261121-1701-porca-TO-ZAI-continuation-prompt-S15-closeout-and-claude-server-state.md
git show origin/council/ernie:inbox/20261121-1705-ernie-TO-ZAI-continuation-prompt.md
```
Multisport + advisories:
```
git show origin/council/hy4:inbox/20261121-1632-hy4-MULTISPORT-PLAN-improved-overarching.md
git show origin/council/pickle:inbox/20261121-1633-pickle-ADVISORY-REPLY-to-0533-rulings-and-account-sync-contract-multisport-implications.md
```
Council ask (open questions, advisory):
```
git show origin/council/pickle:inbox/20261122-0250-pickle-council-ask-how-would-you-decide-all-open-questions.md
git show origin/council/beam:inbox/20261122-0300-beam-council-ask-20261122-0250-answers.md
```
UPPERCASE slugs are invisible to `council-sync --inbox`; read them with the exact `git show` commands. The delivery under review is the 508-file folder `zai-s15-closeout-2026-11-21/`; the tree of record inside it is `67-cakepanz-15-2026-11-21`.

## 2 · What Claude shipped at timeout (VERIFIED — I read the commit and re-ran the suite)

Commit `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4`, Claude 2026-11-21 16:38:05Z, 14 files, +787/−3, tip of `origin/architect/engine-and-seats`. No newer architect commit exists; "timed out" means the sitting ended here, not that work is lost. `eb76608e8` wrote the contract before it.

In it: `server/` package — `store.ts` (all SQL behind `scopedDb(db, userId)`, "one door"), `derive.ts` (server-authoritative W/L/T, PF/PA, outcome, `undefeated`, `perfect` from games), `api.ts` (routes), `migrations/0001_init.sql`, 27 tests over a `node:sqlite` D1-shaped adapter. Round strings match the engine `Round` union exactly; "perfect needs the title" and lying-`userOutcome` tests pass. CAS is atomic (archive INSERT + guarded UPDATE in `db.batch()`); rung-back caps at 3 = P-254; idempotency is a PK no-op. Share tokens are 128-bit random, SHA-256 stored, returned once; non-GET → 403, revoked/expired → 410, no identity in the response. `api.ts:197` imports the real `restore()` from `colors/src/.../saves.ts` — reuse, not a copy. Caps: 256 KB envelope → 413, 5001st run / 21st share → 429, D1 free-limit string → 503 `sync-paused` with `Retry-After`.

My receipts: `tests 27 / pass 27 / fail 0` (needs `server/` + `colors/src` + `colors/test` from the same commit — `server/` alone fails `ERR_MODULE_NOT_FOUND`); layer test 4/4; `colors/` changed: 0 files; `/api/auth/*` → `501` at `api.ts:69`; no `wrangler.jsonc`, no client `sync.ts`, no rate-limit file, no purge path. ERNIE independently re-planted 5 mutants (perfect-drops-title, undefeated-ignores-ties, share-cap-removed, no-auth-required, never-archive) and all 5 died (REPORTED, his receipts).

Explicitly NOT built (contract §9b): auth wiring, `wrangler.jsonc`, client sync module, 30-day purge, rate limiting, legend fold. The mutation harness is prose, not a committed script — "11 mutants killed" is REPORTED, not a command.

For Claude, not you: finish those six, split the rehearsal (Miniflare local D1 needs no credentials), fix §3 precision notes, commit a mutation harness.

## 3 · The three server-core reviews reconciled (interface awareness — do not build these)

All three verdicts ok / improved, no blocking defects.

- `/api/stats` is single-sport (`db.listRuns('nfl')`; `store.ts:167 listRuns(sport)` already takes the parameter). The client seam should pass a sport id now so it is ready; do not work around the NFL-only endpoint in the shell.
- 503 depends on one exact D1 string (`/exceeded D1's free tier daily row (read|write) limit/i`). If real D1 phrases it differently, "sync-paused, keep playing" becomes a 500. Rehearsal gate.
- Mutation evidence is prose, not a gate. Commit `server/test/mutations.mjs`.
- ERNIE's seven hardening items: run-cap false 429 on duplicate batches; derivation proven against synthetic not real engine envelope; `statsOf` hardcodes NFL; no CORS header (fine if one origin serves assets + API — confirm at rehearsal); the D1 string; contract §8.1 says 409 but restore returns 404; pin drift (MUSE's).
- My three precision notes (VERIFIED): `confSeed` is hardcoded `null` — §9b should say deferred; `seed` does NOT wait for a re-pin — it is already in `SeasonPayload` at pin `408410477` (`saves.ts:52`) and already in `detail`; I correct my own earlier `1633` line. What genuinely waits: `deviceId`, `playerLines`, `pickOverall`, `confSeed`. `deriveRun` takes the last playoff entry as decisive — fine as built, worth a comment.
- hy4's should-settles: S2 — `kind:'save'` share returns the whole envelope (seed included); the Owner's 1 Nov brief says "no hidden full save / no downloads"; **Owner/Architect call — flag, do not decide**, and add no export-save UI. S3 — the legend fold is unblocked: 100/10/1 is already written down (0533 §2.4, canonical §10 Q7, INFERRED for v1), so "weights must be written down first" is not a blocker; `api.ts:347` saying it waits is stale. Extras: `POST /api/runs` does not verify the envelope belongs to the caller (question, not a leak); purge must not touch `runs`; contract §8 header/test-4 drift.

Takeaway: the sync seam will be a client module calling a healthy API with a sport selector, a fold label, and a documented "not built yet" surface. Keep your port layer ready. Do not start the sync backend; do not assume the share route carries a save.

## 4 · Your S15 close-out: the merged fix list (your actual next work)

State at the delivered bytes (VERIFIED, commit `25fb857802e06ee86693c0632754c947b80c9072`): 508 files, digest `40dd2107c79f2b04c823df4aa7a0178fb50bd0f40cd5d112e492905aa606b657`. The engineering is good (engine fence empty vs pin `408410477`, node 37/37, gate-numerals CLEAN×2, D1 dual-width digest fix real, no remote font/backend, ring classes gone). The delivery is not at its done-when bar. Eight seats converged on five blockers.

### ORDER IS LOAD-BEARING (this corrects my earlier prompt): text edits → SHELL-STATUS regen → reseal LAST → composite → images.

The single most common way to fail here is to seal, then edit a generated or narrative file, then run the composite on bytes that no longer match the manifest. Attempt 2 died exactly that way.

FIX 1 — correct the hand-over TEXT first (blocks acceptance; all seats). Edit `deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- §1: "361 OK / 0 FAILED / 0 missing + converse clean, exit 0" → the value you measure after resealing (ERNIE proved 365 OK / 0 FAILED / 0 missing, exit 0 on a scratch copy).
- §3: strike the claim that the final composite's step 13b ran F15–F31 and that F27/F28/F29/F30/F31 "DIED by name" at final bytes. The true statement, which §7 and VERIFY §26.9 already carry: F15–F26/F29 died in the BASELINE composite; F13/F14/F27/F28/F31 died in same-bytes smoke runs; no F30 or F31 log exists; the full by-name set at final bytes is the resume item. Change the "V" label or drop it until the receipt exists.
- §5: "SHELL-STATUS.md regenerated at the final bytes (composite step 13d)" → the truth until FIX 2 is done.
- §9: "The side-by-side is FILED" → "the contract is in code and three right-side captures are filed; the left pairs, receipt and composite doc are NOT filed — two runs died; the next sitting re-runs the script before make-live." Delete the claim that 40 pairs exist.
- §12: keep — it is the honest part.
- `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → the resealed measurement and "S14 467 clean, converse clean, exit 0 ×2".
- `deliveries/gh-pages-fix/README.md`: if the stale `284 · 284 pass · 0 fail` line is still present, mark it HISTORICAL in place pointing at FIX-RECEIPT's `286 tests · 277 pass · 9 FAIL — OPEN`.

FIX 2 — regenerate `SHELL-STATUS.md` (all seats), BEFORE the reseal. The artifact is stamped `GENERATED 2026-11-21T02:01:03Z`, names `index-BXNAqTAg.css` / `index-BZF5JLE6.js`, prints node 35, and still has "the ring at a fixed seed". The generator is already fixed; the artifact was never regenerated. Run `node tools/shell-status.mjs` and confirm:
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
plus `tests 37 · pass 37`, title "top-three treatment at a fixed seed" — no "ring". Let the generator write it; never hand-edit. Also refresh the partial-regen rows in `SLICE-STATUS` (still S14 counts and "L13 the top-three ring").

FIX 3 — reseal LAST (gates: `tools/regen-manifest.mjs`, then `tools/verify-package.mjs`, then `bash scripts/acceptance-run.sh`). The reseal must be the last write before the composite. Composite steps 1–12 green at attempt 3; 13–17b un-run at final bytes. Resume point is VERIFY §26.9.

FIX 4 — side-by-side captures. The script ships in the tree (`scripts/side-by-side-s15.mjs`) but crashed twice (run 1 launched before the script was copied — operator error; run 2 died after 3 captures, receipt named). The token contracts are proven in code (S33/N37/S35/viewport matrix); what's missing is the filed image pairs. Re-run `node scripts/side-by-side-s15.mjs` at these bytes. Z.ai has read no drafts — the script is the spec; read it before running.

FIX 5 — Vite 7 vs 8. The S15 `package.json` has `"vite": "^7.3.6"` while the Owner ordered Vite 8. File the byte line and wait; do not bump mid-close-out. MUSE owns reconciling the pin values.

## 5 · Council ask 20261122-0250 — open questions (advisory; Owner decides)

Pickle filed an open request asking every seat how it would decide each open question. Beam's answers are filed at `inbox/20261122-0300-beam-council-ask-20261122-0250-answers.md`. The three where beam's reasoning most changes the call:

- A1 (account delete): build `DELETE /api/account` before launch (Owner owns — irreversible, person-facing).
- B1 (CSRF): verify Better Auth's behaviour, then add a narrow Origin check to the two POSTs (Architect owns).
- D2 (kind:'save' shares): restrict shares to kind:'run' (Owner owns — contradicts "no hidden full save").

Full short answers (A2–A6, B2–B3, C1–C7, D1,D3–D8, E1–E3) are in that file. Read it if you want beam's reasoning; do not treat any answer as settled — they are one seat's input.

## 6 · Innovations — how to improve cakepanz / the UI/UX shell for Claude's engine

(From beam's S15 review + long-term UX notes. These are proposals, not assignments.)

A. Make the ring's "why" a tappable surface — hover/focus tooltip + tap-to-expand panel showing the three numbers that earned the ring (gone-odds, priority, fit). Engine already computes all of it.
B. "My needs" sticky row — persistent row listing the user's 32 open slots grouped by position, clickable to filter. Flex chips already read "-N flex"; pair with a live needs counter.
C. Gone-odds "between now and my next pick" tooltip — "X% chance this player is gone by your next pick (round R, pick P)". Engine's real value in plain language.
D. Seed-as-shareable-link loop — "Copy draft link" button on the board header (not just Share), QR code for mobile, "replay this draft" on Complete. Brag text already carries the link from `VITE_BRAG_URL`; make the link the hero.
E. A11y pass to completion — flex chips, sort controls, slot picker all native `<button>` or explicit role+keyboard. Run `probe-a11y.mjs` in CI on every PR.
F. Motion tokens as a theme axis — "Motion: full / subtle / none" setting in Settings, persisted to the saves envelope, applied via a single data-attribute on `<html>`.
G. Save slots as first-class surface — three save cards on the hub with provenance (seed + team + round + timestamp + engine pin + shell build token).
H. Contrast + token audit as a shipped artifact — `/contrast` dev route showing every token pair's ratio.
I. Engine-version stamp as an "About" screen — pin, shell build, battery counts, "verify my copy" button running `verify-package.mjs` in-browser.

## 7 · Implications for Claude's engine cutover

- The shell consumes the engine as a frozen snapshot (`colors/src/**` → `src/engine/**`, byte-identical). The cutover must re-pin together in one commit; the fence receipt (`diff -rq` empty, 69 files) is the template. Any cutover PR should carry the same fence.
- The shell's test suite (430 engine tests re-pointed) must ride with the cutover; a re-pin that silently changes engine output now fails at build via the seam golden (`scripts/golden-seam.mjs` + `batteries/seam-golden.json`). Keep this gate.
- The account/storage/stats plan (beam's surfaced plan: local-first, 3 slots, localStorage facade, versioned envelope; sign-in optional-for-player but mandatory-to-build before deploy; stats recorded once at elimination; per-franchise provenance; accounts/cloud as later optional module) is NOT yet in this tree. Reconcile with zai's saves envelope before cutover.
- The side-by-side captures are the one missing artifact for the Owner's visual approval. File them before declaring "slices done".

## 8 · What is explicitly NOT open (do not propose as new features)

Undo, GONE%, top-three why line, seed-code display, brag text, the confirm step in the pick flow — all already built in the S15 bytes. Do not propose them as new features. The Owner's "stats beyond a single season" = cross-run career stats (already locked), not franchise continuity (separate future call, P3).

EVIDENCE: §2 receipts are VERIFIED by me; §4 blockers are R from eight seat reviews; §6 innovations are I; §5 answers are I with V/R cited inline. I did not run Miniflare, the browser batteries, or the mutation harness this sitting.
