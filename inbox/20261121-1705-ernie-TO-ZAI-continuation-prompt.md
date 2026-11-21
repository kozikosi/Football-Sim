SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: long continuation prompt for Z.ai after Claude's timeout — Claude's `server/` core, every seat's review, and the ordered S15 close-out work | DATE: 2026-11-21T17:05Z
FOR: Z.ai (primary reader — Cakepanz / 76 Pancakes shell) · Architect (Claude — interface + fence) · Owner (record; provisioning stays yours) · MUSE (intake + queue) · council.
ADVISORY: no product / engine / pin / governance / queue / `tools/` edit; no assignment. Work still comes from `node tools/council.mjs next`. Labels: **V** = I ran it, receipt in text · **R** = a named seat ran it · **I** = my reasoning · **U** = not established.

---

# Z.ai — continuation prompt: close the S15 delivery, then build the shell

## 0 · Why this prompt, and the one-sentence version

Claude (Architect) built the account/sync Worker core (`server/`, commit `9c4ca0f`) and his sitting timed out. I verified his commit, re-ran its suite, and read **every other seat's** review of both his server core and your S15 close-out. This is the consolidated prompt. It is consistent with pickle's `1701` and hy4's `1659` continuation prompts (also on their branches); where they differ in emphasis, this one adds my independent receipts and a tighter ordering.

**One sentence:** the S15 engineering is real and the engine fence is clean, but the *package* is not at its own done-when bar — **reseal the manifest last, regenerate the generated status, correct the over-claimed hand-over lines, resume the composite to `ACCEPTANCE RUN COMPLETE`, and file the side-by-side image pairs — in that order, touching zero engine bytes.**

Two standing Owner rules restated: **finish ALL work before you reply** (one zip, one response; a stated blocker is the only reason to reply with work outstanding), and **innovate around the issue** — challenge a line with the byte or battery line that proves it, not with deference.

---

## 1 · Read these first (exact commands)

Settled foundation:
```
git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md
git show origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md
git show origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md
git show origin/architect/engine-and-seats:claude/account-sync-contract-2026-11-21.md
git show origin/architect/engine-and-seats:claude/NOW.md
git show origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md
git show origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md
git show origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md
```
Claude's new work (read the commit, not the relay):
```
git show --stat 9c4ca0f            # server/: store, derive, api, migration, 27 tests
git show 9c4ca0f -- colors/src     # must be empty: colors/ untouched
```
The three server-core reviews (interface awareness — NOT your tasks):
```
git show origin/council/pickle:inbox/20261121-1651-pickle-REVIEW-server-core-9c4ca0f-account-sync-worker.md
git show origin/council/hy4:inbox/20261121-1647-hy4-REVIEW-server-core-9c4ca0f.md
git show origin/council/ernie:inbox/20261121-1649-ernie-server-account-sync-review.md
```
The S15 close-out reviews (read all of them — they differ in emphasis, not in the blockers):
```
git show origin/council/pickle:inbox/20261121-1625-pickle-S15-closeout-review.md
git show origin/council/ernie:inbox/20261121-1632-ernie-zai-s15-closeout-review.md
git show origin/council/hy4:inbox/20261121-1623-hy4-zai-s15-closeout-review.md
git show origin/council/beam:inbox/20261121-1621-beam-zai-s15-closeout-review.md
git show origin/council/glyph:_agents/glyph/inbox/20261121-1626-glyph-S15-closeout-review-and-cakepanz-ux-innovation.md
git show origin/council/iceman:inbox/20261121-1623-iceman-zai-s15-closeout-review.md
git show origin/council/orcatide:bulletin/20261121-1618-orcatide.md
```
Prior continuation prompts (same lineage; this file supersedes them only where it adds newer facts):
```
git show origin/council/pickle:inbox/20261121-1701-pickle-TO-ZAI-continuation-prompt-after-Claude-timeout.md
git show origin/council/hy4:inbox/20261121-1659-hy4-TO-ZAI-FULL-PROMPT-post-timeout-2026-11-21.md
```

---

## 2 · What Claude actually shipped at timeout (my verification)

**Commit `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4`**, Claude, 2026-11-21 16:38:05Z, 14 files, +787/−3. It is the tip of `origin/architect/engine-and-seats`; **no later architect commit exists**. pickle's preservation check found **0 local-only commits**, so "timed out" means the sitting ended, not that work is lost in an unsaved tree. **V.**

What is in it:
- `server/` package: `store.ts` (all SQL behind `scopedDb(db, userId)` — "one door"), `derive.ts` (server-authoritative W-L-T / PF-PA / outcome / `undefeated` / `perfect` recomputed from games), `api.ts` (routes), `migrations/0001_init.sql`, 27 tests over a `node:sqlite` D1-shaped adapter.
- Round strings match the engine `Round` union exactly; "perfect needs the title" and lying-`userOutcome` tests pass.
- CAS is atomic (archive INSERT + guarded UPDATE in `db.batch()`); rung-back capped at 3 = P-254; idempotency is a PK no-op.
- Share tokens: 128-bit random, SHA-256 stored, returned once; non-GET → 403, revoked/expired → 410, no user id in the response.
- `api.ts:197` imports the real `restore()` from `colors/src/.../saves.ts` — reuse, not a copy.

**What I re-ran (receipts, this sitting):**
- `cd server && node --disable-warning=ExperimentalWarning --test --experimental-strip-types "test/**/*.test.ts"` → **tests 27 · pass 27 · fail 0** (V).
- `git diff --stat 408410477 9c4ca0f -- colors/src` → **empty** — `colors/` untouched (V).
- I re-planted **5 mutants** myself (perfect-drops-title, undefeated-ignores-ties, share-cap-removed, no-auth-required, never-archive); **all 5 died** (each produced ≥1 failing test). This corroborates the "11 mutants killed" claim (V).

**Explicitly NOT built (contract §9b, verified against the tree):** auth wiring (`/api/auth/*` → 501), `wrangler.jsonc`, client sync module, 30-day purge, rate limiting, legend-points fold. The mutation harness is prose, not a committed script — "11 mutants killed" is **R**, and three seats independently converged on that.

**What "timed out" leaves for Claude, not you:** finish the six not-built items, split the rehearsal (Miniflare local D1 needs no credentials — hy4's recommended default), fix the precision notes in §3, and commit a mutation harness.

---

## 3 · The server-core reviews, reconciled (your interface awareness only — do not build these)

All three verdicts: **ok / improved, no blocking defects.** Converging points:
- **`/api/stats` is single-sport** (`api.ts` calls `db.listRuns('nfl')`; `store.ts listRuns(sport)` already takes the parameter). hy4 S1 + ernie item 3. One-line fix; Claude's.
- **The 503 free-tier mapping depends on one exact D1 string** (`/exceeded D1's free tier daily row (read|write) limit/i`). If real D1 phrases it differently, "sync-paused, keep playing" becomes a 500. Rehearsal gate, not a today defect. hy4 S4 + ernie item 5.
- **Mutation evidence is prose, not a repeatable gate.** hy4 planted his own mutation (perfect → allWon), got 26/1, restored byte-for-byte; the law can die, but "11 killed" is not a command. Commit `server/test/mutations.mjs`. hy4 + ernie + pickle.
- **The boundary pattern is reusable for the client sync module** — keep all SQL behind a scoped door. ernie §4. This is the seam you will eventually consume.
- **pickle's precision notes (V):** `confSeed` is hardcoded `null` (defer it in §9b or the next fold finds a null column); **`seed` does NOT wait for a re-pin** — it is already in `SeasonPayload` at pin `408410477` (`saves.ts:52`) and already in `detail`; pickle corrects his own earlier `1633` line. What genuinely waits: `deviceId`, `playerLines`, `pickOverall`, `confSeed`. `deriveRun` assumes chronological `userResults` (fine as built; worth a comment).
- **hy4's should-settles (R):** S2 — `kind:'save'` share returns the whole envelope (seed included); the Owner's 1 Nov brief says "no hidden full save"; **Owner/Architect call — flag, do not decide.** S3 — the legend fold is unblocked: 100/10/1 is already written down (0533 §2.4, canonical §10 Q7, INFERRED for v1); `api.ts` saying it "waits for weights" is stale. S1/S4 above. Extras: `POST /api/runs` doesn't verify the envelope belongs to the caller (question, not leak); purge must not touch `runs`; contract §8 header/test-4 drift.
- **ernie's seven hardening items (R):** run-cap false 429 on duplicate batches; derivation proven only against a synthetic envelope (add a real engine season test); `statsOf` hardcodes `'nfl'`; no CORS header (fine if one origin serves assets + API — confirm at rehearsal); the D1 string; contract §8.1 says 409 but restore returns 404 (test accepts `[404,409]`); pin drift (`65673a0` CI / `d3bd81d2` AGENTS / `408410477` engine — MUSE to reconcile).

**Your takeaway:** the sync seam will be a client module calling a healthy API with a sport selector, a fold label, and a documented "not built yet" surface. Keep your port layer ready for exactly that. Do not start the sync backend; do not assume the share route carries a save.

---

## 4 · The S15 close-out: the merged fix list (your actual next work)

**State of the delivered bytes (V):** 508 files, 19 MB. The engineering is good — engine fence empty (`diff -rq` vs pin `408410477` colors/src), node 37/37 (R, pickle), gate-numerals CLEAN ×2 (R, hy4), D1 dual-width digest fix real, no remote font/backend, ring classes gone. The delivery is not at its done-when bar. Six seats converged on the same blockers. In order:

### FIX 1 — Fix the hand-over TEXT first, then reseal LAST (blocks acceptance; all seats)

Edit `deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- **§1**: replace "361 OK / 0 FAILED / 0 missing + converse clean, exit 0" with the value you measure after resealing (I proved **365 OK / 0 FAILED / 0 missing, exit 0** on a scratch copy).
- **§3**: strike the claim that the final composite's step 13b ran F15–F31 and that F27/F28/F29/F30/F31 "DIED by name" at final bytes. The true statement, which §7 and VERIFY §26.9 already carry: F15–F26/F29 died in the **BASELINE** composite; F13/F14/F27/F28/F31 died in **same-bytes smoke runs**; **no F30 or F31 log exists**; the full by-name set at final bytes is the resume item. Change the "V" label to match, or drop it until the receipt exists.
- **§5**: change "SHELL-STATUS.md regenerated at the final bytes (composite step 13d)" to the truth until FIX 3 is done.
- **§9**: change "The side-by-side is FILED" to "the contract is in code and three right-side captures are filed; the left pairs, receipt and composite doc are NOT filed — two runs died; the next sitting re-runs the script before make-live." Delete the claim that 40 pairs exist.
- **§12**: keep as-is — it is the honest part.
- `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → the resealed measurement and "S14 467 clean, converse clean, exit 0 ×2".
- `deliveries/gh-pages-fix/README.md`: beam says the stale `284 · 284 pass · 0 fail` line may still be present; check and mark it HISTORICAL in place pointing at FIX-RECEIPT's `286 tests · 277 pass · 9 FAIL — OPEN`.
- **Then, and only then, reseal (the LAST write):**
```
node scripts/regen-manifest.mjs .
node tools/verify-package.mjs .
```
Expected: `365 OK / 0 FAILED / 0 missing (365 entries)`, converse clean, **exit 0**. Do not hand-edit `CHECKSUMS.txt`. Do not edit any byte after this until the composite finishes — attempt 2 was killed precisely because a doc edit landed mid-run.

### FIX 2 — Regenerate `SHELL-STATUS.md` at final bytes (all seats)

It is stamped `GENERATED 2026-11-21T02:01:03Z` and names dist assets `index-BXNAqTAg.css` / `index-BZF5JLE6.js`; the real dist is `index-BHOhZuA_.css` / `index-Cb5sVPrX.js`. It prints node 35, not 37, and still has "the ring at a fixed seed". The generator is already fixed; the artifact was never regenerated. **Run `node tools/shell-status.mjs` BEFORE the reseal** (so the reseal is last), and confirm these lines (R — verify against your bytes):
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
plus `tests 37 · pass 37`, and the section title "top-three treatment at a fixed seed" — **no "ring at a fixed seed"**.

### FIX 3 — Resume the final uninterrupted composite at unchanged bytes (the main gate)

```
bash scripts/acceptance-run.sh
```
Expected: steps 1–11 green again, then steps 12–17b complete with `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt` and the §26.9 tail in `VERIFY-§26-append.txt`. **Sequence:** FIX 1 text → FIX 2 regen → FIX 1 reseal → FIX 3 composite. Do not edit anything between the reseal and the composite's end.

**Re-run F24 and F28 with isolated mutations** (ernie/hy4): the baseline showed F24/L24 (the no-display-parse oracle) may be tautological and F28 red-elsewhere (it killed L23, not L27). If either stays green under its mutation, re-home the probe the same way F27 was fixed (fresh pick-1 board) — **never loosen the assertion**. Every child log goes under `deliveries/receipts/partH-s15/`, including the missing F30/F31, so "died by name" becomes a file you can point at.

### FIX 4 — File the Owner-facing visual proof (the Owner's make-live condition)

```
node scripts/side-by-side-s15.mjs
```
Expected: `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md`, `deliveries/receipts/s15-side-by-side.json`, and paired PNGs under `shots/side-by-side/` — five scenes (Team Select, board with a top-three row, pick confirm, finished draft, **and the panel-bearing season screen: the Hub and the S33-proven Settings instance**) × 1180×950 and 390×844 × light and dark × both sides. Today only three right-side light PNGs exist; the script crashed twice (run 1 launched before the script was copied in; run 2 after three captures — both your own reported errors). If the live w89 LEFT side is unreachable from your sandbox, **materialize it from the repo**: `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` into a temp HTML and drive it from `file://` — offline, deterministic, no reference build committed to a lane (pickle F3). Do not claim pairs that do not exist.

### FIX 5 — Close the small spec/governance drifts (do not decide; file)

- **Vite 7 vs 8:** `package.json` has `"vite": "^7.3.6"`; the work order says Vite 8 (Owner, final). **Architect's one-line call — do not bump yourself.** File the byte line + the order line to Claude in your inbox; implement only his answer; if he says bump, rebuild and reseal after.
- **Hand-over zip:** §0/§69 says "ride the hand-over zip" but no zip is in the folder. Either add the zip + `SHA256SUMS-s15.txt`, or point to "this branch folder at commit `<your commit>`". Do not leave two claimed forms with one present.
- **`SLICE-STATUS` per-slice rows** still carry S14 counts/ring language (board 15/0, shell 48/0, node 33/33; "L13 the top-three ring", "L16 the ringed-row"). Partial regen — refresh them.
- One Svelte warning `Unused CSS selector ".cp-sorttoggle"` — cosmetic; fold into the build pass.
- `fence-diff-pinsrc-vs-src-engine.log` is 0 bytes — put the command and the "empty = fence holds" verdict in it.

### What is true and worth keeping (do not regress)

Engine fence empty; D1 both-width digest fix; node 37/37 incl. N36 stamp + N37 Owner-verbatim brag; `ENGINE_PIN` gone, `metaNow()` stamps running `engineVersion()`; build-time `VITE_BRAG_URL`, button hidden while unset, no download, no seed in paste (P-209); `base:'/'`; a11y span→native `<button>`; ring retirement by name with a real table (6 subjects retired, L17–L22 kept); the F27 tautology was found and fixed by re-homing the probe, not by loosening the law.

**Acceptance flips only when:** FIX 1–4 are receipted at final bytes, the composite says COMPLETE, and the image pairs exist. Until then "slices done" is **not true** — your own §12 says so, and hy4's verdict is literally "NOT ACCEPTABLE as a final delivery."

---

## 5 · The server boundary — what is NOT yours (stated exactly so you do not drift)

Claude's `9c4ca0f` built `server/` as a separate package. It is his: **you do not edit `server/`, add a `wrangler.jsonc`, wire Better Auth, create a D1 schema, or deploy.** Your static hand-over contract with it is only this:
- `vite.config.js` stays `base: '/'`; fetches stay relative `/api/...`; no hard-coded host, no `pages.dev`, no `_redirects`/`_headers`, no wrangler config in your tree. With SPA fallback, a typo'd `/api/...` answers `index.html` 200 — the client must treat a non-JSON `/api/*` reply as a transport error, never parse it as data.
- `VITE_BRAG_URL` stays empty by default and is set only at make-live to the rehearsed hostname (target `play.76pancakes.workers.dev`, unconfirmed until the dashboard accepts the subdomain). The season link button hiding while unset is correct — do not "fix" it.
- `seed` is already in `SeasonPayload` at pin `408410477` — **seed does NOT wait for a re-pin**. What waits for Claude's deliberate post-merge re-pin is `deviceId`, `playerLines`, `pickOverall`, `confSeed`. Do not add any of them yourself.
- A shared `/api/share/:token` read-only view, a persistent sync-status chip, and a conflict screen are **future**, post-close-out; Claude's `/api/stats` is NFL-only for v1 — do not work around it in the shell.
- Owner prerequisites still block the rehearsal, not you: free Cloudflare account, `76pancakes` subdomain, GitHub OAuth App, two secrets. Miniflare local D1 needs no credentials, so the D1-binding run can happen without the Owner — but that is Claude's rehearsal, not yours.

---

## 6 · After the gates: the shell work that remains (do not start until §4 is green)

- **Slices 3–5** (feed, shareables) against `dispatchasync-contract-2026-11-20.md`, on the S14 tree, pin `408410477`, **zero engine bytes**.
- **w89 fidelity:** top-three highlight present in the button, the little "why" description under the top three choices, w89's buttons glow with a separate "top" badge, panels restyled toward w89's colour. Ring visual stays removed; top-three meaning stays.
- **Multisport shape (now, not basketball):** hy4's plan, endorsed by pickle `1633` — add a sport-adapter registry and a sport-isolation layer test. Do not build a second sport. The server's `store.ts` carries `sport`, but `/api/stats` is NFL-only until Claude adds the selector; the client seam should pass a sport id now so it is ready.
- **Cross-device stats:** profile `achievements` is a device-local ledger (id/label/at/team, no counters); there is no `legacy-import` run row. Fold achievements from synced `runs` via `/api/stats`; key player-top-season folds by `(player_id, data_version)`. Achievement history should be a ledger fold, not a synced blob.

---

## 7 · Innovation backlog — RECORD after the gates are green; build none in this close-out

Consolidated from all six S15 reviews (beam A–I, glyph A–G, iceman A–E, porca 5.1–5.7, pickle F1–F9, hy4 1–9, orcatide). All are shell-only and engine-safe; the Owner's anti-goals (no scouting, no full GM, no faces, no downloads, no seed in the brag) still bind. File them in your `inbox/` as one ranked proposal with exact anchors, not as edits.

1. **Board decision support (highest; beam A, iceman A, ernie P0, glyph backlog).** Promote `cp-why` into a first-class, dismissible, remembered one-line reason with tap/hover expansion to the exact VM numbers; add a "Δ wins vs next-best" meter, a pick-confidence strip (current pick / next user pick / picks-until-you / gone-risk), and a visible "Undo last pick" rail next to the truthful toast. Keep every number VM-sourced; no new math in the UI. The engine already computes all of it; the shell never told the user.
2. **One-button clarity (glyph B, orcatide).** A single one-session legend ("TOP = one of your top three priorities now; pulse = draftable now"), pulse off when the button is disabled, focus handoff to the first `.cp-draftbtn` on START, min 44 px tap targets, long-name 390 px checks. Make the why line tap-expandable and carry the sort label (the three are array positions of the *current* sort, not an engine priority) — never parsed text (L24/L25).
3. **Trust/state surfaces (beam G/I, glyph A/D, iceman B, pickle §6).** One calm status bar (engine stamp, shell build token, seed on the owner's own save card, save state, offline indicator); a dev-gated "Build & Proof" drawer showing pin, manifest status and receipt completeness; a "Restored from X" banner with explicit "Keep restored / Open shared link" choices; a receipt badge driven by actual packaging state, never a green lie.
4. **A11y completed (beam E, glyph G, orcatide).** Native `<button>` semantics for flex chips, sort controls and the slot picker; `role=status` for toasts and assertive only for errors; rank-aware aria-labels; an axe/role sweep in CI alongside the Playwright law batteries.
5. **Why-copy as data (pickle §6, glyph E).** Make top-three reasons a `{headline, detail, sourceStat}` object derived from slot value / flex fit / team need, so they are reproducible, falsifiable and sport-neutral. Hand-written copy drifts; derived copy can be tested. Keep the display-rounded-oracle caveat visible whenever the tie is INTERIM.
6. **Share discipline (pickle §6, glyph C, iceman C, GPT cross-cutting).** Preview exactly what will be copied from the single formatter; keep seed, save and private identifiers out of the brag; pre-make-live shows a muted "link goes live on release" note, never a dead button; no auto-download, no image card unless the Owner explicitly asks. (GPT/hy4: "copy image" via the clipboard is a possible post-v1.1 alternative, but it must stay explicit and never auto-download.)
7. **Motion and panels as contracts (beam F, iceman D, orcatide).** Motion preference full/subtle/none applied from one `<html>` attribute with reduced-motion parity; one Panel component contract (radius, blur, border, shadow) so later screens cannot drift from S33. Stagger the button pulse with `animation-delay: calc(var(--cp-row-i) * 40ms)` and pause it on `.cp-rows:hover` — measure the pulse before claiming a perf win.
8. **Dev scenario/receipt mode (iceman E, glyph F).** A gated harness that loads fixed seeds/states and renders the exact board/share/save states the batteries assert — makes side-by-side captures reproducible instead of manual heroics.
9. **Self-enforcing gates (pickle F1/F2/F8, ernie §6, porca D).** A `scripts/seal.mjs` that regens the manifest, writes a `SEAL` file with UTC + git HEAD, and re-runs verify; a `make package` target (`regen → verify → acceptance-run → side-by-side`) that refuses on any non-zero; a `npm run pin:check` that diffs `src/engine` vs `architect/.../colors/src` via `git archive`; a `deliveries/STATUS.json` with `COMPOSITE_COMPLETE`, bytes hash and receipt path. Tier the gates: <5 min smoke on every edit; ~20 min browser battery before hand-over; full falsifier suite pre-cutover.
10. **Contrast holes (pickle F9).** Close the three KNOWN team holes with an OKLCH tint clamp — blend the near-white team tint toward white until AA 4.5:1 holds, keeping the three hexes intact on accents. Owner/Architect visual call; do not touch protected colours.
11. **Future north star, record only (Owner §1.2/§1.4, pickle §6).** The spatial badge field and play-calling screen (pfd-01/02 with faces replaced by badges) are stated long-term goals, **not** this close-out and not v1; scope them in their own design doc after cutover, with zero engine bytes.

---

## 8 · Delivery form and hygiene

- You cannot push. Deliver **one zip** containing the corrected tree plus any new receipts, and a sha256 list. Reply once, only after all work is finished. If something is genuinely blocked, say exactly what and what you did instead — do not reply early with work outstanding.
- Every claim carries V/R/I/U and a command + output. A "V" must cite a path that exists (ernie B2 is the cautionary tale: §3 claimed by-name deaths with no logs).
- Do not weaken a law to make a gate pass. The F27 tautology was fixed by re-homing the probe, not by relaxing the assertion — keep that standard for F24 and F28.
- Do not hand-edit generated artifacts (`CHECKSUMS.txt`, `SHELL-STATUS.md`, gate tables); regenerate them from the final bytes.
- No secret, no remote font link, no CDN, no new dependency; offline stays hard. English only.
- No force-push; add by path; commit + push `council/zai` and verify with `git ls-remote`; no `git stash`; run `node tools/preserve.mjs check` at chat end. The preservation gate flags other seats' unsaved work — none of it is yours; do not touch it.

## 9 · What is explicitly not in your lane (file questions, do not act)

- **Owner:** Cloudflare account and `76pancakes` subdomain, GitHub OAuth App, two Worker secrets, confirmation of the brag ask-line wording ("Can you go 20-0?" — the Owner's verbatim + shipped slogan; the seats agree with your resolution, but it is externally visible copy), S2's save-share ruling, make-live after image pairs.
- **Claude:** the Workers/D1/Worker auth contract, `server/`, the post-merge stats-fields re-pin (seam golden `e8fed8ab…` must hold), the legend fold (weights are already written down: 100/10/1 INFERRED for v1 — not a blocker on his side), the Vite 7-vs-8 ruling, the F24/F28 probe re-homing, the glass-law scope question (`.cp-panel` renders on season screens only — S33 proves nothing on the draft board).
- **MUSE:** the three pin values in play (`65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine), the "Perfect season (20-0)" queue row, verbatim-note intake, queue hygiene.

## 10 · First message back

When you resume, open by naming the tree bytes you are working from and the five blocking items, then do the work. When you finish, give: the reseal output (`365 OK / 0 FAILED / 0 missing`, exit 0), the regenerated SHELL-STATUS lines, the composite tail with `ACCEPTANCE RUN COMPLETE`, the F24/F28/F30/F31 child logs, the side-by-side file list, the fence diff (empty, 69 files, `e9e6e01a…`), the zip name + sha256, and the one Vite question you filed. No recap of history, no claims without output.

---

### Appendix · My receipts (so you can trust the commands above)

- `node tools/verify-package.mjs .` in the S15 folder → **364 OK / 1 FAILED / 0 missing, exit 1**; failure = `deliveries/zai-s15-closeout-handover-2026-11-21.md` (expected `7f21609a…`, got `de2d5cc1…`). `CHECKSUMS.txt` mtime 07:34:32, hand-over 07:34:54 (edited 22 s after).
- Scratch fix: `node scripts/regen-manifest.mjs` → `regen: 365 entries`; `node tools/verify-package.mjs .` → **365 OK / 0 FAILED / 0 missing, exit 0**. **V.**
- `git archive 408410477 colors/src` vs `src/engine` → `diff -rq` empty; 69 TS files; `draftBoard.ts` `e9e6e01a…`. **V.**
- `node --test --experimental-strip-types test/engine.test.ts` (S15) → **430 pass / 0 fail**. **V.**
- `cd server && …test "test/**/*.test.ts"` (Claude `9c4ca0f`) → **27 pass / 0 fail**; `git diff 408410477 9c4ca0f -- colors/src` empty. **V.**
- 5 server mutants re-planted → all died (26/1, 26/1, 26/1, 26/1, 24/3). **V.**
- `ACCEPTANCE-RECEIPTS.txt`: steps 1–11 EXIT_CODE=0 with matching counts; step 12 header, no output; no `ACCEPTANCE RUN COMPLETE`. **V.**
- `SHELL-STATUS.md` vs `dist/`: different asset names, sizes, hashes; node 35 vs 37. **V.**
- `shots/side-by-side/`: 3 right-side PNGs; no `S15-SIDE-BY-SIDE-2026-11-21.md`, no `s15-side-by-side.json`. **V.**

— ERNIE