# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

You were restarted with the standard prompt (`START-HERE` → follow it exactly). Do this, in order, and you are current:

1. `git fetch -q origin` then the **step 0** checkout from `START-HERE` §1 (four governance docs). Verified 2026-11-14T08:26Z: all four were already identical to `origin/council/muse` (blob ids `ab4133bb` / `657db676` / `def229c0` / `743526a8`), so step 0 is a no-op on this branch now — run it anyway.
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Read the two working documents — they are in your worktree:
   - `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` (WR-1…WR-10)
   - `_agents/ernie/deliveries/fwtest-ledger-2026-11-14.md` (append-only; append your row, never edit another seat's)
4. If either file is missing you are behind your own branch: `git fetch -q origin && git checkout origin/council/ernie -- _agents/ernie/ && git log --oneline -3 origin/council/ernie`.
5. Then take the first open WR and file it as `inbox/<UTC>-ernie-WR-<n>-<slug>.md` with `INTAKE: WR-<n> · ERNIE · <UTC>`.

Nothing else is needed to resume. Do not ask for a document list; the lane names its own.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13)
- **What I am good at (evidence):** taking a claim apart with a command, and *reporting my own refutations*. Four sessions running; every WR closed with a receipt, every withdrawal mine.
- **Standing rule I run on:** four lines per claim (cwd · command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.

## Current state (2026-11-14T08:40Z)
- **Nothing in progress.** Branch tip **`9faf9d6e`**, all pushed to `origin/council/ernie`.
- **DONE:** WR-1, WR-2 (+ six-arm extension), WR-3 (twice: additive tie + shape candidates), WR-4, WR-5, WR-6, WR-7 (**closed today**), WR-10 (**closed today**), WR-G2, Phase 1, Phase 5, directives 21/24/26, Phase 8.2, the Z.ai v3 review, BENCH-1 audit, BENCH-2 work orders (library test + product round).
- **Still open, mine:** nothing assigned to me by name — the queue is the queue. The *substance* still open: (a) the WR-3 reactivity specimen, (b) offline on next/nuxt/solidstart, (c) the `@solidjs/start` failing line, (d) whether arm-lit belongs in the set.
- **Not mine to close:** the framework decision, λ, P-345, MUSE's doc corrections, the P0 October reviews (deliberately not started), WR-9 (needs an Owner ruling).

## Session 4 — WR-7 + WR-10 closed (2026-11-14, tip `9faf9d6e`)

15. **WR-7 closed — the goldens run inside an arm** (`inbox/20261114-0833-ernie-WR-7-goldens-home.md`, commit `8560e2ff`). The delta is exactly `{tools/golden.ts, tools/tsc-baseline.mjs}` (`comm` on all nine arms; `diff -rq` shows the rest is a byte-identical copy). Vendoring the two at `src/engine-contract/tools/` + three scripts makes the arm run the goldens: **`0ccb6319…f3f5` before == after, twice** — byte-identical to the contract tree. `tsc-baseline.mjs` → `exit 0, "OK: 69 errors (pinned 69)"`.
    - **The finding that outranks the WR:** the contract's 69-error ratchet is **vendored into all nine arms and executed by none of them**. `tsc-baseline.json` is byte-identical in every arm, `tsc-baseline.mjs` is in none, and the arm tsconfigs either exclude the contract (svelte `tsconfig.app.json:24`, nuxt `app/engine-contract`) or turn `strict` off citing the 69 (next `tsconfig.json:11-15`). arm-solid/arm-lit ship no typecheck script at all. So every arm's typecheck column measures the arm only.
    - Re-verified from the arm's own bytes with a probe tsconfig: **69 errors, per-file counts identical to the contract tree, 5/5 runs; the two tools add 0 errors**. Arm typecheck and build unchanged by the patch (svelte-check 0/0 both ways, `tsc -p tsconfig.node.json` 0, `npm run build` 0, 68.79 kB JS).
    - Cost: **2 files, 6,224 B**, 0 new dependencies (`golden.ts` 2,696 B · `tsc-baseline.mjs` 3,528 B).
    - Recommendation filed: **vendor (Option A)**, not "amend the protocol" — the contract tree ships with no arm, so a consumer holding an arm cannot run the gate at all.

16. **WR-10 closed — falsifiers per contender** (`inbox/20261114-0836-ernie-WR-10-falsifiers.md`, commit `9faf9d6e`). Two senses of "contender" separated (the nine arms vs the two the Owner chooses between). Six falsifiers stated as measurements; **four are unanswerable from the v3 set** (F1 1,000-row board, F2 agent defect rate, F4 shaped reactivity specimen, plus the sveltekit router layer and the solidstart failing line). The two that *are* answerable both come back as **no signal / build step** — offline is 5/9 with one plugin, the modification column has tied at zero three times.
    - F1 is the Architect's own falsifier (`d3bd81d2`); F2 is his second; F3 (offline as a product gate) and F4 (modification column) are mine. Both missing measurements are **already specified** in my BENCH-2 work orders — they need a builder with the harness, not a new idea.

## Session 3 — Z.ai fwtest v3 (2026-11-14, tip `89031ec5`)

13b. **Vendored + reviewed Z.ai's v3 nine-arm delivery** (`inbox/20261114-0255-…`, vendor commit `85f45f91`). Full copy readable at `_agents/ernie/deliveries/zai-fwtest9-2026-11-14/` (754 files, 5.7 MB).
    - **Manifest 753/753, 0 missing, 0 mismatch** — first completely-verifying manifest of the wave. Fixed structurally by generating from the frozen zip.
    - **Contract 9/9** (41 files, `diff -rq` 0 lines) · **goldens 9/9** (`0ccb6319…f3f5`, incl. canonical) · **round-2 before/after pairs 9/9 identical**.
    - **arm-solidstart 0/5 → 5/5 reproduced by me**: `@solidjs/start ^2.2.2` + `@solidjs/router ^1.0.3` + `vite ^8`, vinxi gone; SSR HTML 7,646 B / **69 testids**; build exit 0; **spec 5/5**.
    - **file:// row is mis-specified, not wrong.** Digest line: *as shipped 0/9 · with single-file 5/9 (svelte, vue, react, solid, lit) · sveltekit structural exception · next/nuxt/solidstart untested.*
    - Notes: their pin `208738ec` "unfetchable" is **machine-specific** (`git cat-file -e 208738ec` exists here). They ran node v24.22.3 (the Owner's pin) vs my v26.13.0 → **v3 is the better basis for digest numbers**. Typecheck is per-arm flags → **use delta, never absolute.**

## Session 2 additions (2026-11-14, tip `cca94d8f`)

10. **WR-2 extended — offline is 5 of 9.** arm-react (252.09 kB), arm-solid (47.34 kB), arm-lit (47.79 kB) — all single-file, all **5/5 from `file://`**, 0 console errors. arm-sveltekit is a structural exception: `bundleStrategy='inline'` fixes the asset layer (110,299 B, 0 external refs), the router still fetches `/_app/version.json`. next/nuxt/solidstart untested (non-Vite).
11. **Container is not uniform** — `#app` ×5, **`#root` (arm-react)**, **`<framework-arm>` (arm-lit)**. `#app.children.length` returns `-1` (absent) for two arms.
12. **WR-3 — the additive specimen ties** — 2 files / 8 lines / 0 unrelated / 0 new type errors on svelte *and* lit. Third tie at zero → the column has no discriminating power. **Next specimen must use control flow or reactivity.**

## What the next session needs
- **Do, in this order:** (1) the WR-3 reactivity specimen on 3+ arms — halftime eligibility computed from per-focus data, re-rendered live. It is the only thing that can rescue the modification column, and WR-10 says the memo cannot rank without it. (2) offline on next/nuxt/solidstart — needs a per-framework mechanism, not a Vite plugin. (3) the `@solidjs/start` lazy-route line, in a dependency patch under scratch.
- **Do NOT redo:** anything with a receipt — the additive WR-3 specimen (provably non-discriminating), the six-arm offline run, the solidstart causes, the A3 script run, the w89 hashes, **the WR-7 file counts and the WR-10 falsifier page (both closed today)**, INKLING's withdrawn "43 files never vendored" claim.
- **Standing:** no framework pick, no ranking, no elimination; the modification column stays **no signal**; `file://` is my lane, not a framework score.

## Environment notes (so the next session does not rediscover them)
- Worktree `/Users/kosi/Desktop/wt/ernie`, branch `council/ernie`. Never edit the Owner's shared tree; never push anything but `council/ernie`; never force-push; never stash.
- Scratch: `git archive <ref> -- <path> | tar -x -C /var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/kilo/<name>`. Node **v26.13.0**, npm 11.20.0, Playwright **1.64.1**.
- **Use `background_process start` for servers**, not `nohup … &`.
- **`council/beam` is a moving branch** — always cite the sha you extracted at.
- macOS `shasum -c` mis-parses INKLING's `CHECKSUMS.txt`; verify manifests with an explicit Python recompute.
- Push gotcha: the shared repo is shallow — use `git push --no-thin origin council/ernie`. Do not `--unshallow`, do not force-push.
- `tools/hooks/pre-commit` is not executable here, so git prints "hook was ignored" on every commit. Harmless; do not chmod it.

## Open questions I could not close (carry them)
1. **The exact `@solidjs/start` line** where the SSR lazy route fails to resolve.
2. **Six stacks' offline behaviour** (sveltekit partially, next, nuxt, solidstart, react/solid/lit done) — non-Vite arms need a per-framework mechanism.
3. **The modification column** — still a tie at zero; needs a shape change (WR-3 option b).
4. **Typecheck comparability** — no standard config across the nine arms; and now: the 69-pin is vendored but never run.
5. **Whether arm-lit belongs in the set at all** (Owner named 8 stacks; the wave has 9 arms).

## Role
General advisor. Propose, test, dissent, measure. I never edit the product file, governance docs or the queue; proposals go to `inbox/`, terminal states are proposed with evidence, never moved. I do not review my own work.