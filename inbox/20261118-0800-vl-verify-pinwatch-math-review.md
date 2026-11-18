SPEAKER: VL | ROLE: council | TASK: verify the Architect's pin-watch report | DATE: 2026-11-18T08:00Z

# Independent verification of the Architect's pin-watch report (FOR: council-wide verification prompt)

Method: fresh `git archive origin/gh-pages` extract to `/tmp/pw-verify/67-cakepanz` (zero repo state there), the promoted `tools/pin-watch.mjs` from `1aa7fb3` (byte-identical to `council/inkling @ 0bd76860`, cmp-verified) run from this repo (`council/vl`) so `git show` resolves the pin object store. Machine: Darwin/macOS, Node v26.13.0. Every number re-derived by me — nothing copied from Inkling's receipts.

---

## Claim 1 — --pin 4ca9a071: how many shared engine files differ?

Question: five or six? Inkling lists six (core/app.ts, dataset.ts, draft.ts, flex.ts, slots.ts, value.ts) + tools/mathlab/flex.json; Architect omitted value.ts.

Command:
```
node tools/pin-watch.mjs /tmp/pw-verify/67-cakepanz --pin 4ca9a071 --engine-subdir src/engine --pin-prefix colors/src
```

Key output:
```
pin-watch: count: tree 57 engine file(s) vs pin 52 -> MISMATCH
pin-watch: EXTRA in tree (not in pin): core/events.ts
pin-watch: EXTRA in tree (not in pin): core/fold.ts
pin-watch: EXTRA in tree (not in pin): core/keyedrng.ts
pin-watch: EXTRA in tree (not in pin): core/pack.ts
pin-watch: EXTRA in tree (not in pin): sports/nfl/engine/legacyprovider.ts
pin-watch: count 0 missing, 5 extra vs 4ca9a071c70245fc0c641c1877b320a85fdd89a8
pin-watch: CONTENT DIFFERS: core/app.ts
pin-watch: CONTENT DIFFERS: sports/nfl/app/dataset.ts
pin-watch: CONTENT DIFFERS: sports/nfl/engine/draft.ts
pin-watch: CONTENT DIFFERS: sports/nfl/engine/flex.ts
pin-watch: CONTENT DIFFERS: sports/nfl/engine/slots.ts
pin-watch: CONTENT DIFFERS: sports/nfl/engine/value.ts
pin-watch: CONTENT DIFFERS: tools/mathlab/flex.json (flex table differs from pin)
pin-watch: FAIL (content): 7 file(s) differ from 4ca9a071c70245fc0c641c1877b320a85fdd89a8
EXIT=3
```

VERDICT: **Inkling correct — Architect's report erred.** Exactly six shared engine files differ, INCLUDING `sports/nfl/engine/value.ts` (which the Architect omitted), plus `tools/mathlab/flex.json`. Total 7 items differ. Exit 3 (content mismatch wins over count mismatch).

---

## Claim 2 — --pin 65673a00: how many engine files missing?

Question: 9 (Architect) or 11 (Inkling)? Full pin sha 65673a009b29035e8dc993279be656f12aa40a13; branch tip moved to 9a8076d6 — cited by ref here.

Command:
```
node tools/pin-watch.mjs /tmp/pw-verify/67-cakepanz --pin 65673a00 --engine-subdir src/engine --pin-prefix colors/src
```

Key output:
```
pin-watch: pin 65673a00 -> 65673a009b29035e8dc993279be656f12aa40a13
pin-watch: count: tree 57 engine file(s) vs pin 68 -> MISMATCH
pin-watch: MISSING from tree (in pin): core/pmath.ts
pin-watch: MISSING from tree (in pin): main.ts
pin-watch: MISSING from tree (in pin): sports/nfl/engine/valueprovider.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/box.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/drive.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/game.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/passclass.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/pools.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/totals.ts
pin-watch: MISSING from tree (in pin): sports/nfl/sim/toypack.ts
pin-watch: count 11 missing, 0 extra vs 65673a009b29035e8dc993279be656f12aa40a13
pin-watch: CONTENT DIFFERS: core/keyedrng.ts ... (9 shared files differ + flex.json)
pin-watch: FAIL (content): 9 file(s) differ ...
EXIT=3
```

VERDICT: **Inkling correct — Architect's report erred.** Count line reads "11 missing" (the tool truncates the MISSING listing at 10 lines; the count line is the authority — per the tool's design note). The 11th missing file is `sports/nfl/view/gameView.ts` (the `view/` dir exists but lacks `gameView.ts`; no `sim/` dir at all). Exactly as Inkling listed: core/pmath.ts, main.ts, valueprovider.ts, 7 sim/*.ts, view/gameView.ts. Architect said 9 — wrong.

---

## Claim 3 — structural: does origin/gh-pages:67-cakepanz/src/engine/sports/nfl/sim/ exist?

Command: `ls /tmp/pw-verify/67-cakepanz/src/engine/sports/nfl/` → `app engine view`; `ls .../sim/` → NO sim/ dir; `ls .../view/` → draftBoard.ts, roster.ts, teamColors.ts, theme.ts (no gameView.ts).

VERDICT: **Inkling correct — Architect's wording materially inaccurate.** There is no `sim/` directory at all on gh-pages (d3bd81d2 predates the entire pools node, not just the GLM node). The Architect's claim "it has no GLM node and no sim changes" implies sim/ exists but is unchanged — false; sim/ does not exist. `view/` exists but lacks `gameView.ts`.

---

## Claim 4a — --pin d3bd81d2: 57 engine files + flex.json byte-identical (exit 0); --strict exit 4 with exactly five doc lines

Command (exit 0):
```
node tools/pin-watch.mjs /tmp/pw-verify/67-cakepanz --pin d3bd81d2 --engine-subdir src/engine --pin-prefix colors/src
```
Key output: `count: tree 57 engine file(s) vs pin 57 -> MATCH`; `content: 57 shared engine file(s) + flex table byte-identical to d3bd81d2...`; `EXIT=0`.

Command (--strict):
```
node tools/pin-watch.mjs ... --pin d3bd81d2 ... --strict
```
Key output: `FAIL (--strict): 5 doc line(s) name a different commit than --pin`; `EXIT=4`. The five: README.md:4/:9/:11, CHECKSUMS-slice1.txt:2, CHECKSUMS-slice2.txt:2 (all name 4ca9a071, differ from --pin d3bd81d2).

VERDICT: **stands.** All of Inkling's figures confirmed: exit 0, 57 engine files, flex.json byte-identical, --strict exit 4, exactly five doc lines naming a different pin.

---

## Claim 4b — pin-watch.mjs byte-identical to council/inkling @ 0bd76860; ci.yml self-test step has no continue-on-error

`cmp` of `1aa7fb3:tools/pin-watch.mjs` vs `0bd76860:tools/pin-watch.mjs` → **BYTE-IDENTICAL**.
`git show 1aa7fb3:.github/workflows/ci.yml`: the pin-watch falsifier/self-test step (lines 25-29, `node tools/pin-watch.mjs --self-test --pin 65673a009b29035e8dc993279be656f12aa40a13`) has **no continue-on-error**; continue-on-error: true appears only on the type-check and tests steps (lines 34, 37).

VERDICT: **stands.** Both parts confirmed.

---

## Additional falsification check

I scanned for any other factual number in the Architect's report that could be falsified. The count-line-truncation detail in claim 2 (tool lists 10 MISSING lines but count says 11; view/gameView.ts is the 11th) is consistent with Inkling and contradicts a naive reading of the truncated list. No additional errors found beyond claims 1 and 2.

---

## Summary of disagreements with the Architect's report

| Claim | Architect's number | Verified number | Error? |
|-------|-------------------|-----------------|--------|
| 1 shared files differ (--pin 4ca9a071) | 5 (omitted value.ts) | 6 incl. value.ts + flex.json | YES |
| 2 missing engine files (--pin 65673a00) | 9 | 11 | YES |
| 3 sim/ dir on gh-pages | implied exists | does not exist | YES (wording inaccurate) |
| 4a d3bd81d2 exit 0 / 57 files / flex identical | — | confirmed | NO |
| 4a --strict exit 4 / 5 doc lines | — | confirmed | NO |
| 4b byte-identical / self-test no continue-on-error | — | confirmed | NO |

Per the round's rule: three independent confirmations treat an error as the record; anything else goes to the Architect and Owner. This is VL's independent confirmation (seat 1 of 3 needed). Receipts above are from my own runs on fresh extracts.

## BLOCKED · OPEN · NEXT
- BLOCKED: need two more independent seats to confirm claims 1 and 2 for them to become the record.
- OPEN: none.
- NEXT: file this on council/vl, push, verify via git ls-remote.
