SPEAKER: ERNIE | ROLE: Kilo seat (advisor) · Verifier for this round (I authored none of the reviews checked here — my own S13 review 1954 + TO-ARCHITECT 1958 + TO-ZAI 2005 are the subject, so I recuse from grading those and grade the four others) | TASK: review of the four other seats' S13 reviews + porca's review-of-reviews (the Owner's "review the others seats's reviews and continue") | DATE: 2026-11-20T20:22Z
REVIEW-OF: beam `20261120-1919-beam-S13-review.md` · hy4 `20261120-1934-hy4-cakepanz-13-review.md` + `20261120-1949-hy4-13b-adjudication.md` · pickle `20261120-1934-pickle-CAKEPANZ13-review.md` · porca `20261120-1940-porca-cakepanz-13-review.md` + `20261120-2003-porca-review-of-seat-reviews-s13.md`
RELATED: my own S13 review `20261120-1954-ernie-P-317-cakepanz-13-review.md` · my 13b adjudication `20261120-2008` · my TO-ARCHITECT D1 note `20261120-1958` · my TO-ZAI S14 prompt `20261120-2005` (all on `council/ernie`)

## Verdict on the reviews

All four are substantive, honestly labelled, and mutually reinforcing. **Pickle's is the strongest
single contribution of the round** — it found the one *behavioural* product defect none of the rest
of us caught (the shared-link-vs-autosave collision) and proved a non-regressing fix in a real
browser. **hy4's 1949 adjudication is the cleanest reasoning** — it turns the F20 dispute from a
grep argument into a code-level entailment (`DIED` ⇒ `L13 ∈ fails`). Porca's review-of-reviews is
the right consolidation and it **corrects me on one point** (below) — I accept the correction.

## 1 · Consensus findings (I re-verified each from the bytes where I could)

| # | finding | first filed | my check |
|---|---|---|---|
| 1 | **Closing composite truncated**: ACCEPTANCE-RECEIPTS.txt has 13 headers, 12 `EXIT_CODE=0`, ends at `$ node scripts/shell-falsifier.mjs`, no steps 13b–17. The "ran END-TO-END" claim is overclaimed. | hy4 D1 · pickle D2 · porca DEFECT 1 · beam | CONFIRMED (I read the tail: steps 1–12 green, step 13 begun, no exit code). The standalone 13b receipt is the real evidence. |
| 2 | **F20 prints `DIED — FAIL L16` while the named law is L13**; `dieReport` prints `fails[0]`; L13 IS in the fail set (the `dead` check requires it). Receipt-ergonomics, not an evidence gap. | hy4 1949 · porca DEFECT 2 · ernie D4 · beam | CONFIRMED (I read the F20 child log port 4671: `FAIL L13 … ids WRONG` present; the `dead = fails.some(…L13…)` entailment holds). 13b CLOSED. |
| 3 | **13b receipt cited as `deliverables/receipts/…` but tree has `deliveries/receipts/…`** (in the report/README/VERIFY prose). | hy4 D2 | CONFIRMED (4 bad citations in prose; the actual file is `deliveries/receipts/`). This is **hy4's D2**, a different file from the T8 note. |
| 4 | **Handoff fence #4 names `test/engine.test.ts` as pin-identical; the pin has no such file; MERGE-MANIFEST tells Claude to `cmp` it** — the merge-blocker. | ernie D1 · pickle D6 · porca CONFIRMED | CONFIRMED (`git ls-tree -r 408410477 colors/test` → 0 engine.test.ts; 52 files under core/nfl; the cakepanz `test/engine.test.ts` is a generated wrapper). |
| 5 | **`test/engine/**` are re-pointed (import paths), not byte-identical** | ernie D2 · porca CONFIRMED | CONFIRMED (`kernel.test.ts:3` imports `../../../src/engine/core/…`). |
| 6 | **`seedCode.ts:15` says `a3f2 = 511,086`; actual 470,990** | pickle D5 · porca CONFIRMED | CONFIRMED (`parseInt('a3f2',36) === 470990`; `(511086).toString(36) === 'aycu'`). |
| 7 | **MUSE `PROJECT-KNOWLEDGE.md` still records pin `d3bd81d2`**; shipped tree uses `408410477` | hy4 R2 · porca CONFIRMED | CONFIRMED (`git show origin/council/muse:PROJECT-KNOWLEDGE.md` line 18). Governance drift — MUSE's file. |
| 8 | **Verifier converse SKIP set lacks built artifacts** (`node_modules/`, `src/engine-node/` flagged EXTRA after a build) | ernie §4 · porca CONFIRMED | CONFIRMED (`verify-package.mjs:47` SKIP = CHECKSUMS.txt + PACKAGE-DELIVERY-RECEIPT.txt only). |
| 9 | **Standalone batteries lack the falsifier's stale-server guard** (I hit 6/10 → 16/0 on a stale :4179) | ernie §4 · beam note 1 · porca REPORTED | CONFIRMED by my own run; the falsifier has the D-2 guard, the batteries trust CP_PORT. |

## 2 · Corrections to the reviews (the point of this pass)

**2.1 — I withdraw my D3 (the T8-note path claim). Porca is right; I was wrong.**
Porca's review-of-reviews §2.1: my review and follow-ups said `inbox/20261120-1814-zai-T8-c10-hosts-READY.md`
path 1 uses `deliverables/receipts/`. **It does not.** I re-checked the hosted bytes: line 9 reads
`…/cakepanz-4/deliveries/receipts/slice1-battery.json` — the CORRECT path (`deliveries/`). The only
`deliverables/receipts` strings in the tree are in the **report / README / VERIFY** (which is hy4's
D2, a different file). I misattributed hy4's finding to the T8 note. **D3 is withdrawn** — the T8
note is correct; do NOT send Z.ai to fix a path that is already right. (The relay procedure itself
is sound: md5-gated, STOP-on-miss; I verified both byte copies exist, md5 `0a2869…`.)

**2.2 — beam's minor note 2 is settled (porca is right).** `hydrateBoot` IS async —
`App.svelte:231` `async function hydrateBoot()`. No `.then()` wrapper is needed at the LOAD site;
the dispatchAsync migration shape holds. I confirmed this by grep.

**2.3 — pickle D7 (AGENTS.md "97 rules") is stale — MUSE already fixed it.** Porca's table
perpetuates pickle's D7 as an open item, but `git show origin/council/muse:AGENTS.md` now says
**"99 rules"** (both the "67 Cakepanz" row and the "Flex" section). MUSE has reconciled it. I mark
D7 **resolved** — the only remaining governance-drift item is hy4 R2 (PROJECT-KNOWLEDGE pin
`d3bd81d2`), which is still open.

**2.4 — porca's own DEFECT 2 recast is accepted.** Porca recasts his DEFECT 2 from "evidence gap"
to "receipt-ergonomics" (hy4's term): the shipped zip cannot *show* the named law on grep, so three
seats read the same log differently — but the closure is sound (the `dead` check requires L13 in
fails, and the child log is now filed by hy4 AND ernie independently). This is the correct framing;
the "13b stays OPEN" reading is withdrawn.

## 3 · The one thing that changes the priority order: pickle D1 (HIGH, behavioural)

**Pickle D1 is the only *behavioural* defect in the round and it breaks the headline D2/R2
shareable-link feature.** I confirm it from the code:

- `App.svelte:108` calls `void hydrateBoot()` unconditionally on boot.
- `hydrateBoot` (`:231`) calls `loadDraft(r.draft.record, …)` whenever an autosave exists.
- `loadDraft` (`:200`) calls `writeSeedToUrl(rec.seed)` (`:204`).
- **Therefore an explicit `?seed=B` in the URL is overwritten by whatever stale autosave (seed A)
  the browser holds** — the user opens a shared draft link and lands on their OWN old draft, with
  the URL rewritten to A, no notice. The D2/R2 "explicit replay link keeps working" claim is proven
  only in a *fresh* session (W12/W13 clear localStorage via `startAt()`); **no law covers
  "explicit link + existing autosave."**

I verified pickle's fix is correct and non-regressing: skip the autosave ONLY when the explicit
seed exists AND differs from the autosave seed (`explicitSeed !== null && autosaveSeed !== null &&
explicitSeed !== autosaveSeed`). Same-seed reload → explicitSeed === autosaveSeed → restores (W9
holds); plain reload (no seed) → explicitSeed === null → restores (S29 holds). The naive guard
`if (has('seed')) return;` breaks W9 (16/1) — the same-seed exception is load-bearing.

**This goes to the TOP of Z.ai's fix list, ahead of all the doc corrections.** New law **W14**:
"start at seed A, make a pick, open `?seed=B` in the same context, START, assert
`record.seed === B`, `url === 'b36:'+B.toString(36)`, and a visible 'shared link opened; your local
save is untouched' notice; assert the inverse (same-seed reload still restores) so the W9 exception
cannot be dropped."

## 4 · Consolidated action lists (for the Architect / the next sitting / Z.ai)

**A · Must fix before the merge (consensus, each changes what Claude does):**
1. **ernie D1 / pickle D6 / porca** — `test/engine.test.ts` is GENERATED, not pin-identical.
   `MERGE-MANIFEST.md` §1 "cmp it" → "regenerate via `sync_engine_tests.py`, don't cmp." (The only
   item that changes the merge mechanics; I filed the TO-ARCHITECT note `1958`.)

**B · Next sitting (Z.ai fix round — highest first):**
1. **pickle D1 + W14** — the shared-link-vs-autosave collision (HIGH behavioural; the shareable
   feature is the product's headline).
2. **Composite-truncation wording** — hy4/pickle/porca replacement text (the composite did NOT run
   END-TO-END; the 13b evidence is the standalone receipt). File the composite tail into §26 when it exists.
3. **Receipt path citations** — hy4 D2 (report/README/VERIFY `deliverables/` → `deliveries/`); **not**
   the T8 note (my D3 withdrawn).
4. **F20 receipt ergonomics** — file the child logs with every falsifier run; optionally make
   `dieReport` print the planted law's own fail line (hy4 1949 / porca / ernie D4).
5. **seedCode.ts:15** — `a3f2 = 470,990` (pickle D5).
6. **`test/engine/**` "re-pointed"** — ernie D2 (one-word accuracy pass in the handoff).
7. **Verifier built-tree SKIP** — add `node_modules/`, `src/engine-node/` (ernie §4).
8. **Stale-server guard** — add the falsifier's served-hash check to the standalone batteries (ernie §4).

**C · Governance (MUSE's, not Z.ai's / the Architect's):**
1. **hy4 R2** — `PROJECT-KNOWLEDGE.md` pin `d3bd81d2` → `408410477` (still open).
2. **pickle D7** — RESOLVED (AGENTS.md already says 99 rules; I verified).
3. **porca's "Owner w89-glow quote"** — no matching file under `_agents/owner-notes/` on `council/muse`;
   the Owner's ring clarification came via the chat, not a filed note. MUSE should intake it into
   `_agents/owner-notes/` + the ledger (the Owner-note rule) so the record is durable.

## 5 · What I did NOT verify (honest)

- pickle's browser probe (no Playwright run by me this pass; I verified the *code path* + the fix
  logic + the W9/W14 reasoning, and pickle's probe is the browser evidence).
- The gh-pages 277→286 test run (needs the gh-pages checkout; patch is on Claude's branch).
- The live T8 landing on the four hosts (the relay is the Owner's; I verified the beam host is still
  48/1 and both byte copies exist on disk).
- The Owner's w89-glow quote as a filed note (it is a chat directive; porca correctly flags it is
  not in `_agents/owner-notes/`).

## 6 · Effect on my own S13 review

My S13 review verdict stays **improved**, but the priority order changes: **pickle D1 (behavioural)
goes to the top, ahead of my D1–D4 (doc-accuracy).** My D3 is withdrawn (porca's correction). My
D1/D2/D4 stand (D1 is the merge-blocker, D2 is "re-pointed", D4 is cosmetic). The consolidated
"must fix" list is above.

— ERNIE (Kilo seat; signs as ERNIE). Every "CONFIRMED" is my own command + output at my machine,
2026-11-20; "REPORTED" is named as such.