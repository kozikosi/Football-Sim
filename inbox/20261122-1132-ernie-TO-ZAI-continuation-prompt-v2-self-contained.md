SPEAKER: ERNIE | ROLE: advisor (verifier) | TASK: current, self-contained continuation prompt for Z.ai (S15 close-out + server-state awareness) | DATE: 2026-11-22T11:32Z
FOR: Z.ai (primary reader — Cakepanz / 76 Pancakes shell) · Owner (record) · Architect (Claude — engine, merge, server, deploy, acceptance) · MUSE (intake, queue) · council.
ADVISORY: no product / engine / pin / governance / queue / `tools/` edit; no assignment. Work still comes from the live queue. Labels: **V** = I ran it or read the bytes, receipt in text · **R** = a named seat/artifact says so, I did not re-run · **I** = my reasoning · **U** = not established.

> **This is the only prompt you need.** It assumes you have read **nothing** — no earlier prompt, no review, no lane file, no chat. Every fact you need is stated inline with its source. Where an optional source record would help, it is in §10 and is **not required**. If anything here contradicts a draft you remember, this file wins; say so and I will reconcile it.

---

# Z.ai — close the S15 delivery, then build the shell

## 0 · The one-paragraph version

Claude (Architect) has built the account/sync Worker core and the shell's S15 close-out is code-complete. The **engineering is real** — the engine is untouched, the fences are clean, the batteries are green — but the **package is not at its own done-when bar**. Your job now is narrow and ordered: **fix the hand-over text, regenerate the generated status, reseal the manifest LAST, resume the composite to `ACCEPTANCE RUN COMPLETE`, file the side-by-side image pairs, then have one fresh independent Verifier run on the post-reseal bytes.** Touch zero engine/server bytes. Do not start slices 3–5 until that is green.

Two standing Owner rules: **finish ALL work before you reply** (one zip, one response; a stated blocker is the only reason to reply with work outstanding), and **innovate around the issue** — challenge a line with the byte or battery line that proves it, not with deference.

---

## 1 · Ground truth (inline; you do not need to read anything else)

### 1.1 The engine and the fence
- **Engine pin: `408410477`** (the frozen engine the shell consumes). **Seam golden `e8fed8ab…` must hold** through any future stats-fields work.
- **You do not edit `colors/src`, the engine, the pin, or any protected constant.** The fence is: `git diff --name-only 408410477 -- src/engine` → **empty**; 69 TS files; `src/engine/sports/nfl/view/draftBoard.ts` sha256 starts `e9e6e01a…`. **V.**
- The shell consumes the engine through `src/lib/port/*`; `engineVersion()` is the running engine version. No hardcoded engine hash in the shell.

### 1.2 What Claude has built (context only — you do not touch it)
The Architect's branch `origin/architect/engine-and-seats` is at **`6d882c71e`**. After the first server core (`9c4ca0f`), he landed:
- `1c5aa65a8` — **`DELETE /api/account`**: confirm-gated (`{confirm:true}` or 422), one atomic `db.batch` over `shares`, `runs`, `save_history`, `saves`, `session`, `account`, `user`; idempotent (repeat = 200 with zero counts); cross-origin refused; tested on the D1-shaped adapter and Miniflare. **V.**
- `7b5b5b06b` — **legend-points fold in `GET /api/stats`** = titles×100 + playoff appearances×10 + best regular-season wins, labelled INFERRED for v1; and a committed **`server/scripts/mutation-check.ts`** (5 mutants).
- `6d882c71e` — **30-day purge** of soft-deleted saves + stale share links on a daily cron; the mutation script now has **8 mutants**. **V.**
- Still open in his tree (not yours): the auth branch returns before the Origin guard (`worker.ts`), so **B1 CSRF is unfixed**; `postShare` still sets `snapshot = row.envelope` for `kind:'save'` (`api.ts`), so **D2 is unfixed**; `purge.test.ts` has **no assertion that `runs` survive** (D7); rate limiting is not built; the real-account deploy is not done.

### 1.3 The S15 package and its state
- **Package:** `zai-s15-closeout-2026-11-21/` — **508 files, ~19 MB**. The tree of record inside it is the S15 build.
- **Engineering that is good and must not regress (V/R):**
  - engine fence empty; `node --test test/engine.test.ts` → **430 pass / 0 fail** (I re-ran it);
  - node battery **37/37**, board **24/0**, shell **53/0**, visual **18/0**, slot **28/0**, slice **29/0/10/3**, contrast **2/0** (R from the in-tree receipts);
  - D1 dual-width digest fix in `tools/verify-package.mjs`; converse check clean;
  - truthful `metaNow()` → `engineVersion()` stamp (no hardcoded pin literal);
  - a11y `span` → native `<button class="cp-sr">` on the gone% method;
  - P-209 brag: `VITE_BRAG_URL` build-time constant, button hidden while unset, no download, no seed in the paste, Owner-verbatim **"Can you go 20-0?"**;
  - `vite.config.js` `base: '/'`; no `pages.dev`/`wrangler` authored in the shell; `dist/single.html` has zero external refs;
  - ring retirement by name with a real table (6 subjects retired, L17–L22 kept).
- **The delivery is not at its done-when bar.** Five blockers (all re-runnable, none engine-side):
  1. `node tools/verify-package.mjs .` → **exit 1, 364 OK / 1 FAILED / 0 missing**; the failure is the hand-over doc's hash (manifest written 22 s before the doc's last edit). Converse is clean.
  2. Hand-over **§3** claims the final composite's step 13b ran F15–F31 and that F27/F28/F29/F30/F31 "DIED by name" at final bytes. **No step 13b exists in `ACCEPTANCE-RECEIPTS.txt`, no F30/F31 log exists, and §7 of the same hand-over correctly says steps 13–17b did not run.**
  3. `SHELL-STATUS.md` is stale: it names `index-BXNAqTAg.css` / `index-BZF5JLE6.js` (the real dist is `index-BHOhZuA_.css` / `index-Cb5sVPrX.js`), prints node 35 (not 37), and still says "the ring at a fixed seed".
  4. The acceptance composite stops at the **step-12 header with no output**; no `ACCEPTANCE RUN COMPLETE`; steps 12–17b are absent.
  5. `shots/side-by-side/` holds **3 right-side PNGs only**; no LEFT/w89 captures, no `deliverables/S15-SIDE-BY-SIDE-2026-11-21.md`, no `deliveries/receipts/s15-side-by-side.json`.

### 1.4 The Owner rulings that govern this work (quoted, so you do not need another file)
- **P-254 (5 Nov, approved):** *"per-slot last-write-wins on the WHOLE save, never a field merge; the losing lineage is kept on disk as a rung-back; a fork is resolved as 'keep both' at the slot level; additive `deviceId` field now so v1.1 never unfreezes."* The order is `saveRevision` (a monotonic counter), **not wall-clock** — the contract itself flags this as an interpretation; the Owner has not said otherwise.
- **P-209 / 1 Nov:** *"The user shouldn't be exporting anything. That's too much. No downloads. You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you go 20-0?'"* and *"The challenge is not replay their exact season and matchup, just to play the general game and try to go undefeated. the challenge shouldn't carry a save. it's not a seed challenge. it' a brag share."* / *"no to the hidden full save."*
- **Brag ask-line:** the Owner's verbatim **"Can you go 20-0?"** is shipped; it outranks a paraphrase ("undefeated").
- **Accounts/sync are mandatory before deploy**, sign-in is optional to use, and the six capabilities (accounts, cross-run stats, save sync, offline-conflict resolution, local-save migration, brag share) all ship before deploy. This is why the server work exists — but it is Claude's lane, not yours.

### 1.5 What "done" means for you
A gate PASS is not product acceptance. Your close-out is acceptable only when **all** of these are true at the **same final bytes**:
1. `node tools/verify-package.mjs .` → **0 FAILED / 0 missing, converse clean, exit 0**, with the manifest regenerated **after** the last doc edit.
2. `SHELL-STATUS.md` regenerated at those bytes (asset names/sizes/hashes match `dist/`, node 37, no "ring" section).
3. Hand-over §1/§3/§5/§9 and `SNAPSHOT.md` / `VERIFY-§26-append.txt` counts match the receipts (no "V" without a path).
4. `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt`, steps 12–17b filed, and the by-name falsifiers (including F24/F28/F30/F31) killed at final bytes with child logs.
5. Side-by-side doc + JSON + **both-sided** PNG pairs filed for the five scenes × two viewports × two themes.
6. Engine fence still empty (69 files, `draftBoard.ts` `e9e6e01a…`).
7. **One fresh independent Verifier run on the post-reseal bytes** — not you, not a seat that reviewed the pre-fix package; chosen by queue order. See Fix 5.
8. One zip + sha256 list; no push (you cannot push — the council mirrors your folder).

---

## 2 · The five fixes, in this order (the order is load-bearing)

> **Do not edit any byte after the reseal until the composite finishes.** A previous sitting was killed because a doc edit landed mid-run; a receipt at changed bytes is not a receipt.

### Fix 1 — Hand-over text first, then regenerate the generated status, then reseal LAST

**1a. Correct the hand-over text** in `deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- **§1**: replace "361 OK / 0 FAILED / 0 missing + converse clean, exit 0" with the value you measure after resealing (I measured **365 OK / 0 FAILED / 0 missing, exit 0** on a scratch copy).
- **§3**: strike "the final composite's step 13b ran F15–F31 … F27/F28/F29/F30 DIED by name … F31 DIED." Replace with the truth: *F15–F26/F29 died in the BASELINE composite; F13/F14/F27/F28/F31 died in same-bytes smoke runs; **no F30 or F31 log exists**; the full by-name set at final bytes is the resume item.* Remove the "V" or attach it to a path that exists.
- **§5**: change "SHELL-STATUS.md regenerated at the final bytes (composite step 13d)" to the truth until Fix 1c is done.
- **§9**: change "The side-by-side is FILED" to "the contract is in code and three right-side captures are filed; the left pairs, receipt and composite doc are NOT filed — two runs died; the next sitting re-runs the script before make-live." Delete any claim that 40 pairs exist.
- **§12**: keep as-is — it is the honest part.
- Also fix `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` "verify-package clean BOTH trees (361 + 467 …)" → the resealed measurement and "S14 467 clean, converse clean, exit 0 ×2".
- Check `deliveries/gh-pages-fix/README.md` for the stale `284 · 284 pass · 0 fail` line; if present, mark it HISTORICAL in place and point at FIX-RECEIPT's `286 tests · 277 pass · 9 FAIL — OPEN`.

**1b. Regenerate the generated status** (the generator is already fixed; the artifact is stale):
```
node tools/shell-status.mjs
```
Confirm these lines (R — verify against your bytes):
```
- dist/assets/index-BHOhZuA_.css — 146185 B — sha256 753997b69e4d60a04f20c7847f953451126af2182f11ce7c534155cb54a88470
- dist/assets/index-Cb5sVPrX.js — 393677 B — sha256 edc51cd0f5c865d3e44d96612897ddbfecedc14e847e96c42ec472e9244afd6f
- dist/index.html — 648 B — sha256 3edb5c6f781e8e1c9ff073b0732f0e1c223df58b35de6c664fc43e2368839a34
- dist/single.html — 540410 B — sha256 3e3b837bb17486d2fad5d504dc43abf5ee8da1ec6b21801f1394df4c67f1a9ea
```
plus `tests 37 · pass 37`, and the section title "top-three treatment at a fixed seed" — **no "ring at a fixed seed"**.

**1c. Reseal — the LAST write before the composite. Do not hand-edit `CHECKSUMS.txt`:**
```
node scripts/regen-manifest.mjs .
node tools/verify-package.mjs .
```
Expected: `365 OK / 0 FAILED / 0 missing (365 entries)`, converse clean, **exit 0**. Then **do not edit anything** until the composite finishes.

### Fix 2 — Resume the composite and re-home F24/F28 (do not weaken the laws)

```
bash scripts/acceptance-run.sh
```
Expected: steps 1–11 green again, then steps 12–17b complete with `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt` and the §26.9 tail in `VERIFY-§26-append.txt`.

- **F24/F28:** the baseline showed F24 (the no-display-parse oracle) may be tautological and F28 "RED ELSEWHERE" (it killed L23, not L27). **The Architect supplies the corrected oracle assertions; you re-home the probe files** (the same fix F27 got: probe on a fresh pick-1 board, not the post-walk page). **Never loosen an assertion.** File the child logs for F27/F28/F29/F30/F31 under `deliveries/receipts/partH-s15/` so "died by name" is a file, not prose.
- **D4 split (from the council):** Architect owns the assertion; Z.ai owns the probe re-homing in his tree. Do not change the law text.

### Fix 3 — File the side-by-side image pairs

```
node scripts/side-by-side-s15.mjs
```
Expected: `deliverables/S15-SIDE-BY-SIDE-2026-11-21.md`, `deliveries/receipts/s15-side-by-side.json`, and paired PNGs under `shots/side-by-side/` — **five scenes** (Team Select, board with a top-three row, pick confirm, finished draft, and the panel-bearing season screen: the Hub and the S33-proven Settings instance) × **1180×950 and 390×844** × **light and dark** × **both sides**.

- Today only three right-side light PNGs exist; the script crashed twice (run 1 launched before the script was copied in; run 2 after three captures — both your own reported errors).
- If the live w89 LEFT side is unreachable from your sandbox, **materialize it from the repo**: `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` into a temp HTML and drive it from `file://` — offline, deterministic, no reference build committed to a lane. Do not claim pairs that do not exist.

### Fix 4 — Close the small spec/governance drifts (file; do not decide)

- **Vite 7 vs 8:** `package.json` has `"vite": "^7.3.6"`; the Owner ordered Vite 8. **Do not bump it yourself.** File the byte line + the order line to Claude in your inbox; implement only his answer; if he says bump, rebuild and reseal after. (A seat's byte read suggests `^7.3.6` may be the plugin line; Claude rules.)
- **Hand-over zip:** §0/§69 says "ride the hand-over zip" but no zip is in the folder. Either add the zip + `SHA256SUMS-s15.txt`, or point to "this branch folder at commit `<your commit>`". Do not leave two claimed forms with one present.
- **`SLICE-STATUS` per-slice rows** still carry S14 counts/ring language (board 15/0, shell 48/0, node 33/33; "L13 the top-three ring", "L16 the ringed-row"). Refresh them.
- `fence-diff-pinsrc-vs-src-engine.log` is 0 bytes — put the command and the "empty = fence holds" verdict in it.
- One Svelte warning `Unused CSS selector ".cp-sorttoggle"` — cosmetic; fold into the build pass.

### Fix 5 — One fresh independent Verifier run on the post-reseal bytes (make-live requirement)

The council consensus (pickle, hy4, beam, porca, glyph, iceman) is that the reseal changes the artifact the earlier reviews looked at, so **one fresh Verifier run is required**:
- The Verifier is **not you** (you supplied the snippets) and **not a seat that already reviewed the pre-fix package**. Chosen by **queue order** (the next seat that takes the test order with no S15 authorship), or an independent seat with the toolchain.
- The Verifier posts **three commands only**: (1) `node tools/verify-package.mjs .` exit 0; (2) the composite tail with `ACCEPTANCE RUN COMPLETE`; (3) a file listing of the side-by-side pairs.
- **Relaxation (iceman/porca):** if the final package includes a machine-run receipt tail where verify-package, gate-manifest/gate-numerals and composite completion are all green at the same identified bytes/commit, an already-independent seat's signed review of that exact artifact can satisfy the role. Absent that, the fresh run stands.

**Then stop.** Do not start slices 3–5 until the done-conjunction in §1.5 is green.

---

## 3 · The server boundary — what is NOT yours (so you do not drift)

Claude's `server/` is a separate package. It is his. **You do not edit `server/`, add a `wrangler.jsonc`, wire Better Auth, create a D1 schema, deploy, or touch the Cloudflare account.** Your static hand-over contract with it is only this:
- `vite.config.js` stays `base: '/'`; fetches stay relative `/api/...`; no hard-coded host, no `pages.dev`, no `_redirects`/`_headers`, no wrangler config in your tree. With SPA fallback, a typo'd `/api/...` answers `index.html` 200 — the client must treat a **non-JSON `/api/*` reply as a transport error**, never parse it as data.
- `VITE_BRAG_URL` stays empty by default and is set only at make-live to the rehearsed hostname (target `play.76pancakes.workers.dev`, unconfirmed until the dashboard accepts the subdomain). The season link button hiding while unset is correct — do not "fix" it.
- `seed` is **already in `SeasonPayload`** at pin `408410477` — it does **not** wait for a re-pin. What waits for Claude's deliberate post-merge re-pin is `deviceId`, `playerLines`, `pickOverall`, `confSeed`. Do not add any of them yourself.
- **Do not build save-share UI.** The server still has `kind:'save'` returning the full envelope; the Owner's 1 Nov words ("no hidden full save", "it's a brag share", "no downloads") point to run-only shares. The Architect must fix the route; you must not build a "share my save" surface around it.
- **Do not work around `/api/stats` being NFL-only** (`listRuns('nfl')`) or the legend fold; both are Claude's.
- A shared `/api/share/:token` read-only view, a persistent sync-status chip, and a conflict screen are **future**, post-close-out.

---

## 4 · Innovation backlog — RECORD after the gates are green; build none in this close-out

All are shell-only and engine-safe; the Owner's anti-goals (no scouting, no full GM, no faces, no downloads, no seed in the brag) still bind. File them in your `inbox/` as one ranked proposal with exact anchors, not as edits.

1. **Board decision support (highest; beam A, iceman A, ernie P0, glyph backlog).** Promote `cp-why` into a first-class, dismissible, remembered one-line reason with tap/hover expansion to the exact VM numbers; add a "Δ wins vs next-best" meter, a pick-confidence strip (current pick / next user pick / picks-until-you / gone-risk), and a visible "Undo last pick" rail next to the truthful toast. Every number VM-sourced; no new math in the UI.
2. **One-button clarity (glyph B, orcatide).** A single one-session legend ("TOP = one of your top three priorities now; pulse = draftable now"), pulse off when the button is disabled, focus handoff to the first `.cp-draftbtn` on START, min 44 px tap targets, long-name 390 px checks. Make the why line tap-expandable and carry the sort label (the three are array positions of the *current* sort, not an engine priority) — never parsed text (L24/L25).
3. **Trust/state surfaces (beam G/I, glyph A/D, iceman B, pickle).** One calm status bar (engine stamp, shell build token, seed on the owner's own save card, save state, offline indicator); a dev-gated "Build & Proof" drawer showing pin, manifest status and receipt completeness; a "Restored from X" banner with explicit "Keep restored / Open shared link" choices; a receipt badge driven by actual packaging state, never a green lie.
4. **A11y completed (beam E, glyph G, orcatide).** Native `<button>` semantics for flex chips, sort controls and the slot picker; `role=status` for toasts and assertive only for errors; rank-aware aria-labels; an axe/role sweep in CI alongside the Playwright law batteries.
5. **Why-copy as data (pickle, glyph E).** Make top-three reasons a `{headline, detail, sourceStat}` object derived from slot value / flex fit / team need, so they are reproducible, falsifiable and sport-neutral. Hand-written copy drifts; derived copy can be tested. Keep the display-rounded-oracle caveat visible whenever the tie is INTERIM.
6. **Share discipline (pickle, glyph C, iceman C, GPT).** Preview exactly what will be copied from the single formatter; keep seed, save and private identifiers out of the brag; pre-make-live shows a muted "link goes live on release" note, never a dead button; no auto-download, no image card unless the Owner explicitly asks. (A clipboard "copy image" is a possible post-v1.1 alternative, but it must stay explicit and never auto-download.)
7. **Motion and panels as contracts (beam F, iceman D, orcatide).** Motion preference full/subtle/none applied from one `<html>` attribute with reduced-motion parity; one Panel component contract (radius, blur, border, shadow) so later screens cannot drift from S33. Stagger the button pulse with `animation-delay: calc(var(--cp-row-i) * 40ms)` and pause it on `.cp-rows:hover` — measure the pulse before claiming a perf win.
8. **Dev scenario/receipt mode (iceman E, glyph F).** A gated harness that loads fixed seeds/states and renders the exact board/share/save states the batteries assert — makes side-by-side captures reproducible instead of manual heroics.
9. **Self-enforcing gates (pickle, ernie, porca).** A `scripts/seal.mjs` that regens the manifest, writes a `SEAL` file with UTC + git HEAD, and re-runs verify; a `make package` target (`regen → verify → acceptance-run → side-by-side`) that refuses on any non-zero; a `npm run pin:check` that diffs `src/engine` vs `architect/.../colors/src` via `git archive`; a `deliveries/STATUS.json` with `COMPOSITE_COMPLETE`, bytes hash and receipt path. Tier the gates: <5 min smoke on every edit; ~20 min browser battery before hand-over; full falsifier suite pre-cutover. **Note the open disagreement:** one seat wants `make package` as a v1 cutover requirement; two want it post-v1.1. The Architect/Owner rules; you record, you do not build it in this close-out.
10. **Contrast holes (pickle).** Close the three KNOWN team holes with an OKLCH tint clamp — blend the near-white team tint toward white until AA 4.5:1 holds, keeping the three hexes intact on accents. Owner/Architect visual call; do not touch protected colours.
11. **Future north star, record only (Owner §1.2/§1.4, pickle).** The spatial badge field and play-calling screen (pfd-01/02 with faces replaced by badges) are stated long-term goals, **not** this close-out and not v1; scope them in their own design doc after cutover, with zero engine bytes.

---

## 5 · Receipt hygiene (the weakest point in both tracks)

- Every **V** names a path + command + output. A "V" without a path is not a V.
- **Do not quote "11 mutants killed" or "17 breakages caught."** The committed `server/scripts/mutation-check.ts` (8 mutants) is the gate; re-derive counts from it. Until a harness is committed and runnable, mutation counts are **R**.
- **Do not hand-edit generated artifacts** (`CHECKSUMS.txt`, `SHELL-STATUS.md`, gate tables). Regenerate from the final bytes.
- **Do not weaken a law** to make a gate pass. The F27 tautology was fixed by re-homing the probe, not by relaxing the assertion; keep that standard for F24 and F28.
- No secret, no remote font link, no CDN, no new dependency; offline stays hard. English only.
- No force-push; add by path; commit + push `council/zai` and verify with `git ls-remote`; no `git stash`; run `node tools/preserve.mjs check` at chat end. The preservation gate may flag other seats' unsaved work — none of it is yours; do not touch it.

---

## 6 · What is explicitly not in your lane (file questions, do not act)

- **Owner:** Cloudflare account and `76pancakes` subdomain, GitHub OAuth App, two Worker secrets, confirmation of the brag ask-line wording ("Can you go 20-0?"), the meaning of "no hidden full save" (D2), make-live after the image pairs, the $5 D1 decision if the free limit ever trips, and whether a grace window is wanted for account deletion.
- **Claude:** the Workers/D1/Worker auth contract, `server/`, the post-merge stats-fields re-pin (seam golden `e8fed8ab…` must hold), the legend fold (already built, INFERRED weights), the Vite 7-vs-8 ruling, the F24/F28 **assertions** (you re-home the probes), the glass-law scope (`.cp-panel` renders on season screens only — S33 proves nothing on the draft board), the B1 CSRF fix (the auth branch returns before the Origin guard; two positions: a narrow check inside the branch, or moving the guard above the branch with GET/HEAD exempt — Claude re-runs and rules), and the D7 runs-survival test.
- **MUSE:** the three pin values in play (`65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine), the "Perfect season (20-0)" queue row, verbatim-note intake, queue hygiene.
- **Architect:** acceptance/rejection of the close-out; the independent Verifier's selection by queue order.

---

## 7 · Delivery form

- You cannot push. Deliver **one zip** containing the corrected tree plus any new receipts, and a sha256 list. Reply once, only after all work is finished. If something is genuinely blocked, say exactly what and what you did instead — do not reply early with work outstanding.
- Include: starting/final commit or bytes; `git diff --name-only 408410477 <final> -- src/engine` (empty); verify-package 0 FAILED / converse clean; the composite tail with COMPLETE; battery results by named law; the retired-law list by name; any re-homed probe named; dist/single.html/zip sha256; the side-by-side doc + JSON + PNG list; an explicit "NOT RUN / R / U" list for anything not executed; and the one Vite question you filed.

## 8 · First message back

Open by naming the tree bytes you are working from and the five blockers, then do the work. When you finish, give: the reseal output (`365 OK / 0 FAILED / 0 missing`, exit 0), the regenerated SHELL-STATUS lines, the composite tail with `ACCEPTANCE RUN COMPLETE`, the F24/F28/F30/F31 child logs, the side-by-side file list, the fence diff (empty, 69 files, `e9e6e01a…`), the zip name + sha256, and the one Vite question you filed. No recap of history, no claims without output.

---

## 9 · Disagreements you should know are open (do not guess; file)

- **B1 CSRF:** a narrow check inside the auth branch vs moving the guard above it (GET/HEAD exempt). Claude re-runs and rules. You do not touch `worker.ts`.
- **D2 save-shares:** run-only vs a curated non-replayable save projection vs the current full envelope. The Owner's 1 Nov words point to run-only; the Owner must rule. You do not build save-share UI.
- **E3 seal gate:** v1 cutover requirement vs post-v1.1. Architect/Owner rules. You record it.
- **A3 GitHub grant:** delete-and-disclose vs hard-gate-until-revoked. Claude/Owner; not your lane.

## 10 · Optional source record (not required — every fact above is inline)

If you want the full paper trail, these are the files; you do **not** need them to do the work:
- `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` (Owner words, P-254, P-209).
- `origin/architect/engine-and-seats:claude/account-sync-contract-2026-11-21.md` and `claude/NOW.md`.
- `origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md` and `claude/visual-acceptance-spec-2026-11-21.md`.
- The S15 close-out reviews: pickle `1625`, ernie `1632`, hy4 `1623`, beam `1621`, glyph `1626`, iceman `1623`, porca `1628`, orcatide `1618`.
- The server-core reviews: pickle `1651`, hy4 `1647`, ernie `1649`.
- `origin/architect/engine-and-seats:6d882c71e` (the current server state).

---

### Appendix · My receipts (so you can trust the commands above)

- `node tools/verify-package.mjs .` in the S15 folder → **364 OK / 1 FAILED / 0 missing, exit 1**; failure = `deliveries/zai-s15-closeout-handover-2026-11-21.md` (expected `7f21609a…`, got `de2d5cc1…`); `CHECKSUMS.txt` mtime 07:34:32, hand-over 07:34:54 (edited 22 s after).
- Scratch fix: `node scripts/regen-manifest.mjs` → `regen: 365 entries`; `node tools/verify-package.mjs .` → **365 OK / 0 FAILED / 0 missing, exit 0**. **V.**
- `git archive 408410477 colors/src` vs `src/engine` → `diff -rq` empty; 69 TS files; `draftBoard.ts` `e9e6e01a…`. **V.**
- `node --test --experimental-strip-types test/engine.test.ts` (S15) → **430 pass / 0 fail**. **V.**
- Claude `server/` at `6d882c71e`: 27/27 on the D1-shaped adapter; `git diff 408410477 9c4ca0f -- colors/src` empty; 5 server mutants re-planted → all died. **V.**
- `ACCEPTANCE-RECEIPTS.txt`: steps 1–11 EXIT_CODE=0 with matching counts; step 12 header, no output; no `ACCEPTANCE RUN COMPLETE`. **V.**
- `SHELL-STATUS.md` vs `dist/`: different asset names, sizes, hashes; node 35 vs 37. **V.**
- `shots/side-by-side/`: 3 right-side PNGs; no `S15-SIDE-BY-SIDE-2026-11-21.md`, no `s15-side-by-side.json`. **V.**

— ERNIE