#!/bin/sh
# drift-audit.sh — read-only council drift audit (proposed by Z.ai, seat S-2600s, 25 Oct)
#
# Purpose: one command that fails loudly when the council's shared records drift.
# Complements tools/sync-mirrors.sh --check (which needs the Owner's local
# "Football Sim/" mirror dir and audits mirrors only — this audits the root itself).
#
# Usage:   sh drift-audit.sh [ROOT]
#          ROOT defaults to the repo root three levels above this script (_agents/zai/tools → root).
#          AUDIT_TODAY="DD Mon YYYY" env override for the date (tests/fixtures).
# Exit:    0 = no findings · 1 = findings present · 2 = environment error
#
# Checks (each prints OK / FINDING / SKIP with a stable check id):
#   A1  duplicate M-ids in COUNCIL-BULLETIN.md message headers
#   A2  duplicate '## ' section headers in QUESTIONS-FOR-THE-ARCHITECT.md
#   A3  duplicate S-range ID-block claims across CHRONICLE.md + COUNCIL-BULLETIN.md
#   A4  ONBOARDING.md "next free S-range" vs the highest S-range claimed in CHRONICLE.md
#   A5  availability-strip staleness (strip dates older than today, month-aware)
#   A6  STATUS.md reference-build pin: named file exists and hashes to the pinned prefix
#   A7  ghost harness files: tests/ scripts named in AGENTS.md / STATUS.md that don't exist
#   A8  byte-duplicate build artefacts (same sha256 under two or more paths)
#   A9  mirror drift via tools/sync-mirrors.sh --check (SKIP if no "Football Sim/" dir)
#
# Read-only. Writes nothing. Safe to run from any seat, any time.

set -u
AUDIT_VERSION="0.3 (Z.ai, S-2600s)"

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT="${1:-$SCRIPT_DIR/../../..}"
ROOT=$(cd "$ROOT" && pwd)
cd "$ROOT" || { echo "FATAL cannot cd $ROOT"; exit 2; }

TODAY_D=$(date +%d | sed 's/^0//')
TODAY_M=$(date +%b)
[ "${AUDIT_TODAY:-}" != "" ] && { TODAY_D=$(echo "$AUDIT_TODAY" | awk '{print $1+0}'); TODAY_M=$(echo "$AUDIT_TODAY" | awk '{print $2}'); }

FINDINGS=0
note_ok()   { echo "OK       $1"; }
note_skip() { echo "SKIP     $1  ($2)"; }
note_find() { echo "FINDING  $1  $2"; FINDINGS=$((FINDINGS+1)); }

req() { [ -f "$1" ] || { echo "FATAL required file missing: $1"; exit 2; }; }
req COUNCIL-BULLETIN.md; req CHRONICLE.md; req QUESTIONS-FOR-THE-ARCHITECT.md
req ONBOARDING.md; req STATUS.md; req AGENTS.md

echo "drift-audit $AUDIT_VERSION — root: $ROOT — today: $TODAY_D $TODAY_M"

# A1 — duplicate M-ids -------------------------------------------------------
dups=$(grep -oE '^\*\*M-[0-9]+(-[a-zA-Z0-9]+)*' COUNCIL-BULLETIN.md | sort | uniq -d | wc -l | tr -d ' ')
total=$(grep -oE '^\*\*M-[0-9]+(-[a-zA-Z0-9]+)*' COUNCIL-BULLETIN.md | wc -l | tr -d ' ')
if [ "$dups" -gt 0 ]; then
  note_find A1 "$dups duplicated M-id groups among $total message headers (full-id extraction incl. date-stamped suffixes; v0.2 truncated at M-<digits> and merged same-day distinct ids — 25 Oct correction; citations like @M-24 are ambiguous; see MOC Q-MOC-3)"
else note_ok A1; fi

# A2 — duplicate section headers in QUESTIONS-FOR-THE-ARCHITECT.md ------------
dups=$(grep '^## ' QUESTIONS-FOR-THE-ARCHITECT.md | sort | uniq -d | wc -l | tr -d ' ')
if [ "$dups" -gt 0 ]; then
  list=$(grep '^## ' QUESTIONS-FOR-THE-ARCHITECT.md | sort | uniq -d | tr '\n' ';')
  note_find A2 "$dups duplicated section header(s): $list"
else note_ok A2; fi

# A3 — S-ranges claimed by more than one distinct seat ------------------------
# Counts distinct (range, seat) pairs. Only the range immediately following
# the words "ID block" counts as a claim (justification mentions like
# "next free past MOC S-2500s" are NOT claims). Echoes of the same seat's
# claim in chronicle + strip do NOT fire; fires only on contested ranges.
dups=$(awk '
  /ID block [Ss]-[0-9]{4}/ {
    seat=""
    if (FILENAME ~ /BULLETIN/) {
      if (match($0, /^- \*\*[^*]+\*\*/)) { seat=substr($0, RSTART+4, RLENGTH-6) }
    } else {
      n=split($0, a, "·"); if (n>=2) { seat=a[2] }
    }
    if (seat != "") {
      gsub(/^[ *]+|[ *]+$/, "", seat)
      if (match($0, /[Ii][Dd] block [Ss]-[0-9]{4}/)) {
        print tolower(substr($0, RSTART+9, 5)), seat
      }
    }
  }' CHRONICLE.md COUNCIL-BULLETIN.md 2>/dev/null | sort -u \
    | awk '{c[$1]++} END {for (r in c) if (c[r]>1) print r}' | wc -l | tr -d ' ')
if [ "${dups:-0}" -gt 0 ]; then
  list=$(awk '
    /ID block [Ss]-[0-9]{4}/ {
      seat=""
      if (FILENAME ~ /BULLETIN/) {
        if (match($0, /^- \*\*[^*]+\*\*/)) { seat=substr($0, RSTART+4, RLENGTH-6) }
      } else {
        n=split($0, a, "·"); if (n>=2) { seat=a[2] }
      }
      if (seat != "") {
        gsub(/^[ *]+|[ *]+$/, "", seat)
        if (match($0, /[Ii][Dd] block [Ss]-[0-9]{4}/)) {
          print tolower(substr($0, RSTART+9, 5)), seat
        }
      }
    }' CHRONICLE.md COUNCIL-BULLETIN.md 2>/dev/null | sort -u \
      | awk '{seats[$1]=seats[$1] "+" $2; c[$1]++} END {for (r in c) if (c[r]>1) print r": "substr(seats[r],2)}' | tr '\n' ' ')
  note_find A3 "S-range(s) claimed by 2+ distinct seats: $list (first-logged wins; losers must re-block per ONBOARDING §4)"
else note_ok A3; fi

# A4 — ONBOARDING "next free" vs chronicle reality ----------------------------
claimed=$(grep -oiE 'ID block S-[0-9]{4}' CHRONICLE.md COUNCIL-BULLETIN.md | grep -oE 'S-[0-9]{4}' | sort -u | sed 's/S-//' | sort -n | tail -1)
ob_next=$(grep -oE 'next free[:*]* ?\*?\*?S-[0-9]{3,4}' ONBOARDING.md | grep -oE 'S-[0-9]{3,4}' | head -1 | sed 's/S-//')
if [ "${ob_next:-none}" = "none" ]; then
  note_skip A4 "no 'next free S-range' statement found in ONBOARDING.md"
elif [ "${claimed:-0}" -ge "$ob_next" ]; then
  note_find A4 "ONBOARDING says next free S-$ob_next but chronicle records claims up to block S-${claimed}s — stale joiner prompt (its own maintenance note says that is worse than none)"
else note_ok A4; fi

# A5 — availability strip staleness ------------------------------------------
strip_start=$(grep -n '^## Availability' COUNCIL-BULLETIN.md | head -1 | cut -d: -f1)
strip_end=$(grep -n '^## Messages' COUNCIL-BULLETIN.md | head -1 | cut -d: -f1)
if [ -z "${strip_start:-}" ] || [ -z "${strip_end:-}" ]; then
  note_skip A5 "availability strip markers not found"
else
  stale=$(sed -n "${strip_start},${strip_end}p" COUNCIL-BULLETIN.md \
        | grep -E '^\- \*\*' | awk -v d="$TODAY_D" -v m="$TODAY_M" '
            { if (match($0, /[0-9]{1,2} [A-Z][a-z]{2}/)) {
                day=substr($0, RSTART, RLENGTH-4)+0; mon=substr($0, RSTART+RLENGTH-3, 3);
                if (mon == m && day < d) c++; else if (mon != m) c++ } }
            END { print c+0 }')
  lines=$(sed -n "${strip_start},${strip_end}p" COUNCIL-BULLETIN.md | grep -cE '^\- \*\*')
  if [ "$stale" -gt 0 ]; then
    note_find A5 "$stale of $lines availability lines carry their latest date older than $TODAY_D $TODAY_M (house rule 8: the line is the truth — stale 'on duty' misleads cold-landing sessions)"
  else note_ok A5; fi
fi

# A6 — STATUS.md reference-build pin -----------------------------------------
refline=$(grep -n 'Reference build' STATUS.md | head -1)
reffile=$(echo "$refline" | grep -oE '[A-Za-z0-9 .()_-]*\.html' | head -1 | sed 's/^ *//; s/ *$//')
refhash=$(echo "$refline" | grep -oE '[0-9a-f]{8,64}' | head -1)
if [ -z "$reffile" ] || [ -z "$refhash" ]; then
  note_skip A6 "no reference-build line parsed from STATUS.md"
elif [ ! -f "$reffile" ]; then
  note_find A6 "STATUS.md pins reference build '$reffile' which does not exist at root"
else
  actual=$(shasum -a 256 "$reffile" | cut -c1-${#refhash})
  if [ "$actual" = "$refhash" ]; then note_ok A6
  else note_find A6 "STATUS.md pin mismatch: '$reffile' hashes $actual, pin says $refhash"; fi
fi

# A7 — ghost harness files named in AGENTS.md / STATUS.md ---------------------
ghosts=0
for name in $(grep -ohE 'tests/[A-Za-z0-9._-]+\.(js|mjs|sh)' AGENTS.md STATUS.md ONBOARDING.md | sort -u); do
  [ -f "$name" ] || { echo "FINDING  A7  $name named in shared docs but absent from tests/ (G18: never claim it ran)"; ghosts=$((ghosts+1)); }
done
[ "$ghosts" -eq 0 ] && note_ok A7

# A8 — byte-duplicate build artefacts -----------------------------------------
hashdup=$(shasum -a 256 *.html _agents/pickle/builds/*.html 2>/dev/null | sort | uniq -w64 -D | wc -l | tr -d ' ')
if [ "$hashdup" -gt 0 ]; then
  note_find A8 "byte-identical build files under multiple names (F3: one artefact, many names):"
  shasum -a 256 *.html _agents/pickle/builds/*.html 2>/dev/null | sort | uniq -w64 -D | cut -c67-
else note_ok A8; fi

# A9 — mirror drift (only when the Owner's mirror dir exists) ------------------
if [ -d "Football Sim" ]; then
  out=$(sh tools/sync-mirrors.sh --check 2>&1); rc=$?
  if [ "$rc" -eq 0 ]; then note_ok A9; else note_find A9 "mirror drift detected (sync-mirrors --check exit $rc)"; fi
else
  note_skip A9 'no "Football Sim/" mirror dir in this checkout (Owner-local git infra) — root is canonical here'
fi

echo "—"
if [ "$FINDINGS" -gt 0 ]; then echo "RESULT: $FINDINGS finding group(s). Read-only audit; fixing is the Owner/pen-holder's call."; exit 1
else echo "RESULT: clean."; exit 0; fi
