SPEAKER: porca | ROLE: council seat (advisor) | TASK: improved self-contained continuation prompt for Z.ai, revised after reviewing seat reviews of prior porca prompts and the S15/server review record | DATE: 2026-11-22T11:28Z
FOR: Z.ai (primary) · Owner (relay/record) · Architect (Claude) · MUSE (intake) · council
SUPERSEDES (for this purpose): `inbox/20261121-1701-porca-TO-ZAI-continuation-prompt-S15-closeout-and-claude-server-state.md` — keeps its facts, adds review-driven corrections/structure, and is more explicit about receipt order, bytes-vs-claims, and self-contained handover.
ADVISORY: No assignment. Work comes from the live queue: `node tools/council.mjs next` from `origin/council/muse` (pull the v9 tool from `origin/council/muse:tools/council.mjs`; `council/base` is a stale ghost). I edited no product, engine, pin, governance, queue, or `tools/` file.

# Z.ai Continuation Prompt v2 — S15 Closeout, Self-Contained (Post-Claude Timeout)

## 0. How to use this prompt

**This document is self-contained.** Do not assume you have read any prior draft, chat, or seat prompt. If an earlier draft conflicts with this one, follow the **bytes/receipts** and the **Owner/Architect rulings** named here; if still irreconcilable, stop and report the conflict with the exact file/line/command.

**Labels (use them in every claim):** **V** = you ran/read it and cite command+output/file. **R** = another seat/artifact says it; you did not re-run. **I** = inference. **U** = unknown/unsettled. Do not upgrade R/I/U to V. A "V" without an existing path/command output is not V.

**Two standing Owner rules (carry into execution):** (1) **Finish all work before you reply** — one response, one zip/bundle, all receipts; reply early only for a real blocker, and name the blocker + exact command/output + what you did instead. (2) **Innovate around the issue** — if a line is wrong, brittle, or honest-but-useless, challenge it with the byte/battery line that proves it; do not silently obey a wrong line and do not silently weaken a law.

**Delivery gate:** a delivery is a **pushed commit (hash) OR a download link**. Never give a sandbox/local path as delivery. Say which route you used; never claim the other.

**Interpretation rule:** when passages conflict, the more specific and later passage wins, unless a higher authority rules otherwise. Priority of authority: Owner > Architect > this prompt. Bytes win over prompt numbers. If a count/hash/name in this prompt disagrees with the bytes you measured, report the measured value and cite both.

## 1. Ground truth (V unless marked R/U)

| Item | Value / State | Evidence |
|---|---|---|
| Engine pin for S14/S15 shell work | `408410477` | R: work order v8 / closeout docs; V in closeout receipts: fence `diff -rq` empty, 69 TS files, `draftBoard.ts` sha `e9e6e01a…` |
| Seam golden | `e8fed8ab…` — must remain unchanged by any later re-pin/stats-fields work | R: Architect contract/NOW |
| Your S15 closeout tree (published by porca) | `zai-s15-closeout-2026-11-21/` on `origin/council/porca` (508 files, 19M, commit `7f3b1a9d2`) | V: prior porca push/review sitting |
| S15 closeout verdict from seat reviews | Engineering substance real; **delivery not acceptance-clean** | V: porca read beam/ernie/hy4/iceman/pickle/porca reviews |
| Claude architect tip at timeout | `9c4ca0f275` on `origin/architect/engine-and-seats` — `server/` account+sync core added; `colors/src` untouched | V: read commit/stat; R: server tests 27/27 reproduced by ernie/hy4/pickle |
| Cloudflare decision (revised) | Workers Static Assets + one thin Worker, D1 only v1, no KV/R2/DO v1, explicit `wrangler deploy` after Owner "go", no Git auto-deploy | V: `claude/cloudflare-decision-2026-11-21.md` |
| Hostname target | `<worker-name>.<account-subdomain>.workers.dev`; target `play.76pancakes.workers.dev` or closest free variant; exact string pinned at rehearsal | V: cloudflare decision; U until dashboard/rehearsal |
| Auth ruling | Better Auth in same Worker candidate; GitHub v1; Google only if spike passes; not Clerk (owned-domain production requirement conflicts with “free now and always”) | V: 0533 ruling |
| Stats ruling | User run players; aggregates maximized; raw logs stay pruned; one ledger row per run; legend 100/10/1 INFERRED for v1 | V: 0533 ruling |
| Owner brag ruling (P-209) | No downloads; no seed in paste; copy-paste text; build-time deployed URL; season brag-link button hidden while URL unset; Owner verbatim "Can you go 20-0?" | V: canonical/rulings/S15 docs; keep verbatim unless Owner changes |

## 2. Two-tree / artifact orientation (do not confuse these)

| Tree / artifact | What it is | Who owns it | Your rule |
|---|---|---|---|
| `zai-s15-closeout-2026-11-21/` (S15 delivery folder) | Your closeout delivery package being reviewed | Z.ai produces; seats verify; Architect/Owner accept | This is your primary work target for closeout fixes |
| `src/engine/**` inside that package | Engine snapshot mirror | Frozen to pin `408410477` | **Do not edit.** Fence must prove `diff -rq`/hash parity |
| `colors/src/**` on architect branch | Canonical engine source | Claude/Architect | **Never edit.** |
| Live w89 / gh-pages reference | Visual/reference build | Owner/Architect deploy lane | Compare against it; do not modify it |
| `server/` on architect branch | Claude account/sync Worker core | Claude | **Read-only awareness.** No wrangler/auth/D1/client-sync edits |

## 3. What Claude did before timeout (awareness only — not your tasks)

**V (read):** Claude added `server/` core at `9c4ca0f275` with D1-shaped adapter tests, CAS save store, server-authoritative run derivation, share token hashing, caps/503 sync-paused behavior, and `/api/auth/*` 501. Contract/cloudflare decision/rulings/work-order-v8/visual-acceptance-spec were written/updated.

**R (seat reviews, not rerun by me):** ernie/hy4/pickle reproduced 27/27 pass and found no blocking defects; they noted follow-ups (NFL-hardcoded stats, D1 error-string fidelity, CORS/deploy shape, mutation harness not committed, share `kind:'save'` full-envelope possible Owner-rule conflict, legend fold/contract drift). 

**Your implication:** keep the shell handover static and contract-compatible (`base:'/'`, relative `/api/...` only if ever needed, no hardcoded host, no wrangler/auth/secrets/backend). Do **not** build account UI, OAuth, sync client, D1 schema, Worker routes, or deploy config.

## 4. S15 closeout: what seat reviews agreed on (R consensus from V reads)

**Good/reals (do not regress):** engine fence clean (69 TS, draftBoard sha `e9e6e01a…`), D5 stale ENGINE_PIN removed / `metaNow()` stamps running `engineVersion()`, D1 digest verifier handles md5+sha256 + converse clean (in code), L31 toast truth, P-209 brag reconcile (VITE_BRAG_URL, no download, no seed in paste, link hidden when unset), `base:'/'`, distfile inlines `/assets/` and `./assets/`, gone% native button a11y, ring retirement named, falsifier/law additions present.

**Blocking before “slices done / accepted closeout”:**

1. **B1 Verify-package red at delivered bytes.** `node tools/verify-package.mjs .` fails because handover hash is stale in CHECKSUMS (1 FAILED, converse clean) — R by ernie/hy4/pickle/iceman.
2. **B2 Overclaimed receipt prose.** Handover §3 claims F27–F31 by-name deaths / V labels not backed by delivered logs; F30/F31 logs absent; composite stopped at step 12. §7/VERIFY appendix are closer to truth — fix prose to match bytes.
3. **B3 Stale SHELL-STATUS.** Generated at old time with stale asset names/counts/ring wording; regenerate from final bytes.
4. **B4 Composite incomplete.** Steps 13–17b / full by-name falsifier / packaging tail / `ACCEPTANCE RUN COMPLETE` not filed at final bytes.
5. **B5 Side-by-side incomplete.** Only 3 right-side PNGs; missing left/w89 pairs, receipt json, composite doc per visual-acceptance spec.

**Quality risks (handle during B4, do not weaken laws):** F24 may be tautological; F28 may be red-elsewhere (killed L23, not L27). Re-home probes/mutations by name, same discipline as F27.

## 5. The fix order is load-bearing (do this in order)

> **Text edits -> regenerate generated status/docs from bytes -> RESEAL LAST -> composite -> side-by-side.**  
> Do not seal, then edit, then claim green. A receipt at changed bytes is not a receipt.

### Step A — Reproduce and record the red state (V)
From the S15 delivery tree:
- `node tools/verify-package.mjs .` (capture exit/output)
- record current dist asset names/hashes and SHELL-STATUS header timestamp
- record whether side-by-side receipt/json/pairs exist
- record ACCEPTANCE-RECEIPTS tail / missing COMPLETE

### Step B — Correct narrative docs first
- Fix handover §1/§3/§5/§9/§12 contradictions so every V cites a file that exists. Remove/relabel overclaims for F30/F31/F27–F31 until re-run receipts exist.
- Update SNAPSHOT/SLICE-STATUS/VERIFY appendix/gh-pages-fix README stale numerals or mark historical with exact measured replacement.
- Include the **display-rounded-oracle caveat** where top-three copy/oracle is discussed (do not remove it). Keep `rawSort` filed/not applied unless Architect rules otherwise; no engine bytes.
- Include D5 fix **with its law** if touched; do not just change a string.

### Step C — Regenerate generated artifacts from final bytes
- Run `node tools/shell-status.mjs` (or the tree’s canonical generator; confirm command in package/scripts) and let it write SHELL-STATUS. Do not hand-edit generated status.
- Confirm asset names/hashes/counts match actual `dist/`.
- Ensure side-by-side spec includes **panel-bearing season screen** in addition to Team Select, board+top3, pick confirm, finished draft (per visual acceptance/spec + review catches).

### Step D — Reseal LAST before composite
- `node scripts/regen-manifest.mjs` (or canonical command)
- `node tools/verify-package.mjs .` => **0 FAILED, 0 missing, converse clean, exit 0**
- If you edit any byte after reseal, reseal again before claiming acceptance.

### Step E — Resume full acceptance composite at unchanged bytes
- `bash scripts/acceptance-run.sh` (confirm path). Complete through 13–17b; file `ACCEPTANCE RUN COMPLETE` tail.
- Rerun by-name falsifiers; file F24/F28/F30/F31 child logs. If F24 tautological or F28 red-elsewhere, **re-home probe/mutation by name**; do not weaken assertion/law.
- Also run/record packaging gates: gate-manifest, gate-numerals, converse clean, both-tree checks where required by handover (record S14 467 receipt if required by your tree’s DoD; if not present, mark U with reason).

### Step F — Complete side-by-side artifact
- Run `node scripts/side-by-side-s15.mjs` (or canonical script). Produce required PNG pairs, receipt json, and composite doc. 
- If capture crashes, file crash receipt with command/output; fix script; rerun. Do not claim “FILED” until files exist.
- Scenes/viewports must follow `claude/visual-acceptance-spec-2026-11-21.md`; include panel-bearing season screen.

## 6. Guards / fences (do not cross)

- **No engine/pin edits:** no `colors/src`, no `src/engine` snapshot changes, no protected constants, no seam-golden changes.
- **No governance/queue/tools edits:** no `AGENTS.md`, `PRIORITIES.md` as queue owner action, `tools/` except using existing scripts; do not invent assignments.
- **No deploy/auth/server:** no wrangler, no Cloudflare deploy, no Better Auth/OAuth wiring, no D1, no secrets, no account UI pretending sync is live.
- **No P-209 regressions:** no downloads, no seed in paste, no `file://` brag URL, VITE_BRAG_URL build-time/empty-safe.
- **No fake receipts:** no hand-editing CHECKSUMS/SHELL-STATUS to look green; no "V" without artifact; no weakened laws.
- **Accessibility/visual:** keep reduced-motion guards; native interactive elements where required; contrast/no-horizontal-scroll at 390px; panel treatment toward w89.

## 7. Calibration asks — file, do not guess

| Ask | Default recommendation (I) | Owner/Architect |
|---|---|---|
| Brag ask-line "Can you go 20-0?" vs "undefeated" | Keep Owner verbatim "Can you go 20-0?" unless Owner changes | Owner |
| Ring revival scope (glow only vs Contract B correctness work) | Keep landed correctness work; do not remove useful correctness without ruling | Owner/Architect |
| Vite 7.3.6 in package.json vs Owner Vite 8 order | File byte line + order line; do not silently bump during closeout unless Architect/Owner says so | Architect/Owner |
| rawSort / display-rounded oracle | Keep caveat; file-not-applied; no engine bytes | Architect |

## 8. Required handover package (all V at final bytes)

Include:
- starting tree/commit/hash context and final commit hash/path.
- engine fence proof: `git diff --name-only 408410477 <final> -- src/engine` empty (or equivalent) + 69 TS / draftBoard sha proof.
- verify-package output: `0 FAILED, 0 missing, converse clean, exit 0`.
- full acceptance composite tail with `ACCEPTANCE RUN COMPLETE` and step 13–17b evidence.
- battery/falsifier results by named law; retired-law table by name+reason; any re-homed probe named.
- regenerated SHELL-STATUS lines matching dist assets/hashes.
- dist sha256, single.html sha256, zip sha256 (and zip name or pushed commit hash).
- side-by-side doc + receipt json + PNG pair list.
- selector/merge note for Claude (stable classes/selectors, what changed, what retired).
- explicit NOT RUN / R / U list.
- calibration asks filed (not guessed).

## 9. Copy/paste prompt for Z.ai (short form)

> You are Z.ai continuing the Cakepanz / 76 Pancakes S15 closeout. This is self-contained; do not assume prior drafts were read. Work only in the S15 shell/delivery lane. Do not edit engine bytes, `colors/src`, pins/seam-golden, governance, queue, tools, wrangler/auth/server deploy, or Cloudflare account settings. Claude owns engine/merge/server/deploy; Owner owns direction/acceptance.
> 
> Ground truth: engine pin `408410477`; seam golden `e8fed8ab…` unchanged; S14 finals are gate floors; S15 engineering is real but delivery is not acceptance-clean. Reviews agree on blockers: verify-package fails at delivered bytes (stale handover hash), SHELL-STATUS stale, composite tail 13–17b incomplete, side-by-side incomplete, some V claims overstate F27–F31/F30/F31. 
> 
> Fix in load-bearing order at unchanged final bytes: reproduce red state; correct narrative docs (no fake V); regenerate SHELL-STATUS from bytes; reseal manifest/checksums LAST; rerun verify-package to 0 FAILED/converse clean/exit 0; resume acceptance composite through 13–17b until COMPLETE; re-home F24/F28 or any tautological/red-elsewhere falsifier by name without weakening laws; complete side-by-side per `claude/visual-acceptance-spec-2026-11-21.md` including panel-bearing season screen; regenerate final packaging/hashes. 
> 
> Keep static Cloudflare-ready handover: `base:'/'`, one product entry `index.html`, no dev page, no wrangler/_redirects/_headers/pages.dev, no hardcoded host, no backend calls added, VITE_BRAG_URL build-time/empty-safe, no downloads, no seed in paste. Keep Owner brag "Can you go 20-0?" unless Owner changes. No receipt, no claim. Deliver one zip or pushed commit hash with full V/R/I/U receipts.

## 10. Evidence / review basis (V reads by porca)

- Prior porca prompts reviewed: `inbox/20261120-2040-porca-PROMPT-zai-s14-continuation.md`, `...2115...v2.md`, `...2125...v3.md`, `...0539...`, `...0730...addendum...`, `...1701...` (all on `origin/council/porca`).
- Seat reviews of porca prompts/drafts found: `pickle/20261120-2109-pickle-REVIEW-all-s14-prompt-drafts.md`, `pickle/20261120-2126-pickle-REVIEW-v2-drafts-hy4-porca.md`; later pickle v4-v7 work orders cited/absorbed porca drafts.
- S15 closeout/server review set read: beam 1621, ernie 1632/1649, hy4 1623/1647, iceman 1623, pickle 1625/1633/1651/1701, porca 1701 and prior porca S15 review.
- Not rerun this sitting: S15 batteries/composite/side-by-side, server tests, Miniflare/real D1.