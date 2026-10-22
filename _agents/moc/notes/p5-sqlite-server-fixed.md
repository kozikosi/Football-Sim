# P5 · The SQLite server is fixed and it now carries the build's own data

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: the Owner's instruction — "try to get sqlite to work" | DATE: 2026-10-22T15:10:00Z**

## 1 · What was broken (three faults, none of them sqlite)

The `sqlite` MCP server is configured in **`~/opencode.json`** (the home-directory config OpenCode reads for this project). It was failing with:

```
✗ sqlite  failed: NotFound: ChildProcess.spawn (docker run --rm -i -v /Users/kosi/my-database.db:/mcp/db.sqlite mcp/sqlite --db-path /mcp/db.sqlite)
```

| # | the fault | evidence | the fix |
|---|---|---|---|
| 1 | **`docker` was not on the PATH of the process that spawns the server** | `docker` is installed at `/Users/kosi/.docker/bin/docker` and the daemon runs (29.9.1), but a GUI-launched app has a minimal PATH, so `ChildProcess.spawn` found no binary | **use the absolute path** in the command: `/Users/kosi/.docker/bin/docker` |
| 2 | **the mount target was an empty *directory*, not a database** | `file ~/my-database.db` → `directory`, 0 entries | the empty directory was removed (`rmdir`, nothing in it) and a real SQLite file was created |
| 3 | **nothing was worth querying** | the path was the tutorial's `my-database.db` | the database now holds **the build's own data** (§2) |

**And the OpenCode database was never the problem.** `PRAGMA integrity_check` on `~/.local/share/opencode/opencode.db` returns **ok**; `quick_check` ok; WAL mode; migrations current to `20261010180456`. The earlier *"Database is not empty and has no session table"* was a **schema-version mismatch** with the stale 1.19.3 binary — fixed by pointing `~/.opencode/bin/opencode` at the bundled **v2.0.32** (old kept as `opencode-1.19.3.bak`).

## 2 · What the database now is

**`~/football-sim.db`**, built by `_agents/moc/tools/build-sim-db.mjs` (re-runnable: `node _agents/moc/tools/build-sim-db.mjs "<build.html>" "<out.db>"`) straight from the build's own literals — **the pool and the depth charts are the single source of truth, copied, not re-typed.**

| table | rows | columns |
|---|---|---|
| `players` | **1,200** | `name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf` (the build's own array order) |
| `team_slots` | **1,088** across **32 teams** | `team, slot, name, ovr` — the depth charts |
| `meta` | 9 rows | the build file, its **sha256** and byte count, the row counts, the build date, the column order |

Indexed on `players(team)`, `players(pos)`, `players(ovr)` and `team_slots(team)`.

**Verified live, through the MCP server itself** (not through the sqlite3 CLI):

```
tables: players, team_slots, meta
90+ OVR by team: Rams 7 (avg 95.0) · Ravens 6 (92.3) · Lions 6 (94.5) · Chiefs 6 (92.5) · Eagles 6 (92.5) · 49ers 6 (95.3)
Chiefs QB: Patrick Mahomes · QB · OVR 93 · slot QB · slot OVR 93
```

`opencode mcp list` now reads **`✓ figma connected · ✓ github connected · ✓ sqlite connected`**.

## 3 · Why the council should care

**The pool is now queryable instead of greppable.** Every seat has been reading a 650 KB HTML file with `grep` to answer questions like "how many 90+ safeties are there", "what is the Lions' depth chart", "which teams are stacked at 95+". Those questions are now one SQL statement, and **the answers come from the build's own literals** — so they cannot drift from the product the way a pasted table can.

**The same server can carry the council's other data** — the palette registry, the measurement tables, the bulletin's claims — each as its own table, all rebuilt from source by a script.

**What I did not do:** I did not change the build; the database is a **read-only copy** of its data (the container mounts it read-write, so a seat *could* write — say so before writing). I did not add tables beyond the three; the `create_table` and `append_insight` tools exist, and **`append_insight` writes to a memo** — that is a write into the account's data and should be the Owner's call, not a seat's default.
