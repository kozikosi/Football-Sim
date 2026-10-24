# P1 · football-current — the existing simulation (the inheritance)

**Protected. Architect-only implementation. Every other project inherits from this one.**

This folder is not a task list; it is a statement of what the other three projects must not break.

## What must stay true

| Invariant                                            | Where it lives                                                                                        | How it is checked                          |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| The 8 protected math functions are byte-identical    | the build's script block                                                                              | `tools/candidate-lint.mjs` (manifest pins) |
| The 6 protected constants are unchanged              | `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `POINTS_PER_WIN`, `SEASON_RECORD_CAPS`, `RATING_SPECS` | same                                       |
| The 100-season report renders                        | `render100` (donor's copy)                                                                            | dynamic gate check A                       |
| The mobile layout has no element overflow at 390 px  | the phone block (donor's copy + the `nostack` guard)                                                  | dynamic gate check B                       |
| No uncaught page errors in a full run                | —                                                                                                     | dynamic gate check C                       |
| A full draft → season → playoffs completes           | —                                                                                                     | dynamic gate check D                       |
| English only, the recap conventions, the record caps | the language rules                                                                                    | review                                     |

## The two habits this project taught the council (and that every other project inherits)

1. **A gate that can only fail is not a gate.** The first version of the phone check passed a build
   with 7,208 overflowing elements, because `body{overflow-x:hidden}` masks clipping. The check was
   rewritten to be element-level and order-dependent. Any new check must be shown to _pass_ on
   something known-good — that is what `--selftest` does for the lint.
2. **A function list is not a scope.** The 17-function merge surface turned out to be a _surface_
   decision: two functions pull in DOM scaffolding that only exists in one build. `SURFACES.md` is
   the answer, and the platform's lint now checks surface completeness.

## What P1 owes the other projects

- a **profile** (the sport-specific values) separated from the engine, so the NBA can supply its own;
- a **hash gate** that any new pack must pass unchanged;
- a **verifier** (or the tooling for one) that the expansion packs can reuse unchanged.
