# 20-0 — Next.js version

The NFL draft and season simulator, as a Next.js app with a small backend that saves games to a database and keeps them in sync between tabs and devices.

## Run it

Needs Node 22.13 or later (uses the built-in `node:sqlite`; developed on Node 24).

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # lint + type check + tests
npm run build && npm start
```

The database is one SQLite file, `data/fsim.db`, created on first use. Set `DATABASE_PATH` to put it elsewhere.

## How it fits together

```
src/app/page.tsx                 the page
src/app/api/saves/…              REST API (Route Handlers)
src/components/GameWithSaves.tsx  the game plus the save panel
src/components/Game.tsx          mounts the engine
src/components/useCloudSave.ts   autosave, load, conflict handling
src/components/SaveBar.tsx       the save/load panel in the corner
src/engine/index.ts              typed entry point: mountEngine(), Engine, EngineSnapshot
src/engine/engine.js             the game engine: draft AI, season sim, recaps, screens
src/engine/data/*.json           players, teams, team logos
src/engine/markup.ts, engine.css the engine's page markup and styles
src/lib/db.ts                    SQLite access (server only)
src/lib/schemas.ts               Zod validation for every request body
src/lib/snapshot.ts              JSON encoding that keeps Set/Map values
```

The engine is a regular module, loaded on demand (`import("./engine.js")`) so the first page load stays light. It was ported from the original single-file game: its code originally ran as global `<script>` tags; it now lives inside one function, `startEngine()`, which returns the `Engine` object the app uses to save and restore. The data that used to be inline (1,200 players, 32 teams, logos) is in JSON files. The engine itself is still plain JavaScript, not TypeScript; `index.ts` gives it a typed interface.

## API

| Method | Path | Body | Result |
|---|---|---|---|
| GET | `/api/saves` | – | `{ saves: SaveMeta[] }`, newest first |
| POST | `/api/saves` | `{ name, data, summary? }` | `201 { save }` |
| GET | `/api/saves/:id` | – | `{ save }` including `data`, or 404 |
| PUT | `/api/saves/:id` | `{ data, summary?, name?, baseVersion }` | `{ save }`, 404, or `409 { current }` |
| DELETE | `/api/saves/:id` | – | 204 or 404 |

`data` is the whole game state as JSON text (about 0.3–1 MB). Requests are checked with Zod; bad input gets a 400 with the field errors.

## Sync

- **Save** creates a save and puts its ID in the URL (`?save=<id>`). Open that URL on another device to continue.
- While attached to a save, the app checks every 2 seconds whether the game moved on, and autosaves if it did.
- Every save has a version number. A write only succeeds if it is based on the latest version. Otherwise the server answers 409 and the panel asks: **Load theirs** or **Keep mine**. No silent overwrites.
- When you come back to a tab, it loads a newer version saved elsewhere if you have no unsaved changes.

## Limits

- No user accounts: anyone who can reach the server sees every save. Fine for running locally; add auth before putting it on the internet.
- SQLite needs a disk that persists. Serverless hosts (such as Vercel) don't have one; use a small VM or swap `db.ts` to Postgres.
- The engine's screens are built as HTML strings, not React components.
