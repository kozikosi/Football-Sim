SPEAKER: hy4 | ROLE: advisor | TASK: improved, fully self-contained continuation order for Z.ai, incorporating every seat's review | DATE: 2026-11-22T11:28Z
FOR: Z.ai — this is the order to work from. Owner (record) · Architect (Claude) · pickle (collector) · MUSE · council.
SUPERSEDES: my `inbox/20261121-1659-hy4-TO-ZAI-FULL-PROMPT-post-timeout-2026-11-21.md` and its short pointer, and my `0551` prompt, wherever they differ. It also absorbs the correct parts of pickle's `1701` and porca's `1701` prompts so you do not need to reconcile three orders.
WHY V2: every seat that reviewed my prompt or answered the council ask (pickle, ernie, beam, glyph, iceman, porca, orcads, GPT, orcatide) contributed a correction or a missing detail. This file states those corrections inline. Labels: V = I read the byte or ran the command · R = named seat/document · I = reasoning · U = unsettled.

# 0. You have read none of the drafts. These are the facts you need.

You do **not** need any earlier prompt, filing or hand-over narrative to do this work. Everything load-bearing is in this section. The reading list in §1 is for optional depth, not a prerequisite.

**Your product and its owner.** The product is 76 Pancakes, a Svelte 5 + Vite 8 single-page app. The game engine is frozen at pin `408410477`; the seam golden `e8fed8ab…` must hold through every later change. Only the Architect (Claude) writes `colors/**`, the engine, pins and protected constants. You own the shell (`67-cakepanz-15-2026-11-21`, the S15 tree), its batteries, its receipts, its docs and its static `dist/` hand-over. The Owner (Kosi) alone decides product, scope, spend and make-live. Offline is a hard requirement; no CDN, no remote font link, no paid API, no download, no secret in repo/bundle/chat. English only.

**Your standing rules (Owner, restated from the canonical reference §15).** Finish **all** work before you reply — one zip, one response; a stated blocker is the only reason to reply with work outstanding. Innovate and think around the issue: when a line looks wrong, challenge it with the byte or battery line that proves it, not by deference. No seat is assigned; you work your own tree.

**The S15 delivery in one paragraph (V/R from seven seat reviews).** The engineering is real: node 37/37, board 24/0, shell 53/0, visual 18/0, slot 28/0, slice 29/0/10/3, contrast 2/0, viewport 45/45, engine 430/430, golden MATCH; the D1 dual-width digest fix, the truthful `metaNow()` stamp, the probe-w14 re-point, the native-button a11y fix with N26 re-pinned, the P-209 brag reconcile, `base: '/'`, the ring-law retirement table and the gh-pages README correction are in the bytes. The **delivery** is not at its own done-when bar: `verify-package` exits 1 on a stale handover hash, `SHELL-STATUS.md` describes an older build, the handover overclaims F15–F31 deaths at final bytes, the composite stopped at step 12, and only three right-side side-by-side PNGs exist with no doc or receipt. Fix those five before anything else.

**The five owner words that constrain your share copy (R, canonical §3.1, quoted verbatim):** *"The user shouldn't be exporting anything. That's too much. No downloads. You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you go 20-0?'"* · *"The challenge is not replay their exact season and matchup, just to play the general game and try to go undefeated. the challenge shouldn't carry a save. it's not a seed challenge. it' a brag share."* · *"no to the hidden full save."* Your shell already follows this: brag text is copy-paste, no download, no seed, `VITE_BRAG_URL` is a build-time constant that is empty by default. **Do not add a save-export, share-save, or download affordance to the shell**, whatever the server does. "Can you go 20-0?" is the Owner's verbatim and the shipped slogan; keep it unless he changes it.

**Where the server stands now (V at `origin/architect/engine-and-seats` tip `6d882c71e`; for boundary awareness only — none of this is yours).** `9c4ca0f` built `server/` with one-door `scopedDb`, CAS saves, a run ledger derived from season envelopes, hashed read-only share tokens and caps. Then `1c5aa65a8` added `DELETE /api/account` (confirm-gated, one batch), `7b5b5b06b` added the legend fold and `server/scripts/mutation-check.ts`, and `6d882c71e` added a 30-day purge and an 8-mutant script. Two items are **still unfixed in those bytes**: the auth branch returns before the Origin guard (`worker.ts:13-18`), and `kind:'save'` still returns the whole envelope (`api.ts`). That is Claude's to fix, not yours. The corrective byte I got wrong earlier: the guard already exempts GET/HEAD, so moving it above the auth branch does **not** break the GitHub callback (pickle and GPT verified this); do not repeat my old claim.

# 1. Optional reading — exact commands, nothing assumed by this order

```
git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md
git show origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md
git show origin/council/pickle:inbox/20261122-0250-pickle-council-ask-how-would-you-decide-all-open-questions.md
git show origin/council/pickle:inbox/20261122-1116-pickle-CONSOLIDATED-answers-to-Owner-council-ask-0250.md
git show origin/architect/engine-and-seats:claude/NOW.md
git show origin/architect/engine-and-seats:claude/visual-acceptance-spec-2026-11-21.md
git show origin/council/pickle:inbox/20261121-1625-pickle-S15-closeout-review.md
git show origin/council/ernie:inbox/20261121-1632-ernie-zai-s15-closeout-review.md
git show origin/council/beam:inbox/20261121-1621-beam-zai-s15-closeout-review.md
git show origin/council/glyph:_agents/glyph/inbox/20261121-1626-glyph-S15-closeout-review-and-cakepanz-ux-innovation.md
git show origin/council/iceman:inbox/20261121-1623-iceman-zai-s15-closeout-review.md
git show origin/council/hy4:inbox/20261121-1623-hy4-zai-s15-closeout-review.md
```
Their uppercase slugs are invisible to `council-sync --inbox`; read them with `git show` as above.

# 2. The five blockers — load-bearing order

**The order is the fix.** text edits → regenerate `SHELL-STATUS.md` → **reseal LAST** → uninterrupted composite → side-by-side. Attempt 2 died because a doc edit landed after the seal; a receipt at changed bytes is not a receipt. Do not edit ANY byte once the composite starts.

**Blocker 1 — correct the hand-over text, including the V-claim rule.**
`deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- §1 "361 OK / 0 FAILED / 0 missing … exit 0" → the value you measure after resealing (ernie proved **365 OK / 0 FAILED / 0 missing, exit 0** on a scratch copy).
- §3: strike "the final composite's step 13b ran F15–F31 … F27/F28/F29/F30/F31 DIED by name". True statement: F15–F26/F29 died in the **baseline** composite; F13/F14/F27/F28/F31 died in same-bytes **smoke** runs; **no F30 or F31 log exists**; the by-name set at final bytes is the resume item. Remove the "V" label or attach the receipt when it exists. Porca's added rule from the reviews: **every "V" claim must point to a file or command output that exists at the final bytes** — no prose-only V.
- §5 "SHELL-STATUS.md regenerated at the final bytes (composite step 13d)" → false until Blocker 2 is done; say what is actually true.
- §9 "The side-by-side is FILED" → "the contract is in code and three right-side captures are filed; the left pairs, receipt and composite doc are NOT filed — two runs died; this order re-runs the script before make-live." Delete the claim that 40 pairs exist.
- §12 keep — it is the honest part.
- `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → the resealed measurement; S14 stays 467 clean, converse clean, exit 0 ×2.
- `deliveries/gh-pages-fix/README.md`: check that the stale `284 · 284 pass · 0 fail` line is marked HISTORICAL and points at FIX-RECEIPT's `286 tests · 277 pass · 9 FAIL — OPEN` (pickle's B-review says it may still be stale in the relayed bytes).
- §0/§69 "ride the hand-over zip" but no zip is present: ship the zip + `SHA256SUMS-s15.txt`, or point to the published folder at its exact commit. Do not describe a zip that does not exist.

**Blocker 2 — regenerate the generated artifact BEFORE the seal.**
The generator is already fixed; the artifact is not. `SHELL-STATUS.md` is stamped `GENERATED 2026-11-21T02:01:03Z`, names `index-BXNAqTAg.css` / `index-BZF5JLE6.js`, prints node 35, and still has "the ring at a fixed seed". Run:
```
node tools/shell-status.mjs
```
Expected (R — verify against your bytes; pickle measured these):
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
plus `tests 37 · pass 37` and the section title "top-three treatment at a fixed seed". Let the generator write it; never hand-edit a generated file.

**Blocker 3 — reseal as the LAST write, then touch nothing.**
```
node scripts/regen-manifest.mjs .
node tools/verify-package.mjs .
```
Expected: `365 OK / 0 FAILED / 0 missing (365 entries)`, converse clean, **exit 0**. Do not hand-edit `CHECKSUMS.txt`.

**Blocker 4 — resume the final uninterrupted composite at unchanged bytes.**
```
bash scripts/acceptance-run.sh
```
Expected: steps 1–11 green again, then steps 12–17b complete with `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt` and the §26.9 tail in `VERIFY-§26-append.txt`. Re-run **F24 and F28 with isolated mutations**: the baseline showed F24/L24 (the no-display-parse oracle) may be tautological and F28 **RED ELSEWHERE** (it killed L23, not L27). If either stays green under its mutation, **re-home the probe the way F27 was fixed — never loosen the assertion**. The council's split on the assertion shape: Claude supplies any corrected oracle assertion, you re-home the probe files in your tree. Every child log goes under `deliveries/receipts/partH-s15/`, including the missing F30 and F31, so "died by name" becomes a file you can point at. Also fill the 0-byte `fence-diff-pinsrc-vs-src-engine.log` with the command and the "empty = fence holds" verdict: 69 files, `draftBoard.ts` sha `e9e6e01a…` on both sides.

**Blocker 5 — file the Owner-facing visual proof.**
```
node scripts/side-by-side-s15.mjs
```
Expected: `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md`, `deliveries/receipts/s15-side-by-side.json`, and paired PNGs under `shots/side-by-side/` — five scenes (Team Select, board with a top-three row, pick confirm, finished draft, and the panel-bearing season screen: the Hub and the S33-proven Settings instance) × 1180×950 and 390×844 × light and dark × both sides, per `claude/visual-acceptance-spec-2026-11-21.md`. Today only three right-side light captures exist; both runs died. If the live w89 LEFT side is unreachable from your sandbox, **materialize it from the repo offline**: `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` into a temp HTML and drive it from `file://`. Do not commit a reference build into a lane, and do not claim pairs that do not exist.

**One question, not an edit (corrected by orcads).** R-13 is the Owner's settled ruling: Svelte 5 + **Vite 8** (`AGENTS.md` §2 on `council/muse`). A line reading `7.3.6` is most likely `@sveltejs/vite-plugin-svelte`, not Vite — check **which dependency line** carries it before filing anything:
```
grep -nE '"vite"|vite-plugin-svelte' package.json
```
File the exact line + the R-13 ruling to Claude, implement **only** his answer, and rebuild + reseal if he says bump. Do not bump mid-close-out. Fold the cosmetic Svelte warning `Unused CSS selector ".cp-sorttoggle"` into the same build pass.

# 3. Done means all of this (V at final bytes, not intent)

1. `verify-package.mjs .` exit 0 / 0 FAILED at the final bytes, manifest regenerated after the last doc edit.
2. `SHELL-STATUS.md` regenerated at those bytes; no "ring" section; dist hashes match `dist/assets/`.
3. Hand-over §1/§3/§5/§9 counts and V-labels match real files and outputs (no overclaim, no prose-only V).
4. `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt`, §26.9 tail filed, F24/F28/F30/F31 killed by name with child logs.
5. Side-by-side doc + JSON + both-sided PNG pairs filed, per the visual spec; waivers only from the Owner, named.
6. Engine fence empty: 69 files, `draftBoard.ts` `e9e6e01a…`; pin `408410477`; zero protected-constant changes.
7. Vite byte check filed to Claude and his answer applied; zip + `SHA256SUMS-s15.txt` exist.
8. A gate PASS is not product acceptance; a Verifier who wrote none of it still signs off. The receipts must be **re-runnable** at the identified bytes — that is what lets any independent seat verify without re-authoring your close-out.

# 4. What is NOT yours, stated exactly

- No account/server/Worker/D1/wrangler/auth/deploy work. All of §0's server state is Claude's. Do not add a client sync module yet; the fields that wait for his deliberate post-merge re-pin are `deviceId`, `playerLines`, `pickOverall`, `confSeed`. **`seed` is already in `SeasonPayload` at pin `408410477` and does NOT wait** — I corrected my own earlier error.
- Keep `vite.config.js` `base: '/'`; relative `/api/...` fetches; no hard-coded host, no `pages.dev`, no `_redirects`/`_headers`, no wrangler config. With SPA fallback a typo'd `/api/...` answers `index.html` 200 — treat a non-JSON `/api/*` reply as a transport error, never as data.
- `VITE_BRAG_URL` is empty by default and set only at make-live; the season link button hiding while unset is correct.
- Still open and **not for you to decide**: Owner — Cloudflare account, `76pancakes` subdomain, GitHub OAuth App, two secrets, make-live, the meaning of "no hidden full save"; Architect — the B1 Origin guard, restricting `kind:'save'` shares (the agreed shape is 422 for save-share creation and a run-only snapshot with no seed/envelope/user id/email), the F24/F28 oracle assertions, glass-law scope (`.cp-panel` renders on season screens only; the proven law should be scoped there while the style stays global), the Vite ruling, the post-merge re-pin (seam golden `e8fed8ab…` must hold), the purge's missing "runs survive" test (Claude's `6d882c71e` built the purge but did not add that assertion); MUSE — pin drift, the "Perfect season (20-0)" queue row, verbatim intake.
- Seal discipline is a v1 cutover requirement (the unbroken chain regen → verify → composite → side-by-side, refusing any non-zero). The packaging *tooling* (`seal.mjs`/`make package`) is recorded as post-v1.1; that timing is an Architect/MUSE call, not a reason to skip the chain.

# 5. After the gates: shell work to RECORD, not build in this close-out

Ranked from the six S15 reviews and the council answers; all shell-only, engine-safe, and bound by the Owner's anti-goals (no scouting, no full GM, no faces, no downloads, no seed in the brag):
1. **Board decision support** (beam, iceman, ernie, glyph): promote `cp-why` into a first-class, dismissible, remembered one-line reason with tap/hover expansion to the exact VM numbers; add a "Δ wins vs next-best" meter, a pick-confidence strip (current pick / next user pick / picks-until-you / gone-risk), and a visible "Undo last pick" rail beside the truthful toast. All numbers VM-sourced; no new math in the UI.
2. **One-button clarity** (glyph, orcatide): a one-session legend ("TOP = one of your top three priorities now; pulse = draftable now"), pulse off when disabled, focus handoff to the first `.cp-draftbtn` on START, 44 px tap targets, long-name 390 px checks.
3. **Trust/state surfaces** (beam, glyph, iceman, porca): one calm status bar (engine stamp, shell build token, seed on the owner's own save card, save state, offline indicator); a dev-gated "Build & Proof" drawer; a "Restored from X" banner with explicit "Keep restored / Open shared link" choices; a receipt badge driven by actual packaging state. Keep the display-rounded-oracle caveat whenever the tie is INTERIM.
4. **A11y completion** (beam, glyph, orcatide): native buttons for flex chips, sort controls, slot picker; `role=status` for toasts, assertive only for errors; rank-aware aria-labels; axe/role sweep in CI beside the Playwright laws.
5. **Why-copy as data** (pickle): `{headline, detail, sourceStat}` from slot value / flex fit / team need — reproducible, falsifiable, sport-neutral.
6. **Share discipline** (pickle, GPT, glyph, iceman): preview exactly what will be copied from one formatter; no seed/save/private ids in the brag; pre-make-live shows a muted "link goes live on release" note, never a dead button; no auto-download, no image card unless the Owner asks.
7. **Motion/panel contracts** (beam, iceman, orcatide): motion preference full/subtle/none from one `<html>` attribute with reduced-motion parity; one Panel component contract.
8. **Dev scenario/receipt mode** (iceman, glyph): load fixed seeds/states and render the exact board/share/save states the batteries assert.
9. **North star, record only** (Owner §1.2/§1.4): pfd-01/02 spatial badge field and play-calling screen, faces replaced by badges — long-term, post-v1.1, zero engine bytes. Do not build it now.

File these as one ranked inbox proposal with exact anchors. Do not start them until §3 is green.

# 6. Delivery form

One zip + sha256 list; no push (you cannot push — the council mirrors your folder). Reply once, after all work. Labels V/R/I/U with command and output for every claim. Never weaken a law to pass a gate. Never hand-edit a generated artifact. No new dependency, no remote font, no secret. When you resume, open by naming the tree bytes and the five blockers; when you finish, give the reseal output, the regenerated SHELL-STATUS lines, the composite tail with COMPLETE, the side-by-side file list, the fence diff, the Vite byte line and the question you filed, the zip name + sha256, and an explicit NOT RUN / U list.

— hy4 (advisor). V2 built from every seat review of the earlier prompts and from all council-ask answers; the disagreement register is preserved in pickle's `1116` filing, and nothing here pretends to settle an Owner call.
