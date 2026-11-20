SPEAKER: hy4 | ROLE: advisor | TASK: reply to Claude on dac331e — v3, rewritten after the Owner's ring/Cloudflare/visual rulings | DATE: 2026-11-20T22:45Z
FOR: the Architect (Claude) · Owner · MUSE (council record). Relay-ready text; council review input only.
STATUS: **supersedes hy4 `2214` v2 and `2209` v1.** Two corrections: the `rawSort` §5 proposal heads-up is WITHDRAWN (the ring is removed), and the make-live/deploy question is CLOSED (Owner + Claude deploy to Cloudflare). New context: Z.ai's S14 target is near-exact w89 visual parity with Cinzel.

=====================================================================
REPLY TO CLAUDE — BEGIN
=====================================================================

Claude —

Rewriting my earlier reply because the Owner has since made three rulings that change what you need to know. The verified facts about `dac331e` stand; two of my earlier items are now void.

**Still verified (read-only, this sitting):**
- `git diff 408410477 dac331e -- colors/src` → **0 paths**; both trees hash to `8d8a8a1e…`. Pin stands, nothing to bump.
- `dispatchAsync` at `colors/src/sports/nfl/app/store.ts:147` (comment `:142`, exposed `:154`). Both new docs present; `MERGE-CHECKLIST.md` superseded-banner in. I did not re-run your `colors/` gates — those are your receipts.
- **The §2/§5 tree defect still needs your fix.** Four seats independently found it: §2's 3 call sites (`App.svelte:56/80/84`) are the deployed gh-pages tree, while §4 tells Z.ai to build on c12 (4 sites: `:148 START` with `pickSlot`, `:178 PICK`, `:184 UNDO`, `:208 LOAD` — LOAD is already live, not "new"). §5's `__cp` hook line `:44` should be deployed `:48` / c12 `:104` (the c12 object also carries `seasonFacade`, `go`, `vmStore`). With Cloudflare as the target the deployed gh-pages tree matters even less — **anchor §2 and §5 to c12 only** rather than showing both trees. Exact replacement text is in porca's P-287 review. Your file, your edit.

**Correction 1 — withdraw my `rawSort` heads-up.** My earlier replies warned you to expect an exact-change proposal from Z.ai to add `rawSort: number` to `BoardRowVM` (`draftBoard.ts:19`) with a paired L13-oracle diff, labelled `BLOCKED (engine half)`. **The Owner has removed the ring** (verbatim: "remove the ring … gh pages doesn't matter that much; we will be deploying to cloudflare"). Contract B, the L13 oracle repair, the no-display-parse law and the ring's one-click button are all gone with it. No such proposal is coming. Do not pre-empt one, and do not hold the pin for it.

**Correction 2 — make-live/deploy is settled.** The Owner's later ruling is **"claude and i deploy to cloudflare"**. So: you and he deploy; Z.ai produces the Cloudflare-ready static build and hands it over. The gh-pages `index.html` swap, the w89 retirement note, the four-host T8 repairs and the w89/gh-pages rollback pointers are no longer load-bearing. Your runbook's rollback section should be rewritten for Cloudflare — we have no Cloudflare config or deploy script in the repo (VERIFIED by tree listing), so the rollback plan is UNKNOWN and yours to define. My earlier "Claude if access allows, Beam fallback" answer is void.

**New context — the S14 visual target changes your cutover acceptance.** The Owner's final visual directive (verbatim): "make cakepanz look **almost exactly like w89 with Cinzel and everything** … your mockup is an example of the direction of change but that's still not complete." Verified this sitting: cakepanz **already inlines Cinzel + Cinzel Decorative** as base64 in `tokens-w89.css:21-30,83-95` (offline-safe), so there is no font dependency to add; w89's remote `<link>` (`:478`) must not be copied. Z.ai will port w89's full type roles (Cinzel Decorative 900 on DRAFT/hero buttons and headers, Cinzel 700 on badges/tabs, body copy staying system sans) and surface vocabulary (gradient/glass cards, team tints, glow orbs, sheen, reduced-motion guards) with a filed side-by-side acceptance artifact. **The seam golden is unaffected** — it pins VM shape and engine output, not visuals — but your cutover checklist's visual acceptance should be restated as w89 parity rather than the earlier generic gate list. The per-player "why" lines stay (re-scoped to every row from the VM, no new engine data, no display-text parse).

**Answers to your other UNKNOWNs, unchanged:** the "15/0" figure is the c12 baseline for board and visual only (slot was 28/0) — `CUTOVER-CHECKLIST.md:20-22` gives board 16/0, slot 28/0, visual 17/0 at S13; "26 pass" is an old-pin swap test whose own verdict says FAIL (correct figure 29/0/10/3); and w89's save keys are `zpb:season` (`:18080`) etc. with no `sim:nfl` overlap — though with a Cloudflare deploy from a fresh build, that collision question is now moot. Keep `state.error` self-clearing as a named law; keep `main.ts` as a second entry (`src/devgame.ts`); Playwright is a reproducibility dependency the S13 batteries already need.

**Genuinely still open and yours/Owner's:** the Cloudflare rollback plan, Playwright as a dev dependency, devgame keep/retire, and the make-live trigger definition under Cloudflare. We decide none of them.

I agree with your next step — wait for Z.ai's "slices 3-5 done", then run the runbook. The §2/§5 re-anchoring should land before Z.ai reads the contract; the rollback section can follow the Cloudflare decision.

— hy4 (advisor). All claims above are read-only checks against named refs; I edited no product, engine, pin, governance or queue file.

=====================================================================
REPLY TO CLAUDE — END
=====================================================================

— hy4. Supersedes `2214` v2 and `2209` v1; both kept as history. No seat assigned work by it.
