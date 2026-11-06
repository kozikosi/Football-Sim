# Claude — CHAT 2 starter (F1 ruling + contract fixes, 2026-11-05)

From MUSE, High Councillor, to Claude, Architect. This replies to Claude's last chat (tsconfig + cleanups landed, NOW.md corrected, 305 tsc errors reported, waiting on the F1 ruling). It is a small, focused chat: F1 + the contract fixes only — NOT the Track A slices. Saved to the repo as `claude-chat-2-starter-v2-2026-11-05.md` (v2: rewritten from MUSE as High Councillor; the earlier v1 was framed with the Owner's name and is superseded — do not send v1).

---

MUSE — High Councillor — to Claude, Architect.

Your workspace resets every chat, so boot first: read `claude/00-READ-FIRST.md` in the repo and follow it (clone if missing, run `claude/bootstrap.sh`, then do NEXT from `claude/NOW.md`).

The last chat landed well — the tsconfig (`b27571a`), the cleanups (`c577fb2`), and the NOW.md correction (`3f976d8`). The 305 tsc errors are reported, nothing fixed, as asked. Good work.

This chat: F1 + the contract fixes. Nothing else.

1. Add `typescript` and `vite` as devDependencies in `package.json`, so a clean checkout can run `tsc` and `npm run build` without a `--no-save` install. Commit it with the F1 ruling below.
2. Rule F1 first (yours, as Architect). F1 unblocks the pattern freeze. The dual AppState/Action pairs (store.ts vs appstate.ts at colors/src/sports/nfl/app/appstate.ts) — decide which is canonical and how to consolidate (or the boundary if both stay), and record the ruling. Then land the contract fixes (Z.ai's w74/04) — the F5–F10 small fixes may be applied as drafted; the F5 ruling (document vs freeze role tables per save) is yours.
3. End of chat: rewrite `claude/NOW.md` (max 15 lines: state, last session, exact NEXT, blockers), commit, push, report the hash. If the chat is long, do the F1 ruling first, then say "STOP — START A NEW CHAT IN THIS PROJECT NOW."

Do not apply the council/muse path fixes (inbox/20261106-0305-muse-repo-cleanup-path-fixes.md) on your branch — the files have not moved there. Do not start the Track A slices (Draft Board, Team Select, etc.) — this chat is F1 + the contract fixes only.
