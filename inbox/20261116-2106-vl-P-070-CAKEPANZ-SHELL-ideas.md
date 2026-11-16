SPEAKER: vl | ROLE: council | TASK: CAKEPANZ-SHELL Part 5 — what is missing, and UX improvements | DATE: 2026-11-16T21:06:00Z
FOR: P-070

MISSING SCREENS AND FLOWS (none exist in the shell; App.svelte:35 Screen type is exactly team|board|saves|feed|share):
1. Season hub — standings through week N, schedule grid, games played, current-week CTA, restore-slot entry; states not started / in progress / finished.
2. Week views — per-week game cards for the whole league with the user's match prominent; final-score reveal consistent with the feed.
3. Standings & playoff picture — division tables, playoff seeding, bracket states (Wild Card → Divisional → Conference → Super Bowl), champion banner on completion.
4. Awards — regular-season awards + playoff awards on the review grammar (winner, line, one-line team {wins} tie-break phrasing; integers except Wins/Priority; 90+ shimmer per w89 law).
5. Season review — post-season review in the w89 review grammar (integer chips, plain informative lines, no "expected scoring", Super Bowl prominent).
6. Guide — "How this works": honest statement of what the engine does (draft valuation, flex costs, models, replay), plain, integers, no promises, reduced-motion respected.
7. Settings form — persistence-across-reload UI; persistence itself exists (savesApp) but is unverified from a screen.
8. Player cards — Z.ai's format decision (Owner deferred): one card per player, Wins/Priority/OVR/form arrow (GREEN hot / RED cold, no emojis, no HOT/cold labels, OVR fluctuates by form ~5-6).

STATES EVERYWHERE — not yet done for the new surfaces: loading / empty / no-save / corrupt-save / newer-build refusal / reduced-motion / offline / file:// per screen. Nothing is "covered by the battery" unless each state is receipted.

SHAREABLES PER STAGE — extend slice 5's brag/seed to season brag, bracket brag, awards brag; each carries provenance (seed + gameSeed) and exports cleanly; one self-contained offline file, no CDN, no network.

PALETTE BOTH MODES — light pale-rose (--bg:#fdf2f6) not built; dark built only. Light-gold2 AA failure and dark --text fix are Owner questions — flagged, not fixed.

MULTISPORT READINESS (do not build basketball now; make growth easy): the save envelope is already sport-tagged (kind: draft/week/season) through the StorageModule seam, so a server store is a swap behind one interface — not a rewrite. Two frictions named (not patched silently): saveRevision has no device dimension (two devices revising one saveId collide — needs deviceId in envelope meta, a schema-level account-slice change); savedAt is client clock (harmless for replay determinism since engineVersion pins it, but a sync layer wants server-authoritative time). Slot support for draft position (P-317) is the other prerequisite for a portable save format.

UX IMPROVEMENTS OBSERVED (recommendations, not build orders):
- The gone-odds tooltip already explains its method on hover — keep that pattern for any new number.
- The valuation-mode label travels with the numbers (subtitle on the board, mode line on Team Select) — extend to every screen that shows Wins/Priority/OVR.
- The confirm-before-pick flow is a good default; make it removable via one flag if the Owner dislikes it.
- Keep the "yards: null" discipline (plays and time only) on every new surface — the feed already passes; the stats table must not invent gravity/yard figures either.

Labels: all omissions VERIFIED (App.svelte Screen type, component inventory, absence of screens). Multisport envelope claims VERIFIED (savesApp.ts kinds draft/week/season; StorageModule seam). Frictions are INFERRED (reasoned, named as frictions not defects).
