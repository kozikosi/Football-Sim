# AGENTS ref §8 — Documents and ownership (loaded on demand)

| Path | Writer |
|---|---|
| `colors/` (product source), `Football-Sim-*.html` (frozen references) | Architect only (§5) |
| `AGENTS.md`, `CLAUDE.md`, `claude/` (boot, NOW, ref), `biome.json`, `tools/` | Architect, or on his/the Owner's instruction |
| `_agents/PRIORITIES.md` | Architect or Owner (table rows and tiers); seats change the *live* queue only through inbox ops (`COUNCIL.md`) |
| `inbox/<UTC>-<seat>-<slug>.md` | That seat, on its own branch: one file per idea or snippet (§5 *Inbox*); the Architect reads them with `node tools/council-sync.mjs --inbox` and the review chain is tracked by `node tools/council.mjs board` |
| `_agents/TEST-ORDERS/` | Architect (test orders); seats post results in their bulletin entry |
| `bulletin/<UTC>-<seat>.md` | That seat, one file per session (§4.7); the Architect merges them into `council/base` and rotates old ones into `_archive/bulletin/` |
| `COUNCIL-BULLETIN.md` | Architect (rules and live rulings only; rotated at 150 KB, `_agents/RETIREMENT.md` §3) |
| `PROJECT-KNOWLEDGE.md` | Architect by default (one writer, rewritten at his handover); the Owner may assign a seat for a session. Seats propose changes in their bulletin entry. |
| `_agents/RETIRED.txt` | Owner or Architect (one name per line) |
| `_agents/README.md`, `RETIREMENT.md`, `TEMPLATE-LANE.md`, `START-OF-CHAT.md`, `END-OF-CHAT.md`, `ONBOARDING.md`, `MIGRATION.md` | Architect |
| `CHRONICLE.md` | Architect, append-only; seats put verified facts on `FACT:` lines in their bulletin entry |
| `tasks/<id>.json` | The seat that holds the item writes its own file; `accepted` is set by the Architect, `verified` by the Verifier (in `verification`), `owner-accepted` by the Architect quoting the Owner. Never edit another seat's file; add a new item instead. |
| `SUBMISSIONS.md`, `_archive/v22-suggestions.md` | **Frozen history** (24 Oct): no new entries. Proposals, snippets and reviews go in `inbox/`; the Architect's build lifecycle lives in `tasks/`; the ranked queue is `PRIORITIES.md`. One home per kind of thing, no parallel registries. |
| `_agents/<seat>/` | That seat only (a retired seat's lane is a tombstone: nobody writes there) |
| `STATUS.md`, `MERGE-MANIFEST.md` | Architect (build hash lines by a Verifier) |
| `_reference/`, `_archive/` | Frozen |

Priority labels in the work order: **P0** first · **P1** Architect decision · **P2** Owner decision · **R1/R2/R3** round of origin · **C** council record only. Do not invent another scheme.

