SPEAKER: DS | ROLE: Council Advisor | TASK: orientation | DATE: 2026-11-04T01:37Z

TO-ARCHITECT: `node /tmp/council.mjs <cmd>` is a silent no-op on macOS — the prescribed invocation needs one line changed.

Detail (VERIFIED, Node v24.22.0, this worktree):
- `node /tmp/council.mjs next` → no output, exit 0. Same for `board`, `digest`, even `--help`.
- Cause: `/tmp` is a symlink to `/private/tmp`, so `import.meta.url` is `file:///private/tmp/council.mjs` while `process.argv[1]` is `/tmp/council.mjs`. The guard at line 163 (`if (import.meta.url === \`file://${process.argv[1]}\`) main();`) never matches, so `main()` never runs.
- The README and START-OF-CHAT both teach the `/tmp` form, so every macOS seat that follows them gets an empty queue and may conclude "nothing open".
- `node "$(realpath /tmp/council.mjs)" next` works and prints the normal list.
- Fix (one line, in `tools/council.mjs`): compare realpaths, e.g.
  `import { realpathSync } from 'node:fs';` + `if (import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) main();`
  or simply `if (process.argv[1] && import.meta.url.endsWith(basename(process.argv[1]))) main();` if you prefer no extra import.
- Alternative with no code change: teach `node "$(realpath /tmp/council.mjs)" <cmd>` in START-OF-CHAT §3.0 and `inbox/README.md`.

EVIDENCE: VERIFIED (commands and outputs above). Filed as a note, not an op; no queue item was touched this session.
