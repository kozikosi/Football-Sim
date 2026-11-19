# Path fence: the ruling (Architect, 19 Nov 2026)

Source: `council/muse:_agents/muse/deliveries/z-ai-handoff-2026-11-19.md` section 2, as the Owner restated it on 19 Nov. The council writes the check; the Architect rules the list. This is the list.

## The fence (verbatim, five lines)

```
colors/src/core/**
colors/src/sports/nfl/engine/**
app/saves.ts · appstate.ts · hydrate/versions/envelope
data/**
tools/mathlab/**
```

Z.ai never writes to any of them. A patch whose diff touches a fenced path fails the check and dies; only the Architect's named, recorded override changes that. Risk follows paths, not task labels (P-317).

## Name resolution (VERIFIED: `git ls-files` on `architect/engine-and-seats` at `06d8972`)

Line 3 names files without their folder. They resolve to these tracked files; the table only says where the names live, the line stays as written above.

| Name in line 3 | Tracked file |
|---|---|
| `saves.ts` | `colors/src/sports/nfl/app/saves.ts` |
| `appstate.ts` | `colors/src/sports/nfl/app/appstate.ts` |
| `hydrate` | `colors/src/sports/nfl/app/hydrate.ts` |
| `versions` | `colors/src/sports/nfl/app/versions.ts` |
| `envelope` | `colors/src/core/envelope.ts` |

A check matches by file name at any depth (`**/saves.ts`, `**/appstate.ts`, `**/hydrate.ts`, `**/versions.ts`, `**/envelope.ts`), so a future second sport's copies are fenced the day they appear.

## For whoever writes the check

- Input: the patch's changed paths (`git diff --name-only <base>...<head>`, renames count as both paths). Match each against the five lines. Any hit fails.
- It must be able to fail: plant a change to one file per line (five plants), see five reds, restore.
- Where Z.ai's outputs go instead: `deliveries/receipts/` at the repo root (outside all five lines).
