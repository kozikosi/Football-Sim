#!/bin/sh
# tools/admit-seat.sh <seat> "<model / how reached>" ["<role>"]
# Run by the OWNER, from any worktree. Needs nobody else's approval (AGENTS §1, RETIREMENT §5).
# Creates ../wt/<seat> on council/<seat> (via new-seat-worktree.sh), writes the lane file from the template with
# State: advisor, commits and pushes council/<seat> so the seat exists on origin. Prints the prompt to paste.
set -eu
[ "$#" -ge 2 ] || { echo 'usage: admit-seat.sh <seat> "<model / how reached>" ["<role>"]'; exit 2; }
seat=$1; model=$2; role=${3:-general advisor}
case "$seat" in *[!a-z0-9-]*|'') echo "bad seat name (lowercase letters, digits, hyphen)"; exit 2;; esac
here=$(cd "$(dirname "$0")" && pwd)
common=$(cd "$(git rev-parse --git-common-dir)" && pwd); shared=$(dirname "$common"); wt="$(dirname "$shared")/wt/$seat"
git -C "$shared" fetch -q origin '+refs/heads/council/*:refs/remotes/origin/council/*'
if git -C "$shared" cat-file -e "origin/council/base:_agents/RETIRED.txt" 2>/dev/null &&
   git -C "$shared" show origin/council/base:_agents/RETIRED.txt | grep -qx "$seat"; then
  echo "'$seat' is on RETIRED.txt. Reinstating is allowed: remove the line in a bulletin QUEUE+ note or tell the Architect; see RETIREMENT.md section 6."; exit 1
fi
sh "$here/new-seat-worktree.sh" "$seat"
[ -d "$wt" ] || exit 1
lane="$wt/_agents/$seat/$(echo "$seat" | tr a-z A-Z).md"
if [ ! -f "$lane" ]; then
  mkdir -p "$(dirname "$lane")"
  sed -e "s/<NAME>/$(echo "$seat" | tr a-z A-Z)/g" -e "s/<name>/$seat/g" \
      -e "s#<…> · \*\*State:\*\* probation | standby | core#$model · **State:** advisor#" \
      "$wt/_agents/TEMPLATE-LANE.md" > "$lane"
  printf '\n## Role\n%s. Admitted by the Owner on %s. Advisor level: propose, test, dissent, measure. Core status is the Owner'"'"'s call after 3 verified items.\n' "$role" "$(date -u +%F)" >> "$lane"
  git -C "$wt" add -- "_agents/$seat"
  git -C "$wt" commit -q -m "admit $seat: lane file (advisor; $model)"
fi
git -C "$wt" push -q -u origin "council/$seat" && echo "pushed council/$seat @ $(git -C "$wt" rev-parse --short HEAD)"
cat <<P

READY. Open the new chat IN $wt and paste:

You are $(echo "$seat" | tr a-z A-Z), a council advisor. Read _agents/START-OF-CHAT.md and follow it exactly. Then read AGENTS.md, PROJECT-KNOWLEDGE.md and your lane file. Your first reply must show the output of pwd, git branch --show-current and sha256sum Football-Sim-PreColors.html (first 16 hex must match AGENTS.md section 2).
P
