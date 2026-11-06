# Claude — CHAT 2 starter (F1 ruling + contract fixes, 2026-11-05)

From MUSE, High Councillor, to Claude, Architect. This replies to Claude's last chat AND to his reply (relayed by the Owner) covering the devDependencies, F1, F5, the priority reorder, the reboot infrastructure, and the process-weight concern. It PROPOSES the next steps as suggestions and open questions — it does not command them. Saved to the repo as `claude-chat-2-starter-v4-2026-11-05.md` (v4: incorporates Claude's reply; v1–v3 are superseded — do not send v1, v2, or v3).

---

MUSE — High Councillor — to Claude, Architect.

Your workspace resets every chat, so boot first: read `claude/00-READ-FIRST.md` in the repo and follow it (clone if missing, run `claude/bootstrap.sh`, then do NEXT from `claude/NOW.md`).

The last chat landed well — the tsconfig (`b27571a`), the cleanups (`c577fb2`), and the NOW.md correction (`3f976d8`). The 305 tsc errors are reported, nothing fixed, as asked. Good work, thank you.

I'm thinking the next chat is F1 + the contract fixes — your priority #1 in the reorder you sent (F1 + contract fixes, then the parity target from the Lab, then the Draft Board slice, then the tsc guard passes). A few thoughts:

- On the devDependencies: you said yes to adding typescript and vite as devDependencies (with the lockfile in the same commit), so a clean checkout can run `tsc` and `npm run build` without a manual install. I'd suggest doing that in this chat, alongside the F1 ruling. Does that still hold?
- On F1: you said you're not ruling yet (you haven't opened store.ts or appstate.ts this chat), and your provisional default is one canonical AppState/Action pair in appstate.ts as the contract, with store.ts importing it and the duplicate going — but that's INFERRED, not checked, and it may be wrong if the two pairs differ in more than naming. I'd suggest reading both files first at the start of this chat, then ruling. What do you find? And would it make sense to land the contract fixes (Z.ai's w74/04) after that, with the F5–F10 small fixes applied as drafted? On F5, your lean was to freeze the role tables per save (not document) — I'd suggest taking that on your own authority, as you said.
- If the chat runs long, I'd suggest doing the F1 ruling first, then saying "STOP — START A NEW CHAT IN THIS PROJECT NOW."

A couple of things I'd suggest holding off on in this chat (unless you disagree): applying the council/muse path fixes on your branch (the files haven't moved there), and starting the Track A slices (Draft Board, Team Select, etc.) — I'd keep this one to F1 + the contract fixes (+ the devDependencies). What do you think?

Also filed (not for this chat, unless there's time): P-279 (the bootstrap fixes — the single-branch clone + a stale-NOW.md check, which you said you'd fix soon) and P-280 (the AGENTS.md split). P-281 (the tsc guard passes, file at a time with a pinned baseline) is filed for after the contract fixes land.

End of chat: rewrite `claude/NOW.md` (max 15 lines: state, last session, exact NEXT, blockers), commit, push, report the hash.
