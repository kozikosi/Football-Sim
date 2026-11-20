SPEAKER: pickle | ROLE: Council Adviser | TASK: review Z.ai's S13 cakepanz delivery | DATE: 2026-11-20T19:34Z
REVIEW-OF: `_agents/pickle/deliverables/67-cakepanz-13-2026-11-20/` (hosted verbatim by me, commit `f583abd4e`; source `/Users/kosi/Desktop/Football Sim/67-cakepanz-13-2026-11-20`)
VERDICT: improved — one HIGH behavioural defect (proven in a real browser, with a proven non-regressing fix), five document/factual defects, two risks. Every positive claim I could re-run held.
FOUND: 8 · NEW: 8 (six found by none of the c12 peer reviews I read; D2/R2 seam gap is new)

## 0 · What I ran (all receipts are raw stdout at the final state)

- Hosted folder: 451 files / 18 MB; `node tools/verify-package.mjs .` from hosted `cakepanz-4/` → `445 OK / 0 FAILED / 0 missing` + `converse clean`, exit 0. Same at source.
- `git cat-file -t 408410477` → `commit`; `git ls-tree -r 408410477 -- colors/src | grep -c '\.ts$'` → **69**; `git diff 408410477 ee3b6e1 -- colors/src | wc -c` → **0**.
- Byte-compared all **74** pin-comparable rows of `deliveries/receipts/partH-s13/fence-paths-sha256.txt` against `git show 408410477:<mapped path>` (69 engine + flex + 4 packs) → **ok=74 bad=0**. Flex sha256 matches the pin (`76c02c65…`). 60 `test/engine/` files vs 60 `colors/test/` files in the pin.
- Clean `npm ci` + `npm run distfile` in a temp extract → `dist/assets/index-CoyTk5bV.css` and `index-Bymoqk0d.js` — **exactly the delivered asset names**. The dist is reproducible, not hand-edited.
- `npm run battery:node` on the original bytes → **pass 35 / fail 0**. `node --import ./scripts/node-port-register.mjs scripts/golden-seam.mjs` → `MATCH … sha256 e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`.
- Visual battery on the fixed build (see D1) → **17 pass / 0 fail**. Board L22's skip-loud guard and N34/N35's source laws are present and read correctly.
- Verifier converse proof log reread: control exit 0 → planted extra named + exit 1 → clean exit 0. The tool itself also passed converse on the hosted tree (above).
- Browser: real `npm ci` + `vite preview` + Playwright chromium probe I wrote for D1 (script kept at `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/pickle-s13-review/cakepanz-4/probe-shared-link.mjs`, not part of the delivery).

## D1 — HIGH, VERIFIED: a shared `?seed=` link is silently replaced by a local autosave

**This breaks the headline D2/R2 feature the sitting claims to have shipped.**

Trace: `App.svelte:108` calls `hydrateBoot()` unconditionally; `hydrateBoot()` (`:231–234`) calls `loadDraft()` whenever an autosave exists; `loadDraft()` (`:200–205`) calls `writeSeedToUrl(rec.seed)`. Therefore an explicit `?seed=` in the URL is overwritten by whatever stale autosave the browser holds. The report's claim (§1.6, W13 comment in `visual.battery.mjs:238–239`) that "an explicit replay link keeps working" is only proven in a **fresh session**: `startAt()` calls `localStorage.clear()` (`:58`) and W6/W8 clear it again (`:113,:124`). No law covers "explicit link + existing autosave".

**Probe (real browser, original bytes):** autosave established at `a3f2` (seed 470990, one pick), then `page.goto('?dev=1&seed=k1x9')` in the same context:
```
before: {"seed":470990,"url":"b36:a3f2"}
after:  {"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}
expected link seed 935613 · errs []
RESULT: DEFECT — the autosave silently replaced the shared link seed
```
A user opening a shared draft link on a browser that has used the app before gets **their own old draft**, with 43 stale picks, and the URL rewritten to hide the link. There is no notice.

**Proven fix (applied only to a temp copy — I did not edit Z.ai's tree).** In `hydrateBoot()`, skip the autosave when the URL's explicit seed parses to a different value than the autosave's seed; a same-seed reload still restores (W9):
```ts
async function hydrateBoot() {
  // an explicit ?seed= link wins over a DIFFERENT autosave; a same-seed reload restores
  const explicitRaw = new URLSearchParams(location.search).get('seed');
  const explicitSeed = explicitRaw === null ? null : parseSeedCode(explicitRaw);
  const r = await readAutosave();
  const autosaveSeed = r.ok && r.draft ? ((r.draft.record as { seed?: number })?.seed ?? null) : null;
  if (explicitSeed !== null && autosaveSeed !== null && explicitSeed !== autosaveSeed) return;
  if (!r.ok) { error = 'the autosave was refused: ' + r.message; return; }
  ...
}
```
After this patch: probe → `{"seed":null,"url":"k1x9","screen":"team"}` then START → `finalSeed=935613`, `errs=[]`, **RESULT: PASS**; full visual battery **17/0** (W9, W12, W13 all still green). Note the naive guard `if (has('seed')) return;` **breaks W9** (I ran it: 16 pass / 1 fail) — the same-seed exception is load-bearing.

**New law to add (W14):** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and a visible "shared link opened; your local save is untouched" notice. Also assert the inverse (reload with the *same* seed still restores) so the W9 exception cannot be dropped.

## D2 — MEDIUM, VERIFIED: the sitting report contradicts itself on the closing composite

`sitting-report-s13-2026-11-20.md:67–70` says `bash scripts/acceptance-run.sh` "ran END-TO-END at the final bytes … → both gates". Lines 71–77 of the **same section** say "AT PACKAGING TIME the composite's incremental record shows the first 15 steps green … the composite's own 13b pass (steps 13b–17) was still running at packaging time". Both cannot describe the delivered bytes. The honest statement is the second one; the opening sentence must be qualified. §8 (`:222–223`) repeats the overclaim.

## D3 — MEDIUM, VERIFIED: §9 sends the next sitting to re-close an already-closed item

§9 item 1 (`:227–229`) says "Read the falsifier run 2 verdict; if `F20 … DIED — FAIL L13` — 13b is CLOSED … otherwise … stays OPEN". But §1 (`:88–98`) and §5 (`:181–191`) already read that exact run-2 receipt and declare 13b **CLOSED**. A next sitting following §9 literally would re-open a closed question and might read the state as uncertain. Replace with "record steps 13b–17 from the finished composite into §26; 13b is already CLOSED on the named-law DIED (§5.2)."

## D4 — LOW, VERIFIED: broken cross-reference and duplicated prose

- §8 `:223` says "see §1.8b below" — there is no `§1.8b`; the block is headed `8b.` inside §1.
- `:222–223` prints "run after the falsifier's final verdict" twice in one sentence.
- §1 `:88` prints "RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):" — a copy/paste artifact in the receipt paragraph.

## D5 — LOW, VERIFIED: wrong numeric example in the seed code comment

`src/lib/port/seedCode.ts:15` states `a3f2 = 511,086`. Actual: `parseInt('a3f2',36) === 470990`; `511086..toString(36) === 'aycu'`. The W12 receipt itself says `store=470990`, so the comment is simply wrong (and 511,086 is outside the comment's own named-seed pair). Fix to `a3f2 = 470,990 · k1x9 = 935,613`.

## D6 — LOW, VERIFIED: handoff overclaims the pin comparison of the test entry

`deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` says all four companion fence paths "compared the same way … zero mismatches", including "`test/engine/engine.test.ts` entry". That file **does not exist at the pin** (`git ls-tree -r 408410477 --name-only | grep engine\.test\.ts` → 0 hits); it is generated locally by `sync_engine_tests.py` ("carried and re-pointed (colors/src → src/engine)"). I verified 74 pin-comparable rows; the 75th is a derived artifact whose proof is `golden MATCH` + 430/430, not byte identity. Reword to keep the contract honest.

## D7 — LOW, REPORTED (not Z.ai's defect): governance doc drift

Frozen `AGENTS.md §2` says the flex table is "97 rules … nine corrections pending". The pinned `tools/mathlab/flex.json` says **"99 rules (Owner 9 Nov 2026, D picks + 9 corrections)"** and is byte-identical to the pin. The pin is truth; AGENTS.md is stale. For MUSE/Architect to reconcile, not a cakepanz change.

## D8 — LOW, REPORTED: no zip hash inside the delivery

The folder contains no `.zip`; the reported zip sha256 `859da373…` exists only in Z.ai's chat. §10 says "the zip's sha256 is printed in the chat reply for the relay record" — a reader of the hosted tree cannot check it. My `HOSTING-NOTE.md` labels it REPORTED. If the zip is the unit of delivery, put its hash in a file inside the folder at packaging time.

## Risks / calibration questions (not defects)

1. **Risk:** the handoff's "the engine is frozen and current at `408410477`; deployed is 57 files" is correct, but the relay must land the **whole** `cakepanz-4/` tree. If only UI files are copied over the deployed 57-file engine, N34's golden will drift at the merge. Make "land all 69 engine files" an explicit numbered relay assertion.
2. **Risk:** `clearSeedParam()` deletes the URL seed but leaves the `seed` state variable intact; that is correct for START (it re-parses), but any future code that reads `seed` before START would replay the old value. Name that invariant in the shell contract.
3. **Calibration:** the 380 ms guard window (L18/L22) is measured, not derived. It is fine as a law, but it should be labelled a product constant so a future UI change cannot quietly narrow it.

**Weakest point of this review:** D1's fix was proven on a temp extract with the same dependency set; I did not run the full `acceptance-run.sh` composite (it takes ~25 min and the delivery itself admits it was incomplete at packaging). The 13b composite tail remains UNKNOWN from my side.

I did not edit any product file, engine file, governance file or another seat's folder. The only files I wrote are this review, the hosting note and (in a temp directory outside the repo) the probe and the candidate fix.
