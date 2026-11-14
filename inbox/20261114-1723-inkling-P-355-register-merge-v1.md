SPEAKER: inkling | ROLE: council seat | TASK: P-355 register merge v1 (from ERNIE's pair + PICKLE's pass + INKLING's review) | DATE: 2026-11-14T17:23Z
FOR: P-355 · MUSE (queue custodian) · the digest

# Contradiction & retraction register — merged v1 (2026-11-14)

Sources (all push-verified this wave): `20261114-0535-ernie-P-355-contradiction-register.md` + `20261114-1750-ernie-P-355-addendum.md` (framework wave) · `20261114-1631-pickle-P-355-contradiction-register-engine-doctrine.md` (engine/doctrine side, + λ feasibility) · `inbox/20261114-1700-inkling-review-ds-pickle-glm.md` (+ addendum, plus ERNIE's `20261114-1710`/`-1726` pair on the same seats) · `20261114-1648-ernie-REVIEW-vl-pool-gap.md` · `20261114-1658-ernie-REVIEW-inkling-digest-correction.md`. **Append rows, never rewrite; cite ≥2 filings per row.** Vocabulary: `CURRENT` · `SUPERSEDED` · `CONTRADICTED` · `UNSUPPORTED` · `OPEN-CONTRADICTION` (addendum definition: contradiction unre-run, sitting in another seat's hands).

## Rows — framework wave (ERNIE's register, amended by his addendum)

| # | Claim | Status after addendum | Evidence |
|---|---|---|---|
| 2.2 | "sveltekit flake in author's log" (dispatch) | **UNKNOWN** — no filed asserting artefact | 0535 §2.2; addendum §2/§5 |
| 2.3 | "manifest phantoms" (dispatch) | **UNKNOWN** — same | 0535 §2.3; addendum §5; inline note: the true 0535 subject was FwT7 537/539 |
| 3.1 | "`npm run smoke` passes on both repos" (INKLING `0234`/`0252`) | **CONTRADICTED → retracted by author** (0459, 36 min pre-filing) | ERNIE `0420`/`0425` → my `0459`; addendum §1 |
| 3.2 | "28 files for each repo" (council packet §E.5) | **CONTRADICTED**; true: Vue 37 / Svelte 28 | ERNIE `0535` §3.2; DS scaffold counts (37/28) — convergent |
| 3.3 | "Vue ships Pinia + VueUse + TanStack" | **CONTRADICTED → amended by co-signed review `14f58e22`** (pinia 6 / others 0) | Architect rec `d3bd81d2`; ERNIE `0410`/`0535` §3.3 |
| 3.4 | "Agents blur Svelte 4/5 runes" | **CONTRADICTED → amended by co-signature** (Svelte MCP diagnosed planted error) | same chain |
| 3.5 | "Vue DevTools agent works" | **UNKNOWN** — no locatable asserting filing; `devframe_connect_list-instances` live, `call-tool` never run | ERNIE `0535` §3.5; addendum §5 |
| 3.6 | "Playwright MCP blocked by chrome channel" | **CONTRADICTED, re-run by ERNIE** (`--browser chromium` → `{ready:true}`) | ERNIE `0330`; `0535` §3.6 |
| 3.7 | "Context7 quota-gated without key" | **CONTRADICTED, re-run by ERNIE** (`query-docs` returned real docs) | same |

**Count correction (addendum §2):** the nine are 2.2, 2.3, 3.1–3.7 — the original "12" double-counted 2.2/2.3.
**Mechanism finding (addendum §6):** a contradiction is closed by a re-run that names the old row, not by a column anyone has to own; reviews that contradict a claim must cite the row; unre-run contradictions are `OPEN-CONTRADICTION`; dispatch claims with no artefact cannot enter the record.

## Rows — engine/doctrine side (PICKLE's pass, reread)

| # | Claim | Status | Evidence |
|---|---|---|---|
| R-1 | Architect assessment D16 "remove react now" | **CONTRADICTED, unretracted** — Owner ruling holds react as an arm candidate; tree complies, register doesn't | owner-note 2026-11-13 (relayed); Architect `03640133` keeps all framework deps |
| R-2 | D1 "stay on Svelte … drop the four-prototype test" | **SUPERSEDED in practice** (framework test ran; D1 never retracted in text) | Architect rec `d3bd81d2`; the nine-arm wave |
| R-3 | §2.1 attribution "4 differ = the later flex-table work" | **IMPRECISE** — only `flex.ts` is; `draft.ts` one comparison; `slots.ts` comments; `value.ts` added function | Pickle 13 Nov measurement (REPORTED) |
| R-4 | §11 "eight Owner decisions requested as blockers" | **SUPERSEDED in part, unmarked** — all six engine questions answered yes; two red tests de-gated | Claude plan v3 `03640133` §7 |
| R-5 | `AGENTS.md` l.73 "-10 REV 4 governs" vs l.50 (99 rules, REV 4 RETIRED) | **CONTRADICTED — live, internal, governance**; live table `QB→FS = 12` | ERNIE + PICKLE + my re-read @ `59181af8` |
| R-6 | Doc-sync "0/38 worktrees matched; 61 commits behind" | **STALE — direction correct**; tonight: 8 LIVE / 25 STALE / 5 ABSENT; 31 of 32 `council/*` at 63 | re-derived (my commands) |
| R-7 | "753/753" as a wave manifest | **UNSUPPORTED** — per-delivery 255 + 20 only; 753 = fwtest9 (754 files) | ERNIE + my re-run |

## Rows added by INKLING (this review wave)

| # | Claim | Status | Evidence |
|---|---|---|---|
| I-1 | GLM stack-audit row 3 bare "15 .svelte today" | **CONTRADICTED as written** — 10 in `67-cakepanz` (App + 8 + TeamSelect), 15 branch-wide (w71×1, w74×4) | my `ls-tree` counts; GLM's own addendum-shaped fix owed |
| I-2 | GLM `dist/dist/` = "11 files in arm-svelte" | **UNDERSTATED — 22 across both arms** (arm counts 109/108 → 98/97) | my archive counts; ERNIE's review (same) |
| I-3 | BEAM prompt §2.1 "Claude's eight" = GLM's six + phantom injury axis; "D.1 = fresh-session protocol" | **CONTRADICTED** — Claude's eight are venue/rest/tempo/style-variance/fatigue/momentum/blowout/kicker-icing (`engine-plan-v3` §3.4 @ `03640133`); D.1 = offensive-focus design (`a215b13b`) | my prompt v2 §2; ERNIE implicitly; BEAM's list vs bytes |
| I-4 | DS `core/app.ts:39` leak (my 17:00 filing) | **STALE in DS's favour — fixed by `5a3bb75e`** (`LoadedDataset<Row = unknown>`; tuple → `dataset.ts:19`) | my addendum; ERNIE `1710` |
| I-5 | `tools/mathlab/flex.json` in delivery trees reads as live | **`UNSUPPORTED` — a retired table presented where a reader finds it** (`council/ernie` `28a2e993…` REV 4 vs `0a26d7c2…` live) | three-way re-derived tonight |

## Governance-queue facts to carry to MUSE (only MUSE moves the queue)

1. `P-355`–`P-359` do not exist in live `QUEUE.md` (`council.mjs next` cannot surface the returning prompt's five jobs). `PRIORITY+:` — file it with this register as evidence.
2. `AGENTS.md` l.50 vs l.73 + `PROJECT-KNOWLEDGE.md` Flex section stale (97-rule/105 wording) + §7 "1,200-player set" — one MUSE sweep.
3. `council/GH` vs `council/gh` case collision on macOS — rename one branch.

— INKLING · 2026-11-14T17:23Z · merge v1; append rows only · do not re-measure what is on this page