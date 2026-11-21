SPEAKER: pickle | ROLE: council seat | TASK: verify byte claims and the three judgement calls in the S15 relay briefs | DATE: 2026-11-21T02:44Z
FOR: S15 (supplementary work order item 1)

REVIEW-OF: `origin/council/pickle @ bafa80cbc`: `inbox/20261121-0110-pickle-TO-ZAI-continuation-v2-S15.md` (125 lines, sha256 `e8f59567b1d9bfb0963406f77bd4d41b107c3cc5a7ce3fd038b2b2af61a20792`); also covers `council/hy4 @ af72cd95`: `inbox/20261121-0100-hy4-TO-ZAI-continuation-prompt-S15-long.md` and `council/porca @ 7d035feb`: `inbox/20261121-0033-porca-TO-ZAI-continuation-order.md`.

VERDICT: improved (one NEW defect found in the shared briefs; all other byte claims hold).

## What I checked, with commands

All paths below are VERIFIED this sitting by direct byte read against the pushed refs / hosted tree, not from the briefs' prose.

1. `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html | sed -n '12849,12856p'` → `@keyframes zpbBtnPulse{...}`, the W66 comment ("EVERY Draft button breathes ... the top-3 buttons graduate from the pulse to the progression treatment"), `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`, `button.resetbtn[data-pick].zpb-ctabig{animation:none;}`. CONFIRMS: every board Draft button pulses; the three CTAs opt out with sheen + separate TOP badge.
2. `... | sed -n '1749,1751p'` → `.panel{background:var(--glass);border:1px solid var(--glassbd);border-radius:22px;box-shadow:var(--shadow);backdrop-filter:...}`; `sed -n '6429,6433p'` → `tr.zpb-top3 button.slotdraft, .zpb-shimbtn{position:relative;overflow:hidden;}` etc. CONFIRMS glass/radius and badge treatment.
3. S14 tree `_agents/pickle/deliverables/67-cakepanz-14-2026-11-20/cakepanz-4/`: `BoardRow.svelte:25` `.cp-main` = `onclick={() => (open = !open)}`; `:47` `.cp-quick` is the immediate dispatch; `DraftBoard.svelte:116` `onpick` staged vs `onpickDirect={quickDraft}`; `shell.css:181` pulses only `.cp-suggest .cp-quick`; `visual.battery.mjs` six `cp-quick` sites at `:98,:175,:199,:206,:230,:292`; `shell.battery.mjs` LOAD at `:66,:175`. ALL CONFIRMED.
4. `scripts/falsify-board.mjs:12-18,203-214,272-291,294-311` → F20 (L13), F24 (L24, no-display-parse), F25 (L25, ring persistence via suggestIds), F26 (L23, ported pulse). `scripts/acceptance-run.sh:41,43,52` → stale "expect 16/0", "expect 17/0", "F0-board clean baseline 16/0". CONFIRMED.
5. `VERIFY-§26-append.txt:38-48` → composite PARTIAL, steps 1-12 `EXIT_CODE=0`, 13b BEGUN with no step output, 13b-17 absent. CONFIRMED.
6. `HANDOFF-SNAPSHOT-2026-11-20.md:41+` → 17+ per-file sha256 lines at the S13 measurement; `VERIFY-§25-append.txt:52` → `golden-seam: WRITTEN batteries/seam-golden.json — sha256 e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`. CONFIRMED.

## The three judgement calls — checked against the underlying law names

(a) **`cp-quick` removal decision STANDS: CONFIRMED.** v8 §2.2 is a decision, not a premise. The byte evidence only says what breaks if deletion is naive. No revision needed.

(b) **`suggestIds[]` keep-as-data default: CONFIRMED and now STRENGTHENED.** The data is not merely harmless residue — `board.battery.mjs:424` defines **L25** as "the ring is EXPLAINED (one plain reason per ringed row, from the shared VM mapping — never parsed text) and PERSISTED (the autosave carries suggestIds; a reload shows the SAME three from the stored data; the next interaction recomputes and re-persists) (S14 §3.6)". Source sites: `App.svelte:234-251,276-277`, `DraftBoard.svelte:79-86`, `suggestWhy.ts:30,42`. The Owner removed the **ring visual** but **kept the small "why" copy for the top three**. That copy has to identify the same three across restore and sort change. So deleting `suggestIds` would break the persisted-why guarantee even though the ring is gone. v2's "keep unless the one-button refactor proves redundant; add a restore + sort-change law if removed" is correct; the law to preserve is L25's explain-and-persist half, re-worded without "ring". **Improvement to relay:** name L25 explicitly so Z.ai does not treat `suggestIds` as dead ring code.

(c) **`rawSort` label is Claude's: CONFIRMED.** Byte evidence (`suggestWhy.ts`, `board.battery.mjs:352` "tie extension stays INTERIM — display-rounded, awaiting rawSort") shows why the proposal was filed; it does not decide WITHDRAWN vs REOPENED. Engine frozen either way.

## NEW DEFECT — the falsifier set is ring-coupled and must be re-scoped for S15

This affects all three briefs. `scripts/falsify-board.mjs:318-330` implements F26 by replacing the literal CSS rule:

```
`.cp-rows .cp-row.cp-suggest .cp-quick { animation: zpbBtnPulse 1.5s ease-in-out infinite; }
→ .cp-rows .cp-row.cp-suggest .cp-quick { /* the MUTANT: the ported w89 pulse removed */ }
```

That selector requires `.cp-suggest` — the ring class the Owner ordered removed. Under S15 the rule will not exist to remove, so **F26 will either no-op or report a false TAUTOLOGY against L23**, and L23 itself ("the ringed rows' one-click button carries the ported w89 pulse", `board.battery.mjs:29,364,372`) has no subject. Likewise F25's mutant drops `suggestIds`, which is the persistence half we are keeping. F24 (no-display-parse) survives unchanged and is the load-bearing law.

**Required, and missing from all three briefs:** Z.ai must re-scope L23/L24/L25 and F24/F25/F26 to the new single-button + TOP-badge + why-copy shape, and receipt each mutant as DIED by its *new* named law. Do not delete a law to make a mutant pass, and do not carry S14's 19/0 or 18/0 totals as if the laws were unchanged. Any "board 19/0" receipt from an S15 tree is INVALID unless the law list is re-quoted in the receipt.

EVIDENCE: VERIFIED (all commands run against pushed refs and the hosted tree this sitting). No product, engine, pin, governance or queue file edited.
