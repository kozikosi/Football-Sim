SPEAKER: mimo | ROLE: Council | TASK: Z-post-blue w33 vs Pre-Colors — measurements for the Architect (Owner's question, 30 Oct) | DATE: 2026-10-31T03:55Z

FOR: build-truth / Z-post-blue integration (no P-id: this is the measurement `AGENTS.md` §2 asks for before anything from w33 can be called a build).

## Sources (both re-measured this session)

| | Pre-Colors | Z-post-blue w33 |
|---|---|---|
| ref | worktree `Football-Sim-PreColors.html` | `origin/council/zai:Football-Sim-Z-post-blue-w33.html` |
| sha256 (first 16) | `40233d6be00e987c` | `68d105f0100db3eb` |
| file bytes | 657,486 | **1,440,296** (2.19×) |
| inline script blocks | 1 | **7** |
| extracted script bytes | 621,705 | 1,229,147 (1.98×) |

```
$ git show origin/council/zai:Football-Sim-Z-post-blue-w33.html > /tmp/w33.html; wc -c /tmp/w33.html
1440296 /tmp/w33.html
$ node tools/lint.mjs extract /tmp/w33.html /tmp/w33.js
… 7 inline script block(s) · 9737 lines · original lines 2085..12379
```

## The one thing the Architect must decide before porting anything (VERIFIED)

**`DEFAULT_WEIGHTS` is not the protected constant.** Every other protected name is byte-identical between the two builds — `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `teamRatings`, `slotWinsPerOvr`, `modelWeights` all hash the same on their declaration line — so **the `modelWeights()` = monotone quantisation of `slotWinsPerOvr()` contract is intact in w33**. But the weights table differs:

```
Pre-Colors: {"QB": 320, … "TE2": 20, "OT1": 295, … "DE1": 350, "DE2": 350, "DT1": 320, "DT2": 300, "DL5": 5, "MIKE": 100, …}
w33:        {"QB": 320, … "TE2": 20, "TE3": 5,  "OT1": 295, … "DE1": 350, "DL5": 5, "DE2": 350, "DT1": 320, "DT2": 300, "DL5": 5, "MIKE": 100, …}
```

Two differences: **`"TE3": 5` is new**, and **`"DL5": 5` appears twice** (duplicate key; in a JS object literal the last one wins, and both copies are 5, so the *effective* table is unchanged apart from the added TE3). Every one of the other 34 weights is identical.

- If TE3 is a real new slot, that is a change to a protected constant and needs the Owner's exact approval (`AGENTS.md` §3), plus the `MERGE-MANIFEST.md` re-pin in the same commit.
- TE3 is not a stray: `grep -c "TE3"` → **26 in w33 vs 2 in Pre-Colors**, so a third tight end has been wired through roster/lineup code. The Architect should decide *once* whether TE3 ships, and if it does, de-duplicate `DL5`.
- Recommend: **do not merge `DEFAULT_WEIGHTS` from w33 as-is.** Either restore the Pre-Colors table (dropping TE3) or approve TE3 deliberately and re-pin.

## What else w33 changed (VERIFIED by the same run)

- **+57 new functions, 436 → 492**, all `zpb*` theming helpers: `zpbTeamLogo`, `zpbRgb/Hex/Mix/Hsl/Lum/Contrast/Rgba`, `zpbShade/Tint/Soft`, `zpbApplyTeamTheme`, `zpbClearTeamTheme`, `zpbTeamChips`, `zpbRowVars`, `zpbUserRowVars` … — i.e. the whole team-colour layer. This is the part worth porting as **targeted patches**, not as a file swap (see size below).
- **`generateDraftRecap` is gone**: 3 references in Pre-Colors, **0 in w33** — deleted cleanly, no dangling call, so the build will not throw. But the draft-recap generator itself no longer exists; P-155 (draft recap cinematic) is still open, so confirm this removal is intended before V23 inherits it.
- **`Math.random()` 56 → 62** (six new unseeded sites) and **no seedable RNG in either build** (`grep -c "mulberry|sfc32|createRng"` → 0 in both). The `AGENTS.md` §3 rule stands for both files: runs are not repeatable, so no before/after outcome may be published from either until task `T-20261022-claude-2` lands.
- **Frozen dataset intact**: the PLAYERS literal has the same 1,199 row separators in both (`grep -c '\],\["'`), i.e. no player row was added, dropped or edited.

## Owner style strings (both files, counted in the extracted script)

| string | Pre-Colors | w33 | note |
|---|---|---|---|
| `also fits` | 1 | **0** | w33 removed it — Owner asked |
| draft-board `Value here` label | 1 (l.1319, the Priority cell) | **0** | the one case-insensitive hit in w33 is prose in a guide paragraph (line 9279: "Fullbacks and punters carry real modeled value here"), not the label — correct |
| `2-Pt Conv` | 16 | 16 | unchanged, correct |
| `sudden death` | 0 | 0 | correct |
| `expected scoring` | 1 | 1 | **inherited, not introduced** — it is a glossary definition line (~w33 6842), not a recap. Owner's plain-language rule bans it in recaps; flagging so the Architect decides whether a *definition* of the term may keep it. |

## My critique, in one paragraph

w33 looks like a **faithful, well-scoped theming layer on top of Pre-Colors**: every protected constant except the weights table is untouched, the frozen dataset is byte-comparable in size, the banned draft-board strings are gone, and the new code is cleanly namespaced (`zpb*`). The two real problems are (1) **the protected `DEFAULT_WEIGHTS` table was edited** — TE3 added and `DL5` duplicated, which is exactly the kind of silent change the §3 rule exists to catch, and (2) **weight**: the file is 2.19× the download the Owner actually gets, with a theming layer that could be ported as a few dozen targeted patches. My recommendation to the Architect: port the `zpb*` helpers and the theme hooks as patches anchored in Pre-Colors, **restore `DEFAULT_WEIGHTS`**, keep `generateDraftRecap`'s removal as an explicit decision, and re-measure the byte cost of the theming layer alone before V23 commits to it.

EVIDENCE: VERIFIED (commands and outputs in the two `git show`/`extract`/`node` runs above; function inventory and constant hashes produced by a read-only comparison script over both extracted scripts).
SAFE ALONE?: yes — measurement only; no file outside my inbox was touched.
HOW TO CHECK: `git show origin/council/zai:Football-Sim-Z-post-blue-w33.html | sha256sum` → `68d105f0…`; `grep -c '"DL5"' ` on w33's `DEFAULT_WEIGHTS` line → 2; `grep -c "generateDraftRecap"` → 0.
