# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent**. Owner's message outranks everything; then the Owner-relayed prompt; then the zones of `AGENTS.md` on live `origin/council/muse`. If a task contradicts `AGENTS.md` or the muse file and the Owner, the muse and the Owner win.

## Boot protocol
1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **Live rules live on `origin/council/muse`** — refresh first: `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`
4. `node tools/preserve.mjs check` — my worktree clean; other worktrees are not mine to touch.

## Permanent seat rules
Byte-check everything: every VERIFIED = directory · exact command · ref/sha · output neighbourhood. Never edit governance, engine, flex, product, or other seats' bytes. INKLING reviews, measures, advises; does not build the engine/product/shell. No P-IDs without the Owner. Dissent in writing inside the filing.

## Current state (2026-11-17T23:05Z — w89 round FILLED, Cakepanz-6 prompt pushed; branch @ 4eb0fcde)

This sitting (after the 4th-down follow-up + w89 beauty + reviews):
- **GLM round verifications & reviews ALL landed** (my reviews: `inbox/20261117-2244-inkling-REVIEW-of-beam-glm-4thdown-verification.md` etc., pushed `e535c743`). The verdict across seats: **the sacks/drives shift is a per-state rate effect (~97%); STILL blocks the default (drives = a 4th-down cell-selection artifact at 65673a00: class sampler leaves the down-aware cell on ~84% of 4th-down passes; inc→downs 24.28% vs pools 68.28% at 12k / 120k). The default is the Owner's; nobody defaults.**
- **w89 beauty comparison done + pushed** (`20261117-2258-inkling-cakepanz-w89-comparison.md`, `.openchamber/screenshots/` 9 JPG receipts pushed in `9f720b15`). **Findings: palette values match byte-wise; dark `--text` missing reproduced faithfully (not fixed, ruling owed); team takeover == Z.ai writes `--zpb-t*`, zero CSS consumers — 0% delivered against the Owner's "every team colour changes almost every aspect" ruling.** Body copy is Cinzel (not w89's system sans); wordmark is Cinzel Decorative; slogan absent; 2PT chips ("2PT" instead of "2-Pt Conv"); labels ("Model Value" vs "Value"/"Engine Value"). Cakepanz shipped == 5c808472, prepared == 65673a00, aesthetic assets byte-identical across both, verified.
- **Cakepanz-6 prompt for Z.ai pushed** (`inbox/20261117-2305-inkling-prompt-zai-cakepanz-6-20261117.md` @ `4eb0fcde`): F-1..F-5 doc fixes (README battery:node 24→26, manifest 316 not 310, VERIFY passClass scope clause, SNAPSHOT.md sixth-diff note, SHELL-STATUS OT-workaround receipt); w89-parity items Z.ai may land (body font, inline 900s, wire the `[data-zpbteam]` remap); **W list — everything ruling-dependent — do not touch.**
- **Cakepanz-5 verified independently:** shipped byte-identical to 5c808472, prepared byte-identical to 65673a00 (68 files), flex identical, 4 packs present in prepared, F0–F8 falsifiers ALL DIED on Node 26, D-1 fresh-clone (npm ci exit 0, battery 29/0, build byte-reproducible), D-2 fixed, both node suites green on Node 24 and 26.

## Next session reads — priority
1. `git fetch -q origin; git log --oneline -1; git status --short` + `preserve.mjs check`; refresh governance docs (step 2 boot).
2. If the Owner sends the **w89 beauty round result back to Z.ai**, or a **Cakepanz-6 delivery** lands: review it the standard way (diff vs pin, run batteries on both Node majors, receipt every claim).
3. **Standing items to carry:** the default-off GLM ruling; sacks/drives artifact (16.38% finest-level vs 65.51% pools; inc→downs 24.28% vs 68.28%); the yards/given-class battery (merged: GLM A1 in-repo gate + inkling ≥2 SE outer gate; Ernie's #9/#10 plants); Z.ai's blockage state — his charter now says build the w89 fixes (F-1..F-3/doc-class), never touch the W list, never default.
4. **Live worktree:** `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` @ `4eb0fcde` · merge-base `1b91f50e`.

## Safety
Other worktree failures are reported, never touched; preserve.mjs finds them. Do not import TruePath notions into reviews. Separate scratch under `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/`; packs live under `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/tip-65673a00/colors/` (archive of tip, `git archive 65673a00 | tar -x`).
