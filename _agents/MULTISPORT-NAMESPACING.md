SPEAKER: architect | ROLE: Architect | TASK: multisport namespacing (P-070 groundwork) | DATE: 2026-11-04

# Multisport namespacing: decisions (built 4 Nov 2026, colors/ 272 tests pass)

Rule behind all of it: **name things so a second sport can sit beside the first without renaming or migrating anything of the first.** No abstraction was built. Basketball's engine, ratings and scoring shapes are NOT guessed anywhere; `core/` holds only things that are true for any sport (ids, keys, the save container, a hash, the RNG, an assignment solver).

## The four items KG asked for
| # | Decision | Where |
|---|---|---|
| 1 | **Profile**: `{ v:2, createdAt, sports:{ nfl:{lastTeam,lastPlayedAt,achievements} } }`. `createdAt` is shared; each sport owns its block. A write to one sport never drops another (including a sport this build does not know). Z.ai's flat profile migrates once. | `core/profile.ts`, `sports/nfl/app/profile.ts` |
| 2 | **Storage keys**: `sim:<name>` shared (theme, settings, profile), `sim:<sport>:<name>` per sport (`sim:nfl:tab`, `sim:nfl:slot:A`, `sim:nfl:slot:A:bak`, `sim:nfl:stats`, `sim:nfl:player-names`). Nothing else is written. Old `zpb:*` keys move once, copy-verify-remove. | `core/keys.ts`, `sports/nfl/app/legacy.ts` |
| 3 | **Player ids carry the sport**: `nfl-p00001`. Each sport counts from 1 and owns `data/<sport>/player-ids.csv`; ids are never reused. Chosen over one global counter because an id is then meaningful on its own (a saved pick, a stat row, a profile name can never be read as another sport's player) and adding a sport never touches another sport's file. | `core/ids.ts`, `data/nfl/player-ids.csv` |
| 4 | **Directories**: `colors/src/core/` (rng, hungarian, ids, keys, hash, envelope, profile) and `colors/src/sports/nfl/{engine,view,app}/`; tests in `test/core/` and `test/nfl/`; data in `data/nfl/`. | a test enforces it (below) |

## What else was fixed because it would have bitten later
1. **The save envelope now has `sport`** and each sport has its own list of save kinds (`SAVE_KINDS`). A save with no `sport` (none ever shipped) reads as `nfl`; every write includes it. The NFL reader refuses another sport's save. The NFL payload shapes moved out of the envelope file into `sports/nfl/app/saves.ts`; `core/envelope.ts` still imports nothing, so storage can still copy it.
2. **Save slots are per sport.** Slot A of the NFL and slot A of a later sport are different keys.
3. **Version stamps name the sport**: engine label `nfl1` (was `colors1`, a build name); the data stamp covers the sport's own files. Pins re-made (engine rules hash unchanged, data hash changed only because ids gained the prefix).
4. **Latent bug found in the shell: `zpbPlayerProfiles` is keyed by player NAME.** The Madden file has repeated names (two Justin Jeffersons), so naming one names both. New store `sim:nfl:player-names` is keyed by player id. The migration moves a name only when exactly one player has it; names shared by two players, or matching nobody, are left in the old key and reported, never guessed.
5. **Layout is enforced by a test, not by memory**: `core/` imports only `core/`; a sport imports only `core/` and itself, never another sport; `envelope.ts` and `keys.ts` import nothing; `core/` has no DOM, storage, clock or `Math.random`. Both violations were planted and caught.

## For the adapter (w53-js) and Z.ai's storage module
- Key map (old -> new): `zpb:theme`->`sim:theme`; `zpb:st:settings`->`sim:settings`; `zpb:st:profile`->`sim:profile` (reshaped); `zpb:tab`->`sim:nfl:tab`; `zpb:base34`->`sim:nfl:base34`; `zpb:st:stats`, `zpb:st:stats:applied`->`sim:nfl:stats`, `sim:nfl:stats:applied`; `zpb:st:slot:X[:bak|:del]`->`sim:nfl:slot:X[...]` (`:tmp` is dropped); `zpbPlayerProfiles`->`sim:nfl:player-names` (by id).
- Call `migrateLegacy(kv, nameToPids)` once at start-up (kv needs `keys()`); it returns a report of what moved, what stayed and why.
- Storage's own prefix constant `P = 'zpb:st:'` becomes `sim:nfl:` (slot keys: `sim:nfl:slot:A`). The DOM event name `zpb:storage-external` and the `zpb-*` CSS classes are not storage keys and can stay.
- The draft pool row is `[pid, name, pos, team, ovr, spd, str, freeAgent]`; `pid` is now `nfl-p00001`.
- Envelope gains `sport` (first field). `serialize` in `sports/nfl/app/saves.ts` stamps `nfl`; the generic one is `core/envelope.ts serialize(sport, kind, ...)`.

## Not done, and why
- **No `Sport` interface, no sport-pack loader.** KG and I agree it would be a false abstraction until a second sport exists. When one does, extract what both really share.
- **View-model field names such as `nflTeam`** stay: they live under `sports/nfl/view/`, and a second sport has its own view-models.
- **Product name / deploy URL (`kozikosi.github.io/Football-Sim/`, "Football Sim", the brag link)**: a product call, so NOT changed. It gets baked into shared links, so it is cheaper to decide before links circulate. Recommended default: keep the URL as is and route sports inside the app (`#/nfl/...`); tell me if you want a neutral name instead.
- Older documents (`_agents/*.md`, inbox notes) still mention `colors/src/engine/...` and `data/madden27-...`: they are history. Current paths are in this file.
