# 00-READ-FIRST — Architect's operating guide for "20-0"
Updated: 2026-11-01 (HST) after the council-process proposals. Phase: **Colors v1 engine done, UI not started**. Read THIS file first, every chat; read nothing else until the task needs it. (Repo mirror: `claude/00-READ-FIRST.md` on `architect/engine-and-seats`; the Project copy is the one a cold chat sees.)

## DEFAULT BEHAVIOUR — applies even if the Owner's message is only "Continue", a council relay or a pasted file
The Owner often forgets to paste a start prompt. **No prompt is needed.** Whatever the first message says, do §0 first, then act on the message. A message that is a relay (from Beam, Z.ai, Muse, GPT...) names files on some branch: fetch that branch and read the named files yourself; never ask the Owner to attach them. Reply in outcome / file / one next step, not a recap.

## 0. BOOTSTRAP — do this BEFORE anything else (measured 1 Nov: 6 tool calls, no questions asked)
**The repo is NOT in a new chat's workspace. You do have git access. Never say "the repo isn't in this workspace" or ask the Owner to attach files.**
1. `mcp__claude-code-remote__add_repo` with owner `kozikosi`, repo `football-sim`, **access `"push"`**. No pre-check with curl or `gh`. If the result says NOT RUN, call it again (31 Oct and 1 Nov: the second call worked). The result may say the repo moved to `github.com/kozikosi/Football-Sim`; the old URL still works.
2. Clone, ONE command, generous timeout (up to 10 min), nothing else running at the same time: `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 clone --depth 1 --branch architect/engine-and-seats --single-branch https://github.com/kozikosi/football-sim /home/claude/football-sim`. If the folder exists check `git -C /home/claude/football-sim rev-parse HEAD` before touching it; never `rm -rf` blindly. A 429 means the 2-concurrent-operation cap: wait 5 s, retry once.
3. `register_repo_root` does not exist as a tool (1 Nov): read `CLAUDE.md` and `AGENTS.md` from the clone directly (they arrive as system reminders after the first command in the clone anyway).
4. Council branches (fetch only what the message or a package needs): `git fetch --depth=1 origin '+refs/heads/council/<seat>:refs/remotes/origin/council/<seat>'`. Read files with `git show origin/council/<seat>:<path>`. Never check out a council branch in this clone.
5. Work on **`architect/engine-and-seats`**, the only branch I push (`git push origin HEAD:architect/engine-and-seats`, add by path, never force, never stash). The sandbox CAN download from github.com release URLs with `curl -sSL`.
6. If the Owner's message holds an approval, decision or data, write it into the repo the same turn (verbatim note in `_agents/owner-notes/`, row in `_agents/owner-notes/OVERRIDES.md` once that file exists), commit, push, give the hash.
7. If add_repo is denied, say so in one line with the exact error.
8. **Projects tool:** it is deferred. `ToolSearch select:Projects` loads it. Only then can I write this doc.

## 1. Who and what
- Owner: Kosi (final say: product, protected constants, irreversible actions). Claude = Architect: decides ordinary technical things; asks only for irreversible / protected constant / real product call. **Only Claude builds `Football-Sim-*.html`**. Exceptions are rows in the override log (today: Muse may build "amused" on `council/muse` only).
- **NEVER ASSIGN WORK TO INDIVIDUAL AGENTS.** One ranked list `_agents/PRIORITIES.md`; council works via `inbox/`; WORK -> 3 reviews -> REVIEWED ✓✓✓ -> Architect builds. The council never sees this Project; it reads the repo. Council replies relayed by the Owner vary in quality (Gemini often unsourced, Grok small CSV errors): verify before use, label VERIFIED/REPORTED/INFERRED/UNKNOWN.
- Product name shown to users: **20-0**. Build: **Colors v1** (`Football-Sim-Colors-v1.html`, not built yet).
- Figma is available (create_session first) for UI design. Tools are deferred: `ToolSearch select:<name>`.

## 2. State of the work (VERIFIED 1 Nov)
- **Pushed: `architect/engine-and-seats` = `92f15b5`** (process proposals + game-model page), on `02daf99` (store, selectors, roster view-model; **204 tests pass**: `cd colors && npm test`, about 35 s). `council/base` is OLDER than this branch (no season/game model); Beam's job to fast-forward when I say so.
- **Engine done (steps 1-9 plus store/view-models):** RNG, kicking, pool, slots/flex/lineup, ratings/matchup/plans, drive generator, returner, schedule/standings/season/playoffs, CPU draft, margin model, box score, recap, awards; `colors/src/app/{store,selectors}.ts`, `colors/src/view/{draftBoard,roster}.ts`. A season = `buildPool -> newDraft/runDraft -> lineupFor -> teamRatings -> simulateSeason`; page: `_agents/GAME-MODEL-INTERFACE.md`. **NEXT: UI** (Figma design, Svelte 5) + `build/build.mjs`; then recalibrate with `colors/tools/calibrate-draft.ts`.
- **Step 9 gaps:** late-game script; per-week mixed plans and the user's plan choices; OL stat lines/honours; advanced-stat cards; "why decided" text from `matchup.ts` swings; head-to-head history; game previews; DL5 short-yardage snaps; FG by distance.
- **Council process proposals P1-P6** are in `inbox/20261101-1400-architect-process-rewrite-proposals.md` (onboarding stamp, PUSHING.md, TRANSITION-DOCS.md, OVERRIDES.md, STATUS heartbeat, mission template). Wait for reviews, then apply them on council/base's files. E5/E9b/E9c are not engine modules (E1-E10 are test IDs in ENGINE-MATH-SPEC.md; E9b/E9c exist nowhere).
- **Z.ai w53 chain** (now readable on `council/beam` at `_agents/zai/`, commit `ad7eb20`): `deliveries/CLAUDE-START-HERE.md` (router REV 2), `deliveries/CLAUDE-UPDATE-since-w41.md` (Owner directives rounds 42-52; rounds 45-48 reconstructed), `deliveries/CLAUDE-HANDOFF-REVIEW-2026-11-01.md`, `ZAI.md`, `notes/2026-11-01-zpbPackFor-contrast-backgrounds.md` + probe. Current shell = `Football-Sim-Z-post-blue-w52.html` on `council/zai`, **md5 `40613b81de26b5ed9c67bdcc0637ac6f`, 1,585,036 B: VERIFIED match 1 Nov**. Read fully: START-HERE, zpbPackFor note. Skimmed: UPDATE (rounds 42-44 read, 45-52 not), review (headings only). Not read: lane file, probe.
- **zpbPackFor decision (Owner-ordered, not mine):** Z.ai measured that the pack's contrast floors use retired page colours; 8 of 9 floors fail against the shipped page, all 32 teams' packs change. My recommendation: yes, follow the page, in its own wave, with a 32x2 re-sweep. Ask the Owner when the UI phase starts.
- **Owner decisions 29 Oct-1 Nov** (`_agents/owner-notes/`): QB flexes only to FS at -10; 3-4 OLB2 = DT2 (provisional); standing re-weight approval; DL5 rotation; never flex a user's lineup without clear gain; Gone% never 100 (99); integers except QBR, wins, priority; UI prints through `display.ts`; regular-season OT ties after 10 min; SPD/STR credit only; Returner = SPD x 0.8 + OVR x 0.1 + STR x 0.1; 1 Nov: standing permission for seats to push own branch, Architect has full permission over architecture/files, Muse may build "amused".
- **Calibration** (before step 9a, stale; re-run before quoting): greedy user 11.1 wins / 86% playoffs / 19% title; top30 8.7 / 43% / 1%; CPU avg 8.4-8.6 wins. Real data (nflverse 2020-24, `_agents/data/`): OT 5.88%, home win 53.2%, 22.84 pts per team.

## 3. Next steps (in order)
1. Bootstrap (§0). `cd colors && npm test` (expect 204 pass).
2. Apply council-reviewed P1-P6 (only after reviews exist in the council inboxes: `git fetch` council branches, read `inbox/`).
3. `node --experimental-strip-types colors/tools/calibrate-draft.ts 100` to refresh playoff/title rates.
4. UI design in Figma (draft room, board with Gone%/priority, game days as a drive ticker from `buildRecap`, champion's night, 390 px), then Svelte 5 and `build/build.mjs`. The Owner's V22 addendum in `claude/V22-work-order.md` (previews/reviews graphical, motion, team colours, opponent colours) is the brief; recaps stay box-score style.
5. `_agents/TEST-ORDERS/colors-v1-<n>.md` once a build exists.

## 4. Facts to remember
- Pins: `BASELINES.md`. Two unrelated histories (council/base root 474eb52, main root 268fd56). Product HTML never read whole.
- Branch push works; tags 403; never push main or council/base, never force-push, never stash; add by path. Biome not installable.
- TypeScript under `--experimental-strip-types`: no enums or parameter properties; `import type`.
- Mutation-check every new test file; a test that passes first time is suspect.
- `project_write` with `local_path` needs an absolute path.
- **Project docs cost context.** Every doc in the Project is injected into every chat. The Project still holds seven superseded Oct-19 files (`master_plan.md` x3, `master_task_list.md` x3, `claude/rulings_r1_predispatch.md`); they cost roughly half a chat's context and carry nothing the repo lacks. Owner: please delete them (or say so and I will archive them to `_archive/project-docs/` first). `claude/V22-work-order.md` is still the UI brief: keep.

## 5. Standing rules
No recaps; answers = outcome, file, one next step. One chat = one work package; when long show RED banner **"STOP — START A NEW CHAT IN THIS PROJECT NOW. This chat is too long to be efficient."** **Before telling the Owner to start a new chat: rewrite this file (Project copy AND repo mirror) and push the repo.** Labels VERIFIED/REPORTED/INFERRED/UNKNOWN; states proposed -> accepted -> implemented -> verified -> owner-accepted; delivery gate = pushed hash. Trailers: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and `Claude-Session: <the session URL the harness gives for the current chat>`.
