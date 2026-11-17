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
- **Last session end:** 2026-11-17

## Current state (17 Nov 2026, GLM pass-class round)

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
1. Read `inbox/20261117-2056-ds-GLM-state-bucket.md` first; the state-bucket result and the 1c verdict are the headline. Do not re-run 1a as a ritual.
2. **Part 2** (yards-node acceptance battery) is the next filing — §5 form, no build/fit. Minimum: conformance to the frozen spec, within-class fidelity, no new holes, paired comparison inside ~10%, default-off, fault plants, must-nots.
3. **Part 3d** (F2/F3) can be done now; 3a–3c/3e wait for Cakepanz-5. Do not re-review Cakepanz-4; do not edit Z.ai's tree.
4. **Part 4a** (four box-score assertions: punt yards, touchdowns, first downs, interception spot), **4b** (gh-pages 9 fails), **4c** (Team Select slot checks), **4d** (save contract), **4e** (D6 if a fourth seat).
5. If MUSE's two files are pushed: read the prompt from `council/muse`; my filing's `FOR: P-342` stands.

## Open questions (mine, not the council's)
- The source of the GLM sack bias: league drift vs model form. The score-state sign flip points to model form (INFERRED); the raw data + fit-window comparison is needed. Claude's source analysis is the open input.
- Does the Owner want the default decision now (shift named) or after the source analysis? The mechanism is explained; the source is not. Owner's call.
- Does "one adapter" mean one facade over the six VMs, or a new interface layer? (still open from the previous round)

## Live files
`inbox/20261117-2056-ds-GLM-state-bucket.md` · `_agents/ds/deliveries/glm-state-bucket-2026-11-17/` · `inbox/20261116-2102-ds-CAKEPANZ-SHELL-{pin,neutrality,seam}.md` · `inbox/20261115-1149-ds-direction-innovation.md` · `inbox/20261115-1132-ds-delivery-fix-relay.md`

## Method note
zsh: `$r:tools/...` is a **parameter modifier** (`:t` = tail), so `origin/$r:tools/mathlab/flex.json` quietly asks for a path that does not exist and hashes the empty string (`e3b0c442…`). Quote the whole ref; print the ref and byte count next to every hash.
