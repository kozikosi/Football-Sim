# CORRECTION — the "corrupted [hidden] selector" finding is struck (25 Oct 2026)

**Cites (originals):** `_agents/zai/notes/BASELINE-VERIFICATION.md` §new-findings bullet 1 (24 Oct) · `_agents/zai/notes/PROMPT-FOR-CLAUDE-v2.md` §2 bullet 1 and task **T-51** (25 Oct) · Q-ZAI-2 in `QUESTIONS-FOR-THE-ARCHITECT.md` (25 Oct) · my availability-strip line of 25 Oct ("corrupted [hidden] selector" context in the lane note `ONBOARDING-NOTE.md`).

## What I claimed
That PreColors line 3 ends with a corrupted attribute selector — `…}idden]:not(idden=until-found i]){display:none!important}` — i.e. an intended `[hidden]:not([hidden=until-found i])` rule that "lost its brackets", invalid and inert. Filed as a new finding nobody else had reported, promoted into the v2 dispatch (T-51 "Fix the corrupted selector") and into Q-ZAI-2.

## What is true (commands, this session, 25 Oct)
The rule is **correct in every build checked**. Occurrence-precise greps (the sheet is one physical line, so `grep -c` would have counted lines, not matches — `grep -o … | wc -l` is the honest unit):

| Build | sha256 (16) | correct `not([hidden=until-found` | corrupted `not(idden=until-found` |
|---|---|---|---|
| `NFL Draft Simulator v20 Claude.html` | `31b7d61f42a53f3b` | 1 | 0 |
| `NFL Draft Simulator.html` (donor) | `77bb9ed59ffa2294` | 1 | 0 |
| `Football-Sim-V21.html` | `044d1759e01ac99b` | 1 | 0 |
| `_agents/pickle/builds/Football-Sim-PreColors.html` | `40233d6be00e987c` | 1 | 0 |

Byte-level context (brackets encoded so no renderer can eat them — `[` → `‹LB›`, `]` → `‹RB›`):

```
$ grep -o '.\{12\}hidden\]:not(.\{28\}' _agents/pickle/builds/Football-Sim-PreColors.html \
    | sed 's/\[/‹LB›/g; s/\]/‹RB›/g'
width:100%}‹LB›hidden‹RB›:not(‹LB›hidden=until-found i‹RB›){disp
```

The only `idden` token on the build not preceded by `h` or `[` is the English word "overridden" (1 occurrence, prose, not CSS).

## Root cause of the false claim
In the 24 Oct session, the selector text `[hidden]:not([hidden=until-found i])` was displayed by the tool output with its square brackets stripped (the sequence matches a markdown link-reference definition, which the display layer consumed). The mangled display was recorded as file content. No grep with bracket-precise patterns was run before filing. That is exactly the failure mode G2/G3/G16 exist for, and I hit it anyway.

## Disposition
- **Struck:** the corruption claim everywhere it appears (list above). Per R5 and append-only culture I have NOT rewritten the original artefacts; this note and the appended strike lines are the correction of record.
- **Task T-51 is moot** — nothing to fix. `TASK-LEDGER-SEED.md` carries it as `DROPPED (struck)` with this receipt.
- **Dispatch advisory:** `PROMPT-FOR-CLAUDE-v2.md` should not be relayed to the Architect until its Section 2 bullet 1 and T-51/T-55 wording are corrected by a v3 (Owner's call; I can produce v3 on request).
- **Upstream effect:** Q-ZAI-2 in `QUESTIONS-FOR-THE-ARCHITECT.md` carries an appended strike. The secondary question embedded in it (is a canonical PreColors ancestor re-pinned?) remains valid but no longer urgent — the artefact is clean.

## What still stands from the same re-check
- `NFL Draft Simulator merged.html` (root) is **byte-identical** to `_agents/pickle/builds/Football-Sim-PreColors.html` (both sha256 `40233d6be00e987c…`, 657,486 B): one artefact under two names — genuine F3 drift, filed as drift-audit finding A8 and recommendation R-ZAI-3.

— Z.ai, seat S-2600–2699
