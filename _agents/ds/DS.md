# DS — lane file

## Identity
- **Seat:** DS · **Model:** deepseek-v4.1-flash-free via OpenChamber · **State:** advisor
- **First seen:** 2026-10-25 · **ID block:** none used
- **Strengths shown (evidence):** byte-checks that hold or break a delivery — Z.ai framework-eval v4 (14 Nov: manifest 44/44, suite 323/323, flex 99; found the `C5b` log 101-vs-99); P-342 engine-design review; P-347 λ identification; P-346 v3 review; flex rebuild 9–10 Nov; GLM pass-class state-bucket (17 Nov: 12,000 paired games, within-bucket bias isolated).
- **Pattern to keep:** I take the verification half of a delivery and the mechanism half of a spec. I file the *delta*, not a restatement.

## Where
- **Worktree:** `/Users/kosi/.local/share/opencode/worktree/268fd5642254792963f2005de2cbe496a0609502/council-ds`
- **Branch:** `council/ds`
- **merge-base HEAD origin/council/base:** `1b91f50e161fa10d0607c8e09330115ffa27f1ff`
- **Last session end:** 2026-11-18 (evening)

## Current state (18 Nov 2026, evening — cakepanz-8 push + review)

### What this session produced
- **Delivery pushed, then reviewed.** `67-cakepanz-8-2026-11-18/` at repo root, commit `953fe5ce`; zip sha256 `ced094f190d2636e8f37bf92fa04eaca7f13239f95fbb582aa0d11db69035fae`, 1131 zip entries / 1006 files, extracted `diff -rq` vs the Owner's Desktop folder exit 0. The nested `.gitignore` (honouring `/src/engine-node/`) is why the pushed tree is 1006 files, not the zip's full count — that directory is the declared generated artifact, reproduced by `node scripts/precompile-engine.mjs` (67/68 files).
- **Review:** `inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` (FOR: P-316, P-337, R-13). Verdict **improved**. 18 commands, all VERIFIED, Node v26.13.0. Every headline number reproduced; engine + port 0 diffs vs cakepanz-7; `dist/single.html` 526,576 B sha256 `1529a003…e737` identical on both trees; A1 probe GREEN; A2 mutation deletes `void hydrateBoot()` → shell battery 46/1 with `S29` red.
- **Seven findings.** Product: **F1** the simple row's detail does not exist — `aria-expanded` flips, nothing renders (measured: height 33→33, `.cp-fits` 0, `.cp-chip` 0); L2 passes because it counts absence. **F2** the 32nd UI pick leaves `{status:"done", screen:"board", boardRows:60, playBtn:true}` and the next click answers `it is not your pick` (the `pick()` path has no done-redirect; `refresh()`'s catch swallows `goneOdds`). **F3** `formAt11:"simple" → formAfterDoor:"full" → formAfterReload:"simple"` — the flip is session state. Hygiene: **F4** `gate-numerals.mjs` exit 1 on both trees (VERIFY.txt:553–554; `stalePin()` heuristic) so `acceptance-run.sh` stops at 16; **F5** `21d81b7b…` (pre-A7) vs the real `1b9bea5f…` ×3; **F6** SNAPSHOT 26/26 → 33/33; **F7** tree-internal `ACCEPTANCE-RECEIPTS.txt` is a stale stopped-at-16 artifact. F8 informational: `slice1-battery.json` dirties on run; pin-watch WARN noise; the A1 `go()` redirect is a global rule worth naming.
- **Patches supplied** (§4, anchors from the delivered tree): BoardRow detail block + `aria-controls` (or non-interactive row), `pick()` → `go('complete')` on `status === 'done'`, `settings.fullBoard` persisted with `startDraft` reset, doc lines. Laws L7–L9 in §5.
- **Innovation:** `inbox/20261118-1956-ds-R-13-cakepanz-shell-innovations.md` — 10 proposals, `PRIORITY+:` asks for P-337 v2 = three-choice card + Complete printing the engine's roster.

### Owed and not done
- **Round K: DS's macro answer** (merge gate / 4-3-3-4 target / Wins calibration) — still owed, carried forward unchanged.
- No round-J adoptions filed; W3 (command on every VERIFIED line) applied in practice in this review.

## Previous state (18 Nov 2026, morning — pin-watch, governance repair)

- **Governance repaired, not edited:** the START-OF-CHAT I was pointed at said run `sync-base.sh`; the live `_agents/START-HERE.md` says **do not**. It reverted `AGENTS.md`/`PROJECT-KNOWLEDGE.md` to the stale `4ca9a071`/97-rule state; Step 0 restored them, commit `a1757beb`.
- **`tools/pin-watch.mjs` + selftest built, then retired by discovery:** `364ddc84`, 16/16 assertions, live catch (57 vs 52, five tree-only files, exit 1), control PASS 68/68 at `65673a00`. Canonical is `council/inkling` @ `0bd76860`; mine is history only.
- **Round state moved under me:** the 2026-11-17T23:20Z parallel round's seven Part-1 drafts were withdrawn by Owner ruling; no blocker filed.

## Previous state (17 Nov 2026, GLM pass-class round)

### Filed and pushed — the state-bucket headline
- `inbox/20261117-2056-ds-GLM-state-bucket.md` (FOR: P-342), commit `0365a632`.
  - 12,000 paired games at `65673a00` (Node v26.13.0), 64 buckets (4 down × 4 ytg × 4 ydl), 200-rep seeded paired bootstrap; baseline `glm-bar.ts 12000` exact.
  - Sack rate **7.07% → 6.97%** (−0.10 pp, z −2.3); **within-bucket −0.10 pp (z −2.2)**, **state-mix −0.00 (z −0.8)**; model at the pools node's own states **−0.05 pp (z −29.3)**; 9 buckets |z| ≥ 3 with mixed signs; score **+0.92 pp trailing 8+, −1.18 pp leading 8+**; snaps/drive **+0.059 (z 6.8)**, total scrimmage snaps −0.104 (z −2.1) ⇒ drives **−0.118 (z −6.4)**.
  - **Verdict (mine, not the Owner's):** real, small, spread-out within-bucket bias; **not** a coarse state-mix artifact; score-dependent; drives change is mechanical (longer drives). Not blocked on the "unexplained" ground; the source (league drift vs model form) is INFERRED/open; the Owner decides. What would change my mind: a concentration in a high-leverage bucket, a shift above the ~10% bar, or a source analysis showing the score-term pattern is an uncorrectable fit artifact.
  - Checks: suite **406/406, exit 0**; `passclass.test.ts` **12/12**; shared-tag fault planted → catcher fails **GLM 5.83 vs pool 11.28**; 4th & 40 at the goal line int pool **1199 / 133 members / 0 non-int / 0 holes**; loader refuses `lambda = -1`; θ `[0.3, −0.2, −1, −0.6]`, λ 0, minClassPool 25. Held-out log-loss and tsc ratchet are REPORTED.
  - Tool: `_agents/ds/deliveries/glm-state-bucket-2026-11-17/state-bucket.ts` (sha256 `d8b691a6…ece67`) + receipts; re-runnable at any pin (same `glm-bar:` keys, fixed bootstrap seed).

### Previous round — CAKEPANZ-SHELL v4 (16 Nov)
- `inbox/20261116-2102-ds-CAKEPANZ-SHELL-{pin,neutrality,seam}.md` (FOR: R-13), commit `202b1128`.
  - gh-pages `67-cakepanz/src/engine` = **d3bd81d2** 57/57 (`diff -rq` exit 0); its README still says `4ca9a071`/52 — stale doc; `AGENTS.md` is right.
  - `67-cakepanz-s5` (council/inkling `b07f5578`) = **4ca9a071** 52/52; s5→d3 = 6 changed (`core/app.ts`, `app/dataset.ts`, `engine/{draft,flex,slots,value}.ts`) + 5 added (`core/{events,fold,keyedrng,pack}.ts`, `engine/legacyprovider.ts`). Re-pin is an engine update, not a doc edit.
  - s5 shell is **Svelte 5**; 15 app files / 65 engine import lines; no adapter/seam; no `SNAPSHOT.md`.
- The four old v4 shell peer reviews (Inkling pin, Ernie, GLM, Beam) were evidenced but **not filed**; the 2026-11-17 prompt does not require them and says do not re-review Cakepanz-4. Held, not lost.

### Still open from earlier sessions
- `inbox/20261115-1132-ds-delivery-fix-relay.md` — relay spec (`tools/relay-zai.mjs`, ~40 lines) + `_agents/ds/deliveries/prompt-zai-delivery-bundle-2026-11-15.md`. Not built (the tool is MUSE's). T2 (poisoned folder) is the decisive test.
- `inbox/20261115-1149-ds-direction-innovation.md` — the `file://` root cause, bundle delta **11,569 B gz JS-only** (not 10,946), Vue 3 + Vite ~65%, the cold re-entry test; the pin lost machine enforcement (`git grep d3bd81d2 -- tools/` empty).
- Verify **blob bytes** (`git cat-file blob HEAD:<p>`), never working-tree bytes.

## What the next session needs
1. Read the live round prompt first; **check the tip before working** — the 17 Nov prompt was superseded inside 24 h, and the 18 Nov one may be too. `node tools/council.mjs next` from `origin/council/muse` is the queue truth.
2. **Round K — file DS's macro answer.** Three questions, evidence-first, no recommendation dressed as the Owner's call: (a) merge gate — the five checks, four fixes already documented; (b) 4-3/3-4 — the ~947 floor appears in no council filing, Ernie's EDGE→ILB=0 + EDGE→DT=2 combo gives gap 0 / bias +334, and "947 worse than 720" is a category error (720 = synthetic-fixture gap; real-roster bias ~1144/1185); (c) Wins calibration — policy→outcome exists since 5 Nov (greedy N=1000: 89.5% playoffs, 11.43 mean wins), the slope and the 20-0 rate do not.
3. **If a cakepanz-9 delivery lands, verify F1–F4 first** — they are the only user-facing defects in the c8 review, and each has a named law (L7–L9) that would prove the fix. Do not re-run a whole c8 review; the receipts are in `inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` §1.
4. Do not rebuild pin-watch or bucket-bar variants. Canonical pin-watch `0bd76860`; bucket-bar is VL's `inbox/20261118-0300-…`, unverified by anyone but its author (round C).
5. The 17 Nov lane content below stays as history — the state-bucket result and the 1c verdict are still the headline of my engine work.


## Open questions (mine, not the council's)
- The source of the GLM sack bias: league drift vs model form. The score-state sign flip points to model form (INFERRED); the raw data + fit-window comparison is needed. Claude's source analysis is the open input.
- Does the Owner want the default decision now (shift named) or after the source analysis? The mechanism is explained; the source is not. Owner's call.
- Does "one adapter" mean one facade over the six VMs, or a new interface layer? (still open from the previous round)

## Live files
`inbox/20261118-1956-ds-P-337-cakepanz-8-review.md` · `inbox/20261118-1956-ds-R-13-cakepanz-shell-innovations.md` · `67-cakepanz-8-2026-11-18/` (read-only delivery, pushed for the council) · `inbox/20261118-1950-ds-P-355-pin-watch-corroboration.md` · `tools/pin-watch*.mjs` (history only, retired by discovery) · `inbox/20261117-2056-ds-GLM-state-bucket.md` · `_agents/ds/deliveries/glm-state-bucket-2026-11-17/` · `inbox/20261116-2102-ds-CAKEPANZ-SHELL-{pin,neutrality,seam}.md` · `inbox/20261115-1149-ds-direction-innovation.md` · `inbox/20261115-1132-ds-delivery-fix-relay.md`

## Method note
zsh: `$r:tools/...` is a **parameter modifier** (`:t` = tail), so `origin/$r:tools/mathlab/flex.json` quietly asks for a path that does not exist and hashes the empty string (`e3b0c442…`). Quote the whole ref; print the ref and byte count next to every hash.

**`sync-base.sh` is a trap on a worktree whose governance docs are newer than base.** It says "base wins on files you do not own", and `council/base` is the 2026-11-02 ghost, so running it silently rewrites `AGENTS.md`, `PROJECT-KNOWLEDGE.md` and `_agents/START-HERE.md` back to the `4ca9a071`/97-rule state. The live `START-HERE.md` §1 says **do not run it** and gives the Step-0 `git checkout origin/council/muse -- <four files>` instead. If a prompt still says "run sync-base", trust the live doc, and repair with Step 0 before reading anything.
