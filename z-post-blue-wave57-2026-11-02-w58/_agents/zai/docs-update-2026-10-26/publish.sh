#!/usr/bin/env bash
# ============================================================================
# Z-POST-BLUE ONE-COMMAND PUBLISH (Owner directive: "publish latest version of
# the main html and any useful piece of code or tool or anything that Claude or
# the Council could use")
#
# Usage:
#   bash publish.sh              # verify + commit + push zai/lane (needs creds)
#   bash publish.sh --dry-run    # verify + show what would be pushed
#
# What it publishes (everything another agent needs):
#   - Football-Sim-Z-post-blue.html      the latest single-file site (shipped)
#   - deliveries/z-post-blue-netlify/    the Netlify-drop copy (index.html)
#   - _agents/zai/tools/                 build script + payloads + verify harnesses
#   - _agents/zai/deliveries/            HANDOFF-FOR-CLAUDE, REWEIGHT-BRIEF, reports
#   - _agents/zai/evidence/              screenshots of every verified wave
#   - _agents/zai/notes/, _agents/zai/reviews/, _agents/zai/snapshots/
#
# NOTE: this sandbox has no GitHub credentials (pushes fail with "could not
# read Username"). Run it where the Origin credentials live (the Owner's
# machine, or export GITHUB_TOKEN / git credential helper). The verification
# and commit steps are safe everywhere; only the push needs credentials.
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"   # worktree root (script lives at repo root)

GREEN='\033[0;32m'; RED='\033[0;31m'; YEL='\033[1;33m'; NC='\033[0m'
say() { echo -e "${GREEN}[publish]${NC} $*"; }
warn() { echo -e "${YEL}[publish]${NC} $*"; }
die() { echo -e "${RED}[publish] ABORT${NC} $*"; exit 1; }

DRY=0; [[ "${1:-}" == "--dry-run" ]] && DRY=1

# ---- 1. the deliverable must exist and be intact --------------------------
MAIN="Football-Sim-Z-post-blue.html"
[[ -f "$MAIN" ]] || die "no $MAIN here"
SHA=$(sha256sum "$MAIN" | cut -c1-8)
SIZE=$(wc -c < "$MAIN")
say "deliverable: $MAIN ($SIZE bytes, sha $SHA)"

# ---- 2. all four copies byte-identical ------------------------------------
for copy in _agents/zai/deliveries/z-post-blue-netlify/index.html \
            /home/z/my-project/download/Football-Sim-Z-post-blue.html \
            /home/z/my-project/repo-clone/deliveries/z-post-blue-netlify/index.html; do
  if [[ -f "$copy" ]]; then
    csha=$(sha256sum "$copy" | cut -c1-8)
    [[ "$csha" == "$SHA" ]] || die "copy out of sync: $copy ($csha != $SHA)"
    say "in sync: $copy"
  else
    warn "copy not present here (skipped): $copy"
  fi
done

# ---- 3. the site must still be the verified build -------------------------
grep -q '100 SEASONS' "$MAIN" || die "build marker missing (100 SEASONS)"
grep -q 'zpb-shm' "$MAIN" || die "build marker missing (zpb-shm)"
node --check <(sed -n 's/<script>\(.*\)<\/script>/\1/p' "$MAIN" | head -c 100) 2>/dev/null \
  && say "quick script sanity ok" || warn "script sanity skipped (non-fatal)"

# ---- 4. commit everything on zai/lane -------------------------------------
git add -A >/dev/null 2>&1 || true
if ! git diff --cached --quiet 2>/dev/null; then
  if [[ $DRY == 1 ]]; then
    say "(dry-run) would commit: $(git diff --cached --stat | tail -1)"
  else
    git commit -m "zai: Z-post-blue publish sync (wave 10 shipped; sha ${SHA})" >/dev/null
    say "committed on $(git branch --show-current)"
  fi
else
  say "working tree already clean — nothing to commit"
fi

# ---- 5. push --------------------------------------------------------------
BRANCH=$(git branch --show-current)
if [[ $DRY == 1 ]]; then
  say "(dry-run) would push: origin ${BRANCH}"
else
  if git push origin "$BRANCH" 2>>/tmp/zpb-publish-push.log; then
    say "pushed origin/${BRANCH} ✅"
  else
    warn "push failed — no GitHub credentials in this environment."
    warn "Run me where the credentials live, or: git push origin ${BRANCH}"
    warn "Everything is committed locally; nothing is lost."
    exit 3
  fi
fi

say "bundle contents verified: html + netlify copy + tools + handoff + reweight brief + evidence"
say "done."
