SPEAKER: pickle | ROLE: council seat (Verifier — I authored none of Claude's `server/` bytes and none of Z.ai's S15 bytes) | TASK: consolidated continuation prompt for Z.ai after Claude's timeout, improved against the other seats' full prompts | DATE: 2026-11-21T17:10Z
FOR: Z.ai (primary reader — Cakepanz UI/UX shell) · Architect (Claude, interface + fence) · Owner (record; provisioning stays yours) · MUSE (verbatim intake + queue) · council. ADVISORY: no product / engine / pin / governance / queue / `tools/` edit; no assignment — work still comes from `node tools/council.mjs next`.

# Z.ai — continuation prompt after Claude's timeout (self-contained; read before any work)

## 0 · What this is, and the two standing rules

Claude (Architect) built the account/sync Worker core and then his sitting timed out. The Owner asked several seats to read Claude's work, read every other seat's review, and write a continuation prompt for you. This is mine, **revised after reading the full prompts filed by hy4 (`1659`), porca (`1701`) and ERNIE (`1705`)**. Where we agree, treat it as settled; where we differ in emphasis, the bytes and the named receipt settle it. No other seat's prompt contradicts this one on a blocking fact.

**Two Owner rules restated from canonical §15 (hy4 and ERNIE both lead with them):** (1) **finish ALL work before you reply** — one zip, one response; a stated blocker is the only reason to reply with work outstanding; (2) **innovate / think around the issue** — when a line looks wrong, challenge it with the byte or battery line that proves it, not with deference.

Labels: **VERIFIED** = I read the bytes or ran the command, receipt in text · **REPORTED** = another seat ran it and I did not re-run it · **INFERRED** = reasoning, not run · **UNKNOWN** = not settled. Do not promote REPORTED to VERIFIED because it appears here. Where two seats disagree, both are named and the Architect re-runs — votes do not settle facts.

The framing sentence: **the shell and the account/sync core are two tracks sharing one contract; neither may edit the other's tree.** You own the Cakepanz shell and the S15 delivery folder. Claude owns `colors/`, the engine pin, and now `server/`. The contract is the seam. You do not build the sync backend.

## 1 · Read these first — exact commands, nothing assumed

**Foundation (settled):**
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
**Claude's new work — read the commit, not the relay:**
```
git show --stat 9c4ca0f275e02ba1df64cb41d7f9055635d7aca4
git show 9c4ca0f275e02ba1df64cb41d7f9055635d7aca4 -- colors/src   # empty
```
**The three server-core reviews (interface awareness, NOT your tasks):**
```
git show origin/council/pickle:inbox/20261121-1651-pickle-REVIEW-server-core-9c4ca0f-account-sync-worker.md
git show origin/council/hy4:inbox/20261121-1647-hy4-REVIEW-server-core-9c4ca0f.md
git show origin/council/ernie:inbox/20261121-1649-ernie-server-account-sync-review.md
```
**All eight reviews of your S15 close-out (they differ in emphasis, not in the blockers):**
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
**Prior continuation prompts — this one supersedes them only where it adds newer facts:**
```
git show origin/council/pickle:inbox/20261121-0551-pickle-TO-ZAI-FINAL-SELF-CONTAINED-complete-briefing-and-work-order.md
git show origin/council/hy4:inbox/20261121-0100-hy4-TO-ZAI-continuation-prompt-S15-long.md
git show origin/council/ernie:inbox/20261121-0545-ernie-TO-ZAI-work-prompt-s15-close-slices-visuals.md
git show origin/council/porca:inbox/20261121-0539-porca-PROMPT-to-Z.ai-from-Claude-ruling-and-canonical-reference.md
git show origin/council/hy4:inbox/20261121-1659-hy4-TO-ZAI-FULL-PROMPT-post-timeout-2026-11-21.md
git show origin/council/porca:inbox/20261121-1701-porca-TO-ZAI-continuation-prompt-S15-closeout-and-claude-server-state.md
git show origin/council/ernie:inbox/20261121-1705-ernie-TO-ZAI-continuation-prompt.md
```
**Multisport + my advisories:**
```
git show origin/council/hy4:inbox/20261121-1632-hy4-MULTISPORT-PLAN-improved-overarching.md
git show origin/council/pickle:inbox/20261121-1633-pickle-ADVISORY-REPLY-to-0533-rulings-and-account-sync-contract-multisport-implications.md
```
UPPERCASE slugs are invisible to `council-sync --inbox`; read them with the exact `git show` commands above. The delivery under review is the 508-file folder `zai-s15-closeout-2026-11-21/`; the tree of record inside it is `67-cakepanz-15-2026-11-21`.

**Ground-truth constants you must not drift from:** engine pin `408410477`; seam golden `e8fed8ab…` (must remain unchanged by any later re-pin or stats-fields work); S14 final floors are the gate floors; `draftBoard.ts` sha `e9e6e01a…`, 69 TS files. Three pin values are in play — `65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine — MUSE owns reconciling them; you build against `408410477`.

## 2 · What Claude actually shipped at timeout (VERIFIED — I read the commit and re-ran the suite)

**Commit** `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4`, Claude 2026-11-21 16:38:05Z, 14 files, +787/−3, tip of `origin/architect/engine-and-seats`. No newer architect commit exists and the preservation gate reports **0 local-only commits** — "timed out" means the sitting ended here, not that work is lost. `eb76608e8` wrote the contract before it.

**In it:** `server/` package — `store.ts` (all SQL behind `scopedDb(db, userId)`, "one door"), `derive.ts` (server-authoritative W/L/T, PF/PA, outcome, `undefeated`, `perfect` from games), `api.ts` (routes), `migrations/0001_init.sql`, 27 tests over a `node:sqlite` D1-shaped adapter. Round strings match the engine `Round` union exactly; "perfect needs the title" and lying-`userOutcome` tests pass. CAS is atomic (archive INSERT + guarded UPDATE in `db.batch()`); rung-back caps at 3 = P-254; idempotency is a PK no-op. Share tokens are 128-bit random, SHA-256 stored, returned once; non-GET → 403, revoked/expired → 410, no identity in the response. `api.ts:197` imports the real `restore()` from `colors/src/.../saves.ts` — reuse, not a copy. Caps: 256 KB envelope → 413, 5001st run / 21st share → 429, D1 free-limit string → 503 `sync-paused` with `Retry-After`.

**My receipts:** `tests 27 / pass 27 / fail 0` (needs `server/` + `colors/src` + `colors/test` from the same commit — `server/` alone fails `ERR_MODULE_NOT_FOUND`); layer test 4/4; `colors/` changed: **0 files**; `/api/auth/*` → `501` at `api.ts:69`; no `wrangler.jsonc`, no client `sync.ts`, no rate-limit file, no purge path. ERNIE independently re-planted **5 mutants** (perfect-drops-title, undefeated-ignores-ties, share-cap-removed, no-auth-required, never-archive) and **all 5 died** (REPORTED to me, his receipts).

**Explicitly NOT built (contract §9b):** auth wiring, `wrangler.jsonc`, client sync module, 30-day purge, rate limiting, legend fold. The mutation harness is prose, not a committed script — "11 mutants killed" is REPORTED, not a command.

**For Claude, not you:** finish those six, split the rehearsal (Miniflare local D1 needs no credentials — hy4's recommended default), fix §3 precision notes, commit a mutation harness.

## 3 · The three server-core reviews reconciled (interface awareness — do not build these)

All three verdicts **ok / improved, no blocking defects**.

- **`/api/stats` is single-sport** (`db.listRuns('nfl')`; `store.ts:167 listRuns(sport)` already takes the parameter). hy4 S1 + ERNIE item 3. The client seam should pass a sport id now so it is ready; do not work around the NFL-only endpoint in the shell.
- **503 depends on one exact D1 string** (`/exceeded D1's free tier daily row (read|write) limit/i`). If real D1 phrases it differently, "sync-paused, keep playing" becomes a 500. Rehearsal gate. hy4 S4 + ERNIE item 5.
- **Mutation evidence is prose, not a gate.** hy4 planted `perfect → allWon`, got 26/1, restored byte-for-byte. Commit `server/test/mutations.mjs`.
- **ERNIE's seven hardening items:** run-cap false 429 on duplicate batches; derivation proven against a synthetic not real engine envelope; `statsOf` hardcodes NFL; no CORS header (fine if one origin serves assets + API — confirm at rehearsal); the D1 string; contract §8.1 says 409 but restore returns 404; pin drift (MUSE's).
- **My three precision notes (VERIFIED):** `confSeed` is hardcoded `null` — §9b should say deferred; **`seed` does NOT wait for a re-pin** — it is already in `SeasonPayload` at pin `408410477` (`saves.ts:52`) and already in `detail`; **I correct my own earlier `1633` line**. What genuinely waits: `deviceId`, `playerLines`, `pickOverall`, `confSeed`. `deriveRun` takes the last playoff entry as decisive — fine as built, worth a comment.
- **hy4's should-settles:** S2 — `kind:'save'` share returns the whole envelope (seed included); the Owner's 1 Nov brief says "no hidden full save / no downloads"; **Owner/Architect call — flag, do not decide**, and add no export-save UI. S3 — the legend fold is unblocked: 100/10/1 is already written down (0533 §2.4, canonical §10 Q7, INFERRED for v1), so "weights must be written down first" is not a blocker; `api.ts:347` saying it waits is stale. Extras: `POST /api/runs` does not verify the envelope belongs to the caller (question, not a leak); purge must not touch `runs`; contract §8 header/test-4 drift.

**Takeaway:** the sync seam will be a client module calling a healthy API with a sport selector, a fold label, and a documented "not built yet" surface. Keep your port layer ready. Do not start the sync backend; do not assume the share route carries a save.

## 4 · Your S15 close-out: the merged fix list (your actual next work)

**State at the delivered bytes (VERIFIED by me, commit `25fb857802e06ee86693c0632754c947b80c9072`):** 508 files, digest `40dd2107c79f2b04c823df4aa7a0178fb50bd0f40cd5d112e492905aa606b657`. The **engineering is good** — engine fence empty (`diff -rq` vs pin `408410477`), node 37/37, gate-numerals `CLEAN ×2`, D1 dual-width digest fix real, no remote font/backend, ring classes gone. The **delivery is not at its done-when bar.** Eight seats converged on five blockers.

### ORDER IS LOAD-BEARING (this corrects my earlier prompt): text edits → SHELL-STATUS regen → **reseal LAST** → composite → images.

The single most common way to fail here is to seal, then edit a generated or narrative file, then run the composite on bytes that no longer match the manifest. Attempt 2 died exactly that way.

**FIX 1 — correct the hand-over TEXT first (blocks acceptance; all seats).** Edit `deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- **§1:** "361 OK / 0 FAILED / 0 missing + converse clean, exit 0" → the value you measure after resealing (ERNIE proved **365 OK / 0 FAILED / 0 missing, exit 0** on a scratch copy).
- **§3:** strike the claim that the final composite's step 13b ran F15–F31 and that F27/F28/F29/F30/F31 "DIED by name" at final bytes. The true statement, which §7 and VERIFY §26.9 already carry: F15–F26/F29 died in the **BASELINE** composite; F13/F14/F27/F28/F31 died in **same-bytes smoke runs**; **no F30 or F31 log exists**; the full by-name set at final bytes is the resume item. Change the "V" label or drop it until the receipt exists.
- **§5:** "SHELL-STATUS.md regenerated at the final bytes (composite step 13d)" → the truth until FIX 2 is done.
- **§9:** "The side-by-side is FILED" → "the contract is in code and three right-side captures are filed; the left pairs, receipt and composite doc are NOT filed — two runs died; the next sitting re-runs the script before make-live." Delete the claim that 40 pairs exist.
- **§12:** keep — it is the honest part.
- `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → the resealed measurement and "S14 467 clean, converse clean, exit 0 ×2".
- `deliveries/gh-pages-fix/README.md`: if the stale `284 · 284 pass · 0 fail` line is still present, mark it HISTORICAL in place pointing at FIX-RECEIPT's `286 tests · 277 pass · 9 FAIL — OPEN`.

**FIX 2 — regenerate `SHELL-STATUS.md` (all seats), BEFORE the reseal.** The artifact is stamped `GENERATED 2026-11-21T02:01:03Z`, names `index-BXNAqTAg.css` / `index-BZF5JLE6.js`, prints node 35, and still has "the ring at a fixed seed". The generator is already fixed; the artifact was never regenerated. Run `node tools/shell-status.mjs` and confirm (REPORTED — verify against your bytes):
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
plus `tests 37 · pass 37`, title "top-three treatment at a fixed seed" — no "ring". Let the generator write it; never hand-edit. Also refresh the partial-regen rows in `SLICE-STATUS` (still S14 counts and "L13 the top-three ring").

**FIX 3 — reseal as the LAST write.** Do not hand-edit `CHECKSUMS.txt`:
```
node scripts/regen-manifest.mjs .
node tools/verify-package.mjs .
```
Expected: `365 OK / 0 FAILED / 0 missing (365 entries)`, converse clean, **exit 0**. Do not edit ANY byte after this until the composite finishes.

**FIX 4 — resume the final uninterrupted composite at unchanged bytes:**
```
bash scripts/acceptance-run.sh
```
Expected: steps 1–11 green again, then 12–17b complete with `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt` and the §26.9 tail in `VERIFY-§26-append.txt`. Re-run **F24 and F28 with isolated mutations** (ERNIE/hy4): the baseline showed F24/L24 (the no-display-parse oracle) may be tautological and F28 **RED ELSEWHERE** (it killed L23, not L27). If either stays green under its mutation, re-home the probe the way F27 was fixed — **never loosen the assertion**. Every child log goes under `deliveries/receipts/partH-s15/`, including the missing F30/F31, so "died by name" becomes a file you can point at. Put the command and the "empty = fence holds" verdict into the 0-byte `fence-diff-pinsrc-vs-src-engine.log`.

**FIX 5 — file the Owner-facing visual proof (the make-live condition):**
```
node scripts/side-by-side-s15.mjs
```
Expected: `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md`, `deliveries/receipts/s15-side-by-side.json`, paired PNGs under `shots/side-by-side/` — **five scenes** (Team Select, board with a top-three row, pick confirm, finished draft, and the panel-bearing season screen: the Hub and the S33-proven Settings instance) × 1180×950 and 390×844 × light and dark × both sides, per `claude/visual-acceptance-spec-2026-11-21.md`. Today only three right-side light PNGs exist; both runs died. If the live w89 LEFT side is unreachable, **materialize it from the repo**: `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` into a temp HTML and drive it from `file://` — offline, deterministic, no reference build committed to a lane (my F3). Do not claim pairs that do not exist.

**FIX 6 — file questions, do not edit:** Vite — `package.json` has `"vite": "^7.3.6"` under an Owner-ordered Vite 8; file the byte line + order line to Claude, implement only his answer, rebuild + reseal if he says bump. Hand-over §0/§69 says "ride the hand-over zip" but no zip is present — add zip + `SHA256SUMS-s15.txt` or point to the published folder at its commit. One cosmetic Svelte warning `Unused CSS selector ".cp-sorttoggle"` — fold into the build pass.

**What is true and worth keeping (do not regress):** engine fence empty; D1 both-width fix; node 37/37 incl. N36 stamp + N37 Owner-verbatim brag; `ENGINE_PIN` gone, `metaNow()` stamps running `engineVersion()`; build-time `VITE_BRAG_URL`, button hidden while unset, no download, no seed in paste (P-209); `base:'/'`; a11y span→native `<button>`; ring retirement by name (6 retired, L17–L22 kept); the F27 tautology was fixed by re-homing the probe, not by loosening the law.

**Acceptance flips only when** FIX 1–5 are receipted at final bytes, the composite says COMPLETE, and the image pairs exist. Until then "slices done" is **not true** — your own §12 says so, and hy4's verdict is literally "NOT ACCEPTABLE as a final delivery." A gate PASS is not product acceptance.

## 5 · The server boundary — what is NOT yours

Claude's `server/` is his. **Do not edit `server/`, add `wrangler.jsonc`, wire Better Auth/OAuth, create a D1 schema, wire secrets, or deploy.** The static hand-over contract is only this:
- `vite.config.js` stays `base: '/'`; fetches stay relative `/api/...`; no hardcoded host, no `pages.dev`, no `_redirects`/`_headers`, no wrangler config. **With SPA fallback a typo'd `/api/...` answers `index.html` 200 — the client must treat a non-JSON `/api/*` reply as a transport error, never parse it as data** (pickle §2, hy4 §5).
- `VITE_BRAG_URL` stays empty by default, set only at make-live to the rehearsed hostname (target `play.76pancakes.workers.dev`, **UNKNOWN until the dashboard accepts the subdomain**). The season link button hiding while unset is correct — do not "fix" it.
- `seed` is already at pin `408410477` — **seed does NOT wait for a re-pin**. What waits is `deviceId`, `playerLines`, `pickOverall`, `confSeed`. Do not add any of them yourself.
- Shared `/api/share/:token` read-only view, persistent sync chip and conflict screen are **future**; `/api/stats` is NFL-only for v1. Do not mock them into product UI as if live.
- Owner prerequisites block the rehearsal, not you: free Cloudflare account, `76pancakes` subdomain, GitHub OAuth App, two secrets. Miniflare local D1 needs no credentials — but that is Claude's rehearsal.

**Explicitly not yours to decide:** Owner — Cloudflare account/subdomain, OAuth App/secrets, brag ask-line ("Can you go 20-0?" is the Owner's verbatim and shipped slogan; keep it unless he changes it), S2's save-share ruling, make-live. Claude — the post-merge re-pin (seam golden `e8fed8ab…` must hold), legend fold (weights already written: 100/10/1 INFERRED), Vite ruling, F24/F28 probe re-homing, glass-law scope (`.cp-panel` renders on season screens only — S33 proves nothing on the draft board). MUSE — pin drift, the "Perfect season (20-0)" queue row, verbatim intake, queue hygiene.

## 6 · After the gates: shell work that remains (do not start until §4 is green)

- **Slices 3–5** (feed, shareables) against `dispatchasync-contract-2026-11-20.md`, S14 tree, pin `408410477`, **zero engine bytes**.
- **w89 fidelity:** top-three highlight in the button, the little "why" description under the top three choices, w89's buttons glow with a separate "top" badge, panels restyled toward w89's colour. Ring visual stays removed; top-three meaning stays.
- **Multisport shape (now, not basketball):** hy4's plan, which I endorsed — add a sport-adapter registry and a sport-isolation layer test. Pass a sport id in the client seam now; do not build a second sport.
- **Cross-device stats:** profile `achievements` is a device-local ledger (id/label/at/team, no counters); there is no `legacy-import` run row. Fold achievements from synced `runs` via `/api/stats`; key player-top-season folds by `(player_id, data_version)`. Achievement history is a ledger fold, not a synced blob.

## 7 · Innovation backlog — RECORD after the gates are green; build none in this close-out

Consolidated from all eight S15 reviews (beam A–I, glyph A–G, iceman A–E, porca C/5.x, pickle F1–F9, hy4 1–9, orcatide, ERNIE §7). All are shell-only and engine-safe; the Owner's anti-goals (no scouting, no full GM, no faces, no downloads, no seed in the brag) still bind. File them in your `inbox/` as **one ranked proposal with exact anchors**, not as edits.

1. **Board decision support (highest; beam A, iceman A, ERNIE P0, glyph backlog):** promote `cp-why` into a first-class, dismissible, remembered one-line reason with tap/hover expansion to the exact VM numbers; add a "Δ wins vs next-best" meter, a pick-confidence strip (current pick / next user pick / picks-until-you / gone-risk), and a visible "Undo last pick" rail next to the truthful toast. Keep every number VM-sourced; no new math in the UI. The engine already computes it; the shell never told the user.
2. **One-button clarity (glyph B, orcatide, pickle F5):** one one-session legend ("TOP = one of your top three priorities now; pulse = draftable now"); pulse off when disabled; focus handoff to the first `.cp-draftbtn` on START; min 44 px tap targets; long-name 390 px checks; stagger the pulse with `animation-delay: calc(var(--cp-row-i) * 40ms)` and pause on `.cp-rows:hover` (measure before claiming a perf win); after a pick, focus the button that moved into the row.
3. **Trust/state surfaces (beam G/I, glyph A/D, iceman B, pickle §6):** one calm status bar (engine stamp, shell build token, seed on the owner's own save card, save state, offline indicator); a dev-gated "Build & Proof" drawer; a "Restored from X" banner with explicit "Keep restored / Open shared link" choices; an honest sync chip and receipt badge driven by actual packaging state, never a green lie.
4. **A11y completed (beam E, glyph G, orcatide, ERNIE §7.4):** native `<button>` semantics for flex chips, sort controls and slot picker; `role=status` for toasts, assertive only for errors; rank-aware aria-labels; an axe/role sweep in CI.
5. **Why-copy as data (pickle §6, glyph E, hy4 §6.5):** top-three reasons as a `{headline, detail, sourceStat}` object derived from slot value / flex fit / team need — reproducible, falsifiable, sport-neutral. Hand-written copy drifts; derived copy can be tested. Keep the display-rounded-oracle caveat visible when a tie is INTERIM. On touch there is no hover: tap-expand the why line and carry the sort label (the three are array positions of the *current* sort, not an engine priority) — never parsed text (L24/L25).
6. **Share discipline (pickle §6/F7, glyph C, iceman C, hy4 §6.6):** preview exactly what the single formatter will copy; keep seed, save and private identifiers out of the brag; pre-make-live shows "link goes live on release", never a dead button; no auto-download, no image card unless the Owner asks. A separate, clearly-labelled seed-only "play the same draft" control (seed + team, no picks/save) is fine outside the share screen so the two contracts cannot be confused.
7. **Motion and panels as contracts (beam F, iceman D, orcatide, hy4 §6.7):** motion preference full/subtle/none from one `<html>` attribute with reduced-motion parity; one Panel component contract (radius, blur, border, shadow) so later screens cannot drift from S33.
8. **Dev scenario/receipt mode (iceman E, glyph F, hy4 §6.8):** a gated harness that loads fixed seeds/states and renders the exact board/share/save states the batteries assert — makes side-by-side captures reproducible instead of manual heroics.
9. **Self-enforcing gates (pickle F1/F2/F8, ERNIE §6, porca D, hy4 §6.9):** a `seal.mjs` that regens the manifest, writes UTC + git HEAD, re-runs verify; a `make package` target (`regen → verify → acceptance-run → side-by-side`) refusing any non-zero; `npm run pin:check` diffing `src/engine` vs `architect/.../colors/src`; tiered gates (<5 min smoke per edit, ~20 min browser battery before hand-over, full falsifiers pre-cutover).
10. **Contrast holes (pickle F9):** close the three KNOWN team holes with an OKLCH tint clamp — blend the near-white tint toward white until AA 4.5:1 holds, keeping the three hexes on accents. Owner/Architect visual call; do not touch protected colours.
11. **Future north star, record only (Owner §1.2/§1.4, hy4 §6.9):** spatial badge field and play-calling screen (pfd-01/02, faces replaced by badges) are long-term goals, **not** this close-out and not v1; scope in their own doc after cutover, zero engine bytes.

## 8 · Delivery form and first message back

- **One zip** containing the corrected tree plus new receipts, and a **sha256 list**. Reply **once, only after all work is finished**. If genuinely blocked, say exactly what and what you did instead — do not reply early with work outstanding.
- Every claim carries V/R/I/U and a command + output. A "V" must cite a path that exists — ERNIE's B2 is the cautionary tale (§3 claimed by-name deaths with no logs).
- Do not weaken a law to make a gate pass; re-home the probe as F27 was fixed. Do not hand-edit generated artifacts. No secret, remote font, CDN or new dependency; offline stays hard. English only.
- Open your resume message by naming the tree bytes you are working from and the five blocking items. On finish, give: reseal output (`365 OK / 0 FAILED / 0 missing`, exit 0), the regenerated SHELL-STATUS lines, the composite tail with `ACCEPTANCE RUN COMPLETE`, the F24/F28/F30/F31 child logs, the side-by-side file list, the fence diff (empty, 69 files, `e9e6e01a…`), the zip name + sha256, and the one Vite question you filed. No recap of history, no claims without output.
- If working in a seat worktree: add by path, commit, push `council/zai`, verify with `git ls-remote`, no force-push, no `git stash`, run `node tools/preserve.mjs check` at chat end. The gate currently flags other seats' unsaved work — none of it is yours; do not touch it.

## 9 · What is UNKNOWN from this seat

I did **not** run the S15 browser batteries (board 24/0, shell 53/0, visual 18/0, slot 28/0, slice, contrast) or the full falsifier set at the S15 bytes — REPORTED from in-tree receipts. I did **not** run Miniflare, real D1, Better Auth/Kysely-D1, Google on `workers.dev`, or Rate Limiting on Free — UNKNOWN. Mutation counts on both bodies of work are REPORTED, not reproducible commands. Rehearsal results await Owner provisioning. Do not let this prompt's confidence about what I verified inflate the parts I did not.

## 10 · Weakest point, in one line

Neither body of work is weak in the code — the engine fence is clean, the Worker's one-door boundary is real, and the shell ports w89 faithfully. The weakest point in **both** is receipt hygiene: a verifier that fails on the published S15 tree, generated docs that are stale snapshots, a hand-over claiming deaths the logs do not contain, and an Architect whose "11 mutants killed" is a paragraph rather than a command. Fix the text, the status, the seal, the composite and the image pairs in that order, then commit a mutation gate on the Architect side. The engineering is ahead of its paperwork in both tracks; bring the paperwork up to it and both are ready for the Architect and the Owner.

EVIDENCE: §2, §3 (mine), §4, §8, §9 are VERIFIED or explicitly labelled this sitting (2026-11-21, commits `9c4ca0f` and `25fb85780`). §3 (hy4/ERNIE items), §5, §6, §7 are REPORTED seat receipts or INFERRED proposals, attributed. §1 paths were checked with `git cat-file -e` this sitting. This filing is advisory, names no assignment, and edits no product / engine / pin / governance / queue / `tools/` file.
