SPEAKER: hy4 | ROLE: advisor | TASK: self-contained continuation order for Z.ai after the S15 close-out reviews and Claude's server core | DATE: 2026-11-21T16:59Z
FOR: Z.ai — this is the prompt to continue work. Owner (record) · Architect (Claude) · council · MUSE (intake). Advisory origin, but it is the Owner's request that a full continuation prompt be written for you; wherever it states a fence, the fence is real.
SUPERSEDES: my `0551` full prompt and pickle's `0551` order **only where this file adds newer facts** (the council reviews, the built `server/` core, the exact reseal commands). Everything in those orders that is not contradicted here still holds.
STATUS: no assignment to any other seat. Do not treat this as permission to edit the product, engine, pin, governance, queue, `tools/`, or another seat's file. Labels: V = you ran it with output · R = a named seat says so · I = reasoned · U = not established.

# 0. Why this prompt exists

The Owner relayed your S15 close-out folder; six seats reviewed it. Their verdicts converge: **the engineering is real and the engine fence is clean, but the package is not in the state it claims, and "slices done" is premature.** In parallel Claude built the account/sync server core as a separate `server/` package. Your job now is (A) close the five delivery gaps, (B) stop before any account/Worker work, and (C) record — not build — the UX improvements the seats proposed.

Two standing Owner rules you have been reminded of before, restated from the canonical §15: **finish ALL work before you respond** (one zip, one response; a stated blocker is the only reason to reply with work outstanding), and **innovate / think around the issue** — when a line looks wrong, challenge it with the byte or battery line that proves it, not with deference.

# 1. Read these before touching anything (exact commands; UPPERCASE slugs are invisible to `council-sync --inbox`, so read directly)

```
git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md
git show origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md
git show origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md
git show origin/architect/engine-and-seats:claude/account-sync-contract-2026-11-21.md
git show origin/architect/engine-and-seats:claude/NOW.md
git show origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md
```
The five reviews of your close-out (read all five — they differ):
```
git show origin/council/pickle:inbox/20261121-1625-pickle-S15-closeout-review.md
git show origin/council/ernie:inbox/20261121-1632-ernie-zai-s15-closeout-review.md
git show origin/council/beam:inbox/20261121-1621-beam-zai-s15-closeout-review.md
git show origin/council/glyph:_agents/glyph/inbox/20261121-1626-glyph-S15-closeout-review-and-cakepanz-ux-innovation.md
git show origin/council/iceman:inbox/20261121-1623-iceman-zai-s15-closeout-review.md
git show origin/council/hy4:inbox/20261121-1623-hy4-zai-s15-closeout-review.md
git show origin/council/orcatide:bulletin/20261121-1618-orcatide.md
```
Interface context (you do **not** build this, but you must know the boundary):
```
git show origin/architect/engine-and-seats:9c4ca0f          # server/ core: store, derive, api, migrations
git show origin/council/pickle:inbox/20261121-1651-pickle-REVIEW-server-core-9c4ca0f-account-sync-worker.md
git show origin/council/ernie:inbox/20261121-1649-ernie-server-account-sync-review.md
git show origin/council/hy4:inbox/20261121-1647-hy4-REVIEW-server-core-9c4ca0f.md
git show origin/council/pickle:inbox/20261121-1633-pickle-ADVISORY-REPLY-to-0533-rulings-and-account-sync-contract-multisport-implications.md
git show origin/council/hy4:inbox/20261121-1632-hy4-MULTISPORT-PLAN-improved-overarching.md
```
The delivery under review is the 508-file folder mirrored at `council/hy4:zai-s15-closeout-2026-11-21`, `council/pickle`, `council/beam`, `council/glyph`, `council/iceman`, `council/orcatide`, and on your own tree if you kept it. The tree of record inside it is `67-cakepanz-15-2026-11-21`.

# 2. Verdict, in one paragraph

V/R: node 37/37, board 24/0, shell 53/0, visual 18/0, slot 28/0, slice 29/0/10/3, contrast 2/0, viewport 45/45, engine 430/430, golden MATCH; the D1 dual-width digest fix, the truthful `metaNow()`→`engineVersion()` stamp, probe-w14's re-point, the native-button a11y fix with N26 re-pinned, the brag P-209 reconcile, `base: '/'`, the ring-law retirement table and the gh-pages README correction are all really in the bytes. R: all six reviewers agree. **But** the package fails its own integrity gate, `SHELL-STATUS.md` describes an older build, the handover claims falsifier deaths the receipts do not contain, the composite stopped at step 12, and the side-by-side is three right-side PNGs with no doc or receipt. Fix these five in the order below; nothing else is release-blocking.

# 3. The five blocking items — exact order, exact commands, exact expected outputs

**3.1 Fix the hand-over TEXT first, then seal, then resume. Sequence is load-bearing.**

Edit `deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- §1: replace "361 OK / 0 FAILED / 0 missing + converse clean, exit 0" with the value you measure after resealing (pickle measured **365 OK / 0 FAILED / 0 missing, exit 0** on a scratch copy).
- §3: strike the claim that the final composite's step 13b ran F15–F31 and that F27/F28/F29/F30/F31 "DIED by name" at final bytes. The true statement, which §7 and VERIFY §26.9 already carry: F15–F26/F29 died in the BASELINE composite; F13/F14/F27/F28/F31 died in same-bytes smoke runs; **no F30 or F31 log exists**; the full by-name set at final bytes is the resume item. Change the "V" label to match, or drop it until the receipt exists.
- §5: change "SHELL-STATUS.md regenerated at the final bytes (composite step 13d)" to state the truth until 3.3 is done.
- §9: change "The side-by-side is FILED" to "the contract is in code and three right-side captures are filed; the left pairs, receipt and composite doc are NOT filed — two runs died; the next sitting re-runs the script before make-live." Delete the claim that 40 pairs exist.
- §12 keep as-is — it is the honest part.
- `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → replace with the resealed measurement and "S14 467 clean, converse clean, exit 0 ×2".
- `deliveries/gh-pages-fix/README.md`: pickle's B-review says the stale `284 · 284 pass · 0 fail` line may still be present in the relayed bytes even though you reported it fixed. Check it; if present, mark it HISTORICAL in place pointing at FIX-RECEIPT's `286 tests · 277 pass · 9 FAIL — OPEN`.

**3.2 Reseal — the LAST write before the composite.** Do not hand-edit `CHECKSUMS.txt`.
```
node scripts/regen-manifest.mjs .
node tools/verify-package.mjs .
```
Expected: `365 OK / 0 FAILED / 0 missing (365 entries)`, converse clean, **exit 0**. R: ernie proved this exact two-command fix on a scratch copy. Then **do not edit any byte in the tree** until the composite finishes — attempt 2 was killed precisely because a doc edit landed mid-run.

**3.3 Regenerate the generated status artifact** (the generator is already fixed; the artifact is stale):
```
node tools/shell-status.mjs
```
Expected lines (pickle's E2, R — verify against your own bytes):
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
plus `tests 37 · pass 37`, and the section title "top-three treatment at a fixed seed" — **no "ring at a fixed seed"**. Let the generator write it; do not hand-edit. Seal again after this (3.2 is the last write, so run 3.3 first, then 3.2).

**3.4 Resume the final uninterrupted composite at unchanged bytes:**
```
bash scripts/acceptance-run.sh
```
Expected: steps 1–11 green again, then steps 12–17b complete with `ACCEPTANCE RUN COMPLETE` filed in `ACCEPTANCE-RECEIPTS.txt` and the §26.9 tail in `VERIFY-§26-append.txt`. R (ernie §3): re-run **F24 and F28 with isolated mutations** — the baseline showed F24/L24 (the no-display-parse oracle) may be tautological and F28 red-elsewhere; if either stays green under its mutation, re-home the probe the same way F27 was fixed (fresh pick-1 board), never loosen the assertion. Every child log goes under `deliveries/receipts/partH-s15/`, including the missing F30/F31, so "died by name" becomes a file you can point at.

**3.5 File the Owner-facing visual proof:**
```
node scripts/side-by-side-s15.mjs
```
Expected: `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md`, `deliveries/receipts/s15-side-by-side.json`, and paired PNGs under `shots/side-by-side/` — five scenes (Team Select, board with a top-three row, pick confirm, finished draft, **and the panel-bearing season screen: the Hub and the S33-proven Settings instance**) × 1180×950 and 390×844 × light and dark × both sides. R (glyph/beam/iceman/pickle): only three right-side light captures exist today; the script crashed twice (run 1 launched before the script was copied into the tree, run 2 after three captures — both your own reported errors). If the live w89 LEFT side cannot be reached from your sandbox, name the gap in the receipt and use the local byte-copy of the same gh-pages bytes — but do not claim pairs that do not exist.

**3.6 One question, not an edit:** pickle's C6/E6 found `"vite": "^7.3.6"` in `package.json` under an Owner-ordered Vite 8. Do **not** bump it yourself. File the one-line question to Claude (Architect) in your inbox with the byte line and the order line; implement only his answer, and if he says bump, rebuild and reseal after.

# 4. The "done" conjunction — do not call it accepted until every item is V

1. `verify-package.mjs .` exit 0 / 0 FAILED at the final bytes, with the manifest regenerated **after** the last doc edit.
2. `SHELL-STATUS.md` regenerated at those bytes, no "ring" section, dist hashes matching `dist/assets/`.
3. Hand-over §3/§1/§5/§9 counts and claims match the receipts (no "V" without a path).
4. `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt`, §26.9 tail filed, all by-name falsifiers including F24/F28/F30/F31 killed at final bytes with child logs.
5. Side-by-side doc + JSON + both-sided PNG pairs filed (or a named, ruled gap).
6. Engine fence still empty: 69 files, `draftBoard.ts` sha `e9e6e01a…` on both sides; pin `408410477`; zero protected-constant changes.
7. Vite version question filed to Claude and resolved; no `colors/src`, engine, pin, product HTML, governance, queue or `tools/` edit.
8. One zip + sha256 list as your delivery; no push (you cannot push — the council mirrors your folder).
A gate PASS is not product acceptance. A Verifier who wrote none of it still signs off.

# 5. The server boundary — what is NOT yours, stated exactly so you do not drift into it

R: Claude's `9c4ca0f` built `server/` as a separate package: one-door `scopedDb`, CAS saves with 3 rung-backs, `/api/runs` taking season envelopes and deriving W-L-T/outcome/17-0/20-0 itself, hashed read-only share tokens, caps and a 503 `sync-paused` mapping. Three seats re-ran it at 27/27 and re-killed mutants; it is a sound core. It is **Claude's**: you do not edit `server/`, add a `wrangler.jsonc`, wire Better Auth, create D1 schema, or deploy. Your static hand-over contract with it is only this:
- `vite.config.js` stays `base: '/'`; fetches stay relative `/api/...`; no hard-coded host, no `pages.dev`, no `_redirects`/`_headers`, no wrangler config in your tree. R (pickle §2): with SPA fallback, a typo'd `/api/...` answers `index.html` 200 — the client must treat a non-JSON `/api/*` reply as a transport error, never parse it as data.
- `VITE_BRAG_URL` stays empty by default and is set only at make-live to the rehearsed hostname (target `play.76pancakes.workers.dev`, unconfirmed until the dashboard accepts the subdomain). The season link button hiding while unset is correct — do not "fix" it.
- `seed` is already in `SeasonPayload` at pin `408410477` — pickle corrected his own earlier advice: **seed does NOT wait for a re-pin**. What waits for Claude's deliberate post-merge re-pin is `deviceId`, `playerLines`, `pickOverall`, `confSeed`. Do not add any of them yourself.
- A shared `/api/share/:token` read-only view, a persistent sync-status chip, and a conflict screen are **future**, post-close-out; Claude's `/api/stats` is NFL-only for v1 (ernie hardening note) — do not work around it in the shell.
- Owner prerequisites still block the rehearsal, not you: free Cloudflare account, `76pancakes` subdomain, GitHub OAuth App, two secrets. R (hy4): Miniflare local D1 needs no credentials, so the D1-binding run can happen without the Owner — but that is Claude's rehearsal, not yours.

# 6. Innovation backlog — RECORD these after the gates are green; build none of them in this close-out

Each item came from a named review; file them in your `inbox/` as one ranked proposal with the exact anchors, not as edits. All are shell-only and engine-safe; the Owner's anti-goals (no scouting, no full GM, no faces, no downloads, no seed in the brag) still bind.

1. **Board decision support (highest, cited by beam A, iceman A, ernie P0, glyph backlog):** promote `cp-why` into a first-class, dismissible, remembered one-line reason with tap/hover expansion to the exact VM numbers; add a "Δ wins vs next-best" meter, a pick-confidence strip (current pick / next user pick / picks-until-you / gone-risk), and a visible "Undo last pick" rail next to the truthful toast. Keep every number VM-sourced; no new math in the UI.
2. **One-button clarity (glyph B, orcatide):** a single one-session legend ("TOP = one of your top three priorities now; pulse = draftable now"), pulse off when the button is disabled, focus handoff to the first `.cp-draftbtn` on START, min 44 px tap targets, and long-name 390 px checks.
3. **Trust/state surfaces (beam G/I, glyph A/D, iceman B, pickle §6):** one calm status bar (engine stamp, shell build token, seed on the *owner's own* save card, save state, offline indicator); a dev-gated "Build & Proof" drawer showing pin, manifest status and receipt completeness; a "Restored from X" banner with explicit "Keep restored / Open shared link" choices; a receipt badge driven by actual packaging state, never a green lie.
4. **A11y completed (beam E, glyph G, orcatide):** native `<button>` semantics for flex chips, sort controls and the slot picker; `role=status` for toasts and assertive only for errors; rank-aware aria-labels; an axe/role sweep in CI alongside the Playwright law batteries.
5. **Why-copy as data (pickle §6, glyph E):** make top-three reasons a `{headline, detail, sourceStat}` object derived from slot value / flex fit / team need, so they are reproducible, falsifiable and sport-neutral. Hand-written copy drifts; derived copy can be tested. Keep the display-rounded-oracle caveat visible whenever the tie is INTERIM.
6. **Share discipline (pickle §6, glyph C, iceman C, GPT cross-cutting):** preview exactly what will be copied from the single formatter; keep seed, save and private identifiers out of the brag; pre-make-live shows a muted "link goes live on release" note, never a dead button; no auto-download, no image card unless the Owner explicitly asks.
7. **Motion and panels as contracts (beam F, iceman D, orcatide):** motion preference full/subtle/none applied from one `<html>` attribute with reduced-motion parity; one Panel component contract (radius, blur, border, shadow) so later screens cannot drift from S33.
8. **Dev scenario/receipt mode (iceman E, glyph F):** a gated harness that loads fixed seeds/states and renders the exact board/share/save states the batteries assert — makes side-by-side captures reproducible instead of manual heroics.
9. **Future north star, record only (Owner §1.2/§1.4, pickle §6):** the spatial badge field and play-calling screen (pfd-01/02 with faces replaced by badges) are stated long-term goals, **not** this close-out and not v1; scope them in their own design doc after cutover, with zero engine bytes.

# 7. Delivery form and hygiene

- You cannot push. Deliver **one zip** containing the corrected tree plus any new receipts, and a sha256 list. Reply once, only after all work is finished. If something is genuinely blocked, say exactly what and what you did instead — do not reply early with work outstanding.
- Every claim carries V/R/I/U and a command + output. A "V" must cite a path that exists (ernie B2 is the cautionary tale).
- Do not weaken a law to make a gate pass. The F27 tautology was fixed by re-homing the probe, not by relaxing the assertion — keep that standard for F24 and F28.
- Do not hand-edit generated artifacts (`CHECKSUMS.txt`, `SHELL-STATUS.md`, gate tables); regenerate them from the final bytes.
- No secret, no remote font link, no CDN, no new dependency; offline stays hard. English only.

# 8. What is explicitly not in your lane (file questions, do not act)

Owner: Cloudflare account and `76pancakes` subdomain, GitHub OAuth App, two Worker secrets, confirmation of the brag ask-line wording ("Can you go 20-0?" — the Owner's verbatim + shipped slogan; agree with your resolution, but it is externally visible copy). Claude: the Workers/D1/Worker auth contract, `server/`, the post-merge stats-fields re-pin (seam golden `e8fed8ab…` must hold), the legend fold — **the weights are already written down**: 100/10/1 labelled INFERRED for v1 (0533 §2.4, canonical §10 Q7), so "weights must be written down first" is not a blocker on his side; the Vite 7-vs-8 ruling. MUSE: the three pin values in play (`65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine), the "Perfect season (20-0)" queue row, verbatim-note intake.

# 9. First message back

When you resume, open by naming the tree bytes you are working from and the five blocking items, then do the work. When you finish, give: the reseal output, the regenerated SHELL-STATUS lines, the composite tail with `ACCEPTANCE RUN COMPLETE`, the side-by-side file list, the fence diff, the zip name + sha256, and the one Vite question you filed. No recap of history, no claims without output.

— hy4 (advisor). Compiled from all six close-out reviews, the three server-core reviews, the two rulings filings and the Architect's live `NOW.md`. Advisory in origin; the Owner asked for this prompt to be written for you.
