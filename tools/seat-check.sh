#!/bin/sh
# tools/seat-check.sh <name> — the seat-side twin of boot-v3's NOW-CHECK. READ-ONLY: no writes, no network beyond a fetch the caller already does,
# no work assigned to anyone. Run from the seat's worktree. Paste the three lines into your first reply.
#   git fetch -q origin && git show origin/architect/engine-and-seats:tools/seat-check.sh | sh -s <name>
# Proposal: claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md. Built 9 Nov 2026.
#   1 LANE-CHECK   commits on your branch that landed after your lane file was last written
#   2 RULES-CHECK  commits on the Architect branch since then that touched the rules files every seat must follow
#   3 SEAT-STATE   retired? lane size, worktree/branch match, preserve.mjs summary
set -u
N="${1:?usage: seat-check.sh <seat-name>   (lowercase, as in _agents/<name>/)}"
ARCH="origin/architect/engine-and-seats"
ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "NOT A GIT WORKTREE: run from your seat's worktree"; exit 2; }
cd "$ROOT" || exit 2
UP="$(printf '%s' "$N" | tr 'a-z' 'A-Z')"
LANE=""
for F in "_agents/$N/$UP.md" $(ls "_agents/$N"/*.md 2>/dev/null | grep -v -e TOMBSTONE -e README); do [ -f "$F" ] && { LANE="$F"; break; }; done

# --- 1 LANE-CHECK
BR="council/$N"; REF="HEAD"; git rev-parse -q --verify "origin/$BR" >/dev/null 2>&1 && REF="origin/$BR"
if [ -z "$LANE" ]; then
  echo "LANE-CHECK: NO LANE FILE under _agents/$N/ (new seat, or wrong name '$N')"; LC=""
else
  LC="$(git log -1 --format=%H "$REF" -- "$LANE" 2>/dev/null)"
  if [ -z "$LC" ]; then echo "LANE-CHECK: $LANE has no commit on $REF yet (unpushed or brand new)"
  else
    K="$(git rev-list --count "$LC..$REF" 2>/dev/null || echo '?')"
    if [ "$K" = "0" ]; then echo "LANE-CHECK: fresh ($LANE last written at $(git log -1 --format=%h "$LC"), nothing landed on $REF since)"
    else echo "LANE-CHECK: STALE: $K commit(s) landed on $REF after your lane file was written ($(git log -1 --format=%h "$LC")): read them before trusting its NEXT (git log --oneline $LC..$REF)"; fi
  fi
fi

# --- 2 RULES-CHECK  (by date: the lane commit may not be an ancestor of the Architect branch)
if ! git rev-parse -q --verify "$ARCH" >/dev/null 2>&1; then echo "RULES-CHECK: UNKNOWN: $ARCH not fetched (run: git fetch -q origin)"
else
  if [ -n "$LC" ]; then SINCE="$(git log -1 --format=%cI "$LC")"; else SINCE="1970-01-01"; fi
  R="$(git log "$ARCH" --since="$SINCE" --format='%h %s' -- AGENTS.md _agents/COUNCIL.md _agents/PRIORITIES.md _agents/START-OF-CHAT.md _agents/END-OF-CHAT.md 2>/dev/null)"
  if [ -z "$R" ]; then echo "RULES-CHECK: fresh (no rules file changed on $ARCH since your lane file)"
  else echo "RULES-CHECK: $(printf '%s\n' "$R" | wc -l | tr -d ' ') rules commit(s) since your lane file: re-read the changed files before work"; printf '%s\n' "$R" | head -8 | sed 's/^/    /'; fi
fi

# --- 3 SEAT-STATE
S=""
grep -qx "$N" _agents/RETIRED.txt 2>/dev/null && S="$S RETIRED(this seat is on _agents/RETIRED.txt: stop);"
if [ -n "$LANE" ]; then SZ="$(wc -c < "$LANE" | tr -d ' ')"; [ "$SZ" -gt 307200 ] && S="$S lane ${SZ}B > 300KB (compact it);"; fi
CUR="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"; [ "$CUR" != "$BR" ] && S="$S branch is '$CUR', expected '$BR';"
PV=""; [ -f tools/preserve.mjs ] && command -v node >/dev/null 2>&1 && PV="$(node tools/preserve.mjs check 2>&1 | tail -1 | cut -c1-120)"
if [ -z "$S" ]; then echo "SEAT-STATE: ok (branch $CUR, lane ${SZ:-n/a}B${PV:+; preserve: $PV})"; else echo "SEAT-STATE: ATTENTION:$S${PV:+ preserve: $PV}"; fi
